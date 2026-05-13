/**
 * VideoViewer Page
 *
 * Full-featured video viewer for lesson content with transcript and related videos.
 */

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from '../components/core/Card';
import { MetaPill } from '../components/ui/MetaPill';
import { Play, Pause, Volume2, VolumeX, Maximize2, FileText, Clock, User, ChevronDown, ChevronUp } from 'lucide-react';
import { ViewerOverlay } from '../components/patterns/ViewerOverlay';
import { Button } from '../components/core/Button';

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
  description: "Découvrez les mécanismes psychologiques qui sous-tendent la motivation au travail et comment créer les conditions d'un engagement durable.",
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
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [showTranscript, setShowTranscript] = useState(false);

  return (
    <ViewerOverlay
      title={VIDEO_DATA.title}
      subtitle={`${VIDEO_DATA.instructor} · ${VIDEO_DATA.duration}`}
      tone="dark"
      onClose={() => navigate(-1)}
      headerActions={
        <Button variant="ghost" size="sm" iconOnly aria-label="Plein écran" className="text-white/85 hover:bg-white/10">
          <Maximize2 size={16} />
        </Button>
      }
    >
      {/* ── Video Player Area ─────────────────────────────────────── */}
      <div className="flex flex-col max-h-[60vh] bg-ink-950">

        {/* Video Player Placeholder */}
        <div className="flex-1 flex flex-col items-center justify-center bg-ink-950 relative min-h-[280px]">
          <button
            type="button"
            onClick={() => setIsPlaying(!isPlaying)}
            className="w-20 h-20 rounded-full bg-primary-500 border-0 text-white flex items-center justify-center cursor-pointer transition-transform duration-200 hover:scale-110"
          >
            {isPlaying ? <Pause size={32} /> : <Play size={32} className="ml-1" />}
          </button>

          {/* Player controls */}
          <div className="absolute bottom-4 left-0 right-0 px-4 flex gap-2 items-center justify-between text-white">
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => setIsMuted(!isMuted)}
                className="border-0 bg-transparent text-white cursor-pointer p-2"
              >
                {isMuted ? <VolumeX size={18} /> : <Volume2 size={18} />}
              </button>
            </div>

            {/* Progress bar (mock static at 35%) */}
            <div className="flex-1 h-1 bg-white/10 rounded-pill overflow-hidden">
              <div className="h-full bg-primary-500 w-[35%]" />
            </div>

            <div className="font-body text-caption text-white">8:24 / 24:00</div>

            <button
              type="button"
              className="border-0 bg-transparent text-white cursor-pointer p-2"
            >
              <Maximize2 size={18} />
            </button>
          </div>
        </div>
      </div>

      {/* ── Content Section ───────────────────────────────────────── */}
      <div className="bg-white p-6 grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-6">

        {/* Main content */}
        <div className="flex flex-col gap-4">

          {/* Title and metadata */}
          <div>
            <h1 className="font-display text-h3 font-semibold text-ink-900 m-0 mb-2">
              {VIDEO_DATA.title}
            </h1>
            <div className="flex gap-4 items-center flex-wrap mt-3">
              <MetaPill icon={<User size={12} />} text={VIDEO_DATA.instructor} size="sm" />
              <MetaPill icon={<Clock size={12} />} text={VIDEO_DATA.duration} size="sm" />
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
              className="w-full px-3 py-3 border-0 bg-transparent cursor-pointer flex items-center justify-between font-body text-body-sm font-semibold text-ink-900"
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

        {/* Sidebar */}
        <div className="flex flex-col gap-4">
          <Card>
            <h4 className="font-display text-body font-semibold text-ink-900 m-0 mb-3">
              Vidéos connexes
            </h4>
            <div className="flex flex-col gap-3">
              {VIDEO_DATA.relatedVideos.map((video) => (
                <button
                  key={video.id}
                  type="button"
                  onClick={() => {}}
                  className="w-full px-2 py-2 border border-ink-100 rounded-md bg-white cursor-pointer text-left transition-colors duration-200 hover:bg-ink-50"
                >
                  <div className="font-body text-body-sm font-medium text-ink-900 mb-1">
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
    </ViewerOverlay>
  );
};

export default VideoViewer;
