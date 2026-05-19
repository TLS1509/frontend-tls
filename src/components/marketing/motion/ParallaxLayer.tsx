import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';

type Props = {
  children: React.ReactNode;
  /** Translation amplitude in px. Positive = element moves down slower than scroll (deep layer). */
  amplitude?: number;
  /** Optional X parallax amplitude. */
  amplitudeX?: number;
  className?: string;
};

/**
 * Wraps children in a parallax-translated div bound to scroll progress through its parent.
 * Use multiple layers with increasing amplitude for depth (back: 80px, mid: 40px, front: 15px).
 * Disabled under prefers-reduced-motion.
 */
export const ParallaxLayer: React.FC<Props> = ({
  children,
  amplitude = 60,
  amplitudeX = 0,
  className = '',
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const y = useTransform(
    scrollYProgress,
    [0, 1],
    reduced ? ['0px', '0px'] : [`${amplitude}px`, `${-amplitude}px`]
  );
  const x = useTransform(
    scrollYProgress,
    [0, 1],
    reduced ? ['0px', '0px'] : [`${amplitudeX}px`, `${-amplitudeX}px`]
  );

  return (
    <motion.div ref={ref} style={{ y, x }} className={className}>
      {children}
    </motion.div>
  );
};

export default ParallaxLayer;
