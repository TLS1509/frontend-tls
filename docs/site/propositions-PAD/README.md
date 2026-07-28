# README — Corpus Site V1 : règle d'organisation & provenance

> **Actée le 2026-07-28.** Ce dossier est la **source de vérité arbitrée** du copywriting et de la stratégie du site V1. Point d'entrée métier : [RECAP-REUNION-2026-07-28.md](RECAP-REUNION-2026-07-28.md).

---

## La règle Notion / Repo / Figma

| Système | Rôle | Ce qui y vit |
|---|---|---|
| **Notion** | L'atelier vivant | Brouillons PAD, discussions, meeting notes & transcripts, planning (SSOT/RACI, bases Tasks), inventaires collaboratifs. **Rien dans Notion ne fait foi pour le build.** |
| **Repo** | La vérité arbitrée | Ce qui est tranché est mirroré ici (`docs/site/propositions-PAD/`) et **committé**, avec provenance datée (table ci-dessous). Le code se construit **uniquement** depuis ces fichiers. |
| **Figma** | Exploration visuelle optionnelle | Art direction, assets, moodboards — si besoin. Jamais une étape obligatoire du pipeline, jamais une source de copy. Le design system de référence vit dans le code (`src/index.css` @theme). |

**Corollaires :**
1. Si PAD ré-édite un doc dans Notion après le mirror, l'édition **ne compte pas** tant qu'elle n'est pas re-arbitrée et re-mirrorée ici (mettre à jour la date dans la table).
2. Un doc Notion supersédé est **archivé dans Notion** (pas supprimé), et n'est **jamais** mirroré dans le repo.
3. Les transcripts bruts de réunion (mêlés de contenu perso) restent dans Notion **uniquement** — seules les décisions extraites proprement sont committées (cf. RECAP).

---

## Table de provenance (mirror du 2026-07-28)

> Contexte : le bridge Notion est tombé pendant une partie de la session du 28/07 — une partie du corpus a été récupérée via des **exports zip manuels** envoyés par Chloé, le reste en **API directe**. Bridge re-vérifié fonctionnel le 28/07 en fin de journée : dernière édition Notion du projet à 14:11, antérieure au mirror (15:36+) → aucun drift.

### Docs stratégiques

| Fichier repo | Original Notion | Récupéré via |
|---|---|---|
| [SSOT-PAD-2807.md](SSOT-PAD-2807.md) | [SINGLE SOURCE OF TRUTH](https://app.notion.com/p/3abcdd696db68091a136eaf308c3b1df) | zip manuel |
| [PAD-vision-strategique-sitemap.md](PAD-vision-strategique-sitemap.md) | [Vision Stratégique & Messages Clés](https://app.notion.com/p/3a9cdd696db680bcb791d60837e594af) | zip manuel |
| [PAD-strategie-contenu-b2b.md](PAD-strategie-contenu-b2b.md) | [Stratégie de Contenu Marketing B2B](https://app.notion.com/p/3aacdd696db6801b9c00f1cdd7a72c57) | zip manuel |
| [PAD-blog-magazine-strategie.md](PAD-blog-magazine-strategie.md) | [Document Stratégique Magazine/Blog](https://app.notion.com/p/3aacdd696db68027b054fe5f57175f44) | zip manuel |
| [CATALOGUE-OFFRES-GOUVERNANCE.md](CATALOGUE-OFFRES-GOUVERNANCE.md) | [Catalogue d'Offres & Gouvernance](https://app.notion.com/p/336cdd696db680ed8decc275b402c1e2) | API directe (édité 28/07 post-réunion) |
| [PAD-copywriting-upskilling.md](PAD-copywriting-upskilling.md) | [Copywriting Upskilling L&D — 6 angles exploratoires](https://app.notion.com/p/3aacdd696db680dab2ead2a6b16df2da) | zip manuel — **supersédé** par la page Upskilling finale, gardé pour trace |
| [PAD-website-pages.csv](PAD-website-pages.csv) | [Base "Website pages"](https://app.notion.com/p/1accdd696db680dfb6e7d4ab472d5062) | export — ⚠️ base constatée **périmée** le 28/07 (listait MarketingConseil/Magazine/Formation.tsx, disparus du repo) |

### Les 9 pages de copywriting (API directe, 28/07)

| Fichier repo | Original Notion |
|---|---|
| [PAD-page-homepage.md](PAD-page-homepage.md) | [Homepage](https://app.notion.com/p/3a9cdd696db68029a5edd2c111e27f0b) |
| [PAD-page-learning-app.md](PAD-page-learning-app.md) | [Learning App](https://app.notion.com/p/3aacdd696db680e68ed0c729fdd692d0) |
| [PAD-page-studio-ia-pedagogie.md](PAD-page-studio-ia-pedagogie.md) | [Studio IA & Pédagogie](https://app.notion.com/p/3aacdd696db68054ae30f76222e90b13) |
| [PAD-page-accompagnement-stride.md](PAD-page-accompagnement-stride.md) | [Accompagnement STRIDE](https://app.notion.com/p/3aacdd696db680b6bbdbe26d228171a4) |
| [PAD-page-upskilling.md](PAD-page-upskilling.md) | [Upskilling](https://app.notion.com/p/3aacdd696db680dfa1d4ec8c515cc662) |
| [PAD-page-bibliotheque-competences.md](PAD-page-bibliotheque-competences.md) | [Bibliothèque de compétences](https://app.notion.com/p/3aacdd696db680dc9d7cdc77ebc99d13) |
| [PAD-page-methode-tls.md](PAD-page-methode-tls.md) | [Méthode TLS](https://app.notion.com/p/3aacdd696db68010b313e87dafeff4c2) |
| [PAD-page-autodiagnostic.md](PAD-page-autodiagnostic.md) | [Autodiagnostic](https://app.notion.com/p/3aacdd696db68063b3cce0f6b78b8e9f) |
| [PAD-page-fondateurs.md](PAD-page-fondateurs.md) | [Fondateurs](https://app.notion.com/p/3aacdd696db68063bbe9eea3afedf592) |

### Docs nés dans le repo (pas d'original Notion)

| Fichier | Nature |
|---|---|
| [PREP-REUNION-VISION-STRATEGIQUE.md](PREP-REUNION-VISION-STRATEGIQUE.md) | Prep pré-réunion : confrontation des docs PAD aux sources internes |
| [RECAP-REUNION-2026-07-28.md](RECAP-REUNION-2026-07-28.md) | Synthèse post-réunion, croisée avec [Point TLS interne](https://app.notion.com/p/3abcdd696db680a0955bc3f08b135083) (zip). ⚠️ Le **transcript brut** (mêlé perso/financier) n'est volontairement **pas** committé — il reste dans Notion. |

---

## Docs Notion historiques — à archiver dans Notion, jamais mirrorer

Tous antérieurs au pivot SBO/STRIDE (détail : RECAP §5) :

- [Identité visuelle - site internet](https://app.notion.com/p/1d5cdd696db680dfb178e27847649d7a) (avril 2025 — ancienne charte couleurs)
- [Site internet - doc !](https://app.notion.com/p/c601efe59bcf475881cc3202f0471108) (oct. 2025 — taglines pré-SBO)
- [Architecture Site Web 2026](https://app.notion.com/p/2cbcdd696db680229af6f5e8bc49073c) (déc. 2025 — archi B2C "Académie", contredit FACTS-CANON)
- [Audit & recommandations Site vitrine](https://app.notion.com/p/2facdd696db680abbe57d62cb52f1f34) (fév. 2026 — structure Formations/Conseil périmée)
- [Sitemap & Structure Homepage — Propositions](https://app.notion.com/p/38ecdd696db6811eb953e3baa6b5de5d) (2026-06-29 — supersédé par les 9 pages PAD)

---

## Rappels build

- **Routes réelles : `/website/*`** (depuis `e48aa13`, 03/07) — la note Notion du 26/06 « garder `/marketing/*` » et l'ancien CONTEXT-SITE-MARKETING sont périmés sur ce point.
- Faits : [`docs/_canon/FACTS-CANON.md`](../../_canon/FACTS-CANON.md) prime sur tout copy (Open Badge sans « 2.0 », jamais Qualiopi TLS, pas de « certifié » non sourcé, « vous » sur le public).
- Page Contact actuelle : **à garder telle quelle** (décision Notion, confirmée 28/07).
