from fastapi import APIRouter, HTTPException
from fastapi.responses import StreamingResponse
import traceback
import json

from langchain_core.messages import HumanMessage

from app.ai.graph import graph

router = APIRouter(
    prefix="/chat",
    tags=["AI Chat"],
)


@router.post("/")
async def chat(message: str):
    async def event_generator():
        try:
            async for event in graph.astream_events({"messages": [HumanMessage(content=message)]}, version="v2"):
                kind = event["event"]
                
                if kind == "on_chat_model_stream":
                    chunk = event["data"]["chunk"]
                    if chunk.content:
                        yield f"data: {json.dumps({'type': 'token', 'content': chunk.content})}\n\n"
                        
                elif kind == "on_tool_start":
                    tool_name = event.get("name", "unknown")
                    yield f"data: {json.dumps({'type': 'progress', 'content': f'Running tool: {tool_name}'})}\n\n"
                    
                elif kind == "on_tool_end":
                    yield f"data: {json.dumps({'type': 'progress', 'content': ''})}\n\n"
                    
        except Exception as e:
            print(f"Error in chat endpoint stream: {e}")
            traceback.print_exc()
            yield f"data: {json.dumps({'type': 'error', 'content': str(e)})}\n\n"

    return StreamingResponse(event_generator(), media_type="text/event-stream")

