import type {
  MasterclassStatus,
  MasterclassEnrollment,
  AtelierStatus,
  AtelierEnrollment,
  EvenementStatus,
  EvenementVisibility,
  EventRegistration,
  EventMode,
  ContentSurvey,
} from '../types/learning';

export const MOCK_USER_ID = 'user-demo';
export const MOCK_COACH_ID = 'coach-demo';

// ─── Masterclasses ────────────────────────────────────────────────────────────

export interface Masterclass {
  id: string;
  title: string;
  description: string;
  expertName: string;
  expertTitle: string;
  expertInitials: string;
  scheduledAt: string;
  durationMinutes: number;
  maxParticipants: number | null;
  enrolledCount: number;
  status: MasterclassStatus;
  xpAmount: number;
  xpCompetencyId?: string;
  vimeoVideoId?: string;
  vimeoEmbedCode?: string;
  googleMeetLink?: string;
  tags: string[];
}

export const MOCK_MASTERCLASSES: Masterclass[] = [
  {
    id: 'mc-001',
    title: 'Leadership situationnel : adapter son style en contexte incertain',
    description: 'Apprenez à moduler votre posture de leader selon la maturité de vos collaborateurs et la complexité de la situation. Cas pratiques en temps réel avec feedback du coach.',
    expertName: 'Sophie Beaumont',
    expertTitle: 'Executive Coach & PCC ICF',
    expertInitials: 'SB',
    scheduledAt: new Date(Date.now() + 7 * 86400000).toISOString(),
    durationMinutes: 90,
    maxParticipants: 100,
    enrolledCount: 72,
    status: 'scheduled',
    xpAmount: 150,
    xpCompetencyId: 'leadership',
    googleMeetLink: 'https://meet.google.com/mock-link-001',
    tags: ['Leadership', 'Management', 'Dreyfus 3+'],
  },
  {
    id: 'mc-002',
    title: 'Prompt Engineering avancé pour managers',
    description: 'Maîtrisez les techniques de prompting pour déléguer efficacement à l\'IA dans votre quotidien de manager : rapports, synthèses, préparation d\'entretiens.',
    expertName: 'Karim Lassouane',
    expertTitle: 'Expert IA & Transformation Digitale',
    expertInitials: 'KL',
    scheduledAt: new Date(Date.now() - 2 * 86400000).toISOString(),
    durationMinutes: 90,
    maxParticipants: 80,
    enrolledCount: 80,
    status: 'completed',
    xpAmount: 150,
    xpCompetencyId: 'ai_tools',
    vimeoVideoId: 'mock-vimeo-002',
    vimeoEmbedCode: '<iframe src="https://player.vimeo.com/video/mock-002" width="640" height="360" frameborder="0" allowfullscreen></iframe>',
    tags: ['IA', 'Prompt Engineering', 'Productivité'],
  },
  {
    id: 'mc-003',
    title: 'Feedback radical : donner et recevoir avec impact',
    description: 'La méthode SBI (Situation-Comportement-Impact) en pratique. Exercices en breakout rooms avec feedback immédiat du facilitateur.',
    expertName: 'Marie-Laure Favre',
    expertTitle: 'Coach & Formatrice Communication',
    expertInitials: 'MF',
    scheduledAt: new Date(Date.now() + 21 * 86400000).toISOString(),
    durationMinutes: 90,
    maxParticipants: 60,
    enrolledCount: 23,
    status: 'scheduled',
    xpAmount: 150,
    xpCompetencyId: 'communication',
    googleMeetLink: 'https://meet.google.com/mock-link-003',
    tags: ['Communication', 'Feedback', 'Leadership'],
  },
];

export const MOCK_MASTERCLASS_ENROLLMENTS: MasterclassEnrollment[] = [
  {
    enrollmentId: 'enr-mc-001',
    userId: MOCK_USER_ID,
    masterclassId: 'mc-002',
    status: 'completed',
    enrolledAt: new Date(Date.now() - 10 * 86400000).toISOString(),
    attendedLive: true,
    xpAwarded: true,
    xpCompetencyId: 'ai_tools',
  },
];

// ─── Ateliers Pratiques ───────────────────────────────────────────────────────

export interface AtelierPratique {
  id: string;
  title: string;
  description: string;
  companyId: string;
  companyName: string;
  coachName: string;
  coachInitials: string;
  scheduledAt: string;
  durationMinutes: number;
  mode: EventMode;
  location?: string;
  maxParticipants: number;
  enrolledCount: number;
  status: AtelierStatus;
  xpAmount: number;
  xpCompetencyId?: string;
  googleMeetLink?: string;
  tags: string[];
}

export const MOCK_ATELIERS: AtelierPratique[] = [
  {
    id: 'at-001',
    title: 'Atelier Feedback SBI — Équipe Tech',
    description: 'Formation pratique à la méthode SBI pour les managers de l\'équipe technique. Sessions en sous-groupes de 4 avec jeux de rôles supervisés.',
    companyId: 'company-demo',
    companyName: 'TechCorp SAS',
    coachName: 'Jean-Marc Pelletier',
    coachInitials: 'JP',
    scheduledAt: new Date(Date.now() + 5 * 86400000).toISOString(),
    durationMinutes: 180,
    mode: 'distanciel',
    maxParticipants: 12,
    enrolledCount: 9,
    status: 'published',
    xpAmount: 120,
    xpCompetencyId: 'communication',
    googleMeetLink: 'https://meet.google.com/mock-atelier-001',
    tags: ['Feedback', 'Communication', 'Management'],
  },
  {
    id: 'at-002',
    title: 'Atelier Leadership & IA — Comité de direction',
    description: 'Session immersive sur l\'intégration de l\'IA dans les pratiques managériales. Présentiel pour favoriser les interactions profondes.',
    companyId: 'company-demo',
    companyName: 'TechCorp SAS',
    coachName: 'Sophie Beaumont',
    coachInitials: 'SB',
    scheduledAt: new Date(Date.now() + 14 * 86400000).toISOString(),
    durationMinutes: 240,
    mode: 'presentiel',
    location: '12 rue de la Paix, 75001 Paris — Salle Montmartre',
    maxParticipants: 8,
    enrolledCount: 12,
    status: 'published',
    xpAmount: 200,
    xpCompetencyId: 'leadership',
    tags: ['Leadership', 'IA', 'Stratégie'],
  },
  {
    id: 'at-003',
    title: 'Atelier Gestion du changement',
    description: 'Modèles ADKAR et Kotter appliqués à votre contexte. Retour d\'expérience sur des transformations réelles.',
    companyId: 'company-demo',
    companyName: 'TechCorp SAS',
    coachName: 'Jean-Marc Pelletier',
    coachInitials: 'JP',
    scheduledAt: new Date(Date.now() - 30 * 86400000).toISOString(),
    durationMinutes: 180,
    mode: 'presentiel',
    location: '12 rue de la Paix, 75001 Paris — Salle Opéra',
    maxParticipants: 12,
    enrolledCount: 11,
    status: 'completed',
    xpAmount: 120,
    xpCompetencyId: 'strategy',
    tags: ['Changement', 'Management', 'Transformation'],
  },
];

export const MOCK_ATELIER_ENROLLMENTS: AtelierEnrollment[] = [
  {
    enrollmentId: 'enr-at-001',
    userId: MOCK_USER_ID,
    atelierId: 'at-001',
    status: 'validated',
    enrolledAt: new Date(Date.now() - 3 * 86400000).toISOString(),
    validatedAt: new Date(Date.now() - 2 * 86400000).toISOString(),
    attended: false,
    xpAwarded: false,
  },
  {
    enrollmentId: 'enr-at-002',
    userId: MOCK_USER_ID,
    atelierId: 'at-002',
    status: 'waitlist',
    waitlistPosition: 3,
    enrolledAt: new Date(Date.now() - 1 * 86400000).toISOString(),
    attended: false,
    xpAwarded: false,
  },
];

// ─── Événements ───────────────────────────────────────────────────────────────

export interface Evenement {
  id: string;
  title: string;
  description: string;
  organizerName: string;
  organizerInitials: string;
  scheduledAt: string;
  durationMinutes: number;
  mode: EventMode;
  location?: string;
  visibility: EvenementVisibility;
  companyId?: string;
  maxParticipants?: number;
  registeredCount: number;
  status: EvenementStatus;
  googleMeetLink?: string;
  tags: string[];
}

export const MOCK_EVENEMENTS: Evenement[] = [
  {
    id: 'ev-001',
    title: 'Conférence : L\'avenir du travail à l\'ère de l\'IA',
    description: 'Table ronde avec 3 experts du futur du travail : automatisation, compétences de demain, nouvelles formes d\'organisation. Ouvert à tous.',
    organizerName: 'The Learning Society',
    organizerInitials: 'TLS',
    scheduledAt: new Date(Date.now() + 10 * 86400000).toISOString(),
    durationMinutes: 120,
    mode: 'distanciel',
    visibility: 'public',
    maxParticipants: 500,
    registeredCount: 312,
    status: 'published',
    googleMeetLink: 'https://meet.google.com/mock-event-001',
    tags: ['IA', 'Futur du travail', 'Gratuit'],
  },
  {
    id: 'ev-002',
    title: 'Séminaire TechCorp : Bilan mi-année Leadership',
    description: 'Séminaire interne réservé aux managers TechCorp. Bilan des 6 premiers mois du programme Leadership & IA, perspectives H2.',
    organizerName: 'TechCorp SAS',
    organizerInitials: 'TC',
    scheduledAt: new Date(Date.now() + 3 * 86400000).toISOString(),
    durationMinutes: 180,
    mode: 'presentiel',
    location: 'TechCorp HQ — Salle Innovation, 12 rue de la Paix, Paris',
    visibility: 'private',
    companyId: 'company-demo',
    maxParticipants: 30,
    registeredCount: 24,
    status: 'published',
    tags: ['Bilan', 'Leadership', 'Entreprise'],
  },
  {
    id: 'ev-003',
    title: 'Masterclass ouverte : Donner du sens au travail',
    description: 'Viktor Frankl, Ikigaï, et les neurosciences du sens. Un événement inspirant pour retrouver sa boussole professionnelle.',
    organizerName: 'The Learning Society',
    organizerInitials: 'TLS',
    scheduledAt: new Date(Date.now() - 5 * 86400000).toISOString(),
    durationMinutes: 90,
    mode: 'distanciel',
    visibility: 'public',
    maxParticipants: 300,
    registeredCount: 287,
    status: 'completed',
    googleMeetLink: 'https://meet.google.com/mock-event-003',
    tags: ['Sens', 'Motivation', 'Bien-être'],
  },
];

export const MOCK_EVENT_REGISTRATIONS: EventRegistration[] = [
  {
    registrationId: 'reg-ev-001',
    userId: MOCK_USER_ID,
    eventId: 'ev-001',
    registeredAt: new Date(Date.now() - 2 * 86400000).toISOString(),
    attended: false,
  },
  {
    registrationId: 'reg-ev-003',
    userId: MOCK_USER_ID,
    eventId: 'ev-003',
    registeredAt: new Date(Date.now() - 8 * 86400000).toISOString(),
    attended: true,
  },
];

// ─── Surveys ──────────────────────────────────────────────────────────────────

export const MOCK_SURVEYS: ContentSurvey[] = [
  {
    surveyId: 'srv-001',
    userId: MOCK_USER_ID,
    contentType: 'masterclass',
    contentId: 'mc-002',
    rating: 5,
    feedback: 'Contenu très dense et actionnable. Les exercices pratiques étaient excellents.',
    submittedAt: new Date(Date.now() - 2 * 86400000).toISOString(),
  },
  {
    surveyId: 'srv-002',
    userId: MOCK_USER_ID,
    contentType: 'evenement',
    contentId: 'ev-003',
    rating: 4,
    feedback: 'Inspirant, aurais aimé plus de temps pour les questions.',
    submittedAt: new Date(Date.now() - 5 * 86400000).toISOString(),
  },
];
