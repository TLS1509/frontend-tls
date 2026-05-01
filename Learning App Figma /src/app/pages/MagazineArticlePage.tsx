import { motion } from 'motion/react';
import {
  ArrowLeft,
  Clock,
  User,
  Bookmark,
  BookmarkCheck,
  Share2,
  ChevronRight,
} from 'lucide-react';
import { useState } from 'react';
import { BackgroundBlobs } from '../components/ui/background-blobs';
import OptimizedSidebar from '../components/ui/optimized-sidebar';
import { useToast, ToastContainer } from '../components/ui/notification-toast';
import { getMagazine, type MagArticle } from '../data/veilleMagData';

interface MagazineArticlePageProps {
  magazineId: number;
  articleId: number;
  onNavigate: (page: string) => void;
  onBack: () => void;
  onLogout: () => void;
}

export default function MagazineArticlePage({
  magazineId,
  articleId,
  onNavigate,
  onBack,
  onLogout,
}: MagazineArticlePageProps) {
  const magazine = getMagazine(magazineId);
  const article = magazine?.articles.find((a) => a.id === articleId);
  const [isSaved, setIsSaved] = useState(false);
  const toast = useToast();

  if (!magazine || !article) {
    return (
      <div className="flex h-screen overflow-hidden" style={{ background: 'var(--background)' }}>
        <BackgroundBlobs />
        <OptimizedSidebar currentPage="veille" onNavigate={onNavigate} onLogout={onLogout} />
        <div className="flex-1 flex flex-col min-w-0">
          <main className="flex-1 overflow-y-auto flex items-center justify-center">
            <div className="text-center">
              <p style={{ color: 'var(--muted-foreground)', fontSize: 'var(--text-lg)' }}>
                Article non trouvé
              </p>
            </div>
          </main>
        </div>
      </div>
    );
  }

  const handleSave = () => {
    setIsSaved(!isSaved);
    toast.addToast({
      type: 'success',
      title: isSaved ? 'Article retiré des favoris' : 'Article ajouté aux favoris',
      description: isSaved
        ? 'L\'article a été retiré de votre bibliothèque'
        : 'Retrouvez-le dans votre bibliothèque',
      duration: 2000,
    });
  };

  const handleShare = () => {
    toast.addToast({
      type: 'success',
      title: 'Lien copié',
      description: 'Le lien de l\'article a été copié dans le presse-papier',
      duration: 2000,
    });
  };

  return (
    <div className="flex h-screen overflow-hidden" style={{ background: 'var(--background)' }}>
      <BackgroundBlobs />

      {/* TLS Overlay */}
      <div
        className="fixed inset-0 pointer-events-none"
        style={{
          background: 'var(--gradient-tls-subtle)',
          zIndex: 1,
        }}
      />

      <OptimizedSidebar currentPage="veille" onNavigate={onNavigate} onLogout={onLogout} />

      <div className="flex-1 flex flex-col min-w-0 relative" style={{ zIndex: 2 }}>
        {/* Header */}
        <header
          className="border-b px-8 py-6"
          style={{
            background: 'var(--glass-white)',
            backdropFilter: 'blur(20px)',
            borderColor: 'var(--border)',
          }}
        >
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center justify-between">
              <button
                onClick={onBack}
                className="flex items-center gap-2 px-4 py-2 rounded-xl transition-all hover:scale-105"
                style={{
                  background: 'var(--glass-white-light)',
                  border: '1px solid var(--glass-border)',
                  color: 'var(--foreground)',
                }}
              >
                <ArrowLeft className="w-4 h-4" />
                <span style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--text-sm)' }}>
                  Retour au magazine
                </span>
              </button>

              <div className="flex items-center gap-3">
                <button
                  onClick={handleSave}
                  className="p-2.5 rounded-xl transition-all hover:scale-105"
                  style={{
                    background: isSaved ? 'var(--primary)' : 'var(--glass-white-light)',
                    border: '1px solid var(--glass-border)',
                    color: isSaved ? 'white' : 'var(--foreground)',
                  }}
                  title={isSaved ? 'Retirer des favoris' : 'Ajouter aux favoris'}
                >
                  {isSaved ? (
                    <BookmarkCheck className="w-5 h-5" />
                  ) : (
                    <Bookmark className="w-5 h-5" />
                  )}
                </button>

                <button
                  onClick={handleShare}
                  className="p-2.5 rounded-xl transition-all hover:scale-105"
                  style={{
                    background: 'var(--glass-white-light)',
                    border: '1px solid var(--glass-border)',
                    color: 'var(--foreground)',
                  }}
                  title="Partager"
                >
                  <Share2 className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto">
          <div className="max-w-4xl mx-auto px-8 py-12">
            {/* Article Header */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mb-12"
            >
              {/* Category Badge */}
              <div
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6"
                style={{
                  background: 'var(--glass-primary)',
                  border: '1px solid var(--primary-light)',
                }}
              >
                <span
                  style={{
                    color: 'var(--primary)',
                    fontFamily: 'var(--font-body)',
                    fontSize: 'var(--text-xs)',
                    fontWeight: 'var(--font-weight-semibold)',
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em',
                  }}
                >
                  {article.category}
                </span>
              </div>

              {/* Title */}
              <h1
                className="mb-6"
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 'var(--text-4xl)',
                  fontWeight: 'var(--font-weight-bold)',
                  lineHeight: '1.2',
                  background: 'var(--gradient-tls)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                {article.title}
              </h1>

              {/* Meta Info */}
              <div className="flex items-center gap-6 mb-6">
                <div className="flex items-center gap-3">
                  {article.authorAvatar && (
                    <img
                      src={article.authorAvatar}
                      alt={article.author}
                      className="rounded-full"
                      style={{ width: '40px', height: '40px', objectFit: 'cover' }}
                    />
                  )}
                  <div>
                    <p
                      style={{
                        fontFamily: 'var(--font-body)',
                        fontSize: 'var(--text-sm)',
                        fontWeight: 'var(--font-weight-semibold)',
                        color: 'var(--foreground)',
                      }}
                    >
                      {article.author}
                    </p>
                    <div className="flex items-center gap-2">
                      <Clock className="w-3.5 h-3.5" style={{ color: 'var(--muted-foreground)' }} />
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
                </div>
              </div>

              {/* Introduction */}
              {article.introduction && (
                <p
                  className="text-lg leading-relaxed"
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: 'var(--text-lg)',
                    color: 'var(--foreground)',
                    lineHeight: '1.8',
                  }}
                >
                  {article.introduction}
                </p>
              )}
            </motion.div>

            {/* Key Takeaways */}
            {article.keyTakeaways && article.keyTakeaways.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="mb-12 p-8 rounded-3xl"
                style={{
                  background: 'var(--glass-accent)',
                  border: '1px solid var(--accent-light)',
                }}
              >
                <h2
                  className="mb-6"
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: 'var(--text-xl)',
                    fontWeight: 'var(--font-weight-bold)',
                    color: 'var(--accent)',
                  }}
                >
                  À retenir
                </h2>
                <ul className="space-y-3">
                  {article.keyTakeaways.map((takeaway, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <ChevronRight
                        className="w-5 h-5 flex-shrink-0 mt-0.5"
                        style={{ color: 'var(--accent)' }}
                      />
                      <span
                        style={{
                          fontFamily: 'var(--font-body)',
                          fontSize: 'var(--text-base)',
                          color: 'var(--foreground)',
                          lineHeight: '1.7',
                        }}
                      >
                        {takeaway}
                      </span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            )}

            {/* Article Content */}
            {article.content && article.content.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="space-y-10 mb-12"
              >
                {article.content.map((section, index) => (
                  <div key={index}>
                    {section.heading && (
                      <h2
                        className="mb-4"
                        style={{
                          fontFamily: 'var(--font-display)',
                          fontSize: 'var(--text-2xl)',
                          fontWeight: 'var(--font-weight-bold)',
                          color: 'var(--foreground)',
                        }}
                      >
                        {section.heading}
                      </h2>
                    )}
                    <div className="space-y-4">
                      {section.paragraphs.map((paragraph, pIndex) => (
                        <p
                          key={pIndex}
                          style={{
                            fontFamily: 'var(--font-body)',
                            fontSize: 'var(--text-base)',
                            color: 'var(--foreground)',
                            lineHeight: '1.8',
                          }}
                        >
                          {paragraph}
                        </p>
                      ))}
                    </div>
                  </div>
                ))}
              </motion.div>
            )}

            {/* Pull Quote */}
            {article.pullQuote && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="my-12 p-8 rounded-3xl"
                style={{
                  background: 'var(--glass-primary)',
                  border: '2px solid var(--primary-light)',
                }}
              >
                <blockquote
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: 'var(--text-xl)',
                    fontWeight: 'var(--font-weight-semibold)',
                    color: 'var(--primary)',
                    lineHeight: '1.6',
                    fontStyle: 'italic',
                  }}
                >
                  "{article.pullQuote}"
                </blockquote>
              </motion.div>
            )}

            {/* Conclusion */}
            {article.conclusion && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="mb-12"
              >
                <h2
                  className="mb-4"
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: 'var(--text-2xl)',
                    fontWeight: 'var(--font-weight-bold)',
                    color: 'var(--foreground)',
                  }}
                >
                  Conclusion
                </h2>
                <p
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: 'var(--text-base)',
                    color: 'var(--foreground)',
                    lineHeight: '1.8',
                  }}
                >
                  {article.conclusion}
                </p>
              </motion.div>
            )}

            {/* Tags */}
            {article.tags && article.tags.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.5 }}
                className="flex flex-wrap gap-2"
              >
                {article.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="px-4 py-2 rounded-full"
                    style={{
                      background: 'var(--glass-white-light)',
                      border: '1px solid var(--glass-border)',
                      color: 'var(--muted-foreground)',
                      fontFamily: 'var(--font-body)',
                      fontSize: 'var(--text-xs)',
                    }}
                  >
                    #{tag}
                  </span>
                ))}
              </motion.div>
            )}
          </div>
        </main>
      </div>

      <ToastContainer toasts={toast.toasts} removeToast={toast.removeToast} />
    </div>
  );
}
