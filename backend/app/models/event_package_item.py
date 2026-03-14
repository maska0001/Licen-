from sqlalchemy import Column, Integer, String, Boolean, DateTime, ForeignKey, Float
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from app.database.session import Base


class EventPackageItem(Base):
    __tablename__ = "event_package_items"

    id = Column(Integer, primary_key=True, index=True)
    package_id = Column(Integer, ForeignKey("event_packages.id", ondelete="CASCADE"), nullable=False)
    service_type = Column(String, nullable=False)
    service_id = Column(Integer, ForeignKey("services.id", ondelete="SET NULL"), nullable=True, index=True)
    supplier_template_id = Column(Integer, ForeignKey("supplier_templates.id"), nullable=True)
    pricing_row_id = Column(Integer, ForeignKey("supplier_template_event_pricing.id"), nullable=True)
    supplier_name_snapshot = Column(String, nullable=False)
    estimated_cost = Column(Float, default=0.0)
    supplier_rating_snapshot = Column(Float, default=0.0)
    supplier_is_custom_snapshot = Column(Boolean, default=False)
    matrix_position = Column(String, nullable=True)  # low / middle / high
    pricing_model = Column(String, nullable=True)  # FIX_EVENT, PER_INVITAT, etc.
    base_price_per_unit = Column(Float, nullable=True)  # Original price before multiplication
    notes = Column(String, nullable=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())

    package = relationship("EventPackage", back_populates="items")
    service = relationship("Service")
