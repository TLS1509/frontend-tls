/**
 * Competences/Skills Framework Plugin API (referentiel-competences)
 * Handles skills, competencies, and skill development tracking
 */

import { restClient } from '../restClient';

interface Competence {
  id: number;
  name: string;
  description: string;
  category: string;
  level_required: number;
}

interface UserCompetence {
  id: number;
  user_id: number;
  competence_id: number;
  current_level: number;
  target_level: number;
  progress_percentage: number;
  last_updated: string;
}

interface CompetenceLevel {
  level: number;
  name: string;
  description: string;
  requirements: string[];
}

interface SkillGoal {
  id: number;
  user_id: number;
  competence_id: number;
  target_level: number;
  deadline?: string;
  status: 'active' | 'completed' | 'abandoned';
}

export const competencesAPI = {
  /**
   * Get all competences in framework
   */
  getAllCompetences: async (params?: { category?: string; per_page?: number }): Promise<Competence[]> => {
    return restClient.get('/tls/v1/competences', params);
  },

  /**
   * Get single competence details
   */
  getCompetence: async (competenceId: number): Promise<Competence> => {
    return restClient.get(`/tls/v1/competences/${competenceId}`);
  },

  /**
   * Get competence levels/framework
   */
  getCompetenceLevels: async (competenceId: number): Promise<CompetenceLevel[]> => {
    return restClient.get(`/tls/v1/competences/${competenceId}/levels`);
  },

  /**
   * Get user's competences and levels
   */
  getUserCompetences: async (): Promise<UserCompetence[]> => {
    return restClient.get('/tls/v1/competences/user');
  },

  /**
   * Get single user competence
   */
  getUserCompetence: async (competenceId: number): Promise<UserCompetence> => {
    return restClient.get(`/tls/v1/competences/user/${competenceId}`);
  },

  /**
   * Update user competence level
   */
  updateUserCompetence: async (competenceId: number, level: number): Promise<UserCompetence> => {
    return restClient.put(`/tls/v1/competences/user/${competenceId}`, { current_level: level });
  },

  /**
   * Get user skill goals
   */
  getSkillGoals: async (): Promise<SkillGoal[]> => {
    return restClient.get('/tls/v1/competences/goals');
  },

  /**
   * Create skill goal
   */
  createSkillGoal: async (data: { competence_id: number; target_level: number; deadline?: string }): Promise<SkillGoal> => {
    return restClient.post('/tls/v1/competences/goals', data);
  },

  /**
   * Update skill goal
   */
  updateSkillGoal: async (goalId: number, data: Partial<SkillGoal>): Promise<SkillGoal> => {
    return restClient.put(`/tls/v1/competences/goals/${goalId}`, data);
  },

  /**
   * Complete skill goal
   */
  completeSkillGoal: async (goalId: number): Promise<SkillGoal> => {
    return restClient.post(`/tls/v1/competences/goals/${goalId}/complete`, {});
  },

  /**
   * Get competences by category
   */
  getCompetencesByCategory: async (category: string): Promise<Competence[]> => {
    return restClient.get('/tls/v1/competences/category', { category });
  },

  /**
   * Get competence framework (full tree)
   */
  getFramework: async (): Promise<Record<string, Competence[]>> => {
    return restClient.get('/tls/v1/competences/framework');
  },

  /**
   * Get user skill assessment
   */
  getSkillAssessment: async (): Promise<{ overall_score: number; competences: UserCompetence[]; recommendations: string[] }> => {
    return restClient.get('/tls/v1/competences/assessment');
  },
};
