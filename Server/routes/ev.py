from flask import Blueprint, jsonify
from config.db import get_client

ev_bp = Blueprint("ev", __name__)

client = get_client()
db = client["myapp"]
ev_collection = db["ev_stations"]     

@ev_bp.route("/ev-stations", methods=["GET"])
def get_all_ev_stations():
    try:
        stations = list(ev_collection.find({}, {"_id": 0})) 
        return jsonify(stations), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500
