import React from 'react';

export interface SpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  tone?: 'brand' | 'warm' | 'muted';
  label?: string;
  className?: string;
}

const SIZE_CLASSES: Record<'sm' | 'md' | 'lg', string> = {
  sm: 'w-5 h-5 border-2',
  md: 'w-8 h-8 border-[2.5px]',
  lg: 'w-12 h-12 border-[3px]',
};

const TONE_CLASSES: Record<'brand' | 'warm' | 'muted', string> = {
  brand: 'border-t-primary-600 border-r-primary-200',
  warm:  'border-t-secondary-500 border-r-secondary-100',
  muted: 'border-t-ink-500 border-r-ink-200',
};

export const Spinner: React.FC<SpinnerProps> = ({
  size = 'md',
  tone = 'brand',
  label = 'Chargement…',
  className = '',
}) => {
  const classes = [
    'inline-flex items-center justify-center shrink-0',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  const ringClasses = [
    'rounded-full border-solid border-transparent shrink-0 animate-spin',
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
