# Instrucțiuni - Populare Furnizori

## Problema

Pachetele nu se generează corect pentru că nu există furnizori în baza de date. Sistemul caută în tabelele `supplier_templates` și `supplier_template_event_pricing` pentru a genera pachete, dar aceste tabele sunt goale.

## Soluția

Am creat un script de seed (`backend/seed_suppliers.py`) care populează baza de date cu furnizori de test.

## Cum să Rulezi Scriptul

### 1. Oprește Backend-ul (dacă rulează)

Apasă `Ctrl+C` în terminal-ul unde rulează backend-ul.

### 2. Rulează Scriptul de Seed

```bash
cd backend
python seed_suppliers.py
```

### 3. Verifică Output-ul

Ar trebui să vezi ceva similar cu:
```
============================================================
SEED SUPPLIERS - Populare bază de date cu furnizori
============================================================

✓ Adăugat: DJ Alex Pro (Muzică / DJ)
✓ Adăugat: DJ Sound Master (Muzică / DJ)
✓ Adăugat: DJ Party Mix (Muzică / DJ)
✓ Adăugat: MC Cristina Events (MC / Moderator)
...
✓ Adăugat: Vila Roz (Restaurant)

✅ Succes! Au fost adăugați 15 furnizori în baza de date.

Acum poți genera pachete în wizard!
```

### 4. Repornește Backend-ul

```bash
python run.py
```

## Ce Furnizori Sunt Adăugați?

Scriptul adaugă 15 furnizori în 5 categorii:

### 1. Muzică / DJ (3 furnizori)
- **DJ Alex Pro** - 8,000 MDL (wedding), Rating: 4.8
- **DJ Sound Master** - 12,000 MDL (wedding), Rating: 4.5
- **DJ Party Mix** - 5,000 MDL (wedding), Rating: 4.2

### 2. MC / Moderator (3 furnizori)
- **MC Cristina Events** - 6,000 MDL (wedding), Rating: 4.9
- **MC Victor Show** - 9,000 MDL (wedding), Rating: 4.7
- **MC Ana Style** - 4,000 MDL (wedding), Rating: 4.3

### 3. Fotografie (3 furnizori)
- **Photo Studio Premium** - 15,000 MDL (wedding), Rating: 4.9
- **Moments Photography** - 10,000 MDL (wedding), Rating: 4.6
- **Click Photo** - 6,000 MDL (wedding), Rating: 4.2

### 4. Videografie (3 furnizori)
- **Cinema Wedding Films** - 18,000 MDL (wedding), Rating: 4.9
- **Video Pro Events** - 12,000 MDL (wedding), Rating: 4.5
- **Quick Video** - 7,000 MDL (wedding), Rating: 4.0

### 5. Restaurant (3 furnizori)
- **Restaurant Belvedere** - 450 MDL/persoană (wedding), Rating: 4.9
- **Nobil Event Hall** - 520 MDL/persoană (wedding), Rating: 4.7
- **Vila Roz** - 380 MDL/persoană (wedding), Rating: 4.4

### 6. Decor eveniment (3 furnizori)
- **Elegant Decor Studio** - 25,000 MDL (wedding), Rating: 4.8
- **Dream Decorations** - 18,000 MDL (wedding), Rating: 4.5
- **Simple Decor** - 10,000 MDL (wedding), Rating: 4.1

## Cum Funcționează Generarea Pachetelor

După ce rulezi scriptul, când generezi pachete în wizard:

1. **Step 6**: Selectezi serviciile dorite (ex: DJ, Fotografie, Restaurant)
2. **Step 8**: Click "Generează pachete"
3. Sistemul creează 3 pachete:
   - **Package 1 (Low)**: Cele mai ieftine opțiuni
   - **Package 2 (Middle)**: Opțiuni medii (recomandat)
   - **Package 3 (High)**: Cele mai scumpe opțiuni

### Exemplu de Pachete Generate

Dacă selectezi: DJ, Fotografie, Restaurant (100 invitați)

**Package 1 (Low):**
- DJ Party Mix: 5,000 MDL
- Click Photo: 6,000 MDL
- Vila Roz: 38,000 MDL (380 × 100)
- **Total: 49,000 MDL**

**Package 2 (Middle):**
- DJ Alex Pro: 8,000 MDL
- Moments Photography: 10,000 MDL
- Restaurant Belvedere: 45,000 MDL (450 × 100)
- **Total: 63,000 MDL**

**Package 3 (High):**
- DJ Sound Master: 12,000 MDL
- Photo Studio Premium: 15,000 MDL
- Nobil Event Hall: 52,000 MDL (520 × 100)
- **Total: 79,000 MDL**

## După Selectarea Pachetului

Când selectezi un pachet (ex: Package 2):

1. **Suppliers Tab**: Vei vedea furnizorii din pachet:
   - DJ Alex Pro (8,000 MDL)
   - Moments Photography (10,000 MDL)
   - Restaurant Belvedere (45,000 MDL)

2. **Budget Tab**: Vei vedea item-urile de buget:
   - DJ Alex Pro - 8,000 MDL (Estimated: 8,000, Actual: 8,000)
   - Moments Photography - 10,000 MDL
   - Restaurant Belvedere - 45,000 MDL
   - **Total: 63,000 MDL**

3. **Checklist Tab**: Vei vedea task-uri generate automat:
   - Contact DJ Alex Pro (Muzică / DJ)
   - Contact Moments Photography (Fotografie)
   - Contact Restaurant Belvedere (Restaurant)

4. **Dashboard**: Vei vedea statistici actualizate:
   - Buget total: 63,000 MDL
   - Furnizori selectați: 3
   - Sarcini: 3

## Adăugarea Mai Multor Furnizori

Dacă vrei să adaugi mai mulți furnizori, editează `backend/seed_suppliers.py` și adaugă noi intrări în lista `suppliers_data`.

### Template pentru Furnizor Nou

```python
{
    "name": "Nume Furnizor",
    "service_type": "Categorie Serviciu",  # Trebuie să corespundă cu serviciile din wizard
    "description": "Descriere furnizor",
    "phone": "+373 69 XXX XXX",
    "email": "email@furnizor.md",
    "rating": 4.5,  # Rating între 0 și 5
    "prices": [
        {"event_type": "wedding", "base_price": 10000},
        {"event_type": "birthday", "base_price": 8000},
        {"event_type": "corporate", "base_price": 12000},
        {"event_type": "default", "base_price": 9000},
    ]
},
```

### Categorii de Servicii Disponibile

Asigură-te că `service_type` corespunde exact cu serviciile din wizard:
- "Muzică / DJ"
- "Formație live"
- "MC / Moderator"
- "Animatori (copii / adulți)"
- "Dansatori / show artistic"
- "Fotografie"
- "Videografie"
- "Dronă"
- "Photo Booth"
- "Decor eveniment (general)"
- "Decor floral"
- "Aranjamente mese"
- "Restaurant"
- "Catering"
- "Candy bar"
- "Tort"
- "Sonorizare"
- "Lumini"
- "Makeup"
- "Hairstyling"
- "Transport invitați"
- "Organizator eveniment"
- "Wedding planner"
- "Invitații digitale"
- "Invitații tipărite"

## Verificare în Baza de Date

Pentru a verifica că furnizorii au fost adăugați:

```bash
# Windows PowerShell
sqlite3 backend/app.db "SELECT name, service_type, rating FROM supplier_templates;"

# Sau
sqlite3 backend/app.db "SELECT COUNT(*) FROM supplier_templates;"
```

## Troubleshooting

### Eroare: "No module named 'app'"

Asigură-te că rulezi scriptul din directorul `backend`:
```bash
cd backend
python seed_suppliers.py
```

### Eroare: "No service categories selected"

Asigură-te că ai selectat servicii la Step 6 înainte de a genera pachete.

### Pachetele sunt goale

Verifică că `service_type` din furnizori corespunde exact cu serviciile selectate în wizard.

## Status

✅ Script creat și gata de rulare
⏳ Așteaptă rularea scriptului pentru a popula baza de date

---

**Data:** 2026-03-12
**Autor:** Kiro AI Assistant
