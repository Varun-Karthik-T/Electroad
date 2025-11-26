# leisure_model.py

from config.db import get_client

# Shared MongoDB client
client = get_client()

db = client["myapp"]
leisure_spots = db["leisure_spots"] 


def insert_leisure_spot(spot_data: dict):
    """
    Insert a single leisure spot document.
    Data includes:
    {
        "id": 100,
        "leisure_id": 101,
        "name": "Jeyabal Juice",
        "category": "Food",
        "latitude": 11.1271,
        "longitude": 78.6522
    }
    """
    return leisure_spots.insert_one(spot_data)


def insert_multiple_leisure_spots(spots: list):
    """
    Insert list of leisure spots.
    """
    if spots:
        return leisure_spots.insert_many(spots)


def get_leisure_by_city(city_id: int):
    """
    Fetch all leisure items for a city.
    city_id = same as 'id' in your JS sample data
    """
    return list(leisure_spots.find({"id": city_id}, {"_id": 0}))


def get_all_leisure_spots():
    """
    Fetch all leisure data.
    """
    return list(leisure_spots.find({}, {"_id": 0}))
