# UX/UI · Cours 5 — Interaction, états & micro-interactions

**Piste : UX/UI & Webdesign — les bases.**

## Structure EDRACT — ~30 minutes

> Dernier de la piste UX/UI, même gabarit ([`00-CADRE-PEDAGOGIQUE.md`](00-CADRE-PEDAGOGIQUE.md)).
> Le/la learner, c'est **toi**. L'étape *Appliquer* porte sur un vrai composant de l'app.
> Sources en fin.

---

## 📖 INTRODUCTION

### Contexte et enjeu
Une micro-interaction, c'est le moment où le système **répond** : un bouton qui charge,
un interrupteur qui bascule, une pastille qui apparaît. Elle dit « j'ai vu ton action,
voici ce qui se passe ». Bien faite, elle rend l'interface vivante et rassurante ; mal
faite (ou absente), elle laisse l'utilisateur dans le doute — a-t-il cliqué ? est-ce en
train de charger ? a-t-il le droit ?

### 🎯 Ce que tu vas apprendre
À la fin, tu sauras :
1. **Décomposer** une micro-interaction (Trigger · Rules · Feedback).
2. **Lister** les états d'un composant interactif et ce que chacun communique.
3. **Régler** le timing et respecter l'**accessibilité du mouvement**.
4. **Distinguer** une gamification de maîtrise d'une gamification d'exploitation.

### 💡 Pourquoi c'est important
Le détail des états, c'est ce qui sépare une interface qui *marche* d'une interface qui
*rassure*. Et l'accessibilité du mouvement n'est pas optionnelle : une animation mal
faite peut provoquer des nausées chez des personnes sensibles.

---

## 1️⃣ ENGAGEMENT — Le bouton sans état de chargement

### 🎬 Scénario — un vrai
Un bouton « Valider » qui envoie une requête, mais **sans état de chargement**.
L'utilisateur clique, rien ne bouge visiblement pendant 800 ms, il **re-clique** — et
voilà une double soumission. Le problème n'est pas la requête, c'est l'**absence de
retour** : le système n'a pas dit « j'ai vu, j'y travaille ».

### 🤔 Question clé
Chaque état non conçu est un doute laissé à l'utilisateur. La question du cours : *pour
chacun de mes composants interactifs, ai-je défini **tous** ses états — pas seulement
« au repos » et « au survol » ?*

---

## 2️⃣ DÉCOUVRIR — Contenu principal

### 📚 PARTIE 1 · Le framework TRF (Saffer)
Une micro-interaction se décompose en trois temps (Dan Saffer, *Microinteractions*,
2013) :
- **Trigger** (déclencheur) : l'utilisateur clique/survole, ou le système déclenche
  (minuteur, donnée qui arrive).
- **Rules** (règles) : la logique — si clic, alors désactiver, afficher un indicateur,
  envoyer.
- **Feedback** (retour) : ce que l'utilisateur **voit** — changement de couleur,
  animation, coche.

Le Feedback est le cœur : sans lui, l'utilisateur doute d'avoir agi.

### 📚 PARTIE 2 · Tous les états d'un composant
Chaque élément interactif porte plusieurs états, et chacun communique **sans un mot** :

| État | Ce qu'il dit |
|---|---|
| **Défaut** | Prêt |
| **Survol** | Souris au-dessus (bureau) |
| **Actif** | Pendant le clic |
| **Focus** | Navigation clavier — **indicateur visible obligatoire** (WCAG) |
| **Désactivé** | Non interactif — et montrer **pourquoi** (info-bulle) |
| **Chargement** | En cours — bouton désactivé pour éviter le double-clic |
| **Erreur / Succès** | Résultat — **jamais la couleur seule** (icône + couleur + texte) |

Points clés : au survol, **décaler** la couleur ou agrandir légèrement (1,02-1,05),
**jamais déplacer** l'élément (l'utilisateur perd son repère). Focus : `outline` ≥ 2px,
contraste ≥ 3:1. Chargement : un **squelette** plutôt qu'une page blanche.

### 📚 PARTIE 3 · Le timing (données réelles)
Trois seuils de perception, établis par la recherche (Miller 1968, repris par Nielsen) :
- **~0,1 s** : perçu comme **instantané** (états de bouton, survol).
- **~1 s** : la pensée reste fluide, mais le délai se sent — un indicateur suffit.
- **~10 s** : limite de l'attention — au-delà, il faut une barre de progression et
  laisser faire autre chose.

Micro-interactions : viser **100 ms** (instantané) à **300 ms** (apparitions), en courbe
`ease-out` (départ rapide, fin douce). Règle : ne pas faire attendre.

### 📚 PARTIE 4 · Accessibilité du mouvement & gamification éthique
- **`prefers-reduced-motion`** : non négociable. Une part significative d'utilisateurs
  (estimations 5-35 % selon la définition) est sensible au mouvement — l'animation doit
  se réduire à un fondu, voire disparaître. (Ton marketing respecte ça : `useReducedMotion`
  dans 43 fichiers.)
- **L'animation ne porte jamais l'information seule** : toujours un texte aussi. Pas de
  clignotement > 3×/s (risque de crise).
- **Gamification de maîtrise, pas d'exploitation** : une barre de progression, un badge à
  un jalon = maîtrise. Une série qui culpabilise (« ne perds pas tes 5 jours ! »)
  = exploitation. La première **aide l'apprenant à atteindre son but** ; la seconde
  **l'exploite** pour maximiser un temps d'usage. (C'est ton *firewall gamification* : tu
  as retiré l'XP sur la réflexion — refus de récompenser pour capter.)

---

## 3️⃣ RÉFLÉCHIR — Quiz et journal

### Quiz (5 min)
De mémoire, **confiance déclarée avant de vérifier** (🟢/🟡/🔴).

1. Décompose une micro-interaction (les 3 temps de TRF).
2. Cite **4** états d'un composant interactif au-delà de « défaut » et « survol ».
3. Quelle est la différence entre gamification de **maîtrise** et d'**exploitation** ?

<details>
<summary>Vérifier</summary>

1. **Trigger** (déclencheur) → **Rules** (logique) → **Feedback** (retour visible).
2. Parmi : **actif, focus, désactivé, chargement, erreur, succès**.
3. La **maîtrise** aide l'apprenant à atteindre *son* objectif ; l'**exploitation**
   l'exploite pour maximiser le temps d'usage (série culpabilisante). Cf. ton firewall.
</details>

### 💭 Journal personnel
À écrire : *quel composant de l'app a un état manquant (chargement ? désactivé-avec-raison ?
erreur non-couleur-seule ?) qui laisse l'utilisateur dans le doute ?*

---

## 4️⃣ APPLIQUER — Ton chantier réel

### 🛠️ Cas : l'audit des états d'un composant
Prends **un** composant interactif de l'app (un bouton d'action, un champ, une carte
cliquable).

### Ta mission (cette semaine)
Vérifie ses **7 états** :
1. Défaut · Survol · Actif · **Focus** (outline visible au clavier ?) · **Désactivé**
   (montre-t-il *pourquoi* ?) · **Chargement** (empêche le double-clic ?) · **Erreur/Succès**
   (icône+texte, pas couleur seule ?).
2. Vérifie `prefers-reduced-motion` : si tu coupes le mouvement, l'info passe-t-elle
   quand même ?
3. Corrige **l'état manquant le plus coûteux** (souvent chargement ou focus).

### Correction suggérée
Piège n°1 : ne concevoir que défaut + survol, et oublier **focus** (clavier) et
**chargement** (double-clic). Piège n°2 : signaler une erreur par la **couleur seule** —
invisible pour un daltonien ; toujours icône + couleur + texte.

---

## 5️⃣ CONSOLIDER — Synthèse

### ✅ Ce que tu as appris
- **TRF** : Trigger → Rules → **Feedback** (le cœur).
- **7 états**, chacun communique ; focus + chargement sont les plus oubliés.
- **Timing** : 100-300 ms, seuils 0,1 / 1 / 10 s.
- **Accessibilité du mouvement** non négociable ; **gamification de maîtrise**.

### 🎯 Les 3 mantras
| Mantra | Sens |
|---|---|
| **« Sans feedback, l'utilisateur doute »** | Chaque action produit un signal visible |
| **« Tous les états, pas deux »** | Focus et chargement sont ceux qu'on oublie |
| **« Jamais la couleur seule »** | Icône + couleur + texte (daltonisme) |

### 💡 Citation
> *« Une micro-interaction bien conçue dit : j'ai vu ce que tu as fait, et voici ce qui
> se passe. »* — d'après Dan Saffer, *Microinteractions*.

---

## 6️⃣ TRANSFÉRER — Ce que tu fais cette semaine

1. **Le livrable** : l'audit des 7 états d'un composant + l'état manquant corrigé.
2. **Rappel espacé** — **à J+2 puis J+7**, sans rouvrir ce doc : redonne **TRF** et les
   **7 états**. Blocage → revue J+14.

### 🎓 Fin de la piste UX/UI (C1→C5)
Tu as parcouru : le socle visuel (C1) → les 4C (C2) → le design system (C3) →
l'architecture de l'information (C4) → l'interaction (C5). Tu as de quoi juger et
construire un écran de bout en bout, du token au comportement.

---

## 📦 CONTENUS COMPLÉMENTAIRES
- **Pour aller plus loin** : Dan Saffer, *Microinteractions* · Don Norman, *The Design of
  Everyday Things* (affordances, feedback) · les WCAG sur `prefers-reduced-motion`.
- **Piste suivante** : vibe coding (VIBE-C2 → C5).

---

## Sources
- **Saffer, D. (2013).** *Microinteractions.* O'Reilly. → le framework Trigger-Rules-Feedback.
- **Miller, R. B. (1968).** Response time in man-computer conversational transactions.
  *AFIPS*. → les seuils de perception (0,1 / 1 / 10 s), repris par Nielsen.
- **Norman, D. (2013).** *The Design of Everyday Things* (éd. révisée). Basic Books. →
  affordances, retour, états.
- **W3C — WCAG 2.1**, SC 2.3.3 *Animation from Interactions* & `prefers-reduced-motion`.
- **Deci, E. L., & Ryan, R. M. (2000).** autodétermination → gamification de maîtrise vs
  exploitation.

---

*UXUI-C5 rédigé le 2026-07-24, structure EDRACT (paraphrase des modules IP). Piste UX/UI
complète. Prochain : VIBE-C2.*
