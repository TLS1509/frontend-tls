# Confrontation — plan de lancement PAD × nos études

> **Objet :** confronter le plan de lancement daté aux constats vérifiés (étude de viabilité, réalignement H2, revue transversale des CDC, code).
> **Sources PAD :** [SINGLE SOURCE OF TRUTH](https://app.notion.com/p/3abcdd696db68091a136eaf308c3b1df) · [Point TLS interne — CR de réunion du 28/07](https://app.notion.com/p/3abcdd696db680a0955bc3f08b135083) · [Vision & Sitemap](../site/propositions-PAD/PAD-vision-strategique-sitemap.md) · [Stratégie de contenu](../site/propositions-PAD/PAD-strategie-contenu-b2b.md)
> **Nos sources :** [`ETUDE-VIABILITE`](ETUDE-VIABILITE-LEARNING-APP.md) · [`STRATEGIE-REALIGNEMENT-H2-2026`](STRATEGIE-REALIGNEMENT-H2-2026.md) · [`MATCH-ET-ANALYTICS-ETAT-REEL`](MATCH-ET-ANALYTICS-ETAT-REEL.md) · [`REVUE-TRANSVERSALE-CDC`](REVUE-TRANSVERSALE-CDC.md) · le code (`src/`)
> **Date :** 28 juillet 2026 · **v2** — révisé après lecture du CR de réunion.

---

## ✅ PARTIE 1 — Ce que la réunion du 28/07 a déjà tranché

**Plusieurs tensions que j'avais relevées dans le SSOT sont résolues par la réunion.** Le SSOT est *In Review* et son texte est, sur ces points, **en retard sur les décisions prises**.

| Point | Décision de réunion | Verdict |
|---|---|---|
| **Le « Match »** | *« Le Match en 2026 = **passeport de compétences matchant les contenus** ; allocation sur projets envisagée pour **mars 2027 au plus tôt** »* | ✅ **Exactement la reformulation honnête recommandée.** Vous y êtes arrivés seuls. **Mais le SSOT dit encore « matching Humains + Agents IA » dans le scope de lancement → texte à corriger.** |
| **Monétisation** | 2026 = **B2B prioritaire** (« pas uniquement SaaS »). 2027 = **120-150 K€ prestations + 30-40 K€ app**. Pricing **29 € / 129 € / 150 €+**, « à revalider avec données réelles ». | ✅ **Cohérent avec notre réalignement.** Le SaaS est explicitement une ligne **minoritaire** (~20-25 % en 2027). La contradiction entre les 3 docs est levée. *(Corrige mon constat « aucun pricing arrêté » — il existe.)* |
| **xAPI + MCP** | *« Serveur d'authentification = aussi service xAPI »* · *« xAPI pour les données d'apprentissage, **MCP pour le moteur de recommandation** »* | ✅ Décidé. Voir la vigilance §3 ci-dessous. |
| **RACI** | *(voir §2.0 — le RACI écrit est **inversé** par rapport à la réalité)* | ⚠️ **Rouvert** |
| **Sitemap** | **5 entrées** : Accueil · Learning App · Studio IA & Pédagogie · Accompagnement *(dropdown)* · Ressources *(dropdown)*. Pas de page hub intermédiaire. « Accompagnement STRIDE » à renommer (piste : *Déploiement IA & SBO*). | ✅ Resserré — bonne décision |
| **Autodiagnostic** | *« logique métier complète codée (barème, calcul, questions) ; **front-end à finaliser** »* | ✅ **Corrige mon alerte** : ce n'est pas « 2 web apps à développer », la logique existe. Reste le front. |
| **Découpage en 2 lots** | Lot 1 → 6 août · Lot 2 après | ✅ Même logique que notre contre-proposition, trouvée indépendamment |
| **Page Fondateurs** (vs « Équipe ») | Valoriser le duo comme force | ✅ Aligné avec « preuve sociale = fondateurs » |

---

## 🔴 PARTIE 2 — Ce qui reste ouvert

### 2.0 — ⚠️ Le RACI écrit est inversé par rapport à la réalité

**Ce que dit le SSOT :**

| Domaine | « Co-fondateur 1 (Vous) » = Chloé | « Co-fondateur 2 (Associé) » = Pierre |
|---|---|---|
| Product **Back-Office** | **A/R** | Consulté |
| Product **Front-Office & UI/UX** | Consulté | **A/R** |

**La réalité (confirmée le 28/07) : c'est l'inverse.**
- **Chloé → le front-end** (ce dépôt : React, ~140 pages, le design system, l'app)
- **Pierre → le back-office** (WordPress / Scaleway)

**Pourquoi ce n'est pas un détail de paperasse :** ce document est la *single source of truth* d'un sprint de 9 jours, et **il assigne les chantiers à l'envers**. Chaque tâche datée du Master Backlog hérite de la mauvaise personne. Sur un chemin critique déjà saturé, c'est la cause d'échec la plus banale et la plus évitable.

→ **Action : corriger le tableau RACI et réattribuer les tâches de la Phase 1 avant de lancer le sprint.**

---

### ⚠️ Conséquence sur la portée de cette analyse

Tous mes constats « non construit » (**matching absent**, **analytics à 0 %**, dashboards sur mocks) sont établis **par lecture du front-end — le dépôt de Chloé**. Le **back-office WordPress de Pierre n'est pas dans ce dépôt et je ne peux pas l'inspecter.**

- **Ce qui reste vrai quoi qu'il y ait dans le BO :** un événement d'usage doit être **émis par le front**. Sans instrumentation côté React, le back n'a **rien à stocker** — quelle que soit sa qualité. La conclusion sur la phase Alpha aveugle **tient**.
- **Ce que je ne peux pas trancher :** si de la logique de matching, du stockage d'événements ou de la génération de rapports existent déjà côté WordPress. **À demander à Pierre plutôt qu'à supposer.**

---

### 2.1 — Les logos clients (nouveau risque, apparu en réunion)

**Décidé en réunion :** *« Réassurance/preuve sociale : **logos clients (carrousel simple)**, partenariat C-Campus, cas client Samy »*.

**Le problème :** c'est en contradiction **avec le doc Vision de PAD lui-même**, qui disait — et c'était juste :
> *« La preuve sociale sera assurée par […] l'expertise des fondateurs et le partenariat C-Campus, **palliant ainsi l'absence temporaire de logos clients**. »*

Et avec `FACTS-CANON` : **aucun client nommable**, Orange **jamais public**, aucun témoignage avec accord écrit.

⚠️ **Un logo client affiché sans autorisation écrite est un risque juridique et commercial réel**, pas une question de style.

**Solutions :**
- **A.** Pas de carrousel de logos. Preuve sociale = fondateurs + C-Campus, comme le disait la Vision. ⭐
- **B.** Carrousel **uniquement** avec les clients ayant donné un **accord écrit explicite** — à obtenir avant le 06/08 (délai très court).
- **C.** Mentions **anonymisées et sectorielles** (« un opérateur télécom », « un groupe de BTP ») — sans logo.

**Sur le cas client Samy :** l'interview à la remise des diplômes est une **bonne** piste — mais elle produit un livrable **après** l'événement. Ne pas la compter dans le Lot 1.

---

### 2.2 — Le « verrouillage naturel » contredit la décision xAPI

**Le SSOT :**
> *« créant un **verrouillage naturel** : plus le client utilise l'application, plus sa donnée de compétences s'enrichit, rendant le **coût de changement de plateforme critique** »*

**La même réunion décide :** xAPI pour la **portabilité des données entre applications**.

→ **Ces deux propositions de valeur sont opposées.** On ne peut pas vendre *« vos données sont portables, standard ouvert »* **et** *« partir vous coûtera cher »*. Un DRH averti verra la contradiction.

**Reco :** assumer la **portabilité comme argument de vente** — c'est le pari « couche », et c'est ce qui distingue de Degreed / 365Talents. Le moat devient **l'usage et le workflow**, pas la captivité des données. → **Reformuler le paragraphe « Moat » du SSOT.**

---

### 2.3 — La phase Alpha ne peut rien mesurer

**Objectifs déclarés (07-28/08) :** *« vérification de l'étanchéité du tunnel, remontée des datas dans les connecteurs/CRM »*, *« suivre les métriques »*.

**Ce que dit le code :** **aucune instrumentation**. Zéro `trackEvent` / `posthog` / `amplitude`. Les dashboards analytics **tournent sur des mocks** (`src/data/analytics.ts`). L'inventaire d'événements est marqué **P0 « BLOCKING all modules »** — et **le fichier qu'il référence n'existe pas**.

→ **3 semaines de test alpha sans instrumentation = des bugs signalés à la main, pas des métriques.** Et c'est précisément l'étanchéité du tunnel de paiement qu'on ne pourra pas vérifier autrement.

**Solution minimale avant le 06/08 :** instrumenter **5 événements** — visite → inscription → paiement → activation → première leçon. **Des heures, pas des semaines.** C'est le meilleur rapport valeur/effort de tout le sprint.

---

### 2.4 — Deux revendications déjà écartées par nos docs

| Revendication SSOT | Notre constat |
|---|---|
| *« **Alliance unique** de technologie IA et d'ingénierie pédagogique »* | Le réalignement juge le superlatif *« la seule solution combinant… »* **indéfendable** (360Learning ~243 M$, Didask 10 M€, Degreed, Neobrain, 365Talents combinent déjà LMS + skills + analytics, financés) → **à supprimer**. « Alliance unique » est la même revendication reformulée. |
| *« **interopérabilité SI/SIRH** »* en avantage compétitif | L'intégration SIRH/CRM est **stade 5**, explicitement *« À ne pas viser au MVP »*, cible **V3**. Sur-promesse. *(Nuance : xAPI est un vrai pas vers l'interop — mais ce n'est pas encore de l'intégration SIRH.)* |
| *« modèle **EDRA** »* | **EDRACT® est une marque déposée C-Campus** (Marc Dennery) → créditer, ou clarifier si « EDRA » est autre chose. |

---

### 2.5 — La charge de la Phase 1 : 9 jours

À livrer d'ici le 06/08 : 7 modules BO/FO connectés · Stripe + PennyLane en production · site vitrine V1 · 5 parcours · 12-13 contenus · référentiels · veille · front de l'autodiagnostic · **Marketstudio** · protocoles de test.

**Le point le plus discutable reste le Marketstudio** : construire un outil d'automatisation de contenu **pendant** le sprint de lancement. Il **ne sert aucun jalon du 06/08** — il sert la campagne du 07/09. → **Le sortir de la Phase 1** (d'autant que l'autodiag y exporte du Markdown : le couplage ajoute du risque au chemin critique).

**Contexte à ne pas ignorer :** la pression financière est réelle (13 147 € d'impôts non soldés, échéancier supprimé, huissier, 750 € le 20/08). **Chaque jour passé sur de l'outillage est un jour non facturé.**

---

## 3. Ce qui est bon et mérite d'être dit

- **Le découpage 50/50** est la bonne réponse à la contrainte d'août.
- **Le triage P0/P1/P2** en basse capacité est mature — peu d'équipes le formalisent.
- **L'honnêteté sur les 15 %** : le doc ne fait pas semblant, il dimensionne en conséquence.
- **Le Match reformulé** (contenus en 2026, allocation mars 2027+) est **exactement** la posture défendable.
- **La Bibliothèque de compétences** adossée à **France Compétences + référentiels européens** est un actif honnête et vérifiable — bien meilleur qu'un « catalogue ».
- **Des dates explicites et testables.**

---

## 4. Les 5 actions qui restent

| # | Action | Échéance | Effort |
|---|---|---|---|
| **0** | ⚠️ **Corriger le RACI inversé** et réattribuer les tâches datées de la Phase 1 | **avant de lancer le sprint** | minutes — mais bloquant |
| **1** | **Instrumenter les 5 événements du tunnel** *(côté front → Chloé)* | avant 06/08 | heures |
| **2** | **Trancher les logos clients** (accord écrit, ou pas de logos) | avant 06/08 | décision |
| **3** | **Corriger le SSOT** : retirer « matching Humains + Agents IA » du scope de lancement (la réunion l'a déjà déplacé à mars 2027) | cette semaine | minutes |
| **4** | **Reformuler le « Moat »** : portabilité assumée, pas verrouillage | cette semaine | minutes |
| **5** | **Sortir le Marketstudio de la Phase 1** + supprimer « alliance unique » / « interopérabilité SIRH » + créditer C-Campus sur EDRACT® | cette semaine | décision |

---

## 5. La formulation produit qui reste vraie le 7 août

> **Ce qui est vrai :** une plateforme qui centralise la formation, valide les compétences **par la preuve** — une validation humaine signée, pas une auto-déclaration — et capitalise les retours d'expérience. **Learn → Do**, et un **Match sur les contenus**.
>
> **Ce vers quoi elle est construite :** l'allocation des talents sur les projets, **à partir de mars 2027**. Chaque compétence validée est adossée à une preuve — **c'est précisément ce qui le rendra possible**.

C'est vrai, c'est différenciant (peu de plateformes « skills » peuvent dire que leurs niveaux sont infalsifiables), et **ça ne vieillit pas mal**.

---

*Fin — v2, 28 juillet 2026, révisé après le CR de réunion.*
