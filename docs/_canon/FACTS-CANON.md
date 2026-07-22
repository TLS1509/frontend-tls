# FACTS-CANON.md — Faits validés TLS (source de vérité unique)
> ⚠️ Tant qu'une ligne n'est pas marquée ✅ par Chloé, elle est **❓ NON VÉRIFIÉE** — possiblement un exemple/chiffre généré par IA.
> Une fois validée, cette fiche prime sur TOUS les autres docs. Tout le reste s'y conforme.
> Statut ligne : ✅ vrai · ✏️ corriger (valeur à droite) · ❌ faux/à supprimer · ❓ à valider · 🤷 je ne sais pas encore
> Créée 2026-06-10 suite à l'audit (les docs marketing contiennent du copy + des chiffres IA non fiables).

> ⏸️ **PRICING & BUSINESS MODEL = NON FIGÉS (2026-06-10).** Les lignes de prix (F7-F9, A3-A5, L2-L4) et les chiffres business (C4-C6) sont **gelées** : on ne les valide PAS maintenant. **Base de travail provisoire = le CDC** (cahiers), à affiner plus tard via une **analyse pricing / business model / business plan dédiée**. Ne pas propager ces chiffres comme « validés ».
> 🗑️ **Le site HTML statique (`website/site/`) a été SUPPRIMÉ le 2026-07-22** — il était périmé et orphelin (aucune référence build, absent de `dist/`). Le site vitrine vit désormais **uniquement** dans `src/pages/marketing/*` (routes `/website/*`, React). Toute « action site » ci-dessous se lit comme visant ces pages React. Historique HTML récupérable dans git.

---

## 1. FORMATION — « Le Formateur Augmenté par l'IA »

| # | Fait | Valeur revendiquée (docs) | Statut |
|---|------|---------------------------|--------|
| F1 | Le produit existe et s'appelle « Le Formateur Augmenté par l'IA » | oui | ✅ (PDF C-Campus) |
| F2 | Nombre de modules (cours digitaux) | **7** | ✅ (PDF C-Campus) |
| F3 | Durée totale des cours | **7h00** (7 cours × 1h) ; +1h auto-positionnement, +3h coaching en option | ✅ (PDF C-Campus) |
| F4 | Format | **100 % à distance** | ✅ (PDF C-Campus) |
| F5 | Partenaire / hébergeur certifiant | **C-Campus** (TLS = « société partenaire » qui fournit l'expertise/consultants) | ✅ (PDF C-Campus) |
| F6 | Badge délivré | Open Badge **« L'IA en formation »**, émis par **C-Campus** | ✅ (PDF C-Campus) |
| F7 | Formule 1 | AUTONOME — **249 € HT** (7 cours) | ⏸️ valeur publique confirmée, business model gelé |
| F8 | Formule 2 | OPEN BADGE — **369 € HT** (+ badge + 2 épreuves) | ⏸️ idem |
| F9 | Formule 3 | COACHING — **890 € HT** (+ 2 séances 2×1h30) | ⏸️ idem |
| F10 | Éligibilité financement | **OPCO ✅ / CPF ❌** — éligible OPCO (C-Campus Qualiopi), **jamais CPF** | ✅ (Chloé 2026-06-10) |
| F11 | Registre / voix (D5) | **vous** sur tout le public (Home, Formation, Conseil, About, LA-marketing) ; **tu** seulement dans l'app connectée. *Argument : le PDF C-Campus s'adresse déjà aux formateurs en « vous ».* → page Formation à repasser en « vous » (code fait « tu » auj.) | ✅ (Chloé 2026-06-10) |

### ✅ Source officielle : PDF C-Campus « Le Formateur Augmenté par l'IA » (fourni par Chloé, 2026-06-10)
Fiche commerciale C-Campus. TLS y est désignée « société partenaire » (https://thelearningsociety.fr/) dont les consultants apportent l'expertise. Doc primaire = prime sur la page web.

**Les 7 cours digitaux (titres officiels, ordre programme) :**
1. Le Formateur Augmenté par l'IA : Une Révolution Pédagogique
2. Le Prompt Engineering pour le Formateur : Maîtriser la Communication avec l'IA
3. Choisir les bons outils d'IA en fonction de son contexte de formation
4. Découvrir l'IA dans la Conception de Formation
5. Utiliser l'IA pour enrichir l'animation et l'accompagnement sans déshumaniser
6. Automatisation Augmentée par l'IA
7. Éthique, responsabilité et accompagnement critique des apprenants avec l'IA
*(+ Auto-positionnement par questionnaire, 60 min, en amont — précise les attentes au consultant C-Campus.)*

**Open Badge « L'IA en formation » (C-Campus)** — valide l'usage de l'IA en pilotage de projet de formation / conception / animation. 2 épreuves : (a) une analyse de pratique (2 pages A4, 3000 signes max), (b) un micro-projet d'application de l'IA en contexte pédagogique. Réalisation ~1h30–2h, à rendre dans les 2 mois. Conditions : avoir suivi le parcours, animé par un intervenant habilité C-Campus.

**Public** : formateur/consultant indépendant · responsable Formation/L&D · concepteur pédagogique. **Prérequis : aucun.** **Accès** : à réception du règlement, sous 72h.

**Indicateurs C-Campus (→ C1/C2)** : « 578 personnes formées en 2023 sur le thème de la formation de formateur » ; « +93 % de satisfaction aux formations de formateurs C-Campus ». = stats **C-Campus**, jamais TLS (C3).

**F10 — tranché (Chloé 2026-06-10) : OPCO oui, CPF non.** Éligible **OPCO** (C-Campus Qualiopi), **PAS CPF** (pas d'enregistrement RNCP/RS). → **Action site** : la page TLS en ligne doit **retirer « CPF »** et **garder « OPCO »** ; le build local `website/site/` (qui n'affiche aujourd'hui ni l'un ni l'autre) **peut afficher OPCO**. ⚠️ **Ne jamais afficher CPF.** Corrige aussi l'audit **M5** : « retirer CPF seulement », pas OPCO.

⚠️ **Piège dans le PDF** : il contient aussi une grille « Pack Basic / Open Badge / Coaching » d'un **autre** produit C-Campus (« Concepteur de formation », cours C01–C06 + jeu « La pédagothèque ») — **ne pas confondre** avec « Le Formateur Augmenté par l'IA » (les 7 cours IA + badge « L'IA en formation »). Les deux sont à 249/369/890 € HT.

## 2. ACCOMPAGNEMENT / CONSEIL — méthode STRIDE

| # | Fait | Valeur revendiquée | Statut |
|---|------|--------------------|--------|
| A1 | STRIDE est une méthode de conseil en 6 étapes | oui | ✅ (Notion + CDC 11) |
| A2 | Les 6 mots (ordre acronyme) | S'orienter · Tester · **Réaliser · Intégrer** · Déployer · Évoluer | ✅ (Notion + audit M3) |
| A3 | Mission « Méthode STRIDE » — prix | **10 000 € HT** | ❓ |
| A4 | Mission « Solutions IA Plug & Play » — prix | **7 500 € HT / projet** | ❓ |
| A5 | Mission « Upskilling L&D sur-mesure » — prix | **20 000 € HT / projet** | ❓ |
| A6 | Bonus : abonnement Learning App offert 1 an pour contrat STRIDE | oui | ✅ (Chloé 2026-06-10) |
| A7 | Cible : ETI 200–2 000 salariés + OF | oui | ✅ (Notion Positionnement) |

## 3. LEARNING APP

| # | Fait | Valeur revendiquée | Statut |
|---|------|--------------------|--------|
| L1 | Statut | bêta ouverte | ✅ |
| L2 | Modèle de prix CANONIQUE (décision D2) | **crédit-based, 4 plans** (Gratuit / Plan 1 / Plan 2 / Plan 3) | ❓ |
| L3 | Prix au crédit | Plan 1 ≈ 2 € · Plan 2 ≈ 1,50 € · Plan 3 ≈ 1 € | ❓ |
| L4 | (Site actuel affiche) abonnement plat | Pass Solo 30 €/mois · Pass Pro 250 €/an | ❓ à réconcilier |
| L5 | 1er client entreprise | « grand groupe français », Dinootoo opérationnel depuis **janvier 2026** | ✅ (Notion DB : « Ingénieur péda augmenté avec Dinootoo @Orange », Publié 19/01/2026) |
| L6 | Ce client est Orange (à ne pas nommer publiquement) | oui (usage interne uniquement) | ✅ |
| L7 | Programme « Ingénieur Pédagogique Augmenté » (Dinootoo) | existe, déployé chez ce client (40h, Avancé) | ✅ (Notion DB) |
| L8 | Fonctions | Passeport (Dreyfus 1-5), parcours adaptatifs, coaching 1-1, journal réflexif, veille, matching IA | ✅ (CDC 02/04/05/07/11) |
| L9 | Badges compétences de l'app | **Open Badges 2.0 self-hosted** (≠ badge formation C-Campus) | ✅ (CDC 05, D1) |

## 4. CHIFFRES & STATS (les plus suspects)

| # | Fait | Valeur revendiquée | Statut |
|---|------|--------------------|--------|
| C1 | C-Campus — personnes formées en **2023** (thème « formation de formateur ») | **578** | ✅ (PDF C-Campus) |
| C2 | C-Campus — taux de satisfaction (formations de formateurs) | **+93 %** | ✅ (PDF C-Campus) |
| C3 | Ces 2 chiffres = stats C-Campus (jamais présentés comme stats TLS) | oui | ✅ |
| C4 | Taille marché citée | 32 Md€ (formation pro) ? 1,7 Md€ (EdTech) ? — **incohérent entre docs** | ❓ |
| C5 | Nombre d'EdTech en France | « 800+ » | ❓ |
| C6 | CA visé | 260 700 € | ❓ |
| C7 | RÈGLE : aucune métrique TLS inventée (satisfaction, adoption, turnover, complétion) | à respecter | ✅ (règle, pas un fait) |

## 5. MARQUE & FONDATEURS

| # | Fait | Valeur revendiquée | Statut |
|---|------|--------------------|--------|
| M1 | Fondatrice | **Chloé Mimault** — tech, conception pédagogique, produit (pilote la Learning App) | ✅ (Notion + Pappers, DG) |
| M2 | Fondateur | **Pierre-Armand Dennery** — commercial, delivery, animation (concepteur Formateur Augmenté) | ✅ (Notion + CDC 11) |
| M3 | Aucun autre membre d'équipe affiché (pas de fictifs) | oui | ✅ (Chloé) |
| M4 | 3 mots de marque | Stratégique · Augmenté · Humain | ✅ (Notion Positionnement) |
| M5 | Année de fondation | **2022** — immatriculée le **10/01/2022** (SAS, SIREN 909 413 841) | ✅ (Pappers) |
| M6 | Localisation | **Paris, France** (26 rue Olivier Noyer, 75014) | ✅ (Pappers + Chloé) |
| M7 | « L'Académie » | n'existe pas — ne jamais référencer | ✅ (audit) |
| M8 | Positionnement | « OS des organisations Skills-Based » / boucle Learn→Do→Match | ✅ (Notion + CDC 11) |

---

## Légende d'usage
Chloé passe chaque ligne : remplace ❓ par ✅, ou écrit la **bonne valeur** si ✏️, ou ❌ si à supprimer, ou 🤷 si à creuser.
Une fois la fiche stabilisée → on propage aux docs (audit M1-M10), au site, et aux specs.
