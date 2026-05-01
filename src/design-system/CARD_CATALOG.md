# Card Design Catalog — The Learning Society Design System

## Overview
Complete reference of all card and component types used throughout the Learning App, with layouts, visual properties, content patterns, and interactions.

---

## Core Card Categories

### 1. Action Cards
**Icon Feature Card** (Dashboard Quick Actions)
- Grid: Icon (72px) + Title + Description
- Gradient backgrounds (primary/warm/sun)
- Hover: lift (-4px) + shadow-md
- Navigation triggers

**Prompt Card** (Dashboard Reflection Prompts)
- Flex column: Badge + Icon (34px) + Question text
- Glass effect: backdrop-filter blur(24px)
- Border: 1px solid rgba(255,255,255,0.9)
- Keyboard navigable (role="button")

---

### 2. Progress & Learning Cards
**Step Card** (Learning Path Detail)
- Expandable container: header + progress bar + collapsible lessons
- Locked state styling when prerequisite incomplete
- Lesson count + duration metadata
- Toggle chevron indicator

**Lesson Item** (Nested within Step)
- Row: Icon + Title/Duration + Status checkbox
- Play icon (incomplete) → CheckCircle2 (complete)
- Disabled when step locked

**Progress Card** (Continue Learning)
- Header with title + CTA button
- ProgressBar component with percentage label
- Glass background: rgba(255,255,255,0.85) + blur(24px)
- Hover: lift (-2px) + shadow-md

**Complementary Resource Card** (Learning Path)
- Grid item: Icon container + Type label + Title + Description + Duration + CTA
- 3-column responsive grid
- Tone-based coloring (primary/warm/sun)

**Final Project Card** (Learning Path)
- Centered: Large icon (Target 32px) + Title + Description + CTA
- Lock icon overlay when prerequisites incomplete
- Disabled state styling

---

### 3. Ranking & Achievement Cards
**Leaderboard Entry Card**
- Flex column: Rank + Name (h3) + Points badge + Streak pill + Button
- Border: 1px solid rgba(255,255,255,0.8)
- Background: rgba(255,255,255,0.85)
- Section card styling (tls-section-card)

**KPI Card** (Statistics Display)
- Flex column: Label span + Strong value (h3)
- Border: 1px solid var(--border)
- Background: var(--surface-muted)
- Hover: lift (-1px) + shadow-sm

**Weekly Objective Card** (Leaderboard)
- Icon + Title (h3) + Description + CTA button
- Sparkles icon (unlocked achievement indicator)
- Same card styling as leaderboard entries

---

### 4. Content Feed Cards
**Veille Card** (Editorial Content)
- Header: Type icon (40px) + Label + Date + Save button
- Body: Category label + Title (h3) + Summary text
- Footer: Author + Read time + "Lire" CTA
- Glass: backdrop-filter blur(20px), rgba(255,255,255,0.85)
- Hover: lift (-3px) + shadow-md + tone-specific border highlight
- Bookmark toggle: Bookmark ↔ BookmarkCheck

**Magazine Edition Card**
- Vertical: Cover placeholder + Title (h3) + Description + CTA button
- Background: rgba(255,255,255,0.85)
- Border: 1px solid rgba(255,255,255,0.8)

---

### 5. Activity & Timeline Cards
**Activity Item Card** (Dashboard Activity Feed)
- Horizontal: Icon left + Title + Description + Timestamp
- Icon colors vary by type: CheckCircle2 (lesson) | Award (badge) | Flame (streak)
- Read-only display

**Activity/Badge Tab Card** (Profile)
- Row: Content stack (title + timestamp) + Badge indicator
- Interactive variant with hover lift (-1px)
- Glass background with blur effect

---

### 6. Profile & User Cards
**Profile Summary Card**
- Stack: Name (h2) + Level badge (sun) + Info chips + Bio text
- Glass gradient: linear-gradient(135deg, rgba(255,255,255,0.84), rgba(255,255,255,0.66))
- Backdrop-filter blur(18px)
- Info chips: email, location, join date (with icons)

**Skill Progress Card** (Profile Skills)
- Header: Skill name (h3) + Percentage value (strong)
- Progress track bar with filled percentage
- Interactive variant (hover lift)

**Information Card** (Profile Overview)
- Title (h3) + Edit button (ghost) + Chip sections
- Multiple chip types for different information categories
- Information display only (read-only)

---

### 7. Utility Cards
**Call-out/Notification Card**
- Class: `tls-callout`
- Stack: Bold title + Micro description text
- Used for important information highlights

---

## Universal Visual Properties

### Shadows
- Default: `shadow-xs`
- Hover: `shadow-sm` to `shadow-md`
- Large heroes: `shadow-xs` to `shadow-sm`

### Borders
- Standard: `1px solid rgba(15, 23, 42, 0.06)`
- Glass cards: `1px solid rgba(255, 255, 255, 0.8)`
- Hover (Veille only): Tone-specific color
  - Primary: `primary-300`
  - Warm: `orange-300`
  - Sun: `yellow-300`

### Backgrounds
- Solid base: `rgba(255, 255, 255, 0.85)`
- Gradient: `linear-gradient(135deg, rgba(255, 255, 255, 0.8x), rgba(255, 255, 255, 0.6x))`
- Glass: `backdrop-filter blur(16-24px)` + `-webkit-backdrop-filter`

### Border Radius
- Cards: `r-2xl` (24px) — default
- Sections: `r-xl` (16px)
- Components: `r-lg` (12px)
- Pills: `r-pill` (999px)

### Hover Interactions
- **Transform**: `translateY(-1px)` to `translateY(-4px)`
- **Shadow Elevation**: xs → sm, sm → md
- **Border Color**: Standard → tone-specific (Veille cards only)
- **Icon/Text**: Minor color shifts on interactive cards

### Spacing
- Padding: `s-4` (16px) to `s-8` (32px)
- Gaps (internal): `s-2` (8px) to `s-6` (24px)
- Grid gaps: `s-3` (12px) to `s-4` (16px)
- Section margins: `s-4` to `s-6`

### Typography Hierarchy
| Level | Usage | Size | Weight |
|-------|-------|------|--------|
| Heading | Card titles | h2/h3 | 600 |
| Meta | Type labels, dates | caption/micro | 700 |
| Body | Descriptions, summaries | body-sm/body | 400-500 |
| Label | Category badges | uppercase micro | 700 |

### Color Tones (Applied Consistently)
| Tone | Color | Hex | Usage |
|------|-------|-----|-------|
| Primary (Brand) | Teal | #55A1B4 | Default cards, primary CTAs |
| Warm (Orange) | Orange | #ED843A | Secondary learning paths, warm interactions |
| Sun (Yellow) | Yellow | #F8B044 | Tertiary, achievement indicators |

Applied to:
- Badge variants
- Progress bar fills
- Icon backgrounds
- Border highlights (on hover)
- Gradient overlays

---

## Grid Layouts

### Card Grid Patterns
1. **2-Column**: Course cards, magazine editions
2. **3-Column**: Complementary resources, quick action items
3. **4-Column**: Avatar groups, activity feed (on desktop)
4. **Responsive**: 1 column (mobile) → 2 (tablet) → 3-4 (desktop)

### Gap Standards
- Desktop: `gap: s-3` to `gap: s-4` (12-16px)
- Tablet: `gap: s-3` (12px)
- Mobile: `gap: s-3` (12px)

---

## Interactive States

### Card Variants
- **Default**: Base styling with minimal shadow
- **Interactive**: Hover lift + shadow elevation
- **Glass**: Backdrop blur + semi-transparent background
- **Section** (`.tls-section-card`): Used in grouped contexts

### Hover States
```
Standard: 
  transform: translateY(-2px)
  box-shadow: shadow-md

Veille-specific additions:
  border-color: tone-specific highlight
  box-shadow: shadow-md + additional elevation
```

### Disabled States
- Locked learning cards: greyed out appearance
- Opacity: 0.6
- Cursor: not-allowed
- No hover effects

### Focus States
- Focus-visible outline: `2px solid primary-500`
- Outline-offset: `2px`
- Applied to: buttons, interactive cards, form inputs

---

## Common Patterns

### Icon Sizing
- Feature cards: 72px (IconFeatureCard)
- Content headers: 40px (Veille)
- Section icons: 32px (Project, call-outs)
- Inline icons: 14-18px (activity feed, badges)
- Prompts: 34px (reflection questions)

### Button Styling
- Primary: Full-width gradient or solid background
- Secondary: Ghost or outlined variant
- Icon usage: Arrow right, bookmark toggle, play icons
- Size: `s-4` padding (16px) with `r-md` radius

### Badge Positioning
- Corner badges: Top-right or absolute positioning
- Inline badges: Left-aligned with content
- Status indicators: Right-aligned or bottom-right corner

---

## Performance & Accessibility

### CSS Classes Used
- `.tls-section-card`: Standard section card styling
- `.tls-callout`: Call-out information styling
- `.tls-kpi-card`: KPI/metric card styling
- `.tls-glass`: Glass morphism effect
- `.tls-interactive`: Interactive hover states

### Accessibility Features
- Semantic HTML: `role="button"`, `aria-label`, `aria-expanded`
- Keyboard navigation: All cards/buttons keyboard accessible
- Focus indicators: Visible 2px outline on focus-visible
- Contrast: WCAG AA compliant text colors
- Icons: Always accompanied by text or aria-label

---

## Implementation Checklist

When designing a new card type:
- [ ] Define grid layout (1-4 columns with gaps)
- [ ] Choose background (solid, gradient, or glass)
- [ ] Set border (1px standard or tone-specific)
- [ ] Define shadow (xs, sm, or md)
- [ ] Plan hover state (lift + shadow elevation)
- [ ] Icon sizing (choose from standard sizes above)
- [ ] Typography hierarchy (h2/h3 for title)
- [ ] Spacing (padding s-4 to s-8, gaps s-2 to s-6)
- [ ] Interactive elements (buttons, toggles)
- [ ] Accessibility (role, aria-labels, keyboard support)
- [ ] Responsive behavior (mobile → tablet → desktop)

---

## Next Phase: Card Pattern System

Once this catalog is finalized, the next phase will:
1. Create reusable card pattern components (CardHeader, CardBody, CardFooter)
2. Build component library combining cards with other elements
3. Establish variant system (interactive, glass, featured, etc.)
4. Document motion/animation standards
5. Create card grid system for layouts
