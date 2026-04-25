/**
 * Onboarding Plugin API (tls-onboarding)
 * Handles user onboarding flow, initial setup, and tutorials
 */

import { restClient } from '../restClient';

interface OnboardingStep {
  id: number;
  key: string;
  title: string;
  description: string;
  content: string;
  order: number;
  completed: boolean;
}

interface OnboardingProgress {
  user_id: number;
  current_step: number;
  total_steps: number;
  progress_percentage: number;
  completed: boolean;
  started_at: string;
  completed_at?: string;
}

interface Tutorial {
  id: number;
  title: string;
  description: string;
  duration_seconds: number;
  video_url?: string;
  steps: TutorialStep[];
  category: string;
}

interface TutorialStep {
  id: number;
  order: number;
  title: string;
  description: string;
  image_url?: string;
}

export const onboardingAPI = {
  /**
   * Get onboarding progress
   */
  getProgress: async (): Promise<OnboardingProgress> => {
    return restClient.get('/tls/v1/onboarding/progress');
  },

  /**
   * Get all onboarding steps
   */
  getSteps: async (): Promise<OnboardingStep[]> => {
    return restClient.get('/tls/v1/onboarding/steps');
  },

  /**
   * Get single onboarding step
   */
  getStep: async (stepId: number): Promise<OnboardingStep> => {
    return restClient.get(`/tls/v1/onboarding/steps/${stepId}`);
  },

  /**
   * Complete onboarding step
   */
  completeStep: async (stepId: number): Promise<OnboardingProgress> => {
    return restClient.post(`/tls/v1/onboarding/steps/${stepId}/complete`, {});
  },

  /**
   * Skip onboarding step
   */
  skipStep: async (stepId: number): Promise<OnboardingProgress> => {
    return restClient.post(`/tls/v1/onboarding/steps/${stepId}/skip`, {});
  },

  /**
   * Skip entire onboarding
   */
  skipOnboarding: async (): Promise<OnboardingProgress> => {
    return restClient.post('/tls/v1/onboarding/skip', {});
  },

  /**
   * Reset onboarding
   */
  resetOnboarding: async (): Promise<OnboardingProgress> => {
    return restClient.post('/tls/v1/onboarding/reset', {});
  },

  /**
   * Get available tutorials
   */
  getTutorials: async (category?: string): Promise<Tutorial[]> => {
    return restClient.get('/tls/v1/onboarding/tutorials', { category });
  },

  /**
   * Get single tutorial
   */
  getTutorial: async (tutorialId: number): Promise<Tutorial> => {
    return restClient.get(`/tls/v1/onboarding/tutorials/${tutorialId}`);
  },

  /**
   * Mark tutorial as watched
   */
  markTutorialWatched: async (tutorialId: number): Promise<{ success: boolean }> => {
    return restClient.post(`/tls/v1/onboarding/tutorials/${tutorialId}/watched`, {});
  },

  /**
   * Get onboarding checklist
   */
  getChecklist: async (): Promise<{ items: Array<{ id: string; label: string; completed: boolean }>; completion_percentage: number }> => {
    return restClient.get('/tls/v1/onboarding/checklist');
  },

  /**
   * Complete checklist item
   */
  completeChecklistItem: async (itemId: string): Promise<{ success: boolean }> => {
    return restClient.post(`/tls/v1/onboarding/checklist/${itemId}`, {});
  },
};
