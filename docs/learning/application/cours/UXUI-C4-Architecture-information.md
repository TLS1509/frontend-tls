# UX/UI · Cours 4 — Architecture de l'information & la piste informationnelle

**Piste : UX/UI & Webdesign — les bases.**

## Structure EDRACT — ~30 minutes

> Suite de [UXUI-C1→C3](UXUI-C1-Socle-visuel-typo-couleur-contraste-espacement.md), même
> gabarit ([`00-CADRE-PEDAGOGIQUE.md`](00-CADRE-PEDAGOGIQUE.md)). Le/la learner, c'est
> **toi**. L'étape *Appliquer* porte sur une vraie section de la learning app. Sources
> académiques en fin.

---

## 📖 INTRODUCTION

### Contexte et enjeu
Avant de dessiner un écran, il faut décider **où va quoi**. L'architecture de
l'information (AI), c'est l'organisation, la structuration et l'étiquetage du contenu
pour que les gens **trouvent ce qu'ils cherchent et comprennent où ils sont**
(Rosenfeld, Morville & Arango, 2015). Un beau design sur une mauvaise architecture, c'est
une belle façade sur un plan d'étage incohérent : l'utilisateur se perd quand même.

### 🎯 Ce que tu vas apprendre
À la fin, tu sauras :
1. **Classer** un contenu selon les cinq organisations possibles (LATCH).
2. **Étiqueter** avec les mots de l'utilisateur, pas le jargon interne.
3. **Diagnostiquer** une **piste informationnelle** (est-ce qu'un lien prédit ce qu'on
   trouvera ?).
4. **Tracer** un parcours utilisateur, chemins d'erreur compris.

### 💡 Pourquoi c'est important
L'AI vient **avant** le prototypage : réparer une mauvaise structure après coup coûte
une refonte. Et c'est invisible dans une capture d'écran — ça ne se voit qu'à l'usage,
quand quelqu'un cherche et ne trouve pas.

---

## 1️⃣ ENGAGEMENT — Où range-t-on les items d'apprentissage ?

### 🎬 Scénario — un vrai, le tien
Le **Learning Space** de l'app agrège 9 types d'items (leçons, flashcards, astuces,
vidéos, ressources…). Question de départ : comment l'utilisateur les cherche-t-il ? Par
**type** (« montre-moi les flashcards ») ? Par **thème** (« tout sur le leadership ») ?
Par **nouveauté** (« quoi de neuf ») ? Par **progression** (« où j'en suis ») ? Chaque
réponse commande une organisation différente — et si tu ranges par ta logique interne
plutôt que par la sienne, il se perd.

### 🤔 Question clé
Le défaut le plus courant : ranger « par service interne » (comme *l'organisation*
pense son contenu) là où l'utilisateur cherche « par besoin ». La question du cours :
*mes rubriques suivent-elles la façon dont l'utilisateur **cherche**, ou la façon dont
**je** classe ?*

---

## 2️⃣ DÉCOUVRIR — Contenu principal

### 📚 PARTIE 1 · LATCH — les 5 façons d'organiser
Richard Saul Wurman (*Information Anxiety*, 1989) : il n'existe que **cinq** manières
d'organiser une information — **LATCH** :

| Lettre | Organisation | Exemple app |
|---|---|---|
| **L** — *Location* | Par lieu / surface | (peu pertinent en digital pur) |
| **A** — *Alphabet* | Ordre alphabétique | Un glossaire de compétences |
| **T** — *Time* | Chronologie | Le journal, l'historique du passeport |
| **C** — *Category* | Catégorie / thème | Les parcours par domaine |
| **H** — *Hierarchy* | Importance / niveau | Les items par niveau Dreyfus |

Une même information se range souvent de **plusieurs** façons selon la tâche : ton
Learning Space peut proposer un tri par **catégorie** (explorer), par **temps**
(nouveautés) *et* par **hiérarchie/niveau** (progression). Le choix dépend de ce que
l'utilisateur veut faire à ce moment.

### 📚 PARTIE 2 · L'étiquetage — les mots de l'utilisateur
Le nom des rubriques décide si l'utilisateur trouve ou se perd. Règle : **ses mots, pas
ton jargon.** « Mes formations » > « Espace apprenant ». Un bon audit de l'app : chaque
libellé de menu prédit-il fidèlement ce qu'il y a derrière ?

### 📚 PARTIE 3 · La piste informationnelle (information scent)
C'est la métaphore centrale, et elle est **académique** : la **théorie de la recherche
d'information** (Pirolli & Card, *Information Foraging*, 1999, Xerox PARC) modélise
l'utilisateur comme un animal qui suit une **odeur** (*scent*) — à chaque étape, il
évalue si un lien le **rapproche** de son but. Une bonne piste = un intitulé qui
**prédit** ce qu'on trouvera derrière.

⚠️ **Le piège** : les intitulés « malins » ou vagues cassent la piste. « Découvrir » ne
dit pas quoi ; « Ressources » peut tout contenir. L'utilisateur qui doute clique au
hasard, ou abandonne. (Bonne nouvelle : l'audit de ton app a trouvé **0 libellé vague** —
ta piste est bonne. Ce cours te donne le vocabulaire pour la garder.)

### 📚 PARTIE 4 · Parcours & navigation à 3 niveaux
- **Le parcours utilisateur** décrit le chemin d'une tâche, **chemins d'erreur compris**
  — souvent oubliés : « et s'il n'est pas connecté ? s'il abandonne ? si le paiement
  échoue ? ». Concevoir seulement le « chemin heureux » laisse l'utilisateur seul
  exactement quand il a le plus besoin d'aide.
- **La navigation à 3 niveaux** : **primaire** (grandes rubriques, toujours visibles) ·
  **secondaire** (dans une rubrique) · **tertiaire** (fil d'Ariane, pied de page). Le fil
  d'Ariane répond à « où suis-je ? » ; la nav primaire à « où puis-je aller ? ».
- **Valider une structure** : le *tri de cartes* (Spencer, 2009) la construit **avec**
  les utilisateurs ; le *tree testing* la vérifie (« où irais-tu pour trouver X ? »).

---

## 3️⃣ RÉFLÉCHIR — Quiz et journal

### Quiz (5 min)
De mémoire, **confiance déclarée avant de vérifier** (🟢/🟡/🔴).

1. Cite 3 des 5 organisations de LATCH et un exemple de chacune dans l'app.
2. Qu'est-ce que la « piste informationnelle » et quel intitulé la casse ?
3. Pourquoi le **chemin d'erreur** fait-il « la moitié » d'un parcours ?

<details>
<summary>Vérifier</summary>

1. **L**ocation · **A**lphabet · **T**ime (journal/historique) · **C**ategory
   (parcours par thème) · **H**ierarchy (par niveau Dreyfus).
2. La probabilité perçue qu'un lien rapproche du but (Pirolli & Card) ; un intitulé
   **vague** (« Découvrir », « Ressources ») la casse — il ne prédit pas le contenu.
3. Parce que c'est **là que l'utilisateur a le plus besoin d'aide** — et c'est le plus
   souvent non conçu (« chemin heureux » seul).
</details>

### 💭 Journal personnel
À écrire : *dans l'app, quel libellé de menu range le contenu selon **ma** logique
plutôt que selon la façon dont l'apprenant **cherche** ?*

---

## 4️⃣ APPLIQUER — Ton chantier réel

### 🛠️ Cas : auditer l'AI d'une section
Prends **une** section de l'app (Learning Space, le passeport, le catalogue de parcours).

### Ta mission (cette semaine)
1. **Classe son contenu selon LATCH** : quelle organisation **domine** aujourd'hui ?
   Correspond-elle à la façon dont l'apprenant cherche ?
2. **Teste la piste d'un libellé** : demande à 2 personnes « d'après ce mot, que
   penses-tu trouver derrière ? ». Leur réponse colle-t-elle au contenu réel ?
3. **Trace un parcours** de cette section avec son **chemin d'erreur** principal.

### Correction suggérée
Piège n°1 : ranger « par ce que produit l'équipe » (types techniques) au lieu de « par
ce que cherche l'apprenant » (besoin). Piège n°2 : un libellé que *toi* tu comprends
(jargon interne) mais que l'utilisateur interprète autrement — d'où le test à 2
personnes.

---

## 5️⃣ CONSOLIDER — Synthèse

### ✅ Ce que tu as appris
- **LATCH** : 5 organisations — choisir celle de l'utilisateur, souvent plusieurs.
- **Étiquetage** : ses mots, pas le jargon.
- **Piste informationnelle** (Pirolli & Card) : chaque lien doit **prédire** son contenu.
- **Chemin d'erreur** = moitié du parcours ; **nav à 3 niveaux** (où suis-je / où aller).

### 🎯 Les 3 mantras
| Mantra | Sens |
|---|---|
| **« L'architecture avant la façade »** | Un beau design sur une mauvaise structure perd quand même |
| **« Les mots de l'utilisateur, pas les nôtres »** | L'étiquetage juste supprime le jargon |
| **« Concevoir le chemin d'erreur »** | C'est là qu'on a le plus besoin d'aide |

### 💡 Citation
> *« Les gens ne lisent pas les pages, ils les scannent. »* — Steve Krug, *Don't Make Me
> Think* — d'où l'importance d'une piste qui se suit en un coup d'œil.

---

## 6️⃣ TRANSFÉRER — Ce que tu fais cette semaine

1. **Le livrable** : ton audit LATCH d'une section + un test de scent à 2 personnes + un
   parcours avec chemin d'erreur.
2. **Rappel espacé** — **à J+2 puis J+7**, sans rouvrir ce doc : redonne **LATCH** (les 5
   lettres) et **ce qui casse une piste**. Blocage → revue J+14.

---

## 📦 CONTENUS COMPLÉMENTAIRES
- **Pour aller plus loin** : Rosenfeld, Morville & Arango, *Information Architecture*
  (4ᵉ éd.) · les guides *Card Sorting* et *Tree Testing* de la Nielsen Norman Group.
- **Prochain cours** : UXUI-C5 — interaction, états & micro-interactions.

---

## Sources
- **Wurman, R. S. (1989).** *Information Anxiety.* Doubleday. → la méthode LATCH.
- **Rosenfeld, L., Morville, P., & Arango, J. (2015).** *Information Architecture: For the
  Web and Beyond* (4ᵉ éd.). O'Reilly. → référence de l'AI.
- **Pirolli, P., & Card, S. (1999).** Information Foraging. *Psychological Review*,
  106(4), 643-675. (Xerox PARC) → base scientifique de l'*information scent*.
- **Spencer, D. (2009).** *Card Sorting: Designing Usable Categories.* Rosenfeld Media.
- **Krug, S. (2014).** *Don't Make Me Think, Revisited.* New Riders.

---

*UXUI-C4 rédigé le 2026-07-24, structure EDRACT (paraphrase des modules IP). Prochain :
UXUI-C5 — interaction & états.*
