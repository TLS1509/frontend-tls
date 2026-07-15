# Veille — IA générative en formation : ce qui est démontré vs ce qui circule

*Recherche menée le 2026-07-15 · Méthode : recherche multi-angles + vérification adversariale · **Test du process de veille approfondie***

---

## 0. Ce que c'est, et comment le lire

Ce document est **le premier livrable du process de veille approfondie** testé le 2026-07-15. Il a deux fonctions :
1. **Sur le fond** — un état des preuves réelles de l'efficacité de l'IA générative en formation.
2. **Sur la méthode** — une démonstration du niveau de rigueur atteignable, pour décider si ça vaut le coup de le systématiser.

**Protocole** : 5 angles de recherche en parallèle → 25 sources récupérées → 118 affirmations falsifiables extraites → 25 soumises à une **vérification adversariale à 3 voix** (chaque vérificateur cherche activement à *réfuter* l'affirmation ; il faut 2 réfutations sur 3 pour la tuer) → **12 confirmées, 13 tuées**.

**Ce que « confirmé » veut dire ici** : l'affirmation résiste à trois tentatives indépendantes de la démonter, et elle est tracée à une source primaire citée. **Ça ne veut pas dire « vrai »** — ça veut dire « sourcé et non réfuté ». La distinction compte.

**Notation** : le vote (ex. `3-0`) indique combien de vérificateurs sur 3 ont laissé passer l'affirmation. `2-1` = une réfutation, à lire avec plus de prudence.

⚠️ **La synthèse finale automatique a échoué** (erreur API). Ce document est une mise en forme **manuelle** des 12 claims vérifiés bruts.

---

## 1. Les preuves d'efficacité pédagogique — l'inverse du discours ambiant

### 1.1 Aucun effet mesuré sur l'apprentissage (méta-analyse préenregistrée) `3-0`

Méta-analyse **préenregistrée** de 10 études (11 tailles d'effet, 1 069 participants) sur l'IA générative en enseignement de la programmation : **aucun effet statistiquement significatif** sur les résultats d'apprentissage.

> Hedges' g = 0,14 · IC 95 % [−0,18 · 0,47] · p = 0,389 — **l'intervalle de confiance contient zéro.**

**Source** : https://arxiv.org/pdf/2605.04779

### 1.2 Accès libre à GPT-4 → résultats **dégradés** (essai randomisé, PNAS) `3-0`

Expérience de terrain randomisée chez des lycéens en mathématiques : ceux ayant eu un accès libre à GPT-4 pendant l'entraînement obtiennent **17 % de moins** à l'examen sans assistance que ceux qui n'y ont **jamais** eu accès. L'IA n'a pas seulement échoué à aider — elle a **nui** à l'acquisition.

> « when access is subsequently taken away, students actually perform worse than those who never had access (17% reduction in grades for GPT Base) — i.e., unfettered access to GPT-4 can harm educational outcomes. »

**Source** : https://www.pnas.org/doi/10.1073/pnas.2422633122

### 1.3 Les gains spectaculaires n'existent que **pendant** l'usage `3-0`

Même étude. Les gains massifs (+48 % pour GPT brut, +127 % pour le tuteur) ont été mesurés **avec l'IA disponible pendant l'épreuve**. Une fois retirée, ils s'évaporent ou s'inversent.

> **« Performance avec l'outil » et « apprentissage » sont deux choses distinctes, et elles peuvent aller en sens opposé.**

C'est le point le plus important du document. La quasi-totalité des chiffres marketing du secteur mesurent la première en la vendant comme la seconde.

**Source** : https://www.pnas.org/doi/10.1073/pnas.2422633122

### 1.4 Le tuteur avec garde-fous fait **jeu égal**, pas mieux `3-0`

Toujours PNAS. Le tuteur pédagogiquement bridé (indices conçus par l'enseignant au lieu des réponses) ne produit **aucun gain mesurable** face au groupe contrôle sur l'examen sans assistance — il neutralise seulement le mal causé par la version libre.

> « Student performance in the GPT Tutor arm was statistically indistinguishable from that of the control arm, and the point estimate was smaller by an order of magnitude (−0.004). »

**Le meilleur cas d'un tutorat IA bien conçu, dans cet essai, c'est la parité avec l'absence d'IA.**

**Source** : https://www.pnas.org/doi/10.1073/pnas.2422633122

### 1.5 Meilleur livrable, apprentissage identique — la dissociation `2-1`

Expérience randomisée : le groupe assisté par ChatGPT améliore **significativement plus** son score de dissertation, **mais** son gain de connaissances et son transfert d'apprentissage **ne diffèrent pas significativement** des autres conditions.

> L'IA générative améliore **le livrable produit** sans améliorer **l'apprentissage mesuré**.

**Source** : https://arxiv.org/abs/2412.09315

### 1.6 Rétention à 45 jours : −11 points `3-0` — **mais lire 1.7**

Essai contrôlé randomisé : les étudiants ayant utilisé ChatGPT comme aide à l'étude obtiennent **11 points de pourcentage de moins** à un test de rétention surprise 45 jours plus tard.

> 57,5 % vs 68,5 % · t(83) = −3,19 · p = 0,002 · Cohen's d = 0,68 (effet moyen à large)

**Source** : https://www.sciencedirect.com/science/article/pii/S2590291125010186

### 1.7 ⚠️ …et le piège méthodologique sur cette même étude `2-1`

**Le titre « RCT n=120 » surestime l'échantillon réellement analysé.** Les degrés de liberté rapportés (**df = 83**) impliquent que **~85 participants seulement** ont été analysés (85 − 2 = 83). Avec n=120, on aurait df=118. Soit **~29 % d'attrition** entre la randomisation et le test surprise à 45 jours.

Aucune indication d'analyse en intention de traiter → c'est une **analyse en cas complets**, vulnérable à une attrition différentielle. La randomisation protège l'allocation initiale, **pas le sous-ensemble analysé**.

> **Citer cette étude comme un « RCT n=120 » propre est imprécis.** Le df=83 est déductible du seul résumé.

*Réserve : le chiffre d'attrition provient d'une reprise secondaire (PsyPost, 30 mars 2026) citant l'auteur — non vérifié contre le texte intégral (accès restreint). Vote 2-1.*

### 1.8 Les auteurs eux-mêmes classent les preuves en « LOW » `3-0`

Revue systématique : la qualité globale du corpus de preuves est classée **LOW** selon GRADE — hétérogénéité, randomisation mal rapportée, aveugle quasi absent (**1 étude sur 11** avec évaluation en aveugle ; **1 seule** à faible risque sur la dissimulation d'allocation).

> Toute affirmation d'efficacité « prouvée » repose sur des preuves de **faible certitude**, y compris au sommet de la hiérarchie des preuves.

**Source** : https://pmc.ncbi.nlm.nih.gov/articles/PMC12362899/

---

## 2. Les pièges de citation — la partie directement actionnable

### 2.1 🚨 « Cognitive debt » / « Your Brain on ChatGPT » — la citation à ne PAS utiliser `3-0`

L'étude **Kosmyna et al. (2025)**, *la* référence la plus recyclée pour affirmer que l'IA dégrade la cognition, est **formellement contestée par des auteurs académiques indépendants sur cinq axes** : design/taille d'échantillon, reproductibilité, analyse EEG, cohérence du reporting, transparence. Elle **n'est pas passée par une revue par les pairs**.

Et son résultat vedette — le « renversement » où les utilisateurs de LLM passés en mode cerveau-seul montrent une connectivité alpha/bêta réduite — **repose sur 18 participants** en Session 4 (~9 par sous-groupe), alors que les sessions 1-3 en comptaient 54. `3-0`

> **Toute veille citant « cognitive debt » comme preuve établie d'une nocivité de l'IA cite une source challengée.**

**Sources** : critique → https://arxiv.org/abs/2601.00856 · étude d'origine → https://arxiv.org/abs/2506.08872

*Note : ce piège va dans un sens qui pourrait arranger un discours critique de l'IA. Il a été signalé quand même — c'est le principe.*

### 2.2 🚨 Le chiffre Insee « 10 % » — mésusage fréquent `3-0`

Statistique publique française (**Insee, enquête TIC entreprises 2024**) : **10 %** des entreprises françaises de 10 salariés ou plus déclaraient utiliser une technologie d'IA en 2024 (contre 6 % en 2023).

**Mais** ce chiffre couvre une définition **large** de l'IA : fouille de textes, vision par ordinateur, reconnaissance de la parole, génération de texte, machine learning, apprentissage profond.

> **Ce n'est PAS un taux d'adoption de l'IA générative.** Le citer comme tel est un mésusage de la source.

**Source** : https://www.insee.fr/fr/statistiques/fichier/8616837/NUM25-F19.pdf

### 2.3 « Paresse métacognitive » — à manier avec des pincettes `3-0`

Les auteurs concluent que l'usage de ChatGPT **peut** favoriser la dépendance technologique et déclencher une « paresse métacognitive » (délégation à l'IA de l'autorégulation).

> **Rigueur** : formulation **hedgée par les auteurs eux-mêmes** (« may », « potentially »). C'est **leur interprétation** de différences observées dans les processus d'autorégulation, **pas une variable mesurée directement**. Le concept est *proposé* par cette étude, **pas encore répliqué**.

**Source** : https://arxiv.org/abs/2412.09315

---

## 3. Ce qui a été **tué** — la partie la plus révélatrice

13 affirmations sur 25 vérifiées ont été rejetées. **Le filtre coupe dans les deux sens** — c'est ce qui distingue une vérification d'un raisonnement motivé :

| Affirmation rejetée | Vote | Sens |
|---|---|---|
| Méta-analyse de 34 études : effet positif **large et significatif** de l'IA générative | 0-3 | ❌ pro-IA |
| Étude EEG : la connectivité cérébrale décroît avec l'usage d'outils | 0-3 | ❌ anti-IA |
| Le type d'outil ne modère pas les résultats, seule la discipline compte | 0-3 | — |
| Sur 11 RCT poolés : aucun avantage significatif sur la connaissance théorique | 0-3 | ❌ anti-IA |
| Effet sur la **satisfaction** (SMD 1,18) = 4× l'effet nul sur la connaissance (SMD 0,27) | 0-3 | — |
| Les gains de productivité en labo (g = 0,73) ne survivent pas en conditions réelles | 0-3 | — |
| Le bénéfice dépend de la disponibilité de l'IA pendant l'évaluation | 1-2 | — |
| Le déficit de rétention s'explique par l'offloading cognitif / « desirable difficulties » | 0-3 | — |

**À noter** : plusieurs de ces affirmations sont *plausibles* et vont dans le sens des claims confirmés. Elles ont été rejetées parce que la **source ne les soutenait pas telles que formulées** — pas parce qu'elles sont fausses. C'est la bonne défaillance : le système refuse ce qu'il ne peut pas tracer, y compris quand ça l'arrangerait.

---

## 4. Limites de cette recherche — à lire avant de citer quoi que ce soit

1. **La synthèse automatique a échoué** (erreur API en fin de run). Ce document est une remise en forme manuelle des claims bruts. Aucun claim n'a été inventé ou reformulé sur le fond, mais l'organisation est la mienne.
2. **25 claims vérifiés sur 118 extraits** — la vérification adversariale est plafonnée. **93 affirmations n'ont jamais été testées** et n'apparaissent pas ici. Absence de claim ≠ absence de preuve.
3. **Le volet réglementaire européen (sous-question 4) n'a produit aucun claim confirmé**, malgré 5 sources institutionnelles ouvertes (Commission européenne, Conseil, Parlement). À traiter séparément si le sujet compte — ce document ne dit **rien** de fiable dessus.
4. **Aucune source française spécialisée du L&D n'a produit de claim confirmé** (Centre Inffo, Céreq ont été ouverts). Les preuves confirmées sont majoritairement anglo-saxonnes et académiques.
5. **Biais de corpus académique** : les études portent surtout sur des **étudiants** (lycée, université), pas sur des **professionnels en formation continue**. La transposition au public TLS est une **hypothèse**, pas un résultat.
6. Les études citées datent de 2025-2026 et plusieurs sont en **preprint arXiv** (non peer-reviewed). Signalé au cas par cas ci-dessus.

---

## 5. Coût réel — pour décider si on systématise

| Métrique | Valeur |
|---|---|
| Agents lancés | **107** |
| Tokens consommés | **~14,3 M** |
| Appels d'outils | 1 100 |
| Durée | **~52 min** |
| Sources récupérées | 25 |
| Claims extraits → vérifiés → confirmés | 118 → 25 → **12** |

**Verdict** : ce niveau **ne peut pas** tourner sur chaque item de veille — ce serait absurde économiquement. C'est un outil de **dossier** (mensuel, ou sur un sujet à enjeu), pas de **triage**.

Ça confirme la séparation posée dans [`BRIEF-VEILLE-IA-PIPELINE.md`](../briefs/BRIEF-VEILLE-IA-PIPELINE.md) :
- **Triage à l'ingestion** (par item, quotidien) → scoring léger, « l'IA prépare la vérification », dans le plugin `wp-veille`.
- **Dossier approfondi** (ponctuel, à enjeu) → ce protocole, **hors app**, en outil de travail. Ce qui rejoint la position du cahier 12bis qui renvoie déjà les AI-Generated Items « hors app, via agents externes ».

---

## 6. Ce que ça vaut pour TLS — pistes, pas conclusions

Trois observations, à trancher éditorialement :

1. **Il y a un angle de contenu fort et défendable** : « les gains mesurés de l'IA en formation mesurent la performance *avec l'outil*, pas l'apprentissage » — c'est sourcé PNAS + méta-analyse préenregistrée, et ça va à l'inverse du discours du marché. C'est exactement le registre d'un acteur qui refuse le bullshit.
2. **Le résultat sur le tuteur avec garde-fous (1.4) mérite réflexion en interne** : dans cet essai, le meilleur tutorat IA fait jeu égal avec pas d'IA du tout. À confronter honnêtement à ce que la Learning App promet — pas à cacher.
3. **Deux pièges de citation à bannir dès maintenant** dans tout contenu TLS : « cognitive debt » comme preuve établie (§2.1) et le 10 % Insee présenté comme adoption de l'IA générative (§2.2).

⚠️ Rappel des contraintes de communication TLS (cf. règles marketing permanentes) : ne pas transformer ces éléments en argumentaire réglementaire (AI Act), et de toute façon **§4.3 : ce document ne dit rien de fiable sur le volet réglementaire**.
