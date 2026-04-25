/**
 * REST Client - Wrapper for WordPress REST API endpoints
 *
 * This adapter handles communication with WordPress REST API endpoints
 * located at /wp-json/
 *
 * Currently used for authentication and future custom endpoints.
 * As the application evolves, AJAX handlers will be gradually migrated
 * to REST API endpoints implemented via WordPress plugins.
 *
 * Usage:
 *   const user = await restClient.get<User>('/wp/v2/users/me');
 *   const result = await restClient.post<Response>('/custom/v1/endpoint', data);
 */

import axios, { AxiosError } from 'axios';

/**
 * Generic REST API response error
 */
interface RestError {
  code: string;
  message: string;
  data?: any;
}

/**
 * REST Client for calling WordPress REST API endpoints
 */
class RestClient {
  private client: ReturnType<typeof axios.create>;

  constructor() {
    // Create axios instance configured for REST requests
    this.client = axios.create({
      baseURL: '/wp-json', // Vite will proxy this to localhost:8888/app/wp-json
      withCredentials: true, // Include session cookies
      headers: {
        'Content-Type': 'application/json',
      },
      timeout: 30000, // 30 second timeout
    });

    // Add response interceptor for error handling
    this.client.interceptors.response.use(
      (response) => response,
      (error: AxiosError<RestError>) => {
        console.error('REST Error:', {
          status: error.response?.status,
          code: error.response?.data?.code,
          message: error.response?.data?.message,
          data: error.response?.data?.data,
        });
        throw error;
      }
    );
  }

  /**
   * GET request to REST endpoint
   *
   * @param endpoint - The API endpoint path (e.g., '/wp/v2/users/me')
   * @param params - Optional query parameters
   * @returns Promise resolving to the response data
   *
   * @example
   *   const user = await restClient.get<User>('/wp/v2/users/me');
   *   const posts = await restClient.get<Post[]>('/wp/v2/posts', {
   *     per_page: 10,
   *     status: 'publish'
   *   });
   */
  async get<T = any>(endpoint: string, params?: Record<string, any>): Promise<T> {
    try {
      const response = await this.client.get<T>(endpoint, { params });
      return response.data;
    } catch (error) {
      if (error instanceof AxiosError) {
        const message = `REST GET Error (${endpoint}): ${error.message}`;
        console.error(message, error);
        throw new Error(message);
      }
      throw error;
    }
  }

  /**
   * POST request to REST endpoint
   *
   * @param endpoint - The API endpoint path (e.g., '/custom/v1/items')
   * @param data - Request body data
   * @returns Promise resolving to the response data
   *
   * @example
   *   const result = await restClient.post<Response>('/custom/v1/items', {
   *     title: 'New Item',
   *     description: 'Item description'
   *   });
   */
  async post<T = any>(endpoint: string, data?: any): Promise<T> {
    try {
      const response = await this.client.post<T>(endpoint, data);
      return response.data;
    } catch (error) {
      if (error instanceof AxiosError) {
        const message = `REST POST Error (${endpoint}): ${error.message}`;
        console.error(message, error);
        throw new Error(message);
      }
      throw error;
    }
  }

  /**
   * PUT request to REST endpoint (full update)
   *
   * @param endpoint - The API endpoint path
   * @param data - Request body data
   * @returns Promise resolving to the response data
   */
  async put<T = any>(endpoint: string, data?: any): Promise<T> {
    try {
      const response = await this.client.put<T>(endpoint, data);
      return response.data;
    } catch (error) {
      if (error instanceof AxiosError) {
        const message = `REST PUT Error (${endpoint}): ${error.message}`;
        console.error(message, error);
        throw new Error(message);
      }
      throw error;
    }
  }

  /**
   * PATCH request to REST endpoint (partial update)
   *
   * @param endpoint - The API endpoint path
   * @param data - Request body data
   * @returns Promise resolving to the response data
   */
  async patch<T = any>(endpoint: string, data?: any): Promise<T> {
    try {
      const response = await this.client.patch<T>(endpoint, data);
      return response.data;
    } catch (error) {
      if (error instanceof AxiosError) {
        const message = `REST PATCH Error (${endpoint}): ${error.message}`;
        console.error(message, error);
        throw new Error(message);
      }
      throw error;
    }
  }

  /**
   * DELETE request to REST endpoint
   *
   * @param endpoint - The API endpoint path
   * @returns Promise resolving to the response data
   */
  async delete<T = any>(endpoint: string): Promise<T> {
    try {
      const response = await this.client.delete<T>(endpoint);
      return response.data;
    } catch (error) {
      if (error instanceof AxiosError) {
        const message = `REST DELETE Error (${endpoint}): ${error.message}`;
        console.error(message, error);
        throw new Error(message);
      }
      throw error;
    }
  }
}

// Export singleton instance
export const restClient = new RestClient();

// Export type
export type { RestError };
