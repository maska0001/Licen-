from fastapi import APIRouter, Depends, File, HTTPException, Request, UploadFile, status
from sqlalchemy.orm import Session
from app.database.session import get_db
from app.models.user import User
from app.models.event import Event
from app.models.landing import LandingPage
from app.schemas.landing import LandingPageUpdate, LandingPageResponse
from app.core.security import get_current_user
from app.services.landing_content import sync_landing_fields_from_content, update_landing_from_payload
from app.utils.permissions import verify_event_ownership
import json
import re
from typing import Optional
from pathlib import Path
from uuid import uuid4
from urllib.parse import urlparse

router = APIRouter(tags=["Landing"])
UPLOAD_ROOT = Path(__file__).resolve().parents[2] / "uploads" / "landing"
ALLOWED_IMAGE_TYPES = {"image/jpeg", "image/png", "image/webp", "image/gif"}
MAX_IMAGE_SIZE_BYTES = 5 * 1024 * 1024


def build_unique_slug(db: Session, landing_page: LandingPage, raw_source: str) -> str:
    base_slug = re.sub(r"[^a-z0-9]+", "-", raw_source.lower()).strip("-") or f"event-{landing_page.event_id}"
    slug = base_slug
    counter = 1

    while (
        db.query(LandingPage)
        .filter(LandingPage.public_slug == slug, LandingPage.id != landing_page.id)
        .first()
    ):
        counter += 1
        slug = f"{base_slug}-{counter}"

    return slug


def ensure_public_slug(db: Session, landing_page: LandingPage, event: Optional[Event] = None) -> str:
    if landing_page.public_slug:
        landing_page.public_slug = build_unique_slug(db, landing_page, landing_page.public_slug)
        return landing_page.public_slug

    raw_source = (
        landing_page.title
        or (event.title if event else None)
        or f"event-{landing_page.event_id}"
    )
    landing_page.public_slug = build_unique_slug(db, landing_page, raw_source)
    return landing_page.public_slug


def extract_local_upload_paths(landing_page: LandingPage, event_id: int) -> set[str]:
    referenced_paths: set[str] = set()
    expected_prefix = f"/uploads/landing/{event_id}/"

    def maybe_add(value: object) -> None:
        if not isinstance(value, str) or not value:
            return

        parsed = urlparse(value)
        candidate_path = parsed.path or value
        if candidate_path.startswith(expected_prefix):
          referenced_paths.add(Path(candidate_path).name)

    maybe_add(landing_page.cover_image)

    if landing_page.content_json:
        try:
            content = json.loads(landing_page.content_json)
        except (TypeError, ValueError):
            content = {}

        if isinstance(content, dict):
            maybe_add(content.get("coverImage"))
            for key in ("galleryImages", "timingIcons"):
                values = content.get(key)
                if isinstance(values, list):
                    for item in values:
                        maybe_add(item)

    return referenced_paths


def cleanup_unused_uploads(landing_page: LandingPage) -> None:
    event_dir = UPLOAD_ROOT / str(landing_page.event_id)
    if not event_dir.exists():
        return

    referenced_files = extract_local_upload_paths(landing_page, landing_page.event_id)
    for filepath in event_dir.iterdir():
        if filepath.is_file() and filepath.name not in referenced_files:
            filepath.unlink(missing_ok=True)


@router.post("/events/{event_id}/landing/upload-image")
async def upload_landing_image(
    event_id: int,
    request: Request,
    file: UploadFile = File(...),
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    verify_event_ownership(db, event_id, current_user)

    if file.content_type not in ALLOWED_IMAGE_TYPES:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Tip de imagine invalid. Sunt acceptate JPG, PNG, WEBP sau GIF.",
        )

    contents = await file.read()
    if len(contents) > MAX_IMAGE_SIZE_BYTES:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Imaginea este prea mare. Dimensiunea maximă este 5MB.",
        )

    extension = Path(file.filename or "image").suffix.lower() or ".jpg"
    safe_extension = extension if extension in {".jpg", ".jpeg", ".png", ".webp", ".gif"} else ".jpg"

    event_dir = UPLOAD_ROOT / str(event_id)
    event_dir.mkdir(parents=True, exist_ok=True)

    filename = f"{uuid4().hex}{safe_extension}"
    filepath = event_dir / filename
    filepath.write_bytes(contents)

    public_url = str(request.base_url).rstrip("/") + f"/uploads/landing/{event_id}/{filename}"
    return {"url": public_url}


@router.get("/events/{event_id}/landing", response_model=LandingPageResponse)
def get_landing_page(
    event_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    verify_event_ownership(db, event_id, current_user)
    landing_page = db.query(LandingPage).filter(LandingPage.event_id == event_id).first()
    event = db.query(Event).filter(Event.id == event_id).first()
    
    if not landing_page:
        # Create default landing page if it doesn't exist
        landing_page = LandingPage(event_id=event_id, content_json=None, published=False)
        ensure_public_slug(db, landing_page, event)
        sync_landing_fields_from_content(landing_page)
        db.add(landing_page)
        db.commit()
        db.refresh(landing_page)
    else:
        sync_landing_fields_from_content(landing_page)
        db.commit()
        db.refresh(landing_page)
    
    return landing_page


@router.put("/events/{event_id}/landing", response_model=LandingPageResponse)
def update_landing_page(
    event_id: int,
    landing_data: LandingPageUpdate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    verify_event_ownership(db, event_id, current_user)
    landing_page = db.query(LandingPage).filter(LandingPage.event_id == event_id).first()
    event = db.query(Event).filter(Event.id == event_id).first()
    
    if not landing_page:
        landing_page = LandingPage(event_id=event_id)
        db.add(landing_page)
    
    payload = landing_data.model_dump(exclude_unset=True)
    custom_slug = payload.pop("public_slug", None)
    update_landing_from_payload(landing_page, payload)

    if custom_slug is not None:
        landing_page.public_slug = custom_slug

    ensure_public_slug(db, landing_page, event)
    cleanup_unused_uploads(landing_page)
    
    db.commit()
    db.refresh(landing_page)
    return landing_page


@router.post("/events/{event_id}/landing/publish", response_model=LandingPageResponse)
def publish_landing_page(
    event_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    verify_event_ownership(db, event_id, current_user)
    landing_page = db.query(LandingPage).filter(LandingPage.event_id == event_id).first()
    event = db.query(Event).filter(Event.id == event_id).first()
    
    if not landing_page:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Landing page not found"
        )
    
    ensure_public_slug(db, landing_page, event)
    landing_page.published = True
    db.commit()
    db.refresh(landing_page)
    return landing_page
