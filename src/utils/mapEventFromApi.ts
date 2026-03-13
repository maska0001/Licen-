import { Event as ApiEvent } from '../services/eventService';

// Frontend Event shape used in App.tsx
export interface FrontendEvent {
  id: string;
  type: string;
  status: string;
  date: string;
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
  city: event.city,
  guestCount: event.guest_count ?? 0,
  vibe: '',
  services: [],
  budget: 0,
  eventName: event.title,
});
