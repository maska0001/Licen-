import api from './api';

export interface Event {
  id: number;
  user_id: number;
  title: string;
  event_type?: string | null;
  date: string | null;
  date_mode?: string | null;
  event_month?: number | null;
  event_year?: number | null;
  city: string | null;
  guest_count: number;
  budget_total_estimated?: number | null;
  has_budget?: boolean;
  created_at: string;
}

export interface EventCreate {
  title: string;
  event_type?: string;
  date: string;
  city?: string;
  guest_count?: number;
}

export interface EventUpdate {
  title?: string;
  event_type?: string;
  date?: string;
  city?: string;
  guest_count?: number;
}

export const eventService = {
  async getEvents(): Promise<Event[]> {
    const response = await api.get('/events');
    return response.data;
  },

  async getEvent(id: number): Promise<Event> {
    const response = await api.get(`/events/${id}`);
    return response.data;
  },

  async createEvent(data: EventCreate): Promise<Event> {
    const response = await api.post('/events', data);
    return response.data;
  },

  async updateEvent(id: number, data: EventUpdate): Promise<Event> {
    const response = await api.put(`/events/${id}`, data);
    return response.data;
  },

  async deleteEvent(id: number): Promise<void> {
    await api.delete(`/events/${id}`);
  },
};
