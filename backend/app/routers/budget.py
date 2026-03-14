from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List
from app.database.session import get_db
from app.models.user import User
from app.models.budget import BudgetItem
from app.schemas.budget import BudgetItemCreate, BudgetItemUpdate, BudgetItemResponse
from app.core.security import get_current_user
from app.utils.permissions import verify_event_ownership
from app.services.budget_service import update_event_budget_total

router = APIRouter(tags=["Budget"])


@router.get("/events/{event_id}/budget", response_model=List[BudgetItemResponse])
def get_budget_items(
    event_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    verify_event_ownership(db, event_id, current_user)
    budget_items = (
        db.query(BudgetItem)
        .filter(BudgetItem.event_id == event_id)
        .order_by(BudgetItem.updated_at.desc(), BudgetItem.id.desc())
        .all()
    )
    return budget_items


@router.post("/events/{event_id}/budget", response_model=BudgetItemResponse, status_code=status.HTTP_201_CREATED)
def create_budget_item(
    event_id: int,
    budget_data: BudgetItemCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    verify_event_ownership(db, event_id, current_user)
    new_budget_item = BudgetItem(**budget_data.model_dump(), event_id=event_id)
    db.add(new_budget_item)
    db.commit()
    db.refresh(new_budget_item)
    
    # Update event's budget_total_estimated
    update_event_budget_total(db, event_id)
    
    return new_budget_item


@router.put("/budget/{budget_id}", response_model=BudgetItemResponse)
def update_budget_item(
    budget_id: int,
    budget_data: BudgetItemUpdate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    budget_item = db.query(BudgetItem).filter(BudgetItem.id == budget_id).first()
    if not budget_item:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Budget item not found")
    
    verify_event_ownership(db, budget_item.event_id, current_user)
    
    for key, value in budget_data.model_dump(exclude_unset=True).items():
        setattr(budget_item, key, value)
    
    db.commit()
    db.refresh(budget_item)
    
    # Update event's budget_total_estimated
    update_event_budget_total(db, budget_item.event_id)
    
    return budget_item


@router.delete("/budget/{budget_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_budget_item(
    budget_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    budget_item = db.query(BudgetItem).filter(BudgetItem.id == budget_id).first()
    if not budget_item:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Budget item not found")
    
    event_id = budget_item.event_id
    verify_event_ownership(db, event_id, current_user)
    db.delete(budget_item)
    db.commit()
    
    # Update event's budget_total_estimated
    update_event_budget_total(db, event_id)
    
    return None
