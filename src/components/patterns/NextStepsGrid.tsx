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

/* Le lien d'action est du texte de marque : cran 800 (doctrine § 2) ; le
   survol fonce d'un cran, il n'éclaircit pas. */
const TONE_CTA: Record<NextStepTone, string> = {
  brand:   'text-primary-800 group-hover:text-primary-900',
  warm:    'text-secondary-800 group-hover:text-secondary-900',
  sun:     'text-accent-800 group-hover:text-accent-900',
  neutral: 'text-ink-900 group-hover:text-primary-800',
};

/* Survol : filet fermé d'un cran + fond très léger (règle du 2026-09-16,
 * cf. CARD_HOVER dans lib/tone-classes.ts) — pas de soulèvement, pas d'ombre. */
const TONE_HOVER_BORDER: Record<NextStepTone, string> = {
  brand:   'hover:border-primary-200 hover:bg-primary-50/40',
  warm:    'hover:border-secondary-200 hover:bg-secondary-50/40',
  sun:     'hover:border-accent-200 hover:bg-accent-50/40',
  neutral: 'hover:border-ink-300 hover:bg-ink-50/50',
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
          'group flex flex-col gap-stack p-stack-lg bg-white rounded-lg border border-ink-100',
          'min-h-touch transition-all duration-base text-left cursor-pointer',
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

            {/* Anatomie d'une carte (passe typographique du 2026-09-24) :
                titre h3 20/700 · 8 · description 16 ink-700 · 16 · action.
                Le titre était un 16/600 à `leading-snug` (le registre d'un
                libellé de rangée) : trois cartes d'étape lues comme une liste.
                Dans un <button>, le titre est un <span> — un <h3> n'est pas un
                contenu valide de bouton. */}
            <span className="flex flex-col gap-stack-xs flex-1">
              <span className="font-display text-h3 text-ink-900">
                {step.title}
              </span>
              <span className="font-body text-body text-ink-700">
                {step.description}
              </span>
            </span>

            <span
              className={[
                'text-caption font-semibold inline-flex items-center gap-stack-3xs transition-all duration-fast',
                'group-hover:gap-stack-xs',
                TONE_CTA[tone],
              ].join(' ')}
            >
              {step.cta} <ArrowRight size={14} />
            </span>
          </button>
        );
      })}
    </div>
  );
};

export default NextStepsGrid;
