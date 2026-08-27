from flask import Blueprint, jsonify, request
from flask_jwt_extended import create_access_token, get_jwt_identity, jwt_required
from werkzeug.security import check_password_hash, generate_password_hash

from models import db, User


auth_bp = Blueprint("auth", __name__, url_prefix="/api/auth")


def credentials_from_request():
    data = request.get_json(silent=True) or {}
    return data, data.get("email", "").strip().lower(), data.get("password", "")


@auth_bp.route("/register", methods=["POST"])
def register():
    """Create an account and return an access token."""
    data, email, password = credentials_from_request()
    username = data.get("username", "").strip()

    if not username or not email or not password:
        return jsonify({"error": "Username, email, and password are required"}), 400
    if len(password) < 8:
        return jsonify({"error": "Password must be at least 8 characters"}), 400

    existing_user = User.query.filter(
        (User.username == username) | (User.email == email)
    ).first()
    if existing_user:
        return jsonify({"error": "Username or email already exists"}), 409

    user = User(
        username=username,
        email=email,
        password_hash=generate_password_hash(password),
    )
    db.session.add(user)
    db.session.commit()

    return jsonify({
        "access_token": create_access_token(identity=str(user.id)),
        "user": user.to_dict(),
    }), 201


@auth_bp.route("/login", methods=["POST"])
def login():
    """Authenticate a user and return an access token."""
    _, email, password = credentials_from_request()
    user = User.query.filter_by(email=email).first()

    if not user or not user.password_hash or not check_password_hash(
        user.password_hash, password
    ):
        return jsonify({"error": "Invalid email or password"}), 401

    return jsonify({
        "access_token": create_access_token(identity=str(user.id)),
        "user": user.to_dict(),
    }), 200


@auth_bp.route("/me", methods=["GET"])
@jwt_required()
def current_user():
    """Return the user represented by the access token."""
    user = db.session.get(User, int(get_jwt_identity()))
    if not user:
        return jsonify({"error": "User not found"}), 404
    return jsonify(user.to_dict()), 200
