import api from './api';

export interface RegisterData {
  email: string;
  name: string;
  password: string;
}

export interface LoginData {
  email: string;
  password: string;
}

export interface User {
  id: number;
  email: string;
  name?: string;
  created_at: string;
}

export const authService = {
  /**
   * Register a new user
   * POST /auth/register
   * Body: { email: string, password: string }
   */
  async register(data: RegisterData): Promise<User> {
    const response = await api.post('/auth/register', data);
    return response.data;
  },

  /**
   * Login user and get access token
   * POST /auth/login
   * Body: { email: string, password: string }
   * Response: { access_token: string, token_type: string }
   */
  async login(data: LoginData): Promise<{ access_token: string; user: User }> {
    const response = await api.post('/auth/login', data);
    const { access_token } = response.data;

    // Store token immediately
    localStorage.setItem('token', access_token);

    // Get user info using the token
    const user = await this.getCurrentUser();
    
    return { access_token, user };
  },

  /**
   * Get current authenticated user
   * GET /auth/me
   * Headers: Authorization: Bearer <token>
   */
  async getCurrentUser(): Promise<User> {
    const response = await api.get('/auth/me');
    return response.data;
  },

  logout() {
    localStorage.removeItem('token');
    window.dispatchEvent(new Event('auth:logout'));
  },

  isAuthenticated(): boolean {
    return !!localStorage.getItem('token');
  },

  getToken(): string | null {
    return localStorage.getItem('token');
  },
};
