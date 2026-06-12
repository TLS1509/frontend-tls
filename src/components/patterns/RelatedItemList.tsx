import React from 'react';
import { ChevronRight } from 'lucide-react';

/**
 * RelatedItemList — vertical list of related/cross-link items.
 *
 * Used inside `EditorialLayout` aside or any content page that needs a
 * compact "Related" / "Dans cette édition" / "Recommandations" list.
 */

export interface RelatedItem {
  id?: string;
  title: React.ReactNode;
  description?: React.ReactNode;
  href?: string;
  onClick?: () => void;
  /** Optional icon shown to the left of the title. */
  icon?: React.ReactNode;
  /** Optional pill / badge rendered above the title. */
  meta?: React.ReactNode;
}

export interface RelatedItemListProps {
  items: RelatedItem[];
  /** Show chevron arrow on hover for clickable items. Default: true. */
  showArrow?: boolean;
  className?: string;
}

export const RelatedItemList: React.FC<RelatedItemListProps> = ({
  items,
  showArrow = true,
  className = '',
}) => {
  return (
    <div className={['flex flex-col gap-stack-xs', className].filter(Boolean).join(' ')}>
      {items.map((item, idx) => {
        const interactive = Boolean(item.href || item.onClick);
        const inner = (
          <article
            className={[
              'group/item flex items-start gap-stack-xs rounded-md border border-ink-200 bg-white p-3 transition-colors',
              interactive ? 'hover:border-primary-300 hover:bg-primary-50/40 cursor-pointer' : '',
            ]
              .filter(Boolean)
              .join(' ')}
          >
            {item.icon && (
              <span className="shrink-0 inline-flex items-center justify-center w-9 h-9 rounded-md bg-primary-50 text-primary-600">
                {item.icon}
              </span>
            )}
            <div className="flex-1 min-w-0">
              {item.meta && (
                <span className="block mb-0.5 text-caption font-medium text-ink-500">
                  {item.meta}
                </span>
              )}
              <strong className="block font-body text-body-sm font-semibold text-ink-900 leading-snug">
                {item.title}
              </strong>
              {item.description && (
                <p className="m-0 mt-0.5 text-caption text-ink-500 leading-relaxed">
                  {item.description}
                </p>
              )}
            </div>
            {interactive && showArrow && (
              <ChevronRight
                size={16}
                strokeWidth={2.25}
                className="shrink-0 mt-1 text-ink-400 transition-[transform,opacity,color] duration-fast ease-emphasis opacity-0 -translate-x-1 group-hover/item:opacity-100 group-hover/item:translate-x-0 group-hover/item:text-primary-600"
              />
            )}
          </article>
        );

        const key = item.id ?? idx;
        if (item.href) {
          return (
            <a
              key={key}
              href={item.href}
              className="block no-underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500 rounded-md"
            >
              {inner}
            </a>
          );
        }
        if (item.onClick) {
          return (
            <button
              key={key}
              type="button"
              onClick={item.onClick}
              className="block w-full text-left p-0 bg-transparent border-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500 rounded-md"
            >
              {inner}
            </button>
          );
        }
        return <div key={key}>{inner}</div>;
      })}
    </div>
  );
};

export default RelatedItemList;
