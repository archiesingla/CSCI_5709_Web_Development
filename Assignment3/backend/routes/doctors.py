from flask import Blueprint, request, jsonify
from database import doctors_collection
from flask_bcrypt import Bcrypt
from flask_jwt_extended import jwt_required


bcrypt = Bcrypt()
doctor_bp = Blueprint('doctor_bp', __name__)

@doctor_bp.route('/register', methods=['POST'])
def register_doctor():
    data = request.json
    if doctors_collection.find_one({"email": data["email"]}):
        print("email already exists")
        return jsonify({"error": "Doctor already exists"}), 400
    
    data["password"] = bcrypt.generate_password_hash(data["password"]).decode("utf-8")
    data["role"] = "doctor"
    doctors_collection.insert_one(data)
    return jsonify({"message": "Doctor registered successfully"})

@doctor_bp.route('/list', methods=['GET'])
def get_doctors():
    doctors_cursor = doctors_collection.find({}, {"password": 0})
    print(doctors_cursor)
    doctors = []
    for doc in doctors_cursor:
        doc['_id'] = str(doc['_id'])
        doctors.append(doc)
    return jsonify(doctors)
