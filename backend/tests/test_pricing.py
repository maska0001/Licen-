from app.services.pricing_service import resolve_supplier_pricing
from app.models.supplier_template import SupplierTemplate
from app.models.supplier_template_pricing import SupplierTemplatePricing
from tests.conftest import TestingSessionLocal


def test_pricing_resolution_exact_match():
    session = TestingSessionLocal()
    tmpl = SupplierTemplate(name="FotoX", service_type="photo", rating=4.5)
    session.add(tmpl)
    session.flush()
    price1 = SupplierTemplatePricing(
        supplier_template_id=tmpl.id,
        event_type="wedding",
        pricing_model="FIX_EVENT",
        base_price=12000,
        price_per_guest=None,
        price_per_hour=None,
        is_active=True,
    )
    session.add(price1)
    price_default = SupplierTemplatePricing(
        supplier_template_id=tmpl.id,
        event_type="default",
        pricing_model="FIX_EVENT",
        base_price=8000,
        is_active=True,
    )
    session.add(price_default)
    session.commit()

    pricing = resolve_supplier_pricing(session, tmpl.id, "wedding")
    assert pricing is not None
    assert pricing.event_type == "wedding"
    assert pricing.base_price == 12000
    session.close()


def test_pricing_resolution_fallback_default():
    session = TestingSessionLocal()
    tmpl = SupplierTemplate(name="DecorY", service_type="decor", rating=4.0)
    session.add(tmpl)
    session.flush()
    price_default = SupplierTemplatePricing(
        supplier_template_id=tmpl.id,
        event_type="default",
        pricing_model="FIX_EVENT",
        base_price=5000,
        is_active=True,
    )
    session.add(price_default)
    session.commit()

    pricing = resolve_supplier_pricing(session, tmpl.id, "birthday")
    assert pricing is not None
    assert pricing.event_type == "default"
    assert pricing.base_price == 5000
    session.close()


def test_pricing_resolution_missing():
    session = TestingSessionLocal()
    tmpl = SupplierTemplate(name="HostZ", service_type="host", rating=3.0)
    session.add(tmpl)
    session.flush()
    session.commit()

    pricing = resolve_supplier_pricing(session, tmpl.id, "corporate")
    assert pricing is None
    session.close()
