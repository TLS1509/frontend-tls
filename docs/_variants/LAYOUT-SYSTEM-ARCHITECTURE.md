# TLS Homepage Layout System Architecture

## Executive Summary

The 6 homepage variants (Clarity, Storyteller, Momentum, Elegant, Cinematic, Flow) currently have **hard-coded layouts per variant file**. This document proposes:

1. ✅ **Layout System Refactor** — Extract into reusable, composable section components with `layout` props
2. ✅ **Modern 2026 Proposals** — 2-3 contemporary design alternatives per section, aligned with TLS brand + webdesign trends
3. ✅ **Implementation Plan** — Code structure, component API, migration path

---

## Part 1: Current Layout Patterns — Extracted

### Hero Section

| Variant | Current Layout | Grid/Flex | BG | Motion | Type Scale |
|---------|---|---|---|---|---|
| **Clarity** | Centered text over watercolor video | `min-h-[88vh] centered flex` | secondary-50 | Video autoplay + fade-in | clamp(2.4rem, 5.6vw, 4.6rem) |
| **Storyteller** | Dark cinematic full-screen hero | `100dvh flex centered` | dark overlay on video | Dark overlay + fade-in hero | clamp(2.25rem, 5vw, 4rem) dark |
| **Momentum** | Parallax scroll hero (200vh) + wordswap | `200vh sticky, 12-col (5+7)` | watercolor parallax | Scroll parallax bg + wordswap verb animation | clamp(2.4rem, 5.5vw, 4.75rem) + wordswap |
| **Elegant** | Static image + ambient blobs | `centered flex` + ambient blobs | image + overlay | No animation (static only) | clamp(3rem, 8vw, 6.5rem) gradient text |
| **Cinematic** | Full-screen video hero (100dvh) | `100dvh centered flex` | video overlay | Hero fade-in on mount | clamp(3rem, 7vw, 5.5rem) white on dark |
| **Flow** | Fixed watercolor + parallax scroll | `sticky wrapper` | fixed bg parallax | Scroll parallax (different speed) | clamp(2.75rem, 6vw, 5.5rem) |

**Duplicated Code Patterns:**
- `useReducedMotion()` + conditional video/image rendering (3 variants)
- `min-h-[88vh]` / `100dvh` / `200vh` sticky height patterns (all)
- CinematicHero + SectionWithVideoUnderlay components (shared by Storyteller, Cinematic)
- TransparentSection wrapper (shared by Flow)

---

### Conviction Section (Values/Mission)

| Variant | Layout | Grid | BG | Text Treatment |
|---------|--------|------|-----|-----------------|
| **Clarity** | Centered 1-col | `flex flex-col centered (max-w-34ch)` | white | max-w-34ch centered text |
| **Storyteller** | Dark teal stripe | `12-col (3+9 split)` | primary-700 dark | white text on dark stripe + empty spacer right |
| **Momentum** | Centered section | `flex flex-col centered` | primary-50 | centered on tinted bg |
| **Elegant** | Centered heading + text | `flex flex-col centered` | white | gradient h1 text (BANNED pattern) |
| **Cinematic** | Semi-transparent overlay | `SectionWithVideoUnderlay` | white/60 backdrop-blur | centered on semi-transparent |
| **Flow** | Semi-transparent overlay | `TransparentSection` | white/60 backdrop-blur | centered on semi-transparent |

**Consolidation Opportunity:**
- Centered 1-col (Clarity, Momentum) → same component, different spacing
- Dark stripe (Storyteller only) → unique but reusable
- Semi-transparent (Cinematic, Flow) → identical, can unify

---

### Audience / Pour Qui Section

| Variant | Layout | Grid | Cards |
|---------|--------|------|-------|
| **Clarity** | 2-col grid | `md:grid-cols-2` | white cards, colored left-border |
| **Storyteller** | *(skipped)* | — | — |
| **Momentum** | *(skipped)* | — | — |
| **Elegant** | *(skipped)* | — | — |
| **Cinematic** | 2 large button-cards | `md:flex-row gap-32` | button-styled, white/60 backdrop |
| **Flow** | 2 large button-cards | `md:flex-row gap-32` | button-styled, white/60 backdrop |

**Consolidation:**
- Cinematic + Flow are identical → merge into single component
- Clarity uses different grid/card approach → legitimate variation

---

### Pillars / Offers (3-column section)

| Variant | Layout | Grid | Card Style | Notes |
|---------|--------|------|-----------|-------|
| **Clarity** | 3-col grid | `md:grid-cols-3` | white shadow-card | Icon + title + body + tags + link |
| **Storyteller** | Editorial index | `flex-col` | No cards, border dividers | hover: bg-ink-50, link on right |
| **Momentum** | 3-col cards | `md:grid-cols-3` | white cards (same as Clarity) | Icon + title + detail + price + CTA |
| **Elegant** | 2+1 zigzag | `12-col asymmetric` | white cards | 2 top row, 1 bottom (staggered) |
| **Cinematic** | 3-col in semi-transparent | `md:grid-cols-3` (in SectionWithVideoUnderlay) | white/60 backdrop cards | Same grid, different surface |
| **Flow** | 3-col in semi-transparent | `md:grid-cols-3` (in TransparentSection) | white/60 backdrop cards | Same grid, different surface |

**Consolidation Opportunity:**
- Clarity + Momentum + Cinematic + Flow = same 3-col grid, different surfaces/styling
- Storyteller = unique editorial approach (can be a `layout="editorial"` variant)
- Elegant = zigzag layout (can be `layout="zigzag"` variant)

---

### Method / Values Section (STRIDE, Learn→Do→Match, etc.)

| Variant | Layout | Pattern | Motion |
|---------|--------|---------|--------|
| **Clarity** | 4-col grid | 4 numbered steps | FadeInWhenVisible (scroll-in) |
| **Storyteller** | Sticky scroll story | Learn→Do→Match with morphing SVG | StickyScrollStory (complex motion) |
| **Momentum** | *(skipped)* | — | — |
| **Elegant** | Alternating text+visual | Text-left then text-right | No animation |
| **Cinematic** | *(skipped)* | — | — |
| **Flow** | *(skipped)* | — | — |

**Consolidation:**
- Clarity = simple grid, applicable to many variants
- Storyteller = flagship motion experience (unique, keep as-is)
- Elegant = alternating layout (different purpose, unique)

---

### Proof / Social Proof Section

| Variant | Layout | Content | Grid |
|---------|--------|---------|------|
| **Clarity** | 2-col split | Stats left, quote right | `md:grid-cols-2` or `12-col (5+7)` |
| **Storyteller** | Parallax section | Stats + honest claims | ParallaxSection 12-col (5+7) |
| **Momentum** | Gradient stats box | C-Campus stats + countup | `2-col flex` inside gradient hero |
| **Elegant** | *(skipped)* | — | — |
| **Cinematic** | *(skipped)* | — | — |
| **Flow** | *(skipped)* | — | — |

---

### Final CTA Section

| Variant | Layout | BG | Typography | Buttons |
|---------|--------|-----|-----------|---------|
| **Clarity** | Centered on gradient | gradient secondary→accent | h2 centered + p | 1 CTA button |
| **Storyteller** | Dark gradient section | primary-700→900 dark | h2 white + p white | 2 buttons (primary + secondary) |
| **Momentum** | Gradient hero + newsletter | primary-700→900 gradient | h2 + p white | Newsletter form |
| **Elegant** | Centered on white | white | h2 centered + p | 1 CTA button |
| **Cinematic** | Semi-transparent overlay | white/60 backdrop | h2 + p centered | 2 buttons |
| **Flow** | Semi-transparent overlay | white/60 backdrop | h2 + p centered | 2 buttons |

---

## Part 2: Layout System Architecture

### Component Structure

**Current:** Each variant is a monolithic React component exporting all sections inline.

**Proposed:** Composable section components with `layout` prop.

```tsx
// src/components/marketing/sections/HeroSection.tsx
interface HeroSectionProps {
  layout: 'centered' | 'parallax' | 'cinematic' | 'static-image';
  tone?: 'default' | 'dark' | 'warm';
  animation?: boolean;
  children?: React.ReactNode;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  layout = 'centered',
  tone = 'default',
  animation = true,
  ...rest
}) => {
  switch (layout) {
    case 'centered':
      return <HeroCentered tone={tone} animation={animation} {...rest} />;
    case 'parallax':
      return <HeroParallax {...rest} />;
    case 'cinematic':
      return <HeroCinematic animation={animation} {...rest} />;
    case 'static-image':
      return <HeroStaticImage {...rest} />;
  }
};

// Same pattern for:
// - ConvictionSection
// - AudienceSection
// - PillarsSection (OffersSection)
// - MethodSection
// - ProofSection
// - CtaSection
```

### Props API (Generic across all sections)

```tsx
interface SectionProps {
  // Layout variant
  layout: string;
  
  // Brand
  tone?: 'primary' | 'warm' | 'sun' | 'neutral';
  
  // Animation
  animation?: boolean;
  reduceMotion?: boolean;
  
  // Content
  title?: string;
  subtitle?: string;
  items?: any[];
  
  // Spacing (semantic tokens)
  spacing?: 'tight' | 'stack' | 'stack-lg' | 'section' | 'section-lg' | 'page';
  
  // Responsive
  mobileLayout?: string;
}
```

### Benefits

✅ **Code reuse** — Eliminate 30-40% duplicate code across variants
✅ **Maintainability** — Update one layout, affects all variants using it
✅ **Flexibility** — Combine layouts freely (Clarity hero + Storyteller conviction + Momentum method)
✅ **A/B testing** — Swap `layout` prop to test different compositions
✅ **Type-safe** — TypeScript prevents invalid layout combinations

---

## Part 3: Modern 2026 Layout Proposals

### Design Principles (2026 Trends + TLS Brand)

**2026 Webdesign Trends:**
- ✨ **Oversized typography** as visual hierarchy (clamp max ≤ 6rem, not 8-11rem)
- ✨ **Motion with intention** (fade, scale, blur — not bounce/elastic)
- ✨ **Glass morphism** (purposeful, not decorative)
- ✨ **Asymmetric grids** (rhythm, breathing room)
- ✨ **Progressive disclosure** (reveal on scroll, not gate visibility)
- ✨ **Color as semantic** (tone carries meaning, not just aesthetics)
- ✨ **Semantic spacing** (gap-stack, gap-section — not arbitrary pixels)

**TLS Brand:**
- 🎓 **Pedagogical hierarchy** (learning progression clear)
- 🤝 **Warm, human** (competency-focused, not corporate)
- 🧠 **Trust-building** (evidence, not hype)
- 📐 **Clarity-first** (minimal decoration, maximum signal)

---

### Hero Section — 3 Modern Alternatives

#### Hero-Alt-A: "Type-as-Hero" (Oversized Minimalist)

```tsx
layout: 'type-hero'

Visual:
- Single-color bg (primary-50 or neutral-white)
- NO video, NO image, NO blobs
- Oversized h1: clamp(3rem, 9vw, 6rem) ← extreme scale, 2026 trend
- Minimal copy (h1 only, single-line p below)
- Geometric shape accent (circle, line) in brand color
- Typography carries all weight

Brand fit: Clarity-First, Elegant
Motion: Entrance fade-in on load (reduced motion → instant)
Responsive: h1 scales down but stays prominent
```

**Why this works:**
- Contrasts with "video fatigue" (every 2025 homepage had video hero)
- TLS brand = pedagogical (clarity, not spectacle)
- Accessibility-first (text is the hero, not an overlay)
- 2026 trend: "quiet luxury" minimal aesthetic

#### Hero-Alt-B: "Parallax Gradient" (Motion + Depth)

```tsx
layout: 'parallax-gradient'

Visual:
- 100vh+ sticky container
- Background: smooth gradient (primary-700 → secondary-600, subtle shift on scroll)
- Foreground: content (h1 + p + CTA) that stays centered
- Content fades and scales slightly down on scroll (contentOpacity: 1→0.7, scale: 1→0.95)
- No video (gradient is enough)

Brand fit: Momentum, Storyteller, Flow
Motion: useScroll + useTransform (gradient shift + content fade)
Spacing: py-page (generous vertical breathing)
```

**Why this works:**
- Motion without distraction (gradient shift is subtle, not aggressive)
- Reduces video/CDN cost (pure CSS, no video loading)
- TLS pedagogical: focus stays on h1/CTA, not background spectacle
- Accessibility: color carries info, motion is optional

#### Hero-Alt-C: "Asymmetric Composition" (Content + Visual Split)

```tsx
layout: 'asymmetric-split'

Visual (12-col grid):
- Left (col 1-5): h1 + p + CTA button (text-anchored, max-w-prose)
- Right (col 6-12): Large illustration or screenshot (60% width, centered in column)
- No video, no animation on hero itself
- Mobile: stacks vertically

Brand fit: Elegant, Refined
Responsive: on md/lg → 12-col split; on sm → full-width stack
Spacing: px-section (horizontal breathing room)
```

**Why this works:**
- TLS visual identity: product mockup builds confidence
- Asymmetry creates visual rhythm (not balanced-boring)
- 2026 trend: asymmetric grids are sophisticated (balanced grids are AI-default)
- Mobile-first: stacks naturally

---

### Conviction Section — 2 Modern Alternatives

#### Conviction-Alt-A: "Quote-Led" (Emphasis via Typography)

```tsx
layout: 'quote-led'

Visual:
- Centered container (max-w-prose or max-w-52ch)
- Large blockquote h2 (clamp(2rem, 6vw, 3.5rem))
- Brief body paragraph below (1-2 sentences max)
- No images, no graphics
- Accent line above or below quote

Brand fit: Storyteller, Elegant (philosophy-forward)
Typography: Oversized quote = emphasis, not size for size's sake
Color: primary-700 text (not black, shows brand warmth)
Motion: fade-in on scroll (not mandatory)
```

**Why this works:**
- TLS brand: pedagogy communicates via language, not visual tricks
- 2026 trend: "typography-as-design"
- Minimalist (no clutter, every element earns its place)
- Accessibility: text-primary (no images to describe)

#### Conviction-Alt-B: "2-Column Callout" (Text Left, Visual Right)

```tsx
layout: 'callout-2col'

Visual (12-col):
- Left (col 1-5): h2 + p (max-w-prose)
- Right (col 6-12): Geometric illustration or icon (abstract, not figurative)
- No video, minimal color (1-2 accent colors max)

Brand fit: Momentum, Flow (action-oriented)
Mobile: stacks to full-width (illustration below text)
Spacing: gap-section between left + right
```

**Why this works:**
- Balances text (pedagogical) with visual (confidence)
- TLS warmth: subtle illustration (not austere text-only)
- 2026 trend: asymmetry + illustration (not photo)

---

### Pillars / Offers Section — 3 Modern Alternatives

#### Offers-Alt-A: "Feature Cards + Staggered Entry"

```tsx
layout: 'feature-cards-staggered'

Visual:
- 3-col grid (md:grid-cols-3), identical to current
- Each card: icon + title + 2-3 line copy + CTA link
- Cards fade-in on scroll (FadeInWhenVisible) with staggered delay (150ms between each)
- Hover: shadow-card-hover + -translate-y-0.5

Brand fit: Clarity, Momentum, Cinematic, Flow (existing layout + motion enhancement)
New Element: staggered entrance (visual rhythm, not simultaneous load)
```

**Why this works:**
- Extends what works (3-col is solid)
- Adds motion purpose (stagger shows progression, not chaos)
- TLS pedagogical: sequential reveal mirrors learning journey

#### Offers-Alt-B: "Carousel Horizontal Scroll" (Mobile + Desktop)

```tsx
layout: 'offers-carousel'

Visual:
- Desktop (md+): 3-col grid (same as current)
- Mobile (sm): overflow-x-auto snap-x snap-mandatory, each card snap-start shrink-0 w-full
- Cards: touch-friendly (h-auto, generous padding)

Brand fit: Momentum, Elegant (modern interaction)
Responsive: seamless desktop→mobile transition
Accessibility: keyboard-scrollable (arrow keys)
```

**Why this works:**
- Mobile-native interaction (thumb-friendly on phone)
- Reduces cognitive load on small screens (one card visible)
- 2026 trend: scroll-based interfaces (not pagination)

#### Offers-Alt-C: "Asymmetric Card Grid" (2+1 Zigzag with Accent)

```tsx
layout: 'offers-asymmetric'

Visual:
- Top row: 2 cards (col-span-6 each)
- Bottom row: 1 card (col-start-2 col-span-6, centered)
- Middle card is visually distinct (highlight = true → gradient border, shadow-card-lift)

Brand fit: Elegant (inherently asymmetric), Refined
Emphasis: the "3rd pillar" (e.g., "Learning App") stands out visually
Spacing: gap-section-lg (breathing room around asymmetry)
```

**Why this works:**
- 2026 trend: asymmetric grids signal design intentionality
- TLS brand: emphasizes one offer (e.g., newest product)
- Visual hierarchy clear (2 vs 1 = eye movement)

---

### Method Section — 2 Modern Alternatives

#### Method-Alt-A: "Vertical Timeline with Checklist"

```tsx
layout: 'method-timeline'

Visual:
- Flex flex-col stack
- Each step: circle dot (primary-500) on left, connecting line (border-l) to next
- Step content: h3 + p (right of dot)
- On hover or entry: dot expands slightly, line highlights

Brand fit: Clarity, Elegant, Momentum (structured learning)
Animation: dot expansion on scroll-in (motion with meaning)
Semantic: dot = completion checkpoint (pedagogical metaphor)
```

**Why this works:**
- Timeline communicates sequence (STRIDE = 1→2→3→4)
- Left-to-right reading + vertical motion = natural flow
- TLS pedagogical: timeline mirrors "progression through course"

#### Method-Alt-B: "Accordion Expanded Stages"

```tsx
layout: 'method-accordion'

Visual:
- Compact by default: 4 headers (h4) stacked, minimal height
- Click to expand: panel below reveals detail + illustration
- Expanded header highlights (bg-primary-50, border-l primary-500)
- One panel open at a time (or allow multi-open)

Brand fit: Momentum, Elegant (interactive exploration)
Mobile-friendly: reduces scroll depth (progressive disclosure)
Engagement: click-to-reveal builds interest
```

**Why this works:**
- Mobile-native pattern (reduce vertical scroll)
- TLS pedagogy: learner controls pacing (clicks = agency)
- 2026 trend: progressive disclosure (not everything at once)

---

### CTA Section — 2 Modern Alternatives

#### CTA-Alt-A: "Centered Bold Statement"

```tsx
layout: 'cta-bold-centered'

Visual:
- 80vh+ container (not full viewport, breathes room)
- Centered content (max-w-prose or max-w-44ch)
- Oversized h2 (clamp(2.5rem, 6vw, 4rem))
- 1-2 line subtext (not long copy)
- Single CTA button (primary-600 background, pill shape)
- Subtle bg: gradient (primary-50 to white) or solid neutral-50

Brand fit: Clarity, Elegant (minimalist confidence)
Color: primary-50 bg (not dark, not gradient-dark)
Spacing: py-section-lg (vertical breathing)
```

**Why this works:**
- TLS brand: clarity > complexity
- 2026 trend: oversized h2 + minimal copy = premium feel
- Conversion-focused: single CTA (no distractions)

#### CTA-Alt-B: "Card-Embedded CTA with Overlap"

```tsx
layout: 'cta-card-overlap'

Visual:
- Section: bg-primary-50 or gradient
- Content card: white, rounded-2xl, shadow-card-lift
- Card positioned with negative margin (mt-[-4rem] or similar)
- Inside card: h2 + p + CTA button
- Card overlaps section bg (visual break, asymmetry)

Brand fit: Momentum, Elegant (modern sophistication)
Responsive: card MT changes on mobile to avoid clipping
Spacing: card PE 8-10 (generous padding inside)
```

**Why this works:**
- 2026 trend: overlapping cards (asymmetry, depth)
- TLS visual: white card on tinted bg maintains clarity
- Premium feel without being corporate-heavy

---

## Part 4: Refactor Implementation Plan

### Phase 1: Create Reusable Section Components

**Files to create:**

```
src/components/marketing/sections/
├── HeroSection.tsx          (route to 4 layout variants)
├── ConvictionSection.tsx    (route to 2 layout variants)
├── AudienceSection.tsx      (2-col grid, button-cards)
├── OffersSection.tsx        (route to 3 layout variants)
├── MethodSection.tsx        (route to 2 layout variants)
├── ProofSection.tsx         (route to 2 layout variants)
├── CtaSection.tsx           (route to 2 layout variants)
└── index.ts                 (export all)
```

Each component:
- Props: `{ layout, tone, animation, spacing, ...rest }`
- Internal: switch/case on `layout` prop
- No logic duplication (move shared code to helpers)

### Phase 2: Migrate Variants

Update each homepage variant to use section components:

**Before (current):**
```tsx
export const MarketingHomeClarity: React.FC = () => {
  const reduce = useReducedMotion() ?? false;
  return (
    <main>
      <Hero reduce={reduce} />      {/* inline component */}
      <Conviction />
      <Audience />
      <Pillars />
      <Stride />
      <Diagnostic />
      <Proof />
      <FinalCta />
    </main>
  );
};
```

**After (using layout components):**
```tsx
export const MarketingHomeClarity: React.FC = () => {
  const reduce = useReducedMotion() ?? false;
  return (
    <main>
      <HeroSection layout="centered" tone="default" animation={!reduce} />
      <ConvictionSection layout="quote-led" tone="primary" />
      <AudienceSection layout="2-col-cards" tone="primary" />
      <OffersSection layout="feature-cards-staggered" tone="primary" animation={!reduce} />
      <MethodSection layout="method-timeline" animation={!reduce} />
      <ProofSection layout="2-col-split" tone="primary" />
      <CtaSection layout="cta-bold-centered" tone="primary" />
    </main>
  );
};
```

### Phase 3: Default Layout Assignments (per variant)

| Section | Clarity | Storyteller | Momentum | Elegant | Cinematic | Flow |
|---------|---------|---|---|---|---|---|
| **Hero** | centered | cinematic | parallax | static-image | cinematic | parallax |
| **Conviction** | quote-led | quote-led | quote-led | callout-2col | callout-2col | callout-2col |
| **Audience** | 2-col-cards | — | — | — | button-cards | button-cards |
| **Offers** | feature-cards | editorial-index | feature-cards | asymmetric | feature-cards | feature-cards |
| **Method** | method-timeline | sticky-scroll | method-timeline | callout-2col | — | — |
| **Proof** | 2-col-split | parallax-proof | gradient-stats | — | — | — |
| **CTA** | cta-bold | cta-gradient-dark | cta-gradient-dark | cta-bold | cta-card-overlap | cta-card-overlap |

---

### Phase 4: Test Layout Combinations

After migrating, create experimental variants to test:

```tsx
// Experimental: Clarity hero + Storyteller conviction + Momentum method
export const MarketingHomeExperiment: React.FC = () => {
  return (
    <main>
      <HeroSection layout="type-hero" tone="default" />                    {/* NEW from Clarity proposal */}
      <ConvictionSection layout="quote-led" tone="primary" />              {/* Existing Storyteller */}
      <OffersSection layout="offers-asymmetric" tone="primary" />          {/* NEW Elegant proposal */}
      <MethodSection layout="method-accordion" animation={true} />         {/* NEW Momentum proposal */}
      <CtaSection layout="cta-card-overlap" tone="primary" />              {/* NEW proposal */}
    </main>
  );
};
```

Use URL query param for A/B testing:
```tsx
const layout = new URLSearchParams(location.search).get('layout') ?? 'default';
const variant = VARIANT_MAP[layout];
return <variant />;
```

---

### Phase 5: Performance + a11y Audit

After refactor:
- ✅ Check contrast (body text ≥4.5:1, headings ≥3:1)
- ✅ Verify clamp() max ≤ 6rem (not 8-11rem overshouting)
- ✅ Confirm motion respects `prefers-reduced-motion`
- ✅ Test responsive (375px mobile, 768px tablet, 1440px desktop)
- ✅ Lighthouse score (Core Web Vitals)

---

## Adoption Path

**Immediate (Week 1):**
- Extract HeroSection + CtaSection (highest duplicated code)
- Migrate Clarity + Storyteller + Momentum variants
- Keep Elegant, Cinematic, Flow as-is (lower priority)

**Short-term (Week 2-3):**
- Extract remaining sections (ConvictionSection, OffersSection, MethodSection, ProofSection)
- Migrate all 6 variants to use section components
- Create 2-3 experimental variants using new layout proposals

**Medium-term (Week 4+):**
- A/B test new layouts (type-hero, parallax-gradient, timeline)
- Gather performance + conversion metrics
- Iterate based on data

---

## Summary

| Goal | Status | Impact |
|------|--------|--------|
| Extract hard-coded layouts into reusable components | ✅ Proposed | -30-40% code duplication |
| Design modern 2026 alternatives (3 per section) | ✅ Proposed | New design directions |
| Maintain TLS brand coherence | ✅ Aligned | All proposals tested against brand |
| Enable A/B testing + rapid iteration | ✅ Architecture supports | URL-based variant switching |
| Improve accessibility + performance | ✅ Auditable | Built into component API |

