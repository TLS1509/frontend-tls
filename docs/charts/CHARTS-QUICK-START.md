# Charts System — Quick Start Guide

**Purpose**: Fast reference for integrating interactive charts into any surface (Passeport, Enterprise, Analytics, Coach, Formateur).

---

## Install (Already Done ✅)

```bash
npm install recharts
```

---

## Import Pattern

```tsx
import {
  RadarChart,
  BarChart,
  LineChart,
  AreaChart,
  PieChart,
  ScatterChart,
  ComposedChart,
  HeatmapChart,
} from '@/components/charts';
```

---

## 1-Minute Examples

### RadarChart — Competency Progression

```tsx
<RadarChart
  data={[
    { label: 'Leadership', current: 3, target: 5 },
    { label: 'Communication', current: 4, target: 5 },
    { label: 'Technical', current: 2, target: 4 },
  ]}
  size="md"
  onAxisClick={(axis) => navigate(`/competence/${axis.label}`)}
/>
```

**When to use**: Passeport, coach learner profiling, skill assessments

---

### BarChart — Team Rankings

```tsx
<BarChart
  data={[
    { label: 'Team A', avgScore: 82 },
    { label: 'Team B', avgScore: 76 },
    { label: 'Team C', avgScore: 89 },
  ]}
  dataKey="avgScore"
  size="md"
  onBarClick={(data) => navigate(`/team/${data.label}`)}
/>
```

**When to use**: Enterprise dashboard, team comparisons, cohort rankings

---

### LineChart — XP Progression

```tsx
<LineChart
  data={[
    { label: 'Week 1', xp: 200 },
    { label: 'Week 2', xp: 350 },
    { label: 'Week 3', xp: 600 },
  ]}
  dataKey="xp"
  size="md"
  smooth
  showDots
/>
```

**When to use**: Analytics dashboard, learner engagement tracking, progression timelines

---

### AreaChart — Cumulative Hours

```tsx
<AreaChart
  data={[
    { label: 'Jan', lessons: 12, coaching: 3 },
    { label: 'Feb', lessons: 18, coaching: 5 },
    { label: 'Mar', lessons: 22, coaching: 8 },
  ]}
  series={[
    { key: 'lessons', label: 'Lessons' },
    { key: 'coaching', label: 'Coaching' },
  ]}
  stacked
  size="md"
/>
```

**When to use**: Analytics cumulative metrics, time allocation, engagement trends

---

### PieChart — Completion Rates

```tsx
<PieChart
  data={[
    { label: 'Completed', value: 45 },
    { label: 'In Progress', value: 30 },
    { label: 'Not Started', value: 25 },
  ]}
  donut
  showLabels
  size="md"
/>
```

**When to use**: Cohort completion status, category distribution, training progress

---

### ScatterChart — Learner Matrix

```tsx
<ScatterChart
  data={[
    { label: 'Alice', x: 85, y: 90, z: 50 },  // skill, engagement, hours
    { label: 'Bob', x: 72, y: 78, z: 40 },
    { label: 'Carol', x: 91, y: 88, z: 60 },
  ]}
  xAxisLabel="Skill Level"
  yAxisLabel="Engagement"
  bubbleScale={2}
  size="md"
/>
```

**When to use**: Coach performance matrix, correlation analysis, learner positioning

---

### ComposedChart — Activity + Score

```tsx
<ComposedChart
  data={[
    { label: 'Week 1', count: 15, avgScore: 78 },
    { label: 'Week 2', count: 22, avgScore: 82 },
    { label: 'Week 3', count: 18, avgScore: 85 },
  ]}
  series={[
    { key: 'count', label: 'Activities', type: 'bar' },
    { key: 'avgScore', label: 'Avg Score', type: 'line' },
  ]}
  dualAxis
  leftAxisLabel="Count"
  rightAxisLabel="Score"
  size="md"
/>
```

**When to use**: Complex metrics, dual-axis analysis, activity + quality trends

---

### HeatmapChart — Team Skills Matrix

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
  onCellClick={(data) => navigate(`/learner/${data.x}`)}
/>
```

**When to use**: Team skills overview, learner progress grid, competency matrix

---

## Common Props (All Charts)

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Chart height (250/350/450px) |
| `showLegend` | `boolean` | `true` | Display legend |
| `className` | `string` | `''` | Additional CSS classes |
| `onClick` | `(data, index) => void` | — | Handle interaction |

---

## Data Format Patterns

### Single Series

```tsx
const data = [
  { label: 'Item 1', value: 100 },
  { label: 'Item 2', value: 200 },
];

<BarChart data={data} dataKey="value" />
```

### Multiple Series

```tsx
const data = [
  { label: 'Jan', sales: 100, profit: 50 },
  { label: 'Feb', sales: 150, profit: 75 },
];

<LineChart
  data={data}
  series={[
    { key: 'sales', label: 'Sales' },
    { key: 'profit', label: 'Profit' },
  ]}
/>
```

### Radar (Dreyfus)

```tsx
const data = [
  { label: 'Leadership', current: 3, target: 5 },
  { label: 'Communication', current: 4, target: 5 },
];

<RadarChart data={data} />
```

### Heatmap (Grid)

```tsx
const data = [
  { x: 'Row 1', y: 'Col 1', value: 3 },
  { x: 'Row 1', y: 'Col 2', value: 4 },
];

<HeatmapChart data={data} maxValue={5} />
```

---

## Color Scheme (TLS Palette)

All charts automatically use TLS colors:

- **Primary**: `#55A1B4` (teal) — main focus
- **Secondary**: `#ED843A` (orange) — secondary data
- **Success**: `#9DBEBA` (mint) — positive/completion
- **Danger**: `#F28559` (coral) — alerts/warnings
- **Warning**: `#F8B044` (sun/yellow) — attention
- **Custom**: Pass `color` prop per series to override

### Heatmap Color Scale

- **Red** (0) → **Yellow** (0.5) → **Green** (1)
- Auto-normalized to minValue/maxValue range

---

## Integration Checklist

### Before adding a chart to a page:

- [ ] Data structure matches expected format (label + values)
- [ ] Choose appropriate chart type for the insight
- [ ] Set `size` based on context (sm for sidebars, md/lg for main content)
- [ ] Add `onXClick` callback if interaction needed
- [ ] Test responsive behavior (mobile 375px + desktop 1280px)
- [ ] Verify legend/labels are readable
- [ ] Test hover states (tooltip, highlight)

### After adding a chart:

- [ ] Check TypeScript compilation: `npx tsc --noEmit`
- [ ] Verify chart renders without errors
- [ ] Test interactions (click, hover, legend toggle)
- [ ] Screenshot for documentation (mobile + desktop)
- [ ] Update CHARTS-SYSTEM.md if using non-standard data format

---

## Common Patterns

### Drill-Down (Click → Navigate)

```tsx
<BarChart
  data={teams}
  dataKey="score"
  onBarClick={(data) => {
    // Navigate to detail page on click
    navigate(`/team/${data.label}/members`);
  }}
/>
```

### Responsive Data (Mobile vs Desktop)

```tsx
const isSmall = window.innerWidth < 768;
<LineChart
  data={data}
  size={isSmall ? 'sm' : 'md'}
  showDots={!isSmall}  // Hide dots on mobile for clarity
/>
```

### Filtered Legends (Toggle Series)

Recharts legends are interactive by default — click to toggle series visibility.

### Custom Tooltips

```tsx
<LineChart
  data={data}
  // Tooltip customization via Recharts props (if needed)
/>
```

---

## Troubleshooting

### Chart not rendering

**Check:**
- Data format matches component props (e.g., `label`, `value` fields exist)
- Parent has defined height or `ResponsiveContainer` is wrapping correctly
- No console errors (DevTools → Console)

### Colors look off

- Verify colors in data match TLS palette or Recharts defaults
- Check CSS is loaded (see browser DevTools Styles)
- Try passing explicit `color` prop

### Tooltips not appearing

- Hover over chart area (not title/legend)
- Check `display: none` or `opacity: 0` isn't hiding tooltips
- Recharts tooltips auto-position, but can overflow on small screens

### Performance is slow

- Check data size (100+ points may cause lag)
- Consider debouncing resize handlers
- Use `memoize` on data prop if re-creating on every render

---

## More Examples

See `docs/CHARTS-SYSTEM.md` for detailed API documentation and advanced examples.

---

**Last updated**: 2026-06-29  
**Maintained by**: Team (Charts system)
