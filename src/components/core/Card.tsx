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
  | 'sunken';
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

const BASE = 'flex flex-col rounded-xl text-ink-900 font-body text-body-sm transition-all duration-200';

const VARIANT_CLASSES: Record<CardVariant, string> = {
  default: 'bg-white border border-ink-200 shadow-sm hover:border-ink-300 hover:shadow-md',
  feature: 'bg-white shadow-md hover:shadow-lg',
  elevated: 'bg-white shadow-md hover:shadow-lg',
  interactive: 'bg-white border border-ink-200 shadow-sm cursor-pointer hover:-translate-y-1 hover:shadow-lg hover:border-primary-300 active:-translate-y-0.5',
  glass:       'backdrop-blur-[20px] backdrop-saturate-[180%] bg-gradient-to-br from-white/70 to-white/35 border border-white/60 shadow-sm hover:shadow-md',
  'glass-brand': 'backdrop-blur-[20px] backdrop-saturate-[180%] bg-gradient-to-br from-primary-500/[22%] to-primary-500/[6%] border border-primary-500/25 shadow-sm hover:shadow-brand-sm',
  'glass-warm':  'backdrop-blur-[20px] backdrop-saturate-[180%] bg-gradient-to-br from-secondary-500/[12%] to-accent-400/5 border border-secondary-500/[15%] shadow-sm hover:shadow-warm-sm',
  'glass-dark':  'backdrop-blur-[20px] backdrop-saturate-[180%] bg-[radial-gradient(circle_at_0%_0%,#55A1B4_0%,#2F5F6A_60%,#1F3E45_100%)] border border-white/20 shadow-lg hover:shadow-xl text-white/95',
  minimal:  'bg-transparent border border-ink-200 hover:bg-ink-50 hover:border-ink-300',
  bordered: 'bg-white border-2 border-primary-200 shadow-xs hover:border-primary-400 hover:shadow-sm',
  muted:    'bg-ink-50 border border-ink-200',
  sunken:   'bg-ink-100 border border-ink-200',
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
  const classes = [
    BASE,
    VARIANT_CLASSES[variant],
    SIZE_CLASSES[size],
    tone && TONE_BG_CLASSES[tone],
    interactive && variant !== 'interactive' && INTERACTIVE_EXTRA,
    onClick && CLICKABLE,
    className,
  ]
    .filter(Boolean)
    .join(' ');

  const hasPropsContent = eyebrow || title || description || footer || icon;

  const eyebrowClass = `font-mono text-micro font-bold uppercase tracking-[0.08em] ${tone ? TONE_EYEBROW_CLASSES[tone] : 'text-ink-500'}`;
  const titleClass = `m-0 p-0 font-display ${TITLE_SIZE[size]} font-semibold leading-tight tracking-tight ${tone ? TONE_TITLE_CLASSES[tone] : 'text-ink-900'}`;
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
    className={`m-0 p-0 font-display text-h4 font-semibold leading-tight tracking-tight text-ink-900 ${className}`}
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
