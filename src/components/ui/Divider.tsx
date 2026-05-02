import React from 'react';
import './Divider.css';

/**
 * Divider — horizontal or vertical separator
 *
 * Renders a thin line using design tokens. Supports an optional
 * centered label for section breaks.
 */

export interface DividerProps {
  /** Orientation of the divider */
  orientation?: 'horizontal' | 'vertical';
  /** Optional label displayed in the center */
  label?: string;
  /** Vertical spacing around a horizontal divider (or inline spacing for vertical) */
  spacing?: 'sm' | 'md' | 'lg';
  className?: string;
}

export const Divider: React.FC<DividerProps> = ({
  orientation = 'horizontal',
  label,
  spacing = 'md',
  className = '',
}) => {
  if (orientation === 'vertical') {
    return (
      <div
        role="separator"
        aria-orientation="vertical"
        className={['divider divider--vertical', `divider--${spacing}`, className]
          .filter(Boolean)
          .join(' ')}
      />
    );
  }

  if (label) {
    return (
      <div
        role="separator"
        className={['divider divider--labeled', `divider--${spacing}`, className]
          .filter(Boolean)
          .join(' ')}
      >
        <div className="divider__line" aria-hidden="true" />
        <span className="divider__label">{label}</span>
        <div className="divider__line" aria-hidden="true" />
      </div>
    );
  }

  return (
    <hr
      role="separator"
      className={['divider', `divider--${spacing}`, className]
        .filter(Boolean)
        .join(' ')}
    />
  );
};

export default Divider;
