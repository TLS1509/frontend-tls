# Charts System — Interactive Recharts Infrastructure

**Version**: 1.0 (2026-06-29)  
**Status**: Active (Passeport integrated, Phase 20 roadmap)  
**Library**: [Recharts](https://recharts.org) (~50kb gzip)

---

## Overview

Centralized charting system for multi-surface data visualization (Passeport, Enterprise, Analytics, Coach Dashboard). Built on Recharts for lightweight interactivity without heavy D3 dependencies.

### Why Recharts?

- **React-native** — hooks & component model
- **Lightweight** — 50kb gzip vs D3 (100+kb) or ECharts (150+kb)
- **Responsive** — `ResponsiveContainer` auto-scales to parent
- **Interactions** — tooltips, legend, axis click handlers out-of-the-box
- **Accessibility** — semantic SVG, ARIA labels
- **Tailwind-compatible** — can style labels/legend with custom className

---

## Architecture

```
src/components/charts/
├── ChartContainer.tsx      # Wrapper for consistent styling/spacing
├── RadarChart.tsx          # Radar visualization (Recharts Radar)
├── index.ts                # Barrel export
└── (future) BarChart, LineChart, HeatmapChart, etc.
```

### Consumption Pattern

```tsx
import { RadarChart } from '@/components/charts';

<RadarChart
  data={competencies}
  size="md"
  onAxisClick={(axis) => navigate(`/competence/${axis.label}`)}
  showLegend
/>
```

---

## Component Catalog

Quick reference for all available charts:

| Chart | Type | Use Cases | Import |
|-------|------|-----------|--------|
| **RadarChart** | Radar (Dreyfus) | Competency progression, skill assessment | `import { RadarChart }` |
| **BarChart** | Bar/Column | Team rankings, category comparisons, performance | `import { BarChart }` |
| **LineChart** | Line | Trends over time, progression, engagement timelines | `import { LineChart }` |
| **AreaChart** | Area | Cumulative metrics, distribution, stacked trends | `import { AreaChart }` |
| **PieChart** | Pie/Donut | Distribution, completion rates, category breakdown | `import { PieChart }` |
| **ScatterChart** | Scatter/Bubble | Correlation, learner matrix, performance scatter | `import { ScatterChart }` |
| **ComposedChart** | Bar + Line | Complex metrics (count + score), dual-axis analysis | `import { ComposedChart }` |
| **HeatmapChart** | Heatmap Grid | Team skills matrix, learner progress grid | `import { HeatmapChart }` |

---

## Detailed Component APIs

### `RadarChart`

Dreyfus competency radar with current + target levels.

#### Props

```tsx
interface RadarChartProps {
  /** Data points (max 6 axes) */
  data: RadarDataPoint[];
  
  /** Called when axis label clicked */
  onAxisClick?: (axis: RadarDataPoint, index: number) => void;
  
  /** Chart size */
  size?: 'sm' | 'md' | 'lg';  // defaults to 'md'
  
  /** Show legend */
  showLegend?: boolean;       // defaults to true
  
  /** Additional CSS */
  className?: string;
}

interface RadarDataPoint {
  label: string;      // e.g. "Gestion de projet"
  current: number;    // 0–5 (Dreyfus level)
  target?: number;    // 0–5 (objectif, optional)
}
```

#### Interactions

- **Hover** → Tooltip shows `Durrent` level for each axis
- **Axis click** → Fires `onAxisClick`, e.g. to navigate to competency detail
- **Axis hover** → Highlights axis label in primary color (visual feedback)
- **Legend** → Click to toggle series visibility (Recharts default)

#### Colors

| Series | Color | CSS Var |
|--------|-------|---------|
| `current` | `#55A1B4` | `primary-500` |
| `target` | `#ED843A` | `secondary-500` |

#### Responsive Sizing

| Size | Height | Mobile | Desktop |
|------|--------|--------|---------|
| `sm` | 250px | ✅ Small cards | - |
| `md` | 350px | ✅ Default overview | ✅ Primary use |
| `lg` | 450px | - | ✅ Detail pages |

#### Example

```tsx
const competencies = [
  { label: 'Gestion de projet', current: 3, target: 4 },
  { label: 'Communication', current: 4, target: 5 },
  { label: 'Leadership', current: 2, target: 3 },
];

<RadarChart
  data={competencies}
  size="md"
  onAxisClick={(axis) => {
    console.log(`Selected: ${axis.label}`);
    navigate(`/passeport/competence/${axis.label}`);
  }}
/>
```

### `BarChart`

Horizontal or vertical bar comparisons with single or multiple series.

#### Key Props

```tsx
interface BarChartProps {
  data: BarChartDataPoint[];
  dataKey: string;           // single series key
  series?: Array<{           // or multiple series
    key: string;
    label: string;
    color?: string;
  }>;
  size?: 'sm' | 'md' | 'lg';
  layout?: 'vertical' | 'horizontal'; // bar direction
  onBarClick?: (data, index) => void;
}
```

#### Example

```tsx
<BarChart
  data={[
    { label: 'Alice', score: 85 },
    { label: 'Bob', score: 72 },
    { label: 'Carol', score: 91 },
  ]}
  dataKey="score"
  size="md"
  onBarClick={(data) => navigate(`/learner/${data.label}`)}
/>
```

---

### `LineChart`

Trends and progression over time with smooth curves.

#### Key Props

```tsx
interface LineChartProps {
  data: LineChartDataPoint[];
  dataKey?: string;         // single series
  series?: Array<{          // multiple series
    key: string;
    label: string;
    color?: string;
    strokeWidth?: number;
    strokeDasharray?: string;
  }>;
  size?: 'sm' | 'md' | 'lg';
  smooth?: boolean;         // default: true
  showDots?: boolean;       // default: true
  onPointClick?: (data, index) => void;
}
```

#### Example

```tsx
const data = [
  { label: 'Week 1', xp: 200, completions: 3 },
  { label: 'Week 2', xp: 350, completions: 5 },
  { label: 'Week 3', xp: 600, completions: 8 },
];

<LineChart
  data={data}
  series={[
    { key: 'xp', label: 'XP Gained', color: '#55A1B4' },
    { key: 'completions', label: 'Lessons Done', color: '#ED843A' },
  ]}
  smooth
  showDots
/>
```

---

### `AreaChart`

Cumulative trends and stacked distributions.

#### Key Props

```tsx
interface AreaChartProps {
  data: AreaChartDataPoint[];
  dataKey?: string;
  series?: Array<{
    key: string;
    label: string;
    color?: string;
  }>;
  size?: 'sm' | 'md' | 'lg';
  stacked?: boolean;       // default: true
  smooth?: boolean;        // default: true
  fillOpacity?: number;    // 0-1, default: 0.3
}
```

#### Example

```tsx
<AreaChart
  data={[
    { label: 'Month 1', soft: 30, technical: 20, leadership: 10 },
    { label: 'Month 2', soft: 50, technical: 35, leadership: 25 },
    { label: 'Month 3', soft: 80, technical: 60, leadership: 45 },
  ]}
  series={[
    { key: 'soft', label: 'Soft Skills' },
    { key: 'technical', label: 'Technical' },
    { key: 'leadership', label: 'Leadership' },
  ]}
  stacked
/>
```

---

### `PieChart`

Distribution and composition (pie or donut mode).

#### Key Props

```tsx
interface PieChartProps {
  data: PieChartDataPoint[];  // { label, value, color? }
  size?: 'sm' | 'md' | 'lg';
  showLegend?: boolean;
  showLabels?: boolean;        // percentage on slices
  donut?: boolean;             // default: false (pie mode)
  innerRadius?: number;        // for donut, default: 60
  onSliceClick?: (data, index) => void;
}
```

#### Example

```tsx
<PieChart
  data={[
    { label: 'Completed', value: 34 },
    { label: 'In Progress', value: 15 },
    { label: 'Not Started', value: 51 },
  ]}
  donut
  showLabels
  onSliceClick={(data) => console.log(`${data.label}: ${data.value}`)}
/>
```

---

### `ScatterChart`

Correlation analysis and distribution (bubble chart optional).

#### Key Props

```tsx
interface ScatterChartProps {
  data: ScatterChartDataPoint[]; // { label, x, y, z?, color? }
  xAxisLabel?: string;
  yAxisLabel?: string;
  xDomain?: [number, number];
  yDomain?: [number, number];
  size?: 'sm' | 'md' | 'lg';
  bubbleScale?: number;         // scale for z value
  onDotClick?: (data, index) => void;
}
```

#### Example

```tsx
<ScatterChart
  data={[
    { label: 'Alice', x: 85, y: 90, z: 50 },  // z = hours spent
    { label: 'Bob', x: 72, y: 78, z: 40 },
    { label: 'Carol', x: 91, y: 88, z: 60 },
  ]}
  xAxisLabel="Skill Level (0-100)"
  yAxisLabel="Engagement (0-100)"
  bubbleScale={2}
  onDotClick={(data) => navigate(`/learner/${data.label}`)}
/>
```

---

### `ComposedChart`

Complex metrics combining bars + lines (e.g., activity count + average score).

#### Key Props

```tsx
interface ComposedChartProps {
  data: ComposedChartDataPoint[];
  series: ComposedChartSeriesConfig[];  // { key, label, type: 'bar'|'line', ... }
  size?: 'sm' | 'md' | 'lg';
  showLegend?: boolean;
  dualAxis?: boolean;          // left & right Y axes
  leftAxisLabel?: string;
  rightAxisLabel?: string;
}
```

#### Example

```tsx
<ComposedChart
  data={[
    { label: 'Week 1', activities: 15, avgScore: 78 },
    { label: 'Week 2', activities: 22, avgScore: 82 },
    { label: 'Week 3', activities: 18, avgScore: 85 },
  ]}
  series={[
    { key: 'activities', label: 'Activities', type: 'bar' },
    { key: 'avgScore', label: 'Avg Score', type: 'line' },
  ]}
  dualAxis
  leftAxisLabel="Count"
  rightAxisLabel="Score (0-100)"
/>
```

---

### `HeatmapChart`

Team skills matrix, learner progress grids (Red→Yellow→Green color scale).

#### Key Props

```tsx
interface HeatmapChartProps {
  data: HeatmapDataPoint[];    // { x, y, value }
  minValue?: number;           // 0 (red)
  maxValue?: number;           // 5 (green), or 100
  cellSize?: number;           // pixels, default: 48
  showValues?: boolean;        // show D1-D5 or %
  onCellClick?: (data) => void;
}
```

#### Example

```tsx
<HeatmapChart
  data={[
    { x: 'Alice', y: 'Leadership', value: 3 },
    { x: 'Alice', y: 'Communication', value: 4 },
    { x: 'Bob', y: 'Leadership', value: 2 },
    { x: 'Bob', y: 'Communication', value: 5 },
  ]}
  maxValue={5}
  cellSize={50}
  showValues
  onCellClick={(data) => navigate(`/learner/${data.x}/skill/${data.y}`)}
/>
```

---

### `ChartContainer`

Wrapper for consistent styling across all charts.

#### Props

```tsx
interface ChartContainerProps {
  children: React.ReactNode;
  className?: string;  // Additional classes
}
```

#### Styling

- White background (`bg-white`)
- Subtle border (`border border-ink-100`)
- Padding (`p-stack`)
- Rounded corners (`rounded-lg`)

#### Usage

```tsx
import { ChartContainer } from '@/components/charts';

<ChartContainer>
  <RadarChart {...props} />
</ChartContainer>
```

---

## Design System Integration

### Colors

All chart colors bound to TLS palette:

```css
/* Primary colors */
--color-primary-500: #55A1B4;   /* current levels */
--color-secondary-500: #ED843A; /* targets/goals */

/* Supporting colors (future) */
--color-success-base: #9DBEBA;
--color-danger-base: #F28559;
```

### Spacing

Charts use semantic spacing tokens:
- `gap-stack` (16px) — between chart and legend
- `gap-section` (32px) — between charts/sections
- `p-stack` (16px) — chart container padding

### Typography

Recharts labels inherit from global styles:
- Axis labels: `.text-body-sm` (14px)
- Tooltip: `.text-caption` (13px)
- Legend: `.text-body-sm` (14px)

---

## Current Implementation

### Passeport Compétences (`/passeport`)

**Status**: ✅ Live (2026-06-29)

- **Component**: `RadarChart` (replaced custom SVG `CompetencyRadar`)
- **Data**: 6 competencies (H.S.O: Habilités, Soft, Objectif)
- **Interactions**:
  - Hover axes → tooltip showing Dreyfus level
  - Click axis → highlight + scroll to detail in Competences tab
  - Interactive legend → toggle current/target visibility
- **Size**: `md` (350px height)

**Code**:
```tsx
// src/pages/Passeport.tsx, line ~118
<RadarChart
  data={RADAR_AXES}
  size="md"
  onAxisClick={(axis) => setSelectedAxis(axis.label)}
  showLegend
/>
```

---

## Roadmap

### Phase 20 (Multi-Surface Charts)

| Surface | Chart Type | Data | Priority |
|---------|-----------|------|----------|
| **Passeport** | Radar | Competency progression | ✅ Done |
| **Enterprise Dashboard** | Heatmap | Team member progression matrix | P1 |
| **Analytics** | Line Chart | XP trends over time | P2 |
| **Coach Dashboard** | Bar Chart | Learner performance comparison | P2 |
| **Manager Cockpit** | Scatter/Bubble | Org-wide skill distribution | P3 |

### Component Status

**Core Charts** ✅ (2026-06-29)
- ✅ `RadarChart` — Competency radar (Dreyfus model)
- ✅ `BarChart` — Bar/column comparisons (single/multi-series)
- ✅ `LineChart` — Line trends with smooth curves
- ✅ `AreaChart` — Area with stacking & gradients
- ✅ `PieChart` — Pie/donut distributions
- ✅ `ScatterChart` — Scatter/bubble correlations
- ✅ `ComposedChart` — Bar + line hybrid with dual axes
- ✅ `HeatmapChart` — Custom grid heatmap (Red→Yellow→Green)

**Future Enhancements** (Phase 21+)
- [ ] `TimelineChart` — Custom vertical timeline for learner journey
- [ ] `GaugeChart` — Circular progress indicators
- [ ] `SankeyChart` — Flow/progression visualization
- [ ] Animations — Framer Motion entrance animations for all charts

---

## Performance

### Bundle Impact

- Recharts: `~50kb gzip`
- Charts system: `~5kb` (wrapper + RadarChart implementation)
- **Total**: `~55kb gzip` (vs D3: 100+kb, ECharts: 150+kb)

### Rendering

- Recharts uses SVG (renders fast, scales smoothly)
- `ResponsiveContainer` debounces window resize (no jank)
- Tooltip rendering lazy (only on hover)

### Optimization

- Chart data is memoized in component (`useMemo`)
- No unnecessary re-renders (avoid inline object creation in `onAxisClick`)

---

## Development Guide

### Adding a New Chart Type

1. **Create component** in `src/components/charts/<ChartName>.tsx`
2. **Use Recharts primitive** (BarChart, LineChart, etc.)
3. **Bind colors** to TLS palette (`--color-primary-*`, etc.)
4. **Export** in `src/components/charts/index.ts`
5. **Test** with mock data (add to `/components` showcase)
6. **Document** here with props & example

Example skeleton:

```tsx
// src/components/charts/BarChart.tsx
import React from 'react';
import { BarChart as RechartsBarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';

export interface BarChartProps {
  data: { label: string; value: number }[];
  size?: 'sm' | 'md' | 'lg';
  showLegend?: boolean;
}

export const BarChart: React.FC<BarChartProps> = ({ data, size = 'md', showLegend }) => {
  const heightMap = { sm: 250, md: 350, lg: 450 };
  return (
    <ResponsiveContainer width="100%" height={heightMap[size]}>
      <RechartsBarChart data={data}>
        <XAxis dataKey="label" />
        <YAxis />
        <Tooltip />
        {showLegend && <Legend />}
        <Bar dataKey="value" fill="#55A1B4" />
      </RechartsBarChart>
    </ResponsiveContainer>
  );
};
```

### Common Patterns

#### Tooltip Styling

```tsx
<Tooltip
  contentStyle={{
    backgroundColor: '#ffffff',
    border: '1px solid #e5e7eb',
    borderRadius: '8px',
    padding: '8px 12px',
    fontSize: '13px',
  }}
/>
```

#### Legend Customization

```tsx
<Legend
  wrapperStyle={{ paddingTop: '20px' }}
  contentStyle={{ backgroundColor: 'transparent', border: 'none' }}
/>
```

#### Responsive Height

```tsx
const heightMap = { sm: 250, md: 350, lg: 450 };
const height = heightMap[size];
<ResponsiveContainer height={height} />
```

---

## Testing

### Visual Regression

- [ ] Passeport RadarChart (desktop + 375px mobile)
- [ ] Hover states (tooltip, axis highlight)
- [ ] Click handlers (axis click navigation)
- [ ] Responsive sizing (sm/md/lg)

### A11y

- [ ] Keyboard navigation (tab through axes)
- [ ] Screen reader (axis labels announced)
- [ ] Color contrast (tooltip text vs background)
- [ ] Focus visible states

### Performance

- [ ] Large datasets (50+ data points) — check render time
- [ ] Window resize — responsive re-layout (no lag)
- [ ] Memory (component unmount cleanup)

---

## Troubleshooting

### Chart not rendering

- Check data shape: `{ label, current, target? }`
- Verify `ResponsiveContainer` has a parent with defined height
- Check console for Recharts warnings

### Colors not applying

- Ensure colors are hex values (Recharts doesn't parse CSS vars directly)
- Use color maps in component (see `RadarChart` `COLORS` object)

### Tooltips appearing off-screen

- Recharts handles this automatically; if edge case, wrap in modal/portal

### Performance issues

- Avoid inline object creation in data prop
- Memoize data array: `const chartData = useMemo(() => [...], [deps])`
- Recharts charts are already optimized; if slow, check parent re-renders

---

## References

- [Recharts Documentation](https://recharts.org)
- [Recharts Radar API](https://recharts.org/api/Radar)
- [Recharts Tooltip](https://recharts.org/api/Tooltip)
- [TLS Design System](../CLAUDE.md)

---

**Last updated**: 2026-06-29 · **Maintainer**: Team (Charts system)
