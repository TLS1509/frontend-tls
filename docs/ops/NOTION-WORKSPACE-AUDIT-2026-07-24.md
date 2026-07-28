# Workspace Notion — audit, partage et automatisation

> **2026-07-23.** Exploration du workspace TLS : bases, projets, tâches, meetings, index d'agents.
> Objet : améliorer le partage d'information entre Chloé et Pierre-Armand, et mettre en place des
> routines qui empêchent d'oublier les échéances.
> Complète [`CARTOGRAPHIE-OUTILLAGE.md`](CARTOGRAPHIE-OUTILLAGE.md).

---

## Le diagnostic en une phrase

**Le workspace n'est pas sous-conçu, il est sous-activé.** Tout ce qu'il faut existe déjà —
les bases, les relations, les vues de triage, et même six agents spécifiés en avril. Rien n'a
été branché. Le manque n'est pas dans la conception, il est dans le déclenchement.

---

## 1. Ce qui existe déjà — et c'est beaucoup

| Base | Contenu | État |
|---|---|---|
| **Projects** | 40 projets, reliés à Tasks, Meetings, Docs, Decision Log, Company Areas, Ressources | ✅ structure riche |
| **Tasks** | **257 tâches — 110 faites, 147 ouvertes** | ⚠️ arriéré important |
| **Meetings** | Comptes rendus auto-résumés, avec actions extraites | ✅ actif et de bonne qualité |
| **Company Areas** | 7 domaines : Learning App · Product · Admin & Finance · CX · Marketing · Sales · Operations | ✅ |
| **Decision Log** | Journal de décisions | ❓ relié partout, jamais rempli depuis les meetings |
| **CRM** (7 bases) | Deals, Entreprises, Contacts, Incoming Leads, Communications, Devis, Factures | ⚠️ **conçu finement, non tenu** — voir §8 |
| **📦 Suivi des commandes** | Commandes réelles, montants, facturation, trimestre | ✅ **tenu à jour** |
| **🤖 AI Agents Index** | 32 entrées, avec Mode / Trigger / Permissions / Test status | ✅ **cadre excellent** |
| **Skills** | **11 skills TLS déjà écrites** | ⚠️ aucune active — voir §9 |

Les vues de Projects sont déjà sophistiquées : `Missing essentials (triage)` repère les fiches
incomplètes, `Lifecycle — Close review` sort les projets terminés depuis plus d'un mois,
`Learning App — Parcours (≤ 01/09)` porte l'échéance de septembre.

**Quelqu'un a réfléchi sérieusement à ce système.** Le problème est ailleurs.

---

## 2. Preuve n°1 — ce que coûte l'absence de routine

Le compte rendu de meeting créé **ce matin à 9h01** s'intitule *« Call Huissier / URSSAF »*.
Il décrit une **contrainte de 1 063,67 € portant sur 2022-2024**, à régler rapidement, avec une
référence de paiement et une preuve à transmettre.

Une contrainte signifiée par huissier est le bout de la chaîne : elle suppose des échéances
passées sans être traitées, puis des relances restées sans réponse.

**C'est exactement le risque dont tu parles**, et il ne relève pas de l'hypothèse. Les projets
d'administration existants racontent d'ailleurs la même histoire :

| Projet | Statut | Dernière modification |
|---|---|---|
| **Régularisation TVA** | Done | déc. 2025 — *le nom même dit qu'il a fallu rattraper* |
| Bilan 2023, Bilan 2024 | Done | déc. 2025 |
| **Bilan 2025 (IS + comptes annuels)** | **Planning** depuis le 03/04 | **22 avril — rien depuis 3 mois** |
| Portail Admin & Finance | Planning, sans date | avril |

Tout l'administratif est traité **en projet ponctuel créé après coup**, jamais en routine qui
anticipe. C'est le mécanisme qu'il faut inverser.

---

## 3. Le partage entre Chloé et Pierre-Armand — ce que disent les données

### Sur les projets

| | Chloé | Pierre-Armand |
|---|---|---|
| Projets détenus seul·e | ~17 (design system, site, veille, marque, portails, bilans) | ~22 (les 19 *Production parcours*, tech Learning App) |
| **Projets à deux** | **5 seulement** | Site Internet V1 · Notion pour OF · Régularisation TVA · Bilan 2024 · Bilan 2023 |

Les deux périmètres se touchent à peine. Ce n'est pas anormal pour une répartition
conception / commercial, mais cela veut dire qu'**aucun des deux n'a de vue sur ce que fait
l'autre** sans aller la chercher.

### Sur les meetings — le point le plus net

Les cinq derniers comptes rendus de fond sont **détenus et suivis par Pierre-Armand seul**.
Chloé n'apparaît comme participante que sur un seul (AFDAS Storyboard).

Or ces réunions contiennent de la matière décisive :

- **Pierreval** — arbitrage Copilot / Claude pour 450-500 collaborateurs, investissement évoqué
  entre 100 k€ et 600 k€, déploiement sur 12 mois.
- **ECM / CES Campus** — Prompt Book de 30-40 prompts + agent EDRACT sur mesure (2 500 €) pour
  ~300 formateurs indépendants, avec une piste d'intégration à une offre d'accueil à 99 €.
- **AFDAS** — livrables datés : 7 vidéos avant fin août, informations à fournir avant le 24 juillet.

**C'est du pipeline commercial réel, et il ne vit que dans des comptes rendus.**

### Le défaut structurel

Sur **tous** les comptes rendus consultés, les relations `Tasks`, `Projects` et `Decision Log`
sont **vides**. Les actions extraites par le résumé automatique ne deviennent jamais des tâches,
ne se rattachent à aucun projet, n'alimentent aucun journal de décision.

Le lien existe dans le schéma. Personne ne le remplit.

---

## 4. Six agents conçus, aucun activé

L'index contient six agents en priorité **P0**, spécifiés les 24 et 28 avril, tous en
**« Not tested »** et au statut *Template* — donc jamais mis en service.

| Agent | Déclencheur prévu | Ce qu'il devait faire |
|---|---|---|
| **Meeting Actions Agent** | Mixte | Extraire décisions et actions des meetings, **créer les Tasks liées** |
| **Project Health Agent** | Hebdomadaire | Revue de santé : actions suivantes, dates, projets à risque |
| **Workspace Lifecycle Clean** | Hebdomadaire | Archivage selon les règles documentées |
| **Docs Hygiene Agent** | Mixte | Type, domaines, URL, relations critiques |
| **Database Audit Agent** | Mixte | Audit des bases : propriétés, vues, gabarits |
| **Area Portal Audit Agent** | Manuel | Audit des portails de domaine |

**Le premier de cette liste résout exactement le défaut du §3.** Il a été écrit il y a trois
mois et n'a jamais tourné.

Onze autres agents sont marqués *Active* (Admin & Finance, Weekly Report, Sales, Marketing, CX,
Product, Triage…) mais **sans Mode, ni Trigger, ni Test status renseignés** — ce sont
vraisemblablement des assistants conversationnels, pas des automatisations déclenchées.

Le reste, une douzaine d'entrées de septembre 2025 (Startup Guide, Personal Coach, Diplomatic,
Creative…), sont les gabarits livrés avec Notion. Du bruit à archiver.

---

## 5. Proposition — la routine des échéances

> ⚠️ **Les dates et le régime exact relèvent de votre comptable.** Ce qui suit propose une
> *structure de rappel*, pas un calendrier fiscal. Faites confirmer la périodicité TVA (mensuelle
> ou trimestrielle), les acomptes d'IS et la date de clôture avant de figer quoi que ce soit.

### Le principe

Une base **Échéances** dédiée, distincte de Tasks, avec pour chaque ligne : intitulé, périodicité,
date d'échéance, **date d'alerte** (anticipée), responsable, statut, pièce justificative.

Ce qui change par rapport à aujourd'hui : l'échéance existe **avant** de tomber, et quelqu'un est
nommé dessus.

### Ce qu'elle contiendrait

| Nature | Périodicité | À confirmer avec le comptable |
|---|---|---|
| Déclaration et paiement TVA | mensuelle ou trimestrielle | le régime applicable à TLS |
| Cotisations URSSAF | selon statut des dirigeants | ← **le sujet de la contrainte en cours** |
| Acomptes d'impôt sur les sociétés | trimestriels | montants et échéancier |
| Liasse fiscale et comptes annuels | annuelle | date de clôture et délai de dépôt |
| CFE | annuelle | — |
| Assurances, abonnements structurants | annuelle | renouvellements et préavis |

### L'automatisation qui va avec

L'index d'agents prévoit déjà un déclencheur **« Monthly schedule »**. Un agent
*Échéances* branché dessus, qui parcourt la base et signale ce qui tombe dans les 30 jours,
suffit. Ce n'est pas un développement : c'est une entrée à créer dans un cadre qui existe.

---

## 6. Plan d'action

Ordonné par rapport valeur / effort. Les trois premiers ne demandent aucune construction.

| # | Action | Pourquoi maintenant | Effort |
|---|---|---|---|
| 1 | **Activer le Meeting Actions Agent** | Répare le défaut le plus coûteux : les actions de réunion qui n'arrivent nulle part. Déjà spécifié. | tester puis activer |
| 2 | **Créer la base Échéances + agent mensuel** | L'URSSAF en cours montre le coût de son absence. | ~1 h + comptable |
| 3 | **Activer le Project Health Agent** | 19 projets *parcours* sont en « Planning » avec des dates de début déjà passées. Personne ne le voit. | tester puis activer |
| 4 | **Un point hebdomadaire partagé** | Le vrai remède au §3. Sans rituel, aucun agent ne comble l'écart entre vos deux périmètres. | décision, pas outil |
| 5 | **Purger l'index d'agents** | 12 gabarits Notion inutilisés brouillent la lecture. | 15 min |
| 6 | **Trier les 147 tâches ouvertes** | Un arriéré de cette taille à deux n'est plus un plan, c'est une archive. | 1 h |
| 7 | **Rattacher les meetings clients aux projets** | Pierreval, ECM et AFDAS sont du pipeline réel qui ne vit que dans des comptes rendus. | continu |

---

## 7. Ce que cette exploration n'a pas couvert

- La base **Skills** reliée à l'index d'agents — elle recoupe sans doute la roadmap de skills de
  la cartographie, à vérifier avant d'écrire quoi que ce soit.
- Le contenu des onze agents *Active* : impossible de dire ce qu'ils font réellement sans ouvrir
  chacun.
- Les bases **Docs**, **Communications**, **Ressources**, **Parcours**, **Deals**.
- Les 147 tâches ouvertes, vues seulement par leur nombre.
- Trois enregistrements de meeting vides du 10 juillet, à supprimer.

---

## 8. Le CRM — conception excellente, données abandonnées

*Ajouté le 2026-07-23 après exploration du Master Vault.*

### Ce qui a été construit

La base **Deals** est de qualité professionnelle. Elle contient déjà tout ce qu'un CRM sérieux
demande :

- un pipeline en 8 étapes — Nouveau lead → Qualifié → Découverte → Diagnostic → Proposition
  envoyée → Négociation → Closed Won / Lost ;
- une formule **« Jours dans le stage »** qui mesure la stagnation ;
- une **« Date prochaine relance »** avec rappel automatique à 9 h ;
- un **« Montant pondéré »** par probabilité de closing ;
- une **« Last interaction »** calculée comme le maximum entre dernier meeting et dernière
  communication ;
- une **« Raison de perte »** et des **sources d'acquisition** typées.

Sept bases forment l'ensemble : Deals, Entreprises, Contacts, Incoming Leads, Communications,
Devis, Factures Clients — plus **📦 Suivi des commandes** et un **Plan de Trésorerie 2026**.
Pennylane est la source comptable.

### Ce que disent les données

**Le pipeline ouvert représente environ 40 000 €. Toutes les dates de relance sont dépassées.**

| Deal | Étape | Montant | Relance prévue | Retard |
|---|---|---|---|---|
| Learning app sur mesure — Alvaraz | Diagnostic | 15 000 € | 20/04 | **3 mois** |
| Orange — formation IA niveau 2 | Diagnostic | 12 000 € | *aucune* | — |
| FFB Centre-Val de Loire | Négociation | 6 500 € | 09/04 | **3 mois et demi** |
| Accompagnement GRET | Négociation | 3 000 € | *aucune* | — |
| Journée consulting Pierreval | Négociation | 2 000 € | *aucune* | — |
| Webinaire GRET | Négociation | 1 200 € | *aucune* | — |
| Formation H-Cap | Diagnostic | 600 € | 09/04 | **3 mois et demi** |

La relance la plus récente de toute la base était due le **1er mai**. Nous sommes le 23 juillet.
Le champ « Dernière activité » est vide ou vieux de plusieurs mois presque partout.

Autre signal : **17 des 30 deals consultés sont en « Closed Lost »**, beaucoup avec une date de
relance passée et aucune raison de perte renseignée. Ces affaires n'ont pas été perdues — elles
ont été classées perdues faute de suivi.

### Le contre-exemple qui explique tout

**📦 Suivi des commandes, lui, est tenu à jour.** Montants, statuts, dates de facturation,
trimestre de paiement : AO AFDAS LOT 1 (20 000 €), FFB Nord (20 300 €), Maintenance C-Campus
(13 320 €), Qualiopi + Notion C-Campus (8 500 €)…

La différence n'est pas l'outil, elle est la nature de la donnée : **ce qui est facturé est
suivi, ce qui est seulement possible est abandonné.** C'est compréhensible à deux, et c'est
exactement ce qui coûte cher — la relance non faite est le revenu qui ne devient jamais une
commande.

### Ce qu'il faut en faire

Une seule vue suffirait à changer la donne : *deals ouverts dont la relance est dépassée ou
absente*, triée par montant. Les propriétés existent déjà, il n'y a rien à construire.
Couplée au déclencheur hebdomadaire de l'index d'agents, elle se rappellerait à vous toute seule.

---

## 9. La base Skills — 11 skills TLS déjà écrites

**Découverte qui change la roadmap de la cartographie.** La base Skills reliée à l'index
d'agents contient déjà onze skills rédigées les 30 mars et 21 avril :

| Skill existante | Ce qu'elle fait |
|---|---|
| **Note de réunion TLS** | Structure la note **et crée les Tasks datées pour chaque décision** |
| **Audit hebdo workspace TLS** | Chaque lundi : tâches en retard, meetings sans actions, projets sans next-action, « One Thing » par domaine |
| **Qualifier Deal → Client Project** | Deal gagné → projet client + dossier Drive + 4 tâches d'onboarding |
| **Créer un Project TLS** | Nommage, DoD, première action obligatoire |
| **Créer une Task TLS** | Nommage, domaine, relations |
| **Créer un Doc TLS** | Nommage, type, étape, relations |
| **Rédiger un brief contenu** | Entrée Content Calendar structurée |
| **Reporting mensuel OKR** | Scorecard OKR, projets terminés, risques par domaine |
| **Entreprises Autofill** · **Autofill Contacts** | Hygiène et enrichissement CRM |
| 🧪 **Template Skill TLS** | Le gabarit — seul à porter un statut, « Draft » |

**Aucune n'est marquée Active.** Même schéma que les agents : écrites, jamais mises en service.

Deux d'entre elles répondent directement aux problèmes relevés plus haut : *Note de réunion TLS*
comble le défaut du §3, *Audit hebdo workspace TLS* détecte exactement ce que le §2 laisse filer.

> **Conséquence pour la roadmap de skills** : avant d'écrire quoi que ce soit de nouveau, il faut
> d'abord activer ce qui existe. Voir la révision dans
> [`CARTOGRAPHIE-OUTILLAGE.md`](CARTOGRAPHIE-OUTILLAGE.md).

---

## Journal


**2026-07-23 (2)** — Exploration du Master Vault. **CRM** : conception professionnelle
(pipeline 8 étapes, stagnation, relances, montant pondéré) mais ~40 000 € de pipeline ouvert
avec **toutes les relances dépassées de 3 à 5 mois**. Contre-exemple : *Suivi des commandes* est
tenu à jour — ce qui est facturé est suivi, ce qui est possible est abandonné. **Base Skills** :
11 skills TLS déjà écrites, aucune active, dont deux qui répondent aux défauts des §2 et §3.

**2026-07-23** — Création. Exploration via le connecteur Notion : Projects (40), Tasks (257),
Meetings, Company Areas (7), AI Agents Index (32). Constat central : le système est bien conçu
et non activé. Six agents P0 spécifiés en avril n'ont jamais été testés, dont celui qui
transformerait les actions de réunion en tâches. Une contrainte URSSAF de 1 063,67 € portant sur
2022-2024 est apparue en réunion le matin même — illustration du coût de l'absence de routine.
