import React from 'react';

/**
 * Breadcrumb — Source of truth: design-system/spec.json → components.Breadcrumb
 *
 * Trail of ancestor pages. Use for hierarchy ≥ 3 levels.
 * Rule: Last item never clickable. Max 4 levels visible. Mobile: prefer Back button.
 */

export interface BreadcrumbItem {
  label: React.ReactNode;
  href?: string;
  onClick?: (e: React.MouseEvent<HTMLAnchorElement>) => void;
}

export interface BreadcrumbProps extends React.HTMLAttributes<HTMLElement> {
  items: BreadcrumbItem[];
  separator?: React.ReactNode;
}

export const Breadcrumb: React.FC<BreadcrumbProps> = ({
  items,
  separator = '/',
  className = '',
  ...rest
}) => (
  <nav
    aria-label="Fil d'Ariane"
    className={['breadcrumb', className].filter(Boolean).join(' ')}
    {...rest}
  >
    {items.map((item, idx) => {
      const isLast = idx === items.length - 1;
      return (
        <React.Fragment key={idx}>
          {isLast ? (
            <span className="breadcrumb__current" aria-current="page">
              {item.label}
            </span>
          ) : (
            <a href={item.href ?? '#'} onClick={item.onClick}>
              {item.label}
            </a>
          )}
          {!isLast && (
            <span className="breadcrumb__sep" aria-hidden="true">
              {separator}
            </span>
          )}
        </React.Fragment>
      );
    })}
  </nav>
);

export default Breadcrumb;
