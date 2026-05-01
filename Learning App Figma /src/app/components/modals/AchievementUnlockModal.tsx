import { X, Trophy, Star, Zap } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useState, useEffect } from 'react';

interface AchievementUnlockModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  description: string;
  icon?: React.ReactNode;
  rarity?: 'common' | 'rare' | 'epic' | 'legendary';
  points?: number;
}

export function AchievementUnlockModal({
  isOpen,
  onClose,
  title,
  description,
  icon,
  rarity = 'rare',
  points = 100,
}: AchievementUnlockModalProps) {
  const [showParticles, setShowParticles] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setShowParticles(true);
    }
  }, [isOpen]);

  const getRarityStyles = () => {
    switch (rarity) {
      case 'common':
        return {
          gradient: 'linear-gradient(135deg, #D1D5DB 0%, #9CA3AF 100%)',
          glow: 'rgba(156, 163, 175, 0.3)',
          label: 'Commun',
        };
      case 'rare':
        return {
          gradient: 'var(--gradient-primary)',
          glow: 'rgba(85, 161, 180, 0.3)',
          label: 'Rare',
        };
      case 'epic':
        return {
          gradient: 'linear-gradient(135deg, #A855F7 0%, #7C3AED 100%)',
          glow: 'rgba(168, 85, 247, 0.3)',
          label: 'Épique',
        };
      case 'legendary':
        return {
          gradient: 'linear-gradient(135deg, #FFD700 0%, #FFA500 100%)',
          glow: 'rgba(255, 215, 0, 0.4)',
          label: 'Légendaire',
        };
    }
  };

  const rarityStyles = getRarityStyles();

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 'var(--z-modal)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: 'var(--space-4)',
          }}
        >
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            style={{
              position: 'absolute',
              inset: 0,
              background: 'rgba(0, 0, 0, 0.7)',
              backdropFilter: 'blur(12px)',
              WebkitBackdropFilter: 'blur(12px)',
            }}
          />

          {/* Floating Particles */}
          {showParticles && (
            <>
              {[...Array(20)].map((_, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 0, x: 0 }}
                  animate={{
                    opacity: [0, 1, 0],
                    y: [-100, -200, -300],
                    x: [0, Math.random() * 200 - 100, Math.random() * 400 - 200],
                  }}
                  transition={{
                    duration: 2 + Math.random() * 2,
                    delay: Math.random() * 0.5,
                    repeat: Infinity,
                  }}
                  style={{
                    position: 'absolute',
                    width: '8px',
                    height: '8px',
                    borderRadius: '50%',
                    background: rarityStyles.gradient,
                    left: '50%',
                    top: '60%',
                    pointerEvents: 'none',
                  }}
                />
              ))}
            </>
          )}

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.5, rotateY: -90 }}
            animate={{ opacity: 1, scale: 1, rotateY: 0 }}
            exit={{ opacity: 0, scale: 0.5, rotateY: 90 }}
            transition={{ type: 'spring', duration: 0.8, bounce: 0.3 }}
            style={{
              position: 'relative',
              width: '100%',
              maxWidth: '600px',
              background: 'rgba(255, 255, 255, 0.98)',
              backdropFilter: 'blur(20px)',
              WebkitBackdropFilter: 'blur(20px)',
              borderRadius: 'var(--radius-2xl)',
              padding: 'var(--space-10)',
              boxShadow: `0 30px 60px -12px ${rarityStyles.glow}`,
              border: '1px solid rgba(255, 255, 255, 0.8)',
              overflow: 'hidden',
            }}
          >
            {/* Animated Background */}
            <div
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                height: '200px',
                background: rarityStyles.gradient,
                opacity: 0.1,
                transform: 'skewY(-3deg)',
              }}
            />

            {/* Close Button */}
            <button
              onClick={onClose}
              style={{
                position: 'absolute',
                top: 'var(--space-4)',
                right: 'var(--space-4)',
                background: 'rgba(0, 0, 0, 0.05)',
                border: 'none',
                borderRadius: 'var(--radius-full)',
                width: '36px',
                height: '36px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                transition: 'all var(--duration-base) ease',
                color: 'var(--muted-foreground)',
                zIndex: 2,
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'rgba(0, 0, 0, 0.1)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'rgba(0, 0, 0, 0.05)';
              }}
            >
              <X className="w-5 h-5" />
            </button>

            {/* Rarity Badge */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              style={{
                position: 'relative',
                zIndex: 1,
                display: 'inline-block',
                marginBottom: 'var(--space-4)',
              }}
            >
              <div
                style={{
                  padding: 'var(--space-2) var(--space-4)',
                  borderRadius: 'var(--radius-full)',
                  background: rarityStyles.gradient,
                  color: 'white',
                  fontFamily: 'var(--font-display)',
                  fontSize: 'var(--text-xs)',
                  fontWeight: 'var(--font-weight-bold)',
                  textTransform: 'uppercase',
                  letterSpacing: 'var(--tracking-wider)',
                  boxShadow: `0 4px 12px ${rarityStyles.glow}`,
                }}
              >
                {rarityStyles.label}
              </div>
            </motion.div>

            {/* Achievement Icon */}
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ delay: 0.4, type: 'spring', stiffness: 150 }}
              style={{
                position: 'relative',
                width: '140px',
                height: '140px',
                borderRadius: 'var(--radius-full)',
                background: rarityStyles.gradient,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto var(--space-8)',
                boxShadow: `0 25px 50px ${rarityStyles.glow}`,
                zIndex: 1,
              }}
            >
              {icon || <Trophy className="w-20 h-20" style={{ color: 'white' }} />}
              
              {/* Rotating Ring */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
                style={{
                  position: 'absolute',
                  inset: '-10px',
                  borderRadius: 'var(--radius-full)',
                  border: '2px solid',
                  borderColor: `${rarityStyles.glow} transparent ${rarityStyles.glow} transparent`,
                }}
              />
            </motion.div>

            {/* Content */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              style={{ textAlign: 'center', marginBottom: 'var(--space-8)', position: 'relative', zIndex: 1 }}
            >
              <motion.div
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.6, type: 'spring' }}
              >
                <h2
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: 'var(--text-4xl)',
                    fontWeight: 'var(--font-weight-black)',
                    color: 'var(--foreground)',
                    marginBottom: 'var(--space-2)',
                    textShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
                  }}
                >
                  {title}
                </h2>
              </motion.div>
              
              <p
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: 'var(--text-lg)',
                  color: 'var(--muted-foreground)',
                  lineHeight: 'var(--leading-relaxed)',
                  marginBottom: 'var(--space-6)',
                }}
              >
                {description}
              </p>

              {/* Points Badge */}
              <div
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 'var(--space-2)',
                  padding: 'var(--space-3) var(--space-6)',
                  borderRadius: 'var(--radius-full)',
                  background: 'rgba(248, 176, 68, 0.1)',
                  border: '1px solid rgba(248, 176, 68, 0.3)',
                }}
              >
                <Star className="w-5 h-5" style={{ color: 'var(--accent)', fill: 'var(--accent)' }} />
                <span
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: 'var(--text-xl)',
                    fontWeight: 'var(--font-weight-bold)',
                    color: 'var(--accent)',
                  }}
                >
                  +{points} XP
                </span>
              </div>
            </motion.div>

            {/* Action Button */}
            <motion.button
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              onClick={onClose}
              style={{
                width: '100%',
                padding: 'var(--space-5)',
                borderRadius: 'var(--radius-xl)',
                fontFamily: 'var(--font-body)',
                fontSize: 'var(--text-lg)',
                fontWeight: 'var(--font-weight-semibold)',
                border: 'none',
                background: rarityStyles.gradient,
                color: 'white',
                cursor: 'pointer',
                transition: 'all var(--duration-base) ease',
                boxShadow: `0 8px 24px ${rarityStyles.glow}`,
                position: 'relative',
                zIndex: 1,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 'var(--space-2)',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = `0 12px 32px ${rarityStyles.glow}`;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = `0 8px 24px ${rarityStyles.glow}`;
              }}
            >
              <Zap className="w-5 h-5" />
              Continuer
            </motion.button>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
