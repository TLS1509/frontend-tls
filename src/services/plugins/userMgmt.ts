/**
 * User Management Plugin API (tls-user-management)
 * Handles user profiles, roles, and user-related operations
 */

import { restClient } from '../restClient';
import { ajaxClient } from '../ajaxClient';

interface User {
  id: number;
  name: string;
  email: string;
  roles: string[];
  avatar_urls?: Record<string, string>;
}

interface UserProfile extends User {
  bio?: string;
  company?: string;
  website?: string;
  location?: string;
  phone?: string;
}

export const userMgmtAPI = {
  /**
   * Get current user profile
   */
  getCurrentUser: async (): Promise<User> => {
    return restClient.get('/wp/v2/users/me');
  },

  /**
   * Get user profile by ID
   */
  getUserProfile: async (userId: number): Promise<UserProfile> => {
    return restClient.get(`/wp/v2/users/${userId}`);
  },

  /**
   * Update user profile
   */
  updateUserProfile: async (userId: number, data: Partial<UserProfile>): Promise<UserProfile> => {
    return restClient.put(`/wp/v2/users/${userId}`, data);
  },

  /**
   * Get all users (admin only)
   */
  getAllUsers: async (params?: { per_page?: number; page?: number }): Promise<User[]> => {
    return restClient.get('/wp/v2/users', params);
  },

  /**
   * Get user meta/custom fields
   */
  getUserMeta: async (userId: number): Promise<Record<string, any>> => {
    return restClient.get(`/tls/v1/users/${userId}/meta`);
  },

  /**
   * Update user meta/custom fields
   */
  updateUserMeta: async (userId: number, metaData: Record<string, any>): Promise<Record<string, any>> => {
    return restClient.put(`/tls/v1/users/${userId}/meta`, metaData);
  },

  /**
   * Get user roles
   */
  getUserRoles: async (userId: number): Promise<string[]> => {
    return restClient.get(`/tls/v1/users/${userId}/roles`);
  },

  /**
   * Update user roles
   */
  updateUserRoles: async (userId: number, roles: string[]): Promise<string[]> => {
    return restClient.put(`/tls/v1/users/${userId}/roles`, { roles });
  },
};
