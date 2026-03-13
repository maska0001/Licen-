from fastapi.testclient import TestClient
from app.models.supplier_template import SupplierTemplate
from app.models.supplier_template_pricing import SupplierTemplatePricing
from app.models.event_service_preference import EventServicePreference
from tests.conftest import TestingSessionLocal


def seed_pricing():
    session = TestingSessionLocal()
    tmpl1 = SupplierTemplate(name="Foto Low", service_type="photo", rating=3.5)
    tmpl2 = SupplierTemplate(name="Foto Mid", service_type="photo", rating=4.0)
    tmpl3 = SupplierTemplate(name="Foto High", service_type="photo", rating=4.8)
    session.add_all([tmpl1, tmpl2, tmpl3])
    session.flush()
    p1 = SupplierTemplatePricing(supplier_template_id=tmpl1.id, event_type="wedding", pricing_model="FIX_EVENT", base_price=3000, is_active=True)
    p2 = SupplierTemplatePricing(supplier_template_id=tmpl2.id, event_type="wedding", pricing_model="FIX_EVENT", base_price=5000, is_active=True)
    p3 = SupplierTemplatePricing(supplier_template_id=tmpl3.id, event_type="wedding", pricing_model="FIX_EVENT", base_price=8000, is_active=True)
    session.add_all([p1, p2, p3])
    session.commit()
    session.close()


def test_generate_packages_low_mid_high(client: TestClient):
    seed_pricing()
    # start wizard -> creates event draft
    res = client.post("/wizard/events/start", json={"title": "Test", "event_type": "wedding"})
    assert res.status_code == 201
    event_id = res.json()["id"]

    # set service preference photo
    res = client.patch(f"/wizard/events/{event_id}/step/5", json={"services": ["photo"]})
    assert res.status_code == 200

    # generate packages
    res = client.post(f"/wizard/events/{event_id}/generate-packages")
    assert res.status_code == 200
    packages = res.json()
    assert len(packages) == 3

    # low/mid/high price expectation
    totals = sorted([pkg["total_estimated_cost"] for pkg in packages])
    assert totals == [3000.0, 5000.0, 8000.0]

    # list packages endpoint
    res = client.get(f"/wizard/events/{event_id}/packages")
    assert res.status_code == 200
    assert len(res.json()) == 3
