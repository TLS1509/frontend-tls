# Enhanced Card Variants — Premium Design System

Variantes améliorées et nouvelles pour la base `Card` component + variantes premium et glassmorphism pour EDTECH/IA.

---

## Part 1: Base Card Enhancements

Améliories du composant `Card` (actuellement: default, feature, interactive, glass)

### Current Variants
```tsx
export type CardVariant = 'default' | 'feature' | 'interactive' | 'glass';
```

**Nouvelle structure:**
```tsx
export type CardVariant = 
  | 'default'       // bordered, no shadow
  | 'feature'       // elevated (no border, shadow-sm)
  | 'interactive'   // hover lift + shadow
  | 'glass'         // glass morphism
  // ===== NEW =====
  | 'minimal'       // border only, no padding
  | 'compact'       // reduced padding (s-4)
  | 'outlined'      // strong border, no fill
  | 'subtle'        // very soft background, minimal border
  | 'disabled'      // greyed out, not-allowed
  | 'featured'      // elevated with gradient top
  | 'premium'       // glass + elevated + glow
  | 'gradient'      // gradient background
```

---

## Part 2: New Premium Variants for EDTECH

Variantes premium et stylisées pour une app EDTECH IA en formation pro.

### 1. `glass-elevated` — Glassmorphism Premium

**Use Case**: Hero sections, featured courses, achievement displays

**Styling Properties**:
```css
.card--glass-elevated {
  background: linear-gradient(
    135deg,
    rgba(255, 255, 255, 0.15),
    rgba(255, 255, 255, 0.05)
  );
  backdrop-filter: blur(32px);
  -webkit-backdrop-filter: blur(32px);
  border: 1px solid rgba(255, 255, 255, 0.4);
  box-shadow: 
    0 8px 32px rgba(85, 161, 180, 0.1),     /* color-tinted shadow */
    inset 1px 1px 0 rgba(255, 255, 255, 0.5); /* inner highlight */
  border-radius: var(--r-2xl);
  padding: var(--s-8);
}

.card--glass-elevated:hover {
  background: linear-gradient(
    135deg,
    rgba(255, 255, 255, 0.2),
    rgba(255, 255, 255, 0.08)
  );
  box-shadow: 
    0 12px 48px rgba(85, 161, 180, 0.15),
    inset 1px 1px 0 rgba(255, 255, 255, 0.5);
  transform: translateY(-4px);
}
```

**Features**:
- Gradient-tinted semi-transparent background
- Stronger blur effect (32px)
- Inset highlight for depth
- Color-tinted shadow (primary brand color)
- Smooth hover elevation
- Premium feel for hero content

---

### 2. `gradient-accent` — Gradient Side Accent

**Use Case**: Learning paths, featured resources, premium content

**Styling Properties**:
```css
.card--gradient-accent {
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: var(--r-2xl);
  padding: var(--s-6);
  overflow: hidden;
  position: relative;
}

.card--gradient-accent::before {
  content: '';
  position: absolute;
  left: 0;
  top: 0;
  width: 4px;
  height: 100%;
  background: linear-gradient(
    180deg,
    var(--tls-primary-500),
    var(--tls-primary-300)
  );
}

.card--gradient-accent:hover {
  box-shadow: var(--shadow-md);
  transform: translateX(2px);
}
```

**Variants by Tone**:
```css
.card--gradient-accent.tone-primary::before {
  background: linear-gradient(180deg, var(--tls-primary-500), var(--tls-primary-300));
}

.card--gradient-accent.tone-warm::before {
  background: linear-gradient(180deg, var(--tls-orange-500), var(--tls-orange-300));
}

.card--gradient-accent.tone-sun::before {
  background: linear-gradient(180deg, var(--tls-yellow-500), var(--tls-yellow-300));
}
```

**Features**:
- Colored left accent stripe (4px)
- Tone-based color variations
- Subtle hover translation (x-axis)
- Great for categorization
- Professional, clean aesthetic

---

### 3. `hero-image` — Hero Image Header

**Use Case**: Course cards, resource cards, featured content

**Styling Properties**:
```css
.card--hero-image {
  overflow: hidden;
  border-radius: var(--r-2xl);
  display: flex;
  flex-direction: column;
  border: 1px solid var(--border);
}

.card--hero-image__image {
  width: 100%;
  height: 180px;
  background: linear-gradient(135deg, var(--tls-primary-100), var(--tls-primary-50));
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  position: relative;
}

.card--hero-image__image::after {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(
    135deg,
    var(--tls-primary-500, #55A1B4),
    var(--tls-orange-400, #ED843A)
  );
  opacity: 0.15;
}

.card--hero-image__content {
  padding: var(--s-6);
  flex: 1;
  display: flex;
  flex-direction: column;
}

.card--hero-image:hover {
  box-shadow: var(--shadow-md);
  transform: translateY(-2px);
}

.card--hero-image:hover .card--hero-image__image::after {
  opacity: 0.25;
}
```

**Features**:
- Dedicated image/hero area (180px)
- Gradient overlay on hover
- Smooth hover lift
- Great for visual hierarchy
- Icon or image display area

---

### 4. `stat-highlighted` — Statistics with Highlight

**Use Case**: KPIs, metrics, achievements

**Styling Properties**:
```css
.card--stat-highlighted {
  background: var(--surface);
  border: 2px solid var(--border);
  border-radius: var(--r-2xl);
  padding: var(--s-6);
  position: relative;
  overflow: hidden;
}

.card--stat-highlighted::after {
  content: '';
  position: absolute;
  top: 0;
  right: -50%;
  width: 200%;
  height: 200%;
  background: radial-gradient(
    circle at 100% 0,
    rgba(85, 161, 180, 0.1),
    transparent 70%
  );
  pointer-events: none;
}

.card--stat-highlighted__value {
  font-size: clamp(2.5rem, 5vw, 3.5rem);
  font-weight: 700;
  background: linear-gradient(
    135deg,
    var(--tls-primary-600),
    var(--tls-primary-400)
  );
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  margin: 0;
}

.card--stat-highlighted__label {
  font-size: var(--t-caption);
  color: var(--text-muted);
  font-weight: 600;
  text-transform: uppercase;
  margin: 0;
}
```

**Features**:
- Large prominent value with gradient color
- Subtle radial glow background
- Professional metrics display
- Clean typography hierarchy
- Branded color gradient

---

### 5. `badge-corner` — Corner Badge Support

**Use Case**: Any card with status/badge (new, featured, locked, etc.)

**Enhancement to Base Card**:
```tsx
interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: CardVariant;
  badge?: {
    label: string;
    variant: 'primary' | 'warm' | 'sun' | 'success' | 'danger';
    position?: 'top-right' | 'top-left';
  };
}
```

**CSS Implementation**:
```css
.card--with-badge {
  position: relative;
  padding-top: var(--s-8);
}

.card__badge {
  position: absolute;
  top: var(--s-3);
  right: var(--s-3);
  padding: var(--s-2) var(--s-4);
  background: var(--bg-variant);
  color: var(--fg-variant);
  font-size: var(--t-caption);
  font-weight: 700;
  border-radius: var(--r-pill);
  z-index: 10;
}
```

**Features**:
- Badges in corner (top-right/top-left)
- Color-coded variants
- No content overlap
- Clean positioning

---

### 6. `loading-state` — Loading/Skeleton State

**Use Case**: Async content loading

**Styling**:
```css
.card--loading {
  opacity: 0.6;
  pointer-events: none;
  position: relative;
}

.card--loading::after {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(
    90deg,
    transparent,
    rgba(255, 255, 255, 0.2),
    transparent
  );
  animation: shimmer 2s infinite;
}

@keyframes shimmer {
  0% { transform: translateX(-100%); }
  100% { transform: translateX(100%); }
}
```

**Features**:
- Shimmer effect while loading
- Reduced opacity for context
- Non-interactive state
- Smooth animation

---

### 7. `compact` — Dense Variant

**Use Case**: List views, compact grids, condensed displays

**Styling**:
```css
.card--compact {
  padding: var(--s-4);
  gap: var(--s-2);
}

.card--compact .card__title {
  font-size: var(--t-h4);
  margin: 0 0 var(--s-1) 0;
}

.card--compact .card__desc {
  font-size: var(--t-caption);
}

.card--compact .card__footer {
  margin-top: var(--s-3);
  padding-top: var(--s-2);
}
```

**Features**:
- Reduced padding (s-4 vs s-6)
- Tighter line heights
- Smaller font sizes for desc
- Good for dense lists

---

### 8. `minimal` — Minimal Border

**Use Case**: Secondary content, light emphasis

**Styling**:
```css
.card--minimal {
  background: transparent;
  border: 1px solid var(--border);
  padding: var(--s-4);
  box-shadow: none;
}

.card--minimal:hover {
  background: var(--surface-muted);
  border-color: var(--border-strong);
}
```

**Features**:
- No background fill
- Simple border only
- Light hover effect
- Minimal visual weight

---

### 9. `outlined` — Strong Outline Variant

**Use Case**: Important actions, emphasis

**Styling**:
```css
.card--outlined {
  background: transparent;
  border: 2px solid var(--tls-primary-300);
  padding: var(--s-6);
  transition: all var(--dur-2) var(--ease-standard);
}

.card--outlined:hover {
  background: var(--tls-primary-50);
  border-color: var(--tls-primary-500);
  box-shadow: 0 0 0 3px rgba(85, 161, 180, 0.1);
}
```

**Features**:
- Thick colored border (2px)
- Transparent background
- Tinted hover state
- Glow effect on hover

---

### 10. `subtle` — Very Soft Variant

**Use Case**: Supporting content, low emphasis

**Styling**:
```css
.card--subtle {
  background: var(--surface-muted);
  border: none;
  padding: var(--s-5);
  box-shadow: none;
}

.card--subtle:hover {
  background: var(--surface);
  box-shadow: var(--shadow-xs);
}
```

**Features**:
- Soft muted background
- No border
- Very light hover
- Minimal visual impact

---

## Part 3: Specialized Component Variants

### StatCard — Enhanced

**New Variants**:
- `default` — Basic stat
- `elevated` — Shadow + no border (current)
- `warm` — Orange gradient background
- `brand` — Blue gradient background
- **NEW**:
  - `glow` — Gradient text + background glow
  - `compact` — Smaller font sizes
  - `highlighted` — Accent stripe + gradient

---

### GlassCard — Enhanced

**New Variants**:
```tsx
export type GlassCardVariant = 
  | 'light'           // current
  | 'brand'           // current
  // ===== NEW =====
  | 'elevated'        // stronger blur, shadow
  | 'tinted'          // color-tinted glass
  | 'frosted'         // more opaque glass
  | 'premium'         // highest blur + glow
```

---

### ActionCard — Enhanced

**New Variants**:
- `default` — Current horizontal layout
- **NEW**:
  - `vertical` — Centered icon above title
  - `compact` — Reduced spacing
  - `with-badge` — Icon has corner badge
  - `highlighted` — Left accent stripe

---

### ParcoursCard — Enhanced

**New States**:
- Current: `not-started`, `in-progress`, `completed`
- **NEW**:
  - `locked` — Prerequisites not met
  - `featured` — Larger card, hero image
  - `compact` — List view variant
  - `with-instructor-avatar` — Show instructor photo

---

## Part 4: Visual Effects & Animations

### Hover Effects by Variant

```css
/* Glass-elevated: Gentle lift + glow increase */
.card--glass-elevated:hover {
  transform: translateY(-4px);
  filter: drop-shadow(0 12px 48px rgba(85, 161, 180, 0.15));
}

/* Gradient-accent: Subtle translation + glow */
.card--gradient-accent:hover {
  transform: translateX(2px);
  box-shadow: 0 4px 16px rgba(85, 161, 180, 0.1);
}

/* Hero-image: Image opacity increase */
.card--hero-image:hover .card--hero-image__image::after {
  opacity: 0.25;
  filter: saturate(1.1);
}

/* Outlined: Glow expansion */
.card--outlined:hover {
  box-shadow: 0 0 0 6px rgba(85, 161, 180, 0.15);
}
```

### Focus States
```css
.card[tabindex]:focus-visible {
  outline: 2px solid var(--tls-primary-500);
  outline-offset: 2px;
}
```

---

## Part 5: Tone & Color System

### Tone-Based Variants

Every premium variant supports tone variants:

```tsx
interface CardProps {
  variant: CardVariant;
  tone?: 'primary' | 'warm' | 'sun' | 'brand';
}
```

**Examples**:
```tsx
<Card variant="glass-elevated" tone="primary" />
<Card variant="gradient-accent" tone="warm" />
<Card variant="hero-image" tone="sun" />
<Card variant="stat-highlighted" tone="brand" />
```

**CSS Mapping**:
```css
.card--variant.tone-primary {
  --accent-color: var(--tls-primary-500);
  --accent-bg: var(--tls-primary-50);
}

.card--variant.tone-warm {
  --accent-color: var(--tls-orange-500);
  --accent-bg: var(--tls-orange-50);
}

.card--variant.tone-sun {
  --accent-color: var(--tls-yellow-500);
  --accent-bg: var(--tls-yellow-50);
}
```

---

## Part 6: Responsive Behavior

### Mobile Adaptations

```css
@media (max-width: 768px) {
  /* Glass-elevated: Less blur on mobile */
  .card--glass-elevated {
    backdrop-filter: blur(16px);
  }

  /* Hero-image: Reduced height */
  .card--hero-image__image {
    height: 120px;
  }

  /* Stat-highlighted: Smaller fonts */
  .card--stat-highlighted__value {
    font-size: clamp(2rem, 5vw, 2.5rem);
  }

  /* Compact even more on mobile */
  .card--compact {
    padding: var(--s-3);
  }
}
```

---

## Part 7: Implementation Priority

### Tier 1 (Essential, implement first)
- ✓ Current variants (default, feature, interactive, glass)
- `compact` — Needed for list views
- `minimal` — Needed for secondary content
- `featured` — For hero sections
- `disabled` state — For locked content

### Tier 2 (Premium, implement second)
- `glass-elevated` — Premium feel
- `gradient-accent` — Visual differentiation
- `hero-image` — Content cards
- `stat-highlighted` — KPI displays
- `badge-corner` — Status indicators

### Tier 3 (Enhanced, implement after)
- `outlined` — Alternative emphasis
- `subtle` — Low emphasis
- `loading-state` — UX polish
- Tone variants system
- Animation library

---

## Part 8: Usage Examples

### Dashboard Hero Section
```tsx
<Card variant="glass-elevated" tone="primary">
  <CardEyebrow>Welcome Back</CardEyebrow>
  <CardTitle>Your Learning Journey</CardTitle>
  <CardDesc>Continue from where you left off</CardDesc>
</Card>
```

### Learning Path Card
```tsx
<Card variant="gradient-accent" tone="warm">
  <CardEyebrow>Leadership</CardEyebrow>
  <CardTitle>Fondamentaux du Leadership</CardTitle>
  <CardDesc>6 weeks · 12 lessons</CardDesc>
  <Badge>IN PROGRESS</Badge>
</Card>
```

### KPI Display
```tsx
<Card variant="stat-highlighted">
  <div className="card__stat-value">68%</div>
  <div className="card__stat-label">Progression</div>
  <div className="card__stat-meta">+5% cette semaine</div>
</Card>
```

### Content Card with Hero
```tsx
<Card variant="hero-image" tone="primary">
  <div className="card__hero-image" />
  <CardEyebrow>Resource</CardEyebrow>
  <CardTitle>Advanced Leadership</CardTitle>
  <CardDesc>Master executive presence</CardDesc>
</Card>
```

---

## Checklist: Variant Creation

For each new variant:
- [ ] Define CSS class name (e.g., `.card--glass-elevated`)
- [ ] Set background, border, shadow properties
- [ ] Define hover state (lift, shadow, color shift)
- [ ] Add focus-visible outline
- [ ] Support tone variants (primary/warm/sun)
- [ ] Define mobile adaptations
- [ ] Add TypeScript type
- [ ] Document in Storybook/Components.tsx
- [ ] Add to CARD_VARIANTS_USAGE.md

---

## Next Steps

1. Update `Card.tsx` TypeScript types with new variants
2. Enhance `tls-components.css` with tier-1 variants
3. Create variant showcase in `Components.tsx`
4. Test responsive behavior at 375px, 768px, 1280px breakpoints
5. Gather user feedback on premium variants
6. Implement tier-2 and tier-3 as needed
