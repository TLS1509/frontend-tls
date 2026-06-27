/**
 * CardGrid — Responsive grid layout for card collections.
 *
 * Fully migrated to Tailwind v4 — no BEM classes.
 *
 * ## Layouts (choisir selon le TYPE de card hébergée) :
 *
 * | layout         | Cols (mobile / tablet / desktop) | Cas d'usage |
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

const LAYOUT_CLASSES: Record<CardGridLayout, string> = {
  compact: 'grid-cols-2',
  default: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
  feature: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4',
  /* ⭐ square-tiles : pattern canonique Phase 10 pour cards SQUARE (jamais 1-col)
     Mobile 2 cols → ~150px · Tablet 3 cols → ~180px · Desktop 4 cols → ~200px */
  'square-tiles': 'grid-cols-2 sm:grid-cols-3 lg:grid-cols-4',
  /* tiles : pour mini-cards non-square (QuickActionButton, etc.) */
  tiles: 'grid-cols-2 sm:grid-cols-3 lg:grid-cols-3',
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

  return (
    <div className={classes} {...rest}>
      {children}
    </div>
  );
};

export default CardGrid;
