# Inventaire du Marketing dans Notion — relevé de première main

**Fait le 2026-09-10** via l'API Notion : lecture des pages, puis **comptage SQL réel**
des lignes de chaque source de données. Aucun chiffre n'est repris d'un relevé antérieur.

> **À qui ça sert.** Chloé fait les suppressions à la main. Ce document dit quoi supprimer,
> quoi archiver, quoi ne pas toucher — et pourquoi, avec les identifiants.

---

## Ce que le relevé antérieur disait de faux

Le [document 10](https://app.notion.com/p/3d2cdd696db6819c8f04edf9cd16236f) classe
`Pipeline éditorial` en « 0 item, une seule propriété — **coquille** », et **Q39** acte la
« suppression directe » des 18 fausses bases des dashboards.

**C'est inexact, et le suivre casserait les tableaux de bord.** Ces objets ne sont pas des
bases vides isolées : ce sont des **bases hôtes** qui portent
(a) une source propre vide **et** (b) des **vues liées sur les vraies bases**.

Vérifié sur `Pipeline éditorial (±30 jours)` : deux sources — `Pipeline éditorial` (1 seule
propriété, 0 ligne) **et** `Content Calendar` (~45 propriétés) — et ses deux vues,
`Content Board` et `Calendrier ±30j`, **pointent sur Content Calendar**. Elles fonctionnent.

Le bon geste n'est donc pas « supprimer la base » mais **« retirer la source propre vide et
garder les vues »** — une manipulation d'interface, que l'API ne fait pas proprement.

---

## 1. Ce qui porte de la donnée — ne pas supprimer

| Base | ID | Mesuré | Agent qui en dépend |
|---|---|---|---|
| **Content Calendar** | [`1d480309…`](https://app.notion.com/p/1d4803093ecb4b129be8d99a7d8d7f65) | **20 lignes, dont 11 publiées.** Créées du 17/10/2025 au 12/01/2026 ; dernière publication prévue 17/12/2025 | **aucun** |
| **Campaigns** | [`09027a2d…`](https://app.notion.com/p/09027a2dd15748c58070d80775005f99) | **26 lignes créées en 4 jours** (17→21/11/2025), jamais retouchées depuis | **aucun** |

`Content Calendar` est **le seul historique éditorial de TLS** : 11 publications avec URL,
UTM, persona et étape de funnel. À archiver si l'on veut, jamais à supprimer.

`Campaigns` porte la marque d'un seeding de gabarit — 26 lignes en quatre jours, plus rien
ensuite. Suppression défendable ; **Q21** dit toutefois que les contenus marketing ne
s'archivent jamais, donc archivage plutôt que suppression.

---

## 2. Ce qui est vide — vérifié ligne à ligne

### 2.1 Une vraie base vide

| Base | ID | Lignes | Conséquence |
|---|---|---|---|
| **Mots-clés SEO** | [`45754f4d…`](https://app.notion.com/p/45754f4d4c144968a18d0d12eb0bb602) | **0** | La relation `Mots-clés` de Content Calendar disparaîtra. Aucune donnée perdue — la base est vide |

### 2.2 Les sources propres des bases hôtes — 17 mesurées, 17 à zéro

**Dashboard Editorial** ([`5b967e22…`](https://app.notion.com/p/5b967e22568441c9b83ae9d137c92428)) — 9 blocs :
`Pipeline éditorial (±30 j)` · `Calendrier — À publier (30j)` · `TOFU — Social` ·
`Leads 30j par canal` · `SEO & Persona` · `UTM — Contrôle (std)` · `Performance par format` ·
`Funnel par étape` · `Templates`

**Social** ([`34c2a082…`](https://app.notion.com/p/34c2a082cdda48b69c0c278ac2274552), inchangée depuis le 21/11/2025) — 3 blocs résolus
**Emailing** ([`516f7f79…`](https://app.notion.com/p/516f7f7984fb4d96ae62f7039f52e024), 03/12/2025) — 2 blocs résolus
**Attribution** ([`36593137…`](https://app.notion.com/p/365931376d3a4a1ba87fe4fe19e8379f), 03/12/2025) — 3 blocs résolus

> **Le motif de duplication, mesuré.** `Social` porte ses **propres** collections
> « TOFU — Social » et « Performance par format » — **différentes** de celles du Dashboard
> Editorial. `Attribution` recrée à son tour « Leads par canal », « Funnel par étape » et
> « UTM — Contrôle ». **Le même tableau a été refait en base sur chaque page** au lieu
> d'être une vue. C'est la mécanique qui produit dix bases pour un concept.

### 2.3 Un bloc cassé

`Emailing / Nurturing` ([`0349a9fe…`](https://app.notion.com/p/0349a9fe0da84d52b5aa573a9f8877b8)) pointe sur
une source **qui n'existe plus** (`collection://deb6436d…` → *data source not found*).
Bloc mort, à retirer sans hésiter.

---

## 3. ContentOS 2.0 — absent de tous les relevés antérieurs

[`084cdd69…`](https://app.notion.com/p/084cdd696db6822cb8a281e02b138d28) — **~30 pages et 4 bases**,
importées en bloc le **03/02/2026**, avec la donnée de démo du template encore en place :

- **Sponsors** : hostinger · Wix · Skillshare · Gumroad · Notion
- **Plateformes** : TikTok · Instagram · Facebook · Twitter · YouTube
- **Contenus** : « How to start selling digital products in 2023 » · « Best Notion Mockups » ·
  « how to use second brain » · « 5 skill you've to learn in 2023 » · « Student Dashboard Giveaway »

C'est un template de *creator economy* B2C. Rien n'y concerne TLS, le SBO ni le B2B.
Ses 4 bases : `Content OS 2.0 Ideas` · `ContentOS 2.0 Platforms` ·
`ContentOS 2.0 creating process` · `Content OS 2.0 sponsorship`.

**Relève de Q40** — *« Templates importés : cas par cas »*, non tranché. C'est le plus gros
gisement de suppression du périmètre marketing, et le moins risqué.

---

## 4. Ce que dit l'agentique — et ça change tout

D'après la [matrice agent × base](https://app.notion.com/p/3d2cdd696db681d59f13eb321affbcb6)
(dépouillement des 37 fiches, 05/09) :

**Aucun des 37 agents ne lit ni n'écrit dans une base marketing existante.**
Les fiches `MKTG-01` à `07` écrivent dans une base cible **`Contenus marketing`** qui
**n'existe pas encore**, sous « 10 noms différents » selon les fiches, et dont la matrice
dit : `🔴 en arbitrage — document 10`.

**Conséquence directe : archiver ou supprimer les bases marketing actuelles ne casse aucun agent.**

Deux bases à **ne pas toucher**, elles, parce qu'un agent en dépend et qu'elles existent :

| Base | Agent | État matrice |
|---|---|---|
| **Veille** | `TASK-01` (lecture, brief matinal) | 🟢 existe |
| **Réunions & CR** (`Meetings`) | `MEET-01`, `PROJ-01`, `CRM-03` | 🟢 existe |

Et le vrai goulot marketing n'est pas les bases de contenu : c'est la **Knowledge Base**,
qui bloque **12 agents** dont les sept `MKTG`.

---

## 5. Ce qu'il reste à ouvrir dans l'interface

Neuf blocs de base n'exposent pas leur source dans l'API — impossible de les compter d'ici.
Tous sur des pages mortes depuis fin 2025, donc probablement du même motif, **mais je ne
l'affirme pas** :

- `Suivi Campagnes` ([`b296aa67…`](https://app.notion.com/p/b296aa672d8c4bc386a2ef6a7078dc41), 21/10/2025) — 4 blocs
- `Social` — 1 bloc · `Emailing` — 4 blocs

---

## 6. L'ordre que je recommande

1. **ContentOS 2.0** — 30 pages, 4 bases, zéro lien avec TLS. Le plus gros gain, le moins de risque.
2. **Le bloc cassé** d'Emailing.
3. **`Mots-clés SEO`** — vide, vérifié.
4. **Archiver `Campaigns`** — seeding jamais utilisé.
5. **Archiver `Content Calendar`** — *seulement si* vous acceptez de ranger l'historique des
   11 publications. Sinon le laisser.
6. **Les pages `Social`, `Emailing`, `Attribution`, `Suivi Campagnes`** — mortes depuis fin 2025
   et entièrement redondantes avec `Dashboard Editorial`. Les supprimer emporte leurs blocs vides.
7. **`Dashboard Editorial`** — **ne pas supprimer**. Retirer les 9 sources propres vides à la
   main, garder les vues sur Content Calendar.

**Ce qui ne peut pas se faire maintenant** : créer `Contenus marketing`, trancher une base ou
cinq, fixer les statuts. Cela dépend de **D1–D10**, tous ⬜ non décidés.
