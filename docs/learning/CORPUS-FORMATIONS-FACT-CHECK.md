# 🔬 Corpus Formations CMT — Fact-check & Application (Learning App + Site)

**Créé** : 2026-07-10 · **Source** : Google Drive `Formations/CMT` (dossier `1DTCJtE-JM99KNqE1IPMKsa1PEzDoEmZY`)
**Périmètre** : audit scientifique des 3 parcours + doctrine, et plan d'application concret à la Learning App et au site marketing.

> **Contexte d'usage** : ces parcours sont destinés à Chloé (fondatrice TLS) en **triple objectif** — (1) se former, (2) appliquer en réel sur les chantiers TLS, (3) dogfooder le parcours apprenant de la plateforme. Ce doc sert de source de vérité pour corriger le contenu AVANT toute mise en prod (app ou site).

---

## 0. Cartographie du corpus

Écosystème de formation quasi complet, 4 couches cohérentes bâties sur **UN standard de production (EDRACT)** + **le design system TLS** (`#55A1B4 / #ED843A / #F8B044`, League Spartan + Nunito).

| Couche | Contenu | Statut réel |
|---|---|---|
| **3 parcours certifiants** | Neuro-Éducation (10 mod · 8h15) · Ingénierie Pédagogique (10 mod) · UX/UI Design & PM EdTech (12 mod · 13h) = **32 modules** | Cœurs rédigés, ressources = specs |
| **Doctrine** (racine) | Ebook maître 1,3 Mo + 2 livres blancs + synthèses neurosciences | Complet — matière marketing/thought-leadership |
| **Blueprint produit** (racine) | Learning-SaaS (5 couches), LLMs-Application (archi RAG/tutoring), Pédagogie-Appliquée | Complet — décrit l'archi de l'app |
| **Usine à modules** | « System Prompt Master » = 5 templates EDRACT | Complet — standard de production |

---

## 1. FACT-CHECK SCIENTIFIQUE

**Verdict global** : l'**ossature learning-science est solide**. Le problème n'est pas le fond mais une poignée de **mythes viraux** + de **chiffres fabriqués** greffés dessus. Correctifs chirurgicaux (~1 j), pas réécriture.

> ⚠️ Fact-check établi à haute confiance depuis le canon (mythes à sources primaires connues). Pour publication marketing → sécuriser avec citations sourcées (WebSearch) avant mise en ligne.

### ✅ SOLIDE — garder tel quel (ta vraie caution scientifique)

| Concept | Note |
|---|---|
| **Spacing effect / répétition espacée** (J+1/7/30) | Parmi les résultats les plus robustes (Cepeda et al. 2006 ; Bjork). Backbone. |
| **Testing / retrieval effect** | Solide (Roediger & Karpicke 2006). |
| **Cognitive Load Theory** (Sweller) | Mainstream. |
| **ADDIE · SAM · Bloom · Gagné · Merrill · ARCS (Keller) · Kirkpatrick · Phillips · ZPD (Vygotsky) · Kolb** | Canon IP établi. |
| **Dual coding** (Paivio) / **principe multimédia** (Mayer) | Réel (mais voir « +35 % » ci-dessous). |
| **Manuel IP de référence** (PDF + 2 GDocs racine) | Académiquement fiable : vraies citations, ROI honnêtes (128-140 %), cas réels (SNCF, France Stratégie). **= source de vérité pour re-sourcer le reste.** |

### ❌ MYTHES DÉBUNKÉS — à RETIRER (risque crédibilité, surtout marketing)

| Claim dans le corpus | Réalité | Correctif |
|---|---|---|
| **« Attention span 8,25 s »** (Neuro M3 ; UX/UI M8) | Mythe (Microsoft/Statistic Brain 2015, aucune base scientifique). Attention = dépendante de la tâche. | Supprimer le chiffre. Chunking/brain-breaks tiennent sans lui. |
| **VARK / styles d'apprentissage** (50/25/15/10 %) | Débunké (Pashler et al. 2008 ; Willingham). **Ton M8 l'admet lui-même → contradiction interne.** | Retirer comme principe de design ; garder seulement en « mythe à déconstruire ». |
| **« Cerveau triunique »** (reptilien/limbique/néocortex) — doc racine Sciences | Modèle de MacLean rejeté par la neuro moderne. | Reformuler ou retirer. |
| **Théorie polyvagale** (Porges) | Contestée, pas un consensus. | Prudence ou retrait. |

### ⚠️ VRAI mais SUR-SIMPLIFIÉ — nuancer

| Claim | Correctif |
|---|---|
| « Dual coding **+35 %** » | Chiffre non standard → « améliore la rétention (Mayer, d≈0.7+) ». |
| « **80 % oublié à J+30** » | Ebbinghaus = syllabes sans sens ; le contenu signifiant décline bien plus lentement. Adoucir. |
| **Miller 7±2** | Révisé à **~4 chunks** (Cowan 2001). Mettre à jour. |
| **Growth mindset** (Dweck) | Concept réel mais tailles d'effet faibles/contestées (Sisk et al. 2018). Ne pas sur-vendre. |
| **Hattie effect sizes** (0.7-1.2) | Utilisable mais méthodologie contestée (moyennes d'effets hétérogènes). Caveat. |

### 🔴 FABRIQUÉ — à SUPPRIMER (danger direct vu les règles d'honnêteté TLS)

| Élément | Problème | Action |
|---|---|---|
| **Banque de 120 verbes M4** (IP) | Hallucination : *Katalogue, Kindred, Panseraliser*… mots inventés | Supprimer, remplacer par la vraie taxonomie de verbes Bloom |
| **Marqueurs de citation** `[464]`, `[513]` (IP) | Fausses sources | Supprimer, sourcer réellement |
| **ROI 717 % / 1748 % / +300 % / 8-54×** | Projections présentées comme résultats | Relabelliser « projection illustrative » OU remplacer par cas réels mesurés (128-140 %) |
| **Études AVANT/APRÈS** (entreprises anonymes, +300-900 %) | Fictions illustratives | Ne JAMAIS présenter en « preuve » — relabelliser « scénario illustratif » |
| **Salaire CPO EdTech €120-180K** (UX/UI) | Optimiste pour marché FR | Adoucir |

### Défauts spécifiques par parcours

- **Neuro-Éducation** : cas AVANT/APRÈS fictifs · framework M1 nommé incohéremment (ANNE vs autre) · ~3 % des 207 flashcards réellement écrites · guide formateur minuté seulement pour M1. **Cœur (10 modules + quiz diagnostique 30 Q) = publication-ready.**
- **Ingénierie Pédagogique (piste EDRACT)** : M4 verbes hallucinés · fausses citations · ROI incohérents (113× vs 24× vs 62×) · VARK enseigné puis contredit · M6 (Kirkpatrick) inachevé (stubs) · prix outils 2026 périssables. **À fact-checker contre le manuel PDF avant prod.**
- **Ingénierie Pédagogique (manuel PDF/GDocs)** : **fiable** — vraies réfs (Merrill, Gagné, Sweller, Carré, Meirieu), ROI honnêtes, cas réels. **Source de vérité.**
- **UX/UI PM EdTech** : projet final M12 = **2 briefs divergents** (réel TLS vs fictif 15 000 apprenants — garder le RÉEL) · M4-7 et M10-11 au niveau « structure », pas slide · sections marketing promises mais non écrites · Guide-Complet en doublon byte-identique. **M1-3, M8-9, M12 = détaillés.**

---

## 2. APPLICATION — LEARNING APP

### 2.1 EDRACT → structure de leçon dans l'app (mapping 1:1)

La méthode EDRACT mappe **directement sur des écrans qui existent déjà** dans l'app :

| Étape EDRACT | Surface app existante |
|---|---|
| **E** — Engagement (hook, cas) | Hero de la leçon / `LessonPlayer` intro |
| **D** — Découvrir (contenu) | Sections `LessonPlayer` |
| **R** — Réfléchir (quiz + journal) | Quiz + `JournalNewEntry` (question introspective) |
| **A** — Appliquer (exercice) | Exercice → **chantier TLS réel** (voir §2.4) |
| **C** — Consolider (synthèse, mantras) | Récap `LessonPlayer` + mantras = type **astuce** |
| **T** — Transférer (bonus) | `ComplementaryContentViewer` · `FlashcardsViewer` · `AstucesViewer` · vidéo |

→ **La méthode est déjà « compatible app » par construction.** Rien à inventer côté UI ; le travail est de **transformer le contenu Drive en data**.

### 2.2 Types de contenu → cards + viewers

Les types EDRACT (leçon / micro-leçon / quiz / vidéo / flashcards / astuces, avec durées 2-55 min) sont **exactement** la taxonomie des cards du `/_card-lab` et des viewers (`AstucesViewer`, `FlashcardsViewer`, `ComplementaryContentViewer`, `VideoViewer`). Le renommage « complémentaire » → *« À compléter dans l'étape » / « Pour aller plus loin »* s'applique tel quel.

### 2.3 ⚠️ Blocage technique : contenu hardcodé vs data-driven

**État actuel** : le contenu des leçons est **hardcodé par ID dans `src/pages/LessonPlayer.tsx`** (cf. bootcamp `bootcamp-lecon-1-1`). **Inscalable à 32 modules.**

**Reco** : passer à un **modèle data-driven** avant de peupler en volume — un schéma de contenu (dans `src/data/` ou format JSON/MDX) où une leçon EDRACT = un objet data, pas un composant. Investissement qui sert **à la fois** ton apprentissage (tu peux ajouter des modules sans toucher au code) **et** la plateforme (vrai CMS interne). C'est le pré-requis pour dogfooder à l'échelle.

### 2.4 Dogfooding — quel parcours seeder en premier

**Neuro-Éducation** : 10 modules finis + quiz diagnostique 30 Q rédigé = le plus prêt. Pilote recommandé :
1. Fact-check + consolidation EDRACT propre (retirer cas fictifs, corriger stats).
2. Câbler comme vrai `learningPath` (remplace un mock dans `learningPaths.ts`).
3. Tu suis le parcours **dans l'app** → tu testes le parcours apprenant réel (progression, Passeport, gamification, journal).

### 2.5 Blueprint docs → cahiers FO (l'archi est déjà spécifiée)

Les docs racine décrivent l'app cahier par cahier :

| Doc Drive | Cahier / feature FO |
|---|---|
| Learning-SaaS « 5 couches » | Structure app (onboarding → contenu → gamification → coaching → analytics) |
| Coaching IA+humain **70/25/5 %** | Cahier 04 Coaching |
| Gamification cognitive (XP/levels/badges compétence/streaks) | Cahier 05 |
| SRS / flashcards espacées | `FlashcardsViewer` |
| Journal réflexif | Cahier 07 |
| Chat coach socratique + RAG + détection misconceptions (cite Claude ★★★★★) | Cahiers 12 / 12bis |
| Mastery / adaptive | Passeport (cahier 02) |

### 2.6 « Appliquer » = tes chantiers TLS réels

L'étape A d'EDRACT, pour toi, = **vrais livrables TLS** : le card-system, la refonte marketing, la page SBO, la spec Passeport. Ton portfolio = ton produit. Les 3 capstones (Neuro M10 · IP M10 · UX/UI M12) **se recouvrent → fusionner en UN seul capstone réel** : concevoir + build + piloter un flow TLS de bout en bout.

---

## 3. APPLICATION — SITE MARKETING / SBO

### 3.1 Ce qui PEUT alimenter le thought-leadership (fact-checké ✅)

- **Backbone science** : spacing, testing effect, cognitive load, Kirkpatrick/Phillips — solides, citables.
- **ROI réels** : 128-140 % (manuel IP), cas SNCF, France Stratégie, méta-analyse PRISMA.
- **Doctrine** : apprenance (Carré), entreprise apprenante, ingénierie des conditions — cohérent avec le positionnement **SBO 3-piliers**.
- **Livres blancs** : lead magnets (après passe fact-check).

### 3.2 🔴 Ce qui NE DOIT JAMAIS être publié (garde-fous honnêteté)

Aligné sur les règles marketing permanentes TLS (pas de claims fabriqués, pas de Qualiopi, etc.) :
- ❌ « Attention span 8 secondes »
- ❌ Styles d'apprentissage / VARK comme fait
- ❌ ROI 717 % / 1748 % / +300 % non sourcés
- ❌ Études de cas fictives (entreprises anonymes) en « preuve »
- ❌ Cerveau triunique

→ **Règle** : sur le site, une stat = une source réelle citable, ou elle ne sort pas.

---

## 4. Plan de correction (checklist chirurgicale)

- [ ] **Supprimer** : banque verbes M4 (IP), marqueurs `[464]`/`[513]`, chiffre « 8 s », VARK-comme-fait, cerveau triunique.
- [ ] **Re-sourcer** tous les chiffres depuis le manuel IP fiable (PDF/GDocs) ou WebSearch.
- [ ] **Relabelliser** ROI/cas AVANT-APRÈS en « projection / scénario illustratif ».
- [ ] **Nuancer** : dual coding %, Ebbinghaus 80 %, Miller→Cowan, growth mindset.
- [ ] **Finir** M6 Kirkpatrick (IP, stubs) depuis le manuel.
- [ ] **Unifier** projet M12 sur le brief RÉEL TLS ; fusionner les 3 capstones en 1.
- [ ] **Consolider** 3 parcours → 1 track perso (dédupe : Design systems ×2, gamification/CLT ×3, Kirkpatrick ×4, Bloom ×4).

---

## 5. Plan de dédoublonnage Drive

> Connecteur Drive en **lecture seule** ici → suppression manuelle. Doublons vérifiés par contenu :

**Doublons exacts — supprimer la copie :**
| Garder | Supprimer (copie confirmée) |
|---|---|
| Résumé Neuro GDoc `1CFkZuI3` | `1lu7Fy0vfZjC5VKkvQZMpgRlo3tBVpaARRMHQ9ensnO0` (GDoc identique) |
| Guide UX/UI `1GzpyvGF` | `1nwzMC1iL3W0EgYvqhv5Z29_RR3TYRVAKLbk8edYqonE` (byte-identique) |
| Pédagogie-Appliquée `1A5Nqt5` | `1rPJP4nudPIwIjVMurGy2tmS7FJy0m_fTK30MSpcyTu8` (copie exacte) |

*(+ optionnel : résumé Neuro `.md` source `101RyOTA` — même contenu.)*

**Chaînes de dérivation — désigner UNE version canonique :**
- Livre blanc : ebook 1,3 Mo (maître) + 1 condensé `.md`. Le docx 187 Ko = intermédiaire redondant.
- Doc produit : `Learning-SaaS` 28 Ko englobe `Pédagogie-Appliquée` 12 Ko.
- Manuel IP : le **PDF** recoupe ~90 % des 2 GDocs (garder PDF = référence, GDocs = éditable).
- Scaffold IP `MODULES-5-10-STRUCTURE` (`1ixb`) = squelette périmé → archiver.

---

## 6. Prochaines étapes

1. **(pilote)** Fact-check + consolidation EDRACT du parcours **Neuro-Éducation** → câblage vraie data dans l'app (dogfooding).
2. **(infra)** Passer le contenu leçon de hardcodé → data-driven (`LessonPlayer` piloté par data).
3. **(site)** Passe fact-check sur les livres blancs avant d'en faire des lead magnets.
4. **(citations)** WebSearch sourcé sur les corrections destinées à la publication marketing.

---

*Références fact-check (canon) : Pashler et al. 2008 (learning styles) · Cepeda et al. 2006 (spacing) · Roediger & Karpicke 2006 (testing effect) · Sweller (CLT) · Cowan 2001 (working memory ~4) · Sisk et al. 2018 (growth mindset méta-analyse) · Willingham (neuromythes). À sourcer précisément avant publication.*
