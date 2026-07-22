# Design System: The Learning Society — Augmented Mastery

> ⚠️ **Échelle de gris corrigée le 2026-07-22** — ce document portait encore
> l'ancienne échelle `ink` teintée teal (`#F5F8F8`, `#535B62`, `#12181C`…),
> abandonnée dans `src/index.css` au profit de gris neutres. Un outil lisant
> l'ancienne version générait des gris qui ne correspondaient plus à l'app.
>
> ⚠️ **L'app a DEUX fichiers de tokens, tous deux chargés** — ne pas lire
> `src/index.css` seul :
> - `src/index.css` (bloc `@theme`, 230 tokens) — palette et échelles `--color-*`
> - `src/styles/design-tokens.css` (375 tokens, chargé par `globals.css` en
>   `layer(base)`) — rôles sémantiques `--border`, `--surface-*`, `--tls-*`
>
> Les deux couvrent parfois **le même rôle sous des noms différents et avec des
> valeurs différentes** : bordure opaque `#E5E7EB` (`--color-border-default`)
> d'un côté, translucide `rgba(26,26,26,0.08)` (`--border`) de l'autre.
> En cas de divergence, **c'est le composant qui tranche**, pas le fichier de
> tokens — vérifier ce que rend réellement `src/components/`.


> **For Google Stitch.** This document is the single source of truth for generating new screens aligned with the TLS design language. Read it entirely before generating any UI. The anti-patterns section is as important as the rules.

---

## 1. Visual Theme & Atmosphere

**The Learning Society** is an adult learning platform for skills-based organizations. Its visual identity is built on one rejection and one affirmation.

**Rejection:** The platform rejects three category defaults:
- The **grey bureaucracy** of Moodle — dead tables, compliance checkboxes, 2003 LMS energy
- The **kindergarten saturation** of Duolingo — neon primaries, Pavlovian streak anxiety, infantilizing UX
- The **dark-mode AI purple** of every SaaS startup — gradient glass promising everything, glowing nothing

**Affirmation:** The system is warm, daytime, coastal. The atmosphere is **"afternoon light through a studio window in Marseille"** — calm authority, editorial weight, humanist warmth. Not cold. Not clinical. Not flashy.

**Density:** 4/10 (gallery-airy for learner surfaces, 6/10 for strategic/manager views)
**Variance:** 5/10 — asymmetric but not chaotic. Editorial structure with breathing room.
**Motion:** 3/10 in product surfaces (≤200ms, Tailwind transitions only). 7/10 in marketing surfaces only.

**The protagonist rule:** Every screen is designed from the learner's perspective. The single most important question is: "What is my action right now?" It must answer in under 3 seconds.

---

## 2. Color Palette & Roles

### Primary palette — Coastal Teal

The system's anchor color. Carries **focus, progress, learning, navigation**.

| Name | Hex | Role |
|------|-----|------|
| **Coastal Teal Base** | `#55A1B4` | Brand anchor, hover states, active indicators, focus rings |
| **Coastal Teal CTA** | `#4A8FA1` | Default primary button fill. One step deeper than the base. |
| **Coastal Teal Pressed** | `#3D7786` | Active/pressed button state. Never at rest. |
| **Teal Deep** | `#2F5F6A` | Dark surfaces, hero gradient stops |
| **Teal Darkest** | `#1F3E45` | Headline text on dark glass, deep hero backgrounds |
| **Teal Mist** | `#E8F4F7` | Card tint backgrounds, ghost button fills, gentle hover surfaces |
| **Teal Pale** | `#DCEBEF` | Lighter card tints, subtle dividers |

### Secondary palette — Warm Amber

The **coaching and human contact** color. Used only for warmth — never on system controls.

| Name | Hex | Role |
|------|-----|------|
| **Warm Amber** | `#ED843A` | Coaching buttons, masterclass surfaces, warm card tints |
| **Warm Amber Deep** | `#C06920` | Text on warm surfaces, active warm states |
| **Warm Amber Mist** | `#FFF3EB` | Coaching section backgrounds, warm card fills |

### Tertiary palette — Golden Sun

The **practice-validated color**. Marks the moment of achievement. Used **sparingly** — never decorative.

| Name | Hex | Role |
|------|-----|------|
| **Golden Sun** | `#F8B044` | Badge unlocks, XP indicators, validated practice markers |
| **Golden Sun Mist** | `#FFF9EE` | Achievement surfaces, reflection sections |

### Neutrals — Ink Scale

One neutral scale, no warm/cool mixing.

| Name | Hex | Role |
|------|-----|------|
| **Page Canvas** | `#FAFBFC` | App page background |
| **Pure Surface** | `#FFFFFF` | Card and container fill |
| **Surface Muted** | `#F9FAFB` | Sunken areas, secondary surfaces |
| **Surface Sunken** | `#F3F4F6` | Input backgrounds, code blocks |
| **Border Default** | `rgba(26,26,26,0.08)` *(`--border`, design-tokens.css)* | Séparateurs, modales, flashcards. **Pas les cartes** — voir §Cards |
| **Border Strong** | `rgba(26,26,26,0.14)` *(`--border-strong`, design-tokens.css)* | Bordures actives, inputs focus |
| **Border Card** | `#E5E7EB` *(`--color-border-default`, index.css)* | **Bordure des cartes** — opaque, c'est ce que rend `Card.tsx` |
| **Ink Muted** | `#6B7280` | Secondary text, metadata, captions |
| **Ink Body** | `#4B5563` | Supporting body text |
| **Ink Deep** | `#374151` | Primary body text |
| **Ink Deepest** | `#252B37` | Headlines on light surfaces |
| **Ink Black** | `#0F172A` | Near-black, never pure black |

### Semantic states — TLS Muted Family

**These are not Tailwind defaults. Do not use `#22C55E` green or `#EF4444` red.**

| State | Background | Text/Icon | Border |
|-------|-----------|-----------|--------|
| **Success** | `#E8F2F0` | `#335A56` | `rgba(157,190,186,0.30)` |
| **Danger** | `#FEF4F0` | `#8F2A0E` | `rgba(242,133,89,0.25)` |
| **Warning** | `#FFF9EE` | `#2f1c13` | `rgba(248,176,68,0.30)` |
| **Info** | `#E8F4F7` | `#1F3E45` | `rgba(85,161,180,0.25)` |

Success is muted teal-green (`#9DBEBA`) — "calmly validated", not "you crushed it". Danger is soft coral (`#F28559`) — a flag, not a slap.

---

## 3. Typography Rules

### Font Stack

```
Display: League Spartan, 'Helvetica Neue', Arial, sans-serif
Body: Nunito, -apple-system, BlinkMacSystemFont, system-ui, sans-serif
Mono: JetBrains Mono, ui-monospace, SFMono-Regular, Menlo, monospace
```

**League Spartan** is a geometric condensed display with strong vertical proportions. French editorial sensibility — authority without coldness.

**Nunito** is a rounded humanist sans, optimized for screen reading at small sizes. Comfort and approachability.

**JetBrains Mono** appears only in: eyebrow tags, code blocks, numeric data labels, and the mandatory `IA` transparency label on AI-generated content.

### Type Scale

| Token | Size | Weight | Family | Letter-Spacing | Line-Height | Usage |
|-------|------|--------|--------|----------------|-------------|-------|
| Display 2XL | `clamp(3.5rem, 6vw+1rem, 6.5rem)` | 700 | League Spartan | -0.03em | 1.08 | Marketing hero only |
| Display XL | `clamp(2.75rem, 4vw+1rem, 4.5rem)` | 700 | League Spartan | -0.03em | 1.08 | Marketing sections |
| H1 | `2.25rem` (36px) | 700 | League Spartan | -0.025em | 1.08 | Page-level headings |
| H2 | `1.75rem` (28px) | 700 | League Spartan | -0.025em | 1.08 | Dashboard greetings, modal headers |
| H3 | `1.375rem` (22px) | 600 | League Spartan | -0.02em | 1.08 | Card titles, section headers |
| H4 | `1.125rem` (18px) | 600 | League Spartan | -0.02em | 1.08 | Sub-section labels |
| Body LG | `1.125rem` (18px) | 400 | Nunito | 0 | 1.56 | Lead paragraphs, lesson body |
| Body | `1rem` (16px) | 400 | Nunito | 0 | 1.5 | Default copy |
| Body SM | `0.9375rem` (15px) | 400 | Nunito | 0 | 1.6 | Card descriptions, secondary content |
| Label | `0.8125rem` (13px) | 600 | Nunito | +0.02em | 1.23 | Form labels, badge text, metadata |
| Eyebrow | `0.6875rem` (11px) | 700 | JetBrains Mono | +0.08em | 1.45 | Section eyebrow tags, `IA` label |
| Button | `0.9375rem` (15px) | 600 | Nunito | -0.01em | 1.2 | All button labels |

### Typography Rules

- **League Spartan for display sizes ≥22px** — Nunito at large sizes is too round and soft
- **65–75 characters max per line** for body and body-lg copy (`max-w-prose`)
- **JetBrains Mono eyebrow rule:** Only for `COMPÉTENCE 3 SUR 7`-style tags, code blocks, numeric data, and the `IA` AI transparency pill. Never in body text, never in buttons
- **No exclamation marks** in product copy. Calm validation, not Pavlovian reinforcement
- **No em dashes (—)** in UX copy — commas, colons, periods only
- **-0.03em tracking for Display** sizes (≥48px). -0.025em for H1-H2. Tighter than generic SaaS.

---

## 4. Component Stylings

### Buttons

The pill is the brand's **signature gesture of commitment**. Every button is always `border-radius: 999px`. No exceptions.

**Shape:** 999px border-radius always. Height 44px touch target. Never `border-radius: 50%` (that's circles).

| Variant | Fill | Text | Hover | Use |
|---------|------|------|-------|-----|
| **Primary** | `#4A8FA1` | White | Glow shadow + lighten to `#55A1B4` + `-1px` lift | Default action, one per viewport |
| **Secondary** | `#ED843A` | White | Warm glow shadow + lighten | Coaching CTAs, human-contact actions |
| **Accent** | `#F8B044` | White | Sun glow shadow | Badge claim, JAC ceremony, celebration only |
| **Ghost** | `#E8F4F7` (teal mist) | `#1F3E45` | Darken to `#DCEBEF` | Secondary action paired with primary |
| **Glass** | `rgba(255,255,255,0.20)` | White | `rgba(255,255,255,0.35)` | On dark/gradient hero backgrounds only |
| **Destructive** | `#C0432A` (terracotta brique) | White | `#9B2F1B` en pression | Only on irreversible destructive actions |
| **Link** | Transparent | `#3D7786` underlined | Color darkens | Inline navigation only |

**Hover pattern:** `-translate-y-0.5` lift + tonal glow shadow (not neutral grey). Active returns to `translate-y-0`. This is non-negotiable.

**Icon-only buttons:** Equal width and height (44px default). Always `aria-label`. Shape stays pill — at square aspect-ratio, pill renders as a rounded rectangle, not a circle.

### Cards

The card is the primary container. **Always `border-radius: 20px`** (xl in Tailwind).

**Resting state:** Warm amber-tinted shadow `0 1px 3px rgba(237,132,58,0.07), 0 1px 2px rgba(0,0,0,0.05)`. Barely visible — the tint shows in DevTools.

**Interactive hover:** `-translate-y-1` + `0 8px 24px rgba(237,132,58,0.14), 0 4px 8px rgba(0,0,0,0.06)` lift + `border-color: #96C3CF` (primary-300) + tinted `bg-primary-50/30` wash. Transition `200ms` standard.

| Variant | Background | Border | Usage |
|---------|-----------|--------|-------|
| **default** | White | 1px `#E5E7EB` (`ink-200`), hover `#D1D5DB` | Standard cards — vérifié dans `core/Card.tsx:95` (`border-ink-200`), bordure **opaque**, pas translucide |
| **feature** | White | None | Highlighted, no border — shadow does the work |
| **interactive** | White | Shifts on hover | Clickable cards, course cards |
| **glass** | `rgba(255,255,255,0.55)` + blur | `rgba(255,255,255,0.60)` | Overlapping content: modals, sticky headers |
| **tinted/primary** | `#E8F4F7` (teal mist) | Softens on hover | Learning hub surfaces |
| **tinted/warm** | `#FFF3EB` (amber mist) | Softens on hover | Coaching sections |
| **tinted/sun** | `#FFF9EE` (sun mist) | Softens on hover | Achievement sections |

**Internal padding:** 24px default. 16px compact. 32px large.

**Flat resting rule:** Cards at rest carry `shadow-sm` at most. No stacked depth — cards inside cards inside cards is forbidden.

### Inputs / Form Fields

- **Shape:** `border-radius: 14px` (lg)
- **Background:** White, no fill tint
- **Border:** 1px `#E5E7EB` at rest → shifts to `#55A1B4` (Coastal Teal) on focus. **No glow ring, no inset shadow — just the border swap.**
- **Height:** 44px touch target. Padding: 10px vertical, 14px horizontal
- **Typography:** Nunito 16px, `#252B37` text. Placeholder `#9CA3AF`
- **Error state:** Border → coral `#F28559`, helper text below in matching color + AlertCircle icon. Color is never the sole error carrier.
- **Disabled:** Background `#F9FAFB`, text `#9CA3AF`, 50% opacity
- **Label:** Above the input (never floating). Nunito 13px 600 weight, +0.02em tracking.

### Badges & Pills

- **Shape:** `border-radius: 999px` always
- **Padding:** 2px vertical, 10px horizontal
- **Typography:** Label spec (Nunito 13px 600, +0.02em)

| Variant | Background | Text |
|---------|-----------|------|
| brand | `#E8F4F7` | `#1F3E45` |
| warm | `#FFF3EB` | `#C06920` |
| sun | `#FFF9EE` | `#252B37` |
| success | `#E8F2F0` | `#335A56` |
| danger | `#FEF4F0` | `#8F2A0E` |
| neutral | `#F3F4F6` | `#4B5563` |

**AI Label pill** (mandatory on every AI output): Teal-mist background `#E8F4F7`, teal-pressed text `#3D7786`, JetBrains Mono "IA" eyebrow (11px 700). Never animated. Never decorative. A functional transparency marker.

### Glass Morphism

Glass is a **signal, not a finish**. It appears only on surfaces that overlap other content.

| Level | Blur | Fill | Usage |
|-------|------|------|-------|
| **light** | `blur(12px)` | `rgba(255,255,255,0.35)` | Tinted card hover, subtle overlays |
| **medium** | `blur(18px)` | `rgba(255,255,255,0.55)` | Modals, sticky headers, hero glass cards |
| **heavy** | `blur(28px)` | `rgba(255,255,255,0.72)` | Drawer panels, sidebars over content |
| **ambient** | `blur(60px)` | opacity 20–30% | Marketing background blobs only |

**Coastal glass rule:** When tinted, glass takes the **dominant surface tone** — teal-tinted on primary surfaces, amber-tinted on coaching, sun-tinted on celebration. Never neutral grey glass. The brand rejects "cold AI SaaS dark glass."

**Anti-pattern:** glass-on-glass (stacked frosted surfaces), glass on flat static cards (decorative, not signal).

### Navigation

- **Sidebar:** 248px wide, white background, hairline right border. Items: 44px height, icon + label. Active state: `#E8F4F7` teal-mist background, `#4A8FA1` icon.
- **Topbar:** 64px height, white, hairline bottom border.
- **No active state with grey** — active is always tonal (teal-mist for primary nav).

---

## 5. Layout Principles

### Grid System

- CSS Grid for multi-column layouts, Flexbox for component-level alignment
- Max-width: 1200px for wide (dashboard), 900px for standard (learning paths), 600px for narrow (articles)
- Page padding: 16px mobile, 24px tablet, 32px desktop
- `min-h-[100dvh]` for full-height sections — never `h-screen`

### Spacing — Semantic Tokens

Use semantic spacing names, not raw pixel values.

| Token | Value | Usage |
|-------|-------|-------|
| `tight` | 2px | Heading ↔ subtitle within a block |
| `stack-xs` | 8px | Inline groups, metadata clusters |
| `stack` | 16px | Default — section header ↔ content, items in a stack |
| `stack-lg` | 24px | Content ↔ content within the same section |
| `section` | 32px | Between sibling sections |
| `section-lg` | 40px | Major separations |
| `page` | 48px | Page-level groupings |

### Hero Patterns

The hero choice is determined by **surface type**, not default:

| Surface | Pattern |
|---------|---------|
| Marketing public | Immersive: mesh gradient + parallax blobs + gradient text |
| Learner dashboard | **No hero** — compact context bar + action card first |
| Detail content (article, masterclass, parcours) | Editorial Hero with tone |
| Lesson player | LessonHeader (progress + breadcrumb + resume) |
| Settings / utility | Simple PageHeader — no theatricality |
| Auth pages | AuthShell split-screen — signature pattern |

**Editorial Hero tones:**
- `brand`: Saturated teal gradient (#3D7786 → #55A1B4), white text. Detail content hubs. Use sparingly.
- `warm`: Amber mist gradient. Coaching hub.
- `sun`: Sun mist gradient. Badges, achievements.
- `default`: Subtle gradient on surface-mist. Auth, editorial pages.

### Tone-Per-Screen Rule

Every screen has **one dominant tone** with at most one accent. Three tones with equal weight = Christmas tree = forbidden.

| Flow | Dominant Tone | Accent |
|------|---------------|--------|
| Learning (parcours, lesson) | Coastal Teal | Golden Sun |
| Doing (missions, projects) | Warm Amber | Teal |
| Coaching (session, messaging) | Warm Amber | Teal |
| Reflecting (journal, corrections) | Golden Sun | Warm |
| Achievements (badges, XP, Passeport) | Golden Sun | Teal |
| Enterprise (manager, analytics) | Teal | Neutral |
| Onboarding | Teal | Warm |
| Auth | Saturated teal (brand tone) | None |

---

## 6. Motion & Interaction

### Product Surface (Learning App) — Restrained

- **Duration:** 120ms (quick feedback) → 200ms (standard transitions) → 320ms (complex animations)
- **Easing:** `cubic-bezier(0.2, 0, 0, 1)` (standard), `cubic-bezier(0, 0, 0.2, 1)` (entrance)
- **Properties animated:** `transform`, `opacity`, `box-shadow`, `background-color` only
- **Never animate:** `top`, `left`, `width`, `height` — compositing will break
- **Per-interaction budget:** ≤200ms operational surfaces. ≤150ms strategic/manager surfaces.

### Marketing Surface — Expressive

- Spring physics default: `stiffness: 100, damping: 20`
- Staggered cascade reveals for lists (waterfall, not instant mount)
- Perpetual micro-loops on active elements (pulse, float, shimmer)
- Mesh gradient animated background with 60px blur ambient blobs
- All animations must pass `useReducedMotion()` check — drop to instant/opacity-only fallback

### Logo Loading Animation

When the system is computing (AI matching, recommendations, streaming):
The TLS logo mark pulses with **staggered orbital cascade** on its 4 SVG paths. Not a spinner. Not rotation. The logo "breathes" — like a living sign. `1.8s` cycle, `cubic-bezier(0.45, 0, 0.55, 1)` easing. Signals "working on it" without anthropomorphizing the algorithm.

### Reduced Motion

`@media (prefers-reduced-motion: reduce) { animation: none; transition: none; }` blanket override on all product chrome. No exceptions.

---

## 7. AI Transparency — Mandatory Patterns

Every AI output in the product **must** carry:

1. **AI Label pill** — Teal-mist bg, teal-pressed text, JetBrains Mono "IA" eyebrow. Visible on every recommendation, summary, score, suggestion.
2. **Source citation** — Hoverable link to TLS corpus. "Source : [titre du contenu]"
3. **Confidence indicator** — Subtle progress bar (0–100%) or descriptor (Confiance élevée/moyenne/faible)
4. **Override button** — Always visible on recommendations to human decision-makers (coach, manager). Never hidden.

**Chatbot:** Characters stream with soft typewriter cadence (~30 char/sec). Cursor: single soft-tinted vertical line, 1.0s blink. No avatar profile picture. No chatbot mascotte/persona. The voice is the `IA` label + source citation.

**What NOT to use for AI:**
- Purple-cyan gradients
- Sparkle icons as decoration (sparkles AS a functional AI-feature button marker is allowed)
- "Neural" / "magic" / "copilot" / "AI superpowers" copy
- Anthropomorphic mascotte (no smiling character, no Atlas/Sextant persona)
- Loading spinners labeled "AI is thinking..."

---

## 8. Tone-Aware Design Language

The three saturated colors carry **semantic loads**, not decorative ones:

- **Coastal Teal** = focus, progress, learning, navigation. The brand's primary identity.
- **Warm Amber** = human coaching contact, masterclass, warmth. Reserved — never on system controls.
- **Golden Sun** = practice validated, achievement, celebration. Scarce by doctrine.

**The Three-Saturated Rule:** Only these three saturated colors exist. No `#3B82F6` blue, `#22C55E` green, `#EF4444` red, `#8B5CF6` purple on any product surface. Semantic states use the muted family only.

**The Tinted Mist Rule:** Background tints (`#E8F4F7`, `#FFF3EB`, `#FFF9EE`) carry tone without weight — for card surfaces, hero overlays, and dividers. Never behind body text.

---

## 9. Practice Grammar — UX Copy Rules

The learner is the subject of every verb.

**Approved verbs (active practice):**
- Reprends, Valide, Soumets, Continue, Maîtrise, Pratique, Réfléchis, Mobilise, Explore

**Forbidden verbs (passive consumption):**
- ❌ Visionne, Termine, Complète, Suis le cours, Consomme, Avance dans le module

**Voice:**
- `tu` on learner-personal screens (dashboard, passeport, journal, lesson player)
- `vous` everywhere else (coach hub, manager views, admin, marketing, emails)

---

## 10. Anti-Patterns — Never Generate These

**Forbidden aesthetics:**
- ❌ Purple-cyan AI gradients — the "tech startup promises everything" mood
- ❌ Duolingo saturated bright colors — kindergarten primaries, streak anxiety
- ❌ Moodle grey tables — compliance checkbox dread
- ❌ Generic hero-metric SaaS layout: big number + small label + gradient accent
- ❌ 3 equal cards horizontally with icon + heading + 2 lines — repeated section after section
- ❌ Square buttons or `border-radius: 8–12px` buttons — always pill (999px)
- ❌ `rounded-full` on buttons — that's circles for icon-only avatars
- ❌ Pure black `#000000` — use `#0F172A` or `#252B37`
- ❌ Bright `#22C55E` green or `#EF4444` red for semantic states — use the TLS muted family
- ❌ Gradient text on large headers — reserved for marketing `GradientText` primitive only
- ❌ Serif fonts of any kind in this UI
- ❌ Colored border-left or border-right stripes >1px as accents
- ❌ Neon outer glow shadows — tone-tinted warm shadows only
- ❌ Custom mouse cursors
- ❌ Glass as decoration on static cards — glass = signal, not finish
- ❌ Glass on glass (stacked frosted surfaces)

**Forbidden copy:**
- ❌ "Incroyable", "Révolutionnaire", "Game-changer", "Next-gen", "Seamless", "Unleash"
- ❌ Exclamation marks in product copy
- ❌ Em dashes (—) in UX copy
- ❌ "You crushed it!" energy around badge unlocks — calm validation
- ❌ Streak-loss anxiety copy, urgency theater, countdown timers
- ❌ "Scroll to explore", scroll arrows, bouncing chevrons

**Forbidden gamification:**
- ❌ Daily streak with punishment for missing a day
- ❌ Red badges for engagement nudges — only for genuine errors
- ❌ Sunday-evening guilt-trip notifications
- ❌ "⏰ 2 jours restants!" urgency
- ❌ Confetti on routine actions — celebration is rare and earned

---

## 11. Sample Screen — Dashboard (Learner)

The learner dashboard opens on **the action of the day**. Not a chart. Not a stats overview. One clear answer to "what is my action right now?"

**Structure:**
1. **Compact context bar** (top) — greeting + today's date + streak (calm, weekly not daily)
2. **ResumeLessonCard** (hero action) — glass tone-aware with eyebrow "Étape 3 sur 7", large title, 3 meta pills (level / duration / lessons), progress bar, pill CTA "Reprends ta leçon"
3. **Section: Missions actives** — 2-column grid, warm amber tone
4. **Section: Parcours en cours** — 3-column grid, teal tone, scrollable
5. **Section: Recommandations IA** — always with `IA` label pill, source citation, confidence indicator

**What the dashboard does NOT have:**
- No hero with gradient covering 30% of the page
- No "Welcome back!" with sparkles
- No Dreyfus radar (that's on `/passeport`)
- No org-wide heatmap (that's for managers)

---

## 12. Sample Screen — Auth (Login)

`AuthShell` — split-screen layout. Left: full-bleed coastal teal gradient with `AmbientBlobs` + white TLS logo + editorial copy. Right: glass-dark form surface.

**Left panel:**
- Background: `linear-gradient(135deg, #1F3E45 0%, #3D7786 50%, #55A1B4 100%)`
- 2–3 large blurred radial blobs in teal-primary and warm-amber at <25% opacity
- TLS logo mark: white variant (`variant="light"`)
- Headline: League Spartan 700, white, -0.03em tracking
- Subheadline: Nunito body-lg, `rgba(255,255,255,0.85)`
- 3–4 feature bullets with Lucide icons in `rgba(255,255,255,0.70)`

**Right panel:**
- Background: glass-dark surface `rgba(255,255,255,0.08)` + `blur(20px)` against the left gradient
- Fields: `AuthField` style — white/15 bg, white/30 border, white text
- Primary CTA: white inverse button (white fill, `#1F3E45` text)
- Ghost CTA: white border, white text, `rgba(255,255,255,0.10)` bg

---

*End of design system reference for Google Stitch.*
*Source of truth: `src/styles/design-tokens.css`, `src/index.css`, `DESIGN-IMPECCABLE.md`*
*Dernière vérification factuelle : 2026-07-22 (échelle de gris, bordures, sources de tokens).*