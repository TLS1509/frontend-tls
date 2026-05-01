import React from 'react';
import type { CardTone, CardBadgeConfig } from '../core/Card';

export type ResourceCardVariant = 'default' | 'minimal' | 'with-badge';
export type ResourceCardIconSize = 'sm' | 'md' | 'lg';

export interface ResourceCardProps {
  icon?: React.ReactNode;
  iconSize?: ResourceCardIconSize;
  resourceType?: string;
  title: string;
  description?: string;
  duration?: string;
  category?: string;
  tone?: CardTone;
  badge?: CardBadgeConfig;
  cta?: {
    label: string;
    onClick: () => void;
  };
  href?: string;
  variant?: ResourceCardVariant;
  className?: string;
}

export const ResourceCard: React.FC<ResourceCardProps> = ({
  icon,
  iconSize = 'md',
  resourceType,
  title,
  description,
  duration,
  category,
  tone = 'primary',
  badge,
  cta,
  href,
  variant = 'default',
  className = '',
}) => {
  const classes = [
    'tls-resource-card',
    `tls-resource-card--${variant}`,
    tone && `tls-resource-card--tone-${tone}`,
    `tls-resource-card__icon--${iconSize}`,
    badge && 'tls-resource-card--with-badge',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  const content = (
    <>
      {badge && (
        <span className={`tls-resource-card__badge tls-resource-card__badge--${badge.variant} tls-resource-card__badge--${badge.position || 'top-right'}`}>
          {badge.label}
        </span>
      )}

      <div className="tls-resource-card__header">
        {icon && <div className="tls-resource-card__icon">{icon}</div>}
        {resourceType && <span className="tls-resource-card__type">{resourceType}</span>}
      </div>

      {variant !== 'minimal' && (
        <div className="tls-resource-card__content">
          <h3 className="tls-resource-card__title">{title}</h3>
          {description && <p className="tls-resource-card__description">{description}</p>}
        </div>
      )}

      {variant === 'minimal' && (
        <div className="tls-resource-card__content">
          <h3 className="tls-resource-card__title">{title}</h3>
        </div>
      )}

      {(duration || category || cta) && (
        <footer className="tls-resource-card__footer">
          <div className="tls-resource-card__meta">
            {category && <span className="tls-resource-card__category">{category}</span>}
            {duration && (
              <span className="tls-resource-card__duration">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10" />
                  <polyline points="12 6 12 12 16 14" />
                </svg>
                {duration}
              </span>
            )}
          </div>
          {cta && (
            <button type="button" className="tls-resource-card__cta" onClick={cta.onClick}>
              <span>{cta.label}</span>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </button>
          )}
        </footer>
      )}
    </>
  );

  if (href) {
    return <a className={classes} href={href}>{content}</a>;
  }

  return <div className={classes}>{content}</div>;
};

export default ResourceCard;
