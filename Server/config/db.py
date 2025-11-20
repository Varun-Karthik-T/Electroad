import os
from pymongo.mongo_client import MongoClient
from pymongo.server_api import ServerApi
from dotenv import load_dotenv

_client = None

try:
	load_dotenv()
except Exception:
	pass

def get_client():
	"""
	Return a singleton MongoClient initialized from the MONGODB_URI or DB_URI environment variable.
	Raises RuntimeError if neither variable is set or the ping fails.
	"""
	global _client
	if _client is not None:
		return _client

	uri = (os.environ.get('DB_URI') or '').strip()
	if not uri:
		raise RuntimeError("DB URI environment variable is not set. Set MONGODB_URI or DB_URI.")

	_client = MongoClient(uri, server_api=ServerApi('1'))
	
	try:
		_client.admin.command('ping')
		print("MongoDB ping succeeded.")
	except Exception as e:
		print("MongoDB ping failed:", e)
		_client = None
		raise

	return _client