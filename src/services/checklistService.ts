import api from './api';

export interface ChecklistItem {
  id: number;
  event_id: number;
  task: string;
  category: string | null;
  completed: boolean;
  due_date: string | null;
  supplier_id?: number | null;
}

export interface ChecklistItemCreate {
  task: string;
  category?: string;
  completed?: boolean;
  due_date?: string;
  supplier_id?: number;
}

export interface ChecklistItemUpdate {
  task?: string;
  category?: string;
  completed?: boolean;
  due_date?: string;
  supplier_id?: number;
}

export const checklistService = {
  async getChecklistItems(eventId: number): Promise<ChecklistItem[]> {
    const response = await api.get(`/events/${eventId}/checklist`);
    return response.data;
  },

  async createChecklistItem(eventId: number, data: ChecklistItemCreate): Promise<ChecklistItem> {
    const response = await api.post(`/events/${eventId}/checklist`, data);
    return response.data;
  },

  async updateChecklistItem(checklistId: number, data: ChecklistItemUpdate): Promise<ChecklistItem> {
    const response = await api.put(`/checklist/${checklistId}`, data);
    return response.data;
  },

  async deleteChecklistItem(checklistId: number): Promise<void> {
    await api.delete(`/checklist/${checklistId}`);
  },
};
