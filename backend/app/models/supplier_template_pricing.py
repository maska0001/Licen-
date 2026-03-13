from sqlalchemy import Column, Integer, String, Boolean, DateTime, Float, ForeignKey
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from app.database.session import Base


class SupplierTemplatePricing(Base):
    __tablename__ = "supplier_template_event_pricing"

    id = Column(Integer, primary_key=True, index=True)
    supplier_template_id = Column(Integer, ForeignKey("supplier_templates.id", ondelete="CASCADE"), nullable=False)
    event_type = Column(String, nullable=False)
    pricing_model = Column(String, nullable=True)  # e.g., FIX_EVENT, PER_GUEST, PER_HOUR
    base_price = Column(Float, nullable=False)
    price_per_guest = Column(Float, nullable=True)
    price_per_hour = Column(Float, nullable=True)
    notes = Column(String, nullable=True)
    is_active = Column(Boolean, default=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), server_default=func.now(), onupdate=func.now())

    template = relationship("SupplierTemplate", back_populates="pricing")

