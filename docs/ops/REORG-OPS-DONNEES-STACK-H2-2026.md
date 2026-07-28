# Réorganisation Ops, Données & Stack — The Learning Society (H2 2026)

> **Nature :** plan opérationnel de la réorganisation des bases Notion, du CRM, de la synchronisation Pennylane et des dashboards.
> **Date :** 25 juillet 2026 · **Statut :** v1, exécutable par lots · **Usage :** interne.
> **Principe directeur non négociable :** *aucun chiffre ni process critique ne doit dépendre d'une saisie ou d'une maintenance à finir.* **Notion est alimenté par des flux, jamais par la discipline.**
> **Docs liés :** [`../product/STRATEGIE-REALIGNEMENT-H2-2026.md`](../product/STRATEGIE-REALIGNEMENT-H2-2026.md) · Registre des bases (Notion) · [`../marketing/FAITS-OFFRES.md`](../marketing/FAITS-OFFRES.md)

---

## 1. La carte de localisation — un artefact, un seul domicile

| Type d'artefact | Domicile (SSOT) | Le reste ne fait que **pointer** |
|---|---|---|
| **Bases structurées** (Deals, Entreprises, Contacts, Activities, Projects, Tasks, Meetings, Client projects) | **Notion** | vues + dashboards natifs (plan Business ✓) |
| **Argent** (devis, factures, paiements, TVA, tréso, prévisionnel) | **Pennylane** | Notion **lie** (ID/URL Pennylane sur le Deal), ne ressaisit jamais |
| **Docs de savoir** (SOP, stratégie, briefs, guidelines) | **Notion — base Docs** | (nettoyage en cours) |
| **Fichiers binaires** (PDF signés, livrables, assets clients, slides, vidéos, sources) | **Drive** — 1 dossier / client | Notion stocke le **lien** (propriété URL), **jamais le fichier** |
| **Devis / factures (PDF)** | **Pennylane** (généré) → archivé **auto dans Drive** | Notion lie |
| **Signature** (contrats/devis à signer) | **PandaDoc** → le signé va dans **Drive** + lié | (retire-able si usage = devis/e-sign only → Pennylane Essentiel le fait) |

**Mnémonique :** 🧠 **Notion = le cerveau** · 💶 **Pennylane = l'argent** · 📁 **Drive = les fichiers** · ✍️ **PandaDoc = la signature.**

---

## 2. ⭐ Comment alimenter & synchroniser Notion systématiquement (le cœur)

Le problème n'a jamais été « quel outil » mais « **la donnée n'entre pas toute seule** ». Réponse : trois familles de flux automatiques, moteur **n8n** (self-host) + **webhooks natifs Notion**.

### A. ENTRÉE — leads & contacts (sans saisie)
- **Notion Forms natif** : formulaire site → base **Leads/Deals** (création de page auto). Automatisation « page ajoutée » → set stage/owner/source/date. Zéro outil tiers.
- **Email entrant → Notion** : n8n surveille l'inbox commercial → crée/màj le **Contact + Deal** (dédup par email/domaine). Fin des leads perdus.
- **Networking/LinkedIn** : capture via un formulaire Notion dédié (ou import n8n).

### B. ARGENT — le sync clé, Pennylane → Notion (léger = fiable)
> L'ancien sync était « pas ouf » parce qu'il mirrorait **tout**. On ne synchronise que **4 champs de statut par deal**, clés par l'**ID Pennylane**.

1. **Deal gagné** (Notion) → webhook natif → n8n → **crée le devis Pennylane** + écrit sur le Deal : `pennylane_id`, `URL devis`. *(active enfin l'automatisation « Deal Won → devis » jamais implémentée.)*
2. **Sync des statuts** : n8n (webhook Pennylane, ou poll toutes les 6 h) met à jour sur le Deal Notion → `Devis signé ✓` · `Facturé ✓` · `Payé ✓` · `Montant`. **4 champs, rien d'autre.**
3. Les **agrégats** (CA / encaissé / prévisionnel) **ne sont PAS synchronisés** → vus dans Pennylane / Looker (cf. §4). Notion ne calcule pas la compta.

### C. ACTIVITÉ — meetings, delivery (sans saisie)
- **Google Calendar → Notion Meetings** (n8n) : chaque RDV loggé + lié au Deal/Contact. *(règle le « 56 % de meetings non typés ».)*
- **Deal gagné → Projet client + dossier Drive** (n8n) : crée le Client Project, le dossier Drive `/Clients/{Entreprise}/`, et écrit l'URL. *(active « Company → Drive » jamais implémentée → fin des propriétés `drive:` vides.)*

### D. Les alertes qui rattrapent les oublis (le « Pierre-resilient »)
n8n / automatisations Notion, notif Slack/email :
- devis **signé non facturé** > X j → alerte
- facture **impayée** > 30 j → **relance auto** (Pennylane Essentiel le fait nativement)
- **livré non facturé** → flag
- pièce manquante (BdC/contrat) → rappel

> **Le seul geste manuel restant = faire avancer un Deal d'une étape (1 clic)** — et même ça se déduit en partie (devis signé Pennylane → étape « Signé » auto). Tout le reste entre par les flux.

---

## 3. Verdict stack (validé par votre test Axonaut/Sellsy)

**Intégrer, ne pas sprawl. Consolider la finance dans Pennylane. Pas d'all-in-one.**

| Décision | Choix | Pourquoi |
|---|---|---|
| **Suite tout-en-un** (Axonaut/Sellsy) | ❌ **Écartée** | Testées → UX/prix/migration trop lourde ; migrer la compta hors Pennylane = régression fiscale (votre expert-comptable y travaille) |
| **Finance / admin** | ✅ **Pennylane Essentiel (~24 €/mo)** | débloque **relances auto + prévisionnel 36 mois + notes de frais + dashboards** — attaque « l'admin, le point faible ». Déjà **Plateforme Agréée** (conforme e-invoicing sept. 2026) |
| **CRM / pipeline** | ✅ **Notion** (que vous aimez) + **1 flow n8n de relance** | flexibilité gardée, hygiène automatisée. Fallback si ça re-pourrit : **Folk (~11 $) / Pipedrive (~14 $)**, glués n8n |
| **Signature** | PandaDoc → **retire-able** si usage = devis/e-sign (Pennylane le fait) | 1 outil de moins |
| **Banque/paiement** | Garder Stripe + GoCardless | pas de migration bancaire |
| **Zoho / Qonto** | ❌ | Zoho = mauvais fit fiscal FR ; Qonto seulement si changement de banque |

---

## 4. Dashboards — où vit chaque pilotage

> Règle qui minimise la maintenance : **on chart là où la donnée vit déjà.**

- **Pipeline / CRM → charts Notion natifs** (données déjà dans Notion) : pipeline par étape, deals/mois, win-rate, volume d'activité. **Zéro sync, live.** Avec le plan Business → **vue Dashboard multi-widgets** (filtres globaux).
- **Finance → Looker Studio alimenté depuis Pennylane, embarqué en iframe** dans une page Notion « Finances » : CA / facturé / encaissé / **prévisionnel** / impayés. **Pas de sync Notion**, Pennylane reste SSOT. *(Rappel : les charts Notion ne lisent PAS Pennylane en live — d'où l'embed.)*
- **Delivery / capacité → charts Notion** sur Projects/Tasks (une fois les Tasks re-datées, cf. §6).

**Automatisations = Notion webhook (trigger) → n8n → Pennylane (écriture).** Le webhook natif Notion est POST-only, corps limité → n8n reste nécessaire pour le contrat API Pennylane.

---

## 5. État réel des 11 bases (audit live juillet 2026)

| Base | Type | Problèmes clés vérifiés | Prio |
|---|---|---|---|
| **Deals** | SSOT, données trouées | **8/27 Won sans montant** (CA sous-estimé) · 21 Lost sans raison · 0 relance planifiée · pas de date de clôture · 3 espaces finaux | **P0** |
| **Entreprises** | dette de modèle | `Status` en multi_select (mélange stade + type) → 9 fiches contradictoires · Lead Source vide 56 % · 1 doublon · pas de « prochaine relance » | **P0** |
| **Tasks** | SSOT vivant | **90 % des tâches actives sans échéance** → dashboards Today/Late trompeurs · 17 non assignées · « Paused » mal groupée · 87 Done à archiver | **P0** |
| **Meetings** | 54 % de lignes sans propriétés | ⚠️ **CORRIGÉ 25/07** : les **358 lignes « (no name) » ne sont PAS vides** — ce sont de **vraies AI meeting notes** (résumés + action items + transcripts, dont l'historique du projet Orange), importées le 10/07 depuis l'espace privé, dont **seules les propriétés** (`Name`, `Status`, `Event time`, `Relation`) n'ont pas suivi. **NE PAS PURGER** → **backfill** `Name` (= titre du bloc meeting-note) + `Status`, puis rattachements à valider | **P0** (backfill, **pas purge**) |
| **Client projects** | mal alimenté | **Deals lié 0/23** (l'auto « Gagné » ne repose pas le back-link) · 3 doublons « (1) » · 6 espaces finaux | **P0** (back-link) |
| **Contacts** | propre | 5 doublons stricts · vue « À compléter » filtrée ET au lieu de OU · aucun axe de segmentation | **P1** |
| **Activities** | log opérationnel | 2 espaces finaux sur props filtrantes · statut legacy · relations mortes (Inbox Leads 0/72) | **P1** |
| **Projects** | SSOT sain | 1 doublon · 8 projets actifs sans Tasks · 9 sans dates · « On hold » rangé dans « Complete » | **P1** |
| **OKR Tracker** | stratégique + appendice mort | couche opé Q1-Q2 abandonnée (0 terminé) · 2 systèmes OKR non reliés | **P1** |
| **Docs** | SSOT sain | 12 docs sans stage · 2 orphelins · 1 doublon de titre | **P2** |
| **Company Areas** | ✅ Done | portails Area — à standardiser (dashboards par portail) | — |

### Les 4 pathologies transverses (à traiter en masse, pas base par base)
- **A. Espaces finaux dans les noms de propriétés** = **bug d'automatisation silencieux** (Deals ×3, Entreprises ×3, Client projects ×6, Communications ×2, Tasks ×1…). Toute formule/rollup/filtre/API échoue muettement. → **auditer les références → renommer par API → re-tester les vues.** Prioriser les propriétés *filtrantes* (`Source `, `Statut `, `Areas `). **À faire AVANT de câbler toute automatisation.**
- **B. Options de statut mal groupées** (« On hold »/« Paused »/« Cancelled » dans le groupe *Complete*) → faussent boards et rollups. ~10 min en UI.
- **C. Vues à corriger** : bugs fonctionnels (Contacts « À compléter » ET→OU ; filtres legacy morts) puis cruft (vues/tris dupliqués).
- **D. Purges de masse (auto-API après feu vert)** : Meetings 358 fantômes + 101 Done pré-2026 · Tasks 87 Done · Docs 12 stage vide → « Triage ».

---

## 6. Décisions métier à trancher (~15 min, un seul batch)

> Le doublon « Company 102 vs Entreprises 61 » est **levé** (aucune base « Company » vivante en workspace — migrée/archivée). Ne pas rouvrir.

1. Fusionner **« strada education »** (Entreprises) — quelle fiche maître ?
2. Fusionner les **5 doublons Contacts** — re-rattacher les relations avant suppression.
3. Fusionner les **3 « (1) » Client projects** (IDEX, DAHER, Orange).
4. Fusionner **« Portail »** (Projects).
5. **Modèle de statut Entreprises** : valider `Stage` (single-select) + `Relationship type` (multi_select) + trancher les 9 fiches contradictoires.
6. **OKR Q1-Q2** : archiver proprement OU relancer un cycle daté (pas de 3ᵉ voie).
7. **Projet IDEX échu** (fin 31/05, toujours In progress) : replanifier ou clôturer.

> Le reste (raisons de perte, sources, dates, assignations) = **routine de revue hebdo**, pas un chantier one-shot.

---

## 7. Séquence bornée (par lots — ce qui FINIT)

| Lot | Contenu | Nature |
|---|---|---|
| **0. Sécurité** | Sortir SIRET/logins dans un vault Notion à accès restreint | 30 min, manuel |
| **1. Cash immédiat** | Facturer le livré non facturé · Pennylane → **Essentiel** (relances auto) | PAD, cette semaine |
| **2. Hygiène schéma** | Renommer les propriétés à espace final (après audit des références) · regrouper les statuts · purges de masse | auto-API + UI |
| **3. Décisions métier** | Le batch du §6 (~15 min) | duo |
| **4. Flux d'alimentation** | Notion Forms · email→Notion · Calendar→Meetings · Deal gagné→Projet+Drive | n8n |
| **5. Sync argent** | Deal gagné→devis Pennylane + les **4 champs de statut** Pennylane→Notion · alertes (impayé/livré-non-facturé) | n8n + Pennylane Essentiel |
| **6. Dashboards** | Charts Notion natifs (pipeline/delivery) · Looker embed (finance) | Notion + Looker |
| **7. Cadence** | Rituel hebdo de pilotage (les dashboards) + revue de la donnée manquante | duo |

**Chaque euro de temps va dans un flux qui tourne, pas dans de la doc.** Le succès se mesure à : *« la donnée entre-t-elle sans que quiconque y pense ? »*

---

## 8. Risques & à vérifier
- **Renommage des propriétés à espace final** : jamais en aveugle — auditer d'abord boutons/formules/rollups/filtres qui les référencent.
- **Sync Pennylane** : le garder **léger** (4 champs) ; ne pas re-tomber dans le mirror complet qui a échoué.
- **Webhook natif Notion → API externe** : vérifier dans votre espace que les **en-têtes d'auth custom** sont supportés (sinon tout passe par n8n).
- **PandaDoc** : confirmer son périmètre réel avant de le retirer.
- **Plan Notion Business** : confirme la vue Dashboard multi-widgets (OK d'après toi).

---

*Fin — v1, 25 juillet 2026. Exécutable par lots, à valider en duo.*
