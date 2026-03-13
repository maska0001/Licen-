import api from './api';

export interface WizardEvent {
  id: number;
  user_id: number;
  title: string;
  event_type: string | null;
  date: string | null;
  city: string | null;
  guest_count: number;
  status: 'draft' | 'finalized' | 'archived';
  wizard_step: number;
  created_at: string;
}

export interface Step1Data {
  title: string;
  event_type?: string;
}

export interface Step2Data {
  planning_stage?: string;
}

export interface Step3Data {
  date?: string | null;
  date_mode?: string | null;
  event_month?: number | null;
  event_year?: number | null;
  time?: string | null;
}

export interface Step4Data {
  city: string;
  venue_city?: string;
  venue_name?: string;
  address?: string;
  venue_price_per_guest?: number | undefined;
  location_mode?: string;
}

export interface Step5Data {
  guest_count_estimated?: number;
  guest_count_min?: number;
  guest_count_max?: number;
  default_adults?: number;
  default_children?: number;
  has_budget?: boolean;
  budget_total_estimated?: number | undefined;
  budget_currency?: string;
}

export interface Step6Data {
  package_id?: string | undefined;
  enabled_modules?: string[];
  services?: string[];
}

export interface WizardSupplier {
  name: string;
  category: string;
  price: number;
  priceType?: string;
  contact?: string;
  selected: boolean;
}

export interface WizardBudgetItem {
  name: string;
  category: string;
  estimatedPrice: number;
  realPrice?: number;
  paymentStatus?: string;
}

export interface Step7Data {
  budget_items: WizardBudgetItem[];
}

export interface Step8Data {
  content_json?: Record<string, any>;
  published?: boolean;
}

export interface PackageItem {
  id: number;
  service_type: string;
  supplier_template_id?: number;
  estimated_cost: number;
  supplier_name_snapshot: string;
  supplier_rating_snapshot?: number;
  matrix_position?: string;
  pricing_model?: string;
  base_price_per_unit?: number;
}

export interface Package {
  id: number;
  event_id: number;
  name: string;
  total_estimated_cost: number;
  is_recommended: boolean;
  is_selected: boolean;
  generation_version: number;
  items: PackageItem[];
}

export const wizardService = {
  /**
   * PAS 1 - Creează eveniment draft
   * POST /wizard/events/start
   */
  async startWizard(data: Step1Data): Promise<WizardEvent> {
    const response = await api.post('/wizard/events/start', data);
    return response.data;
  },

  /**
   * PAS 1 - Actualizează tip + titlu
   * PATCH /wizard/events/:id/step/1
   */
  async updateStep1(eventId: number, data: Step1Data): Promise<WizardEvent> {
    const response = await api.patch(`/wizard/events/${eventId}/step/1`, data);
    return response.data;
  },

  /**
   * PAS 2 - Actualizează stadiu planificare
   * PATCH /wizard/events/:id/step/2
   */
  async updateStep2(eventId: number, data: Step2Data): Promise<WizardEvent> {
    const response = await api.patch(`/wizard/events/${eventId}/step/2`, data);
    return response.data;
  },

  /**
   * PAS 3 - Actualizează data
   * PATCH /wizard/events/:id/step/3
   */
  async updateStep3(eventId: number, data: Step3Data): Promise<WizardEvent> {
    const response = await api.patch(`/wizard/events/${eventId}/step/3`, data);
    return response.data;
  },

  /**
   * PAS 4 - Actualizează locația
   * PATCH /wizard/events/:id/step/4
   */
  async updateStep4(eventId: number, data: Step4Data): Promise<WizardEvent> {
    const response = await api.patch(`/wizard/events/${eventId}/step/4`, data);
    return response.data;
  },

  /**
   * PAS 5 - Actualizează numărul de invitați + buget
   * PATCH /wizard/events/:id/step/5
   */
  async updateStep5(eventId: number, data: Step5Data): Promise<WizardEvent> {
    const response = await api.patch(`/wizard/events/${eventId}/step/5`, data);
    return response.data;
  },

  /**
   * PAS 6 - Selectarea serviciilor
   * PATCH /wizard/events/:id/step/6
   */
  async updateStep6(eventId: number, data: Step6Data): Promise<WizardEvent> {
    const response = await api.patch(`/wizard/events/${eventId}/step/6`, data);
    return response.data;
  },

  /**
   * PAS 7 - Buget inițial
   * PATCH /wizard/events/:id/step/7
   */
  async updateStep7(eventId: number, data: Step7Data): Promise<WizardEvent> {
    const response = await api.patch(`/wizard/events/${eventId}/step/7`, data);
    return response.data;
  },

  /**
   * PAS 8 - Pachete / Finalizare
   * PATCH /wizard/events/:id/step/8
   */
  async updateStep8(eventId: number, data: Step8Data): Promise<{ event: WizardEvent; landing_page_id: number; message: string }> {
    const response = await api.patch(`/wizard/events/${eventId}/step/8`, data);
    return response.data;
  },

  /**
   * Finalizare wizard
   * POST /wizard/events/:id/finalize
   */
  async finalizeWizard(eventId: number): Promise<{ event: WizardEvent; message: string }> {
    const response = await api.post(`/wizard/events/${eventId}/finalize`);
    return response.data;
  },

  /**
   * Obține detaliile evenimentului draft
   * GET /wizard/events/:id
   */
  async getWizardEvent(eventId: number): Promise<WizardEvent> {
    const response = await api.get(`/wizard/events/${eventId}`);
    return response.data;
  },

  async generatePackages(eventId: number): Promise<Package[]> {
    const response = await api.post(`/wizard/events/${eventId}/generate-packages`);
    return response.data;
  },

  async listPackages(eventId: number): Promise<Package[]> {
    const response = await api.get(`/wizard/events/${eventId}/packages`);
    return response.data;
  },

  async selectPackage(eventId: number, packageId: number): Promise<WizardEvent> {
    const response = await api.post(`/wizard/events/${eventId}/select-package/${packageId}`);
    return response.data;
  },

  async selectManual(eventId: number): Promise<WizardEvent> {
    const response = await api.post(`/wizard/events/${eventId}/select-manual`);
    return response.data;
  },
};
