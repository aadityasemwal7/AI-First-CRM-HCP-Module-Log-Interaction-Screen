from datetime import datetime

from langchain_core.tools import tool
from pydantic import BaseModel

from app.common.enums import InteractionType
from app.database.database import SessionLocal
from app.schemas.interaction import InteractionCreate
from app.services.interaction_service import InteractionService


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
) -> dict:
    """
    Create a new HCP interaction in the CRM.
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
