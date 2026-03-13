from sqlalchemy import Column, Integer, String, DateTime, ForeignKey
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from app.database.session import Base


class RsvpToken(Base):
    __tablename__ = "rsvp_tokens"

    id = Column(Integer, primary_key=True, index=True)
    event_id = Column(Integer, ForeignKey("events.id", ondelete="CASCADE"), nullable=False)
    guest_id = Column(Integer, ForeignKey("guests.id", ondelete="CASCADE"), nullable=False, unique=True)
    token = Column(String, unique=True, nullable=False, index=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())

    # Relationships
    guest = relationship("Guest", back_populates="rsvp_token")
