# Contexte — Site marketing (projet séparé)

> **Ce qu'est ce projet.** Le site vitrine public de TLS, en React, vit dans `src/pages/marketing/*` (routes **`/website/*`** — depuis `e48aa13` du 03/07 ; l'ancien `/marketing/*` est périmé) **au sein de ce dépôt** mais se pilote comme un **projet distinct** de la Learning App. Ce doc est son contexte-maison : les règles qui lui sont propres (motion, structure), à ne PAS mélanger avec le `CLAUDE.md` racine (qui, lui, cadre l'app + le design system).

## Périmètre & code

- **Pages** : `src/pages/marketing/*` (`MarketingHome`, `MarketingLearningApp`, `MarketingAccompagnement`, `MarketingContact`, `MarketingDiagnostic`, `MarketingEquipe`, articles/dossiers/guides, `MarketingError404`…).
- **Layout** : `src/pages/marketing/components/` (`MarketingLayout`, `MarketingHeader`, `MarketingFooter`).
- **Primitives motion** : `src/components/marketing/motion/` — **le code est la source de vérité** (la liste ci-dessous est indicative et évolue : `MeshGradientBg`, `FadeInWhenVisible`, `ParallaxLayer`, `MagneticButton`, `GradientText`, `MarqueeRow`, `CountUp`, `StickyScrollStory`, `InteractiveAppMockup`, `KineticHeadline`, `NoiseTexture`…).
- Le **design system partagé** (tokens, règles Tailwind, gotchas) reste cadré par le `CLAUDE.md` racine — le site le réutilise. Ce doc ne couvre que le **surplus marketing-only**.

## Rythme de section — relevé du 2026-09-16

> **C'est un constat, pas une consigne.** Une version de ce doc disait de
> reprendre ces valeurs **à l'identique** pour toute nouvelle page : c'est
> l'instruction qui a produit sept heros jumeaux. Une page a le droit de s'en
> écarter si sa composition le demande.
>
> 🔄 **Remesuré le 16/09**, parce que la version du 28/07 décrivait un état que
> la migration éditoriale a rendu minoritaire. Les chiffres ci-dessous sont
> comptés dans `src/pages/marketing/*.tsx`.

| Rôle | Ce que le repo utilise | Ancienne forme, encore présente |
|---|---|---|
| **Section** | `py-band` — **7 fichiers** | `py-16 sm:py-20 lg:py-28` — 3 |
| **Hero de sous-page** | `pt-hero` — **8 fichiers** | `pt-36 sm:pt-40 lg:pt-44` — 2 |
| **Titre ↔ contenu** | `gap-flow` — **9 fichiers** | `gap-section-lg` — 2 |
| **Gouttière** | `px-gutter` — **1 fichier** | `px-4 sm:px-6 lg:px-10` — **15** |

**Trois migrations sur quatre ont pris.** Les tokens éditoriaux du 29/07
(`band`, `hero`, `flow`) sont majoritaires, et ce qui reste de l'ancienne forme
vit dans les pages de contenu — Article, Dossier, Méthode, Guide — restées hors
de la passe.

⚠️ **La quatrième n'a pas pris du tout.** `--spacing-gutter` (16 → 40 px) a été
créé le 29/07 avec les six autres, et **un seul fichier le consomme**. Les quinze
autres gardent `px-4 sm:px-6 lg:px-10`, qui reste d'ailleurs la gouttière
standard de `CLAUDE.md`. Deux vocabulaires pour la même marge, donc, et le token
n'a pas gagné : soit on le déploie, soit on le retire — le laisser à un usage,
c'est garder une troisième valeur latente qui ressortira au mauvais moment.

- **Conteneur** : `max-w-wide mx-auto`. Lecture longue : `max-w-content`.
- **Intra-bloc** : `gap-stack` / `gap-stack-lg`, tokens sémantiques.

## Motion

> **Réécrit le 2026-07-28.** La version précédente listait un « pattern » par
> type d'élément : hero = `MeshGradientBg` + `ParallaxLayer` + `useScroll`,
> CTA = `MagneticButton` strength 12-16. Résultat : douze pages ont porté les
> mêmes effets, non parce que quelqu'un les avait choisis mais parce que le doc
> les avait décidés d'avance. Ces usages ont été retirés du code le 28/07 ;
> les composants restent disponibles dans `src/components/marketing/motion/`.
>
> **Ce doc ne prescrit plus de vocabulaire.** Il ne pose que ce qui ne se
> discute pas. Le reste se décide page par page, en phase design.
>
> **Mis à jour le 2026-07-29 : plus aucun interdit d'effet.** Les mentions
> « le parallaxe est un effet écarté » et l'exclusion de `lenis` / du
> scroll-jack sortent des invariants. La direction motion du site est à
> rejouer entièrement dans une passe dédiée ; d'ici là, **rien n'est ni
> prescrit ni banni** côté effets.
>
> 📌 **Précision du 2026-09-16 : « à rejouer » vaut pour le motion, pas pour
> toute la direction.** La direction artistique existe — [`BRIEF-REDESIGN-SITE-V1.md`](BRIEF-REDESIGN-SITE-V1.md)
> §4, « le soin doit être dans la matière, pas dans le mouvement ». Elle tranche
> même en partie le sujet d'ici : elle met le travail dans la matière
> *précisément pour* ne pas le mettre dans les effets.

### Les invariants

Trois règles, et elles ne sont pas négociables parce qu'elles protègent des
gens ou des chiffres, pas un goût.

1. **`prefers-reduced-motion` est respecté partout.** Toute animation dégrade
   proprement. Sans exception, y compris dans une primitive maison.
2. **Le contenu n'est jamais conditionné à une animation.** Une révélation
   enrichit un état déjà visible : on anime la position, pas l'existence. Un
   `initial={{ opacity: 0 }}` dont l'animation ne part pas (onglet en arrière-plan,
   rendu headless, moteur throttlé) laisse une page blanche avec un HTML intact.
   `FadeInWhenVisible` porte un garde-fou pour ce cas ; les animations écrites à
   la main doivent l'éviter par construction.
3. **Rien de lourd au-dessus de la ligne de flottaison** qui retarde le LCP.

Le détournement du scroll (`lenis`, scroll-jack) **n'est plus un interdit** — il
était listé ici comme quatrième invariant jusqu'au 29/07. C'est désormais un
arbitrage de la passe motion à venir, avec sa contrepartie connue : un scroll
détourné casse le défilement natif et complique l'accessibilité. À décider en
connaissance de cause, pas d'avance.

Au-delà de cinq secondes, une animation qui démarre seule doit pouvoir être mise
en pause (WCAG 2.2.2, niveau A). Le hero de l'accueil en est l'exemple.

### Ce qui n'est PAS une règle

Le choix des effets. Il n'existe pas de « motion par défaut » pour un hero, un
CTA ou une carte. Un effet se justifie par ce qu'il fait comprendre, pas par sa
présence au catalogue. Deux pages voisines n'ont aucune obligation de bouger
pareil, et une page sans motion peut être le bon choix.

Corollaire : **ne pas relire ce doc comme une liste de courses.** Si une page
appelle un traitement qui n'est mentionné nulle part ici, c'est normal.

### Outils

`framer-motion` est le défaut. `gsap` + ScrollTrigger pour le scroll complexe
(pinning, scrubbing, timelines) — gratuit tous plugins depuis avril 2025.
`three` seulement si de la 3D réelle est en jeu, le bundle est lourd.

⚠️ `position: sticky` est **neutralisé silencieusement** si un ancêtre porte
`overflow: hidden/auto/scroll` — ScrollTrigger y est immunisé, `useScroll` non.

### Pièges techniques

Ce sont des connaissances, pas des contraintes.

- `py-page-lg` n'existe pas : les tokens de spacing s'arrêtent à `--spacing-page` (48 px).
- `whileInView` reste à l'état initial si `viewport.margin` est négative et que
  l'élément est trop haut au montage (hero : garder ≥ 100 px du haut).
- `h-screen` (100vh) sur un conteneur sticky mobile → tronqué et jitter au scroll.
  Préférer `dvh` (`min-h-[100dvh]`).
- Ne pas mélanger les utilities Tailwind `translate-*` avec un keyframe
  `transform: translate(...)` : en Tailwind v4 ce sont deux propriétés distinctes
  qui s'additionnent.
- Ces primitives sont réservées au site marketing : ne pas les importer dans la
  Learning App, ce n'est pas le même registre.

## Marque, copy, faits (autres docs)

Le contenu / positionnement / faits du site ne vivent PAS ici — ils sont dans :
- [`docs/_canon/FACTS-CANON.md`](../_canon/FACTS-CANON.md) — **faits validés, prime sur tout**. Révisé le 16/09 : il connaît les six décisions du 31/08.
- [`docs/site/BRIEF-REDESIGN-SITE-V1.md`](BRIEF-REDESIGN-SITE-V1.md) — **le chantier et sa direction artistique** (§4). C'est là que vit la matière ; ce doc-ci ne couvre que le motion et la technique.
- [`docs/site/propositions-PAD/`](propositions-PAD/) — la copy arbitrée des neuf pages.
- [`docs/site/DESIGN-INSPO.md`](DESIGN-INSPO.md) — la bibliothèque Mobbin et le fil « décor peint ».

> ⚠️ **Corrigé le 2026-09-16 — cette liste envoyait vers des archives.**
> `docs/marketing/` a été archivé **en entier** le 28/07 : `FAITS-OFFRES`,
> `MARQUE-VOIX`, `COPY-V2`, `COMPETITIVE-BRIEF` sont une **production IA de juin
> 2026**, lue sept semaines comme de la doctrine. Ne pas s'en servir comme source.
> Idem pour `SITE-V1-*`, `ANIMATION-TECHNIQUES-RESEARCH` et `SEO-CONTENT-PLAN`,
> archivés le 28/07 — le dernier parce que son pilier a été abandonné.

> Note : la préférence durable « pas d'AI slop » (barres d'accent, eyebrow partout, card-soup) et le registre éditorial/premium sont en mémoire (`feedback_no_accent_border_bars`). Côté effets et animations, **il n'y a plus de préférence enregistrée** — la mémoire `feedback_no_parallax` a été supprimée le 29/07, la direction motion est à refaire.
