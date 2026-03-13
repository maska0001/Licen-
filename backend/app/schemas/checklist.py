from pydantic import BaseModel
from typing import Optional
from datetime import date


class ChecklistItemCreate(BaseModel):
    task: str
    category: Optional[str] = None
    supplier_id: Optional[int] = None
    completed: Optional[bool] = False
    due_date: Optional[date] = None


class ChecklistItemUpdate(BaseModel):
    task: Optional[str] = None
    category: Optional[str] = None
    supplier_id: Optional[int] = None
    completed: Optional[bool] = None
    due_date: Optional[date] = None


class ChecklistItemResponse(BaseModel):
    id: int
    event_id: int
    task: str
    category: Optional[str]
    supplier_id: Optional[int]
    completed: bool
    due_date: Optional[date]

    class Config:
        from_attributes = True
