import React, { useEffect, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';

type Dir = 'up' | 'down' | 'left' | 'right';

/** clip-path inset(top right bottom left) start states — fully hidden from the given edge. */
const FROM: Record<Dir, string> = {
  up: 'inset(0 0 100% 0)', // hidden from bottom, wipes upward
  down: 'inset(100% 0 0 0)', // hidden from top, wipes downward
  right: 'inset(0 100% 0 0)', // hidden from right, wipes left→right
  left: 'inset(0 0 0 100%)', // hidden from left, wipes right→left
};
const FULL = 'inset(0 0 0 0)';

type Props = {
  children: React.ReactNode;
  className?: string;
  /** Wipe direction. Default 'up'. */
  direction?: Dir;
  delay?: number;
  duration?: number;
  margin?: string;
  repeat?: boolean;
  /** Failsafe (ms): reveal even if the viewport observer never fires. Default 1400. */
  failsafe?: number;
};

/**
 * RevealMask — directional clip-path wipe. The content is revealed as a moving
 * mask uncovers it (the Readymag/editorial image-reveal). Pairs a subtle scale
 * so the content settles rather than just popping. Use on images, the app
 * mockup, feature cards, or section blocks.
 *
 * Robustness: triggers on onViewportEnter AND a setTimeout failsafe, so masked
 * content never stays permanently hidden if the observer doesn't fire.
 * Respects prefers-reduced-motion: degrades to a plain opacity fade (no clip).
 */
export const RevealMask: React.FC<Props> = ({
  children,
  className = '',
  direction = 'up',
  delay = 0,
  duration = 0.9,
  margin = '-80px',
  repeat = false,
  failsafe = 1400,
}) => {
  const reduced = useReducedMotion();
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setShown(true), failsafe);
    return () => clearTimeout(t);
  }, [failsafe]);

  if (reduced) {
    return (
      <motion.div
        className={className}
        initial={{ opacity: 0 }}
        animate={shown ? { opacity: 1 } : undefined}
        whileInView={{ opacity: 1 }}
        viewport={{ once: !repeat, margin: margin as `${number}px` }}
        transition={{ duration: 0.35, delay }}
      >
        {children}
      </motion.div>
    );
  }

  const revealed = { clipPath: FULL, scale: 1, opacity: 1 };

  return (
    <motion.div
      className={className}
      initial={{ clipPath: FROM[direction], scale: 1.04, opacity: 0.6 }}
      animate={shown ? revealed : undefined}
      whileInView={revealed}
      onViewportEnter={() => setShown(true)}
      viewport={{ once: !repeat, margin: margin as `${number}px` }}
      transition={{ duration, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
};

export default RevealMask;
