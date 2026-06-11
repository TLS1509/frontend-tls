import { useEffect, useState } from 'react';
import { 
  Trophy, 
  Star, 
  Sparkles, 
  Award, 
  Flame, 
  Target,
  X,
  ChevronRight,
} from 'lucide-react';

export interface CelebrationData {
  type: 'course-complete' | 'badge-unlocked' | 'level-up' | 'streak-milestone' | 'coaching-booked';
  title: string;
  message: string;
  icon?: string;
  xpGained?: number;
  level?: number;
  badgeName?: string;
  streakDays?: number;
  onAction?: () => void;
  actionLabel?: string;
}

interface CelebrationModalProps {
  data: CelebrationData;
  isOpen: boolean;
  onClose: () => void;
}

// Confetti component
function Confetti() {
  const colors = ['var(--primary)', 'var(--secondary)', 'var(--accent)', '#FFD700', '#FF69B4'];
  const pieces = Array.from({ length: 50 }, (_, i) => ({
    id: i,
    left: Math.random() * 100,
    delay: Math.random() * 3,
    duration: 3 + Math.random() * 2,
    color: colors[Math.floor(Math.random() * colors.length)],
  }));

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {pieces.map((piece) => (
        <div
          key={piece.id}
          className="absolute w-2 h-2 rounded-full"
          style={{
            left: `${piece.left}%`,
            top: '-10px',
            background: piece.color,
            animation: `confetti-fall ${piece.duration}s ease-out ${piece.delay}s`,
            opacity: 0,
          }}
        />
      ))}
      <style>{`
        @keyframes confetti-fall {
          0% {
            opacity: 1;
            transform: translateY(0) rotate(0deg);
          }
          100% {
            opacity: 0;
            transform: translateY(100vh) rotate(720deg);
          }
        }
      `}</style>
    </div>
  );
}

export function CelebrationModal({ data, isOpen, onClose }: CelebrationModalProps) {
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setIsAnimating(true);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const getIcon = () => {
    switch (data.type) {
      case 'course-complete':
        return Trophy;
      case 'badge-unlocked':
        return Award;
      case 'level-up':
        return Star;
      case 'streak-milestone':
        return Flame;
      case 'coaching-booked':
        return Target;
      default:
        return Sparkles;
    }
  };

  const getGradient = () => {
    switch (data.type) {
      case 'course-complete':
        return 'var(--gradient-primary)';
      case 'badge-unlocked':
        return 'var(--gradient-secondary)';
      case 'level-up':
        return 'linear-gradient(135deg, var(--accent), var(--secondary))';
      case 'streak-milestone':
        return 'linear-gradient(135deg, var(--secondary), #dc2626)';
      case 'coaching-booked':
        return 'var(--gradient-primary)';
      default:
        return 'var(--gradient-primary)';
    }
  };

  const Icon = getIcon();
  const gradient = getGradient();

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 z-50 flex items-center justify-center p-4"
        style={{
          background: 'rgba(0, 0, 0, 0.5)',
          backdropFilter: 'blur(8px)',
          WebkitBackdropFilter: 'blur(8px)',
          animation: isAnimating ? 'fade-in 0.3s ease-out' : 'none',
        }}
        onClick={onClose}
      >
        {/* Confetti */}
        <Confetti />

        {/* Modal */}
        <div 
          className="relative max-w-md w-full rounded-3xl p-8 text-center"
          style={{
            background: 'rgba(255, 255, 255, 0.95)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            border: '1px solid rgba(255, 255, 255, 0.5)',
            boxShadow: '0 24px 60px rgba(0, 0, 0, 0.2)',
            animation: isAnimating ? 'modal-bounce 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55)' : 'none',
          }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-8 h-8 rounded-xl flex items-center justify-center transition-all duration-200 hover:scale-110"
            style={{
              background: 'rgba(0, 0, 0, 0.05)',
              color: 'var(--muted-foreground)',
            }}
          >
            <X className="w-4 h-4" />
          </button>

          {/* Icon */}
          <div className="flex justify-center mb-6">
            <div 
              className="relative w-24 h-24 rounded-3xl flex items-center justify-center"
              style={{
                background: gradient,
                boxShadow: '0 12px 40px rgba(85, 161, 180, 0.4)',
                animation: 'icon-pulse 2s ease-in-out infinite',
              }}
            >
              {data.icon ? (
                <span style={{ fontSize: '3rem' }}>{data.icon}</span>
              ) : (
                <Icon className="w-12 h-12 text-white" />
              )}

              {/* Glow rings */}
              <div 
                className="absolute inset-0 rounded-3xl"
                style={{
                  border: '2px solid rgba(255, 255, 255, 0.5)',
                  animation: 'ring-pulse 2s ease-in-out infinite',
                }}
              />
              <div 
                className="absolute inset-0 rounded-3xl"
                style={{
                  border: '2px solid rgba(255, 255, 255, 0.3)',
                  animation: 'ring-pulse 2s ease-in-out infinite 0.5s',
                }}
              />
            </div>
          </div>

          {/* Title */}
          <h2 
            className="mb-3"
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'var(--text-2xl)',
              fontWeight: 'var(--font-weight-bold)',
              color: 'var(--foreground)',
            }}
          >
            {data.title}
          </h2>

          {/* Message */}
          <p 
            className="mb-6"
            style={{
              fontSize: 'var(--text-base)',
              color: 'var(--muted-foreground)',
              lineHeight: '1.6',
            }}
          >
            {data.message}
          </p>

          {/* Stats */}
          <div className="flex justify-center gap-4 mb-6">
            {data.xpGained && (
              <div 
                className="px-4 py-3 rounded-xl"
                style={{
                  background: 'rgba(85, 161, 180, 0.1)',
                  border: '1px solid rgba(85, 161, 180, 0.2)',
                }}
              >
                <div 
                  className="flex items-center gap-2 mb-1"
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: 'var(--text-xl)',
                    fontWeight: 'var(--font-weight-bold)',
                    color: 'var(--primary)',
                  }}
                >
                  <Sparkles className="w-5 h-5" />
                  +{data.xpGained}
                </div>
                <div style={{ fontSize: 'var(--text-xs)', color: 'var(--muted-foreground)' }}>
                  Points XP
                </div>
              </div>
            )}

            {data.level && (
              <div 
                className="px-4 py-3 rounded-xl"
                style={{
                  background: 'rgba(248, 176, 68, 0.1)',
                  border: '1px solid rgba(248, 176, 68, 0.2)',
                }}
              >
                <div 
                  className="flex items-center gap-2 mb-1"
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: 'var(--text-xl)',
                    fontWeight: 'var(--font-weight-bold)',
                    color: 'var(--accent)',
                  }}
                >
                  <Star className="w-5 h-5" />
                  {data.level}
                </div>
                <div style={{ fontSize: 'var(--text-xs)', color: 'var(--muted-foreground)' }}>
                  Nouveau niveau
                </div>
              </div>
            )}

            {data.streakDays && (
              <div 
                className="px-4 py-3 rounded-xl"
                style={{
                  background: 'rgba(237, 132, 58, 0.1)',
                  border: '1px solid rgba(237, 132, 58, 0.2)',
                }}
              >
                <div 
                  className="flex items-center gap-2 mb-1"
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: 'var(--text-xl)',
                    fontWeight: 'var(--font-weight-bold)',
                    color: 'var(--secondary)',
                  }}
                >
                  <Flame className="w-5 h-5" />
                  {data.streakDays}
                </div>
                <div style={{ fontSize: 'var(--text-xs)', color: 'var(--muted-foreground)' }}>
                  Jours de suite
                </div>
              </div>
            )}
          </div>

          {/* Badge name */}
          {data.badgeName && (
            <div 
              className="px-6 py-3 rounded-xl mb-6 inline-block"
              style={{
                background: gradient,
                color: 'white',
                fontFamily: 'var(--font-display)',
                fontSize: 'var(--text-lg)',
                fontWeight: 'var(--font-weight-bold)',
              }}
            >
              {data.badgeName}
            </div>
          )}

          {/* Action button */}
          {data.onAction && data.actionLabel && (
            <button
              onClick={() => {
                data.onAction?.();
                onClose();
              }}
              className="w-full px-6 py-3 rounded-xl flex items-center justify-center gap-2 transition-all duration-300 hover:scale-105"
              style={{
                background: gradient,
                color: 'white',
                fontFamily: 'var(--font-display)',
                fontSize: 'var(--text-base)',
                fontWeight: 'var(--font-weight-semibold)',
                boxShadow: '0 8px 24px rgba(85, 161, 180, 0.3)',
              }}
            >
              {data.actionLabel}
              <ChevronRight className="w-5 h-5" />
            </button>
          )}

          {/* Animations */}
          <style>{`
            @keyframes fade-in {
              from { opacity: 0; }
              to { opacity: 1; }
            }

            @keyframes modal-bounce {
              0% {
                opacity: 0;
                transform: scale(0.3) translateY(-100px);
              }
              50% {
                transform: scale(1.05) translateY(0);
              }
              70% {
                transform: scale(0.95);
              }
              100% {
                opacity: 1;
                transform: scale(1);
              }
            }

            @keyframes icon-pulse {
              0%, 100% {
                transform: scale(1);
              }
              50% {
                transform: scale(1.05);
              }
            }

            @keyframes ring-pulse {
              0% {
                transform: scale(1);
                opacity: 1;
              }
              100% {
                transform: scale(1.5);
                opacity: 0;
              }
            }
          `}</style>
        </div>
      </div>
    </>
  );
}

// Hook for managing celebrations
export function useCelebration() {
  const [celebration, setCelebration] = useState<CelebrationData | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  const celebrate = (data: CelebrationData) => {
    setCelebration(data);
    setIsOpen(true);
  };

  const close = () => {
    setIsOpen(false);
    setTimeout(() => setCelebration(null), 300);
  };

  // Helper methods
  const courseComplete = (courseName: string, xpGained: number, onViewCertificate?: () => void) => {
    celebrate({
      type: 'course-complete',
      title: 'Cours terminé ! 🎉',
      message: `Félicitations ! Vous avez terminé "${courseName}" avec succès.`,
      icon: '🏆',
      xpGained,
      onAction: onViewCertificate,
      actionLabel: 'Voir le certificat',
    });
  };

  const badgeUnlocked = (badgeName: string, badgeIcon: string, xpGained: number, onViewProfile?: () => void) => {
    celebrate({
      type: 'badge-unlocked',
      title: 'Nouveau badge débloqué !',
      message: `Vous avez débloqué le badge "${badgeName}". Continuez comme ça !`,
      icon: badgeIcon,
      badgeName,
      xpGained,
      onAction: onViewProfile,
      actionLabel: 'Voir mon profil',
    });
  };

  const levelUp = (newLevel: number, xpGained: number) => {
    celebrate({
      type: 'level-up',
      title: 'Nouveau niveau atteint ! ⭐',
      message: `Incroyable ! Vous avez atteint le niveau ${newLevel}. Vous progressez rapidement !`,
      icon: '🌟',
      level: newLevel,
      xpGained,
    });
  };

  const streakMilestone = (streakDays: number) => {
    celebrate({
      type: 'streak-milestone',
      title: 'Série record ! 🔥',
      message: `${streakDays} jours consécutifs d'apprentissage. Vous êtes sur une lancée incroyable !`,
      icon: '🔥',
      streakDays,
      xpGained: streakDays * 10,
    });
  };

  const coachingBooked = (coachName: string, date: string, onViewSession?: () => void) => {
    celebrate({
      type: 'coaching-booked',
      title: 'Session confirmée ! 📅',
      message: `Votre session avec ${coachName} est confirmée pour ${date}.`,
      icon: '✅',
      onAction: onViewSession,
      actionLabel: 'Voir les détails',
    });
  };

  return {
    celebration,
    isOpen,
    celebrate,
    close,
    courseComplete,
    badgeUnlocked,
    levelUp,
    streakMilestone,
    coachingBooked,
  };
}
