import React from 'react';
import './MetaPill.css';

interface MetaPillProps {
  text: string;
  icon?: React.ReactNode;
  className?: string;
}

export const MetaPill: React.FC<MetaPillProps> = ({
  text,
  icon,
  className = '',
}) => {
  const classes = ['tls-meta-pill', className].filter(Boolean).join(' ');

  return (
    <span className={classes}>
      {icon && <span className="tls-meta-pill__icon">{icon}</span>}
      {text}
    </span>
  );
};
