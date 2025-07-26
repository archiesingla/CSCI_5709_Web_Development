from flask import Blueprint, request, jsonify
from database import patients_collection
from flask_bcrypt import Bcrypt
from flask_jwt_extended import jwt_required


bcrypt = Bcrypt()
patient_bp = Blueprint('patient_bp', __name__)

@patient_bp.route('/register', methods=['POST'])
def register_patient():
    data = request.json
    if patients_collection.find_one({"email": data["email"]}):
        return jsonify({"error": "Patient already exists"}), 400

    data["password"] = bcrypt.generate_password_hash(data["password"]).decode("utf-8")
    data["role"] = "patient"
    patients_collection.insert_one(data)
    return jsonify({"message": "Patient registered successfully"})

@patient_bp.route('/appointments', methods=['GET'])
@jwt_required()
def get_appointments():
    identity = get_jwt_identity()
    email = None

    if isinstance(identity, dict):
        email = identity.get('email')
    else:
        email = identity

    if not email:
        return jsonify({"error": "Invalid token identity"}), 401

    patient = patients_collection.find_one({"email": email})
    if not patient:
        return jsonify({"error": "Patient not found"}), 404

    appts_cursor = appointments_collection.find({"patient_id": patient["_id"]})
    appointments = []
    for appt in appts_cursor:
        appt['_id'] = str(appt['_id'])
        appt['patient_id'] = str(appt['patient_id'])
        appt['doctor_id'] = str(appt['doctor_id'])
        appointments.append(appt)

    return jsonify(appointments)
