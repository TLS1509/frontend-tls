# 🛠️ Parcours TLS — Corrections & Améliorations détaillées (module par module)

**Créé** : 2026-07-10 · **Complète** : [CORPUS-FORMATIONS-FACT-CHECK.md](CORPUS-FORMATIONS-FACT-CHECK.md)
**Objet** : fact-check + amélioration de **tous les supports et projets** des 3 parcours + doctrine. Dossier de travail : chaque entrée = quoi corriger / comment améliorer. Prêt à appliquer (édition Drive/Notion) ou à transformer en data app.

> **Garde-fou** : ce doc **corrige et améliore l'existant, n'invente rien**. Les vrais trous de contenu sont marqués `[À COMPLÉTER — source : manuel IP fiable]`, jamais comblés par fabrication.

---

## A. Corrections transversales (à appliquer PARTOUT, une fois pour toutes)

Ces éléments reviennent dans plusieurs modules/parcours. Règle de remplacement globale :

| ❌ Retirer | ✅ Remplacer par | Où ça apparaît |
|---|---|---|
| « Attention span 8,25 s / 8 s » | « L'attention soutenue dépend de la tâche et de la charge cognitive ; découper en segments de 10-15 min et alterner (brain breaks) » — **sans chiffre-mythe** | Neuro M3, UX/UI M8 |
| VARK / styles d'apprentissage (50/25/15/10 %) comme principe | « Modèle populaire mais scientifiquement **non validé** (Pashler 2008). Ce qui marche : **multimodalité** (dual coding) pour tous, pas un "style" par personne » | Neuro M7, IP M5, UX/UI |
| « Cerveau triunique » (reptilien/limbique/néocortex) | Retirer ; parler de **plasticité** + réseaux fonctionnels (attention exécutive, mémoire) | Doc racine « Sciences » |
| Théorie polyvagale (Porges) présentée comme acquise | Nuancer « théorie contestée » ou retirer ; garder le principe **sécurité psychologique** (Edmondson, lui solide) | Neuro M5, doc Sciences |
| Marqueurs de citation bidons `[464]`, `[513]`… | Vraie référence ou rien | IP (piste EDRACT) |
| ROI 717 % / 1748 % / +300 % / 8-54× en « résultat » | « **projection illustrative** » OU chiffre réel du manuel (128-140 %, France Stratégie, SNCF) | Neuro, IP, UX/UI résumés |
| Études AVANT/APRÈS (entreprises anonymes, +300-900 %) | « **scénario illustratif** » (jamais "preuve") | Tous parcours |
| Miller 7±2 comme la référence | « ~4 chunks (Cowan 2001) ; Miller 7±2 = version historique » | IP, Neuro |
| « Dual coding +35 % », « rétention 80 %→70 % » | Formuler sans faux précis : « améliore significativement (Mayer) » / « le contenu signifiant décline plus lentement que les syllabes d'Ebbinghaus » | Neuro |
| Growth mindset survendu | « levier réel mais effet modéré/contesté (Sisk et al. 2018) » | Neuro M5, UX/UI M8 |

**Nomenclature à figer** : choisir UN nom de framework par module et l'utiliser partout (le M1 Neuro oscille « ANNE » vs « Framework Neurosciences Éducatives »). Dater tous les docs de façon cohérente (Jan vs Fév 2026).

---

## A-bis. Nuances additionnelles (vérification complète 2026-07-10)

Trouvées en vérifiant les modules précédemment marqués « OK » (au niveau concept/attribution) :
- **Neuro M4** — le feedback immédiat n'est pas toujours optimal : le *delay-retention effect* (Kulhavy & Anderson) montre qu'un feedback légèrement différé peut mieux ancrer. Formuler « feedback rapide » comme reco, pas comme loi.
- **Neuro M5** — Yerkes-Dodson (courbe en U inversé) est **sur-simplifié** en pop-science ; nuancer.
- **Neuro M8** — si le module cite Walker *(Why We Sleep)*, plusieurs de ses chiffres sont **critiqués** ; re-sourcer.
- **Neuro M9** — le *far transfer* est **notoirement difficile** ; ne pas le survendre.
- **IP M3** — le **cycle** de Kolb est valable ; ses **« styles d'apprentissage »** dérivés sont contestés (même famille que VARK) → ne pas les enseigner comme fait.
- **UX/UI M2** — Miller 7±2 → préférer Cowan (~4 chunks).

> Registres certifiés verbatim (chaque claim + source) : `FACTCHECK-CERTIFIED-NEURO.md` · `FACTCHECK-CERTIFIED-IP.md` · `FACTCHECK-CERTIFIED-UXUI.md` (générés 2026-07-10).

---

## B. Parcours NEURO-ÉDUCATION (10 modules) — le pilote

**Statut** : cœur (10 modules + quiz diagnostique 30 Q) rédigé et publication-ready. Corrections surtout transversales + finition ressources.

| Module | Fact-check spécifique | Amélioration |
|---|---|---|
| **M1 Fondements** | Fixer le nom du framework (voir §A). Neuromythes débunkés (VAK, 10 %, gauche/droit) = **excellent, garder** (c'est un atout). | Ajouter « triune brain » à la liste des mythes débunkés (cohérence avec §A). |
| **M2 Mémoire** | Ebbinghaus : nuancer le « 80 % » (§A). Spacing/testing = solides, garder. | Le plus dense — candidat idéal pour **1re leçon seedée dans l'app** (spacing = méta-démo). |
| **M3 Attention** | **Retirer le « 8,25 s »** (§A). Dopamine/motivation intrinsèque (Deci & Ryan) = OK. | Reformuler le hook sans le chiffre-mythe. |
| **M4 Feedback** | Formatif/sommatif (Black & Wiliam), testing effect, feedback <1 min = solides. | Boucle 🟢🟡🔴 = réutilisable comme pattern UI dans l'app (corrections coaching). |
| **M5 Émotions** | Amygdale/cortisol/Yerkes-Dodson/ZPD/Dweck/Edmondson : OK ; **nuancer polyvagal + growth mindset** (§A). | — |
| **M6 Neurodiversité** | UDL (CAST 3 principes) = solide et **directement applicable à l'app** (accessibilité). | Relier à l'a11y réelle de l'app (WCAG AA, min-h-touch). |
| **M7 Multimodalité** | **Purger VARK** (§A) ; garder charge cognitive (Sweller) + dual coding (Paivio/Mayer) sans le « +35 % ». | C'est le module qui doit porter le message anti-VARK. |
| **M8 Sommeil** | Consolidation REM/non-REM : OK (science établie). | — |
| **M9 Transfert** | Near/far transfer, Gick & Holyoak : OK. | Le module qui justifie « Appliquer sur chantier réel » (transfert = ta boucle EDRACT). |
| **M10 Synthèse** | Rappel des 9 frameworks + audit 50 critères : OK. | Fusionner avec le capstone unifié (voir §F). |

**Ressources (à produire, pas fabriquer)** :
- **207 flashcards annoncées, ~6 écrites** → `[À PRODUIRE]` depuis les concepts des modules (le contenu source existe).
- **Quiz longs (10-15 Q/module) référencés non rédigés** → `[À PRODUIRE]`. Le **quiz diagnostique 30 Q est, lui, complet** → utilisable tel quel.
- **Guide formateur minuté seulement M1** → `[À COMPLÉTER]` M2-M10.
- **Cas AVANT/APRÈS = fictifs** → relabelliser « scénario » (§A).

**Projet Neuro M10** : « redesign d'une formation existante » → **rediriger sur une vraie formation TLS** (ex. l'onboarding de l'app), pas un cas abstrait.

---

## C. Parcours INGÉNIERIE PÉDAGOGIQUE (10 modules) — le plus à corriger

**Statut** : structure EDRACT excellente MAIS **piste avec le plus d'erreurs factuelles**. Le **manuel PDF/GDocs est la source fiable** pour re-sourcer.

| Module | Fact-check spécifique | Amélioration |
|---|---|---|
| **M1 Fondements** | 5 rôles IP, RACI, 5 Pourquoi, « Test du lundi » : solides et concrets. | Excellent module d'entrée — garder. |
| **M2 ADDIE & SAM** | Correct (Allen/SAM réel). Approche hybride ADDIE+SAM = bonne pédagogie. | Ajouter la nuance « ADDIE critiqué comme trop linéaire » (déjà implicite). |
| **M3 Théories** | Bloom/Piaget/Vygotsky/Kolb : canon solide. **Miller→Cowan si mentionné** (§A). | — |
| **M4 Objectifs SMART + Bloom** | 🔴 **SUPPRIMER la banque de 120 verbes hallucinée** (*Katalogue, Panseraliser*…). Remplacer par la **vraie taxonomie de verbes Bloom** (Anderson & Krathwohl : *se rappeler/comprendre/appliquer/analyser/évaluer/créer* + verbes réels par niveau). | Le « Triangle d'Or » (Objectifs↔Contenus↔Éval = alignement constructif, Biggs) est bon — le nommer « alignement constructif ». |
| **M5 Contenus multimodaux** | 🔴 **Purger VARK 50/25/15/10 %** (§A). Content repurposing 1→5 = bon. Prix outils 2026 (Synthesia…) = périssables, à dater. | Module le plus riche ; garder la matrice Bloom→format. |
| **M6 Kirkpatrick** | ⚠️ **INACHEVÉ** : Engagement + Partie 1 (4 niveaux + Phillips) OK, mais **Parties 2-4 = stubs `[Contenu détaillé…]`**. → `[À COMPLÉTER depuis manuel IP + doc "Cours Approfondie" qui traite Kirkpatrick/Phillips/Learning Analytics en entier]`. **Ne pas inventer.** | Corriger les ROI incohérents (113× M6 vs 24 % M9 vs 62× — harmoniser la méthode de calcul : inclure ou non le coût-temps participant, mais **une seule convention**). |
| **M7 Adaptive Learning** | Branching, IRT, collaborative filtering, dropout alerts : OK (concepts réels). | Relier au **cahier 02 Passeport / adaptive** de l'app. |
| **M8 IA en formation 2026** | 5 cas d'usage + prompt engineering + éthique (RGPD/PII) : solide et à jour. **Contradiction à lever** : ce module admet que « styles d'apprentissage = discrédités » alors que M5 enseigne VARK → **aligner sur l'anti-VARK**. | Relier au blueprint LLMs-Application (archi RAG) + cahiers 12/12bis. |
| **M9 ROI & Business Case** | Formule Phillips OK. Slide deck CFO = bon livrable. **Harmoniser les ROI avec M6** (§ci-dessus). | Réutiliser pour l'argumentaire **SBO** (mais chiffres réels only). |
| **M10 Capstone** | Rubrique 20 critères/100 (seuil 75) : solide. | Fusionner avec le capstone unifié (§F). |

**Doc « MODULES-5-10-STRUCTURE » (`1ixb`)** = scaffold périmé → **archiver** (remplacé par les fichiers modules dédiés).

**Fact-check prioritaire IP** : M4 (verbes), M5 (VARK), M6 (compléter + ROI), citations bidons partout. **~1 journée** en s'appuyant sur le PDF fiable.

---

## D. Parcours UX/UI DESIGN & PM EDTECH (12 modules) — corriger + unifier le projet

**Statut** : peu d'erreurs factuelles (c'est le mieux sourcé). Enjeu = **complétude** (M4-7, M10-11 au niveau structure) + **unification du projet final**.

| Module | Fact-check / complétude | Amélioration |
|---|---|---|
| **M1 Web Design** | Détaillé, OK. Tokens/typo/Gestalt = solides. | Aligner sur le vrai DS TLS (déjà le cas). |
| **M2 Principes UI (4C)** | Détaillé, OK. Miller si cité → Cowan (§A). | — |
| **M3 Interaction Design** | Le plus détaillé (CSS complet). `prefers-reduced-motion` = bon réflexe a11y. | Réutilisable comme **specs de micro-interactions** pour l'app. |
| **M4 Design Systems** | Case study « 87 composants TLS » = réelle. Détaillé slides 1-10 puis condensé → `[À COMPLÉTER slides 11+]`. | — |
| **M5 User Research** | Structure + quiz OK, pas d'expansion slides → `[À COMPLÉTER]`. | — |
| **M6 IA & User Flows** | Idem structure → `[À COMPLÉTER]`. | — |
| **M7 Prototyping & Testing** | Règle « 5 users/85 % » (Nielsen) OK. Structure → `[À COMPLÉTER]`. | — |
| **M8 LXD** | **Le pont neurosciences↔design** — dense et sourcé (Bjork desirable difficulties, CLT, SDT, Kirkpatrick). ⚠️ Vérifier qu'il ne réintroduit pas le « 8s » (§A). | **Consolider avec le parcours Neuro** (voir §F) : M8 = la version "design" du même socle. Éviter la redite. |
| **M9 Designing Modules** | JTBD, Bloom, rubrics, algo adaptatif (Elo) : OK. | Relier à la vraie création de contenu de l'app. |
| **M10 PM Fundamentals EdTech** | Contraintes EdTech (calendrier, buyer≠user, FERPA/GDPR) : justes. Structure → `[À COMPLÉTER]`. | — |
| **M11 Roadmap/Metrics/Stakeholders** | North Star, OKR, AARRR, RICE : canon PM. Structure → `[À COMPLÉTER]`. | — |
| **M12 Projet final CPO** | 🔴 **2 briefs divergents** : garder le **RÉEL TLS** (200→1000 clients B2B, app en dev), **supprimer le fictif** (15 000 apprenants, €3M ARR). Salaire €120-180K → adoucir (§A). | Voir capstone unifié §F — c'est TON exercice stratégique réel. |

**Doublon Guide-Complet** (`1nwzMC` = copie byte-identique de `1GzpyvGF`) → supprimer la copie. **Sections marketing** (landing, 12 emails, sales deck) **promises mais non écrites** → `[À PRODUIRE]` (ou renvoyer au vrai travail marketing TLS déjà en cours).

---

## E. Doctrine & Site — ce qui est publiable

| Doc | Publiable sur site/SBO ? | Condition |
|---|---|---|
| Ebook maître 1,3 Mo + livres blancs | ✅ Oui, comme **lead magnets** | Après passe fact-check (§A) — retirer mythes/stats fabriquées |
| Synthèse Pédago/Neuro/Techno (méta-analyse PRISMA, SNCF, France Stratégie) | ✅ Oui, **preuves réelles** | Citer les vraies sources |
| « Le Cerveau et la Machine », « L'Apprenance » | ✅ Contenu **magazine/veille** de l'app | — |
| Learning-SaaS / LLMs-Application / Pédagogie-Appliquée | ⚠️ **Interne** (blueprint produit) | Pas pour le site — c'est l'archi de l'app |
| « System Prompt Master » (usine à modules EDRACT) | ⚠️ **Interne** (SOP production) | Outil, pas contenu |

**Règle site (rappel honnêteté TLS)** : une stat = une source réelle citable, ou elle ne sort pas. Jamais : « 8s attention », VARK, ROI non sourcés, cas fictifs en preuve.

---

## F. Consolidation & Capstone unifié (l'amélioration structurelle)

**Problème** : 3 parcours = **32 modules avec recouvrements** (Design systems ×2, gamification/CLT ×3, Kirkpatrick ×4, Bloom ×4, LXD Neuro↔UX-UI M8). Pour un usage **solo + dogfooding**, c'est trop et redondant.

**Track perso unifié (proposé)** :
1. **Socle — Science de l'apprentissage** (Neuro-Édu + théories IP) → le *pourquoi*
2. **Craft — UX/UI + Design Systems** (UX/UI M1-7 + bootcamp local) → le *build*
3. **Pont — LXD** (UX/UI M8-9, dédupliqué avec Neuro) → science ↔ craft
4. **Pilotage — PM EdTech + process IP** (UX/UI M10-12 + ADDIE/Kirkpatrick/ROI) → le *lead*
5. **Capstone = TLS** (réel)

**Capstone unifié** (fusion des 3 : Neuro M10 + IP M10 + UX/UI M12) — UN seul projet réel :
> **« Concevoir, construire et piloter un flow TLS de bout en bout »** — prendre un flow réel (ex. onboarding → 1re leçon → coaching), (a) le concevoir avec la science (LXD, Kirkpatrick), (b) le designer (DS TLS), (c) le builder (React), (d) le piloter (North Star, roadmap RICE, ROI réel). Ton livrable = ton produit ; ton évaluation = les vrais KPIs de l'app.

Ça collapse tes 3 objectifs (former + appliquer + dogfooder) en **une seule boucle EDRACT réelle**.

---

## G. Ordre d'exécution recommandé

1. **Corrections transversales §A** sur les 3 parcours (retrait mythes + stats fabriquées) — ~1 j, gros gain crédibilité.
2. **IP** : M4 (verbes), M5 (VARK), M6 (compléter depuis manuel), harmoniser ROI.
3. **Neuro-Édu** : finition légère + **seed pilote dans l'app** (le plus prêt).
4. **UX/UI** : unifier M12 sur le réel, marquer les `[À COMPLÉTER]`.
5. **Consolidation §F** : fusionner en track perso + capstone unifié.
6. **Site** : passe fact-check sur les livres blancs avant lead magnets.

---

*Ce dossier est un guide de correction, pas un contenu rewritté. La transformation en contenu app (data-driven) est l'étape suivante — voir [CORPUS-FORMATIONS-FACT-CHECK.md](CORPUS-FORMATIONS-FACT-CHECK.md) §2.3.*
