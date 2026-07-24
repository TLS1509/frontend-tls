# Défaut 3 — La validation humaine n'est pas conçue : options de conception

> **2026-07-24.** Étude de solutions pour le défaut où le **RGPD art. 22 mord aujourd'hui**
> (voir [`REVUE-TRANSVERSALE-CDC`](REVUE-TRANSVERSALE-CDC.md), défaut 3, et le socle juridique
> dans [`REGLEMENTAIRE-ET-SBO`](REGLEMENTAIRE-ET-SBO.md)).
> Trois options, chacune évaluée sous six lentilles : **apprenance · instructional design ·
> biais cognitifs & neurosciences · UX/UI · conformité (RGPD art. 22 + AI Act art. 14) ·
> faisabilité technique**.
> ⚠️ Propositions à trancher en métier. Rien n'est engagé.
> ⚠️ **Je ne suis pas juriste.** Le volet conformité prépare une conversation avec un conseil,
> il ne la remplace pas — et aucune option ci-dessous ne « rend conforme » à elle seule.
> Série « solutions par défaut » (un document par défaut) — celui-ci traite le défaut 3.

---

## Rappel du problème, reformulé en question de conception

Dans `CoachCorrectionInterface.tsx`, le coach évalue un niveau via un `DreyfusSlider` qui écrit
`dreyfusAssessed`. Mais `handleSubmit` ne lit que `feedback.trim()` et se contente de
`setSubmitted(true)` : **la note de niveau est jetée**. Elle n'a d'ailleurs nulle part où aller —
le type `Correction` (`types/learning.ts`) ne porte que `coachFeedback` en texte libre, la table
`coaching_corrections` (cahier 04) ne stocke qu'un `status` et des commentaires libres, et le
cahier laisse un **`TBD` explicite (ligne 1492)** : *« Auto-update Passeport after JAC approval? »*.

Autrement dit : **la montée de niveau est un effet de bord, pas un acte tracé.** Or c'est
*exactement* l'artefact censé démontrer l'« intervention humaine significative » qui fait sortir le
passeport du régime de décision automatisée. La vraie question n'est pas technique (« quel champ
persister ») mais de conception :

> **Comment concevoir la validation humaine pour qu'elle soit (1) réellement *significative* — pas
> un tampon — (2) auditable, (3) sans être vécue comme une bureaucratie qui alourdit le coach et
> scolarise l'apprenant ?**

Un invariant, commun aux trois options et non négociable — le pendant de la règle du défaut 1
(« l'auto-déclaration n'écrit jamais le niveau ») :

> **Une validation réduite à un clic n'écrit jamais un niveau.** Le niveau ne s'inscrit que par un
> acte humain *étayé*, où la personne qui valide a vu sur quoi se fonde la proposition et **pouvait
> dire non**. C'est la définition même du *meaningful human control* — l'intervention humaine
> significative.

### L'asymétrie qui gouverne toute la lentille « conformité »

Mettre un humain dans la boucle n'a **pas le même statut** dans les deux régimes, et c'est
contre-intuitif (source : [`REGLEMENTAIRE-ET-SBO`](REGLEMENTAIRE-ET-SBO.md) §1) :

| | Effet de l'intervention humaine |
|---|---|
| **RGPD art. 22** | **Exemption.** Un humain qui évalue *réellement* — en connaissance de cause, avec le pouvoir de contredire — fait *tomber* le trigger. La décision n'est plus « exclusivement automatisée ». |
| **AI Act art. 14** | **Obligation.** La supervision humaine ne fait **pas** sortir du haut risque : c'est une condition à remplir *parce qu'*on y est. |

**Conséquence de conception :** une bonne validation sert les deux — elle *défend* l'exemption
art. 22 (le sujet immédiat) **et** matérialise l'obligation de supervision art. 14 (le sujet de
décembre 2027). Mais elle ne dispense d'aucun des deux : la qualification haut risque, elle, dépend
de **l'usage de la sortie** (développement de la personne vs affectation de tâches), pas de la
qualité de la validation. C'est une décision produit, pas un réglage d'écran.

---

## OPTION A — La validation **attestée**

**L'idée.** On garde le geste du coach aussi léger qu'aujourd'hui (feedback en texte libre + un
niveau posé au slider), mais on le **persiste comme une attestation formelle** : qui, quel niveau
`ancien → nouveau`, une *justification de niveau* courte (distincte du feedback pédagogique),
horodatage, signature. Un seul champ de plus qu'aujourd'hui. C'est le strict minimum pour combler
le trou d'auditabilité — et brancher le `dreyfusAssessed` aujourd'hui jeté.

```
Attestation  · Communication · Sophie Martin
├── niveau        D2 → D3
├── justification "Médiation structurée, critères de succès explicités : passe le seuil D3."
├── validé par    Coach — Sophie Marchand
├── horodatage    19 mai 2026, 14:32
└── → écrit dans le passeport comme preuve à provenance (sourceType: coach_validation)
```

| Lentille | Évaluation |
|---|---|
| **Apprenance** | 🟡 L'apprenant reçoit un verdict *tracé* et une justification lisible — mieux qu'un nombre nu. Mais la validation reste un acte du coach *sur* lui : peu de co-construction, faible métacognition. |
| **Instructional design** | 🟡 Le feedback libre *peut* être élaboré (un feedback substantiel construit la compétence bien mieux qu'un simple *knowledge of result*) — mais rien ne le **garantit** : le champ accepte « OK, niveau 3 ». La justification séparée aide sans imposer de structure. |
| **Biais & neuro** | 🔴 Le point faible. Rien ne s'oppose **structurellement** au *biais d'automatisation* : un slider pré-positionné par l'IA + un champ libre = le terrain idéal du rubber-stamping, et la *complaisance envers l'automatisation* fait le reste. Le biais d'indulgence du validateur n'est pas contré. |
| **UX/UI** | 🟢🟢 La plus légère : on persiste ce que l'écran capture déjà, on ajoute un champ « pourquoi ce niveau ». Friction quasi nulle. **Impératif :** afficher la proposition IA *et son rationale* **avant** le bouton de validation — jamais après, sinon on *induit* le tampon. |
| **Conformité** | 🟡 Crée enfin l'artefact auditable (qui / `old→new` / justification / horodatage / signature) → répond à l'exigence de **trace**. Mais « significative » demande plus qu'une trace : une validation systématique sans analyse indépendante **ne compte pas** (art. 22). La trace prouve l'*acte*, pas son *sérieux*. Faible pour l'art. 14. |
| **Faisabilité** | 🟢🟢 La plus proche du code : persister le slider, ajouter `rationale`, écrire un enregistrement à la `PasseportEnrichment` (`verifiedBy/verifiedAt`, `old→newDreyfusLevel`, `sourceType`). Débloque le `TBD` 1492 sans big bang. |

**En un mot.** Ferme le trou d'auditabilité *immédiatement*, mais laisse la porte grande ouverte au
rubber-stamping : la trace existe, la garantie de sérieux non. **Un plancher, jamais un plafond.**

---

## OPTION B — La validation **par rubrique**

**L'idée.** Un niveau ne peut pas être asserté sans **scorer une rubrique explicite** : les
critères *observables* de chaque niveau Dreyfus pour cette compétence. Le coach lit le travail,
note chaque critère, commente, et le niveau se *déduit* de la grille avant d'être signé. Le patron
existe déjà dans le code, cantonné au silo Projects : `Jac.rubricScores` + `DreyfusRubricScore`
(`{ criterion, score, comment }`) dans `types/projects.ts` — à **généraliser** au coaching, pas à
inventer.

```
Communication — palier D3      critère                     score   commentaire
├── Lit la situation ..........  écoute active, reformule ..  D3 ..  "entretiens individuels sans jugement"
├── Adapte sa posture .........  ajuste selon le contexte ..  D3 ..  "bascule médiation → cadrage"
└── Anticipe ..................  prévoit les frictions .....  D2 ..  "intervention un peu tardive, cf. son propre constat"
    → niveau proposé : D3 (2 critères sur 3 au seuil)  — le coach tranche et signe
```

| Lentille | Évaluation |
|---|---|
| **Apprenance** | 🟡 La rubrique rend explicite « ce que D3 exige » → l'apprenant sait quoi viser (précieux, et sécurisant : la cible n'est pas arbitraire). 🔴 Mais risque de **scolariser** : cocher une grille peut ramener une logique d'examen, à rebours de l'andragogie, si elle est présentée comme un contrôle et non comme une carte. |
| **Instructional design** | 🟢🟢 Le plus valide et fiable : c'est le *constructive alignment* (Biggs) — critères observables alignés sur les niveaux, état de l'art de l'évaluation de compétence. Le commentaire *par critère* produit naturellement un **feedback élaboré** (supérieur au simple knowledge of result). |
| **Biais & neuro** | 🟢🟢 La rubrique est l'**antidote structurel** à la fois à la complaisance envers l'automatisation et au biais d'indulgence : on ne peut pas tamponner une grille sans faire l'analyse — la friction cognitive est ici une *fonctionnalité*, pas un défaut. 🟡 Réserve : une rubrique mal écrite fossilise un jugement discutable. |
| **UX/UI** | 🔴 La plus dense côté coach (grille critère × niveau). Mitigeable par *progressive disclosure* et pré-remplissage prudent. Côté apprenant, bon repère **si** présentée comme une carte, pas comme un barème de contrôle. La règle « rationale avant le bouton » est ici *native* : la grille **est** l'écran d'analyse. |
| **Conformité** | 🟢🟢 La plus défendable pour prouver le **sérieux** de l'analyse : la grille scorée est la preuve matérielle d'un examen indépendant — exactement ce que « significative » exige (art. 22) et ce qu'une supervision réelle attend (art. 14). Sert les deux régimes. *(Renforce l'argument ; ne le garantit pas — cf. réserves finales.)* |
| **Faisabilité** | 🟡 Le patron existe (`Jac.rubricScores`) → à généraliser du silo Projects au coaching. Le vrai coût est **métier**, pas technique : écrire les rubriques (compétence × niveau). À ne pas sous-estimer. |

**En un mot.** Le plus rigoureux et le plus vendable en B2B conformité. Le coût est humain (écrire
les rubriques), le risque est la scolarisation — à désamorcer par l'UX (une carte, pas un contrôle).

---

## OPTION C — La validation **collégiale**

**L'idée.** Une montée de niveau qui *engage* (un jalon certifiant) exige **deux validateurs** —
coach + manager, ou coach + pair — qui attestent chacun, et surtout **peuvent diverger**, ce qui
déclenche une réconciliation documentée. L'app *montre* déjà l'intention : `PasseportJac.tsx`
affiche `validatedBy: ['Manager', 'Coach']`, et le cahier 04 anticipe le cas de divergence
(« Manager dit D2, les évaluations coach montrent D4 », lignes 276-283). Rien n'est implémenté.

| Lentille | Évaluation |
|---|---|
| **Apprenance** | 🟢 Deux regards valent mieux qu'un ; si le second est un **pair**, la validation devient un acte social motivant (reconnaissance par les siens), andragogiquement riche. 🟡 Mais risque de vécu « jury » si mal cadré — attention à la **sécurité psychologique** de l'apprenant (la divergence doit se régler entre validateurs, pas l'exposer). |
| **Instructional design** | 🟢 La triangulation (auto-perception / coach / manager ou pair) épouse le modèle Dreyfus, *qualitatif par nature* : plusieurs lectures expertes d'une même situation. Réserve : sans rubrique partagée, deux avis restent deux impressions. |
| **Biais & neuro** | 🟢 La triangulation réduit le biais d'indulgence *individuel*. 🔴 Mais introduit un risque **social** propre : la *diffusion de responsabilité* — chacun suppose que l'autre a fait l'analyse sérieuse (une forme collective de complaisance envers l'automatisation). **Deux tampons ne valent pas mieux qu'un.** |
| **UX/UI** | 🔴 Le plus lourd : deux files, un état d'attente, un écran de réconciliation en cas de divergence, la question du départage. Coordination = friction, et latence pour l'apprenant. |
| **Conformité** | 🟢🟢 Structurellement le plus proche du *meaningful human control* : la **possibilité de contredire** n'est pas seulement offerte, elle est *instrumentée*. Le **log de divergence/réconciliation** est la meilleure preuve qu'une validation n'est pas un tampon — et le « taux de contradiction non nul » que le cahier 13bis veut suivre comme **indicateur de conformité** devient structurel, pas espéré. |
| **Faisabilité** | 🔴 Le plus lourd, et **ne passe pas à l'échelle** sans assez de validateurs : goulot pour une équipe de deux et un client à 500 salariés. L'intention est dans le mock (`validatedBy`), l'implémentation (double flux + réconciliation) est entièrement à faire. |

**En un mot.** La garantie *structurelle* la plus forte d'un contrôle humain réel — mais coûteuse,
non scalable seule, et vulnérable à la diffusion de responsabilité **si elle n'est pas adossée à une
rubrique**. Un plafond, pour les paliers qui le méritent.

---

## Matrice de synthèse

| Critère | A — Attestée | B — Rubrique | C — Collégiale |
|---|---|---|---|
| Preuve du **sérieux** de l'analyse (anti rubber-stamp) | 🔴 | 🟢🟢 | 🟡 (fort *avec* rubrique, faible seul) |
| Feedback constructif pour l'apprenant | 🟡 | 🟢🟢 | 🟢 |
| Auditabilité / traçabilité | 🟢 | 🟢🟢 | 🟢🟢 |
| Défense RGPD art. 22 (exemption) | 🟡 | 🟢🟢 | 🟢🟢 |
| Satisfaction art. 14 AI Act (obligation) | 🟡 | 🟢🟢 | 🟢 |
| Charge / friction coach | 🟢🟢 faible | 🔴 forte | 🔴 forte |
| Passage à l'échelle | 🟢🟢 | 🟡 | 🔴 |
| Risque de scolarisation / effet jury | 🟢 | 🔴 | 🟡 |
| Proximité du code existant | 🟢🟢 (persister le slider) | 🟢 (`Jac.rubricScores`) | 🟡 (mock `validatedBy`) |

**Ce que la matrice montre** : aucune option ne gagne partout, et les trois **ne sont pas
concurrentes** — elles répondent à des enjeux de niveau différent. **A est un plancher**
(l'auditabilité, tout de suite), **B est la substance** (la preuve du sérieux), **C est le plafond**
(la contradiction rendue structurelle). Et un enseignement dur : **C sans B, ce sont deux
tampons.** La rubrique est la pièce porteuse — pas le nombre de validateurs.

---

## Recommandation — un socle non négociable, trois régimes gradués

Je tranche. **B (la rubrique) est le socle obligatoire de toute montée de niveau. A n'est jamais
suffisant seul pour un palier — c'est l'enveloppe de persistance, pas la preuve. C se réserve au
seul jalon certifiant, et toujours *par-dessus* B. Une règle d'or UX gouverne les trois.**

### Pourquoi ce n'est pas « A + un peu de B quand on a le temps »

Une attestation nue (A) est *précisément* le geste qui « ne compte pas » au sens de l'art. 22 : un
opérateur qui valide sans analyse indépendante n'est pas une intervention significative. Donc A
seul, sur un changement de niveau, **recrée le défaut** sous une forme mieux tracée — ce qui est
pire, car ça *donne l'apparence* de la conformité. B n'est pas une montée en gamme optionnelle de
A : c'est le plancher dès qu'un niveau change.

### Les trois régimes, selon ce que le palier engage

| Régime | Pour quoi | Qui valide | Forme de la preuve |
|---|---|---|---|
| **Feedback itératif** | correction de mission, échange — **sans** montée de niveau | coach seul | attestation A : feedback élaboré, tracé. Aucun niveau asserté → **hors art. 22** |
| **Montée de niveau** | changement de niveau Dreyfus intermédiaire | coach seul | **rubrique B** scorée + justification + signature |
| **Jalon certifiant** | palier majeur, JAC, Open Badge exportable | coach + (manager **ou** pair) — régime C | **rubrique B × 2 validateurs** + log de divergence/réconciliation |

Ce découpage résout la tension centrale : **on ne met pas la lourdeur de C sur un simple retour de
mission, ni la légèreté de A sur un credential.** L'exigence est proportionnée à ce que le niveau
engage — pédagogiquement juste (une compétence attestée *mérite* une preuve forte) et
économiquement tenable (le temps humain va là où il compte).

### La règle d'or UX, transverse aux trois

**Le rationale de la proposition (IA ou passeport) s'affiche AVANT tout contrôle de validation, et
le bouton « valider » ne se déverrouille qu'après interaction avec la rubrique.** Jamais
rationale-après. C'est le levier anti-biais-d'automatisation le plus important, et la traduction
concrète de la règle du cahier 13bis (`rationale` compréhensible par le coach, affiché avant le
bouton). Corollaire : suivre le **taux de contradiction/ajustement** comme **indicateur de
conformité, jamais de performance** — un taux proche de zéro n'est pas un bon coach, c'est le
symptôme d'une validation automatique.

### Comment ça résout le `TBD` 1492

*« Auto-update Passeport after JAC approval? »* → **non, pas d'auto-update silencieux.** Le
passeport s'écrit *parce qu'*un humain a signé une rubrique scorée : la « mise à jour » **est**
l'attestation, un acte humain, journalisé comme un enregistrement à la `PasseportEnrichment`
(`sourceType: coach_validation` / `jac_validation`). C'est le même objet que la colonne vertébrale
de la preuve du [défaut 1](SOLUTIONS-01-PREUVE.md) — la validation coach *est* un `EvidenceRef`. Un
seul chantier data sert les deux défauts.

### Pourquoi c'est le bon arbitrage

- **Apprenance** : la rubrique rend la cible lisible et non arbitraire (sécurité psychologique) ; le
  jalon certifiant peut s'ouvrir à un *pair* (social, andragogique) sans transformer chaque
  micro-feedback en examen.
- **Conformité** : tout niveau qui « affecte » la personne passe par une rubrique scorée — l'argument
  de l'exemption art. 22 repose sur la *substance*, pas sur une signature ; l'obligation de
  supervision art. 14 est *matériellement* étayée. **Honnêteté requise :** cela *renforce* la
  défense, ne la *garantit* pas. La qualification finale dépend de l'usage de la sortie et relève
  d'une AIPD + d'un conseil (renvoi [`CDC-13BIS-RGPD`](CDC-13BIS-RGPD-PROPOSITIONS.md)).
- **Faisabilité** : on réutilise `DreyfusRubricScore` / `Jac.rubricScores` (généralisés du silo
  Projects) + l'enveloppe `PasseportEnrichment` ; on persiste `dreyfusAssessed`. Le vrai coût est
  l'écriture des rubriques — humain, métier, incompressible.
- **Positionnement SBO** : la validation devient un **acte d'expert documenté**, pas un clic — ce
  qui distingue TLS d'un LMS et rend le passeport crédible auprès d'une DRH d'ETI.

### L'invariant, redit

**Une validation réduite à un clic n'écrit jamais un niveau.** Le niveau s'inscrit uniquement par
une rubrique scorée, signée par un humain compétent qui a vu le rationale d'abord et **pouvait dire
non** — et, pour un credential, contredit par un second regard.

---

## Ce qu'il reste à décider (et que je ne peux pas trancher seul)

1. **Le barème des régimes** : quels paliers exigent C (coach + manager) vs C (coach + pair) vs B
   seul ? Probablement : intra-niveau = A itératif, changement de niveau = B, niveau ≥ D4 ou badge
   = C. Décision **pédagogique métier**.
2. **L'écriture des rubriques** (le vrai coût, *humain*) : compétence × niveau. Commencer par les
   5-6 compétences du passeport, pas les 13 types d'items. À ne pas sous-estimer.
3. **Le départage en cas de divergence (C)** : qui tranche ? Le cahier 04 pose « coach = autorité
   finale sur le niveau réel » (ligne 283) — à graver, ou à ouvrir à une médiation.
4. **Le pair comme validateur** : andragogiquement riche et moins coûteux que le coach — mais un
   pair a-t-il l'« autorité » requise au sens de l'art. 22 ? **Question juridique ouverte, que je
   ne tranche pas.** À poser au conseil (elle figure déjà dans [`REGLEMENTAIRE-ET-SBO`](REGLEMENTAIRE-ET-SBO.md), Q1bis).
5. **L'AIPD** conditionne la mise en service, pas le code — à porter en parallèle. Aucune de ces
   options ne dispense de l'analyse d'impact.
6. **Ce qui reste vrai quoi qu'on choisisse** : l'intervention humaine est une *exemption* côté
   RGPD art. 22 mais une *obligation* côté AI Act art. 14. Bien conçue, la validation sert les deux ;
   elle ne fait sortir du haut risque *ni l'un ni l'autre* — seul l'usage de la sortie le décide.

---

## Journal

**2026-07-24** — Création. Troisième document de la série « solutions par défaut ». Le défaut :
la validation coach (le `DreyfusSlider` de `CoachCorrectionInterface`) est un effet de bord jeté au
`submit`, sans champ dans `Correction` ni dans `coaching_corrections`, avec un `TBD` explicite
(cahier 04, ligne 1492). Trois options évaluées sous six lentilles — validation **attestée** (léger,
trace mais tampon possible) / **par rubrique** (constructive alignment, antidote structurel à la
complaisance envers l'automatisation) / **collégiale** (contradiction instrumentée, mais diffusion
de responsabilité et non scalable). Recommandation **tranchée** : la **rubrique est le socle
obligatoire** de toute montée de niveau (A seul recrée le défaut sous une trace trompeuse) ; C
réservé au jalon certifiant, toujours par-dessus B ; règle d'or UX transverse : rationale **avant**
le bouton, taux de contradiction suivi comme indicateur de **conformité**. Le `TBD` 1492 se résout
en « pas d'auto-update — l'attestation signée *est* la mise à jour », branchée sur l'objet-preuve du
défaut 1. Asymétrie art. 22 (exemption) / art. 14 (obligation) maintenue explicite. **Je ne suis pas
juriste : ce document renforce une défense, il ne la garantit pas — l'AIPD et le conseil tranchent.**
