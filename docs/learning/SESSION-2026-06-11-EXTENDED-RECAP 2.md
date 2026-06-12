# Session 2026-06-11 Extended Recap — Bootcamp + Convergence Plan

> **Date** : June 11, 2026  
> **Duration** : ~2.5 hours  
> **Outcome** : Complete 12-week mastery plan (Learning App bootcamp + all project applications)  
> **Status** : ✅ READY TO EXECUTE

---

## 🎯 SESSION PIVOT

**User Request** : "Ok tu peux me rajouter aussi un projet d'application justement SBO comme la methode learnign app pour aussi refonte site internet qui est déjà bien entamé mais comment appliquer ce que je vais apprendre la sur le site, la learning app; logo procreate, figma etc"

**Translation** : "Can you also add an SBO application project using the same bootcamp method for the site refonte as well, but how do I apply what I'll learn there to the site, the learning app, logo, Procreate, Figma, etc?"

**What This Means** : The user doesn't want isolated bootcamps — they want to **learn once (Learning App), apply everywhere (SBO, Site, Logo, Procreate, Figma)**.

---

## 📚 DELIVERABLES CREATED (This Session)

### 1. **UX-UI-BOOTCAMP.md** (Week 1–4 Core Course)
**Purpose** : Structured 4-week bootcamp using Learning App as hands-on project

**Contents**
- Week 1 (14h) : Design system, IA, patterns, wireframes
- Weeks 2–3 (18h) : High-fidelity design, prototype, a11y audit
- Week 4 (8h) : React implementation, 8–10 screens live
- Success metrics + resources

**Delivery** : Learning App MVP shipped by Week 4

---

### 2. **LEARNING-APP-DESIGN-PROJECT.md** (Design Specifications)
**Purpose** : Detailed specs for 8–10 screens with component library

**Contents**
- **Screen Specs** : Dashboard, Passeport, Lesson Player, Coaching, Journal, etc.
  - High-fidelity mockups (desktop + mobile)
  - Component usage (Button, Card, Modal, Badge, etc.)
  - Interactions (forms, modals, scroll-reveals)
  - States (loading, empty, error, success)

- **Design System** : Colors, typography, spacing, tokens
- **Interaction Patterns** : Micro-animations, responsive, WCAG AA
- **Accessibility Checklist** : WCAG AA per screen

**Delivery** : Blueprint for building Learning App screens

---

### 3. **JULY-ROADMAP.md** (Week-by-Week Timeline)
**Purpose** : 50-day breakdown (Jun 11–Jul 31) with daily tasks

**Structure**
- Weeks 1–6 : Bootcamp + Learning App build
- Weeks 7–8 : Polish, launch, contingency buffer
- 27–34h/week across 50 days
- Daily tasks, milestones, contingencies

**Delivery** : Executable roadmap (day-by-day plan)

---

### 4. **SBO-ACCOMPAGNEMENT-PROJECT.md** (Phase 2 Application)
**Purpose** : Refonte SBO section using **reused Learning App components**

**Contents**
- **5 Screens** : Hero, Stats grid, Services (4-col), Timeline (90-day), CTA
- **Reuse Checklist** : Which components come from Learning App
  - Button → CTA buttons, expand buttons
  - Card → Service cards, stat cards
  - Badge → Phase badges, eyebrow tags
  - ProgressBar → Timeline progress
  - All animations, colors, spacing (identical)

- **Build Phases** : Design (Week 5) → Build (Week 6–7) → Launch (Week 8+)

**Delivery** : SBO section ships Weeks 5–8 (parallel to Learning App final polish)

---

### 5. **SKILLS-TRANSFER-ROADMAP.md** (The Master Convergence Plan)
**Purpose** : 12-week plan showing how bootcamp learning applies to **ALL projects**

**Structure**
- **Phase 1 (Weeks 1–6)** : Learning App bootcamp core
- **Phase 2 (Weeks 7–12)** : Parallel applications (SBO, Site, Procreate, Logo)

**Key Insight**
```
Learn Once (Learning App)
    ↓
Apply Everywhere
    ├─ SBO Section (components + tokens)
    ├─ Site Refonte (all pages, shared library)
    ├─ Logo Animations (Framer Motion patterns)
    ├─ Procreate Assets (Direction C aesthetic)
    └─ Figma Mastery (design system parity)
```

**Skills Map** : Every skill from bootcamp is immediately applicable
- Week 1 (design system) → applies to SBO, Site, Figma
- Week 4 (React) → applies to SBO, Site, Logo animations
- Weeks 5–6 (animations) → applies to Logo, Site, Procreate
- Design tokens → used by all projects (one library)
- Components → reused across all projects
- Animations → same spring physics, easing curves everywhere

**Delivery** : Clear roadmap for how everything connects

---

## 🗺️ THE 12-WEEK CONVERGENCE MODEL

### Timeline Overview
```
PHASE 1: Learning App Core (Weeks 1–6: Jun 11–Jul 22)
├─ Week 1: Design system fundamentals
├─ Weeks 2–3: Component design + prototype
├─ Week 4: React implementation
├─ Weeks 5–6: Animations + polish + ship
│
PHASE 2A: SBO Section Parallel (Weeks 5–8: Jul 9–Aug 2)
├─ Week 5: Design SBO (in Figma)
├─ Weeks 6–7: Build (reuse Learning App components)
├─ Week 8: Polish + ship SBO
│
PHASE 2B: Site Refonte (Weeks 7–10: Jul 23–Aug 20)
├─ Week 7: Plan refonte (using shared components)
├─ Weeks 8–9: Build pages (reuse button, card, form patterns)
├─ Week 10: Polish + integrate assets
│
PHASE 2C: Procreate Assets (Weeks 7–10: Jul 23–Aug 20)
├─ Week 7: Create hero gradient (watercolor learning)
├─ Weeks 8–9: Create blobs, STRIDE diagram, Passeport
├─ Week 10: Polish + export
│
PHASE 2D: Logo Animations (Weeks 5–8: Jul 9–Aug 2)
├─ Week 5: Design 3 variants (Breathing, Color-flow, Morphing)
├─ Weeks 6–7: Build with Framer Motion (patterns from bootcamp)
├─ Week 8: Polish + ship
│
PHASE 2E: Figma Mastery (Ongoing, all 12 weeks)
├─ Create component library (from Learning App)
├─ Set up design variables (colors, typography)
├─ Link to CSS tokens (parity audit)
├─ Maintain as single source of truth
```

### Parallel Execution (Weeks 5–8)
By Week 5, you're running 5 projects in parallel:
- **Learning App** : Final polish (animations, a11y)
- **SBO Section** : Parallel build (reuse Learning App code)
- **Logo Animations** : Build (apply bootcamp animation patterns)
- **Procreate Assets** : Start creation (apply bootcamp color/aesthetic learning)
- **Figma** : Maintain component library (source of truth for all)

This is efficient because **all projects use the same design system** — no rework, just application.

---

## 🔄 COMPONENT REUSE (The Gold Standard)

### Shared Component Library
```
src/components/common/    (Built in Learning App, reused everywhere)
├─ Button.tsx             (primary, secondary, icon, loading)
├─ Card.tsx               (default, elevated, interactive)
├─ Input.tsx              (text, email, error, helper)
├─ Modal.tsx              (overlay, focus trap, actions)
├─ Badge.tsx              (status, competence level)
└─ ProgressBar.tsx        (linear, colored, animated)

src/components/learning-app/
├─ DashboardCard.tsx      (reused in SBO StatCard)
├─ PasseportCell.tsx      (learning-app specific)
└─ LessonCard.tsx         (adapted for Formation section)

src/components/marketing-site/
├─ ServiceCard.tsx        (SBO Section, reuses Card + Button)
├─ StatCard.tsx           (SBO Stats, reuses DashboardCard)
├─ TimelineNode.tsx       (SBO Timeline, reuses Badge)
└─ FormationCard.tsx      (Formation, reuses LessonCard)
```

### Reuse in Action
| Component | Learning App | SBO | Site Formation | Site Blog |
|-----------|--------------|-----|-----------------|-----------|
| Button | CTA, quiz nav | Service CTA, expand | Formation CTA | Blog CTA |
| Card | Lesson card, recommended | Service card, stat card | Formation card | Article card |
| Badge | Competence level | Phase badge | Status badge | Topic badge |
| Input | Quiz form, coaching | Quote request | Contact form | Newsletter |
| Modal | Coaching request, feedback | Service detail (alt) | Feedback modal | Share modal |

**One build. Five uses. No duplication.**

---

## 🎨 DESIGN SYSTEM PARITY (CRITICAL)

### Rule: Build Once, Use Everywhere

**Figma Design System** (Single Source of Truth)
```
Figma Variables
├─ Colors (Teal, Orange, Gold, + states)
├─ Typography (League Spartan, Nunito, Mono)
└─ Spacing (xs–3xl)

Figma Components
├─ Button (variants: primary, secondary, size, state)
├─ Card (variants: style, interactive)
├─ Input (variants: size, error, disabled)
└─ [+ more]

Figma Screens
├─ Learning App (8–10 screens)
├─ SBO Section (5 screens)
├─ Site Marketing (6–8 pages)
└─ [Brand identity, logo variations]
```

**CSS Variables** (Code)
```
:root {
  --color-primary: #55A1B4;        /* From Figma variable */
  --color-secondary: #ED843A;      /* From Figma variable */
  --color-accent: #F8B044;         /* From Figma variable */
  
  --font-display: 'League Spartan'; /* From Figma text style */
  --font-body: 'Nunito';           /* From Figma text style */
  
  --space-xs: 0.25rem;             /* From Figma spacing */
  --space-md: 1rem;
  /* ... etc */
}
```

**React Components** (Code)
```
<Button variant="primary" size="md">
  Click me
</Button>
/* Props match Figma component variants */

<Card interactive>
  Content here
</Card>
/* Styling references CSS variables (which come from Figma) */
```

**Parity Audit Checklist**
- [ ] Figma variable value = CSS variable value
- [ ] Figma component variant = React component prop
- [ ] Figma text style font = React component font
- [ ] Figma spacing value = React component spacing
- [ ] Figma component on 2+ screens = React component in common library
- [ ] Every component has hover/active/disabled/loading states (Figma + code match)

**Verify** : `docs/figma/FIGMA-FOUNDATIONS-AUDIT.md` (quarterly update)

---

## 🚀 EXECUTION CHECKLIST

### This Week (Jun 11–17)
- [ ] Read UX-UI-BOOTCAMP.md (2h)
- [ ] Read LEARNING-APP-DESIGN-PROJECT.md (2h)
- [ ] Audit Figma design system (1h)
- [ ] Start Week 1 Day 1 (design system crash course)

### Week 1 End (Jun 17)
- [ ] 5 screens wireframed + designed
- [ ] Design system audit complete
- [ ] Component specs documented

### Week 4 End (Jul 8)
- [ ] All 8–10 screens live in React
- [ ] Component library built
- [ ] Form validation working

### Week 6 End (Jul 22)
- [ ] Learning App MVP shipped
- [ ] Animations + a11y complete
- [ ] Documentation ready for transfer

### Weeks 5–8 (Parallel to Learning App Final Polish)
- [ ] SBO section designed (Figma)
- [ ] SBO section built (React)
- [ ] SBO components reuse Learning App library
- [ ] SBO shipped

### Weeks 7–10 (After Learning App Ships)
- [ ] Site refonte designed + built
- [ ] All pages reuse shared components
- [ ] Procreate assets created (hero, blobs, STRIDE, Passeport)
- [ ] Logo animations shipped
- [ ] Figma design system mature

### Week 12 (Aug 31)
- [ ] **Everything shipped** (Learning App, SBO, Site, Logo, Procreate)
- [ ] One cohesive design language across all projects
- [ ] Component library mature + documented
- [ ] Design system parity verified

---

## 📊 IMPACT SUMMARY

### Learning Outcomes
- ✅ Design system thinking (tokens → components → pages)
- ✅ Figma mastery (variables, text styles, components, parity)
- ✅ React architecture (common library + domain-specific)
- ✅ Animation mastery (Framer Motion, SVG, scroll-reveals)
- ✅ Accessibility mastery (WCAG AA)
- ✅ Procreate mastery (watercolor, illustrations)
- ✅ Mobile-first design (responsive, touch-friendly)

### Business Outcomes
- ✅ Learning App shipped (product)
- ✅ SBO section shipped (marketing)
- ✅ Site refonte shipped (marketing)
- ✅ Logo animations shipped (brand)
- ✅ Procreate assets complete (design)
- ✅ Figma design system mature (scalable)
- ✅ One cohesive brand language (premium feel)

### Efficiency Wins
- **No duplication** : Components built once, used everywhere
- **Faster builds** : SBO + Site use Learning App patterns
- **Consistency** : Design system drives all projects
- **Scalability** : New projects can use existing components
- **Maintainability** : Change design tokens once → updates everywhere

---

## 📖 ALL DOCUMENTS (This Session + Prior)

```
docs/learning/
├─ UX-UI-BOOTCAMP.md                    [NEW — 4-week course]
├─ LEARNING-APP-DESIGN-PROJECT.md       [NEW — Design specs]
├─ JULY-ROADMAP.md                      [NEW — Week-by-week]
├─ SBO-ACCOMPAGNEMENT-PROJECT.md        [NEW — Phase 2 specs]
├─ SKILLS-TRANSFER-ROADMAP.md           [NEW — 12-week mastery]
├─ SESSION-2026-06-11-BOOTCAMP-SETUP.md [NEW — Session recap 1]
├─ SESSION-2026-06-11-EXTENDED-RECAP.md [NEW — This file]
│
├─ README.md                            [Index + quick start]
├─ PROCREATE-BOOTCAMP.md                [Secondary — illustration]
├─ FRAMER-MOTION-LEARNING.md            [Secondary — animation ref]
├─ ANIMATED-LOGO-PROJECT.md             [Secondary — logo specs]
└─ WEEK1-PARALLEL-PLAN.md               [Secondary — parallel schedule]

docs/figma/
└─ FIGMA-FOUNDATIONS-AUDIT.md           [Design system parity]

docs/site/
├─ DESIGN-INSPO.md                      [Direction C brief]
├─ SITE-STRUCTURE-DESIGN-C.md           [Site structure]
├─ COPY-CONSEIL-SBO.md                  [SBO copy (to update)]
└─ [other marketing docs]
```

---

## 💡 KEY PRINCIPLES (Memorize These)

1. **One Design System** → Figma is source of truth (colors, typography, spacing, components)
2. **One Component Library** → Built in Learning App, reused everywhere
3. **One Aesthetic** → Direction C (glass, illustrations, warm, premium)
4. **One Animation Language** → Spring physics, staggered reveals, consistent curves
5. **One Accessibility Standard** → WCAG AA on all projects
6. **Build Once, Use Everywhere** → No duplication, maximum reuse
7. **Learn by Doing** → Bootcamp teaches concepts via hands-on Learning App build
8. **Transfer Skills Immediately** → What you learn Monday is applied Wednesday (SBO)
9. **Parallel Efficiency** → While finalizing Learning App, SBO builds in parallel
10. **Scalable Growth** → After July 31, new projects (Phase 3) can use the same system

---

## 🎯 YOUR 12-WEEK NORTH STAR

By August 31, 2026:
- **You'll have mastered** design systems, Figma, React components, animations, Procreate, accessibility
- **You'll have shipped** Learning App, SBO section, site refonte, logo animations, illustration assets
- **You'll own** a scalable design system that powers all future projects
- **You'll understand** how to think like a design system architect (not just a coder or designer)

---

**Everything is documented. Everything is connected. Everything is ready. Start Week 1 Monday. Ship by August 31. 🚀**

---

## 📝 Quick Reference Links

- **Start here** : [UX-UI-BOOTCAMP.md](UX-UI-BOOTCAMP.md)
- **Weekly plan** : [JULY-ROADMAP.md](JULY-ROADMAP.md)
- **Learning App specs** : [LEARNING-APP-DESIGN-PROJECT.md](LEARNING-APP-DESIGN-PROJECT.md)
- **SBO specs** : [SBO-ACCOMPAGNEMENT-PROJECT.md](SBO-ACCOMPAGNEMENT-PROJECT.md)
- **Master plan** : [SKILLS-TRANSFER-ROADMAP.md](SKILLS-TRANSFER-ROADMAP.md)
- **Design system** : [FIGMA-FOUNDATIONS-AUDIT.md](../figma/FIGMA-FOUNDATIONS-AUDIT.md)
