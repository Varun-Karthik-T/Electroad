from flask import Flask, jsonify, request
from pymongo.mongo_client import MongoClient
from pymongo.server_api import ServerApi
from flask_cors import CORS
from bson import ObjectId 
from bson import Timestamp
import datetime

app = Flask(__name__)
CORS(app)

db = None

def dbconnection():
    global db
    url = "mongodb+srv://varunkarthikceg:KARthik#13@cluster0.bqdsvml.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"  # connection string here

    client = MongoClient(url, server_api=ServerApi('1'))

    try:
        client.admin.command('ping')
        print("Pinged your deployment. You successfully connected to MongoDB!")
        db = client['cluster0']

    except Exception as e:
        print(e)

dbconnection()

@app.route('/')
def hello():
    return 'Hello, World!'

@app.post('/new')
def get_keys():
    print(request.method)  
    try:
        data = request.get_json()  
        id = data.get('id')  

        
        print(id)

        collection = db['ports']
        all_documents = collection.find()
        all_documents_with_keys_values = []
        for doc in all_documents:

            doc['_id'] = str(doc['_id']) if '_id' in doc else None
            for key, value in doc.items():
                if isinstance(value, ObjectId):
                    doc[key] = str(value)
                elif isinstance(value, Timestamp):
 
                    doc[key] = datetime.datetime.fromtimestamp(value.time).strftime('%Y-%m-%d %H:%M:%S')
            
            all_documents_with_keys_values.append(doc)

        return jsonify(all_documents_with_keys_values), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.post('/station')
def get_station():
    try:
        data = request.get_json()
        station_id = data.get('station_id')

        collection = db['ports']
        document = collection.find_one({'station_id': station_id})

        if document:
            document['_id'] = str(document['_id']) if '_id' in document else None
            for key, value in document.items():
                if isinstance(value, ObjectId):
                    document[key] = str(value)
                elif isinstance(value, Timestamp):
                    document[key] = datetime.datetime.fromtimestamp(value.time).strftime('%Y-%m-%d %H:%M:%S')

            return jsonify(document), 200
        else:
            return jsonify({'error': 'Station not found'}), 404
    except Exception as e:
        return jsonify({'error': str(e)}), 500


@app.post('/update_ratings')
def update_ratings():
            try:
                data = request.get_json()
                station_id = data.get('station_id')
                ratings = data.get('ratings')

                collection = db['station']
                document = collection.find_one({'station_id': station_id})

                if document:
                    no_of_ratings = document.get('no_of_ratings', 0)
                    overall_ratings = document.get('overall_ratings', 0)
                    document['no_of_ratings'] = round((overall_ratings + ratings) / (no_of_ratings + 1))
                    collection.update_one({'_id': document['_id']}, {'$set': {'no_of_ratings': document['no_of_ratings']}})

                    return jsonify({'message': 'No. of ratings updated successfully'}), 200
                else:
                    return jsonify({'error': 'Station not found'}), 404
            except Exception as e:
                return jsonify({'error': str(e)}), 500
            
@app.post('/documents_id')
def documents_id():
    try:
        data = request.get_json()
        station_id = data.get('station_id')
        collection_station = db['station']
        documents_station = collection_station.find({'station_id': station_id})
        
        station_documents = []
        for doc in documents_station:
            no_of_ports = doc.get('no_of_ports')  
            station_documents.append(no_of_ports)  
        
        collection_ports = db['ports']
        documents_ports = collection_ports.find({'station_id': station_id})
        
        port_documents = []
        for doc in documents_ports:
            doc.pop('_id', None)
            
            for key, value in doc.items():
                if isinstance(value, ObjectId):
                    doc[key] = str(value)
                elif isinstance(value, Timestamp):
                    doc[key] = datetime.datetime.fromtimestamp(value.time).strftime('%Y-%m-%d %H:%M:%S')
            
            port_documents.append(doc)

        return jsonify({'station_documents': station_documents, 'port_documents': port_documents}), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.post('/update_issue')
def update_issue():
            try:
                data = request.get_json()
                station_id = data.get('station_id')
                condition = data.get('condition')
                port_id = data.get('port_id')

                if condition == "working":
                    collection = db['ports']
                    collection.update_many({'port_id': port_id , 'station_id': station_id}, {'$set': {'issue.port damage': 0, 'issue.slow charging': 0, 'condition': 'working', 'issue.not connecting': 0, 'issue.connecting but not charging': 0}})
                    return jsonify({'message': 'Issue updated successfully'}), 200
                else:
                    return jsonify({'error': 'Invalid condition'}), 400
            except Exception as e:
                return jsonify({'error': str(e)}), 500
            

if __name__ == '__main__':
    app.run(debug=True)