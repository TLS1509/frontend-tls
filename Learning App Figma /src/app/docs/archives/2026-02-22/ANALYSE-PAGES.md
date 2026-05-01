# 📊 Analyse Pages - 22/02/2026

## ✅ Pages ACTIVES (dans App.tsx)

### 🔐 Authentication (5 pages)
- ✅ `LoginPage.tsx`
- ✅ `SignupPage.tsx`
- ✅ `ForgotPasswordPage.tsx`
- ✅ `ResetPasswordPage.tsx`
- ✅ `PMProLoginPage.tsx`

### 🎓 Core App (14 pages)
- ✅ `DashboardPageUpgraded.tsx`
- ✅ `ParcoursPageUpgraded.tsx`
- ✅ `LearningSpacePage.tsx`
- ✅ `CoachingPageUpgraded.tsx`
- ✅ `PreCoachingQuestionnairePage.tsx`
- ✅ `PreCoachingQuestionnaireResponsePage.tsx`
- ✅ `ProfilePage.tsx`
- ✅ `VeillePage.tsx`
- ✅ `VeilleContentPage.tsx`
- ✅ `NewsletterPage.tsx` (⚠️ VÉRIFIER - peut-être dédoublonné avec WeeklyNewsletterPage)
- ✅ `LessonViewer.tsx`
- ✅ `CourseDetailPageUpdated.tsx`
- ✅ `ProjectPage.tsx`
- ✅ `OnboardingPageUpgraded.tsx`

### 📔 Journal (3 pages)
- ✅ `JournalPageUpgraded.tsx`
- ✅ `JournalDetailPage.tsx`
- ✅ `JournalFreeEntryPage.tsx`

### 💬 Communication (2 pages)
- ✅ `MessagesPage.tsx`
- ✅ `NotificationsPageUltra.tsx`

### 🏢 Entreprise (2 pages)
- ✅ `EntreprisePageComplete.tsx`
- ✅ `AccountPage.tsx`

### 🏆 Gamification (1 page)
- ✅ `LeaderboardPage.tsx`

### ⚠️ Errors (2 pages)
- ✅ `Error404Page.tsx`
- ✅ `Error500Page.tsx`

### 🎨 Design System (5 pages)
- ✅ `DesignSystemRealPage.tsx`
- ✅ `DesignSystemChangelogPage.tsx`
- ✅ `DesignSystemFlowsPage.tsx`
- ✅ `DesignTokensExportPage.tsx`

### 🧪 Demo/Test (5 pages)
- ✅ `NotificationSystemDemoPage.tsx`
- ✅ `PageHeaderDemo.tsx`
- ✅ `CoachingBookingFlowPage.tsx`
- ✅ `DashboardHeroDemo.tsx`
- ✅ `SandboxJournalPrompts.tsx`
- ✅ `HelpChatbotPage.tsx` (route 'test-lab')

**Total Pages Actives:** 39 pages

---

## ❓ Pages NON RÉFÉRENCÉES dans App.tsx

### 📰 Actus/Newsletter (3 pages - À VÉRIFIER)
- ❓ `WeeklyNewsletterPage.tsx` - **IMPORTANT**: Devrait remplacer NewsletterPage
- ❓ `WeeklyNewsDetailPage.tsx` - **IMPORTANT**: Page détail actus semaine
- ❌ `ArticlePage.tsx` (référencée mais import manquant !) - **ERREUR App.tsx ligne 47**

### 📚 Veille/Magazines (3 pages)
- ❓ `MagazinePage.tsx`
- ❓ `MagazineArticlePage.tsx`
- ❓ `DossierPage.tsx`

### 🎥 Vidéos (3 pages)
- ❓ `VideoViewer.tsx`
- ❓ `VideoReelsPage.tsx`
- ❓ `VideoTutorialPage.tsx`

### 📖 Viewers Spécifiques (3 pages)
- ❓ `FlashcardsViewer.tsx`
- ❓ `AstucesViewer.tsx`
- ❓ `ComplementaryContentViewer.tsx`

### 🎨 Démo/Showcase (3 pages)
- ❓ `CelebrationsDemo.tsx`
- ❓ `ColoredGlowDemo.tsx`
- ❓ `EmojiStyleDemo.tsx`

### 🏫 Cours/Éduc (2 pages)
- ❓ `CourseViewerEDRAC.tsx` - Ancien viewer?
- ❓ `JournalNewEntryPage.tsx` - Doublon avec JournalFreeEntryPage?

**Total Pages Non Référencées:** 17 pages

---

## 🚨 ERREUR CRITIQUE DÉTECTÉE

### App.tsx ligne 47
```typescript
import ArticlePage from './pages/ArticlePage';
```

**Problème:** Fichier `ArticlePage.tsx` n'existe PAS dans `/pages/`

**Impact:** 
- Route 'article' utilisée ligne 290-297
- Crash potentiel si navigation vers article

**Solutions:**
1. ✅ **Remplacer par WeeklyNewsDetailPage** (logique actus semaine)
2. ❌ Créer ArticlePage (pas nécessaire si actus semaine ok)

---

## 📋 Actions Recommandées

### 🔴 URGENT - À Corriger Immédiatement

1. **Corriger import ArticlePage**
   ```typescript
   // App.tsx ligne 47
   - import ArticlePage from './pages/ArticlePage';
   + import WeeklyNewsDetailPage from './pages/WeeklyNewsDetailPage';
   
   // App.tsx ligne 290-297
   {currentPage === 'article' && (
     <WeeklyNewsDetailPage 
       articleId={selectedArticleId} 
       onNavigate={navigateTo} 
       onBack={() => navigateTo('veille')} 
       onLogout={handleLogout} 
     />
   )}
   ```

### 🟡 IMPORTANT - À Vérifier sur Plateforme

#### Newsletter/Actus
- [ ] Tester `NewsletterPage.tsx` - utilisée?
- [ ] Tester `WeeklyNewsletterPage.tsx` - devrait être la vraie
- [ ] Vérifier si doublon → Archiver l'ancienne

#### Magazines
- [ ] `MagazinePage.tsx` - accessible depuis Veille?
- [ ] `MagazineArticlePage.tsx` - détail magazine?
- [ ] `DossierPage.tsx` - accessible depuis Veille?

#### Vidéos
- [ ] `VideoViewer.tsx` - viewer principal vidéos?
- [ ] `VideoReelsPage.tsx` - format reels?
- [ ] `VideoTutorialPage.tsx` - tutoriels spécifiques?

#### Viewers
- [ ] `FlashcardsViewer.tsx` - dans lessons?
- [ ] `AstucesViewer.tsx` - dans lessons?
- [ ] `ComplementaryContentViewer.tsx` - dans lessons?

### 🟢 NETTOYAGE - Après Tests

#### Pages Démo (À archiver si non utilisées)
- [ ] `CelebrationsDemo.tsx`
- [ ] `ColoredGlowDemo.tsx`
- [ ] `EmojiStyleDemo.tsx`
- [ ] `DashboardHeroDemo.tsx` (déjà active mais démo)
- [ ] `PageHeaderDemo.tsx` (déjà active mais démo)

#### Cours Ancien
- [ ] `CourseViewerEDRAC.tsx` - ancien système?

#### Journal
- [ ] `JournalNewEntryPage.tsx` - doublon avec JournalFreeEntryPage?

---

## 📊 Statistiques

```
Total fichiers /pages/: 55 (hors /archive/)
Pages actives App.tsx:  39
Pages non référencées:  17
Erreurs import:         1

Ratio utilisation: 70%
Pages à vérifier:   17 (30%)
```

---

## 🎯 Plan d'Action

### Phase 1 - URGENT (Aujourd'hui)
1. ✅ Corriger import ArticlePage → WeeklyNewsDetailPage
2. ✅ Tester navigation actus semaine
3. ✅ Vérifier pas de crash

### Phase 2 - Tests Plateforme (Cette semaine)
1. Tester toutes pages "❓" sur plateforme
2. Identifier lesquelles sont accessibles
3. Noter chemins d'accès

### Phase 3 - Nettoyage (Après tests)
1. Archiver pages démo non essentielles
2. Archiver anciennes versions (CourseViewerEDRAC)
3. Résoudre doublons (Newsletter vs WeeklyNewsletter)
4. Documenter pages actives finales

---

## 📝 Notes

### À Clarifier avec Équipe
- NewsletterPage vs WeeklyNewsletterPage - laquelle garder?
- Viewers (Video, Flashcards, Astuces) - tous utilisés?
- Pages démo - garder pour documentation design system?
- CourseViewerEDRAC - ancien système à supprimer?

---

_Analyse effectuée: 22/02/2026_  
_Par: Documentation Cleanup V2.0.0_
