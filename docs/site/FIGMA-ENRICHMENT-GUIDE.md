# Figma Enrichment Guide — Desktop Screens 1440

## 🎯 Overview

The 6 desktop screens are created in Figma as basic frames. This guide shows you how to **enrich each one progressively** with:
- TLS component imports (Button, Card, etc.)
- Design system variables (colors, typography)
- Detailed section content matching the code

---

## 🏠 HOME — Enrichment Checklist

**Current state**: 10 basic sections, placeholder colors/text
**Target**: Full visual design with TLS components

### Section-by-Section Enhancements

#### 1. Header (64px)
- [ ] Import Button component (ghost + warm variants) from TLS library
- [ ] Apply variable `primary-600` to CTAs
- [ ] Set active nav underline to `primary-500` 2px
- [ ] Add 0.9 opacity white bg + glass effect (`backdrop-filter: blur(12px)`)

#### 2. Hero / Cinematic (680px)
- [ ] Keep glass card structure (white @ 0.06 + border white @ 0.14)
- [ ] Add illustrated gradient background (warm dark → teal)
- [ ] Text: use "League Spartan" for h1 (52px bold) if available, else Inter bold
- [ ] Hero accent color: apply `p200` to "prouver vraiment."
- [ ] Import TLS Button (primary + glass variants) for CTAs
- [ ] Trust badge: bg `p100` + text `p700`
- [ ] Right LDM visual: ensure 40px dots with `p700` color + connectors `p500` @ 0.3 opacity

#### 3. Conviction Stripe (180px)
- [ ] Background: apply variable `primary-700`
- [ ] Text: eyebrow @ 60% opacity white
- [ ] Heading: 28px bold white
- [ ] Add subtle gradient overlay (darker at bottom)

#### 4. Learn→Do→Match Intro (340px)
- [ ] Eyebrow: `secondary-600` + 8% letter-spacing
- [ ] H2: 44px bold `ink-900`, tight tracking
- [ ] Body: `ink-600`, readable line-height
- [ ] Note text: `ink-500` @ 80% opacity

#### 5. Three Offers (540px)
- [ ] Title: 40px bold, tight tracking (-1.5%)
- [ ] Offer rows:
  - [ ] Numbers: 36px bold, color-coded (`p700` / `s600` / `a400`)
  - [ ] Kicker: 10px uppercase, same color as number
  - [ ] Title: 24px bold `ink-900`
  - [ ] Body: 14px regular `ink-600`
  - [ ] CTA link: 14px regular, color-coded, with arrow
- [ ] Dividers: `ink-200` 1px between rows

#### 6. STRIDE Callout (200px)
- [ ] Card background: apply variable `primary-50`
- [ ] Corner radius: 16px
- [ ] Label: 10px regular, `p700` text
- [ ] Heading: 32px bold `ink-900`
- [ ] Sub: 14px regular `ink-700`
- [ ] CTA link: right-aligned, 14px regular `p700`

#### 7. Proof Section (300px)
- [ ] Background: apply variable `ink-50`
- [ ] Eyebrow: `secondary-600`
- [ ] Heading: 36px bold `ink-900`
- [ ] Items: 
  - [ ] Check dot: 20px circle, `primary-500`, rounded 10px
  - [ ] Text: 15px regular `ink-800`
  - [ ] Dividers: `ink-200` 1px after each item

#### 8. Blog Teaser (200px)
- [ ] Top divider: `ink-200` 1px
- [ ] Eyebrow: `ink-500`
- [ ] Heading: 34px bold `ink-900`
- [ ] Sub: 15px regular `ink-600`
- [ ] Import Button (ghost) for "Lire le blog" CTA

#### 9. Final CTA (280px)
- [ ] Card background: `ink-900`
- [ ] Add mesh gradient blob (primary-700 @ 0.25) top-right
- [ ] Heading: 48px bold white
- [ ] Sub: 16px regular white @ 0.75 opacity
- [ ] Import Button (warm variant) for primary CTA
- [ ] Import Button (glass variant) for secondary CTA

#### 10. Footer (160px)
- [ ] Background: `ink-900`
- [ ] Logo: 28px circle `primary-600`
- [ ] Text: white @ 0.6 opacity (name), @ 0.5 opacity (links)
- [ ] Copyright: 12px regular white @ 0.35 opacity

---

## 📚 FORMATION Enrichment

**Sections to add detail:**
1. Hero: similar to HOME (glass card + cinematic)
2. Program Overview: add descriptor text + icon tiles
3. Curriculum Grid: 6 week boxes with week names, hours, key topics
4. Features: 4-column icon + title + desc layout
5. FAQ: Accordion component (if in TLS library)
6. Testimonials: 3-column quote + author grid
7. CTA Section: warm button + copy
8. Footer: standard

---

## 💼 ACCOMPAGNEMENT Enrichment

**Key sections:**
1. Hero: glass card + title (Le Studio)
2. Stats Grid: 4 stat tiles (stat + label), large numbers
3. Services: 4 service cards (icon + title + desc + link)
4. Timeline: 3 pillars (J+30, J+45, J+60) with details
5. FAQ: accordion
6. CTA: primary button

---

## 🎓 LEARNING APP Enrichment

**Key sections:**
1. Hero: mockup of dashboard (wireframe grid of screens)
2. Screens Preview: carousel or grid of 8-10 screen thumbnails
3. Features: icon grid (Parcours, Coaching, Journal, Veille, Badges)
4. Coaching Details: 2-column layout (left: text, right: screenshot)
5. Journal Preview: sample journal entry card
6. Veille: curated content card examples
7. Testimonial: quote card
8. Newsletter CTA
9. Footer

---

## 📰 MAGAZINE Enrichment

**Key sections:**
1. Hero: glass card
2. Featured Article: large card with image, title, excerpt
3. Article Grid: 3×3 grid of article cards (image + title + category + read time)
4. Filters: pill buttons (AI, Pédagogie, Tendances, Réglementation)
5. Pagination / "Load More"
6. Newsletter signup
7. Footer

---

## ✉️ CONTACT Enrichment

**Key sections:**
1. Hero: glass card
2. Contact Form: 2-column layout (left: form fields, right: text)
3. Company Info: address + email + phone (icon + text pairs)
4. Map: embedded Google Map component
5. Social Links: icon links (LinkedIn, Twitter, Instagram, YouTube)
6. Footer

---

## 🎨 TLS Component Integration

When enriching, **import these from TLS library**:
- Button (primary, warm, ghost, glass variants)
- Card (if available)
- Input / Form fields (if available)
- Badge / Pill (for tags, filters)
- Any other atomic components

**Apply these variables systematically**:
- Primary actions: `primary-600` bg, `primary-700` on hover
- Secondary/warm: `secondary-500`, `secondary-600`
- Accent: `accent-400`
- Text: `ink-900` (strong), `ink-700` (regular), `ink-500` (muted)
- Backgrounds: `white` (main), `ink-50` (section), `primary-50` (callouts)
- Borders: `ink-200` dividers, `ink-100` light borders
- Success/check: `primary-500`

---

## 📐 Spacing Standards

- **Page margins**: 96px left/right
- **Section padding**: 40px top/bottom
- **Item gaps**: 32px (horizontal), 24px (vertical)
- **Card corner radius**: 12-16px
- **Button corner radius**: 8px
- **Hero section height**: 680px
- **Section spacing**: no gap (sections touch)

---

## ✅ Quality Checklist

Before marking a screen as "done":
- [ ] All text uses TLS text styles (or explicit font/size/weight)
- [ ] All colors use TLS variables (not hex literals)
- [ ] All buttons are imported Button component instances
- [ ] Corner radius matches: 12-16px for sections, 8px for UI elements
- [ ] Hover states defined (if doing interactive prototype)
- [ ] Responsive breakpoints noted (tablet/mobile TBD in Phase 4)
- [ ] Section names match the code (e.g., "Hero / Cinematic" matches MarketingHomeEditorial.tsx)

---

## 🚀 Next Steps

### Recommended enrichment order:
1. HOME (most complex, sets template)
2. FORMATION (similar structure to HOME)
3. ACCOMPAGNEMENT (stats + services pattern)
4. LEARNING APP (showcase pattern)
5. MAGAZINE (grid + content pattern)
6. CONTACT (form pattern)

### After enrichment:
- **Phase 3B**: Create component sets from repeated patterns
  - HeroSection component
  - OfferCard component
  - ServiceCard component
  - StatsGrid component
  - etc.
- **Phase 4**: Add responsive variants (tablet/mobile breakpoints)

---

## 🔗 Resources

- **TLS Library location**: Design System - TLS (already subscribed)
- **Color variables**: TLS / Colors (in Figma library)
- **Typography**: Check existing text styles in library
- **Component instances**: Drag from Assets panel to reuse

---

## 📝 Notes

- If TLS components aren't sufficient, mark the section as "needs custom component"
- Document any design decisions that differ from code (e.g., "Figma uses 2-column grid, code uses flex-wrap")
- Keep a running list of "new components to build" for Phase 3B
