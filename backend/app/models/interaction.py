from datetime import datetime
from app.common.enums import InteractionType

from sqlalchemy import DateTime, Enum as SQLEnum, Integer, String, Text, func
from sqlalchemy.orm import Mapped, mapped_column

from app.database.database import Base


class InteractionType(str, Enum):
    VISIT = "Visit"
    CALL = "Call"
    EMAIL = "Email"
    CONFERENCE = "Conference"


class Interaction(Base):
    __tablename__ = "interactions"

    id: Mapped[int] = mapped_column(
        Integer,
        primary_key=True,
        index=True,
    )

    hcp_name: Mapped[str] = mapped_column(
        String(255),
        nullable=False,
        index=True,
    )

    hcp_specialty: Mapped[str] = mapped_column(
        String(255),
        nullable=False,
    )

    interaction_type: Mapped[InteractionType] = mapped_column(
        SQLEnum(InteractionType, name="interaction_type_enum"),
        nullable=False,
    )

    interaction_date: Mapped[datetime] = mapped_column(
        DateTime(timezone=True),
        nullable=False,
    )

    discussion_notes: Mapped[str] = mapped_column(
        Text,
        nullable=False,
    )

    ai_summary: Mapped[str | None] = mapped_column(
        Text,
        nullable=True,
    )

    next_action: Mapped[str] = mapped_column(
        String(500),
        nullable=False,
    )

    follow_up_date: Mapped[datetime | None] = mapped_column(
        DateTime(timezone=True),
        nullable=True,
    )

    created_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True),
        server_default=func.now(),
        nullable=False,
    )

    updated_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True),
        server_default=func.now(),
        onupdate=func.now(),
        nullable=False,
    )
