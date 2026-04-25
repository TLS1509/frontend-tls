/**
 * Stripe Payment Integration API
 * Handles payments, charges, and payment processing
 */

import { restClient } from '../restClient';

interface PaymentIntent {
  id: string;
  amount: number;
  currency: string;
  status: 'succeeded' | 'processing' | 'requires_payment_method' | 'requires_confirmation' | 'canceled';
  client_secret: string;
  created_at: string;
}

interface PaymentMethod {
  id: string;
  type: 'card' | 'bank_account';
  card?: { brand: string; last4: string; exp_month: number; exp_year: number };
  created_at: string;
}

interface Charge {
  id: string;
  amount: number;
  currency: string;
  status: 'succeeded' | 'failed' | 'pending';
  payment_method_id: string;
  description?: string;
  created_at: string;
  receipt_url?: string;
}

export const stripeAPI = {
  /**
   * Create payment intent
   */
  createPaymentIntent: async (data: { amount: number; currency: string; description?: string; metadata?: Record<string, any> }): Promise<PaymentIntent> => {
    return restClient.post('/tls/v1/stripe/payment-intents', data);
  },

  /**
   * Get payment intent
   */
  getPaymentIntent: async (intentId: string): Promise<PaymentIntent> => {
    return restClient.get(`/tls/v1/stripe/payment-intents/${intentId}`);
  },

  /**
   * Confirm payment intent
   */
  confirmPaymentIntent: async (intentId: string, paymentMethodId: string): Promise<PaymentIntent> => {
    return restClient.post(`/tls/v1/stripe/payment-intents/${intentId}/confirm`, { payment_method_id: paymentMethodId });
  },

  /**
   * Process charge (simplified payment)
   */
  processCharge: async (data: { amount: number; currency: string; payment_method_id: string; description?: string }): Promise<Charge> => {
    return restClient.post('/tls/v1/stripe/charges', data);
  },

  /**
   * Get charge details
   */
  getCharge: async (chargeId: string): Promise<Charge> => {
    return restClient.get(`/tls/v1/stripe/charges/${chargeId}`);
  },

  /**
   * Refund charge
   */
  refundCharge: async (chargeId: string, amountInCents?: number): Promise<Charge> => {
    return restClient.post(`/tls/v1/stripe/charges/${chargeId}/refund`, { amount: amountInCents });
  },

  /**
   * Add payment method
   */
  addPaymentMethod: async (paymentMethodId: string): Promise<PaymentMethod> => {
    return restClient.post('/tls/v1/stripe/payment-methods', { stripe_payment_method_id: paymentMethodId });
  },

  /**
   * Get payment methods
   */
  getPaymentMethods: async (): Promise<PaymentMethod[]> => {
    return restClient.get('/tls/v1/stripe/payment-methods');
  },

  /**
   * Remove payment method
   */
  removePaymentMethod: async (methodId: string): Promise<{ success: boolean }> => {
    return restClient.delete(`/tls/v1/stripe/payment-methods/${methodId}`);
  },

  /**
   * Get payment history
   */
  getPaymentHistory: async (params?: { limit?: number; offset?: number }): Promise<Charge[]> => {
    return restClient.get('/tls/v1/stripe/payments', params);
  },
};
