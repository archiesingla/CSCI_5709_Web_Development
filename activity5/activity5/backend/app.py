from flask import Flask, request, jsonify
from flask_cors import CORS
from bson.json_util import dumps
from utils.connection import connect_db
from utils.validation import validate_data
from utils.authMiddleware import auth_middleware

from flask_bcrypt import Bcrypt
import jwt
import datetime
import os

app = Flask(__name__)
CORS(app)
bcrypt = Bcrypt(app)

conn = connect_db()
prods_collection = conn["products"]
users_collection = conn["users"]

# secret key for JWT
SECRET_KEY = 'web_activity5'

# register route 
@app.route('/api/auth/register', methods=['POST'])
def register():
    data = request.get_json()
    name = data.get("name")
    email = data.get("email")
    password = data.get("password")

    if not all([name, email, password]):
        return jsonify({"error": "Please provide name, email, and password"}), 400

    # check if user already exists
    if users_collection.find_one({"email": email}):
        return jsonify({"error": "User already exists"}), 409

    # hash the password
    hashed_password = bcrypt.generate_password_hash(password).decode('utf-8')

    users_collection.insert_one({
        "name": name,
        "email": email,
        "password": hashed_password
    })

    return jsonify({"message": "User registered successfully"}), 201

# login route 
@app.route('/api/auth/login', methods=['POST'])
def login():
    data = request.get_json()
    email = data.get("email")
    password = data.get("password")

    if not all([email, password]):
        return jsonify({"error": "Please provide email and password"}), 400

    # check user is available or not 
    user = users_collection.find_one({"email": email})
    if not user:
        return jsonify({"error": "User not found"}), 404

    # check the password is correct or wrong 
    if not bcrypt.check_password_hash(user['password'], password):
        return jsonify({"error": "Invalid credentials"}), 401

    # genetating token 
    token = jwt.encode({
        "email": user["email"],
        "exp": datetime.datetime.utcnow() + datetime.timedelta(hours=1)
    }, SECRET_KEY, algorithm="HS256")

    return jsonify({"token": token, "name": user["name"], "email": user["email"]}), 200

# product's route for fetching
@app.route("/products", methods=["GET"])
@auth_middleware
def get_products():
    # remove the id from the fetching of the records
    products = list(prods_collection.find({}, {"_id": 0}))
    return jsonify(products), 200

# product's route for adding product
@app.route("/products", methods=["POST"])
@auth_middleware
def add_product():
    if request.method=="POST":
        prod_info = request.get_json()
        print(prod_info)

        is_valid, error_msg = validate_data(prod_info)

        if not is_valid:
            return jsonify({"error": error_msg}), 400
        
        prods_collection.insert_one(prod_info)
        return jsonify({"message": "Successfully Added your product"}), 201

if __name__ == "__main__":
    app.run(debug=True)
