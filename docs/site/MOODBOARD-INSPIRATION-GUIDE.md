# Moodboard Inspiration Guide

## 🎯 How to Use This Guide

**Your North Star = [DESIGN-INSPO.md](DESIGN-INSPO.md) — Direction C « Illustrated Glass »**

Each section in the **Figma Moodboard** (`🎨 Moodboard — Reference` page) helps you gather assets & test patterns that serve the locked Direction C brief. 

**Why?** The creative direction is already decided (Illustrated Glass: warm illustrated backgrounds + glass components + smooth motion + teal/orange palette). The Moodboard is where you:
1. Collect inspiration **that aligns with Direction C**
2. Find illustration references (Daydream, Structured, Phantom style)
3. Test motion / interaction patterns
4. Discover component patterns to extract

This becomes your **design reference library** for Phase 3B (component creation).

---

## 🦸 Hero Patterns

**Design Goal:** Cinematic, elevated, premium hero sections with glass effects.

### Inspiration Sources
- **Vercel** → hero with split layout (text left, gradient mesh right)
- **Linear** → dark hero with animated gradient background
- **Apple** → product hero with video background + glass card overlay
- **Framer** → hero with kinetic text + animated blur transitions

### Key Elements to Capture
- Background: illustrated gradient, mesh gradients, or video
- Glass card: white backdrop-blur + border + subtle shadow
- Text hierarchy: eyebrow (small, colored) + H1 (large, bold) + description
- CTA placement: buttons positioned in glass card or floating
- Visual accent: illustration, blob animation, or cinematic element

### Figma Components to Reference
- `Button` (primary, warm, glass variants)
- `Badge` (trust badges in hero)
- Typography: Display XL (48-52px), Display LG (36px)

### Questions for Component Design
- [ ] Should glass hero be a standalone component or composed from simpler parts?
- [ ] How to handle text overflow in hero on mobile?
- [ ] What's the glass effect spec (blur px, opacity, border width)?

---

## 💎 Card & Glass Effects

**Design Goal:** Layered, nested containers with glassmorphism and depth.

### Inspiration Sources
- **Design Systems**: Vercel, Linear, Framer (how they do card elevation)
- **Dribbble**: search "glassmorphism 2024" + "nested cards"
- **Apple Design**: iOS Control Center (glass + vibrant blur)
- **Figma Community**: "Glass UI Kit" community files

### Key Elements to Capture
- Double-bezel structure (outer ring + inner core)
- Glass effect: `backdrop-blur` amount (8px, 12px, 20px?)
- Border treatment: hairline white, opacity-based tint
- Shadow: subtle, soft, possibly colored
- Fill: white @ opacity (0.04-0.12?)

### Figma Components to Reference
- `Card` (if exists in TLS library)
- Nested frame structures with auto-layout

### Questions for Component Design
- [ ] Should glass effect be a style or a component variant?
- [ ] What blur radius works best for "premium" feel without obscuring text below?
- [ ] Border color: pure white, or tinted to accent color?
- [ ] Standard sizes for card padding (16px, 20px, 24px)?

---

## 🔘 Button States

**Design Goal:** Tactile, interactive buttons with clear visual feedback.

### Inspiration Sources
- **Vercel Button Gallery**
- **shadcn/ui** → Button variations (primary, secondary, ghost, outline)
- **Radix UI** → Button states (default, hover, active, disabled, loading)
- **Apple Human Interface Guidelines** → button anatomy + states

### Key Elements to Capture
- Default state: background, text color, border (if any)
- Hover state: background shift, scale, or color transition
- Active/Press state: deeper color, slight inset shadow, scale(0.98)
- Disabled state: opacity reduction, cursor not-allowed
- Loading state: spinner or skeleton inside button
- Focus state: ring or outline (accessibility)
- Ghost variant: no background, text-only
- Warm variant: secondary color (orange, amber)
- Glass variant: glass effect + white text

### Figma Components to Reference
- `Button` (primary, secondary, ghost, warm, glass)
- Icon integration inside button

### Questions for Component Design
- [ ] Button sizes: sm (32px), md (40px), lg (48px)?
- [ ] Icon spacing from text: 8px, 12px?
- [ ] Corner radius: 8px for UI, 12px for premium?
- [ ] Transition duration: 200ms, 300ms?
- [ ] How to handle loading state (spinner size)?

---

## 📝 Typography & Hierarchy

**Design Goal:** Expressive, readable type scale with premium character.

### Inspiration Sources
- **Typography.com** → Font pairing inspiration
- **Fonts used by premium brands**: Vercel (Geist), Linear (Satoshi), Framer (Clash)
- **Variable Fonts**: explore weight/width interpolation
- **Type scales**: 1.125 ratio (8pt scale), 1.25 ratio (12pt scale)

### Key Elements to Capture
- Display font: League Spartan, Geist, Outfit, Clash Display, Satoshi
- Body font: Nunito, Satoshi, Geist Mono (technical content)
- Font sizes: H1 (48-52px), H2 (36px), H3 (28px), Body (15-16px), Small (12-14px)
- Font weights: Light (300), Regular (400), Medium (500), SemiBold (600), Bold (700)
- Line-height ratios: tight (1.1) for headers, relaxed (1.6) for body
- Letter-spacing: negative (-2%) for large headers, positive (0.5%) for small caps
- Text truncation: ellipsis, line clamp (Tailwind: line-clamp-3)
- Color: ink-900 (strong), ink-700 (regular), ink-600 (secondary), ink-500 (muted)

### Figma Text Styles to Reference
- Display XL, Display LG, Display MD
- Body LG, Body, Body SM
- Micro (labels, tags)

### Questions for Component Design
- [ ] Should font selection be a design system decision (no variation)?
- [ ] Line-height baseline: should all text snap to an 8px grid?
- [ ] How to prevent orphaned words (text-wrap: balance)?
- [ ] Should we create a type scale variable system?

---

## 🎭 Color Palettes

**Design Goal:** Cohesive, accessible color system with single accent.

### Inspiration Sources
- **Color Palettes**: Coolors, Adobe Color, Humaaans
- **Accessibility**: WebAIM contrast checker
- **Variable Fonts Color**: CSS custom properties for systematic theming
- **Tint Systems**: how to derive related colors from one accent

### Key Elements to Capture
- Primary palette: 5-7 tones (primary-50 → primary-900)
- Secondary palette (optional): warm/cool alternative
- Accent color: single, saturated < 80%
- Neutral palette: ink-50 to ink-900 (consistent gray family)
- Semantic colors: success (green), warning (amber), error (red), info (blue)
- Gradients: mesh gradients, linear gradients, direction
- Dark mode adaptation: how colors shift in dark theme

### Figma Variables to Reference
- `primary-50`, `primary-100`, ... `primary-900`
- `secondary-500`, `secondary-600`, `secondary-700`
- `accent-400`
- `ink-50` to `ink-900`

### Questions for Component Design
- [ ] Should we pre-define gradient combinations or allow composition?
- [ ] How to handle alpha/opacity on color variables?
- [ ] Should semantic colors (success, error) be separate tokens or derived?
- [ ] Do we need a "color mode" variable (light/dark)?

---

## ⭐ Icon Systems

**Design Goal:** Consistent, recognizable icon sets that feel premium.

### Inspiration Sources
- **Phosphor Icons** → 6 weights, comprehensive, modern
- **Heroicons** → clean, minimal, perfect for interfaces
- **Remix Icon** → professional, extensive library
- **Apple SF Symbols** → consistency, sizing guidelines
- **Custom icons**: Figma → SVG export for your brand

### Key Elements to Capture
- Icon stroke weight: 1.5px, 2px (consistency)
- Icon sizes: 16px, 20px, 24px, 32px (grid-aligned)
- Icon alignment in buttons/cards: spacing to text (8-12px)
- Color variants: solid, outline, duotone
- Animation: rotate, scale, fade (if interactive)
- Fallback behavior: when icon is unavailable

### Figma Components to Reference
- Icon components in TLS Atoms page
- Button icon nesting

### Questions for Component Design
- [ ] Should icons be components or SVG symbols?
- [ ] Standard icon spacing in buttons: 8px or 12px?
- [ ] Should we support icon-only buttons (square)?
- [ ] Color: always match text color, or fixed accent?

---

## ✨ Micro-Interactions

**Design Goal:** Delightful, purposeful animations that feel premium.

### Inspiration Sources
- **Framer Motion** → spring physics, layout animations
- **Apple Design**: tap feedback, transitions between states
- **Linear, Vercel, Figma**: hover effects, scroll-triggered reveals
- **Dribbble**: micro-interaction category
- **GSAP ScrollTrigger**: scroll-driven animations

### Key Elements to Capture
- Button hover: scale(1.02), background color shift
- Button press: scale(0.98), subtle down translate
- Loading spinner: rotation animation (2s loop)
- Stagger reveal: list items fade-up with delay
- Pulse effect: subtle glow on active elements
- Slide/fade transitions: page navigation
- Scroll reveals: fade-up as elements enter viewport
- Spring physics: stiffness 100, damping 20

### Figma Motion Patterns to Reference
- 08 — Motion & Effects page (if populated)
- Framer Motion spring config

### Questions for Component Design
- [ ] Standard transition duration: 200ms, 300ms, 400ms?
- [ ] Should animations be disabled for `prefers-reduced-motion`?
- [ ] Easing function: `cubic-bezier(0.16, 1, 0.3, 1)` or spring physics?
- [ ] Loading state duration: how long before timeout?

---

## 📐 Layout Patterns

**Design Goal:** Asymmetric, varied, non-generic layout structures.

### Inspiration Sources
- **CSS Grid Mastery**: varied aspect ratios, fractional units
- **Bento Layouts**: Apple Control Center, Vercel dashboards
- **Asymmetric Grids**: 60/40 split, 70/30, masonry
- **Layout Examples**: Figma Community "Bento Grid" files

### Key Elements to Capture
- Grid structure: 12-col, 16-col, or fractional (2fr 1fr 1fr)
- Alignment: top, middle, bottom (optical adjustment?)
- Spacing: consistent gap (24px, 32px), varied margins
- Asymmetry: different column widths, overlapping elements
- Breakpoints: `md:` (768px), `lg:` (1024px), `xl:` (1440px)
- Max-width container: 1200px, 1400px, or fluid
- Mobile collapse: everything 1-column, full-width

### Figma Grids to Reference
- Auto-layout spacing rules
- Frame sizing (HUG vs FILL vs FIXED)

### Questions for Component Design
- [ ] Standard section padding: 96px horizontal, 40px vertical?
- [ ] Gap between items: 24px, 32px, or variable?
- [ ] Should layouts use CSS Grid or Flexbox?
- [ ] How to handle image aspect ratios (16:9, 4:3, square)?

---

## 📋 Form & Inputs

**Design Goal:** Clear, accessible form fields with strong visual feedback.

### Inspiration Sources
- **Modern Form Design**: Linear, Vercel, Stripe (form examples)
- **Accessibility**: labels above inputs, helper text, error states
- **Validation**: real-time feedback, clear error messages
- **Input Types**: text, email, password, textarea, select, checkbox, radio

### Key Elements to Capture
- Input height: 40px, 44px (touch-friendly)
- Border: 1px, color (ink-200), focus (primary-500)
- Padding: 12px horizontal, 8px vertical
- Label: above input, 14px, semi-bold, ink-900
- Placeholder: muted text (ink-500), not all-caps
- Focus state: border color + subtle shadow
- Disabled state: opacity, cursor not-allowed
- Error state: red border, error message below input
- Helper text: small text, muted, below input
- Icons: search icon in search input, etc.

### Figma Components to Reference
- `Input` (if exists in TLS library)
- `Select`, `Checkbox`, `Radio`

### Questions for Component Design
- [ ] Input sizes: sm, md, lg?
- [ ] Should label be inside or outside component?
- [ ] Error color: specific red or use `accent-400`?
- [ ] Max-width for inputs: full-width or constrained?

---

## 🌊 Surfaces & Textures

**Design Goal:** Visual depth and polish with subtle, high-quality surface treatments.

### Inspiration Sources
- **Grain & Noise**: CSS noise filter, SVG noise patterns
- **Patterns**: subtle geometric, organic, or film-grain
- **Depth**: shadows, blur, layering, parallax
- **Premium Feel**: Apple, Linear, Vercel (how they handle surfaces)
- **Textures**: fabric, paper, glass, metal (inspiration only)

### Key Elements to Capture
- Background texture: noise, grain, or pattern (opacity < 5%)
- Blur effect: backdrop-blur on glass, depth of field
- Shadow colors: tinted (not pure black) shadows
- Depth layers: z-index strategy, overlap, stacking
- Overlay colors: semi-transparent overlays (dark on light, light on dark)
- Gradients: mesh gradients, radial gradients (not just linear)
- Border effects: subtle glow, highlight, or accent

### Figma Effects to Reference
- Shadow styles in 01 · Foundations
- Fill patterns, stroke effects

### Questions for Component Design
- [ ] Should grain be a global filter or per-component?
- [ ] Standard shadow blur: 8px, 12px, 20px?
- [ ] Shadow opacity: 10%, 15%, 20%?
- [ ] Should we support colored shadows in variables?

---

## 📌 How to Build Your Moodboard

1. **Search** design inspiration (Dribbble, Figma Community, product websites)
2. **Screenshot** the part you want to reference
3. **Paste** into the corresponding section in Figma
4. **Annotate** (optional): add a text note explaining what you like
5. **Build Reference Library** as you go — this becomes your design spec

## 🚀 Next Step: Component Extraction

Once you've filled sections with inspiration, check [COMPONENT-EXTRACTION-CHECKLIST.md](COMPONENT-EXTRACTION-CHECKLIST.md) to identify which patterns should become **reusable components** in Phase 3B.

---

## 🔗 Useful Links for Inspiration

- **Design Systems**: https://www.designsystems.com/
- **Dribbble Design Inspiration**: https://dribbble.com/search?q=component
- **Figma Community**: https://www.figma.com/community
- **Coolors Palette Generator**: https://coolors.co/
- **Phosphor Icons**: https://phosphoricons.com/
- **Typography Tools**: https://www.typewolf.com/
