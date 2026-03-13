from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from app.database.session import get_db
from app.models.guest import Guest
from app.models.landing import LandingPage
from app.models.table import Table
from app.schemas.guest import GuestResponse
from app.schemas.rsvp import RsvpSubmit
from app.services.rsvp_service import get_guest_by_token

router = APIRouter(prefix="/public", tags=["Public RSVP"])


@router.get("/rsvp/{token}")
def get_rsvp_info(token: str, db: Session = Depends(get_db)):
    guest = get_guest_by_token(db, token)
    
    if not guest:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Invalid RSVP token"
        )
    
    # Get event landing page
    landing_page = db.query(LandingPage).filter(
        LandingPage.event_id == guest.event_id
    ).first()

    if not landing_page or not landing_page.published:
        raise HTTPException(status_code=404, detail="RSVP page not available")
    
    return {
        "guest": {
            "id": guest.id,
            "name": guest.name,
            "status": guest.status,
            "adults": guest.adults,
            "children": guest.children,
            "notes": guest.notes
        },
        "event": {
            "id": guest.event.id,
            "title": guest.event.title,
            "date": guest.event.date,
            "city": guest.event.city
        },
        "landing_page": {
            "content_json": landing_page.content_json if landing_page else None,
            "published": landing_page.published if landing_page else False
        }
    }


@router.post("/rsvp/{token}", response_model=GuestResponse)
def submit_rsvp(
    token: str,
    rsvp_data: RsvpSubmit,
    db: Session = Depends(get_db)
):
    guest = get_guest_by_token(db, token)
    
    if not guest:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Invalid RSVP token"
        )
    
    # Update guest RSVP information
    before_status = guest.status
    before_table = guest.table_id
    for key, value in rsvp_data.model_dump(exclude_unset=True).items():
        setattr(guest, key, value)

    # If guest declined, release table seat
    if before_status != "declined" and guest.status == "declined" and before_table:
        table = db.query(Table).filter(Table.id == before_table).first()
        if table and table.occupied_seats > 0:
            table.occupied_seats = max(0, table.occupied_seats - 1)
        guest.table_id = None
    
    db.commit()
    db.refresh(guest)
    return guest
