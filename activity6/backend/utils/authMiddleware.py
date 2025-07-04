from functools import wraps
from flask import request, jsonify
import jwt
import os

SECRET_KEY = os.environ.get("JWT_SECRET", "fallback-secret")

# Middleware
def auth_middleware(f):
    @wraps(f)
    def middleware(*args, **kwargs):
        # get the authorization header
        header = request.headers.get('Authorization')

        # if header is not available or it doesn't start with the Bearer
        if not header or not header.startswith("Bearer "):
            return jsonify({"error": "Unauthorized: Missing or invalid token"}), 401

        # taking the token from header
        token = header.split(" ")[1]


        try:
            decoded = jwt.decode(token, SECRET_KEY, algorithms=["HS256"])
            request.user = decoded
        # if the token is invalid or is expired
        except jwt.ExpiredSignatureError:
            return jsonify({"error": "Token has expired"}), 401
        except jwt.InvalidTokenError:
            return jsonify({"error": "Invalid token"}), 401

        return f(*args, **kwargs)
    return middleware
