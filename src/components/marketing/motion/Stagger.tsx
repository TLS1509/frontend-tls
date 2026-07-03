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

interface StaggerProps {
  children: React.ReactNode;
  className?: string;
  /** Delay between each child's entrance animation. Default 0.1s. */
  staggerDelay?: number;
  /** Trigger margin — same convention as FadeInWhenVisible. */
  margin?: string;
  /** Re-trigger on every entry. Default false (once only). */
  repeat?: boolean;
}

/**
 * IntersectionObserver-driven staggered entrance container (via framer-motion
 * variants). Wrap `StaggerItem` children — each one animates in with an
 * increasing delay based on its position. Respects prefers-reduced-motion
 * (all children fade in together, no stagger, no transform shift).
 */
export const Stagger: React.FC<StaggerProps> = ({
  children,
  className = '',
  staggerDelay = 0.1,
  margin = '0px',
  repeat = false,
}) => {
  const reduced = useReducedMotion();

  const container = {
    hidden: {},
    show: {
      transition: reduced ? {} : { staggerChildren: staggerDelay },
    },
  };

  return (
    <motion.div
      className={className}
      variants={container}
      initial="hidden"
      whileInView="show"
      viewport={{ once: !repeat, margin: margin as `${number}px` }}
    >
      {children}
    </motion.div>
  );
};

interface StaggerItemProps {
  children: React.ReactNode;
  className?: string;
  direction?: Direction;
  duration?: number;
}

/**
 * Child of `Stagger` — animates in via the parent's variants context.
 * Must be a direct (or variants-propagating) descendant of `<Stagger>`.
 */
export const StaggerItem: React.FC<StaggerItemProps> = ({
  children,
  className = '',
  direction = 'up',
  duration = 0.6,
}) => {
  const reduced = useReducedMotion();
  const offset = DIRS[direction];

  const item = {
    hidden: reduced ? { opacity: 0 } : { opacity: 0, ...offset },
    show: {
      opacity: 1,
      x: 0,
      y: 0,
      transition: {
        duration: reduced ? 0.25 : duration,
        ease: [0.21, 0.47, 0.32, 0.98] as const,
      },
    },
  };

  return (
    <motion.div className={className} variants={item}>
      {children}
    </motion.div>
  );
};

export default Stagger;
