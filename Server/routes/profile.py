from flask import Blueprint, request, jsonify
from config.db import get_client

profile_bp = Blueprint("profile", __name__)

client = get_client()
db = client["myapp"]
users = db["users"]

@profile_bp.route("/<email>/vehicles", methods=["GET"])
def get_user_vehicles(email):

    user = users.find_one({"email": email})

    if not user:
        return jsonify({"error": "User not found"}), 404

    vehicles = user.get("vehicles", [])

    return jsonify({"Vehicles": vehicles}), 200



@profile_bp.route("/<email>/vehicles", methods=["POST"])
def update_user_vehicles(email):
    new_vehicles = request.get_json()

    if not isinstance(new_vehicles, list):
        return jsonify({"error": "Invalid data. Expected an array of vehicles."}), 400

    # Fetch the existing user
    user = users.find_one({"email": email})
    if not user:
        return jsonify({"error": "User not found"}), 404

    # Get the old vehicles list
    existing_vehicles = user.get("vehicles", [])

    # Combine old and new
    combined = existing_vehicles + new_vehicles

    # Enforce max size = 5
    if len(combined) > 5:
        return jsonify({
            "error": "Vehicle limit exceeded. Maximum allowed is 5.",
            "current_count": len(existing_vehicles),
            "new_items": len(new_vehicles)
        }), 400

    # Update DB with appended list
    users.update_one(
        {"email": email},
        {"$set": {"vehicles": combined}}
    )

    return jsonify({"message": "Vehicles added successfully"}), 200


