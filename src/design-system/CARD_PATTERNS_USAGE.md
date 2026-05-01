# Card Patterns Usage Guide — The Learning Society

Analyse systématique des patterns de cards utilisés dans la Learning App, par page et contexte.

---

## 1. DASHBOARD — Patterns Actifs

### 1.1 Quick Action Cards (IconFeatureCard)
**Localisation**: Hero section quick actions grid (4 colonnes)
- **Composant**: `IconFeatureCard`
- **Layout**: Vertical centered icon + title + description
- **Icon**: 28px Lucide, colored (primary/warm/sun/info)
- **Content**: 
  - Title: "Coaching 1-to-1", "Parcours", "Journal", "Veille"
  - Description: Subtitle action ("Réserver une session", etc.)
- **Interaction**: Button wrapper, click → navigate
- **Variants**: Fixed styling, no state variants currently
- **Improvements**:
  - Add `enabled/disabled` state
  - Add `loading` state for async actions
  - Enhance hover animation (lift, shadow, color shift)

### 1.2 Prompt Cards (Custom card)
**Localisation**: Prompts section (3 colonnes)
- **Composant**: Custom `<article>` with `.dashboard-modern__prompt-card`
- **Layout**: Glass morphism container
  - Badge (info/warm/sun tone) top-left
  - Icon (34px centered, colored)
  - Question text (centered, italic)
- **Styling**:
  - Glass background: `backdrop-filter blur(24px)`
  - Border: `1px solid rgba(255, 255, 255, 0.9)`
  - Rounded: `r-2xl`
  - Padding: `s-6` to `s-8`
- **Interaction**: Keyboard navigable (role="button"), click → navigate
- **States**: Hover lift + shadow elevation
- **Improvements**:
  - Create reusable `GlassPromptCard` component
  - Add focus-visible outline
  - Standardize icon sizing

### 1.3 Progress Section (ProgressBar)
**Localisation**: "Maîtriser l'IA pour la Formation" section
- **Type**: Linear progress bar
- **Content**: Title + subtitle + ProgressBar + percentage label + Button
- **Styling**: White surface background, subtle border
- **Variant**: `interactive` (Card with hover effects)

---

## 2. LEARNING PATHS — Patterns Actifs

### 2.1 Parcours Grid Cards (Custom)
**Localisation**: Learning paths list, 3-column responsive grid
- **Composant**: Custom card per parcours
- **Layout**:
  - Glass header: Color-rotated (primary/warm/sun tones)
  - Icon (32px) + Title (h3) + Duration badge
  - Category + Description
  - Instructor name + Level badge
  - Progress bar (if in-progress)
  - Status badge + CTA button
- **Styling**:
  - Glass background: `var(--g-glass)` or gradient variants
  - Backdrop-filter: `blur(20px)`
  - Border: Tone-specific color
  - Border-radius: `r-2xl`
  - Padding: `s-6` to `s-8`
- **Tone Rotation**: Primary → Warm → Sun (cycling)
- **Interaction**: Hover lift (-4px) + shadow-md + border highlight
- **States**:
  - `in-progress`: Progress bar visible
  - `completed`: Checkmark indicator
  - `not-started`: Neutral styling, no progress
- **Improvements**:
  - Extract as reusable `ParcoursCardGlass` component
  - Add `featured` variant with larger icon
  - Add `locked` state styling
  - Standardize metadata layout

### 2.2 KPI Cards (Stats Display)
**Localisation**: Top KPI row (3 cards)
- **Type**: Simple stat display
- **Content**: `<strong>value</strong><span>label</span>`
- **Styling**: Minimal, horizontal layout
- **Improvements**: Use `StatCard` component for consistency

---

## 3. LEARNING PATH DETAIL — Patterns Actifs

### 3.1 Step Cards (Expandable)
**Localisation**: Left sidebar program section
- **Type**: Collapsible container
- **Layout**:
  - Header: Step number + title + duration
  - Toggle chevron (collapsed/expanded)
  - Lessons list (nested, indented)
  - Lesson items with checkbox + status
- **Styling**: Section card with border
- **States**:
  - `unlocked`: Full interactivity
  - `locked`: Greyed out, not-allowed cursor
  - `expanded/collapsed`: Chevron rotation
- **Improvements**:
  - Add visual lock indicator
  - Enhance expand/collapse animation
  - Add step completion percentage badge

### 3.2 Resource Cards (3-Column Grid)
**Localisation**: Complementary resources section
- **Composant**: Custom card
- **Layout**:
  - Icon container (gradient background)
  - Resource type label + title (h3)
  - Description + duration
  - CTA button
- **Tone Mapping**: Primary/Warm/Sun by resource type
- **Icon Sizes**: 32px in colored gradient container
- **Styling**: Surface background, bordered
- **Improvements**:
  - Create reusable `ResourceCard` component
  - Add `featured` variant
  - Standardize icon sizing across variants

### 3.3 Final Project Card
**Localisation**: Sidebar below progress
- **Type**: Centered card with call-to-action
- **Layout**:
  - Large icon (Target 32px)
  - Title (h3) + description
  - CTA button
- **States**:
  - `locked`: Lock icon overlay, disabled button
  - `unlocked`: Full interactivity
- **Improvements**:
  - Add `featured/highlighted` variant
  - Enhance locked state styling
  - Add completion badge

---

## 4. LEADERBOARD — Patterns Actifs

### 4.1 Ranking Entry Cards
**Localisation**: Leaderboard grid
- **Composant**: `Card` with class `tls-section-card`
- **Layout** (vertical stack):
  - Header row: Rank + Name (h3) + Points badge
  - Streak pill: Icon + "Streak X jours"
  - CTA button: "Voir profil"
- **Styling**:
  - Border: `1px solid rgba(255, 255, 255, 0.8)`
  - Background: Surface with subtle tint
  - Border-radius: `r-xl`
  - Padding: `s-6`
- **Badge Variants**:
  - Rank 1: `sun` (yellow)
  - Rank 2+: `neutral`
- **Interaction**: Hover effects (shadow lift)
- **Improvements**:
  - Add `rank-highlighted` variant for top 3
  - Add `medal/trophy` icon integration
  - Enhance visual hierarchy

### 4.2 Objective Card
**Localisation**: Weekly objective section
- **Type**: Information card
- **Layout**: Icon + Title (h3) + Description + Unlocked indicator (Sparkles)
- **Styling**: Section card with neutral background
- **Improvements**:
  - Add progress meter if applicable
  - Add featured variant option

---

## 5. JOURNAL — Patterns Actifs

### 5.1 Journal Entry Cards
**Localisation**: Entries list (stack)
- **Composant**: `Card` with class `tls-journal-card`
- **Layout** (vertical):
  - Header: Title (h3) + date meta (right-aligned)
  - Entry type badge (Reflexion/Coaching/etc.)
  - Excerpt (text preview)
  - Action buttons (secondary + ghost)
- **Styling**: Standard Card styling
- **Interaction**: Click → navigate to detail
- **Improvements**:
  - Add `featured` variant for pinned entries
  - Add `draft` state styling
  - Add category color indicator left border

---

## 6. PROFILE — Patterns Actifs

### 6.1 Profile Summary Card
**Localisation**: Top profile section
- **Composant**: `Card` with class `feature-page__profile-summary`
- **Layout**:
  - Header row: Name (h2) + Level badge (sun)
  - Info chips: Email, location, join date (with icons)
  - Bio text
- **Styling**: Gradient glass background
- **Improvements**:
  - Create reusable `ProfileCard` component
  - Add `featured` variant with larger hero area
  - Standardize chip styling

### 6.2 Skill Progress Cards (Grid)
**Localisation**: Skills section
- **Type**: Horizontal skill + progress bar
- **Layout**: Skill name + percentage value + progress bar
- **Styling**: Minimal, clean layout
- **Improvements**: Convert to use `SkillCard` component variant

---

## 7. VEILLE (Content Feed) — Patterns Actifs

### 7.1 Veille Content Cards
**Localisation**: Content feed grid
- **Composant**: Custom card (likely similar to CourseCard)
- **Layout**:
  - Header: Type icon (40px) + label + date + save button
  - Category label + Title (h3)
  - Summary text
  - Footer: Author + read time + "Lire" CTA
- **Styling**:
  - Glass: `backdrop-filter blur(20px)`, `rgba(255, 255, 255, 0.85)`
  - Border: Tone-specific color on hover
  - Shadow: `shadow-md`
- **Interaction**:
  - Hover: Lift (-3px) + shadow-md + border highlight
  - Bookmark toggle: Bookmark ↔ BookmarkCheck
- **Tone Variants**: Primary/Warm/Sun by content type
- **Improvements**:
  - Extract as reusable `VeilleCard` component
  - Add `featured` variant with larger image
  - Standardize hover interactions

---

## 8. COURSE DETAIL — Patterns Actifs

### 8.1 KPI Cards (Metric Display)
**Localisation**: KPI row
- **Composant**: `Card` with class `tls-kpi-card`
- **Layout**:
  - Label (micro uppercase)
  - Value (large number, h3 size)
  - Meta description
- **Styling**: Simple bordered card
- **Improvements**: Use `StatCard` for consistency

### 8.2 Section Cards (Info Blocks)
**Localisation**: Objectives, progression sidebar, etc.
- **Composant**: `Card` with class `tls-section-card`
- **Layout**: Title (h3) + icon + content (list or text)
- **Styling**: Standard Card styling
- **Improvements**: Add `highlighted` variant for current section

---

## 9. COACHING — Patterns Actifs

### 9.1 Session Cards
- **Type**: TBD based on page implementation
- **Expected Layout**: Datetime + coach name + topic + booking button
- **Improvements**:
  - Create `SessionCard` component
  - Add `available/booked/past` states
  - Add coach avatar + rating

---

## 10. COLLABORATION — Patterns Actifs

### 10.1 Discussion/Thread Cards
- **Type**: TBD based on page implementation
- **Expected Layout**: Author + timestamp + preview + reply count
- **Improvements**:
  - Create `ThreadCard` component
  - Add `unread` state styling
  - Add pinned indicator

---

## Summary: Recurring Patterns

### Content Patterns
1. **Icon + Title + Description** (ActionCard, IconFeatureCard, QuickAction)
2. **Header + Metadata + Progress** (Parcours cards, Step cards)
3. **Title + Stat Value + Delta** (KPI cards, StatCard)
4. **Author + Timestamp + Content Preview** (Journal, Veille, Discussion)
5. **Horizontal Metadata Row** (Leaderboard ranks, Profile chips)
6. **Glass Container with Badge** (Prompt cards, Resource cards)

### Styling Patterns
1. **Glass Morphism**: Blur (20-24px) + semi-transparent background + border
2. **Gradient Headers**: Tone-rotated (primary/warm/sun) backgrounds
3. **Icon Containers**: Gradient backgrounds with colored icons (28-40px)
4. **Hover Effects**: Lift (-2 to -4px) + shadow-sm to shadow-md + border highlight
5. **Tone Rotation**: Cycling primary → warm → sun across grids
6. **Status Badges**: Corner/inline badges with variant colors

### State Patterns
1. **Locked/Disabled**: Greyed out + opacity 0.6 + not-allowed cursor
2. **Completed**: Checkmark indicator + maybe different background
3. **In-Progress**: Progress bar visible + partial highlighting
4. **Interactive/Hover**: Lift + shadow-md + border highlight + color shift
5. **Selected/Active**: Border highlight + background tint

---

## Proposed Component Hierarchy

```
Card (base)
├── Card (4 variants: default, feature, interactive, glass)
├── StatCard (metrics)
├── ProfileCard (user profile)
├── SessionCard (booking/coaching)
├── ThreadCard (collaboration)
└── Specialized Cards:
    ├── ActionCard (quick actions)
    ├── IconFeatureCard (features)
    ├── ParcoursCard (learning paths)
    ├── ResourceCard (complementary content)
    ├── VeilleCard (content feed)
    ├── JournalCard (journal entries)
    ├── RankingCard (leaderboard)
    └── PromptCard (reflection prompts)
```

---

## Next Steps

1. ✓ Map existing patterns
2. → Add missing variants to base Card component
3. → Extract specialized cards as composable components
4. → Introduce premium variants (glass-elevated, featured, etc.)
5. → Standardize icon sizing and gradient containers
6. → Create interactive state library
7. → Document animations and transitions
