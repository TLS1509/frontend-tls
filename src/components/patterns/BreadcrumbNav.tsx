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
      aria-label="Fil d'Ariane"
    >
      <ol className="list-none m-0 p-0 flex flex-wrap items-center gap-1 font-body text-body-sm">
        {displayItems.map((item, index) => {
          const isEllipsis = item.label === '...';
          const isCurrent = index === current;
          const isClickable = item.href || (onNavigate && !isCurrent);

          const labelClasses = isCurrent
            ? 'font-semibold text-ink-900'
            : 'text-ink-500 hover:text-primary-700';

          return (
            <li key={index} className="inline-flex items-center gap-1">
              {isEllipsis ? (
                <span className="inline-flex items-center justify-center w-7 h-7 rounded-md text-ink-400 hover:bg-ink-50 cursor-default" aria-label="Plus d'éléments">
                  {item.label}
                </span>
              ) : isClickable ? (
                <button
                  className={[
                    'inline-flex items-center gap-1.5 bg-transparent border-0 px-2 py-1 cursor-pointer transition-all rounded-md',
                    'hover:bg-primary-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500',
                    labelClasses,
                  ].join(' ')}
                  onClick={() => handleClick(index, item.href)}
                  aria-current={isCurrent ? 'page' : undefined}
                >
                  {item.icon && (
                    <span aria-hidden="true" className="inline-flex items-center text-current">
                      {item.icon}
                    </span>
                  )}
                  <span>{item.label}</span>
                </button>
              ) : (
                <span
                  className={[
                    'inline-flex items-center gap-1.5 px-2 py-1 rounded-md',
                    isCurrent ? 'bg-primary-50 ' + labelClasses : labelClasses,
                  ].join(' ')}
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
                <ChevronRight size={14} className="text-ink-300 shrink-0 mx-0.5" aria-hidden="true" />
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};

export default BreadcrumbNav;
