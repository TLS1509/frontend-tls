/**
 * MethodSection — Layout router for method/values/process section
 *
 * Props: layout, tone, children content
 * Routes to:
 * - grid-4col : grid-cols-4 numbered steps (Clarity — STRIDE)
 * - sticky-scroll : sticky scroll story with morphing visual (Storyteller)
 * - accordion : expandable steps, one open at a time (Elegant)
 */

import React from 'react';

export type MethodLayout = 'grid-4col' | 'sticky-scroll' | 'accordion';

interface MethodSectionProps {
  layout?: MethodLayout;
  tone?: 'primary' | 'warm' | 'sun' | 'neutral';
  children?: React.ReactNode;
}

// ─── Layout: 4-Col Grid (numbered steps, STRIDE) ──────────────────────────
const MethodGrid4Col: React.FC<MethodSectionProps> = ({ children }) => (
  <section className="bg-white">
    <div className="max-w-page mx-auto px-6 py-page">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-stack-lg">
        {children}
      </div>
    </div>
  </section>
);

// ─── Layout: Sticky Scroll Story (complex motion, morphing visual) ────────
const MethodStickyScroll: React.FC<MethodSectionProps> = ({ children }) => (
  <section className="bg-white">
    <div className="max-w-page mx-auto px-6 py-page">
      {children}
    </div>
  </section>
);

// ─── Layout: Accordion (expandable, one open at a time) ────────────────────
const MethodAccordion: React.FC<MethodSectionProps> = ({ children }) => (
  <section className="bg-white">
    <div className="max-w-page mx-auto px-6 py-page">
      <div className="flex flex-col gap-tight">
        {children}
      </div>
    </div>
  </section>
);

// ─── Main router ─────────────────────────────────────────────────────────
export const MethodSection: React.FC<MethodSectionProps> = ({
  layout = 'grid-4col',
  tone = 'primary',
  children,
}) => {
  switch (layout) {
    case 'grid-4col':
      return (
        <MethodGrid4Col tone={tone}>{children}</MethodGrid4Col>
      );
    case 'sticky-scroll':
      return (
        <MethodStickyScroll tone={tone}>{children}</MethodStickyScroll>
      );
    case 'accordion':
      return (
        <MethodAccordion tone={tone}>{children}</MethodAccordion>
      );
    default:
      return (
        <MethodGrid4Col tone={tone}>{children}</MethodGrid4Col>
      );
  }
};

export default MethodSection;
