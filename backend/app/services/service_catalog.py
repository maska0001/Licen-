from sqlalchemy.orm import Session

from app.models.service import Service
from app.models.service_category import ServiceCategory


SERVICE_CATALOG = [
    {
        "code": "entertainment",
        "name": "🎤 Entertainment & atmosferă",
        "services": [
            ("music_dj", "Muzică / DJ"),
            ("live_band", "Formație live"),
            ("mc_moderator", "MC / Moderator"),
            ("animators", "Animatori (copii / adulți)"),
            ("dancers_show", "Dansatori / show artistic"),
            ("guest_artists", "Artiști invitați"),
            ("karaoke", "Karaoke"),
            (
                "special_moments",
                "Momente speciale (ursitoare, magician, focuri reci)",
            ),
        ],
    },
    {
        "code": "media",
        "name": "📸 Media & conținut",
        "services": [
            ("photo", "Fotografie"),
            ("video", "Videografie"),
            ("drone", "Dronă"),
            ("photo_booth", "Photo Booth"),
            ("video_booth_360", "Video Booth 360°"),
            ("instant_photo_booth", "Cabină foto instant"),
            ("live_streaming", "Live streaming"),
        ],
    },
    {
        "code": "decor",
        "name": "🌸 Decor & styling",
        "services": [
            ("event_decor", "Decor eveniment (general)"),
            ("floral_decor", "Decor floral"),
            ("table_arrangements", "Aranjamente mese"),
            ("backdrop", "Panou foto / backdrop"),
            ("balloons", "Balonistică"),
            ("candles", "Lumânări / sfeșnice"),
            ("custom_theme", "Tematică personalizată"),
        ],
    },
    {
        "code": "food_drinks",
        "name": "🍽️ Mâncare & băuturi",
        "services": [
            ("restaurant", "Restaurant"),
            ("catering", "Catering"),
            ("candy_bar", "Candy bar"),
            ("cake", "Tort"),
            ("desserts", "Prăjituri / deserturi"),
            ("cocktail_bar", "Cocktail bar"),
            ("mobile_bar", "Bar mobil"),
            ("wine_tasting", "Degustări (vin)"),
        ],
    },
    {
        "code": "technical",
        "name": "💡 Tehnic & logistic",
        "services": [
            ("sound", "Sonorizare"),
            ("lights", "Lumini"),
            ("led_projector", "Ecrane LED / proiector"),
            ("stage", "Scenă"),
            ("generators", "Generatoare"),
            ("special_equipment", "Echipamente speciale"),
        ],
    },
    {
        "code": "beauty",
        "name": "💄 Beauty & pregătire",
        "services": [
            ("makeup", "Makeup"),
            ("hairstyling", "Hairstyling"),
            ("fashion_styling", "Styling vestimentar"),
            ("dress_suit_rental", "Rochii / costume (închiriere)"),
            ("accessories", "Accesorii"),
        ],
    },
    {
        "code": "logistics_support",
        "name": "🚗 Logistică & suport",
        "services": [
            ("guest_transport", "Transport invitați"),
            ("artist_transport", "Transport artiști"),
            ("vip_transfer", "Transfer VIP"),
            ("guest_accommodation", "Cazare invitați"),
            ("event_day_coordination", "Coordonare ziua evenimentului"),
            ("hostess_staff", "Hostess / personal eveniment"),
        ],
    },
    {
        "code": "planning",
        "name": "🧠 Organizare & planificare",
        "services": [
            ("event_organizer", "Organizator eveniment"),
            ("wedding_planner", "Wedding planner"),
            ("event_manager", "Event manager"),
            ("day_of_coordinator", "Coordonator ziua evenimentului"),
            ("event_consulting", "Consultanță eveniment"),
            ("timeline_script", "Scenariu eveniment (timeline)"),
        ],
    },
    {
        "code": "print_invitations",
        "name": "🧾 Print & invitații",
        "services": [
            ("digital_invites", "Invitații digitale"),
            ("printed_invites", "Invitații tipărite"),
            ("menus", "Meniuri"),
            ("place_cards", "Place cards"),
            ("table_numbers", "Numere de masă"),
            ("welcome_board", "Panou welcome"),
            ("guest_favors", "Mărturii invitați"),
        ],
    },
]


def ensure_service_catalog(db: Session) -> None:
    existing_categories = {
        category.code: category
        for category in db.query(ServiceCategory).all()
    }
    existing_services = {
        service.code: service
        for service in db.query(Service).all()
    }

    changed = False

    for category_index, category_data in enumerate(SERVICE_CATALOG):
        category = existing_categories.get(category_data["code"])
        if category is None:
            category = ServiceCategory(
                code=category_data["code"],
                name=category_data["name"],
                sort_order=category_index,
                is_active=True,
            )
            db.add(category)
            db.flush()
            existing_categories[category.code] = category
            changed = True
        else:
            if (
                category.name != category_data["name"]
                or category.sort_order != category_index
                or category.is_active is not True
            ):
                category.name = category_data["name"]
                category.sort_order = category_index
                category.is_active = True
                changed = True

        for service_index, (service_code, service_name) in enumerate(
            category_data["services"]
        ):
            service = existing_services.get(service_code)
            if service is None:
                service = Service(
                    code=service_code,
                    name=service_name,
                    category_id=category.id,
                    sort_order=service_index,
                    is_active=True,
                )
                db.add(service)
                existing_services[service.code] = service
                changed = True
            else:
                if (
                    service.name != service_name
                    or service.category_id != category.id
                    or service.sort_order != service_index
                    or service.is_active is not True
                ):
                    service.name = service_name
                    service.category_id = category.id
                    service.sort_order = service_index
                    service.is_active = True
                    changed = True

    if changed:
        db.commit()
