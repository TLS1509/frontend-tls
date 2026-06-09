# Figma Foundations ↔ Code — Audit & Continuation

> **But** : garantir la parité 1-pour-1 entre la page **Foundations** du Figma DS library
> (`LccBZ1GKWQVwVzPtsSzk5Y`, page `1093:2`) et les design tokens du code (`src/index.css` @theme).
> Source de vérité = **`src/index.css` @theme**. Figma doit refléter le code, jamais l'inverse.

Dernière passe : **2026-06-09** (session 5). Scope traité : Foundations 9/9 ✅ · **audit Atoms (80) + Composites (97)**.

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

### 🟠 Button destructive — décision : (c) laisser raw, TODO tokens harmonisés
Variantes `destructive` (default `#d56c42`, hover `#bd5a32`) : coral non-bindé, **sans token danger-button** dans TLS. Code = `bg-red-600` (tailwind brut, hors-charte). **Décision (2026-06-09)** : laisser raw pour l'instant (aucun changement Figma/code).

**TODO futur** : rechercher/définir une couleur destructive qui **harmonise avec les couleurs principales TLS** (primary teal `#55A1B4`, secondary orange `#ED843A`, accent `#F8B044`, danger coral `#F28559`) — p.ex. un terracotta/brique-rouge saturé distinct de secondary mais clairement « danger », à ajouter comme `danger-strong`/`danger-deep` dans `index.css` @theme + Figma, puis rebinder Button destructive (code + Figma). PAS de red tailwind brut.

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

### Gradients — ✅ réconciliés (session 2)

- **Figma : 9 paint styles** — tous les stops liés à des variables Figma.
- **CSS : 9 utilities** ajoutées dans `@layer utilities` de `src/index.css` :
  - `.bg-gradient-cta-{brand,warm,sun,success}`
  - `.bg-gradient-hero-brand-{deep,navy}`
  - `.bg-gradient-bubble-{brand,warm,sun}-light`
- Les page-ambient existants (`bg-gradient-page-ambient`, `-sun`, `-warm`) restent séparés (fond de page full-bleed, 3 stops).
- §08 GRADIENTS showcase : 9 cards avec paint style + label + CSS class name.

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
| 08 | GRADIENTS | `2735:2` | ✅ | 9 paint styles + stops variabilisés + 9 CSS utilities + showcase. |
| 09 | UTILITY TOKENS | `2767:2` | ✅ | OPACITY SCALE supprimée (dup §06, §06 canonique car variable-bound). Footer recompté 149/23/20. Header desc nettoyé. |

### ✅ Foundations page complète — 9/9 sections en parité (2026-06-09)

Compteurs finaux vérifiés via Plugin API : **149 variables · 23 text styles · 20 effect styles · 9 paint styles (gradients)**.
Collections : TLS/Colors (76) · TLS/Spacing (35) · TLS/Radius (7) · TLS/Effects (31).

### Observation non-tranchée — overlap §06 ↔ §07
§06 EFFECTS conserve un bloc « duration-ease-blur » (4 durations + 4 blurs) qui chevauche §07 MOTION (showcase complet : 6 durations + 4 ease + 6 keyframes + 4 blurs). C'est un pattern *overview (§06) vs detail (§07)* — pas supprimé car hors du périmètre dédup explicite (§09 vs §03/§06). À trancher avec l'utilisateur si on veut un home canonique unique pour duration/blur.

### Incohérences transverses résolues
- ✅ **Nommage sections** : §08 → "08 — GRADIENTS", §09 → "09 — UTILITY TOKENS" (préfixe `§ ` retiré)

---

## 4. Décisions résolues (session 2)

1. ✅ **`ink/450` + `ink/550`** — option (b) choisie : supprimés de Figma, rebindés sur ink/400 et ink/500.
2. ✅ **`design-tokens.css` palettes hardcodées** — aliasées sur `var(--color-*)`.
3. ✅ **§08 GRADIENTS** — 9 utilities CSS créées + stops Figma variabilisés.

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
