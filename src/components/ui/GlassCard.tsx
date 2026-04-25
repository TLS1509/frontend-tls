import React from 'react';
import './GlassCard.css';

interface GlassCardProps {
  children: React.ReactNode;
  variant?: 'light' | 'brand';
  className?: string;
}

export const GlassCard: React.FC<GlassCardProps> = ({
  children,
  variant = 'light',
  className = '',
}) => {
  const classes = ['tls-glass-card', `tls-glass-card--${variant}`, className]
    .filter(Boolean)
    .join(' ');

  return <div className={classes}>{children}</div>;
};
