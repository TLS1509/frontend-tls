import { useState, useEffect } from 'react';
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { ThemeProvider } from "./contexts/ThemeContext";
import { ErrorBoundary } from "./components/ui/error-boundary";
import { CookieConsent } from "./components/CookieConsent";
import { AnalyticsDashboard } from "./components/AnalyticsDashboard";
import { useAnalytics } from "./hooks/useAnalytics";
import HomePage from "./pages/HomePage";
import HomePageV2 from "./pages/HomePageV2";
import AcademiePage from "./pages/AcademiePage";
import AgencePage from "./pages/AgencePage";
import ConseilPage from "./pages/ConseilPage";
import TechPage from "./pages/TechPage";
import MagPage from "./pages/MagPage";
import TemplatesGalleryPage from "./pages/TemplatesGalleryPage";
import ArticleStandardPage from "./pages/articles/ArticleStandardPage";
import ArticleSidebarPage from "./pages/articles/ArticleSidebarPage";
import ArticleVideoPage from "./pages/articles/ArticleVideoPage";
import ArticlePDFPage from "./pages/articles/ArticlePDFPage";
import ArticleNewsletterPage from "./pages/articles/ArticleNewsletterPage";
import ArticleInterviewPage from "./pages/articles/ArticleInterviewPage";
import ArticleChecklistPage from "./pages/articles/ArticleChecklistPage";

export default function App() {
  const [currentPage, setCurrentPage] = useState<string>('home');

  // Initialize Google Analytics (remplacer par votre ID)
  const analytics = useAnalytics('G-XXXXXXXXXX'); // TODO: Remplacer par votre vrai ID GA4

  // Scroll to top when page changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    
    // Track page change
    analytics.trackNavigation(currentPage, currentPage);
  }, [currentPage, analytics]);

  const handleCookieAccept = () => {
    console.log('✅ Cookies acceptés - Analytics activé');
    // GA4 est déjà initialisé, pas besoin d'action supplémentaire
  };

  const handleCookieDecline = () => {
    console.log('❌ Cookies refusés - Analytics désactivé');
    // Bloquer GA4 si nécessaire
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'home-v2':
        return <HomePageV2 onNavigate={setCurrentPage} />;
      case 'academie':
        return <AcademiePage />;
      case 'agence':
        return <AgencePage />;
      case 'conseil':
        return <ConseilPage />;
      case 'tech':
        return <TechPage />;
      case 'mag':
        return <MagPage onNavigate={setCurrentPage} />;
      case 'templates':
        return <TemplatesGalleryPage onNavigate={setCurrentPage} />;
      case 'article-standard':
        return <ArticleStandardPage />;
      case 'article-sidebar':
        return <ArticleSidebarPage />;
      case 'article-video':
        return <ArticleVideoPage />;
      case 'article-pdf':
        return <ArticlePDFPage />;
      case 'article-newsletter':
        return <ArticleNewsletterPage />;
      case 'article-interview':
        return <ArticleInterviewPage />;
      case 'article-checklist':
        return <ArticleChecklistPage />;
      default:
        return <HomePage onNavigate={setCurrentPage} />;
    }
  };

  return (
    <ThemeProvider>
      <ErrorBoundary>
        <div className="size-full">
          <Header currentPage={currentPage} onNavigate={setCurrentPage} />
          <main>
            {renderPage()}
          </main>
          <Footer onNavigate={setCurrentPage} />
        </div>
      </ErrorBoundary>
      <CookieConsent onAccept={handleCookieAccept} onDecline={handleCookieDecline} />
      <AnalyticsDashboard />
    </ThemeProvider>
  );
}