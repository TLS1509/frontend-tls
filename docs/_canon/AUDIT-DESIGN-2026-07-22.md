# Audit doc design — 2026-07-22

_Cinq documents confrontés au code réel : `DESIGN.md`, `DESIGN-IMPECCABLE.md`,
`docs/site/DESIGN-INSPO.md`, `PRODUCT.md`, `.claude/stitch-design-system.md`.
Chaque dérive ci-dessous a été établie contre un fichier source, pas estimée._

**Statut : rien n'est appliqué.** Ce document est une liste de travail, pas un
état des lieux corrigé. Trois arbitrages (§2) conditionnent le reste.

---

## 1. La cause racine

Quatre informations sont écrites **trois fois chacune**. C'est mécaniquement ce
qui a produit la majorité des dérives.

| Information | Source unique à retenir | Ce que les autres docs doivent faire |
|---|---|---|
| Valeurs de tokens (couleurs, radius, blur, shadows, motion) | **`src/index.css`** (`@theme`) | Ne garder que la **structure** (namespaces, convention de nommage). **Jamais les hex.** |
| Voice, cadence, doctrine IA | **`PRODUCT.md`** | Lier, ne pas recopier |
| Pièges connus | **`CLAUDE.md`** | Pointer, ne pas compter |
| Faits business / marque | **`docs/_canon/FACTS-CANON.md`** | Ne rien propager hors canon |

**La règle à écrire en tête de chaque doc :**
> Valeurs de tokens : source = `src/index.css` (`@theme`). Ce document décrit la
> structure, pas les valeurs.

Poser cette règle **avant** de corriger permet de *supprimer* des blocs entiers
au lieu de les corriger un par un.

---

## 2. Les trois arbitrages à trancher d'abord

Ils conditionnent une trentaine de lignes en aval. Les trancher dans le mauvais
sens coûte un second passage complet.

### (a) `.claude/stitch-design-system.md` — maintenu ou supprimé ?

**Vérifié : 0 référence dans tout le dépôt**, y compris `CLAUDE.md`. Il coexiste
avec `.claude/skills/stitch-design-taste/DESIGN.md` (palette zinc générique, hors
charte TLS).

C'est **le plus rentable des trois** : s'il est supprimé, **~55 corrections
disparaissent d'un coup**. Le maintenir sans que rien ne pointe dessus garantit
qu'il redérivera.

### (b) `--shadow-card` — teinté ambre, ou noir ?

Trois docs l'annoncent teinté ambre. Le commentaire d'`index.css` aussi.
**Les valeurs sont noir pur** (`rgba(0,0,0,0.07)`, vérifié L172-174).

Ce n'est **pas une dérive doc** — c'est une intention de design non implémentée.
Ne pas corriger les docs vers le noir avant de trancher : soit on teinte le token
(3 valeurs dans `index.css`), soit on corrige 3 docs.

### (c) `ai-label` — spec cible ou état réel ?

Token jamais implémenté, décrit comme existant dans 2 docs. Soit on l'aligne sur
`AITransparencyLabel.tsx`, soit on le marque « non implémenté ».

---

## 3. Corrections factuelles — par erreur, pas par fichier

Les mêmes erreurs apparaissent dans 2 à 3 documents. **Traiter par grep de la
valeur fautive**, pas par lecture séquentielle de chaque fichier.

### Valeurs fausses (priorité 1 — induisent en erreur immédiatement)

| Grep | Faux | Réel |
|---|---|---|
| `#F8B044` | accent bouton au repos | **`accent-500` #DF9E3D** |
| `#1F3E45` | ghost | **`primary-800` #2F5F6A** |
| `14px` (input radius) | 14px | **10px (`rounded-md`)** |
| `No glow ring` | « pas de ring » | **il y a un focus ring** (`ring-2 ring-primary-500/20`) — à supprimer partout |
| `13px 600` (badges) | Nunito 13px 600 | **11px / 700 / +0.05em / uppercase / border** |
| `12/18/28` (blur) | 12/18/28px | **8/16/24px** |
| `#fef3e2` | surface-cream | **`#fefaf5`** |
| `#1a1a1a` | ink-deepest | **`#252B37`** |

Aussi : typo display = weight **800**, tracking **-0.03em** ; containers =
**1280/1152/1024/768/65ch** ; motion = **80/150/200/300/600/800**,
ease-standard `cubic-bezier(0.4,0,0.2,1)`.

`DESIGN-INSPO` L305-306 : les 4 hex ambient **n'existent pas** → remplacer par
`surface-cream #fefaf5`, `surface-mist #f8fbfd`, `surface-cyan #f0f9ff`,
`ink-900 #252B37`. Supprimer le lavender.

### Composants et chemins morts (priorité 2)

Grep transverse : `Topbar`, `LessonHeader`, `StrategicHeader`, `KPICard`,
`TimelineItem`, `SearchWithFilters`, `useLearningPathStore`, `/marketing/`,
`MIGRATION-PLAN.md` (→ `docs/`), `tls-components.css`, `components-modern.css`.

- `EditorialHero` → **`PageHero`**, **5 tones** (`flat` manquant partout)
- Auth : routes `/auth/*` ; marketing → **`/website`**
- `SearchWithFilters` → `SearchFilters` / `SearchWithSuggestions`

### Comptages (priorité 3 — à faire en dernier)

78 couleurs · ink 0→950 · primary→950 · secondary-650 · 15 catégories ·
13 variants Card · 16 variants Button · 13 sub-components Auth · 20 maps tone ·
28 gradients · 7 sous-catégories Cards · `z-base`.

> **Recommandation : remplacer les comptages par « voir le fichier ».** Un
> comptage non maintenu est une dérive programmée.

---

## 4. Ce qu'il faut supprimer (après les corrections, pas avant)

Plusieurs blocs à supprimer contiennent aussi des lignes justes à récupérer.

1. `DESIGN.md` L553-562 « Deprecated ❌ » — les 6 fichiers sont supprimés
2. `DESIGN.md` L667-673 « Pages catalog Tier 1/2/3 » — 35 pages listées contre **151 réelles**, compteur figé en Phase 10
3. `DESIGN.md` L512-578 — doublon de titre §4 avec statuts divergents
4. **`DESIGN-IMPECCABLE` L881-912 « Roadmap Phase 19 » — deux ✅ certifient des travaux non faits** (gaps #5 et #6). Garder gap #1 (exact).
5. `DESIGN-IMPECCABLE` L855-863 « Ghost-Typing » — rédigé au présent, zéro implémentation → basculer en roadmap
6. `stitch` §11 Dashboard + §12 Auth — les deux écrans exemples sont faux de bout en bout
7. `stitch` L387 « ❌ rounded-full on buttons » — **factuellement faux** (`rounded-full` = le pill exigé, utilisé 122 fois)
8. `DESIGN-INSPO` L533-756 (case study Until Labs), L253-294 (hero jamais livré — le vrai est vidéo aquarelle sur `bg-black`), L67-161 (process historique → archiver daté)
9. **`DESIGN-INSPO` contient trois triades de marque différentes** (L60, L363, L370). Canon = **Stratégique · Augmenté · Humain** (FACTS-CANON M4 ✅). Supprimer les deux autres.

---

## 5. Ce qu'il ne faut PAS toucher — ouvrir des tickets code

**`PRODUCT.md` est un doc de doctrine produit, pas un état des lieux.** Quand le
code le contredit, **c'est le produit qui a dérivé**. Laisser le texte, ajouter
« non implémenté au 2026-07-22 », ouvrir le ticket.

| Sujet | Doc (juste) | Code (dérivé) |
|---|---|---|
| Dreyfus niveau 5 | `PRODUCT.md` L15 « Maître » | `DreyfusLevelSelector.tsx` L29 « Expert » — *déjà le finding P6 de juin, non appliqué ; le canon ne tranche pas* |
| STRIDE | `PRODUCT.md` L98 | `src/data/projects.ts` L50/L369 |
| Cadence | streak hebdo, silence week-end, atrophie sans alerte rouge | `StreakDetail` (quotidien), `NotificationPreferences` (pas de week-end), `AtrophieIndicator` (`AlertTriangle` + `animate-pulse`) |
| Échelle ink | corrigée le 22/07 | **`Components.tsx` L7228-7259 affiche encore l'ancienne échelle teintée teal** — dernier foyer vivant de la dérive |

Également hors périmètre : `tailwind.config.js` (divergent, probablement mort en
Tailwind v4 CSS-first — **vérifier qu'aucun outil ne le lit avant de supprimer**),
et les sections « non vérifiable » (URLs Notion, estimations de charge).

---

## 6. Ordre d'application

0. **Commiter `.claude/stitch-design-system.md`** — il est en `M` non commité et a bougé pendant l'audit. Sans ça, on ne distinguera plus ce qui vient de la correction du 22 de ce qui vient d'ici.
1. **Trancher les 3 arbitrages du §2.**
2. **Poser la règle de source unique** en tête de chaque doc.
3. Priorité 1 (valeurs), par grep : `stitch` → `DESIGN-IMPECCABLE` → `DESIGN-INSPO` → `DESIGN.md`.
4. Priorité 2 (chemins morts), par grep transverse.
5. Les suppressions du §4.
6. Priorité 3 (comptages).
7. Ouvrir les tickets code du §5.

> **Un commit par étape 3/4/5/6.** Les cinq fichiers en un seul commit rendent la
> revue impossible.

---

## 7. Ce que cet audit dit sur `AUDIT-COHERENCE.md`

L'audit de juin conclut « Tokens DS identiques entre CLAUDE.md / DESIGN.md /
DESIGN-INSPO ». C'était vrai — **pour les trois documents qu'il a regardés**.
`DESIGN-IMPECCABLE.md` et `stitch-design-system.md`, les deux qui avaient
réellement dérivé, **n'étaient pas dans son périmètre** (0 occurrence).

D'où un « ✅ tokens cohérents » affiché alors que le fichier destiné à Stitch
portait 16 valeurs périmées.

**Règle à retenir : un « ✅ vérifié » n'a de valeur que si le périmètre du
contrôle est écrit à côté.** Sinon il se lit « tout va bien » alors qu'il veut
dire « les trois fichiers que j'ai ouverts vont bien ».
