/**
 * WPForms Integration API (wpforms)
 * Handles form management, submissions, and form data
 */

import { restClient } from '../restClient';

interface Form {
  id: number;
  title: string;
  description?: string;
  created_date: string;
  modified_date: string;
  fields: FormField[];
  settings?: Record<string, any>;
}

interface FormField {
  id: string;
  type: string;
  label: string;
  required: boolean;
  placeholder?: string;
  options?: string[];
}

interface FormSubmission {
  id: number;
  form_id: number;
  user_id?: number;
  data: Record<string, any>;
  submitted_at: string;
  ip_address?: string;
  user_agent?: string;
}

export const formsAPI = {
  /**
   * Get all forms
   */
  getForms: async (): Promise<Form[]> => {
    return restClient.get('/wp/v2/wpforms/forms');
  },

  /**
   * Get single form
   */
  getForm: async (formId: number): Promise<Form> => {
    return restClient.get(`/wp/v2/wpforms/forms/${formId}`);
  },

  /**
   * Submit form
   */
  submitForm: async (formId: number, data: Record<string, any>): Promise<FormSubmission> => {
    return restClient.post(`/wp/v2/wpforms/forms/${formId}/submit`, data);
  },

  /**
   * Get form submissions
   */
  getFormSubmissions: async (formId: number, params?: { per_page?: number; page?: number }): Promise<FormSubmission[]> => {
    return restClient.get(`/wp/v2/wpforms/forms/${formId}/submissions`, params);
  },

  /**
   * Get single submission
   */
  getSubmission: async (submissionId: number): Promise<FormSubmission> => {
    return restClient.get(`/wp/v2/wpforms/submissions/${submissionId}`);
  },

  /**
   * Delete submission
   */
  deleteSubmission: async (submissionId: number): Promise<{ success: boolean }> => {
    return restClient.delete(`/wp/v2/wpforms/submissions/${submissionId}`);
  },

  /**
   * Get form stats
   */
  getFormStats: async (formId: number): Promise<{ total_views: number; total_submissions: number; completion_rate: number }> => {
    return restClient.get(`/wp/v2/wpforms/forms/${formId}/stats`);
  },

  /**
   * Export form submissions
   */
  exportSubmissions: async (formId: number, format: 'csv' | 'pdf'): Promise<{ download_url: string }> => {
    return restClient.get(`/wp/v2/wpforms/forms/${formId}/export`, { format });
  },
};
