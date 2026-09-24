import React from 'react';
import { cx, GAP, type Space, type PolymorphicProps } from './_layout';
import { WIDTH, type ContainerWidth } from './widths';

/**
 * PageShell — the canonical page scaffold in one element.
 *
 * Encodes the pattern repeated on nearly every route:
 *   `max-w-… mx-auto px-4 sm:px-6 lg:px-10 py-section md:py-section-lg
 *    lg:py-page flex flex-col gap-section`
 * i.e. width cap + centering + responsive horizontal gutter + responsive
 * vertical padding + vertical section rhythm.
 *
 * Renders as <div> by default — the app shell (App.tsx) already owns the single
 * <main> landmark, so this nests inside it. Pass `as="section"` to make the
 * page content a labelled region; only pass `as="main"` for routes rendered
 * OUTSIDE the shell (auth / fullscreen).
 *
 *   <PageShell>                       // page (1152px), 48px section rhythm
 *   <PageShell width="wide">          // dashboards
 *   <PageShell width="content" gap="stack-lg">  // focused / form pages
 *
 * ── Le rythme par défaut : 48 px entre sections (passe typographique du
 *    2026-09-24) ─────────────────────────────────────────────────────────────
 * La doctrine (§ 5) pose 48 px ENTRE sections et 16 entre un titre de section
 * et son contenu : un rapport de 3:1, pour qu'un titre se lise avec ce qu'il
 * introduit et pas avec ce qui le précède. Le défaut était `section` (32) —
 * 2:1 seulement, sur 101 des 107 pages qui le prennent tel quel. L'en-tête
 * de page reste dans la fourchette voulue (32 à 48 px avant le contenu).
 *
 *   <PageShell>                                     // 48 px entre sections
 *     <PageHero … />
 *     <section className="flex flex-col gap-stack"> // 16 px titre → contenu
 *       <SectionHeader title="…" />
 *
 * Une page dense (formulaire, outil) garde la main : `gap="section"` ou moins.
 *
 * ── Ce que `className` déclare remplace la base (2026-09-24) ───────────────
 * La base posait toujours `flex flex-col` et le `gap` de la prop. Une page qui
 * écrivait `flex-row` n'ajoutait qu'une seconde direction, et c'est l'ordre
 * d'émission de Tailwind qui tranchait (piège n°6) : la barre collante du
 * détail de journal, celles de la newsletter et de l'édition hebdo
 * s'empilaient, et chaque page avait fini par sortir de `PageShell`. Mêmes
 * règles que `Card` (OWN_DISPLAY, OWN_DIRECTION, OWN_GAP), classes NUES
 * seulement — un `md:flex-row` s'ajoute à la colonne de base :
 *   - une disposition déclarée (`grid`, `flex`, `block`…) retire `flex` et
 *     `flex-col` : la page a dit ce qu'elle voulait ;
 *   - une direction déclarée seule (`flex-row`…) ne retire que `flex-col` ;
 *   - un `gap-*` déclaré remplace celui de la prop `gap`.
 */

const OWN_DISPLAY = /(?:^|\s)(?:flex|inline-flex|grid|inline-grid|block|inline-block|inline|contents|hidden|table)(?=\s|$)/;
const OWN_DIRECTION = /(?:^|\s)flex-(?:row|col)(?:-reverse)?(?=\s|$)/;
const OWN_GAP = /(?:^|\s)gap-\S+/;

interface PageShellOwnProps {
  width?: ContainerWidth;
  /** Vertical rhythm between top-level sections. Default `page` (48px) — doctrine § 5. */
  gap?: Space;
  /**
   * Remove the responsive top padding.
   * Use when the first child (hero, EditorialHero, compact strip) already
   * provides its own top breathing room — avoids the double-spacing of
   * container-top (48px) + hero-top (32px).
   * Bottom padding is kept so the last section breathes above the footer.
   */
  noPadTop?: boolean;
  className?: string;
  children?: React.ReactNode;
}

export function PageShell<E extends React.ElementType = 'div'>({
  as,
  width = 'page',
  gap = 'page',
  noPadTop = false,
  className = '',
  children,
  ...rest
}: PolymorphicProps<E, PageShellOwnProps>) {
  const Tag = (as || 'div') as React.ElementType;
  const ownDisplay = OWN_DISPLAY.test(className);
  return (
    <Tag
      className={cx(
        WIDTH[width],
        'mx-auto w-full',
        // Horizontal gutter is owned by AppLayout <main> (single source of truth,
        // applied to every page). PageShell only owns width cap + vertical rhythm.
        noPadTop
          ? 'pb-section md:pb-section-lg lg:pb-page'
          : 'py-section md:py-section-lg lg:py-page',
        !ownDisplay && 'flex',
        !ownDisplay && !OWN_DIRECTION.test(className) && 'flex-col',
        !OWN_GAP.test(className) && GAP[gap],
        className,
      )}
      {...rest}
    >
      {children}
    </Tag>
  );
}

export default PageShell;
