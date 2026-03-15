from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List
from app.database.session import get_db
from app.models.user import User
from app.models.checklist import ChecklistItem
from app.schemas.checklist import ChecklistItemCreate, ChecklistItemUpdate, ChecklistItemResponse
from app.core.security import get_current_user
from app.utils.permissions import verify_event_ownership
from datetime import datetime

router = APIRouter(tags=["Checklist"])


@router.get("/events/{event_id}/checklist", response_model=List[ChecklistItemResponse])
def get_checklist_items(
    event_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    verify_event_ownership(db, event_id, current_user)
    checklist_items = db.query(ChecklistItem).filter(ChecklistItem.event_id == event_id).all()
    return checklist_items


@router.post("/events/{event_id}/checklist", response_model=ChecklistItemResponse, status_code=status.HTTP_201_CREATED)
def create_checklist_item(
    event_id: int,
    checklist_data: ChecklistItemCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    verify_event_ownership(db, event_id, current_user)
    new_checklist_item = ChecklistItem(**checklist_data.model_dump(), event_id=event_id)
    db.add(new_checklist_item)
    db.commit()
    db.refresh(new_checklist_item)
    return new_checklist_item


@router.put("/checklist/{checklist_id}", response_model=ChecklistItemResponse)
def update_checklist_item(
    checklist_id: int,
    checklist_data: ChecklistItemUpdate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    checklist_item = db.query(ChecklistItem).filter(ChecklistItem.id == checklist_id).first()
    if not checklist_item:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Checklist item not found")
    
    verify_event_ownership(db, checklist_item.event_id, current_user)
    
    updates = checklist_data.model_dump(exclude_unset=True)
    if checklist_item.kind == "auto":
        updates = {
            key: value
            for key, value in updates.items()
            if key in {"completed", "due_date", "priority"}
        }

    for key, value in updates.items():
        setattr(checklist_item, key, value)
    checklist_item.updated_at = datetime.utcnow()
    
    db.commit()
    db.refresh(checklist_item)
    return checklist_item


@router.delete("/checklist/{checklist_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_checklist_item(
    checklist_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    checklist_item = db.query(ChecklistItem).filter(ChecklistItem.id == checklist_id).first()
    if not checklist_item:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Checklist item not found")
    
    verify_event_ownership(db, checklist_item.event_id, current_user)
    db.delete(checklist_item)
    db.commit()
    return None
