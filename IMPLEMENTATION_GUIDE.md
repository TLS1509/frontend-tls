# Implementation Guide — Modern Design System
## Step-by-Step Instructions for Applying Modern Design to All Pages

---

## Quick Start Checklist

For each page, follow this checklist:

- [ ] 1. Replace header with modern hero section
- [ ] 2. Add glass KPI row (if applicable)
- [ ] 3. Update card grids with modern classes
- [ ] 4. Apply button variants (primary, secondary, glass)
- [ ] 5. Test at 375px, 768px, 1024px, 1280px
- [ ] 6. Verify dark mode toggle works
- [ ] 7. Check focus rings on interactive elements
- [ ] 8. Test animations on hover/focus

---

## Section-by-Section Templates

### 1. Hero Sections (Header)

**Before:**
```tsx
<div className="header">
  <h1>Page Title</h1>
  <p>Description</p>
</div>
```

**After:**
```tsx
<section className="tls-editorial-hero">
  <span className="tls-editorial-eyebrow">
    <Icon size={12} /> Category
  </span>
  <h1>Page Title</h1>
  <p className="tls-editorial-summary">
    Compelling description with purpose.
  </p>
  {/* Optional: action buttons */}
  <div style={{ display: 'flex', gap: 'var(--s-3)', marginTop: 'var(--s-4)' }}>
    <Button variant="primary">Primary Action</Button>
    <Button variant="secondary">Secondary</Button>
  </div>
</section>
```

**CSS Applied:**
- Gradient background
- Mesh overlay (animated)
- Glass eyebrow with slide-up animation
- Title with -0.03em letter-spacing
- Summary text in muted color

---

### 2. KPI/Stats Rows

**Before:**
```tsx
<div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)' }}>
  <div><strong>24</strong><p>Active</p></div>
  {/* ... */}
</div>
```

**After:**
```tsx
<section className="tls-kpi-row">
  <div className="tls-kpi">
    <strong>24</strong>
    <span>Active Courses</span>
  </div>
  <div className="tls-kpi">
    <strong>156</strong>
    <span>Hours Completed</span>
  </div>
  <div className="tls-kpi">
    <strong>92%</strong>
    <span>Completion Rate</span>
  </div>
  <div className="tls-kpi">
    <strong>18</strong>
    <span>Certifications</span>
  </div>
</section>
```

**CSS Applied:**
- Glass morphism container
- Hover lift animation (-4px)
- Shadow elevation on hover
- Responsive: 4 col → 2 col (tablet) → 1 col (mobile)
- Staggered entrance animations

---

### 3. Card Grids

**Before:**
```tsx
<div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '16px' }}>
  {items.map(item => (
    <div key={item.id} style={{ /* inline styles */ }}>
      {item.content}
    </div>
  ))}
</div>
```

**After:**
```tsx
<div className="tls-card-grid">
  {items.map((item) => (
    <Card key={item.id} variant="interactive" className="card card--interactive">
      {/* content with proper semantic markup */}
    </Card>
  ))}
</div>
```

**CSS Applied:**
- `grid-template-columns: repeat(auto-fit, minmax(320px, 1fr))`
- Gap: `var(--grid-gap-loose)` (24px)
- Staggered animations (50ms increments)
- Hover: elevation + Y-translate (-4px)
- Dark mode: glass fill opacity adjusted

---

### 4. Buttons

**Before:**
```tsx
<button style={{ background: '#55A1B4', color: 'white', padding: '12px 24px' }}>
  Action
</button>
```

**After:**
```tsx
{/* Primary Button */}
<Button variant="primary" size="md" className="btn btn--primary">
  Primary Action
</Button>

{/* Secondary Button */}
<Button variant="secondary" size="md" className="btn btn--secondary">
  Secondary
</Button>

{/* Glass Button */}
<Button variant="glass" size="md" className="btn btn--glass">
  Alternative
</Button>

{/* Small Button */}
<Button variant="primary" size="sm" className="btn btn--sm">
  Small Action
</Button>

{/* Large Button */}
<Button variant="primary" size="lg" className="btn btn--lg">
  Large Action
</Button>
```

**States Automatically Handled:**
- `:hover` — lifted (-2px), shadow increase
- `:active` — scale (0.98), shadow decrease
- `:focus-visible` — outline 2px primary, offset 2px
- `:disabled` — opacity 50%, cursor not-allowed

---

### 5. Filter Bars

**Before:**
```tsx
<div style={{ display: 'flex', gap: '8px', marginBottom: '16px' }}>
  {filters.map(f => (
    <button key={f} style={{ /* styles */ }} onClick={() => setFilter(f)}>
      {f}
    </button>
  ))}
</div>
```

**After:**
```tsx
<div className="tls-filter-bar">
  {filters.map((filter) => (
    <button
      key={filter}
      className={`tls-filter-chip ${activeFilter === filter ? 'active' : ''}`}
      onClick={() => setActiveFilter(filter)}
    >
      {filter}
    </button>
  ))}
</div>
```

**CSS Applied:**
- Glass border style
- Hover: border color changes to primary-300
- Active: brand background + shadow
- Responsive: flex-wrap on mobile

---

### 6. Progress Bars

**Before:**
```tsx
<div style={{ width: '100%', height: '6px', background: '#E0E6E9' }}>
  <div style={{ width: `${value}%`, background: '#55A1B4' }} />
</div>
```

**After:**
```tsx
<div className="progress-bar">
  <div className="progress-bar__fill" style={{ width: `${value}%` }} />
</div>
<span className="progress-label">{value}%</span>
```

**CSS Applied:**
- Gradient fill (primary-400 → primary-500)
- Shimmer animation
- Box shadow glow (0 0 12px rgba(85,161,180,0.4))
- Smooth transition (var(--dur-3) var(--ease-standard))

---

### 7. Learning Cards (Parcours)

**Before:**
```tsx
<Card style={{ /* many inline styles */ }}>
  <h3>{course.title}</h3>
  <p>{course.description}</p>
</Card>
```

**After:**
```tsx
<Card 
  className="parcours-tile card--interactive"
  data-tone={getTone(index)}
>
  <div className="parcours-tile__header">
    <h3>{course.title}</h3>
    <Badge variant="success">{course.level}</Badge>
  </div>
  <p className="parcours-tile__description">{course.description}</p>
  <div className="parcours-tile__footer">
    <div className="progress-bar">
      <div className="progress-bar__fill" style={{ width: `${course.progress}%` }} />
    </div>
    <span className="progress-label">{course.progress}%</span>
  </div>
</Card>
```

**CSS Applied:**
- Glass morphism (medium blur)
- Tone-specific gradient overlay
- Hover: heavy blur + strong fill + elevated shadow
- Progress bar with shimmer

---

### 8. Coaching/Premium Cards

**Before:**
```tsx
<div style={{ padding: '24px', background: 'white', borderRadius: '12px', border: '1px solid #E0E6E9' }}>
  {/* content */}
</div>
```

**After:**
```tsx
<Card className="coaching-card card--elevated">
  <div className="coaching-card__header">
    <Avatar user={coach} size="lg" />
    <div>
      <h3>{coach.name}</h3>
      <p className="coaching-card__subtitle">{coach.speciality}</p>
    </div>
  </div>
  <div className="coaching-card__body">
    {/* session details */}
  </div>
  <div className="coaching-card__footer">
    <Button variant="primary" size="sm">Book Session</Button>
  </div>
</Card>
```

**CSS Applied:**
- Premium glass (heavy blur + strong fill)
- Inner light effect (glass-ring-standard)
- Gradient overlay (135deg)
- Enhanced shadow (shadow-md + glass-ring)
- Hover: ultra blur + premium fill

---

### 9. Step Indicators

**Before:**
```tsx
<div style={{ display: 'flex', alignItems: 'center' }}>
  <div style={{ /* step number */ }}>1</div>
  <div>{stepContent}</div>
</div>
```

**After:**
```tsx
<div className={`step-indicator ${status}`}>
  <div className="step-number">{stepIndex + 1}</div>
  <div className="step-content">
    <h4>{step.title}</h4>
    <p>{step.description}</p>
  </div>
  <div className="step-actions">
    <Button size="sm">View Details</Button>
  </div>
</div>
```

**CSS Applied:**
- Glass container
- Status-specific styles (.completed, .active)
- Smooth transitions
- Icon changes based on state (circle, checkmark, lock)

---

### 10. Tables

**Before:**
```tsx
<table style={{ /* inline styles */ }}>
  {/* table content */}
</table>
```

**After:**
```tsx
<div style={{ overflowX: 'auto' }}>
  <table>
    <thead>
      <tr>
        <th>Column 1</th>
        <th>Column 2</th>
      </tr>
    </thead>
    <tbody>
      {items.map(item => (
        <tr key={item.id}>
          <td>{item.value1}</td>
          <td>{item.value2}</td>
        </tr>
      ))}
    </tbody>
  </table>
</div>
```

**CSS Applied:**
- Glass container
- Header: surface-sunken background
- Hover rows: surface-muted
- Responsive: wrap on mobile

---

## Implementation Priority

### Phase 1: Core Pages (Week 1)
1. Dashboard
2. LearningPaths
3. LearningPathDetail
4. Coaching

### Phase 2: Secondary Pages (Week 2)
5. Profile
6. Settings
7. Journal
8. Veille

### Phase 3: Feature Pages (Week 3)
9. Messages
10. Notifications
11. Leaderboard
12. Help

### Phase 4: Remaining Pages (Week 4)
13-51. All other pages, following same patterns

---

## Testing Checklist for Each Page

### Visual Testing
- [ ] Hero section displays correctly
- [ ] KPI row (if present) shows 4 items responsive layout
- [ ] Card grids show proper spacing and hover effects
- [ ] Buttons respond to hover/focus/active states
- [ ] Dark mode looks good (use theme toggle)
- [ ] All text has proper contrast

### Responsive Testing
- [ ] Mobile (375px): single column, readable text
- [ ] Tablet (768px): 2-column layout (if applicable)
- [ ] Laptop (1024px): full layout
- [ ] Desktop (1280px): generous whitespace

### Interaction Testing
- [ ] Click buttons: proper feedback
- [ ] Hover cards: lift animation smooth
- [ ] Tab navigation: focus rings visible
- [ ] Dark mode toggle: changes applied instantly
- [ ] Animations: smooth, no jank

### Accessibility Testing
- [ ] Focus rings visible on all interactive elements
- [ ] Tab through page: logical order
- [ ] Keyboard shortcuts work (if present)
- [ ] Color contrast >= WCAG AA
- [ ] No animations on `prefers-reduced-motion`

---

## Common Patterns by Page Type

### Content/Reference Pages
1. Hero with eyebrow + title + description
2. Content sections with proper spacing
3. Sidebar with related links
4. CTA section at bottom

### Data Pages (Dashboard, Learning)
1. Hero (brief)
2. KPI row (4-6 metrics)
3. Card grids (filterable if many items)
4. Sidebar for secondary info

### Settings Pages
1. Hero with title
2. Form sections (grouped)
3. Spacious input fields
4. Save/Cancel buttons at bottom

### Feature Pages (Coaching, Messages)
1. Hero with relevant info
2. Premium glass cards
3. Rich content areas
4. CTA prominently displayed

---

## CSS Class Reference Quick Look

```
Layout:           .tls-editorial-hero, .tls-kpi-row, .tls-card-grid
Components:       .card, .btn, .badge, .progress-bar
Interactive:      .hover-lift, .hover-scale, .hover-glow
States:           .active, .disabled, .loading
Spacing:          var(--s-1) through var(--s-32)
Colors:           var(--tls-primary-*), var(--tls-orange-*), etc.
Glass:            var(--glass-blur-*), var(--glass-fill-*)
Transitions:      var(--transition-standard), var(--transition-elevation)
```

---

## Git Workflow

```bash
# Create feature branch per page
git checkout -b feature/polish-dashboard

# Make changes locally
npm run dev  # Test at http://localhost:5173

# Verify build
npm run build

# Commit with descriptive message
git commit -m "feat: apply modern design system to Dashboard

- Add tls-editorial-hero hero section
- Update KPI row with glass containers
- Apply card-grid layout to quick actions
- Add hover/focus states to all interactive elements
- Test responsive at 375px, 768px, 1280px
- Verify dark mode compatibility"

# Push and create PR
git push origin feature/polish-dashboard
```

---

## FAQ

**Q: Do I need to remove all inline styles?**  
A: Yes, use CSS classes instead. Inline styles conflict with the modern design system.

**Q: What about dark mode?**  
A: All CSS handles it automatically via `@media (prefers-color-scheme: dark)`.

**Q: How do I customize glassmorphism?**  
A: Use `--glass-blur-*`, `--glass-fill-*` tokens. Don't use custom values.

**Q: Can I modify hover animations?**  
A: Use `--transition-*` tokens. Custom animations should be minimal and match the motion system.

**Q: What if a component needs different styling?**  
A: Check `components-modern.css` or `learning-components-modern.css` for patterns. Create a new variant if needed.

**Q: Is dark mode required?**  
A: Yes, it's built-in. Just test it with the theme toggle in the header.

---

## Support

For questions or issues:
1. Check `/components` page (design system showcase)
2. Review `DESIGN_SYSTEM_MODERN_REFACTOR.md` (full documentation)
3. Check `design-system-modern-tokens.css` (all tokens)
4. Review `components-modern.css` (component patterns)

---

**Last Updated**: May 1, 2026  
**Version**: 1.0  
**Ready to Deploy**: Yes ✅
