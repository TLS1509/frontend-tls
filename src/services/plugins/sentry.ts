/**
 * Sentry Error Tracking API
 * Handles error reporting and monitoring
 */

import { restClient } from '../restClient';

interface ErrorEvent {
  id: string;
  event_id: string;
  message: string;
  level: 'fatal' | 'error' | 'warning' | 'info' | 'debug';
  timestamp: string;
  user?: { id: string; username: string; email: string };
  exception?: { type: string; value: string; stacktrace: any };
  tags?: Record<string, string>;
}

interface ErrorStats {
  total_errors: number;
  errors_24h: number;
  errors_7d: number;
  most_common_error: string;
  affected_users: number;
}

export const sentryAPI = {
  /**
   * Report error/exception
   */
  reportError: async (error: any, level?: string, tags?: Record<string, string>): Promise<{ success: boolean; event_id: string }> => {
    return restClient.post('/tls/v1/sentry/report', {
      message: error.message,
      level: level || 'error',
      stack: error.stack,
      tags,
      timestamp: new Date().toISOString(),
    });
  },

  /**
   * Get error events
   */
  getErrors: async (params?: { limit?: number; level?: string }): Promise<ErrorEvent[]> => {
    return restClient.get('/tls/v1/sentry/errors', params);
  },

  /**
   * Get error details
   */
  getErrorDetails: async (eventId: string): Promise<ErrorEvent> => {
    return restClient.get(`/tls/v1/sentry/errors/${eventId}`);
  },

  /**
   * Get error stats
   */
  getErrorStats: async (): Promise<ErrorStats> => {
    return restClient.get('/tls/v1/sentry/stats');
  },

  /**
   * Mark error as resolved
   */
  resolveError: async (eventId: string): Promise<{ success: boolean }> => {
    return restClient.post(`/tls/v1/sentry/errors/${eventId}/resolve`, {});
  },

  /**
   * Ignore error
   */
  ignoreError: async (eventId: string): Promise<{ success: boolean }> => {
    return restClient.post(`/tls/v1/sentry/errors/${eventId}/ignore`, {});
  },

  /**
   * Get error timeline
   */
  getErrorTimeline: async (eventId: string): Promise<Array<{ timestamp: string; event: string; count: number }>> => {
    return restClient.get(`/tls/v1/sentry/errors/${eventId}/timeline`);
  },
};
