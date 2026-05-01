/**
 * Données mockées pour les Dossiers (rapports, livres blancs, études)
 * Format : Executive Summary + Key Findings + Sections + Download
 */

export interface KeyFinding {
  title: string;
  description: string;
}

export interface Dossier {
  id: number;
  title: string;
  category: string;
  emoji: string;
  author: string;
  authorTitle?: string;
  authorAvatar?: string;
  publishDate: string;
  pages: number;
  downloads: number;
  thumbnail?: string;
  tags: string[];
  executiveSummary: string;
  keyFindings: KeyFinding[];
  sections: {
    title: string;
    content: string[];
  }[];
  conclusion?: string;
  pdfUrl?: string;
  type: 'dossier';
}

export interface DossierPreview {
  id: number;
  title: string;
  category: string;
  emoji: string;
  author: string;
  publishDate: string;
  pages: number;
  downloads: number;
  type: 'dossier';
}

export const dossiersData: Record<number, Dossier> = {
  1: {
    id: 1,
    title: 'État des lieux de la formation digitale 2026',
    category: 'Étude de Marché',
    emoji: '📊',
    author: 'Équipe Research TLS',
    authorTitle: 'The Learning Society',
    publishDate: '15 Janvier 2026',
    pages: 42,
    downloads: 3421,
    thumbnail: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&q=80',
    tags: ['Étude', 'Digital Learning', 'Tendances 2026', 'Marché', 'Statistiques'],
    executiveSummary: 'Ce rapport analyse les tendances majeures qui façonneront la formation professionnelle en 2026 et au-delà. Basé sur une enquête menée auprès de 2 500 responsables formation et 15 000 apprenants dans 12 pays, il met en lumière l\'accélération de la digitalisation, l\'adoption massive de l\'IA générative et l\'émergence de nouveaux formats pédagogiques ultra-courts. Les organisations qui investissent dans le digital learning constatent une amélioration de 67% de l\'engagement apprenant et une réduction de 45% des coûts de formation.',
    keyFindings: [
      {
        title: 'L\'IA s\'impose comme standard',
        description: '78% des organisations investissent dans des solutions de formation pilotées par l\'IA générative, transformant radicalement la création de contenu et la personnalisation des parcours.',
      },
      {
        title: 'Le micro-learning domine',
        description: 'Les formats courts (< 5 min) représentent désormais 41% des contenus créés. Les apprenants plébiscitent ces capsules consommables en mobilité.',
      },
      {
        title: 'Mobile-first devient la norme',
        description: '89% des apprenants préfèrent les formats mobiles et flexibles. 67% des sessions d\'apprentissage se font sur smartphone.',
      },
      {
        title: 'ROI exceptionnel',
        description: 'ROI moyen de 312% sur les investissements en digital learning, avec un temps de retour sur investissement de 8 mois en moyenne.',
      },
    ],
    sections: [
      {
        title: 'Synthèse Executive',
        content: [
          'L\'année 2026 marque un tournant décisif dans la transformation digitale de la formation professionnelle. Les technologies d\'IA générative, qui étaient encore émergentes il y a deux ans, sont désormais adoptées par plus des trois quarts des organisations.',
          'Cette adoption massive s\'accompagne d\'une refonte complète des stratégies pédagogiques. Les formats longs et standardisés cèdent la place à des parcours hyper-personnalisés, adaptatifs et disponibles en permanence sur tous les devices.',
          'Les chiffres parlent d\'eux-mêmes : les organisations pionnières observent une multiplication par 2,4 de l\'engagement apprenant et une amélioration de 58% de la rétention des connaissances. Le digital learning n\'est plus une option, mais un impératif stratégique.',
        ],
      },
      {
        title: 'Les 5 Tendances Majeures',
        content: [
          '1. L\'IA Générative transforme la création de contenu : Les équipes pédagogiques utilisent ChatGPT, Claude et Gemini pour générer des scénarios, adapter des contenus existants et créer des évaluations personnalisées en quelques minutes.',
          '2. Le Micro-Learning s\'impose : Les capsules de 3 à 5 minutes deviennent le format dominant, avec des taux de completion supérieurs à 90% contre 35% pour les modules e-learning traditionnels.',
          '3. L\'Adaptive Learning se démocratise : Les algorithmes ajustent en temps réel la difficulté, le rythme et le format en fonction des performances et préférences de chaque apprenant.',
          '4. Le Social Learning explose : Les communautés d\'apprenants, forums et peer-learning représentent 32% du temps d\'apprentissage, favorisant l\'engagement et l\'ancrage des connaissances.',
          '5. La Gamification mature : Au-delà des badges et points, les mécaniques de jeu sophistiquées (quêtes, défis collaboratifs, storylines) multiplient par 3 la motivation intrinsèque.',
        ],
      },
      {
        title: 'Méthodologie & Données',
        content: [
          'Cette étude repose sur une méthodologie mixte combinant données quantitatives et insights qualitatifs. Nous avons interrogé 2 500 responsables formation (L&D, RH, Chief Learning Officers) et 15 000 apprenants dans 12 pays entre septembre et décembre 2025.',
          'L\'échantillon couvre des organisations de toutes tailles : 38% de grandes entreprises (>5000 salariés), 42% d\'ETI (250-5000 salariés) et 20% de PME (<250 salariés). Les secteurs représentés incluent la tech (28%), les services (24%), l\'industrie (22%), la santé (14%) et autres (12%).',
          'En complément, nous avons analysé les données d\'usage de 450 plateformes de formation digitale, représentant 3,2 millions d\'apprenants actifs, pour objectiver les tendances de consommation et d\'engagement.',
        ],
      },
      {
        title: 'Recommandations Stratégiques',
        content: [
          'Pour les décideurs : Positionnez le digital learning comme un levier stratégique de transformation, pas comme une simple digitalisation de l\'existant. Allouez 20-25% du budget formation au digital et équipez vos équipes pédagogiques d\'outils d\'IA générative.',
          'Pour les équipes L&D : Adoptez une approche agile en testant rapidement de nouveaux formats (micro-learning, vidéos verticales, podcasts, chatbots). Formez-vous au prompt engineering et au learning design augmenté par l\'IA.',
          'Pour les managers : Intégrez l\'apprentissage dans le flux de travail quotidien. Encouragez le peer-learning et valorisez le temps consacré à la formation (objectif : 10% du temps de travail).',
        ],
      },
    ],
    conclusion: 'La formation digitale n\'est plus une tendance, mais la nouvelle norme. Les organisations qui investissent massivement aujourd\'hui dans l\'IA, le micro-learning et la personnalisation prendront une avance décisive dans la guerre des talents. Le coût de l\'inaction dépasse désormais largement celui de la transformation.',
    pdfUrl: 'https://example.com/download/etude-formation-digitale-2026.pdf',
    type: 'dossier',
  },
};

// Preview function for the list
export function getDossiersPreviews(): DossierPreview[] {
  return Object.values(dossiersData).map((dossier) => ({
    id: dossier.id,
    title: dossier.title,
    category: dossier.category,
    emoji: dossier.emoji,
    author: dossier.author,
    publishDate: dossier.publishDate,
    pages: dossier.pages,
    downloads: dossier.downloads,
    type: 'dossier',
  }));
}

// Get full dossier data
export function getDossier(id: number): Dossier | null {
  return dossiersData[id] || null;
}
