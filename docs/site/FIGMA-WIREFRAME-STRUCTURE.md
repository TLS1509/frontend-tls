# Figma Desktop Screens Structure (1440px scrollable)

## 📋 Overview

Each page is a **1440px wide scrollable frame** with sections stacked vertically. 
Sections use **TLS Design System**: variables, styles, components from the library.

---

## 🏠 HOME (5400px total height)

```
┌─ Header (64px)
├─ Hero / Cinematic (680px)
├─ Conviction Stripe (180px)
├─ Learn→Do→Match Intro (340px)
├─ Three Offers (540px)
├─ STRIDE Callout (200px)
├─ Proof (300px)
├─ Blog Teaser (200px)
├─ Final CTA Dark (280px)
└─ Footer (160px)
```

**Key Components to Use:**
- Header: Logo + Nav (active underline) + 2 CTAs (ghost + warm)
- Hero: Glass card (white @ 0.07 + border white @ 0.12) + illustrative blobs + Learn→Do→Match visual
- Offers: 3 rows (num + kicker + title + body + CTA link)
- All text: League Spartan (display) + Nunito (body)
- All colors: TLS variables (primary-600, secondary-500, ink-900, etc.)

---

## 📚 FORMATION (3800px)

```
┌─ Header
├─ Hero
├─ Program Overview
├─ Curriculum Grid (6 weeks)
├─ Features
├─ FAQ
├─ Testimonials / Social Proof
├─ CTA
└─ Footer
```

---

## 💼 ACCOMPAGNEMENT (3400px)

```
┌─ Header
├─ Hero
├─ Stats Grid (Deloitte / WEF / Workday / Gartner)
├─ 4 Services (cards with icon + title + desc + link)
├─ 90-Day Timeline (J+30, J+45, J+60)
├─ FAQ
├─ CTA
└─ Footer
```

---

## 🎓 LEARNING APP (4200px)

```
┌─ Header
├─ Hero (Dashboard Preview)
├─ 8-10 Screens Preview (carousel or grid)
├─ Features List
├─ Coaching Details
├─ Journal Preview
├─ Veille Section
├─ Testimonial/Social Proof
├─ Newsletter CTA
└─ Footer
```

---

## 📰 MAGAZINE (3600px)

```
┌─ Header
├─ Hero
├─ Featured Article (large card)
├─ Article Grid (3x3)
├─ Filter Tags
├─ "More Articles" CTA
├─ Newsletter Signup
└─ Footer
```

---

## ✉️ CONTACT (2400px)

```
┌─ Header
├─ Hero
├─ Contact Form (2 columns: left text, right form)
├─ Company Info Block
├─ Map
├─ Social Links
└─ Footer
```

---

## 🛠️ Component Usage Rules

### Always Use:
1. **TLS Variables** for colors (not hex literals)
2. **TLS Styles** for typography (Display XL, Display LG, Body, etc.)
3. **TLS Components** when available (Button, Card, etc.)
4. **TLS Tokens** for spacing (96px margins, 32px gaps, etc.)

### Create Web-Specific Components (if not in library):
- **HeroSection** — Title + Subtitle + CTAs on illustrative background
- **OfferCard** — Number + Kicker + Title + Body + CTA (row layout)
- **SectionHeader** — Eyebrow + Title + Optional Description
- **StatsGrid** — 4 tiles with number + label + description
- **ServiceCard** — Icon + Title + Description + Link
- **TimelineStep** — Number + Date + Title + Description

### Never:
- Use hex colors directly (always use variables)
- Use hardcoded font sizes (use text styles)
- Create new components for single-use elements
- Ignore TLS design tokens

---

## 📐 Spacing & Layout Standards

| Property | Value |
|----------|-------|
| **Page Width** | 1440px |
| **Max Content Width** | 1248px (96px margin each side) |
| **Section Padding** | 96px horizontal (40px from edge to content) |
| **Gap Between Sections** | 0 (sections touch) |
| **Item Gap** | 32px (horizontal), 24px (vertical) |
| **Border Radius** | 12-16px (sections), 8px (buttons/cards) |

---

## 🎨 Visual Hierarchy

```
Display XL (48-52px)  ← Hero headlines
Display LG (36px)     ← Section headers
Display MD (28px)     ← Subsection headers
Body LG (18px)        ← Featured text
Body (15px)           ← Standard body
Body SM (14px)        ← Button labels, captions
Micro (10-12px)       ← Labels, eyebrows, tags
```

---

## ✅ Checklist Before Creating Each Page

- [ ] Create 1440px frame, name it `🖥️ [PageName] — Desktop 1440`
- [ ] Set background to white (ink-0 / #ffffff)
- [ ] Add all sections as nested frames with proper names
- [ ] Use TLS Design System variables for all colors
- [ ] Use TLS text styles for all typography
- [ ] Import TLS Button, Card, etc. components where applicable
- [ ] Add section dividers (ink-200 @ 1px) between sections
- [ ] Test scrolling height (no section should be > 700px)
- [ ] Document any new patterns/components created

---

## 🔗 Next Steps

1. **Phase 1**: Create frame structure + TLS variables/styles
2. **Phase 2**: Import TLS components (Button, Card, etc.)
3. **Phase 3**: Create web-specific component sets (HeroSection, OfferCard, etc.)
4. **Phase 4**: Build out all pages in parallel
5. **Phase 5**: Sync Figma ↔ Code (variables, component props)
