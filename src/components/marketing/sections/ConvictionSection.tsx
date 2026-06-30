/**
 * ConvictionSection — Layout router for 2 conviction/values patterns
 *
 * Props: layout, tone, children content
 * Routes to:
 * - quote-led : centered h2 quote with icon accent (Clarity, Elegant)
 * - callout-2col : 2-col text-left + visual-right (Momentum, Flow)
 * - dark-stripe : dark teal stripe with white text (Storyteller)
 */

import React from 'react';

export type ConvictionLayout = 'quote-led' | 'callout-2col' | 'dark-stripe';

interface ConvictionSectionProps {
  layout?: ConvictionLayout;
  tone?: 'primary' | 'warm' | 'sun' | 'neutral';
  children?: React.ReactNode;
}

// ─── Layout: Quote-Led (centered h2 + p, simple) ────────────────────────
const ConvictionQuoteLed: React.FC<ConvictionSectionProps> = ({ children }) => (
  <section className="bg-white">
    <div className="max-w-page mx-auto px-6 py-page">
      <div className="max-w-[34ch] mx-auto text-center flex flex-col gap-stack-lg">
        {children}
      </div>
    </div>
  </section>
);

// ─── Layout: Callout 2-Col (text left, visual right) ────────────────────
const ConvictionCallout2Col: React.FC<ConvictionSectionProps> = ({ children }) => (
  <section className="bg-white">
    <div className="max-w-page mx-auto px-6 py-page">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-section items-center">
        {children}
      </div>
    </div>
  </section>
);

// ─── Layout: Dark Stripe (primary-700 bg, white text, 12-col split) ──────
const ConvictionDarkStripe: React.FC<ConvictionSectionProps> = ({ children }) => (
  <section className="bg-primary-700 text-white">
    <div className="max-w-page mx-auto px-6 py-page lg:py-section-lg">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-stack-lg lg:gap-section items-baseline">
        {children}
      </div>
    </div>
  </section>
);

// ─── Main router ─────────────────────────────────────────────────────────
export const ConvictionSection: React.FC<ConvictionSectionProps> = ({
  layout = 'quote-led',
  tone = 'primary',
  children,
}) => {
  switch (layout) {
    case 'quote-led':
      return (
        <ConvictionQuoteLed tone={tone}>{children}</ConvictionQuoteLed>
      );
    case 'callout-2col':
      return (
        <ConvictionCallout2Col tone={tone}>{children}</ConvictionCallout2Col>
      );
    case 'dark-stripe':
      return (
        <ConvictionDarkStripe tone={tone}>{children}</ConvictionDarkStripe>
      );
    default:
      return (
        <ConvictionQuoteLed tone={tone}>{children}</ConvictionQuoteLed>
      );
  }
};

export default ConvictionSection;
