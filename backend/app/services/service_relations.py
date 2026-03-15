from typing import Optional

from sqlalchemy import inspect, text
from sqlalchemy.orm import Session

from app.models.service import Service
from app.models.event_service_preference import EventServicePreference
from app.models.event_package_item import EventPackageItem
from app.models.supplier import Supplier
from app.models.supplier_template import SupplierTemplate


def ensure_service_relation_columns(db: Session) -> None:
    inspector = inspect(db.bind)

    supplier_columns = {column["name"] for column in inspector.get_columns("suppliers")}
    if "service_id" not in supplier_columns:
        db.execute(text("ALTER TABLE suppliers ADD COLUMN IF NOT EXISTS service_id INTEGER"))
        db.execute(
            text(
                "CREATE INDEX IF NOT EXISTS ix_suppliers_service_id ON suppliers (service_id)"
            )
        )
    if "original_price" not in supplier_columns:
        db.execute(
            text("ALTER TABLE suppliers ADD COLUMN IF NOT EXISTS original_price DOUBLE PRECISION")
        )
    if "original_price_type" not in supplier_columns:
        db.execute(
            text("ALTER TABLE suppliers ADD COLUMN IF NOT EXISTS original_price_type VARCHAR")
        )

    template_columns = {
        column["name"] for column in inspector.get_columns("supplier_templates")
    }
    if "service_id" not in template_columns:
        db.execute(
            text(
                "ALTER TABLE supplier_templates ADD COLUMN IF NOT EXISTS service_id INTEGER"
            )
        )
        db.execute(
            text(
                "CREATE INDEX IF NOT EXISTS ix_supplier_templates_service_id "
                "ON supplier_templates (service_id)"
            )
        )

    preference_columns = {
        column["name"] for column in inspector.get_columns("event_service_preferences")
    }
    if "service_id" not in preference_columns:
        db.execute(
            text(
                "ALTER TABLE event_service_preferences "
                "ADD COLUMN IF NOT EXISTS service_id INTEGER"
            )
        )
        db.execute(
            text(
                "CREATE INDEX IF NOT EXISTS ix_event_service_preferences_service_id "
                "ON event_service_preferences (service_id)"
            )
        )

    package_item_columns = {
        column["name"] for column in inspector.get_columns("event_package_items")
    }
    if "service_id" not in package_item_columns:
        db.execute(
            text(
                "ALTER TABLE event_package_items "
                "ADD COLUMN IF NOT EXISTS service_id INTEGER"
            )
        )
        db.execute(
            text(
                "CREATE INDEX IF NOT EXISTS ix_event_package_items_service_id "
                "ON event_package_items (service_id)"
            )
        )
    if "supplier_is_custom_snapshot" not in package_item_columns:
        db.execute(
            text(
                "ALTER TABLE event_package_items "
                "ADD COLUMN IF NOT EXISTS supplier_is_custom_snapshot BOOLEAN DEFAULT FALSE"
            )
        )
    if "supplier_contact_snapshot" not in package_item_columns:
        db.execute(
            text(
                "ALTER TABLE event_package_items "
                "ADD COLUMN IF NOT EXISTS supplier_contact_snapshot VARCHAR"
            )
        )
    if "supplier_location_snapshot" not in package_item_columns:
        db.execute(
            text(
                "ALTER TABLE event_package_items "
                "ADD COLUMN IF NOT EXISTS supplier_location_snapshot VARCHAR"
            )
        )

    db.commit()


def sync_service_relations(db: Session) -> None:
    services_by_name = {
        service.name: service.id for service in db.query(Service).filter(Service.is_active == True).all()
    }

    changed = False

    templates = db.query(SupplierTemplate).all()
    for template in templates:
        resolved_service_id = services_by_name.get(template.service_type)
        if resolved_service_id and template.service_id != resolved_service_id:
            template.service_id = resolved_service_id
            changed = True

    suppliers = db.query(Supplier).all()
    for supplier in suppliers:
        resolved_service_id = services_by_name.get(supplier.category)
        if resolved_service_id and supplier.service_id != resolved_service_id:
            supplier.service_id = resolved_service_id
            changed = True
        if supplier.original_price is None:
            supplier.original_price = supplier.price
            changed = True
        if supplier.original_price_type is None:
            supplier.original_price_type = supplier.price_type
            changed = True

    preferences = db.query(EventServicePreference).all()
    for preference in preferences:
        resolved_service_id = services_by_name.get(preference.service_type)
        if resolved_service_id and preference.service_id != resolved_service_id:
            preference.service_id = resolved_service_id
            changed = True

    package_items = db.query(EventPackageItem).all()
    for package_item in package_items:
        resolved_service_id = services_by_name.get(package_item.service_type)
        if resolved_service_id and package_item.service_id != resolved_service_id:
            package_item.service_id = resolved_service_id
            changed = True

    if changed:
        db.commit()


def get_service_by_name(db: Session, service_name: Optional[str]):
    if not service_name:
        return None
    return (
        db.query(Service)
        .filter(Service.name == service_name, Service.is_active == True)
        .first()
    )


def get_service_by_id(db: Session, service_id: Optional[int]):
    if not service_id:
        return None
    return db.query(Service).filter(Service.id == service_id, Service.is_active == True).first()
