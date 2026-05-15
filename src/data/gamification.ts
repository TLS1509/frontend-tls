/**
 * Mock Gamification data (Cahier #05).
 * 3 types de badges : plateforme / open_badge / competence
 * Triggers XP, streak, events timeline.
 */

import type { BadgeDef, UserBadge, XPEvent, UserStreak } from '../types/learning';

export const MOCK_USER_ID_GAMIF = 'user-demo';

// ─── Référentiel badges ───────────────────────────────────────────────────────

export const BADGE_DEFS: BadgeDef[] = [
  // ── Plateforme (engagement, streaks, milestones)
  {
    id: 'streak-7',
    type: 'plateforme',
    name: '7 jours de streak',
    description: 'Connecté 7 jours consécutifs sur la plateforme.',
    xpValue: 100,
    criteria: ['Se connecter 7 jours consécutifs'],
  },
  {
    id: 'streak-14',
    type: 'plateforme',
    name: '2 semaines de streak',
    description: 'Connecté 14 jours consécutifs.',
    xpValue: 200,
    criteria: ['Se connecter 14 jours consécutifs'],
  },
  {
    id: 'streak-30',
    type: 'plateforme',
    name: '1 mois de streak',
    description: 'Connecté 30 jours consécutifs — performance exceptionnelle !',
    xpValue: 500,
    criteria: ['Se connecter 30 jours consécutifs'],
  },
  {
    id: 'first-parcours',
    type: 'plateforme',
    name: 'Premier parcours',
    description: 'Premier parcours complété avec succès.',
    xpValue: 300,
    criteria: ['Terminer un premier parcours'],
  },
  {
    id: 'xp-1000',
    type: 'plateforme',
    name: 'Dépassé 1 000 XP',
    description: 'Franchissement du cap des 1 000 XP.',
    xpValue: 150,
    criteria: ['Accumuler 1 000 XP total'],
  },

  // ── Open Badges (IMS v2, certifiés, exportables)
  {
    id: 'ob-leadership-foundation',
    type: 'open_badge',
    name: 'Leadership Fondamentaux',
    description: 'Certification Open Badge — Parcours Leadership niveau fondation complété. Vérifiable via IMS Open Badges v2.',
    competenceId: 'leadership',
    xpValue: 500,
    criteria: [
      'Compléter 100% du parcours Leadership Fondamentaux',
      'Score moyen ≥ 75% sur les exercices',
      'Validation coach sur au moins 2 livrables',
    ],
  },
  {
    id: 'ob-communication',
    type: 'open_badge',
    name: 'Communication Assertive',
    description: 'Certification Open Badge — Communication & Influence niveau 2.',
    competenceId: 'communication',
    xpValue: 400,
    criteria: [
      'Compléter le parcours Communication',
      'Soumettre et valider 1 exercice pratique',
    ],
  },
  {
    id: 'ob-project-mgmt',
    type: 'open_badge',
    name: 'Gestion de Projet',
    description: 'Certification Open Badge — Pilotage de projet, niveau compétent.',
    competenceId: 'project_mgmt',
    xpValue: 400,
    criteria: [
      'Compléter le parcours Gestion de Projet',
      'Valider 2 exercices de planification',
    ],
  },

  // ── Compétences (Dreyfus badges par niveau)
  {
    id: 'comp-leadership-d3',
    type: 'competence',
    name: 'Leadership — Compétent',
    description: 'Maîtrise du niveau D3 (Compétent) en Leadership & Management.',
    competenceId: 'leadership',
    dreyfusLevel: 3,
    xpValue: 500,
    criteria: [
      'Atteindre Dreyfus D3 en Leadership',
      'Valider 3 exercices pratiques ≥ 75%',
      "Obtenir l'évaluation D3 de ton coach",
    ],
  },
  {
    id: 'comp-communication-d4',
    type: 'competence',
    name: 'Communication — Expert',
    description: 'Maîtrise du niveau D4 (Expert) en Communication & Influence.',
    competenceId: 'communication',
    dreyfusLevel: 4,
    xpValue: 700,
    criteria: [
      'Atteindre Dreyfus D4 en Communication',
      'Valider une masterclass Communication',
    ],
  },
  {
    id: 'comp-analyse-d2',
    type: 'competence',
    name: 'Analyse & Décision — Apprenant',
    description: 'Niveau D2 (Apprenant) en Analyse & Décision validé.',
    competenceId: 'analyse',
    dreyfusLevel: 2,
    xpValue: 200,
    criteria: ['Atteindre Dreyfus D2 en Analyse & Décision'],
  },
];

// ─── Badges gagnés par l'utilisateur ─────────────────────────────────────────

export const MOCK_USER_BADGES: UserBadge[] = [
  { userId: MOCK_USER_ID_GAMIF, badgeId: 'streak-7',              earnedAt: '2026-05-08T10:00:00Z', xpAwarded: 100 },
  { userId: MOCK_USER_ID_GAMIF, badgeId: 'streak-14',             earnedAt: '2026-05-08T10:00:00Z', xpAwarded: 200 },
  { userId: MOCK_USER_ID_GAMIF, badgeId: 'first-parcours',        earnedAt: '2026-04-10T14:00:00Z', xpAwarded: 300 },
  { userId: MOCK_USER_ID_GAMIF, badgeId: 'ob-leadership-foundation', earnedAt: '2026-03-15T11:00:00Z', xpAwarded: 500 },
  { userId: MOCK_USER_ID_GAMIF, badgeId: 'ob-communication',      earnedAt: '2026-02-28T09:00:00Z', xpAwarded: 400 },
  { userId: MOCK_USER_ID_GAMIF, badgeId: 'comp-leadership-d3',    earnedAt: '2026-03-28T10:00:00Z', xpAwarded: 500 },
  { userId: MOCK_USER_ID_GAMIF, badgeId: 'comp-communication-d4', earnedAt: '2026-05-03T14:00:00Z', xpAwarded: 700 },
  { userId: MOCK_USER_ID_GAMIF, badgeId: 'comp-analyse-d2',       earnedAt: '2026-01-15T09:00:00Z', xpAwarded: 200 },
];

// ─── Événements XP ────────────────────────────────────────────────────────────

export const MOCK_XP_EVENTS: XPEvent[] = [
  { id: 'xp-1', userId: MOCK_USER_ID_GAMIF, trigger: 'lesson_complete',   xp: 80,  description: 'Leçon terminée — Leadership : Donner du feedback', occurredAt: '2026-05-13T10:00:00Z' },
  { id: 'xp-2', userId: MOCK_USER_ID_GAMIF, trigger: 'coaching_session',  xp: 120, description: 'Session coaching validée avec Sophie Martin',        occurredAt: '2026-05-12T14:00:00Z' },
  { id: 'xp-3', userId: MOCK_USER_ID_GAMIF, trigger: 'journal_entry',     xp: 20,  description: 'Entrée journal réflexif complétée',                  occurredAt: '2026-05-11T09:00:00Z' },
  { id: 'xp-4', userId: MOCK_USER_ID_GAMIF, trigger: 'badge_earned',      xp: 200, description: 'Badge débloqué — Communication Expert D4',           occurredAt: '2026-05-10T16:00:00Z' },
  { id: 'xp-5', userId: MOCK_USER_ID_GAMIF, trigger: 'parcours_complete', xp: 300, description: 'Parcours terminé — Communication Fondamentaux',      occurredAt: '2026-05-09T11:00:00Z' },
  { id: 'xp-6', userId: MOCK_USER_ID_GAMIF, trigger: 'quiz_perfect',      xp: 50,  description: 'Quiz réussi à 100% — Prise de décision',             occurredAt: '2026-05-08T14:00:00Z' },
  { id: 'xp-7', userId: MOCK_USER_ID_GAMIF, trigger: 'jac_validated',     xp: 150, description: 'JAC validé — Communication écrite',                  occurredAt: '2026-05-05T10:00:00Z' },
  { id: 'xp-8', userId: MOCK_USER_ID_GAMIF, trigger: 'dreyfus_up',        xp: 500, description: 'Dreyfus D3 → D3 Leadership validé',                  occurredAt: '2026-03-28T10:00:00Z' },
];

// ─── Streak utilisateur ───────────────────────────────────────────────────────

export const MOCK_USER_STREAK: UserStreak = {
  userId: MOCK_USER_ID_GAMIF,
  currentStreak: 18,
  longestStreak: 24,
  lastActivityAt: '2026-05-15T08:00:00Z',
  totalXP: 4820,
  currentLevel: 12,
};

// ─── Helpers ──────────────────────────────────────────────────────────────────

export const getBadgeDefById = (id: string): BadgeDef | undefined =>
  BADGE_DEFS.find((b) => b.id === id);

export const XP_PER_TRIGGER: Record<string, number> = {
  lesson_complete: 80,
  parcours_complete: 300,
  coaching_session: 120,
  journal_entry: 20,
  badge_earned: 200,
  quiz_perfect: 50,
  streak_milestone: 100,
  jac_validated: 150,
  dreyfus_up: 500,
};
