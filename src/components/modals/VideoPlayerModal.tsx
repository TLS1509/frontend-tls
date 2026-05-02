import React, { useState, useRef } from 'react';
import { X, Play, Pause, Volume2, VolumeX, Maximize, Download, Share2, Clock } from 'lucide-react';
import './modals.css';

/**
 * VideoPlayerModal — Lecteur vidéo plein écran
 * Pour tutoriels, leçons vidéo et contenu Veille
 * Tokens: TLS design system
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
      // Demo mode (no actual video)
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

  return (
    <>
      {/* Backdrop */}
      <div
        onClick={handleClose}
        className="modal__backdrop"
        style={{ background: 'rgba(0,0,0,0.85)', animation: 'vpBdIn 0.2s ease both' }}
      >
        <div
          onClick={(e) => e.stopPropagation()}
          className="modal--video modal__content"
        >
          {/* Close button */}
          <button
            onClick={handleClose}
            style={{
              position: 'absolute', top: 'var(--s-3)', right: 'var(--s-3)',
              width: 32, height: 32, borderRadius: '50%',
              background: 'rgba(255,255,255,0.12)', border: '1px solid rgba(255,255,255,0.15)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              cursor: 'pointer', color: '#fff', zIndex: 10,
              transition: 'all var(--dur-2)',
            }}
            onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,0.22)'; }}
            onMouseLeave={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,0.12)'; }}
          >
            <X size={14} />
          </button>

          {/* Video area */}
          <div className="modal__video-container">
            {videoUrl ? (
              <video
                ref={videoRef}
                src={videoUrl}
                poster={posterUrl}
                onTimeUpdate={handleTimeUpdate}
                onEnded={() => setIsPlaying(false)}
                style={{ width: '100%', height: '100%', objectFit: 'contain' }}
              />
            ) : (
              /* Demo poster / placeholder */
              <div className="modal__video-placeholder">
                {/* Decorative glow */}
                <div className="modal__video-glow" />
                <div className="modal__video-play-btn">
                  {isPlaying
                    ? <Pause size={32} style={{ color: 'rgba(255,255,255,0.8)' }} />
                    : <Play size={32} style={{ color: 'rgba(255,255,255,0.8)', marginLeft: 4 }} />
                  }
                </div>
                <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: 'var(--t-caption)', position: 'relative', zIndex: 1 }}>
                  {isPlaying ? '▶ Lecture en cours…' : 'Cliquez pour lancer la vidéo'}
                </p>
              </div>
            )}

            {/* Centered play overlay */}
            <button
              onClick={togglePlay}
              style={{
                position: 'absolute', inset: 0,
                background: 'transparent', border: 'none', cursor: 'pointer',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}
              aria-label={isPlaying ? 'Pause' : 'Lecture'}
            />
          </div>

          {/* Controls bar */}
          <div className="modal__video-controls">
            {/* Progress bar */}
            <div
              onClick={handleSeek}
              className="modal__progress-bar"
            >
              <div className="modal__progress-fill" style={{ width: `${progress}%` }}>
                <div className="modal__progress-handle" />
              </div>
            </div>

            {/* Controls row */}
            <div className="modal__controls-row">
              <button onClick={togglePlay} className="modal__control-btn" style={{ color: '#fff' }}>
                {isPlaying ? <Pause size={18} /> : <Play size={18} />}
              </button>
              <button onClick={toggleMute} className="modal__control-btn">
                {isMuted ? <VolumeX size={16} /> : <Volume2 size={16} />}
              </button>
              <span style={{ fontSize: '12px', color: 'rgba(255,255,255,0.5)', display: 'flex', alignItems: 'center', gap: 4 }}>
                <Clock size={11} /> {currentTime} / {duration}
              </span>
              <div style={{ flex: 1 }} />
              {onDownload && (
                <button onClick={onDownload} className="modal__control-btn">
                  <Download size={15} />
                </button>
              )}
              <button className="modal__control-btn">
                <Share2 size={15} />
              </button>
              <button className="modal__control-btn">
                <Maximize size={15} />
              </button>
            </div>
          </div>

          {/* Info panel */}
          <div style={{
            padding: 'var(--s-5) var(--s-5)',
            background: 'var(--surface)',
            borderTop: '1px solid var(--border)',
          }}>
            <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 'var(--s-4)' }}>
              <div style={{ flex: 1, minWidth: 0 }}>
                <h3 style={{ margin: '0 0 var(--s-1)', fontSize: 'var(--t-body)', fontWeight: 700, color: 'var(--text)' }}>
                  {title}
                </h3>
                <p style={{ margin: '0 0 var(--s-2)', fontSize: 'var(--t-caption)', color: 'var(--text-muted)' }}>
                  Par {instructor} · {duration}
                </p>
                <p style={{ margin: 0, fontSize: 'var(--t-caption)', color: 'var(--text-muted)', lineHeight: 1.5 }}>
                  {description}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes vpBdIn { from { opacity: 0 } to { opacity: 1 } }
        @keyframes vpIn {
          from { opacity: 0; transform: translateY(20px) scale(0.94); }
          to   { opacity: 1; transform: translateY(0) scale(1); }
        }
      `}</style>
    </>
  );
};

export default VideoPlayerModal;
