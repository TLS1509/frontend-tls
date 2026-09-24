/**
 * VideoViewer : lecteur vidéo avec transcription et vidéos connexes.
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
import { Button } from '../components/core/Button';
import { MetaPill } from '../components/ui/MetaPill';
import {
  Play, Pause, Volume2, VolumeX, Maximize2, FileText,
  Clock, User, ChevronDown, ChevronUp,
} from 'lucide-react';
import { ViewerHeader } from '../components/patterns/ViewerHeader';
import { Container, PageShell } from '../components/layout';

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
  title: 'Motivation et engagement : les fondamentaux',
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
    <div className="min-h-[100dvh] flex flex-col bg-white">
      {/* La barre garde le titre (p 16/600) : le lecteur occupe le premier
          écran et le h1 vit dessous. La formatrice et la durée ne sont dites
          qu'une fois, en méta sous le h1. */}
      <ViewerHeader
        tone="primary"
        eyebrow="Vidéo · Veille"
        title={VIDEO_DATA.title}
        onClose={() => navigate(-1)}
        trailing={
          <Button iconOnly emphasis="ghost" tone="neutral" aria-label="Plein écran">
            <Maximize2 />
          </Button>
        }
      />

      {/* ── Video Player Area ──────────────────────────────────── */}
      <div className="bg-ink-950 flex-none">
        <Container width="medium" padding={false} className="relative">
          {/* Native video element : hidden controls (custom UI below) */}
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
              <span className="min-w-touch min-h-touch w-20 h-20 rounded-pill bg-primary-700 text-white flex items-center justify-center transition-transform duration-base group-hover:scale-110 focus-visible:outline-none">
                <Play size={32} className="ml-1" />
              </span>
            </button>
          )}

          {/* Controls bar */}
          <div className="absolute bottom-0 left-0 right-0 px-stack py-3 flex gap-stack-xs items-center bg-gradient-to-t from-black/60 to-transparent">
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
        </Container>
      </div>

      {/* ── Content Section ─────────────────────────────────────── */}
      <PageShell width="medium" className="relative z-base flex-1 bg-white py-section gap-section grid grid-cols-1 lg:grid-cols-[1fr_320px]" noPadTop>
        {/* Main content — passe typographique du 24/09 : le h1 prend son pas
            (36 ; il était à 20, la taille d'un titre de carte), la description
            devient le chapô (18 ink-700 ; elle était à 16 au cran 500), la méta
            suit à 12. La transcription se lit en ink-700 sur la largeur de
            lecture, à l'interligne de son pas (26 ; il était forcé à 1,8). */}
        <div className="flex flex-col gap-section">

          <header className="flex flex-col gap-stack-sm">
            <h1 className="font-display text-h1 text-ink-900">
              {VIDEO_DATA.title}
            </h1>
            <p className="font-body text-body-lg text-ink-700 max-w-prose">
              {VIDEO_DATA.description}
            </p>
            <div className="flex gap-stack-xs items-center flex-wrap">
              <MetaPill icon={<User size={14} />} text={VIDEO_DATA.instructor} tone="brand" size="sm" />
              <MetaPill icon={<Clock size={14} />} text={VIDEO_DATA.duration} tone="brand" size="sm" />
            </div>
          </header>

          {/* Transcript toggle */}
          <Card>
            <button
              type="button"
              onClick={() => setShowTranscript(!showTranscript)}
              aria-expanded={showTranscript}
              className="w-full min-h-touch px-3 py-stack-xs border-0 bg-transparent cursor-pointer flex items-center justify-between font-body text-body font-semibold text-ink-900 hover:text-primary-800 transition-colors"
            >
              <span className="flex items-center gap-stack-xs">
                <FileText size={16} aria-hidden="true" />
                {showTranscript ? 'Masquer' : 'Afficher'} la transcription
              </span>
              {showTranscript ? <ChevronUp size={16} aria-hidden="true" /> : <ChevronDown size={16} aria-hidden="true" />}
            </button>

            {showTranscript && (
              <div className="px-3 pt-stack pb-3 border-t border-ink-100 font-body text-body text-ink-700 max-w-prose max-h-[400px] overflow-y-auto whitespace-pre-line">
                {VIDEO_DATA.transcript}
              </div>
            )}
          </Card>
        </div>

        {/* Sidebar : related videos — un libellé de groupe (13/600 ink-600)
            plutôt qu'un h4 en 16/600 ; le nom de la vidéo à 16/600 (il était
            en 500, la graisse des puces), sa durée en méta ink-600. */}
        <aside className="flex flex-col gap-stack" aria-label="Vidéos connexes">
          <Card className="flex flex-col gap-stack-sm">
            <p className="font-body text-caption font-semibold text-ink-600">
              Vidéos connexes
            </p>
            <div className="flex flex-col gap-stack-xs">
              {VIDEO_DATA.relatedVideos.map((video) => (
                <button
                  key={video.id}
                  type="button"
                  onClick={() => {}}
                  className="w-full min-h-touch px-3 py-stack-xs flex flex-col gap-tight border border-ink-100 rounded-lg bg-white cursor-pointer text-left transition-colors duration-base hover:bg-ink-50 hover:border-primary-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500"
                >
                  <span className="font-body text-body font-semibold text-ink-900">
                    {video.title}
                  </span>
                  <span className="font-body text-caption text-ink-600 flex items-center gap-stack-3xs">
                    <Clock size={14} aria-hidden="true" /> {video.duration}
                  </span>
                </button>
              ))}
            </div>
          </Card>
        </aside>
      </PageShell>
    </div>
  );
};

export default VideoViewer;
