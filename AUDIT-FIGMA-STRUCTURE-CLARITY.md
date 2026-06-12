# AUDIT : Figma Structure Clarity — Achievements / Mastery / Activity Family

**Date** : 2026-06-12  
**Status** : 🔴 MISALIGNMENT DETECTED  
**Scope** : AvatarGroup, MasteryBadge, AchievementBadge, Achievement, ActivityItem, ActivityFeed, ActivityTimeline

---

## 📊 FINDINGS

### **1. COMPONENT API vs FIGMA VARIANTS — DIVERGENCE**

| Component | Code API | Figma Variant Set | Issue |
|-----------|----------|-------------------|-------|
| **MasteryBadge** | `level` (4 values) | ❌ Has 4 variants | **Variants ≠ prop API** — code has `level`, Figma has variants. No `tone`, `size`, `color` in code. |
| **Achievement** | `variant` (3 states) | ❌ Needs audit | **Incomplete** — code has `size` prop (sm/md/lg) but Figma may not expose size variants. |
| **AchievementBadge** | `color` (4) × `size` (3) = 12 combos | ✅ Likely correct | 12 variants = 4 colors × 3 sizes. **Verify binding is complete.** |
| **ActivityItem** | `type` (5 values) + `showRail` bool | ❌ Has 5+ variants | **Boolean prop not represented** in variants. Figma probably only shows `type` variants. |
| **ActivityFeed** | Composite (wraps ActivityItem) | ⚠️ Pattern, not component | **Should NOT be a component set** — it's a layout wrapper. |
| **ActivityTimeline** | Specialized ActivityFeed | ⚠️ Pattern, not component | **Should NOT be a component set** — variant of ActivityFeed or separate pattern. |

---

### **2. CATEGORIZATION ISSUES**

**In Components.tsx (React Showcase):**
```
✅ CORRECT:
  Learning > Achievements:
    - Medal (6 variants)
    - Achievement (3 state variants)
    - AchievementBadge (12 color×size variants)
  
  Learning > Competence:
    - CompetenceBadge (4 levels)
    - MasteryBadge (4 levels + 1 progress display prop)

  Cards > Activity:
    - ActivityItem (atomic row)
  
  Lists & Feeds > Feeds (chronological):
    - ActivityFeed (layout pattern)
    - ActivityTimeline (layout pattern variant)
```

**In Figma (Page "03 — Atoms"):**
```
❌ INCORRECT:
  [TOP LEVEL, MIXED CATEGORIES]
  ├─ AvatarGroup (Composite, not Atom — should be on §02 Composites page)
  ├─ AchievementBadge (Atom ✅)
  ├─ MasteryBadge (Atom ✅)
  └─ (others...)

  [SHOULD BE ON DIFFERENT PAGES]
  ActivityItem → §02 Atoms or §03 Cards?
  ActivityFeed → §05 Patterns/Lists
  ActivityTimeline → §05 Patterns/Lists
```

---

### **3. VARIANT MISMATCH: CODE API ≠ FIGMA VARIANTS**

#### **MasteryBadge**
```javascript
// Code: level-based, progress optional
<MasteryBadge level="expert" progress={75} icon={<Trophy />} label="Expert" />

// Figma Variant Set (if it exists):
// name=MasteryBadge/level=beginner (no progress shown)
// name=MasteryBadge/level=intermediate
// name=MasteryBadge/level=advanced
// name=MasteryBadge/level=expert

❌ ISSUE: progress bar state (0%, 50%, 100%) not captured in variants.
   Figma is showing static 100% states only, not the animated progress ring.
```

#### **Achievement**
```javascript
// Code: variant (unlocked/locked/in-progress) + size (sm/md/lg)
<Achievement variant="unlocked" size="md" title="Expert Badge" />

// Expected Figma Variant Set:
// name=Achievement/variant=unlocked, size=sm
// name=Achievement/variant=unlocked, size=md
// name=Achievement/variant=unlocked, size=lg
// name=Achievement/locked, size=sm
// ... (9 total = 3 variants × 3 sizes)

⚠️ PARTIALLY ADDRESSED: Size variants may exist but need audit.
```

#### **ActivityItem**
```javascript
// Code: type (5 types) + showRail (boolean)
<ActivityItem type="achievement" showRail={true} title="Badge unlocked" />

// Figma Variant Set (incomplete):
// name=ActivityItem/type=default
// name=ActivityItem/type=lesson
// name=ActivityItem/type=achievement
// name=ActivityItem/type=coach
// name=ActivityItem/type=journal

❌ ISSUE: showRail boolean not represented. Variants only show type=*.
   Figma is missing the "with rail" / "without rail" state variants.
```

---

### **4. ORGANIZATION ISSUES IN FIGMA**

#### **AvatarGroup Misplacement**
```
Current (Figma):
  Page "03 — Atoms"
    └─ AvatarGroup [section]  ← Mixed with individual badge atoms

Should be:
  Page "02 — Composites"
    └─ AvatarGroup [under "Group wrappers" section]

Reason: Composite = wrapper of multiple Avatars, not atomic.
```

#### **ActivityFeed / ActivityTimeline Not Patterns**
```
Current (Figma):
  Might be component sets on Atoms or mixed location

Should be:
  Page "05 — Patterns & Layouts"
    └─ Lists section
       ├─ ActivityFeed (pattern: wraps ActivityItems)
       └─ ActivityTimeline (pattern: ActivityFeed variant with timeline styling)

Reason: These are layout patterns (not reusable standalone components).
```

---

## 🔧 DECISIONS & ACTION ITEMS

### **PHASE 1: CODE SIDE (No changes needed — code is correct)**
- ✅ MasteryBadge: `level` prop is the canonical API
- ✅ Achievement: `variant` + `size` props are the canonical API
- ✅ AchievementBadge: `color` + `size` props are the canonical API
- ✅ ActivityItem: `type` + `showRail` props are the canonical API

### **PHASE 2: FIGMA REORGANIZATION**

#### **2a. Move AvatarGroup**
- [ ] From: Page "03 — Atoms" (mixed section)
- [ ] To: Page "02 — Composites" → "Group wrappers" section
- [ ] Verify: It's already a proper component set with variants

#### **2b. Audit MasteryBadge Variants**
- [ ] Check if Figma component set exists
- [ ] If yes: Verify it has exactly 4 variants (beginner/intermediate/advanced/expert)
- [ ] If no: Create component set with 4 variants
- [ ] Issue: Progress ring is animated in code but Figma shows static 100% — **acceptable** (animation is runtime)
- [ ] Verify: All 4 variants have correct color tokens bound

#### **2c. Audit Achievement Variants**
- [ ] Check if Figma component set exists with 9 variants (3 states × 3 sizes)
- [ ] If missing size variants: Clone and create sm/md/lg variants per state
- [ ] Verify: Colors, shadows, icon size scale correctly per size
- [ ] Icon size validation:
  - sm: icon circle ~60px, ring/glow proportional
  - md: icon circle ~100px (current)
  - lg: icon circle ~140px

#### **2d. Audit ActivityItem Variants**
- [ ] Check if 5 type variants exist (default/lesson/achievement/coach/journal)
- [ ] Check if `showRail` property exists (boolean component property in Figma)
- [ ] If missing: Add property or create 10 variants (5 types × 2 showRail states)
- [ ] Recommendation: Use **Component Property** (boolean `showRail`) rather than 10 variants

#### **2e. Reclassify ActivityFeed / ActivityTimeline**
- [ ] Remove from Atoms page if present
- [ ] Create as **Frames** (not component sets) on Page "05 — Patterns"
- [ ] Or: Keep ActivityFeed as variant family, move to Patterns page
- [ ] Document: ActivityTimeline is ActivityFeed with `variant="timeline"`

### **PHASE 3: Components.tsx SYNC**
- [ ] Ensure all entries match Figma organization
- [ ] Update `usedBy` arrays if pages reference MasteryBadge, Achievement, etc.
- [ ] Verify: Components marked `showcaseOnly` are truly not used elsewhere

### **PHASE 4: HTML DESIGN SYSTEM SITE**
- [ ] Check if `/public` or external site exists
- [ ] If exists: Verify it reflects Components.tsx showcase
- [ ] If outdated: Schedule for update post-Figma cleanup

---

## 📋 DECISION MATRIX

| What | Where in Figma | Why | Status |
|-----|---------------|----|--------|
| **AvatarGroup** | Page 02 — Composites | Wrapper pattern, not atom | 🔴 MOVE |
| **MasteryBadge** | Page 03 — Atoms § Achievements | 4-level indicator | 🟡 AUDIT |
| **Achievement** | Page 03 — Atoms § Achievements | 3-state × 3-size badge | 🟡 AUDIT |
| **AchievementBadge** | Page 03 — Atoms § Achievements | Alias/variant of Achievement | ⚠️ CLARIFY |
| **ActivityItem** | Page 03 — Atoms § Cards → Activity | Atomic activity row | 🟡 AUDIT |
| **ActivityFeed** | Page 05 — Patterns § Lists | Layout wrapper, not component | 🔴 MOVE |
| **ActivityTimeline** | Page 05 — Patterns § Lists | Variant of ActivityFeed | 🔴 MOVE |

---

## 🎯 RECOMMENDED NEXT STEPS

1. **15 min**: Verify current Figma state via `get_metadata` 
   - Take screenshot of current "03 — Atoms" section
   - List all component sets and their variant counts
   
2. **30 min**: Reorganize Figma pages
   - Move AvatarGroup to Composites
   - Move ActivityFeed/Timeline to Patterns
   - Fix category hierarchies

3. **20 min**: Audit & complete missing variants
   - MasteryBadge: Ensure 4 variants exist
   - Achievement: Ensure 9 variants (3×3) exist
   - ActivityItem: Add showRail property or create 10 variants

4. **15 min**: Sync Components.tsx if any entry names change

5. **10 min**: Document decisions in CLAUDE.md § Figma Reorganization

**Total Time**: ~90 minutes

---

## ✅ SUCCESS CRITERIA

- [ ] AvatarGroup on Composites page
- [ ] All Achievements/Mastery components have complete variant sets
- [ ] ActivityItem/Feed/Timeline on Patterns page
- [ ] Figma org matches Components.tsx REMAP taxonomy exactly
- [ ] All color + text + effect styles bound
- [ ] Components.tsx showcase updated with latest usedBy arrays
- [ ] 0 TODOs or "verify later" notes in Figma descriptions
