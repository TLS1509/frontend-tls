/**
 * Données mockées pour Le Mag du Mois
 * Format : Cover + Sommaire + Articles
 */

export interface MagArticle {
  id: number;
  title: string;
  excerpt: string;
  category: string;
  author: string;
  authorAvatar?: string;
  readTime: string;
  introduction?: string;
  content?: {
    heading?: string;
    paragraphs: string[];
  }[];
  pullQuote?: string;
  keyTakeaways?: string[];
  conclusion?: string;
  tags?: string[];
}

export interface Magazine {
  id: number;
  title: string;
  issue: string; // ex: "N°12"
  publishDate: string; // ex: "Mars 2026"
  emoji: string;
  description: string;
  coverImage?: string;
  themes?: string[];
  articles: MagArticle[];
  type: 'magazine';
}

export interface MagazinePreview {
  id: number;
  title: string;
  issue: string;
  publishDate: string;
  emoji: string;
  category: string;
  articlesCount: number;
  type: 'magazine';
}

export const magazinesData: Record<number, Magazine> = {
  1: {
    id: 1,
    title: 'L\'Intelligence Artificielle en Formation',
    issue: 'N°13',
    publishDate: 'Février 2026',
    emoji: '📖',
    description: 'Comment l\'IA transforme l\'apprentissage professionnel. Ce numéro explore les innovations qui redéfinissent la manière dont nous apprenons et transmettons les savoirs.',
    coverImage: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&q=80',
    themes: ['IA Générative', 'Adaptive Learning', 'Personnalisation', 'Innovation Pédagogique'],
    type: 'magazine',
    articles: [
      {
        id: 101,
        title: 'L\'IA générative : nouveau partenaire du formateur',
        excerpt: 'Comment ChatGPT et ses pairs révolutionnent la création de contenus pédagogiques et redéfinissent le métier de formateur.',
        category: 'Technologie',
        author: 'Marc Lefebvre',
        authorAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop',
        readTime: '8 min',
        introduction: 'Les outils d\'IA générative comme ChatGPT, Claude et Gemini transforment radicalement le métier de formateur. Loin de remplacer l\'expertise humaine, ils deviennent des assistants puissants pour démultiplier la créativité et gagner un temps précieux.',
        keyTakeaways: [
          '73% des formateurs utilisent quotidiennement l\'IA générative',
          'Gain de temps moyen de 4h30 par semaine (234h/an)',
          'Temps de création divisé par 3 grâce à l\'IA',
          'L\'expertise humaine reste indispensable pour valider et contextualiser',
        ],
        content: [
          {
            heading: 'Une adoption massive',
            paragraphs: [
              'Selon une étude récente menée auprès de 1 500 formateurs, 73% d\'entre eux utilisent désormais quotidiennement des outils d\'IA générative pour créer leurs contenus pédagogiques. Le gain de temps moyen constaté atteint 4h30 par semaine, soit l\'équivalent de 234 heures par an.',
              'Les cas d\'usage sont multiples : génération de quiz et exercices, reformulation de concepts complexes en langage simple, création de scénarios pédagogiques, adaptation de contenus à différents niveaux, traduction multilingue instantanée.',
            ],
          },
          {
            heading: 'Témoignages terrain',
            paragraphs: [
              'Un formateur témoigne : "ChatGPT est devenu mon assistant pédagogique. Je lui soumets mes idées brutes, il me propose 5 variantes structurées. Je garde le meilleur et j\'affine. Mon temps de création a été divisé par 3."',
              'Les équipes L&D rapportent une amélioration de 65% de la diversité des formats proposés et une capacité à produire du contenu personnalisé à grande échelle, chose impossible auparavant.',
            ],
          },
          {
            heading: 'Les pièges à éviter',
            paragraphs: [
              'Mais attention aux pièges : l\'IA peut produire des informations erronées (hallucinations), manquer de contexte métier spécifique, ou proposer des contenus trop génériques. L\'expertise humaine reste indispensable pour valider, contextualiser et personnaliser les productions de l\'IA.',
              'Les bonnes pratiques émergent : utiliser des prompts structurés et précis, toujours vérifier les sources et la véracité, combiner plusieurs outils pour croiser les approches, former les équipes au prompt engineering.',
            ],
          },
        ],
        pullQuote: 'L\'IA n\'est pas un bouton magique mais un outil puissant qui démultiplie les capacités des formateurs qui savent s\'en servir.',
        conclusion: 'L\'avenir ? Une collaboration homme-machine de plus en plus fluide, où l\'IA gère les tâches répétitives et chronophages pendant que le formateur se concentre sur ce qui fait sa valeur ajoutée : l\'accompagnement humain, l\'adaptation au contexte, la transmission d\'expérience et l\'animation de la communauté apprenante.',
        tags: ['IA Générative', 'ChatGPT', 'Création de contenu', 'Formateur', 'Productivité'],
      },
      {
        id: 102,
        title: 'Adaptive Learning : la personnalisation à grande échelle',
        excerpt: 'Quand les algorithmes s\'adaptent au niveau de chaque apprenant pour maximiser l\'efficacité pédagogique.',
        category: 'Pédagogie',
        author: 'Claire Dubois',
        authorAvatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop',
        readTime: '10 min',
        introduction: 'L\'adaptive learning, ou apprentissage adaptatif, utilise des algorithmes d\'IA pour personnaliser en temps réel le parcours de chaque apprenant en fonction de son niveau, ses préférences et sa progression.',
        keyTakeaways: [
          '+58% de rétention des connaissances avec l\'adaptive learning',
          '-35% de temps nécessaire pour atteindre les objectifs',
          'Les apprenants ne perdent plus de temps sur ce qu\'ils maîtrisent',
          'Challenge au juste niveau pour chaque profil',
        ],
        content: [
          {
            heading: 'Comment ça fonctionne',
            paragraphs: [
              'Imaginez une plateforme qui analyse en permanence les réponses de l\'apprenant, identifie ses points forts et ses lacunes, puis ajuste automatiquement la difficulté, le rythme et le format des contenus proposés. C\'est la promesse de l\'adaptive learning, rendue possible par les avancées en intelligence artificielle et machine learning.',
              'Le système collecte des milliers de points de données : temps de réponse, taux de réussite, moments d\'hésitation, préférences de format (vidéo vs texte), horaires de connexion optimaux. Ces données alimentent des modèles prédictifs qui anticipent les besoins de l\'apprenant.',
            ],
          },
          {
            heading: 'Résultats mesurables',
            paragraphs: [
              'Les résultats parlent d\'eux-mêmes : les études montrent une amélioration de 58% de la rétention des connaissances et une réduction de 35% du temps nécessaire pour atteindre les objectifs pédagogiques.',
              'Les apprenants apprécient particulièrement de ne pas perdre de temps sur des concepts qu\'ils maîtrisent déjà et d\'être challengés à leur juste niveau. Le sentiment de progression est renforcé, l\'engagement augmente de 47% en moyenne.',
            ],
          },
          {
            heading: 'Les acteurs du marché',
            paragraphs: [
              'Des plateformes comme Knewton, Area9 ou DreamBox ont été pionnières dans ce domaine. Aujourd\'hui, les principaux LMS intègrent des fonctionnalités d\'adaptive learning. LinkedIn Learning utilise des algorithmes pour recommander des cours pertinents. Coursera adapte la difficulté des quiz selon les performances.',
              'En France, des startups comme Domoscio ou MySkillCamp proposent des solutions d\'adaptive learning pour les entreprises, avec des résultats impressionnants sur l\'engagement et la rétention.',
            ],
          },
          {
            heading: 'Questions éthiques',
            paragraphs: [
              'Mais l\'adaptive learning soulève aussi des questions. Jusqu\'où peut-on automatiser la pédagogie ? L\'algorithme peut-il vraiment comprendre les besoins profonds d\'un apprenant ? Le risque existe de créer des "bulles de filtre" pédagogiques où l\'apprenant ne serait exposé qu\'à ce qu\'il connaît déjà.',
              'La transparence des algorithmes, la protection des données d\'apprentissage et le maintien d\'une dimension humaine dans les parcours sont des enjeux cruciaux à adresser.',
            ],
          },
        ],
        pullQuote: 'L\'adaptive learning n\'est pas une solution miracle mais un outil puissant au service d\'une pédagogie plus efficace et plus respectueuse des différences individuelles.',
        conclusion: 'La clé réside dans un équilibre subtil : utiliser l\'IA pour personnaliser les parcours à grande échelle, tout en maintenant une dimension humaine avec du tutorat, du mentorat et de l\'intelligence collective. Les organisations qui maîtrisent cet équilibre transforment radicalement leur efficacité pédagogique.',
        tags: ['Adaptive Learning', 'Personnalisation', 'Algorithmes', 'Machine Learning', 'Efficacité'],
      },
      {
        id: 103,
        title: 'Le futur du formateur à l\'ère de l\'IA',
        excerpt: 'Quelles compétences développer quand l\'IA automatise une partie du métier ? Portrait du formateur augmenté.',
        category: 'Métier',
        author: 'Thomas Renard',
        authorAvatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop',
        readTime: '7 min',
        introduction: 'L\'arrivée de l\'IA dans la formation ne signe pas la fin du métier de formateur, mais sa profonde transformation. De créateur de contenu à architecte d\'expériences apprenantes, le rôle évolue vers plus de stratégie et d\'accompagnement humain.',
        keyTakeaways: [
          'Le formateur devient un "learning experience designer"',
          'Focus sur l\'accompagnement humain et la facilitation',
          'Nouvelles compétences : prompt engineering, data literacy, AI curation',
          'La valeur ajoutée humaine se renforce sur l\'empathie et l\'adaptation contextuelle',
        ],
        content: [
          {
            heading: 'Un métier en mutation',
            paragraphs: [
              'Si l\'IA excelle dans la création de contenu standardisé, l\'évaluation automatisée et la personnalisation algorithmique, elle ne peut remplacer l\'empathie, l\'intelligence situationnelle et la capacité à créer du lien qui caractérisent les meilleurs formateurs.',
              'Le métier évolue vers trois dimensions complémentaires : designer d\'expériences (concevoir des parcours engageants et pertinents), curator de contenus (sélectionner et orchestrer les meilleures ressources IA et humaines), et facilitateur (accompagner les apprentissages, animer les communautés, créer des moments de partage).',
            ],
          },
          {
            heading: 'Les nouvelles compétences',
            paragraphs: [
              'Le formateur augmenté doit maîtriser le prompt engineering pour dialoguer efficacement avec les IA, la data literacy pour interpréter les analytics d\'apprentissage, et l\'AI curation pour évaluer et sélectionner les meilleures productions de l\'IA.',
              'Mais surtout, il doit renforcer ses soft skills : écoute active, feedback bienveillant, facilitation de groupe, storytelling, création de lien. Ces compétences, difficilement automatisables, deviennent le cœur de la valeur ajoutée du formateur.',
            ],
          },
          {
            heading: 'Témoignages de formateurs',
            paragraphs: [
              '"Avant, je passais 70% de mon temps à créer des supports PowerPoint et 30% à animer. Maintenant c\'est l\'inverse : l\'IA crée les supports, je me concentre sur l\'humain", témoigne Sandrine, formatrice en management.',
              '"Mon rôle est devenu plus stratégique. Je conçois des parcours blended qui mêlent IA, présentiel, peer-learning. Je suis passée de prof à architecte d\'expériences", explique Karim, responsable formation.',
            ],
          },
        ],
        pullQuote: 'L\'IA ne remplace pas le formateur, elle libère son potentiel pour se concentrer sur ce qui fait sa vraie valeur : l\'humain.',
        conclusion: 'Le formateur de demain ne sera pas remplacé par l\'IA, mais les formateurs qui sauront collaborer avec l\'IA remplaceront ceux qui ne le feront pas. C\'est une opportunité de redonner du sens au métier en se recentrant sur sa dimension la plus noble : accompagner la transformation des personnes.',
        tags: ['Formateur', 'Métier', 'Évolution', 'Compétences', 'Futur'],
      },
    ],
  },
};

// Preview function for the list
export function getMagazinesPreviews(): MagazinePreview[] {
  return Object.values(magazinesData).map((magazine) => ({
    id: magazine.id,
    title: magazine.title,
    issue: magazine.issue,
    publishDate: magazine.publishDate,
    emoji: magazine.emoji,
    category: 'Le Mag du Mois',
    articlesCount: magazine.articles.length,
    type: 'magazine',
  }));
}

// Get full magazine data
export function getMagazine(id: number): Magazine | null {
  return magazinesData[id] || null;
}

// Get specific article from a magazine
export function getMagArticle(magazineId: number, articleId: number): MagArticle | null {
  const magazine = magazinesData[magazineId];
  if (!magazine) return null;
  
  return magazine.articles.find(article => article.id === articleId) || null;
}
