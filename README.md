# 🎉 Event Management Platform - POLUBVI

O platformă modernă și completă pentru planificarea și gestionarea evenimentelor, construită cu React, TypeScript și FastAPI.

## ✨ Caracteristici Principale

### 🧙‍♂️ Wizard Inteligent de Creare Evenimente
- Ghidare pas cu pas prin 8 etape intuitive
- Generare automată de pachete personalizate
- Recomandări inteligente de furnizori
- Calcul automat al bugetului

### 📦 Sistem de Pachete
- 3 niveluri: Economic, Standard, Premium
- Excludere automată a furnizorilor deja selectați
- Afișare detaliată a prețurilor (per persoană/fix)
- Comparare ușoară între pachete

### 💼 Gestionare Furnizori
- Bază de date cu 27+ furnizori
- Categorii diverse: DJ, Fotografie, Decor, Restaurant, etc.
- Rating și prețuri transparente
- Suport pentru prețuri per persoană și fixe

### 💰 Management Buget
- Tracking în timp real al cheltuielilor
- Categorii personalizabile
- Status plăți (plătit/neplătit/parțial)
- Comparație buget estimat vs real

### ✅ Checklist Automat
- Task-uri generate automat pentru fiecare furnizor
- Deadline-uri calculate inteligent
- Organizare pe categorii
- Progress tracking

### 👥 Gestionare Invitați
- Import/Export CSV
- Organizare pe mese
- Tracking RSVP
- Categorii personalizate (adulți/copii)

## 🚀 Tehnologii Utilizate

### Frontend
- **React 18** - UI framework
- **TypeScript** - Type safety
- **Vite** - Build tool rapid
- **Tailwind CSS** - Styling modern
- **Lucide React** - Iconițe elegante

### Backend
- **FastAPI** - Python web framework
- **SQLAlchemy** - ORM
- **PostgreSQL** - Bază de date
- **Pydantic** - Validare date
- **Alembic** - Migrări bază de date

## 📋 Cerințe

- **Node.js** 18+ și npm
- **Python** 3.9+
- **PostgreSQL** 13+

## 🛠️ Instalare

### 1. Clonează repository-ul
```bash
git clone https://github.com/[username]/event-management-platform.git
cd event-management-platform
```

### 2. Configurare Frontend
```bash
# Instalează dependențele
npm install

# Creează fișier .env
cp .env.example .env
```

### 3. Configurare Backend
```bash
cd backend

# Creează virtual environment
python -m venv venv

# Activează virtual environment
# Windows:
venv\Scripts\activate
# Linux/Mac:
source venv/bin/activate

# Instalează dependențele
pip install -r requirements.txt

# Creează fișier .env
cp .env.example .env
```

### 4. Configurare Bază de Date
```bash
# Editează backend/.env cu credențialele PostgreSQL
DATABASE_URL=postgresql://user:password@localhost:5432/event_management

# Rulează migrările
cd backend
alembic upgrade head

# Populează baza de date cu furnizori
python seed_suppliers.py
```

## 🎮 Rulare

### Mod Development

**Terminal 1 - Backend:**
```bash
cd backend
python run.py
```
Backend va rula pe `http://localhost:8000`

**Terminal 2 - Frontend:**
```bash
npm run dev
```
Frontend va rula pe `http://localhost:5173`

### Mod Production

**Frontend:**
```bash
npm run build
npm run preview
```

**Backend:**
```bash
cd backend
uvicorn app.main:app --host 0.0.0.0 --port 8000
```

## 📚 Documentație API

După pornirea backend-ului, accesează:
- **Swagger UI**: http://localhost:8000/docs
- **ReDoc**: http://localhost:8000/redoc

## 🗂️ Structura Proiectului

```
event-management-platform/
├── src/                          # Frontend React
│   ├── components/              # Componente React
│   │   ├── wizard/             # Wizard creare evenimente
│   │   ├── suppliers/          # Gestionare furnizori
│   │   ├── budget/             # Management buget
│   │   └── guests/             # Gestionare invitați
│   ├── services/               # API services
│   └── utils/                  # Utilități
├── backend/                     # Backend FastAPI
│   ├── app/
│   │   ├── routers/           # API endpoints
│   │   ├── models/            # SQLAlchemy models
│   │   ├── schemas/           # Pydantic schemas
│   │   └── services/          # Business logic
│   ├── alembic/               # Database migrations
│   └── seed_suppliers.py      # Script populare DB
└── docs/                       # Documentație
```

## 🎯 Funcționalități Cheie

### Wizard Creare Evenimente (8 Pași)

1. **Tip Eveniment** - Nuntă, Zi de naștere, Corporate, etc.
2. **Stadiu Planificare** - Status curent
3. **Data** - Dată exactă sau aproximativă
4. **Locație** - Restaurant/Venue cu preț per invitat
5. **Invitați** - Număr estimat
6. **Servicii** - Selectare categorii dorite
7. **Buget** - Buget estimat (opțional)
8. **Pachete** - Generare și selectare pachete

### Generare Inteligentă Pachete

- **Excludere Duplicați**: Dacă ai ales un restaurant, nu vor apărea alte restaurante
- **3 Niveluri de Preț**: Economic, Standard, Premium
- **Calcul Automat**: Prețuri calculate pe baza numărului de invitați
- **Transparență**: Afișare detaliată preț per serviciu

## 🔧 Configurare Avansată

### Variabile de Mediu

**Frontend (.env):**
```env
VITE_API_URL=http://localhost:8000
```

**Backend (.env):**
```env
DATABASE_URL=postgresql://user:password@localhost:5432/event_management
SECRET_KEY=your-secret-key-here
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=30
```

## 🧪 Testing

```bash
# Frontend tests
npm run test

# Backend tests
cd backend
pytest
```

## 📝 Contribuții

Contribuțiile sunt binevenite! Te rog:
1. Fork repository-ul
2. Creează un branch pentru feature (`git checkout -b feature/AmazingFeature`)
3. Commit modificările (`git commit -m 'Add some AmazingFeature'`)
4. Push pe branch (`git push origin feature/AmazingFeature`)
5. Deschide un Pull Request

## 📄 Licență

Acest proiect este licențiat sub MIT License - vezi fișierul [LICENSE](LICENSE) pentru detalii.

## 👥 Autori

- **Marina** - *Dezvoltare inițială*

## 🙏 Mulțumiri

- Tuturor contribuitorilor
- Comunității open-source
- Utilizatorilor platformei

## 📞 Contact

Pentru întrebări sau sugestii, te rog deschide un issue pe GitHub.

---

**Made with ❤️ for event planners**
