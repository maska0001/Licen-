from fastapi import APIRouter, Depends, HTTPException, Query, status
from sqlalchemy.orm import Session
from typing import List, Optional
from app.database.session import get_db
from app.models.service_category import ServiceCategory
from app.models.user import User
from app.models.supplier import Supplier
from app.models.supplier_template import SupplierTemplate
from app.models.supplier_template_pricing import SupplierTemplatePricing
from app.schemas.supplier import SupplierCreate, SupplierUpdate, SupplierResponse
from app.core.security import get_current_user
from app.utils.permissions import verify_event_ownership
from app.services.supplier_service import create_supplier_dependencies, remove_supplier_dependencies

router = APIRouter(tags=["Suppliers"])


@router.get("/service-categories", response_model=List[dict])
def get_service_categories(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    active_template_service_names = {
        row[0]
        for row in db.query(SupplierTemplate.service_type)
        .filter(SupplierTemplate.is_active == True)
        .distinct()
        .all()
        if row[0]
    }

    category_rows = (
        db.query(ServiceCategory)
        .filter(ServiceCategory.is_active == True)
        .order_by(ServiceCategory.sort_order.asc(), ServiceCategory.name.asc())
        .all()
    )

    categories = []
    covered_service_names = set()

    for category in category_rows:
        available_services = [
            service.name
            for service in sorted(
                category.services, key=lambda item: (item.sort_order, item.name)
            )
            if service.is_active and service.name in active_template_service_names
        ]
        if available_services:
            categories.append({"name": category.name, "services": available_services})
            covered_service_names.update(available_services)

    uncategorized_services = sorted(
        active_template_service_names - covered_service_names
    )
    if uncategorized_services:
        categories.append(
            {
                "name": "🧩 Alte servicii",
                "services": uncategorized_services,
            }
        )

    return categories


@router.get("/templates", response_model=List[dict])
def get_supplier_templates(
    service_type: Optional[str] = Query(default=None),
    event_type: Optional[str] = Query(default=None),
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """
    Get all available supplier templates for selection
    """
    templates_query = db.query(SupplierTemplate).filter(SupplierTemplate.is_active == True)
    if service_type:
        templates_query = templates_query.filter(SupplierTemplate.service_type == service_type)

    templates = templates_query.order_by(SupplierTemplate.name.asc()).all()
    
    # Convert to format expected by frontend
    result = []
    for template in templates:
        pricing_query = db.query(SupplierTemplatePricing).filter(
            SupplierTemplatePricing.supplier_template_id == template.id,
            SupplierTemplatePricing.is_active == True
        )

        selected_pricing = None
        if event_type:
            selected_pricing = pricing_query.filter(
                SupplierTemplatePricing.event_type == event_type
            ).first()

        if not selected_pricing:
            selected_pricing = pricing_query.filter(
                SupplierTemplatePricing.event_type == "default"
            ).first()

        if not selected_pricing:
            selected_pricing = pricing_query.first()

        price = selected_pricing.base_price if selected_pricing else 0
        price_type = selected_pricing.pricing_model if selected_pricing else "FIX_EVENT"
        
        result.append({
            "id": f"template_{template.id}",  # Prefix to distinguish from selected suppliers
            "name": template.name,
            "category": template.service_type,
            "contact": template.phone or "",
            "location": "",  # Templates don't have location
            "price": price,
            "priceType": price_type,
            "rating": template.rating,
            "selected": False,  # Templates are not selected by default
            "isCustom": False,  # Templates are not custom
        })
    
    return result


@router.get("/events/{event_id}", response_model=List[SupplierResponse])
def get_suppliers(
    event_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    verify_event_ownership(db, event_id, current_user)
    suppliers = db.query(Supplier).filter(Supplier.event_id == event_id).all()
    return suppliers


@router.post("/events/{event_id}", response_model=SupplierResponse, status_code=status.HTTP_201_CREATED)
def create_supplier(
    event_id: int,
    supplier_data: SupplierCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    event = verify_event_ownership(db, event_id, current_user)
    
    print(f"DEBUG SUPPLIER CREATE: Creating supplier for event_id={event_id}")
    print(f"DEBUG SUPPLIER CREATE: Supplier data: {supplier_data.model_dump()}")
    
    new_supplier = Supplier(**supplier_data.model_dump(), event_id=event_id)
    db.add(new_supplier)
    db.commit()
    db.refresh(new_supplier)
    
    print(f"DEBUG SUPPLIER CREATE: Created supplier: id={new_supplier.id}, name={new_supplier.name}, selected={new_supplier.selected}")
    
    if new_supplier.selected:
        create_supplier_dependencies(db, new_supplier, event)
    
    return new_supplier


@router.put("/{supplier_id}", response_model=SupplierResponse)
def update_supplier(
    supplier_id: int,
    supplier_data: SupplierUpdate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    supplier = db.query(Supplier).filter(Supplier.id == supplier_id).first()
    if not supplier:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Supplier not found")
    
    event = verify_event_ownership(db, supplier.event_id, current_user)
    
    was_selected = supplier.selected
    
    print(f"DEBUG SUPPLIER UPDATE: supplier_id={supplier_id}, was_selected={was_selected}")
    print(f"DEBUG SUPPLIER UPDATE: update data={supplier_data.model_dump()}")
    
    for key, value in supplier_data.model_dump(exclude_unset=True).items():
        print(f"DEBUG SUPPLIER UPDATE: Setting {key} = {value}")
        setattr(supplier, key, value)
    
    db.commit()
    db.refresh(supplier)
    
    print(f"DEBUG SUPPLIER UPDATE: After update - selected={supplier.selected}")
    
    # Handle selection changes
    if not was_selected and supplier.selected:
        create_supplier_dependencies(db, supplier, event)
    elif was_selected and not supplier.selected:
        remove_supplier_dependencies(db, supplier)
    
    return supplier


@router.delete("/suppliers/{supplier_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_supplier(
    supplier_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    supplier = db.query(Supplier).filter(Supplier.id == supplier_id).first()
    if not supplier:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Supplier not found")
    
    verify_event_ownership(db, supplier.event_id, current_user)
    
    if supplier.selected:
        remove_supplier_dependencies(db, supplier)
    
    db.delete(supplier)
    db.commit()
    return None
