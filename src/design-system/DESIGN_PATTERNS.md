# TLS Learning App — Design Patterns & Standardization Guide

**Last Updated**: 2026-04-29  
**Version**: 1.0.0 (Post-Modernization)

---

## Overview

This document outlines the standardized design patterns, components, and best practices for the TLS Learning App. After the modernization phase (Navigation & Dashboard Enhancement), we've standardized:

- **Navigation System** (Sidebar, AppSidebar, TopNav, BottomNav, HamburgerButton)
- **Layout Helpers** (Flex, Grid, Spacing, Container utilities)
- **Glassmorphic Design** (Backdrop blur, multi-layer shadows, semi-transparent backgrounds)
- **Component Patterns** (Cards, Buttons, Forms, Feedback)
- **Accessibility Standards** (ARIA, Keyboard Nav, Focus States)

---

## Part 1: Layout System

### 1.1 Core Principles

- **Mobile-First**: All layouts start mobile, enhance on larger screens
- **Utility-Based**: Use predefined classes instead of inline styles
- **Consistency**: Spacing from design tokens (`--s-2` through `--s-12`)
- **Flexibility**: Support 3+ breakpoints (mobile 768px, tablet 1024px, desktop 1440px+)

### 1.2 Flex Containers

#### VStack (Vertical)
```tsx
<div className="vstack vstack--gap-md vstack--center">
  <div>Item 1</div>
  <div>Item 2</div>
  <div>Item 3</div>
</div>
```

**Available Gap Variants**: `--gap-sm`, `--gap-md`, `--gap-lg`, `--gap-xl`  
**Available Modifiers**: `--center` (center items), `--between` (space-between)

#### HStack (Horizontal)
```tsx
<div className="hstack hstack--gap-md hstack--between">
  <span>Left</span>
  <span>Right</span>
</div>
```

### 1.3 Grid Layouts

#### Auto-Fit Grid (Responsive)
```tsx
<div className="grid-auto-fit">
  <div>Card 1</div>
  <div>Card 2</div>
  <div>Card 3</div>
</div>
```

Automatically arranges items based on available space (default min: 300px)

#### Fixed Column Grids
```tsx
<div className="grid-2-col">  {/* 2 columns, responsive to 1 on mobile */}
<div className="grid-3-col">  {/* 3 columns, responsive to 1 on mobile */}
<div className="grid-4-col">  {/* 4 columns, responsive to 2 on tablet, 1 on mobile */}
```

### 1.4 Spacing Utilities

#### Padding
```tsx
<div className="p-md">  {/* 16px padding all sides */}
<div className="px-md"> {/* 16px left/right padding */}
<div className="py-lg"> {/* 24px top/bottom padding */}
```

**Available Sizes**: `sm` (12px), `md` (16px), `lg` (24px), `xl` (32px)

#### Margins
```tsx
<div className="mt-md">   {/* 16px top margin */}
<div className="mb-lg">   {/* 24px bottom margin */}
<div className="m-0">     {/* No margin */}
```

### 1.5 Containers

#### Responsive Container
```tsx
<div className="container">
  {/* Max width 1400px, centered, responsive padding */}
</div>

<div className="container container--sm">
  {/* Max width 960px for narrower content */}
</div>
```

### 1.6 Sections

#### Section Header
```tsx
<div className="section">
  <div className="section-header">
    <h2 className="section-header__title">Section Title</h2>
    <p className="section-header__desc">Optional description here</p>
  </div>
  
  {/* Content grid below */}
</div>
```

---

## Part 2: Navigation System

### 2.1 Sidebar Navigation (AppSidebar)

**Location**: `/src/components/layout/AppSidebar.tsx`

#### Usage
```tsx
import { AppSidebar } from '@/components/layout/AppSidebar';

<AppSidebar
  activeItem="dashboard"
  onNavigate={(path) => navigate(path)}
  collapsed={isSidebarCollapsed}
  onCollapsedChange={setSidebarCollapsed}
/>
```

#### Features
- ✅ Expanded/Collapsed states (280px → 100px)
- ✅ All navigation items with Lucide icons
- ✅ User dropdown menu integration
- ✅ Glassmorphic design with backdrop blur
- ✅ Badge support (e.g., "DÉMO")
- ✅ Active state indication
- ✅ Smooth animations on all interactions

#### Navigation Items (Built-in)
```
Main (Parcours):
- Tableau de bord → /dashboard
- Parcours → /learning-paths
- Coaching → /coaching
- Veille → /veille

Secondary (Ressources):
- Mon Profil → /profile
- Paramètres → /settings
- Notifications → /notifications
- Positionnement → /positionnement (badge: "DÉMO")
```

### 2.2 Mobile Navigation (HamburgerButton + BottomNav)

#### HamburgerButton
```tsx
import { HamburgerButton } from '@/components/layout/HamburgerButton';

<HamburgerButton
  isOpen={menuOpen}
  onChange={setMenuOpen}
  ariaLabel="Menu de navigation"
/>
```

#### BottomNav
```tsx
import { BottomNav } from '@/components/layout/BottomNav';

<BottomNav
  items={[
    { id: 'home', label: 'Accueil', icon: <Home /> },
    { id: 'search', label: 'Recherche', icon: <Search />, badge: 3 },
  ]}
  activeId={activeItem}
  onSelect={handleSelect}
/>
```

### 2.3 Header Navigation (TopNav)

```tsx
import { TopNav } from '@/components/layout/TopNav';

<TopNav
  breadcrumbs={[
    { label: 'Accueil', href: '/' },
    { label: 'Parcours', href: '/parcours' },
    { label: 'React Avancé', isCurrent: true },
  ]}
  onSearch={(query) => handleSearch(query)}
/>
```

---

## Part 3: Glassmorphic Design

### 3.1 Components Using Glassmorphism

1. **Sidebar** (`app-sidebar.css`)
   - Brand section, user section, navigation items
   - Backdrop blur: 12px
   - Background: `rgba(255,255,255,0.85-0.75)`
   - Border: `rgba(255,255,255,0.4)`

2. **Floating Button** (`floating-nav.css`)
   - Backdrop blur: 12px
   - Glow effect: `drop-shadow(0 0 8px rgba(85,161,180,0.25))`
   - 4-layer elevation shadows

3. **Dropdown Menu** (`tls-components.css`)
   - Container with backdrop blur: 12px
   - Ripple effect on items (::before pseudo-element)
   - Gradient separators

4. **Mobile Navigation**
   - HamburgerButton, TopNav, BottomNav
   - All use backdrop-filter blur(12px)

### 3.2 Implementing Glassmorphism

```css
.component-with-glass {
  /* Required for glass effect */
  background: linear-gradient(135deg, rgba(255,255,255,0.85) 0%, rgba(255,255,255,0.75) 100%);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  
  /* Enhanced border */
  border: 1px solid rgba(255,255,255,0.4);
  
  /* Multi-layer shadows */
  box-shadow:
    0 2px 4px rgba(0,0,0,0.05),
    0 4px 8px rgba(85,161,180,0.1),
    0 8px 16px rgba(85,161,180,0.15),
    0 12px 32px rgba(85,161,180,0.1);
  
  /* Glow effect */
  filter: drop-shadow(0 0 8px rgba(85,161,180,0.2));
  
  /* Smooth transitions */
  transition: all var(--dur-2) var(--ease-standard);
}
```

---

## Part 4: Component Patterns

### 4.1 Card System

#### Core Card (with variants)
```tsx
import { Card, CardEyebrow, CardTitle, CardDesc } from '@/components/core/Card';

<Card variant="default" tone="primary">
  <CardEyebrow>Featured</CardEyebrow>
  <CardTitle>Card Title</CardTitle>
  <CardDesc>Description text</CardDesc>
</Card>
```

**Available Variants**: 
- Essential: `default`, `minimal`, `with-icon`
- Premium EDTECH: `glass-elevated`, `gradient-accent`, `hero-image`
- Polish: `featured`, `interactive`

**Available Tones**: `primary`, `warm`, `sun`, `success`, `danger`, `info`

### 4.2 Button System

```tsx
import { Button } from '@/components/core/Button';

<Button variant="primary" size="md" leadingIcon={<Search />}>
  Search
</Button>
```

**Variants**: `primary`, `warm`, `secondary`, `ghost`, `brand-ghost`, `destructive`, `glass`, `link`  
**Sizes**: `sm`, `md`, `lg`, `xl`  
**Props**: `leadingIcon`, `trailingIcon`, `iconOnly`, `loading`, `fullWidth`

### 4.3 Badge System

```tsx
import { Badge } from '@/components/ui/Badge';

<Badge variant="primary" dot>
  In Progress
</Badge>
```

**Variants**: `brand`, `neutral`, `warm`, `sun`, `success`, `danger`, `info`  
**Props**: `dot` (adds colored dot)

---

## Part 5: Accessibility Standards

### 5.1 Required ARIA Labels

All interactive components must have:

```tsx
{/* Navigation */}
<nav aria-label="Navigation principale">
  <button aria-label="Menu de navigation" aria-expanded={isOpen}>
    Menu
  </button>
</nav>

{/* Forms */}
<input aria-label="Email address" type="email" />
<button aria-pressed={isPressed}>Toggle</button>

{/* Live regions */}
<div role="status" aria-live="polite">
  {statusMessage}
</div>
```

### 5.2 Keyboard Navigation

All components must support:
- `Tab` - Move focus
- `Shift+Tab` - Move focus backwards
- `Enter/Space` - Activate button/link
- `Escape` - Close modals/dropdowns
- `Arrow Keys` - Navigate within lists/menus

### 5.3 Focus States

All components must have visible focus indicators:

```css
.component:focus-visible {
  outline: 2px solid var(--tls-primary-500);
  outline-offset: 2px;
}
```

---

## Part 6: Best Practices

### 6.1 DO's ✅

- ✅ Use layout helper classes instead of inline styles
- ✅ Use CSS custom properties for colors, spacing, sizing
- ✅ Use Lucide React icons for consistency
- ✅ Apply glassmorphism to floating/overlay components
- ✅ Support both desktop and mobile layouts
- ✅ Test keyboard navigation
- ✅ Provide visible focus states
- ✅ Use responsive grid layouts

### 6.2 DON'Ts ❌

- ❌ Don't use inline `style={{}}` for layout (use classes)
- ❌ Don't hardcode colors (use CSS variables)
- ❌ Don't mix icon libraries (use Lucide only)
- ❌ Don't forget ARIA labels on interactive elements
- ❌ Don't create new color values (use design tokens)
- ❌ Don't skip mobile responsive design
- ❌ Don't use `position: absolute` without careful planning
- ❌ Don't remove focus outlines

### 6.3 CSS File Organization

```
/src/styles/
  design-tokens.css       → Color, sizing, typography tokens
  layout-helpers.css      → Flex, grid, spacing utilities
  app-layout.css          → App shell and main layout
  app-sidebar.css         → Sidebar specific styles
  tls-components.css      → Base component styles
  floating-nav.css        → Floating button styles
  mobile-nav.css          → Mobile navigation styles
  card-layouts.css        → Card grid and layout utilities
  feature-pages.css       → Page-specific styles (merged)
```

---

## Part 7: Migration Guide

### 7.1 Converting Inline Styles

**Before** (Inline styles):
```tsx
<div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem' }}>
  <div>Card 1</div>
  <div>Card 2</div>
  <div>Card 3</div>
</div>
```

**After** (Utility classes):
```tsx
<div className="grid-3-col">
  <div>Card 1</div>
  <div>Card 2</div>
  <div>Card 3</div>
</div>
```

### 7.2 Adding Glassmorphism

**Before** (Flat design):
```css
.modal {
  background: white;
  border: 1px solid #e5e5e5;
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
}
```

**After** (Glassmorphic):
```css
.modal {
  background: linear-gradient(135deg, rgba(255,255,255,0.85) 0%, rgba(255,255,255,0.75) 100%);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border: 1px solid rgba(255,255,255,0.4);
  box-shadow: 0 2px 4px rgba(0,0,0,0.05), 0 4px 8px rgba(85,161,180,0.1), ...;
  filter: drop-shadow(0 0 8px rgba(85,161,180,0.2));
}
```

---

## Part 8: Component Checklist

Use this checklist when creating or updating components:

- [ ] Uses CSS classes (no inline styles for layout)
- [ ] Supports mobile-first responsive design
- [ ] Includes ARIA labels and keyboard navigation
- [ ] Has visible focus states (`focus-visible`)
- [ ] Uses design tokens for colors/spacing
- [ ] Documented with TypeScript interfaces
- [ ] Tested on desktop/tablet/mobile
- [ ] Includes hover/active/disabled states
- [ ] Supports dark mode (color variables)
- [ ] Follows BEM naming convention

---

## Appendix: Design Tokens

### Spacing Scale
```
--s-0: 0px
--s-1: 2px
--s-2: 4px
--s-3: 8px
--s-4: 12px
--s-5: 16px
--s-6: 20px
--s-8: 32px
--s-12: 48px
```

### Duration (Animations)
```
--dur-1: 150ms
--dur-2: 250ms
--dur-3: 300ms
--dur-4: 500ms
```

### Easing
```
--ease-standard: cubic-bezier(0.4, 0, 0.2, 1)
--ease-smooth: cubic-bezier(0.25, 0.46, 0.45, 0.94)
```

### Colors (Primary)
```
--tls-primary-500: #55A1B4 (primary blue)
--tls-orange-500: #F8B044 (warm orange)
--tls-yellow-400: #FFD97D (sun yellow)
--tls-success-base: #4CAF50 (success green)
--tls-danger-base: #EC4848 (danger red)
```

---

**End of Design Patterns Guide**

For questions or updates, contact the design system team.
