# 5 Gamification & Badges

**Version:** MVP Juillet 2026  
**Status:** 🟢 Spécification en cours  
**Effort estimé:** 70-80h  
**Timeline:** Semaines 7-9 (Phase 2)

---

## 📖 Vue d'Ensemble

### Objectif Métier
Créer un système de gamification unifié avec **3 types de badges** (Plateforme, Open Badges Officiels, Compétences) + **XP visible** + **Streaks** qui récompense l'engagement des apprenants. L'objectif est d'augmenter la fréquence d'engagement (visite quotidienne, participation active, complétion de parcours) tout en maintenant une progression transparente du profil de l'apprenant dans son parcours d'apprentissage SBO. Badges Plateforme sont configurables (nom, description, image, trigger events). **Atrophie logic s'applique UNIQUEMENT aux Badges Compétences** (rétrogradation si inactivité 90j).

### Qui l'Utilise (Rôles)
- **Apprenant** : Gagne badges et XP, voit progression gamifiée, consulte tableau de bord personnel avec streaks et badges
- **Coach** : Suit engagement apprenant (streaks, badges unlock), peut accéder à analytics gamification par apprenant
- **Admin** : Gère configuration badges plateforme (nom, description, image, triggers, seuils), configure Badges Compétences (couleurs, auto-triggers, atrophie settings), gère Open Badges (prestataire, révocation)
- **Manager** : Voit trends engagement équipe (badges earned, streaks actifs, XP distribution)

### Scope — IN / OUT

#### ✅ IN (MVP Juillet)
- Système XP centralisé avec points visibles en temps réel
- Badges Plateforme (configurables : nom, description, image, trigger events)
- Badges streaks (journal de bord + engagement général)
- Badges certifications (JAC achievements)
- Badges modules/parcours (complétion milestones)
- **Badges Compétences (Dreyfus-level based, 5 niveaux par compétence avec couleurs fixes : Bleu/D1, Argent/D2, Or/D3, Platinum/D4, Diamant/D5)**
- **Open Badges Officiels (OB 2.0 custom self-hosted, email-based identity, RFC 5545 compliant)**
- Assertions générées localement + JSON signed + QR codes intégrés
- Évolution future vers OB 3.0 (DIDs) en V3 Q1-Q2 2027
- Dashboard apprenant : streaks, badges earned, badges in progress, recently unlocked
- Notifications badge unlock (in-app + opt-in email)
- Admin BO : gestion badges plateforme (CRUD, configuration nom/description/image/triggers, seuils)
- Admin BO : configuration Open Badges (prestataire settings, issued badges management)
- Analytics gamification : distribution badges, engagement by streak, XP distribution
- Leaderboards infrastructure (NOT visible MVP, ready for V2)
- Mobile responsive dashboard
- **Atrophie logic (rétrogradation Badges Compétences UNIQUEMENT si inactivité 90j, intégration Passeport)**

#### ❌ OUT (Déféré V2+)
- Leaderboards visibles apprenants (infrastructure ready, visibility V2)
- Social badges (First Responder, Helpful Expert) — ces features vont en V1 Module Veille/Social Learning
- Badge trading ou gifting
- Quest system ou achievement chains
- Seasonal/limited badges

### Dépendances Critiques

**Dépend de:**
- **Passeport Compétences** (Module #2) : Dreyfus levels pour badges compétences, XP system foundation, **atrophie logic triggers Dreyfus rétrogradation** (90j inactivité)
- **Formation & Learning Paths** (Module #1) : Module/Parcours completion events, XP allocation par activité
- **Journal de Bord** (Module #10, V1) : Streak triggers (journal entries)
- **JAC** (Module #5) : Badge unlock triggers (JAC completion, Dreyfus level validation)
- **Notifications** (Module #09) : Badge unlock notifications, achievement alerts
- **Analytics foundation** (Module #8 BO) : Gamification dashboard, reporting

**Bloque:**
- **Back-Office & Analytics** (Module #8) : Requires XP/badge data model and reporting endpoints
- **Masterclass** (Module #12, V1) : Badge unlock triggers for attendance/participation

### Ordre Implémentation
```
✅ Phase 0 (Passeport + Formation)
  └─ Passeport Compétences, Formation Paths, Base XP system

   ↓ 

⏳ Phase 2 (Semaine 7-9)
  ├─ Gamification cahier (THIS MODULE)
  └─ Dépend : Formation completion events, Passeport Dreyfus levels

   ↓

⏳ Phase 3+ (V1 September+)
  ├─ Journal Réflexif (adds streak trigger)
  └─ Leaderboards (infrastructure ready)
```

---

## 📱 Écrans à Concevoir

### Front-Office (React)

| Écran | Rôle | Description | Priorité |
|-------|------|-------------|----------|
| **Gamification Dashboard** | Apprenant | Page personnelle : streaks actuels + milestones, total badges earned (Plateforme + Compétences), recently unlocked timeline, next badges in progress avec progress bars, badge detail modals | P0 |
| **Badge Detail Page** | Apprenant | Badge info modal with: badge icon, nom, description, rarity/color, unlock condition, unlock date, share achievement button, **credit cost display ("Costs 1 credit"), current balance check ("You have [X] credits"), conditional claim button state** (if insufficient: shows deficit + "Buy credits" button; if sufficient: "Claim" button green). Post-claim: "✅ Claimed on [Date]" + Open Badge link | P0 |
| **Streak Detail View** | Apprenant | Expandable section in dashboard : current streak count, started date, activity log par jour (✅/❌ pour chaque jour), next milestone progress | P1 |
| **Badge Gallery (Marketplace)** | Apprenant | Grid of available badges showing: badge icon, name, description, **credit cost badge ("1 credit")**, quick claim button on hover (if sufficient balance: "Claim"; if insufficient: "Buy + Claim") | P1 |
| **Badge Gallery (Profile)** | Apprenant | Sur profil apprenant : 3 sections (Plateforme badges + Compétences badges + Open Badges Officiels), grille 3-4 colonnes responsive, unlock dates, tooltip hover | P1 |
| **Open Badges Section (Profile)** | Apprenant | Liste Open Badges Officiels validés (Projet Final achievements) : badge name, issuer logo, date issued, buttons [Download Certificate, Verify, Share to LinkedIn] + QR code | P0 |
| **Compétences Badges Section** | Apprenant | Grille Dreyfus-level badges par compétence (5 niveaux : Bleu/D1, Argent/D2, Or/D3, Platinum/D4, Diamant/D5), couleurs progressives, atrophie indicator (badge grayed out si inactif 90j) | P0 |
| **Coach Engagement Analytics** | Coach | Dashboard : list apprenants + streaks actuels, badges earned count (Plateforme + Compétences), XP earned this week, weekly engagement trend sparkline, atrophie warning (apprenants avec badges dégradés) | P1 |

### Back-Office (WordPress Admin)

| Écran | Rôle | Description | Priorité |
|-------|------|-------------|----------|
| **Badge Management CRUD (Plateforme)** | Admin | Create/Edit/Delete badges plateforme : nom, description, icon/image, rarity (common/uncommon/rare/epic/legendary), category (streaks/modules/jac/veille/coaching/journal), trigger condition (select from dropdown: journal_entries, jac_completion, module_completion, etc.), unlock threshold value, active/inactive toggle | P0 |
| **Badge Triggers Config** | Admin | Configure trigger conditions: event type, threshold, applyTo (all/specific modules/roles), condition logic | P0 |
| **Compétences Badges Configuration** | Admin | Configure Dreyfus-level badges per compétence : 5 levels (D1-D5) with fixed colors (Bleu/Argent/Or/Platinum/Diamant), assign picto per compétence, auto-trigger rules, atrophie settings (90j inactivity threshold, rétrogradation rules) | P0 |
| **Open Badges Management** | Admin | List issued Open Badges, view issuer integration (Credly/Badgr/Applaud), revoke badges, view evidence URLs, QR codes, download certificates, export issued badges list | P0 |
| **Streak Configuration** | Admin | Configure streak system : enable/disable, reset hour (timezone), badges thresholds (3/7/30 jours modifiable), reset behavior, display settings | P1 |
| **Atrophie Configuration** | Admin | Configure atrophie logic : inactivity threshold (90j), rétrogradation rules, Passeport integration settings, automation schedule (daily @02:00), view affected users report | P0 |
| **Gamification Analytics Dashboard** | Admin/Manager | Charts : badges earned distribution (top 10 badges), engagement by streak level, XP earned distribution, cohort comparison (by module/stage/role), atrophie impact analysis, export capability | P1 |
| **User Badge Management** | Admin | Admin override: view user badges (Plateforme + Compétences + Open), reset badge, reset streak, manually grant badge, revoke Open Badge | P2 |

---

## ⚙️ Fonctionnalités (MVP)

### Core (MVP Juillet)

#### XP System
1. **XP System** - Centralised points allocation système (visible en temps réel) avec budget allocation par activité type. Apprenants voient leur XP total + XP par module + historical gains. XP non-resettable (cumulative). Triggers : journal_entry (+5 XP), module_complete (+25 XP), jac_validation (+50 XP), challenge_completed (+15 XP).

#### Badges Plateforme (Internal Gamification)
2. **Badge System Plateforme** - Badges plateforme centralisés avec unified definition (icon, description, rarity 5 niveaux : common/uncommon/rare/epic/legendary, trigger, threshold). Support pour : 
   - Streak badges (3j/7j/30j avec milestones progressifs)
   - Module completion badges (milestone sur parcours, par module)
   - JAC achievement badges (Dreyfus level validation)
   - Engagement badges (journal entry regularity)
   - Coaching badges (participate in 1-1 sessions)
   
3. **Streaks Tracking** - Nombre de jours consécutifs avec activité (minimum 1 activité/jour, reset à minuit UTC). Support pour configurable thresholds (3/7/30 jours configurable). Milestone badges au passage des seuils. Visual indicator sur dashboard (fire 🔥 emoji, current count, next milestone).

#### Badges Compétences (Dreyfus-Level Based)
4. **Badges Compétences (5 Dreyfus Levels Standardisés)** - Pour chaque compétence : 5 badges progressifs avec couleurs fixes (D1→Bleu, D2→Argent, D3→Or, D4→Platinum, D5→Diamant) + picto compétence. Badges auto-triggés lors de validation JAC (Dreyfus level change). Apprenants voient progression visuelle par compétence. **Atrophie integration** : Si inactivité 90j → Dreyfus level décrémente dans Passeport → badge change couleur automatiquement (ex: Or→Argent).

#### Open Badges Officiels (IMS Standard)
6. **Open Badges Officiels (OB 2.0 Custom Self-Hosted)** - Système custom auto-hébergé pour issuer Open Badge 2.0 certificates après validation Projet Final. Implémentation locale :
   - Assertion generation (learner ID + badge metadata + issuance date + cryptographic signature)
   - QR code embedding (assertion JSON → scannable proof)
   - Downloadable certificate PDF (custom template with badge + learner details + verification URL)
   - Email-based identity (learner email = portable credential ID)
   - Public assertion endpoint (verification URL = /api/badges/assertions/{assertion_id})
   - V1: OB 2.0 only (stable standard, broad compatibility)
   - V3+: OB 3.0 migration (DIDs, self-contained credentials, blockchain-ready) — **0 data loss, transparent upgrade path**

#### Dashboard & Notifications
7. **Gamification Dashboard (FO)** - Page personnelle apprenant : My Streaks (current + milestones progress with visual counters), My Badges (Plateforme badges + Compétences badges progress + Open Badges count), Recently Unlocked (timeline des 5 derniers), Next to Unlock (progress bars pour next 5), Badge detail modals on click. Mobile responsive (hamburger menu, stackable sections).

8. **Badge Notifications** - In-app toast/banner on badge unlock (immediate, 3s display), opt-in email digest (weekly summary de badges earned + streaks updates), coach notifications (when apprenant unlocks major milestone). No push MVP (vs V2+ push notifications).

#### Back-Office Management
9. **BO Badge Management (Plateforme)** - CRUD badges plateforme avec configuration des champs : nom, description, image/icon, rarity (common/uncommon/rare/epic/legendary), category (streaks/modules/jac/coaching/engagement), trigger condition (select from dropdown: journal_entries, jac_completion, module_completion, etc.), unlock threshold value, active/inactive toggle. View badge statistics (earned count, adoption %). Import/export badge definitions.

10. **BO Compétences Badges Config** - Configure Dreyfus-level badges per compétence : assign picto (icon per competence), set auto-trigger rules, configure rétrogradation thresholds, view competence badge distribution per apprenant. Integration avec Passeport module.

11. **BO Open Badges Management** - Admin dashboard pour Open Badges : view issued Open Badges list (linked to parcours), view prestataire integration status, revoke compromised badges, export issued list, view QR code verification logs.

12. **Streak Management (BO)** - Configure streak system (enable/disable, reset hour with timezone selector, threshold values 3/7/30 jours modifiable), view streak distribution heatmap, admin override (reset user streak).

13. **Atrophie Management (BO) — Badges Compétences UNIQUEMENT** - Configure atrophie logic : inactivity threshold (90j default, modifiable), rétrogradation rules (how many Dreyfus levels per period), Passeport integration settings, automation schedule (cron @02:00 daily). View affected users report (who will be downgraded in next run), manual trigger atrophie check.

14. **Analytics & Reporting** - Badges earned distribution chart (top 10), engagement by streak level, XP distribution histogram, atrophie impact on Compétences badges (badges downgraded/month), user engagement cohort comparison, export CSV/JSON.

#### Open Badge Claim & Credit Cost

15. **Open Badge Pricing Configuration (BO)** - Admin configures Open Badge claim pricing globally or per-company : pricing_type (global_default | company_override), credit_cost (configurable per badge), effective_date (versioning for price changes). Config stored in credit_pricing table with badge_id, pricing_type, credit_amount, company_id (nullable for global). Supports multiple currencies and credit tiers.

16. **Open Badge Claim Workflow with Credit Display (FO)** - When apprenant clicks "Claim" Open Badge : system fetches credit_pricing for this badge, shows modal "Claim [Badge Name]" with credit cost displayed prominently ("This badge costs X credits to claim"), success criteria (JAC validation completed, competency level 3+), current user credit balance (Classic + Special), and [Confirm Claim] button. Modal includes 72-hour refund window notice.

17. **Open Badge Credit Consumption on Claim (FO + BE)** - When apprenant clicks [Confirm Claim], system: (a) validates user has sufficient credits (classic + special), (b) debits Special Credits first (if available), then Classic Credits, (c) creates badge_earned record with unlock_date = now, claim_type = "credit_claimed", (d) creates credit_transaction record (type: "open_badge_claim", amount: X, source_type: "badge_id", user_id, timestamp), (e) returns success response with badge detail. FO shows toast "✅ Badge claimed successfully" with refund window info.

18. **Open Badge 72-Hour Refund Eligibility & Process (FO + BE)** - Open Badge claims are refundable for 72 hours after unlock. In badge detail modal, apprenant sees [Request Refund] button (if within 72h window). Clicking triggers refund request modal: "Request Refund for [Badge]? You'll get X credits back." On confirmation, system: (a) checks refund_window (now - unlock_date ≤ 72h), (b) creates refund_request record (status: "pending", requested_by: user_id, badge_earned_id), (c) sends notification to approval_manager (if credits came from pool) or auto-approves (if individual purchase). Manager BO shows "Refund Queue" screen with pending refunds, can [Approve]/[Deny]. On approval: (a) credits returned to user, (b) refund_request status = "approved", (c) badge_earned marked as "refunded" (soft delete not applied, keeps audit trail), (d) credit_transaction reversed (new record: type="open_badge_refund", amount: -X).

### Badge Claiming with Credit Purchase (MVP)

19. **Badge Claim Cost**
   - 1 credit per badge (hardcoded, configurable in V2)
   - Displayed on badge detail page
   - Must-have credits to claim OR purchase inline

20. **Inline Purchase During Badge Claim**
   - If insufficient credits: Modal appears → Stripe checkout → Auto-claim after payment
   - Atomic operation: Credit purchase + badge claim together
   - Wallet updates immediately

### Secondary (MVP, Optional nice-to-have)
15. **Leaderboards Infrastructure** - Database tables + API endpoints ready, but NOT VISIBLE frontend MVP (ready for V2)

16. **Badge Achievement Share** - Button to share achievement on learner profile (copy badge link, social ready for V2)

---

## 🚀 Possible Évolutions (V2+)

### V2 (Septembre 2026)
- **Leaderboards visibles** : Global XP leaderboard, module-specific leaderboards, streak leaderboards (weekly/monthly/all-time)
- **Quest System** : Multi-badge achievement chains ("Complete 5 modules for quest badge")
- **Social Badges** : First Responder (integrated with V1 Veille module), Helpful Expert, Top Contributor (needs Social Learning)
- **Seasonal Events** : Limited-time badges for holiday events, seasonal challenges
- **XP Multipliers** : Boost weeks (2x XP), special events, cohort challenges

### V3+ (2027+)
- **Gamification AI** : Personalized badge recommendations, challenge suggestions based on learning profile
- **Peer Engagement** : Give feedback badges, comment badges, mentorship badges (requires social features)
- **Micro-credentials** : Digital credentials export (blockchain integration)
- **Real-world Rewards** : Redeem XP for coaching credits, course unlocks, certifications

---

## 👥 User Journeys (Format 3 — CRITICAL SECTION)

### User Journey #1 : Apprenant → Découvrir et Gagner Badges (First Badge Unlock)

**Acteur :** Apprenant (nouvel ou existant)  
**Déclencheur :** Apprenant complète une activité éligible (ex: complète module, écrit journal entry, valide JAC)  
**Objectif :** Comprendre système gamification, gagner premier badge, voir progression XP

#### Étapes Détaillées

1. **Apprenant complète module ou activité éligible (Formation/Journal/JAC)**
   - User action : Clique "Marquer comme complet" dans module OU clique "Envoyer" pour journal entry OU clique "Valider" pour JAC submission
   - System processing : Backend vérifie trigger condition (event: module_complete, journal_entry_count ≥ 1, jac_completion, etc.), vérifie seuils badge, crée badge_earned record, alloue XP points
   - Feedback : Page reste en focus, petite animation toast "🎉 Badge débloqué ! Vous avez gagné : [Badge Name]"
   - Durée : ~500ms (animation + toast)

2. **Toast notification apparaît avec badge unlock**
   - Sub-step 1: Toast apparaît bottom-right coin avec badge icon, badge name, "Congratulations!" message
   - Sub-step 2: Apprenant peut cliquer toast pour aller à Badge Detail, ou attendre 5s auto-dismiss
   - Feedback : Toast fluide slide-in animation, hover = stays visible, click = dismisses + navigate
   - Durée : ~3s visible (5s if user doesn't interact)

3. **Apprenant clique badge toast ou navigue à Gamification Dashboard**
   - User action : Clique toast notification OU navigate menu "Mon Profil" → "Gamification" (ou "Achievements")
   - System loading : Fetch user XP current + historical, fetch user badges + unlock dates, fetch streak data, fetch in-progress badges
   - Feedback : Loading skeleton while fetching, page loads <800ms typically, displays all sections instantly after load
   - Durée : ~800ms average (200ms with cache)

4. **Gamification Dashboard loads et affiche earned badge**
   - Dashboard displays:
     - My Streaks section : current streak count (si applicable), milestones progress (3/7/30 days), last activity date
     - XP Display : "Total XP: 450" avec mini chart last 30 days trending (line chart)
     - My Badges : total count, breakdown par catégorie (Streaks: 1, Modules: 2, JAC: 0, Veille: 0, Coaching: 0, Journal: 0)
     - Recently Unlocked : card for just-unlocked badge with "[Just now]" timestamp
   - Feedback : All sections instant visible, badge card highlighted/animated slightly to draw attention
   - Durée : Instant

5. **Apprenant clique badge detail pour plus d'information**
   - User action : Clique sur badge card dans "Recently Unlocked" ou "My Badges" section
   - System response : Modal ouvre côté droit (desktop) ou fullscreen (mobile), affiche : large badge icon, badge name, rarity color/label, description ("You earned this for completing the Formation module"), unlock condition ("Condition: Complete Formation module"), unlock date ("Unlocked: 2 hours ago"), next badge progression (si applicable)
   - Feedback : Modal smooth fade-in, click outside/X button closes
   - Durée : ~300ms

6. **Apprenant explore Next Badges section et voit progression**
   - Section displays : Top 5 un-earned badges with progress bars
   - Example: "Pathfinder: Complete 2 more modules (3/5) — ~2 weeks to unlock"
   - Progress bar shows : visual % filled (60%), text: "You've completed 3 of 5 modules", estimated unlock date
   - Feedback : Hover on badge → tooltip "Unlock by: [date], requires: [conditions]"
   - Durée : Instant

#### Conditions de Succès ✅
- [ ] Badge unlock detected in real-time (<500ms delay from action)
- [ ] Toast notification displays with correct badge name + icon
- [ ] Dashboard loads <800ms with all sections populated
- [ ] Badge detail modal displays correctly formatted with all required fields
- [ ] Recently Unlocked section shows correct date/time and badge details
- [ ] Next Badges section shows accurate progress calculation
- [ ] Mobile responsive : sections stack vertically, badge grid 2-col on mobile
- [ ] User can click multiple badges without performance degradation
- [ ] XP count displayed correctly matches database value

#### Erreurs & Edge Cases ❌

**Cas 1 : Apprenant complète activité mais trigger seuil NOT met**
- Scénario : Apprenant écrit son 1er journal entry (seuil pour "Journal Starter" badge est 5 entries)
- Comportement attendu :
  - Step 1: System allocates XP points for action (ex: +5 XP pour journal entry)
  - Step 2: XP updated on dashboard next reload, toast NOT shown (no badge unlock)
  - Step 3: Dashboard "Next Badges" shows "Journal Starter: 1/5 entries completed (20% progress)"
  - Step 4: Apprenant voit deadline estimate ("~4 more days if 1 entry/day")
- Impact : User sees progress toward badge, motivation maintained for next 4 entries

**Cas 2 : Multiple badges unlocked simultaneously (ex: module completion triggers 3 badges)**
- Scénario : Apprenant complète module complexe qui unlocks : "Module Master" + "Momentum" (3 modules done) + "Dreyfus Junior" badges in same action
- Comportement attendu :
  - Step 1: System detects 3 badge unlocks
  - Step 2: Toast displays first badge, then queues next 2 (appear sequentially ~2s apart)
  - Step 3: Dashboard "Recently Unlocked" shows all 3 with timestamps (seconds apart)
  - Step 4: Apprenant can click each for details independently
- Impact : Celebratory feel for major milestone, but doesn't overwhelm with 3 simultaneous toasts

**Cas 3 : Apprenant offline, then badge unlocks**
- Scénario : Apprenant offline (no internet), complète module locally, then reconnects
- Comportement attendu :
  - Step 1: Action queued locally (service worker caches action)
  - Step 2: On reconnect, sync triggered automatically
  - Step 3: Backend processes action, calculates XP + badges
  - Step 4: Toast notification shows after reconnect sync completes
  - Step 5: Dashboard reflects updated data (XP + badge) after refresh
- Impact : No lost data, user experience slightly delayed but complete

**Cas 4 : Double-submit / Race condition (user clicks "Complete" twice rapidly)**
- Scénario : User accidentally clicks "Module Complete" button twice in rapid succession
- Comportement attendu :
  - Step 1: First submit processed normally (XP allocated, badge unlocked)
  - Step 2: Second submit detects duplicate (idempotency check), returns 200 OK but NO additional XP/badges
  - Step 3: Toast shows for first submit only
  - Step 4: Dashboard reflects single badge unlock (not double-counted)
- Impact : Data integrity maintained, user doesn't see confusing double notification

**Cas 5 : Admin manually grants badge to user (override)**
- Scénario : Admin clicks "Grant Badge" for user in BO, selects badge + user
- Comportement attendu :
  - Step 1: Admin action recorded in audit log
  - Step 2: Badge added to user's earned badges
  - Step 3: Unlock date = today, notation "[Granted by Admin]" in badge detail
  - Step 4: User next sees dashboard = badge appears in "Recently Unlocked"
  - Step 5: User receives notification (in-app toast next login)
- Impact : Transparency maintained, user isn't surprised by manually granted badge

---

### User Journey #2 : Apprenant → Maintaining Streaks (Daily Engagement)

**Acteur :** Apprenant (with active streak)  
**Déclencheur :** Apprenant visite plateforme chaque jour pour activity (journal, coaching, training, etc.)  
**Objectif :** Maintenir streaks, voir progression, get milestones badges

#### Étapes Détaillées

1. **Apprenant visite plateforme et complète activité (jour 1-3)**
   - User action : Accès plateforme, complète activité (ex: écrit journal, suit formation, demande coaching)
   - System check : Backend vérifie : user has active session, record activity avec timestamp, check if today's activity exists
   - Feedback : Activity saved confirmation message, XP badge visible in activity ("+10 XP for journal entry")
   - Durée : Activity save ~200ms

2. **Jour 2-3 : Même ritual**
   - User repeat actions days 2 & 3, système track chaque jour de streak
   - Backend logs : activity_log record créé avec date = today, type = activity_type
   - Dashboard updates : streak counter shows "2 days 🔥", "3 days 🔥" progressively
   - Feedback : Visual counter increments daily, no additional notifications V1 (push reminders V2+)
   - Durée : ~200ms per activity

3. **Jour 3 milestone : Badge unlock "3 Jours de Suite"**
   - System detects : streak counter reached 3 (threshold configured in BO)
   - Badge triggers : 3j_streak badge creates + unlock
   - User sees : Toast "🔥 Badge débloqué: 3 Jours de Suite!", dashboard updates to show badge in Recently Unlocked + Streaks section shows ✅ next to "3-Day Milestone"
   - Feedback : Celebratory notification, streak section highlights milestone achievement
   - Durée : Instant after activity

4. **Apprenant checks Gamification Dashboard to see streak progress**
   - Dashboard "My Streaks" section shows:
     - Current Streak : "6 days 🔥" (if continuing past 3)
     - Last Active : "Today at 2:34 PM"
     - Milestones Progress:
       - ✅ 3-Day (achieved [date])
       - ⭕ 7-Day (X days to go)
       - ⭕ 30-Day (X days to go)
   - Feedback : Visual progress bar or milestone tracker shows which achieved vs in-progress
   - Durée : Instant on load

5. **Jour 4 : Apprenant misses activity (streak at risk)**
   - Scenario : User doesn't complete any activity on day 4 before midnight
   - System check : Daily job runs at configured reset hour (ex: 00:00 UTC+1), checks for activity on current day
   - If no activity : streak reset to 0, notification sent (V2+ feature for MVP = silent reset)
   - Dashboard on day 5 : streak counter shows "0 days", milestones reset to empty (⭕ 3-Day)
   - Feedback : User notices streak is gone when they return, can restart
   - Durée : Batch job runs daily, user discovers reset on next login

6. **Apprenant continues for 7+ days : reaches 7-day milestone**
   - System detects : 7-day threshold met
   - Badge unlocks : 7j_streak badge
   - Dashboard updates : "Milestone: 7-Day (achieved [date])", badge appears in Recently Unlocked + My Badges, Streaks section highlights milestone
   - Feedback : Toast notification, highlight animation in dashboard
   - Durée : Instant

#### Conditions de Succès ✅
- [ ] Streak counter increments daily for consecutive activities
- [ ] Streak resets to 0 if no activity within 24h window
- [ ] Milestone badges unlock at exact thresholds (3, 7, 30 days)
- [ ] Dashboard displays current streak + milestones progress
- [ ] User sees badge notifications when milestones hit
- [ ] Streak history visible (started date, activity log per day)
- [ ] Mobile shows streak progress clearly
- [ ] Timezone handling correct (reset hour respects user timezone or company timezone)
- [ ] Batch job runs reliably daily

#### Erreurs & Edge Cases ❌

**Cas 1 : Timezone edge case (user crosses midnight in different timezone)**
- Scénario : User in Paris (UTC+1) active until 23:30, then travels to New York (UTC-5), activity at 23:45 NY time (05:45 Paris time next day)
- Comportement attendu :
  - Step 1: Activity timestamp recorded with user timezone
  - Step 2: Streak logic uses configured reset timezone (ex: Europe/Paris company default)
  - Step 3: Activity at 05:45 Paris time = new day, streak counter increments
  - Step 4: User's local NY time shows activity "yesterday" but system counts it "today"
- Impact : User might be confused by timezone difference, but system is consistent

**Cas 2 : Activity batched from offline mode (service worker)**
- Scénario : User works offline for 2 hours, completes 3 activities locally, then reconnects
- Comportement attendu :
  - Step 1: Service worker queues all 3 activities with local timestamp
  - Step 2: On reconnect, sync sends all 3 with their timestamps
  - Step 3: Backend validates timestamps : if all within same day = streak continues, if mixed dates = multiple days possible
  - Step 4: Dashboard updates with all activities + streak counter accurate
- Impact : Offline experience doesn't break streak logic, timestamping critical

**Cas 3 : User manually resets their streak (request from user)**
- Scénario : User marks themselves inactive for a week, asks coach to reset streak manually
- Comportement attendu :
  - Step 1: Coach/Admin accesses user streak management in BO
  - Step 2: Clicks "Reset Streak" button (with confirmation dialog)
  - Step 3: Streak record updated : current_streak = 0, last_activity_date = [today or specific date]
  - Step 4: Notification sent to user (optional) : "Streak reset to 0"
  - Step 5: User's dashboard immediately reflects reset
- Impact : Transparent action, user can restart

**Cas 4 : System records same activity twice (duplicate)**
- Scénario : Network issue causes same journal entry to be saved twice with same timestamp
- Comportement attendu :
  - Step 1: First save processed normally
  - Step 2: Second save detected as duplicate (idempotency check on activity_id + timestamp)
  - Step 3: Database reject duplicate, no XP/streak counted twice
  - Step 4: Toast shows "Already saved" or silent success
- Impact : Streak integrity maintained

---

### User Journey #3 : Coach → Monitor Apprenant Engagement (Analytics View)

**Acteur :** Coach  
**Déclencheur :** Coach accède à son dashboard ou client details page  
**Objectif :** Vérifier engagement apprenant (streaks, badges, XP), identifier at-risk learners

#### Étapes Détaillées

1. **Coach accède à son Dashboard personnel**
   - User action : Login, clique "Mon Dashboard" ou "Mes Apprenants"
   - System loads : Fetch coach's assigned apprenants list, fetch each apprenant's XP, streaks, badges (last 7 days)
   - Dashboard displays : Table/cards de apprenants avec colonnes : Nom, Current Streak, Badges Earned This Week, XP This Week, Last Active (timestamp), Status (Active/At Risk/Inactive)
   - Feedback : Sorted par "Last Active" descending (most active first), filters available (by module, by stage, by streak status)
   - Durée : ~1.2s load (caching improves to ~400ms)

2. **Coach views apprenant with LOW engagement (no activity for 3+ days)**
   - Scenario : Coach notices "Jean" has 0-day streak, Last Active = 5 days ago, status = "At Risk"
   - System highlighting : Row highlighted in orange/warning color, "At Risk" badge visible, Last Active timestamp shows "5 days ago"
   - Feedback : Coach can click row to drill into apprenant details
   - Durée : Instant

3. **Coach clicks apprenant card/row for detailed view**
   - User action : Clicks "Jean" card or "View Details" button
   - System loads : Apprenant's detailed profile with:
     - Engagement summary : Current XP, XP earned this week, total badges, streaks history
     - Chart : XP earned last 30 days (line chart), Badges earned timeline (bar chart)
     - Streaks timeline : Historical streaks (peak streak: 12 days, current: 0, last active: 5 days ago)
     - Module breakdown : Modules completed, modules in progress, time spent per module (if available)
     - Actions available : [Send Reminder Message], [Schedule Coaching], [View Recent Activity Log]
   - Feedback : Detailed view loads <1s, charts animated on load
   - Durée : ~1.0s

4. **Coach can filter/sort apprenants by engagement metrics**
   - Coach uses filters/dropdowns :
     - Filter by Streak status : "Active (≥3 days)", "At Risk (0-2 days)", "Inactive (no activity 7+ days)"
     - Filter by XP : "High (>100 XP/week)", "Medium (50-100 XP/week)", "Low (<50 XP/week)"
     - Filter by Badge category : "Modules", "JAC", "Journal", "Streaks"
   - System updates table : Shows only matching apprenants, count updates ("5 At Risk apprenants")
   - Feedback : Real-time filter, table sorts/re-renders <300ms
   - Durée : ~300ms per filter change

5. **Coach identifies patterns and takes action**
   - Actions available :
     - View recent activity log (last 10 activities : dates, types, XP earned)
     - Send coaching message (if messaging module ready)
     - Schedule 1-1 coaching session (opens calendar)
     - Download cohort report (CSV export of all metrics)
   - Feedback : Each action loads relevant view/modal
   - Durée : ~500ms per action

#### Conditions de Succès ✅
- [ ] Coach dashboard loads <1.2s with all apprenants' engagement data
- [ ] Apprenants sortable by Last Active, Streaks, XP, Badges
- [ ] At Risk status correctly identified (0-2 day streaks, no activity 5+ days)
- [ ] Drill-into apprenant detail shows accurate metrics + charts
- [ ] Filters work in real-time (<300ms response)
- [ ] Charts display correctly (responsive, legible on mobile)
- [ ] Timezone handling correct (Last Active shows in coach/apprenant timezone)
- [ ] Export to CSV includes gamification data
- [ ] Performance maintained with 100+ apprenants per coach

#### Erreurs & Edge Cases ❌

**Cas 1 : Apprenant data not yet available (new user, no activities)**
- Scénario : New apprenant just onboarded, no activities yet
- Comportement attendu :
  - Step 1: Dashboard shows apprenant in list with "—" for XP, Streaks (no activities yet)
  - Step 2: Last Active shows "Never" or "Today (onboarded)"
  - Step 3: Badge count = 0
  - Step 4: Status = "New" not "At Risk"
  - Step 5: Coach can still click for detail view, see empty states with helpful messages
- Impact : Clarity that user is new, not at-risk

**Cas 2 : Delayed data sync (XP/badge not yet reflected in coach view)**
- Scénario : Apprenant just earned badge 10 minutes ago, coach dashboard loads 5 min later
- Comportement attendu :
  - Step 1: Apprenant's badge visible in their own dashboard (real-time)
  - Step 2: Coach view shows badge within 1-2 minutes of activity (async sync)
  - Step 3: If coach loads exactly at sync time, they see updated data
  - Step 4: Small notification "Data updated [X minutes ago]" at bottom of dashboard shows freshness
- Impact : Slight lag acceptable, transparency on data freshness maintained

**Cas 3 : Coach tries to view apprenant they DON'T have access to**
- Scénario : Coach A tries to view apprenant assigned to Coach B (via direct URL navigation)
- Comportement attendu :
  - Step 1: System checks permissions : apprenant not in Coach A's assigned list
  - Step 2: API returns 403 Forbidden
  - Step 3: UI shows error message : "You don't have access to view this apprenant"
  - Step 4: Redirect to coach's own apprenants list
- Impact : Data security maintained

**Cas 4 : Multiple coaches viewing same apprenant (concurrent access)**
- Scénario : Coach A + Coach B both viewing apprenant details at same time
- Comportement attendu :
  - Step 1: Both coaches see same data (read-only view)
  - Step 2: If Coach A sends message, Coach B's view doesn't auto-update (is read-only anyway)
  - Step 3: Coach B's next refresh shows new message
- Impact : No concurrency issues, each coach sees consistent snapshot

---

### User Journey #4 : Apprenant → Receiving & Sharing Open Badge (Post Projet Final)

**Acteur :** Apprenant (after Projet Final validation)  
**Déclencheur :** Apprenant completes Projet Final (JAC) and receives official IMS OpenBadge certification  
**Objectif :** Understand Open Badge, download certificate, verify authenticity, share to portfolio/LinkedIn

#### Étapes Détaillées

1. **Coach validates Apprenant's Projet Final (triggers Open Badge issuance)**
   - User action (Coach) : Reviews Projet Final submission, clicks "Validate & Issue Badge" button in BO
   - System processing :
     - Step 1: Coach action recorded in audit log
     - Step 2: System calls prestataire API (Credly/Badgr/Applaud - TBD) to issue OpenBadge
     - Step 3: Prestataire returns : assertion_url, issuer_url, evidence_url, QR code
     - Step 4: Badge stored in open_badges table with all metadata + links
     - Step 5: Notification triggered to Apprenant
   - Feedback (Coach) : Modal shows "Badge issued successfully" + confirmation
   - Durée : ~2-3s (prestataire API call)

2. **Apprenant receives notification of Open Badge issuance**
   - Notification types :
     - In-app toast : "🎓 Official Badge Earned: Projet Final - Formation SBO"
     - Email digest : "[OpenBadge] Your new certification is ready"
   - CTA : "View Badge" link in notification navigates to badge detail
   - Feedback : Celebratory notification, distinct from plateforme badges
   - Durée : Instant notification

3. **Apprenant navigates to Badge Profile section**
   - User action : Clicks notification OR navigates "Mon Profil" → "Badges" → "Open Badges Officiels" section
   - System loads : Fetch user's issued Open Badges from prestataire, display with:
     - Badge name + description
     - Issuer logo (Learning App / TLS branding)
     - Date issued
     - Evidence link (to Projet Final proof)
     - Download certificate button (PDF)
     - Verify authenticity button (shows QR code)
     - Share to LinkedIn button
   - Feedback : Open Badges displayed separately from Plateforme badges (3-part gallery: Plateforme + Compétences + Open)
   - Durée : ~600ms to load from prestataire API

4. **Apprenant downloads PDF certificate**
   - User action : Clicks "Download Certificate" button
   - System fetch : Retrieves PDF from prestataire (Credly/Badgr/Applaud)
   - File format : PDF includes : badge image, issuer name, evidence URL, issued date, QR code for verification, signature
   - Feedback : File downloaded to local Downloads folder
   - Durée : ~1s (depends on prestataire CDN)

5. **Apprenant verifies badge authenticity via QR code**
   - User action : Clicks "Verify Authenticity" button OR scans QR code with mobile device
   - System response :
     - Web : Displays popup with QR code image + link to prestataire verification page
     - Mobile : Opens prestataire verification URL in browser (e.g., Credly claim link)
   - User scans QR with standard QR reader app
   - Prestataire page loads : Shows badge details + claim URL + public verification data (issuer, recipient, date)
   - Feedback : User can confirm badge is legitimate + publicly verifiable
   - Durée : Instant QR display, ~2s for verification page load

6. **Apprenant shares badge to LinkedIn**
   - User action : Clicks "Share to LinkedIn" button
   - System action :
     - Opens LinkedIn OAuth flow (if not already authenticated)
     - Constructs share message with badge metadata (name, issuer, evidence link)
     - Pre-fills LinkedIn post with OpenBadge markdown/rich data (if supported)
   - Feedback : LinkedIn share dialog opens, user composes caption, click "Post"
   - Durée : ~2-3s for OAuth, then user posts

#### Conditions de Succès ✅
- [ ] Open Badge issuance API call to prestataire succeeds <3s
- [ ] Open Badge metadata (assertion_url, evidence_url, QR code) stored correctly
- [ ] Badge appears in Apprenant's Open Badges section within 2 minutes
- [ ] PDF certificate downloads successfully with all required fields
- [ ] QR code scans correctly with standard QR readers
- [ ] Prestataire verification page loads + shows public badge details
- [ ] LinkedIn share populates with badge metadata
- [ ] Mobile UX responsive (fullscreen sections, readable badge display)

#### Erreurs & Edge Cases ❌

**Cas 1 : Prestataire API unavailable during issuance**
- Scénario : Coach clicks "Issue Badge", prestataire API is down (timeout)
- Comportement attendu :
  - Step 1: System retries API call (3 attempts with exponential backoff)
  - Step 2: If still fails after retries, show error to Coach: "Badge issuance failed. Try again?"
  - Step 3: Create job in queue to retry later (cron every 5 min for 24h)
  - Step 4: Once prestataire recovers, badge issued automatically, Apprenant notified
- Impact : Badge issuance delayed but not lost

**Cas 2 : Apprenant tries to share before OAuth authenticated**
- Scénario : Apprenant clicks "Share to LinkedIn" first time, not authenticated
- Comportement attendu :
  - Step 1: System initiates LinkedIn OAuth flow
  - Step 2: Apprenant authorizes Learning App in LinkedIn
  - Step 3: OAuth token saved, share completes
  - Step 4: Future shares use cached token (no OAuth prompt)
- Impact : Seamless share UX after first authentication

**Cas 3 : Open Badge revoked by admin (due to cheating/fraud)**
- Scénario : Admin discovers Projet Final was fraudulent, clicks "Revoke Badge" in BO
- Comportement attendu :
  - Step 1: Admin action recorded in audit log with revocation reason
  - Step 2: System calls prestataire API to revoke (mark assertion as revoked)
  - Step 3: open_badges table updated : revoked = TRUE, revoked_reason, revoked_at
  - Step 4: Notification sent to Apprenant: "Your badge was revoked. Reason: [reason]"
  - Step 5: Badge removed from Apprenant's profile (no longer visible in gallery)
- Impact : Badge officially retracted, both locally and at prestataire

---

### User Journey #5 : Apprenant → Experiencing Atrophie (Badge Downgrade Due to Inactivity)

**Acteur :** Apprenant (with competence badges at higher Dreyfus level)  
**Déclencheur :** Daily atrophie job runs at 02:00 UTC, detects 90+ days of inactivity in a competence  
**Objectif :** Understand that badges degrade with inactivity, see Dreyfus level change, get re-engagement nudge

#### Étapes Détaillées

1. **Apprenant earned badges compétences at higher Dreyfus levels (months ago)**
   - Past context : Apprenant completed JAC validations 6 months ago, unlocked Dreyfus level 4 ("Platinum badge") for multiple competences
   - Dashboard state : Profile shows high-level badges (Or/Platinum/Diamant), streak may have reset but badges persist
   - Competences in Passeport : Dreyfus levels stored (e.g., "Prise de Décision: D4/Competent")
   - Feedback : Badges visible, apprenant feels accomplished
   - Durée : N/A (historical state)

2. **Inactivity accumulates (90+ days without relevant activity)**
   - Scenario : Apprenant hasn't engaged with competence-related activities for 90+ days
   - Relevant activities : JAC re-validations, training modules in competence domain, journal reflections on competence
   - Last activity : e.g., 92 days ago (last module completion in that competence domain)
   - System tracking : activity_log + competence_audit trail maintained
   - Feedback : No notification sent during this period (MVP silent tracking)
   - Durée : 90 days of passive state

3. **Atrophie job runs at 02:00 UTC daily**
   - Scheduled job : Cron triggers "atrophie_processor" service
   - Query : SELECT apprenants with ANY competence_badge WHERE last_competence_activity > 90 days
   - Logic : For each matching (apprenant, competence, badge_level):
     - Step 1: Calculate days since last_activity
     - Step 2: If > 90 days, trigger downgrade (Dreyfus_level - 1)
     - Step 3: Create atrophie_log record (from_level, to_level, triggered_at)
     - Step 4: Update Passeport module (competence Dreyfus level decremented) — INTEGRATION POINT
     - Step 5: Update user_competence_badges (badge loses its earned status, new lower-level badge active)
     - Step 6: Queue notification to Apprenant
   - Feedback : System processing (silent, no user interaction)
   - Durée : ~100ms per user processing

4. **Apprenant receives atrophie notification**
   - Next time apprenant logs in (or after job completes if already online):
     - In-app toast : "⚠️ Skill Badge Downgraded: Prise de Décision fell from Platinum (D4) to Gold (D3) due to 90+ days inactivity"
     - Email digest : "[Atrophie Alert] Your skill badges were downgraded. See details →"
   - CTA : "View Skill Progress" link opens Passeport + Gamification sections
   - Feedback : Alert-style notification (yellow/orange, not celebratory)
   - Durée : Instant notification

5. **Apprenant navigates to competence badge section**
   - User action : Clicks notification OR navigates "Mon Profil" → "Badges" → "Compétences" section
   - Dashboard displays : Competence badge grid with:
     - Competence name
     - Visual badge (now showing Gold/Or color instead of Platinum)
     - Text : "D3/Apprenant (previously D4, downgraded due to 90-day inactivity)"
     - Progress bar : "Next level in X days if active" (re-engagement prompt)
     - Timeline : Shows when badge was earned vs when downgraded
   - Feedback : Grayed-out or visually distinct "downgraded" badge appearance
   - Durée : Instant on load

6. **Apprenant sees opportunity to re-engage and re-upgrade**
   - Section provides CTA : "Re-engage to upgrade your badge"
   - Suggestions : Recommended actions to re-activate competence:
     - "Retake JAC for [competence]" (link to JAC details)
     - "Complete training module in [competence domain]" (link to Formation)
     - "Write journal entry reflecting on [competence]" (link to Journal)
   - Progress : Once apprenant re-engages (e.g., completes new training), atrophie counter resets, path to re-upgrade begins
   - Feedback : Motivational framing ("You can regain your Platinum badge!")
   - Durée : N/A (user exploration)

#### Conditions de Succès ✅
- [ ] Atrophie job runs daily at 02:00 UTC correctly identifying 90+ day inactivity
- [ ] Dreyfus level correctly decremented in Passeport module (integration verified)
- [ ] user_competence_badges updated (badge lost, new lower-level badge active)
- [ ] atrophie_log record created with all metadata
- [ ] Notification sent to Apprenant within 5 minutes of job completion
- [ ] Badge gallery displays downgraded badge with clear visual distinction
- [ ] Apprenant can re-engage to reset atrophie counter and begin re-upgrade path
- [ ] Passeport module reflects Dreyfus level change (no inconsistency)
- [ ] Mobile UX shows downgrade notification clearly

#### Erreurs & Edge Cases ❌

**Cas 1 : Apprenant has MULTIPLE competence badges downgraded same day**
- Scénario : Apprenant inactive across 3 different competence domains, all hit 90-day threshold simultaneously
- Comportement attendu :
  - Step 1: Atrophie job processes all 3 (apprenant_id, competence_id, badge_level) pairs
  - Step 2: 3 atrophie_log records created (one per competence)
  - Step 3: Notification batches into single message : "Your 3 skill badges were downgraded"
  - Step 4: Dashboard badge gallery shows all 3 downgraded badges
  - Step 5: Progress section shows which competences need re-engagement
- Impact : User sees clear picture of skill gaps without notification spam

**Cas 2 : Apprenant is already at Dreyfus D1 (lowest level)**
- Scénario : Badge is already at D1/Blue (minimal level), 90 days inactive
- Comportement attendu :
  - Step 1: Atrophie logic checks : if dreyfus_level <= 1, NO downgrade
  - Step 2: Badge stays at D1 (floor level)
  - Step 3: No atrophie_log created (already at bottom)
  - Step 4: Notification NOT sent (badge not downgraded)
- Impact : D1 badges are permanent, don't degrade further

**Cas 3 : Apprenant re-engages DURING 90-day window (activity resets counter)**
- Scénario : Apprenant inactive for 85 days, then completes training on day 86
- Comportement attendu :
  - Step 1: Activity logged with timestamp (day 86)
  - Step 2: last_activity_date updated to day 86
  - Step 3: Atrophie job runs on day 87 : checks last_activity = day 86 (only 1 day ago, <90)
  - Step 4: Badge NOT downgraded (counter reset)
  - Step 5: Apprenant safe for another 90 days
- Impact : Re-engagement immediately resets atrophie counter

**Cas 4 : Passeport module sync fails during atrophie downgrade**
- Scénario : Atrophie job updates Gamification badges but Passeport module API returns error on sync
- Comportement attendu :
  - Step 1: Gamification update succeeds (user_competence_badges downgraded)
  - Step 2: Passeport sync call fails (network error or API down)
  - Step 3: Retry job queued (every 5 min for 1 hour)
  - Step 4: Eventually succeeds, Passeport Dreyfus level updated
  - Step 5: Data consistency restored
- Impact : Temporary inconsistency, but auto-resolves within 1 hour

---

### User Journey #6 : Learner → Badge Claim with Insufficient Credits

**Acteur :** Learner  
**Déclencheur :** Learner views badge detail, clicks "Claim Badge", insufficient credits  
**Objectif :** Purchase credit inline, then claim badge atomically

#### Étapes Détaillées

1. **Learner navigates to badge detail page**
   - User action : Clicks badge from gallery or dashboard
   - System displays : Badge name, description, "Cost: 1 credit", "Claim Badge" button (green)
   - If insufficient : Button shows "Claim (need 1 credit)" + warning "You have [X] credits"
   - Feedback : Clear cost display, warning color if insufficient
   - Durée : Instant

2. **Learner clicks "Claim Badge"**
   - User action : Clicks claim button
   - System validates : balance < 1
   - IF insufficient → Modal "Buy Credits" appears inline
   - IF sufficient → Direct claim → Badge added to profile
   - Feedback : Clear deficit message
   - Durée : <1s

3. **Modal: "Buy Credits for Badge"**
   - Modal displays:
     - Title: "1 credit needed to claim [Badge Name]"
     - Subtitle: "Your balance: [X] credits"
     - Package options (radio buttons):
       - "50 credits — €25"
       - "200 credits — €80"
       - "500 credits — €180"
     - Stripe payment inline (card iframe)
     - Buttons: "Pay and Claim" (primary, disabled until card filled), "Cancel" (close modal)
   - Feedback : Modal smooth fade-in, Stripe loaded ~500ms
   - Durée : Instant

4. **Learner selects package and enters card**
   - User action : Selects "50 credits" radio button
   - System response : Stripe payment element loads, shows card input
   - Learner types card details
   - Feedback : Real-time card validation, "Pay and Claim" button enabled
   - Durée : ~1-2 min (user typing)

5. **Learner clicks "Pay and Claim" — Atomic Transaction**
   - User action : Button click
   - Backend processing :
     - BEGIN TRANSACTION
     - Step 1: Process Stripe payment (via Stripe API)
     - Step 2: IF success → Create credit_purchase entry {user_id, amount=50, source='direct_purchase_woocommerce'}
     - Step 3: UPDATE credits.balance_available += 50
     - Step 4: Create badge_earned {user_id, badge_id, source='claimed_with_credit_purchase', claimed_at=now}
     - Step 5: Debit credits: UPDATE credits.balance_available -= 1
     - Step 6: Create credit_transaction {user_id, type='badge_claim_spent', amount=-1}
     - COMMIT TRANSACTION (ALL or NOTHING)
   - IF Stripe fails: ROLLBACK (no badge created, no credits added)
   - Feedback : Modal shows "Processing payment..." spinner
   - Durée : ~2-3s

6. **Success — Badge Claimed + Credits Updated**
   - Modal closes. Badge detail page displays "✅ Badge claimed!"
   - Summary shows:
     - Badge icon + name
     - "Credits purchased: 50"
     - "Credits spent: 1"
     - "Credits remaining: 49"
   - CTA buttons : "View my badges" (primary), "Back to gallery"
   - Email sent : "Badge claimed + payment receipt"
   - Feedback : Success animation, clear confirmation
   - Durée : Instant

7. **Wallet Dashboard Reflects New Balance**
   - Learner navigates /dashboard → Credits widget shows "49 disponibles"
   - Transaction history shows both entries:
     - "Direct purchase: +50 credits (€25)" [source: woocommerce_direct_purchase]
     - "Badge claim: -1 credit" [source: badge_claim_spent]
   - Feedback : Real-time update
   - Durée : Instant

#### Conditions de Succès ✅
- [ ] Insufficient credit detection works (system calculates required vs available)
- [ ] Modal appears inline (no redirect, no page navigation)
- [ ] Stripe inline checkout works (card entry, validation, processing)
- [ ] Atomic transaction ensures credit + badge created together (no partial state)
- [ ] If Stripe fails: Badge NOT created, credits NOT added (rollback)
- [ ] Badge claimed via email with receipt
- [ ] Wallet dashboard updates immediately (credit balance visible)
- [ ] User can cancel modal and return without payment
- [ ] All audit trails logged (credit_purchase, credit_transaction, badge_earned)

#### Erreurs & Edge Cases ❌

**Cas 1 : Stripe payment fails mid-transaction**
- Scénario : Card declined or Stripe API temporarily down
- Comportement attendu :
  - Modal displays error "Payment failed: [Stripe error message]"
  - No badge created (rollback)
  - No credits added
  - Learner can : Retry with same card, use different card, cancel
  - Badge detail still accessible in background
- Feedback : Clear error, retry options
- Impact : Booking not completed, can retry or cancel

**Cas 2 : Learner closes modal before badge claim confirmation**
- Scénario : Payment succeeds, but learner closes modal before final confirmation
- Comportement attendu :
  - Credits ARE added (payment already processed)
  - Badge NOT created (atomic transaction rolled back if not completed)
  - Learner can : Click "Claim" again → Badge proceeds (credits now available)
- Feedback : Credits visible in wallet (success), badge still available to complete
- Impact : No data loss, user can complete badge claim later

**Cas 3 : Learner already owns badge (duplicate claim)**
- Scénario : Learner somehow clicks claim after already claiming
- Comportement attendu :
  - System checks : User already owns badge
  - Error message : "You already have this badge"
  - No payment initiated
- Feedback : Clear message
- Impact : No charge, no data loss

---

## 🗄️ Modèle de Données

### Entités Principales

#### 1. **xp_transactions** (XP allocation tracking)
| Colonne | Type | Description |
|---------|------|-------------|
| `id` | UUID | Primary key |
| `apprenant_id` | UUID | FK to apprenants |
| `amount` | INT | XP points awarded (+5, +10, +50, etc.) |
| `source_type` | VARCHAR(50) | Activity type (journal_entry, module_complete, jac_validation, veille_read, coaching_session) |
| `source_id` | VARCHAR(100) | ID of activity (journal_id, module_id, jac_id, etc.) |
| `reason` | VARCHAR(255) | Human-readable reason ("Completed Formation Module", "JAC Validated at Expert") |
| `created_at` | DateTime | Timestamp |
| `created_by_user_id` | UUID | Admin if manually granted, else system |
| `INDEX` | | idx_apprenant_created (for aggregation queries) |

#### 2. **badges** (Badge definitions - library)
| Colonne | Type | Description |
|---------|------|-------------|
| `id` | UUID | Primary key |
| `slug` | VARCHAR(100) | Unique identifier (e.g., "3_day_streak", "module_master") |
| `name` | VARCHAR(255) | Display name ("3 Jours de Suite", "Module Master") |
| `description` | TEXT | Long description |
| `category` | VARCHAR(50) | streaks, modules, jac, veille, coaching, journal |
| `rarity` | VARCHAR(20) | common, uncommon, rare, epic, legendary |
| `icon_url` | VARCHAR(500) | URL to badge image |
| `trigger_event_type` | VARCHAR(100) | journal_entry_count, module_complete, jac_validation, streak_3d, streak_7d, etc. |
| `trigger_threshold` | INT | Threshold value for trigger |
| `trigger_scope` | VARCHAR(50) | all (all users), specific_modules (for modules badges), specific_stage (for stage badges) |
| `trigger_details` | JSON | Additional trigger configuration (e.g., {"modules": ["formation_101", "formation_102"]}) |
| `active` | BOOLEAN | Enable/disable badge |
| `created_at` | DateTime | |
| `created_by` | VARCHAR(100) | "system" or admin user_id |
| `updated_at` | DateTime | |
| `updated_by` | VARCHAR(100) | |

#### 3. **badge_earned** (User badge achievements)
| Colonne | Type | Description |
|---------|------|-------------|
| `id` | UUID | Primary key |
| `apprenant_id` | UUID | FK to apprenants |
| `badge_id` | UUID | FK to badges |
| `earned_at` | DateTime | When badge was unlocked |
| `earned_by` | VARCHAR(50) | "system" (auto-trigger) or "admin" (manually granted) |
| `progression_level` | INT | 1, 2, 3 for multi-tier badges (e.g., Expert level 1, 2, 3) |
| `UNIQUE` | | (apprenant_id, badge_id, progression_level) - prevent duplicates |
| `INDEX` | | idx_apprenant_earned (for user's badges list) |

#### 4. **streaks** (Apprenant streak tracking)
| Colonne | Type | Description |
|---------|------|-------------|
| `id` | UUID | Primary key |
| `apprenant_id` | UUID | FK to apprenants |
| `streak_type` | VARCHAR(50) | all_activities, journal_entries, formations (future) |
| `current_streak` | INT | Days currently active (0-N) |
| `max_streak` | INT | Peak streak ever reached |
| `started_at` | DateTime | When current streak started |
| `last_activity_date` | DATE | Last date with activity |
| `reset_at` | DateTime | When streak last reset (null if current active) |
| `UNIQUE` | | (apprenant_id, streak_type) |
| `INDEX` | | idx_apprenant_type (for user's streaks) |

#### 5. **activity_log** (Daily activity tracking for streaks)
| Colonne | Type | Description |
|---------|------|-------------|
| `id` | UUID | Primary key |
| `apprenant_id` | UUID | FK to apprenants |
| `activity_date` | DATE | Which date activity occurred |
| `activity_type` | VARCHAR(50) | journal_entry, module_complete, jac_validation, coaching, veille_read |
| `activity_count` | INT | Number of activities that day (1+) |
| `created_at` | DateTime | First activity timestamp that day |
| `UNIQUE` | | (apprenant_id, activity_date, activity_type) |

#### 6. **badge_triggers_log** (Audit trail for badge unlocks)
| Colonne | Type | Description |
|---------|------|-------------|
| `id` | UUID | Primary key |
| `badge_id` | UUID | FK to badges |
| `apprenant_id` | UUID | FK to apprenants |
| `trigger_event_id` | VARCHAR(100) | Source event ID (journal_id, module_id, etc.) |
| `trigger_event_type` | VARCHAR(100) | Event type that triggered |
| `badge_earned_id` | UUID | FK to badge_earned (the result) |
| `processed_at` | DateTime | When trigger was processed |
| `INDEX` | | idx_apprenant_badge (for user's unlock history) |

#### 7. **badge_competences** (Dreyfus-level badges configuration)
| Colonne | Type | Description |
|---------|------|-------------|
| `id` | UUID | Primary key |
| `competence_id` | UUID | FK to competences (from Passeport module) |
| `dreyfus_level` | INT | 1-5 (D1, D2, D3, D4, D5) |
| `badge_name` | VARCHAR(255) | e.g., "Bleu - D1", "Diamant - D5" |
| `badge_color` | VARCHAR(20) | Bleu, Argent, Or, Platinum, Diamant |
| `icon_url` | VARCHAR(500) | URL to Dreyfus-level badge image |
| `auto_trigger_enabled` | BOOLEAN | Auto-trigger on JAC validation |
| `atrophie_enabled` | BOOLEAN | Subject to atrophie logic |
| `created_at` | DateTime | |
| `UNIQUE` | | (competence_id, dreyfus_level) |

#### 8. **user_competence_badges** (User's competence badge progress)
| Colonne | Type | Description |
|---------|------|-------------|
| `id` | UUID | Primary key |
| `apprenant_id` | UUID | FK to apprenants |
| `badge_competence_id` | UUID | FK to badge_competences |
| `earned_at` | DateTime | When Dreyfus level reached |
| `lost_at` | DateTime | When downgraded due to atrophie (null if current) |
| `atrophie_triggered` | BOOLEAN | Whether atrophie downgrade applied |
| `last_activity_date` | DATE | Last activity in this competence (for atrophie tracking) |
| `UNIQUE` | | (apprenant_id, badge_competence_id) |
| `INDEX` | | idx_apprenant_competence |

#### 9. **open_badges** (IMS OpenBadges issued to apprenants)
| Colonne | Type | Description |
|---------|------|-------------|
| `id` | UUID | Primary key |
| `apprenant_id` | UUID | FK to apprenants |
| `parcours_id` | VARCHAR(100) | FK to parcours (Projet Final) |
| `badge_name` | VARCHAR(255) | e.g., "Projet Final - Formation SBO" |
| `issuer_name` | VARCHAR(255) | Issuer organization |
| `issuer_url` | VARCHAR(500) | Issuer website URL |
| `issuer_email` | VARCHAR(255) | Issuer contact email |
| `evidence_url` | VARCHAR(500) | Link to Projet Final proof/submission |
| `issued_at` | DateTime | Date badge was issued |
| `expires_at` | DateTime | Expiration date (null if no expiry) |
| `badge_class_id` | VARCHAR(255) | OpenBadge class ID from prestataire |
| `assertion_url` | VARCHAR(500) | Direct URL to OpenBadge assertion (for QR code) |
| `qr_code_url` | VARCHAR(500) | QR code image for verification |
| `certificate_pdf_url` | VARCHAR(500) | Download link for PDF certificate |
| `prestataire` | VARCHAR(50) | "credly", "badgr", "applaud" (to be decided) |
| `revoked` | BOOLEAN | Whether badge was revoked |
| `revoked_at` | DateTime | Revocation timestamp if revoked |
| `revocation_reason` | TEXT | Reason for revocation |
| `created_by_user_id` | UUID | Admin/system user who issued |
| `INDEX` | | idx_apprenant_issued |

#### 10. **atrophie_log** (Tracking badge downgrades due to inactivity)
| Colonne | Type | Description |
|---------|------|-------------|
| `id` | UUID | Primary key |
| `apprenant_id` | UUID | FK to apprenants |
| `badge_competence_id` | UUID | FK to badge_competences |
| `from_dreyfus_level` | INT | Previous level (e.g., 4) |
| `to_dreyfus_level` | INT | New level after downgrade (e.g., 3) |
| `inactivity_days` | INT | Number of days inactive |
| `triggered_at` | DateTime | When atrophie was triggered |
| `processed_at` | DateTime | When system processed the downgrade |
| `notification_sent_at` | DateTime | When apprenant was notified |
| `INDEX` | | idx_apprenant_triggered (for tracking user's downgrades) |

### Relations
```
apprenants (1) ──→ (many) xp_transactions
apprenants (1) ──→ (many) badge_earned
apprenants (1) ──→ (many) streaks
apprenants (1) ──→ (many) activity_log
apprenants (1) ──→ (many) user_competence_badges
apprenants (1) ──→ (many) open_badges
apprenants (1) ──→ (many) atrophie_log
badges (1) ──→ (many) badge_earned
badges (1) ──→ (many) badge_triggers_log
badge_competences (1) ──→ (many) user_competence_badges
badge_competences (1) ──→ (many) atrophie_log
competences (1) ──→ (many) badge_competences (from Passeport module)
competences (1) ──→ (many) atrophie_log (for tracking competence-level changes)
```

### Schéma Simplifié (Mermaid)
```mermaid
erDiagram
    APPRENANTS ||--o{ XP_TRANSACTIONS : earn
    APPRENANTS ||--o{ BADGE_EARNED : achieve
    APPRENANTS ||--o{ BADGE_EARNED_PLATEFORME : achieves
    APPRENANTS ||--o{ USER_COMPETENCE_BADGES : earns
    APPRENANTS ||--o{ OPEN_BADGES : issued
    APPRENANTS ||--o{ STREAKS : maintain
    APPRENANTS ||--o{ ACTIVITY_LOG : perform
    APPRENANTS ||--o{ ATROPHIE_LOG : triggered
    
    BADGES ||--o{ BADGE_EARNED : defines
    BADGES ||--o{ BADGE_TRIGGERS_LOG : triggers
    
    COMPETENCES ||--o{ BADGE_COMPETENCES : has_levels
    BADGE_COMPETENCES ||--o{ USER_COMPETENCE_BADGES : tracked_by
    BADGE_COMPETENCES ||--o{ ATROPHIE_LOG : triggers
    
    XP_TRANSACTIONS : UUID id
    XP_TRANSACTIONS : UUID apprenant_id
    XP_TRANSACTIONS : INT amount
    XP_TRANSACTIONS : VARCHAR source_type
    
    BADGES : UUID id
    BADGES : VARCHAR slug
    BADGES : VARCHAR name
    BADGES : VARCHAR category
    BADGES : VARCHAR rarity
    
    BADGE_EARNED : UUID id
    BADGE_EARNED : UUID apprenant_id
    BADGE_EARNED : UUID badge_id
    BADGE_EARNED : DateTime earned_at
    
    BADGE_COMPETENCES : UUID id
    BADGE_COMPETENCES : UUID competence_id
    BADGE_COMPETENCES : INT dreyfus_level
    BADGE_COMPETENCES : VARCHAR badge_color
    
    USER_COMPETENCE_BADGES : UUID id
    USER_COMPETENCE_BADGES : UUID apprenant_id
    USER_COMPETENCE_BADGES : UUID badge_competence_id
    USER_COMPETENCE_BADGES : DateTime earned_at
    
    OPEN_BADGES : UUID id
    OPEN_BADGES : UUID apprenant_id
    OPEN_BADGES : VARCHAR prestataire
    OPEN_BADGES : VARCHAR assertion_url
    OPEN_BADGES : BOOLEAN revoked
    
    ATROPHIE_LOG : UUID id
    ATROPHIE_LOG : UUID apprenant_id
    ATROPHIE_LOG : UUID badge_competence_id
    ATROPHIE_LOG : INT from_level
    ATROPHIE_LOG : INT to_level
```
    BADGE_EARNED : DateTime earned_at
    
    STREAKS : UUID id
    STREAKS : UUID apprenant_id
    STREAKS : INT current_streak
    STREAKS : INT max_streak
    
    ACTIVITY_LOG : UUID id
    ACTIVITY_LOG : UUID apprenant_id
    ACTIVITY_LOG : DATE activity_date
    ACTIVITY_LOG : VARCHAR activity_type
```

### Badge Claims with Credit System Integration

#### Existing Table: **badge_claims** (Updates from Credit System — CDC #03)

This table is defined in the Credit System (CDC #03) and tracks badge claims with credit requirements:

| Colonne | Type | Description |
|---------|------|-------------|
| `id` | UUID | Primary key |
| `user_id` | UUID FK | Learner who claimed |
| `badge_id` | UUID FK | Badge definition |
| `credit_cost` | Integer | 1 (MVP hardcoded, configurable V2) |
| `source` | ENUM | (NEW) 'sufficient_balance' \| 'purchased_inline' — tracks whether badge was claimed with existing credits or via inline purchase |
| `credit_purchase_id` | UUID FK | (NEW) If purchased inline, links to credit_purchases record; NULL if claimed with existing balance |
| `claimed_at` | DateTime | Claim timestamp |
| `created_at` | DateTime | Record creation |

**Relations with Credit System:**
- `badge_claims` (1) ──→ `credit_purchases` (many) — If source='purchased_inline', links to the credit purchase transaction
- `badge_claims` (1) ──→ `credit_transactions` (many) — Links to consumption log (credit_spent entry)

---

## 🔌 API / Endpoints (REST)

### Apprenant Endpoints

**GET** `/api/v1/gamification/user/dashboard`
- Returns: User XP total, badges earned (count + list), streaks (current + history), next badges in progress
- Auth: Self or Coach (read own data), Admin (read any)
- Cache: 5 minutes
- Response: `{ xp_total: 450, badges_earned: [...], streaks: {...}, next_badges: [...] }`

**GET** `/api/v1/gamification/user/badges`
- Returns: Detailed list of user's earned badges with unlock dates, categories breakdown
- Params: `category` (filter), `sort` (unlock_date, name), `limit`, `offset`
- Response: `{ total: 15, badges: [{ id, name, earned_at, category, rarity }...] }`

**GET** `/api/v1/gamification/user/streaks`
- Returns: Current streak details, milestone progress, historical streaks
- Response: `{ current_streak: 7, max_streak: 12, milestones: [{threshold: 3, achieved: true}, ...], activity_log: [{date, activity_type}...] }`

**GET** `/api/v1/gamification/badges/:badge_id/detail`
- Returns: Badge definition + user's unlock status (if earned)
- Response: `{ id, name, description, rarity, trigger_condition, unlock_date (if earned) }`

**POST** `/api/v1/gamification/xp/allocate` (Internal/Admin only)
- Allocate XP points to user (called by other modules on activity completion)
- Body: `{ apprenant_id, amount, source_type, source_id, reason }`
- Response: `{ xp_transaction_id, new_total_xp, badges_unlocked: [...] }`

### Coach Endpoints

**GET** `/api/v1/gamification/coach/apprenants` 
- Returns: List of coach's assigned apprenants with engagement summary
- Returns: `{ apprenants: [{ id, name, current_streak, badges_earned_week, xp_earned_week, last_active, status }...] }`
- Params: `filter` (by streak status, by engagement level), `sort`

**GET** `/api/v1/gamification/coach/apprenant/:apprenant_id/engagement`
- Returns: Detailed engagement metrics for specific apprenant
- Response: `{ xp_earned_week, xp_earned_month, badges_earned_month, streaks_history, activity_timeline, modules_progress }`

### Admin Endpoints

**GET** `/api/v1/gamification/admin/badges`
- List all badge definitions in system
- Params: `active` (filter active/inactive), `category`, `sort`
- Response: `{ badges: [...badge definitions...], total: X }`

**POST** `/api/v1/gamification/admin/badges`
- Create new badge definition
- Body: Badge definition (name, trigger, threshold, etc.)
- Validation: trigger_event_type must be in allowed list

**PUT** `/api/v1/gamification/admin/badges/:badge_id`
- Update badge definition
- Body: Partial badge definition (can update trigger, threshold, active status, etc.)

**POST** `/api/v1/gamification/admin/badges/:badge_id/grant/:apprenant_id`
- Manually grant badge to user (override)
- Audit logged with admin user_id

**POST** `/api/v1/gamification/admin/streaks/:apprenant_id/reset`
- Reset apprenant's streak to 0
- Audit logged

**GET** `/api/v1/gamification/admin/analytics/dashboard`
- Analytics dashboard data
- Returns: `{ badges_distribution: [...], engagement_by_streak: {...}, xp_distribution: [...], cohort_comparison: {...} }`

**POST** `/api/v1/gamification/admin/triggers/test`
- Test badge trigger configuration (dry-run)
- Body: `{ trigger_event_type, trigger_threshold, test_apprenant_id }`
- Returns: Would trigger badge X for user Y

### Open Badges Endpoints (Custom OB 2.0 Self-Hosted)

**POST** `/api/v1/gamification/open-badges/issue` (Admin only)
- Generate OB 2.0 assertion locally after Projet Final validation
- Body: `{ apprenant_id, competence_id, evidence_url (link to Projet Final), issuer_id }`
- Action: Generate assertion locally (no external API call), sign with issuer key, store in open_badges table
- Response: `{ open_badge_id, assertion_url, qr_code_url, certificate_pdf_url }`
- Assertion URL format: `/api/v1/gamification/open-badges/assertions/{assertion_id}` (public endpoint for verification)

**GET** `/api/v1/gamification/open-badges/user/:apprenant_id`
- Returns: User's issued Open Badges
- Response: `{ open_badges: [{id, name, issued_at, evidence_url, assertion_url, certificate_pdf_url, revoked}...] }`

**GET** `/api/v1/gamification/open-badges/assertions/{assertion_id}` (Public)
- Retrieve assertion for verification (no auth required)
- Returns: JSON-LD assertion object (RFC 5545 format)

**POST** `/api/v1/gamification/open-badges/qrcode/{assertion_id}` (Public)
- Generate or retrieve QR code for assertion
- Returns: QR code image (PNG, embeddable in certificate PDF)

**GET** `/api/v1/gamification/open-badges/:open_badge_id/download-certificate`
- Generate and download PDF certificate locally
- Returns: PDF file (binary, Content-Type: application/pdf)
- Certificate includes: learner name + badge details + achievement date + verification URL + QR code + issuer signature

**GET** `/api/v1/gamification/open-badges/:open_badge_id/verify`
- Get QR code + verification link for badge authenticity check
- Response: `{ qr_code_url, verification_url (to prestataire), issuer_url, public_data }`

**POST** `/api/v1/gamification/open-badges/:open_badge_id/share-to-linkedin`
- Generate share data for LinkedIn
- Body: `{ caption (optional) }`
- Response: `{ linkedin_share_url, badge_metadata (for pre-fill) }`

**POST** `/api/v1/gamification/admin/open-badges/:open_badge_id/revoke` (Admin only)
- Revoke Open Badge (fraud/cheating scenario)
- Body: `{ revocation_reason }`
- Action: Calls prestataire API to mark assertion as revoked
- Response: `{ revoked: true, revoked_at, notification_sent }`

### Compétence Badges Endpoints

**GET** `/api/v1/gamification/competence-badges/user/:apprenant_id`
- Returns: User's competence badges by Dreyfus level
- Response: `{ competence_badges: [{competence_id, competence_name, dreyfus_level, badge_color, earned_at, last_activity_date, atrophie_status (active/at_risk/downgraded)}...] }`

**GET** `/api/v1/gamification/competence-badges/:competence_id`
- Returns: Competence badge config (all 5 Dreyfus levels)
- Response: `{ competence_id, competence_name, dreyfus_levels: [{level: 1-5, color, badge_image_url, auto_trigger, atrophie_enabled}...] }`

**POST** `/api/v1/gamification/admin/competence-badges/configure` (Admin only)
- Configure Dreyfus-level badges for competence
- Body: `{ competence_id, dreyfus_configs: [{level, color, auto_trigger_enabled, atrophie_enabled}...] }`
- Response: `{ competence_id, updated_configs }`

**POST** `/api/v1/gamification/admin/competence-badges/atrophie-config` (Admin only)
- Configure atrophie logic system-wide
- Body: `{ inactivity_threshold_days (default 90), automation_enabled, notification_enabled, schedule_cron }`
- Response: `{ config_updated, next_run_at }`

**GET** `/api/v1/gamification/admin/atrophie-log`
- List atrophie events (downgrades triggered)
- Params: `apprenant_id` (optional), `competence_id` (optional), `date_range`
- Response: `{ atrophie_events: [{apprenant_id, competence_id, from_level, to_level, triggered_at, inactivity_days}...] }`

**POST** `/api/v1/gamification/admin/atrophie/manual-trigger` (Admin only)
- Manually trigger atrophie check (for testing or catch-up)
- Body: `{ apprenant_id (optional - if omitted, runs for all apprenants) }`
- Response: `{ users_processed, badges_downgraded, notifications_sent }`

### Badge Claim with Credit Purchase Endpoints

**POST** `/api/credentials/claim-badge-with-purchase` (Learner)
**Purpose:** Claim badge, purchasing credits if needed (atomic transaction)

**Request:**
```json
{
  "badge_id": "uuid",
  "package_credits": 50,
  "stripe_payment_method_id": "pm_..."
}
```

**Response (Success — 200):**
```json
{
  "status": "success",
  "badge_claimed": true,
  "badge_url": "https://badgr.com/...",
  "credits_purchased": 50,
  "credits_spent": 1,
  "credits_remaining": 49
}
```

**Response (Already Owned — 409):**
```json
{
  "status": "error",
  "message": "Badge already owned",
  "badge_owned_date": "2026-01-01T10:00:00Z"
}
```

**Backend Logic:** Same atomic pattern as coaching booking
- BEGIN TRANSACTION
- Validate badge not already owned (409 conflict if claimed)
- Process Stripe payment (via API) for package_credits if applicable
- If Stripe success: INSERT credit_purchases (source='direct_purchase_woocommerce')
- UPDATE credits.balance_available += package_credits
- CREATE badge_claim {user_id, badge_id, credit_cost=1}
- DEBIT credits: UPDATE credits.balance_available -= 1
- CREATE credit_transaction {user_id, transaction_type='badge_spent', amount_credits=-1}
- COMMIT or ROLLBACK
- If Stripe fails at any point: ROLLBACK (no claim created, no credits added)

**Auth:** Self (Learner claims own badge)

---

## 📊 Analytics & Métriques

### Quoi Tracker (Events)

| Événement | Contexte | Valeur |
|-----------|----------|--------|
| `badge_earned` | When user unlocks badge | badge_id, apprenant_id, earned_at, trigger_type |
| `xp_allocated` | When XP points granted | apprenant_id, amount, source_type, source_id |
| `streak_milestone_hit` | When user hits 3/7/30 day milestone | apprenant_id, milestone_days, streak_id |
| `streak_reset` | When user loses streak | apprenant_id, streak_length_lost, reason (timeout/manual) |
| `dashboard_view` | When user views gamification dashboard | apprenant_id, device (mobile/desktop), time_spent |
| `badge_detail_view` | When user views badge details | apprenant_id, badge_id, from_context (dashboard/modal) |

### Dashboards par Rôle

#### Dashboard Apprenant (Front-Office)
- XP Progress : Current XP + XP this week + XP this month (sparkline chart)
- Streaks : Current streak counter, milestones progress, next milestone ETA
- Badges : Total earned, breakdown by category (pie chart), recently earned timeline
- Next Badges : Top 5 un-earned badges with progress bars
- All elements responsive, mobile-first design

#### Dashboard Coach
- Team Engagement Summary : # apprenants active (≥3 day streaks), # at-risk (0-2 day), # inactive
- Apprenants Table : List with sort/filter options, Last Active, Streaks, XP earned this week
- At-Risk Alerts : Highlighted list of apprenants with 0 activity 5+ days
- Engagement Trends : Weekly average XP per cohort, average streak length, badges earned per week
- Downloadable cohort report (CSV)

#### Dashboard Admin
- Platform-wide Metrics :
  - Badge Distribution Chart : Top 10 most-earned badges (bar chart)
  - Engagement by Streak : Histogram of apprenants binned by current streak (0 days, 1-2 days, 3-6 days, 7-14 days, 15+ days)
  - XP Distribution : Histogram of apprenants binned by XP earned this month (<50, 50-100, 100-200, 200+ XP)
  - Cohort Comparison : Metrics by module, by stage, by onboarding date (table)
- Badge Management :
  - Badges library with trigger configurations, active/inactive toggle
  - Recent badge unlocks feed
  - Trigger test tool (dry-run specific trigger)
- Analytics Filters : Date range, by module, by stage, by user segment
- Export capability : CSV for all charts

---

## ✅ Critères d'Acceptation MVP

### Fonctionnalités Core — XP & Streaks
- [x] XP system implemented (allocation, visible real-time)
- [x] XP points allocated correctly per activity type (journal_entry=+5, module_complete=+25, jac_validation=+50)
- [x] Streaks tracking implemented (daily counter, milestone badges, reset logic)
- [x] Streak milestones (3j/7j/30j) with badges

### Fonctionnalités Core — Badges Plateforme
- [x] Badges Plateforme system implemented (unlock triggers, 5 rarity levels, categories)
- [x] Badge library CRUD (create, edit, delete, configure nom/description/image/triggers)
- [x] BO Badge Management (create, edit, delete, configure triggers, assign nom/description/image/event)
- [x] Trigger configuration for Plateforme badges (event type, threshold, scope)

### Fonctionnalités Core — Badges Compétences (Dreyfus-Level)
- [x] Badges Compétences 5-level system (D1-D5 with colors: Bleu/Argent/Or/Platinum/Diamant)
- [x] Auto-trigger on JAC validation (Dreyfus level change triggers badge)
- [x] User competence badges tracking (user_competence_badges table)
- [x] Badges Compétences display in gallery (separate section from Plateforme)
- [x] Integration with Passeport module (Dreyfus level sync)

### Fonctionnalités Core — Open Badges Officiels (OB 2.0 Self-Hosted)
- [x] OB 2.0 assertions generated locally with cryptographic signatures
- [x] JSON-LD compliant (RFC 5545 format)
- [x] QR codes embedded in assertions (verification scannable from mobile)
- [x] Certificates downloadable as PDF (custom template with badge + learner details + verification URL)
- [x] Public assertion endpoint accessible for 3rd-party verification (no auth required)
- [x] Learner email = persistent identity across platforms
- [x] Revocation endpoint working (assertion marked revoked in DB)
- [x] No external API calls (zero dependency on prestataire)
- [x] LinkedIn share capability for Open Badges
- [x] Open Badges gallery section (separate from Plateforme + Compétences)
- [x] V3 migration path to OB 3.0 (DIDs) — transparent, no data loss

### Fonctionnalités Core — Atrophie Logic
- [x] Atrophie detection (90+ days inactivity per competence)
- [x] Dreyfus level downgrade on atrophie trigger (automatic decrement)
- [x] atrophie_log tracking (audit trail of downgrades)
- [x] Passeport integration (Dreyfus level change reflected in Passeport)
- [x] Atrophie notifications (user notified when badge downgraded)
- [x] BO Atrophie configuration (inactivity threshold, automation settings)
- [x] BO Atrophie manual trigger (admin can force check)

### Fonctionnalités Core — Dashboard & Notifications
- [x] Gamification Dashboard implemented (apprenant view with XP, Streaks, 3 badge types)
- [x] Badge detail modals implemented (click badge for details)
- [x] Badge notification system (in-app toast on unlock, atrophie alerts)
- [x] Competence badges section in dashboard (with atrophie status indicator)
- [x] Open Badges section in profile gallery

### Fonctionnalités Core — Back-Office Management
- [x] BO Badge CRUD (Plateforme badges)
- [x] BO Custom Badge management (create, edit, delete, approve)
- [x] BO Compétences Badges configuration (Dreyfus levels, colors, auto-trigger, atrophie)
- [x] BO Open Badges management (list, view, revoke, export)
- [x] BO Streak configuration (enable/disable, threshold management, reset override)
- [x] BO Atrophie configuration (thresholds, automation, manual trigger)

### Expérience Utilisateur
- [x] Dashboard loads <800ms (<400ms cached)
- [x] Badges appear immediately on unlock (toast within 500ms)
- [x] All sections responsive (mobile 2-col badge grid, stacked sections)
- [x] No layout shift/jank during load or interactions
- [x] Smooth animations (toast slide-in, modal fade-in, progress bar updates)

### Données & Intégrité
- [x] XP points allocated correctly per source_type
- [x] Badges unlocked only when trigger threshold met
- [x] No duplicate badge unlocks (idempotency)
- [x] Streaks counter accurate (increments daily, resets at midnight)
- [x] Activity log captures all qualifying activities

### Performance & Scalabilité
- [x] Database indexes optimized (idx_apprenant, idx_earned, idx_activity_date)
- [x] Handles 1000+ concurrent users without performance degradation
- [x] XP allocation API response <100ms
- [x] Dashboard queries <500ms even with 100+ apprenants per coach
- [x] Batch streak reset job runs daily without locking users

### Sécurité
- [x] User can only view own gamification data (except Coach can view assigned apprenants)
- [x] Admin badge grant operations audit logged
- [x] Streak reset operations audit logged
- [x] No elevation of privilege via gamification system

### Data Validation
- [x] Badge trigger event_type validated against allowed list
- [x] Trigger threshold values positive integers only
- [x] XP amount validation (positive, reasonable limits per source)
- [x] Apprenant_id foreign key validated

### Badge Credit System (MVP)
- [x] Badge cost (1 credit) displayed on detail page and marketplace
- [x] Current balance check implemented ("You have [X] credits")
- [x] Insufficient credit detection before claim attempt
- [x] Modal appears if credit insufficient (inline purchase option)
- [x] Atomic claim transaction: Credit purchase + badge claim together (all-or-nothing)
- [x] Duplicate claim prevention (badge already owned check)
- [x] Badge immediately visible in profile + badgr.com after claim
- [x] Email confirmation sent for successful claim
- [x] Credit transactions logged for all badge claims (credit_spent type)
- [x] Badge_claims table tracks source (sufficient_balance vs purchased_inline)
- [x] Credit purchase linkage maintained (credit_purchase_id FK when inline purchase)
- [x] No data loss on payment failure (rollback enforced)
- [x] Wallet balance updates immediately after claim
- [x] Stripe integration validates payments (test mode support)

---

## 🔗 Dépendances Inter-Modules

### Dépend De

| Module | Raison | Impact |
|--------|--------|--------|
| **Passeport Compétences (Module #2)** | XP system foundation, Dreyfus levels for competency badges | Critical : Must have XP allocation strategy defined, badge category for competency achievements |
| **Formation & Learning Paths (Module #1)** | Module/Parcours completion events trigger badges, XP allocation per activity | Critical : Formation module must emit completion_event that Gamification consumes |
| **JAC (Module #5)** | JAC validation triggers Dreyfus-level badges | Critical : JAC validation event must trigger corresponding badge unlock |
| **Notifications (Module #09)** | Badge unlock notifications, weekly digest | Important : MVP has in-app toast only, V2 adds email/push |

### Bloque

| Module | Raison | Impact |
|--------|--------|--------|
| **Back-Office & Analytics (Module #8)** | BO dashboard requires XP/badge data model and reporting endpoints | Critical : BO can't be completed until Gamification schema + API ready |
| **Masterclass & Classes Virtuelles (Module #12, V1)** | Attendance badges, participation badges trigger on class events | High : V1 feature, depends on Gamification badge system |

### Ordre Implémentation
```
✅ Phase 0 (Foundation)
  ├─ Passeport Compétences (XP strategy, Dreyfus mapping)
  └─ Formation Paths (completion events defined)

   ↓

⏳ Phase 2 (Semaine 7-9)
  ├─ THIS MODULE : Gamification & Badges
  ├─ Dépend : Formation emit events, Passeport XP system defined
  └─ Bloque : BO dashboards

   ↓

⏳ Phase 3 (Semaine 10-12)
  ├─ JAC integration (validation events trigger badges)
  └─ Back-Office (uses Gamification data for reporting)
```

---

## 📊 Budget & Planning

### Effort Total: **160-180 heures** (Updated: 3 badge types + Custom OB 2.0 self-hosted + Atrophie)

#### Breakdown par Composant

| Composant | Effort (h) | Timeline | Notes |
|-----------|-----------|----------|-------|
| **Backend** | **65-75h** | | |
| — XP Transaction system | 8h | Weeks 7-8 (J1-2) | Schema, allocation logic, API endpoints (unchanged) |
| — Badge Plateforme system | 12h | Weeks 7-8 (J2-3) | Schema, trigger logic, unlock conditions, custom badges |
| — Badge Compétences system | 15h | Weeks 8 (J1-2) | 5-level schema, Passeport integration, JAC event handling |
| — Open Badges integration | 60-80h | Weeks 8-12 | Custom OB 2.0 implementation (assertion generation, signing, QR generation, PDF certificates, local storage, public endpoints, revocation) |
| — Atrophie logic & daily job | 12h | Weeks 9 (J1-2) | 90-day inactivity detection, Dreyfus downgrade, atrophie_log, Passeport sync, notifications |
| — Streaks tracking system | 8h | Weeks 8 (J3-4) | Daily counter, reset logic, milestone detection (unchanged) |
| — Analytics & reporting endpoints | 8h | Weeks 9 (J3) | Dashboard data aggregation (expanded for 3 badge types, atrophie metrics) |
| — Audit logging system | 3h | Weeks 8 (J4) | Record all important actions |
| **Front-Office (React)** | **35-42h** | | |
| — Gamification Dashboard (3 badge types) | 18h | Weeks 8-9 (J1-2) | XP section, Streaks section, Plateforme badges, Compétences badges, Open Badges, responsive |
| — Badge Compétences gallery | 8h | Weeks 9 (J2) | Dreyfus levels display, colors, atrophie status indicator, re-engagement prompts |
| — Open Badges section | 6h | Weeks 9 (J3) | Download certificate, verify QR code, share to LinkedIn, public gallery view |
| — Badge detail modals | 5h | Weeks 9 (J4) | Modals for all 3 badge types, tooltips, interactions |
| — Coach engagement view | 6h | Weeks 9 (J4) | Apprenant list, filters, atrophie warnings, drill-in detail |
| — Notifications (toast + atrophie) | 3h | Weeks 9 (J4) | Toast component, atrophie alerts, animations, dismiss |
| — Coach Engagement Analytics | 5h | Week 10 | Apprenant engagement dashboard, atrophie metrics |
| **Back-Office (WordPress)** | **15-20h** | | |
| — Badge Plateforme CRUD | 5h | Weeks 8 (J3-4) | Create/edit/delete forms, validation (existing) |
| — Custom Badge builder | 4h | Weeks 8 (J4) | Coach/Admin ability to create module-specific badges |
| — Compétences Badges config | 5h | Weeks 9 (J1) | Configure Dreyfus levels, colors, auto-trigger, atrophie settings |
| — Open Badges management | 4h | Weeks 9 (J2) | List issued badges, view prestataire status, revoke, export |
| — Atrophie management | 4h | Weeks 9 (J2-3) | Configure inactivity thresholds, automation, manual trigger, affected users report |
| — Streak configuration | 3h | Weeks 8 (J4) | Configure thresholds, reset time, enable/disable (existing) |
| — Analytics dashboard (expanded) | 5h | Weeks 9 (J3-4) | Charts for all badge types, atrophie impact analysis, filters, export CSV |
| **Testing** | **15-18h** | | |
| — Unit tests (backend logic) | 6h | Weeks 9 (J3) | XP, all badge types, atrophie, streak reset |
| — Integration tests | 6h | Weeks 9 (J4) | Event flows, Open Badge prestataire API, Passeport sync, atrophie cascade |
| — OB 2.0 implementation tests | 5h | Week 11 | Assertion generation, signing, QR codes, certificate PDFs, public endpoints |
| — Security tests | 3h | Week 11 | Signature verification, assertion validation, revocation checks |
| — QA & bug fixes | 4h | Week 12 (buffer) | Manual testing, edge cases, performance tuning |
| **TOTAL** | **~170h** | **~5 weeks (Weeks 8-12)** | Estimate includes custom OB 2.0 self-hosted implementation |

#### Phase 2 Implementation Timeline
- **Semaine 7 (J1-2)** : XP system backend + Formation event integration
- **Semaine 8 (J3-5)** : Badge system + Streaks system + BO interfaces
- **Semaine 9 (J1-3)** : FO Dashboard + Coach view + Analytics + Testing
- **Semaine 10 (buffer)** : QA, refinements, performance tuning

#### Dépendances Critiques
- Formation module must emit completion_event by end of Week 6 (Phase 1)
- Passeport XP allocation strategy must be finalized by start of Week 7
- Notifications infrastructure (if V1) must be ready by Week 9
- BO framework must support analytics dashboard patterns (shared with other modules)

#### Précisions Nécessaires (À valider avec Pierre)

- [ ] XP allocation budget per activity type (how much XP for journal entry, module complete, etc.) — recommend : journal_entry = +5 XP, module_complete = +25 XP, jac_validation = +50 XP
- [ ] Badge unlock notifications MVP : in-app toast ONLY, or include email digest? (recommend: toast MVP, email V2)
- [ ] Leaderboards MVP : infrastructure ready but NOT visible? Or skip infrastructure MVP? (recommend: infrastructure ready, visibility V2)
- [ ] Streak reset timezone : use user's timezone or company/platform default? (recommend: configurable admin setting, default = Europe/Paris)
- [ ] Admin badge grant audit level : log all grant actions or summary only? (recommend: full audit log per grant)
- [ ] Gamification dashboard caching strategy : 5 min cache ok, or require real-time? (recommend: 5 min cache with manual refresh button)

---

## 🚀 Prochaines Étapes
1. Valider budget et timeline avec Pierre
2. Financer les précisions nécessaires (XP values, notification strategy, timezone)
3. Lancer implémentation Formation completion events (dependency pour Gamification)
4. Démarrer backend development Week 7

---

## 📞 Questions Bloquantes

**Question bloquante #1 : Leaderboards infrastructure MVP ou V2+ ?**

**Options :**
1. **Option A : Infrastructure ready MVP** → Create leaderboard tables + API endpoints, but NO frontend visibility in MVP. Feature toggle hides leaderboards from UI. Enables rapid V2 launch. Budget: +5h, Delay: none
2. **Option B : Skip MVP, build from scratch V2** → No leaderboard tables/endpoints until V2. Saves 5h MVP. Requires refactoring later. Budget: -5h MVP, +10h V2 rework

**Recommandation :** Option A (infrastructure ready) — Leaderboards are high-value V2 feature and infrastructure cost is minimal. Enables fast V2 launch without refactoring.

**Validation ?**

---

**Question bloquante #2 : Badge unlock notifications — email digest ou toast only MVP ?**

**Options :**
1. **Option A : Toast only MVP** → In-app toast on badge unlock, no email notifications. Simpler MVP. Email digest V2+. Budget: base estimate, Delay: none
2. **Option B : Toast + email digest MVP** → Add email notification infrastructure, template, weekly digest job. Richer engagement MVP. Budget: +8h (email system), Delay: +1 week
3. **Option C : Toast + push notifications (Firebase)** → Push notifications for badge unlocks. High engagement but complex setup. Budget: +12h (Firebase integration)

**Recommandation :** Option A (toast only) — Keeps MVP focused, email/push are nice-to-have V2 features. In-app toast sufficient for MVP engagement.

**Validation ?**

---

**Question bloquante #3 : Open Badges implementation strategy — DECISION LOCKED ✅**

**DÉCISION FINALE (2026-05-13) :** Option A — Custom Self-Hosted Open Badges 2.0

**Choix :** Custom self-hosted Open Badges 2.0 implementation (NOT external prestataire)

**Architecture Décidée :**
- Email-based identity (learner email = persistent badge ID across platforms)
- RFC 5545 compliance for calendar-friendly assertion formats
- Cryptographic signing of assertions locally
- QR code embedding in badge JSONs + PDF certificates
- Public verification endpoint (no external API dependency)
- V3 Migration Path: OB 3.0 + DIDs planned for Q1-Q2 2027 with zero data loss

**Impact :**
- Budget : +60-80h (custom OB 2.0 development vs 18h prestataire integration)
- Delay : None (same timeline, better long-term architecture)
- Licensing cost : €0/month (self-hosted, no external subscriptions)
- Infrastructure : Local OB 2.0 assertion server (WordPress REST API)
- Security : Cryptographic signing + email validation

**Rationale :**
1. Full control over badge issuance (no vendor lock-in)
2. Email-based identity portable across platforms (user-centric)
3. V3 evolution path already designed (OB 3.0 + DIDs)
4. Cost savings over 3+ years (no recurring prestataire fees)
5. Privacy-first: learner data stays in-house

**Implementation Details (See APIs section above):**
- 7 local API endpoints for OB 2.0 operations
- 11 acceptance criteria for self-hosted validation
- 5 weeks timeline (Weeks 8-12), ~170h total effort

**Status :** ✅ LOCKED — Dev team proceeds with custom OB 2.0 implementation starting Week 8
- Dev team starts Open Badges API integration (parallel track with badge system)
- Target: Open Badges ready by end of Semaine 9

**Validation ?**

