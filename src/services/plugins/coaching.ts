/**
 * Coaching Integration Plugin API (tls-coaching-integration)
 * Handles coaching sessions, questionnaires, and coach assignments
 */

import { restClient } from '../restClient';

interface CoachingSession {
  id: number;
  user_id: number;
  coach_id?: number;
  status: 'pending' | 'active' | 'completed' | 'cancelled';
  started_at?: string;
  completed_at?: string;
  notes?: string;
}

interface Questionnaire {
  id: number;
  title: string;
  description: string;
  questions: Question[];
}

interface Question {
  id: number;
  type: 'text' | 'textarea' | 'select' | 'radio' | 'checkbox';
  question: string;
  required: boolean;
  options?: string[];
}

interface CoachingAnswer {
  question_id: number;
  answer: string | string[];
}

export const coachingAPI = {
  /**
   * Get user's coaching sessions
   */
  getCoachingSessions: async (): Promise<CoachingSession[]> => {
    return restClient.get('/tls/v1/coaching/sessions');
  },

  /**
   * Get single coaching session
   */
  getCoachingSession: async (sessionId: number): Promise<CoachingSession> => {
    return restClient.get(`/tls/v1/coaching/sessions/${sessionId}`);
  },

  /**
   * Create new coaching session
   */
  createCoachingSession: async (coachId?: number): Promise<CoachingSession> => {
    return restClient.post('/tls/v1/coaching/sessions', { coach_id: coachId });
  },

  /**
   * Get coaching questionnaire
   */
  getQuestionnaire: async (): Promise<Questionnaire> => {
    return restClient.get('/tls/v1/coaching/questionnaire');
  },

  /**
   * Submit coaching questionnaire
   */
  submitQuestionnaire: async (answers: CoachingAnswer[]): Promise<{ success: boolean; session_id: number }> => {
    return restClient.post('/tls/v1/coaching/questionnaire/submit', { answers });
  },

  /**
   * Get assigned coach info
   */
  getAssignedCoach: async (): Promise<{ id: number; name: string; email: string; bio?: string } | null> => {
    return restClient.get('/tls/v1/coaching/assigned-coach');
  },

  /**
   * Get coaching feedback/results
   */
  getCoachingFeedback: async (sessionId: number): Promise<{ feedback: string; recommendations: string[] }> => {
    return restClient.get(`/tls/v1/coaching/sessions/${sessionId}/feedback`);
  },

  /**
   * Complete coaching session
   */
  completeCoachingSession: async (sessionId: number, notes?: string): Promise<CoachingSession> => {
    return restClient.put(`/tls/v1/coaching/sessions/${sessionId}/complete`, { notes });
  },
};
