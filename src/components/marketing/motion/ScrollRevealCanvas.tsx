import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';

type Props = {
  /**
   * URL or path to the background illustration / image / SVG.
   * Gets revealed progressively as the user scrolls.
   */
  bgSrc: string;
  /** Content that floats above the revealed background. */
  children: React.ReactNode;
  /** Total height of the scroll zone. Default: '280vh' */
  height?: string;
  /**
   * What fraction of total scroll range the reveal takes.
   * 0.7 = fully revealed at 70% scroll, then frozen.
   */
  revealDuration?: number;
  /**
   * Soft-edge width on the reveal boundary (% units).
   * Larger = more painterly / watercolor feel. Default: 10
   */
  edgeSoftness?: number;
  /**
   * Optional static overlay on top of the bg (e.g. 'bg-white/25').
   * Use to lighten a dark bg image so text stays readable.
   */
  overlay?: string;
  /** Additional CSS blur on the bg image (px). Default: 0 */
  bgBlur?: number;
  /** Extra classes on the outer scroll zone. */
  className?: string;
};

/**
 * Scroll-driven illustration reveal.
 *
 * The background image is hidden behind a soft mask that progressively
 * paints in from bottom to top as the user scrolls. Glass cards or
 * content placed as `children` float on top.
 *
 * Uses mask-image (not clip-path) for a painted / watercolor edge.
 * Reduce-motion: mask starts at 100% (fully visible), no animation.
 */
export const ScrollRevealCanvas: React.FC<Props> = ({
  bgSrc,
  children,
  height = '280vh',
  revealDuration = 0.68,
  edgeSoftness = 10,
  overlay,
  bgBlur = 0,
  className = '',
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end end'],
  });

  // Ink-wash mask: bottom-to-top reveal with soft painted edge.
  // If reduced-motion → instant full reveal (pct always 100).
  const mask = useTransform(scrollYProgress, (raw) => {
    if (prefersReducedMotion) return 'none';
    const pct = Math.min(100, (raw / revealDuration) * 100);
    const edge = `calc(${pct}% + ${edgeSoftness}%)`;
    return `linear-gradient(to top, black 0%, black ${pct}%, transparent ${edge})`;
  });

  // Subtle parallax — bg moves a bit slower than scroll for depth.
  const bgY = useTransform(
    scrollYProgress,
    [0, 1],
    prefersReducedMotion ? ['0%', '0%'] : ['0%', '-12%']
  );

  return (
    <div
      ref={ref}
      className={`relative ${className}`}
      style={{ height }}
    >
      {/* ─── Sticky viewport ─── */}
      <div className="sticky top-0 h-[100dvh] overflow-hidden">

        {/* ─── Revealed background layer ─── */}
        <motion.div
          className="absolute inset-0"
          style={{
            WebkitMaskImage: mask,
            maskImage: mask,
          }}
        >
          {/* Bg image with gentle parallax */}
          <motion.div
            className="absolute inset-0 scale-[1.08]"
            style={{ y: bgY }}
          >
            <img
              src={bgSrc}
              alt=""
              aria-hidden="true"
              className="w-full h-full object-cover"
              style={bgBlur ? { filter: `blur(${bgBlur}px)` } : undefined}
            />
          </motion.div>

          {/* Optional overlay tint */}
          {overlay && (
            <div className={`absolute inset-0 ${overlay}`} aria-hidden="true" />
          )}
        </motion.div>

        {/* ─── Content layer ─── */}
        <div className="relative z-10 h-full">
          {children}
        </div>
      </div>
    </div>
  );
};

export default ScrollRevealCanvas;
