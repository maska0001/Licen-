from pydantic import BaseModel
from typing import Optional


class TableCreate(BaseModel):
    name: str
    total_seats: Optional[int] = 8


class TableUpdate(BaseModel):
    name: Optional[str] = None
    total_seats: Optional[int] = None
    occupied_seats: Optional[int] = None


class TableResponse(BaseModel):
    id: int
    event_id: int
    name: str
    total_seats: int
    occupied_seats: int

    class Config:
        from_attributes = True
