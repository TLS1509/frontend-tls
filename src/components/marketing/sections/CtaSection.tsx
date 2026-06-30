/**
 * CtaSection — Layout router for 2 CTA patterns
 *
 * Props: layout, tone, children content
 * Routes to:
 * - bold-centered : oversized h2 + p centered on gradient (Clarity, Elegant)
 * - card-overlap : white card overlapping gradient section (Momentum, Refined)
 */

import React from 'react';

export type CtaLayout = 'bold-centered' | 'card-overlap';

interface CtaSectionProps {
  layout?: CtaLayout;
  tone?: 'primary' | 'warm' | 'dark';
  children?: React.ReactNode;
}

// ─── Layout: Bold Centered (h2 + p on gradient bg) ───────────────────────
const CtaBoldCentered: React.FC<CtaSectionProps> = ({ tone = 'primary', children }) => {
  const bgClass =
    tone === 'dark'
      ? 'bg-gradient-to-r from-ink-900 via-ink-800 to-ink-900'
      : tone === 'warm'
        ? 'bg-gradient-to-r from-secondary-600 to-secondary-700'
        : 'bg-gradient-to-r from-primary-700 to-primary-800';

  return (
    <section className={`${bgClass} py-section-lg lg:py-page`}>
      <div className="max-w-page mx-auto px-6">
        <div className="flex flex-col items-center text-center gap-stack-lg">
          {children}
        </div>
      </div>
    </section>
  );
};

// ─── Layout: Card Overlap (white card on section, negative margin) ───────
const CtaCardOverlap: React.FC<CtaSectionProps> = ({ tone = 'primary', children }) => {
  const bgClass =
    tone === 'dark'
      ? 'bg-gradient-to-r from-ink-900 via-ink-800 to-ink-900'
      : tone === 'warm'
        ? 'bg-gradient-to-r from-secondary-600 to-secondary-700'
        : 'bg-gradient-to-r from-primary-700 to-primary-800';

  return (
    <section className={`${bgClass} py-section-lg relative`}>
      <div className="max-w-page mx-auto px-6">
        <div
          className="bg-white rounded-2xl shadow-card-lift p-8 sm:p-12 mx-auto max-w-2xl"
          style={{ marginTop: '-3rem' }}
        >
          <div className="flex flex-col items-center text-center gap-stack-lg">
            {children}
          </div>
        </div>
      </div>
    </section>
  );
};

// ─── Main router ─────────────────────────────────────────────────────────
export const CtaSection: React.FC<CtaSectionProps> = ({
  layout = 'bold-centered',
  tone = 'primary',
  children,
}) => {
  switch (layout) {
    case 'bold-centered':
      return <CtaBoldCentered tone={tone}>{children}</CtaBoldCentered>;
    case 'card-overlap':
      return <CtaCardOverlap tone={tone}>{children}</CtaCardOverlap>;
    default:
      return <CtaBoldCentered tone={tone}>{children}</CtaBoldCentered>;
  }
};

export default CtaSection;
