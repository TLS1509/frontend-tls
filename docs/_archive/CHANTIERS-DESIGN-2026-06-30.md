# Chantiers design — sept écarts « premium »

> ### Instantané daté, pas une doctrine
>
> **Sorti de `DESIGN-IMPECCABLE.md` le 2026-07-28.** Ces sept chantiers y
> vivaient en fin de fichier, avec des statuts (« ✅ Phase 19.D », « deferred »,
> « not started »). Un backlog dans un doc de doctrine périme plus vite que tout
> le reste, et il se lit comme une règle alors que c'est une intention.
>
> **État constaté le 2026-06-30.** Certains points sont depuis dépassés : le
> chantier 4 dit que le motion « ne vit que sur `/marketing/*` », or cette route
> est morte depuis le 03/07 et la couche motion décorative a été retirée du site
> le 28/07.
>
> À relire comme une liste d'intentions, à re-décider avant d'agir.

A second-altitude critique surfaces seven gaps where TLS could move from "tasteful French EdTech" to "category-defining." Captured here for the ongoing Phase 19 design excellence pass — partially addressed, partially in roadmap.

### 1. The display system is conservative

League Spartan 700 + tracking -0.02em is correct but tame. Linear and Vercel push display tracking to -3.0px at 80px (≈4% of size); TLS currently caps at -0.02em (≈2%). **Action:** test `tracking-[-0.04em]` on Display and Headline tokens; reserve the tightest tracking for sizes ≥48px. *Status: ✅ Phase 19.D — tracking-display (-0.03em) applied to EditorialHero h1, SectionHeader lg, Card title lg. tracking-headline (-0.025em) for md/sm. Headings across 100+ pages now noticeably tighter.*

### 2. No dark mode and no doctrinal choice not to have one

The system runs light-only by inheritance, not by decision. **Action:** commit to light-only with the doctrine *"The Daytime Atelier Rule — the brand is afternoon coastal light, never night"* OR design a proper dark mode for sleep/journal contexts. The current ambiguity is a category reflex. *Status: light-only locked implicitly; doctrine to write.*

### 3. The illustration system is absent

Headspace, Duolingo, and Notion all carry a signature illustration language. TLS uses Lucide icons (excellent for chrome) but has no custom illustration vocabulary for empty states, onboarding moments, or celebration screens. **Action:** commission or define a 4-shape geometric illustration grammar in the coastal teal + amber + sun palette. **Anti-pattern explicit:** no mascotte, no cute character, no anthropomorphic learning-buddy. *Status: deferred — explicit anti-mascotte rule confirmed.*

### 4. Motion lives only in the marketing site

framer-motion is wired for `/marketing/*` (9 primitives) but the product surface has only Tailwind transitions. **Action:** define 3–5 product-safe motion primitives — `StaggerList` for dashboard sections, `CelebrateOnce` for badge unlocks (rare, doctrinal), `ProgressMorph` for the parcours progression ring. Motion budget ≤200ms per interaction. *Status: not started — Phase 19.x candidate.*

### 5. The shadow vocabulary is generic at rest

The shadow scale (`shadow-xs` → `shadow-xl`) uses standard black-with-opacity drops. Tone-tinted shadows exist but are reactive (hover-only). **Action:** define a resting-state warm shadow — every card at rest carries a faint amber-tinted shadow rather than neutral black-10%. *Status: ✅ Phase 19.D — `--shadow-card` (amber 7% + black 5%), `--shadow-card-hover`, `--shadow-card-lift` tokens added. Card.tsx default/feature/elevated/interactive use shadow-card family. Subtle warmth at rest, visible in DevTools: `rgba(237, 132, 58, 0.07)`.*

### 6. The component library has 51 ui + 40 patterns = 91 names

Headspace ships ~12 core components. Linear's documented set is ~20. **Action:** Phase 19 consolidation pass — collapse `Pill` / `MetaPill` / `Tag` / `FilterChip` decisions into a doctrine table; archive truly-deprecated files; aim for ≤60 component surfaces total. *Status: ✅ Phase 19.A — Chip.tsx primitive extraced (shared CHIP_BASE/SIZE/TONE tokens). 4 wrappers refactored. Single doctrine table in CLAUDE.md §"Famille Pills". AuthFeature removed (Phase 19.C). HeroSection retired (Phase 19.B). Consolidated from ~91 → ~82 named surfaces.*

### 7. No signature interaction

Linear has the command palette. Notion has slash commands. Duolingo has the streak flame. Headspace has the breathing circle. TLS candidates: the parcours progress ring as persistent dashboard widget; the journal "moment marker" timeline; the competence-evidence linker as hover-revealed graph; the Dreyfus radar morphing on mastery progression. **Action:** pick one and make it the brand's UX signature. *Status: candidate identified (Dreyfus radar with atrophy-fade animation), to scope in Phase 19.x.*
