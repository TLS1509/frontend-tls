# Vibe coding · Cours 2 — Le document de pilotage (CLAUDE.md) comme system prompt de ton projet

**Piste : Vibe coding.**

## Structure EDRACT — ~25 minutes

> Suite de [VIBE-C1](VIBE-C1-Qu-est-ce-que-le-vibe-coding.md), même gabarit
> ([`00-CADRE-PEDAGOGIQUE.md`](00-CADRE-PEDAGOGIQUE.md)). Le/la learner, c'est **toi** —
> tu **possèdes déjà** un document de pilotage énorme (`CLAUDE.md`). Ce cours nomme ce que
> tu fais et en révèle le levier. L'étape *Appliquer* porte sur ton vrai `CLAUDE.md`.
> Sources en fin.

---

## 📖 INTRODUCTION

### Contexte et enjeu
VIBE-C1 a montré que le goulot du vibe coding se déplace de *écrire* vers **spécifier**
et **revoir**. Le document de pilotage est l'outil qui rend la spécification
**durable** : au lieu de re-répéter tes règles à chaque prompt, tu les écris **une fois**
dans un document que l'IA lit à **chaque** génération. C'est le *system prompt* de ton
projet.

### 🎯 Ce que tu vas apprendre
À la fin, tu sauras :
1. **Expliquer** ce qu'est un document de pilotage et pourquoi il agit comme un system
   prompt.
2. **Distinguer** ce qui y a sa place de ce qui n'y a pas sa place.
3. **Reconnaître** l'effet cumulatif (chaque piège documenté = jamais répété).
4. **Repérer** le risque d'un document **périmé** (une règle fausse se propage).

### 💡 Pourquoi c'est important
Un bon document de pilotage, c'est ce qui fait que le code généré sort **on-brand** du
premier coup : bons tokens, bons patterns, pièges évités. Un document absent ou périmé,
et l'IA dérive — de bonne foi, parce qu'elle ne sait pas ce que tu ne lui as pas dit.

---

## 1️⃣ ENGAGEMENT — Pourquoi le même prompt donne deux résultats

### 🎬 Scénario — un vrai, le tien
Ton `CLAUDE.md` encode des centaines de règles : tokens Tailwind, `rounded-pill` (pas
`rounded-full`), les 14 pièges CSS, le workflow de migration, les anti-patterns. Quand je
génère un composant **en le lisant**, il respecte ta grammaire visuelle. Quand une règle
**manque** (un piège pas encore documenté), je dérive — et tu le découvres à la revue.

### 🤔 Question clé
La qualité du code généré ne dépend pas que du modèle : elle dépend de **ce que tu as
écrit dans le contexte durable**. La question du cours : *qu'est-ce que je dois écrire
une fois pour ne plus jamais avoir à le re-dire — ni à le re-corriger ?*

---

## 2️⃣ DÉCOUVRIR — Contenu principal

### 📚 PARTIE 1 · Ce qu'est un document de pilotage
C'est un **contexte persistant** qui façonne **chaque** génération, sans que tu aies à le
répéter. Techniquement, un fichier comme `CLAUDE.md` est injecté en tête de contexte : il
fonctionne comme un **system prompt** — il ne demande pas une action, il **cadre** toutes
les actions. La règle d'or de l'ingénierie de prompt s'applique : **être explicite**. Une
IA ne devine pas tes conventions ; elle applique celles qu'elle voit.

### 📚 PARTIE 2 · Ce qui y a sa place (et ce qui n'y a pas)
| Y a sa place (règles durables) | N'y a PAS sa place |
|---|---|
| Conventions (tokens, nommage, radius) | L'état transitoire (« je travaille sur X aujourd'hui ») |
| **Pièges** rencontrés + leur fix | Un TODO ponctuel |
| Le workflow obligatoire (build gate, validation) | Des secrets / clés |
| Les **anti-patterns** (« ne jamais faire Y ») | Du contenu qui change chaque semaine |
| Les décisions d'architecture stables | De la doc qui vit ailleurs (lien plutôt que copie) |

Un bon test : *cette information sera-t-elle vraie dans trois mois et utile à **chaque**
tâche ?* Si oui → document de pilotage. Sinon → ailleurs.

### 📚 PARTIE 3 · L'effet cumulatif — le vrai levier
C'est le super-pouvoir du document de pilotage : **chaque piège documenté une fois n'est
plus jamais répété.** Tu tombes sur un bug Tailwind subtil (ex. `translate` vs
`transform` dans un keyframe) → tu l'écris dans les « pièges » → l'IA ne le refait plus
**jamais**, sur aucune tâche future. Le document **capitalise** : il transforme chaque
erreur en immunité permanente. C'est de l'**apprentissage organisationnel** au sens
strict — sauf que la « mémoire » est le fichier, pas une personne.

### 📚 PARTIE 4 · Le risque miroir — un document périmé
La même force joue à l'envers : **une règle fausse se propage aussi fidèlement qu'une
vraie.** Deux exemples de ton propre dépôt :
- La règle « `npx tsc --noEmit` = 0 erreur » masquait 62 vraies erreurs (le bon gate est
  `npm run build`). Tant qu'elle était écrite, elle mentait à chaque session.
- L'affirmation « EDRACT = méthode maison TLS » (fausse — c'est C-Campus) s'était propagée
  dans plusieurs docs.

D'où la discipline : un document de pilotage se **maintient**. Une règle qu'on découvre
fausse se corrige **immédiatement**, sinon elle dérive tout ce qui la lit.

---

## 3️⃣ RÉFLÉCHIR — Quiz et journal

### Quiz (5 min)
De mémoire, **confiance déclarée avant de vérifier** (🟢/🟡/🔴).

1. Pourquoi un document de pilotage agit-il comme un *system prompt* ?
2. Donne le test qui dit si une info a sa place dans le document.
3. Quel est le **risque miroir** d'un document de pilotage, avec un exemple ?

<details>
<summary>Vérifier</summary>

1. Il est **injecté en tête de contexte** et **cadre** chaque génération sans être
   répété — il ne demande pas une action, il les gouverne toutes.
2. *Sera-ce vrai dans 3 mois **et** utile à chaque tâche ?* Oui → document ; sinon →
   ailleurs.
3. Une **règle fausse se propage** aussi fidèlement qu'une vraie (ex. `npx tsc` masquant
   62 erreurs, ou « EDRACT = maison TLS »). D'où : maintenir, corriger vite.
</details>

### 💭 Journal personnel
À écrire : *quel piège ai-je corrigé récemment à la main que j'aurais dû écrire dans
`CLAUDE.md` — pour ne plus jamais le revoir ?*

---

## 4️⃣ APPLIQUER — Ton chantier réel

### 🛠️ Cas : muscler ton document de pilotage
Ouvre ton `CLAUDE.md`.

### Ta mission (cette semaine)
1. **Ajoute une règle** issue d'un piège récent (un bug que l'IA — ou toi — a produit deux
   fois) : décris le symptôme, la cause, le fix. Formule-la comme un anti-pattern
   (« ne jamais… car… »).
2. **Traque une règle périmée** : une convention, un chiffre, un chemin de fichier qui a
   changé. Corrige-la (ou supprime-la).
3. Vérifie qu'une info transitoire ne s'y est pas glissée (un TODO, un « en cours ») → la
   déplacer.

### Correction suggérée
Piège n°1 : écrire une règle **vague** (« faire du beau code ») — inutile ; une règle de
pilotage est **spécifique et vérifiable** (« utiliser `rounded-pill`, pas `rounded-full`,
sur les boutons »). Piège n°2 : laisser une règle périmée « au cas où » — elle ne dort
pas, elle **dérive** tout ce qui la lit.

---

## 5️⃣ CONSOLIDER — Synthèse

### ✅ Ce que tu as appris
- Le document de pilotage = **system prompt du projet** : il cadre chaque génération.
- Y mettre le **durable** (conventions, pièges, workflow, anti-patterns), pas le transitoire.
- **Effet cumulatif** : chaque piège écrit une fois = immunité permanente.
- **Risque miroir** : une règle fausse se propage — le maintenir est une discipline.

### 🎯 Les 3 mantras
| Mantra | Sens |
|---|---|
| **« Écrire une fois, appliquer partout »** | Le document capitalise chaque leçon |
| **« Spécifique et vérifiable »** | Une règle vague ne pilote rien |
| **« Une règle périmée dérive »** | Le maintenir vaut autant que l'écrire |

### 💡 Citation
> *« Sois explicite : le modèle applique les conventions qu'il voit, pas celles que tu as
> en tête. »* — principe d'ingénierie de prompt (Anthropic).

---

## 6️⃣ TRANSFÉRER — Ce que tu fais cette semaine

1. **Le livrable** : une règle ajoutée (piège → anti-pattern) + une règle périmée corrigée
   dans `CLAUDE.md`.
2. **Rappel espacé** — **à J+2 puis J+7**, sans rouvrir ce doc : redonne le **test**
   d'inclusion et le **risque miroir**. Blocage → revue J+14.

---

## 📦 CONTENUS COMPLÉMENTAIRES
- **Pour aller plus loin** : la doc Anthropic sur `CLAUDE.md` (mémoire projet de Claude
  Code) et le guide d'ingénierie de prompt (clarté, exemples, contraintes explicites).
- **Prochain cours** : VIBE-C3 — les garde-fous (types, build gate, design system).

---

## Sources
- **Anthropic.** *Claude Code — mémoire & `CLAUDE.md`* et *Prompt engineering overview*.
  docs.anthropic.com → le fichier de contexte projet et la règle « être explicite ».
- **Exemples internes vérifiables** : `CLAUDE.md` du dépôt TLS (§ pièges, § « le gate
  TypeScript est `npm run build` »), et la correction EDRACT (mémoire
  `reference_edract_ccampus`) → le risque d'une règle périmée.

---

*VIBE-C2 rédigé le 2026-07-24, structure EDRACT (paraphrase des modules IP), ancré sur ton
`CLAUDE.md` réel. Prochain : VIBE-C3 — les garde-fous.*
