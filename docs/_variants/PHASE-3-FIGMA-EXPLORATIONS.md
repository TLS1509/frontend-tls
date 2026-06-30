# Phase 3 : Figma Modern 2026 Design Explorations

Guide pour explorer et valider 3 alternatives modernes 2026 directement dans Figma.

## Overview

**Goal** : Test 2-3 modern 2026 layout alternatives visually before finalizing refactors.

**Why** : Figma validation happens faster than code refactors. Visual comparison informs which layouts to prioritize in HeroSection, ConvictionSection routers.

**Outcome** : Validated design direction → code routers updated → all variants migrated.

---

## 3 Explorations to Build in Figma

### 1. **Type-as-Hero** (Clarity modern)
**Pattern** : Oversized typography, no video, geometric accent

**Specs** :
- Hero: 1200×800px frame
- BG: primary-50 (light teal)
- Geometric accent: primary-600 circle (240×240px, opacity 8%, top-right)
- Content:
  - H1: "L'IA au service des compétences" (64px, centered, tracking -0.03em)
  - Subheading: "Pas l'inverse." (18px, primary-600)
  - CTA button: primary-600 pill, "Évaluer ma maturité"

**Rationale** : 2026 design trend = typography-as-design. No video overhead. High impact with minimal resources.

**Validate against**:
- ✓ TLS pedagogical brand (clarity, minimalist)
- ✓ Oversized h1 feels premium, not aggressive
- ✓ Geometric accent is subtle, not distracting

---

### 2. **Parallax Gradient** (Momentum modern)
**Pattern** : Smooth gradient, subtle motion cue, no video

**Specs** :
- Hero: 1200×800px frame
- BG: Linear gradient primary-700 → secondary-600 (left-to-right)
- Content (white text):
  - H1: "Ce que l'IA change pour ceux qui apprennent." (56px, centered, white)
  - Subtitle: "Parcours adaptatif. Coaching intégré. Veille pédagogique." (16px, white 80%)
  - CTA button: warm or accent variant

**Rationale** : Replaces video parallax with pure CSS gradient + subtle scroll effect in code. Reduces CDN/performance overhead. Modern but not overdone.

**Validate against** :
- ✓ Gradient feels sophisticated (Stripe/Apple playbook)
- ✓ White text has good contrast on gradient
- ✓ No motion required for static frame (will add in code)

---

### 3. **Quote-Led Conviction** (Universal pattern)
**Pattern** : Centered blockquote, icon accent, minimal

**Specs** :
- Frame: 1200×400px
- BG: white
- Icon accent: small circle (8×8px, primary-600) at top-center
- Content (centered, max-w-520):
  - H2 blockquote: "Les outils changent chaque mois. Les compétences restent votre boussole." (32px, ink-900)
  - Description: "Passer d'une logique de postes à une logique de compétences..." (body-sm, ink-600)

**Rationale** : Replaces section-specific conviction layouts (dark stripe, callout-2col) with universal centered quote pattern. Applicable to all 6 variants.

**Validate against** :
- ✓ Blockquote format emphasizes key message
- ✓ Minimal design = maximum readability
- ✓ Icon accent adds visual interest without clutter

---

## How to Build in Figma

### Option A : Manual Build (Figma UI)
1. Create new page: `🎨 Modern 2026 — Design Explorations`
2. For each frame above:
   - Create frame (1200×800 or 1200×400)
   - Add background rectangle with fill color
   - Add geometric accent or icon (if applicable)
   - Add text elements with TLS text styles
   - Use TLS Variables for fills (not hex hardcode)
3. Position frames vertically (0, 900, 1800 for stacking)

### Option B : Computer-Use Script (Faster)
A Figma plugin script can create all 3 frames automatically. Script is ready at `/tmp/figma-modern-2026.js`.

**To run:**
1. Open Figma file TLS Design System (LccBZ1GKWQVwVzPtsSzk5Y)
2. Plugins → Create plugin → paste script
3. Run → creates page + 3 frames

---

## Evaluation Checklist

After building frames, evaluate each:

### Type-as-Hero
- [ ] H1 feels premium (not aggressive)
- [ ] Geometric circle accent is subtle (not distracting)
- [ ] Matches Clarity brand (clarity-first, pedagogical)
- [ ] Works on mobile (clamp() scaling, center alignment)
- [ ] No video = fast load time
- **Decision:** Adopt for Clarity? Extend to other variants?

### Parallax Gradient
- [ ] Gradient color transition is smooth (primary-700 → secondary-600)
- [ ] White text legible (> 4.5:1 contrast)
- [ ] Feels modern (Stripe/Apple aesthetic)
- [ ] Subtler than current video parallax (good for reducing motion)
- **Decision:** Adopt for Momentum? Update HeroSection layout?

### Quote-Led Conviction
- [ ] Blockquote format emphasizes key message
- [ ] Icon accent adds visual weight without clutter
- [ ] Centered layout works universally (all 6 variants)
- [ ] Minimal design suits pedagogical brand
- **Decision:** Use as universal ConvictionSection default?

---

## Next Steps After Validation

### If all 3 ✅ validated:
1. **Add new layouts to routers** :
   - HeroSection: add `'type-hero'` and `'parallax-gradient'` layouts
   - ConvictionSection: add `'quote-led'` as universal default (replace tone-specific layouts)
2. **Update 6 variants** to use new layouts:
   - Clarity → HeroSection `layout="type-hero"` + ConvictionSection `layout="quote-led"`
   - Momentum → HeroSection `layout="parallax-gradient"` + ConvictionSection `layout="quote-led"`
   - Others → evaluate fit, migrate if applicable

### If some variants rejected:
- Document rationale in DESIGN.md
- Keep alternative as "exploratory" in Figma (don't implement)
- Commit decision to codebase for future reference

---

## Figma File Structure (After Build)

```
🎨 Modern 2026 — Design Explorations
  ├─ 01 — Type-as-Hero (Clarity modern)
  │  └─ BG + Geometric Accent + Content (h1 + subheading + CTA)
  ├─ 02 — Parallax Gradient (Momentum modern)
  │  └─ Gradient BG + Content (h1 + subtitle)
  └─ 03 — Quote-Led Conviction (Universal)
     └─ White BG + Content (icon + blockquote + description)
```

---

## TLS Brand Fit Analysis

**Modern 2026 Principles** (from `LAYOUT-SYSTEM-ARCHITECTURE.md`):
1. Oversized typography as visual hierarchy ✓ (Type-as-Hero)
2. Motion with intention ✓ (Parallax Gradient scroll, minimal)
3. Glass morphism purposeful, not decorative ✓ (Quote-Led minimal)
4. Asymmetric grids, rhythm, breathing room ✓ (All 3)
5. Progressive disclosure ✓ (Parallax gradient reveals on scroll)
6. Color as semantic ✓ (All use TLS Variables)

**TLS Brand Fit** :
- **Pedagogical hierarchy** ✓ Learning progression clear in all 3
- **Warm, human** ✓ Typography and tone-aware colors
- **Trust-building** ✓ Minimize visual noise (no fake metrics, no hype)
- **Clarity-first** ✓ Minimal decoration, maximum signal

---

## Comparison: Current vs Modern

| Aspect | Current | Modern 2026 | Win |
|--------|---------|------------|-----|
| **Type-as-Hero** | Video watercolor | Oversized h1 + geometric | Faster, TLS clarity |
| **Parallax** | Video parallax (200vh) | Gradient shift (CSS) | Performance, web-native |
| **Conviction** | Tone-specific (stripe/callout) | Universal quote-led | Consolidation, simplicity |
| **Motion** | Framer-motion animations | CSS + scroll transforms | Lighter bundle, battery-friendly |
| **Accessibility** | prefers-reduced-motion | Built-in from start | Better a11y |

---

## Decision Matrix

**After Figma validation, use this to decide adoption:**

```
[ ] Type-as-Hero : Adopt for Clarity (and Refined, Elegant?)
[ ] Parallax Gradient : Adopt for Momentum (and Immersion, Organic?)
[ ] Quote-Led Conviction : Adopt as universal ConvictionSection default

[ ] Keep current layouts (justify rationale)
[ ] Hybrid : adopt Type-as-Hero + keep video parallax for Momentum
```

---

## Quick Start

**Immediate action:**
1. Open Figma TLS DS file
2. Create page `🎨 Modern 2026 — Design Explorations`
3. Build 3 frames (manual or script)
4. Evaluate using checklist above
5. Document decisions in this file
6. Return to Phase 2.5 refactors with validated direction

**Estimated time:** 30 min (manual) | 5 min (script)

---

## Resources

- **LAYOUT-SYSTEM-ARCHITECTURE.md** — Full design rationale for 14 patterns
- **REFACTOR-TEMPLATE.md** — Step-by-step migration guide for all 6 variants
- **Figma TLS DS** — LccBZ1GKWQVwVzPtsSzk5Y
- **Figma Pages** :
  - 🧩 Components v2 — Atoms (existing)
  - 🧩 Components v2 — Composites (existing)
  - 🎨 Modern 2026 — Design Explorations (NEW — this phase)

