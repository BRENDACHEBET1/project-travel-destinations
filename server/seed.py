from app import app
from models import db, Destination, SavedDestination, User


def seed_database():
    """
    Populate the database with sample records.

    This is useful during development and testing.
    """

    with app.app_context():

        # Remove existing data so that the seed
        # can be run repeatedly during development.
        db.drop_all()

        # Recreate all database tables.
        db.create_all()

        # -----------------------------
        # Create sample users
        # -----------------------------

        user1 = User(
            username="brenda",
            email="brenda@example.com"
        )

        user2 = User(
            username="traveler",
            email="traveler@example.com"
        )

        # -----------------------------
        # Create sample destinations
        # -----------------------------

        destination1 = Destination(
            name="Maasai Mara",
            description=(
                "A famous wildlife destination "
                "in Kenya."
            ),
            image_url=(
                "https://example.com/"
                "maasai-mara.jpg"
            ),
            latitude=-1.4061,
            longitude=35.0080
        )

        destination2 = Destination(
            name="Diani Beach",
            description=(
                "A popular coastal destination "
                "in Kenya."
            ),
            image_url=(
                "https://example.com/"
                "diani.jpg"
            ),
            latitude=-4.1755,
            longitude=39.6036
        )

        destination3 = Destination(
            name="Mount Kenya",
            description=(
                "A major mountain destination "
                "in Kenya."
            ),
            image_url=(
                "https://example.com/"
                "mount-kenya.jpg"
            ),
            latitude=-0.1521,
            longitude=37.3084
        )

        # Add users and destinations
        db.session.add_all([
            user1,
            user2,
            destination1,
            destination2,
            destination3
        ])

        # Save them to the database first
        # so that IDs are generated.
        db.session.commit()

        # -----------------------------
        # Create saved destinations
        # -----------------------------

        saved1 = SavedDestination(
            user_id=user1.id,
            destination_id=destination1.id,
            notes="Visit during the migration."
        )

        saved2 = SavedDestination(
            user_id=user1.id,
            destination_id=destination2.id,
            notes="Plan a beach holiday."
        )

        saved3 = SavedDestination(
            user_id=user2.id,
            destination_id=destination3.id,
            notes="Great hiking destination."
        )

        db.session.add_all([
            saved1,
            saved2,
            saved3
        ])

        db.session.commit()

        print("Database seeded successfully.")


if __name__ == "__main__":
    seed_database()