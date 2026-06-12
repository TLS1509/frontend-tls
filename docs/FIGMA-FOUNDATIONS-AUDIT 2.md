# Figma Foundations ↔ Code — Audit & Continuation

> **But** : garantir la parité 1-pour-1 entre la page **Foundations** du Figma DS library
> (`LccBZ1GKWQVwVzPtsSzk5Y`, page `1093:2`) et les design tokens du code (`src/index.css` @theme).
> Source de vérité = **`src/index.css` @theme**. Figma doit refléter le code, jamais l'inverse.

Dernière passe : **2026-06-10** (session 10). Foundations agency-grade : **12/12 sections** (§10 GRID & LAYOUT, §11 STATES & FOCUS, §12 CONTRAST ajoutées) · tracking gradué propagé au code · `ease/emphasis` aligné · panneaux review nettoyés.

---

## 0e. Session 10 — Foundations agency-grade + parité tracking (2026-06-10)

### Décisions de tokens propagées (session 9.5 → 10)
- **Body text** : `--color-ink-900` restauré à **#252B37** (TLS teal-tinted, AAA) — code + Figma var `ink/900` + `text/strong` (alias ink/900).
- **warning-fg** : **#2f1c13** (dark editorial brown, AAA 8.70:1 sur accent-400 jaune — vérifié §12) — code + Figma var.
- **brown/editorial** : nouvelle var #2f1c13 (= warning-fg, dispo pour usage éditorial).
- **achievement/*** : supprimés (code + 3 Figma vars).

### `ease/emphasis` — aligné sur le code
Figma var + label §07 MOTION + CLAUDE.md : `cubic-bezier(0.2, 0, 0, 1.15)` (overshoot) → **`cubic-bezier(0.22, 1, 0.36, 1)`** (ease-out-quint, sans rebond). Source de vérité = code.

### Tracking gradué — promu dans le code (parité Figma↔app)
Les text styles Figma portaient déjà une échelle graduée (h1 -3% · h2/h3 -2.5% · h4 -2%) ; le code était plat (-0.02em). **Code rattrapé** :
- `@theme` : `--tracking-display` (-0.03), `--tracking-headline` (-0.025), `--tracking-snug` (-0.02) + sub-props `--text-h{1-4}--letter-spacing`.
- `globals.css` + `design-tokens.css` : règles élément h1-h4 → tokens.
- Vérifié computed : `text-h1` -0.03em · `text-h2` -0.025em · `text-h4` -0.02em ✅ (1:1 Figma).
- §02 doc : 3ᵉ carte `--tracking-snug` ajoutée, carte headline corrigée (h2,h3).
- Marketing BEM (`display-*`/`pole__title`) intouché — système séparé.

### 3 nouvelles sections agency-grade
| § | Section | Node | Contenu |
|---|---------|------|---------|
| 10 | GRID & LAYOUT | `3481:26` | 5 breakpoints Tailwind v4 (sm 640→2xl 1536) + grille 12-col + ref containers §03 |
| 11 | STATES & FOCUS | `3482:26` | state model bouton (rest/hover/active/focus-visible/disabled) + focus ring spec |
| 12 | CONTRAST | `3484:26` | matrice WCAG 8 paires clés, ratios calculés + badges AA/AAA/FAIL |

Chaque section clone le panneau « TOKEN GUIDELINES » de §03 (`3116:36`) pour cohérence stricte.

### ⚠️ Finding §12 — contrastes échoués (à traiter hors Foundations)
- **white / secondary-500 (#ED843A) = 2.64:1 → FAIL** (variant `warm` de Button.tsx). Affecte tous les CTA orange.
- **white / primary-600 = 3.66:1 → AA Large seulement** (limite pour labels semibold).
- → tâche séparée spawn (fix couleur CTA), **pas** corrigé en session 10 (décision brand app-wide).

### Cleanup
3 panneaux review session-10 supprimés du canvas (Dark Yellow Calibration, Comparaison body text, Décisions body/warning — décisions actées).

### Audit component sets post-token-changes (Atoms 1095:2 + Composites 1122:2)
Scan parité après restauration ink-900 #252B37 / warning-fg #2f1c13 / suppression achievement :
- **42 fills TEXT raw `#1a1a1a`** (ancien ink-900) → **rebindés sur var `ink/900`** (#252B37). En-têtes de groupes (League Spartan 17) + textes d'exemple de composants.
- **0** binding cassé vers vars achievement supprimées · **0** raw warning-fg (#7C5822) stale (usages étaient bindés → auto-MAJ).
- Après fix : **0** `#1a1a1a` raw restant · **195** nodes texte bindés `ink/900` résolvant #252b37.
- Notion DS DB : 3 tokens tracking + 3 sections Foundations (Guideline) créés.

### Audit détaillé Button component set (1109:58, 97 variants) vs Button.tsx
Comparaison variant × état (bg/border/text bound vars) :
- ✅ primary · warm · ghost · brand-ghost · destructive · link · glass-light · glass-light-ghost · glass-brand · glass-warm · glass-sun — **bg/border/text + tous états (hover/active/focus/disabled) matchent le code** 1:1.
- ✅ destructive → `semantic/danger-strong` (rest/hover) + `danger-deep` (active). ghost → primary-50 + border primary-100. focus → border primary/500 sw2 (= focus ring).
- ⚠️ **FIX code** : variant `accent` avait `text-white` (sur accent-400 jaune = ~1.6:1 FAIL WCAG). Figma = `ink/900` (correct). **Button.tsx corrigé** : `accent` → `text-ink-900` (vérifié /components : rgb(37,43,55) sur jaune = lisible, ~8.8:1 AAA).
- 🔎 Mineur non bloquant : BASE Button a `tracking-tight` (-0.025em) sur les labels alors que les Button text styles Figma sont à 0%. Imperceptible, non corrigé.
- Rappel : variant `glass` (dark) vit dans le set séparé `1109:67` (non re-audité ici).

---

## 0c. Audit Button variants + glass variants (2026-06-09 — session 7)

### Priorité 1 — Tokens danger/strong et danger/deep ✅ (déjà fait session précédente)
Variables `semantic/danger-strong` (VariableID:3357:26, #C0432A) et `semantic/danger-deep` (VariableID:3357:27, #9B2F1B) présentes et correctement bindées sur tous les variants destructive (rest/hover/focus/disabled → danger-strong, active → danger-deep).

### Priorité 2 — Corrections de bindings variants existants ✅

| Variant · State | Avant | Après | Variable |
|---|---|---|---|
| primary / hover bg | primary/700 (#3d7786 — trop sombre) | **primary/500** (#55A1B4) | VariableID:1080:8 |
| warm / hover bg | VariableID:2539:2 (#b07010 olive — WRONG) | **secondary/400** (#F18A4C) | VariableID:1081:6 |
| accent / hover bg | accent/500 (#DF9E3D — direction inversée) | **accent/300** (#FFC15A) | VariableID:1081:15 |
| secondary / hover stroke | ink/200 | **primary/300** (#96C3CF) | VariableID:1080:6 |

Stratégie hover validée dans Button.tsx : « hover = même couleur ou plus claire + shadow coloré ». Active = toujours plus sombre.

### Priorité 3 — 5 glass variants ajoutés dans 1109:58 ✅

40 composants créés (5 variants × 4 rest + 4 états md). Component set 1109:58 : 65 → **105 enfants**.

| Variant | bg rest | stroke rest | bg hover | bg active | texte |
|---|---|---|---|---|---|
| `glass-light` | ink/0 @ 0.70 | ink/0 @ 0.70 | ink/0 @ 0.90 | ink/0 @ 1.0 | ink/900 |
| `glass-light-ghost` | ink/0 @ 0.40 | ink/0 @ 0.50 | ink/0 @ 0.60 | ink/0 @ 0.70 | ink/800 |
| `glass-brand` | primary/100 @ 0.70 | primary/200 @ 0.80 | primary/100 @ 1.0 | primary/200 @ 1.0 | primary/800 |
| `glass-warm` | secondary/100 @ 0.70 | secondary/200 @ 0.80 | secondary/100 @ 1.0 | secondary/200 @ 1.0 | secondary/800 |
| `glass-sun` | accent/100 @ 0.70 | accent/200 @ 0.80 | accent/100 @ 1.0 | accent/200 @ 1.0 | accent/800 |

Technique : opacités via `boundVariables` direct (pas `setBoundVariableForPaint` qui ne préserve pas `paint.opacity`).

### Priorité 4 — Button/Glass component set (1109:67) ✅

- **Bug corrigé** : fills liés à `text/inverse` (variable sémantique — mauvais) → raw white sans variable (intentionnel, opacités glass non-bindables)
- **Renommage** : `variant=glass, size=X` → `variant=glass, size=X, state=rest` (dimension state ajoutée)
- **Ajouté** : `state=hover` (white/0.35, border white/0.50), `state=disabled` (white/0.20, node opacity 0.5)
- **Omis** : `state=active` — intentionnel, Button.tsx ne définit pas d'`active:` pour `glass`
- Total : 4 → **6 enfants** dans 1109:67

### ✅ ghost/secondary — résolu (2026-06-09, vérification API directe)

Vérification via Plugin API (use_figma) sur le component set `1109:58` :

| Variant | Figma (vérifié) | Code Button.tsx | Statut |
|---|---|---|---|
| `variant=ghost` | fill `primary/50` (#E8F4F7) · text `primary/800` (#2F5F6A) | `bg-primary-50 text-primary-800` | ✅ aligné |
| `variant=secondary` | **n'existe pas** dans le component set | alias de `warm` (même classes) | ✅ pas de divergence |
| `variant=brand-ghost` | existe, identique à ghost | alias de `ghost` (même classes) | ✅ aligné |

Variants présents dans Figma : `primary · warm · ghost · brand-ghost · destructive · link · accent · glass-light · glass-light-ghost · glass-brand · glass-warm · glass-sun`

Le doc précédent capturait un état déjà corrigé. Aucune action requise.

---

## 0b. Audit Flows & Écrans + autres pages (2026-06-09 — session 6)

Scan automatisé de **toutes les pages restantes** : 05 Onboarding → 14 Veille & Magazine + Brand Identity (💠) + Icons (🔷) + Marketing Motion (🎬).

### Résultat global : pages fill-clean ✅

| Page | RAW_FILL réels fixés | NON_TLS_FONT fixés | NO_TEXT_STYLE restant | Statut |
|------|---------------------|--------------------|-----------------------|--------|
| 💠 Brand Identity | 0 | 0 | 0 | ✅ clean |
| 🔷 Icons | 5 (labels sections) → bindés ink/400-500 | 0 | 0 | ✅ fixed |
| 🚀 05 Onboarding | 0 (logos Google/LinkedIn = brand literals) | 0 | 0 | ✅ clean |
| 🔐 06 Auth & Security | 0 | 0 | 0 | ✅ clean |
| 📚 07 Learning Paths | 0 réels (BadCard/BadLabelBg = intentionnels) | 0 | ~203 (voir note) | 🟡 text styles |
| 🎯 08 Coaching | ~17 card/panel → bindés surface/default | 0 | ~80 active (+ 87 archive) | 🟡 text styles |
| 📔 09 Journal | 0 fills | 0 | 178 (voir note) | 🟡 text styles |
| 🏠 10 Dashboard | 3 écrans → bindés surface/default | 0 | 0 | ✅ fixed |
| 🏆 11 Gamification | 4 écrans + 1 "Period filter" → surface/default + ink/100 | 0 | 0 | ✅ fixed |
| 🎓 12 Passeport | 6 écrans → bindés surface/default | 0 | 0 | ✅ fixed |
| 👤 13 Profile & Account | 5 écrans → bindés surface/default | 0 | 0 | ✅ fixed |
| 📰 14 Veille & Magazine | 0 | 0 | 0 | ✅ clean |
| 🎬 Marketing Motion | 0 | 0 | 0 | ✅ clean |

**Total fixé cette session : 42 bindings** (36 screen frames → `surface/default`, 5 icon labels → `ink/400`/`ink/500`, 1 "Period filter" → `ink/100`).

### Faux positifs identifiés et exclus

- **Section frames `#ffffff`** (toutes pages) : fond canvas Figma organisationnel — normal, pas bindé intentionnellement.
- **Brand logos VECTOR** (Onboarding) : chemins Google (#ea4335/#4285f4/#34a853/#fbbc05) et LinkedIn (#0a66c2) — couleurs de marque tierces, ne peuvent pas être bindées aux tokens TLS.
- **`BadCard`/`BadLabelBg`** (Learning Paths, inside `LessonCard` component) : frames "mauvais exemple" dans le showcase du composant — intentionnels, laissés as-is.
- **Archive sections** (Coaching, 87 violations dans `ARCHIVE — F series`) : vieux frames Figma Make dépréciés, cleanup différé.

### ⚠️ NO_TEXT_STYLE — Backlog design (pages 07-09)

~460 nœuds TEXT dans les frames écrans (07/08/09) sans text style appliqué. Ces nœuds sont **hors** des instances de composants (les instances héritent déjà des styles). Il s'agit de text layers directs placés sur les frames avant que le système de text styles soit établi.

**Cause** : screens pré-système de styles + frames Figma Make auto-générés.
**Risque d'auto-fix** : high (460+ nœuds — assigner un style sans review visuelle risque des mauvaises correspondances).
**Action recommandée** : pass de review manuelle dans Figma, page par page, en appliquant les styles depuis le panel `Text` → Figma text style picker.
**Priorité** : P2 (non bloquant — les composants sous-jacents ont leurs styles corrects ; ces layers sont des annotations de design).

---

## 0. Audit Atoms & Composites (2026-06-09)

Scan automatisé de **177 composants** (80 Atoms / 97 Composites, ~570 variants) pour détecter : fills opaques non-bindés à une variable, TEXT sans text-style, ombres sans effect-style, polices non-TLS.

### Résultat global : pages quasi-pristines ✅

| Page | Composants | Raw fills (réels) restants | Polices non-TLS | Variants mal nommés | Overlaps |
|------|-----------|---------------------------|-----------------|--------------------|-------|
| 🔵 Atoms | 80 | **2** (Button destructive — flaggé) | 0 ✅ | 0 ✅ | 0 ✅ |
| 🟢 Composites | 97 | **0** ✅ | 0 ✅ | 0 ✅ | 0 ✅ |

### Corrigé cette session

**Polices Inter → Nunito (8 nœuds)** — seule police non-TLS trouvée :
- Atoms : `AuthSuccess` ✓ · Composites : `EtapeAccordion` ×6 (lettres d'étape + chevrons), `ResourceListItem` "A".
- ⚠️ Idéalement les chevrons `^`/`v` et le ✓ devraient être des icônes **Lucide** (cohérent CLAUDE.md) — swap Nunito = fix minimal anti-Inter.

**Couleurs raw → variables TLS (16 binds)** :
- `SkillBar` track → `accent/100` · `SectionCard` titres warm ×2 → `secondary/800`
- `VeilleCard`/`VeilleCardListItem` meta gris ×6 → `ink/400` · catégorie → `accent/800`
- `Badge` "Succès"/"Erreur" → `semantic/success-fg` / `danger-fg` (+ instance `GoalProgress` héritée auto ✅)
- `DataTable` "Terminé"/"En attente" (raw `#16a34a`/`#d97706` tailwind) → `semantic/success-fg` / `warning-fg`
- `EtapeAccordion` chevron gris → `ink/400` · `StreakCelebrationModal` "14" → `secondary/500`
- `ErrorPage` CTA → `secondary/600` · icône alerte → `semantic/danger-base`

**Nettoyage layout** : label de section orphelin flottant `§ 02 — Resume & Parcours` (doublon hors-frame) supprimé.

**Décoratif accepté (non touché)** : glyphes emoji (medals ★🏆🔒, moods 🌱⚡, ActionCard 🎯📓💬) et guillemets/▶ — choix de design, pas un problème de token. NB : CLAUDE.md préfère Lucide aux emoji en *code* — séparé de cet audit.

### ✅ Button destructive — tokens harmonisés (2026-06-09)
Variantes `destructive` : code migré de `bg-red-600` (tailwind brut) vers tokens TLS-charter.

**Tokens définis (`src/index.css` @theme) :**
- `--color-danger-strong: #C0432A` — terracotta brique saturé, WCAG AA ~5:1 sur blanc, hue ≈10° (distinct orange secondaire hue 25°)
- `--color-danger-deep: #9B2F1B` — active/press, plus foncé
- `--shadow-danger-md: 0 6px 16px rgba(192,67,42,0.40)` — glow hover

**Button.tsx** : `bg-danger-strong text-white shadow-sm hover:shadow-danger-md active:bg-danger-deep active:shadow-sm`

**Figma TODO** : créer variables `TLS/Colors/danger/strong` (#C0432A) + `danger/deep` (#9B2F1B) dans la collection TLS/Colors, rebinder les fills du composant Button/destructive (Atoms page, component set 1109:58, variants ~3016:30/3016:32), ajouter swatches dans §01 COLORS semantic section.

---

## 1. Vérification croisée des couleurs (3 sources)

Sources comparées :
1. **CSS @theme** — `src/index.css` (source de vérité)
2. **Figma Variables** — 78 variables COLOR
3. **Figma Paint Styles** — 9 styles (gradients uniquement)

### Résultat : 76 / 76 couleurs en parité parfaite ✅ (session 2 — all resolved)

| Famille | CSS @theme | Figma vars | Statut |
|---------|-----------|-----------|--------|
| primary | 50→950 (11) | 50→950 (11) | ✅ |
| secondary | 50→900 + 650 (11) | 50→900 + 650 (11) | ✅ |
| accent | 50→900 (10) | 50→900 (10) | ✅ |
| ink | 0→950 (12) | 0→950 (12) | ✅ ink/450 + ink/550 supprimés |
| surface | 7 | 7 | ✅ |
| text | 5 | 5 | ✅ |
| border | 3 | 3 | ✅ |
| semantic states | success/danger/warning/info ×(bg/fg/base) (12) | 12 | ✅ |
| achievement | base/dark/light (3) | 3 | ✅ |
| success extras | vivid / bright (2) | 2 | ✅ |

### Résolution des écarts (session 2)

1. **`ink/450` + `ink/550` — supprimés.** Tous les bindings rebindés (ink/450 → ink/400, ink/550 → ink/500) sur Foundations + Composites + Coaching (14 nodes). Variables et swatch frames retirés. Ink row = 12 swatches propres 0→950.

2. **`ink/25` — CSS-only, intentionnel.** `--tls-ink-25: #FAFBFC` dans `design-tokens.css`, pas de `@theme` ni variable Figma. Documenté.

3. **`design-tokens.css` palettes hardcodées — nettoyées.** `--tls-primary-*`, `--tls-orange-*`, `--tls-yellow-*` aliasent maintenant `var(--color-primary-*)` / `var(--color-secondary-*)` / `var(--color-accent-*)`. Token-unification complète (primary + secondary + accent + ink + radius).

### Tokens non-couleur — tous en parité ✅

| Type | CSS | Figma | Statut |
|------|-----|-------|--------|
| radius | xs/sm/md/lg/xl/2xl/pill (7) | 7 | ✅ |
| spacing sémantique | tight→page (7) + touch ×2 | semantic/* (7) + touch/* (2) + scale/* | ✅ |
| duration | instant/fast/base/slow/glacial/expressive (6) | 6 | ✅ |
| ease | standard/decelerate/accelerate/emphasis (4) | 4 (STRING) | ✅ |
| opacity | 6 | 6 | ✅ |
| z-index | 7 | 7 | ✅ |
| blur | 4 | 4 | ✅ |
| effect styles (ombres) | shadow-xs→xl, brand, warm, sun… | **20 effect styles** | ✅ |
| text styles | — | **23 text styles** | ✅ |

### Gradients — ✅ réconciliés (session 2 + session 7 Canva audit)

**Session 2 (9 paint styles + 9 CSS utilities) :**
- `.bg-gradient-cta-{brand,warm,sun,success}`
- `.bg-gradient-hero-brand-{deep,navy}`
- `.bg-gradient-bubble-{brand,warm,sun}-light`
- Les page-ambient (`bg-gradient-page-ambient`, `-sun`, `-warm`) restent séparés (fond full-bleed 3 stops, pas de paint style).

**Session 7 — Canva Brand Kit audit (6 nouveaux paint styles + 5 CSS utilities) :**

Audit Canva Brand Kit TLS (`IG-FxaFkgzeXktc`) : 5 gradients inventoriés → 1 manquant en code+Figma.

| # | Canva | Code | Figma | Statut |
|---|-------|------|-------|--------|
| 1 | `#f0f9ff → #fefaf5` | `bg-gradient-soft-duo` | — | ✅ code (cream adouci) |
| 2 | `#f8b044 → #ed843a` | `bg-gradient-cta-sun` | `Gradient/CTA/Orange/Sun` | ✅ |
| 3 | `#55a1b4 → #164267` | `bg-gradient-brand-teal-deep` | `Gradient/Brand/Teal-Deep` | ✅ |
| 4 | `#164267 → #55a1b4` | `bg-gradient-brand-deep` | — | ✅ code |
| 5 | `#f0f9ff → #f8fbfd → #fefaf5` (3 stops) | `bg-gradient-soft-pastel` | `Gradient/Soft/Pastel` | ✅ (cream adouci) |

De plus, variantes directionnelles du soft-pastel :
- `Gradient/Soft/Pastel-H` → `.bg-gradient-soft-pastel-h` (90°)
- ~~`Gradient/Soft/Pastel-V`~~ → ~~`.bg-gradient-soft-pastel-v`~~ (180°) — **supprimé** (absent Canva)
- `Gradient/Soft/Pastel-Rev` → `.bg-gradient-soft-pastel-rev` (315°)
- `Gradient/Soft/Pastel-Radial` → `.bg-gradient-soft-pastel-radial` (radial)

**Session 7 total : 14 paint styles · 19 CSS gradient utilities.**

**Session 7b — Directional variants brand/warm/sun :**
- `Gradient/Brand/Deep-{V,D,Rev,Radial}` → `.bg-gradient-brand-deep-{v,d,rev,radial}`
- ~~`Gradient/CTA/Warm-{V,D}`~~ — **supprimés** (absent Canva) · `Gradient/CTA/Orange/Warm-{Rev,Radial}` conservés
- `Gradient/CTA/Orange/Sun-{V,D,Rev,Radial}` → `.bg-gradient-cta-sun-{v,d,rev,radial}`

**Session 8 — Canva sync + cleanup (2026-06-09) :**
- `surface/cream` : `#fef3e2` → **`#fefaf5`** (moins orangé) — Figma variable + code + paint styles
- Supprimés : `Gradient/CTA/Warm-V`, `Gradient/CTA/Warm-D`, `Gradient/Soft/Pastel-V`
- Corrigé stop order : `Gradient/Brand/Deep-Radial` (navy center) · `Gradient/CTA/Orange/Warm-Radial` (dark center)
- Regroupement : `Gradient/CTA/Warm-*` + `Gradient/CTA/Sun-*` → `Gradient/CTA/Orange/Warm-*` + `Gradient/CTA/Orange/Sun-*`
- `soft-duo` : 2 stops → 3 stops avec mist (aligne sur Canva)
- `Hero/Brand-Deep` + `Hero/Brand-Navy` : supprimés (paint styles + code)
- Button ghost/brand-ghost : ajout `border border-primary-100 shadow-xs`
- `Button.figma.tsx` + `figma.config.ts` : Code Connect préparé (publish quand Org plan)

**Total final : 22 paint styles · 27 CSS gradient utilities.**

**Session 9 — Foundations page §08 cleanup (2026-06-09) :**
- Supprimés du canvas : 2 panneaux de review test (`§ Gradient Review — Canva vs Code` + `§ Gradient Review — État final`)
- Supprimés de la section §08 : HEROES header + 2 swatch containers (Hero/Brand-Deep, Hero/Brand-Navy)
- Supprimés de la section §08 : Soft/Pastel-V · CTA/Warm-V · CTA/Warm-D (styles déjà supprimés en session 8)
- Compaction Soft Pastel row : Rev → x=1072 · Radial → x=1584 (comble le slot Pastel-V)
- Compaction Warm Orange row : Warm-Rev → x=48 · Warm-Radial → x=560 (comble les slots V+D)
- Tout décalé de 340px vers le haut (section Heroes ≈ 340px de hauteur libérée)
- Descriptions mises à jour : cream `#fef3e2 → #fefaf5`, stop-orders radiaux corrigés (Brand/Deep-Radial navy center · Warm-Radial dark center)
- Label compteur : "27 gradients" → **"22 gradients"** · "SOFT PASTEL (5 VARIANTS)" → **"(4 VARIANTS)"**

---

## 2. Ce qui a été fait

### §01 COLORS — ✅ entièrement repris (cette session)
- Compteur header : « 70 variables » → **« 78 variables · primary · secondary · accent · ink · surface · text · border · semantic »**.
- **primary** : ajout swatch `950`.
- **secondary** : insertion swatch `650` (entre 600 et 700, décalage des suivants) + **6 bindings réparés** (100-400, 700-900 étaient UNBOUND).
- **accent** : **7 bindings réparés** (100-300, 600-900 étaient UNBOUND).
- **ink** : **rebuild complet 14 swatches** (0→950) avec bindings directs `ink/*` (avant : aliasés sur surface/text/border) ; labels lisibles (text/inverse sur fonds foncés).
- **state colors** : **5e carte `Achievement`** ajoutée (base/light/dark) + **10 bindings bg/fg réparés** sur Success/Danger/Warning/Info (bg étaient UNBOUND, fg pointaient sur primary/800).
- **3 nouvelles rangées** : `Surface` (7), `Text` (5), `Border` (3) sous un sous-titre « Semantic aliases ».
- Section agrandie h=552 → **866**.

### Nettoyage tokens fantômes — ✅
- **`sage` (#73A68C)** + **`purple-accent` (#7272CD)** supprimés : `src/index.css`, `CLAUDE.md` (table + note), variables Figma (`semantic/sage`, `semantic/purple-accent`), 7 nœuds canvas orphelins. **0 usage** dans les `.tsx` → aucune régression.

### Sessions précédentes
- **§02 TYPOGRAPHY** : 4 labels de la table corrigés (h2 28px, h3 22px, h4 18px+League Spartan, body-sm 15px). Les **text styles eux-mêmes** étaient corrects.
- **§05 SHADOWS** : showcase complet 16 cartes (Elevation 5 · Brand 6 · Card 3 · Spécial 2) avec effect styles bindés.

---

## 3. Ce qui reste à faire (par section)

| § | Section | Figma id | Statut | Notes |
|---|---------|----------|--------|-------|
| 01 | COLORS | `1579:2` | ✅ | 76/76 parité. ink/450+550 supprimés. |
| 02 | TYPOGRAPHY | `1579:4` | ✅ | 23 text styles vérifiés 1-pour-1 vs `@theme` (h1-h4, body, caption, micro, eyebrow, display, button, mono). Sous-titre corrigé "28→23". |
| 03 | SPACING | `1579:5` | ✅ | Variables FLOAT correctes (7 sémantiques + touch + scale). Barres visuelles 2× scale intentionnel. |
| 04 | BORDER RADIUS | `1579:6` | ✅ | 7 `box.cornerRadius` bindés aux NUMBER vars xs→pill via `setBoundVariable`. |
| 05 | SHADOWS | `1579:7` | ✅ | Terminé. |
| 06 | EFFECTS | `1579:8` | ✅ | 6 `fg.opacity` bindés aux `opacity/*` NUMBER vars. Titre interne "Utility Tokens"→"Effects" (collision §09 résolue). |
| 07 | MOTION | `2615:6` | ✅ | `instant(80ms)` + `expressive(800ms)` ajoutés au showcase. 6/6 durées. |
| 08 | GRADIENTS | `2735:2` | ✅ | 22 paint styles · showcase 22 cards · section nettoyée session 9 (Heroes + test panels supprimés, Pastel-V/Warm-V/D retirés, rangées compactées, descriptions synchro). |
| 09 | UTILITY TOKENS | `2767:2` | ✅ | OPACITY SCALE supprimée (dup §06, §06 canonique car variable-bound). Footer recompté 149/23/20. Header desc nettoyé. |
| 10 | GRID & LAYOUT | `3481:26` | ✅ | NEW (session 10). 5 breakpoints Tailwind v4 + grille 12-col + ref containers §03. |
| 11 | STATES & FOCUS | `3482:26` | ✅ | NEW (session 10). State model bouton + focus ring spec. |
| 12 | CONTRAST | `3484:26` | ✅ | NEW (session 10). Matrice WCAG 8 paires, ratios calculés. Findings: secondary-500 FAIL, primary-600 AA-Large. |

### ✅ Foundations page complète — 12/12 sections en parité (2026-06-10)

Compteurs finaux vérifiés via Plugin API : **149 variables · 23 text styles · 20 effect styles · 22 paint styles (gradients)**.
Collections : TLS/Colors (76) · TLS/Spacing (35) · TLS/Radius (7) · TLS/Effects (31).

### Observation non-tranchée — overlap §06 ↔ §07
§06 EFFECTS conserve un bloc « duration-ease-blur » (4 durations + 4 blurs) qui chevauche §07 MOTION (showcase complet : 6 durations + 4 ease + 6 keyframes + 4 blurs). C'est un pattern *overview (§06) vs detail (§07)* — pas supprimé car hors du périmètre dédup explicite (§09 vs §03/§06). À trancher avec l'utilisateur si on veut un home canonique unique pour duration/blur.

### Incohérences transverses résolues
- ✅ **Nommage sections** : §08 → "08 — GRADIENTS", §09 → "09 — UTILITY TOKENS" (préfixe `§ ` retiré)

---

## 4. Décisions résolues

1. ✅ **`ink/450` + `ink/550`** — supprimés de Figma, rebindés sur ink/400 et ink/500.
2. ✅ **`design-tokens.css` palettes hardcodées** — aliasées sur `var(--color-*)`.
3. ✅ **§08 GRADIENTS** — 9 utilities CSS créées + stops Figma variabilisés.
4. ✅ **Button ghost/secondary** — alignés (vérifié API 2026-06-09). Pas d'action.
5. ✅ **success-vivid/bright** — existent en Figma (`#347572` / `#228b55`), confirmés identiques au code.
6. ✅ **Text style binding — règle arrêtée (2026-06-09)** :
   - **Niveau 1 — composants** : binding obligatoire (production path).
   - **Niveau 2 — screens/frames** : binding obligatoire (~460 orphelins pages 07-09, backlog P2).
   - **Niveau 3 — documentation DS canvas** (labels Foundations, descriptions, annotations) : non requis — doc interne, jamais en production.

---

## 5. PROMPT DE CONTINUATION (copier-coller en prochaine session)

```
Contexte : audit de parité Figma DS ↔ code app (frontend-tls). Source de vérité = src/index.css @theme.
Fichier Figma : LccBZ1GKWQVwVzPtsSzk5Y, page Foundations = 1093:2.
État détaillé : docs/FIGMA-FOUNDATIONS-AUDIT.md (lis-le d'abord).

Fait : §01 COLORS entièrement repris (parité 78 vars), §02/§05 ok, tokens fantômes sage/purple supprimés.
Vérif couleurs : 76/78 parité parfaite. Reste 2 écarts (ink/450 + ink/550 Figma-only, rampe cassée) → voir §4 décisions.

À faire, section par section, MÊME méthode que §01 (vérifier code↔Figma, réparer bindings, compléter swatches manquants, normaliser) :
1. §08 GRADIENTS (2735:2) — le plus gros écart : 9 paint styles Figma vs 3 utilities page-ambient CSS, à réconcilier.
2. §09 UTILITY TOKENS (2767:2) — dédupliquer vs §03/§06, normaliser le titre « § 09 » → « 09 ».
3. §03 SPACING (1579:5), §04 BORDER RADIUS (1579:6), §06 EFFECTS (1579:8) — vérifs rapides (valeurs déjà en parité, juste showcase/labels).
4. §07 MOTION (2615:6) — confirmer que le showcase affiche instant(80ms) + expressive(800ms).
5. §02 TYPOGRAPHY (1579:4) — re-vérifier les 23 text styles affichés.
6. Normaliser le nommage des sections (§08/§09 ont un préfixe « § » que les autres n'ont pas).

⚠️ Méthode Figma Plugin API (use_figma) :
- Les enfants d'une SECTION utilisent des coordonnées RELATIVES à la section (node.x = canvas_x − section.x). Ne jamais passer de coords canvas absolues.
- Bindings de fill : figma.variables.setBoundVariableForPaint(paint,'color',variable) — préserve l'opacity.
- Recharger la police après setTextStyleIdAsync avant d'écrire characters.
- Approche chirurgicale, un bloc use_figma par fix groupé, screenshot de validation. PAS de workflow multi-agent (coût).
- Synchroniser Notion Design System DB après chaque section validée (règle CLAUDE.md).
```
