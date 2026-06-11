import '../styles/globals.css';
import { useState } from 'react';
import { WebFontLoader } from './components/WebFontLoader';

// Pages principales
import DashboardPageUpgraded from './pages/DashboardPageUpgraded';
import ParcoursPageUpgraded from './pages/ParcoursPageUpgraded';
import CoachingPageUpgraded from './pages/CoachingPageUpgraded';
import VeillePage from './pages/VeillePage';
import JournalPageUpgraded from './pages/JournalPageUpgraded';
import ProfilePage from './pages/ProfilePage';
import NotificationsPageUltra from './pages/NotificationsPageUltra';
import MessagesPage from './pages/MessagesPage';
import AccountPage from './pages/AccountPage';
import LeaderboardPage from './pages/LeaderboardPage';

// Pages Veille
import MagazinePage from './pages/MagazinePage';
import VideoReelsPage from './pages/VideoReelsPage';
import WeeklyNewsletterPage from './pages/WeeklyNewsletterPage';

// Viewers
import LessonViewer from './pages/LessonViewer';
import VideoViewer from './pages/VideoViewer';
import VeilleContentPage from './pages/VeilleContentPage';
import ArticleDetailPage from './pages/ArticleDetailPage';
import WeeklyNewsDetailPage from './pages/WeeklyNewsDetailPage';

// Journal
import JournalNewEntryPage from './pages/JournalNewEntryPage';
import JournalDetailPage from './pages/JournalDetailPage';
import JournalFreeEntryPage from './pages/JournalFreeEntryPage';

// Course & Learning
import CourseDetailPageUpdated from './pages/CourseDetailPageUpdated';
import ProjectPage from './pages/ProjectPage';
import LearningSpacePage from './pages/LearningSpacePage';
import FlashcardsViewer from './pages/FlashcardsViewer';
import AstucesViewer from './pages/AstucesViewer';
import ComplementaryContentViewer from './pages/ComplementaryContentViewer';

// Coaching & Onboarding
import CoachingBookingFlowPage from './pages/CoachingBookingFlowPage';
import OnboardingPageUpgraded from './pages/OnboardingPageUpgraded';
import PreCoachingQuestionnairePage from './pages/PreCoachingQuestionnairePage';
import PreCoachingQuestionnaireResponsePage from './pages/PreCoachingQuestionnaireResponsePage';

// Entreprise
import EntreprisePageComplete from './pages/EntreprisePageComplete';

// Auth & Security
import ResetPasswordPage from './pages/ResetPasswordPage';
import PMProLoginPage from './pages/PMProLoginPage';

// Content & Media
import DossierPage from './pages/DossierPage';
import VideoTutorialPage from './pages/VideoTutorialPage';

// Help & Support
import HelpChatbotPage from './pages/HelpChatbotPage';
import Error404Page from './pages/Error404Page';
import Error500Page from './pages/Error500Page';

// Demo & Test Pages
import DashboardDevSpecsPage from './pages/DashboardDevSpecsPage';
import DashboardHeroDemo from './pages/DashboardHeroDemo';
import CelebrationsDemo from './pages/CelebrationsDemo';
import NotificationSystemDemoPage from './pages/NotificationSystemDemoPage';
import PageHeaderDemo from './pages/PageHeaderDemo';
import ColorTokensTestPage from './pages/ColorTokensTestPage';
import FontsTestPage from './pages/FontsTestPage';
import ColoredGlowDemo from './pages/ColoredGlowDemo';
import EmojiStyleDemo from './pages/EmojiStyleDemo';
import JauneComparison from './pages/JauneComparison';
import SandboxJournalPrompts from './pages/SandboxJournalPrompts';

// Autres pages
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import ForgotPasswordPage from './pages/ForgotPasswordPage';
import NotionExportPage from './pages/NotionExportPage';
import PositioningDemoPage from './pages/PositioningDemoPage';

/**
 * THE LEARNING SOCIETY - Application Complète
 * 
 * Navigation entre toutes les pages:
 * - Dashboard
 * - Parcours (cours)
 * - Coaching
 * - Veille (magazine, vidéos, newsletter)
 * - Journal
 * - Profil
 * - Notifications
 * - Messages
 * - Paramètres
 * - Classement
 */

type PageType =
  // Auth
  | 'login'
  | 'signup'
  | 'forgot-password'
  | 'reset-password'
  | 'pm-pro-login'

  // Main
  | 'dashboard'
  | 'parcours'
  | 'coaching'
  | 'veille'
  | 'journal'
  | 'profile'
  | 'notifications'
  | 'messages'
  | 'account'
  | 'leaderboard'

  // Veille
  | 'veille-magazine'
  | 'veille-videos'
  | 'veille-newsletter'
  | 'veille-article'
  | 'veille-newsletter-detail'
  | 'veille-content'
  | 'veille-dossier'

  // Journal
  | 'journal-new'
  | 'journal-detail'
  | 'journal-free-entry'
  | 'sandbox-journal-prompts'

  // Course & Learning
  | 'course-detail'
  | 'lesson-viewer'
  | 'video-viewer'
  | 'video-tutorial'
  | 'flashcards-viewer'
  | 'astuces-viewer'
  | 'complementary-content-viewer'
  | 'project'
  | 'learning-space'

  // Coaching & Onboarding
  | 'coaching-booking-flow'
  | 'onboarding'
  | 'pre-coaching-questionnaire'
  | 'pre-coaching-questionnaire-response'

  // Entreprise
  | 'entreprise-dashboard'

  // Help & Errors
  | 'help-chatbot'
  | 'error-404'
  | 'error-500'

  // Demo & Test
  | 'dev-specs'
  | 'positioning-demo'
  | 'dashboard-hero-demo'
  | 'celebrations-demo'
  | 'notification-system-demo'
  | 'page-header-demo'
  | 'color-tokens-test'
  | 'fonts-test'
  | 'colored-glow-demo'
  | 'emoji-style-demo'
  | 'jaune-comparison'
  | 'notion-export';

export default function App() {
  const [currentPage, setCurrentPage] = useState<PageType>('dashboard');
  const [selectedCourseId, setSelectedCourseId] = useState<string | null>(null);
  const [selectedEntryType, setSelectedEntryType] = useState<string | null>(null);
  const [selectedNewsArticleId, setSelectedNewsArticleId] = useState<number | null>(null);

  const handleNavigate = (page: string, courseId?: string, entryType?: string, newsArticleId?: number) => {
    setCurrentPage(page as PageType);
    if (courseId) setSelectedCourseId(courseId);
    if (entryType) setSelectedEntryType(entryType);
    if (newsArticleId !== undefined) setSelectedNewsArticleId(newsArticleId);
  };

  const handleLogout = () => {
    setCurrentPage('login');
  };

  const handleBackToDashboard = () => {
    setCurrentPage('dashboard');
  };

  const handleBackToVeille = () => {
    setCurrentPage('veille');
  };

  const handleBackToJournal = () => {
    setCurrentPage('journal');
  };

  const handleBackToParcours = () => {
    setCurrentPage('parcours');
  };

  // Rendu conditionnel des pages
  const renderPage = () => {
    switch (currentPage) {
      case 'login':
        return <LoginPage 
          onLogin={() => setCurrentPage('dashboard')}
          onNavigateToSignup={() => setCurrentPage('signup')}
          onNavigateToForgotPassword={() => setCurrentPage('forgot-password')}
        />;

      case 'signup':
        return <SignupPage 
          onSignup={() => setCurrentPage('dashboard')}
          onNavigateToLogin={() => setCurrentPage('login')}
        />;

      case 'forgot-password':
        return <ForgotPasswordPage 
          onNavigateToLogin={() => setCurrentPage('login')}
        />;

      case 'dashboard':
        return <DashboardPageUpgraded onNavigate={handleNavigate} onLogout={handleLogout} />;

      case 'parcours':
        return <ParcoursPageUpgraded onNavigate={handleNavigate} onLogout={handleLogout} />;

      case 'coaching':
        return <CoachingPageUpgraded onNavigate={handleNavigate} onLogout={handleLogout} />;

      case 'veille':
        return <VeillePage onNavigate={handleNavigate} onLogout={handleLogout} />;

      case 'veille-magazine':
        return <MagazinePage onNavigate={handleNavigate} onLogout={handleLogout} />;

      case 'veille-videos':
        return <VideoReelsPage onNavigate={handleNavigate} onLogout={handleLogout} />;

      case 'veille-newsletter':
        return <WeeklyNewsletterPage onNavigate={handleNavigate} onLogout={handleLogout} />;

      case 'journal':
        return <JournalPageUpgraded onNavigate={handleNavigate} onLogout={handleLogout} />;

      case 'journal-new':
        return <JournalNewEntryPage 
          onNavigate={handleNavigate}
          onLogout={handleLogout}
          entryType={selectedEntryType || 'libre'}
        />;

      case 'journal-detail':
        return <JournalDetailPage 
          onNavigate={handleNavigate}
          onLogout={handleLogout}
          entryId={selectedCourseId || '1'}
        />;

      case 'profile':
        return <ProfilePage onNavigate={handleNavigate} onLogout={handleLogout} />;

      case 'notifications':
        return <NotificationsPageUltra onNavigate={handleNavigate} onLogout={handleLogout} />;

      case 'messages':
        return <MessagesPage onNavigate={handleNavigate} onLogout={handleLogout} />;

      case 'account':
        return <AccountPage onNavigate={handleNavigate} onLogout={handleLogout} />;

      case 'leaderboard':
        return <LeaderboardPage onNavigate={handleNavigate} onLogout={handleLogout} />;

      case 'lesson-viewer':
        return <LessonViewer 
          onNavigate={handleNavigate}
          onLogout={handleLogout}
          onBack={handleBackToParcours}
        />;

      case 'video-viewer':
        return <VideoViewer 
          onNavigate={handleNavigate}
          onLogout={handleLogout}
          onBack={handleBackToParcours}
        />;

      case 'veille-content':
        return <VeilleContentPage
          onNavigate={handleNavigate}
          onLogout={handleLogout}
          onBack={handleBackToVeille}
        />;

      case 'veille-article':
        return <ArticleDetailPage
          source={selectedNewsArticleId ? "newsletter" : "magazine"}
          articleId={selectedNewsArticleId || 1}
          sourceId={selectedNewsArticleId ? undefined : 1}
          onNavigate={handleNavigate}
          onLogout={handleLogout}
          onBack={() => setCurrentPage(selectedNewsArticleId ? 'veille-newsletter' : 'veille-magazine')}
        />;

      case 'veille-newsletter-detail':
        return <WeeklyNewsDetailPage
          onNavigate={handleNavigate}
          onLogout={handleLogout}
          onBack={() => setCurrentPage('veille-newsletter')}
        />;

      case 'notion-export':
        return <NotionExportPage onNavigate={handleNavigate} />;

      case 'dev-specs':
        return <DashboardDevSpecsPage />;

      case 'positioning-demo':
        return <PositioningDemoPage onNavigate={handleNavigate} onLogout={handleLogout} />;

      // Course & Learning
      case 'course-detail':
        return <CourseDetailPageUpdated onNavigate={handleNavigate} onLogout={handleLogout} />;

      case 'project':
        return <ProjectPage onNavigate={handleNavigate} onLogout={handleLogout} />;

      case 'learning-space':
        return <LearningSpacePage onNavigate={handleNavigate} onLogout={handleLogout} />;

      case 'flashcards-viewer':
        return <FlashcardsViewer onNavigate={handleNavigate} onLogout={handleLogout} onBack={handleBackToParcours} />;

      case 'astuces-viewer':
        return <AstucesViewer onNavigate={handleNavigate} onLogout={handleLogout} onBack={handleBackToParcours} />;

      case 'complementary-content-viewer':
        return <ComplementaryContentViewer onNavigate={handleNavigate} onLogout={handleLogout} onBack={handleBackToParcours} />;

      case 'video-tutorial':
        return <VideoTutorialPage onNavigate={handleNavigate} onLogout={handleLogout} />;

      // Journal
      case 'journal-free-entry':
        return <JournalFreeEntryPage onNavigate={handleNavigate} onLogout={handleLogout} />;

      case 'sandbox-journal-prompts':
        return <SandboxJournalPrompts onNavigate={handleNavigate} onLogout={handleLogout} />;

      // Coaching & Onboarding
      case 'coaching-booking-flow':
        return <CoachingBookingFlowPage onNavigate={handleNavigate} onLogout={handleLogout} />;

      case 'onboarding':
        return <OnboardingPageUpgraded onNavigate={handleNavigate} onLogout={handleLogout} />;

      case 'pre-coaching-questionnaire':
        return <PreCoachingQuestionnairePage onNavigate={handleNavigate} onLogout={handleLogout} />;

      case 'pre-coaching-questionnaire-response':
        return <PreCoachingQuestionnaireResponsePage onNavigate={handleNavigate} onLogout={handleLogout} />;

      // Entreprise
      case 'entreprise-dashboard':
        return <EntreprisePageComplete onNavigate={handleNavigate} onLogout={handleLogout} />;

      // Auth
      case 'reset-password':
        return <ResetPasswordPage onNavigateToLogin={() => setCurrentPage('login')} />;

      case 'pm-pro-login':
        return <PMProLoginPage onLogin={() => setCurrentPage('dashboard')} />;

      // Content & Media
      case 'veille-dossier':
        return <DossierPage onNavigate={handleNavigate} onLogout={handleLogout} />;

      // Help & Errors
      case 'help-chatbot':
        return <HelpChatbotPage onNavigate={handleNavigate} onLogout={handleLogout} />;

      case 'error-404':
        return <Error404Page onNavigate={handleNavigate} />;

      case 'error-500':
        return <Error500Page onNavigate={handleNavigate} />;

      // Demo & Test Pages
      case 'dashboard-hero-demo':
        return <DashboardHeroDemo onNavigate={handleNavigate} onLogout={handleLogout} />;

      case 'celebrations-demo':
        return <CelebrationsDemo onNavigate={handleNavigate} onLogout={handleLogout} />;

      case 'notification-system-demo':
        return <NotificationSystemDemoPage onNavigate={handleNavigate} onLogout={handleLogout} />;

      case 'page-header-demo':
        return <PageHeaderDemo onNavigate={handleNavigate} onLogout={handleLogout} />;

      case 'color-tokens-test':
        return <ColorTokensTestPage onNavigate={handleNavigate} onLogout={handleLogout} />;

      case 'fonts-test':
        return <FontsTestPage onNavigate={handleNavigate} onLogout={handleLogout} />;

      case 'colored-glow-demo':
        return <ColoredGlowDemo onNavigate={handleNavigate} onLogout={handleLogout} />;

      case 'emoji-style-demo':
        return <EmojiStyleDemo onNavigate={handleNavigate} onLogout={handleLogout} />;

      case 'jaune-comparison':
        return <JauneComparison onNavigate={handleNavigate} onLogout={handleLogout} />;

      default:
        return <DashboardPageUpgraded onNavigate={handleNavigate} />;
    }
  };

  return (
    <>
      <WebFontLoader />
      <div style={{
        width: '100vw',
        height: '100vh',
        overflow: 'hidden',
        fontFamily: 'var(--font-body)',
        background: 'var(--background)'
      }}>
        {renderPage()}
      </div>
    </>
  );
}