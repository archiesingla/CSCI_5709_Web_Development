from pymongo import MongoClient

client = MongoClient("mongodb+srv://archie:archie@activity6.p3hmruy.mongodb.net/") 
db = client["mediconnect"]

doctors_collection = db["doctors"]
doctors_collection.create_index("email", unique=True)
patients_collection = db["patients"]
patients_collection.create_index("email", unique=True)
appointments_collection = db["appointments"]
