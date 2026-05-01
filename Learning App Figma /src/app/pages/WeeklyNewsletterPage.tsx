import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  ArrowLeft,
  Calendar,
  Clock,
  User,
  TrendingUp,
  Sparkles,
  Bookmark,
  BookmarkCheck,
  Play,
  ExternalLink,
  Mail,
  Share2,
  Download,
  ChevronRight,
} from 'lucide-react';
import { BackgroundBlobs } from '../components/ui/background-blobs';
import OptimizedSidebar from '../components/ui/optimized-sidebar';
import { useToast, ToastContainer } from '../components/ui/notification-toast';
import { getCurrentWeeklyNews, type WeeklyNewsEdition, type WeeklyNewsItem } from '../data/weeklyNewsData';

interface WeeklyNewsletterPageProps {
  onNavigate: (page: string, courseId?: string, entryType?: string, newsArticleId?: number) => void;
  onBack: () => void;
  onLogout: () => void;
}

export default function WeeklyNewsletterPage({ onNavigate, onBack, onLogout }: WeeklyNewsletterPageProps) {
  const edition = getCurrentWeeklyNews();
  const [savedNews, setSavedNews] = useState<Set<number>>(new Set());
  const { toasts, success, removeToast } = useToast();

  const handleSaveNews = (newsId: number, e: React.MouseEvent) => {
    e.stopPropagation();
    const newSaved = new Set(savedNews);
    if (newSaved.has(newsId)) {
      newSaved.delete(newsId);
      success('Retiré des favoris');
    } else {
      newSaved.add(newsId);
      success('Ajouté aux favoris');
    }
    setSavedNews(newSaved);
  };

  const handleShareNewsletter = () => {
    navigator.clipboard.writeText(window.location.href);
    success('Lien de la newsletter copié !');
  };

  const featuredNews = edition.newsItems.filter(item => item.isFeatured);
  const regularNews = edition.newsItems.filter(item => !item.isFeatured);

  return (
    <div className="flex h-screen overflow-hidden" style={{ background: 'var(--background)' }}>
      <BackgroundBlobs />
      <ToastContainer toasts={toasts} onRemove={removeToast} />
      <OptimizedSidebar onNavigate={onNavigate} onLogout={onLogout} currentPage="veille" />

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        <main className="flex-1 overflow-y-auto">
          <div className="max-w-6xl mx-auto px-8 py-12">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-12"
          >
            {/* Back Button */}
            <motion.button
              onClick={onBack}
              className="flex items-center gap-2 mb-8 px-4 py-2 rounded-xl transition-all duration-200 hover:translate-x-[-4px]"
              style={{
                background: 'rgba(255, 255, 255, 0.6)',
                border: '1px solid var(--border)',
                fontFamily: 'var(--font-body)',
                fontSize: 'var(--text-sm)',
                fontWeight: 'var(--font-weight-medium)',
                backdropFilter: 'blur(10px)',
              }}
            >
              <ArrowLeft className="w-4 h-4" />
              Retour à la veille
            </motion.button>

            {/* Newsletter Header */}
            <div className="flex items-start justify-between gap-8">
              <div className="flex-1">
                {/* Badge Edition */}
                <div
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-4"
                  style={{
                    background: 'rgba(85, 161, 180, 0.12)',
                    border: '1px solid var(--primary)',
                  }}
                >
                  <TrendingUp className="w-4 h-4" style={{ color: 'var(--primary)' }} />
                  <span
                    style={{
                      fontFamily: 'var(--font-body)',
                      fontSize: 'var(--text-sm)',
                      fontWeight: 'var(--font-weight-bold)',
                      color: 'var(--primary)',
                      textTransform: 'uppercase',
                      letterSpacing: '0.05em',
                    }}
                  >
                    {edition.edition}
                  </span>
                </div>

                {/* Title */}
                <h1
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: 'clamp(2.5rem, 6vw, 4rem)',
                    fontWeight: 'var(--font-weight-extrabold)',
                    color: 'var(--foreground)',
                    lineHeight: 'var(--leading-tight)',
                    marginBottom: '16px',
                    background: 'linear-gradient(135deg, var(--primary) 0%, var(--accent) 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                  }}
                >
                  Actus de la semaine
                </h1>

                {/* Subtitle */}
                <p
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: 'var(--text-lg)',
                    lineHeight: 'var(--leading-relaxed)',
                    color: 'var(--muted-foreground)',
                    maxWidth: '600px',
                  }}
                >
                  Votre dose hebdomadaire d'actualités sur l'apprentissage, la formation et l'innovation pédagogique.
                </p>

                {/* Meta */}
                <div className="flex items-center gap-4 mt-6">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" style={{ color: 'var(--muted-foreground)' }} />
                    <span
                      style={{
                        fontFamily: 'var(--font-body)',
                        fontSize: 'var(--text-sm)',
                        color: 'var(--muted-foreground)',
                      }}
                    >
                      {edition.publishDate}
                    </span>
                  </div>
                  <span style={{ color: 'var(--border)' }}>•</span>
                  <span
                    style={{
                      fontFamily: 'var(--font-body)',
                      fontSize: 'var(--text-sm)',
                      color: 'var(--muted-foreground)',
                    }}
                  >
                    {edition.newsItems.length} articles
                  </span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3">
                <motion.button
                  onClick={handleShareNewsletter}
                  className="px-5 py-3 rounded-xl flex items-center gap-2"
                  style={{
                    background: 'rgba(255, 255, 255, 0.8)',
                    border: '1px solid var(--border)',
                    fontFamily: 'var(--font-body)',
                    fontSize: 'var(--text-sm)',
                    fontWeight: 'var(--font-weight-medium)',
                    backdropFilter: 'blur(10px)',
                  }}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Share2 className="w-4 h-4" />
                  Partager
                </motion.button>

                <motion.button
                  className="px-5 py-3 rounded-xl flex items-center gap-2"
                  style={{
                    background: 'var(--primary)',
                    color: 'white',
                    fontFamily: 'var(--font-body)',
                    fontSize: 'var(--text-sm)',
                    fontWeight: 'var(--font-weight-medium)',
                    border: 'none',
                  }}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Mail className="w-4 h-4" />
                  S'abonner
                </motion.button>
              </div>
            </div>
          </motion.div>

          {/* Editorial Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05 }}
            className="mb-16"
          >
            <div
              className="rounded-3xl p-8 md:p-10"
              style={{
                background: 'rgba(255, 255, 255, 0.9)',
                border: '1px solid var(--border)',
                backdropFilter: 'blur(10px)',
              }}
            >
              {/* Quote Icon */}
              <div className="flex items-start gap-6">
                <div
                  className="flex-shrink-0 w-16 h-16 rounded-2xl flex items-center justify-center"
                  style={{
                    background: 'rgba(85, 161, 180, 0.12)',
                  }}
                >
                  <span
                    style={{
                      fontFamily: 'var(--font-display)',
                      fontSize: '3rem',
                      fontWeight: 'var(--font-weight-bold)',
                      color: 'var(--primary)',
                      lineHeight: '1',
                    }}
                  >
                    &ldquo;
                  </span>
                </div>

                <div className="flex-1">
                  {/* Editorial Content */}
                  <div
                    className="space-y-4 mb-6"
                    style={{
                      fontFamily: 'var(--font-body)',
                      fontSize: 'var(--text-lg)',
                      lineHeight: 'var(--leading-relaxed)',
                      color: 'var(--muted-foreground)',
                      fontStyle: 'italic',
                    }}
                  >
                    <p>
                      L'intelligence artificielle transforme radicalement le paysage de la formation professionnelle. 
                      Ce numéro explore comment les organisations peuvent tirer parti de l'IA pour personnaliser 
                      l'apprentissage, automatiser les tâches répétitives et offrir des expériences pédagogiques inédites.
                    </p>
                    <p>
                      Au-delà de la technologie, c'est toute notre approche de la transmission des connaissances qui évolue. 
                      Les apprenants d'aujourd'hui attendent des parcours flexibles, engageants et adaptés à leurs besoins spécifiques. 
                      Cette newsletter vous accompagne dans cette transformation.
                    </p>
                  </div>

                  {/* Signature */}
                  <div
                    style={{
                      fontFamily: 'var(--font-body)',
                      fontSize: 'var(--text-base)',
                      color: 'var(--muted-foreground)',
                      fontStyle: 'normal',
                    }}
                  >
                    — L'équipe de The Learning Society
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Featured Video Section */}
          {edition.featuredVideo && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="mb-16"
            >
              <div className="flex items-center gap-3 mb-6">
                <Sparkles className="w-5 h-5" style={{ color: 'var(--accent)' }} />
                <h2
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: 'var(--text-2xl)',
                    fontWeight: 'var(--font-weight-bold)',
                    color: 'var(--foreground)',
                  }}
                >
                  Vidéo de la semaine
                </h2>
              </div>

              <div
                className="rounded-3xl overflow-hidden"
                style={{
                  background: 'rgba(255, 255, 255, 0.9)',
                  border: '1px solid var(--border)',
                  backdropFilter: 'blur(10px)',
                }}
              >
                <div className="grid md:grid-cols-5 gap-0">
                  {/* Video Thumbnail */}
                  <div className="md:col-span-3 relative group cursor-pointer">
                    <img
                      src={edition.featuredVideo.thumbnail}
                      alt={edition.featuredVideo.title}
                      className="w-full h-full object-cover min-h-[300px]"
                    />
                    <div
                      className="absolute inset-0 flex items-center justify-center"
                      style={{
                        background: 'rgba(0, 0, 0, 0.3)',
                      }}
                    >
                      <motion.div
                        className="w-20 h-20 rounded-full flex items-center justify-center"
                        style={{
                          background: 'var(--primary)',
                          boxShadow: '0 8px 32px rgba(85, 161, 180, 0.4)',
                        }}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <Play className="w-8 h-8 text-white ml-1" />
                      </motion.div>
                    </div>
                    <div
                      className="absolute bottom-4 right-4 px-3 py-1.5 rounded-lg"
                      style={{
                        background: 'rgba(0, 0, 0, 0.8)',
                        backdropFilter: 'blur(10px)',
                      }}
                    >
                      <span
                        style={{
                          fontFamily: 'var(--font-body)',
                          fontSize: 'var(--text-sm)',
                          fontWeight: 'var(--font-weight-semibold)',
                          color: 'white',
                        }}
                      >
                        {edition.featuredVideo.duration}
                      </span>
                    </div>
                  </div>

                  {/* Video Info */}
                  <div className="md:col-span-2 p-8 flex flex-col justify-center">
                    <h3
                      className="mb-4"
                      style={{
                        fontFamily: 'var(--font-display)',
                        fontSize: 'var(--text-xl)',
                        fontWeight: 'var(--font-weight-bold)',
                        color: 'var(--foreground)',
                        lineHeight: 'var(--leading-tight)',
                      }}
                    >
                      {edition.featuredVideo.title}
                    </h3>
                    <p
                      className="mb-6"
                      style={{
                        fontFamily: 'var(--font-body)',
                        fontSize: 'var(--text-sm)',
                        lineHeight: 'var(--leading-relaxed)',
                        color: 'var(--muted-foreground)',
                      }}
                    >
                      {edition.featuredVideo.summary}
                    </p>
                    <motion.button
                      className="px-6 py-3 rounded-xl flex items-center gap-2 self-start"
                      style={{
                        background: 'var(--primary)',
                        color: 'white',
                        fontFamily: 'var(--font-body)',
                        fontSize: 'var(--text-sm)',
                        fontWeight: 'var(--font-weight-semibold)',
                        border: 'none',
                      }}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Play className="w-4 h-4" />
                      Regarder maintenant
                    </motion.button>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* Featured News Section */}
          {featuredNews.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="mb-16"
            >
              <div className="flex items-center gap-3 mb-6">
                <TrendingUp className="w-5 h-5" style={{ color: 'var(--primary)' }} />
                <h2
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: 'var(--text-2xl)',
                    fontWeight: 'var(--font-weight-bold)',
                    color: 'var(--foreground)',
                  }}
                >
                  À la une
                </h2>
              </div>

              <div className="grid md:grid-cols-3 gap-6">
                {featuredNews.map((news, index) => (
                  <FeaturedNewsCard
                    key={news.id}
                    news={news}
                    isSaved={savedNews.has(news.id)}
                    onSave={(e) => handleSaveNews(news.id, e)}
                    onClick={() => onNavigate('veille-article', undefined, undefined, news.id)}
                    delay={0.3 + index * 0.1}
                  />
                ))}
              </div>
            </motion.div>
          )}

          {/* All News Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <div className="flex items-center justify-between mb-6">
              <h2
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 'var(--text-2xl)',
                  fontWeight: 'var(--font-weight-bold)',
                  color: 'var(--foreground)',
                }}
              >
                Toutes les actus
              </h2>
              <span
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: 'var(--text-sm)',
                  color: 'var(--muted-foreground)',
                }}
              >
                {edition.newsItems.length} articles
              </span>
            </div>

            <div className="space-y-4">
              {edition.newsItems.map((news, index) => (
                <NewsListItem
                  key={news.id}
                  news={news}
                  isSaved={savedNews.has(news.id)}
                  onSave={(e) => handleSaveNews(news.id, e)}
                  onClick={() => onNavigate('newsletter-article', undefined, undefined, news.id)}
                  delay={0.6 + index * 0.05}
                />
              ))}
            </div>
          </motion.div>

          {/* Footer CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="mt-16 p-8 rounded-3xl text-center"
            style={{
              background: 'rgba(85, 161, 180, 0.08)',
              border: '1px solid var(--primary)',
            }}
          >
            <Mail className="w-12 h-12 mx-auto mb-4" style={{ color: 'var(--primary)' }} />
            <h3
              className="mb-3"
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'var(--text-xl)',
                fontWeight: 'var(--font-weight-bold)',
                color: 'var(--foreground)',
              }}
            >
              Recevez cette newsletter chaque semaine
            </h3>
            <p
              className="mb-6"
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: 'var(--text-base)',
                color: 'var(--muted-foreground)',
                maxWidth: '500px',
                margin: '0 auto 24px',
              }}
            >
              Restez informé des dernières tendances en formation et apprentissage.
            </p>
            <div className="flex gap-3 justify-center max-w-md mx-auto">
              <input
                type="email"
                placeholder="votre@email.com"
                className="flex-1 px-4 py-3 rounded-xl"
                style={{
                  background: 'rgba(255, 255, 255, 0.9)',
                  border: '1px solid var(--border)',
                  fontFamily: 'var(--font-body)',
                  fontSize: 'var(--text-sm)',
                  color: 'var(--foreground)',
                  outline: 'none',
                }}
              />
              <motion.button
                className="px-6 py-3 rounded-xl"
                style={{
                  background: 'var(--primary)',
                  color: 'white',
                  fontFamily: 'var(--font-body)',
                  fontSize: 'var(--text-sm)',
                  fontWeight: 'var(--font-weight-semibold)',
                  border: 'none',
                  whiteSpace: 'nowrap',
                }}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
              >
                S'abonner
              </motion.button>
            </div>
          </motion.div>
          </div>
        </main>
      </div>
    </div>
  );
}

// Featured News Card Component
interface FeaturedNewsCardProps {
  news: WeeklyNewsItem;
  isSaved: boolean;
  onSave: (e: React.MouseEvent) => void;
  onClick: () => void;
  delay: number;
}

function FeaturedNewsCard({ news, isSaved, onSave, onClick, delay }: FeaturedNewsCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
      onClick={onClick}
      className="group cursor-pointer rounded-2xl overflow-hidden flex flex-col h-full relative"
      style={{
        background: 'rgba(255, 255, 255, 0.9)',
        border: '2px solid var(--primary)',
        backdropFilter: 'blur(10px)',
      }}
      whileHover={{ 
        y: -6, 
        boxShadow: '0 20px 40px rgba(85, 161, 180, 0.25)',
        transition: { duration: 0.3 }
      }}
    >
      {/* Subtle Glow on Hover */}
      <motion.div
        className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 pointer-events-none"
        style={{
          background: 'rgba(85, 161, 180, 0.06)',
        }}
        initial={{ opacity: 0 }}
        whileHover={{ opacity: 1 }}
        transition={{ duration: 0.4, ease: 'easeOut' }}
      />

      {/* Content */}
      <div className="p-6 flex flex-col flex-1 relative z-10">
        <div className="flex items-center justify-between mb-3">
          <div
            className="inline-flex items-center px-2.5 py-1 rounded-lg"
            style={{
              background: 'rgba(85, 161, 180, 0.1)',
              border: '1px solid var(--primary)',
            }}
          >
            <span
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: 'var(--text-xs)',
                fontWeight: 'var(--font-weight-semibold)',
                color: 'var(--primary)',
              }}
            >
              {news.category}
            </span>
          </div>

          {/* Save Button */}
          <motion.button
            onClick={onSave}
            className="p-2 rounded-lg"
            style={{
              background: isSaved ? 'var(--primary)' : 'rgba(0, 0, 0, 0.04)',
            }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            {isSaved ? (
              <BookmarkCheck className="w-4 h-4 text-white" />
            ) : (
              <Bookmark className="w-4 h-4" style={{ color: 'var(--muted-foreground)' }} />
            )}
          </motion.button>
        </div>

        <h3
          className="mb-3 flex-1"
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'var(--text-lg)',
            fontWeight: 'var(--font-weight-bold)',
            color: 'var(--foreground)',
            lineHeight: 'var(--leading-tight)',
          }}
        >
          {news.title}
        </h3>

        <div className="flex items-center justify-between pt-4 border-t" style={{ borderColor: 'var(--border)' }}>
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4" style={{ color: 'var(--muted-foreground)' }} />
            <span
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: 'var(--text-sm)',
                color: 'var(--muted-foreground)',
              }}
            >
              {news.readTime}
            </span>
          </div>
          <motion.div
            className="opacity-0 group-hover:opacity-100"
            initial={{ opacity: 0, x: -8 }}
            whileHover={{
              opacity: 1,
              x: 0,
              transition: { duration: 0.3, ease: 'easeOut' },
            }}
          >
            <ChevronRight className="w-5 h-5" style={{ color: 'var(--primary)' }} />
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}

// News List Item Component
interface NewsListItemProps {
  news: WeeklyNewsItem;
  isSaved: boolean;
  onSave: (e: React.MouseEvent) => void;
  onClick: () => void;
  delay: number;
}

function NewsListItem({ news, isSaved, onSave, onClick, delay }: NewsListItemProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay }}
      onClick={onClick}
      className="group cursor-pointer rounded-2xl p-6 flex gap-6 items-center relative overflow-hidden"
      style={{
        background: 'rgba(255, 255, 255, 0.8)',
        border: '1px solid var(--border)',
        backdropFilter: 'blur(10px)',
        transition: 'all 0.2s',
      }}
      whileHover={{
        scale: 1.01,
        y: -2,
        boxShadow: '0 12px 32px rgba(85, 161, 180, 0.12)',
        background: 'rgba(255, 255, 255, 0.95)',
      }}
    >
      {/* Subtle Glow on Hover */}
      <motion.div
        className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 pointer-events-none"
        style={{
          background: 'rgba(85, 161, 180, 0.05)',
        }}
        initial={{ opacity: 0 }}
        whileHover={{ opacity: 1 }}
        transition={{ duration: 0.4, ease: 'easeOut' }}
      />

      {/* Content */}
      <div className="flex-1 min-w-0 relative z-10">
        <div className="flex items-center gap-3 mb-2">
          <div
            className="px-2.5 py-1 rounded-lg"
            style={{
              background: 'rgba(248, 176, 68, 0.12)',
              border: '1px solid var(--accent-yellow)',
            }}
          >
            <span
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: 'var(--text-xs)',
                fontWeight: 'var(--font-weight-semibold)',
                color: 'var(--accent-yellow)',
              }}
            >
              {news.category}
            </span>
          </div>
          {news.isFeatured && (
            <div
              className="px-2.5 py-1 rounded-lg"
              style={{
                background: 'rgba(237, 132, 58, 0.12)',
                border: '1px solid var(--accent)',
              }}
            >
              <span
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: 'var(--text-xs)',
                  fontWeight: 'var(--font-weight-semibold)',
                  color: 'var(--accent)',
                }}
              >
                À la une
              </span>
            </div>
          )}
        </div>

        <h3
          className="mb-2"
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'var(--text-lg)',
            fontWeight: 'var(--font-weight-bold)',
            color: 'var(--foreground)',
            lineHeight: 'var(--leading-tight)',
          }}
        >
          {news.title}
        </h3>

        <p
          className="mb-3"
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: 'var(--text-sm)',
            lineHeight: 'var(--leading-relaxed)',
            color: 'var(--muted-foreground)',
          }}
        >
          {news.summary.substring(0, 150)}...
        </p>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <User className="w-3.5 h-3.5" style={{ color: 'var(--muted-foreground)' }} />
            <span
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: 'var(--text-xs)',
                color: 'var(--muted-foreground)',
              }}
            >
              {news.author}
            </span>
          </div>
          <span style={{ color: 'var(--border)' }}>•</span>
          <div className="flex items-center gap-2">
            <Calendar className="w-3.5 h-3.5" style={{ color: 'var(--muted-foreground)' }} />
            <span
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: 'var(--text-xs)',
                color: 'var(--muted-foreground)',
              }}
            >
              {news.publishDate}
            </span>
          </div>
          <span style={{ color: 'var(--border)' }}>•</span>
          <div className="flex items-center gap-2">
            <Clock className="w-3.5 h-3.5" style={{ color: 'var(--muted-foreground)' }} />
            <span
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: 'var(--text-xs)',
                color: 'var(--muted-foreground)',
              }}
            >
              {news.readTime}
            </span>
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="flex flex-col gap-3">
        <motion.button
          onClick={onSave}
          className="p-2.5 rounded-lg"
          style={{
            background: isSaved ? 'var(--primary)' : 'rgba(255, 255, 255, 0.9)',
            border: '1px solid var(--border)',
          }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          {isSaved ? (
            <BookmarkCheck className="w-4 h-4 text-white" />
          ) : (
            <Bookmark className="w-4 h-4" style={{ color: 'var(--foreground)' }} />
          )}
        </motion.button>

        <motion.div
          className="p-2.5 rounded-lg"
          style={{
            background: 'rgba(85, 161, 180, 0.1)',
          }}
          whileHover={{ x: 3 }}
        >
          <ChevronRight className="w-4 h-4" style={{ color: 'var(--primary)' }} />
        </motion.div>
      </div>
    </motion.div>
  );
}
