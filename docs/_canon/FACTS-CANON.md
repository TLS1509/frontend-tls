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

> ### 🔄 Révision du 2026-09-16 — le pivot du 31/08 entre dans le registre
>
> Le registre datait du 29/07 et ne connaissait pas la réunion de rentrée du
> 31/08, qui a réécrit l'offre. Six décisions datées entrent en §1 (**D8 à D13**),
> deux lignes de §3 sortent parce qu'elles sont reconstruites, et §2 gagne trois
> lignes vérifiées dans le code.
>
> **Deux choses n'ont pas été corrigées, à dessein :**
> - **C1** décrit un code qui contredit D8. La ligne est exacte ; elle est annotée,
>   pas réécrite. Corriger le registre effacerait le conflit au lieu de le montrer.
> - **D6** (« pas de prix public ») est une décision de Chloé. Sa raison d'origine a
>   disparu le 31/08, mais **personne d'autre qu'elle ne peut la reconduire ou la
>   lever**. Elle est marquée « à reconfirmer », elle n'est pas modifiée.
>
> Un audit de `src/` contre les dix interdits a été fait le même jour : **une seule
> violation vivante**, notée sous §0.

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
| X10 | ⛔ **Ne pas parler de la formation « Formateur Augmenté »** — plus d'actualité, sujet clos | Le **métier** de formateur augmenté reste un sujet éditorial légitime : c'est l'**offre de formation** qui est close |

> **🔴 Violation vivante au 2026-09-16 — X10.** Relevé en auditant `src/` contre ce
> registre : [`src/data/marketingArticles.ts:2175`](../../src/data/marketingArticles.ts)
> publie « *C-Campus est l'organisme partenaire de The Learning Society pour la
> certification de la formation « Formateur Augmenté par l'IA »* ». L'attribution à
> C-Campus est correcte (X1 respecté) ; c'est la mention de l'offre close qui ne
> l'est pas. **Non corrigé à ce jour.**
>
> Le reste de l'audit est propre : aucune occurrence de Qualiopi revendiqué par TLS,
> de CPF, d'« Open Badge 2.0 » ni de « L'Académie » dans `src/`.

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
| D8 | Le mot **« conseil » est abandonné** au profit de **« studio »**. Verbatim : « *on n'arrivera pas à le vendre […] on va l'appeler plutôt studio, ce qui nous donne le truc de l'artisan qui vient le faire pour toi* » | 31/08 |
| D9 | Trois piliers : **1 — Tech, SaaS & Marketplace** · **2 — Upskilling & Formation** · **3 — Studio & Intégration** | 31/08 |
| D10 | **STRIDE / SBO Global (30 000 € HT) est gelée** — « pour 2027, cible 2028 » | 31/08 |
| D11 | La **Learning App est un outil d'ancrage offert**, pas un pilier de revenus. Verbatim : « *Tout ce qui est vente par abonnement, on s'en tape, c'est du bonus* ». ~40 k€ visés sur l'année | 31/08 |
| D12 | Le **lancement de la Learning App et du site vitrine est arrêté** ; leur planning sera révisé **après validation du planning du projet Agents**. Réponse Q1, option A | 31/08 |
| D13 | **Ticket minimum 3 000 € HT** sur toute prestation sur mesure, avec exception discrétionnaire assumée | 31/08 |

> **⚠️ D6 est à reconfirmer, pas à hériter.** « Pas de prix public » a été décidé le
> 10/06 et tenu le 28/07 **parce que le business model n'était pas figé**. Il l'est
> depuis le 31/08 : le catalogue compte **douze lignes chiffrées**. La décision peut
> très bien tenir — beaucoup de sites B2B n'affichent pas leurs prix — mais elle ne
> repose plus sur sa raison d'origine. **Seule Chloé peut la reconduire.**
>
> ⚠️ Et deux règles de paiement coexistent sans arbitrage : **acompte 50 % à la
> signature** (session 3 du 31/08, travaux Studio, pas la formation) contre
> **30 % / 40 % / 30 %** (réponse Q47, reprise en QS26, qui réécrit l'OKR 4.3).

---

## §2 — CE QUE DIT LE CODE (vérifiable à tout moment)

Ces lignes se vérifient en ouvrant `src/`. Elles ne périment pas en silence : si
le code change, elles deviennent fausses et se corrigent ici.

| # | Fait | Où le vérifier |
|---|---|---|
| C1 | Positionnement affiché : **« Cabinet de conseil & studio expert en Skills-Based Organization »** — ⚠️ **contredit D8**, voir la note sous ce tableau | `MarketingHome.tsx` · `MarketingFooter.tsx` · `SEOHead.tsx` · `MarketingEquipe.tsx` |
| C2 | Méthode **STRIDE**, six verbes : S'orienter · Tester · Réaliser · Intégrer · **Déployer** · Évoluer | `MarketingAccompagnement.tsx` |
| C3 | Routes du site : **`/website/*`** (l'ancien `/marketing/*` est périmé depuis le 03/07) | `src/App.tsx` |
| C4 | La page Formation **n'existe plus** : `/website/formation` redirige vers `/website/learning-app` | `src/App.tsx` |
| C5 | Arborescence complète du site V1 | [`docs/site/SITEMAP-V1.md`](../site/SITEMAP-V1.md) |
| C6 | Copywriting arbitré des pages | [`docs/site/propositions-PAD/`](../site/propositions-PAD/) |
| C7 | Il n'existe **aucune photo des fondateurs** : la page affiche des monogrammes | `MarketingEquipe.tsx` |
| C7b | La page **STRIDE ne vend plus** : Audit Flash, livrables contractuels et CTA d'achat retirés le 16/09, la page devient une page de méthode | `MarketingAccompagnement.tsx` |
| C8 | Learning App : **un MVP est en ligne depuis janvier 2026 et quatre clients bêta l'utilisent.** Ce qui est arrêté (D12), c'est le lancement de la version techniquement scalable — fonctionnellement très proche. La formule « bêta ouverte » disait mal cet état | réponse Q2, 31/08 |
| C9 | **Aucun prix n'est affiché** sur le site | conforme à D6 — vérifiable dans `src/pages/marketing/` |

> **🔴 C1 est exact, et c'est le problème.** Le code dit bien « cabinet de conseil »,
> alors que D8 abandonne ce mot depuis le 31/08. Le registre ne « corrige » donc pas
> C1 : il enregistre que **le code est en retard sur une décision**. La ligne reste
> vraie jusqu'à ce que le code change.
>
> **Portée** : le descripteur vit dans le H1 de l'accueil, le boilerplate du footer,
> la **méta description par défaut de toutes les pages** (`SEOHead.tsx`) et la page
> Fondateurs. Le remplacer est une décision de marque qui n'est pas prise — c'est
> l'arbitrage de copy le plus structurant en attente.

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
| ~~**Catalogue d'offres**~~ | ✅ **Reconstruit le 31/08/2026** — douze offres, avec prix, unité, pilier et statut. Voir D9 à D13 et la fiche **Tarifs** de la base Notion « Website pages » |
| ~~**Pricing**~~ | ✅ **Dégelé le 31/08/2026.** Les prix existent. Ce qui reste ouvert est l'**affichage public**, qui est une autre question — voir la note sous D6 |
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
