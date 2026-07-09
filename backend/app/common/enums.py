from enum import Enum


class InteractionType(str, Enum):
    VISIT = "Visit"
    CALL = "Call"
    EMAIL = "Email"
    CONFERENCE = "Conference"


class Intent(str, Enum):
    LOG = "log"
    EDIT = "edit"
    SEARCH = "search"
    DELETE = "delete"
    SUMMARIZE = "summarize"
