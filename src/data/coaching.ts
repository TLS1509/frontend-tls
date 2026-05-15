/**
 * Mock Coaching data (Cahier #04).
 * Sessions coaching 1-1 + corrections itératives.
 */

import type { CoachingSession, Correction } from '../types/learning';
import { MOCK_USER_ID } from './passeport';

export const MOCK_COACH_ID = 'coach-sophie';

export const MOCK_COACHING_SESSIONS: CoachingSession[] = [
  {
    id: 'session-1',
    learnerId: MOCK_USER_ID,
    coachId: MOCK_COACH_ID,
    coachName: 'Sophie Marchand',
    coachSpeciality: 'Leadership & Développement managérial',
    type: 'classic',
    status: 'confirmed',
    scheduledAt: '2026-05-20T14:30:00Z',
    durationMinutes: 60,
    theme: 'Communication assertive en réunion',
    preQuestionnaireCompleted: false,
    xpAwarded: 120,
    createdAt: '2026-05-13T10:00:00Z',
  },
  {
    id: 'session-2',
    learnerId: MOCK_USER_ID,
    coachId: MOCK_COACH_ID,
    coachName: 'Sophie Marchand',
    coachSpeciality: 'Leadership & Développement managérial',
    type: 'classic',
    status: 'completed',
    scheduledAt: '2026-05-12T14:00:00Z',
    durationMinutes: 55,
    theme: 'Feedback & reconnaissance',
    preQuestionnaireCompleted: true,
    xpAwarded: 120,
    createdAt: '2026-05-05T09:00:00Z',
  },
  {
    id: 'session-3',
    learnerId: MOCK_USER_ID,
    coachId: MOCK_COACH_ID,
    coachName: 'Sophie Marchand',
    coachSpeciality: 'Leadership & Développement managérial',
    type: 'classic',
    status: 'completed',
    scheduledAt: '2026-04-28T14:00:00Z',
    durationMinutes: 60,
    theme: 'Leadership transformationnel',
    preQuestionnaireCompleted: true,
    xpAwarded: 120,
    createdAt: '2026-04-20T10:00:00Z',
  },
];

export const MOCK_CORRECTIONS: Correction[] = [
  {
    id: 'corr-1',
    learnerId: MOCK_USER_ID,
    coachId: MOCK_COACH_ID,
    sessionId: 'session-2',
    competenceId: 'communication',
    exerciseTitle: 'Analyse d\'une situation de management complexe',
    status: 'coach-feedback',
    submittedContent: 'Dans cette situation, j\'ai dû gérer un conflit entre deux membres de mon équipe qui avaient des visions différentes sur le projet. J\'ai choisi d\'organiser une réunion tripartite pour faciliter le dialogue.',
    coachFeedback: 'Bonne initiative de réunir les parties. Pour aller plus loin : comment as-tu préparé cet espace de dialogue ? Quels étaient tes critères de succès pour cette réunion ?',
    iterationCount: 1,
    submittedAt: '2026-05-10T11:00:00Z',
    updatedAt: '2026-05-11T14:00:00Z',
  },
  {
    id: 'corr-2',
    learnerId: MOCK_USER_ID,
    coachId: MOCK_COACH_ID,
    competenceId: 'leadership',
    exerciseTitle: 'Plan de délégation pour mon équipe',
    status: 'pending',
    submittedContent: 'Voici mon plan de délégation pour le mois de mai : identifier 3 tâches stratégiques à déléguer, choisir les collaborateurs selon leurs compétences et motivations, et mettre en place un suivi hebdomadaire.',
    iterationCount: 0,
    submittedAt: '2026-05-14T09:30:00Z',
    updatedAt: '2026-05-14T09:30:00Z',
  },
];
