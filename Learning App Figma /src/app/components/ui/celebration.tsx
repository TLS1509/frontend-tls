import { motion, AnimatePresence } from 'motion/react';
import { useEffect, useState } from 'react';
import { Trophy, Star, Flame, CheckCircle2, Award, Zap } from 'lucide-react';

interface CelebrationProps {
  type: 'lesson-complete' | 'streak' | 'badge' | 'milestone' | 'achievement' | 'level-up';
  title: string;
  subtitle?: string;
  onClose: () => void;
  duration?: number;
}

export function Celebration({ type, title, subtitle, onClose, duration = 3000 }: CelebrationProps) {
  const [show, setShow] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShow(false);
      setTimeout(onClose, 500);
    }, duration);
    return () => clearTimeout(timer);
  }, [onClose, duration]);

  const getIcon = () => {
    const iconProps = { className: "w-16 h-16" };
    switch (type) {
      case 'lesson-complete': return <CheckCircle2 {...iconProps} />;
      case 'streak': return <Flame {...iconProps} />;
      case 'badge': return <Trophy {...iconProps} />;
      case 'milestone': return <Star {...iconProps} />;
      case 'achievement': return <Award {...iconProps} />;
      case 'level-up': return <Zap {...iconProps} />;
    }
  };

  const getColor = () => {
    switch (type) {
      case 'lesson-complete': return 'var(--success-600)';
      case 'streak': return '#FF8A00';
      case 'badge': return 'var(--accent)';
      case 'milestone': return 'var(--primary)';
      case 'achievement': return 'var(--secondary)';
      case 'level-up': return '#8B5CF6';
    }
  };

  const getGradient = () => {
    switch (type) {
      case 'lesson-complete': return 'linear-gradient(135deg, var(--success-500), var(--success-700))';
      case 'streak': return 'linear-gradient(135deg, #FF8A00, #FF6B00)';
      case 'badge': return 'var(--gradient-accent)';
      case 'milestone': return 'var(--gradient-primary)';
      case 'achievement': return 'var(--gradient-secondary)';
      case 'level-up': return 'linear-gradient(135deg, #8B5CF6, #6D28D9)';
    }
  };

  const confettiColors = [
    'var(--primary)',
    'var(--secondary)',
    'var(--accent)',
    'var(--success-600)',
    '#8B5CF6',
    '#10B981',
  ];

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-50 flex items-center justify-center"
          style={{
            background: 'rgba(0, 0, 0, 0.6)',
            backdropFilter: 'var(--blur-md)',
          }}
          onClick={() => setShow(false)}
        >
          <motion.div
            initial={{ scale: 0.8, y: 50 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.8, y: -50 }}
            transition={{ type: 'spring', duration: 0.6 }}
            className="relative"
          >
            {/* Confetti animation */}
            {[...Array(30)].map((_, i) => (
              <motion.div
                key={i}
                initial={{ 
                  x: 0, 
                  y: 0, 
                  opacity: 1,
                  scale: 1,
                  rotate: 0,
                }}
                animate={{ 
                  x: (Math.random() - 0.5) * 500,
                  y: (Math.random() - 0.5) * 500,
                  opacity: 0,
                  scale: 0,
                  rotate: Math.random() * 720,
                }}
                transition={{ 
                  duration: 2, 
                  delay: i * 0.03,
                  ease: 'easeOut',
                }}
                style={{
                  position: 'absolute',
                  width: Math.random() * 10 + 5 + 'px',
                  height: Math.random() * 10 + 5 + 'px',
                  borderRadius: Math.random() > 0.5 ? '50%' : '0',
                  background: confettiColors[i % confettiColors.length],
                  left: '50%',
                  top: '50%',
                }}
              />
            ))}

            {/* Card */}
            <motion.div
              initial={{ scale: 0.8, rotate: -5 }}
              animate={{ 
                scale: 1, 
                rotate: 0,
              }}
              className="relative z-10 p-8 rounded-3xl text-center"
              style={{
                background: 'white',
                boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3)',
                maxWidth: '450px',
                border: '1px solid var(--glass-border)',
              }}
            >
              {/* Animated Icon Container */}
              <motion.div
                animate={{ 
                  rotate: [0, -10, 10, -10, 10, 0],
                  scale: [1, 1.1, 1, 1.1, 1],
                }}
                transition={{ 
                  duration: 0.8,
                  repeat: 2,
                  ease: 'easeInOut',
                }}
                className="mb-6 mx-auto w-24 h-24 rounded-full flex items-center justify-center relative overflow-hidden"
                style={{
                  background: getGradient(),
                  color: 'white',
                  boxShadow: `0 8px 24px ${getColor()}44`,
                }}
              >
                {getIcon()}
                
                {/* Shine effect */}
                <motion.div
                  animate={{
                    x: ['-100%', '200%'],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    repeatDelay: 1,
                  }}
                  className="absolute inset-0"
                  style={{
                    background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent)',
                    width: '50%',
                  }}
                />
              </motion.div>

              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                style={{ 
                  fontFamily: 'var(--font-display)',
                  fontSize: 'var(--text-3xl)',
                  fontWeight: 'var(--font-weight-bold)',
                  color: 'var(--foreground)',
                  marginBottom: '0.5rem',
                  lineHeight: 'var(--leading-tight)',
                }}
              >
                {title}
              </motion.h2>
              
              {subtitle && (
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  style={{ 
                    fontSize: 'var(--text-base)',
                    color: 'var(--muted-foreground)',
                    lineHeight: 'var(--leading-relaxed)',
                  }}
                >
                  {subtitle}
                </motion.p>
              )}

              {/* Progress indicator */}
              <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: duration / 1000, ease: 'linear' }}
                className="mt-6 h-1 rounded-full"
                style={{
                  background: `linear-gradient(90deg, ${getColor()}, ${getColor()}88)`,
                  transformOrigin: 'left',
                }}
              />
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
