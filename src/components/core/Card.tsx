import React from 'react';

/**
 * Card — Source of truth: design-system/spec.json → components.Card
 *
 * Self-contained content container.
 *
 * Variants:
 *   - default: bordered, white background
 *   - feature: highlighted, elevated shadow, no border
 *   - elevated: shadow-based depth
 *   - interactive: hover lift effect
 *   - glass: frosted glass effect
 *   - minimal: borderless, transparent
 *
 * Tones (optional accent): primary | warm | sun | brand
 * Sizes: sm | md | lg
 */

export type CardVariant =
  | 'default'
  | 'feature'
  | 'elevated'
  | 'interactive'
  | 'glass'
  | 'glass-brand'
  | 'glass-warm'
  | 'glass-dark'
  | 'minimal'
  | 'bordered'
  | 'muted'
  | 'sunken'
  /** Tinted gradient — REQUIRES the `tone` prop to render properly.
      Used as the surface for ParcoursCard / learning hubs. */
  | 'tinted';
export type CardTone = 'primary' | 'warm' | 'sun' | 'brand';
export type CardSize = 'sm' | 'md' | 'lg';

export interface CardBadgeConfig {
  label: string;
  tone?: CardTone;
  icon?: React.ReactNode;
  variant?: 'primary' | 'warm' | 'sun' | 'success' | 'danger';
  position?: 'top-right' | 'top-left';
}

export interface CardProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'title'> {
  variant?: CardVariant;
  tone?: CardTone;
  size?: CardSize;
  /** Render as semantic element (article, section, div, etc.) */
  as?: keyof React.JSX.IntrinsicElements;

  /* ── Props-based content ── */
  eyebrow?: React.ReactNode;
  title?: React.ReactNode;
  description?: React.ReactNode;
  footer?: React.ReactNode;
  icon?: React.ReactNode;
  children?: React.ReactNode;

  /* ── Interaction ── */
  onClick?: (e: React.MouseEvent<HTMLDivElement>) => void;
  /** Hover lift effect (additive — also enabled by variant="interactive") */
  interactive?: boolean;
}

// [&[role=button]] arbitrary variants neutralize the legacy BEM rule in
// components-modern.css (`[role="button"] { height:40px; overflow:hidden }`)
// so a Card with role="button" doesn't get clipped to a 40px tall
// mini-button. Padding/border-radius/display are already set by BASE +
// SIZE_CLASSES in @layer utilities and beat the @layer components rule.
// See CLAUDE.md piège #8.
// [&[role=button]]:h-auto neutralizes the BEM rule in components-modern.css
// that sets height:40px on every [role="button"] element (piège #8).
// We intentionally do NOT add overflow-visible here so that cards with
// overflow-hidden in their className can still clip their rounded corners.
// Piège #8 — components-modern.css imposes these on every [role="button"] :
//   `height: 40px` (clips card to mini-button height)
//   `font-weight: 600` (semibold inherited by all descendants)
//   `align-items: center` (children no longer stretch to fill cross-axis,
//     causing inner content to overflow narrow cards horizontally)
// All three are neutralized below for clickable Cards.
const BASE = 'flex flex-col rounded-xl text-ink-900 font-body text-body-sm transition-all duration-200 [&[role=button]]:h-auto [&[role=button]]:font-normal [&[role=button]]:items-stretch';

const VARIANT_CLASSES: Record<CardVariant, string> = {
  // shadow-card: warm-tinted resting shadow (Phase 19.D gap #5)
  // shadow-card-hover on hover → lift still uses shadow-card-lift for strong elevation
  default: 'bg-white border border-ink-200 shadow-card hover:border-ink-300 hover:shadow-card-hover',
  feature: 'bg-white shadow-card-hover hover:shadow-card-lift',
  elevated: 'bg-white shadow-card-hover hover:shadow-card-lift',
  interactive: 'bg-white border border-ink-200 shadow-card cursor-pointer hover:-translate-y-1 hover:shadow-card-lift hover:border-primary-300 hover:bg-primary-50/30 active:-translate-y-0.5',
  glass:       'backdrop-blur-glass-medium backdrop-saturate-[180%] bg-gradient-to-br from-white/70 to-white/35 border border-white/60 shadow-sm hover:shadow-md',
  'glass-brand': 'backdrop-blur-glass-medium backdrop-saturate-[180%] bg-gradient-to-br from-primary-500/[22%] to-primary-500/[6%] border border-primary-500/25 shadow-sm hover:shadow-brand-sm',
  'glass-warm':  'backdrop-blur-glass-medium backdrop-saturate-[180%] bg-gradient-to-br from-secondary-500/[12%] to-accent-400/5 border border-secondary-500/[15%] shadow-sm hover:shadow-warm-sm',
  'glass-dark':  'backdrop-blur-glass-medium backdrop-saturate-[180%] bg-[radial-gradient(circle_at_0%_0%,#55A1B4_0%,#2F5F6A_60%,#1F3E45_100%)] border border-white/20 shadow-lg hover:shadow-xl text-white/95',
  minimal:  'bg-transparent border border-ink-200 hover:bg-ink-50 hover:border-ink-300',
  bordered: 'bg-white border-2 border-primary-200 shadow-xs hover:border-primary-400 hover:shadow-sm',
  muted:    'bg-ink-50 border border-ink-200',
  sunken:   'bg-ink-100 border border-ink-200',
  // `tinted` provides only the border + shadow defaults — the actual gradient
  // bg is supplied by TONE_GRADIENT_BG_CLASSES via the `tone` prop. Falls back
  // to a neutral white surface if no tone is set.
  tinted:   'bg-white border shadow-xs',
};

/**
 * Gradient tone backgrounds — applied when variant="tinted" combined with a
 * tone. Replaces the standalone ToneAwareCard's TONE_CLASSES to keep the
 * styling in one place.
 */
const TONE_GRADIENT_BG_CLASSES: Record<CardTone, string> = {
  primary: 'bg-gradient-to-br from-primary-50/95 to-primary-100/60 border-primary-200/60',
  warm:    'bg-gradient-to-br from-secondary-50/95 to-secondary-100/60 border-secondary-200/60',
  sun:     'bg-gradient-to-br from-accent-50/95 to-accent-100/60 border-accent-200/60',
  brand:   'bg-gradient-to-br from-primary-50/95 to-primary-100/60 border-primary-200/60',
};

const SIZE_CLASSES: Record<CardSize, string> = {
  sm: 'p-4 gap-2',
  md: 'p-6 gap-3',
  lg: 'p-8 gap-4',
};

const TONE_BG_CLASSES: Record<CardTone, string> = {
  primary: 'bg-primary-50 border-primary-200',
  warm: 'bg-secondary-50 border-secondary-200',
  sun: 'bg-accent-50 border-accent-200',
  brand: 'bg-primary-50 border-primary-200',
};

const TONE_TITLE_CLASSES: Record<CardTone, string> = {
  primary: 'text-primary-900',
  warm: 'text-secondary-900',
  sun: 'text-accent-900',
  brand: 'text-primary-900',
};

const TONE_EYEBROW_CLASSES: Record<CardTone, string> = {
  primary: 'text-primary-500',
  warm: 'text-secondary-600',
  sun: 'text-accent-600',
  brand: 'text-primary-600',
};

// When variant="interactive" (or interactive=true) is combined with a tone,
// override the hardcoded primary hover colors with tone-specific ones.
const TONE_INTERACTIVE_HOVER: Record<CardTone, string> = {
  primary: 'hover:border-primary-300 hover:shadow-brand-sm hover:bg-primary-50/50',
  warm:    'hover:border-secondary-300 hover:shadow-warm-sm hover:bg-secondary-50/50',
  sun:     'hover:border-accent-300 hover:shadow-sun-sm hover:bg-accent-50/50',
  brand:   'hover:border-primary-300 hover:shadow-brand-sm hover:bg-primary-50/50',
};

const INTERACTIVE_EXTRA = 'cursor-pointer hover:-translate-y-1 hover:shadow-lg active:translate-y-0';
const CLICKABLE = 'cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500';

const TITLE_SIZE: Record<CardSize, string> = {
  sm: 'text-h5',
  md: 'text-h4',
  lg: 'text-h3',
};

const DESC_SIZE: Record<CardSize, string> = {
  sm: 'text-caption',
  md: 'text-body-sm',
  lg: 'text-body',
};

const ICON_SIZE: Record<CardSize, string> = {
  sm: '[&>svg]:w-8 [&>svg]:h-8',
  md: '[&>svg]:w-10 [&>svg]:h-10',
  lg: '[&>svg]:w-14 [&>svg]:h-14',
};

export const Card: React.FC<CardProps> = ({
  variant = 'default',
  tone,
  size = 'md',
  as = 'div',
  className = '',
  eyebrow,
  title,
  description,
  footer,
  icon,
  children,
  onClick,
  interactive = false,
  ...rest
}) => {
  // tinted variant uses the gradient tone map; other variants use the flat
  // tone bg map (existing behavior).
  const toneBgClasses = tone
    ? variant === 'tinted'
      ? TONE_GRADIENT_BG_CLASSES[tone]
      : TONE_BG_CLASSES[tone]
    : '';

  // When interactive + tone, override the hardcoded primary hover with tone colors.
  const isInteractive = variant === 'interactive' || interactive;
  const toneInteractiveClasses = isInteractive && tone ? TONE_INTERACTIVE_HOVER[tone] : '';

  const classes = [
    BASE,
    VARIANT_CLASSES[variant],
    SIZE_CLASSES[size],
    toneBgClasses,
    toneInteractiveClasses,
    interactive && variant !== 'interactive' && INTERACTIVE_EXTRA,
    onClick && CLICKABLE,
    className,
  ]
    .filter(Boolean)
    .join(' ');

  const hasPropsContent = eyebrow || title || description || footer || icon;

  const eyebrowClass = `font-mono text-micro font-bold uppercase tracking-[0.08em] ${tone ? TONE_EYEBROW_CLASSES[tone] : 'text-ink-500'}`;
  // tracking-display for large/medium titles (≥h3 = 1.375rem) for premium tightness
  const titleClass = `m-0 p-0 font-display ${TITLE_SIZE[size]} font-semibold leading-tight ${size === 'lg' ? 'tracking-display' : size === 'md' ? 'tracking-headline' : 'tracking-tight'} ${tone ? TONE_TITLE_CLASSES[tone] : 'text-ink-900'}`;
  const descriptionClass = `m-0 p-0 ${DESC_SIZE[size]} leading-normal text-ink-600`;
  const footerClass = 'flex items-center justify-between gap-3 mt-2 pt-2 border-t border-ink-200 text-caption text-ink-600';
  const iconClass = `flex items-center justify-center shrink-0 mb-2 ${ICON_SIZE[size]} [&>svg]:text-current`;
  const headerClass = 'flex flex-col gap-1 mb-1';

  return React.createElement(
    as as string,
    {
      className: classes,
      onClick,
      role: onClick ? 'button' : undefined,
      tabIndex: onClick ? 0 : undefined,
      onKeyDown: onClick
        ? (e: React.KeyboardEvent) => {
            if (e.key === 'Enter' || e.key === ' ') {
              onClick(e as any);
            }
          }
        : undefined,
      ...rest,
    },
    hasPropsContent ? (
      <>
        {icon && <div className={iconClass}>{icon}</div>}
        {(eyebrow || title) && (
          <div className={headerClass}>
            {eyebrow && <div className={eyebrowClass}>{eyebrow}</div>}
            {title && <h3 className={titleClass}>{title}</h3>}
          </div>
        )}
        {description && <p className={descriptionClass}>{description}</p>}
        {footer && <div className={footerClass}>{footer}</div>}
      </>
    ) : (
      children
    )
  );
};

/**
 * LEGACY EXPORTS (deprecated, kept for backward compatibility)
 * Prefer Card props: <Card title="..." description="..." />
 */
export const CardEyebrow: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({
  className = '',
  ...rest
}) => (
  <div
    className={`font-mono text-micro font-bold uppercase tracking-[0.08em] text-ink-500 ${className}`}
    {...rest}
  />
);

export const CardTitle: React.FC<React.HTMLAttributes<HTMLHeadingElement>> = ({
  className = '',
  ...rest
}) => (
  <h3
    className={`m-0 p-0 font-display text-h4 font-semibold leading-tight tracking-headline text-ink-900 ${className}`}
    {...rest}
  />
);

export const CardDesc: React.FC<React.HTMLAttributes<HTMLParagraphElement>> = ({
  className = '',
  ...rest
}) => (
  <p
    className={`m-0 p-0 text-body-sm leading-normal text-ink-600 ${className}`}
    {...rest}
  />
);

export const CardFooter: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({
  className = '',
  ...rest
}) => (
  <div
    className={`flex items-center justify-between gap-3 mt-2 pt-2 border-t border-ink-200 text-caption text-ink-600 ${className}`}
    {...rest}
  />
);

export default Card;
