import React from 'react';
import './MetaPill.css';

export type MetaPillTone = 'default' | 'primary' | 'warm' | 'sun' | 'brand';
export type MetaPillSize = 'sm' | 'md' | 'lg';

export interface MetaPillProps {
  text: string;
  icon?: React.ReactNode;
  tone?: MetaPillTone;
  size?: MetaPillSize;
  onClick?: () => void;
  className?: string;
}

export const MetaPill: React.FC<MetaPillProps> = ({
  text,
  icon,
  tone = 'default',
  size = 'md',
  onClick,
  className = '',
}) => {
  const classes = [
    'tls-meta-pill',
    tone !== 'default' && `tls-meta-pill--${tone}`,
    size !== 'md' && `tls-meta-pill--${size}`,
    onClick && 'tls-meta-pill--clickable',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <span className={classes} onClick={onClick} role={onClick ? 'button' : undefined} tabIndex={onClick ? 0 : undefined}>
      {icon && <span className="tls-meta-pill__icon">{icon}</span>}
      {text}
    </span>
  );
};
