/**
 * Memberships Plugin API (paid-memberships-pro)
 * Handles membership levels, access control, and member management
 */

import { restClient } from '../restClient';

interface MembershipLevel {
  id: number;
  name: string;
  description: string;
  price: number;
  currency: string;
  billing_frequency: 'monthly' | 'yearly' | 'one-time';
  features: string[];
  access_level: number;
}

interface UserMembership {
  id: number;
  user_id: number;
  level_id: number;
  level_name: string;
  status: 'active' | 'expired' | 'cancelled' | 'pending';
  start_date: string;
  expiration_date?: string;
  auto_renew: boolean;
}

interface MembershipAccess {
  level_id: number;
  resource_type: string;
  resource_id: number;
  access_granted: boolean;
}

export const membershipsAPI = {
  /**
   * Get all membership levels
   */
  getMembershipLevels: async (): Promise<MembershipLevel[]> => {
    return restClient.get('/tls/v1/memberships/levels');
  },

  /**
   * Get single membership level
   */
  getMembershipLevel: async (levelId: number): Promise<MembershipLevel> => {
    return restClient.get(`/tls/v1/memberships/levels/${levelId}`);
  },

  /**
   * Get user's current membership
   */
  getUserMembership: async (): Promise<UserMembership> => {
    return restClient.get('/tls/v1/memberships/current');
  },

  /**
   * Upgrade membership
   */
  upgradeMembership: async (levelId: number): Promise<UserMembership> => {
    return restClient.post('/tls/v1/memberships/upgrade', { level_id: levelId });
  },

  /**
   * Downgrade membership
   */
  downgradeMembership: async (levelId: number): Promise<UserMembership> => {
    return restClient.post('/tls/v1/memberships/downgrade', { level_id: levelId });
  },

  /**
   * Cancel membership
   */
  cancelMembership: async (reason?: string): Promise<{ success: boolean }> => {
    return restClient.post('/tls/v1/memberships/cancel', { reason });
  },

  /**
   * Check access to resource
   */
  checkAccess: async (resourceType: string, resourceId: number): Promise<boolean> => {
    return restClient.get('/tls/v1/memberships/check-access', { resource_type: resourceType, resource_id: resourceId });
  },

  /**
   * Get member's access list
   */
  getMemberAccess: async (): Promise<MembershipAccess[]> => {
    return restClient.get('/tls/v1/memberships/access');
  },

  /**
   * Get membership history
   */
  getMembershipHistory: async (): Promise<Array<{ level_name: string; start_date: string; end_date?: string; status: string }>> => {
    return restClient.get('/tls/v1/memberships/history');
  },

  /**
   * Get member benefits
   */
  getMemberBenefits: async (): Promise<{ benefits: string[]; level_name: string; expiration_date?: string }> => {
    return restClient.get('/tls/v1/memberships/benefits');
  },

  /**
   * Renew membership
   */
  renewMembership: async (): Promise<UserMembership> => {
    return restClient.post('/tls/v1/memberships/renew', {});
  },
};
