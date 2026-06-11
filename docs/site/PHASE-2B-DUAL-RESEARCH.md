# Phase 2B — Dual Research Path (Site + App)

## 🎯 The Strategy

**Don't enrich the site in isolation.** Simultaneously research **Learning App** product patterns.

**Why?**
1. **Component reuse** — Button, Card, Badge, Input, etc. work on both site + app
2. **Design consistency** — Same TLS tokens, spacing, motion across all surfaces
3. **Efficiency** — One research session discovers patterns for both projects
4. **Vision clarity** — Seeing the full product ecosystem sharpens site direction

---

## 📊 Your Weekly Time Split

```
Total: 5-6 hours/day × 5 days = 25-30 hours/week

60% Site Enrichment (15–18 hours)
├─ Collect inspiration (Moodboard)
├─ Enrich 1–2 screens
├─ Extract components

40% App Research (10–12 hours)
├─ Study Mobbin app flows
├─ Test mobile patterns
├─ Map component overlap
```

---

## 🗂️ Your Moodboard (Expanded)

### Site-Only Sections (Direction C)
- 🦸 **Hero Patterns** — Marketing hero compositions (site-specific)
- 💎 **Card & Glass** → *App subsection:* Lesson cards, Content cards
- 🔘 **Button States** → *App subsection:* Mobile FAB, Loading states
- 📐 **Layout Patterns** → *App subsection:* Mobile nav, Bottom sheets
- 🌊 **Surfaces & Textures** → *Shared palette, reused*

### App-Specific Sections (New)
- 🎓 **Coaching Flow** — Chat interface, message patterns, typing indicator
- 📖 **Journal Interface** — Blank canvas, prompts, calendar
- 🏆 **Achievement System** — Badge earn, credential display, celebration
- 📺 **Lesson Player** — Video controls, progress, transcripts
- 📱 **Mobile Patterns** — Navigation, swipe, gesture, safe area

---

## 🔄 Component Overlap Map

### Shared Components (Design Once, Use Everywhere)

| Component | Site Use | App Use | Variants Needed |
|-----------|----------|---------|-----------------|
| **Button** | CTA (orange, large, warm) | Next lesson, Start practice, Send message | Mobile full-width variant |
| **Card** | Offer card, Article card | Lesson card, Content card, Message card | Horizontal + vertical layouts |
| **Badge** | Feature badge, Trust badge | Skill badge, Topic filter, Status | Filled + outline variants |
| **Input** | Email signup | Form field, Message input, Search | Text + textarea + mobile keyboard |
| **Modal/Dialog** | Info overlay | Lesson completion, Badge detail, Confirmation | Size variants, animation |
| **Tabs** | Feature tabs | Course navigation, Filter | Mobile responsive (scroll vs stacked) |
| **Progress Bar** | (minimal on site) | Lesson progress, Course progress, Skill level | Linear + radial variants |
| **Text Styles** | League Spartan + Nunito | Same | Sizes adapted for mobile |
| **Color Palette** | Teal + Orange + Gold | Same | Same tokens, reused |

### App-Only Components

| Component | Purpose | Reference Pattern |
|-----------|---------|-------------------|
| **Lesson Player** | Video + controls + transcript | Skillshare, MasterClass |
| **Chat Bubble** | Coaching messages | Slack, Intercom |
| **Journal Editor** | Reflection writing | Day One, Notion |
| **Bottom Nav** | Mobile navigation | iOS standard, Material 3 |
| **FAB (Floating Action)** | Quick action button | Android standard |
| **Empty State** | No content message | Slack, Linear |
| **Loading State** | Skeleton screens, shimmer | Figma, Linear |

---

## 📅 Week-by-Week Plan

### Week 1 — Discovery Phase

**Monday–Wednesday: Site + App Parallel**
- **AM (Site):** Hero patterns research + Moodboard paste
  - Visit Daydream, Craft, Phantom on Mobbin
  - Screenshot glass cards, hero layouts
  
- **PM (App):** Onboarding + Lesson player research
  - Mobbin: Maven, Sana, Brilliant (course/learning focus)
  - Extract signup, lesson UI patterns
  - Paste into new Moodboard sections

**Thursday: Site Deep Dive**
- Enrich HOME hero section (6 hours)
- Apply glass card pattern, animated text, TLS components

**Friday: Component Synthesis**
- Review Moodboard (site + app combined)
- Start COMPONENT-EXTRACTION-CHECKLIST
- Mark discovered: Button, Card, Glass effect, ProgressBar

---

### Week 2 — Enrichment + App Validation

**Monday–Tuesday: Site Enrichment**
- Enrich FORMATION + ACCOMPAGNEMENT screens
- Apply patterns from Moodboard (site direction)

**Wednesday: App Pattern Validation**
- Study coaching/chat interfaces (Slack, Intercom patterns)
- Paste chat UI refs into Moodboard
- Test: Can we use same Button/Input as site?

**Thursday: Site Enrichment**
- Enrich LEARNING APP showcase section (cross-ref with app research)

**Friday: Component Mapping**
- Update checklist: which components are shared?
- Create variant matrix (Button sizes on site vs app)

---

### Week 3 — Final Enrichment + Component List

**Monday–Tuesday: Remaining Screens**
- Enrich MAGAZINE + CONTACT

**Wednesday: App Completion**
- Journal interface refs (Day One, Notion)
- Badge/achievement refs (Credly, GitHub)
- Paste into Moodboard app sections

**Thursday: Mobile Responsiveness**
- Research mobile navigation patterns (iOS/Android)
- Test: How do site components adapt to mobile?
- Extract: FAB, bottom nav, sheet patterns

**Friday: Final Component Extraction**
- Finalize COMPONENT-EXTRACTION-CHECKLIST (15–20 components)
- Prioritize Tier 1 (shared essentials) vs Tier 2 (variants) vs Tier 3 (advanced)
- Create component dependency map (which components block others?)

---

## 🎯 Success Criteria (Phase 2B End)

### Site Enrichment ✅
- [ ] All 6 screens enriched (HOME → CONTACT)
- [ ] Direction C aesthetic visible (warm, illustrated, glass, smooth)
- [ ] TLS components + variables applied throughout
- [ ] Moodboard populated with site references

### App Research ✅
- [ ] Onboarding, Lesson player, Coaching, Journal refs collected
- [ ] Mobile patterns researched (nav, gestures, safe area)
- [ ] Moodboard expanded with app-specific sections
- [ ] 10+ app-focused refs saved

### Component Library Foundation ✅
- [ ] 15–20 reusable components identified
- [ ] Shared vs app-specific inventory complete
- [ ] Variant matrix created (sizes, states, platforms)
- [ ] Tier 1 (top 5) ready for Phase 3B build

---

## 📁 File Structure (Your North Star)

```
docs/site/
├─ DESIGN-INSPO.md                    ← Site North Star (Direction C locked)
├─ ENRICHMENT-TO-DIRECTION-C.md       ← Site enrichment orchestrator
├─ APP-INSPIRATION-RESEARCH.md        ← App research guide (NEW)
├─ PHASE-2B-DUAL-RESEARCH.md          ← This file (coordination)
├─ FIGMA-ENRICHMENT-GUIDE.md          ← Site section checklist
├─ COMPONENT-EXTRACTION-CHECKLIST.md  ← Shared + app components
└─ PHASE-2B-QUICKSTART.md             ← Fast onboarding
```

---

## 🔗 Daily Workflow

### Morning (3 hours) — Site Enrichment
1. Pick a screen from FIGMA-ENRICHMENT-GUIDE
2. Import TLS components
3. Apply colors + text styles
4. Paste Moodboard refs nearby (visual reference)
5. Screenshot section, compare to Moodboard inspiration

### Afternoon (2 hours) — App Research
1. Pick a category from APP-INSPIRATION-RESEARCH (Onboarding, Chat, Journal, etc.)
2. Visit 2–3 Mobbin apps
3. Paste 2–3 screenshots into Figma Moodboard (app section)
4. Note: "This button pattern works on site too" or "Mobile-only pattern"
5. Update component overlap map

### Evening (30 min) — Tracking
1. Tick COMPONENT-EXTRACTION-CHECKLIST
2. Add notes: what pattern did you discover today?
3. Flag shared components: "Button size needs mobile variant"

---

## 💡 Tips for Parallel Research

### ✅ DO
- **Screenshot early, screenshot often** — Paste into Moodboard immediately
- **Compare across:** Does Slack's message UI work for our coaching flow?
- **Note patterns:** "Found: Bottom nav with 5 tabs, but we need 4"
- **Test sizes:** "Site button = 44px, app FAB = 56px" → document the variance
- **Leverage component reuse:** One well-designed Button scales everywhere

### ❌ DON'T
- **Get lost in deep dives** — Timebox each research session (max 2 hours/topic)
- **Over-collect refs** — Keep it lean (2–3 refs per category, max 9 total)
- **Design the app yet** — You're researching patterns, not building mockups
- **Diverge from TLS** — Every pattern must serve warm/clear/augmented
- **Ignore mobile** — If it's mobile-only, note it; don't force it onto desktop

---

## 🎨 Visual Summary

```
┌─────────────────────────────────────────────────────────────┐
│                     PHASE 2B — Dual Research                 │
│                                                              │
│  ┌──────────────────┐           ┌──────────────────┐       │
│  │   SITE FOCUS     │           │   APP FOCUS      │       │
│  │  (Direction C)   │           │  (Product UX)    │       │
│  │                  │           │                  │       │
│  │ • Hero patterns  │           │ • Onboarding    │       │
│  │ • Glass effects  │    ↔       │ • Coaching chat │       │
│  │ • Marketing copy │    ↔       │ • Journal       │       │
│  │ • CTA design     │    ↔       │ • Lesson player │       │
│  │                  │           │ • Mobile nav    │       │
│  └──────────────────┘           └──────────────────┘       │
│           │                              │                   │
│           └──────────────┬───────────────┘                  │
│                          ↓                                   │
│          ┌────────────────────────────┐                     │
│          │   SHARED COMPONENT LIBRARY  │                     │
│          │                             │                     │
│          │ • Button (5 variants)       │                     │
│          │ • Card (3 layouts)          │                     │
│          │ • Input (mobile + desktop)  │                     │
│          │ • Badge (5 sizes/colors)    │                     │
│          │ • Progress bar (2 modes)    │                     │
│          │ • Text styles (TLS tokens)  │                     │
│          │ • Spacing system            │                     │
│          │                             │                     │
│          └────────────────────────────┘                     │
│                      ↓                                       │
│              ┌───────────────┐                               │
│              │  Phase 3B:    │                               │
│              │  Build in     │                               │
│              │  Figma +      │                               │
│              │  Sync to Code │                               │
│              └───────────────┘                               │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

---

## 🚀 Ready to Start?

1. **Read:** [DESIGN-INSPO.md](DESIGN-INSPO.md) (15 min) + [APP-INSPIRATION-RESEARCH.md](APP-INSPIRATION-RESEARCH.md) (15 min)
2. **Plan:** Map your week using the timeline above (30 min)
3. **Collect:** Visit Daydream (site) + Maven (app) on Mobbin (1 hr)
4. **Paste:** Screenshots into Figma Moodboard (both site + app sections)
5. **Build:** Enrich HOME hero (2 hrs)
6. **Track:** Update COMPONENT-EXTRACTION-CHECKLIST (15 min)

**You now have a complete system for dual research. Let's build something extraordinary.** 🎨📱
