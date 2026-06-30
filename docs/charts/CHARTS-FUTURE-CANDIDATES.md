# Future Chart & Visualization Candidates

**Purpose**: Strategic planning for Phase 21+ enhancements beyond the core 8 charts.

---

## 🎯 High-Priority Candidates (Phase 21, Q3-Q4 2026)

### 1. **TimelineChart** — Learner Journey Visualization
**What**: Vertical timeline of learner activities (lessons started → sessions → achievements)

**Why TLS needs it**:
- Passeport detail → "My Learning Journey" timeline view
- Coach view → "Client progression timeline" (see when engagement dropped)
- Analytics → "Cohort onboarding funnel" (stages: signup → first lesson → week-1 completion)

**Data Model**:
```tsx
interface TimelineEvent {
  date: string;
  label: string;      // "Lesson 1 Started"
  type: 'lesson' | 'session' | 'badge' | 'milestone';
  color?: string;
  description?: string;
  details?: ReactNode;
}
```

**Example Use Cases**:
- Learner profile: "You started XYZ course on 2026-03-15"
- Coach dashboard: "Client dropped engagement 2026-04-02 → 2026-05-15"
- Onboarding analytics: "Sign-up → First lesson (3 days) → Week-1 completion (7 days)"

**Complexity**: Medium (custom SVG or Recharts Scatter variant)  
**Impact**: High (5-6 surfaces)  
**Effort**: 3-4 hours

---

### 2. **GaugeChart** — Circular Progress Indicators
**What**: Radial progress (0-100% or 0-5 Dreyfus), needle or arc fill

**Why TLS needs it**:
- Passeport → "Overall competency level: 3.2/5" as a large gauge
- Dashboard → "Weekly goal progress: 68%"
- Coach tools → "Learner engagement target: 75%/100%"

**Data Model**:
```tsx
interface GaugeData {
  value: number;       // 0-100 or 0-5
  target?: number;     // target value
  label: string;
  color?: string;
}
```

**Variants**:
- **Solid** — Arc fill (like a progress bar curved)
- **Needle** — Pointer pointing to value
- **Segment** — Multiple rings (current, target, benchmark)

**Complexity**: Medium  
**Impact**: High (dashboard cards, profile highlights)  
**Effort**: 2-3 hours

---

### 3. **WaterfallChart** — Cumulative Impact Visualization
**What**: Step-wise bars showing how values add/subtract to reach a total

**Why TLS needs it**:
- Analytics → "XP breakdown: Lessons (+800) + Sessions (+200) + Badges (+100) = 1100 total"
- Enterprise → "Team skill development: Initial (-10) + Training (+45) + Practice (+25) = Final (60)"
- Manager cockpit → "Cohort completion: Target (100) - Dropouts (-15) - Paused (-8) = Actual (77)"

**Data Model**:
```tsx
interface WaterfallData {
  label: string;
  value: number;       // positive (increase) or negative (decrease)
  isTotal?: boolean;   // this is the final total bar
  color?: string;
}
```

**Complexity**: Medium  
**Impact**: Medium (analytics, manager views)  
**Effort**: 2-3 hours

---

### 4. **NetworkChart** — Learning Path Interconnections
**What**: Node-link diagram showing how courses/skills/paths relate (prerequisites, unlocks, etc.)

**Why TLS needs it**:
- Passeport → "Skill dependencies: Leadership requires Communication"
- LearningPath detail → "Course flow: Module 1 → Module 2 → Capstone (unlocks)"
- Analytics → "Learner pathway: User took Path A → Path C → Path B (non-linear)"

**Data Model**:
```tsx
interface NetworkNode {
  id: string;
  label: string;
  type: 'course' | 'skill' | 'path' | 'badge';
  completed?: boolean;
  color?: string;
}

interface NetworkEdge {
  source: string;
  target: string;
  type: 'prerequisite' | 'unlocks' | 'related';
  label?: string;
}
```

**Complexity**: High (needs d3 or Cytoscape.js for layout algorithms)  
**Impact**: Medium (specialized views)  
**Effort**: 6-8 hours

---

### 5. **SankeyChart** — Flow/Progression Visualization
**What**: Alluvial diagram showing how learners flow through stages (cohorts, completion states)

**Why TLS needs it**:
- Analytics → "Cohort progression: 100 started → 85 week-1 → 60 completion"
- Enterprise → "Team skill mastery: 50 at Level 1 → 30 at Level 2 → 10 at Level 3"
- Manager → "Dropout analysis: 15 paused, 10 abandoned, 5 transferred"

**Data Model**:
```tsx
interface SankeyData {
  source: string;
  target: string;
  value: number;  // flow count
  color?: string;
}
```

**Complexity**: Medium-High  
**Impact**: High (analytics, manager cockpit)  
**Effort**: 4-5 hours

---

## 🔷 Medium-Priority Candidates (Phase 22+, Post-Q4 2026)

### 6. **CircularProgressRing** — Concentric Progress Indicators
**What**: Multiple concentric rings, each showing a different metric

**Why TLS needs it**:
- Profile card → "Skills (ring 1) + Badges (ring 2) + Hours (ring 3) + XP (ring 4)"
- Dashboard widget → "Multi-metric at a glance"

**Complexity**: Low  
**Impact**: Low-Medium (UI embellishment, cards)  
**Effort**: 1-2 hours

---

### 7. **StreamGraph** — Category Stacked Area Over Time
**What**: Curved stacked area showing how categories evolve (like streaming music genre share)

**Why TLS needs it**:
- Analytics → "Learning time distribution over 12 weeks: Soft (blue) + Technical (teal) + Leadership (orange)"

**Complexity**: Medium  
**Impact**: Low-Medium (analytics niche)  
**Effort**: 2-3 hours

---

### 8. **FunnelChart** — Conversion/Completion Stages
**What**: Inverted triangular stages showing drop-off (e.g., Signup → Email Verified → First Lesson → Week 1)

**Why TLS needs it**:
- Onboarding analytics → "100 signed up → 87 verified email → 76 started course → 62 completed week-1"
- Funnel shows exact drop-off at each stage

**Complexity**: Low  
**Impact**: Medium (analytics-focused)  
**Effort**: 1.5-2 hours

---

## 🟡 Lower-Priority / Niche (Phase 23+)

### 9. **BipartiteChart** — Matching/Assignment Visualization
**What**: Two columns of nodes with connection edges (e.g., learners ↔ coaches, courses ↔ skills)

**Use**: Coach assignment matrix, course-skill mapping  
**Complexity**: High  
**Effort**: 6-8 hours

---

### 10. **HierarchicalChart** — Tree/Dendrogram Visualization
**What**: Nested hierarchies (e.g., Organization → Teams → Learners)

**Use**: Org structure, learning path tree  
**Complexity**: High  
**Effort**: 5-6 hours

---

### 11. **Heatmap Variants**
**What**: Extended heatmaps (2D, 3D, geographic, time-based)

**Use**: Team-time heatmap (who's active when), geographic learner distribution  
**Complexity**: Medium-High  
**Effort**: 3-4 hours per variant

---

## 📋 Selection Matrix

| Chart | Frequency of Use | Implementation Cost | Learning Curve | Phase Target |
|-------|------------------|---------------------|-----------------|--------------|
| **TimelineChart** | ⭐⭐⭐⭐ (very high) | Medium | Low | Phase 21 |
| **GaugeChart** | ⭐⭐⭐ (high) | Low-Medium | Low | Phase 21 |
| **WaterfallChart** | ⭐⭐⭐ (high) | Medium | Low-Medium | Phase 21 |
| **NetworkChart** | ⭐⭐ (medium) | High | High | Phase 22 |
| **SankeyChart** | ⭐⭐⭐ (high) | Medium-High | Medium | Phase 22 |
| **CircularProgressRing** | ⭐⭐ (medium) | Low | Low | Phase 22 |
| **StreamGraph** | ⭐ (low) | Medium | Medium | Phase 23 |
| **FunnelChart** | ⭐⭐⭐ (high) | Low | Low | Phase 22 |
| **BipartiteChart** | ⭐ (low) | High | High | Phase 23 |
| **HierarchicalChart** | ⭐⭐ (medium) | High | High | Phase 23 |

---

## 🎨 Animated / Interactive Enhancements

Beyond new chart types, we could add interactive features to existing charts:

### Currently Available
- ✅ Click handlers (drill-down)
- ✅ Hover tooltips
- ✅ Interactive legends (toggle series)
- ✅ Responsive sizing

### Potential Phase 21-22 Additions

**1. Animations**
- Entry animations (bars growing, line drawing, area filling)
- Transition animations (data update, series toggle)
- Framer Motion wrapper for staggered reveals
- Reduced-motion support

**2. Interactivity**
- Brush selector (zoom into time range on LineChart/AreaChart)
- Selection mode (multi-select bars for comparison)
- Crossfilter (clicking bar filters other charts)
- Drill-down modals (click bar → detail view in modal)

**3. Advanced Tooltip**
- Rich formatting (images, mini sparklines)
- Sticky tooltip (click to lock, see details)
- Keyboard navigation (arrow keys to move between data points)

**4. Annotation**
- Comments on data points ("anomaly here because X")
- Reference lines (average, goal, benchmark)
- Shadows/highlights for important ranges

**5. Export**
- PNG screenshot of chart
- SVG for editing
- CSV data export
- Shareable chart link

---

## Recommendation for Phase 21 Priority

**Tier 1** (Start immediately):
1. **TimelineChart** — heavily used (Passeport, Coach, Analytics)
2. **GaugeChart** — quick win (2-3 hours, high UI polish impact)

**Tier 2** (Q4 2026):
3. **WaterfallChart** — analytics focus
4. **FunnelChart** — quick win (1.5-2 hours, funnel pattern common)
5. **SankeyChart** — manager/analytics advanced feature

**Tier 3** (Phase 22+):
6. **NetworkChart**, **BipartiteChart**, **HierarchicalChart** — specialized, high effort
7. **StreamGraph** — niche analytics use case

---

## Libraries to Consider

| Chart Type | Recommended Library | Alt | Notes |
|------------|---------------------|-----|-------|
| **TimelineChart** | Custom SVG or `react-vertical-timeline` | Framer Motion | Simple, lightweight |
| **GaugeChart** | Custom SVG or `recharts` (via Scatter) | `react-gauge` | 2-3 hours custom |
| **WaterfallChart** | Custom Recharts Bar variant | `react-waterfall` | Medium complexity |
| **FunnelChart** | Custom Recharts or `echarts` | Recharts Bar | Low complexity |
| **SankeyChart** | `recharts` (Sankey component) or `d3-sankey` | visx | Recharts has native Sankey |
| **NetworkChart** | `d3-force` or `cytoscape.js` | visx | Requires layout algorithm |
| **StreamGraph** | Custom `d3` or `recharts` | visx | Niche, lower priority |

---

## Implementation Strategy

**Step 1: Validate Demand**
- Survey product team / coaches / formateurs on which visualization would unblock analytics
- Prioritize by "number of surfaces that would benefit"

**Step 2: Start Tier 1**
- TimelineChart (Phase 21 Q3)
- GaugeChart (Phase 21 Q3)

**Step 3: Extend Existing Charts**
- Add animations (Framer Motion wrapper)
- Add drill-down modals
- Add export features

**Step 4: Advanced Tier 2**
- WaterfallChart, FunnelChart, SankeyChart (Phase 21-22 Q4)

---

## Conclusion

The core 8 charts cover ~85% of analytics needs. **TimelineChart** and **GaugeChart** are the highest-value quick wins for Phase 21. Reserve **NetworkChart** and **SankeyChart** for when deep analytics is critical (Phase 22+).

**Start with**: Timeline + Gauge (6-7 hours total, huge impact)  
**Then extend**: Animations, drill-down, export  
**Then add**: Waterfall, Funnel, Sankey (Phase 22 Q4)  
**Reserve for later**: Network, Hierarchical (specialized, high effort)
