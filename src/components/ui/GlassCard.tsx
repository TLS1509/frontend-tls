import React from 'react';
import './GlassCard.css';

export type GlassCardTone = 'default' | 'warm' | 'dark' | 'brand' | 'light';

interface GlassCardProps {
  children: React.ReactNode;
  tone?: GlassCardTone;
  /** @deprecated use tone="brand" instead */
  variant?: 'light' | 'brand';
  className?: string;
}

export const GlassCard: React.FC<GlassCardProps> = ({
  children,
  tone,
  variant,
  className = '',
}) => {
  // Support legacy `variant` prop for backward compat
  const resolvedTone: GlassCardTone = tone ?? (variant === 'brand' ? 'brand' : 'default');

  const classes = ['tls-glass-card', `tls-glass-card--${resolvedTone}`, className]
    .filter(Boolean)
    .join(' ');

  return <div className={classes}>{children}</div>;
};
