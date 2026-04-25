/**
 * CardDocumentation.tsx
 *
 * Comprehensive documentation for the Card component family
 * Mirrors the structure of Design System HTML (cards.html)
 * Shows variants, anatomy, code examples, and patterns
 */

import React, { useState } from 'react';
import { Card } from '../core/Card';
import './CardDocumentation.css';

// ============================================================================
// TYPE DEFINITIONS
// ============================================================================

interface AnatomySlot {
  slot: string;
  usage: string;
  typography?: string;
  color?: string;
}

interface VariantExample {
  id: string;
  name: string;
  title: string;
  description: string;
  variant: 'standard' | 'elevated' | 'glass';
  eyebrow?: string;
  content: {
    eyebrow?: string;
    title: string;
    description: string;
    footer?: React.ReactNode;
  };
  codeExample: string;
}

// ============================================================================
// CARD ANATOMY
// ============================================================================

const cardAnatomy: AnatomySlot[] = [
  {
    slot: 'eyebrow',
    usage: 'Optional small label above title. Use for category, status, or metadata.',
    typography: 'caption (0.75rem)',
    color: '--tls-ink-500',
  },
  {
    slot: 'title',
    usage: 'Main heading of the card. Should be concise and descriptive.',
    typography: 'heading-4 (1.125rem, 600 weight)',
    color: '--tls-ink-900',
  },
  {
    slot: 'description',
    usage: 'Body text explaining the card content. Supports full text formatting.',
    typography: 'body (1rem, 400 weight)',
    color: '--tls-ink-600',
  },
  {
    slot: 'footer',
    usage: 'Optional action area. Can contain buttons, links, or metadata.',
    typography: 'caption or body (varies)',
    color: 'varies by content',
  },
];

// ============================================================================
// CARD VARIANTS
// ============================================================================

const cardVariants: VariantExample[] = [
  {
    id: 'default',
    name: 'Default (Rest)',
    title: 'Rest Card',
    description: 'Standard card with subtle border. Use as default card style.',
    variant: 'standard',
    content: {
      eyebrow: 'LEARNING PATH',
      title: 'React Fundamentals',
      description: 'Learn the basics of React including components, hooks, and state management.',
      footer: <span style={{ fontSize: '0.875rem', color: 'var(--tls-ink-500)' }}>12 lessons • 4 hours</span>,
    },
    codeExample: `<Card variant="standard">
  <div style={{ marginBottom: '0.5rem' }}>
    <span style={{ fontSize: '0.75rem', color: 'var(--tls-ink-500)' }}>
      LEARNING PATH
    </span>
  </div>
  <h3 style={{ fontSize: '1.125rem', fontWeight: 600, marginBottom: '0.5rem' }}>
    React Fundamentals
  </h3>
  <p style={{ color: 'var(--tls-ink-600)', marginBottom: '1rem' }}>
    Learn the basics of React including components, hooks, and state management.
  </p>
  <span style={{ fontSize: '0.875rem', color: 'var(--tls-ink-500)' }}>
    12 lessons • 4 hours
  </span>
</Card>`,
  },
  {
    id: 'feature',
    name: 'Feature (Elevated)',
    title: 'Feature Card',
    description: 'Elevated card with shadow. Use to highlight featured content or primary actions.',
    variant: 'elevated',
    content: {
      eyebrow: 'FEATURED',
      title: 'Advanced TypeScript',
      description: 'Master TypeScript for building scalable, type-safe applications.',
      footer: <button style={{ padding: '0.5rem 1rem', backgroundColor: 'var(--tls-primary-500)', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>Explore Course</button>,
    },
    codeExample: `<Card variant="elevated">
  <div style={{ marginBottom: '0.5rem' }}>
    <span style={{ fontSize: '0.75rem', color: 'var(--tls-ink-500)' }}>
      FEATURED
    </span>
  </div>
  <h3 style={{ fontSize: '1.125rem', fontWeight: 600, marginBottom: '0.5rem' }}>
    Advanced TypeScript
  </h3>
  <p style={{ color: 'var(--tls-ink-600)', marginBottom: '1rem' }}>
    Master TypeScript for building scalable, type-safe applications.
  </p>
  <button style={{ padding: '0.5rem 1rem', backgroundColor: 'var(--tls-primary-500)' }}>
    Explore Course
  </button>
</Card>`,
  },
  {
    id: 'interactive',
    name: 'Interactive',
    title: 'Interactive Card',
    description: 'Clickable card with hover effects. Use for selectable content or navigation.',
    variant: 'standard',
    content: {
      eyebrow: 'IN PROGRESS',
      title: 'JavaScript ES6+',
      description: 'Modern JavaScript features and best practices. Click to continue.',
      footer: <span style={{ fontSize: '0.875rem', color: 'var(--tls-primary-500)', fontWeight: 600 }}>Continue Learning →</span>,
    },
    codeExample: `<Card
  variant="standard"
  onClick={() => navigate('/course/js-es6')}
  style={{ cursor: 'pointer' }}
>
  <div style={{ marginBottom: '0.5rem' }}>
    <span style={{ fontSize: '0.75rem', color: 'var(--tls-primary-500)' }}>
      IN PROGRESS
    </span>
  </div>
  <h3 style={{ fontSize: '1.125rem', fontWeight: 600, marginBottom: '0.5rem' }}>
    JavaScript ES6+
  </h3>
  <p style={{ color: 'var(--tls-ink-600)', marginBottom: '1rem' }}>
    Modern JavaScript features and best practices. Click to continue.
  </p>
  <span style={{ fontSize: '0.875rem', color: 'var(--tls-primary-500)', fontWeight: 600 }}>
    Continue Learning →
  </span>
</Card>`,
  },
  {
    id: 'glass',
    name: 'Glass',
    title: 'Glass Card',
    description: 'Frosted glass effect with transparency. Use for overlay content or premium feel.',
    variant: 'glass',
    content: {
      eyebrow: 'PREMIUM',
      title: 'Expert Coaching Session',
      description: 'One-on-one guidance from industry experts. Schedule your session now.',
      footer: <span style={{ fontSize: '0.875rem', color: 'var(--tls-ink-900)' }}>45 minutes • Limited slots</span>,
    },
    codeExample: `<Card variant="glass">
  <div style={{ marginBottom: '0.5rem' }}>
    <span style={{ fontSize: '0.75rem' }}>
      PREMIUM
    </span>
  </div>
  <h3 style={{ fontSize: '1.125rem', fontWeight: 600, marginBottom: '0.5rem' }}>
    Expert Coaching Session
  </h3>
  <p style={{ marginBottom: '1rem' }}>
    One-on-one guidance from industry experts. Schedule your session now.
  </p>
  <span style={{ fontSize: '0.875rem' }}>
    45 minutes • Limited slots
  </span>
</Card>`,
  },
  {
    id: 'media',
    name: 'Media Card',
    title: 'Media Card',
    description: 'Card with image/media at top. Use for visual content showcase.',
    variant: 'standard',
    content: {
      eyebrow: 'COURSE',
      title: 'Web Design Fundamentals',
      description: 'Learn design principles and create beautiful user interfaces.',
      footer: <span style={{ fontSize: '0.875rem', color: 'var(--tls-ink-500)' }}>8 modules • Beginner</span>,
    },
    codeExample: `<Card variant="standard">
  {/* Image placeholder 16:9 aspect ratio */}
  <div style={{
    width: '100%',
    paddingBottom: '56.25%',
    backgroundColor: 'var(--tls-ink-100)',
    borderRadius: '4px',
    marginBottom: '1rem',
    position: 'relative'
  }}>
    {/* Image would go here */}
  </div>

  <div style={{ marginBottom: '0.5rem' }}>
    <span style={{ fontSize: '0.75rem', color: 'var(--tls-ink-500)' }}>
      COURSE
    </span>
  </div>
  <h3 style={{ fontSize: '1.125rem', fontWeight: 600, marginBottom: '0.5rem' }}>
    Web Design Fundamentals
  </h3>
  <p style={{ color: 'var(--tls-ink-600)', marginBottom: '1rem' }}>
    Learn design principles and create beautiful user interfaces.
  </p>
</Card>`,
  },
];

// ============================================================================
// PATTERN EXAMPLES
// ============================================================================

const LessonCardPattern: React.FC = () => (
  <Card variant="standard">
    <div style={{ marginBottom: '1rem' }}>
      <div
        style={{
          width: '100%',
          paddingBottom: '56.25%',
          backgroundColor: 'var(--tls-primary-100)',
          borderRadius: '4px',
          marginBottom: '1rem',
          position: 'relative',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <span style={{ color: 'var(--tls-primary-500)', fontWeight: 600 }}>Video Thumbnail</span>
      </div>
      <span style={{ fontSize: '0.75rem', color: 'var(--tls-primary-500)', fontWeight: 600 }}>
        LESSON 3
      </span>
    </div>
    <h3 style={{ fontSize: '1.125rem', fontWeight: 600, marginBottom: '0.5rem', color: 'var(--tls-ink-900)' }}>
      Understanding Hooks
    </h3>
    <p style={{ color: 'var(--tls-ink-600)', marginBottom: '1rem', fontSize: '0.95rem' }}>
      Deep dive into React hooks: useState, useEffect, useContext, and custom hooks.
    </p>
    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.875rem', color: 'var(--tls-ink-500)' }}>
      <span>12 min</span>
      <span>4/10 lessons</span>
    </div>
  </Card>
);

// ============================================================================
// COMPONENT DOCUMENTATION
// ============================================================================

interface Props {
  showCodeExamples?: boolean;
}

export const CardDocumentation: React.FC<Props> = ({ showCodeExamples = true }) => {
  const [expandedCode, setExpandedCode] = useState<string | null>(null);

  return (
    <div className="card-documentation">
      {/* Header */}
      <section className="doc-section doc-header">
        <h1>Card & Surfaces</h1>
        <p className="doc-description">
          Flexible container component for displaying content. Supports multiple variants for different contexts
          and visual hierarchies.
        </p>
      </section>

      {/* Variants Gallery */}
      <section className="doc-section">
        <h2>Variants</h2>
        <p className="doc-intro">
          Five card variants for different use cases. Each can be composed with eyebrow, title, description, and
          footer slots.
        </p>

        <div className="variants-grid">
          {cardVariants.map((variant) => (
            <div key={variant.id} className="variant-item">
              <div className="variant-preview">
                <Card variant={variant.variant}>
                  {variant.content.eyebrow && (
                    <div style={{ marginBottom: '0.5rem' }}>
                      <span style={{ fontSize: '0.75rem', color: 'var(--tls-ink-500)' }}>{variant.content.eyebrow}</span>
                    </div>
                  )}
                  <h3 style={{ fontSize: '1.125rem', fontWeight: 600, marginBottom: '0.5rem', color: 'var(--tls-ink-900)' }}>
                    {variant.content.title}
                  </h3>
                  <p style={{ color: 'var(--tls-ink-600)', marginBottom: '1rem', fontSize: '0.95rem' }}>
                    {variant.content.description}
                  </p>
                  {variant.content.footer && (
                    <div style={{ marginTop: '1rem', paddingTop: '1rem', borderTop: '1px solid var(--tls-ink-100)' }}>
                      {variant.content.footer}
                    </div>
                  )}
                </Card>
              </div>

              <div className="variant-info">
                <h4>{variant.name}</h4>
                <p>{variant.description}</p>

                {showCodeExamples && (
                  <button
                    className="code-toggle"
                    onClick={() => setExpandedCode(expandedCode === variant.id ? null : variant.id)}
                  >
                    {expandedCode === variant.id ? '▼ Hide Code' : '▶ Show Code'}
                  </button>
                )}

                {showCodeExamples && expandedCode === variant.id && (
                  <pre className="code-example">
                    <code>{variant.codeExample}</code>
                  </pre>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Anatomy */}
      <section className="doc-section">
        <h2>Anatomy</h2>
        <p className="doc-intro">Card structure with slot definitions, usage guidelines, and default styling.</p>

        <table className="anatomy-table">
          <thead>
            <tr>
              <th>Slot</th>
              <th>Usage</th>
              <th>Typography</th>
              <th>Color</th>
            </tr>
          </thead>
          <tbody>
            {cardAnatomy.map((slot, idx) => (
              <tr key={idx}>
                <td className="slot-name">
                  <code>{slot.slot}</code>
                </td>
                <td>{slot.usage}</td>
                <td>{slot.typography || '—'}</td>
                <td>
                  {slot.color && <code>{slot.color}</code>}
                  {!slot.color && '—'}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      {/* Patterns */}
      <section className="doc-section">
        <h2>Pattern Examples</h2>
        <p className="doc-intro">Common compositions using the Card component and its slots.</p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>
          <div>
            <h4 style={{ marginBottom: '1rem' }}>Lesson Card</h4>
            <LessonCardPattern />
            <p style={{ fontSize: '0.875rem', color: 'var(--tls-ink-600)', marginTop: '1rem' }}>
              A lesson card pattern with media (16:9 aspect ratio), lesson number, title, description, and metadata.
            </p>
          </div>
        </div>
      </section>

      {/* Props Reference */}
      <section className="doc-section">
        <h2>Props Reference</h2>
        <p className="doc-intro">Available props for the Card component.</p>

        <div className="props-table">
          <div className="prop-row">
            <div className="prop-name">
              <code>variant</code>
            </div>
            <div className="prop-type">'standard' | 'elevated' | 'glass'</div>
            <div className="prop-default">standard</div>
            <div className="prop-desc">Visual style of the card</div>
          </div>

          <div className="prop-row">
            <div className="prop-name">
              <code>padding</code>
            </div>
            <div className="prop-type">boolean</div>
            <div className="prop-default">true</div>
            <div className="prop-desc">Apply internal padding to card content</div>
          </div>

          <div className="prop-row">
            <div className="prop-name">
              <code>onClick</code>
            </div>
            <div className="prop-type">() =&gt; void</div>
            <div className="prop-default">—</div>
            <div className="prop-desc">Optional click handler for interactive cards</div>
          </div>

          <div className="prop-row">
            <div className="prop-name">
              <code>className</code>
            </div>
            <div className="prop-type">string</div>
            <div className="prop-default">''</div>
            <div className="prop-desc">Additional CSS classes</div>
          </div>
        </div>
      </section>

      {/* Best Practices */}
      <section className="doc-section">
        <h2>Best Practices</h2>
        <ul className="best-practices-list">
          <li>
            <strong>Keep titles concise</strong> — Aim for 1-2 lines. Use description for longer text.
          </li>
          <li>
            <strong>Use eyebrow sparingly</strong> — Only when categorization adds value (e.g., "FEATURED", "LESSON 3").
          </li>
          <li>
            <strong>Pair footers with action</strong> — Use footer for buttons, metadata, or supplementary info.
          </li>
          <li>
            <strong>Maintain consistent spacing</strong> — Use design tokens (--tls-spacing-*) for margins and padding.
          </li>
          <li>
            <strong>Responsive images</strong> — Media cards should use 16:9 aspect ratio for video thumbnails.
          </li>
          <li>
            <strong>Visual hierarchy</strong> — Use color and typography tokens to create clear information hierarchy.
          </li>
        </ul>
      </section>
    </div>
  );
};

export default CardDocumentation;
