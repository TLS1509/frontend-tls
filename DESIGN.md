# 🎨 DESIGN.md — The Learning Society Design System

> **Purpose** : Reference opérationnelle du DS — process Notion sync, tokens techniques, taxonomie, patterns, pièges, workflow migration. Pour dev, designer, PM, et IA assistants.
>
> **🧭 Source stratégique** : [`PRODUCT.md`](./PRODUCT.md) — North Star "Augmented Mastery", mechanism (practice as verb), doctrine (AI augments, never substitutes), users by role, cadence reality, voice rules. **À lire en premier.**
>
> **🎨 Source design system canonique** : [`DESIGN-IMPECCABLE.md`](./DESIGN-IMPECCABLE.md) — Spec YAML Stitch (palette/typo/tokens), Per-Altitude rules, Practice Grammar, AI Transparency Kit, Cadence Patterns, Per-Flow Tone Mapping. **Source de vérité visuelle.**
>
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

### Pages manquantes — état revérifié le 2026-07-22

Les 6 fichiers existent tous désormais. **Mais trois ne sont pas montés sur la
route annoncée ici** — ce tableau liste des routes, pas des fichiers, et c'est
la route qui compte pour l'utilisateur.

| # | Page | Route prévue | État réel (vérifié dans `src/App.tsx`) |
|---|---|---|---|
| P1 | Recherche | `/search` | ⚠️ Fichier + export présents, **aucune route** — page inatteignable |
| P2 | MagicLink | `/auth/magic-link` | ✅ montée (L634) |
| P3 | VerifyEmail | `/auth/verify-email` | ✅ montée (L633) |
| P4 | SubscriptionPayment | `/subscription/payment` | ⚠️ montée sur **`/onboarding/payment`** (L641) |
| P5 | Billing | `/account/billing` | ✅ montée (L694) |
| P6 | Positionnement | `/onboarding/positionnement` | ⚠️ montée sur **`/learning-paths/:id/positionnement`** (L662) |

Ceci fait avancer — sans le clore — le finding **X4** de
`docs/_canon/AUDIT-COHERENCE.md`, ouvert depuis le 2026-06-10.

**Décisions à prendre** (aucune n'est purement documentaire) :
1. `Recherche` : la router, ou l'assumer comme abandonnée et supprimer le fichier.
2. `SubscriptionPayment` et `Positionnement` : les routes réelles sont-elles les
   bonnes ? Si oui, corriger ce tableau ; sinon, corriger le routage.
3. Puis seulement : passer `Disponible sur l'app` → `YES` dans la base Notion
   Écrans, pour les pages réellement atteignables.
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

> **Source amont** : [`PRODUCT.md`](./PRODUCT.md) §Design Principles définit les 6 principes stratégiques. [`DESIGN-IMPECCABLE.md`](./DESIGN-IMPECCABLE.md) §6-§10 les opérationnalise visuellement (Per-Altitude / Practice Grammar / AI Kit / Cadence / Tone Mapping).

### Les 6 principes Augmented Mastery (rappel)

1. **L'apprenant est protagoniste — toujours.** Chaque écran apprenant répond à « quelle est mon action maintenant ? » en moins de 3 secondes. Hiérarchie : action du jour en hero, historique secondaire, analytics tertiaire. Aucun écran ne sert deux rôles à la fois.
2. **L'IA est instrument transparent, jamais spectacle.** Label « IA » visible, source citée, score de confiance affiché, bouton override accessible. Aucun purple-gradient « intelligence », aucune sparkle iconography. Voir DESIGN-IMPECCABLE.md §8.
3. **Une altitude par viewport.** Strategic (CLO/manager) OU Operational (coach/apprenant) — jamais les deux dans la même surface. Voir DESIGN-IMPECCABLE.md §6.
4. **Pratique validée > complétion de contenu.** Hiérarchie visuelle privilégie JAC, FAST, EDRA, projet validé. Les progress bars de cours sont secondaires. Le Passeport est source de vérité, pas le taux de complétion.
5. **Cadence hebdomadaire respectée.** Pas de streak punitif quotidien. Pas de notification weekend par défaut. Dashboard ouvre sur l'action du jour. Pause-reprise first-class. Atrophie signalée calmement, jamais en rouge alerte. Voir DESIGN-IMPECCABLE.md §9.
6. **Warmth as moat.** Le default catégorie est froid (LMS Enterprise) ou cold-clever (AI SaaS). TLS gagne en étant warm ET rigoureux. Chaque token, chaque pairing typo, chaque copy choice signale le respect de l'humain qui pratique.

### Practice grammar — le langage

Verbes approuvés : *reprends*, *valide*, *soumets*, *maîtrise*, *pratique*, *réfléchis*.
Verbes interdits : ❌ *visionne*, *termine*, *complète*, *suis*, *consomme*.

Voir DESIGN-IMPECCABLE.md §7 pour la matrice complète + voice (tu/vous).

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
| ~~`--text-heading-1…5`~~ | — | — | — | **Supprimés le 2026-07-23** : superseded par `--text-h1…h5`, zéro usage dans `src/` |
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
- `--color-surface-cyan: #f0f9ff`, `--color-surface-mist: #f8fbfd`, `--color-surface-cream: #fefaf5` (surface pastels — cream adouci, était `#fef3e2` jugé trop orangé)

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

### Maturité des patterns (Phase 14 baseline — 2026-05-15)

Pré-Phase 14 audit : on classe chaque pattern existant en **Stable** (API verrouillée, 3+ pages consommatrices, Tailwind validé — ne pas modifier sans RFC) ou **À faire évoluer** (utilisé <3 fois OU API en exploration — peut bouger pendant Phase 14).

| Statut | Patterns |
|--------|----------|
| **🟢 Stable** | `Badge` · `Card` (12 variants) · `Button` · `Input` · `Select` · `EditorialHero` · `HeroSection` · `AuthShell` · `SectionHeader` · `EditorialLayout` · `SectionCard` · `RelatedItemList` · `ResumeLessonCard` · `IconFeatureCard` · `ParcoursCard` · `CardGrid` · `MetaPill` · `Pill` · `Tag` · `FilterChip` · `Breadcrumb` · `ProgressBar` · `Avatar` · `Alert` · `Modal` |
| **🟡 À faire évoluer** | `ActivityFeed` (timeline pattern à mûrir) · `PromptCard` / `JournalEntryCard` (chat-bubble — API à unifier sous `NotificationCard` quand Phase 14.8 Social arrive) · `TimelineItem` (utilisé seul) · `ProfileCard` · `ActionCard` · `StatCard` · `LessonCard` · `ArticleCard` (les 5 doivent recevoir `surface`+`elevation` props — voir Phase 10 audit ci-dessous) |
| **🆕 Phase 14.1** | `OptionGrid` · `DreyfusLevelSelector` · `CongratulationsCard` · `NextStepsGrid` · `EmptyDashboardState` — nouveaux patterns introduits pour le flow Première expérience. Stable après usage 14.1, mais APIs encore ouvertes aux ajustements pendant Phase 14. |
| **🆕 Phase 14.2a** | `ProgressDots` (atom) · `LessonNavigation` (footer molecule) · `LessonContext`/`useLessonContext` (lib) · `ViewerHeader` étendu (tone + progress + touch-sized). Patterns à généraliser à tous les viewers en 14.2b. |

**Règle Phase 14** : si un flow révèle qu'un pattern Stable doit changer son API, ouvrir une discussion explicite avant de modifier — pas de breaking changes en douce. Les patterns À faire évoluer peuvent être ajustés librement dans le flow qui les consomme, à condition de mettre à jour `usedBy` dans `Components.tsx` et Notion DS DB.

### Phase 14.1 — Première expérience patterns (2026-05-15)

5 patterns introduits pour le flow Onboarding → Questionnaire → Tutoriel → Success → Dashboard cold-start :

| Pattern | Path | Usage canonique |
|---------|------|------------------|
| `OptionGrid` | `patterns/` | Grille de sélection icon+label · single (`value: string`) ou multi (`value: string[]`) · 3 layouts (`icon-top` / `icon-left` / `text-only`) · 3 tones (`brand` / `warm` / `sun`) · responsive 2 → N cols. Remplace les `<button>` grids ad-hoc dans Onboarding (role/sector/goals/rythme). |
| `DreyfusLevelSelector` | `ui/` | Picker 5-niveaux Likert (Novice → Expert) tone-aware · responsive `1 → 2 → 3 → 5 cols` (fixe le pb cramped tablet `md:grid-cols-5` Phase 14.1). Levels customisables via prop. |
| `CongratulationsCard` | `patterns/` | Bloc célébration milestone : large icon + badge + heading + summary + XP reward optionnel. 4 tones (`brand` / `warm` / `sun` / `success`). Le tone = celui de la phase d'arrivée (souvent `brand` pour transition app). |
| `NextStepsGrid` | `patterns/` | Grille d'action cards "et maintenant ?" — icon tone-tinted + title + desc + CTA flèche. Tone **par-item** (mix brand/warm/sun pour varier les next paths). Responsive 1 → 3 cols. |
| `EmptyDashboardState` | `patterns/` | Variant cold-start Dashboard pour new users (`?firstTime=1` ou `!user.hasStartedParcours`). Welcome + NextStepsGrid 3 actions (parcours brand / coaching warm / passeport sun). |

**Helper partagé : `src/lib/onboarding-steps.ts`** — `buildOnboardingStepperItems(currentStepId)` retourne les `StepperItem[]` pour le Stepper persistant 4 étapes utilisé en haut de chaque écran du flow : `Profil → Positionnement → Tutoriel → Prêt`. Garantit que les 4 écrans partagent le même indicateur de progression sans copy-paste du state.

**Tone arc Phase 14.1** : `warm` (Onboarding / Questionnaire / Tutoriel — accueil chaleureux) → `brand` (Success / Dashboard — transition vers l'identité stable). Une seule transition de tone dans le flow ; pas plus de 2 tones simultanés.

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

### Phase 14 — API validation & fixes (2026-05-15) ✅

**Systématique Phase 14** : audit de tous les composites pour vérifier API props. Les mismatches les plus communs identifiés et fixés :

| Composant | Prop incorrecte | → Correct | Impact | Commits |
|-----------|-----------------|-----------|--------|---------|
| **EditorialHero** | `subtitle=` | `summary=` | 60+ pages | 14.6-14.11-14.14 |
| **EditorialHero** | `actions={<Button>}` | `trailing=` | 50+ pages | 14.6-14.9-14.11-14.14 |
| **EditorialHero** | `tone="primary"` / `"neutral"` | `tone="default"` | 30+ pages | 14.9-14.10-14.11-14.14 |
| **SectionCard** | `icon=` | `titleIcon=` | 40+ pages | 14.6-14.9 |
| **SectionCard** | `actions=` (header) | `headerAction=` | 15+ pages | 14.9-14.11 |
| **ProgressBar** | `tone=` | `fill=` | 25+ pages | 14.6-14.9-14.11 |
| **Tabs** | `tabs=/activeTab/onTabChange` | `items=/value/onChange` | 10+ pages | 14.9-14.11 |
| **Button** | `variant="glass-light-ghost"` | `variant="ghost"` | 3 pages | 14.6 |
| **Card** | `tone="neutral"` | remove | 3 pages | 14.15 |

**Lesson learned** : sans JSDoc complet sur chaque composant, les API props se fragmentent à travers l'app. Phase 15 va ajouter une checklist validation API dans Components.tsx showcase pour éviter futurs mismatches.

---

## 4. Patterns canoniques — Stability Status

### Pattern stability criteria (Phase 14+ validation)

| Status | Criteria | Action |
|--------|----------|--------|
| **Stable** ✅ | Used by 3+ pages · API locked · Tailwind validated · No breaking changes planned | Ready for integration in flows · Can be extended with new variants if needed |
| **To evolve** 🔄 | Used <3 times OR API in exploration OR Tailwind migration incomplete | Avoid wide adoption until stabilized · Single-owner pages OK · Document any planned changes |
| **Deprecated** ❌ | Superseded by newer pattern · 0 usage in real pages · Removed from showcase | Remove from codebase after Phase 14+ migration completes |

### Current Pattern Inventory (Phase 14+ baseline)

#### Stable ✅ (safe for wide adoption)

| Pattern | Path | Usage count | Status | Notes |
|---------|------|-------------|--------|-------|
| **Button** | `core/` | 80+ pages | ✅ Stable | 8 variants (primary/warm/secondary/ghost/glass/destructive/link) · 4 sizes · full Tailwind |
| **Card** | `core/` | 100+ pages | ✅ Stable | 12 surface variants · tone-aware · interaction effects locked |
| **Input** | `core/` | 30+ pages | ✅ Stable | Text/password/email/number · checkboxes/radio/switch · all form states |
| **Badge** | `ui/` | 60+ pages | ✅ Stable | 3 exports (Badge/StatusBadge/TrendingBadge) · all variants consolidated |
| **Avatar** | `ui/` | 25+ pages | ✅ Stable | AvatarGroup bundled · sizes/initials/image modes |
| **ProgressBar** | `ui/` | 20+ pages | ✅ Stable | Fill-based variants · tone-aware · inline/stacked layouts |
| **EditorialHero** | `patterns/` | 40+ pages | ✅ Stable | 4 tones (default/brand/warm/sun) · trailing slot fixed · summary prop name locked |
| **SectionCard** | `patterns/` | 30+ pages | ✅ Stable | Title/description/footer structure · tone color · titleIcon/headerAction slots |
| **EditorialLayout** | `patterns/` | 15+ pages | ✅ Stable | Main + sticky aside · mobile-first responsive |
| **ViewerHeader** | `patterns/` | 6+ pages | ✅ Stable | Sticky bar for viewer screens (back/title/prev-next/close) |
| **RelatedItemList** | `patterns/` | 8+ pages | ✅ Stable | Vertical link list · cross-links + related content |
| **AuthShell** | `patterns/` | 5+ pages | ✅ Stable | Split-screen auth layout + sub-components (AuthField, AuthPasswordField, AuthPrimaryButton, etc.) |
| **Tabs** | `ui/` | 10+ pages | ✅ Stable | Underline/pills variants · keyboard nav · items/value/onChange API |

#### To Evolve 🔄 (single-owner OK, avoid wide adoption until stabilized)

| Pattern | Path | Usage count | Plan | Notes |
|---------|------|-------------|------|-------|
| **PromptCard** | `cards/` | 2 pages (Dashboard, Notifications) | Consolidate with JournalEntryCard into "ChatBubbleCard" generic | Apple Messages bubble · same tail pattern |
| **JournalEntryCard** | `cards/` | 1 page (Journal) | Consolidate with PromptCard | Chat-bubble variant · needs reflection on tone-aware states |
| **NotificationCard** | `cards/` (to create) | 0 pages | Create in Phase 14.8 | Will inherit ChatBubbleCard pattern once consolidated |
| **CompetencyRadar** | `ui/` | 2 pages (Passeport, CoachDashboard) | Validate interaction (axis click) · add full a11y | D3/Visx-based · Phase 14.3 will lock API |
| **TimelineItem** | `learning/` | <3 pages | Extend with variant connectors · test cascade | Uses before: pseudo-element lines |
| **MetaPill** | `ui/` | 5+ pages | Stabilize after glass variants validated | Glass-light/glass-dark added Phase 14+ · finalize tone-aware |

#### Deprecated ❌ (remove post-Phase 14)

| Pattern | Replacement | Status |
|---------|------------|--------|
| `DashboardHero` | `EditorialHero` tone="brand" | Already unused |
| `LearningPathHeader` | `HeroSection` | Already unused |
| `GlassCard` | `Card` variant="glass" | Aliased, remove after Phase 14 |
| `SurfaceCard` | `Card` variant="elevated" | Aliased, remove after Phase 14 |
| `BreadcrumbNav` | `Breadcrumb` variant="nav" | Aliased, remove after Phase 14 |
| `ToneAwareCard` | `Card` variant="tinted" + tone prop | Aliased, remove after Phase 14 |

### Pattern stability rules for Phase 14+

**Rule 1 : No breaking API changes to Stable patterns during flows**
- If a Stable pattern needs new variant/tone → add without removing old
- If new use case needs API change → fork into new pattern or extend as optional prop

**Rule 2 : Document "To Evolve" status in showcase**
- Add comment at top of component: `// ⚠️ API in exploration — avoid wide adoption until Phase 14.X stabilizes`
- List known issues or planned changes
- Update when status changes to Stable

**Rule 3 : Deprecate transparently**
- Keep 1 commit window (~2 weeks) of re-export alias before deleting file
- Update showcase to show the replacement pattern
- Grep all usages before deletion commit

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

## 10. Phase 17-18 — UX Depth Pass & Store Wiring (2026-05-15+)

**Objectif** : Remplacer le mock statique par une vraie app réactive — pages lisent/écrivent maintenant depuis Zustand avec localStorage persistence.

### Pages wired Phase 17 ✅

| Page | Route | Store | Pattern clé |
|------|-------|-------|------------|
| CorrectionDetailLearner | `/coaching/corrections/:id` | useCoachingStore | Affiche correction détail + feedback coach; "Marquer comme lue" persiste via store |
| CoachEnterpriseDashboard | `/enterprise/coach` | useEnterpriseStore, useCoachingStore | Stats + roster live depuis stores; queue validation filtrée par status |
| PurchaseCredits | `/account/purchase-credits` | useUserProfileStore | Solde crédit live; purchase met à jour store et déclenche success alert |
| MessagingThread | `/coaching/messages/:coachId` | useCoachingStore | Coach name/initials résolus depuis sessions matched sur route param |
| PrivacyDeleteAccount | `/account/privacy/delete` | usePrivacyStore | Demande de suppression persiste; step defaults à 'done' si existant (survit refresh) |
| PrivacyDsar | `/account/privacy/dsar` | usePrivacyStore | DSAR requests live depuis store; nouvelle demande persiste immédiatement |

### Patterns clés Phase 17

1. **Seed-on-first-access** : store.getX() populé par MOCK_* au premier appel, puis persiste
2. **Live data binding** : appeler store.getX() directement dans render body (pas useState snapshot)
3. **Route param matching** : utiliser route params comme clés de sélection (ex. coachId) pour matcher les données du store
4. **Write persistence** : store.updateX / store.patch / store.addX déclenche automatiquement localStorage
5. **Local state pour UI only** : useState acceptable ONLY pour modal open/tab selected/form drafts

### Rules Phase 17

**Données domaine vs UI state :**
- **Domaine** (corrections, sessions, profil, DSAR) → Zustand + localStorage
- **UI only** (modal open, tab selected, form draft) → useState + memory

**Anti-patterns :**
- ❌ Importer MOCK_* directement dans la page (toujours via store.getX())
- ❌ useState pour des données qui devraient être dans le store
- ❌ Oublier localStorage check après store.patch()
- ❌ Fermer sans vérifier `npx tsc --noEmit`

### ComponentPreviewErrorBoundary — Phase 18.1

Nouveau error boundary dans `Components.tsx` pour capturer les exceptions lors du rendu des démos composants. Permet au showcase de rester stable même si une démo a un bug.

Chaque ComponentPreview entry wrap sa démo dans ce boundary pour éviter les cascades d'erreurs.

### Notion sync Phase 17-18

Après Phase 17-18 :
- Design System DB : mises à jour des composants utilisés dans les 6 pages
- Écrans DB : statut design = "Wired & Live" pour les 6 pages Phase 17
- Components.tsx entry : `usedBy` arrays mis à jour, `showcaseOnly` retiré pour composants activés

---

## §6 — Tone Usage by Cahier (Phase 16 Guidance)

### Tone Distribution Rules

Chaque cahier a un tone **dominant** (primary/warm/sun/brand/neutral) et optionnellement un **accent** tone. Respecter cette cohérence à travers tous les écrans du cahier pour renforcer l'identité visuelle.

| Cahier | Dominant | Accent | Rationale |
|--------|----------|--------|-----------|
| 01 Parcours | **primary** | warm (CTAs) | Leadership, structured learning |
| 01bis Veille | **warm** | sun (trending badges) | Engagement, content discovery |
| 02 Passeport | **primary** | sun (achievements) | Competence validation, growth |
| 03 Onboarding | **warm → brand arc** | (no third tone) | Tone arc Phase 14.1 : warm (Profil/Questionnaire/Tutoriel — accueil chaleureux) → brand (Success/Dashboard cold-start — transition vers l'identité stable). 1 transition de tone autorisée dans le flow. Voir L262 pour détail. |
| 04 Coaching | **warm** | primary (badges) | Relationship, personalized support |
| 05 Gamification | **sun** | primary (streaks) | Celebration, achievement focus |
| 06 Enterprise | **primary** | neutral (reports) | Authority, data-driven decisions |
| 07 Journal | **warm** | sun (reflections) | Introspection, milestone celebration |
| 08 Masterclass | **brand** | primary (featured) | Expert credibility, spotlight |
| 09 Notifications | **neutral** | primary/warm (type-based) | Clarity, actionability |
| 10 Analytics | **primary** | neutral (charts) | Data authority, insights |
| 11 Projects | **primary** | warm (milestones) | Goal tracking, progress |
| 11bis Subscriptions | **primary** | neutral (pricing) | Plan clarity, commitment |
| 12 Chatbot | **warm** | primary (responses) | Conversational, helpful |
| 12bis IA Features | **brand** | primary (IA badges) | Trust in automation, transparency |
| 13 Helpcenter | **neutral** | primary (CTAs) | Clarity, findability |
| 13bis Compliance | **primary** | neutral (checkmarks) | Trust, security assurance |

**Application**: Au niveau du composant, utiliser la prop `tone=` sur `EditorialHero`, `SectionHeader`, `Card`, `Badge`, etc. avec le tone dominant du cahier.

---

## §7 — Data Model Patterns by Cahier (Phase 16 Implementation)

### Reusable Entity Types

Plusieurs cahiers partagent des entités structurelles. Voici le pattern pour chaque type:

| Entity | Cahiers | Zustand Store | MOCK_* File | Pattern |
|--------|---------|---|---|---------|
| **User** (profile, avatar, tier) | 02, 03, 04, 06, 16 | `useUserProfileStore` | `MOCK_USERS` | Seed-on-first-access from store |
| **Competency** (name, Dreyfus, evidence) | 02, 05, 07, 11 | `useUserProfileStore` (subset) | `MOCK_COMPETENCIES` | Hierarchy stored as parent_id |
| **LearningPath** (items, progress) | 01, 02, 11 | `useLearningPathStore` | `MOCK_PATHS` | Polymorphic item types |
| **Item** (lesson, article, video, etc.) | 01, 01bis, 07, 12 | `useLearningPathStore` | `MOCK_ITEMS` | Type union (discriminator pattern) |
| **Badge** (achievement, criteria) | 05, 13bis | `useCoachingStore` (gamification subset) | `MOCK_BADGES` | Criteria enum-based |
| **CoachingSession** (booking, notes, corrections) | 04, 07 | `useCoachingStore` | `MOCK_SESSIONS` | Timestamps (scheduled, completed) |
| **JournalEntry** (draft/published, mood, tags) | 07, 12 | `useLearningPathStore` (subset) | `MOCK_ENTRIES` | Soft-delete via `published_at` null |
| **Notification** (type, read, channel) | 09 | `useUIStore` (transient) | `MOCK_NOTIFICATIONS` | Expiring after 30 days |
| **ConsentRecord** (explicit, timestamp, type) | 13bis | `usePrivacyStore` | `MOCK_CONSENTS` | Append-only, immutable |
| **AuditLog** (action, entity, actor, timestamp) | 13bis | `usePrivacyStore` | `MOCK_AUDIT_LOGS` | Append-only event log |
| **Organization** (name, credits, team_count) | 06, 11bis | `useEnterpriseStore` | `MOCK_ORGANIZATIONS` | Multi-tenancy scoping |
| **Team** (organization_id, members, manager) | 06 | `useEnterpriseStore` | `MOCK_TEAMS` | Hierarchical org structure |
| **Project** (type: Upskilling/STRIDE/Custom, tasks) | 11 | `useLearningPathStore` | `MOCK_PROJECTS` | Task list composition |
| **Subscription** (plan_tier, start_date, auto_renew) | 11bis | `useUserProfileStore` | `MOCK_SUBSCRIPTIONS` | Period-based (monthly/annual) |
| **ChatMessage** (thread_id, role: user/assistant, timestamp) | 12 | `useUIStore` (transient) or persistent | `MOCK_MESSAGES` | Chronological thread list |
| **HelpArticle** (slug, content, category, searchable) | 13 | Static / server-side | `MOCK_ARTICLES` | FULLTEXT search on content |

### Data Model Priorities (Phase 16 implementation order)

1. **Tier 1 (MUST implement for MVP)**:
   - User, Competency, LearningPath, Item, CoachingSession
   - Dependency: User first (identity), then others

2. **Tier 2 (SHOULD implement for Phase 16)**:
   - Badge, JournalEntry, Organization, Team, Project, Subscription, ConsentRecord
   - Dependency: After Tier 1

3. **Tier 3 (CAN defer Phase 17+)**:
   - Notification (transient, can be client-only initially)
   - ChatMessage, HelpArticle (can stub API calls Phase 16)
   - AuditLog (appended by listeners Phase 17+)

### Type File Organization (src/types/)

> ℹ️ **Section prescriptive, pas un inventaire** (vérifié le 2026-07-22). Elle
> décrit la convention visée. À ce jour, `src/types/learning.ts` et
> `src/types/projects.ts` existent ; `coaching.ts`, `journal.ts`,
> `compliance.ts` et `enterprise.ts` n'ont pas été créés, et côté données c'est
> `src/data/learningPaths.ts` (et non `learning.ts`). Ne pas lire cette liste
> comme l'état du dépôt.

Create one file per cahier module with its primary entities:

- `src/types/learning.ts` — LearningPath, Item, Competency (reused by multiple cahiers)
- `src/types/coaching.ts` — CoachingSession, Correction, Message
- `src/types/journal.ts` — JournalEntry, Comment, GuidedQuestion
- `src/types/compliance.ts` — ConsentRecord, AuditLog, DSAR
- `src/types/enterprise.ts` — Organization, Team, EnterpriseUser
- etc.

### MOCK_* File Organization (src/data/)

Parallel structure, one MOCK_* file per cahier for seeding:

- `src/data/learning.ts` — MOCK_PATHS, MOCK_ITEMS, MOCK_COMPETENCIES
- `src/data/coaching.ts` — MOCK_SESSIONS, MOCK_CORRECTIONS, MOCK_MESSAGES
- `src/data/journal.ts` — MOCK_ENTRIES, MOCK_COMMENTS
- `src/data/compliance.ts` — MOCK_CONSENTS, MOCK_AUDIT_LOGS
- etc.

**Pattern**: Store hook calls `MOCK_*` on first access (`seed-on-first-access` — see CLAUDE.md §Patterns Phase 17).

---

**Dernière vérification factuelle :** 2026-07-22 (tokens, chemins et comptes
revérifiés contre `src/index.css` et l'arborescence réelle).

**Phase en cours : voir [`CLAUDE.md`](./CLAUDE.md)** — c'est là que vit le suivi
des phases, et lui seul. Ce pied de page annonçait « Phase actuelle : 16 » alors
que CLAUDE.md documentait déjà les phases 17 à 23 et un audit du 2026-06-30 :
dupliquer le numéro ici garantit qu'il se périme. Ne pas le réintroduire.
