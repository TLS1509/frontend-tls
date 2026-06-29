import React from 'react';

/**
 * QualitativeRating — Labelled pill selector for qualitative feedback (Tailwind v4)
 *
 * A row of clickable text pills representing qualitative options.
 * This is DISTINCT from a numeric star rating: no numbers, just readable labels.
 *
 * Default scale: À améliorer / Passable / Bien / Très bien / Excellent
 * Custom options can be passed via the `options` prop.
 *
 * Tone   : primary | warm | sun  (controls selected pill gradient)
 * Size   : sm | md
 * ARIA   : role="radiogroup" on wrapper, role="radio" + aria-checked on each pill
 */

export type QualitativeRatingTone = 'primary' | 'warm' | 'sun';
export type QualitativeRatingSize = 'sm' | 'md';

export interface QualitativeRatingOption {
  value: string;
  label: string;
  /** Optional leading icon inside the pill */
  icon?: React.ReactNode;
}

export interface QualitativeRatingProps {
  options?: QualitativeRatingOption[];
  /** Controlled: value of the selected option */
  value?: string;
  onChange?: (value: string) => void;
  tone?: QualitativeRatingTone;
  size?: QualitativeRatingSize;
  label?: React.ReactNode;
  hint?: React.ReactNode;
  error?: React.ReactNode;
  required?: boolean;
  disabled?: boolean;
  className?: string;
  /**
   * When false, pills stay on a single row with horizontal scroll.
   * Default: true (wraps to multiple rows).
   */
  wrap?: boolean;
}

/** Default 5-level qualitative scale, re-exported for convenience */
export const DEFAULT_QUALITATIVE_OPTIONS: QualitativeRatingOption[] = [
  { value: '1', label: 'À améliorer' },
  { value: '2', label: 'Passable' },
  { value: '3', label: 'Bien' },
  { value: '4', label: 'Très bien' },
  { value: '5', label: 'Excellent' },
];

/* ─── Style maps ────────────────────────────────────────────────────────────── */

const PILL_BASE =
  'inline-flex items-center justify-center gap-1.5 rounded-pill ' +
  'font-body font-semibold select-none cursor-pointer ' +
  'border transition-[background-color,border-color,box-shadow,transform] duration-base ease-emphasis ' +
  'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500';

const SIZE_CLASSES: Record<QualitativeRatingSize, string> = {
  sm: 'h-8 px-3 text-caption',
  md: 'h-10 px-4 text-body-sm',
};

const SELECTED_CLASSES: Record<QualitativeRatingTone, string> = {
  primary: 'bg-gradient-to-r from-primary-500 to-primary-700 text-white border-transparent shadow-sm',
  warm:    'bg-gradient-to-r from-secondary-500 to-secondary-600 text-white border-transparent shadow-sm',
  // Yellow: skip gradient (contrast issue with white text) → flat amber + dark text
  sun:     'bg-accent-400 text-ink-900 border-transparent shadow-sm',
};

const UNSELECTED_CLASSES =
  'bg-white border-ink-200 text-ink-700 hover:bg-primary-50 hover:border-primary-300';

/* ─── Component ─────────────────────────────────────────────────────────────── */

export const QualitativeRating: React.FC<QualitativeRatingProps> = ({
  options = DEFAULT_QUALITATIVE_OPTIONS,
  value,
  onChange,
  tone = 'primary',
  size = 'md',
  label,
  hint,
  error,
  required,
  disabled = false,
  className = '',
  wrap = true,
}) => {
  return (
    <div className={['flex flex-col gap-stack-xs font-body', className].filter(Boolean).join(' ')}>
      {label && (
        <span className="text-body-sm font-semibold text-ink-900">
          {label}
          {required && (
            <span className="text-danger-base ml-0.5" aria-hidden="true">
              *
            </span>
          )}
        </span>
      )}

      <div
        role="radiogroup"
        aria-label={typeof label === 'string' ? label : 'Évaluation qualitative'}
        aria-required={required ? true : undefined}
        className={[
          'flex gap-stack-xs',
          wrap ? 'flex-wrap' : 'flex-nowrap overflow-x-auto',
        ].join(' ')}
      >
        {options.map((opt) => {
          const isSelected = opt.value === value;
          return (
            <button
              key={opt.value}
              type="button"
              role="radio"
              aria-checked={isSelected}
              disabled={disabled}
              onClick={() => onChange?.(opt.value)}
              className={[
                PILL_BASE,
                SIZE_CLASSES[size],
                isSelected ? SELECTED_CLASSES[tone] : UNSELECTED_CLASSES,
                disabled ? 'opacity-disabled cursor-not-allowed' : '',
              ]
                .filter(Boolean)
                .join(' ')}
            >
              {opt.icon && (
                <span className="inline-flex items-center justify-center shrink-0">
                  {opt.icon}
                </span>
              )}
              {opt.label}
            </button>
          );
        })}
      </div>

      {(error ?? hint) && (
        <p
          role={error ? 'alert' : undefined}
          className={
            error ? 'text-caption text-danger-fg' : 'text-caption text-ink-500'
          }
        >
          {error ?? hint}
        </p>
      )}
    </div>
  );
};

export default QualitativeRating;
