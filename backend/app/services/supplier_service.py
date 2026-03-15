from datetime import date, timedelta
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
        {"task": f"Contact {supplier.name} ({supplier.category})", "days_before": 90, "priority": "high"},
        {"task": f"Sign contract with {supplier.name}", "days_before": 60, "priority": "high"},
        {"task": f"Pay advance to {supplier.name}", "days_before": 45, "priority": "medium"},
        {"task": f"Confirm details with {supplier.name}", "days_before": 14, "priority": "medium"},
    ]


def _calculate_due_date(event_date: date | None, days_before: int):
    if not event_date:
        return None
    return event_date - timedelta(days=days_before)


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
        price_type=supplier.price_type,
        unit_price=supplier.price,
        quantity=event.guest_count if supplier.price_type == "PER_INVITAT" else 1,
        estimated_cost=(
            supplier.price * event.guest_count
            if supplier.price_type == "PER_INVITAT" and event.guest_count
            else supplier.price
        ),
        actual_cost=0.0,
        payment_status=PaymentStatus.unpaid
    )
    db.add(budget_item)
    
    # Create Checklist tasks with due dates relative to event date
    event_date = event.date
    
    tasks = _build_checklist_tasks(supplier)
    
    for task_data in tasks:
        # Calculate due date only if event date is set
        due_date = _calculate_due_date(event_date, task_data["days_before"])
            
        checklist_item = ChecklistItem(
            event_id=supplier.event_id,
            supplier_id=supplier.id,
            category=supplier.category,
            task=task_data["task"],
            completed=False,
            due_date=due_date,
            kind="auto",
            priority=task_data["priority"],
            source_type="supplier",
            source_id=supplier.id,
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
        budget_item.price_type = supplier.price_type
        budget_item.unit_price = supplier.price
        budget_item.quantity = (
            event.guest_count if supplier.price_type == "PER_INVITAT" else 1
        )
        budget_item.estimated_cost = (
            supplier.price * event.guest_count
            if supplier.price_type == "PER_INVITAT" and event.guest_count
            else supplier.price
        )

    checklist_items = (
        db.query(ChecklistItem)
        .filter(
            ChecklistItem.event_id == supplier.event_id,
            ChecklistItem.supplier_id == supplier.id,
        )
        .order_by(ChecklistItem.id.asc())
        .all()
    )
    task_defs = _build_checklist_tasks(supplier)
    for item, task_def in zip(checklist_items, task_defs):
        item.category = supplier.category
        item.task = task_def["task"]
        item.due_date = _calculate_due_date(event.date, task_def["days_before"])
        item.kind = "auto"
        item.priority = task_def["priority"]
        item.source_type = "supplier"
        item.source_id = supplier.id

    db.commit()
    update_event_budget_total(db, event.id)


def sync_event_supplier_dependencies(db: Session, event: Event):
    """
    Recalculate dependent budget/checklist data for all selected suppliers
    after an event-level change, such as guest_count.
    """
    selected_suppliers = (
        db.query(Supplier)
        .filter(
            Supplier.event_id == event.id,
            Supplier.selected == True,  # noqa: E712
        )
        .all()
    )

    for supplier in selected_suppliers:
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
            budget_item.price_type = supplier.price_type
            budget_item.unit_price = supplier.price
            budget_item.quantity = (
                event.guest_count if supplier.price_type == "PER_INVITAT" else 1
            )
            budget_item.estimated_cost = (
                supplier.price * event.guest_count
                if supplier.price_type == "PER_INVITAT" and event.guest_count
                else supplier.price
            )

        checklist_items = (
            db.query(ChecklistItem)
            .filter(
                ChecklistItem.event_id == supplier.event_id,
                ChecklistItem.supplier_id == supplier.id,
            )
            .order_by(ChecklistItem.id.asc())
            .all()
        )
        task_defs = _build_checklist_tasks(supplier)
        for item, task_def in zip(checklist_items, task_defs):
            item.category = supplier.category
            item.task = task_def["task"]
            item.due_date = _calculate_due_date(event.date, task_def["days_before"])
            item.kind = "auto"
            item.priority = task_def["priority"]
            item.source_type = "supplier"
            item.source_id = supplier.id

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
