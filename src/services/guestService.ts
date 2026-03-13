import api from './api';

export type RsvpStatus = 'pending' | 'confirmed' | 'declined';

export interface Guest {
  id: number;
  event_id: number;
  name: string;
  phone: string | null;
  email: string | null;
  status: RsvpStatus;
  adults: number;
  children: number;
  notes: string | null;
  table_id: number | null;
  parent_guest_id: number | null;
  is_children_only: boolean;
}

export interface GuestCreate {
  name: string;
  phone?: string;
  email?: string;
  adults?: number;
  children?: number;
  notes?: string;
  table_id?: number;
  parent_guest_id?: number;
  is_children_only?: boolean;
}

export interface GuestUpdate {
  name?: string;
  phone?: string;
  email?: string;
  status?: RsvpStatus;
  adults?: number;
  children?: number;
  notes?: string;
  table_id?: number;
  parent_guest_id?: number;
  is_children_only?: boolean;
}

export const guestService = {
  async getGuests(eventId: number): Promise<Guest[]> {
    const response = await api.get(`/events/${eventId}/guests`);
    return response.data;
  },

  async createGuest(eventId: number, data: GuestCreate): Promise<Guest> {
    const response = await api.post(`/events/${eventId}/guests`, data);
    return response.data;
  },

  async updateGuest(guestId: number, data: GuestUpdate): Promise<Guest> {
    const response = await api.put(`/guests/${guestId}`, data);
    return response.data;
  },

  async deleteGuest(guestId: number): Promise<void> {
    await api.delete(`/guests/${guestId}`);
  },
};
