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

/* Texte de l'item actif au cran 800 : une couleur de marque ne porte du texte
   qu'à ce cran (doctrine, rôle des couleurs). Il était au 700. */
const ACTIVE_TEXT: Record<TocTone, string> = {
  brand:   'text-primary-800',
  warm:    'text-secondary-800',
  sun:     'text-accent-800',
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
  brand:   'bg-primary-100 text-primary-800',
  warm:    'bg-secondary-100 text-secondary-800',
  sun:     'bg-accent-100 text-accent-800',
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
      {/* Libellé de groupe : 13/600 ink-600, casse normale — la cible des
          libellés de groupe de navigation (2026-09-24). Il était en 500 et en
          ink-500, le cran des placeholders. */}
      {title && (
        <span className="px-3 font-body text-caption font-semibold text-ink-600">
          {title}
        </span>
      )}

      {/* Sommaire au corps 16 : il vit dans une colonne latérale de lecture, à
          côté d'un texte de 16, et ses entrées sont peu nombreuses. 8 px entre
          deux entrées, comme dans la barre latérale : `gap-tight` (2) ne sépare
          pas deux rangées, leurs fonds de survol se touchaient presque. */}
      <ol className="m-0 p-0 list-none flex flex-col gap-stack-xs">
        {items.map((item, index) => {
          const isActive = item.id === activeId;
          const numberLabel = String(index + 1).padStart(2, '0');

          return (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                onClick={(e) => handleClick(e, item.id)}
                className={[
                  'group relative flex items-center gap-stack-xs px-3 py-2.5 rounded-lg min-h-touch',
                  'transition-all duration-base',
                  'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500',
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

                {/* Numéro ou coche. 13/600 en chiffres tabulaires : le pas 11
                    (`micro`) est celui des étiquettes de `Badge`, pas des
                    numéros. */}
                <span
                  aria-hidden
                  className={[
                    'shrink-0 inline-flex items-center justify-center',
                    'w-6 h-6 rounded-pill text-caption font-semibold tabular-nums',
                    item.completed
                      ? COMPLETED_BG[tone]
                      : isActive
                      ? `${ACTIVE_BG[tone]} ${ACTIVE_TEXT[tone]}`
                      : 'bg-ink-100 text-ink-600',
                  ].join(' ')}
                >
                  {item.completed ? <Check size={14} strokeWidth={3} /> : numberLabel}
                </span>

                <span className="font-body text-body min-w-0 flex-1 truncate">
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
