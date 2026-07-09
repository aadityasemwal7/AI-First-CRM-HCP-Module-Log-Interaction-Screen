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
    return InteractionService.create(db, interaction)


@router.get(
    "/",
    response_model=list[InteractionResponse],
)
def get_interactions(
    db: Session = Depends(get_db),
):
    return InteractionService.get_all(db)


@router.get(
    "/{interaction_id}",
    response_model=InteractionResponse,
)
def get_interaction(
    interaction_id: int,
    db: Session = Depends(get_db),
):
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
