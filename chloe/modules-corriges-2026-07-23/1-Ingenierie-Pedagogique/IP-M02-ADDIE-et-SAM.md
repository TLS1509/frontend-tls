# MODULE 2 : LES MODÈLES ADDIE ET SAM

## Structure EDRACT — 50 minutes

> **Version corrigée du 2026-07-23.** La description des phases d'ADDIE et de SAM
> est exacte et conservée intégralement. Les corrections portent sur un cas
> présenté comme réel, deux références invérifiables, le sigle SMART mal
> développé, des parts de marché inventées — et l'ajout d'une section critique
> d'ADDIE qui manquait. Journal complet en fin de document.

---

## 📖 INTRODUCTION

### Contexte et enjeu

Vous savez **pourquoi** l'ingénierie pédagogique est nécessaire (module 1).
Reste le **comment** : concevoir une formation de bout en bout.

C'est le rôle des **modèles d'ingénierie pédagogique** — des cadres
méthodologiques qui structurent la démarche.

**Deux dominent la discussion** :

- **ADDIE** — le cadre historique, séquentiel. De très loin le plus répandu et le
  plus enseigné.
- **SAM** — la proposition itérative de Michael Allen (2012), formulée
  explicitement **contre** les rigidités d'ADDIE. Plus récente, plus discutée.

### 🎯 Ce que vous allez apprendre

- ✅ Expliquer les 5 phases d'ADDIE et les appliquer
- ✅ Comprendre les 3 phases de SAM
- ✅ Choisir entre les deux selon le contexte
- ✅ Les hybrider
- ✅ **Connaître les limites d'ADDIE** — et savoir ce que ce modèle ne dit pas

### ⏱️ Durée et format

| Activité | Durée |
|---|---|
| Lecture du contenu | 15 min |
| Vidéo comparative | 10 min |
| Quiz + journal | 10 min |
| Exercice pratique | 15 min |
| **Total** | **50 min** |

### 💡 Pourquoi c'est important

**Sans méthode structurée** : on oublie des étapes critiques, on réinvente à
chaque projet, on ne sait pas quand itérer ni quand valider.

**Avec un modèle** : rien ne saute, la communication avec le commanditaire est
claire, le processus est rodé.

⚠️ **Mais attention dès maintenant** : suivre un modèle garantit que le
*processus* est complet. **Pas que la formation sera efficace.** C'est une
distinction que la partie « limites d'ADDIE » développe.

---

## 1️⃣ ENGAGEMENT — Deux déroulés types

> **Composés à partir de configurations fréquentes.** Ce ne sont pas des cas
> réels et les chiffres n'en sont pas.

**Le contexte** : projet de formation « cybersécurité » pour 5 000
collaborateurs. Six mois, une équipe de quatre.

### ❌ Ce qui arrive quand on développe avant d'avoir validé la conception

```
MOIS 1-2 : analyse superficielle
├─ Deux réunions avec le responsable sécurité
├─ « On veut sensibiliser tout le monde »
└─ Aucune analyse du public

MOIS 3-4 : développement immédiat
├─ L'équipe se lance directement en production
├─ 12 modules produits
└─ Très soignés — mais conçus pour un public non défini

MOIS 5 : première présentation
├─ « C'est trop technique »
└─ « Il manque des contenus »

MOIS 6 : refonte en urgence
├─ 8 modules sur 12 à refaire
├─ Dépassement de budget et de délai
└─ Équipe épuisée
```

**Le mécanisme** : la première confrontation à un avis extérieur intervient
**après** la dépense la plus lourde. Tout ce qui est découvert à ce moment coûte
le prix d'une refonte.

### ✅ Le même projet, conduit avec ADDIE

```
PHASE 1 — ANALYSE (3 semaines)
├─ Entretiens : responsable sécurité + 5 managers + 20 collaborateurs
├─ Analyse des incidents réels
├─ 4 personas identifiés (direction · manager · métier · informatique)
└─ Validation du commanditaire ✅

PHASE 2 — CONCEPTION (4 semaines)
├─ Storyboard de 4 parcours différenciés
├─ Test du prototype avec 10 utilisateurs
├─ Retour : « module 3 trop long, à scinder »
├─ Itération
└─ Validation finale ✅

PHASE 3 — DÉVELOPPEMENT (10 semaines)
├─ Production par vagues
│  ├─ Vague 1 : 3 modules pilotes + tests
│  └─ Vagues 2-3 : le reste
└─ Revue qualité hebdomadaire ✅

PHASE 4 — MISE EN ŒUVRE (2 semaines)
├─ Déploiement
├─ Communication
└─ Support ✅

PHASE 5 — ÉVALUATION (suivi 3 mois)
├─ Mesure aux niveaux 1 à 3 (module 6)
├─ Indicateurs métier suivis, avec une population de comparaison
│  définie AVANT le déploiement
└─ ⚠️ Sans cette population de comparaison, aucune évolution
   d'incidents ne peut être attribuée à la formation
```

**Ce que le second déroulé change** : la validation intervient quand la
correction est encore bon marché — sur un storyboard, pas sur douze modules
produits.

### 🤔 Question clé

*« Dans mes projets, à quel moment quelqu'un d'extérieur voit-il le travail pour
la première fois ? »*

Si la réponse est « à la livraison », le premier déroulé vous guette.

---

## 2️⃣ DÉCOUVRIR — Contenu principal

### 📚 PARTIE 1 : Le modèle ADDIE

#### Origine

ADDIE trouve son origine dans un modèle développé en **1975 par l'université
d'État de Floride pour l'armée américaine**, puis diffusé dans l'ensemble des
forces armées. *[à sourcer]*

**Philosophie** : approche systématique et séquentielle. Chaque phase se termine
avant que la suivante commence — avec des retours en arrière possibles.

- **A**nalyze — analyser
- **D**esign — concevoir
- **D**evelop — développer
- **I**mplement — mettre en œuvre
- **E**valuate — évaluer

#### PHASE 1 — ANALYSER

**Objectif** : comprendre le besoin réel et le contexte.

**Questions clés** : quel problème métier ? quels publics ? quel écart de
compétences entre le niveau actuel et le niveau visé ? quelles contraintes ?

**Activités** : entretiens (commanditaire, managers, apprenants) · analyse
documentaire (processus, indicateurs, incidents) · observation de terrain ·
tests diagnostiques · analyse de l'environnement technique.

**Livrables** : cahier des charges pédagogique · personas (3 à 5) · analyse
d'écart de compétences · contraintes.

**Durée typique** : 10 à 20 % du projet.

⚠️ **Erreur fréquente** : sauter cette phase — « on connaît déjà le besoin ».

#### PHASE 2 — CONCEVOIR

**Objectif** : architecturer la solution.

**Questions clés** : quels objectifs pédagogiques ? quelle stratégie ? quelle
modalité (présentiel, distanciel, mixte) ? quel séquençage ?

**Activités** : définir les objectifs par module · créer le scénario · choisir
les activités · définir les évaluations · concevoir le parcours apprenant ·
prototyper.

> **Note sur SMART** — les objectifs pédagogiques sont souvent formulés selon le
> sigle SMART : **S**pécifiques, **M**esurables, **A**tteignables,
> **P**ertinents (*Relevant* : alignés sur un enjeu métier réel),
> **T**emporellement définis.
>
> ⚠️ On voit fréquemment « **R**éalistes » à la place de « pertinents ». C'est
> une erreur : « réaliste » fait doublon avec « atteignable », et l'on perd la
> seule dimension qui relie l'objectif au besoin — celle que le module 1 défend
> pendant quarante minutes.

**Livrables** : arbre des objectifs · storyboard · maquette · parcours · plan
d'évaluation.

**Durée typique** : 15 à 25 % du projet.

⚠️ **Erreur fréquente** : une conception trop abstraite pour être développée.

#### PHASE 3 — DÉVELOPPER

**Objectif** : produire les ressources.

**Activités** : rédiger les scripts · produire les vidéos · créer les modules ·
concevoir les supports · développer les évaluations · intégrer à la plateforme ·
contrôle qualité · relecture par les experts métier.

**Livrables** : modules finalisés · vidéos · ressources téléchargeables · guide
formateur · paquet normalisé pour la plateforme.

**Durée typique** : 40 à 50 % du projet — la phase la plus longue.

⚠️ **Erreur fréquente** : démarrer sans conception validée. C'est le premier
déroulé de l'introduction.

#### PHASE 4 — METTRE EN ŒUVRE

**Objectif** : déployer.

**Activités** : chargement sur la plateforme · test du parcours complet ·
formation des formateurs · communication · lancement · support · suivi du
démarrage.

**Durée typique** : 5 à 10 % du projet.

#### PHASE 5 — ÉVALUER

**Objectif** : mesurer et améliorer.

**Activités** : dispositif d'évaluation aux quatre niveaux (module 6) · analyse
des données d'usage · recommandations.

**Durée typique** : continue — avant, pendant, après.

---

### ⚠️ PARTIE 1 bis : Ce qu'il faut savoir sur ADDIE avant de s'en servir

*(Cette section n'existait pas. C'est le pendant de la critique de Kirkpatrick au
module 6.)*

#### 1. ADDIE n'a pas d'acte de naissance

On attribue généralement ADDIE au modèle de 1975 cité plus haut. Mais la
recherche qui a tenté de retrouver le **document fondateur** du « modèle ADDIE »
n'en a trouvé aucun : le sigle est une **étiquette apposée après coup** à toute
une famille de démarches de conception.
*[à sourcer : Molenda, M. (2003), « In Search of the Elusive ADDIE Model »]*

**Conséquence pratique** : il n'existe pas de version canonique d'ADDIE. Chaque
organisation a la sienne. Quand un prestataire vous dit « nous appliquons
ADDIE », cela ne vous renseigne presque pas.

#### 2. Ce n'est pas un modèle validé, c'est un cadre organisateur

Ses cinq phases ne sont pas des découvertes sur l'apprentissage. Ce sont les
phases génériques de n'importe quel projet : analyser, concevoir, produire,
déployer, évaluer. Elles disent **dans quel ordre travailler**, jamais **ce qui
rend une formation efficace**.

C'est précisément pourquoi ce parcours ne s'arrête pas là : les modules 3 à 5
portent sur ce qu'ADDIE ne dit pas.

#### 3. Sa faiblesse structurelle : la validation arrive tard

Dans un ADDIE tenu strictement, la première confrontation aux apprenants réels
intervient après le développement — après la dépense la plus lourde. C'est
exactement la critique qui a produit SAM.

#### 4. Ce qu'il faut en retenir

ADDIE est un excellent **langage commun** : tout le monde le connaît, il structure
la conversation avec un commanditaire, il garantit qu'aucune étape ne saute.
C'est sa vraie valeur, et elle est réelle.

Ce n'en est pas une garantie de qualité pédagogique. **Une formation peut suivre
ADDIE à la lettre et ne rien produire.**

---

### 📚 PARTIE 2 : Le modèle SAM

#### Origine

**SAM** — *Successive Approximation Model* — proposé par **Michael Allen (2012)**
dans *Leaving ADDIE for SAM*, pour les projets complexes et changeants.

**Philosophie** : approche itérative. Cycles courts, retours continus.

#### Les 3 phases

**PHASE 1 — PRÉPARATION** (1 à 2 semaines)
Cadrer rapidement la vision : ateliers courts · entretiens ciblés · définition
d'un périmètre minimal · contraintes critiques.
*Livrables* : document de vision (2-3 pages) · personas sommaires · maquettes.

**PHASE 2 — CONCEPTION ET DÉVELOPPEMENT ITÉRATIFS** (6 à 12 semaines, cycles de 2 semaines)

- **Cycle 1** — prototype basse fidélité, testé avec 5 à 10 utilisateurs,
  identification des problèmes majeurs
- **Cycle 2** — prototype intermédiaire interactif, testé avec 10 à 15
  utilisateurs, affinage
- **Cycles 3 et suivants** — production progressive module par module, test
  immédiat, correction au fil de l'eau

**PHASE 3 — MISE EN ŒUVRE ET ÉVALUATION** (2 à 4 semaines)
Déploiement progressif (10 % → 50 % → 100 %) · suivi en direct · correctifs
rapides · plan de version suivante.

---

### 📚 PARTIE 3 : Comparaison ADDIE / SAM

> ⚠️ **Ce tableau résume des tendances rapportées par les praticiens de chaque
> modèle, pas des mesures comparatives.** Il n'existe pas d'étude contrôlée
> comparant ADDIE et SAM sur des projets équivalents. Utilisez-le comme une aide
> à la conversation avec un commanditaire, pas comme une preuve.

| Critère | ADDIE | SAM |
|---|---|---|
| Approche | Séquentielle | Itérative |
| Cycles de retour | Un, tardif | Plusieurs, continus |
| Flexibilité | Faible | Élevée |
| Prévisibilité budgétaire | Forte | Plus variable |
| Test utilisateur | En fin de parcours | En continu |
| Changement en cours de projet | Coûteux | Absorbé |
| Documentation | Exhaustive | Légère |
| Taille d'équipe adaptée | Large | Restreinte |

### 🎯 Tableau décisionnel

| Contexte | Choix |
|---|---|
| Projet petit, stable, bien défini (conformité, formation initiale) | ✅ ADDIE |
| Projet grand, complexe, évolutif (nouvelle plateforme, sujet émergent) | ✅ SAM |
| Délai strict et périmètre figé | ✅ ADDIE |
| Commanditaire dont le besoin évolue | ✅ SAM |
| Commanditaire avec une vision claire et stable | ✅ ADDIE |
| Accès continu aux apprenants pour tester | ✅ SAM |
| Aucun accès aux apprenants avant la livraison | ✅ ADDIE — SAM devient impraticable |

---

### 📚 PARTIE 4 : L'approche hybride

**C'est ce qui se pratique le plus souvent en réalité.**

```
MOIS 1-2 : ADDIE phases 1-2 — analyse et conception rigoureuses
├─ Analyse complète du besoin
├─ Conception validée
└─ Socle stable établi

MOIS 3-5 : SAM cycles 1-3 — développement itératif
├─ Développement module par module
├─ Tests utilisateurs continus
└─ Améliorations incrémentales

MOIS 6 : ADDIE phases 4-5 — déploiement et évaluation
├─ Déploiement
├─ Dispositif d'évaluation (module 6)
└─ Plan de version suivante
```

**Ce qu'on y gagne** : l'analyse solide d'ADDIE, l'agilité de SAM sur la phase la
plus coûteuse, et un dispositif d'évaluation posé dès le départ.

---

## 3️⃣ RÉFLÉCHIR — Quiz et journal

**Q1** — Projet pour une structure en forte croissance, dont les besoins changent
toutes les deux semaines. Quel modèle ?
A) ADDIE · **B) SAM** ✅ · C) Aucun · D) On repousse

*Explication* : SAM est conçu pour les contextes changeants. ADDIE coûterait cher
en reprises.

**Q2** — Quel est le plus grand risque d'ADDIE ?
A) Un développement trop rapide
B) **Découvrir tardivement que la conception était fausse** ✅
C) Trop de retours utilisateurs
D) Un budget insuffisant

*Explication* : ADDIE valide la conception avant de développer. Si la conception
est fausse, la découverte survient après la phase la plus coûteuse.

**Q3** — Vrai ou faux : SAM demande **moins** de contact avec les utilisateurs
qu'ADDIE.
A) Vrai · **B) Faux** ✅

*Explication* : SAM en demande beaucoup plus — en continu, au lieu d'une fois.

**Q4** — Un prestataire vous dit : « nous appliquons la méthode ADDIE ». Que
savez-vous de sa démarche ?
A) Qu'elle suit un standard précis
B) **Presque rien — il n'existe pas de version canonique d'ADDIE** ✅
C) Qu'elle est validée scientifiquement
D) Qu'elle sera longue

*Explication* : ADDIE est une étiquette générique appliquée après coup à une
famille de démarches. Demandez le détail des livrables de chaque phase.

**Q5** — Dans le sigle SMART appliqué aux objectifs pédagogiques, le R signifie :
A) Réaliste · **B) Pertinent (*Relevant*)** ✅ · C) Rigoureux · D) Reproductible

*Explication* : « réaliste » ferait doublon avec « atteignable ». Le R relie
l'objectif à un enjeu métier réel.

### 💭 Journal personnel

**Q1** — Mon contexte penche plutôt vers ADDIE, SAM ou l'hybride ?
**Q2** — Mon plus grand défaut en conduite de projet ? (sauter l'analyse ·
développer trop tôt · trop peu tester · documenter insuffisamment)
**Q3** — Quelle phase d'ADDIE je maîtrise le moins ?

---

## 4️⃣ APPLIQUER — Exercice pratique (15 min)

### Cas : planifier un projet de formation

Un directeur vous dit :

> *« On veut former 3 000 conseillers à vendre les produits IA. Quatre mois.
> 200 K€. »*

**Éléments de contexte**
- Besoins stables ? Oui — l'offre est définie
- Apprenants accessibles ? Oui
- Retours possibles en cours de route ? Oui — un groupe pilote est disponible
- Budget flexible ? Peut-être
- Délai négociable ? Non

### Votre mission

**Partie A (5 min)** — Choisir ADDIE, SAM ou hybride, et justifier.
**Partie B (10 min)** — Produire un rétroplanning : étapes, jalons, équipe,
livrables.

### Correction suggérée

**Partie A — hybride**
- Besoins stables → une analyse et une conception complètes se justifient
- Délai de 4 mois non négociable → des cycles courts en développement
- Apprenants accessibles → les tests continus sont possibles
- Le budget se pilote mieux en développant par vagues

**Partie B — rétroplanning**

```
MOIS 1 à 1,5 — ADDIE : analyse et conception
├─ S1     : entretiens (métier + 10 conseillers)
├─ S2-3   : 3 personas + analyse d'écart
├─ S4     : scénario + prototype basse fidélité
├─ S5     : retour commanditaire + affinage
└─ Livrables : cahier des charges + storyboard

MOIS 2 à 3,5 — SAM : développement itératif
├─ Cycle 1 (S6-7)   : 4 modules pilotes, testés sur 20 conseillers
├─ Cycle 2 (S8-9)   : 12 modules, testés sur 50 conseillers
└─ Cycle 3 (S10-12) : production finale, intégration, recette

MOIS 4 — ADDIE : déploiement et évaluation
├─ S13    : déploiement 10 %
├─ S14    : montée à 50 %
├─ S15-16 : déploiement complet
└─ Livrables : dispositif d'évaluation + plan de version suivante

ÉQUIPE : 1 chef de projet (100 %) · 1 concepteur (80 %) ·
         1 développeur (60 %) · 1 analyste (30 %)

RÉPARTITION BUDGÉTAIRE indicative :
├─ Analyse et conception : 15 %
├─ Développement         : 60 %
├─ Déploiement           : 15 %
└─ Marge de sécurité     : 10 %
```

⚠️ **Le point que l'exercice doit faire ressortir** : la mesure de référence des
indicateurs métier doit être posée **pendant le mois 1**, pas au mois 4. Sinon
l'évaluation du module 6 sera impossible.

---

## 5️⃣ CONSOLIDER — Synthèse

### ✅ Ce que vous avez appris

1. ✅ **ADDIE** — 5 phases, activités, livrables, erreurs fréquentes
2. ✅ **SAM** — 3 phases, cycles itératifs
3. ✅ **Choisir** selon le contexte
4. ✅ **Hybrider** — ce qui se pratique réellement
5. ✅ **Les limites d'ADDIE** — pas de version canonique, cadre organisateur et
   non modèle validé, validation tardive
6. ✅ **SMART** — le R est « pertinent », pas « réaliste »

### 🎯 Les 3 mantras

| Mantra | Signification |
|---|---|
| **« ADDIE pour le stable, SAM pour le changeant »** | Le contexte détermine le modèle |
| **« Valider tôt coûte moins cher »** | C'est le seul vrai argument de SAM |
| **« Suivre un modèle ≠ être efficace »** | ADDIE garantit le processus, pas le résultat |

### 💡 La règle qui compte

Le meilleur modèle est celui que votre équipe appliquera vraiment, et que votre
organisation acceptera. **Un ADDIE bien tenu vaut mieux qu'un SAM mal compris.**

---

## 6️⃣ TRANSFÉRER

**Immédiatement** — Relire le tableau décisionnel et positionner votre projet en cours.
**Cette semaine** — Produire un rétroplanning réel et le présenter à votre commanditaire.
**Avant le module 3** — Repérer, dans un projet passé, le moment où la conception
a été validée pour la première fois.

---

## 📦 CONTENUS COMPLÉMENTAIRES

### 🎥 VIDÉO (10 min) — « ADDIE, SAM, hybride : trois configurations »

### 📗 MODÈLES DE RÉTROPLANNING
Gabarit ADDIE 6 mois · gabarit SAM 3 cycles · gabarit hybride 4 mois

### ⚡ ASTUCES

**Astuce 1 — Signaux d'alerte sur un projet ADDIE**
- ❌ Analyse de moins de deux semaines
- ❌ Conception validée sans prototype testé
- ❌ Développement lancé sans documentation
- ❌ Aucune recette prévue avant la mise en ligne

→ Vous êtes dans le premier déroulé de l'introduction.

**Astuce 2 — Indicateurs de suivi en mode SAM**
- Nombre d'itérations avant stabilisation
- Satisfaction des testeurs
- Nombre d'anomalies critiques trouvées en test
- Délai de correction

**Astuce 3 — La question qui tranche entre ADDIE et SAM**
*« Puis-je faire tester quelque chose à un apprenant réel dans les trois
semaines ? »* Si non, SAM est impraticable, quel que soit le contexte.

### 🗂️ FLASHCARDS
- Les 5 phases d'ADDIE et leur durée relative
- Les 3 phases de SAM
- Pourquoi ADDIE n'a pas de version canonique
- Ce qu'ADDIE ne dit pas
- SMART : la signification exacte du R
- La question qui tranche entre les deux modèles

---

## Références

- **Allen, M. W. (2012).** *Leaving ADDIE for SAM.* ASTD. → source de SAM
- **Molenda, M. (2003).** In Search of the Elusive ADDIE Model. *Performance
  Improvement.* → absence de document fondateur *[à sourcer]*
- **Kirkpatrick, D. L. (1994).** *Evaluating Training Programs.*
  Berrett-Koehler. → modèle d'évaluation, développé au module 6

> Deux références de la version précédente ont été retirées faute d'être
> vérifiables : « Crum, C. (2023), Routledge » — l'ouvrage de ce titre est
> collectif et publié en accès libre par une université — et la citation attribuée
> à « John Swink, *Lean Product Management* », dont l'auteur n'a pas pu être
> établi.

---

## 📋 Journal des corrections — 2026-07-23

| # | Problème d'origine | Correction |
|---|---|---|
| 1 | « **Scénario Réel** — Grande banque française, 2023 » et « ce qui s'est **VRAIMENT** passé » | Requalifié en deux déroulés types composés |
| 2 | « Impact métier mesuré : **−32 % incidents** ✅ » attribué à ADDIE | Remplacé par l'exigence d'une population de comparaison définie avant déploiement |
| 3 | Comparaison truquée : la version « sans méthode » cumule tous les défauts | Recentrée sur le **mécanisme** — la validation tardive coûte cher — au lieu d'une démonstration |
| 4 | SMART : « **Réalistes** » (doublon avec « atteignables ») | Corrigé en **Pertinents** (*Relevant*), avec l'explication de l'erreur |
| 5 | « ADDIE 70 % des projets · SAM 30 % » | Supprimé — non sourcé. Remplacé par une formulation qualitative défendable |
| 6 | Référence « Crum, C. (2023). Routledge » | Retirée — non vérifiable |
| 7 | Citation « John Swink, *Lean Product Management* » | Retirée — auteur non établi. L'idée est conservée sans attribution |
| 8 | Tableau comparatif présenté comme factuel | Chapeau ajouté : tendances rapportées, pas mesures. Lignes non défendables retirées |
| 9 | Incohérence du tableau décisionnel sur le budget (SAM « variable » puis « plus contrôlable ») | Ligne contradictoire supprimée |
| 10 | **Aucune critique d'ADDIE** | Partie 1 bis ajoutée : pas d'acte de naissance (Molenda 2003), cadre organisateur et non modèle validé, validation tardive, ce qu'il faut en retenir |
| 11 | Quiz de 3 questions | 5 questions, dont deux nouvelles sur l'absence de version canonique et sur SMART |
| 12 | Anglicismes et fautes : « incrémantales », « variatif », « Collectionner feedback », « Débugger en live », « changes pas tard », « la cybersécu banco », « Skipper », « overkill », « hotfixes » | Corrigés |
| 13 | Origine d'ADDIE : « créé par l'armée américaine » | Précisé : développé en 1975 par l'université d'État de Floride **pour** l'armée |
| 14 | Structure « EDRAC Améliorée » | Réordonnée en EDRACT, avec une section **Transférer** |

**Conservé intégralement** : la description des 5 phases d'ADDIE (activités,
livrables, durées, erreurs fréquentes) · la description des 3 phases de SAM · le
tableau décisionnel · l'approche hybride · l'exercice de rétroplanning · les
signaux d'alerte · les références Allen 2012 et Kirkpatrick 1994.
