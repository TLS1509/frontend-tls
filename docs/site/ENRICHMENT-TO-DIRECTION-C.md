# Phase 2B Enrichment → Direction C « Illustrated Glass »

## 🎯 The Connection

**DESIGN-INSPO.md** = Your locked creative direction (Direction C all the way, 2026-06-11)

**Phase 2B Enrichment** = Building the screens using Direction C as your North Star

**Moodboard** = Where you gather inspiration that serves Direction C + extract reusable components

---

## 📋 What Direction C Requires (From DESIGN-INSPO.md)

### Visual Elements
- **Illustrated backgrounds** (watercolor, organic, NOT cartoon)
  - Refs: Daydream (hand-drawn lines), Structured (baroque painting), Phantom (blobs)
  - Palette: Teal + Orange + Gold + warm ambient (cream/lavender/mist)
- **Glass components** floating on illustrated backgrounds
  - Double-bezel: outer ring + inner core, `backdrop-blur`, white border @10%
  - Refs: Craft, Air, Origin patterns
- **Video** (optional for hero sections)
  - Slow reveal, abstract meshes, particles, zero hard cuts
  - 6-15 seconds max, silent loop
  - Refs: Phantom (organic motion), Air (subtlety)

### Motion Patterns
- Smooth scroll reveals (fade-in + Y-translate)
- Staggered cascades (100ms delay between items)
- Magnetic interactions (CTA buttons scale/glow on hover)
- Glass panels entering with blur + border glow
- Parallax scroll sections (slow, -4vh per 100vh)

### Typography & Content
- League Spartan (display) + Nunito (body)
- Animated word-swap in headlines (Learn/Do/Match verb rotating)
- Eyebrow labels (colored, uppercase, 10px)
- No oversized headers — hierarchy via weight + color

### Palette & Effects
- **Primary glass**: Teal `#55A1B4` @ 60% opacity
- **Warm accent**: Orange `#ED843A` (CTAs, highlights)
- **Depth gold**: Gold `#F8B044` (rare, premium detail)
- **Ambient**: Cream, Lavender, Mist (gradients, overlays)

---

## 🎨 Moodboard Sections ↔ Direction C Specs

### 🦸 Hero Patterns
**What to collect:**
- Glass card compositions on illustrated/gradient backgrounds
- Hero text layouts (left-aligned text + right visual split preferred)
- Animated text transitions (Ditto: word-swap)
- Floating product/UI elements on hero

**Reference saves:**
- [Daydream](https://mobbin.com/sites/daydream-ab2e5ca4-2852-4d96-9251-c88d288a6826/e0f3aa3f-a8ec-47cc-97f4-373a513a0a12/sections) — diagramme flux STRIDE + pêche warm
- [Craft](https://mobbin.com/sites/craft-cf6ca7ed-a68b-4bdd-b117-2a4a385f849d/9ab2349e-eb3a-43de-9d44-0f8a7f44f8c6/sections) — hero produit flottant + glass nav
- [Ditto](https://mobbin.com/sites/ditto-469571cd-95b6-4824-9f7a-c571d0cd5d8d/851496e5-eb30-474e-a695-bac5668d9bf5/sections) — animated word-swap headline

**Extract for Phase 3B:**
- HeroSection component (glass card + text + CTA)
- Motion spec: word-swap animation duration/easing

---

### 💎 Card & Glass Effects
**What to collect:**
- Double-bezel container patterns (nested structure)
- Glass effect specs (blur amount, opacity, border)
- Surface lighting (inner shadows, border glows)
- Layering & depth (z-axis stacking)

**Reference saves:**
- [Air](https://mobbin.com/sites/air-1a6f153a-7ac9-4a21-bd16-33b983acf7f3/015e9d58-6974-4674-bb7d-3464846ee255/sections) — glass + scroll parallax
- [Craft](https://mobbin.com/sites/craft-cf6ca7ed-a68b-4bdd-b117-2a4a385f849d/9ab2349e-eb3a-43de-9d44-0f8a7f44f8c6/sections) — glass nav + landscape
- [Origin](https://mobbin.com/sites/origin-2cd21568-f0f6-4f3c-b4d5-89df6c53ba41/63ab11d0-fb5a-4aaa-98a5-4883c89ba2ae/sections) — glass panels on gradient

**Extract for Phase 3B:**
- GlassPanel component (backdrop-blur, border, shadow specs)
- Nesting pattern (outer shell + inner core)

---

### 🔘 Button States
**What to collect:**
- Hover effects (scale, color shift, glow)
- Press feedback (scale 0.96-0.98)
- Active states (strong visual change)
- Loading states (no spinning spinner — skeleton/pulse instead)
- Focus ring (keyboard nav)

**Reference saves:**
- [Craft](https://mobbin.com/sites/craft-cf6ca7ed-a68b-4bdd-b117-2a4a385f849d/9ab2349e-eb3a-43de-9d44-0f8a7f44f8c6/sections) — CTA interactions
- [Phantom](https://mobbin.com/sites/phantom-f763f79e-51d2-4fcb-9be2-7f61e980d36a/39b107f0-5935-4575-b1a8-faa1279fd592/sections) — smooth state changes
- [Legend](https://mobbin.com/sites/legend-76861449-1e11-4eb7-b1df-97bef54f7b7c/6225489d-e56a-46f3-9bbc-430fd99f7ed2/sections) — premium dark button states

**Extract for Phase 3B:**
- Button hover/press animations
- Ripple effect spec (duration, opacity decay)
- Magnetic button behavior (if used)

---

### 📝 Typography & Hierarchy
**What to collect:**
- Animated text reveals (scroll-triggered)
- Eyebrow + H1 + subheading combos
- Letter-spacing on large headers (negative tracking)
- Line-height for body readability
- Text color hierarchy (ink-900 → ink-700 → ink-500)

**Reference saves:**
- [Ditto](https://mobbin.com/sites/ditto-469571cd-95b6-4824-9f7a-c571d0cd5d8d/851496e5-eb30-474e-a695-bac5668d9bf5/sections) — animated word-swap
- [Daydream](https://mobbin.com/sites/daydream-ab2e5ca4-2852-4d96-9251-c88d288a6826/e0f3aa3f-a8ec-47cc-97f4-373a513a0a12/sections) — STRIDE steps + headers
- [Origin](https://mobbin.com/sites/origin-2cd21568-f0f6-4f3c-b4d5-89df6c53ba41/63ab11d0-fb5a-4aaa-98a5-4883c89ba2ae/sections) — italic serif + sans mixte

**Extract for Phase 3B:**
- Text animation components (reveal, blur-clear, fade-in)
- Typography scale + spacing

---

### 🎭 Color Palettes
**What to collect:**
- Warm gradient combinations (teal + orange + gold + pastels)
- Ambient background gradients (mesh, linear, radial)
- Color hierarchy in interfaces (primary, secondary, accent, neutral)
- Opacity strategies (glass, overlays, layers)

**Reference saves (LOCKED — from DESIGN-INSPO.md):**
- **Teal**: `#55A1B4` @ 60% opacity (glass borders, accents)
- **Orange**: `#ED843A` (CTAs, warm highlights)
- **Gold**: `#F8B044` (premium touches, rare)
- **Ambient**: Cream `#F8F6F3` + Lavender `#E8E5F0` + Mist `#D4E9F0` (gradients)

**Why collect inspo?** Visual refs to test palette combos on illustrated backgrounds. Test what % opacity feels right for depth.

**Extract for Phase 3B:**
- Color variable specs (opacity ranges)
- Gradient patterns (mesh anchor points, stops)

---

### ⭐ Icon Systems
**What to collect:**
- Consistent stroke weights across icon sets
- Icon sizing (16px, 20px, 24px grid)
- Icon spacing in buttons/cards (8-12px from text)
- Icon color hierarchy (text-match vs fixed accent)

**Reference saves:**
- Phosphor Icons (light weight, modern, comprehensive)
- Icon usage in buttons/cards/navs

**Extract for Phase 3B:**
- Icon component variants (size, color)
- Nesting pattern (icon + text in button)

---

### ✨ Micro-Interactions
**What to collect:**
- Scroll-triggered reveals (fade-up, blur-clear, parallax)
- Hover effects (scale, color, glow, magnetic pull)
- Press feedback (scale down, ripple)
- Loading states (skeleton, pulse, shimmer)
- State transitions (smooth easing, no linear)

**Reference saves:**
- [Air](https://mobbin.com/sites/air-1a6f153a-7ac9-4a21-bd16-33b983acf7f3/015e9d58-6974-4674-bb7d-3464846ee255/sections) — scroll parallax
- [Phantom](https://mobbin.com/sites/phantom-f763f79e-51d2-4fcb-9be2-7f61e980d36a/39b107f0-5935-4575-b1a8-faa1279fd592/sections) — staggered reveals, organic motion
- [Legend](https://mobbin.com/sites/legend-76861449-1e11-4eb7-b1df-97bef54f7b7c/6225489d-e56a-46f3-9bbc-430fd99f7ed2/sections) — smooth state changes, dark ui

**Extract for Phase 3B:**
- Spring physics config (stiffness, damping)
- Easing curves (global standard from DESIGN-INSPO.md)
- Stagger delay between list items

---

### 📐 Layout Patterns
**What to collect:**
- Asymmetric grids (60/40, 70/30 splits)
- Varied aspect ratios (mixed 16:9 + 4:3 images)
- Floating/overlapping elements (negative margins)
- Sticky scroll sections (reveal while fixed)
- Whitespace strategies (breathing room)

**Reference saves:**
- [Daydream](https://mobbin.com/sites/daydream-ab2e5ca4-2852-4d96-9251-c88d288a6826/e0f3aa3f-a8ec-47cc-97f4-373a513a0a12/sections) — flow diagram + hero
- [Structured](https://mobbin.com/sites/structured-6464953d-ba54-4da6-bab1-dbf933bf5991/5e8a98a9-017b-4c81-90f9-43c8d21bc835/sections) — full-bleed bg + stark content
- [Anchor](https://mobbin.com/sites/anchor-bcc558b0-5c08-47c1-b777-4cc8a63a1a39/44d9a5f2-561e-40db-8a65-8a9af4bddaee/sections) — staggered pills, scroll effects

**Extract for Phase 3B:**
- Grid/layout patterns (auto-layout specs)
- Aspect ratio standards
- Section spacing (96px horizontal, 40px vertical)

---

### 📋 Form & Inputs
**What to collect:**
- Input focus states (border color, bg, ring glow)
- Error states (red border, error message)
- Helper text styling (small, muted)
- Label placement (above input)
- Validation feedback (inline, clear)

**Reference saves:**
- [Origin](https://mobbin.com/sites/origin-2cd21568-f0f6-4f3c-b4d5-89df6c53ba41/63ab11d0-fb5a-4aaa-98a5-4883c89ba2ae/sections) — input hero + glass

**Extract for Phase 3B:**
- Input component states (default, focus, error, disabled)
- Color specs (border, bg, focus ring)

---

### 🌊 Surfaces & Textures
**What to collect:**
- Illustrated backgrounds (watercolor, organic, NOT cartoon)
  - Daydream style: hand-drawn lines, flow diagrams
  - Structured style: baroque painting, rich but not chaotic
  - Phantom style: blobs, atmospheric, organic blending
- Gradient meshes (teal + orange + gold + pastels)
- Noise/grain overlays (subtle, < 5% opacity)
- Layering depth (z-axis, parallax, floating)
- Glass effect combinations (blur + border + shadow)

**Reference saves:**
- [Daydream](https://mobbin.com/sites/daydream-ab2e5ca4-2852-4d96-9251-c88d288a6826/e0f3aa3f-a8ec-47cc-97f4-373a513a0a12/sections) — hand-drawn + warm palette
- [Structured](https://mobbin.com/sites/structured-6464953d-ba54-4da6-bab1-dbf933bf5991/5e8a98a9-017b-4c81-90f9-43c8d21bc835/sections) — baroque illustration
- [Phantom](https://mobbin.com/sites/phantom-f763f79e-51d2-4fcb-9be2-7f61e980d36a/39b107f0-5935-4575-b1a8-faa1279fd592/sections) — blobs, atmospheric

**Extract for Phase 3B:**
- Illustration asset specs (Procreate source files)
- Gradient mesh pattern specs
- Noise/grain overlay component

---

## 🚀 Phase 2B Workflow (Step-by-Step)

### Week 1 — Asset Collection + Design Scratchpad
1. **Search references** (3-4 hours)
   - Visit each Mobbin link above (open `/sections` tab first)
   - Screenshot 2-3 moments from each that fit your screen section
   - Paste into corresponding Moodboard section in Figma
   - Annotate: « learning this: [specific detail] »

2. **Enrich HOME screen** (8 hours)
   - Use FIGMA-ENRICHMENT-GUIDE.md checklist
   - Import TLS components (Button, etc.)
   - Apply color variables + text styles (from TLS library)
   - Use DESIGN-SCRATCHPAD to test layouts before committing

3. **Document patterns** (1 hour)
   - Update COMPONENT-EXTRACTION-CHECKLIST.md
   - Mark discovered: HeroSection, GlassPanel, Button states, etc.

### Week 2 — Progressive Enrichment
1. Enrich FORMATION (6 hours)
2. Enrich ACCOMPAGNEMENT (6 hours)
3. Update checklist after each screen

### Week 3 — Final Screens + Component Extraction
1. Enrich LEARNING APP, MAGAZINE, CONTACT (4-5 hours total)
2. Finalize COMPONENT-EXTRACTION-CHECKLIST
3. Prepare components for Phase 3B (prioritize top 10)

---

## ✅ Quality Gates

As you enrich each screen, verify:

- [ ] **Direction C alignment**: Does it feel like "Illustrated Glass"?
- [ ] **Palette adherence**: Only using Teal + Orange + Gold + ambient colors?
- [ ] **Motion smooth**: Easing is never linear, spring physics where applicable?
- [ ] **Typography correct**: League Spartan display, Nunito body, proper hierarchy?
- [ ] **Components used**: No raw rectangles — using TLS Button, Card instances?
- [ ] **Spacing consistent**: 96px margins, 32px gaps, 12-16px corner radius?

---

## 🎬 Next: Phase 3B Component Creation

Once enrichment is complete, extract components in priority order:

**Tier 1 (Essential):**
- HeroSection (glass + text + CTA)
- GlassPanel (double-bezel effect)
- Button (all variants + states)
- Badge / Pill

**Tier 2 (Pattern Reuse):**
- OfferCard (three offers layout)
- StatsGrid (4-tile grid)
- ServiceCard (icon + text + link)
- TimelineStep (numbered progression)

**Tier 3 (Advanced):**
- StickyScrollStory (scroll-reveal sections)
- AnimatedWordSwap (headline text animation)
- MagneticButton (hover physics)
- ParallaxSection (scroll parallax)

Reference: **COMPONENT-EXTRACTION-CHECKLIST.md**

---

## 📚 Links

- **North Star**: [DESIGN-INSPO.md](DESIGN-INSPO.md) (Direction C locked, 2026-06-11)
- **Enrichment Steps**: [FIGMA-ENRICHMENT-GUIDE.md](FIGMA-ENRICHMENT-GUIDE.md)
- **Component Tracking**: [COMPONENT-EXTRACTION-CHECKLIST.md](COMPONENT-EXTRACTION-CHECKLIST.md)
- **Figma Moodboard**: https://figma.com/design/LccBZ1GKWQVwVzPtsSzk5Y (🎨 Moodboard page)
- **Figma Scratchpad**: https://figma.com/design/LccBZ1GKWQVwVzPtsSzk5Y (🖌️ Design Scratchpad page)

---

**Remember:** Every screen you enrich, every asset you collect, every pattern you identify feeds directly into Phase 3B. You're not exploring open-ended — you're building Direction C.
