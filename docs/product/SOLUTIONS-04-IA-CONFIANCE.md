# Défaut 4 — Le score de confiance et le couteau suisse Mistral : options de conception

> **2026-07-24.** Étude de solutions pour le défaut IA le plus insidieux de la Learning App
> (voir [`REVUE-TRANSVERSALE-CDC`](REVUE-TRANSVERSALE-CDC.md), défaut 4 ; cahiers
> [`12_Chatbot`](../CDC/12_Chatbot_IA_et_QAR.md) et [`12bis_IA_Framework`](../CDC/12bis_IA_Features_Framework.md)).
> Trois options, chacune évaluée sous six lentilles : **apprenance · instructional design ·
> biais cognitifs & neurosciences · UX/UI · conformité · faisabilité technique**.
> ⚠️ Propositions à trancher en métier. Rien n'est engagé.
> Quatrième de la série (un document par défaut).

---

## Rappel du problème, reformulé en question de conception

Les cahiers affichent partout un chiffre qui a l'air d'une probabilité : « taux d'adéquation **92 %** »
(12bis, feature #4), `confidence_score` (12, modèle de données), « risque de départ **78 %** »
(12bis, feature #6). Dans le code, `ConfidenceChip` (`ChatInterface.tsx:22`) range le score en trois
bandes de couleur **mais imprime quand même le nombre brut** `92% confiance` — et ce nombre vient
aujourd'hui de valeurs mockées en dur (`chatbot.ts` : `0.92`, `0.88`, `0.85`). En production, la spec
prévoit de le demander à Mistral (« Mistral output incluant score confiance », 12). C'est le cœur du
défaut : **un LLM ne produit pas de confiance calibrée**, et une valeur auto-déclarée est facilement
sur-confiante sur une hallucination.

La vraie question n'est pas « quel seuil mettre » mais double :

> **Comment donner à l'apprenant — et au manager — un signal *honnête* sur la fiabilité d'une réponse
> IA, et comment répartir le travail entre le langage (LLM) et le calcul (déterministe), sans fausse
> précision ni hallucination sur-confiante ?**

Un invariant, commun aux trois options et non négociable : **un LLM n'émet jamais un nombre affiché
comme une mesure, ni un nombre qui pilote une décision.** Il produit du langage. Tout chiffre présenté
comme fiabilité, adéquation, risque ou taux provient d'un **calcul déterministe** ou d'un **vérificateur
externe** — jamais de l'auto-évaluation du modèle. Corollaire d'affichage : **aucun pourcentage nu** ne
sert de signal de confiance. *(Fondement : la confiance verbalisée d'un LLM aligné par RLHF est mal
calibrée — les modèles « savent en partie ce qu'ils savent » sur des formats fermés à choix multiples
(Kadavath et al., 2022), mais l'estimation auto-déclarée en texte libre après alignement dérive vers la
sur-confiance. Un `0.92` n'est donc pas une probabilité, c'est un mot habillé en chiffre.)*

---

## OPTION A — Le signal fiabilisé : **groundedness** rendu qualitatif

**L'idée.** Garder un signal de fiabilité, mais **changer sa source de vérité**. On ne demande plus à
Mistral « quelle est ta confiance ? » (auto-report non calibré). Une **passe de vérification séparée**
mesure la *groundedness / faithfulness* : les affirmations de la réponse sont-elles bien **entailées par
les passages récupérés** ? On mappe cette mesure sur un **registre qualitatif à 3 crans** et on garde la
route d'abstention sous le cran bas. Aucun nombre affiché.

C'est la chirurgie minimale sur l'existant : `ConfidenceChip` a déjà 3 bandes — on remplace l'entrée
(groundedness, pas auto-score) et on **retire le texte `{pct}%`**.

```
Réponse RAG  →  vérificateur (NLI / juge de faithfulness sur le contexte récupéré)
             →  « Bien ancrée » / « À recouper » / « Peu ancrée → je t'oriente vers ton coach »
             (jamais « 92 % »)
```

| Lentille | Évaluation |
|---|---|
| **Apprenance** | 🟢 Un signal ancré et qualitatif enseigne la **confiance appropriée** (Lee & See, 2004) : « c'est bien soutenu par le cours » vs « à vérifier » — bien mieux qu'un faux %. 🟡 Mais un chip global ne dit pas *quelle* affirmation est fragile. |
| **Instructional design** | 🟡 Reste un modèle « réponse mâchée » : le chatbot répond, l'apprenant consomme. La groundedness fiabilise, mais n'ajoute **aucun scaffolding**. Neutre sur l'axe « faire produire vs servir ». |
| **Biais & neuro** | 🟢 Supprimer le % tue la **fausse précision** (l'*overprecision* de Moore & Healy, 2008) et l'ancrage sur un chiffre spurieux. Un cran qualitatif déclenche *encore* un peu de **biais d'automatisation** (Parasuraman & Riley, 1997 : on défère à « Bien ancrée »), mais très en deçà d'un « 92 % ». |
| **UX/UI** | 🟢 Registre qualitatif + le `AITransparencyLabel` déjà présent (« Généré par l'IA », art. 50) forment une divulgation cohérente et honnête. 🟢 Peu de redesign : la structure 3 bandes existe déjà. |
| **Conformité** | 🟢 Signal honnête, plus de probabilité trompeuse. **Ne touche pas** au churn/décision auto (art. 22) — hors périmètre de cette option. Art. 50 déjà couvert par le label. |
| **Faisabilité** | 🟡 Exige un **vérificateur** : une passe NLI/juge par réponse (latence + coût ≈ doublés ; le Mistral self-host peut héberger le juge). La mesure de faithfulness est balisée (approche type RAGAS), mais pas gratuite. 🔴 Sous-point : un juge lui-même LLM a son propre taux d'erreur — on vérifie un LLM par un LLM ; atténuer avec un modèle NLI dédié + un recouvrement de récupération. *(Note honnête : un Mistral self-hosté peut exposer les logprobs → probabilité de séquence, mais c'est un proxy faible de la justesse et non calibré à la groundedness — ça ne sauve pas le %. Je n'ai pas vérifié la stack de service Mistral visée.)* |

**En un mot.** Corrige le signal *langage* honnêtement et à coût modéré, au plus près du code — mais
laisse le couteau suisse (chiffres/décisions) intact et reste un modèle « servir la réponse ».

---

## OPTION B — Le silence honnête : **abstention + sources**, zéro score

**L'idée.** Retirer complètement le signal de fiabilité. Il reste **trois signaux honnêtes** : (1) les
**sources citées** — l'apprenant ouvre « Leçon 3.2 » et juge ; (2) l'**abstention calibrée** — le
meilleur output du système est souvent « je n'ai pas trouvé ça dans le contenu indexé → va voir ton
coach » (*selective answering*, l'option de refus) ; (3) le **label « Généré par l'IA »** (art. 50).
Ni bande, ni nombre, rien qui prétende quantifier la fiabilité. Le pari de conception : **un « je ne
sais pas » honnête plus une vraie source battent n'importe quel UI de confiance.**

Le germe existe déjà : `LOW_CONFIDENCE_RESPONSE` (`chatbot.ts:63`) route vers coach/support sous 0.6.

| Lentille | Évaluation |
|---|---|
| **Apprenance** | 🟢🟢 **Le meilleur.** L'apprenant doit *évaluer la source*, pas déférer à un chip — métacognition active. L'abstention **modélise l'honnêteté intellectuelle**, une norme qu'on *veut* voir un adulte apprenant intérioriser. Refuser plutôt que sur-asserter éduque la confiance appropriée. |
| **Instructional design** | 🟢 « Voici la source, va la lire » + « je ne sais pas » poussent l'apprenant à **faire le travail** — plus proche du scaffolding (Wood, Bruner & Ross, 1976 ; ZPD de Vygotsky) que d'une réponse mâchée. Se marie avec un chatbot qui **questionne au lieu de mâcher** (effet de génération, Slamecka & Graf, 1978). |
| **Biais & neuro** | 🟢🟢 Pas de nombre → pas de fausse précision, pas d'ancrage. L'abstention est **le meilleur antidote au biais d'automatisation** : le système décline au lieu de sur-affirmer. 🟡 Résiduel : l'absence de tout signal peut se lire « toujours fiable quand il répond » — il faut que l'abstention soit assez **fréquente et visible** pour poser la norme. |
| **UX/UI** | 🟡 Exige plus de l'UX *et* de l'apprenant : lire une source coûte plus qu'un coup d'œil à un chip. Risque de **sur-confiance** en l'absence de tout repère. Atténuer : sources proéminentes, abstention traitée comme un **état de première classe** (pas comme une erreur). |
| **Conformité** | 🟢 Honnête par construction (aucune métrique trompeuse). Label art. 50 conservé. L'abstention réduit le risque d'hallucination. **Ne règle pas** l'art. 22 churn (chantier séparé). |
| **Faisabilité** | 🟢🟢 *Retirer* une feature est le build le moins cher. Mais : une bonne abstention a besoin d'un **vrai déclencheur** — il faut toujours un score de groundedness/récupération pour décider *quand* s'abstenir (elle **réutilise donc en interne le vérificateur de A**, sans l'afficher). 🟡 Le coût honnête est la **calibration du seuil** d'abstention. |

**En un mot.** Pédagogiquement le plus pur et le moins cher à livrer, le meilleur pour la confiance
appropriée — mais reporte la vérification sur l'apprenant et exige un vrai déclencheur d'abstention
sous le capot (donc moins « gratuit » qu'il n'y paraît). Bonne **posture**, système incomplet à lui seul.

---

## OPTION C — L'architecture hybride : **le calcul décide, le LLM reformule**

**L'idée.** Attaquer *l'autre moitié* du défaut — le couteau suisse. **Partitionner par nature de
tâche.** Tout ce qui est tabulaire / déterministe / décisionnel **sort de Mistral** : agrégation
d'org → **SQL** (`AVG`, `GROUP BY`) ; forecast → **projection statistique** (vélocité/linéaire, puis un
vrai modèle) ; churn → **ML tabulaire** (gradient boosting / régression logistique) avec **humain
décideur** (art. 22) ; adéquation mission → **score de recouvrement de compétences explicite** ou rang
qualitatif. Le LLM est **rétrogradé en couche de reformulation** : il met les nombres calculés en
phrases et, pour le RAG, génère la prose ancrée (vérifiée façon A). Désormais les **nombres portent une
vraie incertitude** (intervalle, métrique de modèle, « données insuffisantes ») ; le **langage porte la
groundedness**. Le LLM n'émet jamais de mesure.

Cible directement `SELECT skill_distribution WHERE team_id=X` puis « Calls Mistral forecast model »
(12, journey #2, étapes 3-5) et le batch churn de 12bis.

| Lentille | Évaluation |
|---|---|
| **Apprenance** | 🟡 Pour le **chatbot apprenant**, C rend les réponses chiffrées fiables (vrai calcul) — bon. Mais les charges phares de C (churn, org gap) sont **manager-facing** : **l'apprenance n'est pas le cadre** ici, et il serait malhonnête de la forcer. Le cadre juste = qualité de décision + RGPD. |
| **Instructional design** | 🟡 Largement **orthogonal** à l'ID (décision d'architecture/plomberie), sauf qu'elle retire une classe de réponses chiffrées *confidemment fausses* susceptibles d'égarer un apprenant. Neutre-positif. |
| **Biais & neuro** | 🟢🟢 Élimine la fausse précision **à la source** : une moyenne calculée `2,3/5` *est* légitimement précise ; un churn de 0,78 issu d'un vrai modèle *a* un sens. Tue le pire piège d'automatisation : un manager agissant sur un chiffre d'org **halluciné** par un LLM. 🟡 Résiduel : un nombre calculé reste sur-trustable → l'accompagner d'un intervalle et d'un « sur quelles données ». |
| **UX/UI** | 🟢 Permet un UI chiffré **honnête** (intervalle, « n=3, faible », « données insuffisantes ») qu'un % auto-déclaré ne justifiera jamais. Cohérent avec A/B côté langage. |
| **Conformité** | 🟢🟢 **Le plus défendable.** L'agrégation déterministe est **auditable et reproductible** ; un modèle de churn documenté + humain décideur, c'est *exactement* la posture art. 22 (rejoint le défaut 3) ; aucun LLM ne déclenche seul une action RH. Meilleur argument conformité pour le marché ETI. |
| **Faisabilité** | 🔴 Le plus lourd : couche de requêtes, pipeline stats/ML (une **capacité data science absente** dans une équipe de deux), monitoring de modèle. 🟢 Atténuant fort : c'est souvent **moins cher** que le chemin LLM qu'il remplace (un `AVG` SQL ≈ gratuit vs ~400 $/mois de rapport d'org LLM estimé en 12bis), et une **heuristique explicable** peut tenir lieu de ML churn (meilleur pour l'art. 22 qu'une boîte noire). Reste de la vraie ingénierie, pas un prompt. |

**En un mot.** La seule option qui **guérit vraiment** le couteau suisse et le meilleur actif de
conformité — mais la plus lourde, et elle réclame une capacité data que l'équipe n'a pas encore.
La cadrer sur les rares chiffres qui comptent (agrégation d'org, churn) et démarrer en **heuristique
explicable**, pas en ML.

---

## Matrice de synthèse

| Critère | A — Groundedness qualitatif | B — Abstention + sources | C — Hybride calcul/LLM |
|---|---|---|---|
| Honnêteté du signal (0 fausse précision) | 🟢 | 🟢🟢 | 🟢🟢 (côté chiffres) |
| Confiance appropriée / métacognition | 🟢 | 🟢🟢 | 🟡 (manager, pas apprenant) |
| Scaffolding (fait produire vs mâche) | 🟡 | 🟢 | 🟡 |
| Résistance au biais d'automatisation | 🟢 | 🟢🟢 | 🟢🟢 |
| Conformité (art. 50 langage / art. 22 décision) | 🟢 (50) | 🟢 (50) | 🟢🟢 (50 **et** 22) |
| Sort les tâches tabulaires du LLM | 🔴 (ne le fait pas) | 🔴 (ne le fait pas) | 🟢🟢 |
| Charge / friction (build + UX) | 🟡 | 🟢🟢 (côté build) | 🔴 |
| Proximité du code existant | 🟢🟢 (`ConfidenceChip`) | 🟢 (`LOW_CONFIDENCE_RESPONSE`) | 🔴 |
| Coût Mistral / reproductibilité | 🟡 | 🟢 | 🟢🟢 |

**Ce que la matrice montre** : les trois ne sont pas concurrentes — elles opèrent à des **couches
différentes**. A répare le signal *langage*, B est le **plancher d'honnêteté** (ne rien afficher de
faux), C répare les *chiffres et les décisions*. Les opposer serait une erreur : le vrai système en a
besoin des trois, à des endroits différents.

---

## Recommandation — un principe d'honnêteté, trois régimes de signal

Je ne recommande pas *une* option, mais **leur composition par type de signal** : la posture de B, le
moteur de A, la ligne de partage de C. Tranché.

### Le plancher — la posture de B : aucun `%` ne s'affiche

Supprimer le pourcentage partout dans l'UI. `ConfidenceChip` perd son texte `{pct}%`. Le signal
par défaut d'une réponse incertaine devient l'**abstention** (« je n'ai pas trouvé ça dans le contenu
indexé — ton coach saura »), traitée comme un état de première classe, jamais comme une erreur.

### Le moteur — le vérificateur de A : groundedness, pas auto-report

Ce qui *décide* d'afficher « Bien ancrée / À recouper / Peu ancrée » et *quand* s'abstenir, c'est une
**passe de vérification de faithfulness** (le juge NLI, pas Mistral se notant lui-même). C'est le seul
signal de fiabilité *langage* légitime, et il pilote silencieusement l'abstention de B.

### La ligne de partage — le split de C : ce qui doit **sortir du LLM**

C'est le livrable central. Chaque chiffre/décision quitte Mistral ; le LLM ne garde que la mise en mots.

| Fonction (cahier) | Aujourd'hui | Sort vers (déterministe / vérifié) | Ce que le LLM garde |
|---|---|---|---|
| Réponse chatbot RAG *(12)* | LLM + `confidence_score` auto | **vérificateur de groundedness** → registre qualitatif + abstention | génère la prose **ancrée** |
| « Taux d'adéquation 92 % » mission *(12bis #4)* | LLM auto-score | **score de recouvrement compétences** explicite, ou rang qualitatif sans nombre | reformule le *pourquoi* |
| « Risque de départ 78 % » churn *(12bis #6/#8)* | LLM batch scoring + **mail auto** | **ML tabulaire / heuristique explicable** + **humain décideur** (art. 22, défaut 3) | rédige l'explication, **ne déclenche RIEN** |
| Org intelligence / gap *(12bis #9)* | LLM sur « toutes les données de l'org » | **SQL déterministe** (`AVG`, `GROUP BY`, seuil n≥3) | **narre** le tableau calculé |
| Forecast équipe *(12, journey #2)* | LLM « forecast model » | **projection statistique** (vélocité) + « données insuffisantes » | met en phrase, **borne** l'incertitude |
| Niveaux Dreyfus du questionnaire *(12bis #1)* | LLM « génère » les niveaux | `selfAssessedLevel` = **perception**, jamais mesure (cf. défaut 1) | conduit la **conversation** |

### Pourquoi c'est le bon arbitrage

- **Apprenance / biais** : plus aucun `%` sur-confiant à ancrer ; l'apprenant apprend la confiance
  appropriée via sources + abstention (B) plutôt que via un chiffre inventé.
- **Instructional design** : couplé à un chatbot en **mode scaffolding par défaut** (il questionne,
  ne mâche pas — effet de génération), l'abstention devient un levier pédagogique, pas un échec.
- **Conformité** : art. 50 tenu par le label déjà présent ; art. 22 tenu par le split C (le churn ne
  déclenche plus de mail seul — l'humain reçoit, explique-par-le-LLM, et tranche).
- **Faisabilité / coût** : on part du code existant (`ConfidenceChip`, `LOW_CONFIDENCE_RESPONSE`), le
  SQL d'agrégation est *moins cher* que le rapport LLM qu'il remplace, et une **heuristique churn
  explicable** évite d'imposer une capacité ML à une équipe de deux tout en servant mieux l'art. 22.

### L'invariant, redit

Un LLM produit **du langage**, jamais un nombre-mesure ni un nombre-décision. La fiabilité du *langage*
= groundedness (qualitative) ; la fiabilité des *chiffres* = intervalle calculé ; les *décisions* RH
= déterministe + humain. **Aucun pourcentage nu comme signal de confiance.**

---

## Ce qu'il reste à décider (et que je ne peux pas trancher seul)

1. **Les libellés du registre qualitatif** (3 crans) : « Bien ancrée / À recouper / Hors de mon
   périmètre » — ou autre. Décision UX + pédagogique (le vocabulaire doit inviter à vérifier, pas
   rassurer à tort).
2. **Le seuil d'abstention** : aujourd'hui `<0.6` sur un nombre fictif. Une fois le score = groundedness
   réelle, sur quoi le régler ? Arbitrage **faux négatifs** (s'abstient trop, frustre) vs **faux
   positifs** (répond à tort). Décision produit + évaluation empirique.
3. **Le churn : ML ou heuristique ?** Un gradient boosting « boîte noire » est plus fin mais moins
   défendable (art. 22) et hors capacité d'une équipe de deux ; une **règle explicable** est plus faible
   mais auditable et honnête. Mon penchant : heuristique explicable d'abord — mais c'est un arbitrage
   produit/juridique.
4. **Le taux d'adéquation mission** : garder un **rang qualitatif sans nombre**, ou un **score calculé
   explicite** (recouvrement de compétences) ? Les deux battent l'auto-score LLM ; le choix est produit.
5. **Vérification juridique** : art. 50 (transparence chatbot / contenu généré) vs art. 4 (littératie
   IA) — le commentaire du code (`ChatInterface.tsx:20`) dit « Article 4 », qui vise la littératie, non
   la divulgation ; le label relève plutôt de l'art. 50. À **confirmer avec un conseil** (ce doc raisonne
   sur les numéros d'article de mémoire, sans vérification de première main).
6. **La dette de schéma** : le modèle de données (12) déclare `VECTOR(1536)` (dimension OpenAI) ; la
   revue signale que `mistral-embed` sort en 1024. À corriger — **je n'ai pas re-vérifié moi-même** la
   dimension courante du modèle d'embedding Mistral visé.

---

## Journal

**2026-07-24** — Création. Quatrième document de la série « solutions par défaut ». Trois options
(groundedness qualitatif / abstention + sources / architecture hybride) évaluées sous six lentilles.
Recommandation tranchée : **un principe d'honnêteté à trois régimes de signal** — plancher de B (aucun
`%` affiché), moteur de A (vérificateur de groundedness, pas d'auto-report Mistral), split de C (tout
chiffre/décision — churn, agrégation d'org, forecast, adéquation — sort du LLM ; le LLM ne fait que
reformuler ; l'humain décide sur le churn, art. 22). Invariant : un LLM n'émet jamais un nombre-mesure
ni un nombre-décision. Faits vérifiés dans le code : `ConfidenceChip` imprime le `%` brut sur 3 bandes ;
les scores sont mockés en dur ; l'abstention existe en germe (`LOW_CONFIDENCE_RESPONSE` < 0.6) ; le
label art. 50 « Généré par l'IA » est déjà présent. Non re-vérifié : stack de service Mistral (logprobs),
dimension `mistral-embed` (1024 vs 1536 au schéma), numéros d'article AI Act (à confirmer juridiquement).
Ancrages nommés : biais d'automatisation (Parasuraman & Riley, 1997), confiance appropriée (Lee & See,
2004), fausse précision / *overprecision* (Moore & Healy, 2008), calibration LLM (Kadavath et al., 2022),
groundedness/faithfulness (approche RAGAS), abstention comme design, effet de génération (Slamecka &
Graf, 1978), scaffolding/ZPD (Wood, Bruner & Ross, 1976 ; Vygotsky), transparence art. 50 / décision
automatisée art. 22. Aucun recours aux mythes pop-neuro (VARK, « 8 secondes d'attention », cerveau
triunique, « cognitive debt ») — les fondements mobilisés sont les vrais.
