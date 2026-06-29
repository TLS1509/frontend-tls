---
timestamp: 2026-06-29T11-12-11Z
slug: src-pages-dashboard-tsx
---
# Critique — Dashboard apprenant (`src/pages/Dashboard.tsx`)

Date: 2026-06-29 · Register: product · Assessment independence: degraded (run sequentially, single agent)

## Design Health Score

| # | Heuristic | Score | Key Issue |
|---|-----------|-------|-----------|
| 1 | Visibility of System Status | 4 | Progress %, "EN COURS", session "PLANIFIÉE" all clear |
| 2 | Match System / Real World | 4 | French, warm, mostly practice grammar |
| 3 | User Control and Freedom | 3 | Navigable; no undo needed on this surface |
| 4 | Consistency and Standards | 4 | DS components, consistent section-header + inline-link pattern |
| 5 | Error Prevention | 3 | Reply bar looks like an input but is a button |
| 6 | Recognition Rather Than Recall | 4 | Action of the day is hero; nothing hidden |
| 7 | Flexibility and Efficiency | 3 | 1-click resume; no shortcuts (not needed here) |
| 8 | Aesthetic and Minimalist Design | 4 | Restrained, one warm accent for the dominant action |
| 9 | Error Recovery | 3 | n/a on this surface |
| 10 | Help and Documentation | 3 | Cold-start EmptyDashboardState teaches; otherwise minimal |
| **Total** | | **35/40** | **Strong** |

## Anti-Patterns Verdict
- **LLM assessment**: Does NOT read as AI-generated. On-brand warmth (warm dominant-action card on neutral page), no gradient text, single deliberate eyebrow (date) in the hero rather than eyebrow-on-every-section, cards used as the right affordance, no hero-metric template. Practice-as-verb framing ("Écrire aujourd'hui", "Reprendre").
- **Deterministic scan**: `detect.mjs` on Dashboard.tsx → `[]` (clean, 0 findings).

## What's Working
1. **Hierarchy matches the North Star.** Greeting → dominant warm "resume" action (40%) → session + journal nudge → activity. Answers "what's my action now?" in <3s (PRODUCT Design Principle 1).
2. **Journal nudge as a chat bubble** — on-brand "practice as verb", contextual to the upcoming session, with a real avatar + reply affordance.
3. **Restraint + warmth.** One saturated moment (the dominant action) on an otherwise neutral, ambient-gradient page. Exactly the "warmth as moat" positioning.

## Priority Issues
- **[P1] Mobile hero eyebrow clipped by the floating menu button.** "LUNDI 29 JUIN" rendered as "NDI 29 JUIN" — the global `fixed top-2 left-2` hamburger (bottom edge 52px) overlapped the hero, which started at only `pt-6` (24px). **FIXED**: Dashboard mobile top padding `pt-6 → pt-16` (64px, clears 52px). Desktop unchanged (`md:pt-8`). ⚠️ Systemic risk: default PageShell mobile top padding is ~32px, also < 52px — other top-of-page surfaces likely clip too. To verify per-surface.
- **[P2] Completion-% competes with the action.** "40% COMPLÉTÉ" is the largest non-CTA element. PRODUCT Principle 4: practice-validated > content-completion; progress bars are secondary. Consider de-emphasizing the % and leading with "Étape 2 sur 5" (practice progress). → `$impeccable layout` / `quieter` on ResumeLessonCard.
- **[P2] "Continuer ma leçon" is content-consumption grammar.** PRODUCT voice explicitly bans "Continue le module"; "Continuer ma leçon" is the same shape. Reframe toward practice ("Reprendre ta pratique" / "Reprendre la leçon"). Shared ResumeLessonCard label — coordinate across consumers. → `$impeccable clarify`.
- **[P3] Reply bar affordance mismatch.** "Répondre…" looks like a text input but is a button that navigates. A first-timer may try to type. → `$impeccable clarify` / `adapt`.

## Persona Red Flags
- **Apprenant Entreprise (protagoniste)**: action-of-the-day is an unambiguous hero ✓. The mobile clip (now fixed) would have dented the first impression on phones (a real device for opportunistic 15-min sessions). "Continuer ma leçon" slightly frames content over practice.
- **First-timer**: handled by `EmptyDashboardState` cold-start branch (not shown in the populated view).

## Run Notes
- Target slug: `src-pages-dashboard-tsx` · ignore list: none
- CLI detector: ran, 0 findings · Browser: desktop + mobile (375px) screenshots, no overlay injection (visual inspection only)
- Live server: preview (stopped after run) · Independence: degraded (sequential)
- P1 fixed in-run (commit pending).
