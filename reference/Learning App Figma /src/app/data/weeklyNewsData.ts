// Données pour les "Actus de la semaine" - Type Newsletter
export interface WeeklyNewsItem {
  id: number;
  title: string;
  summary: string;
  imageUrl?: string;
  readTime: string;
  url?: string;
  category: string;
  author: string;
  publishDate: string;
  tags: string[];
  isFeatured?: boolean;
}

export interface WeeklyNewsEdition {
  weekNumber: number;
  year: number;
  publishDate: string;
  edition: string;
  featuredVideo?: {
    title: string;
    summary: string;
    videoUrl: string;
    thumbnail: string;
    duration: string;
  };
  newsItems: WeeklyNewsItem[];
}

// Semaine actuelle (Semaine #08 - Février 2026)
export const currentWeeklyNews: WeeklyNewsEdition = {
  weekNumber: 8,
  year: 2026,
  publishDate: '22 février 2026',
  edition: 'Semaine #08 - Février 2026',
  featuredVideo: {
    title: 'Les nouveaux paradigmes de l\'apprentissage en ligne',
    summary: 'Découvrez comment les technologies immersives transforment la formation professionnelle et l\'engagement des apprenants.',
    videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    thumbnail: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&q=80',
    duration: '12:45'
  },
  newsItems: [
    {
      id: 1001,
      title: 'L\'essor du microlearning dans les entreprises françaises',
      summary: 'Une étude révèle que 78% des entreprises du CAC40 ont adopté le microlearning pour leurs formations internes. Cette approche permet des sessions de 5-10 minutes, augmentant la rétention de 60%.',
      imageUrl: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&q=80',
      readTime: '4 min',
      url: 'https://example.com/microlearning-2026',
      category: 'Formation',
      author: 'Marie Dubois',
      publishDate: '20 février 2026',
      tags: ['Microlearning', 'Innovation', 'Entreprise'],
      isFeatured: true
    },
    {
      id: 1002,
      title: 'Comment l\'IA générative révolutionne la création de contenu pédagogique',
      summary: 'Les outils d\'IA comme GPT-5 permettent désormais de générer des parcours personnalisés en quelques secondes. Les formateurs gagnent 70% de temps sur la création de contenu.',
      imageUrl: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&q=80',
      readTime: '5 min',
      url: 'https://example.com/ia-pedagogie-2026',
      category: 'Technologie',
      author: 'Thomas Laurent',
      publishDate: '19 février 2026',
      tags: ['IA', 'EdTech', 'Innovation'],
      isFeatured: true
    },
    {
      id: 1003,
      title: 'Les soft skills, nouvelles priorités des recruteurs en 2026',
      summary: 'Selon LinkedIn, 92% des recruteurs privilégient désormais les compétences comportementales. Communication, adaptabilité et intelligence émotionnelle sont en tête.',
      imageUrl: 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=800&q=80',
      readTime: '3 min',
      url: 'https://example.com/soft-skills-2026',
      category: 'Carrière',
      author: 'Sophie Martin',
      publishDate: '18 février 2026',
      tags: ['Soft Skills', 'RH', 'Recrutement'],
      isFeatured: true
    },
    {
      id: 1004,
      title: 'Réalité virtuelle : le futur de la formation immersive',
      summary: 'Les casques Meta Quest 4 équipent maintenant 45% des centres de formation. Les apprenants retiennent 90% des informations grâce à l\'immersion totale.',
      imageUrl: 'https://images.unsplash.com/photo-1622979135225-d2ba269cf1ac?w=800&q=80',
      readTime: '6 min',
      url: 'https://example.com/vr-formation-2026',
      category: 'Innovation',
      author: 'Marc Petit',
      publishDate: '17 février 2026',
      tags: ['VR', 'Formation', 'Immersion']
    },
    {
      id: 1005,
      title: 'Certification en ligne : la blockchain garantit l\'authenticité',
      summary: 'Les certificats sécurisés par blockchain deviennent la norme. OpenBadges 3.0 permet une vérification instantanée et infalsifiable des compétences.',
      imageUrl: 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=800&q=80',
      readTime: '4 min',
      url: 'https://example.com/blockchain-certif-2026',
      category: 'Certification',
      author: 'Julie Chen',
      publishDate: '16 février 2026',
      tags: ['Blockchain', 'Certification', 'Sécurité']
    },
    {
      id: 1006,
      title: 'Le coaching hybride : l\'alliance parfaite entre humain et IA',
      summary: 'Les plateformes de coaching combinent désormais l\'expertise humaine avec l\'analyse prédictive de l\'IA pour un accompagnement ultra-personnalisé.',
      imageUrl: 'https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?w=800&q=80',
      readTime: '5 min',
      url: 'https://example.com/coaching-hybride-2026',
      category: 'Coaching',
      author: 'Pierre Durand',
      publishDate: '15 février 2026',
      tags: ['Coaching', 'IA', 'Innovation']
    }
  ]
};

// Éditions précédentes (pour l'historique)
export const previousWeeklyNews: WeeklyNewsEdition[] = [
  {
    weekNumber: 7,
    year: 2026,
    publishDate: '15 février 2026',
    edition: 'Semaine #07 - Février 2026',
    newsItems: [
      {
        id: 901,
        title: 'La gamification booste l\'engagement de 85%',
        summary: 'Les plateformes LMS intégrant des mécaniques de jeu voient leur taux de completion exploser.',
        imageUrl: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?w=800&q=80',
        readTime: '4 min',
        category: 'Gamification',
        author: 'Lucas Bernard',
        publishDate: '12 février 2026',
        tags: ['Gamification', 'Engagement', 'LMS']
      },
      {
        id: 902,
        title: 'LinkedIn Learning lance des parcours IA personnalisés',
        summary: 'L\'algorithme analyse vos compétences et recommande des formations ultra-ciblées.',
        imageUrl: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=800&q=80',
        readTime: '3 min',
        category: 'Plateforme',
        author: 'Emma Roux',
        publishDate: '10 février 2026',
        tags: ['LinkedIn', 'IA', 'E-learning']
      }
    ]
  }
];

// Fonction pour obtenir les actus de la semaine courante
export function getCurrentWeeklyNews(): WeeklyNewsEdition {
  return currentWeeklyNews;
}

// Fonction pour obtenir toutes les actus (pour la liste)
export function getAllWeeklyNewsItems(): WeeklyNewsItem[] {
  return currentWeeklyNews.newsItems;
}

// Fonction pour obtenir les actus featured
export function getFeaturedWeeklyNews(): WeeklyNewsItem[] {
  return currentWeeklyNews.newsItems.filter(item => item.isFeatured);
}

// Fonction pour obtenir une actu par ID
export function getWeeklyNewsById(id: number): WeeklyNewsItem | undefined {
  return currentWeeklyNews.newsItems.find(item => item.id === id);
}
