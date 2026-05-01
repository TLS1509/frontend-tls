import { useState } from 'react';
import { X, ChevronRight, Sparkles } from 'lucide-react';

type SkillLevel = 'debutant' | 'novice' | 'intermediaire' | 'avance' | 'expert';

interface Question {
  id: string;
  title: string;
  description: string;
}

interface LearnerPositioningModalProps {
  isOpen: boolean;
  onClose: () => void;
  onComplete: (results: { [key: string]: SkillLevel }) => void;
  questions: Question[];
  variant?: 'floating' | 'progressive' | 'fullscreen';
}

const SKILL_LEVELS = [
  {
    id: 'debutant' as SkillLevel,
    label: 'Débutant',
    description: 'Je découvre',
    emoji: '✨',
    color: 'rgba(209, 213, 219, 0.5)', // gray
  },
  {
    id: 'novice' as SkillLevel,
    label: 'Novice',
    description: 'Bases acquises',
    emoji: '🔥',
    color: 'rgba(248, 176, 68, 0.2)', // accent/orange
  },
  {
    id: 'intermediaire' as SkillLevel,
    label: 'Intermédiaire',
    description: 'Autonome',
    emoji: '⭐',
    color: 'rgba(251, 191, 36, 0.2)', // yellow
  },
  {
    id: 'avance' as SkillLevel,
    label: 'Avancé',
    description: "Très à l'aise",
    emoji: '🚀',
    color: 'rgba(85, 161, 180, 0.2)', // primary
  },
  {
    id: 'expert' as SkillLevel,
    label: 'Expert',
    description: 'Maîtrise totale',
    emoji: '👑',
    color: 'rgba(245, 158, 11, 0.3)', // gold
  },
];

export function LearnerPositioningModal({
  isOpen,
  onClose,
  onComplete,
  questions,
  variant = 'floating',
}: LearnerPositioningModalProps) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedLevels, setSelectedLevels] = useState<{ [key: string]: SkillLevel }>({});
  const [hoveredLevel, setHoveredLevel] = useState<SkillLevel | null>(null);

  if (!isOpen) return null;

  const currentQuestion = questions[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / questions.length) * 100;
  const selectedLevel = selectedLevels[currentQuestion?.id] || 'novice';

  const handleSelectLevel = (level: SkillLevel) => {
    setSelectedLevels({
      ...selectedLevels,
      [currentQuestion.id]: level,
    });
  };

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      onComplete(selectedLevels);
      onClose();
    }
  };

  // ========== FLOATING GLASS MODAL ==========
  if (variant === 'floating') {
    return (
      <div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(0, 0, 0, 0.3)',
          backdropFilter: 'blur(8px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 9999,
          padding: 'var(--space-4)',
        }}
        onClick={onClose}
      >
        <div
          onClick={(e) => e.stopPropagation()}
          style={{
            background: 'rgba(255, 255, 255, 0.95)',
            backdropFilter: 'blur(40px)',
            borderRadius: 'var(--radius-2xl)',
            padding: 'var(--space-8)',
            maxWidth: '800px',
            width: '100%',
            boxShadow: '0 25px 50px rgba(0, 0, 0, 0.15)',
            border: '1px solid rgba(255, 255, 255, 0.8)',
            position: 'relative',
          }}
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            style={{
              position: 'absolute',
              top: 'var(--space-4)',
              right: 'var(--space-4)',
              background: 'rgba(0, 0, 0, 0.05)',
              border: 'none',
              cursor: 'pointer',
              padding: 'var(--space-2)',
              borderRadius: '9999px',
              width: '36px',
              height: '36px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <X className="w-5 h-5" style={{ color: 'var(--muted-foreground)' }} />
          </button>

          {/* Badge Question */}
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 'var(--space-6)' }}>
            <div
              style={{
                background: 'rgba(85, 161, 180, 0.1)',
                border: '1px solid rgba(85, 161, 180, 0.3)',
                borderRadius: 'var(--radius-full)',
                padding: 'var(--space-2) var(--space-4)',
                display: 'flex',
                alignItems: 'center',
                gap: 'var(--space-2)',
              }}
            >
              <Sparkles className="w-4 h-4" style={{ color: 'var(--primary)' }} />
              <span
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: 'var(--text-sm)',
                  fontWeight: 'var(--font-weight-bold)',
                  color: 'var(--primary)',
                }}
              >
                Question {currentQuestionIndex + 1}/{questions.length}
              </span>
            </div>
          </div>

          {/* Title */}
          <h2
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'var(--text-3xl)',
              fontWeight: 'var(--font-weight-black)',
              color: 'var(--foreground)',
              textAlign: 'center',
              marginBottom: 'var(--space-4)',
              letterSpacing: '-0.75px',
            }}
          >
            {currentQuestion.title}
          </h2>

          <p
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: 'var(--text-base)',
              color: 'var(--muted-foreground)',
              textAlign: 'center',
              marginBottom: 'var(--space-8)',
            }}
          >
            {currentQuestion.description}
          </p>

          {/* Skill Level Cards */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))',
              gap: 'var(--space-4)',
              marginBottom: 'var(--space-8)',
            }}
          >
            {SKILL_LEVELS.map((level) => {
              const isSelected = selectedLevel === level.id;
              const isHovered = hoveredLevel === level.id;

              return (
                <button
                  key={level.id}
                  onClick={() => handleSelectLevel(level.id)}
                  onMouseEnter={() => setHoveredLevel(level.id)}
                  onMouseLeave={() => setHoveredLevel(null)}
                  style={{
                    background: isSelected
                      ? level.color
                      : isHovered
                      ? 'rgba(255, 255, 255, 0.8)'
                      : 'white',
                    border: isSelected
                      ? `3px solid ${level.id === 'novice' ? '#F8B044' : 'var(--primary)'}`
                      : '2px solid rgba(0, 0, 0, 0.08)',
                    borderRadius: 'var(--radius-xl)',
                    padding: 'var(--space-5)',
                    cursor: 'pointer',
                    transition: 'all var(--duration-base) ease',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: 'var(--space-2)',
                    position: 'relative',
                    transform: isSelected ? 'scale(1.05)' : isHovered ? 'scale(1.02)' : 'scale(1)',
                    boxShadow: isSelected
                      ? '0 8px 24px rgba(248, 176, 68, 0.3)'
                      : isHovered
                      ? '0 4px 12px rgba(0, 0, 0, 0.1)'
                      : 'none',
                  }}
                >
                  {/* Check Mark */}
                  {isSelected && (
                    <div
                      style={{
                        position: 'absolute',
                        top: 'var(--space-2)',
                        right: 'var(--space-2)',
                        background: level.id === 'novice' ? '#F8B044' : 'var(--primary)',
                        borderRadius: '9999px',
                        width: '24px',
                        height: '24px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'white',
                        fontSize: '12px',
                      }}
                    >
                      ✓
                    </div>
                  )}

                  <div style={{ fontSize: '40px', marginBottom: 'var(--space-1)' }}>{level.emoji}</div>
                  <span
                    style={{
                      fontFamily: 'var(--font-display)',
                      fontSize: 'var(--text-base)',
                      fontWeight: 'var(--font-weight-bold)',
                      color: 'var(--foreground)',
                    }}
                  >
                    {level.label}
                  </span>
                  <span
                    style={{
                      fontFamily: 'var(--font-body)',
                      fontSize: 'var(--text-sm)',
                      color: 'var(--muted-foreground)',
                    }}
                  >
                    {level.description}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Next Button */}
          <button
            onClick={handleNext}
            style={{
              background: 'var(--primary)',
              color: 'white',
              fontFamily: 'var(--font-body)',
              fontSize: 'var(--text-base)',
              fontWeight: 'var(--font-weight-bold)',
              padding: 'var(--space-4) var(--space-6)',
              borderRadius: 'var(--radius-lg)',
              border: 'none',
              cursor: 'pointer',
              width: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 'var(--space-2)',
              transition: 'all var(--duration-base) ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-2px)';
              e.currentTarget.style.boxShadow = '0 8px 24px rgba(85, 161, 180, 0.4)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = 'none';
            }}
          >
            {currentQuestionIndex === questions.length - 1 ? 'Terminer' : 'Suivant'}
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    );
  }

  // ========== PROGRESSIVE CARDS ==========
  if (variant === 'progressive') {
    return (
      <div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(0, 0, 0, 0.3)',
          backdropFilter: 'blur(8px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 9999,
          padding: 'var(--space-4)',
        }}
        onClick={onClose}
      >
        <div
          onClick={(e) => e.stopPropagation()}
          style={{
            background: 'rgba(242, 247, 248, 0.95)',
            backdropFilter: 'blur(40px)',
            borderRadius: 'var(--radius-2xl)',
            padding: 'var(--space-8)',
            maxWidth: '900px',
            width: '100%',
            boxShadow: '0 25px 50px rgba(0, 0, 0, 0.15)',
            border: '1px solid rgba(255, 255, 255, 0.8)',
            position: 'relative',
          }}
        >
          {/* Progress Bar */}
          <div style={{ marginBottom: 'var(--space-6)' }}>
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: 'var(--space-2)',
              }}
            >
              <span
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: 'var(--text-sm)',
                  color: 'var(--muted-foreground)',
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
                }}
              >
                {Math.round(progress)}%
              </span>
            </div>
            <div
              style={{
                width: '100%',
                height: '8px',
                background: 'rgba(85, 161, 180, 0.15)',
                borderRadius: 'var(--radius-full)',
                overflow: 'hidden',
              }}
            >
              <div
                style={{
                  width: `${progress}%`,
                  height: '100%',
                  background: 'var(--primary)',
                  borderRadius: 'var(--radius-full)',
                  transition: 'width 0.3s ease',
                }}
              />
            </div>
          </div>

          {/* Question Card */}
          <div
            style={{
              background: 'white',
              borderRadius: 'var(--radius-xl)',
              padding: 'var(--space-6)',
              marginBottom: 'var(--space-6)',
              boxShadow: '0 4px 16px rgba(0, 0, 0, 0.06)',
            }}
          >
            <h2
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'var(--text-2xl)',
                fontWeight: 'var(--font-weight-bold)',
                color: 'var(--foreground)',
                marginBottom: 'var(--space-3)',
              }}
            >
              {currentQuestion.title}
            </h2>
            <p
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: 'var(--text-base)',
                color: 'var(--muted-foreground)',
              }}
            >
              {currentQuestion.description}
            </p>
          </div>

          {/* Skill Level Cards */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
              gap: 'var(--space-4)',
              marginBottom: 'var(--space-6)',
            }}
          >
            {SKILL_LEVELS.map((level) => {
              const isSelected = selectedLevel === level.id;

              return (
                <button
                  key={level.id}
                  onClick={() => handleSelectLevel(level.id)}
                  style={{
                    background: isSelected ? level.color : 'white',
                    border: isSelected
                      ? `3px solid ${level.id === 'novice' ? '#F8B044' : 'var(--primary)'}`
                      : '2px solid rgba(0, 0, 0, 0.08)',
                    borderRadius: 'var(--radius-xl)',
                    padding: 'var(--space-4)',
                    cursor: 'pointer',
                    transition: 'all var(--duration-base) ease',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: 'var(--space-2)',
                    transform: isSelected ? 'scale(1.05)' : 'scale(1)',
                  }}
                >
                  <div style={{ fontSize: '36px' }}>{level.emoji}</div>
                  <span
                    style={{
                      fontFamily: 'var(--font-display)',
                      fontSize: 'var(--text-base)',
                      fontWeight: 'var(--font-weight-bold)',
                      color: 'var(--foreground)',
                    }}
                  >
                    {level.label}
                  </span>
                  <span
                    style={{
                      fontFamily: 'var(--font-body)',
                      fontSize: 'var(--text-xs)',
                      color: 'var(--muted-foreground)',
                    }}
                  >
                    {level.description}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Next Button */}
          <button
            onClick={handleNext}
            style={{
              background: 'var(--primary)',
              color: 'white',
              fontFamily: 'var(--font-body)',
              fontSize: 'var(--text-base)',
              fontWeight: 'var(--font-weight-bold)',
              padding: 'var(--space-4) var(--space-6)',
              borderRadius: 'var(--radius-lg)',
              border: 'none',
              cursor: 'pointer',
              width: 'auto',
              marginLeft: 'auto',
              display: 'flex',
              alignItems: 'center',
              gap: 'var(--space-2)',
            }}
          >
            Suivant
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    );
  }

  // ========== FULLSCREEN PILLS ==========
  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: 'rgba(242, 247, 248, 0.98)',
        zIndex: 9999,
        overflowY: 'auto',
        padding: 'var(--space-8)',
      }}
    >
      <div style={{ maxWidth: '900px', margin: '0 auto' }}>
        {/* Close Button */}
        <button
          onClick={onClose}
          style={{
            background: 'white',
            border: '1px solid rgba(0, 0, 0, 0.08)',
            cursor: 'pointer',
            padding: 'var(--space-2) var(--space-4)',
            borderRadius: 'var(--radius-lg)',
            display: 'flex',
            alignItems: 'center',
            gap: 'var(--space-2)',
            marginBottom: 'var(--space-8)',
            fontFamily: 'var(--font-body)',
            fontSize: 'var(--text-sm)',
            color: 'var(--foreground)',
          }}
        >
          ← Retour
        </button>

        <h1
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'var(--text-4xl)',
            fontWeight: 'var(--font-weight-bold)',
            color: 'var(--foreground)',
            marginBottom: 'var(--space-6)',
            textAlign: 'center',
          }}
        >
          {currentQuestion.title}
        </h1>

        <p
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: 'var(--text-lg)',
            color: 'var(--muted-foreground)',
            textAlign: 'center',
            marginBottom: 'var(--space-12)',
          }}
        >
          {currentQuestion.description}
        </p>

        {/* Skill Pills Horizontal */}
        <div
          style={{
            display: 'flex',
            gap: 'var(--space-4)',
            justifyContent: 'center',
            flexWrap: 'wrap',
            marginBottom: 'var(--space-12)',
          }}
        >
          {SKILL_LEVELS.map((level) => {
            const isSelected = selectedLevel === level.id;

            return (
              <button
                key={level.id}
                onClick={() => handleSelectLevel(level.id)}
                style={{
                  background: isSelected ? 'var(--primary)' : 'white',
                  border: '2px solid rgba(0, 0, 0, 0.08)',
                  borderRadius: 'var(--radius-2xl)',
                  padding: 'var(--space-5) var(--space-6)',
                  cursor: 'pointer',
                  transition: 'all var(--duration-base) ease',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: 'var(--space-3)',
                  minWidth: '150px',
                  transform: isSelected ? 'scale(1.05)' : 'scale(1)',
                  boxShadow: isSelected
                    ? '0 8px 24px rgba(85, 161, 180, 0.3)'
                    : '0 2px 8px rgba(0, 0, 0, 0.05)',
                }}
              >
                <div style={{ fontSize: '48px' }}>{level.emoji}</div>
                <span
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: 'var(--text-lg)',
                    fontWeight: 'var(--font-weight-bold)',
                    color: isSelected ? 'white' : 'var(--foreground)',
                  }}
                >
                  {level.label}
                </span>
                <span
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: 'var(--text-sm)',
                    color: isSelected ? 'rgba(255, 255, 255, 0.9)' : 'var(--muted-foreground)',
                  }}
                >
                  {level.description}
                </span>
              </button>
            );
          })}
        </div>

        {/* Next Button */}
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <button
            onClick={handleNext}
            style={{
              background: 'var(--primary)',
              color: 'white',
              fontFamily: 'var(--font-body)',
              fontSize: 'var(--text-lg)',
              fontWeight: 'var(--font-weight-bold)',
              padding: 'var(--space-5) var(--space-8)',
              borderRadius: 'var(--radius-lg)',
              border: 'none',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: 'var(--space-2)',
            }}
          >
            {currentQuestionIndex === questions.length - 1 ? 'Terminer' : 'Suivant'}
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
