from flask_sqlalchemy import SQLAlchemy

# Create the SQLAlchemy database object.
# It will be connected to Flask in app.py.
db = SQLAlchemy()


class User(db.Model):
    """
    Represents a user of the application.

    Authentication will be added to this model in Phase 3.
    """

    __tablename__ = "users"

    # Primary key
    id = db.Column(db.Integer, primary_key=True)
    # Username must be unique
    username = db.Column(
        db.String(80),
        unique=True,
        nullable=False
    )
    # Email must also be unique
    email = db.Column(
        db.String(120),
        unique=True,
        nullable=False
    )
    # Existing Phase 2 users may not have a password yet, so this remains
    # nullable until they reset or create one through the registration flow.
    password_hash = db.Column(db.String(255), nullable=True)
    # One user can have many saved destinations
    saved_destinations = db.relationship(
        "SavedDestination",
        back_populates="user",
        cascade="all, delete-orphan"
    )

    def to_dict(self):

        """Convert a User object into JSON-friendly data."""
        return {
            "id": self.id,
            "username": self.username,
            "email": self.email
        }


class Destination(db.Model):
    """
    Represents a tourist destination.

    Destination information can originate from Geoapify,
    but the destination is stored in our PostgreSQL database.
    """

    __tablename__ = "destinations"

    # Primary key
    id = db.Column(
        db.Integer,
        primary_key=True
    )

    # Destination name
    name = db.Column(
        db.String(150),
        nullable=False
    )

    # Description of the destination
    description = db.Column(
        db.Text
    )

    # URL for the destination image
    image_url = db.Column(
        db.String(500)
    )

    # Geographic coordinates
    latitude = db.Column(
        db.Float
    )

    longitude = db.Column(
        db.Float
    )

    # One destination can be saved by many users
    saved_destinations = db.relationship(
        "SavedDestination",
        back_populates="destination",
        cascade="all, delete-orphan"
    )

    def to_dict(self):
        """Convert a Destination object into JSON-friendly data."""

        return {
            "id": self.id,
            "name": self.name,
            "description": self.description,
            "image_url": self.image_url,
            "latitude": self.latitude,
            "longitude": self.longitude
        }

class SavedDestination(db.Model):
    """
    Represents a destination saved by a user.

    This is the user-owned resource that will become
    especially important in Phase 3 when authentication
    and authorization are added.
    """

    __tablename__ = "saved_destinations"

    # Primary key
    id = db.Column(
        db.Integer,
        primary_key=True
    )

    # Foreign key pointing to the user who saved the destination
    user_id = db.Column(
        db.Integer,
        db.ForeignKey("users.id"),
        nullable=False
    )

    # Foreign key pointing to the destination
    destination_id = db.Column(
        db.Integer,
        db.ForeignKey("destinations.id"),
        nullable=False
    )

    # Optional personal note.
    # This gives the user something meaningful to edit.
    notes = db.Column(
        db.Text,
        nullable=True
    )

    # Relationship back to User
    user = db.relationship(
        "User",
        back_populates="saved_destinations"
    )

    # Relationship back to Destination
    destination = db.relationship(
        "Destination",
        back_populates="saved_destinations"
    )

    # Prevent the same user from saving the same destination twice
    __table_args__ = (
        db.UniqueConstraint(
            "user_id",
            "destination_id",
            name="unique_user_destination"
        ),
    )

    def to_dict(self):
        """Convert SavedDestination into JSON-friendly data."""

        return {
            "id": self.id,
            "user_id": self.user_id,
            "destination_id": self.destination_id,
            "notes": self.notes,

            # Include destination information in the response
            "destination": (
                self.destination.to_dict()
                if self.destination
                else None
            )
        }
