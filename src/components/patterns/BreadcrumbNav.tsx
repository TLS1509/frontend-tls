import React from 'react';
import { ChevronRight } from 'lucide-react';

export interface BreadcrumbItem {
  label: string;
  icon?: React.ReactNode;
  href?: string;
}

export interface BreadcrumbNavProps {
  items: BreadcrumbItem[];
  current?: number;
  onNavigate?: (index: number) => void;
  className?: string;
}

export const BreadcrumbNav: React.FC<BreadcrumbNavProps> = ({
  items,
  current = items.length - 1,
  onNavigate,
  className = '',
}) => {
  const handleClick = (index: number, href?: string) => {
    if (href) {
      window.location.href = href;
    }
    onNavigate?.(index);
  };

  const displayItems =
    items.length > 3
      ? [items[0], { label: '...', icon: undefined }, ...items.slice(-2)]
      : items;

  return (
    <nav
      className={['flex items-center', className].filter(Boolean).join(' ')}
      aria-label="Breadcrumb"
    >
      <ol className="list-none m-0 p-0 flex flex-wrap items-center gap-1 font-body text-body-sm">
        {displayItems.map((item, index) => {
          const isEllipsis = item.label === '...';
          const isCurrent = index === current;
          const isClickable = item.href || (onNavigate && !isCurrent);

          const labelClasses = isCurrent
            ? 'font-semibold text-ink-900'
            : 'text-ink-500 hover:text-primary-600';

          return (
            <li key={index} className="inline-flex items-center gap-1">
              {isEllipsis ? (
                <span className="text-ink-400 px-1" aria-label="More items">
                  {item.label}
                </span>
              ) : isClickable ? (
                <button
                  className={[
                    'inline-flex items-center gap-1 bg-transparent border-0 px-1 cursor-pointer transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500 rounded-sm',
                    labelClasses,
                  ].join(' ')}
                  onClick={() => handleClick(index, item.href)}
                  aria-current={isCurrent ? 'page' : undefined}
                >
                  {item.icon && (
                    <span aria-hidden="true" className="inline-flex items-center">
                      {item.icon}
                    </span>
                  )}
                  <span>{item.label}</span>
                </button>
              ) : (
                <span
                  className={['inline-flex items-center gap-1 px-1', labelClasses].join(' ')}
                  aria-current={isCurrent ? 'page' : undefined}
                >
                  {item.icon && (
                    <span aria-hidden="true" className="inline-flex items-center">
                      {item.icon}
                    </span>
                  )}
                  <span>{item.label}</span>
                </span>
              )}

              {index < displayItems.length - 1 && (
                <ChevronRight size={16} className="text-ink-400 shrink-0" aria-hidden="true" />
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};

export default BreadcrumbNav;
