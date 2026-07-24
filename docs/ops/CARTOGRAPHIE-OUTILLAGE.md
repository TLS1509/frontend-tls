# Cartographie besoins → workflows → outillage

> **Créé le 2026-07-23.** Objet : décider quelles skills sur-mesure écrire pour TLS, en partant
> des besoins réels et non du catalogue disponible.
> Statut des lignes : ✅ sourcé (référence donnée) · ❓ non validé, à trancher par Chloé.
> Rien ici ne doit contredire [`_canon/FACTS-CANON.md`](../_canon/FACTS-CANON.md), qui prime.

---

## Méthode

Trois niveaux, dans cet ordre. On ne descend jamais d'un cran sans avoir rempli le précédent.

```
OBJECTIF        ce qu'on cherche à obtenir, chiffré et daté quand c'est possible
   ↓
WORKFLOW        la tâche récurrente qui sert cet objectif — avec sa fréquence
   ↓
OUTIL           ce qui l'exécute : skill existante, skill à écrire, ou rien (à la main)
```

**Trois règles qui évitent de fabriquer de l'outillage inutile :**

1. **Pas de skill sans workflow récurrent.** Une tâche faite une fois ne justifie pas une skill —
   une conversation suffit. Le seuil raisonnable : au moins une fois par semaine, ou une fois par
   mois avec un format contraint.
2. **Pas de workflow sans objectif.** Si on ne sait pas dire à quoi il sert, c'est un rituel, pas
   un levier.
3. **Un objectif non chiffré est un vœu.** On le marque ❓ et on ne construit rien dessus.

**Ce qui distingue une skill TLS d'une skill générique** : elle encode vos contraintes propres —
les faits validés, le registre (*vous* sur le public, *tu* dans l'app), les interdits
(jamais Qualiopi, jamais CPF, pas de client nommé, pas de métrique inventée), vos formats.
C'est précisément ce que les plugins génériques ne peuvent pas faire.

---

## Le socle — quatre contraintes qui traversent tout

Elles conditionnent ce qu'on peut outiller, et surtout ce qu'on ne peut pas encore.

| # | Contrainte | Conséquence sur l'outillage |
|---|---|---|
| S1 | **Aucune métrique TLS validée.** [`METRICS-A-COLLECTER.md`](../_canon/METRICS-A-COLLECTER.md) existe parce que rien n'est encore citable. ✅ **Cause identifiée dans les CDC** : le cahier 10 (Analytics) définit précisément les métriques que l'app produira — engagement, complétion, NPS, rétention — et il est à **0 %**, reporté en Phase 17-18. | Tout contenu doit s'appuyer sur la valeur d'usage, jamais sur des preuves chiffrées. **S1 se lèvera mécaniquement quand le cahier 10 sera livré** : c'est la dépendance à surveiller, pas une fatalité. |
| S2 | **Le pricing est gelé.** Les prix STRIDE (A3-A5) et Learning App (L2-L4) sont en ❓, en attente d'une analyse business model dédiée. ✅ | **Aucune skill de proposition commerciale n'est écrivable maintenant** — elle propagerait des chiffres non validés. Bloquant pour toute la fonction Vente. |
| S3 | **Le client entreprise ne peut pas être nommé.** « Un grand groupe français », jamais le nom. ✅ | À encoder dans le garde-fou, pas à laisser à la vigilance humaine. |
| S4 | **Équipe de deux.** Chloé (tech, pédagogie, produit) et Pierre-Armand (commercial, delivery). ✅ | Le temps est la ressource rare. Priorité à ce qui est fait chaque semaine, pas à ce qui est fait bien. |

---

## Fonction 1 — ACQUISITION & NOTORIÉTÉ

**Priorité déclarée par Chloé, 2026-07-23.**

### Objectifs ✅ [`MARKETING-LINKEDIN.md` §2](../marketing/MARKETING-LINKEDIN.md)

| Horizon | Abonnés LinkedIn | Objectif business |
|---|---|---|
| 1 mois | 17 → 100-150 | Page crédible, première série de posts, fondateurs actifs |
| 3 mois | 400-600 | Flux entrant de formateurs, 2-3 leads conseil |
| 6 mois | 1 000-1 500 | Page reconnue dans le L&D français, pipeline conseil régulier |

> Le doc note lui-même que ces cibles supposent une cadence tenue. Sans régularité, rien ne décolle.

### Workflows récurrents ✅ [Notion — Personas & Stratégies d'acquisition](https://app.notion.com/p/379cdd696db68122b65de2db20782abf) (2026-06-09)

Le doc Notion recense **dix canaux avec leur rythme et leur responsable** — CMT (Chloé) ou PAD
(Pierre-Armand). Ma première version de cette carte n'en connaissait que trois.

| Workflow | Rythme ✅ | Resp. | Outillé par | État |
|---|---|---|---|---|
| Post LinkedIn | 2-3 / sem. | CMT + PAD | `social` + `stop-slop` | 🟡 générique |
| Article de blog SEO | 2 / mois | CMT | `copywriting` | 🟡 générique |
| **Newsletter « La Vigie SBO »** | 1 / quinzaine | CMT | rien | 🔴 **absent de ma v1** |
| **Auto-diagnostic maturité SBO** | permanent | CMT | rien | 🔴 lead magnet principal, non outillé |
| **Vidéo YouTube / tutoriel** | 1 / mois | CMT | `video-scriptwriter`, `heygen-*` | 🟡 skills présentes, format non cadré |
| Webinaire | 1 / mois | PAD | rien | 🔴 |
| Carrousel LinkedIn | 1 / sem. | CMT | rien | 🔴 format à plus forte portée |
| Outreach ciblé (50 comptes) | permanent | PAD | rien | 🔴 |
| Étude de cas client | ponctuel | PAD | rien | ⛔ **bloqué par S1** — aucune preuve chiffrée |
| Livre blanc annuel | 1 / an | CMT + PAD | `deep-research` | ✅ couvert |

**KPI par canal, déjà fixés** ✅ : LinkedIn 500 impressions/post et 3 leads qualifiés/mois ·
lead magnet 50 téléchargements/mois, 20 % en essai · webinaire 50 inscrits, 15 % en Pass Solo ·
newsletter 25 % d'ouverture, 3 % de clic.

### Quatre personas documentés ✅

DRH/Directeur Talents · Responsable Formation/L&D · COO · Consultant RH indépendant.
Chacun avec ses enjeux, ses points de douleur, **ses objections** et ses canaux. C'est la
matière qui manquait le plus : une skill de rédaction peut s'appuyer dessus au lieu d'écrire
dans le vide.

### Ce qui existe déjà comme matière

`MARQUE-VOIX.md` (registre, ton) · `MARKETING-LINKEDIN.md` (4 piliers éditoriaux, formats classés
par portée, cadence) · `COMPETITIVE-BRIEF.md` · `FAITS-OFFRES.md` · connecteur Canva (38 outils).

### Gaps → skills candidates

- **`tls-post-linkedin`** — encode la voix fondatrice, les 4 piliers éditoriaux, les formats par
  portée, et les interdits de FACTS-CANON. Le levier le plus direct sur l'objectif chiffré.
- **`tls-carrousel`** — format le plus performant, aujourd'hui à la main. Structure narrative +
  découpage en slides + passage à Canva.
- **`tls-recycle-mag`** — un article existant → post ou carrousel, sans réécrire depuis zéro.

---

## Fonction 2 — VENTE & CONVERSION

**Priorité déclarée par Chloé. Ma v1 la classait « objectifs non documentés » — c'était faux :
tout est écrit dans Notion.** Mais ces chiffres sont précisément ceux que FACTS-CANON gèle.

### Objectifs ✅ [Notion — Catalogue d'offres & stratégie commerciale](https://app.notion.com/p/379cdd696db681a0a3aeee0c7ca93531) (2026-06-09)

| Offre | Volume visé | Prix | CA annuel |
|---|---|---|---|
| Pass Solo | 170 abonnés/mois | 30 € | 61 200 € |
| Pass Pro | 108 abonnés/an | 250 € | 27 000 € |
| Solutions IA « Plug & Play » | 3 ventes/an | 7 500 € | 22 500 € |
| Méthode STRIDE | 3 missions/an | 10 000 € | 30 000 € |
| Upskilling L&D | 2 projets/an | 20 000 € | 40 000 € |
| Pôle Conception (TJM) | 30 j/an | 1 000 € | 30 000 € |
| Pôle Delivery (TJM) | 50 j/an | 1 000 € | 50 000 € |
| **Total** | | | **260 700 €** |

⚠️ **Tous ces chiffres sont en ❓ dans FACTS-CANON** (A3-A5, L2-L4, C6). Ils sont donc
utilisables **en interne pour se piloter**, jamais dans un document qui sort.

### Qualification : les critères existent ✅

**Verticales prioritaires** : services professionnels (cabinets, ESN, agences) · industrie en
transformation · banque-assurance mid-market · scale-ups françaises.
**Taille** : ETI 200-2 000 collaborateurs.
**Répartition** : PAD porte le commercial et le déploiement, CMT la conception et le diagnostic.

### Le flywheel ✅

Prestation experte (pilier 3) → révèle les manques → Audit Flash → mission STRIDE (pilier 2) →
la mission finit mais l'app reste (pilier 1) → revenus récurrents → les données d'usage
nourrissent de nouveaux modules à revendre. C'est une logique d'enchaînement claire, et elle
donne le vrai ordre de priorité commerciale : **l'audit flash est la porte d'entrée**, pas la
Learning App.

### Workflows récurrents

| Workflow | Fréquence | Outillé par | État |
|---|---|---|---|
| Audit Flash SBO (0,5-1 j) | porte d'entrée | rien | 🔴 **le maillon décisif du flywheel** |
| Qualification d'un lead entrant | continu | critères ✅ mais pas de grille | 🟡 |
| Proposition / devis | par opportunité | rien | ⛔ **bloqué par S2** |
| QBR client entreprise | trimestriel | rien | 🔴 |
| Suivi de pipeline | continu | **CRM Notion complet** (7 bases, pipeline 8 étapes) | ⚠️ **existe mais non tenu** — relances dépassées de 3 à 5 mois, voir audit §8 |

### Gap → skill candidate

- **`tls-audit-flash`** — structure le diagnostic express : analyse du manque de compétences,
  restitution, passerelle vers STRIDE. C'est le maillon qui déclenche tout le reste du flywheel,
  et il ne dépend d'aucun prix. **Écrivable dès maintenant, contrairement au devis.**

## Fonction 3 — PRODUIT & APP TLS

**Priorité déclarée par Chloé.**

### Objectifs ✅ [`INDEX.md`](../INDEX.md) · [`PHASE-16-GAP-ANALYSIS.md`](../PHASE-16-GAP-ANALYSIS.md) · CDC

Aligner le front-office React sur les 16 cahiers de spécification. État actuel : 4 cahiers ✅,
9 en 🟡 (50-90 %), 3 en 🔴. Le cahier 02 (Passeport) verrouille les cahiers 01, 05, 07, 11 et 13.

> ⏰ **Échéance datée, et c'est maintenant.** Les cahiers portent **« MVP Juillet 2026 »**
> (14 occurrences) et **« V1 Septembre 2026 »** (7 occurrences). Nous sommes le 23 juillet.
> C'est le seul objectif de toute cette cartographie qui ait une date — et elle est atteinte.
> À confirmer : cette échéance tient-elle toujours ?

### Workflows récurrents

| Workflow | Fréquence | Outillé par | État |
|---|---|---|---|
| Aligner une page FO sur son cahier | par cahier | procédure en 5 étapes dans `CLAUDE.md` ✅ | 🟡 **écrite mais pas outillée** |
| Refonte / audit d'interface | continu | `impeccable` (50 usages) | ✅ bien couvert |
| Synchro code ↔ Figma ↔ Notion | à chaque changement DS | `figma:figma-use` + règle de triple synchro ✅ | 🟡 la règle existe, la vérification est manuelle |
| Audit typo / accessibilité | par chantier | `CHANTIER-TYPO-A11Y.md` en cours | 🟡 |

### Gaps → skills candidates

- **`tls-cahier-gap`** — prend un cahier et les pages FO correspondantes, produit la matrice de
  couverture. La procédure existe déjà en 5 étapes dans `CLAUDE.md` : il s'agit de l'outiller,
  pas de l'inventer.
- **`tls-ds-sync`** — vérifie que code, Figma et Notion disent la même chose. Votre doctrine de
  triple synchro est écrite mais aucun outil ne la contrôle, et
  [`AUDIT-FIGMA-CODE-DRIFT`](../figma/) documente une dérive déjà constatée.

---

## Fonction 4 — PREUVE *(transversal)*

Ce n'est pas une fonction que vous auriez nommée, mais c'est la contrainte racine : elle bride
l'acquisition **et** la vente. Elle mérite donc sa ligne.

### Objectif ✅ [`METRICS-A-COLLECTER.md`](../_canon/METRICS-A-COLLECTER.md)

Remplacer le qualitatif par des métriques sourcées et citables. Trois gisements identifiés :
C-Campus (le plus accessible), Dinootoo/Orange, analytics de l'app.

### Workflows récurrents

| Workflow | Fréquence | Outillé par | État |
|---|---|---|---|
| Vérifier un contenu avant publication | à chaque publication | vigilance humaine | 🔴 **le point de rupture** |
| Collecter une métrique et la valider | ponctuel | rien | 🔴 |

### Gap → skill candidate

- **`tls-facts-guard`** — passe tout contenu destiné à sortir au filtre de FACTS-CANON :
  Qualiopi, CPF, client nommé, métrique non sourcée, « L'Académie », registre *vous*/*tu*,
  Open Badge sans « 2.0 ». **Elle n'invente rien** : elle encode des règles que vous avez déjà
  validées. C'est ce qui la rend écrivable immédiatement, contrairement à tout le reste.

---

## Fonction 5 — PILOTAGE

### Objectifs

❓ **Rien de documenté.** Ni rituel hebdomadaire, ni indicateur de suivi, ni point de trésorerie.

### Constat

Aucun workflow de pilotage n'est écrit nulle part dans le dépôt. Ce n'est pas forcément un
manque — à deux, beaucoup passe par la conversation. Mais cela signifie qu'**il n'y a rien à
outiller ici tant que le rituel n'existe pas.** Créer une skill de briefing hebdomadaire avant
d'avoir le rituel reviendrait à outiller une habitude inexistante.

> Les skills `monday-brief`, `friday-brief`, `cash-flow-snapshot` du plugin `small-business`
> couvrent exactement ce besoin — mais elles lisent QuickBooks, PayPal et Stripe. Sans ces
> outils, elles n'ont aucune source. Vérifié le 2026-07-23 en lisant leur code.

---

---

## Divergences constatées entre les sources

Relevé le 2026-07-23 en croisant Notion et le dépôt. **Ce ne sont pas des détails de forme :
plusieurs touchent des documents explicitement destinés aux pitchs commerciaux et au site.**

### D1 — Des métriques inventées circulent dans les argumentaires de vente ⛔ grave

Les deux documents Notion du 2026-06-09 contiennent des chiffres présentés comme des promesses
client :

- « Réduisez votre turnover de **30 %** »
- « Automatisez votre reporting formation et gagnez **4,2 h/semaine** »
- « Réduisez de **40 %** le temps de recherche du bon profil interne »

FACTS-CANON C7 interdit explicitement toute métrique TLS inventée, en citant nommément le
turnover. **La chronologie explique tout** : ces documents datent du **9 juin**, FACTS-CANON a
été créé le **10 juin** — précisément en réaction à ce problème. Les docs Notion n'ont jamais
été repassés depuis.

> Ils portent la mention « Document à utiliser pour : pitch decks commerciaux, pages produit
> site vitrine, argumentaires de vente ». Le risque de propagation est donc maximal.

**À faire** : purger ces trois chiffres, ou les remplacer par des formulations de valeur d'usage
sans promesse chiffrée.

### D2 — Trois architectures tarifaires, dont une seule fait vraiment exception ⛔ grave

*Révisé le 2026-07-23 après lecture des CDC — mon analyse initiale était incomplète.*

| Source | Architecture |
|---|---|
| **CDC 11bis** (base de travail provisoire ✅) | 4 plans d'abonnement : **Gratuit 0 € · Plan 1 29 € · Plan 2 49 € · Plan 3 79 €** /mois |
| **FACTS-CANON L2-L3** | 4 plans + **prix au crédit** dégressif : Plan 1 ≈ 2 € · Plan 2 ≈ 1,50 € · Plan 3 ≈ 1 € |
| **Notion — Catalogue d'offres** | **Pass Solo 30 €/mois · Pass Pro 250 €/an**, sans crédits |

**Les deux premières sont compatibles, contrairement à ce que j'ai écrit d'abord.** Le CDC donne
le prix de l'abonnement, FACTS-CANON le prix du crédit acheté par-dessus — et le CDC confirme que
les crédits servent à payer les services : *« Cette session coûte 50 crédits »* (CDC 03 et 04).
Deux axes distincts, pas deux modèles rivaux.

**C'est la troisième qui fait exception** : « Pass Solo / Pass Pro » est une architecture produit
différente, sans crédits, avec des noms de plans qui ne correspondent à rien dans les cahiers.
FACTS-CANON L4 le signalait déjà (« à réconcilier »), et désigne le CDC comme base de travail —
donc **c'est le catalogue Notion et le site qui doivent s'aligner**, pas l'inverse.

**À faire** : aligner le catalogue Notion sur la nomenclature des cahiers, ou acter explicitement
que « Pass Solo/Pro » est le nom commercial de Plan 1/Plan 2. En l'état, un prospect qui compare
le site et l'app voit deux produits différents.

### D3 — L'ordre des étapes STRIDE contredit son propre acronyme ⚠️

| Source | Ordre |
|---|---|
| FACTS-CANON A2 ✅ | S'orienter · Tester · **Réaliser** · **Intégrer** · Déployer · Évoluer |
| Notion — Catalogue §2.2 | S'orienter · Tester · **Intégrer** · **Réaliser** · Déployer · Évoluer |

S-T-R-I-D-E : le R précède le I. Le catalogue les a inversés — et c'est le document de référence
pour les pitchs. FACTS-CANON note que son ordre a été validé « Notion + audit M3 », donc **une
autre page Notion porte le bon ordre** : l'incohérence est interne à Notion.

**À faire** : corriger le catalogue. Une méthode dont on récite les étapes dans le désordre perd
sa crédibilité en rendez-vous.

### D4 — Qualiopi et AI Act apparaissent dans les personas ⚠️

Le persona « Responsable Formation » liste parmi ses enjeux : « se conformer aux obligations
légales (**Qualiopi**, **AI Act**) ». Ce sont deux sujets bannis de la communication TLS —
Qualiopi parce que TLS n'est pas certifié, l'AI Act parce qu'il a été écarté comme accroche.

La nuance tient : c'est décrit comme une préoccupation **du prospect**, pas comme une
revendication TLS. Mais c'est un fil qui mène directement à la faute si un rédacteur le reprend.

**À faire** : reformuler en « obligations réglementaires » sans nommer, ou marquer explicitement
« ne jamais reprendre en copy ».

### D7 — Des chiffres illustratifs dorment dans les maquettes des cahiers ⚠️

CDC 06 décrit un tableau de bord entreprise avec des valeurs d'exemple : *Engagement Rate 72 %,
Completion Rate 65 %, Cost per Apprenant 250 €, Total Budget 50 000 €*.

**Ce n'est pas une faute** — une maquette de spécification a besoin de valeurs pour être lisible.
Mais ce sont exactement les chiffres que S1 interdit de publier, et ils sont formatés comme des
résultats. Le risque n'est pas dans le cahier, il est dans la reprise.

**À faire** : rien dans les cahiers. Mais le garde-fou doit savoir que ces nombres existent et
d'où ils viennent, pour les intercepter s'ils réapparaissent dans un contenu.

### D5 — Cadence LinkedIn divergente ℹ️ mineur

`MARKETING-LINKEDIN.md` dit **3-4 posts/semaine**, le doc Notion **2-3 posts/semaine**.
Sans importance stratégique, mais une skill de production a besoin d'un seul chiffre.

### D6 — Un « essai gratuit 14 jours » apparaît sans exister ailleurs ❓

Mentionné comme appel à l'action des webinaires. Absent de FACTS-CANON, de `FAITS-OFFRES.md` et
du catalogue d'offres. **Cette offre existe-t-elle ?**

---

## Ce que cette recherche n'a pas couvert

Par honnêteté sur le périmètre — cinq sources identifiées comme pertinentes n'ont pas été lues,
dont les plus récentes :

| Source | Date | Pourquoi elle compte |
|---|---|---|
| [Sitemap & Structure Homepage](https://app.notion.com/p/38ecdd696db6811eb953e3baa6b5de5d) | **2026-07-14** | La plus récente. Peut avoir déjà corrigé D1-D4. |
| [Dossier TLS — Skills-Based Organizations](https://app.notion.com/p/379cdd696db681b980edf12e35f9882f) | 2026-07-02 | Positionnement le plus à jour |
| [Roadmap Learning App — Vision 5 ans](https://app.notion.com/p/349cdd696db680b19cb1c8f24689a394) | 2026-05-09 | Vision produit long terme |
| [Analyse concurrentielle & étude de marché](https://app.notion.com/p/366cdd696db681d78d6df14ec485de1c) | 2026-05-20 | Différenciation |
| Les 16 cahiers `docs/CDC/` | — | ~25 000 lignes. **Lecture ciblée effectuée** le 23.07 : tarification (11bis), STRIDE (11), entreprise (06), analytics (10), crédits (03/04). Les parcours utilisateurs détaillés restent non lus. |

**Les documents de juillet peuvent invalider une partie des divergences ci-dessus.** Elles sont
datées pour cette raison : à revérifier avant d'agir. La lecture des CDC a déjà corrigé D2 dans
ce sens — l'analyse initiale surestimait le conflit.

## Roadmap des skills sur-mesure

> ⚠️ **Révisée le 2026-07-23.** L'exploration du workspace Notion a montré que **11 skills TLS
> existent déjà**, écrites en mars-avril et jamais activées — dont deux qui résolvent des
> problèmes majeurs. Écrire de nouvelles skills avant d'activer celles-là reviendrait à répéter
> l'erreur qu'on vient de diagnostiquer. Voir
> [`NOTION-WORKSPACE-AUDIT.md` §9](NOTION-WORKSPACE-AUDIT.md).

### Étape 0 — activer l'existant (aucune écriture)

| # | Skill Notion existante | Ce qu'elle débloque |
|---|---|---|
| 0.1 | **Note de réunion TLS** | Crée les Tasks datées depuis chaque décision de réunion. Répare le défaut le plus coûteux du workspace. |
| 0.2 | **Audit hebdo workspace TLS** | Lundi : tâches en retard, réunions sans actions, projets sans prochaine action. |
| 0.3 | **Qualifier Deal → Client Project** | Deal gagné → projet + dossier Drive + 4 tâches d'onboarding. |
| 0.4 | **Entreprises Autofill** · **Autofill Contacts** | Hygiène CRM, déjà spécifiée. |

### Étape 1 — écrire ce qui manque vraiment

| # | Skill | Fonction | Pourquoi elle n'existe pas déjà | Bloquant |
|---|---|---|---|---|
| 1 | **`tls-facts-guard`** | Preuve | Aucune skill Notion ne contrôle les faits. Encode des règles déjà validées. | aucun |
| 2 | **`tls-relance-pipeline`** | Vente | **Nouveau, issu du §8** : ~40 000 € de pipeline avec toutes les relances dépassées de 3 à 5 mois. Les propriétés existent, la vue manque. | aucun |
| 3 | **`tls-echeances`** | Pilotage | **Nouveau, issu du §5** : rien ne surveille TVA, URSSAF, bilan. Une contrainte huissier est en cours. | comptable |
| 4 | **`tls-post-linkedin`** | Acquisition | Cadence et objectif chiffrés, aucune skill ne couvre la voix TLS. | aucun |
| 5 | **`tls-audit-flash`** | Vente | Porte d'entrée du flywheel, indépendante du pricing gelé. | aucun |
| 6 | **`tls-carrousel`** | Acquisition | Format à plus forte portée, entièrement manuel. | aucun |
| 7 | **`tls-vigie-sbo`** | Acquisition | Newsletter bimensuelle, format déjà cadré. | aucun |
| 8 | **`tls-cahier-gap`** | Produit | Procédure en 5 étapes dans `CLAUDE.md`, à outiller. | aucun |
| 9 | ~~proposition commerciale~~ | Vente | **À ne pas écrire** tant que le pricing est gelé (S2). | analyse business model |

**Ce qui a changé** : `tls-relance-pipeline` et `tls-echeances` entrent haut dans la liste parce
que l'exploration a montré un coût mesurable et actuel. `tls-recycle-mag` et `tls-ds-sync` sortent
de la liste courte — utiles, mais sans urgence démontrée.

## Ce qui reste à trancher

Ces points bloquent une partie de la carte. Aucun ne se devine.

1. **Les 6 divergences ci-dessus** — D1 et D2 sont les plus urgentes : elles touchent des
   documents destinés à sortir.
2. **Analyse business model** — tranche D2 et débloque la fonction Vente entière.
3. ~~Où vit le pipeline~~ — **répondu** : un CRM Notion complet existe. La question devient : qui le tient, et à quel rythme ?
4. **Rituel de pilotage** — y en a-t-il un ? Si oui, lequel et à quelle fréquence ?
5. **L'essai gratuit 14 jours existe-t-il ?** (D6)
6. **L'échéance « MVP Juillet 2026 » des cahiers tient-elle toujours ?** C'est le seul objectif
   daté de toute la carte, et la date est atteinte.
7. **Faut-il lire les 4 sources Notion non couvertes** avant d'écrire la première skill ? Celles
   de juillet peuvent avoir déjà corrigé une partie des divergences.

---

## Journal

**2026-07-23 (3)** — Lecture ciblée des CDC. **D2 corrigé** : trois architectures tarifaires,
mais CDC et FACTS-CANON sont compatibles (abonnement + crédit sur deux axes) — c'est le catalogue
Notion qui fait exception. **D7 ajouté** (chiffres illustratifs dans les maquettes CDC 06).
Deux découvertes structurantes : l'échéance **MVP Juillet 2026** portée par 14 passages des
cahiers, et la cause de S1 — le cahier 10 Analytics, à 0 %, est ce qui produira les métriques
manquantes.

**2026-07-23 (2)** — Recherche croisée Notion ↔ dépôt. Fonctions 1 et 2 réécrites : les
objectifs que la v1 marquait « non documentés » existaient dans Notion depuis le 9 juin
(10 canaux avec rythme et responsable, 4 personas, objectifs de CA par offre, flywheel).
**6 divergences relevées**, dont 2 graves — métriques inventées dans les argumentaires de vente,
et deux modèles de tarification en circulation. 5 sources pertinentes restent non lues, dont les
plus récentes (juillet).

**2026-07-23** — Création. Ancrée sur `FACTS-CANON.md`, `METRICS-A-COLLECTER.md`,
`MARKETING-LINKEDIN.md`, `PHASE-16-GAP-ANALYSIS.md`. Constat de départ : le plugin
`small-business` a été examiné puis écarté — ses 31 skills sont des enveloppes autour de
QuickBooks, PayPal, HubSpot et Stripe, sans source de données chez TLS.
