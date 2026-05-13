# 🎨 DESIGN.md — The Learning Society Design System

> **Purpose** : Reference unique pour comprendre le DS — pour dev, designer, PM, et IA assistants.
> **Source live** : visite `/components` dans l'app pour le showcase visuel interactif.
> **Source code** : `src/components/` (core / ui / patterns / learning / modals / layout)
> **Source tokens** : `src/index.css` (`@theme` block — 170+ tokens)
> **Migration log** : `MIGRATION-PLAN.md`
> **Dev rules** : `CLAUDE.md` (règles strictes + 12 pièges connus)

---

## 0. Synchronisation Notion (OBLIGATOIRE)

Toute modification impactant le design system ou les pages de l'app **doit être répercutée dans les bases de données Notion**.

| Type de changement | Action Notion requise |
|---|---|
| Nouveau composant créé | Ajouter un item dans **Design System DB** (category, layer, migration status) |
| Composant migré vers Tailwind | Mettre à jour `Migration status` → "Tailwind ✅" dans Design System DB |
| Composant supprimé / fusionné | Archiver ou supprimer l'item dans Design System DB |
| Nouveau token `@theme` ajouté | Ajouter un item Token dans Design System DB |
| Nouvelle page créée dans le codebase | Ajouter un item dans **Écrans DB** (route, flow, niveau, objectif, composants clés) |
| Page devenant disponible (créée dans l'app) | Mettre à jour `Disponible sur l app` → YES dans Écrans DB |
| Page refactorisée (Phase 10) | Mettre à jour `Statut design` + body content dans Écrans DB |
| Nouveau pattern/guideline | Ajouter un item Guideline dans Design System DB |

### Liens Notion

- **Design System — Claude** : https://www.notion.so/thelearningsociety/fc727adea430439bb45590fd908ba134
- **Écrans Learning App** : https://www.notion.so/thelearningsociety/c60f30c775c8473fa15a8446f96142d4

### Pages manquantes à créer (audit 2026-05-12)

6 pages identifiées dans les écrans mais absentes du codebase — statut `Disponible: NO` dans Écrans DB.

| # | Page | Route | Flow | Priorité |
|---|---|---|---|---|
| P1 | Recherche | `/search` | Parcours & Apprentissage | Haute |
| P2 | MagicLink | `/auth/magic-link` | Authentification | Conditionnelle |
| P3 | VerifyEmail | `/auth/verify-email` | Authentification | Conditionnelle |
| P4 | SubscriptionPayment | `/subscription/payment` | Abonnement | Haute |
| P5 | Billing | `/account/billing` | Compte | Moyenne |
| P6 | Positionnement | `/onboarding/positionnement` | Onboarding | Haute |

→ Après création dans le codebase, mettre à jour `Disponible sur l app` → YES dans Écrans DB.
→ Voir `MIGRATION-PLAN.md` §Phase 10 — Pages à créer pour le détail complet.

### Process de quality check — 5 points obligatoires

À exécuter **à chaque modification** du code, de Notion, ou de la doc interne.

**Déclencheurs :**
- Composant créé / modifié (API, variant, tone) / supprimé
- Page créée / refactorisée / route renommée
- Token `@theme` ajouté ou supprimé
- Guideline ou règle DS modifiée

**Checklist :**

| # | Point de contrôle | Quoi vérifier |
|---|---|---|
| **1** | **Code → Notion** | Créer/modifier/archiver l'item dans Design System DB ou Écrans DB selon le changement. Ne jamais cocher "Tailwind ✅" ou "Disponible: YES" sans vérification dans le code. |
| **2** | **Notion → Code** (cross-check) | Si item marqué "Tailwind ✅" → grep le composant pour confirmer l'absence de classes BEM. Si "Disponible: YES" → confirmer que la route existe dans `App.tsx`. |
| **3** | **Components.tsx showcase** | Nouveau composant → ajouter entrée avec props/variants/usedBy. Variant ajouté → mettre à jour la démo. Composant supprimé → retirer entrée + tous les `usedBy`. Composant activé dans une vraie page → retirer `showcaseOnly: true`. |
| **4** | **Docs internes** | Nouveau pattern → `DESIGN.md §4`. Nouveau piège → `CLAUDE.md` Pièges + `DESIGN.md §5`. Nouveau token → `CLAUDE.md` table Référence. Nouvelle règle absolue → `CLAUDE.md` Règles absolues. |
| **5** | **MIGRATION-PLAN.md** | Cocher ✅ la tâche terminée. Mettre à jour "Progrès global". Si nouveau bloc de travail → ajouter une section Phase. |

**Anti-patterns :**
- Créer un composant sans entrée dans `Components.tsx` — le showcase est la source de vérité visuelle
- Marquer "Tailwind ✅" dans Notion sans tableau d'audit 8 critères validé par l'utilisateur
- Modifier l'API d'un composant sans mettre à jour `usedBy` dans toutes les entrées du showcase
- Supprimer un fichier sans vérifier ses imports : `grep -rn "import.*NomDuComposant" src/`
- Laisser `showcaseOnly: true` sur un composant utilisé dans une vraie page

→ Process détaillé avec exemples dans `CLAUDE.md` §Documentation Notion.

---

## 1. Principes design fondamentaux

### Tone narratif
4 tones sémantiques pour exprimer l'intention de chaque surface :

| Tone | Couleur | Usage |
|------|---------|-------|
| **primary** (brand) | Teal `#55A1B4` | Cœur de l'app (Dashboard, Journal, LearningPaths, Coaching), focus / leadership |
| **warm** | Orange `#ED843A` | Action / parcours en cours (legacy), milestones |
| **sun** | Yellow `#F8B044` | Réflexion / achievements / celebrations |
| **default / neutral** | Ink grays | Settings / utility / surfaces calmes |

### Mobile-first + responsive
- Default : single column / stacked layout
- Breakpoints : `md` 768px (tablet) / `lg` 1024px (desktop) / `xl` 1280px (wide)
- App shell (Sidebar + main) :
  - mobile (<768px) : Sidebar = drawer fixed (z-50) + backdrop scrim (z-40)
  - tablet (768-1023px) : Sidebar inline `w-[220px]`
  - desktop (1024px+) : Sidebar inline `w-[260px]` + collapse toggle disponible

### Glass morphism subtil
- Glass tokens : `backdrop-blur-glass-{light|medium|heavy|ambient}` (8 / 16 / 24 / 60px)
- Used on : auth pages (full-glass dark), hero panels (frosted overlays), sidebar (translucent)
- ⚠️ Pas d'overuse : utiliser sur surfaces tintées ou gradients, pas sur fond blanc plat

### Accessibilité (WCAG AA minimum)
- `min-h-touch` = 44px sur tous les interactive elements (WCAG 2.5.5)
- Focus-visible obligatoire : `focus-visible:outline-2 focus-visible:outline-offset-2`
- A11y attributes : `aria-label`, `aria-current="page"` pour nav, `role="button"` quand `onClick` sur div, `title` pour tooltips natifs
- Keyboard navigation : Tab order logique, Escape ferme overlays, ArrowKeys pour menus

---

## 2. Tokens (Tailwind v4 `@theme` dans `src/index.css`)

### Couleurs (50 tokens)
- **primary** 50→900 (teal) — brand principal
- **secondary** 50→900 (orange) — actions chaleureuses
- **accent** 50→900 (yellow) — celebrations · `accent-400 = #F8B044` est la **TLS Yellow Base canonique**
- **ink** 50→900 (grays) — texte + surfaces neutres
- **semantic** : success / danger / warning / info (muted/coral, pas RGB primaires)

### Typographie
| Token | Tailwind | Size | Weight (auto via `--text-{name}--font-weight`) |
|-------|----------|------|---|
| `--text-heading-1` → `--text-heading-5` | `text-heading-N` | 48 → 20px | 600 |
| `--text-h1` → `--text-h4` | `text-h1` → `text-h4` | 36 → 18px | h1/h2 700 / h3/h4 600 |
| `--text-body-lg` → `--text-micro` | `text-body-lg` → `text-micro` | 18 → 11px | (héritée, à overrider) |

**Familles** : `font-display` (League Spartan) pour titres · `font-body` (Nunito) pour texte · `font-mono` (JetBrains Mono) pour code

### Spacing sémantique (7 tokens)
| Token | Valeur | Usage |
|-------|--------|-------|
| `--spacing-tight` | 2px | Heading ↔ subtitle |
| `--spacing-stack-xs` | 8px | Inline groups, pills row |
| `--spacing-stack` | 16px | **DEFAULT** — section header ↔ contenu |
| `--spacing-stack-lg` | 24px | Content ↔ content au sein d'une section |
| `--spacing-section` | 32px | Entre sections sœurs |
| `--spacing-section-lg` | 40px | Séparations majeures |
| `--spacing-page` | 48px | Groupements page-level |

→ Utiliser via `gap-stack`, `gap-section`, `mt-stack-lg`, etc. — **jamais** `gap-4/6/8` arbitraire.

### Radius
`rounded-xs` (4) · `sm` (6) · `md` (10) · `lg` (14) · `xl` (20) · `2xl` (24) · **`pill` (999px)** ⚠️ pas `rounded-full`

### Shadows
`shadow-xs/sm/md/lg/xl` + brand-tinted : `shadow-brand-sm/md`, `shadow-warm-sm/md`, `shadow-sun-sm`

### Page gradients (DS Phase 10)

**6 gradients full-page** disponibles en utility classes (`@layer utilities` dans `src/index.css`) **OU** via composition Tailwind native (les colors sont en `@theme` donc Tailwind v4 auto-génère `from-X`/`via-X`/`to-X`).

| Utility DS (canonique) | Équivalent Tailwind composé | Usage |
|---|---|---|
| `bg-gradient-page-ambient` | `bg-gradient-to-br from-primary-50 via-white to-accent-50` | Pages quotidiennes (Dashboard, Coaching, Journal) |
| `bg-gradient-page-ambient-warm` | `bg-gradient-to-br from-primary-50 via-white to-secondary-50` | Pages action/parcours |
| `bg-gradient-page-ambient-sun` | `bg-gradient-to-br from-secondary-50 via-white to-accent-50` | Pages réflexion/celebration |
| `bg-gradient-brand-deep` | `bg-gradient-to-r from-primary-950 to-primary-500` | Hero saturé, banner marketing (text-white) |
| `bg-gradient-soft-pastel` | `bg-gradient-to-br from-surface-cyan via-surface-mist to-surface-cream` | Pages éditoriales très douces, splash |
| `bg-gradient-soft-duo` | `bg-gradient-to-br from-surface-cyan to-surface-cream` | Card large feature 2-stops |

**Quand utiliser quelle approche** :
- ✅ **Utility class** pour les pages canoniques (`bg-gradient-page-ambient` lit "DS gradient")
- ✅ **Composition Tailwind** pour ad-hoc / variantes / on-the-fly (`bg-gradient-to-br from-primary-50 via-white to-accent-50`)

**Tokens couleur additionnels Phase 10** :
- `--color-primary-950: #164267` (deep navy — extension scale primary)
- `--color-surface-cyan: #f0f9ff`, `--color-surface-mist: #f8fbfd`, `--color-surface-cream: #fef3e2` (surface pastels)

### z-index (Tailwind v4 namespace `--z-index-*`)
| Token | Value | Usage |
|-------|-------|-------|
| `z-sticky` | 20 | Sticky headers, sticky search |
| `z-dropdown` | 30 | Menus déroulants |
| `z-overlay` | 40 | Scrim modal léger / backdrop sidebar |
| `z-modal` | 50 | Dialogs, sidebar drawer mobile |
| `z-toast` | 60 | Toasts (au-dessus des modals) |
| `z-tooltip` | 70 | Tooltips (le plus haut) |

### Opacity sémantique
`/faint` (5%) · `/soft` (10%) · `/tinted` (15%) · `/medium` (30%) · `/disabled` (50%) · `/overlay` (70%)

→ Utiliser via `bg-primary-500/medium`, `text-white/85`, etc.

### Motion
**Duration** : `duration-fast` (150ms) · `duration-base` (200ms — DEFAULT) · `duration-slow` (300ms) · `duration-glacial` (600ms)
**Easing** : `ease-standard` (DEFAULT) · `ease-decelerate` (entrées) · `ease-accelerate` (sorties) · `ease-emphasis` (overshoot)

---

## 3. Taxonomie des composants (13 catégories rules-based)

Cf. `src/pages/Components.tsx` pour le showcase live.

```
1.  🏛️ FOUNDATIONS         tokens + layout primitives (EditorialLayout, FormLayout)
2.  🧱 ATOMS               1 fichier = 1 élément UI indivisible
                          → Form fields · Surfaces · Identity · Status badges · Chips/Pills · Indicators · Decoration
3.  🔗 COMPOSITES          group wrappers (AvatarGroup, MetaPillGroup, Tabs, Stepper)
4.  📰 HEADERS & SECTIONS  hero · page headers · section headers · section wrappers
                          → Heroes (HeroSection / EditorialHero) — PageHeader / HeaderNav
                          → SectionHeader (5×4×5) — SectionCard
5.  💬 FEEDBACK            Alert · Toast · EmptyState · Celebration
6.  🧭 NAVIGATION          Sidebar · DropdownMenu · Breadcrumb · Tabs · Search
                          → Primary nav (app shell) · Contextual menus · Secondary nav · Search
7.  🗂️ CARDS              Single-content cards · KPI · Communication · Learning · Editorial · Domain
8.  📋 LISTS & FEEDS       Grids · Feeds chronological · Lists vertical · Tables
9.  📝 FORMS               Composite forms (MultiStepForm, FormLayout, SearchWithFilters)
10. 🎓 LEARNING            TLS-specific gamification (Medal, Achievement, Quiz, Flashcard, CompetencyMatrix)
11. 🪟 MODALS              Base + Booking flow + Confirm/Status + Celebrations + Media
12. 🔐 AUTH FAMILY         AuthShell + 12 sub-components (glass-dark spec)
13. 📄 PAGES & TEMPLATES   Route-level previews
```

### Règles d'inclusion (test simple)

| Question | Catégorie |
|----------|-----------|
| Élément UI indivisible ? | **Atoms** |
| Group wrapper de plusieurs atomes ? | **Composites** |
| Hero / titre / divider structure ? | **Headers & Sections** |
| Card présentant UN contenu spécifique ? | **Cards** |
| Collection ordonnée d'items ? | **Lists & Feeds** |
| Navigation entre pages / sections ? | **Navigation** |
| Notification / alerte / feedback ? | **Feedback** |
| Overlay modal/dialog ? | **Modals** |
| Gamification/quiz/badge pédagogique TLS ? | **Learning** |
| Form composite (multi-step) ? | **Forms** |
| Glass-dark AuthShell family ? | **Auth Family** |

---

## 4. Patterns canoniques

### Hero family (2 patterns complémentaires)

| Pattern | Variants | Cas d'usage |
|---------|----------|-------------|
| **`HeroSection`** | 4 variants (gradient / glass / minimal / media) × 5 tones × 3 sizes | Hero **actionnable** : KPI grid + back btn + progress + CTA — LearningPathDetail, Coaching |
| **`EditorialHero`** | 4 tones (default / brand / warm / sun) | Hero **éditorial** : eyebrow + h1 + summary + trailing slot libre — Dashboard, Journal, LearningPaths, articles, auth |

### Card variants (1 composant unifié `<Card>`)

12 variants natifs (plus de `GlassCard` / `SurfaceCard` / `ToneAwareCard` deprecated) :

| variant | Style | Cas d'usage |
|---------|-------|-------------|
| `default` | white + ink-200 border | Standard |
| `feature` | shadow-md + no border | Mis en avant |
| `elevated` | shadow-lg | Drop shadow important |
| `interactive` | hover lift | Clickable |
| `glass` / `glass-brand` / `glass-warm` / `glass-dark` | Frosted blur | Auth / hero overlays |
| `tinted` (requires `tone` prop) | Gradient {tone}-50 → 100 | **ParcoursCard, learning hubs** |
| `minimal` / `bordered` / `muted` / `sunken` | Variations subtiles | Selon contexte |

### Apple Messages bubble (chat-style)
- `PromptCard` (Dashboard), `JournalEntryCard` (Journal), `NotificationCard` (à créer)
- Pattern : `rounded-3xl bg-white !overflow-visible` + speech tail `<span class="absolute -bottom-2 right-8 w-5 h-5 rotate-45 rounded-br-[6px] bg-white">` + `filter:drop-shadow(...)` pour silhouette unifiée

### Tone-classes helper (extracted Phase 10)
6 maps partagées dans `src/lib/tone-classes.ts` : `TONE_TEXT`, `TONE_BG_50`, `TONE_BORDER_200`, `TONE_BG_500`, `TONE_BORDER_500`, `TONE_HERO_GRADIENT`. Utilisées par LearningPathDetail, Coaching, Profile, Notifications, Veille (6+ pages).

### Variants vs className overrides — règle d'arbitrage ⭐⭐

**Règle générale Phase 10** : si une combinaison de styles est **réutilisable** sur 2+ instances → en faire un **variant typé** sur le composant. Sinon, `className` override est ok pour cas one-off.

**Pourquoi pas tout en variants** :
- Type-safe (TS empêche typos)
- Centralisé (1 endroit pour tuner les couleurs/effets)
- Pas de `!important` qui pollue le markup
- Découplage : la page ne connait pas les détails Tailwind, elle déclare l'intention

**Exemples concrets** :
- ✅ `<Card surface="tinted" tone="brand">` — surface variants (4 valeurs réutilisées sur Card, IconFeatureCard, SessionCard, etc.)
- ✅ `<Button variant="glass-light">` — variant glass pour fond light tinted (utilisé EntryCard, SessionCard footer, et tous les patterns avec surface tinted)
- ❌ `<Button className="!bg-white/70 !backdrop-blur-glass-light !border-white/70 ...">` — surcharge inline = signal qu'il faut un variant

### Button — paire de glass variants par contexte de fond

| Variant | Surface compatible | Style |
|---|---|---|
| `glass` | **DARK** (hero brand gradient, auth glass-dark) | `bg-white/20 + text-white` |
| `glass-light` | **LIGHT tinted** (Card surface=tinted, EntryCard, SessionCard) | `bg-white/70 + text-ink-900` (filled frosted) |
| `glass-light-ghost` | **LIGHT tinted** (action secondary) | `bg-white/40 + text-ink-800` (translucide) |

→ Couplage explicite : pour un fond DARK utilise `glass`, pour un fond LIGHT tinted utilise la paire `glass-light` + `glass-light-ghost`. Ces variants sont DS-level, **pas** des className overrides par page.

### Card surfaces & interaction effects — DS convention Phase 10 ⭐⭐

**Règle architecturale** : tout pattern qui rend une **card** dans le DS (IconFeatureCard, ProfileCard, ActionCard, KPICard, StatCard, LessonCard, ArticleCard, CourseCard, ParcoursCard, NotificationCard, etc.) DOIT exposer **2 axes de variants** standardisés :

#### Axe 1 — `surface` (4 variants — fond/blur/border)

| `surface` | Fond | Border | Usage |
|---|---|---|---|
| **`card`** (default) | `bg-white` | `border border-ink-200` | Surface neutre standard |
| **`tinted`** (tone-aware) | `bg-{tone}-50/60` | `border border-{tone}-100` | Section thématique tone-cohérente |
| **`glass`** | `bg-white/60` + `backdrop-blur-glass-light` | `border border-white/60` | Overlay sur fond coloré (hero, gradient) |
| **`frosted`** | `bg-white/40` + `backdrop-blur-glass-medium` + `shadow-sm` | `border border-white/50` | Overlay prononcé (cover image, blob ambient) |

#### Axe 2 — `elevation` / interaction state (hover/active)

| State | Effet visuel | Quand |
|---|---|---|
| **Default** | shadow-xs ou aucune | Cards passives, statiques |
| **Hover** (cards interactives) | `hover:shadow-md hover:-translate-y-1` + `hover:border-{tone}-200` (tone-tinted hover border) | Cards cliquables (avec onClick / `<a>` / `<Link>`) |
| **Active** | `active:shadow-sm active:translate-y-0` (annule lift) | Pressed state |
| **Focus** | `focus-visible:outline-2 focus-visible:outline-{tone}-500` | Keyboard nav, a11y |
| **Disabled** | `opacity-disabled cursor-not-allowed hover:shadow-none hover:translate-y-0` | États inactifs |
| **Selected** (opt) | `border-2 border-{tone}-500 shadow-md ring-2 ring-{tone}-100` | Selection state (radio cards, multi-select) |

#### Pattern d'implémentation canonique

```tsx
// 1. Surface classes
const SURFACE_CARD = 'bg-white border border-ink-200 hover:border-ink-300';
const SURFACE_TINTED: Record<Tone, string> = {
  brand: 'bg-primary-50/60 border border-primary-100 hover:border-primary-200',
  warm:  'bg-secondary-50/60 border border-secondary-100 hover:border-secondary-200',
  sun:   'bg-accent-50/60 border border-accent-100 hover:border-accent-200',
};
const SURFACE_GLASS = 'bg-white/60 backdrop-blur-glass-light border border-white/60 hover:bg-white/75';
const SURFACE_FROSTED = 'bg-white/40 backdrop-blur-glass-medium border border-white/50 shadow-sm hover:bg-white/55';

// 2. Interaction classes (appliquées si onClick / interactive)
const INTERACTIVE_BASE = 'cursor-pointer transition-all duration-base hover:shadow-md hover:-translate-y-1 active:shadow-sm active:translate-y-0';
const FOCUS: Record<Tone, string> = {
  brand: 'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500',
  warm:  'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-secondary-400',
  sun:   'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-500',
};
const DISABLED = 'disabled:opacity-disabled disabled:cursor-not-allowed disabled:hover:shadow-none disabled:hover:translate-y-0';

// 3. Compose dans le composant
function getCardClasses({ surface, tone, interactive, disabled }) {
  return [
    'rounded-2xl', // base radius
    surface === 'tinted' ? SURFACE_TINTED[tone] : SURFACES[surface],
    interactive && INTERACTIVE_BASE,
    interactive && FOCUS[tone],
    disabled && DISABLED,
  ].filter(Boolean).join(' ');
}
```

#### Pourquoi cette convention ?

1. **Cohérence app-wide** : un user voit le même langage visuel sur toutes les cards (Profile, Veille, Notifications, etc.).
2. **Réutilisation** : la MÊME card s'adapte à (a) page fond blanc → `card`, (b) section tone-thématique → `tinted`, (c) overlay hero → `glass`, (d) cover image → `frosted` — sans dupliquer le composant.
3. **DX prédictible** : un dev qui connaît IconFeatureCard sait coder ProfileCard, KPICard, etc.
4. **Maintenance centralisée** : on tune `SURFACE_GLASS` une fois → tous les composants l'héritent.

#### Audit Phase 10 — état actuel des card patterns

| Composant | Path | `surface` prop | Notes |
|---|---|---|---|
| ✅ `IconFeatureCard` | `ui/` | **OUI** (4 variants) | Référence canonique de l'implémentation |
| ✅ `Card` (générique) | `core/` | **OUI** (12 variants natifs : glass / glass-brand / glass-warm / glass-dark / tinted / etc.) | Le composant de base — surface gérée via prop `variant` |
| ✅ `ParcoursCard` | `patterns/` | Partiel (tinted via Card) | Utilise `Card variant="tinted" tone={tone}` |
| ⏳ `ProfileCard` | `ui/` | **NON** | À étendre Phase 10 (touché lors du rework Profile/Coaching) |
| ⏳ `ActionCard` | `ui/` | **NON** | À étendre Phase 10 |
| ⏳ `StatCard` | `ui/` | **NON** | À étendre Phase 10 (Profile) |
| ⏳ `LessonCard` | `learning/` | **NON** | À étendre Phase 10 (LearningPath) |
| ⏳ `ArticleCard` | `learning/` | **NON** | À étendre Phase 10 (Magazine/Veille) |
| ⏳ `QuickActionButton` | `ui/` | NON (mais `tone` only) | Compact horizontal — `surface` peut être limité à `card` + `tinted` |
| ⏳ `NotificationCard` | à créer | **OUI dès création** | Pattern chat-bubble (cf. PromptCard/EntryCard) |

> **Note pour chat-bubble cards** (`PromptCard`, `EntryCard`, futur `NotificationCard`) : leur signature visuelle (rounded-3xl avec tail) ne se prête pas à `glass`/`frosted`. Restreindre à `card` + `tinted` uniquement.

> **Note pour Card générique** : déjà 12 variants. Les patterns spécialisés (ProfileCard, etc.) peuvent **wrapper** `<Card variant="X">` au lieu de réimplémenter les surfaces. Pattern recommandé pour minimiser la duplication.

### Couleurs "soft" pour icônes & headings — rule Phase 10
Pour les icônes / chevrons / labels tone-aware sur surfaces claires, utiliser les shades **moyennes** (pas les 600/700 trop foncées qui jurent surtout pour le jaune) :
- `brand` → `text-primary-500` (#55A1B4)
- `warm` → `text-secondary-500` (#ED843A)
- `sun` → `text-accent-400` (#F8B044 — TLS Yellow Base canonique)

Les shades 600/700 restent OK pour : (a) texte body sur fond très clair (contraste WCAG AA), (b) chevrons sur fond tinted-50 (besoin de contraste).

### Aspect ratio responsive — pattern `square` + grid bornée ⭐

**Règle Phase 10** : pour les cards avec `aspect-square` (button-shaped tiles), la grid parent DOIT borner le nombre de colonnes (min 2, max 4) pour éviter les deux extrêmes. Utiliser `<CardGrid layout="square-tiles">` :

```tsx
// ✅ PATTERN CANONIQUE — utiliser CardGrid avec layout="square-tiles"
import { CardGrid } from '@/components/patterns/CardGrid';

<CardGrid layout="square-tiles" gapSize="md">
  <IconFeatureCard square ... />
  <IconFeatureCard square ... />
</CardGrid>

// Équivalent en classes directes (si pas d'accès au wrapper) :
<div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-stack-lg">
  <IconFeatureCard square ... />
</div>
```

### `<CardGrid>` — layouts cross-cutting par type de card

`CardGrid` expose 5 layouts. **Choisir selon le type de card hébergée :**

| `layout` | Cols (mobile / tablet / desktop) | Cards compatibles | Pourquoi |
|---|---|---|---|
| `compact` | 2 / 2 / 2 | Dense tiles courtes (rare) | Sticky 2-col |
| `default` | 1 / 2 / 3 | **Cards non-square** avec contenu variable : `ProfileCard`, `ActionCard`, `LessonCard`, `SessionCard` | DEFAULT |
| `feature` | 1 / 2 / 4 | **Cards non-square** pour catalogue dense : `ArticleCard`, `CourseCard`, `VeilleCard` | Catalogue |
| **`square-tiles`** ⭐ | **2 / 3 / 4** | **Cards SQUARE** : `IconFeatureCard square`, `KPICard square`, `StatCard square` | **JAMAIS 1-col** |
| `tiles` | 2 / 3 / 3 | Mini-cards non-square : `QuickActionButton`, `MetaPill` groups, mini-stats | Compact |

⚠️ **Anti-pattern** : utiliser `layout="default"` ou `"feature"` avec une card `square` → en single-col mobile, la card prend toute la largeur et `aspect-square` la force à 600px de haut = **carré géant cassé** (bug Phase 10).

Résultat :
- Mobile (< 640px) : **2 cols** → cards ~150×150 px
- Tablet (640–1024px) : **3 cols** → cards ~180×180 px
- Desktop (≥ 1024px) : **4 cols** → cards ~200×200 px

Cards toujours dans la fenêtre 150–220px. Pas de géants, pas de timbres.

#### ❌ À éviter
- **`grid-cols-1 md:grid-cols-X`** → en single-col mobile, la card prend toute la largeur (~600px) et `aspect-square` la force à 600px de haut = **carré géant pleine page**. L'icône 48px paraît minuscule au centre d'un trou blanc.
- **`grid-cols-[repeat(auto-fit,minmax(140px,1fr))]`** trop serré → peut aller jusqu'à 8+ cols sur écran large (cards trop petites). À réserver aux cas dense tiles sans `square`.

#### Cas particuliers
- **Comparaison stricte de variants** (showcase) : `grid-cols-3` fixe → toujours 3 cards côte à côte pour comparaison visuelle
- **Auto-fit borné min ET max** : `grid-cols-[repeat(auto-fit,minmax(160px,200px))] justify-center` → cards plafonnées à 200px max + centrées si reste d'espace

### Alignement cross-card dans une grid
Pour que **icon, title et description soient alignés horizontalement entre toutes les cards d'une row** (peu importe que certaines aient description et d'autres non) :

1. **Top-anchored layout** (`justify-start` sur le flex-col card)
   - Évite `justify-center` qui shift l'icône selon la hauteur du contenu
2. **Fixed icon zone** (`min-h` selon iconSize) sur le wrapper icon
   - Garantit que bubble (64px) et plain (40px) prennent la même hauteur de zone → title à la même Y
3. **Grid items-stretch** (default) sur le parent
   - Toutes les cards prennent la hauteur de la plus haute → bottoms alignés

Implémenté dans `IconFeatureCard.tsx` (BASE = `justify-start`, ICON_ZONE map).

---

## 5. Pièges connus (12 documentés)

Cf. `CLAUDE.md` section "Pièges connus à vérifier systématiquement" pour le détail complet.

| # | Piège | Fix |
|---|-------|-----|
| 1 | Collisions classes CSS BEM vs Tailwind | `@import './X.css' layer(components);` |
| 2 | Custom shadows Tailwind v4 en @theme | Classes manuelles dans `@layer utilities` |
| 3 | Tokens identiques @theme + design-tokens.css | Vérifier `getComputedStyle()` |
| 4 | CSS importés sans `@layer` | Auditer tous les imports de globals.css |
| 5 | Sélecteurs globaux `:focus-visible` non layered | Wrapper dans `@layer base` |
| 6 | Border color split BASE vs STATUS | Mettre dans STATUS_CLASSES.default |
| 7 | `sr-only` sur `<input>` sans ancêtre `position: relative` | Ajouter `relative` sur label |
| **8** ⭐ | Global `[role="button"]` rule impose `height:40px` + `font-weight:600` + `align-items:center` + `overflow:hidden` | **Card.tsx BASE neutralise 3 props** : `[&[role=button]]:h-auto + font-normal + items-stretch` |
| 9 | Tailwind v4 `translate` vs `transform` des keyframes | Pas mélanger `translate-*` et keyframe transform |
| 10 | `components-modern.css` impose `height: var(--input-height)` sur textarea/select | `h-auto min-h-[X]` override |
| 11 | (reserved) | — |
| 12 | Double-spacing trap (composant + parent gap) | Pas de `mb-*` sur wrapper externe |

### Pièges récents Phase 10 (non encore documentés dans CLAUDE.md)

- **`overflow-x-hidden` force `overflow-y:auto`** (CSS spec) → utiliser `[overflow-x:clip]` à la place
- **Tailwind v4 z-index** : `--z-{name}` ne génère pas d'utility → utiliser `--z-index-{name}` namespace
- **Lucide-react `Linkedin` / `Twitter`** : pas exportés dans cette version → utiliser `ExternalLink` en fallback générique

---

## 6. Workflow de migration (par page)

Cf. `MIGRATION-PLAN.md` Phase 10 pour le détail.

```
1. Audit (10 min)    — sections, UX issues, patterns cibles
2. Décision (5 min)  — REUSE / EXTEND / ADAPT / CREATE
3. Implémentation    — bottom-up, semantic tokens, patterns canoniques
4. Vérification      — npx tsc --noEmit · preview mobile/desktop · DOM audit · a11y
5. Showcase update   — Components.tsx entries, usedBy, retirer showcaseOnly si activé
```

### Checklist pré-commit
- ✅ `npx tsc --noEmit` → 0 erreurs
- ✅ Pas de classes BEM `tls-*` (sauf justifié dans tls-components.css)
- ✅ Pas de `var(--tls-*)` dans `style={{}}`
- ✅ Semantic spacing utilisé (`gap-stack`, `gap-section`, etc.)
- ✅ Au moins 1 pattern DS activé (sauf si tout déjà natif)
- ✅ Screenshots mobile + desktop validés
- ✅ Console errors = 0
- ✅ Showcase Components.tsx mis à jour

---

## 7. Familles de composants — décisions rationalisation

### Badge — `Badge.tsx` est le fichier canonique
3 exports publics : `Badge` (text status), `StatusBadge` (lesson state), `TrendingBadge` (gradient promo). Les fichiers séparés sont de thin re-exports.

### Breadcrumb — `ui/Breadcrumb.tsx` est le fichier canonique
`variant: 'simple' | 'nav'`. Utiliser `<Breadcrumb variant="nav">` pour les nouveaux usages.

### Pills — 5 composants distincts (garder séparés)
- `Pill` — glass/surface chip (children: ReactNode)
- `MetaPill` — metadata chip avec tone (text: string)
- `MetaPillGroup` — layout wrapper
- `Tag` — removable filter chip
- `FilterChip` — toggle interactif

### Card — `Card.tsx` est le SEUL fichier (12 variants)
Tous les wrappers deprecated supprimés (GlassCard, SurfaceCard, ToneAwareCard, KPICard).

### Hero — 2 patterns canoniques uniquement
- `HeroSection` (actionnable, structured)
- `EditorialHero` (text-focused, editorial)

DashboardHero et LearningPathHeader sont supprimés (étaient alias deprecated).

### Navigation — DropdownMenu canonique avec a11y complete
Keyboard nav (Arrow/Home/End) + Escape + auto-focus + focus return. Cf. `ui/DropdownMenu.tsx`.

### Sidebar — Width responsive, hover-peek, count max
- `w-[220px]` md / `w-[260px]` lg
- NavItem count > 99 → "99+"
- Hover-peek hamburger 200ms / auto-close 400ms

---

## 8. Pages catalog (Tier 1/2/3 — Phase 10)

| Tier | Pages | Statut |
|------|-------|--------|
| **Tier 1** (daily-use) | Dashboard, Journal, LearningPaths, LearningPathDetail, Coaching, Profile, Notifications, Veille, LessonPlayer | 5/9 done (Dashboard, Journal, LearningPaths, LearningPathDetail, Coaching) |
| **Tier 2** (secondary) | Account, Leaderboard, Help, JournalDetail, JournalFreeEntry, JournalNewEntry, Magazine, VeilleContent, Dossier, Collaboration, Messages, WeeklyNewsletter, Onboarding, LearningSpace, Enterprise, PreCoachingQuestionnaire, CoachingCompteRendu (17) | ⬜ Pending |
| **Tier 3** (edge cases) | AstucesViewer, FlashcardsViewer, VideoReels, VideoTutorial, VideoViewer, ComplementaryContentViewer, CourseDetail, Error404, Error500 | ⬜ Pending (audit only) |

---

## 9. AI assistant guidelines

Quand un assistant IA travaille sur ce projet :

1. **Toujours lire `CLAUDE.md`** en priorité pour les règles strictes
2. **Toujours utiliser semantic spacing** (`gap-stack`, jamais `gap-4`)
3. **Toujours utiliser tokens** (`bg-primary-500`, jamais `#55A1B4`)
4. **Toujours valider TS** : `npx tsc --noEmit` après chaque change
5. **Toujours vérifier la cascade CSS** pour éviter le piège #8 (`[role="button"]` global rule)
6. **Toujours screenshot mobile + desktop** pour valider les changements
7. **Pas de nouveaux fichiers CSS** : tout passe par `@theme` + classes Tailwind
8. **Pas de classes BEM nouvelles** : tls-components.css est en cours de phase-out
9. **Pas de `style={{}}`** sauf valeurs runtime (`width: ${pct}%`) ou radial gradients complexes
10. **Updater Components.tsx showcase** quand un composant change ou est ajouté

---

**Dernière mise à jour :** 2026-05-12
**Phase actuelle :** 10 (Holistic UX/UI rework)
**Maintenance :** mettre à jour cette doc à chaque migration de page Tier 1.
