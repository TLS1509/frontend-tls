/**
 * DashboardHero Pattern
 *
 * Composite pattern for hero sections on dashboard-type pages
 * Wraps heading, description, and CTA with glassmorphic styling
 *
 * Reusable in:
 * - Dashboard main hero
 * - Section landing pages
 * - Feature introductions
 */

import React from 'react';
import type { CardTone } from '../core/Card';

export interface DashboardHeroProps {
  /** Main title/heading */
  title: string;

  /** Subtitle or short description */
  subtitle?: string;

  /** Longer description text */
  description?: string;

  /** Array of highlighted stats/metrics */
  stats?: Array<{
    label: string;
    value: string | number;
    icon?: React.ReactNode;
    accent?: 'primary' | 'warm' | 'sun';
  }>;

  /** Primary CTA button */
  primaryCta?: {
    label: string;
    onClick: () => void;
    icon?: React.ReactNode;
  };

  /** Secondary CTA button (optional) */
  secondaryCta?: {
    label: string;
    onClick: () => void;
  };

  /** Tone/color variant */
  tone?: CardTone;

  /** Background image or gradient decoration */
  backgroundImage?: string;

  /** Whether to show decorative gradient glow */
  showGlow?: boolean;

  /** Custom className */
  className?: string;
}

export const DashboardHero: React.FC<DashboardHeroProps> = ({
  title,
  subtitle,
  description,
  stats = [],
  primaryCta,
  secondaryCta,
  tone = 'primary',
  backgroundImage,
  showGlow = true,
  className = '',
}) => {
  return (
    <section
      className={`dashboard-hero dashboard-hero--tone-${tone} ${showGlow ? 'dashboard-hero--with-glow' : ''} ${className}`}
      style={
        backgroundImage
          ? {
              backgroundImage: `url(${backgroundImage})`,
            }
          : undefined
      }
    >
      {/* Decorative glow background */}
      {showGlow && <div className="dashboard-hero__glow" />}

      {/* Content container */}
      <div className="dashboard-hero__content">
        {/* Heading section */}
        <header className="dashboard-hero__header">
          {subtitle && <p className="dashboard-hero__subtitle">{subtitle}</p>}
          <h1 className="dashboard-hero__title">{title}</h1>
          {description && <p className="dashboard-hero__description">{description}</p>}
        </header>

        {/* Stats row */}
        {stats.length > 0 && (
          <div className="dashboard-hero__stats">
            {stats.map((stat, idx) => (
              <div
                key={idx}
                className={`dashboard-hero__stat dashboard-hero__stat--${stat.accent || 'primary'}`}
              >
                {stat.icon && <span className="dashboard-hero__stat-icon">{stat.icon}</span>}
                <div className="dashboard-hero__stat-content">
                  <p className="dashboard-hero__stat-value">{stat.value}</p>
                  <p className="dashboard-hero__stat-label">{stat.label}</p>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* CTA buttons */}
        {(primaryCta || secondaryCta) && (
          <div className="dashboard-hero__ctas">
            {primaryCta && (
              <button
                type="button"
                className="dashboard-hero__cta dashboard-hero__cta--primary"
                onClick={primaryCta.onClick}
              >
                {primaryCta.icon && <span className="dashboard-hero__cta-icon">{primaryCta.icon}</span>}
                <span>{primaryCta.label}</span>
              </button>
            )}
            {secondaryCta && (
              <button
                type="button"
                className="dashboard-hero__cta dashboard-hero__cta--secondary"
                onClick={secondaryCta.onClick}
              >
                <span>{secondaryCta.label}</span>
              </button>
            )}
          </div>
        )}
      </div>
    </section>
  );
};

export default DashboardHero;
