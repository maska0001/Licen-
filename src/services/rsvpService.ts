import axios from 'axios';

const API_BASE_URL = 'http://localhost:8000';

// Public API (no authentication required)
const publicApi = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export interface RsvpInfo {
  guest: {
    id: number;
    name: string;
    status: string;
    adults: number;
    children: number;
    notes: string | null;
  };
  event: {
    id: number;
    title: string;
    date: string;
    city: string | null;
  };
  landing_page: {
    content_json: string | null;
    published: boolean;
  };
}

export interface RsvpUpdate {
  status: 'pending' | 'confirmed' | 'declined';
  adults?: number;
  children?: number;
  notes?: string;
}

export const rsvpService = {
  async getRsvpInfo(token: string): Promise<RsvpInfo> {
    const response = await publicApi.get(`/public/rsvp/${token}`);
    return response.data;
  },

  async submitRsvp(token: string, data: RsvpUpdate): Promise<any> {
    const response = await publicApi.post(`/public/rsvp/${token}`, data);
    return response.data;
  },
};
