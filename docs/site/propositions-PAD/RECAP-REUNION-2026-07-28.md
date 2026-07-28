# Récap post-réunion — Site Internet V1 & Vision Stratégique TLS

> **Date :** 28 juillet 2026 · **Usage :** synthèse de reprise de projet après le point Chloé/Pierre-Armand du jour.
> **Companion :** [PREP-REUNION-VISION-STRATEGIQUE.md](PREP-REUNION-VISION-STRATEGIQUE.md) (prep, écrit avant la réunion — ce doc en est la suite : ce qui a été tranché, ce qui reste ouvert).
> **Sources croisées :** transcript + résumé structuré de la réunion (Notion "Point TLS interne") · [SSOT-PAD-2807.md](SSOT-PAD-2807.md) · [CATALOGUE-OFFRES-GOUVERNANCE.md](CATALOGUE-OFFRES-GOUVERNANCE.md) · les 9 pages `PAD-page-*.md` · `ETUDE-VIABILITE-LEARNING-APP.md` · `STRATEGIE-REALIGNEMENT-H2-2026.md` · `FACTS-CANON.md`.

---

## 0. Où on en est

La réunion a eu lieu. PAD a produit un corpus complet : 1 doc Vision, 1 SSOT opérationnel (RACI + calendrier + backlog), 1 Catalogue d'offres chiffré, et **les 9 pages de copywriting du site** (Homepage, Learning App, Studio IA & Pédagogie, Accompagnement STRIDE, Upskilling, Bibliothèque de compétences, Méthode TLS, Autodiagnostic, Fondateurs). Tout est maintenant mirroré dans `docs/site/propositions-PAD/`.

**Le mode de travail convenu en réunion** (explicite dans le transcript) : Chloé reprend les textes de PAD page par page et construit le site directement, en ajustant ce qui ne va pas — pas d'allers-retours longs avant intégration. PAD a proposé de rester disponible pour du feedback design (références Mobbin/Awwwards) si besoin.

---

## 1. Les 8 décisions de PREP-REUNION — ce qui a été réellement tranché

| # | Décision attendue | Résultat |
|---|---|---|
| 1 | Adopter le doc Vision comme cadre | ✅ Confirmé — mais convergence obtenue **sans** que PAD ait lu nos docs (ETUDE-VIABILITE, H2) ni que Chloé ait lu les siens en détail avant la réunion. Les deux se sont alignés indépendamment. |
| 2 | Bas de funnel = RDV B2B, pas démo produit | 🟡 Non re-débattu explicitement, mais rien dans les 9 pages ne le contredit — chaque page finit sur un CTA de rendez-vous, pas un funnel self-serve. |
| 3 | Combien de canaux tenir | ✅ **Résolu, plus net que notre reco.** PAD lui-même : *"le Livre et Substack, la YouTube vidéo, pour moi, ce serait genre bonus... ce qu'il faudrait faire, c'est vraiment le LinkedIn, le magazine blog."* Confirme notre Hypothèse B sans qu'on ait eu à l'argumenter. |
| 4 | Un seul auto-diagnostic (SBO) au lancement | ❌ **Non retenu** — la [spec autodiagnostic](PAD-page-autodiagnostic.md) couvre les DEUX diagnostics (SBO + IA Readiness) en détail, barème et questions compris pour chacun. La logique métier des deux est déjà codée côté PAD ; reste le front-end. Le risque "2 web apps à développer" est donc moindre qu'anticipé — c'est surtout du front à faire, pas de la conception. |
| 5 | "La Vigie SBO" ou "La Vigie IA" | ✅ **Résolu par une 3e option** : juste **"La Vigie"**, sans suffixe (nom trouvé via Gemini). ⚠️ La Homepage committée dit encore "La Vigie SBO" (§6) — à corriger à l'intégration si "La Vigie" tout court est bien le nom final. |
| 6 | Le Match formulé au futur | ✅ Confirmé, aligné avec notre reco B. PAD : *"l'objectif du match c'est d'allouer sur des projets, et ça on ne l'aura pas en 2026, je pense qu'au mieux on l'aura en mars 2027."* En attendant, le Match = Passeport de compétences ↔ contenus (un vrai match, plus modeste). |
| 7 | La page Formation existe-t-elle ? | 🟡 **Implicitement tranchée par absence** — "Formation"/C-Campus n'apparaît dans aucune des 9 pages ni dans la nav (Accueil / Learning App / Studio / Accompagnement-dropdown / Ressources-dropdown). Mais jamais dit explicitement "on la supprime" — à confirmer, sachant que C-Campus reste un canal ~34K€. |
| 8 | Périmètre de lancement (on proposait 5 pages) | ✅ **Remplacé par le SSOT** : ce n'est plus "5 pages" mais "toutes les pages de niveau 1" pour le 6 août — Accueil, Learning App, Studio IA & Pédagogie, Accompagnement (dropdown STRIDE + Upskilling), soit en pratique les 5 mêmes pages qu'on proposait + Bibliothèque de compétences en sous-page. Dates précises maintenant posées : Lot 1 = 06/08, Lot 2 = 03/09, Go-live = 07/09. |

---

## 2. Ce que la réunion a tranché en plus (nav & structure)

- **Nav confirmée** : Accueil · Learning App · Accompagnement (dropdown : Studio IA & Pédagogie, Upskilling sur-mesure, + un 3e item STRIDE) · Ressources (dropdown : Autodiagnostics, La Vigie, Magazine/Blog). Pas de page hub intermédiaire "Accompagnement" — la home (section 4, grille 3 cartes) fait déjà ce travail.
- **⚠️ Ouvert : le libellé de nav du 3e item du dropdown Accompagnement** (la page STRIDE). PAD explicitement : *"il me manque juste ce titre-là."* Ni "Accompagnement STRIDE" (redondant avec le parent) ni "Méthode STRIDE" (sonne trop explicatif, pas commercial). Piste évoquée : **"Déploiement IA & SBO"**. Le contenu de la page elle-même est prêt et finalisé — seul le libellé de nav manque.
- **Page Méthode TLS** = sous-page accessible **depuis** la page STRIDE (storytelling scientifique, pas dans le menu) — confirmé.
- **Footer** : absent de toutes les maquettes PAD, à créer de zéro (mentions légales minimum ; la page Fondateurs pourrait y vivre plutôt qu'en nav).
- **Page Magazine/Blog** : PAD ne l'a pas maquettée (*"il y a une page qui n'est pas faite, c'est la page blog"*) — liberté d'exécution en s'appuyant sur le doc de cadrage éditorial + réutiliser le design de la page "Veille" existante de la Learning App, que PAD apprécie.
- **Bibliothèque de compétences** = moteur dynamique validé (pas un catalogue) — filtre interactif Domaine/Type de skill/Niveau Dreyfus qui affiche une fiche vivante. Spec complète disponible.
- **BO/repo** : PAD dépose le back-office WordPress sur **ce même repo** (`frontend-tls`), branche `BO` + date — pas de repo séparé, pour éviter de multiplier les points d'intégration Stripe.

---

## 3. Corrections FACTS-CANON à appliquer à l'intégration (mécaniques, non ambiguës)

Ces règles sont déjà actées dans nos docs internes (`FACTS-CANON.md`) — pas des choix éditoriaux, des corrections systématiques :

1. **"Open Badge" jamais "Open Badge 2.0"** — apparaît encore ~10 fois dans les 9 pages PAD (Learning App §8, STRIDE bonus, Upskilling ×3, Bibliothèque ×3, Autodiagnostic Q8). Repéré et marqué ⚠️ dans chaque fichier `PAD-page-*.md`.
2. **"Passeport de compétences certifié"** (Autodiagnostic Q8) — retirer "certifié" ou sourcer, cf. règle déjà posée dans PREP-REUNION §5.
3. **EDRACT/EDRA → attribution C-Campus** — bonne nouvelle : déjà correctement fait dans les pages récentes (Méthode TLS, Upskilling créditent explicitement "C-Campus"). Le seul endroit encore flou est le Homepage/Learning App qui parlent de "modèle EDRA" sans le lier explicitement — à vérifier au moment d'écrire le composant, pas bloquant.
4. **Chiffre non sourcé** : Autodiagnostic §1 — *"Plus de 120 organisations ont évalué leur readiness cette année"* — à vérifier/sourcer ou retirer avant publication (aucune preuve de ce chiffre dans nos sources).

---

## 4. Ce qui reste une vraie décision à prendre (pas mécanique)

### 4.1 Learning App — 4 sections encore à arbitrer (voir [PAD-page-learning-app.md](PAD-page-learning-app.md))

Sections 1 (Hero sous-titre), 2 (Problème), 3 (Moteur), 9 (Actif stratégique) ont chacune 2-3 options concurrentes. Sections 10 (Grille tarifaire) et 11 (CTA final) sont vides.

**Proposition** : plutôt que de multiplier les allers-retours, je peux trancher moi-même en construisant (cohérence de ton avec la Homepage déjà validée, éviter la redite entre sections), et documenter le choix fait — à corriger facilement si ça ne convient pas. Sauf si tu préfères arbitrer d'abord toi-même.

### 4.2 Grille tarifaire Learning App (section 10, vide) — ✅ Résolu 28/07

Décision de Chloé : **on n'est pas encore sûrs de vouloir rendre un prix public du tout** — ce n'est pas juste une question de quel chiffre afficher (29€/129€/150€+ de la réunion vs. 30€/mois·250€/an du [Catalogue](CATALOGUE-OFFRES-GOUVERNANCE.md)), c'est la publication elle-même qui est en suspens. **Action** : ne pas construire de section pricing publique dans la V1. CTA de la section 10 → renvoyer vers un échange/contact plutôt qu'afficher un prix.

### 4.3 Page Fondateurs — attribution Fondateur 1 / Fondateur 2 — ✅ Résolu 28/07

**Confirmé par Chloé : Fondateur 1 = Pierre-Armand Dennery, Fondateur 2 = Chloé Mimault** — l'inverse de ma première lecture croisée des RACI (SSOT + Catalogue), qui avait des signaux ambigus (Product BO vs Product FO/UI-UX ne se traduisent pas directement en "qui code le produit"). Corrigé dans [PAD-page-fondateurs.md](PAD-page-fondateurs.md).

### 4.4 Page Formation / C-Campus — ✅ Résolu 28/07

**Décision de Chloé : retirée du site V1.** Cohérent avec son absence des 9 pages PAD et de la nav — pas de page Formation à construire pour le 6 août, malgré le canal ~34K€ actif (Catalogue). À reconsidérer pour V2 si besoin.

---

## 5. Documents Notion historiques — à ne PAS réutiliser

Trouvés dans la base "Docs" du projet Notion, signalés par Chloé comme faisant partie du bazar ambiant. Tous **antérieurs au pivot SBO/STRIDE** et donc non conformes aux règles actuelles :

- **"Identité visuelle - site internet"** (avril 2025) — ancienne charte couleurs (#55A1B4/#EB7724/#F8B044), différente des tokens Tailwind actuels du repo (`src/index.css`). Ne pas utiliser — les tokens du code font foi.
- **"Site internet - doc !"** (oct. 2025) — taglines "formation augmentée par l'IA" pré-SBO, périmé.
- **"Architecture Site Web 2026"** (déc. 2025) — architecture B2C "Académie" (129€/parcours, 499€/an, mentorat 799€), mentionne un FAQ sur le financement CPF-adjacent. **Contredit FACTS-CANON actuel** (pas de CPF, pas de discours B2C individuel en priorité). Ne pas utiliser.
- **"Audit & recommandations — Site vitrine TLS"** (fév. 2026, par Chloé) — bon travail d'audit UX à l'époque, mais structure de site (Formations/Conseil au lieu de STRIDE/Studio/Upskilling) et pricing (1490-2990€ formules, 29€/mois) périmés par le pivot SBO. Les patterns génériques (glassmorphism specs, checklist qualité wording) restent potentiellement réutilisables comme référence de style, pas comme contenu.

Ces 4 docs ne sont **pas** mirrorés dans le repo — inutile d'ajouter du bruit historique à `docs/site/`. Cette section sert de mémo pour ne pas les redécouvrir par erreur plus tard.

---

## 6. Prochaine étape proposée

1. Construire la **Homepage** en premier — c'est la seule des 5 pages de niveau 1 sans aucun point "à arbitrer".
2. En parallèle, trancher les 4 points de la section 4 ci-dessus (ou me laisser trancher 4.1 et attendre ton feu vert sur 4.2/4.3/4.4).
3. Enchaîner Studio IA & Pédagogie et Accompagnement STRIDE (également sans arbitrage en attente).
4. Learning App et Upskilling en dernier parmi les 5, une fois 4.1/4.2 réglés.
5. Bibliothèque de compétences, Fondateurs, Méthode TLS, Autodiagnostic (front) ensuite — ce sont des pages de niveau 2, hors deadline du 6 août selon le SSOT.

*Fin — 28 juillet 2026.*
