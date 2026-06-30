# Homepage Variants — Section Layout Audit & Alternatives

## Executive Summary

Based on the audit of all 6 variants, we've identified **7 core sections** with **3-4 layout patterns each**. This document maps current layouts and proposes 2-3 creative alternatives per section.

**Goal:** Each variant can mix-and-match layouts independently, enabling rapid iteration and A/B testing of section compositions.

---

## Section Layout Matrix — Current State

| Section | Clarity-First | Storyteller | Momentum | Elegant | Cinematic | Flow |
|---------|---------------|-------------|----------|---------|-----------|------|
| **Hero** | Light watercolor video + centered text | Dark video cinematic + sticky progress | Parallax watercolor 200vh + wordswap | Static image + ambient blobs | Full-screen video (100dvh) | Fixed parallax watercolor |
| **Conviction** | Centered 1-col (max-w-34ch) | Dark teal stripe (primary-700) 12-col 3+9 | Centered section, primary-50 bg | Centered heading + text | Semi-transparent section overlay | Semi-transparent overlay |
| **Audience/Pour Qui** | 2-col card grid | *(skipped)* | *(skipped)* | *(skipped)* | 2 large button cards | 2 large button cards |
| **Pillars/Offers (3-col)** | 3-col grid with icon + title + desc + link | Editorial index (border dividers, no cards) | 3-col cards with tags + price + CTA | Alternating layout (2+1 zigzag) | 3-col cards in semi-transparent sections | 3-col cards in semi-transparent sections |
| **Method/Values** | 4-col grid (STRIDE steps) | Sticky scroll story (Learn→Do→Match) with morphing SVG | *(skipped)* | Alternating text + visual 12-col splits | *(skipped)* | *(skipped)* |
| **Proof/Stats** | 2-col grid (left stats + right quote) | ParallaxSection (ambient-warm bg) 12-col 5+7 + honest claims | C-Campus stats gradient box (2-col, gradient hero) | *(skipped)* | *(skipped)* | *(skipped)* |
| **Final CTA** | Centered text + buttons on white bg | Dark ink-900 with MeshGradientBg + 2 buttons | Gradient bg (primary-700→900) + centered text | Centered text + single button on light bg | Centered text + 2 buttons (same wrapper as others) | Centered text + 2 buttons (semi-transparent) |

---

## Layout Patterns — Detailed Breakdown

### 1. HERO SECTION

**Current Patterns:**

1. **Watercolor Light** (Clarity-First)
   - `min-h-[88vh]` centered flex
   - Video background (autoplay fallback)
   - White scrim overlay
   - Centered h1 + p + CTAs

2. **Video Cinematic** (Storyteller, Cinematic)
   - `100dvh` full-screen
   - Dark video with overlay
   - Dark text (white) centered

3. **Parallax Scroll** (Momentum, Flow)
   - `200vh` sticky height (Momentum only)
   - Watercolor background with parallax
   - Content fade-out + slide-up on scroll
   - 12-col grid layout (text-left, visual-right)

4. **Static Image** (Elegant)
   - Centered layout
   - Rounded image with overlay
   - Ambient gradient blobs (decorative)

**Proposed Alternatives:**

**Hero-Alt-A: Full-Bleed Gradient Hero**
- No video/image, pure gradient bg (primary→secondary)
- Text left-aligned or centered
- Icons or illustration inline (SVG)
- CTA placement: right-aligned or bottom
- **Best for:** minimalist, performance-first variants

**Hero-Alt-B: Split Screen Hero**
- Left: h1 + p + CTAs (60%)
- Right: Large mockup/image (40%)
- `md:flex-row` layout
- Full bleed to edges (no max-w container)
- **Best for:** product-heavy storytelling (like Momentum but 50/50)

**Hero-Alt-C: Overlay Hero with Foreground Content**
- Hero video/image fills entire background
- Content in foreground card (white/glass)
- Positioned bottom-left or center-bottom
- **Best for:** cinematic variants that need content prominence

---

### 2. CONVICTION Section (Values/Mission)

**Current Patterns:**

1. **Centered Light** (Clarity-First)
   - `bg-white`
   - Centered text (max-w-34ch)
   - Single h2 + body p

2. **Dark Stripe** (Storyteller)
   - `bg-primary-700` (dark teal)
   - 12-col grid (text left 3, visual/empty right 9)
   - White text on dark
   - Clear visual/spacer on right

3. **Section Container** (Storyteller, Cinematic, Flow)
   - Semi-transparent wrapper (white/60-85 backdrop-blur)
   - Centered or varied layout
   - Integrates with background pattern

**Proposed Alternatives:**

**Conviction-Alt-A: Text-Left, Visual-Right**
- 2-col layout (12-col: text-6 + visual-6)
- Text: h2 + body paragraph
- Visual: illustration, icon system, or abstract shape
- Works on `md:` breakpoint; stacks on mobile
- **Best for:** narrative flow (like Storyteller but more balanced)

**Conviction-Alt-B: Text-Top, Visual-Bottom**
- Full-width on desktop (text 100%, visual 100%)
- Large hero image/visual below text
- No max-width constraint (full-bleed)
- **Best for:** immersive, mobile-friendly flow

**Conviction-Alt-C: Quotation/Callout Block**
- Large pull-quote (blockquote element)
- Attribution footer
- Centered, limited max-width
- Icon accent top-left or top-center
- **Best for:** testimonial-heavy or philosophical messaging

---

### 3. AUDIENCE / POUR QUI Section

**Current Patterns:**

1. **2-Col Card Grid** (Clarity-First)
   - `md:grid-cols-2`
   - White cards with colored left-border
   - Icon + h3 + p + link per card

2. **2 Large Button Cards** (Cinematic, Flow)
   - `md:flex-row gap-32` (or grid equivalent)
   - Button-styled cards (bg-white/60 backdrop-blur)
   - Icon + title + hover lift
   - No body text (minimal)

**Proposed Alternatives:**

**Audience-Alt-A: 3-Col Option**
- `md:grid-cols-3`
- Third pillar added (e.g., "Je déploie / Enterprise")
- Cards same size/prominence

**Audience-Alt-B: Staggered/Zigzag Layout**
- 2 cards top row (col-span-6 each)
- 1 card bottom row (col-start-2, col-span-6)
- Asymmetric visual rhythm

**Audience-Alt-C: Tabbed/Accordion**
- Single active card displayed
- Tabs/buttons to switch between audience types
- Reduces visual density on narrow screens

---

### 4. PILLARS / OFFERS (3-pillar section)

**Current Patterns:**

1. **3-Col Grid** (Clarity-First, Cinematic, Flow)
   - `md:grid-cols-3`
   - Equal-height cards
   - Icon + title + body + tags/pills + link
   - `shadow-card hover:shadow-card-hover`

2. **Editorial Index** (Storyteller)
   - `flex-col` stack
   - Border dividers between items (border-t/b)
   - Hover: `bg-ink-50` background change
   - No card frame, minimal visual hierarchy

3. **2+1 Zigzag** (Elegant)
   - 2 cards top row
   - 1 card bottom row (alternating position)
   - Asymmetric grid layout

4. **Tabbed Sequential** (Momentum, if applied)
   - Single card displayed
   - Pills/buttons to cycle through offers
   - Full-width card (no 3-col)

**Proposed Alternatives:**

**Offers-Alt-A: Staggered Enter Animation**
- Cards fade-in on scroll
- Each card staggered (150ms delay between)
- Gives sense of collection being built
- `FadeInWhenVisible` with configurable delay

**Offers-Alt-B: Horizontal Scroll (Mobile)**
- `md:grid-cols-3` desktop
- `overflow-x-auto snap-x` mobile
- Cards `snap-start shrink-0 w-full`
- Horizontal swipe experience

**Offers-Alt-C: Vertical Timeline**
- Stack vertically
- Line connector (left border, SVG path)
- Dot/checkpoint at each offer
- Alt visual rhythm vs. 3-col grid

---

### 5. METHOD / VALUES Section (e.g., STRIDE, Learn→Do→Match)

**Current Patterns:**

1. **4-Col Grid** (Clarity-First, STRIDE steps)
   - Numbered steps (1, 2, 3, 4)
   - Icon + title + brief desc per column

2. **Sticky Scroll Story** (Storyteller, Learn→Do→Match)
   - Full-viewport section (100vh+)
   - Visual morphs/animates as you scroll
   - Text panels fade in/out on scroll trigger
   - Complex motion choreography

**Proposed Alternatives:**

**Method-Alt-A: Accordion/Expandable Steps**
- Compact default state (headings only)
- Click to expand → reveal body + visual
- One accordion open at a time (or multi-open)
- Saves vertical space, interactive

**Method-Alt-B: Carousel/Slider**
- One step displayed full-width
- Arrow buttons to prev/next
- Progress indicator (step X of Y)
- Mobile-friendly

**Method-Alt-C: Vertical Timeline**
- Left column: timeline line with dots
- Right column: step cards stacked
- Hover: dot highlights, card bg changes
- Natural reading flow (top→bottom)

---

### 6. PROOF / SOCIAL PROOF Section (Stats, Testimonials)

**Current Patterns:**

1. **2-Col Split** (Clarity-First)
   - Left: Statistics cards
   - Right: Large quote block + attribution
   - `12-col` or `md:grid-cols-2`

2. **Parallax Section** (Storyteller)
   - ParallaxSection wrapper (ambient bg)
   - 12-col grid (5+7 split)
   - "Honest claims" (verified stats)
   - BadgeCheck icons for credibility

3. **Gradient Hero Stats** (Momentum)
   - Gradient background (primary-700→900)
   - 2-col layout (or flex)
   - Stats displayed with CountUp animation
   - White text on dark

**Proposed Alternatives:**

**Proof-Alt-A: 3-Column Stat Cards**
- `grid-cols-3`
- Each stat card: large number + label
- Hover: card lift + color accent
- Cleaner grid rhythm

**Proof-Alt-B: Testimonial Carousel**
- Full-width quote cards
- Arrow/dot navigation
- One testimonial visible at a time
- Name + role attribution below

**Proof-Alt-C: Hybrid Grid**
- Top row: 2-3 stat cards
- Bottom row: Single testimonial full-width
- Combines quantitative + qualitative proof

---

### 7. FINAL CTA Section

**Current Patterns:**

1. **Centered on White** (Clarity-First, Elegant)
   - `bg-white` or light bg
   - Centered h2/h3 + p
   - 1-2 CTAs (buttons)
   - Max-width container

2. **Dark Gradient** (Storyteller, Momentum)
   - `bg-gradient-to-r` primary-700→900 or ink-900
   - White text
   - MeshGradientBg (subtle animated gradient)
   - 2 CTAs (primary + secondary)

3. **Semi-Transparent Overlay** (Cinematic, Flow)
   - Reuses same wrapper as other sections
   - `bg-white/60 backdrop-blur-sm`
   - Not a visual break (seamless)

**Proposed Alternatives:**

**CTA-Alt-A: Full-Bleed Hero CTA**
- Large section (80vh or 100vh)
- Centered h1 + subtext
- 2 CTAs below
- Video or gradient background
- **Best for:** campaign landing pages

**CTA-Alt-B: Card-Embedded CTA**
- Card in middle of section (white/glass)
- Positioned with negative margin overlap
- Next section starts below card
- Visual break without full bg change
- **Best for:** multi-section seamless flow

**CTA-Alt-C: Minimal Inline CTA**
- No separate section
- CTA inline at end of last content section
- No visual break
- Subtle, non-intrusive
- **Best for:** low-friction, content-focused pages

---

## Layout Remix Examples

### Remix 1: "Clarity Modern" (based on Clarity-First)
- Hero: Full-Bleed Gradient Hero (Alt-A)
- Conviction: Text-Left, Visual-Right (Alt-A)
- Audience: 3-Col Option (Alt-A)
- Pillars: Staggered Enter Animation (Alt-A)
- Method: Accordion Steps (Alt-A)
- Proof: 3-Column Stat Cards (Alt-A)
- CTA: Card-Embedded CTA (Alt-B)

### Remix 2: "Storyteller Immersive" (based on Storyteller)
- Hero: Overlay Hero with Foreground Content (Alt-C)
- Conviction: Quotation Callout Block (Alt-C)
- Audience: *(keep current editorial index)*
- Pillars: Staggered Enter Animation (Alt-A)
- Method: Vertical Timeline (Alt-C)
- Proof: Testimonial Carousel (Alt-B)
- CTA: Full-Bleed Hero CTA (Alt-A)

### Remix 3: "Momentum Pro" (based on Momentum)
- Hero: Split Screen Hero (Alt-B)
- Conviction: Text-Top, Visual-Bottom (Alt-B)
- Audience: Tabbed/Accordion (Alt-C)
- Pillars: Horizontal Scroll Mobile (Alt-B)
- Method: Carousel/Slider (Alt-B)
- Proof: Hybrid Grid (Alt-C)
- CTA: *(keep current dark gradient)*

---

## Implementation Roadmap

**Phase 3.1:** Layout Components
- Extract each layout pattern into standalone component
- Props: `variant`, `items`, `config`
- Reusable across all homepage variants

**Phase 3.2:** Add Layout Variants to Each Homepage
- Storyteller: Add 1-2 alternative layouts (e.g., tabbed offers, timeline method)
- Momentum: Add alternative for offers (horizontal scroll on mobile)
- Elegant: Try staggered animation on pillars
- Others: Baseline (current layouts preserved)

**Phase 3.3:** A/B Testing Setup
- URL query param: `?layout=default|alt-a|alt-b|alt-c`
- Analytics tracking for variant impression/conversion
- Figma mockups of each remix

---

## Next Steps

1. ✅ Phase 1: Renaming complete (creative names assigned)
2. ✅ Phase 2: Layout audit complete (this document)
3. → Phase 3: Build 2-3 layout alternatives per section
4. → Phase 4: Integrate alternatives into code (as optional layout props)
5. → Phase 5: A/B testing framework

