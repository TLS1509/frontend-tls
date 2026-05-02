# PHASE 4: Quick Reference Guide
## Critical Nested Components & Refactoring Checklist

Generated: 2026-05-02

---

## 🔴 TIER 1: CRITICAL (Start Here)

### FormLayout.tsx
```
File: /Users/chloemimault/Projects/frontend-tls/src/components/patterns/FormLayout.tsx
Problem Lines: 89 (section.fields.map)
Current: Renders field structure internally
Refactor: Accept <FormField> components as children
Impact: 5+ pages depend on this
```

### DataTable.tsx
```
File: /Users/chloemimault/Projects/frontend-tls/src/components/patterns/DataTable.tsx
Problem Lines: 149 (displayedRows.map), 165 (columns.map)
Current: Renders rows/cells internally
Refactor: Accept render function or <TableRow> children
Impact: HIGH (core data display pattern)
Dependencies: Dashboard, admin tables, data views
```

### FormField.tsx
```
File: /Users/chloemimault/Projects/frontend-tls/src/components/forms/FormField.tsx
Problem Lines: 76 (hardcoded <input>)
Current: Wraps input element
Refactor: Accept children instead of wrapping input
Impact: Form building across app
```

---

## 🟡 TIER 2: IMPORTANT (Phase 2)

### SearchWithFilters.tsx
```
File: /Users/chloemimault/Projects/frontend-tls/src/components/patterns/SearchWithFilters.tsx
Problem Lines: 135-170 (filterGroups.map)
Current: Renders filter UI internally
Refactor: Separate Search from FilterUI, allow composition
```

### MultiStepForm.tsx
```
File: /Users/chloemimault/Projects/frontend-tls/src/components/patterns/MultiStepForm.tsx
Problem Lines: 91 (steps.map), 154 (Card wrapping)
Current: Renders steps + wraps content in Card
Refactor: Extract StepIndicator, let parent control Card wrapper
```

### RatingModal.tsx
```
File: /Users/chloemimault/Projects/frontend-tls/src/components/patterns/RatingModal.tsx
Problem Lines: 53 ([1,2,3,4,5].map)
Current: Hard-coded star UI
Refactor: Extract StarRating component or accept children
```

### QuizQuestionCard.tsx
```
File: /Users/chloemimault/Projects/frontend-tls/src/components/patterns/QuizQuestionCard.tsx
Problem Lines: 61-103 (options.map)
Current: Hard-coded option rendering
Refactor: Accept option children or render function
```

---

## 🟢 TIER 3: POLISH (Phase 3)

### Learning Cards (ArticleCard, VideoCard, SessionCard, ProjectCard, etc.)
```
Files: /Users/chloemimault/Projects/frontend-tls/src/components/learning/*.tsx
Status: VERIFY PATTERN - may be acceptable
Check: Can they be used for other content types?
```

---

## REFACTORING CHECKLIST

### Before Starting
- [ ] Read PHASE_4_AUDIT_REPORT.md
- [ ] Review PHASE_4_COMPONENT_AUDIT.md
- [ ] Understand atomic component principles
- [ ] Create feature branch per component

### For Each Component

#### 1. Preparation
- [ ] Document current API usage in codebase
- [ ] Write atomic version in separate branch
- [ ] Keep old version for reference during testing

#### 2. Refactoring
- [ ] Remove internal iteration (.map)
- [ ] Extract sub-components if needed
- [ ] Add children prop support
- [ ] Update CSS for composition
- [ ] Update TypeScript types

#### 3. Testing
- [ ] Write composition tests
- [ ] Test atomic sub-components in isolation
- [ ] Test backward compatibility (if needed)

#### 4. Integration
- [ ] Update dependent pages/components
- [ ] Run npm run build
- [ ] Run npm test
- [ ] Manual QA on affected pages

#### 5. Documentation
- [ ] Update component JSDoc
- [ ] Add composition examples
- [ ] Update Components.tsx showcase

---

## COMPONENT COMPOSITION TEMPLATE

Use this template for refactored components:

```tsx
/**
 * [ComponentName] — [Responsibility]
 *
 * Atomic component for [what it does].
 * Use with [sub-component] to compose [feature].
 *
 * Usage:
 *   <Container>
 *     <Item>content</Item>
 *     <Item>content</Item>
 *   </Container>
 */

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  /** Descriptive prop */
  label?: string;
  /** Content to render */
  children: React.ReactNode;
}

export const Component: React.FC<Props> = ({
  children,
  className = '',
  ...rest
}) => {
  return (
    <div className={`component ${className}`} {...rest}>
      {children}
    </div>
  );
};
```

---

## KEY PRINCIPLES

1. **Composition Over Configuration**
   - ✗ `<FormLayout sections={[...fields...]} />`
   - ✓ `<FormLayout><FormField><Input /></FormField></FormLayout>`

2. **Single Responsibility**
   - Each component does ONE thing
   - FormLayout: layout structure
   - FormField: label + input + error wrapper
   - Input: render input element

3. **No Internal Iteration**
   - ✗ Component internally does: `.map(item => <Child>)`
   - ✓ Parent decides iteration, component renders what it receives

4. **Minimal Props**
   - Only props that change appearance/behavior
   - NOT props that configure internal structure

5. **Test Independence**
   - Each component should be testable in isolation
   - Can't test FormField without testing FormLayout

---

## BUILD & TEST COMMANDS

```bash
# During refactoring
npm run build          # Check for TS errors
npm test              # Run unit tests
npm run dev           # Visual testing

# After completing each component
npm run build
npm test -- --coverage
```

---

## Files to Update Per Component

### FormLayout Refactor
- [ ] `/Users/chloemimault/Projects/frontend-tls/src/components/patterns/FormLayout.tsx`
- [ ] Create: `/Users/chloemimault/Projects/frontend-tls/src/components/patterns/FormSection.tsx`
- [ ] `/Users/chloemimault/Projects/frontend-tls/src/components/patterns/index.ts`
- [ ] Pages using FormLayout (search for imports)
- [ ] `/Users/chloemimault/Projects/frontend-tls/src/pages/ComponentShowcase.tsx`

### DataTable Refactor
- [ ] `/Users/chloemimault/Projects/frontend-tls/src/components/patterns/DataTable.tsx`
- [ ] Create: `/Users/chloemimault/Projects/frontend-tls/src/components/patterns/TableRow.tsx`
- [ ] Create: `/Users/chloemimault/Projects/frontend-tls/src/components/patterns/TableCell.tsx`
- [ ] `/Users/chloemimault/Projects/frontend-tls/src/components/patterns/index.ts`
- [ ] Pages using DataTable

### FormField Refactor
- [ ] `/Users/chloemimault/Projects/frontend-tls/src/components/forms/FormField.tsx`
- [ ] Pages using FormField
- [ ] Forms throughout app

---

## SUCCESS CRITERIA

After refactoring, each component should:

1. ✓ Accept children via `React.ReactNode` prop
2. ✓ Have single, clear responsibility
3. ✓ Be testable in isolation
4. ✓ Require minimal props
5. ✓ Not assume internal structure of children
6. ✓ Work with composition pattern
7. ✓ Build succeeds with no TS errors
8. ✓ All tests pass
9. ✓ Visual QA on affected pages

---

## COMMON PITFALLS TO AVOID

1. ❌ Don't add backward compat props for old API (use new pattern only)
2. ❌ Don't extract components in same file (create new files)
3. ❌ Don't forget to update exports in index.ts
4. ❌ Don't skip testing atomic components in isolation
5. ❌ Don't leave old component code commented out
6. ❌ Don't update ComponentShowcase.tsx last (update early)

---

## RESOURCES

- Atomic design principles: Search "Atomic Design Brad Frost"
- React composition patterns: https://react.dev/learn/thinking-in-react
- Component API design: Study Material-UI, Chakra UI component patterns

---

**Next Step**: Start with FormField (foundation), then FormLayout (depends on FormField)
