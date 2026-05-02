# Component Architecture Refactor — Self-Contained Components

**Goal**: Eliminate nested wrapper hell by making ALL components self-contained, atomic units.

**Principle**: Each component includes everything needed for its use case. No separate wrapper components required.

---

## Core Principle: Self-Contained Components

### ❌ OLD PATTERN (Broken):
```tsx
<FormGroup label="Email" hint="...">
  <Input type="email" />
</FormGroup>
```
- Wrapper + control nesting
- Two components required
- Hard to maintain (logic in two places)
- Creates nested card appearance

### ✅ NEW PATTERN (Clean):
```tsx
<Input 
  label="Email" 
  hint="..." 
  type="email" 
/>
```
- Single, complete component
- All logic in one place
- Self-contained styling
- No nesting hell

---

## Component Refactoring Checklist

### CORE COMPONENTS (/src/components/core/)

#### ✅ 1. Input (TEXT FIELD)
**Status**: IN PROGRESS

**Current API**:
```tsx
<Field label="...">
  <Input type="email" />
</Field>
```

**New API**:
```tsx
<Input 
  label="Email"
  hint="Enter your email"
  error={error}
  required
  type="email"
  placeholder="..."
  status="error" | "success" | "default"
  size="sm" | "md" | "lg"
  leadingIcon={...}
  trailingIcon={...}
  multiline
  rows={4}
/>
```

**Changes**:
- Input component now accepts label, hint, error, required props
- Renders complete field: label → control → hint/error
- Remove Field and FormGroup components
- Update Input.css to include all field styling

---

#### ⏳ 2. Select (DROPDOWN)
**Current State**: Uses FormGroup wrapper

**New Self-Contained API**:
```tsx
<Select 
  label="Language"
  hint="Choose your language"
  error={error}
  options={[...]}
  value={selected}
  onChange={...}
/>
```

**Changes**:
- Add label, hint, error props
- Render as complete field component
- Include dropdown icon built-in
- Update styling in Select.css

---

#### ⏳ 3. Checkbox
**Current State**: Separate label using native `<label>` tag

**New Self-Contained API**:
```tsx
<Checkbox 
  label="I agree to terms"
  checked={checked}
  onChange={...}
  disabled={false}
/>
```

**Changes**:
- Label prop instead of child text
- Icon + label together (already semi-done)
- Checkbox.css for styling

---

#### ⏳ 4. Radio
**Current State**: Separate label using native `<label>` tag

**New Self-Contained API**:
```tsx
<Radio 
  label="Option A"
  name="group"
  checked={checked}
  onChange={...}
/>
```

**Changes**:
- Label prop instead of child text
- Icon + label together
- Radio.css for styling

---

#### ⏳ 5. Switch/Toggle
**Current State**: Separate label

**New Self-Contained API**:
```tsx
<Switch 
  label="Enable notifications"
  checked={checked}
  onChange={...}
/>
```

**Changes**:
- Label prop
- Track + label together
- Switch.css for styling

---

#### ⏳ 6. Button
**Current State**: Already fairly atomic, but check for issues

**New API** (no changes needed):
```tsx
<Button 
  variant="primary" | "secondary" | "ghost"
  size="sm" | "md" | "lg"
  disabled={false}
  loading={false}
  icon={...}
  iconPosition="left" | "right"
>
  Label
</Button>
```

**Verify**: No wrapper nesting, all styling in Button.css

---

#### ⏳ 7. Card
**Current State**: Uses CardTitle, CardDesc, CardFooter sub-components

**New Self-Contained API** (option):
```tsx
// Option A: Keep sub-components (simpler)
<Card>
  <Card.Title>Title</Card.Title>
  <Card.Desc>Description</Card.Desc>
  <Card.Footer>...</Card.Footer>
</Card>

// Option B: All as props (more atomic)
<Card 
  title="Title"
  description="Description"
  eyebrow="EYEBROW"
  footer={...}
>
  Custom content
</Card>
```

**Recommendation**: Keep Option A (sub-components) — Cards are flexible containers, not rigid forms.

---

#### ⏳ 8. FormField (if exists)
**Status**: Check if redundant with new Input

**Action**: If it's just Input wrapper, DELETE and refactor to use new Input

---

### UI COMPONENTS (/src/components/ui/)

#### ⏳ Alert
**Current State**: Separate icon, title, message, action

**New Self-Contained API**:
```tsx
<Alert 
  type="success" | "error" | "warning" | "info"
  title="Alert title"
  message="Alert message"
  action={<Button>Action</Button>}
  onClose={...}
/>
```

**Changes**:
- Icon automatically based on type
- Title + message together
- Action button integrated
- Close button integrated

---

#### ⏳ Badge
**Current State**: Icon + text separate

**New Self-Contained API**:
```tsx
<Badge 
  icon={...}
  text="Label"
  variant="primary" | "warm" | "sun"
  dot={true}
/>
```

**Changes**:
- Icon prop instead of child
- Text prop
- Compact, self-contained

---

#### ⏳ Toast/Notification
**Current State**: Separate component, icon, message, action

**New Self-Contained API**:
```tsx
<Toast 
  type="success" | "error" | "warning" | "info"
  title="Toast title"
  message="Toast message"
  action={<Button>Undo</Button>}
  onClose={...}
  autoClose={3000}
/>
```

**Changes**:
- Icon automatic based on type
- Title + message together
- Action button integrated
- Close button integrated
- Auto-close timer built-in

---

#### ⏳ ProgressBar
**Current State**: Just the bar, no label

**New Self-Contained API**:
```tsx
<ProgressBar 
  value={65}
  label="Progress"
  showLabel={true}
  size="sm" | "md"
  status="default" | "success" | "error"
/>
```

**Changes**:
- Label prop
- Percentage display optional
- Status variant for coloring

---

#### ⏳ Avatar
**Current State**: Image only

**New Self-Contained API**:
```tsx
<Avatar 
  image={url}
  name="John Doe"
  size="sm" | "md" | "lg"
  status="online" | "offline" | "away"
/>
```

**Changes**:
- Name prop for fallback initials
- Status indicator optional
- Size variants built-in

---

#### ⏳ Pagination
**Current State**: Separate items, prev/next buttons

**New Self-Contained API**:
```tsx
<Pagination 
  currentPage={1}
  totalPages={10}
  onPageChange={...}
  size="sm" | "md"
/>
```

**Changes**:
- Page numbers automatic
- Prev/Next buttons automatic
- Integrated state management

---

#### ⏳ Tabs
**Current State**: Tab list + content separate

**New Self-Contained API**:
```tsx
<Tabs 
  tabs={[
    { label: "Tab 1", content: <div>Content 1</div> },
    { label: "Tab 2", content: <div>Content 2</div> },
  ]}
  defaultActive={0}
  onChange={...}
/>
```

**Changes**:
- Tabs + content together
- No separate Tabs.Tab/Tabs.Content
- Self-managing state

---

### PATTERN COMPONENTS (/src/components/patterns/)

#### ⏳ Modal/Dialog
**Current State**: Separate header, body, footer

**New Self-Contained API**:
```tsx
<Modal 
  isOpen={isOpen}
  title="Modal Title"
  onClose={...}
  footer={<Button>Close</Button>}
>
  Modal content
</Modal>
```

**Changes**:
- Title prop instead of child
- Footer integrated
- Backdrop click handling built-in
- Keyboard escape handling built-in

---

#### ⏳ Dropdown/Menu
**Current State**: Separate trigger and items

**New Self-Contained API**:
```tsx
<DropdownMenu 
  trigger={<Button>Menu</Button>}
  items={[
    { label: "Item 1", onClick: ... },
    { label: "Item 2", onClick: ... },
  ]}
  position="top" | "bottom"
/>
```

**Changes**:
- Trigger + items together
- Menu rendering automatic
- Click outside handling built-in

---

#### ⏳ SearchBar
**Current State**: Input + icon + search button separate

**New Self-Contained API**:
```tsx
<SearchBar 
  placeholder="Search..."
  onSearch={...}
  onClear={...}
  loading={false}
  suggestions={[...]}
/>
```

**Changes**:
- Search icon automatic
- Clear button automatic
- Suggestions dropdown built-in
- Loading state built-in

---

#### ⏳ Breadcrumb
**Current State**: Items passed as array/children

**New Self-Contained API**:
```tsx
<Breadcrumb 
  items={[
    { label: "Home", href: "/" },
    { label: "Courses", href: "/courses" },
    { label: "React", href: "/courses/react" },
  ]}
  onClick={...}
/>
```

**Changes**:
- Separators automatic
- Current page styling automatic
- Navigation handling built-in

---

#### ⏳ Steps/Stepper
**Current State**: Separate step items

**New Self-Contained API**:
```tsx
<Stepper 
  steps={[
    { label: "Step 1", status: "completed" },
    { label: "Step 2", status: "active" },
    { label: "Step 3", status: "pending" },
  ]}
  currentStep={1}
/>
```

**Changes**:
- Step rendering automatic
- Progress line automatic
- Status icons automatic

---

---

## Refactoring Priority

### PHASE 1: Core Form Components (CRITICAL)
1. ✅ Input (in progress)
2. ⏳ Select
3. ⏳ Checkbox
4. ⏳ Radio
5. ⏳ Switch

**Why First**: Most-used, blocking other work, directly address the nesting issue

### PHASE 2: Feedback Components
6. ⏳ Alert
7. ⏳ Toast
8. ⏳ Badge

**Why Second**: Common patterns, self-contained improvements

### PHASE 3: Container/Layout Components
9. ⏳ Modal
10. ⏳ Card (verify, keep as-is if flexible)

### PHASE 4: Navigation/Data Components
11. ⏳ Tabs
12. ⏳ Breadcrumb
13. ⏳ Pagination
14. ⏳ Steps

### PHASE 5: Advanced Patterns
15. ⏳ Dropdown
16. ⏳ SearchBar
17. ⏳ Avatar

---

## CSS Organization

**New Structure**:
```
/src/components/core/
  Input.tsx
  Input.css          (label + control + hint/error)
  Button.tsx
  Button.css
  Card.tsx
  Card.css

/src/components/ui/
  Alert.tsx
  Alert.css          (icon + title + message + action)
  Badge.tsx
  Badge.css
  Avatar.tsx
  Avatar.css
  ... etc

/src/components/patterns/
  Modal.tsx
  Modal.css          (header + body + footer)
  Dropdown.tsx
  Dropdown.css       (trigger + menu)
  ... etc
```

**Key**: Each component owns its CSS companion file. No global component CSS in tls-components.css.

---

## Remove/Deprecate

- ❌ Field component (merged into Input)
- ❌ FormGroup component (merged into Input)
- ❌ Any wrapper-only components
- ❌ CardEyebrow, CardTitle, CardDesc, CardFooter as separate exports (keep as sub-components)

---

## Implementation Rules

1. **Each component is self-contained**
   - Includes all required sub-elements (label, hint, error, icon, etc.)
   - No external wrappers needed

2. **Props are explicit**
   - `label="..."` not `<Component>Label</Component>`
   - `icon={...}` not separate icon element
   - `error={...}` not conditional render outside component

3. **CSS is co-located**
   - Component.tsx + Component.css in same directory
   - No scattered styles in global files

4. **Responsive design integrated**
   - Media queries in Component.css
   - Responsive props in Component.tsx

5. **State management**
   - Uncontrolled (local state) by default
   - Controlled (props) when needed
   - No external state library required for simple components

---

## Testing Strategy

For each refactored component:
- ✅ Component renders correctly
- ✅ All props work as expected
- ✅ Styling matches design at 375px, 768px, 1024px, 1280px
- ✅ Dark mode works
- ✅ Accessibility (keyboard, screen reader)
- ✅ No TypeScript errors
- ✅ Build passes

---

## Effort Estimate

| Phase | Components | Effort | Total |
|-------|-----------|--------|-------|
| 1 | Input, Select, Checkbox, Radio, Switch | 2-3h each | 10-15h |
| 2 | Alert, Toast, Badge | 1-2h each | 3-6h |
| 3 | Modal, Card | 1-2h each | 2-4h |
| 4 | Tabs, Breadcrumb, Pagination, Steps | 1.5-2h each | 6-8h |
| 5 | Dropdown, SearchBar, Avatar | 1-2h each | 3-6h |
| **TOTAL** | 17 components | - | **24-39h** |

---

## Success Criteria

✅ All components are self-contained (no wrapper nesting required)
✅ No Field or FormGroup components in use
✅ All components have dedicated CSS files
✅ No "nested card" appearance in rendered output
✅ All 17 components refactored and tested
✅ Zero breaking changes to existing pages (API-compatible or migrated)
✅ Build passes with no errors
