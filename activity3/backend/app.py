from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

products = []

# product's route for fetching
@app.route("/products", methods=["GET"])
def get_products():
    return jsonify(products)

# product's route for adding product
@app.route("/products", methods=["POST"])
def add_product():
    data = request.get_json()
    products.append(data)
    return jsonify({"message": "Product Added!"}), 201

if __name__ == "__main__":
    app.run(debug=True)
