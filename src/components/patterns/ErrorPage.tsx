import React, { useRef } from 'react';
import { AlertTriangle } from 'lucide-react';
import { motion, useReducedMotion, useMotionValue, useSpring, type Variants } from 'framer-motion';
import { AmbientBlobs } from './AmbientBlobs';

export type ErrorPageTone = 'default' | 'danger';

export type ErrorSuggestionTone = 'primary' | 'warm' | 'sun' | 'neutral';

export type ErrorPageAnimationLevel = 'subtle' | 'expressive' | 'none';

export interface ErrorPageSuggestion {
  icon: React.ReactNode;
  title: React.ReactNode;
  description?: React.ReactNode;
  onClick: () => void;
  tone?: ErrorSuggestionTone;
}

export interface ErrorPageProps {
  tone?: ErrorPageTone;
  /** Big code displayed in gradient (e.g. "404", "500", "403") */
  code?: React.ReactNode;
  /** Small uppercase eyebrow above the code */
  eyebrow?: React.ReactNode;
  /** Icon next to code (defaults to AlertTriangle for danger, omitted for default) */
  icon?: React.ReactNode;
  /** Main title (h1) */
  title: React.ReactNode;
  /** Description paragraph below the title */
  description?: React.ReactNode;
  /** Optional callout box (diagnostic, status, hint) */
  callout?: React.ReactNode;
  /** Optional navigation suggestions grid (Error404 style) */
  suggestions?: ErrorPageSuggestion[];
  /** Primary CTA (typically a Button) */
  primaryAction?: React.ReactNode;
  /** Optional secondary CTA */
  secondaryAction?: React.ReactNode;
  /**
   * Animation level :
   *  - 'subtle' (default) : staggered fade-in entrance, no continuous motion
   *  - 'expressive' : adds magnetic hover, icon float loop, ambient background blobs
   *  - 'none' : no animation (use for SSR static or when noise is undesired)
   * All levels respect `prefers-reduced-motion`.
   */
  animated?: ErrorPageAnimationLevel;
  className?: string;
}

// Solid code color (per DESIGN-IMPECCABLE §11 — no gradient text outside marketing GradientText).
// Emphasis comes from weight + size (font-black at clamp 6–9rem), not from chroma.
const TONE_CODE_COLOR: Record<ErrorPageTone, string> = {
  default: 'text-primary-200',
  danger: 'text-danger-base/70',
};

const TONE_ICON_BG: Record<ErrorPageTone, string> = {
  default: 'bg-gradient-to-br from-primary-50 to-secondary-50 border-primary-200 text-primary-600',
  danger: 'bg-danger-bg border-secondary-200 text-danger-fg',
};

const TONE_EYEBROW: Record<ErrorPageTone, string> = {
  default: 'text-primary-700',
  danger: 'text-danger-fg',
};

const SUGGESTION_TONE_BG: Record<ErrorSuggestionTone, string> = {
  primary: 'bg-primary-50 text-primary-600',
  warm: 'bg-secondary-50 text-secondary-500',
  sun: 'bg-accent-50 text-accent-500',
  neutral: 'bg-ink-50 text-ink-700',
};

/* Tone-aware hover border + shadow — matches the icon tone of the card
 * (cf. DS Card.tsx TONE_INTERACTIVE_HOVER pattern). The hover color reflects
 * the icon's tone so the user gets a visual cue "this is the warm/sun/etc.
 * card". */
const SUGGESTION_HOVER_BORDER: Record<ErrorSuggestionTone, string> = {
  primary: 'hover:border-primary-400',
  warm: 'hover:border-secondary-400',
  sun: 'hover:border-accent-400',
  neutral: 'hover:border-ink-400',
};

const SUGGESTION_HOVER_SHADOW: Record<ErrorSuggestionTone, string> = {
  primary: 'hover:shadow-brand-sm',
  warm: 'hover:shadow-warm-sm',
  sun: 'hover:shadow-sun-sm',
  neutral: 'hover:shadow-md',
};

/* ── Motion variants ─────────────────────────────────────────────────────── */

const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.07, delayChildren: 0.05 },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0, 0, 0.2, 1] } },
};

const codeVariants: Variants = {
  hidden: { opacity: 0, scale: 0.85 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.6, ease: [0.2, 0, 0, 1.15] },
  },
};

const iconVariants: Variants = {
  hidden: { opacity: 0, scale: 0.5, rotate: -10 },
  visible: {
    opacity: 1,
    scale: 1,
    rotate: 0,
    transition: { type: 'spring', stiffness: 260, damping: 18, delay: 0.15 },
  },
};

const suggestionVariants: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease: [0, 0, 0.2, 1] } },
};

/* ── Magnetic suggestion card ─────────────────────────────────────────────── */

interface SuggestionCardProps extends ErrorPageSuggestion {
  magnetic: boolean;
}

const SuggestionCard: React.FC<SuggestionCardProps> = ({
  icon,
  title,
  description,
  onClick,
  tone = 'primary',
  magnetic,
}) => {
  const ref = useRef<HTMLButtonElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 200, damping: 16, mass: 0.4 });
  const springY = useSpring(y, { stiffness: 200, damping: 16, mass: 0.4 });

  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!magnetic || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const relX = e.clientX - rect.left - rect.width / 2;
    const relY = e.clientY - rect.top - rect.height / 2;
    const strength = 8; // max px
    const maxDist = Math.max(rect.width, rect.height) / 2;
    x.set((relX / maxDist) * strength);
    y.set((relY / maxDist) * strength);
  };

  const handleMouseLeave = () => {
    if (!magnetic) return;
    x.set(0);
    y.set(0);
  };

  return (
    <motion.button
      ref={ref}
      type="button"
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      variants={suggestionVariants}
      whileHover={magnetic ? undefined : { y: -4 }}
      style={magnetic ? { x: springX, y: springY } : undefined}
      className={[
        'flex flex-col items-start gap-stack-xs p-stack-lg rounded-xl border border-ink-200 bg-white text-left shadow-sm',
        SUGGESTION_HOVER_BORDER[tone],
        SUGGESTION_HOVER_SHADOW[tone],
        'transition-[border-color,box-shadow] duration-base ease-standard cursor-pointer min-h-touch focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500',
      ].join(' ')}
    >
      <div
        className={[
          'w-10 h-10 rounded-lg flex items-center justify-center shrink-0',
          SUGGESTION_TONE_BG[tone],
        ].join(' ')}
      >
        {icon}
      </div>
      <div className="flex flex-col gap-tight">
        <h3 className="font-body text-body-sm font-bold text-ink-900 m-0">{title}</h3>
        {description && (
          <p className="font-body text-caption text-ink-500 m-0 leading-relaxed">{description}</p>
        )}
      </div>
    </motion.button>
  );
};

/* ── Main pattern ─────────────────────────────────────────────────────────── */

export const ErrorPage: React.FC<ErrorPageProps> = ({
  tone = 'default',
  code,
  eyebrow,
  icon,
  title,
  description,
  callout,
  suggestions,
  primaryAction,
  secondaryAction,
  animated = 'subtle',
  className = '',
}) => {
  const reduce = useReducedMotion();
  const enableMotion = animated !== 'none' && !reduce;
  const expressive = enableMotion && animated === 'expressive';

  const resolvedIcon = icon ?? (tone === 'danger' ? <AlertTriangle size={48} strokeWidth={1.5} /> : null);

  const wrapperClasses = [
    'relative min-h-[calc(100vh-120px)] flex items-center justify-center px-4 py-page font-body overflow-hidden',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  // Static variants if animation disabled (renders without intro animations)
  const initialAnim = enableMotion ? 'hidden' : false;
  const animateAnim = enableMotion ? 'visible' : false;

  return (
    <div className={wrapperClasses}>
      {expressive && <AmbientBlobs intensity="subtle" position="absolute" />}

      <motion.div
        className="relative z-base w-full max-w-[960px] flex flex-col items-center text-center gap-stack-lg"
        variants={containerVariants}
        initial={initialAnim}
        animate={animateAnim}
      >
        {eyebrow && (
          <motion.p
            variants={itemVariants}
            className={[
              'font-body text-caption font-bold uppercase tracking-[0.06em] inline-flex items-center gap-1.5 m-0',
              TONE_EYEBROW[tone],
            ].join(' ')}
          >
            {eyebrow}
          </motion.p>
        )}

        {code !== undefined && code !== null && (
          <motion.div
            variants={codeVariants}
            className={[
              'font-display font-black tracking-tight m-0',
              TONE_CODE_COLOR[tone],
              'text-[clamp(5rem,14vw,9rem)] leading-none',
            ].join(' ')}
            aria-hidden="true"
          >
            {code}
          </motion.div>
        )}

        {resolvedIcon && (
          <motion.div
            variants={iconVariants}
            animate={
              expressive
                ? { y: [0, -6, 0], opacity: 1, scale: 1, rotate: 0 }
                : enableMotion
                  ? 'visible'
                  : false
            }
            transition={
              expressive
                ? { y: { duration: 3.2, ease: 'easeInOut', repeat: Infinity }, default: { type: 'spring', stiffness: 260, damping: 18, delay: 0.15 } }
                : undefined
            }
            className={[
              'w-24 h-24 rounded-2xl flex items-center justify-center border-2 shadow-md',
              TONE_ICON_BG[tone],
            ].join(' ')}
            aria-hidden="true"
          >
            {resolvedIcon}
          </motion.div>
        )}

        <motion.div variants={itemVariants} className="flex flex-col gap-tight max-w-[560px]">
          <h1 className="font-display text-h1 font-bold text-ink-900 m-0 leading-tight">{title}</h1>
          {description && (
            <p className="font-body text-body-lg text-ink-500 leading-relaxed m-0">{description}</p>
          )}
        </motion.div>

        {callout && (
          <motion.div
            variants={itemVariants}
            className="rounded-xl border border-accent-200 bg-gradient-to-br from-accent-50 to-accent-50/40 p-stack-lg text-left max-w-[560px] w-full flex flex-col gap-tight"
          >
            {callout}
          </motion.div>
        )}

        {suggestions && suggestions.length > 0 && (
          <motion.div
            variants={containerVariants}
            className="grid gap-stack w-full max-w-[960px] grid-cols-[repeat(auto-fit,minmax(240px,1fr))]"
          >
            {suggestions.map((item, idx) => (
              <SuggestionCard key={idx} {...item} magnetic={expressive} />
            ))}
          </motion.div>
        )}

        {(primaryAction || secondaryAction) && (
          <motion.div variants={itemVariants} className="flex flex-wrap gap-stack-xs justify-center">
            {primaryAction}
            {secondaryAction}
          </motion.div>
        )}
      </motion.div>
    </div>
  );
};

export default ErrorPage;
