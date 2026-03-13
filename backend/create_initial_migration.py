#!/usr/bin/env python3
"""
Script to create initial Alembic migration for all database models.
Run with: python create_initial_migration.py
"""

import os
import sys
from datetime import datetime

# Add parent directory to path
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))

from alembic.config import Config
from alembic import command
from app.database.session import Base
from app.models import *

def create_initial_migration():
    """Create initial Alembic migration"""
    
    # Configure Alembic
    alembic_cfg = Config("alembic.ini")
    
    # Generate migration
    print("Generating initial migration...")
    revision = command.revision(
        alembic_cfg,
        message="Initial migration",
        autogenerate=True,
        head="base"
    )
    
    if revision:
        print(f"Migration created: {revision.revision}")
        
        # Apply migration
        print("Applying migration...")
        command.upgrade(alembic_cfg, "head")
        print("Migration applied successfully!")
    else:
        print("No changes detected in models.")

if __name__ == "__main__":
    create_initial_migration()