from fastapi import HTTPException, status
from sqlalchemy.orm import Session
from app.models.user import User
from app.models.event import Event


def verify_event_ownership(db: Session, event_id: int, user: User) -> Event:
    """
    Verify that the user owns the event
    """
    event = db.query(Event).filter(Event.id == event_id).first()
    
    if not event:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Event not found"
        )
    
    if event.user_id != user.id:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Not authorized to access this event"
        )
    
    return event
