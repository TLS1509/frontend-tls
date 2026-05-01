# 📄 Pages - Status & Organisation

**Version:** 2.0.0 | **Date:** 22/02/2026

---

## ✅ Pages Production (39 actives)

### 🔐 Authentication (5)
- LoginPage, SignupPage, ForgotPasswordPage, ResetPasswordPage, PMProLoginPage

### 🎓 Core (14)
- DashboardPageUpgraded, ParcoursPageUpgraded, LearningSpacePage
- CoachingPageUpgraded, PreCoachingQuestionnairePage, PreCoachingQuestionnaireResponsePage
- ProfilePage, VeillePage, VeilleContentPage
- NewsletterPage ⚠️ (vérifier vs WeeklyNewsletterPage)
- LessonViewer, CourseDetailPageUpdated, ProjectPage, OnboardingPageUpgraded

### 📔 Journal (3)
- JournalPageUpgraded, JournalDetailPage, JournalFreeEntryPage

### 💬 Communication (2)
- MessagesPage, NotificationsPageUltra

### 🏢 Entreprise (2)
- EntreprisePageComplete, AccountPage

### 🏆 Gamification (1)
- LeaderboardPage

### ⚠️ Errors (2)
- Error404Page, Error500Page

### 🎨 Design System (4)
- DesignSystemRealPage, DesignSystemChangelogPage, DesignSystemFlowsPage, DesignTokensExportPage

### 🧪 Tests/Démo (6)
- NotificationSystemDemoPage, PageHeaderDemo, CoachingBookingFlowPage
- DashboardHeroDemo, SandboxJournalPrompts, HelpChatbotPage

---

## 🔧 Pages Importées Mais Non Routées

**Ces pages sont maintenant importées dans App.tsx pour utilisation future:**

### 📰 Actus Semaine
- ✅ `WeeklyNewsletterPage` - Vue magazine actus
- ✅ `WeeklyNewsDetailPage` - Détail article (remplace ArticlePage manquant)

### 📚 Magazines & Dossiers
- ✅ `MagazinePage` - Liste magazines
- ✅ `MagazineArticlePage` - Détail magazine
- ✅ `DossierPage` - Page dossier thématique

### 🎥 Vidéos
- ✅ `VideoViewer` - Viewer vidéo principal
- ✅ `VideoReelsPage` - Format reels courts
- ✅ `VideoTutorialPage` - Page tutoriel vidéo

### 📖 Viewers Leçons
- ✅ `FlashcardsViewer` - Cartes mémoire
- ✅ `AstucesViewer` - Astuces pratiques
- ✅ `ComplementaryContentViewer` - Contenus complémentaires

**Action suivante:** Ajouter routes dans App.tsx quand fonctionnalités seront testées

---

## ❓ Pages À Tester sur Plateforme

### Priority HIGH - Tests Cette Semaine

1. **NewsletterPage vs WeeklyNewsletterPage**
   - [ ] Tester quelle est accessible
   - [ ] Vérifier contenu différent ou doublon
   - [ ] Décision: garder une seule → archiver l'autre

2. **Magazines & Dossiers**
   - [ ] MagazinePage accessible depuis Veille?
   - [ ] MagazineArticlePage route détail ok?
   - [ ] DossierPage route ok?

3. **Vidéos**
   - [ ] VideoViewer utilisé dans lessons?
   - [ ] VideoReelsPage accessible?
   - [ ] VideoTutorialPage accessible?

4. **Viewers**
   - [ ] FlashcardsViewer dans LessonViewer?
   - [ ] AstucesViewer dans LessonViewer?
   - [ ] ComplementaryContentViewer dans LessonViewer?

---

## 🎨 Pages Démo/Showcase

**Utilisées pour documentation Design System:**

### À Garder
- ✅ DesignSystemRealPage - Catalogue principal
- ✅ DesignSystemChangelogPage - Historique
- ✅ DesignSystemFlowsPage - User flows
- ✅ DesignTokensExportPage - Export tokens
- ✅ NotificationSystemDemoPage - Démo notifications
- ✅ PageHeaderDemo - Démo headers
- ✅ DashboardHeroDemo - Comparaison versions hero

### À Évaluer (Utiles pour doc?)
- ❓ CelebrationsDemo - Démo célébrations
- ❓ ColoredGlowDemo - Démo glow effects
- ❓ EmojiStyleDemo - Démo styles emoji

**Décision:** Garder si utilisées dans DesignSystemRealPage, sinon archiver

---

## 🗑️ Pages Candidates Archivage

**À archiver APRÈS tests plateforme:**

### Si Doublons Confirmés
- [ ] NewsletterPage (si WeeklyNewsletterPage est la vraie)
- [ ] JournalNewEntryPage (si doublon JournalFreeEntryPage)

### Si Non Utilisées
- [ ] CourseViewerEDRAC - Ancien système cours?
- [ ] CelebrationsDemo - Si pas dans design system
- [ ] ColoredGlowDemo - Si pas dans design system
- [ ] EmojiStyleDemo - Si pas dans design system

---

## ✅ Corrections Effectuées

### 22/02/2026 - Erreur Import Critique

**Problème:**
```typescript
import ArticlePage from './pages/ArticlePage';  // ❌ Fichier inexistant
```

**Solution:**
```typescript
import WeeklyNewsDetailPage from './pages/WeeklyNewsDetailPage';  // ✅
```

**Impact:** Route 'article' fonctionne maintenant avec page actus semaine

---

## 📋 Routes à Ajouter (Futur)

### Actus Semaine
```typescript
| 'weekly-newsletter'      // WeeklyNewsletterPage
| 'weekly-news-detail'     // WeeklyNewsDetailPage
```

### Magazines
```typescript
| 'magazine'              // MagazinePage
| 'magazine-article'      // MagazineArticlePage
| 'dossier'               // DossierPage
```

### Vidéos
```typescript
| 'video'                 // VideoViewer
| 'video-reels'           // VideoReelsPage
| 'video-tutorial'        // VideoTutorialPage
```

### Viewers
```typescript
| 'flashcards'            // FlashcardsViewer
| 'astuces'               // AstucesViewer
| 'complementary'         // ComplementaryContentViewer
```

---

## 📊 Statistiques Pages

```
Total pages /pages/:           55 fichiers
Pages actives (routes):        39 (71%)
Pages importées non routées:   12 (22%)
Pages non référencées:         4  (7%)
  
À tester:                      12 pages
Démo à évaluer:                3 pages
Candidates archivage:          4 pages
```

---

## 🎯 Plan d'Action

### Phase 1 - Tests ✅ (Cette Semaine)
1. [ ] Tester Newsletter vs WeeklyNewsletter
2. [ ] Tester Magazines & Dossiers
3. [ ] Tester Vidéos (VideoViewer, VideoReels, VideoTutorial)
4. [ ] Tester Viewers (Flashcards, Astuces, Complementary)
5. [ ] Documenter résultats tests

### Phase 2 - Routing (Semaine Prochaine)
1. [ ] Ajouter routes pages testées OK
2. [ ] Intégrer dans navigation (Sidebar, Veille, etc.)
3. [ ] Tester navigation complète

### Phase 3 - Nettoyage (Après Routing)
1. [ ] Archiver doublons confirmés
2. [ ] Archiver pages démo non essentielles
3. [ ] Archiver ancien système (CourseViewerEDRAC)
4. [ ] Mettre à jour documentation

---

## 📝 Checklist Test Page

Pour chaque page à tester:

```
Page: [NOM_PAGE]

1. Accessible?
   - [ ] Depuis Sidebar
   - [ ] Depuis autre page
   - [ ] URL directe

2. Fonctionnelle?
   - [ ] Affichage OK
   - [ ] Navigation OK
   - [ ] Données chargées
   - [ ] Pas d'erreur console

3. Design System?
   - [ ] Variables CSS utilisées
   - [ ] Font faces respectées
   - [ ] Glassmorphism OK
   - [ ] Responsive

4. Décision
   - [ ] ✅ Garder (ajouter route)
   - [ ] 🗑️ Archiver (raison: ...)
   - [ ] ⚠️ À corriger (détails: ...)
```

---

_Dernière mise à jour: 22/02/2026_  
_Prochaine révision: Après tests plateforme_
