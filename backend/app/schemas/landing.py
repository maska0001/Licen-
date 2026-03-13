from pydantic import BaseModel
from typing import Optional


class LandingPageUpdate(BaseModel):
    title: Optional[str] = None
    description: Optional[str] = None
    date: Optional[str] = None
    location: Optional[str] = None
    cover_image: Optional[str] = None
    message: Optional[str] = None
    dress_code: Optional[str] = None
    content_json: Optional[str] = None
    published: Optional[bool] = None


class LandingPageResponse(BaseModel):
    id: int
    event_id: int
    title: Optional[str]
    description: Optional[str]
    date: Optional[str]
    location: Optional[str]
    cover_image: Optional[str]
    message: Optional[str]
    dress_code: Optional[str]
    content_json: Optional[str]
    published: bool
    public_slug: Optional[str]

    class Config:
        from_attributes = True
