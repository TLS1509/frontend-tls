# 04 Coaching & 1-1 Messaging

**Version:** MVP Juillet 2026  
**Status:** 🟢 Spécification révisée  
**Effort estimé:** 110-130h (70-90h base + 30h Google + Outlook + 10-20h Coach FO pages)  
**Timeline:** Semaines 5-6 (Phase 3)  
**Dependencies:** Passeport Compétences (user context), Onboarding (profile), Credits (credit system), Notifications (alerts), Google Calendar (MVP) + Outlook (MVP), Missions/JAC/Projets (pour corrections)

---

## 📖 Vue d'Ensemble

### Objectif Métier

Module intégré de **coaching 1-1 + corrections** pour apprenants. Permet :

- **Apprenants** : Demander sessions coaching avec coach pré-assigné, recevoir corrections sur travaux (Missions, JAC, Projets, Assignements), communiquer async avec coach
- **Coaches** : Gérer agenda personnel (Google + Outlook sync), conduire sessions 1-1 synchrones, corriger travaux apprenants (feedback itératif), évaluer progression
- **Admin Platform** : Assigner coaches à apprenants, configurer tarifs, tracker activité

Élément critique du modèle Learning by Doing — apprentissage par accompagnement + feedback continu.

### Qui l'Utilise (Rôles)

- **Apprenant** : Réserve sessions coaching, reçoit feedback sur travaux, communique avec coach (messaging async), resoummet après corrections
- **Coach** : Gère agenda perso (calendar sync), valide sessions, corrige travaux (Missions/JAC/Projets/Assignements), documente feedback, ré-évalue progression
- **Admin Platform** : Assigne coach à apprenant, approuve coaches, configure credit coûts, voit dashboard aggregate
- **Company Admin** : Voit summary coaching pour company, gère budgets
- **Manager** : Approuve crédits si needed, voit team progress

### Scope — IN / OUT

#### ✅ IN (MVP Juillet 2026)

**Sessions & Calendrier:**
- Apprenant réserve session avec coach pré-assigné (Admin Platform l'a assigné)
- Session auto-validée après réservation (pas d'accept/reject par coach)
- Google Calendar sync (OAuth2) + Microsoft Outlook sync (bi-directional)
- Meet link auto-généré

**Messaging:**
- Async messaging apprenant ↔ coach (avant/après session, ou indépendant)
- Comments texte libre, notifications email + in-app

**Corrections Workflow:**
- Apprenant soumet travail (Missions, JAC, Projets, Assignements)
- Coach reçoit notification "À corriger"
- Coach annotate + ajoute comments détaillés
- Statut déroulant : 'À réviser', 'Approuvé', 'À resoummettre', 'Correction complète'
- Apprenant reçoit feedback, peut resoummettre
- Cycle itératif jusqu'à acceptance

**Coach Management:**
- Admin Platform assigne coach → apprenant reçoit notification
- Coach peut modifier availability calendar (Google + Outlook)
- Coach dashboard FO : Sessions à venir, corrections en attente, messaging

**Admin Dashboard:**
- Sessions par company (total, pending, completed)
- Corrections status (pending, in-review, approved, rejected)
- Coach utilization (sessions/semaine, corrections turnover)
- Credits consommés vs budget

#### ❌ OUT (Déféré V2+)

- Group coaching (1-many) — V2
- AI auto-matching coaches (Mistral) — V2
- Video recording + replay — V1
- Transcription & summary — V2 Mistral
- Performance analytics (coach improvement) — V1
- Multi-language — V2

### Dépendances Critiques

**Dépend de:**
- **Passeport Compétences** : Contexte apprenant (domaines, niveaux), coaches doivent maîtriser
- **Credits System** (Cahier #3) : Session coûte X crédits
- **Missions Apprenantes, JAC, Projets, Assignements** : Items à corriger
- **Notifications Module** : Reminders, feedback alerts
- **Google Calendar API + Microsoft Outlook API** : OAuth2 sync (MVP both)

**Bloque:**
- Back-Office Analytics (Cahier #8) : Coaching KPIs required
- Gamification (Cahier #7) : XP awarded per session + corrections
- Formation Module (Cahier #1) : Peut linker to coaching sessions (contextual)

---

## 📱 Écrans à Concevoir

### Front-Office (React) — Apprenant

| Écran | Rôle | Description | Priorité |
|-------|------|-------------|----------|
| **Coaching Hub** | Apprenant | Overview : assigned coach, upcoming sessions, pending corrections, messaging | P0 |
| **Book Session** | Apprenant | Request session with assigned coach, pick time slot from coach's calendar | P0 |
| **Session Detail** | Apprenant | Session info (coach, time, Meet link), pre-notes, feedback post-session | P0 |
| **Corrections Inbox** | Apprenant | List work to correct (Missions, JAC, Projects, Assignments) with coach feedback | P0 |
| **Correction Detail** | Apprenant | View coach's comments + statut (À resoummettre? Approuvé?), can resubmit | P0 |
| **Messaging Thread** | Apprenant/Coach | Conversation avec coach, text comments, read receipts | P0 |
| **Assigned Coach Profile** | Apprenant | View coach biography, expertise, availability, contact info | P1 |
| **Coaching Booking Detail + Refund** | Apprenant | (UPDATED) Booking info, coach details, reschedule option + refund window indicator, cancel button, refund status | P0 |
| **Coaching Cancellation Modal** | Apprenant | Confirmation modal with coach/date/time, refund eligibility, confirm/cancel buttons | P0 |

### Front-Office (React) — Manager

| Écran | Rôle | Description | Priorité |
|-------|------|-------------|----------|
| **Manager Coaching Approval Dashboard** | Manager | (NEW) Pending approvals tab, approved history, denied history, company pool balance widget, real-time list, approve/deny buttons | P0 |

### Front-Office (React) — Coach

| Écran | Rôle | Description | Priorité |
|-------|------|-------------|----------|
| **Coach Dashboard** | Coach | Overview : pending sessions, corrections to review, messaging inbox | P0 |
| **Session Calendar** | Coach | View personal calendar (Google + Outlook synced), manage availability | P0 |
| **Corrections Queue** | Coach | List work pending review (Missions, JAC, Projects, Assignments) by apprenant | P0 |
| **Correction Interface** | Coach | View submission, add comments per section, set statut (À réviser/Approuvé/etc.), save | P0 |
| **Assigned Apprenants** | Coach | List apprenants assigned to this coach, view profiles, progress summary | P0 |
| **Journal Entries Section** | Coach | View learner's journal entries if sharing enabled (role-based). Shows entry title, date, sentiment, coach comments count. Click to open entry detail. Filtered to assigned learners only. | P1 |
| **Messaging Thread** | Apprenant/Coach | Conversation, send comments | P0 |

### Back-Office (WordPress Admin)

| Écran | Rôle | Description | Priorité |
|-------|------|-------------|----------|
| **Coach Assignment** | Admin Platform | Assign coaches to apprenants (bulk or individual), view assignment history | P0 |
| **Coaching Dashboard** | Admin | KPIs : sessions total, corrections pending, coach utilization, credits used | P0 |
| **Session Monitoring** | Admin | View all sessions (filter by company, coach, apprenant, status) | P0 |
| **Coach Management** | Admin | CRUD coaches, configure availability, view performance stats | P0 |
| **Credit Pricing Config** | Admin | Set cost per session (global or per domain) | P0 |
| **Google/Outlook OAuth Config** | Admin | Manage API credentials, test sync, view sync status | P0 |

---

## ⚙️ Fonctionnalités (MVP)

### Core

1. **Coach Assignment (Admin)** - Admin Platform assigns coach to apprenant at signup or onboarding, apprenant notified
2. **Session Booking** - Apprenant requests session with assigned coach, picks available time slot, auto-validated
3. **Calendar Synchronization** - Google Calendar + Outlook (bi-directional OAuth2 sync), Meet links auto-generated
4. **Async Messaging** - Apprenant & Coach communicate via text comments, notifications email + in-app
5. **Corrections Workflow** - Apprenant submits work → Coach reviews + comments → Apprenant resubmits (iterative)
6. **Corrections Status Tracking** - Menu déroulant : 'À réviser', 'Approuvé', 'À resoummettre', 'Correction complète'
7. **Credit Consumption** - Session charges X credits (config admin), auto-debited on confirmation
8. **Coach FO Dashboard** - Coach views : sessions, corrections queue, messaging, calendar
9. **Apprenant FO Dashboard** - Apprenant views : assigned coach, upcoming sessions, corrections inbox, messaging
10. **Session Execution** - Join Google Meet, 1-1 video call with coach
11. **Post-Session Feedback** - Coach optionally adds notes, apprenant can see session summary
12. **Journal Entries Access (Coach FO)** - Coach can view journal entries for assigned learners IF apprenant enabled sharing with Coach role. Access scoped: assigned learners only. Displays entry list (title, date, sentiment, comment count), allows clicking to view full entry + add coach comments (tracked as journal_comment_added event in Analytics). Permission enforced: NO access if sharing disabled by apprenant.
13. **Bi-Directional Calendar Synchronization (Google + Outlook)** - Coach connects personal calendar (Google or Outlook) via OAuth2. Platform reads coach's calendar availability and applies logical AND: displayed booking slots = (platform availability) AND (coach calendar shows free time). If coach marks unavailable on platform but available in calendar (or vice versa), the stricter rule applies (intersection of both). Fallback mode: if coach has no calendar connected, system reverts to platform-only availability rules. One-way invite sending: once session/masterclass/virtual class/event created on platform, system auto-sends calendar invites to both coach and learner calendars (Google Meet link included). Sync frequency: every hour between 8:00 AM - 8:00 PM GMT+2. Error handling: if hourly sync fails, system sends warning email to coach + displays warning banner on learner's booking interface; coach can still confirm session directly via platform as fallback. OAuth tokens stored encrypted (access_token + refresh_token).

### Credit Consumption & Validation (Coaching Module)

12. **Coach Session Rate Configuration** - Admin Platform sets coaching session cost in `credit_pricing` table (global default or company-specific override), expressed in Classic Credits
13. **Learner Credit Cost Display** - When apprenant books session, system displays credit cost before confirmation (e.g., "This session costs 10 credits")
14. **Credit Validation Workflow Integration** - System checks company/team `credit_validation_workflows` config:
    - If `require_credit_validation = FALSE` → Auto-debit credits on session confirmation (Coach side = auto-validated after booking)
    - If `require_credit_validation = TRUE` → Creates `credit_request` entry, queues for manager approval, only debits after approval
15. **Special Credits Handling for Coaching** - If learner has Special Credits restricted to 'coaching_only', system debits Special Credits first, then Classic Credits as fallback

### Credit Cost Management & Manager Approval (MVP)

1. **Manager Approval Toggle (Per Company/Team)**
   - Default: Approval required for all Coaching bookings
   - Configurable: Per company manager OR super-admin (defined during onboarding)
   - Requirement: Coach approves booking OR manager approves credit debit (can be same person)

2. **Coaching Refund Window (72 hours)**
   - Learner initiates refund self-service if cancelled <72h before session
   - Auto-approved → Credit restored to wallet instantly
   - Logged in audit trail

3. **Credit Cost Hardcoded (MVP)**
   - Coaching session = 1 credit (configurable in V2)
   - Stored in credit_pricing table

### Secondary

12. **Calendar Availability Management** - Coach can block/unblock times in personal calendar (Google + Outlook)
13. **Correction Comments** - Coach adds detailed text comments per section of submission
14. **Notification Reminders** - Session reminders J-1, J-0 (email + in-app)
15. **Coach Profile (Public)** - Apprenant sees assigned coach biography, expertise, languages, availability
16. **Admin Reports** - Export coaching + correction metrics by company, coach, apprenant

---

## 👥 Manager/Team Leader Capabilities

### Manager Correction of Learner Positionnement

**Contexte:** Après que apprenant complète le questionnaire de positionnement initial et son Passeport est seedé avec Dreyfus levels, le manager/team leader peut revoir et corriger les niveaux si nécessaire.

**Feature:** Manager/Team Leader accède à fiche apprenant depuis company space et peut demander ou directement corriger les Dreyfus levels du Passeport apprenant

#### User Journey: Manager → Learner Card → Adjust Positionnement

**Acteur:** Manager/Team Leader (manager d'équipe ou super admin)  
**Déclencheur:** Manager accesse company dashboard et cherche à ajuster compétences apprenant  
**Objectif:** Revoir + corriger positionnement initial si apprenant s'est mal auto-évalué

##### Étapes Détaillées

1. **Manager accesse Learner Card depuis company dashboard**
   - Sub-step 1: Manager navigates to "Equipe" / "Apprenants" → sees list of assigned learners
   - Sub-step 2: Clique sur un apprenant → fiche apprenant opens (detailed view)
   - Sub-step 3: Sees apprenant's Passeport avec competencies + Dreyfus levels (seeded from questionnaire)
   - Sub-step 4: Scans positionnement initial, notes niveau actuel
   - Feedback: Learner card fast-loads (<500ms), Passeport visible
   - Durée: Instant

2. **Manager reviews apprenant's initial positionnement**
   - Sub-step 1: Voit tableau competencies + Dreyfus levels + source ("questionnaire_auto", "questionnaire_manual_confirm", etc.)
   - Sub-step 2: Can see confidence scores si disclosed (optional)
   - Sub-step 3: Manager scans + identifies si positionnement semble incorrect (ex: "Says level 4 in Python, but doesn't have that experience on CV")
   - Feedback: Clear visual hierarchy (level bars, color-coded)
   - Durée: ~2-5 min

3. **Manager suggests ou directly corrects (sur demande)**
   - Sub-step 1a (Option A - Suggest): Manager clique "Suggest Correction" sur une competency
   - Sub-step 1b (Option B - Direct Correction): Manager clique "Correct" si role permits (need to define permission level)
   - Sub-step 2a (Suggest path): Modal affichée "Suggest new level for [Competency]: [current] → [suggested]" + optional comment field
   - Sub-step 2b (Direct path): Directly updates level + logs change with manager comment
   - Sub-step 3a (Suggest): Clique "Send suggestion" → notification sent to apprenant
   - Feedback: Modal smooth, <300ms; Direct update instant
   - Durée: ~30s per correction

4. **If Apprenant notified (Suggest path)**
   - Sub-step 1: Apprenant reçoit notification: "Manager [Name] suggests your [Competency] is Dreyfus [X]. Current: Dreyfus [Y]"
   - Sub-step 2: Apprenant can "Accept" / "Reject" / "Propose counter-level"
   - Sub-step 3: If accept → Passeport updated immediately
   - Sub-step 4: If reject → stays as is, manager can see rejection + comment
   - Feedback: Clear notification, CTA obvious
   - Durée: Real-time update

5. **Passeport updated avec manager correction**
   - Sub-step 1: Corrected Dreyfus level reflétée dans Passeport apprenant
   - Sub-step 2: Timestamp + source logged ('manager_correction') + manager_id recorded
   - Sub-step 3: Coach (si assigné) notifié: "[Manager] adjusted [Apprenant]'s [Competency] level"
   - Sub-step 4: Audit trail accessible (Admin → Coach Management → Correction History)
   - Feedback: Success state clear, change logged
   - Durée: Instant

##### Conditions de Succès ✅
- [ ] Manager can view learner positionnement from company dashboard
- [ ] Manager can suggest correction (send notification to apprenant)
- [ ] Manager can directly correct if role permits (TBD: which roles?)
- [ ] Apprenant receives notification + can accept/reject suggestion
- [ ] Passeport updated immediately upon acceptance
- [ ] All corrections logged in audit trail (source + timestamp + manager_id)
- [ ] Coach notified of manager corrections
- [ ] Timing: Manager correction flow <2 min end-to-end

##### Erreurs & Edge Cases ❌

**Cas 1: Manager tries to correct, apprenant rejects**
- Scénario: Manager suggests level 2, apprenant says "No, I'm level 3" + adds comment "I have 5 years experience"
- Comportement attendu:
  - Step 1: Rejection recorded (source: 'apprenant_rejected_manager_suggestion')
  - Step 2: Manager can see rejection + apprenant's reasoning
  - Step 3: Manager can escalate to coach for discussion OR accept apprenant's level
  - Step 4: Passeport remains at apprenant's level or updated to manager's if manager overrides
- Feedback: Clear rejection reasoning visible
- Impact: Trust important - don't override lightly, coach mediation

**Cas 2: Multiple managers/admins try to correct same competency**
- Scénario: Both Manager A and Manager B try to correct Python level simultaneously
- Comportement attendu:
  - Step 1: First to click "Correct" wins (optimistic lock)
  - Step 2: Second gets message "Already updated by [Manager A], current level: [X]"
  - Step 3: Second can refresh + see latest level
- Feedback: Clear conflict messaging
- Impact: Prevent conflicting corrections

**Cas 3: Manager-corrected level conflicts with coach assessment**
- Scénario: Manager says Dreyfus 2, Coach assessments show Dreyfus 4 (after actual work)
- Comportement attendu:
  - Step 1: Coach can see both: "Questionnaire: 3, Manager: 2, Assessments: 4"
  - Step 2: Coach can manually adjust to actual level (assessments override)
  - Step 3: Audit trail shows full history
- Feedback: Full transparency on level history
- Impact: Coach final authority on actual competency level

##### Data Model Impact

Add to `competency_assessments` table (from P0-5):
- `manager_id` (FK) - If manager made correction
- `manager_comment` (TEXT) - Manager's reasoning
- `apprenant_response` (ENUM) - 'accepted', 'rejected', 'counter_level_proposed'
- Updated `source` field: include 'manager_correction' option

---

## 🚀 Possible Évolutions (V2+)

### V1 (Septembre 2026)
- **AI Coach Matching** : Mistral suggests best coach for apprenant competency
- **Video Recording** : Optional session recording + replay link
- **Performance Analytics** : Coach improvement trends, quality metrics

### V2 (Q1 2027)
- **Group Coaching** : 1 coach with multiple apprenants simultaneously
- **AI Transcription & Summary** : Auto-transcribe session, Mistral summarizes
- **Advanced Annotations** : Inline document markup (vs text comments only)
- **Mobile App** : Native iOS/Android for coaching management

---

## 👥 User Journeys (Format 3)

### User Journey #1 : Apprenant → Demander Session Coaching avec Coach Assigné

**Acteur :** Apprenant (niveau intermédiaire, coach déjà assigné par Admin Platform)  
**Déclencheur :** Apprenant clique "Book Coaching Session" ou "Voir coach" sur dashboard  
**Objectif :** Réserver une session avec son coach assigné, recevoir Meet link

#### Étapes Détaillées

1. **Apprenant accède Coaching Hub depuis navigation**
   - Apprenant clique "Coaching" menu → Hub page charge
   - Affiche : "Your Coach: [Coach Name]" + "Book Session" button + upcoming sessions list + messaging inbox
   - Feedback : Page load ~400ms
   - Durée : ~400ms

2. **Apprenant clique "Book Session"**
   - Modal ou page affiche : Coach calendar (next 7 days) avec créneaux libres (vert) et occupés (gris)
   - Apprenant voit : "Lundi 14h-15h (libre)", "Mardi 10h-11h (libre)", "Mercredi n/a"
   - Apprenant clique créneau "Lundi 14h-15h"
   - Feedback : Calendar load ~300ms
   - Durée : ~300ms

3. **Apprenant confirme booking**
   - Confirmation modal : "Book coaching session Monday 2-3pm with [Coach]?"
   - Affiche coût : "10 credits"
   - Apprenant clique "Confirm"
   - System débite 10 credits, crée session, génère Meet link
   - Feedback : Confirmation in <1s
   - Durée : ~500ms

4. **System syncs Google Calendar + Outlook**
   - Session créée → Google event auto-créé (coach's calendar)
   - Outlook event également créé (if coach has Outlook sync enabled)
   - Meet link générée
   - Durée : ~5s total

5. **Apprenant reçoit confirmation**
   - Apprenant voit "Session booked ✅" → Redirected to Session Detail page
   - Session Detail affiche : Coach name, time, location (Google Meet link), pre-session notes field
   - Email sent : "Your coaching session confirmed — [Meet link]"
   - Coach notified : Email "New coaching session with [Apprenant] — Monday 2-3pm"
   - Feedback : Email delivered ~2s
   - Durée : ~2s

6. **Apprenant can add pre-session context**
   - On Session Detail page, apprenant clicks "Add Notes" → Text field appears
   - Apprenant types : "Quand je peux plus les déléguer, comment je priorise?"
   - Coach can see notes before session (help prepare)
   - Feedback : Notes saved instantly
   - Durée : Instant

7. **Session reminders sent**
   - J-1 : Reminder email + in-app notification "Your coaching session tomorrow at 2pm"
   - J-0, 15min before : "Session starts in 15 minutes — [Join Meet]"
   - Feedback : Reminders sent on schedule
   - Durée : Triggered at J-1 & J-0

#### Conditions de Succès ✅
- [ ] Coach pre-assigné visible on Apprenant dashboard
- [ ] Calendar loads <400ms
- [ ] Credits debited on confirmation
- [ ] Google + Outlook events created within 5s
- [ ] Meet link functional
- [ ] Both receive confirmation emails
- [ ] Pre-session notes savedable
- [ ] Reminders delivered on time

#### Erreurs & Edge Cases ❌

**Cas 1 : Apprenant insufficient credits**
- Scénario : Apprenant has 5 credits, session costs 10
- Comportement attendu :
  - At confirmation : "You have 5 credits, session costs 10. Contact Manager for additional credits"
  - Apprenant can cancel booking
  - OR manager approves additional 5 credits → Session confirmed
- Feedback : Clear error, option to escalate
- Impact : Prevents overspend

**Cas 2 : Coach blocked that time (last-minute unavailability)**
- Scénario : Coach just marked time unavailable (unexpected conflict)
- Comportement attendu :
  - Calendar refreshes real-time
  - Slot no longer appears as available
  - Apprenant must choose different time
- Feedback : "That time is no longer available, please select another"
- Impact : Prevents double-booking

**Cas 3 : Coach calendar sync error (Google API down)**
- Scénario : Session created, but Google Calendar sync fails
- Comportement attendu :
  - System retries sync (exponential backoff)
  - If fails after 3 retries : Flag for admin review
  - Session still valid locally (coach still gets notification)
  - Coach calendar updated once Google API recovers
- Feedback : Transparent sync status shown
- Impact : Graceful degradation

**Cas 4 : Apprenant cancels <24h before**
- Scénario : Apprenant booked Monday, cancels Sunday 2pm (22h before)
- Comportement attendu :
  - Apprenant clicks "Cancel" on Session Detail → confirmation modal
  - "Cancel session? Your 10 credits will be refunded."
  - System refunds credits, marks session cancelled
  - Coach notified, calendar event deleted
  - Meet link revoked
- Feedback : Cancellation processed instantly
- Impact : Credits refunded, coach slot freed

---

### User Journey #2 : Coach → Corriger Travail Apprenant (Missions, JAC, Projets)

**Acteur :** Coach (expert domaine, responsable corrections 5-10 apprenants)  
**Déclencheur :** Coach reçoit notification "À corriger" OU accède Coach Dashboard  
**Objectif :** Revoir travail apprenant, ajouter feedback détaillé, approuver ou demander resoumission

#### Étapes Détaillées

1. **Coach reçoit notification travail à corriger**
   - Apprenant soumet mission/JAC/projet → System envoie notification coach
   - Notification : Email + in-app badge "Corrections (3)" on Coach Dashboard
   - Email subject : "[Apprenant Name] submitted Mission 1 — needs review"
   - Feedback : Notification delivered <1min
   - Durée : <1min

2. **Coach accède Corrections Queue**
   - Coach clique "Corrections" on navigation → Corrections page charge
   - Table affiche : Apprenant name, item type (Mission/JAC/Project), submission date, current status
   - Coach sees : "Alice Martin — Mission 1 — Submitted 2 hours ago — [Open]"
   - Feedback : Page load ~400ms
   - Durée : ~400ms

3. **Coach views submission & adds comments**
   - Coach clicks mission → Correction Interface opens
   - Affiche : Full submission (text/images/documents), organized by section
   - Coach reads content, hovers over sections to add comments
   - Coach types comment : "Good analysis here, but this part needs more depth. Explain why..."
   - Coach can comment on multiple sections
   - Each comment saved instantly (auto-save)
   - Feedback : Submission loads ~1s
   - Durée : ~5-10 min per correction

4. **Coach sets correction status via dropdown menu**
   - At bottom of interface, Coach sees status dropdown
   - Options : 
     - "À réviser" (apprenant needs to revise based on comments)
     - "Approuvé" (work meets requirements)
     - "À resoummettre complètement" (major revision needed)
     - "En attente clarification" (coach asking questions)
   - Coach selects "À réviser" (apprenant has feedback to address)
   - Coach clicks "Submit Feedback" button
   - Feedback : Status set instantly
   - Durée : Instant

5. **Apprenant receives feedback notification**
   - System sends notification : "Your coach reviewed Mission 1 — [View Feedback]"
   - Apprenant can see all coach comments + status ("À réviser")
   - Apprenant reads comments, prepares revision
   - Feedback : Notification delivered <1min
   - Durée : <1min

6. **Apprenant resubmits after revision**
   - Apprenant addresses comments, resubmits mission
   - Coach receives new notification : "Alice resubmitted Mission 1"
   - Coach reviews revision (same interface)
   - Coach adds new comments if needed, OR sets status "Approuvé"
   - Cycle repeats until approved
   - Feedback : Resubmission notifications clear
   - Durée : Variable (depends on apprenant revision time)

7. **Final approval**
   - Coach sets status "Approuvé"
   - Apprenant receives notification : "Mission 1 Approved ✅"
   - XP awarded (based on item type)
   - Passeport may auto-update (if applicable)
   - Feedback : Clear approval confirmation
   - Durée : Instant

#### Conditions de Succès ✅
- [ ] Corrections queue visible on Coach dashboard
- [ ] Comments per section clear + linked to specific content
- [ ] Status dropdown working (4 options: À réviser/Approuvé/À resoummettre/En attente)
- [ ] Comments auto-saved
- [ ] Apprenant notified when feedback received
- [ ] Resubmission process clear
- [ ] Final approval triggers XP award
- [ ] Audit trail of all feedback versions

#### Erreurs & Edge Cases ❌

**Cas 1 : Coach doesn't complete corrections**
- Scénario : Coach hasn't reviewed submission after 72h
- Comportement attendu :
  - Admin notified : "Coach [Name] has 2 corrections pending >72h"
  - Coach receives reminder email
  - If >1 week : Flag for review
- Impact : Ensures timely feedback

**Cas 2 : Apprenant resubmits then coach rejects again**
- Scénario : Apprenant resubmits, coach still sets "À réviser"
- Comportement attendu :
  - Apprenant notified : "Coach requested revisions again"
  - Comment shows iteration count ("Revision 1", "Revision 2")
  - If >3 iterations : Flag for escalation (maybe 1-1 coaching session needed)
- Impact : Prevents infinite loops

**Cas 3 : Multiple coaches reviewing same work**
- Scénario : Expert + Coach both need to review (complex item)
- Comportement attendu :
  - System allows multiple comments per section
  - Each comment tagged with reviewer name
  - Status requires consensus (both must approve before "Approuvé")
- Impact : Quality gate

---

### User Journey #3 : Coach → Gérer Sessions & Messaging

**Acteur :** Coach (manages 10-15 sessions/week, messaging avec apprenants)  
**Déclencheur :** Coach accède Coach Dashboard  
**Objectif :** Voir upcoming sessions, join sessions, communicate async avec apprenants

#### Étapes Détaillées

1. **Coach accède Coach Dashboard**
   - Coach logs in → Dashboard shows 3 sections : "Upcoming Sessions", "Corrections", "Messages"
   - Sessions section : "Monday 2-3pm with Alice Martin", "Wednesday 10am with Bob Chen", etc.
   - Corrections section : "3 items pending review"
   - Messages section : "2 unread messages"
   - Feedback : Dashboard load ~300ms
   - Durée : ~300ms

2. **Coach checks personal calendar**
   - Coach clicks "Calendar" → Personal calendar view (Google Outlook synced)
   - Shows : All sessions + personal time blocks
   - Coach can mark self unavailable (e.g., "Team meeting 3-4pm Tuesday")
   - Changes sync back to Google + Outlook within 2 min
   - Feedback : Calendar load ~300ms, sync ~2min
   - Durée : ~2min

3. **Coach joins session at session time**
   - Session scheduled for Monday 2pm → Coach sees reminder 15min before
   - Coach clicks "Join Session" button → Browser opens Google Meet
   - Apprenant already waiting (or joins) → 1-1 call starts
   - Coach can take notes in session detail page (side panel)
   - Feedback : Meet loads <3s
   - Durée : Variable (typically 45-60 min)

4. **Coach sends async messages**
   - Coach clicks "Messages" → Sees list of conversations (apprenant names)
   - Coach clicks apprenant name → Conversation thread
   - Coach types message : "Hi Alice, before our session Monday, can you prepare a list of delegation scenarios you encounter?"
   - Coach hits send → Message delivered immediately
   - Apprenant receives notification (email + in-app)
   - Feedback : Message sent <1s
   - Durée : Instant

5. **Coach receives apprenant messages**
   - Apprenant sends message → Coach receives notification
   - Coach can reply in-thread immediately
   - Full conversation history visible (threaded)
   - Feedback : Messages delivered <1s
   - Durée : <1s

#### Conditions de Succès ✅
- [ ] Dashboard shows real-time sessions list
- [ ] Calendar syncs bi-directionally (Google + Outlook)
- [ ] Meet link functional
- [ ] Messaging instant + notified
- [ ] Read/unread status tracking

#### Erreurs & Edge Cases ❌

**Cas 1 : Coach late to session**
- Scénario : Session starts at 2pm, coach joins at 2:10pm
- Comportement attendu :
  - Apprenant sees "Coach joining..." notification
  - Coach can view apprenant's pre-session notes + context
  - System logs join time (for records)
- Impact : Coach still has context

**Cas 2 : Coach wants to reschedule session**
- Scénario : Coach blocked time, needs to reschedule with apprenant
- Comportement attendu :
  - Coach clicks "Reschedule" on session detail → Propose alternative time
  - Apprenant receives notification + calendar invite
  - Apprenant confirms new time
  - Google + Outlook calendars updated
- Impact : Smooth rescheduling

---

### User Journey #4 : Admin Platform → Assigner Coach à Apprenant

**Acteur :** Admin Platform (manages coach assignments across all companies)  
**Déclencheur :** New apprenant signup OR manual coach assignment  
**Objectif :** Assign appropriate coach based on domain expertise

#### Étapes Détaillées

1. **Admin views pending assignments**
   - Admin BO → "Coach Assignments" tab → "Pending" section
   - Shows new apprenants without coaches (e.g., "Alice Martin — Hard Skills focus — No coach assigned")
   - Feedback : Page load ~400ms
   - Durée : ~400ms

2. **Admin selects coach for apprenant**
   - Admin clicks apprenant "Alice Martin" → Assignment modal opens
   - Shows : Apprenant profile (domain focus, company, level), available coaches list
   - Coaches filtered by domain expertise
   - Admin sees : "Marie Dupont (Leadership expert, 50+ sessions, 4.6⭐)" → Select
   - Admin clicks "Assign" → Confirmation modal
   - Feedback : Selection instant
   - Durée : Instant

3. **System assigns coach**
   - Assignment saved → Apprenant + Coach both notified
   - Email to apprenant : "You've been assigned to Coach [Name]. Book your first session!"
   - Email to coach : "New apprenant assigned: [Name]. Check your dashboard."
   - Apprenant dashboard updated : "Your Coach: [Coach Name]"
   - Feedback : Notification delivered <1min
   - Durée : <1min

4. **Admin monitors assignment health**
   - Admin BO → "Coach Assignments" → Shows all assignments with metrics
   - Table : Coach name, number of apprenants, sessions completed, avg feedback, utilization
   - Admin can bulk-reassign if coach overloaded
   - Feedback : Dashboard real-time
   - Durée : Instant

#### Conditions de Succès ✅
- [ ] Coach assignment interface intuitive
- [ ] Both apprenant + coach notified
- [ ] Assignment shows on both dashboards
- [ ] Admin can reassign easily
- [ ] Utilization metrics visible

---

### User Journey #5 : Manager → Coaching Booking Approval (If Approval Required)

**Acteur:** Company Manager  
**Déclencheur:** Learner books coaching session, approval required per company config  
**Objectif:** Manager approves credit debit, confirms coaching booking can proceed

#### Étapes Détaillées

1. **Learner initiates coaching booking (credit sufficient)**
   - Learner completes booking form (coach, date, time, topic)
   - System detects: Approval required for this company (config check)
   - Booking status = 'pending_approval'
   - Feedback: "Booking pending manager approval"
   - Durée: Instant

2. **Manager receives notification**
   - Email: "[Learner Name] booked [Coach Name] on [Date] — Approve to confirm (Cost: 1 credit)"
   - Dashboard: Notification badge "N pending approvals"
   - Durée: Delivery ~1-5 min

3. **Manager navigates to approval dashboard**
   - Opens /dashboard → Coaching section → "Pending Approvals" tab
   - Lists all pending bookings with: Learner name, coach, date, credit cost, company pool balance
   - Buttons: "Approve" (primary), "Deny" (secondary)
   - Feedback: Real-time list (updated every 30s)
   - Durée: Instant

4. **Manager clicks "Approve"**
   - Sub-step: Confirms action ("This will debit 1 credit from company pool. Continue?")
   - Sub-step: Clicks final confirmation button
   - Feedback: Button shows "Processing..." spinner
   - Durée: ~1s

5. **System processes approval — Atomic debit + confirmation**
   - Backend: BEGIN TRANSACTION
     - Verify company pool has sufficient credits
     - IF yes: Debit 1 credit, UPDATE coaching_bookings.status = 'confirmed', UPDATE approval_status
     - CREATE credit_transaction (coaching_spent, manager-approved)
     - COMMIT
   - Feedback: Dashboard item changes to "✅ Approved", status updates to 'confirmed'
   - Durée: <2s

6. **Learner & Coach notified of confirmation**
   - Email (learner): "Your coaching session with [Coach] on [Date] is confirmed! (1 credit charged to company)"
   - Email (coach): "[Learner Name] booking confirmed on [Date]"
   - Dashboard: Learner sees confirmed booking in calendar
   - Durée: <1 min

#### Conditions de Succès ✅
- [ ] Approval status transitions correctly (pending → approved/denied)
- [ ] Credit debit atomic (all-or-nothing, no partial state)
- [ ] Manager sees pending list with accurate credit costs
- [ ] Learner receives confirmation only after approval
- [ ] Coach receives confirmation only after approval
- [ ] Audit trail logs who approved + when
- [ ] Deny option available (booking cancelled, no credit charged)

#### Erreurs & Edge Cases ❌

**Cas 1 : Manager denies booking**
- Scénario: Manager clicks "Deny" for legitimate reason
- Comportement attendu:
  - Booking cancelled (status = 'cancelled', reason = 'manager_denied')
  - NO credits charged (refund not needed, never debited)
  - Learner notified: "Your booking request was not approved. Contact manager for reason."
  - Coach not notified (booking never confirmed)
- Feedback: Clear cancellation message
- Impact: Learner can request again or choose different coach

**Cas 2 : Company pool becomes insufficient before approval processes**
- Scénario: Manager approves, but another manager approved a higher-cost booking first, depleting pool
- Comportement attendu:
  - Transaction validation fails (insufficient pool balance)
  - System rolls back debit
  - Manager sees error: "Company pool insufficient. Current: 0/1 credits needed"
  - Booking remains pending (manager can retry later when pool refunded)
- Feedback: Clear error with pool balance
- Impact: No credit loss, booking protected

**Cas 3 : Approval timeout (manager doesn't respond within 7 days)**
- Scénario: Booking pending approval >7 days (configurable)
- Comportement attendu:
  - Auto-expire approval request (status = 'approval_expired')
  - Booking cancelled (not confirmed)
  - Learner notified: "Your booking request expired. Please book again."
  - Manager reminder: Optional escalation email
- Feedback: Clear expiration notice
- Impact: Prevents stale pending bookings

---

### User Journey #6 : Learner → Coaching Refund (Within 72 Hour Window)

**Acteur:** Learner (or Coach on behalf)  
**Déclencheur:** Learner (or Coach) cancels booking <72 hours before session  
**Objectif:** Initiate refund, auto-approve if within window, restore credit to wallet

#### Étapes Détaillées

1. **Learner navigates to booking detail page**
   - Opens /bookings → Clicks coaching session booking
   - Page shows: Coach, date, time, credit cost (1), "Cancel Session" button (red)
   - If <72h to session: Button + message "Cancel within 72h for full refund"
   - If ≥72h to session: Button + message "Cancellation not eligible for refund"
   - Feedback: Clear window indicator
   - Durée: Instant

2. **Learner clicks "Cancel Session"**
   - Modal appears: "Cancel coaching session with [Coach] on [Date]?"
   - Sub-text: "This will refund 1 credit to your wallet (within 72h window)"
   - Buttons: "Confirm Cancel" (primary, red), "Keep Booking" (secondary)
   - Durée: Instant

3. **Learner confirms cancellation**
   - Clicks "Confirm Cancel"
   - Frontend POST /api/refunds/request {booking_id, service_type='coaching'}
   - Feedback: "Processing refund..." spinner
   - Durée: ~2s

4. **Backend validates refund eligibility**
   - Checks: booking.datetime_start - NOW < 72h
   - IF true: refund_eligible = true
   - IF false: refund_eligible = false, requires manual support review
   - Feedback: Passed or pending review
   - Durée: <1s

5. **Auto-approval (if eligible) — Atomic refund + cancellation**
   - BEGIN TRANSACTION
     - UPDATE coaching_bookings.status = 'cancelled'
     - CREATE credit_transaction (refund, +1 credit)
     - UPDATE credits.balance_available += 1
     - CREATE refund_record (approved_auto, timestamp)
   - COMMIT
   - Feedback: "✅ Refund processed. 1 credit restored to wallet"
   - Durée: <2s

6. **Notifications sent to all parties**
   - Email (learner): "Coaching session cancelled. 1 credit refunded to wallet"
   - Email (coach): "[Learner Name] cancelled coaching session on [Date]"
   - Dashboard: Booking moves to "Cancelled" section, wallet updated
   - Durée: <1 min

#### Conditions de Succès ✅
- [ ] 72-hour window calculated correctly
- [ ] Auto-approval instant (if within window)
- [ ] Credit restored immediately (balance visible)
- [ ] Coach notified of cancellation
- [ ] Learner email confirms refund + new balance
- [ ] Audit trail includes refund reason + approver (auto or manual)

#### Erreurs & Edge Cases ❌

**Cas 1 : Cancellation after 72-hour window**
- Scénario: Learner cancels 48 hours AFTER session window closed (too late)
- Comportement attendu:
  - Refund marked as "after_window"
  - Sent to support dashboard for manual review
  - Learner: "Cancellation outside refund window. Contact support for review"
  - Support can approve/deny based on policy override
- Feedback: Clear explanation, support contact info
- Impact: Requires manual intervention, no auto-refund

**Cas 2 : Coach cancels on behalf of learner**
- Scénario: Coach initiates cancellation (e.g., emergency)
- Comportement attendu:
  - Same refund process (72h window applies)
  - Audit trail shows "Cancelled by: Coach [Name]"
  - Learner still receives email confirmation + refund
- Feedback: Transparent, learner informed of who cancelled
- Impact: Refund still auto-approved if within window

---

### User Journey #7 : Coach → Connect Google/Outlook Calendar via OAuth

**Acteur :** Coach (needs to connect personal calendar)  
**Déclencheur :** Coach accesses Coach Dashboard or Settings, clicks "Connect Calendar"  
**Objectif :** Authorize platform to read coach's calendar availability (bi-directional sync)

#### Étapes Détaillées

1. **Coach navigates to Calendar Settings**
   - Coach logs in → Dashboard → Clicks "Settings" → Calendar section
   - Sees : "Connected Calendars" widget with two buttons: "Connect Google" and "Connect Outlook"
   - Current status: "No calendar connected"
   - Feedback: Settings page loads ~300ms
   - Durée: ~300ms

2. **Coach clicks "Connect Google" (or Outlook)**
   - Modal appears: "Connect your Google Calendar to enable availability sync"
   - Sub-text: "Your calendar availability will be combined with platform availability for booking slots"
   - Button: "Authorize Google" (blue)
   - Coach clicks → Redirects to Google OAuth consent page
   - Feedback: Redirect instant
   - Durée: <1s

3. **Coach authorizes OAuth scope**
   - Google OAuth page: "Learning App wants access to:"
   - Permissions: Read calendar events, Create calendar events (for invites)
   - Coach clicks "Allow" → Redirects back to platform
   - Feedback: Redirect <2s
   - Durée: ~5-10s (user enters Google credentials if not already logged in)

4. **Platform receives OAuth tokens**
   - Backend receives authorization_code → Exchanges for access_token + refresh_token
   - Stores in coach_calendar_integrations table (encrypted)
   - Sets sync_enabled=true, schedules next_sync_at = NOW + 1 hour
   - Feedback: Backend processes <500ms
   - Durée: <500ms

5. **Confirmation displayed to Coach**
   - Page redirects to Settings
   - Success message: "✅ Google Calendar connected!"
   - Widget updates: "Connected to: Google Calendar (john.doe@gmail.com)"
   - Shows: Last sync time, Next sync scheduled
   - Button to "Disconnect" appears (for future)
   - Feedback: Instant success confirmation
   - Durée: Instant

6. **First sync triggered**
   - System immediately pulls coach's calendar events (next 30 days)
   - Identifies available time blocks
   - Integrates with platform availability rules
   - Booking page updated: "Checking your availability..." → slots refresh
   - Feedback: Sync typically <5s for 30 days of data
   - Durée: ~5s

#### Conditions de Succès ✅
- [ ] OAuth flow completes without errors
- [ ] Tokens stored encrypted in coach_calendar_integrations
- [ ] Coach sees confirmation with email/calendar name
- [ ] First sync triggered automatically
- [ ] Next sync scheduled for +1 hour
- [ ] Booking interface reflects updated availability within 5s
- [ ] Coach can disconnect if needed

#### Erreurs & Edge Cases ❌

**Cas 1 : Coach denies OAuth permission**
- Scénario: Coach clicks "Deny" on OAuth consent page
- Comportement attendu:
  - Redirects back to Settings
  - Error message: "Authorization denied. Calendar not connected."
  - Coach can try again or choose different provider
- Impact: No calendar integration, platform-only availability applies

**Cas 2 : Coach already has calendar connected, tries to connect second provider**
- Scénario: Coach has Google connected, wants to also connect Outlook
- Comportement attendu:
  - Both providers can be connected simultaneously
  - Booking availability = (platform) AND (Google) AND (Outlook)
  - Widget shows both calendars: "Google Calendar ✓ | Outlook Calendar ✓"
  - Can disconnect either independently
- Impact: More restrictive availability (intersection of all three sources)

**Cas 3 : OAuth token expires**
- Scénario: Google access token expires after 1 hour
- Comportement attendu:
  - System uses refresh_token to get new access_token
  - Auto-refresh transparent to coach
  - If refresh fails (revoked token): sync_status='error', warning sent to coach
  - Coach can reconnect via Settings
- Impact: Graceful token refresh, no service interruption

---

### User Journey #8 : System → Send Calendar Invites (Post-Session Creation)

**Acteur :** System (automated upon session confirmation)  
**Déclencheur :** Apprenant confirms booking (or Manager approves), session created  
**Objectif :** Auto-send calendar invites to both coach and learner calendars with Meet link

#### Étapes Détaillées

1. **Session booking confirmed (by Apprenant or Manager)**
   - Booking status transitions to 'confirmed'
   - System triggers async job: "Send Calendar Invites"
   - Feedback: Immediate trigger, no user wait
   - Durée: <1s

2. **System prepares invite details**
   - Gathers session data: coach name, apprenant name, date/time, Google Meet link
   - Creates two calendar events:
     - Event for coach: "1-1 Coaching with [Apprenant Name]" (organizer=system)
     - Event for apprenant: "Coaching Session with [Coach Name]" (organizer=system)
   - Both include Google Meet link
   - Feedback: Event generation <500ms
   - Durée: <500ms

3. **System sends Google Calendar invite to Coach**
   - If coach has Google connected: Calls Google Calendar API
   - Creates event in coach's "Coaching" calendar (auto-assigned color)
   - Coach receives email: "You have a new calendar invite: Coaching with Alice Martin"
   - Calendar shows: Date/time + Meet link + Apprenant's contact info
   - Feedback: API call <2s
   - Durée: ~2s

4. **System sends Outlook invite to Coach (if connected)**
   - If coach has Outlook connected: Calls Outlook API
   - Creates event in Outlook calendar
   - Coach receives email notification in Outlook
   - Feedback: API call <2s
   - Durée: ~2s

5. **System sends Google Calendar invite to Apprenant**
   - Calls Google Calendar API for apprenant's default calendar
   - Creates event: "Coaching Session with [Coach Name]"
   - Includes Google Meet link for join
   - Feedback: API call <2s
   - Durée: ~2s

6. **Invites logged + confirmation**
   - System logs to coaching_bookings: google_event_id (coach), outlook_event_id (coach), google_event_id (apprenant)
   - Sets timestamp: invites_sent_at = NOW
   - Database updated atomically
   - Feedback: Logging <500ms
   - Durée: <500ms

#### Conditions de Succès ✅
- [ ] Coach receives calendar invite within 30s of confirmation
- [ ] Apprenant receives calendar invite within 30s of confirmation
- [ ] Google Meet link included in both invites
- [ ] If coach has multiple calendars connected, invites sent to all active ones
- [ ] Calendar events show correct date/time/participants
- [ ] event_ids stored in coaching_bookings for audit trail
- [ ] Attendees can accept/decline/propose new time from calendar

#### Erreurs & Edge Cases ❌

**Cas 1 : Coach calendar sync disabled**
- Scénario: Coach has calendar connected but sync_enabled=false
- Comportement attendu:
  - System checks coach_calendar_integrations.sync_enabled
  - If false: Skip calendar invite to coach
  - Apprenant still receives invite
  - Coach gets email notification instead: "Session confirmed: [Date/Time]. [Meet link]"
- Impact: Coach misses calendar block but is notified

**Cas 2 : Google Calendar API fails during invite send**
- Scénario: Google API temporarily unavailable
- Comportement attendu:
  - Retry logic: exponential backoff (retry at 10s, 30s, 5min)
  - If all 3 retries fail: Set coaching_bookings.invites_sent_status='partial_failure'
  - Send warning email to coach: "Calendar invite failed. Session confirmed but not on your calendar. [Manual add link]"
  - Warning displayed on apprenant interface: "Coach calendar invite delayed. We'll send it shortly."
- Impact: Session still confirmed, invites sent when API recovers

**Cas 3 : Coach connected two calendars (Google + Outlook)**
- Scénario: Invites need to go to both Google AND Outlook
- Comportement attendu:
  - System calls both Google API and Outlook API
  - Event created in both calendars
  - Coach gets two separate calendar invites
  - Both google_event_id + outlook_event_id stored in coaching_bookings
  - Can accept on either calendar (first acceptance counts)
- Impact: Redundancy OK, coach chooses which to use

**Cas 4 : Apprenant has no Google Calendar connected**
- Scénario: Apprenant uses platform without Google Calendar auth
- Comportement attendu:
  - System checks if apprenant has calendar integration
  - If no Google: Skip calendar invite, send email instead
  - Email includes: Date/time + Meet link + "Add to calendar" link (generates .ics file)
  - Apprenant can download .ics and import manually
- Impact: Still reachable via email + Meet link

---

## 🗄️ Modèle de Données

### Entités Principales

#### 1. **coaching_bookings** (formerly coaching_sessions — Updated with Approval & Refund)
| Colonne | Type | Description |
|---------|------|-------------|
| `id` | UUID | Primary key |
| `apprenant_id` | FK → users | Who booked |
| `coach_id` | FK → users | Assigned coach |
| `company_id` | FK → companies | Company context |
| `datetime_start` | DateTime | Session start (renamed from scheduled_at) |
| `datetime_end` | DateTime | Session end |
| `status` | ENUM | 'pending_approval' \| 'confirmed' \| 'completed' \| 'cancelled' |
| `approval_status` | ENUM | (NEW) 'pending' \| 'approved' \| 'denied' \| 'approval_expired' |
| `approved_by_manager_id` | UUID FK | (NEW) Manager who approved (NULL if not required/auto) |
| `approval_requested_at` | DateTime | (NEW) When approval requested |
| `approval_timestamp` | DateTime | (NEW) When approved/denied |
| `duration_minutes` | Int | Default 60 |
| `credit_cost` | Integer | 1 (MVP hardcoded) |
| `google_event_id` | String | Google Calendar event |
| `outlook_event_id` | String | Outlook event |
| `google_meet_link` | String | Generated Meet URL |
| `pre_session_notes` | Text | Context from apprenant |
| `coach_notes` | Text | Coach notes post-session |
| `cancellation_date` | DateTime | (EXISTING) When cancelled |
| `refund_eligible` | Boolean | (NEW) TRUE if within 72h window |
| `refund_processed` | Boolean | (NEW) TRUE if refund issued |
| `refund_reason` | String | (NEW) 'learner_requested' \| 'coach_cancelled' \| 'auto' |
| `created_at` | DateTime | |
| `updated_at` | DateTime | |

#### 2. **coach_assignments**
| Colonne | Type | Description |
|---------|------|-------------|
| `id` | UUID | Primary key |
| `apprenant_id` | FK → users | Assigned apprenant |
| `coach_id` | FK → users | Assigned coach |
| `company_id` | FK → companies | Company |
| `assigned_by_user_id` | FK → users | Admin who assigned |
| `assigned_at` | DateTime | Assignment date |
| `assigned_reason` | Text | Why this coach (optional) |
| `active` | Boolean | Currently active |

#### 3. **coaching_corrections** (items to correct)
| Colonne | Type | Description |
|---------|------|-------------|
| `id` | UUID | Primary key |
| `apprenant_id` | FK → users | |
| `coach_id` | FK → users | Assigner coach |
| `item_type` | ENUM | 'mission', 'jac', 'project', 'assignment' |
| `item_id` | UUID | Reference to Mission/JAC/Project/Assignment |
| `submission_version` | Int | Which version (1=first, 2=revision, etc.) |
| `submitted_at` | DateTime | When apprenant submitted |
| `status` | ENUM | 'À réviser', 'Approuvé', 'À resoummettre', 'En attente clarification' |
| `created_at` | DateTime | |
| `updated_at` | DateTime | |

#### 4. **coaching_correction_comments**
| Colonne | Type | Description |
|---------|------|-------------|
| `id` | UUID | Primary key |
| `correction_id` | FK → coaching_corrections | Which item |
| `coach_id` | FK → users | Who commented |
| `section_name` | String | Which part (e.g., "Executive Summary", "Analysis") |
| `comment_text` | Text | Feedback comment (text only) |
| `created_at` | DateTime | |

#### 5. **coaching_messages** (async messaging)
| Colonne | Type | Description |
|---------|------|-------------|
| `id` | UUID | Primary key |
| `apprenant_id` | FK → users | |
| `coach_id` | FK → users | |
| `message_text` | Text | Comment (text free-form) |
| `read_at` | DateTime | When read |
| `created_at` | DateTime | |

#### 6. **coach_profiles**
| Colonne | Type | Description |
|---------|------|-------------|
| `id` | UUID | Primary key |
| `user_id` | FK → users | |
| `bio` | Text | Biography |
| `expertise_domains` | JSON | Array of domain IDs |
| `languages` | JSON | Array ['FR', 'EN'] |
| `average_rating` | Decimal (0-5) | |
| `total_sessions_completed` | Int | |
| `status` | ENUM | 'active', 'inactive' |

#### 7. **google_calendar_sync** (OAuth tokens)
| Colonne | Type | Description |
|---------|------|-------------|
| `id` | UUID | Primary key |
| `user_id` | FK → users | Coach |
| `provider` | ENUM | 'google', 'outlook' |
| `refresh_token` | String | (encrypted) |
| `access_token` | String | (encrypted) |
| `token_expires_at` | DateTime | |
| `last_sync_at` | DateTime | |
| `sync_status` | ENUM | 'synced', 'pending', 'error' |

#### 8. **coaching_rates**
| Colonne | Type | Description |
|---------|------|-------------|
| `id` | UUID | Primary key |
| `company_id` | FK → companies | (null = global) |
| `domain_id` | FK → competency_domains | (null = all) |
| `credits_per_session` | Int | Cost (e.g., 10) |
| `effective_date` | DateTime | When active |
| `active` | Boolean | |

#### 8bis. **coach_calendar_integrations** (NEW — Calendar sync management for coaches)
| Colonne | Type | Description |
|---------|------|-------------|
| `id` | UUID | Primary key |
| `coach_id` | FK → users | Coach who owns calendar |
| `provider` | ENUM | 'google' \| 'outlook' |
| `access_token` | String | (encrypted) OAuth access token |
| `refresh_token` | String | (encrypted) OAuth refresh token |
| `token_expires_at` | DateTime | When access token expires |
| `sync_enabled` | Boolean | Toggle sync on/off (default: true) |
| `last_sync_at` | DateTime | Timestamp of last successful sync |
| `next_sync_at` | DateTime | Scheduled time for next sync |
| `sync_status` | ENUM | 'synced' \| 'pending' \| 'error' \| 'no_sync_scheduled' |
| `last_sync_error` | String | Error message if sync_status='error' (nullable) |
| `created_at` | DateTime | When integration created |
| `updated_at` | DateTime | When last updated |

#### 9. **refund_requests** (NEW — Track all refund activity)
| Colonne | Type | Description |
|---------|------|-------------|
| `id` | UUID | Primary key |
| `booking_id` | UUID FK | Related coaching booking |
| `user_id` | UUID FK | Who requested refund |
| `service_type` | ENUM | 'coaching' \| 'atelier' |
| `credit_amount` | Integer | Credits to refund |
| `requested_at` | DateTime | When refund requested |
| `window_expired_at` | DateTime | When refund window closes |
| `eligibility_status` | ENUM | 'eligible' \| 'after_window' \| 'other' |
| `approval_status` | ENUM | 'auto_approved' \| 'pending_review' \| 'approved' \| 'denied' |
| `approved_by_id` | UUID FK | Support agent who approved (if manual) |
| `approved_at` | DateTime | When approved |
| `reason` | String | Refund reason from learner |
| `support_notes` | Text | Support notes (if manual review) |
| `created_at` | DateTime | Record creation |

---

## 🔌 API / Endpoints

### Coach Assignment & Sessions

**POST /api/v1/coaching/assignments**
- Body : `{ apprenant_id, coach_id, reason? }`
- Response : Created assignment
- Trigger : Notify apprenant + coach

**GET /api/v1/coaching/coach-for-apprenant/{apprenant_id}**
- Response : Current coach assignment

**POST /api/v1/coaching/sessions**
- Body : `{ apprenant_id, scheduled_at }`
- (Coach pre-assigned, no coach_id needed)
- Response : Created session (auto-validated)

### Corrections

**POST /api/v1/coaching/corrections**
- Body : `{ apprenant_id, coach_id, item_type, item_id, submission_version }`
- Response : Created correction entry

**POST /api/v1/coaching/corrections/{correction_id}/comments**
- Body : `{ section_name, comment_text }`
- Response : Created comment

**PATCH /api/v1/coaching/corrections/{correction_id}/status**
- Body : `{ status: 'À réviser' | 'Approuvé' | 'À resoummettre' | 'En attente clarification' }`
- Response : Updated status

### Messaging

**POST /api/v1/coaching/messages**
- Body : `{ coach_id, apprenant_id, message_text }`
- Response : Created message
- Trigger : Notify recipient

**GET /api/v1/coaching/messages/{coach_id}/{apprenant_id}**
- Response : Message thread (paginated)

### Manager Approval & Refund (NEW)

**GET /api/v1/coaching/pending-approvals?company_id={id}** (Manager Only)
- Response : List of pending approval bookings
  ```json
  {
    "data": [
      {
        "booking_id": "uuid",
        "apprenant_id": "uuid",
        "apprenant_name": "Jean Dupont",
        "coach_id": "uuid",
        "coach_name": "Marie Martin",
        "scheduled_at": "2026-06-15T10:00:00Z",
        "duration_minutes": 60,
        "credit_cost": 1,
        "approval_requested_at": "2026-06-14T14:23:00Z"
      }
    ],
    "total": 5,
    "pending_count": 5
  }
  ```
- Access Control : Manager (company_id) only
- Backend : Query coaching_bookings WHERE status='pending_approval' AND company_id={id} AND approval_status='pending'

**POST /api/v1/coaching/approve-booking** (Manager Only)
- Body : 
  ```json
  {
    "booking_id": "uuid",
    "manager_notes": "Approved for Q2 training budget" (optional)
  }
  ```
- Response : 
  ```json
  {
    "booking_id": "uuid",
    "status": "confirmed",
    "approval_status": "approved",
    "approved_by_manager_id": "uuid",
    "approval_timestamp": "2026-06-14T14:25:00Z",
    "message": "Booking confirmed. Apprenant & Coach notified."
  }
  ```
- Access Control : Manager (company_id) only
- Backend : 
  - Validate manager company_id matches booking company_id
  - Begin atomic transaction
  - Update coaching_bookings: status='confirmed', approval_status='approved', approved_by_manager_id, approval_timestamp
  - Debit company credit pool by credit_cost
  - Log to audit_logs (action='booking_approved', actor=manager, booking_id)
  - Commit transaction
  - Send notifications to apprenant & coach
  - Return 200 OK

**POST /api/v1/coaching/deny-booking** (Manager Only)
- Body :
  ```json
  {
    "booking_id": "uuid",
    "denial_reason": "Insufficient budget" | "Not aligned with objectives" | "Other" (required)
  }
  ```
- Response :
  ```json
  {
    "booking_id": "uuid",
    "status": "cancelled",
    "approval_status": "denied",
    "approved_by_manager_id": "uuid",
    "approval_timestamp": "2026-06-14T14:26:00Z",
    "message": "Booking denied. Apprenant & Coach notified."
  }
  ```
- Access Control : Manager (company_id) only
- Backend :
  - Validate manager company_id matches booking company_id
  - Begin atomic transaction
  - Update coaching_bookings: status='cancelled', approval_status='denied', approved_by_manager_id, approval_timestamp
  - Log denial reason to audit_logs (action='booking_denied', denial_reason, actor=manager)
  - Commit transaction
  - Send notifications to apprenant & coach with denial reason
  - Return 200 OK

### Refund Processing

**POST /api/v1/coaching/request-refund** (Learner Only)
- Body :
  ```json
  {
    "booking_id": "uuid",
    "reason": "Personal emergency" | "Coach no-show" | "Schedule conflict" | "Other" (required)
  }
  ```
- Response :
  ```json
  {
    "refund_request_id": "uuid",
    "booking_id": "uuid",
    "eligibility_status": "eligible",
    "approval_status": "auto_approved",
    "credit_amount": 1,
    "message": "Refund approved. Credit restored to wallet."
  }
  ```
- Access Control : Learner (only own booking) or Admin
- Backend :
  - Validate booking belongs to user
  - Calculate time_until_session = booking.datetime_start - now()
  - If time_until_session > 72h : eligibility_status = 'after_window', approval_status = 'pending_review'
  - If time_until_session ≤ 72h : eligibility_status = 'eligible', approval_status = 'auto_approved'
  - Create refund_requests record
  - If auto_approved : Begin atomic transaction → Update coaching_bookings (status='cancelled', refund_processed=true) → Restore credits to wallet → Commit
  - Send notifications to learner, coach, manager
  - Return 200 OK (auto-approved) or 202 Accepted (pending review)

### Admin

**GET /api/v1/admin/coaching/pending-assignments**
- Response : List of apprenants without coaches

**GET /api/v1/admin/coaching/dashboard**
- Response : KPIs (sessions, corrections, utilization)

---

## ✅ Critères d'Acceptation MVP

### Fonctionnalités Core
- [x] Coach pre-assigned by Admin Platform (automatic)
- [x] Session booking auto-validated (no coach approval needed)
- [x] Google Calendar sync (OAuth2, bi-directional)
- [x] Outlook Calendar sync (OAuth2, bi-directional)
- [x] Meet link auto-generated
- [x] Corrections workflow (submit → feedback → resubmit)
- [x] Status dropdown (4 options)
- [x] Async messaging (text comments only)
- [x] Coach FO dashboard (sessions, corrections, messages)
- [x] Apprenant FO dashboard (coach info, upcoming sessions, corrections)
- [x] Admin BO : Coach assignments + dashboard

### UX
- [x] Session booking <2 steps
- [x] Corrections interface clear (comments per section)
- [x] Status dropdown visible + easy to use
- [x] Messaging notifications instant
- [x] Mobile responsive

### Data
- [x] Session status validated (confirmed → completed/cancelled)
- [x] Credits debited on confirmation
- [x] Corrections history versioned
- [x] Calendar sync bi-directional
- [x] Audit trail for all assignments
- [x] Manager approval workflow: pending_approval → confirmed/cancelled (atomic transaction)
- [x] Approval transitions stored in coaching_bookings (status, approval_status, approved_by_manager_id, approval_timestamp)
- [x] Refund requests tracked in refund_requests table with eligibility + approval status
- [x] Refund window enforcement: 72-hour calculation from booking.datetime_start
- [x] Auto-approval for refunds within 72h window (eligibility_status='eligible' → approval_status='auto_approved')
- [x] Manual review workflow for refunds after 72h window (approval_status='pending_review', routed to support team)
- [x] Atomic refund transactions: cancellation + credit restoration in single transaction (no partial states)
- [x] Audit trail for all approval/denial actions (actor, timestamp, reason logged)

### Security
- [x] Apprenant can only see assigned coach
- [x] Coach can only see assigned apprenants
- [x] OAuth tokens encrypted + secure storage
- [x] No double-booking (calendar validation real-time)

### Calendar Synchronization (MVP)
- [x] Coach OAuth2 flow for Google Calendar (via Google OAuth Consent Screen)
- [x] Coach OAuth2 flow for Outlook Calendar (via Microsoft Azure AD)
- [x] Calendar sync runs hourly between 8:00 AM - 8:00 PM GMT+2 (via scheduled job)
- [x] Availability logic: displayed booking slots = (platform availability) AND (coach calendar availability)
- [x] Bi-directional interpretation: coach unavailable on platform OR calendar = no booking allowed (intersection)
- [x] Fallback mode: if coach has no calendar connected, system uses platform-only availability rules
- [x] OAuth tokens encrypted (access_token + refresh_token stored in coach_calendar_integrations)
- [x] Automatic token refresh on expiration (using refresh_token)
- [x] Calendar invites auto-sent to coach calendar (Google or Outlook) when session confirmed
- [x] Calendar invites auto-sent to apprenant calendar when session confirmed
- [x] Google Meet link included in both calendar invites
- [x] Invite event_ids logged in coaching_bookings for audit trail
- [x] Sync error handling: if hourly sync fails, send warning email to coach + warning banner on apprenant booking interface
- [x] Coach can still confirm booking directly via platform if sync fails (graceful degradation)
- [x] Coach can enable/disable calendar sync in Settings (sync_enabled toggle)
- [x] Coach can disconnect calendar integration anytime (revokes OAuth token)
- [x] Invite send retry logic: exponential backoff (10s, 30s, 5min) if API fails
- [x] Partial failure handling: if one calendar API fails but other succeeds, mark as 'partial_failure' + notify coach

### Performance
- [x] Dashboard load <400ms
- [x] Session booking <1s
- [x] Calendar sync <5min
- [x] Corrections load <1s
- [x] Meet join <3s
- [x] OAuth redirect + token exchange <5s
- [x] Calendar invite send <30s (both coach + apprenant)
- [x] Availability refresh <5s after sync complete

---

## 🔗 Dépendances Inter-Modules

### Dépend De
- **Passeport Compétences** : Coach expertise validation, apprenant context
- **Credits System** : Session debit
- **Notifications** : Emails + in-app alerts
- **Google Calendar API + Outlook API** : OAuth2 sync (MVP both)
- **Missions/JAC/Projets/Assignements** : Items to correct

### Bloque
- **Back-Office Analytics** : Coaching KPIs required
- **Gamification** : XP per session + corrections

---

## 📊 Analytics & Métriques

### Quoi Tracker

| Événement | Contexte | Valeur |
|-----------|----------|--------|
| `coaching_session_booked` | Apprenant réserve | session_id, coach_id, credits_cost |
| `coaching_session_completed` | Session finished | session_id, duration_actual |
| `coaching_correction_submitted` | Apprenant soumet | correction_id, item_type |
| `coaching_correction_reviewed` | Coach corrige | correction_id, status, comment_count |
| `coaching_correction_approved` | Final approval | correction_id, revision_count |
| `coaching_message_sent` | Messaging | sender_id, recipient_id |
| `google_calendar_sync` | Calendar event | coach_id, sync_status |

### Dashboards par Rôle

**Apprenant :**
- Coach name + availability
- Upcoming sessions (next 7 days)
- Pending corrections (by item type)
- Completed sessions + feedback summary
- Messages from coach

**Coach :**
- Assigned apprenants count
- Upcoming sessions (calendar view)
- Corrections queue (pending count)
- Messaging inbox
- Session notes

**Admin :**
- Total sessions (this month)
- Pending corrections (by type)
- Coach utilization (sessions/week)
- Credit consumption vs budget
- Calendar sync health

---

## 📅 Planning & Budget Estimé

### Effort Total: 110-130 heures

| Phase | Composant | Effort (h) | Timeline |
|-------|-----------|-----------|----------|
| **Phase 1** | Coach assignment logic + API | 8 | Semaine 5 (J1) |
| | Corrections workflow + status | 10 | Semaine 5 (J1-2) |
| | Messaging API | 6 | Semaine 5 (J2) |
| | Session booking (auto-validated) | 8 | Semaine 5 (J3) |
| | Subtotal | **32h** | **Semaine 5** |
| **Phase 2** | Google Calendar OAuth2 + sync | 10 | Semaine 5 (J3-4) |
| | Outlook Calendar OAuth2 + sync | 15 | Semaine 5 (J4) + Semaine 6 (J1) |
| | Subtotal | **25h** | **Semaines 5-6** |
| **Phase 3** | Apprenant FO Dashboard + screens | 10 | Semaine 6 (J2-3) |
| | Coach FO Dashboard + screens | 10 | Semaine 6 (J3-4) |
| | Corrections UI (comments per section) | 8 | Semaine 6 (J4) + Semaine 7 (J1) |
| | Messaging UI | 6 | Semaine 7 (J1) |
| | Subtotal | **34h** | **Semaines 6-7** |
| **Phase 4** | Admin BO (assignments + dashboard) | 12 | Semaine 7 (J2-3) |
| | Subtotal | **12h** | **Semaine 7** |
| **Phase 5** | Testing + edge cases | 15 | Semaine 7 (J4) + Semaine 8 (J1-2) |
| | Subtotal | **15h** | **Semaines 7-8** |
| **TOTAL** | | **~118h** | **Semaines 5-8** |

### Précisions Nécessaires (À valider avec Pierre)

- [ ] Corrections multi-coach : If both Coach + Expert need to review same item, do both statuses need approval before "Approuvé"?
- [ ] Auto-update Passeport : After JAC approval, auto-update apprenant's competency level?
- [ ] Notification frequency : If coach doesn't review within 72h, escalate to admin?
- [ ] Coach calendar : Can coach block time in blocks (e.g., "No sessions 2-4pm" recurring)?
- [ ] Resubmission limit : Max resubmissions per correction (e.g., max 3 revisions)?

---

**Document Révisé :** 2026-05-10  
**Status :** Aligné avec clarifications Pierre  
**Owner :** Claude (Cowork) + Pierre (decisions)
