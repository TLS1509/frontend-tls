import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Play,
  Pause,
  Volume2,
  VolumeX,
  Maximize,
  Minimize,
  Settings,
  Subtitles,
  X,
} from 'lucide-react';

interface VimeoPlayerProps {
  videoId: string; // Vimeo video ID
  title?: string;
  autoplay?: boolean;
  onFullscreenClick?: () => void;
  showControls?: boolean;
  className?: string;
}

export default function VimeoPlayer({
  videoId,
  title = 'Vidéo',
  autoplay = false,
  onFullscreenClick,
  showControls = true,
  className = '',
}: VimeoPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(autoplay);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(100);
  const [showSettings, setShowSettings] = useState(false);
  const [playbackSpeed, setPlaybackSpeed] = useState(1);
  const [showSubtitles, setShowSubtitles] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showVolumeSlider, setShowVolumeSlider] = useState(false);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const playbackSpeeds = [0.5, 0.75, 1, 1.25, 1.5, 1.75, 2];

  // Build Vimeo embed URL with parameters
  const getVimeoUrl = () => {
    const params = new URLSearchParams({
      autoplay: autoplay ? '1' : '0',
      muted: isMuted ? '1' : '0',
      controls: '0', // We use custom controls
      title: '0',
      byline: '0',
      portrait: '0',
      speed: '1', // Enable speed controls in API
      transparent: '0',
      texttrack: showSubtitles ? 'en' : '',
    });
    
    return `https://player.vimeo.com/video/${videoId}?${params.toString()}`;
  };

  // Post message to Vimeo player
  const postToPlayer = (action: string, value?: any) => {
    if (!iframeRef.current) return;
    
    const data = value !== undefined 
      ? { method: action, value } 
      : { method: action };
    
    iframeRef.current.contentWindow?.postMessage(
      JSON.stringify(data),
      'https://player.vimeo.com'
    );
  };

  const handlePlayPause = () => {
    postToPlayer(isPlaying ? 'pause' : 'play');
    setIsPlaying(!isPlaying);
  };

  const handleMute = () => {
    const newMuted = !isMuted;
    setIsMuted(newMuted);
    postToPlayer('setVolume', newMuted ? 0 : volume / 100);
  };

  const handleVolumeChange = (newVolume: number) => {
    setVolume(newVolume);
    setIsMuted(newVolume === 0);
    postToPlayer('setVolume', newVolume / 100);
  };

  const handleSpeedChange = (speed: number) => {
    setPlaybackSpeed(speed);
    postToPlayer('setPlaybackRate', speed);
    setShowSettings(false);
  };

  const handleFullscreen = () => {
    // If a custom fullscreen handler is provided, use it (e.g., to open a modal)
    if (onFullscreenClick) {
      onFullscreenClick();
      return;
    }

    // Otherwise, try to use the browser's fullscreen API on the iframe
    if (iframeRef.current) {
      const iframe = iframeRef.current as any;
      
      try {
        if (!document.fullscreenElement) {
          // Request fullscreen
          if (iframe.requestFullscreen) {
            iframe.requestFullscreen();
          } else if (iframe.webkitRequestFullscreen) {
            iframe.webkitRequestFullscreen();
          } else if (iframe.mozRequestFullScreen) {
            iframe.mozRequestFullScreen();
          } else if (iframe.msRequestFullscreen) {
            iframe.msRequestFullscreen();
          }
        } else {
          // Exit fullscreen
          if (document.exitFullscreen) {
            document.exitFullscreen();
          } else if ((document as any).webkitExitFullscreen) {
            (document as any).webkitExitFullscreen();
          } else if ((document as any).mozCancelFullScreen) {
            (document as any).mozCancelFullScreen();
          } else if ((document as any).msExitFullscreen) {
            (document as any).msExitFullscreen();
          }
        }
      } catch (error) {
        // If fullscreen fails, fallback to Vimeo's fullscreen via postMessage
        console.warn('Fullscreen API failed, using Vimeo API:', error);
        postToPlayer('requestFullscreen');
      }
    }
  };

  const handleSubtitles = () => {
    const newShowSubtitles = !showSubtitles;
    setShowSubtitles(newShowSubtitles);
    postToPlayer('enableTextTrack', newShowSubtitles);
  };

  // Listen for fullscreen changes on the iframe
  useEffect(() => {
    const handleFullscreenChange = () => {
      const isCurrentlyFullscreen = !!(
        document.fullscreenElement ||
        (document as any).webkitFullscreenElement ||
        (document as any).mozFullScreenElement ||
        (document as any).msFullscreenElement
      );
      setIsFullscreen(isCurrentlyFullscreen);
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    document.addEventListener('webkitfullscreenchange', handleFullscreenChange);
    document.addEventListener('mozfullscreenchange', handleFullscreenChange);
    document.addEventListener('MSFullscreenChange', handleFullscreenChange);
    
    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
      document.removeEventListener('webkitfullscreenchange', handleFullscreenChange);
      document.removeEventListener('mozfullscreenchange', handleFullscreenChange);
      document.removeEventListener('MSFullscreenChange', handleFullscreenChange);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className={`relative group ${className}`}
      style={{
        background: '#000',
        borderRadius: isFullscreen ? '0' : 'var(--radius-3xl)',
        overflow: 'hidden',
      }}
    >
      {/* Vimeo iframe */}
      <iframe
        ref={iframeRef}
        src={getVimeoUrl()}
        className="w-full h-full"
        allow="autoplay; fullscreen; picture-in-picture; accelerometer; gyroscope"
        allowFullScreen
        title={title}
        style={{
          aspectRatio: '16/9',
          border: 'none',
        }}
      />

      {/* Custom Controls Overlay */}
      {showControls && (
        <AnimatePresence>
          <motion.div
            className="absolute bottom-0 left-0 right-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            style={{
              background: 'linear-gradient(to top, rgba(0,0,0,0.8) 0%, transparent 100%)',
            }}
          >
            {/* Progress Bar Placeholder - Would need Vimeo API integration for real progress */}
            <div
              className="w-full h-1 mb-4 rounded-full overflow-hidden cursor-pointer"
              style={{ background: 'rgba(255,255,255,0.3)' }}
            >
              <div
                className="h-full rounded-full"
                style={{
                  background: 'var(--accent)',
                  width: '30%', // Placeholder
                }}
              />
            </div>

            {/* Controls Row */}
            <div className="flex items-center justify-between gap-4">
              {/* Left Controls */}
              <div className="flex items-center gap-3">
                {/* Play/Pause */}
                <motion.button
                  onClick={handlePlayPause}
                  className="p-2 rounded-lg hover:bg-white/20 transition-colors"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {isPlaying ? (
                    <Pause className="w-5 h-5 text-white" />
                  ) : (
                    <Play className="w-5 h-5 text-white" />
                  )}
                </motion.button>

                {/* Volume */}
                <div
                  className="relative flex items-center gap-2"
                  onMouseEnter={() => setShowVolumeSlider(true)}
                  onMouseLeave={() => setShowVolumeSlider(false)}
                >
                  <motion.button
                    onClick={handleMute}
                    className="p-2 rounded-lg hover:bg-white/20 transition-colors"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {isMuted || volume === 0 ? (
                      <VolumeX className="w-5 h-5 text-white" />
                    ) : (
                      <Volume2 className="w-5 h-5 text-white" />
                    )}
                  </motion.button>

                  {/* Volume Slider */}
                  <AnimatePresence>
                    {showVolumeSlider && (
                      <motion.div
                        initial={{ opacity: 0, width: 0 }}
                        animate={{ opacity: 1, width: '80px' }}
                        exit={{ opacity: 0, width: 0 }}
                        className="flex items-center"
                      >
                        <input
                          type="range"
                          min="0"
                          max="100"
                          value={volume}
                          onChange={(e) => handleVolumeChange(Number(e.target.value))}
                          className="w-full h-1 rounded-full appearance-none cursor-pointer"
                          style={{
                            background: `linear-gradient(to right, var(--accent) 0%, var(--accent) ${volume}%, rgba(255,255,255,0.3) ${volume}%, rgba(255,255,255,0.3) 100%)`,
                          }}
                        />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Time Display */}
                <span
                  style={{
                    color: 'white',
                    fontFamily: 'var(--font-body)',
                    fontSize: 'var(--text-sm)',
                  }}
                >
                  0:00 / 0:00
                </span>
              </div>

              {/* Right Controls */}
              <div className="flex items-center gap-2">
                {/* Subtitles */}
                <motion.button
                  onClick={handleSubtitles}
                  className={`p-2 rounded-lg transition-colors ${
                    showSubtitles ? 'bg-white/30' : 'hover:bg-white/20'
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  title="Sous-titres"
                >
                  <Subtitles className="w-5 h-5 text-white" />
                </motion.button>

                {/* Settings (Speed) */}
                <div className="relative">
                  <motion.button
                    onClick={() => setShowSettings(!showSettings)}
                    className={`p-2 rounded-lg transition-colors ${
                      showSettings ? 'bg-white/30' : 'hover:bg-white/20'
                    }`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    title="Vitesse de lecture"
                  >
                    <Settings className="w-5 h-5 text-white" />
                  </motion.button>

                  {/* Speed Menu */}
                  <AnimatePresence>
                    {showSettings && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        className="absolute bottom-full right-0 mb-2 rounded-xl overflow-hidden"
                        style={{
                          background: 'rgba(0, 0, 0, 0.9)',
                          backdropFilter: 'blur(20px)',
                          border: '1px solid rgba(255,255,255,0.1)',
                          minWidth: '120px',
                        }}
                      >
                        <div
                          className="px-3 py-2 border-b"
                          style={{
                            borderColor: 'rgba(255,255,255,0.1)',
                            color: 'rgba(255,255,255,0.6)',
                            fontFamily: 'var(--font-body)',
                            fontSize: 'var(--text-xs)',
                            fontWeight: 'var(--font-weight-semibold)',
                          }}
                        >
                          VITESSE
                        </div>
                        {playbackSpeeds.map((speed) => (
                          <motion.button
                            key={speed}
                            onClick={() => handleSpeedChange(speed)}
                            className="w-full px-3 py-2 text-left hover:bg-white/10 transition-colors"
                            style={{
                              color: playbackSpeed === speed ? 'var(--accent)' : 'white',
                              fontFamily: 'var(--font-body)',
                              fontSize: 'var(--text-sm)',
                              fontWeight:
                                playbackSpeed === speed
                                  ? 'var(--font-weight-semibold)'
                                  : 'var(--font-weight-normal)',
                            }}
                            whileHover={{ scale: 1.02 }}
                          >
                            {speed}x {playbackSpeed === speed && '✓'}
                          </motion.button>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Fullscreen */}
                <motion.button
                  onClick={handleFullscreen}
                  className="p-2 rounded-lg hover:bg-white/20 transition-colors"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  title="Plein écran"
                >
                  {isFullscreen ? (
                    <Minimize className="w-5 h-5 text-white" />
                  ) : (
                    <Maximize className="w-5 h-5 text-white" />
                  )}
                </motion.button>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      )}
    </div>
  );
}

// Modal Video Player Component
interface VideoPlayerModalProps {
  videoId: string;
  title: string;
  isOpen: boolean;
  onClose: () => void;
}

export function VideoPlayerModal({
  videoId,
  title,
  isOpen,
  onClose,
}: VideoPlayerModalProps) {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-[100] flex items-center justify-center p-4"
        style={{
          background: 'rgba(0, 0, 0, 0.95)',
          backdropFilter: 'blur(10px)',
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <motion.div
          className="relative w-full max-w-6xl"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close Button */}
          <motion.button
            onClick={onClose}
            className="absolute -top-12 right-0 p-2 rounded-xl hover:bg-white/10 transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <X className="w-6 h-6 text-white" />
          </motion.button>

          {/* Title */}
          <div className="mb-4">
            <h2
              style={{
                color: 'white',
                fontFamily: 'var(--font-display)',
                fontSize: 'var(--text-2xl)',
                fontWeight: 'var(--font-weight-bold)',
              }}
            >
              {title}
            </h2>
          </div>

          {/* Video Player */}
          <VimeoPlayer videoId={videoId} title={title} autoplay showControls />
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
