from pydantic import BaseModel
from typing import Optional
from app.models.budget import PaymentStatus


class BudgetItemCreate(BaseModel):
    name: str
    category: Optional[str] = "General"
    supplier_id: Optional[int] = None
    estimated_cost: Optional[float] = 0.0
    actual_cost: Optional[float] = 0.0
    payment_status: Optional[PaymentStatus] = PaymentStatus.unpaid


class BudgetItemUpdate(BaseModel):
    name: Optional[str] = None
    category: Optional[str] = None
    supplier_id: Optional[int] = None
    estimated_cost: Optional[float] = None
    actual_cost: Optional[float] = None
    payment_status: Optional[PaymentStatus] = None


class BudgetItemResponse(BaseModel):
    id: int
    event_id: int
    supplier_id: Optional[int]
    category: str
    name: str
    estimated_cost: float
    actual_cost: float
    payment_status: PaymentStatus

    class Config:
        from_attributes = True
