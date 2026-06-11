import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  ArrowLeft,
  Heart,
  Bookmark,
  BookmarkCheck,
  Clock,
  Download,
  ChevronRight,
  FileText,
  Code,
  ExternalLink,
  Maximize2,
} from 'lucide-react';
import { BackgroundBlobs } from '../components/ui/background-blobs';
import OptimizedSidebar from '../components/ui/optimized-sidebar';
import { useToast, ToastContainer } from '../components/ui/notification-toast';
import { getVideoTutoriel } from '../data/veilleVideosData';
import VimeoPlayer, { VideoPlayerModal } from '../components/video/VimeoPlayer';

interface VideoTutorialPageProps {
  videoId?: number;
  onNavigate: (page: string) => void;
  onBack: () => void;
  onLogout: () => void;
}

export default function VideoTutorialPage({
  videoId = 1,
  onNavigate,
  onBack,
  onLogout,
}: VideoTutorialPageProps) {
  const video = getVideoTutoriel(videoId);
  const [isSaved, setIsSaved] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [showTranscript, setShowTranscript] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { toasts, success, removeToast } = useToast();

  if (!video) {
    return (
      <div className="flex h-screen overflow-hidden" style={{ background: 'var(--background)' }}>
        <BackgroundBlobs />
        <OptimizedSidebar currentPage="veille" onNavigate={onNavigate} onLogout={onLogout} />
        <div className="flex-1 flex flex-col min-w-0">
          <main className="flex-1 overflow-y-auto flex items-center justify-center">
            <div className="text-center">
              <div
                className="w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center"
                style={{ background: 'rgba(237, 132, 58, 0.1)' }}
              >
                <FileText className="w-8 h-8" style={{ color: 'var(--accent)' }} />
              </div>
              <p
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 'var(--text-xl)',
                  fontWeight: 'var(--font-weight-bold)',
                  color: 'var(--foreground)',
                }}
              >
                Vidéo non trouvée
              </p>
            </div>
          </main>
        </div>
      </div>
    );
  }

  const handleSave = () => {
    setIsSaved(!isSaved);
    success(
      isSaved ? 'Retiré des favoris' : 'Vidéo sauvegardée',
      isSaved ? 'La vidéo a été retirée de vos favoris' : 'Retrouvez cette vidéo dans vos favoris',
      2000
    );
  };

  const handleLike = () => {
    setIsLiked(!isLiked);
    success(
      isLiked ? 'Like retiré' : 'Vidéo likée',
      isLiked ? 'Vous n\'aimez plus cette vidéo' : 'Merci pour votre soutien !',
      2000
    );
  };

  return (
    <div className="flex h-screen overflow-hidden" style={{ background: 'var(--background)' }}>
      {/* Background Effects */}
      <BackgroundBlobs />
      <ToastContainer toasts={toasts} onRemove={removeToast} />

      {/* Sidebar */}
      <OptimizedSidebar currentPage="veille" onNavigate={onNavigate} onLogout={onLogout} />

      {/* Video Player Modal */}
      <VideoPlayerModal
        videoId="76979871" // Example Vimeo ID - Replace with actual
        title={video.title}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />

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
              <div className="max-w-7xl mx-auto px-6 py-4">
                <div className="flex items-center justify-between">
                  {/* Back Button */}
                  <motion.button
                    onClick={onBack}
                    className="flex items-center gap-2 px-4 py-2 rounded-xl transition-colors duration-200"
                    style={{
                      background: 'rgba(237, 132, 58, 0.1)',
                      color: 'var(--accent)',
                      fontFamily: 'var(--font-body)',
                      fontSize: 'var(--text-sm)',
                      fontWeight: 'var(--font-weight-medium)',
                    }}
                    whileHover={{ scale: 1.02, background: 'rgba(237, 132, 58, 0.15)' }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <ArrowLeft className="w-4 h-4" />
                    <span>Retour</span>
                  </motion.button>

                  {/* Actions */}
                  <div className="flex items-center gap-2">
                    {/* Like Button */}
                    <motion.button
                      onClick={handleLike}
                      className="flex items-center gap-2 px-4 py-2 rounded-xl transition-all duration-200"
                      style={{
                        background: isLiked ? 'rgba(237, 132, 58, 0.12)' : 'transparent',
                        color: isLiked ? 'var(--accent)' : 'var(--muted-foreground)',
                      }}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Heart className={`w-5 h-5 ${isLiked ? 'fill-current' : ''}`} />
                      <span
                        style={{
                          fontFamily: 'var(--font-body)',
                          fontSize: 'var(--text-sm)',
                          fontWeight: 'var(--font-weight-medium)',
                        }}
                      >
                        {video.likes.toLocaleString()}
                      </span>
                    </motion.button>

                    {/* Save Button */}
                    <motion.button
                      onClick={handleSave}
                      className="p-2.5 rounded-xl transition-all duration-200"
                      style={{
                        background: isSaved ? 'rgba(237, 132, 58, 0.12)' : 'transparent',
                        color: isSaved ? 'var(--accent)' : 'var(--muted-foreground)',
                      }}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      {isSaved ? <BookmarkCheck className="w-5 h-5" /> : <Bookmark className="w-5 h-5" />}
                    </motion.button>
                  </div>
                </div>
              </div>
            </div>

            {/* Video Player Section - CENTERED WITH AMPLE SPACE */}
            <div className="max-w-5xl mx-auto px-6 lg:px-12 pt-8 pb-12">
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
                  Veille & Apprentissage
                </span>
                <ChevronRight className="w-4 h-4" style={{ color: 'var(--muted-foreground)' }} />
                <span
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: 'var(--text-sm)',
                    color: 'var(--accent)',
                    fontWeight: 'var(--font-weight-medium)',
                  }}
                >
                  {video.category}
                </span>
              </motion.div>

              {/* Video Player Container */}
              <motion.div
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="mb-8"
              >
                <div 
                  className="relative"
                  style={{
                    boxShadow: '0 20px 60px rgba(0, 0, 0, 0.25)',
                    borderRadius: 'var(--radius-3xl)',
                  }}
                >
                  {/* Vimeo Player with fullscreen callback */}
                  <VimeoPlayer
                    videoId="76979871" // Example Vimeo ID - Replace with actual from video.videoUrl
                    title={video.title}
                    showControls={true}
                    onFullscreenClick={() => setIsModalOpen(true)}
                  />
                </div>
              </motion.div>

              {/* Video Info */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                {/* Category Badge & Duration */}
                <div className="flex items-center gap-3 mb-4">
                  <span style={{ fontSize: '24px', lineHeight: 1 }}>{video.emoji}</span>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4" style={{ color: 'var(--muted-foreground)' }} />
                    <span
                      style={{
                        fontFamily: 'var(--font-body)',
                        fontSize: 'var(--text-sm)',
                        color: 'var(--muted-foreground)',
                        fontWeight: 'var(--font-weight-medium)',
                      }}
                    >
                      {video.duration}
                    </span>
                  </div>
                </div>

                {/* Title */}
                <h1
                  className="mb-4"
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: 'clamp(1.75rem, 4vw, 2.5rem)',
                    fontWeight: 'var(--font-weight-bold)',
                    lineHeight: 'var(--leading-tight)',
                    color: 'var(--foreground)',
                  }}
                >
                  {video.title}
                </h1>

                {/* Description */}
                <p
                  className="mb-6"
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: 'var(--text-base)',
                    lineHeight: 'var(--leading-relaxed)',
                    color: 'var(--muted-foreground)',
                  }}
                >
                  {video.description}
                </p>

                {/* Stats */}
                <div className="flex flex-wrap items-center gap-6 mb-8 pb-8 border-b" style={{ borderColor: 'var(--border)' }}>
                  <div className="flex items-center gap-2">
                    <div
                      className="w-8 h-8 rounded-full flex items-center justify-center"
                      style={{ background: 'rgba(237, 132, 58, 0.1)' }}
                    >
                      <Heart className="w-4 h-4" style={{ color: 'var(--accent)' }} />
                    </div>
                    <span
                      style={{
                        fontFamily: 'var(--font-body)',
                        fontSize: 'var(--text-sm)',
                        color: 'var(--foreground)',
                        fontWeight: 'var(--font-weight-medium)',
                      }}
                    >
                      {video.likes.toLocaleString()} likes
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <div
                      className="w-8 h-8 rounded-full flex items-center justify-center"
                      style={{ background: 'rgba(85, 161, 180, 0.1)' }}
                    >
                      <FileText className="w-4 h-4" style={{ color: 'var(--primary)' }} />
                    </div>
                    <span
                      style={{
                        fontFamily: 'var(--font-body)',
                        fontSize: 'var(--text-sm)',
                        color: 'var(--foreground)',
                        fontWeight: 'var(--font-weight-medium)',
                      }}
                    >
                      {video.views.toLocaleString()} vues
                    </span>
                  </div>
                </div>

                {/* Key Points */}
                {video.keyPoints && video.keyPoints.length > 0 && (
                  <div className="mb-8">
                    <h3
                      className="mb-4"
                      style={{
                        fontFamily: 'var(--font-display)',
                        fontSize: 'var(--text-lg)',
                        fontWeight: 'var(--font-weight-bold)',
                        color: 'var(--foreground)',
                      }}
                    >
                      Points clés
                    </h3>
                    <div className="space-y-3">
                      {video.keyPoints.map((point, index) => (
                        <motion.div
                          key={index}
                          className="flex items-start gap-3 p-4 rounded-2xl"
                          style={{
                            background: 'rgba(85, 161, 180, 0.05)',
                            border: '1px solid rgba(85, 161, 180, 0.1)',
                          }}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.3 + index * 0.1 }}
                        >
                          <div
                            className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
                            style={{
                              background: 'var(--primary)',
                              color: 'white',
                              fontFamily: 'var(--font-body)',
                              fontSize: 'var(--text-xs)',
                              fontWeight: 'var(--font-weight-bold)',
                            }}
                          >
                            {index + 1}
                          </div>
                          <p
                            style={{
                              fontFamily: 'var(--font-body)',
                              fontSize: 'var(--text-sm)',
                              color: 'var(--foreground)',
                              lineHeight: 'var(--leading-relaxed)',
                            }}
                          >
                            {point}
                          </p>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Resources */}
                {video.resources && video.resources.length > 0 && (
                  <div className="mb-8">
                    <h3
                      className="mb-4"
                      style={{
                        fontFamily: 'var(--font-display)',
                        fontSize: 'var(--text-lg)',
                        fontWeight: 'var(--font-weight-bold)',
                        color: 'var(--foreground)',
                      }}
                    >
                      Ressources
                    </h3>
                    <div className="space-y-3">
                      {video.resources.map((resource, index) => (
                        <motion.a
                          key={index}
                          href={resource.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center justify-between p-4 rounded-2xl group"
                          style={{
                            background: 'rgba(248, 176, 68, 0.05)',
                            border: '1px solid rgba(248, 176, 68, 0.15)',
                          }}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          <div className="flex items-center gap-3">
                            <div
                              className="p-2 rounded-xl"
                              style={{ background: 'rgba(248, 176, 68, 0.1)' }}
                            >
                              {resource.type === 'code' ? (
                                <Code className="w-5 h-5" style={{ color: 'var(--accent)' }} />
                              ) : (
                                <Download className="w-5 h-5" style={{ color: 'var(--accent)' }} />
                              )}
                            </div>
                            <div>
                              <p
                                style={{
                                  fontFamily: 'var(--font-body)',
                                  fontSize: 'var(--text-sm)',
                                  fontWeight: 'var(--font-weight-semibold)',
                                  color: 'var(--foreground)',
                                }}
                              >
                                {resource.title}
                              </p>
                              <p
                                style={{
                                  fontFamily: 'var(--font-body)',
                                  fontSize: 'var(--text-xs)',
                                  color: 'var(--muted-foreground)',
                                }}
                              >
                                {resource.description}
                              </p>
                            </div>
                          </div>
                          <ExternalLink
                            className="w-5 h-5 opacity-0 group-hover:opacity-100 transition-opacity"
                            style={{ color: 'var(--accent)' }}
                          />
                        </motion.a>
                      ))}
                    </div>
                  </div>
                )}

                {/* Transcript Toggle */}
                <motion.button
                  onClick={() => setShowTranscript(!showTranscript)}
                  className="w-full p-4 rounded-2xl flex items-center justify-between mb-4"
                  style={{
                    background: 'rgba(85, 161, 180, 0.08)',
                    border: '1px solid rgba(85, 161, 180, 0.15)',
                  }}
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                >
                  <div className="flex items-center gap-3">
                    <FileText className="w-5 h-5" style={{ color: 'var(--primary)' }} />
                    <span
                      style={{
                        fontFamily: 'var(--font-body)',
                        fontSize: 'var(--text-sm)',
                        fontWeight: 'var(--font-weight-semibold)',
                        color: 'var(--foreground)',
                      }}
                    >
                      {showTranscript ? 'Masquer' : 'Afficher'} la transcription
                    </span>
                  </div>
                  <ChevronRight
                    className={`w-5 h-5 transition-transform ${showTranscript ? 'rotate-90' : ''}`}
                    style={{ color: 'var(--muted-foreground)' }}
                  />
                </motion.button>

                {/* Transcript Content */}
                <AnimatePresence>
                  {showTranscript && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="p-6 rounded-2xl"
                      style={{
                        background: 'rgba(85, 161, 180, 0.03)',
                        border: '1px solid rgba(85, 161, 180, 0.1)',
                      }}
                    >
                      <p
                        style={{
                          fontFamily: 'var(--font-body)',
                          fontSize: 'var(--text-sm)',
                          lineHeight: 'var(--leading-relaxed)',
                          color: 'var(--muted-foreground)',
                        }}
                      >
                        Transcription complète de la vidéo disponible ici...
                        {/* Add actual transcript content */}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
