from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from app.database.session import get_db
from app.models.user import User
from app.models.landing import LandingPage
from app.schemas.landing import LandingPageUpdate, LandingPageResponse
from app.core.security import get_current_user
from app.utils.permissions import verify_event_ownership

router = APIRouter(tags=["Landing"])


@router.get("/events/{event_id}/landing", response_model=LandingPageResponse)
def get_landing_page(
    event_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    verify_event_ownership(db, event_id, current_user)
    landing_page = db.query(LandingPage).filter(LandingPage.event_id == event_id).first()
    
    if not landing_page:
        # Create default landing page if it doesn't exist
        landing_page = LandingPage(event_id=event_id, content_json=None, published=False)
        db.add(landing_page)
        db.commit()
        db.refresh(landing_page)
    
    return landing_page


@router.put("/events/{event_id}/landing", response_model=LandingPageResponse)
def update_landing_page(
    event_id: int,
    landing_data: LandingPageUpdate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    verify_event_ownership(db, event_id, current_user)
    landing_page = db.query(LandingPage).filter(LandingPage.event_id == event_id).first()
    
    if not landing_page:
        landing_page = LandingPage(event_id=event_id)
        db.add(landing_page)
    
    for key, value in landing_data.model_dump(exclude_unset=True).items():
        setattr(landing_page, key, value)
    
    db.commit()
    db.refresh(landing_page)
    return landing_page


@router.post("/events/{event_id}/landing/publish", response_model=LandingPageResponse)
def publish_landing_page(
    event_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    verify_event_ownership(db, event_id, current_user)
    landing_page = db.query(LandingPage).filter(LandingPage.event_id == event_id).first()
    
    if not landing_page:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Landing page not found"
        )
    
    landing_page.published = True
    db.commit()
    db.refresh(landing_page)
    return landing_page
