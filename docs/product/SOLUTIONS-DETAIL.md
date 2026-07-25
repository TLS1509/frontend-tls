# Solutions détaillées aux 5 incohérences — dossier consolidé

> **2026-07-24.** Fusion des 5 études (ex-`SOLUTIONS-01`→`SOLUTIONS-05`) en un dossier unique, pour désencombrer `product/`. **Rien supprimé** : contenu intégral ci-dessous, un chapitre par incohérence.
>
> 📎 Synthèse/index : [`SOLUTIONS-00-SYNTHESE`](SOLUTIONS-00-SYNTHESE.md) · rapport exécutif (Chloé → Pierre-Armand) : [`RAPPORT-COHERENCE-LEARNING-APP`](RAPPORT-COHERENCE-LEARNING-APP.md).


---

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


---

# Défaut 2 — Gamification contre attestation : options de conception

> **2026-07-23.** Étude de solutions pour le défaut de positionnement SBO de la Learning App
> (voir [`REVUE-TRANSVERSALE-CDC`](REVUE-TRANSVERSALE-CDC.md), défaut 2).
> Trois options, chacune évaluée sous six lentilles : **apprenance · instructional design ·
> biais cognitifs & neurosciences · UX/UI · conformité (SDT/éthique · RGPD) · faisabilité technique**.
> ⚠️ Propositions à trancher en métier. Rien n'est engagé.
> Deuxième d'une série (un document par défaut). Suppose la colonne de preuve du défaut 1
> ([`SOLUTIONS-01-PREUVE`](SOLUTIONS-01-PREUVE.md)) comme socle.

---

## Rappel du problème, reformulé en question de conception

Le système **récompense l'activité** — XP par entrée de journal, streaks de connexion, claim de badge
payant, dashboards enterprise qui comptent la présence — là où une SBO doit **attester la compétence
démontrée**. La question n'est pas « comment ajouter du fun » mais motivationnelle :

> **Comment entretenir l'engagement d'un adulte au travail sans corrompre la motivation qui l'amène
> déjà là — et sans jamais confondre un compteur de points avec une compétence attestée ?**

Deux distinctions gouvernent toutes les réponses.

**1. Toute récompense n'a pas le même effet.** La théorie de l'autodétermination (Deci & Ryan) et la
méta-analyse de Deci, Koestner & Ryan (1999) tranchent net : une récompense **tangible, attendue et
contingente** à une activité déjà intrinsèquement motivée **corrode** la motivation (effet de
sur-justification — Lepper, Greene & Nisbett, 1973 : l'enfant qu'on paie pour dessiner dessine moins
ensuite). Mais une récompense **informationnelle** — qui *confirme la compétence* sans la contrôler —
la **renforce**. D'où le paradoxe du produit actuel : l'Open Badge (credential qui atteste un fait,
informationnel) est une bonne récompense ; les **+20 XP versés pour une entrée de journal**
(`XP_PER_TRIGGER.journal_entry`) sont exactement la mauvaise — on rémunère l'activité la plus
intrinsèquement motivée du produit. *(La « valorisation » de la réflexion que le code croit apporter
par l'XP se paie donc en motivation ; elle doit passer par une reconnaissance informationnelle ou
relationnelle — un accusé, un commentaire coach/pair, que le Journal supporte déjà — jamais par un
jeton.)*

**2. Un badge n'est pas un jeton, et une compétence n'est pas un badge.** Un badge est l'**attestation
d'un fait daté** (émetteur, titulaire, preuve, date — la définition Open Badges elle-même). Sa valeur
*est* sa permanence et sa vérifiabilité. Un jeton, lui, est une monnaie qui se dépense. Or l'atrophie
du cahier 05 **rétrograde un badge** (D4→D3 après 90 j) : elle détruit précisément la propriété
— la permanence — qui fait qu'un badge est un credential, et contredit le même cahier qui le vend
comme « permanent, partageable sur LinkedIn ». Avoir validé D4 le 15 mars *reste vrai* le 15 juin.
Ce qui peut décliner, c'est la **compétence vivante** — fondement neuro réel : sans pratique, la
trace se déconsolide, l'élagage synaptique fait son œuvre, la courbe d'oubli joue. Mais cela doit
moduler un **signal de fraîcheur** sur la compétence, pas rétrograder l'attestation du fait passé.

Un invariant, commun aux trois options et non négociable :

> **Une mécanique d'engagement ne modifie jamais un niveau de compétence, ne rétrograde jamais un
> credential, et ne rémunère jamais la réflexion.** L'attestation (evidence-based, permanente) et le
> jeu (XP, streaks) sont deux systèmes séparés. Le déclin d'une compétence non pratiquée alimente un
> signal de *fraîcheur* non punitif, jamais un downgrade.

*Bonne nouvelle de code, à préserver : `UserStreak.totalXP`/`currentLevel` sont **déjà** distincts de
`LearnerCompetency.currentLevel` — le jeu et le niveau ne sont pas soudés dans le frontend. Et
l'atrophie-badge comme le claim payant sont, à ce jour, **spec-only** (cahier 05 + crédits) : ils ne
sont pas encore dans le modèle de types FO (`UserBadge` n'a ni `lost_at` ni `credit_cost`). Une part
du correctif est donc « ne pas implémenter tel qu'écrit », pas « défaire ».*

---

## OPTION A — Le jeu **subordonné et cloisonné**

**L'idée.** Garder XP, streaks et badges, mais les reléguer à une **couche d'engagement strictement
séparée, opt-out**, qui ne touche ni le credential ni la réflexion. On désamorce les trois mines sans
rien réinventer : l'XP quitte la réflexion (`journal_entry` → 0 ou remplacé par un accusé), l'atrophie
ne touche plus les badges (elle devient un chip « dernière pratique il y a 92 jours »), le claim
redevient gratuit. Le streak est conservé mais rendu **non punitif** (gel/réparation, précédent
Duolingo). C'est le « garde-fou commun » de la REVUE transformé en option concrète — la plus proche
des pratiques dominantes du secteur, nettoyée.

| Lentille | Évaluation |
|---|---|
| **Apprenance** | 🟢 Le credential et la réflexion cessent d'être pollués. 🟡 Mais la périphérie reste orientée points : l'apprenant peut continuer à « jouer les XP » au lieu de viser la maîtrise. Re-motive peu ; *dé-risque*. |
| **Instructional design** | 🟢 Séparation propre → l'attestation reste valide, non gamifiée. Le streak, s'il encourage une pratique *distribuée*, sert la rétention (effet d'espacement). 🟡 Mais l'XP-sur-tout continue de récompenser la quantité d'activité, pas la démonstration. |
| **Biais & neuro** | 🟢 Retirer l'XP de la réflexion supprime la sur-justification là où elle mord le plus. Le streak exploite la boucle d'habitude (indice → routine → récompense) — utile pour les tâches à faible intrinsèque. 🟡 Mais le streak s'appuie sur l'aversion à la perte : pression, anxiété, « streak-and-churn » — d'où la nécessité du gel. |
| **UX/UI** | 🟢🟢 La plus faible friction : patterns familiers, opt-out qui respecte l'autonomie, chip de fraîcheur qui remplace proprement l'atrophie punitive. |
| **Conformité (SDT/éthique · RGPD)** | 🟢 SDT : opt-out + non-punitif + zéro récompense-sur-réflexion protègent l'essentiel. 🟡 Le streak reste une motivation *contrôlée* (régulation externe) ; et si les métriques d'engagement remontent au manager, on frôle la « surveillance des travailleurs » — à cloisonner. |
| **Faisabilité** | 🟢🟢 Essentiellement de la **soustraction** (retirer l'XP-journal, l'atrophie-badge, le claim payant) + un firewall + un relabel. Le moins cher, et indépendant du défaut 1. |

**En un mot.** Le nettoyage pragmatique. Désamorce les trois mines sans rien réinventer — mais laisse
la périphérie orientée points et ne re-motive pas en profondeur. Un plancher, pas une vision.

---

## OPTION B — L'**attestation seule** : preuve, pas points

**L'idée.** L'option de fond. Retirer XP et streaks de la surface (au mieux, télémétrie interne
invisible). La **seule récompense visible est l'attestation evidence-based** : le dossier de preuves
du passeport et l'Open Badge. La motivation est portée par la **compétence rendue lisible**
(métacognition outillée), par le **goal-setting sur objectifs réels** (`CompetencyObjective` existe
déjà — Locke & Latham : un but spécifique, exigeant, *endossé* motive plus qu'un score), et par la
satisfaction intrinsèque de la maîtrise démontrée. Pour un adulte au travail, le credential *est*
l'extrinsèque qui compte — portable, partageable, lié à la carrière — et c'est un extrinsèque
**identifié/intégré** (une valeur que l'apprenant fait sienne), pas introjecté (la culpabilité du
streak rompu).

| Lentille | Évaluation |
|---|---|
| **Apprenance** | 🟢🟢 **La plus pure.** L'adulte est traité comme intrinsèquement/identifié-régulé ; le credential nourrit directement le besoin de compétence. Autodétermination maximale. |
| **Instructional design** | 🟢🟢 L'évaluation *est* la récompense : aucun proxy à optimiser. *Constructive alignment* parfait — ce qui est reconnu est exactement ce qui est démontré. |
| **Biais & neuro** | 🟢🟢 Surface de sur-justification nulle : plus aucune récompense tangible/contingente pour corroder l'intrinsèque ; le credential agit comme feedback informationnel de compétence (Deci : *renforce*). 🔴 Mais on perd l'échafaudage d'habitude — pour le novice et les prérequis secs (faible intrinsèque de départ), plus aucun nudge externe : risque de décrochage *avant* que la boucle intrinsèque ne s'amorce. |
| **UX/UI** | 🟢 Plus calme, plus premium/éditorial — cohérent avec le registre de marque TLS (classe, éditorial, pas « app à dopamine »). 🟡 Mais risque de paraître « vide » à des utilisateurs conditionnés par le gamifié ; feedback moins immédiat. |
| **Conformité (SDT/éthique · RGPD)** | 🟢🟢 La position SBO la plus défendable (on récompense l'outcome, pas la présence) et la plus propre : zéro boucle manipulatoire, zéro dark pattern, aucune métrique de présence à tendre au manager. 🟢 RGPD-léger : moins de télémétrie comportementale = minimisation des données. |
| **Faisabilité** | 🟢 Surtout de la suppression — **mais suppose la colonne de preuve (défaut 1) réelle**. Sinon on retire la récompense pour la remplacer par… un nombre nu. Dépendance forte. |

**En un mot.** Le pari puriste, le plus aligné SBO et andragogie adulte : le credential *est* la
récompense, et c'est une récompense informationnelle, donc sûre. Le plus propre éthiquement — mais
nu, périlleux tant que la colonne de preuve n'existe pas pour porter la charge motivationnelle, et il
abandonne l'échafaudage d'habitude au moment le plus fragile.

---

## OPTION C — **Deux monnaies séparées**, re-motivées par les besoins SDT

**L'idée.** Ni retirer le jeu, ni seulement le cloisonner : le **ré-ingéniérer** pour servir les trois
besoins de l'autodétermination, avec deux monnaies clairement distinctes reliées par un *contrat de
sens* explicite (l'apprenant sait toujours ce que chaque signal veut dire).

- **Autonomie** — l'apprenant fixe ses buts (`CompetencyObjective`), toute mécanique est opt-in, le
  progrès est *le sien*, pas celui de la plateforme.
- **Compétence** — l'XP-monnaie disparaît au profit d'un **progrès dérivé de la preuve** : la barre
  avance parce qu'une preuve a été validée, pas parce qu'on s'est connecté. Feedback informationnel,
  défi optimal.
- **Relation** — les leaderboards et la honte-du-streak cèdent la place à des signaux relationnels :
  buts partagés en cohorte, reconnaissance du coach, commentaire d'un pair *sur la réflexion* (déjà
  prévu au cahier 07) — jamais de l'XP.

Le streak est recadré en **rythme de pratique** que l'apprenant définit et endosse (contrat
d'habitude, gel/réparation par défaut — précédent Duolingo), cadré par l'espacement (« espace ta
pratique »), pas par le login quotidien. La North Star enterprise bascule de la présence à la
**compétence démontrée** (KPI d'outcome).

| Lentille | Évaluation |
|---|---|
| **Apprenance** | 🟢🟢 Conçue pour l'autorégulation et les trois besoins ; le plafond motivationnel le plus haut. |
| **Instructional design** | 🟢 Progression *mastery-based* + feedback informationnel = état de l'art. 🟡 Mais lourde à rendre cohérente ; risque de sur-conception. |
| **Biais & neuro** | 🟢🟢 Aligne les récompenses sur du feedback informationnel (protecteur, Deci), cadre l'espacement (levier de rétention réel), et le contrat d'habitude respecte l'autonomie. 🟡 Doit résister à re-introduire des mécaniques contrôlantes sous un nom sympathique. |
| **UX/UI** | 🔴 Le plus à construire. La **double monnaie est un vrai piège de lisibilité** : « points » et « niveau » se confondent en une seconde dans la tête de l'utilisateur — sans une clarté visuelle chirurgicale, on recrée exactement la confusion qu'on prétend guérir. |
| **Conformité (SDT/éthique · RGPD)** | 🟢🟢 L'alignement SDT le plus fort et l'intention éthique la plus explicite ; les KPI d'outcome dé-risquent la dérive de surveillance. 🟡 Plus de modélisation comportementale → surveiller la minimisation des données. |
| **Faisabilité** | 🔴 Le plus gros chantier : nouveau modèle motivationnel, UI double-monnaie, couche relationnelle/cohorte, refonte des dashboards. Le plus lourd pour une équipe de deux. |

**En un mot.** Le pari design : re-motiver par construction sur les trois besoins SDT, deux monnaies
reliées par un contrat de sens. Le plus on-brand et le plafond le plus haut — mais le plus gros build
et le vrai risque UX (la double monnaie se confond vite).

---

## Matrice de synthèse

| Critère | A — Jeu cloisonné | B — Attestation seule | C — Deux monnaies SDT |
|---|---|---|---|
| Protection de la motivation intrinsèque | 🟢 | 🟢🟢 | 🟢🟢 |
| Force de l'attestation (credential permanent) | 🟢 | 🟢🟢 | 🟢 |
| Échafaudage d'habitude (novice, tâches sèches) | 🟢🟢 | 🔴 | 🟢 |
| Alignement SBO (outcome > présence) | 🟡 | 🟢🟢 | 🟢🟢 |
| Éthique / anti-dark-pattern | 🟢 | 🟢🟢 | 🟢🟢 |
| Charge / friction de build | 🟢🟢 faible | 🟢 (soustraction) | 🔴 forte |
| Risque UX (lisibilité) | 🟢 | 🟡 | 🔴 |
| Dépendance à la colonne de preuve (défaut 1) | 🟢 quasi nulle | 🔴 forte | 🟡 moyenne |

**Ce que la matrice montre** : les trois ne sont pas concurrentes, elles opèrent à des **niveaux
différents**. A est une **hygiène** (on retire ce qui corrode), B est une **posture** (le credential
porte la motivation), C est une **construction** (un moteur de motivation SDT). A est indépendant du
défaut 1 et immédiat ; B est la destination mais suppose la preuve ; C est le plafond mais coûte cher
et risque la confusion. Les opposer serait une erreur — la bonne réponse les **compose dans le temps**.

---

## Recommandation — l'attestation est la récompense, le jeu un échafaudage mince

Je ne recommande pas *une* option, mais **leur composition séquencée** : la posture de B comme
destination, le firewall de A comme premier geste, deux emprunts bon marché à C, et le gros build de
C **différé**.

### Le principe directeur (destination = B)

**Le credential evidence-based est la récompense primaire, et c'est une récompense informationnelle —
donc sûre au sens de Deci & Ryan.** La réflexion n'est jamais payée : elle est reconnue
*relationnellement* (accusé, commentaire coach/pair). Le passeport-dossier (défaut 1) porte la charge
motivationnelle. Tout le reste est subordonné à cela.

### Le premier geste (A, immédiat, indépendant du défaut 1)

Trois soustractions qui *arrêtent l'hémorragie* sans attendre la colonne de preuve :

| Mécanique corrosive | Correctif | Ancrage code / spec |
|---|---|---|
| **Réflexion payée** (+20 XP/entrée) | Retirer `journal_entry` de la table XP (→ accusé/relationnel) | `data/gamification.ts` `XP_PER_TRIGGER` · `MOCK_XP_EVENTS` |
| **Atrophie qui rétrograde le badge** | **Ne pas** implémenter le downgrade (cahier 05 : cron 02:00, `atrophie_log`, `user_competence_badges.lost_at`). Garder `daysSinceActivity` comme *chip de fraîcheur* non punitif | `types/learning.ts` `LearnerCompetency.daysSinceActivity` (déjà présent ; aucun `dreyfus-down` modélisé) |
| **Claim payant** (1 crédit) | Rendre le claim gratuit sur la reconnaissance interne | spec-only (cahier 05 §19 + crédits) — donc « ne pas construire » |

### Deux emprunts bon marché à C (haute valeur, faible coût)

1. **Le streak recadré en rythme opt-in, non punitif** (gel/réparation — précédent Duolingo), réservé
   là où l'habitude aide réellement : le novice et les prérequis secs. Pas de streak-shame, pas
   d'alerte d'inactivité.
2. **La North Star enterprise bascule présence → compétence démontrée** : ajouter un **KPI d'outcome**
   à côté de (ou à la place de) `CompanyStats.engagementRate` (cahier 06). Optimiser la présence pousse
   les managers à harceler — ce qui se retourne ; mesurer la compétence oriente le soutien.

### Ce qui est différé (le gros build de C)

La double-monnaie complète (XP-progrès *dérivé de la preuve*, couche relationnelle/cohorte, refonte
UI) est **trop lourde et trop risquée maintenant** (équipe de deux, piège de lisibilité). À rouvrir
une fois la colonne de preuve posée et B stabilisé — c'est une V2, pas un préalable.

### Pourquoi c'est le bon arbitrage

- **On ne retire pas tout (contre B pur)** : B nu est périlleux tant que la preuve n'existe pas, et
  abandonne l'échafaudage d'habitude au moment le plus fragile. On garde donc un streak *forgiving*.
- **On ne se contente pas de cloisonner (contre A seul)** : A laisse la périphérie orientée points et
  les dashboards mesurant la présence. On y ajoute la posture de B et le KPI d'outcome.
- **Faisabilité** : le premier geste est de la soustraction, immédiat, découplé du défaut 1 ; le reste
  monte en puissance quand la preuve est là. Pas de big bang.
- **Positionnement SBO** : la récompense visible devient la **compétence attestée**, pas le compteur —
  exactement ce qui distingue une SBO d'un LMS gamifié, et ce que le marché ETI (où la conformité et
  le sérieux se vendent) valorise.

### L'invariant, redit

Une mécanique d'engagement **ne modifie jamais** un niveau, **ne rétrograde jamais** un credential,
**ne rémunère jamais** la réflexion. Le déclin d'une compétence non pratiquée alimente un signal de
*fraîcheur* — informationnel, réversible, non punitif — jamais un downgrade.

---

## Ce qu'il reste à décider (et que je ne peux pas trancher seul)

1. **Sort des streaks** : les garder en version *forgiving* (rythme opt-in + gel/réparation), ou les
   retirer entièrement ? Je penche pour les garder, non punitifs, ciblés novices — mais c'est une
   décision produit/andragogie.
2. **Sort de l'XP visible** : le supprimer, le rendre purement cosmétique, ou le remplacer par un
   « progrès vers le prochain niveau » *dérivé de la preuve* (le premier pas vers C) ? Décision de
   conception, à prendre avec le défaut 1.
3. **La North Star enterprise, opérationnalisée** : « compétence démontrée » = quoi exactement ?
   Nombre de preuves validées ? Progression Dreyfus nette ? JAC franchis ? Décision métier, dépendante
   de la colonne de preuve.
4. **Séquencement vs défaut 1** : le premier geste (A) est indépendant et peut partir tout de suite ;
   B et C attendent la preuve. À acter dans le plan de vagues.
5. **La divergence chiffrée XP-journal** : le cahier 05 dit **+5**, le code dit **+20**
   (`XP_PER_TRIGGER.journal_entry`). Sans objet si on retire l'XP-sur-réflexion — mais à trancher et
   documenter pour clore l'incohérence.

---

## Ce que cette étude n'a pas fait

- **Aucune vérification juridique de première main.** L'analyse « surveillance des travailleurs » /
  RGPD art. 22 (auto-downgrade, métriques de présence au manager) prépare une conversation avec un
  conseil, elle ne la remplace pas.
- **Le précédent Duolingo (streak-freeze/repair)** est de l'histoire produit publique, largement
  rapportée — pas une étude contrôlée. Il illustre le principe « si tu gardes un streak, rends-le
  clément », il ne le prouve pas.
- **Les effets SDT / sur-justification** sont cités dans leur *direction* établie (récompense
  tangible-contingente → corrosion ; feedback informationnel → renforcement). Je n'avance aucune
  taille d'effet chiffrée.
- **Les constats dashboards enterprise** (présence vs outcome) reprennent des inférences par grep de
  la REVUE, à confirmer page par page.

---

## Journal

**2026-07-23** — Création. Deuxième document de la série « solutions par défaut ». Trois options (jeu
subordonné et cloisonné / attestation seule / deux monnaies re-motivées SDT) évaluées sous six
lentilles. Recommandation tranchée : **le credential evidence-based est la récompense — informationnelle,
donc sûre au sens de Deci & Ryan** ; le jeu devient un échafaudage mince, opt-in, non punitif, qui ne
touche jamais ni le credential ni la réflexion ; la North Star enterprise passe de la présence à la
compétence démontrée. Firewall de A immédiat (soustraction, indépendante du défaut 1 : retirer
l'XP-journal, ne pas construire l'atrophie-badge ni le claim payant), philosophie de B en destination
(suppose la colonne de preuve), deux emprunts bon marché à C (streak *forgiving* à la Duolingo + KPI
d'outcome), build complet de C différé en V2. Invariant gravé : une mécanique d'engagement ne modifie
jamais un niveau, ne rétrograde jamais un credential, ne rémunère jamais la réflexion — le déclin d'une
compétence alimente un signal de fraîcheur, pas un downgrade.


---

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


---

# Défaut 4 — Le score de confiance et le couteau suisse Mistral : options de conception

> **2026-07-24.** Étude de solutions pour le défaut IA le plus insidieux de la Learning App
> (voir [`REVUE-TRANSVERSALE-CDC`](REVUE-TRANSVERSALE-CDC.md), défaut 4 ; cahiers
> [`12_Chatbot`](../CDC/12_Chatbot_IA_et_QAR.md) et [`12bis_IA_Framework`](../CDC/12bis_IA_Features_Framework.md)).
> Trois options, chacune évaluée sous six lentilles : **apprenance · instructional design ·
> biais cognitifs & neurosciences · UX/UI · conformité · faisabilité technique**.
> ⚠️ Propositions à trancher en métier. Rien n'est engagé.
> Quatrième de la série (un document par défaut).

---

## Rappel du problème, reformulé en question de conception

Les cahiers affichent partout un chiffre qui a l'air d'une probabilité : « taux d'adéquation **92 %** »
(12bis, feature #4), `confidence_score` (12, modèle de données), « risque de départ **78 %** »
(12bis, feature #6). Dans le code, `ConfidenceChip` (`ChatInterface.tsx:22`) range le score en trois
bandes de couleur **mais imprime quand même le nombre brut** `92% confiance` — et ce nombre vient
aujourd'hui de valeurs mockées en dur (`chatbot.ts` : `0.92`, `0.88`, `0.85`). En production, la spec
prévoit de le demander à Mistral (« Mistral output incluant score confiance », 12). C'est le cœur du
défaut : **un LLM ne produit pas de confiance calibrée**, et une valeur auto-déclarée est facilement
sur-confiante sur une hallucination.

La vraie question n'est pas « quel seuil mettre » mais double :

> **Comment donner à l'apprenant — et au manager — un signal *honnête* sur la fiabilité d'une réponse
> IA, et comment répartir le travail entre le langage (LLM) et le calcul (déterministe), sans fausse
> précision ni hallucination sur-confiante ?**

Un invariant, commun aux trois options et non négociable : **un LLM n'émet jamais un nombre affiché
comme une mesure, ni un nombre qui pilote une décision.** Il produit du langage. Tout chiffre présenté
comme fiabilité, adéquation, risque ou taux provient d'un **calcul déterministe** ou d'un **vérificateur
externe** — jamais de l'auto-évaluation du modèle. Corollaire d'affichage : **aucun pourcentage nu** ne
sert de signal de confiance. *(Fondement : la confiance verbalisée d'un LLM aligné par RLHF est mal
calibrée — les modèles « savent en partie ce qu'ils savent » sur des formats fermés à choix multiples
(Kadavath et al., 2022), mais l'estimation auto-déclarée en texte libre après alignement dérive vers la
sur-confiance. Un `0.92` n'est donc pas une probabilité, c'est un mot habillé en chiffre.)*

---

## OPTION A — Le signal fiabilisé : **groundedness** rendu qualitatif

**L'idée.** Garder un signal de fiabilité, mais **changer sa source de vérité**. On ne demande plus à
Mistral « quelle est ta confiance ? » (auto-report non calibré). Une **passe de vérification séparée**
mesure la *groundedness / faithfulness* : les affirmations de la réponse sont-elles bien **entailées par
les passages récupérés** ? On mappe cette mesure sur un **registre qualitatif à 3 crans** et on garde la
route d'abstention sous le cran bas. Aucun nombre affiché.

C'est la chirurgie minimale sur l'existant : `ConfidenceChip` a déjà 3 bandes — on remplace l'entrée
(groundedness, pas auto-score) et on **retire le texte `{pct}%`**.

```
Réponse RAG  →  vérificateur (NLI / juge de faithfulness sur le contexte récupéré)
             →  « Bien ancrée » / « À recouper » / « Peu ancrée → je t'oriente vers ton coach »
             (jamais « 92 % »)
```

| Lentille | Évaluation |
|---|---|
| **Apprenance** | 🟢 Un signal ancré et qualitatif enseigne la **confiance appropriée** (Lee & See, 2004) : « c'est bien soutenu par le cours » vs « à vérifier » — bien mieux qu'un faux %. 🟡 Mais un chip global ne dit pas *quelle* affirmation est fragile. |
| **Instructional design** | 🟡 Reste un modèle « réponse mâchée » : le chatbot répond, l'apprenant consomme. La groundedness fiabilise, mais n'ajoute **aucun scaffolding**. Neutre sur l'axe « faire produire vs servir ». |
| **Biais & neuro** | 🟢 Supprimer le % tue la **fausse précision** (l'*overprecision* de Moore & Healy, 2008) et l'ancrage sur un chiffre spurieux. Un cran qualitatif déclenche *encore* un peu de **biais d'automatisation** (Parasuraman & Riley, 1997 : on défère à « Bien ancrée »), mais très en deçà d'un « 92 % ». |
| **UX/UI** | 🟢 Registre qualitatif + le `AITransparencyLabel` déjà présent (« Généré par l'IA », art. 50) forment une divulgation cohérente et honnête. 🟢 Peu de redesign : la structure 3 bandes existe déjà. |
| **Conformité** | 🟢 Signal honnête, plus de probabilité trompeuse. **Ne touche pas** au churn/décision auto (art. 22) — hors périmètre de cette option. Art. 50 déjà couvert par le label. |
| **Faisabilité** | 🟡 Exige un **vérificateur** : une passe NLI/juge par réponse (latence + coût ≈ doublés ; le Mistral self-host peut héberger le juge). La mesure de faithfulness est balisée (approche type RAGAS), mais pas gratuite. 🔴 Sous-point : un juge lui-même LLM a son propre taux d'erreur — on vérifie un LLM par un LLM ; atténuer avec un modèle NLI dédié + un recouvrement de récupération. *(Note honnête : un Mistral self-hosté peut exposer les logprobs → probabilité de séquence, mais c'est un proxy faible de la justesse et non calibré à la groundedness — ça ne sauve pas le %. Je n'ai pas vérifié la stack de service Mistral visée.)* |

**En un mot.** Corrige le signal *langage* honnêtement et à coût modéré, au plus près du code — mais
laisse le couteau suisse (chiffres/décisions) intact et reste un modèle « servir la réponse ».

---

## OPTION B — Le silence honnête : **abstention + sources**, zéro score

**L'idée.** Retirer complètement le signal de fiabilité. Il reste **trois signaux honnêtes** : (1) les
**sources citées** — l'apprenant ouvre « Leçon 3.2 » et juge ; (2) l'**abstention calibrée** — le
meilleur output du système est souvent « je n'ai pas trouvé ça dans le contenu indexé → va voir ton
coach » (*selective answering*, l'option de refus) ; (3) le **label « Généré par l'IA »** (art. 50).
Ni bande, ni nombre, rien qui prétende quantifier la fiabilité. Le pari de conception : **un « je ne
sais pas » honnête plus une vraie source battent n'importe quel UI de confiance.**

Le germe existe déjà : `LOW_CONFIDENCE_RESPONSE` (`chatbot.ts:63`) route vers coach/support sous 0.6.

| Lentille | Évaluation |
|---|---|
| **Apprenance** | 🟢🟢 **Le meilleur.** L'apprenant doit *évaluer la source*, pas déférer à un chip — métacognition active. L'abstention **modélise l'honnêteté intellectuelle**, une norme qu'on *veut* voir un adulte apprenant intérioriser. Refuser plutôt que sur-asserter éduque la confiance appropriée. |
| **Instructional design** | 🟢 « Voici la source, va la lire » + « je ne sais pas » poussent l'apprenant à **faire le travail** — plus proche du scaffolding (Wood, Bruner & Ross, 1976 ; ZPD de Vygotsky) que d'une réponse mâchée. Se marie avec un chatbot qui **questionne au lieu de mâcher** (effet de génération, Slamecka & Graf, 1978). |
| **Biais & neuro** | 🟢🟢 Pas de nombre → pas de fausse précision, pas d'ancrage. L'abstention est **le meilleur antidote au biais d'automatisation** : le système décline au lieu de sur-affirmer. 🟡 Résiduel : l'absence de tout signal peut se lire « toujours fiable quand il répond » — il faut que l'abstention soit assez **fréquente et visible** pour poser la norme. |
| **UX/UI** | 🟡 Exige plus de l'UX *et* de l'apprenant : lire une source coûte plus qu'un coup d'œil à un chip. Risque de **sur-confiance** en l'absence de tout repère. Atténuer : sources proéminentes, abstention traitée comme un **état de première classe** (pas comme une erreur). |
| **Conformité** | 🟢 Honnête par construction (aucune métrique trompeuse). Label art. 50 conservé. L'abstention réduit le risque d'hallucination. **Ne règle pas** l'art. 22 churn (chantier séparé). |
| **Faisabilité** | 🟢🟢 *Retirer* une feature est le build le moins cher. Mais : une bonne abstention a besoin d'un **vrai déclencheur** — il faut toujours un score de groundedness/récupération pour décider *quand* s'abstenir (elle **réutilise donc en interne le vérificateur de A**, sans l'afficher). 🟡 Le coût honnête est la **calibration du seuil** d'abstention. |

**En un mot.** Pédagogiquement le plus pur et le moins cher à livrer, le meilleur pour la confiance
appropriée — mais reporte la vérification sur l'apprenant et exige un vrai déclencheur d'abstention
sous le capot (donc moins « gratuit » qu'il n'y paraît). Bonne **posture**, système incomplet à lui seul.

---

## OPTION C — L'architecture hybride : **le calcul décide, le LLM reformule**

**L'idée.** Attaquer *l'autre moitié* du défaut — le couteau suisse. **Partitionner par nature de
tâche.** Tout ce qui est tabulaire / déterministe / décisionnel **sort de Mistral** : agrégation
d'org → **SQL** (`AVG`, `GROUP BY`) ; forecast → **projection statistique** (vélocité/linéaire, puis un
vrai modèle) ; churn → **ML tabulaire** (gradient boosting / régression logistique) avec **humain
décideur** (art. 22) ; adéquation mission → **score de recouvrement de compétences explicite** ou rang
qualitatif. Le LLM est **rétrogradé en couche de reformulation** : il met les nombres calculés en
phrases et, pour le RAG, génère la prose ancrée (vérifiée façon A). Désormais les **nombres portent une
vraie incertitude** (intervalle, métrique de modèle, « données insuffisantes ») ; le **langage porte la
groundedness**. Le LLM n'émet jamais de mesure.

Cible directement `SELECT skill_distribution WHERE team_id=X` puis « Calls Mistral forecast model »
(12, journey #2, étapes 3-5) et le batch churn de 12bis.

| Lentille | Évaluation |
|---|---|
| **Apprenance** | 🟡 Pour le **chatbot apprenant**, C rend les réponses chiffrées fiables (vrai calcul) — bon. Mais les charges phares de C (churn, org gap) sont **manager-facing** : **l'apprenance n'est pas le cadre** ici, et il serait malhonnête de la forcer. Le cadre juste = qualité de décision + RGPD. |
| **Instructional design** | 🟡 Largement **orthogonal** à l'ID (décision d'architecture/plomberie), sauf qu'elle retire une classe de réponses chiffrées *confidemment fausses* susceptibles d'égarer un apprenant. Neutre-positif. |
| **Biais & neuro** | 🟢🟢 Élimine la fausse précision **à la source** : une moyenne calculée `2,3/5` *est* légitimement précise ; un churn de 0,78 issu d'un vrai modèle *a* un sens. Tue le pire piège d'automatisation : un manager agissant sur un chiffre d'org **halluciné** par un LLM. 🟡 Résiduel : un nombre calculé reste sur-trustable → l'accompagner d'un intervalle et d'un « sur quelles données ». |
| **UX/UI** | 🟢 Permet un UI chiffré **honnête** (intervalle, « n=3, faible », « données insuffisantes ») qu'un % auto-déclaré ne justifiera jamais. Cohérent avec A/B côté langage. |
| **Conformité** | 🟢🟢 **Le plus défendable.** L'agrégation déterministe est **auditable et reproductible** ; un modèle de churn documenté + humain décideur, c'est *exactement* la posture art. 22 (rejoint le défaut 3) ; aucun LLM ne déclenche seul une action RH. Meilleur argument conformité pour le marché ETI. |
| **Faisabilité** | 🔴 Le plus lourd : couche de requêtes, pipeline stats/ML (une **capacité data science absente** dans une équipe de deux), monitoring de modèle. 🟢 Atténuant fort : c'est souvent **moins cher** que le chemin LLM qu'il remplace (un `AVG` SQL ≈ gratuit vs ~400 $/mois de rapport d'org LLM estimé en 12bis), et une **heuristique explicable** peut tenir lieu de ML churn (meilleur pour l'art. 22 qu'une boîte noire). Reste de la vraie ingénierie, pas un prompt. |

**En un mot.** La seule option qui **guérit vraiment** le couteau suisse et le meilleur actif de
conformité — mais la plus lourde, et elle réclame une capacité data que l'équipe n'a pas encore.
La cadrer sur les rares chiffres qui comptent (agrégation d'org, churn) et démarrer en **heuristique
explicable**, pas en ML.

---

## Matrice de synthèse

| Critère | A — Groundedness qualitatif | B — Abstention + sources | C — Hybride calcul/LLM |
|---|---|---|---|
| Honnêteté du signal (0 fausse précision) | 🟢 | 🟢🟢 | 🟢🟢 (côté chiffres) |
| Confiance appropriée / métacognition | 🟢 | 🟢🟢 | 🟡 (manager, pas apprenant) |
| Scaffolding (fait produire vs mâche) | 🟡 | 🟢 | 🟡 |
| Résistance au biais d'automatisation | 🟢 | 🟢🟢 | 🟢🟢 |
| Conformité (art. 50 langage / art. 22 décision) | 🟢 (50) | 🟢 (50) | 🟢🟢 (50 **et** 22) |
| Sort les tâches tabulaires du LLM | 🔴 (ne le fait pas) | 🔴 (ne le fait pas) | 🟢🟢 |
| Charge / friction (build + UX) | 🟡 | 🟢🟢 (côté build) | 🔴 |
| Proximité du code existant | 🟢🟢 (`ConfidenceChip`) | 🟢 (`LOW_CONFIDENCE_RESPONSE`) | 🔴 |
| Coût Mistral / reproductibilité | 🟡 | 🟢 | 🟢🟢 |

**Ce que la matrice montre** : les trois ne sont pas concurrentes — elles opèrent à des **couches
différentes**. A répare le signal *langage*, B est le **plancher d'honnêteté** (ne rien afficher de
faux), C répare les *chiffres et les décisions*. Les opposer serait une erreur : le vrai système en a
besoin des trois, à des endroits différents.

---

## Recommandation — un principe d'honnêteté, trois régimes de signal

Je ne recommande pas *une* option, mais **leur composition par type de signal** : la posture de B, le
moteur de A, la ligne de partage de C. Tranché.

### Le plancher — la posture de B : aucun `%` ne s'affiche

Supprimer le pourcentage partout dans l'UI. `ConfidenceChip` perd son texte `{pct}%`. Le signal
par défaut d'une réponse incertaine devient l'**abstention** (« je n'ai pas trouvé ça dans le contenu
indexé — ton coach saura »), traitée comme un état de première classe, jamais comme une erreur.

### Le moteur — le vérificateur de A : groundedness, pas auto-report

Ce qui *décide* d'afficher « Bien ancrée / À recouper / Peu ancrée » et *quand* s'abstenir, c'est une
**passe de vérification de faithfulness** (le juge NLI, pas Mistral se notant lui-même). C'est le seul
signal de fiabilité *langage* légitime, et il pilote silencieusement l'abstention de B.

### La ligne de partage — le split de C : ce qui doit **sortir du LLM**

C'est le livrable central. Chaque chiffre/décision quitte Mistral ; le LLM ne garde que la mise en mots.

| Fonction (cahier) | Aujourd'hui | Sort vers (déterministe / vérifié) | Ce que le LLM garde |
|---|---|---|---|
| Réponse chatbot RAG *(12)* | LLM + `confidence_score` auto | **vérificateur de groundedness** → registre qualitatif + abstention | génère la prose **ancrée** |
| « Taux d'adéquation 92 % » mission *(12bis #4)* | LLM auto-score | **score de recouvrement compétences** explicite, ou rang qualitatif sans nombre | reformule le *pourquoi* |
| « Risque de départ 78 % » churn *(12bis #6/#8)* | LLM batch scoring + **mail auto** | **ML tabulaire / heuristique explicable** + **humain décideur** (art. 22, défaut 3) | rédige l'explication, **ne déclenche RIEN** |
| Org intelligence / gap *(12bis #9)* | LLM sur « toutes les données de l'org » | **SQL déterministe** (`AVG`, `GROUP BY`, seuil n≥3) | **narre** le tableau calculé |
| Forecast équipe *(12, journey #2)* | LLM « forecast model » | **projection statistique** (vélocité) + « données insuffisantes » | met en phrase, **borne** l'incertitude |
| Niveaux Dreyfus du questionnaire *(12bis #1)* | LLM « génère » les niveaux | `selfAssessedLevel` = **perception**, jamais mesure (cf. défaut 1) | conduit la **conversation** |

### Pourquoi c'est le bon arbitrage

- **Apprenance / biais** : plus aucun `%` sur-confiant à ancrer ; l'apprenant apprend la confiance
  appropriée via sources + abstention (B) plutôt que via un chiffre inventé.
- **Instructional design** : couplé à un chatbot en **mode scaffolding par défaut** (il questionne,
  ne mâche pas — effet de génération), l'abstention devient un levier pédagogique, pas un échec.
- **Conformité** : art. 50 tenu par le label déjà présent ; art. 22 tenu par le split C (le churn ne
  déclenche plus de mail seul — l'humain reçoit, explique-par-le-LLM, et tranche).
- **Faisabilité / coût** : on part du code existant (`ConfidenceChip`, `LOW_CONFIDENCE_RESPONSE`), le
  SQL d'agrégation est *moins cher* que le rapport LLM qu'il remplace, et une **heuristique churn
  explicable** évite d'imposer une capacité ML à une équipe de deux tout en servant mieux l'art. 22.

### L'invariant, redit

Un LLM produit **du langage**, jamais un nombre-mesure ni un nombre-décision. La fiabilité du *langage*
= groundedness (qualitative) ; la fiabilité des *chiffres* = intervalle calculé ; les *décisions* RH
= déterministe + humain. **Aucun pourcentage nu comme signal de confiance.**

---

## Ce qu'il reste à décider (et que je ne peux pas trancher seul)

1. **Les libellés du registre qualitatif** (3 crans) : « Bien ancrée / À recouper / Hors de mon
   périmètre » — ou autre. Décision UX + pédagogique (le vocabulaire doit inviter à vérifier, pas
   rassurer à tort).
2. **Le seuil d'abstention** : aujourd'hui `<0.6` sur un nombre fictif. Une fois le score = groundedness
   réelle, sur quoi le régler ? Arbitrage **faux négatifs** (s'abstient trop, frustre) vs **faux
   positifs** (répond à tort). Décision produit + évaluation empirique.
3. **Le churn : ML ou heuristique ?** Un gradient boosting « boîte noire » est plus fin mais moins
   défendable (art. 22) et hors capacité d'une équipe de deux ; une **règle explicable** est plus faible
   mais auditable et honnête. Mon penchant : heuristique explicable d'abord — mais c'est un arbitrage
   produit/juridique.
4. **Le taux d'adéquation mission** : garder un **rang qualitatif sans nombre**, ou un **score calculé
   explicite** (recouvrement de compétences) ? Les deux battent l'auto-score LLM ; le choix est produit.
5. **Vérification juridique** : art. 50 (transparence chatbot / contenu généré) vs art. 4 (littératie
   IA) — le commentaire du code (`ChatInterface.tsx:20`) dit « Article 4 », qui vise la littératie, non
   la divulgation ; le label relève plutôt de l'art. 50. À **confirmer avec un conseil** (ce doc raisonne
   sur les numéros d'article de mémoire, sans vérification de première main).
6. **La dette de schéma** : le modèle de données (12) déclare `VECTOR(1536)` (dimension OpenAI) ; la
   revue signale que `mistral-embed` sort en 1024. À corriger — **je n'ai pas re-vérifié moi-même** la
   dimension courante du modèle d'embedding Mistral visé.

---

## Journal

**2026-07-24** — Création. Quatrième document de la série « solutions par défaut ». Trois options
(groundedness qualitatif / abstention + sources / architecture hybride) évaluées sous six lentilles.
Recommandation tranchée : **un principe d'honnêteté à trois régimes de signal** — plancher de B (aucun
`%` affiché), moteur de A (vérificateur de groundedness, pas d'auto-report Mistral), split de C (tout
chiffre/décision — churn, agrégation d'org, forecast, adéquation — sort du LLM ; le LLM ne fait que
reformuler ; l'humain décide sur le churn, art. 22). Invariant : un LLM n'émet jamais un nombre-mesure
ni un nombre-décision. Faits vérifiés dans le code : `ConfidenceChip` imprime le `%` brut sur 3 bandes ;
les scores sont mockés en dur ; l'abstention existe en germe (`LOW_CONFIDENCE_RESPONSE` < 0.6) ; le
label art. 50 « Généré par l'IA » est déjà présent. Non re-vérifié : stack de service Mistral (logprobs),
dimension `mistral-embed` (1024 vs 1536 au schéma), numéros d'article AI Act (à confirmer juridiquement).
Ancrages nommés : biais d'automatisation (Parasuraman & Riley, 1997), confiance appropriée (Lee & See,
2004), fausse précision / *overprecision* (Moore & Healy, 2008), calibration LLM (Kadavath et al., 2022),
groundedness/faithfulness (approche RAGAS), abstention comme design, effet de génération (Slamecka &
Graf, 1978), scaffolding/ZPD (Wood, Bruner & Ross, 1976 ; Vygotsky), transparence art. 50 / décision
automatisée art. 22. Aucun recours aux mythes pop-neuro (VARK, « 8 secondes d'attention », cerveau
triunique, « cognitive debt ») — les fondements mobilisés sont les vrais.


---

# Défaut 5 — Chiffres incohérents et sur-ingénierie : options de conception

> **2026-07-24.** Étude de solutions pour le cinquième défaut transversal de la Learning App
> (voir [`REVUE-TRANSVERSALE-CDC`](REVUE-TRANSVERSALE-CDC.md), défaut 5).
> Trois postures stratégiques, chacune évaluée sous six lentilles : **faisabilité pour une équipe
> de deux · dette de maintenance · vitesse de mise sur le marché · charge cognitive (équipe &
> produit) · risque (technique, économique, régulatoire) · fidélité à la North Star SBO**.
> ⚠️ Propositions à trancher en métier. Rien n'est engagé.
> Échantillon lu en propre pour ce document : cahiers **09, 03, 06** ; le reste des faits vient de
> la revue transversale, non re-vérifié ici cahier par cahier.
> Un document par défaut de la série « solutions ».

---

## Rappel du problème, reformulé en question de conception

Le défaut *ressemble* à une liste de bugs de spec — mauvaise API Stripe, mauvaise file d'attente,
quatre estimations d'effort par cahier. Ce n'en est pas une. Trois symptômes, un seul mal.

- **L'incohérence chiffrée.** Le cahier 09, lu en propre, porte **quatre totaux d'effort dans le
  même fichier** — 170-200h en en-tête (l. 5), 355-370h (l. 1988), 405h (l. 2035), 361h (l. 2036).
  Aucun n'est budgétable. Le cahier 06 annonce 90-120h en tête mais son propre découpage par
  composant somme ~136-175h : les parties dépassent le tout.
- **L'économie qui ne boucle pas.** Cahier 03 : le Plan 3 « offre 1 crédit/mois » (l. 91), mais les
  crédits s'achètent par paquets de 50/200/500 (l. 160) et une session se paie des dizaines de
  crédits. Un abonnement rembourse une session en **dizaines de mois**. Et deux rails de paiement
  coexistent — Stripe en direct *et* webhook WooCommerce (l. 110).
- **La sur-ingénierie.** Six canaux de notification et une infra de file (RabbitMQ *ou* Redis *ou*
  cron worker — les trois sont écrits, l. 114 / 209 / 213) pour deux personnes. RBAC custom donné
  à la fois « V4+ » (l. 31, 97) et « P0/MVP » (l. 150, 236) dans le cahier 06. Ailleurs (via la
  revue) : Open Badge auto-signé cryptographiquement, wiki public en 4 langues.

La vraie question n'est donc pas « quel champ corriger », mais une question de **gouvernance de
périmètre sous contrainte** :

> **Comment une équipe de deux traite-t-elle un corpus de 16 cahiers sur-spécifiés et incohérents
> pour livrer un produit *maintenable* qui sert l'apprenance — sans passer six mois à réécrire des
> specs ?**

Un mot d'honnêteté sur les lentilles. Ici l'*apprenance* et les *biais cognitifs* ne sont pas au
centre comme ils l'étaient pour le défaut 1 — le sujet est d'ingénierie et de stratégie. Mais deux
ponts tiennent, et je ne les force pas : **(1)** la charge cognitive de Sweller s'applique aux
**mainteneurs** — chaque sous-système inutile et chaque spec incohérente est de la *charge
extranéenne* volée au travail qui compte ; une équipe de deux qui ne tient pas son propre modèle
mental *ship* une UX qu'elle ne tient pas non plus. **(2)** La dette (Cunningham) finit toujours en
bugs, les bugs en friction, et la friction dégrade l'apprentissage. Un produit non maintenable
*est*, à terme, un produit qui apprend mal.

**Un invariant, commun aux trois postures et non négociable :** *on ne met en base de code que ce
qu'un utilisateur réel réclame ; tout le reste vit en **backlog**, jamais en dette.* C'est YAGNI
érigé en règle. Le vrai coût n'est pas le build (les 405h du cahier 09) — c'est la **maintenance à
vie** de 16 tables, d'un cluster de file et de six workers de canal, par 1,5 développeur.

---

## OPTION A — Réconcilier vers le bas, cahier par cahier *(le code fait foi)*

**L'idée.** On ne réécrit rien à froid. On prend chaque cahier, une passe à la fois, et **partout où
le frontend existant a déjà tranché plus juste que la spec, on ratifie le code** et on rabote le
cahier à ce qui tourne, plus un mince delta. C'est le constat central de la revue transversale
(« le code a souvent tranché plus juste que la spec → réconcilier vers le bas ») transformé en
méthode. La procédure en 5 étapes de `CLAUDE.md` existe déjà pour ça.

```
Cahier 09 (notifications)
├── spec dit : RabbitMQ | Redis | cron   ← 3 options
├── code fait : (ce qui est câblé)        ← on lit, on ratifie
└── → cahier réécrit sur le code + delta « digest par défaut »
```

| Lentille | Évaluation |
|---|---|
| **Faisabilité (équipe de 2)** | 🟢🟢 La plus faisable tout de suite. On part des ~140 pages routées, on ne jette rien, chaque passe est bornée. Pas de big bang, pas de tunnel. |
| **Dette de maintenance** | 🟢 Baisse la dette *réelle* : on cesse de maintenir mentalement l'écart spec↔code. 🟡 Mais 16 documents restent vivants — la cohérence transverse (crédits, paiement) n'est garantie par aucune structure, seulement par la vigilance à chaque passe. |
| **Vitesse de mise sur le marché** | 🟢 Valeur livrée en continu, cahier après cahier. 🟡 Mais 16 passes séquentielles, c'est long au total, sans moment de bascule net. |
| **Charge cognitive (équipe & produit)** | 🟡 Chaque passe est légère (un cahier à la fois = charge bornée, bon Sweller). 🔴 Mais la source de vérité reste éclatée : répondre « combien coûte un crédit ? » exige encore de croiser plusieurs cahiers. La charge transverse ne baisse pas. |
| **Risque (tech/éco/régl.)** | 🟢 Faible risque technique — on code peu, on ratifie l'existant. 🟡 Risque de rémanence : une incohérence transverse (l'unité de crédit) n'appartient à *aucun* cahier seul et peut survivre à toutes les passes. |
| **Fidélité North Star SBO** | 🟡 Ne repriorise pas vers la preuve *par construction* : le code actuel n'est pas plus aligné North Star que les specs. Réconcilier vers lui fige un existant **tiède**. |

**En un mot.** Le plus sûr, le plus continu, adossé à ce qui tourne — mais il traite la *forme*
(spec↔code) sans garantir le *fond* (cohérence transverse, recentrage North Star). Excellent
**véhicule**, direction à donner par ailleurs.

---

## OPTION B — Le cahier canonique consolidé *(un document qui remplace les 16)*

**L'idée.** On investit d'abord : consolider les 16 cahiers (~25 000 lignes) en **un seul document
réconcilié** — une économie de crédits, un rail de paiement, une file, un référentiel — qui
supersède tout le reste. On tranche chaque incohérence une fois, à la source, puis on construit
contre ce canon. C'est le geste de l'architecte : payer la cohérence d'avance.

| Lentille | Évaluation |
|---|---|
| **Faisabilité (équipe de 2)** | 🔴 Le plus lourd en amont. Consolider 25 000 lignes en un doc cohérent = plusieurs semaines de rédaction **avant** de livrer quoi que ce soit. Pour une équipe où le temps est *la* ressource rare (contrainte S4), c'est exactement le « six mois à réécrire des specs » qu'on veut fuir. |
| **Dette de maintenance** | 🟢🟢 La plus basse *à terme*. Une seule source de vérité : plus d'écart entre documents, une unité de crédit, un rail. Structurellement le plus propre. |
| **Vitesse de mise sur le marché** | 🔴 La pire. Rien ne sort tant que le canon n'est pas écrit. Coût d'opportunité maximal face à l'échéance « MVP juillet 2026 » (déjà atteinte). |
| **Charge cognitive (équipe & produit)** | 🟢🟢 *à terme* : un seul document à tenir en tête, charge extranéenne minimale. 🔴 *en transition* : la consolidation elle-même est un pic brutal — tout tenir en tête *en même temps* pour réconcilier 16 périmètres. |
| **Risque (tech/éco/régl.)** | 🟡 Risque technique faible (c'est du doc). 🔴 Risque planning/économique élevé : gros pari amont, valeur différée, et un canon écrit **loin du code** re-diverge du code (le *drift* déjà documenté côté Figma dans ce dépôt). |
| **Fidélité North Star SBO** | 🟢🟢 La meilleure occasion de *re-fonder* autour de la preuve : réécrire à froid permet de mettre la North Star au centre et de couper le hors-scope à la racine. **Si** on l'écrit. |

**En un mot.** Le plus cohérent et le plus fidèle à la vision *sur le papier*, le plus dangereux
pour une équipe de deux : il paie tout d'avance et ne livre rien pendant ce temps. Le bon livrable,
au pire moment.

---

## OPTION C — Le walking skeleton + backlog explicite *(un MVP radical de bout en bout)*

**L'idée.** On ne définit qu'**une tranche fine, de bout en bout**, qui exerce toute l'architecture
et *prouve la North Star* : la boucle de preuve — positionnement → item → preuve → passeport →
match. On la *ship*, elle grossit par accrétion selon la demande réelle. Tout le reste des 16
cahiers — les six canaux, le RBAC custom, les webhooks HMAC, le badge crypto, le wiki multilingue —
devient un **backlog explicite et non priorisé**, dans lequel on ne pioche que quand un utilisateur
ou un client le réclame. C'est le *walking skeleton* de Cockburn couplé au MVP de Ries, et YAGNI
promu en doctrine.

```
Squelette (en maintenance)      Backlog (au chaud, hors base de code)
positionnement → item →         6 canaux · RabbitMQ · RBAC custom ·
preuve → passeport → match      webhooks · Open Badge crypto · wiki 4 langues
        ↑ la North Star                  ↑ tiré par la demande, jamais poussé
```

| Lentille | Évaluation |
|---|---|
| **Faisabilité (équipe de 2)** | 🟢 Faisable : on ne construit qu'une colonne vertébrale. Le reste est backlog, pas dette. Cadre le temps rare sur l'essentiel. 🟡 Exige de savoir *dire non* — un travail politique, pas technique. |
| **Dette de maintenance** | 🟢🟢 La plus basse **dès maintenant** : on ne met en maintenance *que* le squelette. Pas de cluster de file, pas de six workers, pas de crypto maison à faire vivre. |
| **Vitesse de mise sur le marché** | 🟢🟢 La meilleure : une boucle démontrable vite, testable de bout en bout, qui s'étend par accrétion. C'est la définition même du walking skeleton. |
| **Charge cognitive (équipe & produit)** | 🟢🟢 La plus basse : l'équipe tient *une* boucle, pas 16 sous-systèmes. Le produit hérite de cette clarté — une app dont les *makers* tiennent le modèle mental *ship* une UX cohérente. 🟡 Coût : tenir le backlog fermé sous le « mais le cahier dit… ». |
| **Risque (tech/éco/régl.)** | 🟢 Risque technique/éco minimal (petite surface = peu de choses qui cassent). 🟡 Risque **commercial** : couper une feature qu'un prospect ETI attend (SSO, export HRIS) peut coûter un deal — d'où un backlog *tiré par la demande*, pas supprimé. |
| **Fidélité North Star SBO** | 🟢🟢 La plus fidèle *par construction* : le squelette **est** la North Star (la preuve, Learn→Do→Match). Tout ce qui ne la sert pas est, par définition, hors squelette. |

**En un mot.** Le plus rapide, le plus maintenable, le plus aligné — au prix de la **discipline du
non**. Le risque n'est pas technique, il est politique : tenir le backlog fermé quand un cahier
crie le contraire.

---

## Matrice de synthèse

| Critère | A — Réconcilier ↓ | B — Cahier canonique | C — Walking skeleton |
|---|---|---|---|
| Faisabilité immédiate (équipe de 2) | 🟢🟢 | 🔴 | 🟢 |
| Dette de maintenance à terme | 🟢 | 🟢🟢 | 🟢🟢 |
| Vitesse de mise sur le marché | 🟢 | 🔴 | 🟢🟢 |
| Charge cognitive des mainteneurs | 🟡 | 🟢🟢 *(terme)* | 🟢🟢 |
| Cohérence transverse garantie | 🔴 | 🟢🟢 | 🟢 |
| Recentrage North Star par construction | 🟡 | 🟢🟢 | 🟢🟢 |
| Risque « 6 mois à re-spécifier » | 🟢 faible | 🔴 fort | 🟢🟢 nul |
| Continuité (ne jette pas l'existant) | 🟢🟢 | 🟡 | 🟡 |

**Ce que la matrice montre** : aucune posture ne gagne partout, et surtout **elles n'opèrent pas au
même niveau**. A est un *mécanisme* (comment réconcilier), C est une *doctrine de périmètre* (quoi
garder), B est un *livrable* (le document). A et C ne sont donc pas rivales : **C dit quoi couper,
A dit comment le graver dans l'existant.** La seule vraiment exclusive est B — et c'est elle qui
porte le piège temporel que la question de départ nous demande d'éviter.

---

## Recommandation — la doctrine de C, le véhicule de A, jamais le tunnel de B

Je tranche. Pour une équipe de deux face à un MVP déjà daté, la seule posture soutenable est
**radicalement C dans la doctrine, exécutée par le mécanisme de A, en refusant explicitement B**.
On ne réécrit pas 16 cahiers à froid (le tunnel). On coupe au squelette (la doctrine), et on grave
la coupe dans le frontend existant, cahier par cahier (le véhicule).

### La porte d'entrée en développement — le *gate* en cinq critères

Le principe de décision réutilisable, à appliquer à *chaque* cahier avant qu'il ne consomme une
heure de dev. Un cahier ne passe le portail que si :

1. **Une seule techno tranchée** par sujet — une file, un rail de paiement, un provider. Les
   alternatives sont **supprimées du document**, pas barrées, pas « à décider ». (Cahier 09 : une
   ligne + un cron, pas RabbitMQ *ou* Redis *ou* cron.)
2. **Un seul chiffre d'effort**, assumé, avec une date. Pas une fourchette parmi quatre. Si on ne
   sait pas chiffrer, on ne sait pas cadrer → le cahier n'entre pas.
3. **Une seule unité** pour toute grandeur transverse — *le crédit* — cohérente avec les plans.
   Tant que « 1 crédit/mois » et « session à 50 crédits » cohabitent, l'économie est fausse : ça
   se règle en Vague 0, avant tout code.
4. **Zéro fonction hors North Star** sans un **utilisateur réel** qui la réclame. Sinon : backlog,
   pas scope. (SSO, webhooks HRIS, custom RBAC → attendent un client nommé.)
5. **Le code fait foi** en cas de conflit spec↔code, sauf raison métier explicite et écrite.

Les critères 1-2 tuent l'incohérence chiffrée ; 3 tue l'économie cassée ; 4 tue la
sur-ingénierie ; 5 encode le « réconcilier vers le bas ».

### La liste de coupe — sur les cahiers lus en propre

> Honnêteté : les trois lignes ci-dessous sont **vérifiées de première main** (09, 03, 06). Les
> lignes *via la revue* (05, 12, 13, 11bis) sont crédibles mais non re-vérifiées ici — à confirmer
> avant d'agir.

| Cahier | Sur-ingénierie constatée | Coupe proposée (→ backlog) |
|---|---|---|
| **09 Notifications** ✅ lu | 6 canaux · RabbitMQ+Redis+cron · 16 tables · 4 chiffres d'effort | **Email + In-App** seulement · **une table + WordPress cron** · *digest par défaut* · un seul chiffre. WhatsApp/Push/Slack → backlog. |
| **03 Onboarding** ✅ lu | Double rail Stripe **+** WooCommerce · crédits qui ne bouclent pas | **Un seul rail** (celui déjà le plus câblé dans le code — à vérifier) · **une unité de crédit** réconciliée avec les plans (Vague 0). |
| **06 Enterprise** ✅ lu | RBAC custom (V4+ *et* P0) · webhooks CRUD+HMAC P0 · effort en-tête < somme des parts | **Rôles *built-in* seulement** (le cahier lui-même dit « V4+ ») · **pas de webhook CRUD** au MVP · re-chiffrer. Custom RBAC + webhooks HRIS → backlog *tiré par la demande*. |
| **05 Gamification** *via revue* | Open Badge auto-signé crypto, 60-80h de crypto maison | Reconnaissance interne d'abord ; **badge crypto → backlog** jusqu'à ce qu'un client l'exige. |
| **13 Helpcenter** *via revue* | Wiki public multilingue 4 langues | **FR-only**, pas de wiki public exposant de la doc sensible. |

### L'ordre — trois vagues (aligné sur la revue transversale)

- **Vague 0 — décider, pas coder.** Trancher les trois architectures ouvertes (rail de paiement =
  PaymentIntents SCA, *pas* Charges ; file = une table + cron ; modèle atelier) et **réconcilier
  l'unité de crédit**. Ce sont des décisions gratuites qui débloquent tout le reste. Coût : quelques
  réunions, zéro ligne.
- **Vague 1 — le squelette.** Construire/consolider la boucle de preuve de bout en bout (c'est le
  chantier `PasseportEnrichment` du défaut 1). C'est le walking skeleton ; il *est* la North Star.
- **Vague 2+ — réconcilier vers le bas, par la demande.** Passer les cahiers périphériques au *gate*
  ci-dessus, dans l'ordre où un utilisateur ou un deal les appelle — pas dans l'ordre du sommaire.

### Pourquoi c'est le bon arbitrage, lentille par lentille

- **Faisabilité / soutenabilité** : on ne construit qu'un squelette et on ratifie l'existant pour le
  reste — la seule charge qu'une équipe de deux tient dans la durée.
- **Dette de maintenance** : on ne met en maintenance *que* ce qui sert la North Star ; le hors-scope
  ne devient jamais de la dette parce qu'il n'est jamais construit (Cunningham : on refuse le prêt
  au lieu de le rembourser).
- **Vitesse** : une boucle démontrable en Vague 1, sans tunnel de re-spécification.
- **Charge cognitive** : une boucle en tête, pas 16 sous-systèmes — pour l'équipe *et*, en reflet,
  pour l'apprenant.
- **Risque** : petite surface = peu de casse ; le risque résiduel est commercial, géré par un backlog
  *tiré par la demande* plutôt que supprimé.
- **North Star** : le squelette est la preuve. Rien de ce qui ne la sert pas n'entre.

### L'invariant, redit

*On ne met en base de code que ce qu'un utilisateur réel réclame.* Le backlog n'est pas une
poubelle — c'est un **actif au chaud** : la spec de la feature existe, prête à être tirée le jour où
un client la justifie. Ce qui coûte, ce n'est pas d'avoir imaginé six canaux ; c'est de les
*maintenir* avant que quiconque en veuille deux.

---

## Ce qu'il reste à décider (et que je ne peux pas trancher seul)

1. **Qui tient le backlog fermé, et sur quel signal ?** « Demande d'un client nommé » ou « ≥ N
   prospects » ? C'est une décision de gouvernance produit (Chloé), la clé de voûte de la posture C.
2. **L'unité de crédit unique et son barème.** Décision business, adhérente au pricing gelé
   (contrainte S2) — elle attend probablement l'analyse business model. Sans elle, le *gate* critère 3
   reste bloqué.
3. **Le rail de paiement unique.** Stripe PaymentIntents *vs* WooCommerce : lequel est déjà le plus
   câblé dans le frontend ? **Je ne l'ai pas vérifié dans le code** — à faire avant de trancher.
4. **Les features « deal-breaker ETI » à garder dans le squelette malgré la coupe** (SSO ? export ?
   webhooks HRIS ?). Décision commerciale (Pierre-Armand) : ce sont les seules exceptions légitimes
   au critère 4 du *gate*.
5. **L'échéance « MVP juillet 2026 » tient-elle toujours ?** Elle règle l'agressivité de la coupe :
   plus l'échéance est ferme, plus la posture C doit être radicale.

---

## Journal

**2026-07-24** — Création. Cinquième document de la série « solutions par défaut ». Trois postures
(réconcilier vers le bas / cahier canonique / walking skeleton) évaluées sous six lentilles adaptées
au défaut — faisabilité équipe de 2, dette de maintenance, vitesse, charge cognitive, risque,
fidélité North Star. Échantillon lu en propre : cahiers 09 (4 totaux d'effort, 3 files, 6 canaux),
03 (double rail Stripe/WooCommerce, crédits non bouclés), 06 (RBAC custom V4+ *et* P0, webhooks P0,
effort en-tête < somme des parts). Recommandation tranchée : **la doctrine de C (squelette + backlog
tiré par la demande), le véhicule de A (réconcilier vers le bas, le code fait foi), en refusant
explicitement B (le tunnel de re-spécification)**. Principe de décision réutilisable posé : un cahier
n'entre en dev qu'avec 1 techno tranchée, 1 chiffre d'effort, 1 unité de crédit, 0 fonction hors
North Star, le code faisant foi. Ancrages : dette technique (Cunningham), YAGNI, coût de maintenance
> coût de build, North Star metric, walking skeleton (Cockburn) / MVP (Ries), charge cognitive des
mainteneurs (Sweller).
