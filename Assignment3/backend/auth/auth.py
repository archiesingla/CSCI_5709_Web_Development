from flask import Blueprint, request, jsonify, current_app
from flask_mail import Message
from itsdangerous import URLSafeTimedSerializer, SignatureExpired, BadSignature
from flask_bcrypt import generate_password_hash, check_password_hash
from flask_jwt_extended import create_access_token, decode_token
from database import doctors_collection, patients_collection
from datetime import timedelta
import re



auth_bp = Blueprint("auth_bp", __name__)

@auth_bp.route("/login", methods=["POST"])
def login():
    data = request.json
    email = data.get("email")
    password = data.get("password")

    # Check both collections
    user = doctors_collection.find_one({"email": email}) or patients_collection.find_one({"email": email})
    
    if not user:
        return jsonify({"error": "User not found"}), 404

    # Password validation
    if not check_password_hash(user["password"], password):
        return jsonify({"error": "Invalid password"}), 401

    # Use role from DB
    role = user.get("role", "unknown")

    token = create_access_token(identity={"email": user["email"], "role": role})
    print("Creating token for user:", user["email"], "role:", role)
    print("Token:", token)

    return jsonify({"token": token})



def get_serializer():
    secret_key = current_app.config['JWT_SECRET_KEY']
    return URLSafeTimedSerializer(secret_key)

@auth_bp.route("/forgot-password", methods=["POST"])
def forgot_password():
    from app import mail
    data = request.json
    email = data.get("email")
    if not email or not re.match(r"[^@]+@[^@]+\.[^@]+", email):
        return jsonify({"error": "Invalid email"}), 400

    user = doctors_collection.find_one({"email": email}) or patients_collection.find_one({"email": email})
    if not user:
        return jsonify({"error": "User not found"}), 404

    serializer = get_serializer()
    token = serializer.dumps(email, salt="password-reset-salt")

    reset_link = f"http://localhost:3000/reset-password?token={token}"

    try:
        msg = Message(
            subject="Password Reset Request",
            recipients=[email],
            body=f"Hello {user.get('name', '')},\n\n"
                 f"To reset your password, your token is: \n{token}\n\n"
                 "If you did not request a password reset, please ignore this email."
        )
        import threading
        def send_email_async(app, msg):
            with app.app_context():
                mail.send(msg)
        threading.Thread(target=send_email_async, args=(current_app._get_current_object(), msg)).start()

    except Exception as e:
        print(f"Error sending email: {e}")
        return jsonify({"error": "Failed to send email"}), 500

    return jsonify({"message": "Password reset email sent"})

@auth_bp.route("/reset-password", methods=["POST"])
def reset_password():
    data = request.json
    token = data.get("token")
    new_password = data.get("new_password")

    if not token or not new_password:
        return jsonify({"error": "Missing token or new password"}), 400

    serializer = get_serializer()
    try:
        email = serializer.loads(token, salt="password-reset-salt", max_age=3600)  # 1 hour expiry
    except SignatureExpired:
        return jsonify({"error": "Token expired"}), 400
    except BadSignature:
        return jsonify({"error": "Invalid token"}), 400

    hashed_password = generate_password_hash(new_password).decode("utf-8")

    res1 = doctors_collection.update_one({"email": email}, {"$set": {"password": hashed_password}})
    res2 = patients_collection.update_one({"email": email}, {"$set": {"password": hashed_password}})

    if res1.modified_count == 0 and res2.modified_count == 0:
        return jsonify({"error": "User not found"}), 404

    return jsonify({"message": "Password reset successful"})