/**
 * Parcours Plugin API (tls-parcours)
 * Handles learning paths, courses, and learning progression
 */

import { restClient } from '../restClient';
import { ajaxClient } from '../ajaxClient';

interface Parcours {
  id: number;
  title: string;
  description: string;
  featured_media?: number;
  lessons?: Lesson[];
}

interface Lesson {
  id: number;
  title: string;
  content: string;
  order: number;
  quiz_id?: number;
}

interface ParcoursProgress {
  parcours_id: number;
  user_id: number;
  progress_percentage: number;
  completed_lessons: number[];
  current_lesson_id: number;
  started_at: string;
  completed_at?: string;
}

export const parcoursAPI = {
  /**
   * Get all learning paths (parcours)
   */
  getAllParcours: async (params?: { per_page?: number }): Promise<Parcours[]> => {
    return restClient.get('/wp/v2/tls_parcours', params);
  },

  /**
   * Get single learning path by ID
   */
  getParcours: async (parcoursId: number): Promise<Parcours> => {
    return restClient.get(`/wp/v2/tls_parcours/${parcoursId}`);
  },

  /**
   * Get lessons in a parcours
   */
  getParcoursLessons: async (parcoursId: number): Promise<Lesson[]> => {
    return restClient.get(`/tls/v1/parcours/${parcoursId}/lessons`);
  },

  /**
   * Get user progress in a parcours
   */
  getUserProgress: async (parcoursId: number): Promise<ParcoursProgress> => {
    return restClient.get(`/tls/v1/parcours/${parcoursId}/progress`);
  },

  /**
   * Mark lesson as completed
   */
  completeLesson: async (parcoursId: number, lessonId: number): Promise<ParcoursProgress> => {
    return restClient.post(`/tls/v1/parcours/${parcoursId}/lessons/${lessonId}/complete`, {});
  },

  /**
   * Get all user parcours progress
   */
  getUserParcoursList: async (): Promise<ParcoursProgress[]> => {
    return restClient.get('/tls/v1/user/parcours');
  },

  /**
   * Create/enroll in a new parcours
   */
  enrollParcours: async (parcoursId: number): Promise<ParcoursProgress> => {
    return restClient.post(`/tls/v1/parcours/${parcoursId}/enroll`, {});
  },

  /**
   * Get lesson content
   */
  getLesson: async (parcoursId: number, lessonId: number): Promise<Lesson> => {
    return restClient.get(`/tls/v1/parcours/${parcoursId}/lessons/${lessonId}`);
  },
};
