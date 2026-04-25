/**
 * Custom Post Types API
 * Handles all custom post type operations and CRUD
 */

import { restClient } from '../restClient';

interface CustomPostType {
  id: number;
  post_type: string;
  title: string;
  content: string;
  excerpt?: string;
  featured_media?: number;
  author: number;
  date: string;
  modified: string;
  status: 'publish' | 'draft' | 'pending' | 'private';
  metadata?: Record<string, any>;
}

export const customPostTypesAPI = {
  /**
   * Get posts of custom type
   */
  getPosts: async (postType: string, params?: { per_page?: number; page?: number; status?: string }): Promise<CustomPostType[]> => {
    return restClient.get(`/wp/v2/${postType}`, params);
  },

  /**
   * Get single custom post
   */
  getPost: async (postType: string, postId: number): Promise<CustomPostType> => {
    return restClient.get(`/wp/v2/${postType}/${postId}`);
  },

  /**
   * Create custom post
   */
  createPost: async (postType: string, data: Partial<CustomPostType>): Promise<CustomPostType> => {
    return restClient.post(`/wp/v2/${postType}`, data);
  },

  /**
   * Update custom post
   */
  updatePost: async (postType: string, postId: number, data: Partial<CustomPostType>): Promise<CustomPostType> => {
    return restClient.put(`/wp/v2/${postType}/${postId}`, data);
  },

  /**
   * Delete custom post
   */
  deletePost: async (postType: string, postId: number): Promise<{ success: boolean }> => {
    return restClient.delete(`/wp/v2/${postType}/${postId}`);
  },

  /**
   * Search posts
   */
  searchPosts: async (postType: string, query: string, params?: { per_page?: number }): Promise<CustomPostType[]> => {
    return restClient.get(`/wp/v2/${postType}`, { search: query, ...params });
  },

  /**
   * Get post by slug
   */
  getPostBySlug: async (postType: string, slug: string): Promise<CustomPostType | null> => {
    const posts = await restClient.get(`/wp/v2/${postType}`, { slug });
    return posts.length > 0 ? posts[0] : null;
  },

  /**
   * Get post count by status
   */
  getPostCountByStatus: async (postType: string): Promise<Record<string, number>> => {
    return restClient.get(`/wp/v2/${postType}/count-by-status`);
  },

  /**
   * Bulk update posts
   */
  bulkUpdate: async (postType: string, postIds: number[], data: Partial<CustomPostType>): Promise<{ success: boolean; updated: number }> => {
    return restClient.post(`/wp/v2/${postType}/bulk-update`, { post_ids: postIds, data });
  },

  /**
   * Bulk delete posts
   */
  bulkDelete: async (postType: string, postIds: number[]): Promise<{ success: boolean; deleted: number }> => {
    return restClient.post(`/wp/v2/${postType}/bulk-delete`, { post_ids: postIds });
  },

  /**
   * Export posts
   */
  exportPosts: async (postType: string, format: 'csv' | 'json'): Promise<{ download_url: string }> => {
    return restClient.get(`/wp/v2/${postType}/export`, { format });
  },

  /**
   * Import posts
   */
  importPosts: async (postType: string, file: File): Promise<{ success: boolean; imported: number }> => {
    const formData = new FormData();
    formData.append('file', file);
    return restClient.post(`/wp/v2/${postType}/import`, formData);
  },
};
