# Vibe coding · Cours 4 — Revoir du code qu'on n'a pas écrit : que vérifier, quand refuser

**Piste : Vibe coding.**

## Structure EDRACT — ~25 minutes

> Suite de [VIBE-C1→C3](VIBE-C1-Qu-est-ce-que-le-vibe-coding.md), même gabarit. Le/la
> learner, c'est **toi**. L'étape *Appliquer* porte sur un vrai diff. Sources en fin.

---

## 📖 INTRODUCTION

### Contexte et enjeu
VIBE-C1 a nommé la **revue** comme l'étape qui sépare le code qui ship du code qui pourrit.
VIBE-C3 a automatisé une partie (les garde-fous). Reste ce que la machine **ne peut pas**
juger : la **correction** (fait-il la bonne chose ?) et l'**intention** (est-ce ce que je
voulais ?). Ce cours t'outille pour ça — revoir du code que tu n'as pas tapé, sans le
survoler.

### 🎯 Ce que tu vas apprendre
À la fin, tu sauras :
1. **Appliquer** une grille de revue en 4 questions.
2. **Lire un diff** au-delà des lignes ajoutées (suppressions, contexte, effets de bord).
3. **Repérer** le « confiant mais faux » (le mode d'échec propre à l'IA).
4. **Refuser** un diff — et savoir *quand* c'est la bonne réponse.

### 💡 Pourquoi c'est important
Accepter un diff sans le comprendre, c'est **hériter** de bugs que tu n'as pas écrits mais
que tu **possèdes**. La revue est le seul endroit où tu gardes la responsabilité — et la
responsabilité ne se délègue pas à un système qui ne l'a pas.

---

## 1️⃣ ENGAGEMENT — Le gros diff qui compile

### 🎬 Scénario — un vrai
L'IA te rend un diff de 150 lignes qui **compile** et « a l'air bon ». Tu es pressée. Le
réflexe facile : approuver. Mais compiler n'est pas correct (VIBE-C1), et « a l'air bon »
n'est pas une revue — c'est une **impression**.

### 🤔 Question clé
Que faut-il **regarder**, exactement, pour transformer « a l'air bon » en « je sais que
c'est bon » ? La question du cours : *à quoi est-ce que je fais confiance quand
j'approuve — le vert du build, ou ma compréhension du diff ?*

---

## 2️⃣ DÉCOUVRIR — Contenu principal

### 📚 PARTIE 1 · La grille de revue en 4 questions
Sur **chaque** diff, avant d'approuver :
1. **Est-ce que je comprends chaque ligne ?** Si non → drapeau rouge (tu ne peux pas
   revoir ce que tu ne comprends pas).
2. **Comment je sais que c'est juste ?** Un test ? les types ? je l'ai fait tourner ?
   *« ça a l'air bon »* ne compte pas.
3. **Qu'est-ce que ça touche que je n'avais pas prévu ?** Effets de bord, autres fichiers,
   comportements adjacents.
4. **Est-ce réversible facilement ?** Sinon, ça méritait plus de vigilance (→ VIBE-C5).

### 📚 PARTIE 2 · Lire un diff pour de vrai
Le piège : ne lire que les lignes **ajoutées** (vert). Une revue sérieuse regarde aussi :
- **Les suppressions** (rouge) : qu'est-ce qui a disparu, et était-ce important ?
- **Le contexte** autour du changement : la ligne modifiée interagit-elle avec ce qui
  l'entoure ?
- **Ce qui n'est PAS là** : un cas d'erreur non géré, un état oublié (cf. UXUI-C5).

Le savoir empirique de la revue humaine : un relecteur trouve surtout des défauts de
**compréhensibilité** et de **maintenabilité**, moins des bugs profonds (Bacchelli & Bird,
2013). Donc revois aussi « est-ce que je comprendrai ça dans six mois ? ».

### 📚 PARTIE 3 · Le « confiant mais faux »
Le mode d'échec propre à l'IA : produire du code **plausible, fluide, sûr de lui — et
faux**. Un calcul légèrement erroné, une API mal utilisée mais qui compile, une
hypothèse tacite incorrecte. C'est **plus dangereux** qu'une erreur évidente, parce que
rien ne clignote. Contre-mesures :
- Se méfier de la **fluidité** : ce n'est pas un signal de correction.
- **Vérifier les valeurs de bord** et les cas limites, pas le chemin heureux.
- Demander « **explique-moi pourquoi ça marche** » : si l'explication est vague, le code
  l'est aussi.

### 📚 PARTIE 4 · Quand refuser
Refuser un diff est une décision légitime, pas un échec. Refuse (ou redemande) quand :
- Tu **ne comprends pas** une partie et tu ne peux pas la vérifier.
- Le diff est **trop gros** pour être revu honnêtement → redécouper en petits diffs.
- Il touche un domaine **à ne pas vibe-coder** (sécurité, archi, irréversible → VIBE-C5).
- Il « marche » mais tu ne saurais pas **le débugger** s'il cassait.

Le refus n'est pas de la défiance envers l'outil — c'est toi qui gardes la responsabilité.

---

## 3️⃣ RÉFLÉCHIR — Quiz et journal

### Quiz (5 min)
De mémoire, **confiance déclarée avant de vérifier** (🟢/🟡/🔴).

1. Donne les **4 questions** de la grille de revue.
2. Au-delà des lignes ajoutées, que faut-il aussi lire dans un diff ?
3. Qu'est-ce que le « confiant mais faux » et comment s'en protéger ?

<details>
<summary>Vérifier</summary>

1. Je comprends chaque ligne ? · Comment je sais que c'est juste ? · Qu'est-ce que ça
   touche d'imprévu ? · Est-ce réversible ?
2. Les **suppressions**, le **contexte** autour, et **ce qui manque** (cas d'erreur, état
   oublié).
3. Du code **plausible et sûr de lui mais faux** ; s'en protéger en se méfiant de la
   fluidité, en testant les cas de bord, et en demandant « explique pourquoi ça marche ».
</details>

### 💭 Journal personnel
À écrire : *la dernière fois que j'ai approuvé un diff sans tout comprendre — qu'est-ce
qui m'a fait confiance, et est-ce que ce signal était fiable ?*

---

## 4️⃣ APPLIQUER — Ton chantier réel

### 🛠️ Cas : une vraie revue, à froid
Prends **un** diff récent généré avec moi (un composant, un correctif).

### Ta mission (cette semaine)
1. Passe-le aux **4 questions** de la grille.
2. Lis les **suppressions** et le **contexte**, pas seulement les ajouts.
3. Trouve **une chose** que tu aurais manquée en survolant (un effet de bord, un cas non
   géré, une ligne que tu ne comprends pas).
4. Décide : **approuver**, **redemander** (trop gros / pas clair), ou **refuser** (domaine
   sensible).

### Correction suggérée
Piège n°1 : lire seulement le vert (les ajouts) et rater ce qui a été **supprimé**. Piège
n°2 : approuver parce que « ça compile » — le build est un garde-fou, pas une revue de
correction.

---

## 5️⃣ CONSOLIDER — Synthèse

### ✅ Ce que tu as appris
- **4 questions** : je comprends ? je sais que c'est juste ? qu'est-ce que ça touche ?
  réversible ?
- Lire **suppressions + contexte + ce qui manque**, pas seulement les ajouts.
- Le **« confiant mais faux »** est le mode d'échec de l'IA : se méfier de la fluidité.
- **Refuser** est une décision légitime.

### 🎯 Les 3 mantras
| Mantra | Sens |
|---|---|
| **« Ce que j'approuve, je le possède »** | Les bugs acceptés deviennent tiens |
| **« La fluidité n'est pas la correction »** | Plausible ≠ juste |
| **« Refuser est une décision, pas un échec »** | Tu gardes la responsabilité |

### 💡 Citation
> *« La revue de code trouve surtout des problèmes de compréhension et de maintenance —
> revois donc aussi pour ton toi de dans six mois. »* — d'après Bacchelli & Bird (2013).

---

## 6️⃣ TRANSFÉRER — Ce que tu fais cette semaine

1. **Le livrable** : une revue à froid d'un diff (4 questions + une chose trouvée) et une
   décision motivée (approuver / redemander / refuser).
2. **Rappel espacé** — **à J+2 puis J+7**, sans rouvrir ce doc : redonne les **4
   questions** et le **« confiant mais faux »**. Blocage → revue J+14.

---

## 📦 CONTENUS COMPLÉMENTAIRES
- **Pour aller plus loin** : Google *Engineering Practices — Code Review* (standards de
  revue) · Bacchelli & Bird sur la revue de code moderne.
- **Prochain cours** : VIBE-C5 — quand NE PAS vibe-coder.

---

## Sources
- **Bacchelli, A., & Bird, C. (2013).** Expectations, Outcomes, and Challenges of Modern
  Code Review. *ICSE '13* (Microsoft Research). → ce que la revue trouve réellement.
- **Google.** *Engineering Practices Documentation — Code Review.* google.github.io →
  standards de revue (comprendre avant d'approuver).
- **Exemple interne** : VIBE-C1 (les 62 erreurs) → « compiler n'est pas correct ».

---

*VIBE-C4 rédigé le 2026-07-24, structure EDRACT (paraphrase des modules IP). Prochain :
VIBE-C5 — quand ne pas vibe-coder.*
