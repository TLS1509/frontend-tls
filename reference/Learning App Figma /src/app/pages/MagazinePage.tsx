import { useState } from 'react';
import { motion } from 'motion/react';
import {
  ArrowLeft,
  BookOpen,
  Bookmark,
  BookmarkCheck,
  Download,
  FileText,
  Calendar,
  ChevronRight,
} from 'lucide-react';
import { BackgroundBlobs } from '../components/ui/background-blobs';
import OptimizedSidebar from '../components/ui/optimized-sidebar';
import { useToast, ToastContainer } from '../components/ui/notification-toast';
import { getMagazine } from '../data/veilleMagData';
import MagazineArticlePage from './MagazineArticlePage';

interface MagazinePageProps {
  magazineId?: number;
  onNavigate: (page: string) => void;
  onBack: () => void;
  onLogout: () => void;
}

export default function MagazinePage({
  magazineId = 1,
  onNavigate,
  onBack,
  onLogout,
}: MagazinePageProps) {
  const magazine = getMagazine(magazineId);
  const [isSaved, setIsSaved] = useState(false);
  const [selectedArticleId, setSelectedArticleId] = useState<number | null>(null);
  const toast = useToast();

  if (!magazine) {
    return (
      <div className="flex h-screen overflow-hidden" style={{ background: 'var(--background)' }}>
        <BackgroundBlobs />
        <OptimizedSidebar currentPage="veille" onNavigate={onNavigate} onLogout={onLogout} />
        <div className="flex-1 flex flex-col min-w-0">
          <main className="flex-1 overflow-y-auto flex items-center justify-center">
            <div className="text-center">
              <div
                className="w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center"
                style={{ background: 'rgba(85, 161, 180, 0.1)' }}
              >
                <BookOpen className="w-8 h-8" style={{ color: 'var(--primary)' }} />
              </div>
              <p
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 'var(--text-xl)',
                  fontWeight: 'var(--font-weight-bold)',
                  color: 'var(--foreground)',
                }}
              >
                Magazine non trouvé
              </p>
            </div>
          </main>
        </div>
      </div>
    );
  }

  const handleSave = () => {
    setIsSaved(!isSaved);
    toast.showToast({
      id: `save-${Date.now()}`,
      title: isSaved ? 'Retiré des favoris' : 'Magazine sauvegardé',
      message: isSaved ? 'Le magazine a été retiré de vos favoris' : 'Retrouvez ce magazine dans vos favoris',
      type: 'success',
      duration: 2000,
    });
  };

  const handleDownload = () => {
    toast.showToast({
      id: `download-${Date.now()}`,
      title: 'Téléchargement démarré',
      message: 'Le magazine PDF est en cours de téléchargement',
      type: 'success',
      duration: 2000,
    });
  };

  const handleArticleClick = (articleId: number) => {
    setSelectedArticleId(articleId);
  };

  const handleBackFromArticle = () => {
    setSelectedArticleId(null);
  };

  // If article is selected, show article page
  if (selectedArticleId !== null) {
    return (
      <MagazineArticlePage
        magazineId={magazineId}
        articleId={selectedArticleId}
        onNavigate={onNavigate}
        onBack={handleBackFromArticle}
        onLogout={onLogout}
      />
    );
  }

  return (
    <div className="flex h-screen overflow-hidden" style={{ background: 'var(--background)' }}>
      {/* Background Effects */}
      <BackgroundBlobs />

      {/* Sidebar */}
      <OptimizedSidebar currentPage="veille" onNavigate={onNavigate} onLogout={onLogout} />

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        <main className="flex-1 overflow-y-auto">
          <div style={{ minHeight: '100%', background: 'var(--background)' }}>
            {/* Sticky Header */}
            <div
              className="sticky top-0 z-20 border-b"
              style={{
                background: 'rgba(255, 255, 255, 0.85)',
                backdropFilter: 'blur(20px)',
                WebkitBackdropFilter: 'blur(20px)',
                borderColor: 'var(--border)',
              }}
            >
              <div className="max-w-7xl mx-auto px-4 md:px-6 py-4">
                <div className="flex items-center justify-between">
                  {/* Back Button */}
                  <motion.button
                    onClick={onBack}
                    className="flex items-center gap-2 px-4 py-2 rounded-xl transition-colors duration-200"
                    style={{
                      background: 'rgba(85, 161, 180, 0.1)',
                      color: 'var(--primary)',
                      fontFamily: 'var(--font-body)',
                      fontSize: 'var(--text-sm)',
                      fontWeight: 'var(--font-weight-medium)',
                    }}
                    whileHover={{ scale: 1.02, background: 'rgba(85, 161, 180, 0.15)' }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <ArrowLeft className="w-4 h-4" />
                    <span>Retour à la veille</span>
                  </motion.button>

                  {/* Save Button */}
                  <motion.button
                    onClick={handleSave}
                    className="p-2.5 rounded-xl"
                    style={{
                      background: isSaved ? 'rgba(85, 161, 180, 0.15)' : 'rgba(85, 161, 180, 0.08)',
                      color: isSaved ? 'var(--primary)' : 'var(--muted-foreground)',
                    }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {isSaved ? <BookmarkCheck className="w-5 h-5" /> : <Bookmark className="w-5 h-5" />}
                  </motion.button>
                </div>
              </div>
            </div>

            {/* Hero Section - Magazine Cover */}
            <div className="relative">
              <motion.div
                className="relative overflow-hidden"
                style={{
                  height: 'clamp(400px, 60vh, 600px)',
                }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6 }}
              >
                {/* Background Image */}
                <div
                  className="absolute inset-0"
                  style={{
                    backgroundImage: `url('https://images.unsplash.com/photo-1763991345257-a1f4313be3dc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBkaWdpdGFsJTIwbGVhcm5pbmclMjB3b3Jrc3BhY2UlMjBsYXB0b3B8ZW58MXx8fHwxNzcxNzU1NjU0fDA&ixlib=rb-4.1.0&q=80&w=1080')`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                  }}
                />

                {/* Dark Overlay for readability */}
                <div
                  className="absolute inset-0"
                  style={{
                    background: 'linear-gradient(to bottom, rgba(0, 0, 0, 0.5) 0%, rgba(0, 0, 0, 0.7) 100%)',
                  }}
                />

                {/* Content Overlay */}
                <div className="absolute inset-0 flex flex-col justify-center items-center text-center px-6">


                  {/* Main Title */}
                  <motion.h1
                    className="mb-4"
                    style={{
                      fontFamily: 'var(--font-display)',
                      fontSize: 'clamp(2rem, 6vw, 4rem)',
                      fontWeight: 'var(--font-weight-black)',
                      lineHeight: '1.1',
                      color: 'white',
                      maxWidth: '900px',
                      textShadow: '0 4px 20px rgba(0, 0, 0, 0.5)',
                    }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                  >
                    {magazine.title}
                  </motion.h1>

                  {/* Subtitle */}
                  <motion.p
                    className="mb-8"
                    style={{
                      fontFamily: 'var(--font-body)',
                      fontSize: 'var(--text-xl)',
                      fontWeight: 'var(--font-weight-medium)',
                      color: 'rgba(255, 255, 255, 0.95)',
                      maxWidth: '700px',
                      lineHeight: 'var(--leading-relaxed)',
                    }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                  >
                    {magazine.description}
                  </motion.p>

                  {/* Meta Info Bar */}
                  <motion.div
                    className="flex items-center gap-6 flex-wrap justify-center"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                  >
                    {/* Published Date - DYNAMIC */}
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4" style={{ color: 'rgba(255, 255, 255, 0.8)' }} />
                      <span
                        style={{
                          fontFamily: 'var(--font-body)',
                          fontSize: 'var(--text-sm)',
                          color: 'rgba(255, 255, 255, 0.9)',
                        }}
                      >
                        Publié le {new Date().toLocaleDateString('fr-FR', { 
                          day: 'numeric', 
                          month: 'long', 
                          year: 'numeric' 
                        })}
                      </span>
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            </div>

            {/* Content Sections - Two Column Layout: Synthèse Executive (left, narrower fixed) + Sommaire Articles (right, wider with scroll) */}
            <div className="max-w-7xl mx-auto px-4 md:px-6 py-12">
              <div className="flex flex-col lg:flex-row gap-8 mb-12">
                {/* Synthèse Executive - LEFT SIDE (NARROWER FIXED) */}
                <motion.div
                  className="lg:w-[380px] lg:order-1"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3, duration: 0.5 }}
                >
                  <div
                    className="rounded-3xl p-8 border sticky top-6"
                    style={{
                      background: 'rgba(255, 255, 255, 0.6)',
                      backdropFilter: 'blur(20px)',
                      WebkitBackdropFilter: 'blur(20px)',
                      borderColor: 'var(--border)',
                      boxShadow: 'var(--shadow-lg)',
                    }}
                  >
                    {/* Icon & Title */}
                    <div className="flex items-start gap-4 mb-6">
                      <div
                        className="w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0"
                        style={{
                          background: 'linear-gradient(135deg, var(--primary), var(--primary-hover))',
                        }}
                      >
                        <FileText className="w-6 h-6" style={{ color: 'white' }} />
                      </div>
                      <div>
                        <h2
                          style={{
                            fontFamily: 'var(--font-display)',
                            fontSize: 'var(--text-2xl)',
                            fontWeight: 'var(--font-weight-bold)',
                            lineHeight: '1.1',
                            color: 'var(--foreground)',
                            marginBottom: 'var(--space-2)',
                          }}
                        >
                          Synthèse Exécutive
                        </h2>
                        <p
                          style={{
                            fontFamily: 'var(--font-body)',
                            fontSize: 'var(--text-sm)',
                            color: 'var(--muted-foreground)',
                          }}
                        >
                          L'essentiel en quelques points
                        </p>
                      </div>
                    </div>

                    {/* Executive Summary Content */}
                    <p
                      style={{
                        fontFamily: 'var(--font-body)',
                        fontSize: 'var(--text-base)',
                        lineHeight: 'var(--leading-relaxed)',
                        color: 'var(--foreground)',
                        fontWeight: 'var(--font-weight-medium)',
                      }}
                    >
                      {magazine.executiveSummary}
                    </p>
                  </div>
                </motion.div>

                {/* Sommaire Articles - RIGHT SIDE (WIDER with SCROLL) */}
                <motion.div
                  className="flex-1 lg:order-2"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4, duration: 0.5 }}
                >
                  <div
                    className="rounded-3xl p-8 border sticky top-6"
                    style={{
                      background: 'rgba(255, 255, 255, 0.6)',
                      backdropFilter: 'blur(20px)',
                      WebkitBackdropFilter: 'blur(20px)',
                      borderColor: 'var(--border)',
                      boxShadow: 'var(--shadow-lg)',
                      maxHeight: 'calc(100vh - 120px)',
                      overflowY: 'auto',
                    }}
                  >
                    {/* Icon & Title */}
                    <div className="flex items-start gap-4 mb-6">
                      <div
                        className="w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0"
                        style={{
                          background: 'linear-gradient(135deg, var(--secondary), var(--secondary-hover))',
                        }}
                      >
                        <BookOpen className="w-6 h-6" style={{ color: 'white' }} />
                      </div>
                      <div>
                        <h2
                          style={{
                            fontFamily: 'var(--font-display)',
                            fontSize: 'var(--text-2xl)',
                            fontWeight: 'var(--font-weight-bold)',
                            lineHeight: '1.1',
                            color: 'var(--foreground)',
                            marginBottom: 'var(--space-2)',
                          }}
                        >
                          Sommaire du magazine
                        </h2>
                        <p
                          style={{
                            fontFamily: 'var(--font-body)',
                            fontSize: 'var(--text-sm)',
                            color: 'var(--muted-foreground)',
                          }}
                        >
                          {magazine.articles.length} articles • {magazine.issue}
                        </p>
                      </div>
                    </div>

                    {/* Articles List */}
                    <div className="space-y-4">
                      {magazine.articles.map((article, idx) => (
                        <motion.div
                          key={article.id}
                          className="flex items-start gap-3 p-3 rounded-xl transition-all duration-200 hover:translate-x-1 cursor-pointer group"
                          style={{
                            background: getCategoryColor(article.category).bg,
                            border: `1px solid ${getCategoryColor(article.category).border}`,
                          }}
                          onClick={() => handleArticleClick(article.id)}
                          whileHover={{ scale: 1.01 }}
                          whileTap={{ scale: 0.99 }}
                        >
                          <span
                            className="flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center"
                            style={{
                              background: getCategoryColor(article.category).color,
                              fontFamily: 'var(--font-display)',
                              fontSize: 'var(--text-xs)',
                              fontWeight: 'var(--font-weight-bold)',
                              color: 'white',
                            }}
                          >
                            {String(idx + 1).padStart(2, '0')}
                          </span>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-start justify-between gap-2 mb-1">
                              <h4
                                className="group-hover:text-primary transition-colors duration-200"
                                style={{
                                  fontFamily: 'var(--font-display)',
                                  fontSize: 'var(--text-base)',
                                  fontWeight: 'var(--font-weight-bold)',
                                  lineHeight: '1.2',
                                  color: 'var(--foreground)',
                                }}
                              >
                                {article.title}
                              </h4>
                              <ChevronRight
                                className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex-shrink-0"
                                style={{ color: 'var(--primary)' }}
                              />
                            </div>
                            <p
                              style={{
                                fontFamily: 'var(--font-body)',
                                fontSize: 'var(--text-sm)',
                                color: 'var(--muted-foreground)',
                                display: '-webkit-box',
                                WebkitLineClamp: 2,
                                WebkitBoxOrient: 'vertical',
                                overflow: 'hidden',
                              }}
                            >
                              {article.excerpt}
                            </p>
                            <div className="flex items-center gap-2 mt-2">
                              <span
                                style={{
                                  fontFamily: 'var(--font-body)',
                                  fontSize: 'var(--text-xs)',
                                  color: 'var(--muted-foreground)',
                                }}
                              >
                                {article.readTime}
                              </span>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </motion.div>


              </div>
            </div>
          </div>
        </main>
      </div>

      {/* Toast Container */}
      <ToastContainer toasts={toast.toasts} onClose={toast.closeToast} />
    </div>
  );
}

// Helper function for category colors
function getCategoryColor(category: string) {
  const colors: Record<string, { bg: string; color: string; border: string }> = {
    Technologie: {
      bg: 'rgba(85, 161, 180, 0.08)',
      color: 'var(--primary)',
      border: 'rgba(85, 161, 180, 0.15)',
    },
    Pédagogie: {
      bg: 'rgba(248, 176, 68, 0.08)',
      color: 'var(--accent)',
      border: 'rgba(248, 176, 68, 0.15)',
    },
    Métier: {
      bg: 'rgba(237, 132, 58, 0.08)',
      color: 'var(--secondary)',
      border: 'rgba(237, 132, 58, 0.15)',
    },
  };
  return colors[category] || colors['Technologie'];
}
