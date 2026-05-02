import React from 'react';
import './MetaItem.css';

export type MetaItemSize = 'sm' | 'md';
export type MetaItemTone = 'muted' | 'brand' | 'warm';

interface MetaItemProps {
  label: string;
  value: React.ReactNode;
  icon?: React.ReactNode;
  size?: MetaItemSize;
  tone?: MetaItemTone;
  className?: string;
}

export const MetaItem: React.FC<MetaItemProps> = ({
  label,
  value,
  icon,
  size = 'md',
  tone = 'muted',
  className = '',
}) => {
  const classes = [
    'tls-meta-item',
    size !== 'md' && `tls-meta-item--${size}`,
    tone !== 'muted' && `tls-meta-item--${tone}`,
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={classes}>
      <span className="tls-meta-item__label">
        {icon && <span className="tls-meta-item__icon">{icon}</span>}
        {label}
      </span>
      <span className="tls-meta-item__value">{value}</span>
    </div>
  );
};
