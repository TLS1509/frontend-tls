# 📏 Pixel Measurements - Visual Guide

## Quick Actions Grid Layout

```
┌─────────────────────────────────────────────────────────────────────────┐
│                         Container: max-width 800px                      │
│                              margin: 0 auto                             │
│                                                                         │
│  ┌──────────┐  12px  ┌──────────┐  12px  ┌──────────┐  12px  ┌──────────┐
│  │          │   gap  │          │   gap  │          │   gap  │          │
│  │  Card 1  │ ←───→  │  Card 2  │ ←───→  │  Card 3  │ ←───→  │  Card 4  │
│  │  180px   │        │  180px   │        │  180px   │        │  180px   │
│  │  width   │        │  width   │        │  width   │        │  width   │
│  │          │        │          │        │          │        │          │
│  │ 160px    │        │ 160px    │        │ 160px    │        │ 160px    │
│  │ min-h    │        │ min-h    │        │ min-h    │        │ min-h    │
│  └──────────┘        └──────────┘        └──────────┘        └──────────┘
│                                                                         │
│  Total width calculation:                                              │
│  (180px × 4) + (12px × 3) = 720px + 36px = 756px < 800px ✓           │
└─────────────────────────────────────────────────────────────────────────┘
```

---

## Action Card - Detailed Measurements

```
┌─────────────────────────────┐
│  ← 20px padding →           │  Border-radius: 24px
│  ↑                          │  Border: 1px solid rgba(255,255,255,0.8)
│  20px                       │  Min-height: 160px
│  padding                    │
│  ↓                          │
│      ┌─────────────┐        │
│      │             │        │  Icon Circle:
│      │   ┌─────┐   │        │  - Width: 72px
│      │   │     │   │        │  - Height: 72px
│      │   │ 40px│   │        │  - Border-radius: 50% (circle)
│      │   │ icon│   │        │  - Background: rgba(iconColor, 0.12)
│      │   └─────┘   │        │
│      │    72px     │        │  Icon:
│      │   circle    │        │  - Width: 40px
│      └─────────────┘        │  - Height: 40px
│            ↕                │  - Stroke-width: 2
│          12px gap           │
│            ↕                │
│     Coaching 1-to-1         │  Title:
│    ← 16px font-size         │  - Font: var(--font-display)
│       Font-weight: 700      │  - Size: 16px
│            ↕                │  - Weight: 700
│          12px gap           │  - Line-height: 1.25
│            ↕                │
│   Réserver une session      │  Description:
│    ← 12px font-size         │  - Font: var(--font-body)
│       muted-foreground      │  - Size: 12px
│                             │  - Color: muted-foreground
│  ↑                          │
│  20px                       │
│  padding                    │
│  ↓                          │
└─────────────────────────────┘
        ← ~180px →
```

---

## Continue Learning Card - Layout

```
┌───────────────────────────────────────────────────────────────────┐
│  ← 32px padding →                                                 │
│  ↑                                                                │
│  32px                                                             │  Border-radius: 32px
│  padding                                                          │  Border: 1px solid rgba(255,255,255,0.8)
│  ↓                                                                │  Animation: breathe 4s infinite
│                                                                   │
│  Maîtriser l'IA pour la Formation  ← 24px font-size, Orange     │
│  ← var(--text-2xl), var(--font-display)                         │
│                   ↕ 8px gap                                      │
│  Étape 2: Applications pratiques  ← 16px font-size, muted       │
│  ← var(--text-base), var(--font-body)                          │
│                                                                   │
│                                            ┌──────────────────┐  │
│                                            │  Continuer →     │  │
│  [Button positioned top-right]            │  16px font       │  │
│                                            │  12px↕ 24px→←    │  │
│                                            └──────────────────┘  │
│                                                                   │
│                   ↕ 24px gap (margin-top)                       │
│                                                                   │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │████████████████████████░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░│   │  Progress Bar:
│  └─────────────────────────────────────────────────────────┘   │  - Height: 8px
│  ← Progress: 68% width, Gradient animated →                    │  - Border-radius: full
│                   ↕ 8px gap                                      │  - Background gradient
│  68% complété  ← 14px font-size, muted                         │  - Animation: 3s
│                                                                   │
│  ↑                                                                │
│  32px                                                             │
│  padding                                                          │
│  ↓                                                                │
└───────────────────────────────────────────────────────────────────┘
                    ← max-width: 1000px →
```

---

## Journal Prompt Card - Measurements

```
┌───────────────────────────────┐
│  ← 20px padding →             │  Border-radius: 24px
│  ↑                            │  Border: 1px solid rgba(255,255,255,0.8)
│  20px                         │
│  padding                      │
│  ↓                            │
│    ┌──────────────────┐      │
│    │  Apprentissage   │      │  Badge:
│    │   12px font      │      │  - Padding: 10px 20px (vertical, horizontal)
│    │  10px↕ 20px→←    │      │  - Border-radius: full
│    └──────────────────┘      │  - Font: 12px, weight 600
│            ↕                  │  - Border: 1px solid rgba(color, 0.25)
│          16px gap             │  - Background: rgba(color, 0.15→0.08)
│            ↕                  │
│        ┌─────┐                │  Icon:
│        │     │                │  - Width: 48px
│        │48px │                │  - Height: 48px
│        │icon │                │  - Stroke-width: 1.5
│        └─────┘                │
│            ↕                  │
│          16px gap             │
│            ↕                  │
│  Quelle a été ma plus         │  Question:
│  grande découverte            │  - Font: var(--font-body)
│  aujourd'hui ?                │  - Size: 16px (var(--text-base))
│  ← 16px font-size             │  - Weight: 500 (medium)
│     Line-height: 1.5          │  - Line-height: 1.5
│                               │  - Text-align: center
│  ↑                            │
│  20px                         │
│  padding                      │
│  ↓                            │
└───────────────────────────────┘
        ← ~250px →
```

---

## Activity Card - Layout

```
┌───────────────────────────────────────────────────────────────┐
│  ← 16px padding (compact) →                                   │
│  ↑                                                            │
│  16px                                                         │  Border-radius: 24px
│  padding                                                      │  Border: 1px solid rgba(255,255,255,0.8)
│  ↓                                                            │
│   ┌─────┐  ← 16px gap →  ┌────────────────────────────┐    │
│   │     │                 │ Apprentissage | Il y a 2h  │    │  Meta row:
│   │ 32px│                 │ ← 12px font    12px font → │    │  - Badge + Timestamp
│   │ icon│                 │                            │    │  - Gap: 8px
│   │     │                 │         ↕ 4px gap         │    │  - Margin-bottom: 4px
│   └─────┘                 │                            │    │
│   ↑                       │ Leçon terminée             │    │  Title:
│   32×32px                 │ ← 18px font, weight 600    │    │  - Size: 18px (var(--text-lg))
│   stroke: 1.5             │                            │    │  - Weight: 600
│   Flex: shrink 0          │         ↕ 4px gap         │    │  - Line-height: 1.25
│                           │                            │    │
│                           │ Parcours: IA Formation     │    │  Meta text:
│                           │ ← 12px font, muted         │    │  - Size: 12px
│                           │                            │    │  - Color: muted-foreground
│                           │         ↕ 8px gap         │    │
│                           │                            │    │
│                           │ Vous avez terminé la       │    │  Description:
│                           │ leçon 'Introduction au     │    │  - Size: 16px (var(--text-base))
│                           │ Machine Learning'          │    │  - Line-height: 1.5
│                           │ ← 16px font                │    │  - Margin-top: 8px
│                           └────────────────────────────┘    │
│  ↑                                                            │
│  16px                                                         │
│  padding                                                      │
│  ↓                                                            │
└───────────────────────────────────────────────────────────────┘
```

---

## Stat Pill - Measurements

```
┌──────────────────────────┐
│  ← 12px padding →        │  Border-radius: 9999px (full pill)
│  ↑                       │  Border: 1px solid rgba(color, 0.25)
│  8px                     │  Background: rgba(color, 0.15→0.08)
│  padding                 │
│  ↓                       │
│   🔥  ← 8px gap →  7     │  Content:
│   ↑                 ↑    │  - Icon/Emoji: 16px
│  16px             14px   │  - Value: 14px (var(--text-sm))
│  emoji            font   │  - Weight: 700 (bold)
│                   bold   │  - Font: var(--font-display)
│                          │
│   ← 8px gap →  jours     │  Label:
│                   ↑      │  - Size: 14px (var(--text-sm))
│                  14px    │  - Weight: 400 (normal)
│                  font    │  - Font: var(--font-body)
│                          │
│  ↑                       │
│  8px                     │
│  padding                 │
│  ↓                       │
└──────────────────────────┘
     ← ~120px →
```

---

## Spacing Between Sections

```
┌───────────────────────────────────┐
│  HERO SECTION                     │  Padding: 32px 24px
│  max-width: 1000px                │  (var(--space-8) var(--space-6))
└───────────────────────────────────┘
              ↓ 0px (no margin)
┌───────────────────────────────────┐
│  QUICK ACTIONS                    │  Padding: 0 24px
│  max-width: 800px (grid itself)   │  (0 var(--space-6))
└───────────────────────────────────┘
              ↓ 32px margin-bottom (var(--space-8))
┌───────────────────────────────────┐
│  CONTINUE LEARNING                │  Padding: 0 24px
│  max-width: 1000px                │  (0 var(--space-6))
└───────────────────────────────────┘
              ↓ 32px margin-bottom
┌───────────────────────────────────┐
│  JOURNAL PROMPTS                  │  Padding: 0 24px
│  max-width: 1000px                │
└───────────────────────────────────┘
              ↓ 32px margin-bottom
┌───────────────────────────────────┐
│  ACTIVITY FEED                    │  Padding: 0 24px
│  max-width: 1000px                │
└───────────────────────────────────┘
              ↓ 48px padding-bottom (var(--space-12))
```

---

## Border Radius Scale Visual

```
sm (6px):     ┌────┐
              │    │
              └────┘

md (8px):     ┌─────┐
              │     │
              └─────┘

lg (10px):    ┌──────┐
              │      │
              └──────┘

xl (16px):    ┌────────┐
              │        │
              └────────┘

2xl (24px):   ┌──────────┐  ← Action Card
              │          │  ← Journal Prompt
              └──────────┘  ← Activity Card

3xl (32px):   ┌────────────┐  ← Continue Learning
              │            │  ← Hero Card
              └────────────┘

full:         ─────────────  ← Stat Pills (pill shape)
```

---

## Icon Sizes Chart

```
16×16px (w-4 h-4)     [■]        Hero stat pills
                                 Timestamp icons

20×20px (w-5 h-5)     [■■]       Button icons
                                 Small action icons

24×24px (w-6 h-6)     [■■■]      Default icon size
                                 Navigation icons

32×32px (w-8 h-8)     [■■■■]     Activity card icons
                                 Medium emphasis

40×40px (w-10 h-10)   [■■■■■]    Action card icons
                                 High emphasis

48×48px (w-12 h-12)   [■■■■■■]   Journal prompt icons
                                 Hero icons

56×56px (w-14 h-14)   [■■■■■■■]  Extra large icons
                                 Special features
```

---

## Shadow Depths Visual

```
Default card:
┌──────────────┐
│              │  shadow: 0 4px 16px rgba(0,0,0,0.06)
│   Content    │  + inset: 0 1px 0 rgba(255,255,255,0.8)
│              │
└──────────────┘
   ↓ 4px blur

Hover card:
┌──────────────┐
│              │  shadow: 0 8px 24px rgba(0,0,0,0.08)
│   Content    │
│              │
└──────────────┘
   ↓ 8px blur

Lifted card (hover):
┌──────────────┐
│              │  shadow: 0 20px 60px rgba(0,0,0,0.08)
│   Content    │  + 0 12px 32px rgba(0,0,0,0.04)
│              │  + inset: 0 1px 0 rgba(255,255,255,1)
└──────────────┘
   ↓ 20px blur

Colored glow (hover):
┌──────────────┐
│              │  shadow: 0 8px 24px rgba(85,161,180,0.12)
│   Content    │  (blue glow)
│              │
└──────────────┘
   ↓ 8px blur
```

---

## Responsive Breakpoints

```
Desktop (default):
┌─────────────────────────────────────────────┐
│  max-width: 1000px                          │
│  padding: 0 24px                            │
│  grid: 4 columns (quick actions)            │
│  grid: 3 columns (journal prompts)          │
└─────────────────────────────────────────────┘
                    ↓
            @media (max-width: 1024px)
                    ↓
Tablet:
┌──────────────────────────────────┐
│  max-width: 100%                 │
│  padding: 0 24px                 │
│  grid: 2 columns (quick actions) │
│  grid: 2 columns (journal)       │
└──────────────────────────────────┘
                    ↓
            @media (max-width: 640px)
                    ↓
Mobile:
┌─────────────────┐
│  max-width: 100%│
│  padding: 0 16px│  ← Reduced padding
│  grid: 1 column │
│  all stacked    │
└─────────────────┘
```

---

## Opacity Values Reference

```
Glass Card Background:
- Default: rgba(255, 255, 255, 0.6) → rgba(255, 255, 255, 0.4)
           ↑ 60% opacity          ↑ 40% opacity
           gradient start         gradient end

- Hover:   rgba(255, 255, 255, 0.7) → rgba(255, 255, 255, 0.5)
           ↑ 70% opacity          ↑ 50% opacity

Glass Card Border:
- Default: rgba(255, 255, 255, 0.8)  ← 80% opacity
- Hover:   rgba(255, 255, 255, 1)    ← 100% opacity (solid)

Stat Pill Background:
- Gradient: rgba(color, 0.15) → rgba(color, 0.08)
            ↑ 15% opacity      ↑ 8% opacity

Stat Pill Border:
- Border: rgba(color, 0.25)  ← 25% opacity

Glow Effects:
- Default: rgba(237, 132, 58, 0.06)  ← 6% opacity
- Peak:    rgba(237, 132, 58, 0.12)  ← 12% opacity (animation)
```

---

**Pro Tip**: Print this guide and keep it next to your screen while coding for instant reference to exact pixel values.
