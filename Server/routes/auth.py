from flask import Blueprint, request, jsonify
from werkzeug.security import check_password_hash, generate_password_hash
from config.db import get_client   

auth_bp = Blueprint("auth", __name__)

client = get_client()

db = client["myapp"]
users = db["users"]


@auth_bp.route('/register', methods=['POST'])
def register():
    data = request.json
    email = data.get('email')
    password = data.get('password')
    
    if db.users.find_one({"email": email}):
        return jsonify({"message": "User already exists"}), 400

    if not email or not password:
        return jsonify({"message": "Email and password are required"}), 400
    
    hashed_password = generate_password_hash(password)
    
    user_id = db.users.insert_one({"email": email, "password": hashed_password}).inserted_id
    return jsonify({"message": "User registered successfully", "user_id": str(user_id)}), 201

@auth_bp.route("/login", methods=["POST"])
def login():
    data = request.get_json()

    email = data.get("email")
    password = data.get("password")

    user = users.find_one({"email": email})
    if not user:
        return jsonify({"message": "User not found"}), 404

    if not check_password_hash(user["password"], password):
        return jsonify({"message": "Incorrect password"}), 401

    return jsonify({
        "message": "Login successful",
        "user": {
            "email": user["email"]
        }
    }), 200
