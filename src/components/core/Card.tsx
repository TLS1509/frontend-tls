import React from 'react';
import {
  CARD_SHADOW_RESTING,
  CARD_SHADOW_RESTING_SM,
  CARD_SHADOW_HOVER_SM,
  CARD_SHADOW_HOVER_MD,
} from '../../lib/tone-classes';

/**
 * Card — Valeurs : src/index.css (@theme) et src/styles/design-tokens.css.
 * Règles d'usage : docs/_canon/REGLES-USAGE-COMPOSANTS.md
 * (design-system/spec.json supprimé le 2026-07-22 : jamais importé, périmé.)
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
export type CardSize = 'xs' | 'sm' | 'md' | 'lg';

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
  // Shadows are tone-aware — applied dynamically via TONE_SHADOW_* maps below.
  // default/interactive/feature/elevated/tinted have no shadow baked in.
  default: 'bg-white border border-ink-200 hover:border-ink-300',
  feature: 'bg-white',
  elevated: 'bg-white',
  // ⚠️ PAS de `hover:shadow-*` codé en dur ici. Tailwind émet `hover:shadow-card-lift`
  // APRÈS `hover:shadow-warm-sm` / `-sun-sm` (offsets 465282 vs 405321 dans le CSS
  // généré) : à spécificité égale, le neutre écrasait donc l'override tone et les
  // cards tonées avaient bordure colorée + ombre noire. L'ombre est posée plus bas
  // par `interactiveHoverShadow`, qui retombe sur `hover:shadow-card-lift` quand il
  // n'y a pas de tone — comportement inchangé pour les cards non tonées.
  // Idem pour border/bg : conservés ici comme défaut sans tone, surchargés par
  // TONE_INTERACTIVE_HOVER (émis après, donc gagnant — vérifié).
  interactive: 'bg-white border border-ink-200 cursor-pointer hover:-translate-y-1 hover:border-primary-300 hover:bg-primary-50/30 active:-translate-y-0.5',
  glass:       'backdrop-blur-glass-medium backdrop-saturate-[180%] bg-gradient-to-br from-white/88 to-white/65 border border-white/75 shadow-[0_2px_12px_rgba(0,0,0,0.06),inset_0_1px_0_rgba(255,255,255,0.9)] hover:shadow-md',
  'glass-brand': 'backdrop-blur-glass-medium backdrop-saturate-[180%] bg-gradient-to-br from-primary-500/[30%] to-primary-500/[12%] border border-primary-500/35 shadow-[0_2px_12px_rgba(45,90,102,0.12),inset_0_1px_0_rgba(255,255,255,0.4)] hover:shadow-brand-sm',
  'glass-warm':  'backdrop-blur-glass-medium backdrop-saturate-[180%] bg-gradient-to-br from-secondary-100/88 to-secondary-50/70 border border-secondary-200/65 shadow-[0_2px_12px_rgba(180,80,20,0.08),inset_0_1px_0_rgba(255,255,255,0.85)] hover:shadow-warm-sm',
  'glass-dark':  'backdrop-blur-glass-medium backdrop-saturate-[180%] bg-[radial-gradient(circle_at_0%_0%,#55A1B4_0%,#2F5F6A_60%,#1F3E45_100%)] border border-white/20 shadow-lg hover:shadow-xl text-white/95',
  minimal:  'bg-transparent border border-ink-200 hover:bg-ink-50 hover:border-ink-300',
  bordered: 'bg-white border-2 border-primary-200 shadow-brand-xs hover:border-primary-400 hover:shadow-brand-sm',
  muted:    'bg-ink-50 border border-ink-200',
  sunken:   'bg-ink-100 border border-ink-200',
  // `tinted` provides only the border + shadow defaults — the actual gradient
  // bg is supplied by TONE_GRADIENT_BG_CLASSES via the `tone` prop. Falls back
  // to a neutral white surface if no tone is set.
  tinted:   'bg-white border shadow-sm backdrop-blur-sm',
};

/**
 * Gradient tone backgrounds — applied when variant="tinted" combined with a
 * tone. Replaces the standalone ToneAwareCard's TONE_CLASSES to keep the
 * styling in one place.
 */
const TONE_GRADIENT_BG_CLASSES: Record<CardTone, string> = {
  primary: 'bg-gradient-to-br from-primary-100/92 to-primary-50/78 border-primary-200/70 shadow-[inset_0_1px_0_rgba(255,255,255,0.85)]',
  warm:    'bg-gradient-to-br from-secondary-100/92 to-secondary-50/78 border-secondary-200/70 shadow-[inset_0_1px_0_rgba(255,255,255,0.85)]',
  sun:     'bg-gradient-to-br from-accent-100/92 to-accent-50/78 border-accent-200/70 shadow-[inset_0_1px_0_rgba(255,255,255,0.85)]',
  brand:   'bg-gradient-to-br from-primary-100/92 to-primary-50/78 border-primary-200/70 shadow-[inset_0_1px_0_rgba(255,255,255,0.85)]',
};

const SIZE_CLASSES: Record<CardSize, string> = {
  xs: 'p-3 gap-stack-xs',
  sm: 'p-4 gap-stack-xs',
  md: 'p-6 gap-stack-xs',
  lg: 'p-8 gap-stack',
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

// Shadow maps imported from tone-classes.ts — single source of truth.
// CARD_SHADOW_RESTING      → xs tint at rest (default/tinted)
// CARD_SHADOW_RESTING_SM   → sm tint at rest (feature/elevated)
// CARD_SHADOW_HOVER_SM     → sm hover (default/tinted)
// CARD_SHADOW_HOVER_MD     → md hover (feature/elevated, interactive)

const INTERACTIVE_EXTRA = 'cursor-pointer hover:-translate-y-1 active:translate-y-0';
const CLICKABLE = 'cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500';

const TITLE_SIZE: Record<CardSize, string> = {
  xs: 'text-h5',
  sm: 'text-h5',
  md: 'text-h4',
  lg: 'text-h3',
};

const DESC_SIZE: Record<CardSize, string> = {
  xs: 'text-caption',
  sm: 'text-caption',
  md: 'text-body-sm',
  lg: 'text-body',
};

const ICON_SIZE: Record<CardSize, string> = {
  xs: '[&>svg]:w-6 [&>svg]:h-6',
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

  // Tone-matched shadow — applied per variant group.
  const isFeatureVariant = variant === 'feature' || variant === 'elevated';
  const isDefaultVariant = variant === 'default' || variant === 'tinted';
  const usesToneShadow = isDefaultVariant || variant === 'interactive' || interactive;

  // feature/elevated: stronger resting + hover shadows (sm/md), tone-aware.
  const featureShadowResting = isFeatureVariant
    ? tone ? CARD_SHADOW_RESTING_SM[tone] : 'shadow-card-hover'
    : '';
  const featureShadowHover = isFeatureVariant
    ? tone ? CARD_SHADOW_HOVER_MD[tone] : 'hover:shadow-card-lift'
    : '';

  // default/tinted/interactive: subtle resting + hover, tone-aware.
  const toneShadowResting = usesToneShadow
    ? tone ? CARD_SHADOW_RESTING[tone] : 'shadow-card'
    : '';
  const toneShadowHover = usesToneShadow && isDefaultVariant
    ? tone ? CARD_SHADOW_HOVER_SM[tone] : 'hover:shadow-card-hover'
    : '';

  // Interactive hover shadow — only when not already covered by toneShadowHover.
  const interactiveHoverShadow = (variant === 'interactive' || interactive) && variant !== 'default' && variant !== 'tinted'
    ? tone ? CARD_SHADOW_HOVER_SM[tone] : 'hover:shadow-card-lift'
    : '';

  // When interactive + tone, override the hardcoded primary hover with tone colors.
  const isInteractive = variant === 'interactive' || interactive;
  const toneInteractiveClasses = isInteractive && tone ? TONE_INTERACTIVE_HOVER[tone] : '';

  const classes = [
    BASE,
    VARIANT_CLASSES[variant],
    SIZE_CLASSES[size],
    toneBgClasses,
    featureShadowResting,
    featureShadowHover,
    toneShadowResting,
    toneShadowHover,
    interactiveHoverShadow,
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
  const footerClass = 'flex items-center justify-between gap-stack-xs mt-2 pt-2 border-t border-ink-200 text-caption text-ink-600';
  const iconClass = `flex items-center justify-center shrink-0 mb-2 ${ICON_SIZE[size]} [&>svg]:text-current`;
  const headerClass = 'flex flex-col gap-tight mb-1';

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
    className={`flex items-center justify-between gap-stack-xs mt-2 pt-2 border-t border-ink-200 text-caption text-ink-600 ${className}`}
    {...rest}
  />
);

export default Card;
