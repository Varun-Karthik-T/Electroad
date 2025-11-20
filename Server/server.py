from flask import Flask, jsonify, request
from config.db import get_client
import os
import sys
from routes.auth import auth_bp

app = Flask(__name__)

try:
    client = get_client()
    db_name = os.environ.get('DB_NAME', 'mydatabase')
    db = client.get_database(db_name)
    print("DB connection successful.")
except Exception as e:
    print("Failed to initialize DB:", e, file=sys.stderr)
    print("Please set MONGODB_URI or DB_URI environment variable with your connection string.", file=sys.stderr)
    sys.exit(1)

@app.route('/status', methods=['GET'])
def status():
    return jsonify({"status": "Server is running"}), 200    

@app.route('/api/users/register', methods=['POST'])
def register():
    data = request.json
    email = data.get('email')
    password = data.get('password')
    
    if db.users.find_one({"email": email}):
        return jsonify({"message": "User already exists"}), 400

    if not email or not password:
        return jsonify({"message": "Email and password are required"}), 400
    
    user_id = db.users.insert_one({"email": email, "password": password}).inserted_id
    return jsonify({"message": "User registered successfully", "user_id": str(user_id)}), 201

# @app.route('/api/users/login', methods=['POST'])
# def login():
#     data = request.json
#     email = data.get('email')
#     password = data.get('password')
    
#     user = db.users.find_one({"email": email, "password": password})
#     if user:
#         return jsonify({"message": "Login successful", "user_id": str(user['_id'])}), 200
#     else:
#         return jsonify({"message": "Invalid email or password"}), 401

@app.route('/echo', methods=['POST'])
def echo():
    data = request.json
    return jsonify(data), 200

app.register_blueprint(auth_bp, url_prefix="/api")

if __name__ == '__main__':
    print(f"Starting server on 0.0.0.0:5000 - server running successfully. Using DB: {db_name}")
    app.run(host='0.0.0.0', port=5000, use_reloader=True)

