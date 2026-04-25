/**
 * AJAX Client - Wrapper for WordPress AJAX handlers
 *
 * This adapter handles communication with WordPress AJAX endpoints
 * located at /wp-admin/admin-ajax.php
 *
 * Usage:
 *   const result = await ajaxClient.call<ResponseType>('action_name', {
 *     param1: 'value1',
 *     param2: 'value2'
 *   });
 */

import axios, { AxiosError } from 'axios';

/**
 * Response type for AJAX calls
 * WordPress AJAX handlers return either success/failure with data
 */
interface AjaxResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

/**
 * AJAX Client for calling WordPress AJAX handlers
 *
 * IMPORTANT: Uses direct requests to WordPress instead of Vite proxy because:
 * - Vite proxy breaks cookie passing (proxy acts as server, not same-origin)
 * - Direct requests allow browser to send session cookies via CORS
 * - WordPress CORS headers (added in functions.php) allow cross-origin requests with credentials
 */
class AjaxClient {
  private client: ReturnType<typeof axios.create>;
  private wpAdminUrl: string;

  constructor() {
    // Use the actual WordPress admin URL for AJAX requests
    // This allows cookies to be sent with CORS requests
    this.wpAdminUrl = 'http://localhost:8888/app/wp-admin';

    // Create axios instance configured for AJAX requests
    this.client = axios.create({
      baseURL: this.wpAdminUrl,
      withCredentials: true, // Include session cookies with CORS requests
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      timeout: 30000, // 30 second timeout
    });

    // Add response interceptor for error handling
    this.client.interceptors.response.use(
      (response) => response,
      (error: AxiosError) => {
        console.error('AJAX Error:', {
          status: error.response?.status,
          data: error.response?.data,
          message: error.message,
        });
        throw error;
      }
    );
  }

  /**
   * Call a WordPress AJAX action
   *
   * @param action - The AJAX action name (without 'wp_ajax_' prefix)
   * @param data - Optional data to send with the request
   * @returns Promise resolving to the response data
   *
   * @example
   *   const result = await ajaxClient.call<QuizAnswer>(
   *     'tls_save_quiz_answer',
   *     { quiz_id: '123', question_id: '456', answer: 'A' }
   *   );
   */
  async call<T = any>(action: string, data: Record<string, any> = {}): Promise<T> {
    try {
      // Build form data with action parameter
      const formData = new URLSearchParams({
        action,
        ...this.serializeData(data),
      });

      // Make POST request to admin-ajax.php
      const response = await this.client.post<AjaxResponse<T>>(
        '/admin-ajax.php',
        formData.toString()
      );

      const responseData = response.data;

      // Check if response indicates success
      if (typeof responseData === 'object' && responseData !== null && 'success' in responseData) {
        const ajaxResponse = responseData as AjaxResponse<T>;

        if (!ajaxResponse.success) {
          // For "not authenticated" responses, return null instead of throwing
          // Check message in both top-level and nested data.message
          const errorMsg = ajaxResponse.error || ajaxResponse.message ||
            (ajaxResponse.data as any)?.message || 'AJAX call failed';

          if (errorMsg.toLowerCase().includes('not authenticated')) {
            return null as unknown as T;
          }

          throw new Error(errorMsg);
        }

        return ajaxResponse.data as T;
      }

      // If no success field, assume response is the data
      return responseData as T;
    } catch (error) {
      if (error instanceof AxiosError) {
        const message = `AJAX Error (${action}): ${error.message}`;
        console.error(message, error);
        throw new Error(message);
      }
      throw error;
    }
  }

  /**
   * Convert data object to URL-encoded format
   * Handles nested objects and arrays by flattening them
   */
  private serializeData(data: Record<string, any>): Record<string, string> {
    const serialized: Record<string, string> = {};

    for (const [key, value] of Object.entries(data)) {
      if (value === null || value === undefined) {
        continue; // Skip null/undefined values
      }

      if (typeof value === 'object') {
        // Convert objects/arrays to JSON string
        serialized[key] = JSON.stringify(value);
      } else {
        serialized[key] = String(value);
      }
    }

    return serialized;
  }
}

// Export singleton instance
export const ajaxClient = new AjaxClient();

// Export types
export type { AjaxResponse };
