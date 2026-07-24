# Défaut 1 — La colonne vertébrale de la preuve : options de conception

> **2026-07-23.** Étude de solutions pour le défaut le plus structurant de la Learning App
> (voir [`REVUE-TRANSVERSALE-CDC`](REVUE-TRANSVERSALE-CDC.md), défaut 1).
> Trois options, chacune évaluée sous six lentilles : **apprenance · instructional design ·
> biais cognitifs & neurosciences · UX/UI · conformité · faisabilité technique**.
> ⚠️ Propositions à trancher en métier. Rien n'est engagé.
> Premier d'une série (un document par défaut).

---

## Rappel du problème, reformulé en question de conception

`LearnerCompetency` porte un niveau Dreyfus qui est **un nombre sans dossier**. La vraie question
n'est pas technique (« quel champ ajouter ») mais pédagogique :

> **Qu'est-ce qui fait qu'une personne *est* à un niveau donné — et qui décide ?**

Trois réponses possibles définissent trois architectures. Elles forment un spectre, de la plus
légère à la plus rigoureuse, avec des effets **très différents sur l'apprentissage**, pas seulement
sur le code.

Un invariant, commun aux trois et non négociable : **l'auto-déclaration n'écrit jamais le niveau.**
Elle peut alimenter un `selfAssessedLevel` distinct, affiché comme « ta perception ». Le niveau se
gagne par preuve. *(Fondement : le biais de Dunning-Kruger et, plus largement, la faible corrélation
auto-évaluation ↔ performance rendent l'auto-note inutilisable comme mesure — mais utile comme
donnée de calibration, cf. option retenue.)*

---

## OPTION A — Le registre de preuves, niveau **dérivé**

**L'idée.** Chaque compétence porte un journal de preuves (`EvidenceRef[]`). Chaque preuve a un
type, une source, un poids, un validateur, une date. **Le niveau Dreyfus n'est plus saisi : il est
calculé** par accumulation de preuves pondérées franchissant des seuils.

C'est l'extension directe de ce qui existe déjà dans `projects.ts` (`PasseportEnrichment`),
généralisée à toutes les sources.

```
Compétence "Ingénierie pédagogique"
├── preuve: quiz réussi (poids 1, auto)          15 mars
├── preuve: réflexion EDRA validée (poids 2, coach)  2 avril
├── preuve: mission FAST (poids 3, coach)        20 avril
└── → niveau dérivé: D3 (seuil franchi)
```

| Lentille | Évaluation |
|---|---|
| **Apprenance** | 🟡 Le niveau devient une **conséquence** de l'activité prouvée, pas une déclaration — c'est juste. Mais le niveau *arrive* à l'apprenant sans qu'il le construise : faible métacognition. |
| **Instructional design** | 🟢 Aligné avec l'*evidence-centered design* (Mislevy) au niveau des données. 🔴 Mais l'agrégation par poids est une **heuristique fragile** : trois preuves faibles ≠ une preuve forte, et un barème de points rejoue le travers « compteur » qu'on veut fuir. |
| **Biais & neuro** | 🟢 Neutralise le biais d'auto-évaluation (le système calcule). 🟡 Risque de **goal-substitution** : l'apprenant vise l'accumulation de preuves-points, pas la maîtrise. |
| **UX/UI** | 🟢 Le plus lisible : une timeline de preuves sous chaque compétence, le niveau se met à jour « tout seul ». Faible friction. 🟡 Effet « boîte noire » : *pourquoi* suis-je D3 ? — à expliciter. |
| **Conformité** | 🟡 Trace la provenance (bon pour l'auditabilité). 🔴 Mais un niveau **calculé automatiquement** est précisément une *décision automatisée* au sens de l'art. 22 — il faut une validation humaine dans la boucle, sinon on recrée le problème réglementaire. |
| **Faisabilité** | 🟢 La plus proche de l'existant. `PasseportEnrichment` fournit 80 % du modèle. Chantier data contenu. |

**En un mot.** Rigoureux sur la donnée, léger à construire, mais **retire l'agentivité** et frôle la
décision automatisée. Bon socle technique, pédagogie incomplète.

---

## OPTION B — Le portfolio **co-construit**

**L'idée.** Chaque compétence a un **dossier** que l'apprenant assemble activement. Il y range ses
preuves, écrit *pourquoi* elles attestent sa maîtrise, **propose un niveau**, et un coach (ou un
pair) valide, ajuste ou renvoie. Le niveau est **négocié entre l'apprenant et un tiers**, adossé à
un dossier narratif.

C'est le modèle du *portfolio d'apprentissage* et de la validation des acquis — l'apprenant est
l'auteur de sa preuve, pas seulement son objet.

| Lentille | Évaluation |
|---|---|
| **Apprenance** | 🟢🟢 **Le meilleur.** Constituer son dossier *est* un acte d'apprentissage : sélectionner, justifier, relier = métacognition et auto-régulation (Zimmerman). L'apprenant qui argumente « voici pourquoi je suis D3 » consolide bien plus qu'un apprenant à qui on l'annonce. |
| **Instructional design** | 🟢 Incarne la *validation des acquis* et le portfolio-based assessment. 🟢 Colle au modèle Dreyfus, **qualitatif par nature** (l'expert *lit* la situation) — un dossier narratif capte cette qualité qu'un score ne capte pas. |
| **Biais & neuro** | 🟢 L'*effet de génération* joue à plein (l'apprenant produit la justification). 🟢 La validation par un tiers corrige le biais d'auto-évaluation **sans le supprimer** : la perception de l'apprenant reste visible et devient un objet de dialogue (calibration). |
| **UX/UI** | 🟡 Plus riche donc plus lourd : un dossier par compétence, un flux de soumission/validation. Risque de friction et de page blanche. Mitigeable par *progressive disclosure* (le dossier se remplit au fil de l'eau, pas d'un coup) et par pré-remplissage automatique des preuves. |
| **Conformité** | 🟢🟢 **Idéal pour l'art. 22.** La validation humaine est *au cœur* du modèle, pas un ajout — le tiers analyse un dossier et tranche en connaissance de cause. C'est exactement l'« intervention humaine significative » exigée. |
| **Faisabilité** | 🔴 Le plus lourd. Flux de soumission, rôles, notifications, UI de dossier. Et surtout : **ne passe pas à l'échelle sans coach** — chaque validation demande du temps humain. Goulot pour une équipe de deux et pour un client à 500 salariés. |

**En un mot.** Pédagogiquement supérieur et parfait pour la conformité, mais coûteux et
dépendant du temps de coach. Le bon modèle pour les **paliers qui comptent**, pas pour chaque
micro-preuve.

---

## OPTION C — L'assertion **validée contre rubrique** (evidence-centered strict)

**L'idée.** Chaque montée de niveau est une **assertion formelle** : « cette personne a démontré D3
sur cette compétence », adossée à une ou plusieurs preuves **et** à une **rubrique explicite** (les
critères observables de chaque niveau Dreyfus). Un validateur habilité coche les critères, justifie,
signe. C'est le modèle des Open Badges 2.0 et de l'*evidence-centered design* dans sa forme complète.

| Lentille | Évaluation |
|---|---|
| **Apprenance** | 🟡 La rubrique **rend le niveau lisible** (« voici ce que D3 exige ») — précieux pour l'apprenant, qui sait quoi viser. 🔴 Mais le risque est de **scolariser** : cocher des cases contre un référentiel figé peut ramener une logique d'examen, à rebours de l'andragogie. |
| **Instructional design** | 🟢🟢 Le plus **valide et fiable** psychométriquement. La rubrique = *constructive alignment* (Biggs) : les critères d'évaluation sont explicites et alignés sur les niveaux. C'est l'état de l'art de l'évaluation de compétence. |
| **Biais & neuro** | 🟢 La rubrique réduit le **biais d'indulgence** du validateur (critères observables, pas impression globale). 🟡 Mais rigidité : une rubrique mal écrite fossilise un jugement discutable. |
| **UX/UI** | 🔴 Le plus dense côté validateur (grille de critères par niveau). Côté apprenant, la rubrique est un bon repère *si* présentée comme une carte, pas comme un barème de contrôle. |
| **Conformité** | 🟢🟢 **Le plus défendable** — RGPD art. 22 *et* AI Act (traçabilité, justification, supervision humaine art. 14). Si TLS vise le marché ETI où la conformité se vend, c'est un actif. |
| **Faisabilité** | 🔴 Le plus lourd : il faut **écrire les rubriques** de chaque niveau × chaque compétence (travail de fond, métier), plus l'UI de validation. Existe déjà en germe : `Jac.rubricScores` dans `projects.ts`. |

**En un mot.** Le plus rigoureux et le plus vendable en B2B, mais lourd et potentiellement scolaire.
Sur-dimensionné pour une flashcard, indispensable pour un **badge certifiant**.

---

## Matrice de synthèse

| Critère | A — Registre dérivé | B — Portfolio co-construit | C — Assertion + rubrique |
|---|---|---|---|
| Apprenance (métacognition) | 🟡 | 🟢🟢 | 🟡 |
| Validité de la mesure | 🟡 | 🟢 | 🟢🟢 |
| Agentivité de l'apprenant | 🔴 | 🟢🟢 | 🟡 |
| Conformité RGPD/AI Act | 🔴 (auto) | 🟢🟢 | 🟢🟢 |
| Charge / friction | 🟢 faible | 🟡 moyenne | 🔴 forte |
| Passage à l'échelle | 🟢🟢 | 🔴 (coach) | 🟡 |
| Proximité du code existant | 🟢🟢 | 🟡 | 🟢 (`Jac`) |
| Risque de scolarisation | 🟡 | 🟢 | 🔴 |

**Ce que la matrice montre** : aucune option ne gagne partout, et les trois ne sont pas
concurrentes — elles répondent à des **enjeux de niveau différent**. A est une infrastructure, B est
une pédagogie, C est une garantie. Les opposer serait une erreur.

---

## Recommandation — un modèle unique, trois régimes de preuve

Je ne recommande pas *une* option, mais **leur composition graduée** : le même registre technique,
avec un niveau d'exigence de validation qui monte avec l'enjeu du palier.

### Le socle : le registre de A, avec la sémantique de B

Généraliser `PasseportEnrichment` en une primitive `EvidenceRef` reliée à `LearnerCompetency`
(chantier A, proche du code). Mais **ne jamais dériver le niveau par un simple calcul de points** :
présenter le registre comme le **dossier de l'apprenant** (sémantique B), qu'il consulte, comprend,
et dont il est co-auteur. Le niveau n'est pas « calculé », il est **attesté** — et l'apprenant voit
quoi.

### Les trois régimes, selon l'enjeu du palier

| Régime | Pour quoi | Qui valide | Rigueur |
|---|---|---|---|
| **Preuve légère** | quiz, flashcard, réflexion libre | automatique (la source *est* la preuve) | trace, pas de validation humaine |
| **Preuve dialoguée** | montée de niveau intermédiaire, mission | coach, sur dossier (régime B) | validation humaine significative |
| **Preuve certifiante** | palier Dreyfus majeur, Open Badge | JAC : rubrique + signature (régime C) | rubrique explicite, auditable |

Ce découpage résout la tension centrale : **on ne met pas la lourdeur de C sur une flashcard, ni la
légèreté de A sur un badge certifiant.** L'exigence de preuve est proportionnée à ce que le niveau
engage — ce qui est à la fois pédagogiquement juste (une compétence experte *mérite* une preuve
forte) et économiquement tenable (le temps de coach va là où il compte).

### Pourquoi c'est le bon arbitrage

- **Apprenance** : l'apprenant construit son dossier (B) là où ça consolide, sans être noyé de
  friction sur les micro-preuves (A).
- **Conformité** : les niveaux qui « affectent » la personne (les paliers) passent tous par une
  validation humaine (B ou C) — l'art. 22 est respecté là où il s'applique, sans alourdir le reste.
- **Faisabilité** : on part du code existant (`PasseportEnrichment`, `Jac.rubricScores`) et on
  monte en rigueur progressivement, palier par palier. Pas de big bang.
- **Positionnement SBO** : le passeport devient un **dossier de preuves vérifiables**, pas un
  compteur — exactement ce qui le distingue d'un LMS, et ce qui rend Learning Buddy et la « couche
  compétences » crédibles.

### L'invariant, redit

L'auto-déclaration du positionnement **n'entre jamais** dans le registre de preuves. Elle vit dans
un champ séparé `selfAssessedLevel`, affiché comme « ta perception de départ ». Croisée plus tard
avec les preuves réelles, elle devient une **donnée de calibration** (« tu te pensais D2, tes
preuves montrent D3 » — ou l'inverse), qui est en soi un puissant levier métacognitif.

---

## Ce qu'il reste à décider (et que je ne peux pas trancher seul)

1. **Le barème des régimes** : quels paliers exigent B, lesquels exigent C ? C'est une décision
   pédagogique métier — probablement : intra-niveau = léger, changement de niveau = dialogué,
   niveau ≥ D4 ou badge = certifiant.
2. **L'écriture des rubriques** (régime C) : travail de fond, compétence par compétence. À ne pas
   sous-estimer — c'est le vrai coût de l'option C, et il est humain, pas technique.
3. **Le rôle du pair** : la validation dialoguée (B) doit-elle s'ouvrir à la validation par un pair
   (moins coûteuse que le coach, andragogiquement riche), ou rester coach-only ?
4. **La rétrocompatibilité** des `MOCK_LEARNER_COMPETENCIES` existants : niveaux actuels sans preuve
   → marqués « hérités, à re-attester » ou gelés ?

---

## Journal

**2026-07-23** — Création. Premier document de la série « solutions par défaut ». Trois options
(registre dérivé / portfolio co-construit / assertion+rubrique) évaluées sous six lentilles.
Recommandation : **un registre unique à trois régimes de preuve gradués selon l'enjeu du palier** —
compose le socle technique de A, la sémantique d'agentivité de B, la rigueur de C réservée aux
paliers certifiants. Invariant maintenu : l'auto-déclaration n'écrit jamais le niveau.
