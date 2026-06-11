import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  ArrowLeft,
  Play,
  Pause,
  Volume2,
  VolumeX,
  Heart,
  Bookmark,
  BookmarkCheck,
  User,
  ChevronUp,
  ChevronDown,
} from 'lucide-react';
import { BackgroundBlobs } from '../components/ui/background-blobs';
import OptimizedSidebar from '../components/ui/optimized-sidebar';
import { useToast, ToastContainer } from '../components/ui/notification-toast';
import { getVideoTutoriel, getVideosTutorielsPreviews } from '../data/veilleVideosData';

interface VideoReelsPageProps {
  videoId?: number;
  onNavigate: (page: string) => void;
  onBack: () => void;
  onLogout: () => void;
}

export default function VideoReelsPage({
  videoId = 1,
  onNavigate,
  onBack,
  onLogout,
}: VideoReelsPageProps) {
  const video = getVideoTutoriel(videoId);
  const allVideos = getVideosTutorielsPreviews().filter(v => v.format === 'vertical');
  const [currentVideoId, setCurrentVideoId] = useState(videoId);
  const [isSaved, setIsSaved] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
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
                <Play className="w-8 h-8" style={{ color: 'var(--accent)' }} />
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

  const currentVideo = getVideoTutoriel(currentVideoId) || video;
  const currentIndex = allVideos.findIndex(v => v.id === currentVideoId);

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

  const handlePlay = () => {
    setIsPlaying(!isPlaying);
  };

  const handleNextVideo = () => {
    if (currentIndex < allVideos.length - 1) {
      setCurrentVideoId(allVideos[currentIndex + 1].id);
      setIsPlaying(false);
    }
  };

  const handlePrevVideo = () => {
    if (currentIndex > 0) {
      setCurrentVideoId(allVideos[currentIndex - 1].id);
      setIsPlaying(false);
    }
  };

  return (
    <div className="flex h-screen overflow-hidden" style={{ background: '#000' }}>
      {/* Sidebar */}
      <OptimizedSidebar currentPage="veille" onNavigate={onNavigate} onLogout={onLogout} />

      {/* Main Content - Vertical Video Player */}
      <div className="flex-1 flex flex-col min-w-0 relative">
        {/* Back Button - Floating */}
        <div className="absolute top-6 left-6 z-30">
          <motion.button
            onClick={onBack}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl backdrop-blur-md"
            style={{
              background: 'rgba(0, 0, 0, 0.6)',
              color: 'white',
              fontFamily: 'var(--font-body)',
              fontSize: 'var(--text-sm)',
              fontWeight: 'var(--font-weight-medium)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
            }}
            whileHover={{ scale: 1.05, background: 'rgba(0, 0, 0, 0.8)' }}
            whileTap={{ scale: 0.95 }}
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Retour</span>
          </motion.button>
        </div>

        {/* Video Container - Full Screen */}
        <div className="flex-1 flex items-center justify-center relative">
          {/* Video Player */}
          <div
            className="relative"
            style={{
              width: '100%',
              maxWidth: '500px',
              height: '100vh',
              background: 'linear-gradient(135deg, #1a1a1a 0%, #0f0f0f 100%)',
            }}
          >
            {/* Placeholder Video Content */}
            <div className="absolute inset-0 flex items-center justify-center">
              <motion.button
                onClick={handlePlay}
                className="w-20 h-20 rounded-full flex items-center justify-center"
                style={{
                  background: 'var(--accent)',
                  boxShadow: '0 8px 32px rgba(237, 132, 58, 0.4)',
                }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                {isPlaying ? (
                  <Pause className="w-10 h-10" style={{ color: 'white' }} />
                ) : (
                  <Play className="w-10 h-10 ml-1" style={{ color: 'white' }} fill="white" />
                )}
              </motion.button>
            </div>

            {/* Top Gradient Overlay */}
            <div
              className="absolute top-0 left-0 right-0 p-6 z-20"
              style={{
                background: 'linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, transparent 100%)',
              }}
            >
              <div className="flex items-start justify-between">
                <div className="flex-1 pr-4">
                  <div className="flex items-center gap-2 mb-2">
                    <span style={{ fontSize: '20px', lineHeight: 1 }}>{currentVideo.emoji}</span>
                  </div>
                  <h2
                    style={{
                      fontFamily: 'var(--font-display)',
                      fontSize: 'var(--text-base)',
                      fontWeight: 'var(--font-weight-bold)',
                      color: 'white',
                      lineHeight: 'var(--leading-tight)',
                    }}
                  >
                    {currentVideo.title}
                  </h2>
                </div>
              </div>
            </div>

            {/* Bottom Info & Actions */}
            <div
              className="absolute bottom-0 left-0 right-0 p-6 z-20"
              style={{
                background: 'linear-gradient(to top, rgba(0,0,0,0.8) 0%, transparent 100%)',
              }}
            >
              {/* Video Info */}
              <div className="mb-6">
                <div className="flex items-center gap-3 mb-2">
                  <img
                    src={`https://ui-avatars.com/api/?name=${encodeURIComponent(currentVideo.instructor)}&background=ED843A&color=fff&size=40`}
                    alt={currentVideo.instructor}
                    className="w-10 h-10 rounded-full"
                  />
                  <div>
                    <p
                      style={{
                        fontFamily: 'var(--font-body)',
                        fontSize: 'var(--text-sm)',
                        fontWeight: 'var(--font-weight-semibold)',
                        color: 'white',
                      }}
                    >
                      {currentVideo.instructor}
                    </p>
                    <p
                      style={{
                        fontFamily: 'var(--font-body)',
                        fontSize: 'var(--text-xs)',
                        color: 'rgba(255, 255, 255, 0.7)',
                      }}
                    >
                      {currentVideo.duration}
                    </p>
                  </div>
                </div>

                <p
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: 'var(--text-sm)',
                    lineHeight: 'var(--leading-relaxed)',
                    color: 'rgba(255, 255, 255, 0.9)',
                  }}
                >
                  {currentVideo.description}
                </p>
              </div>

              {/* Volume Control */}
              <motion.button
                onClick={() => setIsMuted(!isMuted)}
                className="p-3 rounded-full mb-4"
                style={{
                  background: 'rgba(255, 255, 255, 0.1)',
                  backdropFilter: 'blur(10px)',
                }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                {isMuted ? (
                  <VolumeX className="w-5 h-5" style={{ color: 'white' }} />
                ) : (
                  <Volume2 className="w-5 h-5" style={{ color: 'white' }} />
                )}
              </motion.button>
            </div>

            {/* Right Side Actions */}
            <div className="absolute right-4 bottom-32 z-20 flex flex-col gap-4">
              {/* Like Button */}
              <motion.div className="flex flex-col items-center">
                <motion.button
                  onClick={handleLike}
                  className="p-3 rounded-full mb-1"
                  style={{
                    background: isLiked ? 'rgba(237, 132, 58, 0.3)' : 'rgba(255, 255, 255, 0.1)',
                    backdropFilter: 'blur(10px)',
                  }}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Heart
                    className={`w-6 h-6 ${isLiked ? 'fill-current' : ''}`}
                    style={{ color: isLiked ? 'var(--accent)' : 'white' }}
                  />
                </motion.button>
                <span
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: 'var(--text-xs)',
                    fontWeight: 'var(--font-weight-semibold)',
                    color: 'white',
                  }}
                >
                  {currentVideo.likes.toLocaleString()}
                </span>
              </motion.div>

              {/* Save Button */}
              <motion.div className="flex flex-col items-center">
                <motion.button
                  onClick={handleSave}
                  className="p-3 rounded-full mb-1"
                  style={{
                    background: isSaved ? 'rgba(237, 132, 58, 0.3)' : 'rgba(255, 255, 255, 0.1)',
                    backdropFilter: 'blur(10px)',
                  }}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  {isSaved ? (
                    <BookmarkCheck className="w-6 h-6" style={{ color: 'var(--accent)' }} />
                  ) : (
                    <Bookmark className="w-6 h-6" style={{ color: 'white' }} />
                  )}
                </motion.button>
              </motion.div>
            </div>

            {/* Navigation Arrows - Left side */}
            <div className="absolute left-4 top-1/2 -translate-y-1/2 z-20 flex flex-col gap-4">
              {/* Previous Video */}
              {currentIndex > 0 && (
                <motion.button
                  onClick={handlePrevVideo}
                  className="p-3 rounded-full"
                  style={{
                    background: 'rgba(255, 255, 255, 0.1)',
                    backdropFilter: 'blur(10px)',
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                  }}
                  whileHover={{ scale: 1.1, background: 'rgba(255, 255, 255, 0.2)' }}
                  whileTap={{ scale: 0.9 }}
                >
                  <ChevronUp className="w-6 h-6" style={{ color: 'white' }} />
                </motion.button>
              )}

              {/* Next Video */}
              {currentIndex < allVideos.length - 1 && (
                <motion.button
                  onClick={handleNextVideo}
                  className="p-3 rounded-full"
                  style={{
                    background: 'rgba(255, 255, 255, 0.1)',
                    backdropFilter: 'blur(10px)',
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                  }}
                  whileHover={{ scale: 1.1, background: 'rgba(255, 255, 255, 0.2)' }}
                  whileTap={{ scale: 0.9 }}
                >
                  <ChevronDown className="w-6 h-6" style={{ color: 'white' }} />
                </motion.button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Toast Container */}
      <ToastContainer toasts={toasts} onRemove={removeToast} />
    </div>
  );
}