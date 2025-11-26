# seed_data.py

from models.ev import insert_multiple_ev_stations
from models.leisure import insert_multiple_leisure_spots

sample_data = {
    "ev": [
        {
            "name": "Tata Power EV Charger - Chennai Adyar",
            "latitude": 13.0067,
            "longitude": 80.2571,
            "connectors": ["CCS2", "Type2"],
            "power": 30,
            "status": "available"
        },
        {
            "name": "Zeon Charging - Velachery",
            "latitude": 12.9801,
            "longitude": 80.2212,
            "connectors": ["CCS2"],
            "power": 50,
            "status": "occupied"
        },
        {
            "name": "Ather Grid - T Nagar",
            "latitude": 13.0413,
            "longitude": 80.2337,
            "connectors": ["Ather", "Type2"],
            "power": 3.3,
            "status": "available"
        },
        {
            "name": "Reliance JioBP Pulse - Guindy",
            "latitude": 13.0103,
            "longitude": 80.2128,
            "connectors": ["CCS2", "CHAdeMO"],
            "power": 60,
            "status": "maintenance"
        },
        {
            "name": "Tata Power - Marina Beach",
            "latitude": 13.0500,
            "longitude": 80.2824,
            "connectors": ["CCS2"],
            "power": 25,
            "status": "available"
        },
        {
            "name": "Zeon Charging - OMR Thoraipakkam",
            "latitude": 12.9352,
            "longitude": 80.2278,
            "connectors": ["CCS2"],
            "power": 120,
            "status": "available"
        },
        {
            "name": "Ather Grid - Anna Nagar",
            "latitude": 13.0843,
            "longitude": 80.2101,
            "connectors": ["Ather"],
            "power": 3.3,
            "status": "occupied"
        },
        {
            "name": "Shell Recharge - Pallikaranai",
            "latitude": 12.9534,
            "longitude": 80.2187,
            "connectors": ["CCS2", "Type2"],
            "power": 60,
            "status": "available"
        },
        {
            "name": "Tata Power - Chrompet",
            "latitude": 12.9507,
            "longitude": 80.1402,
            "connectors": ["CCS2"],
            "power": 30,
            "status": "available"
        },
        {
            "name": "Relux Charging Station - ECR Neelangarai",
            "latitude": 12.9381,
            "longitude": 80.2590,
            "connectors": ["CCS2", "Type2"],
            "power": 50,
            "status": "available"
        },
        {
            "name": "Ather Grid - Porur",
            "latitude": 13.0416,
            "longitude": 80.1554,
            "connectors": ["Ather"],
            "power": 3.3,
            "status": "available"
        },
        {
            "name": "Zeon Charging - Tambaram",
            "latitude": 12.9249,
            "longitude": 80.1275,
            "connectors": ["CCS2"],
            "power": 50,
            "status": "occupied"
        },
        {
            "name": "Tata Power EV Charger - Ashok Nagar",
            "latitude": 13.0383,
            "longitude": 80.2121,
            "connectors": ["CCS2", "Type2"],
            "power": 30,
            "status": "available"
        }
    ],

    "leisure": [
        {"id": 100, "leisure_id": 101, "name": "Jeyabal Juice", "category": "Food", "latitude": 11.1271, "longitude": 78.6522},
        {"id": 100, "leisure_id": 105, "name": "Trichy Gym", "category": "Gym", "latitude": 11.1211, "longitude": 78.6569},
        {"id": 100, "leisure_id": 106, "name": "Trichy Movie Theater", "category": "Movie Theater", "latitude": 11.1271, "longitude": 78.6599},

        {"id": 200, "leisure_id": 203, "name": "Coimbatore Shopping Mall", "category": "Shopping Mall", "latitude": 11.0118, "longitude": 76.9528},
        {"id": 200, "leisure_id": 204, "name": "Coimbatore Gym", "category": "Gym", "latitude": 11.0128, "longitude": 76.9598},
        {"id": 200, "leisure_id": 205, "name": "Coimbatore Movie Theater", "category": "Movie Theater", "latitude": 11.0188, "longitude": 76.9548},

        {"id": 300, "leisure_id": 303, "name": "Chennai Shopping Mall", "category": "Shopping Mall", "latitude": 13.0822, "longitude": 80.2703},
        {"id": 300, "leisure_id": 304, "name": "Chennai Gym", "category": "Gym", "latitude": 13.0821, "longitude": 80.273},
        {"id": 300, "leisure_id": 305, "name": "Chennai Movie Theater", "category": "Movie Theater", "latitude": 13.0842, "longitude": 80.2721},
    ]
}

def seed():
    print("Inserting EV Stations...")
    insert_multiple_ev_stations(sample_data["ev"])

    print("Inserting Leisure Spots...")
    insert_multiple_leisure_spots(sample_data["leisure"])

    print("Database seeding completed.")

if __name__ == "__main__":
    seed()
