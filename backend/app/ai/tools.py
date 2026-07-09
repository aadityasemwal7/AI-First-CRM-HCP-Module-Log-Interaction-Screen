"""
This module defines the LangChain tools available to the AI assistant.
Each tool corresponds to an operation (log, edit, search, delete, summarize)
that interacts with the underlying database via the InteractionService.
"""
from datetime import datetime

from langchain_core.tools import tool
from pydantic import BaseModel

from app.common.enums import InteractionType
from app.database.database import SessionLocal
from app.schemas.interaction import (
    InteractionCreate,
    InteractionUpdate,
)
from app.services.interaction_service import InteractionService


# ==========================
# Log Interaction
# ==========================


class LogInteractionInput(BaseModel):
    hcp_name: str
    hcp_specialty: str
    interaction_type: InteractionType
    interaction_date: datetime
    discussion_notes: str
    next_action: str
    follow_up_date: datetime | None = None
    ai_summary: str | None = None


@tool(args_schema=LogInteractionInput)
def log_interaction(
    hcp_name: str,
    hcp_specialty: str,
    interaction_type: InteractionType,
    interaction_date: datetime,
    discussion_notes: str,
    next_action: str,
    follow_up_date: datetime | None = None,
    ai_summary: str | None = None,
):
    """
    Create a new HCP interaction.
    
    Args:
        hcp_name (str): The name of the healthcare professional.
        hcp_specialty (str): The specialty of the healthcare professional.
        interaction_type (InteractionType): The type of interaction (e.g. In-Person, Virtual).
        interaction_date (datetime): The date and time of the interaction.
        discussion_notes (str): Detailed notes of the discussion.
        next_action (str): The next action to take.
        follow_up_date (datetime | None, optional): The scheduled follow-up date. Defaults to None.
        ai_summary (str | None, optional): The AI generated summary. Defaults to None.
        
    Returns:
        dict: A dictionary containing the success status, interaction ID, and message.
    """

    db = SessionLocal()

    try:
        interaction = InteractionCreate(
            hcp_name=hcp_name,
            hcp_specialty=hcp_specialty,
            interaction_type=interaction_type,
            interaction_date=interaction_date,
            discussion_notes=discussion_notes,
            next_action=next_action,
            follow_up_date=follow_up_date,
        )

        created = InteractionService.create(
            db=db,
            interaction=interaction,
            ai_summary=ai_summary,
        )

        return {
            "success": True,
            "interaction_id": created.id,
            "message": "Interaction logged successfully.",
        }

    except Exception as e:
        db.rollback()

        return {
            "success": False,
            "message": str(e),
        }

    finally:
        db.close()


# ==========================
# Edit Interaction
# ==========================


class EditInteractionInput(BaseModel):
    interaction_id: int

    hcp_name: str | None = None
    hcp_specialty: str | None = None
    interaction_type: InteractionType | None = None
    interaction_date: datetime | None = None
    discussion_notes: str | None = None
    ai_summary: str | None = None
    next_action: str | None = None
    follow_up_date: datetime | None = None


@tool(args_schema=EditInteractionInput)
def edit_interaction(
    interaction_id: int,
    hcp_name: str | None = None,
    hcp_specialty: str | None = None,
    interaction_type: InteractionType | None = None,
    interaction_date: datetime | None = None,
    discussion_notes: str | None = None,
    ai_summary: str | None = None,
    next_action: str | None = None,
    follow_up_date: datetime | None = None,
):
    """
    Update an existing HCP interaction.
    
    Args:
        interaction_id (int): The ID of the interaction to update.
        hcp_name (str | None, optional): The new name of the HCP. Defaults to None.
        hcp_specialty (str | None, optional): The new specialty of the HCP. Defaults to None.
        interaction_type (InteractionType | None, optional): The new interaction type. Defaults to None.
        interaction_date (datetime | None, optional): The new interaction date. Defaults to None.
        discussion_notes (str | None, optional): The new discussion notes. Defaults to None.
        ai_summary (str | None, optional): The new AI summary. Defaults to None.
        next_action (str | None, optional): The new next action. Defaults to None.
        follow_up_date (datetime | None, optional): The new follow-up date. Defaults to None.
        
    Returns:
        dict: A dictionary containing the success status, updated interaction ID, and message.
    """

    db = SessionLocal()

    try:
        update_data = InteractionUpdate(
            hcp_name=hcp_name,
            hcp_specialty=hcp_specialty,
            interaction_type=interaction_type,
            interaction_date=interaction_date,
            discussion_notes=discussion_notes,
            ai_summary=ai_summary,
            next_action=next_action,
            follow_up_date=follow_up_date,
        )

        updated = InteractionService.update(
            db=db,
            interaction_id=interaction_id,
            interaction=update_data,
        )

        if updated is None:
            return {
                "success": False,
                "message": "Interaction not found.",
            }

        return {
            "success": True,
            "interaction_id": updated.id,
            "message": "Interaction updated successfully.",
        }

    except Exception as e:
        db.rollback()

        return {
            "success": False,
            "message": str(e),
        }

    finally:
        db.close()


# ==========================
# Search Interaction
# ==========================


class SearchInteractionInput(BaseModel):
    hcp_name: str


@tool(args_schema=SearchInteractionInput)
def search_interaction(hcp_name: str):
    """
    Search interactions by HCP name.
    
    Args:
        hcp_name (str): The name of the HCP to search for.
        
    Returns:
        dict: A dictionary containing the success status, count of results, and the list of interactions.
    """

    db = SessionLocal()

    try:
        interactions = InteractionService.search_by_hcp_name(
            db=db,
            hcp_name=hcp_name,
        )

        return {
            "success": True,
            "count": len(interactions),
            "results": interactions,
        }

    except Exception as e:
        return {
            "success": False,
            "message": str(e),
        }

    finally:
        db.close()


# ==========================
# Delete Interaction
# ==========================


class DeleteInteractionInput(BaseModel):
    interaction_id: int


@tool(args_schema=DeleteInteractionInput)
def delete_interaction(interaction_id: int):
    """
    Delete an interaction.
    
    Args:
        interaction_id (int): The ID of the interaction to delete.
        
    Returns:
        dict: A dictionary containing the success status and message.
    """

    db = SessionLocal()

    try:
        deleted = InteractionService.delete(
            db=db,
            interaction_id=interaction_id,
        )

        return {
            "success": deleted,
            "message": (
                "Interaction deleted successfully."
                if deleted
                else "Interaction not found."
            ),
        }

    except Exception as e:
        db.rollback()

        return {
            "success": False,
            "message": str(e),
        }

    finally:
        db.close()


# ==========================
# Summarize Interactions
# ==========================


class SummarizeInteractionInput(BaseModel):
    hcp_name: str


@tool(args_schema=SummarizeInteractionInput)
def summarize_interactions(hcp_name: str):
    """
    Retrieve all interactions for an HCP.
    The LLM will use these to generate a summary.
    
    Args:
        hcp_name (str): The name of the HCP whose interactions should be summarized.
        
    Returns:
        dict: A dictionary containing the success status, count of interactions, and summarized interaction data.
    """

    db = SessionLocal()

    try:
        interactions = InteractionService.search_by_hcp_name(
            db=db,
            hcp_name=hcp_name,
        )

        summaries = [
            {
                "id": interaction.id,
                "interaction_date": interaction.interaction_date,
                "discussion_notes": interaction.discussion_notes,
                "ai_summary": interaction.ai_summary,
                "next_action": interaction.next_action,
            }
            for interaction in interactions
        ]

        return {
            "success": True,
            "count": len(summaries),
            "interactions": summaries,
        }

    except Exception as e:
        return {
            "success": False,
            "message": str(e),
        }

    finally:
        db.close()
