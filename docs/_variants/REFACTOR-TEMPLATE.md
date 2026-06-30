# Refactor Template — Section Routers Integration

Guide étape-par-étape pour refactoriser chaque variante de homepage vers les section routers.

## Overview

Chaque variante a 7 sections. On refactorise progressivement :
- ✅ **Phase 1** : HeroSection, ConvictionSection (Clarity complet)
- ✅ **Phase 2** : OffersSection, MethodSection routers créés
- **Phase 2.5** : Refactor Pillars + Stride + CTA sur chaque variante (ce guide)
- Phase 3 : Figma exploration + modern 2026 alternatives

---

## Available Routers

```tsx
import { 
  HeroSection,      // layout: 'centered' | 'cinematic' | 'parallax' | 'static-image'
  ConvictionSection,// layout: 'quote-led' | 'callout-2col' | 'dark-stripe'
  OffersSection,    // layout: 'grid-3col' | 'editorial-index' | 'asymmetric'
  MethodSection,    // layout: 'grid-4col' | 'sticky-scroll' | 'accordion'
  CtaSection,       // layout: 'bold-centered' | 'card-overlap'
} from '../../components/marketing/sections';
```

---

## Step-by-Step Refactor

### Step 1 : Add imports

**Find:** Import lines at the top of `MarketingHome*.tsx`

**Replace:**
```tsx
import { 
  HeroSection, 
  ConvictionSection, 
  OffersSection, 
  MethodSection, 
  CtaSection 
} from '../../components/marketing/sections';
```

✅ File still compiles (npx tsc --noEmit)

---

### Step 2 : Refactor Pillars / Offers section

**Find:** The `const Pillars` or `const Offers` component in the file.

**Pattern to replace:**

```tsx
// ❌ BEFORE (hard-coded grid)
const Pillars: React.FC = () => (
  <section className="bg-white">
    <div className="max-w-page mx-auto px-6 py-page">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-stack-lg">
        {/* 3 cards */}
        {OFFERS.map(offer => (
          <div key={offer.id} className="bg-white rounded-2xl shadow-card">
            {/* card content */}
          </div>
        ))}
      </div>
    </div>
  </section>
);

// ✅ AFTER (using OffersSection router)
const Pillars: React.FC = () => (
  <OffersSection layout="grid-3col">
    {OFFERS.map(offer => (
      <div key={offer.id} className="bg-white rounded-2xl shadow-card">
        {/* card content — unchanged */}
      </div>
    ))}
  </OffersSection>
);
```

**No changes needed to card content inside.** Just wrap in router.

✅ Compile check: `npx tsc --noEmit`

---

### Step 3 : Refactor Stride / Method section

**Find:** The `const Stride` or `const Method` component.

**Pattern to replace:**

```tsx
// ❌ BEFORE (hard-coded 4-col grid)
const Stride: React.FC = () => (
  <section className="bg-white">
    <div className="max-w-page mx-auto px-6 py-page">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-stack-lg">
        {/* 4 numbered steps */}
        {STRIDE.map((step, i) => (
          <div key={i} className="flex flex-col gap-stack">
            {/* step content */}
          </div>
        ))}
      </div>
    </div>
  </section>
);

// ✅ AFTER (using MethodSection router)
const Stride: React.FC = () => (
  <MethodSection layout="grid-4col">
    {STRIDE.map((step, i) => (
      <div key={i} className="flex flex-col gap-stack">
        {/* step content — unchanged */}
      </div>
    ))}
  </MethodSection>
);
```

**Grid layout is now inside the router.** Remove `<section>`, `<div max-w-page>`, and `<div grid>` wrapper.

✅ Compile check: `npx tsc --noEmit`

---

### Step 4 : Refactor CTA section

**Find:** The `const FinalCta` or `const Cta` component.

**Pattern to replace:**

```tsx
// ❌ BEFORE (hard-coded gradient bg + centered)
const FinalCta: React.FC = () => (
  <section className="bg-gradient-to-b from-secondary-50 to-accent-50/40">
    <div className="max-w-page mx-auto px-6 py-page">
      <div className="text-center max-w-[44ch] mx-auto flex flex-col items-center gap-stack-lg">
        <h2>On parle de votre projet ?</h2>
        <p>30 minutes pour comprendre vos enjeux, sans engagement.</p>
        <Button>Réserver 30 min</Button>
      </div>
    </div>
  </section>
);

// ✅ AFTER (using CtaSection router)
const FinalCta: React.FC = () => (
  <CtaSection layout="bold-centered" tone="primary">
    <h2 className="font-display font-extrabold text-ink-900 tracking-tight m-0 text-[clamp(1.9rem,3.6vw,3rem)]">
      On parle de votre projet ?
    </h2>
    <p className="font-body text-body-lg text-ink-700 leading-relaxed m-0 max-w-[48ch]">
      30 minutes pour comprendre vos enjeux, sans engagement.
    </p>
    <Button variant="warm" size="lg" trailingIcon={<ArrowRight size={18} />}>
      Réserver 30 min
    </Button>
  </CtaSection>
);
```

**Background gradient, container, and text centering move into the router.** Pass only the content.

✅ Compile check: `npx tsc --noEmit`

---

## Per-Variant Reference

### MarketingHomeClarity ✅ (IN PROGRESS)

**Status:** Hero + Conviction done. Remaining:
- [ ] Refactor Pillars → OffersSection (line ~245)
- [ ] Refactor Stride → MethodSection (line ~306)
- [ ] Refactor FinalCta → CtaSection (line ~502)

**Section line numbers in file:**
```
Hero: line 76-112 ✅ (done)
Conviction: line 114-132 ✅ (done)
Audience: line 134-180
Pillars: line 182-250 ← use OffersSection
Stride: line 252-305 ← use MethodSection
Diagnostic: line 307-380
Proof: line 382-498
FinalCta: line 500-600 ← use CtaSection
```

**Refactor order :**
1. OffersSection (Pillars at line 245)
2. MethodSection (Stride at line 306)
3. CtaSection (FinalCta at line 502)

---

### MarketingHomeNarrative

**Status:** Hero imports ready. Sections to refactor:

**Section names in file :**
```
Hero: CinematicHero component (custom, keep as-is)
Conviction: Dark stripe, 12-col split (use ConvictionSection layout="dark-stripe")
Offers: Editorial index layout (use OffersSection layout="editorial-index")
Method: STRIDE callout, 12-col split (use MethodSection layout="grid-4col" or custom)
Proof: ParallaxSection (keep as-is, too custom)
CTA: Dark gradient section (use CtaSection layout="bold-centered" tone="dark")
```

**Action:** 
1. Refactor Offers → OffersSection layout="editorial-index"
2. Refactor Method → MethodSection (check if grid or keep ParallaxSection)
3. Refactor CTA → CtaSection tone="dark"

---

### MarketingHomeImmersion

**Status:** Hero 200vh sticky complex (keep as-is). Other sections:

**Section names:**
```
Hero: Custom 200vh parallax (keep — too specialized)
Conviction: Centered quote (use ConvictionSection layout="quote-led")
Offers: 3-col cards (use OffersSection layout="grid-3col")
Method: (check if exists — may be in Learning App section)
CTA: Gradient (use CtaSection layout="bold-centered" tone="primary")
```

---

### MarketingHomeRefined

**Status:** Mix of cards + grid. Check:

```
Hero: Static image (use HeroSection layout="static-image" or keep)
Conviction: Centered (use ConvictionSection layout="quote-led")
Offers: 2+1 zigzag (use OffersSection layout="asymmetric")
CTA: Card overlap style (use CtaSection layout="card-overlap")
```

---

### MarketingHomeCinematic

**Status:** Video-heavy. Sections:

```
Hero: Full-screen video (keep custom or use HeroSection layout="cinematic")
Conviction: Semi-transparent (use ConvictionSection layout="callout-2col")
Offers: 3-col in semi-transparent (use OffersSection layout="grid-3col")
CTA: Semi-transparent (use CtaSection layout="bold-centered")
```

---

### MarketingHomeOrganic

**Status:** Watercolor + fixed bg. Sections:

```
Hero: Parallax watercolor (use HeroSection layout="parallax" or keep)
Conviction: Semi-transparent (use ConvictionSection layout="callout-2col")
Offers: 3-col in semi-transparent (use OffersSection layout="grid-3col")
CTA: Semi-transparent (use CtaSection layout="bold-centered")
```

---

## Refactor Checklist (per variant)

For each variant:

- [ ] Add imports (all 5 routers)
- [ ] Refactor Hero (if needed — many are custom)
- [ ] Refactor Conviction
- [ ] Refactor Offers → OffersSection
- [ ] Refactor Method → MethodSection
- [ ] Refactor CTA → CtaSection
- [ ] Run `npx tsc --noEmit` → 0 errors
- [ ] Test in preview (`/marketing/_variants`) — visual check
- [ ] Commit: `refactor(variants): [VariantName] to section routers`

---

## Testing

After each refactor:

```bash
# Compile check
npx tsc --noEmit

# Dev server (should already be running)
# Navigate to http://localhost:5173/marketing/_variants
# Select your variant, verify it renders identically
```

---

## Common Mistakes

❌ **Removing FadeInWhenVisible** when wrapping in router
- Routers provide the section-level layout, not component-level motion
- Keep FadeInWhenVisible on content inside the router

❌ **Forgetting to remove inline `<section>`, `<div max-w-page>`, `<div grid>` wrappers**
- Routers provide these already
- Just pass the card/item content

❌ **Changing the `tone` prop incorrectly**
- Most variants use `tone="primary"` (default)
- Storyteller uses `tone="dark"` or `tone="warm"`
- Check CLAUDE.md for tone definitions

❌ **Not testing after each step**
- Compile + preview after each router swap
- Catch regressions immediately

---

## Next Steps

1. **Clarity** : Finish Offers + Method + CTA (3 refactors)
2. **Narrative** : Offers + Method + CTA (may be more custom)
3. **Immersion** : Conviction + Offers + CTA (Hero kept)
4. **Refined** : All 5 sections refactored
5. **Cinematic** : All 5 sections refactored
6. **Organic** : All 5 sections refactored

Once all 6 variants are refactored → **Phase 3: Figma modern 2026 exploration**.

---

## Example: Complete Clarity Refactor

Starting state (current):
```tsx
import { HeroSection, ConvictionSection, OffersSection, MethodSection, CtaSection } from '...sections';

// ✅ Hero: done
const Hero: React.FC = ({ reduce }) => (
  <HeroSection layout="centered" animation={!reduce}>
    <FadeInWhenVisible>
      <h1>L'IA au service des compétences</h1>
      {/* ... */}
    </FadeInWhenVisible>
  </HeroSection>
);

// ✅ Conviction: done
const Conviction: React.FC = () => (
  <ConvictionSection layout="quote-led">
    <FadeInWhenVisible>
      <h2>Les outils changent...</h2>
      {/* ... */}
    </FadeInWhenVisible>
  </ConvictionSection>
);

// ❌ Pillars: hard-coded grid → REFACTOR
const Pillars: React.FC = () => (
  <section className="bg-white">
    <div className="max-w-page mx-auto px-6 py-page">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-stack-lg">
        {PILLARS.map(p => <Card key={p.id}>{p.content}</Card>)}
      </div>
    </div>
  </section>
);

// → BECOMES:
const Pillars: React.FC = () => (
  <OffersSection layout="grid-3col">
    {PILLARS.map(p => <Card key={p.id}>{p.content}</Card>)}
  </OffersSection>
);

// ❌ Stride: hard-coded 4-col → REFACTOR
const Stride: React.FC = () => (
  <section className="bg-white">
    <div className="max-w-page mx-auto px-6 py-page">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-stack-lg">
        {STRIDE.map((s, i) => <StepCard key={i}>{s.content}</StepCard>)}
      </div>
    </div>
  </section>
);

// → BECOMES:
const Stride: React.FC = () => (
  <MethodSection layout="grid-4col">
    {STRIDE.map((s, i) => <StepCard key={i}>{s.content}</StepCard>)}
  </MethodSection>
);

// ❌ FinalCta: hard-coded gradient → REFACTOR
const FinalCta: React.FC = () => (
  <section className="bg-gradient-to-b from-secondary-50 to-accent-50/40">
    <div className="max-w-page mx-auto px-6 py-page">
      <FadeInWhenVisible className="text-center max-w-[44ch] mx-auto flex flex-col items-center gap-stack-lg">
        <h2>On parle de votre projet ?</h2>
        <p>30 minutes...</p>
        <Button>Réserver</Button>
      </FadeInWhenVisible>
    </div>
  </section>
);

// → BECOMES:
const FinalCta: React.FC = () => (
  <CtaSection layout="bold-centered" tone="primary">
    <FadeInWhenVisible className="flex flex-col items-center gap-stack-lg">
      <h2 className="font-display font-extrabold text-ink-900 tracking-tight m-0 text-[clamp(1.9rem,3.6vw,3rem)]">
        On parle de votre projet ?
      </h2>
      <p className="font-body text-body-lg text-ink-700 leading-relaxed m-0 max-w-[48ch]">
        30 minutes...
      </p>
      <Button variant="warm" size="lg">Réserver</Button>
    </FadeInWhenVisible>
  </CtaSection>
);
```

After refactor:
- 3 hard-coded sections → 3 router-based sections
- Grid layout logic moved to routers (reusable)
- Content unchanged (same cards, same text)
- Easier to swap layouts (change one prop)

✅ Run: `npx tsc --noEmit` → 0 errors
✅ Test: `/marketing/_variants` → Clarity variant looks identical
✅ Commit: `refactor(variants): Clarity to section routers`

---

## Result

After Phase 2.5 complete (all 6 variants refactored):
- **14 layout patterns** available via props
- **-30% duplication** across variant files
- **A/B testing ready** — swap `layout` prop to test
- **Modernization ready** — Phase 3 can add new layouts without touching variants

