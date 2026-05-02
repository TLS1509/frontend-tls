import React from 'react';
import './IconFeatureCard.css';

export type IconFeatureCardTone = 'brand' | 'warm' | 'sun';

interface IconFeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  tone?: IconFeatureCardTone;
  className?: string;
}

export const IconFeatureCard: React.FC<IconFeatureCardProps> = ({
  icon,
  title,
  description,
  tone = 'brand',
  className = '',
}) => {
  const classes = [
    'tls-icon-feature-card',
    `tls-icon-feature-card--${tone}`,
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={classes}>
      <div className="tls-icon-feature-card__icon">{icon}</div>
      <h3 className="tls-icon-feature-card__title">{title}</h3>
      <p className="tls-icon-feature-card__description">{description}</p>
    </div>
  );
};
