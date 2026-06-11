# DESIGN.md - Duolingo Design System

## Visual Identity & Philosophy

Duolingo's design philosophy centers on accessibility, engagement through gamification, and a playful, energetic brand personality. Every design decision serves to lower barriers to learning, maximize user retention through behavioral psychology, and create moments of delight.

**Core Principles:**
- **Playful simplicity**: Intuitive interfaces without cognitive load
- **Geometric consistency**: Illustrations built from fractional components of four basic shapes
- **Behavioral design**: Every color, animation, and notification backed by psychological principles
- **Performance first**: Animations remain smooth across low-end mobile devices
- **Accessibility mandate**: Enhanced color contrast, touch target optimization, WCAG Level AA compliance

---

## Color Palette

### Primary Colors
| Color | Usage | Hex |
|-------|-------|-----|
| Duolingo Green | Primary CTAs, success feedback, correct answers | #58CC02 |
| Duolingo Blue | Secondary interactions, neutral information, progress | #1CB0F6 |

### Semantic Colors
| Color | Usage | Hex |
|-------|-------|-----|
| Success/Correct | Checkmarks, positive feedback, achievements | #58CC02 |
| Error/Mistakes | Wrong answers, hearts/health loss, urgency | #FF4B4B |
| Streak/Motivation | Daily streak flame, motivation signals | #FF9600 |
| XP/Celebration | Experience points, rewards, achievements | #FFC800 |
| Premium/Leagues | League tiers, premium features, rankings | #CE82FF |
| Neutral Progress | Background bars, inactive states | #E5E5E5 |
| Dark Text | Primary hierarchy, body copy | #141414 |
| Light Neutral | Disabled states, soft backgrounds | #F5F5F5 |

### Dark Mode
```
Background primary:   #0A0E27
Background cards:     #1A1A1A
Surface:              #252525
Text primary:         #FFFFFF
Text secondary:       #B3B3B3
Borders:              #2A2A2A
```

---

## Typography

| Role | Font | Size | Weight |
|------|------|------|--------|
| Display/Brand | Feather Bold (proprietary) | 48px+ | 700 |
| UI/Body | DIN Next Rounded | all sizes | 400–700 |
| Fallback | Nunito / Varela Round | all sizes | 400–700 |

### Scale
- Hero: 48px, Feather Bold
- H1: 24px, DIN Next Bold
- H2: 20px, DIN Next Bold
- Body Large: 17px, DIN Next Regular (lesson text)
- Body: 15px, DIN Next Regular
- Button: 17px, DIN Next Bold, UPPERCASE
- Caption: 13px, DIN Next Medium
- Badge: 12px, DIN Next Bold, UPPERCASE

**Line heights:** Display 1.1x · Headings 1.2x · Body 1.5x

---

## Spacing & Layout

- **Base unit:** 8px
- **Mobile padding:** 16px horizontal
- **Section spacing:** 24px
- **Component gaps:** 12px
- **Touch target minimum:** 48px

**Breakpoints:**
- Mobile: 375–520px
- Tablet: 521–768px
- Desktop: 769px+

---

## Component Patterns

### Primary CTA Button
```
Font: DIN Next Rounded Bold, 17px, UPPERCASE
Padding: 14px 24px
Background: #58CC02
Color: #FFFFFF
Border: 4px solid #58A700
Border-radius: 16px
Box-shadow: 0 4px 0 #58A700 (3D raised effect)

Active/Pressed:
  transform: translateY(4px)
  box-shadow: none
  transition: 100ms ease-out

Disabled:
  opacity: 0.5
```

### Card
```
Background: #FFFFFF / #1A1A1A (dark)
Border-radius: 12px
Padding: 16px
Box-shadow: 0 2px 8px rgba(0,0,0,0.08)
Border: 1px solid #F0F0F0 / #2A2A2A
Hover: translateY(-2px), shadow deepens
```

### Progress Bar
```
Height: 16px
Border-radius: 8px
Background: #E5E5E5
Fill: #58CC02
Transition: width 300ms ease-out
```

### Achievement Badge
```
Background: #FFC800 (XP) / #FF9600 (streak) / #CE82FF (league)
Padding: 4px 8px
Border-radius: 4px
Font: DIN Next Bold, 12px, UPPERCASE
Color: #FFFFFF
```

---

## Gamification UI Patterns

### Streak Counter
- Icon: animated flame 🔥, color #FF9600
- Text: "{X} day streak", DIN Next Bold 17px
- Pulse animation: escalates urgency through the day (500–1000ms cycle)

### XP Display
- "+{X} XP" floating notification, #FFC800
- Float upward + fade-out, 500ms cubic-bezier(0.25, 0.46, 0.45, 0.94)

### Leaderboard Tiers
Bronze #CD7F32 · Silver #C0C0C0 · Gold #FFD700 · Sapphire #0F52BA · Emerald #50C878 · Diamond #B9F2FF · Legendary #FFD700 + glow

### Celebration / Confetti
```
Particles: 30–50, shapes: circles/stars/squares
Colors: #58CC02, #FFC800, #1CB0F6, #FF9600, #CE82FF
Duration: 1–2s, gravity-enabled, fade-out
```

---

## Motion & Animation

### Timings
- Micro-interactions (button press, focus): 100ms
- Card/element entrance: 200ms
- Page/modal transitions: 300ms
- Celebration animations: 800ms–2000ms

### Easing
```
Entrance bounce: cubic-bezier(0.34, 1.56, 0.64, 1)
Standard:        cubic-bezier(0.4, 0.0, 0.2, 1.0)
Quick feedback:  cubic-bezier(0.25, 0.46, 0.45, 0.94)
```

### Key Patterns
- Button press: translateY(4px) + shadow disappears, 100ms
- Progress fill: width transition 300ms ease-out
- Notification toast: slide-up + bounce-in 200ms
- Page enter: fade + translateY(24px) → 0, staggered children 30–50ms offset

---

## Anti-Patterns

1. ❌ Flat muted colors — use saturated, bright palette
2. ❌ Serif fonts — rounded geometric sans only
3. ❌ Small fonts <15px on mobile
4. ❌ Complex gradients — solid colors preferred
5. ❌ Hover-only states — everything must work on touch
6. ❌ Animations >500ms on interactions — feels slow
7. ❌ Color-only status indication — always pair with icon + text
8. ❌ Contrast below WCAG AA (4.5:1)
9. ❌ Unattainable rewards or impossible badges
10. ❌ Harsh error language ("Wrong!", "Failed!") — use gentle feedback
11. ❌ GPU-heavy animations — transform/opacity only for 60fps
12. ❌ Auto-playing audio on page load
