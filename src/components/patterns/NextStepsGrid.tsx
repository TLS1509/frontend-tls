/**
 * NextStepsGrid — Grid of "what to do next" action cards.
 *
 * Each card : tone-tinted icon bubble + title + description + CTA arrow.
 * Used after a milestone (OnboardingSuccess) to direct the learner to the
 * most relevant next action.
 *
 * Tone is per-item, not global — a row often mixes brand/warm/sun to
 * communicate the variety of next paths (parcours / coaching / passeport).
 *
 * Responsive: 1 col mobile → 2 cols tablet → 3 cols desktop.
 */

import React from 'react';
import { ArrowRight } from 'lucide-react';

export type NextStepTone = 'brand' | 'warm' | 'sun' | 'neutral';

export interface NextStepItem {
  id: string;
  icon: React.ReactNode;
  title: string;
  description: string;
  cta: string;
  tone?: NextStepTone;
  onClick: () => void;
}

export interface NextStepsGridProps {
  items: NextStepItem[];
  /** Override desktop columns (default = items.length, clamped 1..3). */
  columns?: 1 | 2 | 3;
  className?: string;
}

const TONE_BUBBLE: Record<NextStepTone, string> = {
  brand:   'bg-primary-50 text-primary-600',
  warm:    'bg-secondary-50 text-secondary-600',
  sun:     'bg-accent-50 text-accent-600',
  neutral: 'bg-ink-100 text-ink-700',
};

const TONE_CTA: Record<NextStepTone, string> = {
  brand:   'text-primary-700 group-hover:text-primary-800',
  warm:    'text-secondary-700 group-hover:text-secondary-800',
  sun:     'text-accent-700 group-hover:text-accent-800',
  neutral: 'text-ink-900 group-hover:text-primary-700',
};

const TONE_HOVER_BORDER: Record<NextStepTone, string> = {
  brand:   'hover:border-primary-200',
  warm:    'hover:border-secondary-200',
  sun:     'hover:border-accent-200',
  neutral: 'hover:border-ink-300',
};

const TONE_FOCUS: Record<NextStepTone, string> = {
  brand:   'focus-visible:outline-primary-500',
  warm:    'focus-visible:outline-secondary-500',
  sun:     'focus-visible:outline-accent-400',
  neutral: 'focus-visible:outline-ink-500',
};

const COLS_DESKTOP: Record<1 | 2 | 3, string> = {
  1: 'md:grid-cols-1',
  2: 'md:grid-cols-2',
  3: 'md:grid-cols-3',
};

export const NextStepsGrid: React.FC<NextStepsGridProps> = ({
  items,
  columns,
  className = '',
}) => {
  const resolvedCols = columns ?? (Math.min(3, Math.max(1, items.length)) as 1 | 2 | 3);

  const gridClasses = [
    'grid grid-cols-1 sm:grid-cols-2 gap-stack',
    COLS_DESKTOP[resolvedCols],
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={gridClasses}>
      {items.map((step) => {
        const tone = step.tone ?? 'brand';
        const cardClasses = [
          'group flex flex-col gap-stack p-6 bg-white rounded-2xl border border-ink-100',
          'min-h-touch transition-all duration-base text-left cursor-pointer',
          'hover:shadow-md hover:-translate-y-0.5 active:translate-y-0 active:shadow-sm',
          TONE_HOVER_BORDER[tone],
          'focus-visible:outline-2 focus-visible:outline-offset-2',
          TONE_FOCUS[tone],
        ].join(' ');

        return (
          <button
            key={step.id}
            type="button"
            onClick={step.onClick}
            className={cardClasses}
          >
            <span
              className={['w-12 h-12 rounded-xl flex items-center justify-center', TONE_BUBBLE[tone]].join(' ')}
              aria-hidden
            >
              {step.icon}
            </span>

            <div className="flex flex-col gap-tight flex-1">
              <h3 className="text-body font-semibold text-ink-900 leading-snug m-0">
                {step.title}
              </h3>
              <p className="text-body-sm text-ink-500 leading-relaxed m-0">
                {step.description}
              </p>
            </div>

            <span
              className={[
                'text-caption font-semibold inline-flex items-center gap-tight transition-all duration-fast',
                'group-hover:gap-stack-xs',
                TONE_CTA[tone],
              ].join(' ')}
            >
              {step.cta} <ArrowRight size={13} />
            </span>
          </button>
        );
      })}
    </div>
  );
};

export default NextStepsGrid;
