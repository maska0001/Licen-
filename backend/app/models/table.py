from sqlalchemy import Column, Integer, String, ForeignKey
from sqlalchemy.orm import relationship
from app.database.session import Base


class Table(Base):
    __tablename__ = "tables"

    id = Column(Integer, primary_key=True, index=True)
    event_id = Column(Integer, ForeignKey("events.id", ondelete="CASCADE"), nullable=False)
    name = Column(String, nullable=False)
    total_seats = Column(Integer, default=8)
    occupied_seats = Column(Integer, default=0)

    # Relationships
    event = relationship("Event", back_populates="tables")
    guests = relationship("Guest", back_populates="table")
