/**
 * SkeletonTemplates — pre-built skeleton shapes matching common card patterns.
 *
 * Évite la duplication de "shimmer placeholder" partout. Chaque template
 * matche la silhouette d'un composant final pour une transition fluide.
 *
 * Révisé le 2026-09-24 : les lignes prennent les pas de texte (`text` 16/26,
 * `caption` 13/20, `title` 20/26 — voir Skeleton), sans hauteur écrite à la
 * main ; les lignes d'un paragraphe se suivent sans `gap` ; les gabarits de
 * carte prennent le rayon (20) et le filet (ink-200) d'une Card.
 *
 * Usage :
 *   {isLoading ? <ParcoursCardSkeleton /> : <ParcoursCard {...} />}
 *   {isLoading ? <SkeletonGrid count={6} template={ParcoursCardSkeleton} /> : <CardGrid>...</CardGrid>}
 */

import React from 'react';
import { Skeleton } from '../ui/Skeleton';

/* ─── Notification row skeleton ─────────────────────────────────────────── */

export const NotificationRowSkeleton: React.FC = () => (
  <div className="flex items-start gap-stack-xs px-3 py-3 sm:px-4 sm:py-3.5 rounded-lg border border-ink-100">
    <Skeleton variant="circle" width={40} height={40} />
    <div className="flex-1 flex flex-col gap-stack-3xs min-w-0">
      <Skeleton variant="text" width="65%" />
      <Skeleton variant="text" width="90%" />
      <Skeleton variant="caption" width="40%" />
    </div>
  </div>
);

/* ─── ParcoursCard / LessonCard skeleton ────────────────────────────────── */

/* L'anatomie de ParcoursCard : titre → 8 → pastilles de méta (24) → 12 → texte,
   puis 24 au-dessus de la barre de progression et du bouton (44). */
export const ParcoursCardSkeleton: React.FC = () => (
  <div className="flex flex-col gap-stack-lg p-stack-lg rounded-xl border border-ink-200 bg-white">
    <div className="flex flex-col gap-stack-sm">
      <div className="flex flex-col gap-stack-xs">
        <Skeleton variant="title" />
        <div className="flex gap-stack-xs">
          <Skeleton variant="block" width={80} height={24} />
          <Skeleton variant="block" width={70} height={24} />
        </div>
      </div>
      <div>
        <Skeleton variant="text" width="100%" />
        <Skeleton variant="text" width="75%" />
      </div>
    </div>
    <div className="flex flex-col gap-stack-sm">
      <Skeleton variant="block" height={8} />
      <Skeleton variant="button" width="100%" />
    </div>
  </div>
);

/* ─── VeilleCard / Editorial card skeleton ──────────────────────────────── */

/* Surtitre → 4 → titre → 8 → texte, sous une couverture ; padding de carte. */
export const EditorialCardSkeleton: React.FC = () => (
  <div className="flex flex-col rounded-xl border border-ink-200 bg-white overflow-hidden">
    <Skeleton variant="block" height={140} className="rounded-none" />
    <div className="p-stack-lg flex flex-col gap-stack-xs">
      <div className="flex flex-col gap-stack-3xs">
        <Skeleton variant="caption" width={80} />
        <Skeleton variant="title" />
      </div>
      <div>
        <Skeleton variant="text" width="100%" />
        <Skeleton variant="text" width="60%" />
      </div>
    </div>
  </div>
);

/* ─── ResumeLessonCard skeleton (Dashboard hero) ────────────────────────── */

export const ResumeLessonSkeleton: React.FC = () => (
  <div className="flex flex-col sm:flex-row gap-stack-lg p-stack-lg rounded-xl border border-ink-200 bg-white">
    <div className="flex-1 flex flex-col gap-stack">
      <div className="flex flex-col gap-stack-3xs">
        <Skeleton variant="caption" width={120} />
        <Skeleton variant="title" width="80%" />
      </div>
      <Skeleton variant="text" width="90%" />
      <div className="flex gap-stack-xs">
        <Skeleton variant="block" width={70} height={24} />
        <Skeleton variant="block" width={70} height={24} />
        <Skeleton variant="block" width={70} height={24} />
      </div>
      <Skeleton variant="block" height={8} />
      <Skeleton variant="button" width={140} />
    </div>
  </div>
);

/* ─── ActivityFeed item skeleton ────────────────────────────────────────── */

export const ActivityItemSkeleton: React.FC = () => (
  <div className="flex items-center gap-stack py-3 border-b border-ink-100 last:border-0">
    <Skeleton variant="circle" width={32} height={32} />
    <div className="flex-1 flex flex-col min-w-0">
      <Skeleton variant="text" width="75%" />
      <Skeleton variant="caption" width="40%" />
    </div>
  </div>
);

/* ─── StatCard skeleton ─────────────────────────────────────────────────── */

/* L'anatomie de StatCard `md` (révisé le 2026-09-24 — le squelette avait
   gardé le rayon 14, le padding 24, une pastille ronde et des blocs de 32 et
   12 px) : carte au rayon 20, padding 20, filet ink-200 · pastille carrée de
   44 au rayon 20 (la forme `card`) · 12 · la valeur au corps de `stat-value`
   (32 → 44) · 4 · le libellé en légende 13/20. Même hauteur que la carte, à
   toutes les largeurs. */
export const StatCardSkeleton: React.FC = () => (
  <div className="flex flex-col p-stack-md rounded-xl border border-ink-200 bg-white">
    <Skeleton variant="card" width={44} height={44} />
    <Skeleton variant="stat" className="mt-stack-sm" />
    <Skeleton variant="caption" width="60%" className="mt-stack-3xs" />
  </div>
);

/* ─── Generic skeleton grid wrapper ─────────────────────────────────────── */

export interface SkeletonGroupProps {
  count?: number;
  template: React.ComponentType;
  layout?: 'list' | 'grid-2' | 'grid-3' | 'grid-4';
  className?: string;
}

const LAYOUT_CLASSES: Record<NonNullable<SkeletonGroupProps['layout']>, string> = {
  list:   'flex flex-col divide-y divide-ink-100',
  'grid-2': 'grid grid-cols-1 sm:grid-cols-2 gap-stack',
  'grid-3': 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-stack',
  'grid-4': 'grid grid-cols-2 sm:grid-cols-4 gap-stack-xs',
};

export const SkeletonGroup: React.FC<SkeletonGroupProps> = ({
  count = 3,
  template: Template,
  layout = 'list',
  className = '',
}) => {
  return (
    <div className={[LAYOUT_CLASSES[layout], className].filter(Boolean).join(' ')} aria-busy="true" aria-live="polite">
      {Array.from({ length: count }).map((_, i) => (
        <Template key={i} />
      ))}
    </div>
  );
};
