# Page Refactoring Patterns - Quick Reference

This guide shows the patterns used to refactor pages from CSS-class-based to component-based architecture.

---

## Pattern 1: Editorial Hero Section

### Before (CSS Classes)
```tsx
<div className="tls-page">
  <section className="tls-editorial-hero">
    <span className="tls-editorial-eyebrow"><Sparkles size={12} /> Magazine TLS</span>
    <h1>Magazine</h1>
    <p className="tls-editorial-summary">Description text...</p>
  </section>
</div>
```

### After (HeroSection Component)
```tsx
import { HeroSection } from '../components/patterns/HeroSection';

<div style={{ minHeight: '100vh', background: 'var(--surface)', display: 'flex', flexDirection: 'column' }}>
  <HeroSection
    icon={Sparkles}
    title="Magazine"
    description="Description text..."
    gradient="primary"
  />
  {/* Content below */}
</div>
```

### Available Gradients
- `"primary"` - Blue gradient (default)
- `"orange"` - Orange to yellow gradient
- `"success"` - Green gradient
- `"danger"` - Red to orange gradient

---

## Pattern 2: Grid Layouts (CardGrid)

### Before (CSS Grid Classes)
```tsx
<section style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 'var(--s-4)' }}>
  {items.map((item) => <Card key={item.id}>{item}</Card>)}
</section>
```

### After (CardGrid Component)
```tsx
import { CardGrid } from '../components/patterns/CardGrid';

<CardGrid layout="default" gapSize="md">
  {items.map((item) => <Card key={item.id}>{item}</Card>)}
</CardGrid>
```

### Layout Options
- `"compact"` - 2 columns (tablets), 1 on mobile
- `"default"` - 3 columns (desktop), 2 on tablet, 1 on mobile
- `"feature"` - 4 columns (desktop), 3 on tablet, 1 on mobile

### Gap Sizes
- `"sm"` - var(--s-2)
- `"md"` - var(--s-3) (default)
- `"lg"` - var(--s-4)

---

## Pattern 3: Stat/KPI Cards

### Before (CSS Classes)
```tsx
<section className="tls-kpi-row">
  <div className="tls-kpi"><strong>12</strong><span>Entries this month</span></div>
  <div className="tls-kpi"><strong>4</strong><span>Active themes</span></div>
</section>
```

### After (Card Components)
```tsx
const KpiCard: React.FC<{ label: string; value: string }> = ({ label, value }) => (
  <Card variant="elevated" padding={true} style={{ textAlign: 'center' }}>
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--s-2)' }}>
      <p style={{ fontSize: 'var(--t-h3)', fontWeight: 700, color: 'var(--tls-primary-500)', margin: 0 }}>
        {value}
      </p>
      <p style={{ fontSize: 'var(--t-body-sm)', color: 'var(--text-muted)', margin: 0 }}>
        {label}
      </p>
    </div>
  </Card>
);

// Usage:
<div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: 'var(--s-4)', marginBottom: 'var(--s-8)' }}>
  <KpiCard label="Entries this month" value="12" />
  <KpiCard label="Active themes" value="4" />
</div>
```

---

## Pattern 4: Chat/Message Bubbles

### Before (CSS Classes)
```tsx
<div className="help-chat">
  <div className="help-chat__messages">
    {messages.map((m) => (
      <div className={`help-chat__bubble help-chat__bubble--${m.role}`}>
        <div>{m.content}</div>
      </div>
    ))}
  </div>
</div>
```

### After (Inline Styles in Flex Container)
```tsx
<Card variant="elevated" padding={true} style={{ display: 'flex', flexDirection: 'column', height: '100%', gap: 0 }}>
  <div style={{ flex: 1, overflowY: 'auto', padding: 'var(--s-6)', display: 'flex', flexDirection: 'column', gap: 'var(--s-4)' }}>
    {messages.map((m) => (
      <div key={m.id} style={{ display: 'flex', flexDirection: 'column', alignItems: m.role === 'bot' ? 'flex-start' : 'flex-end', gap: 'var(--s-2)' }}>
        <div style={{
          maxWidth: '70%',
          padding: 'var(--s-3) var(--s-4)',
          borderRadius: 'var(--r-lg)',
          background: m.role === 'bot' ? 'var(--tls-primary-50)' : 'var(--tls-primary-500)',
          color: m.role === 'bot' ? 'var(--text)' : 'white',
          fontSize: 'var(--t-body)',
        }}>
          {m.content}
        </div>
      </div>
    ))}
  </div>
</Card>
```

---

## Pattern 5: Form Inputs and Fields

### Before (CSS Classes)
```tsx
<div className="tls-form">
  <div className="tls-field">
    <label>Field Label</label>
    <input type="text" placeholder="..." />
  </div>
</div>
```

### After (Inline Styles + Input Component)
```tsx
import { Input } from '../components/core/Input';

<div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--s-6)' }}>
  <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--s-2)' }}>
    <label style={{ fontSize: 'var(--t-body-sm)', fontWeight: 600, color: 'var(--text)' }}>
      Field Label
    </label>
    <textarea
      rows={4}
      placeholder="..."
      style={{
        padding: 'var(--s-3)',
        borderRadius: 'var(--r-md)',
        border: '1px solid var(--border)',
        background: 'var(--surface)',
        fontSize: 'var(--t-body)',
        color: 'var(--text)',
        fontFamily: 'inherit',
        fontWeight: 400,
      }}
    />
  </div>
</div>
```

---

## Pattern 6: List Items with Actions

### Before (CSS Classes)
```tsx
<section className="tls-stack">
  {entries.map((entry) => (
    <Card className="tls-journal-card">
      <div className="tls-row">
        <h3>{entry.title}</h3>
        <span className="tls-journal-card__meta">{entry.date}</span>
      </div>
      <div className="tls-journal-card__actions">
        <Button>Action 1</Button>
      </div>
    </Card>
  ))}
</section>
```

### After (Flex Layout + Card)
```tsx
<div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--s-4)' }}>
  {entries.map((entry) => (
    <Card key={entry.id} variant="elevated" padding={true}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--s-4)' }}>
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 'var(--s-4)' }}>
          <div>
            <h3 style={{ fontSize: 'var(--t-h4)', fontWeight: 700, color: 'var(--text)', margin: '0 0 var(--s-2)' }}>
              {entry.title}
            </h3>
            <p style={{ fontSize: 'var(--t-caption)', color: 'var(--text-muted)', margin: 0 }}>
              {entry.date}
            </p>
          </div>
        </div>

        {/* Content */}
        <p style={{ fontSize: 'var(--t-body)', color: 'var(--text-muted)', lineHeight: 1.6, margin: 0 }}>
          {entry.excerpt}
        </p>

        {/* Actions */}
        <div style={{ display: 'flex', gap: 'var(--s-3)', paddingTop: 'var(--s-2)' }}>
          <Button variant="secondary" size="sm">Action 1</Button>
          <Button variant="ghost" size="sm">Action 2</Button>
        </div>
      </div>
    </Card>
  ))}
</div>
```

---

## Pattern 7: Filter Pills

### Before (CSS Classes)
```tsx
<div className="tls-actions">
  <span className="tls-pill"><Sparkles size={14} /> Toutes</span>
  <span className="tls-pill"><BookOpen size={14} /> Category 1</span>
</div>
```

### After (Button Elements with State)
```tsx
const [filterType, setFilterType] = useState<string>('all');

<div style={{ display: 'flex', gap: 'var(--s-2)', flexWrap: 'wrap' }}>
  {[
    { key: 'all', icon: Sparkles, label: 'Toutes' },
    { key: 'cat1', icon: BookOpen, label: 'Category 1' },
  ].map(({ key, icon: Icon, label }) => (
    <button
      key={key}
      onClick={() => setFilterType(key)}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 'var(--s-1)',
        padding: 'var(--s-2) var(--s-3)',
        borderRadius: 'var(--r-pill)',
        border: filterType === key ? '2px solid var(--tls-primary-500)' : '1px solid var(--border)',
        background: filterType === key ? 'var(--tls-primary-50)' : 'transparent',
        color: filterType === key ? 'var(--tls-primary-600)' : 'var(--text-muted)',
        fontSize: 'var(--t-caption)',
        fontWeight: 500,
        cursor: 'pointer',
        transition: 'all var(--dur-2)',
      }}
      onMouseEnter={(e) => {
        if (filterType !== key) {
          (e.currentTarget as HTMLButtonElement).style.background = 'var(--surface-muted)';
        }
      }}
      onMouseLeave={(e) => {
        if (filterType !== key) {
          (e.currentTarget as HTMLButtonElement).style.background = 'transparent';
        }
      }}
    >
      <Icon size={14} />
      {label}
    </button>
  ))}
</div>
```

---

## Pattern 8: Metadata Pills (Icon + Text)

### Before (CSS Classes)
```tsx
<div className="parcours-tile__chip">
  <Users size={14} />
  <span>25 Students</span>
</div>
```

### After (MetaPillGroup Component)
```tsx
import { MetaPillGroup } from '../components/ui/MetaPillGroup';

<MetaPillGroup
  items={[
    { icon: <Users size={16} />, text: '25 Students' },
    { icon: <Clock size={16} />, text: '4 weeks' },
  ]}
  layout="horizontal"
  gap="md"
/>
```

---

## Common Styling Values

### Spacing (var(--s-*))
```
var(--s-1) = 4px
var(--s-2) = 8px
var(--s-3) = 12px
var(--s-4) = 16px
var(--s-6) = 24px
var(--s-8) = 32px
```

### Typography (var(--t-*))
```
var(--t-display-lg) - Large display
var(--t-h1) - Heading 1
var(--t-h3) - Heading 3
var(--t-h4) - Heading 4
var(--t-body) - Body default
var(--t-body-sm) - Body small
var(--t-caption) - Caption
var(--t-micro) - Micro
```

### Border Radius (var(--r-*))
```
var(--r-xs) = 4px
var(--r-md) = 8px
var(--r-lg) = 12px
var(--r-xl) = 16px
var(--r-2xl) = 20px
var(--r-pill) = 9999px
```

### Colors (var(--tls-*))
```
var(--tls-primary-50, 100, 200, 500, 600, 700, 900)
var(--tls-orange-50, 100, 200, 500, 600, 700, 900)
var(--tls-yellow-100, 400, 600, 900)
var(--tls-success-500, 600, 700
var(--text) - Primary text
var(--text-muted) - Secondary text
var(--text-soft) - Tertiary text
var(--surface) - Surface background
var(--surface-muted) - Muted surface
var(--border) - Border color
```

---

## Checklist for Page Refactoring

- [ ] Remove all `className` attributes with `tls-*` classes
- [ ] Import needed components: `HeroSection`, `CardGrid`, `Card`, `Button`, etc.
- [ ] Replace hero sections with `HeroSection` component
- [ ] Replace grid layouts with `CardGrid` or flex containers
- [ ] Replace form sections with proper input components
- [ ] Convert filter pills to stateful button elements
- [ ] Use inline styles with TLS tokens (var(--*))
- [ ] Verify responsive behavior at 375px, 768px, 1280px
- [ ] Ensure no CSS class dependencies remain
- [ ] Test build: `npm run build`
- [ ] Verify no TypeScript errors
- [ ] Screenshot comparison with original design

---

## Performance Tips

1. **Use Container Queries** (when available) instead of hardcoded breakpoints
2. **Memoize Complex Renders** with `useMemo` for expensive calculations
3. **Use Proper Key Props** in lists to avoid unnecessary re-renders
4. **Lazy Load Images** with `loading="lazy"` attribute
5. **Preload Critical Assets** for above-the-fold content

---

## Accessibility Considerations

- Always provide `aria-label` for icon-only buttons
- Use semantic HTML (`<button>`, `<input>`, `<label>`)
- Ensure color contrast ratios meet WCAG AA standards
- Use `type="button"` for non-form buttons
- Provide focus states for all interactive elements
- Test with keyboard navigation (Tab key)

---

## Common Mistakes to Avoid

❌ **Mixing CSS classes with inline styles**  
✅ Use only inline styles or component props

❌ **Hardcoding color values**  
✅ Always use CSS tokens: `var(--tls-primary-500)`

❌ **Forgetting to style hover/focus states**  
✅ Add `onMouseEnter/Leave` or use CSS transitions

❌ **Inconsistent spacing between components**  
✅ Use spacing tokens consistently (var(--s-*))

❌ **Not testing responsive layout**  
✅ Test at multiple breakpoints: 375px, 768px, 1280px

---

**Last Updated**: April 30, 2026  
**Applicable Pages**: Groups C, D, E (remaining refactoring work)
