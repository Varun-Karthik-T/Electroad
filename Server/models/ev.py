# ev_model.py

from config.db import get_client

# Shared MongoDB client
client = get_client()

db = client["myapp"]
ev_stations = db["ev_stations"]  # collection for EV stations


def insert_ev_station(ev_data: dict):
    
    return ev_stations.insert_one(ev_data)


def insert_multiple_ev_stations(stations: list):
    """
    Insert multiple EV stations at once.
    """
    if stations:
        return ev_stations.insert_many(stations)


def get_all_ev_stations():
    """
    Fetch all EV stations.
    """
    return list(ev_stations.find({}, {"_id": 0}))  # remove _id for frontend
