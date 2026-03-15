from pydantic import BaseModel, EmailStr, field_serializer
from typing import Any, Optional
from app.models.guest import RsvpStatus


class GuestCreate(BaseModel):
    name: str
    phone: Optional[str] = None
    email: Optional[EmailStr] = None
    status: Optional[RsvpStatus] = RsvpStatus.pending
    adults: Optional[int] = 1
    children: Optional[int] = 0
    notes: Optional[str] = None
    table_id: Optional[int] = None
    parent_guest_id: Optional[int] = None
    is_children_only: Optional[bool] = False


class GuestUpdate(BaseModel):
    name: Optional[str] = None
    phone: Optional[str] = None
    email: Optional[EmailStr] = None
    status: Optional[RsvpStatus] = None
    adults: Optional[int] = None
    children: Optional[int] = None
    notes: Optional[str] = None
    table_id: Optional[int] = None
    parent_guest_id: Optional[int] = None
    is_children_only: Optional[bool] = None


class GuestResponse(BaseModel):
    id: int
    event_id: int
    name: str
    phone: Optional[str]
    email: Optional[str]
    status: RsvpStatus
    adults: int
    children: int
    notes: Optional[str]
    table_id: Optional[int]
    parent_guest_id: Optional[int]
    is_children_only: bool
    rsvp_token: Optional[str] = None

    @field_serializer('is_children_only')
    def serialize_is_children_only(self, value: int) -> bool:
        """Convert integer (0/1) to boolean for response"""
        return bool(value)

    @field_serializer('rsvp_token')
    def serialize_rsvp_token(self, value: Any) -> Optional[str]:
        if value is None:
            return None
        return getattr(value, 'token', value)

    class Config:
        from_attributes = True


class RsvpUpdate(BaseModel):
    status: RsvpStatus
    adults: Optional[int] = None
    children: Optional[int] = None
    notes: Optional[str] = None
