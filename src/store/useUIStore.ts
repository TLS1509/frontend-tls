/**
 * UI Store - Zustand state management for UI state
 *
 * Manages sidebar visibility, active tabs, notifications, and other UI state
 */

import { create } from 'zustand';

export interface Notification {
  id: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'error';
  duration?: number;
}

export interface UIStore {
  sidebarOpen: boolean;
  activeTab: string;
  notifications: Notification[];

  // Actions
  toggleSidebar: () => void;
  setSidebarOpen: (open: boolean) => void;
  setActiveTab: (tab: string) => void;
  showNotification: (message: string, type?: Notification['type'], duration?: number) => void;
  hideNotification: (id: string) => void;
  clearNotifications: () => void;
}

export const useUIStore = create<UIStore>((set, get) => ({
  sidebarOpen: true,
  activeTab: 'dashboard',
  notifications: [],

  /**
   * Toggle sidebar visibility
   */
  toggleSidebar: () => {
    set((state) => ({ sidebarOpen: !state.sidebarOpen }));
  },

  /**
   * Set sidebar visibility explicitly
   */
  setSidebarOpen: (open: boolean) => {
    set({ sidebarOpen: open });
  },

  /**
   * Set active tab
   */
  setActiveTab: (tab: string) => {
    set({ activeTab: tab });
  },

  /**
   * Show a notification
   */
  showNotification: (message: string, type: Notification['type'] = 'info', duration = 5000) => {
    const id = `${Date.now()}-${Math.random()}`;
    const notification: Notification = { id, message, type, duration };

    set((state) => ({
      notifications: [...state.notifications, notification],
    }));

    // Auto-remove notification after duration (if specified)
    if (duration > 0) {
      setTimeout(() => {
        get().hideNotification(id);
      }, duration);
    }
  },

  /**
   * Hide a specific notification
   */
  hideNotification: (id: string) => {
    set((state) => ({
      notifications: state.notifications.filter((n) => n.id !== id),
    }));
  },

  /**
   * Clear all notifications
   */
  clearNotifications: () => {
    set({ notifications: [] });
  },
}));
