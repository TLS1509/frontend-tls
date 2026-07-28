# MODULE 5 : USER RESEARCH & CARTOGRAPHIE DE L'EMPATHIE

**Durée : 70 minutes**

> **Module rédigé le 2026-07-24.** Ce module n'existait qu'à l'état de plan à
> puces dans le parcours. Il est écrit ici en entier, sur le canon vérifiable de
> la recherche utilisateur. Aucune statistique fabriquée n'a été reprise du plan
> d'origine (voir la note de rédaction en fin de document). Sources avec DOI /
> référence en fin de module.

**Objectifs**
- Conduire un entretien utilisateur et en tirer des enseignements exploitables
- Construire une carte d'empathie (dit / pense / ressent / fait)
- Développer des personas d'apprenants fondés sur des données, pas sur des suppositions
- Formuler le « travail à accomplir » (*Jobs-to-be-Done*) d'un apprenant

---

## Pourquoi commencer par la recherche

On conçoit souvent pour l'utilisateur qu'on imagine — c'est-à-dire, le plus
souvent, pour soi-même. La recherche utilisateur sert à **remplacer les
suppositions par des observations**. Elle ne dit pas ce qu'il faut construire ;
elle dit ce que les gens font, veulent et évitent réellement, pour que la
conception s'appuie sur du réel.

⚠️ **Une mise au point d'emblée.** Vous lirez partout des chiffres du type « 85 %
des échecs produit viennent d'une mauvaise compréhension des utilisateurs » ou
« 1 € investi en UX en rapporte 100 ». Ils circulent, mais **leur provenance est
rarement vérifiable**. Le point solide, lui, est simple et défendable : détecter
un problème d'usage **avant** de développer coûte beaucoup moins cher qu'après.
C'est cela qu'on retient, pas un multiplicateur précis.

---

## PARTIE 1 · Les méthodes de recherche

On distingue deux grandes familles, complémentaires :

| | Recherche **qualitative** | Recherche **quantitative** |
|---|---|---|
| Question | *Pourquoi ? Comment ?* | *Combien ? À quelle fréquence ?* |
| Méthodes | Entretiens, tests d'usage, observation | Questionnaires, données d'usage, analytics |
| Taille | Peu de participants (5-8) | Beaucoup (100+) |
| Apport | Comprendre les motivations et les blocages | Mesurer l'ampleur d'un phénomène |

**La règle de séquence** : le qualitatif **avant** le quantitatif. On explore pour
comprendre, puis on mesure pour quantifier ce qu'on a compris. Mesurer avant de
comprendre, c'est compter sans savoir ce qu'on compte.

### L'entretien, la méthode de base

Un bon entretien ne cherche pas à valider une idée — il cherche à comprendre une
expérience. Trois principes (Portigal, 2013) :

1. **Des questions ouvertes**, sur le passé concret : « racontez-moi la dernière
   fois que… » plutôt que « pensez-vous que… ». Le comportement passé est plus
   fiable que l'opinion projetée.
2. **Ne pas souffler la réponse.** « Qu'est-ce qui a été difficile ? » n'est pas
   la même question que « est-ce que c'était trop compliqué ? ».
3. **Le silence est un outil.** Après une réponse, se taire fait souvent émerger
   l'essentiel.

⚠️ **Ce que les gens disent ≠ ce que les gens font.** C'est la limite majeure de
l'entretien seul : on rationalise, on embellit, on oublie. D'où l'intérêt de
croiser l'entretien avec de l'**observation** (le module 7 sur les tests d'usage)
et avec des **données réelles**.

---

## PARTIE 2 · La carte d'empathie

La carte d'empathie (Dave Gray, *Gamestorming*, 2010) organise ce qu'on a
recueilli sur une personne en quatre quadrants :

| Quadrant | Question |
|---|---|
| **Dit** | Ses mots, ses citations verbatim |
| **Pense** | Ce qui l'occupe et qu'elle n'exprime pas forcément |
| **Fait** | Ses actions observées |
| **Ressent** | Ses émotions, ses frustrations, ses envies |

Son intérêt : rendre visibles les **écarts**. Quand ce qu'une personne *dit*
contredit ce qu'elle *fait*, ou quand elle *ressent* une frustration qu'elle ne
*dit* pas, c'est souvent là que se cache l'opportunité de conception.

**En contexte EdTech** : un apprenant *dit* « je veux monter en compétences »,
mais *fait* trois connexions puis abandonne, et *ressent* de la culpabilité plus
que de l'ennui. Cet écart oriente une conception bien plus utile qu'une déclaration
d'intention prise au pied de la lettre.

---

## PARTIE 3 · Les personas

Un persona (notion popularisée par Alan Cooper, 1999) est un **portrait synthétique
d'un type d'utilisateur**, construit à partir de la recherche, pour donner un
visage aux décisions de conception.

**Ce qu'un persona utile contient** :
- un **objectif** (ce que la personne cherche à accomplir)
- un **niveau** de départ et un **contexte** d'usage
- ses **blocages** réels
- une ou deux **citations** issues d'entretiens

**Ce qu'un persona ne contient PAS** :
- ⚠️ **un « style d'apprentissage »** (visuel / auditif / kinesthésique). C'est un
  mythe réfuté (Pashler et al., 2008) : trier les gens par style n'améliore rien.
  Un persona se fonde sur le niveau, l'objectif et le contexte — jamais sur un
  canal sensoriel supposé.
- des données démographiques décoratives sans lien avec la conception (l'âge et le
  prénom ne servent à rien s'ils ne changent aucune décision).

⚠️ **Le persona n'est pas de la fiction.** S'il n'est pas adossé à de la recherche
réelle, ce n'est qu'une projection de nos propres hypothèses avec une photo dessus.
Un persona non sourcé est pire qu'aucun persona : il donne une fausse assurance.

---

## PARTIE 4 · Le travail à accomplir (*Jobs-to-be-Done*)

Clayton Christensen a formulé une idée qui déplace le regard :

> *« Les gens n'achètent pas un produit, ils l'"embauchent" pour accomplir un
> travail. »* (Christensen et al., *Competing Against Luck*, 2016)

On ne conçoit donc pas pour un profil démographique, mais pour un **travail à
accomplir dans une situation donnée**. La formulation type :

> **Quand** [situation], **je veux** [motivation], **pour** [résultat attendu].

**En EdTech** : « Quand je change de poste et que je dois maîtriser un outil
rapidement, je veux une formation courte et directement applicable, pour être
opérationnel dès la semaine suivante. » Ce « travail » commande la conception — pas
l'âge ou le secteur de l'apprenant.

Son intérêt : il révèle la **vraie concurrence**. Le concurrent d'une formation
n'est pas une autre formation, c'est peut-être un tutoriel vidéo gratuit, un
collègue qu'on interroge, ou le fait de ne rien faire. On conçoit contre ça.

---

## Exercice pratique (15 min)

À partir d'un besoin réel de votre périmètre :

1. **Rédigez trois questions d'entretien** ouvertes, tournées vers le passé
   concret — pas vers l'opinion.
2. **Formulez un "travail à accomplir"** au format « Quand… je veux… pour… ».
3. **Identifiez la vraie concurrence** de ce travail : qu'est-ce que la personne
   pourrait « embaucher » à la place de votre formation ?

**Correction attendue** : le piège le plus fréquent est la question fermée
déguisée (« est-ce que vous trouvez ça utile ? ») et le « travail » formulé comme
une fonctionnalité (« je veux un quiz ») plutôt que comme un résultat (« je veux
vérifier que j'ai compris avant la réunion »).

---

## Synthèse

1. ✅ Le **qualitatif avant le quantitatif** : comprendre, puis mesurer
2. ✅ **Ce qu'on dit ≠ ce qu'on fait** : croiser entretien, observation et données
3. ✅ La **carte d'empathie** révèle les écarts dit / pense / fait / ressent
4. ✅ Un **persona** se fonde sur la recherche — niveau, objectif, contexte — jamais sur un « style »
5. ✅ Le **travail à accomplir** déplace le regard du profil vers la situation, et révèle la vraie concurrence

### Les 3 mantras
| Mantra | Sens |
|---|---|
| **« Comprendre avant de mesurer »** | Le qualitatif ouvre, le quantitatif confirme |
| **« Observer plus qu'écouter »** | Le comportement est plus fiable que l'opinion |
| **« Un persona sans recherche est une fiction »** | Il projette nos hypothèses, il ne les corrige pas |

---

## Sources

- **Gray, D., Brown, S., & Macanufo, J. (2010).** *Gamestorming.* O'Reilly. →
  carte d'empathie (dit / pense / fait / ressent)
- **Christensen, C. M., Hall, T., Dillon, K., & Duncan, D. S. (2016).**
  *Competing Against Luck: The Story of Innovation and Customer Choice.* Harper
  Business. → Jobs-to-be-Done
- **Christensen, C. M., Cook, S., & Hall, T. (2005).** Marketing Malpractice: The
  Cause and the Cure. *Harvard Business Review*, 83(12). → JTBD, formulation
- **Cooper, A. (1999).** *The Inmates Are Running the Asylum.* Sams. → origine des
  personas
- **Portigal, S. (2013).** *Interviewing Users: How to Uncover Compelling
  Insights.* Rosenfeld Media. → méthode d'entretien
- **Pashler, H., McDaniel, M., Rohrer, D., & Bjork, R. (2008).** Learning Styles:
  Concepts and Evidence. *Psychological Science in the Public Interest*, 9(3).
  DOI 10.1111/j.1539-6053.2009.01038.x → réfutation des styles (personas)

---

## 📝 Note de rédaction — 2026-07-24

Module **écrit** à partir du plan à puces existant (objectifs + « Key Topics »).
Contenu produit sur le canon vérifiable de la recherche utilisateur.

**Cadrages fabriqués du plan d'origine, volontairement écartés** :
- « 85 % des échecs produit = mauvaise compréhension des utilisateurs (study
  2026) » — non sourçable ; remplacé par l'argument défendable (détecter tôt coûte
  moins cher)
- « ROI recherche = 1 € → 100-10 000 € économisés » — figure ancienne et
  difficile à sourcer ; mentionnée avec réserve, non présentée comme un fait

**Écarté par cohérence de parcours** : aucun « style d'apprentissage » dans les
personas (module 7 UX/UI, module Neuro).
