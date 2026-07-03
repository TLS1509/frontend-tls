/**
 * Vidéos — tutoriels et démonstrations courtes (format "Tutoriels vidéo"
 * déjà annoncé dans le filtre de MarketingResources.tsx, jusqu'ici un stub).
 *
 * RÈGLE HONNÊTETÉ : contenu placeholder générique, aucune statistique ou
 * témoignage client inventé. À remplacer par de vraies vidéos avant publication.
 */

export type VideoChapter = { time: string; label: string };

export type Video = {
  slug: string;
  title: string;
  description: string;
  category: string;
  duration: string;
  author: string;
  date: string;
  featured: boolean;
  /** URL d'embed (YouTube/Vimeo). Placeholder tant qu'aucune vidéo n'est tournée. */
  embedUrl?: string;
  chapters: VideoChapter[];
  cover: string;
};

export const VIDEOS: Video[] = [
  {
    slug: 'construire-un-prompt-structure',
    title: 'Construire un prompt structuré en 5 étapes',
    description:
      "Une séquence pratique pour formaliser vos prompts et obtenir des résultats reproductibles : cadrage, exemples, validation et itération sur des cas réels de formation.",
    category: 'Prompt Engineering',
    duration: '12 min',
    author: 'Marie Dubois',
    date: 'Mai 2026',
    featured: true,
    chapters: [
      { time: '00:00', label: 'Introduction' },
      { time: '01:30', label: 'Cadrage du contexte' },
      { time: '03:10', label: 'Cadre de prompt : les 5 étapes' },
      { time: '05:45', label: 'Exemple pratique : rédaction' },
      { time: '08:15', label: 'Exemple pratique : analyse' },
      { time: '10:20', label: 'Validation et itération' },
      { time: '11:40', label: 'Résumé et takeaways' },
    ],
    cover: 'from-primary-200 via-primary-100 to-accent-100',
  },
  {
    slug: 'maitriser-ia-formation-professionnelle',
    title: "Maîtriser l'IA pour la Formation Professionnelle",
    description:
      "Comment intégrer l'intelligence artificielle dans vos parcours de formation pour maximiser l'engagement : panorama des outils, intégration et bonnes pratiques.",
    category: 'IA & Pédagogie',
    duration: '15 min',
    author: 'Pierre Leclerc',
    date: 'Avril 2026',
    featured: false,
    chapters: [
      { time: '00:00', label: 'Introduction' },
      { time: '02:00', label: "Panorama des outils IA" },
      { time: '05:30', label: 'Intégration dans les parcours' },
      { time: '09:00', label: 'Cas pratiques' },
      { time: '12:45', label: 'Bonnes pratiques' },
      { time: '14:00', label: 'Conclusion et ressources' },
    ],
    cover: 'from-secondary-200 via-secondary-100 to-accent-100',
  },
];

export const findVideo = (slug: string): Video | null =>
  VIDEOS.find((v) => v.slug === slug) ?? null;

export const getRelatedVideos = (slug: string, count = 3): Video[] =>
  VIDEOS.filter((v) => v.slug !== slug).slice(0, count);
