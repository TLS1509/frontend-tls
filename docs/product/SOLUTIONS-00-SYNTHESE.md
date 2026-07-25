# Solutions aux cinq défauts — synthèse d'ensemble

> **2026-07-23.** Synthèse des cinq études de solutions (un document par défaut, voir liens en
> pied). Objet : montrer comment les recommandations **s'articulent** — elles ne sont pas cinq
> chantiers parallèles, mais **un chantier central, deux règles transverses et une doctrine
> d'exécution**, tenus par un même principe.
> ⚠️ Propositions à trancher en métier. Rien n'est engagé.
>
> 📎 **Synthèse exécutive pour décision (Chloé ↔ Pierre-Armand)** : [`RAPPORT-COHERENCE-LEARNING-APP`](RAPPORT-COHERENCE-LEARNING-APP.md). Ce document-ci = l'**index/synthèse des 5 études** (réunies dans [`SOLUTIONS-DETAIL`](SOLUTIONS-DETAIL.md)) ; le RAPPORT = la version exécutive. Complémentaires, pas de doublon.

---

## Le résultat en une phrase

**Les cinq défauts se ramènent à un seul chantier de fond — donner au passeport sa colonne de
preuve — plus deux règles de conception et une doctrine de périmètre qui gouvernent tout le
reste.** Trois des cinq défauts sont, au fond, le même problème vu sous trois angles.

---

## La découverte : trois défauts, un chantier

Quand on met les cinq recommandations côte à côte, elles ne restent pas séparées. Elles pointent
**le même objet de données**.

| Défaut | Sa recommandation | Ce qu'elle exige |
|---|---|---|
| **1 — Preuve** | Registre à 3 régimes gradués (léger / dialogué / certifiant) | une primitive `EvidenceRef` reliée à la compétence |
| **3 — Validation humaine** | Rubrique obligatoire ; « la validation coach *est* un `EvidenceRef` » | **la même primitive** |
| **2 — Gamification** | « L'attestation est la récompense » ; le passeport-dossier porte la charge motivationnelle | **la même primitive**, comme destination |

**Les défauts 1, 2 et 3 ne sont pas trois chantiers, mais un.** La colonne vertébrale de la preuve
— généraliser `PasseportEnrichment` (déjà présent dans `projects.ts`) au rang de primitive du
passeport — résout la crédibilité produit (1), la conformité RGPD (3), *et* fournit à la
gamification la récompense saine qui la sort de la corruption (2). Un seul objet de données, trois
défauts dissous.

C'est la nouvelle la plus importante de toute la série : **le point le plus grave est aussi le
plus rentable.** Un chantier débloque trois défauts et le positionnement SBO d'un coup.

---

## L'arbre de dépendances

```
                    ┌─────────────────────────────────────┐
   DÉFAUT 5         │  DOCTRINE : walking skeleton +       │   gouverne l'ORDRE
   (scope)          │  gate en 5 critères                  │   de tout le reste
                    └───────────────────┬─────────────────┘
                                        │
                    ┌───────────────────▼─────────────────┐
   DÉFAUTS 1+3      │  CHANTIER CENTRAL :                  │   = Vague 1, le squelette
   (preuve +        │  la colonne de preuve                │   (PasseportEnrichment
    validation)     │  (EvidenceRef, 3 régimes)            │    généralisé)
                    └───────────────────┬─────────────────┘
                                        │
         ┌──────────────────────────────┼──────────────────────────────┐
         ▼                              ▼                               ▼
   DÉFAUT 2                       DÉFAUT 4                        (périphérie)
   (gamification)                 (IA / confiance)               réconciliée
   destination = la preuve        RÈGLE : humain décide,         vers le bas,
   + firewall immédiat            machine étaye ;                tirée par la
   (soustraction, découplé)       jamais de % nu                 demande
```

Deux enseignements de l'arbre :

- **Le défaut 5 est au-dessus de tout** : sa doctrine (ne construire que le squelette, réconcilier
  le reste vers le bas) et son *gate* en cinq critères décident **dans quel ordre** on traite les
  autres. Ce n'est pas un défaut parmi cinq, c'est le cadre.
- **Le défaut 2 a une partie détachable** : le « firewall » (retirer les +20 XP sur la réflexion,
  ne pas coder l'atrophie ni le claim payant) est de la pure **soustraction**, indépendante du
  chantier central, faisable tout de suite.

---

## Le chantier central, en clair

Une primitive `EvidenceRef` reliée à `LearnerCompetency`, avec **trois régimes de preuve gradués
selon ce que le palier engage** — c'est la formulation commune aux défauts 1 et 3 :

| Régime | Déclencheur | Validation | Preuve |
|---|---|---|---|
| **Léger** | quiz, flashcard, réflexion libre | automatique | trace, pas d'humain — *hors art. 22* |
| **Dialogué** | montée de niveau Dreyfus | coach, sur rubrique | rubrique scorée + justification + signature |
| **Certifiant** | palier majeur, JAC, Open Badge | coach + pair/manager | rubrique × 2 validateurs + log de divergence |

**Pourquoi ce découpage est la clé.** Il évite les deux écueils symétriques : mettre la lourdeur
d'une rubrique sur une flashcard (scolarisation, friction) *et* laisser un simple tampon sur un
credential (nullité au sens de l'art. 22). L'exigence de preuve est proportionnée à l'enjeu — juste
pédagogiquement, tenable économiquement, conforme là où il faut.

**L'invariant, redit trois fois dans la série** : l'auto-déclaration (positionnement, questionnaire
IA) **n'écrit jamais le niveau**. Elle vit dans un `selfAssessedLevel` distinct — « ta perception »
— qui, croisé plus tard aux preuves réelles, devient une donnée de **calibration** métacognitive.

---

## Les deux règles transverses

Ce ne sont pas des features à construire, mais des **principes qui s'appliquent partout**.

### Règle A — « L'humain décide, la machine étaye » *(défaut 4, et fil rouge de 3)*

Un LLM produit **du langage, jamais un nombre-mesure ni un nombre-décision.**

- Fiabilité du *langage* = groundedness qualitative (« bien ancrée / à recouper / peu ancrée »),
  jamais un `%` auto-déclaré. **Aucun pourcentage nu** à l'écran.
- Fiabilité des *chiffres* = calcul déterministe (SQL, projection statistique), le LLM ne fait que
  narrer le résultat.
- Les *décisions RH* (churn, matching, affectation) = déterministe + **humain décideur**. Le churn
  ne déclenche jamais un mail seul.

C'est la même posture que la validation coach du défaut 3 : la machine propose et explique, l'humain
tranche en connaissance de cause. Et le levier UX est identique — **le rationale s'affiche *avant*
le bouton**, jamais après, sinon on induit le tampon.

### Règle B — Le *gate* en cinq critères *(défaut 5)*

Un cahier n'entre en développement que si : **1 techno tranchée · 1 chiffre d'effort daté · 1 unité
de crédit cohérente · 0 fonction hors North Star sans utilisateur réel · le code fait foi** en cas
de conflit. Ce gate tue d'un coup l'incohérence chiffrée, l'économie de crédits cassée et la
sur-ingénierie.

---

## Le thème unificateur

Sous les cinq défauts, une même ligne de faille et une même réponse.

> **Partout, le défaut est une automatisation qui trompe. Partout, la solution est de refaire de la
> place à l'humain.**

| Le défaut = automatisation trompeuse | La solution = l'humain à sa place |
|---|---|
| niveau déclaré sans preuve *(1)* | l'apprenant co-auteur de sa preuve |
| points qui simulent la compétence *(2)* | l'attestation, reconnue relationnellement |
| validation-tampon *(3)* | le coach qui analyse une rubrique |
| `%` de confiance inventé *(4)* | l'abstention honnête qui renvoie au coach |
| specs qui promettent l'usine *(5)* | l'équipe de deux qui coupe au squelette |

Ce n'est pas un hasard : **c'est exactement le positionnement SBO pris au sérieux.** Une
organisation par les compétences repose sur des compétences *démontrées et attestées par des
humains*, pas sur des scores calculés. Résoudre ces défauts, ce n'est pas corriger des bugs — c'est
faire coïncider le produit avec ce qu'il prétend être. Et andragogiquement, « l'humain décide, la
machine étaye » *est* le principe : l'adulte reste auteur de son apprentissage.

---

## Le plan d'exécution, unifié

Les cinq documents convergent vers le même séquencement — celui que la doctrine du défaut 5 impose.

### Vague 0 — Décider, pas coder *(gratuit, débloque tout)*

- Trancher les architectures ouvertes : paiement (PaymentIntents SCA, pas Charges), file de notifs
  (une table + cron, pas RabbitMQ), modèle atelier. *(défaut 5)*
- **Réconcilier l'unité de crédit** avec les plans. *(défaut 5)*
- Poser les invariants : l'auto-déclaration n'écrit pas le niveau *(1)* ; aucune mécanique de jeu ne
  touche un niveau ni ne rémunère la réflexion *(2)*.
- **Le firewall du défaut 2**, immédiat et détaché : retirer les +20 XP sur le journal, ne pas
  construire l'atrophie-badge ni le claim payant *(soustraction — spec-only, donc « ne pas coder »)*.

### Vague 1 — Le squelette de preuve *(le chantier central)*

- Généraliser `PasseportEnrichment` → `EvidenceRef`, les trois régimes, la rubrique. Brancher
  toutes les sources : quiz *(déjà persisté)*, réflexion EDRA, FAST de mission, validation coach.
  **Ce chantier résout les défauts 1, 3, et la destination de 2.**
- Rendre le lien Journal↔Passeport bidirectionnel *(1)*.

### Vague 2+ — Réconcilier vers le bas, tiré par la demande

- Passer chaque cahier périphérique au *gate* en cinq critères, **dans l'ordre où un utilisateur ou
  un deal l'appelle** — pas dans l'ordre du sommaire. *(défaut 5)*
- Appliquer la règle « humain décide, machine étaye » à chaque feature IA touchée : split
  LLM/déterministe, abstention, `%` retiré. *(défaut 4)*
- Rouvrir la gamification riche *(la double-monnaie de C)* seulement une fois la preuve stable — V2,
  jamais préalable. *(défaut 2)*

---

## Récapitulatif — une ligne par défaut

| # | Défaut | Reco tranchée | Nature | Dépend de |
|---|---|---|---|---|
| 1 | Preuve | Registre `EvidenceRef`, 3 régimes gradués | **chantier** | — (le socle) |
| 2 | Gamification | Attestation = récompense ; firewall immédiat ; jeu subordonné | soustraction + dépend de 1 | 1 (destination) |
| 3 | Validation humaine | Rubrique obligatoire ; = un `EvidenceRef` | **= le chantier 1** | fusionné avec 1 |
| 4 | IA / confiance | Humain décide, machine étaye ; jamais de `%` nu | **règle transverse** | 3 (churn→humain) |
| 5 | Scope | Walking skeleton + gate 5 critères | **doctrine** | gouverne l'ordre |

---

## Ce qui reste à trancher en métier

Consolidé des cinq documents — aucun ne se devine, tous appellent une décision humaine.

1. **Le barème des régimes de preuve** : quels paliers exigent une rubrique (dialogué), lesquels
   exigent deux validateurs (certifiant) ? *(défauts 1, 3)*
2. **L'écriture des rubriques** — compétence par compétence. C'est le vrai coût, humain et non
   technique, de la rigueur. *(défauts 1, 3)*
3. **Le rôle du pair** dans la validation : ouvrir au pair (moins coûteux, andragogiquement riche)
   ou rester coach-only ? *(défauts 1, 3)*
4. **L'unité de crédit** unique, adhérente au pricing gelé (FACTS-CANON S2). *(défauts 2, 5)*
5. **Le churn** : accepte-t-on de le sortir de Mistral vers une heuristique explicable, et de ne
   jamais déclencher d'action RH automatique ? *(défaut 4)*
6. **Le rail de paiement déjà le plus câblé** dans le code — non vérifié, à constater avant de
   trancher. *(défaut 5)*
7. **Qui tient le backlog fermé** et sur quel signal un item en sort. *(défaut 5)*
8. **La qualification juridique** (AIPD, usage de la sortie) — la seule qui ne peut venir que d'un
   conseil. *(défaut 3)*

---

## Les cinq études détaillées

Les 5 études détaillées sont désormais réunies en **un seul dossier** (fusion 2026-07-24) :
- [`SOLUTIONS-DETAIL`](SOLUTIONS-DETAIL.md) — dossier consolidé, un chapitre par incohérence : **01** la colonne de preuve · **02** attestation vs jeu · **03** la validation coach · **04** signal IA honnête · **05** le périmètre soutenable.

Amont : [`REVUE-TRANSVERSALE-CDC`](REVUE-TRANSVERSALE-CDC.md) (les défauts) ·
[`REGLEMENTAIRE-ET-SBO`](REGLEMENTAIRE-ET-SBO.md) (le cadre juridique).

---

## Journal

**2026-07-23** — Création. Synthèse des cinq études de solutions. Constat structurant : les cinq
défauts ne sont pas cinq chantiers mais **un chantier central** (la colonne de preuve, qui dissout
les défauts 1+2+3), **deux règles transverses** (humain-décide-machine-étaye ; le gate en 5
critères) et **une doctrine d'ordre** (walking skeleton). Thème unificateur : partout le défaut est
une automatisation trompeuse, partout la solution refait de la place à l'humain — ce qui *est* le
positionnement SBO pris au mot. Plan en 3 vagues (décider / squelette de preuve / réconcilier vers
le bas). Huit décisions métier restent à trancher.
