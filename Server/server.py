from flask import Flask, jsonify, request
from config.db import get_client
import os
import sys

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

@app.route('/echo', methods=['POST'])
def echo():
    data = request.json
    return jsonify(data), 200

if __name__ == '__main__':
    print(f"Starting server on 0.0.0.0:5000 - server running successfully. Using DB: {db_name}")
    app.run(host='0.0.0.0', port=5000)

