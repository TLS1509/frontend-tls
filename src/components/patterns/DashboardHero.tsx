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
  primary: 'bg-gradient-to-br from-primary-600 via-primary-500 to-secondary-500 text-white',
  brand:   'bg-gradient-to-br from-primary-700 via-primary-600 to-primary-800 text-white',
  warm:    'bg-gradient-to-br from-secondary-600 via-secondary-500 to-accent-400 text-white',
  sun:     'bg-gradient-to-br from-accent-300 via-accent-400 to-secondary-500 text-accent-950',
  default: 'bg-gradient-to-br from-primary-600 via-primary-500 to-secondary-500 text-white',
};

const STAT_ACCENT: Record<'primary' | 'warm' | 'sun', string> = {
  primary: 'bg-white/12 hover:bg-white/18 border-white/15',
  warm:    'bg-white/12 hover:bg-white/18 border-white/15',
  sun:     'bg-white/15 hover:bg-white/22 border-white/20',
};

const CTA_PRIMARY =
  'inline-flex items-center gap-2 px-7 py-3.5 rounded-pill bg-white text-ink-900 font-semibold cursor-pointer transition-all duration-200 ' +
  'hover:-translate-y-0.5 hover:shadow-[0_12px_32px_rgba(0,0,0,0.18)] active:translate-y-0 ' +
  'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white';

const CTA_SECONDARY =
  'inline-flex items-center gap-2 px-7 py-3.5 rounded-pill bg-white/10 text-white border border-white/30 font-semibold cursor-pointer transition-all duration-200 ' +
  'hover:bg-white/20 hover:border-white/50 hover:-translate-y-0.5 backdrop-blur-sm ' +
  'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white';

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
        'relative isolate overflow-hidden rounded-3xl px-10 py-12 shadow-xl',
        TONE_HERO[tone] ?? TONE_HERO.default,
        className,
      ]
        .filter(Boolean)
        .join(' ')}
      style={backgroundImage ? { backgroundImage: `url(${backgroundImage})` } : undefined}
    >
      {showGlow && (
        <>
          <div
            aria-hidden="true"
            className="absolute -top-1/3 -right-[15%] w-[70%] aspect-square rounded-full bg-[radial-gradient(circle,rgba(255,255,255,0.25)_0%,transparent_60%)] pointer-events-none"
          />
          <div
            aria-hidden="true"
            className="absolute -bottom-1/3 -left-[10%] w-[55%] aspect-square rounded-full bg-[radial-gradient(circle,rgba(255,255,255,0.15)_0%,transparent_65%)] pointer-events-none"
          />
        </>
      )}

      <div className="relative z-10 flex flex-col gap-7">
        <header className="flex flex-col gap-3 max-w-[760px]">
          {subtitle && (
            <p className="m-0 inline-flex items-center gap-1.5 text-caption font-bold uppercase tracking-[0.12em] opacity-85 self-start px-3 py-1 rounded-pill bg-white/15 backdrop-blur-sm w-fit">
              {subtitle}
            </p>
          )}
          <h1 className="m-0 font-display text-[clamp(2rem,4vw,3.25rem)] font-extrabold leading-[1.05] tracking-tight">
            {title}
          </h1>
          {description && (
            <p className="m-0 text-body-lg opacity-90 max-w-[640px] leading-relaxed">
              {description}
            </p>
          )}
        </header>

        {stats.length > 0 && (
          <div className="grid gap-3 grid-cols-[repeat(auto-fit,minmax(180px,1fr))]">
            {stats.map((stat, idx) => (
              <div
                key={idx}
                className={[
                  'flex items-center gap-3 px-4 py-3.5 rounded-2xl border backdrop-blur-md transition-all duration-200',
                  STAT_ACCENT[stat.accent || 'primary'],
                ].join(' ')}
              >
                {stat.icon && (
                  <span className="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-white/20 shrink-0">
                    {stat.icon}
                  </span>
                )}
                <div className="flex flex-col">
                  <span className="font-display text-h3 font-extrabold leading-none tracking-tight">
                    {stat.value}
                  </span>
                  <span className="text-caption opacity-85 mt-1">{stat.label}</span>
                </div>
              </div>
            ))}
          </div>
        )}

        {(primaryCta || secondaryCta) && (
          <div className="flex flex-wrap gap-3 pt-1">
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
