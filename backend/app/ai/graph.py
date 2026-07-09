"""
This module defines the state graph for the AI chatbot.
It sets up the nodes, edges, and conditions to manage the flow of the conversation
between the user, the language model, and the available tools.
"""
from langchain_core.messages import SystemMessage
from langgraph.graph import END, START, StateGraph
from langgraph.graph.message import add_messages
from langgraph.prebuilt import tools_condition

from app.ai.llm import llm_with_tools
from app.ai.nodes import tool_node
from app.ai.prompts import SYSTEM_PROMPT
from app.ai.state import CRMState


def chatbot(state: CRMState):
    """
    Processes the current state and invokes the language model.
    
    Args:
        state (CRMState): The current state of the conversation, including messages.
        
    Returns:
        dict: A dictionary containing the newly generated messages from the LLM.
    """
    messages = [SystemMessage(content=SYSTEM_PROMPT)] + state["messages"]
    return {"messages": [llm_with_tools.invoke(messages)]}


graph_builder = StateGraph(CRMState)

graph_builder.add_node(
    "chatbot",
    chatbot,
)

graph_builder.add_node(
    "tools",
    tool_node,
)

graph_builder.add_edge(
    START,
    "chatbot",
)

graph_builder.add_conditional_edges(
    "chatbot",
    tools_condition,
)

graph_builder.add_edge(
    "tools",
    "chatbot",
)

graph_builder.add_edge(
    "chatbot",
    END,
)

graph = graph_builder.compile()
