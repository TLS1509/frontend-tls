/**
 * Monitoring/Veille Plugin API (wp-veille)
 * Handles monitoring content, news feeds, and trend tracking
 */

import { restClient } from '../restClient';

interface VeilleItem {
  id: number;
  title: string;
  description: string;
  source: string;
  source_url: string;
  published_date: string;
  category: string;
  relevance_score?: number;
  saved: boolean;
  read: boolean;
}

interface VeilleSource {
  id: number;
  name: string;
  url: string;
  rss_feed?: string;
  category: string;
  active: boolean;
}

interface VeilleCategory {
  id: number;
  name: string;
  description?: string;
  item_count: number;
}

export const monitoringAPI = {
  /**
   * Get veille/monitoring feed
   */
  getFeed: async (params?: { category?: string; per_page?: number; page?: number; saved_only?: boolean }): Promise<VeilleItem[]> => {
    return restClient.get('/tls/v1/monitoring/feed', params);
  },

  /**
   * Get veille item details
   */
  getItem: async (itemId: number): Promise<VeilleItem> => {
    return restClient.get(`/tls/v1/monitoring/items/${itemId}`);
  },

  /**
   * Mark item as read
   */
  markAsRead: async (itemId: number): Promise<VeilleItem> => {
    return restClient.put(`/tls/v1/monitoring/items/${itemId}/read`, {});
  },

  /**
   * Save/bookmark item
   */
  saveItem: async (itemId: number): Promise<VeilleItem> => {
    return restClient.post(`/tls/v1/monitoring/items/${itemId}/save`, {});
  },

  /**
   * Unsave/remove bookmark
   */
  unsaveItem: async (itemId: number): Promise<VeilleItem> => {
    return restClient.post(`/tls/v1/monitoring/items/${itemId}/unsave`, {});
  },

  /**
   * Get saved items
   */
  getSavedItems: async (params?: { per_page?: number; page?: number }): Promise<VeilleItem[]> => {
    return restClient.get('/tls/v1/monitoring/saved', params);
  },

  /**
   * Get monitoring categories
   */
  getCategories: async (): Promise<VeilleCategory[]> => {
    return restClient.get('/tls/v1/monitoring/categories');
  },

  /**
   * Get items by category
   */
  getItemsByCategory: async (category: string, params?: { per_page?: number }): Promise<VeilleItem[]> => {
    return restClient.get('/tls/v1/monitoring/category', { category, ...params });
  },

  /**
   * Search monitoring content
   */
  search: async (query: string, params?: { category?: string; per_page?: number }): Promise<VeilleItem[]> => {
    return restClient.get('/tls/v1/monitoring/search', { q: query, ...params });
  },

  /**
   * Get monitoring sources
   */
  getSources: async (): Promise<VeilleSource[]> => {
    return restClient.get('/tls/v1/monitoring/sources');
  },

  /**
   * Add source/feed
   */
  addSource: async (data: { name: string; url: string; category: string; rss_feed?: string }): Promise<VeilleSource> => {
    return restClient.post('/tls/v1/monitoring/sources', data);
  },

  /**
   * Remove source
   */
  removeSource: async (sourceId: number): Promise<{ success: boolean }> => {
    return restClient.delete(`/tls/v1/monitoring/sources/${sourceId}`);
  },

  /**
   * Get trending items
   */
  getTrending: async (limit?: number): Promise<VeilleItem[]> => {
    return restClient.get('/tls/v1/monitoring/trending', { limit });
  },

  /**
   * Get monitoring statistics
   */
  getStats: async (): Promise<{ total_items: number; unread_count: number; saved_count: number; categories: Record<string, number> }> => {
    return restClient.get('/tls/v1/monitoring/stats');
  },
};
