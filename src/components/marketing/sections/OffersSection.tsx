/**
 * OffersSection — Layout router for 3-pillar/offers section
 *
 * Props: layout, tone, children content
 * Routes to:
 * - grid-3col : md:grid-cols-3 equal-height cards (Clarity, Momentum, Cinematic, Flow)
 * - editorial-index : flex-col, border dividers, no cards (Storyteller)
 * - asymmetric : 2+1 zigzag layout (Elegant)
 */

import React from 'react';

export type OffersLayout = 'grid-3col' | 'editorial-index' | 'asymmetric';

interface OffersSectionProps {
  layout?: OffersLayout;
  tone?: 'primary' | 'warm' | 'sun' | 'neutral';
  children?: React.ReactNode;
}

// ─── Layout: 3-Col Grid (equal-height cards) ──────────────────────────────
const OffersGrid3Col: React.FC<OffersSectionProps> = ({ children }) => (
  <section className="bg-white">
    <div className="max-w-page mx-auto px-6 py-page">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-stack-lg">
        {children}
      </div>
    </div>
  </section>
);

// ─── Layout: Editorial Index (stacked, border dividers, no cards) ────────
const OffersEditorialIndex: React.FC<OffersSectionProps> = ({ children }) => (
  <section className="bg-white">
    <div className="max-w-page mx-auto px-6 py-page">
      <div className="flex flex-col divide-y divide-ink-200">
        {children}
      </div>
    </div>
  </section>
);

// ─── Layout: Asymmetric (2+1 zigzag) ──────────────────────────────────────
const OffersAsymmetric: React.FC<OffersSectionProps> = ({ children }) => (
  <section className="bg-white">
    <div className="max-w-page mx-auto px-6 py-page">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-stack-lg auto-rows-max">
        {children}
      </div>
    </div>
  </section>
);

// ─── Main router ─────────────────────────────────────────────────────────
export const OffersSection: React.FC<OffersSectionProps> = ({
  layout = 'grid-3col',
  tone = 'primary',
  children,
}) => {
  switch (layout) {
    case 'grid-3col':
      return (
        <OffersGrid3Col tone={tone}>{children}</OffersGrid3Col>
      );
    case 'editorial-index':
      return (
        <OffersEditorialIndex tone={tone}>{children}</OffersEditorialIndex>
      );
    case 'asymmetric':
      return (
        <OffersAsymmetric tone={tone}>{children}</OffersAsymmetric>
      );
    default:
      return (
        <OffersGrid3Col tone={tone}>{children}</OffersGrid3Col>
      );
  }
};

export default OffersSection;
