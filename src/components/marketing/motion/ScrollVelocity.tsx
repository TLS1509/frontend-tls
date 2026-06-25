import React from 'react';
import { motion, useScroll, useVelocity, useSpring, useTransform, useReducedMotion } from 'framer-motion';

type Props = {
  children: React.ReactNode;
  className?: string;
  /** Max skew in degrees at peak scroll velocity. Kept small for B2B restraint. Default 4. */
  maxSkew?: number;
  /** Scroll velocity (px/s) that maps to maxSkew. Default 1800. */
  velocityRange?: number;
};

/**
 * ScrollVelocity — leans its children with a subtle skewY driven by scroll
 * velocity, springing back to flat when scrolling stops. The "everything is
 * alive" feel (Locomotive / Readymag), capped low so it reads premium, not toy.
 *
 * GPU-safe (transform only). Respects prefers-reduced-motion: renders flat.
 * Wrap a marquee, a row of cards, or a heading block.
 */
export const ScrollVelocity: React.FC<Props> = ({
  children,
  className = '',
  maxSkew = 4,
  velocityRange = 1800,
}) => {
  const reduced = useReducedMotion();
  const { scrollY } = useScroll();
  const velocity = useVelocity(scrollY);
  const smooth = useSpring(velocity, { stiffness: 280, damping: 50, mass: 0.4 });
  const skewY = useTransform(
    smooth,
    [-velocityRange, 0, velocityRange],
    [maxSkew, 0, -maxSkew],
    { clamp: true },
  );

  if (reduced) return <div className={className}>{children}</div>;

  return (
    <motion.div className={className} style={{ skewY, transformOrigin: 'center' }}>
      {children}
    </motion.div>
  );
};

export default ScrollVelocity;
