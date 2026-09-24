import React from 'react';

export type SegmentedControlSize = 'sm' | 'md' | 'lg';
export type SegmentedControlTone = 'primary' | 'warm' | 'sun';

export interface SegmentedControlOption<T extends string = string> {
  value: T;
  label: React.ReactNode;
  icon?: React.ReactNode;
  disabled?: boolean;
}

export interface SegmentedControlProps<T extends string = string> {
  options: SegmentedControlOption<T>[];
  value: T;
  onChange: (value: T) => void;
  size?: SegmentedControlSize;
  tone?: SegmentedControlTone;
  fullWidth?: boolean;
  className?: string;
  'aria-label'?: string;
}

const TRACK_BASE =
  'inline-flex items-center p-1 bg-ink-100 rounded-lg gap-tight';

const TRACK_SIZE: Record<SegmentedControlSize, string> = {
  sm: 'gap-0',
  md: 'gap-tight',
  lg: 'gap-tight',
};

const SEGMENT_BASE =
  'relative inline-flex items-center justify-center gap-stack-2xs font-body font-semibold whitespace-nowrap rounded-md cursor-pointer border-0 bg-transparent transition-[background-color,box-shadow,color,transform] duration-fast ease-emphasis select-none ' +
  'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500 ' +
  'disabled:opacity-disabled disabled:cursor-not-allowed';

/* Hauteur : c'est le RAIL qui se pose sur la ligne, pas le segment. Rail =
   segment + 2 × 4 px de retrait (`p-1`) : 28 + 8 = 36, 36 + 8 = 44,
   44 + 8 = 52 — l'échelle commune de l'arbitrage n°22, déjà tenue ; vérifiée
   au navigateur le 24/09 (36 et 44 sur la vitrine).
   Libellés : ceux du bouton de même cran — 13 en `sm`, 16 en `md` et `lg`,
   graisse 600 aux deux états (l'actif se dit par la pastille blanche).
   Icônes : 16 · 18 · 20, pliées à leur boîte (motif de `Button`). */
const SEGMENT_SIZE: Record<SegmentedControlSize, string> = {
  sm: 'h-7 px-stack-sm text-caption [&_svg]:size-4',
  md: 'h-9 px-stack text-body [&_svg]:size-4.5',
  lg: 'h-11 px-stack-md text-body [&_svg]:size-5',
};

/* Encre de marque au cran 800, comme le label d'un bouton `soft` : le 700
   mesure 4,48 sur un fond primary-50 et n'a pas de raison d'exister ici. */
const SEGMENT_ACTIVE: Record<SegmentedControlTone, string> = {
  primary: 'bg-white text-primary-800 shadow-xs',
  warm:    'bg-white text-secondary-800 shadow-xs',
  sun:     'bg-white text-accent-800 shadow-xs',
};

const SEGMENT_INACTIVE =
  'text-ink-700 hover:text-ink-900 hover:bg-white/60 active:scale-[0.97]';

export function SegmentedControl<T extends string = string>({
  options,
  value,
  onChange,
  size = 'md',
  tone = 'primary',
  fullWidth = false,
  className = '',
  'aria-label': ariaLabel,
}: SegmentedControlProps<T>) {
  const trackClasses = [
    TRACK_BASE,
    TRACK_SIZE[size],
    fullWidth && 'w-full',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div
      role="group"
      aria-label={ariaLabel}
      className={trackClasses}
    >
      {options.map((opt) => {
        const isActive = opt.value === value;
        const segmentClasses = [
          SEGMENT_BASE,
          SEGMENT_SIZE[size],
          isActive ? SEGMENT_ACTIVE[tone] : SEGMENT_INACTIVE,
          fullWidth && 'flex-1',
        ]
          .filter(Boolean)
          .join(' ');

        return (
          <button
            key={opt.value}
            type="button"
            role="radio"
            aria-checked={isActive}
            disabled={opt.disabled}
            onClick={() => !opt.disabled && onChange(opt.value)}
            className={segmentClasses}
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
  );
}

export default SegmentedControl;
