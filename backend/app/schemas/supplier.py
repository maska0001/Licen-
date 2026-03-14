from pydantic import BaseModel
from typing import Optional


class SupplierCreate(BaseModel):
    name: str
    category: Optional[str] = None
    service_id: Optional[int] = None
    contact: Optional[str] = None
    location: Optional[str] = None
    price: Optional[float] = 0.0
    price_type: Optional[str] = "FIX_EVENT"
    rating: Optional[float] = 0.0
    selected: Optional[bool] = False
    is_custom: Optional[bool] = False


class SupplierUpdate(BaseModel):
    name: Optional[str] = None
    category: Optional[str] = None
    service_id: Optional[int] = None
    contact: Optional[str] = None
    location: Optional[str] = None
    price: Optional[float] = None
    price_type: Optional[str] = None
    rating: Optional[float] = None
    selected: Optional[bool] = None
    is_custom: Optional[bool] = None


class SupplierResponse(BaseModel):
    id: int
    event_id: int
    name: str
    category: str
    service_id: Optional[int] = None
    service_name: Optional[str] = None
    service_group: Optional[str] = None
    contact: Optional[str]
    location: Optional[str]
    price: float
    price_type: str
    original_price: Optional[float] = None
    original_price_type: Optional[str] = None
    is_price_modified: bool = False
    rating: float
    selected: bool
    is_custom: bool

    class Config:
        from_attributes = True
