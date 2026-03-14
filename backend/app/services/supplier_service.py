from datetime import timedelta
from sqlalchemy.orm import Session
from app.models.supplier import Supplier
from app.models.budget import BudgetItem, PaymentStatus
from app.models.checklist import ChecklistItem
from app.models.event import Event
from app.services.budget_service import update_event_budget_total


def _build_budget_name(supplier: Supplier) -> str:
    return f"{supplier.category} - {supplier.name}"


def _build_checklist_tasks(supplier: Supplier):
    return [
        f"Contact {supplier.name} ({supplier.category})",
        f"Sign contract with {supplier.name}",
        f"Pay advance to {supplier.name}",
        f"Confirm details with {supplier.name}",
    ]


def create_supplier_dependencies(db: Session, supplier: Supplier, event: Event):
    """
    When a supplier is selected, automatically create:
    1. A corresponding BudgetItem
    2. Several Checklist tasks
    """
    if not supplier.selected:
        return
    
    # Create BudgetItem
    budget_item = BudgetItem(
        event_id=supplier.event_id,
        supplier_id=supplier.id,
        category=supplier.category,
        name=_build_budget_name(supplier),
        estimated_cost=supplier.price,
        actual_cost=0.0,
        payment_status=PaymentStatus.unpaid
    )
    db.add(budget_item)
    
    # Create Checklist tasks with due dates relative to event date
    event_date = event.date
    
    tasks = [
        {"task": task, "days_before": days_before}
        for task, days_before in zip(_build_checklist_tasks(supplier), [90, 60, 45, 14])
    ]
    
    for task_data in tasks:
        # Calculate due date only if event date is set
        due_date = None
        if event_date:
            due_date = event_date - timedelta(days=task_data["days_before"])
            
        checklist_item = ChecklistItem(
            event_id=supplier.event_id,
            supplier_id=supplier.id,
            category=supplier.category,
            task=task_data["task"],
            completed=False,
            due_date=due_date
        )
        db.add(checklist_item)
    
    db.commit()
    
    # Update event's budget_total_estimated
    update_event_budget_total(db, supplier.event_id)


def sync_supplier_dependencies(db: Session, supplier: Supplier, event: Event):
    """
    Keep budget/checklist rows aligned when a selected supplier is edited.
    """
    if not supplier.selected:
        return

    budget_item = (
        db.query(BudgetItem)
        .filter(
            BudgetItem.event_id == supplier.event_id,
            BudgetItem.supplier_id == supplier.id,
        )
        .first()
    )
    if budget_item:
        budget_item.category = supplier.category
        budget_item.name = _build_budget_name(supplier)
        budget_item.estimated_cost = supplier.price

    checklist_items = (
        db.query(ChecklistItem)
        .filter(
            ChecklistItem.event_id == supplier.event_id,
            ChecklistItem.supplier_id == supplier.id,
        )
        .order_by(ChecklistItem.id.asc())
        .all()
    )
    task_labels = _build_checklist_tasks(supplier)
    for item, task_label in zip(checklist_items, task_labels):
        item.category = supplier.category
        item.task = task_label

    db.commit()
    update_event_budget_total(db, event.id)


def remove_supplier_dependencies(db: Session, supplier: Supplier):
    """
    When a supplier is deselected or deleted, remove associated budget items and checklist tasks
    """
    # Remove budget items
    db.query(BudgetItem).filter(
        BudgetItem.event_id == supplier.event_id,
        BudgetItem.supplier_id == supplier.id
    ).delete(synchronize_session=False)
    
    # Remove checklist items
    db.query(ChecklistItem).filter(
        ChecklistItem.event_id == supplier.event_id,
        ChecklistItem.supplier_id == supplier.id
    ).delete(synchronize_session=False)
    
    db.commit()
    
    # Update event's budget_total_estimated
    update_event_budget_total(db, supplier.event_id)
