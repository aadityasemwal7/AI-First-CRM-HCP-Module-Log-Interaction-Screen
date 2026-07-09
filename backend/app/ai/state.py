from typing import Any, TypedDict

from langchain_core.messages import BaseMessage

from app.common.enums import Intent


class CRMState(TypedDict):
    messages: list[BaseMessage]

    intent: Intent | None

    tool_name: str | None

    tool_args: dict[str, Any]

    tool_result: Any

    response: str | None