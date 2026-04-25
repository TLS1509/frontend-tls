/**
 * Gamification Plugin API (tls-gamification)
 * Handles badges, points, achievements, and leaderboard
 */

import { restClient } from '../restClient';

interface Badge {
  id: number;
  name: string;
  description: string;
  icon_url: string;
  criteria: string;
  earned_date?: string;
}

interface Achievement {
  id: number;
  title: string;
  description: string;
  points: number;
  icon_url: string;
  unlocked: boolean;
  progress?: number;
  max_progress?: number;
}

interface UserStats {
  user_id: number;
  total_points: number;
  level: number;
  badges_earned: number;
  achievements_unlocked: number;
  leaderboard_rank?: number;
}

interface LeaderboardEntry {
  rank: number;
  user_id: number;
  user_name: string;
  points: number;
  level: number;
  avatar_url?: string;
}

export const gamificationAPI = {
  /**
   * Get user's badges
   */
  getUserBadges: async (): Promise<Badge[]> => {
    return restClient.get('/tls/v1/gamification/badges');
  },

  /**
   * Get all available badges
   */
  getAllBadges: async (): Promise<Badge[]> => {
    return restClient.get('/tls/v1/gamification/all-badges');
  },

  /**
   * Get user's achievements
   */
  getUserAchievements: async (): Promise<Achievement[]> => {
    return restClient.get('/tls/v1/gamification/achievements');
  },

  /**
   * Get user statistics
   */
  getUserStats: async (): Promise<UserStats> => {
    return restClient.get('/tls/v1/gamification/stats');
  },

  /**
   * Get leaderboard
   */
  getLeaderboard: async (limit?: number): Promise<LeaderboardEntry[]> => {
    return restClient.get('/tls/v1/gamification/leaderboard', { limit });
  },

  /**
   * Get user's rank in leaderboard
   */
  getUserRank: async (): Promise<number> => {
    return restClient.get('/tls/v1/gamification/user-rank');
  },

  /**
   * Award points to user
   */
  awardPoints: async (points: number, reason: string): Promise<UserStats> => {
    return restClient.post('/tls/v1/gamification/award-points', { points, reason });
  },

  /**
   * Check if badge is earned
   */
  hasBadge: async (badgeId: number): Promise<boolean> => {
    return restClient.get(`/tls/v1/gamification/badges/${badgeId}/earned`);
  },

  /**
   * Get progress towards specific badge
   */
  getBadgeProgress: async (badgeId: number): Promise<{ current: number; required: number; percentage: number }> => {
    return restClient.get(`/tls/v1/gamification/badges/${badgeId}/progress`);
  },
};
