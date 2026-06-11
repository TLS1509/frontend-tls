import { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useSpring } from 'motion/react';
import {
  ArrowLeft,
  Bookmark,
  BookmarkCheck,
  Share2,
  Clock,
  ChevronRight,
  BookOpen,
  Quote,
  Calendar,
  Tag,
  TrendingUp,
  ExternalLink,
  Newspaper,
} from 'lucide-react';
import { BackgroundBlobs } from '../components/ui/background-blobs';
import OptimizedSidebar from '../components/ui/optimized-sidebar';
import { useToast, ToastContainer } from '../components/ui/notification-toast';
import { getMagArticle } from '../data/veilleMagData';
import { getCurrentWeeklyNews } from '../data/weeklyNewsData';

type ArticleSource = 'magazine' | 'newsletter' | 'dossier';

interface ArticleData {
  id: number;
  title: string;
  excerpt?: string;
  summary?: string;
  category: string;
  author: string;
  publishDate?: string;
  readTime: string;
  imageUrl?: string;
  introduction?: string;
  content?: Array<{
    type: 'text' | 'quote' | 'image';
    content: string;
    author?: string;
  }>;
  tags?: string[];
  url?: string;
}

interface ArticleDetailPageProps {
  source: ArticleSource;
  articleId: number;
  sourceId?: number; // Pour magazine/dossier
  onNavigate: (page: string, courseId?: string, entryType?: string, newsArticleId?: number) => void;
  onBack: () => void;
  onLogout: () => void;
}

export default function ArticleDetailPage({
  source,
  articleId,
  sourceId,
  onNavigate,
  onBack,
  onLogout,
}: ArticleDetailPageProps) {
  const [article, setArticle] = useState<ArticleData | null>(null);
  const [isSaved, setIsSaved] = useState(false);
  const [readingProgress, setReadingProgress] = useState(0);
  const contentRef = useRef<HTMLDivElement>(null);
  const toast = useToast();

  // Load article based on source
  useEffect(() => {
    let articleData: ArticleData | null = null;

    if (source === 'magazine' && sourceId) {
      const magArticle = getMagArticle(sourceId, articleId);
      if (magArticle) {
        articleData = {
          ...magArticle,
          publishDate: magArticle.publishDate || new Date().toLocaleDateString('fr-FR'),
        };
      }
    } else if (source === 'newsletter') {
      const weeklyEdition = getCurrentWeeklyNews();
      const newsItem = weeklyEdition.newsItems.find((item) => item.id === articleId);
      if (newsItem) {
        articleData = {
          id: newsItem.id,
          title: newsItem.title,
          summary: newsItem.summary,
          category: newsItem.category,
          author: newsItem.author,
          publishDate: newsItem.publishDate,
          readTime: newsItem.readTime,
          imageUrl: newsItem.imageUrl,
          tags: newsItem.tags,
          url: newsItem.url,
        };
      }
    }

    setArticle(articleData);
  }, [source, articleId, sourceId]);

  // Reading progress tracker
  useEffect(() => {
    const handleScroll = () => {
      if (!contentRef.current) return;
      
      const scrollTop = window.scrollY;
      const docHeight = contentRef.current.offsetHeight;
      const winHeight = window.innerHeight;
      const scrollPercent = (scrollTop / (docHeight - winHeight)) * 100;
      
      setReadingProgress(Math.min(100, Math.max(0, scrollPercent)));
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Smooth progress animation
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  // Get source-specific metadata
  const getSourceMetadata = () => {
    switch (source) {
      case 'magazine':
        return {
          breadcrumbRoot: 'Le Mag du Mois',
          backButtonText: 'Retour au magazine',
          icon: BookOpen,
        };
      case 'newsletter':
        return {
          breadcrumbRoot: 'Actus de la Semaine',
          backButtonText: 'Retour à la newsletter',
          icon: Newspaper,
        };
      case 'dossier':
        return {
          breadcrumbRoot: 'Dossiers',
          backButtonText: 'Retour aux dossiers',
          icon: BookOpen,
        };
      default:
        return {
          breadcrumbRoot: 'Veille',
          backButtonText: 'Retour',
          icon: BookOpen,
        };
    }
  };

  const sourceMetadata = getSourceMetadata();
  const SourceIcon = sourceMetadata.icon;

  if (!article) {
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
                <SourceIcon className="w-8 h-8" style={{ color: 'var(--primary)' }} />
              </div>
              <p
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 'var(--text-xl)',
                  fontWeight: 'var(--font-weight-bold)',
                  color: 'var(--foreground)',
                }}
              >
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
    toast.showToast({
      id: `save-${Date.now()}`,
      title: isSaved ? 'Retiré des favoris' : 'Article sauvegardé',
      message: isSaved
        ? 'L\'article a été retiré de vos favoris'
        : 'Retrouvez cet article dans vos contenus sauvegardés',
      type: 'success',
      duration: 2000,
    });
  };

  const handleShare = () => {
    toast.showToast({
      id: `share-${Date.now()}`,
      title: 'Lien copié',
      message: 'Le lien de l\'article a été copié',
      type: 'success',
      duration: 2000,
    });
  };

  const handleReadOriginal = () => {
    if (article.url) {
      window.open(article.url, '_blank');
      toast.showToast({
        id: `external-${Date.now()}`,
        title: 'Ouverture de l\'article original',
        message: 'L\'article s\'ouvre dans un nouvel onglet',
        type: 'info',
        duration: 2000,
      });
    }
  };

  return (
    <div className="flex h-screen overflow-hidden" style={{ background: 'var(--background)' }}>
      {/* Background Effects */}
      <BackgroundBlobs />
      <ToastContainer toasts={toast.toasts} onRemove={toast.removeToast} />

      {/* Sidebar */}
      <OptimizedSidebar currentPage="veille" onNavigate={onNavigate} onLogout={onLogout} />

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Reading Progress Bar */}
        <motion.div
          className="fixed top-0 left-0 right-0 h-1 z-50"
          style={{
            background: source === 'newsletter' 
              ? 'linear-gradient(90deg, var(--primary), var(--teal))'
              : 'linear-gradient(90deg, var(--primary), var(--secondary))',
            transformOrigin: '0%',
            scaleX,
          }}
        />

        <main className="flex-1 overflow-y-auto">
          <div ref={contentRef} style={{ minHeight: '100%', background: 'var(--background)' }}>
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
              <div className="max-w-4xl mx-auto px-6 py-4">
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
                    <span>{sourceMetadata.backButtonText}</span>
                  </motion.button>

                  {/* Actions */}
                  <div className="flex items-center gap-2">
                    {/* Save Button */}
                    <motion.button
                      onClick={handleSave}
                      className="p-2.5 rounded-xl transition-all duration-200"
                      style={{
                        background: isSaved ? 'rgba(85, 161, 180, 0.12)' : 'transparent',
                        color: isSaved ? 'var(--primary)' : 'var(--muted-foreground)',
                      }}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      {isSaved ? <BookmarkCheck className="w-5 h-5" /> : <Bookmark className="w-5 h-5" />}
                    </motion.button>

                    {/* Share Button */}
                    <motion.button
                      onClick={handleShare}
                      className="p-2.5 rounded-xl transition-colors duration-200"
                      style={{ color: 'var(--muted-foreground)' }}
                      whileHover={{ scale: 1.05, color: 'var(--primary)' }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Share2 className="w-5 h-5" />
                    </motion.button>

                    {/* Reading Progress Circle */}
                    <div className="relative w-10 h-10 ml-2">
                      <svg className="w-full h-full transform -rotate-90">
                        <circle
                          cx="20"
                          cy="20"
                          r="16"
                          stroke="rgba(0,0,0,0.1)"
                          strokeWidth="3"
                          fill="none"
                        />
                        <motion.circle
                          cx="20"
                          cy="20"
                          r="16"
                          stroke="var(--primary)"
                          strokeWidth="3"
                          fill="none"
                          strokeLinecap="round"
                          initial={{ pathLength: 0 }}
                          animate={{ pathLength: readingProgress / 100 }}
                          style={{
                            strokeDasharray: 100,
                            strokeDashoffset: 0,
                          }}
                        />
                      </svg>
                      <div
                        className="absolute inset-0 flex items-center justify-center"
                        style={{
                          fontFamily: 'var(--font-body)',
                          fontSize: '10px',
                          fontWeight: 'var(--font-weight-semibold)',
                          color: 'var(--primary)',
                        }}
                      >
                        {Math.round(readingProgress)}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Article Hero */}
            <div
              className="relative overflow-hidden"
              style={{
                background: 'linear-gradient(180deg, rgba(85, 161, 180, 0.08) 0%, transparent 100%)',
              }}
            >
              <div className="max-w-4xl mx-auto px-6 pt-12 pb-8">
                {/* Breadcrumb */}
                <motion.div
                  className="flex items-center gap-2 mb-6"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <span
                    style={{
                      fontFamily: 'var(--font-body)',
                      fontSize: 'var(--text-sm)',
                      color: 'var(--muted-foreground)',
                    }}
                  >
                    {sourceMetadata.breadcrumbRoot}
                  </span>
                  <ChevronRight className="w-4 h-4" style={{ color: 'var(--muted-foreground)' }} />
                  <span
                    style={{
                      fontFamily: 'var(--font-body)',
                      fontSize: 'var(--text-sm)',
                      color: 'var(--primary)',
                      fontWeight: 'var(--font-weight-medium)',
                    }}
                  >
                    {article.category}
                  </span>
                </motion.div>

                {/* Title */}
                <motion.h1
                  className="mb-6"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: 'clamp(2rem, 5vw, 3.5rem)',
                    fontWeight: 'var(--font-weight-bold)',
                    lineHeight: 'var(--leading-tight)',
                    color: 'var(--foreground)',
                  }}
                >
                  {article.title}
                </motion.h1>

                {/* Excerpt/Summary */}
                <motion.p
                  className="mb-8"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: 'var(--text-xl)',
                    lineHeight: 'var(--leading-relaxed)',
                    color: 'var(--muted-foreground)',
                    fontWeight: 'var(--font-weight-medium)',
                  }}
                >
                  {article.excerpt || article.summary}
                </motion.p>

                {/* Meta Info */}
                <motion.div
                  className="flex flex-wrap items-center gap-6 pb-8 border-b"
                  style={{ borderColor: 'var(--border)' }}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4 }}
                >
                  {/* Author */}
                  <div className="flex items-center gap-3">
                    <img
                      src={`https://ui-avatars.com/api/?name=${encodeURIComponent(article.author)}&background=55A1B4&color=fff&size=48`}
                      alt={article.author}
                      className="w-12 h-12 rounded-full"
                    />
                    <div>
                      <p
                        style={{
                          fontFamily: 'var(--font-body)',
                          fontSize: 'var(--text-base)',
                          fontWeight: 'var(--font-weight-semibold)',
                          color: 'var(--foreground)',
                        }}
                      >
                        {article.author}
                      </p>
                      <p
                        style={{
                          fontFamily: 'var(--font-body)',
                          fontSize: 'var(--text-sm)',
                          color: 'var(--muted-foreground)',
                        }}
                      >
                        Contributeur
                      </p>
                    </div>
                  </div>

                  {/* Date */}
                  {article.publishDate && (
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4" style={{ color: 'var(--muted-foreground)' }} />
                      <span
                        style={{
                          fontFamily: 'var(--font-body)',
                          fontSize: 'var(--text-sm)',
                          color: 'var(--muted-foreground)',
                        }}
                      >
                        {article.publishDate}
                      </span>
                    </div>
                  )}

                  {/* Read Time */}
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4" style={{ color: 'var(--muted-foreground)' }} />
                    <span
                      style={{
                        fontFamily: 'var(--font-body)',
                        fontSize: 'var(--text-sm)',
                        color: 'var(--muted-foreground)',
                      }}
                    >
                      {article.readTime}
                    </span>
                  </div>
                </motion.div>
              </div>
            </div>

            {/* Featured Image */}
            {article.imageUrl && (
              <motion.div
                className="max-w-4xl mx-auto px-6 -mt-4 mb-12"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                <div
                  className="relative overflow-hidden rounded-3xl"
                  style={{
                    aspectRatio: '16/9',
                    border: '1px solid var(--border)',
                  }}
                >
                  <img
                    src={article.imageUrl}
                    alt={article.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              </motion.div>
            )}

            {/* Article Content */}
            <div className="max-w-3xl mx-auto px-6 py-12">
              {/* Introduction */}
              {article.introduction && (
                <motion.div
                  className="mb-12 p-8 rounded-3xl"
                  style={{
                    background: 'linear-gradient(135deg, rgba(85, 161, 180, 0.08) 0%, rgba(85, 161, 180, 0.04) 100%)',
                    border: '1px solid rgba(85, 161, 180, 0.15)',
                  }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                >
                  <p
                    style={{
                      fontFamily: 'var(--font-body)',
                      fontSize: 'var(--text-lg)',
                      lineHeight: 'var(--leading-relaxed)',
                      color: 'var(--foreground)',
                      fontWeight: 'var(--font-weight-medium)',
                    }}
                  >
                    {article.introduction}
                  </p>
                </motion.div>
              )}

              {/* For newsletter articles - show summary as main content */}
              {source === 'newsletter' && article.summary && !article.content && (
                <motion.div
                  className="mb-12 p-8 rounded-3xl"
                  style={{
                    background: 'linear-gradient(135deg, rgba(85, 161, 180, 0.08) 0%, rgba(85, 161, 180, 0.04) 100%)',
                    border: '1px solid rgba(85, 161, 180, 0.15)',
                  }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                >
                  <div className="flex items-start gap-4 mb-4">
                    <div
                      className="p-3 rounded-2xl"
                      style={{
                        background: 'var(--primary)',
                        color: 'white',
                      }}
                    >
                      <TrendingUp className="w-6 h-6" />
                    </div>
                    <div className="flex-1">
                      <h3
                        style={{
                          fontFamily: 'var(--font-display)',
                          fontSize: 'var(--text-xl)',
                          fontWeight: 'var(--font-weight-bold)',
                          color: 'var(--foreground)',
                          marginBottom: 'var(--space-2)',
                        }}
                      >
                        L'essentiel à retenir
                      </h3>
                      <p
                        style={{
                          fontFamily: 'var(--font-body)',
                          fontSize: 'var(--text-base)',
                          lineHeight: 'var(--leading-relaxed)',
                          color: 'var(--muted-foreground)',
                        }}
                      >
                        {article.summary}
                      </p>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Content Sections - for magazine articles */}
              {article.content && article.content.length > 0 && (
                <motion.div
                  className="space-y-12 mb-12"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7 }}
                >
                  {article.content.map((section, index) => {
                    if (section.type === 'text') {
                      return (
                        <div key={index}>
                          <p
                            style={{
                              fontFamily: 'var(--font-body)',
                              fontSize: 'var(--text-base)',
                              lineHeight: 'var(--leading-relaxed)',
                              color: 'var(--foreground)',
                            }}
                          >
                            {section.content}
                          </p>
                        </div>
                      );
                    }

                    if (section.type === 'quote') {
                      return (
                        <div
                          key={index}
                          className="relative p-8 rounded-3xl"
                          style={{
                            background: 'linear-gradient(135deg, rgba(237, 132, 58, 0.08) 0%, rgba(237, 132, 58, 0.04) 100%)',
                            border: '1px solid rgba(237, 132, 58, 0.2)',
                          }}
                        >
                          <Quote
                            className="absolute top-6 left-6 w-8 h-8 opacity-20"
                            style={{ color: 'var(--secondary)' }}
                          />
                          <blockquote
                            className="relative z-10"
                            style={{
                              fontFamily: 'var(--font-display)',
                              fontSize: 'var(--text-xl)',
                              lineHeight: 'var(--leading-relaxed)',
                              color: 'var(--foreground)',
                              fontStyle: 'italic',
                              paddingLeft: 'var(--space-6)',
                            }}
                          >
                            {section.content}
                          </blockquote>
                          {section.author && (
                            <p
                              className="mt-4"
                              style={{
                                fontFamily: 'var(--font-body)',
                                fontSize: 'var(--text-sm)',
                                color: 'var(--muted-foreground)',
                                paddingLeft: 'var(--space-6)',
                              }}
                            >
                              — {section.author}
                            </p>
                          )}
                        </div>
                      );
                    }

                    if (section.type === 'image' && section.content) {
                      return (
                        <div key={index} className="rounded-3xl overflow-hidden" style={{ border: '1px solid var(--border)' }}>
                          <img src={section.content} alt="" className="w-full h-auto" />
                        </div>
                      );
                    }

                    return null;
                  })}
                </motion.div>
              )}

              {/* Tags */}
              {article.tags && article.tags.length > 0 && (
                <motion.div
                  className="mb-12"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8 }}
                >
                  <div className="flex items-center gap-3 mb-4">
                    <Tag className="w-5 h-5" style={{ color: 'var(--primary)' }} />
                    <h3
                      style={{
                        fontFamily: 'var(--font-display)',
                        fontSize: 'var(--text-lg)',
                        fontWeight: 'var(--font-weight-bold)',
                        color: 'var(--foreground)',
                      }}
                    >
                      Tags
                    </h3>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {article.tags.map((tag, index) => (
                      <span
                        key={index}
                        className="px-4 py-2 rounded-full"
                        style={{
                          background: 'rgba(85, 161, 180, 0.1)',
                          color: 'var(--primary)',
                          fontFamily: 'var(--font-body)',
                          fontSize: 'var(--text-sm)',
                          fontWeight: 'var(--font-weight-medium)',
                        }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* External Link CTA - for newsletter articles */}
              {article.url && source === 'newsletter' && (
                <motion.div
                  className="mb-12"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.9 }}
                >
                  <motion.button
                    onClick={handleReadOriginal}
                    className="w-full py-4 px-6 rounded-2xl flex items-center justify-center gap-3"
                    style={{
                      background: 'linear-gradient(135deg, var(--primary) 0%, var(--primary-dark) 100%)',
                      color: 'white',
                      fontFamily: 'var(--font-body)',
                      fontSize: 'var(--text-base)',
                      fontWeight: 'var(--font-weight-semibold)',
                      border: 'none',
                      cursor: 'pointer',
                    }}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <ExternalLink className="w-5 h-5" />
                    Lire l'article original complet
                  </motion.button>
                </motion.div>
              )}

              {/* Related/Back CTA */}
              <motion.div
                className="p-6 rounded-3xl"
                style={{
                  background: 'rgba(248, 176, 68, 0.08)',
                  border: '1px solid rgba(248, 176, 68, 0.2)',
                }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1 }}
              >
                <h3
                  className="mb-4"
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: 'var(--text-lg)',
                    fontWeight: 'var(--font-weight-bold)',
                    color: 'var(--foreground)',
                  }}
                >
                  {source === 'newsletter' ? 'Découvrir plus d\'actus' : 'Découvrir plus d\'articles'}
                </h3>
                <p
                  className="mb-4"
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: 'var(--text-sm)',
                    color: 'var(--muted-foreground)',
                    lineHeight: 'var(--leading-relaxed)',
                  }}
                >
                  {source === 'newsletter' 
                    ? 'Retrouvez toutes les actualités de la semaine dans votre newsletter hebdomadaire.'
                    : 'Explorez notre sélection d\'articles pour enrichir votre veille et vos connaissances.'
                  }
                </p>
                <motion.button
                  onClick={onBack}
                  className="px-4 py-2 rounded-xl flex items-center gap-2"
                  style={{
                    background: 'rgba(248, 176, 68, 0.15)',
                    color: 'var(--accent)',
                    fontFamily: 'var(--font-body)',
                    fontSize: 'var(--text-sm)',
                    fontWeight: 'var(--font-weight-medium)',
                    border: 'none',
                    cursor: 'pointer',
                  }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <ArrowLeft className="w-4 h-4" />
                  {sourceMetadata.backButtonText}
                </motion.button>
              </motion.div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
