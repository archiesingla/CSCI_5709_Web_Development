from pymongo import MongoClient
from pymongo.errors import ConnectionFailure
import os

# connecting to the db 
def connect_db():
    try:
        client = MongoClient(os.environ.get("MONGO_URI"))
        db = client["productsDB"]
        return db
    except ConnectionFailure:
        raise Exception("Is MongoDB server running?")
