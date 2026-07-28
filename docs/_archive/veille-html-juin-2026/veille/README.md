# Contenu Veille TLS — pages web

Contenus de veille éditoriale The Learning Society, en **pages web HTML autonomes** (pas des composants React, pas de route `App.tsx`). Servis statiquement par Vite depuis `public/` — chaque fichier est directement accessible à son chemin une fois l'app déployée (ex. `/veille/dossiers/tls-sbo-dossier.html`), sans passer par le routeur de l'app.

> ⚠️ **Ce ne sont PAS des templates email.** Ces fichiers utilisent flex/grid → ils s'affichent en navigateur mais casseraient dans Gmail/Outlook. Pour l'emailing (tables + styles inline), voir [`brand/assets/email-templates/`](../../brand/assets/email-templates/) (dossier différent, resté à sa place — les templates email n'ont pas besoin d'être servis par URL, ils se copient-collent dans un client mail).

> 📍 **Déplacé le 2026-07-15** depuis `brand/assets/veille-content/` (invisible du build Vite, jamais servi) vers `public/veille/` (servi tel quel par `vite dev` et copié dans `dist/` au build — c'est la seule façon pour ces pages d'être réellement visitables une fois l'app en ligne).

Tokens TLS (teal `#55A1B4` / orange `#ED843A` / or `#F8B044`, League Spartan + Nunito) — mais registre **éditorial/livre blanc**, pas produit : voir §Design ci-dessous.

## Structure

```
public/veille/
├── dossiers/        — dossiers stratégiques longs (thought leadership)
├── weekly-radar/    — radar de veille concurrentielle
├── veille-hebdo/    — veille hebdomadaire (actus de la semaine)
├── newsletters/     — newsletters éditoriales
└── magazine/        — magazine mensuel thématique
```

## Les 10 fichiers (après fusion, fact-check et refonte du 2026-07-15)

| Fichier | Sujet | Note |
|---|---|---|
| [dossiers/tls-sbo-dossier.html](dossiers/tls-sbo-dossier.html) | Skills-Based Organizations | Fusion de 3 variantes. 19 sources vérifiées, 9 chiffres fabriqués retirés (ROI Korn Ferry non daté, tableau de stats inventé, etc.) |
| [dossiers/dossier-sbo-ia-2026.html](dossiers/dossier-sbo-ia-2026.html) | SBO × IA — le nouveau contrat de compétences | Fusion de 2 variantes, reconstruit à partir du corpus vérifié. 7 clients nommés avec métriques inventées retirés, 1 produit fictif ("TLS Learning Studio") retiré |
| [dossiers/dossier-ia-ingenierie-pedagogique-2026.html](dossiers/dossier-ia-ingenierie-pedagogique-2026.html) | IA générative & ingénierie pédagogique | Angle instructional design. Conservé distinct de `dossier-ia-formation-2026` (angle différent, pas un doublon) |
| [dossiers/dossier-ia-formation-2026.html](dossiers/dossier-ia-formation-2026.html) | L'IA en formation — de l'expérimentation à l'infrastructure | Angle marché/ROI/adoption. Stat Insee fabriquée (42%→corrigée), période ROI corrigée (12→24 mois) |
| [weekly-radar/tls-weekly-radar-studio.html](weekly-radar/tls-weekly-radar-studio.html) | Radar concurrentiel EdTech/L&D, éditions S23+S24 | Consolidé depuis 3 designs candidats → 1. AI Act : distinction obligation (active depuis fév. 2025) vs sanctions (2 août 2026) corrigée |
| [veille-hebdo/veille-tls-semaine-15-juin-2026-layout-2.html](veille-hebdo/veille-tls-semaine-15-juin-2026-layout-2.html) | Veille hebdo, semaine du 15 juin 2026 | Reconstruit sur le même gabarit que l'édition S23 |
| [veille-hebdo/veille-hebdo-tls-23-juin-2026.html](veille-hebdo/veille-hebdo-tls-23-juin-2026.html) | Veille hebdo, semaine du 23-27 juin 2026 | 7 mentions "AI Act" retirées du titre/CTA (gardées uniquement là où l'analyse l'exige) |
| [veille-hebdo/tls-veille-actu-jour.html](veille-hebdo/tls-veille-actu-jour.html) | 5 micro-actus IA & formation | Nouveau format. Marqueurs `[web:XX]` non nettoyés + violations CPF/Qualiopi corrigés. Mode sombre inclus (toggle) |
| [newsletters/newsletter-tls-semaine-2-juin-2026-autonome.html](newsletters/newsletter-tls-semaine-2-juin-2026-autonome.html) | 5 actus formation/IA, semaine 2 juin 2026 | — |
| [magazine/tls-mag-juin-2026-glassmorphism.html](magazine/tls-mag-juin-2026-glassmorphism.html) | Gamification & Learning | Fusion des 2 thèmes (clair/sombre — le thème sombre devenait redondant avec le papier crème). Citation académique inventée retirée, chiffre "+42%" fabriqué remplacé par une vraie méta-analyse (Sailer & Homner, g=0,49) |

## Design — registre éditorial, pas produit

Papier crème (`#fefaf5`) + encre chaude (`#2f1c13` corps, `#4C3B33` secondaire, `#695A52` sources — tous ≥6,3:1 AAA/AA). Couleur de marque réinjectée uniquement en ponctuation : filet d'ouverture de section (`#ED843A`), numéro de section (`#8F5017`), liens (`#3D7786`), chiffre-clé négatif (`#8F2A0E`) — jamais en fond de carte. Zéro eyebrow, zéro card-soup, zéro glassmorphism (réservé à l'app produit). Règle ferme : jamais de barre d'accent colorée (`border-left`) ni d'eyebrow — lu comme "généré par IA".

## Fact-check et conformité marque

Chaque fichier a été vérifié par recherche web (sources primaires) et purgé des mentions "Qualiopi"/"AI Act"/"CPF" en titre, des clients nommés, et des chiffres non traçables. Voir [`docs/veille/2026-07-15-IA-GENERATIVE-FORMATION-PREUVES.md`](../../docs/veille/2026-07-15-IA-GENERATIVE-FORMATION-PREUVES.md) pour le corpus de preuves vérifiées sur l'IA générative en formation (12 claims confirmés, 13 rejetés, méthode adversariale 3 voix) qui a servi de référence à plusieurs de ces dossiers.

## Historique — origine des fichiers

7 des 10 fichiers viennent du Drive TLS (`Learning App/Contenu Veille/templates html veille/`, rapatriés le 2026-07-14). 3 fichiers de plus (`dossier-ia-formation-2026`, `dossier-sbo-ia-2026` fusion, et les variantes SBO/magazine fusionnées) viennent d'un second lot déposé dans `~/Downloads` le 2026-07-15 — ce lot contenait significativement plus de fabrications factuelles que le lot Drive (citations académiques inventées, clients avec métriques fictives, produits qui n'existent pas) : à garder en tête pour la prochaine génération de ce type de contenu.

Le Drive contient encore des variantes non retenues (redondantes, mise en page alternative du même contenu) — laissées sur le Drive comme archive brute.

## Note

Ces pages sont des **livrables de contenu daté**, pas des templates réutilisables tels quels — pour un nouvel envoi/édition, dupliquer + mettre à jour le contenu (et refaire le fact-check des chiffres datés).
