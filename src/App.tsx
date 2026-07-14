/**
 * App Component - Root of the React SPA
 *
 * Phase 2: API Client & Authentication
 *
 * Features:
 * - Sets up routing and layout for all pages
 * - Implements authentication via useAuth hook
 * - Integrates with WordPress API client layer
 * - Uses Zustand stores for state management
 * - Displays different layouts for authenticated/unauthenticated users
 * - Uses design system sidebar and components
 */

import React from 'react';
import { MarketingError404 } from './pages/marketing/MarketingError404';
import { BrowserRouter as Router, Routes, Route, useLocation, Navigate, useNavigate } from 'react-router-dom';
import { ToastProvider } from './contexts/ToastContext';
import { AppBreadcrumb } from './components/patterns/AppBreadcrumb';
import { ScrollToTop } from './components/ScrollToTop';
import { useNotificationsStore } from './stores/persistence';
import { useAuth } from './hooks/useAuth';
import { useTheme } from './hooks/useTheme';
import { Sidebar, NavItem, SidebarUserCard } from './components/layout/Sidebar';
import { BottomNav } from './components/layout/BottomNav';
import { DropdownMenu, DropdownItem, DropdownLabel, DropdownSeparator } from './components/ui/DropdownMenu';
import { Avatar } from './components/ui/Avatar';
import {
  LayoutDashboard,
  Map as MapIcon,
  PenLine,
  Video,
  Sparkles as SparklesIcon,
  UserRound,
  Bell,
  Target,
  BarChart3,
  LogOut,
  Menu,
  Moon,
  Sun,
  Trophy,
  MessageSquare,
  Users,
  Palette,
  BookOpenText,
  Layers,
  KeyRound,
  HelpCircle,
} from 'lucide-react';
import {
  Dashboard,
  Profile,
  Components,
  LearningPaths,
  LearningPathDetail,
  Positionnement,
  Billing,
  SubscriptionPayment,
  VerifyEmail,
  MagicLink,
  Passeport,
  Gamification,
  CoachDashboard,
  ManagerEnterprise,
  ManagerCohort,
  // Phase 12
  PasseportCompetenceDetail,
  PasseportObjectifs,
  CoachHeatmap,
  OnboardingSuccess,
  OnboardingTutorial,
  CoachingSessionDetail,
  CoachingCorrections,
  CoachCorrectionsQueue,
  CoachCorrectionInterface,
  CoachApprenants,
  BadgeDetail,
  ProfileBadgesCompetences,
  ManagerAlerts,
  ManagerExport,
  DashboardCompetenceDetail,
  CoachTeamDashboard,
  FicheApprenantAnalytics,
  ProfilePrivacy,
  EnterpriseAnalyticsDashboard,
  AnalyticsDashboard,
  // Phase 13
  PasseportRoadmap,
  PasseportJac,
  CoachAnalytics,
  EnterpriseKpis,
  AlerteInactivite,
  AlerteStagnation,
  // Phase 14 — Ateliers + Masterclass + Événements
  AtelierHub,
  AtelierDetail,
  AtelierLive,
  AtelierPresentiel,
  AtelierRecap,
  AtelierWaitlist,
  MasterclassHub,
  MasterclassDetail,
  MasterclassLive,
  MasterclassReplay,
  MasterclassSurvey,
  EvenementHub,
  EvenementDetail,
  EvenementLive,
  EvenementRecap,
  // Phase 15 — Help + Coach + Project + Gamification + Dashboard
  HelpArticle,
  HelpSearch,
  HelpTicketDetail,
  HelpTicketNew,
  HelpTickets,
  HelpTutorialStep,
  HelpTutorials,
  CoachJournal,
  CoachJournalDetail,
  CoachLearnerProfile,
  ProjectJac,
  ProjectPasseportFeed,
  ProjectSkillGaps,
  ProjectTask,
  ProjectTeam,
  BadgeGallery,
  XPDashboard,
  DashboardAchievements,
  NotificationPreferences,
  // Phase 16 — Sitemap gap pages (17 from FO_SCREENS_CONSOLIDATION)
  PerplexityContentDetail,
  OnboardingQuestionnaire,
  CorrectionDetailLearner,
  MessagingThread,
  CoachCalendar,
  ApiDocs,
  ProjectsList,
  ItemRecommendations,
  PasseportHistorique,
  PurchaseCredits,
  StreakDetail,
  CoachEngagement,
  CoachEnterpriseDashboard,
  ManagerViewsBuilder,
  JournalSearch,
  PrivacyDsar,
  PrivacyDeleteAccount,
  Coaching,
  Collaboration,
  Login,
  Signup,
  ForgotPassword,
  Notifications,
  Messages,
  Leaderboard,
  Veille,
  Journal,
  ArticleDetail,
  Dossier,
  VideoTutorial,
  VideoReels,
  Magazine,
  MagazineArticle,
  WeeklyNewsletter,
  WeeklyNewsDetail,
  Newsletter,
  Project,
  LearningSpace,
  LearningFlow,
  Onboarding,
  CoachingBookingFlow,
  PreCoachingQuestionnaire,
  PreCoachingQuestionnaireResponse,
  JournalDetail,
  JournalNewEntry,
  JournalFreeEntry,
  ResetPassword,
  Account,
  Error404,
  Error500,
  Help,
  Enterprise,
  CourseDetail,
  LessonPlayer,
  AstucesViewer,
  ComplementaryContentViewer,
  FlashcardsViewer,
  VideoViewer,
  CoachingCompteRendu,
} from './pages';
import MotionSprintShowcase from './pages/MotionSprintShowcase';
import ChatInterface from './pages/ChatInterface';
import ChatHistoryPanel from './pages/ChatHistoryPanel';
import OpenBadgesSection from './pages/OpenBadgesSection';
import CoachProfileView from './pages/CoachProfileView';
import WebhooksManagement from './pages/WebhooksManagement';
import OnboardingPreview from './pages/OnboardingPreview';
import { OnboardingUnified } from './pages/OnboardingUnified';
import AppLanding from './pages/AppLanding';
import { PagesIndex } from './pages/PagesIndex';
import DesignShowcase from './pages/DesignShowcase';
import TestLogo from './pages/_TestLogo';
import { FloatingNavButton } from './components/FloatingNavButton';
import { DevPanel } from './components/DevPanel';
// Marketing site
import { MarketingLayout } from './pages/marketing/components/MarketingLayout';
import { MarketingHome } from './pages/marketing/MarketingHome';
import { MarketingHomeClarity } from './pages/marketing/MarketingHomeClarity';
import { MarketingHomeNarrative } from './pages/marketing/MarketingHomeNarrative';
import { MarketingHomeRefined } from './pages/marketing/MarketingHomeRefined';
import { MarketingHomeCinematic } from './pages/marketing/MarketingHomeCinematic';
import { MarketingTaglineLab } from './pages/marketing/MarketingTaglineLab';
// V2 cinematic direction prototypes (2026-07-06): options for the agency-grade redesign, not yet chosen
import { HomeCinematicRevealV2 } from './pages/marketing/_prototypes/HomeCinematicRevealV2';
import { HomeInterfaceChoreographyV2 } from './pages/marketing/_prototypes/HomeInterfaceChoreographyV2';
import { HomeJardinVivantV2 } from './pages/marketing/_prototypes/HomeJardinVivantV2';
import { HomeCheminV2 } from './pages/marketing/_prototypes/HomeCheminV2';
import { EclipseHeroTrials } from './pages/marketing/_prototypes/EclipseHeroTrials';
import { StickyVideoCards } from './pages/marketing/_prototypes/StickyVideoCards';
import { StickyVideoCardsDepth } from './pages/marketing/_prototypes/StickyVideoCardsDepth';
import { ImmersiveParallaxStory } from './pages/marketing/_prototypes/ImmersiveParallaxStory';
import { HeroDawnLight } from './pages/marketing/_prototypes/HeroDawnLight';
import { HeroConstellation } from './pages/marketing/_prototypes/HeroConstellation';
import { HeroEclipse } from './pages/marketing/_prototypes/HeroEclipse';
import { HeroTrait } from './pages/marketing/_prototypes/HeroTrait';
import { HeroLeverDuJour } from './pages/marketing/_prototypes/HeroLeverDuJour';
import { HeroCelestial } from './pages/marketing/_prototypes/HeroCelestial';
import { MarketingDiagnostic } from './pages/marketing/MarketingDiagnostic';
// [archived] devtools — files kept, routes removed from prod
// import { MarketingMotionLab } from './pages/marketing/MarketingMotionLab';
// import { default as StickyScrollShowcase } from './pages/marketing/StickyScrollShowcase';
import { MarketingEquipe } from './pages/marketing/MarketingEquipe';
import { MarketingResources } from './pages/marketing/MarketingResources';
import { MarketingMethode } from './pages/marketing/MarketingMethode';
import { MarketingTemoignages } from './pages/marketing/MarketingTemoignages';
import { MarketingAccompagnement } from './pages/marketing/MarketingAccompagnement';
import { MarketingUpskilling } from './pages/marketing/MarketingUpskilling';
import { MarketingLearningApp } from './pages/marketing/MarketingLearningApp';
import { MarketingVariantLab } from './pages/marketing/MarketingVariantLab';
import { MarketingArticleDetail } from './pages/marketing/MarketingArticleDetail';
import { MarketingDossierDetail } from './pages/marketing/MarketingDossierDetail';
import { MarketingVideoDetail } from './pages/marketing/MarketingVideoDetail';
import { MarketingGuideDetail } from './pages/marketing/MarketingGuideDetail';
import { MarketingWebinaireDetail } from './pages/marketing/MarketingWebinaireDetail';
import { MarketingContact } from './pages/marketing/MarketingContact';
import { MarketingWaitlist } from './pages/marketing/MarketingWaitlist';
import {
  MarketingMentionsLegales,
  MarketingPolitiqueConfidentialite,
  MarketingCgvCgu,
  MarketingCharteIA,
} from './pages/marketing/MarketingLegal';
// CSS is centrally managed in globals.css — no direct imports needed here

/**
 * AppLayout - Main layout wrapper with sidebar navigation (Tailwind, redesigned)
 */
const AppLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, logout } = useAuth();
  const { theme, toggle: toggleTheme } = useTheme();
  const location = useLocation();
  const navigate = useNavigate();
  const [isSidebarCollapsed, setIsSidebarCollapsed] = React.useState(false);
  const [isMobileOpen, setIsMobileOpen] = React.useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = React.useState(false);
  // Notifications unread count — synced from useNotificationsStore (live)
  const unreadNotifications = useNotificationsStore((s) => s.unreadCount);
  const setInitialUnread = useNotificationsStore((s) => s.setUnreadCount);
  // Prime initial unread count (mocked since no real API yet)
  React.useEffect(() => {
    if (unreadNotifications === 0) setInitialUnread(3);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const [isMobile, setIsMobile] = React.useState<boolean>(() =>
    typeof window !== 'undefined' && window.matchMedia('(max-width: 767px)').matches
  );
  const userMenuRef = React.useRef<HTMLDivElement>(null);
  // Hover-peek timers — 200ms hover-in delay (avoid accidental open),
  // 400ms hover-out delay (allow re-cross into sidebar without closing).
  const hoverOpenTimer = React.useRef<number | null>(null);
  const hoverCloseTimer = React.useRef<number | null>(null);

  const clearHoverTimers = () => {
    if (hoverOpenTimer.current) window.clearTimeout(hoverOpenTimer.current);
    if (hoverCloseTimer.current) window.clearTimeout(hoverCloseTimer.current);
    hoverOpenTimer.current = null;
    hoverCloseTimer.current = null;
  };

  const scheduleHoverOpen = () => {
    clearHoverTimers();
    hoverOpenTimer.current = window.setTimeout(() => setIsMobileOpen(true), 200);
  };

  const scheduleHoverClose = () => {
    clearHoverTimers();
    hoverCloseTimer.current = window.setTimeout(() => setIsMobileOpen(false), 400);
  };

  React.useEffect(() => () => clearHoverTimers(), []);

  React.useEffect(() => {
    const mq = window.matchMedia('(max-width: 767px)');
    const update = () => setIsMobile(mq.matches);
    update();
    mq.addEventListener('change', update);
    return () => mq.removeEventListener('change', update);
  }, []);

  // On mobile, the drawer always renders expanded content
  const collapsed = !isMobile && isSidebarCollapsed;

  // Close user menu on outside click / route change
  React.useEffect(() => { setIsUserMenuOpen(false); }, [location.pathname]);
  React.useEffect(() => {
    if (!isUserMenuOpen) return;
    const onDocClick = (e: MouseEvent) => {
      if (userMenuRef.current && !userMenuRef.current.contains(e.target as Node)) {
        setIsUserMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', onDocClick);
    return () => document.removeEventListener('mousedown', onDocClick);
  }, [isUserMenuOpen]);

  const isActive = (path: string) => location.pathname === path || location.pathname === path + '/';

  const goTo = (path: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    setIsMobileOpen(false);
    navigate(path);
  };

  return (
    <div className="flex min-h-[100dvh] bg-gradient-page-ambient">
      {/* Mobile hamburger (top-left, only visible < md) — click immédiat OU hover (200ms delay) */}
      <button
        type="button"
        onClick={() => {
          clearHoverTimers();
          setIsMobileOpen(true);
        }}
        onMouseEnter={scheduleHoverOpen}
        onMouseLeave={scheduleHoverClose}
        aria-label="Ouvrir la navigation"
        className="md:hidden fixed top-2 left-2 z-dropdown inline-flex items-center justify-center w-touch h-touch rounded-full bg-white border border-ink-200 shadow-md text-ink-700 hover:bg-primary-50 transition-colors"
      >
        <Menu size={18} />
      </button>

      {/* Sidebar — wrapped in a sticky container so it pins on scroll (desktop only). */}
      <div className="sticky top-0 h-[100dvh] z-sticky max-md:static max-md:h-auto max-md:z-auto relative flex-shrink-0" ref={userMenuRef}>
      {/* Dropdown menu — floats to the right of the sidebar (glass), anchored to user card */}
      {isUserMenuOpen && user && (
        <DropdownMenu
          variant="glass"
          onClose={() => setIsUserMenuOpen(false)}
          className="absolute bottom-3 left-full ml-3 z-dropdown min-w-[260px] max-md:left-auto max-md:right-3 max-md:bottom-[80px] max-md:ml-0"
        >
          <DropdownItem icon={<UserRound size={16} />} onClick={goTo('/profile')}>Mon Profil</DropdownItem>
          <DropdownItem icon={<KeyRound size={16} />} onClick={goTo('/account')}>Mon compte</DropdownItem>
          <DropdownItem
            icon={<Bell size={16} />}
            badge={unreadNotifications > 0 ? String(unreadNotifications) : undefined}
            onClick={goTo('/notifications')}
          >
            Notifications
          </DropdownItem>
          <DropdownItem icon={<Target size={16} />} badge="demo" onClick={goTo('/onboarding')}>Onboarding</DropdownItem>
          <DropdownItem icon={<BarChart3 size={16} />} badge="pro" onClick={goTo('/enterprise')}>Espace Entreprise</DropdownItem>
          <DropdownSeparator />
          <DropdownLabel>Communauté</DropdownLabel>
          <DropdownItem icon={<Trophy size={16} />} onClick={goTo('/leaderboard')}>Leaderboard</DropdownItem>
          <DropdownItem icon={<Users size={16} />} onClick={goTo('/collaboration')}>Collaboration</DropdownItem>
          <DropdownItem icon={<MessageSquare size={16} />} onClick={goTo('/messages')}>Messages</DropdownItem>
          <DropdownSeparator />
          <DropdownItem icon={<HelpCircle size={16} />} onClick={goTo('/help')}>Centre d'aide</DropdownItem>
          <DropdownSeparator />
          <DropdownItem
            icon={theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
            onClick={(e) => { e.preventDefault(); toggleTheme(); }}
          >
            {theme === 'dark' ? 'Mode clair' : 'Mode sombre'}
          </DropdownItem>
          <DropdownSeparator />
          <DropdownItem
            icon={<LogOut size={16} />}
            danger
            onClick={() => {
              logout();
              window.location.href = 'http://localhost:8888/app/wp-login.php';
            }}
          >
            Déconnexion
          </DropdownItem>
        </DropdownMenu>
      )}

      <Sidebar
        className="h-full"
        collapsed={collapsed}
        onToggleCollapse={isMobile ? undefined : () => setIsSidebarCollapsed((p) => !p)}
        mobileOpen={isMobileOpen}
        onMobileClose={() => setIsMobileOpen(false)}
        onMouseEnter={isMobile ? clearHoverTimers : undefined}
        onMouseLeave={isMobile ? scheduleHoverClose : undefined}
        userCard={
          user && (
            <SidebarUserCard
              avatar={
                <Avatar
                  initials={user.name?.charAt(0).toUpperCase()}
                  size="md"
                  shape="square"
                  tint="brand"
                />
              }
              name={user.name || 'Utilisateur'}
              subtitle={user.email}
              menuOpen={isUserMenuOpen}
              onClick={() => setIsUserMenuOpen((p) => !p)}
              collapsed={collapsed}
              notificationCount={unreadNotifications}
            />
          )
        }
      >
        <NavItem
          href="/"
          onClick={goTo('/')}
          icon={<LayoutDashboard size={18} />}
          label="Tableau de bord"
          active={isActive('/') || isActive('/dashboard')}
          collapsed={collapsed}
        />
        <NavItem
          href="/learning-paths"
          onClick={goTo('/learning-paths')}
          icon={<MapIcon size={18} />}
          label="Parcours"
          count="3"
          active={isActive('/learning-paths')}
          collapsed={collapsed}
        />
        <NavItem
          href="/journal"
          onClick={goTo('/journal')}
          icon={<PenLine size={18} />}
          label="Journal de bord"
          active={isActive('/journal')}
          collapsed={collapsed}
        />
        <NavItem
          href="/coaching"
          onClick={goTo('/coaching')}
          icon={<Video size={18} />}
          label="Coaching"
          active={isActive('/coaching')}
          collapsed={collapsed}
        />
        <NavItem
          href="/veille"
          onClick={goTo('/veille')}
          icon={<SparklesIcon size={18} />}
          label="Veille"
          active={isActive('/veille')}
          collapsed={collapsed}
        />
        <NavItem
          href="/learning-space"
          onClick={goTo('/learning-space')}
          icon={<Layers size={18} />}
          label="Espace Apprentissage"
          active={isActive('/learning-space')}
          collapsed={collapsed}
        />
      </Sidebar>
      </div>

      {/* Main content area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* pb-16 reserves space for BottomNav; max-md:pt-14 clears the fixed
            mobile menu button (top-2 left-2, 52px bottom edge) so no page's
            top-of-content renders under it. Both mobile-only (md:hidden chrome). */}
        <main className="flex-1 min-w-0 [overflow-x:clip] max-md:pt-14 pb-16 md:pb-0">{children}</main>

        <footer className="px-6 py-4 text-caption text-ink-500 text-center">
          © {new Date().getFullYear()} The Learning Society. All rights reserved.
        </footer>
      </div>

      {/* BottomNav — primary mobile navigation (< md). Replaces hamburger for Tier 1 pages. */}
      <BottomNav />

      {/* FloatingNavButton — DEV shortcut pour accès rapide /components + /pages-index.
          À remplacer par un chatbot / agent / FAQ widget en prod ultérieurement. */}
      <FloatingNavButton
        tone="brand"
        ariaLabel="Raccourcis développeur"
        actions={[
          { label: 'Design System', icon: <Palette size={18} />,       onClick: () => navigate('/components'),  tone: 'primary' },
          { label: 'Pages Index',   icon: <BookOpenText size={18} />,  onClick: () => navigate('/pages-index'), tone: 'warm' },
        ]}
      />
      {import.meta.env.DEV && <DevPanel />}
    </div>
  );
};

/**
 * Main App Component with Routing
 */
function App() {
  const { loading, isAuthenticated } = useAuth();

  // Loading state
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[100dvh] bg-surface">
        <div className="text-center">
          <p className="text-body-lg mb-4">Loading...</p>
          <div className="w-10 h-10 border-2 border-ink-200 border-t-primary-500 rounded-full animate-spin mx-auto" />
        </div>
      </div>
    );
  }

  // Render routes
  return (
    <Router>
      <ToastProvider>
      <ScrollToTop />
      <Routes>
        {/* ── Marketing site (public — no auth required) ── */}
        <Route path="/website" element={<MarketingLayout />}>
          <Route index element={<MarketingHome />} />
          {/* A/B Testing — 7 variants (underscore prefix = hidden from main nav) */}
          <Route path="_v1-home" element={<MarketingHome />} />
          <Route path="_v2-home-clarity" element={<MarketingHomeClarity />} />
          <Route path="_v4-home-narrative" element={<MarketingHomeNarrative />} />
          <Route path="_v6-home-elegant" element={<MarketingHomeRefined />} />
          <Route path="_v7-home-cinematic" element={<MarketingHomeCinematic />} />
          <Route path="_taglines" element={<MarketingTaglineLab />} />
          {/* V2 cinematic direction prototypes — 3 options, comparison only, none chosen yet */}
          <Route path="_v2-cinematic-a" element={<HomeCinematicRevealV2 />} />
          <Route path="_v2-cinematic-b" element={<HomeInterfaceChoreographyV2 />} />
          <Route path="_v2-jardin" element={<HomeJardinVivantV2 />} />
          <Route path="_v2-chemin" element={<HomeCheminV2 />} />
          <Route path="_eclipse-trials" element={<EclipseHeroTrials />} />
          <Route path="_sticky-video-cards" element={<StickyVideoCards />} />
          <Route path="_sticky-video-cards-depth" element={<StickyVideoCardsDepth />} />
          <Route path="_immersive-parallax-story" element={<ImmersiveParallaxStory />} />
          <Route path="_hero-dawn-light" element={<HeroDawnLight />} />
          <Route path="_hero-constellation" element={<HeroConstellation />} />
          <Route path="_hero-eclipse" element={<HeroEclipse />} />
          <Route path="_hero-trait" element={<HeroTrait />} />
          <Route path="_hero-lever-du-jour" element={<HeroLeverDuJour />} />
          <Route path="_hero-celestial" element={<HeroCelestial />} />
          {/* [archived] home variants — files kept, routes removed: home-a/b, _motion-lab, _variants */}
          <Route path="diagnostic" element={<MarketingDiagnostic />} />
          {/* Formation fusionnée dans Learning App le 03/07/2026 — redirect pour les liens existants */}
          <Route path="formation" element={<Navigate to="/website/learning-app" replace />} />
          <Route path="accompagnement" element={<MarketingAccompagnement />} />
          <Route path="upskilling" element={<MarketingUpskilling />} />
          <Route path="learning-app" element={<MarketingLearningApp />} />
          {/* Magazine et Dossiers n'ont plus de hub dédié — un seul hub
              "Ressources" agrège tous les formats (Phase consolidation). */}
          <Route path="magazine" element={<Navigate to="/website/resources" replace />} />
          <Route path="magazine/:slug" element={<MarketingArticleDetail />} />
          <Route path="resources" element={<MarketingResources />} />
          {/* Merged into the single canonical article template (Phase Ressources fusion) */}
          <Route path="resources/:slug" element={<MarketingArticleDetail />} />
          <Route path="ressources" element={<MarketingResources />} />
          <Route path="dossiers" element={<Navigate to="/website/resources" replace />} />
          <Route path="dossiers/:slug" element={<MarketingDossierDetail />} />
          <Route path="videos/:slug" element={<MarketingVideoDetail />} />
          <Route path="guides/:slug" element={<MarketingGuideDetail />} />
          <Route path="webinaires/:slug" element={<MarketingWebinaireDetail />} />
          <Route path="equipe" element={<MarketingEquipe />} />
          <Route path="methode" element={<MarketingMethode />} />
          <Route path="temoignages" element={<MarketingTemoignages />} />
          <Route path="contact" element={<MarketingContact />} />
          <Route path="waitlist" element={<MarketingWaitlist />} />
          <Route path="mentions-legales" element={<MarketingMentionsLegales />} />
          <Route path="politique-confidentialite" element={<MarketingPolitiqueConfidentialite />} />
          <Route path="cgv-cgu" element={<MarketingCgvCgu />} />
          <Route path="charte-ia" element={<MarketingCharteIA />} />
          <Route path="*" element={<MarketingError404 />} />
        </Route>

        {/* ── Error pages — plein écran, hors AppLayout ── */}
        {/* Wrapper style 100vw nécessaire : hors AppLayout, le parent route est width:0 */}
        <Route path="/error/404" element={<div style={{ width: '100vw', minHeight: '100vh', overflow: 'hidden' }}><Error404 /></div>} />
        <Route path="/error/500" element={<div style={{ width: '100vw', minHeight: '100vh', overflow: 'hidden' }}><Error500 /></div>} />

        {/* ── Pages test temporaires ── */}
        <Route path="/_test-logo" element={<div style={{ width: '100vw', minHeight: '100vh', overflow: 'auto' }}><TestLogo /></div>} />
        <Route path="/website/_variants" element={<MarketingVariantLab />} />

        {/* ── Landing page inscription — public, plein écran ── */}
        <Route path="/inscription" element={<div style={{ width: '100vw', minHeight: '100vh', overflow: 'auto' }}><AppLanding /></div>} />

        {/* ── Auth pages — toujours plein écran, JAMAIS dans AppLayout ── */}
        {/* Même pattern que les error pages : wrapper 100vw pour éviter width:0 du parent route */}
        <Route path="/auth/login"          element={<div style={{ width: '100vw', minHeight: '100vh', overflow: 'hidden' }}><Login /></div>} />
        <Route path="/auth/signup"         element={<div style={{ width: '100vw', minHeight: '100vh', overflow: 'hidden' }}><Signup /></div>} />
        <Route path="/auth/forgot-password" element={<div style={{ width: '100vw', minHeight: '100vh', overflow: 'hidden' }}><ForgotPassword /></div>} />
        <Route path="/auth/reset-password" element={<div style={{ width: '100vw', minHeight: '100vh', overflow: 'hidden' }}><ResetPassword /></div>} />
        <Route path="/auth/verify-email"   element={<div style={{ width: '100vw', minHeight: '100vh', overflow: 'hidden' }}><VerifyEmail /></div>} />
        <Route path="/auth/magic-link"     element={<div style={{ width: '100vw', minHeight: '100vh', overflow: 'hidden' }}><MagicLink /></div>} />

        {/* ── Onboarding — plein écran, hors AppLayout ── */}
        {/* Flow focalisé sans sidebar : même pattern que auth pages. overflow:auto car contenu > 100vh */}
        <Route path="/onboarding"                  element={<div style={{ width: '100vw', minHeight: '100vh', overflow: 'auto' }}><OnboardingUnified /></div>} />
        <Route path="/onboarding/legacy"           element={<div style={{ width: '100vw', minHeight: '100vh', overflow: 'auto' }}><Onboarding /></div>} />
        <Route path="/onboarding/questionnaire"    element={<div style={{ width: '100vw', minHeight: '100vh', overflow: 'auto' }}><OnboardingQuestionnaire /></div>} />
        <Route path="/onboarding/payment"          element={<div style={{ width: '100vw', minHeight: '100vh', overflow: 'auto' }}><SubscriptionPayment /></div>} />
        <Route path="/onboarding/tutorial"         element={<div style={{ width: '100vw', minHeight: '100vh', overflow: 'auto' }}><OnboardingTutorial /></div>} />
        <Route path="/onboarding/success"          element={<div style={{ width: '100vw', minHeight: '100vh', overflow: 'auto' }}><OnboardingSuccess /></div>} />
        <Route path="/onboarding-preview"          element={<div style={{ width: '100vw', minHeight: '100vh', overflow: 'auto' }}><OnboardingPreview /></div>} />

        {isAuthenticated ? (
          // Authenticated routes
          <Route
            path="/*"
            element={
              <AppLayout>
                <Routes>
                  <Route path="/" element={<Dashboard />} />
                  <Route path="/dashboard" element={<Dashboard />} />
                  <Route path="/profile" element={<Profile />} />
                  <Route path="/settings" element={<Navigate to="/account" replace />} />
                  <Route path="/components" element={<Components />} />
                  <Route path="/motion-sprints" element={<MotionSprintShowcase />} />
                  <Route path="/design-showcase" element={<DesignShowcase />} />
                  <Route path="/learning-paths" element={<LearningPaths />} />
                  <Route path="/learning-paths/:id" element={<LearningPathDetail />} />
                  <Route path="/learning-paths/:id/positionnement" element={<Positionnement />} />
                  <Route path="/coaching" element={<Coaching />} />
                  <Route path="/collaboration" element={<Collaboration />} />
                  {/* /monitoring -> /veille (renamed) */}
                  <Route path="/monitoring" element={<Navigate to="/veille" replace />} />
                  <Route path="/pages-index" element={<PagesIndex />} />
                  <Route path="/notifications" element={<Notifications />} />
                  <Route path="/messages" element={<Messages />} />
                  <Route path="/leaderboard" element={<Leaderboard />} />
                  <Route path="/veille" element={<Veille />} />
                  <Route path="/veille/article/:id" element={<ArticleDetail />} />
                  <Route path="/veille/dossier/:id" element={<Dossier />} />
                  <Route path="/veille/video-tutorial/:id" element={<VideoTutorial />} />
                  <Route path="/veille/video-reels" element={<VideoReels />} />
                  <Route path="/veille/magazine" element={<Magazine />} />
                  <Route path="/veille/magazine-article/:id" element={<MagazineArticle />} />
                  <Route path="/veille/weekly-newsletter" element={<WeeklyNewsletter />} />
                  <Route path="/veille/weekly-news/:id" element={<WeeklyNewsDetail />} />
                  <Route path="/veille/newsletter" element={<Newsletter />} />
                  <Route path="/journal" element={<Journal />} />
                  <Route path="/journal/detail/:id" element={<JournalDetail />} />
                  <Route path="/journal/new-entry" element={<JournalNewEntry />} />
                  <Route path="/journal/free-entry" element={<JournalFreeEntry />} />
                  <Route path="/project/:id" element={<Project />} />
                  <Route path="/learning-space" element={<LearningSpace />} />
                  <Route path="/learning-flow" element={<LearningFlow />} />
                  {/* /onboarding routes → déplacées hors AppLayout (plein écran, voir ci-dessus) */}
                  <Route path="/coaching/booking" element={<CoachingBookingFlow />} />
                  <Route path="/coaching/pre-questionnaire" element={<PreCoachingQuestionnaire />} />
                  <Route path="/coaching/pre-questionnaire/response" element={<PreCoachingQuestionnaireResponse />} />
                  <Route path="/coaching/compte-rendu/:id" element={<CoachingCompteRendu />} />
                  <Route path="/account" element={<Account />} />
                  <Route path="/account/billing" element={<Billing />} />
                  {/* Phase 11 — MVP pages */}
                  <Route path="/passeport" element={<Passeport />} />
                  <Route path="/gamification" element={<Gamification />} />
                  <Route path="/coach/dashboard" element={<CoachDashboard />} />
                  <Route path="/manager/enterprise" element={<ManagerEnterprise />} />
                  <Route path="/manager/cohort" element={<ManagerCohort />} />
                  {/* Phase 12 — MVP P0 pages */}
                  <Route path="/passeport/competence/:id" element={<PasseportCompetenceDetail />} />
                  <Route path="/passeport/objectifs" element={<PasseportObjectifs />} />
                  <Route path="/coach/passeport" element={<CoachHeatmap />} />
                  <Route path="/coaching/session/:id" element={<CoachingSessionDetail />} />
                  <Route path="/coaching/corrections" element={<CoachingCorrections />} />
                  <Route path="/coach/corrections" element={<CoachCorrectionsQueue />} />
                  <Route path="/coach/correction/:id" element={<CoachCorrectionInterface />} />
                  <Route path="/coach/apprenants" element={<CoachApprenants />} />
                  <Route path="/gamification/badge/:id" element={<BadgeDetail />} />
                  <Route path="/profile/badges/competences" element={<ProfileBadgesCompetences />} />
                  <Route path="/manager/alerts" element={<ManagerAlerts />} />
                  <Route path="/manager/export" element={<ManagerExport />} />
                  <Route path="/dashboard/competence/:id" element={<DashboardCompetenceDetail />} />
                  <Route path="/coach/team-dashboard" element={<CoachTeamDashboard />} />
                  <Route path="/coach/apprenant/:id/analytics" element={<FicheApprenantAnalytics />} />
                  <Route path="/profile/privacy" element={<ProfilePrivacy />} />
                  <Route path="/enterprise/dashboard" element={<EnterpriseAnalyticsDashboard />} />
                  <Route path="/analytics/dashboard" element={<AnalyticsDashboard />} />
                  {/* Phase 13 — Remaining MVP P0 pages */}
                  <Route path="/passeport/roadmap" element={<PasseportRoadmap />} />
                  <Route path="/passeport/jac" element={<PasseportJac />} />
                  <Route path="/coach/analytics" element={<CoachAnalytics />} />
                  <Route path="/enterprise/kpis" element={<EnterpriseKpis />} />
                  <Route path="/profile/consent" element={<Navigate to="/profile/privacy" replace />} />
                  <Route path="/enterprise/alertes/inactivite" element={<AlerteInactivite />} />
                  <Route path="/coach/alertes/stagnation" element={<AlerteStagnation />} />
                  {/* Phase 14 — Ateliers + Masterclass + Événements */}
                  <Route path="/ateliers" element={<AtelierHub />} />
                  <Route path="/ateliers/:id" element={<AtelierDetail />} />
                  <Route path="/ateliers/:id/live" element={<AtelierLive />} />
                  <Route path="/ateliers/:id/presentiel" element={<AtelierPresentiel />} />
                  <Route path="/ateliers/:id/recap" element={<AtelierRecap />} />
                  <Route path="/ateliers/:id/waitlist" element={<AtelierWaitlist />} />
                  <Route path="/masterclass" element={<MasterclassHub />} />
                  <Route path="/masterclass/:id" element={<MasterclassDetail />} />
                  <Route path="/masterclass/:id/live" element={<MasterclassLive />} />
                  <Route path="/masterclass/:id/replay" element={<MasterclassReplay />} />
                  <Route path="/masterclass/:id/survey" element={<MasterclassSurvey />} />
                  <Route path="/evenements" element={<EvenementHub />} />
                  <Route path="/evenements/:id" element={<EvenementDetail />} />
                  <Route path="/evenements/:id/live" element={<EvenementLive />} />
                  <Route path="/evenements/:id/recap" element={<EvenementRecap />} />
                  {/* Phase 15 — Help + Coach + Project + Gamification + Dashboard */}
                  <Route path="/help/article/:id" element={<HelpArticle />} />
                  <Route path="/help/search" element={<HelpSearch />} />
                  <Route path="/help/tickets/:id" element={<HelpTicketDetail />} />
                  <Route path="/help/tickets/new" element={<HelpTicketNew />} />
                  <Route path="/help/tickets" element={<HelpTickets />} />
                  <Route path="/help/tutorials/:id/step/:stepId" element={<HelpTutorialStep />} />
                  <Route path="/help/tutorials" element={<HelpTutorials />} />
                  <Route path="/coach/journal" element={<CoachJournal />} />
                  <Route path="/coach/journal/:id" element={<CoachJournalDetail />} />
                  <Route path="/coach/apprenant/:id" element={<CoachLearnerProfile />} />
                  <Route path="/project/:id/jac" element={<ProjectJac />} />
                  <Route path="/project/:id/passeport" element={<ProjectPasseportFeed />} />
                  <Route path="/project/:id/skill-gaps" element={<ProjectSkillGaps />} />
                  <Route path="/project/:id/task/:taskId" element={<ProjectTask />} />
                  <Route path="/project/:id/team" element={<ProjectTeam />} />
                  <Route path="/gamification/badges" element={<BadgeGallery />} />
                  <Route path="/gamification/xp" element={<XPDashboard />} />
                  <Route path="/dashboard/achievements" element={<DashboardAchievements />} />
                  <Route path="/notifications/preferences" element={<NotificationPreferences />} />
                  {/* Phase 16 — Sitemap gap pages (P0 + P1 from FO_SCREENS_CONSOLIDATION) */}
                  <Route path="/veille/perplexity/:id" element={<PerplexityContentDetail />} />
                  <Route path="/coaching/correction/:id" element={<CorrectionDetailLearner />} />
                  <Route path="/coaching/messages/:coachId" element={<MessagingThread />} />
                  <Route path="/coach/calendar" element={<CoachCalendar />} />
                  <Route path="/api-docs" element={<ApiDocs />} />
                  <Route path="/projects" element={<ProjectsList />} />
                  <Route path="/coaching/recommendations" element={<ItemRecommendations />} />
                  <Route path="/passeport/historique" element={<PasseportHistorique />} />
                  <Route path="/account/billing/credits/buy" element={<PurchaseCredits />} />
                  <Route path="/profile/credits/buy" element={<Navigate to="/account/billing/credits/buy" replace />} />
                  <Route path="/gamification/streaks" element={<StreakDetail />} />
                  <Route path="/coach/engagement" element={<CoachEngagement />} />
                  <Route path="/coach/enterprise-dashboard" element={<CoachEnterpriseDashboard />} />
                  <Route path="/manager/views/builder" element={<ManagerViewsBuilder />} />
                  <Route path="/journal/search" element={<JournalSearch />} />
                  <Route path="/profile/privacy/dsar" element={<PrivacyDsar />} />
                  <Route path="/profile/privacy/delete-account" element={<PrivacyDeleteAccount />} />
                  <Route path="/help" element={<Help />} />
                  <Route path="/enterprise" element={<Enterprise />} />
                  <Route path="/course/:id" element={<CourseDetail />} />
                  <Route path="/learning-paths/:pathId/lessons/:lessonId" element={<LessonPlayer />} />
                  <Route path="/lesson/:id/astuces" element={<AstucesViewer />} />
                  <Route path="/lesson/:id/complementary" element={<ComplementaryContentViewer />} />
                  <Route path="/lesson/:id/flashcards" element={<FlashcardsViewer />} />
                  <Route path="/veille/video/:id" element={<VideoViewer />} />
                  <Route path="/assistant" element={<ChatInterface />} />
                  <Route path="/assistant/history" element={<ChatHistoryPanel />} />
                  <Route path="/profile/open-badges" element={<OpenBadgesSection />} />
                  <Route path="/profile/credits" element={<Navigate to="/account/billing" replace />} />
                  <Route path="/coaching/coach/:id" element={<CoachProfileView />} />
                  <Route path="/enterprise/webhooks" element={<WebhooksManagement />} />
                  <Route path="*" element={<Navigate to="/error/404" replace />} />
                </Routes>
              </AppLayout>
            }
          />
        ) : (
          // Non authentifié : toute autre route → login
          <Route path="*" element={<Navigate to="/auth/login" replace />} />
        )}
      </Routes>
      </ToastProvider>
    </Router>
  );
}

export default App;
