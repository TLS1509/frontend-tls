/**
 * Webinaires — sessions live (à venir) ou replay (passées).
 *
 * RÈGLE HONNÊTETÉ : contenu placeholder générique, aucune statistique ou
 * témoignage client inventé. Dates volontairement proches de "aujourd'hui"
 * (2026-07) pour démontrer les 2 états (à venir / replay) du template.
 */

export type WebinaireStatus = 'upcoming' | 'past';

export type Webinaire = {
  slug: string;
  title: string;
  subtitle: string;
  description: string;
  status: WebinaireStatus;
  date: string;
  time: string;
  duration: string;
  speakers: { name: string; role: string }[];
  agenda: string[];
  featured: boolean;
  /** Placeholder — lien vers le replay une fois la session passée. */
  replayUrl?: string;
  cover: string;
};

export const WEBINAIRES: Webinaire[] = [
  {
    slug: 'ia-generative-ingenierie-pedagogique-2026',
    title: "IA générative et ingénierie pédagogique : ce qui change en 2026",
    subtitle: 'Un webinaire pour les responsables formation et ingénieurs pédagogiques',
    description:
      "Une session live pour faire le point sur les usages concrets de l'IA générative en ingénierie pédagogique : ce qui fonctionne, les limites, et comment structurer son adoption.",
    status: 'upcoming',
    date: 'Septembre 2026',
    time: '11h00 – 12h00 (CET)',
    duration: '60 min',
    speakers: [{ name: 'Équipe TLS', role: 'The Learning Society' }],
    agenda: [
      'Panorama des usages IA en ingénierie pédagogique en 2026',
      'Étude de cas : refonte d\'un module avec assistance IA',
      'Session de questions/réponses',
    ],
    featured: true,
    cover: 'from-primary-200 via-primary-100 to-accent-100',
  },
  {
    slug: 'organisation-par-les-competences-webinaire-replay',
    title: "L'organisation par les compétences : présentation du dossier SBO",
    subtitle: 'Replay — présentation commentée du dossier de fond SBO',
    description:
      "Le replay de la session de présentation du dossier « L'organisation par les compétences » : le constat, les preuves issues de la recherche et le rôle du passeport de compétences.",
    status: 'past',
    date: 'Juin 2026',
    time: '11h00 – 12h00 (CET)',
    duration: '55 min',
    speakers: [{ name: 'Équipe TLS', role: 'The Learning Society' }],
    agenda: [
      'Pourquoi la Skills-Based Organization maintenant',
      'Ce que documente la recherche institutionnelle',
      'Le passeport de compétences comme pièce centrale',
    ],
    featured: false,
    cover: 'from-secondary-200 via-secondary-100 to-accent-100',
  },
];

export const findWebinaire = (slug: string): Webinaire | null =>
  WEBINAIRES.find((w) => w.slug === slug) ?? null;

export const getRelatedWebinaires = (slug: string, count = 3): Webinaire[] =>
  WEBINAIRES.filter((w) => w.slug !== slug).slice(0, count);
