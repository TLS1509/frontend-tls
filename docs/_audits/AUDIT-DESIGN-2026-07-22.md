# Audit doc design — 2026-07-22

_Cinq documents confrontés au code réel : `DESIGN.md`, `DESIGN-IMPECCABLE.md`,
`docs/site/DESIGN-INSPO.md`, `PRODUCT.md`, `.claude/stitch-design-system.md`.
Chaque dérive ci-dessous a été établie contre un fichier source, pas estimée._

**Statut : rien n'est appliqué.** Ce document est une liste de travail, pas un
état des lieux corrigé. Trois arbitrages (§2) conditionnent le reste.

---

## 1. La cause racine

> ⚠️ **Correction du 2026-07-22, après vérification contradictoire.** La première
> version de ce document affirmait que `src/index.css` était la source unique des
> tokens. **C'est faux.** Il y a en réalité **quatre référentiels** : trois
> fichiers CSS tous chargés (§1 bis) et un `spec.json` fossile encore cité comme
> autorité par 9 composants (§1 ter). Commencer par §1 ter : c'est le seul qui
> produit *encore activement* de la dérive.

Quatre informations sont écrites **trois fois chacune** dans la doc. Mais la
cause racine est plus profonde : **le code lui-même a deux systèmes de tokens.**

| Information | Source à retenir | Ce que les autres docs doivent faire |
|---|---|---|
| Valeurs de tokens | **voir §1 bis — ce n'est pas un seul fichier** | Ne garder que la **structure**. **Jamais les hex.** |
| Voice, cadence, doctrine IA | **`PRODUCT.md`** | Lier, ne pas recopier |
| Pièges connus | **`CLAUDE.md`** | Pointer, ne pas compter |
| Faits business / marque | **`docs/_canon/FACTS-CANON.md`** | Ne rien propager hors canon |

---

## 1 ter. Le fossile : `src/design-system/spec.json`

**C'est la cause racine la plus profonde, et la plus facile à corriger.**

| Fait | Vérification |
|---|---|
| **9 fichiers le déclarent « Source of truth »** dans leur en-tête | `Button.tsx:5`, `Card.tsx:10`, `Modal`, `Toast`, `Alert`, `StatCard`, `Medal`, `Skeleton`, `Components.tsx` |
| Daté du **2026-04-24**, jamais retouché | dernier commit : 2026-04-25 « Initial frontend handoff package » |
| **Jamais importé** — aucune dépendance runtime | `grep -rn "import.*spec.json" src` → vide |
| Ses **5 feuilles de style déclarées n'existent plus** | `tokens.css`, `shell.css`, `components.css`, `learning.css`, `patterns.css` — `src/styles/` ne contient que `design-tokens.css`, `globals.css`, `dark-mode-tokens.css` |
| **15 de ses 51 couleurs n'existent nulle part** dans le code | dont `#12181C`, `#535B62`, `#EEF2F4`, `#F5F8F8`, `#C8D2D6`, `#9AA8AE`, `#7C5822` |

Ces 15 couleurs sont **exactement** l'échelle de gris teintée teal abandonnée que
`.claude/stitch-design-system.md` portait encore. **Le fossile est la source de la
dérive** : qui suit le commentaire de `Card.tsx` atterrit sur la palette d'avril.

Parce qu'il n'est jamais importé, **rien ne casse et rien ne signale qu'il ment**.
C'est le pire des deux mondes : autorité déclarée, zéro contrainte de vérité.

**Décision à prendre :** le supprimer et retirer les 9 commentaires « Source of
truth », ou le régénérer depuis le code et l'y arrimer. Ne pas le laisser en
l'état — c'est la seule chose de ce document qui *continue activement* à
produire de la dérive.

---

## 1 bis. Il y a DEUX systèmes de tokens, tous deux chargés

C'est la vraie cause racine. Elle a été trouvée parce que deux vérificateurs se
sont contredits sur la valeur d'une bordure : chacun lisait un fichier différent,
**et tous les deux avaient raison**.

| Fichier | Déclarations `--*` | Chargé ? |
|---|---|---|
| `src/index.css` (`@theme`) | 230 | oui — racine |
| **`src/styles/design-tokens.css`** | **375** | oui — `index.css:7` → `globals.css:17`, `layer(base)` |
| `src/styles/dark-mode-tokens.css` | 104 | oui — `globals.css:19` |

**709 déclarations réparties sur 3 fichiers**, tous actifs. Le plus gros n'est
pas celui que je désignais comme source unique, et son en-tête l'annonce comme
*« THE LEARNING SOCIETY — DESIGN SYSTEM TOKENS. Rationalized, curated,
documented. »* — pas comme un vestige.

Les deux systèmes couvrent **les mêmes rôles sous des noms différents** :

| Rôle | `index.css` | `design-tokens.css` |
|---|---|---|
| bordure standard | `--color-border-default: #e5e7eb` | `--border: rgba(26,26,26,0.08)` |
| bordure appuyée | `--color-border-strong: #d1d5db` | `--border-strong: rgba(26,26,26,0.14)` |

Opaque d'un côté, translucide de l'autre. **Ce ne sont pas deux écritures de la
même valeur, ce sont deux décisions de design différentes**, toutes deux livrées.

### Ce que ça implique

- **Ne corrigez aucune doc « vers `index.css` » sans vérifier `design-tokens.css`.**
  Plusieurs valeurs que ce document donnait pour fausses sont en réalité justes —
  elles viennent de l'autre fichier, que les docs concernées déclarent
  explicitement comme source (`.claude/stitch-design-system.md:455`).
- **Les couleurs de marque, elles, concordent** (`#55A1B4`, `#ED843A`, `#252B37`
  présents dans les deux). La divergence porte sur les **tokens sémantiques**
  (bordures, surfaces), pas sur la palette. Les corrections du §3 sur les hex de
  marque restent donc valides.
- **L'arbitrage à poser est celui-ci, avant tous les autres :** un seul système de
  tokens, ou deux assumés avec un périmètre écrit pour chacun ? Tant qu'il n'est
  pas tranché, toute « resynchronisation » de doc rejouera cette contradiction.

**La règle à écrire en tête de chaque doc** (une fois l'arbitrage rendu) :
> Valeurs de tokens : source = *(le fichier retenu)*. Ce document décrit la
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
| ~~`#fef3e2`~~ | surface-cream | **`#fefaf5`** — ✅ **déjà appliqué** (commit b6e68d0) |
| ~~`#1a1a1a`~~ | ink-deepest | **`#252B37`** — ✅ **déjà appliqué** (commit b6e68d0) |

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

> ⚠️ **Numéros de ligne `DESIGN.md` recalés le 2026-07-22.** Les premiers cités
> étaient antérieurs au commit b6e68d0, qui a ajouté ~17 lignes et décalé tout ce
> qui suit. Vérifiez toujours le titre, pas seulement le numéro.

1. `DESIGN.md` **L563-572** « Deprecated ❌ (remove post-Phase 14) » — les 6 fichiers sont supprimés *(L553-562 est le tableau « To Evolve », à ne pas confondre)*
2. `DESIGN.md` **L677-683** « Pages catalog (Tier 1/2/3 — Phase 10) » — 35 pages listées contre **151 réelles**, compteur figé
3. `DESIGN.md` **L522** `## 4. Patterns canoniques — Stability Status` — doublon du titre de L266, statuts divergents
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
