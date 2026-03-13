import secrets
from sqlalchemy.orm import Session
from app.models.rsvp import RsvpToken
from app.models.guest import Guest


def generate_rsvp_token(db: Session, guest_id: int, event_id: int) -> str:
    """
    Generate a unique RSVP token for a guest
    """
    # Check if token already exists
    existing_token = db.query(RsvpToken).filter(RsvpToken.guest_id == guest_id).first()
    if existing_token:
        return existing_token.token
    
    # Generate unique token
    token = secrets.token_urlsafe(32)
    
    # Ensure uniqueness
    while db.query(RsvpToken).filter(RsvpToken.token == token).first():
        token = secrets.token_urlsafe(32)
    
    # Create token
    rsvp_token = RsvpToken(guest_id=guest_id, event_id=event_id, token=token)
    db.add(rsvp_token)
    db.commit()
    db.refresh(rsvp_token)
    
    return token


def get_guest_by_token(db: Session, token: str) -> Guest:
    """
    Retrieve guest by RSVP token
    """
    rsvp_token = db.query(RsvpToken).filter(RsvpToken.token == token).first()
    if not rsvp_token:
        return None
    
    guest = db.query(Guest).filter(Guest.id == rsvp_token.guest_id).first()
    return guest
