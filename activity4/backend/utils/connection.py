from pymongo import MongoClient
from pymongo.errors import ConnectionFailure

# connecting to the db 
def connect_db():
    try:
        client = MongoClient("mongodb://localhost:27017/")
        db = client["productsDB"]
        return db
    except ConnectionFailure:
        raise Exception("Is MongoDB server running?")
