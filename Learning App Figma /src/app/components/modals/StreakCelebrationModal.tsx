import { X, Flame, Calendar, TrendingUp } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface StreakCelebrationModalProps {
  isOpen: boolean;
  onClose: () => void;
  streakCount: number;
  milestone?: number;
  encouragement?: string;
}

export function StreakCelebrationModal({
  isOpen,
  onClose,
  streakCount,
  milestone,
  encouragement = "Continuez comme ça !",
}: StreakCelebrationModalProps) {
  
  const isM ilestone = milestone && streakCount >= milestone;
  
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
              background: 'rgba(0, 0, 0, 0.6)',
              backdropFilter: 'blur(10px)',
              WebkitBackdropFilter: 'blur(10px)',
            }}
          />

          {/* Flame Particles */}
          {[...Array(15)].map((_, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 0, scale: 0 }}
              animate={{
                opacity: [0, 1, 0],
                y: [0, -150, -250],
                scale: [0, 1, 0.5],
                x: [0, Math.random() * 100 - 50, Math.random() * 150 - 75],
              }}
              transition={{
                duration: 2,
                delay: Math.random() * 0.8,
                repeat: Infinity,
                ease: 'easeOut',
              }}
              style={{
                position: 'absolute',
                width: '12px',
                height: '16px',
                borderRadius: '50% 50% 50% 0',
                background: 'linear-gradient(135deg, #FF6B35 0%, #F7931E 50%, #FFC107 100%)',
                left: '50%',
                top: '55%',
                rotate: '45deg',
                pointerEvents: 'none',
              }}
            />
          ))}

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 50 }}
            transition={{ type: 'spring', duration: 0.6, bounce: 0.3 }}
            style={{
              position: 'relative',
              width: '100%',
              maxWidth: '550px',
              background: 'rgba(255, 255, 255, 0.98)',
              backdropFilter: 'blur(20px)',
              WebkitBackdropFilter: 'blur(20px)',
              borderRadius: 'var(--radius-2xl)',
              padding: 'var(--space-10)',
              boxShadow: '0 30px 60px -12px rgba(255, 107, 53, 0.3)',
              border: '1px solid rgba(255, 255, 255, 0.8)',
              overflow: 'hidden',
            }}
          >
            {/* Orange Gradient Background */}
            <div
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                height: '180px',
                background: 'linear-gradient(180deg, rgba(237, 132, 58, 0.15) 0%, transparent 100%)',
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
                width: '32px',
                height: '32px',
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
              <X className="w-4 h-4" />
            </button>

            {/* Flame Icon with Pulse */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
              style={{
                position: 'relative',
                width: '120px',
                height: '120px',
                borderRadius: 'var(--radius-full)',
                background: 'linear-gradient(135deg, #FF6B35 0%, #F7931E 50%, #FFC107 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto var(--space-6)',
                boxShadow: '0 25px 50px rgba(255, 107, 53, 0.4)',
                zIndex: 1,
              }}
            >
              <Flame className="w-16 h-16" style={{ color: 'white' }} />
              
              {/* Pulse Effect */}
              <motion.div
                animate={{ scale: [1, 1.3, 1], opacity: [0.5, 0, 0.5] }}
                transition={{ duration: 2, repeat: Infinity }}
                style={{
                  position: 'absolute',
                  inset: '-8px',
                  borderRadius: 'var(--radius-full)',
                  border: '3px solid #FF6B35',
                }}
              />
            </motion.div>

            {/* Streak Count */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              style={{
                textAlign: 'center',
                marginBottom: 'var(--space-6)',
                position: 'relative',
                zIndex: 1,
              }}
            >
              <div
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 'var(--text-6xl)',
                  fontWeight: 'var(--font-weight-black)',
                  background: 'linear-gradient(135deg, #FF6B35 0%, #F7931E 50%, #FFC107 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                  lineHeight: 1,
                  marginBottom: 'var(--space-2)',
                }}
              >
                {streakCount}
              </div>
              <div
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 'var(--text-xl)',
                  fontWeight: 'var(--font-weight-semibold)',
                  color: 'var(--foreground)',
                  textTransform: 'uppercase',
                  letterSpacing: 'var(--tracking-wide)',
                }}
              >
                Jours Consécutifs
              </div>
            </motion.div>

            {/* Milestone Badge */}
            {isMilestone && (
              <motion.div
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ delay: 0.4, type: 'spring' }}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 'var(--space-2)',
                  padding: 'var(--space-3) var(--space-5)',
                  borderRadius: 'var(--radius-full)',
                  background: 'linear-gradient(135deg, #FFD700 0%, #FFA500 100%)',
                  color: 'white',
                  fontFamily: 'var(--font-display)',
                  fontSize: 'var(--text-sm)',
                  fontWeight: 'var(--font-weight-bold)',
                  marginBottom: 'var(--space-6)',
                  boxShadow: '0 4px 16px rgba(255, 215, 0, 0.4)',
                }}
              >
                <TrendingUp className="w-4 h-4" />
                Jalon {milestone} jours atteint !
              </motion.div>
            )}

            {/* Message */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              style={{
                textAlign: 'center',
                marginBottom: 'var(--space-8)',
                position: 'relative',
                zIndex: 1,
              }}
            >
              <h2
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 'var(--text-2xl)',
                  fontWeight: 'var(--font-weight-bold)',
                  color: 'var(--foreground)',
                  marginBottom: 'var(--space-2)',
                }}
              >
                🔥 Série Enflammée !
              </h2>
              <p
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: 'var(--text-base)',
                  color: 'var(--muted-foreground)',
                  lineHeight: 'var(--leading-relaxed)',
                }}
              >
                {encouragement}
              </p>
            </motion.div>

            {/* Stats Grid */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(2, 1fr)',
                gap: 'var(--space-3)',
                marginBottom: 'var(--space-8)',
              }}
            >
              <div
                style={{
                  padding: 'var(--space-4)',
                  borderRadius: 'var(--radius-lg)',
                  background: 'rgba(85, 161, 180, 0.05)',
                  border: '1px solid rgba(85, 161, 180, 0.15)',
                  textAlign: 'center',
                }}
              >
                <Calendar className="w-6 h-6" style={{ color: 'var(--primary)', margin: '0 auto var(--space-2)' }} />
                <div
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: 'var(--text-2xl)',
                    fontWeight: 'var(--font-weight-bold)',
                    color: 'var(--foreground)',
                    marginBottom: 'var(--space-1)',
                  }}
                >
                  {Math.floor(streakCount / 7)}
                </div>
                <div
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: 'var(--text-xs)',
                    color: 'var(--muted-foreground)',
                  }}
                >
                  Semaines
                </div>
              </div>

              <div
                style={{
                  padding: 'var(--space-4)',
                  borderRadius: 'var(--radius-lg)',
                  background: 'rgba(248, 176, 68, 0.05)',
                  border: '1px solid rgba(248, 176, 68, 0.15)',
                  textAlign: 'center',
                }}
              >
                <TrendingUp className="w-6 h-6" style={{ color: 'var(--accent)', margin: '0 auto var(--space-2)' }} />
                <div
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: 'var(--text-2xl)',
                    fontWeight: 'var(--font-weight-bold)',
                    color: 'var(--foreground)',
                    marginBottom: 'var(--space-1)',
                  }}
                >
                  +{streakCount * 10}
                </div>
                <div
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: 'var(--text-xs)',
                    color: 'var(--muted-foreground)',
                  }}
                >
                  XP Total
                </div>
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
                background: 'linear-gradient(135deg, #FF6B35 0%, #F7931E 100%)',
                color: 'white',
                cursor: 'pointer',
                transition: 'all var(--duration-base) ease',
                boxShadow: '0 8px 24px rgba(255, 107, 53, 0.3)',
                position: 'relative',
                zIndex: 1,
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = '0 12px 32px rgba(255, 107, 53, 0.4)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 8px 24px rgba(255, 107, 53, 0.3)';
              }}
            >
              Continuer ma série
            </motion.button>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
