import React from 'react';

/**
 * Celebration — Source of truth: design-system/spec.json → components.Celebration
 *
 * Moments of victory. Three forms: banner (full), inline-win, toast (use Toast).
 * Rule: Rare = precious. Celebrate real milestones only.
 */

export interface CelebrationProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'title'> {
  title: React.ReactNode;
  description?: React.ReactNode;
  /** Action buttons (Button components) rendered below copy */
  actions?: React.ReactNode;
  /** Confetti-style decorative element rendered at the top */
  confetti?: React.ReactNode;
}

export const Celebration: React.FC<CelebrationProps> = ({
  title,
  description,
  actions,
  confetti,
  className = '',
  children,
  ...rest
}) => (
  <div
    className={['celebration', className].filter(Boolean).join(' ')}
    role="status"
    aria-live="polite"
    {...rest}
  >
    {confetti !== undefined ? (
      confetti && <div className="celebration__confetti">{confetti}</div>
    ) : (
      <div className="celebration__confetti" aria-hidden="true">🎉</div>
    )}
    <h2 className="celebration__title">{title}</h2>
    {description && <p className="celebration__desc">{description}</p>}
    {children}
    {actions && <div style={{ marginTop: 'var(--s-5)', display: 'flex', gap: 'var(--s-3)', justifyContent: 'center' }}>{actions}</div>}
  </div>
);

// ============================================================================
// INLINE WIN — compact inline celebration
// ============================================================================

export interface InlineWinProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'title'> {
  icon?: React.ReactNode;
  title: React.ReactNode;
  description?: React.ReactNode;
}

const DEFAULT_SPARK = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <polygon points="12 2 15 9 22 9 17 14 19 21 12 17 5 21 7 14 2 9 9 9 12 2" />
  </svg>
);

export const InlineWin: React.FC<InlineWinProps> = ({
  icon,
  title,
  description,
  className = '',
  ...rest
}) => (
  <div className={['inline-win', className].filter(Boolean).join(' ')} {...rest}>
    <span className="inline-win__spark" aria-hidden="true">
      {icon ?? DEFAULT_SPARK}
    </span>
    <div className="inline-win__body">
      <p style={{ fontWeight: 600, margin: 0 }}>{title}</p>
      {description && (
        <p style={{ margin: '2px 0 0', fontSize: 'var(--t-caption)', color: 'var(--text-muted)' }}>
          {description}
        </p>
      )}
    </div>
  </div>
);

export default Celebration;
