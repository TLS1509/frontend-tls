# Animation Effects Integration Guide

**Date:** 2026-06-11  
**Status:** ✅ Created & Ready to Test

---

## 3 New Motion Effects Created

### 1. **Morphing SVG Visualizer**
**File:** `/src/components/marketing/morphing-svg-visualizer.tsx`

Animates SVG shape transforms between 3 states:
- `loop` → `circle` → `path`
- Changes based on `activeIndex` prop
- Perfect for Learn → Do → Match visual

**Props:**
```tsx
<MorphingSVGVisualizer
  activeIndex={0}        // 0, 1, or 2 (loop, circle, path)
  size={120}             // SVG size in pixels
  colorClass="text-secondary-600"  // Tailwind text color
/>
```

---

### 2. **Counter Animation**
**File:** `/src/components/marketing/counter-animation.tsx`

Displays animated step counter with smooth transitions:
- Shows "Étape 1/3", "Étape 2/3", etc.
- Number slides up/down with fade
- Integrates with step changes

**Props:**
```tsx
<CounterAnimation
  currentStep={0}        // 0-indexed (displays as 1, 2, 3)
  totalSteps={3}         // Total steps (default: 3)
  label="Étape"          // Custom label
  colorClass="text-secondary-600"
/>
```

---

### 3. **Parallax Text Layers**
**File:** `/src/components/marketing/parallax-text-layers.tsx`

Applies different scroll speeds to text elements for 3D depth:
- Eyebrow, title, body move at different rates
- Creates cinematic layered effect
- Respects `prefers-reduced-motion`

**Props:**
```tsx
<ParallexTextLayers
  eyebrow="Learn"
  eyebrowSpeed={0.3}     // Slower (stays further back)
  title="Apprendre, à votre rythme."
  titleSpeed={0.5}       // Medium speed
  body="Description..."
  bodySpeed={0.7}        // Faster (closer to camera)
/>
```

---

## Test Page

### Access the Showcase:
```
http://localhost:5174/marketing/_showcase-scroll
```

**Features:**
- ✅ Interactive step controls (up/down buttons)
- ✅ Real-time preview of all 3 effects
- ✅ Testing checklist
- ✅ Integration code examples

---

## How to Integrate into Main Site

### Target: Learn → Do → Match Section (Section 3)

#### Current Structure:
```tsx
<StickyScrollStory
  panels={STORY}
  visual={(active) => <LearnDoMatchVisual active={active} />}
/>
```

#### With New Effects:
```tsx
import { MorphingSVGVisualizer } from '../../components/marketing/morphing-svg-visualizer'
import { CounterAnimation } from '../../components/marketing/counter-animation'
import { ParallexTextLayers } from '../../components/marketing/parallax-text-layers'

// Replace StickyScrollStory's visual prop:
<StickyScrollStory
  panels={STORY.map((panel, i) => ({
    ...panel,
    // Add counter to eyebrow
    eyebrow: (
      <CounterAnimation
        currentStep={i}
        totalSteps={3}
        label="Étape"
      />
    ),
  }))}
  visual={(active) => (
    <MorphingSVGVisualizer
      activeIndex={active}
      size={140}
      colorClass="text-secondary-600"
    />
  )}
/>

// For text layers, update LearnDoMatchVisual.tsx to use ParallexTextLayers
```

---

## Integration Checklist

### Before Merging to Production:

- [ ] **Test in browser** at `/marketing/_showcase-scroll`
  - [ ] Counter animates on step change
  - [ ] SVG morphs smoothly between shapes
  - [ ] Text layers scroll at different speeds

- [ ] **Test on mobile** (responsive)
  - [ ] All animations work on touch
  - [ ] No performance issues (60fps)

- [ ] **Test accessibility**
  - [ ] With `prefers-reduced-motion: reduce` enabled
  - [ ] Screen reader compatibility
  - [ ] Keyboard navigation (if applicable)

- [ ] **Performance audit**
  - [ ] Check DevTools Performance tab
  - [ ] No layout shifts (CLS = 0)
  - [ ] GPU acceleration enabled

- [ ] **Integrate into StickyScrollStory**
  - [ ] Update `/src/pages/marketing/MarketingHomeEditorial.tsx`
  - [ ] Test Section 3 (Learn → Do → Match)
  - [ ] Verify all other sections still work

- [ ] **Final visual check**
  - [ ] Effects align with Direction C aesthetic
  - [ ] Animations feel organic (not flashy)
  - [ ] Timing matches brand velocity

---

## File Locations

```
src/
├── components/marketing/
│   ├── morphing-svg-visualizer.tsx       ✅ New
│   ├── counter-animation.tsx             ✅ New
│   ├── parallax-text-layers.tsx          ✅ New
│   └── scroll-effects.tsx                ✅ Existing
│
└── pages/marketing/
    ├── StickyScrollShowcase.tsx          ✅ New (test page)
    └── MarketingHomeEditorial.tsx        (to be updated)
```

---

## Customization

### Change Parallax Speeds
```tsx
// Slower parallax (more subtle)
<ParallexTextLayers
  eyebrowSpeed={0.1}
  titleSpeed={0.2}
  bodySpeed={0.3}
/>

// Faster parallax (more dramatic)
<ParallexTextLayers
  eyebrowSpeed={0.5}
  titleSpeed={0.8}
  bodySpeed={1.2}
/>
```

### Change SVG Colors
```tsx
<MorphingSVGVisualizer
  colorClass="text-primary-600"    // Blue
  // or
  colorClass="text-accent-700"     // Orange
/>
```

### Change Counter Label
```tsx
<CounterAnimation
  label="Step"      // English
  label="Étape"     // French (default)
  label="Phase"     // Alternative
/>
```

---

## Direction C Alignment

These effects **directly support the "Illustrated Glass" aesthetic:**

- **Morphing SVG** → Organic, hand-drawn feel (shapes flow naturally)
- **Counter** → Elegant, minimal feedback (not flashy)
- **Parallax Text** → Creates depth like glass layers
- **All effects** → Smooth spring physics, no jarring transitions

---

## Next Steps

1. **Test now** at `/marketing/_showcase-scroll`
2. **Provide feedback** on feel/timing
3. **Integrate when ready** into MarketingHomeEditorial.tsx
4. **Optional:** Apply to other sections (blog teaser, proof section, etc.)

---

## Questions?

All components are:
- ✅ Fully documented with JSDoc comments
- ✅ TypeScript typed
- ✅ Accessibility-first (respects `prefers-reduced-motion`)
- ✅ GPU-optimized (transform/opacity only)
- ✅ Mobile-responsive

Check the component files for detailed prop documentation.
