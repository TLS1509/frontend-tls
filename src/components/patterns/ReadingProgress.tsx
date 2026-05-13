/**
 * ReadingProgress — top-bar + optional circular reading-progress indicator.
 *
 * Track the scroll progress of a target element (or the document) and render :
 *   - <ReadingProgressBar />        : thin gradient bar fixed top, 100% width
 *   - <ReadingProgressRing />       : circular SVG ring (40px), shows %
 *
 * Both subscribe to the same hook `useReadingProgress(targetRef?)`. Pass a
 * ref to a specific article element to measure only its scroll; omit to use
 * the document scroll.
 *
 * Usage:
 *   const articleRef = useRef<HTMLDivElement>(null);
 *   return (
 *     <>
 *       <ReadingProgressBar targetRef={articleRef} tone="brand" />
 *       <article ref={articleRef}> … </article>
 *     </>
 *   );
 */

import React, { useEffect, useRef, useState } from 'react';

export type ReadingProgressTone = 'brand' | 'warm' | 'sun' | 'neutral';

/* ── Hook ───────────────────────────────────────────────────────────────── */

export const useReadingProgress = (
  targetRef?: React.RefObject<HTMLElement | null>
): number => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let rafId = 0;

    const compute = () => {
      const el = targetRef?.current;
      if (el) {
        const rect = el.getBoundingClientRect();
        const total = el.scrollHeight - window.innerHeight;
        const scrolled = -rect.top;
        if (total <= 0) {
          setProgress(scrolled > 0 ? 100 : 0);
        } else {
          const pct = Math.max(0, Math.min(100, (scrolled / total) * 100));
          setProgress(pct);
        }
      } else {
        const doc = document.documentElement;
        const total = doc.scrollHeight - window.innerHeight;
        const scrolled = window.scrollY || doc.scrollTop;
        if (total <= 0) {
          setProgress(0);
        } else {
          setProgress(Math.max(0, Math.min(100, (scrolled / total) * 100)));
        }
      }
    };

    const onScroll = () => {
      if (rafId) cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(compute);
    };

    compute();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, [targetRef]);

  return progress;
};

/* ── Top bar ────────────────────────────────────────────────────────────── */

const BAR_GRADIENT: Record<ReadingProgressTone, string> = {
  brand:   'bg-gradient-to-r from-primary-400 via-primary-600 to-accent-400',
  warm:    'bg-gradient-to-r from-secondary-400 via-secondary-500 to-accent-400',
  sun:     'bg-gradient-to-r from-accent-300 via-accent-400 to-secondary-500',
  neutral: 'bg-gradient-to-r from-ink-400 via-ink-600 to-ink-800',
};

export interface ReadingProgressBarProps {
  targetRef?: React.RefObject<HTMLElement | null>;
  tone?: ReadingProgressTone;
  /** Bar height (default 2px). */
  height?: number;
  /** Apply position fixed at top of viewport (default true). */
  fixed?: boolean;
  className?: string;
}

export const ReadingProgressBar: React.FC<ReadingProgressBarProps> = ({
  targetRef,
  tone = 'brand',
  height = 2,
  fixed = true,
  className = '',
}) => {
  const progress = useReadingProgress(targetRef);

  return (
    <div
      role="progressbar"
      aria-label="Progression de la lecture"
      aria-valuenow={Math.round(progress)}
      aria-valuemin={0}
      aria-valuemax={100}
      className={[
        fixed ? 'fixed top-0 left-0 right-0 z-sticky' : 'relative w-full',
        'pointer-events-none',
        className,
      ].join(' ')}
      style={{ height: `${height}px` }}
    >
      <div
        className={[
          'h-full transition-[width] duration-fast ease-standard',
          BAR_GRADIENT[tone],
        ].join(' ')}
        style={{ width: `${progress}%` }}
      />
    </div>
  );
};

/* ── Circular ring ──────────────────────────────────────────────────────── */

const RING_STROKE: Record<ReadingProgressTone, string> = {
  brand:   'stroke-primary-500',
  warm:    'stroke-secondary-500',
  sun:     'stroke-accent-400',
  neutral: 'stroke-ink-600',
};

const RING_TEXT: Record<ReadingProgressTone, string> = {
  brand:   'text-primary-700',
  warm:    'text-secondary-700',
  sun:     'text-accent-700',
  neutral: 'text-ink-700',
};

export interface ReadingProgressRingProps {
  targetRef?: React.RefObject<HTMLElement | null>;
  tone?: ReadingProgressTone;
  /** Diameter in px (default 40). */
  size?: number;
  /** Show "%" inside the ring (default true). */
  showLabel?: boolean;
  className?: string;
}

export const ReadingProgressRing: React.FC<ReadingProgressRingProps> = ({
  targetRef,
  tone = 'brand',
  size = 40,
  showLabel = true,
  className = '',
}) => {
  const progress = useReadingProgress(targetRef);
  const stroke = 3;
  const radius = (size - stroke) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (progress / 100) * circumference;

  return (
    <span
      role="progressbar"
      aria-label="Progression de la lecture"
      aria-valuenow={Math.round(progress)}
      aria-valuemin={0}
      aria-valuemax={100}
      className={['relative inline-flex items-center justify-center', className].join(' ')}
      style={{ width: size, height: size }}
    >
      <svg
        width={size}
        height={size}
        className="rotate-[-90deg]"
        aria-hidden
      >
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          strokeWidth={stroke}
          className="stroke-ink-100"
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          className={[
            'transition-[stroke-dashoffset] duration-fast ease-standard',
            RING_STROKE[tone],
          ].join(' ')}
        />
      </svg>
      {showLabel && (
        <span
          className={[
            'absolute inset-0 inline-flex items-center justify-center',
            'font-body font-bold text-[10px]',
            RING_TEXT[tone],
          ].join(' ')}
        >
          {Math.round(progress)}%
        </span>
      )}
    </span>
  );
};

export default ReadingProgressBar;
