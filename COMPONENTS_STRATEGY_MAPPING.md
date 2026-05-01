# 📊 COMPONENTS STRATEGY & PAGE MAPPING

**Strategic mapping of 42 components across 56 pages**  
Building the TLS Learning App with component-first, token-driven design  
Expert UX/UI for Edtech

---

## 🎯 OVERVIEW

| Item | Count | Status |
|------|-------|--------|
| Total Components | 42 | ✅ Documented |
| Total Pages | 56 | 📋 To map |
| Design Tokens | 150+ | ✅ Defined |
| Patterns | 8+ | 🔄 To identify |

---

## 📦 COMPONENTS INVENTORY (42 total)

### CORE (3)
| Component | File | Purpose | Pages |
|-----------|------|---------|-------|
| **Button** | Button.tsx | Action trigger (primary, warm, ghost, etc.) | ALL 56 |
| **Card** | Card.tsx | Content unit (default, feature, interactive, glass) | ALL 56 |
| **Input** | Input.tsx | Form field + Checkbox, Radio, Switch | Auth (5), Forms (15) |

### IDENTITY & STATUS (7)
| Component | File | Purpose | Pages |
|-----------|------|---------|-------|
| **Badge** | Badge.tsx | Status tag (brand, warm, sun, success, danger, info) | Dashboard, Profile, Coaching, Journal |
| **Tag** | Tag.tsx | Category/filter pill | Veille, Magazine, Course filtering |
| **Avatar** | Avatar.tsx | User profile pic + status + group | Messages, Profile, Coaching, Journal |
| **Achievement** | Achievement.tsx | Badge display (earned/progress) | Profile, Dashboard, Leaderboard |
| **CompetenceBadge** | CompetenceBadge.tsx | Skill badge with level | Profile, CourseDetail |
| **Medal** | Medal.tsx | Achievement icon | Profile, Dashboard |
| **UserInfo** | UserInfo.tsx | User profile card | Profile, Coaching, Messages |

### FEEDBACK & INTERACTION (10)
| Component | File | Purpose | Pages |
|-----------|------|---------|-------|
| **Alert** | Alert.tsx | Info/warning/error message | ALL (contextual) |
| **Toast** | Toast.tsx | Temporary notification | ALL (contextual) |
| **Modal** | Modal.tsx | Dialog/popup | Coaching booking, Journal, Course |
| **EmptyState** | EmptyState.tsx | No-data state | All list pages |
| **Skeleton** | Skeleton.tsx | Loading placeholder | All data-heavy pages |
| **Search** | Search.tsx | Search input | Veille, Magazine, CourseFiltering |
| **Pagination** | Pagination.tsx | Page navigation | Magazine, Article list, Veille |
| **Breadcrumb** | Breadcrumb.tsx | Navigation path | Course detail, Article detail |
| **Tabs** | Tabs.tsx | Tab switcher | Profile, CourseDetail, Enterprise |
| **DropdownMenu** | DropdownMenu.tsx | Context menu | ALL (user menu, more actions) |

### LEARNING & PROGRESS (8)
| Component | File | Purpose | Pages |
|-----------|------|---------|-------|
| **ProgressBar** | ProgressBar.tsx | Linear progress 0-100 | Dashboard, CourseDetail, Profile |
| **ProgressRing** | ProgressRing.tsx | Circular progress | Dashboard, CourseDetail, Profile |
| **Steps** | Steps.tsx | Step indicator (done/current/pending) | CourseDetail, Coaching booking |
| **Stepper** | Stepper.tsx | Numbered step counter | Forms, Coaching questionnaire |
| **Celebration** | Celebration.tsx | Achievement animation | Dashboard, CourseDetail, Journal |
| **InlineWin** | InlineWin.tsx | Quick win indicator | Dashboard, Journal, Coaching |
| **StatCard** | StatCard.tsx | Statistics display (hours, badges, etc.) | Dashboard, Profile, Leaderboard |
| **ParcoursCard** | ParcoursCard.tsx | Learning path card | ParcoursPageUpgraded |

### CONTENT & DISPLAY (5)
| Component | File | Purpose | Pages |
|-----------|------|---------|-------|
| **ActionCard** | ActionCard.tsx | Card with action focus | Dashboard quick actions, Course |
| **IconFeatureCard** | IconFeatureCard.tsx | Icon + text feature card | Dashboard, ParcoursPageUpgraded |
| **GlassCard** | GlassCard.tsx | Glass-morphism card | Hero sections, CourseDetail |
| **SurfaceCard** | SurfaceCard.tsx | Surface-colored card | Coaching, Veille |
| **SectionTitle** | SectionTitle.tsx | Section heading | ALL (within page sections) |

### LAYOUT (1)
| Component | File | Purpose | Pages |
|-----------|------|---------|-------|
| **Sidebar** | Sidebar.tsx | Navigation sidebar | ALL (app shell) |

### METADATA & CHIPS (2)
| Component | File | Purpose | Pages |
|-----------|------|---------|-------|
| **MetaPill** | MetaPill.tsx | Metadata chip (icon + text) | Dashboard, ParcoursPageUpgraded, Profile |
| **MetaItem** | MetaItem.tsx | Key-value pair display | CourseDetail, Profile, Coaching |

### UTILITY (2)
| Component | File | Purpose | Pages |
|-----------|------|---------|-------|
| **FloatingNavButton** | FloatingNavButton.tsx | Floating action button | Mobile nav (bottom) |
| **ProtectedRoute** | ProtectedRoute.tsx | Auth guard | App shell |

---

## 🗺️ PAGE COMPONENTS MAPPING (56 pages)

### TIER 1: CORE PAGES (10) — 80% of usage

#### 1. **DashboardPageUpgraded.tsx** (dashboard)
**Purpose**: Learning hub, progress overview, quick actions  
**Key Components**:
- `<Button>` - Quick action CTAs
- `<Card>` (feature) - Action cards, stat cards
- `<Badge>` - Status indicators
- `<ProgressBar>` / `<ProgressRing>` - Overall progress
- `<StatCard>` - Key metrics (hours, badges, streak)
- `<ActionCard>` - Quick actions grid
- `<IconFeatureCard>` - Feature cards
- `<MetaPill>` - Stat labels
- `<Celebration>` - Achievement moments

**UX/UI Improvements**:
- [ ] Clear visual hierarchy: Hero > Stats > Quick actions > Prompts
- [ ] Reduce cognitive load: 4 quick actions max
- [ ] Achievement prominence: Celebrate completed lessons
- [ ] Whitespace: Breathing room between sections (var(--s-8))
- [ ] Progressive disclosure: Hide advanced options
- [ ] Gradient hero: Use var(--g-hero) for visual impact

**Patterns**: Hero section + Grid layout + Stat cards

---

#### 2. **ParcoursPageUpgraded.tsx** (parcours)
**Purpose**: Browse and filter learning paths  
**Key Components**:
- `<Card>` (interactive) - Course tiles
- `<Badge>` - Level, category
- `<ProgressBar>` - Completion %
- `<ParcoursCard>` - Course showcase
- `<Button>` - CTA to start
- `<Search>` - Filter courses
- `<Tag>` - Category filters
- `<EmptyState>` - No results

**UX/UI Improvements**:
- [ ] Search + filter at top (sticky)
- [ ] Card grid responsive: 4 cols desktop → 2 mobile
- [ ] Tone variants: Each course has a tone (primary/warm/sun)
- [ ] Progress overlay: Show completion %
- [ ] Hover lift: Cards elevate on hover
- [ ] Accessibility: Keyboard navigation, focus visible

**Patterns**: Search + Filter layout + Card grid

---

#### 3. **CourseDetailPageUpdated.tsx** (course-detail)
**Purpose**: Single course with steps and lessons  
**Key Components**:
- `<Card>` (feature) - Step cards, lesson cards
- `<ProgressBar>` - Course progress, lesson progress
- `<Steps>` - Step indicator
- `<Badge>` - Lesson status
- `<Button>` - "Play lesson", "Next step"
- `<Tabs>` - Overview, Steps, Resources, Project
- `<MetaItem>` - Duration, instructor, level
- `<Modal>` - Lesson modal (if modal UX)

**UX/UI Improvements**:
- [ ] Step progression visual: Clear locked/unlocked states
- [ ] Lesson preview: Cards show duration, difficulty
- [ ] Progress rewards: Celebrate step completion
- [ ] Resources sidebar: Complementary content visible
- [ ] Project CTA: Prominent, motivating
- [ ] Back button: Clear navigation

**Patterns**: Tabs + Step progression + Card grid

---

#### 4. **JournalPageUpgraded.tsx** (journal)
**Purpose**: Reflection and introspection hub  
**Key Components**:
- `<Card>` (feature) - Journal entry cards
- `<Button>` - New entry CTAs
- `<Tag>` - Entry type (learning, insight, coaching)
- `<EmptyState>` - No entries yet
- `<Search>` - Filter/search entries
- `<Badge>` - Entry type badge

**UX/UI Improvements**:
- [ ] Clear entry types: Learning, Coaching, Insight, Gratitude
- [ ] Prompts visible: Reflection questions at top
- [ ] Card timestamps: Show when written
- [ ] Empty state motivation: Encourage first entry
- [ ] Search prominent: Find past reflections
- [ ] Color coding: Each type has a tone

**Patterns**: Prompt display + Card list + Search

---

#### 5. **CoachingPageUpgraded.tsx** (coaching)
**Purpose**: Coaching session management  
**Key Components**:
- `<Card>` (interactive) - Session cards
- `<Button>` - Book session, View session
- `<Badge>` - Status (scheduled, completed, cancelled)
- `<Avatar>` - Coach profile
- `<ProgressBar>` - Preparation %
- `<Modal>` - Booking modal (links to CoachingBookingFlowPage)
- `<Timeline>` - Session history (if exists)

**UX/UI Improvements**:
- [ ] Next session prominent: Top card
- [ ] Booking CTA: Clear and motivating
- [ ] Coach profiles: Include photo, bio, expertise
- [ ] Session notes: Visible post-session
- [ ] Rating prompt: After session completion
- [ ] Testimonials: Social proof

**Patterns**: Session cards + Booking CTA + User profiles

---

#### 6. **ProfilePage.tsx** (profile)
**Purpose**: User achievement showcase  
**Key Components**:
- `<Card>` (feature) - Sections
- `<Badge>` - Role, level
- `<Avatar>` - User photo
- `<Achievement>` - Badges earned
- `<ProgressRing>` - Skill levels
- `<StatCard>` - Hours, courses, streak
- `<Tabs>` - Overview, Activity, Badges, Skills
- `<Breadcrumb>` - Navigation

**UX/UI Improvements**:
- [ ] Hero profile card: Photo + stats
- [ ] Achievement grid: Show earned badges prominently
- [ ] Skill visualization: Progress rings for each skill
- [ ] Activity feed: Recent accomplishments
- [ ] Edit button: Accessible
- [ ] Social proof: Badges and rank visible

**Patterns**: Profile hero + Tabs + Achievement grid

---

#### 7. **VeillePage.tsx** (veille)
**Purpose**: Content discovery and news hub  
**Key Components**:
- `<Card>` (interactive) - Content tiles
- `<Button>` - View article, Save, Share
- `<Badge>` - Content type (article, video, podcast)
- `<Tag>` - Topic tags
- `<Search>` - Find content
- `<Avatar>` - Author
- `<EmptyState>` - No content matching filters

**UX/UI Improvements**:
- [ ] Featured content: Hero section with top story
- [ ] Content types visible: Icon + badge
- [ ] Filtering: Topic, source, recency
- [ ] Card previews: Title, author, date
- [ ] Infinite scroll or pagination: Load more
- [ ] Reading time: Estimate + difficulty

**Patterns**: Search + Filter + Content grid

---

#### 8. **MagazinePage.tsx** (veille-magazine)
**Purpose**: Magazine article browsing  
**Key Components**:
- `<Card>` (feature) - Article cards
- `<Button>` - Read article
- `<Badge>` - Category
- `<Avatar>` - Author
- `<Pagination>` - Navigate articles
- `<Search>` - Search articles

**UX/UI Improvements**:
- [ ] Magazine hero: Feature article
- [ ] Featured section: Top 3 articles
- [ ] Card hierarchy: Title, excerpt, meta
- [ ] Author credit: Name + avatar
- [ ] Read more: Truncated text with expand
- [ ] Sharing: Social buttons

**Patterns**: Featured hero + Article grid

---

#### 9. **NotificationsPageUltra.tsx** (notifications)
**Purpose**: Activity notifications  
**Key Components**:
- `<Card>` - Notification items
- `<Button>` - Mark as read, Delete
- `<Badge>` - Type (lesson, badge, coaching)
- `<Avatar>` - Related user (if applicable)
- `<Tabs>` - Filter (All, Lessons, Messages, Coaching)
- `<EmptyState>` - No notifications

**UX/UI Improvements**:
- [ ] Unread indication: Clear badge count
- [ ] Notification types: Color-coded by type
- [ ] Timestamps: Relative time (1h ago)
- [ ] Actions: Quick actions in notification
- [ ] Dismiss: Easy to clear
- [ ] Filtering: Tab-based categorization

**Patterns**: Tab filtering + Notification list

---

#### 10. **MessagesPage.tsx** (messages)
**Purpose**: Conversations hub  
**Key Components**:
- `<Card>` - Conversation threads
- `<Button>` - Send message, Reply
- `<Avatar>` - Conversation partner
- `<Search>` - Find conversations
- `<Badge>` - Unread count
- `<EmptyState>` - No messages

**UX/UI Improvements**:
- [ ] Unread conversations: At top
- [ ] Read indicators: Seen/unseen
- [ ] Timestamps: Show conversation recency
- [ ] Search: Find conversations by person/topic
- [ ] Conversation preview: Last message visible
- [ ] Reply quick action: Visible in card

**Patterns**: Message list + Search

---

### TIER 2: CONTENT PAGES (7) — Discovery & Learning

#### 11-17. **VeilleContent, Article Detail, Magazine Articles, Newsletter, Videos, Dossiers, etc.**
**Common Components**:
- `<Card>` - Content containers
- `<Button>` - CTA
- `<Badge>` - Type
- `<Avatar>` - Author
- `<Search>` - Filter content
- `<Breadcrumb>` - Navigation
- `<EmptyState>` - No content

**Pattern**: Hero + Content grid + Sidebar (related)

---

### TIER 3: VIEWERS & LEARNING (9) — Interactive content

#### 18-26. **LessonViewer, FlashcardsViewer, AstucesViewer, VideoTutorial, etc.**
**Common Components**:
- `<ProgressBar>` - Lesson progress
- `<Button>` - Next/Previous
- `<Card>` - Content sections
- `<Badge>` - Status
- `<Modal>` - Dialogs
- `<Celebration>` - Completion

**Pattern**: Full-screen viewer + Progress + Navigation

---

### TIER 4: FORMS & FLOWS (8) — User interactions

#### 27-34. **CoachingBookingFlow, Questionnaires, Onboarding, etc.**
**Common Components**:
- `<Input>` - Form fields
- `<Button>` - Submit, Continue
- `<Stepper>` - Step progress
- `<Card>` - Form sections
- `<Alert>` - Validation messages
- `<Radio>` / `<Checkbox>` - Options

**Pattern**: Multi-step form + Progress indicator

---

### TIER 5: AUTH (5) — Authentication

#### 35-39. **Login, Signup, ForgotPassword, ResetPassword, PMProLogin**
**Common Components**:
- `<Input>` - Form fields
- `<Button>` - Submit
- `<Card>` - Form container
- `<Alert>` - Errors
- `<Link>` - Navigation between auth pages

**Pattern**: Centered form + Hero background

---

### TIER 6: ADMIN & UTILITY (8) — Enterprise

#### 40-47. **EntreprisePageComplete, Help, Errors, Demo pages**
**Common Components**:
- `<Card>` - Content sections
- `<Button>` - Actions
- `<Tabs>` - Admin tabs
- `<Badge>` - Status
- `<Avatar>` - Users
- `<Table>` (if exists) - User management

**Pattern**: Tabs + Data grids

---

## 🎨 GLOBAL PATTERNS (Used across all pages)

### Pattern 1: Hero Section
**Used in**: Dashboard, Veille, Magazine, Profile, Coaching, CourseDetail  
**Components**: Gradient background, Heading, Description, Stats  
**Implementation**:
```tsx
<div style={{
  background: 'var(--g-hero)',  // or --g-cool-deep, --g-warm
  color: 'white',
  padding: 'var(--s-12)',
}}>
  <h1 style={{ fontSize: 'var(--t-h1)' }}>Title</h1>
  <p style={{ fontSize: 'var(--t-body)', opacity: 0.92 }}>Description</p>
</div>
```

### Pattern 2: Card Grid (Responsive)
**Used in**: ParcoursPageUpgraded, Dashboard, CourseDetail, Veille, Magazine  
**Grid**: Auto-fit with minmax(280px, 1fr) or fixed columns (3/4 desktop)  
**Implementation**:
```tsx
<div style={{
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
  gap: 'var(--s-4)',
}}>
  {items.map(item => <Card>{item}</Card>)}
</div>
```

### Pattern 3: Two-Column Layout (Main + Sidebar)
**Used in**: CourseDetail, Profile, Enterprise  
**Sidebar**: Sticky, 300px, on right  
**Implementation**:
```tsx
<div style={{
  display: 'grid',
  gridTemplateColumns: '1fr 300px',
  gap: 'var(--s-8)',
}}>
  <main>{content}</main>
  <aside style={{ position: 'sticky', top: 'var(--s-8)' }}>{sidebar}</aside>
</div>
```

### Pattern 4: Tab Navigation
**Used in**: Profile, CourseDetail, Enterprise, Coaching  
**Implementation**: Tabs component with styled content  
**Components**: `<Tabs>`, `<TabsTrigger>`, `<TabsContent>`

### Pattern 5: Search + Filter
**Used in**: Veille, Magazine, ParcoursPageUpgraded, Messages  
**Implementation**: Sticky search bar + Filter tags/buttons  
**Components**: `<Search>`, `<Tag>` (removable), `<Button>` (reset)

### Pattern 6: Empty State
**Used in**: All list pages (Messages, Journal, Notifications, etc.)  
**Components**: `<EmptyState>` with icon, title, description, CTA  
**UX**: Motivate user to create first item

### Pattern 7: Progress Indicators
**Used in**: Dashboard, CourseDetail, Profile, Coaching  
**Components**: `<ProgressBar>`, `<ProgressRing>`, `<Steps>`  
**UX**: Clear milestones and achievements

### Pattern 8: Modal Flows
**Used in**: Coaching booking, Journal new entry, Course modals  
**Components**: `<Modal>`, `<Stepper>` (if multi-step)  
**UX**: Focus user attention on task

---

## 🎯 REFACTORING STRATEGY BY PAGE

### For EACH page:

```
1. ANALYZE
   - Current state: What CSS is hardcoded?
   - Design ref: What should it look like?
   - Required components: Which 42 components are needed?

2. PLAN
   - Component tree: Hierarchical layout
   - Patterns: Which patterns apply?
   - Tokens: Which tokens to use?

3. IMPLEMENT
   - Remove CSS imports
   - Replace with component composition
   - Use tokens for all spacing, colors, typography

4. ENHANCE
   - UX/UI improvements (accessibility, hierarchy, flow)
   - Mobile-first responsive
   - Performance check

5. VERIFY
   - Visual regression: Matches design ref
   - Accessibility: WCAG AA
   - Mobile: 375px, 768px, 1280px
   - Performance: Bundle size, render time
```

---

## 📋 COMPONENTS.TSX IMPROVEMENTS

Current: 21 components documented  
Target: All 42 components + patterns + usage examples

**To Add**:
- [ ] Achievement, CompetenceBadge, Medal - Learning badges
- [ ] ParcoursCard - Course card
- [ ] ActionCard, IconFeatureCard - Feature cards
- [ ] GlassCard, SurfaceCard - Styled cards
- [ ] MetaPill, MetaItem - Metadata display
- [ ] FloatingNavButton - Mobile nav
- [ ] All 8 patterns: Hero, Grid, Layout, Tabs, Search+Filter, Empty, Progress, Modal

**Enhancement**:
- [ ] Searchable by component name
- [ ] Filter by category: Core, Identity, Feedback, Learning, Content, Layout
- [ ] Copy button for token values
- [ ] Live code editor (optional)
- [ ] Responsive preview toggle

---

## ✅ NEXT STEPS

1. **Improve Components.tsx** (2-3h)
   - Add missing 21 components
   - Document all variants
   - Add pattern examples

2. **Refactor TOP 5 Pages** (15-20h)
   - Dashboard
   - ParcoursPageUpgraded
   - CourseDetailPageUpdated
   - JournalPageUpgraded
   - CoachingPageUpgraded

3. **Refactor remaining 51 pages** (40-50h)
   - Batch by pattern/type
   - Maintain consistency
   - Test accessibility

---

**Status**: Ready to begin PHASE 0 (Components.tsx improvement)  
**Owner**: UX/UI Expert (Edtech specialist)  
**Timeline**: ~2-3 weeks for complete refactoring

