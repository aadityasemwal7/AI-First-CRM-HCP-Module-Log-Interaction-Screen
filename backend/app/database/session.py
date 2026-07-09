"""
This module provides database session management utilities for the application.
It handles the creation and proper closure of database sessions.
"""
from app.database.database import SessionLocal


def get_db():
    """
    Creates and yields a new database session, ensuring it's closed after use.
    
    Yields:
        Session: A SQLAlchemy database session object.
    """
    db = SessionLocal()

    try:
        yield db

    finally:
        db.close()
