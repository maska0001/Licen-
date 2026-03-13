# 📋 Changelog

Toate modificările notabile ale proiectului sunt documentate în acest fișier.

## [1.0.0] - 2024-01-XX

### ✨ Adăugat

#### Wizard Creare Evenimente
- Wizard complet în 8 pași pentru crearea evenimentelor
- Generare automată de pachete la pasul 8
- Selectare inteligentă a serviciilor
- Calcul automat al bugetului

#### Sistem Pachete
- 3 niveluri de pachete: Economic, Standard, Premium
- Excludere automată a furnizorilor deja selectați
- Afișare detaliată a prețurilor (per persoană/fix)
- Marcare clară a furnizorilor deja selectați

#### Gestionare Furnizori
- Bază de date cu 27 furnizori
- 9 categorii de servicii
- Suport pentru prețuri per persoană și fixe
- Rating și descrieri detaliate

#### Management Buget
- Tracking cheltuieli în timp real
- Categorii personalizabile
- Status plăți (plătit/neplătit/parțial)
- Comparație buget estimat vs real

#### Checklist Automat
- Generare automată task-uri pentru fiecare furnizor
- Deadline-uri calculate inteligent
- Organizare pe categorii
- Progress tracking

#### Gestionare Invitați
- Import/Export CSV
- Organizare pe mese
- Tracking RSVP
- Categorii (adulți/copii)

### 🔧 Îmbunătățit

#### Wizard
- Afișare corectă a prețurilor în pachete
- Eliminare furnizori duplicați
- Generare automată pachete (fără buton manual)
- Creare automată supplier pentru restaurant la alegerea venue-ului

#### Backend
- Optimizare query-uri bază de date
- Validare îmbunătățită date
- Logging detaliat pentru debugging
- Gestionare erori mai bună

#### Frontend
- Design modern și intuitiv
- Responsive pe toate device-urile
- Animații fluide
- Feedback vizual îmbunătățit

### 🐛 Rezolvat

- Prețurile nu se afișau corect în pachete
- Furnizori duplicați pentru același serviciu
- Butonul de generare pachete era necesar manual
- Lipsă validare date în wizard
- Erori la ștergerea furnizorilor
- Probleme cu calculul bugetului

### 📚 Documentație

- README.md complet cu instrucțiuni instalare
- GIT_UPLOAD_INSTRUCTIONS.md pentru upload GitHub
- PACHETE_WIZARD_IMPROVEMENTS.md cu detalii tehnice
- Comentarii în cod pentru funcții complexe

### 🔒 Securitate

- Variabile de mediu pentru date sensibile
- Validare input pe backend
- Protecție împotriva SQL injection
- CORS configurat corect

## [0.9.0] - 2024-01-XX (Beta)

### Adăugat
- Structură inițială proiect
- Autentificare utilizatori
- CRUD evenimente de bază
- Dashboard simplu

---

## Tipuri de Modificări

- **Adăugat** - pentru funcționalități noi
- **Îmbunătățit** - pentru modificări în funcționalități existente
- **Depreciat** - pentru funcționalități care vor fi eliminate
- **Eliminat** - pentru funcționalități eliminate
- **Rezolvat** - pentru bug fixes
- **Securitate** - pentru vulnerabilități rezolvate
