import React from 'react';

/**
 * Skeleton — Source of truth: design-system/spec.json → components.Skeleton
 *
 * Placeholder shimmer matching the shape of expected content.
 * Variants: text (1 line) / title (wide heading) / block (rect) / circle.
 * Use when 1–3s load; for ≤1s use a spinner, ≥3s add a message.
 */

export type SkeletonVariant = 'text' | 'title' | 'block' | 'circle';

export interface SkeletonProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: SkeletonVariant;
  /** Explicit width override (useful for text lines) */
  width?: number | string;
  /** Explicit height override */
  height?: number | string;
}

export const Skeleton: React.FC<SkeletonProps> = ({
  variant = 'text',
  width,
  height,
  className = '',
  style,
  ...rest
}) => {
  const classes = ['skeleton', `skeleton--${variant}`, className]
    .filter(Boolean)
    .join(' ');

  const inlineStyle: React.CSSProperties = {
    ...style,
    ...(width !== undefined ? { width } : {}),
    ...(height !== undefined ? { height } : {}),
  };

  return (
    <span
      className={classes}
      style={inlineStyle}
      aria-hidden="true"
      {...rest}
    />
  );
};

export default Skeleton;
