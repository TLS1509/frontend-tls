# Audit CLAUDE.md + Mémoire — Context engineering (génération Claude 5)

> **Date** : 2026-07-25 · **Branche d'exécution** : `docs/claude-md-context-refactor`
> **Déclencheur** : article Anthropic *« The new rules of context engineering for Claude 5 generation models »*
> **Méthode** : workflow multi-agent (9 agents, ~1,44 M tokens) — 6 agents de classement section-par-section + 3 agents de vérification (dérivabilité code, doublons/liens morts, mémoire). Chaque verdict vérifié en première main contre le code (`src/index.css`, composants, App.tsx) et le disque.

---

## 1. Principe directeur (l'article)

La génération Claude 5 / Opus 4.8 a assez de jugement pour qu'on **arrête de la micro-manager**. Anthropic a retiré **>80 % du system prompt de Claude Code** sans perte mesurable sur les évals. Règles applicables ici :

1. **CLAUDE.md léger** : dire brièvement à quoi sert le repo, puis dépenser les tokens sur les **gotchas** (pièges non-évidents) — PAS sur ce que Claude peut découvrir dans le filesystem/code.
2. **Progressive disclosure** : sortir les procédures longues dans des **skills** chargés à la demande.
3. **Ne pas dupliquer** le code ni un autre doc → **pointer** vers la source de vérité.
4. **Faire confiance au jugement** du modèle : supprimer le cérémonial sur-contraignant et les journaux de phases finies.

---

## 2. Diagnostic chiffré

`CLAUDE.md` = **2 747 lignes / ~23 500 mots / 176 Ko**, chargé **en entier à chaque session**.

| Verdict | Lignes | Destination |
|---|---:|---|
| 🟢 **KEEP** — gotchas non-dérivables | **388** | reste dans un CLAUDE.md lean |
| 🔵 **POINT** — doublon du code/doc | **534** | pointeur vers source de vérité |
| 🟣 **EXTRACT** — workflow de tâche | **872** | skill à disclosure progressive |
| 🔴 **CUT** — périmé / dupliqué | **806** | suppression |

**Cible finale** : CLAUDE.md ≈ **450 lignes** (~80 % de moins ; ~176 Ko → ~35 Ko), à chaque session. Les 872 lignes de workflows ne disparaissent pas — elles deviennent des skills. 806 lignes sont purement à jeter.

---

## 3. Preuve que la dérive a déjà eu lieu (le point critique)

Les tables de tokens inline **contredisent déjà le code** — elles mentent au modèle. Vérifié contre `src/index.css` @theme :

| Token | CLAUDE.md dit | Code (`index.css`) dit | État |
|---|---|---|---|
| `ink-900` | `#1a1a1a` | `#252B37` | ❌ faux |
| `shadow-xs/sm/md/lg` | `rgba(0,0,0,…)`, géométrie A | `rgba(18,24,28,…)`, géométrie B | ❌ faux (couleur + géométrie) |
| `--blur-ambient` | nommé `--blur-glass-ambient` | `--blur-ambient` | ❌ nom inexistant |
| `duration`, `container` | tables partielles | code définit + de tokens | ⚠️ snapshot incomplet |

10/12 catégories de tokens **CONFIRMÉES intégralement dérivables** de `src/index.css` @theme ; 2 PARTIAL (couleurs sémantiques → valeurs réparties index.css + design-tokens.css + doctrine Alert dans le canon ; container → les exemples `max-w-page` sont même *faux* car en Tailwind v4 `--container-*` génère des `@container` queries, pas des `max-w-*`).

Le fichier **admet lui-même** 3× que « `src/index.css` @theme fait foi, en cas de doute c'est le code qui tranche » (L261-263, L296, L375). Remplacer les tables par un pointeur est donc conforme à sa propre politique — et corrige la dérive.

### Doublons

- **Phase 14 (L1011-1088) ≈ Phase 14+ (L1347-1487)** — même workflow flow-based, ~90 % de recouvrement, anti-patterns 5/5 dupliqués. ~260 lignes d'écart = duplication accidentelle. → supprimer Phase 14+, garder la copie canonique (qui partira en skill en passe 2).
- **Phase 16 : deux `##` headers pour la même phase** (L1112 « alignement FO↔Cahiers » et L1643 « Cahier↔FO Alignment »). Corps complémentaires (workflow vs inventaire modules) mais **anti-patterns dupliqués** (L1172 FR / L1839 EN) + **DAG d'exécution dupliqué** (L1180 / L1821), et **se contredisent** : « 17 cahiers » vs « 16 » (la table en liste 18), numérotation modules 16.14/15/16 vs 16.12bis/13/13bis.

### Liens morts (références vers des fichiers introuvables / mal placés)

| Référence dans CLAUDE.md | Réalité |
|---|---|
| `MIGRATION-PLAN.md` (×9, racine) | vit dans `docs/MIGRATION-PLAN.md` |
| `PHASE-16-GAP-ANALYSIS.md` | `docs/PHASE-16-GAP-ANALYSIS.md` |
| `FO_PAGES_INVENTORY.md` | `docs/CDC/FO_PAGES_INVENTORY.md` |
| `[..](../AUDIT-PHASE-19.md)` + `../AUDIT-PHASE-19-NOTION-DELTA.md` | `../` cassé → réels dans `docs/_audits/` |
| `~/.claude/plans/plan-phase-14-lazy-kernighan.md` | **absent** |
| `animations-polish.css`, `components-modern.css:75/:178`, `utilities.css`, `layouts.css` (cités avec n° de ligne dans les Pièges) | **n'existent plus** dans le repo |
| Phase 19.B2 : « `HeroSection.tsx` supprimé » | le fichier **existe encore** sur disque |

### Auto-contradictions

**11 passages « était FAUSSE / Corrigé le / révisé / fabriquées »** sur 8 sections (L269, L693, L1497, L1520, L2140/2145, L2196/2203, L2704-2736, L28). Contradiction **vivante** : `text-body-sm = 14px` est affirmé dans la table Phase 20 (L2371) alors qu'une autre section le déclare faux (code = 15px).

---

## 4. Audit mémoire (41 entrées : KEEP 25 · UPDATE 15 · DELETE 1)

La mémoire est bien plus saine que le CLAUDE.md. Actions :

**DELETE (1)** — `project_figma_component_doc_pages.md` : copie intégrale de CLAUDE.md § Phase 21.

**Index (`MEMORY.md`)** :
- Entrée fantôme `project_learning_space_refactor.md` (aucun fichier) → retirer.
- 2 fichiers sur disque absents de l'index → ajouter : `feedback_brand_assets_visual.md`, `feedback_cite_academic_sources.md`.
- Pointeur « à lire en premier » `docs/MARKETING-CONTEXT.md` → archivé (`docs/_archive/`), superseded par `docs/marketing/*`.

**3 contradictions prioritaires** :
1. `project_marketing_site.md` : « `max-w-page` cassé, utilise `max-w-6xl` » → **faux** (corrigé `index.css` L469-479).
2. `feedback_brand_assets_visual.md` : « cartes = blanc PAS glass » + « shadow-card ambré » → contredit `project_dashboard_ambient_bg.md` (glass validé pour l'app) et CLAUDE.md (shadow-card **neutre**, pas ambré).
3. `project_marketing_brand.md` : viole les règles permanentes de `feedback_faits_offres_integrity.md` (Qualiopi / Open Badge 2.0 / AI Act), cite un doc manquant (`MARKETING-UNIFIED.md`), propage des CA gonflés → réécriture ou suppression.

**12 autres UPDATE** (chemins de docs déplacés/archivés, snapshots datés) — non bloquants, à rafraîchir au fil de l'eau. Notable : `RESEARCH_LEARNING_SPACE_ARCHITECTURE.md` — son gap central (« pas de `resolveItemRoute()` ») est **clos** (`LearningSpace.tsx:20`/`:322`).

---

## 5. Cible : squelette du CLAUDE.md lean (~450 lignes)

1. **Projet** — stack, 1 ligne.
2. **Sources de vérité (pointeurs)** — valeurs → `src/index.css` @theme · usage composants → `docs/_canon/REGLES-USAGE-COMPOSANTS.md` · specs → `docs/CDC/` + Notion · plan → `docs/MIGRATION-PLAN.md` · clé Figma `LccBZ1GKWQVwVzPtsSzk5Y` + URLs Notion DB.
3. **Règles absolues Tailwind** (les 5). 🟢
4. **Gotchas Tailwind v4 / cascade CSS** — Pièges #1-14, SVG→Lucide, peer+after, arbitrary-property. 🟢 (allégés des notes datées)
5. **Conventions transverses** — header components (PageHero vs EditorialHero…), a11y (24px AA / 44px cible + focus-visible), spacing sémantique, PageShell `width=page`, tracking gradué, League-Spartan-sans-italic, palette danger, gate = `npm run build`, jamais de `tailwind.config.js`. 🟢
6. **Animations marketing** — gsap (pinning) / framer (défaut) / lenis **banni** + `useReducedMotion` obligatoire + gotcha sticky/overflow. 🟢
7. **Hygiène doc + triple-sync** — principe + pointeur skill. 🟢
8. **Index des skills projet** — 9 skills, 1 ligne chacun (quand les invoquer).

---

## 6. Les 9 skills à extraire (`.claude/skills/`) — passe 2

| Skill | Lignes | Source (§ CLAUDE.md) |
|---|---:|---|
| `tailwind-component-migration` | 189 | Pattern variant-maps + ordre bottom-up + workflow 7 étapes |
| `figma-pixel-perfect-reproduction` | 168 | Phase 20 (6 étapes + table mapping + template) |
| `figma-component-doc-pages` | 149 | Phase 21 (scaffold script + IDs VAR/TS/ES) |
| `zustand-store-wiring` | 148 | Phase 17 (6 étapes + 5 patterns + règles) |
| `ds-triple-sync` | 75 | Doc Notion+Figma (checklist 7 points) |
| `marketing-motion` | 41 | Patterns/pièges/workflow marketing v2 |
| `flow-based-redesign` | 38 | Phase 14 (6 étapes par flow) |
| `spec-compliance-audit` | 32 | Phase 16 (workflow par cahier) |
| `figma-ds-sync` | 32 | Process technique Figma Plugin API |

---

## 7. Plan d'exécution (2 passes)

### Passe 1 — Nettoyage sûr (branche `docs/claude-md-context-refactor`) ✅ FAIT (2026-07-25)
Retire le contenu *activement faux/trompeur* + les gros doublons **sans toucher aux sections encore entremêlées** (KEEP-gotchas + EXTRACT-workflow mélangés) :
- ✅ Tables de tokens (couleurs, sémantiques, typo, tracking, rayons, ombres, spacing, opacity, z-index, duration, ease, container, blur) → **pointeur `src/index.css`** + gotchas préservés (contraste primary-600, anti-pattern tracking plat, rounded-pill vs full, shadow-card neutre, doctrine couleurs sémantiques). **Corrige la dérive live** (ink-900, ombres, blur).
- ✅ **Phase 14+** (doublon verbatim de Phase 14) supprimée (−143 l).
- ✅ **Phase 16 second copy** (Cahier ↔ FO) supprimée (−225 l).
- ✅ **Phase 10** (workflow mort, remplacé par le flow-based) → réduite à sa seule convention durable (tone narratif).
- ✅ **Phase 15** (checklist finie) supprimée.
- ✅ Mémoire : 1 delete (doc_pages dup) + hygiène index (fantôme retiré, 2 fichiers ajoutés, pointeur MARKETING-CONTEXT corrigé) + 3 contradictions (max-w-page, brand-assets glass/ambré, marketing-brand règles violées).

**Résultat passe 1 : 2 747 → 2 119 lignes (−628, −23 %) · 0 doublon de section · 0 valeur de token dérivée · 0 séparateur orphelin.**

**Volontairement laissé pour la passe 2** (sections où KEEP + EXTRACT + CUT sont entremêlés — à traiter une seule fois, proprement) : Phase 14 (extraire le workflow → skill, garder la table API→pointeur), Phase 17-18 / 19 / 20 / 21 / 23 / Phase 1 P0, « Ce qu'il NE FAUT PAS faire » (garder la seule règle tailwind.config), et les **liens morts internes** à ces sections (MIGRATION-PLAN.md → `docs/`, 4 CSS legacy inexistants dans les Pièges, note HeroSection « supprimé »). Les traiter maintenant reviendrait à couper ces sections en deux et à y repasser en passe 2.

### Passe 2 — Suppression de l'historique (branche, 2026-07-25) ✅ FAIT

⚠️ **Reframe (Chloé) : les phases 1-16 du Migration Plan sont TOUTES FINIES** — migration one-time (BEM → React/Tailwind + design system) qui ne se reproduira pas. Donc les workflows de phase = **historique à SUPPRIMER**, pas des skills. **Aucun skill créé** (un skill ne vaut que pour un process récurrent — le plan « 9 skills » est caduc). De plus, sur décision de Chloé : le **process de sync Figma ↔ code** est retiré (redondant avec le connecteur Figma + le skill `figma-use`), et la **guidance animations marketing** est retirée (le site = projet séparé, même si son code vit encore dans ce repo).

- 🔴 **Supprimé** : Phase 10, 14, 16, 17-18, 19.x, 20, 21, 23, Phase 1 P0 (workflows + changelogs) · « Ce qu'il NE FAUT PAS faire » (dup) · sync Figma/Notion triple · marketing v2 · stratégie d'ordre bottom-up · points d'attention (dups) · log extractions Figma daté · note sitemap.
- 🟢 **Gardé inline (compacté)** : Règles absolues Tailwind · Pièges #1-14 + SVG→Lucide + peer/after (gotchas) · pattern variant-map (créer un composant) · conventions UI (headers, a11y 24/44, arbitrary-property, PageShell) · **patterns Zustand** (couche d'état vivante, utile pour les tests locaux) · conventions cards (→ `tone-classes.ts`) · typo League-Spartan · hygiène doc · build gate.
- 🔧 **Liens morts** : refs `MIGRATION-PLAN.md` parties avec les sections supprimées ; citations des 4 CSS legacy (vérifiés absents de première main) annotées « historiques » dans les Pièges ; note HeroSection « supprimé » retirée.

**Résultat : CLAUDE.md 2 119 → 569 lignes. Total depuis le départ : 2 747 → 569 (−79 %).** 0 doublon, 0 changelog de phase, 0 lien mort actif, 0 valeur de token dérivée. Recentré sur ce que le repo *est* : **Learning App + design system**.

> Skills créés : **aucun** (décision : phases finies). Si un travail redevient récurrent (ex. reprise Figma), on créera le skill à ce moment-là, à la demande.

> Aucune passe n'est commitée sans validation utilisateur. Diff relu sur la branche `docs/claude-md-context-refactor`.
