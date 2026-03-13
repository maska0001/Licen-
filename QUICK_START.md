# 🚀 Quick Start Guide

Ghid rapid pentru a porni proiectul în 5 minute!

## 📋 Cerințe

- Node.js 18+
- Python 3.9+
- PostgreSQL 13+

## ⚡ Start Rapid

### 1. Clone & Install (2 minute)

```bash
# Clone repository
git clone https://github.com/[username]/event-management-platform.git
cd event-management-platform

# Install frontend dependencies
npm install

# Install backend dependencies
cd backend
python -m venv venv
venv\Scripts\activate  # Windows
pip install -r requirements.txt
```

### 2. Configure (1 minut)

```bash
# Frontend .env
cp .env.example .env

# Backend .env
cp backend/.env.example backend/.env
# Editează backend/.env cu credențialele PostgreSQL
```

### 3. Database Setup (1 minut)

```bash
cd backend

# Run migrations
alembic upgrade head

# Seed suppliers
python seed_suppliers.py
```

### 4. Run (1 minut)

```bash
# Terminal 1 - Backend
cd backend
python run.py

# Terminal 2 - Frontend
npm run dev
```

## 🎉 Gata!

- Frontend: http://localhost:5173
- Backend: http://localhost:8000
- API Docs: http://localhost:8000/docs

## 🔧 Troubleshooting

### Port deja folosit?
```bash
# Schimbă portul în vite.config.ts (frontend)
# Schimbă portul în run.py (backend)
```

### Database connection error?
```bash
# Verifică că PostgreSQL rulează
# Verifică credențialele în backend/.env
```

### Module not found?
```bash
# Reinstalează dependencies
npm install
pip install -r requirements.txt
```

## 📚 Next Steps

1. Citește [README.md](README.md) pentru detalii complete
2. Explorează [docs/](docs/) pentru documentație tehnică
3. Verifică [CHANGELOG.md](CHANGELOG.md) pentru modificări recente

---

**Need help?** Open an issue on GitHub!
