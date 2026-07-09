from sqlalchemy import create_engine
from sqlalchemy.orm import DeclarativeBase, sessionmaker
from app.core.config import settings


class Base(DeclarativeBase):
    pass


# db engine
engine = create_engine(settings.database_url, echo=True)


# session factory
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
