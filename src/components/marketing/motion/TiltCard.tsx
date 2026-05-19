import React, { useRef, useState } from 'react';
import { motion, useReducedMotion, useSpring } from 'framer-motion';

type Props = {
  children: React.ReactNode;
  className?: string;
  /** Max rotation in degrees. Default 8. Subtle = 4, dramatic = 12. */
  maxRotation?: number;
  /** Perspective in pixels. Higher = flatter. Default 1000. */
  perspective?: number;
  /** Render a subtle gloss highlight that tracks the cursor. */
  gloss?: boolean;
};

/**
 * 3D tilt wrapper. Card rotates X/Y based on cursor position relative to its center.
 * Springs back to flat on mouse leave. Optional gloss highlight (light spot following cursor).
 *
 * Use for hero cards, feature tiles, testimonial cards — anything that benefits from
 * tactile dimensionality. Avoid on small interactive elements (buttons).
 *
 * Respects prefers-reduced-motion (renders flat, no tracking).
 */
export const TiltCard: React.FC<Props> = ({
  children,
  className = '',
  maxRotation = 8,
  perspective = 1000,
  gloss = true,
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const [glossPos, setGlossPos] = useState({ x: 50, y: 50 });

  const rotateX = useSpring(0, { stiffness: 220, damping: 22, mass: 0.5 });
  const rotateY = useSpring(0, { stiffness: 220, damping: 22, mass: 0.5 });

  const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (reduced || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width; // 0..1
    const y = (e.clientY - rect.top) / rect.height; // 0..1
    rotateY.set((x - 0.5) * 2 * maxRotation); // -max..+max
    rotateX.set(-(y - 0.5) * 2 * maxRotation);
    if (gloss) setGlossPos({ x: x * 100, y: y * 100 });
  };

  const handleLeave = () => {
    rotateX.set(0);
    rotateY.set(0);
    if (gloss) setGlossPos({ x: 50, y: 50 });
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: 'preserve-3d',
        transformPerspective: perspective,
      }}
      className={`relative ${className}`}
    >
      {children}
      {gloss && !reduced && (
        <div
          aria-hidden
          className="absolute inset-0 pointer-events-none rounded-[inherit] mix-blend-soft-light opacity-60"
          style={{
            background: `radial-gradient(circle at ${glossPos.x}% ${glossPos.y}%, rgba(255,255,255,0.45) 0%, rgba(255,255,255,0) 50%)`,
            transition: 'background 0.1s ease-out',
          }}
        />
      )}
    </motion.div>
  );
};

export default TiltCard;
