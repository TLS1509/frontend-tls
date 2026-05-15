/**
 * VideoViewer — lecteur vidéo avec transcription et vidéos connexes.
 *
 * Phase 14.2b refactor :
 *  - Header → <ViewerHeader> tone-aware (remplace ViewerOverlay)
 *  - Ton par défaut : primary (page Veille, pas de LessonContext)
 *  - Zone vidéo dark (bg-ink-950) préservée comme section de contenu
 *  - Contrôles player UI améliorés (touch targets 44px)
 *
 * Route : /veille/video/:id
 */

import React, { useRef, useState, useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from '../components/core/Card';
import { MetaPill } from '../components/ui/MetaPill';
import {
  Play, Pause, Volume2, VolumeX, Maximize2, FileText,
  Clock, User, ChevronDown, ChevronUp,
} from 'lucide-react';
import { ViewerHeader } from '../components/patterns/ViewerHeader';

interface VideoData {
  id: string;
  title: string;
  instructor: string;
  duration: string;
  description: string;
  transcript: string;
  relatedVideos: Array<{ id: string; title: string; duration: string }>;
}

const VIDEO_DATA: VideoData = {
  id: 'video-1',
  title: 'Motivation et Engagement: Les fondamentaux',
  instructor: 'Marie Dubois',
  duration: '24 min',
  description:
    "Découvrez les mécanismes psychologiques qui sous-tendent la motivation au travail et comment créer les conditions d'un engagement durable.",
  transcript: `Bonjour et bienvenue dans ce module sur la motivation et l'engagement.

Au cours des prochaines minutes, nous allons explorer ensemble les fondements de la motivation, tant intrinsèque qu'extrinsèque.

La motivation intrinsèque - c'est la capacité à agir motivé par des récompenses internes: l'intérêt, la satisfaction personnelle, le sentiment d'accomplissement.

La motivation extrinsèque, en revanche, dépend de récompenses externes: argent, reconnaissance, évitement de punitions.

La recherche en psychologie - notamment les travaux de Deci et Ryan sur la théorie de l'autodétermination - nous montre que la motivation intrinsèque est beaucoup plus puissante et durable que la motivation extrinsèque.

Pour créer des conditions favorisant la motivation intrinsèque, nous devons adresser trois besoins fondamentaux:

1. L'autonomie - le besoin de se sentir auteur de ses choix
2. La compétence - le besoin de progresser et de développer ses capacités
3. La relatedness - le besoin d'appartenance et de connexion aux autres

En tant que manager ou leader, votre rôle est de créer les conditions qui satisfont ces trois besoins...`,
  relatedVideos: [
    { id: 'video-2', title: 'Le modèle SCARF en pratique', duration: '18 min' },
    { id: 'video-3', title: 'Gérer les personnalités difficiles', duration: '22 min' },
    { id: 'video-4', title: 'Feedback constructif et motivant', duration: '15 min' },
  ],
};

export const VideoViewer: React.FC = () => {
  const navigate = useNavigate();
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [showTranscript, setShowTranscript] = useState(false);

  const togglePlay = useCallback(() => {
    const v = videoRef.current;
    if (!v) return;
    if (v.paused) { v.play(); setIsPlaying(true); }
    else { v.pause(); setIsPlaying(false); }
  }, []);

  const toggleMute = useCallback(() => {
    const v = videoRef.current;
    if (!v) return;
    v.muted = !v.muted;
    setIsMuted(v.muted);
  }, []);

  const handleTimeUpdate = useCallback(() => {
    const v = videoRef.current;
    if (v) setCurrentTime(v.currentTime);
  }, []);

  const handleLoadedMetadata = useCallback(() => {
    const v = videoRef.current;
    if (v) setDuration(v.duration);
  }, []);

  const handleSeek = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const v = videoRef.current;
    if (!v || !duration) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const ratio = (e.clientX - rect.left) / rect.width;
    v.currentTime = ratio * duration;
  }, [duration]);

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    const onEnded = () => setIsPlaying(false);
    v.addEventListener('ended', onEnded);
    return () => v.removeEventListener('ended', onEnded);
  }, []);

  const formatTime = (s: number) => {
    const m = Math.floor(s / 60);
    const sec = Math.floor(s % 60);
    return `${m}:${sec.toString().padStart(2, '0')}`;
  };

  const progressPct = duration > 0 ? (currentTime / duration) * 100 : 0;

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <ViewerHeader
        tone="primary"
        eyebrow="Vidéo · Veille"
        title={VIDEO_DATA.title}
        subtitle={`${VIDEO_DATA.instructor} · ${VIDEO_DATA.duration}`}
        onClose={() => navigate(-1)}
        trailing={
          <button
            type="button"
            aria-label="Plein écran"
            className="inline-flex items-center justify-center min-w-touch min-h-touch w-11 h-11 rounded-pill bg-ink-50 hover:bg-ink-100 text-ink-700 transition-colors"
          >
            <Maximize2 size={16} />
          </button>
        }
      />

      {/* ── Video Player Area ──────────────────────────────────── */}
      <div className="bg-ink-950 flex-none">
        <div className="max-w-5xl mx-auto relative">
          {/* Native video element — hidden controls (custom UI below) */}
          <video
            ref={videoRef}
            src="https://www.w3schools.com/html/mov_bbb.mp4"
            className="w-full aspect-video object-contain bg-ink-950"
            onTimeUpdate={handleTimeUpdate}
            onLoadedMetadata={handleLoadedMetadata}
            playsInline
          />

          {/* Play / Pause overlay (click anywhere on video) */}
          {!isPlaying && (
            <button
              type="button"
              onClick={togglePlay}
              aria-label="Lire la vidéo"
              className="absolute inset-0 flex items-center justify-center bg-black/20 group"
            >
              <span className="min-w-touch min-h-touch w-20 h-20 rounded-full bg-primary-500 text-white flex items-center justify-center transition-transform duration-base group-hover:scale-110 focus-visible:outline-none">
                <Play size={32} className="ml-1" />
              </span>
            </button>
          )}

          {/* Controls bar */}
          <div className="absolute bottom-0 left-0 right-0 px-4 py-3 flex gap-3 items-center bg-gradient-to-t from-black/60 to-transparent">
            <button
              type="button"
              onClick={togglePlay}
              aria-label={isPlaying ? 'Mettre en pause' : 'Lire la vidéo'}
              className="min-w-touch min-h-touch inline-flex items-center justify-center text-white/85 hover:text-white transition-colors"
            >
              {isPlaying ? <Pause size={18} /> : <Play size={18} />}
            </button>

            <button
              type="button"
              onClick={toggleMute}
              aria-label={isMuted ? 'Activer le son' : 'Couper le son'}
              className="min-w-touch min-h-touch inline-flex items-center justify-center text-white/85 hover:text-white transition-colors"
            >
              {isMuted ? <VolumeX size={18} /> : <Volume2 size={18} />}
            </button>

            {/* Seekable progress bar */}
            <div
              role="slider"
              aria-label="Progression vidéo"
              aria-valuenow={Math.round(progressPct)}
              aria-valuemin={0}
              aria-valuemax={100}
              className="flex-1 h-1 bg-white/20 rounded-pill overflow-hidden cursor-pointer"
              onClick={handleSeek}
            >
              <div
                className="h-full bg-primary-400 transition-[width] duration-fast pointer-events-none"
                style={{ width: `${progressPct}%` }}
              />
            </div>

            <span className="font-body text-caption text-white/70 tabular-nums shrink-0">
              {formatTime(currentTime)} / {duration > 0 ? formatTime(duration) : '--:--'}
            </span>

            <button
              type="button"
              aria-label="Plein écran"
              onClick={() => videoRef.current?.requestFullscreen?.()}
              className="min-w-touch min-h-touch inline-flex items-center justify-center text-white/85 hover:text-white transition-colors"
            >
              <Maximize2 size={18} />
            </button>
          </div>
        </div>
      </div>

      {/* ── Content Section ─────────────────────────────────────── */}
      <div className="flex-1 bg-white py-section px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-section">

          {/* Main content */}
          <div className="flex flex-col gap-stack">

            {/* Title and metadata */}
            <div>
              <h1 className="font-display text-h3 font-semibold text-ink-900 m-0 mb-2">
                {VIDEO_DATA.title}
              </h1>
              <div className="flex gap-stack-xs items-center flex-wrap mt-3">
                <MetaPill icon={<User size={12} />} text={VIDEO_DATA.instructor} tone="brand" size="sm" />
                <MetaPill icon={<Clock size={12} />} text={VIDEO_DATA.duration} tone="brand" size="sm" />
              </div>
            </div>

            {/* Description */}
            <p className="font-body text-body-sm text-ink-500 m-0 leading-relaxed">
              {VIDEO_DATA.description}
            </p>

            {/* Transcript toggle */}
            <Card>
              <button
                type="button"
                onClick={() => setShowTranscript(!showTranscript)}
                className="w-full min-h-touch px-3 py-2 border-0 bg-transparent cursor-pointer flex items-center justify-between font-body text-body-sm font-semibold text-ink-900 hover:text-primary-700 transition-colors"
              >
                <div className="flex items-center gap-2">
                  <FileText size={16} />
                  {showTranscript ? 'Masquer' : 'Afficher'} la transcription
                </div>
                {showTranscript ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
              </button>

              {showTranscript && (
                <div className="px-3 pb-3 pt-0 border-t border-ink-100 font-body text-body-sm text-ink-500 leading-[1.8] max-h-[400px] overflow-y-auto whitespace-pre-line">
                  {VIDEO_DATA.transcript}
                </div>
              )}
            </Card>
          </div>

          {/* Sidebar — related videos */}
          <div className="flex flex-col gap-stack">
            <Card>
              <h4 className="font-display text-body font-semibold text-ink-900 m-0 mb-3">
                Vidéos connexes
              </h4>
              <div className="flex flex-col gap-2">
                {VIDEO_DATA.relatedVideos.map((video) => (
                  <button
                    key={video.id}
                    type="button"
                    onClick={() => {}}
                    className="w-full min-h-touch px-3 py-2 border border-ink-100 rounded-md bg-white cursor-pointer text-left transition-colors duration-base hover:bg-ink-50 hover:border-primary-200"
                  >
                    <div className="font-body text-body-sm font-medium text-ink-900 mb-1 leading-snug">
                      {video.title}
                    </div>
                    <div className="font-body text-caption text-ink-500 flex items-center gap-1">
                      <Clock size={12} /> {video.duration}
                    </div>
                  </button>
                ))}
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoViewer;
