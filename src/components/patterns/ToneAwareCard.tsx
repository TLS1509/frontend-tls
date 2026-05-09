import React from 'react';
import { Card } from '../core/Card';
import type { CardTone } from '../core/Card';

/**
 * ToneAwareCard — DEPRECATED thin alias of Card.
 *
 * Kept for backward compatibility. New code should use Card directly:
 *   <Card variant="tinted" tone="primary">…</Card>
 *
 * Maps:
 *   tone='primary'/'warm'/'sun' → forwarded as-is
 *   applyBackground=false       → variant='default' (no gradient bg)
 *   applyBackground=true        → variant='tinted'
 *   borderRadius / padding      → forwarded via inline style (runtime values)
 *   onClick                     → forwarded
 */

export type Tone = 'primary' | 'warm' | 'sun';

export interface ToneAwareCardProps {
  children: React.ReactNode;
  tone: Tone;
  /** Apply gradient background + border (default: true). */
  applyBackground?: boolean;
  borderRadius?: string;
  padding?: string;
  className?: string;
  style?: React.CSSProperties;
  onClick?: () => void;
}

const TONE_MAP: Record<Tone, CardTone> = {
  primary: 'primary',
  warm:    'warm',
  sun:     'sun',
};

export const ToneAwareCard: React.FC<ToneAwareCardProps> = ({
  children,
  tone,
  applyBackground = true,
  borderRadius,
  padding,
  className = '',
  style,
  onClick,
}) => {
  const wrapperStyle: React.CSSProperties = {
    ...(borderRadius ? { borderRadius } : {}),
    ...(padding ? { padding } : {}),
    ...style,
  };

  return (
    <Card
      variant={applyBackground ? 'tinted' : 'default'}
      tone={TONE_MAP[tone]}
      className={[`tone-card--${tone}`, className].filter(Boolean).join(' ')}
      style={wrapperStyle}
      onClick={onClick}
    >
      {children}
    </Card>
  );
};

export default ToneAwareCard;
