# 02 Passeport Compétences

**Version:** MVP Juillet 2026  
**Status:** 🟢 Spécification en cours  
**Module Fondateur:** Oui (dépendance critique pour 6 autres modules)  
**Effort estimé:** 60-80h  
**Timeline:** Semaines 1-2 (Phase 1)

---

## 📖 Vue d'Ensemble

### Objectif Métier
Le **Passeport Compétences** est le cœur du système Skills-Based Organization. Il crée une **cartographie unifiée des compétences** pour chaque apprenant, basée sur le **Référentiel H.S.O** (Hard skills, Softs skills, Out skills) et les **niveaux Dreyfus** de maîtrise.

Ce module permet de :
- 📊 Visualiser le **radar de compétences** (profil actuel vs objectif)
- 📈 Tracker la **progression** (Dreyfus levels 1→5)
- 🎯 Aligner les **apprenants avec les missions/rôles** (matching)
- 🏆 Déclencher des **badges & XP** basés sur progression
- 📝 Servir de fondation aux **Journal de bord** (evidence linking)

### Qui l'Utilise (Rôles)
- **Apprenant** : Visualise son radar personnel, définit objectifs de progression
- **Coach** : Monitore les progressions, propose des missions/formations adaptées, valide les jalons
- **Admin** : Gère le référentiel H.S.O, maintient la hiérarchie, exporte analytics
- **Manager** (future) : Voit les compétences d'équipe, aligne avec besoins métier

### Scope — IN / OUT

#### ✅ IN (MVP Juillet)
- Référentiel H.S.O hiérarchisé (Compétence → Objectif Organisationnel → Mission)
- Dreyfus levels 1-5 (Novice → Expert)
- Radar compétences Apprenant (vue personnelle + objectif)
- Profil Apprenant (compétences actuelles, liées aux missions)
- Dashboard Coach (compétences équipe, alertes progression)
- Back-Office Admin (CRUD référentiel, import/export)
- API REST complète (lecture + écriture)
- Notifications progression (jalons atteints)

#### ❌ OUT (Déféré)
- Matching IA automatisé (V1 Mistral, nécessite hébergement)
- Auto-tagging de contenu vers compétences (Mistral, V1)
- Leaderboards de compétences (Gamification V2)
- JIT Learning complet v2.0 (Cahier #20, AI-powered contextual suggestions — déféré à V2+)
  - **NOTE:** Cahier #1bis inclut "Micro-Learning Resources" MVP = simple coach curation (no AI) liée aux missions
- Export PDF certificat (V2)

### Dépendances Critiques

**Dépend de :**
- **Aucun module** (foundational)
- Référentiel externe H.S.O (à importer/définir)

**Bloque :**
- **Module 3 : Onboarding** (profil utilisateur → compétences initiales)
- **Module 1 : Formation** (adaptive paths = basées sur Passeport)
- **Module 5 : JAC** (jalons = validation de compétences)
- **Module 7 : Gamification** (badges & XP = progressions Dreyfus)
- **Module 9 : Missions Apprenantes** (matching Apprenant ↔ Missions Apprenantes)
- **Module 10 : Journal** (linking evidence → compétences)

### 🔄 Bidirectional Linking avec Autres Modules

Le Passeport est le **cœur du système** : il alimenté par les autres modules ET nourrit les autres modules pour adapter recommandations/assignments.

#### Passeport → OUT (Nourrit autres modules)

1. **Module Formation (#1)** : 
   - Adaptive Learning Paths recommandées basées sur profil Passeport + objectifs
   - Formation assignments : Coach assigne formation adaptée au niveau Dreyfus actuel

2. **Module JAC (#5)** :
   - JAC valide progression Dreyfus avec evidence-based assessment
   - Jalons alignés avec niveaux Dreyfus ciblés

3. **Module Missions Apprenantes (#9)** :
   - Track 1 Matching : Missions assignées aux apprenants selon compétences actuelles + objectifs
   - Chaque mission liée à 1+ compétences clés
   - Apprenant assigné = compétence + niveau ciblé

4. **Module Gamification (#7)** :
   - XP triggers : Points awarded from competence progression events (voir Source de Progression XP)
   - Badges : Automatically triggered quand competence atteint level 4+ (expert), etc.

5. **Module Coaching (#4)** :
   - Coach dashboard montre heatmap équipe (quelles compétences à développer)
   - Coach peut assigner missions/formations basées sur profil

6. **Module Journal (#10)** :
   - Apprenant peut linker evidence journal → competence progression
   - Coach utilise evidence pour valider progression (via JAC)

#### Passeport ← IN (Reçoit mises à jour)

1. **From Formation (#1)** :
   - Course completion : Apprenant complète formation → peut trigger competence progression (evidence collected)
   - Updates : Learning space item completion enregistrée, utilisable comme evidence

2. **From JAC (#5)** :
   - JAC validation : Coach valide JAC → updates `LearnerCompetency.current_level` + crée `CompetencyProgression` record
   - Evidence stored : Assessment notes + evidence linked pour audit trail

3. **From Missions Apprenantes (#9)** :
   - FAST validation : Coach valide FAST mission → updates compétences liées `current_level`
   - XP award : FAST validation → XP awarded (voir "Sources de Progression XP")

4. **From Coaching (#4)** :
   - Coach session : Après session coaching, coach valide competence progression
   - Direct update : Coach peut modifier target_level / objective pour apprenant (audit trail)

5. **From Gamification (#7)** :
   - XP earned : XP awarded from various sources, visible dans dashboard apprenant (voir "Sources")
   - Badges : Badges liées aux compétences visible dans profil apprenant

---

## 📱 Écrans à Concevoir

### Front-Office (FO - React)

| Écran | Rôle | Description | Priorité |
|-------|------|-------------|----------|
| **Radar Personnel** | Apprenant | Vue principale : radar 6 axes (actuels vs objectifs), liste compétences par domaine H/S/O, filtres | P0 |
| **Détail Compétence** | Apprenant | Modal : définition, niveau actuel, objectif, critères Dreyfus 1-5, prochaines étapes, roadmap personnelle | P0 |
| **Définir Objectifs** | Apprenant | Form simple : sélectionner compétence, choisir niveau cible, date limite, confirmation | P0 |
| **Dashboard Coach** | Coach | Heatmap équipe (compétences × apprenants), codes couleur Dreyfus, drill-down par compétence/apprenant | P0 |
| **Détail Apprenant** | Coach | Vue profil apprenant : radar, objectifs actifs, progressions, boutons assignation (Formation/Mission Apprenante) | P1 |
| **Historique Progression** | Apprenant/Coach | Timeline ou graphique : évolution niveaux Dreyfus (dernier 6 mois), évènements (JAC, missions complétées) | P1 |

### Back-Office (BO - WordPress Admin)

| Écran | Rôle | Description | Priorité |
|-------|------|-------------|----------|
| **Arbores Référentiel** | Admin | Hiérarchie H/S/O : domaines, sous-domaines, compétences. CRUD avec expansion/collapse. Recherche, tags. | P0 |
| **Éditer Compétence** | Admin | Form : nom, description, domaine, 5 niveaux Dreyfus (label + criteria détaillés), tags | P0 |
| **Import Référentiel** | Admin | Upload CSV ou manual entry. Validation, rapport erreurs, preview avant confirm | P0 |
| **Audit Log** | Admin | Historique modifications (qui/quand/quoi), filter par date/utilisateur, export CSV | P1 |
| **Analytics Dashboard** | Admin | Stats globales : compétences les plus utilisées, taux complétion objectifs, avg team levels | P1 |

---

## ⚙️ Fonctionnalités (MVP)

### Core
1. **Référentiel H.S.O hierarchisé** - Admin crée/maintient compétences (80+) dans 3 domaines (Hard/Soft/Out), avec 5 niveaux Dreyfus chacune. CSV import/export optionnel.
2. **Profil Apprenant** - Chaque apprenant a des compétences actuelles (niveaux 1-5) + objectifs (niveau cible + date). Éditable par Coach/Admin, visible par Apprenant.
3. **Radar Compétences** - Visualisation graphique 6 axes (actuels vs objectifs) pour apprenant + tableau détail par domaine H/S/O. Refresh real-time.
4. **Définir Objectifs** - Apprenant peut déclarer objectif pour 1 compétence (choisir niveau 1-5, date cible). Coach notifié. Historisé.
5. **Dashboard Coach** - Heatmap équipe (compétence × apprenant), codes couleur, alertes gaps critiques. Drill-down pour assignation.
6. **Assignation Missions Apprenantes** - Coach assigne Mission Apprenante (TLS-Learning) liée à 1+ compétence(s) à un apprenant. Apprenant notifié.
7. **Validation Progression (JAC)** - Coach peut valider progression apprenant (2→3, 3→4, etc) via JAC ou assessment manuel. Historisé avec evidence.
8. **Notifications** - Apprenant notifié de : objectif confirmé, progression validée, coach recommendation, mission assignée.

### Secondary
9. **Recherche Compétences** - Fuzzy match par nom/domaine/tag en FO (apprenant trouve ses compétences rapidement).
10. **Export Analytics** - Admin peut exporter : team competency heatmap, progression history, objectif completion rates (CSV/Excel).
11. **Soft-delete Compétences** - Admin peut archiver compétences sans supprimer données historiques. Réassignment optionnel vers nouvelle compétence.
12. **Audit Log Complet** - Toutes modifications Admin logged (qui/quand/quoi). Traçabilité intégrité données.

---

## 📈 Sources de Progression XP (Visibilité MVP)

**IMPORTANT :** L'XP est **VISIBLE aux apprenants dès MVP** (pas hidden). Chaque action gagne des points, affichés en temps réel dans dashboard apprenant.

### Format XP : Variabilité & Paramétrage BO

Les valeurs XP ci-dessous sont **paramétrables en Back-Office par Admin** et peuvent varier selon :
- Type de compétence (Hard/Soft/Out)
- Niveau Dreyfus cible
- Contexte module (formation vs mission vs coaching)
- Configuration organisationnelle

**Admin BO peut modifier tous les multiplicateurs via interface CRUD dédiée.**

### Source 1 : Formation & Learning Space

| Action | Description XP | Condition |
|--------|---|---|
| **Item Learning Space complété** | Points pour chaque item (exercice, leçon) | Apprenant complète item avec score ≥60% |
| **Leçon/Module complété** | Bonus XP au completion du module | Apprenant finit tous les items du module |
| **Bonus semaine de formation** | Bonus XP collecteur | 3+ items complétés cette semaine (optionnel) |

**Exemple :** "Formation IA Module 1" = item 1 (50 XP) + item 2 (50 XP) + item 3 (50 XP) + bonus module (100 XP) = ~250 XP total (valeurs paramétrables)

### Source 2 : JAC (Jalons Compétences) — VALIDATION SEULEMENT, PAS D'XP

| Action | Description | Raison |
|--------|---|---|
| **JAC submission** | Apprenant soumet JAC | Evidence collectée, pas de points awarded |
| **JAC validation (Coach)** | Coach valide JAC | Compétence **validée** (updates `LearnerCompetency.current_level`) |
| **XP from JAC** | ❌ **ZÉRO XP** | JAC prevents content farming — no points awarded |

**Clarification :** JAC's purpose = **validate competence progression** sans inciter à l'abus/gaming. XP vient d'autres sources (missions, formation, coaching). Coach valide competence = progression factuelle, pas jeu.

### Source 3 : Missions Apprenantes (AFEST) — FAST VALIDATION = XP

| Action | Description XP | Condition |
|--------|---|---|
| **RIEC preparation** | Points pour préparation mission (RIEC questionnaire) | Apprenant complète RIEC structure |
| **FAST validation (Coach)** | Points importants pour FAST post-action reflection | Coach valide FAST après mission completion |
| **Competence progression** | XP lié au niveau Dreyfus validé | FAST validation = updates competence + awards XP |

**Exemple :** "Mission Budget Q3" = RIEC submission (20 XP) + FAST validation (200 XP) + competence progression (level-dependent) = ~220+ XP total (paramétrable)

### Source 4 : Veille & Contenu Externe

| Action | Description XP | Condition |
|--------|---|---|
| **Article lu (Veille)** | Points par article complet | Apprenant lit article entièrement |
| **Bonus semaine lecture** | Bonus collecteur si 5+ articles | 5+ articles lus dans semaine |
| **Contenu externe tagué** | Points si contenu lié à competence | Si contenu taggé vers competence apprenant |

**Exemple :** 1 article = 10 XP, bonus semaine 5 articles = 50 XP, soit ~100 XP/semaine de lecture active (paramétrable)

### Source 5 : Coaching Sessions

| Action | Description XP | Condition |
|--------|---|---|
| **Message coaching** | ❌ **PAS DE XP** par message | Messages seuls ne donnent pas points |
| **Competence validation post-session** | XP awarded après session coaching | Coach valide competence après 1-1 session |
| **Coach-initiated progression** | XP = competence level progression | Progression validée + documented par coach |

**Exemple :** Session coaching Leadership → coach valide niveau 2→3 → apprenant gagne XP pour cette progression (montant paramétrable selon niveau)

### Source 6 : Badges (Triggers, pas XP source directe)

| Action | Description | Condition |
|--------|---|---|
| **Badge earned** | Badges triggered par other XP sources | Badge earned ≠ separate XP source |
| **Example : "Expert" badge** | Triggered quand competence atteint level 4+ | Automatically triggered from progression, no additional XP |

### Vue d'Ensemble Sources XP

```
Formation & Learning Space
    ↓ (Item + Module + Bonus)
    
Missions Apprenantes (AFEST)
    ↓ (RIEC + FAST validation)
    
Veille & Contenu Externe
    ↓ (Articles + Bonus)
    
Coaching Sessions
    ↓ (Post-session validation)
    
        → 👤 APPRENANT DASHBOARD (VISIBLE)
           • Total XP (updated real-time)
           • Current Level (XP thresholds)
           • Progress Bar (towards next level)
           • Recent XP events (log)
           
JAC Validation
    → Competence validation ONLY (NO XP)
    → Prevents farming/gaming
    
Badges
    ← Auto-triggered from competence levels
    ← Not separate XP source
```

### XP Visibility en MVP

- **Apprenant** : Voit XP total, niveau actuel, progression % en dashboard personnel (temps réel)
- **Coach** : Peut voir XP apprenant en analytics (team engagement trends)
- **Admin** : Manage XP multipliers + thresholds en Back-Office, voir trends globaux

### XP Configuration Back-Office (Admin)

Admin peut paramétrer (values per organization/module):
- Points par item Learning Space complété
- Points par module complété
- Points RIEC submission
- Points FAST validation
- Points article lu
- Points post-coaching session
- XP threshold pour level-up (1000 XP = level 2, 2500 XP = level 3, etc.)
- Enable/disable XP sources by organization

---

## 🚀 Possible Évolutions (V2+)

### V2 (Septembre 2026)
- **Matching IA Mistral** : Auto-suggest Missions Apprenantes basées sur compétences/objectifs + Projets (TLS-SBO) disponibles
- **Auto-tagging Contenu** : Formation/articles taggés automatiquement vers compétences pertinentes (Mistral)
- **Leaderboards Compétences** : Classement apprenants par domaine H/S/O (opt-in) + top achievers badges
- **Adaptive Learning Paths** : Formation recommandée dynamiquement selon profil Passeport
- **Certification Compétence** : Export PDF certificat apprenant (niveau atteint, date)
- **Intégration Projets (TLS-SBO)** : Afficher Projets assignés apprenant + competences requises pour objectifs opérationnels

### V3 (Q1-Q2 2027)
- **Peer Feedback** : Apprenants/Coaches donnent feedback informel sur compétences pairs (contexte apprentissage continu)
- **Competency Path Templates** : Modèles pré-définis (ex: "DevOps Engineer path") = ensemble compétences + progression recommandée
- **Skills Marketplace** : Apprenant peut offrir expertise (ex: coach d'autres sur Communication), tracked en Passeport
- **Mobile App** : Vue radar + objectifs sur React Native (iOS/Android)

### V4 (2028+)
- **Blockchain Credentials** : Certifications compétence vérifiables (blockchain-backed)
- **Integration RH Systèmes** : Sync avec Paie/SIRH pour structure org + rôles attendus
- **Predictive Analytics** : ML-powered : "Alice dépassera Leadership 4 en 6 semaines si...recommendations"
- **SBO Operating System** : Passeport core de l'OS complet (matching Projets, compensation, Talent Pipeline)

---

## 🎯 Positionnement Initial via Questionnaire

### Flow Questionnaire → Passeport Seeding

**Étape 1: Conversation Hooks (Operational Objectives Selection)**
- Apprenant voit 2-3 amorces de conversation (operational objectives)
  - Ex: "Objectif: Devenir Manager", "Objectif: Expertise Technique", "Objectif: Entrepreneur"
  - Chaque objective a un set de 5-10 compétences liées
- Apprenant sélectionne 1-2 objectifs
- Feedback: Objective sélectionné, "Loading competencies..." ~500ms

**Étape 2: Mistral Conversational Questionnaire**
- Mistral engage conversation sur les compétences du set sélectionné
- Apprenant répond conversationnellement (pas formulaire rigide)
- Mistral détecte confidence signals dans réponses (sûr / pas sûr / doute)
- Loop: Mistral question → Apprenant response → Mistral interprets (5-15 turns)
- Durée: ~5-10min, progress bar visible

**Étape 3: Dreyfus Translation + Confidence Scoring**
- Mistral calcule Dreyfus level (1-5) **+ confidence score (0-100%)** per competency
- IF confidence >= 60%: Seed Passeport silently, show success
- IF confidence < 60%: Show validation modal to apprenant

**Étape 4: Validation Gate (IF confidence < 60%)**
- Modal affiché: "Je pense tu es Dreyfus [X] en [Competency]. Confirmes-tu?"
- Options: "Confirmer" / "C'est moins que ça" / "C'est plus que ça"
- Apprenant peut ajuster si needed
- Seed with final level + timestamp + source ('questionnaire_manual_confirm')

**Étape 5: Uncertainty Handling**
- Si doute détecté dans conversation (keywords: "maybe", "not sure", "don't know") → Mistral assign Dreyfus level -1
- Exemple: Apprenant répond "Je crois" (pas sûr) → assign 2/5 au lieu de 3/5
- Log confidence score pour traçabilité

**Étape 6: Success & Passeport Seeded**
- "✅ Ton Passeport est initialisé avec [N] compétences"
- Show preview: radar + competency list (seeded competencies only)
- Other 280+ competencies remain hidden (lazy-loading via XP-triggered visibility)
- CTA: "Vois tes objectifs de progression" → Passeport dashboard

**Feedback UX:**
- Modal smooth, all competencies seeded <1s per competency after apprenant validates
- Timeout protection: If Mistral takes >10s per question, offer "Skip this" option
- Draft save: Apprenant can exit mid-questionnaire, resume later

### Data Structure (DB)

Add to `competency_assessments` table:

| Colonne | Type | Description |
|---------|------|-------------|
| `id` | UUID | Primary key |
| `learner_id` | UUID | FK to learner |
| `competency_id` | UUID | FK to competency |
| `dreyfus_level` | INT (1-5) | Initial Dreyfus level (from Mistral) |
| `confidence_score` | INT (0-100) | Mistral confidence % |
| `validated_by_learner` | BOOL | User confirmed if confidence < 60%? |
| `manual_override_level` | INT (1-5) NULL | If user adjusted Dreyfus |
| `created_at` | DATETIME | Timestamp seeding |
| `updated_at` | DATETIME | Timestamp last correction |
| `source` | ENUM | 'questionnaire_auto' / 'questionnaire_manual_confirm' / 'manager_correction' |
| `manager_id` | UUID NULL | If manager made correction |

---

## 👥 User Journeys (Format 3)

### User Journey #1 : Apprenant → Découverte du Radar

**Acteur :** Apprenant (nouvel utilisateur post-onboarding)  
**Déclencheur :** Premier accès au dashboard après création compte  
**Objectif :** Comprendre son profil actuel et identifier ses zones de progression

#### Étapes Détaillées

1. **Apprenant accède au dashboard après onboarding**
   - Post-création compte : Apprenant voit landing page avec CTA "Découvrez votre Passeport Compétences"
   - OU apprenant clique menu "Mon Passeport"
   - Système charge données profil apprenant (compétences actuelles filtrées par module)
   - Feedback : Page en cours de chargement ~500ms, affiche skeleton loading
   - Données du cache utilisées si offline
   - Durée : ~500ms pour load initial

2. **Système affiche radar personnel interactif**
   - Radar SVG 6 axes (Hard Skills, Soft Skills, Out Skills top 2 chacun)
   - Chacune avec niveau Dreyfus actuel (1-5, code couleur)
   - Code couleur : 🟢 Vert (≥4 Expert/Maître), 🟠 Orange (2-3 Apprenant/Compétent), 🔴 Rouge (1 Novice)
   - Tableau complémentaire listant 15-20 compétences clés avec progression % (current/target)
   - Filtre par domaine (H/S/O) + recherche par nom
   - Feedback : Radar + tableau instantané (cached), hover affiche tooltip niveau
   - Durée : Instant

3. **Apprenant clique sur 1 compétence pour détails**
   - Exemple : "Prise de Décision" (actuellement 2/Apprenant, objectif 4/Compétent)
   - Modal ouvre côté droit (responsive sur mobile = fullscreen)
   - Affiche :
     - 📌 Titre + icône domaine (Hard/Soft/Out)
     - 📝 Définition 1-2 phrases claires
     - 📊 Jauge progression : Niveau actuel (2/5) vs Objectif (4/5) = 40% progress
     - 🎯 Critères Dreyfus détaillés :
       - Niveau 1 (Novice) : "Comprend concepts fondamentaux"
       - Niveau 2 (Apprenant) : "Applique sous supervision" ← VOUS ÊTES ICI
       - Niveau 3 (Compétent) : "Fonctionne indépendamment"
       - Niveau 4 (Expert) : "Conseille et enseigne" ← VOTRE OBJECTIF
       - Niveau 5 (Maître) : "Innove et crée nouveau référentiel"
   - Feedback : Modal fluide, animations smooth
   - Durée : ~300ms

4. **Apprenant voit "Feuille de route personnalisée"**
   - Section 1 : Prérequis immédiats pour atteindre niveau 3 (Compétent)
     - ✓ Formation recommandée : "Decision Framework 101" (8h, TLS-Learning plugin)
     - ✓ Mission Apprenante : "Participer à réunion décision (avec validation)" [TLS-Learning]
     - ✓ Lectures : "Decision Making Basics" (article)
   - Section 2 : Pour atteindre niveau 4 (Expert)
     - ✓ Projet optionnel : "Budget Planning Q3" où pratiquer [TLS-SBO]
     - ✓ Coaching sessions : Coach peut proposer 1-1s
   - Section 3 : Qui progresse sur cette compétence?
     - "3 membres de votre équipe visent aussi Prise de Décision" (anonyme)
   - Feedback : Chaque item cliquable = détails, assignations
   - Durée : Instant (lazy-loaded si besoin)

5. **Apprenant clique "Définir mon objectif"** (optionnel)
   - Modal simple :
     - Sélecteur niveau cible : Slider ou radio buttons (3-5, car actuellement 2)
     - Sélecteur date : "Je veux atteindre ça d'ici..." (30j, 60j, 90j, custom date)
     - Optionnel : Ajouter note motivationnelle ("Pourquoi cette compétence?")
   - Système valide :
     - Niveau > niveau actuel (sinon error)
     - Date > aujourd'hui (sinon error)
   - Enregistre en DB + crée entry dans CompetencyObjective
   - Feedback : "Objectif enregistré ✓ Votre coach a été notifié"
   - Notification push/email : Coach reçoit "Alice a défini objectif Leadership 4 d'ici 3 mois"
   - Durée : ~400ms (form) + 200ms (confirmation)

6. **Apprenant ferme modal, revoit radar global**
   - Radar se met à jour : la compétence affiche maintenant "2→4" et objectif date affichée au hover
   - Couleur peut changer si date passée ou niveau objectif irréaliste (warning orange)
   - Système remonte compétence dans "Top 3 Objectifs" du dashboard
   - Feedback : Animation smooth, confirmation visuelle
   - Durée : ~200ms

#### Conditions de Succès ✅
- [ ] Radar charge en <800ms
- [ ] Couleurs et labels Dreyfus affichés correctement
- [ ] Clic sur compétence ouvre détail sans erreur
- [ ] Objectif sauvegardé en DB
- [ ] Coach notifié quand objectif défini
- [ ] Pas de scroll lag sur radar (mobile 60fps)

#### Erreurs & Edge Cases ❌

**Cas 1 : Apprenant sans compétences initiales**
- Scénario : Nouvel apprenant juste après onboarding, profil vide
- Comportement attendu :
  - Affiche message "Bienvenue ! Ton profil va se remplir au fur et à mesure"
  - Propose wizard de 4 questions : "Quels domaines t'intéressent ?" (multi-select)
  - Pré-remplit radar avec compétences suggérées (niveau 1)
  - Feedback : Wizard OK → Radar initialisé
- Impact : ~5 min pour apprenant

**Cas 2 : Apprenant offline puis reconnecté**
- Scénario : Apprenant perd connexion Internet après avoir chargé radar
- Comportement attendu :
  - Cache local fonctionne (radar visible)
  - Clic sur compétence charge depuis cache
  - Détention tentative de modifier = "Besoin de connexion pour enregistrer"
  - Une fois reconnecté : Sync automatique
- Impact : Expérience dégradée mais lisible

**Cas 3 : Référentiel H.S.O indisponible**
- Scénario : Import référentiel échoué, DB vide
- Comportement attendu :
  - Admin voit message : "⚠️ Référentiel manquant, importez données"
  - Apprenant voit : "Données en cours de chargement... Réessayez"
  - Pas de crash, graceful degradation
- Impact : Critique, bloque déploiement

**Cas 4 : Compétence avec 100+ critères Dreyfus**
- Scénario : Compétence complexe avec descriptions très longues
- Comportement attendu :
  - Description compétence = max 2 lignes (ellipsis si >)
  - Criterias Dreyfus en accordion (expand/collapse)
  - Scrollable modal si besoin
- Impact : UX reste clean


---

### User Journey #2 : Coach → Monitoring Équipe & Assignation Missions Apprenantes

**Acteur :** Coach (manager de competences)  
**Déclencheur :** Dashboard Coach, accès journalier  
**Objectif :** Identifier les compétences critiques manquantes chez l'équipe, proposer développement via Missions Apprenantes (TLS-Learning)

#### Étapes Détaillées

1. **Coach accède "Dashboard Équipe"**
   - Coach clique menu "Passeport → Mes Apprenants" (ou Dashboard Équipe)
   - Système charge données équipe (authentification rôle=Coach)
   - Données chargées depuis cache (last sync <5 min ago)
   - Liste des 15-20 compétences clés pré-sélectionnées par Admin
   - Formatage : Tableau interactif avec 8 colonnes (Compétence | Alice | Bob | Charlie | Diana | ... | Avg Team)
   - Feedback : Loading skeleton 500ms, puis affichage instantané (cached)
   - Durée : ~800ms pour première visite, <200ms pour revisits
   - Code couleur immédiat :
     - 🟢 Vert (4-5) = Couvert
     - 🟠 Orange (2-3) = À développer
     - 🔴 Rouge (1) = Critique/Manquant

2. **Coach voit "Heatmap des Gaps" et Alertes Critiques**
   - Système trie compétences par "gap coverage" (combien en dessous de niveau 3)
   - Top des alertes remontent en haut (cards rouges avec warning icon ⚠️)
   - Exemple card : "🔴 CRITIQUE : Leadership (avg 2.1/5) — 4 apprenants < niveau 3"
   - Chaque compétence = 1 ligne avec :
     - Nom + icône domaine (H/S/O)
     - Barre progression (avg team level bar)
     - Cellules individuelles (mini-radar pour chaque apprenant)
     - Stats : "2/8 au niveau 4+, 5/8 < 3"
   - Feedback : Heatmap se peint progressivement (animation 1s)
   - Bouton CTA par compétence : "Développer cette compétence"
   - Durée : Instant (déjà chargé)

3. **Coach clique sur 1 compétence rouge "Leadership"**
   - Modal s'ouvre côté droit (desktop) ou fullscreen (mobile)
   - Affiche :
     - 📌 Titre "Leadership (Hard Skill)" + définition 1 phrase
     - 📊 Niveau moyen équipe : 2.1/5 (comparé à benchmark industrie si dispo)
     - 👥 Détail par apprenant (liste 8 rows) :
       | Apprenant | Niveau Actuel | Objectif | Progression | Statut |
       | Alice | 2 | 3 | →→ (30% ) | Active, 1.5 mo |
       | Bob | 1 | 2 | → (10%) | New, 3 mo |
       | etc. |
     - 🎯 Qui progresse : "4/8 apprenants ont un objectif actif sur Leadership"
     - 📚 Ressources disponibles :
       - Formation "Leadership Foundations" (8h)
       - Mission Apprenante "Budget Decisions Q3" (liée à Prise de Décision)
       - Coaching 1-1 (optionnel)
   - Feedback : Modal slide-in smooth, drill-down interactif
   - Chaque apprenant = clickable row (pour voir détail profil)
   - Durée : ~300ms

4. **Coach clique sur 1 apprenant "Alice"** (row dans détail compétence)
   - Modal imbriqué ouvre profil Alice :
     - 📍 Profil snapshot : "Alice | Département Commercial | Depuis 6 mois"
     - 🎯 Leadership actuel : 2/5 (Apprenant)
     - 🔝 Objectif : 3/5 (Compétent) d'ici 1.5 mois
     - Critères Dreyfus pour niveau 3 :
       - ✓ Prend décisions sans supervision constante
       - ✓ Évalue options vs contexte métier
       - ✓ Communique justification
     - 📈 Progression historique : Timeline graphique (dernier 6 mois, 0 changement = flat line)
     - 🔗 Liés à : 
       - Formation "Decision Framework 101" (8h, not started)
       - Mission Apprenante "Budget Q3" (in progress, 40% done)
     - Boutons actions : [Modifier Objectif] [Assigner Mission] [Proposer Coaching]
   - Feedback : Profil se charge en modal, éditable en mode Coach
   - Options modif : Changer objectif level (radio buttons 1-5), changer date cible (date picker)
   - Durée : ~400ms pour load profil

5. **Coach clique "Assigner Mission Apprenante"**
   - Popup sélection s'ouvre avec liste missions disponibles :
     - Filtrées par compétence actuelle (Leadership ou dérivées)
     - Affiche :
       | Mission Apprenante | Durée | Compétences | Effort | Fit |
       | "Budget Decisions Q3" | 2 sem | Leadership, Prise Décision | 8h | ⭐⭐⭐⭐ Excellent |
       | "Team Feedback Session" | 1 sem | Leadership, Communication | 4h | ⭐⭐⭐ Bon |
       | "Strategy Planning" | 4 sem | Leadership, Vision | 16h | ⭐⭐⭐ Bon |
   - Coach sélectionne "Budget Decisions Q3"
   - Système enregistre : Assignment record (coach_id, learner_id, mission_id, competence_id, assigned_at)
   - Système envoie notification à Alice :
     - 📧 Email : "Coach a assigné une Mission Apprenante pour Leadership"
     - Message : "Ta coach recommande : 'Budget Decisions Q3' (2 sem, 8h) pour développer Leadership"
     - CTA : "Voir détails mission" (lien vers Module Missions Apprenantes)
   - Feedback : "Mission Apprenante assignée à Alice ✓ Notification envoyée"
   - Badge ajouté au profil Alice : "1 mission active" (dans coach dashboard)
   - Durée : ~500ms (assignment + notification)

6. **Coach peut exporter rapport équipe**
   - Option 1 : Export Excel (report builder)
     - Sélectionne :
       - Périmètre : Toute équipe, ou filtre par département/compétence
       - Colonnes : Compétence | Apprenant | Niveau Actuel | Objectif | Progression | Missions Assignées
       - Format : Wide (apprenant en colonne) ou Long (une ligne par apprenant)
     - Données : Snapshot current state + 6-month historique (optional)
     - File générée : "Team_Competencies_[date].xlsx"
   - Option 2 : PDF summary
     - 1-page report : Heatmap image + top 3 alerts + recommendations
   - Feedback : "Export en cours... Téléchargement dans 5s"
   - Durée : ~2s pour Excel 100 rows, ~1s pour PDF

#### Conditions de Succès ✅
- [ ] Dashboard charge en <1s pour équipe 100+
- [ ] Heatmap actualise sans rechargement quand profil change
- [ ] Drill-down sur compétence affiche liste complète apprenants
- [ ] Coach peut modifier objectif apprenant
- [ ] Assignment mission synchro vers apprenant
- [ ] Export Excel ≥95% correct
- [ ] Mobile responsive (tableaux scrollables)

#### Erreurs & Edge Cases ❌

**Cas 1 : Équipe >50 apprenants, table surchargée**
- Scénario : Coach a 80 apprenants, tableau impossibly large sur écran
- Comportement attendu :
  - Virtual scroll (affiche 20 rows à la fois, lazy-load rest)
  - Pagination option (20/50/100 par page)
  - Recherche/filtrer apprenant par nom (input search)
  - Filtrer par département/rôle/équipe (si multi-équipe)
  - Collapse/expand competences (affiche top 5 par défaut)
  - Compact mode toggle : bascule de "wide" (1 col/apprenant) à "long" (1 ligne/apprenant)
- Feedback :
  - Search : "Filtering... 3 matches" (instant)
  - Virtual scroll : smooth, <16ms per frame (60fps)
  - Compact toggle : "Switched to compact view"
- Impact : Performance reste <2s pour 100 apprenants
- Test : 100 learners × 20 competencies = 2000 cells rendered

**Cas 2 : Coach modifie objectif apprenant sans raison**
- Scénario : Coach change Alice 2→5 (Leadership) sans justification clue
- Comportement attendu :
  - Step 1 : Coach ouvre profil Alice, voit "Modifier Objectif" button
  - Step 2 : Clique → modal confirmation : "Passer de 2/5 à 5/5 ?"
  - Step 3 : Confirmation avec warning : "⚠️ Objectif très ambitieux (3 niveaux, 1.5 mois insuffisant?)"
  - Step 4 : Système demande : "Ajouter note justificative?" (textarea optionnel)
  - Step 5 : Texte suggéré : "Pourquoi cette augmentation?" (placeholder)
  - Step 6 : Après save, audit trail auto-créé :
    - `who:` Coach_id
    - `when:` timestamp
    - `what:` "target_level 2→5"
    - `why:` note texte (ou "none" si non remplie)
  - Feedback : "Objectif modifié ✓ Note archivée pour audit"
- Impact : Intégrité données + accountability
- Admin peut voir audit log : "Coach X changed Alice's objective [2→5] on 2026-05-10, note: [text]"

**Cas 3 : Coach voit données d'apprenants d'autres équipes (permissions bug)**
- Scénario : Coach_A tente accéder profil apprenant de Coach_B (cross-équipe)
- Comportement attendu :
  - Backend API : Filtre obligatoire `WHERE learner_id IN (coach.team_member_ids)`
  - Si Coach tente URL directe d'apprenant hors équipe : 403 Forbidden
  - Front-End : Dashboard affiche seulement équipe assignée du Coach
  - Si apprenants assignés changent (admin change team) :
    - Cache invalidé
    - Dashboard refresh automatique
    - Coach notifié : "Your team has changed"
  - Audit log : Admin note "Coach A tried to view unauthorized learner B (timestamp)"
- Impact : Sécurité data protégée

**Cas 4 : Assignation mission mais apprenant a déjà >3 missions actives**
- Scénario : Coach assigne mission apprenante à Alice qui en a 3 déjà
- Comportement attendu :
  - Système détecte : "Alice has 3 active missions (8h + 6h + 10h = 24h)"
  - Warning : "⚠️ Adding 8h mission = 32h total. Recommend spreading over 2 weeks?"
  - Options :
    - Procéder (Coach peut overload apprenant)
    - Annuler
    - Suggérer date démarrage ultérieure (ex: "Commencer dans 1 semaine")
  - Feedback : Coach choisit → notif Alice = missions + timeline
- Impact : Évite overload accidental

**Cas 5 : Mission Apprenante liée existe pas ou est archivée**
- Scénario : Admin a archivé mission "Budget Q3", Coach essaye de l'assigner
- Comportement attendu :
  - Filtre : Missions actuelles seulement (archived = invisible)
  - Si Coach tente URL directe de mission archivée :
    - Erreur : "Mission no longer available"
    - Suggestion : "Similar active missions : [list]"
  - Audit log : "Tried to assign archived mission [id]"
- Impact : Cohérence données, pas de liens cassés


---

### User Journey #3 : Admin → Gestion du Référentiel

**Acteur :** Admin système  
**Déclencheur :** Setup initial du Passeport ou maintenance référentiel  
**Objectif :** Importer/maintenir la hiérarchie H.S.O, ajouter compétences, gérer Dreyfus criteria

#### Étapes Détaillées

1. **Admin accède "Back-Office → Passeport"**
   - Admin navigue dashboard WP : "Passeport Compétences" menu
   - Sous-menus chargent : 
     - 📂 Compétences (gestion référentiel)
     - 📋 Critères Dreyfus (viewing only, edit en-ligne)
     - 📤 Import/Export (bulk operations)
     - 📋 Audit Log (historique modifications)
     - 📊 Analytics (stats usage)
   - Système load page principale :
     - Arbores gauche (navigation)
     - Contenu droit (détails)
     - Top stats : "80 compétences actives | 320 apprenants | 12 objectifs atteints ce mois"
   - Feedback : Page load ~500ms (WP admin standard)
   - Durée : ~500ms

2. **Admin voit arbores Compétences hiérarchisée**
   - Affichage tree structure :
     ```
     📁 Domaines (H.S.O)
       ├─ 🔵 Hard Skills (30 compétences)
       │   ├─ 🟠 Leadership (8)
       │   │   ├─ Prise de Décision [2 apprenants]
       │   │   ├─ Gestion Équipe [5]
       │   │   └─ Vision Stratégique [1]
       │   └─ 🟠 Communication (6)
       │       ├─ Écoute Active [10]
       │       ├─ Présentation [7]
       │       └─ Négociation [3]
       ├─ 🟢 Soft Skills (28 compétences)
       │   └─ 🟡 Collaboration (12)
       └─ 🟡 Out Skills (22 compétences)
     ```
   - Interactions :
     - Expand/collapse domains (toggle + icon)
     - Hover = affiche count apprenants liés
     - Competence = clickable (edit mode)
     - Search box (top) = filtre tree par nom
   - Feedback : Tree animate smooth, expand <200ms
   - Couleurs :
     - 🔵 Hard = bleu
     - 🟢 Soft = vert  
     - 🟡 Out = orange
   - Durée : Instant (pre-loaded)

3. **Admin clique sur 1 compétence** (ex: "Communication → Présentation")
   - Détail panel s'ouvre côté droit (ou modal)
   - Affiche snapshot :
     - 📌 Titre "Présentation"
     - 📝 Description (2-3 phrases)
     - 📊 Domaine : Soft Skills > Communication
     - 🎯 Niveau catégorie : Avancée
     - 👥 Liée à : "7 apprenants" (link → voir qui)
     - 📈 Trend : "3 niveaux UP ce mois, 1 nouveau apprenant"
     - 🔗 Compétences connexes : "Leadership (3 shared apprenants), Écoute Active"
     - Critères Dreyfus 1-5 (accordion, expandable)
     - Buttons : [Edit] [Archive] [View Learners] [Duplicate] [Delete]
   - Feedback : Slide-in panel smooth
   - Durée : ~300ms

4. **Admin clique "Edit"** → Modal d'édition
   - Formulaire complet :
     - **Section 1 : Basics**
       - Nom compétence (text input, validation : 255 chars max, pas spéciaux)
       - Description (textarea, 200-500 chars recommended, character counter)
       - Domaine (dropdown : Hard / Soft / Out)
       - Sous-domaine (dropdown, dépend du domaine sélectionné)
       - Niveau catégorie (radio : Base | Avancée | Spécialisée)
       - Tags (text input, comma-separated ou multi-select)
     - **Section 2 : Critères Dreyfus** (each expandable)
       - Niveau 1 (Novice) : textarea → "Comprend concepts fondamentaux" [character count]
       - Niveau 2 (Apprenant) : textarea → "Applique sous supervision"
       - Niveau 3 (Compétent) : textarea → "Fonctionne de façon autonome"
       - Niveau 4 (Expert) : textarea → "Guide et enseigne"
       - Niveau 5 (Maître) : textarea → "Innove et définit nouveaux standards"
       - ⚠️ Warning si text < 20 chars ou > 500 (yellow flag)
       - ✓ Green checkmark si criteria cohérentes (auto-checked)
     - **Section 3 : Actions**
       - Buttons : [Save Changes] [Cancel] [Preview] [Delete Competency]
   - Validation inline :
     - Nom vide → "Requis"
     - Criteria 1 > Criteria 2 logiquement? → "Criteria semblent incohérentes"
     - Domaine vide → "Sélectionner domaine"
   - Feedback : Form state = "unsaved changes" badge rouge (si modifié)
   - Durée : ~400ms (form render)

5. **Admin sauvegarde les modifications**
   - Admin clique [Save Changes]
   - Système valide :
     - [ ] Nom unique (pas 2 "Présentation" dans Communication)
     - [ ] Criteria Dreyfus progression logique (compare niveau 1→2, 2→3, etc)
     - [ ] Tous champs obligatoires remplis
   - Si validations échouent → Affiche error messages inline (red) + scroll to field
   - Si validations réussies :
     - Enregistre en DB (Competence table + DreyfusLevel records)
     - Crée audit trail entry :
       ```json
       {
         "admin_id": "uuid",
         "competence_id": "uuid",
         "action": "update",
         "timestamp": "2026-05-09T14:32:10Z",
         "changes": {
           "name": "Présentation (unchanged)",
           "description": "old_text → new_text",
           "dreyfus_3": "old_criteria → new_criteria"
         }
       }
       ```
     - Feedback : Toast notification "Compétence mise à jour ✓ [voir audit]"
     - Panel refresh (reload détail compétence)
   - Durée : ~500ms (save + validation)

6. **Admin import/export données en masse**
   - **Option A : Export CSV (sauvegarde)**
     - Bouton [Export All] (or filtrer par domaine)
     - Système génère CSV :
       ```
       domain,subdomain,competence,level_category,dreyfus_1,dreyfus_2,dreyfus_3,dreyfus_4,dreyfus_5,tags
       Hard,Communication,Présentation,Avancée,"Comprend...","Applique...","Fonctionne...","Guide...","Innove...",Soft-skill,Leadership
       Soft,Collaboration,Écoute,Base,"Écoute...","Applique...","Autonome...","Enseigne...","Innove...","Communication"
       ...
       ```
     - File : "Passeport_Competences_Export_2026-05-09.csv"
     - Feedback : "Generating... (80 rows) | Download" (auto-download ou link)
     - Durée : ~2s
   - **Option B : Import CSV (chargement en masse)**
     - Bouton [Import Competencies]
     - Step 1 : File upload
       - Drag-drop zone (ou file picker)
       - Accepte : .csv (max 10MB)
       - Feedback : "File selected: [name]"
     - Step 2 : Preview
       - Affiche tableau : first 5 rows (preview)
       - Colonnes détectées auto
       - Count total rows : "120 competencies detected"
       - Option : Configurer mapping (si colonnes différentes)
     - Step 3 : Validation
       - Système parse CSV + valide :
         - [ ] Domaine valide (Hard/Soft/Out)
         - [ ] Competence name unique
         - [ ] Criteria Dreyfus coherent
       - Report :
         ```
         ✓ 110 lignes valides
         ⚠️ 10 lignes warnings (niveau_5 seems weak?)
         ❌ 0 lignes erreurs
         ```
     - Step 4 : Confirm & Import
       - Option 1 : "Import all valid + warnings" (skip errors, si aucun)
       - Option 2 : "Import only valides" (skip 10 warnings)
       - Option 3 : "Annuler" (retour)
       - Admin confirme
       - Système enregistre :
         - Crée nouvelles Competence records
         - Crée DreyfusLevel records
         - Crée audit entry : "Imported 110 competencies from CSV"
         - Batch job logs (timestamps, counts)
     - Feedback : Progress bar (1/3 → 2/3 → 3/3) + final summary
       - "Import complete! ✓ 110 competencies added | [View audit log]"
     - Durée : ~5s (parse + validate), <1s (import)

#### Conditions de Succès ✅
- [ ] Arbores affiche 50+ compétences sans lag
- [ ] Edit form valide criteria Dreyfus (règles logiques)
- [ ] Lien vers apprenants affiche count correct
- [ ] Import CSV avec 100+ lignes réussit en <5s
- [ ] Audit log trace toutes modifications (qui/quand/quoi)
- [ ] Delete physique impossible (archive ou soft-delete)
- [ ] Recherche compétence par nom (fuzzy match)

#### Erreurs & Edge Cases ❌

**Cas 1 : Admin supprime compétence utilisée par 500+ apprenants**
- Scénario : Admin clique [Delete] sur "Email Management" (utilisée par 500 apprenants, 120 objectifs actifs)
- Comportement attendu :
  - Step 1 : Warning modal apparaît
    ```
    ⚠️ ATTENTION : Cette compétence affecte :
    • 500 apprenants
    • 120 objectifs actifs
    • 45 missions apprenantes en cours
    
    Options :
    [ ] Option 1 : Archive compétence (apprenants gardent données historiques)
    [ ] Option 2 : Soft-delete + redirection (assigner nouvelle compétence)
    [ ] Option 3 : Annuler suppression
    ```
  - Step 2 : Si Admin choisit Option 2 (redirection)
    - Affiche dropdown : "Vers quelle compétence rediriger?"
    - Admin sélectionne "Communication" (compétence similaire)
    - Système propose mapping auto : "500 apprenants → Communication niveau [ajuster]"
    - Admin peut modifier niveau (ex: "Email niveau 2 → Communication niveau 1")
  - Step 3 : Admin confirme
    - Système exécute batch job :
      - Crée soft-delete flag (is_archived = true)
      - Crée bulk update : LearnerCompetency records remappent vers "Communication"
      - Crée audit entries pour chaque changement
      - Notifie apprenants : "Email Management compétence archived, redirected to Communication"
    - Feedback : Progress bar (1/500 → 250/500 → 500/500 complete)
    - Result : "Competency archived, 500 learners reassigned ✓ [view audit]"
  - Impact : Zero data loss, transparent pour apprenants
  - Durée : ~10s pour 500 reassignments

**Cas 2 : Criteria Dreyfus incohérentes ou faibles**
- Scénario 2a : Admin édite "Présentation", niveau 5 = "Novice" (typo, incohérent avec 1)
  - Validation inline : "⚠️ Niveau 5 seems weak (Novice?) — typically Expert/Master"
  - Admin tente save → Error message apparaît :
    ```
    ❌ Validation failed:
    • Niveau 5 criteria must be > Niveau 4 (progression)
    • Your Niveau 5: "Novice"
    • Suggestion: Try "Innovates and defines new presentation standards"
    ```
  - Admin ne peut pas sauvegarder tant que non fixé
  - Feedback : Red outline champ Niveau 5, inline edit helper
- Scénario 2b : Criteria are very similar (level 3 ≈ level 4, hard to distinguish)
  - Validation warning : "⚠️ Niveau 3 & 4 are very similar. Consider differentiating."
  - Non-blocking (Admin peut ignorer), mais flaggé
  - Suggestion : "Niveau 4 should include 'teaches' or 'advises' language"
  - Feedback : Yellow warning badge
- Durée : ~500ms validation check

**Cas 3 : Import CSV avec données manquantes ou format incorrect**
- Scénario 3a : CSV a "domain" vide pour 50/200 lignes
  - Step 1 : Validation report affiche :
    ```
    Import Preview: 200 rows detected
    ✓ 150 rows valid
    ⚠️ 50 rows warnings (domain missing)
    ❌ 0 rows errors
    
    Sample warnings:
    • Row 25: competence "Écoute" has no domain — suggest Hard/Soft?
    • Row 78: competence "Team Work" has no domain — suggest Hard/Soft?
    ```
  - Step 2 : Admin options :
    - Option A : "Auto-assign by competence name" (AI suggestion, optionnel)
    - Option B : Bulk edit warnings (select domain for missing rows)
    - Option C : Download error report (télécharger CSV des problèmes)
    - Option D : Import valid only + skip warnings
  - Admin choisit Option B
    - Affiche form : Select domain pour chaque warning
    - Dropdown pour chaque row (Hard/Soft/Out)
    - Confirm button
  - Step 3 : Confirm import
    - Système enregistre toutes 200 rows (150 OK + 50 fixed)
    - Audit log : "Imported 200 competencies, 50 required manual domain assignment"
- Scénario 3b : CSV has wrong column names
  - Step 1 : System detects columns
    - Expected : domain, subdomain, competence, level_category, dreyfus_1..5
    - Got : Domaine (french), skills, name, level, criteria
  - Step 2 : Mapping dialog
    ```
    Column Mapping (auto-detected or manual):
    Domaine → [domain] ✓ (auto)
    skills → [competence] ✓ (auto)
    name → [needs mapping] ← Admin clicks
    level → [level_category] ✓
    criteria → [dreyfus_1-5] ← needs clarification
    ```
  - Admin maps manually (drag-drop ou select)
  - Confirm → validation + import
- Durée : ~2s validation, ~5-10s import (dépend corrections)

**Cas 4 : Admin modifie compétence, beaucoup d'apprenants affectés**
- Scénario : Admin change Dreyfus criteria pour "Leadership" (100+ apprenants)
  - Exemple : Niveau 3 old = "independent", new = "guides team" (+ demandant)
  - Apprenants actuels au niveau 3 = peut-être plus valides?
  - Comportement :
    - Step 1 : Admin change criteria, clique Save
    - Step 2 : System détecte changement + impact :
      ```
      ⚠️ Criteria change affects:
      • 45 apprenants actuellement niveau 3 (may no longer meet new criteria)
      • 12 apprenants ont objectif niveau 3 (might need adjustment)
      • 8 missions liées à ce niveau
      
      Recommendation: Notify learners + Coaches of criteria update
      ```
    - Step 3 : Admin options :
      - "Proceed + notify all" (send notification)
      - "Proceed silently" (no notification, audit log only)
      - "Cancel"
    - Step 4 : Admin procède
    - Notifications envoyées :
      - Coaches : "Leadership criteria updated — review your team's levels"
      - Apprenants (affected) : "Leadership Niveau 3 criteria updated — still valid?"
    - Audit log : "Admin X updated Leadership criteria, 45 apprenants may be affected"
- Impact : Transparency + data integrity

**Cas 5 : Import/Export très gros fichier (5000+ rows)**
- Scénario : Admin import CSVcompétences externe (très gros)
  - File upload : "competencies_full_2026.csv" (5000 rows)
  - System détecte large file size
  - Step 1 : Affiche warning
    ```
    ⚠️ Large file detected (5000 rows)
    Estimated import time: ~30 seconds
    We'll process in background. You can close this page.
    ```
  - Step 2 : Backend queues job
    - Async import (Job background)
    - Admin voit progress : "Validating... 2000/5000" (real-time update)
  - Step 3 : Completion
    - Email notification : "Import complete: 4800 competencies added, 200 warnings"
    - Downloadable report : CSV of warnings/errors
    - Audit log : Full trail
  - Impact : No UI blocking, background processing
  - Durée : ~30s for 5000 rows


---

## 🗄️ Modèle de Données

### Entités Principales

#### 1. **Competence** (compétence du référentiel)
| Colonne | Type | Description |
|---------|------|-------------|
| `id` | UUID | Clé primaire |
| `name` | String(255) | Nom compétence (ex: "Prise de Décision") |
| `description` | Text | Description 200-500 mots |
| `domain` | Enum | Domaine parent (Humain, Savoirs, Organisation) |
| `subdomain` | String | Sous-domaine (ex: "Communication") |
| `level_category` | Enum | Base \| Avancée \| Spécialisée |
| `created_at` | DateTime | Timestamp création |
| `updated_at` | DateTime | Timestamp dernière modif |
| `is_archived` | Boolean | Soft-delete |

#### 2. **DreyfusLevel** (critères pour chaque niveau)
| Colonne | Type | Description |
|---------|------|-------------|
| `id` | UUID | Clé primaire |
| `competence_id` | FK | Lien vers Competence |
| `level` | Int (1-5) | Niveau Dreyfus |
| `label` | String(50) | Novice, Apprenant, Compétent, Expert, Maître |
| `criteria` | Text | Définition du niveau (ce qu'il faut savoir faire) |
| `indicators` | JSON | Indicateurs de succès (liste) |

#### 3. **LearnerCompetency** (profil apprenant)
| Colonne | Type | Description |
|---------|------|-------------|
| `id` | UUID | Clé primaire |
| `learner_id` | FK | Lien Apprenant |
| `competence_id` | FK | Lien Compétence |
| `current_level` | Int (1-5) | Niveau Dreyfus actuel |
| `target_level` | Int (1-5) | Objectif (peut être NULL) |
| `target_date` | Date | Quand atteindre l'objectif |
| `last_assessed_at` | DateTime | Dernière évaluation |
| `assessed_by` | FK | Coach qui a évalué |
| `assessment_notes` | Text | Notes d'évaluation |
| `created_at` | DateTime | Quand ajouté au profil |
| `updated_at` | DateTime | Dernière modif |

#### 4. **CompetencyProgression** (historique progression)
| Colonne | Type | Description |
|---------|------|-------------|
| `id` | UUID | Clé primaire |
| `learner_competency_id` | FK | Lien LearnerCompetency |
| `from_level` | Int | Ancien niveau |
| `to_level` | Int | Nouveau niveau |
| `changed_at` | DateTime | Quand la progression |
| `changed_by` | FK | Coach/Admin qui a validé |
| `source` | Enum | JAC validation \| Assessment \| Mission completion \| Manual |
| `evidence` | JSON | Preuves de progression |

#### 5. **CompetencyObjective** (objectifs définis par apprenant)
| Colonne | Type | Description |
|---------|------|-------------|
| `id` | UUID | Clé primaire |
| `learner_id` | FK | Apprenant |
| `competence_id` | FK | Compétence |
| `target_level` | Int (1-5) | Niveau souhaité |
| `target_date` | Date | Date limite |
| `status` | Enum | Active \| Achieved \| Abandoned |
| `created_at` | DateTime | Quand objectif défini |
| `completed_at` | DateTime | Quand atteint (NULL si pas atteint) |

### Relations

```
Competence (1) ──→ (many) DreyfusLevel
             ├──→ (many) LearnerCompetency
             └──→ (many) CompetencyObjective

LearnerCompetency (1) ──→ (many) CompetencyProgression

Learner (1) ──→ (many) LearnerCompetency
        └──→ (many) CompetencyObjective
```

### Schéma Simplifié (Mermaid)

```mermaid
erDiagram
    COMPETENCE ||--o{ DREYFUS_LEVEL : defines
    COMPETENCE ||--o{ LEARNER_COMPETENCY : measures
    LEARNER ||--o{ LEARNER_COMPETENCY : has
    LEARNER_COMPETENCY ||--o{ COMPETENCY_PROGRESSION : tracks
    LEARNER ||--o{ COMPETENCY_OBJECTIVE : sets
    COMPETENCE ||--o{ COMPETENCY_OBJECTIVE : targets
    COACH ||--o{ ASSESSMENT : records
    ASSESSMENT ||--o{ COMPETENCY_PROGRESSION : triggers

    COMPETENCE : string name
    COMPETENCE : string description
    COMPETENCE : enum domain
    COMPETENCE : enum level_category

    DREYFUS_LEVEL : int level (1-5)
    DREYFUS_LEVEL : string criteria
    DREYFUS_LEVEL : json indicators

    LEARNER_COMPETENCY : int current_level
    LEARNER_COMPETENCY : int target_level
    LEARNER_COMPETENCY : date target_date
    LEARNER_COMPETENCY : timestamp assessed_at

    COMPETENCY_PROGRESSION : int from_level
    COMPETENCY_PROGRESSION : int to_level
    COMPETENCY_PROGRESSION : timestamp changed_at
    COMPETENCY_PROGRESSION : enum source

    COMPETENCY_OBJECTIVE : int target_level
    COMPETENCY_OBJECTIVE : date target_date
    COMPETENCY_OBJECTIVE : enum status
```


---

## ✅ Critères d'Acceptation MVP

### Fonctionnalités Core
- [x] Référentiel H.S.O 80+ compétences avec Dreyfus 1-5
- [x] Apprenant voit radar personnel (actuel vs objectif)
- [x] Coach voit heatmap équipe + drill-down
- [x] Admin peut CRUD compétences + import/export CSV
- [x] API REST complète (CRUD + Dashboard)

### Expérience Utilisateur
- [x] Radar charge <800ms
- [x] Dashboard Coach responsive (50+ apprenants)
- [x] Modal détail compétence sans lag
- [x] Form edit validée (Dreyfus cohérents)

### Données & Intégrité
- [x] Soft-delete compétences (pas suppression physique)
- [x] Audit log toutes modifications Admin
- [x] Validation Dreyfus (1<2<3<4<5 logiquement)
- [x] Import CSV avec gestion erreurs

### Performance & Scalabilité
- [ ] Query radar = indexed (competence_id, learner_id)
- [ ] Dashboard heatmap 100+ apprenants = <2s
- [ ] Pagination ou virtual scroll pour listes longues
- [ ] Cache côté client (Radar) avec sync offline

### Sécurité
- [ ] Auth token JWT requis (401 si manquant)
- [ ] Rôle-based access (Apprenant ≠ Coach ≠ Admin)
- [ ] Apprenant ne peut lire que son profil
- [ ] Coach peut lire équipe seulement
- [ ] Admin peut tout lire/écrire

### Compatibilité
- [ ] Front-Office React (desktop + mobile 375px+)
- [ ] Back-Office WordPress admin panel
- [ ] API REST (JSON, gzip, CORS)
- [ ] DB PostgreSQL (ou compatible)

---

## 🔗 Dépendances Inter-Modules

### Dépend De
**Aucun module** (foundational)

**Données externes :**
- Référentiel H.S.O (fichier CSV ou import initial)
- Hiérarchie Compétence → OO → Mission (structure)

### Bloque

| Module | Raison | Impact |
|--------|--------|--------|
| **#3 Onboarding** | Profil initie avec compétences de base | Vital |
| **#1 Formation** | Adaptive paths nécessitent profil Passeport | Vital |
| **#5 JAC** | Jalons = validation compétences | Vital |
| **#7 Gamification** | XP & badges = progression Dreyfus | Vital |
| **#9 Missions** | Matching apprenant ↔ missions via compétences | Vital |
| **#10 Journal** | Evidence linking = preuves compétences | Haute |

### Ordre Implémentation
```
✅ Phase 1 (Semaine 1-2)
  └─ Module #2 : Passeport Compétences (FONDATION)

   ↓ Dépendances

⏳ Phase 2 (Semaine 3+)
  ├─ Module #3 : Onboarding (dépend Passeport)
  ├─ Module #1 : Formation (dépend Passeport)
  ├─ Module #7 : Gamification (dépend Passeport)
  └─ Module #5 : JAC (dépend Passeport + Formation)
```

---

## 📊 Analytics & Métriques

### Quoi Tracker (Events)

| Événement | Contexte | Valeur |
|-----------|----------|--------|
| `competency_viewed` | Apprenant consulte fiche compétence | competence_id, learner_id |
| `objective_set` | Apprenant définit objectif | competence_id, target_level, date |
| `objective_achieved` | Apprenant atteint objectif | competence_id, days_to_achieve |
| `level_assessed` | Coach évalue niveau apprenant | competence_id, new_level, source |
| `competency_progression` | Progression tracked | competence_id, from→to_level |
| `assessment_submitted` | Apprenant soumet evidence (JAC) | evidence_type, competence_id |

### Dashboards par Rôle

#### Dashboard Apprenant
- Radar personnel (actuels vs objectifs)
- Progression timeline (dernier 6 mois)
- Prochaines étapes (missions, formations recommandées)
- Stats : "3/10 objectifs complétés ce trimestre"

#### Dashboard Coach
- Heatmap équipe (compétences clés)
- Alertes : "Leadership < 2 chez 3 apprenants"
- Progressions actives (qui progresse vers quoi)
- Recommandations : "Assigner 'Decision Framework' à Alice"

#### Dashboard Admin
- Import/export history
- Compétences les plus utilisées
- Audit log modifications
- Health check : "Données intègres ?"

### Calculs Clés

| KPI | Formule | Refresh |
|-----|---------|---------|
| **Avg Team Level (compétence)** | SUM(learner_levels) / COUNT(learners) | Real-time |
| **Competency Coverage** | COUNT(level≥3) / COUNT(total) * 100 | Real-time |
| **Progress Velocity** | (target_level - current_level) / days_remaining | Daily |
| **Objective Completion Rate** | COUNT(achieved) / COUNT(active) * 100 | Daily |

---

## 📅 Planning & Budget Estimé

### Effort Total : 60-80 heures

#### Breakdown par Phase

| Phase | Composant | Effort (h) | Timeline |
|-------|-----------|-----------|----------|
| **Back-End** | Modèle DB Passeport | 8 | S1 (J1-2) |
| | API REST endpoints (7) | 16 | S1 (J2-3) |
| | Import/export CSV | 6 | S1 (J3) |
| | Validation Dreyfus logic | 4 | S1 (J1) |
| **Front-End** | Radar component React | 12 | S1-2 (J4-5) |
| | Coach dashboard + heatmap | 10 | S2 (J1-2) |
| | Admin panel (CRUD) | 8 | S2 (J2-3) |
| **Admin/Back-Office** | WordPress plugin setup | 4 | S1 (J1) |
| **Testing & QA** | Unit tests API | 6 | S2 (J4) |
| | Intégration tests | 4 | S2 (J4) |
| | UAT & feedback cycles | 2 | S2 (J5) |
| **TOTAL** | | **~80h** | **2 semaines** |

#### Dépendances Critiques
- Référentiel H.S.O doit être finalisé avant déploiement
- Database migration avant Back-End dev
- Dreyfus criteria document avant Front-End

#### Précisions Nécessaires (À valider avec Pierre)
- [ ] Hiérarchie exacte H.S.O : Combien de domaines? Combien de compétences?
- [ ] Source référentiel : CSV fourni? Saisie manuelle Admin?
- [ ] Intégration Missions : Comment lier Compétence ↔ Mission (table de mapping)?
- [ ] XP pour progression : Combien de XP par niveau Dreyfus?
- [ ] Notifications : Email ou in-app seulement?

---

## 🚀 Prochaines Étapes

1. **Valider spécifications avec Pierre**
   - Wireframes OK?
   - Dépendances claires?
   - Précisions nécessaires identifiées?

2. **Recevoir données référentiel H.S.O**
   - CSV 80+ compétences + hiérarchie
   - Ou plan import/saisie manuelle Admin

3. **Lancer implémentation Phase 1**
   - Back-End DB + API
   - Front-End Radar apprenant
   - Admin import référentiel

4. **Intégration Phase 2**
   - Coach dashboard
   - Lier à Onboarding (#3)
   - UAT avec équipe

---

## 📞 Questions Bloquantes

**Aucune blocante majeure identifiée à ce stade.**

Points à clarifier avant dev (pas bloquants) :
- Hiérarchie H.S.O exacte (domaines, subdomains, 80 vs 120 compétences?)
- Source référentiel initial (CSV file, Notion export, ou saisie manuelle Admin?)
- Intégration Missions (quelle table? Foreign key?)
- XP par niveau (50? 100? 150 points?)
