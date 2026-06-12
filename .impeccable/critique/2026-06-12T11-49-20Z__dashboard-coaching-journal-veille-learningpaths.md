---
target: Dashboard Coaching Journal Veille LearningPaths
total_score: 22
p0_count: 1
p1_count: 3
timestamp: 2026-06-12T11-49-20Z
slug: dashboard-coaching-journal-veille-learningpaths
---
## Design Health Score

| # | Heuristic | Score | Key Issue |
|---|-----------|-------|-----------|
| 1 | Visibility of System Status | 3 | Progress bars and session badges work well. Coaching empty-coach state gives no clear next step. |
| 2 | Match System / Real World | 3 | French copy natural throughout. "7 sur 7" count in LearningPaths filter bar is ambiguous. |
| 3 | User Control and Freedom | 2 | No undo in Journal compose. Filter state has no "Tout effacer". |
| 4 | Consistency and Standards | 3 | DS cohesive overall. Journal emoji icons break the Lucide-only pattern. |
| 5 | Error Prevention | 2 | No autosave signal in Journal. No confirmation before filter reset. |
| 6 | Recognition Rather Than Recall | 3 | Primary actions visible everywhere. Search accessible on Veille/LearningPaths. |
| 7 | Flexibility and Efficiency | 1 | Zero keyboard shortcuts across all 5 pages. No quick-action panel. No bulk ops. |
| 8 | Aesthetic and Minimalist Design | 2 | Coaching dev toolbar is major visual noise. Veille decorative inline grid. Same hero strip on 4/5 pages reads as template. |
| 9 | Error Recovery | 2 | EmptyState used for 0-results. Network/error recovery not visible. |
| 10 | Help and Documentation | 1 | No tooltips anywhere. Unlabeled "+" FAB on every page. |
| **Total** | | **22/40** | **Acceptable** |

## Anti-Patterns Verdict

**LLM assessment:** Not immediately "AI made this" — the TLS teal palette is distinctive and DS is cohesive. Three tells: (1) uniform teal PageHero strip on 4/5 pages feels like scaffold by reflex; (2) Veille shortcut card grid is the identical-card anti-pattern; (3) decorative orange gradient on Coaching is glassmorphism-as-default.

**Deterministic scan:** CLI detector exited with no parseable output. No machine findings.

## Overall Impression

Functional and visually cohesive. Biggest opportunity: page identity. Every page except Veille looks the same above the fold. Users lose "where am I" sense and the app misses the chance to set emotional tone per space. Veille gets this right with its editorial hero. The other four should each have a spatial signature.

## What's Working

1. LearningPaths card tone rotation (primary/warm/sun) creates visual rhythm and breaks identical-card trap.
2. Journal compose-first layout: chat input + ⌘+Entrée hint + 4 format tiles — product thinking.
3. Coaching prochaine session card: right information density, clear action hierarchy.

## Priority Issues

**[P0] Coaching: Dev toolbar rendering in production context**
- Dev panel with "Pas de coach assigné / Retirer la session / Plan: free/pro/enterprise / Modales: Booking/Cancel..." visible on /coaching.
- Fix: Wrap in `{import.meta.env.DEV && <DevPanel />}`.
- Command: $impeccable harden

**[P1] All 5 pages: Uniform hero strip erases page identity**
- Dashboard, Coaching, Journal, LearningPaths all open with identical teal PageHero.
- Fix: Give each space a distinct above-fold signature. Dashboard → warm tone matching ResumeLessonCard. Journal → embed compose in hero. Coaching → warm gradient from the hero, not mid-page.
- Command: $impeccable layout

**[P1] Veille: Shortcut card grid is the banned identical-card pattern**
- 4 identically-sized cards (Magazine TLS / Actu hebdo / Vidéo Reels / Newsletter) in 4-col grid.
- Fix: Differentiate by importance. Magazine → 2-col featured. Or replace grid with horizontal pill chips.
- Command: $impeccable distill

**[P1] Journal: Emoji icons in type tiles break Lucide contract**
- 🧭✍️💡📖 used as icons in format tiles. Render differently per OS, can't be tinted.
- Fix: Compass / PenLine / Lightbulb / BookOpen from Lucide with tone classes.
- Command: $impeccable audit

**[P2] Flexibility zero: No keyboard shortcuts anywhere**
- No command palette, no shortcuts, no quick actions across all 5 pages.
- Fix: Minimum: J → journal entry, Escape → dismiss modals, ⌘K → command palette.
- Command: $impeccable delight

## Persona Red Flags

**Jordan (First-Timer) on Coaching:** "Pas de coach assigné" badge with no CTA to fix it. Dev toolbar reads as broken UI. No onboarding hint for what to do when arriving coachless.

**Alex (Power User) on LearningPaths + Dashboard:** Zero keyboard shortcuts. Journal entry requires 4 steps. Filtering LearningPaths requires navigation + click — 3 clicks minimum to reach a filtered view.

**Casey (Distracted Mobile User) on Veille:** 6 filter chips require precise tapping. "Sauvegardés" likely outside thumb zone. "Lire →" link in bottom-right of article cards is anti-thumb positioning.

## Minor Observations

- "+" FAB on every page: unlabeled, behavior varies per page. Label contextually.
- Dashboard hero ~100px height lacks visual presence. Min-height ~180px.
- "7 sur 7" in LearningPaths filter bar adds no navigational value.
- Coaching warm gradient starts mid-page (below teal hero) — jarring seam.
- "CONFIRMÉE" badge in coaching card: hand-rolled uppercase tracking, should use Badge component with status variant.

## Questions to Consider

- "What if each space had a color identity — Dashboard=primary, Journal=sun, Coaching=warm — and the hero took that color?"
- "What if the Journal hero WAS the compose box, like Notion's page title?"
- "What's the one action each page wants users to do that they're not? That's what the + FAB should label."
