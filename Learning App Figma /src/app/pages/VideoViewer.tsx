import { 
  X, 
  Check,
  Play,
  Clock,
  BookOpen,
} from 'lucide-react';
import VimeoPlayer from '../components/video/VimeoPlayer';

interface VideoViewerProps {
  contentId: number;
  onClose: () => void;
}

interface VideoData {
  id: number;
  title: string;
  subtitle: string;
  category: string;
  duration: string;
  videoUrl: string;
  description: string;
  keyTakeaways: string[];
  chapters: {
    time: string;
    title: string;
  }[];
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
    description: 'Dans ce tutoriel vidéo, découvrez comment créer votre premier prompt de A à Z avec des exemples concrets et des astuces de pro. Vous apprendrez les 4 piliers du prompt engineering (RÔLE, CONTEXTE, INSTRUCTION, FORMAT) et comment les appliquer dans vos projets quotidiens.',
    keyTakeaways: [
      'Comprendre la structure d\'un bon prompt',
      'Utiliser le framework RCIF (Rôle, Contexte, Instruction, Format)',
      'Éviter les erreurs de débutant',
      'Optimiser itérativement vos prompts pour de meilleurs résultats',
    ],
    chapters: [
      { time: '00:00', title: 'Introduction au prompt engineering' },
      { time: '02:30', title: 'Les 4 piliers du prompt (RCIF)' },
      { time: '06:15', title: 'Exemples pratiques' },
      { time: '09:45', title: 'Erreurs courantes à éviter' },
      { time: '11:20', title: 'Conclusion et ressources' },
    ],
    tags: ['Tutoriel', 'Vidéo', 'Prompt Engineering', 'Pratique', 'IA'],
  };
};

export default function VideoViewer({ 
  contentId, 
  onClose 
}: VideoViewerProps) {
  const data = getVideoData(contentId);

  return (
    <div 
      className="fixed inset-0 z-50 overflow-y-auto"
      style={{ 
        background: 'linear-gradient(176deg, rgb(232, 244, 247) 0%, rgb(255, 249, 238) 100%)',
      }}
    >
      <div className="min-h-screen py-8 px-8">
        <div className="max-w-6xl mx-auto pb-8">
          {/* Header */}
          <div className="mb-8 flex items-start justify-between">
            <div className="flex-1">
              {/* Badge */}
              <div className="mb-4 flex items-center gap-3">
                <span 
                  className="px-3 py-1 rounded inline-block text-xs font-bold uppercase"
                  style={{
                    background: 'var(--accent)',
                    color: 'white',
                    letterSpacing: 'var(--tracking-wide)',
                  }}
                >
                  {data.category}
                </span>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4" style={{ color: 'var(--muted-foreground)' }} />
                  <span 
                    style={{ 
                      fontSize: 'var(--text-sm)',
                      color: 'var(--muted-foreground)',
                      fontWeight: 'var(--font-weight-medium)',
                    }}
                  >
                    {data.duration}
                  </span>
                </div>
              </div>
              
              {/* Title */}
              <h1 
                className="mb-2"
                style={{ 
                  fontSize: 'var(--text-4xl)',
                  fontWeight: 'var(--font-weight-bold)',
                  color: 'var(--primary)',
                  fontFamily: 'var(--font-display)',
                  lineHeight: 'var(--leading-tight)',
                }}
              >
                {data.title}
              </h1>
              
              {/* Subtitle */}
              <p 
                style={{ 
                  fontSize: 'var(--text-base)',
                  color: 'var(--muted-foreground)',
                }}
              >
                {data.subtitle}
              </p>
            </div>

            <button
              onClick={onClose}
              className="p-2 rounded-lg hover:bg-white/50 transition-colors"
            >
              <X className="w-6 h-6" style={{ color: 'var(--muted-foreground)' }} />
            </button>
          </div>

          {/* Video Player Card */}
          <div 
            className="rounded-3xl overflow-hidden mb-8"
            style={{
              background: 'white',
              boxShadow: '0 8px 32px rgba(0, 0, 0, 0.15)',
              border: '3px solid var(--accent)',
            }}
          >
            {/* Vimeo Player */}
            <VimeoPlayer
              videoId="76979871"
              title={data.title}
              showControls={true}
            />

            {/* Video Info */}
            <div className="p-8">
              <div className="flex items-start gap-4 mb-6">
                <div 
                  className="w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0"
                  style={{ 
                    background: 'var(--primary)',
                  }}
                >
                  <Play className="w-7 h-7 text-white" />
                </div>
                <div className="flex-1">
                  <h2 
                    className="mb-2"
                    style={{ 
                      fontSize: 'var(--text-2xl)',
                      fontWeight: 'var(--font-weight-bold)',
                      color: 'var(--foreground)',
                      fontFamily: 'var(--font-display)',
                    }}
                  >
                    À propos de cette vidéo
                  </h2>
                  <p 
                    style={{ 
                      fontSize: 'var(--text-base)',
                      color: 'var(--muted-foreground)',
                      lineHeight: 'var(--leading-relaxed)',
                    }}
                  >
                    {data.description}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Two Column Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Key Takeaways */}
            <div 
              className="p-8 rounded-2xl"
              style={{
                background: 'white',
                boxShadow: '0 4px 24px rgba(0, 0, 0, 0.08)',
              }}
            >
              <div className="flex items-center gap-3 mb-6">
                <div 
                  className="w-10 h-10 rounded-xl flex items-center justify-center"
                  style={{ background: 'var(--success)' }}
                >
                  <Check className="w-5 h-5 text-white" />
                </div>
                <h3 
                  style={{ 
                    fontSize: 'var(--text-xl)',
                    fontWeight: 'var(--font-weight-bold)',
                    color: 'var(--foreground)',
                    fontFamily: 'var(--font-display)',
                  }}
                >
                  À retenir
                </h3>
              </div>
              <div className="space-y-4">
                {data.keyTakeaways.map((takeaway, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <div 
                      className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
                      style={{ background: 'var(--success)' }}
                    >
                      <Check className="w-4 h-4 text-white" />
                    </div>
                    <p 
                      style={{ 
                        fontSize: 'var(--text-sm)',
                        color: 'var(--foreground)',
                        lineHeight: 'var(--leading-relaxed)',
                      }}
                    >
                      {takeaway}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Chapters */}
            <div 
              className="p-8 rounded-2xl"
              style={{
                background: 'white',
                boxShadow: '0 4px 24px rgba(0, 0, 0, 0.08)',
              }}
            >
              <div className="flex items-center gap-3 mb-6">
                <div 
                  className="w-10 h-10 rounded-xl flex items-center justify-center"
                  style={{ background: 'var(--primary)' }}
                >
                  <BookOpen className="w-5 h-5 text-white" />
                </div>
                <h3 
                  style={{ 
                    fontSize: 'var(--text-xl)',
                    fontWeight: 'var(--font-weight-bold)',
                    color: 'var(--foreground)',
                    fontFamily: 'var(--font-display)',
                  }}
                >
                  Chapitres
                </h3>
              </div>
              <div className="space-y-3">
                {data.chapters.map((chapter, index) => (
                  <button
                    key={index}
                    className="w-full flex items-start gap-4 p-3 rounded-xl transition-all duration-200 hover:scale-102"
                    style={{
                      background: 'var(--neutral-100)',
                      border: '1px solid var(--border)',
                    }}
                  >
                    <div 
                      className="px-3 py-1 rounded-lg flex-shrink-0"
                      style={{
                        background: 'var(--primary)',
                        color: 'white',
                      }}
                    >
                      <span 
                        style={{
                          fontSize: 'var(--text-xs)',
                          fontWeight: 'var(--font-weight-bold)',
                        }}
                      >
                        {chapter.time}
                      </span>
                    </div>
                    <p 
                      className="text-left"
                      style={{ 
                        fontSize: 'var(--text-sm)',
                        color: 'var(--foreground)',
                        fontWeight: 'var(--font-weight-medium)',
                      }}
                    >
                      {chapter.title}
                    </p>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Tags */}
          <div className="mt-8">
            <div className="flex flex-wrap gap-2">
              {data.tags.map((tag, index) => (
                <span 
                  key={index}
                  className="px-4 py-2 rounded-lg"
                  style={{
                    background: 'white',
                    color: 'var(--foreground)',
                    fontSize: 'var(--text-sm)',
                    fontWeight: 'var(--font-weight-medium)',
                    border: '1px solid var(--border)',
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Action Button */}
          <div className="mt-8 flex justify-center">
            <button
              onClick={onClose}
              className="px-8 py-4 rounded-xl flex items-center gap-3 transition-all duration-200 hover:scale-105"
              style={{
                background: 'var(--primary)',
                color: 'white',
                fontSize: 'var(--text-base)',
                fontWeight: 'var(--font-weight-semibold)',
                boxShadow: '0 4px 16px rgba(85, 161, 180, 0.3)',
              }}
            >
              <Check className="w-5 h-5" />
              Marquer comme vu
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
