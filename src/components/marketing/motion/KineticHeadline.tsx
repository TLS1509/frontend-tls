import React, { useEffect, useState } from 'react';
import { motion, useReducedMotion, type Variants } from 'framer-motion';

type Props = {
  /** The headline text. Split on spaces; each word rises from behind a mask. */
  text: string;
  className?: string;
  /** Seconds between each word. Default 0.08. */
  stagger?: number;
  /** Initial delay before the first word (s). */
  delay?: number;
  /** IntersectionObserver trigger margin. Default -80px. */
  margin?: string;
  /** Re-trigger on every entry. Default once. */
  repeat?: boolean;
  /** Failsafe (ms): reveal even if the viewport observer never fires (hidden tab / headless). Default 1400. */
  failsafe?: number;
};

const word: Variants = {
  hidden: { y: '115%' },
  show: { y: '0%', transition: { duration: 0.72, ease: [0.22, 1, 0.36, 1] } },
};

/**
 * KineticHeadline — editorial "words rise from behind a mask" reveal.
 * Each word sits in an overflow-hidden sleeve and translates up into view,
 * staggered. The signature premium headline entrance (Readymag / Locomotive).
 *
 * Robustness: a reveal must never gate content permanently. We trigger on
 * onViewportEnter AND a setTimeout failsafe, so the headline always shows even
 * if the IntersectionObserver never fires (background tab, headless render).
 * Respects prefers-reduced-motion: degrades to a single opacity fade, no mask.
 * Accessible: full string via aria-label; word sleeves are aria-hidden.
 */
export const KineticHeadline: React.FC<Props> = ({
  text,
  className = '',
  stagger = 0.08,
  delay = 0,
  margin = '-80px',
  repeat = false,
  failsafe = 1400,
}) => {
  const reduced = useReducedMotion();
  const [shown, setShown] = useState(false);
  const words = text.split(' ');

  useEffect(() => {
    const t = setTimeout(() => setShown(true), failsafe);
    return () => clearTimeout(t);
  }, [failsafe]);

  if (reduced) {
    return (
      <motion.span
        className={className}
        initial={{ opacity: 0 }}
        animate={shown ? { opacity: 1 } : undefined}
        whileInView={{ opacity: 1 }}
        viewport={{ once: !repeat, margin: margin as `${number}px` }}
        transition={{ duration: 0.4, delay }}
      >
        {text}
      </motion.span>
    );
  }

  return (
    <motion.span
      className={`inline-block ${className}`}
      aria-label={text}
      variants={{ hidden: {}, show: { transition: { staggerChildren: stagger, delayChildren: delay } } }}
      initial="hidden"
      animate={shown ? 'show' : undefined}
      whileInView="show"
      onViewportEnter={() => setShown(true)}
      viewport={{ once: !repeat, margin: margin as `${number}px` }}
    >
      {words.map((w, i) => (
        <React.Fragment key={`${w}-${i}`}>
          {/* pb compensates for descenders so the mask doesn't clip g/p/y at rest */}
          <span aria-hidden className="inline-block overflow-hidden align-bottom pb-[0.12em] -mb-[0.12em]">
            <motion.span className="inline-block" variants={word}>
              {w}
            </motion.span>
          </span>
          {/* real space between sleeves (kept outside overflow-hidden so it isn't clipped/trimmed) */}
          {i < words.length - 1 ? ' ' : ''}
        </React.Fragment>
      ))}
    </motion.span>
  );
};

export default KineticHeadline;
