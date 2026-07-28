# UX/UI · Cours 1 — Le socle visuel : typographie, couleur & contraste (mesuré), espacement

**Piste : UX/UI & Webdesign — les bases.**

## Structure EDRACT — ~30 minutes

> Même gabarit que tes modules IP ([`00-CADRE-PEDAGOGIQUE.md`](00-CADRE-PEDAGOGIQUE.md)).
> Le/la learner, c'est **toi** — tu construis le socle visuel de la learning app.
> L'étape *Appliquer* porte sur ton vrai code. Les ratios de contraste de ce cours
> sont **calculés**, pas estimés (WCAG 2.1), et repris de l'audit UX/UI réel du dépôt.
> Sources vérifiables en fin.

---

## 📖 INTRODUCTION

### Contexte et enjeu
Le socle visuel — typographie, couleur, espacement — porte la quasi-totalité de ce
que l'utilisateur perçoit. Bien réglé, il devient invisible (l'utilisateur lit sans
effort). Mal réglé, il fatigue, exclut, ou rend illisible. Ce cours te donne les
trois réglages de base et la règle qui les gouverne tous : **mesurer, ne jamais
supposer.**

### 🎯 Ce que tu vas apprendre
À la fin, tu sauras :
1. **Appliquer** une hiérarchie typographique et la règle « deux polices maximum ».
2. **Calculer** un ratio de contraste et **décider** si un texte passe WCAG AA.
3. **Distinguer** une couleur de *texte* d'une couleur *décorative* (le piège du teal
   de marque).
4. **Aligner** les espacements sur une échelle base-4.

### 💡 Pourquoi c'est important
Le contraste n'est pas une coquetterie d'accessibilité : c'est de la **lisibilité
pour tout le monde**, et c'est le seul point où ton produit — qui *enseigne*
l'accessibilité — se doit d'être irréprochable. Un module qui apprend le contraste
sur une interface au contraste raté, c'est une contradiction que l'utilisateur voit.

---

## 1️⃣ ENGAGEMENT — « l'orange sûr » qui ne l'est pas

### 🎬 Scénario — un vrai, tiré de ton audit
Tout le monde « sait » que le teal clair de marque (`#55A1B4`) ne fait pas un bon
texte. Mais l'audit a trouvé plus vicieux : **`secondary-600` (#C06920), l'orange
qu'on croit « sûr » parce qu'il est foncé, échoue lui aussi** en texte normal —
**3,98:1**, sous le seuil de 4,5. Et il n'existe **aucun** token orange lisible en
corps de texte avant le 700.

### 🤔 Question clé
Comment le sais-tu ? Pas à l'œil — l'œil se trompe, c'est exactement ce qui a produit
l'erreur « #55A1B4 = 4,6:1 » répétée cinq fois dans tes propres slides. On le sait en
**calculant**. La question de tout ce cours : *quel signal me dit qu'un réglage
visuel est bon — mon impression, ou une mesure ?*

---

## 2️⃣ DÉCOUVRIR — Contenu principal

### 📚 PARTIE 1 · Typographie : deux polices, une hiérarchie
- **Deux polices maximum.** TLS = **League Spartan** (titres, display) + **Nunito**
  (corps). Une troisième police = bruit visuel, poids de chargement, maintenance.
  (Le mono technique ne compte pas — il sert le code, pas la lecture courante.)
- **Une hiérarchie explicite** : H1 48-60px, H2 36-48, H3 24-30, corps 16, légende 12.
  Ce qui crée la hiérarchie : **taille, graisse, couleur, espace** — pas la fantaisie.
- **Deux réglages de lisibilité** : interligne ~1,5 pour le corps (1,2 pour les
  titres), et **longueur de ligne 50-75 caractères** — au-delà, l'œil se perd en
  revenant à la ligne. Corps **≥ 16px** (en dessous, on fatigue).

### 📚 PARTIE 2 · Couleur : des tokens en trois couches
On ne met pas des hex dans les composants. On empile trois couches :
```
Primitives (valeurs brutes)      --blue-500: #55A1B4;
      ↓
Sémantiques (intention)          --color-brand-primary: var(--blue-500);
      ↓
Composant (usage)                --btn-primary-bg: var(--color-brand-primary);
```
Bénéfice : une source de vérité unique, un mode sombre par simple échange de valeurs,
une maintenance à un seul endroit.

### 📚 PARTIE 3 · Contraste — la partie qu'on MESURE
Les seuils WCAG 2.1 (AA) sont fixes : **texte normal ≥ 4,5:1**, **grand texte
(≥ 24px, ou ≥ 18,66px gras) ≥ 3:1**, éléments non-textuels ≥ 3:1. Voici tes tokens,
**calculés sur blanc** (première main) :

| Token | Ratio /blanc | Texte normal | Grand texte |
|---|---|---|---|
| `primary-500` #55A1B4 | 2,94 | ❌ | ❌ |
| `primary-600` #4A8FA1 | 3,66 | ❌ | ✅ |
| **`primary-700` #3D7786** | **5,02** | ✅ | ✅ |
| `secondary-500` #ED843A | 2,64 | ❌ | ❌ |
| `secondary-600` #C06920 | 3,98 | ❌ | ✅ |
| **`secondary-700` #8F5017** | **~5,9** | ✅ | ✅ |
| `accent-400` #F8B044 (jaune) | 1,86 | ❌ | ❌ |
| `ink-500` #6B7280 (neutre) | 4,83 | ✅ | ✅ |

**La règle qui en découle** : le teal et l'orange de marque sont des couleurs de
**fond et de décor**, pas de **texte**. Pour du texte teal → `primary-700` mini ;
orange en corps de texte → à éviter (réserver aux fonds / gros display) ; **jaune →
jamais du texte**, aucune taille. Sur fond teinté (primary-50) il faut descendre
encore d'un cran (le 800).

⚠️ **Le piège inverse** : sur un **héros sombre**, le jaune ou le teal en **gros
titre** passent (seuil grand texte). Donc on ne « corrige » pas tout aveuglément — on
mesure *par contexte* (taille réelle + fond réel).

### 📚 PARTIE 4 · Espacement : tout en base-4
Tous les espacements sont des multiples de 4px (`4, 8, 12, 16, 24, 32, 48`). Pourquoi :
ça s'aligne sur les grilles, ça reste extensible, et ça supprime le bricolage `7px`
ici / `13px` là. Padding interne (dans le composant) vs marge externe (entre
composants). Carte : padding ≥ 20px ; section : ≥ 48px. Ombres **douces** (opacité
0,04-0,06), jamais dures.

---

## 3️⃣ RÉFLÉCHIR — Quiz et journal

### Quiz (5 min)
De mémoire, **confiance déclarée avant de vérifier** (🟢/🟡/🔴).

1. Contraste minimal WCAG AA pour du **texte normal** ? Et pour du **grand texte** ?
2. `secondary-600` (#C06920, 3,98:1) : bon pour un **titre** ? bon pour du **corps** ?
3. Pourquoi ne faut-il **jamais** régler un contraste « à l'œil » ?

<details>
<summary>Vérifier</summary>

1. **4,5:1** (normal) · **3:1** (grand texte ≥ 24px ou ≥ 18,66px gras).
2. Titre **oui** (≥ 3), corps **non** (< 4,5). C'est le piège de « l'orange sûr ».
3. Parce que l'œil se trompe — c'est ainsi qu'« #55A1B4 = 4,6:1 » (faux, c'est 2,94)
   s'est glissé 5× dans les slides. Seul le calcul tranche.
</details>

### 💭 Journal personnel
À écrire : *où, dans l'app, ai-je utilisé une couleur de marque (teal/orange/jaune)
comme couleur de **texte** en croyant que « ça passe » — sans l'avoir mesuré ?*

---

## 4️⃣ APPLIQUER — Ton chantier réel

### 🛠️ Cas : mesurer avant de corriger
L'audit a laissé un chantier P0 : **balayer les `text-*` de marque par contexte**.
Fais-en un échantillon toi-même.

### Ta mission (cette semaine)
1. Ouvre **une** page de l'app dans le navigateur.
2. Repère 3 textes en teal/orange/jaune (liens, eyebrows, pastilles).
3. Pour chacun, relève la couleur et le fond réels (l'inspecteur donne les valeurs
   calculées) et **calcule le ratio** (WebAIM Contrast Checker, ou la sonde
   `getComputedStyle` mentionnée dans l'audit).
4. Classe : ✅ passe / ❌ échoue / 🟡 légitime car gros texte sur fond sombre.
5. Corrige **un** échec confirmé (ex. `text-primary-600` petit → `primary-700`).

### Correction suggérée
Le piège n°1 : « corriger » un titre jaune sur héros sombre qui, lui, **passe** — et
casser le design. Le piège n°2 : conclure « tout le teal est cassé » (faux : `700`
passe). La discipline, c'est **un verdict par élément**, mesuré.

---

## 5️⃣ CONSOLIDER — Synthèse

### ✅ Ce que tu as appris
- Deux polices, une hiérarchie explicite, corps ≥ 16px, ligne 50-75 caractères.
- Couleur en trois couches de tokens.
- Le contraste se **mesure** ; teal/orange/jaune de marque = décor, pas texte.
- Espacement en base-4, ombres douces.

### 🎯 Les 3 mantras
| Mantra | Sens |
|---|---|
| **« Mesurer, jamais supposer »** | L'œil valide « #55A1B4 = 4,6:1 » ; le calcul dit 2,94 |
| **« La couleur de marque est décorative »** | Le teal de texte, c'est `primary-700`, pas `500` |
| **« Un verdict par contexte »** | Taille réelle + fond réel — pas de balayage aveugle |

### 💡 Citation
> *« Web design is 95 % typography. »* — Oliver Reichenstein (2006). Une thèse
> rhétorique, pas une mesure : soigner la typo, c'est soigner l'essentiel de ce qu'on
> lit.

---

## 6️⃣ TRANSFÉRER — Ce que tu fais cette semaine

1. **Le livrable** : ton mini-tableau « élément → couleur/fond → ratio → verdict » sur
   une page réelle, + un échec corrigé. Il alimente le chantier P0 de l'audit.
2. **Rappel espacé** — **à J+2 puis J+7**, sans rouvrir ce doc : redonne les **deux
   seuils WCAG** (normal / grand) et **le token teal minimal pour du texte**. Blocage
   → revue J+14.

---

## 📦 CONTENUS COMPLÉMENTAIRES
- **Pour aller plus loin** : *Refactoring UI* (Wathan & Schoger) · *Thinking with
  Type* (Ellen Lupton) · WebAIM Contrast Checker · l'audit du dépôt
  [`AUDIT-UXUI-APP-ET-SITE.md`](../AUDIT-UXUI-APP-ET-SITE.md).
- **Prochain cours** : UXUI-C2 — les 4C (Clarté, Cohérence, Contraste, Confort).

---

## Sources
- **W3C — WCAG 2.1**, *Success Criterion 1.4.3 Contrast (Minimum)* et *1.4.11
  Non-text Contrast*. w3.org → les seuils 4,5:1 / 3:1.
- **Reichenstein, O. (2006).** *Web Design is 95 % Typography.* ia.net → la thèse
  typographique (rhétorique, pas mesure).
- **Lupton, E. (2010).** *Thinking with Type* (2ᵉ éd.). Princeton Architectural Press.
- **Wathan, A., & Schoger, S. (2018).** *Refactoring UI.* → hiérarchie, espacement,
  couleur en pratique.
- **Ratios de contraste** : calculés de première main (WCAG 2.1) le 2026-07-24 ;
  cohérents avec l'audit du dépôt.

---

*UXUI-C1 rédigé le 2026-07-24, structure EDRACT (paraphrase des modules IP). Ratios
mesurés, pas estimés. Prochain : UXUI-C2 — les 4C.*
