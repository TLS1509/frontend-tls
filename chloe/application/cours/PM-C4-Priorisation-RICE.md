# PM · Cours 4 — Priorisation : RICE, et pourquoi le score ordonne mais ne décide pas

**Piste : Product Management appliqué à la learning app.**

## Structure EDRACT — ~30 minutes

> Suite de [PM-C1→C3](PM-C1-Qu-est-ce-que-le-Product-Management.md). Le/la learner,
> c'est **toi**. L'étape *Appliquer* priorise ton **vrai backlog**. Contexte TLS réel,
> estimations étiquetées comme telles. Sources vérifiables en fin.

---

## 📖 INTRODUCTION

### Contexte et enjeu
Tu as plus de bonnes idées que de temps. Le passeport à muscler, le SRS à construire,
le balayage contraste, la promesse site à corriger, dix autres choses… À deux
fondateurs, **choisir, c'est le métier** (PM-C1). Ce cours te donne un outil pour
ordonner — et te rappelle qu'un outil **ordonne**, il ne **décide** pas à ta place.

### 🎯 Ce que tu vas apprendre
À la fin, tu sauras :
1. **Calculer** un score RICE (Reach × Impact × Confidence ÷ Effort).
2. **Interpréter** ce score comme un **classement**, pas un verdict.
3. **Filtrer** chaque candidat par le **filtre EdTech** (RGPD + validité pédagogique).
4. **Prioriser** trois éléments de ton vrai backlog.

### 💡 Pourquoi c'est important
Sans méthode, on construit **le plus bruyant** (l'idée récente, la demande la plus
insistante), pas le plus **utile**. RICE te force à comparer des choux et des carottes
sur la même échelle — et à rendre tes hypothèses visibles.

---

## 1️⃣ ENGAGEMENT — Le backlog qui déborde

### 🎬 Scénario — un vrai, le tien
Sur la table, en vrac : (a) construire un vrai SRS (répétition espacée), (b) balayer
le contraste de l'app, (c) muscler le passeport (evidence), (d) corriger la promesse
« répétition espacée » du site. Tu ne peux pas tout faire ce mois-ci. Lequel d'abord ?

### 🤔 Question clé
Si tu réponds « le SRS, parce que ça m'excite le plus » ou « le contraste, parce que
c'est frais dans ma tête » — tu priorises par **saillance**, pas par **valeur**. La
question du cours : *comment comparer des tâches très différentes sur une échelle
commune, sans me mentir sur mes estimations ?*

---

## 2️⃣ DÉCOUVRIR — Contenu principal

### 📚 PARTIE 1 · RICE, les quatre facteurs
RICE (Intercom, 2016) note chaque candidat sur quatre facteurs :

| Facteur | Question | Unité |
|---|---|---|
| **R — Reach** | Combien de personnes touchées sur une période ? | nb (ex. /trimestre) |
| **I — Impact** | Quel effet par personne ? | échelle 0,25 / 0,5 / 1 / 2 / 3 |
| **C — Confidence** | À quel point suis-je sûre de R et I ? | % (100/80/50) |
| **E — Effort** | Combien de travail ? | personne-mois |

**Score = (Reach × Impact × Confidence) ÷ Effort.** Un chiffre unique, comparable
entre candidats. Le Confidence est le garde-fou anti-enthousiasme : une idée
séduisante mais spéculative est **pénalisée** par un Confidence bas.

### 📚 PARTIE 2 · Un exemple travaillé — le SRS
Reprenons le SRS (valeurs **estimées**, pas mesurées) :
- Reach 10 · Impact 5… ⚠️ Impact 5 n'existe pas sur l'échelle (max 3). Corrigeons :
  **Impact 3** (massif : c'est la technique d'apprentissage la mieux étayée).
- Confidence **80 %** · Effort **6** personne-mois.
- **RICE = (10 × 3 × 0,8) ÷ 6 = 4,0.**

Comparons à la **correction de la promesse site** (retirer « répétition espacée » de
la page) :
- Reach 8 · Impact 1 (évite un tort, n'ajoute pas de valeur d'apprentissage) ·
  Confidence 100 % · Effort **0,1**.
- **RICE = (8 × 1 × 1) ÷ 0,1 = 80.**

👉 Le petit correctif d'honnêteté **écrase** le gros chantier au score RICE — parce
que son Effort est minuscule et sa Confidence maximale. C'est le genre de vérité que
RICE fait apparaître et que l'intuition rate.

### 📚 PARTIE 3 · Le score ordonne, il ne décide pas
⚠️ Les entrées de RICE sont des **estimations**. Le score **classe**, il ne tranche
pas :
- À **deux fondateurs**, l'**Effort** pèse beaucoup plus que dans une équipe de douze
  — une même feature n'a pas le même RICE selon ta capacité.
- Un Confidence honnête vaut mieux qu'un Confidence gonflé pour « faire remonter » son
  idée préférée. RICE ne vaut que si tu ne triches pas avec toi-même (loi de Goodhart,
  PM-C3 : dès que le score devient la cible, on le manipule).
- Certaines choses **hors RICE** priment : une dette d'honnêteté, une obligation
  légale, un bug bloquant.

### 📚 PARTIE 4 · Le filtre EdTech (avant le score)
Avant même de classer, chaque candidat passe un **filtre éliminatoire** (module 10 du
parcours UX/UI) :
1. **RGPD / données d'apprenants** — la feature respecte-t-elle la protection des
   données ?
2. **Validité pédagogique** — une feature qui **augmente l'engagement en nuisant à
   l'apprentissage est écartée, quel que soit son score RICE.**

Le filtre passe **avant** RICE : inutile de scorer finement quelque chose qu'on ne
construira pas pour raison éthique ou légale.

---

## 3️⃣ RÉFLÉCHIR — Quiz et journal

### Quiz (5 min)
De mémoire, **confiance déclarée avant de vérifier** (🟢/🟡/🔴).

1. Écris la formule RICE et dis à quoi sert le facteur **Confidence**.
2. Pourquoi un **petit** correctif peut-il battre un **gros** chantier au score RICE ?
3. Que fait le **filtre EdTech**, et **quand** l'applique-t-on (avant ou après le score) ?

<details>
<summary>Vérifier</summary>

1. **(Reach × Impact × Confidence) ÷ Effort.** Confidence = garde-fou anti-enthousiasme :
   il pénalise les idées séduisantes mais spéculatives.
2. Parce que son **Effort est minuscule** et sa **Confidence maximale** — le ratio
   explose (ex. correctif site RICE 80 vs SRS 4).
3. Il élimine ce qui viole RGPD ou nuit à l'apprentissage — **avant** le score (inutile
   de scorer ce qu'on ne construira pas).
</details>

### 💭 Journal personnel
À écrire : *quelle idée de mon backlog est-ce que je « veux » construire pour de
mauvaises raisons (elle m'excite) — et que dirait un Confidence honnête ?*

---

## 4️⃣ APPLIQUER — Ton chantier réel

### 🛠️ Cas : scorer ton vrai backlog
Prends **trois** éléments réels (ex. SRS, balayage contraste, evidence passeport).

### Ta mission (cette semaine)
1. **Filtre EdTech** d'abord : un des trois viole-t-il RGPD ou la validité pédagogique ?
2. **Score RICE** chacun (R, I sur 0,25-3, C en %, E en personne-mois). Étiquette chaque
   entrée **estimation**.
3. **Classe** par score.
4. **Regarde le classement et décide** — le suis-tu, ou une raison hors RICE (honnêteté,
   légal, dépendance) le renverse-t-elle ? Écris **pourquoi**.

### Correction suggérée
Piège n°1 : gonfler le Confidence de son idée préférée (Goodhart). Piège n°2 : suivre le
score **aveuglément** — RICE ordonne, **tu** décides, surtout quand une dette
d'honnêteté (la promesse site) doit passer avant un chantier « plus gros ».

---

## 5️⃣ CONSOLIDER — Synthèse

### ✅ Ce que tu as appris
- **RICE = (R × I × C) ÷ E** — une échelle commune pour des candidats différents.
- Un **petit correctif à fort Effort-ratio** bat souvent un gros chantier.
- Le score **ordonne**, il ne **décide** pas ; à deux, l'**Effort** domine.
- Le **filtre EdTech** (RGPD + pédagogie) passe **avant** le score.

### 🎯 Les 3 mantras
| Mantra | Sens |
|---|---|
| **« Le score ordonne, tu décides »** | RICE est une boussole, pas un juge |
| **« Confidence honnête »** | Gonfler ses estimations, c'est se mentir (Goodhart) |
| **« Le filtre avant le score »** | Ce qui nuit à l'apprenant est écarté, peu importe le RICE |

### 💡 Citation
> *« RICE : une manière simple pour les PM de prioriser sur une échelle commune. »*
> — d'après Sean McBride, Intercom (2016).

---

## 6️⃣ TRANSFÉRER — Ce que tu fais cette semaine

1. **Le livrable** : ton tableau RICE de 3 candidats + le classement + ta décision
   finale motivée (score suivi, ou raison hors-RICE qui le renverse).
2. **Rappel espacé** — **à J+2 puis J+7**, sans rouvrir ce doc : redonne la **formule
   RICE** et **pourquoi le score n'est pas la décision**. Blocage → revue J+14.

---

## 📦 CONTENUS COMPLÉMENTAIRES
- **Pour aller plus loin** : le billet RICE d'Intercom · ICE (version allégée) ·
  matrice valeur/effort · MoSCoW (autres méthodes de priorisation).
- **Prochain cours** : PM-C5 — North Star & métriques qui ne peuvent pas monter contre
  l'apprenant.

---

## Sources
- **McBride, S. (2016).** *RICE: Simple prioritization for product managers.* Intercom
  (intercom.com/blog). → le cadre RICE et sa formule.
- **Filtre EdTech** : parcours UX/UI TLS, module 10 (priorisation & feuille de route) —
  RGPD + validité pédagogique comme filtre éliminatoire.

---

*PM-C4 rédigé le 2026-07-24, structure EDRACT (paraphrase des modules IP), backlog TLS
réel. Prochain : PM-C5 — North Star.*
