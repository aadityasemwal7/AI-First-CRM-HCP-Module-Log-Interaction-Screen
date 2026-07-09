from langgraph.graph import END, START, StateGraph
from langgraph.graph.message import add_messages
from langgraph.prebuilt import tools_condition

from app.ai.llm import llm_with_tools
from app.ai.nodes import tool_node
from app.ai.state import CRMState


def chatbot(state: CRMState):
    return {"messages": [llm_with_tools.invoke(state["messages"])]}


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
