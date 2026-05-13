/**
 * SkeletonTemplates — pre-built skeleton shapes matching common card patterns.
 *
 * Évite la duplication de "shimmer placeholder" partout. Chaque template
 * matche la silhouette d'un composant final pour une transition fluide.
 *
 * Usage :
 *   {isLoading ? <ParcoursCardSkeleton /> : <ParcoursCard {...} />}
 *   {isLoading ? <SkeletonGrid count={6} template={ParcoursCardSkeleton} /> : <CardGrid>...</CardGrid>}
 */

import React from 'react';
import { Skeleton } from '../ui/Skeleton';

/* ─── Notification row skeleton ─────────────────────────────────────────── */

export const NotificationRowSkeleton: React.FC = () => (
  <div className="flex items-start gap-3 px-3 py-3 sm:px-4 sm:py-3.5 rounded-xl border border-ink-100">
    <Skeleton variant="circle" width={36} height={36} />
    <div className="flex-1 flex flex-col gap-1.5 min-w-0">
      <Skeleton variant="text" width="65%" />
      <Skeleton variant="text" width="90%" />
      <Skeleton variant="text" width="40%" height={10} />
    </div>
  </div>
);

/* ─── ParcoursCard / LessonCard skeleton ────────────────────────────────── */

export const ParcoursCardSkeleton: React.FC = () => (
  <div className="flex flex-col gap-stack-xs p-5 rounded-2xl border border-ink-100 bg-white">
    <Skeleton variant="text" width={60} height={16} />
    <Skeleton variant="title" />
    <Skeleton variant="text" width="100%" />
    <Skeleton variant="text" width="75%" />
    <div className="flex gap-2 mt-2">
      <Skeleton variant="button" width={80} height={28} />
      <Skeleton variant="button" width={70} height={28} />
    </div>
    <Skeleton variant="block" height={8} className="mt-2" />
  </div>
);

/* ─── VeilleCard / Editorial card skeleton ──────────────────────────────── */

export const EditorialCardSkeleton: React.FC = () => (
  <div className="flex flex-col rounded-2xl border border-ink-100 bg-white overflow-hidden">
    <Skeleton variant="block" height={140} className="rounded-none" />
    <div className="p-4 flex flex-col gap-stack-xs">
      <Skeleton variant="text" width={80} height={14} />
      <Skeleton variant="title" />
      <Skeleton variant="text" width="100%" />
      <Skeleton variant="text" width="60%" />
    </div>
  </div>
);

/* ─── ResumeLessonCard skeleton (Dashboard hero) ────────────────────────── */

export const ResumeLessonSkeleton: React.FC = () => (
  <div className="flex flex-col sm:flex-row gap-stack-lg p-6 sm:p-8 rounded-3xl border border-ink-100 bg-white">
    <div className="flex-1 flex flex-col gap-stack">
      <Skeleton variant="text" width={120} height={14} />
      <Skeleton variant="title" width="80%" height={32} />
      <Skeleton variant="text" width="90%" />
      <div className="flex gap-3 mt-2">
        <Skeleton variant="text" width={70} height={20} />
        <Skeleton variant="text" width={70} height={20} />
        <Skeleton variant="text" width={70} height={20} />
      </div>
      <Skeleton variant="block" height={8} className="mt-2" />
      <Skeleton variant="button" width={140} className="mt-2" />
    </div>
  </div>
);

/* ─── ActivityFeed item skeleton ────────────────────────────────────────── */

export const ActivityItemSkeleton: React.FC = () => (
  <div className="flex items-center gap-4 py-3 border-b border-ink-100 last:border-0">
    <Skeleton variant="circle" width={32} height={32} />
    <div className="flex-1 flex flex-col gap-1 min-w-0">
      <Skeleton variant="text" width="75%" />
      <Skeleton variant="text" width="40%" height={10} />
    </div>
  </div>
);

/* ─── StatCard skeleton ─────────────────────────────────────────────────── */

export const StatCardSkeleton: React.FC = () => (
  <div className="flex flex-col gap-2 p-5 rounded-xl border border-ink-100 bg-white">
    <Skeleton variant="circle" width={44} height={44} />
    <Skeleton variant="title" width={80} height={32} />
    <Skeleton variant="text" width="60%" height={12} />
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
  'grid-2': 'grid grid-cols-1 sm:grid-cols-2 gap-4',
  'grid-3': 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4',
  'grid-4': 'grid grid-cols-2 sm:grid-cols-4 gap-3',
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
