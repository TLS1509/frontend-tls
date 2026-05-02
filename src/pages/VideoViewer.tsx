/**
 * VideoViewer Page
 *
 * Full-featured video viewer for lesson content with:
 * - Fullscreen video player
 * - Transcript sidebar
 * - Video metadata and controls
 * - Related videos
 *
 * Uses TLS design system components and tokens.
 */

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/core/Button';
import { Card } from '../components/core/Card';
import { MetaPill } from '../components/ui/MetaPill';
import { X, Play, Pause, Volume2, VolumeX, Maximize2, FileText, Clock, User, ChevronDown, ChevronUp } from 'lucide-react';

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
  description: 'Découvrez les mécanismes psychologiques qui sous-tendent la motivation au travail et comment créer les conditions d\'un engagement durable.',
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
    <div
      style={{
        minHeight: '100vh',
        background: 'var(--background)',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {/* Video Player Area */}
      <div
        style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          maxHeight: '60vh',
          background: 'var(--text)',
        }}
      >
        {/* Header with Close */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: 'var(--s-3)',
            background: 'var(--overlay-black-xs)',
            zIndex: 10,
          }}
        >
          <div style={{ color: 'var(--text-inverse)', fontSize: 'var(--t-body-sm)' }}>
            {VIDEO_DATA.title}
          </div>
          <Button variant="ghost" onClick={() => navigate(-1)} style={{ color: 'white' }}>
            <X size={20} />
          </Button>
        </div>

        {/* Video Player Placeholder */}
        <div
          style={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'var(--text)',
            position: 'relative',
          }}
        >
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            style={{
              width: 80,
              height: 80,
              borderRadius: '50%',
              background: 'var(--tls-primary-500)',
              border: 'none',
              color: 'var(--text-inverse)',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'transform var(--dur-2)',
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLButtonElement).style.transform = 'scale(1.1)';
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLButtonElement).style.transform = 'scale(1)';
            }}
          >
            {isPlaying ? <Pause size={32} /> : <Play size={32} style={{ marginLeft: 4 }} />}
          </button>

          {/* Player Controls */}
          <div
            style={{
              position: 'absolute',
              bottom: 'var(--s-4)',
              left: 0,
              right: 0,
              padding: '0 var(--s-4)',
              display: 'flex',
              gap: 'var(--s-2)',
              alignItems: 'center',
              justifyContent: 'space-between',
              color: 'white',
            }}
          >
            <div style={{ display: 'flex', gap: 'var(--s-2)' }}>
              <button
                onClick={() => setIsMuted(!isMuted)}
                style={{
                  background: 'none',
                  border: 'none',
                  color: 'var(--text-inverse)',
                  cursor: 'pointer',
                  padding: 'var(--s-2)',
                }}
              >
                {isMuted ? <VolumeX size={18} /> : <Volume2 size={18} />}
              </button>
            </div>

            {/* Progress Bar */}
            <div style={{ flex: 1, height: 4, background: 'var(--overlay-white-xs)', borderRadius: 'var(--r-full)', overflow: 'hidden' }}>
              <div style={{ height: '100%', width: '35%', background: 'var(--tls-primary-500)' }} />
            </div>

            <div style={{ fontSize: 'var(--t-caption)', color: 'var(--text-inverse)' }}>8:24 / 24:00</div>

            <button
              style={{
                background: 'none',
                border: 'none',
                color: 'var(--text-inverse)',
                cursor: 'pointer',
                padding: 'var(--s-2)',
              }}
            >
              <Maximize2 size={18} />
            </button>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div
        style={{
          padding: 'var(--s-6)',
          display: 'grid',
          gridTemplateColumns: '1fr 320px',
          gap: 'var(--s-6)',
        }}
      >
        {/* Main Content */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--s-4)' }}>
          {/* Title and Metadata */}
          <div>
            <h1 style={{ margin: '0 0 var(--s-2) 0', fontSize: 'var(--t-h3)', fontWeight: 600 }}>
              {VIDEO_DATA.title}
            </h1>
            <div style={{ display: 'flex', gap: 'var(--s-4)', alignItems: 'center', flexWrap: 'wrap', marginTop: 'var(--s-3)' }}>
              <MetaPill icon={<User size={12} />} text={VIDEO_DATA.instructor} size="sm" />
              <MetaPill icon={<Clock size={12} />} text={VIDEO_DATA.duration} size="sm" />
            </div>
          </div>

          {/* Description */}
          <p style={{ margin: 0, fontSize: 'var(--t-body-sm)', color: 'var(--text-muted)', lineHeight: 1.6 }}>
            {VIDEO_DATA.description}
          </p>

          {/* Transcript Toggle */}
          <Card>
            <button
              onClick={() => setShowTranscript(!showTranscript)}
              style={{
                width: '100%',
                padding: 'var(--s-3)',
                border: 'none',
                background: 'transparent',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                fontSize: 'var(--t-body-sm)',
                fontWeight: 600,
                color: 'var(--text)',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--s-2)' }}>
                <FileText size={16} /> {showTranscript ? 'Masquer' : 'Afficher'} la transcription
              </div>
              {showTranscript ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
            </button>

            {showTranscript && (
              <div
                style={{
                  padding: 'var(--s-3)',
                  borderTop: '1px solid var(--border-subtle)',
                  fontSize: 'var(--t-body-sm)',
                  color: 'var(--text-muted)',
                  lineHeight: 1.8,
                  maxHeight: 400,
                  overflowY: 'auto',
                }}
              >
                {VIDEO_DATA.transcript}
              </div>
            )}
          </Card>
        </div>

        {/* Sidebar */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--s-4)' }}>
          <Card>
            <h4 style={{ margin: '0 0 var(--s-3) 0', fontSize: 'var(--t-body)', fontWeight: 600 }}>Vidéos connexes</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--s-3)' }}>
              {VIDEO_DATA.relatedVideos.map((video) => (
                <button
                  key={video.id}
                  onClick={() => {}}
                  style={{
                    padding: 'var(--s-2)',
                    border: '1px solid var(--border-subtle)',
                    borderRadius: 'var(--r-md)',
                    background: 'var(--surface)',
                    cursor: 'pointer',
                    textAlign: 'left',
                    transition: 'all var(--dur-2)',
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLButtonElement).style.background = 'var(--surface-muted)';
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLButtonElement).style.background = 'var(--surface)';
                  }}
                >
                  <div style={{ fontSize: 'var(--t-body-sm)', fontWeight: 500, color: 'var(--text)', marginBottom: 'var(--s-1)' }}>
                    {video.title}
                  </div>
                  <div style={{ fontSize: 'var(--t-caption)', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: 'var(--s-1)' }}>
                    <Clock size={12} /> {video.duration}
                  </div>
                </button>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default VideoViewer;
