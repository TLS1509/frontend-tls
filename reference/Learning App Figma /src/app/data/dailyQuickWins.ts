// Daily Quick Wins - Connected to Veille (Daily Intelligence)
// These are curated daily micro-learning activities from the veille content

export interface QuickWin {
  id: number;
  type: 'article' | 'quiz' | 'video' | 'podcast';
  title: string;
  time: string; // Duration estimate
  icon: string;
  color: string;
  description: string;
  source?: string; // From veille
  category?: string;
  relatedTo?: string; // What veille topic it's related to
  thumbnail?: string; // For visual cards
}

export const todayQuickWins: QuickWin[] = [
  {
    id: 1,
    type: 'article',
    title: 'GPT-5 : Les nouvelles capacités révolutionnaires',
    time: '5 min',
    icon: 'FileText',
    color: 'var(--primary)',
    description: 'OpenAI annonce les prochaines fonctionnalités de GPT-5 avec des capacités de raisonnement avancées',
    source: 'TechCrunch',
    category: '📰 Article du jour',
    relatedTo: 'Article vedette du jour',
  },
  {
    id: 2,
    type: 'quiz',
    title: 'Testez vos connaissances en prompt engineering',
    time: '8 min',
    icon: 'Brain',
    color: 'var(--secondary)',
    description: '10 questions pour valider votre maîtrise des techniques avancées de prompting',
    category: '🎯 Quiz du jour',
    relatedTo: 'Basé sur les tendances de la veille',
  },
  {
    id: 3,
    type: 'video',
    title: 'Comment créer des formations avec Claude AI',
    time: '10 min',
    icon: 'PlayCircle',
    color: 'var(--accent)',
    description: 'Guide vidéo complet pour utiliser Claude dans la création de contenus pédagogiques',
    source: 'AI for Education',
    category: '🎥 Vidéo du jour',
    relatedTo: 'Tendance de la veille',
  },
  {
    id: 4,
    type: 'podcast',
    title: 'L\'avenir de l\'IA dans la formation professionnelle',
    time: '15 min',
    icon: 'Podcast',
    color: '#9333EA',
    description: 'Discussion avec des experts sur les transformations en cours dans le secteur de la formation',
    source: 'Learning Innovation Podcast',
    category: '🎙️ Podcast du jour',
    relatedTo: 'Tendance de la veille',
  },
];