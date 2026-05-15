import type { LearnerAnalyticsProfile, CoachTeamStats, ItemCompletionRecord } from '../types/learning';

// Coach demo ID (matches enterprise mock data)
export const MOCK_COACH_ID = 'coach-demo';

// ─── Completion records (shared across learners) ──────────────────────────────

const completionsNadia: ItemCompletionRecord[] = [
  { id: 'c1', itemId: 'item-1', itemLabel: 'Leadership situationnel', itemType: 'Leçon', completedAt: new Date(Date.now() - 1 * 86400000).toISOString(), timeSpentMinutes: 32, npsGiven: 9, xpEarned: 25 },
  { id: 'c2', itemId: 'item-2', itemLabel: 'Coaching individuel — bilan D4', itemType: 'Session', completedAt: new Date(Date.now() - 4 * 86400000).toISOString(), timeSpentMinutes: 60, npsGiven: 8, xpEarned: 100 },
  { id: 'c3', itemId: 'item-3', itemLabel: 'Cas pratique : délégation avancée', itemType: 'Exercice', completedAt: new Date(Date.now() - 7 * 86400000).toISOString(), timeSpentMinutes: 45, npsGiven: 9, xpEarned: 50 },
];

const completionsCamille: ItemCompletionRecord[] = [
  { id: 'c4', itemId: 'item-4', itemLabel: 'Stratégie commerciale B2B', itemType: 'Leçon', completedAt: new Date(Date.now() - 1 * 86400000).toISOString(), timeSpentMinutes: 40, npsGiven: 10, xpEarned: 25 },
  { id: 'c5', itemId: 'item-5', itemLabel: 'Négociation avancée', itemType: 'Exercice', completedAt: new Date(Date.now() - 3 * 86400000).toISOString(), timeSpentMinutes: 55, npsGiven: 9, xpEarned: 50 },
];

const completionsSophie: ItemCompletionRecord[] = [
  { id: 'c6', itemId: 'item-1', itemLabel: 'Leadership situationnel', itemType: 'Leçon', completedAt: new Date(Date.now() - 2 * 86400000).toISOString(), timeSpentMinutes: 35, npsGiven: 7, xpEarned: 25 },
  { id: 'c7', itemId: 'item-6', itemLabel: 'Coaching — bilan D3', itemType: 'Session', completedAt: new Date(Date.now() - 5 * 86400000).toISOString(), timeSpentMinutes: 60, npsGiven: 8, xpEarned: 100 },
  { id: 'c8', itemId: 'item-7', itemLabel: 'Feedback 360° en pratique', itemType: 'Leçon', completedAt: new Date(Date.now() - 12 * 86400000).toISOString(), timeSpentMinutes: 28, npsGiven: 6, xpEarned: 25 },
];

const completionsPierre: ItemCompletionRecord[] = [
  { id: 'c9', itemId: 'item-8', itemLabel: 'Analyse financière', itemType: 'Leçon', completedAt: new Date(Date.now() - 6 * 86400000).toISOString(), timeSpentMinutes: 42, npsGiven: 5, xpEarned: 25 },
];

const completionsMarie: ItemCompletionRecord[] = [
  { id: 'c10', itemId: 'item-9', itemLabel: 'Python — boucles avancées', itemType: 'Leçon', completedAt: new Date(Date.now() - 3 * 86400000).toISOString(), timeSpentMinutes: 30, npsGiven: 4, feedbackText: 'Trop rapide, exemples peu clairs', xpEarned: 25 },
  { id: 'c11', itemId: 'item-10', itemLabel: 'Python — bases', itemType: 'Leçon', completedAt: new Date(Date.now() - 5 * 86400000).toISOString(), timeSpentMinutes: 45, npsGiven: 6, xpEarned: 25 },
];

const completionsThomas: ItemCompletionRecord[] = [
  { id: 'c12', itemId: 'item-11', itemLabel: 'Data analyse — intro', itemType: 'Leçon', completedAt: new Date(Date.now() - 10 * 86400000).toISOString(), timeSpentMinutes: 38, npsGiven: 7, xpEarned: 25 },
];

// ─── Learner analytics profiles ───────────────────────────────────────────────

export const MOCK_LEARNER_PROFILES: LearnerAnalyticsProfile[] = [
  {
    userId: 'learner-001',
    name: 'Nadia Ferreira',
    initials: 'NF',
    role: 'Directrice Marketing',
    status: 'on-track',
    dreyfusAvg: 4.1,
    progressPercent: 82,
    lastActivityAt: new Date(Date.now() - 1 * 86400000).toISOString(),
    daysSinceActivity: 1,
    streak: 21,
    totalXp: 2340,
    sessionsCompleted: 7,
    correctionsReceived: 12,
    competencyScores: [
      { competencyId: 'leadership', label: 'Leadership', current: 4, target: 5 },
      { competencyId: 'communication', label: 'Communication', current: 4, target: 4 },
      { competencyId: 'analyse', label: 'Analyse', current: 3, target: 4 },
      { competencyId: 'tech', label: 'Tech & Outils', current: 4, target: 4 },
      { competencyId: 'creativite', label: 'Créativité', current: 3, target: 4 },
      { competencyId: 'cooperation', label: 'Coopération', current: 4, target: 5 },
    ],
    recentCompletions: completionsNadia,
  },
  {
    userId: 'learner-002',
    name: 'Camille Durand',
    initials: 'CD',
    role: 'Directrice Commerciale',
    status: 'on-track',
    dreyfusAvg: 4.4,
    progressPercent: 90,
    lastActivityAt: new Date(Date.now() - 1 * 86400000).toISOString(),
    daysSinceActivity: 1,
    streak: 28,
    totalXp: 3120,
    sessionsCompleted: 9,
    correctionsReceived: 15,
    competencyScores: [
      { competencyId: 'leadership', label: 'Leadership', current: 5, target: 5 },
      { competencyId: 'communication', label: 'Communication', current: 5, target: 5 },
      { competencyId: 'analyse', label: 'Analyse', current: 4, target: 4 },
      { competencyId: 'tech', label: 'Tech & Outils', current: 3, target: 4 },
      { competencyId: 'creativite', label: 'Créativité', current: 4, target: 4 },
      { competencyId: 'cooperation', label: 'Coopération', current: 4, target: 5 },
    ],
    recentCompletions: completionsCamille,
  },
  {
    userId: 'learner-003',
    name: 'Sophie Martin',
    initials: 'SM',
    role: 'Manager d\'équipe · Secteur IT',
    status: 'on-track',
    dreyfusAvg: 3.2,
    progressPercent: 65,
    lastActivityAt: new Date(Date.now() - 2 * 86400000).toISOString(),
    daysSinceActivity: 2,
    streak: 14,
    totalXp: 1240,
    sessionsCompleted: 5,
    correctionsReceived: 8,
    competencyScores: [
      { competencyId: 'leadership', label: 'Leadership', current: 3, target: 5 },
      { competencyId: 'communication', label: 'Communication', current: 4, target: 4 },
      { competencyId: 'analyse', label: 'Analyse', current: 2, target: 4 },
      { competencyId: 'tech', label: 'Tech & Outils', current: 4, target: 5 },
      { competencyId: 'creativite', label: 'Créativité', current: 2, target: 3 },
      { competencyId: 'cooperation', label: 'Coopération', current: 3, target: 4 },
    ],
    recentCompletions: completionsSophie,
  },
  {
    userId: 'learner-004',
    name: 'Pierre Bernard',
    initials: 'PB',
    role: 'Responsable Finances',
    status: 'at-risk',
    dreyfusAvg: 2.4,
    progressPercent: 38,
    lastActivityAt: new Date(Date.now() - 6 * 86400000).toISOString(),
    daysSinceActivity: 6,
    streak: 3,
    totalXp: 560,
    sessionsCompleted: 2,
    correctionsReceived: 3,
    competencyScores: [
      { competencyId: 'leadership', label: 'Leadership', current: 2, target: 4 },
      { competencyId: 'communication', label: 'Communication', current: 3, target: 4 },
      { competencyId: 'analyse', label: 'Analyse', current: 3, target: 4 },
      { competencyId: 'tech', label: 'Tech & Outils', current: 2, target: 3 },
      { competencyId: 'creativite', label: 'Créativité', current: 1, target: 3 },
      { competencyId: 'cooperation', label: 'Coopération', current: 2, target: 3 },
    ],
    recentCompletions: completionsPierre,
  },
  {
    userId: 'learner-005',
    name: 'Marie Dupont',
    initials: 'MD',
    role: 'Développeuse Backend',
    status: 'at-risk',
    dreyfusAvg: 2.1,
    progressPercent: 42,
    lastActivityAt: new Date(Date.now() - 3 * 86400000).toISOString(),
    daysSinceActivity: 3,
    streak: 5,
    totalXp: 420,
    sessionsCompleted: 2,
    correctionsReceived: 4,
    competencyScores: [
      { competencyId: 'leadership', label: 'Leadership', current: 1, target: 3 },
      { competencyId: 'communication', label: 'Communication', current: 2, target: 3 },
      { competencyId: 'analyse', label: 'Analyse', current: 3, target: 4 },
      { competencyId: 'tech', label: 'Tech & Outils', current: 3, target: 5 },
      { competencyId: 'creativite', label: 'Créativité', current: 2, target: 3 },
      { competencyId: 'cooperation', label: 'Coopération', current: 2, target: 3 },
    ],
    recentCompletions: completionsMarie,
  },
  {
    userId: 'learner-006',
    name: 'Thomas Renard',
    initials: 'TR',
    role: 'Chef de Projet Digital',
    status: 'at-risk',
    dreyfusAvg: 2.6,
    progressPercent: 48,
    lastActivityAt: new Date(Date.now() - 10 * 86400000).toISOString(),
    daysSinceActivity: 10,
    streak: 0,
    totalXp: 780,
    sessionsCompleted: 3,
    correctionsReceived: 5,
    competencyScores: [
      { competencyId: 'leadership', label: 'Leadership', current: 2, target: 4 },
      { competencyId: 'communication', label: 'Communication', current: 3, target: 4 },
      { competencyId: 'analyse', label: 'Analyse', current: 3, target: 5 },
      { competencyId: 'tech', label: 'Tech & Outils', current: 3, target: 4 },
      { competencyId: 'creativite', label: 'Créativité', current: 2, target: 3 },
      { competencyId: 'cooperation', label: 'Coopération', current: 2, target: 4 },
    ],
    recentCompletions: completionsThomas,
  },
  {
    userId: 'learner-007',
    name: 'Isabelle Morin',
    initials: 'IM',
    role: 'Responsable RH',
    status: 'stuck',
    dreyfusAvg: 1.8,
    progressPercent: 15,
    lastActivityAt: new Date(Date.now() - 18 * 86400000).toISOString(),
    daysSinceActivity: 18,
    streak: 0,
    totalXp: 120,
    sessionsCompleted: 1,
    correctionsReceived: 1,
    competencyScores: [
      { competencyId: 'leadership', label: 'Leadership', current: 1, target: 3 },
      { competencyId: 'communication', label: 'Communication', current: 2, target: 4 },
      { competencyId: 'analyse', label: 'Analyse', current: 2, target: 3 },
      { competencyId: 'tech', label: 'Tech & Outils', current: 1, target: 3 },
      { competencyId: 'creativite', label: 'Créativité', current: 2, target: 3 },
      { competencyId: 'cooperation', label: 'Coopération', current: 2, target: 3 },
    ],
    recentCompletions: [],
  },
  {
    userId: 'learner-008',
    name: 'Laurent Petit',
    initials: 'LP',
    role: 'Ingénieur Logiciel',
    status: 'stuck',
    dreyfusAvg: 2.0,
    progressPercent: 12,
    lastActivityAt: new Date(Date.now() - 25 * 86400000).toISOString(),
    daysSinceActivity: 25,
    streak: 0,
    totalXp: 80,
    sessionsCompleted: 1,
    correctionsReceived: 0,
    competencyScores: [
      { competencyId: 'leadership', label: 'Leadership', current: 1, target: 3 },
      { competencyId: 'communication', label: 'Communication', current: 2, target: 3 },
      { competencyId: 'analyse', label: 'Analyse', current: 2, target: 4 },
      { competencyId: 'tech', label: 'Tech & Outils', current: 3, target: 5 },
      { competencyId: 'creativite', label: 'Créativité', current: 1, target: 2 },
      { competencyId: 'cooperation', label: 'Coopération', current: 1, target: 3 },
    ],
    recentCompletions: [],
  },
];

// ─── Team stats (derived from profiles) ──────────────────────────────────────

export const MOCK_COACH_TEAM_STATS: CoachTeamStats = {
  totalLearners: MOCK_LEARNER_PROFILES.length,
  activeLearners: MOCK_LEARNER_PROFILES.filter((l) => l.daysSinceActivity <= 7).length,
  atRiskCount: MOCK_LEARNER_PROFILES.filter((l) => l.status === 'at-risk').length,
  stuckCount: MOCK_LEARNER_PROFILES.filter((l) => l.status === 'stuck').length,
  avgDreyfus: Math.round((MOCK_LEARNER_PROFILES.reduce((s, l) => s + l.dreyfusAvg, 0) / MOCK_LEARNER_PROFILES.length) * 10) / 10,
  avgStreak: Math.round(MOCK_LEARNER_PROFILES.reduce((s, l) => s + l.streak, 0) / MOCK_LEARNER_PROFILES.length),
  sessionsThisMonth: 12,
  correctionsQueue: 4,
};
