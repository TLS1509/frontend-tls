# 🎨 TLS DESIGN SYSTEM v1.0 — Complete Reference

**Source of Truth** for The Learning Society Learning App  
Last updated: 2026-04-30  
**Status**: Production Ready ✅

---

## 📋 TABLE DES MATIÈRES

1. [Design Tokens](#design-tokens)
2. [Core Components](#core-components)
3. [UI Components](#ui-components)
4. [Layout Components](#layout-components)
5. [Patterns](#patterns)
6. [Usage Guidelines](#usage-guidelines)
7. [Spacing & Alignment](#spacing--alignment)

---

## 🎯 DESIGN TOKENS

All tokens defined in `/src/styles/design-tokens.css` — use `var(--*)` syntax.

### COLOR SYSTEM

**Brand Colors** (Primary Identity)
```css
/* Teal Blue — Primary */
--tls-primary-50:  #E8F4F7
--tls-primary-100: #DCEBEF
--tls-primary-200: #B9D7DF
--tls-primary-300: #96C3CF
--tls-primary-400: #73AFBF
--tls-primary-500: #55A1B4  /* Base */
--tls-primary-600: #4A8FA1
--tls-primary-700: #3D7786
--tls-primary-800: #2F5F6A
--tls-primary-900: #1F3E45

/* Orange — Secondary (warm actions, celebration) */
--tls-orange-50:  #FFF3EB
--tls-orange-100: #FDDCC7
--tls-orange-200: #FCBB93
--tls-orange-300: #F59A5F
--tls-orange-400: #F18A4C
--tls-orange-500: #ED843A  /* Base */
--tls-orange-600: #C06920
--tls-orange-700: #8F5017
--tls-orange-800: #5E3710
--tls-orange-900: #3B2109

/* Yellow — Accent (success, highlights) */
--tls-yellow-50:  #FFF9EE
--tls-yellow-100: #FFECC8
--tls-yellow-200: #FFD791
--tls-yellow-300: #FFC15A
--tls-yellow-400: #F8B044  /* Base */
--tls-yellow-500: #DF9E3D
--tls-yellow-600: #C68D36
--tls-yellow-700: #AE7B30
--tls-yellow-800: #956A29
--tls-yellow-900: #7C5822
```

**Neutrals** (Ink Scale)
```css
--tls-ink-0:    #FFFFFF      (Pure white)
--tls-ink-25:   #FAFBFC      (Background)
--tls-ink-50:   #F5F8F8      (Muted bg)
--tls-ink-100:  #EEF2F4      (Sunken surface)
--tls-ink-200:  #E0E6E9      (Borders, dividers)
--tls-ink-300:  #C8D2D6      (Placeholder text)
--tls-ink-400:  #9AA8AE      (Soft text)
--tls-ink-500:  #6B7981      (Muted text)
--tls-ink-600:  #535B62      (Secondary text)
--tls-ink-700:  #3A474B      (Strong text)
--tls-ink-800:  #2A3538      (Primary text)
--tls-ink-900:  #252B37      (Body text)
--tls-ink-950:  #12181C      (Almost black)
```

**Semantic Colors**
```css
--tls-success-bg:   #E8F2F0
--tls-success-fg:   #335A56
--tls-success-base: #9DBEBA

--tls-warning-bg:   #FFF9EE
--tls-warning-fg:   #7C5822
--tls-warning-base: #F8B044

--tls-danger-bg:    #FEF4F0
--tls-danger-fg:    #8F2A0E
--tls-danger-base:  #F28559

--tls-info-bg:      #E8F4F7
--tls-info-fg:      #1F3E45
--tls-info-base:    #55A1B4
```

**Semantic Roles** (Use these in components!)
```css
--bg:             var(--tls-ink-25)        /* Page background */
--surface:        var(--tls-ink-0)         /* Card/panel background */
--surface-muted:  var(--tls-ink-50)        /* Muted cards */
--surface-sunken: var(--tls-ink-100)       /* Recessed surfaces */
--border:         rgba(37, 43, 55, 0.08)   /* Light borders */
--border-strong:  rgba(37, 43, 55, 0.14)   /* Prominent borders */
--text:           var(--tls-ink-900)       /* Primary text */
--text-muted:     var(--tls-ink-600)       /* Secondary text */
--text-soft:      var(--tls-ink-500)       /* Soft text (captions) */
--text-inverse:   var(--tls-ink-0)         /* Text on dark bg */
--brand:          var(--tls-primary-500)   /* Brand color */
--brand-ink:      var(--tls-primary-700)   /* Brand text */
```

### TYPOGRAPHY

**Fonts**
```css
--font-display: "League Spartan"  (Headings, display text)
--font-body:    "Nunito"          (Body text, UI)
--font-mono:    "JetBrains Mono"  (Code)
```

**Type Scale** (Responsive)
```css
/* Display (editorial, hero only) */
--t-display-2xl: clamp(3.5rem, 6vw + 1rem, 6.5rem)    /* 56 → 104 */
--t-display-xl:  clamp(2.75rem, 4vw + 1rem, 4.5rem)   /* 44 → 72 */
--t-display-lg:  clamp(2.25rem, 2.5vw + 1rem, 3.25rem) /* 36 → 52 */

/* Headings */
--t-h1:        2.25rem    /* 36px */
--t-h2:        1.75rem    /* 28px */
--t-h3:        1.375rem   /* 22px */
--t-h4:        1.125rem   /* 18px */

/* Body */
--t-body-lg:   1.125rem   /* 18px, large body */
--t-body:      1rem       /* 16px, standard */
--t-body-sm:   0.9375rem  /* 15px, small body */
--t-caption:   0.8125rem  /* 13px, captions */
--t-micro:     0.6875rem  /* 11px, micro labels */
```

### SPACING (4pt base unit)

All spacing from 4px base:
```css
--s-0:  0
--s-1:  4px
--s-2:  8px
--s-3:  12px
--s-4:  16px
--s-5:  20px
--s-6:  24px
--s-8:  32px
--s-10: 40px
--s-12: 48px
--s-16: 64px
--s-20: 80px
--s-24: 96px
--s-32: 128px
```

**Usage**: `padding: var(--s-4)`, `margin: var(--s-6)`, etc.

### RADIUS (Rounded corners)

```css
--r-xs:   4px
--r-sm:   6px
--r-md:   10px
--r-lg:   14px
--r-xl:   20px
--r-2xl:  28px
--r-pill: 999px  (completely rounded)
```

### SHADOWS (Elevation)

```css
--shadow-xs:    0 1px 2px rgba(18, 24, 28, 0.04)
--shadow-sm:    0 1px 2px rgba(18, 24, 28, 0.05), 0 1px 3px rgba(18, 24, 28, 0.04)
--shadow-md:    0 4px 12px -2px rgba(18, 24, 28, 0.08), 0 2px 4px rgba(18, 24, 28, 0.04)
--shadow-lg:    0 16px 40px -12px rgba(18, 24, 28, 0.14), 0 4px 8px rgba(18, 24, 28, 0.04)
--shadow-xl:    0 28px 72px -20px rgba(18, 24, 28, 0.22), 0 8px 16px rgba(18, 24, 28, 0.06)
--shadow-brand: 0 10px 30px -10px rgba(85, 161, 180, 0.45)
--shadow-warm:  0 10px 30px -10px rgba(237, 132, 58, 0.35)
```

### GLASS EFFECTS

For frosted glass morphism:
```css
--glass-blur:          saturate(180%) blur(20px)
--glass-fill:          rgba(255, 255, 255, 0.55)
--glass-fill-strong:   rgba(255, 255, 255, 0.72)
--glass-border:        rgba(255, 255, 255, 0.6)
--glass-ring:          inset 0 1px 0 rgba(255,255,255,0.8), inset 0 -1px 0 rgba(255,255,255,0.25)
```

**Usage**:
```css
.glass-element {
  backdrop-filter: var(--glass-blur);
  -webkit-backdrop-filter: var(--glass-blur);
  background: var(--glass-fill);
  border: 1px solid var(--glass-border);
  box-shadow: var(--glass-ring);
  border-radius: var(--r-lg);
}
```

### MOTION

**Easing Functions**
```css
--ease-standard:   cubic-bezier(0.2, 0, 0, 1)        (standard)
--ease-emphasized: cubic-bezier(0.2, 0, 0, 1.15)     (emphasized)
--ease-entrance:   cubic-bezier(0, 0, 0.2, 1)        (entrance)
--ease-exit:       cubic-bezier(0.4, 0, 1, 1)        (exit)
```

**Durations**
```css
--dur-1: 120ms
--dur-2: 200ms
--dur-3: 320ms
--dur-4: 520ms
--dur-5: 800ms
```

**Usage**:
```css
transition: background var(--dur-2) var(--ease-standard);
```

### GRADIENTS (Curated)

```css
--g-hero:       linear-gradient(120deg, #3D7786 0%, #55A1B4 30%, #ED843A 75%, #F8B044 100%)
--g-cool-deep:  radial-gradient(circle at 0% 0%, #55A1B4 0%, #2F5F6A 60%, #1F3E45 100%)
--g-cool-soft:  linear-gradient(180deg, #E8F4F7 0%, #FFFFFF 100%)
--g-warm:       linear-gradient(135deg, #ED843A 0%, #F8B044 100%)
--g-warm-soft:  linear-gradient(180deg, #FFF3EB 0%, #FFF9EE 100%)
--g-text:       linear-gradient(120deg, #55A1B4 0%, #ED843A 50%, #F8B044 100%)
--g-glass:      linear-gradient(135deg, rgba(255,255,255,0.7), rgba(255,255,255,0.35))
```

---

## 💎 CORE COMPONENTS

### Button

Primary action component. Must appear on every page.

**Variants**:
- `primary` (default) — Main CTA, one per screen
- `warm` — Post-success/celebration
- `secondary` — Alternative actions
- `ghost` — Tertiary (cancel, dismiss)
- `brand-ghost` — Soft brand
- `destructive` — Delete/irreversible
- `glass` — On tinted/gradient surfaces only
- `link` — Inline text links

**Sizes**: `sm` | `md` (default) | `lg` | `xl`

**Props**:
```tsx
<Button
  variant="primary"
  size="md"
  leading Icon={<Icon />}
  trailing Icon={<Icon />}
  iconOnly={false}
  loading={false}
  fullWidth={false}
  type="button"
  disabled={false}
  onClick={() => {}}
>
  Action Label
</Button>
```

**Examples**:
```tsx
{/* Main CTA */}
<Button variant="primary" size="lg">Start Learning</Button>

{/* Secondary action */}
<Button variant="secondary">Cancel</Button>

{/* With icon */}
<Button variant="primary" leadingIcon={<Play size={16} />}>Play Lesson</Button>

{/* Loading state */}
<Button variant="primary" loading>Saving...</Button>

{/* Link style */}
<Button variant="link">Learn more →</Button>

{/* Full width */}
<Button variant="primary" fullWidth>Get Started</Button>

{/* Icon only (must have aria-label) */}
<Button variant="ghost" iconOnly aria-label="Close" onClick={onClose}>
  <X size={20} />
</Button>
```

---

### Card

Main content unit. Groups related information.

**Variants**:
- `default` — Bordered, no shadow
- `feature` — No border, shadow-sm, more padding
- `interactive` — Hover lift effect (translateY + shadow-md)
- `glass` — Glass fill, only on tinted/gradient backgrounds

**Sub-components**:
- `<CardEyebrow>` — Small label above title
- `<CardTitle>` — Main heading (h3)
- `<CardDesc>` — Description text
- `<CardFooter>` — Bottom action area

**Props**:
```tsx
<Card
  variant="feature"
  as="article"  // semantic element (div | article | section)
  className=""
  children
/>
```

**Examples**:
```tsx
{/* Standard card */}
<Card variant="feature">
  <CardTitle>Learn Prompt Engineering</CardTitle>
  <CardDesc>Master the art of effective AI prompts</CardDesc>
  <CardFooter>
    <Button variant="primary">Start</Button>
  </CardFooter>
</Card>

{/* Interactive card (hovers) */}
<Card variant="interactive" onClick={() => navigate('/course')}>
  <CardEyebrow>Module 1</CardEyebrow>
  <CardTitle>Advanced Techniques</CardTitle>
</Card>

{/* Glass card on gradient background */}
<div style={{ background: 'var(--g-hero)' }}>
  <Card variant="glass">
    Content here
  </Card>
</div>
```

---

### Input

Form input component.

**Props**:
```tsx
<Input
  type="text|email|password|number"
  placeholder="Enter text..."
  value={state}
  onChange={(e) => setState(e.target.value)}
  disabled={false}
  aria-label="Input label"
/>
```

---

## 🎯 UI COMPONENTS

### Badge

Small label component for tagging, status, tones.

**Common Props**:
```tsx
<Badge variant="primary|warm|sun|success|danger|info">Label</Badge>
```

### Avatar

User profile picture.

**Props**:
```tsx
<Avatar
  src="/path/to/image.jpg"
  alt="User name"
  fallback="AB"  // initials
  size="sm|md|lg"
/>
```

### Alert

Information/warning/error message.

**Variants**: `info` | `warning` | `danger` | `success`

**Props**:
```tsx
<Alert variant="warning" onClose={() => {}}>
  Message here
</Alert>
```

### Modal

Dialog/popup component.

**Props**:
```tsx
<Modal isOpen={true} onClose={() => {}}>
  <Modal.Header>Title</Modal.Header>
  <Modal.Body>Content</Modal.Body>
  <Modal.Footer>
    <Button>Action</Button>
  </Modal.Footer>
</Modal>
```

### ProgressBar

Linear progress indicator.

**Props**:
```tsx
<ProgressBar
  value={65}       // 0-100
  size="sm|md|lg"
  fill="primary|warm|success"
/>
```

### ProgressRing

Circular progress indicator.

**Props**:
```tsx
<ProgressRing
  value={75}
  size="sm|md|lg"
  fill="primary"
/>
```

### Tabs

Tabbed content switcher.

**Props**:
```tsx
<Tabs defaultValue="tab1">
  <Tabs.List>
    <Tabs.Trigger value="tab1">Tab 1</Tabs.Trigger>
    <Tabs.Trigger value="tab2">Tab 2</Tabs.Trigger>
  </Tabs.List>
  <Tabs.Content value="tab1">Content 1</Tabs.Content>
  <Tabs.Content value="tab2">Content 2</Tabs.Content>
</Tabs>
```

### Steps

Step indicator for processes.

**Props**:
```tsx
<Steps
  steps={[
    { label: 'Step 1', status: 'done' },
    { label: 'Step 2', status: 'current' },
    { label: 'Step 3', status: 'pending' },
  ]}
  currentStep={2}
/>
```

### Breadcrumb

Navigation path indicator.

**Props**:
```tsx
<Breadcrumb
  items={[
    { label: 'Home', href: '/' },
    { label: 'Courses', href: '/courses' },
    { label: 'Current', href: '#' },
  ]}
/>
```

### DropdownMenu

Contextual menu.

**Props**:
```tsx
<DropdownMenu>
  <DropdownMenu.Trigger asChild>
    <Button variant="ghost">Menu</Button>
  </DropdownMenu.Trigger>
  <DropdownMenu.Content>
    <DropdownItem onClick={() => {}}>Option 1</DropdownItem>
    <DropdownItem onClick={() => {}}>Option 2</DropdownItem>
    <DropdownSeparator />
    <DropdownItem variant="destructive">Delete</DropdownItem>
  </DropdownMenu.Content>
</DropdownMenu>
```

### Search

Search input with icon.

**Props**:
```tsx
<Search
  placeholder="Search courses..."
  value={query}
  onChange={(value) => setQuery(value)}
/>
```

### Skeleton

Loading placeholder.

**Props**:
```tsx
<Skeleton count={3} height="20px" />
```

### EmptyState

No-data state.

**Props**:
```tsx
<EmptyState
  icon={<Database size={48} />}
  title="No courses yet"
  description="Start exploring our curriculum"
  action={<Button>Browse Courses</Button>}
/>
```

### Toast

Temporary notification.

**Props**:
```tsx
<Toast
  type="success|error|info"
  message="Action completed!"
  duration={3000}
/>
```

### Pagination

Page navigation.

**Props**:
```tsx
<Pagination
  currentPage={1}
  totalPages={10}
  onChange={(page) => setPage(page)}
/>
```

### Stepper

Numbered step indicator.

**Props**:
```tsx
<Stepper
  currentStep={2}
  totalSteps={5}
  labels={['Info', 'Details', 'Review', 'Payment', 'Done']}
/>
```

### Achievement / Medal / CompetenceBadge

Special badges for achievements/gamification.

**Props**:
```tsx
<Achievement
  title="Expert Badge"
  icon={<Trophy />}
  earned={true}
  earnedDate="2024-01-15"
  progress={100}
/>
```

### StatCard

Statistics display card.

**Props**:
```tsx
<StatCard
  label="Hours Learned"
  value="86"
  icon={<Clock />}
  tone="primary|warm|sun"
/>
```

### MetaPill / MetaItem

Metadata chip/label.

**Props**:
```tsx
<MetaPill icon={<User size={14} />} text="25 Students" />
<MetaItem label="Duration" value="4 weeks" />
```

### ParcoursCard

Learning path card.

**Props**:
```tsx
<ParcoursCard
  title="Learn AI Basics"
  description="Master generative AI fundamentals"
  instructor="Marie Dubois"
  level="Intermédiaire"
  duration="6 weeks"
  progress={65}
  tone="primary"
/>
```

### ActionCard

Card with action-focused layout.

**Props**:
```tsx
<ActionCard
  icon={<Play />}
  title="Start Lesson"
  description="Introduction to Prompt Engineering"
  action={<Button>Play</Button>}
/>
```

### UserInfo

User information display.

**Props**:
```tsx
<UserInfo
  name="Alexandre"
  email="alex@example.com"
  avatar="/avatar.jpg"
  role="Formateur"
/>
```

---

## 🎛️ LAYOUT COMPONENTS

### Sidebar

Navigation sidebar.

**Props**:
```tsx
<Sidebar>
  <Sidebar.Group label="Main">
    <NavItem href="/dashboard">Dashboard</NavItem>
    <NavItem href="/courses">Courses</NavItem>
  </Sidebar.Group>
  <Sidebar.Group label="Learning">
    <NavItem href="/coaching">Coaching</NavItem>
  </Sidebar.Group>
</Sidebar>
```

---

## 📐 PATTERNS

### Responsive Grid Layout

For grids of cards, use CSS Grid with responsive columns:

```css
.grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: var(--s-4);
}

/* Or fixed columns: */
.grid--4col {
  grid-template-columns: repeat(4, 1fr);
}

@media (max-width: 1024px) {
  .grid--4col {
    grid-template-columns: repeat(3, 1fr);
  }
}

@media (max-width: 768px) {
  .grid--4col {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 512px) {
  .grid--4col {
    grid-template-columns: 1fr;
  }
}
```

### Hero Section (Page Header)

Recommended pattern for page headers:

```tsx
<div style={{
  background: 'linear-gradient(135deg, var(--tls-primary-500), var(--tls-orange-500))',
  color: 'white',
  padding: 'var(--s-12)',
}}>
  <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
    <h1 style={{ fontSize: 'var(--t-h1)', margin: '0 0 var(--s-2)' }}>
      Page Title
    </h1>
    <p style={{ fontSize: 'var(--t-body)', opacity: 0.92 }}>
      Description text
    </p>
  </div>
</div>
```

### Card Grid

Cards in a responsive grid:

```tsx
<div style={{
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
  gap: 'var(--s-4)',
  padding: 'var(--s-8)',
}}>
  {items.map(item => (
    <Card key={item.id} variant="interactive">
      {/* card content */}
    </Card>
  ))}
</div>
```

### Two-Column Layout (Main + Sidebar)

```tsx
<div style={{
  display: 'grid',
  gridTemplateColumns: '1fr 320px',
  gap: 'var(--s-8)',
  maxWidth: '1200px',
  margin: '0 auto',
  padding: 'var(--s-8)',
}}>
  {/* Main content */}
  <div>Main Content</div>
  
  {/* Sidebar */}
  <aside style={{ position: 'sticky', top: 'var(--s-8)' }}>
    <Card variant="feature">Sidebar Content</Card>
  </aside>
</div>
```

### Tone-Aware Styling

For tone-specific card/section styling:

```tsx
<div style={{
  padding: 'var(--s-6)',
  borderRadius: 'var(--r-lg)',
  background: 'var(--tls-primary-50)',  // tone-specific
  border: '1px solid var(--tls-primary-200)',
  color: 'var(--tls-primary-900)',
}}>
  Tone-specific content
</div>
```

---

## 📖 USAGE GUIDELINES

### DO ✅

- **Use semantic HTML**: `<Card as="article">`, `<button>` for actions
- **Prefer tokens over hardcoded values**: `var(--s-4)` not `16px`
- **Stack spacing consistently**: Use `var(--s-*)` scale exclusively
- **Use role colors for UI**: Borders, surfaces, text use `--surface`, `--border`, `--text`
- **Apply brand colors for emphasis**: Primary, orange, yellow for CTAs and highlights
- **Mobile-first responsive**: Design for 375px first, then add breakpoints
- **Accessibility always**: `aria-label`, `aria-live`, semantic elements, color contrast

### DON'T ❌

- **Hardcode colors**: Never use `#FF0000`, always use tokens
- **Mix sizing systems**: Never mix `px` with `--s-*` scale
- **Add arbitrary classes**: Use component variants instead
- **Over-shadow**: Maximum `--shadow-lg` for depth
- **Too many gradients**: Max 2 gradients per page header
- **Ignored breakpoints**: Always test 375px, 768px, 1280px
- **Motion without purpose**: Only animate interactions, not just for show

---

## 📏 SPACING & ALIGNMENT

### Vertical Rhythm

All vertical spacing uses `--s-*` scale for consistency:

```tsx
{/* Header */}
<h1 style={{ marginBottom: 'var(--s-2)' }}>Title</h1>

{/* Subtext */}
<p style={{ marginBottom: 'var(--s-6)' }}>Subtitle</p>

{/* Content section */}
<div style={{ marginTop: 'var(--s-8)' }}>Section Content</div>
```

### Horizontal Alignment

- **Page max-width**: 1200px
- **Padding sides**: `var(--s-8)` on desktop, `var(--s-6)` on tablet, `var(--s-4)` on mobile
- **Gap between columns**: `var(--s-6)` to `var(--s-8)`
- **Gap between items**: `var(--s-3)` to `var(--s-4)`

### Common Layouts

**Container with padding**:
```tsx
<div style={{
  maxWidth: '1200px',
  margin: '0 auto',
  padding: 'var(--s-8)',
}}>
  Content
</div>
```

**Flex row**:
```tsx
<div style={{
  display: 'flex',
  gap: 'var(--s-4)',
  alignItems: 'center',
}}>
  <div>Item 1</div>
  <div>Item 2</div>
</div>
```

**Flex column**:
```tsx
<div style={{
  display: 'flex',
  flexDirection: 'column',
  gap: 'var(--s-6)',
}}>
  <div>Item 1</div>
  <div>Item 2</div>
</div>
```

---

## 🚀 IMPLEMENTATION CHECKLIST

When building a new page or feature:

- [ ] Use semantic HTML (`<article>`, `<section>`, `<nav>`)
- [ ] All spacing from `--s-*` tokens
- [ ] All font sizes from `--t-*` tokens
- [ ] All colors from design palette (never hardcoded)
- [ ] All radius from `--r-*` tokens
- [ ] All shadows from `--shadow-*` tokens
- [ ] Responsive tested at 375px, 768px, 1280px
- [ ] Accessibility: WCAG AA standard (contrast, labels, focus)
- [ ] Motion: Transitions use `--dur-*` and `--ease-*`
- [ ] Components reused instead of duplicated
- [ ] No hardcoded CSS imports (component-based)

---

## 📚 RELATED DOCUMENTATION

- **Components Showcase**: `/src/pages/Components.tsx` — Live component gallery
- **Design Tokens**: `/src/styles/design-tokens.css` — Token source
- **Component Styles**: `/src/styles/tls-components.css` — Component CSS
- **Learning App Figma**: Reference design inspiration folder

---

**Last Updated**: 2026-04-30  
**Maintainer**: Design System Team  
**Status**: Production ✅
