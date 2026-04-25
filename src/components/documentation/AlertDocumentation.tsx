/**
 * AlertDocumentation.tsx
 *
 * Alert Component Documentation - Mirrors The Learning Society Design System
 *
 * Structure:
 * - Les quatre tons (The four types) - All alert types displayed
 * - Deux usages (Two usage patterns) - Inline vs Banner
 * - Anatomy - Component structure
 * - Props Reference - API documentation
 * - Best Practices - Usage guidelines
 */

import React, { useState } from 'react';
import { Alert } from '../ui/Alert';
import './AlertDocumentation.css';

// ============================================================================
// TYPE DEFINITIONS
// ============================================================================

interface AlertTypeExample {
  type: 'success' | 'warning' | 'error' | 'info';
  title: string;
  description: string;
  exampleTitle: string;
  exampleMessage: string;
}

interface UsagePattern {
  title: string;
  description: string;
  usage: string;
}

interface AnatomySlot {
  slot: string;
  usage: string;
  typography?: string;
  color?: string;
}

// ============================================================================
// LES QUATRE TONS - THE FOUR ALERT TYPES
// ============================================================================

const alertTypes: AlertTypeExample[] = [
  {
    type: 'info',
    title: 'Info Alert',
    description: 'Informational message. Use to provide helpful context or important updates.',
    exampleTitle: 'Prochaine session à 14h30',
    exampleMessage: 'Avec Claire L. · Écoute active · Salon Molière.',
  },
  {
    type: 'success',
    title: 'Success Alert',
    description: 'Confirmation of completed action. Use to show positive outcomes.',
    exampleTitle: 'Positionnement enregistré',
    exampleMessage: 'Tes réponses ont été prises en compte. Ton parcours personnalisé se génère.',
  },
  {
    type: 'warning',
    title: 'Warning Alert',
    description: 'Caution or important notice. Use for actions that need attention.',
    exampleTitle: 'Session en décalage',
    exampleMessage: 'Ton coach a proposé un nouveau créneau. Tu peux confirmer ou suggérer une autre date.',
  },
  {
    type: 'error',
    title: 'Error Alert',
    description: 'Error or failure notification. Use to report problems or failed actions.',
    exampleTitle: 'Synchronisation interrompue',
    exampleMessage: 'Ton dernier module n\'a pas pu être enregistré. Vérifie ta connexion et réessaye.',
  },
];

// ============================================================================
// DEUX USAGES - TWO USAGE PATTERNS
// ============================================================================

const usagePatterns: UsagePattern[] = [
  {
    title: 'Inline Alert',
    description: 'Alert within form or content context',
    usage: 'validation de formulaire',
  },
  {
    title: 'Banner Alert',
    description: 'Alert at top of page',
    usage: 'en haut de page',
  },
];

// ============================================================================
// ALERT ANATOMY
// ============================================================================

const alertAnatomy: AnatomySlot[] = [
  {
    slot: 'icon',
    usage: 'Visual indicator of alert type (✓, ⚠, ✕, ⓘ). Auto-provided based on type.',
    typography: 'icon (1.25rem)',
    color: 'Type-specific',
  },
  {
    slot: 'title (optional)',
    usage: 'Heading that summarizes the alert. Concise and action-oriented.',
    typography: '0.95rem, 600 weight',
    color: 'Type-specific dark',
  },
  {
    slot: 'message',
    usage: 'Main alert content. Can include context and instructions.',
    typography: '0.95rem, normal weight',
    color: 'Type-specific text',
  },
  {
    slot: 'close button (optional)',
    usage: 'Dismiss button. Only include if user can safely dismiss.',
    typography: 'icon (1.25rem)',
    color: 'Type-specific, 60% opacity → 100% on hover',
  },
];

// ============================================================================
// PATTERN EXAMPLES
// ============================================================================

const FormValidationPattern: React.FC = () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
    <div>
      <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}>Email Address</label>
      <input
        type="email"
        placeholder="name@example.com"
        style={{
          width: '100%',
          padding: '0.75rem',
          border: '2px solid #f28559',
          borderRadius: '6px',
          fontSize: '1rem',
        }}
      />
    </div>
    <Alert type="error" title="Invalid Email">
      Please enter a valid email address (e.g., user@domain.com).
    </Alert>
  </div>
);

const ToastNotificationPattern: React.FC = () => (
  <div
    style={{
      position: 'fixed',
      bottom: '2rem',
      right: '2rem',
      maxWidth: '400px',
      zIndex: 1000,
    }}
  >
    <Alert type="success" title="Saved" dismissible>
      Your progress has been saved automatically.
    </Alert>
  </div>
);

const InlineProgressPattern: React.FC = () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
    <div>
      <h4 style={{ margin: '0 0 1rem 0' }}>Step 3 of 5: Review Details</h4>
      <Alert type="info">
        Take a moment to review your information before submitting. You can go back to previous steps to make changes.
      </Alert>
    </div>
  </div>
);

const SuccessConfirmationPattern: React.FC = () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
    <Alert type="success" title="Achievement Unlocked!" dismissible>
      🏆 You've completed "React Fundamentals"! Your badge has been added to your profile.
    </Alert>
  </div>
);

// ============================================================================
// COMPONENT DOCUMENTATION
// ============================================================================

interface Props {
  showCodeExamples?: boolean;
}

export const AlertDocumentation: React.FC<Props> = ({ showCodeExamples = true }) => {
  const [expandedCode, setExpandedCode] = useState<string | null>(null);

  return (
    <div className="alert-documentation">
      {/* Header */}
      <section className="doc-section doc-header">
        <h1>🚨 Alert & Notifications</h1>
        <p className="doc-description">
          Notification component for displaying alerts, messages, and feedback. Supports success, warning, error, and
          info types with optional dismissible action.
        </p>
      </section>

      {/* LES QUATRE TONS - The Four Alert Types */}
      <section className="doc-section">
        <h2>Les quatre tons</h2>
        <p className="doc-intro">
          Four alert types covering all notification scenarios. Each type has a distinct visual identity and usage context.
        </p>

        <div className="variants-grid">
          {alertTypes.map((alertType) => (
            <div key={alertType.type} className="variant-item">
              <div className="variant-preview">
                <Alert type={alertType.type} title={alertType.exampleTitle}>
                  {alertType.exampleMessage}
                </Alert>
              </div>

              <div className="variant-info">
                <h4>{alertType.title}</h4>
                <p>{alertType.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* DEUX USAGES - Two Usage Patterns */}
      <section className="doc-section">
        <h2>Deux usages</h2>
        <p className="doc-intro">
          Two primary usage patterns for alerts in the interface. Choose based on the context and importance of the message.
        </p>

        <div className="variants-grid">
          {/* Inline Alert Pattern */}
          <div className="variant-item">
            <div className="variant-preview" style={{ flexDirection: 'column', alignItems: 'stretch', padding: '1.5rem' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <div>
                  <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600, fontSize: '0.95rem' }}>
                    Email Address
                  </label>
                  <input
                    type="email"
                    placeholder="name@example.com"
                    style={{
                      width: '100%',
                      padding: '0.75rem',
                      border: '2px solid var(--tls-danger-base, #F28559)',
                      borderRadius: '6px',
                      fontSize: '1rem',
                      boxSizing: 'border-box',
                    }}
                  />
                </div>
                <Alert type="error" title="Invalid Email">
                  Please enter a valid email address (e.g., user@domain.com).
                </Alert>
              </div>
            </div>
            <div className="variant-info">
              <h4>Inline Alert</h4>
              <p>Alert placed directly within form or content context to provide immediate validation or contextual feedback.</p>
              <p style={{ fontSize: '0.875rem', fontStyle: 'italic', color: 'var(--tls-info-fg)', marginTop: '0.5rem' }}>
                Utilisation: {usagePatterns[0].usage}
              </p>
            </div>
          </div>

          {/* Banner Alert Pattern */}
          <div className="variant-item">
            <div className="variant-preview" style={{ flexDirection: 'column', alignItems: 'stretch', padding: '1.5rem', backgroundColor: 'var(--tls-ink-50)' }}>
              <div style={{ marginBottom: '1rem' }}>
                <Alert type="success" title="Session Updated" dismissible>
                  Your coaching session with Claire L. has been confirmed for 2:30 PM. Check your calendar for details.
                </Alert>
              </div>
              <div>
                <h4 style={{ margin: '0 0 1rem 0' }}>Your Learning Dashboard</h4>
                <p style={{ margin: '0', color: 'var(--tls-ink-600)', fontSize: '0.95rem' }}>
                  Welcome back! You have 3 courses in progress and 5 new achievements waiting for you.
                </p>
              </div>
            </div>
            <div className="variant-info">
              <h4>Banner Alert</h4>
              <p>Alert displayed at the top of a section or page to communicate important information or status updates to users.</p>
              <p style={{ fontSize: '0.875rem', fontStyle: 'italic', color: 'var(--tls-info-fg)', marginTop: '0.5rem' }}>
                Utilisation: {usagePatterns[1].usage}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Anatomy */}
      <section className="doc-section">
        <h2>Anatomy</h2>
        <p className="doc-intro">Alert structure with slot definitions, usage guidelines, and default styling.</p>

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
            {alertAnatomy.map((slot, idx) => (
              <tr key={idx}>
                <td className="slot-name">
                  <code>{slot.slot}</code>
                </td>
                <td>{slot.usage}</td>
                <td>{slot.typography || '—'}</td>
                <td>
                  {slot.color && <code style={{ fontSize: '0.8rem' }}>{slot.color}</code>}
                  {!slot.color && '—'}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      {/* Real-World Examples */}
      <section className="doc-section">
        <h2>Real-World Examples</h2>
        <p className="doc-intro">Common usage patterns demonstrating alerts in practical scenarios.</p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>
          <div>
            <h4 style={{ marginBottom: '1rem' }}>Form Validation (Inline)</h4>
            <div style={{ position: 'relative', minHeight: '200px', padding: '1rem', border: '1px solid var(--tls-ink-100)', borderRadius: '6px', backgroundColor: 'var(--tls-ink-0)' }}>
              <FormValidationPattern />
            </div>
            <p style={{ fontSize: '0.875rem', color: 'var(--tls-ink-600)', marginTop: '1rem' }}>
              Error alerts placed inline with form fields provide immediate validation feedback.
            </p>
          </div>

          <div>
            <h4 style={{ marginBottom: '1rem' }}>Success Confirmation</h4>
            <div style={{ position: 'relative', minHeight: '200px', padding: '1rem', border: '1px solid var(--tls-ink-100)', borderRadius: '6px', backgroundColor: 'var(--tls-ink-0)' }}>
              <SuccessConfirmationPattern />
            </div>
            <p style={{ fontSize: '0.875rem', color: 'var(--tls-ink-600)', marginTop: '1rem' }}>
              Success alerts confirm action completion with optional dismissal.
            </p>
          </div>

          <div>
            <h4 style={{ marginBottom: '1rem' }}>Progress Context (Info)</h4>
            <div style={{ position: 'relative', minHeight: '200px', padding: '1rem', border: '1px solid var(--tls-ink-100)', borderRadius: '6px', backgroundColor: 'var(--tls-ink-0)' }}>
              <InlineProgressPattern />
            </div>
            <p style={{ fontSize: '0.875rem', color: 'var(--tls-ink-600)', marginTop: '1rem' }}>
              Info alerts provide helpful context in multi-step processes.
            </p>
          </div>
        </div>
      </section>

      {/* Props Reference */}
      <section className="doc-section">
        <h2>Props Reference</h2>
        <p className="doc-intro">Available props for the Alert component.</p>

        <div className="props-table">
          <div className="prop-row">
            <div className="prop-name">
              <code>type</code>
            </div>
            <div className="prop-type">'success' | 'warning' | 'error' | 'info'</div>
            <div className="prop-default">info</div>
            <div className="prop-desc">Alert type determining color scheme and default icon</div>
          </div>

          <div className="prop-row">
            <div className="prop-name">
              <code>title</code>
            </div>
            <div className="prop-type">string</div>
            <div className="prop-default">—</div>
            <div className="prop-desc">Optional alert title/heading</div>
          </div>

          <div className="prop-row">
            <div className="prop-name">
              <code>icon</code>
            </div>
            <div className="prop-type">React.ReactNode</div>
            <div className="prop-default">—</div>
            <div className="prop-desc">Custom icon (if not provided, defaults based on type)</div>
          </div>

          <div className="prop-row">
            <div className="prop-name">
              <code>dismissible</code>
            </div>
            <div className="prop-type">boolean</div>
            <div className="prop-default">false</div>
            <div className="prop-desc">Show close button allowing user to dismiss alert</div>
          </div>

          <div className="prop-row">
            <div className="prop-name">
              <code>onDismiss</code>
            </div>
            <div className="prop-type">() =&gt; void</div>
            <div className="prop-default">—</div>
            <div className="prop-desc">Callback function when user closes the alert</div>
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
            <div className="prop-desc">Alert message content</div>
          </div>
        </div>
      </section>

      {/* Best Practices */}
      <section className="doc-section">
        <h2>Best Practices</h2>
        <ul className="best-practices-list">
          <li>
            <strong>Match alert type to intent</strong> — Use success for confirmations, warning for cautions, error
            for failures, info for helpful tips.
          </li>
          <li>
            <strong>Be concise and actionable</strong> — Messages should clearly explain the situation and next steps.
            Avoid technical jargon.
          </li>
          <li>
            <strong>Use titles strategically</strong> — Titles summarize the alert. Use only when summary helps clarity
            (especially for errors).
          </li>
          <li>
            <strong>Only dismiss non-critical alerts</strong> — Allow dismissal for success and info alerts. Error and
            warning alerts should persist until resolved.
          </li>
          <li>
            <strong>Avoid alert fatigue</strong> — Don't show multiple alerts simultaneously. Stack them vertically if
            needed, but limit to 2-3.
          </li>
          <li>
            <strong>Pair with visual feedback</strong> — Icons or colored indicators reinforce the alert type. Keep
            consistency with design system.
          </li>
          <li>
            <strong>Auto-dismiss thoughtfully</strong> — Success toasts can auto-dismiss. Errors and warnings should
            require user action.
          </li>
        </ul>
      </section>
    </div>
  );
};

export default AlertDocumentation;
