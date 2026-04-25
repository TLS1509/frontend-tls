/**
 * Zapier Integration API
 * Handles Zapier automation webhooks and integration
 */

import { restClient } from '../restClient';

interface ZapierWebhook {
  id: string;
  event_type: string;
  target_url: string;
  active: boolean;
  created_at: string;
}

export const zapierAPI = {
  /**
   * Register webhook for Zapier integration
   */
  registerWebhook: async (eventType: string, targetUrl: string): Promise<ZapierWebhook> => {
    return restClient.post('/tls/v1/zapier/webhooks', { event_type: eventType, target_url: targetUrl });
  },

  /**
   * Get registered webhooks
   */
  getWebhooks: async (): Promise<ZapierWebhook[]> => {
    return restClient.get('/tls/v1/zapier/webhooks');
  },

  /**
   * Delete webhook
   */
  deleteWebhook: async (webhookId: string): Promise<{ success: boolean }> => {
    return restClient.delete(`/tls/v1/zapier/webhooks/${webhookId}`);
  },

  /**
   * Trigger custom action
   */
  triggerAction: async (action: string, data: Record<string, any>): Promise<any> => {
    return restClient.post('/tls/v1/zapier/actions', { action, data });
  },

  /**
   * Get available events for automation
   */
  getAvailableEvents: async (): Promise<string[]> => {
    return restClient.get('/tls/v1/zapier/events');
  },

  /**
   * Get automation logs
   */
  getAutomationLogs: async (params?: { limit?: number }): Promise<Array<{ timestamp: string; event: string; status: string; details: any }>> => {
    return restClient.get('/tls/v1/zapier/logs', params);
  },
};
