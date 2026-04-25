/**
 * SendGrid Email Integration API
 * Handles email sending and email campaign management
 */

import { restClient } from '../restClient';

interface EmailTemplate {
  id: string;
  name: string;
  subject: string;
  html_content: string;
  created_at: string;
}

interface EmailLog {
  id: string;
  to: string;
  subject: string;
  template_id?: string;
  status: 'delivered' | 'bounced' | 'failed' | 'pending';
  sent_at: string;
}

export const sendGridAPI = {
  /**
   * Send email
   */
  sendEmail: async (data: { to: string; subject: string; html: string; template_id?: string; variables?: Record<string, any> }): Promise<{ success: boolean; message_id: string }> => {
    return restClient.post('/tls/v1/email/send', data);
  },

  /**
   * Get email templates
   */
  getEmailTemplates: async (): Promise<EmailTemplate[]> => {
    return restClient.get('/tls/v1/email/templates');
  },

  /**
   * Get email log
   */
  getEmailLog: async (params?: { limit?: number; offset?: number }): Promise<EmailLog[]> => {
    return restClient.get('/tls/v1/email/log', params);
  },

  /**
   * Get email status
   */
  getEmailStatus: async (messageId: string): Promise<{ status: string; timestamp: string; bounce_reason?: string }> => {
    return restClient.get(`/tls/v1/email/${messageId}/status`);
  },

  /**
   * Schedule email
   */
  scheduleEmail: async (data: { to: string; subject: string; html: string; schedule_time: string }): Promise<{ success: boolean; scheduled_id: string }> => {
    return restClient.post('/tls/v1/email/schedule', data);
  },

  /**
   * Send bulk email
   */
  sendBulkEmail: async (data: { recipients: Array<{ to: string; variables?: Record<string, any> }>; subject: string; html: string }): Promise<{ success: boolean; count: number }> => {
    return restClient.post('/tls/v1/email/bulk-send', data);
  },

  /**
   * Get unsubscribe list
   */
  getUnsubscribeList: async (): Promise<string[]> => {
    return restClient.get('/tls/v1/email/unsubscribed');
  },

  /**
   * Add to unsubscribe list
   */
  unsubscribeEmail: async (email: string): Promise<{ success: boolean }> => {
    return restClient.post('/tls/v1/email/unsubscribe', { email });
  },
};
