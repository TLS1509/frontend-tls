import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface ConfettiParticle {
  id: number;
  x: number;
  y: number;
  rotation: number;
  scale: number;
  color: string;
  delay: number;
  duration: number;
}

interface ConfettiCelebrationProps {
  trigger: boolean;
  onComplete?: () => void;
}

const CONFETTI_COLORS = [
  'var(--primary-500)',
  'var(--primary-400)',
  'var(--secondary-500)',
  'var(--secondary-400)',
  'var(--accent-400)',
  'var(--accent-500)',
  'var(--success-500)',
];

const generateConfetti = (count: number = 50): ConfettiParticle[] => {
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    x: Math.random() * 100, // Position X en pourcentage
    y: -20, // Commence au-dessus de l'écran
    rotation: Math.random() * 360,
    scale: Math.random() * 0.5 + 0.5, // 0.5 à 1
    color: CONFETTI_COLORS[Math.floor(Math.random() * CONFETTI_COLORS.length)],
    delay: Math.random() * 0.3,
    duration: Math.random() * 2 + 2, // 2-4 secondes
  }));
};

export function ConfettiCelebration({ trigger, onComplete }: ConfettiCelebrationProps) {
  const [confetti, setConfetti] = useState<ConfettiParticle[]>([]);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    if (trigger && !isActive) {
      setIsActive(true);
      setConfetti(generateConfetti(50));
      
      // Nettoyer après l'animation
      const timer = setTimeout(() => {
        setIsActive(false);
        setConfetti([]);
        if (onComplete) onComplete();
      }, 4500);

      return () => clearTimeout(timer);
    }
  }, [trigger]);

  if (!isActive) return null;

  return (
    <div 
      className="fixed inset-0 pointer-events-none overflow-hidden"
      style={{ 
        zIndex: 'var(--z-modal)',
      }}
    >
      <AnimatePresence>
        {confetti.map((particle) => (
          <motion.div
            key={particle.id}
            initial={{
              x: `${particle.x}vw`,
              y: '-20px',
              rotate: particle.rotation,
              scale: particle.scale,
              opacity: 1,
            }}
            animate={{
              y: '110vh',
              rotate: particle.rotation + 720, // 2 rotations complètes
              opacity: [1, 1, 0.8, 0],
            }}
            transition={{
              duration: particle.duration,
              delay: particle.delay,
              ease: [0.25, 0.46, 0.45, 0.94],
            }}
            style={{
              position: 'absolute',
              width: '10px',
              height: '10px',
              borderRadius: '2px',
              background: particle.color,
              boxShadow: `0 0 10px ${particle.color}`,
            }}
          />
        ))}
      </AnimatePresence>

      {/* Étoiles brillantes */}
      <AnimatePresence>
        {Array.from({ length: 15 }, (_, i) => {
          const x = Math.random() * 100;
          const y = Math.random() * 100;
          const delay = Math.random() * 0.5;
          
          return (
            <motion.div
              key={`star-${i}`}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ 
                scale: [0, 1.5, 1, 0],
                opacity: [0, 1, 1, 0],
                rotate: [0, 180],
              }}
              transition={{
                duration: 2,
                delay,
                ease: 'easeInOut',
              }}
              style={{
                position: 'absolute',
                left: `${x}%`,
                top: `${y}%`,
                fontSize: '24px',
              }}
            >
              ✨
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
}

// Composant pour célébration d'accomplissement spécifique
interface AccomplishmentCelebrationProps {
  show: boolean;
  title: string;
  subtitle?: string;
  icon?: string;
  onClose?: () => void;
}

export function AccomplishmentCelebration({ 
  show, 
  title, 
  subtitle, 
  icon = '🎉',
  onClose 
}: AccomplishmentCelebrationProps) {
  const [showConfetti, setShowConfetti] = useState(false);

  useEffect(() => {
    if (show) {
      setShowConfetti(true);
      
      // Auto-fermeture après 3 secondes
      const timer = setTimeout(() => {
        if (onClose) onClose();
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [show, onClose]);

  return (
    <>
      <ConfettiCelebration trigger={showConfetti} />
      
      <AnimatePresence>
        {show && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 flex items-center justify-center pointer-events-none"
            style={{ 
              zIndex: 'calc(var(--z-modal) + 10)',
            }}
          >
            <motion.div
              initial={{ scale: 0, rotate: -10 }}
              animate={{ 
                scale: [0, 1.2, 1],
                rotate: [10, -5, 0],
              }}
              exit={{ 
                scale: 0,
                rotate: 10,
                opacity: 0,
              }}
              transition={{
                duration: 0.6,
                ease: [0.68, -0.55, 0.265, 1.55], // Bounce effect
              }}
              className="p-8 rounded-3xl text-center pointer-events-auto"
              style={{
                background: 'var(--glass-white-strong)',
                backdropFilter: 'var(--blur-2xl)',
                border: '2px solid var(--glass-border-strong)',
                boxShadow: '0 25px 80px rgba(85, 161, 180, 0.4)',
                maxWidth: '400px',
              }}
            >
              <motion.div
                animate={{ 
                  scale: [1, 1.2, 1],
                  rotate: [0, 10, -10, 0],
                }}
                transition={{
                  duration: 0.8,
                  repeat: 2,
                  ease: 'easeInOut',
                }}
                style={{
                  fontSize: '80px',
                  marginBottom: 'var(--space-4)',
                }}
              >
                {icon}
              </motion.div>

              <h3
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 'var(--text-3xl)',
                  fontWeight: 'var(--font-weight-bold)',
                  color: 'var(--foreground)',
                  marginBottom: 'var(--space-2)',
                  lineHeight: 'var(--leading-tight)',
                }}
              >
                {title}
              </h3>

              {subtitle && (
                <p
                  style={{
                    fontSize: 'var(--text-base)',
                    color: 'var(--muted-foreground)',
                    lineHeight: 'var(--leading-relaxed)',
                  }}
                >
                  {subtitle}
                </p>
              )}

              {/* Cercle pulsant de fond */}
              <motion.div
                className="absolute inset-0 rounded-3xl -z-10"
                animate={{
                  scale: [1, 1.05, 1],
                  opacity: [0.3, 0.5, 0.3],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
                style={{
                  background: 'var(--gradient-primary)',
                }}
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
