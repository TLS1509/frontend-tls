# Scroll Effects Implementation — Marketing Homepage

## Overview

The homepage now has **immersive scroll interactions** across all major sections. Here's what was added and how.

---

## What Was Added

### 1. **Scroll Progress Indicator** (Top of Page)
```jsx
<ScrollProgressIndicator height={3} />
```
- **What it does:** Thin teal bar at the very top that fills as you scroll down
- **Location:** Inside `<div className="bg-white text-ink-900">` wrapper
- **Effect:** Visual feedback showing scroll progress (0% → 100%)

### 2. **Parallax Hero** (Section 1)
```jsx
<ParallaxSection speed={0.5}>
  <CinematicHero />
</ParallaxSection>
```
- **What it does:** Hero section moves slower than scroll (half-speed parallax)
- **Why:** Creates depth perception; background feels further away
- **Speed:** `0.5` = background moves at 50% of scroll speed

### 3. **Staggered Offers Reveal** (Section 5)
```jsx
<StaggerGroup staggerDelay={100}>
  {OFFERS.map((offer) => (
    <Link key={offer.no} to={offer.to} className="group block...">
      {/* offer card content */}
    </Link>
  ))}
</StaggerGroup>
```
- **What it does:** Each of the 3 offers (Formation, Conseil, Learning App) appears sequentially
- **Delay:** 100ms between each offer
- **Effect:** Professional cascade reveal instead of simultaneous fade-in

### 4. **Parallax Proof Section** (Section 7)
```jsx
<ParallaxSection speed={0.6} className="bg-gradient-page-ambient-warm">
  <section>
    {/* Proof content */}
  </section>
</ParallaxSection>
```
- **What it does:** Proof section's background moves slower as you scroll
- **Speed:** `0.6` = background moves at 60% of scroll speed
- **Why:** Adds visual depth to the honest proof statements

### 5. **Dramatic CTA Reveal** (Section 9)
```jsx
<ScrollReveal distance={32} duration={800}>
  <div className="relative overflow-hidden rounded-2xl bg-ink-900...">
    {/* Final CTA content */}
  </div>
</ScrollReveal>
```
- **What it does:** Dark CTA card fades in + slides up from below when you scroll near it
- **Distance:** Slides up 32px
- **Duration:** 800ms (smooth, not rushed)
- **Effect:** Draws attention to the final call-to-action

---

## Component Library Reference

All scroll effects live in:
**`/src/components/marketing/scroll-effects.tsx`**

### Available Components

| Component | Purpose | Usage |
|-----------|---------|-------|
| `ParallaxSection` | Parallax depth effect | Wrap container, set `speed` prop |
| `ScrollReveal` | Fade + slide-up on viewport entry | Wrap content, set `duration`/`distance` |
| `StaggerGroup` | Sequential reveals of children | Wrap list/grid, set `staggerDelay` |
| `ScrollProgressIndicator` | Progress bar at top | Place once at page start |

### Props Reference

**ParallaxSection:**
- `speed?: number` (default: 0.5) — lower = slower movement
- `className?: string` — for background colors, etc.

**ScrollReveal:**
- `distance?: number` (default: 14px) — how far element slides from
- `duration?: number` (default: 600ms) — animation length
- `delay?: number` (default: 0) — stagger delay in seconds
- `className?: string`

**StaggerGroup:**
- `staggerDelay?: number` (default: 100ms) — delay between children
- `delayFirst?: number` (default: 0ms) — delay before first child
- `className?: string`

**ScrollProgressIndicator:**
- `color?: string` (default: primary-600) — CSS color
- `height?: number` (default: 3px) — bar height

---

## How to Add Scroll Effects to Other Sections

### Pattern 1: Parallax Background
```jsx
<ParallaxSection speed={0.5} className="bg-your-color">
  <section>
    {/* Your content */}
  </section>
</ParallaxSection>
```

### Pattern 2: Staggered List
```jsx
<StaggerGroup staggerDelay={100}>
  {items.map((item) => (
    <div key={item.id}>{item.content}</div>
  ))}
</StaggerGroup>
```

### Pattern 3: Dramatic Reveal
```jsx
<ScrollReveal distance={24} duration={700}>
  <div className="card">
    {/* Content that fades in + slides up */}
  </div>
</ScrollReveal>
```

---

## Motion Performance Notes

All scroll effects are **GPU-safe:**
- ✅ Use only `transform` and `opacity` (no layout shifts)
- ✅ Respect `prefers-reduced-motion` (no animation if user disabled it)
- ✅ Use Framer Motion's optimized hooks (no continuous scroll listeners)

---

## Testing Checklist

When you view the homepage at **`http://localhost:5173`**, check:

- [ ] Thin teal progress bar appears at top and fills as you scroll
- [ ] Hero parallax: background moves slightly slower than scroll
- [ ] Three Offers appear one-by-one (not all at once) when you scroll to section 5
- [ ] Proof section background has subtle parallax shift
- [ ] Dark final CTA card slides up from below with fade-in effect
- [ ] All animations are smooth on both desktop and mobile
- [ ] If you have reduced motion enabled, no animations play (just instant appearance)

---

## Next Steps

To add more scroll effects:

1. **Pick a section** in MarketingHomeEditorial.tsx
2. **Choose an effect** (ParallaxSection, ScrollReveal, or StaggerGroup)
3. **Wrap your content** with the component
4. **Set props** (speed, duration, distance, staggerDelay)
5. **Test in browser** at localhost:5173

Example:
```jsx
<ScrollReveal duration={900} distance={40}>
  <h2>Your Heading</h2>
</ScrollReveal>
```

---

## Direction C Alignment

These scroll effects support the **Illustrated Glass** aesthetic:
- Parallax creates **depth** (glass floating effect)
- Stagger reveals create **smooth, organic motion**
- Progress indicator adds **interactive engagement**
- ScrollReveal adds **cinematic polish**

All effects are **subtle, not flashy** — they enhance readability and guide the eye without overwhelming content.
