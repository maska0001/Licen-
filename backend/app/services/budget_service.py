from sqlalchemy.orm import Session
from app.models.event import Event
from app.models.budget import BudgetItem


def update_event_budget_total(db: Session, event_id: int):
    """
    Recalculate and update the budget_total_estimated for an event
    based on all its budget items' estimated_cost
    """
    event = db.query(Event).filter(Event.id == event_id).first()
    if not event:
        return
    
    # Calculate total from all budget items
    budget_items = db.query(BudgetItem).filter(BudgetItem.event_id == event_id).all()
    total_estimated = sum(item.estimated_cost for item in budget_items)
    
    # Update event
    event.budget_total_estimated = int(total_estimated) if total_estimated > 0 else None
    db.commit()
