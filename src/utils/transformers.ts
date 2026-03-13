/**
 * Data transformation utilities for backend-frontend compatibility
 * 
 * Backend uses: snake_case, different field names
 * Frontend uses: camelCase, different field names
 */

// ==================== EVENT TRANSFORMS ====================

export interface BackendEvent {
  id: number;
  user_id: number;
  title: string;
  event_type?: string;
  date: string;
  city?: string;
  guest_count: number;
  created_at: string;
}

export interface FrontendEvent {
  id: string;
  type: string;
  eventName?: string;
  status: string;
  date: string;
  city: string;
  guestCount: number;
  vibe: string;
  services: string[];
  budget: number;
}

export function transformBackendEventToBackend(backendEvent: BackendEvent): BackendEvent {
  return backendEvent;
}

export function transformEventToBackend(frontendEvent: FrontendEvent): Partial<BackendEvent> {
  return {
    title: frontendEvent.type,
    event_type: frontendEvent.type,
    date: frontendEvent.date,
    city: frontendEvent.city,
    guest_count: frontendEvent.guestCount,
  };
}

// ==================== GUEST TRANSFORMS ====================

export interface BackendGuest {
  id: number;
  event_id: number;
  name: string;
  email?: string;
  phone?: string;
  status: 'pending' | 'confirmed' | 'declined';
  adults: number;
  children: number;
  notes?: string;
  table_id?: number;
  with_partner: boolean;
  with_children: boolean;
}

export interface FrontendGuest {
  id: string;
  name: string;
  email?: string;
  phone?: string;
  rsvpStatus: 'pending' | 'confirmed' | 'declined';
  adults: number;
  children: number;
  attendees?: number;
  notes?: string;
  tableId?: string;
  withPartner?: boolean;
  withChildren?: boolean;
}

export function transformGuestFromBackend(backendGuest: BackendGuest): FrontendGuest {
  return {
    id: String(backendGuest.id),
    name: backendGuest.name,
    email: backendGuest.email,
    phone: backendGuest.phone,
    rsvpStatus: backendGuest.status,
    adults: backendGuest.adults,
    children: backendGuest.children,
    notes: backendGuest.notes,
    tableId: backendGuest.table_id ? String(backendGuest.table_id) : undefined,
    withPartner: backendGuest.with_partner,
    withChildren: backendGuest.with_children,
  };
}

export function transformGuestToBackend(frontendGuest: FrontendGuest, eventId: number): Partial<BackendGuest> {
  return {
    name: frontendGuest.name,
    email: frontendGuest.email,
    phone: frontendGuest.phone,
    status: frontendGuest.rsvpStatus,
    adults: frontendGuest.adults,
    children: frontendGuest.children,
    notes: frontendGuest.notes,
    table_id: frontendGuest.tableId ? Number(frontendGuest.tableId) : undefined,
    with_partner: frontendGuest.withPartner || false,
    with_children: frontendGuest.withChildren || false,
  };
}

// ==================== BUDGET TRANSFORMS ====================

export interface BackendBudgetItem {
  id: number;
  event_id: number;
  supplier_id?: number;
  category: string;
  name: string;
  estimated_cost: number;
  actual_cost: number;
  payment_status: 'unpaid' | 'deposit' | 'paid';
}

export interface FrontendBudgetItem {
  id: string;
  supplierId?: string;
  category: string;
  name: string;
  estimatedPrice: number;
  realPrice: number;
  paymentStatus: 'unpaid' | 'deposit' | 'paid';
}

export function transformBudgetFromBackend(backendItem: BackendBudgetItem): FrontendBudgetItem {
  return {
    id: String(backendItem.id),
    supplierId: backendItem.supplier_id ? String(backendItem.supplier_id) : undefined,
    category: backendItem.category,
    name: backendItem.name,
    estimatedPrice: backendItem.estimated_cost,
    realPrice: backendItem.actual_cost,
    paymentStatus: backendItem.payment_status,
  };
}

export function transformBudgetToBackend(frontendItem: FrontendBudgetItem, eventId: number): Partial<BackendBudgetItem> {
  return {
    supplier_id: frontendItem.supplierId ? Number(frontendItem.supplierId) : undefined,
    category: frontendItem.category,
    name: frontendItem.name,
    estimated_cost: frontendItem.estimatedPrice,
    actual_cost: frontendItem.realPrice,
    payment_status: frontendItem.paymentStatus,
  };
}

// ==================== TABLE TRANSFORMS ====================

export interface BackendTable {
  id: number;
  event_id: number;
  name: string;
  total_seats: number;
  occupied_seats: number;
}

export interface FrontendTable {
  id: string;
  name: string;
  totalSeats: number;
  occupiedSeats: number;
}

export function transformTableFromBackend(backendTable: BackendTable): FrontendTable {
  return {
    id: String(backendTable.id),
    name: backendTable.name,
    totalSeats: backendTable.total_seats,
    occupiedSeats: backendTable.occupied_seats,
  };
}

export function transformTableToBackend(frontendTable: FrontendTable, eventId: number): Partial<BackendTable> {
  return {
    name: frontendTable.name,
    total_seats: frontendTable.totalSeats,
    occupied_seats: frontendTable.occupiedSeats,
  };
}

// ==================== CHECKLIST TRANSFORMS ====================

export interface BackendChecklistItem {
  id: number;
  event_id: number;
  task: string;
  category: string;
  completed: boolean;
  due_date?: string;
}

export interface FrontendChecklistItem {
  id: string;
  task: string;
  category: string;
  completed: boolean;
  dueDate?: string;
}

export function transformChecklistFromBackend(backendItem: BackendChecklistItem): FrontendChecklistItem {
  return {
    id: String(backendItem.id),
    task: backendItem.task,
    category: backendItem.category,
    completed: backendItem.completed,
    dueDate: backendItem.due_date,
  };
}

export function transformChecklistToBackend(frontendItem: FrontendChecklistItem, eventId: number): Partial<BackendChecklistItem> {
  return {
    task: frontendItem.task,
    category: frontendItem.category,
    completed: frontendItem.completed,
    due_date: frontendItem.dueDate,
  };
}

// ==================== SUPPLIER TRANSFORMS ====================

export interface BackendSupplier {
  id: number;
  event_id: number;
  name: string;
  category: string;
  contact: string;
  price: number;
  price_type: string;
  selected: boolean;
  location?: string;
  description?: string;
  rating?: number;
}

export interface FrontendSupplier {
  id: string;
  name: string;
  category: string;
  price: number;
  priceType: 'FIX_EVENT' | 'PER_INVITAT' | 'PER_ORA' | 'PER_UNITATE' | 'PACHET' | 'ESTIMATIV';
  unitLabel?: string;
  minUnits?: number;
  rating: number;
  contact: string;
  location: string;
  selected: boolean;
  description?: string;
  isCustom?: boolean;
}

export function transformSupplierFromBackend(backendSupplier: BackendSupplier): FrontendSupplier {
  return {
    id: String(backendSupplier.id),
    name: backendSupplier.name,
    category: backendSupplier.category,
    price: backendSupplier.price,
    priceType: backendSupplier.price_type as FrontendSupplier['priceType'],
    rating: backendSupplier.rating || 5,
    contact: backendSupplier.contact,
    location: backendSupplier.location || '',
    selected: backendSupplier.selected,
    description: backendSupplier.description,
  };
}

export function transformSupplierToBackend(frontendSupplier: FrontendSupplier, eventId: number): Partial<BackendSupplier> {
  return {
    name: frontendSupplier.name,
    category: frontendSupplier.category,
    price: frontendSupplier.price,
    price_type: frontendSupplier.priceType,
    contact: frontendSupplier.contact,
    location: frontendSupplier.location,
    selected: frontendSupplier.selected,
    description: frontendSupplier.description,
    rating: frontendSupplier.rating,
  };
}
