# Component Refactoring Guide — TLS Design System

## Overview

This guide documents the refactoring pattern for TLS Learning App components to ensure:
1. **No inline styles** in JSX — all styling via CSS classes
2. **Proper composition** — components accept children/props, not internal iteration
3. **100% token compliance** — all colors, spacing, sizing use design tokens
4. **BEM CSS naming** — `.component__element--modifier` pattern
5. **Semantic components** — use Card, Button, Badge, MetaPill etc. instead of custom divs

---

## Problem: Fused Components with Inline Styles

### ❌ BAD Pattern

```tsx
// ❌ ANTI-PATTERN: Inline styles + custom buttons + nested elements
export const SessionCard: React.FC<SessionCardProps> = ({ ... }) => {
  const [hovered, setHovered] = useState(false);

  return (
    <Card
      variant="interactive"
      style={{
        transition: 'box-shadow 0.15s, transform 0.15s',
        transform: hovered ? 'translateY(-1px)' : 'none',
        boxShadow: hovered ? 'var(--shadow-md)' : undefined,
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--s-4)' }}>
        <h3 style={{ margin: 0, fontSize: 'var(--t-body)', fontWeight: 600 }}>
          {title}
        </h3>
        <button
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 'var(--s-1)',
            padding: 'var(--s-1) var(--s-3)',
            borderRadius: 'var(--r-pill)',
            border: '1px solid var(--tls-primary-200)',
            background: 'var(--tls-primary-50)',
            color: 'var(--tls-primary-600)',
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLButtonElement).style.background = 'var(--tls-primary-100)';
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLButtonElement).style.background = 'var(--tls-primary-50)';
          }}
        >
          {label}
        </button>
      </div>
    </Card>
  );
};
```

### ✅ GOOD Pattern

```tsx
// ✅ BEST PRACTICE: CSS classes + semantic components + composition
import './SessionCard.css';

export const SessionCard: React.FC<SessionCardProps> = ({
  title,
  onActionClick,
  actionLabel,
}) => {
  return (
    <Card variant="interactive" className="session-card">
      <div className="session-card__header">
        <CardTitle>{title}</CardTitle>
      </div>

      <div className="session-card__actions">
        <button
          className="session-card__action-btn session-card__action-btn--primary"
          onClick={onActionClick}
        >
          {actionLabel}
        </button>
      </div>
    </Card>
  );
};
```

**SessionCard.css:**
```css
.session-card {
  /* Card already has base styles */
}

.session-card__header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: var(--s-3);
}

.session-card__action-btn {
  display: inline-flex;
  align-items: center;
  gap: var(--s-1);
  padding: var(--s-1) var(--s-3);
  border-radius: var(--r-pill);
  border: none;
  font-size: var(--t-caption);
  font-weight: 500;
  cursor: pointer;
  transition: background var(--dur-2), color var(--dur-2);
}

.session-card__action-btn--primary {
  border: 1px solid var(--tls-primary-200);
  background: var(--tls-primary-50);
  color: var(--tls-primary-600);
}

.session-card__action-btn--primary:hover {
  background: var(--tls-primary-100);
}
```

---

## Refactoring Checklist

For each component, ensure:

### 1. ✅ Remove All Inline Styles
- [ ] No `style={{...}}` in JSX (except animation/transform on hover)
- [ ] All layout moved to CSS classes
- [ ] All colors use design tokens
- [ ] All spacing use design tokens (`var(--s-1)` through `var(--s-16)`)
- [ ] All typography uses tokens (`var(--t-body)`, `var(--t-caption)`, etc.)
- [ ] All shadows use tokens (`var(--shadow-sm)`, `var(--shadow-md)`, etc.)
- [ ] All border-radius uses tokens (`var(--r-sm)`, `var(--r-xl)`, etc.)

### 2. ✅ Use Semantic Components
Replace inline divs with TLS components:
- [ ] Use `<Button>` instead of custom `<button>` with inline styles
- [ ] Use `<Card>`, `<CardTitle>`, `<CardDesc>`, `<CardFooter>` for card structure
- [ ] Use `<Badge>` for status/tags instead of custom spans
- [ ] Use `<MetaPillGroup>` for metadata instead of custom chips
- [ ] Use `<Avatar>` for user display instead of custom images
- [ ] Use composition: pass `children` or slots instead of rendering content internally

### 3. ✅ Create Companion CSS File
- [ ] Component name: `ComponentName.tsx`
- [ ] Styles file: `ComponentName.css`
- [ ] BEM naming: `.component-name__element--modifier`
- [ ] All values are tokens (no hardcoded hex/px/rem)
- [ ] Hover/active states in CSS, not inline

### 4. ✅ Composition Over Configuration
Instead of:
```tsx
<MyCard items={[...]} />  // Component iterates with .map()
```

Use:
```tsx
<Card>
  {items.map(item => <Item key={item.id} {...item} />)}
</Card>
```

The parent component COMPOSES children, not the Card itself.

### 5. ✅ State Management
- [ ] Move hover/focus state to CSS (`:hover`, `:focus-visible`, `:active`)
- [ ] Only use React state for complex interactions (accordion open/close, modal visibility)
- [ ] Never use `onMouseEnter`/`onMouseLeave` to modify inline styles

### 6. ✅ Export and Import CSS
```tsx
// Always import the companion CSS file
import './ComponentName.css';
```

---

## Design Token Reference

### Colors
```css
/* Primary brand colors (numbered 50-900) */
var(--tls-primary-50)    /* Lightest */
var(--tls-primary-600)   /* Base */
var(--tls-primary-900)   /* Darkest */

/* Semantic colors */
var(--tls-success-base)  /* #9DBEBA */
var(--tls-danger-base)   /* #F28559 */
var(--on-color-text-main) /* #fff on colored bg */
```

### Spacing Scale
```css
var(--s-1)   /* 4px */
var(--s-2)   /* 8px */
var(--s-3)   /* 12px */
var(--s-4)   /* 16px */
var(--s-5)   /* 20px */
var(--s-6)   /* 24px */
/* ... through --s-16 */
```

### Typography
```css
var(--t-h1), var(--t-h2), var(--t-h3), var(--t-h4)
var(--t-body), var(--t-body-sm), var(--t-body-lg)
var(--t-caption), var(--t-micro)
```

### Shadows
```css
var(--shadow-xs)     /* Subtle */
var(--shadow-sm)     /* Default card */
var(--shadow-md)     /* Elevated */
var(--shadow-lg)     /* Hero */
```

### Border Radius
```css
var(--r-xs)   /* 4px */
var(--r-sm)   /* 8px */
var(--r-md)   /* 12px */
var(--r-lg)   /* 16px */
var(--r-xl)   /* 20px */
var(--r-2xl)  /* 24px */
var(--r-pill) /* 999px */
```

---

## BEM CSS Naming Pattern

```css
/* Block: top-level component */
.session-card { }

/* Element: part of component */
.session-card__header { }
.session-card__title { }
.session-card__actions { }

/* Modifier: variation or state */
.session-card--elevated { }
.session-card__action-btn--primary { }
.session-card__action-btn--warm { }
.session-card__action-btn:hover { }
```

---

## Real Example: SessionCard Refactoring

### Before (✗ Anti-pattern)
```tsx
<Card
  style={{ transition: 'box-shadow 0.15s', transform: hovered ? 'translateY(-1px)' : undefined }}
  onMouseEnter={() => setHovered(true)}
  onMouseLeave={() => setHovered(false)}
>
  <div style={{ display: 'flex', gap: 'var(--s-4)' }}>
    <h3 style={{ fontSize: 'var(--t-body)', fontWeight: 600 }}>{title}</h3>
    <button
      style={{
        padding: 'var(--s-1) var(--s-3)',
        background: 'var(--tls-primary-50)',
        borderRadius: 'var(--r-pill)',
      }}
      onMouseEnter={(e) => e.currentTarget.style.background = 'var(--tls-primary-100)'}
      onMouseLeave={(e) => e.currentTarget.style.background = 'var(--tls-primary-50)'}
    >
      {label}
    </button>
  </div>
</Card>
```

### After (✓ Best practice)
```tsx
<Card variant="interactive" className="session-card">
  <div className="session-card__header">
    <CardTitle>{title}</CardTitle>
  </div>
  <button className="session-card__action-btn session-card__action-btn--primary">
    {label}
  </button>
</Card>
```

**CSS:**
```css
.session-card { }

.session-card__header {
  display: flex;
  gap: var(--s-4);
}

.session-card__action-btn {
  padding: var(--s-1) var(--s-3);
  border-radius: var(--r-pill);
  transition: background var(--dur-2);
}

.session-card__action-btn--primary {
  background: var(--tls-primary-50);
}

.session-card__action-btn--primary:hover {
  background: var(--tls-primary-100);
}
```

---

## Common Mistakes to Avoid

❌ **Inline styles** — `style={{ color: '#fff' }}`
✅ **Use tokens** — `style={{ color: 'var(--on-color-text-main)' }}` OR better, use CSS class

❌ **onMouseEnter/onMouseLeave for styling** — DOM manipulation
✅ **Use CSS :hover** — `selector:hover { ... }`

❌ **Custom button elements** — `<button style={{...}}>`
✅ **Use <Button> component** — `<Button variant="primary">`

❌ **Component internal iteration** — `items.map(item => <Item/>)`
✅ **Composition from parent** — Pass items as children

❌ **Hardcoded values** — `width: 32px`, `color: '#9DBEBA'`
✅ **Use tokens** — `width: 32px` (hardcoded OK for fixed sizes), `color: var(--tls-primary-500)`

---

## Priority Refactoring Queue

1. **TIER 1 - Core Components** (SessionCard, ArticleCard, VideoCard)
2. **TIER 2 - Learning Cards** (StepCard, ProjectCard, RankingCard)
3. **TIER 3 - Modal Components** (BookingModal, StreakCelebrationModal, etc.)
4. **TIER 4 - Pattern Components** (DataTable, SearchWithFilters, etc.)
5. **TIER 5 - Page Components** (Dashboard, LearningPath, Journal sections)

---

## Validation Checklist

After refactoring a component:
- [ ] Build succeeds: `npm run build`
- [ ] No TypeScript errors
- [ ] No `style={{}}` in JSX (except unavoidable cases)
- [ ] All colors are tokens
- [ ] All spacing is tokens
- [ ] Component uses CSS classes (BEM naming)
- [ ] Companion CSS file exists and is imported
- [ ] No hardcoded hex/rgb/px values in CSS (except fixed sizes)
- [ ] Hover/focus/active states in CSS
- [ ] Component passes props properly
- [ ] No internal `.map()` — composition from parent
