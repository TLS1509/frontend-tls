/**
 * AchievementDocumentation.tsx
 *
 * Comprehensive documentation for the Achievement component family
 * Shows variants, anatomy, code examples, and patterns for gamification
 */

import React, { useState } from 'react';
import { Achievement } from '../ui/Achievement';
import './AchievementDocumentation.css';

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
  variant: 'unlocked' | 'locked' | 'in-progress';
  size: 'sm' | 'md' | 'lg';
  progress?: number;
  maxProgress?: number;
  unlockedAt?: string;
  label: string;
  codeExample: string;
}

// ============================================================================
// ACHIEVEMENT ANATOMY
// ============================================================================

const achievementAnatomy: AnatomySlot[] = [
  {
    slot: 'badge (icon)',
    usage: 'Circular badge with icon representing the achievement. Uses gradient background and shadow for emphasis.',
    typography: 'icon (1.75rem - 3.5rem depending on size)',
    color: 'Primary gradient (unlocked), grayscale (locked), secondary gradient (in-progress)',
  },
  {
    slot: 'lock indicator (conditional)',
    usage: 'Small lock icon overlay for locked achievements. Shows achievement is not yet earned.',
    typography: 'icon (1rem)',
    color: 'White background with shadow',
  },
  {
    slot: 'title',
    usage: 'Achievement name. Should be clear, memorable, and motivating.',
    typography: '1.125rem, 600 weight (md size)',
    color: '--tls-ink-900 (unlocked/in-progress), --tls-ink-700 (locked)',
  },
  {
    slot: 'description',
    usage: 'Context about the achievement. Explains what was accomplished or what is required.',
    typography: '0.875rem, normal weight',
    color: '--tls-ink-600 (unlocked/in-progress), --tls-ink-500 (locked)',
  },
  {
    slot: 'progress bar (conditional)',
    usage: 'Displays progress toward achievement for in-progress state. Shows current/max progress.',
    typography: 'caption (0.75rem)',
    color: 'Primary to secondary gradient fill, neutral background',
  },
  {
    slot: 'unlock date (conditional)',
    usage: 'Date when achievement was unlocked. Only shown for unlocked achievements.',
    typography: '0.75rem, 500 weight',
    color: '--tls-primary-600',
  },
];

// ============================================================================
// ACHIEVEMENT VARIANTS (BY SIZE & STATE)
// ============================================================================

const achievementVariants: VariantExample[] = [
  // UNLOCKED - ALL SIZES
  {
    id: 'unlocked-sm',
    name: 'Small Unlocked',
    title: 'Unlocked (Small)',
    description: 'Small unlocked achievement with badge and unlock date.',
    variant: 'unlocked',
    size: 'sm',
    unlockedAt: 'Apr 15, 2024',
    label: 'First Steps',
    codeExample: `<Achievement
  icon="🎯"
  title="First Steps"
  description="Complete your first learning module"
  variant="unlocked"
  size="sm"
  unlockedAt="Apr 15, 2024"
/>`,
  },
  {
    id: 'unlocked-md',
    name: 'Medium Unlocked',
    title: 'Unlocked (Medium)',
    description: 'Default unlocked achievement. Most common size for achievement displays.',
    variant: 'unlocked',
    size: 'md',
    unlockedAt: 'Apr 15, 2024',
    label: 'React Master',
    codeExample: `<Achievement
  icon="⚛️"
  title="React Master"
  description="Complete all React fundamentals modules"
  variant="unlocked"
  size="md"
  unlockedAt="Apr 15, 2024"
/>`,
  },
  {
    id: 'unlocked-lg',
    name: 'Large Unlocked',
    title: 'Unlocked (Large)',
    description: 'Large unlocked achievement for featured or special accomplishments.',
    variant: 'unlocked',
    size: 'lg',
    unlockedAt: 'Apr 15, 2024',
    label: 'Learning Champion',
    codeExample: `<Achievement
  icon="🏆"
  title="Learning Champion"
  description="Completed 50+ modules and helped 10+ peers"
  variant="unlocked"
  size="lg"
  unlockedAt="Apr 15, 2024"
/>`,
  },

  // LOCKED - ALL SIZES
  {
    id: 'locked-sm',
    name: 'Small Locked',
    title: 'Locked (Small)',
    description: 'Small locked achievement. Shows what is available to unlock.',
    variant: 'locked',
    size: 'sm',
    label: 'Advanced Path',
    codeExample: `<Achievement
  icon="🔒"
  title="Advanced Path"
  description="Complete all intermediate modules first"
  variant="locked"
  size="sm"
/>`,
  },
  {
    id: 'locked-md',
    name: 'Medium Locked',
    title: 'Locked (Medium)',
    description: 'Default locked achievement. Shows locked state with muted styling.',
    variant: 'locked',
    size: 'md',
    label: 'Expert Badge',
    codeExample: `<Achievement
  icon="🎓"
  title="Expert Badge"
  description="Achieve 100% score on all advanced modules"
  variant="locked"
  size="md"
/>`,
  },
  {
    id: 'locked-lg',
    name: 'Large Locked',
    title: 'Locked (Large)',
    description: 'Large locked achievement for major milestones.',
    variant: 'locked',
    size: 'lg',
    label: 'Grandmaster',
    codeExample: `<Achievement
  icon="👑"
  title="Grandmaster"
  description="Complete entire learning journey (500+ modules)"
  variant="locked"
  size: "lg"
/>`,
  },

  // IN-PROGRESS - ALL SIZES
  {
    id: 'in-progress-sm',
    name: 'Small In-Progress',
    title: 'In-Progress (Small)',
    description: 'Small achievement with progress tracking.',
    variant: 'in-progress',
    size: 'sm',
    progress: 3,
    maxProgress: 5,
    label: 'Module Starter',
    codeExample: `<Achievement
  icon="📚"
  title="Module Starter"
  description="Complete 5 modules"
  variant="in-progress"
  size="sm"
  progress={3}
  maxProgress={5}
/>`,
  },
  {
    id: 'in-progress-md',
    name: 'Medium In-Progress',
    title: 'In-Progress (Medium)',
    description: 'Default in-progress achievement showing progress bar.',
    variant: 'in-progress',
    size: 'md',
    progress: 12,
    maxProgress: 25,
    label: 'Knowledge Builder',
    codeExample: `<Achievement
  icon="🧠"
  title="Knowledge Builder"
  description="Complete 25 modules"
  variant="in-progress"
  size="md"
  progress={12}
  maxProgress={25}
/>`,
  },
  {
    id: 'in-progress-lg',
    name: 'Large In-Progress',
    title: 'In-Progress (Large)',
    description: 'Large in-progress achievement for major goals.',
    variant: 'in-progress',
    size: 'lg',
    progress: 38,
    maxProgress: 100,
    label: 'Ultimate Scholar',
    codeExample: `<Achievement
  icon="✨"
  title="Ultimate Scholar"
  description="Complete 100 modules across all topics"
  variant="in-progress"
  size: "lg"
  progress={38}
  maxProgress={100}
/>`,
  },
];

// ============================================================================
// PATTERN EXAMPLES
// ============================================================================

const AchievementUnlockedPattern: React.FC = () => (
  <div
    style={{
      display: 'flex',
      flexDirection: 'column',
      gap: '1rem',
      padding: '1.5rem',
      backgroundColor: 'var(--tls-primary-50)',
      borderRadius: '8px',
      border: '2px solid var(--tls-primary-200)',
    }}
  >
    <div style={{ textAlign: 'center' }}>
      <div style={{ fontSize: '3rem', marginBottom: '0.5rem' }}>🎉</div>
      <h3 style={{ margin: '0 0 0.5rem 0' }}>Achievement Unlocked!</h3>
      <p style={{ margin: 0, fontSize: '0.875rem', color: 'var(--tls-ink-600)' }}>
        You've earned a new badge. Share your accomplishment!
      </p>
    </div>

    <Achievement
      icon="🏅"
      title="First Win"
      description="Completed your first module"
      variant="unlocked"
      size="md"
      unlockedAt="Just now"
    />
  </div>
);

const AchievementProgressPattern: React.FC = () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
    <h4 style={{ margin: '0 0 1rem 0' }}>Your Progress Today</h4>
    <Achievement
      icon="📈"
      title="Daily Learner"
      description="Complete 1 module per day this week"
      variant="in-progress"
      size="md"
      progress={3}
      maxProgress={7}
    />
    <Achievement
      icon="🔥"
      title="Streak Master"
      description="Maintain 30-day learning streak"
      variant="in-progress"
      size="md"
      progress={12}
      maxProgress={30}
    />
    <Achievement
      icon="⭐"
      title="Five Star Rating"
      description="Earn 5-star ratings on 10 modules"
      variant="in-progress"
      size="md"
      progress={7}
      maxProgress={10}
    />
  </div>
);

const AchievementCollectionPattern: React.FC = () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
    <h4 style={{ margin: '0 0 1rem 0' }}>Badge Collection</h4>
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
      <Achievement
        icon="🎯"
        title="First Module"
        description="Complete your first module"
        variant="unlocked"
        size="sm"
        unlockedAt="Mar 1, 2024"
      />
      <Achievement
        icon="🧠"
        title="Knowledge Seeker"
        description="Complete 10 modules"
        variant="unlocked"
        size="sm"
        unlockedAt="Mar 15, 2024"
      />
      <Achievement
        icon="🏆"
        title="Learning Leader"
        description="Complete 25 modules"
        variant="in-progress"
        size="sm"
        progress={23}
        maxProgress={25}
      />
      <Achievement
        icon="👑"
        title="Master Scholar"
        description="Complete 50 modules"
        variant="locked"
        size="sm"
      />
    </div>
  </div>
);

const AchievementRarityPattern: React.FC = () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
    <div>
      <h4 style={{ margin: '0 0 1rem 0' }}>⭐ Rare Achievements</h4>
      <Achievement
        icon="💎"
        title="Perfectionist"
        description="Score 100% on 5 consecutive modules"
        variant="unlocked"
        size="md"
        unlockedAt="Apr 10, 2024"
      />
    </div>
    <div>
      <h4 style={{ margin: '0 0 1rem 0' }}>🔥 Epic Achievements</h4>
      <Achievement
        icon="🚀"
        title="Speed Learner"
        description="Complete 10 modules in one week"
        variant="in-progress"
        size="md"
        progress={8}
        maxProgress={10}
      />
    </div>
  </div>
);

// ============================================================================
// COMPONENT DOCUMENTATION
// ============================================================================

interface Props {
  showCodeExamples?: boolean;
}

export const AchievementDocumentation: React.FC<Props> = ({ showCodeExamples = true }) => {
  const [expandedCode, setExpandedCode] = useState<string | null>(null);

  return (
    <div className="achievement-documentation">
      {/* Header */}
      <section className="doc-section doc-header">
        <h1>🏆 Achievement & Gamification</h1>
        <p className="doc-description">
          Badge component for displaying earned achievements, progress, and milestones. Supports three states (unlocked,
          locked, in-progress) and three sizes for flexible layout options.
        </p>
      </section>

      {/* Variants Gallery */}
      <section className="doc-section">
        <h2>Variants</h2>
        <p className="doc-intro">Three achievement states (unlocked, locked, in-progress) across three sizes (sm, md, lg).</p>

        <div className="variants-grid">
          {achievementVariants.map((variant) => (
            <div key={variant.id} className="variant-item">
              <div className="variant-preview">
                <Achievement
                  icon={variant.label.charAt(0).toUpperCase()}
                  title={variant.label}
                  description={variant.description}
                  variant={variant.variant}
                  size={variant.size}
                  progress={variant.progress}
                  maxProgress={variant.maxProgress}
                  unlockedAt={variant.unlockedAt}
                />
              </div>

              <div className="variant-info">
                <h4>{variant.name}</h4>
                <p>{variant.title}</p>

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
        <p className="doc-intro">Achievement structure with slot definitions, usage guidelines, and conditional elements.</p>

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
            {achievementAnatomy.map((slot, idx) => (
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

      {/* State Descriptions */}
      <section className="doc-section">
        <h2>Achievement States</h2>
        <p className="doc-intro">Three distinct states for different achievement lifecycle stages.</p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem' }}>
          <div style={{ padding: '1rem', backgroundColor: 'var(--tls-primary-50)', borderRadius: '6px' }}>
            <h4 style={{ color: 'var(--tls-primary-600)', margin: '0 0 0.5rem 0' }}>✓ Unlocked</h4>
            <p style={{ margin: '0.5rem 0', fontSize: '0.875rem' }}>
              Achievement has been earned by the user. Shows icon with primary gradient, title, description, and unlock
              date.
            </p>
            <p style={{ margin: '0.5rem 0', fontSize: '0.75rem', color: 'var(--tls-ink-600)' }}>
              Use to showcase accomplishments and build motivation.
            </p>
          </div>

          <div style={{ padding: '1rem', backgroundColor: 'var(--tls-ink-50)', borderRadius: '6px' }}>
            <h4 style={{ color: 'var(--tls-ink-600)', margin: '0 0 0.5rem 0' }}>🔒 Locked</h4>
            <p style={{ margin: '0.5rem 0', fontSize: '0.875rem' }}>
              Achievement not yet earned. Shows grayscale icon with lock indicator, muted text, and requirements.
            </p>
            <p style={{ margin: '0.5rem 0', fontSize: '0.75rem', color: 'var(--tls-ink-600)' }}>
              Use to show future goals and create aspirational motivation.
            </p>
          </div>

          <div style={{ padding: '1rem', backgroundColor: 'var(--tls-secondary-50)', borderRadius: '6px' }}>
            <h4 style={{ color: 'var(--tls-secondary-600)', margin: '0 0 0.5rem 0' }}>🔄 In-Progress</h4>
            <p style={{ margin: '0.5rem 0', fontSize: '0.875rem' }}>
              Achievement being worked toward. Shows secondary gradient icon with progress bar indicating completion
              percentage.
            </p>
            <p style={{ margin: '0.5rem 0', fontSize: '0.75rem', color: 'var(--tls-ink-600)' }}>
              Use to track progress and provide real-time feedback on advancement.
            </p>
          </div>
        </div>
      </section>

      {/* Patterns */}
      <section className="doc-section">
        <h2>Pattern Examples</h2>
        <p className="doc-intro">Common compositions and usage patterns with achievements.</p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>
          <div>
            <h4 style={{ marginBottom: '1rem' }}>Achievement Unlocked Popup</h4>
            <AchievementUnlockedPattern />
            <p style={{ fontSize: '0.875rem', color: 'var(--tls-ink-600)', marginTop: '1rem' }}>
              Modal or toast that appears when user earns achievement. Celebrates accomplishment and encourages
              sharing.
            </p>
          </div>

          <div>
            <h4 style={{ marginBottom: '1rem' }}>Progress Tracking</h4>
            <AchievementProgressPattern />
            <p style={{ fontSize: '0.875rem', color: 'var(--tls-ink-600)', marginTop: '1rem' }}>
              Display multiple in-progress achievements to show user's advancement toward various goals simultaneously.
            </p>
          </div>

          <div>
            <h4 style={{ marginBottom: '1rem' }}>Badge Collection</h4>
            <AchievementCollectionPattern />
            <p style={{ fontSize: '0.875rem', color: 'var(--tls-ink-600)', marginTop: '1rem' }}>
              Grid layout showing mix of earned, in-progress, and locked achievements. Common on user profile pages.
            </p>
          </div>

          <div>
            <h4 style={{ marginBottom: '1rem' }}>Rarity Tiers</h4>
            <AchievementRarityPattern />
            <p style={{ fontSize: '0.875rem', color: 'var(--tls-ink-600)', marginTop: '1rem' }}>
              Group achievements by rarity or difficulty. Rare/epic achievements create exclusive rewards and
              bragging rights.
            </p>
          </div>
        </div>
      </section>

      {/* Props Reference */}
      <section className="doc-section">
        <h2>Props Reference</h2>
        <p className="doc-intro">Available props for the Achievement component.</p>

        <div className="props-table">
          <div className="prop-row">
            <div className="prop-name">
              <code>icon</code>
            </div>
            <div className="prop-type">React.ReactNode</div>
            <div className="prop-default">—</div>
            <div className="prop-desc">Icon or emoji for the achievement badge</div>
          </div>

          <div className="prop-row">
            <div className="prop-name">
              <code>title</code>
            </div>
            <div className="prop-type">string</div>
            <div className="prop-default">—</div>
            <div className="prop-desc">Achievement name (memorable and motivating)</div>
          </div>

          <div className="prop-row">
            <div className="prop-name">
              <code>description</code>
            </div>
            <div className="prop-type">string</div>
            <div className="prop-default">—</div>
            <div className="prop-desc">Context about achievement or requirements to unlock</div>
          </div>

          <div className="prop-row">
            <div className="prop-name">
              <code>variant</code>
            </div>
            <div className="prop-type">'unlocked' | 'locked' | 'in-progress'</div>
            <div className="prop-default">unlocked</div>
            <div className="prop-desc">Achievement state (determines styling and shown elements)</div>
          </div>

          <div className="prop-row">
            <div className="prop-name">
              <code>size</code>
            </div>
            <div className="prop-type">'sm' | 'md' | 'lg'</div>
            <div className="prop-default">md</div>
            <div className="prop-desc">Achievement size (affects badge, text sizing, spacing)</div>
          </div>

          <div className="prop-row">
            <div className="prop-name">
              <code>progress</code>
            </div>
            <div className="prop-type">number</div>
            <div className="prop-default">—</div>
            <div className="prop-desc">Current progress (required for in-progress variant)</div>
          </div>

          <div className="prop-row">
            <div className="prop-name">
              <code>maxProgress</code>
            </div>
            <div className="prop-type">number</div>
            <div className="prop-default">100</div>
            <div className="prop-desc">Maximum progress value (for progress percentage calculation)</div>
          </div>

          <div className="prop-row">
            <div className="prop-name">
              <code>unlockedAt</code>
            </div>
            <div className="prop-type">string</div>
            <div className="prop-default">—</div>
            <div className="prop-desc">Date/time when achievement was unlocked (for unlocked variant)</div>
          </div>

          <div className="prop-row">
            <div className="prop-name">
              <code>onClick</code>
            </div>
            <div className="prop-type">() =&gt; void</div>
            <div className="prop-default">—</div>
            <div className="prop-desc">Optional click handler for interactive achievements</div>
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
            <strong>Use meaningful icons</strong> — Choose icons/emojis that represent the achievement. Consistency
            across achievement set improves recognition.
          </li>
          <li>
            <strong>Write motivating titles</strong> — Titles should celebrate accomplishment or inspire action.
            Avoid technical jargon.
          </li>
          <li>
            <strong>Clear unlock requirements</strong> — For locked achievements, description should explain exactly what
            is needed to unlock (e.g., "Complete 25 modules").
          </li>
          <li>
            <strong>Balance rarity levels</strong> — Mix easy, moderate, and rare achievements. Easy badges provide early
            wins; rare badges create long-term goals.
          </li>
          <li>
            <strong>Update progress regularly</strong> — For in-progress achievements, show accurate progress. Stale
            progress bars reduce engagement.
          </li>
          <li>
            <strong>Celebrate unlocks appropriately</strong> — Major achievements warrant pop-up celebration; minor ones
            can just update quietly.
          </li>
          <li>
            <strong>Consider social features</strong> — Allow sharing unlocked achievements (e.g., "Share to profile").
            Social proof drives engagement.
          </li>
          <li>
            <strong>Group by category</strong> — Organize achievements by topic, difficulty, or rarity. Helps users find
            badges they care about.
          </li>
        </ul>
      </section>
    </div>
  );
};

export default AchievementDocumentation;
