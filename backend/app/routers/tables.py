from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List
from app.database.session import get_db
from app.models.user import User
from app.models.table import Table
from app.models.guest import Guest
from app.schemas.table import TableCreate, TableUpdate, TableResponse
from app.core.security import get_current_user
from app.utils.permissions import verify_event_ownership

router = APIRouter(tags=["Tables"])


def _guest_seats(guest: Guest) -> int:
    return max(1, (guest.adults or 0) + (guest.children or 0))


def _recalculate_table_occupied_seats(db: Session, table: Table) -> None:
    guests = db.query(Guest).filter(Guest.table_id == table.id).all()
    table.occupied_seats = sum(_guest_seats(guest) for guest in guests)


@router.get("/events/{event_id}/tables", response_model=List[TableResponse])
def get_tables(
    event_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    verify_event_ownership(db, event_id, current_user)
    tables = db.query(Table).filter(Table.event_id == event_id).all()
    for table in tables:
        _recalculate_table_occupied_seats(db, table)
    db.commit()
    return tables


@router.post("/events/{event_id}/tables", response_model=TableResponse, status_code=status.HTTP_201_CREATED)
def create_table(
    event_id: int,
    table_data: TableCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    verify_event_ownership(db, event_id, current_user)
    new_table = Table(**table_data.model_dump(), event_id=event_id)
    db.add(new_table)
    db.commit()
    db.refresh(new_table)
    return new_table


@router.put("/tables/{table_id}", response_model=TableResponse)
def update_table(
    table_id: int,
    table_data: TableUpdate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    table = db.query(Table).filter(Table.id == table_id).first()
    if not table:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Table not found")
    
    verify_event_ownership(db, table.event_id, current_user)
    
    for key, value in table_data.model_dump(exclude_unset=True).items():
        setattr(table, key, value)
    
    db.commit()
    db.refresh(table)
    return table


@router.post("/tables/{table_id}/assign/{guest_id}", response_model=TableResponse)
def assign_guest(
    table_id: int,
    guest_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    table = db.query(Table).filter(Table.id == table_id).first()
    if not table:
        raise HTTPException(status_code=404, detail="Table not found")

    guest = db.query(Guest).filter(Guest.id == guest_id).first()
    if not guest:
        raise HTTPException(status_code=404, detail="Guest not found")

    verify_event_ownership(db, table.event_id, current_user)
    if guest.event_id != table.event_id:
        raise HTTPException(status_code=403, detail="Guest not in this event")

    required_seats = _guest_seats(guest)
    available_seats = table.total_seats - table.occupied_seats
    if available_seats < required_seats:
        raise HTTPException(status_code=400, detail="Table is full")

    # if guest already seated elsewhere, free that seat
    if guest.table_id and guest.table_id != table_id:
        old_table = db.query(Table).filter(Table.id == guest.table_id).first()
        if old_table and old_table.occupied_seats > 0:
            old_table.occupied_seats = max(0, old_table.occupied_seats - required_seats)

    guest.table_id = table_id
    table.occupied_seats += required_seats
    db.commit()
    db.refresh(table)
    return table


@router.post("/tables/{table_id}/unassign/{guest_id}", response_model=TableResponse)
def unassign_guest(
    table_id: int,
    guest_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    table = db.query(Table).filter(Table.id == table_id).first()
    if not table:
        raise HTTPException(status_code=404, detail="Table not found")

    guest = db.query(Guest).filter(Guest.id == guest_id).first()
    if not guest:
        raise HTTPException(status_code=404, detail="Guest not found")

    verify_event_ownership(db, table.event_id, current_user)
    if guest.event_id != table.event_id:
        raise HTTPException(status_code=403, detail="Guest not in this event")

    if guest.table_id == table_id and table.occupied_seats > 0:
        table.occupied_seats = max(0, table.occupied_seats - _guest_seats(guest))
        guest.table_id = None
        db.commit()
        db.refresh(table)
    return table


@router.delete("/tables/{table_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_table(
    table_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    table = db.query(Table).filter(Table.id == table_id).first()
    if not table:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Table not found")
    
    verify_event_ownership(db, table.event_id, current_user)
    db.delete(table)
    db.commit()
    return None
