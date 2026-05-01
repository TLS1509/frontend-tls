import { useState, useEffect } from 'react';
import { ArrowRight, X, CheckCircle2, Sparkles } from 'lucide-react';

/**
 * TLS Positionnement Modal - Progressive Cards
 * Modal de positionnement apprenant avec navigation question par question
 * Design inspiré de Progressive Cards avec auto-avancement et progression
 * Intégration: Compétences du profil + Préparation Adaptive Learning
 */

interface Question {
  id: number;
  title: string;
  description: string;
  competenceKey?: string; // Lien avec les compétences du profil
}

interface Level {
  id: string;
  emoji: string;
  label: string;
  description: string;
  value: number; // Pour scoring et adaptive learning
  color: string; // Couleur principale TLS
  colorLight: string; // Couleur de fond
  glowColor: string; // Couleur du glow effect
}

interface PositionnementModalProps {
  isOpen: boolean;
  onClose: () => void;
  courseTitle?: string;
  courseId?: string;
  questions?: Question[];
  onComplete?: (responses: Record<number, string>, competences: Record<string, number>) => void;
  onStartCourse?: () => void; // Callback pour démarrer le parcours après positionnement
  onPositionnementComplete?: () => void; // Callback pour afficher le banner de succès après fermeture
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
  { 
    id: 'debutant', 
    emoji: '🌱', 
    label: 'Débutant', 
    description: 'Je découvre', 
    value: 1,
    color: '#FFC15A',           // Jaune clair (Accent 300)
    colorLight: '#FFF9EE',
    glowColor: 'rgba(255, 193, 90, 0.4)',
  },
  { 
    id: 'novice', 
    emoji: '🔥', 
    label: 'Novice', 
    description: 'Bases acquises', 
    value: 2,
    color: '#F8B044',           // Jaune orangé (Accent - Jaune TLS)
    colorLight: '#FFECC8',
    glowColor: 'rgba(248, 176, 68, 0.4)',
  },
  { 
    id: 'intermediaire', 
    emoji: '🎯', 
    label: 'Intermédiaire', 
    description: 'Autonome', 
    value: 3,
    color: '#f49a76',           // Coral - Orange Saumon (NOUVEAU)
    colorLight: '#fef4f0',
    glowColor: 'rgba(244, 154, 118, 0.4)',
  },
  { 
    id: 'avance', 
    emoji: '🚀', 
    label: 'Avancé', 
    description: 'Très à l\'aise', 
    value: 4,
    color: '#55A1B4',           // Bleu TLS (Primary)
    colorLight: '#E8F4F7',
    glowColor: 'rgba(85, 161, 180, 0.4)',
  },
  { 
    id: 'expert', 
    emoji: '⭐', 
    label: 'Expert', 
    description: 'Maîtrise totale', 
    value: 5,
    color: '#9dbeba',           // Teal - Bleu-Vert (NOUVEAU)
    colorLight: '#e8f2f0',
    glowColor: 'rgba(157, 190, 186, 0.5)',
  },
];

export default function PositionnementModal({
  isOpen,
  onClose,
  courseTitle = 'Positionnement Apprenant',
  courseId,
  questions = DEFAULT_QUESTIONS,
  onComplete,
  onStartCourse,
  onPositionnementComplete,
}: PositionnementModalProps) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [responses, setResponses] = useState<Record<number, string>>({});
  const [selectedLevel, setSelectedLevel] = useState<string | null>(null);
  const [isCompleted, setIsCompleted] = useState(false);

  // Reset state when modal opens
  useEffect(() => {
    if (isOpen) {
      setCurrentQuestionIndex(0);
      setResponses({});
      setSelectedLevel(null);
      setIsCompleted(false);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const currentQuestion = questions[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / questions.length) * 100;
  const isLastQuestion = currentQuestionIndex === questions.length - 1;
  const canProceed = selectedLevel !== null;

  const handleLevelSelect = (levelId: string) => {
    setSelectedLevel(levelId);
    setResponses(prev => ({ ...prev, [currentQuestion.id]: levelId }));
  };

  const handleNext = () => {
    if (!canProceed) return;

    if (isLastQuestion) {
      // Complete assessment - Calculate competences scores
      const competences: Record<string, number> = {};
      questions.forEach((q) => {
        if (q.competenceKey && responses[q.id]) {
          const level = LEVELS.find(l => l.id === responses[q.id]);
          if (level) {
            competences[q.competenceKey] = level.value;
          }
        }
      });

      // Save to profile (mock - will integrate with real profile system)
      console.log('💾 Positionnement saved to profile:', {
        courseId,
        responses,
        competences,
        timestamp: new Date().toISOString(),
      });

      // Show confirmation screen
      setIsCompleted(true);

      // Call completion callback
      onComplete?.(responses, competences);

      // Auto close and start course after 2 seconds, then show banner
      setTimeout(() => {
        onClose();
        onPositionnementComplete?.(); // Trigger banner display in parent
        onStartCourse?.();
      }, 2000);
    } else {
      // Move to next question
      setCurrentQuestionIndex(prev => prev + 1);
      setSelectedLevel(responses[questions[currentQuestionIndex + 1]?.id] || null);
    }
  };

  return (
    <>
      {/* Backdrop with blur */}
      <div
        className="fixed inset-0 z-50 flex items-center justify-center p-4"
        style={{
          background: 'rgba(0, 0, 0, 0.4)',
          backdropFilter: 'blur(8px)',
          WebkitBackdropFilter: 'blur(8px)',
        }}
        onClick={onClose}
      >
        {/* Modal Container */}
        <div
          className="relative w-full max-w-[900px]"
          onClick={(e) => e.stopPropagation()}
          style={{
            background: 'linear-gradient(150.76deg, rgb(232, 244, 247) 0%, rgb(255, 249, 238) 100%)',
            borderRadius: 'var(--radius-3xl)',
            padding: 'var(--space-2)',
            border: '2px solid rgba(0, 0, 0, 0.1)',
          }}
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-6 right-6 z-10"
            style={{
              width: '40px',
              height: '40px',
              borderRadius: 'var(--radius-full)',
              background: 'white',
              border: '1px solid rgba(0, 0, 0, 0.1)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              transition: 'all var(--duration-base) ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'scale(1.1)';
              e.currentTarget.style.background = 'var(--destructive)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'scale(1)';
              e.currentTarget.style.background = 'white';
            }}
          >
            <X className="w-5 h-5" style={{ color: 'var(--muted-foreground)' }} />
          </button>

          {/* Content Container */}
          <div style={{ padding: 'var(--space-10)' }}>
            {!isCompleted ? (
              <>
                {/* Progress Bar Section */}
                <div style={{ marginBottom: 'var(--space-8)' }}>
                  {/* Question Counter + Percentage */}
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      marginBottom: 'var(--space-3)',
                    }}
                  >
                    <span
                      style={{
                        fontFamily: 'var(--font-body)',
                        fontSize: 'var(--text-sm)',
                        color: 'var(--muted-foreground)',
                        lineHeight: '1',
                      }}
                    >
                      Question {currentQuestionIndex + 1} / {questions.length}
                    </span>
                    <span
                      style={{
                        fontFamily: 'var(--font-body)',
                        fontSize: 'var(--text-sm)',
                        fontWeight: 'var(--font-weight-bold)',
                        color: 'var(--primary)',
                        lineHeight: '1',
                      }}
                    >
                      {Math.round(progress)}%
                    </span>
                  </div>

                  {/* Progress Bar */}
                  <div
                    style={{
                      width: '100%',
                      height: '8px',
                      background: 'rgba(0, 0, 0, 0.05)',
                      borderRadius: 'var(--radius-full)',
                      overflow: 'hidden',
                    }}
                  >
                    <div
                      style={{
                        width: `${progress}%`,
                        height: '100%',
                        background: 'linear-gradient(90deg, var(--primary), var(--primary-dark))',
                        borderRadius: 'var(--radius-full)',
                        transition: 'width var(--duration-slow) var(--ease-out)',
                      }}
                    />
                  </div>
                </div>

                {/* Question Card */}
                <div
                  style={{
                    background: 'white',
                    borderRadius: 'var(--radius-3xl)',
                    padding: 'var(--space-8)',
                    boxShadow: '0 20px 25px 0 rgba(0, 0, 0, 0.1), 0 8px 10px 0 rgba(0, 0, 0, 0.1)',
                    marginBottom: 'var(--space-8)',
                  }}
                >
                  {/* Question Title */}
                  <h2
                    style={{
                      fontFamily: 'var(--font-display)',
                      fontSize: 'var(--text-3xl)',
                      fontWeight: 'var(--font-weight-bold)',
                      color: 'var(--foreground)',
                      lineHeight: 'var(--leading-tight)',
                      margin: 0,
                      marginBottom: 'var(--space-3)',
                    }}
                  >
                    {currentQuestion.title}
                  </h2>

                  {/* Question Description */}
                  <p
                    style={{
                      fontFamily: 'var(--font-body)',
                      fontSize: 'var(--text-base)',
                      color: 'var(--muted-foreground)',
                      lineHeight: 'var(--leading-normal)',
                      margin: 0,
                    }}
                  >
                    {currentQuestion.description}
                  </p>
                </div>

                {/* Level Selection Grid */}
                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(5, 1fr)',
                    gap: 'var(--space-4)',
                    marginBottom: 'var(--space-8)',
                  }}
                >
                  {LEVELS.map((level) => {
                    const isSelected = selectedLevel === level.id;
                    return (
                      <button
                        key={level.id}
                        onClick={() => handleLevelSelect(level.id)}
                        style={{
                          background: isSelected 
                            ? `linear-gradient(135deg, ${level.colorLight} 0%, white 100%)`
                            : 'white',
                          border: 'none',
                          borderRadius: 'var(--radius-2xl)',
                          padding: 'var(--space-6)',
                          display: 'flex',
                          flexDirection: 'column',
                          alignItems: 'center',
                          gap: 'var(--space-3)',
                          cursor: 'pointer',
                          transition: 'all var(--duration-base) ease',
                          boxShadow: isSelected
                            ? `0 12px 32px ${level.glowColor}, 0 0 0 4px ${level.colorLight}`
                            : '0 4px 6px 0 rgba(0, 0, 0, 0.1), 0 2px 4px 0 rgba(0, 0, 0, 0.1)',
                          transform: isSelected ? 'scale(1.08) translateY(-6px)' : 'scale(1)',
                        }}
                        onMouseEnter={(e) => {
                          if (!isSelected) {
                            e.currentTarget.style.transform = 'translateY(-4px) scale(1.02)';
                            e.currentTarget.style.boxShadow = `0 12px 24px ${level.glowColor}`;
                          }
                        }}
                        onMouseLeave={(e) => {
                          if (!isSelected) {
                            e.currentTarget.style.transform = 'translateY(0) scale(1)';
                            e.currentTarget.style.boxShadow = '0 4px 6px 0 rgba(0, 0, 0, 0.1), 0 2px 4px 0 rgba(0, 0, 0, 0.1)';
                          }
                        }}
                      >
                        {/* Emoji */}
                        <span
                          style={{
                            fontSize: '48px',
                            lineHeight: '1',
                            filter: isSelected ? 'drop-shadow(0 2px 8px rgba(0, 0, 0, 0.15))' : 'none',
                            transition: 'all var(--duration-base) ease',
                          }}
                        >
                          {level.emoji}
                        </span>

                        {/* Label */}
                        <span
                          style={{
                            fontFamily: 'var(--font-display)',
                            fontSize: 'var(--text-sm)',
                            fontWeight: 'var(--font-weight-bold)',
                            color: isSelected ? level.color : 'var(--foreground)',
                            lineHeight: 'var(--leading-tight)',
                            textAlign: 'center',
                            transition: 'color var(--duration-base) ease',
                          }}
                        >
                          {level.label}
                        </span>
                      </button>
                    );
                  })}
                </div>

                {/* Next Button */}
                <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                  <button
                    onClick={handleNext}
                    disabled={!canProceed}
                    style={{
                      background: canProceed ? 'var(--primary)' : 'rgba(0, 0, 0, 0.1)',
                      color: canProceed ? 'white' : 'var(--muted-foreground)',
                      border: 'none',
                      borderRadius: 'var(--radius-2xl)',
                      padding: 'var(--space-4) var(--space-6)',
                      display: 'flex',
                      alignItems: 'center',
                      gap: 'var(--space-3)',
                      cursor: canProceed ? 'pointer' : 'not-allowed',
                      fontFamily: 'var(--font-body)',
                      fontSize: 'var(--text-base)',
                      fontWeight: 'var(--font-weight-bold)',
                      transition: 'all var(--duration-base) ease',
                      opacity: canProceed ? 1 : 0.5,
                    }}
                    onMouseEnter={(e) => {
                      if (canProceed) {
                        e.currentTarget.style.transform = 'translateX(4px)';
                        e.currentTarget.style.boxShadow = '0 8px 20px rgba(85, 161, 180, 0.4)';
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (canProceed) {
                        e.currentTarget.style.transform = 'translateX(0)';
                        e.currentTarget.style.boxShadow = 'none';
                      }
                    }}
                  >
                    <span>{isLastQuestion ? 'Terminer' : 'Suivant'}</span>
                    <ArrowRight className="w-5 h-5" style={{ strokeWidth: 2 }} />
                  </button>
                </div>
              </>
            ) : (
              /* Success Confirmation Card - Ultra Modern TLS */
              <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)' }}>
                {/* Main Confirmation Card */}
                <div
                  style={{
                    background: 'linear-gradient(135deg, rgba(85, 161, 180, 0.02) 0%, white 100%)',
                    borderRadius: 'var(--radius-3xl)',
                    padding: 'var(--space-8)',
                    border: '2px solid rgba(85, 161, 180, 0.1)',
                    boxShadow: '0 20px 40px rgba(0, 0, 0, 0.08), 0 0 0 1px rgba(85, 161, 180, 0.05)',
                    animation: 'fadeInScale 0.6s ease-out 0.2s backwards',
                  }}
                >
                  {/* Header with Icon Grid */}
                  <div style={{ textAlign: 'center', marginBottom: 'var(--space-6)' }}>
                    {/* Icon Grid */}
                    <div
                      style={{
                        display: 'inline-flex',
                        gap: 'var(--space-2)',
                        marginBottom: 'var(--space-5)',
                        padding: 'var(--space-3)',
                        borderRadius: 'var(--radius-2xl)',
                        background: 'white',
                        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)',
                      }}
                    >
                      <div
                        style={{
                          width: '44px',
                          height: '44px',
                          borderRadius: 'var(--radius-xl)',
                          background: 'linear-gradient(135deg, var(--primary) 0%, var(--primary-hover) 100%)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontSize: '24px',
                          boxShadow: '0 4px 12px rgba(85, 161, 180, 0.3)',
                        }}
                      >
                        🎯
                      </div>
                      <div
                        style={{
                          width: '44px',
                          height: '44px',
                          borderRadius: 'var(--radius-xl)',
                          background: 'linear-gradient(135deg, var(--accent) 0%, var(--accent-hover) 100%)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontSize: '24px',
                          boxShadow: '0 4px 12px rgba(248, 176, 68, 0.3)',
                        }}
                      >
                        ⭐
                      </div>
                      <div
                        style={{
                          width: '44px',
                          height: '44px',
                          borderRadius: 'var(--radius-xl)',
                          background: 'linear-gradient(135deg, var(--secondary) 0%, var(--secondary-hover) 100%)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontSize: '24px',
                          boxShadow: '0 4px 12px rgba(237, 132, 58, 0.3)',
                        }}
                      >
                        🚀
                      </div>
                    </div>

                    <h3
                      style={{
                        fontFamily: 'var(--font-display)',
                        fontSize: 'var(--text-3xl)',
                        fontWeight: 'var(--font-weight-bold)',
                        color: 'var(--foreground)',
                        margin: 0,
                        marginBottom: 'var(--space-2)',
                        lineHeight: 'var(--leading-tight)',
                      }}
                    >
                      Votre profil est prêt !
                    </h3>
                    <p
                      style={{
                        fontFamily: 'var(--font-body)',
                        fontSize: 'var(--text-base)',
                        color: 'var(--muted-foreground)',
                        margin: 0,
                        lineHeight: 'var(--leading-relaxed)',
                      }}
                    >
                      Le parcours va maintenant s'adapter à votre niveau
                    </p>
                  </div>

                  {/* Features Grid */}
                  <div
                    style={{
                      display: 'grid',
                      gridTemplateColumns: 'repeat(3, 1fr)',
                      gap: 'var(--space-4)',
                      marginBottom: 'var(--space-6)',
                    }}
                  >
                    {/* Feature 1 */}
                    <div
                      style={{
                        padding: 'var(--space-4)',
                        borderRadius: 'var(--radius-xl)',
                        background: 'white',
                        border: '1px solid rgba(85, 161, 180, 0.15)',
                        textAlign: 'center',
                      }}
                    >
                      <div style={{ fontSize: '32px', marginBottom: 'var(--space-2)' }}>📊</div>
                      <p
                        style={{
                          fontFamily: 'var(--font-display)',
                          fontSize: 'var(--text-xs)',
                          fontWeight: 'var(--font-weight-semibold)',
                          color: 'var(--foreground)',
                          margin: 0,
                        }}
                      >
                        Compétences<br />enregistrées
                      </p>
                    </div>

                    {/* Feature 2 */}
                    <div
                      style={{
                        padding: 'var(--space-4)',
                        borderRadius: 'var(--radius-xl)',
                        background: 'white',
                        border: '1px solid rgba(248, 176, 68, 0.15)',
                        textAlign: 'center',
                      }}
                    >
                      <div style={{ fontSize: '32px', marginBottom: 'var(--space-2)' }}>🎯</div>
                      <p
                        style={{
                          fontFamily: 'var(--font-display)',
                          fontSize: 'var(--text-xs)',
                          fontWeight: 'var(--font-weight-semibold)',
                          color: 'var(--foreground)',
                          margin: 0,
                        }}
                      >
                        Parcours<br />personnalisé
                      </p>
                    </div>

                    {/* Feature 3 */}
                    <div
                      style={{
                        padding: 'var(--space-4)',
                        borderRadius: 'var(--radius-xl)',
                        background: 'white',
                        border: '1px solid rgba(237, 132, 58, 0.15)',
                        textAlign: 'center',
                      }}
                    >
                      <div style={{ fontSize: '32px', marginBottom: 'var(--space-2)' }}>🚀</div>
                      <p
                        style={{
                          fontFamily: 'var(--font-display)',
                          fontSize: 'var(--text-xs)',
                          fontWeight: 'var(--font-weight-semibold)',
                          color: 'var(--foreground)',
                          margin: 0,
                        }}
                      >
                        Progression<br />optimisée
                      </p>
                    </div>
                  </div>

                  {/* Info Card - Adaptive Learning */}
                  <div
                    style={{
                      padding: 'var(--space-5)',
                      borderRadius: 'var(--radius-xl)',
                      background: 'linear-gradient(135deg, rgba(85, 161, 180, 0.08) 0%, rgba(248, 176, 68, 0.05) 100%)',
                      border: '1px solid rgba(85, 161, 180, 0.2)',
                      display: 'flex',
                      gap: 'var(--space-3)',
                    }}
                  >
                    <div
                      style={{
                        flexShrink: 0,
                        width: '40px',
                        height: '40px',
                        borderRadius: 'var(--radius-lg)',
                        background: 'var(--primary)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        boxShadow: '0 4px 12px rgba(85, 161, 180, 0.3)',
                      }}
                    >
                      <Sparkles size={20} style={{ color: 'white' }} />
                    </div>
                    <div>
                      <h5
                        style={{
                          fontFamily: 'var(--font-display)',
                          fontSize: 'var(--text-sm)',
                          fontWeight: 'var(--font-weight-bold)',
                          color: 'var(--primary)',
                          margin: 0,
                          marginBottom: 'var(--space-2)',
                        }}
                      >
                        🔮 Prochainement : Adaptive Learning
                      </h5>
                      <p
                        style={{
                          fontFamily: 'var(--font-body)',
                          fontSize: 'var(--text-xs)',
                          color: 'var(--foreground)',
                          margin: 0,
                          lineHeight: 'var(--leading-relaxed)',
                        }}
                      >
                        Votre <strong>Passport de Compétences</strong> personnalisera automatiquement le contenu en fonction de votre progression et de vos feedbacks.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Auto-redirect message */}
                <div
                  style={{
                    textAlign: 'center',
                    padding: 'var(--space-3)',
                    borderRadius: 'var(--radius-lg)',
                    background: 'rgba(85, 161, 180, 0.05)',
                    animation: 'pulse 2s ease-in-out infinite',
                  }}
                >
                  <p
                    style={{
                      fontFamily: 'var(--font-body)',
                      fontSize: 'var(--text-sm)',
                      color: 'var(--muted-foreground)',
                      margin: 0,
                    }}
                  >
                    Redirection vers votre parcours dans quelques instants... 🎓
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Animation keyframes */}
      <style>{`
        @keyframes fadeInScale {
          from {
            opacity: 0;
            transform: scale(0.95);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
      `}</style>
    </>
  );
}
