import json
from typing import Any, Dict, Optional

from app.models.landing import LandingPage


def parse_landing_content(content_json: Optional[str]) -> Dict[str, Any]:
    if not content_json:
        return {}

    try:
        parsed = json.loads(content_json)
    except (TypeError, ValueError):
        return {}

    return parsed if isinstance(parsed, dict) else {}


def build_legacy_content_snapshot(landing_page: LandingPage) -> dict[str, Any]:
    return {
        "published": bool(landing_page.published),
        "coverImage": landing_page.cover_image or "",
        "galleryImages": [],
        "title": landing_page.title or "",
        "subtitle": "",
        "date": landing_page.date or "",
        "time": "",
        "location": landing_page.location or "",
        "locationAddress": "",
        "heroMessage": landing_page.message or "",
        "dateDescription": landing_page.message or "",
        "detailsDescription": landing_page.message or "",
        "dressCode": landing_page.dress_code or "",
        "schedule": [],
        "timingIcons": [],
        "colorPrimary": "#960010",
        "colorSecondary": "#ec4899",
    }


def sync_landing_fields_from_content(landing_page: LandingPage) -> None:
    content = parse_landing_content(landing_page.content_json)
    if not content:
        content = build_legacy_content_snapshot(landing_page)

    landing_page.content = content
    landing_page.title = content.get("title") or landing_page.title
    landing_page.date = content.get("date") or landing_page.date
    landing_page.location = content.get("location") or landing_page.location
    landing_page.cover_image = content.get("coverImage") or landing_page.cover_image
    landing_page.message = content.get("heroMessage") or content.get("message") or landing_page.message
    landing_page.dress_code = content.get("dressCode") or landing_page.dress_code
    landing_page.published = bool(content.get("published", landing_page.published))
    landing_page.content_json = json.dumps(content)


def update_landing_from_payload(landing_page: LandingPage, payload: dict[str, Any]) -> None:
    content_json = payload.pop("content_json", None)

    if content_json is not None:
        landing_page.content_json = content_json

    for key, value in payload.items():
        setattr(landing_page, key, value)

    sync_landing_fields_from_content(landing_page)
