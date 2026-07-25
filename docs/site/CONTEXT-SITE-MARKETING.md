# Contexte — Site marketing (projet séparé)

> **Ce qu'est ce projet.** Le site vitrine public de TLS, en React, vit dans `src/pages/marketing/*` (routes `/marketing/*`) **au sein de ce dépôt** mais se pilote comme un **projet distinct** de la Learning App. Ce doc est son contexte-maison : les règles qui lui sont propres (motion, structure), à ne PAS mélanger avec le `CLAUDE.md` racine (qui, lui, cadre l'app + le design system).

## Périmètre & code

- **Pages** : `src/pages/marketing/*` (`MarketingHome`, `MarketingLearningApp`, `MarketingAccompagnement`, `MarketingContact`, `MarketingDiagnostic`, `MarketingEquipe`, articles/dossiers/guides, `MarketingError404`…).
- **Layout** : `src/pages/marketing/components/` (`MarketingLayout`, `MarketingHeader`, `MarketingFooter`).
- **Primitives motion** : `src/components/marketing/motion/` — **le code est la source de vérité** (la liste ci-dessous est indicative et évolue : `MeshGradientBg`, `FadeInWhenVisible`, `ParallaxLayer`, `MagneticButton`, `GradientText`, `MarqueeRow`, `CountUp`, `StickyScrollStory`, `InteractiveAppMockup`, `KineticHeadline`, `NoiseTexture`…).
- Le **design system partagé** (tokens, règles Tailwind, gotchas) reste cadré par le `CLAUDE.md` racine — le site le réutilise. Ce doc ne couvre que le **surplus marketing-only**.

## Règles motion (marketing uniquement)

Ces primitives et libs sont **réservées au site marketing** — ne pas les importer dans la Learning App (mauvais contexte d'usage).

| Lib | Statut | Domaine |
|---|---|---|
| **`framer-motion`** | ✅ défaut | motion au niveau composant : enter/exit, layout, gestures, springs, stagger, `useInView`, `AnimatePresence` |
| **`gsap` + ScrollTrigger** | ✅ **préféré pour le scroll** | pinning, scrubbing, timelines multi-étapes (gratuit tous plugins depuis avril 2025) |
| **`three`** | 🟡 cas par cas | 3D/WebGL réel uniquement — bundle lourd, à justifier |
| **`lenis`** | ❌ **banni** | le smooth-scroll hijacke le scroll natif et dégrade l'a11y (refus documenté du scroll-jack) |

- **`useReducedMotion` est obligatoire** dans toute animation (désactiver / réduire à un fade si `prefers-reduced-motion: reduce`).
- **ScrollTrigger vs `useScroll`** : pinning/épinglage → **ScrollTrigger** (pin-spacer propre) ; scroll-linked simple (fade, opacité, zoom hero) → `useScroll` + `useTransform`. ⚠️ `position: sticky` est **neutralisé silencieusement** si un ancêtre porte `overflow: hidden/auto/scroll` — ScrollTrigger y est immunisé.

## Patterns & pièges (préservés du CLAUDE.md, 2026-07-25)

**Patterns** : hero immersif (`MeshGradientBg` + `ParallaxLayer` + `useScroll` scale/opacity) · CTA `MagneticButton` (strength 12-16 primary, 8 secondary) · ghost CTA sur fond sombre (`!text-white hover:!bg-white/10 !border !border-white/30`) · squiggly underline draw-on-scroll (`motion.path` + `pathLength`) · sticky storytelling (`key={i}` force le remount → anime l'entrée) · mockup tab indicator (`layoutId`) · FAQ accordion (`AnimatePresence` + `height:auto`) · horizontal scroll-snap timeline.

**Pièges** : `py-page-lg` n'existe pas (tokens de spacing s'arrêtent à `--spacing-page`/48px) · `whileInView` reste à l'état initial si `viewport.margin` négative et élément trop haut au mount (hero : garder ≥100px du top) · sur reduced-motion, forcer scale/opacity à 1 · `h-screen` (100vh) sur conteneur sticky mobile → tronqué + jitter, préférer `dvh` (`min-h-[100dvh]`).

## Anti-patterns

- ❌ Utiliser ces primitives motion dans la Learning App interne.
- ❌ Empiler 3+ primitives sur le même élément (parallax + magnetic + gradient text + fade = overkill).
- ❌ Animation lourde au-dessus du fold qui retarde le LCP.
- ❌ Oublier `useReducedMotion` dans une primitive custom.

## Marque, copy, faits (autres docs)

Le contenu / positionnement / faits du site ne vivent PAS ici — ils sont dans :
- [`docs/_canon/FACTS-CANON.md`](../_canon/FACTS-CANON.md) — **faits validés, prime sur tout** (7 modules/7h, Qualiopi jamais, Open Badge sans « 2.0 », « vous » sur le public…).
- [`docs/marketing/`](../marketing/) — `FAITS-OFFRES`, `MARQUE-VOIX`, `COPY-V2`, `COMPETITIVE-BRIEF`, `MARKETING-LINKEDIN`.
- [`docs/site/`](.) — structure/design/inspo du site (`SITE-V1-*`, `DESIGN-INSPO`, `ANIMATION-TECHNIQUES-RESEARCH`, `SEO-CONTENT-PLAN`…).

> Note : les préférences durables « pas de parallax buggé/daté », « pas d'AI slop » (barres d'accent, eyebrow partout, card-soup), registre éditorial/premium, sont en mémoire (`feedback_no_parallax`, `feedback_no_accent_border_bars`).
