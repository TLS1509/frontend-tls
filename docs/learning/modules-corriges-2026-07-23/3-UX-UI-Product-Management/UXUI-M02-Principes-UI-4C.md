# MODULE 2 : PRINCIPES UI DESIGN — LES 4C

**Durée : 55 minutes · 50 slides**

> **Version corrigée du 2026-07-23.** Le framework 4C et son contenu sont solides.
> Corrections : l'erreur de contraste (la même qu'au module 1), les secondes
> fabriquées de la loi de Hick, la confusion Miller/Cowan, et deux détails sur le
> design system TLS. Journal en fin de document.

Les 4C — **Clarté, Cohérence, Contraste, Confort** — sont un cadre de décision
maison, cohérent et utile. (Ce n'est pas un standard industrie « officiel » : à
présenter comme un outil de travail TLS, pas comme une norme établie.)

- **Clarté** : l'utilisateur comprend quoi faire sans aide
- **Cohérence** : des patterns répétés → apprentissage rapide
- **Contraste** : actions principales et secondaires distinguées
- **Confort** : charge cognitive faible, interface familière

---

## PARTIE 1 · CLARTÉ (slides 1-15)

> *« Don't make me think »* — Steve Krug.

La clarté, c'est zéro ambiguïté sur trois questions : que fait ce bouton ? où
suis-je ? que se passe-t-il après ce clic ?

**Le libellé fait l'essentiel de la clarté**
- ❌ « Valider », « OK », « Cliquez ici »
- ✅ « Créer mon compte », « Confirmer l'achat », « Télécharger le certificat »
- **Règle : verbe + objet** (action + résultat)

**Les affordances** sont les signaux visuels d'interactivité : un bouton en relief
et coloré dit « je suis cliquable », un lien souligné dit « je suis un lien », un
champ bordé dit « tapez ici ».

**Le retour immédiat** : chaque action doit produire un signal visuel — chargement,
coche de succès, notification. Sans retour, l'utilisateur doute d'avoir cliqué.

**Prévenir l'erreur plutôt que l'afficher** : désactiver un bouton tant que le
formulaire est invalide vaut mieux qu'un message d'erreur après coup.

**Divulgation progressive** : ne montrer que ce dont l'utilisateur a besoin
maintenant — un formulaire de 50 champs devient un parcours en 5 étapes.

**Iconographie** : icône + libellé. Une icône seule n'est claire que si elle est
universelle (loupe, roue dentée).

*Exemples analysés* : Stripe (libellés verbe + objet, notifications, onglets),
Coursera (« S'inscrire gratuitement » plutôt qu'un vague « Commencer »).

---

## PARTIE 2 · COHÉRENCE (slides 16-30)

La cohérence, c'est le pattern répété : l'utilisateur apprend une fois, applique
partout. **Trois types** :
1. **Visuelle** — couleurs, typographie, espacement identiques
2. **Fonctionnelle** — une même action produit un même résultat (supprimer →
   toujours une confirmation)
3. **Externe** — s'aligner sur les conventions du secteur plutôt que réinventer

**La bibliothèque de composants** est l'outil de cohérence : au lieu de redessiner
un bouton à chaque page, on crée un composant `Bouton` (variantes : primaire,
secondaire, fantôme) réutilisé partout. Un correctif à un endroit se propage
partout.

**Les design systems** portent cette cohérence à l'échelle : Material Design
(Google), Human Interface Guidelines (Apple), et le **design system TLS**.

**Conventions de nommage** : « Confirmer » partout, pas « Valider / Envoyer / OK /
Go » pour la même action.

**Cohérence fonctionnelle des actions destructives** : toujours une modale de
confirmation, toujours « Annuler » (secondaire) + « Supprimer » (rouge), jamais de
suppression directe.

> ⚠️ **Deux corrections sur le design system TLS.** La version précédente
> affirmait « 87 composants documentés dans **Storybook** ». C'est faux sur deux
> points : le DS TLS **n'utilise pas Storybook** (le showcase est
> `src/pages/Components.tsx`), et il compte **plus de 90 composants** (≈ 51 `ui` +
> 40 `patterns` + noyau). À recompter et re-libeller.

> ⚠️ **Airbnb** — « 200+ composants, 10 000+ écrans » : ordre de grandeur
> plausible mais chiffres exacts non vérifiables. Adoucir en « des centaines de
> composants ».

---

## PARTIE 3 · CONTRASTE (slides 31-40)

> *« When everything is bold, nothing is bold. »*

Le contraste crée la hiérarchie visuelle : l'utilisateur voit immédiatement
l'action principale et l'information importante. **Quatre leviers** : taille,
graisse, couleur, espace.

**Hiérarchie des boutons TLS** : primaire (contraste maximal, gradient, ombre),
secondaire (bordure, fond transparent), fantôme (texte seul). **Un seul bouton
primaire par écran.**

### ⚠️ Contraste couleur = accessibilité (correction)

Les seuils WCAG sont exacts : AA texte normal 4,5:1, grand texte 3:1, AAA 7:1.

Mais l'exemple était faux — **la même erreur qu'au module 1** :

> Le module affichait « teal TLS `#55A1B4` sur blanc = 4,6:1 ✅ AA ».
> **La réalité : 2,94:1 — échec.** Pour du texte AA, utiliser `#3D7786`
> (primary-700) = **5,02:1**. Le teal clair est une couleur de fond, pas de texte.

C'est le point où un module sur le contraste doit être irréprochable. Voir le
module 1 pour la matrice complète recalculée.

**Anti-pattern** : cinq boutons de même taille et couleur → paralysie. Solution :
un primaire, deux secondaires, le reste en fantôme.

---

## PARTIE 4 · CONFORT (slides 41-50)

Le confort, c'est la charge cognitive minimale : l'utilisateur se sent maître, pas
débordé. L'idée que **le familier est plus rapide que le nouveau** est réelle
(loi de Jakob : les utilisateurs passent l'essentiel de leur temps sur *d'autres*
sites, et attendent que le vôtre fonctionne pareil). *(Formule attribuée à Nielsen
dans la version précédente entre guillemets — c'est une paraphrase de son idée,
pas une citation attestée mot pour mot.)*

**Les trois charges cognitives** (Sweller) : intrinsèque (la difficulté de la
tâche, irréductible), **extrinsèque (la complexité de l'interface, réductible)**,
germane (l'effort d'apprentissage, utile). L'objectif de conception : réduire la
charge extrinsèque.

### ⚠️ La loi de Hick (correction)

La loi est réelle : le temps de décision croît avec le nombre d'options
(RT = b·log₂(n+1)).

> ⚠️ **Mais les secondes affichées étaient fabriquées** : « 2 options → 1 s, 10 →
> 3,5 s, 100 → 7 s ». Avec un coefficient réaliste (b ≈ 0,15 s), 10 options ≈
> **0,5 s**, pas 3,5. On **garde la loi, on retire le tableau de secondes** (ou on
> le marque « illustratif, non calibré »).

### ⚠️ Le nombre magique (correction)

La version précédente appliquait « moins de 7 options par décision » (le 7±2 de
Miller).

> ⚠️ Le 7±2 de Miller (1956) est **l'empan mnésique immédiat**, régulièrement mal
> transposé au design de menus. La capacité de la mémoire de travail a été révisée
> à **~4 chunks (Cowan, 2001)**. À corriger — et **c'est cohérent avec le module
> Mémoire du parcours Neuro**.

**Leviers de confort qui tiennent** :
- **Valeurs par défaut intelligentes** — pré-remplir le pays, la devise
- **Regroupement** (*chunking*) — « 06 12 34 56 78 » plutôt que « 0612345678 » ;
  « 4532 1234 5678 9012 » plutôt que 16 chiffres d'affilée
- **Patterns familiers** — logo en haut à gauche, compte en haut à droite
- **États de chargement** — une barre de progression rassure mieux qu'un rien
- **États vides utiles** — une page vide propose une action, pas du blanc

---

## Synthèse

| Pilier | En un mot |
|---|---|
| **Clarté** | Libellés verbe + objet, affordances, retour immédiat |
| **Cohérence** | Bibliothèque de composants, patterns répétés |
| **Contraste** | Un seul primaire, hiérarchie taille/graisse/couleur/espace |
| **Confort** | Défauts intelligents, regroupement, familiarité |

**Lecture** : *Don't Make Me Think*, Steve Krug. **Pratique** : reprendre une page
avec la checklist 4C.

---

## 📋 Journal des corrections — 2026-07-23

| # | Problème d'origine | Correction |
|---|---|---|
| 1 | Slide 35 : « `#55A1B4` sur blanc = 4,6:1 ✅ AA » | Corrigé en **2,94:1 (échec)** ; `#3D7786` (5,02:1) pour le texte. Même erreur qu'au module 1 |
| 2 | Slide 43 : loi de Hick « 2→1 s, 10→3,5 s, 100→7 s » | Secondes fabriquées **retirées** ; loi conservée |
| 3 | Slide 49 : « moins de 7 options » (Miller 7±2) | Corrigé en **~4 chunks (Cowan, 2001)** ; cohérence avec le parcours Neuro |
| 4 | Slide 27 : « 87 composants documentés dans **Storybook** » | Corrigé : pas de Storybook (showcase `Components.tsx`), **> 90 composants** |
| 5 | Slide 29 : Airbnb « 200+ composants, 10 000+ écrans » | Adouci en « des centaines de composants » |
| 6 | Slide 41 : « Familiar = Fast, Novel = Slow — Jakob Nielsen » entre guillemets | Requalifié en **paraphrase** de la loi de Jakob, sans guillemets stricts |
| 7 | Framework 4C présenté comme standard | Requalifié : cadre maison légitime, pas une norme industrie |

**Conservé** : toute la partie Clarté (libellés, affordances, retour, prévention
d'erreur, divulgation progressive) · la Cohérence (types, bibliothèque de
composants, design systems, actions destructives) · la hiérarchie des boutons ·
les leviers de confort (défauts, regroupement, familiarité, états de chargement et
vides) · les exemples Stripe, Coursera, Airbnb. Le fond était solide.
