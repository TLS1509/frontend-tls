# Core Components Audit — Nested Field Elements & Card Issues

**Critical Priority**: Core components have nested elements that cascade display/layout problems throughout all pages.

---

## Problem Identified by User

> "Il faut d'abord reprendre les components de core, les fields des champs inputs ont un nested elements, pareil pour les elments dans les cards, il faut reprendre tous les components core qui utilisent fields et cards pour cleaner"

Translation: "We need to first go back to the core components, the input fields have nested elements, same for elements in cards, we need to fix all core components that use fields and cards"

---

## Core Components with Nested Field Elements

### 1. **Field Component** (src/components/core/Input.tsx)

Current Structure:
```tsx
<div className="field">                    // Container
  <label className="field__label">        // Label wrapper
    {label}
    <span className="required">*</span>    // Required indicator
  </label>
  {children}                               // Input/textarea/control
  <p className="field__hint|error">        // Helper/error text
```

**Issues**:
- ✅ Structure is clean (semantic)
- ✅ Uses className (no inline styles in Field component itself)
- ⚠️ CSS for `.field`, `.field__label`, `.field__hint`, `.field__error` is in global tls-components.css
- ⚠️ No dedicated Input.css companion file

---

### 2. **Input Component** (src/components/core/Input.tsx)

Current Structure:
```tsx
<span className="input">                     // Wrapper
  {leadingIcon && <span className="input__icon">}   // Icon wrapper
  <input ... />                             // Native input
  {trailingIcon && <span className="input__icon">}  // Icon wrapper
</span>
```

**Issues**:
- ✅ Structure is clean
- ✅ Uses className (no inline styles)
- ⚠️ CSS for `.input` is in global tls-components.css (should have Input.css)
- ⚠️ Nested `<span>` for icons — OK for structure but CSS should be consolidated

---

### 3. **FormGroup Component** (src/components/core/FormGroup.tsx)

Current Structure:
```tsx
<div className="form-group">           // Container
  <label className="form-group__label">    // Label wrapper
    {label}
    {required && <span>*</span>}       // Required indicator
  </label>
  <div className="form-group__control">    // Control wrapper
    {children}                         // Input/control
  </div>
  <p className="form-group__hint|error">   // Helper/error text
</div>
```

**Issues**:
- ✅ Structure is clean
- ✅ Uses className (no inline styles)
- ⚠️ CSS for `.form-group` is in global tls-components.css
- ⚠️ No dedicated FormGroup.css companion file
- ⚠️ Competes with Field component (same concept, different name)

---

### 4. **Card Component** (src/components/core/Card.tsx)

Current Structure:
```tsx
<div className="card">              // Container only
  {children}                        // Content passed in
</div>

// Helper components:
<CardTitle>
<CardDesc>
<CardEyebrow>
<CardFooter>
```

**Issues**:
- ✅ Structure is clean (just a container)
- ✅ Uses className (no inline styles)
- ✅ Provides semantic sub-components
- ⚠️ CSS for `.card` is in global tls-components.css
- ⚠️ No dedicated Card.css file

---

## Root Cause: Global CSS Fragmentation

**Problem**: All core component CSS is scattered in `/src/styles/tls-components.css` instead of being co-located with components.

**Current State**:
```
/src/components/core/Input.tsx       (no CSS)
/src/components/core/FormGroup.tsx   (no CSS)
/src/components/core/Card.tsx        (no CSS)

/src/styles/tls-components.css       (ALL CSS here: 600+ lines, mixed concerns)
```

**Result**:
- Hard to maintain (change one component = search entire CSS file)
- Hard to test (can't ship CSS with component)
- Easy to create duplicate classes (FormGroup vs Field, both use different names)
- Media queries scattered throughout
- Dark mode variants mixed with light mode CSS

---

## Components Using Core Elements (Cascading Issues)

These components wrap Field/Input/Card and inherit any styling problems:

### Cards Wrapping Cards:
- NotificationCard (uses Card wrapper) — **REFACTORED**
- JournalEntryCard (uses Card wrapper) — **REFACTORED**
- ProjectCard (uses Card wrapper) — **REFACTORED**
- MagazineCard (uses Card wrapper) — Next
- StepCard (uses Card wrapper) — Has inline progress width
- All other card components

### Forms Using FormGroup/Field:
- BookingModal (uses FormGroup multiple times)
- PositionnementModal (uses FormGroup)
- SearchWithFilters (uses Input + icons)
- FilterBar (uses Input + controls)
- SearchBar (uses Input)

---

## Refactoring Strategy

### Phase 0: Core Components (CRITICAL - Do First)

**Consolidate Core CSS into Companion Files**:

1. **Create Input.css** (300-400 lines)
   - Move `.input`, `.input__icon`, `.textarea` from tls-components.css
   - Move `.field`, `.field__label`, `.field__hint`, `.field__error` from tls-components.css
   - Consolidate with Input.tsx
   - Responsive design for input sizes

2. **Create FormGroup.css** (150-200 lines)
   - Move `.form-group`, `.form-group__label`, `.form-group__control`, `.form-group__hint`, `.form-group__error` from tls-components.css
   - DECISION: Merge with Input.css OR keep separate?
   - Responsive design for label positioning

3. **Create Card.css** (200-300 lines)
   - Move `.card`, `.card__eyebrow`, `.card__title`, `.card__desc`, `.card__footer` from tls-components.css
   - Add companion styles for CardTitle, CardDesc, etc.
   - Responsive design for card padding

4. **Create Checkbox.css, Radio.css, Switch.css**
   - Move `.check`, `.check__box`, `.radio`, `.radio__box`, `.switch`, `.switch__track` from tls-components.css
   - Each gets its own file for maintainability

5. **Update tls-components.css**
   - Remove moved CSS (saves 500+ lines)
   - Keep only non-component utilities

---

## Action Items (Order of Priority)

### BATCH 0: Core Components (Start Immediately)

✅ 1. **Create Input.css** (Move input + field CSS)
✅ 2. **Create FormGroup.css** (Move form-group CSS)
✅ 3. **Create Card.css** (Move card CSS)
⏳ 4. **Create Checkbox.css** (Move check CSS)
⏳ 5. **Create Radio.css** (Move radio CSS)
⏳ 6. **Create Switch.css** (Move switch CSS)
⏳ 7. **Update tls-components.css** (Remove moved styles)
⏳ 8. **Test all pages** (Ensure no visual regressions)

### BATCH 3: Card Components (After Core Fixed)

✅ 1. NotificationCard — DONE
✅ 2. JournalEntryCard — DONE
✅ 3. ProjectCard — DONE
⏳ 4. MagazineCard
⏳ 5. StepCard (fix inline progress width)
⏳ 6. Others...

---

## Why This Order Matters

**Without fixing core components first**:
- Card components inherit broken nested structure
- Form components have scattered CSS
- Changes to Field affect both FormGroup and Field users
- Dark mode fixes needed in multiple places

**After fixing core components**:
- All card components automatically benefit from clean Card.css
- All form components use consolidated Field/FormGroup CSS
- One place to manage input sizing, spacing, validation states
- Dark mode fixes in one place apply everywhere

---

## Expected Impact

**Before (Current)**:
- 441 inline styles across components
- 600+ lines in tls-components.css (mixed concerns)
- No co-located CSS files for core components
- Nested card/field issues cascade throughout app

**After**:
- 0 inline styles in core components
- ~400 lines in tls-components.css (utilities only)
- Each core component has dedicated CSS file
- Clean separation of concerns
- Maintainable, scalable design system
- All child components benefit from fixes

---

## Files to Create

```
/src/components/core/Input.css           (NEW, ~300 lines)
/src/components/core/FormGroup.css       (NEW, ~150 lines)
/src/components/core/Card.css            (NEW, ~200 lines)
/src/components/core/Checkbox.css        (NEW, ~100 lines)
/src/components/core/Radio.css           (NEW, ~100 lines)
/src/components/core/Switch.css          (NEW, ~100 lines)
```

## Files to Update

```
/src/components/core/Input.tsx           (add imports)
/src/components/core/FormGroup.tsx       (add imports)
/src/components/core/Card.tsx            (add imports)
/src/styles/tls-components.css           (REMOVE input, form-group, card CSS)
```

---

## Next Immediate Action

**Start BATCH 0 with Input.css** (highest impact):
1. Read tls-components.css and extract all `.input*`, `.field*`, `.textarea*` CSS
2. Create Input.css with extracted CSS
3. Add `import './Input.css'` to Input.tsx
4. Test build and responsive design
5. Commit with detailed message

**Timeline**: ~30 minutes per core component file
