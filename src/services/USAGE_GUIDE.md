# API Services Usage Guide

## 🎯 Overview

Toate serviciile API sunt gata de utilizare! Înlocuiește apelurile localStorage cu aceste servicii.

## 📚 Import Services

```typescript
import { 
  authService, 
  eventService, 
  guestService,
  supplierService,
  budgetService,
  tableService,
  checklistService,
  landingService,
  rsvpService 
} from './services';
```

## 🔐 Authentication

### Register
```typescript
try {
  const user = await authService.register({
    email: 'user@example.com',
    password: 'password123'
  });
  console.log('User registered:', user);
} catch (error) {
  console.error('Registration failed:', error);
}
```

### Login
```typescript
try {
  const token = await authService.login({
    email: 'user@example.com',
    password: 'password123'
  });
  // Token is automatically stored in localStorage
  console.log('Logged in successfully');
} catch (error) {
  console.error('Login failed:', error);
}
```

### Logout
```typescript
authService.logout(); // Clears token and redirects to login
```

### Check Authentication
```typescript
if (authService.isAuthenticated()) {
  // User is logged in
}
```

## 📅 Events

### Get All Events
```typescript
const events = await eventService.getEvents();
```

### Create Event
```typescript
const newEvent = await eventService.createEvent({
  title: 'My Wedding',
  date: '2026-06-15',
  city: 'New York',
  guest_count: 100
});
```

### Update Event
```typescript
const updated = await eventService.updateEvent(eventId, {
  title: 'Updated Title',
  guest_count: 150
});
```

### Delete Event
```typescript
await eventService.deleteEvent(eventId);
```

## 👥 Guests

### Get Guests for Event
```typescript
const guests = await guestService.getGuests(eventId);
```

### Add Guest
```typescript
const newGuest = await guestService.createGuest(eventId, {
  name: 'John Doe',
  email: 'john@example.com',
  adults: 2,
  children: 1
});
```

### Update Guest
```typescript
const updated = await guestService.updateGuest(guestId, {
  status: 'confirmed',
  adults: 3
});
```

### Delete Guest
```typescript
await guestService.deleteGuest(guestId);
```

## 🏢 Suppliers

### Get Suppliers
```typescript
const suppliers = await supplierService.getSuppliers(eventId);
```

### Add Supplier
```typescript
const newSupplier = await supplierService.createSupplier(eventId, {
  name: 'Elegant Catering',
  category: 'Catering',
  price: 5000,
  selected: true // Auto-creates budget item and checklist tasks!
});
```

### Update Supplier
```typescript
const updated = await supplierService.updateSupplier(supplierId, {
  selected: true // This will auto-generate budget and tasks
});
```

## 💰 Budget

### Get Budget Items
```typescript
const budgetItems = await budgetService.getBudgetItems(eventId);
```

### Add Budget Item
```typescript
const newItem = await budgetService.createBudgetItem(eventId, {
  name: 'Venue Rental',
  estimated_cost: 3000,
  payment_status: 'pending'
});
```

### Update Budget Item
```typescript
const updated = await budgetService.updateBudgetItem(budgetId, {
  actual_cost: 2900,
  payment_status: 'paid'
});
```

## 🪑 Tables

### Get Tables
```typescript
const tables = await tableService.getTables(eventId);
```

### Create Table
```typescript
const newTable = await tableService.createTable(eventId, {
  name: 'Table 1',
  capacity: 8
});
```

### Assign Guest to Table
```typescript
await guestService.updateGuest(guestId, {
  table_id: tableId
});
```

## ✅ Checklist

### Get Checklist Items
```typescript
const items = await checklistService.getChecklistItems(eventId);
```

### Add Task
```typescript
const newTask = await checklistService.createChecklistItem(eventId, {
  task: 'Send invitations',
  due_date: '2026-04-01',
  completed: false
});
```

### Mark as Complete
```typescript
await checklistService.updateChecklistItem(checklistId, {
  completed: true
});
```

## 🎨 Landing Page

### Get Landing Page
```typescript
const landingPage = await landingService.getLandingPage(eventId);
```

### Update Content
```typescript
const updated = await landingService.updateLandingPage(eventId, {
  content_json: JSON.stringify({ title: 'Welcome', description: 'Join us!' })
});
```

### Publish
```typescript
await landingService.publishLandingPage(eventId);
```

## 🔓 Public RSVP (No Authentication)

### Get RSVP Info
```typescript
const info = await rsvpService.getRsvpInfo(token);
console.log(info.guest, info.event, info.landing_page);
```

### Submit RSVP
```typescript
await rsvpService.submitRsvp(token, {
  status: 'confirmed',
  adults: 2,
  children: 1,
  notes: 'Looking forward to it!'
});
```

## 🎯 Example: Complete Component Integration

### Before (localStorage):
```typescript
const events = JSON.parse(localStorage.getItem('events') || '[]');
```

### After (API):
```typescript
import { useState, useEffect } from 'react';
import { eventService } from './services';

function EventList() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        setLoading(true);
        const data = await eventService.getEvents();
        setEvents(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      {events.map(event => (
        <div key={event.id}>{event.title}</div>
      ))}
    </div>
  );
}
```

## 🚨 Error Handling

Toate serviciile aruncă erori care pot fi prinse:

```typescript
try {
  await eventService.createEvent(data);
} catch (error) {
  if (error.response?.status === 401) {
    // Not authenticated
  } else if (error.response?.status === 403) {
    // Not authorized
  } else if (error.response?.status === 404) {
    // Not found
  } else {
    // Other error
    console.error(error.response?.data?.detail || error.message);
  }
}
```

## 🔄 Auto-Refresh Token

Token-ul este adăugat automat la toate request-urile. Dacă expiră (401), utilizatorul este redirecționat automat la login.

## 🎉 Next Steps

1. Înlocuiește localStorage în componentele tale
2. Adaugă loading states
3. Adaugă error handling
4. Testează fiecare funcționalitate
5. Deploy!
