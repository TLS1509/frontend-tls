// ========================================
// 🎯 HOOK : useUserStats
// Gestion des statistiques utilisateur
// ========================================

import { useState, useEffect } from 'react';
import type { UserStats } from '../data/descriptivePhrases';

/**
 * Hook pour récupérer les statistiques utilisateur
 * 
 * @param userId - ID de l'utilisateur (optionnel pour le moment)
 * @returns UserStats object
 * 
 * @example
 * const { stats, loading, error, refresh } = useUserStats('user123');
 */
export function useUserStats(userId?: string) {
  const [stats, setStats] = useState<UserStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // ========================================
  // 📊 MOCK DATA (À REMPLACER PAR API)
  // ========================================
  
  const getMockUserStats = (): UserStats => {
    // TODO: Remplacer par appel API réel
    // const response = await fetch(`/api/users/${userId}/stats`);
    // return response.json();
    
    return {
      completedLessons: 15,
      badges: 3,
      overallProgress: 68,
      currentStreak: 7,
      completedModules: 2,
      certificates: 1,
      isNewUser: false,
    };
  };

  // ========================================
  // 🔄 FETCH STATS
  // ========================================

  const fetchUserStats = async () => {
    try {
      setLoading(true);
      setError(null);

      // Simuler un délai réseau
      await new Promise(resolve => setTimeout(resolve, 300));

      const userStats = getMockUserStats();
      setStats(userStats);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur de chargement des statistiques');
      console.error('Erreur useUserStats:', err);
    } finally {
      setLoading(false);
    }
  };

  // ========================================
  // 🎯 EFFECTS
  // ========================================

  useEffect(() => {
    fetchUserStats();
  }, [userId]);

  // ========================================
  // 📤 RETURN
  // ========================================

  return {
    stats,
    loading,
    error,
    refresh: fetchUserStats, // Permet de rafraîchir manuellement
  };
}

// ========================================
// 🔧 HELPER : Mettre à jour une stat
// ========================================

/**
 * Helper pour incrémenter une statistique spécifique
 * 
 * @example
 * updateUserStat(currentStats, 'completedLessons', 1);
 */
export function updateUserStat(
  currentStats: UserStats,
  statName: keyof Omit<UserStats, 'isNewUser'>,
  increment: number
): UserStats {
  return {
    ...currentStats,
    [statName]: currentStats[statName] + increment,
    isNewUser: false, // Une fois qu'on a des stats, plus nouveau
  };
}

// ========================================
// 🎉 HELPER : Célébrer un achievement
// ========================================

/**
 * Détermine si un achievement vient d'être débloqué
 * 
 * @example
 * const newAchievement = checkNewAchievement(oldStats, newStats);
 * if (newAchievement) {
 *   toast.success(`🎉 ${newAchievement.message}`);
 * }
 */
export function checkNewAchievement(
  oldStats: UserStats,
  newStats: UserStats
): { type: string; message: string } | null {
  // Nouveau badge
  if (newStats.badges > oldStats.badges) {
    return {
      type: 'badge',
      message: `Nouveau badge débloqué ! Vous en avez maintenant ${newStats.badges}.`,
    };
  }

  // Nouveau certificat
  if (newStats.certificates > oldStats.certificates) {
    return {
      type: 'certificate',
      message: `Certificat obtenu ! Vos compétences sont reconnues.`,
    };
  }

  // Milestone de leçons (tous les 5)
  if (
    Math.floor(newStats.completedLessons / 5) > Math.floor(oldStats.completedLessons / 5)
  ) {
    return {
      type: 'lesson_milestone',
      message: `${newStats.completedLessons} leçons complétées ! Continuez votre lancée.`,
    };
  }

  // Streak important (7, 14, 30 jours)
  const streakMilestones = [7, 14, 30, 60, 90];
  if (
    streakMilestones.includes(newStats.currentStreak) &&
    newStats.currentStreak > oldStats.currentStreak
  ) {
    return {
      type: 'streak_milestone',
      message: `${newStats.currentStreak} jours consécutifs ! Votre engagement est remarquable.`,
    };
  }

  // Progress milestone (25%, 50%, 75%, 100%)
  const progressMilestones = [25, 50, 75, 100];
  const oldMilestone = progressMilestones.find(m => oldStats.overallProgress < m);
  const newMilestone = progressMilestones.find(m => newStats.overallProgress >= m);
  
  if (newMilestone && newMilestone !== oldMilestone) {
    return {
      type: 'progress_milestone',
      message: `${newMilestone}% de progression ! Vous êtes sur la bonne voie.`,
    };
  }

  return null;
}

// ========================================
// 📝 EXEMPLES D'UTILISATION
// ========================================

/*
// Dans un composant React :

import { useUserStats, updateUserStat, checkNewAchievement } from './useUserStats';
import { getDescriptivePhrase } from '../data/descriptivePhrases';
import { toast } from 'sonner';

function DashboardPage() {
  const { stats, loading, error, refresh } = useUserStats();
  const [descriptivePhrase, setDescriptivePhrase] = useState('');

  useEffect(() => {
    if (stats) {
      const phrase = getDescriptivePhrase(stats);
      setDescriptivePhrase(phrase);
    }
  }, [stats]);

  const handleLessonCompleted = () => {
    if (!stats) return;

    const oldStats = stats;
    const newStats = updateUserStat(stats, 'completedLessons', 1);
    
    // Vérifier nouvel achievement
    const achievement = checkNewAchievement(oldStats, newStats);
    if (achievement) {
      toast.success(achievement.message);
    }

    // TODO: Sauvegarder en BDD
    // await updateUserStatsInDB(userId, newStats);
    
    // Rafraîchir
    refresh();
  };

  if (loading) return <div>Chargement...</div>;
  if (error) return <div>Erreur: {error}</div>;
  if (!stats) return null;

  return (
    <div>
      <h1>Bienvenue Pierre-Armand 👋</h1>
      <h3>{descriptivePhrase}</h3>
      <button onClick={handleLessonCompleted}>Terminer une leçon</button>
    </div>
  );
}
*/
