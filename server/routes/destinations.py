from flask import Blueprint, jsonify, request
from flask_jwt_extended import get_jwt_identity, jwt_required

from models import db, Destination


# Blueprint for destination-related routes
destinations_bp = Blueprint(
    "destinations",
    __name__,
    url_prefix="/api/destinations"
)


@destinations_bp.route("", methods=["GET"])
def get_destinations():
    """
    GET /api/destinations

    Return all destinations stored in PostgreSQL.
    """

    destinations = Destination.query.all()

    return jsonify([
        destination.to_dict()
        for destination in destinations
    ]), 200


@destinations_bp.route(
    "/<int:destination_id>",
    methods=["GET"]
)
def get_destination(destination_id):
    """
    GET /api/destinations/<id>

    Return one destination.
    """

    destination = db.session.get(
        Destination,
        destination_id
    )

    if not destination:
        return jsonify({
            "error": "Destination not found"
        }), 404

    return jsonify(destination.to_dict()), 200


@destinations_bp.route("", methods=["POST"])
@jwt_required()
def create_destination():
    """
    POST /api/destinations

    Create a destination in our database.

    The data can originate from Geoapify.
    """

    data = request.get_json()

    if not data:
        return jsonify({
            "error": "Request body is required"
        }), 400

    name = data.get("name")

    if not name:
        return jsonify({
            "error": "Destination name is required"
        }), 400

    destination = Destination(
        name=name,
        description=data.get("description"),
        image_url=data.get("image_url"),
        latitude=data.get("latitude"),
        longitude=data.get("longitude"),
        owner_id=int(get_jwt_identity())
    )

    db.session.add(destination)
    db.session.commit()

    return jsonify(destination.to_dict()), 201


@destinations_bp.route(
    "/<int:destination_id>",
    methods=["PATCH"]
)
@jwt_required()
def update_destination(destination_id):
    """
    PATCH /api/destinations/<id>

    Update a destination owned by the authenticated user.
    """

    destination = Destination.query.filter_by(
        id=destination_id,
        owner_id=int(get_jwt_identity()),
    ).first()

    if not destination:
        return jsonify({
            "error": "Destination not found"
        }), 404

    data = request.get_json()

    if "name" in data:
        destination.name = data["name"]

    if "description" in data:
        destination.description = data["description"]

    if "image_url" in data:
        destination.image_url = data["image_url"]

    if "latitude" in data:
        destination.latitude = data["latitude"]

    if "longitude" in data:
        destination.longitude = data["longitude"]

    db.session.commit()

    return jsonify(destination.to_dict()), 200


@destinations_bp.route(
    "/<int:destination_id>",
    methods=["DELETE"]
)
@jwt_required()
def delete_destination(destination_id):
    """
    DELETE /api/destinations/<id>

    Delete a destination owned by the authenticated user.
    """

    destination = Destination.query.filter_by(
        id=destination_id,
        owner_id=int(get_jwt_identity()),
    ).first()

    if not destination:
        return jsonify({
            "error": "Destination not found"
        }), 404

    db.session.delete(destination)
    db.session.commit()

    return jsonify({
        "message": "Destination deleted successfully"
    }), 200
