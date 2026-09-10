/**
 * CardGrid — Responsive grid layout for card collections.
 *
 * Fully migrated to Tailwind v4 — no BEM classes.
 *
 * ## Layouts (choisir selon le TYPE de card hébergée) :
 *
 * | layout         | Cols, selon la largeur de la GRILLE | Cas d'usage |
 * |----------------|----------------------------------|-------------|
 * | `compact`      | 2 / 2 / 2                        | Dense tiles courtes (rare) |
 * | `default`      | 1 / 2 / 3                        | Cards non-square avec contenu variable (ProfileCard, ActionCard, LessonCard) — DEFAULT |
 * | `feature`      | 1 / 2 / 4                        | Cards non-square pour catalogue dense (ArticleCard, CourseCard) |
 * | `square-tiles` | 2 / 3 / 4                        | ⭐ Cards SQUARE / button-shape (IconFeatureCard, KPICard square) — JAMAIS 1-col |
 * | `tiles`        | 2 / 3 / 3                        | Tiles compactes non-square (QuickActionButton, mini-cards) |
 *
 * ⚠️ **Règle Phase 10** : pour toute card avec `aspect-square` (button-shape) → utiliser
 * `layout="square-tiles"`. Les layouts `default`/`feature` partent en `grid-cols-1` sur mobile
 * ce qui rend la card pleine largeur (~600px), et `aspect-square` la force à 600px de haut
 * = carré géant cassé. Voir DESIGN.md §4 "Aspect ratio responsive".
 *
 * autoFit: uses grid-cols-[repeat(auto-fit,minmax(200px,1fr))] — ignores layout.
 *
 * gapSize:
 *   sm    → gap-stack-xs  (8px)
 *   stack → gap-stack     (16px)
 *   md    → gap-stack-lg  (24px)   DEFAULT
 *   lg    → gap-section   (32px)
 */

import React from 'react';

export type CardGridLayout = 'compact' | 'default' | 'feature' | 'square-tiles' | 'tiles';
export type CardGridGapSize = 'sm' | 'stack' | 'md' | 'lg';

export interface CardGridProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  layout?: CardGridLayout;
  gapSize?: CardGridGapSize;
  autoFit?: boolean;
  className?: string;
}

/* Le colonnage suit la largeur de la GRILLE, pas celle de la fenêtre.

   Une grille ne sait pas où elle est posée. Elle peut occuper toute la page, ou
   la colonne étroite d'une mise en page à deux volets, ou le corps d'une modale.
   Réglée sur la fenêtre, elle se trompe dès qu'elle n'est pas pleine largeur —
   et elle se trompait déjà à pleine largeur. Mesuré le 2026-09-09 sur
   /learning-paths à 652 px de fenêtre : la grille faisait 596 px et n'affichait
   **qu'une colonne**, donc une carte de 596 px seule sur sa ligne, alors que la
   place tenait deux colonnes de 282. Le seuil `md:` est à 768 px de fenêtre ;
   la grille, elle, était prête bien avant.

   Les seuils ci-dessous sont donc des largeurs de CONTENEUR, choisies sur la
   largeur de carte visée et non transposées des anciens seuils de fenêtre :

     default        2 col dès 576 px (2 × 272)   ·  3 col dès 896 px (3 × 280)
     feature        2 col dès 576 px             ·  4 col dès 1024 px (4 × 244)
     square-tiles   3 col dès 512 px (3 × 160)   ·  4 col dès 768 px (4 × 180)
     tiles          3 col dès 512 px

   ⚠️ Les crans `@xl`, `@4xl`… ne sont PAS ceux des variantes de fenêtre : ils
   viennent de l'échelle `--container-*` de Tailwind (xl = 36rem, 4xl = 56rem,
   5xl = 64rem), et se lisent en largeur de conteneur. */
const LAYOUT_CLASSES: Record<CardGridLayout, string> = {
  compact: 'grid-cols-2',
  default: 'grid-cols-1 @xl:grid-cols-2 @4xl:grid-cols-3',
  feature: 'grid-cols-1 @xl:grid-cols-2 @5xl:grid-cols-4',
  /* ⭐ square-tiles : pattern canonique Phase 10 pour cards SQUARE (jamais 1-col) */
  'square-tiles': 'grid-cols-2 @lg:grid-cols-3 @3xl:grid-cols-4',
  /* tiles : pour mini-cards non-square (QuickActionButton, etc.) */
  tiles: 'grid-cols-2 @lg:grid-cols-3',
};

const GAP_CLASSES: Record<CardGridGapSize, string> = {
  sm:    'gap-stack-xs',
  stack: 'gap-stack',
  md:    'gap-stack-lg',
  lg:    'gap-section',
};

export const CardGrid: React.FC<CardGridProps> = ({
  children,
  layout = 'default',
  gapSize = 'md',
  autoFit = false,
  className = '',
  ...rest
}) => {
  const classes = [
    'grid',
    autoFit ? 'grid-cols-[repeat(auto-fit,minmax(200px,1fr))]' : LAYOUT_CLASSES[layout],
    GAP_CLASSES[gapSize],
    className,
  ]
    .filter(Boolean)
    .join(' ');

  /* Deux boîtes, et c'est obligatoire.

     Une requête de conteneur remonte à l'ancêtre le plus proche qui en est un —
     **jamais à l'élément qui la porte**. Poser `@container` et `@xl:grid-cols-2`
     sur la même div ne fait donc rien : mesuré au navigateur, la grille gardait
     une seule colonne à 596 px de large alors que le seuil est à 576.

     Le wrapper est le conteneur mesuré ; la grille, à l'intérieur, répond à sa
     largeur. Il ne porte rien d'autre que `@container w-full`, pour rester
     transparent dans une pile flex ou une grille parente. */
  return (
    <div className="@container w-full">
      <div className={classes} {...rest}>
        {children}
      </div>
    </div>
  );
};

export default CardGrid;
