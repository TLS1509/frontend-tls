# TLS Design System — CSS Class Reference

## Overview
This document maps all existing CSS classes to their usage in components. **All components must use these existing classes instead of creating new ones.**

## Form Controls (Input.css)

### Field Container (wrapper for entire field)
- **`.field`** - Main container for form field (label + control + helper)
  - Used in: Input, Select, and any form field component
  
- **`.field__label`** - Label text
  - Child of `.field`
  - Used with `<label htmlFor={fieldId}>`
  
- **`.field__hint`** - Helper text below input (success state)
  - Child of `.field`
  - Used with `<p>` tag
  
- **`.field__error`** - Error message below input (error state)
  - Child of `.field`
  - Used with `<p>` tag, `role="alert"`
  
- **`.required`** - Red asterisk for required fields
  - Child of `.field__label`
  - Used with `<span>` tag

### Input Control (text input, select, textarea wrapper)
- **`.input`** - Main control wrapper for input/select/textarea
  - Flex container with icons and native control
  - Supports these modifiers:
    - `.input--sm` - Small size (36px height)
    - `.input--lg` - Large size (52px height)
    - `.input--success` - Success state (green border)
    - `.input--error` - Error state (red border)
    - `.input--disabled` - Disabled state
  
- **`.input__icon`** - Leading or trailing icon
  - Child of `.input`
  - Used with `<span>` tag

### Textarea Variant
- **`.textarea`** - Textarea-specific styling
  - Extends `.input` with min-height and vertical resize
  - Use on the `.input` container when multiline

### Checkbox Control
- **`.check`** - Main label wrapper for checkbox
  - Flex container with input, custom box, and label text
  
- **`.check__box`** - Custom checkbox square
  - Sibling to hidden `<input>`
  - Shows checkmark on `input:checked`

### Radio Control
- **`.radio`** - Main label wrapper for radio
  - Flex container with input, custom circle, and label text
  
- **`.radio__box`** - Custom radio circle
  - Sibling to hidden `<input>`
  - Shows filled circle on `input:checked`

### Switch/Toggle Control
- **`.switch`** - Main label wrapper for toggle switch
  - Flex container with input, track, and label text
  
- **`.switch__track`** - Animated toggle track
  - Sibling to hidden `<input>`
  - Indicator moves left/right on `input:checked`

## Card Component (Card.css)

### Base Card
- **`.card`** - Main card container
  - Flex column with gap, padding, border, shadow
  - Supports all variants below
  
### Card Variants
- **`.card--default`** (default) - Standard card with border
- **`.card--elevated`** - Card with shadow (no border)
- **`.card--interactive`** - Card with hover lift effect
- **`.card--glass`** - Frosted glass morphism effect
- **`.card--minimal`** - Borderless, transparent
- **`.card--feature`** - Hero/featured card (large, shadow)
- **`.card--clickable`** - Pointer cursor, hover effect

### Card Sizes
- **`.card--sm`** (small) - Compact 16px padding
- **`.card--md`** (default) - Standard 24px padding  
- **`.card--lg`** (large) - Featured 32px padding
- **`.card--xl`** (hero) - Extra large 48px padding
- **`.card--xs`** (tiny) - Ultra compact 12px padding
- **`.card--compact`** (alias) - Same as `.card--sm`

### Card Sub-Elements
- **`.card__header`** - Wrapper for eyebrow + title
- **`.card__eyebrow`** - Label above title (micro typography)
- **`.card__title`** - Main heading
- **`.card__description`** - Body text
- **`.card__icon`** - Icon wrapper at top
- **`.card__footer`** - Footer section with divider

### Card Tones (color variants)
- **`.card--tone-primary`** (blue)
- **`.card--tone-warm`** (orange)
- **`.card--tone-sun`** (yellow)
- **`.card--tone-brand`** (primary/teal)
  - Each defines CSS variables: `--card-tone-bg`, `--card-tone-border`, `--card-tone-accent`

### Card States
- **`.card--disabled`** - Disabled/inactive card
- **`.card--clickable:hover`** - Hover state with border color change
- **`.card--interactive:hover`** - Hover with transform and shadow lift

## Responsive Design

All form controls and cards include responsive breakpoints:
- **Desktop** (default): Full sizing
- **Tablet** (768px): Reduced padding/font size
- **Mobile** (480px): Minimal spacing

## Usage Examples

### Form Field (Input/Select)
```jsx
<div className="field">
  <label className="field__label" htmlFor="fieldId">
    Label Text
    <span className="required" aria-hidden="true">*</span>
  </label>
  <div className="input input--md input--error">
    <span className="input__icon">{icon}</span>
    <input id="fieldId" {...props} />
  </div>
  <p className="field__error" role="alert">Error message</p>
</div>
```

### Checkbox
```jsx
<label className="check">
  <input type="checkbox" {...props} />
  <span className="check__box" aria-hidden="true" />
  <span>Label text</span>
</label>
```

### Card
```jsx
<div className="card card--elevated card--tone-primary">
  <div className="card__header">
    <div className="card__eyebrow">Eyebrow</div>
    <h3 className="card__title">Title</h3>
  </div>
  <p className="card__description">Description</p>
  <div className="card__footer">Footer content</div>
</div>
```

## CSS Custom Properties (Tokens)

All classes use CSS custom properties for consistency:
- `--s-*` (spacing: s-1 to s-12)
- `--t-*` (typography: t-h1, t-body, t-caption)
- `--tls-*-*` (colors: tls-primary-500, tls-orange-600, etc.)
- `--border`, `--surface`, `--text`, `--text-muted`, `--text-soft`
- `--shadow-*` (shadows: shadow-sm, shadow-md, shadow-lg)
- `--r-*` (border-radius: r-xs, r-md, r-lg, r-xl, r-2xl)
- `--dur-*` (durations: dur-1, dur-2, dur-3)
- `--ease-*` (easing functions)

## Rules for New Components

1. ✅ **Use existing classes** - Map to `.field`, `.input`, `.card`, `.check`, `.radio`, `.switch`
2. ✅ **Use design tokens** - All colors, spacing, typography via CSS variables
3. ✅ **Props-based API** - Self-contained components, not wrappers
4. ✅ **Semantic HTML** - Use native elements (input, select, button, etc.)
5. ❌ **No new CSS classes** - Only add new classes if no existing class fits the need
6. ❌ **No hardcoded values** - Everything via tokens (--s-*, --t-*, --tls-*, etc.)
