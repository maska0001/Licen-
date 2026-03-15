from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List
from typing import Optional
from app.database.session import get_db
from app.models.user import User
from app.models.budget import BudgetItem
from app.schemas.budget import BudgetItemCreate, BudgetItemUpdate, BudgetItemResponse
from app.core.security import get_current_user
from app.utils.permissions import verify_event_ownership
from app.services.budget_service import update_event_budget_total

router = APIRouter(tags=["Budget"])


def _normalize_budget_pricing(
    price_type: Optional[str],
    unit_price: Optional[float],
    quantity: Optional[int],
    estimated_cost: Optional[float],
):
    resolved_price_type = "PER_INVITAT" if price_type == "PER_INVITAT" else "FIX_EVENT"
    resolved_quantity = quantity if quantity and quantity > 0 else 1

    if resolved_price_type == "PER_INVITAT":
        resolved_unit_price = unit_price if unit_price is not None else 0.0
        resolved_estimated_cost = resolved_unit_price * resolved_quantity
    else:
        resolved_estimated_cost = estimated_cost if estimated_cost is not None else 0.0
        resolved_unit_price = resolved_estimated_cost
        resolved_quantity = 1

    return resolved_price_type, resolved_unit_price, resolved_quantity, resolved_estimated_cost


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
    (
        resolved_price_type,
        resolved_unit_price,
        resolved_quantity,
        resolved_estimated_cost,
    ) = _normalize_budget_pricing(
        budget_data.price_type,
        budget_data.unit_price,
        budget_data.quantity,
        budget_data.estimated_cost,
    )
    payload = budget_data.model_dump()
    payload["price_type"] = resolved_price_type
    payload["unit_price"] = resolved_unit_price
    payload["quantity"] = resolved_quantity
    payload["estimated_cost"] = resolved_estimated_cost
    new_budget_item = BudgetItem(**payload, event_id=event_id)
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
    
    update_payload = budget_data.model_dump(exclude_unset=True)
    for key, value in update_payload.items():
        setattr(budget_item, key, value)

    if (
        "price_type" in update_payload
        or "unit_price" in update_payload
        or "quantity" in update_payload
        or "estimated_cost" in update_payload
    ):
        (
            budget_item.price_type,
            budget_item.unit_price,
            budget_item.quantity,
            budget_item.estimated_cost,
        ) = _normalize_budget_pricing(
            budget_item.price_type,
            budget_item.unit_price,
            budget_item.quantity,
            budget_item.estimated_cost,
        )
    
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
