/**
 * TableOfContents — sticky aside list with scroll-spy active state.
 *
 * Affiche une liste numérotée de sections (TOC). L'item correspondant à la
 * section actuellement la plus visible dans le viewport est marqué `active`.
 *
 * Usage :
 *   <TableOfContents
 *     items={[
 *       { id: 'intro',        label: 'Introduction' },
 *       { id: 'methodologie', label: 'Méthodologie' },
 *       { id: 'resultats',    label: 'Résultats', completed: true },
 *     ]}
 *     tone="warm"
 *   />
 *
 *   <section id="intro"> … </section>
 *   <section id="methodologie"> … </section>
 *
 * Le composant fournit aussi :
 *   - numérotation auto (01, 02…)
 *   - smooth scroll au clic
 *   - check icon sur items `completed`
 */

import React, { useEffect, useState } from 'react';
import { Check } from 'lucide-react';

export type TocTone = 'brand' | 'warm' | 'sun' | 'neutral';

export interface TocItem {
  id: string;
  label: string;
  completed?: boolean;
}

export interface TableOfContentsProps {
  items: TocItem[];
  tone?: TocTone;
  /** Optional title above the TOC (e.g. "Sommaire"). */
  title?: string;
  /** Scroll margin top (px) for smooth-scroll offset (e.g. sticky header). */
  scrollOffset?: number;
  /** Optional onClick handler called after smooth scroll. */
  onNavigate?: (id: string) => void;
  className?: string;
}

const ACTIVE_TEXT: Record<TocTone, string> = {
  brand:   'text-primary-700',
  warm:    'text-secondary-700',
  sun:     'text-accent-700',
  neutral: 'text-ink-900',
};

const ACTIVE_BG: Record<TocTone, string> = {
  brand:   'bg-primary-50',
  warm:    'bg-secondary-50',
  sun:     'bg-accent-50',
  neutral: 'bg-ink-50',
};

const ACTIVE_BAR: Record<TocTone, string> = {
  brand:   'bg-primary-500',
  warm:    'bg-secondary-500',
  sun:     'bg-accent-400',
  neutral: 'bg-ink-700',
};

const COMPLETED_BG: Record<TocTone, string> = {
  brand:   'bg-primary-100 text-primary-700',
  warm:    'bg-secondary-100 text-secondary-700',
  sun:     'bg-accent-100 text-accent-700',
  neutral: 'bg-success-bg text-success-fg',
};

export const TableOfContents: React.FC<TableOfContentsProps> = ({
  items,
  tone = 'brand',
  title = 'Sommaire',
  scrollOffset = 96,
  onNavigate,
  className = '',
}) => {
  const [activeId, setActiveId] = useState<string | null>(items[0]?.id ?? null);

  useEffect(() => {
    if (items.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        // Pick the entry that is the closest to top of viewport AND intersecting
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible.length > 0) {
          setActiveId(visible[0].target.id);
        }
      },
      {
        // Trigger when section enters top ~30% of viewport
        rootMargin: `-${scrollOffset}px 0px -55% 0px`,
        threshold: 0,
      }
    );

    items.forEach((item) => {
      const el = document.getElementById(item.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [items, scrollOffset]);

  const handleClick = (e: React.MouseEvent, id: string) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (el) {
      const y = el.getBoundingClientRect().top + window.scrollY - scrollOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
      setActiveId(id);
      onNavigate?.(id);
    }
  };

  return (
    <nav
      aria-label={title}
      className={['flex flex-col gap-stack-xs', className].join(' ')}
    >
      {title && (
        <span className="px-3 font-body text-micro font-bold uppercase tracking-wider text-ink-500">
          {title}
        </span>
      )}

      <ol className="m-0 p-0 list-none flex flex-col gap-0.5">
        {items.map((item, index) => {
          const isActive = item.id === activeId;
          const numberLabel = String(index + 1).padStart(2, '0');

          return (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                onClick={(e) => handleClick(e, item.id)}
                className={[
                  'group relative flex items-center gap-3 px-3 py-2.5 rounded-lg',
                  'transition-all duration-base',
                  'hover:translate-x-0.5',
                  isActive
                    ? `${ACTIVE_BG[tone]} ${ACTIVE_TEXT[tone]} font-semibold`
                    : 'text-ink-600 hover:text-ink-900 hover:bg-ink-50',
                ].join(' ')}
              >
                {/* Left active bar */}
                <span
                  aria-hidden
                  className={[
                    'absolute left-0 top-1/2 -translate-y-1/2 w-0.5 rounded-r-pill',
                    'transition-all duration-base',
                    isActive ? `h-6 ${ACTIVE_BAR[tone]}` : 'h-0',
                  ].join(' ')}
                />

                {/* Number badge or check */}
                <span
                  aria-hidden
                  className={[
                    'shrink-0 inline-flex items-center justify-center',
                    'w-6 h-6 rounded-pill text-micro font-bold',
                    item.completed
                      ? COMPLETED_BG[tone]
                      : isActive
                      ? `${ACTIVE_BG[tone]} ${ACTIVE_TEXT[tone]}`
                      : 'bg-ink-100 text-ink-600',
                  ].join(' ')}
                >
                  {item.completed ? <Check size={11} strokeWidth={3} /> : numberLabel}
                </span>

                <span className="font-body text-body-sm leading-snug min-w-0 flex-1 truncate">
                  {item.label}
                </span>
              </a>
            </li>
          );
        })}
      </ol>
    </nav>
  );
};

export default TableOfContents;
