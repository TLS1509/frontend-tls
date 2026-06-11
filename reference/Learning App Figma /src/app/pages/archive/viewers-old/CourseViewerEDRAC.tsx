import { X, Play, CheckCircle2, ChevronRight } from 'lucide-react';
import { Button } from '../components/ui/button';
import VimeoPlayer from '../components/video/VimeoPlayer';

interface CourseViewerEDRACProps {
  onNavigate: (page: string) => void;
  onLogout?: () => void;
  onBack: () => void;
  courseId?: string;
}

export default function CourseViewerEDRAC({ onNavigate, onLogout, onBack, courseId }: CourseViewerEDRACProps) {
  const lessonId = parseInt(courseId || '1');
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center"
      style={{ background: 'rgba(0, 0, 0, 0.8)' }}
      onClick={onBack}
    >
      <div
        className="relative w-full max-w-6xl mx-4 rounded-3xl overflow-hidden"
        style={{
          background: 'var(--background)',
          maxHeight: '90vh',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onBack}
          className="absolute top-4 right-4 z-10 p-2 rounded-xl transition-all hover:scale-110"
          style={{
            background: 'rgba(0, 0, 0, 0.5)',
            backdropFilter: 'blur(10px)',
            color: 'white',
          }}
        >
          <X className="w-6 h-6" />
        </button>

        {/* Content */}
        <div className="overflow-y-auto" style={{ maxHeight: '90vh' }}>
          <div className="p-8">
            {/* Header */}
            <div className="mb-8">
              <div 
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl mb-4"
                style={{
                  background: 'var(--primary-50)',
                  color: 'var(--primary)',
                }}
              >
                <Play className="w-4 h-4" />
                <span style={{ fontSize: 'var(--text-sm)', fontWeight: 'var(--font-weight-medium)' }}>
                  Leçon {lessonId}
                </span>
              </div>

              <h1 
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 'var(--text-4xl)',
                  fontWeight: 'var(--font-weight-bold)',
                  color: 'var(--foreground)',
                  marginBottom: 'var(--spacing-md)',
                }}
              >
                Enjeux de la maîtrise du prompt
              </h1>

              <p style={{ fontSize: 'var(--text-lg)', color: 'var(--muted-foreground)' }}>
                Découvrez pourquoi maîtriser le prompt engineering est essentiel pour devenir un formateur augmenté par l'IA
              </p>
            </div>

            {/* Video Player */}
            <div className="mb-8">
              <VimeoPlayer
                videoId="76979871"
                title="Introduction au Prompt Engineering"
                showControls={true}
              />
            </div>

            {/* Lesson Content */}
            <div 
              className="prose max-w-none mb-8 p-6 rounded-2xl"
              style={{ 
                background: 'var(--neutral-50)',
                border: '1px solid var(--border)',
              }}
            >
              <h2 
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 'var(--text-2xl)',
                  fontWeight: 'var(--font-weight-bold)',
                  color: 'var(--foreground)',
                  marginBottom: 'var(--spacing-md)',
                }}
              >
                Points clés de la leçon
              </h2>
              
              <ul className="space-y-3">
                {[
                  'Comprendre les enjeux du prompt engineering',
                  'Identifier les composants d\'un prompt efficace',
                  'Reconnaître les erreurs courantes',
                  'Appliquer les bonnes pratiques',
                ].map((point, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: 'var(--success)' }} />
                    <span style={{ fontSize: 'var(--text-base)', color: 'var(--foreground)' }}>
                      {point}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Actions */}
            <div className="flex items-center justify-between">
              <Button
                onClick={onBack}
                variant="outline"
              >
                Fermer
              </Button>

              <Button
                variant="gradient-primary"
                onClick={() => {
                  // Mark as completed
                  onBack();
                }}
              >
                Marquer comme terminé
                <ChevronRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}