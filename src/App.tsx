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
import { BrowserRouter as Router, Routes, Route, useLocation, Navigate, useNavigate } from 'react-router-dom';
import { useAuth } from './hooks/useAuth';
import { useTheme } from './hooks/useTheme';
import { Sidebar, NavItem, SidebarUserCard } from './components/layout/Sidebar';
import { DropdownMenu, DropdownItem, DropdownSeparator } from './components/ui/DropdownMenu';
import { Avatar } from './components/ui/Avatar';
import {
  LayoutDashboard,
  Map as MapIcon,
  PenLine,
  Video,
  Sparkles as SparklesIcon,
  UserRound,
  Settings2,
  Bell,
  Target,
  BarChart3,
  LogOut,
  Menu,
  Moon,
  Sun,
} from 'lucide-react';
import {
  Dashboard,
  Profile,
  Settings,
  Components,
  LearningPaths,
  LearningPathDetail,
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
  VeilleContent,
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
import { PagesIndex } from './pages/PagesIndex';
import { FloatingNavButton } from './components/FloatingNavButton';
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
  const [isMobile, setIsMobile] = React.useState<boolean>(() =>
    typeof window !== 'undefined' && window.matchMedia('(max-width: 767px)').matches
  );
  const userMenuRef = React.useRef<HTMLDivElement>(null);

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
    <div className="flex min-h-screen bg-white">
      {/* Mobile hamburger (top-left, only visible < md) */}
      <button
        type="button"
        onClick={() => setIsMobileOpen(true)}
        aria-label="Ouvrir la navigation"
        className="md:hidden fixed top-3 left-3 z-30 inline-flex items-center justify-center w-10 h-10 rounded-full bg-white border border-ink-200 shadow-md text-ink-700 hover:bg-primary-50 transition-colors"
      >
        <Menu size={18} />
      </button>

      {/* Sidebar — wrapped in a sticky container so it pins on scroll (desktop only). */}
      <div className="sticky top-0 self-start h-screen z-30 max-md:static max-md:h-auto max-md:z-auto">
      <Sidebar
        className="h-full"
        collapsed={collapsed}
        onToggleCollapse={isMobile ? undefined : () => setIsSidebarCollapsed((p) => !p)}
        mobileOpen={isMobileOpen}
        onMobileClose={() => setIsMobileOpen(false)}
        userCard={
          user && (
            <div className="relative" ref={userMenuRef}>
              {/* Dropdown menu (anchored above the user card) */}
              {isUserMenuOpen && (
                <DropdownMenu
                  className={[
                    'absolute bottom-full mb-2 z-50 shadow-xl',
                    collapsed ? 'left-1/2 -translate-x-1/2 min-w-[240px]' : 'left-0 right-0',
                  ].join(' ')}
                >
                  <DropdownItem icon={<UserRound size={16} />} onClick={goTo('/profile')}>Mon Profil</DropdownItem>
                  <DropdownItem icon={<Settings2 size={16} />} onClick={goTo('/settings')}>Paramètres</DropdownItem>
                  <DropdownItem icon={<Bell size={16} />} onClick={goTo('/notifications')}>Notifications</DropdownItem>
                  <DropdownItem icon={<Target size={16} />} badge="demo" onClick={goTo('/onboarding')}>Positionnement</DropdownItem>
                  <DropdownItem icon={<BarChart3 size={16} />} badge="pro" onClick={goTo('/enterprise')}>Espace Entreprise</DropdownItem>
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

              <SidebarUserCard
                avatar={
                  <Avatar
                    initials={user.name?.charAt(0).toUpperCase()}
                    size="md"
                    tone="brand"
                  />
                }
                name={user.name || 'Utilisateur'}
                subtitle={user.email}
                menuOpen={isUserMenuOpen}
                onClick={() => setIsUserMenuOpen((p) => !p)}
                collapsed={collapsed}
              />
            </div>
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
      </Sidebar>
      </div>

      {/* Main content area */}
      <div className="flex-1 flex flex-col min-w-0">
        <main className="flex-1 min-w-0 overflow-x-hidden">{children}</main>

        <footer className="px-6 py-4 text-caption text-ink-500 border-t border-ink-200/70 text-center">
          © {new Date().getFullYear()} The Learning Society. All rights reserved.
        </footer>
      </div>

      {/* Floating Navigation Button */}
      <FloatingNavButton />
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
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
          backgroundColor: 'var(--bg)',
        }}
      >
        <div style={{ textAlign: 'center' }}>
          <p style={{ fontSize: '1.25rem', marginBottom: '1rem' }}>Loading...</p>
          <div
            style={{
              width: '40px',
              height: '40px',
              border: '3px solid var(--border)',
              borderTop: '3px solid var(--tls-primary-500)',
              borderRadius: '50%',
              animation: 'spin 1s linear infinite',
            }}
          />
          <style>{`
            @keyframes spin {
              to { transform: rotate(360deg); }
            }
          `}</style>
        </div>
      </div>
    );
  }

  // Render routes
  return (
    <Router>
      <Routes>
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
                  <Route path="/settings" element={<Settings />} />
                  <Route path="/components" element={<Components />} />
                  <Route path="/learning-paths" element={<LearningPaths />} />
                  <Route path="/learning-paths/:id" element={<LearningPathDetail />} />
                  <Route path="/coaching" element={<Coaching />} />
                  <Route path="/collaboration" element={<Collaboration />} />
                  {/* /monitoring -> /veille (renamed) */}
                  <Route path="/monitoring" element={<Navigate to="/veille" replace />} />
                  <Route path="/pages-index" element={<PagesIndex />} />
                  <Route path="/notifications" element={<Notifications />} />
                  <Route path="/messages" element={<Messages />} />
                  <Route path="/leaderboard" element={<Leaderboard />} />
                  <Route path="/veille" element={<Veille />} />
                  <Route path="/veille/content" element={<VeilleContent />} />
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
                  <Route path="/onboarding" element={<Onboarding />} />
                  <Route path="/coaching/booking" element={<CoachingBookingFlow />} />
                  <Route path="/coaching/pre-questionnaire" element={<PreCoachingQuestionnaire />} />
                  <Route path="/coaching/pre-questionnaire/response" element={<PreCoachingQuestionnaireResponse />} />
                  <Route path="/coaching/compte-rendu/:id" element={<CoachingCompteRendu />} />
                  <Route path="/account" element={<Account />} />
                  <Route path="/auth/login" element={<Login />} />
                  <Route path="/auth/signup" element={<Signup />} />
                  <Route path="/auth/forgot-password" element={<ForgotPassword />} />
                  <Route path="/auth/reset-password" element={<ResetPassword />} />
                  <Route path="/error/404" element={<Error404 />} />
                  <Route path="/error/500" element={<Error500 />} />
                  <Route path="/help" element={<Help />} />
                  <Route path="/enterprise" element={<Enterprise />} />
                  <Route path="/course/:id" element={<CourseDetail />} />
                  <Route path="/learning-paths/:pathId/lessons/:lessonId" element={<LessonPlayer />} />
                  <Route path="/lesson/:id/astuces" element={<AstucesViewer />} />
                  <Route path="/lesson/:id/complementary" element={<ComplementaryContentViewer />} />
                  <Route path="/lesson/:id/flashcards" element={<FlashcardsViewer />} />
                  <Route path="/veille/video/:id" element={<VideoViewer />} />
                  <Route path="*" element={<Error404 />} />
                </Routes>
              </AppLayout>
            }
          />
        ) : (
          <>
            <Route path="/auth/login" element={<Login />} />
            <Route path="/auth/signup" element={<Signup />} />
            <Route path="/auth/forgot-password" element={<ForgotPassword />} />
            <Route path="/auth/reset-password" element={<ResetPassword />} />
            <Route path="*" element={<Navigate to="/auth/login" replace />} />
          </>
        )}
      </Routes>
    </Router>
  );
}

export default App;
