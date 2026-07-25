# App Inspiration Research — Learning App + Mobile

## 🎯 Parallel Research Strategy

While enriching the **site marketing** (Direction C), also research **Learning App** product UX/UI patterns. 

**Why parallel?**
- Components discovered on both paths → reusable library (Button, Card, Badge scale across site + app)
- Motion patterns → shared micro-interaction spec
- Typography + spacing → consistent design system
- Learning App screens will be in Figma Phase 2B too (mockups for reference)

**Split your research 60/40:**
- **60%** → Site enrichment (Direction C locked brief)
- **40%** → App inspiration (product patterns, onboarding, coaching flows, data visualization)

---

## 📱 Learning App Product Context

From project memory:

| Aspect | Details |
|--------|---------|
| **What it is** | Learning platform with courses, coaching, journaling, badge/credential system |
| **Users** | Professionals upskilling (Skills-Based workforce) |
| **Platforms** | Web (primary) + mobile-responsive (iOS/Android future) |
| **Pedagogy** | EDRACT framework (Engagement, Design, Research, Action, Coaching, Transformation) + Learn→Do→Match flow |
| **Key screens** | Dashboard, Course/Lesson player, Coaching chat, Journal, Veille (curated content), Badge/Passeport system, Profile |
| **Tone** | Professional but warm, expert-to-expert, non-gamified (≠ Duolingo), premium |

**Design system:** Reuses TLS (colors, typography, components) but with product-specific patterns.

---

## 🔍 Research Categories (App)

### 1. Onboarding & Sign-Up Flows
**What to find:** Seamless, fast, non-intrusive onboarding. No 5-screen carousel required.

**Inspiration sources:**
- **Mobbin** → Filter: `Onboarding`, Industry = `Productivity`, `HR`, `Learning`
  - **Sana**, **Maven**, **Reforge**, **Linear**, **Stripe** (minimal signup)
  - **Duolingo** (anti-pattern: too playful for B2B, but good UX speed)
- **Dribbble** → Search: `onboarding B2B`, `signup flow`, `auth minimal`

**What to extract:**
- [ ] Fast signup (1-3 fields max)
- [ ] Progress indicator (visual, not intrusive)
- [ ] Error states (inline, clear, helpful)
- [ ] Welcome screen (warm, contextual, not generic)
- [ ] Permission requests (camera, mic for future coaching video)

---

### 2. Lesson / Course Player
**What to find:** Clean, focused lesson interface. Content-first, minimal chrome.

**Inspiration sources:**
- **Mobbin** → `Course`, `Learning`, `Video player`
  - **Maven** (learning platform, clean UI)
  - **Skillshare** (video player + progress)
  - **MasterClass** (premium feel, video focus)
  - **Brilliant** (interactive lessons, step-by-step)
- **Dribbble** → `lesson player`, `course UI`, `video interface`

**What to extract:**
- [ ] Video player (custom controls, minimal)
- [ ] Progress bar (visual, satisfying)
- [ ] Lesson navigation (prev/next, outline sidebar)
- [ ] Text overlay on video (readable, not distracting)
- [ ] Call-to-action buttons (Next lesson, Start practice, Complete)
- [ ] Sidebar outline (lessons, topics, duration)
- [ ] Auto-advance option (pause after each lesson)

---

### 3. Coaching & Chat Interface
**What to find:** Conversational, human-centered. Not a chatbot feel; real coaching.

**Inspiration sources:**
- **Mobbin** → `Chat`, `Messaging`, `Coaching`, `AI assistant`
  - **Slack** (message interface, simple)
  - **Linear** (comment threads, context-aware)
  - **Intercom** (customer support chat, warm tone)
  - **Character.ai** (conversational flow, but not the cuteness)
- **Dribbble** → `coaching chat`, `messaging UI`, `conversation interface`

**What to extract:**
- [ ] Message bubbles (user left, coach right, clear distinction)
- [ ] Timestamp grouping (smart, not every message)
- [ ] Typing indicator (subtle, reassuring)
- [ ] Action cards (buttons, links, resources inline)
- [ ] Tone indicator (coaching tone, not robotic)
- [ ] Notification badge (new message, unread count)
- [ ] Input field (rich text, emoji support, attachment option)
- [ ] Message search (find past coaching moments)

---

### 4. Journal & Reflection Interface
**What to find:** Calm, reflective, personal. Encourage introspection without pressure.

**Inspiration sources:**
- **Mobbin** → `Journal`, `Notes`, `Diary`, `Reflection`
  - **Day One** (journaling app, minimal, warm)
  - **Notion** (flexible note-taking, calming)
  - **Reflectly** (mood tracking + journaling, clean)
  - **Lex** (writing, distraction-free)
- **Dribbble** → `journal UI`, `notes app`, `reflection interface`

**What to extract:**
- [ ] Blank canvas (minimalist, inviting)
- [ ] Date selector (calendar, or "Today" shortcut)
- [ ] Rich text editor (formatting toolbar, hidden by default)
- [ ] Mood/energy selector (optional, visual)
- [ ] Prompt suggestions (optional, not required)
- [ ] Save indicator (auto-save, silent)
- [ ] Previous entries navigation (timeline or list)
- [ ] Privacy indicator (personal, not shareable by default)

---

### 5. Veille & Content Curation
**What to find:** Feed-like, scannable, discovery-focused. Not social (no likes/shares), but engaging.

**Inspiration sources:**
- **Mobbin** → `Feed`, `News`, `Content`, `Magazine`
  - **Pocket** (read-later, curated)
  - **Feedly** (RSS feed, smart)
  - **The Browser** (curated links, editorial)
  - **Substack** (newsletter format, clean)
- **Dribbble** → `feed design`, `content card`, `article list`

**What to extract:**
- [ ] Content card (image/thumbnail, title, summary, source)
- [ ] Category pill (topic, color-coded)
- [ ] Read time indicator (estimated, useful)
- [ ] Author / source badge (credibility)
- [ ] Save button (bookmark, read-later)
- [ ] Filter/sort (by topic, date, source)
- [ ] Load more (infinite scroll or pagination)
- [ ] Share option (careful — maybe not public sharing, internal only)

---

### 6. Badge & Credential System (Passeport)
**What to find:** Achievement display that feels premium, not gamified. Visual, celebratory, but professional.

**Inspiration sources:**
- **Mobbin** → `Badge`, `Achievement`, `Certificate`, `Credential`
  - **Credly** (credential display, professional)
  - **Coursera** (certificate, shareable)
  - **LinkedIn Learning** (skill badge)
  - **GitHub** (achievements, simple visual)
- **Dribbble** → `badge design`, `achievement card`, `credential display`

**What to extract:**
- [ ] Badge visual (icon, color, animated reveal on earn)
- [ ] Badge detail card (name, description, earned date, shareable link)
- [ ] Skill progression (level, mastery %, visual bar)
- [ ] Certificate PDF (downloadable, shareable, official look)
- [ ] Credential verification (link, QR code, public profile)
- [ ] Collection display (grid, filterable, sortable)
- [ ] Share button (LinkedIn, email, social — but optional)

---

### 7. Dashboard & Progress Overview
**What to find:** At-a-glance status. Data visualization that's clear, not overwhelming.

**Inspiration sources:**
- **Mobbin** → `Dashboard`, `Analytics`, `Progress`
  - **Linear** (team dashboard, minimal chrome)
  - **Notion** (dashboard widgets, customizable)
  - **Figma** (team projects overview)
  - **Stripe** (metrics dashboard, actionable)
- **Dribbble** → `dashboard design`, `progress visualization`, `analytics card`

**What to extract:**
- [ ] Key metrics cards (stat number, label, trend indicator)
- [ ] Progress visualization (pie chart, progress bar, skill radii)
- [ ] Recent activity list (courses completed, coaching notes, badges earned)
- [ ] Next steps card (what to do now, CTA)
- [ ] Timeline view (achievements over time)
- [ ] Filter/sort (by topic, date range, type)
- [ ] Export option (PDF report, shareable summary)

---

### 8. Forms & Data Entry
**What to find:** Mobile-friendly, accessible. Fast to fill, clear validation, error handling.

**Inspiration sources:**
- **Mobbin** → `Forms`, `Input`, `Survey`, `Quiz`
  - **Typeform** (form design, engaging)
  - **Qualtrics** (survey, clean)
  - **Airtable** (form views, organized)
- **Dribbble** → `form design`, `input field`, `form validation`

**What to extract:**
- [ ] Input field states (default, focus, filled, error, disabled)
- [ ] Field labels (above input, not placeholder)
- [ ] Helper text (hint, character count, example)
- [ ] Validation feedback (inline, not delayed)
- [ ] Button state (default, hover, loading, disabled, success)
- [ ] Error message (clear, constructive, red/error color)
- [ ] Multi-step form (progress indicator, save draft)
- [ ] Responsive (mobile-first stacking)

---

### 9. Mobile-Specific Patterns
**What to find:** Touch-friendly, thumb-accessible, performance-optimized.

**Inspiration sources:**
- **Mobbin** (iOS/Android-specific sections)
  - **iOS apps** → `Productivity`, `Education`, `Health`
    - Slack iOS, Notion iOS, Day One iOS (smooth, native-feeling)
  - **Android apps** → Material Design 3 patterns
    - Google Tasks, Keep, Fit (Material 3 examples)
- **Dribbble** → `iOS design`, `Android UI`, `mobile app`

**What to extract:**
- [ ] Navigation (bottom tab bar, hamburger drawer, floating action button)
- [ ] Touch targets (min 44px height for tap)
- [ ] Scroll behavior (momentum scroll, snap-to-top)
- [ ] Gesture support (swipe, long-press, pull-to-refresh)
- [ ] Safe area handling (notch, home indicator, status bar)
- [ ] Loading states (skeleton screens, blur, shimmer)
- [ ] Empty states (helpful, not sad)
- [ ] Keyboard integration (avoid blocking input, proper return key)

---

### 10. Micro-Interactions & Animation
**What to find:** Smooth, purposeful. Celebrate moments without being flashy.

**Inspiration sources:**
- **Framer** (interactive components, smooth animations)
  - Visit Framer templates: `Onboarding`, `Form`, `Dashboard`
- **Dribbble** → `micro-interaction`, `animation`, `motion design`
- **YouTube** → "iOS animation", "smooth app transition" (watch real device videos)

**What to extract:**
- [ ] Page transition (fade, slide, scale, no hard cut)
- [ ] Button press feedback (scale 0.98, ripple, glow)
- [ ] Form field focus (border color, background lift, ring glow)
- [ ] Scroll reveal (fade-in + Y-translate as items enter viewport)
- [ ] Loading animation (progress bar, skeleton pulse, shimmer)
- [ ] Success celebration (badge pop, confetti optional, sound optional)
- [ ] Swipe navigation (smooth, momentum-based)
- [ ] Gesture feedback (haptic, visual, sound if enabled)

---

## 🎨 Component Overlap (Site → App)

Many components are **shared** between site and Learning App. Track these:

| Component | Site (Marketing) | App (Product) | Shared Variant? |
|-----------|-----------------|---------------|-----------------|
| **Button** | Primary, Secondary, Warm, Ghost, Glass | Primary, Secondary, Outline, Floating (FAB) | Yes — size/state variants |
| **Card** | Offer card, Service card, Article card | Lesson card, Content card, Achievement card | Yes — layout varies, base shared |
| **Badge / Pill** | Feature badge, Category badge, Trust badge | Skill badge, Topic filter, Status badge | Yes — color/size variants |
| **Input** | Newsletter signup | Form fields, Search | Yes — focus state, validation shared |
| **Modal / Dialog** | CTA modal, Info dialog | Lesson completion, Badge detail, Confirmation | Yes — animation, backdrop shared |
| **Tabs** | Feature tabs | Course navigation, Filter options | Yes — active state, animation |
| **Progress Indicator** | Section progress | Lesson progress, Course progress, Skill level | Yes — linear + radial variants |
| **Tooltip** | Hover info | Help text, Badge detail, Keyboard shortcut hint | Yes — positioning, timing |
| **Empty State** | (site doesn't have much) | No courses, No journal, No results | New — extract pattern |
| **Loading State** | (site is static) | Lesson loading, Chat thinking, Data fetch | New — extract pattern |

**Shared design system** = TLS tokens (colors, spacing, typography) + unified component library.

---

## 📊 Moodboard Expansion (App Section)

Add these to your **Figma Moodboard** (new sections, or subsections within existing):

| Section | What to Paste |
|---------|---------------|
| 🦸 Hero Patterns | (marketing only) |
| 💎 Card & Glass | Lesson cards, Content cards (add to existing) |
| 🔘 Button States | Mobile FAB, Loading button state (add to existing) |
| 📝 Typography | Font sizes for mobile, readable line-height (add to existing) |
| 🎭 Color Palettes | (same palette, reused) |
| ⭐ Icon Systems | (same icons, reused) |
| **✨ Mobile Interactions** | **NEW** — Swipe, scroll, gesture feedback |
| 📐 Layout Patterns | Mobile navigation, bottom sheet, slide-over panels |
| 📋 Form & Inputs | Mobile input, mobile keyboard, validation (add to existing) |
| 🌊 Surfaces & Textures | (same background approach, reused) |
| **🎓 Coaching Flow** | **NEW** — Chat interface, message patterns, typing indicator |
| **📖 Journal Interface** | **NEW** — Blank canvas, reflection prompts, calendar |
| **🏆 Achievement System** | **NEW** — Badge earn animation, credential display |
| **📺 Lesson Player** | **NEW** — Video interface, progress, controls |

---

## 🚀 App Research Workflow (Parallel to Site Enrichment)

### Week 1 (Concurrent with Site)
- **2 hours/day** → Research app patterns
  - Day 1–2: Mobbin onboarding flows + signup
  - Day 3–4: Lesson player + course UI
  - Day 5: Chat/coaching interface

### Week 2 (Concurrent with Site)
- **2 hours/day** → App research continues
  - Day 1–2: Journal + reflection
  - Day 3–4: Veille/content feed
  - Day 5: Badge/credential system

### Week 3 (Concurrent with Site)
- **1.5 hours/day** → Final patterns
  - Day 1: Dashboard + progress
  - Day 2: Mobile nav patterns
  - Day 3: Micro-interactions
  - Day 4–5: Component overlap mapping

---

## 🔗 Key Inspiration Sources

### **Mobbin** (Primary for App Research)
- **Best for:** Real app screenshots, interaction flows, state transitions
- **Strategy:** Open `/sections` tab first (fast thumbnails)
- **Search terms:** Onboarding, Learning, Course, Chat, Journal, Dashboard, Progress, Form, Accessibility

**Relevant apps on Mobbin:**
- **Maven** (learning platform, premium feel, clean)
- **Sana** (learning + coaching, modern)
- **Reforge** (skill-building platform, minimal)
- **Brilliant** (interactive lessons, great UX)
- **Skillshare** (video course platform)
- **Slack** (messaging, navigation patterns)
- **Linear** (team collaboration, clean UI)
- **Day One** (journaling, calm design)
- **Pocket** (content curation, feed)
- **Credly** (credential display)

### **Dribbble** (Inspiration + Polish)
- **Best for:** Component design, animation concepts, art direction
- **Search terms:** `onboarding B2B`, `coaching chat`, `lesson player`, `journal UI`, `mobile animation`

### **Framer** (Interaction Prototype)
- **Best for:** Smooth animations, micro-interactions, component interactions
- **Search:** Framer templates for Onboarding, Forms, Chat, Dashboard

### **Design Systems** (Reference)
- **Linear Design System** (typography, spacing, component states)
- **Stripe Design System** (forms, validation, data tables)
- **Material Design 3** (Android baseline, accessibility)
- **Human Interface Guidelines** (iOS baseline, gestures)

---

## ✅ Quality Gate for App Research

For each inspiration found, ask:

- [ ] Is it **B2B professional** (not consumer gamified)?
- [ ] Does it serve **learning/coaching/reflection** use case?
- [ ] Can the **component be extracted** and reused?
- [ ] Does it align with **TLS brand** (warm, clear, augmented)?
- [ ] Is it **mobile-responsive** or mobile-native?
- [ ] Does it have **smooth motion** without being flashy?

If 5+ ✅ → Save to Moodboard. If not → Keep scrolling.

---

## 📌 App Inspiration Checklist

Track what you've researched:

| Category | Refs Collected | Components Found | Notes |
|----------|---|---|---|
| Onboarding | — | Signup form, Progress indicator, Welcome screen | |
| Lesson Player | — | Video player, Progress bar, Navigation | |
| Coaching Chat | — | Message bubbles, Input field, Typing indicator | |
| Journal | — | Text editor, Date picker, Calendar | |
| Veille/Feed | — | Content card, Filter pills, Load more | |
| Badge/Credential | — | Badge visual, Detail card, Certificate | |
| Dashboard | — | Stat cards, Progress visualization, Timeline | |
| Forms | — | Input states, Validation, Multi-step | |
| Mobile Nav | — | Bottom tab bar, FAB, Drawer | |
| Animations | — | Page transition, Button feedback, Scroll reveal | |

---

## 🎯 Deliverable (Phase 2B End)

By end of Week 3, you should have:
- ✅ **Site enriched** (6 screens, Direction C aesthetic)
- ✅ **App inspirations collected** (Moodboard expanded)
- ✅ **Component overlap mapped** (shared + unique components identified)
- ✅ **Mobile patterns extracted** (navigation, gestures, responsive)
- ✅ **Micro-interaction specs** (animation easing, duration, timing)

This feeds into **Phase 3B:** Build all components (shared library) + Phase 3C: Apply to Learning App screens.

---

## 📚 Links

- **Site Enrichment** → [ENRICHMENT-TO-DIRECTION-C.md](ENRICHMENT-TO-DIRECTION-C.md)
- **App Context** → Reference `project_learning_app_bootcamp.md` in project memory
- **Component Tracking** → [COMPONENT-EXTRACTION-CHECKLIST.md](COMPONENT-EXTRACTION-CHECKLIST.md) (expand for app-specific)
- **Figma Moodboard** → https://figma.com/design/LccBZ1GKWQVwVzPtsSzk5Y (expand sections as you research)
