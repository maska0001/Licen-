import api from './api';

export interface Supplier {
  id: number;
  event_id: number;
  name: string;
  category: string;
  contact?: string;
  location?: string;
  price: number;
  price_type: string;
  rating: number;
  selected: boolean;
  is_custom: boolean;
}

export interface SupplierCreate {
  name: string;
  category: string;
  contact?: string;
  location?: string;
  price?: number;
  price_type?: string;
  rating?: number;
  selected?: boolean;
  is_custom?: boolean;
}

export interface SupplierUpdate {
  name?: string;
  category?: string;
  contact?: string;
  location?: string;
  price?: number;
  price_type?: string;
  rating?: number;
  selected?: boolean;
  is_custom?: boolean;
}

export const supplierService = {
  async getSuppliers(eventId: number): Promise<Supplier[]> {
    const response = await api.get(`/suppliers/events/${eventId}`);
    return response.data;
  },

  async getSupplierTemplates(): Promise<Supplier[]> {
    const response = await api.get('/suppliers/templates');
    return response.data;
  },

  async createSupplier(eventId: number, data: SupplierCreate): Promise<Supplier> {
    const response = await api.post(`/suppliers/events/${eventId}`, data);
    return response.data;
  },

  async updateSupplier(supplierId: number, data: SupplierUpdate): Promise<Supplier> {
    const response = await api.put(`/suppliers/${supplierId}`, data);
    return response.data;
  },

  async deleteSupplier(supplierId: number): Promise<void> {
    await api.delete(`/suppliers/${supplierId}`);
  },
};
