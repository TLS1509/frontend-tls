# CLAUDE.md — The Learning Society : Règles du projet

## Projet

**The Learning Society** — Plateforme EdTech.
Stack : React 19 · TypeScript 6 · Vite 8 · **Tailwind CSS 4** · React Router 7 · Zustand 5 · Lucide React

---

## Architecture

```
src/
├── components/
│   ├── core/        Button, Card, Input, Select, FormGroup
│   ├── ui/          Badge (incl. StatusBadge+TrendingBadge), Alert, Avatar, Modal, Toast, StatCard, TlsLogo… (87 fichiers)
│   ├── patterns/    ParcoursCard, CardGrid, SectionHeader, PageHeader, HeroSection,
│   │                EditorialHero, AuthShell, EditorialLayout, SectionCard,
│   │                RelatedItemList, ResumeLessonCard, ViewerHeader, AmbientBlobs… (62 fichiers)
│   ├── learning/    LessonCard, ArticleCard, SessionCard, VideoCard, PromptCard, AstucesCard, ResourceListItem…
│   ├── modals/      BookingModal, SuccessModal, VideoPlayerModal…
│   ├── cards/       NotificationCard, JournalEntryCard, JournalBubbleCard, JournalTypeTile
│   ├── forms/       FilterBar
│   └── layout/      Sidebar, NavItem
├── pages/           149 pages à la racine + 28 en sous-dossiers = 177 (route-level)
├── styles/          design-tokens.css, globals.css
│                    (tls-components.css supprimé — migration Tailwind ;
│                     dark-mode-tokens.css + hooks/useTheme.ts supprimés le
│                     2026-07-28 : le dark mode n'avait jamais été demandé ni
│                     configuré, et surchargeait les couleurs sémantiques avec
│                     du RGB brut — vert #22C55E et rouge #EF4444, interdits.
│                     À reconstruire proprement sur la palette TLS si besoin)
└── (src/design-system/ supprimé le 2026-07-23 : spec.json périmé, jamais importé.
     Règles d'usage → docs/_canon/REGLES-USAGE-COMPOSANTS.md ;
     valeurs → bloc @theme de src/index.css)
```

## Familles de composants — Décisions de rationalisation (2026-05-09)

### Badges — Badge.tsx est le fichier canonique
`Badge` contient maintenant 3 exports publics :
- `Badge` — text status badge (variant: brand/neutral/warm/sun/success/danger/info)
- `StatusBadge` — lesson state indicator avec icône (locked/available/in-progress/completed/failed)
- `TrendingBadge` — gradient promo badge animé (trending/popular/recommended/featured/new)

`StatusBadge.tsx` et `TrendingBadge.tsx` sont des thin re-exports depuis `Badge.tsx` (rétrocompat).
**Ne jamais créer de nouveaux fichiers badge séparés** — étendre `Badge.tsx` à la place.

### Breadcrumb — ui/Breadcrumb.tsx est le fichier canonique
`Breadcrumb` supporte `variant: 'simple' | 'nav'` :
- `simple` (défaut) : `<a>` links, séparateur texte custom, sticky optionnel
- `nav` : `<button>` interactifs, ChevronRight, ellipsis collapse (`maxVisible`), `onNavigate` callback, `current` prop, `icon` sur items

`BreadcrumbNav.tsx` = thin re-export `export { Breadcrumb as BreadcrumbNav }`.
**Utiliser `<Breadcrumb variant="nav">` pour les nouveaux usages.**

### Famille Pills — 4 wrappers sur Chip primitive (Phase 19.A · 2026-05-26)
Depuis Phase 19.A, les 4 chips consomment **`ui/Chip.tsx`** (primitive interne) qui owne les style tokens partagés : `CHIP_BASE`, `CHIP_SIZE`, `CHIP_TONE_SOLID`, `CHIP_TONE_SOLID_ACTIVE`, `CHIP_TONE_HOVER`, `CHIP_SURFACE_MAP`, `CHIP_INTERACTIVE`. Helper `resolveChipClasses({size, tone, surface, interactive, hover})` retourne la chaîne complète.

**4 wrappers publics conservés** (APIs spécialisées, pas de fusion) :

| Composant | Usage |
|-----------|-------|
| `Pill` | glass/surface chip — hero overlays, compteurs. `children: ReactNode`, pas de tone. Variants : `surface` / `glass-light` / `glass-dark`. |
| `MetaPill` | metadata chip — cards. `text: string`, `tone: semantic`. Clickable optionnel → rend un **vrai `<button>`** (Phase 19.A fix : avant c'était `role="button"` span, anti-pattern WCAG). |
| `MetaPillGroup` | layout wrapper pour tableaux de MetaPills. |
| `Tag` | removable filter chip avec X button. |
| `FilterChip` | toggle interactif avec active state gradient. |

**Ne pas fusionner** — APIs fondamentalement différentes (ReactNode vs string, glass vs tones).

### Patterns éditoriaux & layout (introduits 2026-05-09 → 2026-05-10)

| Composant | Usage canonique |
|-----------|-----------------|
| `patterns/EditorialHero.tsx` → exports **`PageHero`** (canonical) + `EditorialHero` (alias) | Hero universel page-opening. `tone: default \| brand \| warm \| sun`. **`brand`** (gradient saturé primary-500→700, texte blanc) = Dashboard, Journal. Autre tons = auth/éditoriales/detail. **Consommé par 101+ pages.** Phase 19.B-2026-05-26 : renommé `EditorialHero` → `PageHero` (nom universel). `EditorialHero` reste un alias rétrocompat + nom canonical pour surfaces réellement éditoriales (Magazine, Veille, Articles). Nouveaux usages → `PageHero`. |
| `patterns/AuthShell` | Layout split-screen pour pages auth. Sous-composants : `AuthDivider`, `AuthSocialButton`, `AuthSuccess`, + champs glass-dark (`AuthField`, `AuthPasswordField`, `AuthCheckbox`) + boutons (`AuthPrimaryButton`, `AuthGhostButton`). Consommé par Login, Signup, ForgotPassword, ResetPassword, MagicLink, VerifyEmail. ⚠️ **`AuthFeature` est toujours dans `AuthShell.tsx`**, marqué `@deprecated` et sans aucun consommateur (vérifié 2026-07-28 ; CLAUDE.md l'annonçait supprimé à tort). Ne pas l'utiliser — passer des `<div>` dans la prop `aside`. |
| `patterns/EditorialLayout` | 2-col main + sticky aside, stack mobile-first. Pour pages MagazineArticle, ArticleDetail, Newsletter, WeeklyNewsDetail, Project, etc. (7 pages). |
| `patterns/SectionCard` | Card sectionnée — title + description + footer actions. Pour blocs autonomes dans pages éditoriales. (8 pages) |
| `patterns/RelatedItemList` | Liste verticale d'items reliés / cross-links. (5 pages) |
| `patterns/ResumeLessonCard` | Hero card "Reprendre ta leçon" Dashboard. Glass tone-aware (warm/primary/sun) avec eyebrow "Étape X sur Y", titre h1, meta pills (level/duration/lessons), progress bar + CTA pill. |

## TlsLogo — système à 6 variants

`ui/TlsLogo.tsx` expose le logo mark SVG avec palette swap par `variant` prop. Couvre tous les contextes de surface :

| variant | Surface cible | Fills |
|---------|--------------|-------|
| `color` (défaut) | Blanc / clair | Multicolor branded (primary-500 / secondary-600 / accent-400) |
| `light` | Dark / glass teal (AuthShell, dark heroes) | All-white rgba |
| `primary` | Surface teal tintée (primary-50/100) | Monochrome teal (**primary-600**) |
| `warm` | Surface warm/secondary | Amber-white (secondary-500) |
| `sun` | Surface sun/accent | Golden (accent-400) |
| `ink` | Impression / monochrome / haute contraste | Dark ink-900 |

**Supports de marque hors app** (decks, docs, emails, logos sources, doctrine visuelle) :
[`brand/README.md`](brand/README.md) → [`brand/BRAND-KIT.md`](brand/BRAND-KIT.md), la fiche
unique. Elle recopie les valeurs de `src/index.css` (qui reste la vérité) et liste, section 7,
les endroits où Canva / Notion / Figma / Drive ont divergé.

**Règle** : toujours passer `variant="light"` sur fond dark/glass (AuthShell = `withBubble={false} variant="light"`). Ne jamais hardcoder `fill="#..."` dans le SVG — étendre la map `PALETTES` dans `TlsLogo.tsx`.

⚠️ **`primary` est sur primary-600, pas primary-500** (corrigé le 2026-09-09 ; cette table disait 500). L'app est sur `#4A8FA1` depuis `0b538ff`, et la mesure lui donne raison : sur `primary-50`, la surface même de ce variant, 600 donne 3,26:1 contre 2,62:1 pour 500. C'était Figma **et** cette table qui avaient dérivé — Figma a été réaligné.

**La pastille centrale est toujours à la couleur du corps**, en aplat comme en dégradé. Sinon le logo change d'identité en franchissant le seuil `material` (28 px) : point pâle en dessous, centre continu au-dessus.

---

## Auth components — dark glass vs light fields (dualité)

Pour les pages avec **fond saturé glass-dark** (Login/Signup/ForgotPassword/ResetPassword via AuthShell), utiliser la famille `Auth*`. Pour les pages standard (fond clair, surface white), utiliser les composants core/UI.

| Use case | Light mode (pages standard) | Dark glass mode (auth pages) |
|---|---|---|
| Field avec label + icon | `<FormGroup><Input leadingIcon /></FormGroup>` | `<AuthField label icon />` |
| Password input | `<Input type="password" />` (no toggle yet) | `<AuthPasswordField />` (eye toggle built-in) |
| Checkbox | `<Checkbox />` (from core/Input.tsx) | `<AuthCheckbox />` |
| Primary CTA | `<Button>` (variants light) | `<AuthPrimaryButton>` (white-on-dark inverse) |
| Ghost / secondary CTA | `<Button variant="ghost">` | `<AuthGhostButton>` (white-border on dark) |
| Divider | `<Divider label="ou" />` | `<AuthDivider>` (white/20 lines) |
| Social provider button | n/a | `<AuthSocialButton icon={<AuthGoogleIcon />}>` |
| Inline footer link | `<a>` | `<AuthInlineLink>` |
| Success state | `<EmptyState variant="success">` | `<AuthSuccess>` |

→ Les composants Auth* sont **strictly limited** aux pages d'authentification (surface glass-dark). N'utilise pas Auth* ailleurs dans l'app. Inversement, n'utilise pas Input/Button light dans AuthShell.

### SectionHeader — système 5 × 4 × 5 (variants × sizes × tones)

`patterns/SectionHeader` est désormais le composant canonique pour tout en-tête de section (`title + subtitle + icon + action + divider`). Il expose :

- **5 variants** :
  - `default` — bubble tinted (bg-primary-50 + icon coloré)
  - `solid` (NEW) — bubble gradient saturé + icon **blanc**
  - `minimal` — stroke inline, pas de bubble
  - `accent` — barre verticale gauche
  - `underline` — soulignement subtil sous le titre
- **4 sizes** : `xs` (h5/32px bubble) · `sm` (h4/36px) · `md` (h3/44px — DEFAULT) · `lg` (h2/56px)
- **5 tones** : `primary` · `warm` · `sun` · `accent` · `neutral`

**Layout fix critique :** wrapper en CSS grid `grid-cols-[auto_minmax(0,1fr)] items-start` → centre vertical de la bubble icône aligné sur le **centre de la première ligne** du titre ; subtitle en row 2 col-start-2 (sous le titre, pas sous l'icône).

**`compact?: boolean` deprecated** → mappé vers `size="sm"`.

**No more `mb-X` on wrapper** — le SectionHeader ne contrôle PLUS son spacing vertical. Le parent layout possède le spacing via `gap-stack`/`gap-section`/etc. Voir Piège #12.

---

## Styling Tailwind — règles

Tout est **100 % Tailwind** (config CSS-first : tokens dans `src/index.css` @theme, pas de `tailwind.config.js`). La migration BEM → Tailwind est **terminée**.

⚠️ **`src/styles/globals.css`** : tout sélecteur d'élément (`*`, `html`, `body`, `a`, `:focus-visible`, `input:focus`…) DOIT être dans `@layer base` — sinon le reset (`* { margin: 0 }`) bat les utilities Tailwind. Tout `@import` de CSS legacy doit passer par `layer(components)`.

### Règles absolues

**1. Jamais de valeurs arbitraires avec `var()`**
```tsx
// INTERDIT — fragile, JIT ne valide pas, équivalent manquera
className="bg-[var(--tls-primary-50)]"
className="text-[length:var(--t-caption)]"
className="font-[family-name:var(--font-display)]"

// OBLIGATOIRE — tokens mappés dans index.css @theme
className="bg-primary-50"
className="text-caption"
className="font-display"
```

**2. Jamais d'inline styles `style={{}}` pour layout/couleur/spacing**
```tsx
// INTERDIT
style={{ display: 'flex', flexDirection: 'column', gap: '16px', color: 'var(--tls-primary-600)' }}

// OBLIGATOIRE
className="flex flex-col gap-4 text-primary-600"
```

**3. Styles dynamiques → className conditionnels (jamais style={{}})**
```tsx
// INTERDIT
style={{ background: tone === 'primary' ? '#55A1B4' : '#ED843A' }}

// OBLIGATOIRE
className={tone === 'primary' ? 'bg-primary-500' : 'bg-secondary-500'}
```

**4. `style={{}}` autorisé UNIQUEMENT pour**
- Valeurs calculées au runtime impossible à prédire (`width: ${percent}%`)
- Gradients complexes sans équivalent Tailwind documenté
- Transformations dynamiques (`transform: translateY(${offset}px)`)

**5. Fichiers CSS autorisés UNIQUEMENT pour**
- `@keyframes` et animations complexes
- Pseudo-éléments `::before`, `::after`, `::placeholder`
- Sélecteurs complexes non disponibles en Tailwind

---

## Référence Tailwind → Design Tokens

> **Valeurs vs usage — deux questions, deux endroits.**
> - *Quelle valeur ?* → cette section, et surtout `src/index.css` (bloc `@theme`),
>   qui fait foi. Un hex recopié ici peut avoir dérivé ; en cas de doute, c'est le
>   code qui tranche.
> - *Quand l'utiliser ?* → [`docs/_canon/REGLES-USAGE-COMPOSANTS.md`](docs/_canon/REGLES-USAGE-COMPOSANTS.md) :
>   Modal ou Toast, la sémantique des 4 variantes d'Alert, le choix de pagination
>   selon le contexte, et les contrats a11y de Button et Input.
>
> ⚠️ **Le contraste de `primary-600` (#4A8FA1) sur blanc est de 3.66:1 — il échoue
> AA** pour du texte normal. `spec.json` annonçait 4.52:1 : c'était faux, recalculé
> le 2026-07-23. Pour du texte blanc sur fond teal, utiliser `primary-700` (5.02:1)
> ou `primary-800` (7.08:1).

> **Valeurs → `src/index.css` (@theme), source de vérité.** Les tables hex/px/rem qui vivaient ici ont été retirées : elles dupliquaient le code et avaient **déjà dérivé** (ex. `ink-900` recopié `#1a1a1a` alors que le code = `#252B37` ; ombres neutres avec mauvaises valeurs ; blur mal nommé). Ne jamais recopier de valeur de token ici — pointer le code.

### Couleurs sémantiques — doctrine (non dérivable du code)
- Palette **muted/coral** alignée TLS : **NE JAMAIS** utiliser le green Tailwind brut (`#22C55E`) ni le red brut (`#EF4444`).
- **Bouton destructive** : `bg-danger-strong` au repos · `active:bg-danger-deep` — **jamais `bg-red-600`**.
- Overlays diffus (lesson cards, error/completion borders) : tokens legacy `--tls-*-light` / `-light-bg` / `-border` dans `design-tokens.css` (dérivés des bases sémantiques).

### Typographie · tracking · rayons · ombres — doctrine (valeurs → `src/index.css`)

- **Typo** : classes Tailwind auto-générées depuis les tokens (`--text-h1` → `text-h1`, `--font-display` → `font-display`, etc.).
- **Tracking gradué** (h1 -0.03em · h2/h3 -0.025em · h4 -0.02em · body 0). ⚠️ Ne **jamais** aplatir le tracking sur tous les headings (anti-pattern). Le marketing BEM (`display-*`, `pole__title`) garde son propre tracking, hors `@theme`.
- **Rayons** : `rounded-pill` (999px, token TLS) pour Button/Card.
  ⚠️ **Corrigé le 2026-09-09 : l'affirmation « `rounded-full` = 50 %, cercle » était fausse.**
  Mesuré dans le CSS livré, Tailwind v4 génère `rounded-full: 3.40282e38px` — l'infini d'un float,
  pas un pourcentage. Sur un rectangle, le navigateur plafonne tout rayon à la moitié de la plus
  petite dimension : **`rounded-full` et `rounded-pill` rendent donc exactement pareil**. La
  préférence pour `rounded-pill` reste, mais pour une raison de vocabulaire — c'est le token TLS,
  donc la valeur se change en un seul endroit — et non parce que le rendu diffère.
  ⚠️ Même famille de piège pour **`rounded-3xl`** : il n'est pas défini dans `index.css`, mais
  Tailwind en fournit un défaut à `1.5rem` = **24 px**, soit exactement `--radius-2xl`. Ses
  22 usages ne produisent donc aucun défaut visible : c'est un doublon de vocabulaire, pas de rendu.
- **Ombres** : `shadow-card` / `-hover` / `-lift` sont **neutres (noir), volontairement** — ce sont les fallbacks des cards **SANS `tone`**. Dès qu'un `tone` est posé, `Card.tsx` bascule sur `--shadow-brand|warm|sun-*` (maps `CARD_SHADOW_*`). Une valeur ambrée par défaut collisionnerait avec le tone `warm`.

---

## Spacing sémantique & utility tokens

Valeurs → `src/index.css` (@theme). Familles : `--spacing-*` (tight · stack-xs · stack · stack-lg · section · section-lg · page), `--opacity-*`, `--z-*`, `--duration-*`, `--ease-*`, `--container-*`, `--blur-*`.

**Règle** : préférer un token sémantique nommé (`gap-stack`, `gap-section`) à un `gap-4/6/8` générique — il exprime l'intention.

⚠️ **Piège Tailwind v4** : `ease-*` et `duration-*` ne sont **pas** auto-générés depuis `@theme` — ils requièrent des `.ease-*` / `.duration-*` en `@layer utilities` (déjà dans `index.css`), exactement comme les `shadow-*` custom.


---

## Créer un composant à variantes (pattern maps)

Pour tout composant à `variant`/`size`/`tone` (Button, Card, Input…) : **maps TypeScript de classes complètes**, jamais de concaténation de strings.

```tsx
const BASE = 'inline-flex items-center justify-center rounded-pill font-semibold transition-all focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500 disabled:opacity-disabled';
const VARIANT_CLASSES: Record<ButtonVariant, string> = {
  primary: 'bg-primary-600 text-white hover:bg-primary-700 active:bg-primary-800',
  // …une entrée par variante, classes complètes et statiques
};
const SIZE_CLASSES: Record<ButtonSize, string> = { sm: 'h-8 px-3.5 text-caption', md: 'h-11 px-5 text-body-sm' /* … */ };
const classes = [BASE, VARIANT_CLASSES[variant], SIZE_CLASSES[size], className].filter(Boolean).join(' ');
```

**Clés** : classes **statiques** (Tailwind ne compile que le littéral — jamais `${x}`), un token par entrée, assembler via `filter(Boolean).join(' ')`. Réf. `Button.tsx`.

## Pièges Tailwind v4 / cascade CSS (gotchas)

Les pièges non-évidents rencontrés sur ce repo — à relire avant de toucher au styling ou à la cascade CSS.

> ℹ️ Certains pièges ci-dessous citent des fichiers CSS legacy (`animations-polish.css`, `components-modern.css`, `utilities.css`, `layouts.css`) **désormais supprimés** (vérifié 2026-07-25 ; `globals.css` n'importe plus que `design-tokens.css` et `modals.css`). Le **principe** de chaque piège reste valable ; la citation `fichier:ligne` est historique.

### ⚠️ Pièges connus à vérifier systématiquement

1. **Collisions de classes** : `utilities.css` et `layouts.css` définissaient `.border`, `.shadow-sm`, `.rounded-md`, etc. **sans @layer** → écrasaient Tailwind. Solution : `@import './X.css' layer(components);`

2. **Tailwind v4 + custom shadows en @theme** : Les utilities `.shadow-X` Tailwind v4 utilisent `--tw-shadow` qui ne fonctionne PAS avec des custom shadows définies en `@theme`. Solution : ajouter dans `@layer utilities` des classes `.shadow-X { box-shadow: var(--shadow-X); }` ET `.hover:shadow-X:hover { box-shadow: var(--shadow-X); }` (déjà fait dans index.css).

3. **Tokens identiques entre @theme et design-tokens.css** : Une variable CSS définie aux deux endroits avec des valeurs différentes peut causer des bugs visuels subtils. Toujours vérifier `getComputedStyle()`.

   **⚠️ Cas particulier — noms DIFFÉRENTS mais même concept (divergence silencieuse)** : quand `@theme` et `design-tokens.css` nomment le même concept différemment (`--color-ink-*` vs `--tls-ink-*`, `--radius-2xl` vs `--r-2xl`), il n'y a PAS de collision de cascade → les deux coexistent avec des valeurs différentes, et selon qu'un composant est Tailwind (`bg-ink-900` → `#1a1a1a` neutre) ou legacy BEM (`var(--tls-ink-900)` → ancien `#252B37` teinté teal), l'app affiche **deux gris différents**. Idem `rounded-2xl` (24px) vs `var(--r-2xl)` (28px).
   **Résolution (2026-06-08, token-unification)** : `design-tokens.css` aliase désormais ces tokens sur `@theme` → **source de vérité unique = `index.css`** :
   ```css
   --tls-ink-900: var(--color-ink-900);  /* etc. ink-0…950 — sauf ink-25 (pas d'équivalent @theme) */
   --r-2xl:       var(--radius-2xl);
   ```
   Impact : ~164 usages `var(--tls-ink-*)` (surtout `components/documentation/*`) passent de teal-tinté à neutre. **Le Figma DS est synchronisé sur `index.css` (neutre)** — donc Figma ↔ Tailwind ↔ BEM rendent enfin les mêmes gris. **Règle générale** : ne JAMAIS redéfinir une valeur de couleur/radius dans `design-tokens.css` ; toujours `var(--color-*)` / `var(--radius-*)` depuis `@theme`. ⚠️ **CORRIGÉ le 2026-07-23 — l'affirmation précédente était FAUSSE.** Elle disait que pour les `--shadow-*` homonymes « `@theme` gagne déjà, pas d'action ». Vérifié au navigateur via `getComputedStyle(document.documentElement)` : c'est **`design-tokens.css` qui gagnait**, donc **11 tokens `--shadow-*` de `@theme` étaient lettre morte** (dont toute l'échelle neutre `xs/sm/md/lg`). Une modification dans `@theme` n'avait aucun effet visible. Résolu : les 11 doublons ont été supprimés de `design-tokens.css`, et les 4 neutres — dont les valeurs y étaient meilleures (`rgba(18,24,28,…)`, plus douces que les défauts Tailwind `rgba(0,0,0,0.1)`) — ont été promus dans `@theme`. **Une seule définition par token, dans `@theme`.** Ne jamais rétablir de définition `--shadow-*` dans `design-tokens.css`.

**⚠️ Le piège est encore actif ailleurs (mesuré au navigateur le 2026-07-28).** Neuf tokens restent définis aux deux endroits, et c'est toujours `design-tokens.css` qui gagne :

| Token | `@theme` (mort) | Valeur réellement servie |
|---|---|---|
| `--z-base` · `--z-sticky` · `--z-dropdown` · `--z-modal` · `--z-tooltip` | 1 · 20 · 30 · 50 · 70 | **0 · 1020 · 1000 · 1050 · 1070** |
| `--ease-standard` | `cubic-bezier(0.4, 0, 0.2, 1)` | **`cubic-bezier(0.2, 0, 0, 1)`** |
| `--font-display` · `--font-body` · `--font-mono` | — | identiques (guillemets seuls) → inoffensif |

**Ce qui sauve la mise** : les utilities Tailwind `z-*` sont générées depuis `--z-index-*`, un namespace **sans doublon** — `class="z-modal"` rend donc bien `50`. Le danger est le `var(--z-modal)` écrit à la main dans un CSS ou un `style={{}}`, qui renvoie `1050`. **Deux échelles pour un même concept : n'écrire aucun `var(--z-*)` brut, toujours la classe.**

Corollaire sur `--ease-standard` : la valeur `@theme` est lettre morte, l'utility `.ease-standard` lit `var(--ease-standard)` et sert donc la courbe de `design-tokens.css`. Aligner les deux (ou supprimer le doublon) avant de toucher aux courbes.

Même schéma pour le flou : `@theme` porte `--blur-glass-{light|medium|heavy}` + `--blur-ambient`, tandis que `design-tokens.css` déclare une **seconde échelle** `--backdrop-blur-{light|medium|standard|heavy}` (10/18/24/32px) que **personne ne consomme** — noms différents, donc pas de collision, mais deux vérités pour un même concept. À supprimer.

4. **CSS importés SANS `@layer` dans globals.css** : Tout fichier CSS importé sans `layer(...)` se retrouve dans la cascade NON-LAYERED, qui **gagne sur toutes les couches nommées** (utilities, components, base). Pendant la migration de Input.tsx, on a découvert que `animations-polish.css` était importé sans layer et ses `.transition-colors` / `.transition-all` / `.transition-shadow` / `.transition-transform` legacy écrasaient les versions Tailwind. Symptôme : transitions de couleur très lentes (~400 ms au lieu de 200 ms), focus border qui semble ne jamais s'activer en mesure synchrone. **Fix appliqué** : `@import './animations-polish.css' layer(components);` dans `globals.css`. **Action générale** : auditer tous les `@import` de `globals.css` et confirmer qu'ils ont `layer(...)` ou que leurs sélecteurs ne collisionnent pas avec Tailwind.

5. **Sélecteurs d'éléments globaux non-layered** (ex. `:focus-visible`, `input:focus`, `textarea:focus`) : Si un sélecteur global (sans classe) qui matche un `<input>` ou `<textarea>` est défini en dehors d'un `@layer`, il bat toutes les utilities Tailwind, même `focus:outline-none`. Découvert en migrant `Input.tsx` : `globals.css:179` avait `:focus-visible { outline: 2px solid ... }` non layered, qui ajoutait un outline au `<textarea>` interne malgré `outline-none` sur le wrapper. **Fix appliqué** : envelopper la règle dans `@layer base { :focus-visible { ... } }`. **Action générale** : tout sélecteur d'élément (input, textarea, button, a) avec pseudo-classe focus/hover doit être en `@layer base` ou `@layer components`. Vérifier aussi `components-modern.css:198` (`input:focus, textarea:focus, select:focus { box-shadow: inset ... }`) qui injecte un inset shadow ; on l'écrase au niveau Input.tsx via `focus:outline-none focus:shadow-none focus:bg-transparent` sur la classe du `<input>`/`<textarea>` interne (specificity Tailwind > specificity element).

6. **Border color split entre BASE et STATUS** : Si un composant a une `border-X-Y` dans la BASE (couleur par défaut) ET un override dans `STATUS_CLASSES` (couleur erreur/succès), Tailwind v4 émet les deux dans le même `@layer utilities` et la spécificité est identique (0,1,0). L'ordre dans la classe **n'importe pas** ; c'est l'ordre d'émission de Tailwind qui décide → souvent la couleur de base gagne. **Solution** : retirer la couleur de la BASE et la mettre dans `STATUS_CLASSES.default`, comme dans `Input.tsx`. Garder seulement `border` (largeur) dans BASE.

### ⚠️ Piège n°6 bis : nos `shadow-*` maison tuent silencieusement les `ring-*`

Mesuré au navigateur le 2026-09-10, sur `TlsLogo` puis reproduit en sonde isolée :

```
ring-1 ring-primary-100                →  rgb(220,235,239) 0 0 0 1px    ✓ l'anneau est là
ring-1 ring-primary-100 shadow-card    →  l'anneau a disparu            ✗
```

**Pourquoi.** Tailwind v4 compose le ring dans une chaîne de variables :
```css
.ring-1      { box-shadow: var(--tw-inset-shadow), var(--tw-inset-ring-shadow),
                           var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow); }
```
Nos utilities maison (`index.css`, `@layer utilities`) posent un `box-shadow` **plat** :
```css
.shadow-card { box-shadow: var(--shadow-card); }
```
Elles remplacent donc la chaîne entière. Les deux vivent dans `@layer utilities`, à
spécificité égale — et les nôtres sont émises **après** celles de Tailwind, donc elles
gagnent toujours. Aucune erreur, aucun avertissement : la bordure existe dans le
`className` et ne se peint jamais.

**Portée** : les ~20 utilities `.shadow-{xs,sm,md,lg,xl}`, `.shadow-card*`,
`.shadow-{brand,warm,sun}-*`. **13 fichiers** de `src/` combinent aujourd'hui un `ring-*`
avec l'une d'elles.

**Le correctif systémique** (une ligne par utility) est de nourrir la chaîne au lieu de
l'écraser :
```css
.shadow-card {
  box-shadow: var(--tw-inset-shadow, 0 0 #0000), var(--tw-inset-ring-shadow, 0 0 #0000),
              var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000),
              var(--shadow-card);
}
```

**En attendant** : ne pas combiner un `ring-*` et une `shadow-*` maison sur le même
élément. Utiliser `border` pour le filet, ou vérifier au navigateur avec
`getComputedStyle(el).boxShadow` — c'est le seul moyen de voir le problème.

### ⚠️ Piège n°7 : `sr-only` sur un `<input>` ancré dans un label sans `position: relative`

`sr-only` applique `position: absolute`. Sans ancêtre positionné explicite, l'input absolute remonte jusqu'au premier parent `position: relative/absolute/fixed` — souvent `<body>` ou `#root`. Quand l'input reçoit le focus (par exemple via un clic sur le `<label>` qui le contient), le navigateur scrolle pour le rendre visible — et donc scrolle vers le coin haut-gauche de l'ancêtre lointain, **arrachant le viewport de plusieurs milliers de pixels** (~2000 px observé). L'utilisateur perçoit une "page blanche" alors que c'est juste un scroll involontaire vers une zone vide.

**Symptôme** : clic sur Checkbox / Radio / Switch → l'écran devient blanc, le DOM est intact, aucune erreur console.

**Fix** : ajouter `position: relative` (classe Tailwind `relative`) sur le `<label>` parent qui contient le `<input class="peer sr-only">`. L'input absolute est alors ancré au label, le focus scrolle vers le label = déjà visible.

```tsx
// ❌ MAUVAIS — focus scroll vers ancêtre lointain
<label className="inline-flex items-center gap-2 cursor-pointer">
  <input type="checkbox" className="peer sr-only" />
  ...
</label>

// ✅ BON — focus reste sur le label
<label className="relative inline-flex items-center gap-2 cursor-pointer">
  <input type="checkbox" className="peer sr-only" />
  ...
</label>
```

### ⚠️ Piège n°8 : sélecteur d'attribut global `[role="button"]`

`components-modern.css:75` définit `.btn, [role="button"] { display:inline-flex; height:40px; overflow:hidden; ... }`. Ce sélecteur d'attribut large matche **tout** élément avec `role="button"`, y compris les `<div role="button" tabIndex={0}>` utilisés pour l'a11y sur des wrappers cliquables (ex. `patterns/ParcoursCard`). Résultat : le wrapper devient un mini-bouton de 40px de haut avec son contenu clippé par `overflow:hidden`.

**Symptôme** : carte qui apparaît écrasée (~60px de haut) avec seulement la description visible en pill, titre/CTA invisibles.

**Fix** : neutraliser au niveau du wrapper avec des utilities Tailwind (qui battent `@layer components`) :
```tsx
<div role="button" tabIndex={0} className="block w-full h-auto p-0 overflow-visible cursor-pointer">
```

**Action générale** : tout `<div role="button">` ou wrapper a11y doit annuler ces propriétés. Idéalement, narrow le sélecteur BEM en cleanup post-migration.

**⚠️ Addendum — Card BASE** : La Card a initialement reçu `[&[role=button]]:h-auto [&[role=button]]:overflow-visible` dans son BASE pour contrer le BEM. **Ne pas ajouter `overflow-visible`** ici — cela override le `overflow-hidden` passé via `className` sur des wrappers comme ToneAwareCard, exposant des coins carrés non-clippés sur hover (`ParcoursCard`). Seul `[&[role=button]]:h-auto` est nécessaire dans BASE pour contrer `height:40px`. Si une Card descendante a besoin d'`overflow-hidden` pour clipper ses enfants à ses coins arrondis, elle le met dans son propre `className`.

**⚠️ Addendum 2 — Speech bubble (PromptCard, JournalEntryCard)** : Le pattern Apple Messages ajoute un *tail* (queue) en bottom-right via `rounded-3xl rounded-br-[6px]`. Ce tail est **clippé** par le `overflow:hidden` global de `[role="button"]` ET par toute hauteur fixée à 40 px. Symptôme : la card chat-bubble apparaît rectangulaire sans tail (les pixels du coin tronqué sont coupés). **Fix** : forcer `!h-auto !overflow-visible` sur le wrapper chat-bubble (PromptCard, JournalEntryCard). Le `!` est nécessaire car BEM `[role="button"]` est dans `@layer components` qui peut gagner sur `@layer utilities` selon ordre. Voir aussi : approche **borderless** = `bg-white` + `[filter:drop-shadow(0_2px_8px_rgba(0,0,0,0.06))]` (PAS de border) — la `drop-shadow` s'applique à la **silhouette du wrapper** (card + tail mergés en un seul SVG-like outline), donc le shadow épouse la forme avec tail seamlessly. Ajouter une `border` casserait l'illusion (la border ferait apparaître les arêtes internes du tail).

### ⚠️ Piège n°9 : Tailwind v4 `translate` vs `transform` des keyframes

Tailwind v4 utilise la propriété CSS **séparée** `translate` (et `scale`, `rotate`) pour les utilities `-translate-x-1/2`, `scale-110`, etc. — pas le `transform` shorthand. Quand un keyframe d'animation set `transform: translate(-50%, -50%) scale(1)`, les deux propriétés s'**additionnent** au lieu de se remplacer → translation doublée, élément hors viewport.

**Symptôme découvert sur Modal** : pattern `top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2` + animation keyframe `transform: translate(-50%,-50%) scale(...)` → modal positionné à `left = 50% - 100% (de sa width)` au lieu de `50% - 50%`, donc complètement à gauche du viewport.

**Fix** : ne JAMAIS combiner Tailwind `translate-*` et keyframe `transform: translate(...)`. Préférer un des deux patterns :
- **Recommandé** : flex-center sur le parent scrim (`flex items-center justify-center`) + animation `scale-only` sur l'enfant
- Ou : utiliser arbitrary `[transform:translate(-50%,-50%)]` (force le shorthand)

```tsx
// ❌ MAUVAIS — translate stack avec keyframe transform
<div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-[modal-in_0.25s]" />

// ✅ BON — flex-center sur parent, scale-only animation
<div className="fixed inset-0 flex items-center justify-center">
  <div className="animate-[scale-in-flat_0.25s]" />
</div>
```

### ⚠️ Piège n°10 : `components-modern.css` impose `height: var(--input-height)` sur tous les `<textarea>` / `<select>`

`components-modern.css:178-190` définit une règle globale :
```css
input[type="text"], ..., textarea, select {
  width: 100%;
  padding: var(--input-padding);
  height: var(--input-height);  /* = 40px */
  ...
}
```

Avec `Tailwind p-3` (12px padding all sides), le content area = `40px - 24px = 16px`, ce qui tronque verticalement le texte (font-size 15px + line-height 24px). Symptômes : texte coupé en bas dans les select/textarea, placeholder à moitié visible.

**Fix** : sur tout `<textarea>` ou `<select>` Tailwind, override avec :
```tsx
<textarea className="... h-auto min-h-[120px]" rows={4} />
<select className="... h-auto min-h-[44px] py-2.5" />
```

`h-auto` annule le `height: 40px` et `min-h-[X]` garantit la hauteur minimale.

**Note pour `<select>`** : utiliser aussi `appearance-none` + custom `<ChevronDown>` Lucide positionné `absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none` pour un visuel cohérent avec le reste du DS (la flèche native est toujours collée au bord).

### ⚠️ Piège n°12 : Double-spacing trap (composant + parent)

Si un composant applique son propre `mb-X` (margin-bottom) ET que son parent layout applique aussi `gap-X` (ou `space-y-X`) entre enfants, le spacing total est la **somme** des deux — pas le max. Symptôme : trous verticaux énormes entre sections, page allongée artificiellement, hiérarchie visuelle cassée.

**Découvert en refactorant `SectionHeader`** : le composant avait un `SIZE_MARGIN: { md: 'mb-4', lg: 'mb-6' }` baked-in. Quand le parent était `<section className="flex flex-col gap-stack">` (16 px), le total devenait 16 + 16 = 32 px pour size `md`, et 16 + 24 = 40 px pour size `lg`. Pas du tout l'intention.

**Règle** : **un composant ne devrait JAMAIS appliquer son propre `mb-*` / `mt-*` sur son wrapper externe.** C'est le parent layout qui possède le rythme vertical via `gap-*` (flex/grid) ou `space-y-*` (stack utility).

```tsx
// ❌ MAUVAIS — composant impose un margin-bottom
const SectionHeader = ({ size, ...rest }) => (
  <header className={`${SIZE_MARGIN[size]} flex items-center gap-3`}>...</header>
);

// Et côté parent :
<section className="flex flex-col gap-stack">
  <SectionHeader />     {/* 16 (parent gap) + 16 (header mb-4) = 32 px → trop grand */}
  <Content />
</section>

// ✅ BON — header neutre, parent contrôle le rythme
const SectionHeader = (...) => (
  <header className="flex items-center gap-3">...</header>  // pas de mb-*
);

<section className="flex flex-col gap-stack">  {/* 16 px point. final */}
  <SectionHeader />
  <Content />
</section>
```

**Action générale** : auditer tout composant exporté qui applique `mb-*` / `mt-*` sur son root → retirer et confier au parent. Exception : composants standalone qui assument leur propre layout (ex. `PageHeader` peut avoir un `mb-section` car il définit le top-of-page rhythm).

**⚠️ Corollaire (2026-09-09) — un `gap` seul ne sait pas donner le rythme d'un titre.**
Le piège ci-dessus est juste, mais il a une conséquence qu'on n'avait pas vue : un
`gap` est **symétrique**, donc il donne autant d'air au-dessus d'un titre qu'en
dessous. Or un titre appartient à ce qui le suit — la proximité demande 3 à 4 fois
plus d'espace au-dessus. Rapport mesuré avant correction : **1,0** sur 302 piles.

La règle vit désormais dans `@layer base` de `src/index.css` :
```css
h2, h3, h4 { margin-block-start: 0.75em; }
h2:first-child, h3:first-child, h4:first-child { margin-block-start: 0; }
```
Elle est battue par n'importe quel `mt-*` (couche utilities > couche base), donc
elle n'enferme rien ; elle bat le reset `* { margin: 0 }`, dont la spécificité est
nulle. `0.75em` est calibré sur mesure, pas au jugé : le rapport médian réel passe
à **3,3**, et la page gagne 33 px. À 1,75em il montait à 6,4, parce que la
gouttière dominante du repo est `gap-stack-xs` (8 px) et non `gap-stack`.

**❌ Ne jamais remettre `m-0` sur un titre.** C'est une utility, elle gagne donc
sur la règle et la neutralise. Ils étaient 362 sur 421 à le porter, et ils étaient
**déjà sans effet** — le reset universel met la marge à zéro de toute façon
(vérifié : un `h3` nu et un `h3` en `m-0` rendent le même `0px 0px 0px 0px`). Ils
ne faisaient que bloquer le système ; tous retirés le 2026-09-09.

### ⚠️ Piège n°13 : `border-none` dans BASE bloque les `border` des variants

Tailwind v4 `border-none` set **`border-style: none`** (pas seulement `border-width: 0`). Si BASE contient `border-none`, tous les variants qui ajoutent `border border-X-Y` se retrouvent avec `border-style: none` — la bordure existe dans le DOM (width=1px, color=X) mais n'est **pas rendue** car le style est `none`.

**Symptôme** : ghost, outline, glass-brand → `borderTopWidth: 1px` en JS mais visuellement invisible. `getComputedStyle(btn).borderTopStyle` retourne `"none"`.

**Pourquoi `border-0` ne règle pas le problème** : `border-0` set seulement `border-width: 0`. Dans le CSS généré par Tailwind, `.border-0` apparaît APRÈS `.border` → `border-0` gagne sur la valeur de width du variant.

**Fix** : **ne mettre aucun reset border dans BASE**. Tailwind Preflight (`@import "tailwindcss"`) déjà reset tous les éléments à `border-width: 0; border-style: solid`. Les variants avec `border border-X-Y` fonctionnent donc directement : width passe à 1px, style reste `solid`, color = X. Les variants sans `border` gardent width=0 → pas de bordure.

```tsx
// ❌ MAUVAIS — border-none écrase border-style:solid du Preflight
const BASE = '... border-none ...';
// variant ghost: 'border border-primary-100 ...' → border-style:none → invisible !

// ✅ BON — pas de reset border dans BASE
const BASE = '... transition-all ...';  // Preflight gère le défaut à 0/solid
// variant ghost: 'border border-primary-100 ...' → 1px solid primary-100 ✅
```

**Action générale** : ne jamais ajouter `border-none` ou `border-0` dans la BASE d'un composant qui a des variants avec `border`. Vérifier avec `getComputedStyle(el).borderTopStyle === 'solid'` après migration.

### ⚠️ Piège n°14 : `h-screen` (100vh) sur un conteneur sticky → contenu tronqué sur mobile

`h-screen` = `height: 100vh`. Sur mobile Safari et Chrome Android, `100vh` compte la zone **derrière la barre d'URL rétractable** : le viewport réellement visible est plus court. Un `sticky top-0 h-screen` mesure donc plus haut que ce que l'utilisateur voit — le bas du contenu épinglé est coupé, et la hauteur change pendant le scroll quand la barre se rétracte, ce qui fait vibrer l'élément.

**Fix** : utiliser l'unité **dynamic viewport height** `dvh`, qui suit la barre d'URL.

```tsx
// ❌ MAUVAIS — tronque sur mobile, jitter au scroll
<div className="sticky top-0 h-screen overflow-hidden">

// ✅ BON — suit le viewport visible réel
<div className="sticky top-0 h-[100dvh] overflow-hidden">

// ✅ BON aussi quand le contenu peut dépasser
<div className="sticky top-0 min-h-[100dvh] flex items-center">
```

**Découvert** lors de l'audit sticky du 2026-07-22 : 4 surfaces marketing utilisaient `h-screen`, 3 utilisaient déjà `min-h-[100dvh]` — incohérence pure, le bon pattern existait déjà dans le repo. *(Les composants alors corrigés ont été supprimés depuis, avec le nettoyage motion du 2026-07-28 ; le principe reste.)*

✅ **Plus aucun `h-screen` dans `src/`** (vérifié 2026-07-28). Le dernier vivait dans `marketing/sections/HeroSection.tsx`, un fichier qu'aucune page n'importait — le dossier entier a été supprimé.

**Action générale** : sur tout conteneur plein-écran — sticky, hero, overlay, modal fullscreen — préférer `dvh` à `vh`. `h-screen` reste acceptable pour du desktop-only explicitement gardé par un breakpoint `lg:`.

### ⚠️ Piège n°15 : un `tracking-*` dans la `BASE` d'un composant à tailles multiples

Le tracking est **proportionnel à la taille** (`em`), mais son effet ne l'est pas :
serrer aide un grand titre et abîme un petit label. Posé dans une constante `BASE`,
il s'applique donc à toutes les tailles avec le même signe, alors qu'il devrait
suivre une courbe inverse.

**Constaté sur `Button.tsx` (corrigé le 2026-09-09)** : `tracking-tight` vivait dans
`BASE` et touchait les quatre tailles, dont `sm` à 13 px — la plus employée, 227 des
522 boutons. Cumulé à la graisse, le label devenait dense et pénible à lire sans
qu'on sache pourquoi.

**Règle** : si un serrage est nécessaire, le porter dans `SIZE_CLASSES` sur les
grandes tailles seulement. **Jamais dans `BASE`.**

⚠️ Et préférer `tracking-headline` à `tracking-tight` : même valeur (`-0,025em`),
mais le premier est un token TLS qui dit son emploi, le second est le défaut Tailwind.

### ⚠️ Règle : pas de SVG inline custom — utiliser Lucide

`lucide-react` est notre librairie d'icônes par défaut. **Ne jamais hardcoder un `<svg>` inline** dans un composant si Lucide propose l'équivalent.

**Pourquoi** :
- Cohérence visuelle (stroke width, line-cap, sizing)
- Pas de risques de viewBox mal dimensionné qui clippe les pixels (cas découvert sur SessionFeedbackModal stars : viewBox 0-52 mais path jusqu'à Y=55.5 → bas du star clippé, drop-shadow rendu sur la forme tronquée)
- Bundle déjà importé partout — coût zéro
- Tailwind utilities native pour styling (`fill-accent-400 text-accent-400 stroke-2`)

**Pattern** :
```tsx
// ❌ MAUVAIS — SVG inline custom
<svg viewBox="0 0 52 52" fill="none">
  <path d="M26 4L33.5 19.2..." fill={filled ? '#F8B044' : 'none'} stroke="..."/>
</svg>

// ✅ BON — Lucide + Tailwind classes
import { Star } from 'lucide-react';
<Star size={40} strokeWidth={1.75} className={filled ? 'fill-accent-400 text-accent-400' : 'fill-transparent text-ink-300'} />
```

**Exception** : SVG décoratifs purement custom (logos, illustrations one-off, formes complexes). Toute icône fonctionnelle (close, chevron, check, star, heart, alert, etc.) = Lucide.

### ⚠️ Une taille d'icône se prend dans l'échelle, et le glyphe remplit sa boîte

`--icon-size-{xs,sm,md,lg,xl}` = 16 · 18 · 20 · 24 · 28 px, avec les utilities
`.icon-*` correspondantes. Chaque cran est apparié à un pas de l'échelle de texte
dans un rapport d'environ 1,25 : `xs` avec `caption`, `sm` avec `body-sm`, `md`
avec `body`, `lg` avec `body-lg`.

**État au 2026-09-09** : 2 066 tailles sont posées à la main dans `src/`, dont
**1 037 hors échelle**, réparties sur 27 valeurs distinctes. La plus fréquente,
14 px, compte 357 usages — plus que le 20 px du système. Ne pas en ajouter.

**Le piège de la boîte.** Dimensionner le conteneur ne suffit pas : si la boîte
est plus étroite que le glyphe, `flex-shrink` mord sur la largeur et pas sur la
hauteur, et un cercle devient un ovale. C'est ce que faisait `Button` — 2,35 px
d'écrasement sur la taille `sm`. Il faut que le SVG se plie à la boîte :

```tsx
// ✅ le glyphe suit la boîte, donc carré à toutes les tailles
<span className="inline-flex items-center justify-center shrink-0 icon-sm [&>svg]:w-full [&>svg]:h-full">
  {icon}
</span>
```

### Pattern : contrôles custom (checkbox / radio / switch) avec `peer` + `after:`

Pour les composants où l'`<input>` natif est masqué et un span stylé prend sa place (Input.tsx Checkbox/Radio/Switch), utiliser le pattern **`peer` + pseudo-élément `::after`** au lieu de keyframes ou state JS :

```tsx
<label className="inline-flex items-center gap-2 cursor-pointer">
  <input type="checkbox" className="peer sr-only" {...rest}/>
  <span aria-hidden className="
    inline-flex w-5 h-5 border-2 border-ink-300 rounded-sm
    peer-checked:bg-primary-500 peer-checked:border-primary-500
    peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-primary-500
    peer-disabled:bg-ink-50 peer-disabled:cursor-not-allowed
    after:content-['✓'] after:text-white after:font-bold after:text-[12px] after:opacity-0
    peer-checked:after:opacity-100
  "/>
</label>
```

Règles :
- L'input doit être **frère immédiat** du span stylisé (sinon `peer` ne s'applique pas).
- `sr-only` masque visuellement sans casser l'accessibilité.
- `content-['✓']` ou `content-['']` est autorisé (chaîne littérale, pas `var()`).
- Pour un Switch : préférer un `<span>` réel comme thumb avec `translate-x-N` plutôt qu'un `::after` avec `left:Npx` — Tailwind n'anime pas les valeurs `left` arbitraires.

---

## Tone narratif (convention app-wide)

Tone cohérent par nature d'écran : **primary** (focus / leadership) · **warm** (action / parcours) · **sun** (réflexion / achievements) · **neutral** (settings / utility). Max 2 tones par flow (1 dominant + 1 accent).

---

## Hygiène documentaire — règles anti-dérive (OBLIGATOIRE)

Suite au nettoyage du 2026-06-30 (sessions d'agents ayant déversé ~20 docs en vrac + écrit des audits fabriqués) :

1. **Aucun nouveau doc à la racine du repo.** Seuls `CLAUDE.md`, `PRODUCT.md` et `DESIGN.md` y vivent. *(`DESIGN-IMPECCABLE.md` a été archivé le 2026-09-09 : 934 lignes que rien ne chargeait — ses décisions vivantes sont dans `DESIGN.md` §10 et §11.)* En tâche design, seuls `PRODUCT.md` et `DESIGN.md` sont injectés ; `CLAUDE.md` est chargé comme instructions projet. Tout le reste va dans `docs/<sous-dossier>` :
   - `docs/_canon/` — **docs canoniques, priment sur tout le reste** · `docs/_audits/` — audits qualité · `docs/_phases/` — rapports de phase (Phase 1 P0, Phase 20…) · `docs/figma/` — audits/sync Figma · `docs/charts/` — data-viz · `docs/briefs/` — briefs · `docs/CDC/` — cahiers (source de vérité, ne pas modifier sans accord métier) · `docs/_archive/` — historique.
2. **Mettre à jour `docs/INDEX.md`** à chaque ajout/déplacement/suppression de doc. L'index est la carte ; un doc absent de l'index = doc fantôme.
3. **Un rapport d'audit Figma DOIT citer les node IDs réellement inspectés** (via `use_figma`). Sans trace d'inspection node-par-node → marquer le doc `⚠️ FIABILITÉ NON VÉRIFIÉE` en tête. Ne jamais écrire « conformance X% » ou « gap corrigé » sans avoir ouvert le fichier Figma.
4. **Les % de conformance / claims d'état sont interdits sans vérification de première main.** Un agent délégué qui « audite » sans inspecter produit de la fiction — préférer « non vérifié » à un chiffre inventé.
5. **Worktrees & copies** : `.claude/worktrees/` est gitignored — ne jamais `git add -f` dedans. Pas de dossiers « X 2 » (artefacts de copie Finder).

---

## Build & commit

Gate de fin = **`npm run build`** (voir gotcha ci-dessous). Un commit par changement cohérent, message descriptif.

### ⚠️ Le gate TypeScript est `npm run build`, PAS `npx tsc --noEmit` (révisé 2026-07-22)

```bash
npm run build
```

**Pourquoi ce changement.** Le workflow imposait historiquement `npx tsc --noEmit → 0 erreurs`. Ce garde-fou est **plus faible que le build réel** :

| Commande | Ce qu'elle vérifie |
|---|---|
| `npx tsc --noEmit` | le tsconfig racine seul |
| `npm run build` (= `tsc -b && vite build`) | **tous les projets référencés** (`tsc -b` suit les project references) puis le bundle Vite |

Conséquence constatée le 2026-07-22 : `npx tsc --noEmit` renvoyait **0 erreur** pendant que `npm run build` en trouvait **62**, réparties sur 31 fichiers (pages learning-app + composants charts). La dette s'est accumulée en silence parce que le gate documenté ne la voyait pas.

**Règle** : ne jamais annoncer « 0 erreur TypeScript » sur la foi de `npx tsc --noEmit` seul. Le seul état vert qui compte est `npm run build` qui termine sans erreur. `npx tsc --noEmit` reste utile comme vérification rapide en cours de travail, jamais comme critère de fin.

---

## À ne pas faire (rappel)

Les interdits sont couverts par les Règles absolues + les Pièges ci-dessus. Un seul mérite d'être répété :

- **Ne jamais recréer `tailwind.config.js`** — supprimé le 2026-07-23. Tailwind v4 est CSS-first (source = `@theme` de `src/index.css`, aucune directive `@config`). Un fichier JS ne serait jamais lu par le build mais serait lu par les humains — c'est ainsi qu'il avait accumulé 27 valeurs fantômes.

## État de l'app — Zustand (couche vivante)

L'app est une SPA réactive : les données du domaine vivent dans des stores Zustand **persistés en `localStorage`** (`src/stores/persistence.ts`) — c'est ce qui fait que l'état **survit au reload en local** (indispensable pour tester). Stores : `useCoachingStore`, `useUserProfileStore`, `useEnterpriseStore`, `usePrivacyStore`, etc.

**Brancher une page au store :**
- **Seed-on-first-access** : `getX(userId)` seed depuis `MOCK_*` au premier appel si vide, puis sert le store. Les pages n'importent **jamais** `MOCK_*` directement.
- **Live binding (pas de snapshot)** : appeler `store.getX()` **dans le render body**, pas dans `useState`/`useEffect` — le composant se re-render quand le store change.
- **Route param = clé de sélection** : `sessions.find(s => s.coachId === coachId) ?? sessions[0]`, pas une identité locale.
- **Écritures** : `store.patch()/updateX()/addX()` → persiste tout seul (middleware `persist`).
- **Domaine vs UI** : données métier → store (persisté) ; état purement UI (modal, tab, brouillon non soumis) → `useState` local.

**Pièges** : tout store applicatif DOIT avoir `persist(...)` (sinon perte au reload) ; API cohérente (`getX`/`updateX`/`addX`/`patch`) ; pas de `store.get()` dans un listener sans `useCallback` (stale closure).

## Conventions UI transverses

**Composants d'en-tête** : `PageHero` = hero universel d'ouverture de page (alias `EditorialHero` pour surfaces éditoriales : Magazine/Veille/Articles) · `PageHeader` = header utilitaire (Settings/Billing/Privacy) · `SectionHeader` = titre de section intra-page (h2/h3) · `ViewerHeader` = overlay lesson player.

**Accessibilité** (⚠️ corrigé 2026-07-23 : l'ancien « 44px = WCAG AA » était un amalgame) :
- Seuils réels : **WCAG 2.2 AA (SC 2.5.8) = 24×24 px** (seul minimum normatif) ; AAA / Apple HIG = 44×44. **Règle TLS** : 44 px sur les actions principales, 24 px minimum partout.
- Hauteurs Button mesurées : `sm` 32px · `md` 44px (`h-touch`) · `lg` 48px · `xl` 56px. `sm` passe AA mais rate 44 → contextes denses seulement.
- **Focus visible** obligatoire sur tout élément focusable custom : `focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500`.
- Contraste : `text-ink-900` sur blanc. Texte blanc uniquement sur `primary-700+` / `secondary-700+` / `accent-700+` — ⚠️ **`primary-600` est à 3,66:1 et échoue AA** pour du texte normal (corrigé le 2026-07-28 : cette ligne disait « `bg-primary-600+` », en contradiction avec l'avertissement de la section Référence Tailwind plus haut). Éviter `text-ink-500` pour titres/CTA.
- Pour du **texte** sur fond clair, utiliser les tokens `-fg` : `secondary-600` et `accent-600` échouent AA en texte, ils servent au remplissage.
- **Contour d'un composant (SC 1.4.11) = 3:1, et la règle ne dit rien de
  l'épaisseur.** Un filet de 1 px au bon cran passe comme un filet de 2 px : ne
  jamais épaissir pour « faire passer », changer la teinte. Crans conformes sur
  blanc : **teal 600** (3,66) · **orange 600** (3,98) · **or 700** (4,88 — l'or
  est la seule famille dont le 600 rate, à 2,89). ⚠️ `primary-500`, le teal de la
  signature, mesure **2,94** : il rate de six centièmes, il n'y a pas d'entre-deux.
- **Les variantes douces battent tous les remplissages saturés en contraste de
  texte** (mesuré 2026-09-09, fonds translucides recomposés sur blanc) :
  `ghost` 6,31 · `glass-warm` 8,69 · `glass-sun` 7,23 — contre 3,66 au mieux pour
  un fond plein. Leur filet a été fermé au cran conforme le même jour ; il était
  au cran 100, à 1,05, donc invisible.

**Layout** : `PageShell width="page"` = conteneur canonique des pages principales ; padding responsive standard `px-4 sm:px-6 lg:px-10`. Les viewers modaux gardent leurs `max-w` étroits (lisibilité).

**Zones sûres (mobile, mode autonome)** — le manifest déclare `display: standalone`,
donc une fois l'app installée elle perd la chrome du navigateur et **les deux
encoches deviennent réelles**. Le `<main>` porte `pt-chrome-safe` et
`pb-nav-safe`, qui additionnent la réserve fixe et l'`env(safe-area-inset-*)`.
Sans elles, la BottomNav (56 px + barre d'accueil ≈ 90 px) débordait de 26 px sur
un contenu qui n'en réservait que 64.
⚠️ **Ces deux utilities portent leur media query en dur.** Une utility écrite à la
main ne reçoit aucune variante Tailwind — ni `md:`, ni `max-md:` — et, à
spécificité égale, elle est émise APRÈS le bundle Tailwind, donc elle bat un
`md:pb-0` et fuit sur le bureau. Même famille de piège que les `duration-*` et
`shadow-*` custom. Ne jamais leur écrire de préfixe à l'usage.

**Piège Tailwind v4 — arbitrary property** : `className="[grid-template-columns:repeat(auto-fit,minmax(240px,1fr))]"` plutôt qu'un `style={{}}`. ⚠️ Pas d'espace autour du `:` ni dans `minmax()` — sinon le parser splitte.

### Requêtes de conteneur — un composant mesure sa boîte, pas la fenêtre

Un composant de contenu ne sait pas où il est posé : pleine page, colonne étroite
d'une mise en page à deux volets, corps d'une modale. Réglé sur la fenêtre, il se
trompe partout sauf dans le cas pour lequel on l'a réglé. Constaté sur `CardGrid`
le 2026-09-09 : à 652 px de fenêtre elle faisait 596 px de large et n'affichait
**qu'une colonne** — une carte de 596 px seule sur sa ligne — parce que le seuil
`md:` est à 768 px de fenêtre. La place tenait deux colonnes de 282.

**Qui garde les variantes de fenêtre** : la chrome de l'application — `Sidebar`,
`PageShell`, `BottomNav`, `ViewerOverlay`. Elles connaissent légitimement la
fenêtre, c'est leur rôle. **Qui passe au conteneur** : tout composant de contenu
posable ailleurs — grilles, cartes, en-têtes de section.

⚠️ **Deux boîtes, toujours.** Une requête de conteneur remonte à l'ancêtre le plus
proche qui en est un — **jamais à l'élément qui la porte**. `@container` et
`@xl:grid-cols-2` sur la même div ne produisent rien (mesuré : la grille restait
à une colonne à 596 px pour un seuil à 576).
```tsx
<div className="@container w-full">        {/* le conteneur mesuré */}
  <div className="grid @xl:grid-cols-2" /> {/* répond à SA largeur */}
</div>
```

⚠️ **Les crans `@` ne sont pas ceux des variantes de fenêtre.** Ils viennent de
l'échelle `--container-*` : `@sm` 24rem · `@md` 28rem · `@lg` 32rem · `@xl` 36rem ·
`@2xl` 42rem · `@3xl` 48rem · `@4xl` 56rem · `@5xl` 64rem. Nos tokens sémantiques
en ajoutent : `@content` 48rem · `@medium` 64rem · `@page` 72rem · `@wide` 80rem.
Ne jamais transposer un seuil de fenêtre tel quel — le choisir sur la largeur de
contenu visée.

⚠️ **`container-type: inline-size` mesure la boîte de CONTENU, pas la boîte
externe.** Le padding du conteneur décale donc tous ses seuils. Constaté sur
`ResumeLessonCard` : avec 24 px de padding de chaque côté, un cran posé à `@xl`
(576 px) ne se déclenchait qu'à 624 px de carte — et la carte du tableau de bord
en fait 596, donc elle avait silencieusement perdu sa mise en ligne. Toujours
retrancher le padding avant de choisir le cran, et **mesurer après**.

**Colonnage des grilles** : ne pas écrire de seuils à la main, consommer
[`src/lib/grid-columns.ts`](src/lib/grid-columns.ts) — `GRID_COLS_CONTENT` pour
des cartes (260–400 px), `GRID_COLS_TILES` pour des tuiles (150–200 px), et
`GRID_CONTAINER` pour le wrapper.

**ErrorPage** (`patterns/ErrorPage.tsx`) : pattern canonique des pages d'erreur (props `code/title/description/suggestions/primaryAction/tone`), tone `default` | `danger`. API dans le fichier.

## Cards — conventions tone-aware

Tous les composants card sont tone-aware (`tone: primary/warm/sun`). **Source de vérité unique des maps de tone** : `src/lib/tone-classes.ts` (`TONE_BG_50`, `CTA_SHADOW_HOVER_MD`, `TONE_CTA_TEXT`, `ACTION_BTN_TONES`, `TONE_BORDER`, `SURFACE_DIVIDER`) — importer, **jamais** redéfinir inline.

- **CTA** : `min-h-touch` (44px), `focus-visible` sur le bouton (pas la card root), contraste AA.
- **Icônes** : Lucide uniquement, couleur via `TONE_CTA_TEXT[tone]`.
- **Métadonnées** : préférer `<MetaPillGroup>` au texte inline.
- **Surfaces** : `card` / `tinted` / `glass` / `frosted` — divider adapté via `SURFACE_DIVIDER[surface]`.
- `AstucesCard` : `border-2` volontaire (distinction visuelle tips), ne pas unifier sans revue design.

**Padding intérieur — doctrine du 2026-09-09 : `p-stack-lg` (24 px) au canon,
`p-stack` (16 px) en unique dérogation dense. Pas de troisième valeur.**
L'industrie pose sa carte à 16 px (Material, Bootstrap, Polaris, Carbon, Primer)
— mais avec des rayons de 6 à 12 px. Le nôtre est à **14 px**, et c'est le rapport
du padding au rayon qui décide : sous ~1,4× le contenu serre la courbe et le coin
se lit comme une coupe. 16 px ne donne que 1,14× ; 24 px donne 1,71×.
`Card` tient déjà la décision (`size="md"` par défaut = 24 px, pris par 170 des
171 usages). Les 90 cartes faites main ont été ramenées sur ces deux valeurs.
⚠️ **16 px reste majoritaire** (56 contre 31) : à revoir surface par surface —
soit ces cartes sont vraiment denses, soit le canon devrait être 16.

## Typo — League Spartan sans italique

League Spartan n'a **aucune face Italic** → `font-display italic` rend un faux-italique synthétique. Pour de l'italique (blockquotes éditoriaux…), utiliser `font-body italic` (Nunito, vrai italic).
