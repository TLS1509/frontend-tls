# Contenu Veille TLS — pages web

Contenus de veille éditoriale The Learning Society, en **pages web HTML autonomes** (glassmorphism, flex/grid, `backdrop-filter`). Rapatriés le 2026-07-14 depuis le Drive TLS (`Learning App/Contenu Veille/templates html veille/`).

> ⚠️ **Ce ne sont PAS des templates email.** Ces fichiers utilisent flex/grid/`backdrop-filter`/`clamp()`/`@media` → ils s'affichent en navigateur mais **casseraient dans Gmail/Outlook**. Pour l'emailing (tables + styles inline), voir le dossier voisin [`../email-templates/`](../email-templates/). Ces deux familles sont volontairement séparées.

Tous sont **on-brand** (tokens TLS teal `#55A1B4` / orange `#ED843A` / jaune `#F8B044`, polices League Spartan + Nunito) et contiennent du **vrai contenu daté et sourcé** (mi-2026), pas des coquilles.

## Structure

```
veille-content/
├── dossiers/        — dossiers stratégiques longs (thought leadership)
├── weekly-radar/    — radar de veille concurrentielle
├── veille-hebdo/    — veille hebdomadaire (actus de la semaine)
├── newsletters/     — newsletters éditoriales
└── magazine/        — magazine mensuel thématique
```

## Les 7 fichiers gardés (set curé)

| Fichier | Type | Sujet | Note |
|---|---|---|---|
| [dossiers/tls-sbo-dossier.html](dossiers/tls-sbo-dossier.html) | Dossier web | Skills-Based Organizations 2026 | ⭐ Le plus complet des 6 variantes SBO : 9 KPI, biblio **21 sources / 29 liens réels**, scroll-reveal JS |
| [dossiers/dossier-ia-ingenierie-pedagogique-2026.html](dossiers/dossier-ia-ingenierie-pedagogique-2026.html) | Dossier web | IA générative & ingénierie pédagogique (Qualiopi/AI Act) | Sujet unique · daté 21 mai 2026 · 9 sources liées |
| [weekly-radar/tls-weekly-radar-studio.html](weekly-radar/tls-weekly-radar-studio.html) | Studio hybride | Radar concurrentiel EdTech/L&D, 2 semaines | Chrome web + **3 variants email-safe (tables) dedans** — précieux |
| [veille-hebdo/veille-tls-semaine-15-juin-2026-layout-2.html](veille-hebdo/veille-tls-semaine-15-juin-2026-layout-2.html) | Veille hebdo web | Actus semaine 15 juin 2026 | Layout retenu parmi 3 explorations du même lot |
| [newsletters/newsletter-tls-semaine-2-juin-2026-autonome.html](newsletters/newsletter-tls-semaine-2-juin-2026-autonome.html) | Newsletter web | 5 actus formation/IA, semaine 2 juin 2026 | Version « autonome » (portable, self-contained) |
| [magazine/tls-mag-juin-2026-glassmorphism.html](magazine/tls-mag-juin-2026-glassmorphism.html) | Magazine web (clair) | Gamification & Learning, juin 2026 | Variante glassmorphism claire |
| [magazine/tls-mag-juin-2026-dark-editorial.html](magazine/tls-mag-juin-2026-dark-editorial.html) | Magazine web (sombre) | Gamification & Learning, juin 2026 | Variante dark editorial (même contenu, thème sombre) |

## Ce qui n'a PAS été rapatrié (reste sur le Drive)

Le Drive contient **19 fichiers** (dont 2 doublons exacts). Set curé = 7 keepers ; les 12 autres sont des **variantes redondantes** volontairement laissées sur le Drive (source de vérité pour l'archive brute) :

- **Dossier SBO** — 5 variantes non retenues : `dossier-sbo-2026` (48 Ko, 8 sections, thème dark, 21 liens — 2ᵉ meilleur, retour possible), `dossier-tls-sbo` (38 Ko, dark toggle, 23 sources), `tls-dossier-sbo-v2` (40 Ko, sidebar dashboard + export PDF), `tls-dossier-sbo-v1` (31 Ko, 6 sections, annonce « 22 sources » mais n'en montre que 12 → version antérieure), + le doublon exact `tls-dossier-sbo-v2 (1)`. **Keeper choisi** = `tls-sbo-dossier` (le plus dense/complet).
- **Veille hebdo** — 2 layouts non retenus : `veille-tls-dashboard-8-juin`, `veille-tls-semaine-9-juin` (même lot d'actus de juin, mises en page alternatives).
- **Newsletter** — 2 non retenus : `newsletter-tls-semaine-2-juin-2026` (33 Ko, build plus lourd de la même édition que l'« autonome » gardé), `newsletter-tls-semaine-25mai2026` (33 Ko, édition d'une autre semaine — à rapatrier si on veut une 2ᵉ édition de référence).
- **Magazine** — 2 non retenus : `tls-mag-juin-2026-version-b`, `tls-mag-juin-2026-version-c` (2ᵉ jeu de contenu magazine en light/dark — le jeu `glassmorphism`/`dark-editorial` a été préféré comme plus abouti).
- **Weekly radar** — doublon exact `tls-weekly-radar-studio (1)`.

## Petits défauts connus (hérités du Drive, non corrigés)

- **Emojis en mojibake** dans plusieurs fichiers (`ð¯` etc.) — artefact d'encodage à la source Drive. À remplacer par des icônes Lucide si ces pages passent en production.
- **Dérive mineure de tokens** dans certains dossiers : ink `#1A2A35`/`#1a1a1a` au lieu de `#252B37`, teal foncé `#3d8096` au lieu de `#3D7786`. Cosmétique.
- Ces pages sont des **livrables de contenu daté**, pas des templates réutilisables tels quels — pour un nouvel envoi, dupliquer + mettre à jour le contenu.
