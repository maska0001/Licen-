from sqlalchemy import Column, Integer, String, Boolean, ForeignKey, Text
from sqlalchemy.dialects.postgresql import JSON
from sqlalchemy.orm import relationship
from app.database.session import Base


class LandingPage(Base):
    __tablename__ = "landing_pages"

    id = Column(Integer, primary_key=True, index=True)
    event_id = Column(Integer, ForeignKey("events.id", ondelete="CASCADE"), nullable=False, unique=True)
    title = Column(String, nullable=True)
    description = Column(Text, nullable=True)
    date = Column(String, nullable=True)
    location = Column(String, nullable=True)
    cover_image = Column(String, nullable=True)
    content = Column(JSON, nullable=True)
    content_json = Column(Text, nullable=True)  # Legacy field, kept for compatibility
    published = Column(Boolean, default=False)
    public_slug = Column(String, unique=True, index=True, nullable=True)
    slug = Column(String, unique=True, index=True, nullable=True)
    message = Column(Text, nullable=True)
    dress_code = Column(String, nullable=True)

    # Relationships
    event = relationship("Event", back_populates="landing_page")
