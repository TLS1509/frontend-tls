# PHASE 4: Detailed Component Audit
## Component-by-Component Analysis

**Generated**: 2026-05-02  
**Total Components**: 121  
**Scanned For**: Nested elements, internal iteration, fused responsibilities

---

## TIER 1: CRITICAL ARCHITECTURE VIOLATIONS

### FormLayout.tsx ❌
**File**: `/Users/chloemimault/Projects/frontend-tls/src/components/patterns/FormLayout.tsx`  
**Lines with Issues**: 89 (section.fields.map)  
**Atomicity Score**: 2/10  

**Current Structure**:
```tsx
interface FormField {
  name: string;
  label: string;
  input: React.ReactNode;
  error?: string;
}

interface FormSection {
  fields: FormField[];
}

// Usage
<FormLayout sections={[{ fields: [...] }]} />
// Internally renders: label + input + error
```

**Violations**:
- ❌ Assumes FormField structure internally
- ❌ Renders label outside of FormField component
- ❌ Cannot inject custom label or error styling
- ❌ Breaks composition: user can't use FormField standalone
- ❌ Hard to test FormField in isolation

**Refactoring Required**: YES  
**Complexity**: HIGH (foundation component)  
**Estimated Impact**: HIGH (used in 5+ pages)

**Solution**:
```tsx
// Create FormSection component
<FormLayout>
  <FormSection title="Personal Info">
    <FormField label="Name" error={nameError}>
      <Input value={name} onChange={setName} />
    </FormField>
    <FormField label="Email">
      <Input type="email" />
    </FormField>
  </FormSection>
</FormLayout>
```

---

### DataTable.tsx ❌
**File**: `/Users/chloemimault/Projects/frontend-tls/src/components/patterns/DataTable.tsx`  
**Lines with Issues**: 149 (rows.map), 165 (columns.map)  
**Atomicity Score**: 3/10  

**Current Structure**:
```tsx
// User passes raw data
<DataTable columns={[...]} rows={[...]} />

// DataTable internally:
// 1. Maps rows: displayedRows.map(row => <tr>
// 2. Maps cells: columns.map(col => <td>row[col.key]</td>)
```

**Violations**:
- ❌ Cannot render custom row content (checkboxes, expand buttons)
- ❌ Cannot customize individual cells (formatting, icons)
- ❌ Cannot have row-level interactions (drag, select, expand)
- ❌ TableRow and TableCell cannot be used independently
- ❌ Hard to add responsive design per-row

**Refactoring Required**: YES  
**Complexity**: HIGH (complex internal state)  
**Estimated Impact**: CRITICAL (data display pattern)

**Solution**:
```tsx
// Export TableRow, TableCell
<DataTable columns={[...]} data={[...]}>
  {(row) => (
    <TableRow>
      <TableCell>{row.id}</TableCell>
      <TableCell>{row.name}</TableCell>
    </TableRow>
  )}
</DataTable>

// Or simple usage:
<DataTable columns={[...]} rows={[...]} defaultRenderer />
```

---

### FormField.tsx ❌
**File**: `/Users/chloemimault/Projects/frontend-tls/src/components/forms/FormField.tsx`  
**Lines with Issues**: 76 (hardcoded input element)  
**Atomicity Score**: 4/10  

**Current Structure**:
```tsx
interface FormFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  leadIcon?: React.ReactNode;
}

// Usage: assumes Input
<FormField label="Email" type="email" />
// Internally renders: <input type="email" />
```

**Violations**:
- ❌ Props extend InputHTMLAttributes (input-specific)
- ❌ Cannot accept Select, Textarea, custom components
- ❌ Label/error styling cannot be reused with non-input fields
- ❌ Embeds input rendering

**Refactoring Required**: YES  
**Complexity**: MEDIUM  
**Estimated Impact**: MEDIUM (form building)

**Solution**:
```tsx
interface FormFieldProps {
  label?: string;
  error?: string;
  leadIcon?: React.ReactNode;
  children: React.ReactNode;
}

<FormField label="Email">
  <Input type="email" />
</FormField>

<FormField label="Category">
  <Select>
    <option>...</option>
  </Select>
</FormField>

<FormField label="Notes">
  <Textarea />
</FormField>
```

---

## TIER 2: IMPORTANT REUSABILITY VIOLATIONS

### SearchWithFilters.tsx 🟡
**File**: `/Users/chloemimault/Projects/frontend-tls/src/components/patterns/SearchWithFilters.tsx`  
**Lines with Issues**: 114-129 (input), 135-170 (filter groups.map)  
**Atomicity Score**: 4/10  

**Current Structure**:
```tsx
interface FilterGroup {
  id: string;
  label: string;
  options: FilterOption[];
}

// Usage: passes filter structure
<SearchWithFilters
  filterGroups={[
    { id: 'difficulty', label: 'Difficulty', options: [...] }
  ]}
/>
// Internally renders: accordion + chips
```

**Violations**:
- ❌ Internal filter option iteration (map)
- ❌ Cannot customize filter UI (chips, buttons, dropdown)
- ❌ Accordion logic is internal, not composable
- ❌ Cannot use FilterChip independently

**Refactoring Required**: YES  
**Complexity**: MEDIUM  
**Estimated Impact**: MEDIUM (search/filter pattern)

**Solution**: Separate Search from FilterUI

---

### MultiStepForm.tsx 🟡
**File**: `/Users/chloemimault/Projects/frontend-tls/src/components/patterns/MultiStepForm.tsx`  
**Lines with Issues**: 91 (steps.map), 154 (Card wrapping)  
**Atomicity Score**: 3/10  

**Current Structure**:
```tsx
interface FormStep {
  id: number;
  title: string;
  content?: React.ReactNode;
}

// Usage
<MultiStepForm
  steps={[...]}
  currentStep={1}
  onNext={...}
>
  {children}
</MultiStepForm>
// Internally: renders step indicators + wraps in Card
```

**Violations**:
- ❌ Renders step indicators internally via steps.map()
- ❌ Wraps step content in Card (styling locked)
- ❌ StepIndicator cannot be used independently
- ❌ Cannot customize step indicator appearance

**Refactoring Required**: YES  
**Complexity**: HIGH  
**Estimated Impact**: MEDIUM (form patterns)

---

### RatingModal.tsx 🟡
**File**: `/Users/chloemimault/Projects/frontend-tls/src/components/patterns/RatingModal.tsx`  
**Lines with Issues**: 53-67 (star iteration [1,2,3,4,5].map)  
**Atomicity Score**: 5/10  

**Current Structure**:
```tsx
// Hard-coded star UI
return (
  <div>
    {[1, 2, 3, 4, 5].map((star) => (
      <button key={star} onClick={() => setRating(star)}>
        <Star />
      </button>
    ))}
  </div>
);
```

**Violations**:
- ❌ Star rating UI is hard-coded internally
- ❌ Cannot use alternative rating UI (slider, thumbs up, percentage)
- ❌ StarRating component cannot be extracted
- ❌ Cannot customize star appearance

**Refactoring Required**: YES  
**Complexity**: LOW  
**Estimated Impact**: LOW (specific to rating)

---

### QuizQuestionCard.tsx 🟡
**File**: `/Users/chloemimault/Projects/frontend-tls/src/components/patterns/QuizQuestionCard.tsx`  
**Lines with Issues**: 61-103 (options.map)  
**Atomicity Score**: 4/10  

**Current Structure**:
```tsx
// Hard-coded option UI
return (
  <div>
    {options.map((option) => (
      <button key={option.id} onClick={() => onSelectOption(option.id)}>
        {option.label}
      </button>
    ))}
  </div>
);
```

**Violations**:
- ❌ Option rendering is hard-coded
- ❌ Cannot use alternative option UI (dropdowns, radio buttons)
- ❌ QuizOption component cannot be extracted
- ❌ Feedback icons are embedded in option iteration

**Refactoring Required**: YES  
**Complexity**: MEDIUM  
**Estimated Impact**: MEDIUM (quiz patterns)

---

### Learning Cards (ArticleCard, VideoCard, SessionCard, ProjectCard, etc.) 🟡
**Files**: `/Users/chloemimault/Projects/frontend-tls/src/components/learning/*`  
**Pattern**: Card wrapper + internal business logic  
**Atomicity Score**: 6/10 (varies by card)  

**Issues Across Learning Cards**:
- ✓ Good: Use Card as container
- ✗ Bad: Embed all content rendering logic
- ✗ Bad: Cannot reuse card structure for different content types
- ✗ Bad: Hard to create variants (compact, full, preview)

**Examples**:
1. **ArticleCard.tsx** (lines 91-180)
   - Uses Card ✓
   - Embeds icon box, header, title, description, footer
   - Cannot be used for other content types

2. **VideoCard.tsx** (lines 74+)
   - Uses Card ✓
   - Embeds video metadata rendering
   - Couples video-specific logic with card layout

**Refactoring Required**: MAYBE  
**Complexity**: MEDIUM  
**Estimated Impact**: MEDIUM (learning content)

---

## TIER 3: POLISH VIOLATIONS

### Flashcard.tsx 🟢
**File**: `/Users/chloemimault/Projects/frontend-tls/src/components/patterns/Flashcard.tsx`  
**Status**: NEEDS REVIEW  
**Atomicity Score**: 6/10  

---

### Other Components
- ActivityTimeline
- Pagination
- Tabs
- And others: Mostly following reasonable patterns

---

## SUMMARY TABLE

| Component | Tier | Severity | Issue Type | Refactor? | Est. Hours |
|-----------|------|----------|-----------|-----------|-----------|
| FormLayout | 1 | CRITICAL | Internal field iteration | YES | 4 |
| DataTable | 1 | CRITICAL | Internal row/cell iteration | YES | 6 |
| FormField | 1 | HIGH | Wraps input directly | YES | 2 |
| SearchWithFilters | 2 | HIGH | Internal filter iteration | YES | 3 |
| MultiStepForm | 2 | HIGH | Internal step iteration | YES | 3 |
| RatingModal | 2 | MEDIUM | Hard-coded star UI | YES | 1 |
| QuizQuestionCard | 2 | MEDIUM | Hard-coded option UI | YES | 2 |
| ArticleCard family | 2 | MEDIUM | Mixed patterns | MAYBE | 2 |
| Others | 3 | LOW | Minor issues | Review | TBD |

---

## REFACTORING DEPENDENCIES

```
FormLayout (depends on FormField refactor)
  ↓
FormField (refactor first: add children prop)
  ↓
Pages using FormLayout (update to new pattern)

DataTable (independent refactor)
  ↓
Pages using DataTable (update to new pattern)

SearchWithFilters (independent refactor)
  ↓
Pages using SearchWithFilters

MultiStepForm (independent refactor)
  ↓
Pages using MultiStepForm
```

---

## EXECUTION ORDER (Recommended)

1. **Phase 4.2a**: Refactor FormField (foundation)
   - Add children prop support
   - Keep backward compatibility where possible

2. **Phase 4.2b**: Refactor FormLayout (uses FormField)
   - Extract FormSection component
   - Update to composition pattern

3. **Phase 4.2c**: Update FormLayout dependents
   - Pages that use FormLayout
   - Forms throughout app

4. **Phase 4.3a**: Refactor DataTable (independent)
   - Extract TableRow, TableCell
   - Add render function support

5. **Phase 4.3b**: Update DataTable dependents
   - Dashboard tables
   - Admin pages

6. **Phase 4.4**: Remaining Tier 2 (SearchWithFilters, MultiStepForm, etc.)

7. **Phase 4.5**: Verify build and tests

---

## Files to Track

**Audit Reports**:
- `/Users/chloemimault/Projects/frontend-tls/PHASE_4_AUDIT_REPORT.md` (main report)
- `/Users/chloemimault/Projects/frontend-tls/PHASE_4_COMPONENT_AUDIT.md` (this file)

**Refactoring Progress**:
- Track each component's refactoring status
- Link to PR/commits for each refactor

---

## Questions for Review

1. **Priority**: Should we do all Tier 1 first, or can we do quick wins in Tier 2?
2. **Backward Compat**: Do we need to maintain old API during transition?
3. **Testing**: Should we add composition tests before refactoring?
4. **Pages**: Which pages are highest impact to refactor first?
