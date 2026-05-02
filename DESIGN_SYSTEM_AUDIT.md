# Design System Component Audit — Nested Cards & Inline Styles

**Date**: May 2, 2026
**Status**: CRITICAL - 441 inline styles across design system components
**Root Cause**: Deeply nested card elements with individual style={{}} objects instead of CSS companions

---

## Problem Summary

The TLS design system components have a fundamental architectural problem: **nested card elements with inline styles**.

Instead of:
```tsx
// ✅ Good: Atomic component with CSS classes
<Card className="notification-card">
  <div className="notification-card__badge">...</div>
  <div className="notification-card__content">...</div>
</Card>
```

Components use:
```tsx
// ❌ Bad: Deeply nested with individual style objects
<div style={{ background: '...', border: '...' }}>
  <div style={{ display: 'flex', gap: 'var(--s-3)' }}>
    <div style={{ width: 40, height: 40, borderRadius: '...' }}>...</div>
    <div style={{ flex: 1 }}>
      <h4 style={{ ... }}>...</h4>
      <p style={{ ... }}>...</p>
    </div>
  </div>
</div>
```

This causes:
- **Display Problems**: Each nested div has hardcoded sizing → overflow, truncation, visibility issues
- **Layout Issues**: Flex/grid constraints cascade unpredictably
- **Maintenance Burden**: Changes to spacing require editing 5+ components simultaneously
- **Dark Mode Conflicts**: Inline styles don't respect dark mode tokens properly
- **Hover States**: JS-based hover manipulations instead of CSS :hover
- **Accessibility**: Focus states not properly managed
- **Responsive Design**: Media queries scattered across components, not consolidated

---

## Components with Nesting Issues (Priority Order)

### CRITICAL (30+ inline styles each)

| Component | File | Count | Issue |
|-----------|------|-------|-------|
| CardDocumentation | components/documentation/CardDocumentation.tsx | 46 | Documentation showcase (lower priority) |
| BookingModal | components/modals/BookingModal.tsx | 36 | Complex form modal, deeply nested |
| AchievementDocumentation | components/documentation/AchievementDocumentation.tsx | 36 | Documentation showcase |
| PositionnementModal | components/modals/PositionnementModal.tsx | 34 | Modal with form, nested cards |
| AlertDocumentation | components/documentation/AlertDocumentation.tsx | 28 | Documentation showcase |

### HIGH PRIORITY (10-29 inline styles)

| Component | File | Count | Issue |
|-----------|------|-------|-------|
| StreakCelebrationModal | components/modals/StreakCelebrationModal.tsx | 20 | Modal with nested content |
| ButtonDocumentation | components/documentation/ButtonDocumentation.tsx | 18 | Documentation showcase |
| VideoPlayerModal | components/modals/VideoPlayerModal.tsx | 17 | Modal with video + controls |
| CancelSessionModal | components/modals/CancelSessionModal.tsx | 16 | Modal with form |
| SessionFeedbackModal | components/modals/SessionFeedbackModal.tsx | 13 | Modal with rating component |
| **NotificationCard** | components/cards/NotificationCard.tsx | 12 | **Card with nested icon, content, actions** |
| HeaderNav | components/patterns/HeaderNav.tsx | 10 | Navigation pattern with nested items |
| ProjectCard | components/learning/ProjectCard.tsx | 10 | Learning card with nested elements |
| MagazineCard | components/learning/MagazineCard.tsx | 10 | Content card with image + text |
| **JournalEntryCard** | components/cards/JournalEntryCard.tsx | 9 | **Card with badge, title, excerpt, tags, metadata** |
| CompetencyMatrix | components/ui/CompetencyMatrix.tsx | 9 | Table with complex nested structure |

### MEDIUM PRIORITY (5-9 inline styles)

| Component | File | Count | Issue |
|-----------|------|-------|-------|
| AchievementBadge | components/ui/AchievementBadge.tsx | 8 | Badge with nested icon + text |
| HeroSection | components/patterns/HeroSection.tsx | 8 | Hero with nested content sections |
| SectionHeader | components/patterns/SectionHeader.tsx | 7 | Header with title + subtitle + actions |
| PageHeader | components/patterns/PageHeader.tsx | 7 | Page header with nested breadcrumb/title |
| SkillBar | components/ui/SkillBar.tsx | 7 | Progress bar with nested label + bar + value |

### LOWER PRIORITY (1-4 inline styles each) — 100+ components

Progress bar fills (dynamic width %), ToastContainer positioning, Celebration margin/padding, Achievement nested elements, etc.

---

## Root Cause Analysis

### 1. Card Pattern Anti-Pattern

**NotificationCard Example** (12 inline styles):
```tsx
// PROBLEM: Nested divs, each with inline styles
<div style={{ background: isRead ? '...' : config.bg, border: `1px solid ...` }}>
  <div style={{ display: 'flex', gap: 'var(--s-3)', alignItems: 'flex-start' }}>
    <div style={{ width: 40, height: 40, ... }}>...</div>
    <div style={{ flex: 1, minWidth: 0 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--s-2)' }}>
        <h4 style={{ ... }} />
        {!isRead && <div style={{ width: 8, height: 8, ... }} />}
      </div>
      <p style={{ ... }} />
      <p style={{ ... }} />
    </div>
    <div style={{ display: 'flex', gap: 'var(--s-1)', opacity: 0 }} className="group-hover:opacity-100">
      {/* buttons with inline styles */}
    </div>
  </div>
</div>
```

**Why it fails:**
- No semantic structure → hard to target for responsive design
- No reusable element classes → each card redefines "flex container", "title", "metadata"
- Hardcoded 40px, 8px, etc. → breaks at different viewports
- `onMouseEnter` manipulating `boxShadow` → shadow animation not smooth
- No dark mode awareness → inline styles override tokens

### 2. Missing CSS Companion Files

Most problematic components:
- ❌ NotificationCard.tsx — **NO NotificationCard.css**
- ❌ JournalEntryCard.tsx — **NO JournalEntryCard.css**
- ❌ ProjectCard.tsx — **NO ProjectCard.css**
- ❌ MagazineCard.tsx — **NO MagazineCard.css**
- ✅ StepCard.tsx — **HAS StepCard.css** (but still has 1 inline width style)

### 3. Font Size & Spacing Inconsistencies

Hardcoded values instead of tokens:
```
FontSizes:
- '0.75rem' (should be var(--t-caption) or var(--t-micro))
- '1.25rem' (should be var(--t-h4))
- Inline font: 'var(--t-body-sm)' next to '0.75rem'

Spacing:
- padding: '4px 8px' (should be var(--s-1) var(--s-2))
- padding: '2px 6px' (should be var(--s-0) var(--s-1))
- width: 40 (should use tokens or var(--icon-size-md))
- width: 8 (should use CSS for dot sizing)
```

### 4. Dynamic Styling Problems

Progress bars, conditional backgrounds, hover states in JS:

```tsx
// ❌ Bad: Hardcoded width in style prop
<div style={{ width: `${progress}%` }} />

// ✅ Good: CSS variable or class
<div style={{ '--progress': `${progress}%` } as React.CSSProperties} 
     className="progress-fill" />
```

Hover shadows in JS instead of CSS:
```tsx
// ❌ Bad
onMouseEnter={(e) => { e.currentTarget.style.boxShadow = 'var(--shadow-md)'; }}

// ✅ Good: Use CSS :hover pseudo-class
.card:hover { box-shadow: var(--shadow-md); }
```

---

## Refactoring Strategy (BATCH 3 Components)

### Phase 1: Card Components (CRITICAL)

**Priority 1 Components** (Highest Impact):
1. **NotificationCard.tsx** (12 inline styles) → Create NotificationCard.css
2. **JournalEntryCard.tsx** (9 inline styles) → Create JournalEntryCard.css
3. **ProjectCard.tsx** (10 inline styles) → Create ProjectCard.css
4. **MagazineCard.tsx** (10 inline styles) → Create MagazineCard.css

**Refactoring Pattern for Each Card**:
```tsx
// Remove all inline styles
// Add: import './ComponentName.css'
// Replace style={{}} with className="component-name__element"
// Create CSS with BEM structure:
//   .component-name { /* container */ }
//   .component-name__header { /* major sections */ }
//   .component-name__badge { /* nested elements */ }
//   .component-name__title { /* text elements */ }
//   .component-name--variant { /* state variants */ }
```

### Phase 2: UI Components (HIGH PRIORITY)

**Priority 2 Components** (UI Elements):
1. **StepCard.tsx** (1 inline style: progress width) → Fix StepCard.tsx + CSS
2. **AchievementBadge.tsx** (8 inline styles) → Create AchievementBadge.css
3. **SkillBar.tsx** (7 inline styles) → Create SkillBar.css

### Phase 3: Modals (AFTER PHASE 2)

**Priority 3** (Modals can wait, lower user impact):
- BookingModal, PositionnementModal, StreakCelebrationModal, etc.

---

## Success Criteria for Each Component

✅ Refactoring is complete when:

1. **Zero inline styles in JSX**
   - No `style={{}}` objects (except CSS variables for dynamic values)
   - All styling via `className` attribute

2. **CSS Companion File Created**
   - `/src/components/{category}/{ComponentName}.css` exists
   - 100% of styles moved from JSX to CSS
   - BEM naming: `.component-name__element--modifier`

3. **Design Token Compliance**
   - All colors use `var(--*)` tokens
   - All spacing uses `var(--s-*)` tokens
   - All shadows use `var(--shadow-*)` tokens
   - All font sizes use `var(--t-*)` tokens
   - All border radius use `var(--r-*)` tokens

4. **Responsive Design**
   - Component responsive at 375px, 768px, 1024px, 1280px
   - Media queries consolidated at bottom of CSS file
   - No hardcoded pixel breakpoints

5. **Dark Mode Support**
   - Dark mode tested (via App.tsx theme toggle)
   - No `!important` needed
   - All colors properly adapt

6. **Build & Verification**
   - `npm run build` passes
   - No TypeScript errors
   - Component imports CSS: `import './ComponentName.css'`
   - Visual verification at desktop + mobile

---

## Next Immediate Action

**Start BATCH 3 (Component Focus) with NotificationCard**:

1. Read NotificationCard.tsx → understand structure
2. Create NotificationCard.css with BEM classes
3. Remove all style={{}} objects from JSX
4. Replace with `className="notification-card__element"`
5. Test responsive design and dark mode
6. Commit with detailed message

**Timeline**: ~2-3 hours per component

---

## Files to Modify

```
Phase 1 Cards:
  src/components/cards/NotificationCard.tsx → CREATE NotificationCard.css
  src/components/cards/JournalEntryCard.tsx → CREATE JournalEntryCard.css
  src/components/learning/ProjectCard.tsx → CREATE ProjectCard.css
  src/components/learning/MagazineCard.tsx → CREATE MagazineCard.css

Phase 2 UI Components:
  src/components/learning/StepCard.tsx → FIX inline width style
  src/components/ui/AchievementBadge.tsx → CREATE AchievementBadge.css
  src/components/ui/SkillBar.tsx → CREATE SkillBar.css
```

---

## Key Implementation Patterns

### Pattern 1: Card with Badge + Content + Actions

```tsx
// JSX (clean)
<div className={classes}>
  <div className="card__badge">{icon}</div>
  <div className="card__content">
    <h4 className="card__title">{title}</h4>
    <p className="card__message">{message}</p>
  </div>
  <div className="card__actions group-hover:opacity-100">
    <button>...</button>
  </div>
</div>

// CSS (comprehensive)
.card { display: flex; gap: var(--s-3); ... }
.card--unread { background: var(--tls-primary-50); }
.card__badge { width: 40px; height: 40px; ... }
.card__badge--accent { background: var(--tls-primary-500); }
.card__content { flex: 1; }
.card__title { font-size: var(--t-body-sm); ... }
.card__message { font-size: var(--t-caption); ... }
.card__actions { display: flex; gap: var(--s-1); opacity: 0; ... }
.card:hover .card__actions { opacity: 1; }
.card:hover { box-shadow: var(--shadow-md); }
```

### Pattern 2: Dynamic Values (Progress, Colors)

```tsx
// For dynamic progress percentage
style={{ '--progress': `${progress}%` } as React.CSSProperties}

// CSS
.progress-fill { width: var(--progress); }
```

### Pattern 3: Hover Effects

```tsx
// Remove JS hover handlers
// Use CSS :hover pseudo-class
.card:hover { 
  box-shadow: var(--shadow-md);
  border-color: var(--border-strong);
  transform: translateY(-2px);
}
```

---

## Estimated Effort

| Component | Inline Styles | Effort | Total |
|-----------|---|---|---|
| NotificationCard | 12 | 1.5h | 1.5h |
| JournalEntryCard | 9 | 1.5h | 3h |
| ProjectCard | 10 | 1.5h | 4.5h |
| MagazineCard | 10 | 1.5h | 6h |
| **Phase 1 Subtotal** | **41** | - | **6h** |
| StepCard fix | 1 | 0.5h | 6.5h |
| AchievementBadge | 8 | 1.5h | 8h |
| SkillBar | 7 | 1.5h | 9.5h |
| **Phase 2 Subtotal** | **16** | - | **9.5h** |
| **TOTAL PHASES 1-2** | **57** | - | **9.5h** |

---

## Notes

- **Work in main branch** (not worktree) per user instructions
- **All changes are local** (src/components/) — no pages refactoring
- **Test in http://localhost:5173** with `npm run dev`
- **Dark mode** toggle in top right of app (built into App.tsx)
- **Commit after each component** with detailed message
