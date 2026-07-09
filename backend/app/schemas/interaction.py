"""
This module defines the Pydantic schemas used for data validation and serialization.
These schemas are used extensively in the API routing layer.
"""
from datetime import datetime

from pydantic import BaseModel, ConfigDict

from app.models.interaction import InteractionType


class InteractionBase(BaseModel):
    """
    Base schema for an interaction containing common fields.
    """
    hcp_name: str
    hcp_specialty: str
    interaction_type: InteractionType
    interaction_date: datetime
    discussion_notes: str
    next_action: str
    follow_up_date: datetime | None = None


class InteractionCreate(InteractionBase):
    """
    Schema for creating a new interaction. Inherits all fields from InteractionBase.
    """
    pass


class InteractionUpdate(BaseModel):
    """
    Schema for updating an existing interaction. All fields are optional.
    """
    hcp_name: str | None = None
    hcp_specialty: str | None = None
    interaction_type: InteractionType | None = None
    interaction_date: datetime | None = None
    discussion_notes: str | None = None
    ai_summary: str | None = None
    next_action: str | None = None
    follow_up_date: datetime | None = None


class InteractionResponse(InteractionBase):
    """
    Schema for returning an interaction record in API responses.
    Includes database-assigned fields like id and timestamps.
    """
    id: int
    ai_summary: str | None
    created_at: datetime
    updated_at: datetime

    model_config = ConfigDict(from_attributes=True)
