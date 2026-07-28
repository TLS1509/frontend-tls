# Les frameworks d'ingénierie pédagogique face à la preuve

**Rapport de recherche documentaire — 23 juillet 2026**
105 agents · 1 564 recherches et lectures de sources · 8 affirmations confirmées,
**17 rejetées à la vérification**

---

## Le verdict, en une phrase

**Sur les six frameworks d'ingénierie pédagogique encodés dans
`config/prompt-buddy.config.mjs`, aucun n'est un cadre validé expérimentalement
en tant que cadre.**

Ce n'est pas une raison de les retirer. C'est une raison de **changer ce que
l'outil en dit**.

---

## Framework par framework

### ADDIE — « étiquette parapluie, pas d'objet stable à tester »

Ce n'est ni un modèle d'ingénierie pédagogique ni un cadre validable : c'est une
**étiquette rétrospective, sans auteur unique, transmise par tradition orale**,
qui désigne la famille des modèles de conception systématique.

Molenda (2003) a cherché le document fondateur du « modèle ADDIE ». Il n'en a
trouvé aucun. Son article a été republié comme « classique » en 2015.

> ⚠️ Ce résultat **précise** ce que le document de corrections sourcées TLS
> indiquait (IPISD, Branson, Florida State University, 1975). L'IPISD est bien
> l'ancêtre le plus souvent cité — mais il n'est pas « ADDIE », et le sigle n'a
> pas de spécification d'origine.

**Confiance : élevée** · vote 3-0

### Kirkpatrick — « modèle de pratique sans base expérimentale, usage à borner »

Modèle importé de la formation industrielle, à portée restreinte, **dont la
hiérarchie causale n'est pas validée empiriquement**. Ce n'est pas un cadre
d'évaluation validé pour l'éducation.

Source majeure que je n'avais pas : **Yardley & Dornan (2012)**, *Medical
Education* — une critique argumentée de l'usage de Kirkpatrick comme hiérarchie
de preuve. Complétée par Allen, Hay & Palermo (2022) et par la méta-analyse
d'Alliger *et al.* (1997), déjà utilisée dans le module 6 corrigé.

**Confiance : élevée** · vote 3-0

### Merrill — « synthèse de théories, validation ultérieure limitée »

Les *First Principles* ne sont pas dérivés d'une expérimentation. Merrill l'écrit
lui-même dans l'article de 2002 :

> « This paper is a preliminary report. »
> « There is no attempt in this paper to identify the empirical support for these
> principles. »

Il inscrit « identifier le support empirique de chaque principe » au programme
de travail **à venir**.

⚠️ **Piège de versionnage pour la config** : la formulation encodée — Problème,
Activation, Démonstration, Application, Intégration — correspond bien à l'article
princeps de 2002, mais **ce n'est pas la dernière formulation de Merrill**
(reformulations 2009, 2013, 2022, centrées « tâche »). Et les cinq items ne sont
pas de même rang.

**Confiance : élevée** · vote 3-0

### Gagné — « soutenu partiellement, base probante étroite et fragile »

Une première méta-analyse existe (Frontiers in Medicine, 2025). Mais :

- corpus limité à **la formation aux professions de santé**, 10 études sur 11
  concentrées géographiquement
- qualité méthodologique faible sur l'ensemble du corpus
- **hétérogénéité extrême** — I² de 95 % et 90 %, très au-dessus du seuil de
  75 % que le manuel Cochrane qualifie déjà de « considérable »

**Conséquence directe** : les valeurs d'effet de 1,5 à 1,8 qui circulent **ne
doivent jamais être citées comme « la » taille d'effet de Gagné**. L'effet poolé
n'est pas interprétable comme une valeur unique.

**Confiance : élevée** · vote 3-0
*(La lecture positive de la même méta-analyse a été rejetée 0-3. À ne pas recycler.)*

### Bloom révisée — « soutenu partiellement, mode d'emploi à corriger »

Utilisable, **mais l'usage dominant est fragilisé** : les listes de verbes par
niveau, pour rédiger les objectifs et calibrer les quiz.

Larsen *et al.* (2022) suggèrent de mobiliser **les deux dimensions** de la
taxonomie — type de connaissance × processus cognitif — et jugent les verbes
seuls insuffisants.

> ⚠️ **Ceci corrige mon propre travail.** Le module 4 corrigé est construit autour
> d'une liste de verbes par niveau. Ce n'est pas faux, mais c'est incomplet : il
> faut y ajouter la mise en garde bidimensionnelle. Voir « ce qu'il reste à faire ».

⚠️ **Précision de modalité** : les auteurs écrivent « we suggest », pas « il est
interdit de ». Les lectures fortes — « réfutation empirique », « invalidation des
listes de verbes » — ont été **rejetées 0-3** et ne doivent pas être écrites.

**Confiance : moyenne** · vote 3-0 sur la recommandation des auteurs

### EDRACT — ⚠️ CORRECTION : c'est EDRACT® de C-Campus, PAS une « structure maison »

> **⚠️ Correction du 2026-07-24 (vérification web de première main).** L'intitulé et la
> conclusion d'origine de cette section — « structure maison », « signature TLS » —
> **sont FAUX.** **EDRACT® est un modèle déposé de C-Campus**, co-fondé par **Marc
> Dennery** (père de Pierre-Armand Dennery, associé TLS) et **Henri Occre**. Il combine
> les **9 événements d'instruction de Gagné** et le **cycle expérientiel de Kolb** ; le
> terme « EDRACT » n'apparaît nulle part hors C-Campus (aucun équivalent sous ce nom
> dans une autre langue). La recherche interne avait seulement constaté « aucune base
> probante propre » — vrai *au sens de la validation empirique* — et en avait déduit à
> tort une origine « maison ». **Ne pas présenter EDRACT comme une méthode TLS :
> l'attribuer à C-Campus.** Détail : `docs/learning/application/cours/00-CADRE-PEDAGOGIQUE.md`
> · mémoire `reference_edract_ccampus`.

Aucune base probante *propre* (validation empirique du modèle **en tant que tel**) n'a
été trouvée — comme pour la plupart des séquences pédagogiques. Cela ne dit rien de son
**origine**, qui est C-Campus (voir correction ci-dessus), ni de ses **composants**
(Gagné, Kolb), eux établis.

Les vérificateurs ont examiné une **route de secours** : ancrer EDRACT par
analogie avec le modèle 5E, qui dispose, lui, d'une méta-analyse. **Cette route a
été rejetée** — quatre tentatives de transfert votées 0-3 (trois d'entre elles) et
1-2.

Le détail est instructif pour vous : même le 5E ne tient pas ce qu'on lui prête.
Il n'a jamais été comparé empiriquement au modèle en trois phases dont il dérive,
il a été diffusé dix-neuf ans avant sa première étude, et il n'est pas démontré
supérieur aux autres méthodes actives — **c'est le caractère actif de
l'enseignement qui porte l'effet, pas le nombre de phases**.

**Confiance : faible** — aucune affirmation positive n'a survécu

---

## Ce que ça change pour Prompt Buddy

La valeur de ces cadres est **organisationnelle et communicationnelle** : ce sont
des listes de contrôle de conception qui empêchent d'oublier une étape, et un
langage commun avec un commanditaire. Elle n'est pas probante.

**Trois pistes concrètes**, par ordre de coût :

**1. Ajouter un champ `evidence` aux entrées de `FRAMEWORKS`.**
Par exemple `evidence: 'pratique' | 'partiel' | 'soutenu'`, affiché dans
l'interface. C'est de la config pure — aucun rebuild, cohérent avec la règle n°1.
Ça rendrait visible, au moment du choix, ce que le cadre vaut.

**2. Corriger le `guidance` de Merrill** pour lever l'ambiguïté de version, ou
assumer explicitement l'alignement sur l'article de 2002.

**3. Attribuer EDRACT® à C-Campus** dans son `explain` (⚠️ recommandation **corrigée le
2026-07-24** — la version d'origine disait « assumer EDRACT comme structure maison /
signature TLS », ce qui est **faux**). EDRACT® est le modèle déposé de C-Campus
(Dennery/Occre, lignée Gagné + Kolb). L'usage par TLS est légitime (filiation Dennery),
mais il **s'attribue**, il ne se revendique pas comme maison.

---

## ⚠️ Ce que cette recherche n'a PAS produit

C'est la limite la plus importante de ce rapport, et elle est explicite.

Le brief comportait trois questions. **Une seule a été couverte.**

| Question | Résultat |
|---|---|
| 1 · Validité des 6 frameworks | ✅ Traitée, 8 affirmations confirmées |
| 2 · Cadres manquants (4C/ID, UDL, backward design, SAM, LTEM) | ❌ **Zéro affirmation survivante** |
| 3 · Tailles d'effet des 6 lentilles sciences cognitives | ❌ **Zéro affirmation survivante, aucune taille d'effet vérifiée** |

**Je ne comblerai pas ces deux trous de mémoire.** C'est précisément sur les
lentilles — récupération active, espacement, charge cognitive — que la
littérature méta-analytique est la plus fournie et **la plus facile à mal citer**.
Les marqueurs `[à sourcer]` des modules 3 et 5 restent donc en place.

**Deux autres réserves à ne pas effacer** :

- **Périmètres disciplinaires.** Trois des cinq sources centrales viennent de
  domaines étroits : Yardley & Dornan porte sur l'éducation *médicale*, la
  méta-analyse Gagné sur les *professions de santé*, l'étude Bloom sur un corpus
  de *biologie universitaire*. L'extrapolation à la formation professionnelle
  française est défendable, mais doit s'écrire comme une extrapolation.
- **Accès aux textes.** Trois sources majeures sont sous péage — Yardley &
  Dornan, Molenda 2003, et la version typographiée de Merrill 2002. La
  vérification s'est faite par résumés officiels et indexeurs institutionnels.
  Pour Merrill, par le manuscrit soumis hébergé par l'auteur, **dont le libellé
  diffère de la version publiée**.

---

## Bibliographie vérifiée

Toutes ces références ont été contrôlées via Crossref, OpenAlex, PubMed, ERIC ou
Semantic Scholar. Elles sont réutilisables telles quelles.

### Méta-analyses et revues systématiques

| Référence | Se rapporte à |
|---|---|
| Frontiers in Medicine (2025) — DOI **10.3389/fmed.2025.1522830** · PMC12011725 | Gagné — première méta-analyse |
| Larsen, T. M., Endo, B. H., Yee, A. T., Do, T., & Lo, S. M. (2022). *Probing Internal Assumptions of the Revised Bloom's Taxonomy* — PubMed **36112622** · DOI **10.1187/cbe.20-08-0170** | Bloom révisée |
| Alliger, G. M., Tannenbaum, S. I., Bennett, W., Traver, H., & Shotland, A. (1997). *Personnel Psychology* — DOI **10.1111/j.1744-6570.1997.tb00911.x** | Kirkpatrick — relations entre niveaux |
| Méta-analyse du modèle 5E — DOI **10.1177/23328584241269866** | 5E — route de transfert vers EDRACT, **rejetée** |
| Revue sur le 5E — DOI **10.1007/s10763-023-10357-y** | 5E — même statut |
| DOI **10.3102/0034654316689306** · DOI **10.1007/s10648-023-09745-1** · DOI **10.3389/feduc.2021.581216** | Sources périphériques collectées, non exploitées dans ce cycle |
| Brunmair & Richter — méta-analyse (Université de Wurtzbourg) | Interleaving — **non exploitée** |

### Sources institutionnelles et officielles

| Référence | Se rapporte à |
|---|---|
| **What Works Clearinghouse** (Institute of Education Sciences) — Practice Guide 20072004 | Non exploitée dans ce cycle |
| **Education Endowment Foundation** — Teaching and Learning Toolkit, volet *Feedback* | Lentille « feedback » — **non exploitée** |
| **Deans for Impact** — *The Science of Learning* | Lentilles — **non exploitée** |
| **Cochrane Handbook for Systematic Reviews of Interventions** | Seuils d'hétérogénéité I² |
| **ERIC EJ657839** (Institute of Education Sciences) | Merrill |

### Ouvrages et articles de référence

| Référence | Se rapporte à |
|---|---|
| Merrill, M. D. (2002). *First Principles of Instruction*. ETR&D 50(3), 43-59 — DOI **10.1007/BF02505024** (2 066 citations OpenAlex) | Merrill — article princeps |
| Merrill (2009) — DOI **10.4324/9780203872130-9** · *First Principles Revisited* (2022) — DOI **10.1007/978-3-030-28745-0_56** | Merrill — reformulations ultérieures |
| Molenda, M. (2003). *In search of the elusive ADDIE model*. Performance Improvement 42(5) — DOI **10.1002/pfi.4930420508** · republication 2015 DOI **10.1002/pfi.21461** | ADDIE |
| Branch, R. M. (2009). *Instructional Design: The ADDIE Approach*. Springer — DOI **10.1007/978-0-387-09506-6** (2 927 citations) | ADDIE |
| Molenda, M. (2022). *History and Development of Instructional Design and Technology*. Springer — DOI **10.1007/978-981-19-2080-6_4** | ADDIE — histoire du domaine |
| Yardley, S., & Dornan, T. (2012). *Kirkpatrick's levels and education 'evidence'*. Medical Education 46(1), 97-106 — DOI **10.1111/j.1365-2923.2011.04076.x** | Kirkpatrick — critique centrale |
| Allen, Hay & Palermo (2022). Medical Education — DOI **10.1111/medu.14654** | Kirkpatrick |
| Reeves et al. — BEME Guide No. 39 — DOI **10.3109/0142159x.2016.1173663** | Kirkpatrick — *diffusion*, pas validité |
| Anderson, L. W., & Krathwohl, D. R. (2001). *A Taxonomy for Learning, Teaching, and Assessing*. Longman | Bloom — architecture bidimensionnelle |
| Dessus, P. (2014). *Distances et médiations des savoirs*, n° 5 — DOI **10.4000/dms.524** | Merrill — traduction francophone à comité de lecture |
| Le Louarn & Pottiez (2010), actes AGRH | Kirkpatrick — source francophone |
| Gardner (Utah State University) — DOI **10.26076/5f14-c0a3** | Merrill — test empirique isolé |
| Vaudrey et al. (2024). Medical Science Educator — DOI **10.1007/s40670-024-02267-7** | Merrill — étude qualitative, **ne mesure aucun acquis** |

---

## Ce qu'il reste à faire

1. **Reprendre le module 4** pour ajouter la mise en garde bidimensionnelle sur
   les verbes de Bloom (Larsen *et al.*, 2022), en respectant la modalité des
   auteurs — « suggèrent », pas « interdisent ».
2. **Compléter les références de Kirkpatrick** dans le module 6 avec Yardley &
   Dornan (2012), qui est la critique la plus solide et que je n'avais pas.
3. **Lancer un second cycle de recherche** sur les deux questions non traitées :
   les tailles d'effet des six lentilles, et les cadres absents — 4C/ID en
   priorité, seul candidat sérieux d'un cadre adossé à une théorie testée.
4. **Décider** si `FRAMEWORKS` gagne un champ `evidence`.
