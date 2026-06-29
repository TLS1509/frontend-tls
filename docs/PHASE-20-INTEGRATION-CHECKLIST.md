# Phase 20 — Charts Integration Checklist

**Purpose**: Systematic wiring of 8 production-ready Recharts components into Passeport, Enterprise, Analytics, Coach, and Formateur surfaces.

**Status**: Ready to deploy (Figma library complete, code complete, tests ready)

---

## Integration Sites (Priority Order)

### Tier 1 (Q3 2026 — High Impact)

#### [PASSEPORT] RadarChart + AreaChart
**Route**: `/passeport/:learnerId`  
**Impact**: Competency overview center — currently no data viz  
**Charts**:
- RadarChart (md, 6 axes: Leadership, Communication, Technical, Problem-Solving, Collaboration, Strategic Thinking)
- AreaChart (stacked lessons + coaching hours over time)

**Checklist**:
- [ ] Fetch learner competencies from store → transform to RadarChart shape (label, current, target)
- [ ] Add onAxisClick handler → navigate to `/passeport/competence/:name`
- [ ] Fetch learning hours (lessons + coaching) → transform to AreaChart series
- [ ] Add ChartContainer wrapper with titles
- [ ] Mobile responsive (sm on 375px, md on 1280px)
- [ ] Test hover/interaction states
- [ ] Screenshot mobile + desktop
- [ ] usedBy update: Components.tsx entry

**Effort**: 3–4 hours

---

#### [ENTERPRISE] HeatmapChart + BarChart
**Route**: `/enterprise/dashboard`  
**Impact**: Team skills overview — currently static mock grid  
**Charts**:
- HeatmapChart (team × competency matrix, 8 teams × 6 skills)
- BarChart (team rankings by avg competency score)

**Checklist**:
- [ ] Fetch team roster + competency scores from store
- [ ] Heatmap transform: team × skill → {x, y, value} array
- [ ] Color scale: Red (low) → Yellow (mid) → Green (high)
- [ ] onCellClick → navigate to `/enterprise/members/:teamId/:learnerId`
- [ ] BarChart data: sort teams by avg score descending
- [ ] onBarClick → navigate to `/enterprise/teams/:teamId`
- [ ] Add ChartContainer titles ("Team Skills Matrix", "Team Rankings")
- [ ] Mobile responsive (sm/md/lg with scroll on narrow screens)
- [ ] Test interactions + accessibility (keyboard nav, screen reader)
- [ ] Screenshot mobile + desktop
- [ ] usedBy update: Components.tsx

**Effort**: 4–5 hours

---

#### [COACH] ScatterChart + RadarChart
**Route**: `/coach/dashboard` or `/coach/learner/:learnerId/analytics`  
**Impact**: Learner positioning + profiling — currently no correlation viz  
**Charts**:
- ScatterChart (bubble: x=skill, y=engagement, z=hours)
- RadarChart (single learner profile — current state only)

**Checklist**:
- [ ] Fetch all learners + metrics (skill, engagement, hours) from store
- [ ] ScatterChart data: learner list → {label, x, y, z} array
- [ ] bubbleScale: normalize z (hours) to 2–30px range
- [ ] onDotClick → navigate to `/coach/learner/:learnerId`
- [ ] RadarChart data: fetch single learner competencies + 6-axis shape
- [ ] Add quadrants reference lines (optional: median lines at 50/50)
- [ ] Add ChartContainer titles ("Learner Matrix", "Profile")
- [ ] Mobile responsive (sm on narrow, md/lg on desktop)
- [ ] Test hover tooltip + click drill-down
- [ ] Screenshot mobile + desktop
- [ ] usedBy update: Components.tsx

**Effort**: 4 hours

---

### Tier 2 (Q4 2026 — Medium Impact)

#### [ANALYTICS] LineChart + ComposedChart + AreaChart
**Route**: `/analytics/dashboard` or `/analytics/cohort/:cohortId`  
**Impact**: Engagement trends + XP breakdown — currently no time-series viz  
**Charts**:
- LineChart (XP progression over weeks, multi-learner lines if applicable)
- ComposedChart (activity count as bars, avg score as line, dual Y-axis)
- AreaChart (cumulative learning hours by type: lessons, coaching, projects)

**Checklist**:
- [ ] Fetch XP ledger or progression data → LineChart {label, xp} per week
- [ ] Multi-line support: split by learner cohort or activity type
- [ ] onPointClick → navigate to detail period or learner view
- [ ] ComposedChart data: weekly activity count + avg score metrics
- [ ] Dual Y-axis labels ("Count" left, "Score" right)
- [ ] AreaChart series: lessons, coaching, projects stacked
- [ ] Add legend toggle (Recharts native)
- [ ] Add ChartContainer with titles and date range filter (optional)
- [ ] Mobile responsive
- [ ] Test series toggle (legend click) and interactions
- [ ] Screenshot mobile + desktop
- [ ] usedBy update: Components.tsx

**Effort**: 5–6 hours

---

#### [FORMATEUR] PieChart + BarChart
**Route**: `/formateur/dashboard` or `/formateur/formation/:id/analytics`  
**Impact**: Learner completion rates + engagement distribution  
**Charts**:
- PieChart (donut: Completed / In Progress / Not Started)
- BarChart (session attendance by day or learner activity distribution)

**Checklist**:
- [ ] Fetch formation learner data → completion states (completed, in_progress, not_started)
- [ ] PieChart data: {label, value} for 3 states
- [ ] donut mode, showLabels with percentages
- [ ] onSliceClick → navigate to learner filter or state detail
- [ ] BarChart data: learner activity or session attendance over time
- [ ] onBarClick → drill down to individual learner or session
- [ ] Add ChartContainer titles ("Completion Rates", "Activity Distribution")
- [ ] Mobile responsive (sm on narrow)
- [ ] Test interactions + accessibility
- [ ] Screenshot mobile + desktop
- [ ] usedBy update: Components.tsx

**Effort**: 3–4 hours

---

## Pre-Integration Verification Checklist

**Per surface, before wiring:**

- [ ] **Route exists** in App.tsx and renders the target page
- [ ] **Store data available** (Zustand hook returns expected shape: array of objects with label + values)
- [ ] **Data transform** tested locally (mock → chart shape transformation works)
- [ ] **TypeScript** compiles: `npx tsc --noEmit` passes
- [ ] **Chart imports** from `@/components/charts` work
- [ ] **Components.tsx updated**: usedBy arrays include this surface

---

## Post-Integration Verification Checklist

**Per surface, after wiring charts:**

- [ ] **Visual rendering**: Charts appear on page without console errors
- [ ] **Responsive**: Mobile (375px) + desktop (1280px) screenshots match design
- [ ] **Interactions**: Click/hover handlers fire (use DevTools to confirm navigation calls)
- [ ] **Legend toggle**: Multi-series charts allow legend clicks to toggle series (Recharts native)
- [ ] **Accessibility**: Tab through chart → keyboard focus visible on interactive elements (min-h-touch on buttons)
- [ ] **Empty state**: Test with empty/null data → chart shows placeholder or graceful fallback
- [ ] **Error state**: Test with malformed data → no crash, error message visible
- [ ] **Performance**: No console warnings; lighthouse perf score ≥80
- [ ] **Documentation**: Add code comment explaining chart data shape + usage

---

## Template: Integration PR

```markdown
## [Phase 20.X] Wire [ChartType] into [Surface]

### Summary
Integrate RadarChart + AreaChart into Passeport detail page to visualize competency progression and learning time allocation.

### Changes
- `src/pages/Passeport.tsx` — wire RadarChart (6 axes) + AreaChart (stacked series)
- `src/components/charts/index.ts` — (no change; already exported)
- `docs/PHASE-20-INTEGRATION-CHECKLIST.md` — mark Passeport ✅

### Test Plan
- [ ] Mobile (375px): Charts render in stacked layout, responsive spacing
- [ ] Desktop (1280px): Charts side-by-side (or nested as designed)
- [ ] Hover: Tooltip appears on chart elements
- [ ] Click: onAxisClick/onCellClick handlers navigate as intended
- [ ] Legend: Series toggles (if multi-series)
- [ ] Empty state: Page handles null/empty data gracefully
- [ ] TypeScript: `npx tsc --noEmit` passes
- [ ] No console warnings

### Screenshots
- Mobile (375px) chart stack
- Desktop (1280px) chart side-by-side
- Hover tooltip example
- Empty state fallback
```

---

## Deployment Timeline

**Week 1 (Passeport + Enterprise + Coach)**:
- Mon: Passeport (RadarChart + AreaChart) — 3–4h
- Tue–Wed: Enterprise (HeatmapChart + BarChart) — 4–5h
- Thu–Fri: Coach (ScatterChart + RadarChart) — 4h

**Week 2+ (Analytics + Formateur)**:
- Parallel: Analytics (LineChart + ComposedChart + AreaChart) — 5–6h
- Parallel: Formateur (PieChart + BarChart) — 3–4h

**Total Phase 20 effort**: ~20–25 hours dev (5 integration sites × 3–6h each)

---

## Success Criteria

- [ ] All 8 chart types deployed to their target surfaces
- [ ] 5 integration sites live (Passeport, Enterprise, Analytics, Coach, Formateur)
- [ ] 0 console warnings/errors in dev or prod
- [ ] 100% TypeScript compile pass
- [ ] All interactions tested (hover, click, legend toggle)
- [ ] Mobile + desktop screenshots in PR
- [ ] usedBy arrays updated in Components.tsx
- [ ] PHASE-20-INTEGRATION-CHECKLIST.md ✅ all items checked per surface

---

**Owner**: Development Team  
**Target Completion**: Q3–Q4 2026  
**Status Tracking**: Via PR reviews + PHASE-20-INTEGRATION-CHECKLIST.md per site

