# 📊 Components Usage Analysis - Complete Mapping

**Version:** 2.0.0 | **Date:** 22/02/2026  
**Analysis:** Components → Pages Mapping

---

## 📋 Méthodologie

Analyse complète de tous les imports dans `/pages/**/*.tsx` pour identifier:
- Quels composants sont utilisés
- Dans quelles pages
- Contexte d'utilisation (navigation, card, modal, form, etc.)

---

## 🎯 Composants UI Essentiels (Très Haute Utilisation)

### OptimizedSidebar
**Fichier:** `/components/ui/optimized-sidebar.tsx`  
**Utilisé dans:** 33 pages (100% des pages avec layout)  
**Contexte:** Navigation principale

**Pages:**
1. DashboardPageUpgraded
2. ParcoursPageUpgraded
3. CoachingPageUpgraded
4. LearningSpacePage *(via import indirect)*
5. ProfilePage
6. VeillePage
7. VeilleContentPage
8. NewsletterPage
9. WeeklyNewsletterPage
10. WeeklyNewsDetailPage
11. MagazinePage
12. MagazineArticlePage
13. DossierPage
14. VideoTutorialPage
15. VideoReelsPage
16. EntreprisePageComplete
17. AccountPage
18. CourseDetailPageUpdated
19. ProjectPage
20. JournalPageUpgraded
21. JournalDetailPage
22. JournalFreeEntryPage
23. JournalNewEntryPage
24. PreCoachingQuestionnairePage
25. PreCoachingQuestionnaireResponsePage
26. MessagesPage
27. NotificationsPageUltra
28. LeaderboardPage
29. SandboxJournalPrompts
30. DesignSystemChangelogPage
31. DesignSystemFlowsPage
32. NotificationSystemDemoPage
33. PageHeaderDemo
34. CoachingBookingFlowPage

**Criticité:** ⚠️ CRITIQUE - Sidebar de toute l'app

---

### BackgroundBlobs
**Fichier:** `/components/ui/background-blobs.tsx`  
**Utilisé dans:** 32 pages (97% des pages layout)  
**Contexte:** Background animé

**Pages:**
1. DashboardPageUpgraded
2. ParcoursPageUpgraded
3. CoachingPageUpgraded
4. LearningSpacePage
5. ProfilePage
6. VeillePage
7. VeilleContentPage
8. NewsletterPage
9. WeeklyNewsletterPage
10. WeeklyNewsDetailPage
11. MagazinePage
12. MagazineArticlePage
13. DossierPage
14. VideoTutorialPage
15. VideoReelsPage
16. EntreprisePageComplete
17. AccountPage
18. CourseDetailPageUpdated
19. ProjectPage
20. JournalPageUpgraded
21. JournalDetailPage
22. JournalFreeEntryPage
23. JournalNewEntryPage
24. PreCoachingQuestionnairePage
25. PreCoachingQuestionnaireResponsePage
26. SandboxJournalPrompts
27. NotificationSystemDemoPage
28. PageHeaderDemo
29. LeaderboardPage
30. Error404Page
31. Error500Page
32. NotificationsPageUltra

**Criticité:** 🎨 HAUTE - Background standard app

---

### Button / ButtonEnhanced
**Fichiers:** 
- `/components/ui/button.tsx`
- `/components/ui/button-enhanced.tsx`

**Utilisé dans:** 24 pages  
**Contexte:** Boutons, CTA, actions

**Pages Button standard:**
1. LoginPage - Form submit
2. SignupPage - Form submit
3. ForgotPasswordPage - Form
4. ResetPasswordPage - Form
5. PMProLoginPage - Form
6. AccountPage - Actions
7. CelebrationsDemo - Démo
8. CourseDetailPageUpdated - Navigation
9. CourseViewerEDRAC - Navigation
10. JournalDetailPage - Actions
11. JournalFreeEntryPage - Save
12. JournalNewEntryPage - Save
13. LearningSpacePage - Navigation
14. LessonViewer - Navigation
15. MessagesPage - Send
16. ProjectPage - Actions

**Pages ButtonEnhanced:**
1. CoachingPageUpgraded - CTA
2. EntreprisePageComplete - Actions
3. JournalPageUpgraded - CTA
4. LeaderboardPage - Filters
5. PageHeaderDemo - Démo
6. ParcoursPageUpgraded - CTA
7. SandboxJournalPrompts - Actions
8. VeilleContentPage - Navigation

**Criticité:** 🔴 CRITIQUE - Composant de base

---

## 🧭 Composants Common (Navigation & Layout)

### SectionHeader
**Fichier:** `/components/common/SectionHeader.tsx`  
**Utilisé dans:** 5 pages  
**Contexte:** En-têtes de sections

**Pages:**
1. CoachingPageUpgraded - Sections coaching
2. JournalPageUpgraded - Sections journal
3. ParcoursPageUpgraded - Sections parcours
4. DesignSystemRealPage - Sections catalogue
5. ColoredGlowDemo - Démo sections

**Criticité:** 🟡 MOYENNE - En-têtes sections

---

### PageHeaderSimple / PageHeaderFinal
**Fichiers:**
- `/components/common/PageHeaderSimple.tsx`
- `/components/common/PageHeaderFinal.tsx`

**Utilisé dans:** 5 pages  
**Contexte:** En-têtes de pages

**Pages PageHeaderSimple:**
1. CoachingPageUpgraded - Header coaching
2. JournalPageUpgraded - Header journal
3. ParcoursPageUpgraded - Header parcours
4. CoachingBookingFlowPage - Header booking (avec badge)

**Pages PageHeaderFinal:**
1. PageHeaderDemo - Démo 5 versions

**Criticité:** 🟢 BASSE - Alternative headers

---

### SearchBar / SearchBarWithFilters
**Fichiers:**
- `/components/common/SearchBar.tsx`
- `/components/common/SearchBarWithFilters.tsx`

**Utilisé dans:** 2 pages  
**Contexte:** Recherche

**Pages:**
1. DesignSystemRealPage - Recherche composants
2. JournalPageUpgraded - Recherche + filtres entrées

**Criticité:** 🟢 BASSE - Fonctionnalité recherche

---

### Card / Badge / Button (Common versions)
**Fichiers:**
- `/components/common/Card.tsx`
- `/components/common/Badge.tsx`
- `/components/common/Button.tsx`

**Utilisé dans:** 1 page  
**Contexte:** Design System page uniquement

**Pages:**
1. DesignSystemRealPage - Showcase composants common

**Criticité:** 🔵 INFO - Versions alternatives pour design system

---

### SectionContainer
**Fichier:** `/components/common/SectionContainer.tsx`  
**Utilisé dans:** 1 page  
**Contexte:** Container sections

**Pages:**
1. ColoredGlowDemo - Container démo

**Criticité:** 🟢 BASSE - Démo uniquement

---

## 🎯 Composants Métier (Spécifiques)

### DashboardHeroV3Simple
**Fichier:** `/components/DashboardHeroV3Simple.tsx`  
**Utilisé dans:** 2 pages  
**Contexte:** Hero dashboard

**Pages:**
1. DashboardPageUpgraded - Hero principal (PRODUCTION)
2. DashboardHeroDemo - Comparaison versions

**Criticité:** 🔴 CRITIQUE - Hero dashboard production

---

### Célébrations
**Dossier:** `/components/celebrations/`

#### BookingConfirmedModal
**Fichier:** `/components/celebrations/BookingConfirmedModal.tsx`  
**Utilisé dans:** 1 page  
**Contexte:** Modal célébration booking

**Pages:**
1. CelebrationsDemo - Démo célébrations

**Criticité:** 🟢 BASSE - Démo (mais utilisable en prod via events)

---

#### CelebrationCard
**Fichier:** `/components/celebrations/CelebrationCard.tsx`  
**Utilisé dans:** 1 page  
**Contexte:** Mini célébrations

**Pages:**
1. CelebrationsDemo - Démo célébrations

**Criticité:** 🟢 BASSE - Démo

---

### Coaching
**Dossier:** `/components/coaching/`

#### BookingModalMinimal
**Fichier:** `/components/coaching/BookingModalMinimal.tsx`  
**Utilisé dans:** 1 page  
**Contexte:** Modal réservation coaching

**Pages:**
1. CoachingPageUpgraded - Réservation sessions

**Criticité:** 🔴 CRITIQUE - Booking production

---

#### CancelSessionModal
**Fichier:** `/components/coaching/CancelSessionModal.tsx`  
**Utilisé dans:** 1 page  
**Contexte:** Modal annulation session

**Pages:**
1. CoachingPageUpgraded - Annulation sessions

**Criticité:** 🟡 MOYENNE - Fonctionnalité coaching

---

#### UpcomingSessionCard
**Fichier:** `/components/coaching/UpcomingSessionCard.tsx`  
**Utilisé dans:** 1 page  
**Contexte:** Carte session à venir

**Pages:**
1. CoachingPageUpgraded - Liste sessions

**Criticité:** 🟡 MOYENNE - Affichage sessions

---

### Modals
**Dossier:** `/components/modals/`

#### PositionnementModal
**Fichier:** `/components/modals/PositionnementModal.tsx`  
**Utilisé dans:** 2 pages  
**Contexte:** Modal positionnement compétences

**Pages:**
1. ParcoursPageUpgraded - Positionnement parcours
2. DesignSystemRealPage - Démo modal

**Criticité:** 🟡 MOYENNE - Fonctionnalité parcours

---

#### BookingConfirmationModal
**Fichier:** `/components/modals/BookingConfirmationModal.tsx`  
**Utilisé dans:** 1 page  
**Contexte:** Confirmation booking

**Pages:**
1. CoachingBookingFlowPage - Flow booking

**Criticité:** 🟢 BASSE - Flow spécifique

---

### Onboarding
**Dossier:** `/components/onboarding/`

#### OnboardingFlow
**Fichier:** `/components/onboarding/OnboardingFlow.tsx`  
**Utilisé dans:** 1 page  
**Contexte:** Flow onboarding complet

**Pages:**
1. OnboardingPageUpgraded - Onboarding nouveaux users

**Criticité:** 🔴 CRITIQUE - Premier contact utilisateur

---

### Design System Showcase
**Dossier:** `/components/design-system/`

#### ButtonShowcase
**Fichier:** `/components/design-system/ButtonShowcase.tsx`  
**Utilisé dans:** 1 page  
**Contexte:** Showcase boutons design system

**Pages:**
1. CelebrationsDemo - Démo boutons

**Criticité:** 🔵 INFO - Démo uniquement

---

### Patterns
**Dossier:** `/components/patterns/`

#### CardPatterns (ActionCard, JournalPromptCard, ActivityCard)
**Fichier:** `/components/patterns/CardPatterns.tsx`  
**Utilisé dans:** 3 pages  
**Contexte:** Patterns de cartes réutilisables

**Pages:**
1. DashboardPageUpgraded - Quick Wins (ActionCard, JournalPromptCard, ActivityCard)
2. DesignSystemRealPage - Showcase patterns
3. ColoredGlowDemo - Démo glow effects (ActionCard, ActionCardMini)

**Criticité:** 🔴 CRITIQUE - Cartes dashboard

---

### Animations
**Dossier:** `/components/` (racine - à déplacer dans /animations/)

#### EmojiWaveGlass / EmojiWaveInline
**Fichiers:**
- `/components/EmojiWaveGlass.tsx`
- `/components/EmojiWaveInline.tsx`

**Utilisé dans:** 1 page  
**Contexte:** Démo styles emoji

**Pages:**
1. EmojiStyleDemo - Comparaison styles emoji

**Criticité:** 🔵 INFO - Démo (mais utilisables en prod)

---

## 📋 Composants UI Formulaires

### Input
**Fichier:** `/components/ui/input.tsx`  
**Utilisé dans:** 7 pages  
**Contexte:** Champs de formulaire

**Pages:**
1. LoginPage - Email/Password
2. SignupPage - Inscription
3. ForgotPasswordPage - Email reset
4. ResetPasswordPage - Nouveau password
5. PMProLoginPage - Login alternatif
6. MessagesPage - Input message
7. DesignSystemRealPage - Showcase

**Criticité:** 🔴 CRITIQUE - Formulaires auth

---

### Textarea
**Fichier:** `/components/ui/textarea.tsx`  
**Utilisé dans:** 2 pages  
**Contexte:** Champs texte multi-lignes

**Pages:**
1. MessagesPage - Message long
2. DesignSystemRealPage - Showcase

**Criticité:** 🟡 MOYENNE - Messages

---

### Badge / BadgeDisplay
**Fichiers:**
- `/components/ui/badge.tsx`
- `/components/ui/badge-display.tsx`

**Utilisé dans:** 5 pages  
**Contexte:** Badges statut, compétences

**Pages Badge:**
1. AccountPage - Statut compte
2. JournalFreeEntryPage - Tags
3. LearningSpacePage - Niveaux
4. PMProLoginPage - Offres

**Pages BadgeDisplay:**
1. LeaderboardPage - Achievements

**Criticité:** 🟡 MOYENNE - Affichage statuts

---

### Tabs
**Fichier:** `/components/ui/tabs.tsx`  
**Utilisé dans:** 2 pages  
**Contexte:** Navigation par onglets

**Pages:**
1. AccountPage - Sections compte
2. LearningSpacePage - Étapes/Leçons

**Criticité:** 🟡 MOYENNE - Navigation interne

---

### Alert Banners
**Fichiers:**
- `/components/ui/AlertBanner.tsx`
- `/components/ui/SuccessAlertBanner.tsx`

**Utilisé dans:** 1 page  
**Contexte:** Alertes sémantiques

**Pages:**
1. DesignSystemRealPage - Showcase alerts

**Criticité:** 🟢 BASSE - Showcase (mais utilisables)

---

### Progress
**Fichier:** `/components/ui/progress-bar-enhanced.tsx`  
**Utilisé dans:** 1 page  
**Contexte:** Barre de progression

**Pages:**
1. EntreprisePageComplete - Stats entreprise

**Criticité:** 🟢 BASSE - Entreprise uniquement

---

### Card (UI)
**Fichier:** `/components/ui/card.tsx`  
**Utilisé dans:** 1 page  
**Contexte:** Cartes UI basiques

**Pages:**
1. CelebrationsDemo - Démo célébrations

**Criticité:** 🔵 INFO - Démo (préférer CardPatterns)

---

## ❌ Composants NON Utilisés dans Pages

### Catégories Complètes Non Utilisées
- `/components/assessment/` - **0 pages** (LearnerPositioningModal non importé)
- `/components/feedback/` - **0 pages** (SatisfactionModal, StarRatingModal non importés)
- `/components/veille/` - **0 pages** (AdvancedFilters, HorizontalFilters non importés)
- `/components/journal/` - **0 pages** (JournalPromptCards non importé)
- `/components/notifications/` - **0 pages** (BannerNotification, ToastWithAction non importés)
- `/components/quiz/` - **0 pages**
- `/components/rating/` - **0 pages**
- `/components/typography/` - **0 pages**
- `/components/debug/` - **0 pages** (normal - dev only)

### Composants UI Non Utilisés (Partiels)
Les 80+ composants UI primitifs ne sont PAS tous importés directement dans pages.  
Beaucoup sont utilisés **indirectement** via d'autres composants.

**Exemples de composants probablement non utilisés:**
- `accordion.tsx` - Non trouvé
- `alert-dialog.tsx` - Non trouvé
- `avatar.tsx` - Non trouvé
- `calendar.tsx` - Non trouvé
- `dropdown-menu.tsx` - Non trouvé
- `select.tsx` - Non trouvé
- `skeleton.tsx` - Non trouvé
- `switch.tsx` - Non trouvé
- `separator.tsx` - Non trouvé

**Note:** Ces composants peuvent être utilisés:
1. Dans d'autres composants (imports indirects)
2. Via le système de design (DesignSystemRealPage)
3. Prévus pour usage futur

---

## 📊 Statistiques Globales

### Par Criticité
```
🔴 CRITIQUE (5):
- OptimizedSidebar (33 pages)
- BackgroundBlobs (32 pages)
- Button/ButtonEnhanced (24 pages)
- DashboardHeroV3Simple (2 pages - mais production)
- OnboardingFlow (1 page - premier contact)
- BookingModalMinimal (1 page - production)
- CardPatterns (3 pages - dashboard)
- Input (7 pages - auth)

🟡 MOYENNE (8):
- SectionHeader (5 pages)
- Badge/BadgeDisplay (5 pages)
- Tabs (2 pages)
- PageHeaderSimple (4 pages)
- CancelSessionModal (1 page)
- UpcomingSessionCard (1 page)
- PositionnementModal (2 pages)
- Textarea (2 pages)

🟢 BASSE (10):
- Toutes les pages démo
- Composants showcase uniquement
- Progress (entreprise uniquement)
- SearchBar (2 pages)

🔵 INFO (5):
- Composants design system
- Versions alternatives
- Démos

❌ NON UTILISÉS:
- 7 catégories complètes
- ~60+ composants UI primitifs (directs)
```

### Par Catégorie
```
/ui/                 15+ utilisés / 80+ total
/common/             10 utilisés / 15 total
/coaching/           3 utilisés / 5 total
/celebrations/       2 utilisés / 3 total
/modals/             2 utilisés / 8 total
/patterns/           1 utilisé / 2 total
/onboarding/         1 utilisé / 1 total
/design-system/      1 utilisé / 7 total
/animations/         2 utilisés / 4 total (racine)

Non utilisés directs:
/assessment/         0 / 1
/feedback/           0 / 2
/veille/             0 / 2
/journal/            0 / 1
/notifications/      0 / 2
/quiz/               0 / 1
/rating/             0 / 1
/typography/         0 / 3
/debug/              0 / 1
```

### Top 10 Composants Les Plus Utilisés
```
1. OptimizedSidebar         33 pages (100%)
2. BackgroundBlobs          32 pages (97%)
3. Button/ButtonEnhanced    24 pages (45%)
4. Input                    7 pages (13%)
5. SectionHeader            5 pages (9%)
6. Badge                    5 pages (9%)
7. PageHeaderSimple         4 pages (8%)
8. CardPatterns             3 pages (6%)
9. PositionnementModal      2 pages (4%)
10. DashboardHeroV3Simple   2 pages (4%)
```

---

## 🎯 Recommandations

### Actions Immédiates

1. **⚠️ Vérifier composants non utilisés**
   - Assessment (LearnerPositioningModal)
   - Feedback (SatisfactionModal, StarRatingModal)
   - Veille (Filters)
   - Journal (JournalPromptCards)
   
   **Action:** Tester sur plateforme ou archiver

2. **🔄 Déplacer animations**
   - Emoji* et AnimatedHandIcon de `/components/` → `/components/animations/`
   
   **Action:** Refactoring structure

3. **📋 Documenter usage indirect**
   - Composants UI utilisés via autres composants
   - Mapping complet import chain
   
   **Action:** Analyse approfondie import chain

4. **🧪 Tester pages démo**
   - CelebrationsDemo
   - EmojiStyleDemo
   - ColoredGlowDemo
   - DashboardHeroDemo
   - PageHeaderDemo
   
   **Décision:** Garder pour docs ou archiver

### Optimisations Possibles

1. **Tree-shaking**
   - 60+ composants UI non importés directement
   - Vérifier si webpack/vite les exclut du bundle
   
2. **Code-splitting**
   - Lazy load modals (BookingModalMinimal, etc.)
   - Lazy load pages démo
   
3. **Consolidation**
   - Button vs ButtonEnhanced - unifier?
   - Badge vs BadgeDisplay - unifier?
   - PageHeader* versions - simplifier?

---

## 📝 Notes Méthodologie

**Analyse effectuée:**
- Recherche regex `from ['"]\.\.\/components/` dans `/pages/**/*.tsx`
- Identification contexte d'utilisation par lecture code
- Classification par criticité basée sur:
  - Nombre de pages utilisant
  - Importance fonctionnelle
  - Impact utilisateur

**Limites:**
- Imports indirects non comptabilisés
- Utilisation via App.tsx non analysée
- Composants utilisés dynamiquement non détectés

**Prochaines étapes:**
1. Analyser imports indirects (component → component)
2. Vérifier usage dans App.tsx
3. Tester composants non utilisés sur plateforme
4. Décider archivage ou conservation

---

_Analyse effectuée: 22/02/2026_  
_Version: 2.0.0_  
_Status: Complète (analyse directe)_
