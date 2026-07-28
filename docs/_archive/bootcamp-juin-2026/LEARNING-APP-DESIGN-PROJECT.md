# Learning App Design Project — MVP Specs

> **What to build** : 8–10 core screens for authenticated Learning App  
> **Timeline** : 6 weeks (WEEK 1–6, by July 31)  
> **Design approach** : Mobile-first, design-system-driven, accessibility-first  
> **Launch readiness** : WCAG AA + responsive + 60fps

---

## 📋 Core Screens (Priority Order)

### MVP Tier 1 (MUST HAVE)
1. **Dashboard** — learner home, quick stats, next action
2. **Passeport Dreyfus** — competence tracking (grid)
3. **Lesson Player** — consume learning content
4. **Coaching Request** — book 1-1 coaching session
5. **Profile/Settings** — account + preferences

### MVP Tier 2 (SHOULD HAVE)
6. **Journal** — reflection + AI feedback
7. **Veille** — curated content feed
8. **Leaderboard/Gamification** — stats, badges, achievements
9. **Onboarding** — signup → assessment → first lesson
10. **Modals/Forms** — feedback, invite, search, confirm

---

## 🎨 SCREEN SPECS (High-Fidelity)

### 1. DASHBOARD

**Purpose** : Learner home. Show progress, quick stats, next action.

**Layout (Desktop 1440px)**
```
┌─────────────────────────────────────────────────────┐
│  Header (sticky)                                    │
│  ├─ Logo  │ Nav │ Notifications │ User Menu         │
└─────────────────────────────────────────────────────┘
┌─────────────────────────────────────────────────────┐
│  Hero welcome (greeting + avatar)                   │
│  "Bonjour, Chloé! 👋 Bienvenue dans ta Learning App"
│                                                     │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐          │
│  │ 87% done │  │ 12 badges│  │ 2h spent │  [CTA]   │
│  └──────────┘  └──────────┘  └──────────┘          │
└─────────────────────────────────────────────────────┘
┌─────────────────────────────────────────────────────┐
│  Learning path (horizontal scroll or timeline)      │
│  [Lesson 1 ✓] [Lesson 2 ✓] [Lesson 3 🔴] [...]     │
│                          ^ current                  │
└─────────────────────────────────────────────────────┘
┌─────────────────────────────────────────────────────┐
│  Section: "Continuer" (resume last lesson)          │
│  ┌────────────────────────────────────────────────┐ │
│  │ [Thumbnail] Formation STRIDE — Lesson 3 of 6  │ │
│  │ Progress: ████░░░░░░ 40%                       │ │
│  │ [CTA: Continue] [More info]                    │ │
│  └────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────┘
┌─────────────────────────────────────────────────────┐
│  Section: "Activités recommandées"                  │
│  [Card] [Card] [Card]                               │
│  ├─ Next lesson                                     │
│  ├─ Coaching available                              │
│  └─ New content in Veille                           │
└─────────────────────────────────────────────────────┘
```

**Mobile (375px)**
```
┌──────────────┐
│ Logo  🔔 👤  │
├──────────────┤
│ Hero welcome │
│ ┌──────────┐ │
│ │ 87% done │ │
│ │ 12 badge │ │
│ │ 2h spent │ │
│ └──────────┘ │
├──────────────┤
│ Learning path│
│ (scroll h)   │
├──────────────┤
│ Continue     │
│ [lesson card]│
├──────────────┤
│ Recommend    │
│ [card]       │
│ [card]       │
│ [card]       │
└──────────────┘
```

**Components used** :
- Header (sticky)
- DashboardCard (stat cards × 3)
- ProgressBar (learning path)
- LessonCard (featured + recommended)
- Button (primary CTA: "Continue")

**States** :
- Loading (skeleton cards)
- Empty (no lessons started → show onboarding CTA)
- Error (failed to load data → retry CTA)
- Success (lessons loaded, stats visible)

---

### 2. PASSEPORT DREYFUS (Competence Grid)

**Purpose** : Track competence progression via Dreyfus model (Novice → Expert).

**Layout (Desktop)**
```
┌─────────────────────────────────────────────────────┐
│  Header                                             │
│  "Passeport de compétences"                         │
│  Filter: [All] [In Progress] [Mastered]             │
└─────────────────────────────────────────────────────┘
┌─────────────────────────────────────────────────────┐
│  Legend (top):                                      │
│  🔴 Novice | 🟡 Advanced Beginner | 🟢 Competent   │
│  🟦 Proficient | 🟪 Expert                          │
└─────────────────────────────────────────────────────┘
┌─────────────────────────────────────────────────────┐
│  Grid (3 columns, 5 rows = 15 competences):         │
│                                                     │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────┐  │
│  │ Competence 1 │  │ Competence 2 │  │ Competence│ │
│  │ 🟦 Proficient│  │ 🟡 Adv Begin │  │ 3        │  │
│  │ 4/5 modules  │  │ 2/5 modules  │  │ 🔴 Novice│  │
│  │ [Unlock next]│  │ [Continue]   │  │ 0/5     │   │
│  └──────────────┘  └──────────────┘  └──────────┘  │
│                                                     │
│  [... 4 more rows ...]                              │
│                                                     │
└─────────────────────────────────────────────────────┘
┌─────────────────────────────────────────────────────┐
│  Detail panel (click cell to expand):               │
│  Competence name, description, lessons, progress    │
└─────────────────────────────────────────────────────┘
```

**Mobile (375px)**
```
┌────────────────┐
│ Passeport      │
│ [All] [In Prog]│
├────────────────┤
│ Legend         │
│ (horizontal)   │
├────────────────┤
│ Grid (1 col):  │
│ ┌────────────┐ │
│ │Comp 1      │ │
│ │🟦 Prof     │ │
│ │4/5 modules │ │
│ └────────────┘ │
│ ┌────────────┐ │
│ │Comp 2      │ │
│ │🟡 Adv Beg  │ │
│ │2/5 modules │ │
│ └────────────┘ │
│ [... more ...]  │
└────────────────┘
```

**Components used** :
- Filter chips (all/in-progress/mastered)
- PasseportCell (competence name + level + progress)
- PasseportGrid (responsive 3-col desktop, 1-col mobile)
- DetailPanel (expand on click)
- ProgressBar (% complete)

**Interactions** :
- Click cell → expand detail
- Click "Continue" → go to lesson
- Scroll grid (mobile: vertical, desktop: grid)

**Color coding** (Dreyfus):
```
🔴 Novice:            #EF4444 (red)
🟡 Advanced Beginner: #F59E0B (amber)
🟢 Competent:         #10B981 (emerald)
🟦 Proficient:        #3B82F6 (blue)
🟪 Expert:            #8B5CF6 (purple)
```

---

### 3. LESSON PLAYER

**Purpose** : Primary learning interface. Consume video/text, take notes, quiz.

**Layout (Desktop)**
```
┌─────────────────────────────────────────────────────┐
│  Header (sticky)                                    │
│  [Back] Lesson 3: "Intégration IA" | 40% | Close   │
└─────────────────────────────────────────────────────┘
┌──────────────────────────────────────┬──────────────┐
│  Main content (2/3 width)            │  Sidebar     │
│  ┌────────────────────────────────┐  │  (1/3 width) │
│  │                                │  │              │
│  │  [Video player 16:9]           │  │ Objectives   │
│  │  Duration: 6m 30s              │  │ ✓ Objective 1│
│  │                                │  │ ○ Objective 2│
│  │ Progress: ███████░░░░░░ 40%    │  │ ○ Objective 3│
│  │                                │  │              │
│  └────────────────────────────────┘  │ Resources    │
│                                       │ [PDF]        │
│  Content below video:                 │ [Slides]     │
│  ┌────────────────────────────────┐  │ [Quiz]       │
│  │ Transcript / Key points        │  │              │
│  │ ┌──────────────────────────────┤  │ Discussion   │
│  │ │ Click to highlight, take     │  │ (3 comments) │
│  │ │ notes                         │  │ + Add reply  │
│  │ └──────────────────────────────┤  │              │
│  └────────────────────────────────┘  │              │
│                                       │              │
│  Reflection prompt:                   │              │
│  "Key insight from this lesson?"      │              │
│  [Textarea]                           │              │
│  [Save] [Draft auto-saves]            │              │
└──────────────────────────────────────┴──────────────┘
┌─────────────────────────────────────────────────────┐
│  Bottom nav (sticky)                                │
│  [< Prev: Lesson 2] [Next: Lesson 4 >] [Quiz] [Done]
└─────────────────────────────────────────────────────┘
```

**Mobile (375px)**
```
┌────────────────┐
│[Back]Lesson 3 ✕│
├────────────────┤
│ [Video 16:9]   │
│                │
│ Progress: ██░  │
├────────────────┤
│ Objectives     │
│ ✓ Obj 1        │
│ ○ Obj 2        │
│ ○ Obj 3        │
├────────────────┤
│ Resources      │
│ [PDF] [Slides] │
├────────────────┤
│ Transcript     │
│ [collapsible]  │
├────────────────┤
│ Your insight?  │
│ [Textarea]     │
│ [Save]         │
├────────────────┤
│ < Prev │ Next >│
│ [ Quiz ]       │
└────────────────┘
```

**Components used** :
- VideoPlayer (custom or embed)
- ProgressBar (lesson progress)
- Tabs (objectives / transcript / discussion)
- Textarea (reflection)
- Button nav (prev/next/quiz)

**Interactions** :
- Video controls (play/pause, speed, fullscreen)
- Highlight text → add to notes
- Textarea auto-save to local storage
- Quiz modal on "Quiz" button
- Navigation between lessons

---

### 4. COACHING REQUEST FORM

**Purpose** : Book 1-1 coaching session.

**Layout (Desktop Modal)**
```
┌─────────────────────────────────┐
│ Request Coaching       [×]       │
├─────────────────────────────────┤
│                                 │
│ Step 1 of 3: Topic             │
│                                 │
│ What would you like coaching?  │
│ [Textarea] (required)          │
│                                 │
│ Select competence:             │
│ ○ Competence 1                 │
│ ○ Competence 2                 │
│ ● Competence 3                 │
│                                 │
│ [Cancel]        [Next >]        │
└─────────────────────────────────┘
```

**Step 2: Select Coach**
```
┌─────────────────────────────────┐
│ Request Coaching       [×]       │
├─────────────────────────────────┤
│ Step 2 of 3: Coach             │
│                                 │
│ Choose your coach:             │
│ ┌──────────────┐               │
│ │ [Avatar] Coach 1             │
│ │ Bio: ...                     │
│ │ Specialty: Competence 3      │
│ │ Available: Mon, Wed          │
│ │ Rating: ⭐⭐⭐⭐⭐ (15)          │
│ │ [Select]                     │
│ └──────────────┘               │
│ ┌──────────────┐               │
│ │ [Avatar] Coach 2             │
│ │ ...                          │
│ └──────────────┘               │
│                                 │
│ [< Back]        [Next >]        │
└─────────────────────────────────┘
```

**Step 3: Confirm**
```
┌─────────────────────────────────┐
│ Request Coaching       [×]       │
├─────────────────────────────────┤
│ Step 3 of 3: Confirm           │
│                                 │
│ Topic: "Intégration IA..."     │
│ Coach: Coach 1 (Available)     │
│ Duration: 30 min               │
│ Cost: Free (included)          │
│                                 │
│ Preferred times:               │
│ ☐ Mon 10:00 AM - 12:00 PM     │
│ ☑ Wed 2:00 PM - 4:00 PM       │
│ ☐ Fri 9:00 AM - 11:00 AM      │
│                                 │
│ [Cancel]        [Confirm]       │
└─────────────────────────────────┘
```

**Success state**
```
┌─────────────────────────────────┐
│ Coaching Requested! ✓           │
├─────────────────────────────────┤
│                                 │
│ 🎉 Your request is sent!       │
│                                 │
│ Next: Wait for coach to confirm │
│ (usually within 24h)           │
│                                 │
│ Coach will contact you at      │
│ your@email.com                 │
│                                 │
│ [Add to Calendar]              │
│ [View Booking] [Done]          │
└─────────────────────────────────┘
```

**Components used** :
- MultiStepForm (Step 1/2/3 progress)
- Textarea (topic)
- RadioGroup (competence, coach, time)
- Checkbox (preferred times)
- SuccessModal
- Button (cancel/next/confirm)

---

### 5. JOURNAL REFLECTION

**Layout (Desktop)**
```
┌─────────────────────────────────┐
│ Mon Journal                     │
├─────────────────────────────────┤
│ Date: [Calendar picker ▼]       │
│ [This week] [Last week] [All]   │
├─────────────────────────────────┤
│ Recent entries (left sidebar):  │
│ ┌─────────────────────────┐    │
│ │ [Date] Reflection 1     │    │
│ │ [Date] Reflection 2 ◄───┼────┤← Current
│ │ [Date] Reflection 3     │    │
│ └─────────────────────────┘    │
├────────────────────────────────────┐
│ Today's reflection (right side)    │
│                                    │
│ "What was your key insight?"      │
│                                    │
│ [Textarea - 3 lines min]          │
│ "Today I learned how to..."       │
│                                    │
│ Competences (tag):                │
│ [Competence 1] [Competence 2]     │
│ + Add competence                  │
│                                    │
│ How are you feeling?              │
│ [😀] [😐] [😢] [🔥]               │
│                                    │
│ AI Feedback Panel (collapsible):  │
│ ────────────────────────────      │
│ "Great reflection! You highlighted│
│ the challenge of stakeholder buy- │
│ in. Next time, consider..."       │
│                                    │
│ [Save] [Share]  [Archive]         │
└────────────────────────────────────┘
```

**Components used** :
- DatePicker
- Textarea
- CompetenceTag (autocomplete)
- EmojiSelector (mood)
- AiFeedbackPanel (collapsible)
- Button (save/share/archive)

---

## 🎨 Design System Usage

### Colors (Direction C + Learning App specific)
```
Primary (Teal):        #55A1B4
Secondary (Orange):    #ED843A
Accent (Gold):         #F8B044

Success:               #10B981 (emerald, checkmarks)
Warning:               #F59E0B (amber, alerts)
Danger:                #EF4444 (red, errors)
Info:                  #3B82F6 (blue, notifications)

Neutral:
- Background:          #FAFAFA
- Surface:             #FFFFFF
- Border:              #E5E7EB
- Text primary:        #1F3E45
- Text secondary:      #6B7280
- Text tertiary:       #9CA3AF
```

### Typography
```
Display (h1):    League Spartan 48px, bold, tight leading
Heading (h2):    League Spartan 32px, bold
Subheading (h3): League Spartan 24px, semibold
Body (p):        Nunito 16px, regular, relaxed leading
Caption:         Nunito 12px, regular, medium leading
Mono (code):     JetBrains Mono 13px
```

### Spacing
```
xs:    4px
sm:    8px
md:    16px
lg:    24px
xl:    32px
2xl:   48px
3xl:   64px
```

### Component Tokens
```
Button:
  - Padding: md (16px) vertical, lg (24px) horizontal
  - Border-radius: rounded-lg
  - Min height: 44px (touch target)
  - Focus: ring-2 ring-primary-500 ring-offset-2

Card:
  - Padding: lg (24px)
  - Border-radius: rounded-xl
  - Shadow: subtle (0 1px 2px rgba...)
  - Hover shadow: elevated

Input:
  - Padding: md (16px)
  - Border: 1px solid, #E5E7EB
  - Focus: ring-1 ring-primary-500, border-primary-500
  - Error: ring-1 ring-danger-500, border-danger-500
```

---

## 📊 Interaction Patterns

### Forms
```
Label (always above):
[Label] [optional badge]
[Input with focus state]
[Helper text or error]
[CTA button]
```

### Modals
```
┌──────────────────────────────┐
│ Title              [×]        │ ← Close button top-right
├──────────────────────────────┤
│                              │
│ Content                      │
│                              │
├──────────────────────────────┤
│ [Cancel]        [Confirm]    │ ← Action buttons
└──────────────────────────────┘
```

### Scroll-Reveals
```
Entrance: fade + slide-up
  - Initial: opacity-0, translateY(16px)
  - Animate: opacity-1, translateY(0)
  - Duration: 0.6s
  - Delay: staggerChildren 0.1s (per item)
  - Easing: cubic-bezier(0.22, 1, 0.36, 1)
```

### Micro-interactions
```
Button hover:   scale(1.02), shadow elevated
Button active:  scale(0.98), shadow inset
Input focus:    ring-1 ring-primary-500, label float up
Checkbox:       scale 0.9→1.0 on check, with checkmark draw-in
Badge:          pulse effect (scale 1→1.05→1, infinite 2s)
```

---

## 📱 Responsive Breakpoints

```
Mobile:   375px–479px  (iPhone SE → iPhone 11)
Tablet:   480px–1023px (iPad)
Desktop:  1024px+      (regular + large screens)

Key adjustments:
- Mobile: 1 column, full width, larger touch targets (44px min)
- Tablet: 2 columns, 80% width
- Desktop: 3 columns, max-w-7xl container

Stacking rules:
- Hero: full width all breakpoints
- Grid: 3-col (desktop) → 2-col (tablet) → 1-col (mobile)
- Sidebar: 2-pane (desktop) → tabbed (mobile)
```

---

## ✅ Accessibility Checklist (WCAG AA)

Per screen, verify:
- [ ] Keyboard nav works (Tab, Enter, Escape)
- [ ] Focus indicator visible (ring 2px)
- [ ] Form labels associated (`<label for="input-id">`)
- [ ] Error messages linked to inputs (`aria-describedby`)
- [ ] Images have alt text
- [ ] Color not sole indicator (use text + color)
- [ ] Touch targets ≥ 44px
- [ ] Contrast ≥ 4.5:1 (text) or 3:1 (large text)
- [ ] Reduced motion respected (`prefers-reduced-motion`)
- [ ] Screen reader compatible (`role`, `aria-label`, `aria-live`)

---

## 🎬 By End of Week 6

You'll have:
- ✅ 8–10 screens designed + built
- ✅ Responsive (mobile, tablet, desktop)
- ✅ Accessible (WCAG AA)
- ✅ Interactive patterns working
- ✅ Design system fully applied
- ✅ Ready for internal testing

**Next**: User testing, refinement, bug fixes, launch prep.

---

**Reference this doc as you design + build. Update with findings as you go.**
