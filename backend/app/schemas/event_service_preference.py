from pydantic import BaseModel
from typing import Optional
from datetime import datetime


class EventServicePreferenceBase(BaseModel):
    service_type: str
    service_id: Optional[int] = None
    priority: Optional[int] = 0
    is_required: Optional[bool] = False


class EventServicePreferenceCreate(EventServicePreferenceBase):
    event_id: int


class EventServicePreferenceResponse(EventServicePreferenceBase):
    id: int
    event_id: int
    created_at: datetime

    class Config:
        from_attributes = True
