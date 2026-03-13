from sqlalchemy import Column, Integer, String, DateTime, Date, ForeignKey, Enum as SQLEnum, JSON, Boolean
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
import enum
from app.database.session import Base


class EventStatus(str, enum.Enum):
    DRAFT = "draft"
    FINALIZED = "finalized"
    ARCHIVED = "archived"


class Event(Base):
    __tablename__ = "events"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id", ondelete="CASCADE"), nullable=False)
    title = Column(String, nullable=False)
    event_type = Column(String, nullable=True)
    date = Column(Date, nullable=True)
    time = Column(String, nullable=True)
    planning_stage = Column(String, nullable=True)
    date_mode = Column(String, nullable=True)
    event_month = Column(Integer, nullable=True)
    event_year = Column(Integer, nullable=True)
    city = Column(String)
    venue_city = Column(String, nullable=True)
    venue_name = Column(String, nullable=True)
    venue_address = Column(String, nullable=True)
    venue_price_per_guest = Column(Integer, nullable=True)
    location_mode = Column(String, nullable=True)
    guest_count_min = Column(Integer, nullable=True)
    guest_count_max = Column(Integer, nullable=True)
    guest_count_estimated = Column(Integer, default=0)
    guest_count = Column(Integer, default=0)
    default_adults = Column(Integer, default=1)
    default_children = Column(Integer, default=0)
    planning_mode = Column(String, nullable=True)  # package / manual
    package_id = Column(String, nullable=True)
    selected_package_id = Column(Integer, nullable=True)
    has_budget = Column(Boolean, default=False)
    budget_total_estimated = Column(Integer, nullable=True)
    budget_currency = Column(String, nullable=True)
    enabled_modules = Column(JSON, nullable=True)
    status = Column(SQLEnum(EventStatus), default=EventStatus.DRAFT, nullable=False)
    wizard_step = Column(Integer, default=0, nullable=False)
    created_at = Column(DateTime(timezone=True), server_default=func.now())

    # Relationships
    user = relationship("User", back_populates="events")
    guests = relationship("Guest", back_populates="event", cascade="all, delete-orphan")
    suppliers = relationship("Supplier", back_populates="event", cascade="all, delete-orphan")
    budget_items = relationship("BudgetItem", back_populates="event", cascade="all, delete-orphan")
    tables = relationship("Table", back_populates="event", cascade="all, delete-orphan")
    checklist_items = relationship("ChecklistItem", back_populates="event", cascade="all, delete-orphan")
    landing_page = relationship("LandingPage", back_populates="event", uselist=False, cascade="all, delete-orphan")
    service_preferences = relationship("EventServicePreference", back_populates="event", cascade="all, delete-orphan")
