# Learning App Component Patterns & Best Practices

## Overview

This document outlines the core reusable patterns and components used throughout the TLS Learning App. These patterns ensure consistency, maintainability, and code reusability across all pages.

---

## Pattern 1: MetaPill — Icon + Text Labels

**File:** `/src/components/ui/MetaPill.tsx`

**Purpose:** Display small metadata items with icons and text. Used for stats, tags, category labels, and status indicators.

### Basic Usage

```tsx
import { MetaPill } from '../components';
import { Users, Clock } from 'lucide-react';

<MetaPill 
  icon={<Users size={14} />} 
  text="25 Students"
  tone="primary"
  size="md"
/>
```

### Props

```tsx
interface MetaPillProps {
  text: string;                           // Display text
  icon?: React.ReactNode;                // Icon element (left of text)
  tone?: 'primary' | 'warm' | 'sun' | 'brand';  // Color tone
  size?: 'sm' | 'md' | 'lg';             // Sizing: 12px, 14px, 16px fonts
  onClick?: () => void;                   // Optional click handler
  className?: string;                     // Additional CSS classes
}
```

### Tones

- **primary** (default) — Blue background, primary brand color
- **warm** — Orange background for warmth/action
- **sun** — Yellow background for highlights/attention
- **brand** — Alias for primary (teal)

### Size Variants

- **sm**: `font-size: 12px; padding: 2px 6px;` — Compact, for small contexts
- **md**: `font-size: var(--t-caption); padding: 4px 10px;` — Standard (default)
- **lg**: `font-size: var(--t-body); padding: 6px 12px;` — Large, for featured displays

### CSS

Defined in `/src/components/ui/MetaPill.css`. All values use design tokens (`--s-*`, `--t-*`, `--r-*`, `--dur-*`).

---

## Pattern 2: MetaPillGroup — Collections of Pills

**File:** `/src/components/ui/MetaPillGroup.tsx`

**Purpose:** Display multiple MetaPill items in a group with consistent spacing and layout.

### Basic Usage

```tsx
import { MetaPillGroup } from '../components';
import { Flame, Award, TrendingUp } from 'lucide-react';

<MetaPillGroup
  items={[
    { icon: <Flame size={14} />, text: '7 jours', tone: 'sun' },
    { icon: <Award size={14} />, text: '12 badges', tone: 'warm' },
    { icon: <TrendingUp size={14} />, text: '68%', tone: 'primary' },
  ]}
  layout="horizontal"
  gap="md"
  size="md"
/>
```

### Props

```tsx
interface MetaPillGroupProps {
  items: Array<{
    icon: React.ReactNode;
    text: string;
    tone?: MetaPillTone;
  }>;
  layout?: 'horizontal' | 'vertical';  // Row or column
  gap?: 'sm' | 'md' | 'lg';            // Space between items
  size?: MetaPillSize;                  // Apply to all pills
  className?: string;
}
```

### Layout Modes

- **horizontal** (default) — Items in a row, wraps on small screens
- **vertical** — Items in a column, left-aligned

### Gap Sizes

- **sm**: `gap: var(--s-1)` — 4px, tight grouping
- **md**: `gap: var(--s-2)` — 8px, standard
- **lg**: `gap: var(--s-3)` — 12px, loose grouping

---

## Pattern 3: CardGrid — Responsive Grid Layouts

**File:** `/src/components/patterns/CardGrid.tsx`

**Purpose:** Create responsive grid layouts for card collections. Automatically adjusts column count based on screen size.

### Basic Usage

```tsx
import { CardGrid } from '../components';
import { Card } from '../components/core/Card';

<CardGrid layout="default" gapSize="md">
  {items.map((item) => (
    <Card key={item.id}>{item.content}</Card>
  ))}
</CardGrid>
```

### Props

```tsx
interface CardGridProps {
  children: React.ReactNode;
  layout?: 'compact' | 'default' | 'feature';  // Column counts
  gapSize?: 'sm' | 'md' | 'lg';                // Spacing
  autoFit?: boolean;                            // Use auto-fit instead of fixed
  className?: string;
}
```

### Layout Modes

- **compact** — 2 columns on desktop, 1 on mobile
- **default** (default) — 3 columns on desktop, 2 on tablet, 1 on mobile
- **feature** — 4 columns on desktop, 3 on tablet, 2 on mobile
- **autoFit** — Flexible width with `minmax(180px, 1fr)` — useful for cards of variable width

### Responsive Breakpoints

```css
Desktop (1280px+):  Full column count
Tablet (768px):     Column count - 1
Mobile (<768px):    1 column (or 2 for compact)
```

### Gap Sizes

- **sm**: `gap: var(--s-2)` — 8px
- **md**: `gap: var(--s-3)` — 12px (default)
- **lg**: `gap: var(--s-4)` — 16px

### Example: Dashboard Quick Actions

```tsx
<CardGrid layout="feature" gapSize="md">
  {quickActions.map((action) => (
    <Card key={action.id} onClick={() => navigate(action.path)}>
      {/* action content */}
    </Card>
  ))}
</CardGrid>
```

---

## Pattern 4: ToneAwareCard — Tone-Specific Styling

**File:** `/src/components/patterns/ToneAwareCard.tsx`

**Purpose:** Wrapper component that applies tone-specific CSS variables. Child components can use `var(--tone-*)` tokens for consistent coloring.

### Basic Usage

```tsx
import { ToneAwareCard } from '../components';
import { Card } from '../components/core/Card';

<ToneAwareCard tone="warm">
  <Card>
    {/* Child elements automatically inherit tone colors */}
  </Card>
</ToneAwareCard>
```

### Props

```tsx
interface ToneAwareCardProps {
  children: React.ReactNode;
  tone: 'primary' | 'warm' | 'sun';
  className?: string;
}
```

### Available CSS Variables

Inside a ToneAwareCard, children can use:

```css
--tone-bg:      Background color for tone-colored sections
--tone-border:  Border color (lighter shade)
--tone-text:    Text color (dark shade for contrast)
--tone-accent:  Accent color for buttons/highlights
```

### Example: Learning Path Tiles

```tsx
{parcours.map((path, index) => (
  <ToneAwareCard 
    key={path.id} 
    tone={TONES[index % TONES.length]}
  >
    <Card style={{ borderColor: 'var(--tone-border)' }}>
      <h3 style={{ color: 'var(--tone-accent)' }}>
        {path.title}
      </h3>
      <p>{path.description}</p>
    </Card>
  </ToneAwareCard>
))}
```

---

## Pattern 5: InlineProgress — Embedded Progress Bars

**File:** `/src/components/patterns/InlineProgress.tsx`

**Purpose:** Display progress within cards, steps, or inline contexts. Used for goal tracking, lesson progression, and course completion.

### Basic Usage

```tsx
import { InlineProgress } from '../components';

<InlineProgress 
  value={75} 
  tone="primary" 
  showLabel={true}
  size="md"
/>
```

### Props

```tsx
interface InlineProgressProps {
  value: number;                            // 0-100 progress
  tone?: 'primary' | 'warm' | 'sun';       // Bar color
  showLabel?: boolean;                      // Show percentage text
  size?: 'sm' | 'md';                       // Bar height
  className?: string;
}
```

### Size Variants

- **sm**: 6px height — Subtle, secondary progress displays
- **md**: 8px height — Default, visible but not dominant

### Example: Step Cards

```tsx
<Card>
  <h3>Step 2: Advanced Techniques</h3>
  <p>Learn the intermediate concepts...</p>
  <InlineProgress 
    value={65} 
    tone="warm" 
    showLabel={true}
    size="md"
  />
</Card>
```

### Accessibility

- Includes `role="progressbar"` for screen readers
- `aria-valuenow`, `aria-valuemin`, `aria-valuemax` automatically set

---

## Pattern 6: Glass Morphism Utilities

**File:** `/src/styles/tls-components.css` (glass utilities section)

**Purpose:** Apply frosted glass effects with consistent blur and fill values. Used for overlays, hero sections, modals, and decorative surfaces.

### CSS Classes

```css
.glass {
  /* Standard glass effect: 20px blur, medium opacity */
  backdrop-filter: var(--glass-blur);
  -webkit-backdrop-filter: var(--glass-blur);
  background: var(--glass-fill);
  border: 1px solid var(--glass-border);
  box-shadow: var(--glass-ring);
}

.glass-strong {
  /* Stronger glass: 20px blur, higher opacity fill */
  backdrop-filter: var(--glass-blur);
  -webkit-backdrop-filter: var(--glass-blur);
  background: var(--glass-fill-strong);
  border: 1px solid var(--glass-border);
  box-shadow: var(--glass-ring);
}

.glass-subtle {
  /* Light glass: 12px blur, lower opacity */
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  background: rgba(255, 255, 255, 0.35);
  border: 1px solid rgba(255, 255, 255, 0.4);
}

.glass-premium {
  /* Enhanced glass: 30px blur, premium appearance */
  backdrop-filter: saturate(180%) blur(30px);
  -webkit-backdrop-filter: saturate(180%) blur(30px);
  background: var(--glass-fill-premium);
  border: 1px solid rgba(255, 255, 255, 0.6);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
}
```

### Design Tokens (from `/src/styles/design-tokens.css`)

```css
--glass-blur: saturate(180%) blur(20px);
--glass-fill: rgba(255, 255, 255, 0.55);
--glass-fill-strong: rgba(255, 255, 255, 0.70);
--glass-fill-premium: rgba(255, 255, 255, 0.65);
--glass-border: rgba(255, 255, 255, 0.6);
--glass-ring: 0 0 0 1px rgba(0, 0, 0, 0.1);
```

### Example: Hero Section with Glass

```tsx
<section className="glass" style={{ padding: 'var(--s-8)' }}>
  <h1>Welcome to Learning Hub</h1>
  <p>Discover your next course</p>
</section>
```

### Browser Support

- Chrome 76+
- Firefox 68+
- Safari 9+
- Edge 79+
- Graceful degradation: solid fallback color on unsupported browsers

---

## Best Practices

### 1. Always Use Design Tokens

❌ **Don't:**
```tsx
<div style={{ padding: '16px', gap: '8px', borderRadius: '8px' }}>
```

✅ **Do:**
```tsx
<div style={{ padding: 'var(--s-4)', gap: 'var(--s-2)', borderRadius: 'var(--r-lg)' }}>
```

### 2. Prefer Components Over Inline Styles

❌ **Don't:**
```tsx
<div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px' }}>
  {items.map(...)}
</div>
```

✅ **Do:**
```tsx
<CardGrid layout="default">
  {items.map(...)}
</CardGrid>
```

### 3. Use MetaPillGroup for Collections

❌ **Don't:**
```tsx
{items.map((item) => (
  <MetaPill key={item.id} {...item} />
))}
```

✅ **Do:**
```tsx
<MetaPillGroup items={items} layout="horizontal" />
```

### 4. Apply Tone Consistently

❌ **Don't:**
```tsx
<div style={{ 
  background: index === 0 ? 'orange' : 'blue',
  borderColor: index === 0 ? 'darkorange' : 'darkblue'
}}>
```

✅ **Do:**
```tsx
<ToneAwareCard tone={TONES[index % TONES.length]}>
  <Card style={{ borderColor: 'var(--tone-border)' }}>
```

### 5. Responsive-First Design

- Always use CardGrid for layouts, never hardcode media queries
- Test at: 375px (mobile), 768px (tablet), 1280px (desktop)
- Use `autoFit` for flexible card widths

---

## Performance Considerations

### CardGrid Auto-Fit

Using `autoFit={true}` on CardGrid with many items can cause layout reflows on resize. Consider:

```tsx
// Good for small collections (<20 items)
<CardGrid layout="default" autoFit={true}>

// Better for large collections (>20 items)
<CardGrid layout="default" autoFit={false}>
```

### Glass Morphism

Glass effects are GPU-accelerated but can impact performance on lower-end devices. Consider reducing blur on mobile:

```css
@media (max-width: 768px) {
  .glass {
    backdrop-filter: blur(10px);
    -webkit-backdrop-filter: blur(10px);
  }
}
```

---

## Common Patterns

### Learning Path Card Grid

```tsx
<CardGrid layout="default" gapSize="md">
  {parcours.map((path, index) => (
    <ToneAwareCard key={path.id} tone={TONES[index % TONES.length]}>
      <ParcoursCard
        id={path.id}
        title={path.title}
        description={path.description}
        progress={path.progress}
        status={path.status}
        tone={TONES[index % TONES.length]}
      />
    </ToneAwareCard>
  ))}
</CardGrid>
```

### Stats Dashboard

```tsx
<section style={{ background: 'linear-gradient(135deg, var(--tls-primary-500), var(--tls-orange-500))', color: 'white', padding: 'var(--s-8)' }}>
  <h1>Welcome {user.name}</h1>
  <MetaPillGroup
    items={[
      { icon: <Flame size={14} />, text: '7 jours', tone: 'sun' },
      { icon: <Award size={14} />, text: '12 badges', tone: 'warm' },
      { icon: <TrendingUp size={14} />, text: '68%', tone: 'primary' },
    ]}
  />
</section>
```

### Step Accordion

```tsx
{steps.map((step, idx) => (
  <Card key={step.id} variant="interactive">
    <div style={{ display: 'flex', gap: 'var(--s-4)' }}>
      <div style={{ width: 64, height: 64, borderRadius: 'var(--r-xl)', background: TONE_COLOR[tone], display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <span style={{ fontWeight: 700, color: 'white', fontSize: 'var(--t-h2)' }}>{idx + 1}</span>
      </div>
      <div style={{ flex: 1 }}>
        <h3>{step.title}</h3>
        <MetaPillGroup
          items={[
            { icon: <BookOpen size={12} />, text: `${step.lessons} leçons` },
            { icon: <Clock size={12} />, text: step.duration },
          ]}
          size="sm"
        />
        {step.progress > 0 && (
          <InlineProgress value={step.progress} tone={tone} showLabel={true} size="md" />
        )}
      </div>
    </div>
  </Card>
))}
```

---

## Migration Guide

If refactoring existing pages to use these patterns:

### Step 1: Grid Layouts
Replace all custom grid CSS with `CardGrid`:
```tsx
// Before
<div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px' }}>
  
// After
<CardGrid layout="default">
```

### Step 2: Metadata Display
Replace inline icon+text with `MetaPillGroup`:
```tsx
// Before
{items.map((item) => (
  <span>{icon} {item.text}</span>
))}

// After
<MetaPillGroup items={items} />
```

### Step 3: Tone Styling
Wrap tone-colored cards with `ToneAwareCard`:
```tsx
// Before
<Card style={{ background: toneColor, borderColor: toneBorder }}>

// After
<ToneAwareCard tone={tone}>
  <Card>
```

### Step 4: Progress Indicators
Replace inline progress with `InlineProgress`:
```tsx
// Before
<div style={{ width: `${pct}%`, background: color }}></div>

// After
<InlineProgress value={pct} tone={tone} showLabel={true} />
```

---

## Component Composition Example

This example shows how patterns compose:

```tsx
/**
 * CourseTile — Combines CardGrid, ToneAwareCard, MetaPillGroup, InlineProgress
 */
<CardGrid layout="default" gapSize="md">
  {courses.map((course, idx) => (
    <ToneAwareCard key={course.id} tone={TONES[idx % TONES.length]}>
      <Card variant="interactive" onClick={() => navigate(course.path)}>
        {/* Header */}
        <h3 style={{ color: 'var(--tone-accent)' }}>{course.title}</h3>
        <p>{course.description}</p>

        {/* Metadata pills */}
        <MetaPillGroup
          items={[
            { icon: <User size={12} />, text: course.instructor },
            { icon: <Clock size={12} />, text: course.duration },
            { icon: <BarChart size={12} />, text: course.level },
          ]}
          size="sm"
        />

        {/* Progress bar */}
        <InlineProgress 
          value={course.progress} 
          tone={TONES[idx % TONES.length]} 
          showLabel={true}
        />
      </Card>
    </ToneAwareCard>
  ))}
</CardGrid>
```

---

## Further Reading

- [Design Tokens Reference](/src/styles/design-tokens.css)
- [Component Documentation](/src/components/index.ts)
- [TLS Design System](/README_DESIGN_SYSTEM.md)
