from sqlalchemy import Column, Integer, String, ForeignKey, Enum
from sqlalchemy.orm import relationship
import enum
from app.database.session import Base


class RsvpStatus(str, enum.Enum):
    pending = "pending"
    confirmed = "confirmed"
    declined = "declined"


class Guest(Base):
    __tablename__ = "guests"

    id = Column(Integer, primary_key=True, index=True)
    event_id = Column(Integer, ForeignKey("events.id", ondelete="CASCADE"), nullable=False)
    name = Column(String, nullable=False)
    phone = Column(String)
    email = Column(String)
    status = Column(Enum(RsvpStatus), default=RsvpStatus.pending)
    adults = Column(Integer, default=1)
    children = Column(Integer, default=0)
    notes = Column(String)
    table_id = Column(Integer, ForeignKey("tables.id", ondelete="SET NULL"), nullable=True)
    parent_guest_id = Column(Integer, ForeignKey("guests.id", ondelete="CASCADE"), nullable=True)
    is_children_only = Column(Integer, default=0)  # SQLite doesn't have boolean, using 0/1

    # Relationships
    event = relationship("Event", back_populates="guests")
    table = relationship("Table", back_populates="guests")
    rsvp_token = relationship("RsvpToken", back_populates="guest", uselist=False, cascade="all, delete-orphan")
    parent = relationship("Guest", remote_side=[id], foreign_keys=[parent_guest_id])
