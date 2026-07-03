/**
 * Guides — contenus téléchargeables (PDF) type lead magnet, avec formulaire
 * email obligatoire avant accès (page de conversion, pas de lecture longue).
 *
 * RÈGLE HONNÊTETÉ : contenu placeholder générique, aucune statistique ou
 * témoignage client inventé. fileUrl est un placeholder — brancher un vrai
 * PDF hébergé (ex. public/guides/*.pdf) avant publication.
 */

export type Guide = {
  slug: string;
  title: string;
  subtitle: string;
  description: string;
  category: string;
  pageCount: number;
  format: string;
  date: string;
  featured: boolean;
  /** Ce que le lecteur trouve dans le guide. */
  highlights: string[];
  /** Placeholder — chemin du PDF une fois disponible. */
  fileUrl: string;
  cover: string;
};

export const GUIDES: Guide[] = [
  {
    slug: 'checklist-onboarding-ia-formation',
    title: "Checklist : intégrer l'IA dans vos parcours de formation",
    subtitle: '20 points de contrôle avant de déployer un outil IA en formation',
    description:
      "Un guide pratique pour cadrer l'introduction d'un outil IA dans un dispositif de formation existant : gouvernance, pédagogie, RGPD, accompagnement des équipes.",
    category: 'IA & Pédagogie',
    pageCount: 12,
    format: 'PDF',
    date: 'Mai 2026',
    featured: true,
    highlights: [
      '20 points de contrôle actionnables, classés par étape de déploiement',
      'Grille de questions à poser avant de choisir un outil',
      'Modèle de communication interne pour accompagner le changement',
    ],
    fileUrl: '/guides/checklist-onboarding-ia-formation.pdf',
    cover: 'from-primary-200 via-primary-100 to-accent-100',
  },
  {
    slug: 'referentiel-5-piliers-fiche-synthese',
    title: 'Le Référentiel des 5 Piliers — fiche de synthèse',
    subtitle: 'La matrice de compétences L&D condensée en une fiche imprimable',
    description:
      "La synthèse visuelle du dossier « Le Référentiel des 5 Piliers » : les 5 dimensions de compétences du professionnel de la formation augmenté, en une page.",
    category: 'Pédagogie',
    pageCount: 2,
    format: 'PDF',
    date: 'Mai 2026',
    featured: false,
    highlights: [
      'Les 5 piliers résumés avec leurs compétences clés',
      'Une fiche pensée pour être affichée ou partagée en équipe',
    ],
    fileUrl: '/guides/referentiel-5-piliers-fiche-synthese.pdf',
    cover: 'from-secondary-200 via-secondary-100 to-accent-100',
  },
];

export const findGuide = (slug: string): Guide | null =>
  GUIDES.find((g) => g.slug === slug) ?? null;

export const getRelatedGuides = (slug: string, count = 3): Guide[] =>
  GUIDES.filter((g) => g.slug !== slug).slice(0, count);
