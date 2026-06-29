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
 *  - `useNotificationPrefsStore` (Cahier #09) : UserNotificationPrefs (channel prefs + email tracking)
 *  - `useInAppNotificationsStore` (Cahier #09) : InAppNotification feed (in-app channel, persisted)
 *  - `usePrivacyStore` (Cahier #13bis) : UserGdprConsents + UserAIConsents + DsarRequest[]
 *  - `useEventsStore` (Cahier #08) : MasterclassEnrollment + AtelierEnrollment + EventRegistration + ContentSurvey
 *  - `useHelpcenterStore` (Cahier #13) : FaqArticle + SupportTicket + ArticleFeedback + Tutorial
 *  - `useProjectsStore` (Cahier #11) : SboProject + SboProjectTask + Jac + ProjectAssignment + PasseportEnrichment
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
  UserNotificationPrefs,
  InAppNotification,
  UserGdprConsents,
  UserAIConsents,
  DsarRequest,
  AIDecisionLog,
  LearnerAnalyticsProfile,
  CoachTeamStats,
  ChatSession,
  ChatMessage,
  ChatFeedback,
  MasterclassEnrollment,
  AtelierEnrollment,
  EventRegistration,
  ContentSurvey,
} from '../types/learning';
import type { Masterclass, AtelierPratique, Evenement } from '../data/events';
import type {
  FaqCategory,
  FaqArticle,
  SupportTicket,
  TicketReply,
  ArticleFeedback,
  ArticleReaction,
  Tutorial,
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
import {
  MOCK_IN_APP_NOTIFICATIONS,
  MOCK_USER_NOTIFICATION_PREFS,
} from '../data/notifications';
import {
  MOCK_LEARNER_PROFILES,
  MOCK_COACH_TEAM_STATS,
  MOCK_COACH_ID,
} from '../data/analytics';
import {
  MOCK_PAST_SESSIONS,
  MOCK_CHAT_SESSION_ID,
} from '../data/chatbot';
import {
  MOCK_MASTERCLASSES,
  MOCK_MASTERCLASS_ENROLLMENTS,
  MOCK_ATELIERS,
  MOCK_ATELIER_ENROLLMENTS,
  MOCK_EVENEMENTS,
  MOCK_EVENT_REGISTRATIONS,
  MOCK_SURVEYS,
  MOCK_USER_ID as MOCK_EVENTS_USER_ID,
} from '../data/events';
import {
  FAQ_CATEGORIES,
  FAQ_ARTICLES,
  MOCK_SUPPORT_TICKETS,
  MOCK_TICKET_REPLIES,
  MOCK_ARTICLE_FEEDBACK,
  MOCK_TUTORIALS,
} from '../data/helpcenter';

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
  /** True when all sections have been completed (percent >= 100). */
  isLessonCompleted: (lessonId: string) => boolean;
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
      isLessonCompleted: (lessonId) => {
        const entry = get().lessons[lessonId];
        if (!entry || entry.totalSections === 0) return false;
        return entry.completed.length >= entry.totalSections;
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
  /** Coach-side view : all corrections across all learners (seeds from MOCK on first access). */
  getAllCorrections: () => Correction[];
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

      getAllCorrections: () => {
        // Flatten all per-learner buckets. If nothing is seeded yet, fall back to MOCK_CORRECTIONS
        // grouped by learnerId so the coach view never starts blank.
        const buckets = get().corrections;
        const keys = Object.keys(buckets);
        if (keys.length === 0) {
          // Seed everyone in MOCK at once so subsequent calls hit the cache.
          const groups: Record<string, Correction[]> = {};
          MOCK_CORRECTIONS.forEach((c) => {
            groups[c.learnerId] = [...(groups[c.learnerId] ?? []), c];
          });
          set({ corrections: groups });
          return MOCK_CORRECTIONS;
        }
        return keys.flatMap((k) => buckets[k]);
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

// ─── Store #13 — Notification Preferences (Cahier #09) ───────────────────────

interface NotificationPrefsState {
  prefs: Record<string, UserNotificationPrefs>;
  getPrefs: (userId: string) => UserNotificationPrefs;
  updatePrefs: (userId: string, updates: Partial<UserNotificationPrefs>) => void;
  clear: () => void;
}

export const useNotificationPrefsStore = create<NotificationPrefsState>()(
  persist(
    (set, get) => ({
      prefs: {},

      getPrefs: (userId) => {
        const existing = get().prefs[userId];
        if (existing) return existing;
        const fallback = MOCK_USER_NOTIFICATION_PREFS.userId === userId
          ? MOCK_USER_NOTIFICATION_PREFS
          : { ...MOCK_USER_NOTIFICATION_PREFS, userId };
        set((state) => ({ prefs: { ...state.prefs, [userId]: fallback } }));
        return fallback;
      },

      updatePrefs: (userId, updates) =>
        set((state) => ({
          prefs: {
            ...state.prefs,
            [userId]: {
              ...(state.prefs[userId] ?? MOCK_USER_NOTIFICATION_PREFS),
              ...updates,
              updatedAt: new Date().toISOString(),
            },
          },
        })),

      clear: () => set({ prefs: {} }),
    }),
    {
      name: 'tls-notification-prefs',
      storage: createJSONStorage(() => localStorage),
      version: 1,
    }
  )
);

// ─── Store #14 — In-App Notifications (Cahier #09) ───────────────────────────

interface InAppNotificationsState {
  notifications: Record<string, InAppNotification[]>;
  getNotifications: (userId: string) => InAppNotification[];
  getUnreadCount: (userId: string) => number;
  markAsRead: (userId: string, notifId: string) => void;
  markAllAsRead: (userId: string) => void;
  addNotification: (notif: InAppNotification) => void;
  clear: () => void;
}

export const useInAppNotificationsStore = create<InAppNotificationsState>()(
  persist(
    (set, get) => ({
      notifications: {},

      getNotifications: (userId) => {
        const existing = get().notifications[userId];
        if (existing) return existing;
        const seeded = MOCK_IN_APP_NOTIFICATIONS.filter((n) => n.userId === userId);
        set((state) => ({ notifications: { ...state.notifications, [userId]: seeded } }));
        return seeded;
      },

      getUnreadCount: (userId) =>
        get().getNotifications(userId).filter((n) => !n.isRead).length,

      markAsRead: (userId, notifId) =>
        set((state) => ({
          notifications: {
            ...state.notifications,
            [userId]: (state.notifications[userId] ?? []).map((n) =>
              n.id === notifId ? { ...n, isRead: true } : n
            ),
          },
        })),

      markAllAsRead: (userId) =>
        set((state) => ({
          notifications: {
            ...state.notifications,
            [userId]: (state.notifications[userId] ?? []).map((n) => ({ ...n, isRead: true })),
          },
        })),

      addNotification: (notif) =>
        set((state) => {
          const existing = state.notifications[notif.userId] ?? [];
          return { notifications: { ...state.notifications, [notif.userId]: [notif, ...existing] } };
        }),

      clear: () => set({ notifications: {} }),
    }),
    {
      name: 'tls-in-app-notifications',
      storage: createJSONStorage(() => localStorage),
      version: 1,
    }
  )
);

// ─── Store #15 — Privacy / GDPR (Cahier #13bis) ──────────────────────────────

const DEFAULT_GDPR_CONSENTS = (userId: string): UserGdprConsents => ({
  userId,
  essential: true,  // always true (required by GDPR — platform operation)
  analytics: false, // opt-in
  marketing: false, // opt-in
  bannerDismissed: false,
  lastUpdatedAt: new Date().toISOString(),
});

const DEFAULT_AI_CONSENTS = (userId: string): UserAIConsents => ({
  userId,
  aiRecommendations: true,
  dreyfusAnalysis: true,       // required — always on
  aiContentSuggestions: true,
  aiExerciseFeedback: false,
  modelImprovement: false,
  lastUpdatedAt: new Date().toISOString(),
});

interface PrivacyState {
  gdprConsents: Record<string, UserGdprConsents>;
  aiConsents: Record<string, UserAIConsents>;
  dsarRequests: Record<string, DsarRequest[]>;
  /** Journal de supervision IA append-only (AI Act Art. 14). Key = userId concerné. */
  aiDecisionLog: Record<string, AIDecisionLog[]>;

  getGdprConsents: (userId: string) => UserGdprConsents;
  updateGdprConsents: (userId: string, updates: Partial<UserGdprConsents>) => void;
  getAIConsents: (userId: string) => UserAIConsents;
  updateAIConsents: (userId: string, updates: Partial<UserAIConsents>) => void;
  getDsarRequests: (userId: string) => DsarRequest[];
  addDsarRequest: (request: DsarRequest) => void;
  /** Lire le journal de décisions IA d'un utilisateur (le plus récent en premier). */
  getAIDecisionLog: (userId: string) => AIDecisionLog[];
  /** Append-only : tracer une décision humaine de supervision sur une sortie IA. */
  logAIDecision: (entry: AIDecisionLog) => void;
  clear: () => void;
}

export const usePrivacyStore = create<PrivacyState>()(
  persist(
    (set, get) => ({
      gdprConsents: {},
      aiConsents: {},
      dsarRequests: {},
      aiDecisionLog: {},

      getGdprConsents: (userId) => {
        const existing = get().gdprConsents[userId];
        if (existing) return existing;
        const defaults = DEFAULT_GDPR_CONSENTS(userId);
        set((state) => ({ gdprConsents: { ...state.gdprConsents, [userId]: defaults } }));
        return defaults;
      },

      updateGdprConsents: (userId, updates) =>
        set((state) => ({
          gdprConsents: {
            ...state.gdprConsents,
            [userId]: {
              ...(state.gdprConsents[userId] ?? DEFAULT_GDPR_CONSENTS(userId)),
              ...updates,
              lastUpdatedAt: new Date().toISOString(),
            },
          },
        })),

      getAIConsents: (userId) => {
        const existing = get().aiConsents[userId];
        if (existing) return existing;
        const defaults = DEFAULT_AI_CONSENTS(userId);
        set((state) => ({ aiConsents: { ...state.aiConsents, [userId]: defaults } }));
        return defaults;
      },

      updateAIConsents: (userId, updates) =>
        set((state) => ({
          aiConsents: {
            ...state.aiConsents,
            [userId]: {
              ...(state.aiConsents[userId] ?? DEFAULT_AI_CONSENTS(userId)),
              ...updates,
              drayfusAnalysis: true, // always required
              lastUpdatedAt: new Date().toISOString(),
            },
          },
        })),

      getDsarRequests: (userId) => get().dsarRequests[userId] ?? [],

      addDsarRequest: (request) =>
        set((state) => {
          const existing = state.dsarRequests[request.userId] ?? [];
          return { dsarRequests: { ...state.dsarRequests, [request.userId]: [request, ...existing] } };
        }),

      getAIDecisionLog: (userId) => get().aiDecisionLog[userId] ?? [],

      logAIDecision: (entry) =>
        set((state) => {
          const existing = state.aiDecisionLog[entry.userId] ?? [];
          return { aiDecisionLog: { ...state.aiDecisionLog, [entry.userId]: [entry, ...existing] } };
        }),

      clear: () => set({ gdprConsents: {}, aiConsents: {}, dsarRequests: {}, aiDecisionLog: {} }),
    }),
    {
      name: 'tls-privacy',
      storage: createJSONStorage(() => localStorage),
      version: 1,
    }
  )
);

/* ─── 16. Analytics — Coach Team (Cahier #10) ───────────────────────────── */

interface AnalyticsState {
  /** Key = coachId, value = learner profiles assigned to that coach */
  learnerProfiles: Record<string, LearnerAnalyticsProfile[]>;
  /** Key = coachId */
  teamStats: Record<string, CoachTeamStats>;
  getLearnerProfiles: (coachId: string) => LearnerAnalyticsProfile[];
  getLearnerById: (userId: string) => LearnerAnalyticsProfile | undefined;
  getTeamStats: (coachId: string) => CoachTeamStats;
  clear: () => void;
}

export const useAnalyticsStore = create<AnalyticsState>()(
  persist(
    (set, get) => ({
      learnerProfiles: {},
      teamStats: {},

      getLearnerProfiles: (coachId) => {
        const state = get();
        if (!state.learnerProfiles[coachId]) {
          set((s) => ({
            learnerProfiles: { ...s.learnerProfiles, [coachId]: MOCK_LEARNER_PROFILES },
            teamStats: { ...s.teamStats, [coachId]: MOCK_COACH_TEAM_STATS },
          }));
          return MOCK_LEARNER_PROFILES;
        }
        return state.learnerProfiles[coachId];
      },

      getLearnerById: (userId) => {
        const allCoaches = get().learnerProfiles;
        for (const profiles of Object.values(allCoaches)) {
          const found = profiles.find((p) => p.userId === userId);
          if (found) return found;
        }
        // seed if not found yet
        const all = get().getLearnerProfiles(MOCK_COACH_ID);
        return all.find((p) => p.userId === userId);
      },

      getTeamStats: (coachId) => {
        const state = get();
        if (!state.teamStats[coachId]) {
          get().getLearnerProfiles(coachId);
          return get().teamStats[coachId] ?? MOCK_COACH_TEAM_STATS;
        }
        return state.teamStats[coachId];
      },

      clear: () => set({ learnerProfiles: {}, teamStats: {} }),
    }),
    {
      name: 'tls-analytics',
      storage: createJSONStorage(() => localStorage),
      version: 1,
    }
  )
);

/* ─── 17. Chatbot IA (Cahier #12) ───────────────────────────────────────────── */

interface ChatState {
  /** Key = sessionId */
  sessions: Record<string, ChatSession>;
  getSessions: (userId: string) => ChatSession[];
  getSession: (sessionId: string) => ChatSession | undefined;
  addMessage: (sessionId: string, message: ChatMessage) => void;
  updateFeedback: (sessionId: string, messageId: string, feedback: ChatFeedback) => void;
  deleteSession: (sessionId: string) => void;
  createSession: (session: ChatSession) => void;
  clear: () => void;
}

export const useChatStore = create<ChatState>()(
  persist(
    (set, get) => ({
      sessions: {},

      getSessions: (userId) => {
        const state = get();
        const userSessions = Object.values(state.sessions).filter((s) => s.userId === userId);
        if (userSessions.length === 0) {
          const seeded: Record<string, ChatSession> = {};
          for (const s of MOCK_PAST_SESSIONS) {
            seeded[s.sessionId] = { ...s, userId };
          }
          set({ sessions: seeded });
          return MOCK_PAST_SESSIONS.map((s) => ({ ...s, userId }));
        }
        return userSessions.sort((a, b) => b.updatedAt.localeCompare(a.updatedAt));
      },

      getSession: (sessionId) => {
        const state = get();
        if (!state.sessions[sessionId]) {
          // Seed on first access
          const seeded: Record<string, ChatSession> = {};
          for (const s of MOCK_PAST_SESSIONS) {
            seeded[s.sessionId] = { ...s, userId: 'user-demo' };
          }
          set({ sessions: seeded });
          return seeded[sessionId];
        }
        return state.sessions[sessionId];
      },

      addMessage: (sessionId, message) =>
        set((state) => {
          const session = state.sessions[sessionId];
          if (!session) return state;
          return {
            sessions: {
              ...state.sessions,
              [sessionId]: {
                ...session,
                messages: [...session.messages, message],
                updatedAt: new Date().toISOString(),
              },
            },
          };
        }),

      updateFeedback: (sessionId, messageId, feedback) =>
        set((state) => {
          const session = state.sessions[sessionId];
          if (!session) return state;
          return {
            sessions: {
              ...state.sessions,
              [sessionId]: {
                ...session,
                messages: session.messages.map((m) =>
                  m.id === messageId ? { ...m, feedback } : m
                ),
              },
            },
          };
        }),

      deleteSession: (sessionId) =>
        set((state) => {
          const next = { ...state.sessions };
          delete next[sessionId];
          return { sessions: next };
        }),

      createSession: (session) =>
        set((state) => ({
          sessions: { ...state.sessions, [session.sessionId]: session },
        })),

      clear: () => set({ sessions: {} }),
    }),
    {
      name: 'tls-chat',
      storage: createJSONStorage(() => localStorage),
      version: 1,
    }
  )
);

// Expose the active session ID as a convenience constant
export { MOCK_CHAT_SESSION_ID };

/* ─── 18. Events (Cahier #08 — Masterclass / Atelier / Événements) ──────── */

interface EventsState {
  masterclasses: Masterclass[];
  masterclassEnrollments: MasterclassEnrollment[];
  ateliers: AtelierPratique[];
  atelierEnrollments: AtelierEnrollment[];
  evenements: Evenement[];
  eventRegistrations: EventRegistration[];
  surveys: ContentSurvey[];

  // Getters
  getMasterclassEnrollment: (userId: string, masterclassId: string) => MasterclassEnrollment | undefined;
  getAtelierEnrollment: (userId: string, atelierId: string) => AtelierEnrollment | undefined;
  getEventRegistration: (userId: string, eventId: string) => EventRegistration | undefined;
  getSurvey: (userId: string, contentType: ContentSurvey['contentType'], contentId: string) => ContentSurvey | undefined;

  // Actions
  enrollInMasterclass: (userId: string, masterclassId: string) => void;
  requestAtelierEnrollment: (userId: string, atelierId: string) => void;
  registerForEvent: (userId: string, eventId: string) => void;
  submitSurvey: (survey: Omit<ContentSurvey, 'surveyId' | 'submittedAt'>) => void;
}

export const useEventsStore = create<EventsState>()(
  persist(
    (set, get) => {
      const seed = () => {
        const s = get();
        if (s.masterclasses.length === 0) {
          set({
            masterclasses: MOCK_MASTERCLASSES,
            masterclassEnrollments: MOCK_MASTERCLASS_ENROLLMENTS,
            ateliers: MOCK_ATELIERS,
            atelierEnrollments: MOCK_ATELIER_ENROLLMENTS,
            evenements: MOCK_EVENEMENTS,
            eventRegistrations: MOCK_EVENT_REGISTRATIONS,
            surveys: MOCK_SURVEYS,
          });
        }
      };

      return {
        masterclasses: [],
        masterclassEnrollments: [],
        ateliers: [],
        atelierEnrollments: [],
        evenements: [],
        eventRegistrations: [],
        surveys: [],

        getMasterclassEnrollment: (userId, masterclassId) => {
          seed();
          return get().masterclassEnrollments.find(
            (e) => e.userId === userId && e.masterclassId === masterclassId
          );
        },

        getAtelierEnrollment: (userId, atelierId) => {
          seed();
          return get().atelierEnrollments.find(
            (e) => e.userId === userId && e.atelierId === atelierId
          );
        },

        getEventRegistration: (userId, eventId) => {
          seed();
          return get().eventRegistrations.find(
            (e) => e.userId === userId && e.eventId === eventId
          );
        },

        getSurvey: (userId, contentType, contentId) => {
          seed();
          return get().surveys.find(
            (s) => s.userId === userId && s.contentType === contentType && s.contentId === contentId
          );
        },

        enrollInMasterclass: (userId, masterclassId) => {
          seed();
          const existing = get().getMasterclassEnrollment(userId, masterclassId);
          if (existing) return;
          const enrollment: MasterclassEnrollment = {
            enrollmentId: `enr-mc-${Date.now()}`,
            userId,
            masterclassId,
            status: 'enrolled',
            enrolledAt: new Date().toISOString(),
            attendedLive: false,
            xpAwarded: false,
          };
          set((s) => ({ masterclassEnrollments: [...s.masterclassEnrollments, enrollment] }));
          // Increment enrolled count on masterclass
          set((s) => ({
            masterclasses: s.masterclasses.map((mc) =>
              mc.id === masterclassId ? { ...mc, enrolledCount: mc.enrolledCount + 1 } : mc
            ),
          }));
        },

        requestAtelierEnrollment: (userId, atelierId) => {
          seed();
          const existing = get().getAtelierEnrollment(userId, atelierId);
          if (existing) return;
          const atelier = get().ateliers.find((a) => a.id === atelierId);
          const isWaitlist = atelier ? atelier.enrolledCount >= atelier.maxParticipants : false;
          const waitlistCount = isWaitlist
            ? get().atelierEnrollments.filter((e) => e.atelierId === atelierId && e.status === 'waitlist').length
            : 0;
          const enrollment: AtelierEnrollment = {
            enrollmentId: `enr-at-${Date.now()}`,
            userId,
            atelierId,
            status: isWaitlist ? 'waitlist' : 'pending',
            waitlistPosition: isWaitlist ? waitlistCount + 1 : undefined,
            enrolledAt: new Date().toISOString(),
            attended: false,
            xpAwarded: false,
          };
          set((s) => ({ atelierEnrollments: [...s.atelierEnrollments, enrollment] }));
          if (!isWaitlist) {
            set((s) => ({
              ateliers: s.ateliers.map((a) =>
                a.id === atelierId ? { ...a, enrolledCount: a.enrolledCount + 1 } : a
              ),
            }));
          }
        },

        registerForEvent: (userId, eventId) => {
          seed();
          const existing = get().getEventRegistration(userId, eventId);
          if (existing) return;
          const reg: EventRegistration = {
            registrationId: `reg-ev-${Date.now()}`,
            userId,
            eventId,
            registeredAt: new Date().toISOString(),
            attended: false,
          };
          set((s) => ({
            eventRegistrations: [...s.eventRegistrations, reg],
            evenements: s.evenements.map((ev) =>
              ev.id === eventId ? { ...ev, registeredCount: ev.registeredCount + 1 } : ev
            ),
          }));
        },

        submitSurvey: (data) => {
          seed();
          const existing = get().getSurvey(data.userId, data.contentType, data.contentId);
          if (existing) return;
          const survey: ContentSurvey = {
            ...data,
            surveyId: `srv-${Date.now()}`,
            submittedAt: new Date().toISOString(),
          };
          set((s) => ({ surveys: [...s.surveys, survey] }));
        },
      };
    },
    {
      name: 'tls-events',
      storage: createJSONStorage(() => localStorage),
      version: 1,
    }
  )
);

export { MOCK_EVENTS_USER_ID };

// ─── Store #19 — Helpcenter ──────────────────────────────────────────────────

interface HelpcenterState {
  categories: FaqCategory[];
  articles: FaqArticle[];
  tickets: SupportTicket[];
  ticketReplies: TicketReply[];
  articleFeedback: ArticleFeedback[];
  tutorials: Tutorial[];
}

interface HelpcenterActions {
  searchArticles: (query: string, categoryId?: string) => FaqArticle[];
  getArticle: (slug: string) => FaqArticle | undefined;
  getTickets: (userId: string) => SupportTicket[];
  getTicket: (ticketId: string) => SupportTicket | undefined;
  getTicketReplies: (ticketId: string) => TicketReply[];
  getArticleFeedback: (userId: string, articleId: string) => ArticleFeedback | undefined;
  getTutorials: () => Tutorial[];
  submitFeedback: (userId: string, articleId: string, reaction: ArticleReaction) => void;
  submitTicket: (data: Omit<SupportTicket, 'id' | 'createdAt' | 'updatedAt'>) => SupportTicket;
  addTicketReply: (ticketId: string, userId: string, replyText: string, isAdmin?: boolean) => void;
  markArticleViewed: (articleId: string) => void;
}

export const useHelpcenterStore = create<HelpcenterState & HelpcenterActions>()(
  persist(
    (set, get) => {
      const seed = () => {
        if (get().categories.length === 0) {
          set({
            categories: FAQ_CATEGORIES,
            articles: FAQ_ARTICLES,
            tickets: MOCK_SUPPORT_TICKETS,
            ticketReplies: MOCK_TICKET_REPLIES,
            articleFeedback: MOCK_ARTICLE_FEEDBACK,
            tutorials: MOCK_TUTORIALS,
          });
        }
      };

      return {
        categories: [],
        articles: [],
        tickets: [],
        ticketReplies: [],
        articleFeedback: [],
        tutorials: [],

        searchArticles: (query, categoryId) => {
          seed();
          const { articles } = get();
          const q = query.toLowerCase().trim();
          return articles.filter((a) => {
            if (!a.isPublished) return false;
            if (categoryId && a.categoryId !== categoryId) return false;
            if (!q) return true;
            return (
              a.title.toLowerCase().includes(q) ||
              a.summary.toLowerCase().includes(q) ||
              a.content.toLowerCase().includes(q) ||
              a.tags.some((t) => t.toLowerCase().includes(q))
            );
          });
        },

        getArticle: (slug) => {
          seed();
          return get().articles.find((a) => a.slug === slug || a.id === slug);
        },

        getTickets: (userId) => {
          seed();
          return get().tickets.filter((t) => t.userId === userId);
        },

        getTicket: (ticketId) => {
          seed();
          return get().tickets.find((t) => t.id === ticketId);
        },

        getTicketReplies: (ticketId) => {
          seed();
          return get().ticketReplies.filter((r) => r.ticketId === ticketId);
        },

        getArticleFeedback: (userId, articleId) => {
          seed();
          return get().articleFeedback.find(
            (f) => f.userId === userId && f.articleId === articleId
          );
        },

        getTutorials: () => {
          seed();
          return get().tutorials.sort((a, b) => a.order - b.order);
        },

        submitFeedback: (userId, articleId, reaction) => {
          seed();
          const existing = get().getArticleFeedback(userId, articleId);
          if (existing) {
            set((s) => ({
              articleFeedback: s.articleFeedback.map((f) =>
                f.userId === userId && f.articleId === articleId
                  ? { ...f, reaction }
                  : f
              ),
            }));
            return;
          }
          const feedback: ArticleFeedback = {
            articleId,
            userId,
            reaction,
            createdAt: new Date().toISOString(),
          };
          const delta =
            reaction === 'helpful' || reaction === '👍' ? { helpfulCount: 1 } : { unhelpfulCount: 1 };
          set((s) => ({
            articleFeedback: [...s.articleFeedback, feedback],
            articles: s.articles.map((a) =>
              a.id === articleId
                ? {
                    ...a,
                    helpfulCount: a.helpfulCount + (delta.helpfulCount ?? 0),
                    unhelpfulCount: a.unhelpfulCount + (delta.unhelpfulCount ?? 0),
                  }
                : a
            ),
          }));
        },

        submitTicket: (data) => {
          seed();
          const ticket: SupportTicket = {
            ...data,
            id: `ticket-${Date.now()}`,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
          };
          set((s) => ({ tickets: [...s.tickets, ticket] }));
          return ticket;
        },

        addTicketReply: (ticketId, userId, replyText, isAdmin = false) => {
          seed();
          const reply: TicketReply = {
            id: `reply-${Date.now()}`,
            ticketId,
            userId,
            replyText,
            isAdminReply: isAdmin,
            createdAt: new Date().toISOString(),
          };
          set((s) => ({
            ticketReplies: [...s.ticketReplies, reply],
            tickets: s.tickets.map((t) =>
              t.id === ticketId ? { ...t, updatedAt: new Date().toISOString() } : t
            ),
          }));
        },

        markArticleViewed: (articleId) => {
          seed();
          set((s) => ({
            articles: s.articles.map((a) =>
              a.id === articleId ? { ...a, viewCount: a.viewCount + 1 } : a
            ),
          }));
        },
      };
    },
    {
      name: 'tls-helpcenter',
      storage: createJSONStorage(() => localStorage),
      version: 1,
    }
  )
);

// ─── Store #20 — Projects SBO (Cahier #11) ───────────────────────────────────

import type {
  SboProject,
  SboProjectTask,
  Jac,
  ProjectAssignment,
  PasseportEnrichment,
  ProjectTeamMember,
  GatingCheck,
  TaskStatus,
  JacStatus,
} from '../types/projects';
import type { DreyfusLevel } from '../types/learning';
import {
  MOCK_PROJECTS,
  MOCK_TASKS,
  MOCK_JACS,
  MOCK_ASSIGNMENTS,
  MOCK_ENRICHMENTS,
  MOCK_TEAM_MEMBERS,
  MOCK_PROJECT_COMPANY_ID,
} from '../data/projects';

interface ProjectsState {
  projects: SboProject[];
  tasks: SboProjectTask[];
  jacs: Jac[];
  assignments: ProjectAssignment[];
  enrichments: PasseportEnrichment[];
  teamMembers: ProjectTeamMember[];
}

interface ProjectsActions {
  // Getters (all call seed internally)
  getProjects: (companyId: string) => SboProject[];
  getProject: (projectId: string) => SboProject | undefined;
  getTasks: (projectId: string) => SboProjectTask[];
  getTask: (taskId: string) => SboProjectTask | undefined;
  getJacs: (projectId: string) => Jac[];
  getJac: (jacId: string) => Jac | undefined;
  getTaskJacs: (taskId: string) => Jac[];
  getAssignments: (taskId: string) => ProjectAssignment[];
  getEnrichments: (projectId: string) => PasseportEnrichment[];
  getTeamMembers: (projectId: string) => ProjectTeamMember[];
  checkGating: (userId: string, projectId: string) => GatingCheck[];
  // Actions
  submitTask: (taskId: string, deliverableUrl: string, notes: string) => void;
  updateTaskStatus: (taskId: string, status: TaskStatus) => void;
  submitJacValidation: (
    jacId: string,
    dreyfusLevelAchieved: DreyfusLevel,
    status: JacStatus,
    feedback: string,
    rubricScores?: Jac['rubricScores']
  ) => void;
  addEnrichment: (enrichment: Omit<PasseportEnrichment, 'id' | 'createdAt'>) => void;
}

export const useProjectsStore = create<ProjectsState & ProjectsActions>()(
  persist(
    (set, get) => {
      const seed = () => {
        if (get().projects.length === 0) {
          set({
            projects: MOCK_PROJECTS,
            tasks: MOCK_TASKS,
            jacs: MOCK_JACS,
            assignments: MOCK_ASSIGNMENTS,
            enrichments: MOCK_ENRICHMENTS,
            teamMembers: MOCK_TEAM_MEMBERS,
          });
        }
      };

      return {
        projects: [],
        tasks: [],
        jacs: [],
        assignments: [],
        enrichments: [],
        teamMembers: [],

        getProjects: (companyId) => {
          seed();
          return get().projects.filter((p) => p.companyId === companyId);
        },

        getProject: (projectId) => {
          seed();
          return get().projects.find((p) => p.id === projectId);
        },

        getTasks: (projectId) => {
          seed();
          return get().tasks.filter((t) => t.projectId === projectId);
        },

        getTask: (taskId) => {
          seed();
          return get().tasks.find((t) => t.id === taskId);
        },

        getJacs: (projectId) => {
          seed();
          const taskIds = get().tasks
            .filter((t) => t.projectId === projectId)
            .map((t) => t.id);
          return get().jacs.filter((j) => taskIds.includes(j.taskId));
        },

        getJac: (jacId) => {
          seed();
          return get().jacs.find((j) => j.id === jacId);
        },

        getTaskJacs: (taskId) => {
          seed();
          return get().jacs.filter((j) => j.taskId === taskId);
        },

        getAssignments: (taskId) => {
          seed();
          return get().assignments.filter((a) => a.taskId === taskId);
        },

        getEnrichments: (projectId) => {
          seed();
          return get().enrichments
            .filter((e) => e.projectId === projectId)
            .sort((a, b) => b.createdAt.localeCompare(a.createdAt));
        },

        getTeamMembers: (projectId) => {
          seed();
          const taskIds = new Set(
            get().tasks.filter((t) => t.projectId === projectId).map((t) => t.id)
          );
          return get().teamMembers.filter(
            (m) => m.role === 'manager' || m.assignedTaskIds.some((tid) => taskIds.has(tid))
          );
        },

        checkGating: (userId, projectId) => {
          seed();
          const project = get().projects.find((p) => p.id === projectId);
          if (!project) return [];
          const member = get().teamMembers.find((m) => m.userId === userId);
          if (!member) return [];
          return project.skillProfile.map((req) => {
            const current = (member.currentDreyfusLevels[req.competencyId] ?? 1) as DreyfusLevel;
            return {
              competencyId: req.competencyId,
              competencyName: req.competencyName,
              required: req.dreyfusLevelRequired,
              current,
              passed: current >= req.dreyfusLevelRequired,
            };
          });
        },

        submitTask: (taskId, deliverableUrl, notes) => {
          seed();
          set((s) => ({
            tasks: s.tasks.map((t) =>
              t.id === taskId
                ? {
                    ...t,
                    status: 'submitted' as TaskStatus,
                    deliverableUrl,
                    submissionNotes: notes,
                    submissionDate: new Date().toISOString(),
                    updatedAt: new Date().toISOString(),
                  }
                : t
            ),
          }));
        },

        updateTaskStatus: (taskId, status) => {
          seed();
          set((s) => ({
            tasks: s.tasks.map((t) =>
              t.id === taskId
                ? { ...t, status, updatedAt: new Date().toISOString() }
                : t
            ),
          }));
        },

        submitJacValidation: (jacId, dreyfusLevelAchieved, status, feedback, rubricScores) => {
          seed();
          const now = new Date().toISOString();
          set((s) => ({
            jacs: s.jacs.map((j) =>
              j.id === jacId
                ? {
                    ...j,
                    dreyfusLevelAchieved,
                    status,
                    expertFeedback: feedback,
                    rubricScores,
                    validatedAt: status === 'approved' ? now : undefined,
                  }
                : j
            ),
          }));
          // If approved, update task status to approved
          if (status === 'approved') {
            const jac = get().jacs.find((j) => j.id === jacId);
            if (jac) {
              get().updateTaskStatus(jac.taskId, 'approved');
            }
          }
        },

        addEnrichment: (data) => {
          seed();
          const enrichment: PasseportEnrichment = {
            ...data,
            id: `enrich-${Date.now()}`,
            createdAt: new Date().toISOString(),
          };
          set((s) => ({ enrichments: [...s.enrichments, enrichment] }));
          // Update team member's dreyfus level
          set((s) => ({
            teamMembers: s.teamMembers.map((m) =>
              m.userId === data.collaboratorId
                ? {
                    ...m,
                    currentDreyfusLevels: {
                      ...m.currentDreyfusLevels,
                      [data.competencyId]: data.newDreyfusLevel,
                    },
                  }
                : m
            ),
          }));
        },
      };
    },
    {
      name: 'tls-projects',
      storage: createJSONStorage(() => localStorage),
      version: 1,
    }
  )
);

export { MOCK_PROJECT_COMPANY_ID };

/* ─── 22. Onboarding (Cahier #03 — Phase 19.4) ──────────────────────────── */
/**
 * Centralized onboarding state — tracks progression across pages, persists to
 * localStorage so user can refresh/close-and-reopen without losing progress.
 *
 * AccountType drives flow shape (per Cahier #03 §User Journey #1a/#1b) :
 * - `individual`      : self-signup, payment REQUIRED at end of onboarding
 * - `invited`         : invited by manager/admin, NO payment (company credits or invited role)
 *
 * Step sequence is computed dynamically via `getStepSequence()` :
 * - individual : profile → goals → rhythm → confirmation → questionnaire → payment → tutorial → success
 * - invited    : profile → goals → rhythm → confirmation → questionnaire → tutorial → success
 */

export type OnboardingAccountType = 'individual' | 'invited';

/**
 * Canonical WP role slug (CDC #03 §RBAC) — derived from accountType + selected
 * role in the Onboarding flow. Mirrors `tls_*` slugs used by the WP backend.
 */
export type CanonicalWpRole =
  | 'tls_individual_learner'   // self-signup, individual credits, Stripe billing
  | 'tls_company_learner'      // invited by manager, company pool credits
  | 'tls_company_manager'      // manages entire company (pool, devis, users) — #06 #11bis
  | 'tls_team_manager'         // manages a team within a company (scope: team_id)
  | 'tls_coach'                // coaching FO, validates corrections
  | 'tls_expert'               // post-launch (Marketplace, cross-company)
  | 'administrator';           // Super-Admin (BO WP only)

/**
 * Map (accountType + selected UI role) → canonical WP slug.
 * Used to know which role this user *will* receive once onboarding completes.
 */
export function deriveCanonicalRole(
  accountType: OnboardingAccountType,
  selectedRole: UserRole | null | undefined,
  managerScope?: 'company' | 'team'
): CanonicalWpRole {
  if (selectedRole === 'coach') return 'tls_coach';
  if (selectedRole === 'expert') return 'tls_expert';
  if (selectedRole === 'admin') return 'administrator';
  if (selectedRole === 'manager') {
    return managerScope === 'team' ? 'tls_team_manager' : 'tls_company_manager';
  }
  // selectedRole === 'apprenant' (or unset → default apprenant)
  return accountType === 'invited' ? 'tls_company_learner' : 'tls_individual_learner';
}

export type OnboardingStep =
  | 'profile'        // role + sector
  | 'goals'          // objectives
  | 'rhythm'         // pace / cadence
  | 'confirmation'  // review collected data
  | 'questionnaire' // positioning Q&A (Dreyfus)
  | 'payment'       // ONLY if accountType === 'individual'
  | 'tutorial'      // app tour
  | 'success';      // completion screen

export type SubscriptionPlanId = 'plan_1' | 'plan_2' | 'plan_3';

const ONBOARDING_STEPS_INDIVIDUAL: OnboardingStep[] = [
  'profile', 'goals', 'rhythm', 'confirmation', 'questionnaire', 'payment', 'tutorial', 'success',
];

const ONBOARDING_STEPS_INVITED: OnboardingStep[] = [
  'profile', 'goals', 'rhythm', 'confirmation', 'questionnaire', 'tutorial', 'success',
];

interface OnboardingState {
  // ── Entry context ─────────────────────────────────────────────────────
  accountType: OnboardingAccountType;
  invitationToken: string | null;
  invitedByCompany: string | null;

  // ── Progression ───────────────────────────────────────────────────────
  currentStep: OnboardingStep;
  completedSteps: OnboardingStep[];

  // ── Collected data ────────────────────────────────────────────────────
  firstName: string;
  role: UserRole | null;
  sector: string;
  goals: string[];
  rhythm: string;
  selectedPlan: SubscriptionPlanId | null;

  // ── Actions ───────────────────────────────────────────────────────────
  setAccountType: (type: OnboardingAccountType, opts?: { invitationToken?: string; company?: string }) => void;
  patch: (updates: Partial<Omit<OnboardingState,
    'setAccountType' | 'patch' | 'goToStep' | 'markStepComplete' | 'reset' | 'requiresPayment' | 'getStepSequence' | 'getStepIndex' | 'getProgressPercent' | 'getCanonicalRole'
  >>) => void;
  goToStep: (step: OnboardingStep) => void;
  markStepComplete: (step: OnboardingStep) => void;
  reset: () => void;

  // ── Selectors ─────────────────────────────────────────────────────────
  requiresPayment: () => boolean;
  getStepSequence: () => OnboardingStep[];
  getStepIndex: (step?: OnboardingStep) => number;
  getProgressPercent: () => number;
  /** CDC #03 — Resolve the WP role slug this user will receive. */
  getCanonicalRole: (managerScope?: 'company' | 'team') => CanonicalWpRole;
}

const ONBOARDING_INITIAL: Omit<OnboardingState,
  'setAccountType' | 'patch' | 'goToStep' | 'markStepComplete' | 'reset' | 'requiresPayment' | 'getStepSequence' | 'getStepIndex' | 'getProgressPercent' | 'getCanonicalRole'
> = {
  accountType: 'individual',
  invitationToken: null,
  invitedByCompany: null,
  currentStep: 'profile',
  completedSteps: [],
  firstName: '',
  role: null,
  sector: '',
  goals: [],
  rhythm: '',
  selectedPlan: null,
};

export const useOnboardingStore = create<OnboardingState>()(
  persist(
    (set, get) => ({
      ...ONBOARDING_INITIAL,

      setAccountType: (type, opts) =>
        set({
          accountType: type,
          invitationToken: opts?.invitationToken ?? null,
          invitedByCompany: opts?.company ?? null,
        }),

      patch: (updates) => set((state) => ({ ...state, ...updates })),

      goToStep: (step) => set({ currentStep: step }),

      markStepComplete: (step) =>
        set((state) => ({
          completedSteps: state.completedSteps.includes(step)
            ? state.completedSteps
            : [...state.completedSteps, step],
        })),

      reset: () => set({ ...ONBOARDING_INITIAL }),

      requiresPayment: () => get().accountType === 'individual',

      getStepSequence: () =>
        get().accountType === 'individual' ? ONBOARDING_STEPS_INDIVIDUAL : ONBOARDING_STEPS_INVITED,

      getStepIndex: (step) => {
        const seq = get().getStepSequence();
        return seq.indexOf(step ?? get().currentStep);
      },

      getProgressPercent: () => {
        const seq = get().getStepSequence();
        const idx = seq.indexOf(get().currentStep);
        return idx < 0 ? 0 : Math.round((idx / (seq.length - 1)) * 100);
      },

      getCanonicalRole: (managerScope) =>
        deriveCanonicalRole(get().accountType, get().role, managerScope),
    }),
    {
      name: 'tls-onboarding',
      storage: createJSONStorage(() => localStorage),
      version: 1,
    }
  )
);
