from pydantic import BaseModel
from typing import Optional, List
from datetime import datetime


class EventPackageItemResponse(BaseModel):
    id: int
    service_type: str
    supplier_template_id: Optional[int]
    pricing_row_id: Optional[int]
    supplier_name_snapshot: str
    estimated_cost: float
    supplier_rating_snapshot: float
    matrix_position: Optional[str]
    pricing_model: Optional[str]
    base_price_per_unit: Optional[float]
    notes: Optional[str]

    class Config:
        from_attributes = True


class EventPackageResponse(BaseModel):
    id: int
    event_id: int
    name: str
    total_estimated_cost: float
    is_recommended: bool
    is_selected: bool
    generation_version: int
    created_at: datetime
    items: List[EventPackageItemResponse] = []

    class Config:
        from_attributes = True
