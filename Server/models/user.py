from werkzeug.security import generate_password_hash
from config.db import get_client

# Shared MongoDB client
client = get_client()

db = client["myapp"]
users = db["users"]


def create_default_user():
    email = "test@example.com"
    plain_password = "123456"

    # Check if user already exists
    existing = users.find_one({"email": email})
    if existing:
        print("User already exists:", email)
        return

    # Default EV list (for Profile Page)
    default_vehicles = [
        {
            "name": "Tesla Model S",
            "batteryType": "Lithium-ion"
        }
    ]

    # Insert user document
    new_user = {
        "email": email,
        "password": generate_password_hash(plain_password),
        "vehicles": default_vehicles
    }

    users.insert_one(new_user)
    print("User inserted successfully:", email)


if __name__ == "__main__":
    create_default_user()
