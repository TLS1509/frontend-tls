import React from 'react';
import type { CardTone } from '../core/Card';

export interface DashboardHeroProps {
  title: string;
  subtitle?: string;
  description?: string;
  stats?: Array<{
    label: string;
    value: string | number;
    icon?: React.ReactNode;
    accent?: 'primary' | 'warm' | 'sun';
  }>;
  primaryCta?: {
    label: string;
    onClick: () => void;
    icon?: React.ReactNode;
  };
  secondaryCta?: {
    label: string;
    onClick: () => void;
  };
  tone?: CardTone;
  backgroundImage?: string;
  showGlow?: boolean;
  className?: string;
}

const TONE_HERO: Record<string, string> = {
  primary: 'bg-gradient-to-br from-primary-500 to-primary-700 text-white',
  brand:   'bg-gradient-to-br from-primary-600 to-primary-800 text-white',
  warm:    'bg-gradient-to-br from-secondary-500 to-secondary-700 text-white',
  sun:     'bg-gradient-to-br from-accent-400 to-accent-600 text-accent-900',
  default: 'bg-gradient-to-br from-primary-500 to-primary-700 text-white',
};

const STAT_ACCENT: Record<'primary' | 'warm' | 'sun', string> = {
  primary: 'bg-white/15 text-white',
  warm:    'bg-secondary-500/30 text-white',
  sun:     'bg-accent-400/30 text-white',
};

const CTA_PRIMARY =
  'inline-flex items-center gap-2 px-6 py-3 rounded-pill bg-white text-ink-900 font-semibold cursor-pointer transition-all hover:-translate-y-0.5 hover:shadow-lg focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white';

const CTA_SECONDARY =
  'inline-flex items-center gap-2 px-6 py-3 rounded-pill bg-white/15 text-white border border-white/30 font-semibold cursor-pointer transition-all hover:bg-white/25 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white';

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
      className={[
        'relative overflow-hidden rounded-2xl p-10',
        TONE_HERO[tone] ?? TONE_HERO.default,
        className,
      ]
        .filter(Boolean)
        .join(' ')}
      style={backgroundImage ? { backgroundImage: `url(${backgroundImage})` } : undefined}
    >
      {showGlow && (
        <div
          aria-hidden="true"
          className="absolute -top-1/3 -right-[10%] w-[60%] aspect-square rounded-full bg-[radial-gradient(circle,rgba(255,255,255,0.18)_0%,transparent_70%)] pointer-events-none"
        />
      )}

      <div className="relative z-10 flex flex-col gap-6">
        <header className="flex flex-col gap-2">
          {subtitle && (
            <p className="m-0 text-caption font-semibold uppercase tracking-wider opacity-80">
              {subtitle}
            </p>
          )}
          <h1 className="m-0 font-display text-h1 font-bold leading-tight tracking-tight">
            {title}
          </h1>
          {description && (
            <p className="m-0 text-body-lg opacity-90 max-w-[640px] leading-relaxed">
              {description}
            </p>
          )}
        </header>

        {stats.length > 0 && (
          <div className="grid gap-4 grid-cols-[repeat(auto-fit,minmax(180px,1fr))]">
            {stats.map((stat, idx) => (
              <div
                key={idx}
                className={[
                  'flex items-center gap-3 p-4 rounded-xl backdrop-blur-sm',
                  STAT_ACCENT[stat.accent || 'primary'],
                ].join(' ')}
              >
                {stat.icon && (
                  <span className="inline-flex items-center shrink-0">{stat.icon}</span>
                )}
                <div>
                  <p className="m-0 font-display text-h3 font-bold leading-none">{stat.value}</p>
                  <p className="m-0 mt-1 text-caption opacity-80">{stat.label}</p>
                </div>
              </div>
            ))}
          </div>
        )}

        {(primaryCta || secondaryCta) && (
          <div className="flex flex-wrap gap-3">
            {primaryCta && (
              <button type="button" className={CTA_PRIMARY} onClick={primaryCta.onClick}>
                {primaryCta.icon && <span className="inline-flex items-center">{primaryCta.icon}</span>}
                <span>{primaryCta.label}</span>
              </button>
            )}
            {secondaryCta && (
              <button type="button" className={CTA_SECONDARY} onClick={secondaryCta.onClick}>
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
