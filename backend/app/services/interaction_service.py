"""
This module provides the business logic for managing HCP interactions.
It abstracts database operations into a service layer.
"""
from sqlalchemy.orm import Session

from app.models.interaction import Interaction
from app.schemas.interaction import (
    InteractionCreate,
    InteractionUpdate,
)


class InteractionService:
    """
    Service class containing static methods to handle CRUD operations
    for Interaction records in the database.
    """

    @staticmethod
    def create(
        db: Session,
        interaction: InteractionCreate,
        ai_summary: str | None = None,
    ) -> Interaction:
        """
        Creates a new interaction record in the database.
        
        Args:
            db (Session): The database session.
            interaction (InteractionCreate): The interaction data to insert.
            ai_summary (str | None, optional): An optional AI-generated summary. Defaults to None.
            
        Returns:
            Interaction: The created interaction database model instance.
        """

        db_interaction = Interaction(
            **interaction.model_dump(),
            ai_summary=ai_summary,
        )

        db.add(db_interaction)
        db.commit()
        db.refresh(db_interaction)

        return db_interaction

    @staticmethod
    def get(
        db: Session,
        interaction_id: int,
    ) -> Interaction | None:
        """
        Retrieves a single interaction by its ID.
        
        Args:
            db (Session): The database session.
            interaction_id (int): The ID of the interaction to retrieve.
            
        Returns:
            Interaction | None: The interaction instance if found, else None.
        """

        return db.query(Interaction).filter(Interaction.id == interaction_id).first()

    @staticmethod
    def get_all(
        db: Session,
    ) -> list[Interaction]:
        """
        Retrieves all interactions, ordered by creation date descending.
        
        Args:
            db (Session): The database session.
            
        Returns:
            list[Interaction]: A list of all interaction instances.
        """

        return db.query(Interaction).order_by(Interaction.created_at.desc()).all()

    @staticmethod
    def update(
        db: Session,
        interaction_id: int,
        interaction: InteractionUpdate,
    ) -> Interaction | None:
        """
        Updates an existing interaction record.
        
        Args:
            db (Session): The database session.
            interaction_id (int): The ID of the interaction to update.
            interaction (InteractionUpdate): The updated data.
            
        Returns:
            Interaction | None: The updated interaction instance if found, else None.
        """

        db_interaction = (
            db.query(Interaction).filter(Interaction.id == interaction_id).first()
        )

        if not db_interaction:
            return None

        update_data = interaction.model_dump(exclude_unset=True)

        for field, value in update_data.items():
            setattr(db_interaction, field, value)

        db.commit()
        db.refresh(db_interaction)

        return db_interaction

    @staticmethod
    def delete(
        db: Session,
        interaction_id: int,
    ) -> bool:
        """
        Deletes an interaction record.
        
        Args:
            db (Session): The database session.
            interaction_id (int): The ID of the interaction to delete.
            
        Returns:
            bool: True if deleted successfully, False if not found.
        """

        db_interaction = (
            db.query(Interaction).filter(Interaction.id == interaction_id).first()
        )

        if not db_interaction:
            return False

        db.delete(db_interaction)
        db.commit()

        return True

    @staticmethod
    def search_by_hcp_name(
        db: Session,
        hcp_name: str,
    ) -> list[Interaction]:
        """
        Search interactions by a partial match on the HCP name.
        
        Args:
            db (Session): The database session.
            hcp_name (str): The string to search for within HCP names.
            
        Returns:
            list[Interaction]: A list of matching interaction instances.
        """

        return (
            db.query(Interaction)
            .filter(Interaction.hcp_name.ilike(f"%{hcp_name}%"))
            .order_by(Interaction.interaction_date.desc())
            .all()
        )
