import React from 'react';
import './Spinner.css';

/**
 * Spinner — loading indicator
 *
 * A circular CSS spinner using the border technique.
 * Sizes: sm (16px) | md (24px) | lg (40px)
 * Tones: brand | warm | muted
 */

export interface SpinnerProps {
  /** Visual size of the spinner */
  size?: 'sm' | 'md' | 'lg';
  /** Color tone */
  tone?: 'brand' | 'warm' | 'muted';
  /** Accessible label (screen readers) */
  label?: string;
  className?: string;
}

export const Spinner: React.FC<SpinnerProps> = ({
  size = 'md',
  tone = 'brand',
  label = 'Chargement…',
  className = '',
}) => {
  const classes = [
    'spinner',
    `spinner--${size}`,
    `spinner--${tone}`,
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <span className={classes} role="status" aria-label={label}>
      <span className="spinner__ring" aria-hidden="true" />
      <span className="spinner__label">{label}</span>
    </span>
  );
};

export default Spinner;
