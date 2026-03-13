# Structura Wizard - Event Planning

## Pașii Wizard-ului (1-8)

### Step 1: Tip Eveniment + Titlu
**Date salvate:** `title`, `event_type`

### Step 2: Stadiu Planificare
**Date salvate:** `planning_stage`

### Step 3: Data Evenimentului
**Date salvate:** `date`, `date_mode`, `event_month`, `event_year`, `time`

### Step 4: Locația
**Date salvate:** `city`, `venue_city`, `venue_name`, `venue_address`, `venue_price_per_guest`, `location_mode`

### Step 5: Număr Invitați
**Date salvate:** `guest_count_estimated`, `guest_count_min`, `guest_count_max`, `default_adults`, `default_children`

### Step 6: Servicii Dorite
**Date salvate:** `services[]` → salvat în `EventServicePreference`

**Notă:** Aceste servicii vor fi folosite pentru generarea pachetelor la Step 8.

### Step 7: Buget Estimat (Opțional)
**Date salvate:** `has_budget`, `budget_total_estimated`, `budget_currency`

**Notă:** Bugetul este opțional. Utilizatorul poate selecta "Nu am un buget încă".

### Step 8: Pachete / Finalizare
**Funcționalități:**
- `generatePackages()` - Generează 3 pachete (Low/Middle/High) bazate pe serviciile selectate
- `selectPackage(packageId)` - Selectează un pachet și creează automat:
  - Suppliers (furnizorii din pachet)
  - Budget Items (item-uri de buget cu prețuri concrete)
  - Checklist Items (task-uri automate cu deadline-uri)
- `selectManual()` - Permite utilizatorului să continue fără pachet

---

## Fluxul de Date

```
Step 1 → event_type, title
Step 2 → planning_stage
Step 3 → date, date_mode, event_month, event_year
Step 4 → city, venue_name, venue_price_per_guest, location_mode
Step 5 → guest_count
Step 6 → services[] → EventServicePreference
Step 7 → has_budget, budget_total_estimated
Step 8 → Generare pachete → Suppliers + BudgetItems + Checklist
```

---

## Sincronizare cu Dashboard

După finalizarea wizard-ului:

**Event Details Card:**
- Afișează: `event_type`, `city`, `date`, `guest_count`

**Budget Tab:**
- Înainte de Step 8: Afișează `budget_total_estimated` (dacă există)
- După Step 8: Afișează suma din `budget_items` (buget real din furnizori)

**Suppliers Tab:**
- Afișează furnizorii din pachetul selectat

**Checklist Tab:**
- Afișează task-uri generate automat pentru fiecare furnizor
- Deadline-uri relative la data evenimentului

---

## Exemplu Complet

### Date Introduse:
- Step 1: Nuntă
- Step 2: Avem o dată stabilită
- Step 3: 15 Iunie 2026
- Step 4: Restaurant Belvedere
- Step 5: 100-150 invitați (125 estimat)
- Step 6: DJ, Fotografie, Restaurant
- Step 7: 500,000 MDL (estimat)
- Step 8: Selectat Package 2

### Rezultat în Dashboard:

**Event Details:**
- Tip: Nuntă
- Locație: Restaurant Belvedere
- Dată: 15 iunie 2026
- Invitați: 125

**Budget:**
- DJ Alex Pro: 8,000 MDL
- Moments Photography: 10,000 MDL
- Restaurant Belvedere: 56,250 MDL (450 × 125)
- **Total: 74,250 MDL**

**Suppliers:**
- DJ Alex Pro (Muzică / DJ)
- Moments Photography (Fotografie)
- Restaurant Belvedere (Restaurant)

**Checklist:**
- Contact DJ Alex Pro
- Contact Moments Photography
- Contact Restaurant Belvedere

---

**Ultima actualizare:** 2026-03-12
