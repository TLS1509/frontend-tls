# Cadre réglementaire et état de l'art SBO

> **2026-07-23.** Approfondissement du volet juridique (AI Act, RGPD) et de l'état de l'art
> Skills-Based Organization, pour éclairer la conception de la plateforme.
> ⚠️ **Je ne suis pas juriste.** Ce document rassemble des sources publiques et les rapporte à
> votre situation. Il prépare une conversation avec un conseil, il ne la remplace pas.

---

## 1. AI Act — la date a bougé, l'analyse tient

### Ce qui a changé le 8 juillet 2026

Le **Digital Omnibus on AI**, première modification de fond de l'AI Act depuis son adoption en
2024, a été approuvé par le Conseil le **29 juin 2026** et **signé le 8 juillet 2026**.

| Obligations | Échéance initiale | Nouvelle échéance |
|---|---|---|
| Haut risque — systèmes autonomes (annexe III) | 2 août 2026 | **2 décembre 2027** |
| Haut risque — IA embarquée dans produits réglementés (annexe I) | 2 août 2027 | **2 août 2028** |

Motif invoqué : retards sur les normes harmonisées, les lignes directrices, et la désignation des
autorités nationales et organismes d'évaluation de conformité.

> **Correction assumée.** J'avais annoncé une échéance à dix jours. C'était faux. Il reste
> environ **17 mois** — ce qui change l'urgence, pas la nature du travail.

### Êtes-vous concernés ?

L'annexe III, point 4 vise l'**emploi et la gestion des travailleurs**, en deux volets :

1. Recrutement et sélection — diffusion d'offres, tri, évaluation de candidats.
2. Décisions relatives aux **conditions d'emploi, à la promotion, à la cessation, à
   l'affectation des tâches et à la surveillance des travailleurs**.

Les analyses spécialisées rangent explicitement dans ce périmètre les **plateformes d'évaluation
de compétences** et les **outils de mobilité interne recommandant des promotions**.

**La question n'est donc pas « TLS fait-il de l'IA », mais « à quoi sert le résultat ».**

### Le texte exact, et ce qu'il vise vraiment

> **4(b)** — *« AI systems intended to be used to make decisions affecting terms of work-related
> relationships, the promotion or termination of work-related contractual relationships, **to
> allocate tasks based on individual behaviour or personal traits or characteristics** or **to
> monitor and evaluate the performance and behaviour** of persons in such relationships »*

Trois membres distincts : décisions contractuelles · **affectation de tâches** · **surveillance
et évaluation**.

> ⚠️ **Précision apportée le 23/07, après objection de Chloé.** J'avais écrit qu'inférer une
> compétence à partir des données de travail constituait de la « surveillance des travailleurs ».
> **C'était trop large.** *Monitor* suppose une observation subie ; un salarié qui déclare
> lui-même « j'ai animé un atelier » n'est pas surveillé, il témoigne.
>
> **Mais le mode de collecte n'est pas le critère.** Le texte dit *« intended to be used »* :
> ce qui qualifie, c'est **l'usage prévu de la sortie**.

| Usage de la sortie | Alimenté par déclaration | Alimenté par observation |
|---|---|---|
| Visible du seul apprenant, pour son développement | hors périmètre | hors périmètre |
| Partagé au manager, informatif | zone grise | zone grise |
| **Affectation de tâches / matching** *(cahier 11)* | **4(b)** — « allocate tasks » | **4(b)** |
| **Recommandation de mobilité ou promotion** | **4(b)** | **4(b)** |
| **Détection de risque de départ** *(cahier 12bis)* | 4(b) — « monitor and evaluate » | **4(b)** |

**Le déclaratif protège du volet « surveillance », pas du volet « affectation de tâches ».**

### L'asymétrie qu'il faut connaître sur l'intervention humaine

Mettre un manager dans la boucle n'a pas le même effet dans les deux régimes — et c'est
contre-intuitif :

| | Effet de l'intervention humaine |
|---|---|
| **RGPD art. 22** | **Exemption.** Si un humain évalue réellement — en connaissance de cause, avec le pouvoir de contredire — l'article 22 ne s'applique plus. |
| **AI Act art. 14** | **Obligation.** La supervision humaine ne fait pas sortir du haut risque : elle est l'une des conditions à remplir *parce qu'*on y est. |

**Conséquence pratique :** faire valider par un pair ou un manager règle le RGPD — le sujet
applicable aujourd'hui — mais ne change rien à la qualification AI Act, dont l'échéance est à
décembre 2027.

### La combinaison qui sort probablement des deux régimes

Un passeport **déclaratif**, **validé par un pair ou un manager**, et dont la sortie sert au
**développement de la personne** plutôt qu'à son affectation.

C'est un produit différent d'un moteur de matching. **Et c'est une décision produit, pas
juridique** — elle appartient à la roadmap, pas au conseil.

### Fournisseur ou déployeur — vous êtes du côté lourd

L'AI Act distingue nettement deux rôles, et la charge n'est pas la même.

| | **Fournisseur** — développe et met sur le marché | **Déployeur** — utilise |
|---|---|---|
| Qui | **TLS** | Vos clients ETI |
| Système de management de la qualité | ✅ requis | — |
| Documentation technique (art. 11) | ✅ requis | — |
| Évaluation de conformité + marquage CE | ✅ requis | — |
| Journalisation automatique sur la durée de vie (art. 12) | ✅ requis | — |
| Supervision humaine | ✅ | ✅ |
| Usage conforme aux instructions | — | ✅ |
| Surveillance et signalement d'incidents | ✅ | ✅ |

**TLS construit et vend : vous êtes fournisseur.** C'est l'extrémité exigeante du texte.

**Un allègement existe.** L'article 62 prévoit des mesures pour les PME et jeunes entreprises :
la documentation technique peut être fournie **sous forme simplifiée**, et la Commission doit
publier un formulaire dédié. À suivre — c'est directement votre cas.

### Ce que ça implique pour la conception

Six des sept exigences se traduisent en éléments d'architecture, pas en documents :

| Article | Exigence | Traduction produit |
|---|---|---|
| 9 | Gestion des risques | Processus documenté, pas du code |
| 10 | Gouvernance des données | Traçabilité des jeux d'entraînement et d'évaluation |
| 11 | Documentation technique | Document, forme simplifiée possible (art. 62) |
| **12** | **Journalisation** | **C'est le cahier 10.** Enregistrement automatique des événements sur toute la durée de vie |
| 13 | Transparence | La personne sait qu'une IA intervient et sur quelle base |
| 14 | Supervision humaine | Un humain peut modifier la décision — et en a l'autorité |
| 15 | Exactitude et robustesse | Mesure de la performance du modèle, donc… analytics |

**Deux des sept exigences reposent sur le système d'analytics.** C'est pourquoi le cahier 10
cesse d'être un module produit pour devenir le socle de conformité.

---

## 2. RGPD — plus immédiat que l'AI Act

L'AI Act est reporté. **Le RGPD, lui, s'applique aujourd'hui.** Et sur un passeport de
compétences, il mord au moins aussi fort.

### Article 22 — décision automatisée et profilage

Le principe : une personne a le droit de ne pas faire l'objet d'une décision **fondée
exclusivement sur un traitement automatisé** produisant des effets juridiques ou l'affectant de
manière significative.

Si un résultat d'IA fonde une décision qui affecte la personne — évaluation, recommandation de
mobilité — **l'article 22 s'applique dès lors qu'il n'y a pas d'intervention humaine
significative**.

**Et « significative » a un sens précis.** Un opérateur qui valide systématiquement les décisions
algorithmiques sans analyse indépendante **ne constitue pas** une intervention humaine. Il faut
que la personne ait **l'autorité et la compétence** de modifier la décision, et qu'elle dispose
des informations pour le faire.

> C'est le point le plus souvent raté. Un bouton « valider » dans un back-office ne suffit pas.
> Il faut que le manager voie **sur quoi** la recommandation se fonde, et puisse la contredire.

### L'analyse d'impact est probablement obligatoire

Une AIPD est imposée pour « l'évaluation systématique et approfondie d'aspects personnels
[…] fondée sur un traitement automatisé, y compris le profilage, et sur la base de laquelle sont
prises des décisions produisant des effets juridiques ».

**Un passeport de compétences alimenté automatiquement, utilisé pour orienter des parcours ou des
affectations, correspond à cette définition.** Le cahier 13bis est à 75 % — l'AIPD est le
chantier à vérifier en priorité, avant l'AI Act.

### Ce que ça change dans l'ordre des priorités

| | Échéance | Statut TLS |
|---|---|---|
| **RGPD / art. 22 / AIPD** | **applicable maintenant** | cahier 13bis à 75 % |
| AI Act haut risque | déc. 2027 | à qualifier |

**Le RGPD est le sujet immédiat.** L'AI Act est le sujet structurant.

---

## 3. État de l'art SBO — ce que les rapports permettent de dire

### Les chiffres disponibles, et leur statut

Deloitte a enquêté auprès de **plus de 1 200 professionnels et organisations** pour ses *Global
Human Capital Trends*. Ce qui en ressort :

| Constat | Source |
|---|---|
| **Moins d'une organisation sur cinq** a adopté des pratiques fondées sur les compétences de manière significative | Deloitte |
| Les organisations fondées sur les compétences sont **63 % plus susceptibles** d'atteindre un haut niveau de performance | Deloitte |
| **46 % des dirigeants** citent les mentalités héritées et les pratiques dépassées comme premier obstacle | Deloitte |

> ⚠️ **Ces chiffres sont des chiffres Deloitte, pas des chiffres TLS.** Ils sont citables **avec
> attribution explicite**. Les présenter comme des résultats TLS violerait FACTS-CANON C7.

**C'est une bonne nouvelle pour la contrainte S1.** Vous n'avez aucune métrique propre — mais
rien n'interdit de citer une étude sourcée. La règle d'honnêteté interdit d'inventer, pas de
référencer.

### Ce que ces chiffres disent de votre marché

**Moins d'une sur cinq** signifie que le marché est **très en amont**. Ce n'est ni bon ni mauvais
en soi, mais ça a deux conséquences directes :

- **Vous vendez une conviction avant de vendre un outil.** D'où la pertinence de l'audit flash et
  du webinaire comme portes d'entrée — repérés dans la cartographie comme les maillons du
  flywheel.
- **Le premier obstacle est culturel, pas technique** — 46 % citent les mentalités. Un discours
  centré sur les fonctionnalités de la plateforme parle donc à côté. C'est l'accompagnement
  STRIDE qui répond à l'objection, pas la Learning App.

### Le point qui valide directement votre orientation

> *« L'IA change radicalement l'économie des organisations fondées sur les compétences en 2026 :
> l'inférence de compétences à partir des données de travail rend l'évaluation moins coûteuse et
> continue, et les mises à jour de taxonomie qui prenaient des mois à des humains peuvent être
> rédigées par des agents en quelques jours. »*

**C'est exactement la thèse de Learning Buddy** : déduire la compétence de l'activité réelle
plutôt que de la faire déclarer. Le mouvement de marché va dans le sens de votre intuition.

Mais c'est aussi ce qui vous ramène au §1 — avec la nuance apportée depuis : **inférer une
compétence à partir des données de travail sans que la personne la déclare relève du volet
« monitor and evaluate ».** Si elle la déclare, ce volet tombe. Dans les deux cas, l'usage de la
sortie reste le critère décisif.

---

## 4. Ce que j'en retire pour TLS

1. **Le RGPD passe devant l'AI Act.** Applicable aujourd'hui, il touche le cœur du passeport.
   L'AIPD est le premier livrable, pas le marquage CE.
2. **La supervision humaine doit être conçue, pas ajoutée.** L'exigence commune à l'art. 22 et à
   l'art. 14 est la même : quelqu'un doit pouvoir contredire la machine, en connaissance de cause.
   Ça se traduit par des écrans, pas par une clause.
3. **Vous êtes fournisseur, avec un allègement PME à surveiller** (art. 62).
4. **La ligne de qualification passe par l'usage**, pas par la technologie. Un passeport
   d'auto-évaluation et un moteur d'affectation ne sont pas le même produit au regard du droit —
   **et c'est une décision produit, pas juridique.**
5. **Vous pouvez citer Deloitte dès demain.** Attribué, sourcé, sans rien inventer. C'est une
   sortie partielle de la contrainte de preuve.

---

## 5. Les questions à poser à un conseil

Rassemblées ici pour qu'elles ne se perdent pas.

1. Le passeport de compétences, tel que spécifié au cahier 02, relève-t-il de l'annexe III
   point 4 ? Sous quelles conditions d'usage bascule-t-il ?
1bis. **Un passeport déclaratif validé par un pair échappe-t-il au volet « monitor and
   evaluate » ?** Et la validation par un manager suffit-elle à écarter l'article 22 RGPD ?
2. Le *matching* du cahier 11 (Projects SBO) constitue-t-il de l'« affectation des tâches » ?
3. La prédiction de churn du cahier 12bis constitue-t-elle de la « surveillance des travailleurs » ?
4. Une AIPD est-elle requise en l'état ? Qui la porte — TLS ou le client déployeur ?
5. Quelle forme de supervision humaine satisfait à la fois l'art. 22 RGPD et l'art. 14 AI Act ?
6. L'allègement PME de l'art. 62 s'applique-t-il à TLS, et sous quelle forme ?

---

## Sources

**AI Act**
- [Annex III: High-Risk AI Systems — EU Artificial Intelligence Act](https://artificialintelligenceact.eu/annex/3/)
- [Article 16: Obligations of Providers of High-Risk AI Systems](https://artificialintelligenceact.eu/article/16/)
- [Article 26: Obligations of Deployers of High-Risk AI Systems](https://artificialintelligenceact.eu/article/26/)
- [Article 62: Measures for Providers and Deployers, in Particular SMEs](https://artificialintelligenceact.eu/article/62/)
- [EU AI Act Omnibus Agreement — Postponed High-Risk Deadlines — Gibson Dunn](https://www.gibsondunn.com/eu-ai-act-omnibus-agreement-postponed-high-risk-deadlines-and-other-key-changes/)
- [The final Digital Omnibus on AI — Freshfields](https://www.freshfields.com/en/our-thinking/blogs/technology-quotient/eu-ai-act-unpacked-34-the-final-digital-omnibus-on-ai-key-amendments-to-the-a-102nber)
- [AI Act August 2026: what to expect — Plesner](https://plesner.com/en/news/ai-act-august-2026-what-expect-delayed-standards-pending-guidance-and-digital-omnibus-ai)
- [EU AI Act for HR: Annex III Point 4 — DeepInspect](https://www.deepinspect.ai/blog/eu-ai-act-for-hr)

**RGPD**
- [Profilage et décision entièrement automatisée — CNIL](https://www.cnil.fr/fr/profilage-et-decision-entierement-automatisee)
- [Article 22 RGPD : décision automatisée et profilage](https://www.donneespersonnelles.fr/article-22-rgpd)

**SBO**
- [The skills-based organization: A new operating model — Deloitte Insights](https://www.deloitte.com/us/en/insights/topics/talent/organizational-skill-based-hiring.html)
- [Rethinking skills-based talent models: 4 paths to business value — Deloitte](https://www.deloitte.com/us/en/insights/topics/talent/creating-value-with-skills.html)
- [Deloitte 2026 Human Capital Trends](https://www.deloitte.com/us/en/about/press-room/deloitte-report-winning-organizations-will-build-the-human-advantage.html)
- [Josh Bersin — Insights on Work, Talent, Learning](https://joshbersin.com/)

---

## Journal

**2026-07-23 (2)** — Précision après objection : le déclaratif écarte bien le volet
« surveillance », mais **le critère qualifiant est l'usage prévu de la sortie**, pas le mode de
collecte. Ajout de l'asymétrie sur l'intervention humaine : **exemption** au sens du RGPD art. 22,
**obligation** au sens de l'AI Act art. 14.

**2026-07-23** — Création. Deux constats principaux : (1) l'échéance AI Act du 2 août 2026 est
**reportée au 2 décembre 2027** par le Digital Omnibus signé le 8 juillet — mon alerte initiale
était fausse ; (2) **le RGPD passe devant** : l'article 22 et l'AIPD s'appliquent aujourd'hui et
touchent le cœur du passeport. Côté SBO, les chiffres Deloitte (moins d'une organisation sur
cinq, 63 % de performance, 46 % d'obstacle culturel) sont **citables avec attribution** — une
sortie partielle de la contrainte de preuve.
