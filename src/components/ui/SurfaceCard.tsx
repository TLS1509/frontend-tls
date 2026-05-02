import React from 'react';
import './SurfaceCard.css';

export type SurfaceCardVariant = 'default' | 'elevated' | 'glass' | 'bordered' | 'muted' | 'sunken';

interface SurfaceCardProps {
  children: React.ReactNode;
  variant?: SurfaceCardVariant;
  className?: string;
}

export const SurfaceCard: React.FC<SurfaceCardProps> = ({
  children,
  variant = 'default',
  className = '',
}) => {
  const classes = ['tls-surface-card', `tls-surface-card--${variant}`, className]
    .filter(Boolean)
    .join(' ');

  return <div className={classes}>{children}</div>;
};

export default SurfaceCard;
