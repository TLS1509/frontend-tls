# Homepage Variants — Renaming & Creative Direction Strategy

## Current State → Proposed Names (With Rationale)

### V2 · Light → **`Clarity`** (ou `Clean-First`)
**Rationale:** Minimaliste, fokus sur lisibilité et clarté de message. Design épuré, white space généreux, typographie comme hero principal.

**Design Principle:** "Say more with less"
**Emotional Arc:** Trust through simplicity
**Audience:** Cerebral, decision-focused (CTOs, training directors)
**Key Features:**
- Minimal visual noise
- Strong typography hierarchy
- High contrast, accessibility-first
- Neutral color palette (primary + ink only)

---

### V4 · Editorial → **`Narrative`** (ou `Storyteller`)
**Rationale:** Flow éditorial, sections qui se déploient naturellement. "On raconte une histoire, pas on vend un produit."

**Design Principle:** "Journey-based unfoldment"
**Emotional Arc:** Engagement through story
**Audience:** Story-responsive, narrative learners (L&D managers, educators)
**Key Features:**
- Sticky elements, progressive reveal
- Watercolor/organic visual language
- Left-heavy text layout (Gutenberg principle)
- Warm secondary tone for humanity

---

### V5 · FullPage → **`Immersion`** (ou `Fullscreen-Moment`)
**Rationale:** Chaque section full-viewport, scroll-driven experience. "Respire avec la page."

**Design Principle:** "One thing at a time, deeply"
**Emotional Arc:** Immersion + presence
**Audience:** Visual learners, executives (need impressive moments)
**Key Features:**
- Full-height sections
- WordSwap dynamic text
- Interactive app mockup hero
- Sticky progress/context

---

### V6 · HomeA → **`Refined`** (ou `Executive-Grade`)
**Rationale:** Clean, corporate-elegant. Balance entre sophistication et accessibilité. Perfect pour B2B enterprise.

**Design Principle:** "Professional polish"
**Emotional Arc:** Confidence through polish
**Audience:** Buyers, C-suite, enterprise teams
**Key Features:**
- Polished card-based grid
- Elegant spacing
- Minimal animation (micro-interactions only)
- Brand color as accent, not hero

---

### V7 · Cinematic → **`Cinematic`** (keep name, enhanced)
**Rationale:** "This is a studio film, not a brochure." Full-motion hero, cinematic reveals.

**Design Principle:** "Emotion before reason"
**Emotional Arc:** Wow → curious → convinced
**Audience:** Visual-first, trend-conscious, creators
**Key Features:**
- Video background hero (or motion bg)
- Parallax/scroll-driven animations
- Dramatic color shifts
- Large format typography

---

### V8 · Watercolor → **`Organic`** (ou `Hand-Painted`)
**Rationale:** Humanized, warm, almost analog feel. Watercolor/brush aesthetic throughout.

**Design Principle:** "Warm humanity, not cold tech"
**Emotional Arc:** Comfort + trust
**Audience:** Empathy-driven, educators, content creators
**Key Features:**
- Watercolor assets throughout
- Organic blob shapes
- Scroll-triggered animations
- Warm, tertiary color palette (secondary + accent)

---

## Summary Table

| Current | Proposed | Positioning | Emotion | Audience |
|---------|----------|-------------|---------|----------|
| V2 Light | **Clarity** | Information-first | Trust | Analysts |
| V4 Editorial | **Narrative** | Story-first | Engagement | Educators |
| V5 FullPage | **Immersion** | Experience-first | Presence | Executives |
| V6 HomeA | **Refined** | Polish-first | Confidence | Enterprise |
| V7 Cinematic | **Cinematic** | Motion-first | Wow | Creators |
| V8 Watercolor | **Organic** | Humanity-first | Warmth | Community |

---

## Section Layout Variations by Variant

### For Each Section Type, We Can Implement:

#### **Hero Section Layouts** (3 canonical options)
1. **Hero-Text-Right** (Current on V4, V5): Text dominant left, visual/bg right
2. **Hero-Text-Center** (Current on V2): Centered text over full-bg visual
3. **Hero-Full-Motion** (Current on V7): Video/motion as entire hero, text overlay

#### **3-Pillar Offres Section** (3 layout options)
1. **Grid 3-Col** (Current most): `grid-cols-3` cards, equal prominence
2. **2+1 Zigzag** (V8 approach): 2 cards top row, 1 card bottom (asymmetric)
3. **Sequential Card** (V5 approach): Full-width card tabs, one visible at a time
4. **Staggered Stack** (NEW): Cards fade in on scroll, staggered timing

#### **Pédagogie/Values Section** (3 layout options)
1. **Text-Left, Visual-Right**: Gutenberg (V4 current)
2. **Text-Top, Visual-Bottom**: Hero visual stacked (mobile-first on desktop too)
3. **2-Column Split**: True 50/50 split, visual as large as text

#### **Stats Section** (3 layout options)
1. **4-Col Grid**: Separate stat cards (current V6)
2. **Inline KPIs**: Numbers inline in paragraph text (V5)
3. **Vertical Metrics**: Large vertical stat bars with labels (NEW)
4. **Infographic**: Integrated visual stat display (NEW)

#### **CTA Section** (3 layout options)
1. **Hero-Style CTA**: Large heading + button, centered (V2 current)
2. **Card CTA**: Mini card with icon, text, button (V6 current)
3. **Embedded CTA**: CTA within last content section, no visual break

---

## Next Steps

1. **Finalize names** → Update MarketingVariantLab.tsx with new VARIANT_LABELS
2. **Map section layouts** → Document which layout each variant uses currently
3. **Propose layout remixes** → "What if V2 (Clarity) used the 2+1 Zigzag layout for Offres?"
4. **Create layout variations per variant** → For each variant, implement 2-3 section layout alternatives
5. **Side-by-side comparison** → Screenshots of each variant with alternative layouts

---

## Questions to Explore

- Should section layouts be **variant-specific** (each variant owns its preferred layouts) or **combinatorial** (any variant can use any layout)?
- Which sections benefit most from layout variation (Offres + Pédagogie seem highest impact)?
- Do we want to rename VARIANT_LABELS in code + files, or just in docs for now?

