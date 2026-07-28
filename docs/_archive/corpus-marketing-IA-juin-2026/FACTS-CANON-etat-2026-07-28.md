# FACTS-CANON.md — Registre des faits TLS

> **Ce que ce doc est.** Un **registre de faits daté**, avec la source de chaque
> ligne. On vient y vérifier une affirmation avant de l'écrire quelque part.
>
> **Ce que ce doc n'est pas.** Un arbitre. La version précédente affirmait
> « une fois validée, cette fiche prime sur TOUS les autres docs, tout le reste
> s'y conforme » — ce qui l'a transformée en autorité opposable alors qu'elle
> vieillit comme n'importe quel document.
>
> ### Ordre de préséance, quand deux sources se contredisent
> 1. **Le code** (`src/`) et le site réellement en ligne. C'est ce que voient les
>    visiteurs, donc c'est la réalité.
> 2. **Une décision datée de Chloé**, tracée dans un récap de réunion.
> 3. **Ce registre**, pour tout ce que 1 et 2 ne tranchent pas.
> 4. Le reste des docs.
>
> Statut par ligne : ✅ vérifié · ❓ à valider · ⏸️ gelé, ne pas propager ·
> ⛔ interdit d'écrire.
>
> Créé le 2026-06-10. **Refondu le 2026-07-28** : retrait de l'offre Formateur
> Augmenté, ajout des interdits explicites, correction de l'adresse et du client
> Learning App, séparation du livré et du spécifié.

---

## 0. LES INTERDITS — à lire avant d'écrire quoi que ce soit de public

Ces lignes ne sont pas des préférences. Chacune corrige une erreur qui a déjà été
écrite dans au moins un doc du repo.

| # | Interdit | Pourquoi | Formulation admise |
|---|---|---|---|
| X1 | ⛔ **Ne jamais écrire que TLS est Qualiopi** | TLS **n'est pas** organisme certifié. C-Campus l'est. Plusieurs docs ont écrit « TLS est Qualiopi » ou rangé Qualiopi en colonne « Preuve » | Uniquement en attribution explicite : « C-Campus, organisme certifié Qualiopi » |
| X2 | ⛔ **Ne jamais afficher CPF** | Aucun enregistrement RNCP/RS | « Éligible OPCO » quand c'est vrai et attribué |
| X3 | ⛔ **Ne jamais écrire « Open Badge 2.0 »** | Le nom public est **Open Badge**, sans numéro de version | « Open Badge » |
| X4 | ⛔ **Pas d'AI Act en accroche marketing** | Sujet éditorial légitime (magazine, LinkedIn), jamais un argument de vente ni un bloc d'architecture de page | Traiter comme un sujet de contenu, pas comme une preuve |
| X5 | ⛔ **Aucune métrique TLS inventée** | Satisfaction, adoption, complétion, ROI, rétention : rien qui ne soit mesuré et validé par le client | Une phrase qualitative vraie vaut mieux qu'un pourcentage estimé |
| X6 | ⛔ **Aucun client nommé publiquement** | Le grand groupe = Orange, **usage interne strict**. Pas de logo sans autorisation écrite | « Un grand groupe français » |
| X7 | ⛔ **Aucun faux témoignage** | La règle n'est pas « pas de témoignages » : c'est « pas de témoignages inventés ». De vrais verbatims autorisés sont souhaités | Voir `docs/site/CASE-STUDY-ORANGE-TRAME.md` |
| X8 | ⛔ **« L'Académie » n'existe pas** | Ne jamais référencer | — |
| X9 | ⛔ **Aucun membre d'équipe fictif** | L'équipe est Mimault + Dennery, point | — |
| X10 | ⛔ **Ne plus parler de l'offre « Le Formateur Augmenté par l'IA »** | Décision Chloé du 2026-07-28 : retirée du site et de la doc. Trace dans [`_archive/OFFRE-FORMATEUR-AUGMENTE-retiree-2026-07-28.md`](../_archive/OFFRE-FORMATEUR-AUGMENTE-retiree-2026-07-28.md) | — |

**Note utile** : X1, X2, X3 et l'essentiel de X5 venaient tous de l'offre retirée
en X10. Si l'un d'eux réapparaît dans un doc, c'est qu'il a été recopié d'une
source non purgée.

---

## 1. REGISTRE & VOIX

| # | Fait | Valeur | Statut |
|---|---|---|---|
| R1 | Registre public | **vous** sur tout le site public | ✅ (Chloé 2026-06-10) |
| R2 | Registre app | **tu** dans l'application connectée uniquement | ✅ |
| R3 | SBO | **Skills Based Organisation**, jamais autre chose | ✅ |

⚠️ Deux docs marketing prescrivent encore le tutoiement pour « les formateurs
individuels ». C'est périmé : R1 s'applique à tout le public.

---

## 2. ACCOMPAGNEMENT — méthode STRIDE

| # | Fait | Valeur | Statut |
|---|---|---|---|
| A1 | STRIDE est une méthode de conseil en 6 étapes | oui | ✅ (Notion + CDC 11) |
| A2 | Les 6 mots, dans l'ordre | S'orienter · Tester · Réaliser · Intégrer · **Déployer** · Évoluer | ✅ — six **verbes**. « Déploiement » casse la série |
| A3 | Mission « Méthode STRIDE » | 10 000 € HT | ⏸️ gelé |
| A4 | Mission « Solutions IA Plug & Play » | 7 500 € HT | ⏸️ gelé |
| A5 | Mission « Upskilling L&D » | 20 000 € HT | ⏸️ gelé |
| A6 | Bonus : 1 an d'accès Learning App offert pour un contrat STRIDE | oui | ✅ (Chloé 2026-06-10) |
| A7 | Cible | ETI 200-2 000 salariés + organismes de formation | ✅ (Notion) |

⏸️ **Pricing gelé (2026-06-10, toujours valable).** Aucun prix n'est public sur
le site V1. Ne pas propager A3-A5 comme validés tant qu'une analyse pricing
dédiée n'a pas eu lieu.

---

## 3. LEARNING APP

| # | Fait | Valeur | Statut |
|---|---|---|---|
| L1 | Statut | bêta ouverte | ✅ |
| L2 | Modèle de prix | crédit-based, 4 plans | ❓ ⏸️ gelé |
| L3 | Prix au crédit | Plan 1 ≈ 2 € · Plan 2 ≈ 1,50 € · Plan 3 ≈ 1 € | ❓ ⏸️ gelé |
| L4 | Abonnement plat « Pass Solo 30 €/mois · Pass Pro 250 €/an » | **n'est plus affiché nulle part** sur le site V1 | ✅ retiré — ne pas réintroduire sans décision |
| L5 | Premier client entreprise | **un grand groupe français**, déploiement opérationnel depuis **janvier 2026** | ✅ (Notion DB, publié 19/01/2026) |
| L6 | Ce client est Orange | oui — **usage interne strict**, jamais public | ✅ voir X6 |
| L7 | Programme déployé | « Ingénieur Pédagogique Augmenté » (40 h, niveau Avancé). **Dinootoo est l'outil sur lequel portait la formation, pas le client** | ✅ corrigé le 28/07 |
| L8a | Fonctions **livrées** | Passeport (Dreyfus D1-D5), parcours adaptatifs, coaching 1-1, journal réflexif, veille | ✅ (CDC 02/04/05/07/11) |
| L8b | Fonctions **spécifiées, non livrées** | **matching IA talent ↔ projet** | ⚠️ à formuler **au futur** partout (décision réunion 28/07 §1.6) |
| L9 | Badges de compétence de l'app | **Open Badge** auto-hébergé (distinct du badge C-Campus) | ✅ — voir X3, jamais « 2.0 » |

⚠️ **L8b est le piège le plus fréquent du corpus.** Le Match apparaît au présent
dans plusieurs docs (« le passeport permet de recommander les bons talents »,
« l'allocation par organigramme, c'est fini »). La brique n'existe pas. Toute
formulation doit être au futur : « alimentera », « préparera le terrain ».

---

## 4. CHIFFRES

| # | Fait | Valeur | Statut |
|---|---|---|---|
| C1 | C-Campus — personnes formées en 2023 (formation de formateur) | 578 | ✅ (PDF C-Campus) |
| C2 | C-Campus — satisfaction formations de formateurs | +93 % | ✅ (PDF C-Campus) |
| C3 | C1 et C2 sont des chiffres **C-Campus** | jamais présentés comme TLS | ✅ |
| C4 | Taille du marché formation pro / EdTech | 32 Md€ ? 1,7 Md€ ? | ❓ ⛔ **incohérent entre docs, non publiable** |
| C5 | Nombre d'EdTech en France | « 800+ » | ❓ ⛔ non sourcé, non publiable |
| C6 | CA visé | 260 700 € | ❓ ⏸️ interne uniquement |

⛔ **C4 et C5 ne sont pas publiables.** Un doc du repo les range pourtant dans
une section intitulée « FAITS AUTORISÉS (utilisables sans attribution) ». C'est
faux : ils sont gelés ici.

⚠️ **Piège de citation repéré le 28/07.** Un doc de copy affirme que les
organisations « constatent +107 % d'efficacité dans le placement des talents et
+98 % de rétention ». La source (Deloitte) dit « 107 % **plus susceptibles de** »,
ce qui est une probabilité relative, pas un gain mesuré. Ne jamais transformer
un « X % more likely » en « +X % de performance ».

---

## 5. MARQUE & FONDATEURS

| # | Fait | Valeur | Statut |
|---|---|---|---|
| M1 | Fondatrice | **Chloé Mimault** — tech, conception pédagogique, produit | ✅ (Notion + Pappers, DG) |
| M2 | Fondateur | **Pierre-Armand Dennery** — commercial, delivery, animation | ✅ (Notion + CDC 11) |
| M3 | Équipe affichée | ces deux personnes, aucune autre | ✅ voir X9 |
| M4 | 3 mots de marque | Stratégique · Augmenté · Humain | ✅ (Notion Positionnement) |
| M5 | Fondation | **2022**, immatriculée le 10/01/2022 (SAS, SIREN 909 413 841) | ✅ (Pappers) |
| M6 | Siège social | **26 bis, rue Olivier Noyer, 75014 Paris** | ✅ tranché par Chloé le 28/07. L'ancienne valeur « 26 » était fausse |
| M7 | Positionnement | « Cabinet de conseil & studio expert en Skills-Based Organization » | ✅ formulation du site V1, refonte 28/07 |
| M8 | Partenariat | **C-Campus**, référence française de l'ingénierie de formation et de l'AFEST | ✅ — c'est C-Campus qui certifie, voir X1 |
| M9 | Photos des fondateurs | **n'existent pas** à ce jour ; la page Fondateurs affiche des monogrammes | ✅ constat 28/07 |

⚠️ **M7 remplace l'ancienne formulation « OS des organisations Skills-Based »**,
qui vivait dans le canon mais n'a jamais été le positionnement du site.

---

## Comment se servir de ce registre

Avant d'écrire une affirmation vérifiable dans un doc, un contenu ou une page :
chercher la ligne ici. Si elle n'y est pas, elle n'est pas validée — et une
affirmation non validée ne se publie pas, elle se vérifie ou se retire.

Si le code dit autre chose que ce registre, **le code gagne** et c'est ce
registre qu'il faut corriger.
