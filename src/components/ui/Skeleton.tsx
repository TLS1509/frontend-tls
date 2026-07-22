import React from 'react';

/**
 * Skeleton — Valeurs : src/index.css (@theme) et src/styles/design-tokens.css.
 * Règles d'usage : docs/_canon/REGLES-USAGE-COMPOSANTS.md
 * (design-system/spec.json supprimé le 2026-07-22 : jamais importé, périmé.)
 *
 * Placeholder shimmer matching the shape of expected content.
 * Variants: text / title / block / circle / card / button.
 * Use when 1–3s load; for ≤1s use a spinner, ≥3s add a message.
 */

export type SkeletonVariant = 'text' | 'title' | 'block' | 'circle' | 'card' | 'button';

export interface SkeletonProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: SkeletonVariant;
  width?: number | string;
  height?: number | string;
}

const BASE =
  'block bg-gradient-to-r from-ink-50 via-ink-100 to-ink-50 bg-[length:200%_100%] animate-skeleton-shimmer';

const VARIANT_CLASSES: Record<SkeletonVariant, string> = {
  text:   'h-3.5 rounded-pill',
  title:  'h-6 w-3/5 rounded-sm',
  block:  'h-30 rounded-lg',
  circle: 'rounded-full aspect-square',
  card:   'h-40 rounded-lg',
  button: 'h-10 w-24 rounded-pill',
};

export const Skeleton: React.FC<SkeletonProps> = ({
  variant = 'text',
  width,
  height,
  className = '',
  style,
  ...rest
}) => {
  const classes = [BASE, VARIANT_CLASSES[variant], className].filter(Boolean).join(' ');

  const inlineStyle: React.CSSProperties = {
    ...style,
    ...(width !== undefined ? { width } : {}),
    ...(height !== undefined ? { height } : {}),
  };

  return (
    <span className={classes} style={inlineStyle} aria-hidden="true" {...rest} />
  );
};

export default Skeleton;
