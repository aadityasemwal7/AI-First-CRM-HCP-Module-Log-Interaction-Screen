from fastapi import APIRouter

from langchain_core.messages import HumanMessage

from app.ai.graph import graph

router = APIRouter(
    prefix="/chat",
    tags=["AI Chat"],
)


@router.post("/")
def chat(message: str):

    result = graph.invoke({"messages": [HumanMessage(content=message)]})

    return {"response": result["messages"][-1].content}
