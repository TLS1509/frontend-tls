# UX/UI · Cours 3 — Design tokens & design system : la source de vérité unique

**Piste : UX/UI & Webdesign — les bases.**

## Structure EDRACT — ~30 minutes

> Suite de [UXUI-C1](UXUI-C1-Socle-visuel-typo-couleur-contraste-espacement.md) et
> [C2](UXUI-C2-Les-4C.md). Le/la learner, c'est **toi** — tu as **déjà** construit un
> design system (>90 composants). Ce cours nomme ce que tu as fait et en révèle le
> piège central. L'étape *Appliquer* porte sur ton vrai code. Sources en fin.

---

## 📖 INTRODUCTION

### Contexte et enjeu
Un design system, c'est *« a living, breathing system of components and standards that
serves as the single source of truth »* (formulation InVision). Trois mots comptent :
**single source of truth.** Tout le reste — tokens, composants, doc — n'existe que pour
faire tenir cette promesse. Et c'est précisément là que ça casse le plus souvent, y
compris dans ton dépôt.

### 🎯 Ce que tu vas apprendre
À la fin, tu sauras :
1. **Nommer** les couches d'un design system (tokens → composants → patterns).
2. **Structurer** des tokens en trois niveaux (primitive → sémantique → composant).
3. **Reconnaître** le **drift** : un même concept défini à deux endroits → l'app ment.
4. **Rétablir** une source de vérité unique.

### 💡 Pourquoi c'est important
Un design system n'est pas une collection de jolis composants : c'est une **promesse de
cohérence**. Une valeur définie deux fois finit **toujours** par mentir — et l'app
affiche alors deux vérités. Savoir repérer et couper ça, c'est le cœur du métier.

---

## 1️⃣ ENGAGEMENT — Deux gris, un seul mot

### 🎬 Scénario — un vrai, dans ton dépôt
`--tls-ink-900` valait `#252B37` (un gris **teinté teal**) et `--color-ink-900` valait
`#1a1a1a` (un gris **neutre**). Deux noms, **même concept** (« l'encre la plus foncée »),
**deux valeurs**. Résultat : selon qu'un composant était Tailwind (`bg-ink-900` → neutre)
ou legacy BEM (`var(--tls-ink-900)` → teinté), **l'app affichait deux gris différents**.
Personne ne l'avait décidé — c'est le système qui divergeait tout seul.

### 🤔 Question clé
Aucune de ces deux valeurs n'est « fausse » isolément. Le défaut n'est pas dans une
valeur, il est dans le **fait qu'il y en ait deux** pour un seul concept. La question du
cours : *comment garantir qu'un concept n'a qu'**une** valeur, partout ?*

---

## 2️⃣ DÉCOUVRIR — Contenu principal

### 📚 PARTIE 1 · Les couches d'un design system
| Couche | Contient | Exemple TLS |
|---|---|---|
| **Tokens** | les valeurs (couleur, espace, rayon, ombre) | `@theme` de `index.css` |
| **Noyau** | atomes : bouton, champ, badge, pastille | `components/core`, `ui` |
| **Composites** | carte, modale, onglets, accordéon | `components/patterns` |
| **Patterns** | formulaires, états vides, pages d'erreur | `ErrorPage`, `EmptyState` |

Bénéfices : **cohérence** (un style de bouton = toutes les pages), **vitesse**
(assembler, pas redessiner), **maintenance** (un correctif se propage), **intégration**
(un guide, pas cinquante PDF).

### 📚 PARTIE 2 · Les tokens en trois couches
```
Couche 1 — PRIMITIVES (valeurs brutes)
   --blue-500: #55A1B4;   --space-4: 16px;
        ↓
Couche 2 — SÉMANTIQUES (intention)
   --color-brand-primary: var(--blue-500);
        ↓
Couche 3 — COMPOSANT (usage)
   --btn-primary-bg: var(--color-brand-primary);
```
On ne met **jamais** un hex dans un composant. On pointe vers un token. Bénéfice : un
mode sombre par simple échange de valeurs, une palette extensible, une maintenance à un
seul endroit. (C'est ce que tu as fait avec `@theme`.)

### 📚 PARTIE 3 · Atomic Design & anatomie d'un composant
- **Atomic Design** (Brad Frost) : atomes → molécules → organismes → gabarits → pages.
  Une méthode pour ranger le système du plus petit au plus grand.
- **Anatomie d'un composant** = une partie visuelle + des **variantes** + des **props**.
  Ex. bouton : variantes (primaire/secondaire/fantôme/danger) × taille (S/M/L) × état
  (défaut/survol/focus/actif/désactivé/chargement) ; props (`label`, `variant`, `size`,
  `icon`, `disabled`, `loading`).
- **Documenter** : chaque composant a un usage, des variantes, des à-faire/à-éviter, des
  props typées, des notes d'accessibilité. Ton showcase, c'est `Components.tsx` (pas
  Storybook — et c'est un choix légitime).

### 📚 PARTIE 4 · Le piège central — le drift
Le **drift**, c'est le même concept défini à deux endroits avec des valeurs qui
divergent. Il est **silencieux** (aucune erreur), et il ment à l'écran. Deux cas réels
de ton dépôt :
- **Les deux gris** (Engagement) : `--tls-ink-900` ≠ `--color-ink-900`. Fix : aliaser
  l'ancien sur le nouveau → **une** source de vérité (`index.css`).
- **Les ombres lettre-morte** : 11 tokens `--shadow-*` de `@theme` étaient **écrasés**
  par `design-tokens.css` — modifier `@theme` n'avait **aucun effet visible**. On croyait
  piloter une valeur qu'on ne pilotait pas. Fix : supprimer les doublons, une définition
  par token.

**La règle** : un concept = **une** définition, à **un** endroit. Toute redéfinition
ailleurs doit être un **alias** (`var(--la-vraie-source)`), jamais une seconde valeur.

⚠️ Le piège se détecte par la **mesure**, pas par la lecture : `getComputedStyle()` dit
la valeur *réellement* appliquée — souvent différente de celle qu'on croit avoir écrite.

---

## 3️⃣ RÉFLÉCHIR — Quiz et journal

### Quiz (5 min)
De mémoire, **confiance déclarée avant de vérifier** (🟢/🟡/🔴).

1. Cite les **trois couches** de tokens et donne un exemple de chacune.
2. Qu'est-ce que le **drift**, et pourquoi est-il dangereux ?
3. Comment vérifier la valeur **réellement** appliquée à un élément ?

<details>
<summary>Vérifier</summary>

1. **Primitive** (`--blue-500: #55A1B4`) → **sémantique** (`--color-brand-primary`) →
   **composant** (`--btn-primary-bg`).
2. Un même concept défini à **deux endroits** avec des valeurs divergentes — dangereux
   car **silencieux** (aucune erreur) et il fait mentir l'écran (deux gris, ombre
   lettre-morte).
3. **`getComputedStyle()`** — il donne la valeur réellement appliquée, pas celle qu'on
   croit avoir écrite.
</details>

### 💭 Journal personnel
À écrire : *où, dans le code, ai-je peut-être une valeur en dur (un hex, un `16px`) qui
devrait pointer vers un token — et que je « verrai » cohérente jusqu'au jour où je
changerai le token et que rien ne bougera ?*

---

## 4️⃣ APPLIQUER — Ton chantier réel

### 🛠️ Cas : traquer un drift
Dans ton dépôt, cherche **une** valeur suspecte : un hex en dur dans un composant, ou un
token qui semble défini à deux endroits (`@theme` vs `design-tokens.css`).

### Ta mission (cette semaine)
1. **Repère** une valeur en dur ou un token potentiellement dupliqué.
2. **Mesure** avec `getComputedStyle()` sur l'élément concerné : la valeur appliquée
   est-elle celle attendue ?
3. **Unifie** : remplace le hex en dur par le token, ou transforme le doublon en
   **alias** (`var(--la-vraie-source)`).
4. **Re-mesure** pour confirmer.

### Correction suggérée
Piège n°1 : « corriger » en changeant la mauvaise des deux définitions — d'où
l'importance de `getComputedStyle` pour savoir **laquelle gagne** dans la cascade. Piège
n°2 : ajouter une **troisième** valeur au lieu d'aliaser sur la source unique — tu
empires le drift.

---

## 5️⃣ CONSOLIDER — Synthèse

### ✅ Ce que tu as appris
- Un design system = **une source de vérité unique** (tokens + composants + doc + code).
- Tokens en **trois couches** (primitive → sémantique → composant), jamais un hex en dur.
- Le **drift** (un concept, deux valeurs) est silencieux et fait mentir l'écran.
- Un concept = **une** définition ; toute redéfinition = un **alias**, mesuré via
  `getComputedStyle`.

### 🎯 Les 3 mantras
| Mantra | Sens |
|---|---|
| **« Single source of truth »** | Un concept, une valeur, un endroit |
| **« Une redéfinition = un alias »** | Jamais une seconde valeur pour le même concept |
| **« Mesurer ce qui s'applique »** | `getComputedStyle` dit la vérité, pas le code lu |

### 💡 Citation
> *« A living, breathing system of components and standards that serves as the single
> source of truth. »* — formulation InVision d'un design system.

---

## 6️⃣ TRANSFÉRER — Ce que tu fais cette semaine

1. **Le livrable** : un drift (ou un hex en dur) repéré, mesuré, unifié, re-mesuré.
2. **Rappel espacé** — **à J+2 puis J+7**, sans rouvrir ce doc : redonne les **trois
   couches** de tokens et la **règle** « un concept = une définition, sinon un alias ».
   Blocage → revue J+14.

---

## 📦 CONTENUS COMPLÉMENTAIRES
- **Pour aller plus loin** : Brad Frost, *Atomic Design* (atomicdesign.bradfrost.com) ·
  les sections « tokens » et « pièges » de ton `CLAUDE.md` (drift ink-900, shadows
  lettre-morte).
- **Prochain cours** : UXUI-C4 — architecture de l'information & piste informationnelle.

---

## Sources
- **Frost, B. (2016).** *Atomic Design.* atomicdesign.bradfrost.com → atomes → …→ pages.
- **InVision.** *Design Systems Handbook.* → « single source of truth » (formulation
  reprise dans le module 4 UX/UI TLS).
- **Cas internes vérifiables** : `CLAUDE.md` du dépôt TLS — « token-unification »
  (`--tls-ink-*` aliasé sur `@theme`) et la correction des 11 `--shadow-*` lettre-morte.

---

*UXUI-C3 rédigé le 2026-07-24, structure EDRACT (paraphrase des modules IP), cas de drift
réels du dépôt. Prochain : UXUI-C4 — architecture de l'information.*
