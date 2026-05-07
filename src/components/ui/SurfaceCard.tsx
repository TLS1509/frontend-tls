import React from 'react';
import { Card, type CardVariant } from '../core/Card';

/**
 * @deprecated Use `<Card variant="..." />` directly.
 *
 * This component is kept as a thin alias for backward-compatibility.
 * Mapping:
 *   default  → Card variant="default"
 *   elevated → Card variant="elevated"
 *   glass    → Card variant="glass"
 *   bordered → Card variant="bordered"
 *   muted    → Card variant="muted"
 *   sunken   → Card variant="sunken"
 */
export type SurfaceCardVariant = 'default' | 'elevated' | 'glass' | 'bordered' | 'muted' | 'sunken';

interface SurfaceCardProps {
  children: React.ReactNode;
  variant?: SurfaceCardVariant;
  className?: string;
}

const VARIANT_MAP: Record<SurfaceCardVariant, CardVariant> = {
  default:  'default',
  elevated: 'elevated',
  glass:    'glass',
  bordered: 'bordered',
  muted:    'muted',
  sunken:   'sunken',
};

export const SurfaceCard: React.FC<SurfaceCardProps> = ({
  children,
  variant = 'default',
  className,
}) => (
  <Card variant={VARIANT_MAP[variant]} className={className}>
    {children}
  </Card>
);

export default SurfaceCard;
