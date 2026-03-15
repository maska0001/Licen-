from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from sqlalchemy.orm import Session
from app.routers import auth, events, guests, suppliers, budget, tables, checklist, landing, public, wizard
from app.database.session import engine, Base
from app import models
from app.core.config import settings
from app.services.budget_service import ensure_budget_columns
from app.services.checklist_service import ensure_checklist_columns
from app.services.service_catalog import ensure_service_catalog
from app.services.service_relations import (
    ensure_service_relation_columns,
    sync_service_relations,
)
from pathlib import Path

# Create database tables
Base.metadata.create_all(bind=engine)
with Session(bind=engine) as db:
    ensure_service_relation_columns(db)
    ensure_budget_columns(db)
    ensure_checklist_columns(db)
    ensure_service_catalog(db)
    sync_service_relations(db)

app = FastAPI(
    title="Event Management API",
    description="Backend API for Event Management Platform",
    version="1.0.0"
)

# CORS middleware - using settings from config
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.CORS_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

uploads_dir = Path(__file__).resolve().parents[1] / "uploads"
uploads_dir.mkdir(parents=True, exist_ok=True)
app.mount("/uploads", StaticFiles(directory=str(uploads_dir)), name="uploads")

# Include routers
app.include_router(auth.router)
app.include_router(events.router)
app.include_router(guests.router)
app.include_router(suppliers.router, prefix="/suppliers")
app.include_router(budget.router)
app.include_router(tables.router)
app.include_router(checklist.router)
app.include_router(landing.router)
app.include_router(public.router)
app.include_router(wizard.router)


@app.get("/")
def root():
    return {"message": "Event Management API", "version": "1.0.0"}


@app.get("/health")
def health_check():
    return {"status": "healthy"}
