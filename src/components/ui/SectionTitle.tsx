import React from 'react';
import './SectionTitle.css';

interface SectionTitleProps {
  title: string;
  subtitle?: string;
  className?: string;
}

export const SectionTitle: React.FC<SectionTitleProps> = ({
  title,
  subtitle,
  className = '',
}) => {
  const classes = ['tls-section-title', className].filter(Boolean).join(' ');

  return (
    <div className={classes}>
      <h2 className="tls-section-title__heading">{title}</h2>
      {subtitle && <p className="tls-section-title__subtitle">{subtitle}</p>}
    </div>
  );
};
