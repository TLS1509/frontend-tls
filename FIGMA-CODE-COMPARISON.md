# 🔍 FIGMA ↔ CODE COMPARISON MATRIX

**Quick reference** — drag to your browser, compare side-by-side.

---

## 1️⃣ MASTERYBAGE

### Code Reality
```typescript
// File: src/components/ui/MasteryBadge.tsx
export type MasteryLevel = 'beginner' | 'intermediate' | 'advanced' | 'expert';

interface MasteryBadgeProps {
  level: MasteryLevel;              // 🔴 ONLY prop that varies
  icon?: React.ReactNode;           // Optional override
  label?: string;                   // Optional override
  progress?: number;                // Default: 100 (animated ring)
}

// 4 hardcoded color palettes:
const LEVEL_RING = { beginner: 'text-success-base', intermediate: 'text-primary-500', advanced: 'text-secondary-500', expert: 'text-accent-500' }
const LEVEL_BG = { beginner: 'bg-gradient-to-br from-success-bg to-white', ... }
const LEVEL_LABEL = { beginner: 'text-success-fg', ... }
```

**API Summary:**
- `level`: 4 values (beginner/intermediate/advanced/expert)
- `progress`: 0-100 (progress ring animation)
- No size, tone, or color variants
- Size is fixed: 96px circle (hardcoded in SVG)

### Figma Reality
| Status | Variant Name | Icon | Label Bg | Ring Color | Notes |
|--------|--------------|------|----------|-----------|-------|
| ? | level=beginner | 🌱 | success-bg | success-base | ✅ Check exists |
| ? | level=intermediate | ⚡ | primary-50 | primary-500 | ✅ Check exists |
| ? | level=advanced | 🔥 | secondary-50 | secondary-500 | ✅ Check exists |
| ? | level=expert | 🏆 | accent-50 | accent-500 | ✅ Check exists |

**Expected Component Set Structure:**
```
MasteryBadge (component set)
├─ level=beginner
├─ level=intermediate
├─ level=advanced
└─ level=expert

Properties: NONE (static, no boolean/enum properties)
```

---

## 2️⃣ ACHIEVEMENT

### Code Reality
```typescript
// File: src/components/ui/Achievement.tsx
interface AchievementProps {
  variant: 'unlocked' | 'locked' | 'in-progress';  // STATE variant
  size: 'sm' | 'md' | 'lg';                         // SIZE variant
  icon: React.ReactNode;
  title: string;
  description: string;
  unlockedAt?: string;
  progress?: number;                                 // Only in 'in-progress' state
  maxProgress?: number;
}

// Hardcoded palettes per variant+size:
const VARIANT_CARD = { unlocked: '...', locked: '...', 'in-progress': '...' }
const VARIANT_BADGE = { unlocked: '...', locked: '...', 'in-progress': '...' }
const SIZE_CLASSES = { sm: 'p-3 gap-3', md: 'p-4 gap-4', lg: 'p-5 gap-5' }
const BADGE_SIZE = { sm: 'w-12 h-12', md: 'w-16 h-16', lg: 'w-20 h-20' }
```

**API Summary:**
- `variant`: 3 values (unlocked/locked/in-progress)
- `size`: 3 values (sm/md/lg)
- **Total expected variants in Figma: 9 (3 × 3)**
- Badge icon scales with size
- Optional progress bar in 'in-progress' state

### Figma Reality
| Size | unlocked | locked | in-progress | Status |
|------|----------|--------|-------------|--------|
| sm | ? | ? | ? | ✅ Check 3 exist |
| md | ? | ? | ? | ✅ Check 3 exist |
| lg | ? | ? | ? | ✅ Check 3 exist |

**Expected Component Set Structure:**
```
Achievement (component set)
├─ [variant=unlocked, size=sm]
├─ [variant=unlocked, size=md]
├─ [variant=unlocked, size=lg]
├─ [variant=locked, size=sm]
├─ [variant=locked, size=md]
├─ [variant=locked, size=lg]
├─ [variant=in-progress, size=sm]
├─ [variant=in-progress, size=md]
└─ [variant=in-progress, size=lg]

Property 1: variant (enum: unlocked/locked/in-progress)
Property 2: size (enum: sm/md/lg)
```

---

## 3️⃣ ACHIEVEMENTBADGE

### Code Reality
```typescript
// File: src/components/ui/AchievementBadge.tsx
export type AchievementBadgeColor = 'primary' | 'warm' | 'sun' | 'success';

interface AchievementBadgeProps {
  color: AchievementBadgeColor;    // 4 values
  size: 'sm' | 'md' | 'lg';        // 3 values
  title: string;
  description?: string;
  icon: React.ReactNode;
  isLocked?: boolean;              // Shows lock badge
  onShare?: () => void;
}

// Hardcoded color palettes:
const COLOR_GRADIENT = { primary: 'bg-gradient-to-br from-primary-500 to-primary-600', warm: '...', sun: '...', success: '...' }
const COLOR_BORDER = { primary: 'border-primary-500', ... }
const ICON_CIRCLE = { sm: 'w-[60px] h-[60px]', md: 'w-[100px] h-[100px]', lg: 'w-[140px] h-[140px]' }
```

**API Summary:**
- `color`: 4 values (primary/warm/sun/success)
- `size`: 3 values (sm/md/lg)
- **Total expected variants in Figma: 12 (4 × 3)**
- Optional `isLocked` boolean (shows lock overlay)
- Optional `onShare` callback (shows button)

### Figma Reality
| Size | primary | warm | sun | success | Status |
|------|---------|------|-----|---------|--------|
| sm | ? | ? | ? | ? | ✅ Check 4 exist |
| md | ? | ? | ? | ? | ✅ Check 4 exist |
| lg | ? | ? | ? | ? | ✅ Check 4 exist |

**Expected Component Set Structure:**
```
AchievementBadge (component set)
├─ [color=primary, size=sm]
├─ [color=primary, size=md]
├─ [color=primary, size=lg]
├─ [color=warm, size=sm]
├─ [color=warm, size=md]
├─ [color=warm, size=lg]
├─ [color=sun, size=sm]
├─ [color=sun, size=md]
├─ [color=sun, size=lg]
├─ [color=success, size=sm]
├─ [color=success, size=md]
└─ [color=success, size=lg]

Property 1: color (enum: primary/warm/sun/success)
Property 2: size (enum: sm/md/lg)

Optional Boolean Properties:
  - isLocked: true/false (shows lock badge overlay)
  - hasShareBtn: true/false (shows share button)
```

---

## 4️⃣ ACTIVITYITEM

### Code Reality
```typescript
// File: src/components/ui/ActivityItem.tsx
export type ActivityItemType = 'lesson' | 'achievement' | 'coach' | 'journal' | 'default';

interface ActivityItemProps {
  type: ActivityItemType;          // 5 values
  title: string;
  description?: string;
  timestamp?: string;
  icon?: React.ReactNode;
  showRail?: boolean;              // 🔴 BOOLEAN NOT REPRESENTED IN VARIANTS
}

// Hardcoded type palettes:
const TYPE_GRADIENT = { default: 'bg-gradient-to-br from-ink-300 to-ink-500', lesson: 'bg-gradient-to-br from-primary-400 to-primary-600', ... }
const TYPE_SHADOW = { default: 'shadow-sm', lesson: 'shadow-brand-sm', achievement: 'shadow-sun-sm', coach: 'shadow-warm-sm', journal: 'shadow-sm' }
```

**API Summary:**
- `type`: 5 values (default/lesson/achievement/coach/journal)
- `showRail`: boolean (true = show vertical timeline rail, false = hide)
- **Total combinations: 10 (5 × 2)** but Figma probably only shows 5 type variants
- Icon gradient and shadow scale per type

### Figma Reality
| Type | Icon Gradient | Shadow | Rail? | Status |
|------|---------------|--------|-------|--------|
| default | ink-300→500 | shadow-sm | ? | ✅ Check exists |
| lesson | primary-400→600 | shadow-brand-sm | ? | ✅ Check exists |
| achievement | accent-300→500 | shadow-sun-sm | ? | ✅ Check exists |
| coach | secondary-400→600 | shadow-warm-sm | ? | ✅ Check exists |
| journal | success-base→fg | shadow-sm | ? | ✅ Check exists |

**Expected Component Set Structure:**
```
ActivityItem (component set)
├─ [type=default] (or should have showRail=true/false variants)
├─ [type=lesson]
├─ [type=achievement]
├─ [type=coach]
└─ [type=journal]

Property 1: type (enum: default/lesson/achievement/coach/journal)

⚠️ PROBLEM: showRail boolean not represented. Options:
  A) Add boolean property "showRail" (modern Figma supports this)
  B) Create 10 variants (5 types × 2 showRail states) — verbose
  C) Document that showRail is code-only, Figma shows rail=true state only
```

---

## 5️⃣ ACTIVITYFEED

### Code Reality
```typescript
// File: src/components/patterns/ActivityFeed.tsx
// This is a PATTERN, not a component with variants
// It wraps multiple ActivityItem elements with:
//   - Empty state rendering
//   - Grouping/chronological ordering
//   - Load-more button
//   - No variants, no props beyond data/handlers

interface ActivityFeedProps {
  items: ActivityItem[];
  isLoading?: boolean;
  isEmpty?: boolean;
  onLoadMore?: () => void;
}
```

**API Summary:**
- NOT a component set, NOT variants
- It's a **layout pattern** that composes ActivityItem
- Should be a Frame on Patterns page, not a component set

### Figma Reality
| Location | Type | Status |
|----------|------|--------|
| Current | Component set? Frame? | ❓ UNKNOWN |
| Should be | Frame (pattern) | 📍 Page "05 — Patterns" → Lists section |

**Expected Structure:**
```
ActivityFeed (Frame or documentation page)
├─ Example: 3×ActivityItem with rail=true, grouped by date
├─ Example: Empty state
├─ Example: Load-more button

NOT a component set (no variants).
Figma should show this as a PATTERN documentation, not a reusable component.
```

---

## 6️⃣ ACTIVITYTIMELINE

### Code Reality
```typescript
// File: src/components/patterns/ActivityTimeline.tsx
// Likely a variant/wrapper of ActivityFeed with specific styling

// Probably something like:
interface ActivityTimelineProps extends ActivityFeedProps {
  variant?: 'vertical' | 'horizontal';
  showDates?: boolean;
}
```

**API Summary:**
- Variant of **ActivityFeed** (not standalone)
- Different visual presentation (timeline vs list)
- Should NOT be a separate component set

### Figma Reality
| Location | Type | Status |
|----------|------|--------|
| Current | ? | ❓ UNKNOWN |
| Should be | Variant of ActivityFeed Frame | 📍 Page "05 — Patterns" |

**Expected Structure:**
```
ActivityTimeline (not a component set)
├─ Variant A: ActivityFeed with timeline styling
├─ Variant B: Horizontal timeline
└─ Documentation: "Use when chronological progression matters"

This is either:
  A) A Frame on Patterns page (recommended)
  B) A variant property on ActivityFeed frame (if Figma supports it)
  C) Not in Figma at all (documented in code comments only)
```

---

## 7️⃣ AVATARGROUP

### Code Reality
```typescript
// File: src/components/ui/AvatarGroup.tsx
// COMPOSITE component wrapping multiple Avatar elements

interface AvatarGroupProps {
  avatars: AvatarProps[];
  max?: number;                    // Show max N avatars, +X more indicator
  size?: 'sm' | 'md' | 'lg';
  spacing?: 'compact' | 'normal';  // Overlap amount
}
```

**API Summary:**
- Wrapper of multiple `Avatar` components
- `max`: limit display count
- `size`: avatar size (sm/md/lg)
- `spacing`: overlap/gap control
- **This is a Composite, not an Atom**

### Figma Reality
| Location | Type | Status |
|----------|------|--------|
| Current | Mixed in Page "03 — Atoms" | ❌ WRONG PAGE |
| Should be | Component set on Page "02 — Composites" | 📍 MOVE |

**Expected Structure:**
```
AvatarGroup (component set on Page 02)
├─ [size=sm, spacing=compact]
├─ [size=sm, spacing=normal]
├─ [size=md, spacing=compact]
├─ [size=md, spacing=normal]
├─ [size=lg, spacing=compact]
└─ [size=lg, spacing=normal]

Property 1: size (enum: sm/md/lg)
Property 2: spacing (enum: compact/normal)

Current count: 6 variants expected
```

---

## 📊 SUMMARY TABLE

| Component | Type | Code API | Expected Figma Variants | Current Status | Action |
|-----------|------|----------|------------------------|-----------------|--------|
| **MasteryBadge** | Atom | `level` (4) | 4 variants | ❓ Audit | Verify 4 exist |
| **Achievement** | Atom | `variant` (3) × `size` (3) | 9 variants (3×3) | ❓ Audit | Verify 9 exist, fix alignment |
| **AchievementBadge** | Atom | `color` (4) × `size` (3) | 12 variants (4×3) | ❓ Audit | Verify 12 exist, complete binding |
| **ActivityItem** | Card/Atom | `type` (5) + `showRail` (bool) | 5 or 10 variants | ❓ Audit | Add showRail property or create 10 variants |
| **ActivityFeed** | Pattern | Data wrapper | Frame (not component set) | ❓ Audit | Move to Page 05 — Patterns |
| **ActivityTimeline** | Pattern | ActivityFeed variant | Frame/documentation | ❓ Audit | Document as variant, move to Patterns |
| **AvatarGroup** | Composite | `size` (3) × `spacing` (2) | 6 variants (3×2) | ❌ Wrong page | Move to Page 02 — Composites |

---

## ✅ CHECKLIST

Print this and check off as you audit Figma:

### MasteryBadge
- [ ] Component set exists on Page 03 — Atoms
- [ ] 4 variants (beginner/intermediate/advanced/expert)
- [ ] All color tokens bound (LEVEL_RING colors)
- [ ] Icon emoji correct for each level
- [ ] Label text bound to text styles

### Achievement
- [ ] Component set exists on Page 03 — Atoms
- [ ] 9 variants (3 states × 3 sizes) ← CRITICAL
- [ ] Size property correctly scales icon circle (sm/md/lg)
- [ ] Colors/gradients bound per variant
- [ ] "in-progress" variant shows progress bar
- [ ] "locked" variant shows lock overlay
- [ ] "unlocked" variant shows sparkle icon

### AchievementBadge
- [ ] Component set exists on Page 03 — Atoms
- [ ] 12 variants (4 colors × 3 sizes) ← CRITICAL
- [ ] Color property in main component set or variants
- [ ] Size property scales icon circle correctly
- [ ] Optional "isLocked" property or variant
- [ ] Optional "hasShareBtn" property or variant

### ActivityItem
- [ ] Component set exists (Page 03? or elsewhere?)
- [ ] 5+ variants (types: default/lesson/achievement/coach/journal)
- [ ] "showRail" property OR 10 variants (5×2)
- [ ] Type colors/gradients correct
- [ ] Shadows bound to type (shadow-sm, shadow-brand-sm, etc.)
- [ ] Timeline rail renders correctly (or hidden variant exists)

### ActivityFeed / ActivityTimeline
- [ ] Move from Atoms to Page 05 — Patterns
- [ ] Document as Pattern (frame), not component set
- [ ] ActivityTimeline is variant or separate pattern example

### AvatarGroup
- [ ] Component set moved to Page 02 — Composites
- [ ] 6 variants (or property-driven: size × spacing)
- [ ] Size variants show correct Avatar counts
- [ ] Spacing controls overlap/gap amount

---

## 🔗 RELATED FILES

- React code: `/src/components/ui/{MasteryBadge,Achievement,AchievementBadge,ActivityItem}.tsx`
- Patterns: `/src/components/patterns/{ActivityFeed,ActivityTimeline}.tsx`
- Showcase: `/src/pages/Components.tsx` (lines 462-473, Learning category)
- This audit: `/AUDIT-FIGMA-STRUCTURE-CLARITY.md`
