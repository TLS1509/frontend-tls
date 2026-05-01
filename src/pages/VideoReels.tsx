import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from '../components/core/Card';
import { Badge } from '../components/ui/Badge';
import {
  ChevronRight,
  Clapperboard,
  PlayCircle,
  Clock,
  Eye,
  ThumbsUp,
  Filter,
} from 'lucide-react';

/* ─── Mock data ──────────────────────────────────────────────────────────── */

const FILTERS = ['Tous', 'IA & Outils', 'Pédagogie', 'Prompt', 'Tendances'];

const REELS = [
  {
    id: 'r1',
    title: 'Prompt tips : 3 techniques en 2 minutes',
    category: 'Prompt',
    duration: '2 min',
    views: '1,2k',
    likes: '84',
    accent: 'var(--tls-primary-500)',
    accentLight: 'var(--tls-primary-50)',
  },
  {
    id: 'r2',
    title: 'Weekly IA : les actus de la semaine',
    category: 'IA & Outils',
    duration: '3 min',
    views: '980',
    likes: '61',
    accent: 'var(--tls-orange-500)',
    accentLight: 'var(--tls-orange-50)',
  },
  {
    id: 'r3',
    title: 'Coach minute : feedback constructif',
    category: 'Pédagogie',
    duration: '1 min',
    views: '2,4k',
    likes: '152',
    accent: 'var(--tls-primary-600)',
    accentLight: 'var(--tls-primary-50)',
  },
  {
    id: 'r4',
    title: 'Micro-learning : concevoir en 5 étapes',
    category: 'Pédagogie',
    duration: '4 min',
    views: '730',
    likes: '49',
    accent: 'var(--tls-orange-600)',
    accentLight: 'var(--tls-orange-50)',
  },
  {
    id: 'r5',
    title: "LMS nouvelle génération : tour d'horizon",
    category: 'IA & Outils',
    duration: '2 min',
    views: '1,1k',
    likes: '77',
    accent: 'var(--tls-primary-500)',
    accentLight: 'var(--tls-primary-50)',
  },
  {
    id: 'r6',
    title: 'Tendances 2026 : ce qui change vraiment',
    category: 'Tendances',
    duration: '3 min',
    views: '1,8k',
    likes: '120',
    accent: 'var(--tls-orange-500)',
    accentLight: 'var(--tls-orange-50)',
  },
];

/* ─── Component ──────────────────────────────────────────────────────────── */

export const VideoReels: React.FC = () => {
  const navigate = useNavigate();
  const [activeFilter, setActiveFilter] = useState('Tous');

  const filtered =
    activeFilter === 'Tous'
      ? REELS
      : REELS.filter((r) => r.category === activeFilter);

  return (
    <div
      style={{
        minHeight: '100vh',
        background: 'var(--bg)',
        fontFamily: 'var(--font-body)',
      }}
    >
      {/* ─ Dark Hero ──────────────────────────────────────────────── */}
      <div
        style={{
          background: 'linear-gradient(160deg, var(--tls-ink-950) 0%, var(--tls-ink-900) 60%, var(--tls-ink-800) 100%)',
          padding: 'var(--s-5) var(--s-8) var(--s-10)',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Decorative blob */}
        <div
          style={{
            position: 'absolute',
            top: '-60px',
            right: '-60px',
            width: '320px',
            height: '320px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(85,161,180,0.15) 0%, transparent 70%)',
            pointerEvents: 'none',
          }}
        />

        {/* Breadcrumb */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 'var(--s-2)',
            fontSize: 'var(--t-sm)',
            color: 'rgba(255,255,255,0.5)',
            marginBottom: 'var(--s-8)',
            position: 'relative',
            zIndex: 1,
          }}
        >
          <span
            style={{ cursor: 'pointer', color: 'rgba(255,255,255,0.75)' }}
            onClick={() => navigate('/veille')}
          >
            Veille
          </span>
          <ChevronRight size={14} />
          <span style={{ color: 'rgba(255,255,255,0.9)', fontWeight: 500 }}>Video Reels</span>
        </div>

        {/* Hero content */}
        <div style={{ position: 'relative', zIndex: 1 }}>
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 'var(--s-2)',
              padding: 'var(--s-1) var(--s-3-5)',
              borderRadius: 'var(--r-full)',
              background: 'rgba(255,255,255,0.1)',
              border: '1px solid rgba(255,255,255,0.18)',
              color: 'rgba(255,255,255,0.85)',
              fontSize: 'var(--t-caption)',
              fontWeight: 700,
              letterSpacing: '0.08em',
              marginBottom: 'var(--s-4)',
              backdropFilter: 'blur(8px)',
            }}
          >
            <Clapperboard size={13} />
            FORMAT REEL · MICRO-LEARNING
          </div>

          <h1
            style={{
              fontSize: 'clamp(2rem, 4.5vw, 3rem)',
              fontWeight: 900,
              color: 'var(--text-inverse)',
              margin: '0 0 var(--s-3)',
              letterSpacing: '-0.03em',
              lineHeight: 1.08,
            }}
          >
            Video Reels
          </h1>
          <p
            style={{
              fontSize: 'var(--t-body)',
              color: 'rgba(255,255,255,0.65)',
              margin: 0,
              maxWidth: '520px',
              lineHeight: 1.6,
            }}
          >
            Vidéos courtes immersives pour apprendre en 1 à 4 minutes — format mobile-first
            inspiré du reel, pensé pour le micro-learning en situation.
          </p>
        </div>
      </div>

      {/* ─ Filter tabs ────────────────────────────────────────────── */}
      <div
        style={{
          background: 'var(--surface)',
          borderBottom: '1px solid var(--border)',
          padding: '0 var(--s-8)',
          display: 'flex',
          alignItems: 'center',
          gap: 'var(--s-1)',
          overflowX: 'auto',
        }}
      >
        <Filter size={14} style={{ color: 'var(--text-muted)', flexShrink: 0, marginRight: 'var(--s-2)' }} />
        {FILTERS.map((f) => {
          const isActive = activeFilter === f;
          return (
            <button
              key={f}
              type="button"
              onClick={() => setActiveFilter(f)}
              style={{
                padding: 'var(--s-3) var(--s-4)',
                border: 'none',
                background: 'transparent',
                cursor: 'pointer',
                fontSize: 'var(--t-sm)',
                fontWeight: isActive ? 700 : 500,
                color: isActive ? 'var(--tls-primary-600)' : 'var(--text-muted)',
                borderBottom: isActive
                  ? '2px solid var(--tls-primary-500)'
                  : '2px solid transparent',
                whiteSpace: 'nowrap',
                fontFamily: 'var(--font-body)',
                transition: 'all 0.15s',
              }}
            >
              {f}
            </button>
          );
        })}
      </div>

      {/* ─ Featured Video (top 1) ─────────────────────────────────── */}
      {filtered.length > 0 && (
        <div
          style={{
            maxWidth: 'var(--container-default)',
            margin: '0 auto',
            padding: 'var(--s-8) var(--s-6) 0',
            width: '100%',
          }}
        >
          <div
            style={{
              position: 'relative',
              overflow: 'hidden',
              borderRadius: 'var(--r-2xl)',
              aspectRatio: '16 / 9',
              background: `linear-gradient(160deg, var(--tls-ink-950), var(--tls-ink-800))`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              boxShadow: 'var(--shadow-lg)',
              transition: 'all var(--dur-2)',
            }}
            onClick={() => navigate('/veille/video-reels/' + filtered[0].id)}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLDivElement).style.boxShadow = 'var(--shadow-xl)';
              (e.currentTarget as HTMLDivElement).style.transform = 'scale(1.01)';
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLDivElement).style.boxShadow = 'var(--shadow-lg)';
              (e.currentTarget as HTMLDivElement).style.transform = 'scale(1)';
            }}
          >
            {/* Gradient overlay */}
            <div
              style={{
                position: 'absolute',
                inset: 0,
                background: `linear-gradient(135deg, ${filtered[0].accent}40, ${filtered[0].accentLight})`,
                pointerEvents: 'none',
              }}
            />

            {/* Featured badge */}
            <div
              style={{
                position: 'absolute',
                top: 'var(--s-4)',
                left: 'var(--s-4)',
                zIndex: 2,
              }}
            >
              <Badge variant="warm">À la une</Badge>
            </div>

            {/* Play icon */}
            <div
              style={{
                position: 'relative',
                zIndex: 1,
                width: '80px',
                height: '80px',
                borderRadius: '50%',
                background: 'rgba(255,255,255,0.2)',
                border: '3px solid rgba(255,255,255,0.5)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backdropFilter: 'blur(12px)',
                color: 'var(--text-inverse)',
              }}
            >
              <PlayCircle size={40} />
            </div>

            {/* Title + metadata overlay */}
            <div
              style={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                right: 0,
                background: 'linear-gradient(to top, rgba(0,0,0,0.7) 0%, transparent 100%)',
                padding: 'var(--s-6) var(--s-4)',
                color: 'var(--text-inverse)',
              }}
            >
              <h3
                style={{
                  margin: '0 0 var(--s-3) 0',
                  fontSize: 'var(--t-h4)',
                  fontWeight: 700,
                  lineHeight: 1.3,
                }}
              >
                {filtered[0].title}
              </h3>
              <div
                style={{
                  display: 'flex',
                  gap: 'var(--s-4)',
                  alignItems: 'center',
                  flexWrap: 'wrap',
                }}
              >
                <span style={{ display: 'flex', alignItems: 'center', gap: 'var(--s-1)', fontSize: 'var(--t-body-sm)' }}>
                  <Clock size={14} /> {filtered[0].duration}
                </span>
                <span style={{ display: 'flex', alignItems: 'center', gap: 'var(--s-1)', fontSize: 'var(--t-body-sm)' }}>
                  <Eye size={14} /> {filtered[0].views} vues
                </span>
                <span style={{ display: 'flex', alignItems: 'center', gap: 'var(--s-1)', fontSize: 'var(--t-body-sm)' }}>
                  <ThumbsUp size={14} /> {filtered[0].likes}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ─ Video grid ─────────────────────────────────────────────── */}
      <div
        style={{
          maxWidth: 'var(--container-default)',
          margin: '0 auto',
          padding: 'var(--s-8) var(--s-6) var(--s-12)',
        }}
      >
        {filtered.length === 0 ? (
          <div
            style={{
              textAlign: 'center',
              padding: 'var(--s-12) var(--s-6)',
              color: 'var(--text-muted)',
              fontSize: 'var(--t-sm)',
            }}
          >
            Aucun reel dans cette catégorie.
          </div>
        ) : (
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
              gap: 'var(--s-5)',
            }}
          >
            {filtered.map((reel, idx) => (
              <Card
                key={reel.id}
                variant="interactive"
                style={{
                  overflow: 'hidden',
                  padding: 0,
                  cursor: 'pointer',
                  transition: 'all var(--dur-2)',
                }}
                onClick={() => navigate('/veille/video-reels/' + reel.id)}
                onMouseEnter={(e) => {
                  const card = e.currentTarget as HTMLDivElement;
                  card.style.transform = 'translateY(-8px)';
                  card.style.boxShadow = 'var(--shadow-xl)';
                }}
                onMouseLeave={(e) => {
                  const card = e.currentTarget as HTMLDivElement;
                  card.style.transform = 'translateY(0)';
                  card.style.boxShadow = 'var(--shadow-md)';
                }}
              >
                {/* Vertical preview thumbnail */}
                <div
                  style={{
                    height: '180px',
                    background: `linear-gradient(160deg, var(--tls-ink-950), var(--tls-ink-800))`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    position: 'relative',
                  }}
                >
                  {/* Accent line */}
                  <div
                    style={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      right: 0,
                      height: '3px',
                      background: reel.accent,
                    }}
                  />

                  {/* Play button */}
                  <div
                    style={{
                      width: '48px',
                      height: '48px',
                      borderRadius: '50%',
                      background: 'rgba(255,255,255,0.15)',
                      border: '2px solid rgba(255,255,255,0.4)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      backdropFilter: 'blur(8px)',
                      color: 'var(--text-inverse)',
                    }}
                  >
                    <PlayCircle size={22} color="var(--text-inverse)" />
                  </div>

                  {/* Duration badge */}
                  <div
                    style={{
                      position: 'absolute',
                      bottom: 'var(--s-2)',
                      right: 'var(--s-2)',
                    }}
                  >
                    <Badge variant="brand">{reel.duration}</Badge>
                  </div>

                  {/* Featured badge for top videos */}
                  {idx < 3 && (
                    <div
                      style={{
                        position: 'absolute',
                        top: 'var(--s-3)',
                        right: 'var(--s-3)',
                      }}
                    >
                      <Badge variant="warm">Populaire</Badge>
                    </div>
                  )}

                  {/* Category badge */}
                  <div
                    style={{
                      position: 'absolute',
                      top: 'var(--s-3)',
                      left: 'var(--s-3)',
                    }}
                  >
                    <span
                      style={{
                        padding: 'var(--s-1) var(--s-2-5)',
                        borderRadius: 'var(--r-full)',
                        background: 'rgba(255,255,255,0.15)',
                        color: 'var(--text-inverse)',
                        fontSize: 'var(--t-micro)',
                        fontWeight: 700,
                        backdropFilter: 'blur(4px)',
                      }}
                    >
                      {reel.category}
                    </span>
                  </div>
                </div>

                {/* Card body */}
                <div style={{ padding: 'var(--s-4) var(--s-4) var(--s-4)' }}>
                  <h3
                    style={{
                      fontSize: 'var(--t-sm)',
                      fontWeight: 700,
                      color: 'var(--text)',
                      margin: '0 0 var(--s-3)',
                      lineHeight: 1.4,
                    }}
                  >
                    {reel.title}
                  </h3>

                  {/* Stats */}
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 'var(--s-4)',
                    }}
                  >
                    <span
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 'var(--s-1)',
                        fontSize: 'var(--t-caption)',
                        color: 'var(--text-muted)',
                      }}
                    >
                      <Clock size={11} />
                      {reel.duration}
                    </span>
                    <span
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 'var(--s-1)',
                        fontSize: 'var(--t-caption)',
                        color: 'var(--text-muted)',
                      }}
                    >
                      <Eye size={11} />
                      {reel.views}
                    </span>
                    <span
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 'var(--s-1)',
                        fontSize: 'var(--t-caption)',
                        color: 'var(--text-muted)',
                      }}
                    >
                      <ThumbsUp size={11} />
                      {reel.likes}
                    </span>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
