import React, { useId } from 'react';

/**
 * ProgressBar — linear progress tracking.
 *
 * Layouts:
 *   - 'stacked' (default) → label/value above, track full-width below
 *   - 'inline' → label optional, track grows, value to the right of track
 *
 * Sizes: xs/sm/md/lg.
 * Fill: brand/warm/sun/success/danger/gradient.
 *
 * Nom accessible de la barre (`role="progressbar"`), par ordre de priorité :
 *   1. `aria-label` / `aria-labelledby` passés par l'appelant ;
 *   2. le `label` visible, relié par `aria-labelledby` ;
 *   3. à défaut, « Progression ».
 * `aria-valuetext` dit la valeur en français (« 40 % »), ou reprend
 * `valueLabel` quand l'appelant l'a écrit en texte (« 3 leçons sur 5 »).
 */

export type ProgressSize = 'xs' | 'sm' | 'md' | 'lg';
export type ProgressFill = 'brand' | 'warm' | 'sun' | 'success' | 'danger' | 'gradient';
export type ProgressLayout = 'stacked' | 'inline';

export interface ProgressBarProps extends React.HTMLAttributes<HTMLDivElement> {
  value: number;
  max?: number;
  size?: ProgressSize;
  fill?: ProgressFill;
  label?: React.ReactNode;
  valueLabel?: React.ReactNode | false;
  /** Layout: 'stacked' (default — label above) or 'inline' (label and track on same line) */
  layout?: ProgressLayout;

  /** @deprecated Use `value` */
  percentage?: number;
  /** @deprecated Use `valueLabel` */
  showLabel?: boolean;
  /** @deprecated Use `fill` (maps primary→brand, secondary→warm) */
  variant?: 'primary' | 'secondary' | 'success' | 'warning';
}

const TRACK_BASE = 'bg-ink-100 rounded-pill overflow-hidden relative';

const TRACK_SIZE_CLASSES: Record<ProgressSize, string> = {
  xs: 'h-0.5',
  sm: 'h-1',
  md: 'h-2',
  lg: 'h-3.5',
};

const FILL_BASE = 'h-full rounded-[inherit] transition-[width] duration-700 ease-out';

const FILL_VARIANT_CLASSES: Record<ProgressFill, string> = {
  brand:    'bg-gradient-to-r from-primary-500 to-primary-700',
  warm:     'bg-gradient-to-r from-secondary-500 to-secondary-700',
  sun:      'bg-gradient-to-r from-accent-300 to-accent-500',
  success:  'bg-gradient-to-r from-success-base to-success-fg',
  danger:   'bg-gradient-to-r from-danger-base to-danger-fg',
  gradient: 'bg-gradient-to-r from-primary-500 via-secondary-500 to-accent-400',
};

const VALUE_TONE_CLASSES: Record<ProgressFill, string> = {
  brand:    'text-primary-700',
  warm:     'text-secondary-700',
  sun:      'text-accent-700',
  success:  'text-success-fg',
  danger:   'text-danger-fg',
  gradient: 'text-primary-700',
};

export const ProgressBar: React.FC<ProgressBarProps> = ({
  value,
  max = 100,
  size = 'md',
  fill,
  label,
  valueLabel,
  layout = 'stacked',
  percentage,
  showLabel,
  variant,
  className = '',
  'aria-label': ariaLabel,
  'aria-labelledby': ariaLabelledBy,
  ...rest
}) => {
  const labelId = useId();
  const resolvedValue = value ?? percentage ?? 0;
  const pct = Math.min(Math.max((resolvedValue / max) * 100, 0), 100);

  const resolvedFill: ProgressFill =
    fill ?? (variant === 'secondary' ? 'warm' : variant === 'success' ? 'success' : 'brand');

  const showValueLabel =
    valueLabel !== false && (valueLabel !== undefined || showLabel !== false);

  // Nom de la barre : sans lui, un lecteur d'écran annonce « barre de
  // progression, 40 % » sans dire de quoi (8 barres sur 8 sans nom sur
  // /learning-paths, audit du 23/09).
  const nameProps: React.AriaAttributes = ariaLabel || ariaLabelledBy
    ? { 'aria-label': ariaLabel, 'aria-labelledby': ariaLabelledBy }
    : label
      ? { 'aria-labelledby': labelId }
      : { 'aria-label': 'Progression' };

  const pctRounded = Math.round(pct);
  // Espace insécable avant « % » : la typographie française, et une valeur que
  // le lecteur d'écran lit « 40 pour cent » plutôt que « 40 ».
  const valueText =
    typeof valueLabel === 'string' || typeof valueLabel === 'number'
      ? String(valueLabel)
      : `${pctRounded}\u00a0%`;

  const progressProps = {
    role: 'progressbar',
    ...nameProps,
    'aria-valuenow': pctRounded,
    'aria-valuemin': 0,
    'aria-valuemax': 100,
    'aria-valuetext': valueText,
  } as const;

  const trackClasses = [TRACK_BASE, TRACK_SIZE_CLASSES[size]].join(' ');
  const fillClasses = [FILL_BASE, FILL_VARIANT_CLASSES[resolvedFill]].join(' ');

  if (layout === 'inline') {
    return (
      <div
        className={`inline-flex items-center gap-stack-xs w-full ${className}`}
        {...rest}
      >
        {label && (
          <span id={labelId} className="text-caption text-ink-600 font-medium whitespace-nowrap">{label}</span>
        )}
        <div
          className={`${trackClasses} flex-1 min-w-20 shadow-inner`}
          {...progressProps}
        >
          <div className={fillClasses} style={{ width: `${pct}%` }} />
        </div>
        {showValueLabel && (
          <span
            className={`font-display text-caption font-bold tabular-nums min-w-10 text-right ${VALUE_TONE_CLASSES[resolvedFill]}`}
          >
            {valueLabel ?? `${Math.round(pct)}%`}
          </span>
        )}
      </div>
    );
  }

  return (
    <div className={`flex flex-col gap-stack-xs ${className}`} {...rest}>
      {(label || showValueLabel) && (
        <div className="flex justify-between items-center text-caption">
          {label && (
            <span id={labelId} className="text-ink-600 font-semibold uppercase tracking-[0.04em] text-micro">
              {label}
            </span>
          )}
          {showValueLabel && (
            <span
              className={`font-display font-bold tabular-nums text-caption ${VALUE_TONE_CLASSES[resolvedFill]}`}
            >
              {valueLabel ?? `${Math.round(pct)}%`}
            </span>
          )}
        </div>
      )}
      <div
        className={`${trackClasses} shadow-inner`}
        {...progressProps}
      >
        <div className={fillClasses} style={{ width: `${pct}%` }} />
      </div>
    </div>
  );
};

export default ProgressBar;
