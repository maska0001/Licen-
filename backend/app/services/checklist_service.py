from sqlalchemy import inspect, text
from sqlalchemy.orm import Session


def ensure_checklist_columns(db: Session):
    inspector = inspect(db.bind)
    checklist_columns = {column["name"] for column in inspector.get_columns("checklist_items")}

    if "kind" not in checklist_columns:
        db.execute(
            text(
                "ALTER TABLE checklist_items "
                "ADD COLUMN IF NOT EXISTS kind VARCHAR DEFAULT 'manual'"
            )
        )
    if "priority" not in checklist_columns:
        db.execute(
            text(
                "ALTER TABLE checklist_items "
                "ADD COLUMN IF NOT EXISTS priority VARCHAR DEFAULT 'medium'"
            )
        )
    if "source_type" not in checklist_columns:
        db.execute(
            text(
                "ALTER TABLE checklist_items "
                "ADD COLUMN IF NOT EXISTS source_type VARCHAR"
            )
        )
    if "source_id" not in checklist_columns:
        db.execute(
            text(
                "ALTER TABLE checklist_items "
                "ADD COLUMN IF NOT EXISTS source_id INTEGER"
            )
        )
    if "created_at" not in checklist_columns:
        db.execute(
            text(
                "ALTER TABLE checklist_items "
                "ADD COLUMN IF NOT EXISTS created_at TIMESTAMPTZ DEFAULT NOW()"
            )
        )
    if "updated_at" not in checklist_columns:
        db.execute(
            text(
                "ALTER TABLE checklist_items "
                "ADD COLUMN IF NOT EXISTS updated_at TIMESTAMPTZ DEFAULT NOW()"
            )
        )

    db.execute(
        text(
            "UPDATE checklist_items "
            "SET kind = COALESCE(kind, CASE WHEN supplier_id IS NOT NULL THEN 'auto' ELSE 'manual' END), "
            "priority = COALESCE(priority, 'medium'), "
            "source_type = COALESCE(source_type, CASE WHEN supplier_id IS NOT NULL THEN 'supplier' ELSE NULL END), "
            "source_id = COALESCE(source_id, supplier_id), "
            "created_at = COALESCE(created_at, NOW()), "
            "updated_at = COALESCE(updated_at, NOW())"
        )
    )
    db.commit()
