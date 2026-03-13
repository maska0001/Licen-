import api from './api';

export interface LandingPage {
  id: number;
  event_id: number;
  content_json: string | null;
  published: boolean;
}

export interface LandingPageUpdate {
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
};
