from sqlalchemy import Column, Integer, String, Boolean, DateTime, ForeignKey, Float
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from app.database.session import Base


class EventPackage(Base):
    __tablename__ = "event_packages"

    id = Column(Integer, primary_key=True, index=True)
    event_id = Column(Integer, ForeignKey("events.id", ondelete="CASCADE"), nullable=False)
    name = Column(String, nullable=False)
    total_estimated_cost = Column(Float, default=0.0)
    is_recommended = Column(Boolean, default=False)
    is_selected = Column(Boolean, default=False)
    generation_version = Column(Integer, default=1)
    created_at = Column(DateTime(timezone=True), server_default=func.now())

    items = relationship("EventPackageItem", back_populates="package", cascade="all, delete-orphan")
