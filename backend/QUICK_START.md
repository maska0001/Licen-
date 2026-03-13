# Quick Start Guide

## 🚀 Get Started in 5 Minutes

### Prerequisites
- Python 3.9+
- PostgreSQL 12+

### Step 1: Database
```bash
# Create database
psql -U postgres -c "CREATE DATABASE event_management;"
```

### Step 2: Install
```bash
cd backend
python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate
pip install -r requirements.txt
```

### Step 3: Configure
```bash
cp .env.example .env
# Edit .env with your database credentials
```

### Step 4: Migrate
```bash
alembic revision --autogenerate -m "Initial migration"
alembic upgrade head
```

### Step 5: Run
```bash
python run.py
```

Visit: http://localhost:8000/docs

---

## 🐳 Docker Quick Start

```bash
cd backend
docker-compose up -d
```

That's it! API running at http://localhost:8000

---

## 📝 First API Call

### 1. Register
```bash
curl -X POST http://localhost:8000/auth/register \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"test123"}'
```

### 2. Login
```bash
curl -X POST http://localhost:8000/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"test123"}'
```

Copy the `access_token` from response.

### 3. Create Event
```bash
curl -X POST http://localhost:8000/events \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"title":"My Event","date":"2026-12-31","city":"NYC","guest_count":50}'
```

---

## 🧪 Test the API

```bash
# Make sure server is running first
python test_api.py
```

---

## 📚 Documentation

- **API Docs**: http://localhost:8000/docs
- **Full Documentation**: See README.md
- **API Reference**: See API_DOCUMENTATION.md
- **Deployment**: See DEPLOYMENT.md
- **Integration**: See ../INTEGRATION_GUIDE.md

---

## 🔑 Key Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/auth/register` | Register user |
| POST | `/auth/login` | Login |
| GET | `/events` | List events |
| POST | `/events` | Create event |
| GET | `/events/{id}/guests` | List guests |
| POST | `/events/{id}/guests` | Add guest |
| GET | `/events/{id}/suppliers` | List suppliers |
| POST | `/events/{id}/suppliers` | Add supplier |
| GET | `/public/rsvp/{token}` | Public RSVP (no auth) |

---

## 🛠️ Common Commands

```bash
# Start server
python run.py

# Create migration
alembic revision --autogenerate -m "Description"

# Apply migrations
alembic upgrade head

# Rollback migration
alembic downgrade -1

# Run tests
python test_api.py

# Docker start
docker-compose up -d

# Docker stop
docker-compose down

# View logs
docker-compose logs -f backend
```

---

## ⚡ Special Features

### Auto-Generated Tasks
When you mark a supplier as `selected: true`, the system automatically:
- Creates a budget item
- Generates 4 checklist tasks with due dates

### RSVP Tokens
Each guest gets a unique token for public RSVP access without authentication.

### Event Scoping
All data is automatically scoped by event and user - no manual filtering needed!

---

## 🐛 Troubleshooting

**Can't connect to database?**
- Check PostgreSQL is running: `sudo service postgresql status`
- Verify DATABASE_URL in .env

**Import errors?**
- Activate venv: `source venv/bin/activate`
- Reinstall: `pip install -r requirements.txt`

**Migration errors?**
- Delete alembic/versions/*.py (keep .gitkeep)
- Run migrations again

**Port already in use?**
- Change port: `uvicorn app.main:app --port 8001`

---

## 💡 Tips

1. Use Swagger UI at `/docs` for interactive testing
2. All protected endpoints need `Authorization: Bearer <token>` header
3. Tokens expire after 30 minutes (configurable)
4. Use Docker for easiest setup
5. Check logs if something fails

---

## 🎯 Next Steps

1. ✅ Get API running
2. ✅ Test with Swagger UI
3. ✅ Create a test event
4. 📱 Integrate with frontend (see INTEGRATION_GUIDE.md)
5. 🚀 Deploy to production (see DEPLOYMENT.md)

---

## 📞 Need Help?

- Check README.md for detailed docs
- Review API_DOCUMENTATION.md for endpoint details
- Test with `python test_api.py`
- Use Swagger UI for interactive testing
