from sqlalchemy.orm import Session

from app.models.interaction import Interaction
from app.schemas.interaction import (
    InteractionCreate,
    InteractionUpdate,
)


class InteractionService:

    @staticmethod
    def create(
        db: Session,
        interaction: InteractionCreate,
        ai_summary: str | None = None,
    ) -> Interaction:

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

        return db.query(Interaction).filter(Interaction.id == interaction_id).first()

    @staticmethod
    def get_all(
        db: Session,
    ) -> list[Interaction]:

        return db.query(Interaction).order_by(Interaction.created_at.desc()).all()

    @staticmethod
    def update(
        db: Session,
        interaction_id: int,
        interaction: InteractionUpdate,
    ) -> Interaction | None:

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
        Search interactions by HCP name.
        """

    return (
        db.query(Interaction)
        .filter(Interaction.hcp_name.ilike(f"%{hcp_name}%"))
        .order_by(Interaction.interaction_date.desc())
        .all()
    )
