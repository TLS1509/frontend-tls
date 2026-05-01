/**
 * Shared Veille data — single source of truth
 * Used by Veille.tsx (list) and sub-pages (detail views)
 */

export type VeilleType = 'actu' | 'tutoriel' | 'dossier' | 'magazine';

export interface VeilleItem {
  id: string;
  type: VeilleType;
  title: string;
  summary: string;
  category: string;
  author: string;
  publishedAt: string;
  readTime: string;
  /** Full content sections (used by detail pages) */
  sections?: Array<{ heading: string; body: string }>;
  /** Callout / key insight */
  callout?: string;
  /** Source URL label */
  sourceLabel?: string;
}

export const VEILLE_ITEMS: VeilleItem[] = [
  {
    id: 'item-1',
    type: 'actu',
    title: 'IA générative en formation : où en sommes-nous en 2026 ?',
    summary: 'Tour d\'horizon des nouveaux usages de l\'IA dans les parcours de formation, des cas concrets et des limites.',
    category: 'IA & Pédagogie',
    author: 'The Learning Society',
    publishedAt: 'Aujourd\'hui',
    readTime: '6 min',
    callout: '74 % des responsables formation ont intégré au moins un outil IA en 2025 — mais seulement 31 % l\'utilisent de façon systématique.',
    sections: [
      {
        heading: 'Où en sont les organisations ?',
        body: 'Après l\'euphorie de 2024, les équipes L&D rationalisent leurs usages. Les LLMs sont désormais embarqués dans les LMS majeurs (Docebo, 360Learning), mais l\'appropriation par les formateurs reste inégale.',
      },
      {
        heading: 'Les usages qui tiennent la route',
        body: 'Génération de quiz adaptatifs, résumés automatiques de cours longs, et chatbots d\'aide à la pratique — ces trois cas d\'usage montrent les ROI les plus tangibles selon les études disponibles.',
      },
      {
        heading: 'Les limites à ne pas ignorer',
        body: 'Hallucinations, biais de confirmation et dépendance aux outils sont les trois risques les plus cités par les directions pédagogiques. La co-conception humain-IA reste le modèle le plus robuste.',
      },
    ],
  },
  {
    id: 'item-2',
    type: 'tutoriel',
    title: 'Construire un prompt structuré en 5 étapes',
    summary: 'Une vidéo pas à pas pour formaliser ses prompts et obtenir des résultats reproductibles.',
    category: 'Prompt Engineering',
    author: 'Marie Dubois',
    publishedAt: 'Hier',
    readTime: '12 min',
    callout: 'La méthode ROLE-CONTEXT-TÂCHE-FORMAT-CONTRAINTE divise par 3 le nombre d\'itérations nécessaires pour obtenir un résultat exploitable.',
    sections: [
      {
        heading: 'Étape 1 — Définir le rôle',
        body: 'Commencer par « Tu es un expert en… » oriente le modèle et améliore la qualité des réponses dès la première tentative.',
      },
      {
        heading: 'Étape 2 — Poser le contexte',
        body: 'Plus le contexte est précis (secteur, audience, contraintes), moins le modèle invente. Inclure des exemples de la situation réelle.',
      },
      {
        heading: 'Étape 3 — Formuler la tâche, le format et les contraintes',
        body: 'Indiquer explicitement ce que vous attendez (liste, tableau, paragraphe), la longueur souhaitée et ce que le modèle ne doit PAS faire.',
      },
    ],
  },
  {
    id: 'item-3',
    type: 'dossier',
    title: 'Le futur du travail hybride',
    summary: 'Synthèse approfondie sur les impacts du travail hybride sur la culture d\'apprentissage en entreprise.',
    category: 'Management',
    author: 'McKinsey',
    publishedAt: 'Il y a 3 jours',
    readTime: '22 min',
    callout: '58 % des salariés hybrides déclarent apprendre davantage de façon informelle depuis le passage en distanciel partiel — mais seulement 12 % de ces apprentissages sont tracés par leur organisation.',
    sections: [
      {
        heading: 'Le paradoxe de l\'apprentissage informel',
        body: 'Le travail hybride favorise l\'auto-formation et l\'apprentissage entre pairs en ligne, mais les organisations peinent à valoriser et capitaliser ces apprentissages dans leurs systèmes RH.',
      },
      {
        heading: 'L\'impact sur la culture d\'entreprise',
        body: 'La cohésion, le mentorat spontané et la transmission implicite des normes culturelles sont fragilisés. Les entreprises les plus performantes compensent par des rituels hybrides délibérément conçus.',
      },
      {
        heading: 'Recommandations stratégiques',
        body: 'Investir dans des outils de social learning asynchrone, redéfinir les KPIs formation pour inclure l\'informel, et former les managers à devenir des facilitateurs d\'apprentissage.',
      },
    ],
  },
  {
    id: 'item-4',
    type: 'magazine',
    title: 'Tendances EdTech 2026',
    summary: 'Notre numéro mensuel : marchés en croissance, nouveaux acteurs et opportunités stratégiques.',
    category: 'EdTech',
    author: 'TLS Mag',
    publishedAt: 'Il y a 1 semaine',
    readTime: '18 min',
    callout: 'Le marché mondial de l\'EdTech atteint 350 Md$ en 2026 — avec une croissance portée à 60 % par l\'IA et la personnalisation adaptive.',
    sections: [
      {
        heading: 'Les marchés en accélération',
        body: 'L\'Asie du Sud-Est et l\'Afrique subsaharienne s\'imposent comme les nouveaux eldorados de l\'EdTech. La demande en formation continue explose avec l\'arrivée des millennials aux postes de direction.',
      },
      {
        heading: 'Les acteurs à surveiller',
        body: 'Mistral AI, ElevenLabs et Synthesia investissent massivement dans les outils pédagogiques. Côté plateformes, Coursera et 360Learning lancent des offres « IA-first » dès le premier trimestre.',
      },
      {
        heading: 'Opportunités stratégiques pour les équipes L&D',
        body: 'La fenêtre d\'opportunité pour les équipes formation est ouverte : celles qui expérimentent maintenant acquerront un avantage compétitif décisif d\'ici 18 mois.',
      },
    ],
  },
  {
    id: 'item-5',
    type: 'actu',
    title: 'React 19 : les nouveautés UI à connaître',
    summary: 'Décryptage des nouveautés React 19 utiles pour les plateformes d\'apprentissage modernes.',
    category: 'Tech',
    author: 'TLS Tech',
    publishedAt: 'Il y a 2 semaines',
    readTime: '8 min',
    callout: 'Les Actions et le compiler React 19 réduisent de 40 % le code boilerplate des formulaires — un gain direct pour les plateformes LMS.',
    sections: [
      {
        heading: 'Les Actions : la fin de useEffect pour les formulaires',
        body: 'React 19 introduit les Server Actions et les transitions asynchrones natives, simplifiant drastiquement la gestion des formulaires et des soumissions de données.',
      },
      {
        heading: 'Le nouveau compiler React',
        body: 'La mémoïsation automatique remplace useMemo et useCallback dans la majorité des cas, réduisant la surface d\'erreur et améliorant les performances out-of-the-box.',
      },
      {
        heading: 'Impact sur les plateformes d\'apprentissage',
        body: 'Les composants de quiz, de suivi de progression et d\'évaluation bénéficient directement de ces optimisations, notamment sur les appareils mobiles entrée de gamme.',
      },
    ],
  },
  {
    id: 'item-6',
    type: 'tutoriel',
    title: 'Animer un atelier collaboratif à distance',
    summary: 'Méthode et outils pour faciliter un atelier d\'intelligence collective en visio.',
    category: 'Facilitation',
    author: 'Pierre Leclerc',
    publishedAt: 'Il y a 3 semaines',
    readTime: '15 min',
    callout: 'Les ateliers distanciels avec une structure en 3 temps (divergence → convergence → décision) génèrent 2× plus d\'idées actionnables que les formats libres.',
    sections: [
      {
        heading: 'Préparer l\'espace mental et technique',
        body: 'Envoyer un brief 48h avant, tester les outils (Miro, Klaxoon, FigJam), et prévoir un warm-up de 5 minutes. La préparation réduit de moitié le temps de montée en énergie.',
      },
      {
        heading: 'Animer la divergence',
        body: 'Utiliser le silent brainstorming (écriture simultanée sans prise de parole) puis le dot-voting pour sélectionner les idées. La règle d\'or : quantité avant qualité.',
      },
      {
        heading: 'Converger et décider',
        body: 'Regrouper les idées par thème (clustering), qualifier chaque groupe par impact/effort, et finir par une décision explicite avec propriétaire et échéance.',
      },
    ],
  },
];

/** Résoudre la route de détail d\'un item Veille */
export const resolveVeilleRoute = (item: VeilleItem): string => {
  switch (item.type) {
    case 'actu':     return `/veille/article/${item.id}`;
    case 'tutoriel': return `/veille/video-tutorial/${item.id}`;
    case 'dossier':  return `/veille/dossier/${item.id}`;
    case 'magazine': return `/veille/magazine-article/${item.id}`;
    default:         return '/veille';
  }
};

/** Trouver un item par son ID (avec fallback sur le premier du type) */
export const findVeilleItem = (id: string | undefined, type?: VeilleType): VeilleItem | undefined => {
  if (id) {
    const byId = VEILLE_ITEMS.find((item) => item.id === id);
    if (byId) return byId;
  }
  if (type) {
    return VEILLE_ITEMS.find((item) => item.type === type);
  }
  return undefined;
};
