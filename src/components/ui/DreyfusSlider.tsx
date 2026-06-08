/**
 * DreyfusSlider — Compact horizontal track-style 5-step Dreyfus level selector.
 *
 * Figma DS name: DreyfusSlider.
 * Distinct from DreyfusLevelSelector (responsive card-grid for questionnaire contexts).
 *
 * Renders as a horizontal track with 5 circular nodes (D1–D5), a filled connector
 * rail between nodes, and shortlabels below. Ideal for within-card assessments,
 * positionnement flows, and any space-constrained Dreyfus picker.
 *
 * - Always horizontal (no responsive stacking)
 * - Touch-safe: w-11 h-11 (44px) interactive nodes
 * - Tone-aware: brand / warm / sun
 * - Uses canonical DREYFUS_LABELS from data/competencies (Cahier #02)
 *
 * Replaces inline DreyfusLevelSelector in Positionnement.tsx.
 */

import React from 'react';
import type { DreyfusLevel } from '../../types/learning';
import { DREYFUS_LABELS } from '../../data/competencies';

// ─── Types ────────────────────────────────────────────────────────────────────

export type DreyfusSliderTone = 'brand' | 'warm' | 'sun';

export interface DreyfusSliderProps {
  /** Current selected level (null = nothing selected yet) */
  value: DreyfusLevel | null;
  onChange: (level: DreyfusLevel) => void;
  tone?: DreyfusSliderTone;
  className?: string;
  'aria-label'?: string;
}

// ─── Constants ────────────────────────────────────────────────────────────────

const LEVELS: DreyfusLevel[] = [1, 2, 3, 4, 5];

/** Active/selected node: filled with tone colour */
const TONE_NODE_ACTIVE: Record<DreyfusSliderTone, string> = {
  brand: 'bg-primary-500 border-primary-500 text-white shadow-sm',
  warm:  'bg-secondary-500 border-secondary-500 text-white shadow-sm',
  sun:   'bg-accent-400 border-accent-400 text-ink-900 shadow-sm',
};

/** Past nodes (to the left of selection): lightly tinted */
const TONE_NODE_DONE: Record<DreyfusSliderTone, string> = {
  brand: 'bg-primary-50 border-primary-300 text-primary-700',
  warm:  'bg-secondary-50 border-secondary-300 text-secondary-700',
  sun:   'bg-accent-50 border-accent-300 text-accent-700',
};

/** Future nodes (to the right of selection): neutral */
const NODE_IDLE = 'bg-white border-ink-200 text-ink-500 hover:border-ink-400 hover:text-ink-700';

/** Filled connector colour */
const TONE_CONNECTOR: Record<DreyfusSliderTone, string> = {
  brand: 'bg-primary-400',
  warm:  'bg-secondary-400',
  sun:   'bg-accent-400',
};

/** Active label colour */
const TONE_LABEL_ACTIVE: Record<DreyfusSliderTone, string> = {
  brand: 'text-primary-700',
  warm:  'text-secondary-700',
  sun:   'text-accent-700',
};

/** Focus ring colour */
const TONE_FOCUS: Record<DreyfusSliderTone, string> = {
  brand: 'focus-visible:outline-primary-500',
  warm:  'focus-visible:outline-secondary-500',
  sun:   'focus-visible:outline-accent-400',
};

// ─── Component ────────────────────────────────────────────────────────────────

export const DreyfusSlider: React.FC<DreyfusSliderProps> = ({
  value,
  onChange,
  tone = 'brand',
  className = '',
  'aria-label': ariaLabel = 'Niveau Dreyfus',
}) => (
  <div className={['w-full select-none', className].filter(Boolean).join(' ')}>

    {/* ── Track + Nodes ───────────────────────────────────────────────────── */}
    <div
      className="flex items-center"
      role="radiogroup"
      aria-label={ariaLabel}
    >
      {LEVELS.map((lv, idx) => {
        const isActive = value === lv;
        const isPast   = value !== null && lv < value;
        // Connector between this node and the next is filled when value >= lv + 1
        const connectorFilled = value !== null && value > lv;

        let nodeClass: string;
        if (isActive) nodeClass = TONE_NODE_ACTIVE[tone];
        else if (isPast) nodeClass = TONE_NODE_DONE[tone];
        else nodeClass = NODE_IDLE;

        return (
          <React.Fragment key={lv}>
            <button
              type="button"
              role="radio"
              aria-checked={isActive}
              aria-label={`Niveau ${lv} — ${DREYFUS_LABELS[lv]}`}
              onClick={() => onChange(lv)}
              className={[
                'w-11 h-11 rounded-pill border-2 shrink-0',
                'font-display font-bold text-caption',
                'flex items-center justify-center',
                'transition-all duration-fast cursor-pointer',
                'focus-visible:outline-2 focus-visible:outline-offset-2',
                TONE_FOCUS[tone],
                nodeClass,
              ].join(' ')}
            >
              D{lv}
            </button>

            {/* Connector line — not rendered after the last node */}
            {idx < LEVELS.length - 1 && (
              <div
                aria-hidden
                className={[
                  'flex-1 h-0.5 transition-colors duration-base',
                  connectorFilled ? TONE_CONNECTOR[tone] : 'bg-ink-200',
                ].join(' ')}
              />
            )}
          </React.Fragment>
        );
      })}
    </div>

    {/* ── Labels row — aligns with nodes via justify-between + w-11 per label ─ */}
    <div className="flex justify-between mt-1" aria-hidden>
      {LEVELS.map((lv) => (
        <span
          key={lv}
          className={[
            'w-11 text-center text-micro leading-tight',
            value === lv
              ? `font-bold ${TONE_LABEL_ACTIVE[tone]}`
              : 'font-medium text-ink-400',
          ].join(' ')}
        >
          {DREYFUS_LABELS[lv]}
        </span>
      ))}
    </div>

  </div>
);

export default DreyfusSlider;
