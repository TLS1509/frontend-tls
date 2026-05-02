import React from 'react';
import './SectionTitle.css';

interface SectionTitleProps {
  title: string;
  subtitle?: string;
  icon?: React.ReactNode;
  action?: React.ReactNode;
  divider?: boolean;
  className?: string;
}

export const SectionTitle: React.FC<SectionTitleProps> = ({
  title,
  subtitle,
  icon,
  action,
  divider = false,
  className = '',
}) => {
  const classes = [
    'tls-section-title',
    divider ? 'tls-section-title--divider' : '',
    className,
  ].filter(Boolean).join(' ');

  return (
    <div className={classes}>
      <div className="tls-section-title__row">
        <div className="tls-section-title__left">
          {icon && <span className="tls-section-title__icon" aria-hidden="true">{icon}</span>}
          <div className="tls-section-title__text">
            <h2 className="tls-section-title__heading">{title}</h2>
            {subtitle && <p className="tls-section-title__subtitle">{subtitle}</p>}
          </div>
        </div>
        {action && <div className="tls-section-title__action">{action}</div>}
      </div>
    </div>
  );
};

export default SectionTitle;
