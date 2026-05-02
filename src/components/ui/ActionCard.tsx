import React from 'react';
import './ActionCard.css';

export type ActionCardTone = 'brand' | 'warm' | 'sun';

interface ActionCardProps {
  icon?: React.ReactNode;
  title: string;
  description?: string;
  action?: React.ReactNode;
  tone?: ActionCardTone;
  className?: string;
}

export const ActionCard: React.FC<ActionCardProps> = ({
  icon,
  title,
  description,
  action,
  tone = 'brand',
  className = '',
}) => {
  const classes = ['tls-action-card', `tls-action-card--${tone}`, className]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={classes}>
      {icon && <div className="tls-action-card__icon">{icon}</div>}
      <div className="tls-action-card__content">
        <h3 className="tls-action-card__title">{title}</h3>
        {description && <p className="tls-action-card__description">{description}</p>}
      </div>
      {action && <div className="tls-action-card__action">{action}</div>}
    </div>
  );
};
