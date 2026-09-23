# MODULE 7 : PROTOTYPAGE & TESTS D'UTILISABILITÉ

**Durée : 75 minutes**

> **Module rédigé le 2026-07-24.** Ce module n'existait qu'à l'état de plan à
> puces. Il est écrit ici en entier, sur le canon vérifiable des tests
> d'utilisabilité. Le seul chiffre marquant du parcours — « 5 utilisateurs = 85 %
> des problèmes » — est **exact et correctement attribué** (Nielsen & Landauer,
> 1993) ; il est conservé et précisé. Sources en fin de module.

**Objectifs**
- Créer des prototypes de fidélité croissante (du croquis à l'interactif)
- Conduire un test d'utilisabilité modéré et non modéré
- Analyser les résultats et itérer
- Restituer les constats aux parties prenantes

---

## Pourquoi tester

Une conception n'est jamais juste du premier coup. Le test d'utilisabilité est le
moyen le moins cher de découvrir **où les gens se bloquent** — avant que ce blocage
ne soit codé, déployé, et payé. Le principe fondateur : *« testez avec de vrais
utilisateurs, ou testez avec des fantômes »* — sans observation réelle, on
projette ses propres hypothèses.

---

## PARTIE 1 · Les niveaux de fidélité d'un prototype

On ne teste pas tout au même stade. La **fidélité** monte à mesure que les
questions se précisent :

| Fidélité | Support | Ce qu'on teste |
|---|---|---|
| **Basse** | Croquis papier, wireframe | La structure, le parcours, la logique |
| **Moyenne** | Maquette cliquable (Figma) | La navigation, les libellés, les écrans |
| **Haute** | Prototype réaliste, quasi-final | Le détail visuel, les micro-interactions, le ressenti |

**La règle** : tester **tôt et bas**. Un croquis papier révèle un problème de
parcours en cinq minutes ; découvrir ce même problème sur un prototype haute
fidélité coûte des heures de refonte. On monte en fidélité seulement quand les
questions structurelles sont réglées.

**Outils** : Figma (le standard, prototypage intégré), Framer (animations
avancées), papier (le plus rapide pour la basse fidélité — à ne pas mépriser).

---

## PARTIE 2 · Combien d'utilisateurs — le vrai chiffre

C'est le résultat le plus cité, et le plus souvent déformé. Le voici exactement.

Nielsen & Landauer (1993) ont modélisé la découverte des problèmes
d'utilisabilité : chaque utilisateur testé révèle en moyenne une part **L ≈ 31 %**
des problèmes. La formule qui en découle montre que **~5 utilisateurs suffisent à
révéler environ 85 % des problèmes** d'une interface.

⚠️ **Trois précisions qui changent tout** :

1. **« 85 % des problèmes découverts par 5 participants » n'est pas « 85 % de
   garantie avant lancement ».** C'est un taux de découverte, pas une assurance
   qualité. Il reste des 15 %, et certains sont importants.
2. **Mieux vaut trois tests de 5 qu'un test de 15.** Chaque cycle corrige, puis on
   re-teste sur une version améliorée. La découverte se renouvelle à chaque
   itération (Nielsen, 2000).
3. **Le chiffre vaut pour une population homogène.** Si votre produit sert des
   groupes très différents (débutants et experts), il faut ~5 personnes *par
   groupe*.

C'est la raison d'être du test d'utilisabilité : **quelques participants bien
observés suffisent** pour trouver l'essentiel. On n'a pas besoin d'un grand
échantillon pour découvrir des problèmes — on en a besoin pour les *quantifier*
(module 5, quantitatif).

---

## PARTIE 3 · Conduire le test

**Modéré ou non modéré ?**

| | Modéré | Non modéré |
|---|---|---|
| Déroulé | Un animateur guide en direct | Le participant fait seul, enregistré |
| Force | On peut relancer, creuser | Rapide, moins cher, plus de participants |
| Faiblesse | Coûteux en temps | On ne peut pas relancer |

**La méthode centrale : le protocole "penser à voix haute"** (*think-aloud*). On
demande au participant de **verbaliser ce qu'il pense** pendant qu'il agit : « je
cherche… je ne vois pas… je clique là parce que… ». On accède ainsi à son
raisonnement, pas seulement à son résultat.

**Trois règles d'animation** :
1. **Donner une tâche, pas un mode d'emploi.** « Inscrivez-vous à un cours de votre
   choix », pas « cliquez sur le bouton bleu ».
2. **Ne pas aider.** Le silence de l'animateur est inconfortable, mais c'est là
   qu'on apprend. Aider, c'est fausser le test.
3. **Observer le comportement, pas seulement l'opinion.** Ce que le participant
   *fait* prime sur ce qu'il *dit* penser du produit à la fin.

**Mesurer avec le SUS.** Le *System Usability Scale* (Brooke, 1996) est un
questionnaire standard de 10 items qui donne un score sur 100. Il permet de
comparer des versions et de se situer : le score **moyen se situe autour de 68**
(Sauro & Lewis, 2016) — en dessous, l'utilisabilité est un point faible.

---

## PARTIE 4 · Analyser, itérer, restituer

**Analyser** : on regroupe les observations par problème, pas par participant. Un
problème rencontré par 3 personnes sur 5 est prioritaire ; un problème isolé, à
surveiller. On distingue **la gravité** (combien ça bloque) de **la fréquence**
(combien de personnes le rencontrent).

**Itérer** : c'est le cœur de la démarche. Analyser → prioriser les corrections →
refaire → re-tester. Un produit ne devient bon que par ce cycle, pas par une
conception unique parfaite. *« Si tout le monde est d'accord avec vous, testez
encore. »*

**Restituer** : les constats ne servent que s'ils sont entendus. Un bon rapport
est **court, hiérarchisé et incarné** — quelques problèmes majeurs, classés par
gravité, illustrés par un extrait vidéo ou une citation de participant. Une vidéo
de dix secondes où un utilisateur se bloque convainc mieux que dix pages
d'analyse.

⚠️ **Ce qu'on ne promet pas** : qu'un produit testé « réussira ». Le test réduit
le risque, il ne le supprime pas. Présenter le test comme une garantie de succès,
c'est reproduire la surpromesse que ce parcours corrige ailleurs.

---

## Exercice pratique (20 min)

Sur une fonctionnalité existante (par exemple l'inscription à un cours) :

1. **Écrivez une tâche** à confier au participant — un objectif, pas des
   instructions.
2. **Faites-la réaliser par deux personnes** en « penser à voix haute ». Observez
   sans aider.
3. **Notez les problèmes par gravité**, pas par personne.
4. **Formulez trois corrections** prioritaires.

**Correction attendue** : le piège n°1 est d'aider le participant (« il suffit de
cliquer ici ») — ce qui détruit la valeur du test. Le piège n°2 est de noter des
opinions (« il a trouvé ça joli ») plutôt que des blocages observés.

---

## Synthèse

1. ✅ **Tester tôt et bas** : le papier révèle les problèmes de structure en cinq minutes
2. ✅ **~5 utilisateurs = ~85 % des problèmes** (Nielsen & Landauer, 1993) — un taux de découverte, pas une garantie
3. ✅ **Trois tests de 5 > un test de 15** : la découverte se renouvelle à chaque itération
4. ✅ **Penser à voix haute** donne accès au raisonnement, pas seulement au résultat
5. ✅ **Itérer** est le cœur : analyser, corriger, re-tester

### Les 3 mantras
| Mantra | Sens |
|---|---|
| **« Tester tôt, tester petit »** | 5 personnes bien observées suffisent pour l'essentiel |
| **« Ne pas aider »** | Le silence de l'animateur est là où l'on apprend |
| **« Observer, pas demander »** | Le comportement prime sur l'opinion |

---

## Sources

- **Nielsen, J., & Landauer, T. K. (1993).** A mathematical model of the finding
  of usability problems. *Proceedings of INTERCHI '93*, 206-213.
  DOI 10.1145/169059.169166 → le modèle « 5 utilisateurs / L ≈ 31 % »
- **Nielsen, J. (2000).** *Why You Only Need to Test with 5 Users.* Nielsen Norman
  Group. nngroup.com → itérer par cycles de 5
- **Virzi, R. A. (1992).** Refining the test phase of usability evaluation: How
  many subjects is enough? *Human Factors*, 34(4), 457-468.
  DOI 10.1177/001872089203400407 → la question de la taille d'échantillon
- **Brooke, J. (1996).** SUS: A 'quick and dirty' usability scale. In P. W. Jordan
  et al. (Eds.), *Usability Evaluation in Industry.* Taylor & Francis. → le System
  Usability Scale
- **Sauro, J., & Lewis, J. R. (2016).** *Quantifying the User Experience* (2ᵉ éd.).
  Morgan Kaufmann. → le score SUS moyen (~68) et son interprétation
- **Krug, S. (2010).** *Rocket Surgery Made Easy.* New Riders. → tests
  d'utilisabilité « faits maison »

---

## 📝 Note de rédaction — 2026-07-24

Module **écrit** à partir du plan à puces existant. Contenu produit sur le canon
vérifiable des tests d'utilisabilité.

**Conservé et précisé** : le chiffre « 5 utilisateurs = 85 % des problèmes » est
exact (Nielsen & Landauer, 1993) — je l'ai gardé en précisant que c'est un **taux
de découverte**, pas une garantie avant lancement, et en ajoutant la nuance des
cycles répétés.

**Cadrage fabriqué du plan d'origine, écarté** : « l'itération rend les produits
3× plus performants (study 2025) » — étude fantôme, retirée. Le principe
(itérer améliore) est conservé sans le multiplicateur inventé.
