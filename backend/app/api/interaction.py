"""
This module defines the API routes for managing HCP interactions.
It handles incoming HTTP requests and routes them to the appropriate service methods.
"""
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.database.session import get_db
from app.schemas.interaction import (
    InteractionCreate,
    InteractionResponse,
    InteractionUpdate,
)
from app.services.interaction_service import InteractionService

router = APIRouter(
    prefix="/interactions",
    tags=["Interactions"],
)


@router.post(
    "/",
    response_model=InteractionResponse,
    status_code=201,
)
def create_interaction(
    interaction: InteractionCreate,
    db: Session = Depends(get_db),
):
    """
    Create a new interaction record.
    
    Args:
        interaction (InteractionCreate): The interaction data to create.
        db (Session): The database session.
        
    Returns:
        InteractionResponse: The created interaction record.
    """
    return InteractionService.create(db, interaction)


@router.get(
    "/",
    response_model=list[InteractionResponse],
)
def get_interactions(
    db: Session = Depends(get_db),
):
    """
    Retrieve all interaction records.
    
    Args:
        db (Session): The database session.
        
    Returns:
        list[InteractionResponse]: A list of all interaction records.
    """
    return InteractionService.get_all(db)


@router.get(
    "/{interaction_id}",
    response_model=InteractionResponse,
)
def get_interaction(
    interaction_id: int,
    db: Session = Depends(get_db),
):
    """
    Retrieve a specific interaction record by its ID.
    
    Args:
        interaction_id (int): The ID of the interaction to retrieve.
        db (Session): The database session.
        
    Returns:
        InteractionResponse: The requested interaction record.
        
    Raises:
        HTTPException: If the interaction is not found (404).
    """
    interaction = InteractionService.get(db, interaction_id)

    if interaction is None:
        raise HTTPException(
            status_code=404,
            detail="Interaction not found",
        )

    return interaction


@router.put(
    "/{interaction_id}",
    response_model=InteractionResponse,
)
def update_interaction(
    interaction_id: int,
    interaction: InteractionUpdate,
    db: Session = Depends(get_db),
):
    """
    Update an existing interaction record.
    
    Args:
        interaction_id (int): The ID of the interaction to update.
        interaction (InteractionUpdate): The updated interaction data.
        db (Session): The database session.
        
    Returns:
        InteractionResponse: The updated interaction record.
        
    Raises:
        HTTPException: If the interaction is not found (404).
    """
    updated = InteractionService.update(
        db,
        interaction_id,
        interaction,
    )

    if updated is None:
        raise HTTPException(
            status_code=404,
            detail="Interaction not found",
        )

    return updated


@router.delete("/{interaction_id}")
def delete_interaction(
    interaction_id: int,
    db: Session = Depends(get_db),
):
    """
    Delete an interaction record by its ID.
    
    Args:
        interaction_id (int): The ID of the interaction to delete.
        db (Session): The database session.
        
    Returns:
        dict: A success message.
        
    Raises:
        HTTPException: If the interaction is not found (404).
    """
    deleted = InteractionService.delete(
        db,
        interaction_id,
    )

    if not deleted:
        raise HTTPException(
            status_code=404,
            detail="Interaction not found",
        )

    return {"message": "Interaction deleted successfully"}
