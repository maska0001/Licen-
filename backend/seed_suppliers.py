"""
Script pentru popularea tabelelor supplier_templates și supplier_template_event_pricing
cu furnizori de test pentru generarea pachetelor.
"""

from sqlalchemy.orm import Session
from app.database.session import SessionLocal, engine, Base
from app.models.supplier_template import SupplierTemplate
from app.models.supplier_template_pricing import SupplierTemplatePricing

# Creează tabelele dacă nu există
Base.metadata.create_all(bind=engine)


def seed_suppliers():
    db = SessionLocal()
    
    try:
        # Verifică dacă există deja date
        existing_count = db.query(SupplierTemplate).count()
        if existing_count > 0:
            print(f"✓ Există deja {existing_count} furnizori în baza de date.")
            response = input("Vrei să ștergi și să recreezi datele? (y/n): ")
            if response.lower() != 'y':
                print("Operațiune anulată.")
                return
            
            # Șterge datele existente în ordinea corectă (pentru a evita foreign key errors)
            from app.models.event_package_item import EventPackageItem
            from app.models.event_package import EventPackage
            
            db.query(EventPackageItem).delete()
            db.query(EventPackage).delete()
            db.query(SupplierTemplatePricing).delete()
            db.query(SupplierTemplate).delete()
            db.commit()
            print("✓ Date existente șterse.")
        
        # Definește furnizorii pentru fiecare categorie de servicii
        suppliers_data = [
            # Muzică / DJ
            {
                "name": "DJ Alex Pro",
                "service_type": "Muzică / DJ",
                "description": "DJ profesionist cu experiență de 10+ ani",
                "phone": "+373 69 123 456",
                "email": "alex@djpro.md",
                "rating": 4.8,
                "prices": [
                    {"event_type": "wedding", "base_price": 8000},
                    {"event_type": "birthday", "base_price": 6000},
                    {"event_type": "corporate", "base_price": 10000},
                    {"event_type": "default", "base_price": 7000},
                ]
            },
            {
                "name": "DJ Sound Master",
                "service_type": "Muzică / DJ",
                "description": "Echipament profesional și muzică pentru orice eveniment",
                "phone": "+373 69 234 567",
                "email": "info@soundmaster.md",
                "rating": 4.5,
                "prices": [
                    {"event_type": "wedding", "base_price": 12000},
                    {"event_type": "birthday", "base_price": 9000},
                    {"event_type": "corporate", "base_price": 15000},
                    {"event_type": "default", "base_price": 10000},
                ]
            },
            {
                "name": "DJ Party Mix",
                "service_type": "Muzică / DJ",
                "description": "DJ tânăr și energic pentru petreceri memorabile",
                "phone": "+373 69 345 678",
                "email": "party@mix.md",
                "rating": 4.2,
                "prices": [
                    {"event_type": "wedding", "base_price": 5000},
                    {"event_type": "birthday", "base_price": 4000},
                    {"event_type": "corporate", "base_price": 6000},
                    {"event_type": "default", "base_price": 4500},
                ]
            },
            
            # MC / Moderator
            {
                "name": "MC Cristina Events",
                "service_type": "MC / Moderator",
                "description": "Moderator profesionist pentru evenimente de orice tip",
                "phone": "+373 69 456 789",
                "email": "cristina@mcevents.md",
                "rating": 4.9,
                "prices": [
                    {"event_type": "wedding", "base_price": 6000},
                    {"event_type": "birthday", "base_price": 4500},
                    {"event_type": "corporate", "base_price": 8000},
                    {"event_type": "default", "base_price": 5000},
                ]
            },
            {
                "name": "MC Victor Show",
                "service_type": "MC / Moderator",
                "description": "Experiență de 15 ani în moderarea evenimentelor",
                "phone": "+373 69 567 890",
                "email": "victor@show.md",
                "rating": 4.7,
                "prices": [
                    {"event_type": "wedding", "base_price": 9000},
                    {"event_type": "birthday", "base_price": 7000},
                    {"event_type": "corporate", "base_price": 12000},
                    {"event_type": "default", "base_price": 8000},
                ]
            },
            {
                "name": "MC Ana Style",
                "service_type": "MC / Moderator",
                "description": "Moderator tânăr cu stil modern",
                "phone": "+373 69 678 901",
                "email": "ana@style.md",
                "rating": 4.3,
                "prices": [
                    {"event_type": "wedding", "base_price": 4000},
                    {"event_type": "birthday", "base_price": 3000},
                    {"event_type": "corporate", "base_price": 5000},
                    {"event_type": "default", "base_price": 3500},
                ]
            },
            
            # Fotografie
            {
                "name": "Photo Studio Premium",
                "service_type": "Fotografie",
                "description": "Fotografie profesională de înaltă calitate",
                "phone": "+373 69 789 012",
                "email": "info@photopremium.md",
                "rating": 4.9,
                "prices": [
                    {"event_type": "wedding", "base_price": 15000},
                    {"event_type": "birthday", "base_price": 10000},
                    {"event_type": "corporate", "base_price": 18000},
                    {"event_type": "default", "base_price": 12000},
                ]
            },
            {
                "name": "Moments Photography",
                "service_type": "Fotografie",
                "description": "Capturăm cele mai frumoase momente",
                "phone": "+373 69 890 123",
                "email": "contact@moments.md",
                "rating": 4.6,
                "prices": [
                    {"event_type": "wedding", "base_price": 10000},
                    {"event_type": "birthday", "base_price": 7000},
                    {"event_type": "corporate", "base_price": 12000},
                    {"event_type": "default", "base_price": 8000},
                ]
            },
            {
                "name": "Click Photo",
                "service_type": "Fotografie",
                "description": "Fotografie accesibilă pentru orice buget",
                "phone": "+373 69 901 234",
                "email": "info@click.md",
                "rating": 4.2,
                "prices": [
                    {"event_type": "wedding", "base_price": 6000},
                    {"event_type": "birthday", "base_price": 4000},
                    {"event_type": "corporate", "base_price": 7000},
                    {"event_type": "default", "base_price": 5000},
                ]
            },
            
            # Videografie
            {
                "name": "Cinema Wedding Films",
                "service_type": "Videografie",
                "description": "Filme cinematografice pentru nunta ta",
                "phone": "+373 69 012 345",
                "email": "info@cinemawedding.md",
                "rating": 4.9,
                "prices": [
                    {"event_type": "wedding", "base_price": 18000},
                    {"event_type": "birthday", "base_price": 12000},
                    {"event_type": "corporate", "base_price": 20000},
                    {"event_type": "default", "base_price": 15000},
                ]
            },
            {
                "name": "Video Pro Events",
                "service_type": "Videografie",
                "description": "Videografie profesională pentru orice eveniment",
                "phone": "+373 69 123 456",
                "email": "contact@videopro.md",
                "rating": 4.5,
                "prices": [
                    {"event_type": "wedding", "base_price": 12000},
                    {"event_type": "birthday", "base_price": 8000},
                    {"event_type": "corporate", "base_price": 15000},
                    {"event_type": "default", "base_price": 10000},
                ]
            },
            {
                "name": "Quick Video",
                "service_type": "Videografie",
                "description": "Servicii video rapide și accesibile",
                "phone": "+373 69 234 567",
                "email": "info@quickvideo.md",
                "rating": 4.0,
                "prices": [
                    {"event_type": "wedding", "base_price": 7000},
                    {"event_type": "birthday", "base_price": 5000},
                    {"event_type": "corporate", "base_price": 8000},
                    {"event_type": "default", "base_price": 6000},
                ]
            },
            
            # Decor eveniment
            {
                "name": "Elegant Decor Studio",
                "service_type": "Decor eveniment (general)",
                "description": "Decor elegant și sofisticat pentru evenimente speciale",
                "phone": "+373 69 345 678",
                "email": "info@elegantdecor.md",
                "rating": 4.8,
                "prices": [
                    {"event_type": "wedding", "base_price": 25000},
                    {"event_type": "birthday", "base_price": 15000},
                    {"event_type": "corporate", "base_price": 30000},
                    {"event_type": "default", "base_price": 20000},
                ]
            },
            {
                "name": "Dream Decorations",
                "service_type": "Decor eveniment (general)",
                "description": "Transformăm visele tale în realitate",
                "phone": "+373 69 456 789",
                "email": "contact@dreamdeco.md",
                "rating": 4.5,
                "prices": [
                    {"event_type": "wedding", "base_price": 18000},
                    {"event_type": "birthday", "base_price": 12000},
                    {"event_type": "corporate", "base_price": 22000},
                    {"event_type": "default", "base_price": 15000},
                ]
            },
            {
                "name": "Simple Decor",
                "service_type": "Decor eveniment (general)",
                "description": "Decor simplu și elegant la prețuri accesibile",
                "phone": "+373 69 567 890",
                "email": "info@simpledecor.md",
                "rating": 4.1,
                "prices": [
                    {"event_type": "wedding", "base_price": 10000},
                    {"event_type": "birthday", "base_price": 7000},
                    {"event_type": "corporate", "base_price": 12000},
                    {"event_type": "default", "base_price": 8000},
                ]
            },
            
            # Restaurant (Catering)
            {
                "name": "Restaurant Belvedere",
                "service_type": "Restaurant",
                "description": "Restaurant premium cu meniu personalizat",
                "phone": "+373 22 123 456",
                "email": "events@belvedere.md",
                "rating": 4.9,
                "prices": [
                    {"event_type": "wedding", "base_price": 450, "price_type": "PER_PERSON"},
                    {"event_type": "birthday", "base_price": 350, "price_type": "PER_PERSON"},
                    {"event_type": "corporate", "base_price": 500, "price_type": "PER_PERSON"},
                    {"event_type": "default", "base_price": 400, "price_type": "PER_PERSON"},
                ]
            },
            {
                "name": "Nobil Event Hall",
                "service_type": "Restaurant",
                "description": "Sală de evenimente cu servicii complete",
                "phone": "+373 22 234 567",
                "email": "info@nobil.md",
                "rating": 4.7,
                "prices": [
                    {"event_type": "wedding", "base_price": 520, "price_type": "PER_PERSON"},
                    {"event_type": "birthday", "base_price": 420, "price_type": "PER_PERSON"},
                    {"event_type": "corporate", "base_price": 580, "price_type": "PER_PERSON"},
                    {"event_type": "default", "base_price": 480, "price_type": "PER_PERSON"},
                ]
            },
            {
                "name": "Vila Roz",
                "service_type": "Restaurant",
                "description": "Restaurant cu grădină pentru evenimente în aer liber",
                "phone": "+373 22 345 678",
                "email": "contact@vilaroz.md",
                "rating": 4.4,
                "prices": [
                    {"event_type": "wedding", "base_price": 380, "price_type": "PER_PERSON"},
                    {"event_type": "birthday", "base_price": 300, "price_type": "PER_PERSON"},
                    {"event_type": "corporate", "base_price": 420, "price_type": "PER_PERSON"},
                    {"event_type": "default", "base_price": 350, "price_type": "PER_PERSON"},
                ]
            },
            
            # Decor floral
            {
                "name": "Flori de Lux",
                "service_type": "Decor floral",
                "description": "Aranjamente florale premium pentru evenimente speciale",
                "phone": "+373 69 678 901",
                "email": "info@floridelux.md",
                "rating": 4.9,
                "prices": [
                    {"event_type": "wedding", "base_price": 15000},
                    {"event_type": "birthday", "base_price": 8000},
                    {"event_type": "corporate", "base_price": 12000},
                    {"event_type": "default", "base_price": 10000},
                ]
            },
            {
                "name": "Petale & Arome",
                "service_type": "Decor floral",
                "description": "Decor floral elegant și personalizat",
                "phone": "+373 69 789 012",
                "email": "contact@petale.md",
                "rating": 4.6,
                "prices": [
                    {"event_type": "wedding", "base_price": 10000},
                    {"event_type": "birthday", "base_price": 6000},
                    {"event_type": "corporate", "base_price": 9000},
                    {"event_type": "default", "base_price": 7000},
                ]
            },
            {
                "name": "Flori Simple",
                "service_type": "Decor floral",
                "description": "Aranjamente florale accesibile",
                "phone": "+373 69 890 123",
                "email": "info@florisimple.md",
                "rating": 4.2,
                "prices": [
                    {"event_type": "wedding", "base_price": 6000},
                    {"event_type": "birthday", "base_price": 4000},
                    {"event_type": "corporate", "base_price": 5000},
                    {"event_type": "default", "base_price": 4500},
                ]
            },
            
            # Lumânări / sfeșnice
            {
                "name": "Candlelight Events",
                "service_type": "Lumânări / sfeșnice",
                "description": "Decorațiuni cu lumânări pentru atmosferă romantică",
                "phone": "+373 69 901 234",
                "email": "info@candlelight.md",
                "rating": 4.7,
                "prices": [
                    {"event_type": "wedding", "base_price": 3000},
                    {"event_type": "birthday", "base_price": 2000},
                    {"event_type": "corporate", "base_price": 2500},
                    {"event_type": "default", "base_price": 2200},
                ]
            },
            {
                "name": "Lumina Magică",
                "service_type": "Lumânări / sfeșnice",
                "description": "Sfeșnice și lumânări decorative",
                "phone": "+373 69 012 345",
                "email": "contact@luminamagica.md",
                "rating": 4.4,
                "prices": [
                    {"event_type": "wedding", "base_price": 2000},
                    {"event_type": "birthday", "base_price": 1500},
                    {"event_type": "corporate", "base_price": 1800},
                    {"event_type": "default", "base_price": 1600},
                ]
            },
            {
                "name": "Candle Decor",
                "service_type": "Lumânări / sfeșnice",
                "description": "Decorațiuni simple cu lumânări",
                "phone": "+373 69 123 456",
                "email": "info@candledecor.md",
                "rating": 4.0,
                "prices": [
                    {"event_type": "wedding", "base_price": 1200},
                    {"event_type": "birthday", "base_price": 800},
                    {"event_type": "corporate", "base_price": 1000},
                    {"event_type": "default", "base_price": 900},
                ]
            },
            
            # Panou foto / backdrop
            {
                "name": "Photo Backdrop Pro",
                "service_type": "Panou foto / backdrop",
                "description": "Panouri foto profesionale personalizate",
                "phone": "+373 69 234 567",
                "email": "info@photobackdrop.md",
                "rating": 4.8,
                "prices": [
                    {"event_type": "wedding", "base_price": 4000},
                    {"event_type": "birthday", "base_price": 3000},
                    {"event_type": "corporate", "base_price": 3500},
                    {"event_type": "default", "base_price": 3200},
                ]
            },
            {
                "name": "Backdrop Studio",
                "service_type": "Panou foto / backdrop",
                "description": "Panouri foto elegante pentru evenimente",
                "phone": "+373 69 345 678",
                "email": "contact@backdrop.md",
                "rating": 4.5,
                "prices": [
                    {"event_type": "wedding", "base_price": 2500},
                    {"event_type": "birthday", "base_price": 2000},
                    {"event_type": "corporate", "base_price": 2300},
                    {"event_type": "default", "base_price": 2100},
                ]
            },
            {
                "name": "Simple Backdrop",
                "service_type": "Panou foto / backdrop",
                "description": "Panouri foto simple și accesibile",
                "phone": "+373 69 456 789",
                "email": "info@simplebackdrop.md",
                "rating": 4.1,
                "prices": [
                    {"event_type": "wedding", "base_price": 1500},
                    {"event_type": "birthday", "base_price": 1200},
                    {"event_type": "corporate", "base_price": 1400},
                    {"event_type": "default", "base_price": 1300},
                ]
            },
        ]
        
        # Adaugă furnizorii în baza de date
        for supplier_data in suppliers_data:
            # Creează template-ul furnizorului
            supplier = SupplierTemplate(
                name=supplier_data["name"],
                service_type=supplier_data["service_type"],
                description=supplier_data["description"],
                phone=supplier_data["phone"],
                email=supplier_data["email"],
                rating=supplier_data["rating"],
                is_active=True
            )
            db.add(supplier)
            db.flush()  # Pentru a obține ID-ul
            
            # Adaugă prețurile pentru fiecare tip de eveniment
            for price_data in supplier_data["prices"]:
                pricing = SupplierTemplatePricing(
                    supplier_template_id=supplier.id,
                    event_type=price_data["event_type"],
                    base_price=price_data["base_price"],
                    pricing_model=price_data.get("price_type", "FIX_EVENT"),
                    is_active=True
                )
                db.add(pricing)
            
            print(f"✓ Adăugat: {supplier.name} ({supplier.service_type})")
        
        db.commit()
        print(f"\n✅ Succes! Au fost adăugați {len(suppliers_data)} furnizori în baza de date.")
        print("\nAcum poți genera pachete în wizard!")
        
    except Exception as e:
        db.rollback()
        print(f"\n❌ Eroare: {e}")
    finally:
        db.close()


if __name__ == "__main__":
    print("=" * 60)
    print("SEED SUPPLIERS - Populare bază de date cu furnizori")
    print("=" * 60)
    print()
    seed_suppliers()
