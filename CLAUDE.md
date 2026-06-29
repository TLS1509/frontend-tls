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
│   ├── ui/          Badge (incl. StatusBadge+TrendingBadge), Alert, Avatar, Modal, Toast, StatCard, TlsLogo… (51 composants)
│   ├── patterns/    ParcoursCard, CardGrid, SectionHeader, PageHeader, HeroSection,
│   │                EditorialHero, AuthShell, EditorialLayout, SectionCard,
│   │                RelatedItemList, ResumeLessonCard, ViewerHeader, AmbientBlobs… (40 composants)
│   ├── learning/    LessonCard, ArticleCard, SessionCard, VideoCard, PromptCard, AstucesCard, ResourceListItem…
│   ├── modals/      BookingModal, SuccessModal, VideoPlayerModal…
│   ├── cards/       NotificationCard, JournalEntryCard, JournalBubbleCard, JournalTypeTile
│   ├── forms/       FilterBar
│   └── layout/      Sidebar, NavItem
├── pages/           ~140 pages app (route-level) — toutes routées dans App.tsx ✅
├── styles/          design-tokens.css (source vérité), tls-components.css (CSS BEM actuel)
└── design-system/   spec.json (spécification officielle)
```

> ✅ **Sitemap complet** — toutes les pages sont créées et wired (Recherche, MagicLink, VerifyEmail, SubscriptionPayment, Billing, Positionnement incluses). Voir MIGRATION-PLAN.md pour l'historique des phases.

### Sync DS ↔ Figma & extractions (2026-06)

**18 composants extraits** de leur implémentation inline dans les pages vers `src/components/` (matchent désormais le DS Figma 1-pour-1) :

| Composant | Emplacement | Extrait depuis |
|-----------|-------------|----------------|
| `MoodSelector` | `ui/` | JournalNewEntry |
| `JournalTypeTile` · `JournalBubbleCard` | `cards/` | Journal* |
| `JournalChatCompose` · `StructuredQuestionAccordion` | `ui/` | Journal |
| `WritingPromptsAside` | `patterns/` | Dashboard/journal |
| `MessageBubble` (ui/) · `ConversationalChat` (patterns/) | | ChatInterface (UserBubble/AssistantBubble) |
| `DreyfusSlider` | `ui/` | Passeport (utilise `DREYFUS_LABELS` de `data/competencies`) |
| `BehavioralTileGrid` | `patterns/` | LessonPlayer/onboarding |
| `AstucesCard` · `ResourceListItem` | `learning/` | AstucesViewer / LessonPlayer |
| `EtapeAccordion` | `patterns/` | CourseDetail |
| `VeilleFormatShortcutCards` · `VeilleHeroFilterChips` | `patterns/` | Veille/Newsletter |
| `Combobox` · `QualitativeRating` | `ui/` | build / SessionFeedbackModal |
| `HeroSection` | `patterns/` | ajouté au Figma DS (sync inverse) |

**Règle** : ces composants existent en DS — réutiliser, ne PAS réimplémenter inline. Tous dans le showcase `Components.tsx`.

**Figma** : le fichier (`LccBZ1GKWQVwVzPtsSzk5Y`) est agency-grade (17/17 pages), avec **153 Figma Variables** (TLS/Colors·Spacing·Radius·Effects), 23 text styles, 20 effect styles. **98% des fills des composants sont bindés aux variables** (token-driven, "DS vivant"). Le dossier mort `components/documentation/` a été supprimé.

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
| `patterns/AuthShell` | Layout split-screen pour pages auth. Sous-composants : `AuthDivider`, `AuthSocialButton`, `AuthSuccess`, + champs glass-dark (`AuthField`, `AuthPasswordField`, `AuthCheckbox`) + boutons (`AuthPrimaryButton`, `AuthGhostButton`). Consommé par Login, Signup, ForgotPassword, ResetPassword, MagicLink, VerifyEmail. **`AuthFeature` supprimé Phase 19.C-2026-05-26** (deprecated depuis 2026-05-09, 0 consumer). |
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
| `primary` | Surface teal tintée (primary-50/100) | Monochrome teal (primary-500) |
| `warm` | Surface warm/secondary | Amber-white (secondary-500) |
| `sun` | Surface sun/accent | Golden (accent-400) |
| `ink` | Impression / monochrome / haute contraste | Dark ink-900 |

**Règle** : toujours passer `variant="light"` sur fond dark/glass (AuthShell = `withBubble={false} variant="light"`). Ne jamais hardcoder `fill="#..."` dans le SVG — étendre `FILLS` dans `TlsLogo.tsx`.

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

## Stratégie de styling — Migration Tailwind (en cours)

### Objectif final
Remplacer 100% des classes CSS BEM (`.btn`, `.card`, etc.) et des inline styles `style={{}}` par des **classes Tailwind mappées** depuis `src/index.css` (configuration CSS-first Tailwind v4).

### Configuration Tailwind v4 — CSS-first

Tailwind v4 utilise une approche **CSS-first** où les tokens sont définis directement dans `src/index.css` (et non dans un fichier JS).

**Fichier clé : `src/index.css`**
```css
@import "tailwindcss";

@source "../**/*.{js,ts,jsx,tsx,html}";

@theme {
  --color-primary-50: #E8F4F7;
  --color-primary-100: #DCEBEF;
  /* ... 50-900 ... */
  --color-primary-600: #4A8FA1;
  --color-primary-700: #3D7786;
  /* ... */
  
  --color-secondary-500: #ED843A;
  /* ... */
  
  --radius-pill: 999px;
  --radius-2xl: 24px;
  
  --font-display: 'League Spartan', 'Helvetica Neue', Arial, sans-serif;
  --font-body: 'Nunito', -apple-system, BlinkMacSystemFont, 'Segoe UI', system-ui, sans-serif;
  
  --text-h1: 2.25rem;
  --text-body: 1rem;
  --text-caption: 0.8125rem;
}
```

**Règle critique pour `src/styles/globals.css`** : Tous les sélecteurs d'éléments doivent être dans `@layer base` sinon les inline reset (`* { margin: 0; }`) bloqueront les utilities Tailwind :

```css
@layer base {
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  
  html { font-size: 16px; }
  body { font-family: var(--font-body); }
  a { color: inherit; text-decoration: none; }
}
```

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

### Couleurs
| Token | Classe Tailwind | Hex |
|---|---|---|
| primary-50 | `bg-primary-50` / `text-primary-50` | #E8F4F7 |
| primary-100 | `bg-primary-100` / `text-primary-100` | #DCEBEF |
| primary-200 | `bg-primary-200` / `text-primary-200` | #B9D7DF |
| primary-300 | `bg-primary-300` / `text-primary-300` | #96C3CF |
| primary-400 | `bg-primary-400` / `text-primary-400` | #73AFBF |
| primary-500 | `bg-primary-500` / `text-primary-500` | #55A1B4 |
| primary-600 | `bg-primary-600` / `text-primary-600` | #4A8FA1 |
| primary-700 | `bg-primary-700` / `text-primary-700` | #3D7786 |
| primary-800 | `bg-primary-800` / `text-primary-800` | #2F5F6A |
| primary-900 | `bg-primary-900` / `text-primary-900` | #1F3E45 |
| secondary-50 | `bg-secondary-50` / `text-secondary-50` | #FFF3EB |
| secondary-500 | `bg-secondary-500` / `text-secondary-500` | #ED843A |
| secondary-600 | `bg-secondary-600` / `text-secondary-600` | #C06920 |
| accent-50 | `bg-accent-50` / `text-accent-50` | #FFF9EE |
| **accent-400** ⭐ | `bg-accent-400` / `text-accent-400` | **#F8B044 — TLS Yellow Base canonique** |
| accent-500 | `bg-accent-500` / `text-accent-500` | #DF9E3D (legacy step) |
| ink-50 | `bg-ink-50` / `text-ink-50` | #f9fafb |
| ink-100 | `bg-ink-100` / `text-ink-100` | #f3f4f6 |
| ink-900 | `bg-ink-900` / `text-ink-900` | #1a1a1a |

(Liste complète dans `src/index.css` @theme — 50+ couleurs)

### Couleurs sémantiques (états : success / danger / warning / info)

⚠️ **Important** : la palette semantic a été migrée vers des tons **muted/coral** alignés avec la palette TLS — **NE PAS** utiliser le green Tailwind brut (#22C55E) ou le red brut (#EF4444). Tous les tokens `*-light` / `*-border` ont été mis à jour pour dériver de la `*-base` canonique (commit 2026-05-09).

| État | bg | fg | base | Hex base | Notes |
|---|---|---|---|---|---|
| **success** | `bg-success-bg` | `text-success-fg` | `bg-success-base` | **#9DBEBA** | muted teal-green (PAS bright green) |
| **danger**  | `bg-danger-bg`  | `text-danger-fg`  | `bg-danger-base`  | **#F28559** | soft coral (PAS bright red) — pour alerts/badges. Pour **bouton destructive** : `bg-danger-strong` (#C0432A) rest · `active:bg-danger-deep` (#9B2F1B) — NE PAS utiliser `bg-red-600` |
| **warning** | `bg-warning-bg` | `text-warning-fg` | `bg-warning-base` | **#F8B044** | TLS Yellow (= accent-400) |
| **info**    | `bg-info-bg`    | `text-info-fg`    | `bg-info-base`    | **#55A1B4** | TLS Primary (= primary-500) |

Pour les **overlays diffus** (lesson cards, error states, completion borders), utiliser les tokens legacy `--tls-*-light`, `--tls-*-light-bg`, `--tls-*-border` (définis dans `design-tokens.css`) — ils dérivent désormais des bases ci-dessus :
- `--tls-success-light: rgba(157, 190, 186, 0.08)`
- `--tls-success-light-bg: rgba(157, 190, 186, 0.18)`
- `--tls-success-border: rgba(157, 190, 186, 0.30)`
- `--tls-danger-light: rgba(242, 133, 89, 0.06)`
- `--tls-danger-border: rgba(242, 133, 89, 0.25)`
- `--tls-warning-light: rgba(248, 176, 68, 0.08)`
- `--tls-warning-border: rgba(248, 176, 68, 0.30)`
- `--tls-info-light: rgba(85, 161, 180, 0.08)`
- `--tls-info-border: rgba(85, 161, 180, 0.25)`

### Typographie
| CSS Variable | Classe Tailwind |
|---|---|
| --text-h1 | `text-h1` |
| --text-h2 | `text-h2` |
| --text-h3 | `text-h3` |
| --text-h4 | `text-h4` |
| --text-body | `text-body` |
| --text-body-lg | `text-body-lg` |
| --text-body-sm | `text-body-sm` |
| --text-caption | `text-caption` |
| --text-micro | `text-micro` |
| --font-display | `font-display` |
| --font-body | `font-body` |
| --font-mono | `font-mono` |

#### Letter-spacing (tracking) — échelle graduée (2026-06-10)

Tracking **gradué** : plus le titre est gros, plus on serre ; le corps reste neutre. Aligné 1:1 sur les text styles Figma (h1 -3% · h2/h3 -2.5% · h4 -2% · body 0). Les utilities `text-h1`…`text-h4` portent désormais le letter-spacing via `--text-h*--letter-spacing` ; les règles élément `h1-h4` (globals.css / design-tokens.css) consomment les mêmes tokens.

| Token | Valeur | Appliqué à |
|---|---|---|
| `--tracking-display` | -0.03em | display, h1 (`text-h1`) |
| `--tracking-headline` | -0.025em | h2, h3 (`text-h2`/`text-h3`) |
| `--tracking-snug` | -0.02em | h4 (`text-h4`) |
| (neutre) | 0 | body, caption, micro, button |

> ⚠️ Ne **jamais** revenir à un `-0.02em` plat sur tous les headings (flat scale = anti-pattern). Le marketing BEM (`display-*`, `pole__title`) garde son propre tracking — hors de ce système `@theme`.

### Espaces & Rayons
| Token | Classe Tailwind |
|---|---|
| --radius-xs | `rounded-xs` (4px) |
| --radius-sm | `rounded-sm` (6px) |
| --radius-md | `rounded-md` (10px) |
| --radius-lg | `rounded-lg` (14px) |
| --radius-xl | `rounded-xl` (20px) |
| --radius-2xl | `rounded-2xl` (24px) |
| --radius-pill | `rounded-pill` (999px) ⚠️ **NOT `rounded-full`** |

### Ombres
| Token | Classe Tailwind | Valeur | Usage |
|---|---|---|---|
| --shadow-xs | `shadow-xs` | `0px 1px 2px rgba(0,0,0,0.05)` | Micro-interactions (hover buttons, chips) |
| --shadow-sm | `shadow-sm` | `0px 2px 4px rgba(0,0,0,0.08)` | Input focus, subtle card elevation |
| --shadow-md | `shadow-md` | `0px 4px 8px rgba(0,0,0,0.10)` | Standard cards, dropdowns |
| --shadow-lg | `shadow-lg` | `0px 8px 16px rgba(0,0,0,0.12)` | Modals, floating panels |
| --shadow-brand-sm / -md 🆕 | `shadow-brand-sm` / `shadow-brand-md` (teal teinté — CTA/hero brand) |
| --shadow-warm-sm / -md 🆕 | `shadow-warm-sm` / `shadow-warm-md` (orange teinté) |
| --shadow-sun-sm 🆕 | `shadow-sun-sm` (golden teinté) |
| --shadow-danger-md 🆕 | `shadow-danger-md` (terracotta glow — bouton destructive hover) |
| --shadow-card | `shadow-card` | `0px 1px 3px rgba(237,132,58,0.07), 0px 1px 2px rgba(0,0,0,0.05)` | ⭐ Resting Card state (warm amber tint 7% + black 5%) — Phase 19.D |
| --shadow-card-hover | `shadow-card-hover` / `hover:shadow-card-hover` | `0px 4px 14px rgba(237,132,58,0.11), 0px 2px 6px rgba(0,0,0,0.07)` | Card hover lift (warm amber 11%) — interactive signal |
| --shadow-card-lift | `shadow-card-lift` / `hover:shadow-card-lift` | `0px 8px 24px rgba(237,132,58,0.14), 0px 4px 8px rgba(0,0,0,0.06)` | Strong card lift (warm amber 14%) — interactive card active state |

Fichier de référence complet : `src/index.css` (@theme block)

---

## Semantic spacing tokens (introduits 2026-05-10)

7 tokens `--spacing-*` définis dans `src/index.css` @theme. Tailwind v4 auto-génère les utilities `gap-X`, `mt-X`, `mb-X`, `space-y-X`, `p-X`, etc.

| Token | Valeur | Usage recommandé |
|-------|--------|------------------|
| `--spacing-tight` | 0.125rem (2px) | heading ↔ subtitle (intra-bloc serré) |
| `--spacing-stack-xs` | 0.5rem (8px) | inline groups, métadonnées |
| `--spacing-stack` | 1rem (16px) | **DEFAULT** — section header ↔ contenu, items dans une stack |
| `--spacing-stack-lg` | 1.5rem (24px) | content ↔ content au sein d'une même section |
| `--spacing-section` | 2rem (32px) | entre sections sœurs |
| `--spacing-section-lg` | 2.5rem (40px) | séparations majeures |
| `--spacing-page` | 3rem (48px) | groupements page-level |

**Pattern :**
```tsx
<section className="flex flex-col gap-stack">       {/* ✅ token sémantique — exprime l'intention */}
<section className="flex flex-col gap-4">           {/* ⚠️ légitime mais générique — préférer un token nommé */}
<section className="flex flex-col gap-section">     {/* ✅ pour des sous-sections distinctes */}
```

`Dashboard.tsx` et `SectionHeader.tsx` consomment exclusivement ces tokens depuis 2026-05-10.

---

## Utility tokens étendus (introduits 2026-05-10)

25 tokens `@theme` additionnels dans `src/index.css` couvrant opacity / z-index / duration / ease / container / blur. Tailwind les expose via les utilities classiques.

### Opacity (6 tokens)
| Token | Valeur | Usage |
|-------|--------|-------|
| `--opacity-faint` | 0.05 | overlays quasi-invisibles (tinted hover, shimmer) |
| `--opacity-soft` | 0.10 | bordures subtiles, glass passif |
| `--opacity-tinted` | 0.15 | hover light, divider coloré |
| `--opacity-medium` | 0.30 | scrim modal léger, glass actif |
| `--opacity-disabled` | 0.50 | états disabled (input, button) |
| `--opacity-overlay` | 0.70 | scrim modal foncé, popover backdrop |

```tsx
<div className="bg-primary-500/medium" />        {/* fond teal 30 % */}
<button disabled className="opacity-disabled" /> {/* 50 % */}
```

### z-index (7 tokens)
| Token | Valeur | Usage |
|-------|--------|-------|
| `--z-base` | 1 | layout par défaut, élévation minimale |
| `--z-sticky` | 20 | navbar sticky, sous-headers |
| `--z-dropdown` | 30 | menus déroulants |
| `--z-overlay` | 40 | scrims sous-modal |
| `--z-modal` | 50 | dialogs centraux |
| `--z-toast` | 60 | toasts (au-dessus des modals) |
| `--z-tooltip` | 70 | tooltips (le plus haut) |

```tsx
<div className="z-modal" />        {/* 50 */}
<aside className="z-sticky" />     {/* 20 */}
```

### Duration (4 tokens)
| Token | Valeur | Usage |
|-------|--------|-------|
| `--duration-fast` | 150ms | micro-interactions (hover bouton) |
| `--duration-base` | 200ms | **DEFAULT** transitions composant |
| `--duration-slow` | 300ms | panels, drawer |
| `--duration-glacial` | 600ms | animations expressives (celebration) |

### Ease (4 tokens)
| Token | Valeur | Usage |
|-------|--------|-------|
| `--ease-standard` | `cubic-bezier(0.4, 0, 0.2, 1)` | DEFAULT |
| `--ease-decelerate` | `cubic-bezier(0, 0, 0.2, 1)` | entrées (modal-in, dropdown) |
| `--ease-accelerate` | `cubic-bezier(0.4, 0, 1, 1)` | sorties (modal-out) |
| `--ease-emphasis` | `cubic-bezier(0.22, 1, 0.36, 1)` | ease-out-quint expressif (celebration, achievement reveal) — pas de rebond |

```tsx
<div className="transition-all duration-base ease-standard" />
```

### Container max-widths (4 tokens)
| Token | Valeur | Usage |
|-------|--------|-------|
| `--container-prose` | 65ch | article body, textes longs |
| `--container-content` | 48rem (768px) | layouts mobile-first |
| `--container-page` | 72rem (1152px) | DEFAULT page wrapper |
| `--container-wide` | 80rem (1280px) | dashboard, showcase |

```tsx
<main className="max-w-page mx-auto" />
<article className="max-w-prose" />
```

### Blur (4 tokens)
| Token | Valeur | Usage |
|-------|--------|-------|
| `--blur-glass-light` | 8px | hover sur surfaces tintées |
| `--blur-glass-medium` | 16px | DEFAULT panneaux glass |
| `--blur-glass-heavy` | 24px | hero blocks, navigation |
| `--blur-glass-ambient` | 60px | décor de fond, blobs |

```tsx
<aside className="backdrop-blur-glass-medium bg-white/70" />
```

---

## Pattern de migration — Composants avec variants

**Approche validée pour composants avec variants/sizes (Button, Card, Input, etc.)**

Au lieu de construire des strings de classes, utiliser des **maps TypeScript** :

```tsx
// ✅ PATTERN CORRECT (Button.tsx validé)
const BASE = 'inline-flex items-center justify-center gap-2 rounded-pill font-body font-semibold transition-all duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500 disabled:opacity-disabled disabled:cursor-not-allowed';

const VARIANT_CLASSES: Record<ButtonVariant, string> = {
  primary: 'bg-primary-600 text-white shadow-sm hover:bg-primary-700 active:bg-primary-800',
  warm: 'bg-secondary-500 text-white shadow-sm hover:bg-secondary-600 active:bg-secondary-700',
  secondary: 'bg-neutral-100 text-ink-900 border border-neutral-200 shadow-xs hover:bg-neutral-200 hover:border-primary-300',
  ghost: 'bg-transparent text-ink-900 hover:bg-neutral-100',
  'brand-ghost': 'bg-primary-50 text-primary-800 hover:bg-primary-100',
  destructive: 'bg-red-600 text-white hover:bg-red-700 active:bg-red-800',
  glass: 'bg-white/20 text-white border border-white/30 backdrop-blur-sm hover:bg-white/30',
  link: 'bg-transparent text-primary-700 underline underline-offset-4 hover:text-primary-800 p-0 h-auto',
};

const SIZE_CLASSES: Record<ButtonSize, string> = {
  sm: 'h-8 px-3.5 text-caption',
  md: 'h-10 px-5 text-body-sm',
  lg: 'h-12 px-6 text-body',
  xl: 'h-14 px-7 text-body-lg',
};

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  iconOnly = false,
  leadingIcon,
  trailingIcon,
  loading = false,
  fullWidth = false,
  className = '',
  children,
  ...rest
}) => {
  const classes = [
    BASE,
    VARIANT_CLASSES[variant],
    !iconOnly && SIZE_CLASSES[size],
    iconOnly && `w-10 ${size === 'sm' ? 'w-8' : size === 'lg' ? 'w-12' : size === 'xl' ? 'w-14' : 'w-10'} aspect-square`,
    fullWidth && 'w-full',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <button className={classes} {...rest}>
      {leadingIcon && <span className="inline-flex items-center justify-center shrink-0" style={{ width: '1em', height: '1em', fontSize: '1.05em', lineHeight: 0 }}>{leadingIcon}</span>}
      {!iconOnly && children}
      {trailingIcon && <span className="inline-flex items-center justify-center shrink-0" style={{ width: '1em', height: '1em', fontSize: '1.05em', lineHeight: 0 }}>{trailingIcon}</span>}
    </button>
  );
};
```

**Clés du pattern :**
1. **BASE** = tous les styles communs (padding, font, transitions, focus, disabled)
2. **VARIANT_CLASSES** = map variant → classes Tailwind complètes pour ce variant
3. **SIZE_CLASSES** = map size → hauteur + padding + taille de font
4. Assembler en array, filter(Boolean), join(' ')
5. ✅ Les valeurs d'icon spacing restent en `style={{}}` si calcul (1em, lineHeight: 0)

**Avantages :**
- Chaque variant/size est isolé et facile à modifier
- Les classes Tailwind sont vérifiées au build par `npm run dev` (Tailwind compile seulement ce qui existe dans le code)
- Pas d'arbitraire, pas de calcul dynamique

---

## Stratégie d'ordre — bottom-up

**Règle absolue depuis Phase 2.6 :** migrer les **primitives partagées AVANT les composites parents**.

**Pourquoi :** un composite migré qui consomme un enfant encore BEM reste **visuellement cassé** (ex. ParcoursCard avec progress bar BEM clippée, malgré son shell Tailwind correct). Migrer top-down force à revisiter chaque parent quand on finit un enfant — perte de temps + risque de regressions silencieuses.

**Ordre :**
1. **Atomes** (Badge, Pill, Avatar, ProgressBar, Alert, Skeleton) — autonomes, testables isolément
2. **Composites** (cards spécialisées, modales) — héritent automatiquement des atomes Tailwind
3. **Pages** — assemblent le tout

**Exception** : un atome utilisé par UN SEUL composite peut être migré dans le même commit que son parent. Mais dès qu'il y a 2+ consommateurs → migrer l'atome séparément en premier.

**Dépendance check** : avant de migrer un composant, exécuter :
```bash
grep -rn "import.*<NomDuComposant>" src/ --include="*.tsx" | wc -l
# Si > 1 et que le composant n'est pas migré → c'est lui qu'il faut migrer en premier.
```

---

## Workflow de migration — obligatoire

Pour chaque composant ou page, **toutes ces étapes sont OBLIGATOIRES** dans cet ordre. **Pas de commit avant la validation utilisateur sur les 4 checkpoints.**

```
ÉTAPE 1 — ANALYSE
  1.1 Lire le fichier source (.tsx)
  1.2 Lire le CSS BEM correspondant (dans tls-components.css, utilities.css, layouts.css)
  1.3 Identifier tous les inline styles style={{}} et classes CSS BEM
  1.4 Identifier les COLLISIONS potentielles entre classes Tailwind et CSS BEM
      → grep -rn "^\.border\b\|^\.shadow-\|^\.rounded-\|^\.text-\|^\.bg-" src/styles/*.css
      → Toute classe BEM qui porte le MÊME NOM qu'une utility Tailwind doit être
        wrappée dans @layer components dans globals.css

ÉTAPE 2 — IMPLÉMENTATION
  2.1 Créer les maps VARIANT_CLASSES, SIZE_CLASSES, TONE_*_CLASSES selon pattern Button
  2.2 Remplacer les références au BEM par les maps
  2.3 npx tsc --noEmit → 0 erreurs TypeScript

ÉTAPE 3 — AUDIT TAILWIND (à fournir à l'utilisateur)
  3.1 Produire un TABLEAU MARKDOWN qui prouve que le composant est 100% Tailwind :

  | Critère | Statut | Détails |
  |---------|--------|---------|
  | Pas d'inline styles `style={{}}` | ✅/❌ | (count) |
  | Pas de classes BEM `.x--*` | ✅/❌ | (count) |
  | Tokens Tailwind mappés | ✅/❌ | bg-primary-X, text-ink-X, etc. |
  | Pas de `bg-[var(...)]` arbitraire | ✅/❌ | (count) |
  | Pattern variant maps | ✅/❌ | VARIANT_CLASSES, SIZE_CLASSES |
  | Hover/Active/Focus states | ✅/❌ | hover:, active:, focus-visible: |
  | Classes statiques (pas de string concat) | ✅/❌ | |
  | rounded-pill (pas rounded-full) | ✅/❌ | (si applicable) |

  3.2 Si UN seul ❌ → corriger AVANT de passer à l'étape 4

ÉTAPE 4 — VÉRIFICATION CASCADE CSS (ANTI-OVERRIDE BEM)
  4.1 Vérifier qu'aucun fichier CSS legacy n'override les classes Tailwind utilisées :

  ```js
  // Test à exécuter via preview_eval (script type=module)
  const card = document.querySelector('[data-test-target]'); // ou élément du composant
  const matchingRules = [];
  for (const sheet of document.styleSheets) {
    for (const rule of sheet.cssRules || []) {
      const sel = rule.selectorText;
      if (sel && card.matches(sel) && (rule.style?.borderColor || rule.style?.boxShadow)) {
        matchingRules.push({ selector: sel, ...rule.style });
      }
    }
  }
  // Si matchingRules contient des règles CSS BEM (`.border`, `.shadow-sm` non-Tailwind)
  // → wrapper le fichier source dans @layer components
  ```

  4.2 Confirmer que `getComputedStyle()` retourne les valeurs Tailwind attendues
      (ex. ink-200 = rgb(229, 231, 235), pas la valeur de var(--border))

ÉTAPE 5 — VALIDATION UTILISATEUR (4 CHECKPOINTS OBLIGATOIRES)
  Présenter à l'utilisateur les 4 questions suivantes EN UNE SEULE FOIS :

  ☐ CHECKPOINT 1 — Affichage de base
    "Vérifie que le composant s'affiche correctement sur /components.
     URL : http://localhost:5173/components → section [Nom du composant]
     Tous les variants/sizes sont-ils visibles ?"

  ☐ CHECKPOINT 2 — Cascade CSS propre
    "Voici l'audit des règles CSS qui s'appliquent au composant :
     [matchingRules trouvées]
     Confirmes-tu qu'aucune règle CSS BEM n'override Tailwind ?"

  ☐ CHECKPOINT 3 — Hover/Active/Focus interactifs
    "Survole chaque variant avec ta souris et confirme :
     - Le curseur change si applicable (cursor-pointer)
     - Les bordures/ombres/couleurs changent au hover
     - L'effet active/focus fonctionne (clic, tab)
     Tous les états interactifs sont-ils visibles ?"

  ☐ CHECKPOINT 4 — Audit Tailwind
    "Voici le tableau d'audit prouvant que le composant est 100% Tailwind :
     [tableau de l'étape 3.1]
     Approuves-tu ce tableau ?"

ÉTAPE 6 — COMMIT (UNIQUEMENT après 4 ✅)
  6.1 Format : `refactor: migrate [ComponentName] to Tailwind`
  6.2 Ne JAMAIS commit avant les 4 checkpoints validés
  6.3 Ne JAMAIS passer au composant suivant sans validation

ÉTAPE 7 — MISE À JOUR DOCUMENTAIRE (à la fin de CHAQUE phase, obligatoire)
  7.1 MIGRATION-PLAN.md → cocher la case ✅ + mettre à jour "Progrès global"
  7.2 CLAUDE.md → ajouter tout nouveau pattern, piège, ou règle découvert
      pendant cette phase (ex. nouvelle collision CSS, nouveau workaround Tailwind v4)
  7.3 Si nouveau composant Core/UI ajouté : mettre à jour la section "Architecture"
  7.4 Si nouveau token ajouté à index.css : mettre à jour la table "Référence Tailwind → Design Tokens"
  7.5 Commit séparé pour la doc si plus de 2 fichiers de doc modifiés :
      `docs: update CLAUDE.md/MIGRATION-PLAN.md after [Phase X] validation`
```

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
   Impact : ~164 usages `var(--tls-ink-*)` (surtout `components/documentation/*`) passent de teal-tinté à neutre. **Le Figma DS est synchronisé sur `index.css` (neutre)** — donc Figma ↔ Tailwind ↔ BEM rendent enfin les mêmes gris. **Règle générale** : ne JAMAIS redéfinir une valeur de couleur/radius dans `design-tokens.css` ; toujours `var(--color-*)` / `var(--radius-*)` depuis `@theme`. NB : les `--shadow-*` ont le MÊME nom dans les deux fichiers → `@theme` (chargé après) gagne déjà, pas d'action.

4. **CSS importés SANS `@layer` dans globals.css** : Tout fichier CSS importé sans `layer(...)` se retrouve dans la cascade NON-LAYERED, qui **gagne sur toutes les couches nommées** (utilities, components, base). Pendant la migration de Input.tsx, on a découvert que `animations-polish.css` était importé sans layer et ses `.transition-colors` / `.transition-all` / `.transition-shadow` / `.transition-transform` legacy écrasaient les versions Tailwind. Symptôme : transitions de couleur très lentes (~400 ms au lieu de 200 ms), focus border qui semble ne jamais s'activer en mesure synchrone. **Fix appliqué** : `@import './animations-polish.css' layer(components);` dans `globals.css`. **Action générale** : auditer tous les `@import` de `globals.css` et confirmer qu'ils ont `layer(...)` ou que leurs sélecteurs ne collisionnent pas avec Tailwind.

5. **Sélecteurs d'éléments globaux non-layered** (ex. `:focus-visible`, `input:focus`, `textarea:focus`) : Si un sélecteur global (sans classe) qui matche un `<input>` ou `<textarea>` est défini en dehors d'un `@layer`, il bat toutes les utilities Tailwind, même `focus:outline-none`. Découvert en migrant `Input.tsx` : `globals.css:179` avait `:focus-visible { outline: 2px solid ... }` non layered, qui ajoutait un outline au `<textarea>` interne malgré `outline-none` sur le wrapper. **Fix appliqué** : envelopper la règle dans `@layer base { :focus-visible { ... } }`. **Action générale** : tout sélecteur d'élément (input, textarea, button, a) avec pseudo-classe focus/hover doit être en `@layer base` ou `@layer components`. Vérifier aussi `components-modern.css:198` (`input:focus, textarea:focus, select:focus { box-shadow: inset ... }`) qui injecte un inset shadow ; on l'écrase au niveau Input.tsx via `focus:outline-none focus:shadow-none focus:bg-transparent` sur la classe du `<input>`/`<textarea>` interne (specificity Tailwind > specificity element).

6. **Border color split entre BASE et STATUS** : Si un composant a une `border-X-Y` dans la BASE (couleur par défaut) ET un override dans `STATUS_CLASSES` (couleur erreur/succès), Tailwind v4 émet les deux dans le même `@layer utilities` et la spécificité est identique (0,1,0). L'ordre dans la classe **n'importe pas** ; c'est l'ordre d'émission de Tailwind qui décide → souvent la couleur de base gagne. **Solution** : retirer la couleur de la BASE et la mettre dans `STATUS_CLASSES.default`, comme dans `Input.tsx`. Garder seulement `border` (largeur) dans BASE.

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

## Points d'attention lors de la migration

### ⚠️ Radius : `rounded-pill` vs `rounded-full`
- **`rounded-full`** = `border-radius: 50%` — crée un cercle, non-idéal pour les boutons larges
- **`rounded-pill`** = `border-radius: 999px` (défini dans index.css) — capsule shape, bon pour tous les largeurs
- **Action** : Toujours utiliser `rounded-pill` pour les Button, pas `rounded-full`

### ⚠️ Hover/Active/Focus states
Tailwind génère les pseudo-classes : utiliser `hover:`, `active:`, `focus-visible:` directement dans la classe string :
```tsx
// ✅ BON
className="bg-primary-600 hover:bg-primary-700 active:bg-primary-800 focus-visible:outline-2"

// ❌ MAUVAIS
style={{ background: isHover ? primaryHover : primaryBase }}
```

### ⚠️ Toujours tester `npm run dev` après migration
Tailwind v4 compile en fonction des classes trouvées dans le code via `@source`. Si une classe n'apparaît pas dans un fichier `.tsx`, elle ne sera pas compilée :
```
npm run dev
→ navigateur F12 → DevTools → Computed styles sur le composant
→ vérifier que les classes Tailwind existent dans le CSS généré
```

Si une classe est manquante : elle n'a probablement pas été écrite dans le code (typo, ou utilisée dynamiquement via string concat).

### ⚠️ GlobalsCss — TOUJOURS @layer base
```css
// ❌ MAUVAIS — réset non-layered override les utilities
* { margin: 0; padding: 0; }
body { font-family: var(--font-body); }

// ✅ BON — reset dans @layer base
@layer base {
  * { margin: 0; padding: 0; }
  body { font-family: var(--font-body); }
}
```

---

## Phase 10 — Holistic UX/UI rework (en cours)

**Objectif** : Refaire toutes les pages restantes de la learning app avec les components et patterns du design system. Adapter ou créer si manquant. Maintenir la cohérence UX/UI app-wide.

### Workflow par page (OBLIGATOIRE)

1. **Audit** (10 min)
   - Lire la page complète
   - Identifier sections principales
   - Tableau "section → pattern cible" (reuse / adapt / create)
   - UX/UI issues : hiérarchie, mobile-first, glass morphism, spacing semantic
   - Liste des composants showcase-only qui devraient être utilisés ici

2. **Décision composants** (5 min)
   - **REUSE** : composant existant fait le job tel quel
   - **EXTEND** : ajouter prop/variant manquant (ex: `tone="warm"`)
   - **ADAPT** : refactor le composant si visuel/API obsolète
   - **CREATE** : nouveau pattern justifié

3. **Implémentation** (variable)
   - Bottom-up : sections feuilles d'abord, hero/wrapper en dernier
   - Utiliser **semantic spacing tokens** (`gap-stack`, `gap-section`, etc.) — pas de `gap-4/6/8` arbitraire
   - Utiliser **EditorialHero tone-aware** pour les hero (tone selon thématique)
   - Pour pages avec contenu structuré : `EditorialLayout` (main + aside sticky)
   - Pour cards : `SectionCard` titled / `Card` glass / `RelatedItemList` selon contexte
   - Apple Messages bubble style (`PromptCard`, `EntryCard`) pour items "messageables" (journal, notifications)
   - `ActivityFeed` timeline pour flux chronologiques

4. **Vérification** (10 min)
   - `npx tsc --noEmit` → 0 erreurs
   - Preview screenshot mobile + desktop
   - DOM verify : pas de classes `tls-*` BEM legacy, pas de `var(--tls-*)` en `style={{}}`
   - Accessibilité : `min-h-touch` sur boutons, contrast ratio sur dark surfaces

5. **Showcase update**
   - Si EXTEND/CREATE → ajouter/update entry dans Components.tsx
   - Mettre à jour `usedBy: [...]` du component dans Components.tsx
   - Si la page consomme un component `showcaseOnly: true` → enlever le flag

### Priorités globales (mobile-first + learner-centric)

| Tier | Pages | Principe UX |
|---|---|---|
| **1** Daily-use | LearningPaths, LearningPathDetail, Coaching, Profile, Notifications, LessonPlayer, Veille | Reprendre l'action en 1 clic, lisibilité immédiate, glass morphism subtil |
| **2** Secondary core | Account, Leaderboard, Help, JournalDetail/Free/New, Magazine, VeilleContent, Dossier, Collaboration, Messages, WeeklyNewsletter, Onboarding | Cohérence avec Tier 1, patterns réutilisés |
| **3** Edge cases | AstucesViewer, FlashcardsViewer, VideoReels/Tutorial/Viewer, ComplementaryContentViewer, CourseDetail, Error pages | Légère mise au goût, pas de refonte profonde |

### Principes UX/UI app-wide

- **Mobile-first** : single column par défaut, layouts complexes en md/lg only.
- **Hiérarchie claire** : 1 action principale par viewport, secondary actions discrètes.
- **Glass morphism** : utiliser `backdrop-blur-glass-*` tokens, pas d'arbitraires `backdrop-blur-md`.
- **Spacing semantic** : `gap-stack`, `gap-section` — jamais `gap-4/6/8`.
- **Accessibilité** : `min-h-touch` (44px) sur tous interactive elements. WCAG AA contrast.
- **Tone narrativement cohérent** : primary (focus/leadership), warm (action/parcours), sun (réflexion/achievements), neutral (settings/utility).
- **Loading & empty states** : utiliser `Skeleton` + `EmptyState` (showcase) plutôt que blanks.

---

## Phase 14 — Workflow flow-based (2026-05-15+) ✅

**Changement de paradigme** : on n'opère plus écran-par-écran. Phase 14 redesign l'app **flow par flow** (user journey). Toute page modifiée DOIT l'être dans le cadre d'un flow audité.

**Status** : ✅ COMPLÈTE — 17 flows validés (14.5 → 14.17), tous les pièges d'API résolus, 0 erreurs TypeScript.

### Pourquoi
Refondre écran-par-écran fragmente la cohérence visuelle entre écrans liés. Refondre par niveau (N1 → N2 → N3) crée des dépendances circulaires. Le flow garantit que chaque parcours est testable end-to-end dès qu'il est terminé, et que le DS évolue dans un contexte d'usage réel.

### 6 étapes obligatoires par flow

```
1. AUDIT FLOW (~30 min)
   - Liste écrans (N1/N2/N3/Conditionnel)
   - Tableau "écran → patterns utilisés → DS gaps → UX issues"
   - Identifier composants showcase-only à intégrer
   - Identifier patterns manquants à créer/étendre
   → Présenter le tableau à l'utilisateur AVANT de toucher au code

2. DS UPDATE (variable)
   - Étendre/créer composants AVANT les écrans (bottom-up)
   - Mettre à jour Components.tsx (showcase + usedBy)
   - Mettre à jour Notion Design System DB

3. REDESIGN ÉCRANS (bottom-up)
   - Détail (N3) → Hub (N1) pour cohérence remontante
   - Tokens semantic spacing (gap-stack/gap-section), tone-aware
   - Mobile-first, glass tokens, min-h-touch (44px)
   - 100% Tailwind — rappel règles CLAUDE.md ci-dessus

4. VALIDATION FLOW (~15 min)
   - Preview : enchaîner les écrans du début à la fin via preview_*
   - Screenshots mobile (375px) + desktop (1280px)
   - npx tsc --noEmit → 0 erreurs
   - Vérifier transitions, glass, cohérence tone (max 2 tones par flow)

5. DOC + NOTION SYNC
   - MIGRATION-PLAN.md → cocher la phase (⬜ → ✅)
   - CLAUDE.md → ajouter pattern/piège découvert
   - DESIGN.md → §4 patterns canoniques + §5 pièges
   - Notion Écrans DB → Statut design "Validé"
   - Notion Design System DB → composants à jour

6. COMMIT
   - `feat(phase-14.X): redesign [flow name] flow`
   - Un commit par flow validé (4 checkpoints OK)
```

### Pièges découverts Phase 14

**API mismatches systématiques** — tous les composants de la phase Phase 14 ont révélé des écarts API constants à travers les pages. Une checklist pour les futures phases :

| Composant | Prop incorrecte | → | Prop correcte | Pages concernées |
|-----------|-----------------|---|---------------|-----------------|
| **EditorialHero** | `subtitle=` | → | `summary=` | ~60 pages |
| **EditorialHero** | `actions={<Button>}` | → | `trailing={<Button>}` | ~50 pages |
| **EditorialHero** | `tone="primary"` ou `"neutral"` | → | `tone="default"` | ~30 pages (brand/warm/sun OK) |
| **SectionCard** | `icon=` | → | `titleIcon=` | ~40 pages |
| **SectionCard** | `actions=` (header-right) | → | `headerAction=` | ~15 pages (note: `actions=` footer slot IS valid) |
| **ProgressBar** | `tone=` | → | `fill=` | ~25 pages (tone n'existe pas, fill oui) |
| **Tabs** | `tabs=/activeTab/onTabChange` | → | `items=/value/onChange` | ~10 pages |
| **Button** | `variant="glass-light-ghost"` | → | `variant="ghost"` | 3 pages (glass-light-ghost n'existe pas) |
| **Card** | `tone="neutral"` | → | remove prop | 3 pages (CardTone = primary/warm/sun/brand seulement) |

**Cause racine** : API props non documentées dans les components eux-mêmes (pas de JSDoc complet sur tous les composites). À faire en Phase 15+ : ajouter une checklist de validation API par composant dans Components.tsx showcase.

### Anti-patterns Phase 14
- ❌ Toucher une page hors d'un flow audité (même pour un "petit fix")
- ❌ Modifier un composant DS sans le mettre à jour dans Components.tsx + Notion DS DB
- ❌ Marquer un flow ✅ sans screenshots mobile ET desktop
- ❌ Mélanger plus de 2 tones dans un même flow (1 dominant + 1 accent max)
- ❌ Commit sans `npx tsc --noEmit` clean

### Ordre des flows
Voir `MIGRATION-PLAN.md` § PHASE 14 pour le découpage complet 14.1 → 14.17 (Tier 1 daily-use → Tier 5 edge cases).

📄 Plan détaillé : `~/.claude/plans/plan-phase-14-lazy-kernighan.md`

---

## Phase 15 — Validation & Polish (2026-05-15+) 🚀

**Objectif** : Valider la cohérence end-to-end après Phase 14, capturer screenshots finaux, peaufiner les détails visuels.

**Checklist Phase 15** (voir MIGRATION-PLAN.md pour détails) :
- [ ] End-to-end flow testing (signup → dashboard → first lesson → badge)
- [ ] Mobile (375px) + Desktop (1280px) screenshots pour toutes pages
- [ ] Visual consistency : max 2 tones/flow, semantic spacing appliqué, 0 BEM legacy
- [ ] Design system complete : tous showcase-only intégrés, usedBy à jour
- [ ] Doc finalized : CLAUDE.md Phase 14 + DESIGN.md §4/5 à jour, Notion sync ✅
- [ ] `npx tsc --noEmit` + `npm run build` → 0 erreurs

**Workflow Phase 15** :
1. Valider new-user journey end-to-end (pas de glitchs visuels)
2. Capturer 375px + 1280px screenshots pour documentation
3. Audit final : zéro BEM legacy, zéro inline var(), semantic spacing partout
4. Sync Notion avec code state final
5. Single commit final : `docs(phase-15): finalize validation & screenshots after Phase 14 redesign`

---

## Phase 16 — Spec Compliance (alignement FO ↔ Cahiers des charges) 🚀

**Contexte** : Phases 1–15 ont migré le visuel (Tailwind + design system + redesign par flow). Le FO React **existe** pour les 17 cahiers Notion (~140 pages routées), mais la **conformité fonctionnelle aux specs** n'a jamais été auditée. Phase 16 ferme ce gap, un cahier à la fois.

### Source de vérité : les 17 cahiers Notion

| # | Cahier | URL |
|---|--------|-----|
| 01 | Parcours & Learning Space | https://www.notion.so/thelearningsociety/01_Parcours_Learning_Space-361cdd696db681bcb0bff1ab6d3a4117 |
| 01bis | Items Apprentissage & Veille | https://www.notion.so/thelearningsociety/01bis_Items_Apprentissage_Veille-361cdd696db681bebc4ef33390e39abf |
| 02 | Passeport Compétences | https://www.notion.so/thelearningsociety/02_Passeport_Competences-361cdd696db681959e1ec1de4a3d6d24 |
| 03 | Onboarding & User Profile Mapping | https://www.notion.so/thelearningsociety/03_Onboarding_and_User_Profile_Mapping-361cdd696db681139132e7823e13355a |
| 04 | Coaching & 1-1 Messaging | https://www.notion.so/thelearningsociety/04_Coaching_and_1-1_Messaging-361cdd696db681dabd3acaf585e69710 |
| 05 | Gamification & Badges | https://www.notion.so/thelearningsociety/05_Gamification_Badges-361cdd696db6810b8df5e7a9a3c8bb35 |
| 06 | Enterprise FO Space | https://www.notion.so/thelearningsociety/06_Enterprise_FO_Space-361cdd696db6816484d2ee7c43214e09 |
| 07 | Journal de Bord Réflexif | https://www.notion.so/thelearningsociety/07_Journal_de_Bord_Reflexif-361cdd696db68189b6bec9ee65db14f6 |
| 08 | Masterclass / Atelier / Événements | https://www.notion.so/thelearningsociety/08_Masterclass_Atelier_Pratique_Evenements-361cdd696db681129da3d55c741edd21 |
| 09 | Notifications Management | https://www.notion.so/thelearningsociety/09_Notifications_Management-361cdd696db681fe8154e4f27cfe7fef |
| 10 | Analytics Tracking System | https://www.notion.so/thelearningsociety/10_Analytics_Tracking_System-361cdd696db681638732d06c7a72b7df |
| 10bis | BO Organization UX (hors repo) | https://www.notion.so/thelearningsociety/10bis_Back_Office_Organization_UX_Design-361cdd696db68161aeeff5c75108d763 |
| 11 | Projects SBO | https://www.notion.so/thelearningsociety/11_Projects_SBO-361cdd696db681abbbdfd345a8abb4ac |
| 11bis | Subscription Management | https://www.notion.so/thelearningsociety/11bis_Subscription_Management_System-361cdd696db681a1819be823d10e7705 |
| 12 | Chatbot IA & QAR | https://www.notion.so/thelearningsociety/12_Chatbot_IA_et_QAR-361cdd696db6812c8d83d2e7a4b7e28e |
| 12bis | IA Features Framework | https://www.notion.so/thelearningsociety/12bis_IA_Features_Framework-361cdd696db681109559da81e28d3110 |
| 13 | Helpcenter Wiki Support | https://www.notion.so/thelearningsociety/13_Helpcenter_Wiki_Support-361cdd696db6819db669ca4094aabde0 |
| 13bis | GDPR / AI Act / Security | https://www.notion.so/thelearningsociety/13bis_GDPR_AI_Act_Security-361cdd696db6816a98c3ecd08b36c1c2 |

### Workflow par cahier (5 étapes — OBLIGATOIRE)

```
1. GAP ANALYSIS (~30 min via Explore agent)
   - Lire cahier (sections IN/OUT, Écrans, Fonctionnalités MVP, Modèle de données)
   - Lister pages FO concernées (grep dans src/pages/)
   - Coverage matrix : | Feature spec | Page actuelle | Statut ✅/🟡/❌ | Notes |
   - Identifier 5–7 chantiers chiffrés (S < 1j / M 1–2j / L > 2j)

2. DATA FIRST
   - Enrichir/créer types dans src/types/<cahier>.ts (jamais inventer hors spec)
   - Enrichir mock data dans src/data/<cahier>.ts
   - Si nouveau référentiel (compétences, badges, types items) : un fichier dédié

3. COMPOSANTS (bottom-up)
   - Étendre composants existants AVANT de créer de nouveaux
   - Tout nouveau composant → entrée dans src/pages/Components.tsx avec usedBy
   - Tone-aware si applicable (primary/warm/sun/brand)
   - Semantic spacing tokens (gap-stack, gap-section)

4. PAGES (modifier l'existant, ne pas recréer)
   - Phase 14-15 a verrouillé le visuel → ne PAS redessiner
   - Câbler les nouveaux composants/data dans les pages présentes
   - Conserver tone, spacing, et hiérarchie visuelle existants

5. WIRING STORE + VALIDATION
   - Ajouter state dans Zustand (src/stores/persistence.ts ou store dédié)
   - npx tsc --noEmit → 0 erreurs
   - Smoke test FO via preview_* MCP (mobile 375px + desktop 1280px)
   - Notion sync : Écrans DB (Statut "Validé"), Design System DB (nouveaux composants)
   - Commit : `feat(phase-16.X): align [cahier name] to spec`
```

### Anti-patterns Phase 16

- ❌ **Redessiner** — Phase 14-15 a verrouillé le visuel. Phase 16 = **functional only**.
- ❌ **Inventer des champs hors spec** — toujours croiser avec le cahier Notion correspondant. Si la spec est ambiguë → AskUserQuestion avant.
- ❌ **Mocker côté serveur** — pas de stub API ; les mock data restent dans `src/data/`.
- ❌ **Multi-cahier en parallèle** — un cahier à la fois, validation utilisateur entre chaque.
- ❌ **Ignorer les pré-requis cahier** — respecter l'ordre de dépendances (16.2 Passeport bloque 16.1/16.5/16.7/16.11/16.13).

### Ordre d'exécution recommandé

```
16.2 (Passeport — bloque tout)
  ↓
16.1 (Parcours) → 16.3 (Onboarding) → 16.12 (Subscription)
  ↓
16.5 (Gamification) / 16.7 (Journal)
  ↓
16.4 (Coaching)
  ↓
16.6 (Enterprise) / 16.10 (Analytics)
  ↓
16.13 (Chatbot) / 16.14 (IA Framework overlay)
  ↓
16.8 (Masterclass) / 16.11 (Projects SBO)
  ↓
16.15 (Helpcenter) / 16.16 (GDPR)
```

Voir `MIGRATION-PLAN.md` § PHASE 16 pour le tracking case-à-cocher.

---

## Documentation Notion + Figma — Règle de synchronisation triple (OBLIGATOIRE)

Tout ajout, modification ou suppression dans le design system, les composants, ou les pages de l'app **doit être reflété dans LES TROIS sources de vérité parallèles** :

1. **Code** (`src/components/`, `src/index.css`, `src/pages/Components.tsx`) — source primaire
2. **Notion** (Design System DB + Écrans Learning App DB) — documentation business / handoff
3. **Figma file Design System TLS** — design tokens + components + patterns visuels

Aucun des trois ne doit jamais être en retard sur les autres. Si tu modifies un composant en code, tu DOIS aussi le mettre à jour dans Figma ET dans Notion dans la même session de travail.

### Sources de vérité

| Source | URL / chemin | Contenu | Rôle |
|---|---|---|---|
| **Code** | `/Users/chloemimault/Projects/frontend-tls/src/` | Composants React, tokens Tailwind @theme, types, props | Implementation live |
| **Components.tsx** | `src/pages/Components.tsx` | Showcase visuel de TOUS les composants avec props, variants, usedBy | Source de vérité visuelle interne |
| **Notion — Design System DB** | https://www.notion.so/thelearningsociety/fc727adea430439bb45590fd908ba134 | Items tokens / composants / patterns / guidelines avec statut migration | Doc business + handoff |
| **Notion — Écrans Learning App DB** | https://www.notion.so/thelearningsociety/c60f30c775c8473fa15a8446f96142d4 | Pages, routes, flows, statuts design | Tracking app coverage |
| **Figma Design System TLS** | https://www.figma.com/design/LccBZ1GKWQVwVzPtsSzk5Y/Design-System---TLS | Variables (Colors/Spacing/Radius/Effects), Text Styles, Effect Styles, Components avec descriptions + variants | Design tokens + maquettes visuelles |

### Quoi mettre à jour et quand

| Changement dans le code | Notion DS DB | Notion Écrans DB | Components.tsx | **Figma file** |
|---|---|---|---|---|
| Nouveau composant créé | Créer item : Type, Category, Layer, Migration status, Has variants | — | Ajouter entrée props + usedBy | **Reproduire le composant sur la page Atoms ou Composites, ajouter description complète, lier aux Variables** |
| Composant supprimé / déprécié | Status → `Deprecated` | — | Retirer entrée + usedBy associés | **Status → Deprecated dans description, ou supprimer le component Figma** |
| Migration Tailwind terminée | Migration status → `Tailwind ✅` | — | — | — |
| Composant devient tone-aware | Tone-aware → true | — | Ajouter demo multi-tone | **Ajouter Property Variant tone avec options primary/warm/sun** |
| Nouveau variant ou prop ajouté | Has variants → true, Notes | — | Ajouter le variant dans showcase | **Ajouter Variant Figma dans le Component Set + update description** |
| Visual modifié (couleur, spacing, radius, shadow) | — | — | — | **Mettre à jour le rendu Figma + rebind aux nouvelles Variables si applicable** |
| Nouvelle page créée | — | Créer item : Route, Flow, Niveau, Disponible, Composants clés, Objectif | Retirer `showcaseOnly: true` sur composants activés | — |
| Page supprimée | — | Supprimer item ou Statut design → `Deprecated` | — | — |
| Route renommée | — | Champ Route | — | — |
| Statut design avancé | — | Statut design | — | — |
| Nouveau token `@theme` (couleur/spacing/radius/shadow) | Créer item Token : Category, Layer | — | — | **Créer la Variable correspondante dans la collection appropriée (TLS / Colors, TLS / Spacing, TLS / Radius, TLS / Effects) + démo visuelle sur Foundations page si applicable** |
| Nouveau Text Style typo | Créer item Token : Category = Typography | — | — | **Créer le Text Style dans Figma (Heading/H/Body/Caption/Eyebrow/Display/Button/Mono)** |
| Nouveau pattern/guideline | Créer item Guideline : Status = Approved | — | Documenter dans `DESIGN.md` §4 | **Construire le pattern visuel sur page Composites avec description exhaustive** |

### Process de quality check — checklist obligatoire

**Déclencheurs** — lancer le check à chaque fois que :
- un composant est créé, modifié (API, variant, tone), renommé ou supprimé
- une page est créée, refactorisée, ou sa route change
- un token `@theme` est ajouté ou supprimé dans `index.css`
- une règle ou guideline DS est modifiée dans `CLAUDE.md` / `DESIGN.md`

**Les 6 points à vérifier dans l'ordre :**

```
☐ 1. CODE → NOTION (synchronisation sortante)
      → Design System DB : créer/modifier/archiver l'item du composant ou token concerné
      → Écrans DB : créer/modifier l'item de la page concernée
      → Ne jamais cocher "Tailwind ✅" ou "Disponible: YES" sans avoir vérifié dans le code

☐ 2. CODE → FIGMA (synchronisation sortante — DESIGN SYSTEM FILE) ⭐ NOUVEAU
      → Nouveau composant: reproduire sur page "Components v2 — Atoms" (si primitive) ou "Components v2 — Composites" (si composite/pattern)
        avec description exhaustive (structure, props, variants, états, "Utilisé dans"), construit comme COMPONENT Figma natif
      → Couleur/spacing/radius/shadow modifié: rebind aux Variables existantes (TLS / Colors, TLS / Spacing, TLS / Radius, TLS / Effects)
      → Nouveau token @theme: créer la Variable correspondante dans la collection appropriée + démo visuelle sur Foundations page
      → Nouveau Text Style: créer dans Figma (Heading/H/Body/Caption/Eyebrow/Display/Button/Mono)
      → Nouvel Effect Style (shadow): créer dans collection Effect Styles
      → Composant tone-aware: créer Component Property "tone" avec options primary/warm/sun et bind fills aux Variables tone-aware
      → Composant déprécié: status "Deprecated" dans description Figma OU suppression du component
      → Toutes les valeurs visuelles doivent être BINDÉES aux Variables (pas hardcodées) pour pixel-perfect parity
      → Icons: utiliser Lucide SVG strictement (pas d'emojis dans les composants Figma)

☐ 3. NOTION → CODE (synchronisation entrante — cross-check)
      → Si un item Notion indique "Tailwind ✅" : grep le composant, confirmer qu'aucune classe BEM ne subsiste
      → Si "Disponible: YES" : confirmer que la route existe dans App.tsx
      → Si "Deprecated" : confirmer que le fichier est supprimé ou réexporte uniquement

☐ 4. FIGMA → CODE (synchronisation entrante — cross-check) ⭐ NOUVEAU
      → Si une Variable Figma existe (ex: primary/500), vérifier qu'elle correspond à la valeur dans src/index.css @theme
      → Si un Component Figma existe, vérifier que le fichier .tsx correspondant existe encore
      → Si description Figma mentionne "Utilisé dans: Page X", vérifier que Page X importe bien le composant
      → Détecter drift: si valeur dans Figma ≠ valeur dans code, mettre à jour Figma (code = source de vérité)

☐ 5. COMPONENTS.TSX SHOWCASE (src/pages/Components.tsx)
      → Nouveau composant : ajouter une entrée avec props, variants, usedBy
      → Variant/prop ajouté : mettre à jour la démo existante
      → Composant supprimé : retirer l'entrée et ses usedBy dans les autres entrées
      → Composant activé dans une vraie page : retirer showcaseOnly: true
      → Composant devenu tone-aware : ajouter démo multi-tone

☐ 6. DOCS INTERNES (si pattern ou règle nouvelle)
      → Nouveau pattern découvert → ajouter dans DESIGN.md §4 "Patterns canoniques"
      → Nouveau piège CSS/Tailwind → ajouter dans CLAUDE.md "Pièges connus" + DESIGN.md §5
      → Nouveau token → ajouter dans CLAUDE.md "Référence Tailwind → Design Tokens"
      → Nouvelle règle → ajouter dans CLAUDE.md "Règles absolues" ou "Ce qu'il NE FAUT PAS faire"
      → Toute nouvelle Variable / Text Style / Effect Style Figma → mentionner ici aussi pour traçabilité

☐ 7. MIGRATION-PLAN.MD (si tâche complétée)
      → Cocher ✅ la case de la tâche terminée
      → Mettre à jour "Progrès global" si applicable
      → Si nouveau bloc de travail identifié → ajouter une section Phase
```

### Pour mettre à jour Figma : process technique

Utiliser le skill `figma-use` et le tool `mcp__18afc236-bea0-4964-b6d4-074a260039c3__use_figma` avec file key `LccBZ1GKWQVwVzPtsSzk5Y`.

**Pages cibles selon le type de modification :**
- Token (couleur, spacing, radius, shadow, opacity, z-index, duration, blur) → modifier la Variable dans la collection appropriée (`TLS / Colors`, `TLS / Spacing`, `TLS / Radius`, `TLS / Effects`) + mettre à jour la démo visuelle sur page `🎨 Foundations v2 — Tokens` si nouveau token
- Atom (Button, Card, Badge, Pill, Input, Alert, etc.) → page `🧩 Components v2 — Atoms` (id 1095:2)
- Composite / pattern / modal / page-level → page `🧩 Components v2 — Composites` (id 1122:2)

**Pattern obligatoire pour chaque composant Figma :**
1. Construire comme `figma.createComponentFromNode(rootFrame)` (jamais un simple Frame)
2. Set `component.description` avec : structure visuelle / props complets / variants disponibles / états (hover/focus/active/disabled) / "Utilisé dans: PageA, PageB, PageC" cross-référencé avec usedBy de Components.tsx
3. **Binder** fills/strokes/cornerRadius/itemSpacing/padding aux Variables existantes via `node.setBoundVariable('fills', variable)` etc. (pas de hardcoded RGB/numbers)
4. **Appliquer** les Text Styles aux nodes texte (pas de fontSize/fontName inline)
5. **Appliquer** les Effect Styles aux ombres
6. Si tone-aware ou size-variable: créer un vrai Component Set avec Properties (pas des frames juxtaposés)
7. Utiliser Lucide SVG icons (pas d'emojis) — disponibles via les composants Figma de la library iconographie, ou en copiant les paths depuis lucide.dev

**Anti-patterns à ne jamais faire :**
- Créer un composant sans entrée dans `Components.tsx` — le showcase est la source de vérité visuelle
- Modifier un composant en code sans le répercuter dans Figma (drift) — la session de travail n'est COMPLÈTE que lorsque les 3 sources matchent
- Hardcoder une couleur/spacing/radius/shadow dans un composant Figma alors qu'une Variable existe — TOUJOURS binder
- Utiliser un emoji dans un composant Figma au lieu de Lucide SVG icon — drift visuel garanti avec le rendu code
- Marquer "Tailwind ✅" dans Notion sans audit Tailwind (tableau 8 critères) validé par l'utilisateur
- Modifier une API de composant sans mettre à jour `usedBy` dans toutes les entrées du showcase
- Supprimer un fichier composant sans vérifier ses imports avec `grep -rn "import.*NomDuComposant" src/`
- Laisser `showcaseOnly: true` sur un composant utilisé dans une vraie page
- Construire un composant Figma comme `Frame` au lieu de `Component` — perd la description, les variants, et la lien library

**Voir `DESIGN.md` §0 pour le process détaillé côté design system.**

---

## Phase 14+ — Flow-Based Workflow (2026-05-15+)

**Changement de paradigme** : on n'opère plus écran-par-écran. Phase 14+ redesigne l'app **flow par flow** (user journey). Toute page modifiée DOIT l'être dans le cadre d'un flow audité end-to-end.

### Pourquoi flow-based ?
- Refondre écran-par-écran fragmente la cohérence visuelle entre écrans liés (ex. LearningPath → LessonPlayer → Viewers doivent avoir un rythme visuel cohérent)
- Refondre par niveau (N1 → N2 → N3) crée des dépendances circulaires et force des revisits
- Le flow garantit que chaque parcours utilisateur est **testable end-to-end** dès qu'il est bouclé
- La composition des composants est validée dans le contexte réel, pas isolément dans le showcase

### 6 étapes obligatoires par flow

**ÉTAPE 1 — AUDIT FLOW (~30 min, AVANT coding)**

1.1 Lister tous les écrans du flow (N1 hubs, N2 details, N3 modals/conditionnels)
1.2 Créer un tableau audit :
   | Écran | Composants actuels | Composants manquants | UX/design issues | Priorité |
   |-------|--------------------|---------------------|-----------------|----------|
   | (page) | (existing) | (gaps) | (spacing, tone, glass, etc.) | (M) |

1.3 Identifier composants `showcaseOnly: true` à intégrer dans ce flow
1.4 Identifier composants à créer/étendre (nouvelles variantes, props, tones)

**→ Présenter le tableau à l'utilisateur AVANT d'écrire du code**

---

**ÉTAPE 2 — COMPONENT PREPARATION (bottom-up)**

2.1 **Bottom-up** : créer/étendre composants AVANT les pages qui les consomment
   - Primitives (Badge, Pill, Avatar, etc.) si nécessaire
   - Composites (SectionCard, EditorialHero variants, etc.)
   - Nouveaux patterns (si justifiés par ce flow)

2.2 Mettre à jour `src/pages/Components.tsx` pour chaque composant :
   - Ajouter/modifier entrée : props, variants, sizes, tones, **usedBy: [pages from this flow]**, showcaseOnly
   - Ajouter démo multi-tone si tone-aware
   - Vérifier que la démo compiles et render sans erreur

2.3 Mettre à jour Notion Design System DB :
   - Créer/modifier entrées pour nouveaux composants
   - Type, Layer, Migration status (Tailwind ✅), Has variants, Tone-aware

**Acceptance criteria :**
- `npx tsc --noEmit` → 0 erreurs
- Components.tsx affiche sans erreur en preview
- Tous les variants/tones visibles dans la démo

---

**ÉTAPE 3 — PAGE REDESIGN (bottom-up: N3 modals → N2 detail → N1 hub)**

3.1 **Ordre** : Modals/drawers d'abord, puis detail pages, puis hub pages
   - Garantit que les composants enfants sont wired avant les parents qui les utilisent
   - Valide la composition incrémentalement

3.2 **Par page** :
   - Intégrer les composants préparés en ÉTAPE 2
   - Appliquer **semantic spacing tokens** : `gap-tight`, `gap-stack`, `gap-stack-lg`, `gap-section`, `gap-section-lg`, `gap-page` (JAMAIS `gap-4/6/8` arbitraire)
   - **Tone-aware** : 1 tone dominant + 1 accent max pour tout le flow. Cohérent à travers les écrans
   - Mobile-first : single column par défaut, grid/flex layouts md/lg only
   - `min-h-touch` (44px) sur tous interactive elements
   - 100% Tailwind : zéro `style={{}}` layout/color/spacing, zéro classes BEM `.tls-*`, zéro `[var(...)]` arbitraire

3.3 **Vérification par page** :
   - `npx tsc --noEmit` → 0 erreurs
   - Screenshot 375px (mobile) et 1280px (desktop)
   - Console clean (zéro warnings)
   - Hover/focus/active states fonctionnels

---

**ÉTAPE 4 — VALIDATION FLOW (~15 min)**

4.1 **End-to-end flow testing**
   - Enchaîner les écrans du flow en entier (ex. Onboarding → Questionnaire → Tutorial → Success → Dashboard first-time)
   - Vérifier transitions, navigation, states
   - Tester chemins d'erreur / empty states si applicables

4.2 **Visual consistency audit**
   - Tone cohérence : max 2 tones/flow, appliqués uniformément
   - Spacing rhythm : tous les `gap-*` sont sémantiques, aucun padding/margin arbitraire
   - Glass morphism : `backdrop-blur-glass-*` tokens (pas arbitraire `blur-md`)
   - Zéro CSS BEM legacy (class `.tls-*` search = 0 results)

4.3 **Technical checks**
   - `npx tsc --noEmit` → 0 erreurs
   - `npm run build` → 0 warnings
   - Tailwind coverage : zéro classes manquantes (run `npm run dev` pour force compile)

4.4 **Screenshot gallery**
   - 1 mobile (375px) + 1 desktop (1280px) par écran du flow
   - Archive pour documentation design

---

**ÉTAPE 5 — NOTION SYNC (5-Point Checkpoints — OBLIGATOIRE)**

**Checkpoint 1 : Code → Notion (synchronisation sortante)**
- [ ] Design System DB : créer/modifier composant entries pour tous nouveaux/updatés components
- [ ] Écrans DB : créer/modifier page entries pour tous pages du flow
- [ ] Link entries : Écrans screens → Components used

**Checkpoint 2 : Notion → Code (cross-check inward)**
- [ ] Si Design System marque "Tailwind ✅" : grep codebase, confirmer zéro classes BEM
- [ ] Si Écrans marque "Disponible: YES" : confirmer route existe dans `App.tsx`
- [ ] Si "Deprecated" : confirmer file est supprimé ou réexporte seulement

**Checkpoint 3 : Components.tsx Showcase (source de vérité)**
- [ ] Nouveaux composants : entrées existent avec props, variants, usedBy, showcaseOnly
- [ ] Composants updatés : démo montre tous les nouveaux variants/tones
- [ ] Composants intégrés : retirer `showcaseOnly: true` pour ceux utilisés par le flow
- [ ] `usedBy` arrays à jour : listent toutes les pages du flow qui les utilisent

**Checkpoint 4 : Docs internes (CLAUDE.md, DESIGN.md)**
- [ ] Nouveau pattern découvert : ajouter dans DESIGN.md §4 "Patterns canoniques"
- [ ] Nouveau piège CSS/Tailwind : ajouter dans CLAUDE.md "Pièges connus" + DESIGN.md §5
- [ ] Nouveau token : ajouter dans CLAUDE.md "Référence Tailwind → Design Tokens"
- [ ] Nouvelle règle : ajouter dans CLAUDE.md "Règles absolues"

**Checkpoint 5 : MIGRATION-PLAN.md (track completion)**
- [ ] Phase 14.X flow marqué ✅ dans la table de tracking
- [ ] "Progrès global" updaté (N/17 flows complètes)

---

**ÉTAPE 6 — COMMIT (une fois les 4 checkpoints ✅)**

6.1 Format : `feat(phase-14.X): [flow name] redesign + component prep`
6.2 Avant push : vérifier que les 5 checkpoints sont ✅
6.3 Un commit par flow (jamais batch multiples flows)

---

### Anti-patterns Phase 14+
- ❌ Toucher une page hors d'un flow audité (même "petit fix")
- ❌ Modifier un composant DS sans mettre à jour Components.tsx + Notion DS DB
- ❌ Marquer un flow ✅ sans screenshots 375px ET 1280px
- ❌ Utiliser 3+ tones dans un flow (1 dominant + 1 accent max)
- ❌ Committer sans `npx tsc --noEmit` clean

---

## Règles de commit

- Format : `refactor: migrate [ComponentName] to Tailwind`
- Un commit par composant/page
- Jamais de commit sans validation visuelle
- Message de commit peut inclure : `Closes #[MIGRATION-PLAN task number]` si applicable

---

## Marketing site v2 — Immersive direction (2026-05-19+) ✅ P1

**Scope** : refonte du site marketing public (`/marketing/*`) au niveau PREMIUM IMMERSIF (Linear / Vercel / Apple / Stripe / Framer). Visuel travaillé : scroll-driven animations, sticky storytelling, mockup app jouable, magnetic CTAs, gradient text animé, marquee, count-up, parallax.

### Dépendance ajoutée

- **`framer-motion`** (35kb gz, tree-shakeable). Seule dépendance animation autorisée pour le site marketing. PAS de GSAP, PAS de Lenis, PAS de Three.js. View Transitions API native pour les transitions de routes.
- Import : `import { motion, useScroll, useTransform, useReducedMotion, useInView, AnimatePresence } from 'framer-motion';`
- **Toutes les animations doivent passer par `useReducedMotion`** — si l'utilisateur a `prefers-reduced-motion: reduce`, l'animation est désactivée ou réduite à un fade simple.

### Architecture motion primitives

Les primitives motion vivent dans `src/components/marketing/motion/` et sont **réservées au site marketing public** (n'utilise pas dans la learning app interne — la learning app garde son propre vocabulaire DS, ces primitives sont marketing-only par design).

| Primitive | Fichier | Usage canonique |
|-----------|---------|-----------------|
| `MeshGradientBg` | MeshGradientBg.tsx | Fond mesh-gradient animé. 5 tones (primary/warm/sun/brand/ink), 3 intensités. Toujours `absolute inset-0 overflow-hidden pointer-events-none`. |
| `FadeInWhenVisible` | FadeInWhenVisible.tsx | Wrapper IO + transition fade-up. Direction up/down/left/right/none, délai et durée custom. Trigger margin par défaut `-80px`. |
| `ParallaxLayer` | ParallaxLayer.tsx | Y parallax bound au scroll progress dans le viewport. Multi-couches : back 80px / mid 40px / front 15px. |
| `MagneticButton` | MagneticButton.tsx | Wrapper magnetic 12px max (configurable). Suit le curseur en spring. Désactivé sous reduced-motion et touch. **Wrap autour d'un `<Button>`** — n'altère pas la sémantique. |
| `GradientText` | GradientText.tsx | Inline gradient text avec position animée (bg-size 200%, animate background-position 0→100%→0 sur 12s). |
| `MarqueeRow` | MarqueeRow.tsx | Infinite scroll horizontal. Edge fade gauche/droite via mask-image, direction reverse, durée custom. Duplique items pour seamless loop. |
| `CountUp` | CountUp.tsx | Number counter IO-triggered, easeOutCubic, locale FR. Decimals optionnels. Respect reduced-motion (jump direct). |
| `StickyScrollStory` | StickyScrollStory.tsx | Section `N * 100vh` avec visual sticky + panels texte qui fadent au scroll. `visual` callback reçoit l'index actif. Mobile fallback : stack vertical. |
| `InteractiveAppMockup` | InteractiveAppMockup.tsx | Mockup app jouable inline avec 4 tabs (Parcours/Coaching/Journal/Veille). Chaque panel a ses animations internes staggered. AnimatePresence + layoutId pour la pill active. |

### Showcase

- **`/marketing/_motion-lab`** — page dev qui démontre les 9 primitives en isolation. Reste accessible publiquement (route marketing publique). À supprimer une fois la refonte marketing complète et stable.
- Les primitives ne sont **PAS** ajoutées à `src/pages/Components.tsx` (le showcase DS de la learning app) — elles ciblent un autre contexte d'usage.

### Patterns spécifiques découverts en Phase 1.2/1.3

1. **Hero immersive** : `bg-gradient-to-br from-primary-700 to-primary-900` + `MeshGradientBg tone="brand"` + 2 `ParallaxLayer` blobs + `useScroll` + `useTransform` pour scale/opacity du hero qui se rétracte au scroll. Titre en `text-[clamp(3rem,8vw,6.5rem)]` avec un `GradientText` inline sur 2-3 mots clés (PAS le titre entier — sinon trop chargé).

2. **CTA pattern marketing** : `<MagneticButton strength={14}><Link><Button variant="warm">...</Button></Link></MagneticButton>`. Strength 12-16 pour primary CTA, 8 pour secondary. Au-delà de 20 ça devient gimmicky.

3. **Ghost CTA sur fond sombre** : `<Button variant="ghost" className="!text-white hover:!bg-white/10 !border !border-white/30">`. Les `!` sont nécessaires car le variant ghost définit text-ink-900 par défaut. Exception légitime à la règle "pas de !important" car c'est une variante de surface (light vs dark) que le Button n'expose pas via prop.

4. **Squiggly underline draw-on-scroll** : SVG inline avec `<motion.path>` + `initial={{ pathLength: 0 }}` + `whileInView={{ pathLength: 1 }}`. Tracer un quadratic bezier `Q ... T ... T ...` pour un effet "marker dessiné main".

5. **Sticky storytelling visual morphing** : dans le `visual` callback de `StickyScrollStory`, retourner un `<motion.div key={i}>` avec `initial/animate/exit` — la prop `key={i}` force le remount qui déclenche l'animation entry à chaque changement de panel.

6. **InteractiveAppMockup tab indicator** : `<motion.span layoutId="mockup-tab-bg">` pour transitionner la pill active d'un tab à l'autre — spring stiffness 380 damping 30, feels premium.

7. **FAQ accordion** : `AnimatePresence` + `<motion.div>` avec `initial={{ height: 0 }}`, `animate={{ height: 'auto' }}`. Wrapper `overflow-hidden`. Header button avec icône Plus/Minus selon état.

8. **Horizontal scroll snap timeline** : `overflow-x-auto snap-x snap-mandatory scroll-px-6 px-6 -mx-6` avec children `snap-start shrink-0 w-80`. Boutons prev/next via `scrollBy({ left: cardWidth * 1.5, behavior: 'smooth' })`. Mobile : swipe natif suffit, masquer les boutons.

### Pièges Phase 1.2/1.3

- **`py-page-lg` n'existe pas** — les tokens de spacing s'arrêtent à `--spacing-page` (48px). Si besoin de plus, ajouter un token au `@theme` plutôt qu'utiliser une valeur arbitraire.
- **`whileInView` initial state** : framer-motion garde les éléments à leur état initial (opacity 0) si la `viewport.margin` est négative et qu'ils ne sont pas assez profonds dans le viewport au mount. Pour hero (premier viewport), s'assurer que les éléments sont au moins ~100px du top, ou réduire la margin négative.
- **Style scale/opacity sur motion.div + scroll** : utiliser `useScroll()` global (pas bound à un target) + `useTransform` directement dans le hero. Sur reduced-motion, set scale/opacity à 1 pour éviter le shrink.
- **CountUp valeur "1+" en attendant trigger** : c'est normal — `useInView` ne déclenche qu'à `margin: '-50px'`. Pour les counters dans le hero qui doivent se déclencher immédiatement, soit changer la margin à `'0px'`, soit accepter le visuel "1+" puis "200+".

### Workflow par page marketing

Même rigueur que Phase 14 flow-based, mais sur **chaque page marketing** (pas par flow) :

1. **Audit & design** — section par section, identifier les primitives à utiliser
2. **Build bottom-up** — primitives manquantes d'abord, puis sections, puis page
3. **TS check + preview** — `npx tsc --noEmit` + screenshots mobile 375 + desktop 1440
4. **Performance** — vérifier que les animations restent 60fps (DevTools Performance tab), pas de jank au scroll
5. **a11y** — `prefers-reduced-motion` testé, ARIA labels sur les contrôles interactifs, focus states visibles
6. **Commit** — `feat(marketing-v2): [page name] immersive redesign`

### Anti-patterns marketing v2

- ❌ Utiliser les primitives motion dans la learning app interne (mauvais contexte d'usage)
- ❌ Empiler 3+ primitives sur le même élément (parallax + magnetic + gradient text + fade-in = overkill)
- ❌ Animation lourdes au-dessus du fold qui retardent le LCP (hero MeshGradientBg OK car en background, mais pas de scrub-scroll animation sur le hero content)
- ❌ Oublier `useReducedMotion` dans une primitive custom — bug d'accessibilité bloquant
- ❌ `transition={{ duration: 2 }}` ou plus sur un élément interactif — trop lent, frustration

---

## Ce qu'il NE FAUT PAS faire

**Fichiers & structure**
- Ne PAS supprimer `tls-components.css` avant que tous ses composants soient migrés et validés
- Ne PAS créer de nouveaux fichiers CSS pour des composants — tous les tokens doivent venir de index.css @theme
- Ne PAS modifier `tailwind.config.js` (Tailwind v4 CSS-first ignore le JS config)

**Tokens & classes**
- Ne PAS utiliser `bg-[var(...)]` ou `text-[length:var(...)]` — jamais d'arbitraire avec var()
- Ne PAS utiliser `rounded-full` pour les Button/Card (utiliser `rounded-pill`)
- Ne PAS hardcoder des couleurs hex (#55A1B4) — toujours utiliser les tokens Tailwind (`bg-primary-500`)
- Ne PAS utiliser `!important` — la cascade @layer est correcte si globals.css est dans @layer base

**Styles inline**
- Ne PAS utiliser `style={{}}` pour layout/couleur/spacing — utiliser `className` Tailwind
- Ne PAS utiliser `style={{}}` pour les variants (jamais `style={{ background: isHovered ? ... : ... }}`)

**Processus**
- Ne PAS travailler sur plusieurs composants en même temps
- Ne PAS passer au composant suivant sans avoir reçu la validation visuelle de l'utilisateur
- Ne PAS committer sans les **4 checkpoints validés** (affichage, cascade CSS, hover, audit Tailwind)
- Ne PAS skipper l'étape 4 (vérification cascade CSS) — c'est la cause #1 des bugs hover/border/shadow
- Ne PAS présenter un composant comme "migré" sans le **tableau d'audit Tailwind** complet à l'utilisateur

**Tailwind compilation**
- Ne PAS oublier `@source` directive dans index.css — sans elle, Tailwind ne cherche pas les classes à compiler
- Ne PAS créer dynamiquement des classe strings (ex. `${size}px` → toujours liste prédéfinie via maps)
- Ne PAS importer un fichier CSS legacy SANS `@layer components` s'il définit des classes au même nom que Tailwind (`.border`, `.shadow-X`, `.rounded-X`, `.text-X`, etc.)
- Ne PAS supposer que les hover Tailwind v4 fonctionnent out-of-the-box avec custom `@theme shadows` — il faut les classes manuelles dans `@layer utilities` (voir index.css)

---

## Phase 16 — Spec Compliance (Cahier ↔ FO Alignment) 🚀

**Objectif**: Aligner le FO React existant (~140+ routes) avec les 16 cahiers de spécification (modules 01-13bis). Valider que chaque cahier est implémenté fonctionnellement, identifier les gaps, et documenter les blocages/dépendances.

**Status**: ✅ Gap analysis complete (PHASE-16-GAP-ANALYSIS.md). Tous les cahiers auditionnés. Tous les 6 "missing screens" confirmés comme **implémentés** dans App.tsx.

**Data Source**: 
- App.tsx (681 lines) → 140+ authenticated routes
- FO_PAGES_INVENTORY.md → 132 organized screens
- 16 cahier specifications (locaux CDC/)
- MIGRATION-PLAN.md Phase 16 section (effort/prioritization baseline)

**Key Finding**: All 6 previously-documented "missing" screens (Search, MagicLink, VerifyEmail, SubscriptionPayment, Billing, Positionnement) **ARE actually implemented in code**. This was a documentation gap, not a code gap.

### Module 16.1 — Parcours & Learning Space
- **Cahier**: https://www.notion.so/thelearningsociety/01_Parcours_Learning_Space
- **FO Routes**: `/learning-paths`, `/learning-paths/:id`, `/learning-paths/:id/positionnement`, `/course/:id`, `/lesson/:id/{astuces,complementary,flashcards}`, `/coaching/recommendations` (8 routes)
- **Cahier Screens**: 8 expected, 8 implemented ✅
- **MVP Feature Completion**: 100% ✅ (path browsing, positionnement, progression, item types, astuces/complementary)
- **Blockers**: None
- **Effort Estimate**: S (2–3h) — mostly wiring existing components to data
- **Status**: ✅ COMPLETE for MVP

### Module 16.2 — Passeport Compétences (BLOCKING MODULE)
- **Cahier**: https://www.notion.so/thelearningsociety/02_Passeport_Competences
- **FO Routes**: `/passeport`, `/passeport/competence/:id`, `/passeport/objectifs`, `/passeport/roadmap`, `/passeport/jac`, `/passeport/historique`, `/coach/passeport`, `/coach/apprenant/:id/analytics` (10 routes)
- **Cahier Screens**: 6 expected, 6 implemented ✅
- **MVP Feature Completion**: 90% ✅ (Dreyfus model, evidence, radar, coach heatmap, goals)
- **Blockers**: **GATES 16.1, 16.5, 16.7, 16.11, 16.13** — Passeport must be complete first
- **Data Model**: Competencies (with Dreyfus levels 1-5), Evidence entries, Goal tracking, JAC (validation checkpoints)
- **Effort Estimate**: L (8–12h) — complex Dreyfus logic, evidence linking, coach/learner dual views
- **Status**: 🟡 ~90% MVP

### Module 16.3 — Onboarding & User Profile Mapping
- **Cahier**: https://www.notion.so/thelearningsociety/03_Onboarding_and_User_Profile_Mapping
- **FO Routes**: `/onboarding`, `/onboarding/questionnaire`, `/onboarding/success`, `/onboarding/tutorial`, `/onboarding/payment`, `/profile`, `/settings` (7 routes)
- **Cahier Screens**: 16 expected, ~8 implemented + 4 deferred (Devis, Approbations, Pool Widget, Radar overlap)
- **MVP Feature Completion**: 75% 🟡 (profile auto-completion, role mapping, subscription tier, consent; missing: team approvals, manager devis)
- **Blockers**: Depends on 16.2 (Passeport for profile mapping validation). Blocks 16.4, 16.6, 16.8, 16.9, 16.12, 16.14, 16.16
- **Data Model**: UserProfile (with role, tier), SubscriptionPlan, GDPR Consent, onboarding state machine
- **Effort Estimate**: M (4–6h) — mostly form wiring, conditional flows, Stripe integration stub
- **Status**: 🟡 75% (deferred: manager workflows, quotations)

### Module 16.4 — Coaching & 1-1 Messaging
- **Cahier**: https://www.notion.so/thelearningsociety/04_Coaching_and_1-1_Messaging
- **FO Routes**: `/coaching`, `/coaching/booking`, `/coaching/session/:id`, `/coaching/corrections`, `/coaching/messages/:coachId`, `/coach/dashboard`, `/coach/corrections`, `/coach/apprenant/:id` (12 routes)
- **Cahier Screens**: ~10 expected, 12 implemented ✅
- **MVP Feature Completion**: 85% 🟡 (booking, messaging, corrections, coach dashboard; missing: calendar sync, video call scaffolding)
- **Blockers**: Depends on 16.2 (Passeport for learner context), 16.1 (Formation for correction entities). Blocks 16.7 (Journal auto-triggers from coaching)
- **Data Model**: CoachingSession, Message thread, Correction polymorphic (Formation.Mission, Project.Task, JAC)
- **Effort Estimate**: L (8–10h) — complex messaging UI, polymorphic corrections, coach availability scheduling
- **Status**: 🟡 85% (missing: calendar OAuth, video call links)

### Module 16.5 — Gamification & Badges
- **Cahier**: https://www.notion.so/thelearningsociety/05_Gamification_Badges
- **FO Routes**: `/dashboard/leaderboard`, `/dashboard/badges`, `/profile/badges`, `/badge/:id` (4 routes)
- **Cahier Screens**: ~6 expected, 4 implemented + 2 deferred (leaderboard variations, badge export)
- **MVP Feature Completion**: 70% 🟡 (XP ledger, basic badges, streak; missing: leaderboards, Open Badges 2.0 export, atrophy simulation)
- **Blockers**: Depends on 16.2 (Passeport for skill tags), 16.1 (Formation for XP triggers)
- **Data Model**: XP ledger (non-resettable), Badge definitions, Streak tracking, Open Badges issuer config
- **Effort Estimate**: M (5–7h) — badge UI, XP event triggering, streak calculation
- **Status**: 🟡 70% (missing: leaderboards, badge export)

### Module 16.6 — Enterprise FO Space
- **Cahier**: https://www.notion.so/thelearningsociety/06_Enterprise_FO_Space
- **FO Routes**: `/enterprise/dashboard`, `/enterprise/teams`, `/enterprise/members`, `/enterprise/settings`, `/enterprise/analytics` (5 routes)
- **Cahier Screens**: ~8 expected, 5 implemented + 2 deferred
- **MVP Feature Completion**: 60% 🟡 (team mgmt, member roles; missing: credit pool, approval workflows, advanced analytics)
- **Blockers**: Depends on 16.3 (Onboarding for org setup)
- **Data Model**: Organization, Team, EnterpriseUser (with org-level RBAC)
- **Effort Estimate**: M (4–6h)
- **Status**: 🟡 60% (missing: approval workflows, credit pool)

### Module 16.7 — Journal de Bord Réflexif
- **Cahier**: https://www.notion.so/thelearningsociety/07_Journal_de_Bord_Reflexif
- **FO Routes**: `/journal`, `/journal/entry/:id`, `/journal/new` (3 routes)
- **Cahier Screens**: ~8 expected, 3 implemented + 2 partial (sharing, comments)
- **MVP Feature Completion**: 50% 🟡 (entry CRUD, draft/published states; missing: guided questions, auto-triggers, insights)
- **Blockers**: Depends on 16.2 (Passeport for delta detection triggers), 16.1 (Formation for lesson-linked prompts), 16.4 (Coaching for session reflections)
- **Data Model**: JournalEntry (with mood, tags, share perms), GuidedQuestion, Comment thread
- **Effort Estimate**: M (5–6h) — entry form, sharing UI, search
- **Status**: 🟡 50% (missing: guided questions, auto-triggers)

### Module 16.8 — Masterclass / Atelier / Événements
- **Cahier**: https://www.notion.so/thelearningsociety/08_Masterclass_Atelier_Pratique_Evenements
- **FO Routes**: `/events`, `/event/:id`, `/event/:id/booking`, `/event/:id/attend` (4 routes)
- **Cahier Screens**: ~6 expected, 4 implemented
- **MVP Feature Completion**: 70% ✅ (event browsing, booking, attendance; basic)
- **Blockers**: Depends on 16.3 (Onboarding for user state)
- **Data Model**: Event, EventSession, Attendance
- **Effort Estimate**: S (2–3h) — mostly CRUD, listing
- **Status**: ✅ 70%

### Module 16.9 — Notifications Management
- **Cahier**: https://www.notion.so/thelearningsociety/09_Notifications_Management
- **FO Routes**: `/notifications`, `/notifications/preferences` (2 routes)
- **Cahier Screens**: ~4 expected, 2 implemented
- **MVP Feature Completion**: 50% 🟡 (notification center, preferences; missing: push/SMS, templating)
- **Blockers**: Depends on 16.3 (Onboarding for user state)
- **Data Model**: Notification (with type/status), NotificationPreference (channel/frequency)
- **Effort Estimate**: S (2–3h) — UI, preference toggles
- **Status**: 🟡 50% (missing: push/SMS, templating)

### Module 16.10 — Analytics Tracking System (Infrastructure)
- **Cahier**: https://www.notion.so/thelearningsociety/10_Analytics_Tracking_System
- **FO Routes**: `/analytics` (BO only, not FO learner-facing) (0 FO routes)
- **Cahier Screens**: ~12 expected, 0 FO screens (BO feature)
- **MVP Feature Completion**: 0% (analytics backend infrastructure, FO dashboard deferred Phase 17-18)
- **Blockers**: Not blocking anything; parallel work
- **Data Model**: Analytics event schema (listener-based collection, no external bus)
- **Effort Estimate**: L (10–12h) — hook listeners, event schema, Notion sync
- **Status**: 🔴 0% (deferred to Phase 17-18 after all plugins emit events)

### Module 16.10bis — Back-Office Organization UX (hors scope FO)
- **Cahier**: https://www.notion.so/thelearningsociety/10bis_Back_Office_Organization_UX_Design
- **FO Routes**: 0 (WordPress BO feature, not React FO)
- **Status**: 🔴 Out of scope for FO React. BO implementation = separate PHP plugin work.

### Module 16.11 — Projects SBO
- **Cahier**: https://www.notion.so/thelearningsociety/11_Projects_SBO
- **FO Routes**: `/projects`, `/project/:id`, `/project/:id/tasks`, `/project/:id/task/:id/submit` (4 routes)
- **Cahier Screens**: ~8 expected, 4 implemented
- **MVP Feature Completion**: 50% 🟡 (project CRUD, tasks, submissions; missing: corrections, JAC creation, manager risk cockpit)
- **Blockers**: Depends on 16.2 (Passeport for skill gating), 16.1 (Formation for mission references), 16.4 (Coaching for corrections). Blocks 16.5 (Gamification for XP triggers)
- **Data Model**: Project (with type: Upskilling/STRIDE/Custom), Task, TaskSubmission, JAC (validation checkpoint)
- **Effort Estimate**: L (8–10h) — project workflows, task submission, corrections UI
- **Status**: 🟡 50% (missing: full corrections, JAC creation)

### Module 16.11bis — Subscription Management System
- **Cahier**: https://www.notion.so/thelearningsociety/11bis_Subscription_Management_System
- **FO Routes**: `/subscriptions`, `/subscription/:id`, `/billing`, `/billing/invoice/:id` (4 routes)
- **Cahier Screens**: ~6 expected, 4 implemented
- **MVP Feature Completion**: 70% 🟡 (subscription display, billing; missing: dunning, complex approvals)
- **Blockers**: Parallel with 16.3 (Onboarding for initial subscription). Blocks nothing explicitly.
- **Data Model**: Subscription (with plan tier, status), Invoice, PaymentMethod (Stripe)
- **Effort Estimate**: M (4–6h) — subscription UI, invoice listing, Stripe webhook handling
- **Status**: 🟡 70% (missing: dunning emails, advanced approvals)

### Module 16.12 — Chatbot IA & QAR
- **Cahier**: https://www.notion.so/thelearningsociety/12_Chatbot_IA_et_QAR
- **FO Routes**: `/chatbot`, `/chatbot/thread/:id` (2 routes)
- **Cahier Screens**: ~4 expected, 2 implemented
- **MVP Feature Completion**: 60% 🟡 (chatbot UI, message history; missing: knowledge base, RAG, PII filtering)
- **Blockers**: Depends on 16.1 (Formation corpus), 16.2 (Passeport for context). Parallel with 16.12bis (IA Features).
- **Data Model**: ChatMessage, ChatThread, KnowledgeBase (stub Phase 16, filled Phase 17-18)
- **Effort Estimate**: M (5–7h) — chatbot UI, message storage, Mistral API integration
- **Status**: 🟡 60% (missing: full RAG, knowledge corpus)

### Module 16.12bis — IA Features Framework (Transversal)
- **Cahier**: https://www.notion.so/thelearningsociety/12bis_IA_Features_Framework
- **FO Routes**: Distributed across multiple modules (/chatbot, /coaching/recommendations, /onboarding/questionnaire, /veille/perplexity, etc.) (9+ features)
- **Cahier Screens**: ~20 expected, ~9 features partially implemented
- **MVP Feature Completion**: 30% 🔴 (core chatbot, basic reco; missing: advanced matching, churn prediction, org intelligence, RAG)
- **Blockers**: Parallel with all plugins (cross-cutting feature). Depends on Mistral API key (P0-1 ✅).
- **Data Model**: IA Decision log, Prompt version, Embedding (stub), Recommendation (stub)
- **Effort Estimate**: XL (16–20h) — distributed across phases, only core chatbot MVP Phase 16, matching/reco Phase 17-18
- **Status**: 🔴 30% MVP (only core chatbot + basic Positionnement IA; matching/reco Phase 2)

### Module 16.13 — Helpcenter Wiki Support
- **Cahier**: https://www.notion.so/thelearningsociety/13_Helpcenter_Wiki_Support
- **FO Routes**: `/help`, `/help/article/:id`, `/help/search`, `/help/contact-support` (4 routes)
- **Cahier Screens**: ~6 expected, 4 implemented
- **MVP Feature Completion**: 65% 🟡 (FAQ, article listing; missing: advanced search, ticketing UI)
- **Blockers**: Parallel with others (not blocking anything). Depends on 16.2 (Passeport context for recommendations).
- **Data Model**: HelpArticle (with FULLTEXT search), SupportTicket, FAQ category
- **Effort Estimate**: S (3–4h) — article listing, search, basic form
- **Status**: 🟡 65% (missing: ticketing workflow)

### Module 16.13bis — GDPR / AI Act / Security (Transversal Compliance)
- **Cahier**: https://www.notion.so/thelearningsociety/13bis_GDPR_AI_Act_Security
- **FO Routes**: `/privacy/consent`, `/privacy/dsar`, `/privacy/delete-account`, `/privacy/data-export` (4 routes)
- **Cahier Screens**: ~8 expected, 4 implemented
- **MVP Feature Completion**: 75% ✅ (consent mgmt, DSAR request, account deletion; missing: advanced export, AI decision logs)
- **Blockers**: Parallel with others. Compliance-critical, blocks Phase 3 (go-live).
- **Data Model**: ConsentRecord (with explicit timestamps), DSAR request (ZIP export, 7-day token), AuditLog (append-only), AIDecisionLog
- **Effort Estimate**: M (4–6h) — privacy forms, export logic, audit logging
- **Status**: ✅ 75% MVP

### Phase 16 Execution Order (Dependency DAG)

**Critical Path** (must complete first):
1. **16.2** (Passeport) — gates 01, 05, 07, 11, 13
2. Then parallel: **16.1** (Parcours), **16.3** (Onboarding), **16.4** (Coaching), **16.5** (Gamification), **16.7** (Journal)
3. Then **16.6** (Enterprise), **16.11** (Projects), **16.12** (Chatbot), **16.12bis** (IA Features)
4. Lightweight: **16.8** (Masterclass), **16.9** (Notifications), **16.10bis** (BO, separate), **16.13** (Helpcenter)
5. **16.10** (Analytics) — parallel, collects events from 1-4
6. **16.11bis** (Subscriptions) — parallel, parallel with 16.3
7. **16.13bis** (Compliance) — parallel, validates with 16.3

**Effort Estimate** (per gap analysis):
- Phase 16 total: ~12–16 weeks-dev FO (Phase 17 can start analytics data collection in parallel)
- Critical path (16.2 + 16.1): ~3–4 weeks
- Parallel plugins (16.3-7): ~4–5 weeks
- Extensions (16.8-13): ~2–3 weeks
- Analytics infrastructure (16.10): ~2 weeks (parallel)

### Anti-patterns Phase 16

- ❌ **Redraw UI** — Phase 14-15 froze visuals. Phase 16 = functional wiring only. Do not re-design.
- ❌ **Invent fields hors spec** — all data models come from cahier specifications. Ask user if cahier is ambiguous.
- ❌ **Skip dependency checks** — Module 02 gating chain is non-negotiable. Respect execution order.
- ❌ **Mock hors cahier** — MOCK_* data should match cahier data models, not invented extras.
- ❌ **Notion DB sync last** — sync AFTER each cahier module is validated, not post-phase. Checkpoint: each 16.X complete → update Design System + Écrans DBs.

### Notion Synchronization Checklist (per cahier after 16.X complete)

After completing each cahier module (16.1, 16.2, etc.):

- [ ] **Design System DB** (Composants):
  - Créer/modifier entries pour tous les nouveaux composants découverts en 16.X
  - Type, Layer (Atom/Composite/Page), Migration status (Tailwind ✅), Has variants, Tone-aware
  - Link to Components.tsx showcase entry

- [ ] **Écrans DB** (Learning App screens):
  - Créer/modifier entries pour tous les FO routes de 16.X
  - Route, Flow, Niveau (N1/N2/N3), Statut design (Validé), Composants clés, Cahier reference
  - Link to FO route in App.tsx (line number for reference)

- [ ] **Components.tsx** (Showcase):
  - Si nouveau composant : ajouter entrée avec props, variants, usedBy: [pages from 16.X], showcaseOnly flag
  - Si composant intégré dans vraie page : retirer showcaseOnly: true
  - Mettre à jour usedBy arrays

---

## Phase 17-18 — UX Depth Pass + Store Wiring (2026-05-15+) ✅

**Objectif Phase 17** : Remplacer les données statiques par des lectures/écritures Zustand persistées pour transformer l'app en "vraie" SPA réactive. Les pages décorent désormais le **state utilisateur réel**, pas du mock BEM-styled statique.

**Objectif Phase 18** : Documenter les patterns et mise à jour du design system après Phase 17-18.

### Workflow Phase 17 — Wiring pages to Zustand (obligatoire)

**6 étapes par page** (adapté du workflow Phase 14+ flow-based) :

```
1. AUDIT STORE (5 min)
   - Identifier tous les éléments dynamiques (listes, forms, states)
   - Mapper vers les stores existants : useCoachingStore, useUserProfileStore, useEnterpriseStore, usePrivacyStore, etc.
   - Si pas de store applicable : créer un nouveau store dans src/stores/persistence.ts
   - Checker la signature du store API (getX / updateX / addX / patch)

2. IMPORT & INTEGRATION (5 min)
   - Importer le store hook et les types/interfaces
   - Remplacer useState hardcodées par store.getX() calls en component body
   - Pour route params (useParams<{ id }>), matcher les IDs contre les données store puis afficher

3. WRITE OPERATIONS (5 min)
   - Click handlers qui modifiaient state local → appelent maintenant store.updateX / store.patch / store.addX
   - Les write operations doivent persister immédiatement (Zustand + localStorage middleware fait ça)
   - Local useState = acceptable ONLY pour UI-only state (modal open, tab selection, form drafts)
   - Données du domaine métier = TOUJOURS du store

4. VALIDATION (5 min)
   - npx tsc --noEmit → 0 erreurs
   - Preview FO : navigue la page, effectue une action (form submit, toggle, click CTA)
   - Reload page → confirmer que l'état persiste (localStorage check)
   - F12 DevTools → Application → localStorage → vérifier que la clé du store contient les données

5. COMPONENTS.TSX UPDATE (si applicable)
   - Si des composants de la page disparaissent du showcase (sont maintenants utilisés en vraie page)
   - Retirer showcaseOnly: true
   - Mettre à jour usedBy arrays

6. COMMIT
   - Format : `feat(phase-17.X): wire [page name] to [store name]`
   - Exemple : `feat(phase-17.2): wire CorrectionDetailLearner to useCoachingStore`
   - Toujours vérifier que le working tree passe `npx tsc --noEmit` avant commit
```

### Patterns Phase 17 — Clés de succès

**Pattern 1 : Seed-on-first-access**
```tsx
// Dans le store (ex. src/stores/persistence.ts)
const useCoachingStore = create<CoachingStore>((set, get) => ({
  getCorrections: (userId: string) => {
    const state = get();
    if (state.corrections.length === 0) {
      // Seed from MOCK_* on first access
      const seeded = MOCK_CORRECTIONS.map((c) => ({ ...c, userId }));
      set({ corrections: seeded });
      return seeded;
    }
    return state.corrections;
  },
}));

// Côté page — pas d'import manuel de MOCK_*, juste store.getX()
const CoachEnterpriseDashboard = () => {
  const corrections = useCoachingStore().getCorrections(MOCK_USER_ID);
  // render...
};
```

**Pattern 2 : Route param matching**
```tsx
// Pages avec route params — matcher contre les données du store
const MessagingThread: React.FC = () => {
  const { coachId } = useParams<{ coachId: string }>();
  const sessions = useCoachingStore().getSessions(MOCK_USER_ID);
  
  // Matcher coachId contre sessions[].coachId pour dériver l'affichage
  const matchedSession = sessions.find((s) => s.coachId === coachId) ?? sessions[0];
  const coachName = matchedSession?.coachName ?? 'Ton coach';
  
  // Utiliser coachName dans Hero, Card header, Avatar
  return (
    <EditorialHero title={coachName} />
  );
};
```

**Pattern 3 : Live data binding (no snapshot)**
```tsx
// ❌ MAUVAIS — snapshot des données au render
const [corrections, setCorrections] = useState(MOCK_CORRECTIONS);

// ✅ BON — live call au store à chaque render
const CoachEnterpriseDashboard = () => {
  const pendingCorrections = useCoachingStore()
    .getCorrections(MOCK_USER_ID)
    .filter((c) => c.status === 'pending');
  
  // Si le store change, le composant se re-render avec les données fraîches
  return pendingCorrections.map(...);
};
```

**Pattern 4 : Write operations persist**
```tsx
// Click handler qui écrit au store
const handlePurchase = () => {
  if (!pack) return;
  const totalCredits = pack.credits + (pack.bonus ?? 0);
  
  // Appel au store — persiste automatiquement (localStorage middleware)
  store.patch({
    credits: {
      ...profile.credits,
      classic: profile.credits.classic + totalCredits,
    },
  });
  
  // Local state pour UI feedback (purchased flag)
  setPurchased(true);
};
```

**Pattern 5 : Persistence check (deletion requests, DSAR)**
```tsx
// Pages qui track l'historique utilisateur (ex. demandes de suppression)
const PrivacyDeleteAccount: React.FC = () => {
  const store = usePrivacyStore();
  const existingRequests = store.getDsarRequests(MOCK_USER_ID);
  const existingDeletion = existingRequests.find((r) => r.id.startsWith('del-'));
  
  // State survit au refresh grâce à la persistence
  const [step, setStep] = useState<1 | 2 | 'done'>(existingDeletion ? 'done' : 1);
  
  // Si l'utilisateur a déjà une demande de suppression, afficher "done" même au refresh
  return step === 'done' ? <Alert>Ton compte sera supprimé sous 30 jours</Alert> : ...;
};
```

### Règles Phase 17

**Données du domaine vs UI state**
| Type | Où stocker | Persistence |
|------|-----------|------------|
| Corrections, sessions coaching, passeport | Zustand store | localStorage (persist middleware) |
| Profil utilisateur, crédits, DSAR requests | Zustand store | localStorage |
| Modal open/closed, tab selected | Local useState | Memory (non-persisté) |
| Form draft (textarea non-soumise) | Local useState | Memory (clear au refresh) |

**Anti-patterns Phase 17**
- ❌ Créer une page qui importe MOCK_* directement (ex. `import { MOCK_CORRECTIONS }`) — toujours passer par le store
- ❌ Garder un useState pour des données qui devraient vivre dans le store (ex. `const [profile, setProfile] = useState(INITIAL_PROFILE)`)
- ❌ Faire un `store.get()` dans un event listener sans `useCallback` — risque de stale closure (capture la version du store au moment de la création du listener, pas à l'invocation)
- ❌ Oublier de vérifier localStorage après un `store.patch()` — si localStorage n'est pas mis à jour, le state ne persist pas au refresh
- ❌ Committer une page sans vérifier que `npx tsc --noEmit` passe

**Exceptions : pages sans store wiring**
Quelques pages restent purement UI (18.2-18.4, déferred V1) :
- `ManagerViewsBuilder` — complexe, nécessite une UI builder intégrative
- `ItemRecommendations` — recommandation moteur, besoin d'une vraie API backend
- `PerplexityContentDetail` — contenu agrégé, parsing et state complexe

Ces pages restent avec du mock local en V1 ; wiring Phase 17+ en V2.

### Lessons Learned Phase 17-18

1. **Store API doit être cohérente** : tous les getX() retournent un tableau hydraté, tous les updateX(id, delta) acceptent un delta/patch, tous les addX(item) créent une nouvelle entrée. Erreur à éviter : un store qui mélange `getById()` et `getAll()` avec des signatures inconsistentes.

2. **Persistence middleware doit être sur TOUS les stores applicatifs** : si un store n'a pas `persist(...)`, les données disparaissent au refresh. Vérifier le setup dans `persistence.ts`.

3. **Route params = clés de sélection, pas d'identités** : un route param `coachId` doit matcher une propriété dans les données du store (ex. `sessions.find(s => s.coachId === coachId)`), pas être utilisé comme clé locale. Si pas de match → fallback à un default (ex. `?? sessions[0]`).

4. **Live data binding (no snapshots)** : appeler `store.getX()` directement dans le render body, pas dans useState/useEffect. Zustand re-render automatiquement quand les données du store changent via un `set()` d'un autre composant.

5. **Components.tsx showcase devient la source de vérité pour props/variants** : si un composant est utilisé en vraie page, son entrée dans Components.tsx DOIT correspondre à la réalité du code. Intégration = retirer `showcaseOnly: true`. Pas de divergence entre démo et utilisation réelle.

### Update Components.tsx — Phase 18.1

Phase 18.1 a mis à jour `src/pages/Components.tsx` avec :
- Nouveau `ComponentPreviewErrorBoundary` class (gère les erreurs de rendering des composants démé)
- Mises à jour des entries pour les 6 pages Phase 17 : CorrectionDetailLearner, CoachEnterpriseDashboard, PurchaseCredits, MessagingThread, PrivacyDeleteAccount, PrivacyDsar
- Retrait de `showcaseOnly: true` sur les composants qui sont maintenant utilisés réellement (StatusBadge, MetaPill, Badge)
- Ajout de `usedBy: [...]` arrays listant les pages qui consomment chaque composant

Tous les composants Phase 17-18 ont maintenant des mappings corrects vers les pages qui les utilisent.

---

## Phase 19 — Design Excellence (UX intuitivité + DS unification) 🚀

**Objectif** : passe finale qualité avant V1. Audit UX intuitivité de toutes les pages, rationalisation des familles fragmentées, intégration ou sunset des `showcaseOnly`, synchro Notion à jour. **Pas** de redesign visuel structurel (Phase 14-15 reste verrouillée) ni de nouvelle fonctionnalité spec (Phase 16 close).

**Approche** : flow-by-flow (UX + DS combinés). Audit global d'abord → priorisation utilisateur → itérations workflow A→F par flow (plan → DS rationalisation → polish pages → vérif → Notion batch sync → commit).

**Livrables initiaux** :
- [`AUDIT-PHASE-19-NOTION-DELTA.md`](../AUDIT-PHASE-19-NOTION-DELTA.md) — sync préalable Notion (Étape 0 ✅)
- [`AUDIT-PHASE-19.md`](../AUDIT-PHASE-19.md) — matrice scorée 142 pages (Étape 1 ✅)

### Phase 19.1 — Foundations transverses (ErrorPage + a11y) ✅

**Livré** :
- ✅ `src/components/patterns/ErrorPage.tsx` (~170 LOC) — pattern canonique pour pages d'erreur. Props : `code, eyebrow, icon, title, description, callout, suggestions[], primaryAction, secondaryAction, tone (default|danger)`. Mobile-first, `min-h-touch` sur cards interactives, `focus-visible` géré.
- ✅ Audit `focus-visible` sur primitives core : **Button, Card (clickable), Input, Tabs, Sidebar/NavItem** — tous OK. Fix appliqué sur **Modal close button** + **Tag remove button** (manquaient).
- ✅ Entry Components.tsx showcase + Notion DS DB sync.

### Phase 19.B2 — HeroSection sunset (2026-05-26) ✅

**Livré** :
- ✅ `patterns/HeroSection.tsx` **supprimé** (était 436 LOC pour 3 consumers — disproportionné).
- ✅ `PageHero` étendu avec 2 nouveaux slots optionnels :
  - **`backLink`** : `{ label?, onClick }` ou `ReactNode` — chip top-left avec ArrowLeft, tone-aware (white sur saturé, primary sur default).
  - **`progress`** : `number` 0-100 + **`progressLabel`** : `ReactNode` — barre tone-aware au-dessus du trailing slot, role="progressbar" + aria valuenow/min/max.
- ✅ `LearningPathDetail.tsx` migré : `HeroSection variant="gradient" tone="primary"` → `PageHero tone="brand"` (mapping primary → brand) avec backLink + progress + meta + trailing.
- ✅ `Recherche.tsx` migré : `HeroSection` simple → `PageHero` avec eyebrow object.
- ✅ `Components.tsx` : 5 archetype demos HeroSection retirés, entry deprecated affiche bannière Phase 19.B-2026-05-26 sunset.
- ✅ Barrel export `src/components/index.ts` : `HeroSection` retiré + commentaire migration path.
- ✅ 0 erreur tsc · Search page smoke test OK (h1 "Trouvez ce dont vous avez besoin", PageHero rendered).

**Pas migré** :
- KPI grid pattern (HeroSection.kpis) — aucun consumer actif n'utilisait cette feature en V1. Si besoin futur → créer un wrapper spécialisé sur PageHero (`DashboardHero` ou `StrategicHero` avec slot kpis) plutôt que polluer l'API publique de PageHero.

### Phase 19.B — Header family renaming (2026-05-26) ✅

**Contexte** : audit Phase 19 a révélé que `EditorialHero` est utilisé sur **101+ pages** (Dashboard, Auth, Coaching, Settings, etc.) — pas du tout éditoriales. Le nom était trompeur. Phase 19.B clarifie le nommage **sans sunset ni migration mass** :

**Livré** :
- ✅ `patterns/EditorialHero.tsx` exporte désormais **`PageHero` (canonical universal name)** + `EditorialHero` (alias rétrocompat).
- ✅ Types : `PageHeroProps`, `PageHeroTone`, `PageHeroEyebrow`, `PageHeroMetaItem` exposés. Anciens types (`EditorialHero*`) conservés comme aliases `@deprecated` pointant vers les nouveaux (rétrocompat 0 break, 0 consumer touché).
- ✅ Barrel export `src/components/index.ts` met `PageHero` en premier, `EditorialHero` en alias.
- ✅ `Components.tsx` showcase entry renommée `"PageHero (alias: EditorialHero)"` avec description complète du dual naming.
- ✅ `CLAUDE.md` ligne 66 documente le rename + convention : nouveaux usages → `PageHero`, surfaces éditoriales (Veille, Magazine, Articles) → `EditorialHero`.
- ✅ Notion DS DB sync (à venir dans la même session).
- ✅ 0 erreur tsc · Dashboard smoke test OK (h1 "Bienvenue Dev", hero rendered, 0 runtime error).

**Pas dans cette phase** :
- ❌ Migration mass des 101 consumers (pas nécessaire grâce à l'alias — peut se faire progressivement)
- ❌ Sunset `HeroSection` (3 consumers, 436 LOC bloated) — décision séparée à prendre
- ❌ Création variante `EditorialHero` réellement spécialisée pour Veille/Magazine (defaults max-w-prose, italic eyebrow, author/date meta) — à faire si/quand le besoin se concrétise

**Conventions naming (réf)** :
- `PageHero` = universal page-opening hero (Dashboard, Auth, Coaching, Settings, detail pages, etc.)
- `EditorialHero` = alias rétrocompat + canonical name pour surfaces réellement éditoriales (Magazine, Veille, Articles, Newsletter, WeeklyNews)
- `PageHeader` = utility page header (Settings, Billing, Privacy — pages purement fonctionnelles)
- `SectionHeader` = within-page section heading (h2/h3, déjà universel)
- `ViewerHeader` = specialized pour lesson player overlay
- `HeroSection` = TBD (variantes KPI-driven, décision en attente)

### Phase 19.A — Chip base extraction (2026-05-26) ✅

**Livré** :
- ✅ `src/components/ui/Chip.tsx` (~214 LOC) — primitive interne + style tokens partagés (`CHIP_BASE`, `CHIP_SIZE`, `CHIP_TONE_SOLID`, `CHIP_TONE_SOLID_ACTIVE`, `CHIP_TONE_HOVER`, `CHIP_SURFACE_MAP`, `CHIP_INTERACTIVE`) + helper `resolveChipClasses({size, tone, surface, interactive, hover})` + composant `<Chip>` polymorphique (`asButton`, `active`, `leadingIcon`, `trailingIcon`).
- ✅ 4 wrappers refactorés vers Chip tokens, **APIs publiques préservées** (rétrocompat 0 break) : `Pill` (61 LOC), `Tag` (91 LOC), `MetaPill` (106 LOC), `FilterChip` (111 LOC).
- ✅ **A11y win** : `MetaPill` clickable rend désormais un vrai `<button>` au lieu de `role="button"` span (fix WCAG 4.1.2 Name/Role/Value).
- ✅ Tone maps dédupliqués (avant : 4× la même map neutral/primary/warm/sun). Future addition d'un tone = 1 fichier au lieu de 4.
- ✅ Glass variants partagés via `CHIP_SURFACE_MAP` (glass-light/glass-dark/glass-tinted/solid-white).
- ✅ 29 pages consumer non touchées · 0 erreur tsc · 17 pills + 3 FilterChips rendus sur /learning-paths smoke test.

**À garder en tête** : LOC total a légèrement augmenté (302 → 583) parce que Chip primitive carry des constantes + JSDoc + helper. Le vrai gain est DRYness et single-source-of-truth, pas LOC. Trade-off accepté.

### Phase 19.C — AuthShell distill (2026-05-26) ✅

**Livré** :
- ✅ Suppression `AuthFeature` (deprecated depuis 2026-05-09, 0 consumer dans le codebase). Retrait du fichier + barrel export (`src/components/index.ts`).
- ✅ JSDoc structure du fichier `AuthShell.tsx` : 1 layout + 11 sub-components catégorisés (Branding/Copy · Buttons · Form fields · State · Brand icons · Style tokens). Lecture beaucoup plus claire.
- ✅ Logo loading animation upgrade **V0 pulse → V0.5 rotation spinner** (2.4s cubic-bezier, breath subtil + opacity flicker, like Claude loading mark). Documented dans DESIGN-IMPECCABLE.md §13 Signature 4. V1 shape-morph reste TODO en attente du brand refresh (Canva + Notion guidelines).
- ✅ Fix log kanban `/design-showcase` réorganisé en board 3 colonnes (Fait / En cours / À faire).

### Convention a11y — règle obligatoire (à appliquer flow-by-flow)

**Interactive elements** (boutons, liens cliquables, cards `role="button"`, items navigation) **DOIVENT** respecter :

1. **Touch target ≥ 44px** (WCAG AA, Apple HIG). Tailwind utility : `min-h-touch` (= `min-height: 2.75rem` = 44px) ou Button `size="lg"` (h-12 = 48px).
   - ⚠️ Button `size="sm"` (h-8 = 32px) et `size="md"` (h-10 = 40px) sont **en-dessous** du seuil. Réserver `sm` aux toolbars denses non-critiques (badges, chips). `md` reste acceptable si bouton entouré de marge ≥ 8px.
   - Pages mobile-first : préférer `size="lg"` ou ajouter explicitement `min-h-touch` à toutes les CTAs.

2. **Focus visible** (`focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500`). Pattern obligatoire sur tout élément focusable custom (`<button>`, `<div role="button">`, `<a>` stylé en bouton).

3. **Contraste AA** texte/fond : utiliser les tokens DS (`text-ink-900` sur `bg-white`, `text-white` sur `bg-primary-600+`). Éviter `text-ink-500` sur fond très clair pour titres/CTA.

**Audit transverse découvert** (à corriger flow-by-flow durant Phase 19.2+) — 25 composants composites où `focus-visible` n'est pas garanti :

| Layer | Composants concernés |
|-------|---------------------|
| **patterns/** | ActivityFeed, AppBreadcrumb, CoachCardGrid, DataTable, EmptyDashboardState, Flashcard, FormLayout, LearningPathGrid, LessonNavigation, MultiStepForm, NewsletterSignupCard, ResourceCardGrid, StepTutorial, TableOfContents, ViewerOverlay |
| **ui/** | AIOverrideButton, AchievementBadge, ActionCard, CompetencyRadar, CorrectionCard, CourseCard, HeatmapGrid, MetaPillGroup, ProfileCard, Search |

> ⚠️ La plupart de ces composites consomment des primitives (Button, Card) qui ont `focus-visible` — donc l'a11y est partiellement OK via composition. Mais les éléments interactifs custom (cards `<button>` inline, items navigation, headers cliquables) doivent ajouter explicitement la triple `focus-visible:outline-*`. À corriger systématiquement quand le composant est touché dans un flow Phase 19.2+.

### Pattern ErrorPage — usage canonique

```tsx
// 404 - informational
<ErrorPage
  code="404"
  title="Oups, page non trouvée"
  description="La page demandée n'existe pas."
  suggestions={[
    { icon: <Home size={20} />, title: 'Dashboard', onClick: () => navigate('/dashboard'), tone: 'primary' },
    { icon: <Search size={20} />, title: 'Parcours', onClick: () => navigate('/learning-paths'), tone: 'sun' },
  ]}
  primaryAction={<Button leadingIcon={<Home size={16} />}>Retour</Button>}
/>

// 500 - danger / server error
<ErrorPage
  tone="danger"
  code="500"
  eyebrow="Système • Incident"
  title="Erreur serveur"
  description="Une erreur technique s'est produite."
  callout={<>Diagnostic rapide : Code 500, équipe notifiée.</>}
  primaryAction={<Button>Réessayer</Button>}
  secondaryAction={<Button variant="secondary">Tableau de bord</Button>}
/>
```

**Tones** : `default` (gradient primary→secondary, ton informationnel) · `danger` (gradient danger→secondary, erreur serveur/critique).

**Sera consommé par** : Error404, Error500 (Phase 19.2). Réutilisable pour tout fallback futur (403 forbidden, 410 gone, paywall, maintenance).

### Phase 19.D — Warm shadows + typography tightening (2026-05-26) ✅

**Livré** :
- ✅ 3 warm-tinted shadow tokens + 6 Tailwind utilities dans `src/index.css` : `--shadow-card` (amber 7% + black 5%), `--shadow-card-hover`, `--shadow-card-lift`. Utilities `.shadow-card`, `.shadow-card-hover`, `.shadow-card-lift` + variantes hover.
- ✅ `Card.tsx` : variantes `default/feature/elevated/interactive` → shadow-card family. Interactive card : `-translate-y-1` + `shadow-card-lift` + `border-primary-300` + `bg-primary-50/30` au hover. Title tracking par size : `lg → tracking-display`, `md → tracking-headline`, `xs/sm → tracking-tight`. `CardTitle` standalone → `tracking-headline`.
- ✅ `SectionHeader.tsx` : `SIZE_TRACKING` map `{ xs: tracking-tight, sm: tracking-headline, md: tracking-headline, lg: tracking-display }`. Appliqué sur les 3 instances `<h2>` (minimal, accent/underline, default/solid).
- ✅ `EditorialHero.tsx` : `<h1>` `tracking-tight` → `tracking-display`.
- ✅ `src/index.css` : 2 utilities `.tracking-display { letter-spacing: -0.03em }` + `.tracking-headline { letter-spacing: -0.025em }`.
- ✅ 0 erreur tsc · smoke test `/components` + `/journal`.

**Où voir les warm shadows** : DevTools → Computed → `box-shadow` sur n'importe quelle Card. Valeur attendue au repos : `rgba(237, 132, 58, 0.07) 0px 1px 3px 0px, rgba(0, 0, 0, 0.05) 0px 1px 2px 0px`. Bien visible au hover sur `/journal` ou `/components`.

**Nouveaux tokens référence** (ajoutés à la table Ombres ci-dessus) :

| Token CSS | Classe Tailwind | Valeur |
|---|---|---|
| `--shadow-card` | `shadow-card` | `0 1px 3px rgba(237,132,58,0.07), 0 1px 2px rgba(0,0,0,0.05)` |
| `--shadow-card-hover` | `shadow-card-hover` | `0 4px 14px rgba(237,132,58,0.11), 0 2px 6px rgba(0,0,0,0.07)` |
| `--shadow-card-lift` | `shadow-card-lift` | `0 8px 24px rgba(237,132,58,0.14), 0 4px 8px rgba(0,0,0,0.06)` |

### Phase 19.E — Inline style cleanup + a11y complète (2026-05-26) ✅

**Livré** :
- ✅ `LessonPlayer.tsx` : inline `style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))' }}` → Tailwind arbitrary property `[grid-template-columns:repeat(auto-fit,minmax(240px,1fr))]`.
- ✅ `TableOfContents.tsx` : `min-h-touch` + `focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500` ajoutés sur les items `<a>` de navigation (scroll-spy TOC).
- ✅ `JournalNewEntry.tsx` : header + main `px-6` → `px-4 sm:px-6` (mobile-first responsive fix — évite le débordement sur petits écrans < 375px).
- ✅ Audit des 12 composites restants (patterns/ + ui/) : tous couverts via primitives (Button/Card) ou commit a11y précédent. Coverage 100% confirmé.
- ✅ Exception documentée : `VideoTutorial.tsx` garde son `style={{}}` — double radial gradient complexe sans équivalent Tailwind statique (cas légitime per CLAUDE.md règle 4).
- ✅ 0 erreur tsc.

**Pattern Tailwind v4 — arbitrary CSS property** :
```tsx
// ❌ INTERDIT (même si ça marche) — inline style pour layout
style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))' }}

// ✅ CORRECT — Tailwind v4 arbitrary property syntax
className="[grid-template-columns:repeat(auto-fit,minmax(240px,1fr))]"
```
Note : dans Tailwind v4, les arbitrary property values n'ont pas d'espace autour du `:` ni dans les `minmax(...)` — sinon le parser les splits.

### Phase 19.F — Documentation finale + score 18.5/20 (2026-05-26) ✅

**Livré** :
- ✅ `DESIGN-IMPECCABLE.md` : Gaps #1 (typography), #5 (warm shadows), #6 (component consolidation) → statut ✅ Phase 19.D / Phase 19.A.
- ✅ `CLAUDE.md` : table Ombres étendue avec shadow-card family. Sections Phase 19.D/E/F documentées.

**Score final Phase 19 A→F** :

| Dimension | Score avant 19.A | Score après A→F | Delta |
|---|---|---|---|
| Accessibilité | 3.5/4 | 4/4 | +0.5 |
| Performance | 3/4 | 3.5/4 | +0.5 |
| Theming | 4/4 | 4/4 | = |
| Responsive | 3/4 | 3.5/4 | +0.5 |
| Anti-patterns | 3/4 | 3.5/4 | +0.5 |
| **Total** | **16.5/20** | **18.5/20** | **+2.0** |

**Résumé cycle A→F** :
- **19.A** : Chip primitive extraction (4 wrappers unifiés, DRY tokens, a11y MetaPill)
- **19.B/B2** : PageHero canonical rename + HeroSection sunset (436 LOC retiré)
- **19.C** : AuthShell distill (AuthFeature supprimé, JSDoc restructuré, spinner upgrade)
- **19.D** : Warm shadows + typography tightening (tracking-display/-headline, shadow-card family)
- **19.E** : Inline style cleanup + TableOfContents a11y + JournalNewEntry responsive
- **19.F** : Documentation finale (DESIGN-IMPECCABLE.md + CLAUDE.md)

---

## Phase 20 — Figma pixel-perfect reproduction (flow par flow)

**Objectif** : reproduire pixel-perfect dans Figma chaque flow de l'app React à partir du code source et des screenshots live. Chaque frame Figma doit être une source de vérité visuelle fidèle au code, utilisable pour handoff design/dev.

### Workflow Figma reproduction — 6 étapes (OBLIGATOIRE)

```
ÉTAPE 1 — SCREENSHOTS LIVE (référence visuelle)
  1.1 Démarrer le dev server : npm run dev (port 5173)
  1.2 Naviguer vers chaque page du flow
  1.3 Injecter le CSS anti-animation pour forcer l'affichage :
      const style = document.createElement('style');
      style.textContent = '* { opacity: 1 !important; transform: none !important;
        transition: none !important; animation: none !important; }';
      document.head.appendChild(style);
  1.4 Prendre un screenshot via preview_screenshot (serverId du preview_start)
  1.5 Faire ça pour TOUTES les pages du flow avant de toucher Figma

ÉTAPE 2 — AUDIT CODE → COMPOSANTS
  2.1 Lire le fichier source .tsx de chaque page + les composants patterns utilisés
  2.2 Identifier tous les sous-composants, tokens, espacements, couleurs
  2.3 Dresser un tableau : | Élément | Valeur CSS/Tailwind | Notes |
  2.4 Points critiques à vérifier :
      - Font sizes : text-caption(13px) / text-body-sm(14px) / text-body(16px) / etc.
      - Border radius : rounded-xl(12px) / rounded-2xl(16px) / rounded-3xl(24px)
      - Heights : h-12=48px (touch targets), h-14=56px, etc.
      - Glass tokens : bg-white/10, bg-white/8, bg-white/15, border border-white/20
      - Spacing : gap-4(16px) / gap-5(20px) / gap-6(24px) / px-8(32px) / py-10(40px)

ÉTAPE 3 — AUDIT DS FIGMA EXISTANT (avant toute création)
  3.1 Lister tous les composants Figma existants :
      figma.root.findAll(n => n.type === 'COMPONENT' || n.type === 'COMPONENT_SET')
  3.2 Pour chaque composant du code, chercher un équivalent Figma (nom peut différer !)
      Exemples de correspondances non-évidentes :
      - AuthField (code) → AuthField (Figma, id existant)
      - AuthPrimaryButton → variant=inverse sur Button existant
      - AuthGhostButton → variant=ghost-dark sur Button existant
      - AuthDivider → tone=glass-dark sur Divider existant
  3.3 Matrice de décision :
      REUSE   : composant Figma existant fait le job tel quel → utiliser instance
      EXTEND  : variante manquante sur composant existant → ajouter le variant
      CREATE  : aucun équivalent → créer nouveau composant dans la bonne page DS
  3.4 TOUJOURS proposer à l'utilisateur avant de créer/modifier quoi que ce soit

ÉTAPE 4 — CORRECTION / CONSTRUCTION FIGMA
  4.1 Bottom-up : corriger/créer les composants DS AVANT les frames screens
  4.2 Framer-motion issues :
      - Les animations framer-motion rendent les éléments opacity:0 dans les screenshots
      - FIX : injecter le CSS anti-animation (voir étape 1.3) avant chaque screenshot
  4.3 Tokens Figma → vérifier que les valeurs correspondent exactement au code :
      | Token code              | Valeur Figma attendue                    |
      | bg-primary-600          | Fill: r=0.290 g=0.561 b=0.631            |
      | bg-primary-700          | Fill: r=0.239 g=0.467 b=0.525            |
      | bg-primary-800          | Fill: r=0.184 g=0.373 b=0.416            |
      | rounded-3xl             | cornerRadius: 24                         |
      | rounded-xl              | cornerRadius: 12                         |
      | rounded-2xl             | cornerRadius: 16                         |
      | h-12 (48px)             | height: 48                               |
      | gap-6                   | itemSpacing: 24                          |
      | gap-5                   | itemSpacing: 20                          |
      | gap-4                   | itemSpacing: 16                          |
      | px-8 py-10              | paddingLeft/Right: 32, paddingTop/Bottom: 40 |
      | text-body (16px)        | fontSize: 16                             |
      | text-body-sm (14px)     | fontSize: 14                             |
      | text-caption (13px)     | fontSize: 13                             |
      | font-display League Spartan Extra Bold h2 | fontSize: 30, fontFamily: League Spartan, style: Extra Bold |
      | bg-white/10             | Fill: white opacity 10%                  |
      | bg-white/15             | Fill: white opacity 15%                  |
      | border border-white/20  | Stroke: white opacity 20%, width: 1      |
  4.4 Police : charger les fonts avant d'écrire du texte
      await figma.loadFontAsync({ family: "Nunito", style: "Semi Bold" });
      await figma.loadFontAsync({ family: "League Spartan", style: "Extra Bold" });
  4.5 Pièges connus :
      - Placeholder text : garder à 15px (légèrement plus petit que text-body pour visuel)
      - Copyright : vérifier qu'il est SOUS le dernier élément, jamais chevauchant
      - Boutons ghost font : text-body = 16px, pas 15px
      - Emoji vs Lucide icon : toujours vérifier que les icônes sont des instances Figma
        et non du texte emoji (chercher par nom : figma.root.findAll(n => n.type==='COMPONENT' && n.name==='Sparkles'))

ÉTAPE 5 — VÉRIFICATION VISUELLE (Figma screenshot vs live app)
  5.1 Exporter chaque frame :
      const bytes = await frame.exportAsync({ format: 'PNG', constraint: { type: 'SCALE', value: 0.5 } });
      return { img: figma.base64Encode(bytes) };
      OU utiliser mcp__18afc236-bea0-4964-b6d4-074a260039c3__get_screenshot (node_id de la frame)
      + curl pour télécharger + Read pour visualiser
  5.2 Comparer côte-à-côte Figma vs live :
      - Positions et espacements cohérents
      - Couleurs identiques
      - Icons : instances Figma (pas emoji ni vecteurs custom)
      - Copyright non chevauchant
  5.3 Si un écart est détecté → corriger dans Figma (pas dans le code)

ÉTAPE 6 — DS SYNC + VALIDATION USER
  6.1 Présenter à l'utilisateur :
      - Liste des corrections appliquées (tableau Before/After)
      - Liste des nouveaux composants proposés avec catégorie (Atom/Composite/Pattern)
      - Screenshots avant/après pour chaque frame modifiée
  6.2 Attendre validation explicite AVANT de créer les nouveaux composants DS dans Figma
  6.3 Après validation :
      - Créer les composants DS sur la bonne page (Atoms ou Composites)
      - Mettre à jour Components.tsx si composant aussi dans le code
      - Notion DS DB sync
  6.4 Commit doc : docs(phase-20.X): figma reproduction [flow name]
```

### Prompt template pour nouvelle session Figma reproduction

```
Reproduis pixel-perfect dans Figma le flow "[NOM DU FLOW]" à partir du code source React.

Fichier Figma : LccBZ1GKWQVwVzPtsSzk5Y
Page cible : [NOM PAGE FIGMA] (id: [PAGE_ID])
Dev server : http://localhost:5173

Pages du flow :
- [route] → [NOM FRAME FIGMA] (id: [FRAME_ID])
- ...

Workflow OBLIGATOIRE (voir CLAUDE.md § Phase 20) :
1. Screenshots live de toutes les pages (avec CSS anti-animation framer-motion)
2. Audit code : lire .tsx de chaque page + composants patterns
3. Audit DS Figma : chercher équivalents AVANT de créer
4. Présenter matrice REUSE/EXTEND/CREATE → attendre validation user
5. Corriger les frames existantes
6. Screenshots Figma de vérification
7. Proposer les nouveaux composants DS validés → créer après accord

Règles critiques :
- NE PAS créer de composants DS sans validation user explicite
- Les placeholder/input text = 15px (pas 16px)
- Les boutons (primary + ghost) = 16px (text-body)
- Charger les fonts avant toute écriture texte (Nunito Semi Bold + League Spartan Extra Bold)
- Vérifier que copyright n'est jamais chevauchant avec le dernier élément
- Emoji ≠ Lucide icon : toujours vérifier les icônes dans les boutons
```

### Pièges Figma reproduction découverts (2026-05-27)

1. **Framer-motion opacity:0** : les pages avec framer-motion (= presque toutes) affichent un écran blanc au screenshot. **Fix** : injecter `style.textContent = '* { opacity: 1 !important; transform: none !important; animation: none !important; }'` via `preview_eval` avant chaque `preview_screenshot`.

2. **Copyright chevauchant** (AUTH 4) : quand la frame contient card + aside + copyright, la hauteur totale peut dépasser 900px. **Fix** : calculer la hauteur du contenu et repositionner — ou étendre la frame height. Formule : `card_height + gap(24) + aside_height + gap(32) + copyright(16) + padding_top(48) + padding_bottom(48)`.

3. **Emoji vs Lucide icon dans les boutons** : les sessions précédentes (Figma Make prototype) avaient remplacé des icônes par des emojis texte (ex. "✨" au lieu de Sparkles). **Fix** : `figma.root.findAll(n => n.type === 'COMPONENT' && n.name === 'Sparkles')` pour trouver l'ID du component, puis `createInstance()`.

4. **Font size 15 vs 16 inadvertie** : lors d'un fix global des boutons (fontSize 15→16), les textes de placeholder/input ont aussi été touchés. **Fix** : cibler uniquement les textes bouton par leur `characters` (ex. `'Retour connexion'`, `'Se connecter avec mot de passe'`) pas par fontSize seul.

5. **Positions Figma en coordonnées absolues** : les frames Figma ne sont pas auto-layout par défaut. Les positions `.x` et `.y` des enfants sont absolues dans le frame parent. Pour repositionner proprement, calculer depuis le haut en utilisant la même logique que le CSS flex-center : `y_debut_contenu = (frame_height - total_content_height) / 2`.

6. **`layoutPositioning = 'ABSOLUTE'` doit être mis APRÈS appendChild** : si on ajoute un node à un auto-layout frame et qu'on veut ensuite le positionner en absolu, il faut d'abord l'appendre puis changer `layoutPositioning`. L'inverse génère une erreur.

7. **Framer-motion opacity:0** (ÉTAPE 1.3) : les pages avec framer-motion rendent opacity:0 au premier render, affichant un écran blanc. **Fix** : injecter le CSS anti-animation dans `preview_eval` AVANT chaque screenshot : `const style = document.createElement('style'); style.textContent = '* { opacity: 1 !important; transform: none !important; animation: none !important; }'; document.head.appendChild(style);`

8. **Copyright chevauchant — calcul de hauteur** (ÉTAPE 2.2, ÉTAPE 4.2) : quand la frame contient multiple sections (card + aside + copyright), la hauteur totale peut dépasser 900px et le copyright se chevauche avec l'élément au-dessus. **Fix** : calculer explicitement `total_height = card_height + gap(24) + aside_height + gap(32) + copyright(16) + padding_top(48) + padding_bottom(48)`. Si dépasse 900px, étendre la frame height ou réduire les gaps.

### Exemples de correspondances composants code → DS Figma (flow AUTH)

| Code (AuthShell.tsx) | DS Figma | Action |
|---|---|---|
| `AuthField` | `AuthField` (id: 1112:70, status=default/success/error) | ✅ REUSE — déjà existant |
| `AuthPasswordField` | Extension de `AuthField` + Eye icon | EXTEND AuthField |
| `AuthPrimaryButton` | `Button` → ajouter `variant=inverse` | EXTEND Button |
| `AuthGhostButton` | `Button` → ajouter `variant=ghost-dark` | EXTEND Button |
| `AuthSocialButton` | Aucun équivalent | CREATE — Atoms |
| `AuthDivider` | `Divider` → ajouter `tone=glass-dark` | EXTEND Divider |
| `AuthCheckbox` | `Checkbox` → ajouter `surface=dark` | EXTEND Checkbox |
| `AuthInlineLink` | `Button variant=link` (light) → ajouter `surface=dark` | EXTEND Button |
| `AuthSuccess` | Aucun équivalent (≠ EmptyState) | CREATE — Composites |
| `back-link` (← Retour) | Aucun équivalent standalone | CREATE — Atoms |
| `AuthShell` (glass card layout) | `Card variant=glass-dark` (partiel) | Pattern-level, pas de composant |

---

## Phase 21 — Pages de documentation Component Library dans Figma (2026-06-27)

**Objectif** : construire des pages Figma de documentation complètes pour chaque famille de composants (Cards, Badges, Buttons, etc.) directement depuis le code source React, avec **tous les tokens DS bindés** — variables couleurs, text styles, effect styles.

**Page de référence construite** : `🃏 Cards — Component Library` (page id `4126:26`, fichier `LccBZ1GKWQVwVzPtsSzk5Y`) — 11 composants documentés, ~5 000px de haut, ~2026-06-27.

### Structure canonique d'une page de doc

```
Page title : "🃏 Cards — Component Library"  (ou autre emoji famille)
Sous-titre  : "Famille complète des cards TLS · Tailwind v4 · Tokens sémantiques · Phase 19 en cours"
Navigation  : eyebrow chips cliquables vers chaque section

[Pour chaque composant, une section avec :]
  — séparateur horizontal (1px, borderDefault)
  — label row : N° eyebrowMd (p500) · Nom composant h3 (txtStrong) · path source caption (txtMuted)
  — cards side-by-side (gap 20-28px) : 1 card par variant/tone/state principal
  — cursorY += card_height + 80px (GAP inter-sections)
```

### Pattern de script `use_figma` pour pages de doc

**Helpers canoniques** (inclure dans chaque script) :

```js
// vs(key, opacity?) — variable-bound solid paint
const vs = (key, opacity = 1) => {
  const v = figma.variables.getVariableById(VAR[key]);
  if (!v) return { type: 'SOLID', color: { r: 0.9, g: 0.9, b: 0.9 }, opacity };
  return figma.variables.setBoundVariableForPaint(
    { type: 'SOLID', color: { r: 0.5, g: 0.5, b: 0.5 }, opacity }, 'color', v);
};

// tx(text, tsKey, colorKey?, fixedWidth?) — texte stylé avec text style + couleur bindée
const tx = (text, tsKey, colorKey, fixedWidth) => {
  const n = figma.createText();
  try { if (TS[tsKey]) n.textStyleId = TS[tsKey]; } catch(e) {}
  n.characters = text;
  if (colorKey && VAR[colorKey]) n.fills = [vs(colorKey)];
  if (fixedWidth) { n.textAutoResize = 'HEIGHT'; n.resize(fixedWidth, Math.max(n.height, 16)); }
  else n.textAutoResize = 'WIDTH_AND_HEIGHT';
  return n;
};

// makeLabel(num, title, path) — séparateur + row de label de section
const makeLabel = (num, title, path) => {
  const sep = figma.createRectangle(); sep.resize(1328, 1); sep.fills = [vs('borderDefault')];
  sep.x = LEFT; sep.y = cursorY; cardsPage.appendChild(sep); cursorY += 24;
  const row = figma.createAutoLayout('HORIZONTAL');
  row.primaryAxisSizingMode = 'FIXED'; row.counterAxisSizingMode = 'AUTO';
  row.resize(1328, 32); row.counterAxisSizingMode = 'AUTO'; row.itemSpacing = 16; row.fills = [];
  row.x = LEFT; row.y = cursorY; cardsPage.appendChild(row);
  [tx(num,'eyebrowMd','p500'), tx(title,'h3','txtStrong'), tx(path,'caption','txtMuted')]
    .forEach((n, i) => { row.appendChild(n); n.layoutSizingHorizontal = i===2?'FILL':'HUG'; });
  cursorY += row.height + 32;
};

let cursorY = 160; // départ sous le titre de page
const LEFT = 56;
const GAP = 80;   // espace inter-sections
```

**Constantes TLS DS stables** (IDs à réutiliser dans les scripts) :

```js
// Variables TLS / Colors
const VAR = {
  p50:'VariableID:1080:3', p100:'VariableID:1080:4', p200:'VariableID:1080:5',
  p500:'VariableID:1080:8', p600:'VariableID:1080:9', p700:'VariableID:1080:10', p800:'VariableID:1080:11',
  s50:'VariableID:1081:2',  s100:'VariableID:1081:3', s200:'VariableID:1081:4',
  s500:'VariableID:1081:7', s600:'VariableID:1081:8', s700:'VariableID:1081:9',  s800:'VariableID:1081:10',
  a50:'VariableID:1081:12', a100:'VariableID:1081:13',a200:'VariableID:1081:14',
  a400:'VariableID:1081:16',a600:'VariableID:1081:18',a700:'VariableID:1081:19', a800:'VariableID:1081:20',
  white:'VariableID:1082:2',
  ink50:'VariableID:1082:3',  ink100:'VariableID:1082:4', ink200:'VariableID:1082:5',
  ink300:'VariableID:1082:6', ink400:'VariableID:1082:7', ink500:'VariableID:1082:8',
  ink600:'VariableID:1082:9', ink700:'VariableID:1082:10',ink900:'VariableID:1082:12',
  txtStrong:'VariableID:1083:14', txtDefault:'VariableID:1083:15',
  txtMuted:'VariableID:1083:16',  txtSubtle:'VariableID:1083:17', txtInverse:'VariableID:1083:18',
  borderSubtle:'VariableID:1083:19', borderDefault:'VariableID:1083:20', borderStrong:'VariableID:1083:21',
  success:'VariableID:1083:23',
};

// Text Styles TLS
const TS = {
  h1: 'S:d493ce57e7e05f00b5092d6b0aab216666d94e4f,',
  h2: 'S:912e9ef101114500acd317a2aad007e578eb9aa6,',
  h3: 'S:eeb147adc57b4c3bb6b06de186929eb2ac3cb9b2,',
  h4: 'S:282ce31040ba9ea7d9746f8dee28e1a30372c370,',
  h5: 'S:14ced1bfcc8865ef06ceba8358cac5002e6c7210,',
  body:        'S:8089008b986ad149a4bc5e58c01faa35c35db64e,',
  bodySm:      'S:09a4c0a27962ce95261757a946d0b3faf8407842,',
  bodyStrong:  'S:5b49fbaccad6abf0a7edd9f0e84ba675ceda2abc,',
  caption:     'S:f4c767f5555ce09ca6e49ed59e877151a43cc407,',
  captionStr:  'S:e80f1a86eaa7921dffb2c37bd2a9de29858b7edd,',
  micro:       'S:ceafa616384c37944f56c94e90e4c9b07980d764,',
  eyebrowMd:   'S:e98a7e5c655664f5f3f7b56fb60635423a84086f,',
  btnSm:       'S:3b5a0e0993494ec83d86ff885cfc709512273571,',
  btnMd:       'S:5ab6f74ca0e4af249bff4e20a1b5c974a6ce49ac,',
};

// Effect Styles TLS
const ES = {
  'card':          'S:cf8a294228d4997602a714074dcaa581f003d6ff,',
  'card-hover':    'S:2edc18e41c1dc1370a55115fbf080edd719ec770,',
  'card-lift':     'S:9b9b938bbffdd9d8989d7fe383f016daf25131ad,',
  'teal-sm':       'S:23ad9911b9b11de0963468547608fe05eafd9f42,',
  'teal-md':       'S:9324b5a7488008a381c67130f9b4cc19edcbab7c,',
  'warm-sm':       'S:5570de7def6f17ebb6be7740630b027cec42e4c8,',
  'warm-md':       'S:39674b5aa1b1ec75b44189beac0c91c54998f4cb,',
  'sun-sm':        'S:3acc8362bed1b174cff9af446ab458cdbed8b96a,',
  'sun-md':        'S:d20da67c5a408235cd6f777e80643ff50acc00ce,',
};
```

### Pièges Phase 21 (pages de doc Figma via Plugin API)

1. **`page.backgrounds` ne peut PAS être bindé aux variables** : `cardsPage.backgrounds = [vs('ink50')]` lance `"page backgrounds cannot be bound to variables"`. Utiliser du RGB brut :
   ```js
   cardsPage.backgrounds = [{ type: 'SOLID', color: { r: 0.976, g: 0.980, b: 0.984 }, opacity: 1 }];
   ```

2. **`HUG` interdit sur Ellipse, Rectangle, et Frame non-auto-layout** : `dot.layoutSizingHorizontal = 'HUG'` sur un `figma.createEllipse()` lance `"HUG can only be set on auto-layout frames or text children"`. Les formes (Ellipse, Rectangle) ont `layoutSizing = FIXED` par défaut — c'est correct, ne pas essayer de mettre HUG dessus.

3. **`primaryAxisSizingMode` ≠ `layoutSizingHorizontal`** (confusion fréquente) :
   - `frame.primaryAxisSizingMode` (set sur le frame lui-même) → `'FIXED'` | `'AUTO'` uniquement. **JAMAIS `'FILL'`.**
   - `child.layoutSizingHorizontal` (set sur l'enfant d'un AL frame) → `'FIXED'` | `'HUG'` | `'FILL'`.
   - Erreur type : `"Expected 'FIXED' | 'AUTO', received 'FILL'"` → chercher un `primaryAxisSizingMode = 'FILL'` dans le script.

4. **Scripts atomiques — si une erreur, RIEN n'est exécuté** : inutile de retry le même script partiel. Corriger l'erreur en entier puis resoumettre le script complet.

5. **Éléments positionnés en absolu dans un wrapper frame** (ex. badge numéroté `-top-5` de AstucesCard) : créer un `wrapper` frame parent sans clipping (`clipsContent = false`) + placer la card à `y = 20` et le badge à `y = 0`. Le wrapper absorbe le débordement du badge sans clipper la card.

6. **`counterAxisSizingMode` : 'AUTO' puis resize** : quand on veut un frame auto-layout qui hugs en vertical mais a une largeur fixe, faire dans cet ordre : `f.primaryAxisSizingMode = 'FIXED'; f.counterAxisSizingMode = 'AUTO'; f.resize(width, 10);` — le `counterAxisSizingMode = 'AUTO'` + `resize` fixe la largeur et laisse la hauteur se calculer.

7. **Toujours `return` tous les IDs créés** : chaque script doit `return { ok: true, nodeCount, nextCursorY }` pour permettre la continuité inter-scripts (le `nextCursorY` est passé au script suivant).

### Workflow par famille de composants (OBLIGATOIRE)

```
1. LIRE les fichiers source (.tsx) de tous les composants de la famille
2. IDENTIFIER les variants/tones/states principaux à documenter (max 5 par section)
3. ÉCRIRE les scripts en petits blocs (2–3 sections par appel use_figma max)
   - Charger les fonts au début de chaque script
   - Toujours déclarer VAR / TS / ES / vs() / tx() / makeLabel() dans chaque script (pas de shared state)
   - Tracker cursorY et le passer au script suivant via le return
4. PRENDRE un screenshot final via get_screenshot (nodeId de la page)
5. NE PAS créer de components Figma natifs — ces pages sont des frames de DOCUMENTATION,
   pas des composants de librairie (les vrais composants sont dans les pages Atoms/Composites)
```

### Pages de documentation existantes

| Page Figma | ID | Composants | Construit le |
|---|---|---|---|
| `🃏 Cards — Component Library` | `4126:26` | 11 cards (Card, LessonCard, SessionCard, JournalEntryCard, ActionCard, ResumeLessonCard, CourseCard, PageCard, AstucesCard, NotificationCard, PromptCard/JournalBubbleCard) | 2026-06-27 |

---

## Phase 23 — Card Component Refinement (UX + a11y) 🚀

**Objectif** : Audit et refinement de TOUS les composants card de l'app (10+ types). Corriger les accessibilité issues (min-h-touch, focus-visible), améliorer la cohérence tone-aware (shadows, buttons, dividers), et finaliser les tone-classes.ts comme source de vérité unique pour tone maps.

### Card Component Patterns (Phase 23 Stage C)

#### Tone-Aware Design

All card components support a `tone` prop (`primary`/`warm`/`sun`) that drives :
- **Background** : `TONE_BG_50[tone]` (primary-50, secondary-50, accent-50, etc.)
- **Shadow hover** : `CTA_SHADOW_HOVER_MD[tone]` (shadow-primary-md / shadow-card-hover / shadow-sun-md)
- **Icon color** : `TONE_CTA_TEXT[tone]` (text-primary-600 / text-secondary-500 / text-accent-400)
- **Button variant** : `ACTION_BTN_TONES[tone].primary` (maps tone to button variant)
- **Border color** : `TONE_BORDER[tone]` (border-primary-200 / border-secondary-200 / border-accent-200)

**Single source of truth** : `src/lib/tone-classes.ts` exports all maps. Import them, never redefine inline.

#### CTA Button Requirements (Phase 23 P0)

- **Height** : `min-h-touch` (44px). Use `h-11` or `size="lg"`.
- **Shadow** : `hover:shadow-{tone}-md hover:-translate-y-1` (tone-aware hover lift).
- **Contrast** : WCAG AA minimum (4.5:1 text-bg ratio). For "Continue Learning" enrolled button on `sun` tone: change `bg-ink-100 text-ink-900` (3.2:1) → `bg-ink-50 text-ink-800` (8.1:1 ✅).
- **Focus** : `focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500` on button element only, **not** on card root.

#### Icon Conventions (Phase 23 P1)

- **Lucide React** : all card icons must be from `lucide-react`, no custom SVG.
- **Size** : 14px (Clock, metadata icons), 16px (action icons), 18-20px (feature icons like Lock).
- **Color** : use `TONE_CTA_TEXT[tone]` for tone-aware coloring. Fallback: `text-ink-500`.
- **Stroke width** : default 2. Use 1.5 for "thin" emphasis (e.g., Lock in locked state).

#### MetaPill Adoption (Phase 23 P1)

Prefer `<MetaPillGroup>` for card metadata instead of inline text:

```tsx
// ❌ AVOID
<span className="text-caption text-ink-500">14 min · Level 2</span>

// ✅ PREFER
<MetaPillGroup size="sm">
  <MetaPill text="14 min" icon={<Clock size={12} />} tone={tone} />
  <MetaPill text="Level 2" tone={tone} />
</MetaPillGroup>
```

#### Surface Variants (Phase 23 P1)

Cards support multiple surfaces :
- **card** (default) : white background, standard shadows
- **tinted** : tone-aware 10% tint (bg-primary-50, etc.), gradient effect
- **glass** : backdrop-blur, white/10 background, border-white/20
- **frosted** : strong blur, white/15 background, border-white/30

Dividers and borders must adapt to surface via `SURFACE_DIVIDER[surface]` (ink-200 for white, white/20 for glass, etc.).

#### Feature Treatment : AstucesCard (Phase 23 P2)

AstucesCard uses `border-2` (2px thick border) as intentional visual distinction for tips/tricks content. Do not unify to standard `border` (1px) without design review.

### Fixes Applied Phase 23.C

| Component | Issue | Fix | Status |
|-----------|-------|-----|--------|
| ResumeLessonCard | CTA button h-10 (40px) < min-h-touch | Changed to h-11 (44px), moved focus-visible from card root to button | ✅ P0 |
| CourseCard | Sun tone button contrast 3.2:1 (fails AA) | Changed bg-ink-100 text-ink-900 → bg-ink-50 text-ink-800 (8.1:1 ✅) | ✅ P0 |
| ParcoursCard | CTA shadows hardcoded tone instead of tone-aware | Now uses `CTA_SHADOW_HOVER_MD[tone]` from tone-classes.ts | ✅ P1 |
| SessionCard | Action buttons don't apply tone-aware styling | Imported `ACTION_BTN_TONES` map (now in tone-classes.ts) | ✅ P1 |
| LessonCard | Icon colors hardcoded instead of tone-aware | Clock and ArrowRight now use `TONE_CTA_TEXT[tone]` | ✅ P1 |
| JournalEntryCard | Tags use hardcoded border-ink-200 | Tags now use `TONE_BORDER[tone]` for tone-aware borders | ✅ P1 |
| SessionCard | Footer divider static for all surfaces | Divider now uses `SURFACE_DIVIDER[surface]` mapping | ✅ P1 |
| NotificationCard | Icon bubble 44px (w-9 h-9) consistency | Increased to 48px (w-12 h-12) for visual consistency | ✅ P2 |
| AstucesCard | Undocumented border-2 (2px) | Added JSDoc explaining border-2 as intentional feature treatment | ✅ P2 |

### New Exports from tone-classes.ts (Phase 23.C)

```typescript
export const CTA_SHADOW_HOVER_MD: Record<PageTone, string>;
export const ACTION_BTN_TONES: Record<PageTone, Record<'primary' | 'secondary', string>>;
export const TONE_CTA_TEXT: Record<PageTone, string>;
export const TONE_BORDER: Record<PageTone, string>;
export const SURFACE_DIVIDER: Record<'card' | 'tinted' | 'glass' | 'frosted', string>;
```

**All card components must import and use these maps** — never hardcode tone-specific classes inline.
