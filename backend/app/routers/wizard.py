from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from datetime import date, timedelta
from typing import List
import json
from app.database.session import get_db
from app.models.user import User
from app.models.event import Event, EventStatus
from app.models.supplier import Supplier
from app.models.budget import BudgetItem, PaymentStatus
from app.models.checklist import ChecklistItem
from app.models.landing import LandingPage
from app.models.supplier_template import SupplierTemplate
from app.models.supplier_template_pricing import SupplierTemplatePricing
from app.models.event_package import EventPackage
from app.models.event_package_item import EventPackageItem
from app.models.event_service_preference import EventServicePreference
from app.schemas.event import (
    WizardStep1Create,
    WizardStep2Update,
    WizardStep3Update,
    WizardStep4Update,
    WizardStep5Update,
    WizardStep6Update,
    WizardStep7Update,
    WizardStep8Update,
    EventResponse,
    WizardFinalizeResponse,
)
from app.schemas.package import EventPackageResponse
from app.core.security import get_current_user
from app.services.pricing_service import resolve_supplier_pricing

router = APIRouter(prefix="/wizard/events", tags=["Event Wizard"])


def verify_event_ownership(db: Session, event_id: int, current_user: User) -> Event:
    """Verifică că evenimentul aparține utilizatorului curent"""
    event = db.query(Event).filter(Event.id == event_id, Event.user_id == current_user.id).first()
    if not event:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Evenimentul nu a fost găsit sau nu îți aparține"
        )
    return event


def create_checklist_for_supplier(db: Session, event: Event, supplier_name: str, category: str):
    """Creează automat 4 task-uri checklist pentru un furnizor selectat"""
    event_date = event.date
    
    checklist_tasks = [
        {
            "task": f"⭐ Caută opțiuni pentru {category}",
            "due_date": event_date - timedelta(days=90),
            "completed": False
        },
        {
            "task": f"⭐ Compară prețuri {category}",
            "due_date": event_date - timedelta(days=60),
            "completed": False
        },
        {
            "task": f"⭐ Rezervă {supplier_name}",
            "due_date": event_date - timedelta(days=45),
            "completed": False
        },
        {
            "task": f"⭐ Confirmă detalii finale {supplier_name}",
            "due_date": event_date - timedelta(days=14),
            "completed": False
        },
    ]
    
    for task_data in checklist_tasks:
        checklist_item = ChecklistItem(
            task=task_data["task"],
            category=category,
            completed=task_data["completed"],
            due_date=task_data["due_date"],
            event_id=event.id
        )
        db.add(checklist_item)


@router.post("/start", response_model=EventResponse, status_code=status.HTTP_201_CREATED)
def start_wizard(
    step1_data: WizardStep1Create,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """
    PAS 1 - Creează eveniment draft
    
    Salvează:
    - event_type (wedding/birthday/corporate/other)
    - title (ex: "Nunta noastră")
    
    Setează:
    - user_id = current_user.id
    - status = DRAFT
    - wizard_step = 1
    """
    new_event = Event(
        user_id=current_user.id,
        title=step1_data.title,
        event_type=step1_data.event_type,
        status=EventStatus.DRAFT,
        wizard_step=1
    )
    
    db.add(new_event)
    db.commit()
    db.refresh(new_event)
    
    return new_event


@router.patch("/{event_id}/step/1", response_model=EventResponse)
def update_step1(
    event_id: int,
    step1_data: WizardStep1Create,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """
    PAS 1 - Actualizează Tip + Titlu eveniment
    
    Salvează:
    - title
    - event_type
    """
    event = verify_event_ownership(db, event_id, current_user)
    
    event.title = step1_data.title
    event.event_type = step1_data.event_type
    event.wizard_step = 1
    
    db.commit()
    db.refresh(event)
    return event


@router.patch("/{event_id}/step/2", response_model=EventResponse)
def update_step2(
    event_id: int,
    step2_data: WizardStep2Update,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """
    PAS 2 - Actualizează Stadiu planificare
    
    Salvează:
    - planning_stage
    
    Setează wizard_step = 2
    """
    event = verify_event_ownership(db, event_id, current_user)
    
    event.planning_stage = step2_data.planning_stage
    event.wizard_step = max(event.wizard_step, 2)
    
    db.commit()
    db.refresh(event)
    return event


@router.patch("/{event_id}/step/3", response_model=EventResponse)
def update_step3(
    event_id: int,
    step3_data: WizardStep3Update,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """
    PAS 3 - Actualizează Data și ora
    
    Salvează:
    - date
    - time (opțional)
    - date_mode
    - event_month
    - event_year
    
    Setează wizard_step = 3
    """
    event = verify_event_ownership(db, event_id, current_user)
    
    # Convert string date to date object if provided
    if step3_data.date:
        try:
            from datetime import datetime
            event.date = datetime.strptime(step3_data.date, "%Y-%m-%d").date()
        except ValueError as e:
            raise HTTPException(
                status_code=status.HTTP_422_UNPROCESSABLE_ENTITY,
                detail=f"Invalid date format. Expected YYYY-MM-DD, got: {step3_data.date}"
            )
    else:
        event.date = None
    
    event.time = step3_data.time
    event.date_mode = step3_data.date_mode
    event.event_month = step3_data.event_month
    event.event_year = step3_data.event_year
    event.wizard_step = max(event.wizard_step, 3)
    
    db.commit()
    db.refresh(event)
    return event


@router.patch("/{event_id}/step/4", response_model=EventResponse)
def update_step4(
    event_id: int,
    step4_data: WizardStep4Update,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """
    PAS 4 - Actualizează Locația
    
    Salvează:
    - city
    - venue_city (opțional)
    - venue_name (opțional)
    - address (opțional)
    - venue_price_per_guest (opțional)
    - location_mode
    
    Setează wizard_step = 4
    
    Dacă venue_name și venue_price_per_guest sunt specificate, creează automat un supplier pentru Restaurant
    """
    event = verify_event_ownership(db, event_id, current_user)
    
    previous_venue_name = event.venue_name

    is_unknown_location = step4_data.location_mode == "unknown"
    resolved_city = None if is_unknown_location else step4_data.city
    resolved_venue_city = None if is_unknown_location else step4_data.venue_city
    resolved_venue_name = None if is_unknown_location else step4_data.venue_name
    resolved_address = None if is_unknown_location else step4_data.address
    resolved_venue_price = (
        None if is_unknown_location else step4_data.venue_price_per_guest
    )

    event.city = resolved_city
    event.venue_city = resolved_venue_city
    event.venue_name = resolved_venue_name
    event.venue_address = resolved_address
    event.venue_price_per_guest = resolved_venue_price
    event.location_mode = step4_data.location_mode
    event.wizard_step = max(event.wizard_step, 4)

    managed_supplier_names = {
        name for name in [previous_venue_name, resolved_venue_name] if name
    }

    managed_suppliers = []
    if managed_supplier_names:
        managed_suppliers = db.query(Supplier).filter(
            Supplier.event_id == event.id,
            Supplier.category == "Restaurant",
            Supplier.is_custom == True,
            Supplier.name.in_(managed_supplier_names),
        ).all()

    if is_unknown_location or not resolved_venue_name or not resolved_venue_price:
        for supplier in managed_suppliers:
            db.delete(supplier)
    else:
        existing_supplier = next(
            (supplier for supplier in managed_suppliers if supplier.name == resolved_venue_name),
            None,
        )

        for supplier in managed_suppliers:
            if supplier.id != getattr(existing_supplier, "id", None):
                db.delete(supplier)

        if existing_supplier:
            existing_supplier.name = resolved_venue_name
            existing_supplier.location = resolved_city
            existing_supplier.price = resolved_venue_price
            existing_supplier.price_type = "PER_INVITAT"
            existing_supplier.selected = True
            existing_supplier.is_custom = True
            if not existing_supplier.rating:
                existing_supplier.rating = 4.5
        else:
            venue_supplier = Supplier(
                name=resolved_venue_name,
                category="Restaurant",
                location=resolved_city,
                price=resolved_venue_price,
                price_type="PER_INVITAT",
                selected=True,
                event_id=event.id,
                is_custom=True,
                rating=4.5,
            )
            db.add(venue_supplier)
    
    db.commit()
    db.refresh(event)
    return event


@router.patch("/{event_id}/step/5", response_model=EventResponse)
def update_step5(
    event_id: int,
    step5_data: WizardStep5Update,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """
    PAS 5 - Actualizează Estimare invitați + Buget
    
    Salvează:
    - guest_count_estimated
    - guest_count_min
    - guest_count_max
    - default_adults
    - default_children
    - has_budget
    - budget_total_estimated
    - budget_currency
    
    Setează wizard_step = 5
    
    NOTĂ: Nu creează invitați reali, doar estimare
    """
    event = verify_event_ownership(db, event_id, current_user)
    
    # Update only provided fields
    if step5_data.guest_count_estimated is not None:
        event.guest_count_estimated = step5_data.guest_count_estimated
        event.guest_count = step5_data.guest_count_estimated
    if step5_data.guest_count_min is not None:
        event.guest_count_min = step5_data.guest_count_min
    if step5_data.guest_count_max is not None:
        event.guest_count_max = step5_data.guest_count_max
    if step5_data.default_adults is not None:
        event.default_adults = step5_data.default_adults
    if step5_data.default_children is not None:
        event.default_children = step5_data.default_children
    if step5_data.has_budget is not None:
        event.has_budget = step5_data.has_budget
    if step5_data.budget_total_estimated is not None:
        event.budget_total_estimated = step5_data.budget_total_estimated
    if step5_data.budget_currency is not None:
        event.budget_currency = step5_data.budget_currency
    
    event.wizard_step = max(event.wizard_step, 5)
    
    db.commit()
    db.refresh(event)
    return event


@router.patch("/{event_id}/step/6", response_model=EventResponse)
def update_step6(
    event_id: int,
    step6_data: WizardStep6Update,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """
    PAS 6 - Selectarea serviciilor dorite
    
    Salvează:
    - package_id (opțional)
    - enabled_modules (opțional)
    - services (categorii de servicii selectate)
    
    Setează wizard_step = 6
    """
    event = verify_event_ownership(db, event_id, current_user)
    
    event.package_id = step6_data.package_id
    event.enabled_modules = step6_data.enabled_modules
    event.planning_mode = "package" if step6_data.package_id else "manual"
    event.wizard_step = max(event.wizard_step, 6)

    # Persist service preferences if provided
    if step6_data.services is not None:
        db.query(EventServicePreference).filter(EventServicePreference.event_id == event.id).delete(synchronize_session=False)
        for idx, service in enumerate(step6_data.services):
            pref = EventServicePreference(
                event_id=event.id,
                service_type=service,
                priority=idx,
                is_required=False
            )
            db.add(pref)
    
    db.commit()
    db.refresh(event)
    return event


@router.patch("/{event_id}/step/7", response_model=EventResponse)
def update_step7(
    event_id: int,
    step7_data: WizardStep7Update,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """
    PAS 7 - Buget inițial
    
    Salvează:
    - budget_items (listă de item-uri buget)
    
    Face Upsert:
    - Nu dubla item-urile generate de suppliers
    - Actualizează dacă există deja
    
    Setează wizard_step = 7
    """
    event = verify_event_ownership(db, event_id, current_user)
    
    for item_data in step7_data.budget_items:
        existing_item = db.query(BudgetItem).filter(
            BudgetItem.event_id == event_id,
            BudgetItem.name == item_data.name
        ).first()

        if existing_item:
            existing_item.estimated_cost = item_data.estimatedPrice
            existing_item.actual_cost = item_data.realPrice or item_data.estimatedPrice
            if item_data.paymentStatus:
                existing_item.payment_status = PaymentStatus(item_data.paymentStatus)
        else:
            budget_item = BudgetItem(
                category=item_data.category,
                name=item_data.name,
                estimated_cost=item_data.estimatedPrice,
                actual_cost=item_data.realPrice or item_data.estimatedPrice,
                payment_status=PaymentStatus(item_data.paymentStatus) if item_data.paymentStatus else PaymentStatus.unpaid,
                event_id=event_id
            )
            db.add(budget_item)
    
    event.wizard_step = max(event.wizard_step, 7)
    
    db.commit()
    db.refresh(event)
    return event


@router.patch("/{event_id}/step/8", response_model=dict)
def update_step8(
    event_id: int,
    step8_data: WizardStep8Update,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """
    PAS 8 - Pachete / Finalizare
    
    Salvează:
    - content_json (layout, texte, culori)
    - published (default: false)
    
    Setează wizard_step = 8
    """
    event = verify_event_ownership(db, event_id, current_user)
    
    # Verifică dacă există deja o landing page
    landing_page = db.query(LandingPage).filter(LandingPage.event_id == event_id).first()
    
    if landing_page:
        # Actualizează landing page existent
        landing_page.content = step8_data.content_json or {}
        landing_page.content_json = json.dumps(step8_data.content_json or {}) if step8_data.content_json else None
        landing_page.published = step8_data.published
    else:
        # Creează landing page nou
        import json
        landing_page = LandingPage(
            event_id=event_id,
            content=step8_data.content_json or {},
            content_json=json.dumps(step8_data.content_json or {}) if step8_data.content_json else None,
            published=step8_data.published,
            public_slug=f"event-{event_id}"  # Default slug, poate fi personalizat
        )
        db.add(landing_page)
    
    event.wizard_step = max(event.wizard_step, 8)
    
    db.commit()
    db.refresh(event)
    
    return {
        "event": EventResponse.model_validate(event),
        "landing_page_id": landing_page.id,
        "message": "Landing page salvat cu succes"
    }


@router.post("/{event_id}/finalize", response_model=WizardFinalizeResponse)
def finalize_wizard(
    event_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """
    Finalizare Wizard - "Create Full Event"
    
    Verifică:
    - Pașii 1-4 sunt obligatorii (minim)
    - Setează status = FINALIZED
    - Setează wizard_step = 8
    
    Returnează:
    - Event complet
    """
    event = verify_event_ownership(db, event_id, current_user)
    
    # Verifică pașii minimi (1-4)
    if event.wizard_step < 4:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"Wizard incomplet. Pasul curent: {event.wizard_step}. Minim necesar: 4"
        )
    
    # Setează statusul FINALIZED
    event.status = EventStatus.FINALIZED
    event.wizard_step = 8
    
    db.commit()
    db.refresh(event)
    
    return WizardFinalizeResponse(
        event=EventResponse.model_validate(event),
        message="Evenimentul a fost finalizat cu succes!"
    )


@router.get("/{event_id}", response_model=EventResponse)
def get_wizard_event(
    event_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """
    Obține detaliile evenimentului draft
    """
    event = verify_event_ownership(db, event_id, current_user)
    return event


def _normalize_category(category: str) -> str:
    """
    Normalize category names to match between frontend (with emoji) and backend (simple names)
    """
    print(f"      DEBUG _normalize_category: input='{category}'")
    
    # Mapping from emoji categories to simple service types
    category_mapping = {
        "🎤 Entertainment & atmosferă": ["Muzică / DJ", "Formație live", "MC / Moderator", "Animatori copii"],
        "📸 Media & conținut": ["Fotografie", "Videografie", "Drone", "Livestream"],
        "🌸 Decor & styling": ["Decor eveniment (general)", "Decor floral", "Baloane", "Mobilier"],
        "🍽️ Mâncare & băuturi": ["Restaurant", "Catering", "Tort", "Bar"],
        "💡 Tehnic & logistic": ["Sonorizare", "Lumini", "Generatoare", "Securitate"],
        "💄 Beauty & pregătire": ["Makeup", "Hairstyling", "Manichiură", "Costume"],
        "🚗 Logistică & suport": ["Transport invitați", "Transport artiști", "Parcare", "Cazare"],
        "🧠 Organizare & planificare": ["Organizator eveniment", "Wedding planner", "Consultant", "Coordonator"],
        "🧾 Print & invitații": ["Invitații digitale", "Invitații tipărite", "Meniu", "Marturii"]
    }
    
    # If category has emoji, find the corresponding simple service types
    for emoji_cat, simple_services in category_mapping.items():
        if category == emoji_cat:
            print(f"      DEBUG: Found emoji category match, returning list: {simple_services}")
            return simple_services  # Return list of simple service types
        if category in simple_services:
            print(f"      DEBUG: Found in simple services, returning as-is: {category}")
            return category  # Already a simple service type
    
    # Remove emoji from category if present
    import re
    clean_category = re.sub(r'^[\U0001F600-\U0001F64F\U0001F300-\U0001F5FF\U0001F680-\U0001F6FF\U0001F1E0-\U0001F1FF\U00002702-\U000027B0\U000024C2-\U0001F251]+\s*', '', category).strip()
    print(f"      DEBUG: Cleaned category (removed emoji): '{clean_category}'")
    return clean_category


def _categories_match(supplier_category: str, service_type: str) -> bool:
    """
    Check if a supplier category matches a service type, handling emoji categories
    """
    print(f"    DEBUG _categories_match: supplier_category='{supplier_category}', service_type='{service_type}'")
    
    # Direct match
    if supplier_category == service_type:
        print(f"    DEBUG: Direct match found")
        return True
    
    # Normalize both and check
    normalized_supplier = _normalize_category(supplier_category)
    normalized_service = _normalize_category(service_type)
    
    print(f"    DEBUG: normalized_supplier={normalized_supplier}, normalized_service={normalized_service}")
    
    # If normalized_supplier is a list (from emoji category), check if service_type is in it
    if isinstance(normalized_supplier, list):
        result = service_type in normalized_supplier or normalized_service in normalized_supplier
        print(f"    DEBUG: Supplier is list, checking if service in list: {result}")
        return result
    
    # If normalized_service is a list, check if supplier_category is in it
    if isinstance(normalized_service, list):
        result = supplier_category in normalized_service or normalized_supplier in normalized_service
        print(f"    DEBUG: Service is list, checking if supplier in list: {result}")
        return result
    
    result = normalized_supplier == normalized_service
    print(f"    DEBUG: Simple comparison: {result}")
    return result


def _pick_positions(sorted_list):
    if len(sorted_list) == 0:
        return None, None, None
    if len(sorted_list) == 1:
        return sorted_list[0], sorted_list[0], sorted_list[0]
    if len(sorted_list) == 2:
        return sorted_list[0], sorted_list[1], sorted_list[1]
    mid_idx = len(sorted_list) // 2
    return sorted_list[0], sorted_list[mid_idx], sorted_list[-1]


@router.post("/{event_id}/generate-packages", response_model=list[EventPackageResponse])
def generate_packages(
    event_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    event = verify_event_ownership(db, event_id, current_user)

    # 1. Fetch service preferences (selected categories)
    service_prefs = db.query(EventServicePreference).filter(
        EventServicePreference.event_id == event.id
    ).order_by(EventServicePreference.priority).all()
    service_types = [p.service_type for p in service_prefs]
    if not service_types:
        raise HTTPException(status_code=400, detail="No service categories selected for this event.")

    # 1.5. Check if we already have compatible packages
    existing_packages = db.query(EventPackage).filter(EventPackage.event_id == event.id).all()
    if existing_packages:
        # Check if existing packages cover the same service types
        for pkg in existing_packages:
            pkg_service_types = [item.service_type for item in pkg.items]
            # If we have packages that cover all current service types, return them
            if set(service_types).issubset(set(pkg_service_types)):
                for pkg in existing_packages:
                    pkg.items  # load items
                return existing_packages

    # 2. Check existing selected suppliers
    print(f"DEBUG: Querying suppliers for event_id={event.id}")
    all_suppliers = db.query(Supplier).filter(Supplier.event_id == event.id).all()
    print(f"DEBUG: Found {len(all_suppliers)} total suppliers for this event:")
    for supplier in all_suppliers:
        print(f"  - {supplier.name} ({supplier.category}) - selected: {supplier.selected}")
    
    existing_suppliers = db.query(Supplier).filter(
        Supplier.event_id == event.id,
        Supplier.selected == True
    ).all()
    
    print(f"DEBUG: Found {len(existing_suppliers)} existing selected suppliers:")
    for supplier in existing_suppliers:
        print(f"  - {supplier.name} ({supplier.category}) - selected: {supplier.selected}")
    
    # 3. Identify categories that already have suppliers using smart matching
    covered_service_types = []
    for service_type in service_types:
        print(f"DEBUG: Checking service_type: {service_type}")
        for supplier in existing_suppliers:
            # Use exact matching for service types
            if supplier.category == service_type:
                covered_service_types.append(service_type)
                print(f"  - Found exact match: {supplier.name} ({supplier.category}) for {service_type}")
                break
            # Also check for common variations
            elif _categories_match(supplier.category, service_type):
                covered_service_types.append(service_type)
                print(f"  - Found fuzzy match: {supplier.name} ({supplier.category}) for {service_type}")
                break
    
    print(f"DEBUG: Covered service types: {covered_service_types}")
    
    # 4. Categories that need supplier options
    missing_categories = [s for s in service_types if s not in covered_service_types]
    print(f"DEBUG: Missing categories: {missing_categories}")
    print(f"DEBUG: All service types: {service_types}")

    # 6. Clean old packages (only if we're generating new ones)
    db.query(EventPackageItem).filter(EventPackageItem.package_id.in_(
        db.query(EventPackage.id).filter(EventPackage.event_id == event.id)
    )).delete(synchronize_session=False)
    db.query(EventPackage).filter(EventPackage.event_id == event.id).delete(synchronize_session=False)
    db.flush()

    gen_version = 1

    # 7. Create 3 packages with descriptive names
    package_names = ["Pachet Economic", "Pachet Standard", "Pachet Premium"]
    packages = []
    for idx, name in enumerate(package_names):
        pkg = EventPackage(
            event_id=event.id,
            name=name,
            total_estimated_cost=0.0,
            is_recommended=True if idx == 1 else False,  # Standard is recommended
            is_selected=False,
            generation_version=gen_version
        )
        db.add(pkg)
        packages.append(pkg)
    db.flush()

    # 8. Add existing suppliers to all packages
    existing_total_cost = 0.0
    print(f"DEBUG: Adding {len(existing_suppliers)} existing suppliers to all packages")
    for supplier in existing_suppliers:
        # Calculate final price based on pricing model
        final_price = supplier.price
        if supplier.price_type == "PER_INVITAT" and event.guest_count:
            final_price = supplier.price * event.guest_count
            print(f"DEBUG: {supplier.name} - PER_INVITAT pricing: {supplier.price} x {event.guest_count} = {final_price}")
        else:
            print(f"DEBUG: {supplier.name} - Fixed pricing: {final_price}")
            
        existing_total_cost += final_price
        print(f"DEBUG: Adding supplier {supplier.name} ({supplier.category}) - ${final_price} to all packages")
        for i, package in enumerate(packages):
            item = EventPackageItem(
                package_id=package.id,
                service_type=supplier.category,
                supplier_template_id=None,  # No template for existing suppliers
                pricing_row_id=None,
                supplier_name_snapshot=supplier.name,
                estimated_cost=final_price,
                supplier_rating_snapshot=supplier.rating,
                matrix_position="existing",  # Mark as existing supplier
                pricing_model=supplier.price_type,
                base_price_per_unit=supplier.price,
            )
            db.add(item)
            print(f"DEBUG: Added item to package {i+1}: {supplier.name} ({supplier.category})")
    
    print(f"DEBUG: Total cost from existing suppliers: {existing_total_cost}")

    # 9. Generate options for missing categories ONLY
    totals = [existing_total_cost, existing_total_cost, existing_total_cost]
    print(f"DEBUG: Starting totals: {totals}")

    for stype in missing_categories:
        print(f"DEBUG: Generating options for missing category: {stype}")
        pricings = db.query(SupplierTemplatePricing).join(SupplierTemplate).filter(
            SupplierTemplate.service_type == stype,
            SupplierTemplatePricing.is_active == True,
        ).all()
        
        print(f"DEBUG: Found {len(pricings)} pricing options for {stype}")
        
        # Resolve price per event type
        resolved = []
        for pr in pricings:
            if pr.event_type != event.event_type and pr.event_type != "default":
                continue
            resolved.append(pr)

        print(f"DEBUG: After event type filtering: {len(resolved)} options")

        # Sort by price asc then rating desc (prioritize lower price, then higher rating)
        resolved.sort(key=lambda p: (p.base_price, -p.template.rating))
        
        low, mid, high = _pick_positions(resolved)
        picks = [low, mid, high]
        
        print(f"DEBUG: Picked options for {stype}:")
        for i, choice in enumerate(picks):
            if choice:
                print(f"  Package {i+1}: {choice.template.name} - ${choice.base_price}")
        
        for i, choice in enumerate(picks):
            if not choice:
                continue
            
            # Calculate final price based on pricing model
            final_price = choice.base_price
            if choice.pricing_model == "PER_PERSON" and event.guest_count:
                final_price = choice.base_price * event.guest_count
                print(f"DEBUG: {choice.template.name} - PER_PERSON pricing: {choice.base_price} x {event.guest_count} = {final_price}")
            else:
                print(f"DEBUG: {choice.template.name} - Fixed pricing: {final_price}")
            
            item = EventPackageItem(
                package_id=packages[i].id,
                service_type=stype,
                supplier_template_id=choice.supplier_template_id,
                pricing_row_id=choice.id,
                supplier_name_snapshot=choice.template.name,
                estimated_cost=final_price,
                supplier_rating_snapshot=choice.template.rating,
                matrix_position="low" if i == 0 else "middle" if i == 1 else "high",
                pricing_model=choice.pricing_model,
                base_price_per_unit=choice.base_price,
            )
            db.add(item)
            totals[i] += final_price
            print(f"DEBUG: Added {choice.template.name} to package {i+1}, new total: {totals[i]}")

    print(f"DEBUG: Final totals: {totals}")

    # 10. Update package totals
    for i, pkg in enumerate(packages):
        pkg.total_estimated_cost = totals[i]

    # 11. Save packages to database (they are already saved via db.add above)
    db.commit()
    for pkg in packages:
        db.refresh(pkg)
        pkg.items  # load items
    return packages


@router.get("/{event_id}/packages", response_model=list[EventPackageResponse])
def list_packages(
    event_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    event = verify_event_ownership(db, event_id, current_user)
    packages = db.query(EventPackage).filter(EventPackage.event_id == event.id).all()
    for p in packages:
        p.items
    return packages


@router.post("/{event_id}/select-package/{package_id}", response_model=EventResponse)
def select_package(
    event_id: int,
    package_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    event = verify_event_ownership(db, event_id, current_user)
    package = db.query(EventPackage).filter(EventPackage.id == package_id, EventPackage.event_id == event.id).first()
    if not package:
        raise HTTPException(status_code=404, detail="Package not found")

    # unselect others
    db.query(EventPackage).filter(EventPackage.event_id == event.id).update({EventPackage.is_selected: False})
    package.is_selected = True
    event.selected_package_id = package.id
    event.planning_mode = "package"

    # initialize event data from package
    db.query(Supplier).filter(Supplier.event_id == event.id).delete(synchronize_session=False)
    db.query(BudgetItem).filter(BudgetItem.event_id == event.id).delete(synchronize_session=False)
    db.query(ChecklistItem).filter(ChecklistItem.event_id == event.id).delete(synchronize_session=False)

    for item in package.items:
        # create supplier snapshot
        supplier = Supplier(
            name=item.supplier_name_snapshot,
            category=item.service_type,
            price=item.estimated_cost,
            price_type="FIX_EVENT",
            selected=True,
            event_id=event.id,
            is_custom=True
        )
        db.add(supplier)
        db.flush()

        budget_item = BudgetItem(
            category=item.service_type,
            name=item.supplier_name_snapshot,
            estimated_cost=item.estimated_cost,
            actual_cost=item.estimated_cost,
            payment_status=PaymentStatus.unpaid,
            supplier_id=supplier.id,
            event_id=event.id
        )
        db.add(budget_item)

        task = ChecklistItem(
            task=f"Contact {item.supplier_name_snapshot} ({item.service_type})",
            category=item.service_type,
            completed=False,
            event_id=event.id
        )
        db.add(task)

    db.commit()
    db.refresh(event)
    return event


@router.post("/{event_id}/select-manual", response_model=EventResponse)
def select_manual_mode(
    event_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    event = verify_event_ownership(db, event_id, current_user)
    db.query(EventPackage).filter(EventPackage.event_id == event.id).update({EventPackage.is_selected: False})
    event.selected_package_id = None
    event.planning_mode = "manual"
    db.commit()
    db.refresh(event)
    return event
