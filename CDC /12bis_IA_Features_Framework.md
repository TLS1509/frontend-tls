# 12bis — IA Features Framework & Validation

**Version:** MVP Juillet 2026 → V2 Septembre 2026  
**Status:** 🟡 Spécification en cours (Roadmap & Timeline)  
**Owner:** Pierre Armand  
**Last Updated:** 2026-05-12  
**Note:** V3 & V4 features déférées à début 2027 (IA evolution rapide)

---

## 📖 Vue d'Ensemble

### Objectif Métier

Ce cahier documente la **stratégie IA pour MVP/V1/V2** de la plateforme Learning App SBO : 10 features "transparentes" et "button-triggered" réparties sur 3 versions (MVP → V2 Sept 2026), avec validation détaillée via la **6-point methodology** pour chaque feature.

**Scope Temporel :** MVP Juillet 2026 → V2 Septembre 2026  
**V3 & V4 features :** Déférées à début 2027 (évolution rapide IA, re-évaluation nécessaire fin 2026)

L'objectif principal est de :

1. **Augmenter la pertinence pédagogique** : Recommandations IA adaptées au profil + objectifs de chaque apprenant (V1)
2. **Réduire friction & augmenter engagement** : Pathways adaptatifs, détection churn, recommandations contextuelles (V1-V2)
3. **Amplifier valeur organisation** : Intelligence sur skill gaps, churn prediction, project auto-configuration (V2)
4. **Maintenir maîtrise & contrôle** : Pas d'auto-tagging automatique (Pierre valide), feedback loops, validation gates (toutes versions)

### Qui l'Utilise (Rôles)

#### **Côté Utilisateurs (via features IA)**
- **Apprenants** : Reçoivent recommandations (items, missions, resources), pathways adaptatifs, suggestions JIT, sentiment feedback
- **Coachs** : Voir sentiment analysis, churn alerts, recommendations, team supervision
- **Managers Entreprise** : Analytics org-wide, skill gap analysis, churn prediction, ROI metrics
- **Admin Plateforme** : Configurer IA, valider outputs, manage feedback loops, monitor coûts Mistral

#### **Côté Gestion (ce cahier)**
- **Product Manager (Pierre)** : Arbitrer timelines, scoper features, valider approche 6-point, goern roadmap MVP→V4
- **Tech Lead / Architect** : Infrastructure Mistral, context layering, confidence scoring, hallucination detection
- **Dev Team** : Implémentation détaillée, API integrations, prompt engineering, feedback loops
- **Data Team** : Embedding vectors, semantic search, tagging infrastructure, prompt versioning

---

## 🎯 Scope — IN / OUT

### ✅ IN (Ce cahier couvre MVP/V1/V2 seulement)

**Strategic IA Features (10 total — MVP to V2 Sept 2026)**
- **MVP (1)** : Auto-Generated Positionnement Questionnaire
- **V1 (4)** : Recommandations items, Adaptive paths, Newsletter AI, Churn alerts
- **V2 (5)** : Mission matching, Journal recommendations, Skill atrophy, Org intelligence, Project auto-config

**Validation Framework (6-point methodology per feature)**
- WHERE : Moment dans user journey
- WHAT : Processing Mistral exact
- HOW improves UX : Bénéfice utilisateur concret
- HOW fails gracefully : Error handling, fallbacks
- WHY cost-effective : ROI, effort, Mistral token cost
- HOW measure success : Metrics, KPIs, feedback signals

**Infrastructure & Patterns**
- Mistral self-hosted LLM (embedding + generation models)
- Context layering system (progressive data enrichment)
- Confidence scoring & hallucination detection
- Feedback loops (user validation → model improvement)
- Feature toggles & prompt versioning

### ❌ OUT (Exclusions claires)

**V3 & V4 Features (Déférées à début 2027)**
- ❌ AI Coach Matching (V3)
- ❌ Sentiment Analysis on Journal (V3)
- ❌ FAQ Generation from Events (V3)
- ❌ Interactive Event Transcripts (V3)
- ❌ Just-In-Time Learning Suggestions (V4)
- *Re-évaluation complète fin 2026 avant implémentation*

**Conversational Chatbots**
- Cahier #12 (Chatbot IA & Q&R) couvre cela séparément
- Ce cahier = **transparent + button-triggered ONLY**

**Auto-Tagging Automatique**
- ❌ Auto-tagging Veille (supprimée, Pierre garde maîtrise)
- ❌ Auto-tagging Formation (supprimée, Pierre garde maîtrise)
- ✅ BUT: Recommendation de tags (suggère, n'impose pas)

**Features Hors Plateforme**
- ❌ AI-Generated Items (#8) → Fait via tes propres agents + Outil Auteur V4
- ❌ AI Transcription (#10) → Pas de video hosting system

---

## 📋 Section 2 : IA Roadmap & Timeline

### Vue d'Ensemble de la Roadmap

La roadmap IA s'étend sur **9 mois** (Juillet 2026 → Février 2027) avec 10 features réparties en 3 versions :

| Version | Période | Features | Effort Total | Impact |
|---------|---------|----------|--------------|--------|
| **MVP/Juillet** | Juillet 2026 | 1 | Existing | Seed initial learner profiles |
| **V1/Septembre** | Sept 2026 | 4 | 250-350h | Core personalization & matching |
| **V2/Décembre** | Oct-Déc 2026 | 5 | 550-750h | Advanced insights & predictions |
| **TOTAL** | 9 mois | **10** | **~800-1,100h** | MVP → V2 complete |

---

### MVP — Juillet 2026 (1 Feature — Existing)

| # | Feature | Type | Description | Module Dépendant | Effort | Timeline |
|---|---------|------|-------------|-----------------|--------|----------|
| **1** | **Auto-Generated Positionnement Questionnaire** | Transparent | Post-signup system creates adaptive questionnaire (20-30 questions, Dreyfus 1-5 scale) based on learning path competencies. Generates initial Passeport profile. | Onboarding + Passeport #02 | Existing | MVP |

**Status:** ✅ Déjà implémenté, à maintenir

---

### V1 — Septembre 2026 (4 Features — NEW, Button-Triggered + Transparent)

#### Features Détaillées par Priorité

| # | Feature | Type | Button/Trigger | Description | Estimated Effort | Dependencies | Timeline |
|---|---------|------|----------------|-------------|------------------|--------------|----------|
| **2** | **Recommandation IA Items** | Button-Triggered | [Suggest Best Item Type] | Mistral analyzes apprenant's Passeport → recommends optimal item type (Lesson/Masterclass/Exercice/Micro-Learning/etc.) to close competency gap. Shows confidence score + rationale. | 40-60h | Passeport #02, Formation #01 | V1 Week 1-2 |
| **3** | **Adaptive Learning Paths** | Transparent + Button | Auto recommendation | Mistral dynamically recommends Formation sequence based on Passeport profile (current levels, objectives, learning velocity). Considers prerequisites, dependencies, learner pace. Real-time adaptation as learner progresses. | 70-100h | Passeport #02, Formation #01 | V1 Week 3-5 |
| **4** | **Matching IA pour Missions** | Button-Triggered | [Suggest Missions] | Mistral analyzes Passeport competencies + learning objectives → recommends ranked list of Missions Apprenantes. Considers current level, target level, time investment, project context. | 60-80h | Passeport #02, Formation #01, Missions | V1 Week 5-7 |
| **5** | **AI Coach Matching** | Button-Triggered | [Find Best Coach] | Mistral suggests best coach from pool per apprenant's competencies + learning objectives. Considers coach specialization, availability, past match success rates. Ranked recommendations. | 40-60h | Coaching #04, Passeport #02 | V1 Week 8-9 |

#### Résumé V1

- **Total Effort:** 250-350h (8-9 semaines, dev sequential)
- **Key Dependencies:** Passeport + Formation modules MUST be stable before V1 IA features can launch
- **Critical Path:** Recommandation Items (start Week 1) → Adaptive Paths (start Week 3) → Matching Features (Week 5+)
- **Testing Timeline:** Week 9 (1 week integration testing + UAT before Sept launch)

---

### V2 — Décembre 2026 (5 Features — Advanced + Predictive)

#### Features Détaillées par Impact & Complexity

| # | Feature | Type | Button/Trigger | Description | Estimated Effort | Dependencies | Timeline |
|---|---------|------|----------------|-------------|------------------|--------------|----------|
| **6** | **AI-Generated Items (Flashcards/Tips/Summaries)** | Button-Triggered | [Generate Flashcards] | Mistral generates Tips, Flashcards, Summaries from lesson content. Quality-reviewed by content manager before publishing to learners. Enables rapid content multiplication from core lessons. | 60-80h | Items system, Formation #01, Content workflow | V2 Week 1-3 |
| **7** | **IA Recommendations from Journal** | Button-Triggered | [Suggest Resources] | Based on apprenant's journal reflections (challenges, victories, insights), Mistral suggests relevant Formation resources, coaching topics, peer connections. Contextual + personalized. | 60-80h | Journal #07, Formation #01, Coaching #04 | V2 Week 4-6 |
| **8** | **Predictive Churn Alerts** | Transparent (Background) | Auto alert | Mistral detects engagement decline patterns → predicts churn risk per learner. Alerts coach + manager. Suggests intervention content (re-engagement modules, coaching call). Updates weekly. | 100-140h | Analytics #10, Passeport #02, Coaching #04 | V2 Week 7-10 |
| **9** | **Organizational Intelligence & Gap Analysis** | Transparent (Background) | Auto report (on-demand) | Mistral analyzes org-wide Passeport distribution → identifies skill gaps by department/role. Recommends upskilling priorities for next quarters. Feeds into learning strategy. | 120-160h | Passeport #02, Analytics #10, Enterprise #06 | V2 Week 10-13 |
| **10** | **AI-Driven Project Auto-Configuration** (THE MOAT 🎯) | Button-Triggered | [Auto-Build Project] | **ULTIMATE IA FEATURE:** Client describes project → Mistral extracts skill requirements → analyzes team Passeports → recommends task assignments (collaborator + mentor pairing) → auto-generates timeline + JACs + success criteria. Fully structured project ready for execution. | 200-280h | Passeport #02, Projects #11, Formation #01, Coaching #04 | V2 Week 14-20 |

#### Résumé V2

- **Total Effort:** 550-750h (12-15 semaines, can run Item Gen + Journal in parallel with Churn/Org Intel)
- **Critical Path:** Item Generation (start Week 1) → Churn Alerts (Week 7, foundation) → Project Auto-Config (Week 14, builds on all V1+early V2)
- **Testing Timeline:** Week 19-20 (2 weeks UAT before Dec launch)
- **HIGH VALUE:** Features #8, #9, #10 are manager/enterprise-facing. Strong ROI on org intelligence + project automation.

---

### Dépendances Critiques entre Versions

```
MVP (Questionnaire Seed)
    ↓ (Passeport foundation)

V1 (Item Recomm → Adaptive Paths → Missions Matching)
    ↓ (Personalized learning + coaching)

V2 (Churn Alerts + Org Intelligence) — Inputs V1 engagement patterns
V2 (Project Auto-Config) — Builds on V1 Item/Path/Coach matching
```

**BLOCKING DEPENDENCIES:**
- ✅ Passeport #02 MUST be 100% stable before V1 IA (weeks 1-2 July)
- ✅ Formation #01 MUST have complete data model before V1 Adaptive Paths (week 2)
- ⚠️ Journal #07 MUST be integrated by V2 week 4 (blocks feature #7)
- ⚠️ Projects #11 MUST be ready by V2 week 14 (blocks feature #10)

---

### Effort Breakdown & Resource Planning

#### Par Phase & Composant

| Phase | Composant | Effort (h) | Timeline | Rôle |
|-------|-----------|-----------|----------|------|
| **V1 — Recomm Items** | Mistral prompt engineering + API integration | 25-35h | Week 1-2 | Dev + Data |
| | Testing + UAT | 15-25h | Week 2 | QA + Product |
| **V1 — Adaptive Paths** | Context layering system + logic | 40-60h | Week 3-4 | Dev |
| | Real-time adaptation testing | 30-40h | Week 4-5 | QA |
| **V1 — Mission Matching + Coach Matching** | Mistral matching logic (shared infrastructure) | 50-70h | Week 5-7 | Dev + Data |
| | UAT + launch prep | 20-30h | Week 8-9 | QA + Product |
| **V1 TOTAL** | | **250-350h** | **9 weeks** | |
| | | | | |
| **V2 — Item Generation + Journal Recomm** | Content generation + quality gates | 60-80h | Week 1-3 | Dev + Content |
| **V2 — Churn Alerts** | Engagement pattern detection + alerting | 100-140h | Week 7-10 | Dev + Data Science |
| **V2 — Org Intelligence** | Aggregation + reporting dashboards | 120-160h | Week 10-13 | Dev + Data + Analytics |
| **V2 — Project Auto-Config** | COMPLEX: requirement extraction + assignment logic + timeline generation | 200-280h | Week 14-20 | Dev (senior) + Data + Product |
| **V2 TOTAL** | | **550-750h** | **15 weeks** | |
| **GRAND TOTAL** | | **~800-1,100h** | **24 weeks (6 months)** | |

#### Resource Assumption
- **Dev Team:** 2-3 full-time engineers (with ML/NLP experience for Mistral integration)
- **Data Team:** 1 FTE (embeddings, context preparation, feedback loop infrastructure)
- **QA:** 0.5 FTE (testing IA outputs, edge cases, confidence thresholds)
- **Product/PM:** Review prompts, validate recommendations, define success metrics

---

### Timeline Gantt (High-Level)

```
July 2026:
  MVP  |█ (maintain + monitor)

Sept 2026:
  V1   |████████ (weeks 1-9, 4 features parallel where possible)
       - Item Recomm (W1-2) ──→ Deploy early Sept
       - Adaptive Paths (W3-5) ──→ Deploy mid-Sept
       - Mission + Coach Matching (W5-9) ──→ Deploy end-Sept

Oct-Dec 2026:
  V2   |████████████████ (weeks 10-24, staggered deployment)
       - Item Generation (W1-3) + Journal Recomm (W4-6) ──→ Deploy Oct
       - Churn Alerts (W7-10) ──→ Deploy early Nov
       - Org Intelligence (W10-13) ──→ Deploy mid-Nov
       - Project Auto-Config (W14-20) ──→ Deploy late Dec (flagship feature)

Jan-Feb 2027:
  V3/V4 |⏳ DEFERRED (re-evaluate late 2026, re-implement early 2027)
```

---

### Milestones & Gate Reviews

| Milestone | Date | Gate | Owner |
|-----------|------|------|-------|
| **V1 Ready for Dev** | Mid-July 2026 | Mistral infrastructure + API contracts ready | Tech Lead |
| **V1 Feature Complete** | End-Sept 2026 | 4 features launched, <5% error rate | PM + Dev Lead |
| **V2 Item Gen + Journal Ready** | Mid-Oct 2026 | Content quality gates working | Content + Dev |
| **V2 Analytics Features Complete** | Mid-Nov 2026 | Churn + Org Intel dashboards live | Data + Analytics |
| **V2 Project Feature Complete** | End-Dec 2026 | Auto-config fully tested, demo-ready | PM + Senior Dev |
| **V3/V4 Strategy Approved** | Jan 2027 | New IA capabilities evaluated + roadmap refreshed | Pierre + Tech Lead |

---

### Cost Modeling (Mistral Token Estimates)

**Assumptions:**
- Mistral self-hosted (on-premise or cloud instance)
- Embedding model: ~0.1 tokens per feature per user per month
- Text generation: ~2-5 tokens per recommendation/feature per user
- ~5,000 active users at V1 launch, ~10,000 at V2

| Feature | Version | Tokens/User/Month | Active Users | Monthly Cost (est.) | Notes |
|---------|---------|-------------------|--------------|-------------------|-------|
| Recomm Items | V1 | 50 | 5K | ~$10 | Low-frequency button click |
| Adaptive Paths | V1 | 200 | 5K | ~$50 | Runs per learning event (~daily) |
| Mission Matching | V1 | 75 | 5K | ~$15 | On-demand, ~2-3x/week |
| Coach Matching | V1 | 60 | 5K | ~$12 | On-demand, ~1x/month |
| **V1 Total** | | | | **~$87/mo** | |
| | | | | | |
| Item Generation | V2 | 300 | 10K | ~$150 | 1x/week content ops |
| Journal Recomm | V2 | 100 | 10K | ~$50 | Per journal entry (~3x/week per learner) |
| Churn Alerts | V2 | 400 | 10K | ~$200 | Weekly batch scoring |
| Org Intelligence | V2 | 800 | 10K | ~$400 | Weekly aggregation + report gen |
| Project Auto-Config | V2 | 1,200 | 10K | ~$600 | Complex, ~2-3x/week |
| **V2 Total** | | | | **~$1,400/mo** | |
| **COMBINED (V1+V2)** | | | | **~$1,487/mo** | |

**Annual Cost:** ~$18K (Mistral tokens) + Infrastructure (~$5-10K) + Dev maintenance (included in payroll)

---

---

## 🎯 Section 4 : 6-Point Validation Details (Feature-by-Feature)

### **Feature #1 : Auto-Generated Positionnement Questionnaire (MVP)**

**Status:** ✅ Validated by Pierre (2026-05-12)  
**Timeline:** Existing (maintain + monitor)  
**Effort:** Existing implementation (conception done, coding TBD)

---

#### **1️⃣ WHERE — Moment dans le user journey**

**Déclencheur :** Post sign-up immédiatement  
**Page/Screen :** Standalone page intégrée dans un wizard d'onboarding multi-étapes (remplace phase d'onboarding traditionnelle)  
**Utilisateurs :** Tous les apprenants (new users) par défaut, avec possibilité de désactivation manuelle pour certains users  
**Contexte :** Au moment du questionnaire, on ne sait pas encore quel parcours l'apprenant a choisi  

**Désactivation manuelle :**
- Tous les apprenants le voient par défaut
- Possibilité de le désactiver pour certains users (liste manuelle + conditions)
- ⚠️ **BLOCKER:** Scénarios exacts de désactivation + gestion admin interface → **À déterminer Phase 14**

---

#### **2️⃣ WHAT — Processing Mistral exact**

**Flux conversationnel :**
- **Input:** Boutons pré-définis (domaines métier) + réponses apprenant
- **Conversation:** Max 15 tours de discussion (variable selon réponses)
- **Complétude:** Mistral évalue la complétude des données collectées + demande "Avez-vous d'autres commentaires supplémentaires ?" pour déterminer si conversation est terminée
- **Dynamique:** Premiers boutons pré-définis, puis Mistral génère boutons dynamiquement selon réponses

**Output (Passeport généré) :**
- Minimum 7 compétences, Maximum 15 compétences
- Chaque compétence avec niveau Dreyfus 1-5
- Format : `[Compétence] : [Niveau Dreyfus]`
- Exemple : "Python : 3/5", "Leadership : 2/5", "Communication : 4/5"

**Validation :** Mistral demande confirmation si réponses incohérentes avant génération finale

---

#### **3️⃣ HOW improves UX — Bénéfice utilisateur concret**

**Pour l'apprenant :**
- Passeport de compétences rempli immédiatement après onboarding (vs. profil vide avant)
- Expérience d'onboarding améliorée et plus engageante (conversation fluide vs. questionnaire statique basique)
- Prêt à recevoir recommandations pertinentes dès le départ

**Pour le coach/manager :**
- Visualisation d'un Passeport de meilleure qualité pour leurs apprenants
- (Coaches/Managers n'ont pas cette étape eux-mêmes)

**UX/Messaging :** À affiner pour rendre étape acceptable et non perçue comme "trop longue" (voir timeout behavior ci-dessous)

---

#### **4️⃣ HOW fails gracefully — Error handling & fallback**

**Pas de questionnaire basique :** Flux entièrement conversationnel (pas de dégradation à formulaire statique)

**Timeout Mistral (~10 secondes) :**
- Timeout = réponse de Mistral qui prend >10s
- Message d'erreur visible : "La conversation n'a pas pu être complétée. Veuillez recommencer."
- Apprenant : Peut recommencer la conversation (retry)

**Incohérences :** Mistral demande confirmation avant génération si réponses contradictoires

**Comportement après erreur :**
- Apprenant recommence la conversation
- ⚠️ **IMPORTANT:** Passeport OBLIGATOIRE — faut absolument finir cette étape avant d'accéder à la plateforme
- (Pas d'option "skip" ou "continuer sans Passeport")
- Retry limit : À déterminer en dev (suggestion: 2-3 tentatives avant escalade)

---

#### **5️⃣ WHY cost-effective — ROI, effort, Mistral tokens**

**Implémentation :**
- Non implémenté pour le moment
- Parcours d'onboarding conçu, mais aucun code
- Effort total : À évaluer post-conception

**Token cost (Mistral) :**
- Non déterminé précisément pour le moment
- À calculer post-test (nombre de tokens par conversation, variable selon longueur)
- **Strategy:** Cutoff conversation après complétude → Meilleure UX + économies token

**Frequency :**
- Une seule exécution : at sign-up (pas de régénération ultérieure en MVP)
- Possibilité d'intégration à d'autres endroits de plateforme à terme (mais MVP = onboarding only)

**Comparaison :**
- Questionnaire basique pré-créé : Moins coûteux mais évaluation imprécise
- Mistral LLM : Plus coûteux mais service supérieur + Passeport de meilleure qualité
- **Decision:** Mistral pour MVP (valeur > coût)

---

#### **6️⃣ HOW measure success — Métriques & KPIs**

**Métriques principales :**

1. **% Apprenants avec Passeport rempli post-onboarding**
   - Threshold : **>95% = succès**
   - En dessous de 95% = très mauvais (indique problème UX/timeout)

2. **Exactitude du Passeport généré**
   - Validation : Apprenant donne une **note** (voir ci-dessous) + optionnel commentaire
   - **Échelle de notation :** Numérique (ex: 1-5 stars ou 1-10) + textbox pour commentaire optionnel
   - KPI : % apprenants qui valident "C'était juste"
   - Feedback : "Oui c'était juste" + note + commentaires (optionnel pour pas alourdir l'onboarding)

3. **Taux de finition**
   - % apprenants qui complètent la conversation vs. abandonnent

4. **Autres métriques**
   - ⚠️ **BLOCKER:** Additionnelles à déterminer en **Phase 14** (ex: engagement 30j après, récurrence de modification Passeport, etc.)

**Success Criteria :**
- ✅ >95% completion rate
- ✅ >80% "accurate" ratings from learners
- ✅ <10% error/timeout rate
- ⏳ Additional metrics TBD Phase 14

---

### **⚠️ BLOCKERS — Feature #1**

| Blocker | Scope | Phase |
|---------|-------|-------|
| **Scénarios de désactivation manuelle + gestion admin** | Quelles conditions exactes pour désactiver ? Admin interface pour gérer users exemptés ? | Phase 14 |
| **Success metrics additionnelles** | Au-delà de complétude/exactitude/finition, quoi d'autre mesurer ? | Phase 14 |

---

**Ready for Feature #2 validation ✅**

---

### **Feature #2 : Recommandation IA Items (V1)**

**Status:** ✅ Validated by Pierre (2026-05-12)  
**Timeline:** V1 Week 1-2 (early September deployment)  
**Type:** Button-Triggered ([Suggest Best Item Type])  
**Effort:** 40-60h  

---

#### **1️⃣ WHERE — Moment dans le user journey**

**Button placement :**
- Dashboard apprenant
- Profil de l'apprenant
- Passeport compétences
- ⚠️ **BLOCKER:** Valider qu'on a rien oublié comme endroits (confirmation de tous les emplacements)

**Utilisateurs (V1) :**
- Apprenant lui-même
- Manager de l'entreprise
- ⏳ Coach (V3, déféré)

**Workflow :**
1. User clique [Suggest Best Item Type]
2. Modal de choix s'ouvre (voir WHAT ci-dessous)
3. User sélectionne options + clique "Lancer recommandation"
4. Mistral génère recommendation

---

#### **2️⃣ WHAT — Processing Mistral exact**

**Modal de choix (avant Mistral) :**
- **Select dropdown :** Catégorie principale (ex: compétence, mission, objectif opérationnel)
- **Checkboxes :** Sélection multi-items (ex: quelles compétences travailler, quelles missions considérer)
- **Text field "Autre" :** Option pour ajouter contexte custom/notes supplémentaires
- **Validation :** Tous les champs obligatoires avant lancer Mistral

**Input à Mistral :**
- Passeport compétences de l'apprenant
- Compétences que l'apprenant veut travailler (du modal)
- Missions Apprenantes applicables
- Objectifs opérationnels sélectionnés
- ⚠️ **BLOCKER:** Conditions exactes de recommendation (varient selon demandes) → À valider Phase 14 quelles conditions trigger quelles logic

**Output (Recommendation) :**
- ⏳ Varie selon demandes (besoin clarification logic)
- **Score de précision :** Mistral évalue + affiche confiance score (ex: 85% confiance)
- **Rationale :** Pourquoi ce type est recommandé (transparence)
- **Content scope :** Tout contenu (veille + pédagogique) peut être proposé

---

#### **3️⃣ HOW improves UX — Bénéfice utilisateur concret**

**Pour l'apprenant :**
- **Guidage précis :** Instead of guessing, apprenant reçoit recommandation intelligente
- **Sentiment d'accompagnement :** Features feels personal + supportive
- **Évite mauvaises décisions :** Si apprenant suit recommendations, minimise risque de choisir contenu inapproprié
- **Parcours adaptatifs :** Feature permet à chaque apprenant de créer/suivre parcours vraiment adapté à ses besoins

**Pour le manager :**
- **Recommander aux apprenants :** Proposer item types optimisés pour ses collaborateurs
- **Superviser choix :** Voir quels items sont sélectionnés par ses apprenants
- **Mesurer progression :** Voir gap compétences + estimer temps pour atteindre compétence cible
- **Argument commercial :** "Chaque apprenant abonné peut créer parcours adaptatif avec contenus vraiment utiles" (selling point pour entreprises)

**UX Strategy :** Rendre feature intuitive + transparent (score visible) pour adoptions élevée

---

#### **4️⃣ HOW fails gracefully — Error handling**

**Mistral timeout/error :**
- Message d'erreur visible : "[Erreur] La recommandation n'a pas pu être générée. Veuillez réessayer."
- User peut retry plusieurs fois
- Fallback : User peut naviguer ailleurs (pas obligé de continuer)

**Modal incomplet :**
- Si user clique "Lancer" sans remplir champs obligatoires
- Message d'erreur : "Veuillez remplir tous les champs obligatoires"
- User complète + réessaye

**Confidence score bas :**
- Si Mistral génère recommendation avec score <X% → affiche warning ("Cette recommendation a une confiance faible, vérifiez avec votre coach")
- User peut ignorer ou explorer autres options

---

#### **5️⃣ WHY cost-effective — ROI, effort, tokens**

**Tokens/Cost :**
- ⚠️ **BLOCKER:** Estimation de tokens par recommendation + frequency → À déterminer en dev (aucune idée précise pour le moment)
- Strategy: Monitor actual token usage post-launch, optimize prompts based on learnings

**Frequency :**
- User peut cliquer N fois (pas limité à une seule recommendation)
- Variable selon usage (apprenant indécis peut essayer plusieurs scénarios)

**ROI :**
- Effort: 40-60h dev
- Value: Improved learner outcomes + better content adoption + selling feature to enterprises
- Cost: TBD tokens

---

#### **6️⃣ HOW measure success — Métriques & KPIs**

**Metrics :**

1. **Follow-through rate :** Item type recommandé → apprenant l'utilise réellement (accès au contenu)
   - KPI: % recommended items actually consumed by learner

2. **Relevance post-execution :** Après que l'apprenant utilise l'item recommandé
   - Évaluation: Recommendation était relevant ? (feedback apprenant)
   - Question simple: "Cette recommandation vous a-t-elle aidé ?" (Yes/No optional comment)

3. **Threshold de succès :** **>90% acceptance rate** (des recommendations suivies/acceptées comme pertinentes)

4. **Additional metrics (TBD) :**
   - Completion rate (apprenant termine-t-il le contenu recommandé ?)
   - Learning outcome (competency level improvement après avoir suivi recommendation)
   - Manager satisfaction (manager trouve recommendations utiles ?)

---

### **⚠️ BLOCKERS — Feature #2**

| Blocker | Scope | Phase |
|---------|-------|-------|
| **Conditions exactes de recommendation** | Quelles conditions trigger quelles logiques de recommendation ? Conditions varient selon demandes → clarifier toutes les variantes | Phase 14 |
| **Tokens/cost estimation** | Aucune idée précise. Estimation tokens par recommendation + frequency. À déterminer post-dev-start | Phase 14 |
| **Placement du bouton pour manager** | Bouton n'est PAS sur le tableau de bord manager. Où exactement doit-il apparaître pour le manager ? | Phase 14 |
| **Placement du bouton confirmation** | Valider qu'on a couvert tous les emplacements où le bouton doit apparaître (dashboard, profil, passeport, autres ?) | Phase 14 |

---

**Ready for Feature #3 validation ✅**

---

### **Feature #3 : Adaptive Learning Paths (V1)**

**Status:** ✅ Validated by Pierre (2026-05-12)  
**Timeline:** V1 Week 3-5 (mid-September deployment)  
**Type:** Transparent + Button ([Créer son parcours sur mesure])  
**Effort:** 70-100h  

---

#### **1️⃣ WHERE — Moment dans le user journey**

**Déclencheur :**
- Page "Parcours sur mesure" (page dédiée)
- Bouton [Créer son parcours sur mesure]
- Mistral construit parcours automatiquement basé sur demande + profil

**Interaction post-création :**
- Apprenant visualise parcours généré sur page "Parcours sur mesure"
- Peut demander modifications conversationnellement au LLM sur la même page

**Contexte disponible à Mistral :**
- Passeport compétences actuel
- Demande de l'utilisateur (guidée par interface)
- Historique de la plateforme (items complétés, engagement patterns)
- Analyse du type d'item où apprenant s'engage le plus → propose types d'items efficaces pour ce profil
- **Pondération :** Config en LLM prompt, 50/50 au départ (type préféré vs diversité), ajustement post-launch

---

#### **2️⃣ WHAT — Processing Mistral exact**

**Structure du parcours généré :**

Parcours = Séquence linéaire d'étapes structurées ainsi :

```
Étape 1
  ├─ Contenu principal (Leçon OU Masterclass OU Mission Apprenante)
  ├─ Contenus complémentaires (optionnel, ex: articles, ressources)
  └─ Assignment (évaluation/quiz de fin d'étape)

Étape 2
  ├─ [idem structure]
  └─ ...

...

Étape N
  ├─ [idem structure]
  └─ Assignment

Projet Final (généré par Mistral sur mesure)
  ├─ Spécifique aux objectifs opérationnels de l'apprenant
  ├─ Validé par apprenant avant de commencer
  └─ À la fin du parcours
```

**Création initiale du parcours :**
- Mistral reçoit : demande structurée (objectifs + timeline + préférences)
- Mistral évalue : prerequisites, dependencies, learning velocity
- Output : séquence étapes avec types d'items optimisés pour ce profil
- Apprenant voit parcours complet avec timings estimés

**Poids/pondération (éviter enfermement) :**
- Config : dans LLM prompt/system settings (TBD exact mechanism)
- Logique : 50% type d'item préféré + 50% diversité (départ)
- Ajustement : post-launch basé sur outcomes

**Modification conversationnelle du parcours :**
- Apprenant demande : "Rends ce parcours plus difficile" ou "Ajoute plus d'exercices" ou autre
- Mistral : Modifie points spécifiques (pas regenerate entier)
- Scope de modif : **Seulement les futures étapes** (garde ce qui est déjà complété/en cours)
- **Important:** LLM présente modifications proposées → Apprenant VALIDE → Page recharge avec nouveau parcours
- **Irréversibilité:** Une fois validé, apprenant NE PEUT PAS revenir en arrière
- Historique : Apprenant peut voir versions précédentes (read-only, pas restore)

**Projet final généré :**
- ⚠️ **BLOCKER:** Mistral génère projet final sur mesure (scope détaillé, validation Phase 14)
- Doit être aligné aux objectifs opérationnels définis

---

#### **3️⃣ HOW improves UX — Bénéfice utilisateur concret**

**Pour l'apprenant :**
- **Avant:** Parcours statique one-size-fits-all (même pour tous)
- **Après:** Parcours vraiment adapté à son profil, objectifs, préférences
- **Flexibilité:** Peut créer parcours court ou long selon disponibilité/urgence
- **Objectifs opérationnels ciblés:** Parcours directement lié à ce qu'il veut accomplir
- **Efficacité apprentissage:** Meilleure rétention, moins de frustration (contenus pertinents)
- **Agility:** Peut modifier à tout moment (avant d'en avoir besoin)

**Feedback loop en temps réel :**
- Apprenant valide modifications
- Page recharge immédiatement avec nouveau parcours
- Voit progression en live

---

#### **4️⃣ HOW fails gracefully — Error handling**

**Mistral timeout/erreur lors création initiale :**
- Message d'erreur visible : "[Erreur] Parcours ne pas pu être généré. Veuillez réessayer ou contacter support."
- User peut retry
- Fallback : offrir parcours par défaut template-based ? (TBD)

**Demande incompréhensible :**
- Mistral demande clarification : "Pouvez-vous préciser votre objectif ?" ou propose alternatives
- Si Mistral ne trouve PAS de contenu disponible sur plateforme pour répondre à demande
  - LLM le dit à apprenant : "Désolé, nous n'avons pas de contenu en [domaine]. Voici des alternatives :"
  - Propose alternatives (contenus proches disponibles)

**Modification conversationnelle timeout :**
- Message + retry

---

#### **5️⃣ WHY cost-effective — ROI, effort, tokens**

**Implementation :**
- Effort: 70-100h dev
- Complexity: Moyen-haute (parcours generation + conversation modification + versioning)

**Tokens/frequency :**
- ⚠️ **BLOCKER:** Estimation tokens pour création initiale + modifications conversationnelles → À déterminer dev-time
- Frequency : Apprenant peut modifier N fois (pas limité à priori)

**ROI :**
- Value: Significantly improved learning outcomes + personalization at scale
- Cost: TBD tokens + infrastructure

---

#### **6️⃣ HOW measure success — Métriques & KPIs**

**Success criteria :**

1. **Completion :** Parcours suivi à 100% et terminé (not partial)
   - Apprenant complète TOUTES les étapes + projet final

2. **Timeline adherence :** Respect des deadlines du parcours
   - Apprenant ne prend pas énormément plus de temps que timeline estimée

3. **Learner satisfaction :** Évaluation post-parcours >4/5 ("Parcours était adapté et efficace")
   - Question simple : "Êtes-vous satisfait du parcours ?" (1-5 scale)

4. **Low modification rate :** <1 demande de modification moyenne par apprenant
   - Indique parcours initial était bien généré

5. **Project outcome :** Apprenant réussit le projet final
   - Validation par coach ou auto-évaluation

6. **Engagement comparison :** Engagement plus élevé que parcours statiques
   - Metric: time spent, completion rates, session frequency vs. control group

7. **Additional metrics (TBD):**
   - ⚠️ **BLOCKER:** Autres success metrics à déterminer Phase 14

---

### **⚠️ BLOCKERS — Feature #3**

| Blocker | Scope | Phase |
|---------|-------|-------|
| **Mistral génère projet final sur mesure** | Scope exact du projet final (validé par apprenant avant de commencer) | Phase 14 |
| **Options exactes pour modifier parcours** | Quelles sont les modifications possibles ? (Pierre va schématiser tous les types d'actions) | Phase 14 |
| **Tokens/frequency estimation** | Tokens pour création initiale + modifications conversationnelles | Dev-time |
| **Success metrics additionnelles** | Autres metrics au-delà de complétude/satisfaction/modifications/engagement | Phase 14 |

---

**Ready for Feature #4 validation ✅**

---

### **Feature #4 : Matching IA pour Missions (V1)**

**Status:** ✅ Validated by Pierre (2026-05-12)  
**Timeline:** V1 Week 5-7 (late September deployment)  
**Type:** Button-Triggered ([Suggest Missions])  
**Effort:** 60-80h  

---

#### **1️⃣ WHERE — Moment dans le user journey**

**Button placement (Multiple contexts) :**
- **Page "Learning Space"** (depuis un parcours sur mesure)
- **Dashboard apprenant**
- **Espace Entreprise** (manager peut déclencher pour attribuer mission à un collaborateur)

**Utilisateurs :**
- Apprenant (clic pour voir suggestions personnalisées)
- Manager (clic pour attribuer mission optimisée à collaborateur)

**Contexte disponible à Mistral :**
- Passeport compétences complet de l'apprenant
- Historique missions complétées (si existant)
- Parcours actuel + objectifs définis
- **Web search:** Mistral a accès au web pour faire des recherches sur les missions (enrichir contexte)

---

#### **2️⃣ WHAT — Processing Mistral exact**

**Input à Mistral :**
- Passeport compétences apprenant
- Objectifs opérationnels actuels
- Timeline / disponibilité
- Historique missions complétées
- Contexte parcours en cours
- Web search queries (Mistral peut rechercher contenus supplémentaires)

**Processus Mistral :**
- Analyse profil + contexte
- Génère **3 propositions** de missions (ranked by relevance)
- Calcule **taux d'adéquation avec profil** (probabilité score pour chaque proposition)

**Output (Recommandations) :**

```
Mission Proposée 1 : [Nom]
- Taux d'adéquation : 92%
- Justification : [Pourquoi cette mission pour ce profil]
- Compétences travaillées : [List]
- Effort estimé : [Timeline]

Mission Proposée 2 : [Nom]
- Taux d'adéquation : 78%
- ...

Mission Proposée 3 : [Nom]
- Taux d'adéquation : 65%
- ...
```

**Interaction apprenant :**
1. Apprenant voit 3 propositions sur **page dédiée** (NOT modal)
2. Peut sélectionner une mission
3. **Avant validation :** Apprenant peut corriger/modifier manuellement les champs
   - Modèle RIEC structure la mission (juste remplir des champs, pas édition libre complexe)
   - Champs éditables : objectif, compétences cibles, timeline, resources additionnelles (si applicable)
4. Une fois satisfait : Apprenant valide la mission (confirmation finale)

---

#### **3️⃣ HOW improves UX — Bénéfice utilisateur concret**

**Pour l'apprenant :**
- **Gain de temps :** Au lieu de chercher/filtrer manuellement les missions disponibles, reçoit top 3 suggestions en 1 click
- **Sur mesure totale :** Mission proposée est vraiment adaptée à son profil + objectifs actuels
- **Correction facile :** Peut ajuster avant de valider (modèle RIEC simplifie adaptation)
- **Transparence :** Voit taux d'adéquation pour chaque option (comprend le scoring)

**Pour le manager :**
- **Attribution intelligente :** Peut suggérer missions optimales aux collaborateurs (plutôt que choisir au pif)
- **Efficacité projet :** Missions mieux alignées aux compétences disponibles dans l'équipe

---

#### **4️⃣ HOW fails gracefully — Error handling**

**Mistral timeout/erreur :**
- Message d'erreur visible : "Suggestions non générées. Veuillez réessayer."
- User peut retry
- **Fallback:** Même en cas d'erreur/timeout, Mistral suggère quand même (avec **taux d'adéquation inférieur/non-garanti**)
  - Message clarification : "Nous proposons ces missions avec une confiance réduite. Vérifiez avec votre coach avant validation."

**Aucune mission applicable :**
- Mistral communique : "Aucune mission ne correspond parfaitement à votre profil actuellement. Voici des alternatives :"
- Propose missions "proches" (même si pas match 100%)

**Apprenant modifie mission :**
- Modèle RIEC simplifie la modification (juste remplir champs, pas édition complexe)
- Permet agility sans bloquer validation

---

#### **5️⃣ WHY cost-effective — ROI, effort, tokens**

**Implementation :**
- Effort: 60-80h dev
- Complexity: Moyen (Mistral matching + page dédiée + RIEC form validation)

**Tokens/frequency :**
- ⚠️ **BLOCKER:** Tokens par matching request + usage frequency → À déterminer Phase 14

**ROI :**
- Value: Missions mieux alignées = meilleur apprentissage + utilisation plateforme
- Cost: TBD tokens + infrastructure

---

#### **6️⃣ HOW measure success — Métriques & KPIs**

**Metrics (4 principales) :**

1. **Acceptance rate :** % missions suggérées acceptées par apprenant
   - KPI: >70% = bon (apprenant utilise les suggestions)

2. **Completion rate :** Mission lancée → mission terminée
   - Apprenant complète mission après suggestion Mistral
   - Comparison: Completion % missions suggérées vs missions choisies manuellement

3. **Relevance post-execution :** Apprenant évalue mission post-complétude
   - **Feedback:** Pouce levé 👍 / Pouce bas 👎 (simple evaluation)
   - KPI: >80% pouce levé = success

4. **Time investment :** Apprenant finit dans timeline estimée
   - Indique mission était bien-scoped

**Additional insights :**
- Taux d'adéquation moyen des missions acceptées (doit être >75% pour confiance model)

---

### **⚠️ BLOCKERS — Feature #4**

| Blocker | Scope | Phase |
|---------|-------|-------|
| **Tokens/frequency estimation** | Tokens par matching request, frequency/user, actual cost estimate | Phase 14 |
| **Effort estimation refinement** | 60-80h need validation (includes RIEC form validation + page, web search integration, fallback handling) | Phase 14 |
| **Web search scope** | Quels types de missions Mistral peut rechercher sur le web ? Limits ? Safety considerations ? | Phase 14 |
| **Manager attribution workflow** | Exact workflow when manager suggests mission to collaborator (notification? Auto-assign? Collaborator must accept?) | Phase 14 |

---

**Ready for Feature #5 validation ✅**

---

### **Feature #5 : Newsletter AI (V1)**

**Status:** ✅ Validated by Pierre (2026-05-12)  
**Timeline:** V1 (exact week TBD)  
**Type:** Transparent (Auto-generated + scheduled)  
**Effort:** TBD Phase 14  

---

#### **1️⃣ WHERE — Moment dans le user journey**

**Delivery channels :**
- **Email** : Reçoit newsletter par email (format digest)
- **Notification in-app** : Notification in-app avec modal pour lire la newsletter directement sur plateforme

**Fréquence & Schedule :**
- **MVP/V1 :** Mensuel (1x par mois)
- **Post-launch :** Peut être ajusté selon usage réel (plus/moins fréquent si engagement justifie)

**Contrôle apprenant :**
- **Activation par défaut :** Tous les apprenants reçoivent newsletter par défaut (opt-in model)
- **Désactivation :** Apprenant peut désactiver à tout moment (préférences)

**Déclencheur :**
- **Auto :** Mistral génère + envoie automatiquement selon schedule (pas d'action apprenant requise)

**Filtering :**
- **Basé préférences :** Filtered selon préférences apprenant (domaines d'intérêt, objectifs, niveau, etc.)
- **Opt-out :** Apprenant peut unsubscribe complètement

---

#### **2️⃣ WHAT — Processing Mistral exact**

**Input à Mistral :**
- Passeport compétences apprenant
- Historique engagement (items complétés, missions terminées, etc.)
- Objectifs opérationnels définis
- Domaines d'intérêt / préférences
- Progression depuis dernière newsletter

**Contenu de la newsletter :**
- Mix de : Items d'apprentissage + Ressources Veille + Missions Apprenantes recommandées
- Scope : Tout contenu disponible peut être proposé (flexible)

**Output (Newsletter structure) :**

```
[Header]
Bonjour [Apprenant],

[Section 1 - Résumé Activité]
Voici ton résumé du mois dernier :
- X items complétés
- Y compétences progressées
- Z heures d'apprentissage
- Progression générale : +N% depuis [date]

[Section 2 - Propositions Prochain Mois]
Basé sur ton profil, voici ce qu'on te propose :
- Proposition 1 : [Item/Mission/Ressource] - [Justification courte]
- Proposition 2 : [...]
- Proposition 3 : [...]
- [...]

[Footer - CTA]
[Voir recommandations] [Modifier préférences] [Se désabonner]
```

**⚠️ BLOCKER :**
- **Nombre exact de suggestions** (5, 7, 10 ?)
- **Format exact de la newsletter** (template design, structure sections, tone)
- **Personnalisation depth** (générique vs ultra-personnalisé ?)
- **Quels contenus prioritaires** dans le mix (Items vs Veille vs Missions ?)
- → **À déterminer Phase 14**

---

#### **3️⃣ HOW improves UX — Bénéfice utilisateur concret**

**Pour l'apprenant :**
- **Réduction friction :** Au lieu de chercher soi-même "quoi apprendre ce mois-ci", reçoit recommendations ciblées
- **Meilleur engagement :** Voir résumé travail accomplí + progression depuis le mois passé → sentiment accomplissement
- **Découverte facilitée :** Trouve nouveaux contenus pertinents sans effort de navigation
- **Progression transparente :** Comprend sa trajectoire (skills gains, heures apprises, etc.)

**Feedback loop :**
- Newsletter = moment de "check-in" mensuel (engagement hook)
- Apprenant voit progression concrète → motivation pour continuer

---

#### **4️⃣ HOW fails gracefully — Error handling**

**Mistral timeout/erreur lors génération :**
- Newsletter = résumé activité + propositions pour mois
- Si Mistral fails sur propositions : affiche résumé activité seulement (résumé peut être généré basiquement)

**Aucun contenu recommandable :**
- Si 0 contenus pertinents cette période (cas rare)
- **Fallback :** Envoyer "motivation template" à la place
  - Message d'encouragement générique + suggestion de revoir Passeport

**Unsubscribe :**
- Apprenant peut unsubscribe à tout moment (simple action)
- Arrête complètement les envois email/in-app

---

#### **5️⃣ WHY cost-effective — ROI, effort, tokens**

**Implementation :**
- ⚠️ **BLOCKER:** Effort estimation + tokens cost (Mistral per newsletter) → À déterminer Phase 14

**Frequency :**
- 1x par mois par apprenant
- Echelle : 5,000 users (V1 launch) = 5,000 newsletters/month
- Tokens : TBD (low-frequency, but batch processing possible)

**ROI :**
- Value: Engagement boost + content discovery + motivation
- Cost: TBD tokens + template design (one-time)

---

#### **6️⃣ HOW measure success — Métriques & KPIs**

**Metrics :**

1. **Open rate :** % apprenants qui ouvrent la newsletter (email ou in-app modal)
   - KPI: >40% = bon engagement

2. **Click-through rate :** % contenus recommandés qui sont cliqués
   - KPI: >25% des recommendations cliquées

3. **Completion rate :** % contenus recommandés qui sont complétés
   - KPI: >50% des items cliqués sont terminés

**Success Criteria :**
- ✅ >40% open rate
- ✅ >25% click-through on recommendations
- ✅ >50% completion on clicked items

---

### **⚠️ BLOCKERS — Feature #5**

| Blocker | Scope | Phase |
|---------|-------|-------|
| **Nombre exact de suggestions** | Combien de contenus recommandés par newsletter (5, 7, 10) ? | Phase 14 |
| **Format exact newsletter** | Design template, structure sections, tone, layout | Phase 14 |
| **Personnalisation depth** | Niveau de personnalisation (générique vs ultra-ciblé) | Phase 14 |
| **Mix de contenus** | Quelle priorité Items vs Veille vs Missions dans les propositions ? | Phase 14 |
| **Effort & Tokens estimation** | Effort dev + Mistral tokens par newsletter (batch processing ?) | Phase 14 |

---

**Ready for Feature #6 validation ✅**

---

### **Feature #6 : Churn Alerts (V1)**

**Status:** ✅ Validated by Pierre (2026-05-12)  
**Timeline:** V1 (exact week TBD)  
**Type:** Transparent (Background scanning + scheduled alerts)  
**Effort:** TBD Phase 14  

---

#### **1️⃣ WHERE — Moment dans le user journey**

**Recipients (Qui reçoit l'alerte) :**
- **Coach** (apprenant's coach)
- **Manager** (apprenant's manager d'entreprise)
- **Super Admin** (plateforme admin, supervision)

**Delivery :**
- **NOT email** : Seulement notification plateforme (in-app/dashboard notification)
- **Pas de mail** : Pour éviter surcharge email, garder signal fort pour les notifications critiques

**Schedule :**
- **Frequency :** Hebdomadaire
- **Day & Time :** Mardi à 9h (batch processing)

**Alert Trigger :**
- **Pattern-based :** Alerte se déclenche quand engagement patterns indiquent churn risk
- ⚠️ **BLOCKER:** Quels patterns exactement = "churn risk" ? (ex: X% drop in Y days, login frequency <Z, completion rate decline, etc.) → À déterminer Phase 14

---

#### **2️⃣ WHAT — Processing Mistral exact**

**Input à Mistral :**
- **Toutes les learning analytics disponibles** sur la plateforme :
  - Engagement metrics (login frequency, session duration, etc.)
  - Completion rates (items, missions, parcours)
  - Progress tracking (competency level changes)
  - Time invested
  - Sentiment/feedback signals
  - Activity patterns over time

**Pattern Recognition :**
- ⚠️ **BLOCKER:** Définir les patterns de churn (feature engineering) → À déterminer Phase 14
- Mistral évalue ces patterns contre historical data/baseline

**Output (Alert Content) :**

```
[Notification - Coach/Manager]

⚠️ ALERTE CHURN — [Apprenant Name]

Risque de départ : [Score]% 
(ex: 78% churn risk)

Raisons :
- Engagement down 40% last 2 weeks
- No login in 5 days
- Completion rate dropped from 80% to 30%

Recommandations pour y remédier :
- Proposer coaching call (urgence haute)
- Envoyer contenu de motivation (leçon "Reprendre ton momentum")
- Check-in manager : "T'as des blocages ?")

[Action: Acknowledge] [Dismiss] [See Details]
```

**Mail de relance :**
- Après alerte, Mistral déclenche **suivi de mail de relance** (à apprenant ou coach, TBD)
- Contient recommendations + CTA pour re-engagement

**Score & Justifications :**
- Mistral fournit : score churn % + justifications détaillées + recommendations pour y remédier

---

#### **3️⃣ HOW improves UX — Bénéfice utilisateur concret**

**Pour le coach/manager :**
- **Alertes proactives sans friction :** Détection automatique apprenants en difficulté (vs. attendre qu'ils partent)
- **Intervention en temps réel :** Coach/Manager peut intervenir AVANT que apprenant ne se désabonne
- **Signal fort :** Notification plateforme (pas noisy email) = urgency claire
- **Actionable recommendations :** Sait exactement quoi faire (coaching, contenu, check-in)

**Impact concret :**
- **Minimise taux de churn :** Intervenir tôt = probabilité plus haute de retenir apprenant
- **Améliore business revenue :** Moins de churns = moins d'abonnements perdus = CA mensuel plus élevé
- **Relation apprenant améliorée :** Apprenant se sent supporté (manager/coach check-in proactif)

---

#### **4️⃣ HOW fails gracefully — Error handling**

**Mistral timeout sur scoring :**
- Notification dans le BO : "Alerte churn processing, peut prendre quelques minutes"
- **Admin peut relancer** manually (trigger re-scoring)
- Pas de perte d'alerte (retry mechanism)

**Faux positifs (alerte mais apprenant re-lance sa progression) :**
- **Pas grave** : Feedback loop post-launch montrera patterns à ajuster
- Mistral/algo s'améliore avec temps (apprentissage à partir des faux positifs)
- Équipe peut ajuster thresholds en pratique (Phase 14+ learnings)

**Dismiss/Ignore alerts :**
- Coach, Manager, ET Super Admin peuvent tous **dismiss ou ignorer** une alerte
- Click [Dismiss] = retire notification
- Historique gardé (pour analytics) mais plus de re-notifications pour cet apprenant ce mois-ci

---

#### **5️⃣ WHY cost-effective — ROI, effort, tokens**

**Business Case :**
- **Value :** Opportunité de NE PAS PERDRE des clients
- **Impact :** Minimiser churn = augmenter CA mensuel (retention = revenue)
- **ROI :** Chaque client retenu = X€/mois revenue preserved
- **Example :** Si 5% churn prevention, 5,000 users × €50/month = €12,500/month revenue saved

**Implementation :**
- ⚠️ **BLOCKER:** Effort estimation + Mistral tokens (weekly batch scoring for N users) → Phase 14

**Frequency :**
- 1x par semaine (mardi 9h batch)
- Échelle : 5,000 users → 5,000 churn scores/week

---

#### **6️⃣ HOW measure success — Métriques & KPIs**

**Metrics :**

1. **True Positive Rate :** % alertes qui sont correctes (alerte = apprenant réellement en churn risk)
   - KPI: >70% true positives (acceptable threshold)

2. **Re-engagement Rate :** % apprenants avec alerte qui reviennent à activité normale
   - Après coach/manager intervention + recommendations
   - KPI: >50% re-engage within 2 weeks of alert

3. **Churn Impact :** Retention rate (users with alert + intervention vs. no alert)
   - KPI: X% fewer churns in alert group vs. control

**Success Criteria :**
- ✅ >70% true positive rate
- ✅ >50% re-engagement within 2 weeks
- ✅ Measurable churn reduction vs. baseline

---

### **⚠️ BLOCKERS — Feature #6**

| Blocker | Scope | Phase |
|---------|-------|-------|
| **Pattern definition** | Quels patterns exacts = churn risk ? (engagement drop %, login frequency, completion rate thresholds, time period windows) | Phase 14 |
| **Feature engineering** | Quelles learning analytics combiner pour scoring accurate ? | Phase 14 |
| **Effort & tokens estimation** | Dev effort + Mistral tokens pour weekly batch scoring 5K users | Phase 14 |
| **Mail de relance détails** | Quand exactement ? À qui (apprenant vs coach) ? Template ? | Phase 14 |
| **Success threshold calibration** | Comment calibrer true positive rate (70% acceptable ? adjust over time ?) | Phase 14 |

---

**⚠️ Feature #7 — BLOCKER COMPLET**

Journal Recommendations depend entirely on **Journal de Bord final design** (not yet determined). Cannot validate until Journal cahier is finalized.

**Status:** ⏳ Deferred until Journal design complete

---

**⚠️ Feature #8 — DÉFÉRÉ À V3**

Skill Atrophy Detection moved to V3 (not V2). Will re-evaluate with V3 features in early 2027.

---

### **Feature #9 : Organizational Intelligence & Gap Analysis (V2)**

**Status:** ✅ Validated by Pierre (2026-05-12)  
**Timeline:** V2 (exact week TBD)  
**Type:** Transparent (Background) + Button ([Generate Report])  
**Effort:** 120-160h  

---

#### **1️⃣ WHERE — Moment dans le user journey**

**Recipients (Qui accède) :**
- **Manager entreprise** (sees org-wide skill landscape)
- **Super Admin** (platform oversight)
- **Coach superviseurs** (see teams under supervision)

**Display locations :**
- **Dashboard manager** : Summary view + button [Generate Gap Analysis Report]
- **Fiche entreprise en BO** : Detailed report view (back-office)
- **Auto-generated reports** : Click button → Mistral generates report on-demand

**Frequency :**
- **Manual/On-demand :** Manager décide quand générer (vs. automatic batch)
- **Rate limiting :** Max 3 rapports par semaine par manager (prevent abuse)

---

#### **2️⃣ WHAT — Processing Mistral exact**

**Input à Mistral :**
- **Toutes les données liées à l'entreprise :**
  - Passeport compétences de TOUS les apprenants de l'org
  - Structure org (departments, roles, teams)
  - Learning history + engagement patterns
  - User profile data (roles, departments)

**Analysis Mistral (3 sections) :**

1. **Skill Gaps par Dept/Role :** Où org a des faiblesses
   - Ex: "Sales team lacks negotiation (avg 2.3/5), vs. industry benchmark 4/5"
   - Breakdown par role/department

2. **Hotspots & Strengths :** Où org excels + où weak
   - Ex: "Engineering strong in technical (4.2/5) but weak in communication (2.8/5)"

3. **Upskilling Recommendations :** Priorités pour next quarter
   - Ex: "Focus Q1 2026 on digital transformation skills (currently 2.1/5, needed 4+)"
   - Business impact linked to recommendations

**Output (Report Structure) :**
- ⚠️ **BLOCKER:** Format exact du rapport (sections, layout, visualizations, tone) → À déterminer Phase 14
- High-level structure : Summary + Department breakdown + Recommendations + Action plan

---

#### **3️⃣ HOW improves UX — Bénéfice utilisateur concret**

**Pour le manager :**
- **See skill landscape at scale :** View org-wide competency distribution (vs. one-by-one individual profiles)
- **Drill-down capability :** Click on department → see individual learners + their gaps
- **Data-driven strategy :** Base upskilling decisions on real data (not guesswork)
- **Time savings :** Avoid manual report creation + bilan meetings (Mistral does it)

**Pour l'organisation :**
- **Strategic alignment :** Identify critical skill gaps blocking business goals
- **Budget optimization :** Allocate training budget to highest-impact areas

---

#### **4️⃣ HOW fails gracefully — Error handling**

**Insufficient data :**
- **Minimum threshold :** Report generation requires **minimum 3 users** in org
- **Data quality :** If users have <5 competencies defined → **NOT counted as incomplete data** (still use them)
- **Insufficient data error :** If org doesn't meet minimum threshold → Display error message: "Besoin de minimum 3 apprenants pour générer rapport. Invitez des collaborateurs pour commencer."

**Rate limiting :**
- Manager tries to generate >3 reports/week → Message: "Limite atteinte (3 rapports/semaine). Réessayez la semaine prochaine."

**Mistral timeout/error :**
- Message d'erreur : "[Erreur] Rapport ne pas pu être généré. Réessayez dans quelques minutes."
- Manager peut retry (no limit on retries, only rate limit on success)

---

#### **5️⃣ WHY cost-effective — ROI, effort, tokens**

**Business Case (Pierre's Perspective) :**
- **Shows org upskilling needs :** Generate reports → show to client "Voici vos gaps, besoin formation complémentaire"
- **Sales/retention driver :** Convinces org to either buy additional training OR stay subscribed (business value)
- **Time savings :** Pierre saves time on manual report creation + bilan meetings (operational efficiency)

**Implementation :**
- Effort: 120-160h dev (high complexity - org aggregation + reporting logic + visualizations)
- Tokens: On-demand generation (low frequency, but complex queries)
- ROI: Direct business impact (better org retention + upsell opportunities)

---

#### **6️⃣ HOW measure success — Métriques & KPIs**

**Metrics :**

1. **Adoption rate :** % managers qui utilisent feature (click report button)
   - KPI: >40% managers generate ≥1 report per quarter

2. **Actionability :** % recommendations from reports que org implémente
   - KPI: >50% recommendations lead to training initiatives

3. **Business impact :** Org retention + upsell
   - Orgs that use reports → better retention rate ?
   - Reports → upsell additional training modules ?

**Success Criteria :**
- ✅ >40% manager adoption
- ✅ >50% recommendations implemented
- ✅ Measurable business impact (retention/upsell)

---

### **⚠️ BLOCKERS — Feature #9**

| Blocker | Scope | Phase |
|---------|-------|-------|
| **Report structure exact** | Format, layout, visualizations, sections order, tone, branding | Phase 14 |
| **Org aggregation logic** | How to weight different departments/roles ? (equal vs. weighted by headcount) | Phase 14 |
| **Drill-down UX** | Exact interaction when manager clicks "See individual learners" from dept gap | Phase 14 |
| **Effort & tokens estimation** | Dev effort + Mistral tokens per report generation | Phase 14 |

---

**⚠️ Feature #10 — BLOCKER PHASE 14 (THE MOAT)**

**AI-Driven Project Auto-Configuration (V2)** is TOO COMPLEX to validate now.

**Why it's blocked:**
- Complexity: 200-280h effort (requirement parsing + skill matching + timeline generation + JAC creation)
- Criticality: THE MOAT feature (biggest competitive advantage)
- Dependencies: Requires finalized Projects module + clear JAC structure
- Scope: Too much to clarify in one session

**Decision:** 
- ⏳ Full validation + deep-dive design → **Phase 14 (Consolidation pre-launch)**
- Will require dedicated architecture review + spike work with Pierre
- Too important to rush — needs careful planning

---

