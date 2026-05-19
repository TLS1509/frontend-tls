import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';

type Props = {
  children: React.ReactNode;
  /** Tailwind classes for gradient stops. */
  from?: string;
  via?: string;
  to?: string;
  /** When false, the gradient is static (recommended for hover-only or once-played accents). */
  animated?: boolean;
  /** Loop duration in seconds. */
  duration?: number;
  className?: string;
};

/**
 * Inline gradient text wrapper. Gradient position animates from 0% to 100% and back
 * on a slow loop. Disabled under prefers-reduced-motion.
 *
 * Defaults to the TLS brand teal gradient. Use props for warm/sun variants.
 */
export const GradientText: React.FC<Props> = ({
  children,
  from = 'from-primary-600',
  via = 'via-primary-700',
  to = 'to-primary-900',
  animated = true,
  duration = 12,
  className = '',
}) => {
  const reduced = useReducedMotion();
  const isAnimated = animated && !reduced;

  return (
    <motion.span
      className={`bg-gradient-to-br ${from} ${via} ${to} bg-clip-text text-transparent inline ${className}`}
      style={{ backgroundSize: isAnimated ? '200% 200%' : '100% 100%' }}
      animate={isAnimated ? { backgroundPosition: ['0% 0%', '100% 100%', '0% 0%'] } : undefined}
      transition={isAnimated ? { duration, repeat: Infinity, ease: 'easeInOut' } : undefined}
    >
      {children}
    </motion.span>
  );
};

export default GradientText;
