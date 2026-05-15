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
 *  - `usePasseportStore` (Cahier #02) : LearnerCompetency + CompetencyObjective (Passeport)
 *  - `useUserProfileStore` (Cahier #03) : UserProfile (onboarding answers, role, credits)
 *  - `useGamificationStore` (Cahier #05) : XPEvent + UserBadge + UserStreak
 *  - `useJournalStore` (Cahier #07) : JournalEntry (journal de bord réflexif)
 *  - `useCoachingStore` (Cahier #04) : CoachingSession + Correction
 *  - `useEnterpriseStore` (Cahier #06) : CompanyMember + CompanyCohort + ManagerAlert + CompanyStats + CompanyProject
 *
 * Tous utilisent le middleware `persist` qui écrit dans localStorage avec
 * versioning automatique (clés `tls-*`), sauf useNotificationsStore (in-memory).
 */

import { useEffect } from 'react';
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import type {
  UserPositioningResult,
  PositioningAnswer,
  LearnerCompetency,
  CompetencyObjective,
  UserProfile,
  UserRole,
  SubscriptionTier,
  XPEvent,
  UserBadge,
  UserStreak,
  CompetencyProgression,
  JournalEntry,
  CoachingSession,
  Correction,
  CompanyMember,
  CompanyCohort,
  ManagerAlert,
  CompanyStats,
  CompanyProject,
} from '../types/learning';
import {
  MOCK_LEARNER_COMPETENCIES,
  MOCK_COMPETENCY_OBJECTIVES,
  MOCK_COMPETENCY_PROGRESSIONS,
} from '../data/passeport';
import { MOCK_JOURNAL_ENTRIES } from '../data/journal';
import { MOCK_COACHING_SESSIONS, MOCK_CORRECTIONS } from '../data/coaching';
import {
  MOCK_XP_EVENTS,
  MOCK_USER_BADGES,
  MOCK_USER_STREAK,
} from '../data/gamification';
import {
  MOCK_COMPANY_MEMBERS,
  MOCK_COMPANY_COHORTS,
  MOCK_MANAGER_ALERTS,
  MOCK_COMPANY_STATS,
  MOCK_COMPANY_PROJECTS,
  MOCK_COMPANY_ID,
} from '../data/enterprise';

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

/* ─── 7. Passeport Compétences (Cahier #02) ──────────────────────────────── */

interface PasseportState {
  /** Map userId → LearnerCompetency[] */
  competencies: Record<string, LearnerCompetency[]>;
  /** Map userId → CompetencyObjective[] */
  objectives: Record<string, CompetencyObjective[]>;
  /** Map userId → CompetencyProgression[] (timeline) */
  progressions: Record<string, CompetencyProgression[]>;

  /** Get all competency entries for a user (seeds from mock if not yet set). */
  getCompetencies: (userId: string) => LearnerCompetency[];
  /** Update one competency entry. */
  setCompetency: (entry: LearnerCompetency) => void;

  /** Get all objectives for a user. */
  getObjectives: (userId: string) => CompetencyObjective[];
  /** Upsert an objective (create or update by id). */
  setObjective: (objective: CompetencyObjective) => void;
  /** Delete an objective by id. */
  deleteObjective: (userId: string, objectiveId: string) => void;

  /** Get progression timeline for a user (seeds from mock if not yet set). */
  getProgressions: (userId: string) => CompetencyProgression[];
  /** Append a progression event. */
  addProgression: (event: CompetencyProgression) => void;

  /** Reset all Passeport data (useful for testing). */
  clear: () => void;
}

export const usePasseportStore = create<PasseportState>()(
  persist(
    (set, get) => ({
      competencies: {},
      objectives: {},
      progressions: {},

      getCompetencies: (userId) => {
        const existing = get().competencies[userId];
        if (existing) return existing;
        // Seed from mock on first access
        const seeded = MOCK_LEARNER_COMPETENCIES.filter((c) => c.userId === userId);
        const fallback = seeded.length > 0 ? seeded : MOCK_LEARNER_COMPETENCIES;
        set((state) => ({ competencies: { ...state.competencies, [userId]: fallback } }));
        return fallback;
      },

      setCompetency: (entry) =>
        set((state) => {
          const existing = state.competencies[entry.userId] ?? [];
          const updated = existing.some((c) => c.competenceId === entry.competenceId)
            ? existing.map((c) => (c.competenceId === entry.competenceId ? entry : c))
            : [...existing, entry];
          return { competencies: { ...state.competencies, [entry.userId]: updated } };
        }),

      getObjectives: (userId) => {
        const existing = get().objectives[userId];
        if (existing) return existing;
        const seeded = MOCK_COMPETENCY_OBJECTIVES.filter((o) => o.userId === userId);
        const fallback = seeded.length > 0 ? seeded : MOCK_COMPETENCY_OBJECTIVES;
        set((state) => ({ objectives: { ...state.objectives, [userId]: fallback } }));
        return fallback;
      },

      setObjective: (objective) =>
        set((state) => {
          const existing = state.objectives[objective.userId] ?? [];
          const updated = existing.some((o) => o.id === objective.id)
            ? existing.map((o) => (o.id === objective.id ? objective : o))
            : [...existing, objective];
          return { objectives: { ...state.objectives, [objective.userId]: updated } };
        }),

      deleteObjective: (userId, objectiveId) =>
        set((state) => {
          const existing = state.objectives[userId] ?? [];
          return {
            objectives: {
              ...state.objectives,
              [userId]: existing.filter((o) => o.id !== objectiveId),
            },
          };
        }),

      getProgressions: (userId) => {
        const existing = get().progressions[userId];
        if (existing) return existing;
        const seeded = MOCK_COMPETENCY_PROGRESSIONS.filter((p) => p.userId === userId);
        const fallback = seeded.length > 0 ? seeded : MOCK_COMPETENCY_PROGRESSIONS;
        set((state) => ({ progressions: { ...state.progressions, [userId]: fallback } }));
        return fallback;
      },

      addProgression: (event) =>
        set((state) => {
          const existing = state.progressions[event.userId] ?? [];
          return {
            progressions: {
              ...state.progressions,
              [event.userId]: [event, ...existing],
            },
          };
        }),

      clear: () => set({ competencies: {}, objectives: {}, progressions: {} }),
    }),
    {
      name: 'tls-passeport',
      storage: createJSONStorage(() => localStorage),
      version: 1,
    }
  )
);

/* ─── 8. User Profile (Cahier #03 — Onboarding) ─────────────────────────── */

const MOCK_PROFILE: UserProfile = {
  userId: 'user-demo',
  firstName: 'Alex',
  role: 'apprenant',
  sector: 'Tech',
  goals: ['Leadership', 'IA & Tech'],
  rhythm: '30min',
  credits: { classic: 2, special: 0 },
  subscriptionTier: 'plan_1',
};

interface UserProfileState {
  profile: UserProfile | null;
  /** Save or replace the user profile (called on onboarding completion). */
  set: (profile: UserProfile) => void;
  /** Partial update (e.g. update role after onboarding). */
  patch: (updates: Partial<UserProfile>) => void;
  /** Get the profile, seeding from mock if not yet set. */
  get: () => UserProfile;
  /** Clear profile (useful for testing / sign-out). */
  clear: () => void;
}

export const useUserProfileStore = create<UserProfileState>()(
  persist(
    (set, get) => ({
      profile: null,

      set: (profile) => set({ profile }),

      patch: (updates) =>
        set((state) => ({
          profile: state.profile ? { ...state.profile, ...updates } : { ...MOCK_PROFILE, ...updates },
        })),

      get: () => {
        const existing = get().profile;
        if (existing) return existing;
        set({ profile: MOCK_PROFILE });
        return MOCK_PROFILE;
      },

      clear: () => set({ profile: null }),
    }),
    {
      name: 'tls-user-profile',
      storage: createJSONStorage(() => localStorage),
      version: 1,
    }
  )
);

/* ─── 9. Gamification (Cahier #05) ──────────────────────────────────────── */

interface GamificationState {
  xpEvents: Record<string, XPEvent[]>;
  badges: Record<string, UserBadge[]>;
  streaks: Record<string, UserStreak>;

  getXPEvents: (userId: string) => XPEvent[];
  addXPEvent: (event: XPEvent) => void;
  getTotalXP: (userId: string) => number;

  getBadges: (userId: string) => UserBadge[];
  awardBadge: (badge: UserBadge) => void;
  hasBadge: (userId: string, badgeId: string) => boolean;

  getStreak: (userId: string) => UserStreak;
  updateStreak: (streak: UserStreak) => void;

  clear: () => void;
}

export const useGamificationStore = create<GamificationState>()(
  persist(
    (set, get) => ({
      xpEvents: {},
      badges: {},
      streaks: {},

      getXPEvents: (userId) => {
        const existing = get().xpEvents[userId];
        if (existing) return existing;
        const seeded = MOCK_XP_EVENTS.filter((e) => e.userId === userId);
        const fallback = seeded.length > 0 ? seeded : MOCK_XP_EVENTS;
        set((state) => ({ xpEvents: { ...state.xpEvents, [userId]: fallback } }));
        return fallback;
      },

      addXPEvent: (event) =>
        set((state) => {
          const existing = state.xpEvents[event.userId] ?? [];
          return { xpEvents: { ...state.xpEvents, [event.userId]: [event, ...existing] } };
        }),

      getTotalXP: (userId) =>
        get().getXPEvents(userId).reduce((sum, e) => sum + e.xp, 0),

      getBadges: (userId) => {
        const existing = get().badges[userId];
        if (existing) return existing;
        const seeded = MOCK_USER_BADGES.filter((b) => b.userId === userId);
        const fallback = seeded.length > 0 ? seeded : MOCK_USER_BADGES;
        set((state) => ({ badges: { ...state.badges, [userId]: fallback } }));
        return fallback;
      },

      awardBadge: (badge) =>
        set((state) => {
          const existing = state.badges[badge.userId] ?? [];
          if (existing.some((b) => b.badgeId === badge.badgeId)) return state;
          return { badges: { ...state.badges, [badge.userId]: [...existing, badge] } };
        }),

      hasBadge: (userId, badgeId) =>
        get().getBadges(userId).some((b) => b.badgeId === badgeId),

      getStreak: (userId) => {
        const existing = get().streaks[userId];
        if (existing) return existing;
        const fallback = MOCK_USER_STREAK.userId === userId
          ? MOCK_USER_STREAK
          : { ...MOCK_USER_STREAK, userId };
        set((state) => ({ streaks: { ...state.streaks, [userId]: fallback } }));
        return fallback;
      },

      updateStreak: (streak) =>
        set((state) => ({ streaks: { ...state.streaks, [streak.userId]: streak } })),

      clear: () => set({ xpEvents: {}, badges: {}, streaks: {} }),
    }),
    {
      name: 'tls-gamification',
      storage: createJSONStorage(() => localStorage),
      version: 1,
    }
  )
);

// ─── Store #10 — Journal (Cahier #07) ────────────────────────────────────────

interface JournalState {
  entries: Record<string, JournalEntry[]>;
  getEntries: (userId: string) => JournalEntry[];
  addEntry: (entry: JournalEntry) => void;
  updateEntry: (userId: string, id: string, updates: Partial<JournalEntry>) => void;
  deleteEntry: (userId: string, id: string) => void;
  clear: () => void;
}

export const useJournalStore = create<JournalState>()(
  persist(
    (set, get) => ({
      entries: {},

      getEntries: (userId) => {
        const existing = get().entries[userId];
        if (existing) return existing;
        const seeded = MOCK_JOURNAL_ENTRIES.filter((e) => e.userId === userId);
        set((state) => ({ entries: { ...state.entries, [userId]: seeded } }));
        return seeded;
      },

      addEntry: (entry) =>
        set((state) => {
          const existing = state.entries[entry.userId] ?? [];
          return { entries: { ...state.entries, [entry.userId]: [entry, ...existing] } };
        }),

      updateEntry: (userId, id, updates) =>
        set((state) => {
          const existing = state.entries[userId] ?? [];
          return {
            entries: {
              ...state.entries,
              [userId]: existing.map((e) => e.id === id ? { ...e, ...updates } : e),
            },
          };
        }),

      deleteEntry: (userId, id) =>
        set((state) => ({
          entries: {
            ...state.entries,
            [userId]: (state.entries[userId] ?? []).filter((e) => e.id !== id),
          },
        })),

      clear: () => set({ entries: {} }),
    }),
    {
      name: 'tls-journal',
      storage: createJSONStorage(() => localStorage),
      version: 1,
    }
  )
);

// ─── Store #11 — Coaching (Cahier #04) ───────────────────────────────────────

interface CoachingState {
  sessions: Record<string, CoachingSession[]>;
  corrections: Record<string, Correction[]>;
  getSessions: (userId: string) => CoachingSession[];
  addSession: (session: CoachingSession) => void;
  updateSession: (userId: string, id: string, updates: Partial<CoachingSession>) => void;
  getCorrections: (userId: string) => Correction[];
  addCorrection: (correction: Correction) => void;
  updateCorrection: (userId: string, id: string, updates: Partial<Correction>) => void;
  clear: () => void;
}

export const useCoachingStore = create<CoachingState>()(
  persist(
    (set, get) => ({
      sessions: {},
      corrections: {},

      getSessions: (userId) => {
        const existing = get().sessions[userId];
        if (existing) return existing;
        const seeded = MOCK_COACHING_SESSIONS.filter((s) => s.learnerId === userId);
        set((state) => ({ sessions: { ...state.sessions, [userId]: seeded } }));
        return seeded;
      },

      addSession: (session) =>
        set((state) => {
          const existing = state.sessions[session.learnerId] ?? [];
          return { sessions: { ...state.sessions, [session.learnerId]: [session, ...existing] } };
        }),

      updateSession: (userId, id, updates) =>
        set((state) => ({
          sessions: {
            ...state.sessions,
            [userId]: (state.sessions[userId] ?? []).map((s) => s.id === id ? { ...s, ...updates } : s),
          },
        })),

      getCorrections: (userId) => {
        const existing = get().corrections[userId];
        if (existing) return existing;
        const seeded = MOCK_CORRECTIONS.filter((c) => c.learnerId === userId);
        set((state) => ({ corrections: { ...state.corrections, [userId]: seeded } }));
        return seeded;
      },

      addCorrection: (correction) =>
        set((state) => {
          const existing = state.corrections[correction.learnerId] ?? [];
          return { corrections: { ...state.corrections, [correction.learnerId]: [correction, ...existing] } };
        }),

      updateCorrection: (userId, id, updates) =>
        set((state) => ({
          corrections: {
            ...state.corrections,
            [userId]: (state.corrections[userId] ?? []).map((c) => c.id === id ? { ...c, ...updates } : c),
          },
        })),

      clear: () => set({ sessions: {}, corrections: {} }),
    }),
    {
      name: 'tls-coaching',
      storage: createJSONStorage(() => localStorage),
      version: 1,
    }
  )
);

// ─── Store #12 — Enterprise (Cahier #06) ─────────────────────────────────────

interface EnterpriseState {
  members: Record<string, CompanyMember[]>;
  cohorts: Record<string, CompanyCohort[]>;
  alerts: Record<string, ManagerAlert[]>;
  stats: Record<string, CompanyStats>;
  projects: Record<string, CompanyProject[]>;
  getMembers: (companyId: string) => CompanyMember[];
  addMember: (member: CompanyMember) => void;
  updateMember: (companyId: string, id: string, updates: Partial<CompanyMember>) => void;
  getCohorts: (companyId: string) => CompanyCohort[];
  getAlerts: (companyId: string) => ManagerAlert[];
  acknowledgeAlert: (companyId: string, alertId: string) => void;
  getStats: (companyId: string) => CompanyStats;
  getProjects: (companyId: string) => CompanyProject[];
  updateProject: (companyId: string, id: string, updates: Partial<CompanyProject>) => void;
  clear: () => void;
}

export const useEnterpriseStore = create<EnterpriseState>()(
  persist(
    (set, get) => ({
      members: {},
      cohorts: {},
      alerts: {},
      stats: {},
      projects: {},

      getMembers: (companyId) => {
        const existing = get().members[companyId];
        if (existing) return existing;
        const seeded = MOCK_COMPANY_MEMBERS.filter((m) => m.companyId === companyId);
        set((state) => ({ members: { ...state.members, [companyId]: seeded } }));
        return seeded;
      },

      addMember: (member) =>
        set((state) => {
          const existing = state.members[member.companyId] ?? [];
          return { members: { ...state.members, [member.companyId]: [...existing, member] } };
        }),

      updateMember: (companyId, id, updates) =>
        set((state) => ({
          members: {
            ...state.members,
            [companyId]: (state.members[companyId] ?? []).map((m) =>
              m.id === id ? { ...m, ...updates } : m
            ),
          },
        })),

      getCohorts: (companyId) => {
        const existing = get().cohorts[companyId];
        if (existing) return existing;
        const seeded = MOCK_COMPANY_COHORTS.filter((c) => c.companyId === companyId);
        set((state) => ({ cohorts: { ...state.cohorts, [companyId]: seeded } }));
        return seeded;
      },

      getAlerts: (companyId) => {
        const existing = get().alerts[companyId];
        if (existing) return existing;
        const seeded = MOCK_MANAGER_ALERTS.filter((a) => a.companyId === companyId);
        set((state) => ({ alerts: { ...state.alerts, [companyId]: seeded } }));
        return seeded;
      },

      acknowledgeAlert: (companyId, alertId) =>
        set((state) => ({
          alerts: {
            ...state.alerts,
            [companyId]: (state.alerts[companyId] ?? []).map((a) =>
              a.id === alertId ? { ...a, acknowledged: true } : a
            ),
          },
        })),

      getStats: (companyId) => {
        const existing = get().stats[companyId];
        if (existing) return existing;
        const fallback = MOCK_COMPANY_STATS.companyId === companyId
          ? MOCK_COMPANY_STATS
          : { ...MOCK_COMPANY_STATS, companyId };
        set((state) => ({ stats: { ...state.stats, [companyId]: fallback } }));
        return fallback;
      },

      getProjects: (companyId) => {
        const existing = get().projects[companyId];
        if (existing) return existing;
        const seeded = MOCK_COMPANY_PROJECTS.filter((p) => p.companyId === companyId);
        set((state) => ({ projects: { ...state.projects, [companyId]: seeded } }));
        return seeded;
      },

      updateProject: (companyId, id, updates) =>
        set((state) => ({
          projects: {
            ...state.projects,
            [companyId]: (state.projects[companyId] ?? []).map((p) =>
              p.id === id ? { ...p, ...updates } : p
            ),
          },
        })),

      clear: () => set({ members: {}, cohorts: {}, alerts: {}, stats: {}, projects: {} }),
    }),
    {
      name: 'tls-enterprise',
      storage: createJSONStorage(() => localStorage),
      version: 1,
    }
  )
);
