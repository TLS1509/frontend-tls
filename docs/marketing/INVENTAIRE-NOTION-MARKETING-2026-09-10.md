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

---

## 7. Ce qui a réellement été exécuté — 10/09/2026

⚠️ **La section 6 ci-dessus est un état antérieur.** Elle recommandait de *ne pas* supprimer
`Dashboard Editorial` et de ne créer `Contenus marketing` qu'une fois D1–D10 tranchés. La
consigne du 10/09 a levé les deux : purge complète, calendrier éditorial et suivi des
campagnes inclus, et une surface de capture tout de suite pour pouvoir déposer une idée
d'article d'ici octobre. Ce qui suit fait foi.

### Mis en scène pour suppression

Page **`🗑 À purger — 10/09/2026`** ([`3d7cdd69…`](https://app.notion.com/p/3d7cdd696db681de95d7e81025b922de)),
sous Marketing. Sept objets y ont été déplacés :

`Dashboard Editorial` · `Suivi Campagnes` · `Emailing` · `Attribution` · `Content Calendar`
· `Campaigns` · `Mots-clés SEO`

`Social` et `ContentOS 2.0` étaient déjà à la corbeille — déplacés à la main avant la session.

Rien n'est détruit : supprimer la page emporte les sept, et la corbeille Notion les garde
30 jours. **Ne jamais y faire entrer `Tasks`, `Projects`, `Meetings` ni `Docs`** — ce sont les
bases maîtresses que lisent `MEET-01`, `PROJ-01` et `TASK-01`.

Sauvegardé avant : les 11 publications et 9 URL vivantes dans
[`PUBLICATIONS-2025-ARCHIVE.md`](PUBLICATIONS-2025-ARCHIVE.md), plus les 5 personas,
8 canaux et 7 types de livrable relevés dans le schéma du Content Calendar.

### Créé

**`Contenus marketing`** ([`5a568825…`](https://app.notion.com/p/5a568825e3bf4aa487557a3d8799033f))
— la seule base de contenu. **Huit propriétés**, contre 45 dans celles qu'elle remplace :

`Titre` · `Statut` (6 valeurs, humaines) · `État technique` (4 valeurs, n8n seul) ·
`Pilier éditorial` (les 4 de Q10) · `Canal` · `Date de publication` · `Lien` · `Idée / notes`

`Statut` et `État technique` sont séparés à dessein : un workflow n8n ne doit jamais filtrer
sur un champ qu'un humain modifie à la main.

### Nettoyé

**`Brand Assets`** — 9 propriétés → 6 : `Nom · Type · Format · Usage · Fichier · Source`.
Supprimées : `Status` (0/13 remplie, une seule option morte) et `Canva URL` (0/13).
`URL ` portait une espace en fin de nom. Options mortes retirées : `Image`, `Illustration`,
`Photo`, `Gradient`, `JPG`. Les 13 lignes ont été revérifiées après coup — aucune perte.

**Brand Hub** — reconstruite. Elle interdisait en encadré de saisir une valeur à la main,
puis en recopiait environ vingt-cinq plus bas. Les sections Palette, Typographie et Design
Tokens sont supprimées : le widget les rend déjà, généré depuis `src/index.css`. Restent la
doctrine du logo (ce que le code ne dit pas) et les deux décisions ouvertes.

**Assets & Templates** — reconstruite. Deux liens pointaient vers `code_file:371` et `:372`,
qui ne sont pas des adresses. Le dossier Drive qu'elle donnait
(`1tx1TiRVUKLTLmLmSilvWm0UILTWbfKXD`) **n'existe pas** — vérifié à l'API ; le bon est
`1Qq810LO9mhnsL83S52RnOidR3dAgfhNq`. Elle annonçait 63 gabarits « à créer » en ignorant les
**12 PPTX déjà dans `brand/decks/` et `brand/docs/`**.

**Page Marketing** — l'encadré de navigation pointait encore vers `Dashboard Editorial`,
désormais dans la corbeille.

### Reste à faire à la main — l'API ne sait pas le faire

| Quoi | Pourquoi l'API bloque |
|---|---|
| Supprimer la page `🗑 À purger` | Pas d'outil de suppression Notion |
| Supprimer les 6 vues marquées `🗑 à supprimer` sur Brand Assets | Pas de suppression de vue |
| Retirer les 3 filtres vides de la vue `Tout` | Ce sont des *filtres rapides*, que `CLEAR FILTER` ne touche pas. Ils n'excluent aucune ligne — vérifié, la vue rend bien 13 lignes |
| Supprimer la relation `Google Drive File` + sa base satellite de 5 lignes | `DROP COLUMN` refuse les relations |
| Renommer les options `Colour` → `Couleur` et `Font` → `Police` | Un renommage par l'API détruit les valeurs ; par l'interface, il les conserve |
