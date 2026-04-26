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
import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { useAuth } from './hooks/useAuth';
import { Sidebar, SidebarGroup, NavItem } from './components/layout/Sidebar';
import {
  LayoutDashboard,
  GraduationCap,
  Handshake,
  Trophy,
  Search,
  BookOpenText,
  MessagesSquare,
  UserRound,
  Settings2,
  LogOut,
  PanelLeftClose,
  PanelLeftOpen,
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
} from './pages';
import { PagesIndex } from './pages/PagesIndex';
import { FloatingNavButton } from './components/FloatingNavButton';
import './styles/app-layout.css';
import './styles/tls-components.css';
import './styles/design-tokens.css';

/**
 * AppLayout - Main layout wrapper with navigation and sidebar (design system)
 */
const AppLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, logout } = useAuth();
  const location = useLocation();
  const [isSidebarCollapsed, setIsSidebarCollapsed] = React.useState(true);

  // Determine active nav item
  const isActive = (path: string) => location.pathname === path || location.pathname === path + '/';

  return (
    <div className="app-shell">
      {/* Sidebar Navigation */}
      <div
        className={`app-shell__sidebar-wrapper app-shell__sidebar-wrapper--open ${
          isSidebarCollapsed
            ? 'app-shell__sidebar-wrapper--collapsed'
            : 'app-shell__sidebar-wrapper--expanded'
        }`}
      >
        <Sidebar
          brand={
            <div className="app-shell__sidebar-brand-row">
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                <span style={{ fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--tls-primary-600)' }}>TLS</span>
                <span style={{ fontSize: '0.875rem', fontWeight: 700 }}>The Learning Society</span>
              </div>
              <button
                type="button"
                className="app-shell__sidebar-toggle"
                onClick={() => setIsSidebarCollapsed((prev) => !prev)}
                title={isSidebarCollapsed ? 'Étendre la sidebar' : 'Réduire la sidebar'}
                aria-label={isSidebarCollapsed ? 'Étendre la sidebar' : 'Réduire la sidebar'}
              >
                {isSidebarCollapsed ? <PanelLeftOpen size={16} /> : <PanelLeftClose size={16} />}
              </button>
            </div>
          }
          user={
            user && (
              <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--s-3, 1rem)' }}>
                <div
                  style={{
                    width: '40px',
                    height: '40px',
                    borderRadius: '50%',
                    backgroundColor: 'var(--tls-primary-100)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '0.875rem',
                    fontWeight: 700,
                    color: 'var(--tls-primary-700)',
                    flexShrink: 0,
                  }}
                >
                  {user.name?.charAt(0).toUpperCase()}
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: 'var(--t-body-sm)', fontWeight: 600, color: 'var(--text)' }}>{user.name}</div>
                  <a
                    href="/profile"
                    style={{
                      fontSize: '11px',
                      color: 'var(--text-soft)',
                      textDecoration: 'none',
                      cursor: 'pointer',
                    }}
                  >
                    Voir le profil
                  </a>
                </div>
              </div>
            )
          }
        >
          {/* Learning Section */}
          <SidebarGroup label="Parcours">
            <NavItem
              href="/"
              icon={<LayoutDashboard size={18} />}
              label="Tableau de bord"
              title="Tableau de bord"
              active={isActive('/')}
            />
            <NavItem
              href="/learning-paths"
              icon={<GraduationCap size={18} />}
              label="Mon parcours"
              count="3"
              title="Mon parcours"
              active={isActive('/learning-paths')}
            />
            <NavItem
              href="/coaching"
              icon={<Handshake size={18} />}
              label="Sessions coaching"
              title="Sessions coaching"
              active={isActive('/coaching')}
            />
            <NavItem
              href="/components"
              icon={<Trophy size={18} />}
              label="Réussites"
              count="2"
              title="Réussites"
              active={isActive('/components')}
            />
          </SidebarGroup>

          {/* Explore Section */}
          <SidebarGroup label="Explorer">
            <NavItem
              href="/veille"
              icon={<Search size={18} />}
              label="Veille"
              title="Veille"
              active={isActive('/veille')}
            />
            <NavItem
              href="/journal"
              icon={<BookOpenText size={18} />}
              label="Journal"
              title="Journal"
              active={isActive('/journal')}
            />
            <NavItem
              href="/collaboration"
              icon={<MessagesSquare size={18} />}
              label="Communauté"
              count="12"
              title="Communauté"
              active={isActive('/collaboration')}
            />
          </SidebarGroup>

          {/* Settings Section */}
          <SidebarGroup label="Compte">
            <NavItem
              href="/profile"
              icon={<UserRound size={18} />}
              label="Profil"
              title="Profil"
              active={isActive('/profile')}
            />
            <NavItem
              href="/settings"
              icon={<Settings2 size={18} />}
              label="Paramètres"
              title="Paramètres"
              active={isActive('/settings')}
            />
            <NavItem
              onClick={() => {
                logout();
                window.location.href = 'http://localhost:8888/app/wp-login.php';
              }}
              icon={<LogOut size={18} />}
              label="Déconnexion"
              title="Déconnexion"
              href="#"
            />
          </SidebarGroup>
        </Sidebar>
      </div>

      {/* Main Content Area */}
      <div className="app-shell__content">
        {/* Page Content */}
        <main className="app-shell__main">{children}</main>

        {/* Footer */}
        <footer className="app-shell__footer">
          © 2024 The Learning Society. All rights reserved.
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
          backgroundColor: '#f5f5f5',
        }}
      >
        <div style={{ textAlign: 'center' }}>
          <p style={{ fontSize: '1.25rem', marginBottom: '1rem' }}>Loading...</p>
          <div
            style={{
              width: '40px',
              height: '40px',
              border: '3px solid #e0e0e0',
              borderTop: '3px solid #55A1B4',
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
