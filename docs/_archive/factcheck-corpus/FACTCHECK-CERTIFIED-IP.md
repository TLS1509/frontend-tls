# 🔬 Fact-check CERTIFIÉ — Parcours « Ingénierie Pédagogique » (EDRACT)

**Créé** : 2026-07-10 · **Statut** : ✅ Vérification de première main (10 modules EDRACT + manuel de référence lus intégralement ; claims publiables vérifiés par WebSearch)
**Périmètre** : les 10 modules de la piste EDRACT du parcours IP, croisés avec le **manuel « Cours Complet IP »** (source de vérité interne) et des sources externes.
**Complément de** : `CORPUS-FORMATIONS-FACT-CHECK.md` (§1, vue d'ensemble des 3 parcours). Ce document-ci est la version **profonde, module-par-module, verbatim** du seul parcours IP — celui qui concentre le plus de problèmes factuels.

**Fichiers audités (Drive, lecture seule)** :
M1 `1PU96z…FMt4` · M2 `1YBtxs…yzPE` · M3 `121lxo…NNoY` · M4 `1EeiOD…ExKM` · M5 `1d9UvY…Gnq4` · M6 `1Rxvvu…dHKtQ` · M7 `12wEGf…zHe9A` · M8 `1peV81…PR4k` · M9 `1CnnqX…LIlg` · M10 `1zRyPU…SM3Fc` · Manuel `1TJ4Im…l6aP8`

**Légende des verdicts**
| | Signification |
|---|---|
| ✅ | Exact / canon confirmé |
| ⚠️ | Imprécis, sur-simplifié, ou vrai mais **non sourcé** → à sourcer/nuancer |
| ❌ | Faux, ou **attribution incorrecte** |
| 🔴 | **Fabriqué / halluciné / mythe débunké** — danger crédibilité (le plus sévère) |

---

## 0. SYNTHÈSE EN TÊTE

**Verdict global** — L'**ossature IP est solide** (ADDIE, SAM, Bloom révisé, Kirkpatrick, Phillips, ZPD, Kolb, CLT = canon confirmé). Mais le parcours est **impubliable en l'état** : il est truffé de (a) **chiffres fabriqués présentés comme des faits**, (b) **une hallucination lexicale majeure** (M4), (c) **une contradiction interne bloquante** sur les styles d'apprentissage (M5/M7/M10 vs M8), (d) **des ROI fantaisistes et mutuellement incohérents**, (e) **de fausses balises de citation** `[464]`/`[513]`…, et (f) **M6 inachevé** (3 sections = stubs). Le correctif n'est pas une réécriture du fond mais un **assainissement chirurgical** : purger les inventions, sourcer les chiffres, résoudre la contradiction, finir M6 depuis le manuel.

**Top findings (par sévérité)**
1. 🔴 **M4 — « Banque 120 verbes » = hallucination pure.** La liste de verbes Bloom (niveaux Analyser/Créer) contient des **mots inventés ou aberrants** : *Katalogue, Kindred, Kingpin, Panseraliser, Miserier, Défaisur, Ouiller, Otariidé (= famille des otaries !), Otalgie (= mal d'oreille), Otage (= hostage), Décollet, Ostracisme…* Un LLM a bourré une liste alphabétique de mots français aléatoires. **À supprimer entièrement** et remplacer par une vraie liste de verbes d'action Bloom.
2. 🔴 **Contradiction interne bloquante sur les « styles d'apprentissage ».** M5 enseigne VARK avec des **pourcentages de population inventés** (Visual 50 % / Auditory 25 % / Reading 15 % / Kinesthetic 10 %) comme principe de design, M7 en fait une dimension de profilage, M10 l'inscrit **dans la grille de notation du capstone** (critère #2) — mais **M8 (Partie 3, risque #5) déclare noir sur blanc que les « 5 learning styles » sont de la *« discredited science »*.** Le parcours se contredit lui-même. Les styles d'apprentissage sont **débunkés** (Pashler et al. 2008 ; « meshing hypothesis » sans preuve empirique).
3. 🔴 **M5 — « le cerveau traite le visuel 60 000× plus vite que le texte ».** **Mythe débunké** (origine : slides marketing 3M / Philip Cooper, années 1990, aucune base scientifique). La recherche réelle situe l'écart entre ~6× et ~600×, résultats mixtes. À supprimer.
4. 🔴 **ROI fantaisistes et incohérents** (113× / 62× / 49× / 8,2× / 54,6× / 269 %…), avec des **paybacks de « 8-9 jours »** pour des formations de 2-3 jours. Le manuel de référence donne des ROI **réalistes (~128 %)**. Pire : **M9 se contredit dans le même module** (voir finding #7).
5. ❌ **M2 — citation fabriquée** : *« John Swink, Lean Product Management »*. **Aucun auteur/livre de ce nom.** (Il existe *Lean Product Management* de Mangalam Nandakumar, *The Lean Product Playbook* de Dan Olsen, et *Morgan* Swink en supply chain — rien qui corresponde.) Attribution inventée.
6. ❌ **M2 — référence bibliographique fausse** : *« Crum, C. (2023). Project Management for Instructional Designers. Routledge »*. Le vrai livre de ce titre est un **manuel ouvert de David Wiley et al.** (PM4ID, ~2011, licence CC) — pas « Crum 2023 Routledge ».
7. 🔴 **M9 applique sa propre méthodologie ROI de façon incohérente.** L'exemple « Leadership » **compte le temps-participant** comme coût (192 K$) → ROI **honnête de 0,24× an 1** ; l'exemple « Sales » du même module **ignore ce coût** → ROI **fantaisiste de 49×**. Deux poids, deux mesures, dans le même fichier.
8. 🔴 **Fausses balises de citation** `[464] [467] [473] [476] [495] [507] [510] [513] [514] [515] [516] [517] [518] [520] [521] [524] [527] [433]` (M4, M5, M6) — reliquats d'un outil type Perplexity, **ne pointent vers aucune bibliographie**. À supprimer.
9. ⚠️ **Tous les « Cas Réels » sont des fictions.** Chaque module ouvre sur une « Situation Réelle » / « Cas Réel » (Sarah la DRH, la banque cybersécurité, EntrepriseX, la fintech…) avec des chiffres précis (« -45 % incidents », « transfert 78 % », « complétion 98 % »). Ce sont des **hypothétiques illustratifs présentés comme du réel** — problème d'intégrité transversal (rappel : règles d'honnêteté TLS, pas de client nommé).
10. 🔴 **M6 est un brouillon.** Parties 2, 3, 4 = placeholders `[Contenu détaillé …]`. **À compléter depuis le manuel — ne PAS combler par fabrication.**

**Nouveaux problèmes détectés (au-delà des points déjà connus)**
- **M2** : ADDIE « créé par l'armée américaine (1970s) » → imprécis. Créé **par la Florida State University *pour* l'US Army (1975)**, devenu l'IPISD ; le sigle « ADDIE » n'a émergé qu'au milieu des années 80.
- **M6** : « corrélation 0.2 satisfaction ↔ impact business » → **directionnellement correct** mais non sourcé (= Alliger et al. 1997 ; en réalité réactions affectives ↔ apprentissage ≈ 0,02-0,08, réactions d'utilité ↔ transfert ≈ 0,18 ; « 0,2 » est le haut de la fourchette).
- **M9** : « +1 % engagement = 3 K$/employé », attribué à « Gallup research » → chiffre **non standard**, précision fabriquée.
- **M9/M10** : « benchmark ROI formation 20-50x (Kirkpatrick) » → **faux** : Kirkpatrick ne fournit pas de benchmark ROI (c'est Phillips), et « 20-50× » n'est pas un benchmark établi. Confusion **% vs ×** partout (Phillips = %, les modules disent « × »).
- **M8** : prix API « ChatGPT $0.002/1K tokens » = tarif GPT-3.5 de 2023, périmé ; « Google PaLM » déprécié (→ Gemini) ; Knewton/Smart Sparrow = plateformes en fin de vie (rachats Wiley/Pearson).
- **M5/M8** : **Synthesia « $150-300/mois » est faux pour 2026** (offres réelles : gratuit / Starter 29 $ / **Creator 89 $** / Enterprise sur devis).
- **M9** : mélange **revenu brut** et **marge** comme « bénéfice » selon les exemples (le manuel applique correctement une marge de 40 %). Surestime le ROI quand il compte le CA au lieu du profit.
- **M3** : citation **Benjamin Franklin** *« Tell me and I forget… »* = **misattribution** (origine réelle : Xunzi/Xun Kuang ; attribué à tort à Franklin depuis les années 1980).

**Effort estimé** : ~1 à 1,5 j de correction chirurgicale (purge + sourcing + finir M6). Le fond n'est pas à refaire.

---

## 1. À RETIRER (fabriqué / débunké / faux) — priorité P0

| # | Élément | Module | Nature |
|---|---|---|---|
| 1 | « Banque 120 verbes » (Katalogue, Panseraliser, Otariidé, Otalgie, Otage, Miserier, Défaisur, Ouiller, Kindred, Kingpin…) | M4 | 🔴 Hallucination lexicale |
| 2 | « cerveau traite le visuel **60 000×** plus vite que le texte » | M5 | 🔴 Mythe débunké |
| 3 | VARK **50/25/15/10 %** comme principe de design | M5, M7, M10 | 🔴 Styles d'apprentissage débunkés |
| 4 | Balises `[464] [467] [473] [476] [495] [507] [510] [513]…[527] [433]` | M4, M5, M6 | 🔴 Fausses citations |
| 5 | Attribution *« John Swink, Lean Product Management »* | M2 | ❌ Auteur/livre inexistant |
| 6 | Réf. *« Crum, C. (2023). Project Management for Instructional Designers. Routledge »* | M2 | ❌ Réf. fausse (→ Wiley et al., open textbook) |
| 7 | Attribution Franklin *« Tell me and I forget… »* | M3 | ❌ Misattribution (→ Xunzi) |
| 8 | ROI **113× / 62× / 49,3× / 50,8× / 54,6× / 109× / 8,2× / 42× / 12×**, paybacks « 8-9 jours » | M5, M6, M8, M9, M10 | 🔴 Chiffres fabriqués et incohérents |
| 9 | « benchmark ROI formation 20-50x (Kirkpatrick) » | M9, M10 | ❌ Benchmark inexistant + mauvaise attribution |
| 10 | Prix « Synthesia $150-300/mois » | M5, M8 | ⚠️ Faux 2026 (→ ~89 $ Creator) |
| 11 | Prix « ChatGPT API $0.002/1K tokens », « Google PaLM » | M8 | ⚠️ Périmé |
| 12 | « 85 % vidéos regardées sans son » | M5 | ⚠️ Stat contextuelle (Facebook) présentée comme générale |
| 13 | « +1 % engagement = 3 K$/employé » (Gallup) | M9 | ⚠️ Précision fabriquée |
| 14 | « 15 CEU hours » / « Continuing Education Credits » | M10 | ⚠️ TLS non accrédité (cf. règles honnêteté : Qualiopi JAMAIS) |

---

## 2. À SOURCER (vrai/plausible mais non référencé) — priorité P1

| Claim | Module | Source réelle à citer |
|---|---|---|
| « 70 % des formations ne génèrent pas de transfert » | M1 | Littérature « transfer problem » (Georgenson 1982 souvent cité, mais chiffre lui-même contesté) — à sourcer ou adoucir |
| « 42 % des apprenants abandonnent » ; « 8 % des managers observent un changement » | M1 | Non sourcés → sourcer ou retirer |
| « 60 % formations ont objectifs vagues » | M4 | Non sourcé (balise `[495]` bidon) |
| « Rétention +70 % avec multimodal » | M5 | À rattacher à Mayer (principe multimédia, d≈0.7) **sans** le chiffre « 70 % » (proche du « cône de Dale » débunké) |
| « corrélation 0.2 satisfaction ↔ performance » | M6 | **Alliger et al. (1997)**, *Personnel Psychology* — réactions affectives ↔ apprentissage ≈ 0,02-0,08 ; utilité ↔ transfert ≈ 0,18 |
| « 73 % formations mesurent seulement la satisfaction » | M6 | Enquêtes ATD/Kirkpatrick Partners existent → sourcer précisément |
| « 85 % des formations échouent au Niveau 3 » | M6 | Dramatisation → sourcer ou nuancer |
| « 72 % IPs utilisent l'IA (vs 15 % 2023) » ; « 83 % ne savent pas calculer le ROI » | M8, M9 | Non sourcés |
| Prix outils (HeyGen, Storyline, Captivate, Canva, ElevenLabs…) | M5, M8 | Volatils → dater (« au T1 2026 ») + vérifier avant chaque mise en prod |

---

## 3. À COMPLÉTER (inachevé) — ne PAS combler par fabrication

| Élément | Module | Action |
|---|---|---|
| **Partie 2** — « Concevoir Évaluations Par Niveau » = `[Contenu détaillé…]` | M6 | **[À COMPLÉTER depuis le manuel]** (§6.1 Kirkpatrick 4 niveaux + outils) |
| **Partie 3** — « Mesurer Niveau 3 (Transfer) » = `[Contenu détaillé…]` | M6 | **[À COMPLÉTER depuis le manuel]** (obstacles au transfert, 360°, obs. terrain) |
| **Partie 4** — « Calculer ROI + Rapporter » = `[Contenu détaillé…]` | M6 | **[À COMPLÉTER depuis le manuel]** (§6.2 formule ROI, §6.3 KPI 2026) |

---

## 4. CONTRADICTIONS INTERNES

| Contradiction | Où | Résolution |
|---|---|---|
| **Styles d'apprentissage : valides vs débunkés** | M5 (VARK principe), M7 (profilage), M10 (rubrique capstone) **⇔** M8 P3-#5 (« discredited science ») | Trancher **côté science** : retirer VARK comme principe de design ; le garder uniquement en « mythe à déconstruire » (cohérent avec M8). Retirer le critère VARK du capstone. |
| **ROI : convention % vs ×** | Manuel = 128,6 % ; M6/M8/M9 = « 113× / 49× / 8,1× » ; M9 = « 24,1 % = 0,24× » | Choisir **une** convention Phillips (% net/coût) et l'appliquer partout. « 113× » = 11 300 %, invraisemblable. |
| **ROI : coût temps-participant compté ou non** | M9 exemple Leadership (compté → 0,24×) vs M9 exemple Sales (non compté → 49×) | Toujours inclure le coût d'opportunité du temps ; recalculer tous les cas. |
| **Bénéfice = CA vs marge** | Manuel applique marge 40 % ; M6/M9 comptent parfois le CA brut | Toujours passer par la marge/contribution, jamais le revenu brut. |
| **Numérotation des modules** entre pistes | Piste EDRACT : M7 = Adaptive, M8 = IA ⇔ Manuel : M7 = IA, M8 = Adaptive | Non bloquant, mais harmoniser la table des matières pour éviter la confusion. |

---

## 5. FACT-CHECK MODULE PAR MODULE

### MODULE 1 — Fondements de l'IP

| Claim | Verdict | Source | Correction |
|---|---|---|---|
| Déf. IP = « architecture scientifique de l'apprentissage » ; 5 rôles ; RACI ; grille « former ou pas » ; 5 Pourquoi | ✅ | Canon IP / Toyota (5 Why) | RAS — pédagogiquement sain. |
| « 70 % des formations ne génèrent pas de transfert » | ⚠️ | Non sourcé | Écho du « transfer problem » mais chiffre à sourcer/adoucir. |
| « 42 % des apprenants abandonnent avant la fin » | ⚠️ | Non sourcé | Précision non étayée → sourcer ou retirer. |
| « Seuls 8 % des managers observent un changement comportemental » | ⚠️ | Non sourcé | Idem. |
| Cas « Sarah DRH pharma 2024 » (budget -20K€, ventes +18 %) | ⚠️ | Fiction | Relabelliser « scénario illustratif », retirer le « (entreprise pharmaceutique française, 2024) ». |
| Citation **Peter Senge** — « Les gens ne résistent pas au changement, ils résistent à être changés » | ✅ (défendable) | Largement attribuée à Senge (*The Fifth Discipline*) | Attribution communément admise ; c'est une paraphrase (pas un verbatim sourcé page-près) → OK, éventuellement « attribué à ». |
| Réfs : LinkedIn Learning L&D Report 2023 ; CNFPT Baromètre 2024 ; Kirkpatrick Partners 2022 | ✅/⚠️ | LinkedIn & CNFPT publient bien ces rapports | Vérifier que les stats du module en proviennent réellement (rien ne les y relie explicitement). |

### MODULE 2 — ADDIE & SAM

| Claim | Verdict | Source | Correction |
|---|---|---|---|
| Les 5 phases ADDIE, avantages/limites, hybride ADDIE-SAM | ✅ | Canon | RAS. |
| « ADDIE créé par l'armée américaine (1970s) » | ⚠️ | FSU pour l'US Army, **1975** (→ IPISD) ; sigle « ADDIE » popularisé milieu 80s | Corriger : « développé par la **Florida State University pour l'US Army (1975)** ». |
| « SAM créé par Allen Interactions (2012) » | ✅ | Michael Allen, *Leaving ADDIE for SAM*, ASTD, 2012 | RAS. |
| « ADDIE = 70 % des projets / SAM = 30 % » | ⚠️ | Non sourcé | Part de marché inventée → retirer ou sourcer. |
| « SAM = 50 % plus rapide qu'ADDIE » (manuel) / cycles | ⚠️ | Non sourcé | Ordre de grandeur plausible, mais à présenter comme estimation. |
| Cas « banque française 2023, cybersécu, -32 % incidents » | ⚠️ | Fiction | Relabelliser « scénario illustratif ». |
| Citation *« The best method is the one the team will use consistently » — **John Swink, Lean Product Management** * | ❌ | **Auteur/livre inexistant** (vérifié) | **Supprimer** l'attribution. Il existe *Lean Product Management* (Nandakumar) et *The Lean Product Playbook* (Olsen), pas « John Swink ». |
| Réf. « Allen, M. W. (2012). Leaving ADDIE for SAM. ASTD » | ✅ | Correct | RAS. |
| Réf. « Kirkpatrick, D. L. (1994). Evaluating Training Programs. Berrett-Koehler » | ✅ | Correct | RAS. |
| Réf. « **Crum, C. (2023). Project Management for Instructional Designers. Routledge** » | ❌ | Le vrai livre = **David Wiley et al.**, open textbook (PM4ID, ~2011, CC) | Corriger l'auteur/année/éditeur, ou retirer. |

### MODULE 3 — Théories pédagogiques

| Claim | Verdict | Source | Correction |
|---|---|---|---|
| Bloom révisé (Anderson & Krathwohl 2001), 6 niveaux | ✅ | Canon | RAS. |
| Constructivisme Piaget (1896-1980), assimilation/accommodation | ✅ | Dates correctes | RAS. |
| Vygotsky (1896-1934), ZPD | ✅ | Dates correctes | « russe » → né dans l'Empire russe (Orsha, auj. Biélorussie) ; « soviétique » plus précis. Mineur. |
| **Scaffolding** présenté comme concept de Vygotsky | ⚠️ | Terme forgé par **Wood, Bruner & Ross (1976)**, associé (pas identique) à la ZPD | Nuance : préciser l'origine Bruner. |
| Cycle de Kolb (1984), 4 étapes | ✅ | Canon | Le **cycle** est standard. NB : le *Learning Style Inventory* dérivé de Kolb est psychométriquement contesté — ne pas confondre (ici c'est bien le cycle). |
| Cas « manufacturier FR 2024 » : 23 % → 78 % transfert, -45 % incidents, complétion 72 %→98 % | ⚠️ | Fiction | Relabelliser « scénario illustratif ». |
| Citation **Benjamin Franklin** — « Tell me and I forget, teach me and I remember, involve me and I learn » | ❌ | **Misattribution** — origine Xunzi (Xun Kuang, IIIe s. av. J.-C.) ; attribuée à Franklin depuis ~1980 (le module admet « paraphrase » mais crédite Franklin) | Retirer « Benjamin Franklin » ou reformuler « proverbe d'origine confucéenne (souvent attribué à tort à Franklin) ». |
| Réfs Bloom 1956, Anderson & Krathwohl 2001, Piaget 1954, Vygotsky 1978, Kolb 1984 | ✅ | Toutes réelles | RAS — bloc bibliographique le plus propre du parcours. |

### MODULE 4 — Objectifs SMART + Bloom

| Claim | Verdict | Source | Correction |
|---|---|---|---|
| Framework SMART (5 critères) + Triangle d'Or (Objectif↔Contenu↔Éval) + Test 3 Questions | ✅ | Canon (alignement constructif, Biggs) | Pédagogiquement excellent. |
| « 60 % formations ont objectifs vagues `[495]` » | ⚠️/🔴 | Non sourcé + balise bidon | Retirer la balise, sourcer ou retirer le chiffre. |
| **« Banque 120 verbes »** — niveaux Analyser/Créer | 🔴 | **Hallucination** | *Katalogue, Kindred, Kingpin, Panseraliser, Panser, Miserier, Irradier, Intolérer, Ouiller, Lorgnette, Décollet, Otariidé, Otalgie, Otage, Défaisur, Défaissable, Ostracisme…* = mots inventés/aberrants (une otarie, un mal d'oreille, un otage classés en « verbes Bloom »). **Supprimer toute la banque**, remplacer par une vraie liste (ex. Analyser : différencier, organiser, attribuer, comparer, déconstruire, structurer ; Créer : générer, planifier, produire, concevoir, assembler). |
| Distributions Bloom recommandées (débutant 20/60/20…) | ⚠️ | Heuristique raisonnable, non sourcée | Présenter comme recommandation, pas comme donnée. |
| « Nommer 3 styles VARK » comme objectif-exemple | 🔴 | Renforce VARK | Remplacer l'exemple (VARK = à déconstruire, cf. M8). |
| Exemples SMART Excel (SOMME/MOYENNE/SI) + résultats « +20 % budget, -40 % erreurs » | ⚠️ | Fiction | Relabelliser. |

### MODULE 5 — Contenus multimodaux

| Claim | Verdict | Source | Correction |
|---|---|---|---|
| Multimodalité, matrice Bloom→format, repurposing 1→N, 7 formats | ✅ | Sain (principe multimédia de Mayer) | Le squelette est bon. |
| **VARK (Fleming) 50/25/15/10 %** comme design | 🔴 | **Débunké** (Pashler et al. 2008 ; meshing hypothesis sans preuve) ; VARK n'attribue **aucun** % de population | Retirer comme principe. Ironie : citer **Mayer** (qui **réfute** les learning styles) à côté de VARK est incohérent. |
| **« cortex visuel = 50 % du cerveau, traite l'info ×60 000 plus vite que le texte »** | 🔴 | **Mythe** (origine 3M/Cooper, années 90) ; réel ≈ 6×-600×, mixte | Supprimer le « 60 000× » et le « 50 % du cerveau ». |
| « Rétention +70 % multimodal `[464][467]` » | ⚠️/🔴 | Non sourcé, proche du « cône de Dale » (débunké) + balises bidon | Remplacer par « améliore la rétention (Mayer, effet multimédia) » sans chiffre. |
| « Fleming, N. D. (2001). VARK… **Updated 2026** » | ⚠️/❌ | Le livre VARK 2001 existe ; **« Updated 2026 » est inventé** | Retirer la mention 2026. |
| « Mayer, R. E. (2021). Multimedia Learning (3rd ed.). Cambridge » | ✅ | Réel (3e éd. 2020/2021) | RAS. |
| « 85 % des vidéos regardées sans son `[513]` » | ⚠️ | Stat Facebook contextuelle, souvent mal généralisée | Nuancer/retirer la balise. |
| Prix **Synthesia « 2h script → 30 min vidéo », « $150-300/mois »** | ⚠️ | **Faux 2026** : gratuit / Starter 29 $ / **Creator 89 $** / Enterprise devis | Corriger le prix + dater. La promesse « 2,5 h vs 2-3 j » = marketing, à modérer. |
| Prix Storyline « $1398 licence », Captivate « $33/mois », Canva « $15/mois », H5P « gratuit » | ⚠️ | Volatils ; Storyline = désormais Articulate 360 (abo) ; H5P gratuit ✅ | Dater « au T1 2026 » et re-vérifier avant prod. |
| Cas « fintech FR 250 employés » : complétion 62→91 %, rétention 18→67 % (+372 %), ROI 8,2× | ⚠️/🔴 | Fiction + ROI fabriqué | Relabelliser + retirer le ROI chiffré. |
| Balises `[514][515][516][517][518][520][521][524][527]` | 🔴 | Fausses citations | Supprimer. |

### MODULE 6 — Framework Kirkpatrick *(inachevé)*

| Claim | Verdict | Source | Correction |
|---|---|---|---|
| Kirkpatrick 4 niveaux (Reaction/Learning/Transfer/Results), « créé 1959 » | ✅ | Correct (D. Kirkpatrick, série d'articles 1959-60) | RAS. Éventuellement mentionner le « New World Kirkpatrick Model » (2016). |
| Formule ROI **Phillips (1997)** = (Bénéfices − Coûts)/Coûts | ✅ | Correct (J. Phillips, *ROI in Training…*, 1997) | La **formule** est juste ; ce sont les **inputs** qui sont fabriqués. |
| « corrélation 0.2 satisfaction ↔ impact business » | ⚠️ | **Alliger et al. (1997)** : affectif↔apprentissage ≈ 0,02-0,08 ; utilité↔transfert ≈ 0,18 | Direction correcte, **citer Alliger 1997** ; « 0,2 » = haut de fourchette. |
| « 73 % formations mesurent seulement N1 `[433][507]` » | ⚠️/🔴 | Plausible (ATD) mais balises bidon | Sourcer, retirer balises. |
| « 85 % des formations échouent au N3 » | ⚠️ | Dramatisation non sourcée | Nuancer. |
| Cas « tech FR 800 emp. » : ROI **113×**, payback **2,1 mois**, turnover -22 % (800 K€), +2,4 M€ | 🔴 | Fiction + ROI absurde | Relabelliser ; « 113× » invraisemblable ; compte le CA (2,4 M€) pas la marge. |
| Exercice : ventes +30 K€/commercial × 30 + 50 K€ turnover / 15 K€ = **62×** | 🔴 | Erreur méthodo : **CA brut** compté comme bénéfice (devrait être la marge) | Recalculer sur la marge (cf. manuel = 40 %). |
| **Parties 2, 3, 4 = `[Contenu détaillé…]`** | 🔴 | **Stubs** | **[À COMPLÉTER depuis le manuel]** — ne pas fabriquer. |

### MODULE 7 — Adaptive Learning

| Claim | Verdict | Source | Correction |
|---|---|---|---|
| Branching logic, learner profiling, IRT, collaborative filtering (« comme Netflix ») | ✅ | Concepts réels (IRT = Item Response Theory) | RAS techniquement. |
| Dimension de profil « **Learning Style** (Visual/Auditory/Reading/Kinesthetic) » | 🔴 | VARK débunké (cf. M8) | Retirer/​remplacer par « niveau + objectif + contexte » (le reste du profilage est valide). |
| « 75 % formations = one-size-fits-all » | ⚠️ | Non sourcé | Sourcer ou retirer. |
| Cas « Data Literacy » : engagement 60→88 %, temps -44 %, ROI « Negative → 2,8× » | ⚠️/🔴 | Fiction + ROI fabriqué | Relabelliser. |
| Outils « Knewton, Smart Sparrow » | ⚠️ | **Datés** (Knewton absorbé par Wiley ~2019 ; Smart Sparrow racheté par Pearson 2020) | Actualiser (ex. Didask, domoscio, plateformes LXP actuelles). |
| Manuel (§8.3) : « Données de **95 % d'entreprises** », adaptive « ROI +200 %, durée -40 %… » | 🔴 | Chiffres non sourcés/fabriqués | Même dans le manuel : à sourcer ou retirer. Tools manuel « Knack, **Datalify** » → *Datalify* non identifié ; *Knack* = base no-code, pas de l'adaptive. |

### MODULE 8 — IA dans la formation

| Claim | Verdict | Source | Correction |
|---|---|---|---|
| 5 cas d'usage IA, prompt engineering, human-in-the-loop, quality gates | ✅ | Sain | Bon module sur le fond. |
| ✅ **« 5 learning styles = discredited science »** (P3, risque #5) | ✅ | **Correct** (Pashler 2008) | **C'est le module qui a raison** — mais il **contredit** M5/M7/M10. Aligner tout le parcours sur cette position. |
| « 72 % IPs utilisent l'IA (vs 15 % 2023) », « 40 % temps économisé », « 85 % n'optimisent pas » | ⚠️ | Non sourcés | Sourcer ou retirer. |
| « 87 % essay grading matches human » | ⚠️ | Non sourcé | Sourcer/retirer. |
| Prix : ChatGPT $20/mo ✅, Claude $20/mo ✅, HeyGen $89/mo ✅, **Synthesia $150/mo** ❌, **API $0.002/1K** ❌, **Google PaLM** ❌ | ⚠️ | Synthesia ≈ 89 $ ; $0.002/1K = tarif GPT-3.5 2023 ; PaLM déprécié (→ Gemini) | Actualiser tous les prix/produits, dater. |
| ROI IA : 8,1× / 54,6× / 109×, payback 1,5 mois | 🔴 | Fabriqué | Relabelliser « projection illustrative ». |
| Exemple d'hallucination « ADDIE = Agile-Driven… » | ✅ | Bon exemple pédagogique | RAS. |
| Outils bias : Google What-If, IBM AI Fairness 360 | ✅ | Réels | RAS. |

### MODULE 9 — ROI & Business Case

| Claim | Verdict | Source | Correction |
|---|---|---|---|
| Framework Phillips, KPI business, deck exécutif 8 slides, analyse de sensibilité | ✅ | Sain | Structure business correcte. |
| « 83 % IPs ne savent pas calculer le ROI » | ⚠️ | Non sourcé | Sourcer/retirer. |
| Cas Sales : bénéfices 1,258 M$ / 25 K$ = **49,3×**, payback **9 jours** | 🔴 | Fabriqué + **ne compte pas le temps-participant** | Incohérent avec l'exemple Leadership (qui, lui, le compte). Recalculer. |
| Exemple Leadership détaillé : ROI **24,1 % = 0,24× (an 1)**, 3 ans = **269 % = 2,7×** | ✅ (méthodo) / ⚠️ (chiffres) | **Le seul calcul honnête du parcours** (compte les 192 K$ de temps-participant) | **Le garder comme modèle** — il prouve que les 49×/113× ailleurs sont faux. |
| « benchmark ROI formation **20-50x (Kirkpatrick)** » | ❌ | Kirkpatrick ≠ ROI (c'est Phillips) ; « 20-50× » inexistant | Retirer/corriger. |
| « +1 % engagement = 3 K$/employé (Gallup) » | ⚠️ | Gallup a des recherches engagement-productivité, mais **pas ce chiffre** | Sourcer précisément ou retirer. |
| Exercice cyber : (313 K$ − 40 K$)/40 K$ = **6,8×** | ⚠️ | Arithmétique OK, mais notation « 682,5 % = 6,8× » | Harmoniser la convention (% vs ×). |

### MODULE 10 — Capstone / Certification

| Claim | Verdict | Source | Correction |
|---|---|---|---|
| Brief capstone, 5 livrables, rubrique 20 critères, alignement Modules 1-9 | ✅ | Bonne synthèse project-based | Structure solide. |
| Rubrique **critère #2 : « personas, VARK, levels »** | 🔴 | VARK débunké | Retirer « VARK » du critère (garder personas + niveaux). |
| Exemplars : ROI **42×/35×**, **49× (payback 9 j)**, **12×** | 🔴 | Fabriqués | Retirer les ROI chiffrés ou relabelliser. |
| « benchmark ROI 20-50 % » (template) vs « 20-50x » ailleurs | ❌ | Incohérence % vs × | Harmoniser. |
| « **15 CEU hours** / Continuing Education Credits » | ⚠️ | **TLS non accrédité** (cf. règles honnêteté : Qualiopi JAMAIS, pas d'organisme certificateur) | Retirer la promesse CEU, ou la conditionner honnêtement. « Hall of Fame / Job Board » = marketing, à assumer comme tel. |

---

## 6. CE QUI EST SOLIDE (la vraie caution scientifique — à garder tel quel)

| Concept | Modules | Note |
|---|---|---|
| **ADDIE** (5 phases) | M1, M2 | Canon (préciser origine FSU/US Army 1975). |
| **SAM** (Allen 2012) | M2 | Attribution correcte. |
| **Bloom révisé** (Anderson & Krathwohl 2001) | M3, M4 | Canon. |
| **Constructivisme** (Piaget) / **socioconstructivisme** (Vygotsky, ZPD) | M3 | Canon (créditer Bruner pour « scaffolding »). |
| **Cycle de Kolb** (1984) | M3 | Le cycle est standard (≠ son inventaire de styles, contesté). |
| **SMART + alignement constructif** (Triangle d'Or) | M4 | Excellent. |
| **Charge cognitive** (Sweller) / **principe multimédia** (Mayer) | M3, M5 | Mainstream (sans le « 60 000× »). |
| **Kirkpatrick** (1959, 4 niveaux) + **Phillips** (1997, formule ROI) | M6, M9 | Canon (formules justes ; ce sont les *inputs* qui sont fabriqués). |
| **IRT, collaborative filtering, branching** | M7 | Concepts réels. |
| **Human-in-the-loop, prompt engineering, garde-fous IA** | M8 | Sain — et M8 débunke correctement les learning styles. |
| **Manuel « Cours Complet IP »** | réf. | Académiquement fiable : ROI honnêtes (128,6 %), vraies citations, cas réels (SNCF, Domino's, France Stratégie). **= source de vérité pour re-sourcer les 10 modules.** |

> ⚠️ NB manuel : même le manuel contient 1-2 chiffres à sourcer (« adaptive : ROI +200 %, données de 95 % d'entreprises » §8.3 ; « simulation +45 % rétention » ; outils « Knack/Datalify »). Il reste néanmoins **nettement plus fiable** que la piste EDRACT.

---

## 7. PLAN DE CORRECTION (ordre recommandé)

1. **P0 — purge** : supprimer la banque 120 verbes (M4), le « 60 000× » (M5), toutes les balises `[n]`, l'attribution Swink (M2), la réf. Crum (M2), la misattribution Franklin (M3). *(~2 h)*
2. **P0 — contradiction VARK** : retirer VARK comme principe (M5), du profilage (M7) et de la rubrique (M10) ; aligner sur M8. *(~1 h)*
3. **P0 — finir M6** depuis le manuel (Parties 2-3-4). *(~2-3 h)*
4. **P1 — ROI** : réécrire tous les cas ROI sur la méthodo honnête de M9-Leadership (marge, temps-participant compté, convention % unique), ou les relabelliser « projection illustrative ». *(~2 h)*
5. **P1 — sourcing** : Alliger 1997, FSU/Army pour ADDIE, prix outils datés T1 2026, ou retirer les stats non sourçables. *(~2 h)*
6. **P2 — intégrité** : relabelliser tous les « Cas Réels » en « scénarios illustratifs » ; retirer « 15 CEU » (M10). *(~1 h)*

**Total ≈ 1 à 1,5 j.** Fond conservé, crédibilité restaurée.

---

*Sources externes vérifiées le 2026-07-10 (WebSearch) : mythe « 60 000× » (photutorial, policyviz, Maestro Group, Learnlets) ; learning styles/Pashler et al. 2008 (APS, structural-learning, NCBI PMC7033468) ; citation Franklin/Xunzi (Quote Investigator, Snopes, Franklin Institute) ; « John Swink » (aucun résultat probant) ; PM4ID = Wiley et al. (Open Textbook Library, pm4id.org) ; Senge (attribution communément admise) ; ADDIE/FSU-US Army 1975 (Wikipedia, Devlin Peck, nwlink) ; Alliger et al. 1997 (Personnel Psychology / Wiley) ; Synthesia pricing 2026 (synthesia.io/pricing, Arcade, Fluxnote).*
