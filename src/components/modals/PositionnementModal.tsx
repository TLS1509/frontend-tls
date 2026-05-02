import React, { useState, useEffect } from 'react';
import { ArrowRight, X, Sparkles } from 'lucide-react';

/**
 * PositionnementModal — Auto-évaluation des compétences avant un parcours
 * Design: Progressive Cards, 5 niveaux, auto-avancement, success screen
 * Tokens: TLS design system (--tls-primary-*, --s-*, --r-*, --shadow-*)
 */
import './modals.css';

interface Question {
  id: number;
  title: string;
  description: string;
  competenceKey?: string;
}

interface Level {
  id: string;
  emoji: string;
  label: string;
  description: string;
  value: number;
  color: string;
  colorLight: string;
  glowColor: string;
}

interface PositionnementModalProps {
  isOpen: boolean;
  onClose: () => void;
  courseTitle?: string;
  courseId?: string;
  questions?: Question[];
  onComplete?: (responses: Record<number, string>, competences: Record<string, number>) => void;
  onStartCourse?: () => void;
  onPositionnementComplete?: () => void;
}

const DEFAULT_QUESTIONS: Question[] = [
  {
    id: 1,
    title: 'Maîtrise des outils numériques',
    description: 'Comment évaluez-vous votre niveau actuel ?',
    competenceKey: 'outils_numeriques',
  },
  {
    id: 2,
    title: 'Analyse de données',
    description: 'Quelle est votre aisance avec les statistiques ?',
    competenceKey: 'analyse_donnees',
  },
  {
    id: 3,
    title: 'Communication digitale',
    description: 'Comment vous situez-vous en communication en ligne ?',
    competenceKey: 'communication_digitale',
  },
];

const LEVELS: Level[] = [
  { id: 'debutant',      emoji: '🌱', label: 'Débutant',      description: 'Je découvre',      value: 1, color: '#FFC15A', colorLight: 'rgba(255,193,90,0.12)',  glowColor: 'rgba(255,193,90,0.35)' },
  { id: 'novice',        emoji: '🔥', label: 'Novice',        description: 'Bases acquises',   value: 2, color: '#F8B044', colorLight: 'rgba(248,176,68,0.12)',  glowColor: 'rgba(248,176,68,0.35)' },
  { id: 'intermediaire', emoji: '🎯', label: 'Intermédiaire', description: 'Autonome',         value: 3, color: '#f49a76', colorLight: 'rgba(244,154,118,0.12)', glowColor: 'rgba(244,154,118,0.35)' },
  { id: 'avance',        emoji: '🚀', label: 'Avancé',        description: "Très à l'aise",   value: 4, color: '#55A1B4', colorLight: 'rgba(85,161,180,0.12)',  glowColor: 'rgba(85,161,180,0.35)' },
  { id: 'expert',        emoji: '⭐', label: 'Expert',        description: 'Maîtrise totale',  value: 5, color: '#9dbeba', colorLight: 'rgba(157,190,186,0.12)', glowColor: 'rgba(157,190,186,0.35)' },
];

export const PositionnementModal: React.FC<PositionnementModalProps> = ({
  isOpen,
  onClose,
  courseTitle = 'Positionnement Apprenant',
  courseId,
  questions = DEFAULT_QUESTIONS,
  onComplete,
  onStartCourse,
  onPositionnementComplete,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [responses, setResponses] = useState<Record<number, string>>({});
  const [selectedLevel, setSelectedLevel] = useState<string | null>(null);
  const [isCompleted, setIsCompleted] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setCurrentIndex(0);
      setResponses({});
      setSelectedLevel(null);
      setIsCompleted(false);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const currentQuestion = questions[currentIndex];
  const progress = ((currentIndex + 1) / questions.length) * 100;
  const isLastQuestion = currentIndex === questions.length - 1;
  const canProceed = selectedLevel !== null;

  const handleLevelSelect = (levelId: string) => {
    setSelectedLevel(levelId);
    setResponses((prev) => ({ ...prev, [currentQuestion.id]: levelId }));
  };

  const handleNext = () => {
    if (!canProceed) return;
    if (isLastQuestion) {
      const competences: Record<string, number> = {};
      questions.forEach((q) => {
        if (q.competenceKey && responses[q.id]) {
          const level = LEVELS.find((l) => l.id === responses[q.id]);
          if (level) competences[q.competenceKey] = level.value;
        }
      });
      console.log('💾 Positionnement:', { courseId, responses, competences });
      setIsCompleted(true);
      onComplete?.(responses, competences);
      setTimeout(() => {
        onClose();
        onPositionnementComplete?.();
        onStartCourse?.();
      }, 2200);
    } else {
      setCurrentIndex((prev) => prev + 1);
      setSelectedLevel(responses[questions[currentIndex + 1]?.id] ?? null);
    }
  };

  return (
    <>
      <div
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: 1000,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: 'var(--s-4)',
          background: 'rgba(0,0,0,0.45)',
          backdropFilter: 'blur(8px)',
          WebkitBackdropFilter: 'blur(8px)',
          animation: 'modalBdIn 0.22s ease both',
        }}
        onClick={onClose}
      >
        {/* Modal container */}
        <div
          onClick={(e) => e.stopPropagation()}
          className="modal--positionement modal__content"
        >
          {/* Close */}
          <button
            onClick={onClose}
            className="modal__close-btn"
            style={{ top: 'var(--s-5)', right: 'var(--s-5)', width: 36, height: 36 }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'var(--tls-danger-bg, rgba(220,38,38,0.08))';
              e.currentTarget.style.color = '#dc2626';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'var(--surface)';
              e.currentTarget.style.color = 'var(--text-muted)';
            }}
            aria-label="Fermer"
          >
            <X size={16} />
          </button>

          <div style={{ padding: 'var(--s-8)' }}>
            {!isCompleted ? (
              <>
                {/* Header + progress */}
                <div style={{ marginBottom: 'var(--s-6)' }}>
                  <p style={{ margin: '0 0 var(--s-1)', fontSize: 'var(--t-caption)', color: 'var(--tls-primary-600)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                    {courseTitle}
                  </p>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--s-2)' }}>
                    <span style={{ fontSize: 'var(--t-caption)', color: 'var(--text-muted)' }}>
                      Question {currentIndex + 1} / {questions.length}
                    </span>
                    <span style={{ fontSize: 'var(--t-caption)', fontWeight: 700, color: 'var(--tls-primary-600)' }}>
                      {Math.round(progress)}%
                    </span>
                  </div>
                  <div className="modal__progress-bar">
                    <div
                      className="modal__progress-fill"
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                </div>

                {/* Question card */}
                <div
                  style={{
                    background: 'var(--surface)',
                    borderRadius: 'var(--r-xl)',
                    padding: 'var(--s-6)',
                    boxShadow: 'var(--shadow-md)',
                    marginBottom: 'var(--s-6)',
                    border: '1px solid var(--border)',
                  }}
                >
                  <h2 style={{ margin: '0 0 var(--s-2)', fontSize: 'var(--t-h3)', fontWeight: 800, color: 'var(--text)', lineHeight: 1.2 }}>
                    {currentQuestion.title}
                  </h2>
                  <p style={{ margin: 0, fontSize: 'var(--t-body)', color: 'var(--text-muted)' }}>
                    {currentQuestion.description}
                  </p>
                </div>

                {/* Level selection */}
                <div className="modal__level-grid">
                  {LEVELS.map((level) => {
                    const isSelected = selectedLevel === level.id;
                    return (
                      <button
                        key={level.id}
                        onClick={() => handleLevelSelect(level.id)}
                        className={`modal__level-btn ${isSelected ? 'modal__level-btn--selected' : ''}`}
                        style={{
                          background: isSelected ? level.colorLight : 'var(--surface)',
                          borderColor: isSelected ? level.color : 'var(--border)',
                          boxShadow: isSelected ? `0 8px 24px ${level.glowColor}, var(--shadow-sm)` : 'var(--shadow-xs)',
                          transform: isSelected ? 'translateY(-4px) scale(1.04)' : 'translateY(0) scale(1)',
                        }}
                        onMouseEnter={(e) => {
                          if (!isSelected) {
                            e.currentTarget.style.transform = 'translateY(-3px) scale(1.02)';
                            e.currentTarget.style.boxShadow = `0 8px 20px ${level.glowColor}`;
                            e.currentTarget.style.borderColor = level.color;
                          }
                        }}
                        onMouseLeave={(e) => {
                          if (!isSelected) {
                            e.currentTarget.style.transform = 'translateY(0) scale(1)';
                            e.currentTarget.style.boxShadow = 'var(--shadow-xs)';
                            e.currentTarget.style.borderColor = 'var(--border)';
                          }
                        }}
                      >
                        <span className="modal__level-emoji">{level.emoji}</span>
                        <span className="modal__level-label" style={{ color: isSelected ? level.color : 'var(--text)' }}>
                          {level.label}
                        </span>
                        <span style={{ fontSize: '11px', color: 'var(--text-muted)', textAlign: 'center' }}>
                          {level.description}
                        </span>
                      </button>
                    );
                  })}
                </div>

                {/* Next button */}
                <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                  <button
                    onClick={handleNext}
                    disabled={!canProceed}
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: 'var(--s-2)',
                      padding: 'var(--s-3) var(--s-6)',
                      borderRadius: 'var(--r-xl)',
                      background: canProceed ? 'var(--tls-primary-500)' : 'var(--border)',
                      color: canProceed ? '#fff' : 'var(--text-muted)',
                      border: 'none',
                      fontWeight: 700,
                      fontSize: 'var(--t-body)',
                      cursor: canProceed ? 'pointer' : 'not-allowed',
                      transition: 'all var(--dur-2)',
                      opacity: canProceed ? 1 : 0.6,
                      boxShadow: canProceed ? '0 4px 14px rgba(85,161,180,0.35)' : 'none',
                    }}
                    onMouseEnter={(e) => {
                      if (canProceed) {
                        (e.currentTarget as HTMLButtonElement).style.transform = 'translateX(3px)';
                        (e.currentTarget as HTMLButtonElement).style.boxShadow = '0 6px 20px rgba(85,161,180,0.45)';
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (canProceed) {
                        (e.currentTarget as HTMLButtonElement).style.transform = 'translateX(0)';
                        (e.currentTarget as HTMLButtonElement).style.boxShadow = '0 4px 14px rgba(85,161,180,0.35)';
                      }
                    }}
                  >
                    {isLastQuestion ? 'Terminer' : 'Suivant'}
                    <ArrowRight size={18} />
                  </button>
                </div>
              </>
            ) : (
              /* Success screen */
              <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--s-5)', animation: 'modalIn 0.4s ease both' }}>
                <div
                  style={{
                    background: 'var(--surface)',
                    borderRadius: 'var(--r-xl)',
                    padding: 'var(--s-8)',
                    border: '1.5px solid rgba(85,161,180,0.2)',
                    boxShadow: 'var(--shadow-lg)',
                    textAlign: 'center',
                  }}
                >
                  <div style={{ display: 'inline-flex', gap: 'var(--s-2)', marginBottom: 'var(--s-5)', padding: 'var(--s-3)', borderRadius: 'var(--r-xl)', background: 'var(--surface-muted)' }}>
                    {['🎯', '⭐', '🚀'].map((e) => (
                      <div key={e} style={{ width: 44, height: 44, borderRadius: 'var(--r-lg)', background: 'var(--tls-primary-100)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.4rem' }}>{e}</div>
                    ))}
                  </div>
                  <h3 style={{ margin: '0 0 var(--s-2)', fontSize: 'var(--t-h3)', fontWeight: 800, color: 'var(--text)' }}>Votre profil est prêt !</h3>
                  <p style={{ margin: '0 0 var(--s-6)', fontSize: 'var(--t-body)', color: 'var(--text-muted)' }}>
                    Le parcours va maintenant s'adapter à votre niveau.
                  </p>

                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 'var(--s-3)', marginBottom: 'var(--s-5)' }}>
                    {[
                      { icon: '📊', label: 'Compétences enregistrées', border: 'rgba(85,161,180,0.15)' },
                      { icon: '🎯', label: 'Parcours personnalisé',    border: 'rgba(248,176,68,0.15)' },
                      { icon: '🚀', label: 'Progression optimisée',    border: 'rgba(237,132,58,0.15)' },
                    ].map((f) => (
                      <div key={f.icon} style={{ padding: 'var(--s-4)', borderRadius: 'var(--r-lg)', background: 'var(--surface-muted)', border: `1px solid ${f.border}` }}>
                        <div style={{ fontSize: '2rem', marginBottom: 'var(--s-2)' }}>{f.icon}</div>
                        <p style={{ margin: 0, fontSize: 'var(--t-caption)', fontWeight: 600, color: 'var(--text)', lineHeight: 1.3 }}>{f.label}</p>
                      </div>
                    ))}
                  </div>

                  <div style={{ display: 'flex', gap: 'var(--s-3)', padding: 'var(--s-4)', borderRadius: 'var(--r-lg)', background: 'var(--tls-primary-50)', border: '1px solid rgba(85,161,180,0.2)', textAlign: 'left' }}>
                    <div style={{ flexShrink: 0, width: 36, height: 36, borderRadius: 'var(--r-md)', background: 'var(--tls-primary-500)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <Sparkles size={18} style={{ color: '#fff' }} />
                    </div>
                    <div>
                      <p style={{ margin: '0 0 var(--s-1)', fontSize: 'var(--t-caption)', fontWeight: 700, color: 'var(--tls-primary-600)' }}>🔮 Prochainement : Adaptive Learning</p>
                      <p style={{ margin: 0, fontSize: 'var(--t-caption)', color: 'var(--text-muted)', lineHeight: 1.5 }}>
                        Votre <strong>Passport de Compétences</strong> personnalisera le contenu en fonction de votre progression.
                      </p>
                    </div>
                  </div>
                </div>

                <div style={{ textAlign: 'center', padding: 'var(--s-3)', borderRadius: 'var(--r-lg)', background: 'rgba(85,161,180,0.06)', animation: 'tls-pulse 2s ease-in-out infinite' }}>
                  <p style={{ margin: 0, fontSize: 'var(--t-caption)', color: 'var(--text-muted)' }}>
                    Redirection vers votre parcours dans quelques instants… 🎓
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <style>{`
        @keyframes modalBdIn { from { opacity: 0 } to { opacity: 1 } }
        @keyframes modalIn {
          from { opacity: 0; transform: translateY(16px) scale(0.97); }
          to   { opacity: 1; transform: translateY(0) scale(1); }
        }
        @keyframes tls-pulse {
          0%, 100% { opacity: 1; } 50% { opacity: 0.6; }
        }
      `}</style>
    </>
  );
};

export default PositionnementModal;
