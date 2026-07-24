# Cahier 10 — Analytics : propositions d'évolution

> **2026-07-23.** Propositions de conception pour le cahier 10 (Analytics & Tracking System),
> à partir de la plateforme existante, des tendances du marché et de recherches en ligne.
> ⚠️ **Document de proposition, pas de spécification.** Le cahier
> [`10_Analytics_Tracking_System.md`](../CDC/10_Analytics_Tracking_System.md) reste la source de
> vérité et n'est pas modifié ici — toute reprise passe par un accord métier.

---

## D'abord : le cahier existant est bon

Il faut le dire avant de proposer quoi que ce soit. Le cahier 10 n'est pas une ébauche : 1 254
lignes, quatre parcours utilisateurs détaillés, huit entités de données, une matrice de
permissions, et un périmètre MVP daté à septembre 2026.

Ses quatre axes couvrent déjà bien plus que le suivi de complétion :

1. Engagement et consommation
2. Qualité du contenu — NPS, retours, contenus bloquants
3. Positionnement et progression — Dreyfus initial contre final, jalons, abandons
4. Impact business — revenus, utilisation, ROI, prévision

Rapporté au **modèle de maturité en cinq stades** qui structure la littérature 2026 — du simple
suivi de complétion jusqu'à la preuve d'impact stratégique — il se situe déjà autour du stade 3-4.
La plupart des plateformes n'y sont pas.

**Ce qui suit ne corrige donc pas des manques, mais ajoute ce que six mois de marché et vos
propres décisions récentes rendent nécessaire.**

---

## Écart 1 — Le modèle d'événement suppose que tout se passe dans l'app

**Constat.** Le périmètre dit : « tous événements significatifs **des modules #1-9** ». L'entité
`Event` est pensée pour une application où l'apprenant se rend.

**Ce qui a changé.** Si le passeport devient une couche accessible depuis plusieurs surfaces —
serveur MCP, Learning Buddy, back-office client — alors une part croissante des interactions se
produira **hors de l'application**. Elles seraient invisibles.

**Proposition.** Ajouter deux dimensions à l'entité `Event` :

| Champ | Rôle | Valeurs |
|---|---|---|
| `surface` | D'où vient l'événement | `app` · `mcp` · `buddy` · `bo_client` · `import` |
| `context` | Dans quoi la personne travaillait | libre, nullable — alimenté seulement si la surface le sait |

Sans `surface`, impossible de répondre à la question qui décidera de la stratégie produit :
**est-ce que les gens utilisent davantage le passeport quand il vient à eux ?**

---

## Écart 2 — Aucun standard d'interopérabilité, donc pas de couche

**Constat.** Le cahier prévoit des exports CSV/JSON et des points d'accès REST « BI ready ».
C'est suffisant pour un produit fermé. **Ce n'est pas suffisant pour une couche.**

**Ce que dit le marché.** Deux standards structurent les données d'apprentissage :

- **xAPI** (ADL) — décrit n'importe quelle expérience, y compris **hors du web et hors écran**.
  C'est le seul qui sache consigner « a animé un atelier », donc le seul compatible avec la
  captation de preuve en situation de travail.
- **Caliper** (1EdTech) — plus strict, mais centré sur les environnements numériques.

Et surtout : **HR Open Standards a publié un profil xAPI** conçu avec l'ADL, qui ouvre
explicitement la voie aux *« learner wallet initiatives and individual skills data »*.

**Le passeport de compétences est un « learner wallet ».** Le standard qui lui correspond existe
déjà, et il est celui que les systèmes RH savent lire.

**Proposition.** Adopter **xAPI comme format d'émission** des événements de compétence — pas
forcément comme stockage interne, mais comme format d'export et d'échange.

Ce que ça change, concrètement :

| Sans xAPI | Avec xAPI |
|---|---|
| Le passeport est un actif TLS | Le passeport est **portable** — argument de vente, pas de verrouillage |
| Intégration RH = développement sur mesure par client | Intégration = profil standard |
| « Notre plateforme mesure » | « Vos compétences vous suivent » |

C'est la différence entre vendre une application et vendre une couche.

---

## Écart 3 — Rien ne relie les tableaux de bord aux métriques citables

**Constat.** Le cahier produit des tableaux de bord pour piloter. Il ne dit rien de ce qui devient
une **preuve publiable**.

Or [`METRICS-A-COLLECTER.md`](../_canon/METRICS-A-COLLECTER.md) existe précisément parce que TLS
n'a aujourd'hui **aucune métrique citable** — ni satisfaction, ni complétion, ni adoption. C'est
la contrainte qui bride l'acquisition et la vente, documentée dans
[`CARTOGRAPHIE-OUTILLAGE.md`](../ops/CARTOGRAPHIE-OUTILLAGE.md).

**Proposition.** Introduire une notion de **métrique promue** : une agrégation qui, une fois
validée, devient citable.

```
DashboardMetric  →  seuil de fiabilité atteint (n suffisant, période, périmètre)
                 →  revue humaine
                 →  statut « citable » + source + date
                 →  reprise dans FACTS-CANON
```

Trois champs suffisent sur `DashboardMetric` : `sample_size`, `perimeter`, `citable_status`.

Sans ce chaînon, le système produira des chiffres justes que personne n'osera utiliser — parce
que rien ne dira **à partir de quand** ils sont solides. C'est exactement le problème que
FACTS-CANON a été créé pour résoudre.

---

## Écart 4 — L'AI Act ⚠️ *(échéance corrigée le 23/07 — voir encadré)*

> ### ⛔ Correction
> J'ai d'abord écrit que les obligations s'appliquaient **au 2 août 2026, dans dix jours**.
> **C'est faux.** Le *Digital Omnibus on AI* a été approuvé par le Conseil le 29 juin 2026 et
> **signé le 8 juillet 2026**. Les obligations haut risque pour les systèmes autonomes de
> l'annexe III sont **reportées au 2 décembre 2027** (et au 2 août 2028 pour l'IA embarquée dans
> les produits réglementés de l'annexe I).
> Motif du report : retards sur les normes, les lignes directrices et la désignation des
> autorités nationales.
> **Il reste donc environ 17 mois, pas dix jours.** L'analyse ci-dessous reste valable ;
> seule l'urgence change. Détail dans [`REGLEMENTAIRE-ET-SBO.md`](REGLEMENTAIRE-ET-SBO.md).

**Le fond du point reste le plus important de ce document, et il ne relève pas du produit.**

L'annexe III, point 4 du règlement européen sur l'IA classe **à haut risque** les systèmes d'IA
utilisés pour l'emploi et la gestion des travailleurs. Le périmètre couvre les décisions
d'affectation, de promotion et de suivi des travailleurs — et les analyses publiées citent
explicitement les **plateformes d'évaluation de compétences** et les **outils de mobilité interne
qui recommandent des promotions**.

**Les obligations complètes deviennent applicables le 2 décembre 2027** (date corrigée).

Ce que cela impose, si la qualification s'applique : gestion des risques (art. 9), gouvernance des
données (art. 10), documentation technique (art. 11), **journalisation (art. 12)**, transparence
(art. 13), supervision humaine (art. 14), exactitude et robustesse (art. 15).

**Pourquoi c'est le cahier 10 qui est concerné.** L'article 12 — la journalisation — n'est pas une
fonctionnalité annexe : **c'est exactement ce que fait un système d'analytics.** Le cahier 10
n'est donc pas seulement un produit, c'est le **substrat de conformité** du reste de la
plateforme.

Le cahier 13bis (RGPD / AI Act) est à 75 %. Le cahier 12bis prévoit du *matching*, de la
prédiction de churn et de l'*org intelligence* — soit précisément les fonctions visées.

**Trois précisions, pour être honnête :**

1. **Je ne suis pas juriste.** La qualification dépend de l'usage réel — un passeport
   d'auto-évaluation n'est pas un outil de décision de promotion. **À faire trancher.**
2. **Ceci ne contredit pas votre règle marketing.** Vous avez décidé de ne jamais utiliser l'AI
   Act comme accroche commerciale, et c'est toujours valable. Ici il s'agit de **contrainte de
   conception**, ce qui est autre chose.
3. **Il y a un angle favorable.** Si la conformité est traitée dès la conception, elle devient un
   actif face à des DRH d'ETI qui, eux, y sont exposés. Sans en faire un argument public.

**Proposition.** Que la conception du cahier 10 intègre dès maintenant les exigences de
journalisation et de traçabilité de décision — `audit_access_log` existe déjà, c'est un bon
départ, mais il trace les **accès**, pas les **décisions algorithmiques**.

> ⚠️ **Proposition retirée le 23/07.** J'allais proposer une entité `AIDecisionLog`.
> **Elle existe déjà**, et en mieux, dans le cahier 13bis : `ai_decisions` (avec `rationale`,
> `confidence_score`, `is_overridden`) et `ai_overrides` (avec `override_reason` obligatoire).
> La bonne formulation est donc : **le cahier 10 doit consommer ces entités, pas les redéfinir.**
> Détail dans [`CDC-13BIS-RGPD-PROPOSITIONS.md`](CDC-13BIS-RGPD-PROPOSITIONS.md).

---

## Écart 5 — Le stade 5 suppose des données que vous n'avez pas

**Constat.** Le cahier vise l'impact business, et le mesure en revenus, utilisation et prévision.
Ce sont des métriques **du produit**, pas de l'organisation cliente.

**Ce que dit le marché.** Le stade 5 du modèle de maturité — prouver l'impact stratégique —
suppose de croiser les données d'apprentissage avec le SIRH, le CRM et les outils de performance
du client. C'est cette jointure qui permet de dire « la compétence acquise a produit tel
résultat ».

**Proposition — mais avec une réserve.** C'est le bon horizon, et c'est aussi celui qui demande le
plus : accès aux données RH du client, donc contrat, conformité et confiance. **À ne pas viser au
MVP.** Le noter comme cible V3, et concevoir le modèle de données de façon à ne pas l'interdire —
notamment via xAPI (écart 2), qui est précisément le pont vers les SIRH.

---

## Ce que je proposerais de faire, dans l'ordre

| # | Action | Pourquoi maintenant | Effort |
|---|---|---|---|
| 1 | **Faire qualifier le statut AI Act** de la plateforme | Échéance décembre 2027, mais la qualification décide de l'architecture — donc à trancher avant de construire, pas avant l'échéance. | externe |
| 2 | Ajouter `surface` et `context` à `Event` | Deux champs. Sans eux, la stratégie multi-surface est aveugle. | faible |
| 3 | ~~Ajouter `AIDecisionLog`~~ — **retiré** : `ai_decisions` / `ai_overrides` existent au cahier 13bis. Le cahier 10 doit les **consommer**. | — |
| 4 | Ajouter `sample_size` / `perimeter` / `citable_status` | Débloque la contrainte de preuve, qui bride vente et acquisition. | faible |
| 5 | Adopter xAPI en format d'export | Fait passer le passeport d'actif fermé à couche portable. | moyen |
| 6 | Jointure SIRH client | Cible V3, à ne pas interdire par la conception. | — |

Les actions 2 et 4 sont **cinq champs au total**. Elles ne changent pas le périmètre du MVP, mais
elles conditionnent des décisions qui, elles, sont stratégiques.

---

## Ce qui reste à trancher

1. **La qualification AI Act** — la seule question dont la réponse ne peut pas venir de moi.
2. **Le passeport est-il destiné à être portable ?** Si oui, xAPI n'est pas une option mais un
   prérequis. Si non, l'ambition « couche SBO » tombe.
3. **Qui valide qu'une métrique devient citable ?** Le chaînon de l'écart 3 suppose une revue
   humaine — c'est un rôle à nommer, pas un champ à créer.
4. **Le MVP de septembre tient-il ?** Le cahier 02 (Passeport) est à 90 % et verrouille cinq
   cahiers ; le cahier 10 en dépend directement.

---

## Sources

- [Annex III: High-Risk AI Systems — EU Artificial Intelligence Act](https://artificialintelligenceact.eu/annex/3/)
- [EU AI Act for HR: Annex III Point 4 and the High-Risk Recruitment Stack — DeepInspect](https://www.deepinspect.ai/blog/eu-ai-act-for-hr)
- [High-Risk AI Systems: EU AI Act Deployer Guide 2026](https://euaicompass.com/eu-ai-act-high-risk-deployer-guide.html)
- [Interoperability of Learning Records standards — Inokufu](https://www.inokufu.com/from-scorm-to-xapi/)
- [Standards — HR Open Standards Consortium](https://www.hropenstandards.org/standards)
- [Initial xAPI/Caliper Comparison — 1EdTech](https://www.imsglobal.org/initial-xapicaliper-comparison)
- [AI Learning Analytics Maturity 2026 — SkillStudio](https://www.skillstudio.ai/industry-news/ai-learning-analytics-maturity-2026)
- [Corporate Learning Analytics: 2026 Guide to AI and ROI — D2L](https://www.d2l.com/blog/data-analytics-in-corporate-learning/)

---

## Journal

**2026-07-23 (2)** — **Correction** : l'échéance AI Act du 2 août 2026 a été reportée au
2 décembre 2027 par le Digital Omnibus (signé le 8 juillet 2026). Mon alerte « dix jours » était
fausse.

**2026-07-23** — Création. Cinq écarts identifiés entre le cahier existant et l'état du marché
plus les orientations récentes (passeport-couche, Learning Buddy en situation). Le plus urgent
n'est pas produit mais réglementaire : **l'annexe III de l'AI Act vise les plateformes
d'évaluation de compétences, et les obligations complètes s'appliquent au 2 août 2026.**
