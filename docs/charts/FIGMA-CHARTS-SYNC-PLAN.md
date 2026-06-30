# Figma Charts Sync Plan

**Status**: Ready for implementation  
**Effort**: 8-12 hours (full 8-chart library)  
**Target**: Phase 20 (Q3 2026)  
**File**: `LccBZ1GKWQVwVzPtsSzk5Y` (TLS Design System)  
**New Page**: `🎨 Charts — Data Visualization Library`

---

## Scope

Create Component Sets for all 8 production-ready charts in Figma with:
- Empty state + populated data states
- Responsive variants (sm/md/lg)
- Color scheme (TLS palette, Heatmap gradient)
- Interactive states (hover, selected, disabled)
- Token bindings (Variables, Text Styles, Effects)

---

## Page Structure (Figma)

```
📍 Charts — Data Visualization Library
│
├── 📋 Setup & Patterns
│   ├── Color Scale Reference (Heatmap red→yellow→green)
│   ├── Chart Container (wrapper component)
│   ├── Axis Labels (typography study)
│   ├── Legend Styles (typography + spacing)
│   └── Tooltip Patterns (default, formatted)
│
├── 🧩 Component Sets
│   ├── RadarChart
│   │   ├── Empty
│   │   ├── Default (6 axes + current+target)
│   │   ├── Interactive (hover axis)
│   │   └── Size: sm/md/lg
│   │
│   ├── BarChart
│   │   ├── Vertical Single
│   │   ├── Vertical Multi-Series
│   │   ├── Horizontal
│   │   └── Interactive (hover, click)
│   │
│   ├── LineChart
│   │   ├── Single Line
│   │   ├── Multi-Line
│   │   ├── With Dots
│   │   └── Smooth Curve
│   │
│   ├── AreaChart
│   │   ├── Single Area
│   │   ├── Stacked (2, 3, 4 series)
│   │   ├── With Gradient
│   │   └── Transparent Overlay
│   │
│   ├── PieChart
│   │   ├── Pie (default)
│   │   ├── Donut (4 variants by innerRadius)
│   │   ├── With % Labels
│   │   └── Hover State
│   │
│   ├── ScatterChart
│   │   ├── Dots (uniform)
│   │   ├── Bubbles (z-value sizing)
│   │   ├── With Quadrants
│   │   └── Tooltip Preview
│   │
│   ├── ComposedChart
│   │   ├── Bar + Line (single axis)
│   │   ├── Bar + Line (dual Y-axes)
│   │   ├── Multiple Series
│   │   └── Legend Toggle
│   │
│   └── HeatmapChart
│       ├── Small Grid (6x4)
│       ├── Medium Grid (8x6)
│       ├── Large Grid (12x10)
│       ├── With Values
│       ├── Color Scale Legend
│       └── Hover State
│
└── 📐 States & Documentation
    ├── Loading States (skeleton, shimmer)
    ├── Empty States (no data, placeholder)
    ├── Error States (fetch failed, retry)
    └── Responsive Breakpoints (375px, 768px, 1280px)
```

---

## Component Set Specifications

### RadarChart Component Set

**Properties**:
- `Size` : sm / md / lg (height)
- `State` : Empty / Populated / Hover
- `ShowLegend` : true / false

**Main Variant**: 
- Size: `md`
- State: `Populated` (6 competencies, current+target)
- ShowLegend: `true`

**Token Bindings**:
- Fills → `TLS/Colors/primary-500`, `TLS/Colors/secondary-500`
- Grid lines → `TLS/Colors/ink-200`
- Text → `TLS/Typography/body-sm`, `TLS/Colors/ink-600`
- Container → shadow-card (TLS/Effects/card)

---

### BarChart Component Set

**Properties**:
- `Layout` : Vertical / Horizontal
- `SeriesCount` : Single / Multi (2 / 3)
- `Size` : sm / md / lg
- `Interactive` : false / Hover / Selected

**Variants to create**:
- Vertical bars, single series (default 5 bars)
- Vertical bars, multi-series (3 bars, 2-3 series each)
- Horizontal bars (longer labels)
- With hover highlight on one bar
- With selected/active state on one bar

**Token Bindings**:
- Bar fills → COLOR_PALETTE (rotate through TLS colors)
- Grid → `TLS/Colors/ink-200`, dashed 1px
- Axis labels → `TLS/Typography/body-sm`
- Hover state → shadow lift + darker shade

---

### LineChart Component Set

**Properties**:
- `Series` : Single / Multi (2 / 3)
- `ShowDots` : true / false
- `Smooth` : true / false (curve style)
- `Size` : sm / md / lg

**Variants**:
- Single line, smooth curve, with dots (default)
- Multi-line (2 series), smooth
- Multi-line (3 series), smooth
- Multi-line, no dots (cleaner)
- Linear (not smooth) variant

**Token Bindings**:
- Line strokes → COLOR_PALETTE rotation
- Dots (fill) → corresponding line color
- Grid → `TLS/Colors/ink-200`, dashed
- Axis text → `TLS/Typography/body-sm`

---

### AreaChart Component Set

**Properties**:
- `Series` : Single / Stacked (2 / 3 / 4)
- `Smooth` : true / false
- `Size` : sm / md / lg

**Variants**:
- Single area, smooth, gradient fill
- Stacked 2 areas, smooth
- Stacked 3 areas, smooth
- Stacked 4 areas (test readability)
- Linear (not smooth)

**Token Bindings**:
- Area fills → COLOR_PALETTE + gradients (top→transparent)
- Gradients → linear, using TLS colors
- Grid → `TLS/Colors/ink-200`
- Axis → `TLS/Typography/body-sm`

---

### PieChart Component Set

**Properties**:
- `Mode` : Pie / Donut
- `InnerRadius` : 0 (pie) / 60 (donut)
- `ShowLabels` : true / false (% on slices)
- `ShowLegend` : true / false
- `Size` : sm / md / lg

**Variants**:
- Pie, with % labels, with legend
- Donut (innerRadius 60), with labels
- Donut (innerRadius 80), with labels (more hollow)
- Hover state on one slice (highlight + shadow)

**Token Bindings**:
- Slice fills → COLOR_PALETTE
- Label text → `TLS/Typography/caption`
- Legend → `TLS/Typography/body-sm`
- Hover highlight → glow or opacity change

---

### ScatterChart Component Set

**Properties**:
- `Bubble` : false (dots) / true (z-value sizing)
- `ShowQuadrants` : true / false (reference lines)
- `Size` : sm / md / lg

**Variants**:
- Scatter dots (fixed size)
- Bubble chart (3 different z-values visible)
- With quadrants (light grid reference)
- With tooltip preview on one dot

**Token Bindings**:
- Dot fills → primary-500, secondary-500, etc.
- Dot size range → [4px, 16px] for visual variety
- Quadrant lines → `TLS/Colors/ink-100`, subtle
- Tooltip → white bg, shadow-sm

---

### ComposedChart Component Set

**Properties**:
- `AxisMode` : Single / Dual
- `SeriesConfig` : Bar+Line / Bar+Bar / Line+Line
- `Size` : sm / md / lg

**Variants**:
- Bars (primary) + Line (secondary), single axis
- Bars (2 series) + Line, dual axes
- Legend shows color + series name

**Token Bindings**:
- Bar fills → primary, secondary
- Line strokes → corresponding colors
- Dual axis labels → different tints or icons
- Grid → `TLS/Colors/ink-200`

---

### HeatmapChart Component Set

**Properties**:
- `GridSize` : Small (6x4) / Medium (8x6) / Large (12x10)
- `ShowValues` : true / false (D1-D5 or %)
- `ShowLegend` : true / false (color scale)
- `Size` : sm / md / lg

**Variants**:
- 6x4 grid, values shown, legend
- 8x6 grid, values shown
- 12x10 grid, no values (too small), legend
- Hover state on one cell (highlight + shadow)
- Color scale: Red (low) → Yellow (mid) → Green (high)

**Color Scale** (use gradients via Variables):
```
0%   (Red)   → #F28559 (danger-base)
50%  (Yellow) → #F8B044 (accent-400)
100% (Green)  → #9DBEBA (success-base)
```

**Token Bindings**:
- Cell fills → gradient between danger/accent/success
- Cell text → `TLS/Typography/caption`, high contrast
- Grid borders → `TLS/Colors/ink-200`, 1px
- Legend scale → text + color swatches

---

## Token Bindings Checklist

For **each component set**, bind:

### Colors
- [ ] Primary series → `TLS/Colors/primary-500`
- [ ] Secondary series → `TLS/Colors/secondary-500`
- [ ] Success state → `TLS/Colors/success-base`
- [ ] Danger/error → `TLS/Colors/danger-base`
- [ ] Accent/warning → `TLS/Colors/accent-400`
- [ ] Grid/axis lines → `TLS/Colors/ink-200`
- [ ] Text/labels → `TLS/Colors/ink-600`

### Typography
- [ ] Axis labels → `TLS/Typography/body-sm`
- [ ] Tooltip text → `TLS/Typography/caption`
- [ ] Legend items → `TLS/Typography/body-sm`
- [ ] Chart title → `TLS/Typography/body`, semibold

### Effects
- [ ] Default state → `TLS/Effects/shadow-card`
- [ ] Hover state → `TLS/Effects/shadow-card-hover` or `shadow-card-lift`
- [ ] Tooltip bg → no shadow initially, add shadow on hover

### Spacing
- [ ] Chart container padding → `TLS/Spacing/spacing-stack` (16px)
- [ ] Legend gap → `TLS/Spacing/spacing-stack-xs` (8px)
- [ ] Chart-to-legend → `TLS/Spacing/spacing-stack` (16px)

---

## Workflow (Step by Step)

### Phase 1: Setup (1 hour)
1. Create new page `🎨 Charts — Data Visualization Library`
2. Build shared components:
   - `Color Scale Legend` (for heatmap)
   - `ChartContainer` (wrapper)
   - `Axis Label Styles` (typography study)
   - `Tooltip Component` (reusable)

### Phase 2: RadarChart (1.5 hours)
1. Create main frame: 6 competencies + current+target
2. Create property: Size (sm/md/lg)
3. Create property: State (Empty/Populated/Hover)
4. Bind all colors, text styles
5. Create instances for each size/state combo
6. Document in description: "Dreyfus competency assessment"

### Phase 3: BarChart (1.5 hours)
1. Create layout: Vertical bars (default)
2. Create property: Layout (Vertical/Horizontal)
3. Create property: SeriesCount (Single/Multi)
4. Create property: Interactive (false/Hover/Selected)
5. Create variants for each combo
6. Bind colors (rotate through palette per series)

### Phase 4: LineChart (1.5 hours)
1. Create frame: 3-line chart with dots
2. Create property: Series, ShowDots, Smooth, Size
3. Create color-coded lines (primary + secondary + accent)
4. Hover state: highlight one line, dim others

### Phase 5: AreaChart (1.5 hours)
1. Similar to LineChart but with area fills + gradients
2. Create property: Stacked (true/false)
3. Stacked variants: 2, 3, 4 series
4. Gradient fills (top color → transparent)

### Phase 6: PieChart (1 hour)
1. Create pie (default 5 slices)
2. Create donut variant (innerRadius variations)
3. Add % labels
4. Hover highlight on slice

### Phase 7: ScatterChart (1 hour)
1. Scatter dots (fixed 6-8px radius)
2. Bubble variant (size varies by z-value)
3. Quadrant reference lines (optional)

### Phase 8: ComposedChart (1 hour)
1. Bar + Line composite
2. Dual-axis variant
3. Legend toggle state

### Phase 9: HeatmapChart (1.5 hours)
1. Grid layout (auto-layout grid)
2. Color scale: red→yellow→green gradient
3. Cell labels (values)
4. Multiple grid sizes: 6x4, 8x6, 12x10
5. Hover highlight on cell

### Phase 10: Documentation & QA (1 hour)
1. Add descriptions to each component
2. Add "Figma usage" tips in descriptions
3. Link to code repository (CHARTS-SYSTEM.md)
4. Screenshot of full library for reference

---

## Success Criteria

- [ ] All 8 component sets created
- [ ] All color properties bound to TLS/Colors variables
- [ ] All text uses TLS/Typography text styles
- [ ] All component sets have 3+ variants (size + state)
- [ ] Hover states visible and interactive-feeling
- [ ] Heatmap color scale is gradient (not discrete)
- [ ] Each component has description with usage notes
- [ ] No hardcoded colors (all are variables)
- [ ] Page is organized + easy to navigate
- [ ] Screenshot of full library exported for docs

---

## Post-Sync Tasks

After Figma components are built:

1. **Update Components.tsx showcase** → add charts example section
2. **Link Figma → Code** → add "See in Figma" link in CHARTS-SYSTEM.md
3. **Notion DS DB sync** → mark Charts as "Phase 20 ✅"
4. **FYI design team** → "Charts library is live in Figma, reusable for all future dashboards"

---

## Tools & Notes

- **Use Figma's native component system** (not frames)
- **Variables for colors** (not hex values)
- **Text styles** for all text nodes
- **Auto-layout** for flexible charts
- **Variants panel** for size/state combinations
- **Descriptions** field for usage notes + code link

---

**Owner**: Design System + Development Team  
**Timeline**: 8-12 hours (can parallelize: charts expert builds 1-2 at a time)  
**Outcome**: Reusable chart library for Phase 20+ dashboard deployments
