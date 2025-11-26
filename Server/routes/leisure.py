from flask import Blueprint, jsonify
from config.db import get_client

leisure_bp = Blueprint("leisure", __name__)

client = get_client()
db = client["myapp"]
leisure_collection = db["leisure_spots"]     

@leisure_bp.route("/leisure-spots", methods=["GET"])
def get_all_leisure_spots():
    try:
        spots = list(leisure_collection.find({}, {"_id": 0}))  # scrub _id
        return jsonify(spots), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500
