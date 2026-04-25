import React from 'react';
import './MetaItem.css';

interface MetaItemProps {
  label: string;
  value: React.ReactNode;
  className?: string;
}

export const MetaItem: React.FC<MetaItemProps> = ({
  label,
  value,
  className = '',
}) => {
  const classes = ['tls-meta-item', className].filter(Boolean).join(' ');

  return (
    <div className={classes}>
      <span className="tls-meta-item__label">{label}</span>
      <span className="tls-meta-item__value">{value}</span>
    </div>
  );
};
