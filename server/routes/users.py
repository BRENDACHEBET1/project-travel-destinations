from flask import Blueprint, jsonify, request

from models import db, User


# Create a Blueprint for all User routes.
users_bp = Blueprint(
    "users",
    __name__,
    url_prefix="/api/users"
)


@users_bp.route("", methods=["GET"])
def get_users():
    """
    GET /api/users

    Return all users.
    """

    users = User.query.all()

    return jsonify([
        user.to_dict()
        for user in users
    ]), 200


@users_bp.route("/<int:user_id>", methods=["GET"])
def get_user(user_id):
    """
    GET /api/users/<id>

    Return one user.
    """

    user = db.session.get(User, user_id)

    if not user:
        return jsonify({
            "error": "User not found"
        }), 404

    return jsonify(user.to_dict()), 200


@users_bp.route("", methods=["POST"])
def create_user():
    """
    POST /api/users

    Create a new user.

    Account registration with a password is handled by /api/auth/register.
    """

    data = request.get_json()

    if not data:
        return jsonify({
            "error": "Request body is required"
        }), 400

    username = data.get("username")
    email = data.get("email")

    if not username or not email:
        return jsonify({
            "error": "Username and email are required"
        }), 400

    # Check whether username or email is already being used
    existing_user = User.query.filter(
        (User.username == username) |
        (User.email == email)
    ).first()

    if existing_user:
        return jsonify({
            "error": "Username or email already exists"
        }), 409

    user = User(
        username=username,
        email=email
    )

    db.session.add(user)
    db.session.commit()

    return jsonify(user.to_dict()), 201


@users_bp.route("/<int:user_id>", methods=["PATCH"])
def update_user(user_id):
    """
    PATCH /api/users/<id>

    Update an existing user.
    """

    user = db.session.get(User, user_id)

    if not user:
        return jsonify({
            "error": "User not found"
        }), 404

    data = request.get_json()

    if "username" in data:
        user.username = data["username"]

    if "email" in data:
        user.email = data["email"]

    db.session.commit()

    return jsonify(user.to_dict()), 200


@users_bp.route("/<int:user_id>", methods=["DELETE"])
def delete_user(user_id):
    """
    DELETE /api/users/<id>

    Delete an existing user.
    """

    user = db.session.get(User, user_id)

    if not user:
        return jsonify({
            "error": "User not found"
        }), 404

    db.session.delete(user)
    db.session.commit()

    return jsonify({
        "message": "User deleted successfully"
    }), 200
