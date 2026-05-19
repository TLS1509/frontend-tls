import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';

type Props = {
  /** Items to marquee. Rendered as identical clones for seamless loop. */
  items: React.ReactNode[];
  /** Loop duration in seconds. Slower = more elegant. Default 40. */
  duration?: number;
  /** Gap between items (Tailwind class). Default 'gap-16'. */
  gapClassName?: string;
  /** Reverse direction. */
  reverse?: boolean;
  /** Fade left/right edges with a mask. */
  edgeFade?: boolean;
  className?: string;
};

/**
 * Infinite horizontal marquee. Duplicates items once and translates -50% over duration.
 * Respects prefers-reduced-motion (renders static row).
 *
 * Tip: pause on hover via `group` + Tailwind `group-hover:[animation-play-state:paused]`
 * is not directly supported (framer-motion vs CSS). Use `whileHover` if needed.
 */
export const MarqueeRow: React.FC<Props> = ({
  items,
  duration = 40,
  gapClassName = 'gap-16',
  reverse = false,
  edgeFade = true,
  className = '',
}) => {
  const reduced = useReducedMotion();
  const sequence = [...items, ...items];
  const animate = reduced
    ? undefined
    : { x: reverse ? ['-50%', '0%'] : ['0%', '-50%'] };

  return (
    <div
      className={`relative overflow-hidden ${className}`}
      style={
        edgeFade
          ? {
              maskImage:
                'linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)',
              WebkitMaskImage:
                'linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)',
            }
          : undefined
      }
      aria-hidden
    >
      <motion.div
        className={`flex w-fit ${gapClassName}`}
        animate={animate}
        transition={{ duration, repeat: Infinity, ease: 'linear' }}
      >
        {sequence.map((item, i) => (
          <div key={i} className="shrink-0 flex items-center">
            {item}
          </div>
        ))}
      </motion.div>
    </div>
  );
};

export default MarqueeRow;
