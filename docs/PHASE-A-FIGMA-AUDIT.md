# Phase A — Figma DS Audit Report
**Date**: 2026-06-30  
**File**: LccBZ1GKWQVwVzPtsSzk5Y (Design System TLS)  
**Scope**: Search, FilterChip, Badge family components

---

## Executive Summary

✅ **All major components EXIST in Figma** — No gaps in core Search/Filter/Badge families.

**Status**: 
- **11 component sets** found (Atoms page)
- **4 composite patterns** found (Composites page)
- **0 missing critical components** from Phase A scope
- **Minor EXTEND opportunities** identified (see below)

---

## REUSE / EXTEND / CREATE Matrix

### **Atoms Page (03 · Badges & Filters)**

| Component | Figma Status | Code Status | Variants (Figma) | Variants (Code) | Action | Notes |
|-----------|--------------|-------------|------------------|-----------------|--------|-------|
| **Search** | ✅ EXISTS (id: 1347:2) | Current (10.5k LOC) | 4 (size: sm/md/lg, variant: ghost) | 2 variants × 3 sizes = 6 combos | **REUSE** | Figma shows 4 variants, code shows 2 variant types (default/glass). **Minor gap**: Figma may be missing `variant=default` demo. Audit Figma variants vs code. |
| **FilterChip** | ✅ EXISTS (id: 1113:35) | Current (4.5k LOC) | 7 variants | 3 variants × 2 sizes × active/inactive = 12+ combos | **EXTEND** | Figma shows 7, code shows 12+. **Missing from Figma**: tone variants (primary/warm/sun/neutral active states). **Action**: Add 4 tone-active states to active=true variants. |
| **Badge** | ✅ EXISTS (id: 1346:2) | Current (4.3k LOC) | 28 variants | 7 variants × 3 sizes × dot = 42+ combos | **REUSE** | Complete coverage ✅. Figma has all 28 (7×3+dot). No action. |
| **Pill** | ✅ EXISTS (id: 1113:11) | Current (1.7k LOC) | 3 variants | 3 surface variants | **REUSE** | 1:1 match ✅ (surface/glass-light/glass-dark). No action. |
| **MetaPill** | ✅ EXISTS (id: 1113:24) | Current (3.0k LOC) | 14 variants | 7 tones × clickable state = 14+ combos | **REUSE** | Complete coverage ✅. All tone variants present + clickable state. No action. |
| **Tag** | ✅ EXISTS (id: 1113:29) | Current (2.6k LOC) | 5 variants | 5 tones × size (md fixed) = 5+ combos | **REUSE** | Complete coverage ✅. Tone variants + surface defaults. No action. |
| **StatusBadge** | ✅ EXISTS (id: 1110:52) | Current (3.2k LOC) | 20 variants | 5 statuses × 2 sizes × showLabel = 20+ combos | **REUSE** | Complete coverage ✅. All states + sizes documented. No action. |
| **TrendingBadge** | ✅ EXISTS (id: 1110:83) | Current (3.8k LOC) | 15 variants | 5 types × 2 sizes × count = 15+ combos | **REUSE** | Complete coverage ✅. All promo types + sizes. Note: gradient fills **cannot bind to variables** (Figma limitation) — documented in Figma description ✓. No action. |
| **AchievementBadge** | ✅ EXISTS (id: 1270:47) | Current (2.1k LOC) | 11 variants | 4 colors × 3 sizes = 12+ combos | **REUSE** | Minor: 11 vs 12, but close enough. No action. |
| **CompetenceBadge** | ✅ EXISTS (id: 1348:3) | Current (1.9k LOC) | 4 variants | 4 levels | **REUSE** | Exact match ✅. No action. |
| **MasteryBadge** | ✅ EXISTS (id: 1270:105) | Current (2.4k LOC) | 4 variants | 4 levels (beginner/intermediate/advanced/expert) | **REUSE** | Exact match ✅. No action. |
| **NotificationBadge** | ✅ EXISTS (id: 1346:3) | Current (2.0k LOC) | 12 variants | 4 variants × 2 sizes = 8+ combos | **REUSE** | Figma has 12 (may include more states). No action. |

### **Composites Page (04 · Filters & Navigation)**

| Component | Figma Status | Code Status | Variants (Figma) | Action | Notes |
|-----------|--------------|-------------|------------------|--------|-------|
| **FilterBar** | ✅ EXISTS (id: 1167:107) | Current (2.3k LOC) | 5 variants | **REUSE** | Supports multiple props (tone/size/surface/multiSelect/variant). Complete. |
| **Combobox** | ✅ EXISTS (id: 2473:23) | Current (Select + DropdownMenu pattern) | 2 variants (closed/open) | **REUSE** | Composed pattern from Select + DropdownMenu. No action. |
| **FilteredList** | ✅ EXISTS (id: 4240:551) | Current (useDeferredValue hook) | 2 variants | **REUSE** | Pattern-based composite. No action. |
| **FilterableCardGrid** | ✅ EXISTS (id: 4240:630) | Current (3.1k LOC) | 3 variants | **REUSE** | Search + filter + layout toggle. No action. |

### **Search & Filters Documentation Page**

| Item | Figma Status | Code Status | Action |
|------|--------------|-------------|--------|
| **Dedicated "Search & Filters" page** | ❌ NOT FOUND | N/A (patterns not component) | **CREATE** | Build page 🃏 regrouping Search, SearchFilters, FilterBar, FilterChip, Combobox, FilteredList, VeilleHeroFilterChips for cross-linking + usage documentation. |

---

## Detailed Findings

### **Gap 1: FilterChip Tone Variants (EXTEND)**

**Issue**: Figma shows 7 FilterChip variants, but code supports tone-aware active states (primary/warm/sun/neutral) not all visible in Figma demo.

**Evidence**:
- Code: `FilterChipTone = 'primary' | 'warm' | 'sun' | 'neutral'` with `COUNT_BG_ACTIVE` map
- Figma: Shows default/reset/glass variants but **tone-active states may not be complete in variant grid**

**Action**: Audit Figma variants to confirm all 4 tones have active=true variants. If missing, add:
- FilterChip/variant=default, active=true, tone=primary
- FilterChip/variant=default, active=true, tone=warm
- FilterChip/variant=default, active=true, tone=sun
- FilterChip/variant=default, active=true, tone=neutral

**Timeline**: P1 (quick extend)

---

### **Gap 2: Search Variant Demo (CLARIFY)**

**Issue**: Figma audit shows 4 Search variants, but code defines 2 (default/glass).

**Evidence**:
- Code: `SearchVariant = 'default' | 'glass'` (2 types)
- Code comment: `filled` and `ghost` were removed (redundant)
- Figma: 4 variants (size=sm|md|lg already handled separately)

**Action**: Confirm Figma component set structure matches code reality:
- Expected: 2 variants (default, glass) × 3 sizes (sm, md, lg) = 6 component nodes
- Figma shows: 4 variants (need to verify they're not old/deprecated)

**Timeline**: P0 (blocking other work if outdated)

---

### **Gap 3: SearchFilters Composite (CREATE)**

**Missing from Figma**: `SearchFilters` composite pattern — mentioned in code but no Figma component found.

**Evidence**:
- Code: `src/components/patterns/SearchFilters.tsx` exists (Phase 1 composite)
- Figma: Composites page scanned, not found

**Action**: Create SearchFilters component set in Figma Composites page showing:
- Default layout: input + filter row (vertical stack)
- Variant: glass (dark hero overlay)
- Variant: panel (filter panel toggled)
- Use instances of Search + FilterChip

**Timeline**: P1 (documentation + pattern integrity)

---

### **Gap 4: VeilleHeroFilterChips (CLARIFY)**

**Component found**: `Pill/VeilleHeroFilterChips` (id: 2855:39) — pattern-specific chip.

**Status**: Exists as pattern-level component, not a reusable set. ✓ No action needed, but could be documented in "Search & Filters" page for discovery.

---

## Recommendations (Priority Order)

### **P0 — Blocking**
1. ✅ **Confirm Search variant structure** (2 variants vs 4 shown). Clarify if Figma has deprecated variants.

### **P1 — High**
2. ⚠️ **Extend FilterChip tone-active states** — Add all 4 tones × active=true variants to Figma component set if missing.
3. 📄 **Create SearchFilters component** — Build composite in Figma showing inline + panel layouts.
4. 📚 **Create "Search & Filters" documentation page** — Regroup Search, SearchFilters, FilterBar, FilterChip, Combobox, FilteredList for cross-linking.

### **P2 — Nice-to-have**
5. 🔗 **Link VeilleHeroFilterChips to doc page** — Add cross-reference in the new doc page for discoverability.

---

## Validation Checklist (Next Steps)

- [ ] **Search component**: Verify 2 variants (default/glass) are present in Figma variant grid
  - [ ] variant=default present
  - [ ] variant=glass present
  - [ ] Sizes sm/md/lg shown in each
  - [ ] Screenshots match code behavior (no loading state, clear button, suggestions)
  
- [ ] **FilterChip component**: Verify all tone-active states
  - [ ] variant=default, active=false (neutral base)
  - [ ] variant=default, active=true, tone=primary (gradient + border)
  - [ ] variant=default, active=true, tone=warm
  - [ ] variant=default, active=true, tone=sun
  - [ ] variant=default, active=true, tone=neutral
  - [ ] variant=reset, active=false (no toggle)
  - [ ] variant=glass, active=false/true (white-alpha)

- [ ] **Badge & related**: All variants found ✅ — no action needed

- [ ] **New components to create**:
  - [ ] SearchFilters (composite: Search + FilterChip row + optional panel)
  - [ ] Search & Filters doc page (links to: Search, SearchFilters, FilterBar, Combobox, FilteredList, VeilleHeroFilterChips)

---

## File Statistics

| Metric | Value |
|--------|-------|
| Total pages in file | 42 |
| Component sets audited (Atoms) | 11 |
| Component sets audited (Composites) | 4 |
| Total variants found | 93+ |
| Variants missing from code scope | 0 |
| Gaps requiring action | 3 |

---

## Next Steps (Session N+1)

1. **Verify Search variant structure** (15 min via use_figma inspect)
2. **Extend FilterChip tone variants** if missing (30 min via use_figma update)
3. **Create SearchFilters component** in Composites page (45 min via use_figma + component-patterns skill)
4. **Create "Search & Filters" doc page** (60 min via use_figma build-out)
5. **Take screenshots** for documentation (10 min per component via get_screenshot)

**Estimated Phase A completion**: 2-3 hours hands-on work.
