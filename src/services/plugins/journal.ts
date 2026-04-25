/**
 * Journal/Reflexive Journal Plugin API (tls-journal-reflexif)
 * Handles reflective journal entries, mood tracking, and personal notes
 */

import { restClient } from '../restClient';

interface JournalEntry {
  id: number;
  title: string;
  content: string;
  mood?: string;
  tags?: string[];
  created_at: string;
  updated_at: string;
  private: boolean;
}

interface JournalStats {
  total_entries: number;
  this_month: number;
  this_week: number;
  average_sentiment: 'positive' | 'neutral' | 'negative';
  mood_distribution: Record<string, number>;
}

export const journalAPI = {
  /**
   * Get all journal entries
   */
  getEntries: async (params?: { per_page?: number; page?: number; from?: string; to?: string }): Promise<JournalEntry[]> => {
    return restClient.get('/tls/v1/journal/entries', params);
  },

  /**
   * Get single journal entry
   */
  getEntry: async (entryId: number): Promise<JournalEntry> => {
    return restClient.get(`/tls/v1/journal/entries/${entryId}`);
  },

  /**
   * Create new journal entry
   */
  createEntry: async (data: { title: string; content: string; mood?: string; tags?: string[]; private?: boolean }): Promise<JournalEntry> => {
    return restClient.post('/tls/v1/journal/entries', data);
  },

  /**
   * Update journal entry
   */
  updateEntry: async (entryId: number, data: Partial<JournalEntry>): Promise<JournalEntry> => {
    return restClient.put(`/tls/v1/journal/entries/${entryId}`, data);
  },

  /**
   * Delete journal entry
   */
  deleteEntry: async (entryId: number): Promise<{ success: boolean }> => {
    return restClient.delete(`/tls/v1/journal/entries/${entryId}`);
  },

  /**
   * Get journal entries for a specific date
   */
  getEntriesByDate: async (date: string): Promise<JournalEntry[]> => {
    return restClient.get('/tls/v1/journal/by-date', { date });
  },

  /**
   * Search journal entries
   */
  searchEntries: async (query: string): Promise<JournalEntry[]> => {
    return restClient.get('/tls/v1/journal/search', { q: query });
  },

  /**
   * Get journal statistics
   */
  getStats: async (): Promise<JournalStats> => {
    return restClient.get('/tls/v1/journal/stats');
  },

  /**
   * Get entries by mood
   */
  getEntriesByMood: async (mood: string): Promise<JournalEntry[]> => {
    return restClient.get('/tls/v1/journal/by-mood', { mood });
  },

  /**
   * Get entries by tag
   */
  getEntriesByTag: async (tag: string): Promise<JournalEntry[]> => {
    return restClient.get('/tls/v1/journal/by-tag', { tag });
  },

  /**
   * Add tag to entry
   */
  addTag: async (entryId: number, tag: string): Promise<JournalEntry> => {
    return restClient.post(`/tls/v1/journal/entries/${entryId}/tags`, { tag });
  },

  /**
   * Remove tag from entry
   */
  removeTag: async (entryId: number, tag: string): Promise<JournalEntry> => {
    return restClient.delete(`/tls/v1/journal/entries/${entryId}/tags/${tag}`);
  },

  /**
   * Get all tags used in journal
   */
  getAllTags: async (): Promise<string[]> => {
    return restClient.get('/tls/v1/journal/tags');
  },
};
