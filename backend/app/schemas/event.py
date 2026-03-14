from pydantic import BaseModel
from datetime import date, datetime
from typing import Optional, List, Any, Dict
from enum import Enum


class EventStatus(str, Enum):
    DRAFT = "draft"
    FINALIZED = "finalized"
    ARCHIVED = "archived"


class EventCreate(BaseModel):
    title: str
    event_type: Optional[str] = None
    date: Optional[date] = None
    time: Optional[str] = None
    city: Optional[str] = None
    guest_count: Optional[int] = 0


class EventUpdate(BaseModel):
    title: Optional[str] = None
    event_type: Optional[str] = None
    date: Optional[date] = None
    time: Optional[str] = None
    planning_stage: Optional[str] = None
    date_mode: Optional[str] = None
    event_month: Optional[int] = None
    event_year: Optional[int] = None
    city: Optional[str] = None
    venue_city: Optional[str] = None
    venue_name: Optional[str] = None
    venue_address: Optional[str] = None
    venue_price_per_guest: Optional[int] = None
    location_mode: Optional[str] = None
    guest_count_min: Optional[int] = None
    guest_count_max: Optional[int] = None
    guest_count: Optional[int] = None
    guest_count_estimated: Optional[int] = None
    default_adults: Optional[int] = None
    default_children: Optional[int] = None
    planning_mode: Optional[str] = None
    package_id: Optional[str] = None
    selected_package_id: Optional[int] = None
    has_budget: Optional[bool] = None
    budget_total_estimated: Optional[int] = None
    budget_currency: Optional[str] = None
    status: Optional[EventStatus] = None
    wizard_step: Optional[int] = None


class EventResponse(BaseModel):
    id: int
    user_id: int
    title: str
    event_type: Optional[str]
    date: Optional[date]
    time: Optional[str] = None
    planning_stage: Optional[str] = None
    date_mode: Optional[str] = None
    event_month: Optional[int] = None
    event_year: Optional[int] = None
    city: Optional[str]
    venue_city: Optional[str] = None
    venue_name: Optional[str] = None
    venue_address: Optional[str] = None
    venue_price_per_guest: Optional[int] = None
    location_mode: Optional[str] = None
    guest_count_min: Optional[int]
    guest_count_max: Optional[int]
    guest_count_estimated: int
    guest_count: int
    default_adults: int
    default_children: int
    planning_mode: Optional[str] = None
    package_id: Optional[str] = None
    selected_package_id: Optional[int] = None
    has_budget: bool
    budget_total_estimated: Optional[int]
    budget_currency: Optional[str]
    enabled_modules: Optional[List[str]] = None
    status: EventStatus
    wizard_step: int
    created_at: datetime

    class Config:
        from_attributes = True


# Wizard-specific schemas
class WizardStep1Create(BaseModel):
    """Pas 1 - Tip + Titlu eveniment"""
    title: str
    event_type: Optional[str] = None


class WizardStep2Update(BaseModel):
    """Pas 2 - Stadiu planificare"""
    planning_stage: Optional[str] = None


class WizardStep3Update(BaseModel):
    """Pas 3 - Data și ora (opțională dacă nu este cunoscută încă)"""
    date: Optional[str] = None  # Accept string in YYYY-MM-DD format
    time: Optional[str] = None
    date_mode: Optional[str] = None
    event_month: Optional[int] = None
    event_year: Optional[int] = None


class WizardStep4Update(BaseModel):
    """Pas 4 - Locație"""
    city: Optional[str] = None
    venue_city: Optional[str] = None
    venue_name: Optional[str] = None
    address: Optional[str] = None
    venue_price_per_guest: Optional[int] = None
    location_mode: Optional[str] = None


class WizardStep5Update(BaseModel):
    """Pas 5 - Estimare invitați + Buget"""
    guest_count_estimated: Optional[int] = None
    guest_count_min: Optional[int] = None
    guest_count_max: Optional[int] = None
    default_adults: Optional[int] = 1
    default_children: Optional[int] = 0
    has_budget: Optional[bool] = None
    budget_total_estimated: Optional[int] = None
    budget_currency: Optional[str] = "MDL"


class WizardStep6Update(BaseModel):
    """Pas 6 - Selectarea serviciilor dorite"""
    package_id: Optional[str] = None
    enabled_modules: Optional[List[str]] = None
    services: Optional[List[str]] = None  # selected service categories


class WizardBudgetItemCreate(BaseModel):
    """Pas 7 - Buget item"""
    name: str
    category: str
    estimatedPrice: float
    realPrice: Optional[float] = None
    paymentStatus: Optional[str] = "unpaid"


class WizardStep7Update(BaseModel):
    """Pas 7 - Buget inițial"""
    budget_items: List[WizardBudgetItemCreate] = []


class WizardStep8Update(BaseModel):
    """Pas 8 - Pachete / Finalizare"""
    content_json: Optional[Dict[str, Any]] = None
    published: bool = False


class WizardFinalizeResponse(BaseModel):
    """Răspuns la finalizarea wizard-ului"""
    event: EventResponse
    message: str
