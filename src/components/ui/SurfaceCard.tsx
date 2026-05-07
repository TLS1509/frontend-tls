import React from 'react';

export type SurfaceCardVariant = 'default' | 'elevated' | 'glass' | 'bordered' | 'muted' | 'sunken';

interface SurfaceCardProps {
  children: React.ReactNode;
  variant?: SurfaceCardVariant;
  className?: string;
}

const BASE = 'p-6 rounded-lg transition-all duration-200';

const VARIANT_CLASSES: Record<SurfaceCardVariant, string> = {
  default:  'bg-white border border-ink-200 shadow-sm',
  elevated: 'bg-white shadow-md hover:shadow-lg',
  glass:    'bg-white/55 backdrop-blur-[20px] backdrop-saturate-[180%] backdrop-brightness-110 border border-white/60 shadow-md',
  bordered: 'bg-white border-2 border-primary-200 shadow-xs hover:border-primary-400 hover:shadow-sm',
  muted:    'bg-ink-50 border border-ink-200',
  sunken:   'bg-ink-100 border border-ink-200',
};

export const SurfaceCard: React.FC<SurfaceCardProps> = ({
  children,
  variant = 'default',
  className = '',
}) => {
  const classes = [BASE, VARIANT_CLASSES[variant], className].filter(Boolean).join(' ');
  return <div className={classes}>{children}</div>;
};

export default SurfaceCard;
