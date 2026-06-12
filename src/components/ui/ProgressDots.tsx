/**
 * ProgressDots — Atom for carousel / wizard progress indicator.
 *
 * Replaces the 3 ad-hoc dot implementations in LessonPlayer (tab pagination),
 * AstucesViewer (pill dots), and FlashcardsViewer (mini dots). Unifies the
 * visual language across all viewers.
 *
 * Sizes :
 *   - xs : 1.5 × 1.5 (compact, dense)
 *   - sm : 2 × 2    (default)
 *   - md : 2.5 × 2.5 (prominent)
 *
 * Active dot is widened (~3× width) to communicate position more clearly than
 * a pure color change.
 *
 * Tone-aware (primary / warm / sun). Done dots use a desaturated version of
 * the tone color ; upcoming dots are ink-200.
 */

import React from 'react';
import type { PageTone } from '../../lib/tone-classes';

export type ProgressDotsSize = 'xs' | 'sm' | 'md';

export interface ProgressDotsProps {
  total: number;
  /** 0-based index of the active dot. */
  current: number;
  tone?: PageTone;
  size?: ProgressDotsSize;
  /** Optional click handler — when provided, dots become buttons. */
  onSelect?: (index: number) => void;
  ariaLabel?: string;
  className?: string;
}

const DOT_SIZE: Record<ProgressDotsSize, { base: string; active: string }> = {
  xs: { base: 'w-1.5 h-1.5', active: 'w-4 h-1.5' },
  sm: { base: 'w-2 h-2',     active: 'w-6 h-2' },
  md: { base: 'w-2.5 h-2.5', active: 'w-8 h-2.5' },
};

const TONE_ACTIVE: Record<PageTone, string> = {
  primary: 'bg-primary-600',
  warm:    'bg-secondary-500',
  sun:     'bg-accent-400',
};

const TONE_DONE: Record<PageTone, string> = {
  primary: 'bg-primary-300',
  warm:    'bg-secondary-300',
  sun:     'bg-accent-300',
};

export const ProgressDots: React.FC<ProgressDotsProps> = ({
  total,
  current,
  tone = 'primary',
  size = 'sm',
  onSelect,
  ariaLabel = 'Progression',
  className = '',
}) => {
  if (total <= 0) return null;

  const sizes = DOT_SIZE[size];
  const wrapperClasses = ['inline-flex items-center gap-tight.5', className].filter(Boolean).join(' ');

  return (
    <div className={wrapperClasses} role="tablist" aria-label={ariaLabel}>
      {Array.from({ length: total }).map((_, idx) => {
        const isActive = idx === current;
        const isDone = idx < current;
        const dotClasses = [
          'rounded-pill transition-[width,background-color] duration-base ease-emphasis',
          isActive ? sizes.active : sizes.base,
          isActive
            ? TONE_ACTIVE[tone]
            : isDone
            ? TONE_DONE[tone]
            : 'bg-ink-200',
          onSelect && 'cursor-pointer hover:opacity-medium focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500',
        ]
          .filter(Boolean)
          .join(' ');

        if (onSelect) {
          return (
            <button
              key={idx}
              type="button"
              role="tab"
              aria-selected={isActive}
              aria-label={`Aller à l'étape ${idx + 1}`}
              onClick={() => onSelect(idx)}
              className={dotClasses}
            />
          );
        }

        return (
          <span
            key={idx}
            role="tab"
            aria-selected={isActive}
            aria-hidden={!isActive}
            className={dotClasses}
          />
        );
      })}
    </div>
  );
};

export default ProgressDots;
