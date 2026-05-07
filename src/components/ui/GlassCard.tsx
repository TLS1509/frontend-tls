import React from 'react';

export type GlassCardTone = 'default' | 'warm' | 'dark' | 'brand' | 'light';

interface GlassCardProps {
  children: React.ReactNode;
  tone?: GlassCardTone;
  /** @deprecated use tone="brand" instead */
  variant?: 'light' | 'brand';
  className?: string;
}

const BASE =
  'backdrop-blur-[20px] backdrop-saturate-[180%] rounded-lg p-6 transition-all duration-200 hover:shadow-md';

const TONE_CLASSES: Record<GlassCardTone, string> = {
  default: 'bg-gradient-to-br from-white/70 to-white/35 border border-white/60 shadow-sm',
  light:   'bg-gradient-to-br from-white/70 to-white/35 border border-white/60 shadow-sm',
  brand:   'bg-gradient-to-br from-primary-500/[22%] to-primary-500/[6%] border border-primary-500/25 shadow-sm hover:shadow-brand-sm',
  warm:    'bg-gradient-to-br from-secondary-500/[12%] to-accent-400/5 border border-secondary-500/[15%] shadow-sm hover:shadow-warm-sm',
  dark:    'border border-white/20 shadow-lg hover:shadow-xl text-white/95',
};

const DARK_BG = {
  background: 'radial-gradient(circle at 0% 0%, #55A1B4 0%, #2F5F6A 60%, #1F3E45 100%)',
} as React.CSSProperties;

export const GlassCard: React.FC<GlassCardProps> = ({
  children,
  tone,
  variant,
  className = '',
}) => {
  const resolvedTone: GlassCardTone = tone ?? (variant === 'brand' ? 'brand' : 'default');

  const classes = [BASE, TONE_CLASSES[resolvedTone], className].filter(Boolean).join(' ');

  return (
    <div className={classes} style={resolvedTone === 'dark' ? DARK_BG : undefined}>
      {children}
    </div>
  );
};
