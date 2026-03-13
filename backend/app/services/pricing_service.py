from sqlalchemy.orm import Session
from typing import Optional
from app.models.supplier_template_pricing import SupplierTemplatePricing


def resolve_supplier_pricing(db: Session, supplier_template_id: int, event_type: str) -> Optional[SupplierTemplatePricing]:
    """
    Return pricing row for supplier template and event_type.
    Strategy: exact match; if not found, fallback to any pricing marked is_active with no event_type match -> returns None for now.
    """
    pricing = db.query(SupplierTemplatePricing).filter(
        SupplierTemplatePricing.supplier_template_id == supplier_template_id,
        SupplierTemplatePricing.event_type == event_type,
        SupplierTemplatePricing.is_active == True  # noqa: E712
    ).first()

    if pricing:
        return pricing

    # Fallback: generic price where event_type == 'default' if exists
    pricing = db.query(SupplierTemplatePricing).filter(
        SupplierTemplatePricing.supplier_template_id == supplier_template_id,
        SupplierTemplatePricing.event_type == "default",
        SupplierTemplatePricing.is_active == True  # noqa: E712
    ).first()

    return pricing
