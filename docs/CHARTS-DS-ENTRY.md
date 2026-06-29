# Charts System — Design System Entry

**Category**: Composites / Data Visualization  
**Layer**: Pattern-level (shared across all surfaces)  
**Status**: ✅ Production Ready (2026-06-29)  
**Library**: Recharts + custom SVG (HeatmapChart)  
**Token Bindings**: ✅ TLS Colors, Spacing, Typography

---

## Overview

Complete interactive charting system for analytics, dashboards, and data-rich surfaces across Passeport, Enterprise, Analytics, Coach, and Formateur interfaces.

**8 Chart Types**:
1. **RadarChart** — Dreyfus competency assessment
2. **BarChart** — Rankings and comparisons (horizontal/vertical)
3. **LineChart** — Trends and progression timelines
4. **AreaChart** — Cumulative and stacked distributions
5. **PieChart** — Composition and breakdown (pie/donut)
6. **ScatterChart** — Correlation and bubble analysis
7. **ComposedChart** — Hybrid bar+line with dual axes
8. **HeatmapChart** — Custom grid matrix (team skills)

---

## Figma Component Architecture

**Page**: `🎨 Charts — Data Visualization Library`

**Structure**:
```
📋 Charts Library
├── 🧬 Atoms
│   ├── Tooltip (Recharts default + custom style)
│   ├── Legend (interactive, clickable)
│   └── Axis Label (typography binding)
│
├── 📊 Component Sets
│   ├── RadarChart
│   │   ├── Default (empty state)
│   │   ├── Populated (6 axes, current+target)
│   │   ├── Hover (axis highlighted)
│   │   └── Dark mode
│   │
│   ├── BarChart
│   │   ├── Vertical
│   │   ├── Horizontal
│   │   ├── Multi-series
│   │   └── Interactive (on-hover, on-click)
│   │
│   ├── LineChart
│   │   ├── Single line
│   │   ├── Multi-line
│   │   ├── With dots
│   │   └── Smooth curve
│   │
│   ├── AreaChart
│   │   ├── Single area
│   │   ├── Stacked areas
│   │   ├── With gradient
│   │   └── Transparent overlay
│   │
│   ├── PieChart
│   │   ├── Pie (default)
│   │   ├── Donut (inner radius)
│   │   ├── With labels
│   │   └── Hover state
│   │
│   ├── ScatterChart
│   │   ├── Dots (fixed size)
│   │   ├── Bubbles (z-value)
│   │   ├── Quadrants (reference lines)
│   │   └── With tooltip
│   │
│   ├── ComposedChart
│   │   ├── Bar + Line (left axis)
│   │   ├── Dual Y-axes
│   │   ├── Multiple series
│   │   └── Legend toggle
│   │
│   └── HeatmapChart
│       ├── Grid layout
│       ├── Color scale (red→yellow→green)
│       ├── With values
│       └── Hover state
│
└── 📐 Patterns
    ├── Chart Container (wrapper)
    ├── Loading state (skeleton)
    ├── Empty state (no data)
    ├── Error state (data fetch failed)
    └── Responsive breakpoints (sm/md/lg)
```

---

## Color Bindings (TLS Palette)

All charts bind to Variables (NOT hardcoded colors):

| Role | Token | Hex | Figma Variable |
|------|-------|-----|-----------------|
| **Primary Series** | `primary-500` | #55A1B4 | `TLS/Colors/primary-500` |
| **Secondary Series** | `secondary-500` | #ED843A | `TLS/Colors/secondary-500` |
| **Success** | `success-base` | #9DBEBA | `TLS/Colors/success-base` |
| **Danger** | `danger-base` | #F28559 | `TLS/Colors/danger-base` |
| **Warning** | `accent-400` | #F8B044 | `TLS/Colors/accent-400` |
| **Grid/Axis** | `ink-200` | #e5e7eb | `TLS/Colors/ink-200` |
| **Labels** | `ink-600` | #4b5563 | `TLS/Colors/ink-600` |
| **Background** | `white` | #ffffff | `TLS/Colors/white` |

**Heatmap Gradient** (Red→Yellow→Green):
- Red (0): #F28559 (danger-base)
- Yellow (0.5): #F8B044 (accent-400)
- Green (1.0): #9DBEBA (success-base)

---

## Typography Bindings

All text in charts use TLS Text Styles:

| Element | Style | Font | Size | Weight |
|---------|-------|------|------|--------|
| Axis labels | `body-sm` | Nunito | 14px | Regular |
| Tooltip text | `caption` | Nunito | 13px | Regular |
| Legend labels | `body-sm` | Nunito | 14px | Regular |
| Chart title | `body` | Nunito | 16px | Semibold |

---

## Spacing Bindings

Chart elements use semantic tokens:

| Element | Token | Value | Used For |
|---------|-------|-------|----------|
| Container padding | `p-stack` | 16px | Chart wrapper |
| Legend gap | `gap-stack-xs` | 8px | Legend items |
| Chart-to-legend | `gap-stack` | 16px | Vertical separation |
| Section separation | `gap-section` | 32px | Between charts |

---

## States & Variants

### Common States (All Charts)

- **Default** — Resting state, legend visible
- **Hover** — Tooltip appears, axis/bar/dot highlighted
- **Selected** — For interactive drill-down (e.g., bar selected)
- **Loading** — Skeleton or shimmer animation
- **Empty** — No data message + placeholder
- **Error** — Error message + retry button

### Size Variants

| Size | Height | Mobile | Desktop | Use Case |
|------|--------|--------|---------|----------|
| `sm` | 250px | ✅ Sidebars, cards | - | Compact dashboards |
| `md` | 350px | ✅ Main content | ✅ Default | Standard dashboards |
| `lg` | 450px | - | ✅ Detail pages | Immersive analytics |

---

## Interactions

### Click Handlers (Per Chart)

```
RadarChart     → onAxisClick → Navigate to competency detail
BarChart       → onBarClick → Navigate to learner/team detail
LineChart      → onPointClick → Navigate to time period detail
PieChart       → onSliceClick → Navigate to category detail
ScatterChart   → onDotClick → Navigate to learner detail
ComposedChart  → onBarClick/onPointClick → same as bar/line
HeatmapChart   → onCellClick → Navigate to learner+skill detail
```

### Hover Interactions

- **Tooltip** — Data value, formatted (e.g., "D3", "78%")
- **Highlight** — Bar/line/dot highlights in darker shade
- **Shadow lift** — Card elevation on hover (if chart is in card)

### Legend Interactions

- **Click to toggle** — Series visibility on/off
- **Hover highlight** — Corresponding bars/lines highlight

---

## Responsive Behavior

### Mobile (375px)

- Single-column layout
- Small size chart (250px height)
- Horizontal scroll for wide charts (HeatmapChart, ComposedChart)
- Legend below chart, stacked
- Tooltip inline (not floating)

### Desktop (1280px+)

- Multi-column layouts possible
- Medium size chart (350px default, or `lg` for 450px)
- Full-width charts
- Legend right or bottom
- Floating tooltips

---

## Accessibility

- **Keyboard Navigation** — Tab through chart elements
- **Screen Reader** — Axis labels announced, data values in tooltips
- **Focus Visible** — Focus ring on interactive elements
- **Color Contrast** — All text ≥ 4.5:1 (AA standard)
- **Motion** — No infinite animations; reduced-motion respected

---

## Code Reference

**Import**:
```tsx
import {
  RadarChart, BarChart, LineChart, AreaChart,
  PieChart, ScatterChart, ComposedChart, HeatmapChart,
  ChartContainer,
} from '@/components/charts';
```

**Paths**:
- `src/components/charts/RadarChart.tsx`
- `src/components/charts/BarChart.tsx`
- `src/components/charts/LineChart.tsx`
- `src/components/charts/AreaChart.tsx`
- `src/components/charts/PieChart.tsx`
- `src/components/charts/ScatterChart.tsx`
- `src/components/charts/ComposedChart.tsx`
- `src/components/charts/HeatmapChart.tsx`
- `src/components/charts/index.ts` (barrel)

---

## Phase Deployments

### Phase 20+ (Planned Integration)

| Surface | Chart | ETA | Priority |
|---------|-------|-----|----------|
| Passeport | RadarChart ✅, AreaChart | Q3 2026 | P0 |
| Enterprise | HeatmapChart, BarChart | Q3 2026 | P1 |
| Analytics | LineChart, AreaChart, ComposedChart | Q4 2026 | P1 |
| Coach | ScatterChart, RadarChart | Q3 2026 | P2 |
| Formateur | PieChart, BarChart | Q4 2026 | P2 |

---

## Design Guidelines

### ✅ Do's

- Use charts to answer a specific question ("What skills need development?")
- Combine 2-3 related charts for holistic insights
- Bind all colors to Variables (no hardcoding)
- Include interactive tooltips + click handlers
- Support responsive sizing (sm/md/lg)
- Always include a legend or data label

### ❌ Don'ts

- Don't use more than 5-6 series per chart (visual clutter)
- Don't mix unrelated data (use separate charts instead)
- Don't hardcode colors — always use TLS Variables
- Don't forget legends on multi-series charts
- Don't skip empty/error states
- Don't use animations on initial render (reduced-motion)

---

## Future Enhancements (Phase 21+)

- [ ] **TimelineChart** — Vertical or horizontal learner journey
- [ ] **GaugeChart** — Circular progress indicators
- [ ] **SankeyChart** — Flow visualization (skill progression)
- [ ] **NetworkChart** — Learning path interconnections
- [ ] **WaterfallChart** — Cumulative impact visualization
- [ ] **Animations** — Framer Motion entrance effects
- [ ] **Export** — PNG/SVG chart download
- [ ] **Drill-Down** — Multi-level chart navigation

---

## Testing Checklist

- [ ] All charts render in Figma (empty + populated states)
- [ ] Colors match TLS palette exactly
- [ ] Typography uses TLS Text Styles
- [ ] Responsive breakpoints work (375px, 768px, 1280px)
- [ ] Hover/focus states visible
- [ ] Tooltips are readable and positioned correctly
- [ ] Legends are interactive (toggle series)
- [ ] Code compiles (0 TS errors)
- [ ] No console warnings/errors in dev server

---

## Maintenance

**Owner**: Design System Team  
**Last Updated**: 2026-06-29  
**Next Review**: 2026-09-30 (post-Phase-20 deployment)

---

**Documentation**: See `/docs/CHARTS-SYSTEM.md` (detailed API) and `/docs/CHARTS-QUICK-START.md` (quick reference)
