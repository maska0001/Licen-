from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from sqlalchemy import func, case
from typing import List
from app.database.session import get_db
from app.models.user import User
from app.models.event import Event
from app.schemas.event import EventCreate, EventUpdate, EventResponse
from app.core.security import get_current_user
from app.utils.permissions import verify_event_ownership
from app.models.guest import Guest, RsvpStatus
from app.models.checklist import ChecklistItem
from app.models.budget import BudgetItem, PaymentStatus
from app.models.supplier import Supplier

router = APIRouter(prefix="/events", tags=["Events"])


@router.get("", response_model=List[EventResponse])
def get_events(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    events = db.query(Event).filter(Event.user_id == current_user.id).all()
    return events


@router.post("", response_model=EventResponse, status_code=status.HTTP_201_CREATED)
def create_event(
    event_data: EventCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    new_event = Event(**event_data.model_dump(), user_id=current_user.id)
    db.add(new_event)
    db.commit()
    db.refresh(new_event)
    return new_event


@router.get("/{event_id}", response_model=EventResponse)
def get_event(
    event_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    event = verify_event_ownership(db, event_id, current_user)
    return event


@router.put("/{event_id}", response_model=EventResponse)
def update_event(
    event_id: int,
    event_data: EventUpdate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    event = verify_event_ownership(db, event_id, current_user)
    
    for key, value in event_data.model_dump(exclude_unset=True).items():
        setattr(event, key, value)
    
    db.commit()
    db.refresh(event)
    return event


@router.delete("/{event_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_event(
    event_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    event = verify_event_ownership(db, event_id, current_user)
    db.delete(event)
    db.commit()
    return None


@router.get("/{event_id}/overview")
def get_event_overview(
    event_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    event = verify_event_ownership(db, event_id, current_user)

    rsvp_counts = dict(
        pending=db.query(func.count(Guest.id)).filter(Guest.event_id == event_id, Guest.status == RsvpStatus.pending).scalar() or 0,
        confirmed=db.query(func.count(Guest.id)).filter(Guest.event_id == event_id, Guest.status == RsvpStatus.confirmed).scalar() or 0,
        declined=db.query(func.count(Guest.id)).filter(Guest.event_id == event_id, Guest.status == RsvpStatus.declined).scalar() or 0,
    )

    checklist_total = db.query(func.count(ChecklistItem.id)).filter(ChecklistItem.event_id == event_id).scalar() or 0
    checklist_done = db.query(func.count(ChecklistItem.id)).filter(ChecklistItem.event_id == event_id, ChecklistItem.completed == True).scalar() or 0  # noqa: E712

    budget_est = db.query(func.coalesce(func.sum(BudgetItem.estimated_cost), 0)).filter(BudgetItem.event_id == event_id).scalar() or 0
    budget_real = db.query(func.coalesce(func.sum(BudgetItem.actual_cost), 0)).filter(BudgetItem.event_id == event_id).scalar() or 0
    budget_paid = db.query(func.coalesce(func.sum(
        case((BudgetItem.payment_status == PaymentStatus.paid, BudgetItem.actual_cost), else_=0)
    ), 0)).filter(BudgetItem.event_id == event_id).scalar() or 0
    paid_percent = 0
    if budget_real:
        paid_percent = round((budget_paid / budget_real) * 100, 2)

    suppliers_selected = db.query(func.count(Supplier.id)).filter(Supplier.event_id == event_id, Supplier.selected == True).scalar() or 0  # noqa: E712

    return {
        "event": {
            "id": event.id,
            "title": event.title,
            "event_type": event.event_type,
            "city": event.city,
            "date": event.date,
            "guest_count": event.guest_count,
        },
        "rsvp_counts": rsvp_counts,
        "checklist": {"done": checklist_done, "total": checklist_total},
        "budget": {
            "estimated_total": budget_est,
            "actual_total": budget_real,
            "paid_total": budget_paid,
            "paid_percent": paid_percent,
        },
        "suppliers_selected": suppliers_selected,
    }
