/**
 * Notifications Plugin API (tls-notifications)
 * Handles user notifications, notification preferences, and subscriptions
 */

import { restClient } from '../restClient';

interface Notification {
  id: number;
  user_id: number;
  type: string;
  title: string;
  message: string;
  read: boolean;
  created_at: string;
  action_url?: string;
}

interface NotificationPreferences {
  email_notifications: boolean;
  push_notifications: boolean;
  digest_frequency: 'none' | 'daily' | 'weekly' | 'monthly';
  notification_types: Record<string, boolean>;
}

export const notificationsAPI = {
  /**
   * Get user's unread notifications
   */
  getUnreadNotifications: async (): Promise<Notification[]> => {
    return restClient.get('/tls/v1/notifications/unread');
  },

  /**
   * Get all notifications
   */
  getAllNotifications: async (params?: { per_page?: number; page?: number }): Promise<Notification[]> => {
    return restClient.get('/tls/v1/notifications', params);
  },

  /**
   * Get notification by ID
   */
  getNotification: async (notificationId: number): Promise<Notification> => {
    return restClient.get(`/tls/v1/notifications/${notificationId}`);
  },

  /**
   * Mark notification as read
   */
  markAsRead: async (notificationId: number): Promise<Notification> => {
    return restClient.put(`/tls/v1/notifications/${notificationId}/read`, {});
  },

  /**
   * Mark all notifications as read
   */
  markAllAsRead: async (): Promise<{ count: number }> => {
    return restClient.post('/tls/v1/notifications/mark-all-read', {});
  },

  /**
   * Delete notification
   */
  deleteNotification: async (notificationId: number): Promise<{ success: boolean }> => {
    return restClient.delete(`/tls/v1/notifications/${notificationId}`);
  },

  /**
   * Get notification preferences
   */
  getPreferences: async (): Promise<NotificationPreferences> => {
    return restClient.get('/tls/v1/notifications/preferences');
  },

  /**
   * Update notification preferences
   */
  updatePreferences: async (prefs: Partial<NotificationPreferences>): Promise<NotificationPreferences> => {
    return restClient.put('/tls/v1/notifications/preferences', prefs);
  },

  /**
   * Subscribe to notification type
   */
  subscribe: async (notificationType: string): Promise<{ success: boolean }> => {
    return restClient.post('/tls/v1/notifications/subscribe', { type: notificationType });
  },

  /**
   * Unsubscribe from notification type
   */
  unsubscribe: async (notificationType: string): Promise<{ success: boolean }> => {
    return restClient.post('/tls/v1/notifications/unsubscribe', { type: notificationType });
  },

  /**
   * Get unread notification count
   */
  getUnreadCount: async (): Promise<number> => {
    return restClient.get('/tls/v1/notifications/unread-count');
  },
};
