from pydantic import BaseModel
from typing import Optional


class RsvpSubmit(BaseModel):
    status: str  # pending | confirmed | declined
    adults: Optional[int] = None
    children: Optional[int] = None
    notes: Optional[str] = None


class RsvpInfo(BaseModel):
    guest_id: int
    event_id: int
    token: str
    status: str
    name: str
    adults: int
    children: int
    notes: Optional[str] = None

    class Config:
        from_attributes = True
