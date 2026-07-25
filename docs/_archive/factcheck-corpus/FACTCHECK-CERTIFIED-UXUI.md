# 🔬 Fact-check CERTIFIÉ — Parcours UX/UI Design & Product Management EdTech

**Créé** : 2026-07-10 · **Méthode** : vérification claim-par-claim, verbatim, avec WebSearch ciblé sur chaque chiffre marché/stat/attribution incertaine. Canon design/PM confirmé de mémoire (sources primaires connues).
**Sources Drive lues (contenu réel)** :
- `1zP8JsOsYxYQrG0Cw59Y2T3X9upQcv2-_XHdtWPv7w_8` — Vue d'ensemble + M1-12
- `1GzpyvGFCOUHfh9Y6U36cwFEIUs2UjnsXmoLbFABCjRA` — Guide Complet (M1-2 détaillés, 50 slides chacun)
- `19TWRPkUB4M4AKo_zkpEkd7aFUAoV5UMZ3hXWXx7pUvM` — Modules 3-7 (M3-4 détaillés ; M5-6-7 condensés)
- `1YEWueCoWlM0cnmx9yPu6Us6ZkK5iMY_pchaKYWFVv3Q` — Modules 8-12 (M8 détaillé ; M9 semi ; M10-11 = "Key Topics" ; M12 brief)

> Ce doc est le **complément profond** de `CORPUS-FORMATIONS-FACT-CHECK.md` (§ défauts par parcours), spécifique au parcours UX/UI. À lire AVANT toute mise en prod (app ou site).

---

## 0. Verdict global

**C'est effectivement le parcours le mieux sourcé du corpus.** L'ossature design/UX/PM est du **canon solide** (Nielsen, Sweller, Mayer, Bjork, Deci & Ryan, Christensen, McClure, Intercom RICE, Wurman LATCH, Csikszentmihalyi…) — correctement attribué dans ~90 % des cas. Le fond pédagogique tient.

**MAIS** trois catégories de problèmes le rendent **non-publiable en l'état** :

1. 🔴 **Le mythe du poisson rouge / attention 8 s est RÉINTRODUIT en M8** (Slide 4 + script vidéo) — exactement le risque redouté, car M8 est le pont avec le parcours Neuro. À supprimer d'urgence.
2. ❌ **Erreur de contraste factuelle et calculable, répétée 5×** : `#55A1B4 sur blanc = 4.6:1 ✅ AA`. Le vrai ratio WCAG est **2.94:1 → ÉCHEC AA** (et échoue même AA large text). Grave dans un parcours qui *enseigne l'accessibilité*.
3. ❌ **~10 stats "business" fabriquées** avec fausses attributions ("Apple research", "Figma study 2025", "study 2026") + **preuves de résultats inexistantes** (études post-certification, ROI, +salaire €12K) sur un parcours qui n'a **aucune cohorte diplômée**.

**S'ajoute un problème de complétude** : le parcours se vend "12 modules · 780 min" mais **seuls M1-2-3-4 et M8 sont réellement rédigés**. M5-6-7 = plans à puces, M9 = semi, **M10-11 = simples listes "Key Topics"**, et **tout le volet marketing (landing pages, 12 emails, sales deck, 8 case studies, Figma DS)** est promis mais **non écrit** (« à créer », « à suivre » répétés). ⇒ marqué **[À COMPLÉTER]** ci-dessous.

**Effort de correction** : chirurgical (~1 j) sur le fond + recalcul des ratios de contraste + purge des chiffres fabriqués. Pas de réécriture pédagogique.

| Dimension | État |
|---|---|
| Canon design/UX/PM | ✅ Solide, bien attribué |
| Learning science (M8) | ✅ Backbone solide **SAUF** le mythe 8 s (🔴) |
| Chiffres accessibilité (contrastes) | ❌ Faux et sur-vendus (calcul WCAG) |
| Stats marché/business | ⚠️/❌ Mélange de réel mal-daté et de fabriqué |
| Preuves de résultats (ROI, salaire, %) | 🔴 Fabriquées (aucune cohorte) |
| Complétude du parcours | ⚠️ ~40 % réellement rédigé |

**Légende** : ✅ exact · ⚠️ vrai mais imprécis/sur-simplifié/mal-daté · ❌ faux ou fabriqué · 🔴 mythe débunké / danger crédibilité direct.

---

## 1. VUE D'ENSEMBLE (doc chapeau)

| # | Claim (verbatim) | Verdict | Source réelle | Correction |
|---|---|---|---|---|
| 1 | « **94 %** premières impressions app = design visuel (Source : UX research 2026) » | ⚠️ | Stat réelle mais **mal datée & mal attribuée**. Origine ≈ Lindgaard et al. 2006 (50 ms pour juger) + études d'éval de sites (ResearchGate 2014) ; souvent mis-attribuée à "Stanford". Pas "UX research 2026". | Garder le chiffre, corriger la source : *"les premières impressions d'un site sont à ~94 % liées au design visuel (recherche en évaluation d'interfaces, ~2004-2014)"*. Retirer "2026". |
| 2 | « Design inconsistent = **-32 % confiance** utilisateur (Nielsen Norman Group) » | ❌ | **Aucune publication NN/g** ne donne ce chiffre. Attribution fabriquée. | Supprimer le "-32 %" ou remplacer par un vrai résultat NN/g cité (ex. cohérence → apprentissage). |
| 3 | « Marché EdTech 2026 : **€404B** » | ⚠️ | **HolonIQ : $404B *by 2025*** (projection août 2020, 16,3 % CAGR). C'est des **dollars**, et **2025**. | Corriger : *"~$404 Md (HolonIQ, horizon 2025)"*. Ne pas écrire "€404B 2026" (double erreur devise + année). |
| 4 | « Gap de compétences = **€120K+ salaire CPO EdTech senior** (top 10 %) » | ⚠️ | CPO France : **moyenne ~€100K**, fin de carrière ~€170K, P75 Paris ~€190K (Payscale/Glassdoor). L'EdTech paie **moins** que fintech/tech généraliste. | €120-180K = haut de fourchette *senior*, pas typique. Adoucir + ne pas présenter comme débouché du parcours (cf. §9). |
| 5 | Transformation « **De Designer → CPO EdTech** » via 13 h | 🔴 (framing) | Un CPO est un poste C-suite (années d'XP). Un parcours de 13 h ne fait pas un CPO. | Reformuler l'ambition : *"acquérir la boîte à outils UX+PM d'un profil produit EdTech"*, pas "devenir CPO". |
| 6 | Certif « **Formation Certifiante** » + badge "The Learning Society Certified" | ⚠️ | Badge **interne TLS**, pas RNCP/Qualiopi. (Rappel règle projet : **Qualiopi JAMAIS**, TLS non certifié.) | OK tant que rien n'implique une certification d'État. Ne pas laisser "Certifiante" suggérer un titre reconnu. |
| 7 | ROI apprenant : « **+€12K/an** salaire (étude post-certification) · payback **1 mois** · ROI 5 ans **€60K** · **40 %** changent de rôle · **68 %** appliquent » | 🔴 | **Aucune cohorte n'a terminé le parcours** → aucune "étude post-certification" ne peut exister. Chiffres = projections présentées en preuves. | Relabelliser **"projection illustrative"** partout, ou retirer. Danger direct vu les règles d'honnêteté marketing TLS. |

---

## 2. MODULE 1 — Web Design & Visual Design

| Claim (verbatim) | Verdict | Source réelle | Correction |
|---|---|---|---|
| « **95 % du web est texte** (Oliver Reichenstein) » | ✅ | Réel : iA / Reichenstein, *"Web Design is 95% Typography"* (2006). Attribution correcte. | RAS — préciser que c'est une **thèse rhétorique**, pas une mesure. |
| « *Typography is what language looks like* — Ellen Lupton » | ✅ | Citation authentique (*Thinking with Type*). | RAS. |
| WCAG AA texte normal = **4.5:1** ; large (≥18px bold/≥24px) = **3:1** | ✅ | WCAG 2.1 SC 1.4.3. Exact. | RAS. |
| **`#55A1B4` sur blanc = 4.6:1 ✅ AA** (Slides 10/16/35, script, quiz) | ❌ | **Calcul WCAG : 2.94:1** → **échoue AA** (4.5) *et* AA large (3.0). Vérifié algorithmiquement. | **Corriger en 2.94:1 (fail)**. Pour passer AA il faut **`#3D7786` (primary-700) = 5.02:1**. Le doc a confondu le bleu clair de marque avec une teinte foncée conforme. |
| `#ED843A` orange sur blanc = **3.2:1 ⚠️ AA Large only** | ⚠️/❌ | **Calcul : 2.64:1** → échoue même le large text. | Corriger : 2.64:1, **fail** (ne pas l'annoncer "AA large ok"). |
| `#F8B044` jaune sur blanc = **2.1:1 ❌ Fail** | ✅ (conclusion) | **Calcul : 1.86:1**. Chiffre légèrement optimiste mais **conclusion "fail" correcte**. | Ajuster à 1.86:1 ; conclusion inchangée. |
| « **Bleu = 80 % plateformes** finance/EdTech » | ❌ | Stat inventée, aucune source. | Supprimer le "80 %". |
| « Facebook bleu ? Trust, **addiction selon Sean Parker** » | ⚠️ | Le bleu FB = **daltonisme rouge-vert de Zuckerberg** (déclaré). Parker a parlé de la **boucle de validation dopaminergique**, jamais de la *couleur*. Amalgame. | Retirer l'attribution couleur↔addiction. |
| « **1 px d'espace en +** = perception **+10 % qualité** (Material Design) » | ❌ | Material Design ne dit pas ça. Chiffre fabriqué. | Supprimer le "+10 %". |
| « **16 % de la population** a une déficience visuelle » | ⚠️ | Confusion : ~16 % = **handicap toutes formes** (OMS) ; la *déficience visuelle* et surtout le *daltonisme* (~8 % hommes / 0,5 % femmes) sont d'autres chiffres. | Reformuler : *"~8 % des hommes sont daltoniens ; ~2,2 Md de personnes ont une déficience visuelle (OMS)"*. |
| Grille contraste Slide 24 (Text Primary 15:1, Primary Action 4.6:1…) | ⚠️ | Le 4.6:1 hérite de l'erreur ci-dessus. | Recalculer toute la matrice avec les vrais ratios. |
| Exercice : contrastes Coursera 4.9:1 / Udemy 5.2:1 / Khan 6.1:1 | ⚠️ | Chiffres non vérifiés (dépendent des vraies couleurs/tailles). | Marquer "à re-mesurer" ou retirer les décimales précises. |

---

## 3. MODULE 2 — Principes UI (4C : Clarity, Consistency, Contrast, Comfort)

| Claim (verbatim) | Verdict | Source réelle | Correction |
|---|---|---|---|
| Framework "4C" (Clarity/Consistency/Contrast/Comfort) | ✅ (pédago) | Regroupement maison cohérent (pas un framework "officiel" nommé, mais légitime). | OK — ne pas présenter comme standard industrie établi. |
| « *Don't make me think* — Steve Krug » | ✅ | Authentique (titre du livre, 2000). | RAS. |
| « *Familiar = Fast. Novel = Slow* — Jakob Nielsen » | ⚠️ | Idée nielsenienne réelle (loi de Jakob : les users passent leur temps sur d'autres sites) mais **citation non attestée mot pour mot**. | Reformuler en paraphrase attribuée, sans guillemets stricts. |
| **Miller's Law = 7±2 items** (Comfort / chunking) | ⚠️ | Miller 1956 = empan mnésique immédiat, **souvent mal-appliqué** à l'UI ("max 7 items menu"). Capacité de la mémoire de travail révisée à **~4 chunks (Cowan 2001)**. | Corriger : *"~4 chunks (Cowan 2001) ; le 7±2 de Miller est régulièrement mal-appliqué au design de menus"*. **Cohérence avec Neuro M-mémoire.** |
| **Hick's Law** : « 2 options → 1 s, 10 → 3.5 s, 100 → 7 s » | ⚠️/❌ | Loi réelle (RT = b·log₂(n+1)) mais **les secondes absolues sont fabriquées**. Avec b≈0,15 s, 10 options ≈ **0,5 s**, pas 3,5 s. | Garder la loi, **retirer le tableau de secondes** (ou le marquer "illustratif, non calibré"). |
| Cognitive Load : Intrinsic/Extraneous/Germane | ✅ | Sweller (CLT). Exact. | RAS. |
| « TLS : **87 composants documentés Storybook** » | ⚠️ | Le vrai DS TLS **n'utilise pas Storybook** (showcase = `src/pages/Components.tsx`) et compte **>90 composants** (51 ui + 40 patterns + core…). | Corriger : *"showcase interne `Components.tsx`"*, pas Storybook ; recompter. |
| Airbnb "200+ composants, 10 000+ écrans" | ⚠️ | Ordre de grandeur plausible, chiffres exacts non vérifiables. | Adoucir en "des centaines de composants". |
| Material Design "1 000+ apps Android cohérentes" | ✅ (approx) | Directionnellement vrai. | RAS. |

---

## 4. MODULE 3 — Interaction Design & Micro-interactions

| Claim (verbatim) | Verdict | Source réelle | Correction |
|---|---|---|---|
| « Micro-interactions = **+32 % perceived quality (Apple research)** » | ❌ | **Aucune "Apple research" publique** ne donne ce chiffre. Attribution fabriquée. | Supprimer le "+32 % (Apple)". |
| « Gamification engagement = **+48 % retention EdTech (study 2025)** » | ❌ | Étude fantôme. | Supprimer ou remplacer par une source réelle. |
| « Animations mal faites = **-18 % perceived performance** » | ❌ | Chiffre inventé. | Supprimer. |
| Framework **Trigger-Rules-Feedback** | ✅ | Dan Saffer, *Microinteractions* (2013). Correct (le livre est cité en ressources). | RAS. |
| Timing « **100-300 ms** sweet spot » | ✅ | Aligné Material Motion (~200-300 ms). | RAS. |
| Easing : ease-out = entrée naturelle | ✅ | Bonne pratique standard. | RAS. |
| « **10 % users ont vestibular disorders** » → prefers-reduced-motion | ⚠️ | Prévalence variable : ~35 % des 40+ ont une dysfonction vestibulaire (Agrawal 2009) ; la sensibilité au mouvement symptomatique est plus basse. "10 %" = ordre de grandeur défendable mais imprécis. | Reformuler : *"une part significative d'utilisateurs (estimations 5-35 % selon définition)"*. Garder le principe `prefers-reduced-motion` (excellent). |
| Duolingo/Codecademy/Khan cités comme réf gamification | ✅ | Exemples pertinents et réels. | RAS (voir M8 pour leurs chiffres). |
| Perf : GPU accel, `will-change`, 60fps, "1 animation = 1 purpose" | ✅ | Bonnes pratiques réelles. | RAS. |

---

## 5. MODULE 4 — Design Systems & Component Libraries

| Claim (verbatim) | Verdict | Source réelle | Correction |
|---|---|---|---|
| « Teams sans design system = **60 % temps redesign** » | ❌ | Chiffre non sourcé/fabriqué. | Supprimer. |
| « Design system mature = **+300 % vitesse design-to-dev (Figma study 2025)** » | ❌ | **Aucune "Figma study 2025"** documentée avec ce chiffre. | Supprimer l'attribution + le "+300 %". |
| « Inconsistency coûte **€18K/mois** org 50+ » | ❌ | Fabriqué. | Supprimer. |
| Atomic Design (atoms→molecules→organisms→templates→pages) | ✅ | **Brad Frost** (canon). Correct. | RAS. |
| Token hierarchy (primitives → semantic → component) | ✅ | Standard DS (Style Dictionary, etc.). | RAS. |
| « **87 composants TLS** » (structure Core/Composite/Feature/Pattern) | ⚠️ | Voir M2 : le vrai DS en compte >90, réparti différemment. | Recompter / re-libeller. Cohérence interne. |
| InVision "living, breathing system…" citation | ✅ | Formulation InVision réelle (largement reprise). | RAS. |

---

## 6. MODULES 5-7 — User Research · IA · Prototyping *(condensés dans la source)*

> M5-6-7 sont **à l'état de plans à puces** dans le Drive (pas de slides rédigées). Peu de claims chiffrés, donc peu de risque — mais **contenu à finaliser** avant prod.

| Claim (verbatim) | Verdict | Source réelle | Correction |
|---|---|---|---|
| M5 : « **85 % échecs produit** = mauvaise compréhension users (study 2026) » | ⚠️ | Les stats d'échec produit existent (Christensen : ~95 % des 30 000 lancements/an échouent ; "72 % ratent leurs objectifs") mais **le "85 % = mauvais user research (2026)" n'est pas sourçable**. | Garder l'idée, retirer le "85 % / 2026" ; citer Christensen si besoin. |
| M5 : « User research ROI = **$100 → $1 000-$10 000 saved** » | ⚠️/✅ | Dérive du célèbre **Forrester "$1 investi en UX rend $100"** (ROI 9 900 %). Chiffre **ancien et sur-cité**, mais attribution réelle existe. | Reformuler : *"Forrester estime un fort retour de l'investissement UX (chiffre ancien, à manier avec prudence)"*. |
| M5 : Empathy Map Says/Thinks/Does/Feels | ✅ | Dave Gray / XPLANE (canon). | RAS. |
| M5 : Jobs-to-be-Done | ✅ | Christensen. | RAS. |
| M6 : Navigation confuse = **40 % abandon** ; IA mauvaise = **+120 % tickets** | ❌ | Chiffres fabriqués. | Supprimer les deux. |
| M6 : **LATCH** (Location/Alphabet/Time/Category/Hierarchy) | ✅ | **Richard Saul Wurman** (*Information Anxiety*). Correct. | RAS. |
| M6 : Card sorting (open/closed), tree testing | ✅ | Méthodes établies (NN/g). | RAS. |
| M7 : « **5 users = 85 %** des problèmes (Nielsen) » | ✅ | **Nielsen & Landauer 1993**, INTERCHI'93, modèle L≈31 %. Exact, correctement attribué. | RAS. Nuance possible : le vrai message est *"3 rounds de 5 > 1 round de 15"*. |
| M7 : « Usability testing = catch **85 %** avant launch » | ⚠️ | Léger glissement du 85 % (problèmes *découverts par 5 users*) vers "problèmes avant launch". | Préciser que le 85 % = taux de découverte par 5 participants, pas une garantie pré-lancement. |
| M7 : « Iteration = produits **3x more successful** (study 2025) » | ❌ | Étude fantôme. | Supprimer. |
| M7 : SUS score, think-aloud, moderated/unmoderated | ✅ | Canon (Brooke 1996 pour SUS). | RAS. |

---

## 7. MODULE 8 — LXD (le pont avec le parcours Neuro) ⚠️ ZONE CRITIQUE

**Le backbone learning-science est solide et bien attribué. UN mythe débunké s'y est glissé + quelques chiffres illustratifs à nuancer.**

### 🔴 Mythe débunké réintroduit — À RETIRER D'URGENCE

| Claim (verbatim) | Verdict | Source réelle | Correction |
|---|---|---|---|
| **Slide 4** : « Attention span — **2000 : 12 s ; 2024 : 8 s (moins qu'un poisson rouge : 9s)** » + **script vidéo** [0:45-2:30] : « Votre learner a **8 secondes d'attention span — moins qu'un poisson rouge** » | 🔴 | **Mythe intégralement débunké.** Le "8 s / goldfish 9 s" vient de **Statistic Brain**, repris par **Microsoft (2015)**, qui **n'a jamais pu fournir de source** ; **enquête BBC 2017** → aucune base scientifique ; **Microsoft a retiré le rapport**. Les chercheurs de l'attention (Vogel, U. Chicago) : *"remarquablement stable depuis des décennies"*. **Il n'existe aucune preuve d'un "attention span du poisson rouge".** | **Supprimer le chiffre 8 s ET la comparaison poisson rouge**, en M8 slide *et* dans le script vidéo. Le chunking / brain-breaks tiennent **sans** ce chiffre. ⚠️ **C'est exactement le même mythe que Neuro M3 — cohérence de purge indispensable.** |
| **Slide 4 / script** : « **10-15 min** concentration maximale avant fatigue » | ⚠️ | La "règle des 10 minutes" en cours est **faiblement étayée** (revues critiques : pas de preuve solide d'une chute nette à 10-15 min). Moins grave que le goldfish, mais pas un fait dur. | Reformuler en *"varier les formats et segmenter pour soutenir l'attention"* sans chiffrer un seuil universel. |

### ✅ SOLIDE — garder tel quel (la vraie caution scientifique du module)

| Concept | Source | Note |
|---|---|---|
| **Cognitive Load Theory** (intrinsic/extraneous/germane) | Sweller | ✅ Mainstream. |
| **Principe multimédia / dual coding** | Mayer ; Paivio | ✅ Réel (d≈0.7). |
| **Spaced repetition / spacing effect** (J+1/3/7/14/30) | Cepeda et al. 2006 ; Bjork | ✅ Parmi les résultats les plus robustes. |
| **Retrieval practice / testing effect** | Roediger & Karpicke 2006 | ✅ Solide. |
| **Interleaving** | Rohrer & Taylor | ✅ Réel. |
| **Desirable difficulties** | Bjork | ✅ Réel. |
| **ZPD** | Vygotsky | ✅ Canon. |
| **Flow** | Csikszentmihalyi | ✅ Canon. |
| **Self-Determination Theory** (Autonomy/Competence/Relatedness) | Deci & Ryan | ✅ Canon motivation. |
| **Kirkpatrick L1-4** (vue d'ensemble M8.5) | Kirkpatrick | ✅ Standard éval formation. |
| Gamification **mastery vs exploitation** ; audit éthique ; opt-out | — | ✅ Position juste et responsable (aligne la doctrine TLS anti-dark-patterns). |

### ⚠️ VRAI mais sur-simplifié / chiffres illustratifs — à nuancer

| Claim (verbatim) | Verdict | Source réelle | Correction |
|---|---|---|---|
| **Ebbinghaus** : « Day 1 : 100 %, Day 2 : 50 %, Day 7 : 25 %, Day 30 : 10 % » + script « **50 % en 24h, 75 % en 7 j** » | ⚠️ | Phénomène **réel et répliqué** (Murre & Dros 2015) **MAIS** : matériel = **syllabes sans sens**, **n=1**, forte variabilité individuelle. Répétition : ~42 % oublié à 20 min, ~79 % à 31 j. Le contenu *signifiant* décline **bien plus lentement**. | Garder la courbe comme **illustration**, préciser *"syllabes sans sens ; le contenu signifiant se retient mieux ; pourcentages illustratifs"*. |
| **Slide 18** : « Feedback : **Immediate 80 %, Delayed 50 %, No feedback 20 %** retention » | ❌ | **Aucune source** pour ce triptyque trop propre. Le principe (feedback immédiat > différé) est vrai, **les %** sont fabriqués. | Retirer les 3 pourcentages ; garder le principe qualitatif. |
| **Slide 28** : « Habit formation **21-66 days** » | ⚠️ | **66 j = Lally 2010** (médiane, range 18-254). Le **"21 j" est un mythe** (Maltz 1960, chirurgie esthétique). | Corriger en *"~66 j en médiane (Lally 2010), très variable"* ; **supprimer le 21**. |
| **Slide 14** : Growth Mindset (Dweck) | ⚠️ | Concept réel mais **tailles d'effet faibles/contestées** (Sisk et al. 2018). | Ne pas sur-vendre ; garder comme cadrage, pas comme levier à fort effet. |

### Chiffres plateformes (M8 case studies) — vérifiés

| Claim (verbatim) | Verdict | Source réelle | Correction |
|---|---|---|---|
| Duolingo « **500M+ users** » | ✅ | 500M atteints en 2023 ; **575M+ en 2025**. | OK (voire actualiser à 575M+). |
| Duolingo « **34-day median streak** » | ⚠️ | **Non confirmé.** Données publiques : >½ des apprenants quotidiens ont ≥7 j ; 10M+ ont 365 j. Une "médiane 34 j" **tous users** est invraisemblable (churn J1) et non sourcée. | Retirer le "34 j" ou re-sourcer précisément. |
| Khan Academy « **120M+ learners** » | ✅ (sous-estimé) | Réel : **168,7M (SY23-24) → 189,6M (SY24-25)** inscrits. "120M+" est un plancher vrai mais périmé. | Actualiser à ~190M inscrits. |
| Codecademy « **50M+ learners** » | ✅ | 50M confirmé (site officiel). | RAS. |
| Codecademy « completion **15 % vs MOOC 5 %** » | ⚠️ | **MOOC ~5-12 % confirmé** (méta-analyses). Le **15 % propre à Codecademy n'est pas public/vérifié**. | Garder "MOOC ~5-15 %" (sourcé) ; marquer le 15 % Codecademy "non vérifié". |
| Duolingo critiqué pour guilt-tripping / sad owl | ✅ | Caractérisation culturelle exacte. | RAS. |

---

## 8. MODULES 9-11 — Learning Modules · PM Fundamentals · Roadmap/Metrics

> **M9** semi-rédigé ; **M10-M11 = simples listes "Key Topics"** (non rédigés). Frameworks cités = tous canon.

| Claim (verbatim) | Verdict | Source réelle | Correction |
|---|---|---|---|
| M9 : « *People don't buy products, they hire them to do a job* — Clayton Christensen » | ✅ | Citation authentique (JTBD). | RAS. |
| M9 : **Bloom's Taxonomy** (Remember→Create) | ✅ | Bloom 1956, révisée Anderson & Krathwohl 2001. Correct. | RAS. |
| M9 : Objectifs **SMART** | ✅ | Canon (Doran 1981). | RAS. |
| M9 : 5 personas fictifs (Marie 28, Thomas 35…) | ✅ (fiction assumée) | Personas illustratifs, non présentés comme data réelle. | OK — ne pas les citer en "résultats d'interviews réelles". |
| M10 : **RICE** = (Reach × Impact × Confidence) / Effort | ✅ | **Intercom** (Sean McBride). Le QCM de la vue d'ensemble donne la bonne définition. | RAS. |
| M10 : MoSCoW · Kano · Value/Effort · DAU/MAU · LTV/CAC | ✅ | Tous frameworks PM standards. | RAS. |
| M10 : Contraintes EdTech (calendrier acad., FERPA/GDPR, validité pédago) | ✅ | Juste et spécifique. | RAS (FERPA = US, GDPR = EU : correct). |
| M11 : **AARRR** (Acquisition/Activation/Retention/Referral/Revenue) | ✅ | **Dave McClure** (500 Startups). Correct. | RAS. |
| M11 : **North Star Metric** ; **OKR** (Objective + 3-5 KR) | ✅ | Canon (Amplitude/Sean Ellis ; Doerr/Grove pour OKR). | RAS. |
| M11 : **Power/Interest matrix** stakeholders | ✅ | Mendelow / Eden & Ackermann. Correct. | RAS. |

---

## 9. MODULE 12 — Projet Final CPO TLS ⚠️ DEUX BRIEFS DIVERGENTS

**Le parcours contient DEUX briefs TLS incompatibles.** Il faut **garder le réel** et supprimer le fabriqué.

| Élément | Brief "Vue d'ensemble" | Brief "Détail M8-12" | Réalité TLS (à garder) |
|---|---|---|---|
| Parcours live | **2** (Neuro-Éducation, Organisation Apprenante) | **12 parcours** | ✅ **2 parcours** (+ app en dev) → **Vue d'ensemble = correct** |
| Utilisateurs | 200 clients B2B → objectif 1 000 | **15 000 apprenants** | Aucun des deux vérifié ; 15 000 = fabriqué |
| ARR | non chiffré | **€1,2M → €3M** | Fabriqué |
| Équipe | non chiffrée | **12 personnes** (2 designers, 4 devs, 2 instructeurs, 1 sales, 1 mkg, CEO…) | 🔴 **Faux** : équipe réelle = **Mimault + Dennery** (règle projet). |
| Rétention | — | **40 % abandon après Module 2** | Fabriqué (metric inventée) |

| Claim (verbatim) | Verdict | Correction |
|---|---|---|
| Brief détail M12 (15 000 users / €1,2M ARR / 12 parcours / équipe 12) | 🔴 | **Supprimer** ce brief. Contredit la réalité TLS et les règles d'intégrité (équipe = 2 fondateurs). |
| Script vidéo : le CEO s'adresse à « **Pierre** » (CPO) | ⚠️ | Pierre-Armand Dennery est un vrai cofondateur — mais les chiffres autour sont fictifs. | Garder le brief "Vue d'ensemble" (2 parcours réels) comme base canonique. |
| Exemple vision : « **80 % completion (vs industry 15 %)** … salaires **€120-180K** » | 🔴 | Répète les surpromesses (completion inventée + salaire optimiste + framing CPO). | Relabelliser "exemple illustratif", retirer les chiffres présentés comme cibles atteintes. |
| RICE appliqué (Mobile app = 6,67, etc.) | ✅ | Calculs RICE cohérents et bien menés. | RAS — bon exercice pédagogique. |

---

## 10. Complétude — ce qui est promis mais NON écrit  `[À COMPLÉTER]`

Le parcours se vend "12 modules · 780 min · ~120 pages prêtes à l'emploi". **État réel du contenu rédigé :**

| Bloc | État réel |
|---|---|
| M1, M2 | ✅ Rédigés (50 slides + script + exercices chacun) |
| M3, M4 | ✅ Rédigés (M4 partiellement condensé sur la fin) |
| M5, M6, M7 | ⚠️ **Plans à puces** (objectifs + "Key Topics" + thèmes vidéo) — **non rédigés** |
| M8 | ✅ Rédigé (70 slides + script) — mais voir §7 (mythe 8 s) |
| M9 | ⚠️ Semi-rédigé (slides 1-25 ok, reste condensé) |
| M10, M11 | ❌ **Simples listes "Key Topics"** — non rédigés |
| M12 | ✅ Brief rédigé (mais §9 : brief à corriger) |
| **Landing pages (Homepage/Parcours/About)** | ❌ `[À COMPLÉTER]` — promis, "à créer" |
| **12 emails (nurture/onboarding/upsell)** | ❌ `[À COMPLÉTER]` — promis, non écrit |
| **Sales Deck B2B (15 slides)** | ❌ `[À COMPLÉTER]` |
| **8 Case Studies / témoignages** | ❌ `[À COMPLÉTER]` — ⚠️ risque : "profils réalistes" ne doit pas devenir faux témoignages nommés |
| **Figma DS Process (audit 87 composants + timeline 3 sem.)** | ❌ `[À COMPLÉTER]` |
| **20+ templates Figma, vidéos pédagogiques** | ❌ `[À COMPLÉTER]` |

> ⚠️ Ne pas commercialiser "parcours complet 12 modules" tant que M5-6-7-9-10-11 ne sont pas rédigés.

---

## 11. Synthèse actionnable

### 🔴 À RETIRER en priorité (danger crédibilité / honnêteté)
1. **Mythe attention 8 s + poisson rouge** (M8 Slide 4 + script vidéo) — *le point le plus important, pont avec Neuro*.
2. **Toutes les preuves de résultats fabriquées** : "étude post-certification", +€12K salaire, 40 % changent de rôle, 68 % appliquent, ROI/payback, "80 % completion vs 15 %".
3. **Brief M12 "détail"** (15 000 users, €1,2M ARR, 12 parcours, équipe 12) — contredit la réalité TLS.
4. **Feedback retention 80/50/20 %** (M8), **-32 % NN/g** (chapeau), **+32 % Apple / +48 % / +300 % Figma / 60 % / €18K** (M3-M4), **40 % abandon / +120 % tickets** (M6) — stats inventées.

### ❌ À CORRIGER (erreurs factuelles calculables)
5. **Contrastes WCAG** : `#55A1B4` = **2.94:1 (fail)**, pas 4.6:1 ; orange = 2.64:1 ; jaune = 1.86:1. Utiliser **`#3D7786` (5.02:1)** pour un vrai AA. *(Erreur grave dans un module qui enseigne l'accessibilité.)*
6. **Marché EdTech** : "$404B horizon 2025 (HolonIQ)", pas "€404B 2026".
7. **Habit 21-66 j** → 66 j (Lally 2010), retirer le 21.
8. **Miller 7±2** → ~4 chunks (Cowan 2001).
9. **Hick's Law** : retirer les secondes fabriquées.

### ⚠️ À NUANCER / re-sourcer
10. "94 % premières impressions" → recherche ~2004-2014, pas "2026".
11. UX ROI "$1→$100" → Forrester, chiffre ancien à manier avec prudence.
12. Ebbinghaus % → illustratifs (syllabes sans sens, n=1).
13. Salaire CPO €120-180K → haut de fourchette senior FR ; l'EdTech paie moins ; **un parcours ne fait pas un CPO**.
14. Duolingo "34 j median streak" (retirer) ; Khan "120M" → ~190M ; Codecademy 15 % → non vérifié.
15. "10 % vestibular" → fourchette 5-35 % ; "16 % déficience visuelle" → reformuler (handicap ≠ vision ≠ daltonisme).
16. "87 composants Storybook" → showcase `Components.tsx`, recompter.

### ✅ À GARDER (vraie force du parcours)
Nielsen 5-users/85 % · Sweller CLT · Mayer/Paivio dual coding · Bjork desirable difficulties · spacing + retrieval practice · Vygotsky ZPD · Csikszentmihalyi Flow · Deci & Ryan SDT · Kirkpatrick · Christensen JTBD · Bloom · Wurman LATCH · Brad Frost Atomic Design · Saffer TRF · Intercom RICE · McClure AARRR · North Star/OKR · Krug · Lupton · Reichenstein 95 % typographie · position éthique anti-dark-patterns.

### 📋 À SOURCER avant mise en prod
- Tous les avant/après chiffrés (session +140 %, completion 12→71 %, adoption +49 pts…) = **scénarios illustratifs**, jamais "preuves" → relabelliser explicitement.
- Contrastes des concurrents (Coursera 4.9:1…) → re-mesurer ou retirer les décimales.

---

*© The Learning Society — Fact-check certifié établi le 2026-07-10. Vérifications de première main : ratios WCAG recalculés algorithmiquement ; chiffres marché/attributions vérifiés par WebSearch (HolonIQ, BBC/Statistic Brain, Forrester, Lally 2010, Nielsen & Landauer 1993, Payscale/Glassdoor FR, Duolingo/Khan/Codecademy). Canon design/PM confirmé depuis sources primaires connues.*
