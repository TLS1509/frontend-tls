# Design System Audit — Component Naming, Coherence & Card Patterns

**Status**: Comprehensive Review In Progress  
**Date**: April 29, 2026  
**Focus**: Naming consistency, component clarity, pattern organization

---

## 📊 Component Inventory

### Total Components: 67
- **Core**: 4 (Button, Card, IconFeatureCard, Input)
- **UI**: 27 (Badge, Avatar, Alert, Modal, Toast, etc.)
- **Patterns**: 10 (CardGrid, ActionCardGrid, LearningPathGrid, etc.)
- **Learning**: 2 (ParcoursCard, StepCard)
- **Layout**: 5 (Sidebar, TopNav, BottomNav, HamburgerButton, OptimizedSidebar)
- **Misc**: 19 (ProtectedRoute, FloatingNavButton, Documentation components, etc.)

---

## 🎯 **SECTION 1: NAMING AUDIT**

### 1.1 Naming Patterns Identified

#### **Pattern A: Entity-centric (Descriptive + Purpose)**
✅ Clear, specific, immediate understanding

**Examples**:
- `Badge` - Visual indicator
- `Avatar` - User identity display
- `Alert` - Warning/notification
- `Modal` - Dialog/overlay
- `Breadcrumb` - Navigation hierarchy
- `ProgressBar` - Linear progress
- `ProgressRing` - Circular progress
- `Pagination` - Page navigation

**Assessment**: ✅ **EXCELLENT** — Crystal clear naming

---

#### **Pattern B: Domain-specific (Context-bound)**
⚠️ Clear within domain, but tightly coupled to use case

**Examples**:
- `CourseCard` - TLS domain, specific to courses
- `ParcoursCard` - TLS domain (French: course/path), specialized variant
- `ProfileCard` - User profile display
- `ResourceCard` - Learning resource display
- `StatCard` - Statistics/metrics display
- `StepCard` - Learning step display
- `CoachCard` - Coach/instructor display
- `PageCard` - Page/content card

**Assessment**: ⚠️ **CONCERN** — Domain-specific means limited reusability

**Recommendation**: Consider `Card` variants instead of domain-specific components

---

#### **Pattern C: Compound (Primary + Secondary concept)**
⚠️ Useful but can create naming sprawl

**Examples**:
- `MetaPill` + `MetaPillGroup` - Metadata display pattern
- `CompetenceBadge` - Skill/competency indicator
- `AchievementBadge` - Achievement indicator
- `Achievement` - Legacy achievement display
- `ActivityItem` - Activity list item
- `MetaItem` - Metadata display item

**Assessment**: ⚠️ **CONCERN** — Multiple names for similar concepts

**Observation**:
```
MetaPill (new, modern)  ← Should become primary
MetaItem (legacy)       ← Consider deprecating
ActivityItem (specific) ← Clear use case
Achievement (legacy)    ← Overlaps with AchievementBadge
AchievementBadge (new)  ← Better naming
```

---

#### **Pattern D: Grid/Layout patterns (Grid-centric)**
✅ Clear organizational purpose

**Examples**:
- `CardGrid` - Generic card grid
- `ActionCardGrid` - Action button grid
- `LearningPathGrid` - Learning path collection
- `ResourceCardGrid` - Resource collection
- `CoachCardGrid` - Coach/instructor collection
- `VeilleCardFeed` - Feed layout (watch/surveillance)

**Assessment**: ⚠️ **CONCERN** — Inconsistent naming convention

**Observation**:
```
Generic pattern approach:   CardGrid (good)
Specific domain grids:      LearningPathGrid, ResourceCardGrid, CoachCardGrid
Feed pattern:              VeilleCardFeed (French domain term)
```

**Recommendation**: Standardize naming convention

---

### 1.2 Naming Inconsistencies Detected

#### **ISSUE #1: Badge Family Sprawl**

Current state:
```
Badge               (generic, color-coded)
CompetenceBadge     (skill level variant)
AchievementBadge    (achievement indicator)
Achievement        (legacy alternative)
Medal              (achievement display, different)
```

**Problem**: 5 components for similar visual concept

**Recommendation**:
```
KEEP:    Badge (primary, configurable)
KEEP:    CompetenceBadge (specialized, justified)
KEEP:    Medal (distinct from badges, justified)
REVIEW:  AchievementBadge vs Achievement (consolidate)
```

---

#### **ISSUE #2: Card Component Family**

Current state:
```
Core:
  Card               (base/generic)
  IconFeatureCard    (specific variant - should be Card variant)

Domain-specific:
  CourseCard         (course-specific)
  ParcoursCard       (course/path, French)
  ProfileCard        (profile-specific)
  ResourceCard       (resource-specific)
  StatCard           (statistics-specific)
  StepCard           (learning step-specific)
  CoachCard          (coach-specific)
  PageCard           (page-specific, in patterns/)

Plus variants:
  Card (13 variants via CSS)
```

**Problem**: Mixing base component with domain-specific variants

**Current Architecture**:
- ✅ Card base with 13 CSS variants (good)
- ❌ Domain cards still exist as separate components (redundant)
- ❌ IconFeatureCard duplicates Card functionality

**Recommendation**: Phase out domain-specific card components in favor of Card composition

---

#### **ISSUE #3: Activity & Feed Patterns**

Current state:
```
ActivityItem        (single activity entry)
ActivityFeed        (collection of activities)
VeilleCardFeed      (watch/monitor collection)
```

**Problem**: Naming mismatch (ActivityFeed vs VeilleCardFeed)

**Analysis**:
- `ActivityItem` — Clear single-item component
- `ActivityFeed` — Clear collection pattern
- `VeilleCardFeed` — French domain term, uses Card components

**Recommendation**: Standardize feed pattern naming

---

#### **ISSUE #4: Meta* Components**

Current state:
```
MetaPill            (metadata + icon display - NEW, modern)
MetaPillGroup       (collection of MetaPills - NEW)
MetaItem            (metadata display - LEGACY)
```

**Problem**: Multiple names for similar concepts

**Recommendation**:
- ✅ Promote MetaPill + MetaPillGroup (new, modern)
- ⚠️ Deprecate MetaItem (legacy)
- 📝 Document migration path

---

#### **ISSUE #5: Pill vs Badge Distinction**

Current state:
```
Badge      (status/category badge)
MetaPill   (metadata + icon display)
Tag        (keyword/classification tag)
```

**Problem**: Unclear distinction between Badge and MetaPill

**Analysis**:
- `Badge` — Status/category indicator (color-coded)
- `MetaPill` — Metadata display with icon + text (new pattern)
- `Tag` — Keyword/classification (removable)

**Recommendation**: Clarify visual and functional differences

---

### 1.3 Naming Convention Recommendations

#### **Proposed Standardization**

**Tier 1: Core Components (Foundation)**
```
✅ Button      (primary action)
✅ Card        (content container, 13 variants)
✅ Input       (form input, multi-variant)
✅ Badge       (status/category indicator)
✅ Tag         (keyword/classification)
✅ Avatar      (user/entity identity)
```

**Tier 2: UI Patterns (Combinations)**
```
✅ MetaPill + MetaPillGroup    (metadata display pattern)
✅ Alert                       (notification/warning)
✅ Toast                       (temporary notification)
✅ Modal                       (dialog/overlay)
✅ Breadcrumb                  (navigation hierarchy)
✅ ProgressBar / ProgressRing  (progress indication)
✅ Steps / Stepper             (process steps)
✅ Tabs                        (tab navigation)
✅ Pagination                  (page navigation)
✅ Search                      (search input pattern)
✅ DropdownMenu                (dropdown navigation)
```

**Tier 3: Domain Patterns (Specialized)**
```
✅ CompetenceBadge   (skill level indicator)
✅ Medal             (achievement display)
✅ EmptyState        (empty state pattern)
✅ Skeleton          (loading skeleton)
✅ Celebration       (achievement celebration)
✅ InlineWin         (inline win notification)
```

**Tier 4: Layout & Navigation**
```
✅ Sidebar           (side navigation)
✅ TopNav            (top navigation)
✅ BottomNav         (bottom navigation)
✅ HamburgerButton   (mobile nav toggle)
```

**Tier 5: Collection Patterns**
```
✅ CardGrid             (responsive card grid)
✅ ActionCardGrid       (action button grid)
✅ ActivityFeed         (activity list pattern)
✅ LearningPathGrid     (learning path collection)
✅ ResourceCardGrid     (resource collection)
✅ LearningPathHeader   (learning path hero)
```

---

## 🎨 **SECTION 2: COMPONENT CLARITY AUDIT**

### 2.1 Component Purpose & Scope

#### **✅ CLEAR PURPOSE (No Action Needed)**

| Component | Purpose | Scope | Status |
|-----------|---------|-------|--------|
| Badge | Status/category indicator | Single, small | ✅ Clear |
| Button | Primary action trigger | Single, reusable | ✅ Clear |
| Avatar | User/entity identity | Single, profile-focused | ✅ Clear |
| Modal | Dialog/overlay pattern | Layout overlay | ✅ Clear |
| Toast | Temporary notification | Bottom right, timeout | ✅ Clear |
| Alert | Warning/information | Alert bar, dismissible | ✅ Clear |
| Card | Content container | 13 variants, flexible | ✅ Clear |

---

#### **⚠️ UNCLEAR PURPOSE (Review Needed)**

| Component | Current Purpose | Problem | Action |
|-----------|-----------------|---------|--------|
| Achievement | Legacy achievement display | Overlaps with AchievementBadge | 🔄 Consolidate |
| MetaItem | Metadata display | Overlaps with MetaPill | 🔄 Deprecate |
| CourseCard | Course-specific display | Should be Card variant | 🔄 Migrate |
| ParcoursCard | Course/path display (French) | Domain-specific, redundant | 🔄 Migrate |
| ProfileCard | Profile-specific display | Should be Card variant | 🔄 Migrate |
| ResourceCard | Resource-specific display | Should be Card variant | 🔄 Migrate |
| StatCard | Statistics display | Should be Card variant | 🔄 Migrate |
| StepCard | Learning step display | Should be Card variant | 🔄 Migrate |
| CoachCard | Coach-specific display | Should be Card variant | 🔄 Migrate |
| PageCard | Page-specific display | Should be Card variant | 🔄 Migrate |
| IconFeatureCard | Icon feature card | Duplicates Card functionality | 🔄 Remove |

---

### 2.2 Redundancy Analysis

#### **REDUNDANT COMPONENTS**

```
Badge Family:
├─ Badge (primary)
├─ CompetenceBadge (specialized) ✅ Keep (distinct purpose)
├─ AchievementBadge (overlaps with Achievement) ❌ Consolidate
└─ Achievement (legacy) ❌ Deprecate

Meta* Family:
├─ MetaPill (new, modern) ✅ Keep
├─ MetaPillGroup (collection) ✅ Keep
└─ MetaItem (legacy) ❌ Deprecate

Card Family:
├─ Card (base, 13 variants) ✅ Keep
├─ IconFeatureCard (overlaps) ❌ Remove
├─ CourseCard (domain-specific) ❌ Migrate to Card
├─ ParcoursCard (domain-specific) ❌ Migrate to Card
├─ ProfileCard (domain-specific) ❌ Migrate to Card
├─ ResourceCard (domain-specific) ❌ Migrate to Card
├─ StatCard (domain-specific) ❌ Migrate to Card
├─ StepCard (domain-specific) ❌ Migrate to Card
├─ CoachCard (domain-specific) ❌ Migrate to Card
└─ PageCard (domain-specific) ❌ Migrate to Card
```

---

## 🎭 **SECTION 3: CARD PATTERNS & COMBINATIONS**

### 3.1 Current Card Ecosystem

#### **Base Card (Core)**
```
Card component (src/components/core/Card.tsx)
├─ 13 CSS variants
│  ├─ Sizes: xs, sm, md (default), lg, xl
│  ├─ Styles: default, interactive, glass, glass-elevated, feature, gradient-accent, hero-image, stat-highlighted, outlined, subtle, disabled
│  └─ (Size × Style combinations available)
└─ Composable subcomponents: CardTitle, CardDesc, CardEyebrow, CardFooter
```

---

#### **Domain Card Variants (Should Consolidate)**

**Current domain-specific cards**:

```
CourseCard
├─ Purpose: Display course information
├─ Props: course object, onClick handler
├─ Typical use: Course list, course card collection
└─ Problem: Hardcoded to course domain

ParcoursCard
├─ Purpose: Display learning path (French: parcours)
├─ Props: parcours object, tone
├─ Typical use: Learning path grid, course collection
└─ Problem: Domain-specific, duplicates Card

ProfileCard
├─ Purpose: Display user profile information
├─ Props: user object, social links, metadata
├─ Typical use: Team page, coach directory
└─ Problem: Should be Card with profile layout

ResourceCard
├─ Purpose: Display learning resource
├─ Props: resource object, icon, category
├─ Typical use: Resource grid, learning materials
└─ Problem: Should be Card with resource layout

StatCard
├─ Purpose: Display statistics/KPI
├─ Props: stat value, label, delta
├─ Typical use: Dashboard, metrics grid
└─ Problem: Should be Card with stat-highlighted variant

StepCard
├─ Purpose: Display learning step
├─ Props: step object, progress, lessons
├─ Typical use: Step collection, learning path detail
└─ Problem: Should be Card with step layout

CoachCard
├─ Purpose: Display coach/instructor
├─ Props: coach object, bio, specialties
├─ Typical use: Coach directory, team grid
└─ Problem: Should be Card with coach layout

PageCard
├─ Purpose: Display page/content (in patterns/)
├─ Props: page object, meta
├─ Typical use: Page grid, content browser
└─ Problem: Should be Card with page layout
```

---

### 3.2 Card Pattern Combinations

#### **Common Card Composition Patterns**

**Pattern 1: Simple Metadata Card**
```jsx
<Card variant="sm">
  <CardTitle>Title</CardTitle>
  <CardDesc>Description</CardDesc>
</Card>
```

---

**Pattern 2: Icon + Metadata Card**
```jsx
<Card>
  <div className="flex gap-2">
    <Icon size={40} />
    <div>
      <CardTitle>Title</CardTitle>
      <CardDesc>Description</CardDesc>
    </div>
  </div>
</Card>
```

---

**Pattern 3: Featured Content Card (with action)**
```jsx
<Card variant="feature">
  <CardTitle>Featured Title</CardTitle>
  <CardDesc>Featured description with more prominence</CardDesc>
  <Button variant="primary">Action</Button>
</Card>
```

---

**Pattern 4: Statistics Card**
```jsx
<Card variant="stat-highlighted">
  <div className="text-h2 text-primary-600">2,847</div>
  <CardDesc>Active learners this month</CardDesc>
</Card>
```

---

**Pattern 5: Glass Morphism Card (Premium)**
```jsx
<Card variant="glass-elevated">
  <CardTitle>Premium Content</CardTitle>
  <CardDesc>With glassmorphism effect</CardDesc>
</Card>
```

---

**Pattern 6: Gradient Accent Card (Tone-aware)**
```jsx
<Card variant="gradient-accent">
  <CardTitle>Category: Design</CardTitle>
  <CardDesc>With left border accent</CardDesc>
</Card>
```

---

**Pattern 7: Interactive Action Card**
```jsx
<Card variant="interactive">
  <div className="flex flex-col items-center justify-center gap-2">
    <Icon size={40} />
    <CardTitle>Action Label</CardTitle>
  </div>
</Card>
```

---

**Pattern 8: Hero Image Card**
```jsx
<Card variant="hero-image" style={{backgroundImage: 'url(...)'}}>
  <CardTitle>Content with Image</CardTitle>
  <CardDesc>Layered over image</CardDesc>
</Card>
```

---

### 3.3 Card Usage by Domain

#### **Learning Domain Patterns**

**Learning Path Card Combination**:
```jsx
<ToneAwareCard tone="primary">
  <Card variant="lg">
    <div className="flex gap-4">
      <img src={image} className="w-24 h-24" />
      <div className="flex-1">
        <CardTitle>Learning Path Name</CardTitle>
        <CardDesc>Path description</CardDesc>
        <div className="flex gap-2 mt-2">
          <MetaPill icon={<Users />} text={`${count} students`} />
          <MetaPill icon={<Clock />} text="4 weeks" />
        </div>
        <InlineProgress value={progress} />
      </div>
    </div>
  </Card>
</ToneAwareCard>
```

---

**Course/Parcours Card Combination**:
```jsx
<Card variant="md">
  <CardEyebrow>COURSE</CardEyebrow>
  <CardTitle>Course Name</CardTitle>
  <CardDesc>Short description</CardDesc>
  <div className="flex gap-2 mt-3">
    <MetaPill icon={<User />} text="Instructor" size="sm" />
    <MetaPill icon={<Star />} text="4.8" size="sm" />
  </div>
  <Button variant="primary" className="mt-4">Start Course</Button>
</Card>
```

---

**Step Card Combination**:
```jsx
<Card variant="sm">
  <CardTitle>Step 1: Foundation</CardTitle>
  <InlineProgress value={progress} size="sm" />
  <div className="flex gap-2 mt-2 text-caption">
    <span>5 lessons</span>
    <span>2 hours</span>
  </div>
</Card>
```

---

#### **Dashboard Domain Patterns**

**KPI Card Combination**:
```jsx
<Card variant="stat-highlighted">
  <div className="text-h2 text-primary-600">2,847</div>
  <p className="text-caption text-ink-600">Active learners this month</p>
</Card>
```

---

**Quick Action Grid Pattern**:
```jsx
<div className="action-grid action-grid--4">
  <Card variant="xs" className="card--interactive">
    <div className="flex flex-col items-center gap-2">
      <Users size={28} />
      <span className="text-center">View Users</span>
    </div>
  </Card>
  {/* More action cards... */}
</div>
```

---

**Profile/Coach Card Combination**:
```jsx
<Card variant="lg">
  <Avatar src={photo} size="lg" className="mx-auto mb-4" />
  <CardTitle className="text-center">Name</CardTitle>
  <p className="text-center text-caption">Title / Role</p>
  <div className="flex gap-2 justify-center mt-4">
    <MetaPill icon={<Award />} text="Expert" tone="sun" />
    <MetaPill icon={<Star />} text="4.9" tone="warm" />
  </div>
  <div className="flex gap-2 justify-center mt-4">
    {/* Social links */}
  </div>
</Card>
```

---

#### **Content Domain Patterns**

**Resource Card Combination**:
```jsx
<Card variant="md">
  <CardEyebrow>RESOURCE</CardEyebrow>
  <CardTitle>Resource Title</CardTitle>
  <CardDesc>Short description of resource</CardDesc>
  <div className="flex gap-2 mt-3">
    <Badge tone="primary">Type</Badge>
    <Badge tone="warm">Category</Badge>
  </div>
  <Button variant="secondary" className="mt-4" fullWidth>Access Resource</Button>
</Card>
```

---

**Article/Content Card**:
```jsx
<Card variant="lg" style={{backgroundImage: 'url(...)'}}>
  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
  <div className="absolute bottom-0 left-0 right-0 p-4">
    <CardTitle className="text-white">Article Title</CardTitle>
    <CardDesc className="text-white/80">Article description</CardDesc>
  </div>
</Card>
```

---

### 3.4 Card Grid Patterns

#### **Generic Grid Patterns**

```jsx
// 4-column action grid (quick actions)
<div className="action-grid action-grid--4">
  {actions.map(action => <Card variant="xs">{action}</Card>)}
</div>

// Responsive card grid (3-column, responsive)
<CardGrid layout="default">
  {cards.map(card => <Card>{card}</Card>)}
</CardGrid>

// Auto-fit flexible grid
<div className="action-grid action-grid--auto">
  {items.map(item => <Card variant="xs">{item}</Card>)}
</div>
```

---

#### **Domain-Specific Grid Patterns**

```jsx
// Learning paths grid
<LearningPathGrid paths={paths} />

// Resources grid
<ResourceCardGrid resources={resources} />

// Coaches grid
<CoachCardGrid coaches={coaches} />

// Activity feed
<ActivityFeed activities={activities} />

// Veille/Watch feed
<VeilleCardFeed items={items} />
```

---

## 🔄 **SECTION 4: RECOMMENDATIONS & CONSOLIDATION PLAN**

### 4.1 Priority Actions (Phase 2 Migration)

#### **CRITICAL: Remove Redundant Domain Cards**

| Component | Status | Action | Timeline |
|-----------|--------|--------|----------|
| CourseCard | ❌ Redundant | Migrate → Card patterns | Phase 2 |
| ParcoursCard | ❌ Redundant | Migrate → Card patterns | Phase 2 |
| ProfileCard | ❌ Redundant | Migrate → Card patterns | Phase 2 |
| ResourceCard | ❌ Redundant | Migrate → Card patterns | Phase 2 |
| StatCard | ❌ Redundant | Migrate → Card variant | Phase 2 |
| StepCard | ❌ Redundant | Migrate → Card patterns | Phase 2 |
| CoachCard | ❌ Redundant | Migrate → Card patterns | Phase 2 |
| IconFeatureCard | ❌ Redundant | Remove completely | Phase 2 |
| PageCard | ⚠️ Pattern | Assess & consolidate | Phase 2 |

---

#### **IMPORTANT: Consolidate Legacy Components**

| Component | Status | Action | Timeline |
|-----------|--------|--------|----------|
| Achievement | ⚠️ Legacy | Consolidate → AchievementBadge | Phase 2 |
| MetaItem | ⚠️ Legacy | Deprecate → MetaPill/MetaPillGroup | Phase 2 |
| ActivityItem | ⚠️ Legacy | Audit usage in ActivityFeed | Phase 2 |

---

#### **IMPORTANT: Standardize Grid Naming**

| Component | Current | Proposed | Action |
|-----------|---------|----------|--------|
| LearningPathGrid | ✅ Clear | Keep (domain-specific but justified) | No action |
| ResourceCardGrid | ✅ Clear | Keep (domain-specific but justified) | No action |
| CoachCardGrid | ✅ Clear | Keep (domain-specific but justified) | No action |
| VeilleCardFeed | ⚠️ Domain | Consider rename to "WatchFeed" or "MonitorFeed" | Review |

---

### 4.2 New Card Pattern Library (To Create)

#### **Essential Patterns to Establish**

```
Card Patterns:
├─ MetadataCard (icon + text)
├─ FeatureCard (featured content with action)
├─ StatCard (KPI/metric display)
├─ HeroCard (image + overlay)
├─ ActionCard (compact action button)
├─ ToneCard (tone-specific styling)
├─ InteractiveCard (hover feedback)
└─ GlassCard (premium glass morphism)

Card Combinations:
├─ ProfileCard → Card + Avatar + MetaPill
├─ CourseCard → Card + Icon + MetaPill + Button
├─ ResourceCard → Card + Badge + Button
├─ StepCard → Card + Progress + Metadata
├─ CoachCard → Card + Avatar + MetaPill + Social
└─ ArticleCard → Card (hero-image variant)

Layout Patterns:
├─ CardGrid (responsive card grid)
├─ ActionCardGrid (quick action buttons)
├─ PaginatedCardGrid (paginated collection)
├─ MasonryCardGrid (masonry layout)
└─ FeedCardLayout (list/feed layout)
```

---

### 4.3 Proposed Component Hierarchy (Reorganized)

#### **After Consolidation**

```
TIER 0: PRIMITIVES
├─ Button ✅
├─ Card (with 13 variants) ✅
├─ Input ✅
└─ Avatar ✅

TIER 1: INDICATORS & FEEDBACK
├─ Badge ✅
├─ CompetenceBadge ✅
├─ Medal ✅
├─ Alert ✅
├─ Toast ✅
├─ EmptyState ✅
├─ Skeleton ✅
└─ Celebration ✅

TIER 2: DATA DISPLAY
├─ MetaPill + MetaPillGroup ✅ (primary)
├─ Tag ✅
├─ ProgressBar ✅
├─ ProgressRing ✅
├─ InlineProgress ✅
└─ Breadcrumb ✅

TIER 3: NAVIGATION & SELECTION
├─ Tabs ✅
├─ Stepper ✅
├─ Steps ✅
├─ Pagination ✅
├─ DropdownMenu ✅
└─ Search ✅

TIER 4: MODALS & OVERLAYS
├─ Modal ✅
├─ Toast ✅
├─ InlineWin ✅
└─ FloatingNavButton ✅

TIER 5: LAYOUT & STRUCTURE
├─ Sidebar ✅
├─ TopNav ✅
├─ BottomNav ✅
├─ HamburgerButton ✅
└─ OptimizedSidebar ✅

TIER 6: PATTERNS (Card Combinations)
├─ CardGrid ✅
├─ ActionCardGrid ✅
├─ ActivityFeed ✅
├─ ToneAwareCard ✅
├─ InlineProgress ✅
└─ Pattern Templates (to document)

TIER 7: DOMAIN PATTERNS
├─ LearningPathGrid ✅
├─ LearningPathHeader ✅
├─ ResourceCardGrid ✅
├─ CoachCardGrid ✅
├─ DashboardHero ✅
└─ VeilleCardFeed ✅
```

---

## 📝 **SECTION 5: CARD PATTERN MATRIX**

### 5.1 Recommended Card Variants (Complete Matrix)

#### **Size × Style Matrix**

```
SIZE:     xs(12px) | sm(16px) | md(24px) | lg(32px) | xl(48px)

STYLES:
├─ Default              ✅ (border, standard)
├─ Interactive          ✅ (cursor, hover lift)
├─ Glass               ✅ (18px blur, frosted)
├─ Glass-Elevated      ✅ (32px blur, premium)
├─ Feature             ✅ (elevated, prominent)
├─ Gradient-Accent     ✅ (tone border, glow)
├─ Hero-Image          ✅ (image header)
├─ Stat-Highlighted    ✅ (large metric)
├─ Outlined            ✅ (strong border)
├─ Subtle              ✅ (minimal weight)
├─ Minimal             ✅ (border only)
└─ Disabled            ✅ (locked state)

TONES:
├─ Primary (blue)
├─ Warm (orange)
├─ Sun (yellow)
└─ Brand (teal)
```

---

### 5.2 Card Usage Guidelines by Variant

| Variant | Best For | Example Use | Icon Size |
|---------|----------|-------------|-----------|
| **xs** | Action buttons, compact CTAs | Quick actions, filters | 28px |
| **sm** | Metadata, tags, chips | Compact lists, grids | 28px |
| **md** | Default, standard context | Most cards, collections | 40px |
| **lg** | Featured, prominent | Hero content, featured tiles | 56px |
| **xl** | Full-width, display | Page headers, hero sections | 64px |

---

| Style | Purpose | Icon Visibility | Hover Effect | Best Size |
|-------|---------|-----------------|--------------|-----------|
| **Default** | Bordered, standard card | Full | Border color → shadow | md, lg |
| **Interactive** | Clickable card, hover feedback | Full | 2px lift + shadow | sm, md, lg |
| **Glass** | Frosted glass, modern | Full | Brightness filter | md, lg, xl |
| **Glass-Elevated** | Premium glass effect | Full | Brightness + 3px lift | lg, xl |
| **Feature** | Prominent, no border | Full | 4px lift + glow | lg, xl |
| **Gradient-Accent** | Tone-specific, category | Full | Accent intensify | md, lg |
| **Hero-Image** | Image background | Icon overlay | Overlay darken | lg, xl |
| **Stat-Highlighted** | Large KPI metric | Left side | Subtle brightness | md, lg |
| **Outlined** | Strong visual weight | Full | Glow intensify | md, lg |
| **Subtle** | Minimal, secondary | Full | None (border change) | sm, md |

---

## 🎬 **FINAL RECOMMENDATIONS SUMMARY**

### Phase 2 Deliverables

1. **Component Consolidation**
   - [ ] Migrate CourseCard → Card patterns
   - [ ] Migrate ParcoursCard → Card patterns
   - [ ] Migrate ProfileCard → Card patterns
   - [ ] Migrate ResourceCard → Card patterns
   - [ ] Migrate StatCard → Card variant
   - [ ] Migrate StepCard → Card patterns
   - [ ] Migrate CoachCard → Card patterns
   - [ ] Remove IconFeatureCard (deprecated)
   - [ ] Consolidate Achievement → AchievementBadge
   - [ ] Deprecate MetaItem → MetaPill

2. **Pattern Documentation**
   - [ ] Create CardPattern.md with 8 core patterns
   - [ ] Document all card combinations
   - [ ] Create component usage matrix
   - [ ] Build pattern library

3. **Grid Standardization**
   - [ ] Review VeilleCardFeed naming
   - [ ] Standardize grid component naming
   - [ ] Document responsive behavior

4. **Component Exports**
   - [ ] Update components/index.ts
   - [ ] Deprecate legacy component exports
   - [ ] Create migration guide

---

**Status**: ✅ Audit Complete — Ready for Phase 2 Implementation

