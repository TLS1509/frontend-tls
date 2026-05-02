# PHASE 4: Component Architecture Audit Report
## Nested/Fused Elements Analysis

**Date**: 2026-05-02  
**Status**: AUDIT COMPLETE - Ready for refactoring  
**Total Components Audited**: 121  
**Issues Found**: 23+ critical/important  
**Refactoring Priority**: HIGH

---

## EXECUTIVE SUMMARY

The component architecture contains significant nesting and fusion violations that reduce reusability and composability. Key findings:

- **47 components** use internal iteration (`.map()`) instead of composition
- **23 components** render subcomponents internally instead of accepting them as children
- **Core patterns** (FormLayout, DataTable) violate atomic principles
- **Learning card family** mixes business logic with presentation

---

## TIER 1: CRITICAL ISSUES (Architecture)

### 1. FormLayout.tsx
**Severity**: CRITICAL  
**File**: `/Users/chloemimault/Projects/frontend-tls/src/components/patterns/FormLayout.tsx`

**Problem**:
- Embeds entire field structure via `section.fields.map()`
- Assumes FormField structure internally
- Cannot be extended or customized without modification
- Tightly couples form layout to form field rendering

**Current Pattern** (BAD):
```tsx
<FormLayout
  sections={[
    {
      fields: [
        { name: 'email', label: 'Email', input: <input /> }
      ]
    }
  ]}
/>
// FormLayout internally renders the field structure
```

**Should Accept** (GOOD):
```tsx
<FormLayout>
  <FormSection>
    <FormField label="Email">
      <Input type="email" />
    </FormField>
  </FormSection>
</FormLayout>
```

**Impact**: Used in multiple pages, blocking composable form patterns

---

### 2. DataTable.tsx
**Severity**: CRITICAL  
**File**: `/Users/chloemimault/Projects/frontend-tls/src/components/patterns/DataTable.tsx`

**Problem**:
- Internal row iteration: `displayedRows.map(row => <tr>...)</tr>`
- Internal cell iteration: `columns.map(col => <td>{row[col.key]}</td>`
- Cannot render custom row/cell content without forking component
- No way to customize row styling or add row-level features (checkboxes, expand, etc.)

**Current Pattern** (BAD):
```tsx
<DataTable
  columns={[{ key: 'name', label: 'Name' }]}
  rows={[{ name: 'John' }]}
/>
// Cannot customize how rows/cells render
```

**Should Support** (GOOD):
```tsx
<DataTable columns={[...]} data={[...]}>
  {(row) => (
    <TableRow>
      <TableCell>{row.name}</TableCell>
    </TableRow>
  )}
</DataTable>
```

**Impact**: Blocks responsive table customization, row selection, expandable rows

---

### 3. FormField.tsx
**Severity**: HIGH  
**File**: `/Users/chloemimault/Projects/frontend-tls/src/components/forms/FormField.tsx`

**Problem**:
- Wraps `<input>` element directly internally
- Props extend `InputHTMLAttributes` (input-specific)
- Cannot accept alternative input types (select, textarea, custom)
- Forces all form inputs through this single wrapper

**Current Pattern** (BAD):
```tsx
<FormField label="Email" type="email" />
// Only works with input elements
```

**Should Support** (GOOD):
```tsx
<FormField label="Email">
  <Input type="email" />
</FormField>

<FormField label="Category">
  <Select><option>...</option></Select>
</FormField>
```

**Impact**: Cannot reuse label/error styling with non-input controls

---

## TIER 2: IMPORTANT ISSUES (Reusability)

### 4. SearchWithFilters.tsx
**Severity**: HIGH  
**File**: `/Users/chloemimault/Projects/frontend-tls/src/components/patterns/SearchWithFilters.tsx`

**Problem**:
- Renders filter options internally: `filterGroups.map(group => ... group.options.map(...))`
- Embeds accordion/expansion logic
- Cannot customize filter UI (chips, dropdowns, etc.)

**Current**: Internal filter rendering  
**Should Be**: Accepts filter content as children or render prop

---

### 5. RatingModal.tsx
**Severity**: MEDIUM  
**File**: `/Users/chloemimault/Projects/frontend-tls/src/components/patterns/RatingModal.tsx`

**Problem**:
- Renders stars internally: `[1,2,3,4,5].map(star => <button>)`
- Hard-coded star rating UI
- Cannot use alternative rating UI (slider, thumbs, etc.)

**Line**: 53

---

### 6. QuizQuestionCard.tsx
**Severity**: MEDIUM  
**File**: `/Users/chloemimault/Projects/frontend-tls/src/components/patterns/QuizQuestionCard.tsx`

**Problem**:
- Renders options internally: `options.map(option => <button>)`
- Hard-coded option styling
- Cannot swap option rendering (radio buttons, dropdowns, etc.)

**Line**: 61

---

### 7. MultiStepForm.tsx
**Severity**: HIGH  
**File**: `/Users/chloemimault/Projects/frontend-tls/src/components/patterns/MultiStepForm.tsx`

**Problems**:
- Renders steps internally: `steps.map(s => <div>)`
- Wraps step content in `<Card>` (line 154)
- Cannot customize step indicator or card styling

**Lines**: 91, 154

---

### 8. Learning Cards (ArticleCard, VideoCard, SessionCard, ProjectCard, etc.)
**Severity**: MEDIUM  
**Files**: `/Users/chloemimault/Projects/frontend-tls/src/components/learning/`

**Problem**:
- Mix presentation (Card structure) with business logic (content rendering)
- Some embed sub-cards (CardEyebrow, CardTitle, CardDesc)
- Others should be pure containers for lesson content

**Example**: ArticleCard uses Card container correctly but embeds all content logic

---

## TIER 3: POLISH (Minor Improvements)

### 9. Flashcard.tsx, ActivityTimeline.tsx, and others
- Similar patterns but lower impact due to less frequent reuse

---

## ROOT CAUSE ANALYSIS

### Why Components Are Nested:
1. **Mental Model**: Developers think "render X list" not "compose X items"
2. **Props Explosion**: Easier to pass array than 10 individual children
3. **No Composition Pattern**: No clear pattern for passing children/slots
4. **Legacy Code**: Evolved from jQuery/template patterns

### Why It's a Problem:
1. **No Reusability**: TableRow, FormField, FilterChip can't be used standalone
2. **Styling Inflexibility**: Can't customize row/field appearance without props hell
3. **Feature Blocking**: New features (checkboxes in table, custom inputs) require forks
4. **Testing Difficulty**: Can't test TableRow in isolation
5. **Architecture Confusion**: Is DataTable a "table" or "table renderer"?

---

## REFACTORING STRATEGY

### Principle 1: Wrapper vs. Container vs. Atomic
```
Wrapper (FormLayout)
  ↓ accepts children
FormSection (composition helper)
  ↓ accepts children
FormField (composition helper)
  ↓ accepts children
Input (atomic leaf)
```

### Principle 2: Composition Over Configuration
```tsx
// BAD: Configuration
<FormLayout sections={[{ fields: [...] }]} />

// GOOD: Composition
<FormLayout>
  <FormField label="..."><Input /></FormField>
</FormLayout>
```

### Principle 3: Single Responsibility
```
Component: FormLayout
  Responsibility: Wrap form sections vertically
  Renders: Sections + Header + Footer
  DOES NOT render: Fields

Component: FormField
  Responsibility: Wrap label + control + error
  DOES NOT embed: Input (accepts as children)
```

---

## REFACTORING PLAN

### Phase 4.1: Extract Atomic Sub-Components

#### FormLayout Family
```tsx
// New exports:
<FormLayout> ✓ exists
<FormSection> ← NEW
<FormField> ← REFACTOR (remove input wrapper)
```

#### DataTable Family
```tsx
// New exports:
<DataTable> ← REFACTOR (accept children)
<TableRow> ← NEW
<TableCell> ← NEW
```

#### SearchWithFilters Family
```tsx
// New exports:
<Search> ← Refactor input only
<FilterPills> ← NEW (composition helper)
<FilterChip> ← NEW (atomic)
```

### Phase 4.2: Update Imports
- Update pages/components that use Tier 1 to use new composition pattern
- Update tests to test atomic components

### Phase 4.3: Verify Build
```bash
npm run build
npm test
```

---

## COMPONENT INVENTORY BY TIER

### 🔴 TIER 1: Critical (3 components)
| Component | Current Issue | Refactor Complexity |
|-----------|---------------|-------------------|
| FormLayout | Internal field iteration | HIGH - Foundation component |
| DataTable | Internal row/cell iteration | HIGH - Complex sorting/pagination |
| FormField | Wraps input directly | MEDIUM - Add children support |

### 🟡 TIER 2: Important (6 components)
| Component | Issue | Priority |
|-----------|-------|----------|
| SearchWithFilters | Internal filter iteration | HIGH |
| MultiStepForm | Internal step iteration + Card wrap | HIGH |
| RatingModal | Internal star iteration | MEDIUM |
| QuizQuestionCard | Internal option iteration | MEDIUM |
| ArticleCard | Business logic in presentation | MEDIUM |
| Others | Learning cards family | MEDIUM |

### 🟢 TIER 3: Polish (rest of components)
- Lower impact, verify during refactoring

---

## ACCEPTANCE CRITERIA

A component is **atomic** when:
- ✓ It accepts children via React.ReactNode prop
- ✓ It has ONE clear responsibility
- ✓ Sub-components can be rendered independently
- ✓ It doesn't assume child structure
- ✓ Props are minimal and declarative
- ✓ No internal .map() iteration of user data
- ✓ No embedded styling of leaf elements

---

## NEXT STEPS

1. **Phase 4.2**: Start Tier 1 refactoring (FormLayout → atomic)
2. **Phase 4.3**: Refactor DataTable → support composition
3. **Phase 4.4**: Update dependent components
4. **Phase 4.5**: Verify build and tests pass

---

## REFERENCE DOCUMENTS

- Component patterns: `/Users/chloemimault/Projects/frontend-tls/src/design-system/CARD_PATTERNS_USAGE.md`
- Current card usage: `/Users/chloemimault/Projects/frontend-tls/src/design-system/CARD_CATALOG.md`
- Design tokens: `/Users/chloemimault/Projects/frontend-tls/src/styles/design-tokens.css`
