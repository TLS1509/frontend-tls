# Carte du système TLS — outils, bases, process

> **Objet :** voir en un écran **où vit quoi**, **ce qui circule tout seul** et **ce qui dépend encore d'une main humaine**.
> **Date :** 25 juillet 2026 · **Statut :** v1 · **Usage :** interne.
> Les schémas sont en **Mermaid** : lisibles ici, et collables tels quels dans Notion (bloc `/code` → langage *Mermaid*).
> **Docs liés :** [`REORG-OPS-DONNEES-STACK-H2-2026.md`](REORG-OPS-DONNEES-STACK-H2-2026.md) · [`GABARIT-PORTAILS-AREA-NOTION.md`](GABARIT-PORTAILS-AREA-NOTION.md)

**Légende commune :** 🟩 automatique · 🟥 manuel (dépend de la discipline) · 🟦 outil/source de vérité

---

## 1. Vue d'ensemble — qui possède quoi

Un artefact, un seul domicile. Le reste **pointe**, ne recopie jamais.

```mermaid
flowchart TB
    subgraph BRAIN["🧠 NOTION — le cerveau"]
        N1["CRM : Deals · Entreprises · Contacts · Communications"]
        N2["Delivery : Client projects · Projects · Tasks · Meetings"]
        N3["Savoir : Docs · Handbook · Registre des bases"]
        N4["Pilotage : Company Areas (7 portails) · OKR"]
    end

    subgraph MONEY["💶 PENNYLANE — l'argent"]
        P1["Devis · Factures · Avoirs"]
        P2["Banque · Encaissements · TVA"]
        P3["Trésorerie · Prévisionnel 36 mois"]
    end

    subgraph FILES["📁 DRIVE — les fichiers"]
        D1["/Clients/{Entreprise}/ — livrables, PDF signés, assets"]
    end

    SIGN["✍️ PANDADOC — signature"]
    PAY["💳 Stripe · GoCardless — encaissement"]
    GLUE["⚙️ n8n — la glue"]
    VIZ["📊 Looker Studio — dashboards finance"]

    BRAIN -->|"ID + URL, jamais le montant"| MONEY
    MONEY -->|"4 champs de statut"| BRAIN
    BRAIN -->|"lien URL, jamais le fichier"| FILES
    MONEY -->|"PDF archivé auto"| FILES
    SIGN -->|"doc signé"| FILES
    PAY --> MONEY
    GLUE -.->|orchestre| BRAIN
    GLUE -.->|orchestre| MONEY
    MONEY --> VIZ
    VIZ -.->|"iframe embed"| BRAIN
```

**La frontière à ne jamais franchir :**

| | Notion | Pennylane |
|---|---|---|
| Pilote | **l'ENGAGEMENT** (devis en cours, commande, livraison) | **l'ARGENT** (facturé, encaissé, tréso) |
| Les € y sont | **déclaratifs** — libellé obligatoire | **réels** |
| Fait foi pour | le pipeline commercial | la compta, le CA, le cash |

> ⚠️ **Point à trancher (§5)** : il existe aussi des bases Notion **Devis** et **Factures Clients** (reliées aux Deals). Elles doublonnent Pennylane.

---

## 2. Arborescence Notion

```mermaid
flowchart LR
    MV["🗄️ Master Vault"]

    MV --> AREAS["🏢 Company Areas — 7 portails"]
    MV --> SSOT["📚 Bases SSOT"]
    MV --> REG["🗃️ Registre des bases<br/>(méta-base d'audit)"]

    AREAS --> A1["Sales ✅ au gabarit"]
    AREAS --> A2["Admin & Finance ⚠️ P0 secrets"]
    AREAS --> A3["CX · Operations · Marketing<br/>Product · Learning App"]

    SSOT --> S1["💼 Sales : Deals · Entreprises · Contacts<br/>Communications · Inbox Leads"]
    SSOT --> S2["⚡ Exécution : Projects · Tasks · Meetings"]
    SSOT --> S3["🤝 CX : Client projects"]
    SSOT --> S4["📄 Knowledge : Docs"]
    SSOT --> S5["💶 Finance : Suivi des commandes<br/>Comptabilité · Plan de Trésorerie"]
    SSOT --> S6["🎯 Ops : OKR Tracker"]

    A1 -.->|"vues liées filtrées<br/>Company Area = Sales"| SSOT
    A2 -.-> SSOT
    A3 -.-> SSOT
```

> ✅ **Règle confirmée :** une page Area ne contient **que des vues liées** des bases SSOT, filtrées sur `Company Area`. Elle n'héberge jamais sa propre base.
> ⚠️ L'API Notion affiche ces vues liées comme des « bases enfants » avec un ID propre — **ce n'est pas un doublon**.

---

## 3. Le flux commercial bout-en-bout — où ça casse aujourd'hui

```mermaid
flowchart LR
    L["Lead entrant"] --> D["Deal créé"]
    D --> Q["Devis envoyé"]
    Q --> W["Deal gagné"]
    W --> PR["Projet client"]
    PR --> DL["Livré"]
    DL --> F["Facturé"]
    F --> E["Encaissé"]

    style L fill:#ffcccc
    style D fill:#ffcccc
    style Q fill:#ccffcc
    style W fill:#ffcccc
    style PR fill:#ffcccc
    style DL fill:#ffcccc
    style F fill:#ffcccc
    style E fill:#ccffcc
```

**État réel, étape par étape :**

| Étape | Aujourd'hui | Symptôme mesuré | Cible |
|---|---|---|---|
| Lead entrant | 🟥 saisie manuelle | leads perdus | 🟩 Notion Forms + email→n8n |
| Deal créé | 🟥 manuel | **56 % Lead Source vide** | 🟩 source héritée du canal |
| Devis | 🟩 Pennylane | — | 🟩 + lien auto sur le Deal |
| **Deal gagné** | 🟥 bouton sans effet | `pennylane_id` et `drive:` **vides** · **Client projects ↔ Deals 0/23** | 🟩 → devis + dossier Drive + projet |
| Livraison | 🟥 statut à la main | **17/23 projets sans date de fin** | 🟩 dérivé des Tasks |
| **Facturé** | 🟥 dépend de la mémoire | **~35 K€ facturé sur ~117 K€ commandé** | 🟩 alerte « livré non facturé » |
| Encaissé | 🟩 Pennylane (banque) | ~53 K€ | 🟩 + relance auto (Essentiel) |

> 🔴 **Le point de rupture n°1 est « Deal gagné »** : rien ne se déclenche. Tout ce qui suit repart d'une saisie, donc se perd. **Une seule automatisation répare 4 symptômes.**

---

## 4. Cible — les flux qui alimentent Notion tout seul

```mermaid
flowchart TB
    subgraph IN["🟩 ENTRÉE — la donnée arrive seule"]
        F1["Notion Forms → Leads"]
        F2["Email commercial → n8n → Contact + Deal"]
        F3["Google Calendar → Meetings (lié Deal)"]
    end

    subgraph CORE["🧠 NOTION CRM"]
        DEAL["Deal"]
    end

    subgraph OUT["🟩 SORTIE — le geste déclenche la chaîne"]
        O1["Deal gagné → devis Pennylane"]
        O2["Deal gagné → dossier Drive"]
        O3["Deal gagné → Client project"]
    end

    subgraph BACK["🟩 RETOUR — 4 champs seulement"]
        B1["Devis signé ✓"]
        B2["Facturé ✓"]
        B3["Payé ✓"]
        B4["Montant"]
    end

    subgraph ALERT["🔔 ALERTES — rattrapent les oublis"]
        AL1["Devis signé non facturé"]
        AL2["Livré non facturé"]
        AL3["Facture impayée > 30 j"]
        AL4["Deal sans relance planifiée"]
    end

    IN --> DEAL
    DEAL -->|"webhook natif Notion"| O1
    DEAL --> O2
    DEAL --> O3
    O1 --> PENNY["💶 Pennylane"]
    PENNY -->|"n8n · poll 6 h"| BACK
    BACK --> DEAL
    PENNY --> ALERT
    DEAL --> ALERT
    ALERT -->|Slack / mail| HUMAN["👤 CMT / PAD"]
```

**Le seul geste manuel qui reste : faire avancer un Deal d'une étape (1 clic).** Et même celui-là se déduit en partie (devis signé côté Pennylane → étape « Signé »).

**Pourquoi 4 champs et pas tout :** l'ancien sync Pennylane→Notion échouait parce qu'il mirrorait l'intégralité de la compta. Léger = fiable. Les agrégats (CA, encaissé, prévisionnel) ne transitent **jamais** — ils se lisent dans Looker/Pennylane.

---

## 5. Les zones grises à trancher

| # | Question | Enjeu | Reco |
|---|---|---|---|
| 1 | **Bases Notion « Devis » et « Factures Clients »** (reliées aux Deals) vs Pennylane | deux vérités sur l'argent | **Les vider de leur rôle** : garder au plus un miroir en lecture (n° + statut + lien), jamais un montant saisi |
| 2 | **« Suivi des commandes »** (carnet) vs Pennylane | doublon partiel | Le carnet devient le **book commercial** (engagement) ; l'argent réel = Pennylane |
| 3 | **Qui facture** : TLS en direct vs **C-Campus** (référencé achats grands comptes) | fausse toute lecture « non facturé » | Ajouter une propriété **« Facturé par »** sur le Deal |
| 4 | Bases orphelines `Untitled` (Operations) · `Mon travail` (Product) | bruit | Supprimer après vérification |
| 5 | **PandaDoc** | redondant si usage = devis/e-sign | Pennylane Essentiel signe les devis → retirer |

---

## 6. Ce que la carte dit en une phrase

> **Les outils sont bons, les bases sont saines, la stratégie tient. Ce qui manque, ce sont les 6 câbles entre les boîtes** — et le premier (« Deal gagné → devis + dossier + projet ») répare à lui seul la moitié des symptômes.

---

*Fin — v1, 25 juillet 2026. Schémas Mermaid réutilisables dans Notion.*
