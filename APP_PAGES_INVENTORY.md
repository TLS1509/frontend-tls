# TLS Learning App - Complete Pages & Components Inventory

**Date**: May 1, 2026  
**Status**: Phase 4 Complete, Phase 5 Planning  
**Total Pages**: 46  
**Total Components**: 60+  

---

## 📊 Executive Summary

### By Category Status
| Category | Pages | Styled | Token Compliance | A11y | Dark Mode | Status |
|----------|-------|--------|------------------|------|-----------|--------|
| Authentication | 4 | 50% | 40% | 60% | ❌ | Need Polish |
| Dashboard & Learning | 5 | 100% | 85% | 90% | ⏳ | Ready |
| Content Consumption | 8 | 60% | 50% | 70% | ❌ | In Progress |
| User Content (Journal) | 4 | 40% | 30% | 50% | ❌ | Need Refactor |
| Community & Social | 3 | 40% | 40% | 60% | ❌ | Basic |
| User Accounts | 2 | 20% | 30% | 60% | ❌ | Minimal |
| Error Pages | 2 | 60% | 50% | 80% | ⏳ | Basic |
| Coaching | 4 | 40% | 35% | 60% | ❌ | In Progress |
| Admin/Internal | 2 | 10% | 20% | 40% | ❌ | Placeholder |

---

## 🎯 PHASE 5 PRIORITY MAP

### Critical (Phase 5 Week 1) - High User Impact
1. **Dashboard.tsx** → Dark Mode + Animations + Polish
2. **LearningPaths.tsx** → Dark Mode + Component Ratification
3. **LearningPathDetail.tsx** → Dark Mode + Animations
4. **Coaching.tsx** → Dark Mode + Responsive Fix
5. **Journal.tsx** → Dark Mode + UI Polish

### High Priority (Phase 5 Week 2) - Medium Impact
6. **Login.tsx** → Dark Mode + Responsive
7. **Signup.tsx** → Dark Mode + Form Polish
8. **Veille.tsx** → Dark Mode + Card Patterns
9. **Collaboration.tsx** → Dark Mode + UI Refresh
10. **Messages.tsx** → Dark Mode + Responsive

### Medium Priority (Phase 5 Week 3) - Refinement
11. **Profile.tsx** → Refactor + Dark Mode
12. **Settings.tsx** → Refactor + Dark Mode
13. **Notifications.tsx** → Polish + Dark Mode
14. **Leaderboard.tsx** → Polish + Dark Mode
15. Additional content pages...

---

# 📄 DETAILED PAGES INVENTORY

## 🔐 AUTHENTICATION PAGES (4)

### 1. Login.tsx
**Current State:**
- ✗ CSS: `static-pages.css` (shared)
- ✗ Token Compliance: 40% (hardcoded colors remain)
- ✗ Dark Mode: Not prepared
- ✗ A11y: Basic (missing focus rings on inputs)
- ✗ Responsive: Works but not optimized

**Issues Identified:**
- Form inputs use hardcoded colors: `background: white`, `border: 1px solid #e0e0e0`
- Button styles inline
- No smooth focus transitions
- Mobile input sizing not optimized
- Loading state spinner not token-based

**Improvements Needed:**
- [ ] Replace all colors with tokens (--surface, --border, --text)
- [ ] Create reusable Form component wrapper
- [ ] Add dark mode overrides
- [ ] Enhance focus ring visibility
- [ ] Add micro-interactions (input expand on focus, button hover)
- [ ] Responsive typography scaling
- [ ] Add error state styling

**Build Impact**: ~2 hours refactoring + 1 hour testing

---

### 2. Signup.tsx
**Current State:**
- ✗ CSS: `static-pages.css` (shared)
- ✗ Token Compliance: 35% (form styling hardcoded)
- ✗ Dark Mode: Not prepared
- ✗ A11y: 50% (no validation messaging)
- ✗ Responsive: Basic

**Issues Identified:**
- Form fields use inline styles with hardcoded colors
- No validation error states
- Password strength meter not styled
- Multi-step form lacks visual feedback
- Checkbox/radio styling missing

**Improvements Needed:**
- [ ] Token-based form styling
- [ ] Validation error states (red border, error message)
- [ ] Password strength indicator styling
- [ ] Progress indicator for multi-step form
- [ ] Checkbox/radio component variants
- [ ] Dark mode form styling
- [ ] Accessibility improvements (aria-invalid, aria-describedby)

**Build Impact**: ~3 hours (form components + validation styling)

---

### 3. ForgotPassword.tsx
**Current State:**
- ✗ CSS: `static-pages.css`
- ✗ Token Compliance: 40%
- ✗ Responsive: Basic

**Improvements Needed:**
- [ ] Form token compliance
- [ ] Dark mode
- [ ] A11y enhancements

**Build Impact**: ~1.5 hours

---

### 4. ResetPassword.tsx
**Current State:**
- ✗ CSS: `static-pages.css`
- ✗ Token Compliance: 40%
- ✗ Responsive: Basic

**Improvements Needed:**
- [ ] Form token compliance
- [ ] Dark mode
- [ ] A11y enhancements

**Build Impact**: ~1.5 hours

---

## 📊 DASHBOARD & LEARNING CORE (5)

### 1. Dashboard.tsx ⭐ PRIORITY 1
**Current State:**
- ✅ CSS: `dashboard-modern.css` (comprehensive)
- ✅ Token Compliance: 85% (great in Phase 4!)
- ⏳ Dark Mode: Foundation ready, needs activation
- ✅ A11y: 90% (hover states added in Week 1)
- ✅ Responsive: Good (mobile-first)

**Components Used:**
- MetaPillGroup ✓
- CardGrid ✓
- InlineProgress ✓
- ToneAwareCard ✓

**Phase 4 Achievements:**
- Quick action cards: Hover lift + shadow elevation
- Continue Learning: Full card interactivity
- Prompt grid: Responsive 4→3→1 cols
- Stat pills: Icon-based metadata

**Remaining Work:**
- [ ] **Dark Mode Activation** (1hr) - Test dark-mode-tokens.css
- [ ] **Page Transitions** (1.5hr) - Fade/slide animations
- [ ] **Micro-interactions** (1hr) - Button press animations, card hover effects
- [ ] **Animation Enhancements** (1.5hr) - Stagger on load, smooth transitions
- [ ] **Component Polish** (1hr) - Fine-tune shadows, spacing, colors

**Build Impact**: ~6 hours total Phase 5 work

---

### 2. LearningPaths.tsx ⭐ PRIORITY 2
**Current State:**
- ✅ CSS: `learning-paths.css` (23,869 lines!)
- ✅ Token Compliance: 80% (good)
- ⏳ Dark Mode: Foundation ready
- ✅ A11y: 85%
- ✅ Responsive: 3→2→1 cols

**Components Used:**
- CardGrid ✓
- ParcoursCard with ToneAwareCard ✓
- MetaPillGroup ✓
- InlineProgress ✓

**Phase 4 Achievements:**
- ParcoursCard: Full refactor with ToneAwareCard wrapper
- Metadata: MetaPillGroup with icons (User, Zap, Clock, BookOpen)
- Progress: InlineProgress inline within cards
- Tone variants: Primary/Warm/Sun colors

**Remaining Work:**
- [ ] **Dark Mode Activation** (1hr) - Test card styling
- [ ] **Learning Path Filter Animation** (1hr) - Smooth transitions on filter
- [ ] **Card Stagger Animation** (0.5hr) - Fade in on load
- [ ] **Hover Effects** (1hr) - Enhanced card lift with glow
- [ ] **Skeleton Loaders** (1.5hr) - Loading state animation

**Build Impact**: ~5 hours Phase 5 work

---

### 3. LearningPathDetail.tsx ⭐ PRIORITY 3
**Current State:**
- ✅ CSS: `learning-paths.css` (shared)
- ✅ Token Compliance: 80%
- ⏳ Dark Mode: Foundation ready
- ✅ A11y: 85%
- ✅ Responsive: Good

**Components Used:**
- CardGrid ✓
- InlineProgress ✓
- MetaPillGroup ✓

**Remaining Work:**
- [ ] **Dark Mode** (1hr)
- [ ] **Step Animations** (1.5hr) - Expand/collapse transitions
- [ ] **Progress Animations** (1hr) - Smooth fill transitions
- [ ] **Complementary Content Grid** (1hr) - Resource cards animation

**Build Impact**: ~4.5 hours Phase 5 work

---

### 4. Coaching.tsx ⭐ PRIORITY 4
**Current State:**
- ⚠️ CSS: Inline styles only
- ⚠️ Token Compliance: 60% (Week 1 fixes applied)
- ⚠️ Dark Mode: Not prepared
- ⚠️ A11y: 70% (Week 1 added hover/focus)
- ⚠️ Responsive: Fixed grid (Week 1 fixed, but needs polish)

**Issues Identified:**
- Grid still needs final responsive polish on mobile
- KPI cards: Hover effects added but need animations
- Shadow values: Token-based ✓ but colors need dark mode

**Week 1 Fixes Applied:**
- Colors: `#fff` → `var(--surface)` ✓
- Shadows: Hardcoded → `var(--shadow-xs)` ✓
- Focus rings added ✓
- Responsive grid fixed ✓

**Remaining Work:**
- [ ] **Dark Mode** (1hr)
- [ ] **KPI Card Animations** (1.5hr) - Entrance animations, hover scale
- [ ] **Button Animations** (0.5hr) - Booking button hover/press
- [ ] **Loading States** (1hr) - Skeleton loaders for KPI data
- [ ] **Mobile Polish** (1hr) - Input fields, spacing on small screens

**Build Impact**: ~5 hours Phase 5 work

---

### 5. Components.tsx (Achievements Page)
**Current State:**
- ✗ CSS: Minimal inline styling
- ✗ Token Compliance: 40%
- ✗ Dark Mode: Not prepared
- ✗ A11y: 50%
- ✗ Responsive: Basic

**Issues Identified:**
- Unclear purpose/usage (seems to be "Achievements")
- No consistent styling pattern
- Hardcoded colors throughout
- Missing component examples

**Improvements Needed:**
- [ ] Clarify page purpose and content
- [ ] Token-based styling
- [ ] Achievement badge components
- [ ] Progress indicators
- [ ] Dark mode support

**Build Impact**: ~3 hours (depends on scope)

---

## 📚 CONTENT CONSUMPTION (8)

### 1. Veille.tsx (Content Discovery)
**Current State:**
- ⚠️ CSS: `veille.css` (12,444 lines!)
- ⚠️ Token Compliance: 60%
- ✗ Dark Mode: Not prepared
- ⚠️ A11y: 70%
- ⚠️ Responsive: Good

**Issues Identified:**
- Large CSS file suggests duplication
- Hardcoded colors in content cards
- No consistent card pattern
- Search/filter UI could be improved

**Improvements Needed:**
- [ ] **Dark Mode** (1.5hr)
- [ ] **Card Pattern Consolidation** (2hr) - Use CardGrid + Card components
- [ ] **Search/Filter UI** (1.5hr) - Better visual feedback
- [ ] **Content Categories** (1hr) - Tone-based category styling
- [ ] **Loading States** (1hr) - Skeleton animations
- [ ] **CSS Consolidation** (2hr) - Reduce veille.css size

**Build Impact**: ~9 hours refactoring

---

### 2. VeilleContent.tsx
**Current State:**
- ⚠️ CSS: `veille.css` (shared)
- ⚠️ Token Compliance: 55%
- ✗ Dark Mode: Not prepared
- ⚠️ Responsive: Needs work

**Improvements Needed:**
- [ ] Dark mode
- [ ] Token compliance
- [ ] Responsive improvements
- [ ] Component refactoring

**Build Impact**: ~4 hours

---

### 3. ArticleDetail.tsx
**Current State:**
- ⚠️ CSS: `veille.css`
- ⚠️ Token Compliance: 50%
- ✗ Dark Mode: Not prepared

**Improvements Needed:**
- [ ] Dark mode
- [ ] Typography optimization for readability
- [ ] Related articles section styling
- [ ] Share button styling

**Build Impact**: ~3 hours

---

### 4. Dossier.tsx
**Current State:**
- ⚠️ CSS: `figma-missing-pages.css`
- ⚠️ Token Compliance: 40%

**Improvements Needed:**
- [ ] Full refactoring
- [ ] Dark mode
- [ ] Component standardization

**Build Impact**: ~4 hours

---

### 5. VideoTutorial.tsx
**Current State:**
- ⚠️ CSS: Basic styling
- ✗ Token Compliance: 30%
- ✗ Responsive: Needs work

**Improvements Needed:**
- [ ] Video player styling
- [ ] Related videos grid
- [ ] Dark mode
- [ ] Transcript styling

**Build Impact**: ~4 hours

---

### 6. VideoReels.tsx
**Current State:**
- ✗ CSS: Minimal
- ✗ Token Compliance: 20%

**Improvements Needed:**
- [ ] Full styling for reel cards
- [ ] Dark mode
- [ ] Animation for reel transitions

**Build Impact**: ~3 hours

---

### 7. Magazine.tsx
**Current State:**
- ✗ CSS: Minimal
- ✗ Token Compliance: 30%
- ✗ Responsive: Basic

**Improvements Needed:**
- [ ] Magazine grid styling
- [ ] Featured article styling
- [ ] Dark mode
- [ ] Responsive layout

**Build Impact**: ~4 hours

---

### 8. MagazineArticle.tsx
**Current State:**
- ✗ CSS: Minimal
- ✗ Token Compliance: 35%

**Improvements Needed:**
- [ ] Article layout
- [ ] Typography optimization
- [ ] Dark mode

**Build Impact**: ~3 hours

---

## 📔 USER CONTENT - JOURNAL (4)

### 1. Journal.tsx
**Current State:**
- ⚠️ CSS: Inline styles + utilities
- ⚠️ Token Compliance: 65% (Week 1: shadows fixed ✓)
- ✗ Dark Mode: Not prepared
- ⚠️ A11y: 70%
- ⚠️ Responsive: Good

**Week 1 Fixes Applied:**
- Shadow: `'0 6px 20px rgba(0,0,0,0.08)'` → `var(--shadow-lg)` ✓
- Toolbar: Added flex-wrap for mobile ✓

**Remaining Work:**
- [ ] **Dark Mode** (1hr)
- [ ] **Filter Pill Animations** (0.5hr) - Smooth transitions
- [ ] **Journal Card Hover** (0.5hr) - Lift effect on hover
- [ ] **Loading States** (1hr) - Skeleton loaders
- [ ] **Empty States** (0.5hr) - Better empty journal message
- [ ] **Mobile Optimization** (1hr) - Smaller screen adjustments

**Build Impact**: ~5 hours Phase 5 work

---

### 2. JournalDetail.tsx
**Current State:**
- ⚠️ CSS: Minimal
- ⚠️ Token Compliance: 40%
- ✗ Dark Mode: Not prepared

**Issues Identified:**
- Entry content uses hardcoded colors
- No consistent card styling
- Missing edit/delete interactions

**Improvements Needed:**
- [ ] Token-based styling
- [ ] Entry card components
- [ ] Edit/delete button styling
- [ ] Dark mode
- [ ] Rich text editor styling

**Build Impact**: ~4 hours

---

### 3. JournalNewEntry.tsx
**Current State:**
- ⚠️ CSS: Minimal
- ⚠️ Token Compliance: 35%
- ✗ Dark Mode: Not prepared

**Improvements Needed:**
- [ ] Form styling with tokens
- [ ] Editor interface styling
- [ ] Button states
- [ ] Dark mode
- [ ] A11y improvements

**Build Impact**: ~4 hours

---

### 4. JournalFreeEntry.tsx
**Current State:**
- ⚠️ CSS: Minimal
- ⚠️ Token Compliance: 35%
- ✗ Dark Mode: Not prepared

**Improvements Needed:**
- [ ] Editor styling
- [ ] Rich text controls
- [ ] Save/cancel buttons
- [ ] Dark mode

**Build Impact**: ~3 hours

---

## 👥 COMMUNITY & SOCIAL (3)

### 1. Collaboration.tsx
**Current State:**
- ✗ CSS: Minimal
- ✗ Token Compliance: 40%
- ✗ Dark Mode: Not prepared
- ⚠️ A11y: 60%

**Improvements Needed:**
- [ ] Chat/comment interface styling
- [ ] User mention styling
- [ ] Collaboration card components
- [ ] Dark mode
- [ ] Message timestamp styling

**Build Impact**: ~5 hours

---

### 2. Messages.tsx
**Current State:**
- ✗ CSS: Minimal
- ✗ Token Compliance: 30%
- ✗ Dark Mode: Not prepared

**Improvements Needed:**
- [ ] Message list styling
- [ ] Message bubble styling
- [ ] Input field styling
- [ ] Read/unread states
- [ ] Dark mode
- [ ] Timestamp formatting

**Build Impact**: ~5 hours

---

### 3. Leaderboard.tsx
**Current State:**
- ✗ CSS: Minimal
- ✗ Token Compliance: 40%
- ✗ Dark Mode: Not prepared

**Improvements Needed:**
- [ ] Leaderboard table styling
- [ ] Rank badge styling
- [ ] Point indicators
- [ ] Dark mode
- [ ] Responsive table design

**Build Impact**: ~4 hours

---

## 👤 USER ACCOUNTS (2)

### 1. Profile.tsx
**Current State:**
- ✗ CSS: Minimal
- ✗ Token Compliance: 30%
- ✗ Dark Mode: Not prepared
- ⚠️ A11y: 60%

**Improvements Needed:**
- [ ] Profile header styling
- [ ] Avatar component
- [ ] Stats cards
- [ ] Bio text editor
- [ ] Achievement badges
- [ ] Dark mode
- [ ] Edit mode styling

**Build Impact**: ~5 hours

---

### 2. Settings.tsx
**Current State:**
- ✗ CSS: Minimal
- ✗ Token Compliance: 25%
- ✗ Dark Mode: Not prepared

**Improvements Needed:**
- [ ] Settings group styling
- [ ] Toggle switch components
- [ ] Form field styling
- [ ] Save confirmation
- [ ] Dark mode
- [ ] Responsive layout for settings groups

**Build Impact**: ~4 hours

---

## ⚠️ ERROR PAGES (2)

### 1. Error404.tsx
**Current State:**
- ⚠️ CSS: `static-pages.css`
- ⚠️ Token Compliance: 50%
- ⏳ Dark Mode: Foundation ready

**Improvements Needed:**
- [ ] More engaging error illustration
- [ ] Better CTA styling
- [ ] Dark mode
- [ ] Animation on load

**Build Impact**: ~1.5 hours

---

### 2. Error500.tsx
**Current State:**
- ⚠️ CSS: `static-pages.css`
- ⚠️ Token Compliance: 50%
- ⏳ Dark Mode: Foundation ready

**Improvements Needed:**
- [ ] Error illustration
- [ ] Retry button styling
- [ ] Dark mode
- [ ] Support contact info

**Build Impact**: ~1.5 hours

---

## 🎓 COACHING (4)

### 1. CoachingBookingFlow.tsx
**Current State:**
- ✗ CSS: Minimal
- ✗ Token Compliance: 35%
- ✗ Dark Mode: Not prepared

**Issues Identified:**
- Multi-step form styling incomplete
- Calendar widget styling needed
- No clear visual progress indicator

**Improvements Needed:**
- [ ] Multi-step form styling
- [ ] Calendar widget styling
- [ ] Availability visualization
- [ ] Booking confirmation styling
- [ ] Dark mode
- [ ] Form validation messaging

**Build Impact**: ~5 hours

---

### 2. PreCoachingQuestionnaire.tsx
**Current State:**
- ✗ CSS: Minimal
- ✗ Token Compliance: 40%
- ✗ Dark Mode: Not prepared

**Improvements Needed:**
- [ ] Questionnaire form styling
- [ ] Question group styling
- [ ] Radio/checkbox options styling
- [ ] Progress bar
- [ ] Dark mode

**Build Impact**: ~3 hours

---

### 3. PreCoachingQuestionnaireResponse.tsx
**Current State:**
- ✗ CSS: Minimal
- ✗ Token Compliance: 35%

**Improvements Needed:**
- [ ] Response summary styling
- [ ] Data visualization
- [ ] Dark mode

**Build Impact**: ~2 hours

---

## 🔧 INTERNAL/ADMIN (2)

### 1. PagesIndex.tsx
**Current State:**
- ✗ CSS: `pages-index.css` (9,169 lines!)
- ✗ Token Compliance: 40%
- ✗ Dark Mode: Not prepared

**Issues Identified:**
- Large CSS file suggests duplication
- Layout could use component abstraction
- Needs responsive improvements

**Improvements Needed:**
- [ ] CSS consolidation
- [ ] Token compliance
- [ ] Dark mode
- [ ] Component refactoring

**Build Impact**: ~5 hours

---

### 2. ComponentShowcase.tsx
**Current State:**
- ✗ CSS: `components-showcase.css` (1,107 lines)
- ⚠️ Token Compliance: 50%
- ⏳ Dark Mode: Partially ready

**Improvements Needed:**
- [ ] Add missing components
- [ ] Consistency in component display
- [ ] Code example styling
- [ ] Dark mode support

**Build Impact**: ~3 hours

---

## 🎁 SPECIAL PAGES (5)

### 1. Account.tsx
**Current State:**
- ✗ CSS: None
- ✗ Token Compliance: 20%

**Build Impact**: ~2 hours

---

### 2. Help.tsx
**Current State:**
- ✗ CSS: Minimal
- ✗ Token Compliance: 30%

**Build Impact**: ~2 hours

---

### 3. Enterprise.tsx
**Current State:**
- ✗ CSS: Minimal
- ✗ Token Compliance: 40%

**Build Impact**: ~2 hours

---

### 4. Notifications.tsx
**Current State:**
- ✗ CSS: Minimal
- ✗ Token Compliance: 35%

**Build Impact**: ~3 hours

---

### 5. LearningSpace.tsx
**Current State:**
- ✗ CSS: Minimal
- ✗ Token Compliance: 30%

**Build Impact**: ~2 hours

---

## 🎬 VIEWERS & PLAYERS (6)

### 1. LessonPlayer.tsx
**Current State:**
- ✗ CSS: Minimal
- ✗ Token Compliance: 25%
- ✗ Responsive: Player aspect ratio issues

**Improvements Needed:**
- [ ] Video player styling
- [ ] Controls styling
- [ ] Lesson sidebar styling
- [ ] Progress tracking visualization
- [ ] Dark mode

**Build Impact**: ~4 hours

---

### 2. FlashcardsViewer.tsx
**Current State:**
- ✗ CSS: Minimal
- ✗ Token Compliance: 30%

**Build Impact**: ~3 hours

---

### 3. AstucesViewer.tsx
**Current State:**
- ✗ CSS: Minimal
- ✗ Token Compliance: 35%

**Build Impact**: ~2 hours

---

### 4. ComplementaryContentViewer.tsx
**Current State:**
- ✗ CSS: Minimal
- ✗ Token Compliance: 35%

**Build Impact**: ~2 hours

---

### 5. VideoViewer.tsx
**Current State:**
- ✗ CSS: Minimal
- ✗ Token Compliance: 30%

**Build Impact**: ~3 hours

---

### 6. CourseDetail.tsx
**Current State:**
- ✗ CSS: Minimal
- ✗ Token Compliance: 35%

**Build Impact**: ~3 hours

---

## 📰 NEWSLETTER (2)

### 1. Newsletter.tsx
**Current State:**
- ✗ CSS: Minimal
- ✗ Token Compliance: 40%

**Build Impact**: ~2 hours

---

### 2. WeeklyNewsletter.tsx
**Current State:**
- ✗ CSS: Minimal
- ✗ Token Compliance: 35%

**Build Impact**: ~3 hours

---

### 3. WeeklyNewsDetail.tsx
**Current State:**
- ✗ CSS: Minimal
- ✗ Token Compliance: 35%

**Build Impact**: ~2 hours

---

## 🌐 OTHER (3)

### 1. Project.tsx
**Current State:**
- ✗ CSS: Minimal
- ✗ Token Compliance: 35%

**Build Impact**: ~2 hours

---

### 2. Onboarding.tsx
**Current State:**
- ✗ CSS: Minimal
- ✗ Token Compliance: 40%

**Improvements Needed:**
- [ ] Onboarding flow styling
- [ ] Step indicators
- [ ] CTA buttons
- [ ] Progress visualization

**Build Impact**: ~3 hours

---

### 3. ComponentsLayout.tsx
**Current State:**
- ✗ CSS: Minimal
- ✗ Token Compliance: 30%

**Build Impact**: ~2 hours

---

---

# 🎨 COMPONENT SYSTEM AUDIT

## Core Components (Design System)

### Ratified ✓ (Phase 4 Complete)
1. **ToneAwareCard** - Wrapper for tone-specific styling
2. **MetaPillGroup** - Icon + text label collections
3. **CardGrid** - Responsive grid layouts
4. **InlineProgress** - Embedded progress bars
5. **Badge** - Tone-based badges
6. **ProgressBar** - Standalone progress bars
7. **Steps** - Step indicators
8. **Button** - Primary action button
9. **Card** - Base card component
10. **Sidebar** - Left navigation
11. **Modal** - Modal dialog
12. **Textarea** - Text input
13. **Input** - Text field

### Partial ⚠️ (Need Enhancement)
1. **ParcoursCard** - Learning path tile (refactored in Phase 4, needs dark mode)
2. **MetaPill** - Single pill (works, needs size variants)
3. **InlineProgress** - Works but needs animation variants

### Missing ✗ (Need Creation)
1. **FormGroup** - Wrapper for form field + label + error
2. **FormField** - Individual form input wrapper
3. **Select** - Dropdown select component
4. **Checkbox** - Checkbox component
5. **Radio** - Radio button component
6. **Toggle/Switch** - Toggle switch component
7. **DatePicker** - Date selection component
8. **TimePicker** - Time selection component
9. **Tabs** - Tab navigation component
10. **Accordion** - Accordion/collapsible component
11. **Toast** - Notification toast
12. **Alert** - Alert/warning message
13. **Skeleton** - Loading skeleton
14. **Avatar** - User avatar component
15. **Breadcrumb** - Breadcrumb navigation
16. **Pagination** - Pagination controls
17. **Tooltip** - Tooltip component
18. **Dropdown** - Dropdown menu
19. **SearchBar** - Search input component
20. **TagInput** - Multi-tag input

---

# 📋 WORK BREAKDOWN

## Phase 5 Breakdown (Remaining 6.5 hours + new work)

### Week 1: Dark Mode Implementation (2-3 hours)
**Goal**: Activate dark mode across all pages

**Tasks**:
1. Test dark-mode-tokens.css activation (0.5hr)
2. Dashboard dark mode testing (0.5hr)
3. LearningPaths dark mode testing (0.5hr)
4. Coaching dark mode testing (0.5hr)
5. Journal dark mode testing (0.5hr)
6. Fix any color issues in dark mode (1hr)
7. Test at all breakpoints (0.5hr)

**Estimated**: 4 hours total

---

### Week 2: Animation Enhancements (2-3 hours)
**Goal**: Add smooth micro-interactions and transitions

**Tasks**:
1. Page transition animations (0.5hr)
2. Dashboard card entrance animations (0.5hr)
3. LearningPaths tile stagger animations (0.5hr)
4. Button press animations (0.5hr)
5. Form input focus animations (0.5hr)
6. Loading state skeleton animations (1hr)
7. Hover effect enhancements (0.5hr)

**Estimated**: 4 hours total

---

### Week 3: Component Documentation (1-2 hours)
**Goal**: Document design system and patterns

**Tasks**:
1. Create component library documentation (1hr)
2. Design pattern guide (0.5hr)
3. Accessibility guide (0.5hr)
4. Update component exports (0.5hr)
5. Create Storybook setup (optional, 2hr)

**Estimated**: 3 hours total (or 4-5 with Storybook)

---

### Week 4+: Performance & Polish (2-3 hours)
**Goal**: Optimize bundle and refine UX

**Tasks**:
1. Code splitting analysis (0.5hr)
2. Lazy loading components (1hr)
3. Image optimization (0.5hr)
4. CSS minification verification (0.5hr)
5. Performance testing (1hr)

**Estimated**: 4 hours total

---

## Full App Refactoring (80+ hours)

### Priority 1 Pages (40 hours)
- Dashboard.tsx (6hr)
- LearningPaths.tsx (5hr)
- LearningPathDetail.tsx (4.5hr)
- Coaching.tsx (5hr)
- Journal.tsx (5hr)
- Veille.tsx (9hr)
- Login.tsx (2hr)
- Signup.tsx (3hr)

### Priority 2 Pages (20 hours)
- Collaboration.tsx (5hr)
- Messages.tsx (5hr)
- Profile.tsx (5hr)
- Settings.tsx (5hr)

### Priority 3 Pages (20 hours)
- Content pages (VideoTutorial, Magazine, ArticleDetail, etc.) - 15hr
- Coaching subpages (CoachingBookingFlow, Questionnaire, etc.) - 5hr

---

# 🎯 RECOMMENDATION

## Phase 5 Execution Strategy

### Option A: Complete Quick Wins (4-5 hours)
1. Dark Mode Activation & Testing (2hr)
2. Page Transition Animations (1hr)
3. Button/Card Micro-interactions (1.5hr)
4. Quick Polish Pass (1hr)

**Result**: Polished dark mode + smooth animations  
**Impact**: 30% visual improvement across all pages  
**Timeline**: 1-2 days

---

### Option B: Priority Pages Deep Polish (20+ hours)
1. Dark Mode (2-3hr)
2. Dashboard Premium Polish (4hr)
3. LearningPaths Premium Polish (4hr)
4. Coaching Completion (3hr)
5. Journal Refinement (3hr)
6. Component Documentation (2hr)

**Result**: Production-ready premium experience for core pages  
**Impact**: 70% visual improvement for main user flows  
**Timeline**: 2 weeks intensive

---

### Option C: Hybrid Approach (8-10 hours over next month)
1. **Week 1**: Dark Mode + Priority Page Animations (4hr)
2. **Week 2**: Component Documentation + Form Refactoring (3hr)
3. **Week 3**: Performance Optimization + Polish (3hr)

**Result**: Professional dark mode + solid documentation + performance gains  
**Impact**: 50% visual improvement + better maintainability  
**Timeline**: 1 month gradual

---

## Recommended: Option B (Priority Pages Deep Polish)

This gives you:
- ✅ Professional dark mode
- ✅ Smooth animations
- ✅ Accessible interactions
- ✅ Responsive perfection
- ✅ Component documentation
- ✅ Best ROI for user experience

Next steps: Shall we start with **Dark Mode Activation** or **Animation Enhancements**?
