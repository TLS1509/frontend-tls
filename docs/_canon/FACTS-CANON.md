# FACTS-CANON.md — Registre des faits TLS

> ### 🔴 Registre remis à zéro le 2026-07-28
>
> **Pourquoi.** L'ancienne version a été assemblée par IA en juin 2026 à partir
> de sources secondaires, puis lue pendant sept semaines comme une autorité. Elle
> était le troisième document à revendiquer la primauté sur les faits, et elle
> contenait elle-même des erreurs : l'adresse du siège, la confusion entre
> Dinootoo et le client, le Match présenté comme livré, un positionnement qui n'a
> jamais été celui du site.
>
> État précédent conservé pour trace :
> [`_archive/corpus-marketing-IA-juin-2026/FACTS-CANON-etat-2026-07-28.md`](../_archive/corpus-marketing-IA-juin-2026/FACTS-CANON-etat-2026-07-28.md).
>
> **Ce qui reste ci-dessous** est uniquement ce qui a une source de première main :
> une décision datée de Chloé, ou le code réellement en ligne. **Tout le reste a
> été retiré** — mieux vaut un registre court et vrai qu'un registre complet et
> douteux.
>
> ### Ordre de préséance
> 1. **Le code** et le site en ligne — c'est ce que voient les visiteurs.
> 2. **Une décision datée de Chloé**, tracée dans un récap.
> 3. **Ce registre.**
> 4. Le reste des docs.
>
> Si le code contredit ce registre, **c'est le registre qu'il faut corriger**.

---

## §0 — LES INTERDITS

Ces lignes viennent de Chloé. Chacune corrige une erreur réellement écrite dans
au moins un doc ou une page du repo.

| # | Interdit | Formulation admise |
|---|---|---|
| X1 | ⛔ **Ne jamais écrire que TLS est Qualiopi.** TLS n'est pas organisme certifié, C-Campus l'est | Uniquement en attribution : « C-Campus, organisme certifié Qualiopi » |
| X2 | ⛔ **Ne jamais afficher CPF** | « Éligible OPCO » quand c'est vrai et attribué |
| X3 | ⛔ **Ne jamais écrire « Open Badge 2.0 »** | « Open Badge », sans numéro de version |
| X4 | ⛔ **Pas d'AI Act en accroche marketing** | Sujet éditorial légitime, jamais un argument de vente |
| X5 | ⛔ **Aucune métrique TLS inventée** — et ne jamais transformer un « X % plus susceptibles de » en « +X % de performance » | Une phrase qualitative vraie vaut mieux qu'un pourcentage estimé |
| X6 | ⛔ **Aucun client nommé publiquement.** Le grand groupe = Orange, usage interne strict. Pas de logo sans autorisation écrite | « Un grand groupe français » |
| X7 | ⛔ **Aucun faux témoignage.** La règle n'est pas « pas de témoignages » : c'est « pas de témoignages inventés » | De vrais verbatims autorisés sont souhaités — voir [`CASE-STUDY-ORANGE-TRAME.md`](../site/CASE-STUDY-ORANGE-TRAME.md) |
| X8 | ⛔ **« L'Académie » n'existe pas** | — |
| X9 | ⛔ **Aucun membre d'équipe fictif.** L'équipe est Mimault + Dennery | — |
| X10 | ⛔ **Ne pas parler de la formation « Formateur Augmenté »** — plus d'actualité, sujet clos | — |

> **Retiré le 2026-07-29 : l'ancien X11 « pas d'effet parallax ».** Le registre
> des faits n'est pas l'endroit où l'on fige un parti pris visuel. Aucune
> contrainte d'effet ou d'animation n'a cours pour l'instant : la direction
> motion du site sera rejouée dans une passe dédiée. Ce qui reste opposable en
> motion est d'ordre accessibilité et performance, pas esthétique.

---

## §1 — DÉCISIONS DE CHLOÉ (source de première main)

| # | Fait | Date |
|---|---|---|
| D1 | Registre public : **vous**. Registre app : **tu** | 10/06 |
| D2 | **SBO = Skills Based Organisation** | durable |
| D3 | Siège social : **26 bis, rue Olivier Noyer, 75014 Paris** | 28/07 |
| D4 | Équipe affichée : **Chloé Mimault** et **Pierre-Armand Dennery**, personne d'autre | 10/06 |
| D5 | Le **Match** est une brique **spécifiée, non livrée** → le formuler **au futur** partout | 28/07 |
| D6 | **Pas de prix public** sur le site V1. Business model non figé | 10/06, tenu le 28/07 |
| D7 | Newsletter : **La Vigie IA**, nom provisoire, susceptible de changer | 28/07 |

---

## §2 — CE QUE DIT LE CODE (vérifiable à tout moment)

Ces lignes se vérifient en ouvrant `src/`. Elles ne périment pas en silence : si
le code change, elles deviennent fausses et se corrigent ici.

| # | Fait | Où le vérifier |
|---|---|---|
| C1 | Positionnement affiché : **« Cabinet de conseil & studio expert en Skills-Based Organization »** | `MarketingHome.tsx`, sur-titre du hero |
| C2 | Méthode **STRIDE**, six verbes : S'orienter · Tester · Réaliser · Intégrer · **Déployer** · Évoluer | `MarketingAccompagnement.tsx` |
| C3 | Routes du site : **`/website/*`** (l'ancien `/marketing/*` est périmé depuis le 03/07) | `src/App.tsx` |
| C4 | La page Formation **n'existe plus** : `/website/formation` redirige vers `/website/learning-app` | `src/App.tsx` |
| C5 | Arborescence complète du site V1 | [`docs/site/SITEMAP-V1.md`](../site/SITEMAP-V1.md) |
| C6 | Copywriting arbitré des pages | [`docs/site/propositions-PAD/`](../site/propositions-PAD/) |
| C7 | Il n'existe **aucune photo des fondateurs** : la page affiche des monogrammes | `MarketingEquipe.tsx` |
| C8 | Learning App : statut **bêta ouverte** | — |

---

## §3 — À RECONSTRUIRE

Tout ce qui suit a été **retiré** du registre parce qu'il venait de sources
secondaires ou d'une génération IA. Rien de tout cela n'est publiable en l'état.

| Sujet | Ce qu'il faut pour le rétablir |
|---|---|
| **Taille et structure du marché** | Vos dernières études de marché. Les chiffres qui circulaient (32 Md€ formation pro, 1,7 Md€ EdTech, « 800+ EdTech en France ») étaient incohérents entre docs et sans source ouverte |
| **Analyse concurrentielle** | Idem. L'ancien brief listait 360Learning, Didask, Degreed, Gloat, Eightfold, Cornerstone — à refaire sur vos études |
| **Voix de marque** | À écrire par TLS. L'ancienne doctrine était une production IA, pas une décision |
| **Positionnement détaillé, personas** | Idem |
| **Catalogue d'offres** | Ce que TLS vend réellement aujourd'hui, offre par offre |
| **Pricing** | ⏸️ gelé jusqu'à une analyse business model dédiée |
| **Stratégie de contenu et SEO** | Le pilier précédent est abandonné, tout est à repenser sur le positionnement SBO |
| **Stratégie LinkedIn** | Idem |
| **Chiffres C-Campus** (578 personnes, +93 %) | S'ils doivent resservir : re-sourcer, et **toujours les attribuer à C-Campus** |

---

## Comment se servir de ce registre

Avant d'écrire une affirmation vérifiable, chercher la ligne ici. **Si elle n'y
est pas, elle n'est pas validée** — et une affirmation non validée ne se publie
pas : elle se vérifie, ou elle se retire.

Ce registre est volontairement court. Sa valeur tient à ce qu'on puisse faire
confiance à chaque ligne, pas à sa couverture.
