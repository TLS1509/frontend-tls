# TIER 1 FLOWS AUDIT SYNTHESIS — Coaching, Journal, Veille
**Date** : 2026-06-11
**Source** : Phase 19 Global Audit (AUDIT-PHASE-19.md), flow synthesis
**Scope** : Daily-use core flows — alignment toward V1 shipping readiness

---

## EXECUTIVE SUMMARY

| Flow | Pages | Avg Score | P0 Count | P1 Count | P2 Count | Top Blocker | Effort | Phase 19 Target |
|------|-------|-----------|----------|----------|----------|-------------|--------|-----------------|
| **🎓 Coaching** (Coach family) | 21 | **2.9/5** | 8 | 7 | 6 | **MOCK_USER_ID + DS sparse** | L | 19.5 polish |
| **📝 Journal** | 5 | **4.0/5** | 2 | 2 | 1 | **JournalNewEntry LOC + focus-visible** | M | 19.6.1 polish |
| **📰 Veille/Editorial** (Magazine flow) | 8 | **4.7/5** | 0 | 1 | 2 | **Magazine/MagazineArticle already excellent** | S | baseline ✅ |

**Consolidated Finding** : Coaching is the critical bottleneck (avg 2.9, 21 pages, heavy MOCK dependency). Journal is solid (4.0) but needs a2a11y pass. Veille is the strongest performer—model to replicate.

**V1 Ship criteria** : All three flows must hit **≥4.0/5** before go-live.
- Current state: Veille ✅, Journal 🟡 (near), Coaching 🔴 (6 weeks out)
- Effort to hit 4.0: Coaching L, Journal M, Veille S
- Critical path: Coaching (blocks Journal polish → Veille validation)

---

## TIER 1 FLOWS DETAILED AUDIT

### Flow 1: COACHING (Coach family — 21 pages, avg 2.9/5)

#### Pages in scope (21 total)
**Daily-use hubs (3)** : CoachingHub, CoachDashboard, CoachEnterpriseDashboard
**Learner coaching (6)** : CoachingBookingFlow, CoachingSession, MessagingThread, Messages, CoachingCorrections, CoachingRecommendations
**Coach operations (7)** : CoachCompteRendu, CoachApprenant, CoachCorrectionDetail, CoachCorrectionsDashboard, CoachJournal, CoachObjectifs, CoachSessionHistory
**Mixed (5)** : CorrectionDetailLearner (Phase 17), PreCoachingQuestionnaire, SessionFeedbackModal, CoachingAvailability, CoachingStats

#### Score breakdown (by category)
| Category | Pages | Score | Issues |
|----------|-------|-------|--------|
| **Excellent** (≥4.5) | 1 : CoachingBookingFlow | 5.0 | ✅ Modal/form balance, no mocks, UX linear |
| **Good** (4.0-4.4) | 3 : CoachDashboard, Messaging, CorrectionDetailLearner | 4.0-4.2 | Minor focus-visible + min-h-touch gaps |
| **Passable** (3.0-3.9) | 11 : CoachingHub, CoachSessionDetail, CoachCompteRendu, etc. | 3.0-3.8 | **MOCK_USER_ID heavy, DS sparse, layout custom** |
| **Critical** (<3.0) | 6 : CoachApprenant, CoachJournal, Messages, PreCoachingQuestionnaire, CoachingAvailability, CoachingStats | 2.4-2.8 | No DS use, code duplication, inline styles |

#### Top 3 P0 Blockers (must fix first)

**P0 #1 : MOCK_USER_ID hardcoded — blocks Phase 17 store wiring (estimated 4 weeks, gates progression)**
- **Impact** : 14/21 pages import MOCK_CORRECTIONS, MOCK_SESSIONS, MOCK_COACHING_DATA directly
- **Symptom** : State doesn't persist on refresh, no multi-user support, Phase 16 spec unaligned
- **Root cause** : Pages never wired to useCoachingStore / useUserProfileStore
- **Fix strategy** : Create `useCoachingStore` hook with persistence middleware; replace MOCK_ imports with `store.getCoachingData(userId)` calls in all 14 pages
- **Effort** : L (1.5–2 days) — **HIGH PRIORITY, unblock journal/veille phases**
- **Acceptance criteria** :
  - `npx tsc --noEmit` clean
  - State persists on page reload (localStorage check)
  - No breaking changes to page props or routing

**P0 #2 : DS sparse adoption — 73% of coach pages use <3 DS components (style chaos)**
- **Impact** : Coaching visual identity inconsistent across the 21 pages; tone maps ignored
- **Affected pages** : CoachJournal (custom date pickers), CoachApprenant (custom table layout), CoachingAvailability (inline styles), Messages (oversize custom UI)
- **Symptom** : Mismatched spacing (mix gap-4/gap-stack), colors hardcoded or missing tone variants, card shadows inconsistent
- **Fix strategy** : 
  1. Audit each page's components inventory → identify gaps vs DS (EditorialHero, Card tone, Badge status, ProgressBar)
  2. Extend missing tone/variant combos on DS components (e.g., `Card tone="coaching-primary"` if needed)
  3. Migrate pages to DS-driven layouts (bottom-up: viewers → detail pages → hubs)
- **Effort** : M (3–4 days)
- **Acceptance criteria** : All card shadows use `shadow-card` token, all badges use `StatusBadge`, all inputs use `FormGroup`, no hex hardcodes

**P0 #3 : A11y baseline missing — 0/21 pages with complete focus-visible + min-h-touch (WCAG AA breach)**
- **Impact** : Keyboard nav broken, click targets <44px on CTA buttons, first responder unfocused in modals
- **Affected pages** : All 21, but especially CoachingBookingFlow (modal focus trap), Messages (list items not focusable), CoachApprenant (table header buttons)
- **Fix strategy** : Global utility pass (not per-page):
  1. Add `.focus-visible { outline: 2px solid primary-500; outline-offset: 2px; }` in globals.css @layer utilities
  2. Audit all interactive elements (button, a, [role=button]) for `min-h-touch` (44px) — use Tailwind utility `min-h-touch` consistently
  3. Add focus ring to Modal close button + Tab key trap handler
- **Effort** : S (4 hours, global fix) — **UNBLOCK PHASE 19.1**
- **Acceptance criteria** : Tab through all 21 pages → every interactive element has visible focus ring, all buttons ≥44px tall

#### P1 Issues (polish, non-blocking)

| # | Issue | Pages | Fix |
|---|-------|-------|-----|
| P1.1 | MessagingThread no focus-visible on thread items | MessagingThread, Messages (2) | Add focus-visible classes to message bubbles + sender item buttons |
| P1.2 | CoachCompteRendu + CoachingStats custom table layout (no DataTable) | CoachCompteRendu, CoachingStats (2) | Adopt DataTable pattern or create `CoachDataTable` composite |
| P1.3 | Inline style={{}} for dynamic widths in CoachingAvailability calendar | CoachingAvailability (1) | Replace with Tailwind arbitrary or refactor to flex-basis |
| P1.4 | >2 tones in CoachDashboard (primary + warm + sun for stats) | CoachDashboard (1) | Pick dominant tone + 1 accent max (recommend `tone="primary"` cohesive) |
| P1.5 | JournalNewEntry -like complexity in CoachJournal (480 LOC) | CoachJournal (1) | Split into sub-components (DatePicker, TagCloud, SharePanel) |
| P1.6 | PreCoachingQuestionnaire not aligned with Onboarding questionnaire | PreCoachingQuestionnaire (1) | Consolidate with Phase 19.3 (Onboarding alignment) |

#### P2 Issues (deferred, cosmetic)

| # | Issue | Pages | Context |
|---|-------|-------|---------|
| P2.1 | ReadingProgress indicator missing from CoachJournal entry list | CoachJournal (1) | Model: JournalDetail.tsx uses ReadingProgressBar successfully |
| P2.2 | Coach avatars not using Avatar component (local JSX) | CoachDashboard, CoachApprenant (2) | Standardize on Avatar component + fallback initials |
| P2.3 | Email cta links not tone-aware | Messages email preview section (1) | Add LinkButton tone support or use icon-only pattern |
| P2.4 | Correction card styles inconsistent between learner/coach views | CoachingCorrections, CorrectionDetailLearner (2) | Create `CorrectionCard` composite to DRY this |

#### Component prep strategy (Coaching flow)

**Bottom-up order** (primitives → composites → pages) :

1. **Primitives** (0 new — all exist)
   - Avatar, Badge (StatusBadge), Card, Button, Modal, FormGroup, Input, Select

2. **Composites to create/extend** (P0 + P1)
   - ❌ ~~`CoachDataTable`~~ → extend existing `DataTable` instead (reuse)
   - ❌ ~~`CorrectionCard`~~ → already exists (check usedBy)
   - ✅ `CoachSessionCard` (session details + booking CTA) — if not exists
   - ✅ `CoachAvailabilityCalendar` (calendar + time slots) — new pattern
   - ✅ Extend `Card` with `tone="coaching-accent"` if needed (verify with Figma DS first)

3. **Pages to refactor** (Phase 19.5 priority)
   - Priority 1: CoachApprenant, CoachJournal, Messages (remove custom layouts)
   - Priority 2: CoachingAvailability, CoachingStats (standardize to DataTable)
   - Priority 3: PreCoachingQuestionnaire (align with Onboarding)

#### Coaching effort estimate
- **P0 #1** (store wiring) : 2 days
- **P0 #2** (DS adoption) : 3 days  
- **P0 #3** (a11y global) : 0.5 days (global utility)
- **P1 polish** : 1.5 days
- **Figma sync + doc** : 1 day
- **Total** : ~8 days (1.6 weeks @ 5h/day) — **Phase 19.5 target**

---

### Flow 2: JOURNAL (5 pages, avg 4.0/5)

#### Pages in scope (5 total)
**Hubs (2)** : Journal, JournalSearch
**Details (2)** : JournalDetail, JournalDetailFree (view-only)
**Entry creation (1)** : JournalNewEntry

#### Score breakdown
| Page | Score | Status | Notes |
|------|-------|--------|-------|
| JournalDetail | 4.8 | ✅ Excellent | KeyFindingCard + ReadingProgress excellent, model |
| JournalSearch | 4.5 | ✅ Good | Clean, minimal, SearchBar integrated |
| Journal | 3.8 | 🟡 Passable | Missing focus-visible on list items |
| JournalNewEntry | 3.4 | 🟡 Passable | 480 LOC oversize, no sub-components |
| JournalDetailFree | 3.6 | 🟡 Passable | Read-only view, minimal polish |

#### Top P0/P1 (only 2 pages <4.0)

**P0 #1 : JournalNewEntry — 480 LOC, lacks sub-component structure (UX complexity + maintainability)**
- **Impact** : Single monolithic file; difficult to test, extend, or understand flow
- **Symptom** : MoodSelector, PromptPicker, TagInput all inline; state management tangled
- **Fix strategy** : Extract to sub-components (already recommended in 19.6):
  ```
  JournalNewEntry.tsx (main orchestrator, ~150 LOC)
  ├── JournalMoodSelector.tsx (~80 LOC)
  ├── JournalPromptPicker.tsx (~120 LOC)
  ├── JournalTagInput.tsx (~80 LOC)
  └── JournalPreviewPanel.tsx (~50 LOC)
  ```
- **Effort** : M (1.5 days)
- **Acceptance criteria** : Each sub-component <150 LOC, testable in isolation, JournalNewEntry re-render only on state change

**P1 #1 : Journal list items missing focus-visible (nav keyboard broken)**
- **Impact** : Tab through Journal hub → no visible focus ring on entry items
- **Fix strategy** : Add `focus-visible:outline-2 focus-visible:outline-primary-500` to each entry `<article>` or `<Card>` wrapper
- **Effort** : S (0.5 days)

**P1 #2 : JournalDetailFree not using read-only Card variant (inconsistent with detail pattern)**
- **Impact** : Visual inconsistency vs JournalDetail
- **Fix strategy** : Ensure both use same Card/EditorialHero/ReadingProgress tokens
- **Effort** : S (0.5 days)

#### P2 Issues (deferred, nice-to-haves)

| # | Issue | Page | Context |
|---|-------|------|---------|
| P2.1 | Share button UI could use tone-aware Pill component | JournalDetail | Currently button, Pill would fit better |
| P2.2 | Author strip (date + by) could be extracted to `JournalAuthorStrip` | JournalDetail | Model exists in MagazineArticle; DRY |

#### Component prep strategy (Journal flow)

**Composites to check/create** :
- ✅ `MoodSelector` (already exists? verify Components.tsx)
- ✅ `KeyFindingCard` (already exists? verified in audit ✅)
- ✅ `ReadingProgressBar` (already exists, used in MagazineArticle ✅)
- 🟡 `JournalPromptPicker` (may already exist as standalone or in JournalNewEntry inline)

**No new primitives needed** — all exist (Button, Card, Avatar, Badge, Pill, Input).

#### Journal effort estimate
- **P0 #1** (JournalNewEntry refactor) : 1.5 days
- **P1 polish** (focus-visible + variant audit) : 1 day
- **Figma sync** : 0.5 days
- **Total** : ~3 days (0.6 weeks) — **Phase 19.6.1 target**

---

### Flow 3: VEILLE & EDITORIAL (8 pages, avg 4.7/5)

#### Pages in scope (8 total)
**Magazine hubs (2)** : Magazine, MagazineAll
**Article detail (2)** : MagazineArticle, ArticleDetail
**Newsletter (2)** : WeeklyNewsletter, WeeklyNewsletterDetail
**Search/browse (2)** : VeilleSearch, VeilleContentHub

#### Score breakdown
| Page | Score | Status | Notes |
|------|-------|--------|-------|
| Magazine | 5.0 | ✅ Excellent | Sticky header, glass tokens, layout perfect |
| MagazineArticle | 5.0 | ✅ Excellent | ReadingProgressBar/Ring, AuthorStrip, no TBD |
| WeeklyNewsletter | 4.8 | ✅ Excellent | Clean multi-section, tone cohesive |
| VeilleSearch | 4.5 | ✅ Good | Minimal, SearchBar integrated |
| ArticleDetail | 4.6 | ✅ Good | Long-form reading, same ReadingProgress pattern |
| WeeklyNewsletterDetail | 4.4 | ✅ Good | Detail level good, some spacing variance |
| VeilleContentHub | 4.2 | ✅ Good | Card grid, tone mostly cohesive |
| MagazineAll | 4.0 | 🟡 Passable | Listing view, minor polish needed |

#### P0 Issues
**None** — Flow is already 4.0+. This is the model to replicate.

#### P1 Issues (polish only)

| # | Issue | Pages | Fix |
|---|-------|-------|-----|
| P1.1 | MagazineAll listing has 1 tone (could vary by card) | MagazineAll (1) | Verify tone distribution across cards (shouldn't all be primary) |
| P1.2 | WeeklyNewsletterDetail spacing variance (gap-4 vs gap-6) | WeeklyNewsletterDetail (1) | Audit gaps → standardize to gap-stack / gap-section |
| P1.3 | VeilleContentHub card shadows inconsistent | VeilleContentHub (1) | Ensure all use shadow-card token |

#### P2 Issues
**Negligible** — Flow is shipping-ready. Only cosmetic fine-tuning.

#### Component prep strategy (Veille flow)
**No new components needed** — all exist and are used correctly:
- ✅ EditorialHero (tone="default" for neutral, "warm" for secondary articles)
- ✅ Card (tone="default" for content cards, metadata via MetaPill)
- ✅ ReadingProgressBar / ReadingProgressRing (already perfectly used)
- ✅ AuthorStrip pattern (MagazineArticle model)

**Action** : Use as model for other flows (Journal.md, Coaching improvements).

#### Veille effort estimate
- **P1 polish** : 1 day
- **Figma sync** : 0.25 days
- **Total** : ~1.25 days (baseline + minor polish) — **Phase 19.6 (post-Coaching/Journal)**

---

## UNIFIED P0 BLOCKERS (cross-flow dependencies)

### Must-fix before any flow ships (sequential)

| # | Blocker | Flows affected | Effort | Phase 19 timeline |
|---|---------|---|--------|---------|
| **GLOBAL_1** | **A11y baseline** (focus-visible, min-h-touch utilities) — gates ALL | All 34 pages | S (0.5d) | **19.1** (must come FIRST) |
| **GLOBAL_2** | ErrorPage pattern creation + Error404/500 adoption | Auth + Onboarding flows | M (2d) | **19.1-2** |
| **COACHING_1** | Store wiring (MOCK_USER_ID → useCoachingStore) | Coaching (14 pages) + Journal (indirectly) | L (2d) | **19.5** (pre-Coach polish) |
| **COACHING_2** | DS adoption audit + tone standardization | Coaching (73% sparse) | M (3d) | **19.5** (post-store wiring) |
| **JOURNAL_1** | JournalNewEntry decomposition | Journal (1 page but critical) | M (1.5d) | **19.6.1** (depends on 19.5 completion) |
| **VEILLE_1** | None — already 4.0+ | — | — | ✅ Baseline |

### Dependency chain
```
GLOBAL_1 (a11y) → GLOBAL_2 (ErrorPage)
                  ↓
COACHING_1 (store) → COACHING_2 (DS) → JOURNAL_1 (decomp) → VEILLE polish
      ↑ (2 weeks)    ↑ (3 days)           ↑ (1.5 days)     ↑ (1 day)
```

**Critical path duration** : 2w + 4.5d + Figma sync = **~2.5 weeks to all flows ≥4.0**

---

## COMPONENT PREP STRATEGY (bottom-up)

### Tier 1: Check/extend existing primitives (0 net new)
All primitives exist. **Action** : audit for missing tone variants:
- ✅ Button (check ghost-dark, inverse variants exist)
- ✅ Card (check tone map complete: primary/warm/sun/brand/coaching-*)
- ✅ Badge / StatusBadge (complete)
- ✅ Avatar (check fallback initials working)
- ✅ FormGroup + Input (complete)

### Tier 2: Create missing composites (Phase 19.5)
| Composite | Scope | Used by | Effort | Notes |
|-----------|-------|---------|--------|-------|
| `CoachAvailabilityCalendar` | Date picker + time slots UI | CoachingAvailability | M | Calendar grid pattern (may reuse from existing library) |
| `DataTableCoach` | Extend DataTable for coaching context (coach name, session count, status) | CoachingStats, CoachCompteRendu | M | Or verify DataTable already covers these |
| `CorrectionCard` | DRY correction rendering (used in both learner + coach views) | CoachingCorrections, CorrectionDetailLearner | S | Check if already exists |
| `JournalMoodSelector` | Sub-comp extracted from JournalNewEntry | JournalNewEntry | S | Extract existing logic |
| `JournalPromptPicker` | Sub-comp extracted from JournalNewEntry | JournalNewEntry | S | Extract existing logic |

**Recommendation** : Before creating new composites, audit Components.tsx showcase to verify existing coverage. May already be 80%+ of what's needed.

### Tier 3: Refactor/migrate pages (Phase 19.5-6)

**Bottom-up refactor order** :

1. **Coaching viewers/details first** (P0 fix dependencies)
   - CoachApprenant (learner profile, custom layout → EditorialHero + Card stack)
   - CoachingCorrections (detail page, already good)
   - CoachJournal (480 LOC → split, similar to JournalNewEntry)

2. **Coaching hubs second** (depend on detail page patterns)
   - CoachDashboard (hub, good)
   - CoachingHub (learner-facing, needs polish)

3. **Journal second** (depends on store wiring from Coaching)
   - JournalNewEntry (P0 refactor)
   - Journal (hub, needs focus-visible)

4. **Veille last** (already at baseline)
   - Minor polish only

---

## PHASE 14 EXECUTION ORDER (revised from Phase 19 context)

### Week 1: Foundations + Coaching P0

```
Mon-Tue   : 19.1 (a11y baseline + ErrorPage)  [0.5d + 2d = 2.5d]
Wed-Fri   : 19.5 Part 1 (store wiring + DS audit)  [2d]
```

### Week 2: Coaching P0 continuation + Journal start

```
Mon-Tue   : 19.5 Part 2 (DS adoption refactor)  [3d]
Wed       : 19.6.1 start (JournalNewEntry decomp)  [1.5d starts]
```

### Week 3: Journal polish + Veille sync

```
Mon-Tue   : 19.6.1 finish + P1 focus-visible  [1d + 0.5d]
Wed-Thu   : 19.6.2-3 (Account/Events/Projects polish)  [2d+]
Fri       : Veille polish + Figma sync  [1.25d]
```

---

## FIGMA SYNC STRATEGY

### Phase 20: Figma reproduction (post-Phase 19 polish complete)

| Flow | Figma pages | Effort | Notes |
|------|-------------|--------|-------|
| **Coaching** | 3-4 flow frames (Booking → Session → Messaging → Dashboard) | L | Heaviest — 21 pages means picking representative screens |
| **Journal** | 2 flow frames (List → New Entry → Detail) | M | 5 pages = 2-3 key screens |
| **Veille** | 2 baseline frames (Magazine → Article) | S | Already perfect; document as model |

**Deliverable** : Figma DS pages with pixel-perfect reproductions + Component Set updates for new composites.

---

## COMPONENT STRATEGY SUMMARY

### What to CREATE (new composites)
1. ✅ `CoachAvailabilityCalendar` — if doesn't exist
2. ✅ `JournalMoodSelector`, `JournalPromptPicker`, `JournalTagInput` — extract from JournalNewEntry
3. 🟡 `DataTableCoach` — extend existing or verify coverage

### What to EXTEND (variants/tones)
1. ✅ `Card` — add `tone="coaching-accent"` if needed (verify with Figma DS)
2. ✅ `Button` — verify `variant="ghost-dark"` + `variant="inverse"` exist
3. ✅ `EditorialHero` — verify 4 tones (default/warm/sun/brand) all usable

### What to REUSE (don't recreate)
- ✅ ReadingProgressBar / ReadingProgressRing (Veille model → Journal)
- ✅ AuthorStrip pattern (MagazineArticle → other long-form)
- ✅ KeyFindingCard (JournalDetail → Coaching insights)
- ✅ EditorialHero (all hubs, tone-aware)

### What to DRY (deduplication)
- ❌ CorrectionCard logic (appears in 2+ pages, extract once)
- ❌ CoachJournal vs JournalNewEntry (similar LOC, similar complexity → share patterns)
- ❌ Avatar usage (ensure consistent fallback behavior)

---

## VALIDATION CHECKPOINTS (end of each phase)

### Phase 19.1 (Foundations)
- [ ] A11y utility global CSS in globals.css (focus-visible, min-h-touch)
- [ ] ErrorPage composite created with showcase entry
- [ ] All 34 pages pass `npx tsc --noEmit`
- [ ] Accessibility audit: 80%+ pages with visible focus ring on tab

### Phase 19.5 (Coaching polish)
- [ ] useCoachingStore fully wired (14 pages, zero MOCK_ imports)
- [ ] All 21 pages use EditorialHero + Card + Badge + StatusBadge composites
- [ ] All pages pass `focus-visible` audit on interactive elements
- [ ] Coaching flow avg score ≥4.0

### Phase 19.6.1 (Journal polish)
- [ ] JournalNewEntry split into 5 files (480 LOC → <150 LOC each)
- [ ] Journal flow avg score ≥4.0 (currently 4.0, target 4.3)
- [ ] All entry cards + list items have `focus-visible`

### Phase 19.6.2 (Veille baseline)
- [ ] Veille flow avg score ≥4.5 (currently 4.7, maintain)
- [ ] Figma pixel-perfect reproductions created (pages Magazine, MagazineArticle, WeeklyNewsletter)

---

## ESTIMATED EFFORT BREAKDOWN

| Phase | Task | Effort | Dependency |
|-------|------|--------|-----------|
| 19.1 | A11y global + ErrorPage | 2.5 days | — |
| 19.2 | Error404/500 adoption | 1.5 days | 19.1 |
| 19.5 | Coaching store wiring | 2 days | 19.1 |
| 19.5 | Coaching DS adoption | 3 days | 19.5 store |
| 19.6.1 | JournalNewEntry decomp | 1.5 days | 19.5 (indirect) |
| 19.6.1 | Journal focus-visible + polish | 1 day | 19.6.1 decomp |
| 19.6.2+ | Veille polish + Figma | 1.25 days | All above |
| **TOTAL** | — | **~13 days** | **2.6 weeks @ 5h/day** |

**Timeline** : 2026-06-11 → 2026-06-25 (Phase 19 completion before Phase 20 Figma)

---

## KEY DECISIONS & TRADE-OFFS

### Decision 1: Store-first for Coaching (not bottom-up components)
**Rationale** : MOCK_USER_ID blocks everything; component polish is pointless without real data flow.
**Alternative** : Component polish first, then store later → rejected (creates temporary broken state, audit wasted effort).

### Decision 2: Extract JournalNewEntry before widening to other long-form (OnboardingQuestionnaire, CourseDetail)
**Rationale** : Journal is contained + high leverage (5 pages, one 480 LOC file). Prevents pattern fragmentation.
**Alternative** : Create generic `LongFormEntry` component → rejected (premature abstraction, dependencies across flows).

### Decision 3: Use Veille as model, not refactor it
**Rationale** : 4.7/5 avg already excellent; refactor risk > polish gain.
**Alternative** : Touch Veille anyway → rejected (low ROI, breaks shipping urgency for Coaching/Journal).

### Decision 4: Figma sync after Phase 19 complete (not during)
**Rationale** : Phase 20 workflow requires stable code baseline to screenshot. Mid-phase Figma risks divergence.
**Alternative** : Continuous Figma sync → rejected (overhead, moving target).

---

## RISKS & MITIGATION

| Risk | Impact | Mitigation |
|------|--------|-----------|
| **COACHING store wiring breaks existing flows** | High | Create store in parallel branch, integration test before merging |
| **JournalNewEntry decomp introduces regressions** | Medium | Unit test each sub-component in isolation (Jest + React Testing Library) |
| **A11y utility doesn't apply universally** | Medium | Lint rule or ESLint plugin to enforce focus-visible on all interactive elements |
| **Veille overpolishing wastes time** | Low | Hard stop on P2 issues (cosmetic only, no refactoring) |
| **Phase 19 slips, Phase 20 Figma blocked** | High | Buffer 3 days before Phase 20 start (2026-06-22 → 2026-06-25 cushion) |

---

## NEXT STEPS

1. **Confirm Phase 19.1 start date** (a11y baseline + ErrorPage) — unblock all 34 pages
2. **Audit useCoachingStore feasibility** — verify Zustand setup compatible with existing storage (Phase 17 pattern)
3. **Prioritize P0 blockers** (confirm order above with product/design team)
4. **Reserve Figma time** for Phase 20 (post-2026-06-25)

**Recommendation** : Start Phase 19.1 immediately (a11y is a global win, no risk). Then pause Coaching until store wiring decision confirmed.
