# TLS Component Standards & Guidelines

## Overview

This document defines the standardization practices for all components in The Learning Society design system. These standards ensure consistency, maintainability, and predictability across 121+ components.

## Naming Conventions

### Props

All component props should use consistent, predictable naming:

```tsx
// ✓ CORRECT
interface ButtonProps {
  size?: 'sm' | 'md' | 'lg';
  variant?: 'primary' | 'secondary' | 'tertiary';
  tone?: 'primary' | 'warm' | 'sun';
  disabled?: boolean;
  className?: string;
  onClick?: () => void;
}

// ✗ WRONG
interface ButtonProps {
  buttonSize?: 'small' | 'medium' | 'large'; // Redundant prefix
  type?: 'primary' | 'secondary'; // Should use 'variant'
  isDisabled?: boolean; // Should use 'disabled'
}
```

### Common Prop Names

- **size**: `'sm' | 'md' | 'lg'` — For spacing, text, components
- **variant**: `'primary' | 'secondary' | 'tertiary'` — For style variants
- **tone**: `'primary' | 'warm' | 'sun'` — For brand color variants
- **disabled**: `boolean` — For disabled state
- **className**: `string` — For custom CSS classes
- **status**: `'default' | 'success' | 'error'` — For validation states
- **align**: `'left' | 'center' | 'right'` — For alignment
- **direction**: `'row' | 'column'` — For flex direction

### Interface Naming

```tsx
// ✓ CORRECT
export interface ButtonProps { ... }
export interface BadgeVariant { ... }

// ✗ WRONG
export interface IButtonProps { ... } // No leading 'I'
export interface ButtonPropsInterface { ... } // No suffix
```

## CSS Class Naming (BEM)

All component CSS uses Block-Element-Modifier (BEM) convention:

```css
/* Block: the component */
.button { ... }

/* Element: part of the component */
.button__label { ... }
.button__icon { ... }

/* Modifier: variation of block or element */
.button--primary { ... }
.button--disabled { ... }
.button__icon--left { ... }

/* ✗ WRONG */
.btn { ... }
.button_label { ... } /* Single underscore */
.buttonPrimary { ... } /* camelCase */
.button-label { ... } /* Single dash (use double) */
```

### BEM Best Practices

1. Use double dashes (`--`) for modifiers
2. Use double underscores (`__`) for elements
3. Keep block names specific and meaningful
4. Avoid deeply nested selectors
5. Use semantic class names

```css
/* ✓ CORRECT */
.card__header { ... }
.card__header--sticky { ... }

/* ✗ WRONG */
.card .header { ... } /* Descendant selector */
.card-header { ... } /* Single dash */
```

## Design Tokens

All components MUST use CSS custom properties (tokens) instead of hardcoded values:

```tsx
/* ✓ CORRECT - Uses tokens */
.button {
  padding: var(--s-3);
  font-size: var(--text-md);
  color: var(--text-primary);
  background: var(--tls-primary-500);
  border-radius: var(--r-lg);
  transition: all var(--dur-1);
  box-shadow: var(--shadow-sm);
}

/* ✗ WRONG - Hardcoded values */
.button {
  padding: 12px;
  font-size: 16px;
  color: #252b37;
  background: #55a1b4;
  border-radius: 8px;
}
```

### Common Token Categories

| Category | Usage | Examples |
|----------|-------|----------|
| Spacing | Padding, margin, gaps | `--s-1`, `--s-2`, `--s-3`, `--s-4`, etc. |
| Text | Font sizes, weights, families | `--text-xs`, `--text-sm`, `--text-md`, `--text-lg` |
| Colors | Brand & semantic colors | `--tls-primary-500`, `--tls-ink-900`, `--border` |
| Border Radius | Corner rounding | `--r-sm`, `--r-md`, `--r-lg`, `--r-xl`, `--r-full` |
| Shadows | Elevation effects | `--shadow-xs`, `--shadow-sm`, `--shadow-md`, `--shadow-lg` |
| Duration | Animation timing | `--dur-1`, `--dur-2`, `--dur-3` |

## Component Structure

### File Organization

```
src/components/
├── core/              # Base form & layout components
│   ├── Button.tsx
│   ├── Input.tsx
│   └── Card.tsx
├── ui/                # Content & utility components
│   ├── Badge.tsx
│   ├── Avatar.tsx
│   └── [...]
├── patterns/          # Complex reusable patterns
│   ├── FormLayout.tsx
│   ├── DataTable.tsx
│   └── [...]
├── learning/          # Learning-specific components
│   ├── LessonCard.tsx
│   ├── CourseCard.tsx
│   └── [...]
└── layout/            # App shell components
    ├── Sidebar.tsx
    └── [...]
```

### Component File Template

```tsx
/**
 * ComponentName — Category/Purpose
 *
 * Brief description of what this component does.
 *
 * Usage:
 *   <ComponentName prop1="value" prop2={42} />
 */

import React from 'react';
import './ComponentName.css';

export interface ComponentNameProps {
  // Props definition
  className?: string;
}

export const ComponentName: React.FC<ComponentNameProps> = ({
  // Props destructuring
  className = '',
}) => {
  return (
    <div className={`component-name ${className}`}>
      {/* JSX */}
    </div>
  );
};

export default ComponentName;
```

## Responsive Design

All components should support responsive layouts using CSS media queries:

```css
/* Desktop-first approach */
.component {
  /* Default desktop styles */
  padding: var(--s-4);
  font-size: var(--text-md);
}

@media (max-width: 768px) {
  .component {
    /* Tablet adjustments */
    padding: var(--s-3);
  }
}

@media (max-width: 480px) {
  .component {
    /* Mobile adjustments */
    padding: var(--s-2);
    font-size: var(--text-sm);
  }
}
```

## Accessibility

Every component should include accessibility features:

```tsx
// ✓ CORRECT
<button
  aria-label="Close dialog"
  aria-pressed={isOpen}
  role="button"
  tabIndex={0}
  onKeyDown={(e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      handleClick();
    }
  }}
>
  Close
</button>

/* ✓ Semantic HTML */
<nav> /* Navigation */
<button> /* Interactive */
<a href="#"> /* Links */
<input type="checkbox"> /* Form controls */
<h1>, <h2>, etc. /* Headings */
<ol>, <ul> /* Lists */
<label> /* Form labels */
```

## State Management

Components should manage their own state where appropriate:

```tsx
// ✓ CORRECT - Component manages internal state
export const Accordion: React.FC<AccordionProps> = ({ items }) => {
  const [expanded, setExpanded] = useState<Set<string>>(new Set());

  const toggle = (id: string) => {
    const newExpanded = new Set(expanded);
    newExpanded.has(id) ? newExpanded.delete(id) : newExpanded.add(id);
    setExpanded(newExpanded);
  };

  return (
    <div>
      {items.map((item) => (
        <button key={item.id} onClick={() => toggle(item.id)}>
          {item.label}
        </button>
      ))}
    </div>
  );
};

// ✗ AVOID - Props-only component that can't maintain state
export const Accordion: React.FC<AccordionProps> = ({
  expanded,
  onToggle,
  items,
}) => {
  // Limited flexibility
};
```

## Type Exports

Always export component types for external use:

```tsx
// ✓ CORRECT
export interface ButtonProps {
  variant?: 'primary' | 'secondary';
  size?: 'sm' | 'md' | 'lg';
}

export const Button: React.FC<ButtonProps> = ({ ... }) => { ... };

// Usage in other files
import { Button, type ButtonProps } from '@/components';

// ✗ WRONG - Types not exported
interface ButtonProps { ... } // Private
export const Button: React.FC<ButtonProps> = { ... };
```

## Documentation

Each component should include:

1. **JSDoc comment** with usage example
2. **Props interface** with descriptions
3. **CSS file** with comments (if styled)
4. **Export in index.ts** with type exports

```tsx
/**
 * Button — Interactive Control
 *
 * A pressable button component for user actions.
 * Supports multiple variants and sizes.
 *
 * Usage:
 *   <Button variant="primary" size="lg" onClick={() => alert('Clicked!')}>
 *     Click me
 *   </Button>
 *
 * Variants: primary, secondary, tertiary
 * Sizes: sm, md, lg
 */

export interface ButtonProps {
  /** Button text or content */
  children: React.ReactNode;
  /** Visual style variant */
  variant?: 'primary' | 'secondary' | 'tertiary';
  /** Size of the button */
  size?: 'sm' | 'md' | 'lg';
  /** Disabled state */
  disabled?: boolean;
  /** Click handler */
  onClick?: () => void;
  /** Additional CSS classes */
  className?: string;
}
```

## Common Patterns

### Tone-Aware Components

Components that support brand tones (primary, warm, sun) should:

```tsx
export type ComponentTone = 'primary' | 'warm' | 'sun';

export interface ComponentProps {
  tone?: ComponentTone;
}

// CSS handles tone variations
.component--primary { --tone-color: var(--tls-primary-500); }
.component--warm { --tone-color: var(--tls-orange-500); }
.component--sun { --tone-color: var(--tls-yellow-500); }

.component {
  color: var(--tone-color);
}
```

### Optional Content

When a component has optional sections, use conditional rendering:

```tsx
export interface CardProps {
  title: string;
  description?: string;
  icon?: React.ReactNode;
}

export const Card: React.FC<CardProps> = ({
  title,
  description,
  icon,
}) => (
  <div className="card">
    {icon && <span className="card__icon">{icon}</span>}
    <h2 className="card__title">{title}</h2>
    {description && <p className="card__desc">{description}</p>}
  </div>
);
```

## Testing Considerations

Components should be testable:

```tsx
// ✓ Testable
<button onClick={onSubmit} aria-label="Submit form">
  Submit
</button>

// ✗ Hard to test
<button onClick={() => fetch('/api/...').then(...)}>
  Submit
</button>
```

## Performance

### Avoid Inline Functions

```tsx
// ✗ Creates new function on each render
<button onClick={() => handleClick()}>Click</button>

// ✓ Use function reference
const handleClick = useCallback(() => { ... }, [deps]);
<button onClick={handleClick}>Click</button>
```

### Memoization

```tsx
// ✓ For expensive components
export const ExpensiveComponent = React.memo(({ data }) => {
  return <div>{/* complex rendering */}</div>;
});
```

## Migration Checklist

When creating new components, ensure:

- [ ] Props use standard naming (size, variant, tone, disabled)
- [ ] CSS uses BEM convention
- [ ] All values are CSS tokens (no hardcoded values)
- [ ] Component is exported in `/components/index.ts`
- [ ] Types are exported alongside component
- [ ] JSDoc comment with usage example exists
- [ ] Responsive design supported (mobile, tablet, desktop)
- [ ] Accessibility features included (ARIA, keyboard nav)
- [ ] CSS file created and linked
- [ ] Showcase example added to Components.tsx (if applicable)

## Summary

| Aspect | Standard |
|--------|----------|
| Props | camelCase, size/variant/tone/disabled |
| CSS Classes | BEM (`.component__element--modifier`) |
| Design Values | CSS tokens only (`var(--*)`) |
| Types | Exported as `[ComponentName]Props` |
| Exports | Component + types in index.ts |
| Accessibility | ARIA, semantic HTML, keyboard nav |
| Responsive | Mobile-first or desktop-first media queries |
| Organization | core/, ui/, patterns/, learning/, layout/ |
