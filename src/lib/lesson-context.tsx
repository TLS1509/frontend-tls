/**
 * lesson-context — Lesson navigation context provider.
 *
 * Injects `{ lesson, prev, next, parcoursId, tone }` into LessonPlayer and
 * all viewer pages (Astuces / Flashcards / Complementary / Video) so they
 * know where they sit in the parcours and how to navigate forward / back.
 *
 * Why it matters :
 *  - LessonPlayer close button can route to the next lesson (or back to
 *    PathDetail if no next exists) instead of always returning to the path.
 *  - Viewers can show "Module 2 — Leçon 3 / 5" in their header.
 *  - Tone propagates from the parcours down to the viewers (fix the
 *    Astuces accent-400 / Flashcards primary-500 hardcoded mismatch).
 *
 * Usage :
 *   <LessonProvider value={{ lesson, prev, next, parcoursId, tone }}>
 *     <LessonPlayer />
 *   </LessonProvider>
 *
 * Or directly on a route (typical) :
 *   <LessonContextFromRoute>
 *     <Outlet />
 *   </LessonContextFromRoute>
 *
 * Phase 14.2a — pages consume via `useLessonContext()` hook ; default values
 * are returned when the context is not provided so existing direct routes
 * (e.g. /lesson/:id/astuces accessed standalone) still work.
 */

import React, { createContext, useContext, useMemo } from 'react';
import type { PageTone } from './tone-classes';

export interface LessonNeighbor {
  id: string;
  title: string;
  /** Route to navigate to (e.g. `/learning-paths/1/lessons/3`). */
  href: string;
}

export interface LessonContextValue {
  /** Current lesson identity (id + display title). */
  lesson: {
    id: string;
    title: string;
    /** 1-based position inside the parcours (e.g. 3 for "Leçon 3"). */
    index: number;
    /** Total lessons in the parcours. */
    total: number;
  };
  /** Parent parcours id ; used to route back when no next lesson exists. */
  parcoursId: string;
  /** Tone inherited from the parcours (primary / warm / sun). */
  tone: PageTone;
  /** Previous lesson (null if first). */
  prev: LessonNeighbor | null;
  /** Next lesson (null if last). */
  next: LessonNeighbor | null;
}

const LessonCtx = createContext<LessonContextValue | null>(null);

export interface LessonProviderProps {
  value: LessonContextValue;
  children: React.ReactNode;
}

export const LessonProvider: React.FC<LessonProviderProps> = ({ value, children }) => {
  // Stable reference — avoid re-renders when consumers depend on shallow equality.
  const memoized = useMemo(() => value, [
    value.lesson.id,
    value.lesson.index,
    value.lesson.total,
    value.parcoursId,
    value.tone,
    value.prev?.id ?? null,
    value.next?.id ?? null,
  ]);

  return <LessonCtx.Provider value={memoized}>{children}</LessonCtx.Provider>;
};

/**
 * Consume the lesson context. Returns `null` if no provider is present
 * (e.g. when a viewer is opened from a deep link without going through
 * the parcours flow first). Callers should handle the null case gracefully
 * by falling back to navigate(-1) / parcours hub.
 */
export const useLessonContext = (): LessonContextValue | null => {
  return useContext(LessonCtx);
};

/**
 * Helper : navigate to the next lesson if one exists, otherwise to the
 * parcours hub. Used by LessonPlayer's "Terminer" CTA and the close
 * button when a learner finishes the last section of a lesson.
 */
export function resolveAfterLessonRoute(ctx: LessonContextValue | null): string {
  if (ctx?.next) return ctx.next.href;
  if (ctx?.parcoursId) return `/learning-paths/${ctx.parcoursId}`;
  return '/learning-paths';
}
