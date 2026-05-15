/**
 * Persistence stores — Zustand + localStorage.
 *
 * Stores :
 *  - `useBookmarksStore`             : items mis en favori (Veille, Articles, Dossiers, Magazine…)
 *  - `useReadingProgressStore`       : % de lecture par article/dossier
 *  - `useNotificationsStore`         : unread count (session only)
 *  - `useFilterPrefsStore`           : filter selections (Veille, Notifications, Messages)
 *  - `useLessonProgressStore`        : dernière section vue par leçon (LessonPlayer)
 *  - `usePositioningStore` (Cahier #01) : UserPositioningResult (parcours positioning quiz results)
 *
 * Tous utilisent le middleware `persist` qui écrit dans localStorage avec
 * versioning automatique (clés `tls-*`), sauf useNotificationsStore (in-memory).
 */

import { useEffect } from 'react';
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import type { UserPositioningResult, PositioningAnswer } from '../types/learning';

/* ─── 1. Bookmarks ──────────────────────────────────────────────────────── */

interface BookmarksState {
  /** Items bookmarked. Key = item id (e.g. "veille-a1", "article-r2"). */
  ids: string[];
  /** Toggle bookmark on/off. */
  toggle: (id: string) => void;
  /** Add a bookmark. */
  add: (id: string) => void;
  /** Remove a bookmark. */
  remove: (id: string) => void;
  /** Check if an id is bookmarked. */
  has: (id: string) => boolean;
  /** Reset all bookmarks. */
  clear: () => void;
}

export const useBookmarksStore = create<BookmarksState>()(
  persist(
    (set, get) => ({
      ids: [],
      toggle: (id) =>
        set((state) => ({
          ids: state.ids.includes(id)
            ? state.ids.filter((x) => x !== id)
            : [...state.ids, id],
        })),
      add: (id) =>
        set((state) =>
          state.ids.includes(id) ? state : { ids: [...state.ids, id] }
        ),
      remove: (id) => set((state) => ({ ids: state.ids.filter((x) => x !== id) })),
      has: (id) => get().ids.includes(id),
      clear: () => set({ ids: [] }),
    }),
    {
      name: 'tls-bookmarks',
      storage: createJSONStorage(() => localStorage),
      version: 1,
    }
  )
);

/* ─── 2. Reading progress (articles / dossiers / magazine) ──────────────── */

interface ReadingProgressState {
  /** Map item id → % progression (0–100). */
  progress: Record<string, number>;
  /** Set progress for an item. */
  set: (id: string, percent: number) => void;
  /** Get progress (0 if not started). */
  get: (id: string) => number;
  /** Mark as fully read (100 %). */
  markRead: (id: string) => void;
  /** Remove an entry. */
  clear: (id: string) => void;
  /** Reset all. */
  reset: () => void;
}

export const useReadingProgressStore = create<ReadingProgressState>()(
  persist(
    (set, get) => ({
      progress: {},
      set: (id, percent) =>
        set((state) => ({
          progress: { ...state.progress, [id]: Math.max(0, Math.min(100, percent)) },
        })),
      get: (id) => get().progress[id] ?? 0,
      markRead: (id) =>
        set((state) => ({ progress: { ...state.progress, [id]: 100 } })),
      clear: (id) =>
        set((state) => {
          const next = { ...state.progress };
          delete next[id];
          return { progress: next };
        }),
      reset: () => set({ progress: {} }),
    }),
    {
      name: 'tls-reading-progress',
      storage: createJSONStorage(() => localStorage),
      version: 1,
    }
  )
);

/**
 * Convenience hook : auto-persist a progress % to `useReadingProgressStore`.
 * Debounced via React batching — write only when value changes.
 *
 * Usage in an editorial page :
 *   const progress = useReadingProgress(articleRef);  // from ReadingProgress pattern
 *   useReadingProgressSync(`article-${id}`, progress);
 */
export const useReadingProgressSync = (id: string, percent: number) => {
  const setProgress = useReadingProgressStore((s) => s.set);
  useEffect(() => {
    if (id && percent > 0) setProgress(id, percent);
  }, [id, percent, setProgress]);
};

/* ─── 3.bis Notifications unread count (session — pas persist localStorage) ── */

interface NotificationsState {
  unreadCount: number;
  setUnreadCount: (n: number) => void;
  decrementUnread: () => void;
  reset: () => void;
}

/**
 * In-memory store (pas persist) — le count est computé depuis les notifs
 * réelles côté API. Ici un store partagé pour que Sidebar affiche le badge
 * de manière réactive.
 */
export const useNotificationsStore = create<NotificationsState>((set) => ({
  unreadCount: 0,
  setUnreadCount: (n) => set({ unreadCount: Math.max(0, n) }),
  decrementUnread: () =>
    set((state) => ({ unreadCount: Math.max(0, state.unreadCount - 1) })),
  reset: () => set({ unreadCount: 0 }),
}));

/* ─── 4. Filter persistence (Veille / Notifications / Messages) ─────────── */

interface FilterPrefsState {
  /** Map page key → selected filter ids (array). */
  filters: Record<string, string[]>;
  /** Set filter selection for a page. */
  set: (page: string, ids: string[]) => void;
  /** Get filter selection for a page (or empty array if none). */
  get: (page: string) => string[];
  /** Clear a page filter. */
  clear: (page: string) => void;
}

export const useFilterPrefsStore = create<FilterPrefsState>()(
  persist(
    (set, get) => ({
      filters: {},
      set: (page, ids) =>
        set((state) => ({ filters: { ...state.filters, [page]: ids } })),
      get: (page) => get().filters[page] ?? [],
      clear: (page) =>
        set((state) => {
          const next = { ...state.filters };
          delete next[page];
          return { filters: next };
        }),
    }),
    {
      name: 'tls-filter-prefs',
      storage: createJSONStorage(() => localStorage),
      version: 1,
    }
  )
);

/* ─── 5. Lesson progress (LessonPlayer) ─────────────────────────────────── */

export interface ActionPlan {
  objectif: string;
  action1: string;
  action2: string;
  action3: string;
}

interface LessonProgressEntry {
  /** Last section index viewed. */
  lastSection: number;
  /** Sections completed (index list). */
  completed: number[];
  /** Total section count for ratio compute. */
  totalSections: number;
  /** Last viewed timestamp (ms). */
  lastVisited: number;
  /** Réfléchir section: keyed textarea answers (e.g. "q0", "q1"). */
  reflections?: Record<string, string>;
  /** Appliquer section: action plan fields. */
  actionPlan?: ActionPlan;
}

interface LessonProgressState {
  /** Map lessonId → progress entry. */
  lessons: Record<string, LessonProgressEntry>;
  /** Record visit to a section. */
  setSection: (lessonId: string, section: number, totalSections: number) => void;
  /** Mark section as completed. */
  completeSection: (lessonId: string, section: number) => void;
  /** Persist a single reflection answer. */
  setReflection: (lessonId: string, key: string, value: string) => void;
  /** Persist the full action plan. */
  setActionPlan: (lessonId: string, plan: ActionPlan) => void;
  /** Get entry for a lesson (or default if not started). */
  get: (lessonId: string) => LessonProgressEntry | null;
  /** Percent complete based on completed sections vs total. */
  percent: (lessonId: string) => number;
  /** Reset one lesson. */
  reset: (lessonId: string) => void;
  /** Reset all. */
  clear: () => void;
}

export const useLessonProgressStore = create<LessonProgressState>()(
  persist(
    (set, get) => ({
      lessons: {},
      setSection: (lessonId, section, totalSections) =>
        set((state) => ({
          lessons: {
            ...state.lessons,
            [lessonId]: {
              lastSection: section,
              completed: state.lessons[lessonId]?.completed ?? [],
              totalSections,
              lastVisited: Date.now(),
            },
          },
        })),
      completeSection: (lessonId, section) =>
        set((state) => {
          const existing = state.lessons[lessonId];
          if (!existing) return state;
          const nextCompleted = existing.completed.includes(section)
            ? existing.completed
            : [...existing.completed, section];
          return {
            lessons: {
              ...state.lessons,
              [lessonId]: {
                ...existing,
                completed: nextCompleted,
                lastVisited: Date.now(),
              },
            },
          };
        }),
      setReflection: (lessonId, key, value) =>
        set((state) => {
          const existing = state.lessons[lessonId];
          if (!existing) return state;
          return {
            lessons: {
              ...state.lessons,
              [lessonId]: {
                ...existing,
                reflections: { ...existing.reflections, [key]: value },
              },
            },
          };
        }),
      setActionPlan: (lessonId, plan) =>
        set((state) => {
          const existing = state.lessons[lessonId];
          if (!existing) return state;
          return {
            lessons: {
              ...state.lessons,
              [lessonId]: { ...existing, actionPlan: plan },
            },
          };
        }),
      get: (lessonId) => get().lessons[lessonId] ?? null,
      percent: (lessonId) => {
        const entry = get().lessons[lessonId];
        if (!entry || entry.totalSections === 0) return 0;
        return Math.round((entry.completed.length / entry.totalSections) * 100);
      },
      reset: (lessonId) =>
        set((state) => {
          const next = { ...state.lessons };
          delete next[lessonId];
          return { lessons: next };
        }),
      clear: () => set({ lessons: {} }),
    }),
    {
      name: 'tls-lesson-progress',
      storage: createJSONStorage(() => localStorage),
      version: 1,
    }
  )
);

/* ─── 6. User Positioning Results (Cahier #01 — Phase 16.1) ──────────────── */

interface PositioningState {
  /** Map `userId|parcoursId` → UserPositioningResult */
  results: Record<string, UserPositioningResult>;
  /** Save a positioning result. */
  set: (userId: string, parcoursId: string, answers: PositioningAnswer[], completedAt?: string) => void;
  /** Retrieve result for user + parcours (or null if not found). */
  get: (userId: string, parcoursId: string) => UserPositioningResult | null;
  /** Check if user has already completed positioning for a parcours (for skip logic). */
  hasCompleted: (userId: string, parcoursId: string) => boolean;
  /** Clear all positioning results. */
  clear: () => void;
}

export const usePositioningStore = create<PositioningState>()(
  persist(
    (set, get) => ({
      results: {},
      set: (userId, parcoursId, answers, completedAt) =>
        set((state) => {
          const key = `${userId}|${parcoursId}`;
          return {
            results: {
              ...state.results,
              [key]: {
                userId,
                parcoursId,
                answers,
                completedAt: completedAt ?? new Date().toISOString(),
              },
            },
          };
        }),
      get: (userId, parcoursId) => {
        const key = `${userId}|${parcoursId}`;
        return get().results[key] ?? null;
      },
      hasCompleted: (userId, parcoursId) => {
        const key = `${userId}|${parcoursId}`;
        return !!get().results[key];
      },
      clear: () => set({ results: {} }),
    }),
    {
      name: 'tls-positioning',
      storage: createJSONStorage(() => localStorage),
      version: 1,
    }
  )
);
