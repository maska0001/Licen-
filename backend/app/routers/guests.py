from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List
from app.database.session import get_db
from app.models.user import User
from app.models.guest import Guest
from app.models.table import Table
from app.schemas.guest import GuestCreate, GuestUpdate, GuestResponse
from app.services.rsvp_service import generate_rsvp_token
from app.core.security import get_current_user
from app.utils.permissions import verify_event_ownership

router = APIRouter(tags=["Guests"])


def serialize_guest(guest: Guest) -> dict:
    return {
        "id": guest.id,
        "event_id": guest.event_id,
        "name": guest.name,
        "phone": guest.phone,
        "email": guest.email,
        "status": guest.status,
        "adults": guest.adults,
        "children": guest.children,
        "notes": guest.notes,
        "table_id": guest.table_id,
        "parent_guest_id": guest.parent_guest_id,
        "is_children_only": guest.is_children_only,
        "rsvp_token": guest.rsvp_token.token if guest.rsvp_token else None,
    }


def _guest_seats(guest: Guest) -> int:
    return max(1, (guest.adults or 0) + (guest.children or 0))


@router.get("/events/{event_id}/guests", response_model=List[GuestResponse])
def get_guests(
    event_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    verify_event_ownership(db, event_id, current_user)
    guests = db.query(Guest).filter(Guest.event_id == event_id).all()
    return [serialize_guest(guest) for guest in guests]


@router.post("/events/{event_id}/guests", response_model=GuestResponse, status_code=status.HTTP_201_CREATED)
def create_guest(
    event_id: int,
    guest_data: GuestCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    verify_event_ownership(db, event_id, current_user)
    guest_dict = guest_data.model_dump()
    # Convert boolean to integer for PostgreSQL
    if 'is_children_only' in guest_dict and guest_dict['is_children_only'] is not None:
        guest_dict['is_children_only'] = 1 if guest_dict['is_children_only'] else 0
    new_guest = Guest(**guest_dict, event_id=event_id)
    db.add(new_guest)
    db.commit()
    db.refresh(new_guest)
    # generate RSVP token
    generate_rsvp_token(db, new_guest.id, event_id)
    db.refresh(new_guest)
    return serialize_guest(new_guest)


@router.put("/guests/{guest_id}", response_model=GuestResponse)
def update_guest(
    guest_id: int,
    guest_data: GuestUpdate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    guest = db.query(Guest).filter(Guest.id == guest_id).first()
    if not guest:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Guest not found")
    
    verify_event_ownership(db, guest.event_id, current_user)
    
    # track table changes on decline
    status_before = guest.status
    table_id_before = guest.table_id

    update_dict = guest_data.model_dump(exclude_unset=True)
    # Convert boolean to integer for PostgreSQL
    if 'is_children_only' in update_dict and update_dict['is_children_only'] is not None:
        update_dict['is_children_only'] = 1 if update_dict['is_children_only'] else 0
    
    for key, value in update_dict.items():
        setattr(guest, key, value)
    
    # If status becomes declined and had a seat, free it
    if status_before != "declined" and guest.status == "declined" and table_id_before:
        from app.models.table import Table  # local import to avoid cycle
        table = db.query(Table).filter(Table.id == table_id_before).first()
        if table and table.occupied_seats > 0:
            table.occupied_seats = max(0, table.occupied_seats - _guest_seats(guest))
        guest.table_id = None

    db.commit()
    db.refresh(guest)
    return serialize_guest(guest)


@router.delete("/guests/{guest_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_guest(
    guest_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    guest = db.query(Guest).filter(Guest.id == guest_id).first()
    if not guest:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Guest not found")

    verify_event_ownership(db, guest.event_id, current_user)

    if guest.table_id:
        table = db.query(Table).filter(Table.id == guest.table_id).first()
        if table and table.occupied_seats > 0:
            released_seats = max(1, (guest.adults or 0) + (guest.children or 0))
            table.occupied_seats = max(0, table.occupied_seats - released_seats)

    db.delete(guest)
    db.commit()
    return None
