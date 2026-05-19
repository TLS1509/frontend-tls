/**
 * Apprenants (coach learners) — shared mock data
 *
 * Used by:
 *  - CoachHeatmap.tsx (team grid view, score per competency)
 *  - CoachApprenants.tsx (cards list with status & filters)
 *  - CoachLearnerProfile.tsx (drill-down detail page via /coach/apprenant/:id)
 *
 * Single source of truth so the three pages stay in sync.
 */

export type ApprenantStatus = 'active' | 'stuck' | 'ahead';

export interface ApprenantHeatmapScore {
  /** Score per axis, aligned with APPRENANT_AXES order. 0 = non évalué. */
  scores: number[];
}

export interface Apprenant extends ApprenantHeatmapScore {
  id: string;
  name: string;
  initials: string;
  role: string;
  email: string;
  /** Short tag descriptors used by the list cards. */
  tags: string[];
  status: ApprenantStatus;
  /** Human-readable "2j", "Hier", "14j"… */
  lastActivity: string;
  /** Average Dreyfus level (0–5). */
  dreyfusAvg: number;
  /** ISO/short "22 mai" or null. */
  nextSession: string | null;
  /** Active streak in days. */
  streak: number;
}

/** Axes order used across heatmap & profile views. */
export const APPRENANT_AXES = [
  'Leadership',
  'Communication',
  'Analyse',
  'Tech & Outils',
  'Créativité',
  'Coopération',
];

export const APPRENANTS: Apprenant[] = [
  {
    id: 'sophie-martin',
    name: 'Sophie Martin',
    initials: 'SM',
    role: "Manager d'équipe",
    email: 's.martin@example.com',
    tags: ['Leadership D3', 'Communication D4'],
    status: 'active',
    lastActivity: '2j',
    dreyfusAvg: 3.2,
    nextSession: '22 mai',
    streak: 14,
    scores: [3, 4, 2, 4, 2, 3],
  },
  {
    id: 'pierre-bernard',
    name: 'Pierre Bernard',
    initials: 'PB',
    role: 'Chef de projet',
    email: 'p.bernard@example.com',
    tags: ['Communication D3', 'Analyse D1'],
    status: 'stuck',
    lastActivity: '8j',
    dreyfusAvg: 2.1,
    nextSession: null,
    streak: 0,
    scores: [2, 3, 1, 2, 1, 2],
  },
  {
    id: 'nadia-ferreira',
    name: 'Nadia Ferreira',
    initials: 'NF',
    role: 'Directrice Marketing',
    email: 'n.ferreira@example.com',
    tags: ['Leadership D4', 'Analyse D4'],
    status: 'ahead',
    lastActivity: '1j',
    dreyfusAvg: 4.1,
    nextSession: '20 mai',
    streak: 21,
    scores: [4, 5, 4, 4, 3, 4],
  },
  {
    id: 'julien-moreau',
    name: 'Julien Moreau',
    initials: 'JM',
    role: 'Responsable RH',
    email: 'j.moreau@example.com',
    tags: ['Communication D3', 'Leadership D3'],
    status: 'active',
    lastActivity: '3j',
    dreyfusAvg: 2.8,
    nextSession: '25 mai',
    streak: 6,
    scores: [3, 3, 0, 3, 2, 3],
  },
  {
    id: 'camille-durand',
    name: 'Camille Durand',
    initials: 'CD',
    role: 'Directrice Commerciale',
    email: 'c.durand@example.com',
    tags: ['Leadership D5', 'Analyse D5'],
    status: 'ahead',
    lastActivity: 'Hier',
    dreyfusAvg: 4.3,
    nextSession: '21 mai',
    streak: 35,
    scores: [5, 4, 5, 3, 4, 5],
  },
  {
    id: 'marc-lefebvre',
    name: 'Marc Lefebvre',
    initials: 'ML',
    role: 'Manager junior',
    email: 'm.lefebvre@example.com',
    tags: ['Leadership D1', 'Tech D1'],
    status: 'stuck',
    lastActivity: '14j',
    dreyfusAvg: 1.5,
    nextSession: null,
    streak: 0,
    scores: [1, 2, 2, 1, 0, 2],
  },
  {
    id: 'amelie-rousseau',
    name: 'Amélie Rousseau',
    initials: 'AR',
    role: 'Lead UX',
    email: 'a.rousseau@example.com',
    tags: ['Communication D4', 'Créativité D3'],
    status: 'active',
    lastActivity: '4j',
    dreyfusAvg: 3.5,
    nextSession: '28 mai',
    streak: 9,
    scores: [3, 4, 3, 4, 3, 4],
  },
  {
    id: 'thomas-klein',
    name: 'Thomas Klein',
    initials: 'TK',
    role: 'Ingénieur senior',
    email: 't.klein@example.com',
    tags: ['Tech D3', 'Analyse D2'],
    status: 'active',
    lastActivity: '5j',
    dreyfusAvg: 2.0,
    nextSession: '26 mai',
    streak: 4,
    scores: [2, 2, 2, 3, 1, 2],
  },
];

export const getApprenantById = (id: string): Apprenant | undefined =>
  APPRENANTS.find((a) => a.id === id);

/** Resolve a Dreyfus level (1-5) into a French label. */
export const dreyfusLabel = (level: number): string => {
  if (level >= 4.5) return 'Niveau 5 — Expert';
  if (level >= 3.5) return 'Niveau 4 — Performant';
  if (level >= 2.5) return 'Niveau 3 — Compétent';
  if (level >= 1.5) return 'Niveau 2 — Débutant avancé';
  return 'Niveau 1 — Novice';
};
