---
target: Dashboard · Coaching · Journal · Veille · LearningPaths
total_score: 20
p0_count: 3
p1_count: 6
timestamp: 2026-06-12T12-00-00Z
slug: dashboard-coaching-journal-veille-learning-paths
---

## Design Health Score

| # | Heuristic | Score | Key Issue |
|---|-----------|-------|-----------|
| 1 | Visibility of System Status | 3 | Progress bars, session badges, ProgressBar fill= work well. No optimistic feedback on store writes. |
| 2 | Match System / Real World | 3 | French copy natural. Coach name inconsistency (Sarah vs Sophie Martin) breaks trust. |
| 3 | User Control and Freedom | 2 | No undo in Journal compose. Filter state has no "Tout effacer". No cancel on invite form. |
| 4 | Consistency and Standards | 3 | DS cohesive overall. ENTRY mock in JournalDetail has emoji mood (💡) — breaks Lucide contract. |
| 5 | Error Prevention | 2 | No autosave signal in JournalFreeEntry. JournalFreeEntry sidebar always visible even on narrow mobile (no breakpoint). |
| 6 | Recognition Rather Than Recall | 3 | Primary actions visible everywhere. Search accessible on Veille/LearningPaths. |
| 7 | Flexibility and Efficiency | 1 | Zero keyboard shortcuts. No quick-action panel. Keyboard navigation not tested. |
| 8 | Aesthetic and Minimalist Design | 2 | Identical teal PageHero strip on 4/5 pages. Coaching warm gradient starts mid-page (jarring seam below teal hero). |
| 9 | Error Recovery | 1 | EmptyState used for 0-results is good. But CourseDetail has a TDZ bug (course.progress in initializer). No network error handling visible. |
| 10 | Help and Documentation | 0 | No tooltips. Unlabeled "+" FAB on every page. |
| **Total** | | **20/40** | **Needs attention** |

---

## Anti-Patterns Verdict

**Not immediately "AI made this"** — TLS teal palette is distinctive, DS vocabulary is earned. Three tells remain:
1. Uniform teal PageHero above the fold on 4/5 pages = scaffold by reflex.
2. Veille format shortcut cards = identical-card grid anti-pattern.
3. Coaching decorative orange gradient mid-page = glassmorphism-as-default.

**Detector:** CLI bundled detector not found in this environment. Assessment A only.

---

## What's Working

1. **LearningPaths card tone rotation** (primary/warm/sun) — real rhythm, breaks the identical-card trap.
2. **Journal compose-first UX** — JournalChatCompose + format tiles. Strong product thinking.
3. **Enterprise invite flow** — store.addMember + toast.success: wired, instant feedback, no page reload.
4. **Dashboard cold-start detection** — dashboardVisitCount + EmptyDashboardState: thoughtful first-run handling.
5. **Veille bookmark store** — useBookmarksStore + useFilterPrefsStore wired, persists across sessions.

---

## Priority Issues

### [P0] JournalFreeEntry: Two-column layout breaks on mobile

**File:** `src/pages/JournalFreeEntry.tsx:151`
```tsx
// ❌ NO BREAKPOINT — aside sidebar displays at 280px on a 375px viewport
<Container className="grid grid-cols-[1fr_280px] gap-section items-start">
```
**Fix:**
```tsx
<Container className="grid grid-cols-1 lg:grid-cols-[1fr_280px] gap-section items-start">
```
The aside sidebar with "Aide à l'écriture" and "Aide-mémoire" would then stack on mobile.

---

### [P0] CourseDetail: TDZ bug in shadowed `course` variable

**File:** `src/pages/CourseDetail.tsx:65-80`

The component declares a local `const course` that shadows the module-scope `const course`. The initializer's IIFE references `course.progress` as a fallback, which hits a temporal dead zone when `total === 0`.

```tsx
// Module scope (line 22)
const course = { progress: 0, ... };

// Component scope (line 65) — TDZ shadows the above
const course = parcours
  ? {
      progress: (() => {
        if (total === 0) return course.progress; // ← ReferenceError: TDZ
      })(),
    }
  : course; // ← also TDZ self-reference
```

**Fix:** Replace with explicit fallback:
```tsx
progress: total === 0 ? 0 : Math.round((completed / total) * 100),
```
And the ternary `else` branch should reference the module-scope constant by renaming one of them (e.g., rename module-level to `STATIC_COURSE`).

---

### [P0] Dashboard: Coach name inconsistency (data trust break)

**Dashboard** (`src/pages/Dashboard.tsx:132`): `coachName="Sarah Martin"` (hardcoded)  
**Coaching** (`src/pages/Coaching.tsx:64`): `name: 'Sophie Martin'` (hardcoded)

Two different coach names for the same user. This breaks product trust — users will notice and wonder if the UI is broken or if they have two coaches. Both need to come from a single source of truth (coachingStore or a MOCK_COACH constant).

---

### [P1] Dashboard: Tier 1 & 2 content not wired to store

**Files:** `src/pages/Dashboard.tsx:108-147`

ResumeLessonCard and SessionCard are hardcoded mocks that never update:
```tsx
// Always shows "Étape 2 sur 5 — Devenir prompt designer" regardless of actual progress
<ResumeLessonCard eyebrow="Étape 2 sur 5" parcoursTitle="Devenir prompt designer" progress={40} />

// Always shows "Session : Leadership & IA" with "Sarah Martin"
<SessionCard title="Session : Leadership & IA" coachName="Sarah Martin" />
```
These should read from `useLessonProgressStore` + `useCoachingStore` respectively.

---

### [P1] LearningPaths: MOCK_PARCOURS is local, not from store

**File:** `src/pages/LearningPaths.tsx:45-~100`

`MOCK_PARCOURS` is defined inline in the page file (not imported from data/ or stores). Progress IS read from `lessonProgressStore` at card level, but the base parcours list is unsyncable. If the store ever has real parcours data, this page won't reflect it.

**Fix:** Move MOCK_PARCOURS to `src/data/learningPaths.ts` and import it, or read from a `useParcoursCatalogStore`.

---

### [P1] JournalFreeEntry: Hardcoded date "1 mai 2026"

**File:** `src/pages/JournalFreeEntry.tsx:158`
```tsx
<span>1 mai 2026</span>
```
Should be:
```tsx
<span>{new Date().toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
```

---

### [P1] JournalDetail: Prev/next navigation labels are always hardcoded

**File:** `src/pages/JournalDetail.tsx:258-276`

"Semaine 13: Délégation" and "Semaine 15: Feedback" are always shown regardless of which entry is open. The store has `getEntries()` — the prev/next should be computed from the entries array by index relative to the current entry ID.

---

### [P1] CourseDetail: Dual-column layouts lack responsive breakpoints

**File:** `src/pages/CourseDetail.tsx:160, 166`
```tsx
// No breakpoint — breaks on mobile
<div className="grid grid-cols-[minmax(0,1.4fr)_minmax(280px,0.8fr)] gap-stack">
<div className="grid grid-cols-[minmax(0,1.2fr)_minmax(260px,0.8fr)] gap-stack-lg">
```
**Fix:** Add `lg:` prefix to both grid-cols, stack single-column on mobile.

---

## P2 Polish

| | File | Issue |
|---|---|---|
| 1 | JournalDetail:49 | `mood: '💡'` emoji in ENTRY mock — breaks anti-emoji policy |
| 2 | JournalFreeEntry:256-260 | Tag remove uses `×` text with no aria-label — should be `<X size={10} />` with `aria-label="Supprimer le tag"` |
| 3 | Dashboard:72 | `<Hand>` Lucide icon inside `<h1>` — icon in heading is semantic noise; move outside |
| 4 | Dashboard:178 | ActivityFeed items use `Date.now()` at render time — timestamps shift on every re-render, use stable mock timestamps |
| 5 | Coaching:~300 | Dev toolbar with "Pas de coach assigné / Plan: free/pro/enterprise / Modales" visible in non-DEV builds — wrap in `import.meta.env.DEV &&` |
| 6 | JournalDetail:157 | Eyebrow contains inline span with `gap-tight.5` class — this token doesn't exist in Tailwind v4 config |

---

## Persona Red Flags

**Jordan (first-timer) on Coaching:** "Pas de coach assigné" badge with no CTA to book or request a coach. Dev toolbar reads as broken UI to a first-timer.

**Alex (power user) on Dashboard:** Sees stale hardcoded parcours card ("Devenir prompt designer", 40%) every day, never updates. Loses trust in the data.

**Casey (mobile) on JournalFreeEntry:** 375px viewport tries to render a 280px aside + 1fr column. Content is unusable.

---

## Questions to Consider

1. **Dashboard identity**: The teal hero strip is the same on Dashboard, Coaching, Journal. What if each space had a tonal signature — Dashboard=brand, Journal=sun (reflection), Coaching=warm (human connection)? One CSS change per page.

2. **Journal compose as hero**: What if JournalFreeEntry opened full-width with the textarea AS the hero (like Notion's page title), and the sidebar appeared only after the user starts typing?

3. **Coach data source**: One MOCK_COACH constant or one coachingStore.getAssignedCoach() call would fix 3 separate hardcoded occurrences. Worth a Phase 16.4 micro-wiring?
