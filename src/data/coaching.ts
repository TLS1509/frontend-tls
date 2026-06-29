/**
 * Mock Coaching data (Cahier #04).
 * Sessions coaching 1-1 + corrections itératives.
 */

import type { CoachingSession, Correction, CoachRecommendation } from '../types/learning';
import { MOCK_USER_ID } from './passeport';

export const MOCK_COACH_ID = 'coach-sophie';

export const MOCK_COACH = {
  name: 'Sophie Marchand',
  role: 'Expert Leadership & Pédagogie',
  bio: 'Spécialiste développement managérial et accompagnement 1:1 orienté mise en pratique sur vos cas réels.',
  specialties: ['Leadership', 'IA Générative', 'Design Pédagogique'],
  email: 'sophie.marchand@thelearningsociety.com',
  rating: 4.9,
  ratingCount: 42,
  sessions: '156',
};

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
    exerciseTitle: "Analyse d'une situation de management complexe",
    status: 'coach-feedback',
    submittedContent: "Dans cette situation, j'ai dû gérer un conflit entre deux membres de mon équipe qui avaient des visions différentes sur le projet. J'ai choisi d'organiser une réunion tripartite pour faciliter le dialogue.",
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
    submittedContent: "Voici mon plan de délégation pour le mois de mai : identifier 3 tâches stratégiques à déléguer, choisir les collaborateurs selon leurs compétences et motivations, et mettre en place un suivi hebdomadaire.",
    iterationCount: 0,
    submittedAt: '2026-05-14T09:30:00Z',
    updatedAt: '2026-05-14T09:30:00Z',
  },
  // Phase 16.4 #1+#2 — additional learners so coach views have a realistic queue.
  {
    id: 'corr-3',
    learnerId: 'sophie-martin',
    coachId: MOCK_COACH_ID,
    competenceId: 'leadership',
    exerciseTitle: 'Étude de cas : délégation et feedback',
    status: 'pending',
    submittedContent: "J'ai appliqué le modèle situationnel en adaptant mon style de management selon le profil de chaque collaborateur. Ma rétro porte surtout sur les 2 cas où j'ai dû basculer du directif au délégatif.",
    iterationCount: 0,
    submittedAt: '2026-05-18T08:00:00Z',
    updatedAt: '2026-05-18T08:00:00Z',
  },
  {
    id: 'corr-4',
    learnerId: 'pierre-bernard',
    coachId: MOCK_COACH_ID,
    competenceId: 'analyse',
    exerciseTitle: "Rapport d'auto-évaluation Dreyfus",
    status: 'in-review',
    submittedContent: 'Mon auto-évaluation porte sur les 6 compétences clés. Je détaille les évidences concrètes du mois écoulé qui justifient mes positionnements D1→D2.',
    iterationCount: 1,
    submittedAt: '2026-05-16T14:00:00Z',
    updatedAt: '2026-05-17T09:30:00Z',
  },
  {
    id: 'corr-5',
    learnerId: 'nadia-ferreira',
    coachId: MOCK_COACH_ID,
    competenceId: 'analyse',
    exerciseTitle: 'Plan de communication interne',
    status: 'completed',
    submittedContent: "Le plan s'articule autour de trois canaux principaux : les all-hands mensuels, la newsletter hebdomadaire et un canal Slack dédié aux annonces produit.",
    coachFeedback: 'Très solide. Mention spéciale pour la matrice RACI annexée — clarté exemplaire.',
    learnerResponse: 'Merci ! Je vais déployer ça dès la semaine prochaine.',
    iterationCount: 2,
    xpAwarded: 80,
    submittedAt: '2026-05-12T10:00:00Z',
    updatedAt: '2026-05-15T16:00:00Z',
  },
  {
    id: 'corr-6',
    learnerId: 'julien-moreau',
    coachId: MOCK_COACH_ID,
    competenceId: 'communication',
    exerciseTitle: 'Atelier leadership équipe',
    status: 'pending',
    submittedContent: "Compte-rendu de l'atelier de 2h que j'ai animé hier avec les 8 managers de mon département : objectifs, séquencement, points de friction et next steps.",
    iterationCount: 0,
    submittedAt: '2026-05-19T11:30:00Z',
    updatedAt: '2026-05-19T11:30:00Z',
  },
];

/** Items recommandés par le coach à l'apprenant (affichés sur /coaching/recommendations). */
export const MOCK_COACH_RECOMMENDATIONS: CoachRecommendation[] = [
  {
    id: 'reco-1',
    learnerId: MOCK_USER_ID,
    type: 'article',
    title: 'Les 7 habitudes des leaders authentiques',
    reason:
      "Tu m'as dit que tu voulais travailler ton leadership. Ce papier de Bill George est une référence pour structurer ta réflexion sur ton style personnel.",
    coachName: 'Marie Dubois',
    coachInitials: 'MD',
    duration: '15 min',
    competence: 'Leadership',
    date: 'il y a 2 jours',
  },
  {
    id: 'reco-2',
    learnerId: MOCK_USER_ID,
    type: 'video',
    title: 'Storytelling pour managers : Stanford GSB',
    reason:
      "Suite à notre dernière session sur ta présentation Q2, ce talk va beaucoup t'aider à structurer tes pitchs.",
    coachName: 'Marie Dubois',
    coachInitials: 'MD',
    duration: '22 min',
    competence: 'Communication',
    date: 'il y a 4 jours',
  },
  {
    id: 'reco-3',
    learnerId: MOCK_USER_ID,
    type: 'lesson',
    title: 'Module : Décisions sous incertitude',
    reason:
      "Tu m'as parlé du dilemme stratégique sur le projet TLS 2027. Ce module va te donner un cadre de réflexion concret.",
    coachName: 'Marie Dubois',
    coachInitials: 'MD',
    duration: '45 min',
    competence: 'Stratégie',
    date: 'il y a 1 semaine',
  },
];
