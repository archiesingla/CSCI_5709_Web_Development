from flask import Flask
from flask_cors import CORS
from flask_jwt_extended import JWTManager
from flask_mail import Mail
from prometheus_flask_exporter import PrometheusMetrics

from routes.doctors import doctor_bp
from routes.patients import patient_bp
from auth.auth import auth_bp

app = Flask(__name__)
metrics = PrometheusMetrics(app, path='/metrics')

CORS(app, resources={r"/api/*": {"origins": ["http://localhost:3000"]}})

# App config
app.config['JWT_SECRET_KEY'] = 'super-secret-mediconnect-key'
app.config['MAIL_SERVER'] = 'smtp.gmail.com'
app.config['MAIL_PORT'] = 587
app.config['MAIL_USE_TLS'] = True
app.config['MAIL_USERNAME'] = 'mediconnect608@gmail.com'
app.config['MAIL_PASSWORD'] = 'unpjxyelkcswulva'
app.config['MAIL_DEFAULT_SENDER'] = 'mediconnect608@gmail.com'

mail = Mail(app)
JWTManager(app)

app.register_blueprint(doctor_bp, url_prefix="/api/doctors")
app.register_blueprint(patient_bp, url_prefix="/api/patients")
app.register_blueprint(auth_bp, url_prefix="/api/auth")

@app.after_request
def set_security_headers(response):
    response.headers["Content-Security-Policy"] = (
        "default-src 'self'; "
        "script-src 'self' https://cdn.jsdelivr.net; "
        "style-src 'self' https://fonts.googleapis.com; "
        "font-src 'self' https://fonts.gstatic.com; "
        "img-src 'self' data:;"
    )
    return response

if __name__ == '__main__':
    print("Registered routes:")
    for rule in app.url_map.iter_rules():
        print(f"{rule} -> {rule.endpoint}")
    app.run(debug=False)
