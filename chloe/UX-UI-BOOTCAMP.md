# UX/UI Bootcamp — Applied to Learning App

> **Duration** : 4 weeks (40 hours total)  
> **Project** : Build Learning App frontend (Passeport, coaching, parcours adaptatifs)  
> **Deadline** : July 31, 2026  
> **Approach** : Learn-by-doing (theory + immediately applied to real screens)

---

## 🎯 What You'll Learn

Not "UX/UI theory." You'll learn:
- ✅ Design system workflow (tokens → components → pages)
- ✅ Figma → React component mapping
- ✅ Interaction patterns (forms, modals, scroll-reveals, micro-interactions)
- ✅ Accessibility (WCAG AA)
- ✅ Mobile-first responsive design
- ✅ Information architecture (IA) for learning platforms

**Applied immediately** to Learning App screens.

---

## 📊 Project: Learning App

### Current State
- ❌ Frontend mostly unbuilt (ProductDashboard exists, rest missing)
- ⚠️ TS error blocking build (`MarketingLearningApp.tsx:298`)
- 📋 Screen specs in `reference_fo_screens.md` (83 screens FO, ~20 for MVP)
- 🎨 Figma Design System exists (colors, typography, components)

### What You'll Build
1. **Passeport Dreyfus** (competence tracking)
2. **Adaptive Learning Parcours** (courses + lessons)
3. **Coaching Interface** (1-1 coaching booking/scheduling)
4. **Dashboard** (stats, progress, badges, alerts)
5. **Forms & Modals** (onboarding, settings, feedback)
6. **Mobile-first responsive** layouts

### By End of Bootcamp
- ✅ 6–8 core screens live + functional
- ✅ Design system fully wired (tokens + components)
- ✅ Accessibility tested (WCAG AA)
- ✅ Mobile responsive tested
- ✅ Motion/interactions documented

---

## 📅 WEEK 1: FOUNDATIONS + IA

### Day 1–2: Design System Crash Course (4 hours)

**Goal** : Understand design system workflow (Figma → CSS tokens → React components)

**Read first** (30min):
- [ ] `docs/site/FIGMA-FOUNDATIONS-AUDIT.md` (understand token gaps)
- [ ] `src/styles/globals.css` (how tokens are declared)
- [ ] `src/components/core/Button.tsx` (example: token-based component)

**Understand this flow** :
```
Figma Design System
    ↓
CSS Variables (--color-primary-500, --text-body-lg, etc.)
    ↓
Tailwind Config (maps CSS vars to utility classes)
    ↓
React Components (uses Tailwind classes + design patterns)
    ↓
Pages (compose components into screens)
```

**Hands-on** (2.5 hours) :
```
1. Open Figma Design System file
2. Audit these sections:
   - Colors (DONE ✅)
   - Typography (DONE ✅, but review in code)
   - Spacing/Grid (voir le bloc `@theme` de `src/index.css`)
   - Components (Button, Card, Input, Select, Modal)
3. For EACH component:
   - Note Figma variants (size, state, disabled, etc.)
   - Find React component in codebase
   - Verify all variants exist in code
   - Document gaps (missing variant = tech debt)
4. Create checklist: "Design System Audit Checklist.md"
```

**Checklist output** :
- [ ] All colors mapped to CSS (check ✅)
- [ ] All typography styles mapped (check ✅)
- [ ] All spacing tokens exist
- [ ] Button component: verify 8 variants (primary, secondary, ghost, etc. × size, state)
- [ ] Card component: verify 5 variants (elevated, outlined, filled, etc.)
- [ ] Input component: check all states (default, focus, error, disabled)
- [ ] Modal component: check structure (backdrop, card, close button)
- [ ] Document any missing variants

---

### Day 3–4: Information Architecture (4 hours)

**Goal** : Understand Learning App structure (users, flows, screen hierarchy)

**Read** (45min) :
- [ ] `reference_fo_screens.md` (full screen list, 83 screens)
- [ ] `reference_user_journeys.md` (50 journeys consolidated)
- [ ] `docs/_canon/FACTS-CANON.md` (product facts: Passeport, STRIDE, etc.)

**Map the IA** (3 hours) :
```
Create "LEARNING-APP-IA.md" with this structure:

## Users & Roles
├─ Learner (student)
│  └─ Sees: Dashboard, Passeport, Parcours, Coaching, Journal, Veille
├─ Coach (instructor)
│  └─ Sees: CoachDashboard, Learners, Feedback, Journal, Calendar
└─ Manager (enterprise)
   └─ Sees: EnterpriseAnalytics, KPIs, Teams, Alerts

## Core Flows (user journeys)
├─ Onboarding (signup → assessment → first lesson)
├─ Learning (take lesson → quiz → reflection → next lesson)
├─ Coaching (request → schedule → session → feedback)
├─ Assessment (Passeport Dreyfus × competences)
└─ Community (leaderboard, collaboration, badges)

## MVP Screens (20 critical screens)
├─ Dashboard (home, progress summary, quick stats)
├─ Passeport (competence grid, assessment, roadmap)
├─ Parcours (lesson list, lesson player, lesson detail)
├─ Coaching (booking form, schedule, session detail, feedback)
├─ Journal (reflection, entries, trending, collaboration)
├─ Veille (curated content, saved items, recommendations)
├─ Profile (settings, privacy, account, preferences)
├─ Modals (onboarding, feedback, invite, search, etc.)
└─ Forms (login, signup, assessment, coaching pre-q, preferences)

## Screen Groups (by complexity)
├─ Simple (form + submit): Login, Signup, Preferences, Feedback
├─ Medium (grid + filters): Passeport, Parcours, Journal, Veille, Leaderboard
├─ Complex (multi-pane, interactions): Dashboard, CoachDashboard, LessonPlayer
└─ Mega (interactive, scroll-reveal, animations): Onboarding, Passeport Dreyfus wizard
```

**Outcome** :
- Clear IA documented
- MVP screens prioritized (20 core)
- User flows mapped
- Dependencies identified (e.g., "Coaching needs Passeport first")

---

## 📅 WEEK 2: DESIGN PATTERNS + WIREFRAMES

### Day 5–6: Interaction Patterns (4 hours)

**Goal** : Learn common patterns on Learning App, design mobile-first

**Patterns to study** (use LEARNING-APP-DESIGN-PROJECT.md as reference) :

1. **Forms** (Onboarding, Coaching Request, Feedback)
   - Structure: label → input → helper text → error message
   - States: default, focus, filled, error, disabled
   - CTA: primary button, secondary option (cancel/skip)
   
2. **Cards** (Lesson, Coaching, Badge, Competence)
   - Header (title, badge, meta)
   - Body (description, stats, progress)
   - Footer (CTA, badge, status)
   
3. **Modals** (Feedback, Invite, Search, Confirm)
   - Backdrop (dark, semi-transparent)
   - Card (rounded, shadow, padding)
   - Close button (top-right)
   - Title + description + content + CTA
   
4. **Scroll-reveals** (Dashboard stats, Passeport rows, Veille feed)
   - Fade + slide on viewport entry
   - Stagger between items
   - Smooth scroll behavior
   
5. **Micro-interactions**
   - Buttons: hover scale + tap feedback
   - Inputs: focus ring, label float
   - Checkboxes/radios: custom styled, animated check
   - Sliders: thumb position, label, min/max display
   - Progress bars: smooth animate, percentage label

**Hands-on** (3 hours) :
```
For each pattern, create a DEMO COMPONENT:
1. Form → FeedbackFormDemo.tsx (textarea + rating + submit)
2. Card → LessonCardDemo.tsx (lesson info + CTA + progress)
3. Modal → ConfirmModalDemo.tsx (title + description + dual CTA)
4. Scroll-reveal → DashboardStatsDemo.tsx (3 stat cards staggered)
5. Micro-interaction → ButtonHoverDemo.tsx (button + hover + tap feedback)

Each demo:
- Uses design system tokens (colors, spacing, typography)
- Implements accessibility (aria-labels, focus states, semantic HTML)
- Mobile responsive (min-h-touch: 44px, padding responsive)
- Smooth transitions (0.3s cubic-bezier easing)
```

**Outcome** :
- 5 reusable pattern components
- Documented best practices (accessibility, responsive, motion)
- Ready to be copy-pasted into real screens

---

### Day 7: Wireframing (3 hours)

**Goal** : Sketch MVP screens on paper/Figma, get clarity before building

**Wireframe 5 critical screens** (low-fidelity) :
```
1. Dashboard (home)
   ├─ Header (greeting, avatar menu)
   ├─ Quick stats (3 cards: progress, badges, next lesson)
   ├─ Learning path (visual path + current lesson highlight)
   └─ Call-to-action (start next lesson)

2. Passeport Dreyfus (competence grid)
   ├─ Header (title, filter chips: all/in-progress/mastered)
   ├─ Grid (5 rows × 3 competences, color-coded by level)
   ├─ Each cell (competence name, current level, progress bar)
   └─ Footer (legend: Novice → Expert)

3. Lesson Player (main learning)
   ├─ Header (back, lesson title, progress %)
   ├─ Content area (video/text + sidebar notes)
   ├─ Bottom nav (previous / next lesson + quiz button)
   └─ Sidebar (learning objectives, downloads, discussion)

4. Coaching Booking Form (multi-step)
   ├─ Step 1 (select topic, describe goal)
   ├─ Step 2 (select coach, preferred times)
   ├─ Step 3 (confirm, add to calendar)
   └─ Success (booking confirmed, iCal download)

5. Journal Reflection (text + AI feedback)
   ├─ Date picker / recent entries
   ├─ Reflection text area
   ├─ AI feedback panel (right side, collapsible)
   ├─ Tags (competences, moods)
   └─ Save / share / archive actions
```

**Wireframe in Figma** (or paper sketch, photograph) :
- Simple boxes, no color/typography yet
- Focus on layout, hierarchy, spacing
- Annotate: "hero", "medium", "caption", button size
- Mark interactive elements (buttons, forms, expandables)

**Outcome** :
- 5 wireframes reviewed + approved
- Ready to hand off to design/code phase

---

## 📅 WEEK 3: DESIGN + PROTOTYPE

### Day 8–9: High-Fidelity Design (5 hours)

**Goal** : Design 3 core screens in Figma using design system

**Design in Figma** (apply design system rigorously) :
```
For EACH screen (Dashboard, Passeport, LessonPlayer):

1. Create Figma artboard (1440px desktop + 375px mobile)
2. Use design tokens (colors, type styles, spacing scale)
3. Build all STATES:
   - Default (empty / loaded)
   - Loading (skeleton)
   - Empty (no data, CTA to populate)
   - Error (error message, retry CTA)
   - Success (confirmation, next action)
4. Annotate interactions (hover, focus, active, disabled)
5. Mark responsive breakpoints (desktop, tablet, mobile)
6. Add component instances (Button, Card, Input, Modal)
7. Build variant grid (e.g., Button: primary/secondary × sm/md/lg × default/hover/active/disabled)
```

**Component library checklist** :
- [ ] Button (4 styles × 3 sizes × 4 states = 48 variants)
- [ ] Card (3 types × 4 states = 12 variants)
- [ ] Input (3 types × 3 states = 9 variants)
- [ ] Badge (4 colors × 2 sizes = 8 variants)
- [ ] Progress bar (animated fill)
- [ ] Modal (title + content + CTA)
- [ ] Dropdown menu (open/closed states)

**Outcome** :
- 3 screens pixel-perfect designed
- All interactive states documented
- Component library complete
- Ready to hand off to dev

---

### Day 10–11: Prototype & Interactions (4 hours)

**Goal** : Create clickable prototype in Figma, test flows

**Build prototype** :
```
1. Dashboard → Passeport (click on "Competences" card)
2. Passeport → Lesson detail (click on a competence)
3. Lesson detail → Lesson player (click "Start lesson")
4. Lesson player → Coaching (click "Request coaching")
5. Coaching form → Confirmation (multi-step flow)
6. Modal interactions (click "+" → feedback modal → submit → close)
```

**Test prototype** :
- Flows feel smooth (no missing screens)
- Button CTAs lead to right destination
- Back/cancel buttons work
- Mobile version responsive (test at 375px width)

**Outcome** :
- Clickable prototype ready for user testing
- All flows validated
- Ready for development handoff

---

## 📅 WEEK 4: REACT COMPONENTS + INTEGRATION

### Day 12–13: Build Core Components (6 hours)

**Goal** : Translate Figma components into React

**Build these components** :
```
src/pages/learning/components/
├─ DashboardCard.tsx (stat card + CTA)
├─ PasseportGrid.tsx (competence grid, filterable)
├─ LessonCard.tsx (lesson with progress)
├─ CoachingForm.tsx (multi-step form)
├─ JournalEntry.tsx (reflection + AI feedback)
├─ Modal.tsx (generic modal wrapper)
├─ FormInput.tsx (accessible input with error state)
└─ Button.tsx (already exists, verify all variants)

For EACH component:
1. Props interface (size, variant, state, disabled, etc.)
2. Accessibility (aria-labels, role, semantic HTML)
3. Responsive (mobile-first Tailwind breakpoints)
4. States (default, hover, focus, active, disabled, loading)
5. Storybook or component demo page
```

**Quality checklist** :
- [ ] TypeScript no errors
- [ ] Props well-documented
- [ ] All states working
- [ ] Accessible (WCAG AA)
- [ ] Mobile responsive
- [ ] Motion smooth (60fps)

---

### Day 14–15: Build Screens (6 hours)

**Goal** : Build 3 MVP screens (Dashboard, Passeport, LessonPlayer)

**Build screens** :
```
src/pages/learning/
├─ Dashboard.tsx
│  ├─ uses DashboardCard × 3
│  ├─ Learning path visualization
│  └─ Quick CTA to next lesson
├─ Passeport.tsx
│  ├─ Grid of competences (5×3)
│  ├─ Filter (all/in-progress/mastered)
│  └─ Click to drill down
└─ LessonPlayer.tsx
   ├─ Video + sidebar notes
   ├─ Bottom nav (prev/next/quiz)
   └─ Learning objectives checklist
```

**Per screen** :
1. Map Figma design → React layout
2. Wire up design tokens (colors, typography, spacing)
3. Add interactions (scroll-reveal, micro-animations, form handlers)
4. Responsive test (mobile + desktop)
5. Accessibility audit (keyboard nav, screen readers)
6. Performance (60fps, lazy-load images)

**Outcome** :
- 3 screens live + functional
- Design system fully integrated
- Mobile responsive verified
- Accessibility tested

---

## 📅 WEEK 5-6: POLISH + FINALIZE (Parallel with dev)

### Day 16–17: Add Remaining Screens (4 hours)

**Build** :
- Coaching form (multi-step modal)
- Journal reflection
- Profile settings
- Onboarding wizard (if time)

### Day 18: Testing + QA (2 hours)

**Checklist** :
- [ ] All routes working (`/dashboard`, `/passeport`, `/lesson/:id`, etc.)
- [ ] Links between pages functional
- [ ] Forms submit correctly
- [ ] Mobile responsive (test iPhone SE + iPad Pro widths)
- [ ] Accessibility (keyboard nav, screen reader, WCAG AA)
- [ ] Performance (Lighthouse >80)
- [ ] No console errors

### Day 19–20: Polish + Micro-interactions (3 hours)

**Add motion** :
- Scroll-reveals (fade + slide on entry)
- Hover states (scale, color transition)
- Loading states (skeleton, spinner)
- Form validation (error messages, inline feedback)
- Transitions between screens (fade, slide)

**Outcome** :
- Premium, polished feel
- Smooth interactions
- Accessible + responsive
- Ready for launch

---

## 🎯 By End of Bootcamp (July 31)

### Deliverables
- ✅ Design system complete (colors, typography, spacing, components)
- ✅ 8–10 core screens built + responsive
- ✅ All interactive patterns working (forms, modals, scroll-reveals)
- ✅ Accessibility tested (WCAG AA)
- ✅ Mobile-first responsive verified
- ✅ Micro-interactions polished
- ✅ Figma → React workflow documented

### Code Quality
- ✅ TypeScript: 0 errors
- ✅ Components: reusable, well-documented
- ✅ Performance: 60fps animations, optimized images
- ✅ Accessibility: proper ARIA, semantic HTML
- ✅ Mobile: touch-friendly (44px min-height)
- ✅ Tests: component tests + integration tests

---

## 📚 Reference Docs to Use

- **Design System** : `docs/site/FIGMA-FOUNDATIONS-AUDIT.md`
- **Screen Specs** : `reference_fo_screens.md` (83 FO screens, MVP = ~20)
- **User Journeys** : `reference_user_journeys.md`
- **Product Facts** : `docs/_canon/FACTS-CANON.md`
- **Component Code** : `src/components/core/` (existing patterns)
- **Motion Patterns** : `docs/site/DESIGN-INSPO.md` (micro-interactions)

---

## 🛠️ Tools You'll Use

- **Figma** : Design + prototype
- **React** : Build components + screens
- **Tailwind CSS** : Styling (tokens → utilities)
- **TypeScript** : Type safety
- **Storybook** (optional) : Component documentation
- **Browser DevTools** : Accessibility + performance audit

---

## 💡 Key Principles

1. **Design System First** — Don't invent styles, use tokens
2. **Mobile First** — Design/build for 375px first, then scale up
3. **Accessibility Always** — Keyboard nav, ARIA, semantic HTML
4. **Motion, Not Animation** — Purpose-driven, subtle, smooth
5. **Performance Over Polish** — 60fps beats 120fps with jank
6. **Iterate Fast** — Prototype → code → test → refine

---

**Ready to start? Begin with WEEK 1, Day 1. Pick an entry point:**

- **"Just tell me what to do each day"** → Use `JULY-ROADMAP.md`
- **"Show me screens + what to build"** → Use `LEARNING-APP-DESIGN-PROJECT.md`
- **"I need help understanding IA/flows"** → Read `reference_fo_screens.md` + `reference_user_journeys.md`

Let's build this. 🚀
