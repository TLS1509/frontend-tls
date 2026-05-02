import React from 'react';
import './Tag.css';

/**
 * Tag — Source of truth: design-system/spec.json → components.Tag
 *
 * Category or active filter pill. Neutral by default, removable for
 * active filters. Supports tone variants: neutral (default), primary,
 * warm, sun.
 */

export type TagTone = 'neutral' | 'primary' | 'warm' | 'sun';

export interface TagProps extends React.HTMLAttributes<HTMLSpanElement> {
  /** When provided, renders a close button and fires on click */
  onRemove?: () => void;
  leadingIcon?: React.ReactNode;
  tone?: TagTone;
}

export const Tag: React.FC<TagProps> = ({
  onRemove,
  leadingIcon,
  tone = 'neutral',
  className = '',
  children,
  ...rest
}) => {
  const classes = [
    'tag',
    tone !== 'neutral' && `tag--${tone}`,
    onRemove && 'tag--removable',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <span className={classes} {...rest}>
      {leadingIcon && <span className="tag__icon">{leadingIcon}</span>}
      <span>{children}</span>
      {onRemove && (
        <button
          type="button"
          className="tag__close"
          aria-label="Retirer"
          onClick={(e) => {
            e.stopPropagation();
            onRemove();
          }}
        >
          <svg width="10" height="10" viewBox="0 0 10 10" fill="none" aria-hidden="true">
            <path d="M2 2l6 6M8 2l-6 6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/>
          </svg>
        </button>
      )}
    </span>
  );
};

export default Tag;
