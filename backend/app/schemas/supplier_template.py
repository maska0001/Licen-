from pydantic import BaseModel, EmailStr
from typing import Optional
from datetime import datetime


class SupplierTemplateBase(BaseModel):
    name: str
    service_type: str
    description: Optional[str] = None
    phone: Optional[str] = None
    email: Optional[EmailStr] = None
    website: Optional[str] = None
    rating: float = 0.0
    is_active: bool = True


class SupplierTemplateCreate(SupplierTemplateBase):
    pass


class SupplierTemplateResponse(SupplierTemplateBase):
    id: int
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True


class SupplierTemplatePricingBase(BaseModel):
    supplier_template_id: int
    event_type: str
    pricing_model: Optional[str] = None
    base_price: float
    price_per_guest: Optional[float] = None
    price_per_hour: Optional[float] = None
    notes: Optional[str] = None
    is_active: bool = True


class SupplierTemplatePricingCreate(SupplierTemplatePricingBase):
    pass


class SupplierTemplatePricingResponse(SupplierTemplatePricingBase):
    id: int
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True
