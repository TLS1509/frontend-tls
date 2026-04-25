import React from 'react';
import './SurfaceCard.css';

interface SurfaceCardProps {
  children: React.ReactNode;
  variant?: 'muted' | 'sunken';
  className?: string;
}

export const SurfaceCard: React.FC<SurfaceCardProps> = ({
  children,
  variant = 'muted',
  className = '',
}) => {
  const classes = ['tls-surface-card', `tls-surface-card--${variant}`, className]
    .filter(Boolean)
    .join(' ');

  return <div className={classes}>{children}</div>;
};
