# Session 2026-06-11 — UX/UI Bootcamp Framework Setup

> **Date** : June 11, 2026  
> **Duration** : ~1.5 hours  
> **Focus** : Create comprehensive learning framework for Learning App frontend build  
> **Status** : ✅ COMPLETE

---

## What Happened

The user shifted primary focus from secondary learning paths (Procreate + Framer Motion) to a **critical priority: building the Learning App frontend by July 31, 2026** using a UX/UI bootcamp structure.

**Explicit request** : "en vrai de vrai il me faut un mini bootcamp cours UX/UI avec comme projet le frontend de la learning app que je dois finir en priorité d'ici juillet"

**Translation** : "I really actually need a mini UX/UI bootcamp course with the Learning App frontend as the project, which I need to finish as priority by July."

---

## Deliverables Created

### 1. `docs/learning/UX-UI-BOOTCAMP.md` (Comprehensive Course Framework)
**What** : 4-week applied UX/UI bootcamp structured as a real course with hands-on Learning App as the project.

**Contents**
- **Week 1 (14h):** Foundations
  - Design system crash course (token flow, Figma → CSS → React)
  - Learning App IA mapping (users, flows, 20-screen MVP)
  - Interaction patterns (forms, cards, modals, scroll-reveals, micro-interactions)
  - Wireframing 5 critical screens

- **Week 2–3 (18h):** Design + Prototype
  - High-fidelity Figma designs
  - Clickable prototype (click-through flows)
  - Accessibility audit (WCAG AA checklist)

- **Week 4 (8h):** React Implementation
  - Build 8–10 screens live
  - Component integration
  - Testing + polish

**Delivery** : Production-ready Learning App frontend by July 31, 2026

---

### 2. `docs/learning/LEARNING-APP-DESIGN-PROJECT.md` (Detailed Design Specifications)
**What** : Complete design specs for MVP screens with component library, responsive layouts, and accessibility requirements.

**Contents**
- **Screen Specs** (8–10 total, with high-fidelity mockups)
  - Dashboard (learner home, quick stats, next action)
  - Passeport Dreyfus (competence grid, color-coded levels)
  - Lesson Player (video, sidebar, reflection, bottom nav)
  - Coaching Request Form (3-step modal, coach selector, success state)
  - Journal (reflection, AI feedback, mood tracking)
  - Profile/Settings, Veille, Leaderboard, Onboarding

- **Design System Usage**
  - Color palette (Direction C: Teal, Orange, Gold + neutrals)
  - Typography (League Spartan headers, Nunito body)
  - Spacing scale (xs–3xl)
  - Component tokens (Button, Card, Input, Modal)

- **Interaction Patterns**
  - Forms, modals, scroll-reveals
  - Micro-interactions (hover, active, loading states)
  - Responsive breakpoints (mobile 375px, tablet 480–1023px, desktop 1024px+)

- **Accessibility Checklist** (WCAG AA per screen)
  - Keyboard navigation, focus indicators, form labels, error messaging
  - Image alt text, color contrast, touch targets (44px min)
  - Reduced motion support

---

### 3. `docs/learning/JULY-ROADMAP.md` (Week-by-Week Timeline)
**What** : Detailed 50-day plan (June 11 – July 31) breaking down the bootcamp and build into weekly milestones.

**Structure**
- **Week 1 (Jun 11–17):** Design system + design 5 screens
- **Week 2 (Jun 18–24):** Polish design + create interactive prototype
- **Week 3 (Jun 25–Jul 1):** Build component library + 3 screens live
- **Week 4 (Jul 2–8):** Build remaining 5–7 screens
- **Week 5 (Jul 9–15):** Add animations, loading/error states, accessibility
- **Week 6 (Jul 16–22):** Final polish, documentation, deployment prep
- **Weeks 7–8 (Jul 23–31):** Launch + contingency buffer

**Daily Breakdown**
- 27–34 hours per week (6.5h focused work/day × 5 days)
- Specific tasks per day
- Time tracking template

**Key Milestones**
- Jun 17: 5 screens designed
- Jun 24: All 10 screens designed, prototype complete
- Jul 1: Component library built, 3 screens live
- Jul 8: All 8–10 screens live, forms working
- Jul 15: Animations + a11y passing
- Jul 22: Final polish, deployment-ready
- Jul 31: **LAUNCH** ✅

---

## Session Impact

### Changes Made
1. **Documentation** : Created 3 comprehensive .md files (UX-UI-BOOTCAMP.md, LEARNING-APP-DESIGN-PROJECT.md, JULY-ROADMAP.md)
2. **Memory** : Added `project_learning_app_bootcamp.md` to track this critical priority
3. **Index** : Updated MEMORY.md to surface the Learning App bootcamp as PRIMARY PRIORITY

### What This Enables
- **Structured learning path** : User has a day-by-day bootcamp framework (not just random tasks)
- **Hands-on project** : Learning happens while building the actual Learning App frontend
- **Clear timeline** : 50-day sprint with weekly milestones and daily tasks
- **Design specs** : Detailed mockups, component library, and accessibility requirements
- **Contingency** : Week-by-week tracking with a buffer (Weeks 7–8)

### Work Deprioritized (Not Deleted, Just Secondary)
- **Procreate bootcamp** (12–16h) → Can resume post-July 31 for Phase 2 illustration assets
- **Framer Motion bootcamp** (10–14h) → Reference docs exist; patterns can be applied during React build
- **Other marketing initiatives** → Hold until Learning App ships

---

## Next Steps for User

### Immediate (This Week)
1. **Read UX-UI-BOOTCAMP.md** (2h) — Understand the course structure
2. **Audit Figma design system** (1h) — Confirm token flow readiness
3. **Start Week 1 Day 1** — Deep-dive design system crash course
4. **Create Figma wireframes** — 5 critical screens by week end

### This Sprint (Weeks 2–4)
- Design all 10 screens in Figma
- Build component library
- Implement 3 screens → 8–10 screens live

### By July 31
- **LAUNCH** production Learning App frontend ✅

---

## Reference Documents

All files are in `/Users/chloemimault/Documents/Claude/Projects/frontend-tls/docs/learning/`:

- **UX-UI-BOOTCAMP.md** — 4-week course framework
- **LEARNING-APP-DESIGN-PROJECT.md** — Design specs + component library
- **JULY-ROADMAP.md** — Week-by-week timeline
- **README.md** — Learning materials index
- **PROCREATE-BOOTCAMP.md** — Secondary (Procreate learning, 12–16h)
- **FRAMER-MOTION-LEARNING.md** — Secondary (Framer Motion patterns)
- **ANIMATED-LOGO-PROJECT.md** — Secondary (logo animation reference)

---

## Success Criteria

By July 31, 2026:
- ✅ 8–10 screens built + tested
- ✅ WCAG AA accessibility passing
- ✅ Responsive (mobile, tablet, desktop)
- ✅ Micro-interactions (60fps animations)
- ✅ Loading, error, empty states
- ✅ Documentation complete
- ✅ Deployment-ready or live
- ✅ User testing passed

---

## Files Modified/Created

```
docs/learning/
├─ UX-UI-BOOTCAMP.md                          [NEW]
├─ LEARNING-APP-DESIGN-PROJECT.md             [NEW]
├─ JULY-ROADMAP.md                            [NEW]
├─ SESSION-2026-06-11-BOOTCAMP-SETUP.md       [NEW, this file]
├─ README.md                                   [existing, references bootcamp]
├─ PROCREATE-BOOTCAMP.md                      [existing, deprioritized]
├─ FRAMER-MOTION-LEARNING.md                  [existing, deprioritized]
├─ ANIMATED-LOGO-PROJECT.md                   [existing, deprioritized]
└─ WEEK1-PARALLEL-PLAN.md                     [existing, deprioritized]

memory/
├─ MEMORY.md                                  [UPDATED - added project entry]
└─ project_learning_app_bootcamp.md           [NEW]
```

---

**The UX/UI bootcamp framework is ready. Start Week 1 on Monday, June 16. Ship by July 31. 🚀**
