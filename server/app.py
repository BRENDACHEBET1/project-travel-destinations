from flask import Flask, jsonify
from flask_cors import CORS
from flask_jwt_extended import JWTManager
from sqlalchemy import inspect, text

from config import Config
from models import db

from routes.destinations import destinations_bp
from routes.saved_destinations import saved_destinations_bp
from routes.auth import auth_bp


def create_app():
    """
    Application factory.

    Creates and configures the Flask application.
    """

    app = Flask(__name__)

    # Load settings from config.py
    app.config.from_object(Config)

    if not app.config["JWT_SECRET_KEY"]:
        raise RuntimeError("JWT_SECRET_KEY must be configured")

    # Connect SQLAlchemy to this Flask application
    db.init_app(app)
    JWTManager(app)

    # Allow requests from the React frontend
    CORS(app)

    # Register API routes
    app.register_blueprint(destinations_bp)
    app.register_blueprint(saved_destinations_bp)
    app.register_blueprint(auth_bp)

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
        columns = inspect(db.engine).get_columns("users")
        if "password_hash" not in {column["name"] for column in columns}:
            db.session.execute(
                text("ALTER TABLE users ADD COLUMN password_hash VARCHAR(255)")
            )
            db.session.commit()

        destination_columns = inspect(db.engine).get_columns("destinations")
        if "owner_id" not in {column["name"] for column in destination_columns}:
            db.session.execute(
                text(
                    "ALTER TABLE destinations "
                    "ADD COLUMN owner_id INTEGER REFERENCES users(id)"
                )
            )
            db.session.commit()

    return app


# Create the Flask application
app = create_app()


if __name__ == "__main__":
    app.run(
        host="0.0.0.0",
        port=5000,
        debug=True
    )
