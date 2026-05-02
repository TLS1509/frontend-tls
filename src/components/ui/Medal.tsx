import React from 'react';

/**
 * Medal — Source of truth: design-system/spec.json → components.Medal
 *
 * Achievement representation: circle with inset dashed ring.
 * Rank medals: gold (1st), silver (2nd), bronze (3rd).
 * Rule: Warm gradient = unlocked. Brand deep = special/rare. Ink gray = locked.
 */

export type MedalSize = 'sm' | 'md' | 'lg';
export type MedalVariant = 'default' | 'brand' | 'locked' | 'gold' | 'silver' | 'bronze';

export interface MedalProps extends React.HTMLAttributes<HTMLSpanElement> {
  size?: MedalSize;
  variant?: MedalVariant;
  icon?: React.ReactNode;
  /** Accessible label (e.g. name of achievement) */
  label?: string;
}

const DEFAULT_ICON = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <circle cx="12" cy="8" r="6" />
    <polyline points="9 14 7 22 12 19 17 22 15 14" />
  </svg>
);

export const Medal: React.FC<MedalProps> = ({
  size = 'md',
  variant = 'default',
  icon,
  label,
  className = '',
  ...rest
}) => {
  const classes = [
    'medal',
    size !== 'md' && `medal--${size}`,
    variant !== 'default' && `medal--${variant}`,
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <span className={classes} role="img" aria-label={label} {...rest}>
      {icon ?? DEFAULT_ICON}
    </span>
  );
};

export default Medal;
