/**
 * Advanced Custom Fields (ACF) Plugin API
 * Handles custom field data and field group management
 */

import { restClient } from '../restClient';

interface FieldGroup {
  id: number;
  title: string;
  fields: CustomField[];
  location: Record<string, any>[];
}

interface CustomField {
  name: string;
  type: string;
  label: string;
  required: boolean;
  choices?: Record<string, string>;
}

interface FieldValue {
  name: string;
  value: any;
}

export const acfAPI = {
  /**
   * Get field groups
   */
  getFieldGroups: async (): Promise<FieldGroup[]> => {
    return restClient.get('/acf/v3/field-groups');
  },

  /**
   * Get single field group
   */
  getFieldGroup: async (groupId: number): Promise<FieldGroup> => {
    return restClient.get(`/acf/v3/field-groups/${groupId}`);
  },

  /**
   * Get post custom fields
   */
  getPostFields: async (postId: number): Promise<Record<string, any>> => {
    return restClient.get(`/acf/v3/posts/${postId}`);
  },

  /**
   * Update post custom fields
   */
  updatePostFields: async (postId: number, fields: Record<string, any>): Promise<Record<string, any>> => {
    return restClient.put(`/acf/v3/posts/${postId}`, fields);
  },

  /**
   * Get user custom fields
   */
  getUserFields: async (userId: number): Promise<Record<string, any>> => {
    return restClient.get(`/acf/v3/users/${userId}`);
  },

  /**
   * Update user custom fields
   */
  updateUserFields: async (userId: number, fields: Record<string, any>): Promise<Record<string, any>> => {
    return restClient.put(`/acf/v3/users/${userId}`, fields);
  },

  /**
   * Get term custom fields
   */
  getTermFields: async (termId: number): Promise<Record<string, any>> => {
    return restClient.get(`/acf/v3/terms/${termId}`);
  },

  /**
   * Update term custom fields
   */
  updateTermFields: async (termId: number, fields: Record<string, any>): Promise<Record<string, any>> => {
    return restClient.put(`/acf/v3/terms/${termId}`, fields);
  },

  /**
   * Get field definition
   */
  getField: async (fieldName: string): Promise<CustomField> => {
    return restClient.get(`/acf/v3/fields/${fieldName}`);
  },
};
