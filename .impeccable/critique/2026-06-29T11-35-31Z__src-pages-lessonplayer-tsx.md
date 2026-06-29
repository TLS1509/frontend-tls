---
timestamp: 2026-06-29T11-35-31Z
slug: src-pages-lessonplayer-tsx
---
# Critique — Lesson player (`src/pages/LessonPlayer.tsx`)

Date: 2026-06-29 · Register: product · Independence: degraded (sequential)

## Anti-Patterns Verdict
- **LLM**: Not AI-slop. Immersive full-screen player, clear 8-step pedagogical flow (Introduction → Engagement → Découvrir → Quiz → Réfléchir → Appliquer → Conclusion → Transfert) with icon+label tabs, clean content card, good type hierarchy.
- **Detector**: `detect.mjs` → `[]` (0 findings).

## What's Working
1. The 8-step tab strip maps the pedagogical model and gives strong orientation; current step is clearly highlighted.
2. Immersive: hides the global sidebar; prev/next chevrons + bottom progress dots are discoverable.
3. Content typography (h1 + lead + objective rows) is clean and legible.

## Priority Issues
- **[P2 — FIXED] Objectives used green check-circles** (`text-success-base`), reading as "already completed" when they're aspirational learning objectives. Swapped to the `Target` icon (primary-400) — matches the section heading, reads as "goal," never "done." (Other CheckCircle2 uses — quiz correct answer, action plan — are legitimately "done" and kept.)
- **[P2] Global "+" FAB (and dev terminal button) bleed into the immersive player** — overlaps content on mobile (covers an objective row). An immersive practice surface should suppress global quick-action chrome. Needs a route-aware hide of the FAB on viewer routes (app-chrome scope, separate change). → `$impeccable adapt` / layout.
- **[P2] Header title is the generic word "Leçon"** instead of the actual lesson name. The learner can't see which lesson they're in from the chrome (the in-content h1 is a generic "Bienvenue dans cette leçon"). Show the real lesson title. → `$impeccable clarify`.
- **[P3] Triple progress signalling** — top thin bar + "1/8" counter + bottom dots + tab highlight. Consider consolidating.

## Persona Red Flags
- **Apprenant (protagoniste, AAA target)**: the check-circle objectives (now fixed) implied the lesson was already done before starting. The "+" FAB overlapping content on mobile is friction during focused practice.

## Run Notes
- Slug: `src-pages-lessonplayer-tsx` · detector ran (0) · browser desktop + 375px · P2 objectives icon fixed in-run.
- Verified the app-wide `max-md:pt-14` main fix does NOT add a gap here (player is a fixed/immersive overlay; top bar sits at the top).
