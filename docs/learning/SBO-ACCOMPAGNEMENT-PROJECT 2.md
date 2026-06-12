# SBO Accompagnement Project — Frontend Specifications

> **Scope** : Refonte section `/marketing/accompaniment` (SBO advisory services)  
> **Context** : Learning App bootcamp + skills transfer to site marketing  
> **Timeline** : Weeks 5–8 (July 9–August 2) — applies patterns from Learning App  
> **Status** : Ready for Phase 2 (after Learning App MVP ships)

---

## 📋 SECTION OVERVIEW

### Current State
- **Page** : `src/pages/marketing/MarketingAccompagnement.tsx`
- **Content** : SBO stats (Deloitte/WEF), 4 services, timelines (J+30/J+45/J+60)
- **Copy doc** : `docs/site/COPY-CONSEIL-SBO.md`
- **Issue** : Uses `tu` register (should be `vous` for B2B formal tone)

### Target State (Phase 2)
- Refactored to use **Design System Direction C** (glass + illustrations)
- **Interactive components** (timeline animations, service cards with hover states)
- **Responsive** (mobile-first, Direction C aesthetic)
- **WCAG AA** accessible
- **Reuse patterns** from Learning App bootcamp (components, animations, form patterns)

---

## 🎨 SCREEN SPECS

### 1. HERO SECTION (Accompaniment Overview)

**Purpose** : Introduce SBO advisory services positioning

**Layout (Desktop 1440px)**
```
┌─────────────────────────────────────────────────────┐
│  Hero Section (min-h-[100dvh], Direction C)         │
│  ┌───────────────────────────────────┐              │
│  │ Eyebrow tag: "SBO ACCOMPAGNEMENT" │              │
│  │                                   │              │
│  │ H1: "Structurer vos compétences   │              │
│  │      pour l'IA"                   │              │
│  │                                   │              │
│  │ P: 3 lines of copy (vous register)│              │
│  │                                   │              │
│  │ [CTA: Demander un devis]          │              │
│  │ [CTA: En savoir plus]             │              │
│  └───────────────────────────────────┘              │
│                                                     │
│  Background: Warm gradient (Direction C) +          │
│  Geometric blob (soft illustration, Procreate later)│
└─────────────────────────────────────────────────────┘
```

**Components**
- Eyebrow badge
- H1 Typography (League Spartan, tracking-tighter)
- Body copy (Nunito, max-w-[65ch])
- Button × 2 (primary + secondary)

**Mobile (375px)**
```
Full-width hero, vertical stack, 44px buttons
```

---

### 2. STATISTICS SECTION

**Purpose** : Social proof (Deloitte, WEF, Workday, Gartner data)

**Layout**
```
┌─────────────────────────────────────────────────────┐
│  Stats Grid (4 columns desktop, 2 mobile)           │
│                                                     │
│  ┌────────────┐  ┌────────────┐  ┌────────────┐   │
│  │ "72%"      │  │ "4.2x"     │  │ "2031"     │   │
│  │ Deloitte   │  │ WEF        │  │ Vision     │   │
│  │ "of...     │  │ "growth    │  │ "by...     │   │
│  └────────────┘  └────────────┘  └────────────┘   │
│                                                     │
│  ┌────────────┐                                     │
│  │ "89%"      │                                     │
│  │ Gartner    │                                     │
│  │ "orgs      │                                     │
│  └────────────┘                                     │
└─────────────────────────────────────────────────────┘
```

**Component**
- StatCard (number + source + description)
  - Font: Mono for numbers (tabular-nums)
  - Hover: subtle scale + shadow increase
  - Loading: skeleton loader

**Design Notes**
- Reuse `DashboardCard` component from Learning App
- Apply same hover micro-interaction (scale 1.02, shadow elevated)
- Color: Accent (gold #F8B044) for numbers

---

### 3. SERVICES SECTION

**Purpose** : 4 SBO services with deep-dive detail

**Layout (Desktop)**
```
┌─────────────────────────────────────────────────────┐
│  Services Grid (4 columns, cards with hover)        │
│                                                     │
│  ┌─────────────┐  ┌─────────────┐  ...             │
│  │ Service 1   │  │ Service 2   │                  │
│  │ ────────    │  │ ────────    │                  │
│  │ Icon        │  │ Icon        │                  │
│  │ Title       │  │ Title       │                  │
│  │ 2 lines desc│  │ 2 lines desc│                  │
│  │ [Learn >]   │  │ [Learn >]   │                  │
│  │ (expand)    │  │ (expand)    │                  │
│  └─────────────┘  └─────────────┘                  │
│                                                     │
│  Expanded detail (accordion or modal):             │
│  ├─ Full description (3–4 paragraphs)              │
│  ├─ Deliverables (bulleted list)                   │
│  ├─ Timeline (J+30, J+45, J+60)                    │
│  └─ CTA: Demander audit                            │
└─────────────────────────────────────────────────────┘
```

**Mobile (375px)**
```
Single column, 100% width cards, expand on tap
```

**Components**
- ServiceCard (icon + title + description + expand button)
  - Hover state: border color shift, shadow increase
  - Click: expand detail accordion
  - Reuse from Learning App: Card base, Button, Icon

**Services (from COPY-CONSEIL-SBO.md)**
1. **Audit Compétences** — Map current competences
2. **Structuration Métier** — Design SBO framework
3. **Mise en Place** — Implement + train
4. **Veille & Optimisation** — Ongoing monitoring

---

### 4. TIMELINE SECTION

**Purpose** : Visualize 90-day implementation journey

**Layout**
```
┌─────────────────────────────────────────────────────┐
│  Animated Timeline (vertical on mobile, h-scroll)   │
│                                                     │
│  J+30 ─────────────── J+45 ─────────────── J+60    │
│   │                      │                    │     │
│   ▼                      ▼                    ▼     │
│  [Phase 1]            [Phase 2]            [Phase 3]
│  Audit complete       Structure              Go-live
│  ┌───────────┐        ┌───────────┐        ┌──────┐
│  │ Deliver:  │        │ Deliver:  │        │Train │
│  │ ✓ Report  │        │ ✓ Framework│        │✓Live │
│  │ ✓ Roadmap │        │ ✓ Processes         │staff │
│  └───────────┘        └───────────┘        └──────┘
└─────────────────────────────────────────────────────┘
```

**Components**
- TimelineNode (date + phase title + deliverables)
- Timeline connector line (animated on scroll-reveal)
- Reuse from Learning App: ProgressBar, Badge

**Interaction**
- Scroll-reveal: line draws from left to right (SVG stroke animation)
- Stagger: each node fades in sequentially

---

### 5. PRICING / CTA SECTION

**Purpose** : Call to action for quote/consultation

**Layout**
```
┌─────────────────────────────────────────────────────┐
│  CTA Band (sticky or full-width section)            │
│                                                     │
│  H3: "Prêt à structurer vos compétences?"          │
│  P: "Commencez par un audit gratuit (30 min)"      │
│                                                     │
│  [Demander audit] [Planifier call]                  │
│                                                     │
│  Background: Direction C warm gradient + glass      │
└─────────────────────────────────────────────────────┘
```

**Components**
- Eyebrow tag (premium badge)
- H3 + copy
- Button × 2 (primary CTA: blue/teal, secondary: ghost)

**Interaction**
- Fade-in on scroll-reveal
- Hover: buttons scale slightly, shadow increases
- Reuse from Learning App: Button component + Framer Motion reveal

---

## 🎨 DESIGN SYSTEM REUSE (FROM LEARNING APP)

### Colors (Direction C palette)
```
Primary (Teal):     #55A1B4
Secondary (Orange): #ED843A
Accent (Gold):      #F8B044

Success:    #10B981
Warning:    #F59E0B
Danger:     #EF4444
Info:       #3B82F6
```

### Typography
```
H1/H2: League Spartan (bold, tracking-tighter)
H3/H4: League Spartan (semibold)
Body:  Nunito (regular, leading-relaxed)
Mono:  JetBrains Mono (numbers, code)
```

### Component Tokens (from Learning App)
- **Button** : Same padding, border-radius, min-height (44px), focus ring
- **Card** : Same padding, rounded-xl, subtle shadow, hover state
- **Input** : Same border, focus ring, error state (if form needed)
- **Badge** : Same pill styling, variants (status, accent)

### Spacing
```
xs:   4px
sm:   8px
md:   16px
lg:   24px
xl:   32px
2xl:  48px
3xl:  64px
```

**Apply consistently** : Same as Learning App sections

---

## 🎬 INTERACTION PATTERNS (FROM LEARNING APP)

### Scroll-Reveal Entry
```css
Initial:  opacity-0, translateY(16px)
Animate:  opacity-100, translateY(0)
Duration: 0.6s
Easing:   cubic-bezier(0.22, 1, 0.36, 1)
Delay:    staggerChildren 0.1s per item
```

### Button Hover / Active
```css
Hover:    scale(1.02), shadow elevated
Active:   scale(0.98), shadow inset
Duration: 200ms
```

### Card Hover
```css
Hover:    scale(1.02), shadow increase, border-color shift
Duration: 300ms
```

### Timeline Line Animation (SVG)
```javascript
// Draw line from left to right on scroll-view
pathLength: animated from 0 to 1
Duration:   1.2s
Easing:     easeOut
```

---

## 📱 RESPONSIVE LAYOUT

### Breakpoints
```
Mobile:   375px–479px   (full-width, single column)
Tablet:   480px–1023px  (2-column grid where applicable)
Desktop:  1024px+       (3–4 column grid, 2-pane layouts)
```

### Key Adjustments
- **Mobile** : 1-column services grid, vertical timeline, 44px min touch targets
- **Tablet** : 2-column services grid, horizontal timeline scroll
- **Desktop** : 4-column services grid, smooth timeline with connector line

### Sticky Elements
- Navigation header (if applicable)
- CTA section (maybe sticky on scroll)
- Bottom action buttons on mobile

---

## ✅ ACCESSIBILITY (WCAG AA)

- [ ] Keyboard navigation (Tab, Enter, Escape)
- [ ] Focus indicators (ring-2 visible)
- [ ] Form labels (if quote form included)
- [ ] Image alt text (SBO icon descriptions)
- [ ] Color not sole indicator (use text + color)
- [ ] Touch targets ≥ 44px
- [ ] Contrast ≥ 4.5:1 (text) or 3:1 (large text)
- [ ] Reduced motion respected (prefers-reduced-motion)
- [ ] Screen reader compatible (role, aria-label, aria-live)

---

## 🔄 REUSABLE COMPONENTS FROM LEARNING APP

| Component | Learning App | SBO Section |
|-----------|--------------|-------------|
| Button | Primary, secondary, icon, loading | CTA buttons, expand buttons |
| Card | Dashboard, lesson, activity | Service cards, stat cards |
| Badge | Competence level, status | Phase badges, eyebrow tags |
| ProgressBar | Lesson progress, competence % | Timeline progress (optional) |
| Input | Form fields | Quote form (optional) |
| Modal | Coaching request, feedback | Detail expansion (accordion) |

**Action** : Extract these as shared components in `src/components/common/` to be reused on both Learning App AND site.

---

## 📊 BUILD PHASES

### Phase 2a (Week 5: Jul 9–15) — Design Polish
- [ ] Finalize SBO section design in Figma
- [ ] Create responsive mockups (mobile/tablet/desktop)
- [ ] Design system audit (colors, typography, spacing match Learning App)
- [ ] Accessibility audit (WCAG AA)

### Phase 2b (Week 6: Jul 16–22) — React Implementation
- [ ] Extract shared components from Learning App
- [ ] Build ServiceCard + ServiceGrid
- [ ] Build Timeline component
- [ ] Build StatCard grid
- [ ] Integrate into `MarketingAccompagnement.tsx`

### Phase 2c (Week 7: Jul 23–29) — Polish + Testing
- [ ] Add scroll-reveal animations (Framer Motion)
- [ ] Test responsive (mobile/tablet/desktop)
- [ ] Accessibility testing (WCAG AA)
- [ ] Performance audit (Lighthouse)

### Phase 2d (Week 8+: Jul 30+) — Refinement
- [ ] Fix any bugs
- [ ] Update copy (vous register)
- [ ] Final design polish
- [ ] Deploy

---

## 🎨 PROCREATE ILLUSTRATION (FUTURE)

**After Learning App ships** (Phase 2 illustration):
- Warm blob background for hero (SBO-specific, 2–3 illustrations)
- Service icons (custom hand-drawn, Procreate)
- Timeline visual elements (optional)

**Reuse learning from Procreate bootcamp** : Watercolor techniques, blend modes, exporting @ 2x resolution

---

## 📸 FIGMA ORGANIZATION

### Structure
```
Figma File: TLS Design System
├─ Foundations (shared)
│  ├─ Colors
│  ├─ Typography
│  └─ Components (Button, Card, Badge, etc.)
│
├─ Learning App Screens
│  ├─ Dashboard
│  ├─ Passeport
│  └─ ...
│
└─ Marketing Site Screens
   ├─ Home (existing)
   ├─ Accompaniment (NEW - SBO)
   ├─ Formation (existing)
   └─ ...
```

**Key** : Share component instances between Learning App + Marketing pages (token parity ensures consistency)

---

## 🚀 SUCCESS CRITERIA (Week 8)

- ✅ SBO section designed (Figma)
- ✅ 5 screens built (hero, stats, services, timeline, CTA)
- ✅ Responsive (mobile, tablet, desktop)
- ✅ WCAG AA accessible
- ✅ Animations working (60fps)
- ✅ Shared components reused
- ✅ Direction C aesthetic applied
- ✅ Copy updated (vous register)
- ✅ Integrated into site

---

## 📝 COPY REFERENCE

See : `docs/site/COPY-CONSEIL-SBO.md` (update with vous register)

---

**Build this immediately after Learning App MVP ships (Week 5+). Reuse all patterns, components, and design system learned during bootcamp. This is the "practice application" of Learning App bootcamp skills to site marketing.**
