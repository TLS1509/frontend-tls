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
> 2. **Une décision datée de Chloé**, tracée dans un récap. Depuis le 05/09, c'est
>    d'abord le **[📒 Journal des décisions](https://app.notion.com/p/3d2cdd696db68130b58edc100798cad2)**
>    (Notion), dont la règle est : « une décision inscrite ici ne se rediscute pas
>    sans une nouvelle ligne qui la remplace explicitement ». **Entre deux lignes
>    datées, la plus récente l'emporte.** Pour la définition du produit (périmètre,
>    fonctionnalités cœur), la **[📘 Single Source of Truth](https://app.notion.com/p/3abcdd696db68091a136eaf308c3b1df)**
>    — dont le calendrier (go-live 07/09) est périmé par D12.
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

> ### 🔄 Révision du 2026-09-24 — le journal des décisions entre dans le registre
>
> La révision du 16/09 s'était arrêtée à la réunion du 31/08. Or le journal des
> décisions (salve 1 du **05/09**, 78 arbitrages ; salve 2 du **18/09**, 28
> questions) a tranché **après** cette réunion, et **remplace** deux de ses lignes :
> - **D13** (ticket minimum 3 000 €) est remplacé par **Q46** : « 750 € HT, et non
>   3 000 € » → **D15** ;
> - ~~**D9** (trois piliers) est remplacé par **Q9 + QS7**~~ — **corrigé le même
>   jour** : le « Transverse » du journal est un axe de classement interne, pas un
>   pilier d'offre, et Chloé ne le reconnaît pas. D9 reste ; voir la note sous §1.
>
> Et la note « deux règles de paiement coexistent sans arbitrage » tombe : **Q47**
> (05/09, ferme) est postérieure à l'acompte de 50 % du 31/08, et QS26 (18/09) la
> confirme → **D16**. Six décisions du journal qui touchent ce qu'on écrit du
> produit ou de l'offre entrent aussi (**D17 à D22**).
>
> Côté code : **C1 est résolu** — le site dit « Studio expert en Skills-Based
> Organization » depuis le 16/09 (commit `c54dd5ab`), conforme à D8. **La violation
> X10 est corrigée** (commit `9c9e8b76`), et **D6 est reconduit** par Chloé.
>
> Ce que ce registre **ne reprend pas** du journal : l'organisation interne de
> Notion et des agents (bases, schémas, n8n, Telegram), les chiffres financiers
> internes (CA, OKR) — ce ne sont pas des faits qu'on écrit.

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

> **✅ Violation X10 corrigée le 2026-09-24** (commit `9c9e8b76`, demandé par Chloé).
> Relevée le 16/09 : l'article « Le Passeport de Compétences »
> ([`src/data/marketingArticles.ts`](../../src/data/marketingArticles.ts)) présentait
> C-Campus comme le partenaire de certification de la formation « Formateur Augmenté
> par l'IA », avec ses sept modules et un appel à l'inscription éligible OPCO. La
> section garde sa thèse (C-Campus, organisme certifié Qualiopi, délivre ses propres
> Open Badges — formulation X1) sans l'offre close. Plus aucune occurrence dans `src/`.
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
| D1 | Registre public : **vous**. Registre app : **tu** pour l'apprenant ; **vous** pour le pilotage (manager, entreprise, admin, CLO), l'espace du coach et les pages d'auth — précisé par l'arbitrage n°23 (banc `/_arbitrages`), conforme à la section Voice de `PRODUCT.md` | 10/06 · 24/09 |
| D2 | **SBO = Skills Based Organisation** | durable |
| D3 | Siège social : **26 bis, rue Olivier Noyer, 75014 Paris** | 28/07 |
| D4 | Équipe affichée : **Chloé Mimault** et **Pierre-Armand Dennery**, personne d'autre | 10/06 |
| D5 | Le **Match** est une brique **spécifiée, non livrée** → le formuler **au futur** partout | 28/07 |
| D6 | **Pas de prix public** sur le site, pour l'instant — **reconduit par Chloé le 24/09**, alors que le catalogue est désormais chiffré (D18) | 10/06 · 28/07 · 24/09 |
| D7 | Newsletter : **La Vigie IA**, nom provisoire, susceptible de changer | 28/07 |
| D8 | Le mot **« conseil » est abandonné** au profit de **« studio »**. Verbatim : « *on n'arrivera pas à le vendre […] on va l'appeler plutôt studio, ce qui nous donne le truc de l'artisan qui vient le faire pour toi* » | 31/08 |
| D9 | Trois piliers d'offre : **1 — Tech, SaaS & Marketplace** · **2 — Upskilling & Formation** · **3 — Studio & Intégration** | 31/08 |
| D10 | **STRIDE / SBO Global (30 000 € HT) est gelée** — « pour 2027, cible 2028 » | 31/08 |
| D11 | La **Learning App est un outil d'ancrage offert**, pas un pilier de revenus. Verbatim : « *Tout ce qui est vente par abonnement, on s'en tape, c'est du bonus* ». ~40 k€ visés sur l'année | 31/08 |
| D12 | Le **lancement de la Learning App et du site vitrine est arrêté** ; leur planning sera révisé **après validation du planning du projet Agents**. Réponse Q1, option A | 31/08 |
| ~~D13~~ | ~~Ticket minimum 3 000 € HT sur toute prestation sur mesure~~ → **remplacé par D15** (Q46 : « 750 € HT, et non 3 000 € ») | 31/08 |
| D14 | **Piliers éditoriaux** (une autre notion que les piliers d'offre) : WIL/EDRA · SBO/Dreyfus · IA/Out-Skills · Retours Terrain. Le mot « pilier » seul désigne les piliers d'offre (D9) | Q10 (05/09) |
| D15 | **Ticket minimum : 750 € HT**, et non 3 000 € (contre-exemple cité : 750 € → 1 350 € → 20 000 €) | Q46 (05/09) |
| D16 | **Échéancier : 30 % au démarrage · 40 % à 70 % des jalons réalisés · solde à la livraison**, sauf pilier 1 et formations. Le premier versement de 30 % est encaissé avant démarrage | Q47 (05/09) · QS26 (18/09) |
| D17 | **On vend au forfait, pas au jour.** Le TJM peut apparaître dans le discours commercial, **jamais sur un devis** | Q43 (05/09) |
| D18 | **Catalogue validé.** Il gagne deux prix : Templates Marketplace Notion **20 € HT** · Agents personnalisés Notion **500 € HT**. **Pass Solo** : **30 €/mois ou 300 €/an** (les deux mois offerts sont voulus) | Q41, Q42 (05/09) |
| D19 | **6 mois d'accès à la Learning App offerts** pour tout achat des piliers 2 et 3 | Q44 (05/09) |
| D20 | Le **cahier des charges fonctionnel** Notion (`Features — CdCF`, 222 lignes) est **archivé** : il sort du périmètre. `docs/CDC/` du dépôt en est la copie la plus dérivée | Q62 (05/09) |
| D21 | **Contenus et compétences, l'état réel** : l'écart de production pédagogique est confirmé, plus élevé que supposé (« quasiment produit, 70 % » est invalidé) ; le référentiel de compétences est à 30 %, il vit dans **`referentiel.json` en git** (204 compétences, 85 avec descripteurs Dreyfus) et **aucun JAC n'existe encore** | Q59, Q60 (05/09) · QS19 (18/09) |
| D22 | **RGPD** : la conformité entre dans le périmètre et doit y être résolue ; **pas d'avocat** pour la valider (réserve R14 du journal : la phrase est ambiguë sur l'existence des documents) | Q76 (05/09) · QS27 (18/09) |

> **✅ D6 reconduit le 24/09.** « Pas de prix public » avait été décidé le 10/06 et
> tenu le 28/07 parce que le business model n'était pas figé ; il l'est depuis le
> 31/08 (catalogue chiffré, validé le 05/09). La raison d'origine avait disparu :
> Chloé a reconduit la décision sur sa nouvelle base — « pas de prix public pour
> l'instant ».
>
> **⚠️ « Transverse » n'est pas un pilier d'offre — à vérifier dans le journal.**
> Le journal des décisions (Q9, 05/09) écrit « Quatre piliers : Tech · Upskilling ·
> Studio · Transversal », et QS7 (18/09) fige le mot « Transverse » en ajoutant une
> case « Pilier de revenu » à la base Notion `Piliers`. C'est un **axe de classement
> interne** du projet Agents (il sert à ventiler tâches, agents et coûts, pour
> `ANALYTICS-01` et `FIN-03`), pas une offre. Le journal lui-même note que QS7
> « s'appuie sur des décisions D9/D10 introuvables » (réserve R1), et **Chloé ne
> reconnaît pas ce quatrième pilier (24/09)**. Ce registre garde donc D9 pour l'offre ;
> la ligne Q9 du journal est à relire par Chloé.
>
> ✅ ~~Deux règles de paiement coexistent sans arbitrage~~ — **levé le 24/09.**
> L'acompte de 50 % à la signature venait de la session 3 du 31/08 ; **Q47** (05/09,
> ferme) est postérieure et pose 30 % / 40 % / 30 %, que QS26 (18/09) confirme. Par
> la règle du journal, la ligne la plus récente l'emporte → **D16**.

---

## §2 — CE QUE DIT LE CODE (vérifiable à tout moment)

Ces lignes se vérifient en ouvrant `src/`. Elles ne périment pas en silence : si
le code change, elles deviennent fausses et se corrigent ici.

| # | Fait | Où le vérifier |
|---|---|---|
| C1 | Positionnement affiché : **« Studio expert en Skills-Based Organization »** — conforme à D8 depuis le 16/09 (commit `c54dd5ab`, « le mot que la réunion du 31 août a retiré ») ; la méta par défaut dit « studio expert en Skills-Based Organization. Ingénierie pédagogique, agents IA et transformation des organisations… » | `MarketingHome.tsx` · `SEOHead.tsx` · `MarketingFooter.tsx` |
| C2 | Méthode **STRIDE**, six verbes : S'orienter · Tester · Réaliser · Intégrer · **Déployer** · Évoluer | `MarketingAccompagnement.tsx` |
| C3 | Routes du site : **`/website/*`** (l'ancien `/marketing/*` est périmé depuis le 03/07) | `src/App.tsx` |
| C4 | La page Formation **n'existe plus** : `/website/formation` redirige vers `/website/learning-app` | `src/App.tsx` |
| C5 | Arborescence complète du site V1 | [`docs/site/SITEMAP-V1.md`](../site/SITEMAP-V1.md) |
| C6 | Copywriting arbitré des pages | [`docs/site/propositions-PAD/`](../site/propositions-PAD/) |
| C7 | Il n'existe **aucune photo des fondateurs** : la page affiche des monogrammes | `MarketingEquipe.tsx` |
| C7b | La page **STRIDE ne vend plus** : Audit Flash, livrables contractuels et CTA d'achat retirés le 16/09, la page devient une page de méthode | `MarketingAccompagnement.tsx` |
| C8 | Learning App : **un MVP est en ligne depuis janvier 2026 et quatre clients bêta l'utilisent.** Ce qui est arrêté (D12), c'est le lancement de la version techniquement scalable — fonctionnellement très proche. La formule « bêta ouverte » disait mal cet état. ⚠️ **Ce dépôt (`frontend-tls`) n'est pas ce que voient les bêta** : c'est un front seul (précisé par Chloé le 23/09) — ne pas traiter `main` comme de la production | réponse Q2, 31/08 · Chloé, 23/09 |
| C9 | **Aucun prix n'est affiché** sur le site | conforme à D6 — vérifiable dans `src/pages/marketing/` |

> **✅ C1 résolu le 16/09.** Le 16/09, le registre notait que le code disait
> encore « cabinet de conseil » alors que D8 abandonnait ce mot. Le même jour,
> le commit `c54dd5ab` a retiré les onze occurrences : le H1 de l'accueil, le pied
> de page, la méta description par défaut de toutes les pages (`SEOHead.tsx`) et
> la page Fondateurs disent « studio ». Revérifié le 24/09 : plus aucune
> occurrence de « Cabinet de conseil » dans `src/`.

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
| ~~**Catalogue d'offres**~~ | ✅ **Reconstruit le 31/08/2026** — douze offres, avec prix, unité, pilier et statut — puis **validé le 05/09** (Q41, deux prix ajoutés). Voir D9 et D15 à D19, et la fiche **Tarifs** de la base Notion « Website pages » |
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
