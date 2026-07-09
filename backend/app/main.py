from fastapi import FastAPI

from app.api.interaction import router as interaction_router
from app.routes.chat import router as chat_router

from app.database.database import engine, Base

Base.metadata.create_all(bind=engine)

from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(
    title="AI First CRM API",
    version="1.0.0",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], # For dev, we can allow all or specific "http://localhost:5173"
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(interaction_router)
app.include_router(chat_router)


@app.get("/")
def root():
    """
    Root endpoint for health checking the API.
    
    Returns:
        dict: A simple welcome message indicating the backend is running.
    """
    return {"message": "AI First CRM Backend Running"}
