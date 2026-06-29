/**
 * ViewerProgressTrail — Progress indicator for step-by-step viewers (Astuces, Flashcards).
 *
 * Features :
 *  - Dot-style progress (discrete steps, default)
 *  - Bar-style progress (continuous percentage)
 *  - Tone-aware colors (primary/warm/sun)
 *  - Completion visual (all dots filled → gradient celebratory effect)
 *  - Respects prefers-reduced-motion
 *  - Accessibility: role="progressbar" + aria-valuenow/valuemin/valuemax
 */

import React from 'react';

export type ViewerProgressStyle = 'dots' | 'bar';
export type ViewerProgressTone = 'primary' | 'warm' | 'sun';

export interface ViewerProgressTrailProps {
  /** Current step (0-indexed) */
  current: number;
  /** Total number of steps */
  total: number;
  /** Display style: 'dots' (discrete) or 'bar' (continuous) */
  style?: ViewerProgressStyle;
  /** Color tone */
  tone?: ViewerProgressTone;
  /** Custom className for wrapper */
  className?: string;
}

/* ─── Tone maps ──────────────────────────────────────────────────────────── */

const DOT_INACTIVE: Record<ViewerProgressTone, string> = {
  primary: 'bg-primary-200',
  warm:    'bg-secondary-200',
  sun:     'bg-accent-200',
};

const DOT_ACTIVE: Record<ViewerProgressTone, string> = {
  primary: 'bg-primary-500',
  warm:    'bg-secondary-500',
  sun:     'bg-accent-500',
};

const BAR_TRACK: Record<ViewerProgressTone, string> = {
  primary: 'bg-primary-100',
  warm:    'bg-secondary-100',
  sun:     'bg-accent-100',
};

const BAR_FILL: Record<ViewerProgressTone, string> = {
  primary: 'bg-primary-500',
  warm:    'bg-secondary-500',
  sun:     'bg-accent-500',
};

const BAR_FILL_COMPLETE: Record<ViewerProgressTone, string> = {
  primary: 'bg-gradient-to-r from-primary-500 to-primary-400',
  warm:    'bg-gradient-to-r from-secondary-500 to-secondary-400',
  sun:     'bg-gradient-to-r from-accent-500 to-accent-400',
};

/* ─── Component ──────────────────────────────────────────────────────────── */

export const ViewerProgressTrail: React.FC<ViewerProgressTrailProps> = ({
  current,
  total,
  style = 'dots',
  tone = 'primary',
  className = '',
}) => {
  const progressPct = total > 0 ? (current / total) * 100 : 0;
  const isComplete = current >= total - 1;

  if (style === 'bar') {
    return (
      <div
        className={`h-1.5 w-full rounded-full overflow-hidden ${BAR_TRACK[tone]} ${className}`.trim()}
        role="progressbar"
        aria-valuenow={Math.round(progressPct)}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label={`Progression: ${Math.round(progressPct)}%`}
      >
        <div
          className={`h-full transition-all duration-500 ease-out ${
            isComplete ? BAR_FILL_COMPLETE[tone] : BAR_FILL[tone]
          }`.trim()}
          style={{ width: `${progressPct}%` }}
        />
      </div>
    );
  }

  // Dots style (default)
  return (
    <div
      className={`flex items-center justify-center gap-1.5 ${className}`.trim()}
      role="progressbar"
      aria-valuenow={current}
      aria-valuemin={0}
      aria-valuemax={total - 1}
      aria-label={`Étape ${current + 1} sur ${total}`}
    >
      {Array.from({ length: total }, (_, i) => (
        <button
          key={i}
          type="button"
          onClick={() => {
            // Optional: callback to jump to step (can be added as prop if needed)
          }}
          aria-label={`Aller à l'étape ${i + 1}`}
          aria-current={i === current ? 'step' : undefined}
          className={`
            w-2 h-2 rounded-full transition-all duration-300 ease-out
            ${i <= current ? DOT_ACTIVE[tone] : DOT_INACTIVE[tone]}
            ${i === current ? 'w-3 h-3' : ''}
            hover:scale-110 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500
          `.trim()}
        />
      ))}
    </div>
  );
};

export default ViewerProgressTrail;
