#!/usr/bin/env python3
"""
Backend Health Check Script
Run this to verify your backend is properly configured
"""

import sys
import os

# Fix Windows console encoding
if sys.platform == 'win32':
    import codecs
    sys.stdout = codecs.getwriter('utf-8')(sys.stdout.buffer, 'strict')
    sys.stderr = codecs.getwriter('utf-8')(sys.stderr.buffer, 'strict')

def check_file_exists(filepath, description):
    """Check if a file exists"""
    if os.path.exists(filepath):
        print(f"[OK] {description}: {filepath}")
        return True
    else:
        print(f"[ERROR] {description} NOT FOUND: {filepath}")
        return False

def check_python_version():
    """Check Python version"""
    version = sys.version_info
    print(f"\nPython Version: {version.major}.{version.minor}.{version.micro}")
    if version.major >= 3 and version.minor >= 8:
        print("[OK] Python version is compatible (3.8+)")
        return True
    else:
        print("[ERROR] Python version too old! Need 3.8+")
        return False

def check_dependencies():
    """Check if required dependencies are installed"""
    required_packages = [
        'fastapi',
        'uvicorn',
        'sqlalchemy',
        'psycopg2',
        'python_jose',
        'passlib',
        'pydantic',
        'pydantic_settings',
        'dotenv'
    ]
    
    print("\nChecking Dependencies:")
    missing = []
    for package in required_packages:
        try:
            __import__(package.replace('-', '_'))
            print(f"  [OK] {package}")
        except ImportError:
            print(f"  [ERROR] {package} NOT INSTALLED")
            missing.append(package)
    
    if missing:
        print(f"\nInstall missing packages: pip install -r requirements.txt")
        return False
    return True

def check_env_file():
    """Check if .env file exists and has required variables"""
    env_path = os.path.join(os.path.dirname(__file__), '.env')
    
    print("\nChecking Environment File:")
    if not os.path.exists(env_path):
        print(f"[ERROR] .env file not found at {env_path}")
        return False
    
    print(f"[OK] .env file found: {env_path}")
    
    required_vars = ['DATABASE_URL', 'SECRET_KEY']
    env_vars = {}
    
    with open(env_path, 'r') as f:
        for line in f:
            line = line.strip()
            if line and not line.startswith('#') and '=' in line:
                key, value = line.split('=', 1)
                env_vars[key] = value
    
    missing_vars = []
    for var in required_vars:
        if var in env_vars:
            if var == 'SECRET_KEY' and 'your-secret-key' in env_vars[var]:
                print(f"  [WARNING] {var} is set but uses default value (change in production!)")
            else:
                print(f"  [OK] {var} is set")
        else:
            print(f"  [ERROR] {var} NOT FOUND")
            missing_vars.append(var)
    
    if missing_vars:
        print(f"\nMissing required variables: {', '.join(missing_vars)}")
        return False
    
    return True

def check_database_url():
    """Check if database URL is properly formatted"""
    env_path = os.path.join(os.path.dirname(__file__), '.env')
    
    if not os.path.exists(env_path):
        return False
    
    with open(env_path, 'r') as f:
        for line in f:
            if line.startswith('DATABASE_URL='):
                url = line.split('=', 1)[1].strip()
                if url.startswith('postgresql://'):
                    print(f"[OK] Database URL format is correct")
                    print(f"  Database: {url.split('@')[-1] if '@' in url else 'unknown'}")
                    return True
                else:
                    print(f"[ERROR] Database URL format is incorrect: {url}")
                    print(f"  Should start with: postgresql://")
                    return False
    
    print(f"[ERROR] DATABASE_URL not found in .env")
    return False

def main():
    print("=" * 60)
    print("Event Management Platform - Backend Health Check")
    print("=" * 60)
    
    checks = []
    
    # Check Python version
    checks.append(check_python_version())
    
    # Check dependencies
    checks.append(check_dependencies())
    
    # Check .env file
    checks.append(check_env_file())
    
    # Check database URL
    checks.append(check_database_url())
    
    # Summary
    print("\n" + "=" * 60)
    if all(checks):
        print("[SUCCESS] All checks passed! Backend is ready to start.")
        print("\nTo start the backend:")
        print("  cd backend")
        print("  python run.py")
    else:
        print("[ERROR] Some checks failed. Please fix the issues above.")
        print("\nCommon fixes:")
        print("  1. Install dependencies: pip install -r requirements.txt")
        print("  2. Create .env file with required variables")
        print("  3. Set up PostgreSQL database")
    print("=" * 60)
    
    return 0 if all(checks) else 1

if __name__ == '__main__':
    sys.exit(main())
