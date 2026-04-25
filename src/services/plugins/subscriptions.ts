/**
 * Subscriptions & Finance Plugin API (tls-subscriptions-finance)
 * Handles billing, subscriptions, invoices, and payment management
 */

import { restClient } from '../restClient';

interface Subscription {
  id: number;
  user_id: number;
  plan_id: number;
  status: 'active' | 'paused' | 'cancelled' | 'expired';
  current_period_start: string;
  current_period_end: string;
  cancel_at?: string;
  auto_renew: boolean;
}

interface Plan {
  id: number;
  name: string;
  description: string;
  price: number;
  currency: string;
  billing_interval: 'monthly' | 'yearly' | 'one-time';
  features: string[];
  trial_days?: number;
}

interface Invoice {
  id: number;
  invoice_number: string;
  subscription_id: number;
  amount: number;
  currency: string;
  status: 'draft' | 'sent' | 'paid' | 'failed' | 'refunded';
  issued_date: string;
  due_date: string;
  pdf_url?: string;
}

interface PaymentMethod {
  id: number;
  type: 'credit_card' | 'bank_account' | 'paypal';
  last_four: string;
  expiry?: string;
  is_default: boolean;
}

export const subscriptionsAPI = {
  /**
   * Get available plans
   */
  getPlans: async (): Promise<Plan[]> => {
    return restClient.get('/tls/v1/subscriptions/plans');
  },

  /**
   * Get single plan
   */
  getPlan: async (planId: number): Promise<Plan> => {
    return restClient.get(`/tls/v1/subscriptions/plans/${planId}`);
  },

  /**
   * Get user subscription
   */
  getSubscription: async (): Promise<Subscription> => {
    return restClient.get('/tls/v1/subscriptions/current');
  },

  /**
   * Create/upgrade subscription
   */
  createSubscription: async (planId: number, paymentMethodId?: number): Promise<Subscription> => {
    return restClient.post('/tls/v1/subscriptions', { plan_id: planId, payment_method_id: paymentMethodId });
  },

  /**
   * Update subscription
   */
  updateSubscription: async (data: Partial<Subscription>): Promise<Subscription> => {
    return restClient.put('/tls/v1/subscriptions/current', data);
  },

  /**
   * Cancel subscription
   */
  cancelSubscription: async (cancelAt?: string): Promise<Subscription> => {
    return restClient.post('/tls/v1/subscriptions/cancel', { cancel_at: cancelAt });
  },

  /**
   * Pause subscription
   */
  pauseSubscription: async (): Promise<Subscription> => {
    return restClient.post('/tls/v1/subscriptions/pause', {});
  },

  /**
   * Resume subscription
   */
  resumeSubscription: async (): Promise<Subscription> => {
    return restClient.post('/tls/v1/subscriptions/resume', {});
  },

  /**
   * Get invoices
   */
  getInvoices: async (params?: { per_page?: number; page?: number }): Promise<Invoice[]> => {
    return restClient.get('/tls/v1/subscriptions/invoices', params);
  },

  /**
   * Get single invoice
   */
  getInvoice: async (invoiceId: number): Promise<Invoice> => {
    return restClient.get(`/tls/v1/subscriptions/invoices/${invoiceId}`);
  },

  /**
   * Download invoice PDF
   */
  downloadInvoice: async (invoiceId: number): Promise<{ url: string }> => {
    return restClient.get(`/tls/v1/subscriptions/invoices/${invoiceId}/download`);
  },

  /**
   * Get payment methods
   */
  getPaymentMethods: async (): Promise<PaymentMethod[]> => {
    return restClient.get('/tls/v1/subscriptions/payment-methods');
  },

  /**
   * Add payment method
   */
  addPaymentMethod: async (data: any): Promise<PaymentMethod> => {
    return restClient.post('/tls/v1/subscriptions/payment-methods', data);
  },

  /**
   * Set default payment method
   */
  setDefaultPaymentMethod: async (methodId: number): Promise<PaymentMethod> => {
    return restClient.post(`/tls/v1/subscriptions/payment-methods/${methodId}/set-default`, {});
  },

  /**
   * Remove payment method
   */
  removePaymentMethod: async (methodId: number): Promise<{ success: boolean }> => {
    return restClient.delete(`/tls/v1/subscriptions/payment-methods/${methodId}`);
  },

  /**
   * Get billing history
   */
  getBillingHistory: async (): Promise<Array<{ date: string; amount: number; description: string; status: string }>> => {
    return restClient.get('/tls/v1/subscriptions/billing-history');
  },
};
