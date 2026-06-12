import React from 'react';
import { ChevronRight } from 'lucide-react';

export interface BreadcrumbItem {
  label: React.ReactNode;
  icon?: React.ReactNode;
  href?: string;
  onClick?: (e: React.MouseEvent) => void;
}

export interface BreadcrumbProps extends React.HTMLAttributes<HTMLElement> {
  items: BreadcrumbItem[];
  /** 'simple' = anchor links + text separator (default). 'nav' = buttons + ChevronRight + pill highlights. */
  variant?: 'simple' | 'nav';
  separator?: React.ReactNode;
  sticky?: boolean;
  /** Collapse items beyond this count to '…' (nav variant only). Default: show all. */
  maxVisible?: number;
  /** Callback when any item is clicked (nav variant). */
  onNavigate?: (index: number) => void;
  /** Index of current/active item. Defaults to last item. */
  current?: number;
}

const STICKY_CLASSES = 'sticky top-0 z-sticky py-3 px-4 backdrop-blur-sm bg-white/85 border-b border-ink-200';

// ─── Simple variant (anchor links) ──────────────────────────────────────────

const SimpleItem: React.FC<{ item: BreadcrumbItem; isLast: boolean }> = ({ item, isLast }) =>
  isLast ? (
    <span className="text-ink-900 font-semibold cursor-default" aria-current="page">
      {item.label}
    </span>
  ) : (
    <a
      className="text-ink-600 no-underline rounded-xs transition-colors hover:text-primary-600 hover:underline hover:underline-offset-[3px] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500"
      href={item.href ?? '#'}
      onClick={item.onClick as React.MouseEventHandler<HTMLAnchorElement>}
    >
      {item.label}
    </a>
  );

// ─── Nav variant (buttons + pill highlight) ──────────────────────────────────

const NavItem: React.FC<{
  item: BreadcrumbItem;
  index: number;
  isCurrent: boolean;
  isEllipsis?: boolean;
  onNavigate?: (i: number) => void;
}> = ({ item, index, isCurrent, isEllipsis, onNavigate }) => {
  const isClickable = !isCurrent && !isEllipsis && (item.href || onNavigate);

  const baseClasses = 'inline-flex items-center gap-tight.5 px-2 py-1 rounded-md transition-[background-color,color] duration-fast ease-emphasis text-body-sm';
  const currentClasses = 'bg-primary-50 text-ink-900 font-semibold';
  const defaultClasses = 'text-ink-500';
  const clickableClasses = 'cursor-pointer hover:bg-primary-50 hover:text-primary-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500';
  const ellipsisClasses = 'w-7 h-7 justify-center text-ink-400 hover:bg-ink-50 cursor-default';

  if (isEllipsis) {
    return (
      <span
        className={[baseClasses, ellipsisClasses].join(' ')}
        aria-label="Plus d'éléments"
      >
        …
      </span>
    );
  }

  const content = (
    <>
      {item.icon && <span aria-hidden="true" className="inline-flex items-center shrink-0">{item.icon}</span>}
      <span>{item.label}</span>
    </>
  );

  if (isClickable) {
    return (
      <button
        type="button"
        className={[baseClasses, defaultClasses, clickableClasses, 'bg-transparent border-0'].join(' ')}
        onClick={() => {
          if (item.href) window.location.href = item.href as string;
          onNavigate?.(index);
        }}
        aria-current={isCurrent ? 'page' : undefined}
      >
        {content}
      </button>
    );
  }

  return (
    <span
      className={[baseClasses, isCurrent ? currentClasses : defaultClasses].join(' ')}
      aria-current={isCurrent ? 'page' : undefined}
    >
      {content}
    </span>
  );
};

// ─── Canonical Breadcrumb ────────────────────────────────────────────────────

export const Breadcrumb: React.FC<BreadcrumbProps> = ({
  items,
  variant = 'simple',
  separator = variant === 'nav' ? undefined : '/',
  sticky = false,
  maxVisible,
  onNavigate,
  current,
  className = '',
  ...rest
}) => {
  const currentIndex = current ?? items.length - 1;

  const navClasses = [
    'flex items-center flex-wrap gap-stack-xs text-body-sm font-body text-ink-600 m-0 p-0 list-none',
    sticky && STICKY_CLASSES,
    className,
  ]
    .filter(Boolean)
    .join(' ');

  if (variant === 'nav') {
    const displayItems: (BreadcrumbItem | null)[] =
      maxVisible && items.length > maxVisible
        ? [items[0], null, ...items.slice(-(maxVisible - 1))]
        : items;

    return (
      <nav className={navClasses} aria-label="Fil d'Ariane" {...rest}>
        <ol className="list-none m-0 p-0 flex flex-wrap items-center gap-tight">
          {displayItems.map((item, idx) => {
            const isEllipsis = item === null;
            const originalIndex = isEllipsis ? -1 : items.indexOf(item!);
            const isCurrent = originalIndex === currentIndex;

            return (
              <li key={idx} className="inline-flex items-center gap-tight">
                <NavItem
                  item={item ?? { label: '…' }}
                  index={originalIndex}
                  isCurrent={isCurrent}
                  isEllipsis={isEllipsis}
                  onNavigate={onNavigate}
                />
                {idx < displayItems.length - 1 && (
                  <ChevronRight size={14} className="text-ink-300 shrink-0 mx-0.5" aria-hidden="true" />
                )}
              </li>
            );
          })}
        </ol>
      </nav>
    );
  }

  // simple variant
  return (
    <nav aria-label="Fil d'Ariane" className={navClasses} {...rest}>
      {items.map((item, idx) => {
        const isLast = idx === items.length - 1;
        return (
          <React.Fragment key={idx}>
            <SimpleItem item={item} isLast={isLast} />
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
};

export default Breadcrumb;
