import FlashcardsViewer from './FlashcardsViewer';
import AstucesViewer from './AstucesViewer';
import VideoViewer from './VideoViewer';
import { 
  X, 
  Check,
} from 'lucide-react';

interface ComplementaryContentViewerProps {
  contentId: number;
  contentType: 'flashcards' | 'astuces' | 'guide' | 'video';
  onClose: () => void;
}

// ========== GUIDE DATA ==========
interface GuideData {
  id: number;
  title: string;
  subtitle: string;
  category: string;
  duration: string;
  sections: {
    title: string;
    content: string;
  }[];
  tags: string[];
}

const getGuideData = (id: number): GuideData => {
  return {
    id,
    title: 'Guide complet du prompt engineering',
    subtitle: 'Tout ce que vous devez savoir pour maîtriser l\'art du prompting',
    category: 'GUIDE',
    duration: '8 MIN',
    sections: [
      {
        title: 'Introduction au prompt engineering',
        content: 'Le prompt engineering est l\'art de formuler des instructions claires et précises pour obtenir les meilleurs résultats d\'une IA générative. Cette compétence est devenue essentielle pour tirer le maximum des outils comme ChatGPT, Claude, ou Midjourney.',
      },
      {
        title: 'Les 4 composants essentiels',
        content: 'Un prompt efficace se compose de 4 éléments : 1) Le RÔLE (persona de l\'IA), 2) Le CONTEXTE (cadre et objectifs), 3) L\'INSTRUCTION (tâche précise), 4) Le FORMAT (structure de sortie attendue). En combinant ces éléments, vous maximisez vos chances d\'obtenir une réponse pertinente.',
      },
      {
        title: 'Exemples concrets',
        content: 'Mauvais prompt : "Parle-moi de marketing". Bon prompt : "Tu es un expert en marketing digital. Je suis formateur et je prépare un cours sur le SEO pour débutants. Explique-moi en 200 mots les 3 piliers du SEO avec des exemples concrets, formatés en liste à puces."',
      },
      {
        title: 'Techniques avancées',
        content: 'Pour aller plus loin, utilisez le Chain-of-Thought (demandez à l\'IA de raisonner étape par étape), le Few-Shot Learning (donnez des exemples), ou le prompting itératif (affinez progressivement vos prompts en fonction des réponses).',
      },
      {
        title: 'Erreurs courantes à éviter',
        content: 'Ne soyez pas trop vague, n\'oubliez pas de donner du contexte, ne demandez pas plusieurs tâches complexes en un seul prompt, et n\'attendez pas la perfection du premier coup. L\'itération est la clé !',
      },
    ],
    tags: ['Guide', 'Prompt Engineering', 'Formation', 'Pédagogie'],
  };
};

// ========== VIDÉO DATA ==========
interface VideoData {
  id: number;
  title: string;
  subtitle: string;
  category: string;
  duration: string;
  videoUrl: string;
  description: string;
  keyTakeaways: string[];
  tags: string[];
}

const getVideoData = (id: number): VideoData => {
  return {
    id,
    title: 'Tutoriel vidéo : Créer votre premier prompt',
    subtitle: 'Apprenez pas-à-pas à créer un prompt efficace',
    category: 'VIDÉO',
    duration: '12 MIN',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    description: 'Dans ce tutoriel vidéo, découvrez comment créer votre premier prompt de A à Z avec des exemples concrets et des astuces de pro.',
    keyTakeaways: [
      'Comprendre la structure d\'un bon prompt',
      'Utiliser le framework RCIF',
      'Éviter les erreurs de débutant',
      'Optimiser itérativement vos prompts',
    ],
    tags: ['Tutoriel', 'Vidéo', 'Prompt', 'Pratique'],
  };
};

export default function ComplementaryContentViewer({ 
  contentId, 
  contentType, 
  onClose 
}: ComplementaryContentViewerProps) {
  // ========== FLASHCARDS VIEWER ==========
  if (contentType === 'flashcards') {
    return <FlashcardsViewer contentId={contentId} onClose={onClose} />;
  }

  // ========== ASTUCES VIEWER ==========
  if (contentType === 'astuces') {
    return <AstucesViewer contentId={contentId} onClose={onClose} />;
  }

  // ========== VIDÉO VIEWER ==========
  if (contentType === 'video') {
    return <VideoViewer contentId={contentId} onClose={onClose} />;
  }

  return null;
}