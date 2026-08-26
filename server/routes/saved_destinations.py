from flask import Blueprint, jsonify, request

from models import (
    db,
    Destination,
    SavedDestination,
    User
)


# Blueprint for saved destination routes
saved_destinations_bp = Blueprint(
    "saved_destinations",
    __name__,
    url_prefix="/api/saved-destinations"
)


@saved_destinations_bp.route("", methods=["GET"])
def get_saved_destinations():
    """
    GET /api/saved-destinations

    Return saved destinations.

    NOTE:
    In Phase 2 this returns all records.
    Phase 3 will restrict this to the logged-in user.
    """

    saved_destinations = SavedDestination.query.all()

    return jsonify([
        saved.to_dict()
        for saved in saved_destinations
    ]), 200


@saved_destinations_bp.route(
    "/<int:saved_id>",
    methods=["GET"]
)
def get_saved_destination(saved_id):
    """
    GET /api/saved-destinations/<id>

    Return one saved destination.
    """

    saved = db.session.get(
        SavedDestination,
        saved_id
    )

    if not saved:
        return jsonify({
            "error": "Saved destination not found"
        }), 404

    return jsonify(saved.to_dict()), 200


@saved_destinations_bp.route("", methods=["POST"])
def create_saved_destination():
    """
    POST /api/saved-destinations

    Save a destination for a user.

    Phase 2:
        user_id comes from the request.

    Phase 3:
        user_id will come from the authenticated user.
    """

    data = request.get_json()

    if not data:
        return jsonify({
            "error": "Request body is required"
        }), 400

    user_id = data.get("user_id")
    destination_id = data.get("destination_id")
    notes = data.get("notes")

    if not user_id or not destination_id:
        return jsonify({
            "error": "user_id and destination_id are required"
        }), 400

    # Confirm that the user exists
    user = db.session.get(
        User,
        user_id
    )

    if not user:
        return jsonify({
            "error": "User not found"
        }), 404

    # Confirm that the destination exists
    destination = db.session.get(
        Destination,
        destination_id
    )

    if not destination:
        return jsonify({
            "error": "Destination not found"
        }), 404

    # Prevent duplicate saves
    existing = SavedDestination.query.filter_by(
        user_id=user_id,
        destination_id=destination_id
    ).first()

    if existing:
        return jsonify({
            "error": "Destination already saved"
        }), 409

    saved = SavedDestination(
        user_id=user_id,
        destination_id=destination_id,
        notes=notes
    )

    db.session.add(saved)
    db.session.commit()

    return jsonify(saved.to_dict()), 201


@saved_destinations_bp.route(
    "/<int:saved_id>",
    methods=["PATCH"]
)
def update_saved_destination(saved_id):
    """
    PATCH /api/saved-destinations/<id>

    Update the user's saved destination.

    In Phase 2 this does not yet verify ownership.
    Phase 3 will add authorization.
    """

    saved = db.session.get(
        SavedDestination,
        saved_id
    )

    if not saved:
        return jsonify({
            "error": "Saved destination not found"
        }), 404

    data = request.get_json()

    # Allow the user to edit their personal notes
    if "notes" in data:
        saved.notes = data["notes"]

    # Allow changing the associated destination
    if "destination_id" in data:

        destination = db.session.get(
            Destination,
            data["destination_id"]
        )

        if not destination:
            return jsonify({
                "error": "Destination not found"
            }), 404

        saved.destination_id = data["destination_id"]

    db.session.commit()

    return jsonify(saved.to_dict()), 200


@saved_destinations_bp.route(
    "/<int:saved_id>",
    methods=["DELETE"]
)
def delete_saved_destination(saved_id):
    """
    DELETE /api/saved-destinations/<id>

    Remove a saved destination.

    Phase 3 will ensure that only the owner
    can perform this action.
    """

    saved = db.session.get(
        SavedDestination,
        saved_id
    )

    if not saved:
        return jsonify({
            "error": "Saved destination not found"
        }), 404

    db.session.delete(saved)
    db.session.commit()

    return jsonify({
        "message": "Saved destination deleted successfully"
    }), 200