import api from './api';

export interface LandingPage {
  id: number;
  event_id: number;
  title: string | null;
  description: string | null;
  date: string | null;
  location: string | null;
  cover_image: string | null;
  message: string | null;
  dress_code: string | null;
  content_json: string | null;
  published: boolean;
  public_slug: string | null;
}

export interface LandingPageUpdate {
  title?: string;
  description?: string;
  date?: string;
  location?: string;
  cover_image?: string;
  message?: string;
  dress_code?: string;
  public_slug?: string;
  content_json?: string;
  published?: boolean;
}

export const landingService = {
  async getLandingPage(eventId: number): Promise<LandingPage> {
    const response = await api.get(`/events/${eventId}/landing`);
    return response.data;
  },

  async updateLandingPage(eventId: number, data: LandingPageUpdate): Promise<LandingPage> {
    const response = await api.put(`/events/${eventId}/landing`, data);
    return response.data;
  },

  async publishLandingPage(eventId: number): Promise<LandingPage> {
    const response = await api.post(`/events/${eventId}/landing/publish`);
    return response.data;
  },

  async uploadImage(eventId: number, file: File): Promise<{ url: string }> {
    const formData = new FormData();
    formData.append('file', file);
    const response = await api.post(`/events/${eventId}/landing/upload-image`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },
};
