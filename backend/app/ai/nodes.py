from langgraph.prebuilt import ToolNode

from app.ai.tools import (
    log_interaction,
    edit_interaction,
    search_interaction,
    delete_interaction,
    summarize_interactions,
)

tools = [
    log_interaction,
    edit_interaction,
    search_interaction,
    delete_interaction,
    summarize_interactions,
]

tool_node = ToolNode(tools)
