# 📸 Component States Reference - Quick Visual Guide

## Action Card States

### Default State
```
┌─────────────────────┐
│                     │
│     ┌─────┐        │
│     │  👤 │        │  Background: rgba(255, 255, 255, 0.6)
│     └─────┘        │  Border: rgba(255, 255, 255, 0.8)
│                     │  Shadow: 0 4px 16px rgba(0,0,0,0.06)
│  Coaching 1-to-1   │  Transform: scale(1)
│  Réserver session  │
│                     │
└─────────────────────┘
```

### Hover State
```
┌─────────────────────┐
│                     │
│     ┌─────┐        │
│     │  👤 │        │  Background: rgba(255, 255, 255, 0.7)
│     └─────┘        │  Border: rgba(255, 255, 255, 1)
│                     │  Shadow: 0 8px 24px rgba(85,161,180,0.12)
│  Coaching 1-to-1   │  Transform: scale(1.05)
│  Réserver session  │  Transition: 300ms cubic-bezier
│                     │
└─────────────────────┘
        ↗️ Lift + Scale
```

## Stat Pill States

### Default State
```
┌──────────────────┐
│  🔥  7  jours    │  Padding: 8px 12px
└──────────────────┘  Border-radius: 9999px
                      Background: rgba(248,176,68,0.15)
                      Border: 1px solid rgba(248,176,68,0.25)
                      Transform: scale(1)
```

### Hover State
```
┌──────────────────┐
│  🔥  7  jours    │  Transform: scale(1.05)
└──────────────────┘  Transition: 200ms cubic-bezier
      ↗️ Scale
```

## Progress Bar - Animation

### Animation Flow (3 seconds loop)
```
0s:   [████████                    ] 0% position
      ← Gradient: Blue → Orange → Yellow

1.5s: [                ████████    ] 100% position
      ← Gradient flows from left to right

3s:   [████████                    ] 0% position (loop)
      ← Back to start
```

### CSS
```css
background: linear-gradient(90deg, var(--primary), var(--secondary), var(--accent));
background-size: 200% 100%;
animation: gradientFlow 3s ease-in-out infinite;

@keyframes gradientFlow {
  0%, 100% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
}
```

## Continue Learning Card - Breathe Animation

### Animation Cycle (4 seconds)
```
0s:   Box-shadow: 0 4px 16px rgba(0,0,0,0.06)
      ↓
2s:   Box-shadow: 0 8px 24px rgba(237,132,58,0.08)  ← Peak (more orange glow)
      ↓
4s:   Box-shadow: 0 4px 16px rgba(0,0,0,0.06)  ← Back to start
```

### Hover State (animation stops)
```
Default (breathing):     Hover (static):
┌─────────────────┐     ┌─────────────────┐
│ [Breathing...]  │     │  [Lifted up]    │
│                 │ →   │                 │
│ Maîtriser l'IA  │     │ Maîtriser l'IA  │
│                 │     │                 │
│ ████████░░░░    │     │ ████████░░░░    │
│ 68% complété    │     │ 68% complété    │
└─────────────────┘     └─────────────────┘
  shadow: breathing       shadow: strong static
  transform: none         transform: translateY(-8px)
  animation: 4s breathe   animation: none
```

## Glass Card Backdrop Blur

### Visual Representation
```
Background:                 Card:
┌──────────────────┐       ┌──────────────────┐
│ [Blurred bg]     │       │ [Sharp content]  │
│ ░░░░░░░░░░░░░░   │  →    │ ▓▓▓▓▓▓▓▓▓▓▓▓▓▓  │
│ ░░Gradient░░     │       │ Glassmorphism    │
│ ░░░mesh░░░░░     │       │ backdrop-blur    │
└──────────────────┘       └──────────────────┘
```

### CSS Properties
```css
/* Default */
backdrop-filter: blur(20px);
background: linear-gradient(135deg, rgba(255,255,255,0.6) 0%, rgba(255,255,255,0.4) 100%);

/* Hover */
backdrop-filter: blur(30px);
background: linear-gradient(135deg, rgba(255,255,255,0.7) 0%, rgba(255,255,255,0.5) 100%);
```

## Spacing Grid Visual

### Dashboard Layout
```
┌────────────────────────────────────────────────────┐
│  HERO SECTION                                       │  padding: 32px 24px
│  padding: var(--space-8) var(--space-6)           │
└────────────────────────────────────────────────────┘
                    ↓ margin-bottom: 0px
┌────────────────────────────────────────────────────┐
│  QUICK ACTIONS (4 columns)                         │  max-width: 800px
│  gap: var(--space-3) = 12px                       │  margin: 0 auto
└────────────────────────────────────────────────────┘
                    ↓ margin-bottom: 32px (var(--space-8))
┌────────────────────────────────────────────────────┐
│  CONTINUE LEARNING CARD                            │  max-width: 1000px
│  padding: var(--space-8) = 32px                   │
└────────────────────────────────────────────────────┘
                    ↓ margin-bottom: 32px
┌────────────────────────────────────────────────────┐
│  JOURNAL PROMPTS (3 columns)                       │
│  gap: var(--space-3) = 12px                       │
└────────────────────────────────────────────────────┘
                    ↓ margin-bottom: 32px
┌────────────────────────────────────────────────────┐
│  ACTIVITY FEED (stack)                             │
│  gap: var(--space-3) = 12px                       │
└────────────────────────────────────────────────────┘
```

## Component Sizes Chart

### Icons
```
Stat Pill Icon:        16×16px  stroke: 2
Activity Icon:         32×32px  stroke: 1.5
Action Card Icon:      40×40px  stroke: 2
Journal Prompt Icon:   48×48px  stroke: 1.5
```

### Icon Circles
```
Action Card:
┌──────────────┐
│              │
│   ┌────┐    │  Circle: 72×72px
│   │ 40 │    │  Icon: 40×40px
│   └────┘    │  Background: rgba(iconColor, 0.12)
│              │
└──────────────┘
```

### Card Padding
```
Action Card:      padding: 20px (var(--space-5))
Journal Prompt:   padding: 20px (var(--space-5))
Activity Card:    padding: 16px (var(--space-4))  ← compact
Hero Card:        padding: 32px (var(--space-8))  ← large
```

## Border Radius Scale

```
sm:    6px   ┌──────┐
md:    8px   ┌───────┐
lg:   10px   ┌────────┐
xl:   16px   ┌─────────┐
2xl:  24px   ┌───────────┐  ← Action Card, Journal Prompt
3xl:  32px   ┌─────────────┐  ← Continue Learning
full: 9999px ─────────────  ← Stat Pills (pill shape)
```

## Color Opacity Guide

### Stat Pills Background
```
Blue:    rgba(85, 161, 180, 0.15)  ← 15% opacity background
Orange:  rgba(237, 132, 58, 0.15)
Yellow:  rgba(248, 176, 68, 0.15)
```

### Stat Pills Border
```
Blue:    rgba(85, 161, 180, 0.25)  ← 25% opacity border
Orange:  rgba(237, 132, 58, 0.25)
Yellow:  rgba(248, 176, 68, 0.25)
```

### Glass Card Border
```
Default: rgba(255, 255, 255, 0.8)  ← 80% opacity
Hover:   rgba(255, 255, 255, 1)    ← 100% opacity (solid)
```

## Transition Timings

```
Quick:    150ms  (fade, simple opacity)
Base:     200ms  (most hover states, scale)
Slow:     300ms  (lift, complex transforms)
Slower:   500ms  (page transitions)

Easing:   cubic-bezier(0, 0, 0.2, 1)  ← ease-out
```

## Z-Index Layers

```
Layer 5: Tooltip           z-index: 1070
Layer 4: Popover           z-index: 1060
Layer 3: Modal             z-index: 1050
Layer 2: Modal Backdrop    z-index: 1040
Layer 1: Sidebar           z-index: 1020
Layer 0: Base              z-index: 0

Dashboard Elements:
- Background blobs:        z-index: 0
- Card content:            z-index: 1 (relative)
- Card glow (absolute):    z-index: 0
- FAB Button:              z-index: 1000
```

## Shadow Depths

```
Small:    0 4px 16px 0 rgba(0,0,0,0.06)       ← Default card
Medium:   0 8px 24px 0 rgba(0,0,0,0.08)       ← Hover card
Large:    0 20px 60px 0 rgba(0,0,0,0.08)      ← Lifted card hover
Colored:  0 8px 24px 0 rgba(85,161,180,0.12)  ← Colored glow
```

---

**Usage**: Use this as a quick reference when implementing components in WordPress.  
**Tip**: Keep this document open while coding for instant visual reference.
