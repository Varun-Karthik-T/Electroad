from flask import Blueprint, request, jsonify
from werkzeug.security import check_password_hash
from config.db import get_client   

auth_bp = Blueprint("auth", __name__)

# Get the Atlas client
client = get_client()

# Select DB + collection
db = client["myapp"]
users = db["users"]

@auth_bp.route("/users/login", methods=["POST"])
def login():
    data = request.get_json()

    email = data.get("email")
    password = data.get("password")

    # Find user
    user = users.find_one({"email": email})
    if not user:
        return jsonify({"message": "User not found"}), 404

    # Compare hashed password with provided password
    if not check_password_hash(user["password"], password):
        return jsonify({"message": "Incorrect password"}), 401

    return jsonify({
        "message": "Login successful",
        "user": {
            "email": user["email"]
        }
    }), 200
