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
import { GRID_CONTAINER, GRID_COLS_CONTENT, GRID_COLS_TILES } from '../../lib/grid-columns';

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
   Seuils, raisons et pièges : src/lib/grid-columns.ts (source unique). */
const LAYOUT_CLASSES: Record<CardGridLayout, string> = {
  compact: GRID_COLS_TILES[2],
  default: GRID_COLS_CONTENT[3],
  feature: GRID_COLS_CONTENT[4],
  /* ⭐ square-tiles : pattern canonique Phase 10 pour cards SQUARE (jamais 1-col) */
  'square-tiles': GRID_COLS_TILES[4],
  /* tiles : pour mini-cards non-square (QuickActionButton, etc.) */
  tiles: GRID_COLS_TILES[3],
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
    <div className={GRID_CONTAINER}>
      <div className={classes} {...rest}>
        {children}
      </div>
    </div>
  );
};

export default CardGrid;
