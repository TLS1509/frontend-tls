# Audit Figma ↔ Codebase — Pages Atoms & Composites

**Date** : 2026-07-03
**Méthode** : inspection de **première main** via `use_figma` (Plugin API) — chaque nombre ci-dessous provient d'un scan node-par-node, pas d'une estimation. Croisé avec l'inventaire du codebase (`src/components/core`, `ui`, `patterns`, `learning`, `cards`) lu par agents dédiés.
**Fichier Figma** : `LccBZ1GKWQVwVzPtsSzk5Y`
**Pages inspectées** : `🔵 03 · Atoms` (id `1095:2`) · `🟢 04 · Composites` (id `1122:2`)

> Conforme aux règles d'hygiène `CLAUDE.md` : node IDs cités, aucun % de conformance inventé. Les scans de binding comptent les `SOLID` fills/strokes bindés vs non-bindés à une Variable, les `TEXT` avec/sans `textStyleId`, les nodes avec effets avec/sans `effectStyleId`.

**Sync Notion Design System DB** : ✅ fait 2026-07-03 — entrées Card, Avatar, StatCard, Combobox, QualitativeRating mises à jour (Figma link vers le node exact, Has variants/Tone-aware corrigés, Notes détaillant les nouveaux variants). Data source `collection://75e8fbee-de5b-4f3a-892b-b703d5ee95bc`.

---

## 0. Scorecard

| Axe | Atoms | Composites |
|---|---|---|
| Component sets | **63** | **90** (+ 17 standalone components) |
| Sets 100 % bindés (fills/strokes/text/effects) | **59 / 63** | **50 / 90** (dont 20 en section LEGACY) |
| Couverture text-styles (prod, non-legacy) | 100 % | **1792 / 1800 = 99,6 %** |
| Sections numérotées complètes | ✅ **01→12** (08 créé cette session) | ✅ 01→25 (avec trous de numérotation historiques) |

**Verdict** : le binding token est déjà quasi-exhaustif. Les écarts sont (a) une poignée de fills/strokes blancs/gris non tokenisés, (b) des **axes de variants manquants** vs le codebase, (c) 2 composants "faibles" (QualitativeRating pas un vrai composant, Combobox sous-varié).

---

## 1. Correction structurelle appliquée cette session

- **§ 08 créé** sur la page Atoms (id nouveau `4534:1029`) : la page sautait de `§ 07 — Overlays & Feedback` à `§ 09 — Learning & Competency`. Nouvelle section **`§ 08 — Specialized Inputs`** clonée sur le pattern des autres (header + USAGE sidebar + rows), contenant **Combobox** (states closed/open) + **QualitativeRating** (étoiles). Sections 09→12 repositionnées en cascade. Atoms est désormais **01→12 sans trou**.
- **LearningItemCard** (Composites) : **16 fills** exact-match re-bindés aux Variables TLS (tints tone `primary/warm/sun/50`, accents `accent/500`, `secondary/600`, `primary/600`, `ink/50`). Couleur rendue identique, juste tokenisée.

---

## 2. ATOMS — Complétude des variants (Figma vs codebase)

✅ **Parfait match** : Badge, StatusBadge, TrendingBadge, Select, EmptyState, TlsLogo, Checkbox, Radio, Switch, Button (les 14 variants non-dépréciés présents ; `warm` + `brand-ghost` dépréciés correctement absents).

⚠️ **Axes manquants dans Figma** (le composant existe mais un axe de variant du codebase n'est pas représenté) :

| Composant | Figma a | Codebase a en plus | Sévérité |
|---|---|---|---|
| **Avatar** | shape, size, status | **`tint` : brand/warm/sun/ink** (tout l'axe tone-aware) | 🔴 Haute |
| **StatCard** | tone (4) | **`variant`** (default/elevated/warm/brand/sun) · **`surface`** (card/tinted/glass/frosted) · **`size`** (sm/md/lg) | 🔴 Haute |
| **ProgressBar** | fill, progress% | **`size`** (xs/sm/md/lg) · **`layout`** (stacked/inline) | 🟠 Moyenne |
| **Pill** | variant (3) | **`size`** (sm/md/lg) | 🟠 Moyenne |
| **MetaPill** | tone (7), clickable | tones **brand/glass/glass-dark** · **`size`** (sm/md/lg) | 🟠 Moyenne |
| **FilterChip** | active, variant | **`tone`** (primary/warm/sun/neutral) | 🟠 Moyenne |
| **Combobox** | state (closed/open) | **`size`** (sm/md/lg) · **`status`** (default/success/error) | 🟠 Moyenne |
| **Alert** | tone (4) | **`pattern`** (banner/inline) | 🟡 Basse |
| **Tooltip** | direction (4) | **`variant`** (default/brand) | 🟡 Basse |
| **Tag** | tone (5) | **`surface`** (default/glass) | 🟡 Basse |
| **Input** | size, status | **`surface`** (light/glass) | 🟡 Basse |
| **Spinner** | tone (brand/warm/inverse), size | tones **sun/muted** | 🟡 Basse |
| **Divider** | orientation, withLabel | **`spacing`** (sm/md/lg) | 🟡 Basse |

🔴 **QualitativeRating** : **n'est PAS un composant Figma** — seulement des frames statiques (étoiles) déplacées depuis le legacy vers § 08. Le codebase a `ui/QualitativeRating` (tone primary/warm/sun · size sm/md). À convertir en vrai Component Set si on veut la parité.

**Divergences de nommage** (cosmétique, mais crée du bruit au handoff) :
- Alert/Toast : codebase = prop `variant`, Figma = axe `tone`.
- ProgressBar : codebase `fill: brand`, Figma `fill: primary` (même couleur, nom différent).
- Card : codebase `tinted` + prop `tone`, Figma éclaté en `tinted-primary/warm/sun/brand`.

⚠️ **Card — size `xs` manquant** : Figma Card a `size: sm/md/lg`, le codebase a `xs/sm/md/lg`.

---

## 3. ATOMS — Couverture binding (variables + styles)

**59 / 63 sets = 100 % bindés.** Les 4 avec trous :

| Set | Fills non bindés | Strokes non bindés | Détail |
|---|---|---|---|
| **SearchWithSuggestions** | 13 | 1 | 12× blanc `#ffffff` + 1× `#f6f7f9` (near-white sans variable exacte) |
| **FilterChip** | 3 | 3 | 3× blanc `#ffffff` (fond chip actif) |
| **MetaPillGroup** | 1 | 1 | 1× `#fafaff` (near-white sans variable) |
| **Button** | 0 | 0 | fills/strokes/text 100 % ✅ — mais **24 effets sur 81 sans `effectStyleId`** (focus rings custom, hors Elevation styles) |

→ Fix rapide : les blancs `#ffffff` → `surface/default` (fond) ou `text/inverse` (texte). Les near-whites `#f6f7f9`/`#fafaff` n'ont pas de Variable exacte (candidats à un token `surface/subtle` si récurrents).

---

## 4. COMPOSITES — Complétude des variants (Figma vs codebase)

✅ **Match exemplaire** :
- **SectionHeader** — 5 variants (default/solid/minimal/accent/underline) × 4 sizes (xs/sm/md/lg) × 5 tones (primary/warm/sun/accent/neutral) = **exactement le codebase**. 28 variantes. 🏆
- **JournalEntryCard** (type guided/coaching/free/insight/learning), **NotificationCard** (tone + unread), **VideoCard**, **CardGrid** (5 layouts), **ErrorPage** (default/danger).

⚠️ **Axes manquants dans Figma** :

| Composant | Figma a | Codebase a en plus | Sévérité |
|---|---|---|---|
| **PromptCard** | variant brand/warm/sun | tones Badge-driven **info/neutral/success/danger** | 🟠 Moyenne |
| **LessonCard** | surface card/tinted/frosted/glass | surface **`outline`** | 🟡 Basse |
| **SessionCard** | surface card/tinted/glass/frosted | surface **`outline`** | 🟡 Basse |
| **ParcoursCard** | tone, status | **`cardVariant`** (tinted/outline) | 🟡 Basse |
| **PageHero / EditorialHero** | tone default/brand/warm/sun | tone **`flat`** | 🟡 Basse |

**Note taxonomie** : **Combobox** vit sur la page Composites (§ 07 — Filters & Navigation, id `Combobox` set) alors que le codebase le classe en `ui/` (atome). J'en ai placé une instance dans Atoms § 08. À décider : déplacer le Component Set vers Atoms, ou garder l'instance cross-page.

---

## 5. COMPOSITES — Couverture binding

**Texte : 1792 / 1800 stylés (99,6 %) en prod.** Sur 90 sets, 40 ont au moins un trou — mais **20 sont dans la section LEGACY** `🗄 LEGACY — §24 Form/Data/Dashboard (heights cassées · à trier)` (pattern récurrent : 1 fill + 1 stroke non bindés par set, artefact du conteneur — à traiter lors du tri de cette section).

**Prod (non-legacy) — trous réels notables :**

| Set | Fills NB | Strokes NB | Texte non stylé | Note |
|---|---|---|---|---|
| **LearningItemCard** | ~~36~~ → **20** | 0 | 0 | 16 corrigés cette session ; **20 gris d'état "verrouillé" restants** (voir §6) |
| **LessonCard** | 3 | 3 | 0 | fonds/bordures tone à tokeniser |
| **FlipCard** | 0 | 0 | **6** | 6 nodes texte sans text-style |
| **JournalEntryCard** | 0 | 3 | 0 | 3 bordures |
| **ErrorPage** | 0 | 3 | 0 | 3 bordures |
| **QuizComponent** | 0 | 0 | **2** | 2 nodes texte sans style |
| Autres (PromptCard, RankingCard, SectionCard, ProjectCard, CongratulationsCard, VeilleCard, ConfirmModal, BookingModal, AccountFamilyNav, KeyFindingCard, IconFeatureCard, ResourceCard, StepTutorial…) | 0–1 | 1–2 | 0 | pattern quasi-systématique : **1 stroke non bindé** (souvent un divider/bordure hardcodé) |

→ Le trou dominant est un **stroke unique non bindé** répété sur beaucoup de cards — probablement la même bordure/divider hérité d'un composant parent. Fix groupé possible.

---

## 6. Trou de token identifié — gris d'état "verrouillé"

`LearningItemCard` (état locked) utilise 3 gris **absents de la palette TLS** :

| Hex | Occurrences | Proche de | Usage |
|---|---|---|---|
| `#f0f1f2` | 12 | entre ink/100 `#f3f4f6` et ink/200 `#e5e7eb` | fond CTA/frame désactivé |
| `#9c9c9c` | 4 | ink/400 `#9ca3af` (≈) | icône/point désactivé |
| `#7c7c7c` | 4 | ink/500 `#6b7280` (≈) | texte "Verrouillé" |

**Décision requise** : soit re-mapper ces gris sur les `ink/*` existants les plus proches (et corriger le codebase pour utiliser les tokens), soit créer un token dédié `state/locked-*`. Recommandation : **re-mapper sur ink/100, ink/400, ink/500** — l'écart visuel est négligeable et évite de polluer la palette avec des one-offs.

---

## 7. Sections LEGACY (à trier — hors périmètre "prod")

| Page | Section | Contenu |
|---|---|---|
| Atoms | `🗄 LEGACY — Atoms Showcase (SH-XX · à trier)` (id `1580:14`, y=40000) | 69 frames SH-01…SH-66. Contient les anciens showcases dont **SH-47 maintenant vide** (frames QualitativeRating déplacées en § 08). SH-41 (Combobox) conservé. |
| Composites | `🗄 LEGACY — §24 Form/Data/Dashboard (heights cassées · à trier)` | 20 Component Sets marqués "heights cassées" — chacun avec ~1 fill + 1 stroke non bindés. |

Ces zones sont déjà auto-flaggées "à trier". Ne pas les compter dans le scoring prod.

---

## 8. Recommandations — par priorité

**🔴 P0 — parité tone-aware (impacte le handoff dev)**
1. ✅ **FAIT** — **Avatar `tint`** : set focalisé **`Avatar / Tint`** créé (id `4553:760`, 20 variants = tint brand/warm/sun/ink × size xs→xl), fonds plats bindés (primary/600 · secondary/600 · accent/600 · ink/700). Set séparé (convention Button/Glass, Card/Glass) pour éviter l'explosion 50→400. Placé en § 12 (row `4555:700`).
2. ✅ **FAIT (ciblé)** — **StatCard** : axe **`surface`** ajouté (set `1120:66`, 8 variants = surface `card`/`tinted` × tone primary/warm/sun/neutral). `surface=card` = fond `surface/default` + bordure `ink/200` + `shadow/card`. Surfaces `glass`/`frosted` **documentées non construites** (nécessitent un fond sombre pour se lire sur la page blanche). `variant`/`size` codebase non ajoutés (API StatCard chevauche variant/tone/surface — expansion volontairement limitée au couple surface×tone le plus utile).
3. ✅ **FAIT** — **QualitativeRating** : converti en vrai Component Set (id `4549:742`, 6 variants = tone primary/warm/sun × size sm/md), étoiles **Lucide** (fill tone / empty ink/300), rating piloté par override. Placé en § 08. Remplace les 6 frames ellipses statiques.

**🟠 P1 — axes de variants manquants**
4. ✅ **FAIT** — **Combobox** (`size`×`status`) : set `2473:23` étendu à 10 variants = size(sm/md/lg) × status(default/success/error) au state closed + 1 open (md/default). Bordures ink/300 · success-base · danger-base, fond blanc bindé. ⚠️ chevron `⌄` reste un emoji → à passer en Lucide ChevronDown.
5. ✅ **FAIT** — **Card `size=xs`** : set Card étendu à 28 variants (+5 xs : default, feature, tinted-primary/warm/sun). xs = padding 12 · radius 16.
6. ⏳ **Non construits (documentés)** — Pill (`size`), MetaPill (`size` + tones brand/glass), FilterChip (`tone`), ProgressBar (`size`+`layout`), Spinner (tones sun/muted), Divider (`spacing`), Tag (`surface=glass`), Input (`surface=glass`), Alert (`pattern`), Tooltip (`variant`). Décision utilisateur 2026-07-03 : périmètre « focalisé haute-valeur » — ces axes cosmétiques restent en backlog, non bloquants.

**🟡 P2 — binding cleanup (mécanique, sûr)** — ✅ **FAIT 2026-07-03**
5. ✅ **18 fills blancs bindés** → `surface/default` (15 Atoms : SearchWithSuggestions + FilterChip ; 3 Composites). Les paints au niveau `COMPONENT_SET` (`f6f7f9`, `ccd6e0`, `fafaff`, `cc66e5`) sont le décor du showcase → laissés volontairement.
6. ⚠️ **Reclassé, pas un bind mécanique** : le "stroke récurrent" des cards prod n'est PAS un divider partagé — ce sont des **bordures tone-tintées** (`eec29e` pêche, `f8d8a0` or, `c9ddd9` teal, `ffe5da` warm, `fdba74`/`fbbf24` accent) **sans Variable exacte**. Même classe que les gris "locked" (§6) → décision de token, voir P2-token ci-dessous.
7. ⚠️ **Reclassé, non applicable** : les "textes non stylés" (FlipCard ×6, QuizComponent ×2) sont des **emoji décoratifs** (⚡ 📊 🎉), pas du texte typographique — un text-style n'a pas de sens dessus. **Vrai finding** : écart vs la règle CLAUDE.md « Lucide, pas d'emoji dans les composants » → remplacer ⚡/📊/🎉 par des icônes Lucide.

**🟡 P2 — token & nommage**
8. Trancher les gris "locked" (§6) → re-map ink/* recommandé.
9. Harmoniser le nommage d'axes Figma↔codebase (Alert/Toast `tone`→`variant` ; ProgressBar `primary`→`brand`).

**♻️ P3 — tri legacy**
10. Vider/trier les 2 sections LEGACY (SH-47 déjà vidé) une fois leur contenu migré ou abandonné.

---

*Audit première-main 2026-07-03. Scans reproductibles via les scripts `use_figma` de la session (findAllWithCriteria COMPONENT_SET + walk fills/strokes/text/effects).*
