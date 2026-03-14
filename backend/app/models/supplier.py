from sqlalchemy import Column, Integer, String, Float, Boolean, ForeignKey
from sqlalchemy.orm import relationship
from app.database.session import Base


class Supplier(Base):
    __tablename__ = "suppliers"

    id = Column(Integer, primary_key=True, index=True)
    event_id = Column(Integer, ForeignKey("events.id", ondelete="CASCADE"), nullable=False)
    name = Column(String, nullable=False)
    category = Column(String, nullable=False)
    service_id = Column(Integer, ForeignKey("services.id", ondelete="SET NULL"), nullable=True, index=True)
    contact = Column(String, nullable=True)
    location = Column(String, nullable=True)
    price = Column(Float, default=0.0)
    price_type = Column(String, default="FIX_EVENT")  # FIX_EVENT | PER_INVITAT
    original_price = Column(Float, nullable=True)
    original_price_type = Column(String, nullable=True)
    rating = Column(Float, default=0.0)
    selected = Column(Boolean, default=False)
    is_custom = Column(Boolean, default=False)

    # Relationships
    event = relationship("Event", back_populates="suppliers")
    service = relationship("Service", back_populates="suppliers")
