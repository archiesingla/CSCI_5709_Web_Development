from flask import Flask, request, jsonify
from flask_cors import CORS
from bson.json_util import dumps
from utils.connection import connect_db
from utils.validation import validate_data

app = Flask(__name__)
CORS(app)

conn = connect_db()
prods_collection = conn["products"]


# product's route for fetching
@app.route("/products", methods=["GET"])
def get_products():
    # remove the id from the fetching of the records
    products = list(prods_collection.find({}, {"_id": 0}))
    return jsonify(products), 200

# product's route for adding product
@app.route("/products", methods=["POST"])
def add_product():
    if request.method=="POST":
        prod_info = request.get_json()
        print(prod_info)

        is_valid, error_msg = validate_data(prod_info)

        if not is_valid:
            return jsonify({"error": error_msg}), 400
        
        prods_collection.insert_one(prod_info)
        return jsonify({"message": "Successfully Added your product"}), 201

if __name__ == "__main__":
    app.run(debug=True)
