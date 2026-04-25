import React from 'react';

/**
 * Card — Source of truth: design-system/spec.json → components.Card
 *
 * Main content unit. Variants:
 *   - default: bordered, no shadow
 *   - feature: no border, shadow-sm, more padding
 *   - interactive: hover lift (translateY + shadow-md)
 *   - glass: glass fill, only on tinted/gradient bg
 */

export type CardVariant = 'default' | 'feature' | 'interactive' | 'glass';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: CardVariant;
  /** Render as a semantic element (article, section, etc.) */
  as?: keyof React.JSX.IntrinsicElements;
}

export const Card: React.FC<CardProps> = ({
  variant = 'default',
  as = 'div',
  className = '',
  children,
  ...rest
}) => {
  const classes = [
    'card',
    variant !== 'default' && `card--${variant}`,
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return React.createElement(
    as as string,
    { className: classes, ...rest },
    children
  );
};

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
}) => <p className={`card__desc ${className}`} {...rest} />;

export const CardFooter: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({
  className = '',
  ...rest
}) => <div className={`card__footer ${className}`} {...rest} />;

export default Card;
