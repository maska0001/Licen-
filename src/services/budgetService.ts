import api from './api';

export type PaymentStatus = 'unpaid' | 'deposit' | 'paid';

export interface BudgetItem {
  id: number;
  event_id: number;
  supplier_id?: number;
  category: string;
  name: string;
  estimated_cost: number;
  actual_cost: number;
  payment_status: PaymentStatus;
  created_at?: string;
  updated_at?: string;
}

export interface BudgetItemCreate {
  name: string;
  category?: string;
  supplier_id?: number;
  estimated_cost?: number;
  actual_cost?: number;
  payment_status?: PaymentStatus;
}

export interface BudgetItemUpdate {
  name?: string;
  category?: string;
  supplier_id?: number;
  estimated_cost?: number;
  actual_cost?: number;
  payment_status?: PaymentStatus;
}

export const budgetService = {
  async getBudgetItems(eventId: number): Promise<BudgetItem[]> {
    const response = await api.get(`/events/${eventId}/budget`);
    return response.data;
  },

  async createBudgetItem(eventId: number, data: BudgetItemCreate): Promise<BudgetItem> {
    const response = await api.post(`/events/${eventId}/budget`, data);
    return response.data;
  },

  async updateBudgetItem(budgetId: number, data: BudgetItemUpdate): Promise<BudgetItem> {
    const response = await api.put(`/budget/${budgetId}`, data);
    return response.data;
  },

  async deleteBudgetItem(budgetId: number): Promise<void> {
    await api.delete(`/budget/${budgetId}`);
  },
};
