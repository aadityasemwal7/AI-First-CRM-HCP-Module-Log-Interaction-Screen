"""
This module contains standard enumerations used throughout the application.
"""
from enum import Enum


class InteractionType(str, Enum):
    """
    Defines the valid methods of interacting with an HCP.
    """
    VISIT = "Visit"
    CALL = "Call"
    EMAIL = "Email"
    CONFERENCE = "Conference"


class Intent(str, Enum):
    """
    Defines the valid intents recognized by the AI assistant.
    """
    LOG = "log"
    EDIT = "edit"
    SEARCH = "search"
    DELETE = "delete"
    SUMMARIZE = "summarize"
