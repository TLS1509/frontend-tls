// ========================================
// 💡 PHRASES DESCRIPTIVES DYNAMIQUES
// Hero Section - The Learning Society
// ========================================

export interface DescriptivePhrase {
  id: number;
  text: string;
  type: 'welcome' | 'achievement' | 'motivation';
  condition?: 'new_user' | 'has_badges' | 'has_progress' | 'streak' | 'completed_lesson';
}

// ========================================
// 🎯 PHRASES DE BIENVENUE (NOUVEAUX UTILISATEURS)
// ========================================

export const welcomePhrases: DescriptivePhrase[] = [
  {
    id: 1,
    text: "Votre parcours d'apprentissage commence ici.",
    type: 'welcome',
    condition: 'new_user'
  },
  {
    id: 2,
    text: "Chaque jour est une opportunité d'apprendre quelque chose de nouveau.",
    type: 'welcome',
    condition: 'new_user'
  },
  {
    id: 3,
    text: "Bienvenue dans votre espace d'apprentissage personnalisé.",
    type: 'welcome',
    condition: 'new_user'
  },
  {
    id: 4,
    text: "Transformez votre curiosité en compétences.",
    type: 'welcome',
    condition: 'new_user'
  },
  {
    id: 5,
    text: "L'excellence pédagogique au service de votre progression.",
    type: 'welcome',
    condition: 'new_user'
  },
  {
    id: 6,
    text: "Osez apprendre, osez progresser, osez exceller.",
    type: 'welcome',
    condition: 'new_user'
  },
  {
    id: 7,
    text: "Apprenez aujourd'hui ce qui façonne votre demain.",
    type: 'welcome',
    condition: 'new_user'
  },
  {
    id: 8,
    text: "L'apprenance : votre attitude face au savoir.",
    type: 'welcome',
    condition: 'new_user'
  },
];

// ========================================
// 🏆 PHRASES D'ACHIEVEMENTS (AVEC STATISTIQUES)
// ========================================

export const achievementPhrases: DescriptivePhrase[] = [
  {
    id: 10,
    text: "{count} leçon{s} terminée{s}, vous progressez avec constance.",
    type: 'achievement',
    condition: 'completed_lesson'
  },
  {
    id: 11,
    text: "{count} badge{s} débloqué{s}, votre expertise se construit.",
    type: 'achievement',
    condition: 'has_badges'
  },
  {
    id: 12,
    text: "{percent}% de progression, vous êtes sur la bonne voie.",
    type: 'achievement',
    condition: 'has_progress'
  },
  {
    id: 13,
    text: "{count} jour{s} consécutif{s}, votre engagement fait la différence.",
    type: 'achievement',
    condition: 'streak'
  },
  {
    id: 14,
    text: "{count} module{s} complété{s}, bravo pour votre persévérance.",
    type: 'achievement',
    condition: 'completed_lesson'
  },
  {
    id: 15,
    text: "{count} certificat{s} obtenu{s}, vos compétences sont reconnues.",
    type: 'achievement',
    condition: 'has_badges'
  },
  {
    id: 16,
    text: "{count} jour{s} de suite, votre constance est remarquable.",
    type: 'achievement',
    condition: 'streak'
  },
  {
    id: 17,
    text: "Série de {count} jour{s}, vous incarnez l'apprenance.",
    type: 'achievement',
    condition: 'streak'
  },
  {
    id: 18,
    text: "{count} leçon{s} validée{s}, votre savoir s'enrichit.",
    type: 'achievement',
    condition: 'completed_lesson'
  },
];

// ========================================
// 💪 PHRASES DE MOTIVATION (GÉNÉRIQUES)
// ========================================

export const motivationPhrases: DescriptivePhrase[] = [
  {
    id: 20,
    text: "Continuez votre lancée, chaque pas compte.",
    type: 'motivation'
  },
  {
    id: 21,
    text: "Votre progression inspire votre communauté d'apprenants.",
    type: 'motivation'
  },
  {
    id: 22,
    text: "L'apprentissage continu est votre superpouvoir.",
    type: 'motivation'
  },
  {
    id: 23,
    text: "Chaque compétence acquise ouvre de nouvelles portes.",
    type: 'motivation'
  },
  {
    id: 24,
    text: "Votre engagement aujourd'hui façonne votre expertise de demain.",
    type: 'motivation'
  },
  {
    id: 25,
    text: "Votre expertise se construit jour après jour.",
    type: 'motivation'
  },
  {
    id: 26,
    text: "Apprendre à apprendre : la compétence du 21ème siècle.",
    type: 'motivation'
  },
  {
    id: 27,
    text: "Votre cerveau se transforme à chaque nouvel apprentissage.",
    type: 'motivation'
  },
  {
    id: 28,
    text: "Votre détermination fait de vous un apprenant d'exception.",
    type: 'motivation'
  },
  {
    id: 29,
    text: "Votre assiduité est la clé de votre réussite future.",
    type: 'motivation'
  },
];

// ========================================
// 📊 INTERFACE POUR LES STATISTIQUES UTILISATEUR
// ========================================

export interface UserStats {
  completedLessons: number;
  badges: number;
  overallProgress: number;
  currentStreak: number;
  completedModules: number;
  certificates: number;
  isNewUser: boolean;
}

// ========================================
// 🎯 LOGIQUE DE SÉLECTION DYNAMIQUE
// ========================================

/**
 * Génère la phrase descriptive en fonction des stats de l'utilisateur
 */
export const getDescriptivePhrase = (stats: UserStats): string => {
  // Nouvel utilisateur (pas encore d'achievements)
  if (stats.isNewUser || stats.completedLessons === 0) {
    const randomIndex = Math.floor(Math.random() * welcomePhrases.length);
    return welcomePhrases[randomIndex].text;
  }

  // Utilisateur avec achievements : prioriser les stats les plus impressionnantes
  const achievements: { phrase: string; priority: number }[] = [];

  // Streak (haute priorité)
  if (stats.currentStreak >= 3) {
    achievements.push({
      phrase: formatAchievementPhrase(achievementPhrases[3].text, stats.currentStreak),
      priority: 10
    });
  }

  // Badges (haute priorité)
  if (stats.badges > 0) {
    achievements.push({
      phrase: formatAchievementPhrase(achievementPhrases[1].text, stats.badges),
      priority: 9
    });
  }

  // Certificats (haute priorité)
  if (stats.certificates > 0) {
    achievements.push({
      phrase: formatAchievementPhrase(achievementPhrases[5].text, stats.certificates),
      priority: 9
    });
  }

  // Progress (moyenne priorité)
  if (stats.overallProgress > 0) {
    achievements.push({
      phrase: achievementPhrases[2].text.replace('{percent}', stats.overallProgress.toString()),
      priority: 7
    });
  }

  // Leçons complétées (moyenne priorité)
  if (stats.completedLessons > 0) {
    achievements.push({
      phrase: formatAchievementPhrase(achievementPhrases[0].text, stats.completedLessons),
      priority: 6
    });
  }

  // Modules complétés (moyenne priorité)
  if (stats.completedModules > 0) {
    achievements.push({
      phrase: formatAchievementPhrase(achievementPhrases[4].text, stats.completedModules),
      priority: 6
    });
  }

  // Si on a des achievements, prendre celui avec la plus haute priorité
  if (achievements.length > 0) {
    achievements.sort((a, b) => b.priority - a.priority);
    return achievements[0].phrase;
  }

  // Fallback : phrase de motivation générique
  const randomIndex = Math.floor(Math.random() * motivationPhrases.length);
  return motivationPhrases[randomIndex].text;
};

/**
 * Formate une phrase d'achievement avec le bon pluriel
 */
const formatAchievementPhrase = (template: string, count: number): string => {
  let result = template.replace('{count}', count.toString());
  
  // Gestion du pluriel pour {s}
  result = result.replace(/\{s\}/g, count > 1 ? 's' : '');
  
  return result;
};

/**
 * Récupère une phrase de bienvenue aléatoire (pour nouveaux users)
 */
export const getWelcomePhrase = (): string => {
  const randomIndex = Math.floor(Math.random() * welcomePhrases.length);
  return welcomePhrases[randomIndex].text;
};

/**
 * Récupère une phrase de motivation aléatoire
 */
export const getMotivationPhrase = (): string => {
  const randomIndex = Math.floor(Math.random() * motivationPhrases.length);
  return motivationPhrases[randomIndex].text;
};

// ========================================
// 💡 EXEMPLES D'UTILISATION
// ========================================

/*
// Nouvel utilisateur
const newUserStats: UserStats = {
  completedLessons: 0,
  badges: 0,
  overallProgress: 0,
  currentStreak: 0,
  completedModules: 0,
  certificates: 0,
  isNewUser: true
};
console.log(getDescriptivePhrase(newUserStats));
// Output: "Votre parcours d'apprentissage commence ici."

// Utilisateur avec achievements
const activeUserStats: UserStats = {
  completedLessons: 15,
  badges: 3,
  overallProgress: 68,
  currentStreak: 7,
  completedModules: 2,
  certificates: 1,
  isNewUser: false
};
console.log(getDescriptivePhrase(activeUserStats));
// Output: "7 jours consécutifs, votre engagement fait la différence."
// (Priorise le streak car c'est le plus impressionnant)
*/
