# Vibe coding · Cours 5 — Quand NE PAS vibe-coder (sécurité, archi, décisions irréversibles)

**Piste : Vibe coding · Capstone de la piste.**

## Structure EDRACT — ~25 minutes

> Dernier de la piste vibe, même gabarit ([`00-CADRE-PEDAGOGIQUE.md`](00-CADRE-PEDAGOGIQUE.md)).
> Le/la learner, c'est **toi**. L'étape *Appliquer* porte sur tes vraies décisions TLS.
> Sources en fin.

---

## 📖 INTRODUCTION

### Contexte et enjeu
Tout ce parcours t'a rendue plus **efficace** en vibe coding : la boucle (C1), le document
de pilotage (C2), les garde-fous (C3), la revue (C4). Ce dernier cours enseigne la
**maturité** inverse : savoir **où s'arrêter**. Le meilleur vibe coder n'est pas celui qui
vibe-code tout — c'est celui qui **sait ce qu'il ne faut pas** vibe-coder.

### 🎯 Ce que tu vas apprendre
À la fin, tu sauras :
1. **Nommer** les domaines où la génération IA est dangereuse.
2. **Appliquer** la règle « plus c'est dur à défaire, moins on vibe ».
3. **Reconnaître** la limite de ta propre revue (on ne revoit pas ce qu'on ne sait pas
   évaluer).
4. **Décider** quoi faire à la main, en binôme, ou en ralentissant.

### 💡 Pourquoi c'est important
Les gains du vibe coding sont réels sur 90 % du travail. Les 10 % restants — sécurité,
architecture, irréversible — sont exactement ceux où une erreur coûte le plus cher et se
voit le moins. Confondre les deux, c'est mettre la vitesse là où il fallait la prudence.

---

## 1️⃣ ENGAGEMENT — L'auth générée qui « marche »

### 🎬 Scénario — un vrai risque
Tu demandes à l'IA un système d'authentification / de permissions. Elle te rend quelque
chose qui **fonctionne à l'écran** : on se connecte, on accède. Mais une faille de
sécurité ne se voit **pas** à l'usage — elle se voit le jour où quelqu'un la trouve. Le
code « marche » et est pourtant dangereux.

### 🤔 Question clé
Comment sais-tu qu'un code de sécurité est **sûr** ? Pas en le faisant tourner (il tourne).
La question du cours : *quels domaines ne peuvent pas être jugés « bons » par le fait
qu'ils marchent — et que faut-il y faire à la place ?*

---

## 2️⃣ DÉCOUVRIR — Contenu principal

### 📚 PARTIE 1 · Les quatre zones rouges
Là où la génération IA est **dangereuse**, parce que l'erreur est invisible ou coûteuse :
| Zone | Pourquoi | Chez TLS |
|---|---|---|
| **Sécurité** | Une faille ne se voit pas à l'écran (auth, secrets, permissions, RGPD) | données d'apprenants, art. 22 |
| **Architecture** | Décisions difficiles à défaire, qui contraignent tout le reste | modèle de données du passeport |
| **Correction subtile** | Un calcul faux *qui a l'air juste* (finances, scores, niveaux) | niveaux Dreyfus, crédits |
| **L'invérifiable** | Ce que tu ne sais pas évaluer → tu ne peux pas le revoir | un domaine que tu ne maîtrises pas |

### 📚 PARTIE 2 · La règle des portes (Bezos)
Distingue deux types de décisions (métaphore de Jeff Bezos) :
- **Portes à deux sens (réversibles)** : on peut revenir en arrière → vibe-code, itère
  vite, l'erreur est peu chère.
- **Portes à un sens (irréversibles ou coûteuses à défaire)** : un choix d'architecture,
  un schéma de données en production, une migration → **ralentis**, conçois à la main ou
  en binôme.

La règle courte : **plus c'est dur à défaire, moins on vibe.** Le vibe coding est fait
pour l'exploration réversible, pas pour les engagements à un sens.

### 📚 PARTIE 3 · La limite de ta propre revue
VIBE-C4 : tu ne peux pas revoir ce que tu ne comprends pas. Corollaire inconfortable :
**tu ne peux pas juger la qualité d'un code dans un domaine que tu ne maîtrises pas** —
et pire, tu risques de **ne pas voir** que tu ne le maîtrises pas (l'effet Dunning-Kruger,
Kruger & Dunning, 1999 : moins on est compétent dans un domaine, moins on perçoit son
incompétence). Donc : dans une zone que tu ne connais pas, l'IA ne « comble » pas ton
ignorance — elle la **masque** derrière du code plausible. La bonne réponse n'est pas de
faire confiance ; c'est de **faire monter un humain qui sait**.

### 📚 PARTIE 4 · Que faire dans les zones rouges
- **Ralentir** : sortir du mode génération rapide, concevoir d'abord (spec, PM-C6).
- **Faire à la main** les parties critiques, utiliser l'IA seulement pour l'échafaudage
  autour.
- **Faire réviser par un humain expert** (Pierre, un pair, une revue de sécurité).
- **Isoler et tester** durement (cas de bord, adversarial) plutôt que « ça marche ».
- Pour la sécurité : s'appuyer sur des standards éprouvés (OWASP), pas sur une invention.

Ce n'est pas renoncer à l'IA — c'est **changer son rôle** : d'auteur à assistant, sous une
supervision humaine renforcée.

---

## 3️⃣ RÉFLÉCHIR — Quiz et journal

### Quiz (5 min)
De mémoire, **confiance déclarée avant de vérifier** (🟢/🟡/🔴).

1. Cite les **4 zones rouges** où la génération IA est dangereuse.
2. Explique la règle des **portes** (Bezos) appliquée au vibe coding.
3. Pourquoi l'IA est-elle *plus* risquée dans un domaine que tu ne maîtrises pas ?

<details>
<summary>Vérifier</summary>

1. **Sécurité · architecture · correction subtile · l'invérifiable.**
2. Portes à deux sens (réversibles) → vibe-code ; portes à un sens (irréversibles) →
   ralentir/concevoir à la main. « Plus c'est dur à défaire, moins on vibe. »
3. Parce que tu ne peux pas **revoir** ce que tu ne sais pas évaluer — et Dunning-Kruger
   fait que tu risques de **ne pas voir** ton incompétence ; l'IA la masque sous du code
   plausible.
</details>

### 💭 Journal personnel
À écrire : *quelle décision récente chez TLS ai-je (ou aurais-je pu) vibe-coder alors
qu'elle était une « porte à un sens » — sécurité, données, archi ?*

---

## 4️⃣ APPLIQUER — Ton chantier réel

### 🛠️ Cas : cartographier tes zones rouges
Regarde ton backlog TLS et le code existant.

### Ta mission (cette semaine)
1. **Liste 3 décisions** que tu ne devrais **pas** vibe-coder — et dis pour chacune
   **laquelle** des 4 zones (ex. le schéma de données du passeport = architecture +
   correction ; l'auth/permissions = sécurité ; un calcul de crédits = correction subtile).
2. Pour chacune, **classe la porte** (un sens / deux sens).
3. **Décide** la bonne posture : à la main · IA sous supervision experte · ralentir +
   spec (PM-C6).

### Correction suggérée
Piège n°1 : traiter une porte à un sens comme réversible parce que « ça marche déjà ».
Piège n°2 : croire que l'IA compense ton absence d'expertise dans une zone — elle la
**masque**. Dans le doute sur ton propre niveau, fais monter quelqu'un qui sait.

---

## 5️⃣ CONSOLIDER — Synthèse

### ✅ Ce que tu as appris
- **4 zones rouges** : sécurité, architecture, correction subtile, invérifiable.
- **Règle des portes** : plus c'est dur à défaire, moins on vibe.
- Tu ne peux pas revoir ce que tu ne comprends pas (**Dunning-Kruger** : l'IA masque
  l'ignorance).
- Dans le rouge : ralentir, faire à la main, faire réviser par un expert.

### 🎯 Les 3 mantras
| Mantra | Sens |
|---|---|
| **« Plus c'est dur à défaire, moins on vibe »** | La vitesse est pour le réversible |
| **« L'IA masque l'ignorance, elle ne la comble pas »** | On ne revoit pas ce qu'on ne sait pas juger |
| **« Savoir s'arrêter est une compétence »** | Le meilleur vibe coder connaît ses limites |

### 💡 Citation
> *« Certaines décisions sont des portes à un sens : on ne revient pas. Celles-là, on les
> prend lentement. »* — d'après Jeff Bezos.

---

## 6️⃣ TRANSFÉRER — Ce que tu fais cette semaine

1. **Le livrable** : ta liste de 3 décisions « à ne pas vibe-coder » + zone + type de porte
   + posture choisie.
2. **Rappel espacé** — **à J+2 puis J+7**, sans rouvrir ce doc : redonne les **4 zones
   rouges** et la **règle des portes**. Blocage → revue J+14.

### 🎓 Fin de la piste Vibe coding (C1→C5)
Tu as parcouru : ce qu'est le vibe coding (C1) → le document de pilotage (C2) → les
garde-fous (C3) → la revue (C4) → savoir s'arrêter (C5). Tu pilotes l'IA **et** tu connais
la frontière où reprendre la main. C'est exactement la posture qui rend le vibe coding
**sûr** sur un produit qu'on maintient.

---

## 📦 CONTENUS COMPLÉMENTAIRES
- **Pour aller plus loin** : OWASP Top 10 (sécurité web) · l'idée « one-way / two-way
  doors » (lettres aux actionnaires Amazon) · Kruger & Dunning sur la métacognition.
- **Fin des 3 pistes** : PM (C1-C6) · UX/UI (C1-C5) · Vibe (C1-C5). Capstone possible :
  appliquer les 3 sur **un** vrai chantier TLS de bout en bout (le SRS).

---

## Sources
- **Kruger, J., & Dunning, D. (1999).** Unskilled and Unaware of It. *Journal of
  Personality and Social Psychology*, 77(6). → on ne perçoit pas sa propre incompétence.
- **Bezos, J. (2016).** Amazon Shareholder Letter (one-way / two-way doors). → décisions
  réversibles vs irréversibles.
- **OWASP Foundation.** *OWASP Top 10.* owasp.org → standards de sécurité éprouvés (ne pas
  inventer).

---

*VIBE-C5 rédigé le 2026-07-24, structure EDRACT (paraphrase des modules IP). Piste vibe
coding complète. Les 3 pistes (PM · UX/UI · Vibe) sont écrites.*
