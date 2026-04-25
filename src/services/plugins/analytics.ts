/**
 * Learning Analytics Plugin API (tls-learning-analytics)
 * Handles user analytics, progress tracking, and learning metrics
 */

import { restClient } from '../restClient';

interface UserAnalytics {
  user_id: number;
  total_learning_time: number;
  activities_completed: number;
  completion_rate: number;
  current_streak: number;
  last_activity: string;
}

interface ActivityLog {
  id: number;
  user_id: number;
  activity_type: string;
  resource_id: number;
  resource_type: string;
  timestamp: string;
  duration?: number;
  metadata?: Record<string, any>;
}

interface LearningMetrics {
  total_courses: number;
  completed_courses: number;
  in_progress_courses: number;
  average_completion_time: number;
  total_learning_hours: number;
  activities_per_day: number;
}

interface CourseAnalytics {
  course_id: number;
  total_enrollments: number;
  completion_rate: number;
  average_score: number;
  avg_time_to_completion: number;
  retention_rate: number;
}

export const analyticsAPI = {
  /**
   * Get user analytics overview
   */
  getUserAnalytics: async (): Promise<UserAnalytics> => {
    return restClient.get('/tls/v1/analytics/user');
  },

  /**
   * Get user activity log
   */
  getActivityLog: async (params?: { limit?: number; offset?: number; type?: string }): Promise<ActivityLog[]> => {
    return restClient.get('/tls/v1/analytics/activity-log', params);
  },

  /**
   * Get learning metrics
   */
  getLearningMetrics: async (): Promise<LearningMetrics> => {
    return restClient.get('/tls/v1/analytics/metrics');
  },

  /**
   * Get course analytics
   */
  getCourseAnalytics: async (courseId: number): Promise<CourseAnalytics> => {
    return restClient.get(`/tls/v1/analytics/course/${courseId}`);
  },

  /**
   * Get time spent analytics
   */
  getTimeSpent: async (params?: { from?: string; to?: string }): Promise<Record<string, number>> => {
    return restClient.get('/tls/v1/analytics/time-spent', params);
  },

  /**
   * Get learning goal progress
   */
  getGoalProgress: async (): Promise<Array<{ goal_id: number; goal_name: string; progress: number; target: number; deadline: string }>> => {
    return restClient.get('/tls/v1/analytics/goal-progress');
  },

  /**
   * Get engagement score
   */
  getEngagementScore: async (): Promise<{ score: number; level: 'low' | 'medium' | 'high' | 'very_high'; trend: 'up' | 'down' | 'stable' }> => {
    return restClient.get('/tls/v1/analytics/engagement');
  },

  /**
   * Get performance summary
   */
  getPerformanceSummary: async (): Promise<{ average_score: number; percentile_rank: number; comparison: 'above' | 'below' | 'average' }> => {
    return restClient.get('/tls/v1/analytics/performance');
  },

  /**
   * Get learning path analytics
   */
  getLearningPathAnalytics: async (pathId: number): Promise<{ completion_rate: number; time_spent: number; lessons_completed: number; estimated_time_remaining: number }> => {
    return restClient.get(`/tls/v1/analytics/learning-path/${pathId}`);
  },

  /**
   * Get cohort comparison (if user is part of cohort)
   */
  getCohortComparison: async (): Promise<{ your_progress: number; cohort_average: number; your_rank: number; total_in_cohort: number }> => {
    return restClient.get('/tls/v1/analytics/cohort-comparison');
  },

  /**
   * Export analytics report
   */
  exportAnalyticsReport: async (format: 'pdf' | 'csv'): Promise<{ download_url: string }> => {
    return restClient.get('/tls/v1/analytics/export', { format });
  },
};
