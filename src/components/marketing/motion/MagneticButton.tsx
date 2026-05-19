import React, { useRef, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';

type Props = {
  children: React.ReactNode;
  /** Max displacement in pixels (default 12px — feels premium, not gimmicky). */
  strength?: number;
  className?: string;
};

/**
 * Magnetic wrapper. Tracks mouse position relative to element center
 * and translates the child up to `strength` px. Springs back on mouse leave.
 * Disabled under prefers-reduced-motion and on touch devices (no mousemove).
 *
 * Wrap any element — typically a <Button> — in <MagneticButton>...</MagneticButton>.
 * Layout: render as inline-block so the wrapper doesn't grow.
 */
export const MagneticButton: React.FC<Props> = ({
  children,
  strength = 12,
  className = '',
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const reduced = useReducedMotion();

  const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (reduced || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = (e.clientX - cx) / (rect.width / 2);
    const dy = (e.clientY - cy) / (rect.height / 2);
    setPos({ x: dx * strength, y: dy * strength });
  };

  const handleLeave = () => setPos({ x: 0, y: 0 });

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      animate={pos}
      transition={{ type: 'spring', stiffness: 220, damping: 18, mass: 0.4 }}
      className={`inline-block ${className}`}
    >
      {children}
    </motion.div>
  );
};

export default MagneticButton;
