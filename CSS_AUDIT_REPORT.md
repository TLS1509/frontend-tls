# CSS Files Audit & Consolidation Report

## Files Analysis

### ✅ CLEAN (Token-compliant)
- **globals.css** - Base styles, properly using tokens
- **design-tokens.css** - Token definitions (by design has hardcoded values)
- **layouts.css** - NEW - All token-based patterns
- **utilities.css** - NEW - All token-based utilities
- **tls-components.css** - Main components library (81KB)

### ⚠️ NEEDS CLEANUP (Contains hardcoded values)

#### High Priority (Page-specific, many hardcoded values):
1. **dashboard.css** (old version, 8KB)
   - Contains: hardcoded colors (#888, #1a1a1a), padding (32px 48px), margins
   - Status: DEPRECATED - dashboard-modern.css exists
   - **Action**: Can be removed, replaced by dashboard-modern.css

2. **dashboard-modern.css** (8KB)
   - Mostly uses tokens, minor cleanup needed
   - **Status**: In-use for Dashboard.tsx
   - **Action**: Quick cleanup before refactoring Dashboard.tsx

3. **learning-paths.css** (24KB)
   - Extensive hardcoded padding: 4px, 6px, 8px, 10px variants
   - Hardcoded colors for tone variants
   - **Status**: In-use for LearningPaths.tsx
   - **Action**: Major refactoring needed

4. **static-pages.css** (10KB)
   - Some hardcoded padding values
   - **Status**: Used by ArticleDetail, MagazineArticle, etc.
   - **Action**: Cleanup and consolidation

5. **veille.css** (12KB)
   - Used by Veille pages
   - Contains hardcoded spacing
   - **Action**: Cleanup before refactoring Veille

#### Medium Priority (Shared utilities):
6. **app-layout.css** (4KB)
   - Hardcoded padding: 14px 8px, 10px 8px, 1rem 1.5rem
   - **Status**: Used for app layout wrapper
   - **Action**: Convert to token-based

7. **floating-nav.css** (6KB)
   - Hardcoded colors (rgba white), padding variants
   - **Status**: Used by floating navigation
   - **Action**: Cleanup and standardize

#### Lower Priority (Legacy/Feature pages):
8. **feature-pages-modern.css** (5KB)
   - Some hardcoded padding (6px 10px, 8px 14px)
   - **Status**: Legacy, maybe used by feature pages
   - **Action**: Review usage, cleanup or remove

9. **figma-missing-pages.css** (6KB)
   - Hardcoded colors and spacing
   - **Status**: Legacy Figma migration file
   - **Action**: Review and consolidate

10. **pages-index.css** (3KB)
    - Uses fallback syntax: var(--s-4, 1.5rem)
    - **Status**: Index/menu page
    - **Action**: Cleanup, remove fallbacks (tokens exist)

11. **components-showcase.css** (1KB)
    - Clean, minimal styling
    - **Status**: For ComponentShowcase page
    - **Action**: May need expansion for new tokens

## Consolidation Strategy

### Recommended CSS Architecture
```
globals.css (imports in order):
  ├─ design-tokens.css (all token definitions)
  ├─ layouts.css (layout patterns, responsive)
  ├─ utilities.css (text, state, accessibility)
  ├─ tls-components.css (all component styles)
  └─ [specific page overrides if needed]
```

### Files to Remove
- **dashboard.css** → Replaced by dashboard-modern.css
- **figma-missing-pages.css** → Legacy, consolidate into tls-components.css or feature pages

### Files to Cleanup & Keep
- **dashboard-modern.css** → Quick token conversion
- **learning-paths.css** → Major refactor with token-based padding system
- **static-pages.css** → Minor cleanup
- **app-layout.css** → Convert padding to tokens
- **floating-nav.css** → Standardize colors and padding
- **veille.css** → Cleanup before Veille refactor

### Files to Review
- **feature-pages-modern.css** → Check if still used
- **pages-index.css** → Cleanup fallback syntax

## Impact Analysis

### CSS File Sizes (Current)
| File | Size | Hardcoded Values |
|------|------|------------------|
| tls-components.css | 81 KB | Minimal (expected) |
| learning-paths.css | 24 KB | Many (TO FIX) |
| design-tokens.css | 15 KB | Expected |
| static-pages.css | 10 KB | Few |
| dashboard-modern.css | 8 KB | Few |
| dashboard.css | 8 KB | Many (REMOVE) |
| veille.css | 12 KB | Some |

### Expected Savings After Cleanup
- **Removing dashboard.css**: -8 KB
- **Consolidating figma-missing-pages.css**: -6 KB
- **Token-ifying duplicates**: Potential -5-10 KB via deduplication

---

## Phase 1: Immediate Actions

### Priority 1 (This session):
1. [ ] Update ComponentShowcase.tsx to show all new tokens
2. [ ] Add CSS documentation section to showcase
3. [ ] Clean dashboard-modern.css
4. [ ] Remove dashboard.css (no longer needed)
5. [ ] Verify app-layout.css tokens

### Priority 2 (During page refactoring):
1. [ ] Refactor learning-paths.css with token-based system
2. [ ] Update static-pages.css
3. [ ] Cleanup veille.css
4. [ ] Update floating-nav.css

### Priority 3 (Post-refactoring):
1. [ ] Consolidate figma-missing-pages.css
2. [ ] Review feature-pages-modern.css
3. [ ] Clean up pages-index.css

---

## Component-Level Analysis

### ✅ Components with Clean Inline Styles
- Most components using `var(--*)` tokens correctly
- Minor issues (only 9 instances of hardcoded values):
  - Celebration.tsx: margin: '2px 0 0' (negligible)
  - Documentation components: Using rem/px in documentation examples (expected)
  - HeroSection.tsx: One rgba value (acceptable for specific effect)

### Impact on Page Refactoring
- Components are clean, problems are in CSS and page layout files
- Focus refactoring effort on:
  1. Page-level CSS files (dashboard-modern, learning-paths, etc.)
  2. Page component inline styles
  3. Layout and spacing patterns

---

## Verification Checklist

- [ ] All imports in globals.css verified
- [ ] No circular dependencies in CSS
- [ ] Token definitions complete and non-duplicated
- [ ] Hardcoded values documented (where necessary)
- [ ] Responsive breakpoints consistent across files
- [ ] Z-index scale respected across all files
- [ ] Color roles used instead of raw hex values
- [ ] Spacing uses token system (--s-*, section gaps, container padding)

