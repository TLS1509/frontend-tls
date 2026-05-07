import React from 'react';
import { Star } from 'lucide-react';

export interface CelebrationProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'title'> {
  title: React.ReactNode;
  description?: React.ReactNode;
  actions?: React.ReactNode;
  confetti?: React.ReactNode;
}

const CARD_CLASSES =
  'relative bg-gradient-to-br from-secondary-50 to-accent-50 border border-secondary-500/15 rounded-2xl px-12 py-10 text-center overflow-hidden';

const CONFETTI_BG_CLASSES =
  'absolute inset-0 pointer-events-none ' +
  'bg-[radial-gradient(at_20%_30%,rgba(237,132,58,0.2),transparent_50%),radial-gradient(at_80%_70%,rgba(248,176,68,0.18),transparent_50%)]';

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
    className={[CARD_CLASSES, className].filter(Boolean).join(' ')}
    role="status"
    aria-live="polite"
    {...rest}
  >
    {confetti !== undefined ? (
      confetti && <div className={CONFETTI_BG_CLASSES}>{confetti}</div>
    ) : (
      <div className={`${CONFETTI_BG_CLASSES} flex items-center justify-center text-5xl`} aria-hidden="true">
        🎉
      </div>
    )}
    <h2 className="relative m-0 mb-3 font-display text-h1 font-semibold tracking-tight text-secondary-700">
      {title}
    </h2>
    {description && (
      <p className="relative m-0 mx-auto mb-5 max-w-[520px] text-body-lg text-ink-900">{description}</p>
    )}
    {children}
    {actions && (
      <div className="relative mt-5 flex gap-3 justify-center">{actions}</div>
    )}
  </div>
);

// ============================================================================
// INLINE WIN
// ============================================================================

export interface InlineWinProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'title'> {
  icon?: React.ReactNode;
  title: React.ReactNode;
  description?: React.ReactNode;
}

export const InlineWin: React.FC<InlineWinProps> = ({
  icon,
  title,
  description,
  className = '',
  ...rest
}) => (
  <div
    className={[
      'flex items-center gap-4 px-5 py-4 rounded-lg border border-secondary-500/20',
      'bg-gradient-to-br from-secondary-50 to-accent-50',
      className,
    ]
      .filter(Boolean)
      .join(' ')}
    {...rest}
  >
    <span
      aria-hidden="true"
      className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-br from-secondary-500 to-accent-500 text-white shrink-0 shadow-md"
    >
      {icon ?? <Star size={18} strokeWidth={2} fill="currentColor" />}
    </span>
    <div className="flex-1 min-w-0">
      <p className="m-0 text-body-sm font-bold text-secondary-700">{title}</p>
      {description && <p className="m-0 mt-0.5 text-caption text-ink-500">{description}</p>}
    </div>
  </div>
);

export default Celebration;
