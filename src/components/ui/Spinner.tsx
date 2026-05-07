import React from 'react';

export type SpinnerSize = 'sm' | 'md' | 'lg';
export type SpinnerTone = 'brand' | 'warm' | 'sun' | 'muted' | 'inverse';

export interface SpinnerProps {
  size?: SpinnerSize;
  tone?: SpinnerTone;
  label?: string;
  className?: string;
}

const SIZE_CLASSES: Record<SpinnerSize, string> = {
  sm: 'w-5 h-5 border-2',
  md: 'w-8 h-8 border-[2.5px]',
  lg: 'w-12 h-12 border-[3px]',
};

const TONE_CLASSES: Record<SpinnerTone, string> = {
  brand:   'border-primary-100 border-t-primary-600',
  warm:    'border-secondary-100 border-t-secondary-600',
  sun:     'border-accent-100 border-t-accent-500',
  muted:   'border-ink-100 border-t-ink-500',
  inverse: 'border-white/30 border-t-white',
};

export const Spinner: React.FC<SpinnerProps> = ({
  size = 'md',
  tone = 'brand',
  label = 'Chargement…',
  className = '',
}) => {
  const classes = ['inline-flex items-center justify-center shrink-0', className]
    .filter(Boolean)
    .join(' ');

  const ringClasses = [
    'rounded-full border-solid shrink-0 animate-spin',
    SIZE_CLASSES[size],
    TONE_CLASSES[tone],
  ].join(' ');

  return (
    <span className={classes} role="status" aria-label={label}>
      <span className={ringClasses} aria-hidden="true" />
      <span className="sr-only">{label}</span>
    </span>
  );
};

export default Spinner;
