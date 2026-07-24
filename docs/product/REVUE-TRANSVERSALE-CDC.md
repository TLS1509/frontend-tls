# Revue transversale des 16 cahiers — synthèse

> **2026-07-23.** Synthèse d'une lecture intégrale des 16 cahiers des charges de la Learning App,
> menée sous trois lentilles : advisor technique, researcher, et neuro-pédagogie / UX / andragogie
> pour adultes en situation de travail.
> ⚠️ **Aucun cahier n'est modifié.** Les cahiers restent source de vérité ; ce document rassemble
> des constats et des propositions, à valider en métier.
> Détail par cahier dans les critiques dédiées :
> [`CRITIQUE-BOUCLE-APPRENANT`](CRITIQUE-BOUCLE-APPRENANT.md) ·
> [`CRITIQUE-PASSEPORT-JOURNAL`](CRITIQUE-PASSEPORT-JOURNAL.md) ·
> [`CDC-10-ANALYTICS`](CDC-10-ANALYTICS-PROPOSITIONS.md) ·
> [`CDC-13BIS-RGPD`](CDC-13BIS-RGPD-PROPOSITIONS.md) ·
> [`REGLEMENTAIRE-ET-SBO`](REGLEMENTAIRE-ET-SBO.md).

---

## Ce que cette lecture change dans le diagnostic

Trois idées reçues tombent.

1. **« Le produit est en retard sur les specs. »** Faux, souvent l'inverse. Sur plusieurs cahiers,
   **le code a tranché plus juste que le cahier**. La priorité n'est pas de coder plus, c'est de
   **réconcilier les cahiers vers le bas**, sur le frontend existant.
2. **« Le passeport est à 90 %. »** Vrai en surface, faux en fond : il lui manque sa **colonne
   vertébrale** — la preuve. Et ce manque se répercute sur six autres cahiers.
3. **« La conformité, c'est pour décembre 2027. »** Non : l'AI Act est reporté, mais le **RGPD
   mord aujourd'hui**, et le point exact où il mord (la validation humaine du coach) est
   précisément celui qui n'est pas conçu.

---

## Les cinq défauts transversaux, par gravité

### DÉFAUT 1 — La preuve n'a pas de colonne vertébrale ⛔ le plus grave

Constaté sur **six cahiers** : 01 (positionnement), 01bis (quiz, mission), 03 (onboarding), 04
(validation coach), 05 (badges), 07 (journal).

Le passeport affiche un **niveau Dreyfus qui est un simple nombre**. Rien ne dit sur quoi il
repose, ni qui l'a validé. Toutes les sources de preuve existent — quiz (désormais persisté),
réflexion EDRA, FAST de mission, validation coach — mais **aucune n'est reliée à un niveau de
compétence tracé**.

**La bonne nouvelle, découverte en lisant le code** : le patron existe déjà, au mauvais endroit.
`src/types/projects.ts` contient `Jac` (`rubricScores`, `expertFeedback`, `validatedAt`) et
`PasseportEnrichment` (`oldDreyfusLevel→newDreyfusLevel`, `sourceType`, `sourceId`, `verifiedBy`,
`verifiedAt`) — **exactement** le modèle evidence-with-provenance manquant, cantonné au silo
Projects.

**Le chantier n'est donc pas d'inventer, mais de généraliser** `PasseportEnrichment` au rang de
primitive du passeport, et d'y brancher toutes les sources. Un seul chantier data débloque :
la crédibilité du passeport, la boucle Learn→Do→Match, Learning Buddy, **et** la défense RGPD
art. 22. C'est le meilleur rapport valeur/effort de tout le produit.

> Règle à graver au passage : **l'auto-déclaration (positionnement) n'écrit jamais `currentLevel`**.
> Elle alimente au mieux un `selfAssessedLevel` distinct, affiché comme « ta perception ». Le niveau
> ne se gagne que par preuve. Sinon un apprenant se sur-note et débloque des contenus sans mérite
> (faille d'amorçage des pré-requis Type B, cahier 01).

### DÉFAUT 2 — Gamification contre attestation ⛔ risque de positionnement SBO

Constaté sur 05 + 07 + 06, en tension directe.

Le système récompense l'**activité** (XP, streaks, logins) là où il devrait attester la
**compétence démontrée**. Et il le fait aux pires endroits :

- **La réflexion est payée en XP** (+20 par entrée de journal). Or la réflexion est l'activité la
  plus intrinsèquement motivée du produit — la théorie de l'autodétermination est formelle : une
  récompense tangible et attendue **corrode** cette motivation. On gamifie exactement ce qu'il ne
  faut pas.
- **L'atrophie rétrograde un badge** (D4→D3 après 90 j d'inactivité). C'est épistémiquement faux
  (avoir validé D4 le 15 mars *reste vrai*) et contradictoire (le même cahier vend l'Open Badge
  comme credential permanent partagé sur LinkedIn). Dire à un manager que son badge a chuté parce
  qu'il a *livré du vrai travail* pendant trois mois produit du churn, pas du réengagement.
- **Le claim de badge est payant** (1 crédit). On *gagne* le badge par la preuve, puis on *paye*
  pour le réclamer — ce qui brouille le sens du credential et injecte une anxiété d'achat au pic
  de la réussite.
- **Les dashboards enterprise mesurent la présence, pas l'apprentissage.** Engagement rate,
  completion, alertes d'inactivité au manager. Aucune métrique d'*outcome*. Pour une SBO, la North
  Star devrait être la **compétence démontrée**, pas la fréquence de login — optimiser la présence
  pousse les managers à harceler, ce qui se retourne.

**Le garde-fou commun** : faire de l'attestation evidence-based la colonne vertébrale, et garder
XP/streaks/engagement comme un échafaudage **subordonné, séparé, opt-out**, qui ne contamine ni la
réflexion ni le credential. Découpler l'attestation (permanente) d'un signal de **fraîcheur** non
punitif (« dernière pratique il y a 92 jours — un rafraîchissement ? »).

### DÉFAUT 3 — Le RGPD mord maintenant, et au point non conçu ⚠️

L'AI Act haut risque est reporté à décembre 2027, mais le **RGPD art. 22 s'applique aujourd'hui**,
et trois points sont ouverts :

- **La validation coach n'est pas persistée comme preuve** (cahier 04, `TBD` explicite à la ligne
  1492). Or c'est *exactement* l'artefact qui doit démontrer l'« intervention humaine
  significative » qui fait sortir le passeport du régime de décision automatisée. Le pont
  humain→passeport, cœur de la défense juridique, **n'est pas conçu** — même défaut que le
  DÉFAUT 1, vu sous l'angle légal.
- **Le « mail de relance déclenché automatiquement par Mistral »** (churn, cahier 12bis) est une
  décision solely-automated → information, intervention humaine et droit de contestation requis.
- **Le questionnaire d'onboarding se présente comme une conversation sans dire que c'est une IA**
  (cahier 03) → manque de transparence (art. 50 AI Act, applicable plus tôt).

**Cartographie AI Act (pour le jour où)** — trois fonctions basculent en haut risque (annexe III,
point 4), les autres non :

| Bascule en haut risque | Reste hors périmètre |
|---|---|
| Churn envoyé au manager *(12bis)* | Chatbot apprenant *(12)* |
| Auto-attribution de tâches *(12bis #10)* | Recommandations learner-facing *(12bis #2/#3)* |
| Matching en mode manager *(12bis #4/#5)* | Questionnaire de positionnement *(12bis #1)* |

Le levier de conception : garder l'humain **décideur** (l'IA propose et explique, le coach/manager
reçoit et tranche, l'IA ne déclenche pas d'action RH), et cloisonner les features RH-sensibles
avec une AIPD dédiée.

### DÉFAUT 4 — Le « score de confiance en % » est un mythe technique ⚠️

Constaté sur 12, 12bis, 03. Les cahiers affichent partout un « taux d'adéquation 92 % » ou un
`confidence_score` comme s'il s'agissait d'une probabilité calibrée. **Un LLM ne produit pas de
confiance calibrée fiable** — une valeur auto-déclarée est facilement sur-confiante sur une
hallucination.

Plus large : **Mistral est traité comme un couteau suisse universel**, y compris pour des tâches
où c'est le mauvais outil — scoring de churn, agrégation d'organisation, calcul de taux. Ces
tâches sont tabulaires ou déterministes ; les confier à un LLM les rend chères, non reproductibles
et hallucinantes.

**Correctifs** : remplacer le score LLM par une vérification de *groundedness* (réponse vs
contexte) ; sortir la génération SQL et les calculs de prévision du LLM (requêtes paramétrées
backend, calcul déterministe, LLM en couche de reformulation seulement) ; passer les scores en
registre **qualitatif** côté UX (haute/moyenne/faible + justification).

### DÉFAUT 5 — Incohérences chiffrées et sur-ingénierie systématiques ⚠️

**Chaque cahier** donne 3 à 4 estimations d'effort contradictoires (ex. cahier 09 : 170h en
en-tête, 355h, 405h, 361h). Aucun n'est budgétable en l'état.

**L'économie de crédits ne tient pas**, transversalement : une session de coaching coûte **1, 10
ou 50 crédits** selon le passage, alors que les plans octroient 0,5 à 2 crédits/mois — jusqu'à
25 mois d'abonnement pour une seule session.

**Incohérences techniques** notables : trois technologies de queue mutuellement exclusives (09) ·
Stripe Charges API, legacy et non conforme SCA/PSD2 en UE, au lieu de PaymentIntents (03) ·
transaction ACID enveloppant un appel réseau Stripe, anti-pattern qui encaisserait sans réserver
(03) · « RFC 5545 » cité pour les Open Badges alors que c'est le format iCalendar (05, quatre
fois) · dimension d'embedding 1536 (OpenAI) là où mistral-embed sort en 1024 (12).

**Sur-ingénierie pour une équipe de deux** : 6 canaux de notification et 16 tables (09) · wiki
public multilingue 4 langues (13) · RBAC custom + infra webhook + constructeur de dashboards (06) ·
Open Badge auto-hébergé signé cryptographiquement, 60-80h de crypto maison (05). Le vrai coût
n'est pas le build, c'est la **dette de maintenance** de toute cette surface.

---

## Verdict par cahier

| # | Cahier | Verdict d'ensemble | Le point à traiter en premier |
|---|---|---|---|
| 01 | Parcours / Learning Space | Architecture solide (étape réutilisable) | Geler la règle positionnement→passeport ; trancher la navigation (Gap #1) |
| 01bis | Items & Veille | Missions RIEC/FAST = pépite ; 13 types = dispersion | Fermer la boucle de preuve ; consolider 13 types → ~5 archétypes |
| 02 | Passeport | Bon en surface, sans colonne vertébrale | **Ajouter la preuve** (DÉFAUT 1) |
| 03 | Onboarding | 60-70 % du cahier = facturation mal placée | Sortir le paiement, corriger Stripe ; modéliser la provenance des niveaux |
| 04 | Coaching | Bon socle humain ; validation non persistée | **Faire de la validation coach un artefact de preuve** (DÉFAUT 1+3) |
| 05 | Gamification | Noyau légitime enrobé de mécaniques corrosives | Découpler attestation et jeu ; refondre atrophie et claim payant |
| 06 | Enterprise | Bien conçu, mais dérive surveillance + sous-estimé | Recadrer engagement→soutien ; ajouter un KPI d'outcome |
| 07 | Journal | **Le joyau pédagogique** | Protéger de l'XP ; modéliser la couche partage/commentaire ; backlink |
| 08 | Masterclass/Événements | Bonne couverture FO ; modèle atelier double | Trancher validation vs crédits ; « Meet embed » infaisable → lien |
| 09 | Notifications | Sur-ingénierie massive ; défaut « tout immédiat » | Descoper à Email+In-App ; digest par défaut |
| 10 | Analytics | Mature (stade 3-4) ; substrat de conformité | `surface`+`context` ; xAPI ; métrique citable |
| 11 | Projects SBO | *(lu partiellement)* Contient le bon patron preuve | Généraliser `PasseportEnrichment` |
| 11bis | Subscription | *(lu)* Pricing gelé (FACTS-CANON) | Réconcilier l'unité de crédit |
| 12 | Chatbot | Positionnement défendable ; confidence = mythe | Groundedness ; retrieval access-control ; mode manager absent |
| 12bis | IA Framework | Méthodo 6-points excellente ; scope à 3 versions | Réconcilier le scope ; sortir churn de Mistral ; AIPD |
| 13 | Helpcenter | Sobre ; wiki public = risque sécurité | Ne pas exposer la doc sensible ; FR-only ; aligner le front |
| 13bis | RGPD / AI Act | Modèle `ai_decisions` bon ; 5 absences gouvernance | AIPD ; art. 22 ; registre ; sous-traitants ; transferts |

---

## Plan d'action proposé, par vagues

Ordonné par dépendance et par valeur. Rien ici n'est engagé — c'est une proposition de séquence.

### Vague 0 — Décisions, pas du code *(à trancher avant de coder quoi que ce soit)*

1. **Geler la règle preuve** : l'auto-déclaration n'écrit jamais le niveau ; le niveau ne se gagne
   que par preuve validée. C'est la décision qui gouverne les DÉFAUTS 1, 2 et 3 à la fois.
2. **Réconcilier l'économie de crédits** en un seul barème cohérent avec les plans.
3. **Trancher les architectures ouvertes** : paiement (PaymentIntents, pas Charges), queue de
   notifs (une table + cron, pas RabbitMQ), modèle atelier (validation *ou* crédits).

### Vague 1 — La colonne vertébrale de la preuve *(le chantier data central)*

4. **Généraliser `PasseportEnrichment`** au rang de primitive du passeport ; y brancher quiz
   (déjà persisté), réflexion EDRA, FAST de mission, validation coach. Rendre la validation coach
   obligatoirement raisonnée (rubrique + justification) — ce qui sert produit **et** RGPD.
5. **Rendre le lien Journal↔Passeport bidirectionnel** : une page compétence liste les réflexions
   qui l'adossent. Le passeport devient le portfolio vivant promis.

### Vague 2 — Conformité applicable maintenant

6. **AIPD** (RGPD art. 35) + disclosure IA sur le questionnaire + garder l'humain décideur sur
   churn/matching. Séparer le volet RGPD (urgent) du volet AI Act (2027) dans le cahier 13bis.

### Vague 3 — Réconcilier les cahiers vers le bas

7. **Descoper** : notifications à Email+In-App, helpcenter FR-only sans wiki public sensible,
   enterprise sans RBAC custom ni dashboard-builder. Aligner les cahiers sur le frontend là où le
   code est déjà plus juste.
8. **Consolider** : 13 types d'items → ~5 archétypes ; 13 types de journal → ~3 interfaces.

### Vague 4 — Qualité IA & pédagogie

9. **Sortir churn/agrégation/SQL de Mistral** ; scores qualitatifs ; chatbot en mode scaffolding
   par défaut (questionne, ne mâche pas).
10. **Refondre gamification** : attestation permanente découplée, fraîcheur non punitive, XP
    subordonné et opt-out, claim non payant sur la reconnaissance interne.

---

## Ce que cette revue n'a pas fait

- **Les pages n'ont pas toutes été lues ligne à ligne.** Plusieurs constats frontend sur les
  dashboards enterprise, CoachJournal et les shells statiques sont des **inférences par grep**, à
  confirmer page par page.
- **Le cahier 11 (Projects SBO) n'a été lu que partiellement** — or c'est lui qui contient le bon
  patron de preuve. Il mérite sa propre passe complète.
- **Le back-office WordPress est hors de ce dépôt** : toute la moitié BO des cahiers n'est pas
  vérifiable ici.
- **Aucune vérification juridique de première main.** Les analyses RGPD/AI Act préparent une
  conversation avec un conseil, elles ne la remplacent pas.
- **Les chiffres Deloitte et les faits marché** cités dans les critiques dédiées sont sourcés,
  mais pas re-vérifiés dans cette synthèse.

---

## Journal

**2026-07-23** — Création. Synthèse de la lecture intégrale des 16 cahiers (12 via agents
délégués, 4 lus en direct). Cinq défauts transversaux dégagés, dont deux structurels : l'absence
de colonne vertébrale de la preuve (qui touche 6 cahiers et dont le correctif existe déjà dans
`projects.ts`), et la tension gamification/attestation (risque de positionnement SBO). Constat
récurrent et encourageant : sur plusieurs cahiers, **le code a tranché plus juste que la spec** —
la priorité est de réconcilier vers le bas, pas de coder plus.
