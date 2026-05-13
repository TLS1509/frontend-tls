import React, { useState, useRef } from 'react';
import { X, Play, Pause, Volume2, VolumeX, Maximize, Download, Share2, Clock } from 'lucide-react';

/**
 * VideoPlayerModal — Lecteur vidéo plein écran
 * Pour tutoriels, leçons vidéo et contenu Veille
 */

interface VideoPlayerModalProps {
  isOpen: boolean;
  onClose: () => void;
  videoUrl?: string;
  posterUrl?: string;
  title?: string;
  duration?: string;
  instructor?: string;
  description?: string;
  onDownload?: () => void;
}

export const VideoPlayerModal: React.FC<VideoPlayerModalProps> = ({
  isOpen,
  onClose,
  videoUrl,
  posterUrl,
  title = 'Introduction au Prompt Engineering',
  duration = '12:34',
  instructor = 'Sophie Martin',
  description = 'Découvrez les fondamentaux du prompt engineering et comment structurer vos demandes pour obtenir des résultats optimaux.',
  onDownload,
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState('0:00');

  if (!isOpen) return null;

  const togglePlay = () => {
    if (!videoRef.current) {
      setIsPlaying((p) => !p);
      return;
    }
    if (isPlaying) {
      videoRef.current.pause();
    } else {
      videoRef.current.play();
    }
    setIsPlaying((p) => !p);
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
    }
    setIsMuted((m) => !m);
  };

  const handleTimeUpdate = () => {
    if (!videoRef.current) return;
    const pct = (videoRef.current.currentTime / videoRef.current.duration) * 100;
    setProgress(pct);
    const mins = Math.floor(videoRef.current.currentTime / 60);
    const secs = Math.floor(videoRef.current.currentTime % 60);
    setCurrentTime(`${mins}:${secs.toString().padStart(2, '0')}`);
  };

  const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!videoRef.current) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const pct = (e.clientX - rect.left) / rect.width;
    videoRef.current.currentTime = pct * videoRef.current.duration;
  };

  const handleClose = () => {
    setIsPlaying(false);
    setProgress(0);
    setCurrentTime('0:00');
    onClose();
  };

  const CONTROL_BTN_CLASS = 'bg-transparent border-0 cursor-pointer text-white/70 flex items-center p-0 hover:text-white transition-colors';

  return (
    <div
      onClick={handleClose}
      className="fixed inset-0 flex items-center justify-center p-4 z-modal bg-black/85 animate-vp-bd-in"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-[860px] bg-[#0f1117] rounded-2xl border border-white/8 shadow-[0_40px_80px_rgba(0,0,0,0.6)] overflow-hidden animate-vp-in"
      >
        {/* Close button */}
        <button
          onClick={handleClose}
          className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/12 border border-white/15 flex items-center justify-center cursor-pointer text-white z-10 transition-all hover:bg-white/22 p-0"
          aria-label="Fermer"
        >
          <X size={14} />
        </button>

        {/* Video area */}
        <div className="relative aspect-video bg-black overflow-hidden">
          {videoUrl ? (
            <video
              ref={videoRef}
              src={videoUrl}
              poster={posterUrl}
              onTimeUpdate={handleTimeUpdate}
              onEnded={() => setIsPlaying(false)}
              className="w-full h-full object-contain"
            />
          ) : (
            /* Demo poster / placeholder */
            <div className="w-full h-full bg-gradient-to-br from-[#0f1117] to-[#1a1f2e] flex items-center justify-center flex-col gap-4">
              {/* Decorative glow */}
              <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_50%_50%,rgba(85,161,180,0.12)_0%,transparent_70%)]" />
              <div className="w-20 h-20 rounded-full bg-white/8 border border-white/12 flex items-center justify-center relative z-10 text-white/80">
                {isPlaying
                  ? <Pause size={32} />
                  : <Play size={32} className="ml-1" />
                }
              </div>
              <p className="text-white/40 text-caption relative z-10">
                {isPlaying ? '▶ Lecture en cours…' : 'Cliquez pour lancer la vidéo'}
              </p>
            </div>
          )}

          {/* Centered play overlay */}
          <button
            onClick={togglePlay}
            className="absolute inset-0 bg-transparent border-0 cursor-pointer flex items-center justify-center"
            aria-label={isPlaying ? 'Pause' : 'Lecture'}
          />
        </div>

        {/* Controls bar */}
        <div className="bg-black/60 backdrop-blur-glass-light py-3 px-4 flex flex-col gap-2">
          {/* Progress bar */}
          <div
            onClick={handleSeek}
            className="w-full h-1 bg-white/15 rounded-pill cursor-pointer relative"
          >
            <div
              className="h-full bg-primary-400 rounded-pill transition-[width] duration-100 relative"
              style={{ width: `${progress}%` }}
            >
              <div className="absolute -right-[5px] top-1/2 -translate-y-1/2 w-2.5 h-2.5 rounded-full bg-white shadow-[0_0_6px_rgba(85,161,180,0.6)]" />
            </div>
          </div>

          {/* Controls row */}
          <div className="flex items-center gap-3 text-white/70">
            <button onClick={togglePlay} className={`${CONTROL_BTN_CLASS} text-white`}>
              {isPlaying ? <Pause size={18} /> : <Play size={18} />}
            </button>
            <button onClick={toggleMute} className={CONTROL_BTN_CLASS}>
              {isMuted ? <VolumeX size={16} /> : <Volume2 size={16} />}
            </button>
            <span className="text-[12px] text-white/50 flex items-center gap-1">
              <Clock size={11} /> {currentTime} / {duration}
            </span>
            <div className="flex-1" />
            {onDownload && (
              <button onClick={onDownload} className={CONTROL_BTN_CLASS}>
                <Download size={15} />
              </button>
            )}
            <button className={CONTROL_BTN_CLASS}>
              <Share2 size={15} />
            </button>
            <button className={CONTROL_BTN_CLASS}>
              <Maximize size={15} />
            </button>
          </div>
        </div>

        {/* Info panel */}
        <div className="p-5 bg-white border-t border-ink-200">
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1 min-w-0">
              <h3 className="text-body font-bold text-ink-900 mb-1">
                {title}
              </h3>
              <p className="text-caption text-ink-600 mb-2">
                Par {instructor} · {duration}
              </p>
              <p className="text-caption text-ink-600 leading-relaxed">
                {description}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoPlayerModal;
