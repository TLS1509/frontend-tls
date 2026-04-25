/**
 * Corrections Plugin API (tls-corrections)
 * Handles quiz/assignment corrections, feedback, and grading
 */

import { restClient } from '../restClient';

interface Submission {
  id: number;
  user_id: number;
  assignment_id: number;
  content: string;
  submitted_at: string;
  status: 'submitted' | 'under_review' | 'corrected' | 'returned';
}

interface Correction {
  id: number;
  submission_id: number;
  corrector_id: number;
  score?: number;
  max_score: number;
  feedback: string;
  corrected_at: string;
  general_comments?: string;
}

interface CorrectionDetail extends Correction {
  detailed_feedback?: Array<{
    section: string;
    feedback: string;
    score?: number;
  }>;
}

interface QuizAnswer {
  id: number;
  user_id: number;
  quiz_id: number;
  answers: Record<string, any>;
  submitted_at: string;
  score?: number;
  corrected: boolean;
}

export const correctionsAPI = {
  /**
   * Get user's submissions
   */
  getSubmissions: async (params?: { per_page?: number }): Promise<Submission[]> => {
    return restClient.get('/tls/v1/corrections/submissions', params);
  },

  /**
   * Get single submission
   */
  getSubmission: async (submissionId: number): Promise<Submission> => {
    return restClient.get(`/tls/v1/corrections/submissions/${submissionId}`);
  },

  /**
   * Get submission correction/feedback
   */
  getCorrection: async (submissionId: number): Promise<CorrectionDetail> => {
    return restClient.get(`/tls/v1/corrections/submissions/${submissionId}/correction`);
  },

  /**
   * Submit assignment/quiz
   */
  submitAssignment: async (assignmentId: number, content: any): Promise<Submission> => {
    return restClient.post('/tls/v1/corrections/submit', { assignment_id: assignmentId, content });
  },

  /**
   * Get quiz answers
   */
  getQuizAnswers: async (quizId: number): Promise<QuizAnswer> => {
    return restClient.get(`/tls/v1/corrections/quiz/${quizId}/answers`);
  },

  /**
   * Submit quiz answers
   */
  submitQuizAnswers: async (quizId: number, answers: Record<string, any>): Promise<QuizAnswer> => {
    return restClient.post(`/tls/v1/corrections/quiz/${quizId}/submit`, { answers });
  },

  /**
   * Get quiz results/correction
   */
  getQuizResults: async (quizId: number): Promise<{ score: number; max_score: number; answers_review: any[] }> => {
    return restClient.get(`/tls/v1/corrections/quiz/${quizId}/results`);
  },

  /**
   * Get all submissions for an assignment (admin/teacher)
   */
  getAssignmentSubmissions: async (assignmentId: number): Promise<Submission[]> => {
    return restClient.get(`/tls/v1/corrections/assignments/${assignmentId}/submissions`);
  },

  /**
   * Grade submission (admin/teacher)
   */
  gradeSubmission: async (submissionId: number, data: { score: number; feedback: string; detailed_feedback?: any[] }): Promise<Correction> => {
    return restClient.post(`/tls/v1/corrections/submissions/${submissionId}/grade`, data);
  },

  /**
   * Request revision on submission
   */
  requestRevision: async (submissionId: number, message: string): Promise<{ success: boolean }> => {
    return restClient.post(`/tls/v1/corrections/submissions/${submissionId}/request-revision`, { message });
  },

  /**
   * Get correction statistics
   */
  getCorrectionStats: async (): Promise<{ pending: number; corrected: number; average_score: number }> => {
    return restClient.get('/tls/v1/corrections/stats');
  },
};
