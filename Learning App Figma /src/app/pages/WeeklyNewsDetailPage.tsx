import React, { useState } from 'react';
import { motion } from 'motion/react';
import {
  ArrowLeft,
  Calendar,
  Clock,
  Share2,
  Mail,
  Sparkles,
  Play,
  TrendingUp,
  ChevronRight,
} from 'lucide-react';
import { BackgroundBlobs } from '../components/ui/background-blobs';
import OptimizedSidebar from '../components/ui/optimized-sidebar';
import { useToast, ToastContainer } from '../components/ui/notification-toast';
import { getCurrentWeeklyNews, type WeeklyNewsItem } from '../data/weeklyNewsData';
import VimeoPlayer, { VideoPlayerModal } from '../components/video/VimeoPlayer';

interface WeeklyNewsDetailPageProps {
  onNavigate: (page: string) => void;
  onBack: () => void;
  onLogout: () => void;
}

export default function WeeklyNewsDetailPage({ onNavigate, onBack, onLogout }: WeeklyNewsDetailPageProps) {
  const weeklyEdition = getCurrentWeeklyNews();
  const { toasts, success, removeToast } = useToast();
  const [videoPlaying, setVideoPlaying] = useState(false);

  const handleShare = () => {
    success('Lien de la newsletter copié !');
  };

  const handleReadArticle = (item: WeeklyNewsItem) => {
    if (item.url) {
      window.open(item.url, '_blank');
    }
  };

  return (
    <div className="flex h-screen overflow-hidden" style={{ background: 'var(--background)' }}>
      <BackgroundBlobs />
      <ToastContainer toasts={toasts} onRemove={removeToast} />
      <OptimizedSidebar onNavigate={onNavigate} onLogout={onLogout} currentPage="veille" />

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        <main className="flex-1 overflow-y-auto">
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
            <div className="max-w-5xl mx-auto px-8 py-4">
              <div className="flex items-center justify-between">
                {/* Back Button */}
                <motion.button
                  onClick={onBack}
                  className="flex items-center gap-2 px-4 py-2 rounded-xl transition-all duration-200"
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

                {/* Share Button */}
                <motion.button
                  onClick={handleShare}
                  className="flex items-center gap-2 px-4 py-2 rounded-xl transition-all duration-200"
                  style={{
                    background: 'rgba(255, 255, 255, 0.8)',
                    border: '1px solid var(--border)',
                    fontFamily: 'var(--font-body)',
                    fontSize: 'var(--text-sm)',
                    fontWeight: 'var(--font-weight-medium)',
                  }}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Share2 className="w-4 h-4" />
                  Partager
                </motion.button>
              </div>
            </div>
          </div>

          {/* Newsletter Container */}
          <div
            className="max-w-4xl mx-auto px-8 py-12"
            style={{
              background: 'linear-gradient(180deg, rgba(85, 161, 180, 0.03) 0%, transparent 100%)',
            }}
          >
            {/* Newsletter Header */}
            <motion.div
              className="mb-12 text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              {/* Edition Badge */}
              <div className="flex items-center justify-center gap-3 mb-6">
                <div
                  className="px-5 py-2 rounded-full flex items-center gap-2"
                  style={{
                    background: 'rgba(85, 161, 180, 0.12)',
                    border: '1px solid var(--primary)',
                  }}
                >
                  <Mail className="w-4 h-4" style={{ color: 'var(--primary)' }} />
                  <span
                    style={{
                      fontFamily: 'var(--font-body)',
                      fontSize: 'var(--text-sm)',
                      fontWeight: 'var(--font-weight-semibold)',
                      color: 'var(--primary)',
                      textTransform: 'uppercase',
                      letterSpacing: '0.05em',
                    }}
                  >
                    Newsletter {weeklyEdition.edition}
                  </span>
                </div>
              </div>

              {/* Main Title */}
              <h1
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 'clamp(2rem, 5vw, 3rem)',
                  fontWeight: 'var(--font-weight-extrabold)',
                  color: 'var(--foreground)',
                  lineHeight: 'var(--leading-tight)',
                  marginBottom: '12px',
                }}
              >
                Les Actus de la Semaine
              </h1>

              {/* Date */}
              <div className="flex items-center justify-center gap-2">
                <Calendar className="w-4 h-4" style={{ color: 'var(--muted-foreground)' }} />
                <span
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: 'var(--text-base)',
                    color: 'var(--muted-foreground)',
                  }}
                >
                  Publié le {weeklyEdition.publishDate}
                </span>
              </div>
            </motion.div>

            {/* Featured Video Section */}
            {weeklyEdition.featuredVideo && (
              <motion.div
                className="mb-16"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 }}
              >
                <div
                  className="p-8 rounded-3xl"
                  style={{
                    background: 'rgba(255, 255, 255, 0.8)',
                    border: '1px solid var(--border)',
                    backdropFilter: 'blur(10px)',
                    boxShadow: '0 20px 60px rgba(0, 0, 0, 0.08)',
                  }}
                >
                  {/* Video Header */}
                  <div className="flex items-center gap-2 mb-4">
                    <Sparkles className="w-5 h-5" style={{ color: 'var(--secondary)' }} />
                    <h2
                      style={{
                        fontFamily: 'var(--font-display)',
                        fontSize: 'var(--text-xl)',
                        fontWeight: 'var(--font-weight-bold)',
                        color: 'var(--foreground)',
                      }}
                    >
                      Vidéo de la semaine
                    </h2>
                  </div>

                  {/* Video Player */}
                  <div
                    className="relative rounded-2xl overflow-hidden mb-6"
                    style={{
                      aspectRatio: '16/9',
                      background: '#000',
                    }}
                  >
                    {!videoPlaying ? (
                      <>
                        <img
                          src={weeklyEdition.featuredVideo.thumbnail}
                          alt={weeklyEdition.featuredVideo.title}
                          className="w-full h-full object-cover"
                        />
                        <div
                          className="absolute inset-0 flex items-center justify-center"
                          style={{
                            background: 'rgba(0, 0, 0, 0.4)',
                          }}
                        >
                          <motion.button
                            onClick={() => setVideoPlaying(true)}
                            className="w-20 h-20 rounded-full flex items-center justify-center"
                            style={{
                              background: 'rgba(255, 255, 255, 0.95)',
                              boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
                            }}
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.95 }}
                          >
                            <Play className="w-8 h-8 ml-1" style={{ color: 'var(--primary)' }} />
                          </motion.button>
                        </div>
                        {/* Duration Badge */}
                        <div
                          className="absolute bottom-4 right-4 px-3 py-1.5 rounded-lg flex items-center gap-2"
                          style={{
                            background: 'rgba(0, 0, 0, 0.8)',
                            backdropFilter: 'blur(10px)',
                          }}
                        >
                          <Clock className="w-3.5 h-3.5" style={{ color: 'white' }} />
                          <span
                            style={{
                              fontFamily: 'var(--font-body)',
                              fontSize: 'var(--text-sm)',
                              fontWeight: 'var(--font-weight-semibold)',
                              color: 'white',
                            }}
                          >
                            {weeklyEdition.featuredVideo.duration}
                          </span>
                        </div>
                      </>
                    ) : (
                      <VimeoPlayer
                        videoId="76979871"
                        title={weeklyEdition.featuredVideo.title}
                        autoplay
                        showControls
                      />
                    )}
                  </div>

                  {/* Video Info */}
                  <h3
                    className="mb-3"
                    style={{
                      fontFamily: 'var(--font-display)',
                      fontSize: 'var(--text-xl)',
                      fontWeight: 'var(--font-weight-bold)',
                      color: 'var(--foreground)',
                      lineHeight: 'var(--leading-tight)',
                    }}
                  >
                    {weeklyEdition.featuredVideo.title}
                  </h3>
                  <p
                    style={{
                      fontFamily: 'var(--font-body)',
                      fontSize: 'var(--text-base)',
                      lineHeight: 'var(--leading-relaxed)',
                      color: 'var(--muted-foreground)',
                    }}
                  >
                    {weeklyEdition.featuredVideo.summary}
                  </p>
                </div>
              </motion.div>
            )}

            {/* Section Title */}
            <motion.div
              className="mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <div className="flex items-center gap-3 mb-2">
                <TrendingUp className="w-6 h-6" style={{ color: 'var(--primary)' }} />
                <h2
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: 'var(--text-2xl)',
                    fontWeight: 'var(--font-weight-bold)',
                    color: 'var(--foreground)',
                  }}
                >
                  Dans cette édition
                </h2>
              </div>
              <p
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: 'var(--text-base)',
                  color: 'var(--muted-foreground)',
                }}
              >
                {weeklyEdition.newsItems.length} articles sélectionnés pour vous
              </p>
            </motion.div>

            {/* News Items Grid */}
            <div className="space-y-6">
              {weeklyEdition.newsItems.map((item, index) => (
                <motion.div
                  key={item.id}
                  onClick={() => handleReadArticle(item)}
                  className="p-8 rounded-3xl cursor-pointer relative overflow-hidden group"
                  style={{
                    background: 'rgba(255, 255, 255, 0.8)',
                    border: '1px solid var(--border)',
                    backdropFilter: 'blur(10px)',
                    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.06)',
                  }}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    delay: 0.4 + index * 0.08,
                    duration: 0.5,
                    ease: [0.25, 0.46, 0.45, 0.94],
                  }}
                  whileHover={{
                    scale: 1.015,
                    y: -4,
                    boxShadow: '0 12px 48px rgba(85, 161, 180, 0.15), 0 0 0 1px rgba(85, 161, 180, 0.1)',
                    transition: {
                      duration: 0.3,
                      ease: [0.25, 0.46, 0.45, 0.94],
                    },
                  }}
                  whileTap={{
                    scale: 0.995,
                    transition: { duration: 0.1 },
                  }}
                >
                  {/* Subtle Gradient Glow on Hover */}
                  <motion.div
                    className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 pointer-events-none"
                    style={{
                      background: 'rgba(85, 161, 180, 0.06)',
                    }}
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: 1 }}
                    transition={{ duration: 0.4, ease: 'easeOut' }}
                  />

                  {/* Content */}
                  <div className="relative z-10">
                    {/* Title */}
                    <motion.h3
                      className="mb-3"
                      style={{
                        fontFamily: 'var(--font-display)',
                        fontSize: 'var(--text-2xl)',
                        fontWeight: 'var(--font-weight-bold)',
                        color: 'var(--foreground)',
                        lineHeight: 'var(--leading-tight)',
                      }}
                      initial={{ color: 'var(--foreground)' }}
                      whileHover={{
                        color: 'var(--primary)',
                        transition: { duration: 0.3 },
                      }}
                    >
                      {item.title}
                    </motion.h3>

                    {/* Meta Info */}
                    <div className="flex flex-wrap items-center gap-3 mb-4">
                      <span
                        style={{
                          fontFamily: 'var(--font-body)',
                          fontSize: 'var(--text-sm)',
                          color: 'var(--muted-foreground)',
                          fontWeight: 'var(--font-weight-medium)',
                        }}
                      >
                        {item.url ? item.author : 'The Learning Society'}
                      </span>
                      <span style={{ color: 'var(--border)' }}>•</span>
                      <div className="flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5" style={{ color: 'var(--muted-foreground)' }} />
                        <span
                          style={{
                            fontFamily: 'var(--font-body)',
                            fontSize: 'var(--text-sm)',
                            color: 'var(--muted-foreground)',
                          }}
                        >
                          {item.publishDate}
                        </span>
                      </div>
                      <span style={{ color: 'var(--border)' }}>•</span>
                      <div className="flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5" style={{ color: 'var(--muted-foreground)' }} />
                        <span
                          style={{
                            fontFamily: 'var(--font-body)',
                            fontSize: 'var(--text-sm)',
                            color: 'var(--muted-foreground)',
                          }}
                        >
                          {item.readTime}
                        </span>
                      </div>
                    </div>

                    {/* Summary */}
                    <p
                      style={{
                        fontFamily: 'var(--font-body)',
                        fontSize: 'var(--text-base)',
                        lineHeight: 'var(--leading-relaxed)',
                        color: 'var(--muted-foreground)',
                      }}
                    >
                      {item.summary}
                    </p>
                  </div>

                  {/* Hover Indicator - Subtle Arrow */}
                  <motion.div
                    className="absolute bottom-8 right-8 opacity-0 group-hover:opacity-100"
                    initial={{ opacity: 0, x: -8 }}
                    whileHover={{
                      opacity: 1,
                      x: 0,
                      transition: { duration: 0.3, ease: 'easeOut' },
                    }}
                  >
                    <ChevronRight
                      className="w-5 h-5"
                      style={{ color: 'var(--primary)' }}
                    />
                  </motion.div>
                </motion.div>
              ))}
            </div>

            {/* Newsletter Footer */}
            <motion.div
              className="mt-16 p-10 rounded-3xl text-center"
              style={{
                background: 'linear-gradient(135deg, rgba(85, 161, 180, 0.1) 0%, rgba(237, 132, 58, 0.1) 100%)',
                border: '2px solid rgba(85, 161, 180, 0.2)',
              }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <Mail className="w-12 h-12 mx-auto mb-4" style={{ color: 'var(--primary)' }} />
              <h3
                className="mb-3"
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 'var(--text-2xl)',
                  fontWeight: 'var(--font-weight-bold)',
                  color: 'var(--foreground)',
                }}
              >
                À la semaine prochaine !
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
                Restez à l'affût des dernières tendances en formation et développement professionnel
              </p>
              <motion.button
                onClick={onBack}
                className="px-6 py-3 rounded-xl inline-flex items-center gap-2"
                style={{
                  background: 'var(--primary)',
                  color: 'white',
                  fontFamily: 'var(--font-body)',
                  fontSize: 'var(--text-base)',
                  fontWeight: 'var(--font-weight-semibold)',
                  boxShadow: '0 4px 12px rgba(85, 161, 180, 0.3)',
                }}
                whileHover={{ scale: 1.05, boxShadow: '0 6px 20px rgba(85, 161, 180, 0.4)' }}
                whileTap={{ scale: 0.98 }}
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Retour aux newsletters</span>
              </motion.button>
            </motion.div>
          </div>
        </main>
      </div>
    </div>
  );
}
