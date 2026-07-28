/**
 * Navigation du showcase — la carte qui manquait.
 *
 * Avant : les 15 catégories s'empilaient sur ~140 000 px sans aucun sommaire.
 * Ici, chaque catégorie est une destination, et l'URL porte l'état.
 *
 * Se nourrit exclusivement du registre : aucun import de composant, donc ce
 * fichier reste léger même si le showcase grossit.
 */
import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { CATEGORY_ORDER, categorySlug, type Category } from './registry';

export interface ShowcaseNavProps {
  /** Nombre de composants réellement rendus par catégorie. */
  counts: Partial<Record<Category, number>>;
  /** Slug actif, ou `undefined` sur la vue « tout ». */
  activeSlug?: string;
}

const LINK_BASE =
  'inline-flex shrink-0 items-center gap-stack-xs px-3 py-1.5 rounded-pill text-body-sm font-semibold whitespace-nowrap ' +
  'transition-colors duration-fast ease-standard ' +
  'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500';

const LINK_IDLE = 'text-ink-600 hover:bg-primary-50 hover:text-primary-700';
const LINK_ACTIVE = 'bg-primary-600 text-white hover:bg-primary-700';

const COUNT_IDLE = 'text-ink-400';
const COUNT_ACTIVE = 'text-white/75';

export const ShowcaseNav: React.FC<ShowcaseNavProps> = ({ counts, activeSlug }) => (
  <nav
    aria-label="Catégories du design system"
    className="sticky top-0 z-sticky -mx-4 px-4 py-stack-xs bg-white/85 backdrop-blur-glass-medium border-b border-ink-100"
  >
    {/* Une seule ligne, qui défile horizontalement. Sur deux lignes ou plus la
        nav dépassait 140 px de haut : elle masquait alors la cible d'un saut
        d'ancre — exactement le défaut qu'on corrige ici. Hauteur stable, donc
        le `scroll-mt-20` posé sur chaque composant suffit à la dégager. */}
    <ul className="flex flex-nowrap items-center gap-stack-xs list-none m-0 p-0 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
      <li>
        <Link
          to="/components"
          aria-current={activeSlug ? undefined : 'page'}
          className={`${LINK_BASE} ${activeSlug ? LINK_IDLE : LINK_ACTIVE}`}
        >
          Tout
        </Link>
      </li>
      {CATEGORY_ORDER.map((cat) => {
        const slug = categorySlug(cat);
        const active = slug === activeSlug;
        const n = counts[cat] ?? 0;
        return (
          <li key={cat}>
            <Link
              to={`/components/${slug}`}
              aria-current={active ? 'page' : undefined}
              className={`${LINK_BASE} ${active ? LINK_ACTIVE : LINK_IDLE}`}
            >
              {cat}
              {n > 0 && (
                <span className={`text-caption font-normal ${active ? COUNT_ACTIVE : COUNT_IDLE}`}>
                  {n}
                </span>
              )}
            </Link>
          </li>
        );
      })}
    </ul>
  </nav>
);

/** Hook : le slug de catégorie de l'URL, s'il est valide. */
export const useCategorySlug = (): string | undefined => {
  const { categorySlug: slug } = useParams<{ categorySlug: string }>();
  return slug;
};

export default ShowcaseNav;
