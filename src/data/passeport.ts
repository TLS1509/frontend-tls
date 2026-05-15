/**
 * Mock Passeport Compétences data (Cahier #02).
 * Source de vérité FO MVP — à remplacer par API en V1.
 *
 * Entités :
 *  - MOCK_LEARNER_COMPETENCIES : niveaux courants apprenant
 *  - MOCK_COMPETENCY_OBJECTIVES : objectifs de montée en niveau
 *  - MOCK_COMPETENCY_PROGRESSIONS : timeline d'événements Passeport
 */

import type {
  LearnerCompetency,
  CompetencyObjective,
  CompetencyProgression,
} from '../types/learning';

export const MOCK_USER_ID = 'user-demo';

// ─── Niveaux courants (LearnerCompetency) ─────────────────────────────────────

export const MOCK_LEARNER_COMPETENCIES: LearnerCompetency[] = [
  {
    userId: MOCK_USER_ID,
    competenceId: 'leadership',
    currentLevel: 3,
    targetLevel: 5,
    points: 320,
    nextLevelPoints: 500,
    daysSinceActivity: 45,
    lastUpdated: '2026-03-28T10:00:00Z',
  },
  {
    userId: MOCK_USER_ID,
    competenceId: 'communication',
    currentLevel: 4,
    targetLevel: 4,
    points: 480,
    nextLevelPoints: 500,
    daysSinceActivity: 12,
    lastUpdated: '2026-05-03T14:30:00Z',
  },
  {
    userId: MOCK_USER_ID,
    competenceId: 'analyse',
    currentLevel: 2,
    targetLevel: 4,
    points: 190,
    nextLevelPoints: 300,
    daysSinceActivity: 120,
    lastUpdated: '2026-01-15T09:00:00Z',
  },
  {
    userId: MOCK_USER_ID,
    competenceId: 'tech_tools',
    currentLevel: 4,
    targetLevel: 5,
    points: 460,
    nextLevelPoints: 500,
    daysSinceActivity: 3,
    lastUpdated: '2026-05-12T16:45:00Z',
  },
  {
    userId: MOCK_USER_ID,
    competenceId: 'creativity',
    currentLevel: 1,
    targetLevel: 3,
    points: 70,
    nextLevelPoints: 150,
    daysSinceActivity: 200,
    lastUpdated: '2025-11-01T08:00:00Z',
  },
  {
    userId: MOCK_USER_ID,
    competenceId: 'cooperation',
    currentLevel: 3,
    targetLevel: 4,
    points: 310,
    nextLevelPoints: 400,
    daysSinceActivity: 30,
    lastUpdated: '2026-04-15T11:00:00Z',
  },
];

// ─── Objectifs (CompetencyObjective) ─────────────────────────────────────────

export const MOCK_COMPETENCY_OBJECTIVES: CompetencyObjective[] = [
  {
    id: 'obj-1',
    userId: MOCK_USER_ID,
    competenceId: 'leadership',
    targetLevel: 5,
    startLevel: 3,
    status: 'active',
    deadline: '2026-12-01',
    progressPct: 60,
    milestones: [
      { id: 'a', label: 'Valider D3 (Compétent)', done: true },
      { id: 'b', label: 'Compléter le parcours Leadership avancé', done: false },
      { id: 'c', label: 'Session coaching + évaluation 360°', done: false },
      { id: 'd', label: 'Valider D4 (Expert)', done: false },
    ],
    createdAt: '2026-01-10T09:00:00Z',
  },
  {
    id: 'obj-2',
    userId: MOCK_USER_ID,
    competenceId: 'analyse',
    targetLevel: 4,
    startLevel: 2,
    status: 'active',
    deadline: '2026-09-01',
    progressPct: 25,
    milestones: [
      { id: 'a', label: 'Compléter les 3 modules Analyse', done: false },
      { id: 'b', label: 'Exercice pratique : cas décisionnel', done: false },
      { id: 'c', label: 'Valider D3 (Compétent)', done: false },
    ],
    createdAt: '2026-02-01T10:00:00Z',
  },
  {
    id: 'obj-3',
    userId: MOCK_USER_ID,
    competenceId: 'creativity',
    targetLevel: 3,
    startLevel: 1,
    status: 'draft',
    deadline: '2027-01-01',
    progressPct: 10,
    milestones: [],
    createdAt: '2026-04-20T15:00:00Z',
  },
];

// ─── Timeline Passeport (CompetencyProgression) ───────────────────────────────

export const MOCK_COMPETENCY_PROGRESSIONS: CompetencyProgression[] = [
  {
    id: 'ev-1',
    userId: MOCK_USER_ID,
    type: 'dreyfus-up',
    competenceId: 'product',
    title: 'Stratégie produit : D2 → D3',
    detail: 'Validé suite à la mission TLS 2027',
    newLevel: 3,
    occurredAt: '2026-05-12T10:00:00Z',
  },
  {
    id: 'ev-2',
    userId: MOCK_USER_ID,
    type: 'jac',
    competenceId: 'communication',
    title: 'JAC validé : Communication écrite',
    detail: 'Mission Acme Corp · Validé par Pierre L.',
    occurredAt: '2026-05-05T14:00:00Z',
  },
  {
    id: 'ev-3',
    userId: MOCK_USER_ID,
    type: 'mission',
    competenceId: 'tech_tools',
    title: 'Mission terminée : Plan CRM',
    detail: '4 semaines · 5 livrables · 92% satisfaction',
    occurredAt: '2026-04-20T09:00:00Z',
  },
  {
    id: 'ev-4',
    userId: MOCK_USER_ID,
    type: 'formation',
    competenceId: 'leadership',
    title: 'Parcours complété : Leadership 360°',
    detail: '8 modules · 24 leçons · Badge Or débloqué',
    occurredAt: '2026-04-10T11:00:00Z',
  },
  {
    id: 'ev-5',
    userId: MOCK_USER_ID,
    type: 'dreyfus-up',
    competenceId: 'leadership',
    title: 'Leadership : D2 → D3',
    detail: 'Validé après parcours + 360° peer review',
    newLevel: 3,
    occurredAt: '2026-03-28T10:00:00Z',
  },
  {
    id: 'ev-6',
    userId: MOCK_USER_ID,
    type: 'mission',
    competenceId: 'cooperation',
    title: 'Mission terminée : Onboarding partenaires',
    detail: '6 semaines · Mission collaborative',
    occurredAt: '2026-03-15T09:00:00Z',
  },
];
