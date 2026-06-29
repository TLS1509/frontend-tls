# Resources/Blog Design Mapping — Internal to Marketing

**Objective**: Apply internal learning app design patterns (ArticleDetail, Dossier, Magazine) to marketing-facing Resources/Blog pages.

**Completion Date**: 2026-06-29  
**Routes**: `/marketing/resources` (listing) · `/marketing/resources/:slug` (detail)

---

## Design Patterns Applied

### 1. **MarketingResources** (Landing Page)

Maps from: **Magazine** (internal hub) + **EditorialLayout** pattern

#### Components Integrated:
- **PageHero** (tone: brand) — Authority voice, learning society positioning
- **Filter system** — 5 categories (All / Articles / Dossiers / Guides / Tutorials)
- **Search bar** — Real-time filtering by title/summary
- **Featured card** — Hero card (latest article, 16:9-inspired)
- **Grid layout** — 3-column responsive, tone-aware cards
- **Newsletter signup** — Conversion CTA (mid-page + footer)
- **Related topics** — Click-through to filtered results

#### Design Tokens:
- Gradient covers per category (primary/secondary/accent/sun)
- Semantic spacing: `gap-stack`, `gap-stack-lg`, `gap-section`, `gap-page`
- Motion: `FadeInWhenVisible` + `MagneticButton` for CTAs
- Responsive: 1-col mobile → 3-col desktop

---

### 2. **MarketingResourceDetail** (Deep Read)

Maps from: **ArticleDetail** (internal) + **Dossier** (reading-focused)

#### Components Integrated:

**Header Section:**
- Reading progress bar (fixed top, linear gradient primary→secondary)
- Hero section with gradient background (tone-aware per article category)
- Back link + metadata (category, date, read time)
- Title + subtitle with clamp scaling
- Author strip + Share bar (copy link + social share)

**Body Section:**
- Drop cap intro (typography premium touch)
- Content blocks: h2/h3/p/ul/pullquote rendering
- Pull quotes with gradient backgrounds (3 tone rotation)
- Semantic spacing between blocks

**Key Features (from Dossier):**
- **Reading progress tracking** — useReadingProgress hook + fixed bar
- **Sticky TOC** (Table of Contents) — aside right, auto-highlighting active section
- **Key Findings callout** — Mid-page insight cards (TrendingUp + Users + Zap icons)
- **Conclusion card** — Styled callout with Star icon

**Navigation:**
- Prev/Next article cards (full width, grid layout)
- Related resources section (3-col grid, card layout)
- Visual hover states + smooth animations

#### Design Tokens:
- Reading progress: linear gradient from primary-500 → secondary-500
- TOC: left border accent (primary-600 active, ink-200 default)
- Key findings: primary gradient background + icon badges
- Conclusion: ink-50 background + Star accent color
- Responsive: full content on mobile, TOC hidden until lg breakpoint

---

## Design System Reuse

### From ArticleDetail (Internal):
✅ AuthorStrip pattern  
✅ Featured image 16:9 layout  
✅ IntroCallout (lead paragraph styling)  
✅ ReadingProgressBar + progress tracking  
✅ RelatedItemList (adapted as "related resources" grid)  
✅ Tags display  
✅ External link CTA  

### From Dossier (Internal):
✅ ReadingProgressRing (progress circle in TOC area)  
✅ TableOfContents (sticky, auto-highlighting)  
✅ KeyFindingCard (stat + icon + description)  
✅ Conclusion card styling  
✅ Download CTA → becomes Share buttons  
✅ ReaderContextStrip (adapted for marketing hero)  

### From Magazine (Internal):
✅ Sticky glass header pattern  
✅ Full-bleed hero with gradient  
✅ Dark background with ambient blobs  
✅ Eyebrow + title + metadata layout  
✅ Numbered entry list (adapted as category badges)  

### From MarketingArticleDetail (Existing):
✅ Section TOC with slug linking  
✅ Share bar (copy link + social)  
✅ BodyBlock renderer (h2/h3/p/ul/pullquote)  
✅ Prev/Next navigation cards  
✅ Related articles grid (3-col)  
✅ Category-based color mapping  

---

## Responsive Behavior

### Mobile (375px)
- Single-column layout
- TOC hidden (toggled in footer or slide-in)
- Featured card stacks above grid
- Newsletter form: stacked inputs
- Reading progress bar: thin fixed top

### Tablet (768px)
- 2-column grid for resource cards
- TOC still hidden
- Hero scaled down (clamp typography)

### Desktop (1440px+)
- 3-column resource grid
- Sticky TOC visible (aside right)
- Full hero visibility
- Smooth animations + hover states

---

## Key Differences: Internal vs. Marketing

| Aspect | Internal (ArticleDetail/Dossier) | Marketing (ResourceDetail) |
|--------|----------------------------------|---------------------------|
| **Auth context** | Premium user experience | Public, discovery-focused |
| **Share options** | Bookmark + download PDF | Share + copy link |
| **Related items** | Internal recommendations | Cross-category discovery |
| **CTA pattern** | Learning progression | Newsletter signup |
| **Reading guidance** | XP tracking + streaks | SEO meta tags |
| **Author metadata** | User profile links | Team branding (TLS) |

---

## Files Created

- `src/pages/marketing/MarketingResources.tsx` — Landing page with filters
- `src/pages/marketing/MarketingResourceDetail.tsx` — Deep-read experience

## Routes Added

- `GET /marketing/resources` → MarketingResources listing
- `GET /marketing/resources/:slug` → MarketingResourceDetail  
- `GET /marketing/ressources` → Alias (backward compat) → MarketingResources

---

## Next Steps

1. **Content enrichment** — Expand `src/data/marketingArticles.ts` with Dossiers/Guides/Tutorials types
2. **Featured topics** — Integrate dynamic topic filtering from article metadata
3. **Performance** — Lazy-load related articles + TOC scroll spy optimization
4. **Analytics** — Track reading progress + engagement per article type
5. **SEO** — Canonical tags + OG metadata per resource detail page

---

## Design Patterns Checklist

- [x] Reading progress bar (fixed top)
- [x] Sticky table of contents
- [x] Key findings callout (mid-page)
- [x] Pull quotes with gradients
- [x] Author metadata + share buttons
- [x] Prev/Next navigation
- [x] Related resources grid
- [x] Newsletter signup CTA
- [x] Responsive TOC hiding (md breakpoint)
- [x] Tone-aware category colors
- [x] Motion primitives (FadeInWhenVisible, MagneticButton)
- [x] Semantic spacing throughout
- [x] 100% Tailwind (no inline styles for layout)
