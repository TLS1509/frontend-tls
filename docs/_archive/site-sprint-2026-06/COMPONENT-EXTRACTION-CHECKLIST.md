# Component Extraction Checklist

## 🎯 Overview

As you enrich the 6 marketing screens, patterns will emerge. This checklist helps you identify which patterns should become **reusable Figma components** (Phase 3B).

**Fill this as you go** — each time you spot a repeating pattern, check the relevant box and note what you discovered.

---

## 🦸 Hero Section Components

### HeroSection (Cinematic Glass)
- [ ] **Found in**: HOME, FORMATION, ACCOMPAGNEMENT, LEARNING APP, MAGAZINE, CONTACT
- [ ] **Composed of**: 
  - [ ] Background (illustrated gradient or image)
  - [ ] Glass card overlay (white @ 0.06, border white @ 0.14)
  - [ ] Text block (eyebrow + H1 + description)
  - [ ] CTA button(s)
  - [ ] Accent visual (LDM graphic, blob, illustration)
- [ ] **Variants needed**:
  - [ ] Light glass (white)
  - [ ] Dark glass (dark with lighter text)
  - [ ] With accent color tint
  - [ ] With/without visual element
- [ ] **Figma Status**: 
  - [ ] Design spec completed
  - [ ] Variants created
  - [ ] Main component published
- [ ] **Notes**: _Add observations here_

---

## 💎 Card Components

### OfferCard (Three Offers Pattern)
- [ ] **Found in**: HOME, FORMATION
- [ ] **Composed of**:
  - [ ] Number (36px bold, color-coded)
  - [ ] Kicker (10px uppercase)
  - [ ] Title (24px bold)
  - [ ] Body text (14px)
  - [ ] CTA link with arrow
  - [ ] Divider line below
- [ ] **Variants needed**:
  - [ ] Primary color (blue)
  - [ ] Secondary color (orange)
  - [ ] Accent color (teal)
  - [ ] With/without divider
- [ ] **Figma Status**:
  - [ ] Design spec completed
  - [ ] Variants created
- [ ] **Notes**: _Add observations here_

### ServiceCard (Accompagnement Services)
- [ ] **Found in**: ACCOMPAGNEMENT
- [ ] **Composed of**:
  - [ ] Icon (24px, Phosphor)
  - [ ] Title (20px bold)
  - [ ] Description (14px)
  - [ ] CTA link or arrow
  - [ ] Optional: background tint or accent
- [ ] **Variants needed**:
  - [ ] Icon position (left, top)
  - [ ] With/without tint background
  - [ ] Color variants (primary, secondary, accent)
- [ ] **Figma Status**:
  - [ ] Design spec completed
  - [ ] Variants created
- [ ] **Notes**: _Add observations here_

### ArticleCard (Magazine)
- [ ] **Found in**: MAGAZINE
- [ ] **Composed of**:
  - [ ] Image (aspect ratio 16:9 or 4:3?)
  - [ ] Category badge
  - [ ] Title (18px semi-bold)
  - [ ] Excerpt (14px)
  - [ ] Read time (12px muted)
  - [ ] Author avatar (optional)
- [ ] **Variants needed**:
  - [ ] Featured (larger) vs regular
  - [ ] With/without excerpt
  - [ ] Dark overlay on image variant
- [ ] **Figma Status**:
  - [ ] Design spec completed
  - [ ] Variants created
- [ ] **Notes**: _Add observations here_

### StatsCard (Accompagnement Stats)
- [ ] **Found in**: ACCOMPAGNEMENT
- [ ] **Composed of**:
  - [ ] Large number (48px bold, color-coded)
  - [ ] Label (14px)
  - [ ] Optional: description or source
- [ ] **Variants needed**:
  - [ ] Color variants (primary, secondary, accent)
  - [ ] With/without background tint
- [ ] **Figma Status**:
  - [ ] Design spec completed
  - [ ] Variants created
- [ ] **Notes**: _Add observations here_

---

## 🔘 Button & CTA Components

### Button (Primary, Secondary, Ghost, Warm, Glass)
- [ ] **Already exists in TLS?** Yes/No
- [ ] **Variants in use**:
  - [ ] Primary (blue background)
  - [ ] Secondary (green/teal background)
  - [ ] Warm (orange/amber background)
  - [ ] Ghost (transparent, border)
  - [ ] Glass (white text, glass effect)
- [ ] **States**:
  - [ ] Default
  - [ ] Hover (scale, color shift)
  - [ ] Active/Press (scale 0.98)
  - [ ] Disabled (opacity)
  - [ ] Loading (spinner inside)
  - [ ] Focus (ring for keyboard nav)
- [ ] **Sizes**:
  - [ ] Small (32px height, 14px text)
  - [ ] Medium (40px height, 15px text)
  - [ ] Large (48px height, 16px text)
- [ ] **Icon Integration**:
  - [ ] Icon left of text
  - [ ] Icon right of text (arrow)
  - [ ] Icon only (square)
- [ ] **Figma Status**:
  - [ ] Main component created
  - [ ] Variants documented
  - [ ] Component properties bound
- [ ] **Notes**: _Add observations here_

### Badge / Pill (Tags, Labels)
- [ ] **Found in**: Article cards, form tags, trust badges in hero
- [ ] **Composed of**:
  - [ ] Background color (primary-100, secondary-100, etc.)
  - [ ] Text (12px, colored)
  - [ ] Optional: icon
  - [ ] Corner radius (rounded-full)
- [ ] **Variants needed**:
  - [ ] Color variants (primary, secondary, accent, etc.)
  - [ ] Sizes (sm, md)
  - [ ] With/without icon
- [ ] **Figma Status**:
  - [ ] Design spec completed
  - [ ] Variants created
- [ ] **Notes**: _Add observations here_

---

## 📝 Typography Components

### Text Styles (Already in TLS?)
- [ ] **Display XL** (48-52px, League Spartan, bold, tight tracking)
- [ ] **Display LG** (36px, tight tracking)
- [ ] **Display MD** (28px)
- [ ] **Body LG** (18px, readable line-height)
- [ ] **Body** (15px, standard)
- [ ] **Body SM** (14px, button labels, captions)
- [ ] **Micro** (10-12px, labels, eyebrows, tags)

### Heading Components (If Reusable)
- [ ] **SectionHeader** (eyebrow + H2 + optional description)
  - [ ] Variants: left-aligned, centered
  - [ ] With/without description
- [ ] **Figma Status**:
  - [ ] Text styles bound in main component
- [ ] **Notes**: _Add observations here_

---

## 🎭 Color & Surface Components

### GlassEffect
- [ ] **Specification**:
  - [ ] Blur amount: ___ px
  - [ ] Background opacity: ___%
  - [ ] Border: white @ ___%
  - [ ] Shadow: tinted or neutral?
- [ ] **Figma Status**:
  - [ ] Effect style created (if applicable)
  - [ ] Documented in design system
- [ ] **Notes**: _Add observations here_

### Gradient Patterns
- [ ] **Mesh Gradient** (warm blobs + teal undertones)
  - [ ] Start color: ___
  - [ ] End color: ___
  - [ ] Nodes/control points documented
- [ ] **Linear Gradient** (if applicable)
  - [ ] Angle, start/end colors
- [ ] **Figma Status**:
  - [ ] Saved as reusable fill style or component background
- [ ] **Notes**: _Add observations here_

### Shadow Styles
- [ ] **Soft Shadow** (elevated depth)
  - [ ] Blur: ___ px, Spread: ___ px, Y-offset: ___ px, Color: ___
- [ ] **Deep Shadow** (prominent depth)
  - [ ] Specification
- [ ] **Figma Status**:
  - [ ] Shadow effects created as styles
- [ ] **Notes**: _Add observations here_

---

## 📐 Layout & Grid Components

### OffersGrid (Three Columns)
- [ ] **Found in**: HOME, FORMATION
- [ ] **Composed of**:
  - [ ] 3× OfferCard instances
  - [ ] Gap between items: ___ px
  - [ ] Container padding: ___ px
- [ ] **Figma Status**:
  - [ ] Auto-layout configured correctly
  - [ ] Variants for responsive (if needed)
- [ ] **Notes**: _Add observations here_

### StatsGrid (Four Columns)
- [ ] **Found in**: ACCOMPAGNEMENT
- [ ] **Composed of**:
  - [ ] 4× StatsCard instances
  - [ ] Gap: ___ px
  - [ ] Responsive: 2×2 on tablet, 1×4 on mobile?
- [ ] **Figma Status**:
  - [ ] Auto-layout configured
  - [ ] Responsive variants
- [ ] **Notes**: _Add observations here_

### ServicesGrid (Four Cards)
- [ ] **Found in**: ACCOMPAGNEMENT
- [ ] **Composed of**:
  - [ ] 4× ServiceCard instances
  - [ ] Layout: 2×2, 1×4, or 4×1?
  - [ ] Gap, padding
- [ ] **Figma Status**:
  - [ ] Auto-layout configured
- [ ] **Notes**: _Add observations here_

### TimelineComponent (3 Pillars)
- [ ] **Found in**: ACCOMPAGNEMENT (J+30, J+45, J+60)
- [ ] **Composed of**:
  - [ ] 3× TimelineStep components
  - [ ] Date, title, description
  - [ ] Visual connector (line between pillars)
- [ ] **Figma Status**:
  - [ ] Design spec completed
  - [ ] Variants for responsive
- [ ] **Notes**: _Add observations here_

---

## ✨ Interaction & Motion Components

### LoadingState
- [ ] **Spinner Pattern**:
  - [ ] Animation duration: ___ ms
  - [ ] Size variants: sm, md, lg
  - [ ] Color: primary or custom?
- [ ] **Figma Status**:
  - [ ] Animation spec documented
  - [ ] Static frames for multiple stages
- [ ] **Notes**: _Add observations here_

### HoverEffects
- [ ] **Button Hover**:
  - [ ] Scale: 1.02 or 1.05?
  - [ ] Transition duration: ___ ms
  - [ ] Background color shift amount
- [ ] **Card Hover**:
  - [ ] Scale, shadow depth increase, color shift?
- [ ] **Figma Status**:
  - [ ] Prototype interactions configured
- [ ] **Notes**: _Add observations here_

### StaggeredReveal
- [ ] **List Items**:
  - [ ] Fade-up animation on scroll entry
  - [ ] Stagger delay: ___ ms between items
  - [ ] Duration: ___ ms per item
- [ ] **Figma Status**:
  - [ ] Animation spec documented
- [ ] **Notes**: _Add observations here_

---

## 🔍 Discovered Patterns (As You Go)

### Pattern 1
- [ ] **Name**: _______________
- [ ] **Found in**: [screen names]
- [ ] **Reusable?**: Yes / No
- [ ] **Priority**: High / Medium / Low
- [ ] **Notes**: _______________

### Pattern 2
- [ ] **Name**: _______________
- [ ] **Found in**: [screen names]
- [ ] **Reusable?**: Yes / No
- [ ] **Priority**: High / Medium / Low
- [ ] **Notes**: _______________

### Pattern 3
- [ ] **Name**: _______________
- [ ] **Found in**: [screen names]
- [ ] **Reusable?**: Yes / No
- [ ] **Priority**: High / Medium / Low
- [ ] **Notes**: _______________

---

## 📊 Summary Stats

**Count as you go:**

| Category | Count | Status |
|----------|-------|--------|
| **Hero Components** | ___ | In Design / Ready |
| **Card Components** | ___ | In Design / Ready |
| **Button Variants** | ___ | In Design / Ready |
| **Typography Styles** | ___ | In Design / Ready |
| **Color & Effects** | ___ | In Design / Ready |
| **Layout Grids** | ___ | In Design / Ready |
| **Micro-Interactions** | ___ | In Design / Ready |
| **Custom Patterns** | ___ | In Design / Ready |

**Total Reusable Components**: ___

**Target for Phase 3B**: 15-20 core components

---

## 🚀 Phase 3B Workflow

Once you've completed enrichment and identified components:

1. **Prioritize** (High → Medium → Low)
2. **Create** component main variants in Figma
3. **Bind** design tokens (colors, spacing, typography)
4. **Document** component anatomy in Figma descriptions
5. **Sync** to Code via design system tokens

**Reference**: [FIGMA-ENRICHMENT-GUIDE.md](FIGMA-ENRICHMENT-GUIDE.md) for detailed component specs.
