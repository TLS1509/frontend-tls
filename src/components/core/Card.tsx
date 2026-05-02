import React from 'react';
import './Card.css';

/**
 * Card — Self-contained content container (TLS Design System)
 *
 * Complete refactor: Props-based API, semantic HTML, single-level nesting
 *
 * Variants:
 *   - default: bordered, surface background
 *   - elevated: shadow-based elevation
 *   - glass: frosted glass effect
 *   - interactive: hover lift with shadow
 *   - minimal: borderless, transparent background
 *
 * Tones: primary | warm | sun | brand (for colored accents)
 *
 * No wrapper components (CardTitle, CardDesc, CardFooter).
 * Use props instead: title, description, footer
 */

export type CardVariant = 'default' | 'feature' | 'elevated' | 'interactive' | 'glass' | 'minimal';
export type CardTone = 'primary' | 'warm' | 'sun' | 'brand';
export type CardSize = 'sm' | 'md' | 'lg';

/** Badge overlay config for card header */
export interface CardBadgeConfig {
  label: string;
  tone?: CardTone;
  icon?: React.ReactNode;
  variant?: 'primary' | 'warm' | 'sun' | 'success' | 'danger';
  position?: 'top-right' | 'top-left';
}

export interface CardProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'title'> {
  /** Content variant/style */
  variant?: CardVariant;
  /** Tone for accent color (if applicable) */
  tone?: CardTone;
  /** Size variant */
  size?: CardSize;
  /** Render as semantic element (article, section, div, etc.) */
  as?: keyof React.JSX.IntrinsicElements;

  /* ── Props-based content (replaces sub-components) ── */
  /** Eyebrow label above title */
  eyebrow?: React.ReactNode;
  /** Main title heading */
  title?: React.ReactNode;
  /** Description text */
  description?: React.ReactNode;
  /** Footer content (actions, metadata) */
  footer?: React.ReactNode;
  /** Icon or image header */
  icon?: React.ReactNode;
  /** Custom children (for flexibility) */
  children?: React.ReactNode;

  /* ── Interaction ── */
  /** Make card clickable */
  onClick?: (e: React.MouseEvent<HTMLDivElement>) => void;
  /** Hover lift effect (only with interactive variant) */
  interactive?: boolean;
}

/**
 * Card — Self-contained container with optional content sections
 *
 * Usage:
 *
 * 1. Props-based (recommended - clean, no nesting):
 *    <Card
 *      variant="elevated"
 *      tone="primary"
 *      eyebrow="FEATURED"
 *      title="Card Title"
 *      description="Card description"
 *      footer={<Button>Action</Button>}
 *    />
 *
 * 2. Children-based (for custom layouts):
 *    <Card variant="default">
 *      <h3>Custom title</h3>
 *      <p>Custom content</p>
 *    </Card>
 */
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
    'card',
    variant !== 'default' && `card--${variant}`,
    tone && `card--tone-${tone}`,
    size !== 'md' && `card--${size}`,
    onClick && 'card--clickable',
    interactive && 'card--interactive',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  // Use custom content OR props-based sections
  const hasPropsContent = eyebrow || title || description || footer || icon;

  return React.createElement(
    as as string,
    {
      className: classes,
      onClick,
      role: onClick ? 'button' : undefined,
      tabIndex: onClick ? 0 : undefined,
      onKeyDown: onClick ? (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          onClick(e as any);
        }
      } : undefined,
      ...rest,
    },
    hasPropsContent ? (
      <>
        {/* Icon section */}
        {icon && <div className="card__icon">{icon}</div>}

        {/* Header section */}
        {(eyebrow || title) && (
          <div className="card__header">
            {eyebrow && <div className="card__eyebrow">{eyebrow}</div>}
            {title && <h3 className="card__title">{title}</h3>}
          </div>
        )}

        {/* Description section */}
        {description && <p className="card__description">{description}</p>}

        {/* Footer section */}
        {footer && <div className="card__footer">{footer}</div>}
      </>
    ) : (
      children
    )
  );
};

/**
 * LEGACY EXPORTS (deprecated, kept for backward compatibility)
 * These will be removed in next major version
 * Use Card props instead: <Card title="..." description="..." />
 */
export const CardEyebrow: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({
  className = '',
  ...rest
}) => <div className={`card__eyebrow ${className}`} {...rest} />;

export const CardTitle: React.FC<React.HTMLAttributes<HTMLHeadingElement>> = ({
  className = '',
  ...rest
}) => <h3 className={`card__title ${className}`} {...rest} />;

export const CardDesc: React.FC<React.HTMLAttributes<HTMLParagraphElement>> = ({
  className = '',
  ...rest
}) => <p className={`card__description ${className}`} {...rest} />;

export const CardFooter: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({
  className = '',
  ...rest
}) => <div className={`card__footer ${className}`} {...rest} />;

export default Card;
