/**
 * Completions Store - Zustand state management for learning item completions
 *
 * Tracks which learning items have been completed by the user
 */

import { create } from 'zustand';
import { wpApi } from '../services/wpApi';

export interface CompletionsStore {
  completions: Map<string, boolean>;
  isLoading: boolean;
  error: string | null;

  // Actions
  fetch: () => Promise<void>;
  markComplete: (itemId: string) => Promise<void>;
  markIncomplete: (itemId: string) => Promise<void>;
  isCompleted: (itemId: string) => boolean;
  setError: (error: string | null) => void;
}

export const useCompletionsStore = create<CompletionsStore>((set, get) => ({
  completions: new Map(),
  isLoading: false,
  error: null,

  /**
   * Fetch all completions from WordPress
   */
  fetch: async () => {
    set({ isLoading: true, error: null });
    try {
      // TODO: Create API endpoint to fetch all user completions
      // For now, this is a placeholder
      const completions = new Map<string, boolean>();
      set({ completions });
    } catch (err) {
      const error = err instanceof Error ? err.message : 'Failed to fetch completions';
      set({ error });
      console.error('Failed to fetch completions:', err);
    } finally {
      set({ isLoading: false });
    }
  },

  /**
   * Mark a learning item as complete
   */
  markComplete: async (itemId: string) => {
    try {
      set({ error: null });
      await wpApi.completeItem(itemId);

      set((state) => {
        const newMap = new Map(state.completions);
        newMap.set(itemId, true);
        return { completions: newMap };
      });
    } catch (err) {
      const error = err instanceof Error ? err.message : 'Failed to mark item complete';
      set({ error });
      console.error('Failed to mark item complete:', err);
      throw err;
    }
  },

  /**
   * Mark a learning item as incomplete
   */
  markIncomplete: async (itemId: string) => {
    try {
      set({ error: null });
      // TODO: Create API endpoint to mark item incomplete
      // await wpApi.incompleteItem(itemId);

      set((state) => {
        const newMap = new Map(state.completions);
        newMap.delete(itemId);
        return { completions: newMap };
      });
    } catch (err) {
      const error = err instanceof Error ? err.message : 'Failed to mark item incomplete';
      set({ error });
      console.error('Failed to mark item incomplete:', err);
      throw err;
    }
  },

  /**
   * Check if an item is completed
   */
  isCompleted: (itemId: string) => {
    return get().completions.has(itemId);
  },

  /**
   * Set error message
   */
  setError: (error: string | null) => set({ error }),
}));
