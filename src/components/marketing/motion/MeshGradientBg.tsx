import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';

export type MeshTone = 'primary' | 'warm' | 'sun' | 'brand' | 'ink';

const TONE_BLOBS: Record<MeshTone, { a: string; b: string; c: string }> = {
  primary: {
    a: 'rgba(85,161,180,0.35)',
    b: 'rgba(115,175,191,0.22)',
    c: 'rgba(248,176,68,0.18)',
  },
  warm: {
    a: 'rgba(237,132,58,0.32)',
    b: 'rgba(248,176,68,0.22)',
    c: 'rgba(85,161,180,0.16)',
  },
  sun: {
    a: 'rgba(248,176,68,0.32)',
    b: 'rgba(237,132,58,0.20)',
    c: 'rgba(85,161,180,0.14)',
  },
  brand: {
    a: 'rgba(61,119,134,0.45)',
    b: 'rgba(85,161,180,0.28)',
    c: 'rgba(248,176,68,0.20)',
  },
  ink: {
    a: 'rgba(31,62,69,0.55)',
    b: 'rgba(85,161,180,0.30)',
    c: 'rgba(248,176,68,0.18)',
  },
};

type Props = {
  tone?: MeshTone;
  className?: string;
  intensity?: 'subtle' | 'normal' | 'intense';
};

/**
 * Animated mesh-gradient background using 3 large blurred blobs that drift slowly.
 * Pure CSS + framer-motion — no WebGL. Respects prefers-reduced-motion.
 * Always renders behind content via absolute inset-0, pointer-events-none.
 */
export const MeshGradientBg: React.FC<Props> = ({
  tone = 'primary',
  className = '',
  intensity = 'normal',
}) => {
  const reduced = useReducedMotion();
  const c = TONE_BLOBS[tone];
  const opacity = intensity === 'subtle' ? 0.6 : intensity === 'intense' ? 1 : 0.85;

  const transition = (duration: number) => ({
    duration,
    repeat: Infinity,
    ease: 'easeInOut' as const,
  });

  return (
    <div
      aria-hidden
      className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}
      style={{ opacity }}
    >
      <motion.div
        className="absolute -top-1/4 -left-1/4 w-[80%] h-[80%] rounded-pill blur-[120px]"
        style={{ background: c.a }}
        animate={reduced ? undefined : { x: [0, 60, -30, 0], y: [0, -40, 30, 0] }}
        transition={transition(22)}
      />
      <motion.div
        className="absolute -bottom-1/4 -right-1/4 w-[70%] h-[70%] rounded-pill blur-[120px]"
        style={{ background: c.b }}
        animate={reduced ? undefined : { x: [0, -40, 30, 0], y: [0, 30, -20, 0] }}
        transition={transition(28)}
      />
      <motion.div
        className="absolute top-1/3 right-1/4 w-[45%] h-[45%] rounded-pill blur-[100px]"
        style={{ background: c.c }}
        animate={reduced ? undefined : { x: [0, 25, -15, 0], y: [0, -25, 15, 0], scale: [1, 1.1, 0.95, 1] }}
        transition={transition(18)}
      />
    </div>
  );
};

export default MeshGradientBg;
