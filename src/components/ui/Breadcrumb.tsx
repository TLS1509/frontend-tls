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
  sticky?: boolean;
}

const BASE = 'flex items-center flex-wrap gap-2 text-body-sm font-body text-ink-600 m-0 p-0 list-none';
const STICKY = 'sticky top-0 z-30 py-3 px-4 backdrop-blur-sm bg-white/85 border-b border-ink-200';

export const Breadcrumb: React.FC<BreadcrumbProps> = ({
  items,
  separator = '/',
  sticky = false,
  className = '',
  ...rest
}) => (
  <nav
    aria-label="Fil d'Ariane"
    className={[BASE, sticky && STICKY, className].filter(Boolean).join(' ')}
    {...rest}
  >
    {items.map((item, idx) => {
      const isLast = idx === items.length - 1;
      return (
        <React.Fragment key={idx}>
          {isLast ? (
            <span className="text-ink-900 font-semibold cursor-default" aria-current="page">
              {item.label}
            </span>
          ) : (
            <a
              className="text-ink-600 no-underline rounded-xs transition-colors hover:text-primary-600 hover:underline hover:underline-offset-[3px] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500"
              href={item.href ?? '#'}
              onClick={item.onClick}
            >
              {item.label}
            </a>
          )}
          {!isLast && (
            <span className="text-ink-500 select-none shrink-0 text-caption" aria-hidden="true">
              {separator}
            </span>
          )}
        </React.Fragment>
      );
    })}
  </nav>
);

export default Breadcrumb;
