# Cahier 13bis — RGPD & AI Act : propositions d'évolution

> **2026-07-23.** Propositions pour le cahier 13bis, à partir du texte existant et des recherches
> juridiques rassemblées dans [`REGLEMENTAIRE-ET-SBO.md`](REGLEMENTAIRE-ET-SBO.md).
> ⚠️ **Proposition, pas spécification.** Le cahier
> [`13bis_GDPR_AI_Act_Security.md`](../CDC/13bis_GDPR_AI_Act_Security.md) reste source de vérité
> et n'est pas modifié.
> ⚠️ **Je ne suis pas juriste.** Ce document prépare une revue par un conseil.

---

## D'abord, une correction que je me dois

Dans [`CDC-10-ANALYTICS-PROPOSITIONS.md`](CDC-10-ANALYTICS-PROPOSITIONS.md), j'ai proposé de créer
une entité `AIDecisionLog` pour tracer les décisions algorithmiques.

**Elle existe déjà**, et en mieux — dans le cahier 13bis, sous la forme de deux entités liées :

| `ai_decisions` | | `ai_overrides` | |
|---|---|---|---|
| `decision_type` | matching, suggestion, recommandation de parcours | `ai_decision_id` | la décision contredite |
| `recommendation` | ce qui a été proposé | `override_by_user_id` | qui a contredit |
| **`rationale`** | **explication lisible par un humain** | **`override_reason`** | **pourquoi — champ requis** |
| **`confidence_score`** | **niveau de confiance du modèle** | `override_choice` | ce qui a été retenu à la place |
| `is_overridden` | booléen | | |

**C'est très bien vu.** `rationale` répond à l'article 13 (transparence), `confidence_score` à
l'article 15 (exactitude), et le couple décision/contradiction avec motif obligatoire instrumente
l'article 14 (supervision humaine) **et** l'exemption de l'article 22 RGPD.

Ma proposition du cahier 10 est donc à retirer. La bonne formulation est : **le cahier 10 doit
consommer les entités du 13bis, pas les redéfinir.**

---

## Ce qui manque — cinq absences mesurées

J'ai compté les occurrences dans les 1 009 lignes du cahier.

| Notion | Occurrences | Statut |
|---|---:|---|
| DPO | 18 | ✅ bien couvert |
| Rétention des données | 9 | ✅ couvert |
| **AIPD / analyse d'impact (art. 35)** | **0** | ❌ absent |
| **Article 22 — décision automatisée** | **0** | ❌ absent |
| **Registre des traitements (art. 30)** | **0** | ❌ absent |
| **Sous-traitants (art. 28)** | **0** | ❌ absent |
| **Transferts hors UE (chap. V)** | **0** | ❌ absent |

Le cahier couvre remarquablement bien **le consentement, les droits des personnes et la sécurité
applicative** — les douze règles OWASP sont là. Ce qui manque relève de la **gouvernance du
traitement**, pas de la protection technique.

---

### Absence 1 — L'analyse d'impact (AIPD), probablement obligatoire

Le RGPD impose une AIPD pour « l'évaluation systématique et approfondie d'aspects personnels
[…] fondée sur un traitement automatisé, y compris le profilage, et sur la base de laquelle sont
prises des décisions produisant des effets juridiques ».

**Un passeport de compétences alimenté automatiquement et utilisé pour orienter des parcours
correspond à cette définition.** Le cahier n'en parle pas.

**Proposition.** Ajouter l'AIPD au périmètre MVP comme **livrable documentaire**, pas comme
fonctionnalité. Elle conditionne la mise en service, pas le code. Et elle est aujourd'hui le
premier chantier de conformité — avant l'AI Act, dont l'échéance est repoussée à décembre 2027.

---

### Absence 2 — L'article 22 n'est jamais nommé

Le cahier prévoit un mécanisme de contradiction humaine (*human override*). C'est le bon réflexe.
Mais il n'est jamais rattaché à l'article 22, et cela a une conséquence pratique.

**L'article 22 pose une condition précise** : l'intervention humaine doit être *significative*.
Un opérateur qui valide systématiquement sans analyse indépendante **ne compte pas**. Il faut que
la personne ait **l'autorité et la compétence** de modifier la décision, et qu'elle dispose des
informations pour le faire.

**Le champ `rationale` est donc structurant, pas cosmétique** : c'est lui qui permet au coach de
contredire en connaissance de cause. S'il est mal rempli, l'exemption tombe.

**Proposition.** Trois précisions à inscrire dans les règles :

1. `rationale` doit être **compréhensible par le coach**, pas par un ingénieur — c'est un critère
   de qualité rédactionnelle, pas de format.
2. L'écran de contradiction doit afficher `rationale` **avant** le bouton de validation.
3. Un taux de contradiction proche de zéro n'est pas un bon signe : c'est le symptôme d'une
   validation automatique. **À suivre comme indicateur de conformité**, pas de performance.

---

### Absence 3 — Le registre des traitements (art. 30)

Obligatoire, et absent du cahier. Ce n'est pas un chantier lourd pour une structure de deux
personnes, mais c'est la première pièce qu'une autorité demande.

**Proposition.** Le noter comme livrable, avec un point d'attention : **vous êtes à la fois
responsable de traitement** (pour vos propres apprenants en direct) **et sous-traitant** (pour les
apprenants de vos clients entreprise). Ce sont deux registres, ou deux sections.

---

### Absence 4 — Les sous-traitants (art. 28)

Le périmètre mentionne « *Data Processing Agreement (DPA) setup & clauses* » — donc l'accord est
prévu. Mais **rien ne recense qui sont les sous-traitants**, ni ne prévoit d'en tenir la liste à
jour.

**Proposition.** Une liste tenue, avec pour chacun : finalité, données concernées, localisation,
base du transfert. Elle sert au registre, à l'AIPD, et aux questions des clients — les DRH d'ETI
la demandent systématiquement.

---

### Absence 5 — Les transferts hors UE, et ce que votre propre pile implique

**C'est l'absence la plus concrète, parce qu'elle est vérifiable aujourd'hui.**

Le choix de **Mistral** pour le chatbot est une bonne décision de souveraineté, et le cahier le
mentionne. Mais le reste de l'outillage TLS comprend des services américains : Notion, Google
Drive et Gmail, Figma, Canva, HeyGen.

La question n'est pas « ces outils sont-ils permis » — ils le sont, sous conditions. Elle est :

> **Des données d'apprenants transitent-elles par l'un d'eux ?**

Quelques cas concrets à trancher :

| Cas | Question |
|---|---|
| Comptes rendus de réunion Notion citant des apprenants | Données personnelles dans un outil tiers |
| Contenus pédagogiques produits avec HeyGen à partir de cas réels | Voix, image, situations identifiables |
| Exports d'analytics manipulés dans Drive | Données de progression nominatives |
| Contacts et deals dans le CRM Notion | Données de prospects, pas d'apprenants — moins sensible |

**Proposition.** Une règle simple à inscrire au cahier : **aucune donnée d'apprenant nominative ne
sort de l'infrastructure applicative** vers un outil de productivité. Si un cas d'usage l'exige,
il passe par une pseudonymisation documentée.

C'est une règle facile à énoncer et difficile à tenir sans y penser — d'où l'intérêt de l'écrire
maintenant.

---

## Ce que le report de l'AI Act change pour ce cahier

Le cahier traite l'AI Act et le RGPD ensemble. Le *Digital Omnibus* signé le 8 juillet 2026 les
désynchronise :

| | Échéance | Priorité |
|---|---|---|
| **RGPD** — AIPD, art. 22, registre, sous-traitants, transferts | **applicable** | **maintenant** |
| **AI Act** — haut risque, annexe III | déc. 2027 | structurant |

**Proposition.** Séparer les deux volets dans le cahier. Aujourd'hui ils partagent le même
périmètre « MVP Juillet », ce qui masque le fait que **l'un est en retard et l'autre a 17 mois
devant lui**.

Et un point qui allège : la qualification AI Act **dépend de l'usage**, pas de la technologie.
Un passeport déclaratif, validé par un pair, servant au développement de la personne sort
probablement du périmètre. C'est une décision produit qui peut annuler une grande partie de la
charge — **à trancher avant d'investir dans la conformité haut risque**.

---

## Ce que je proposerais, dans l'ordre

| # | Action | Nature | Pourquoi maintenant |
|---|---|---|---|
| 1 | **Lancer l'AIPD** | document | Applicable aujourd'hui, conditionne la mise en service |
| 2 | **Rattacher explicitement l'override à l'art. 22** + les 3 règles sur `rationale` | règles | Coût quasi nul, l'exemption en dépend |
| 3 | **Registre des traitements**, en deux volets (responsable / sous-traitant) | document | Première pièce demandée en cas de contrôle |
| 4 | **Liste des sous-traitants** avec localisation et base de transfert | document | Sert au registre, à l'AIPD et aux clients |
| 5 | **Règle « aucune donnée nominative hors infrastructure »** | règle | Vérifiable, et votre pile actuelle la met en jeu |
| 6 | **Séparer le volet AI Act du volet RGPD** dans le cahier | structure | Les échéances ont divergé |
| 7 | Retirer `AIDecisionLog` de mes propositions du cahier 10 | correction | Fait double emploi avec `ai_decisions` |

**Cinq des sept sont des documents ou des règles, pas du code.** C'est cohérent avec l'esprit du
cahier, qui se présente lui-même comme « RÈGLES & GOVERNANCE ».

---

## Ce qui reste à trancher

1. **TLS est-il responsable de traitement, sous-traitant, ou les deux ?** La réponse change le
   registre, les obligations et les contrats. Vraisemblablement les deux, selon le canal de vente.
2. **Des données d'apprenants transitent-elles aujourd'hui par Notion, Drive ou HeyGen ?**
   Question factuelle, vérifiable, et je ne l'ai pas vérifiée.
3. **Qui porte l'AIPD** — TLS ou le client déployeur ? Probablement TLS comme concepteur, mais à
   confirmer.
4. **Le périmètre « MVP Juillet » du cahier tient-il ?** Il est daté de juillet et à 75 %.

---

## Journal

**2026-07-23** — Création. Le modèle de données du cahier est bon — `ai_decisions` et
`ai_overrides` instrumentent déjà les articles 13, 14 et 15 de l'AI Act ainsi que l'exemption de
l'article 22 RGPD ; ma proposition d'`AIDecisionLog` au cahier 10 faisait double emploi et est
retirée. Cinq absences mesurées, toutes de gouvernance et non de sécurité : **AIPD, article 22,
registre des traitements, sous-traitants, transferts hors UE** — cette dernière étant vérifiable
sur la pile d'outils actuelle.
