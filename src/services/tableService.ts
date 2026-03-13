import api from './api';

export interface Table {
  id: number;
  event_id: number;
  name: string;
  total_seats: number;
  occupied_seats: number;
}

export interface TableCreate {
  name: string;
  total_seats?: number;
}

export interface TableUpdate {
  name?: string;
  total_seats?: number;
  occupied_seats?: number;
}

export const tableService = {
  async getTables(eventId: number): Promise<Table[]> {
    const response = await api.get(`/events/${eventId}/tables`);
    return response.data;
  },

  async createTable(eventId: number, data: TableCreate): Promise<Table> {
    const response = await api.post(`/events/${eventId}/tables`, data);
    return response.data;
  },

  async updateTable(tableId: number, data: TableUpdate): Promise<Table> {
    const response = await api.put(`/tables/${tableId}`, data);
    return response.data;
  },

  async deleteTable(tableId: number): Promise<void> {
    await api.delete(`/tables/${tableId}`);
  },

  async assignGuest(tableId: number, guestId: number): Promise<Table> {
    const response = await api.post(`/tables/${tableId}/assign/${guestId}`);
    return response.data;
  },

  async unassignGuest(tableId: number, guestId: number): Promise<Table> {
    const response = await api.post(`/tables/${tableId}/unassign/${guestId}`);
    return response.data;
  },
};
