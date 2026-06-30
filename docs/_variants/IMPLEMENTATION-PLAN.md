# Variants Rename + Structure Redesign — Implementation Plan

## Phase 1: Renaming & Labeling (Quick Win)
**Goal:** Update variant labels everywhere to use creative names
**Files to update:**
- [ ] `MarketingVariantLab.tsx` — VARIANT_LABELS map
- [ ] Component file names? (keep current names or rename files too?)
- [ ] Comments in each component file header
- [ ] Figma pages (if applicable)

**Decision needed:** Do we rename FILES too (MarketingHomeLight → MarketingHomeClarity) or just labels?

---

## Phase 2: Section Layout Audit (Deep Dive)
**Goal:** Extract exact layout patterns used in each variant for each section
**Deliverable:** Markdown table showing:
- Section name (Hero, Offres, Pédagogie, Stats, CTA, etc.)
- Current layout in each variant
- CSS grid/flex patterns
- Component composition

**Output structure:**
```
| Section | Clarity | Narrative | Immersion | Refined | Cinematic | Organic |
|---------|---------|-----------|-----------|---------|-----------|---------|
| Hero | text-center | text-left | full-motion | centered | video-bg | organic-blob |
| Offres | 3-col grid | 3-col grid | tabs | 3-col grid | 3-col grid | 2+1 zigzag |
| etc | | | | | | |
```

---

## Phase 3: Layout Variation Prototypes (Creative Exploration)
**Goal:** For each variant, create 2-3 alternative section layouts
**Approach:** Create separate "remix" variants that show off different section combos

**Example:**
- `Clarity-WithZigzag`: Keep hero + offres layout, but use 2+1 zigzag for offers
- `Narrative-WithTabs`: Keep narrative flow, but use tab-based offers section
- Etc.

**Decision needed:** Do we keep these as exploratory files or integrate into main variants?

---

## Phase 4: Section Redesign by Component (Optional, If Time)
**Goal:** For high-impact sections (Offres, Pédagogie), design 3 layout options in code

**Sections to prioritize:**
1. **Offres (3-pillar section)** — 4 layout options:
   - 3-col grid (current)
   - 2+1 zigzag
   - Sequential tabs
   - Staggered cards

2. **Pédagogie (Values)** — 3 layout options:
   - Text-left, visual-right (current)
   - Text-top, visual-bottom
   - 50/50 split

3. **Stats** — 3 layout options:
   - 4-col grid (current)
   - Inline metrics
   - Vertical bars

---

## Phase 5: Visual Comparison & User Feedback
**Goal:** Screenshots of variants with alternative layouts
**Format:** Grid showing each variant × layout combination
**Platform:** Variant lab or dedicated showcase

---

## Questions Before Implementation

1. **File Naming:** Rename files (MarketingHomeLight.tsx → MarketingHomeClarity.tsx) or keep current names?
   - Pros of rename: Clearer intent, better discoverability
   - Cons: Larger refactor, breaking imports everywhere
   
2. **Layout Variants:** Create separate files for layout alternatives?
   - Option A: One file per variant with layout prop (Clarity, Narrative, etc.)
   - Option B: Separate files for combos (ClarityWithZigzag, etc.)
   - Option C: Layout configs passed as props (most flexible)

3. **Scope:** Just rename labels first, or implement new layouts too?
   - MVP: Rename only (1-2 hours)
   - Full: Rename + 1 layout alternative per variant (8-12 hours)

