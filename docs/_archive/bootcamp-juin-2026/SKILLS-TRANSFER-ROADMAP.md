# Skills Transfer Roadmap — Bootcamp Learning → All Projects

> **Vision** : Master UX/UI design system thinking via Learning App bootcamp, then **apply directly** to SBO section, site refonte, logo animations, and Figma mastery  
> **Timeline** : June 11 – August 31 (12 weeks)  
> **Philosophy** : One design system, one component library, multiple applications

---

## 🎯 THE CONVERGENCE MODEL

Instead of learning in isolation, you're learning **in context** (building Learning App) and immediately **transferring skills** to production marketing assets.

```
┌──────────────────────────────────────────────────────┐
│  LEARNING APP BOOTCAMP (Weeks 1–6: Jun 11–Jul 22)  │
│  Core skill: Design system → Components → Pages     │
│                                                      │
│  Outputs:                                            │
│  ├─ Shared component library (Button, Card, etc.)   │
│  ├─ Design system tokens (colors, typography)       │
│  ├─ Animation patterns (scroll-reveal, hover)       │
│  ├─ Figma → CSS parity workflow                     │
│  └─ WCAG AA accessibility practices                 │
│                                                      │
│         ↓↓↓ TRANSFER TO ↓↓↓                         │
│                                                      │
├──────────────────────────────────────────────────────┤
│  DOWNSTREAM APPLICATIONS                             │
│                                                      │
│  1. SBO SECTION (Weeks 5–8: Jul 9–Aug 2)           │
│     └─ Reuse: components, design system, patterns   │
│        New: Service cards, timeline animations      │
│                                                      │
│  2. SITE MARKETING REFONTE (Weeks 7–10: Jul 23–Aug 20)
│     └─ Reuse: all Learning App components, tokens   │
│        New: Formation, Learning App showcase, Blog   │
│                                                      │
│  3. LOGO ANIMATIONS (Weeks 5–6: Jul 9–22)          │
│     └─ Apply: Framer Motion micro-interactions      │
│        Use: Learning from bootcamp animation patterns
│                                                      │
│  4. PROCREATE ASSETS (Weeks 7–10: Jul 23–Aug 20)   │
│     └─ Create: Hero gradient, blobs, illustrations  │
│        Use: Watercolor techniques from bootcamp     │
│                                                      │
│  5. FIGMA MASTERY (Ongoing: All 12 weeks)           │
│     └─ Design: Screens, components, variables       │
│        Workflow: Figma → CSS tokens → React         │
│                                                      │
└──────────────────────────────────────────────────────┘
```

---

## 📚 SKILLS MAP (What You Learn → Where You Apply It)

### WEEK 1: Design System Fundamentals

**Learning App Bootcamp (Week 1)**
- Understand token flow: Figma variables → CSS custom properties → Tailwind
- Map color palette (primary, secondary, accent, states)
- Define typography scale (display, heading, body, mono)
- Create spacing system (xs–3xl)

**Transfer to SBO Section**
- ✅ Use **identical color tokens** from Learning App (Teal #55A1B4, Orange #ED843A, Gold #F8B044)
- ✅ Use **identical typography** (League Spartan headers, Nunito body)
- ✅ Use **identical spacing scale** (no custom spacing)
- ✅ Build design system **once, use everywhere**

**Transfer to Site Refonte**
- ✅ Apply token consistency across all pages (Home, Formation, Blog, Contact)
- ✅ No hardcoded colors; reference design tokens only
- ✅ Figma component library = source of truth

**Transfer to Figma**
- ✅ Create Figma variables (color, typography, spacing)
- ✅ Bind variables to components
- ✅ Text style bindings on all screens
- ✅ Library components auto-update across projects

---

### WEEKS 2–3: Component Design Patterns

**Learning App Bootcamp (Weeks 2–3)**
- Design components: Button, Input, Card, Modal, Badge, ProgressBar
- Define states per component (default, hover, active, disabled, loading, error, success)
- Create interactive prototype (clickable flows in Figma)
- Test responsive layouts (mobile, tablet, desktop)

**Transfer to Figma Component Library**
- ✅ Extract Learning App component designs → Figma components
- ✅ Create variants (size, state, color, disabled)
- ✅ Set up text style bindings (obligatoire N1 + N2 screens)
- ✅ Document component specs (padding, border-radius, shadows)

**Transfer to Shared React Component Library**
- ✅ Build components in `src/components/common/` with matching Figma specs
- ✅ Export from single source of truth
- ✅ Import into both Learning App + Site pages
- ✅ Props match Figma variants (size, variant, state)

**Transfer to SBO Section**
- ✅ ServiceCard = reuse Card + Badge + Button patterns
- ✅ StatCard = reuse DashboardCard styling
- ✅ Timeline nodes = reuse Badge + ProgressBar

**Transfer to Site Refonte**
- ✅ All CTAs use **identical Button component**
- ✅ All featured content uses **identical Card component**
- ✅ No inline styles; reference component library

---

### WEEK 4: React Implementation & Mobile-First

**Learning App Bootcamp (Week 4)**
- Build 8–10 screens in React
- Extract components into `src/components/`
- Implement responsive design (mobile 375px → desktop 1440px)
- Test on real devices

**Transfer to Code Organization**
```
src/components/
├─ common/              # Reusable (Button, Card, Modal, etc.)
│  ├─ Button.tsx
│  ├─ Card.tsx
│  ├─ Input.tsx
│  ├─ Badge.tsx
│  ├─ Modal.tsx
│  └─ ProgressBar.tsx
│
├─ learning-app/        # Learning App specific
│  ├─ DashboardCard.tsx
│  ├─ PasseportCell.tsx
│  └─ LessonCard.tsx
│
└─ marketing-site/      # Site marketing specific
   ├─ ServiceCard.tsx   # SBO Section
   ├─ StatCard.tsx      # SBO Stats
   ├─ TimelineNode.tsx  # SBO Timeline
   └─ FormationCard.tsx # Formation section
```

**Transfer to SBO Section**
- ✅ Reuse components from Learning App
- ✅ Create SBO-specific wrapper components (ServiceCard, Timeline)
- ✅ Same responsive breakpoints
- ✅ Same mobile-first approach

**Transfer to Site Refonte**
- ✅ Refactor all pages to use shared components
- ✅ Formation page: reuse LessonCard pattern
- ✅ Blog: reuse Card component for articles
- ✅ Contact: reuse Input + Button components

---

### WEEKS 5–6: Animation & Micro-Interactions

**Learning App Bootcamp (Weeks 5–6)**
- Add Framer Motion animations (scroll-reveal, button hover, card transitions)
- Implement loading states (skeleton loaders)
- Implement empty states, error states
- Test accessibility (WCAG AA)
- Optimize performance (60fps)

**Transfer to Logo Animations (Concurrent: Week 5–6)**
- ✅ Learn spring physics from button hover (stiffness: 100, damping: 20)
- ✅ Apply to logo animations (breathing, color-flow, morphing)
- ✅ Use identical easing curves (cubic-bezier(0.22, 1, 0.36, 1))
- ✅ Test 60fps performance (same optimization techniques)

**Transfer to SBO Section (Weeks 6–7)**
- ✅ Timeline line draws on scroll-reveal (SVG pathLength animation)
- ✅ Service cards fade-in with stagger (same as Learning App)
- ✅ Button hovers scale + shadow (identical interaction)
- ✅ Loading states use skeleton loaders (same pattern)

**Transfer to Site Refonte (Weeks 8–10)**
- ✅ Home hero: use learning from Learning App hero (scroll-reveal, word-swap)
- ✅ Formation section: reuse scroll-reveal stagger
- ✅ Blog cards: reuse card hover animation
- ✅ CTA buttons: reuse magnetic hover physics (if implemented)

**Transfer to Procreate (Weeks 7–10, Concurrent)**
- ⏸️ Design **warm hero gradient** (learning from color palette)
- ⏸️ Design **soft blobs** (Direction C aesthetic learned in bootcamp)
- ⏸️ Hand-draw **STRIDE diagram** (learning from annotation patterns)
- ⏸️ Create **Passeport spiral** (learning from competence visualization)

---

### WEEKS 7–10: Advanced Patterns & Polish

**Learning App Bootcamp + SBO + Site Refonte**

**Pattern Transfer Matrix**

| Pattern | Learning App | SBO | Site | Where You Learn |
|---------|--------------|-----|------|-----------------|
| Form validation | Coaching form | Quote request | Contact form | Learning App Week 4 |
| Accordion | Lesson tabs | Service detail expand | FAQ section | Learning App Week 5 |
| Modal | Coaching success | Service detail (alt) | Feedback modal | Learning App Week 4 |
| Scroll-reveal | Dashboard entry | Timeline + stats | All sections | Learning App Week 5 |
| Button hover | CTA buttons | Service CTA | All CTAs | Learning App Week 5 |
| Card grid | Lessons + recs | Services (4-col) | Blog (3-col) | Learning App Weeks 1–4 |
| Responsive collapse | Sidebar toggle | Mobile accordion | Mobile menu | Learning App Week 4 |
| Loading state | Lesson skeleton | Service skeleton | Page skeleton | Learning App Week 5 |
| Empty state | "No lessons" | "No services" (N/A) | "No blog posts" | Learning App Week 5 |
| Accessibility | WCAG AA audit | WCAG AA audit | WCAG AA audit | Learning App Weeks 1–6 |

---

## 🗓️ 12-WEEK MASTER TIMELINE

### Phase 1: Learning App Core (Weeks 1–6)
| Week | Bootcamp Focus | Apply to SBO | Apply to Site | Apply to Logo | Apply to Procreate |
|------|---------------|-------------|---------------|---------------|--------------------|
| 1 (Jun 11–17) | Design system | - | - | - | - |
| 2 (Jun 18–24) | Design 10 screens | - | Prepare design system | - | - |
| 3 (Jun 25–Jul 1) | Build components | Plan SBO | - | - | - |
| 4 (Jul 2–8) | Build screens | Design SBO (Figma) | - | - | - |
| 5 (Jul 9–15) | Animations + a11y | **Start build** | Plan refonte | **Start animations** | Plan assets |
| 6 (Jul 16–22) | Final polish | **Build complete** | Design refonte | **Animations done** | - |

### Phase 2: Transfer & Parallel Work (Weeks 7–12)
| Week | Site Refonte | SBO Polish | Procreate | Logo Animations | Integration |
|------|-------------|-----------|-----------|-----------------|-------------|
| 7 (Jul 23–29) | **Start build** | Final polish + test | **Start production** | Refinement | - |
| 8 (Jul 30–Aug 5) | **Build continues** | **SHIP SBO** | **Production continues** | **SHIP Animations** | Logo + SBO → Site |
| 9 (Aug 6–12) | **Build continues** | - | **Production continues** | - | Procreate → Hero |
| 10 (Aug 13–20) | **Build continues** | - | **Procreate polish** | - | Assets → Site |
| 11 (Aug 21–27) | Final polish | - | **SHIP Procreate** | - | Site integration |
| 12 (Aug 28–31) | **SHIP REFONTE** | - | - | - | **ALL LIVE** |

---

## 🔄 COMPONENT REUSE CHECKLIST

### Learning App → SBO Section
- [ ] Extract Button component (primary, secondary, loading states)
- [ ] Extract Card component (service cards, stat cards)
- [ ] Extract Badge component (phase badges, eyebrow tags)
- [ ] Extract ProgressBar (timeline progress bar)
- [ ] Reuse design tokens (identical colors, typography, spacing)
- [ ] Reuse animations (scroll-reveal, hover effects, micro-interactions)

### Learning App → Site Refonte
- [ ] Create shared component library in `src/components/common/`
- [ ] Update Home page (reuse hero pattern from Learning App)
- [ ] Update Formation page (reuse lesson card pattern)
- [ ] Update Blog (reuse content card pattern)
- [ ] Update Contact (reuse form inputs + buttons)
- [ ] Update Footer (reuse typography scale)

### Procreate Learnings → Site
- [ ] Create hero gradient (Procreate techniques → Direction C aesthetic)
- [ ] Create background blobs (watercolor blending → SVG export)
- [ ] Create STRIDE diagram (annotation + composition)
- [ ] Create Passeport spiral (information design)
- [ ] Export @ 2x resolution (PNG, PSD)
- [ ] Integrate into Figma (as background images, overlays)

### Logo Animations → Learning App
- [ ] Breathing variant (scale animation) → Dashboard loading state
- [ ] Color-flow variant (gradient rotate) → Accent elements
- [ ] Morphing variant (Learn→Do→Match) → Hero hero visualization

### Figma Mastery → All Projects
- [ ] Create component library with variants
- [ ] Set up text style bindings (N1 components, N2 screens)
- [ ] Create color + typography variables
- [ ] Link Figma → CSS tokens (parity audit)
- [ ] Maintain single source of truth
- [ ] Document for handoff (if team involved)

---

## 🎨 DESIGN SYSTEM PARITY (The Gold Standard)

### The Goal
**One design system. One component library. Multiple applications.**

```
Figma Design System
    ↓
    ├─ Learning App (8–10 screens)
    ├─ SBO Section (5 screens)
    ├─ Site Refonte (6–8 pages)
    └─ Marketing assets (logo, gradients, illustrations)

All powered by:
  • Identical colors (Figma variables)
  • Identical typography (text styles)
  • Identical spacing (design tokens)
  • Identical components (Button, Card, Modal, etc.)
  • Identical patterns (animations, interactions, responsive)
```

### Parity Checklist
- [ ] Color tokens: Figma variables = CSS custom properties
- [ ] Typography: Figma text styles = Tailwind font utilities
- [ ] Spacing: Figma values = Tailwind space scale
- [ ] Components: Figma instances = React components (props match variants)
- [ ] Responsive: Figma breakpoints = Tailwind breakpoints
- [ ] Animations: Figma specs = Framer Motion curves + timings
- [ ] Accessibility: Figma audit = React WCAG AA test

**Verify quarterly** : Audit parity (FIGMA-FOUNDATIONS-AUDIT.md)

---

## 📊 LEARNING OUTCOMES (By Week 12)

### By End of Learning App Bootcamp (Week 6)
- ✅ Design system thinking (tokens, components, patterns)
- ✅ Figma workflow mastery (variables, text styles, components)
- ✅ React component architecture (common + domain-specific)
- ✅ Animation techniques (scroll-reveal, hover, micro-interactions)
- ✅ Accessibility practices (WCAG AA audit)
- ✅ Responsive design (mobile-first approach)

### By End of Phase 2 (Week 12)
- ✅ **Figma → CSS parity** (design system documented, working)
- ✅ **Shared component library** (reusable across projects)
- ✅ **Multi-project design language** (consistent everywhere)
- ✅ **Animation mastery** (Framer Motion + SVG + CSS)
- ✅ **Procreate mastery** (illustration asset production)
- ✅ **Full-stack UX/UI workflow** (from Figma to shipped code)

### Skill Progression
```
Week 1:    Design system theory
Week 2–3:  Component design
Week 4:    React implementation
Week 5–6:  Animation + polish
Week 7:    Transfer to SBO (practical application)
Week 8:    Transfer to site (scale up)
Week 9–10: Procreate + advanced patterns
Week 11–12: Integration + launch (everything together)
```

---

## 🚀 EXECUTION STRATEGY

### Rule 1: Build Once, Use Everywhere
- Create component **once** in Learning App
- Export from `src/components/common/`
- Import into SBO, Site, Anywhere else
- Update once → all projects stay in sync

### Rule 2: Figma Is Source of Truth
- Design in Figma first
- Document component specs
- Export design tokens
- Code matches Figma (not the other way around)
- Quarterly parity audit

### Rule 3: Tokens, Not Hardcoded Values
- **Never** hardcode `#55A1B4` in code
- **Always** use CSS custom property: `var(--color-primary)`
- Figma variables → CSS variables (automated if possible)
- Change one place (Figma) → updates everywhere

### Rule 4: Responsive Blueprint Once
- Define breakpoints once (375px, 768px, 1024px, 1440px)
- Responsive logic once (mobile first, progressive enhancement)
- Apply to all components + pages

### Rule 5: Animations Reusable
- Spring physics once (stiffness 100, damping 20)
- Easing curve once (cubic-bezier(0.22, 1, 0.36, 1))
- Apply to buttons, cards, scroll-reveals, modals
- Consistency = premium feel

---

## 📖 REFERENCE DOCUMENTS

All docs in `/docs/learning/` and `/docs/site/`:

| Phase | Document | Purpose |
|-------|----------|---------|
| Phase 1 | UX-UI-BOOTCAMP.md | Learning App bootcamp (4 weeks) |
| Phase 1 | LEARNING-APP-DESIGN-PROJECT.md | Learning App specs + components |
| Phase 1 | JULY-ROADMAP.md | Week-by-week timeline (Weeks 1–8) |
| Phase 2 | SBO-ACCOMPAGNEMENT-PROJECT.md | SBO section specs + reuse checklist |
| Phase 2 | **THIS FILE** | Skills transfer roadmap (12 weeks) |
| Phase 2 | PROCREATE-BOOTCAMP.md | Procreate learning (7 days, optional) |
| Phase 2 | FRAMER-MOTION-LEARNING.md | Animation patterns reference |
| Reference | FIGMA-FOUNDATIONS-AUDIT.md | Design system parity audit |
| Reference | DIRECTION-C-CHECKLIST.md | Direction C aesthetic requirements |

---

## ✅ SUCCESS DEFINITION (Week 12)

**By August 31, 2026:**

- ✅ Learning App shipped (8–10 screens, WCAG AA, responsive, animated)
- ✅ SBO section shipped (reused components, Direction C aesthetic)
- ✅ Site refonte in progress / shipped (all pages using shared components)
- ✅ Logo animations shipped (Framer Motion, 60fps)
- ✅ Procreate assets complete (hero gradient, blobs, illustrations)
- ✅ Figma design system mature (variables, text styles, component library)
- ✅ React component library robust (reusable, documented, tested)
- ✅ Accessibility mastery (WCAG AA across all projects)
- ✅ Design system parity verified (Figma ↔ code alignment)

**Outcome** : One cohesive design language, applied consistently across:
- Learning App
- SBO Advisory Section
- Site Marketing
- Logo Animations
- Procreate Assets
- Figma Design System

**All powered by a single, reusable component library and design token system.**

---

**This is your 12-week mastery plan. Learn once (Learning App), apply everywhere (SBO, Site, Logo, Procreate). The bootcamp isn't just for building the app — it's for building your design system thinking that powers all projects. 🚀**
