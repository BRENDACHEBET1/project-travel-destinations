from flask import Flask, jsonify
from flask_cors import CORS

from config import Config
from models import db

from routes.users import users_bp
from routes.destinations import destinations_bp


def create_app():
    """
    Application factory.

    Creates and configures the Flask application.
    """

    app = Flask(__name__)

    # Load settings from config.py
    app.config.from_object(Config)

    # Connect SQLAlchemy to this Flask application
    db.init_app(app)

    # Allow requests from the React frontend
    CORS(app)

    # Register API routes
    app.register_blueprint(users_bp)
    app.register_blueprint(destinations_bp)

    @app.route("/")
    def home():
        """Basic API welcome route."""

        return jsonify({
            "message": "WorldExplorer API is running"
        })

    @app.route("/api/health")
    def health():
        """Simple endpoint for checking API status."""

        return jsonify({
            "status": "ok"
        })

    # Create database tables if they don't already exist
    with app.app_context():
        db.create_all()

    return app


# Create the Flask application
app = create_app()


if __name__ == "__main__":
    app.run(
        host="0.0.0.0",
        port=5000,
        debug=True
    )