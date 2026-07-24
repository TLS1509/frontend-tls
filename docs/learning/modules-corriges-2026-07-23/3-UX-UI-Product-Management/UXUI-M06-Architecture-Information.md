# MODULE 6 : ARCHITECTURE DE L'INFORMATION & PARCOURS UTILISATEUR

**Durée : 65 minutes**

> **Module rédigé le 2026-07-24.** Ce module n'existait qu'à l'état de plan à
> puces. Il est écrit ici en entier, sur le canon vérifiable de l'architecture de
> l'information. Aucune statistique fabriquée du plan d'origine n'a été reprise
> (note de rédaction en fin de document). Sources en fin de module.

**Objectifs**
- Maîtriser les principes d'organisation de l'information (méthode LATCH)
- Conduire un tri de cartes (ouvert / fermé) avec des utilisateurs
- Concevoir un plan de site et des parcours utilisateur
- Comprendre la « piste informationnelle » (*information scent*)

---

## Pourquoi l'architecture avant le design

Avant de dessiner un écran, il faut décider **où va quoi**. L'architecture de
l'information, c'est l'organisation, la structuration et l'étiquetage du contenu
pour que les gens **trouvent ce qu'ils cherchent et comprennent où ils sont**
(Rosenfeld, Morville & Arango, 2015).

Un bon design sur une mauvaise architecture, c'est une belle façade sur un plan
d'étage incohérent : l'utilisateur se perd malgré tout. C'est pourquoi ce module
vient **avant** le prototypage (module 7).

---

## PARTIE 1 · Les cinq façons d'organiser (LATCH)

Richard Saul Wurman (*Information Anxiety*, 1989) a montré qu'**il n'existe que
cinq manières d'organiser une information**, résumées par l'acronyme **LATCH** :

| Lettre | Organisation | Exemple |
|---|---|---|
| **L** — *Location* | Par lieu | Une carte, un magasin par rayon |
| **A** — *Alphabet* | Par ordre alphabétique | Un annuaire, un glossaire |
| **T** — *Time* | Par chronologie | Un fil d'actualité, un historique |
| **C** — *Category* | Par catégorie | Un catalogue de cours par thème |
| **H** — *Hierarchy* | Par importance / grandeur | Du plus cher au moins cher, du plus grand au plus petit |

**L'enjeu de conception** : choisir l'organisation qui correspond à la façon dont
l'utilisateur **cherche**, pas à la façon dont l'organisation *pense* son contenu.
Un catalogue de formation rangé par service interne (organisation) est inutile à
qui cherche par compétence (utilisateur).

💡 Une même information peut être organisée de plusieurs façons selon le contexte :
un catalogue de cours peut être trié par catégorie (exploration) *et* par date
(nouveautés) *et* par niveau (progression). Le choix dépend de la tâche.

---

## PARTIE 2 · L'étiquetage et la piste informationnelle

**L'étiquetage** — le nom des rubriques, des menus, des boutons — décide si
l'utilisateur trouve ou se perd. Un étiquetage juste utilise **les mots de
l'utilisateur**, pas le jargon interne. « Mes formations » est plus clair que
« Espace apprenant ».

**La piste informationnelle** (*information scent*) est la métaphore centrale : à
chaque étape, l'utilisateur évalue si un lien le **rapproche** de son but, comme
un animal suit une odeur. Une bonne piste, c'est un intitulé de lien qui prédit
fidèlement ce qu'on trouvera derrière.

⚠️ **Le piège** : les intitulés « malins » ou vagues cassent la piste. « Découvrir »
ne dit pas ce qu'on découvrira ; « Ressources » peut tout contenir. L'utilisateur
qui doute clique au hasard, ou abandonne.

---

## PARTIE 3 · Le tri de cartes

Le tri de cartes (*card sorting*, Spencer, 2009) est **la méthode pour construire
une architecture avec les utilisateurs plutôt que pour eux**. On écrit chaque
contenu sur une carte, et on demande à des participants de les regrouper.

| Type | Principe | Quand l'utiliser |
|---|---|---|
| **Ouvert** | Le participant crée et nomme ses propres groupes | Quand la structure est à découvrir |
| **Fermé** | Les catégories sont données, le participant y range les cartes | Quand on veut valider une structure existante |

**Son complément — le tree testing** : on donne à l'utilisateur une structure
(sans design) et une tâche (« où iriez-vous pour trouver X ? »), et on mesure s'il
atteint la bonne rubrique. Le tri de cartes construit ; le tree testing vérifie.

Ces méthodes sont documentées et standardisées (Nielsen Norman Group). Elles ne
demandent pas d'outil coûteux : des cartes papier suffisent pour commencer.

---

## PARTIE 4 · Plans de site et parcours utilisateur

**Le plan de site** (*sitemap*) est la carte de la structure : quelles pages
existent, et comment elles s'emboîtent. En EdTech, une hiérarchie fréquente :
`Catalogue → Cours → Modules → Leçons`, plus des espaces transversaux (profil,
progression, recherche).

**Le parcours utilisateur** (*user flow*) décrit le chemin pour accomplir une
tâche, étape par étape — y compris **les chemins d'erreur**, souvent oubliés :

```
S'inscrire à un cours
  → parcourir le catalogue
  → ouvrir la fiche d'un cours
  → cliquer « s'inscrire »
      ├─ si connecté      → confirmation → première leçon
      └─ si non connecté  → connexion/inscription → retour au cours
```

⚠️ **Le chemin d'erreur est la moitié du travail.** « Que se passe-t-il si
l'utilisateur n'est pas connecté ? s'il abandonne en route ? si le paiement
échoue ? » Concevoir seulement le « chemin heureux » laisse l'utilisateur seul
exactement au moment où il a le plus besoin d'aide.

**La navigation** se pense sur trois niveaux : **primaire** (les grandes
rubriques, toujours visibles), **secondaire** (à l'intérieur d'une rubrique), et
**tertiaire** (fil d'Ariane, pied de page). Le fil d'Ariane répond à la question
« où suis-je ? » ; la navigation primaire répond à « où puis-je aller ? ».

---

## Exercice pratique (15 min)

Sur une formation ou un espace existant :

1. **Classez son contenu selon LATCH** : quelle organisation domine
   actuellement ? Correspond-elle à la façon dont l'apprenant cherche ?
2. **Testez un intitulé de menu** auprès de deux personnes : « d'après ce mot, que
   pensez-vous trouver derrière ? » Leur réponse correspond-elle au contenu réel ?
3. **Tracez un parcours** avec son chemin d'erreur principal.

**Correction attendue** : le défaut le plus courant est une organisation « par
service » (logique interne) là où l'utilisateur cherche « par besoin », et des
intitulés vagues qui cassent la piste.

---

## Synthèse

1. ✅ **LATCH** : cinq organisations possibles — choisir celle de l'utilisateur
2. ✅ **L'étiquetage** utilise les mots de l'utilisateur, pas le jargon
3. ✅ **La piste informationnelle** : chaque lien doit prédire ce qu'on trouvera
4. ✅ **Le tri de cartes** construit l'architecture avec les gens ; le tree testing la vérifie
5. ✅ **Le chemin d'erreur** est la moitié d'un parcours

### Les 3 mantras
| Mantra | Sens |
|---|---|
| **« L'architecture avant la façade »** | Un beau design sur une mauvaise structure perd quand même l'utilisateur |
| **« Les mots de l'utilisateur, pas les nôtres »** | L'étiquetage juste supprime le jargon interne |
| **« Concevoir le chemin d'erreur »** | C'est là que l'utilisateur a le plus besoin d'aide |

---

## Sources

- **Wurman, R. S. (1989).** *Information Anxiety.* Doubleday. → la méthode LATCH
- **Rosenfeld, L., Morville, P., & Arango, J. (2015).** *Information Architecture:
  For the Web and Beyond* (4ᵉ éd.). O'Reilly. → référence de l'architecture de
  l'information
- **Spencer, D. (2009).** *Card Sorting: Designing Usable Categories.* Rosenfeld
  Media. → tri de cartes
- **Nielsen Norman Group.** *Card Sorting* et *Tree Testing* (guides
  méthodologiques). nngroup.com → méthodes de validation d'architecture
- **Krug, S. (2000).** *Don't Make Me Think.* New Riders. → navigation et clarté

---

## 📝 Note de rédaction — 2026-07-24

Module **écrit** à partir du plan à puces existant. Contenu produit sur le canon
vérifiable de l'architecture de l'information.

**Cadrages fabriqués du plan d'origine, volontairement écartés** :
- « Navigation confuse = 40 % d'abandon » — chiffre inventé, retiré
- « Mauvaise architecture = +120 % de tickets de support » — chiffre inventé,
  retiré

Le principe qualitatif (une mauvaise architecture génère perte et frustration)
est conservé ; les chiffres ne le sont pas.
