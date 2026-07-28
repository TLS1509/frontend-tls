# Corpus site & copy — juin 2026

> ### ⛔ ARCHIVE. NE PAS UTILISER COMME SOURCE.
> **Archivé le 2026-07-28.** Ces neuf documents ont tous le même dernier commit :
> le **11 juin 2026**. Ce n'est pas une collection de docs qui ont vieilli
> chacun de leur côté, c'est **un instantané unique**, écrit en une salve et
> jamais retouché. Il décrit un site qui n'existe plus.

## Pourquoi ils sont morts

Quatre événements les ont vidés de leur substance, dans l'ordre :

| Quand | Quoi | Ce que ça invalide |
|---|---|---|
| 03/07/2026 | Routes `/marketing/*` → **`/website/*`** | toutes les URL citées |
| 03/07/2026 | **Page Formation supprimée** (redirige vers `/website/learning-app`) | toute la copy de `formation.html` |
| 28/07/2026 | **Refonte complète du site** sur le copywriting arbitré de `docs/site/propositions-PAD/` | toute la copy de ces docs |
| 28/07/2026 | **Offre « Formateur Augmenté » retirée du discours** (décision Chloé) | le positionnement de catégorie qui les structurait |

## Ce qu'ils contiennent de dangereux

Ces docs sont la source principale des claims interdits qui ont circulé dans le
repo. Si l'un d'eux réapparaît quelque part, il vient probablement d'ici.

- **Qualiopi attribué à TLS** : 13 occurrences dans `COPY-V2`, 11 dans
  `COPY-HOME`. TLS n'est pas certifié, C-Campus l'est.
- **CPF** dans des meta descriptions, alors qu'il ne doit jamais être affiché.
- **« Open Badge 2.0 »**, 6 occurrences dans `COPY-V2`. Le nom public n'a pas de
  numéro de version.
- **« 23 heures »** de formation, 5 occurrences. Le chiffre vérifié était 7 h.
- **Des métriques déformées** : `COPY-HOME` transforme un « 107 % **plus
  susceptibles de** » (Deloitte) en « **+107 % d'efficacité** », et ajoute
  au-dessus la consigne « ces 4 chiffres ont tous une source primaire vérifiée,
  ne pas les modifier ». Une citation fausse, verrouillée par une règle.
- **Le tutoiement** prescrit comme registre, alors que la règle validée est
  « vous » sur tout le public.
- **`SITE-V1-GROUNDING`** se déclarait souverain : « ce doc est la référence pour
  tout copywriting, architecture et décision de contenu du site. Toute invention
  hors de ce périmètre est interdite. » Il décrit une stack HTML/CSS/JS vanille.
- **`SITE-V1-GROUNDING` §6 « FAITS AUTORISÉS (utilisables sans attribution) »**
  libère les 32 Md€ de marché et les 800+ EdTech, que le registre des faits
  marque explicitement comme gelés et non publiables.
- **`DIRECTION-C-CHECKLIST`** portait « **Locked** : 2026-06-11 » et
  « No reopening Directions » : une exploration créative verrouillée en loi.

## Où regarder à la place

| Besoin | Doc vivant |
|---|---|
| Un fait, un chiffre, un interdit | [`docs/_canon/FACTS-CANON.md`](../../_canon/FACTS-CANON.md) |
| L'arborescence du site | [`docs/site/SITEMAP-V1.md`](../../site/SITEMAP-V1.md) |
| Le copywriting arbitré | [`docs/site/propositions-PAD/`](../../site/propositions-PAD/) |
| Les invariants techniques du site | [`docs/site/CONTEXT-SITE-MARKETING.md`](../../site/CONTEXT-SITE-MARKETING.md) |
| La copy réellement en ligne | le code, `src/pages/marketing/*` |

## Ce qui a de la valeur là-dedans

Presque rien en l'état, mais deux choses méritent d'être relues avant qu'on
réécrive quoi que ce soit d'équivalent :

- **`SEO-CONTENT-PLAN` (resté vivant)** garde une logique de clusters
  sémantiques utilisable une fois le pilier remplacé.
- **Les analyses concurrentielles** de `SITE-REACT-AUDIT` sur les patterns de
  conversion restent instructives, indépendamment de l'offre.
