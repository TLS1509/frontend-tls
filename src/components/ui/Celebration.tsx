import React from 'react';
import { Star, Sparkles } from 'lucide-react';

export interface CelebrationProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'title'> {
  title: React.ReactNode;
  description?: React.ReactNode;
  actions?: React.ReactNode;
  /** Custom decorative overlay. Pass `false` to disable corner sparkles. */
  confetti?: React.ReactNode | false;
}

const CARD_CLASSES =
  'relative bg-gradient-to-br from-secondary-50 via-accent-50/70 to-secondary-50 ' +
  'border border-secondary-500/20 rounded-2xl px-12 py-10 text-center overflow-hidden ' +
  'shadow-warm-sm hover:shadow-warm-md transition-shadow duration-300';

// Diffuse radial glow (top-left orange + bottom-right amber) — soft scenic
// background, no centered emoji that overlaps the heading.
const GLOW_BG_CLASSES =
  'absolute inset-0 pointer-events-none ' +
  'bg-[radial-gradient(at_15%_20%,rgba(237,132,58,0.22),transparent_55%),radial-gradient(at_85%_80%,rgba(248,176,68,0.20),transparent_55%)]';

const CornerSparkles: React.FC = () => (
  <>
    <span aria-hidden="true" className="pointer-events-none absolute top-4 left-5 text-secondary-500/70 [animation:cel-twinkle_2.4s_ease-in-out_infinite]">
      <Sparkles size={20} fill="currentColor" />
    </span>
    <span aria-hidden="true" className="pointer-events-none absolute top-8 right-6 text-accent-500/70 [animation:cel-twinkle_2.4s_ease-in-out_infinite_0.6s]">
      <Star size={14} fill="currentColor" />
    </span>
    <span aria-hidden="true" className="pointer-events-none absolute bottom-6 left-10 text-accent-500/60 [animation:cel-twinkle_2.4s_ease-in-out_infinite_1s]">
      <Star size={12} fill="currentColor" />
    </span>
    <span aria-hidden="true" className="pointer-events-none absolute bottom-5 right-8 text-secondary-500/70 [animation:cel-twinkle_2.4s_ease-in-out_infinite_1.4s]">
      <Sparkles size={18} fill="currentColor" />
    </span>
    <style>{`
      @keyframes cel-twinkle {
        0%, 100% { opacity: 0.45; transform: scale(0.85) rotate(-4deg); }
        50%      { opacity: 1;    transform: scale(1.1)  rotate(6deg); }
      }
    `}</style>
  </>
);

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
    {/* Diffuse glow — always rendered, doesn't overlap content */}
    <div className={GLOW_BG_CLASSES} aria-hidden="true" />

    {/* Decorative content layer */}
    {confetti === false ? null : confetti != null ? (
      <div className="absolute inset-0 pointer-events-none">{confetti}</div>
    ) : (
      <CornerSparkles />
    )}

    <h2 className="relative m-0 mb-3 font-display text-h1 font-bold tracking-tight bg-gradient-to-br from-secondary-700 via-secondary-600 to-accent-700 bg-clip-text text-transparent">
      {title}
    </h2>
    {description && (
      <p className="relative m-0 mx-auto mb-5 max-w-[520px] text-body-lg text-ink-700 leading-relaxed">{description}</p>
    )}
    {children}
    {actions && (
      <div className="relative mt-5 flex gap-3 justify-center flex-wrap">{actions}</div>
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
