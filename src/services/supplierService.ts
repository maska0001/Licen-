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

export interface SupplierTemplateOption {
  id: string;
  name: string;
  category: string;
  contact?: string;
  location?: string;
  price: number;
  priceType: string;
  rating: number;
  selected: boolean;
  isCustom: boolean;
}

export interface ServiceCategoryOption {
  name: string;
  services: string[];
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

  async getSupplierTemplates(filters?: {
    serviceType?: string;
    eventType?: string;
  }): Promise<SupplierTemplateOption[]> {
    const response = await api.get('/suppliers/templates', {
      params: {
        service_type: filters?.serviceType,
        event_type: filters?.eventType,
      },
    });
    return response.data;
  },

  async getServiceCategories(): Promise<ServiceCategoryOption[]> {
    const response = await api.get('/suppliers/service-categories');
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
