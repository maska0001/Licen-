from pydantic import BaseModel
from typing import Optional
from datetime import date, datetime


class ChecklistItemCreate(BaseModel):
    task: str
    category: Optional[str] = None
    supplier_id: Optional[int] = None
    completed: Optional[bool] = False
    due_date: Optional[date] = None
    kind: Optional[str] = "manual"
    priority: Optional[str] = "medium"
    source_type: Optional[str] = None
    source_id: Optional[int] = None


class ChecklistItemUpdate(BaseModel):
    task: Optional[str] = None
    category: Optional[str] = None
    supplier_id: Optional[int] = None
    completed: Optional[bool] = None
    due_date: Optional[date] = None
    priority: Optional[str] = None


class ChecklistItemResponse(BaseModel):
    id: int
    event_id: int
    task: str
    category: Optional[str]
    supplier_id: Optional[int]
    completed: bool
    due_date: Optional[date]
    kind: str
    priority: str
    source_type: Optional[str]
    source_id: Optional[int]
    created_at: Optional[datetime]
    updated_at: Optional[datetime]

    class Config:
        from_attributes = True
