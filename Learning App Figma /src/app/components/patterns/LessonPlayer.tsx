import { useState } from 'react';
import { 
  Play, 
  Pause, 
  Volume2, 
  VolumeX,
  Maximize,
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  BookOpen,
  FileText,
  Download,
  MessageSquare,
} from 'lucide-react';
import { ButtonEnhanced } from '../ui/button-enhanced';
import { ProgressBarEnhanced } from '../ui/progress-bar-enhanced';
import VimeoPlayer from '../video/VimeoPlayer';

interface LessonPlayerProps {
  lesson: Lesson;
  onComplete: () => void;
  onNext?: () => void;
  onPrevious?: () => void;
  hasNext?: boolean;
  hasPrevious?: boolean;
}

export interface Lesson {
  id: string;
  title: string;
  description: string;
  type: 'video' | 'text' | 'interactive';
  duration: string;
  videoUrl?: string;
  content?: string;
  resources?: LessonResource[];
  transcript?: string;
}

interface LessonResource {
  id: string;
  title: string;
  type: 'pdf' | 'doc' | 'link';
  url: string;
}

export function LessonPlayer({ lesson, onComplete, onNext, onPrevious, hasNext, hasPrevious }: LessonPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [progress, setProgress] = useState(0);
  const [showTranscript, setShowTranscript] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);

  const handleComplete = () => {
    setIsCompleted(true);
    onComplete();
  };

  return (
    <div className="space-y-6">
      {/* ========== VIDEO/CONTENT PLAYER ========== */}
      {lesson.type === 'video' && lesson.videoUrl && (
        <div 
          className="rounded-3xl overflow-hidden"
          style={{
            background: 'var(--glass-white)',
            border: '1px solid var(--glass-border)',
            padding: 'var(--space-4)',
          }}
        >
          <VimeoPlayer
            videoId="76979871"
            title={lesson.title}
            showControls={true}
          />
        </div>
      )}

      {/* ========== TEXT CONTENT ========== */}
      {lesson.type === 'text' && (
        <div 
          className="p-8 rounded-3xl"
          style={{
            background: 'var(--glass-white)',
            border: '1px solid var(--glass-border)',
          }}
        >
          <div 
            style={{
              fontSize: 'var(--text-base)',
              color: 'var(--foreground)',
              lineHeight: 'var(--leading-relaxed)',
            }}
            dangerouslySetInnerHTML={{ __html: lesson.content || '' }}
          />
        </div>
      )}

      {/* ========== LESSON INFO ========== */}
      <div 
        className="p-6 rounded-2xl"
        style={{
          background: 'var(--glass-white)',
          border: '1px solid var(--glass-border)',
        }}
      >
        <h2 
          className="mb-2"
          style={{ 
            fontFamily: 'var(--font-display)',
            fontSize: 'var(--text-2xl)',
            fontWeight: 'var(--font-weight-bold)',
            color: 'var(--foreground)',
          }}
        >
          {lesson.title}
        </h2>
        <p 
          style={{ 
            fontSize: 'var(--text-base)',
            color: 'var(--muted-foreground)',
            lineHeight: 'var(--leading-relaxed)',
          }}
        >
          {lesson.description}
        </p>
      </div>

      {/* ========== RESOURCES ========== */}
      {lesson.resources && lesson.resources.length > 0 && (
        <div 
          className="p-6 rounded-2xl"
          style={{
            background: 'var(--glass-white)',
            border: '1px solid var(--glass-border)',
          }}
        >
          <h3 
            className="mb-4 flex items-center gap-2"
            style={{ 
              fontSize: 'var(--text-lg)',
              fontWeight: 'var(--font-weight-bold)',
              color: 'var(--foreground)',
            }}
          >
            <FileText className="w-5 h-5" style={{ color: 'var(--primary)' }} />
            Ressources téléchargeables
          </h3>

          <div className="space-y-3">
            {lesson.resources.map((resource) => (
              <a
                key={resource.id}
                href={resource.url}
                download
                className="flex items-center justify-between p-4 rounded-xl transition-all hover:-translate-y-1"
                style={{
                  background: 'var(--neutral-50)',
                  textDecoration: 'none',
                }}
              >
                <div className="flex items-center gap-3">
                  <div 
                    className="w-10 h-10 rounded-lg flex items-center justify-center"
                    style={{ background: 'var(--primary-lighter)' }}
                  >
                    <FileText className="w-5 h-5" style={{ color: 'var(--primary)' }} />
                  </div>
                  <p 
                    style={{ 
                      fontSize: 'var(--text-base)',
                      fontWeight: 'var(--font-weight-semibold)',
                      color: 'var(--foreground)',
                    }}
                  >
                    {resource.title}
                  </p>
                </div>

                <Download className="w-5 h-5" style={{ color: 'var(--muted-foreground)' }} />
              </a>
            ))}
          </div>
        </div>
      )}

      {/* ========== TRANSCRIPT ========== */}
      {lesson.transcript && (
        <div 
          className="rounded-2xl overflow-hidden"
          style={{
            background: 'var(--glass-white)',
            border: '1px solid var(--glass-border)',
          }}
        >
          <button
            onClick={() => setShowTranscript(!showTranscript)}
            className="w-full p-6 flex items-center justify-between"
          >
            <div className="flex items-center gap-2">
              <MessageSquare className="w-5 h-5" style={{ color: 'var(--primary)' }} />
              <h3 
                style={{ 
                  fontSize: 'var(--text-lg)',
                  fontWeight: 'var(--font-weight-bold)',
                  color: 'var(--foreground)',
                }}
              >
                Transcription
              </h3>
            </div>
            <ArrowRight 
              className="w-5 h-5 transition-transform" 
              style={{ 
                color: 'var(--muted-foreground)',
                transform: showTranscript ? 'rotate(90deg)' : 'rotate(0deg)',
              }} 
            />
          </button>

          {showTranscript && (
            <div 
              className="px-6 pb-6"
              style={{
                fontSize: 'var(--text-sm)',
                color: 'var(--muted-foreground)',
                lineHeight: 'var(--leading-relaxed)',
              }}
            >
              {lesson.transcript}
            </div>
          )}
        </div>
      )}

      {/* ========== NAVIGATION ========== */}
      <div className="flex items-center justify-between pt-6 border-t" style={{ borderColor: 'var(--border)' }}>
        <div>
          {hasPrevious && onPrevious && (
            <ButtonEnhanced
              variant="ghost"
              size="md"
              icon={<ArrowLeft className="w-5 h-5" />}
              onClick={onPrevious}
            >
              Leçon précédente
            </ButtonEnhanced>
          )}
        </div>

        <div className="flex items-center gap-3">
          {!isCompleted && (
            <ButtonEnhanced
              variant="secondary"
              size="lg"
              icon={<CheckCircle2 className="w-5 h-5" />}
              onClick={handleComplete}
            >
              Marquer comme terminé
            </ButtonEnhanced>
          )}

          {hasNext && onNext && (
            <ButtonEnhanced
              variant="primary"
              size="lg"
              icon={<ArrowRight className="w-5 h-5" />}
              iconPosition="right"
              onClick={onNext}
            >
              Leçon suivante
            </ButtonEnhanced>
          )}
        </div>
      </div>
    </div>
  );
}
