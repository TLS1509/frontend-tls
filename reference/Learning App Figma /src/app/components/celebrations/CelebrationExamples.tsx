import { useState } from 'react';
import { Calendar, Trophy, Lock, Star, Award, Target, Zap, Gift } from 'lucide-react';
import { Button } from '../ui/button';
import { BookingConfirmedModal } from './BookingConfirmedModal';
import { CelebrationCard } from './CelebrationCard';

/**
 * CELEBRATIONS EXAMPLES
 * Démonstrations d'utilisation des composants de celebration dans différents contextes
 */

// ============================================
// EXAMPLE 1: Booking Flow with Celebration
// ============================================
export function BookingFlowExample() {
  const [showConfirmation, setShowConfirmation] = useState(false);

  const handleBookSession = () => {
    // Simulate booking API call
    setTimeout(() => {
      setShowConfirmation(true);
    }, 500);
  };

  return (
    <div style={{
      padding: 'var(--space-6)',
      borderRadius: 'var(--radius-xl)',
      background: 'rgba(85, 161, 180, 0.05)',
      border: '1px solid rgba(85, 161, 180, 0.2)',
    }}>
      <h3 style={{
        fontFamily: 'var(--font-display)',
        fontSize: 'var(--text-lg)',
        fontWeight: 'var(--font-weight-bold)',
        color: 'var(--foreground)',
        marginBottom: 'var(--space-4)',
      }}>
        1. Booking Flow with Celebration
      </h3>

      <div style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 'var(--space-4)',
      }}>
        <p style={{
          fontFamily: 'var(--font-body)',
          fontSize: 'var(--text-sm)',
          color: 'var(--muted-foreground)',
        }}>
          Après avoir réservé une session de coaching, montrer une celebration modal
        </p>

        <Button
          variant="gradient-warm"
          size="lg"
          onClick={handleBookSession}
        >
          <Calendar className="w-5 h-5" />
          Réserver une Session
        </Button>

        <BookingConfirmedModal
          open={showConfirmation}
          onOpenChange={setShowConfirmation}
          date="28 Jan"
          time="15:30"
          coachName="Marie"
        />
      </div>
    </div>
  );
}

// ============================================
// EXAMPLE 2: Achievement Cards Grid
// ============================================
export function AchievementCardsGrid() {
  const achievements = [
    {
      icon: Trophy,
      title: 'First Course Completed',
      description: 'Bravo ! Vous avez terminé votre premier cours avec succès',
      tags: ['Achievement', 'Course', 'Milestone'],
      variant: 'badge' as const,
    },
    {
      icon: Star,
      title: '5 Sessions Completed',
      description: 'Vous avez complété 5 sessions de coaching ce mois-ci',
      tags: ['Coaching', 'Milestone', 'Trophy'],
      variant: 'booking' as const,
    },
    {
      icon: Zap,
      title: '7-Day Streak',
      description: 'Incroyable ! Vous avez maintenu votre streak pendant 7 jours',
      tags: ['Streak', 'Motivation', 'Fire'],
      variant: 'unlock' as const,
    },
    {
      icon: Award,
      title: 'Expert Level Unlocked',
      description: 'Félicitations ! Vous avez débloqué le niveau Expert',
      tags: ['Level', 'Expert', 'Unlock'],
      variant: 'unlock' as const,
    },
  ];

  return (
    <div style={{
      padding: 'var(--space-6)',
      borderRadius: 'var(--radius-xl)',
      background: 'rgba(248, 176, 68, 0.05)',
      border: '1px solid rgba(248, 176, 68, 0.2)',
    }}>
      <h3 style={{
        fontFamily: 'var(--font-display)',
        fontSize: 'var(--text-lg)',
        fontWeight: 'var(--font-weight-bold)',
        color: 'var(--foreground)',
        marginBottom: 'var(--space-4)',
      }}>
        2. Achievement Cards Grid
      </h3>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
        gap: 'var(--space-4)',
      }}>
        {achievements.map((achievement, index) => (
          <CelebrationCard
            key={index}
            icon={achievement.icon}
            title={achievement.title}
            description={achievement.description}
            tags={achievement.tags}
            variant={achievement.variant}
          />
        ))}
      </div>
    </div>
  );
}

// ============================================
// EXAMPLE 3: Course Unlock Notification
// ============================================
export function CourseUnlockNotification() {
  const [dismissed, setDismissed] = useState(false);

  if (dismissed) return null;

  return (
    <div style={{
      padding: 'var(--space-6)',
      borderRadius: 'var(--radius-xl)',
      background: 'rgba(85, 161, 180, 0.05)',
      border: '1px solid rgba(85, 161, 180, 0.2)',
    }}>
      <h3 style={{
        fontFamily: 'var(--font-display)',
        fontSize: 'var(--text-lg)',
        fontWeight: 'var(--font-weight-bold)',
        color: 'var(--foreground)',
        marginBottom: 'var(--space-4)',
      }}>
        3. Course Unlock Notification
      </h3>

      <div style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 'var(--space-4)',
      }}>
        <CelebrationCard
          icon={Lock}
          title="New Course Available!"
          description="Le cours 'Advanced React Patterns' est maintenant disponible dans votre parcours"
          tags={['New', 'React', 'Advanced']}
          variant="unlock"
        />

        <div style={{
          display: 'flex',
          gap: 'var(--space-2)',
        }}>
          <Button
            variant="outline-primary"
            onClick={() => setDismissed(true)}
          >
            Plus tard
          </Button>
          <Button
            variant="gradient-primary"
            onClick={() => {
              // Navigate to course
              setDismissed(true);
            }}
          >
            <Target className="w-4 h-4" />
            Commencer maintenant
          </Button>
        </div>
      </div>
    </div>
  );
}

// ============================================
// EXAMPLE 4: Mini Celebration Toast
// ============================================
export function MiniCelebrationToast() {
  const [show, setShow] = useState(false);

  const showToast = () => {
    setShow(true);
    setTimeout(() => setShow(false), 3000);
  };

  return (
    <div style={{
      padding: 'var(--space-6)',
      borderRadius: 'var(--radius-xl)',
      background: 'rgba(237, 132, 58, 0.05)',
      border: '1px solid rgba(237, 132, 58, 0.2)',
    }}>
      <h3 style={{
        fontFamily: 'var(--font-display)',
        fontSize: 'var(--text-lg)',
        fontWeight: 'var(--font-weight-bold)',
        color: 'var(--foreground)',
        marginBottom: 'var(--space-4)',
      }}>
        4. Mini Celebration Toast
      </h3>

      <div style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 'var(--space-4)',
      }}>
        <p style={{
          fontFamily: 'var(--font-body)',
          fontSize: 'var(--text-sm)',
          color: 'var(--muted-foreground)',
        }}>
          Une version compacte pour des notifications rapides
        </p>

        <Button
          variant="outline-orange"
          onClick={showToast}
        >
          <Gift className="w-4 h-4" />
          Trigger Toast
        </Button>

        {show && (
          <div style={{
            position: 'fixed',
            bottom: 'var(--space-6)',
            right: 'var(--space-6)',
            maxWidth: '350px',
            padding: 'var(--space-4)',
            borderRadius: 'var(--radius-lg)',
            background: 'linear-gradient(135deg, rgba(255,255,255,0.95) 0%, rgba(248,252,255,0.95) 100%)',
            backdropFilter: 'blur(20px)',
            border: '1px solid rgba(237, 132, 58, 0.3)',
            boxShadow: '0 12px 32px rgba(237, 132, 58, 0.2)',
            animation: 'slideInUp 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
            zIndex: 1000,
          }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: 'var(--space-3)',
            }}>
              <div style={{
                width: '32px',
                height: '32px',
                borderRadius: 'var(--radius-md)',
                background: 'linear-gradient(135deg, #ED843A 0%, #F8B044 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
                <Trophy className="w-5 h-5" style={{ color: 'white' }} />
              </div>
              <div style={{ flex: 1 }}>
                <p style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 'var(--text-sm)',
                  fontWeight: 'var(--font-weight-bold)',
                  color: 'var(--foreground)',
                }}>
                  Badge Earned! 🎉
                </p>
                <p style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: 'var(--text-xs)',
                  color: 'var(--muted-foreground)',
                }}>
                  Streak Master unlocked
                </p>
              </div>
            </div>
            <style>{`
              @keyframes slideInUp {
                from {
                  transform: translateY(100%);
                  opacity: 0;
                }
                to {
                  transform: translateY(0);
                  opacity: 1;
                }
              }
            `}</style>
          </div>
        )}
      </div>
    </div>
  );
}

// ============================================
// MAIN COMPONENT: All Examples
// ============================================
export function CelebrationExamples() {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      gap: 'var(--space-8)',
      padding: 'var(--space-6)',
    }}>
      <div>
        <h2 style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'var(--text-2xl)',
          fontWeight: 'var(--font-weight-black)',
          color: 'var(--foreground)',
          marginBottom: 'var(--space-2)',
        }}>
          🎉 Celebration Examples
        </h2>
        <p style={{
          fontFamily: 'var(--font-body)',
          fontSize: 'var(--text-base)',
          color: 'var(--muted-foreground)',
        }}>
          Exemples d'intégration des composants de celebration dans différents contextes
        </p>
      </div>

      <BookingFlowExample />
      <AchievementCardsGrid />
      <CourseUnlockNotification />
      <MiniCelebrationToast />
    </div>
  );
}
