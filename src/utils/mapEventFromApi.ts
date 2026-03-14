import { Event as ApiEvent } from '../services/eventService';

// Frontend Event shape used in App.tsx
export interface FrontendEvent {
  id: string;
  type: string;
  status: string;
  date: string | null;
  dateMode?: string | null;
  eventMonth?: number | null;
  eventYear?: number | null;
  city: string | null;
  guestCount: number;
  vibe: string;
  services: string[];
  budget: number;
  eventName?: string;
  customImage?: string;
}

export const mapEventFromApi = (event: ApiEvent): FrontendEvent => ({
  id: event.id.toString(),
  type: event.event_type || event.title,
  status: 'planning',
  date: event.date,
  dateMode: event.date_mode,
  eventMonth: event.event_month,
  eventYear: event.event_year,
  city: event.city,
  guestCount: event.guest_count ?? 0,
  vibe: '',
  services: [],
  budget: 0,
  eventName: event.title,
});
