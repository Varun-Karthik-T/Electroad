from werkzeug.security import generate_password_hash
from config.db import get_client

# Get the shared MongoDB client
client = get_client()

# Choose your Atlas database name (same as in your app)
db = client["myapp"]

# Choose the users collection
users = db["users"]

def create_default_user():

    email = "test@example.com"
    plain_password = "123456"

    # Check if user already exists
    existing = users.find_one({"email": email})
    if existing:
        print("User already exists:", email)
        return

    # Insert hashed password
    users.insert_one({
        "email": email,
        "password": generate_password_hash(plain_password)
    })

    print("User inserted successfully:", email)

if __name__ == "__main__":
    create_default_user()
