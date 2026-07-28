# UX/UI · Cours 2 — Les 4C : Clarté, Cohérence, Contraste, Confort

**Piste : UX/UI & Webdesign — les bases.**

## Structure EDRACT — ~30 minutes

> Suite de [UXUI-C1](UXUI-C1-Socle-visuel-typo-couleur-contraste-espacement.md), même
> gabarit ([`00-CADRE-PEDAGOGIQUE.md`](00-CADRE-PEDAGOGIQUE.md)). Le/la learner, c'est
> **toi**. L'étape *Appliquer* porte sur un vrai écran de l'app. Sources vérifiables en
> fin.
>
> ⚠️ **Statut du framework « 4C » — vérifié le 2026-07-24.** Contrairement à EDRACT
> (marque déposée C-Campus), **« les 4C de l'UX » sont un genre mnémotechnique
> générique, sans propriétaire** : plusieurs versions concurrentes circulent
> (*Clarity·Consistency·Convenience·Content* · *Control·Comfort·Clarity·Consistency* ·
> etc.). **La combinaison précise de TLS — Clarté / Cohérence / Contraste / Confort —
> n'est PAS un standard reconnu** : c'est une **sélection maison** (le « Contraste »
> est le twist TLS ; la plupart des versions ne l'incluent pas). Conséquence :
> **aucune attribution à faire** (personne ne possède « les 4C »), mais **ne pas le
> présenter comme "le" 4C de l'industrie** — c'est *une* grille de travail parmi
> d'autres, dont chaque principe est établi (sourcé ci-dessous). Le nom « 4C » n'a
> donc pas de valeur d'autorité : c'est le contenu (Krug, Sweller, Jakob…) qui porte.

---

## 📖 INTRODUCTION

### Contexte et enjeu
UXUI-C1 t'a donné le socle (typo, couleur, espacement). Les 4C sont le **niveau
au-dessus** : une grille pour juger n'importe quel écran. Quatre questions —
Clarté, Cohérence, Contraste, Confort — qui attrapent l'essentiel des problèmes
d'interface avant qu'un utilisateur ne s'y perde.

### 🎯 Ce que tu vas apprendre
À la fin, tu sauras :
1. **Nommer** les 4C et ce que chacun vérifie.
2. **Auditer** un écran avec cette grille.
3. **Relier** chaque C à un principe établi (Krug, Sweller, Nielsen…).
4. **Corriger** la violation la plus coûteuse d'un écran réel.

### 💡 Pourquoi c'est important
Une grille partagée, c'est ce qui te permet de juger un écran **sans débattre du goût** :
tu ne dis pas « je n'aime pas », tu dis « la Clarté échoue ici, voici pourquoi ». C'est
plus rapide, plus objectif, et ça se transmet.

---

## 1️⃣ ENGAGEMENT — Cinq boutons, aucune décision

### 🎬 Scénario — un vrai
Un écran avec **cinq boutons de même taille, même couleur, même poids**. L'utilisateur
s'arrête : lequel est l'action principale ? Il hésite, clique au hasard, ou repart.
*« When everything is bold, nothing is bold. »*

### 🤔 Question clé
Rien n'est « moche » sur cet écran — chaque bouton est propre. Le problème n'est pas
esthétique, il est **décisionnel** : l'interface ne dit pas quoi faire. Comment
attrape-t-on ce genre de défaut **avant** de le livrer ? Avec une grille. La question du
cours : *quelles quatre questions posent-elles, à coup sûr, sur n'importe quel écran ?*

---

## 2️⃣ DÉCOUVRIR — Contenu principal

### 📚 C1 · CLARTÉ — « Don't make me think » (Krug)
L'utilisateur comprend quoi faire **sans aide**. Trois zéro-ambiguïtés : que fait ce
bouton ? où suis-je ? que se passe-t-il après ce clic ?
- **Libellés verbe + objet** : « Créer mon compte », pas « Valider ».
- **Affordances** : ce qui est cliquable en a l'air ; ce qui ne l'est pas, non.
- **Retour immédiat** : chaque action produit un signal (chargement, coche).
- **Prévenir l'erreur** > l'afficher : désactiver tant que le formulaire est invalide.
- **Divulgation progressive** : 50 champs → un parcours en 5 étapes.

### 📚 C2 · COHÉRENCE — le familier est rapide (loi de Jakob)
Un pattern appris une fois s'applique partout. Trois cohérences :
- **Visuelle** (couleurs/typo/espacement identiques), **fonctionnelle** (supprimer →
  toujours une confirmation), **externe** (suivre les conventions du secteur).
- L'outil, c'est la **bibliothèque de composants** : un `Bouton` réutilisé, pas
  redessiné. Un correctif se propage partout. (C'est exactement ton design system.)
- Loi de Jakob (Nielsen) : les gens passent l'essentiel de leur temps sur *d'autres*
  sites — ils attendent que le tien fonctionne pareil.

### 📚 C3 · CONTRASTE — un seul primaire par écran
Le contraste crée la **hiérarchie** : on voit immédiatement l'action principale.
Quatre leviers : **taille, graisse, couleur, espace**.
- **Un seul bouton primaire par écran** ; le reste en secondaire / fantôme.
- (Le contraste *couleur* au sens accessibilité, c'est UXUI-C1 — ici c'est la hiérarchie
  visuelle au sens large, dont l'accessibilité est un cas.)
- Anti-pattern : cinq actions de même poids → paralysie (l'écran de l'Engagement).

### 📚 C4 · CONFORT — charge cognitive minimale (Sweller)
L'utilisateur se sent maître, pas débordé. On réduit la **charge extrinsèque** (la
complexité de l'interface, la seule qu'on puisse réduire — Sweller).
- **Loi de Hick** : le temps de décision croît avec le nombre d'options → en limiter.
- ⚠️ **~4 chunks** en mémoire de travail (Cowan, 2001), **pas 7** — le « 7±2 » de Miller
  est l'empan mnésique, souvent mal transposé aux menus. (Cohérence avec ton parcours
  Neuro.)
- Leviers : **valeurs par défaut** intelligentes, **regroupement** (« 06 12 34 56 78 »),
  **patterns familiers**, **états de chargement** (squelette > page blanche), **états
  vides utiles** (une action, pas du blanc).

---

## 3️⃣ RÉFLÉCHIR — Quiz et journal

### Quiz (5 min)
De mémoire, **confiance déclarée avant de vérifier** (🟢/🟡/🔴).

1. Cite les **4C** et, pour chacun, la question qu'il pose.
2. Combien de boutons **primaires** par écran, et pourquoi ?
3. Mémoire de travail : **4 chunks (Cowan)** ou **7±2 (Miller)** — lequel s'applique au
   design de menus, et pourquoi ?

<details>
<summary>Vérifier</summary>

1. **Clarté** (est-ce évident quoi faire ?) · **Cohérence** (est-ce un pattern répété ?)
   · **Contraste** (voit-on l'action principale ?) · **Confort** (la charge est-elle
   minimale ?).
2. **Un seul** — sinon la hiérarchie disparaît et l'utilisateur hésite.
3. **~4 (Cowan, 2001)** ; le 7±2 de Miller est l'empan mnésique immédiat, mal transposé
   au design.
</details>

### 💭 Journal personnel
À écrire : *sur quel écran de l'app est-ce que je « n'aime pas » quelque chose sans
savoir dire pourquoi — et lequel des 4C échoue vraiment là ?*

---

## 4️⃣ APPLIQUER — Ton chantier réel

### 🛠️ Cas : auditer un écran aux 4C
Prends **un** écran de la learning app (Dashboard, une leçon, un formulaire).

### Ta mission (cette semaine)
Passe-le à la grille, un C à la fois :
1. **Clarté** — un libellé vague ? une action sans retour ?
2. **Cohérence** — un composant redessiné au lieu d'être réutilisé ?
3. **Contraste** — plus d'un primaire ? une hiérarchie plate ?
4. **Confort** — trop d'options d'un coup ? un état vide/chargement manquant ?

Note **une** violation par C, puis **corrige la plus coûteuse** (celle qui bloque le
plus l'utilisateur).

### Correction suggérée
Piège n°1 : confondre « je n'aime pas » et « un C échoue » — la grille sert justement à
sortir du goût. Piège n°2 : vouloir tout corriger d'un coup ; commence par la violation
qui **coûte le plus à l'utilisateur** (souvent Clarté ou Contraste).

---

## 5️⃣ CONSOLIDER — Synthèse

### ✅ Ce que tu as appris
- **Clarté** (Krug), **Cohérence** (Jakob + composants), **Contraste** (un primaire,
  hiérarchie), **Confort** (Sweller, Hick, ~4 chunks).
- La grille sort le jugement du **goût** et le met sur des **principes**.

### 🎯 Les 3 mantras
| Mantra | Sens |
|---|---|
| **« Don't make me think »** | La Clarté, c'est zéro ambiguïté sur quoi faire |
| **« Un seul primaire par écran »** | Sinon la hiérarchie s'effondre |
| **« ~4 chunks, pas 7 »** | La charge extrinsèque se réduit, c'est la seule qu'on maîtrise |

### 💡 Citation
> *« When everything is bold, nothing is bold. »* — sur le contraste comme hiérarchie.

---

## 6️⃣ TRANSFÉRER — Ce que tu fais cette semaine

1. **Le livrable** : ton audit 4C d'un écran (une violation par C) + la correction la
   plus coûteuse appliquée.
2. **Rappel espacé** — **à J+2 puis J+7**, sans rouvrir ce doc : redonne les **4C** et,
   pour chacun, **un principe source**. Blocage → revue J+14.

---

## 📦 CONTENUS COMPLÉMENTAIRES
- **Pour aller plus loin** : Steve Krug, *Don't Make Me Think* · John Sweller sur la
  charge cognitive · Jakob Nielsen (loi de Jakob, NN/g).
- **Prochain cours** : UXUI-C3 — design tokens & design system, la source de vérité
  unique.

---

## Sources
- **Krug, S. (2014).** *Don't Make Me Think, Revisited.* New Riders. → Clarté, « ne me
  fais pas réfléchir ».
- **Nielsen, J.** *Jakob's Law of Internet User Experience.* NN/g, nngroup.com. →
  Cohérence externe, le familier est rapide.
- **Sweller, J. (2011).** Cognitive Load Theory. *Psychology of Learning and
  Motivation*, 55. → Confort, charge extrinsèque.
- **Cowan, N. (2001).** The magical number 4 in short-term memory. *Behavioral and
  Brain Sciences*, 24(1). → ~4 chunks (pas 7±2 de Miller).
- **Hick, W. E. (1952)** / **Hyman, R. (1953).** → loi de Hick (temps de décision).

---

*UXUI-C2 rédigé le 2026-07-24, structure EDRACT (paraphrase des modules IP). Statut du
framework 4C signalé (à vérifier, cf. leçon EDRACT). Prochain : UXUI-C3 — design system.*
