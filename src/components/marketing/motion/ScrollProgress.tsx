import React from 'react';
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';

type Props = {
  /** Vertical position from top in Tailwind class (e.g. 'top-16'). Default 'top-0' (fully top). */
  topClass?: string;
  /** Height in Tailwind class. Default 'h-0.5'. */
  heightClass?: string;
  /** Gradient classes. Default brand teal → secondary warm → accent yellow. */
  gradientClass?: string;
};

/**
 * Top scroll progress bar bound to window scrollYProgress.
 * Always fixed full-width, transforms via scaleX from 0 → 1.
 * Cheap to render (GPU-accelerated transform), respects prefers-reduced-motion (renders full).
 *
 * Place in a global layout to have it on every page.
 */
export const ScrollProgress: React.FC<Props> = ({
  topClass = 'top-0',
  heightClass = 'h-0.5',
  gradientClass = 'bg-gradient-to-r from-primary-500 via-secondary-500 to-accent-400',
}) => {
  const { scrollYProgress } = useScroll();
  const reduced = useReducedMotion();
  const scaleX = useTransform(scrollYProgress, [0, 1], reduced ? [1, 1] : [0, 1]);

  return (
    <motion.div
      aria-hidden
      style={{ scaleX, transformOrigin: '0% 50%' }}
      className={`fixed ${topClass} inset-x-0 z-sticky ${heightClass} ${gradientClass} origin-left pointer-events-none`}
    />
  );
};

export default ScrollProgress;
