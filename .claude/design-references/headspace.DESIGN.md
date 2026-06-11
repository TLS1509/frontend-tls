# DESIGN.md - Headspace Design System

## Visual Identity & Philosophy

Headspace is built on a wellness-first design philosophy emphasizing calm, approachability, and progressive disclosure. The design language prioritizes emotional safety through rounded geometries, soft transitions, and breathing-paced animations. The brand embodies "meditation made simple" through clear information hierarchy and guided user flows that reduce cognitive load.

**Core Values:**
- **Serenity**: Soft, non-aggressive visual language
- **Clarity**: Minimal interface with intentional hierarchy
- **Humanity**: Warm, illustrated approach over pure abstraction
- **Progression**: Onboarding as continuous, guided journey

---

## Color Palette

| Element | Hex | Usage |
|---------|-----|-------|
| Primary Brand (Teal) | `#14B8A6` | CTAs, meditation icons, key interactions |
| Secondary Warm | `#FBBF24` | Progress states, motivational elements |
| Tertiary Purple | `#A78BFA` | Sleep & relaxation, secondary actions |
| Background Light | `#F8FAFC` | Main canvas |
| Background Dark | `#0F172A` | Night mode, sleep sessions |
| Text Primary | `#1E293B` | Headings, primary copy |
| Text Secondary | `#64748B` | Supporting text, metadata |
| Dividers | `#E2E8F0` | Subtle separation |
| Success/Calm | `#10B981` | Completion, wellness metrics |

---

## Typography

| Role | Font | Size | Weight |
|------|------|------|--------|
| Display | SF Pro Display | 32–48px | 700 |
| H1 | SF Pro Display | 28px | 600 |
| H2 | SF Pro Text | 22px | 600 |
| Body Large | SF Pro Text | 18px | 400 |
| Body | SF Pro Text | 16px | 400 |
| Small | SF Pro Text | 14px | 400 |
| Caption | SF Pro Text | 12px | 400 |

**Line height:** 1.5 (body) · 1.2 (headings)
**Letter spacing:** +0.5% headings, 0% body

---

## Spacing & Layout

- **Base unit:** 8px
- Mobile padding: 16px horizontal
- Section spacing: 24–32px
- Max-width: 1200px (web)

---

## Component Patterns

### Meditation Session Card
```
Border-radius: 16px
Shadow: 0 2px 8px rgba(0,0,0,0.06)
Padding: 16px
Illustration: 60×60px soft drop shadow
Title: 16px semibold + duration 14px secondary
Progress bar: 4px height, full-width, #14B8A6 fill
```

### CTA Button
```
Border-radius: 12px
Padding: 12px 24px
Font: 16px semibold
Primary: #14B8A6 background, white text
Hover: #11A39B (5% darker)
Pressed: 10% darker, shadow reduced
Disabled: 40% opacity
```

### Onboarding Progress
```
Dot indicators: 8px diameter, 8px gap
Active: #14B8A6
Inactive: #E2E8F0 50%
Linear bar variant: 4px height, 400ms transition
```

### Meditation Timer
```
Numerals: monospace, 64px, #1E293B
Breathing circle: pulsing 3–6s cycle
Background: #F8FAFC (light) / #0F172A (dark)
```

---

## Motion & Animation

**Breathing Rhythm:** All transitions 400ms. Longer durations (600–800ms) for meditation intros to establish calm pacing.

```
Fade-in:     300ms ease-out
Slide-up:    400ms cubic-bezier(0.34, 1.56, 0.64, 1)
Scale press: 200ms (0.95 on press)
Breathing:   CSS animation 6s infinite cycle
Stagger:     100ms offset per card on load
```

---

## Anti-Patterns

1. ❌ Harsh saturated colors or high-contrast black/white
2. ❌ Fonts below 14px on body copy
3. ❌ Aggressive shadows or 3D effects
4. ❌ Auto-playing video/audio on discovery pages
5. ❌ Rapid notifications or badge counts (anxiety-inducing)
6. ❌ Inconsistent corner radii (breaks soft identity)
7. ❌ Session interruptions without warning
8. ❌ Complex navigation hierarchies
9. ❌ Neon or electric accent colors
10. ❌ Dark patterns pushing premium subscription
