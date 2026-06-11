/**
 * Données mockées pour les vidéos tutoriels
 * Format : Titre + Description + Durée + Transcription + Vidéos similaires
 */

export interface VideoTutorial {
  id: number;
  title: string;
  category: string;
  emoji: string;
  description: string;
  videoUrl: string;
  thumbnail: string;
  duration: string;
  views: number;
  likes: number;
  instructor: string;
  instructorAvatar?: string;
  publishDate: string;
  tags: string[];
  transcript?: string;
  chapters?: string[];
  resources?: {
    title: string;
    url: string;
    type: 'code' | 'pdf' | 'link';
  }[];
  relatedVideos?: {
    id: number;
    title: string;
    thumbnail: string;
    duration: string;
    instructor: string;
    views: number;
  }[];
  format: 'horizontal' | 'vertical'; // horizontal (16:9 cinéma) ou vertical (9:16 reels)
}

export interface VideoTutorielPreview {
  id: number;
  title: string;
  category: string;
  emoji: string;
  duration: string;
  views: number;
  likes: number;
  instructor: string;
  publishDate: string;
  type: 'video';
  format: 'horizontal' | 'vertical';
}

export const videosTutorielsData: Record<number, VideoTutorial> = {
  1: {
    id: 1,
    title: 'Maîtriser l\'IA pour la Formation Professionnelle',
    category: 'Tutoriel Vidéo',
    emoji: '🎥',
    description: 'Découvrez comment intégrer l\'intelligence artificielle dans vos parcours de formation pour maximiser l\'engagement et les résultats d\'apprentissage. Ce tutoriel complet vous guide pas à pas dans l\'utilisation des outils IA pour créer des expériences pédagogiques innovantes.',
    videoUrl: 'https://sample-videos.com/video123',
    thumbnail: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=1200&q=80',
    duration: '12:45',
    views: 3420,
    likes: 287,
    instructor: 'Sophie Martin',
    instructorAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop',
    publishDate: '15 Février 2026',
    tags: ['IA', 'Formation', 'Innovation', 'Digital Learning', 'ChatGPT'],
    format: 'horizontal',
    chapters: [
      'Introduction à l\'IA dans la formation',
      'Les outils IA pour la pédagogie',
      'Créer des parcours personnalisés',
      'Cas pratiques et exemples',
      'Bonnes pratiques et conclusion',
    ],
    transcript: 'Bienvenue dans ce tutoriel sur l\'IA et la formation professionnelle. Aujourd\'hui nous allons explorer ensemble comment l\'intelligence artificielle transforme la manière dont nous apprenons et transmettons les connaissances. Commençons par comprendre les bases de l\'IA générative et son application dans le contexte de la formation. Les outils comme ChatGPT, Claude et Gemini offrent des possibilités inédites pour personnaliser les parcours d\'apprentissage. Passons maintenant à la pratique avec un premier exemple concret : la création d\'un chatbot pédagogique personnalisé qui s\'adapte au niveau de chaque apprenant. L\'un des avantages majeurs de l\'IA est sa capacité à générer du contenu pédagogique diversifié en quelques secondes. Voici comment structurer vos prompts pour obtenir les meilleurs résultats. Pour conclure, quelques bonnes pratiques et pièges à éviter lors de l\'intégration de l\'IA dans vos programmes de formation.',
    resources: [
      {
        title: 'Templates de prompts ChatGPT',
        url: 'https://example.com/prompts-templates',
        type: 'pdf',
      },
      {
        title: 'Code source du chatbot',
        url: 'https://github.com/example/chatbot-pedagogique',
        type: 'code',
      },
      {
        title: 'Guide complet IA & Formation',
        url: 'https://example.com/guide-ia-formation',
        type: 'link',
      },
    ],
    relatedVideos: [
      {
        id: 2,
        title: 'Micro-learning en 60 secondes : L\'effet de primauté',
        thumbnail: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400&q=80',
        duration: '0:58',
        instructor: 'Marc Dubois',
        views: 1847,
      },
    ],
  },
  2: {
    id: 2,
    title: 'Micro-learning en 60 secondes : L\'effet de primauté',
    category: 'Quick Learn',
    emoji: '⚡',
    description: 'Découvrez en moins d\'une minute le principe psychologique de l\'effet de primauté et comment l\'utiliser pour maximiser la rétention d\'information dans vos formations.',
    videoUrl: 'https://sample-videos.com/video-vertical',
    thumbnail: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=600&q=80',
    duration: '0:58',
    views: 1847,
    likes: 156,
    instructor: 'Marc Dubois',
    instructorAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop',
    publishDate: '18 Février 2026',
    tags: ['Micro-learning', 'Psychologie', 'Mémoire', 'Quick Win'],
    format: 'vertical',
    transcript: 'L\'effet de primauté, c\'est notre tendance à mieux retenir les premières informations d\'une séquence d\'apprentissage. Pourquoi ? Parce que notre cerveau encode ces infos avec plus d\'intensité quand notre attention est maximale. En formation, commencez toujours par les concepts clés ! Les 5 premières minutes d\'un cours sont cruciales. Placez vos messages essentiels au début, votre audience les retiendra mieux. Astuce pro : résumez les points clés en intro ET en conclusion pour un double effet de primauté et de récence.',
  },
};

// Preview function for the list - Filter out vertical videos
export function getVideosTutorielsPreviews(): VideoTutorielPreview[] {
  return Object.values(videosTutorielsData)
    .filter((video) => video.format === 'horizontal') // Only horizontal videos
    .map((video) => ({
      id: video.id,
      title: video.title,
      category: video.category,
      emoji: video.emoji,
      duration: video.duration,
      views: video.views,
      likes: video.likes,
      instructor: video.instructor,
      publishDate: video.publishDate,
      type: 'video',
      format: video.format,
    }));
}

// Get full video data
export function getVideoTutoriel(id: number): VideoTutorial | null {
  return videosTutorielsData[id] || null;
}
