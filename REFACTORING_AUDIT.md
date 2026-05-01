# Design System Refactoring Audit

## Overview
This document tracks the refactoring progress to ensure all pages use TLS design system tokens and patterns consistently.

## Phase 1: Foundation ✅ COMPLETE
- [x] Add responsive breakpoint tokens (--bp-*)
- [x] Add container size tokens (--container-*)
- [x] Add page padding tokens (--page-padding-*)
- [x] Add section spacing tokens (--section-gap-*)
- [x] Add line-height tokens (--lh-*)
- [x] Add z-index scale (--z-*)
- [x] Create layouts.css with responsive patterns
- [x] Add border width tokens (--border-width-*)
- [x] Add button/form sizing tokens (--btn-*, --input-*, --label-*)
- [x] Add interaction state tokens (--state-*)
- [x] Create utilities.css for text and state patterns

## Phase 2: Page Refactoring 🔄 IN PROGRESS

### HIGH PRIORITY (Most violations)
- [ ] **Dashboard.tsx** - Multiple hardcoded style objects
- [ ] **LearningPaths.tsx** - Grid patterns, spacing, tone classes
- [ ] **LearningPathDetail.tsx** - Step layouts, spacing, padding
- [ ] **Journal.tsx** - Layout, card spacing, filters
- [ ] **JournalFreeEntry.tsx** - CRITICAL: Inline style overhaul (6px, 8px, 9px, 20px hardcoded)
- [ ] **JournalNewEntry.tsx** - Similar pattern to FreeEntry

### MEDIUM PRIORITY
- [ ] **Coaching.tsx** - Layout, spacing, inline styles
- [ ] **Veille.tsx** - Grid layouts, card patterns
- [ ] **VeilleContent.tsx** - Content layout
- [ ] **Magazine.tsx** - Grid and card layouts
- [ ] **VideoTutorial.tsx** - Layout and spacing
- [ ] **ArticleDetail.tsx** - Content spacing

### LOWER PRIORITY
- [ ] **Components.tsx** - Layout patterns
- [ ] **Dossier.tsx** - Grid and layout patterns (9px 20px, 5px 14px hardcoded)
- [ ] **AstucesViewer.tsx** - Layout patterns
- [ ] **ComplementaryContentViewer.tsx** - Layout
- [ ] **FlashcardsViewer.tsx** - Layout
- [ ] **LessonPlayer.tsx** - Layout
- [ ] **MagazineArticle.tsx** - Layout
- [ ] **WeeklyNewsDetail.tsx** - Layout
- [ ] **VideoViewer.tsx** - Layout
- [ ] **ComponentShowcase.tsx** - Already mostly good
- [ ] **ComponentsLayout.tsx** - Already using tokens well

## Issues Found by Category

### Hardcoded Padding Values (Priority: HIGH)
Files with inline padding like `'8px 16px'`, `'9px 20px'`, `'6px 14px'`:
- JournalFreeEntry.tsx: Multiple instances of hardcoded button padding
- Components.tsx: `'2px 8px'`, `'9px 18px'`
- Dossier.tsx: `"9px 20px"`, `"5px 14px"`, `"3px 10px"`
- Journal.tsx: Uses tokens (good)
- Coaching.tsx: Uses tokens (good)

### Hardcoded Margins (Priority: MEDIUM)
- Multiple pages use inline margin values instead of spacing tokens
- Should use --s-* tokens or section classes

### Missing Layout Classes (Priority: MEDIUM)
- Many pages still use inline maxWidth and margin style objects
- Should use `.container-default`, `.container-wide` classes
- Should use `.section` and `.section--*` classes

### Hardcoded Grid Values (Priority: MEDIUM)
- LearningPaths.tsx uses CSS classes for grids (good, but verify responsive)
- LearningPathDetail.tsx: Verify grid responsiveness
- Some pages use inline gridTemplateColumns instead of `.grid-*` classes

### Colors Using Tokens (Priority: LOW - Already Good)
- Most pages already use var(--text), var(--tls-primary-*), etc.
- No major issues found with color tokens

## Recommended Refactoring Strategy

### Step 1: Fix High-Priority Padding Issues
1. Replace hardcoded padding values with token-based approach:
   - `'8px 16px'` → `var(--btn-padding-sm)` or `'var(--s-2) var(--s-4)'`
   - `'9px 20px'` → `var(--btn-padding-md)` or `'var(--s-3) var(--s-5)'`
   - `'6px 14px'` → `'var(--s-2) var(--s-3)'`
   - `'4px 10px'` → `'var(--s-1) var(--s-2)'`

2. Pages to fix first:
   - JournalFreeEntry.tsx (multiple violations)
   - Components.tsx
   - Dossier.tsx

### Step 2: Refactor Layout Structures
1. Replace inline maxWidth/padding with container classes:
   ```jsx
   // Before: style={{ maxWidth: '1000px', margin: '0 auto', padding: 'var(--s-6) var(--s-8)' }}
   // After: className="container-default"
   ```

2. Replace inline section spacing with `.section` classes

### Step 3: Verify Grid Responsiveness
1. Ensure all grids use responsive patterns from layouts.css
2. Test at breakpoints: 375px, 768px, 1024px, 1280px

### Step 4: Add ComponentShowcase Updates
1. Document new layout patterns (container-*, section-*, grid-*)
2. Document new text utilities
3. Document interaction state utilities
4. Document padding token options

## Verification Checklist

After each page is refactored, verify:
- [ ] No hardcoded px values for padding/margin (except in specific components)
- [ ] All layout uses container/grid/section classes
- [ ] All spacing uses --s-* tokens
- [ ] All colors use design system tokens
- [ ] Responsive design works at all breakpoints
- [ ] Focus states use correct focus ring token
- [ ] Disabled/hover states use correct opacity tokens
- [ ] Page is in ComponentShowcase (if applicable)

## Timeline Estimates

- JournalFreeEntry.tsx: 30 mins
- Components.tsx: 20 mins
- Dossier.tsx: 20 mins
- Dashboard.tsx: 45 mins
- LearningPaths.tsx: 45 mins
- LearningPathDetail.tsx: 45 mins
- Journal.tsx: 30 mins
- Coaching.tsx: 30 mins
- Veille.tsx: 40 mins
- VeilleContent.tsx: 30 mins
- Magazine.tsx: 30 mins
- VideoTutorial.tsx: 30 mins
- ArticleDetail.tsx: 30 mins
- Remaining pages: 2-3 hours total

**Total estimated time: ~8-10 hours for full refactoring**

## Progress Tracking

Updated: 2026-05-01
- [x] Added design-tokens.css extensions (border-width, button/form sizing, state opacity)
- [x] Created utilities.css with text and interaction patterns
- [x] Integrated new styles into globals.css import chain
- [ ] Phase 2 refactoring in progress...
