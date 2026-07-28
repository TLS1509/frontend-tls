# MODULE 10 : PRIORISATION & FEUILLE DE ROUTE

**Durée : 65 minutes**

> **Module rédigé le 2026-07-24.** Ce module n'existait qu'à l'état de liste
> « Key Topics ». Il est écrit ici en entier. Les frameworks de priorisation ont
> été **vérifiés par recherche web** (attributions et dates). Sources en fin de
> module.

**Objectifs**
- Prioriser des initiatives avec des méthodes explicites (RICE, MoSCoW, Kano)
- Distinguer ce qui satisfait de ce qui enchante (Kano)
- Construire une feuille de route défendable
- Intégrer les contraintes propres à l'EdTech

---

## Pourquoi une méthode de priorisation

Une équipe produit a toujours plus d'idées que de moyens. Sans méthode, c'est
l'avis le plus fort — pas le plus juste — qui l'emporte. Les frameworks de
priorisation ont un objectif commun : **remplacer le débat d'opinion par un
raisonnement explicite et comparable**. Ils ne décident pas à votre place ; ils
rendent la décision discutable et traçable.

---

## PARTIE 1 · RICE — un score comparable

Le modèle **RICE** a été créé par Sean McBride, product manager chez **Intercom,
en 2018**, précisément pour sortir les débats de priorisation du « ressenti ».
Chaque initiative reçoit un score à partir de quatre facteurs :

| Facteur | Question |
|---|---|
| **Reach** (portée) | Combien de personnes touchées sur une période donnée ? |
| **Impact** | Quel effet sur celles qui sont touchées ? |
| **Confidence** (confiance) | À quel point mes estimations sont-elles étayées ? |
| **Effort** | Combien de ressources cela demande-t-il ? |

**RICE = (Reach × Impact × Confidence) ÷ Effort**

**L'apport le plus fin de RICE, c'est la Confiance** : elle force à signaler quelles
estimations reposent sur des données et lesquelles sont des paris. Une idée
séduisante mais peu étayée voit son score baisser — ce qui est sain.

⚠️ **Un score n'est pas une décision.** RICE ordonne des initiatives comparables ;
il ne remplace pas le jugement, surtout quand les chiffres d'entrée sont eux-mêmes
des estimations. C'est une aide à la conversation, pas un oracle.

---

## PARTIE 2 · MoSCoW — le tri par nécessité

La méthode **MoSCoW** (Dai Clegg, formalisée dans le cadre DSDM) classe les
éléments en quatre niveaux d'exigence :

| Niveau | Sens |
|---|---|
| **Must** (doit) | Indispensable — sans lui, la livraison échoue |
| **Should** (devrait) | Important mais non vital pour cette livraison |
| **Could** (pourrait) | Souhaitable si le temps le permet |
| **Won't** (pas cette fois) | Explicitement écarté pour cette version |

Sa force est le **« Won't »** : décider explicitement ce qu'on ne fait *pas*
maintenant est aussi important que décider ce qu'on fait. Une liste de priorités
où tout est « Must » n'est pas une priorisation.

---

## PARTIE 3 · Kano — satisfaire ou enchanter

Le **modèle de Kano** (Noriaki Kano, **1984**, *Attractive Quality and Must-Be
Quality*) distingue des types de caractéristiques selon leur effet sur la
satisfaction :

| Type | Effet |
|---|---|
| **Basiques** (*must-be*) | Leur absence provoque le rejet ; leur présence ne réjouit pas — c'est attendu |
| **De performance** | Plus il y en a, plus la satisfaction monte, proportionnellement |
| **Attractives** (*delighters*) | Leur présence enchante ; leur absence ne manque pas — elles surprennent |

**L'enseignement pour l'EdTech** : on ne peut pas *tout* rendre « attractif ». Il
faut d'abord garantir les **basiques** (un lecteur qui marche, une progression
sauvegardée) — leur absence ruine tout le reste — avant d'investir dans les
enchantements. Et les caractéristiques attractives **se banalisent** avec le
temps : l'enchantement d'hier devient le basique de demain.

---

## PARTIE 4 · Les contraintes propres à l'EdTech

Une feuille de route EdTech intègre des contraintes que d'autres produits n'ont
pas :

- **Le calendrier pédagogique** : les rythmes d'apprentissage (rentrées, sessions,
  échéances) contraignent les fenêtres de livraison bien plus que pour un produit
  grand public.
- **La protection des données des apprenants** : le **RGPD** (Europe) et, en
  contexte scolaire américain, le **FERPA** encadrent strictement les données
  d'apprenants. Une fonctionnalité qui les ignore n'est pas priorisable, quel que
  soit son score RICE.
- **La validité pédagogique** : une fonctionnalité peut augmenter l'engagement et
  *nuire* à l'apprentissage (module 9). La feuille de route doit protéger
  l'efficacité pédagogique, pas seulement les métriques d'usage.

💡 **Ces contraintes sont des filtres, pas des scores.** Elles s'appliquent
*avant* la priorisation : une initiative qui viole le RGPD ou la validité
pédagogique est écartée d'emblée, pas classée.

---

## Exercice pratique (15 min)

Sur trois initiatives de votre périmètre :

1. **Classez-les en MoSCoW** — et forcez-vous à mettre au moins une en « Won't ».
2. **Qualifiez chacune selon Kano** — basique, performance, ou attractive ?
3. **Passez le filtre EdTech** : y en a-t-il une qui augmenterait l'engagement au
   détriment de l'apprentissage, ou qui touche aux données d'apprenants ?

**Correction attendue** : le piège n°1 est de tout classer « Must ». Le piège
n°2 est d'investir dans une caractéristique « attractive » alors qu'un « basique »
est encore défaillant.

---

## Synthèse

1. ✅ Les frameworks **remplacent l'opinion par un raisonnement comparable**
2. ✅ **RICE** : un score, dont la Confiance signale les paris (McBride, Intercom, 2018)
3. ✅ **MoSCoW** : la force est le « Won't » explicite
4. ✅ **Kano** : garantir les basiques avant d'enchanter ; l'attractif se banalise
5. ✅ Les **contraintes EdTech** (calendrier, RGPD/FERPA, validité pédagogique) sont des filtres appliqués avant la priorisation

### Les 3 mantras
| Mantra | Sens |
|---|---|
| **« Un score n'est pas une décision »** | RICE aide la conversation, il ne la remplace pas |
| **« Décider ce qu'on ne fait pas »** | Le "Won't" de MoSCoW est le vrai geste de priorisation |
| **« Les basiques avant les enchantements »** | Un delighter ne sauve pas un must-be défaillant |

---

## Sources

- **McBride, S. / Intercom (2018).** *RICE: Simple prioritization for product
  managers.* intercom.com/blog → origine et formule de RICE *(attribution vérifiée)*
- **Clegg, D., & Barker, R. (1994).** *Case Method Fast-Track: A RAD Approach.*
  Addison-Wesley → méthode MoSCoW (cadre DSDM)
- **Kano, N. (1984).** Attractive Quality and Must-Be Quality. *Journal of the
  Japanese Society for Quality Control*, 14(2), 39-48 → le modèle de Kano
  *(attribution et année vérifiées)*
- **Règlement (UE) 2016/679 (RGPD)** — protection des données ; **FERPA** (Family
  Educational Rights and Privacy Act, États-Unis) — données scolaires

---

## 📝 Note de rédaction — 2026-07-24

Module **écrit** à partir de la liste « Key Topics ». Les quatre frameworks
nommés ont été **vérifiés par recherche web** avant rédaction : RICE (Sean
McBride, Intercom, 2018) et Kano (Noriaki Kano, 1984, *Attractive Quality and
Must-be Quality*) confirmés ; MoSCoW attribué à Dai Clegg (cadre DSDM). Le
fact-check certifié UX/UI (§8) les marquait déjà comme canon correct.

**Ajout par cohérence de parcours** : la contrainte « validité pédagogique » comme
filtre de priorisation — un produit d'apprentissage ne priorise pas une
fonctionnalité qui nuit à l'apprentissage, même bien notée (lien module 9 et
doctrine TLS anti-dark-patterns).
