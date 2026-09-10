# 📑 Documentation Index — The Learning Society

**Last updated**: 2026-07-25 | **Total docs**: ~134 fichiers (hors `_archive/`)

> 🥇 **Avant toute session marketing ou site : lire [`_canon/FACTS-CANON.md`](_canon/FACTS-CANON.md)** — le registre des faits, avec ses interdits en §0.
> **Ordre de préséance (revu le 28/07)** : (1) le code et le site en ligne, (2) une décision datée de Chloé, (3) ce registre, (4) le reste des docs. Le canon n'est plus présenté comme un arbitre absolu : il vieillit comme les autres.
> ⛔ **Le corpus site & copy de juin 2026 a été archivé le 28/07** → [`_archive/corpus-site-juin-2026/`](_archive/corpus-site-juin-2026/). Neuf docs, même dernier commit du 11/06, décrivant un site qui n'existe plus.

> 🧹 **Nettoyage 2026-06-30** : ~20 docs déversés en vrac (racine repo + `docs/`) par des sessions d'agents ont été re-rangés. Nouveaux sous-dossiers `_phases/`, `charts/`, `briefs/`. 4 audits Figma du 26/06 marqués `⚠️ FIABILITÉ NON VÉRIFIÉE` (claims non vérifiés contre le fichier Figma). `.claude/worktrees/` (40 Mo) + `.agents/skills 2/` + `docs/_old-sessions/` supprimés. Voir règles d'hygiène doc dans `CLAUDE.md`.

---

## 🎯 Fichiers clés (top 5)

| Fichier | Description | Taille | Utiliser pour |
|---------|---|---|---|
| [product/PRODUCT.md](../PRODUCT.md) | Config projet, version, routes | — | Démarrer une session, setup MCP |
| [product/DESIGN.md](../DESIGN.md) | Design system Tailwind, patterns | — | Vérifier tokens, conventions styling |
| [_canon/FACTS-CANON.md](_canon/FACTS-CANON.md) | **Faits validés TLS** (offres, prix, badge, registre) | — | **Toute session marketing / site : lire EN PREMIER** |

---

## 📂 ROOT — Docs stratégiques

**Actifs:**
- `IMPLEMENTATION_ORDER.md` — Ordre exécution recommandé phases
- `README.md` — Navigation guide (ce fichier vous amène ici)
- `INDEX.md` ← vous êtes ici

---

## 📋 CDC/ — Cahiers de charges (source de vérité)

**16 modules spécification métier** — NE PAS modifier sans approbation métier.

| # | Cahier | Focus | Status |
|---|--------|-------|--------|

**Utilities:**
- `FO_PAGES_INVENTORY.md` — 140+ routes FO learner (83 screens × 2 tiers)
- `BO_PAGES_INVENTORY.md` — Back-office WordPress pages (hors scope)
- `PLUGIN_DEPENDENCY_ANALYSIS.md` — Module dependencies, critical path

---

## 📊 _AUDITS/ — Rapports consolidés

**12 audit reports** — analyses de qualité, gaps design, spec compliance.

| Fichier | Type | Focus |
|---------|------|-------|
| [**PLAN-REPRISE-DESIGN-2026-09-09.md**](_audits/PLAN-REPRISE-DESIGN-2026-09-09.md) | 🎯 **Point d'entrée après la pause** | Reprise du 09/09 après 6 semaines sans commit, tout remesuré de première main. Ce qui recadre : **30 commits non poussés**, le site en ligne **toujours WordPress pré-pivot** (cible du 06/08 manquée, 2 claims interdits toujours publics), build vert. Porte l'état des **4 volets** (app / DS / site / corpus formations), les **17 arbitrages design** et leur ordre de dépendance, l'audit **« agency grade » des 3 échelles** (20 crans typo dont 3 vocabulaires pour « grand titre » · rayons : 204 `rounded-full` interdits + 22 `rounded-3xl` sans token · `ink-400` sur 355 textes), l'état des **bancs et artefacts** (aucun n'enregistre ses décisions), l'état **Figma** vérifié, et un avis chiffré sur le **cut down des docs de référence**. Thèse : **une seule décision commande tout** — le site et l'app partagent-ils leur système, ou non |
| [**fondations-tls-2026-09-09.html**](_audits/fondations-tls-2026-09-09.html) | 🧪 **Banc de décision** | Source de l'artefact « Fondations TLS » (https://claude.ai/code/artifact/c94a764a-86e4-4413-a3f9-679824b947b7), jusqu'ici publié **sans source versionnée**. Page autonome qui calcule ses contrastes en direct et enregistre les **24 arbitrages** de fondation (T1–T10 typo · C1–C7 couleur · A1–A3 a11y · R1–R4 rayons) en `localStorage`, avec export Markdown. ⚠️ Les choix vivent dans le navigateur : ils ne voyagent pas avec la page. Typo remesurée le 09/09 (2ᵉ passe) : les comptes de la 1ʳᵉ version étaient relevés par sous-chaîne (`text-body` ramassait `body-sm` et `body-lg` → 1 138 au lieu de 237). La section « L'encre » porte un avertissement : elle précède l'application de la rampe variante A |
| [**INTEGRATION-CORPUS-FORMATIONS.md**](product/INTEGRATION-CORPUS-FORMATIONS.md) | 🌱 **Comment seeder le vrai contenu** | Passer des 34 modules corrigés de `chloe/modules-corriges-2026-07-23/` à des données d'app. Le mapping est direct — les modules sont en **EDRACT** (6 sections), l'app attend Parcours › Étape › Leçon, soit 10 étapes × 6 leçons pour Neuro-Éducation. **Le verrou n'est pas le contenu mais le modèle de données** : `Lecon` ne porte aucun champ de contenu, qui vit en dur dans `LessonPlayer.tsx` (1 998 l.). Contient le type `LessonBlock` proposé, la procédure en 8 étapes, et les pièges (store vs mock, les 7 pages consommatrices, le positionnement qui dépend des compétences) |
| [PARITE-FIGMA-CODE-2026-07-29.md](_audits/PARITE-FIGMA-CODE-2026-07-29.md) | **Vérifié de première main** | Figma ↔ code, relevé sur le fichier via le MCP authentifié : **26/26 couleurs identiques**, 4/4 tailles de typo, rayon pill OK. Un seul écart réel — les **ombres**, restées au noir pur côté Figma alors que le code est passé aux neutres TLS le 22/07. Les interlignes diffèrent mais sont inertes (bouton en flex à hauteur fixe). Code Connect inaccessible : exige Organization/Enterprise, TLS est en pro |
| [CHANTIER-SHOWCASE-2026-07-28.md](_audits/CHANTIER-SHOWCASE-2026-07-28.md) | **Chantier ouvert** | Reconstruire `/components` : 6 causes mesurées (0 sommaire, 1 ancre sur 8 524 lignes, pas de `scroll-mt`, tout monté d'un coup, chunk de 3,9 Mo, 320 exportés vs 185 déclarés). Plan en 5 phases, 3 décisions à prendre |
| [AUDIT-FIGMA-ATOMS-COMPOSITES-2026-07-03.md](_audits/AUDIT-FIGMA-ATOMS-COMPOSITES-2026-07-03.md) | Figma↔code (vérifié 1ère main) | Atoms+Composites : variants vs codebase + binding variables/styles. §08 créé, gaps tone-aware Avatar/StatCard, token "locked" grays |
| [AUDIT-FIGMA-CODE-GAP-2026-07-03.md](_audits/AUDIT-FIGMA-CODE-GAP-2026-07-03.md) | Gap composants DS↔code | Prérequis Phase 20 : 175 sets Figma vs code. ~158 matchés par nom ; gap bloquant = famille auth glass-dark (à créer/étendre) + ~5 stragglers (CourseCard, SegmentedControl, MessageBubble…) |
| [AUDIT-PHASE-19-2026-06-12.md](_audits/AUDIT-PHASE-19-2026-06-12.md) | Quality audit | 142 pages FO scored (Tier 1/2/3), a11y gaps, DS adoption |
| [AUDIT-PHASE-19-NOTION-DELTA.md](_audits/AUDIT-PHASE-19-NOTION-DELTA-2026-06-12.md) | Notion sync | Écrans + Design System DBs consistency check |
| [REVIEW-PHASE-19-2026-06-12.md](_audits/REVIEW-PHASE-19-2026-06-12.md) | Refinement | Chips extraction, AuthShell, HeroSection sunset decisions |
| [FIGMA-AUDIT-REPORT-2026-06-12.md](_audits/FIGMA-AUDIT-REPORT-2026-06-12.md) | Design-Dev sync | React components vs Figma DS gaps, 3 missing components |
| [FIGMA-FOUNDATIONS-AUDIT-2026-07-23.md](_audits/FIGMA-FOUNDATIONS-AUDIT-2026-07-23.md) | Token parity | Figma variables ↔ Tailwind @theme cross-check |
| [FLOWS-TIER1-SYNTHESIS-2026-06-12.md](_audits/FLOWS-TIER1-SYNTHESIS-2026-06-12.md) | Daily-use analysis | 33 Tier 1 pages patterns, UX clarity scoring |
| [AUDIT-CLAUDE-MD-CONTEXT-2026-07-25.md](_audits/AUDIT-CLAUDE-MD-CONTEXT-2026-07-25.md) | Context engineering | CLAUDE.md (2747 l) + mémoire vs règles Claude 5 : KEEP 388 / POINT 534 / EXTRACT 872 / CUT 806. Preuve de dérive tokens, doublons Phase 14+/16, liens morts, plan de refonte 2 passes |

---

## 🎨 SITE/ — Design & site vitrine (26 fichiers)

> 🧭 **Contexte-maison du site marketing** (projet séparé de l'app) : [`site/CONTEXT-SITE-MARKETING.md`](site/CONTEXT-SITE-MARKETING.md) — code (`src/pages/marketing/`), outillage motion (framer défaut / gsap pour le scroll complexe), primitives, patterns, pièges. **Point d'entrée de toute session site.** ⚠️ Depuis le 29/07, **aucun effet n'est banni** — la direction motion est à rejouer dans une passe dédiée.

> 🧹 **Indexé le 2026-07-22.** 20 des 25 fichiers étaient absents de l'index (= docs fantômes au sens de la règle d'hygiène #2 de CLAUDE.md). Aucun n'a été supprimé ; l'inventaire ci-dessous les rend visibles. Les statuts marqués « à re-valider » n'ont **pas** été vérifiés doc par doc — ils signalent une antériorité à des décisions plus récentes, pas une fausseté établie.

**Structure & état du site**

| Fichier | Purpose |
|---|---|
| [**BRIEF-REDESIGN-SITE-V1.md**](site/BRIEF-REDESIGN-SITE-V1.md) | 🎯 **Point d'entrée du chantier redesign** (29/07) — document de passation, tous faits vérifiés de première main. Le fait qui recadre tout : **le site React n'a jamais été mis en ligne**, `thelearningsociety.fr` sert un WordPress pré-pivot, donc le 06/08 est un **remplacement** et non une refonte. Contient : l'état du code (58 sections locales dont 6 réutilisées, 0 image sur les 5 pages principales), l'état de Figma (**0 écart** tokens ↔ code sur 42 couleurs / 7 espacements / 7 rayons — la doc qui dit « le DS a dérivé » parle des composants, pas des tokens), les 14 explorations de mise en page analysées, la direction artistique (papier = humain, verre = augmenté), ce qui est tranché, et **les 3 arbitrages qui bloquent** (couleur du texte, rayons, sens des couleurs — montés au banc `/_design-lab`) |
| [CASE-STUDY-ORANGE-TRAME.md](site/CASE-STUDY-ORANGE-TRAME.md) | **Trame d'interview case study client + demandes d'autorisation** (28/07) — guide d'entretien centré changement de pratique, modèles de mail (interview, citation, logo), tableau de ce qui est publiable aujourd'hui vs ce qui demande un accord écrit |
| [SITEMAP-V1.md](site/SITEMAP-V1.md) | **Arborescence de référence du site V1** (28/07) — miroir documentaire de `src/App.tsx` : routes, redirections, statut par page, templates de contenu vs stratégie éditoriale, écart des 3 points de conversion, incohérence Notion↔code |
| ⛔ `SITE-V1-BLUEPRINT.md` | **Archivé le 28/07** → `_archive/corpus-site-juin-2026/`. Décrivait une stack HTML vanille et une page `formation.html` supprimée |
| ⛔ `SITE-V1-GROUNDING.md` | **Archivé le 28/07**. Se déclarait souverain sur tout le copywriting ; contenait une section « FAITS AUTORISÉS » libérant des chiffres gelés |
| ⛔ `SITE-STRUCTURE-DESIGN-C.md` | **Archivé le 28/07**. Exploration « Illustrated Glass » de juin, non retenue |
| ⛔ `SITE-REACT-AUDIT.md` | **Archivé le 28/07**. Audit périmé (4× Qualiopi, 6× CPF, 4× « Open Badge 2.0 ») |

✅ **Mis à jour 2026-07-28** : le sitemap et le copywriting complet du site V1 sont désormais tranchés — voir `site/propositions-PAD/` ci-dessous. L'ancien renvoi vers la page Notion "Sitemap & Structure Homepage (2026-06-29)" est périmé.

**`propositions-PAD/` — Copywriting & stratégie du site V1 (réunion 28/07/2026)**

| Fichier | Purpose |
|---|---|
| [README.md](site/propositions-PAD/README.md) | **Règle d'organisation Notion/Repo/Figma + table de provenance** (fichier ↔ original Notion ↔ mode de récupération) — actée 28/07 |
| [RECAP-REUNION-2026-07-28.md](site/propositions-PAD/RECAP-REUNION-2026-07-28.md) | **Point d'entrée** — synthèse post-réunion : ce qui est tranché vs. encore ouvert, corrections FACTS-CANON à appliquer, docs historiques à ne pas réutiliser |
| [PREP-REUNION-VISION-STRATEGIQUE.md](site/propositions-PAD/PREP-REUNION-VISION-STRATEGIQUE.md) | Prep pré-réunion (28/07) : confrontation des docs PAD à nos sources internes |
| [SSOT-PAD-2807.md](site/propositions-PAD/SSOT-PAD-2807.md) | Roadmap opérationnel : RACI, calendrier Lot1/Lot2 (06/08 → 07/09), backlog par phase |
| [CATALOGUE-OFFRES-GOUVERNANCE.md](site/propositions-PAD/CATALOGUE-OFFRES-GOUVERNANCE.md) | Catalogue d'offres chiffré (260 700€ CA cible), RACI CMT/PAD par ligne de revenu |
| `PAD-page-*.md` (9 fichiers) | Copywriting complet des 9 pages du site (Homepage, Learning App, Studio IA, STRIDE, Upskilling, Bibliothèque de compétences, Méthode TLS, Autodiagnostic, Fondateurs) |
| `PAD-vision-strategique-sitemap.md` · `PAD-strategie-contenu-b2b.md` · `PAD-blog-magazine-strategie.md` · `PAD-copywriting-upskilling.md` | Docs stratégiques source (Vision, contenu B2B, Magazine/Blog, 6 angles Upskilling exploratoires) |
| `PAD-website-pages.csv` | État de toutes les pages du site (production + propositions) |
| [prototypes/TEST-WIZARD-PAGE-AUTODIAG/](site/prototypes/TEST-WIZARD-PAGE-AUTODIAG/) | Prototype wizard autodiagnostic de Pierre-Armand (HTML/JS vanille, hors DS) — **intégré** au DS TLS dans `MarketingDiagnostic.tsx` le 28/07, conservé pour référence (structure + contenu source) |

**Copy & SEO**

| Fichier | Purpose |
|---|---|
| ⛔ `COPY-HOME.md` · `COPY-CONSEIL-SBO.md` | **Archivés le 28/07**. Copy de pages refondues depuis. `COPY-HOME` transformait un « 107 % plus susceptibles de » en « +107 % d'efficacité », verrouillé par une consigne « ne pas modifier » |
| ⛔ `SEO-CONTENT-PLAN.md` | **Archivé le 28/07** → `_archive/corpus-marketing-IA-juin-2026/`. Production IA, pilier abandonné |

**Art direction « Illustrated Glass » (verrouillée 2026-06-11)**

| Fichier | Purpose |
|---|---|
| ⛔ `DIRECTION-C-CHECKLIST.md` | **Archivé le 28/07**. Portait « Locked 2026-06-11 » et « No reopening Directions » : une exploration créative verrouillée en loi |

> ⚠️ **Homonymie à connaître** : « Direction C » désigne ici l'art direction *site* (Illustrated Glass, 11/06). Le commit `5b4e861` « remove rejected Direction C » parle d'une **autre** chose : une variante de home V2 (Editorial Motion) rejetée en juillet. Ne pas confondre les deux.

**Motion & animation**

| Fichier | Purpose |
|---|---|
| [DESIGN-INSPO.md](site/DESIGN-INSPO.md) | **Mobbin saves** (24 mobile + 34 desktop + 33 vitrine) + case study Until Labs |
| ⛔ `ANIMATION-TECHNIQUES-RESEARCH.md` | **Archivé le 28/07** — adossé à Direction C, elle-même suspendue. Le motif d'archivage d'origine (« recommandait le parallax, effet écarté ») ne tient plus : cet interdit a été levé le 29/07. Doc à re-verser ou refaire dans la passe motion |

**Recherche & inspiration** *(artefacts d'exploration, valeur de référence)*

`APP-INSPIRATION-RESEARCH.md` · `MOODBOARD-INSPIRATION-GUIDE.md` · `INSPIRATION-SEARCH-KEYWORDS.md` · `QUICK-SEARCH-TERMS.md` · `LES-ROMANTIQUES-ARTE-STYLE-ANALYSIS.md` · `PHASE-2B-DUAL-RESEARCH.md` · `PHASE-2B-COMPLETE-MAP.md` · `PHASE-2B-QUICKSTART.md` · `HERO-ASSETS-SOURCING.md`

**Figma & composants**

`FIGMA-ENRICHMENT-GUIDE.md` · `FIGMA-WIREFRAME-STRUCTURE.md` · `COMPONENT-EXTRACTION-CHECKLIST.md`

---

## 🎓 LEARNING/ — Bootcamp & Skills transfer (252K)

**12-week UX/UI design bootcamp + Framer Motion + animated logo projects**

| Fichier | Topic | Level |
|---------|-------|-------|
| [UX-UI-BOOTCAMP.md](../chloe/UX-UI-BOOTCAMP.md) | Main track | Day-by-day curriculum |
| _archivés 2026-07-24 →_ [`_archive/factcheck-corpus/`](_archive/factcheck-corpus/) | **Docs de process fact-check du corpus** (CORPUS-FORMATIONS-FACT-CHECK, PARCOURS-CORRECTIONS-DETAIL, FACTCHECK-CERTIFIED ×3) — corrections **déjà appliquées** dans les modules `modules-corriges-2026-07-23/` (journaux inline). Conservés en archive pour traçabilité. | 🗄️ Archivé |
| [CORRECTIONS-SOURCEES-UXUI.md](../chloe/CORRECTIONS-SOURCEES-UXUI.md) | **Corrections sourcées** du parcours UX/UI : chaque claim faux → correction + source RÉELLE vérifiée sur le web (auteur/année/lien) + phrase prête à coller. Contrastes WCAG recalculés (mini-tableau), section « À RETIRER », 12 sources clés (W3C, BBC 2017, McKinsey 2018, NN/g, Cowan 2001, Lally 2010, HolonIQ, PayScale, Lindgaard 2006, Intercom, Christensen) | ✅ Corrections sourcées |
| [CORRECTIONS-SOURCEES-IP.md](../chloe/CORRECTIONS-SOURCEES-IP.md) | **Corrections sourcées** du parcours Ingénierie Pédagogique : chaque claim faux → correction + source RÉELLE vérifiée sur le web (auteur/année/lien) + phrase prête à coller. Vraie taxonomie Bloom (Anderson & Krathwohl 2001), débunkage VARK (Pashler 2008 / Newton 2020 → multimodal Mayer), origine ADDIE (Branson 1975 FSU/US Army), Alliger 1997, Xunzi ≠ Franklin, mythe 60 000×, méthode ROI Phillips, prix outils T1 2026 (Synthesia/PaLM/Knewton/Smart Sparrow), section « À RETIRER », M6 → Kirkpatrick 2016 | ✅ Corrections sourcées |
| [application/AUDIT-UXUI-APP-ET-SITE.md](../chloe/application/AUDIT-UXUI-APP-ET-SITE.md) | **Application du parcours bootcamp (M01-M08) au produit réel** : les 8 lentilles passées sur le code de la learning app + site marketing, mesures WCAG de première main. 2 chantiers systémiques (contraste des tokens de marque en texte ; répétition espacée promise/non câblée + promesse site), 6 lentilles vertes, chantiers priorisés P0-P2 | 🔍 Audit produit |
| [application/cours/00-CADRE-PEDAGOGIQUE.md](../chloe/application/cours/00-CADRE-PEDAGOGIQUE.md) | **Cadre d'instructional design** des cours perso de Chloé (learner = elle, in-situ). Structure = **EDRACT®** — modèle **C-Campus** (Marc Dennery), lignée Gagné+Kolb, **à attribuer, PAS une méthode TLS** (corrige l'erreur « structure maison » du doc RECHERCHE interne). Chaque phase adossée à son fondement + un principe robuste + mappée à une surface app. Plan 3 pistes (PM / UX-UI / vibe coding) | 🧭 Cadre péda |
| [application/cours/PM-C1-Qu-est-ce-que-le-Product-Management.md](../chloe/application/cours/PM-C1-Qu-est-ce-que-le-Product-Management.md) | **Cours PM-C1** (structure EDRACT, appliqué au vrai produit) : ce qu'est le PM, la triple contrainte EdTech (désirabilité × viabilité × efficacité pédagogique), le piège des vanity metrics, ancré sur le carrefour réel « répétition espacée » de l'audit | 📚 Cours |
| [application/cours/VIBE-C1-Qu-est-ce-que-le-vibe-coding.md](../chloe/application/cours/VIBE-C1-Qu-est-ce-que-le-vibe-coding.md) | **Cours VIBE-C1** (structure EDRACT) : qu'est-ce que le vibe coding, la boucle intention→prompt→génération→**revue**→itération, vibe coding pur vs ingénierie assistée (Karpathy/Willison 2025), où ça excelle/échoue, ancré sur le cas réel des 62 erreurs TS silencieuses du dépôt | 📚 Cours |
| [application/cours/UXUI-C1-Socle-visuel-typo-couleur-contraste-espacement.md](../chloe/application/cours/UXUI-C1-Socle-visuel-typo-couleur-contraste-espacement.md) | **Cours UXUI-C1** (structure EDRACT) : socle visuel — 2 polices + hiérarchie, tokens couleur 3 couches, **contraste WCAG mesuré** (table des ratios réels : teal/orange/jaune = décor, pas texte), espacement base-4. Réutilise les mesures de l'audit du dépôt | 📚 Cours |
| [application/cours/PM-C2-Jobs-to-be-Done.md](../chloe/application/cours/PM-C2-Jobs-to-be-Done.md) | **Cours PM-C2** (structure EDRACT) : Jobs-to-be-Done (Christensen) — un job = progrès dans une situation (pas une feature), 3 dimensions (fonctionnelle/émotionnelle/sociale), concevoir contre les substituts réels (ChatGPT/YouTube/collègue/rien), les 4 forces du basculement (Moesta) | 📚 Cours |
| [application/cours/PM-C3-Objectifs-et-vanity-metrics.md](../chloe/application/cours/PM-C3-Objectifs-et-vanity-metrics.md) | **Cours PM-C3** (structure EDRACT) : deux niveaux d'objectifs (apprentissage=Bloom vs produit=SMART, le R=pertinent), vanity vs actionable metrics (Ries), loi de **Goodhart** + garde-fous (la complétion couplée à la rétention J+30), ancré sur le firewall gamification | 📚 Cours |
| [application/cours/UXUI-C2-Les-4C.md](../chloe/application/cours/UXUI-C2-Les-4C.md) | **Cours UXUI-C2** (structure EDRACT) : les 4C (Clarté=Krug, Cohérence=Jakob+composants, Contraste=1 primaire/écran, Confort=Sweller/Hick/~4 chunks Cowan) comme grille d'audit d'écran. ✅ statut « 4C » **vérifié** : genre mnémotechnique générique sans owner (≠ EDRACT) ; la combinaison Clarté/Cohérence/Contraste/Confort = sélection maison TLS, aucune attribution mais pas « le » standard | 📚 Cours |
| [application/cours/PM-C4-Priorisation-RICE.md](../chloe/application/cours/PM-C4-Priorisation-RICE.md) | **Cours PM-C4** (structure EDRACT) : priorisation **RICE** (Reach×Impact×Confidence÷Effort, Intercom 2016), le score ordonne mais ne décide pas (l'Effort domine à 2 fondateurs), le **filtre EdTech** (RGPD + validité pédagogique) avant le score, exemple travaillé sur le vrai backlog (SRS vs correctif site) | 📚 Cours |
| [application/cours/UXUI-C3-Design-tokens-et-design-system.md](../chloe/application/cours/UXUI-C3-Design-tokens-et-design-system.md) | **Cours UXUI-C3** (structure EDRACT) : design system = **source de vérité unique**, tokens 3 couches (primitive→sémantique→composant), Atomic Design (Frost), le piège du **drift** (un concept/deux valeurs, silencieux) illustré par les cas réels du dépôt (deux gris ink-900, shadows lettre-morte), détection via getComputedStyle | 📚 Cours |
| [application/cours/PM-C5-North-Star.md](../chloe/application/cours/PM-C5-North-Star.md) | **Cours PM-C5** (structure EDRACT) : North Star metric (Ellis/Amplitude) — capturer la valeur rendue, pas le temps capté ; rejeter une étoile gameable (« heures passées »), test anti-Goodhart, leading vs lagging, framework 1 North Star + 3-5 entrées + contre-indicateur, ancré « compétences validées » (passeport) | 📚 Cours |
| [application/cours/PM-C6-Ecrire-une-spec-de-feature.md](../chloe/application/cours/PM-C6-Ecrire-une-spec-de-feature.md) | **Cours PM-C6 — capstone PM** (structure EDRACT) : écrire une spec de feature (8 sections : problème/job, métrique, user stories, parcours, scope in/out, données, **critères d'acceptation testables**, risques), avec la **spec réelle du SRS** comme livrable à me confier pour build | 📚 Cours |
| [application/cours/UXUI-C4-Architecture-information.md](../chloe/application/cours/UXUI-C4-Architecture-information.md) | **Cours UXUI-C4** (EDRACT) : architecture de l'information — LATCH (Wurman), étiquetage aux mots de l'utilisateur, **piste informationnelle** (Pirolli & Card, *Information Foraging*), tri de cartes, chemin d'erreur + nav 3 niveaux | 📚 Cours |
| [application/cours/UXUI-C5-Interaction-etats-micro-interactions.md](../chloe/application/cours/UXUI-C5-Interaction-etats-micro-interactions.md) | **Cours UXUI-C5** (EDRACT) : interaction & états — TRF (Saffer), les 7 états d'un composant, timing (seuils 0,1/1/10 s, Miller/Nielsen), `prefers-reduced-motion`, gamification maîtrise vs exploitation | 📚 Cours |
| [application/cours/VIBE-C2-Le-document-de-pilotage.md](../chloe/application/cours/VIBE-C2-Le-document-de-pilotage.md) | **Cours VIBE-C2** (EDRACT) : le `CLAUDE.md` comme **system prompt** du projet — contexte durable, effet cumulatif (piège écrit = immunité), risque miroir (règle périmée se propage : `npx tsc`, EDRACT) | 📚 Cours |
| [application/cours/VIBE-C3-Les-garde-fous.md](../chloe/application/cours/VIBE-C3-Les-garde-fous.md) | **Cours VIBE-C3** (EDRACT) : garde-fous — types, **build gate** (`npm run build` pas `npx tsc`), design system ; défense en profondeur ; un gate faible est pire que pas de gate (62 erreurs) | 📚 Cours |
| [application/cours/VIBE-C4-Revoir-du-code.md](../chloe/application/cours/VIBE-C4-Revoir-du-code.md) | **Cours VIBE-C4** (EDRACT) : revoir du code non écrit — grille 4 questions, lire suppressions + contexte, le **« confiant mais faux »**, quand refuser (Bacchelli & Bird 2013, Google) | 📚 Cours |
| [application/cours/VIBE-C5-Quand-ne-pas-vibe-coder.md](../chloe/application/cours/VIBE-C5-Quand-ne-pas-vibe-coder.md) | **Cours VIBE-C5 — capstone vibe** (EDRACT) : 4 zones rouges (sécurité/archi/correction subtile/invérifiable), règle des **portes** (Bezos), Dunning-Kruger (l'IA masque l'ignorance), OWASP | 📚 Cours |

---

## 📢 MARKETING/ — Brand & content strategy (40K)

> 📌 **[PUBLICATIONS-2025-ARCHIVE.md](marketing/PUBLICATIONS-2025-ARCHIVE.md)** — les 11
> publications de 2025 extraites de Notion avant suppression. **9 articles encore en ligne
> (HTTP 200 le 10/09/2026)**, tous sur l'ancien positionnement « IA + formation ». Sert
> l'urgence « retirer les claims du site en ligne ».

> 🧾 **[INVENTAIRE-NOTION-MARKETING-2026-09-10.md](marketing/INVENTAIRE-NOTION-MARKETING-2026-09-10.md)** —
> relevé de première main du Marketing dans Notion, comptage SQL réel. **Corrige Q39** : les
> « fausses bases » hébergent les vues des tableaux de bord, les supprimer casserait le
> Dashboard Editorial. Découvre **ContentOS 2.0** (~30 pages de template importé). Checklist
> de suppression avec identifiants, pour exécution manuelle.

> ⚠️ **[LECTURE-NOTION-STRATEGIE-2026-09-10.md](marketing/LECTURE-NOTION-STRATEGIE-2026-09-10.md)** —
> lecture de première main des 7 documents stratégiques Notion + du journal de décisions.
> **9 contradictions relevées** entre les documents de juillet et les arbitrages fermes du
> 31/08. À lire avant tout tri ou refonte de la partie marketing du Notion.

**Brand voice, personas, copy, SEO, positioning**

> ⚠️ **Ordre de préséance (revu le 2026-07-28).** (1) Le code et le site en ligne. (2) Une décision datée de Chloé. (3) `_canon/FACTS-CANON.md`. (4) Le reste. Si le code contredit le canon, **c'est le canon qu'il faut corriger**.

| Fichier | Statut | Purpose |
|---------|---|---------|
| [../brand/BRAND-KIT.md](../brand/BRAND-KIT.md) | 🟢 **Fiche de marque — 2026-09-09** | Couleurs, typo, logo, pacte anti-générique, et l'inventaire daté de ce qui a divergé sur Canva / Notion / Figma / Drive. Carte du dossier : [../brand/README.md](../brand/README.md) |
| [_canon/FACTS-CANON.md](_canon/FACTS-CANON.md) | 🟢 **CANON — lire en premier** | Faits validés ligne par ligne : 7 modules / **7h** (pas 23h), C-Campus certifie (**Qualiopi jamais pour TLS**), Open Badge « L'IA en formation », **OPCO oui / CPF jamais**, **« vous » sur tout le public** (« tu » réservé à l'app), fondateurs = Mimault + Dennery seuls, « L'Académie » n'existe pas |
| ⛔ **Tout `docs/marketing/` a été archivé le 28/07** | — | `FAITS-OFFRES` · `MARQUE-VOIX` · `COMPETITIVE-BRIEF` · `MARKETING-LINKEDIN` → [`_archive/corpus-marketing-IA-juin-2026/`](_archive/corpus-marketing-IA-juin-2026/). **Ce corpus a été produit par IA en juin 2026, pas écrit par TLS.** Il a été lu sept semaines durant comme de la doctrine. Tout est à refaire depuis les vraies études de marché |
| ⛔ [COPY-V2.md](_archive/corpus-site-juin-2026/COPY-V2.md) | **Archivé le 28/07** | 13× Qualiopi, 2× CPF, 6× « Open Badge 2.0 », 5× « 23 heures », intégralement au tutoiement. Copy d'un site qui n'existe plus |
| [_archive/MARKETING-CONTEXT.md](_archive/MARKETING-CONTEXT.md) | 🗄️ **Archivé 2026-07-24** | Déplacé vers `_archive/`. Rétrogradé depuis l'audit 2026-06-10 (le plus dérivé : 23h, 490 €, Open Badge 2.0, CPF/OPCO, page Académie). Ne pas s'en servir comme source. |

---

## 📦 Racine repo + product/ — Config & Design system

**⚠️ `PRODUCT.md` et `DESIGN.md` vivent à la RACINE du repo** (pas dans `docs/product/`) — injectés en tâche design. `DESIGN-IMPECCABLE.md` a été **archivé le 2026-09-09** → [`_archive/`](_archive/DESIGN-IMPECCABLE.md).

| Fichier | Emplacement | Purpose |
|---------|---|---------|
| `PRODUCT.md` | racine repo | Version, stack, routes, first steps |
| `DESIGN.md` | racine repo | Design system specification (colors, tokens, patterns) |
| ⛔ `DESIGN-IMPECCABLE.md` | `_archive/` | **Archivé le 2026-09-09** — 934 l. que rien ne chargeait. Signatures visuelles et interdits remontés dans `DESIGN.md` §10-§11 ; le reste ne fait plus autorité |
| `USER-FLOWS.md` | `docs/product/` | User journey diagrams (signup, lesson, journal) |
| [SPEC-SRS-repetition-espacee.md](product/SPEC-SRS-repetition-espacee.md) | **SPEC — répétition espacée (SRS) v1** (2026-07-24, **capstone des 3 pistes**). Walking skeleton : rating su/à-revoir → intervalles expansifs [1,3,7,14,30] j, compteur « à réviser », persistance, rating **sans XP** (firewall). Applique PM-C6 (spec 8 sections), UX/UI C4-C5 (parcours+états), vibe C1/C3/C4 (build+gate+revue). Implémenté : `useCardReviewStore` (`persistence.ts`) + `FlashcardsViewer.tsx` | 🛠️ Spec + build |
| [AVIS-STRIDE-CONSEIL.md](product/AVIS-STRIDE-CONSEIL.md) | **Avis critique — méthode STRIDE (pilier Conseil)** (2026-07-24). Revue franche + sourcée (Deloitte/Bersin/Kotter) de la méthode conseil SBO de Pierre-Armand. Solide (6 étapes + 4 principes anti-lock-in), mais : ordre incohérent entre docs, métriques cas d'usage inventées (⚠️ **déjà corrigées côté code + Notion synchronisé**), positionnement qui sur-promet le SBO (vs « sober reality » de Bersin) → repositionner en entrée cadrée. Nom STRIDE = TLS ; structure = cycle générique (à ancrer Kotter/ADDIE) | ⚖️ Avis conseil |
| `ETUDE-VIABILITE-LEARNING-APP.md` | `docs/product/` | **⭐ Étude de viabilité — registre analyste / BPI-Big 4** (2026-07-25). Revue critique de **tout le projet** (Learning App **+ conseil SBO**), marché France/Europe **sourcé** (recherche externe fraîche + docs Notion vision/positionnement/offre + CDC + code de l'app). **Verdict :** TLS = **boutique services à 2** (66 % du CA visé de 260 700 € = service humain) qui **construit un produit qu'elle n'a pas encore** (app = prototype front-end mock/`localStorage`, 0 backend ; CDC = ~4 000 h de dev **spec-stage**, « en attente validation Pierre »). **Moat vide au lancement** (Passeport sans preuve structurée, matching manuel, analytics 0 %) + collision de nom avec le Passeport d'État. **Marché réel** (formation FR 56,6 Md€, EdTech FR **1,8 Md€** — pas 7,88, SBO catégorie naissante « discours > pratique », AI Act Art. 4 vent porteur, contrôle CNIL août 2026) **mais** récompense un **wedge B2B focalisé**, pas l'« OS SBO entreprise » face aux géants (360L 243 M$, Gloat, Neobrain, 365Talents) + **hiver du financement (−66 %)**. **Reco = le wedge « couche de preuve financée par le service »** : Passeport evidence-FK + exposition API/MCP (Learning Buddy Option C) + entrée **AI Literacy Art. 4** ; réconcilier le pricing B2B ; provisionner l'AI Act haut-risque ; **renoncer** au reste. Contient SWOT, **3 scénarios** (boutique / wedge ⭐ / OS SBO), feuille de route 0-18 mois, **annexe SBO & IA approfondie**, **annexe fiabilité des sources** (chiffres internes faux corrigés : EdTech 7,88 Md€, hockey stick « Gemini Deepsearch »). **Existe en `.md` + `.docx`** (généré via pandoc). |
| `STRATEGIE-REALIGNEMENT-H2-2026.md` | `docs/product/` | **⭐ Réalignement stratégique + roadmap H2 2026** (2026-07-25, suite de l'étude viabilité). Challenge adversarial des **3 docs stratégie de PAD** confrontés aux faits vérifiés : hockey stick IA (260 K→5-6 M€ = projection « Gemini ») à retirer · « SaaS » 88 200 € **fictif** (0 abonné) · moat vide · déterminants H2 absents (trésorerie, C-Campus comme **canal grands comptes**, AI Act). Repositionnement **« cabinet-produit »**, wedge = **Ingénieur Pédagogique Augmenté** (répétable Orange+Equans), wedge daté **AI Act Art. 4 via C-Campus (Qualiopi)**, **règle des 2 colonnes** (vendre le présent ≠ la vision), modèle éco 3 lignes, intelligence H2 sourcée (CII ≤ 80 k€, circuit IA H2, **pas de fear-selling** « 15 M€ »), **roadmap H2 en 3 blocs** (CMT/PAD + 1 KPI), 6 décisions, le **NON**. |
| `../ops/REORG-OPS-DONNEES-STACK-H2-2026.md` | `docs/ops/` | **⭐ Réorg ops/données/stack H2 2026** (2026-07-25). **Carte de localisation** (🧠 Notion=cerveau · 💶 Pennylane=argent · 📁 Drive=fichiers · ✍️ PandaDoc=signature). **Cœur = §2 « alimenter/sync Notion systématiquement »** : Notion **alimenté par des flux** (Notion Forms · email→Notion · Calendar→Meetings · Deal gagné→Projet+Drive) ; **sync argent Pennylane→Notion léger = 4 champs de statut par deal** clés par ID Pennylane (l'ancien mirror complet = « pas ouf ») ; alertes anti-oubli. **Verdict stack** : Pennylane **Essentiel (~24 €)** + Notion CRM + n8n ; **pas d'all-in-one** (Axonaut/Sellsy testés → écartés UX/prix/migration). **Dashboards** : charts Notion natifs (CRM) + **Looker embed** (finance — les charts Notion ne lisent pas Pennylane en live). Audit live des **11 bases** (Meetings 358 fantômes · Tasks 90 % sans échéance · Deals 8 Won sans montant · Client projects↔Deals 0/23) + 4 pathologies transverses (**espaces finaux = bug d'automatisation silencieux**) + décisions métier (~15 min) + séquence bornée. |
| `RAPPORT-COHERENCE-LEARNING-APP.md` | `docs/product/` | **⭐ Rapport handoff Chloé → Pierre-Armand** (2026-07-23). Version accessible (non-tech) de toute l'analyse, pour décision à deux. Reformule « défaut » → « incohérence/tension ». 4 schémas Mermaid (validés au parser). Les 5 incohérences racontées par « ce que vit l'apprenant » + science (SDT, Dunning-Kruger, biais d'automatisation, fausse précision, effet de génération) + UX/UI agency-grade + application app. Section **fact-check** (statut de chaque affirmation + sources + mythes écartés). **Récap par cahier** (11 cahiers → incohérence → correctif). **Section « Vague 0 : décisions à trancher ensemble »** (A architecture · B économie · C invariants · D gouvernance · E pédagogique) avec reco par défaut pour chaque, dont le coût caché E3 = écrire les grilles de critères. À lire par le métier avant tout dev. **Existe en 3 formats** : `.md` (source), `.docx` (`RAPPORT-COHERENCE-LEARNING-APP.docx`, généré via pandoc avec les 4 schémas en images), et page web agency-grade partageable (artifact claude.ai, identité TLS teal/orange, thème clair+sombre). |
| `SOLUTIONS-00-SYNTHESE.md` | `docs/product/` | **⭐⭐ Synthèse des 5 études de solutions** (2026-07-23). Montre que les 5 défauts ne sont pas 5 chantiers mais **un chantier central + deux règles + une doctrine** : les **défauts 1+2+3 se dissolvent dans un seul objet de données** (la colonne de preuve `EvidenceRef`, généralisation de `PasseportEnrichment`) — la validation coach *est* un `EvidenceRef`, et l'attestation devient la récompense de la gamification. Deux **règles transverses** : « l'humain décide, la machine étaye » (défaut 4, jamais de `%` nu) et le **gate en 5 critères** (défaut 5). Une **doctrine d'ordre** : walking skeleton. **Thème unificateur : partout le défaut est une automatisation trompeuse, partout la solution refait place à l'humain = le positionnement SBO pris au mot.** Plan en 3 vagues (décider / squelette de preuve / réconcilier vers le bas) + arbre de dépendances + 8 décisions métier à trancher. **À lire en premier de la série.** |
| `SOLUTIONS-DETAIL.md` | `docs/product/` | **Dossier consolidé des 5 études de solutions** (fusion 2026-07-24 des ex-`SOLUTIONS-01`→`05`) : un chapitre par incohérence — 01 colonne de preuve (`EvidenceRef`, 3 régimes gradués) · 02 attestation vs jeu (firewall XP) · 03 validation coach (rubrique obligatoire, RGPD art. 22) · 04 signal IA honnête (pas de `%` nu, abstention) · 05 périmètre soutenable (gate 5 critères, walking skeleton). Entrée = `SOLUTIONS-00-SYNTHESE`. |
| `REVUE-TRANSVERSALE-CDC.md` | `docs/product/` | **⭐ Synthèse de la lecture intégrale des 16 cahiers** (2026-07-23), triple lentille advisor technique / researcher / neuro-pédagogie-UX-andragogie. **5 défauts transversaux** : (1) ⛔ la preuve n'a pas de colonne vertébrale — touche 6 cahiers, mais le patron existe déjà dans `projects.ts` (`PasseportEnrichment`), à généraliser ; (2) ⛔ gamification vs attestation (XP paie la réflexion, atrophie punitive, claim payant, dashboards de présence) = risque de positionnement SBO ; (3) ⚠️ RGPD art. 22 mord *maintenant* au point non conçu (validation coach non persistée, `TBD` 04:1492) ; (4) ⚠️ « score de confiance % » = mythe technique, Mistral traité en couteau suisse ; (5) ⚠️ incohérences chiffrées + sur-ingénierie systématiques (effort ×3-4/cahier, crédits 1/10/50, Stripe Charges legacy, RFC 5545 ≠ Open Badges). **Constat récurrent : le code a souvent tranché plus juste que la spec → réconcilier vers le bas.** Verdict par cahier + plan d'action en 4 vagues. Consolide les 5 critiques dédiées. |
| `CRITIQUE-PASSEPORT-JOURNAL.md` | `docs/product/` | **Confrontation cahiers ↔ frontend** (2026-07-23), suite — Passeport (cahier 02) et Journal (cahier 07). ⚠️ **Constat central** : le cahier 02 fait de l'*evidence* un pilier (**13 occurrences**), mais `LearnerCompetency` (`types/learning.ts:152`) **n'a aucun champ de preuve** — le niveau Dreyfus est un nombre sans dossier, et « preuve » est absent de la page (vérifié au rendu). Conséquence en chaîne : sans lieu où stocker la preuve, ni Learning Buddy ni le passeport-déclaratif-validé (sortie AI Act) ne tiennent. Le lien Journal → Passeport est **à sens unique** (`JournalEntry.linkedCompetenceId` existe, le backlink non). Le Journal reste le module le mieux conçu (questions structurantes EDRA-R, humeur, lien item). Propose une entité `EvidenceRef` dont le type `coach_validation` sert **à la fois le produit et la conformité RGPD** (matérialise l'intervention humaine significative). 6 actions ordonnées. |
| `CRITIQUE-BOUCLE-APPRENANT.md` | `docs/product/` | **Confrontation cahiers ↔ frontend** (2026-07-23), angle UI/UX + sciences cognitives + ingénierie pédagogique. Périmètre resserré sur la boucle apprendre/tester/réfléchir. Reconnaît d'abord que **l'arc de leçon en 8 sections est solide** (recoupe les *First Principles* de Merrill, va jusqu'au transfert) et que la réflexion est bien persistée. ⚠️ **Constat central, vérifiable ligne à ligne** : `LessonPlayer.tsx:1039` envoie les résultats de quiz dans un `console.log` — **ce que l'apprenant écrit est gardé, ce sur quoi il est testé est jeté**. C'est la réponse à « d'où viennent les preuves du passeport ». Quatre autres constats : pas de champ `explanation` au quiz (feedback purement juste/faux) · **zéro occurrence de `dreyfus`/`competence`/`niveau` dans le lecteur de leçon** — la leçon est identique pour un novice et un expert · flashcards sans répétition espacée · chaînes anglaises au moment du résultat. 7 actions, les 4 premières sur 2 fichiers. Écarte explicitement les mythes VARK / 8 secondes / cerveau triunique. |
| `CDC-13BIS-RGPD-PROPOSITIONS.md` | `docs/product/` | **Propositions d'évolution du cahier 13bis** (2026-07-23). Constate que le modèle de données est **bon** : `ai_decisions` (rationale, confidence_score) et `ai_overrides` (motif obligatoire) instrumentent déjà AI Act art. 13/14/15 **et** l'exemption RGPD art. 22 — ce qui invalide et retire la proposition `AIDecisionLog` du doc cahier 10. **Cinq absences mesurées** (comptage sur 1 009 lignes), toutes de *gouvernance* et non de sécurité : **AIPD art. 35 (0 mention)** · **article 22 jamais nommé** · **registre des traitements art. 30 (0)** · **sous-traitants art. 28 (0)** · **transferts hors UE (0)** — cette dernière vérifiable sur la pile actuelle (Notion, Drive, HeyGen, Figma, Canva sont américains ; Mistral est un bon choix de souveraineté). Propose de **séparer le volet RGPD (applicable) du volet AI Act (déc. 2027)**, aujourd'hui confondus sous le même « MVP Juillet ». |
| `REGLEMENTAIRE-ET-SBO.md` | `docs/product/` | **Cadre juridique + état de l'art SBO** (2026-07-23). ⚠️ **L'échéance AI Act du 2 août 2026 est reportée au 2 décembre 2027** (Digital Omnibus signé le 08/07/2026) — corrige une alerte erronée. **Le RGPD passe devant** : art. 22 et AIPD s'appliquent *aujourd'hui* et touchent le cœur du passeport ; « intervention humaine significative » a un sens strict (valider sans analyse ne compte pas). TLS est **fournisseur**, donc côté lourd — allègement PME art. 62 à surveiller. Grille de qualification par usage (auto-évaluation = hors périmètre ; matching = affectation de tâches ; churn = surveillance). Côté SBO, chiffres Deloitte **citables avec attribution** (< 1 organisation sur 5 adopte, +63 % de performance, 46 % d'obstacle culturel) — sortie partielle de la contrainte de preuve S1. 6 questions à poser à un conseil. |
| `CDC-10-ANALYTICS-PROPOSITIONS.md` | `docs/product/` | **Propositions d'évolution du cahier 10** (2026-07-23) — le CDC reste source de vérité, non modifié. Constate d'abord que le cahier existant est mature (stade 3-4 du modèle de maturité marché). Relève 5 écarts : `Event` suppose que tout se passe dans l'app (manque `surface`/`context`) · aucun standard d'interopérabilité (**xAPI + profil HR Open Standards** = le passeport devient un *learner wallet* portable) · rien ne fait passer une métrique de tableau de bord à **métrique citable** (le chaînon manquant de `METRICS-A-COLLECTER`) · **⚠️ AI Act annexe III point 4 : les plateformes d'évaluation de compétences sont classées haut risque, obligations complètes au 2 août 2026** — le cahier 10 devient le substrat de conformité (art. 12 journalisation), entité `AIDecisionLog` proposée · le stade 5 suppose une jointure SIRH client, à ne pas viser au MVP. Contrainte de **conception**, distincte de la règle marketing « jamais l'AI Act en accroche ». |
| `LEARNING-BUDDY-IN-SITU.md` | `docs/product/` | **Exploration produit** (2026-07-23) — Learning Buddy en situation de travail. Compare 5 surfaces (serveur MCP · barre de menus macOS · extension navigateur · Slack/Teams · add-in Office). Recommande le **serveur MCP** : la moins chère, s'écrit une fois, présente dans Claude/Cursor/ChatGPT/Copilot. Thèse centrale : **le différenciateur n'est pas l'agent mais le Passeport** — il transforme chaque interaction en preuve de compétence, ce qu'aucun LLM générique ne peut faire. Chiffres MCP (8-12k serveurs Q2 2026, Forrester 30 % des SaaS en 2026), précédent Autodesk. ⚠️ Statut **exploration, pas décision** — question ouverte : fonctionnalité de la Learning App ou produit distinct ? |

---

## 📝 BLOG/ — Article drafts & SEO content (40K)

**Marketing blog articles (3 posts drafted)**


---

## 🔗 FLOW-PROMPTS/ — Session prompts by user flow

**Structured prompts for Phase 14 flow-based design**

- `README.md` — Index of flows

---

## 📂 figma/ — Figma-specific docs (5 fichiers)

**Figma design system audit & gap analysis** (Token parity → voir `_audits/FIGMA-FOUNDATIONS-AUDIT-2026-07-23.md`, doublon réconcilié 06-30)

| Fichier | Note |
|---|---|
| `RESOURCES-DESIGN-MAPPING.md` | Mapping ressources ↔ design |
| `AUDIT-VARIABLES-COMPONENT-SETS-2026-09-09.md` | Liaison aux variables des 155 component sets (Atoms + Composites). Inspection node-par-node. 41 hex bruts traités, 7 exceptions assumées et justifiées. |

> Pour l'état Figma **vérifié** (2026-06-30, inspection node-par-node), voir `CLAUDE.md` § Phase 1 P0.

---

## 🧩 _phases/ — Rapports de phase (4 fichiers)


## 📊 charts/ — Data visualization (5 fichiers)

- `CHARTS-SYSTEM.md` · `CHARTS-DS-ENTRY.md` · `CHARTS-QUICK-START.md` · `CHARTS-FUTURE-CANDIDATES.md`
- `FIGMA-CHARTS-SYNC-PLAN.md` — sync charts ↔ Figma

## 🔭 veille/ — Livrables de veille approfondie (1 fichier)

- `2026-07-15-IA-GENERATIVE-FORMATION-PREUVES.md` — **premier livrable du process de veille approfondie** (test du 2026-07-15). IA générative en formation : ce qui est démontré vs ce qui circule. 12 claims vérifiés en adversarial 3 voix sur 25 sources, 13 rejetés. Contient 2 pièges de citation à bannir dans les contenus TLS (« cognitive debt » contesté · 10 % Insee ≠ adoption IA générative). Coût du run + limites documentés en §4-5.

---

## 🧭 ops/ — Outillage & workflows de l'entreprise (7 fichiers)

> 🧭 **Contexte-maison orga société** (projet séparé, hors frontend) : [`ops/CONTEXT-ORGA-SOCIETE.md`](ops/CONTEXT-ORGA-SOCIETE.md) — principe « clean / suivable / automatisé », Pennylane = source de vérité argent, index des docs ops. **Point d'entrée.**

- [`DEPLOIEMENT-SHOWCASE.md`](ops/DEPLOIEMENT-SHOWCASE.md) — **déployer le showcase : préparé, non activé** (2026-07-29). Ce que règlent `vercel.json` et `.vercelignore` (réécriture SPA, noindex, exclusion des 32 Mo de vidéos), les 2 variables requises, et **3 décisions à trancher** : public ou protégé par mot de passe, quel hébergeur, déploiement auto ou manuel. Rappelle qu'**aucune synchronisation automatique n'existe** avec Claude Design — `DesignSync` est piloté à la main, dans un seul sens.

- `NOTION-CAPACITES-2026.md` — **ce que Notion sait faire depuis février 2026** (2026-07-23). Étude des versions 3.3 à 3.6 rapportée aux problèmes de TLS. Réponse à « peut-on développer nos propres outils sans quitter Notion » : **oui** — le Developer Platform de mai apporte **Workers** (runtime hébergé), **Database Sync** (brancher Pennylane), **Custom Agent Tools**, CLI et Agent SDK. Vues `chart` et `dashboard` créables par API avec un DSL complet. **Claude est agent externe dans Notion depuis le 1er juillet.** Blocs HTML interactifs — mais limites non documentées, à tester. ⏰ **Deux échéances de coût** : Custom Agents en crédits depuis le 04/05, **Workers à partir du 11/08**. Propose une restructuration Sales · Finance · Ops · Stratégie en tableaux de bord, et 7 actions ordonnées dont 4 gratuites et sans développement.

- `NOTION-WORKSPACE-AUDIT-2026-07-24.md` — **audit du workspace Notion, partage et automatisation** (2026-07-23). Diagnostic : le workspace n'est pas sous-conçu mais **sous-activé**. 40 projets, 257 tâches (147 ouvertes), 7 Company Areas, Master Vault SSOT, 7 bases CRM. ⚠️ **Trois constats chiffrés** : (1) un **AI Agents Index de 32 entrées dont 6 agents P0 jamais testés** et une **base Skills de 11 skills TLS jamais activées** — dont `Note de réunion TLS` qui créerait les tâches depuis les décisions ; (2) le **CRM porte ~40 000 € de pipeline ouvert avec toutes les relances dépassées de 3 à 5 mois**, alors que *Suivi des commandes* est tenu à jour ; (3) l'administratif n'a **aucune routine** — une contrainte URSSAF est en cours. Documente l'écart de partage Chloé ↔ Pierre-Armand (5 projets communs sur 40) et propose une base Échéances + agent mensuel. Plan d'action en 7 points.

- `CARTOGRAPHIE-OUTILLAGE.md` — **cartographie besoins → workflows → outillage** (2026-07-23). Méthode en 3 niveaux (objectif chiffré → workflow récurrent → outil), 5 fonctions cartographiées (acquisition, vente, produit, preuve, pilotage), roadmap priorisée de 8 skills TLS sur-mesure. Croise Notion et le dépôt. ⚠️ **Relève 6 divergences entre sources, dont 2 graves** : des métriques inventées (turnover −30 %, 4,2 h/semaine) circulent dans les argumentaires de vente Notion en violation de C7, et **deux modèles de tarification coexistent** (crédit-based canonique vs abonnement plat). Les docs Notion datent du 09/06, `FACTS-CANON` du 10/06 — ils n'ont jamais été repassés depuis. Documente aussi 4 contraintes bloquantes et 5 sources non lues (dont les plus récentes, juillet).

---

## 📋 briefs/ — Briefs de travail (4 fichiers)

- `BRIEF-VEILLE-IA-PIPELINE.md` — brief technique pour Pierre-Armand : couche IA de la veille (collecte multi-canal RSS/newsletter/Perplexity, vérification de fiabilité, synthèse). Ancré sur les CDC 12bis/12/01bis/13bis + le contrat `wp-veille`. Statut : proposition à discuter (2026-07-15)
- `BRIEF-LEARNING-SPACE-VEILLE.md` — brief refonte Learning Space + Veille

---

## 🗂️ _ARCHIVE/ — Historical docs (kept for reference)

**Deprecated but preserved**

- `AUDIT-COHERENCE-2026-07-22.md` — Old coherence audit (superseded by Phase 19)

---

## 🗄️ _CANON/ — Canonical stable docs

**Source de vérité unique. Prime sur TOUS les autres docs, y compris marketing et site.**

- `FACTS-CANON.md` — **Faits validés ligne par ligne** par Chloé : formation (7 modules / 7h / C-Campus / Open Badge / OPCO), accompagnement (STRIDE), Learning App, chiffres, marque & fondateurs. Statut par ligne : ✅ vrai · ✏️ à corriger · ❌ faux · ❓ à valider. ⏸️ Pricing & business model **gelés** (non validés, base provisoire = CDC)
- `AUDIT-COHERENCE-2026-07-22.md` — Audit 2026-06-10 qui a déclenché la création du canon (docs marketing porteurs de copy + chiffres IA non fiables)
- `METRICS-A-COLLECTER.md` — Métriques manquantes à collecter avant de pouvoir les publier
- `REGLES-USAGE-COMPOSANTS.md` — **Règles d'usage des composants** (2026-07-23) : quand utiliser
  Modal vs Toast, la sémantique des 4 variantes d'Alert, le choix numbered/load-more/infinite
  pour Pagination, et les contrats a11y de Button et Input. Récupérées de `src/design-system/spec.json`
  avant sa suppression — elles n'existaient nulle part ailleurs. **Doctrine uniquement, aucune valeur
  de token** : les valeurs vivent dans `src/index.css` (@theme)
- `AUDIT-DESIGN-2026-07-22.md` — Confrontation des 5 docs design au code réel. Établit qu'il y a
  **4 référentiels de tokens** (3 CSS chargés + 1 spec fossile), pas un seul, et pourquoi l'audit
  de juin concluait « tokens cohérents » : les 2 docs les plus dérivés n'étaient pas dans son périmètre
- `CHANTIER-TYPO-A11Y.md` — **État mesuré typo + accessibilité** (2026-07-23, deux passes) :
  contrastes calculés cran par cran (ink-400 à 2,54:1 sur 309 textes — mais les **3 variants
  pleins de `Button` échouent aussi**, jusqu'à 2,64:1 sur le CTA principal, et le survol
  aggrave), échelle de tailles, graisses (une convention **existe** dans les tokens `--text-h*`,
  le code la contredit à 70 % sur h3/h4), et les 6 axes a11y désormais mesurés — dont
  **2 fausses alertes réfutées** (reduced-motion CSS et couleurs de la vitrine sont sains).
  **Périmètre : mode clair uniquement** — le mode sombre est explicitement hors chantier
  (décision du 23/07). À lire avant toute intervention sur la typographie ou les couleurs
  de texte

---

## 🗑️ _old-sessions/ — SUPPRIMÉ (2026-06-30)

Les fichiers motion-effects datés ont été supprimés lors du nettoyage du 30/06. Historique dans git si besoin.

---

## 🔍 Howto: Find what you need

| Looking for... | Read this |
|---|---|
| **Faits, offres, prix, registre** | **_canon/FACTS-CANON.md** (prime sur tout) |
| **Voix de marque** | ⚠️ **à écrire par TLS** — l'ancienne doctrine était une production IA, archivée |
| **Design tokens** | product/DESIGN.md |
| **Component audit** | _audits/AUDIT-PHASE-19-2026-06-12.md |
| **Figma sync status** | _audits/FIGMA-AUDIT-REPORT-2026-06-12.md |
| **Motion primitives** | site/DESIGN-INSPO.md (Until Labs section) |
| **Project setup** | product/PRODUCT.md |
| **Copy & messaging** | `docs/site/propositions-PAD/` (copy arbitrée) puis le code, `src/pages/marketing/*` |

---

## 📈 Cleanup status

**2026-07-22** (clean marketing + site)
🗑️ **`website/` SUPPRIMÉ** (21 fichiers suivis, 336K) — site HTML statique périmé. Vérifié orphelin avant suppression : aucune référence dans `vite.config` / `package.json` / `vercel` / `netlify` / `src/`, et absent de `dist/`. **Le site vitrine vit uniquement dans `src/pages/marketing/*`** (routes `/website/*`). Historique récupérable dans git
✅ `_canon/FACTS-CANON.md` + `_canon/AUDIT-COHERENCE-2026-07-22.md` : notes de périmption ajoutées (ils référençaient le dossier supprimé)
⚠️ **Ne pas confondre `docs/site/` (docs, conservé) et `website/site/` (HTML, supprimé).**
✅ **Hiérarchie canonique rétablie dans l'index** : `_canon/FACTS-CANON.md` promu « lire en premier » à la place de `MARKETING-CONTEXT.md`, qui était encore pointé « 🔴 LIRE EN PREMIER » alors qu'il est rétrogradé depuis l'audit du 10/06. C'était la cause directe de sessions partant sur des faits périmés (23h, Qualiopi TLS, CPF, tutoiement)
✅ Section MARKETING/ : statut explicite par doc (🟢 canonique / 🟡 canonique partiel / 🔴 rétrogradé) + avertissement sur les exemples de copy de MARQUE-VOIX (drafts IA)
✅ Section SITE/ : **20 docs fantômes indexés** (25 fichiers au total, 5 seulement étaient listés)
✅ Homonymie « Direction C » documentée (art direction site 11/06 ≠ variante home V2 rejetée en juillet)
✅ Section _CANON/ : description corrigée (elle décrivait un contenu qui n'est pas celui du fichier)
✅ Compte de docs corrigé (~85 annoncés → 130 réels)

**2026-06-30** (anti-dérive agents)
✅ ~20 docs déversés en vrac re-rangés (racine repo + docs/ → sous-dossiers)
✅ Nouveaux sous-dossiers : `_phases/`, `charts/`, `briefs/`
✅ 4 audits Figma (06-26) marqués ⚠️ FIABILITÉ NON VÉRIFIÉE
✅ Dédupliqué PHASE-16-GAP-ANALYSIS (product/ supprimé)
✅ Supprimé `.claude/worktrees/` (40 Mo), `.agents/skills 2/`, `docs/_old-sessions/`
✅ Archivé .claude/REFACTORING_* + SESSION_FINAL_SUMMARY → `_archive/`
✅ Règles d'hygiène doc ajoutées à CLAUDE.md

**2026-06-12**
✅ Merged CDC doublon · Archived motion files · Consolidated audits → _audits/ · Created README + INDEX

**Reste à faire :**
- [ ] Réconcilier les 2 versions divergentes de `FIGMA-FOUNDATIONS-AUDIT-2026-07-23.md` (figma/ vs _audits/)
- [ ] Re-vérifier (ou archiver) les 4 audits Figma flaggés non-vérifiés

---

*Generated 2026-06-12 | Total: ~80 docs organized | Last modified: auto-index*
