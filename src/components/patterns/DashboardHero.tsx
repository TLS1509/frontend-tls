import React from 'react';
import { HeroSection } from './HeroSection';
import type { HeroTone } from './HeroSection';

/**
 * DashboardHero — DEPRECATED thin alias of HeroSection.
 *
 * Kept for backward compatibility. New code should use:
 *   <HeroSection variant="gradient" tone="primary" eyebrow="..." kpis={...} actions={...} />
 *
 * Maps:
 *   subtitle    → eyebrow
 *   stats       → kpis (with accent dropped — KPI styling is uniform)
 *   primaryCta  → first <button> in actions slot
 *   secondaryCta→ second <button> in actions slot
 *   tone='brand' → tone='primary' (HeroSection has no `brand` tone)
 */

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
  tone?: 'primary' | 'brand' | 'warm' | 'sun';
  /** @deprecated No-op — backgrounds are now controlled via HeroSection variants. */
  backgroundImage?: string;
  /** @deprecated No-op — gradient variant always renders the radial glow. */
  showGlow?: boolean;
  className?: string;
}

const TONE_MAP: Record<NonNullable<DashboardHeroProps['tone']>, HeroTone> = {
  primary: 'primary',
  brand:   'primary',
  warm:    'warm',
  sun:     'sun',
};

const PRIMARY_CTA_CLASSES =
  'inline-flex items-center gap-2 px-7 py-3.5 rounded-pill bg-white text-ink-900 font-semibold cursor-pointer transition-all duration-200 ' +
  'hover:-translate-y-0.5 hover:shadow-[0_12px_32px_rgba(0,0,0,0.18)] active:translate-y-0 ' +
  'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white';

const SECONDARY_CTA_CLASSES =
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
  className = '',
}) => {
  const heroTone = TONE_MAP[tone];

  const actions = (primaryCta || secondaryCta) ? (
    <>
      {primaryCta && (
        <button type="button" className={PRIMARY_CTA_CLASSES} onClick={primaryCta.onClick}>
          {primaryCta.icon && <span className="inline-flex items-center">{primaryCta.icon}</span>}
          <span>{primaryCta.label}</span>
        </button>
      )}
      {secondaryCta && (
        <button type="button" className={SECONDARY_CTA_CLASSES} onClick={secondaryCta.onClick}>
          <span>{secondaryCta.label}</span>
        </button>
      )}
    </>
  ) : undefined;

  return (
    <HeroSection
      variant="gradient"
      tone={heroTone}
      size="lg"
      eyebrow={subtitle}
      title={title}
      description={description}
      kpis={stats.map((s) => ({ icon: s.icon, value: s.value, label: s.label }))}
      actions={actions}
      className={className}
    />
  );
};

export default DashboardHero;
