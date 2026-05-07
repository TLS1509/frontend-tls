import React from 'react';
import { Card, type CardVariant } from '../core/Card';

/**
 * @deprecated Use `<Card variant="glass" />`, `<Card variant="glass-brand" />`,
 *             `<Card variant="glass-warm" />`, or `<Card variant="glass-dark" />` directly.
 *
 * This component is kept as a thin alias for backward-compatibility and maps
 * its tone to the equivalent Card variant.
 */
export type GlassCardTone = 'default' | 'warm' | 'dark' | 'brand' | 'light';

interface GlassCardProps {
  children: React.ReactNode;
  tone?: GlassCardTone;
  /** @deprecated use tone="brand" instead */
  variant?: 'light' | 'brand';
  className?: string;
}

const TONE_TO_VARIANT: Record<GlassCardTone, CardVariant> = {
  default: 'glass',
  light:   'glass',
  brand:   'glass-brand',
  warm:    'glass-warm',
  dark:    'glass-dark',
};

export const GlassCard: React.FC<GlassCardProps> = ({ children, tone, variant, className }) => {
  const resolvedTone: GlassCardTone = tone ?? (variant === 'brand' ? 'brand' : 'default');
  return (
    <Card variant={TONE_TO_VARIANT[resolvedTone]} className={className}>
      {children}
    </Card>
  );
};

export default GlassCard;
