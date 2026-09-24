import React from 'react';
import { ChevronRight } from 'lucide-react';
import { IconChip } from '../ui/IconChip';

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
              'group/item flex items-start gap-stack-sm rounded-md border border-ink-200 bg-white p-3 transition-colors',
              interactive ? 'hover:border-primary-300 hover:bg-primary-50/40 cursor-pointer' : '',
            ]
              .filter(Boolean)
              .join(' ')}
          >
            {item.icon && (
              <IconChip size="md" tone="brand">
                {item.icon}
              </IconChip>
            )}
            {/* Anatomie de rangée (passe typographique du 2026-09-24) : méta
                13/400 ink-600 à 4 px au-dessus du titre · titre 16/600 ink-900 ·
                texte 16/400 ink-700, deux lignes au plus. Sans méta, le bloc
                descend de 6 px pour que la première ligne tombe sur le centre
                de la pastille (6 + 13 = 19, contre 20). */}
            <div className={['flex-1 min-w-0', item.icon && !item.meta ? 'pt-stack-2xs' : ''].join(' ')}>
              {item.meta && (
                <span className="block mb-stack-3xs text-caption text-ink-600">
                  {item.meta}
                </span>
              )}
              <strong className="block font-body text-body font-semibold text-ink-900">
                {item.title}
              </strong>
              {item.description && (
                <p className="m-0 mt-stack-3xs text-body text-ink-700 line-clamp-2">
                  {item.description}
                </p>
              )}
            </div>
            {/* Le chevron désigne toute la rangée : centré sur elle. */}
            {interactive && showArrow && (
              <ChevronRight
                size={16}
                strokeWidth={2.25}
                className="shrink-0 self-center text-ink-400 transition-[transform,opacity,color] duration-fast ease-emphasis opacity-0 -translate-x-1 group-hover/item:opacity-100 group-hover/item:translate-x-0 group-hover/item:text-primary-600"
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
