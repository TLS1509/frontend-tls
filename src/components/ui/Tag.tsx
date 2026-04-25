import React from 'react';

/**
 * Tag — Source of truth: design-system/spec.json → components.Tag
 *
 * Category or active filter pill. Neutral by default, removable for
 * active filters.
 */

export interface TagProps extends React.HTMLAttributes<HTMLSpanElement> {
  /** When provided, renders a close button and fires on click */
  onRemove?: () => void;
  leadingIcon?: React.ReactNode;
}

export const Tag: React.FC<TagProps> = ({
  onRemove,
  leadingIcon,
  className = '',
  children,
  ...rest
}) => {
  const classes = ['tag', onRemove && 'tag--removable', className]
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
          ×
        </button>
      )}
    </span>
  );
};

export default Tag;
