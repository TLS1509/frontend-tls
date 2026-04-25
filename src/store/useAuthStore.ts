/**
 * Auth Store - Zustand state management for authentication
 *
 * Stores current user, loading state, and error messages
 */

import { create } from 'zustand';

export interface User {
  id: number;
  name: string;
  email: string;
  avatar_urls?: Record<string, string>;
  roles?: string[];
}

export interface AuthStore {
  user: User | null;
  isLoading: boolean;
  error: string | null;
  setUser: (user: User | null) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthStore>((set) => ({
  user: null,
  isLoading: false,
  error: null,

  setUser: (user) => set({ user }),

  setLoading: (isLoading) => set({ isLoading }),

  setError: (error) => set({ error }),

  logout: () => {
    set({
      user: null,
      error: null,
      isLoading: false,
    });
    // TODO: Call WordPress logout endpoint
  },
}));
