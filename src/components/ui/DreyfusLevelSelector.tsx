/**
 * DreyfusLevelSelector — 5-level Likert picker for self-assessment.
 *
 * Used in OnboardingQuestionnaire (and future positioning flows) to capture
 * a learner's self-evaluated Dreyfus stage (Novice → Expert) per competence.
 *
 * Defaults to the canonical 5-level scale ; can be overridden via `levels`.
 *
 * Responsive : `grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5`
 * to avoid cramped 5-col layout on narrow tablets (fixes a known Phase 14.1
 * issue with the previous `md:grid-cols-5` layout).
 */

import React from 'react';

export type DreyfusLevelSelectorTone = 'brand' | 'warm' | 'sun';

export interface DreyfusLevel {
  v: number;
  label: string;
  desc: string;
}

export const DEFAULT_DREYFUS_LEVELS: DreyfusLevel[] = [
  { v: 1, label: 'Novice',           desc: 'Je découvre' },
  { v: 2, label: 'Débutant avancé',  desc: 'Je connais les bases' },
  { v: 3, label: 'Compétent',        desc: 'Je sais faire en autonomie' },
  { v: 4, label: 'Maîtrise',         desc: 'Je sais expliquer et adapter' },
  { v: 5, label: 'Expert',           desc: 'Je sais innover et former' },
];

export interface DreyfusLevelSelectorProps {
  value?: number;
  onChange: (level: number) => void;
  levels?: DreyfusLevel[];
  tone?: DreyfusLevelSelectorTone;
  className?: string;
  'aria-label'?: string;
}

const TONE_SELECTED: Record<DreyfusLevelSelectorTone, string> = {
  brand: 'border-primary-500 bg-primary-50',
  warm:  'border-secondary-500 bg-secondary-50',
  sun:   'border-accent-400 bg-accent-50',
};

const TONE_NUMBER: Record<DreyfusLevelSelectorTone, string> = {
  brand: 'text-primary-700',
  warm:  'text-secondary-700',
  sun:   'text-accent-700',
};

const TONE_HOVER: Record<DreyfusLevelSelectorTone, string> = {
  brand: 'hover:border-primary-300 hover:bg-primary-50/40',
  warm:  'hover:border-secondary-300 hover:bg-secondary-50/40',
  sun:   'hover:border-accent-300 hover:bg-accent-50/40',
};

const TONE_FOCUS: Record<DreyfusLevelSelectorTone, string> = {
  brand: 'focus-visible:outline-primary-500',
  warm:  'focus-visible:outline-secondary-500',
  sun:   'focus-visible:outline-accent-400',
};

export const DreyfusLevelSelector: React.FC<DreyfusLevelSelectorProps> = ({
  value,
  onChange,
  levels = DEFAULT_DREYFUS_LEVELS,
  tone = 'brand',
  className = '',
  'aria-label': ariaLabel = 'Niveau Dreyfus',
}) => {
  // Arrow-key roving tabindex for accessible radiogroup navigation.
  const refs = React.useRef<(HTMLButtonElement | null)[]>([]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>, idx: number) => {
    const isHorizontal = e.key === 'ArrowRight' || e.key === 'ArrowLeft';
    const isVertical = e.key === 'ArrowDown' || e.key === 'ArrowUp';
    if (!isHorizontal && !isVertical && e.key !== 'Home' && e.key !== 'End') return;
    e.preventDefault();

    let nextIdx = idx;
    if (e.key === 'ArrowRight' || e.key === 'ArrowDown') nextIdx = (idx + 1) % levels.length;
    else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') nextIdx = (idx - 1 + levels.length) % levels.length;
    else if (e.key === 'Home') nextIdx = 0;
    else if (e.key === 'End') nextIdx = levels.length - 1;

    onChange(levels[nextIdx].v);
    refs.current[nextIdx]?.focus();
  };

  // Determine which radio gets tabIndex=0 (selected one, or first if nothing selected).
  const tabbableIdx = Math.max(0, levels.findIndex((lv) => lv.v === value));

  const gridClasses = [
    'grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-stack-xs',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={gridClasses} role="radiogroup" aria-label={ariaLabel}>
      {levels.map((lv, idx) => {
        const selected = value === lv.v;
        const btnClasses = [
          'min-h-touch p-4 rounded-lg border-2 text-left transition-[background-color,border-color] duration-base ease-emphasis bg-white cursor-pointer',
          'focus-visible:outline-2 focus-visible:outline-offset-2',
          TONE_FOCUS[tone],
          selected ? TONE_SELECTED[tone] : `border-ink-200 ${TONE_HOVER[tone]}`,
        ].join(' ');

        return (
          <button
            key={lv.v}
            ref={(el) => { refs.current[idx] = el; }}
            type="button"
            role="radio"
            aria-checked={selected}
            tabIndex={idx === tabbableIdx ? 0 : -1}
            onKeyDown={(e) => handleKeyDown(e, idx)}
            onClick={() => onChange(lv.v)}
            className={btnClasses}
          >
            <div className={['text-h4 font-bold leading-none', TONE_NUMBER[tone]].join(' ')}>
              {lv.v}
            </div>
            <div className="mt-1 font-semibold text-body-sm text-ink-900 leading-tight">
              {lv.label}
            </div>
            <div className="mt-1 text-caption text-ink-500 leading-relaxed">
              {lv.desc}
            </div>
          </button>
        );
      })}
    </div>
  );
};

export default DreyfusLevelSelector;
