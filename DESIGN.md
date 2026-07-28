# DESIGN.md — Design system de la Learning App

> **Ce doc répond à une seule question : comment on compose une interface TLS.**
> Les principes, la taxonomie des composants, les patterns canoniques et les
> conventions de surface. Rien d'autre.
>
> **Refondu le 2026-07-28.** Il faisait 862 lignes, dont 64 mentions de phases
> révolues, deux sections numérotées « 4 », deux « 6 » et deux « 7 », un
> processus de synchronisation Notion déclaré obligatoire mais plus tenu, et des
> renvois vers `MIGRATION-PLAN.md` qui n'existe plus. Il racontait l'histoire de
> sa construction au lieu de décrire un état.

### Où trouver le reste

| Besoin | Doc |
|---|---|
| Règles strictes, tokens, pièges Tailwind, gate de build | [`CLAUDE.md`](./CLAUDE.md) |
| Stratégie produit, North Star, voix, anti-références | [`PRODUCT.md`](./PRODUCT.md) |
| Doctrine visuelle, altitudes, grammaire de pratique | [`DESIGN-IMPECCABLE.md`](./DESIGN-IMPECCABLE.md) |
| **Valeurs** des tokens | `src/index.css`, bloc `@theme` — **le code fait foi** |
| Showcase interactif | `/components` dans l'app |

⚠️ **Ce doc ne redéfinit aucune valeur de token.** Toute valeur recopiée ici
dériverait ; c'est exactement ce qui est arrivé au design system parallèle de
`brand/`, où cinq couleurs avaient silencieusement divergé.

### Les fichiers de style — il y en a cinq, et un seul fait foi

| Fichier | Lignes | Rôle | Statut |
|---|---:|---|---|
| **`src/index.css`** | 1048 | Bloc `@theme` = **tous les tokens**, les `@keyframes`, et les utilities que Tailwind v4 ne génère pas (`shadow-*`, `ease-*`, `duration-*`, `bg-gradient-*`) | ✅ **source de vérité unique** |
| `src/styles/globals.css` | 159 | Reset et sélecteurs d'élément, tout en `@layer base`. Importe les deux CSS ci-dessous | ✅ |
| `src/styles/design-tokens.css` | 622 | Alias legacy `--tls-*` pour le BEM résiduel. **Ne doit rien définir de neuf** | ⚠️ contient encore 9 doublons (voir CLAUDE.md, piège #3) |
| `src/components/modals/modals.css` | 387 | Pseudo-éléments et animations de modale | ✅ |
| `src/components/patterns/Flashcard.css` | 93 | Retournement 3D — impossible en utilities | ✅ |

**Il n'existe aucun fichier de tokens en JS ou TS.** Pas de `tailwind.config.js`
(supprimé le 2026-07-23, Tailwind v4 est CSS-first), pas de `theme.ts`, pas de
`spec.json`. Une valeur de design se lit à un seul endroit : le bloc `@theme` de
`src/index.css`.

**Les trois miroirs**, qui ne font jamais foi et se resynchronisent depuis le
code : le frontmatter YAML de `DESIGN-IMPECCABLE.md` (26 couleurs, **conforme au
2026-07-28**), le fichier Figma, et le miroir Claude Design.

---

## 1. Les six principes

1. **L'apprenant est protagoniste.** Chaque écran apprenant répond à « quelle est
   mon action maintenant ? » en moins de trois secondes. Action du jour en hero,
   historique secondaire, analytics tertiaire. Aucun écran ne sert deux rôles.
2. **L'IA est un instrument transparent, jamais un spectacle.** Label « IA »
   visible, source citée, score de confiance, bouton d'override accessible.
   Aucun dégradé violet « intelligence », aucune sparkle décorative.
3. **Une altitude par viewport.** Stratégique (CLO, manager) **ou** opérationnel
   (coach, apprenant), jamais les deux dans la même surface.
4. **La pratique validée prime sur la complétion.** La hiérarchie visuelle
   privilégie la preuve d'exécution. Les barres de progression de cours sont
   secondaires. Le Passeport est la source de vérité, pas le taux de complétion.
5. **La cadence hebdomadaire est respectée.** Pas de streak punitif quotidien,
   pas de notification le week-end par défaut, pause et reprise de première
   classe. L'atrophie se signale calmement, jamais en rouge.
6. **La chaleur est le fossé concurrentiel.** Le défaut de la catégorie est
   froid (LMS entreprise) ou froidement malin (SaaS IA). TLS gagne en étant
   chaleureux **et** rigoureux.

### La grammaire de la pratique

Verbes approuvés : *reprends, valide, soumets, maîtrise, pratique, réfléchis*.
Verbes bannis : *visionne, termine, complète, suis, consomme*.

Ce n'est pas cosmétique : le vocabulaire dit si on mesure une consommation ou
une maîtrise.

### Les quatre tones

| Tone | Rôle |
|---|---|
| **primary** | Cœur de l'app, focus, leadership |
| **warm** | Action, parcours en cours, jalons |
| **sun** | Réflexion, accomplissements, célébrations |
| **neutral** | Réglages, utilitaire, surfaces calmes |

Deux tones simultanés au maximum dans un même flow : un dominant, un accent.

---

## 2. Ce que les tokens couvrent

Les **valeurs** sont dans `src/index.css`. Ce qui suit dit seulement quoi
utiliser et quand.

**Couleurs** — quatre échelles 50→900 (primary teal, secondary orange, accent
jaune, ink gris) plus les sémantiques success/danger/warning/info, en teintes
sourdes et corail, jamais en primaires RGB.

**Typographie** — `font-display` (League Spartan) pour les titres, `font-body`
(Nunito) pour le texte, `font-mono` (JetBrains Mono) pour le code. Trois échelles :
titres `text-h1` → `text-h5`, texte `text-body-lg` → `text-micro`, et une échelle
d'affichage `text-display-xl` / `-lg` / `-md` réservée aux heros. Plus
`text-stat-value` pour les chiffres de KPI.

🚧 **Les tailles de titre et de corps sont en cours d'arbitrage** au banc d'essai
`/_design-lab` (sections *Tailles*, *Graisses*, *Taille optique*). Ne pas figer
d'échelle typographique dans un composant tant que l'arbitrage n'est pas rendu.

**Espacement sémantique** — `tight` · `stack-xs` · `stack` (défaut) ·
`stack-lg` · `section` · `section-lg` · `page`. **Toujours préférer le token
nommé à un `gap-4/6/8` générique** : il exprime l'intention plutôt qu'une valeur.

**Rayons** — `xs` · `sm` · `md` · `lg` · `xl` · `2xl` · `pill` (999 px).
⚠️ `rounded-pill`, jamais `rounded-full` qui vaut 50 % et produit un cercle.

**Ombres** — échelle neutre `xs→xl`, plus les teintées `shadow-brand-*`,
`shadow-warm-*`, `shadow-sun-*`. Les cards sans `tone` prennent la neutre, celles
avec un `tone` basculent sur la teintée correspondante.

**Profondeur** — `z-sticky` (20) · `z-dropdown` (30) · `z-overlay` (40) ·
`z-modal` (50) · `z-toast` (60) · `z-tooltip` (70). Jamais de valeur arbitraire.

**Opacité** — `/faint` · `/soft` · `/tinted` · `/medium` · `/disabled` ·
`/overlay`.

**Motion** — `duration-instant` (80 ms) · `duration-fast` (150 ms) ·
`duration-base` (200 ms, défaut) · `duration-slow` (300 ms) ·
`duration-glacial` (600 ms) · `duration-expressive` (800 ms). Courbes
`ease-standard` · `ease-decelerate` (entrées) · `ease-accelerate` (sorties) ·
`ease-emphasis`.

**Gradients de page** — 28 utilitaires `bg-gradient-*` en `@layer utilities`,
organisés en cinq familles : `page-ambient` (+ warm/sun), `brand-deep`,
`soft-pastel`, `cta-{brand|warm|sun|success}` et `bubble-*-light`, chacune
déclinée en variantes de direction (`-v`, `-h`, `-rev`, `-radial`). Utiliser
l'utilitaire pour une page canonique, la composition Tailwind pour de l'ad hoc.

---

## 3. Taxonomie des composants

Treize catégories **cibles**, avec un test d'appartenance simple.

⚠️ **Le showcase `src/pages/Components.tsx` n'est pas à jour** (audit du
2026-07-28) : il déclare **22 chaînes de catégorie**, dont un doublon de casse
(`Prompt Engineering` / `PROMPT ENGINEERING`) et sept catégories hors taxonomie
(`Core`, `Patterns`, `Content`, `EdTech`, `Management`, `IA & Pédagogie`,
`Data Visualization`, `Search & Filters`). Il manque par ailleurs une trentaine
de composants réels. Voir le détail en fin de doc.

```
 1. FOUNDATIONS        tokens + primitives de layout
 2. ATOMS              1 fichier = 1 élément UI indivisible
 3. COMPOSITES         wrappers de groupe (AvatarGroup, MetaPillGroup, Tabs)
 4. HEADERS & SECTIONS heroes · page headers · section headers · wrappers
 5. FEEDBACK           Alert · Toast · EmptyState · Celebration
 6. NAVIGATION         Sidebar · DropdownMenu · Breadcrumb · Tabs · Search
 7. CARDS              contenu unique · KPI · communication · learning · éditorial
 8. LISTS & FEEDS      grilles · fils chronologiques · listes · tableaux
 9. FORMS              formulaires composites (MultiStepForm, FormLayout)
10. LEARNING           gamification TLS (Medal, Quiz, Flashcard, CompetencyMatrix)
11. MODALS             base · booking · confirm/status · célébrations · média
12. AUTH FAMILY        AuthShell + sous-composants (spécification glass-dark)
13. PAGES & TEMPLATES  aperçus au niveau route
```

| Question | Catégorie |
|---|---|
| Élément UI indivisible ? | Atoms |
| Wrapper de plusieurs atomes ? | Composites |
| Hero, titre, structure ? | Headers & Sections |
| Card présentant **un** contenu ? | Cards |
| Collection ordonnée ? | Lists & Feeds |
| Navigation entre pages ? | Navigation |
| Notification, alerte ? | Feedback |
| Overlay modal ? | Modals |
| Gamification pédagogique ? | Learning |
| Formulaire multi-étapes ? | Forms |
| Famille AuthShell glass-dark ? | Auth Family |

---

## 4. Les conventions de card

> 🚧 **Section en cours de révision.** La composition et la hiérarchie interne
> des cards sont à l'arbitrage au banc `/_design-lab` (sections *Composition
> card* et *Variants Card*). Ce qui suit décrit la convention **actuellement
> implémentée**, pas une doctrine figée : les tailles de titre, de corps et les
> rapports de hiérarchie peuvent évoluer.

C'est la partie la plus structurante du système : elle garantit qu'une même card
s'adapte à quatre contextes sans être dupliquée.

### Deux axes obligatoires

Un pattern de card expose **`surface`** et un **état d'interaction**.

Le vocabulaire canonique à quatre valeurs ci-dessous est aujourd'hui porté par
quatre composants — `StatCard`, `ActionCard`, `IconFeatureCard`,
`QuickActionButton`. Neuf autres composants exposent un `surface` avec un
vocabulaire **divergent** (`tinted | plain`, `light | dark`, `solid-white`).
C'est une convergence à faire, pas un état acquis : tout nouveau composant prend
les quatre valeurs canoniques.

| `surface` | Fond | Usage |
|---|---|---|
| `card` (défaut) | blanc + bordure ink-200 | surface neutre standard |
| `tinted` (tone-aware) | `{tone}-50/60` + bordure `{tone}-100` | section thématique |
| `glass` | blanc/60 + flou léger | overlay sur fond coloré |
| `frosted` | blanc/40 + flou moyen + ombre | overlay prononcé (image de couverture) |

| État | Effet |
|---|---|
| Repos | `shadow-xs` ou rien |
| Survol (cards cliquables) | `hover:shadow-md hover:-translate-y-1` + bordure teintée |
| Pressé | `active:shadow-sm active:translate-y-0` |
| Focus | `focus-visible:outline-2 focus-visible:outline-{tone}-500` |
| Désactivé | `opacity-disabled cursor-not-allowed`, sans lift |
| Sélectionné | bordure 2px `{tone}-500` + `ring-2 ring-{tone}-100` |

**Pourquoi.** Une seule card sert la page blanche, la section thématique,
l'overlay de hero et la couverture image. On tune une map de surface, tous les
composants en héritent. Un dev qui connaît `IconFeatureCard` sait coder
`ProfileCard`.

Les maps de tone sont dans `src/lib/tone-classes.ts` — **importer, jamais
redéfinir inline**.

### Variant typé ou `className` ?

Si une combinaison de styles est réutilisée sur **deux instances ou plus**, elle
devient un variant typé. Sinon un `className` ponctuel suffit.

Un `className` bourré de `!important` est le signal qu'il manquait un variant.

### Les deux paires de glass

| Variant | Fond compatible |
|---|---|
| `glass` | **sombre** (hero brand, auth glass-dark) |
| `glass-light` + `glass-light-ghost` | **clair teinté** (Card `surface=tinted`) |

Couplage explicite : fond sombre → `glass`, fond clair teinté → la paire light.
Ce sont des variants du DS, pas des surcharges par page.

### Grilles de cards

`<CardGrid>` expose cinq layouts. **Le choix dépend du type de card hébergée.**

| `layout` | Colonnes | Pour |
|---|---|---|
| `compact` | 2 / 2 / 2 | tuiles denses et courtes |
| `default` | 1 / 2 / 3 | cards non carrées à contenu variable |
| `feature` | 1 / 2 / 4 | catalogue dense |
| **`square-tiles`** | **2 / 3 / 4** | **cards `square` — jamais une seule colonne** |
| `tiles` | 2 / 3 / 3 | mini-cards non carrées |

⚠️ Une card `aspect-square` en simple colonne mobile prend toute la largeur, donc
600 px de haut : un carré géant avec une icône perdue au centre. D'où
`square-tiles`, qui plancher à deux colonnes.

### Alignement dans une rangée

Pour que icône, titre et description s'alignent entre cards de hauteurs
différentes : ancrage haut (`justify-start`, jamais `justify-center`), zone
d'icône à hauteur fixe, et `items-stretch` sur la grille parente.

### Couleurs douces pour icônes et labels

Sur surfaces claires, utiliser les teintes **moyennes** plutôt que 600/700, trop
sombres — surtout pour le jaune : `primary-500`, `secondary-500`, `accent-400`.
Les 600/700 restent justes pour du texte de corps sur fond très clair, où le
contraste prime.

---

## 5. Familles de composants

Les décisions de rationalisation vivent dans [`CLAUDE.md`](./CLAUDE.md), qui fait
foi. En résumé :

- **Badge** — `Badge.tsx` est canonique, trois exports (`Badge`, `StatusBadge`,
  `TrendingBadge`). Ne jamais créer un nouveau fichier badge.
- **Breadcrumb** — `ui/Breadcrumb.tsx` canonique, `variant: simple | nav`.
- **Pills** — cinq composants distincts sur une primitive `Chip` commune. Ne pas
  les fusionner : leurs API diffèrent fondamentalement.
- **Card** — un seul fichier, **dix** variants (`default`, `feature`, `elevated`,
  `interactive`, `glass`, `glass-brand`, `glass-warm`, `glass-dark`, `minimal`,
  `tinted`). `bordered`, `muted` et `sunken` ont été retirés le 2026-07-24, sans
  aucun usage. Tous les wrappers dérivés ont été supprimés.
- **Heroes** — deux patterns : `HeroSection` (actionnable) et `PageHero`
  (éditorial, alias `EditorialHero`).

---

## 6. Tone par domaine fonctionnel

> 🚧 **Table à rejouer.** Elle a été posée cahier par cahier, avant le travail en
> cours au `/_design-lab` sur la hiérarchie des cards et les gris de texte. Elle
> reste la référence tant qu'on n'a pas tranché, mais elle n'est pas gravée :
> deux tones dominants voisins (Parcours et Analytics tous deux `primary`) ne
> distinguent rien à l'usage.

Chaque cahier porte un tone dominant et, éventuellement, un accent. Cette table
n'est pas dérivable du code : c'est une décision.

| Domaine | Dominant | Accent |
|---|---|---|
| Parcours | primary | warm |
| Veille | warm | sun |
| Passeport | primary | sun |
| Onboarding | warm → brand *(une seule transition)* | — |
| Coaching | warm | primary |
| Gamification | sun | primary |
| Enterprise | primary | neutral |
| Journal | warm | sun |
| Masterclass | brand | primary |
| Notifications | neutral | selon le type |
| Analytics | primary | neutral |
| Projets | primary | warm |
| Abonnements | primary | neutral |
| Chatbot | warm | primary |
| Fonctionnalités IA | brand | primary |
| Centre d'aide | neutral | primary |
| Conformité | primary | neutral |

---

## 7. Responsive et accessibilité

**Mobile d'abord.** Colonne unique par défaut. Points de rupture `md` 768 ·
`lg` 1024 · `xl` 1280. Sidebar en tiroir sous 768 px, en ligne à 220 px sur
tablette, 260 px sur desktop avec repli possible.

**Verre.** `backdrop-blur-glass-{light|medium|heavy}` (8 / 16 / 24 px), plus
`backdrop-blur-ambient` (60 px) pour les halos de fond — attention, celui-ci n'a
**pas** de segment `glass` dans son nom. Sur surfaces teintées ou dégradés
uniquement, jamais sur un fond blanc plat où il ne produit rien qu'un coût de
rendu.

**Accessibilité.** Les seuils réels : WCAG 2.2 AA impose 24×24 px, AAA et Apple
imposent 44×44. **Règle TLS : 44 px sur les actions principales, 24 px minimum
partout.** Focus visible obligatoire sur tout élément focusable custom. Ordre de
tabulation logique, Échap ferme les overlays, flèches pour les menus.

⚠️ **Contraste** : `primary-600` est à 3,66:1 et **échoue AA** pour du texte
normal. Texte blanc uniquement sur `primary-700` et au-delà.

---

## 8. Pour les assistants IA

1. **Lire `CLAUDE.md` en priorité** — il porte les règles strictes et les pièges.
2. **Espacement sémantique toujours** : `gap-stack`, jamais `gap-4`.
3. **Tokens toujours** : `bg-primary-500`, jamais un hexadécimal en dur.
4. **Le gate est `npm run build`**, pas `npx tsc --noEmit`. Ce dernier ne suit
   pas les références de projet et rate des erreurs que le build attrape.
5. **Vérifier la cascade CSS** avant de conclure qu'un style ne s'applique pas.
6. **Contrôler mobile et desktop** avant de déclarer une page finie.
7. **Aucun nouveau fichier CSS** : tout passe par `@theme` et Tailwind.
8. **Aucun `style={{}}`** sauf valeur calculée au runtime.
9. **Mettre à jour le showcase** `Components.tsx` quand un composant change.

---

## 9. État du showcase `/components` — audit du 2026-07-28

Le showcase a divergé du code. Chiffres mesurés, pas estimés : **320 composants
exportés** dans `src/components/`, **185 noms déclarés** dans
`src/pages/Components.tsx`.

**Ce qui manque et qu'il faut ajouter (19).** Des composants d'app réels, dont
plusieurs structurants : `PageHero` (le hero le plus consommé de l'app),
`Chip` (la primitive des quatre pills), `ErrorPage`, `Tooltip`, `SegmentedControl`,
`SettingsRow`, `SelectableOptionCard`, `ReaderContextStrip`, `CoachRow`,
`CorrectionStatusBar`, `Kbd`, `AuthSuccess`, `SelectCheckboxFloating`,
`ChartDetailModal`, `ChartWithExport`, `CompletionModal`.

**Ce qui manque mais se discute (10).** Les six primitives de `layout/`
(`PageShell`, `Container`, `Grid`, `Stack`, `Cluster`, `BottomNav`) et les quatre
squelettes de `SkeletonTemplates`. À trancher : un showcase de composants doit-il
exposer ses primitives de mise en page ?

**Ce qui ne doit pas y entrer (57).** Les 19 explorations de logo
(`LogoANode`… `V6LogoElectrique`, `TlsLogoHeritage`, `TlsLogoModernized`) — ce
sont des propositions, pas le DS ; et les 38 composants marketing et motion, qui
relèvent du site, pas de la Learning App.

**Ce qui est déclaré mais n'existe pas (2).** `EditorialCard` et
`SearchWithFilters_F` — entrées mortes à retirer.

**Code mort à supprimer, découvert au passage.** 18 composants de
`marketing/motion/` et `marketing/scroll-effects.tsx` n'ont plus aucun
consommateur après le nettoyage motion : `CountUp`, `MarqueeRow`, `ParallaxLayer`,
`ScrollRevealCanvas`, `ScrollVelocity`, `TiltCard`, `badge-earn-animation`,
`chat-message-stagger`, `counter-animation`, `floating-particles`,
`hover-lift-card`, `lesson-progress-arc`, `morphing-svg-visualizer`,
`parallax-text-layers`, `score-counter`, `shimmer-loading`, `spotlight-border`,
et tout `scroll-effects.tsx` — qui porte encore `ParallaxSection`, un effet
explicitement écarté. Plus le dossier `marketing/sections/` en entier (cinq
fichiers, jamais importés, dont un `HeroSection` en `h-screen`).

---

**Ce qui n'est plus ici, et pourquoi.**
La synchronisation Notion du design system (elle n'est plus tenue), le catalogue
de pages par tier (statut figé à une phase révolue), les inventaires de patterns
avec compteurs d'usage (ils périment à chaque commit), l'historique des phases 10
à 18, et la liste des pièges Tailwind — qui vit dans `CLAUDE.md`, seul endroit où
elle est maintenue.
