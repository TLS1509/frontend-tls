# July Roadmap — Learning App Frontend (50 Days)

> **Objective** : Ship production-ready Learning App frontend (8–10 screens, WCAG AA, responsive)  
> **Timeline** : June 11 – July 31, 2026 (50 days)  
> **Baseline** : 40 hours/week = 200 hours total  
> **Status** : Bootcamp framework ready; execution starts June 16

---

## 📅 WEEK-BY-WEEK BREAKDOWN

### WEEK 1 (June 11–17) — FOUNDATIONS & DESIGN SYSTEM
**Focus** : Design system alignment, IA mapping, component audit

**Daily Tasks**
- **Mon, Jun 11** (Today)
  - ✅ Routing audit complete (7 links fixed)
  - ✅ UX-UI Bootcamp docs written
  - ✅ LEARNING-APP-DESIGN-PROJECT.md specs created
  - [ ] Read UX-UI-BOOTCAMP.md (2h)
  - [ ] Audit Figma DS vs. code tokens (1h)
  - **Daily total: 3h**

- **Tue, Jun 12**
  - [ ] Design system deep-dive (Figma → CSS variables)
    - Review color tokens (§01 COLORS done, ink/450-550 pending)
    - Review typography tokens (display, heading, body)
    - Map spacing scale (xs–3xl)
  - [ ] Set up Tailwind token imports in project
  - [ ] Read FIGMA-FOUNDATIONS-AUDIT.md for gaps
  - **Daily total: 4h**

- **Wed, Jun 13**
  - [ ] Information Architecture walkthrough
    - Sketch 5 core user journeys (onboarding → lesson → coaching → journal → review)
    - Map 20 MVP screens to flows
    - Document entry points (Dashboard, Passeport, Lesson Player)
  - [ ] Create wireframes for 5 critical screens (Figma)
    - Dashboard (learner home)
    - Passeport Dreyfus (competence grid)
    - Lesson Player (content consumption)
    - Coaching Request (booking form)
    - Journal (reflection + AI feedback)
  - **Daily total: 5h**

- **Thu, Jun 14**
  - [ ] Component audit (code ↔ Figma)
    - Existing components: Button, Input, Card, Modal
    - Figma component-sets: Check bindings, variants
    - Missing: PasseportCell, LessonCard, CoachingForm
  - [ ] Interaction patterns documentation
    - Forms (label + input + error + helper)
    - Modals (center overlay, focus management)
    - Scroll-reveals (Framer Motion stagger)
    - Micro-interactions (hover, active, loading)
  - **Daily total: 4h**

- **Fri, Jun 15**
  - [ ] Build 5 wireframe screens → high-fidelity Figma designs
    - Dashboard (full design, states: empty/loading/success)
    - Passeport (grid layout, mobile collapse)
    - Lesson Player (video player, sidebar, reflection)
    - Coaching Request (3-step form, modal)
    - Journal (list + detail view)
  - [ ] Create interactive prototype in Figma
  - [ ] Accessibility checklist (WCAG AA per screen)
  - **Daily total: 6h**

- **Sat, Jun 16**
  - [ ] Polish Figma designs based on Direction C brief
    - Hero welcome section (greeting + avatar + quick stats)
    - Card styling (rounded-xl, subtle shadow, hover states)
    - Typography scale (check spacing, line-height)
  - [ ] Color audit (confirm palette matches tokens)
  - **Daily total: 3h**

- **Sun, Jun 17** (Review + Prep)
  - [ ] Review week 1 designs
  - [ ] Identify missing states (empty, error, loading)
  - [ ] Finalize component specs for development
  - [ ] Prepare dev environment (branches, component structure)
  - **Daily total: 2h**

**Week 1 Total: 27h** ✅  
**Deliverable** : 5 high-fidelity screens, interactive prototype, design system audit

---

### WEEK 2 (June 18–24) — DESIGN POLISH & PROTOTYPE
**Focus** : High-fidelity design, clickable flows, accessibility spec

**Daily Tasks**
- **Mon, Jun 18**
  - [ ] Design Lesson Player component (in-depth)
    - Video player controls (custom or embed)
    - Sidebar with objectives (collapsible)
    - Transcript / key points
    - Reflection textarea (auto-save)
    - Bottom nav (prev/next/quiz)
  - [ ] Design 3 additional screens (Veille, Leaderboard, Profile)
  - **Daily total: 5h**

- **Tue, Jun 19**
  - [ ] Design Onboarding flow (signup → assessment → first lesson)
    - Step 1: Email + password
    - Step 2: Dreyfus competence assessment (multi-choice)
    - Step 3: Welcome + first lesson teaser
    - Success state + email confirmation
  - [ ] Design modals (feedback, invite, search, confirm)
  - **Daily total: 5h**

- **Wed, Jun 20**
  - [ ] Complete high-fidelity designs for all 10 screens
  - [ ] Create interactive prototype (Figma)
    - Dashboard → Passeport (click flow)
    - Passeport → Lesson Player (click flow)
    - Lesson Player → Coaching Request (click flow)
    - Coaching Request → Success (form submission)
  - **Daily total: 6h**

- **Thu, Jun 21**
  - [ ] Create design documentation
    - Component specs (Button, Input, Card, Modal, Badge, ProgressBar)
    - Color usage per component (primary, secondary, success, error, etc.)
    - Typography scale applied
    - Spacing grid (gap, padding, margin)
    - States per component (default, hover, active, disabled, loading, error, success)
  - **Daily total: 4h**

- **Fri, Jun 22**
  - [ ] Finalize responsive design (mobile, tablet, desktop)
    - Dashboard (1-col mobile, 3-col desktop)
    - Passeport (1-col mobile, 3-col desktop)
    - Lesson Player (stacked mobile, 2-pane desktop)
    - Forms (full-width inputs mobile, centered desktop)
  - [ ] Create mobile mockups side-by-side with desktop
  - **Daily total: 5h**

- **Sat, Jun 23**
  - [ ] Accessibility audit (WCAG AA checklist)
    - Contrast ratios (≥ 4.5:1 text, ≥ 3:1 large text)
    - Focus indicators (ring-2, visible)
    - Form labels (`<label for="">`)
    - Error messaging (aria-describedby)
    - Image alt text
    - Keyboard navigation
  - [ ] Create design system Figma library (shared styles + components)
  - **Daily total: 4h**

- **Sun, Jun 24** (Handoff prep)
  - [ ] Export all design assets
    - Figma components as React-ready specs
    - Color tokens (Figma variables → CSS)
    - Typography specs (font, size, weight, line-height)
  - [ ] Document handoff checklist for dev team
  - **Daily total: 2h**

**Week 2 Total: 31h** ✅  
**Deliverable** : 10 high-fidelity screens, interactive prototype, design system library, accessibility audit

---

### WEEK 3 (June 25–July 1) — REACT BUILD (TIER 1 COMPONENTS)
**Focus** : Build reusable component library + Dashboard screen

**Daily Tasks**
- **Mon, Jun 25**
  - [ ] Create component directory structure
    ```
    src/components/
    ├─ common/         # Reusable UI (Button, Input, Card, Modal, Badge, ProgressBar)
    ├─ learning-app/   # Domain-specific (DashboardCard, PasseportCell, LessonCard, CoachingForm)
    ├─ layout/         # Header, Sidebar, Footer
    └─ animations/     # Scroll reveals, micro-interactions
    ```
  - [ ] Build Button component (primary, secondary, tertiary, icon, disabled, loading states)
  - [ ] Build Input component (text, email, password, error, helper, focus states)
  - **Daily total: 5h**

- **Tue, Jun 26**
  - [ ] Build Card component (default, elevated, interactive)
  - [ ] Build Modal component (overlay, focus trap, close button, footer actions)
  - [ ] Build ProgressBar component (linear progress, color variants)
  - [ ] Build Badge component (status, competence level, accent colors)
  - **Daily total: 5h**

- **Wed, Jun 27**
  - [ ] Build PasseportCell (competence name + level + progress)
  - [ ] Build PasseportGrid (responsive 3-col desktop, 1-col mobile)
  - [ ] Build LessonCard (thumbnail + title + progress + CTA)
  - [ ] Build DashboardCard (stat card with icon + number + label)
  - **Daily total: 5h**

- **Thu, Jun 28**
  - [ ] Build Dashboard screen (full layout)
    - Header (sticky)
    - Hero welcome (greeting + quick stats)
    - Learning path (horizontal scroll or timeline)
    - Continue section (featured lesson)
    - Recommended activities (3+ cards)
    - Loading skeleton state
    - Empty state (no lessons started)
  - [ ] Wire up dummy data
  - **Daily total: 6h**

- **Fri, Jun 29**
  - [ ] Build Passeport Dreyfus screen
    - Filter chips (all, in-progress, mastered)
    - Competence grid (with color-coding)
    - Detail panel (expand on click)
    - Responsive collapse (1-col mobile)
  - [ ] Add interactions (click cell → expand detail)
  - **Daily total: 5h**

- **Sat, Jun 30**
  - [ ] Build Lesson Player component
    - Video player (custom or embed)
    - Objectives sidebar
    - Transcript / key points (collapsible)
    - Reflection textarea (with auto-save to localStorage)
    - Bottom nav (prev/next/quiz buttons)
  - [ ] Add video mock (placeholder MP4)
  - **Daily total: 5h**

- **Sun, Jul 1** (Week 3 review)
  - [ ] QA all components
    - Visual regression check (vs. Figma)
    - Responsive test (mobile/tablet/desktop)
    - Interaction test (hover, click, focus)
    - Accessibility test (keyboard, screen reader)
  - [ ] Performance audit (Lighthouse)
  - **Daily total: 3h**

**Week 3 Total: 34h** ✅  
**Deliverable** : Component library (15+ components), 3 screens live (Dashboard, Passeport, Lesson Player), visual parity with Figma

---

### WEEK 4 (July 2–8) — REACT BUILD (TIER 2 SCREENS)
**Focus** : Build remaining screens (Coaching, Journal, Onboarding)

**Daily Tasks**
- **Mon, Jul 2**
  - [ ] Build Coaching Request form (3-step modal)
    - Step 1: Topic textarea + competence selector
    - Step 2: Coach selector (list with ratings)
    - Step 3: Confirm (review + preferred times)
    - Success state (confetti, next steps)
  - [ ] Add form validation
  - **Daily total: 6h**

- **Tue, Jul 3**
  - [ ] Build Journal screen
    - Date picker + filter chips
    - Recent entries sidebar (list)
    - Entry detail view (textarea + competences + mood emoji)
    - AI feedback panel (collapsible)
    - Save/share/archive buttons
  - [ ] Add auto-save to localStorage
  - **Daily total: 5h**

- **Wed, Jul 4** (Independence Day 🇺🇸, light day)
  - [ ] Build Veille (curated content feed)
    - Article card grid
    - Filter/search
    - Bookmark state
  - [ ] Build Leaderboard / Gamification screen
    - User rankings
    - Badge showcase
    - Progress stats
  - **Daily total: 3h**

- **Thu, Jul 5**
  - [ ] Build Profile / Settings screen
    - Account info (name, email, avatar)
    - Preferences (theme, notifications, language)
    - Learning settings (pace, difficulty, interests)
    - Logout CTA
  - [ ] Add theme toggle (light/dark mode)
  - **Daily total: 5h**

- **Fri, Jul 6**
  - [ ] Build Onboarding flow (signup → assessment → first lesson)
    - Step 1: Email + password form
    - Step 2: Dreyfus assessment (multi-choice questions)
    - Step 3: Welcome + start first lesson
    - Success + email confirmation prompt
  - **Daily total: 6h**

- **Sat, Jul 7**
  - [ ] QA all remaining screens
    - Visual regression vs. Figma
    - Form validation (required fields, email format, password strength)
    - Responsive test (mobile/tablet/desktop)
    - Accessibility test (WCAG AA checklist)
  - **Daily total: 4h**

- **Sun, Jul 8** (Week 4 review)
  - [ ] Performance audit (Lighthouse target: 90+)
  - [ ] Identify remaining bugs/polish items
  - [ ] Plan Week 5 refinements
  - **Daily total: 2h**

**Week 4 Total: 31h** ✅  
**Deliverable** : 8–10 screens live, form validation, theme toggle, accessibility passing WCAG AA

---

### WEEK 5 (July 9–15) — POLISH, TESTING, MICRO-INTERACTIONS
**Focus** : Refinement, animations, loading/error states, internal testing

**Daily Tasks**
- **Mon, Jul 9**
  - [ ] Add Framer Motion animations
    - Page load: staggered fade-up reveal (cards)
    - Form submission: success animation
    - Navigation: slide transition between screens
    - Scroll reveals: enter-view animations (IntersectionObserver)
  - **Daily total: 5h**

- **Tue, Jul 10**
  - [ ] Build loading states (skeleton loaders)
    - Dashboard skeleton (cards)
    - Passeport skeleton (grid cells)
    - Lesson skeleton (video + sidebar)
  - [ ] Build empty states (onboarding CTAs)
    - Dashboard: "No lessons started" → get started CTA
    - Journal: "No entries yet" → create first entry CTA
  - **Daily total: 4h**

- **Wed, Jul 11**
  - [ ] Build error states (clear messaging)
    - Form validation errors (inline, per-field)
    - Network errors (retry CTA)
    - 404 page (not found)
  - [ ] Add toast notifications (success, error, info)
  - **Daily total: 4h**

- **Thu, Jul 12**
  - [ ] Micro-interactions polish
    - Button hover/active states (scale, shadow)
    - Input focus states (ring, border color)
    - Checkbox/radio animation (draw-in check)
    - Badge pulse effect (infinite scale)
    - Card hover (slight lift, shadow increase)
  - **Daily total: 5h**

- **Fri, Jul 13**
  - [ ] Responsive design fine-tuning
    - Mobile: all 1-column layouts, full-width inputs
    - Tablet: 2-column layouts where applicable
    - Desktop: full 3-column grids, 2-pane sidebars
    - Test on real devices (iPhone, iPad, desktop)
  - **Daily total: 5h**

- **Sat, Jul 14**
  - [ ] Internal testing sprint (QA checklist)
    - Feature completeness (all screens built)
    - Visual regression (vs. Figma, vs. previous builds)
    - Cross-browser testing (Chrome, Safari, Firefox)
    - Mobile testing (iOS Safari, Android Chrome)
    - Accessibility (keyboard nav, screen reader, contrast)
    - Performance (Lighthouse 90+, Core Web Vitals)
  - **Daily total: 6h**

- **Sun, Jul 15** (Checkpoint)
  - [ ] Document known issues + blockers
  - [ ] Plan final refinement week
  - [ ] Prepare for stakeholder review (or launch)
  - **Daily total: 2h**

**Week 5 Total: 31h** ✅  
**Deliverable** : Polished animations, loading/error/empty states, accessibility passing, performance optimized

---

### WEEK 6 (July 16–22) — FINAL REFINEMENT & LAUNCH PREP
**Focus** : Bug fixes, final polish, documentation, deployment readiness

**Daily Tasks**
- **Mon, Jul 16**
  - [ ] Fix bugs identified in Week 5 QA
    - Form validation issues
    - Mobile layout bugs
    - Animation jank (if any)
    - Accessibility violations
  - **Daily total: 5h**

- **Tue, Jul 17**
  - [ ] Final design polish
    - Typography: review line-heights, letter-spacing
    - Spacing: audit padding/margin consistency
    - Colors: confirm contrast ratios (WCAG AA)
    - Shadows: refine depth + consistency
  - [ ] Update Figma designs to match live code
  - **Daily total: 5h**

- **Wed, Jul 18**
  - [ ] Documentation
    - Component library (Storybook or Figma component guide)
    - Design system tokens (colors, typography, spacing)
    - Accessibility checklist (complete per-component)
    - Performance metrics (Lighthouse scores)
  - [ ] Create user documentation (if applicable)
  - **Daily total: 4h**

- **Thu, Jul 19**
  - [ ] Deployment preparation
    - Environment setup (staging → production)
    - Build optimization (code splitting, lazy loading)
    - Asset optimization (images, fonts)
    - SEO checklist (meta tags, Open Graph)
  - **Daily total: 4h**

- **Fri, Jul 20**
  - [ ] Final QA + Sign-off
    - Full regression test (all screens, all states)
    - Performance baseline (Lighthouse, Core Web Vitals)
    - Accessibility final check (WCAG AA pass)
    - Cross-browser final test
  - **Daily total: 5h**

- **Sat, Jul 21**
  - [ ] Address any final feedback
    - Stakeholder review → fix high-priority items
    - Edge case handling (very long text, truncation, etc.)
  - **Daily total: 3h**

- **Sun, Jul 22** (Pre-launch)
  - [ ] Final launch checklist
    - All screens tested and approved
    - All documentation complete
    - Deployment ready
  - [ ] Plan Week 7 (post-launch monitoring)
  - **Daily total: 2h**

**Week 6 Total: 28h** ✅  
**Deliverable** : Polished, fully-tested Learning App frontend (8–10 screens), documentation, deployment-ready

---

### WEEK 7 (July 23–29) — CONTINGENCY & OPTIMIZATION
**Focus** : Launch buffer, bug fixes, performance optimization, future features

**Daily Tasks**
- **Mon, Jul 23**
  - [ ] Post-launch monitoring (if live)
    - Bug triage
    - User feedback review
    - Performance metrics (real user data)
  - [ ] OR: Continue refinement if not yet live
  - **Daily total: 4h**

- **Tue, Jul 24 – Fri, Jul 28**
  - [ ] Flexible work (based on needs)
    - Additional screens (if scope expanded)
    - Performance optimization (if needed)
    - Future feature foundation (pagination, search, filters)
    - Edge case handling (error recovery, offline support)
  - **Daily total: 5h × 5 days = 25h**

- **Sat, Jul 29**
  - [ ] Optional: Start Phase 2 features
    - Analytics integration
    - Advanced filtering / search
    - Coaching marketplace (full integration)
  - **Daily total: 4h**

**Week 7 Total: 29h** (Flexible buffer)

---

### WEEK 8 (July 30–31) — FINAL PUSH & WRAP
**Focus** : Last-minute fixes, wrap-up, post-launch

- **Wed, Jul 30**
  - [ ] Final bug fixes
  - [ ] Performance optimization (if needed)
  - **Daily total: 5h**

- **Thu, Jul 31**
  - [ ] Final review + launch
  - [ ] Archive project documentation
  - [ ] Retrospective + lessons learned
  - **Daily total: 3h**

**Week 8 Total: 8h**

---

## 📊 AGGREGATE TIMELINE

| Week | Dates | Focus | Hours | Deliverable |
|------|-------|-------|-------|-------------|
| 1 | Jun 11–17 | Foundations & Design System | 27h | 5 hi-fi screens, design system audit |
| 2 | Jun 18–24 | Design Polish & Prototype | 31h | 10 screens, interactive prototype, a11y audit |
| 3 | Jun 25–Jul 1 | React Build (Tier 1) | 34h | Component library, 3 screens live |
| 4 | Jul 2–8 | React Build (Tier 2) | 31h | 8–10 screens live, form validation |
| 5 | Jul 9–15 | Polish & Testing | 31h | Animations, loading/error states, a11y pass |
| 6 | Jul 16–22 | Final Refinement | 28h | Polished app, documentation, deployment-ready |
| 7 | Jul 23–29 | Contingency & Optimization | 29h | Post-launch or Phase 2 prep |
| 8 | Jul 30–31 | Final Push & Wrap | 8h | Launch, retrospective |
| **TOTAL** | **50 days** | **7 weeks** | **~189h** | **Production Learning App** |

---

## 🎯 KEY MILESTONES

- **Jun 17** — Design system finalized, 5 screens designed
- **Jun 24** — All 10 screens designed, interactive prototype complete
- **Jul 1** — Component library built, 3 screens live (Dashboard, Passeport, Lesson Player)
- **Jul 8** — All 8–10 screens live, form validation working
- **Jul 15** — Animations, loading states, accessibility passing WCAG AA
- **Jul 22** — Final polish, documentation, deployment-ready
- **Jul 31** — **LAUNCH** ✅

---

## 🛠️ DAILY RHYTHM

### Time Blocking (Recommended)
```
9:00–11:30   : Design / Architecture / Strategy (2.5h)
11:30–12:30  : Break / Async comms
12:30–16:30  : Focused Build / Coding (4h)
16:30–17:00  : Code review, documentation, cleanup
17:00+       : Wrap-up, notes, next-day planning

Total: 6.5h focused work/day × 5 days/week = 32.5h/week
(More than the 40h/week baseline allows for admin, meetings, breaks)
```

### Weekly Rhythm
- **Mon** : Plan week, high-level architecture
- **Tue–Thu** : Execute (code, design, testing)
- **Fri** : Integrate, test, document
- **Sat** : QA, polish, reflection
- **Sun** : Review, plan next week

---

## 📝 TRACKING

### Checklist Template (Copy This Weekly)
```markdown
## Week N (Date–Date)

### Completed
- [ ] Task 1
- [ ] Task 2
- [x] Task 3 ✅

### In Progress
- [ ] Task 4 (60%)
- [ ] Task 5

### Blocked
- [ ] Task 6 (waiting for X)

### Notes
- Learned Y
- Need to revisit Z

### Hours
- Design: 8h
- Code: 12h
- Test: 5h
- Meetings/Async: 2h
- **Total: 27h**
```

---

## ⚠️ CONTINGENCIES

### If Behind Schedule
- **Priority 1 screens**: Dashboard, Passeport, Lesson Player (MUST ship)
- **Optional screens**: Veille, Leaderboard, Onboarding (can defer to Phase 2)
- **Minimum viable feature set**:
  - View current lesson
  - Track competence progress
  - Request coaching
  - Journal reflection
  - User profile

### If Blocked on Design
- Use Figma low-fidelity wireframes to start coding components
- Build pixel-perfect later (Polish Week)

### If Blocked on Figma Tokens
- Use hardcoded color values temporarily
- Switch to token imports once ready (no component changes needed)

### If Performance Issues
- Implement code splitting (lazy load pages)
- Optimize images (compress, WebP)
- Reduce animations (remove low-impact ones)

---

## ✅ DEFINITION OF DONE (WEEK 8)

The Learning App is **PRODUCTION READY** when:
- ✅ All 8–10 screens built + tested
- ✅ WCAG AA accessibility passing
- ✅ Responsive (mobile, tablet, desktop)
- ✅ All interactions working (60fps)
- ✅ Loading, error, empty states included
- ✅ Documentation complete
- ✅ Performance optimized (Lighthouse 90+)
- ✅ Deployed or deployment-ready
- ✅ User testing passed (or scheduled)

---

## 📚 Reference Docs

- **UX-UI-BOOTCAMP.md** — Learning framework
- **LEARNING-APP-DESIGN-PROJECT.md** — Design specs
- **README.md** — Learning materials index
- **FIGMA-FOUNDATIONS-AUDIT.md** — Design system audit
- **WCAG-AA-CHECKLIST.md** — Accessibility reference

---

**You have 50 days. You have comprehensive learning materials. You have a clear roadmap. Now execute. Ship by July 31. 🚀**
