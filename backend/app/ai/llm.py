from langchain_groq import ChatGroq

from app.ai.tools import (
    log_interaction,
    edit_interaction,
    search_interaction,
    delete_interaction,
    summarize_interactions,
)
from app.core.config import settings


llm = ChatGroq(
    model="llama-3.1-8b-instant",
    api_key=settings.groq_api_key,
    temperature=0,
    max_retries=0,
)

llm_with_tools = llm.bind_tools(
    [
        log_interaction,
        edit_interaction,
        search_interaction,
        delete_interaction,
        summarize_interactions,
    ]
)
