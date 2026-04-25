/**
 * ButtonDocumentation.tsx
 *
 * Comprehensive documentation for the Button component family
 * Mirrors the structure of Design System HTML (buttons.html)
 * Shows variants, anatomy, code examples, and patterns
 */

import React, { useState } from 'react';
import { Button } from '../core/Button';
import './ButtonDocumentation.css';

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
  variant: 'primary' | 'secondary' | 'accent' | 'outline' | 'ghost' | 'link';
  size: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  fullWidth?: boolean;
  label: string;
  codeExample: string;
}

// ============================================================================
// BUTTON ANATOMY
// ============================================================================

const buttonAnatomy: AnatomySlot[] = [
  {
    slot: 'label',
    usage: 'Text content of the button. Should be clear and action-oriented.',
    typography: 'body (1rem, 600 weight)',
    color: '--tls-ink-0 (primary) or --tls-ink-900 (secondary)',
  },
  {
    slot: 'icon (optional)',
    usage: 'Optional icon before or after label. Use for visual context.',
    typography: 'icon (16px - 24px)',
    color: 'Inherits from label color',
  },
  {
    slot: 'state indicator',
    usage: 'Visual feedback for disabled, loading, or active states.',
    typography: 'implicit',
    color: 'Varies by variant',
  },
];

// ============================================================================
// BUTTON VARIANTS (BY SIZE & VARIANT)
// ============================================================================

const buttonVariants: VariantExample[] = [
  // PRIMARY VARIANTS
  {
    id: 'primary-sm',
    name: 'Small Primary',
    title: 'Primary (Small)',
    description: 'Small primary action button. Use for dense UI or secondary actions within components.',
    variant: 'primary',
    size: 'sm',
    label: 'Small Action',
    codeExample: `<Button variant="primary" size="sm">
  Small Action
</Button>`,
  },
  {
    id: 'primary-md',
    name: 'Medium Primary',
    title: 'Primary (Medium)',
    description: 'Default primary button. Use for main call-to-action. Most common size.',
    variant: 'primary',
    size: 'md',
    label: 'Primary Action',
    codeExample: `<Button variant="primary" size="md">
  Primary Action
</Button>`,
  },
  {
    id: 'primary-lg',
    name: 'Large Primary',
    title: 'Primary (Large)',
    description: 'Large primary button. Use for prominent actions or hero buttons.',
    variant: 'primary',
    size: 'lg',
    label: 'Large Action',
    codeExample: `<Button variant="primary" size="lg">
  Large Action
</Button>`,
  },

  // SECONDARY VARIANTS
  {
    id: 'secondary-md',
    name: 'Medium Secondary',
    title: 'Secondary (Medium)',
    description: 'Secondary action button. Use for less important actions or alternative options.',
    variant: 'secondary',
    size: 'md',
    label: 'Secondary',
    codeExample: `<Button variant="secondary" size="md">
  Secondary
</Button>`,
  },

  // ACCENT VARIANTS
  {
    id: 'accent-md',
    name: 'Medium Accent',
    title: 'Accent (Medium)',
    description: 'Accent button for special actions (premium features, highlights). High visibility.',
    variant: 'accent',
    size: 'md',
    label: 'Accent Action',
    codeExample: `<Button variant="accent" size="md">
  Accent Action
</Button>`,
  },

  // OUTLINE VARIANTS
  {
    id: 'outline-md',
    name: 'Medium Outline',
    title: 'Outline (Medium)',
    description: 'Outline button for secondary or tertiary actions. Lower visual weight than solid buttons.',
    variant: 'outline',
    size: 'md',
    label: 'Outline',
    codeExample: `<Button variant="outline" size="md">
  Outline
</Button>`,
  },

  // GHOST VARIANTS
  {
    id: 'ghost-md',
    name: 'Medium Ghost',
    title: 'Ghost (Medium)',
    description: 'Transparent button with minimal visual styling. Use in minimal interfaces or as text alternatives.',
    variant: 'ghost',
    size: 'md',
    label: 'Ghost',
    codeExample: `<Button variant="ghost" size="md">
  Ghost
</Button>`,
  },

  // LINK VARIANTS
  {
    id: 'link-md',
    name: 'Medium Link',
    title: 'Link (Medium)',
    description: 'Button styled as a link. Use for navigation or lightweight actions within text.',
    variant: 'link',
    size: 'md',
    label: 'Link Button',
    codeExample: `<Button variant="link" size="md">
  Link Button
</Button>`,
  },

  // DISABLED STATE
  {
    id: 'primary-disabled',
    name: 'Primary Disabled',
    title: 'Primary (Disabled)',
    description: 'Disabled button state. Use when action is temporarily unavailable.',
    variant: 'primary',
    size: 'md',
    disabled: true,
    label: 'Disabled',
    codeExample: `<Button variant="primary" size="md" disabled>
  Disabled
</Button>`,
  },
];

// ============================================================================
// PATTERN EXAMPLES
// ============================================================================

const ButtonWithIconPattern: React.FC = () => (
  <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
    <Button variant="primary" size="md">
      ➕ Add New
    </Button>
    <p style={{ fontSize: '0.875rem', color: 'var(--tls-ink-600)', margin: 0 }}>
      Primary button with icon for common actions like create, add, or publish.
    </p>
  </div>
);

const ButtonGroupPattern: React.FC = () => (
  <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
    <Button variant="primary" size="md">
      Save
    </Button>
    <Button variant="outline" size="md">
      Cancel
    </Button>
    <span style={{ fontSize: '0.875rem', color: 'var(--tls-ink-600)' }}>
      Primary action + outline cancel (common pattern in dialogs/forms)
    </span>
  </div>
);

const ButtonSizeComparisonPattern: React.FC = () => (
  <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', flexWrap: 'wrap' }}>
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
      <Button variant="primary" size="sm">
        Small
      </Button>
      <span style={{ fontSize: '0.75rem', color: 'var(--tls-ink-600)', textAlign: 'center' }}>
        sm
      </span>
    </div>
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
      <Button variant="primary" size="md">
        Medium
      </Button>
      <span style={{ fontSize: '0.75rem', color: 'var(--tls-ink-600)', textAlign: 'center' }}>
        md (default)
      </span>
    </div>
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
      <Button variant="primary" size="lg">
        Large
      </Button>
      <span style={{ fontSize: '0.75rem', color: 'var(--tls-ink-600)', textAlign: 'center' }}>
        lg
      </span>
    </div>
  </div>
);

// ============================================================================
// COMPONENT DOCUMENTATION
// ============================================================================

interface Props {
  showCodeExamples?: boolean;
}

export const ButtonDocumentation: React.FC<Props> = ({ showCodeExamples = true }) => {
  const [expandedCode, setExpandedCode] = useState<string | null>(null);

  return (
    <div className="button-documentation">
      {/* Header */}
      <section className="doc-section doc-header">
        <h1>Button & Actions</h1>
        <p className="doc-description">
          Interactive element for triggering actions. Supports multiple variants and sizes for different contexts
          and visual hierarchies.
        </p>
      </section>

      {/* Variants Gallery */}
      <section className="doc-section">
        <h2>Variants</h2>
        <p className="doc-intro">
          Six button variants and three sizes for different use cases. Each can be combined with disabled or
          fullWidth props.
        </p>

        <div className="variants-grid">
          {buttonVariants.map((variant) => (
            <div key={variant.id} className="variant-item">
              <div className="variant-preview">
                <Button
                  variant={variant.variant}
                  size={variant.size}
                  disabled={variant.disabled}
                  fullWidth={variant.fullWidth}
                >
                  {variant.label}
                </Button>
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
        <p className="doc-intro">Button structure with slot definitions, usage guidelines, and default styling.</p>

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
            {buttonAnatomy.map((slot, idx) => (
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
        <p className="doc-intro">Common compositions and usage patterns with the Button component.</p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>
          <div>
            <h4 style={{ marginBottom: '1rem' }}>Button with Icon</h4>
            <ButtonWithIconPattern />
            <p style={{ fontSize: '0.875rem', color: 'var(--tls-ink-600)', marginTop: '1rem' }}>
              Use emoji or icon elements with buttons for visual context. Icons work in any variant.
            </p>
          </div>

          <div>
            <h4 style={{ marginBottom: '1rem' }}>Button Group</h4>
            <ButtonGroupPattern />
            <p style={{ fontSize: '0.875rem', color: 'var(--tls-ink-600)', marginTop: '1rem' }}>
              Pair primary buttons with outline or ghost variants for form submission patterns.
            </p>
          </div>

          <div>
            <h4 style={{ marginBottom: '1rem' }}>Size Comparison</h4>
            <ButtonSizeComparisonPattern />
            <p style={{ fontSize: '0.875rem', color: 'var(--tls-ink-600)', marginTop: '1rem' }}>
              Choose size based on context: sm for compact UI, md for default, lg for hero/prominent actions.
            </p>
          </div>
        </div>
      </section>

      {/* Props Reference */}
      <section className="doc-section">
        <h2>Props Reference</h2>
        <p className="doc-intro">Available props for the Button component.</p>

        <div className="props-table">
          <div className="prop-row">
            <div className="prop-name">
              <code>variant</code>
            </div>
            <div className="prop-type">
              'primary' | 'secondary' | 'accent' | 'outline' | 'ghost' | 'link'
            </div>
            <div className="prop-default">primary</div>
            <div className="prop-desc">Visual style and color scheme of the button</div>
          </div>

          <div className="prop-row">
            <div className="prop-name">
              <code>size</code>
            </div>
            <div className="prop-type">'sm' | 'md' | 'lg'</div>
            <div className="prop-default">md</div>
            <div className="prop-desc">Button size (padding and font size)</div>
          </div>

          <div className="prop-row">
            <div className="prop-name">
              <code>disabled</code>
            </div>
            <div className="prop-type">boolean</div>
            <div className="prop-default">false</div>
            <div className="prop-desc">Disable the button and prevent clicks</div>
          </div>

          <div className="prop-row">
            <div className="prop-name">
              <code>fullWidth</code>
            </div>
            <div className="prop-type">boolean</div>
            <div className="prop-default">false</div>
            <div className="prop-desc">Make button 100% width of parent container</div>
          </div>

          <div className="prop-row">
            <div className="prop-name">
              <code>onClick</code>
            </div>
            <div className="prop-type">() =&gt; void</div>
            <div className="prop-default">—</div>
            <div className="prop-desc">Click handler function</div>
          </div>

          <div className="prop-row">
            <div className="prop-name">
              <code>type</code>
            </div>
            <div className="prop-type">'button' | 'submit' | 'reset'</div>
            <div className="prop-default">button</div>
            <div className="prop-desc">HTML button type</div>
          </div>

          <div className="prop-row">
            <div className="prop-name">
              <code>className</code>
            </div>
            <div className="prop-type">string</div>
            <div className="prop-default">''</div>
            <div className="prop-desc">Additional CSS classes</div>
          </div>

          <div className="prop-row">
            <div className="prop-name">
              <code>children</code>
            </div>
            <div className="prop-type">React.ReactNode</div>
            <div className="prop-default">—</div>
            <div className="prop-desc">Button label text or content</div>
          </div>
        </div>
      </section>

      {/* Best Practices */}
      <section className="doc-section">
        <h2>Best Practices</h2>
        <ul className="best-practices-list">
          <li>
            <strong>Use action-oriented labels</strong> — Labels should clearly describe what happens when clicked
            (e.g., "Save", "Delete", "Continue" not "OK", "Submit").
          </li>
          <li>
            <strong>Hierarchy with variants</strong> — Use primary for main action, secondary/outline for alternatives,
            ghost for less important actions.
          </li>
          <li>
            <strong>Size matching context</strong> — Use sm in dense lists, md as default, lg for hero sections or
            prominent CTAs.
          </li>
          <li>
            <strong>Disabled state feedback</strong> — Always provide a reason for disabled buttons via tooltip or
            nearby text.
          </li>
          <li>
            <strong>Icon placement</strong> — Keep icons consistent within a group. Icons enhance meaning but label
            must stand alone.
          </li>
          <li>
            <strong>Loading states</strong> — Consider adding loading spinner inside button during async operations
            (future enhancement).
          </li>
        </ul>
      </section>
    </div>
  );
};

export default ButtonDocumentation;
