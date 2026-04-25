/**
 * useAuth Hook - Manages authentication state
 *
 * Fetches current user from WordPress on component mount
 * and provides auth status via Zustand store
 *
 * Strategy: Check WordPress session via /wp-json/wp/v2/users/me
 * with credentials to get session-based authentication
 */

import { useCallback, useEffect, useState } from 'react';
import { useAuthStore } from '../store/useAuthStore';
import { wpApi } from '../services/wpApi';

interface UseAuthReturn {
  user: any | null;
  loading: boolean;
  error: string | null;
  isAuthenticated: boolean;
  logout: () => void;
}

export const useAuth = (): UseAuthReturn => {
  const { user, setUser, logout: storeLogout } = useAuthStore();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch current user on hook mount
  useEffect(() => {
    const fetchUser = async () => {
      try {
        setLoading(true);
        setError(null);

        // Call WordPress API via AJAX handler (better session cookie support)
        // wpApi.getCurrentUser() uses ajaxClient which routes to /admin-ajax.php
        // This has superior session cookie handling compared to REST API
        const userData = await wpApi.getCurrentUser();

        if (userData) {
          console.log('User authenticated:', userData);
          setUser(userData);
        } else {
          console.log('User not authenticated');
          setUser(null);
        }
      } catch (err) {
        console.error('Failed to fetch user:', err);
        setUser(null);
        setError(err instanceof Error ? err.message : 'Failed to fetch user');
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [setUser]);

  const logout = useCallback(() => {
    storeLogout();
    setError(null);
    // Optionally: clear WordPress session by redirecting to logout
    // window.location.href = '/app/wp-login.php?action=logout';
  }, [storeLogout]);

  return {
    user,
    loading,
    error,
    isAuthenticated: !!user,
    logout,
  };
};
