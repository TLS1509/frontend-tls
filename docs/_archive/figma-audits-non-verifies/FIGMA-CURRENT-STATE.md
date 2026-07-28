> ⚠️ **FIABILITÉ NON VÉRIFIÉE (flag 2026-06-30).** Rapport produit sans trace d'inspection node-par-node du fichier Figma. Une vérif manuelle (2026-06-30) a montré que des audits Figma de cette période contenaient des affirmations fabriquées (cf. Phase 1 P0). À re-vérifier via `use_figma` contre `LccBZ1GKWQVwVzPtsSzk5Y` avant de s'y fier.

# 🔴 FIGMA CURRENT STATE — Atoms Page (03)

**Snapshot Date**: 2026-06-12  
**Screenshot**: `/tmp/atoms_page.png` (365×2000px, 120KB)  
**Page**: `1095:2` — 🔵 03 · Atoms

---

## 📊 INVENTORY — WHAT EXISTS VS WHAT SHOULD EXIST

### ✅ MasteryBadge
```
Figma: frame id=1270:105, name="MasteryBadge"
Location: x=2646 y=652, 562×144px

Variants FOUND:
  ❓ (None extracted — frame has NO symbol children visible)

ISSUE: 🔴 INCOMPLETE
  Code expects: 4 variants (beginner/intermediate/advanced/expert)
  Figma has: ??? (unclear if variants exist inside frame)
  
NEXT: Dive into frame to count symbols
```

### ✅ Achievement
```
Figma: frame id=1270:21, name="Achievement"
Location: x=2213 y=1085, 2022×480px

Variants FOUND: 3
  ❓ [Exact names not extracted clearly]

ISSUE: 🔴 MISMATCH
  Code expects: 9 variants (3 states × 3 sizes)
  Figma has: 3 variants (50% of expected!)
  
STATUS: INCOMPLETE — Missing size variants
```

### ✅ AchievementBadge
```
Figma: frame id=1270:47, name="AchievementBadge"
Location: x=2198 y=818, 2250×178px

Variants FOUND: ??? (not clearly enumerated)

ISSUE: 🟡 AUDIT NEEDED
  Code expects: 12 variants (4 colors × 3 sizes)
  Figma has: ??? (count unclear from metadata)
  
NEXT: Screenshot and manual count
```

### ✅ ActivityItem
```
Figma: frame id=1347:4, name="ActivityItem"
Location: x=869 y=1085, 440×174px

Variants FOUND: 3
  - ActivityItem/icon=🎯
  - ActivityItem/icon=🏆
  - ActivityItem/icon=💬

ISSUE: 🔴 WRONG VARIANT STRUCTURE
  Code expects: type prop (5 values) + showRail boolean
  Figma has: icon-based symbols (emoji, not type-based!)
  
  ❌ Expected variant names:
    - ActivityItem/type=default
    - ActivityItem/type=lesson
    - ActivityItem/type=achievement
    - ActivityItem/type=coach
    - ActivityItem/type=journal
    
  ❌ MISSING: showRail property/variants (true/false)
```

### ⚠️ AvatarGroup
```
Figma: symbol id=1322:27, name="AvatarGroup"
Location: x=2214 y=652, 448×48px

TYPE: Symbol (not frame) — lightweight component

ISSUE: 🔴 WRONG LOCATION
  Currently: Mixed in Page "03 — Atoms" (among Achievements)
  Should be: Page "02 — Composites" section
  
  Reason: It's a wrapper composite, not a primitive atom
```

### ❌ ActivityFeed
```
Figma: NOT FOUND on Page 03 — Atoms

ISSUE: 🔴 MISSING
  Code has: patterns/ActivityFeed.tsx (layout wrapper)
  Figma has: NOTHING
  
  Should be: Page "05 — Patterns" → Lists section
  Type: Frame (not component set — it's a pattern)
```

### ❌ ActivityTimeline
```
Figma: NOT FOUND on Page 03 — Atoms

ISSUE: 🔴 MISSING
  Code has: patterns/ActivityTimeline.tsx (variant of ActivityFeed)
  Figma has: NOTHING
  
  Should be: Page "05 — Patterns" → Lists section
  Type: Frame (variant example or separate pattern)
```

---

## 🎯 SUMMARY TABLE

| Component | Found? | Type | Variants | Expected | Status |
|-----------|--------|------|----------|----------|--------|
| **MasteryBadge** | ✅ | frame | ??? | 4 (level=*) | 🔴 Count unclear |
| **Achievement** | ✅ | frame | 3 | 9 (3×3) | 🔴 Only 33% complete |
| **AchievementBadge** | ✅ | frame | ??? | 12 (4×3) | 🟡 Unclear |
| **ActivityItem** | ✅ | frame | 3 | 5 (or 10) | 🔴 Wrong structure (icon-based not type-based) |
| **AvatarGroup** | ✅ | symbol | 1 | 6 (3×2) | ⚠️ Wrong page, incomplete |
| **ActivityFeed** | ❌ | — | — | pattern | 🔴 Missing |
| **ActivityTimeline** | ❌ | — | — | pattern | 🔴 Missing |

---

## ⚡ CRITICAL ISSUES TO FIX

### 🔴 Priority 1 — Variant Mismatch (Can't use as-is)

1. **Achievement** — Only 3 variants instead of 9
   - Missing: size variants (sm/md/lg)
   - Action: Clone each variant for sm/md/lg
   - Effort: Clone 6 times, adjust icon sizes

2. **ActivityItem** — Icon-based variants instead of type-based
   - Current: ActivityItem/icon=🎯, icon=🏆, icon=💬
   - Should be: ActivityItem/type=default, type=lesson, type=achievement, type=coach, type=journal
   - Action: Rename or recreate 5 type variants
   - Missing: showRail property (boolean) — currently not represented

### 🔴 Priority 2 — Missing Components

3. **ActivityFeed** — Doesn't exist
   - Action: Move to Page 05 or create as Frame
   - Type: Pattern (not component set)

4. **ActivityTimeline** — Doesn't exist
   - Action: Move to Page 05 or create as Frame variant
   - Type: Pattern (not component set)

### ⚠️ Priority 3 — Organization

5. **AvatarGroup** — On wrong page
   - Current: Page 03 — Atoms
   - Should be: Page 02 — Composites
   - Action: Move frame/symbol

---

## 📸 SCREENSHOT NOTES

The screenshot shows the page at **very wide layout** (original 4826×26501px, rendered to 365×2000px at 0.08x scale) — hard to read individual component details. 

**To verify individually:**
1. Open Figma Design System TLS file key: `LccBZ1GKWQVwVzPtsSzk5Y`
2. Go to Page "🔵 03 · Atoms"
3. Scroll down to sections:
   - § ?? — Look for "Achievement / MasteryBadge / AchievementBadge" cluster
   - § ?? — Look for "ActivityItem"
   - § ?? — Look for "AvatarGroup"
4. Double-click each frame to see individual variants

---

## ✅ NEXT STEPS

### Verify (15 min)
- [ ] Open Achievement frame → count actual variants (screenshot)
- [ ] Open AchievementBadge frame → count variants
- [ ] Open ActivityItem frame → count variants and variant names
- [ ] Confirm MasteryBadge has 4 variants (beginner/intermediate/advanced/expert)
- [ ] Confirm AvatarGroup is just 1 symbol (not 6 variants)

### Fix (if all confirmed as above — 60 min)
- [ ] Achievement: Create 6 new variants for sm/md/lg (clone 3×)
- [ ] ActivityItem: Rename/recreate 5 type variants, add showRail property
- [ ] ActivityFeed: Create as Frame on Page 05
- [ ] ActivityTimeline: Create as Frame variant on Page 05
- [ ] AvatarGroup: Move to Page 02 — Composites

### Bind (30 min)
- [ ] All 4 components: Bind colors to variables
- [ ] All 4 components: Bind text to text styles
- [ ] All 4 components: Bind effects (shadows)

---

## 🔗 COMPARE WITH CODE

Use **[FIGMA-CODE-COMPARISON.md](FIGMA-CODE-COMPARISON.md)** checklist while verifying Figma.

Each section has:
- **Code Reality** — What props/variants React actually has
- **Figma Reality** — Table of what variants should exist
- **Checklist** — Verification boxes to check off
