import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';

type Direction = 'up' | 'down' | 'left' | 'right' | 'none';

const DIRS: Record<Direction, { x?: number; y?: number }> = {
  up: { y: 28 },
  down: { y: -28 },
  left: { x: 28 },
  right: { x: -28 },
  none: {},
};

type Props = {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  direction?: Direction;
  duration?: number;
  /** Trigger margin in px — earlier values trigger sooner. Default -80px (slightly inside viewport). */
  margin?: string;
  /** Re-trigger on every entry. Default false (once only). */
  repeat?: boolean;
};

/**
 * IntersectionObserver-driven fade-in (via framer-motion whileInView).
 * Respects prefers-reduced-motion: only fades opacity, no transform shift.
 * Always renders as <motion.div> — wrap inline elements explicitly if needed.
 */
export const FadeInWhenVisible: React.FC<Props> = ({
  children,
  className = '',
  delay = 0,
  direction = 'up',
  duration = 0.7,
  margin = '-80px',
  repeat = false,
}) => {
  const reduced = useReducedMotion();
  const offset = DIRS[direction];
  const initial = reduced ? { opacity: 0 } : { opacity: 0, ...offset };
  const animate = { opacity: 1, x: 0, y: 0 };

  return (
    <motion.div
      className={className}
      initial={initial}
      whileInView={animate}
      viewport={{ once: !repeat, margin: margin as `${number}px` }}
      transition={{
        duration: reduced ? 0.25 : duration,
        delay,
        ease: [0.21, 0.47, 0.32, 0.98],
      }}
    >
      {children}
    </motion.div>
  );
};

export default FadeInWhenVisible;
