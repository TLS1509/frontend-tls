# Étude de viabilité — The Learning Society (Learning App + Conseil SBO)

> **Nature :** revue critique d'analyste (registre conseiller BPI / consultant Big 4), à usage **décision stratégique interne + document maître réutilisable**.
> **Périmètre :** l'ensemble du projet TLS — la Learning App *et* le bras conseil/services — marché France, contexte Europe.
> **Date :** 25 juillet 2026 · **Statut :** v1, à valider par les fondateurs.
> **Registre honnêteté :** aucun chiffre TLS inventé ; les projections internes sont traitées comme des hypothèses à valider, jamais comme des faits ; toute donnée marché est sourcée ou marquée non vérifiée.

---

## 0. Note de méthode & fiabilité des sources

Cette étude a été construite **à partir des sources produit autoritatives** (l'application telle qu'elle existe dans le code, les 16 cahiers des charges, les docs Notion de vision, positionnement, offre et gouvernance) **et d'une recherche marché externe fraîche** (France/Europe, données 2025-2026, sourcées). Les documents marketing internes non relus **n'ont pas servi de socle factuel** : plusieurs de leurs chiffres se sont révélés faux à la vérification (détail en **Annexe B**).

Trois disciplines appliquées partout :
1. **Sources externes primaires = socle factuel** (sizing, adoption, financements, réglementation), citées.
2. **Docs internes = hypothèses à tester**, marquées `[interne — non validé]` quand reprises.
3. **Rien d'inventé** : un trou de donnée reste un trou déclaré.

**Le déclencheur de cette étude est lui-même une conclusion :** les documents internes divergent et se contredisent (positionnement, prix, chiffres marché, ordre de la méthode STRIDE). L'incohérence documentaire n'est pas un détail — c'est un symptôme du problème stratégique central décrit ci-dessous.

---

## 1. Résumé exécutif — le verdict

**Aujourd'hui, TLS est une boutique de services experts à deux personnes (conseil IA/SBO + formation « Formateur Augmenté » via C-Campus) qui construit un produit qu'elle n'a pas encore.** Ce n'est pas un jugement de valeur, c'est le **stade réel**, et il faut le regarder en face avant tout arbitrage.

- **Le plan financier interne le dit lui-même :** sur les 260 700 € de CA visé, **~66 % est du service humain** (conseil + prestations), **~34 % du SaaS** — et ce SaaS est **hypothétique** (ni backend, ni client payant à ce jour).
- **L'app est un prototype front-end très abouti, pas un SaaS :** 149 pages, 182 routes, mais **zéro appel backend réel**, données = fichiers mock + `localStorage`. Le produit porteur (d'après les CDC : **9 plugins WordPress, ~3 700–4 000 h de dev**) est **au stade spécification**, « en attente validation Pierre » sur presque tous les cahiers. **L'essentiel du build est devant, pas derrière.**
- **Le moat annoncé est partiellement construit.** ✅ **Corrigé le 28/07 :** la **couche de preuve existe désormais dans le code** — `EvidenceRef` ([`src/types/learning.ts:199`](../../src/types/learning.ts)) avec 3 régimes (léger / dialogué / certifiant), l'invariant « une preuve légère n'affirme aucun niveau », `currentLevel` devenu **optionnel** (absent tant qu'aucune validation humaine ne l'établit), `selfAssessedLevel` séparé, et un firewall gamification. **Le défaut structurel n°1 est comblé.** En revanche, restent absents : le **matching** (aucune implémentation dans `src/`), et l'**analytics** (aucune instrumentation — les dashboards tournent sur des mocks). Le « lock-in façon Salesforce » reste une thèse, et le nom entre en **collision avec le Passeport de Compétences de l'État** (Caisse des Dépôts, ~43 M d'utilisateurs, gratuit).
- **Le marché, lui, est réel, en croissance et bien orienté :** la formation professionnelle française pèse **56,6 Md€** (2024, dont **~29 Md€** de budget entreprise/OPCO), l'EdTech française **1,8 Md€** (2025, dont ~66 % corporate), et la **SBO est une catégorie en formation** validée par Deloitte/Mercer/WEF mais **naissante, surtout en France** (« le discours devance la pratique »). L'**AI Act Article 4** ajoute un vent porteur réel (contrôle CNIL dès août 2026).
- **Mais l'opportunité récompense un wedge B2B focalisé, constructible et finançable à deux — pas une course à l'« OS SBO entreprise »** face à des acteurs financés à 240 M$+ (360Learning) et à des spécialistes skills (Gloat, Eightfold, 365Talents, Neobrain). Le **financement EdTech FR a chuté ~−66 % depuis 2021** : « lever pour recruter une équipe produit » est difficile. La contrainte « 2 personnes » est **structurelle**, pas un choix.

**Verdict par identité :**

| Quelle entreprise ? | Viabilité | Nature |
|---|---|---|
| **Boutique services** (conseil + formation) | ✅ **Viable aujourd'hui** | Réelle, cash-générative, mais capacity-bound, non-scalable, dépendante des fondateurs. Échelle micro (260 k€ ≈ 2 salaires). |
| **Couche pédagogique / preuve pour mid-market & OF** | 🟡 **Viable si focalisée** | Constructible à 2, différenciée, défendable. C'est le pari raisonnable. |
| **OS SBO entreprise** (la vision 5-6 M€) | 🔴 **Non prouvé / hors de portée à court terme** | Pré-produit, face à des géants, dépend de features V2/2027 et de volume client inexistant. North star, pas identité 2026-2027. |

**Ce qu'il faut faire (résumé) :** trancher le wedge, **utiliser le service pour financer et alimenter en preuves un produit volontairement mince** (le Passeport comme couche de preuve exposée en API/MCP), **entrer par un produit exécutable maintenant** (module AI Literacy Art. 4), réconcilier le pricing sur un seul modèle B2B, provisionner le risque AI Act haut-risque, et **renoncer** au reste jusqu'à avoir des preuves et des clients. Détail en **§9**.

**La bonne nouvelle :** presque toutes ces solutions sont **déjà dans vos docs**. Le problème n'est pas le manque d'idées — c'est **l'absence de séquencement et de renoncement**.

---

## 2. Le produit tel qu'il existe (pas tel qu'il est rêvé)

### 2.1 L'application (le code)

| Dimension | Constat vérifié | Lecture |
|---|---|---|
| Surface | 149 pages, 182 routes routées | Couverture fonctionnelle large, cohérente |
| Stack | React 19 · Vite · Tailwind · Zustand · Recharts | Front moderne, maintenable |
| Backend | **Aucun** — 0 appel `fetch/axios` vers une API ; `stripe.ts`/`ajaxClient` = stubs | **Pas de produit serveur** |
| Données | 22 fichiers mock + persistance `localStorage` (Zustand) | **Démo, pas SaaS** |
| Qualité UX/design | Design system cohérent, 508 fichiers TS/TSX | Réel atout : **ça démo bien** |

**Conclusion :** l'app est un **prototype front-end de très bonne facture** — précieux pour la vente et la levée, mais **ce n'est pas un logiciel exploitable en production**. Multi-tenant, auth, paiements, IA, analytics : tout le back reste à construire.

### 2.2 La maturité de la spécification (les CDC)

Le corpus de 16 cahiers est **large, cohérent, domaine-littéré** — au-dessus de la moyenne d'une équipe pré-seed. C'est un vrai signal positif (« ils comprennent le problème »). Mais :

- **Effort cumulé estimé par les auteurs : ~3 700–4 000+ h de dev**, à livrer en **9 plugins WordPress** (`PLUGIN_DEPENDENCY_ANALYSIS.md`), contre **une équipe de 2 fondateurs**. C'est la **tension de viabilité n°1**.
- Presque tous les cahiers sont « 🟢 spécification en cours » et « en attente validation Pierre » — **non signés**.
- **Staging explicite :** MVP (juil. 2026) = Passeport, Onboarding, Formation, Coaching, Gamification, coquille Enterprise, RGPD ; V1 (sept. 2026) = Projects SBO, Chatbot, Journal, Abonnements, 1res features IA ; V2 (déc. 2026) = IA avancée. **Les features qui justifient la valorisation sont toutes en V2/2027.**

### 2.3 Le moat, disséqué

| Brique de moat annoncée | Réalité CDC | Verdict |
|---|---|---|
| **Passeport = actif données** | ✅ **Corrigé le 28/07 (le code a dépassé les CDC).** `EvidenceRef` est **construit** : FK vers la compétence, 3 régimes de preuve, `assertedLevel` + `verifiedBy` réservés aux validations humaines signées, `LearnerCompetency.currentLevel` **optionnel** (pas de niveau sans preuve validante), `selfAssessedLevel` séparé pour la perception, zéro XP sur les preuves. *(Le constat initial « pas de clé étrangère vers une preuve » décrivait les CDC, pas le code.)* | 🟢 **Construit.** Le socle du Match existe. Reste à l'alimenter en volume (dépend des missions clients). |
| **Preuve par projet (JAC)** | Le **JAC** (Jalon d'Application Critique, cahier 11) est un vrai objet de preuve (`deliverable_url`, `rubric_score`, validateur expert). **Mais** il vit dans un autre module, couplé de façon lâche, et **ne se matérialise qu'avec des clients payants lançant de vrais projets (V1+)**. | 🟡 **Réel en design, vide au lancement.** |
| **Matching IA talents-projets** | **Manuel au MVP** (« un consultant TLS affecte à la main »). L'auto-configuration IA est « V2+ Vision », déclarée « TOO COMPLEX to validate now » — alors que le cahier dit qu'elle « justifie toute la plateforme ». | 🔴 **Roadmap, pas produit.** |
| **Org intelligence / analytics** | Cahier 10 à **~0 %**, dépendant de *tous* les plugins émettant des événements. Dépendance circulaire, back-loaded. | 🔴 **Absent.** Or il sous-tend les alertes churn, l'org intelligence, le récit ROI entreprise. |
| **Intégrations SIRH/CRM (lock-in)** | Reportées **V4+**. Pas de sync HRIS au MVP — que les acheteurs L&D entreprise attendent pourtant. | 🔴 **Reporté.** |

**Synthèse produit :** au lancement, TLS est une **plateforme learning + coaching compétente, avec un bras services** ; le **« OS des SBO » différenciant est une promesse**, gated derrière des process manuels, un analytics non construit, et un volume de projets clients qui n'existe pas encore.

### 2.4 Risque réglementaire sous-évalué (à provisionner)

Le scoring de compétences (niveaux Dreyfus), le matching talent-projet et la prédiction de churn sont des usages **« à haut risque » au sens de l'Annexe III de l'AI Act** (éducation/formation professionnelle *et* emploi/gestion des travailleurs/allocation des tâches). Les CDC ne scoping la conformité IA que comme **transparence (label + override + bias monitoring)** — le haut risque déclenche **évaluation de conformité, système de gestion des risques, gouvernance des données, supervision humaine documentée**, bien au-delà. **Aucun cahier n'évalue cette exposition.** C'est un risque sous-provisionné, d'autant que le marketing s'appuie sur « conforme AI Act » comme argument.

---

## 3. Le marché (France, contexte Europe) — chiffré et sourcé

> Toutes les valeurs ci-dessous sont externes et sourcées (Annexe C). Niveau de confiance indiqué.

### 3.1 Tailles de marché

| Périmètre | Valeur | Confiance | Source |
|---|---|---|---|
| **France — dépense nationale formation + apprentissage 2024** | **56,6 Md€** (1,94 % du PIB) | Haute | DARES / Insee |
| dont **financement direct entreprises** | **16,4 Md€ (29 %)** → **~29 Md€** avec OPCO | Haute | DARES |
| **France — CA filière EdTech 2025** | **1,8 Md€** (+6 %/an, en décélération depuis +11 %/an) | Haute | EY-Parthenon × EdTech France |
| dont **corporate/professionnel** | **~66 %** (44 % formation pro + 22 % corporate B2B) | Haute | EY-Parthenon / AEF Info |
| **Europe — LMS corporate** | ~8,4 Md$ (2024) → ~10,1 Md$ (2025), CAGR ~19 % | Moyenne | Straits Research |
| **Monde — LMS corporate / LXP** | ~15 Md$ / ~3,7 Md$ (2025), CAGR ~20-23 % | Moyenne | vendors (variance élevée) |

> ⚠️ Le chiffre « **7,88 Md€ EdTech France** » d'un doc interne est **faux** (chiffre global mal étiqueté). Le « **320 Md$ marché français** » l'est aussi. Ne jamais les propager (cf. Annexe B).

**Lecture TAM/SAM/SOM (ordre de grandeur, illustratif) :**

- **TAM** (le pot où l'argent coule vraiment) : **~29 Md€** de budget L&D entreprise/OPCO français ; ou, côté vendeurs, **~1,2 Md€** de CA EdTech-corporate français (66 % × 1,8 Md€).
- **SAM** (adressable par une couche skills/pédagogie + IA pour ETI mid-market & OF) : **fraction basse** — les ETI 200-2 000 et OF cherchant à outiller la SBO + littératie IA. Estimation prudente **ordre de grandeur 100-300 M€/an** de dépense adressable (à affiner ; *estimation, non sourcée*).
- **SOM** (réaliste, 3 ans, boutique bootstrapped à 2 → petite équipe) : **~0,3 → 1,5 M€ de CA**, dominé au départ par les services, avec une composante SaaS croissante *si* le wedge prend. Le plan interne à **260 700 €** est un SOM an-1 crédible **côté services** ; le SaaS reste à prouver.

### 3.2 Santé de la filière EdTech FR — un marché qui mûrit et se serre

- **~550 entreprises EdTech, ~16 000 emplois** (2025), vs ~500/10 000 en 2021.
- **Dé-concentration favorable :** part de CA du top-20 tombée de **70 % (2021) → 58 % (2023) → 50 % (2025)** → **de la place pour un acteur mid-size**.
- **Hiver du financement :** levées EdTech FR au pic **~438 M€ (2021)**, **~−66 % depuis** ; **48 % des EdTech** signalent un accès public réduit ; **12+ M&A** depuis 2023. VC français tous secteurs **−35 % en valeur au S1 2025**.
- **Rounds récents pertinents :** Didask **10 M€** (mai 2025, IA + sciences cognitives — *le plus adjacent à vous*) ; 360Learning **~60 M$ d'ARR**, ~243 M$ levés ; Edflex **18 M$** (oct. 2025).

**Implication :** marché en maturation, discipliné sur les coûts, avec une **vraie ouverture pour un entrant différencié mid-size** — mais **capital late-stage rare**. Le pari « lever gros pour bâtir vite » est le moins probable des chemins.

### 3.3 La SBO — catégorie réelle, mais naissante (surtout en France)

- **Preuves macro (Deloitte, enquête mai-juin 2022) :** les organisations à pratiques skills-based sont **+52 % à innover, +57 % à anticiper le changement, +63 % à atteindre leurs résultats, +107 % à bien placer les talents, +98 % à retenir les hauts performeurs**. ⚠️ **Ce sont des *probabilités relatives* vs non-adopteurs, corrélationnelles, échantillon US** — évidence directionnelle, pas ROI causal. **Ne pas survendre.**
- **Adoption réelle (Mercer 2024/25, global) :** skills-based par domaine — **Learning 30 %, Perf 28 %, Career 28 %, Recrutement 27 %, Workforce planning 21 %, Rémunération 19 %**. Freins : **capacité RH 40 %, trop de changement 38 %, coût 30 %**. Fondations qui montent (38 % ont une skills library, 55 % mappent skills↔postes) mais **début de courbe**.
- **France : le discours devance la pratique.** Confirmé par les autorités (ANDRH, Neobrain « état des lieux en France » 2025-26) et par 2 études FR 2026. **Écart de maturité US → Europe → France.**

**C'est le double tranchant central :** la France est en **territoire early-adopter** → à la fois le **risque** (marché pas prêt, cycles longs, évangélisation) et la **fenêtre** (catégorie à nommer et posséder, place laissée par la dé-concentration).

### 3.4 Le signal « SBO dans le L&D français » — canal, pas seulement signal

La SBO est un **sujet chaud du L&D/RH français**, porté par des acteurs crédibles : Centre Inffo, Cegos (« organisation pilotée par les compétences »), Lefebvre Dalloz, podcasts ANDRH, Learn Assembly / *The Assembly*, myRHline (« 63 podcasts RH 2026 »), Authentic Talent, Digital Learning Academy — avec des épisodes de terrain (ex. SBM Offshore, ~8 000 pers.).

- ✅ **La catégorie est évangélisée pour vous, gratuitement.** → **canal de distribution + thought leadership**, parfait pour vos profils (le « Baromètre SBO France » de vos docs s'y insère).
- ⚠️ **Mais** la conversation appartient aux géants (Cegos, Lefebvre Dalloz, Neobrain, ANDRH) — vous y êtes une petite voix — et « le discours ne se convertit pas encore en achat d'infra ». **Le marché veut *comprendre* la SBO, pas encore *acheter un OS SBO*.**

### 3.5 AI Act Article 4 — vent porteur réel, à jouer honnêtement

- **En vigueur depuis le 2 février 2025** : tout **fournisseur/déployeur** d'IA doit assurer une **« littératie IA suffisante »** à son personnel. **Aucun seuil d'effectif.**
- **Contrôle national dès ~2-3 août 2026** (en France : **CNIL**). Pas d'amende dédiée à l'Art. 4, mais plafonds AI Act (**15 M€ / 3 % du CA mondial**) qui cadrent le risque.
- **Taille du besoin FR (proxy adoption IA) :** ~10 % des entreprises (2024) → **~18 %** des 10+ salariés (2025), ~33 % des 250+. La population à former **grossit mécaniquement** avec l'adoption. ⚠️ **Distinguer l'obligation réelle** du **hype vendeur** (« 15 M€ d'amende par salarié non formé » = faux). Cohérent avec vos règles d'honnêteté.

### 3.6 Mécanique de financement FR — orienter le go-to-market

- **CPF individuel en contraction structurelle :** reste à charge **100 € (mai 2024) → 150 € (avril 2026)** ; entrées **~−30 %** puis **−11 %** (2025).
- **France compétences −1,6 %** (13,06 → 12,84 Md€) ; environnement de **consolidation des coûts**.
- **→ Ancrer le go-to-market sur le plan de développement des compétences + budget OPCO B2B (~29 Md€), pas sur le CPF individuel.** Conséquence directe : la ligne interne « **Pass Solo 30 €/mois** » vise **le segment qui décroît**.

---

## 4. Paysage concurrentiel

| Couloir | Acteurs | Ce qu'ils possèdent | Où TLS peut / ne peut pas jouer |
|---|---|---|---|
| **Plateformes L&D entreprise** | 360Learning (~243 M$), Cornerstone, SAP SF, Workday Learning, Degreed | Scale, budgets, références blue-chip, ROI | ❌ Non-jouable frontalement à 2. |
| **EdTech IA pédagogique FR** | **Didask** (10 M€, sciences co.), Edflex | Crédibilité tech, financement | 🟡 ADN partagé ; TLS va plus loin sur preuve + métier formateur. |
| **Skills / talent intelligence** | Gloat, Eightfold, Beamery ; **FR : 365Talents, Neobrain** | Le « Match » par le haut (grands comptes), skills graph | 🟡 **Partenaire, pas concurrent** : être la couche *pédagogie/preuve* au-dessus d'eux. |
| **Formation IA « Qualiopi » cheap** | BGB, IAvenir, SavoirIA… | SEO « formation IA », prix affichés, CPF/OPCO | ⚠️ Captent le réflexe d'achat transactionnel ; TLS = transformation, pas session. |
| **Alternative d'État** | **Passeport de Compétences (Caisse des Dépôts, ~43 M)** | Gratuit, officiel, même **nom** | 🔴 **Risque de nommage** ; opportunité d'interopérer (ESCO/ROME). |

**Lecture :** l'edge honnête de TLS (**formateur augmenté, pédagogie-first, mid-market/OF, boucle de preuve**) est **réel mais étroit**. Viser « l'OS SBO entreprise » met TLS face à des acteurs qu'une équipe de 2 ne peut pas outbuilder. **La seule position défendable est la niche que les géants ignorent** — et transformer les spécialistes skills en **canaux** (intégration), pas en ennemis.

---

## 5. Le modèle économique — le vrai, et le rêvé

### 5.1 Le modèle réel (bottom-up, doc « Catalogue d'Offres & Gouvernance ») `[interne]`

| Offre | Volume | Prix | CA/an | Pilier |
|---|---|---|---|---|
| Pass Solo (App) | 170/mois | 30 € | **61 200 €** | 1 |
| Pass Pro (App) | 108/an | 250 € | **27 000 €** | 1 |
| Solutions IA Plug & Play | 3/an | 7 500 € | **22 500 €** | 2 |
| Méthode STRIDE | 3/an | 10 000 € | **30 000 €** | 2 |
| Upskilling L&D | 2/an | 20 000 € | **40 000 €** | 2 |
| Conception & Diagnostic (TJM) | 30 j | 1 000 € | **30 000 €** | 3 |
| Delivery & Animation (TJM) | 50 j | 1 000 € | **50 000 €** | 3 |
| **TOTAL** | | | **260 700 €** | |

**Analyse critique :**
- **~66 % du CA visé = service humain** (P2 92 500 € + P3 80 000 € = 172 500 €). L'app = **34 %** (88 200 €), et ce 34 % est **hypothétique** (170 abonnés Solo + 108 Pro, sur un produit sans backend ni client payant).
- **Plafonné par la capacité :** 80 jours de TJM + 8 ventes conseil à délivrer + le build produit + tout le marketing (2-3 posts/sem, webinaire mensuel, vidéo mensuelle, newsletter quinzo, 2 articles/mois, 1-2 events/mois, baromètre). **≈ 5+ rôles temps plein pour 2 personnes.** La **sur-extension des fondateurs est le risque d'exécution n°1** — et c'est en général **le produit qui casse**.
- **Le « app offert 1 an » avec STRIDE** signifie **zéro revenu app en an-1 sur vos meilleurs clients qualifiés**, et une conversion an-2 à faire sur un produit non prouvé. Le récurrent est **reporté par construction**.
- **260 k€ pour 2 fondateurs sur 7 offres ≈ remplacer 2 salaires + frais.** Échelle **boutique durable**, pas trajectoire venture — sauf inflexion produit.

### 5.2 Le modèle « rêvé » (Vision 5 ans) — à manier avec précaution `[interne — non fiable]`

Le tableau **260 700 € → 1,45 M€ (2031)** et l'échelle de phases **200-250 k€ → 800 k-1 M€ → 5-6 M€ → 8-10 M€** sont explicitement annotés **« proposé par Gemini Deepsearch »** — **des projections générées par IA, pas un modèle**. Le même 260 700 € apparaît tantôt comme cible **2026**, tantôt **2027**.

> ⚠️ **Ne jamais présenter ce hockey stick à un financeur (BPI, investisseur).** Il sera identifié comme non fondé et **abîmera votre meilleur actif : la crédibilité.** Reconstruire un modèle bottom-up, hypothèses explicites, avant tout usage externe.

### 5.3 Contradiction de pricing à refermer

- **Doc Notion « Catalogue » :** Pass Solo 30 €/mois **plat** + Pass Pro 250 €/an.
- **CDC 11bis :** paliers **29 / 49 / 79 €** (IA payante aux plans 2-3) + **~45 €/siège/an** entreprise + **crédits** (Stripe + WooCommerce).

Deux modèles de prix différents coexistent. **Le business model n'est pas figé — il est *non réconcilié*.** À trancher avant toute dépense marketing.

### 5.4 Le flywheel — élégant mais avec un œuf-poule

Le flywheel « service (P3) → conseil (P2) → app qui reste (P1) » est **logiquement sain**. Mais **son dernier tour (le SaaS récurrent) est exactement la partie non construite.** Le flywheel tourne aujourd'hui sur les services ; il n'a **pas encore atteint** le flywheel SaaS qui rendrait l'affaire scalable. **Le faire tourner suppose de rendre l'app assez robuste pour « rester » — ce qu'elle ne peut pas encore.**

---

## 6. SWOT

### Forces (réelles, sans complaisance)
- **Crédibilité métier** : ingénieurs pédagogiques + lignée **C-Campus** (Marc Dennery). « Pédagogues, pas consultants IA génériques » = positionnement **défendable** dans un marché saturé de « formation ChatGPT ».
- **Thèse juste et bien timée** : la bascule SBO est un macro-mouvement documenté ; **Learn → Do → Match** articule intelligemment le trou entre LMS pur et conseil pur.
- **Qualité de spécification** au-dessus de la moyenne pré-seed (dé-risque « comprennent-ils le problème ? »).
- **Offre conseil (STRIDE) réelle et vendable** : livrables contractualisés, ancrage terrain, partenariat C-Campus.
- **Design/UX de l'app de haut niveau** → démo bien (compte pour vente entreprise + levée).
- **Lucidité interne** : les docs s'auto-critiquent (« prix provisoires », « en attente validation »). Rare et dé-risquant.

### Faiblesses
- **Instabilité de positionnement** (pivot B2C → B2B en 6 mois, non refermé ; pricing contradictoire).
- **Produit = démo, pas produit** (pas de backend, ~4 000 h devant, 2 personnes).
- **Moat partiellement construit** : ✅ couche de preuve (`EvidenceRef`) **faite** ; ❌ matching absent du code, ❌ analytics sans instrumentation (dashboards sur mocks).
- **Modèle financier plafonné et incohérent** ; hockey stick généré par IA.
- **Sur-extension des fondateurs** (5+ rôles pour 2).
- **Exposition AI Act haut-risque sous-provisionnée.**
- **Un seul design-partner** (aucune validation de demande multi-clients).

### Opportunités
- **Catégorie SBO en formation en France** (fenêtre premier entrant + dé-concentration = place mid-size).
- **AI Act Art. 4** : demande sans seuil, catalyseur août 2026, même acheteur DRH, éligible OPCO.
- **Discours SBO** (podcasts, ANDRH, Learn Assembly) = **canal de distribution** peu coûteux, adapté aux profils fondateurs.
- **Budget entreprise/OPCO ~29 Md€** (vs CPF qui décroît).
- **Partenariat** avec les spécialistes skills (Neobrain, 365Talents, Eightfold) = concurrents transformés en canaux.
- **Learning Buddy / MCP** (Option C) : architecture économiquement saine (inférence payée par l'hôte).

### Menaces
- **Géants financés** (360Learning 243 M$, Degreed, Cornerstone) + spécialistes skills.
- **Hiver du financement** (−66 %) → chemin « lever pour scaler » difficile.
- **Alternative d'État gratuite** sur le nom (Passeport de Compétences).
- **Réflexe d'achat « formation IA » cheap/CPF** qui capte le budget.
- **Marché « discours > pratique »** : cycles longs, risque d'être trop tôt / d'épuiser la trésorerie en évangélisant.
- **Réglementaire** (AI Act haut-risque non provisionné).

---

## 7. Trois scénarios chiffrés

> Illustratifs, hypothèses explicites, à affiner. Objectif : cadrer les arbitrages, pas prédire.

### Scénario A — Boutique services assumée
- **Récit :** conseil SBO + formation IA (C-Campus), « passeport » = livrable de service. L'app reste un support léger / démo.
- **Économie :** ~260-500 k€ de CA, **rentable**, faible risque, dépendante des fondateurs.
- **Risque :** plafond de capacité ; pas de scale ; valeur de revente faible.
- **Verdict :** **viable et honnête.** Un très bon *boutique business*. Question de fondateurs, pas d'échec marché.

### Scénario B — Le wedge « couche de preuve, financée par le service » ⭐ (recommandé)
- **Récit :** le service finance un **produit mince** (Passeport = couche de preuve exposée en API/MCP) ; entrée par **AI Literacy Art. 4** ; ancrage B2B ETI/OF.
- **Économie :** an-1 ≈ scénario A (services) + amorçage SaaS ; 3 ans **~0,3 → 1-1,5 M€**, part SaaS croissante, marge qui s'améliore à mesure que la couche de preuve se remplit.
- **Risque :** exécution/focus ; nécessite de **renoncer** au reste. Cycles B2B longs.
- **Verdict :** **le meilleur rapport ambition/faisabilité à 2.** Garde la porte ouverte vers la vision sans en dépendre.

### Scénario C — OS SBO entreprise (la vision)
- **Récit :** construire la plateforme complète (matching IA, org intelligence, marketplace, intégrations SIRH).
- **Économie :** nécessite **capital significatif** (équipe produit/eng) → **5-6 M€ ARR** est un horizon **5-8 ans**, pas 2027.
- **Risque :** **le plus élevé** — financement rare, concurrence lourde, features en V2/2027, moat encore vide, sur-extension garantie à 2. Le hockey stick IA n'est **pas** un plan.
- **Verdict :** **north star, pas identité court terme.** N'y engager de capital qu'après preuves d'usage (Scénario B) + financement dédié + récit unique.

---

## 8. Risques & points de vigilance (registre)

| # | Risque | Gravité | Mitigation |
|---|---|---|---|
| R1 | Sur-extension des fondateurs (5+ rôles / 2) | 🔴 Élevée | Renoncer/séquencer (Scénario B) ; externaliser le contenu marketing |
| R2 | Positionnement/pricing non réconcilié | 🔴 Élevée | Trancher un seul modèle B2B **avant** toute dépense marketing |
| R3 | Produit non construit / backend absent | 🔴 Élevée | Réduire le scope à la couche de preuve (MCP) ; ne pas bâtir un Workday |
| R4 | ~~Moat vide (Passeport sans preuve)~~ → **Preuve construite mais peu alimentée** | 🟡 Moyenne | `EvidenceRef` ✅ fait (28/07). Le risque n'est plus l'absence de modèle mais le **volume de preuves** : il dépend des missions clients → chaque mission doit émettre des preuves |
| R5 | AI Act haut-risque non provisionné | 🟠 Moyenne-élevée | Audit de classification Annexe III ; provision conformité |
| R6 | Collision de nom (Passeport d'État) | 🟡 Moyenne | Renommer OU interopérer (ESCO/ROME) et se positionner « live/prouvé » |
| R7 | Dépendance à 1 design-partner | 🟠 Moyenne-élevée | Viser 3-5 comptes de référence via le wedge Art. 4 |
| R8 | Hiver du financement | 🟡 Moyenne | Bootstrap-first ; trésorerie de service ; ne pas dépendre d'une levée |
| R9 | Crédibilité abîmée par chiffres gonflés | 🟠 Moyenne-élevée | Bannir le hockey stick IA et toute métrique non sourcée en externe |

---

## 9. Feuille de route recommandée — « La couche de preuve, financée par le service »

**Principe directeur :** *ne financez pas la vision avec de la conviction — financez-la avec la trésorerie du service et la preuve d'usage. Chaque euro de produit sert la boucle preuve.*

### Horizon 0-3 mois — Trancher & réconcilier (coût quasi nul, impact maximal)
1. **Choisir le wedge (Scénario B)** et **écrire le NON** : matching IA, org intelligence, marketplace, intégrations SIRH → **gelés** jusqu'à preuves + clients.
2. **Réconcilier pricing en un seul modèle B2B** (sièges entreprise + abonnement bundlé au STRIDE, IA en palier payant). Sortir le « Pass Solo » du rôle de moteur (essai uniquement).
3. **Reconstruire le modèle financier bottom-up** (sans le hockey stick Gemini) pour tout usage externe.
4. **Audit AI Act** : classifier les usages (Annexe III ?) et provisionner.
5. **Décider : venture ou boutique ?** C'est un choix de fondateurs qui conditionne tout le reste.

### Horizon 3-9 mois — Entrer par un produit exécutable
6. **Lancer le module « AI Literacy conforme Art. 4 »** (honnête) : land B2B, éligible OPCO, catalyseur CNIL août 2026, **sème le Passeport** avec la 1re compétence prouvée.
7. ~~**Corriger le Passeport**~~ ✅ **FAIT (28/07)** — `EvidenceRef` est en place. **Nouvelle étape :** *alimenter* la preuve — brancher chaque validation coach / badge C-Campus / livrable de mission pour qu'elle **émette** un `EvidenceRef`.
8. **Faire des services le moteur de données du produit** : chaque mission STRIDE / session coaching **émet des preuves** dans le Passeport. Arrêter le « app offert 1 an » → sièges payés dès le mois 1 (inclus dans le prix mission).

### Horizon 9-18 mois — Rendre le moat réel & mince
9. **Exposer le Passeport en API propre + serveur MCP** (Learning Buddy Option C) : la surface où la couche de preuve devient consommable, inférence payée par l'hôte.
10. **Interopérer** avec ESCO/ROME et se positionner face au Passeport d'État (« live, prouvé, projet »).
11. **Partenariats** avec 1-2 spécialistes skills (Neobrain/365Talents/Eightfold) : TLS = couche pédagogie/preuve au-dessus du « Match ».
12. **Distribution par le discours** : podcasts L&D (ANDRH, Learn Assembly, Authentic Talent) + **Baromètre SBO France** (category-defining, lead gen, crédibilité).

### Ce qu'on mesure (au lieu du hockey stick)
- Nb de comptes de référence B2B (cible 3-5) · Nb de compétences **prouvées** au Passeport (evidence, pas Dreyfus auto-déclaré) · % de revenu récurrent vs service · Trésorerie de service (runway) · Coût d'acquisition via discours vs payant.

---

## Annexe A — SBO & IA (approfondie)

### A.1 Pourquoi SBO et IA sont le même sujet
La SBO structure les décisions RH (recrutement, mobilité, formation, rémunération) autour des **compétences réelles** plutôt que des postes. Elle **ne peut pas exister sans** une fonction L&D qui pilote la donnée compétence — et **sans IA**, le hub compétences reste statique. L'IA le rend prédictif (cartographie temps réel, matching, recommandation de parcours, détection de skill gaps). C'est exactement l'intersection que TLS revendique — d'où la justesse de la thèse, et la difficulté de l'exécuter à 2.

### A.2 État de la demande (sourcé)
- **Macro :** WEF Future of Jobs 2025 — **~39 % des compétences** à transformer d'ici 2030 ; **63 %** des employeurs citent les skills gaps comme frein n°1. Deloitte 2022 — avantages relatifs SBO (52/57/63/98/107 %, corrélationnels).
- **Adoption :** Mercer 2024/25 — début de courbe (Learning 30 %, Rewards/Gigs 19 %) ; freins capacité RH/coût. France = « discours > pratique » (ANDRH, Neobrain).
- **Outils du marché :** LXP skills (Degreed, Cornerstone/EdCast, 360Learning) ; talent intelligence (Eightfold, Beamery, Workday Skills Cloud) ; **FR : 365Talents, Neobrain**. Marché LMS ~18 → 50 Md$ (2024-2030).
- **France, brique d'État :** Passeport de Compétences (Caisse des Dépôts) — **~43 M de passeports**, gratuit. ESCO (13 485 skills, UE), ROME 4.0 (France Travail) = taxonomies interopérables.

### A.3 IA en L&D — preuve vs hype (à intégrer dans la posture produit)
- **71 % des L&D** explorent/expérimentent/intègrent l'IA (LinkedIn 2025) ; mais **80 % la disent importante / ~25 % l'intègrent routinièrement** → adoption **large mais peu profonde**.
- **Preuve honnête :** l'IA d'accès à la connaissance et de **tutorat conversationnel** montre des gains ; l'IA de **génération de contenu** ne montre **pas** de corrélation fiable avec la rétention/performance. → cohérent avec la doctrine TLS « l'IA augmente la pratique, ne la remplace pas ».
- **Pièges de citation à bannir** (crédibilité) : « +25 % de performance » (non vérifié), étude « cognitive debt » Kosmyna (~18 participants, non peer-reviewed), « 10 % des entreprises utilisent l'IA » (toute IA, pas l'IA générative).

### A.4 Le pari « Passeport = couche » (défensabilité)
- **Idée :** ne pas vendre une app ni un assistant, mais **la couche compétences** d'une organisation ; l'app et le Learning Buddy en sont des surfaces (brief interne « Learning Buddy Option C »).
- **Pourquoi c'est la meilleure idée du corpus :** en serveur MCP, **l'inférence est payée par l'assistant hôte** (coût fixe pour TLS), et le moat (le Passeport) reste **mince et net** — la seule architecture **économiquement saine à 2 personnes**.
- **Condition de défensabilité :** le Passeport doit devenir une **API propre avec un vrai modèle de preuve** *avant* d'être exposé. ✅ **Mise à jour 28/07 : le modèle de preuve existe** (`EvidenceRef` — 3 régimes, validation humaine signée, niveau optionnel). **Il ne reste que la mise au propre en API.** La condition bloquante est donc levée à moitié : ce qui manque n'est plus conceptuel, c'est de l'exposition technique — et du **volume de preuves**, qui dépend des missions clients.
- **Limite :** un agent qui « répond » n'a aucune valeur défendable (tout modèle le fait gratuitement). La valeur est **la preuve calibrée** (niveau réel, parcours, evidence), pas la conversation.

---

## Annexe B — Fiabilité des sources internes (tri)

| Affirmation interne | Statut | Correction / note |
|---|---|---|
| « EdTech France = 7,88 Md€ (2024) » | 🔴 **Faux** | Chiffre global mal étiqueté. Réel : **1,8 Md€** (EY-Parthenon × EdTech France). |
| « Marché français 320 Md$ » | 🔴 **Faux** | Chiffre global digital learning mal attribué à la France. |
| Vision 5 ans : 260 700 € → 1,45 M€ → 5-6 M€ → 8-10 M€ | 🔴 **Non fiable** | Explicitement « proposé par Gemini Deepsearch » (généré par IA). |
| Même 260 700 € = cible 2026 *et* 2027 | 🟠 **Incohérent** | Muddle entre docs ; à trancher. |
| Business model « non figé » (FAITS-OFFRES) vs paliers 29/49/79 € (CDC 11bis) | 🟠 **Non réconcilié** | Le cadre existe (CDC) ; le go-to-market ne l'a pas adopté. Deux modèles coexistent. |
| Pricing : Pass Solo 30 €/mois (Notion) vs paliers (CDC) | 🟠 **Contradictoire** | À unifier. |
| Ordre STRIDE (S-T-**R**-I vs S-T-**I**-R selon docs) | 🟡 **Incohérent** | Vos propres docs divergent sur l'ordre de votre méthode. |
| Stats SBO Deloitte (+107 % etc.) | 🟢 **Réelles mais à cadrer** | Probabilités **relatives, corrélationnelles**, 2022, US-skewed. Pas un ROI absolu. |
| « Premier client = grand groupe FR (non nommé), déployé avec Dinootoo » | 🟢 **Réel** | 1 seul design-partner ; ne pas nommer le client publiquement. |
| Qualiopi | 🟢 **Via C-Campus uniquement** | TLS **n'est pas** Qualiopi en propre. Ne jamais l'afficher comme tel. |
| Métriques d'usage TLS (satisfaction, adoption…) | ⚫ **Inexistantes** | Ne rien inventer. Analytics à 0 %. |

**Enseignement :** l'incohérence documentaire est un **symptôme**, pas un accident — elle reflète l'absence de tranche (positionnement, pricing) et le recours à des générateurs (IA) non relus. **Refermer les décisions refermera les docs.**

---

## Annexe C — Sources externes (marché, sourcées juillet 2026)

**Marché & filière**
- DARES / Banque des Territoires — dépense formation FR 56,6 Md€ (2024) : https://www.banquedesterritoires.fr/en-2024-566-milliards-deuros-de-depenses-pour-la-formation-professionnelle-continue-et
- DARES — dépenses de formation professionnelle : https://dares.travail-emploi.gouv.fr/donnees/les-depenses-de-formation-professionnelle
- EY-Parthenon × EdTech France 2026 (chiffres filière) : https://edtechgrandouest.fr/filiere-edtech-france-2026-etude-ey-parthenon/
- AEF Info — répartition CA EdTech 66/26/8 : https://www.aefinfo.fr/depeche/713289
- Xerfi — marché de la formation professionnelle : https://www.xerfi.com/presentationetude/le-marche-de-la-formation-professionnelle_sae35
- Xerfi — chute des levées EdTech : https://www.xerfi.com/blog/chute-drastique-des-levees-de-fonds-des-start-up-de-l-education_1815
- Straits Research — Europe LMS : https://straitsresearch.com/report/lms-market/europe
- The Business Research Company — Global LMS : https://www.thebusinessresearchcompany.com/report/learning-management-system-global-market-report

**Concurrence / financements**
- RH Matin — Didask 10 M€ (2025) : https://www.rhmatin.com/formation/digital-learning/e-learning-didask-leve-10-millions-d-euros-en-integrant-l-ia-au-coeur-de-l-ingenierie-pedagogique.html
- BusinessWire — 360Learning 60 M$ ARR : https://www.businesswire.com/news/home/20240207502564/en/
- FinancialContent — Edflex 18 M$ (2025) : https://markets.financialcontent.com/stocks/article/accwirecq-2025-10-2-edflex-raises-18m
- L'Usine Nouvelle — VC FR S1 2025 −35 % : https://www.usinenouvelle.com/editorial/start-up-l-inquietant-decrochage-des-levees-de-fonds-en-france-au-premier-semestre-2025.N2235220

**SBO / L&D / IA**
- Deloitte — The Skills-Based Organization (rapport PDF) : https://www.deloitte.com/content/dam/insights/articles/2024/us175310_consulting-the-skills-based-org-report/di-the-skills-based-organization-report.pdf
- Mercer — Skills Snapshot (adoption) : https://www.mercer.com/insights/talent-and-transformation/skill-based-talent-management/survey-report-insights-global-skills-technology-and-adoption/
- WEF — Future of Jobs Report 2025 : https://reports.weforum.org/docs/WEF_Future_of_Jobs_Report_2025.pdf
- ANDRH — Skills-Based Organization : https://www.andrh.fr/article/la-skills-based-organization-revolution-des-emplois-par-les-competences
- Neobrain — SBO état des lieux France : https://www.neobrain.io/blog/skills-based-organizations-quel-etat-des-lieux
- LinkedIn — 2025 Workplace Learning Report : https://learning.linkedin.com/resources/workplace-learning-report
- Continu — AI Learning Agents in Corporate L&D (2025) : https://www.continu.com/research/ai-learning-agents-in-corporate-l-d
- Centre Inffo — mettre en place une SBO : https://www.centre-inffo.fr/site-centre-inffo/comment-mettre-en-place-une-skills-based-organization
- Cegos — organisation pilotée par les compétences (L&D) : https://www.cegos.fr/ressources/mag/formation-2/management-de-la-formation/organisation-pilotee-par-les-competences-definition-enjeux-et-impacts-pour-le-ld

**Réglementaire & financement**
- Latham & Watkins — AI Act Art. 4 (littératie) : https://www.lw.com/en/insights/upcoming-eu-ai-act-obligations-mandatory-training-and-prohibited-practices
- Capstan — formation des salariés à l'IA (Art. 4) : https://www.capstan.fr/articles/2692-formation-des-salaries-a-lia-5-questions-sur-vos-obligations-demployeur/
- Eurostat — usage de l'IA dans les entreprises : https://ec.europa.eu/eurostat/statistics-explained/index.php?title=Use_of_artificial_intelligence_in_enterprises
- Insee Première n°2061 — TIC dans les entreprises 2024 : https://www.insee.fr/en/statistiques/8605307
- France compétences — usage des fonds 2024 : https://www.francecompetences.fr/fiche/france-competences-publie-son-rapport-2024-sur-lusage-des-fonds-de-la-formation-professionnelle/
- monpoleformation — CPF −30 % post-restrictions : https://monpoleformation.fr/cpf-chute-utilisation-nouvelles-restrictions-2025/

---

*Fin de l'étude — v1, 25 juillet 2026. À valider et itérer avec les fondateurs. Les décisions à trancher (§9, horizon 0-3 mois) conditionnent tout le reste.*
