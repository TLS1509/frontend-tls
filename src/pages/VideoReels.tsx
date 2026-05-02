/**
 * VideoReels — Lecteur vidéo vertical immersif (dark layout)
 * Inspiré du design Figma : fond noir total, contrôles flottants glass,
 * actions latérales, compteur bas de page.
 *
 * CSS  : .video-reels__* dans figma-missing-pages.css
 * Tokens : --video-*, --overlay-black-*, --on-color-*, --glass-blur-*
 * Aucune valeur hardcodée dans le JSX (sauf color-mix() pour les dynamiques).
 */
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  Play,
  Pause,
  Heart,
  Bookmark,
  BookmarkCheck,
  Volume2,
  VolumeX,
  Share2,
  ChevronUp,
  ChevronDown,
  Eye,
  Clock,
} from 'lucide-react';

/* ─── Données ────────────────────────────────────────────────────────────── */

const CATEGORIES = ['Tous', 'IA & Outils', 'Pédagogie', 'Prompt', 'Tendances'];

interface Reel {
  id: string;
  title: string;
  description: string;
  category: string;
  duration: string;
  views: string;
  likes: number;
  instructor: string;
  instructorInitials: string;
  emoji: string;
  /** Token CSS --video-grad-* pour le fond de la carte */
  bgGradientToken: string;
  /** Token CSS --tls-*-* pour l'accent couleur */
  accentToken: string;
}

const REELS: Reel[] = [
  {
    id: 'r1',
    title: 'Prompt tips : 3 techniques en 2 minutes',
    description: "Découvrez 3 techniques avancées de prompting qui vont transformer votre façon d'utiliser les LLMs au quotidien.",
    category: 'Prompt',
    duration: '2:14',
    views: '1 200',
    likes: 84,
    instructor: 'Marie Dubois',
    instructorInitials: 'MD',
    emoji: '⚡',
    bgGradientToken: 'var(--video-grad-brand)',
    accentToken: 'var(--tls-primary-400)',
  },
  {
    id: 'r2',
    title: 'Weekly IA : les actus de la semaine',
    description: "Tour d'horizon des dernières avancées en IA — Claude 4, Gemini, et les nouveaux outils qui changent la donne.",
    category: 'IA & Outils',
    duration: '3:41',
    views: '980',
    likes: 61,
    instructor: 'Pierre Martin',
    instructorInitials: 'PM',
    emoji: '📰',
    bgGradientToken: 'var(--video-grad-warm)',
    accentToken: 'var(--tls-orange-400)',
  },
  {
    id: 'r3',
    title: 'Coach minute : feedback constructif',
    description: 'Comment donner du feedback qui motive vraiment ? Une méthode simple et efficace en moins de 2 minutes.',
    category: 'Pédagogie',
    duration: '1:58',
    views: '2 400',
    likes: 152,
    instructor: 'Sophie Renard',
    instructorInitials: 'SR',
    emoji: '🎯',
    bgGradientToken: 'var(--video-grad-ocean)',
    accentToken: 'var(--tls-primary-300)',
  },
  {
    id: 'r4',
    title: 'Micro-learning : concevoir en 5 étapes',
    description: "5 étapes concrètes pour créer un module de micro-learning percutant. De l'idée au déploiement en moins d'une journée.",
    category: 'Pédagogie',
    duration: '4:02',
    views: '730',
    likes: 49,
    instructor: 'Lucas Petit',
    instructorInitials: 'LP',
    emoji: '🧩',
    bgGradientToken: 'var(--video-grad-earth)',
    accentToken: 'var(--tls-orange-300)',
  },
  {
    id: 'r5',
    title: "LMS nouvelle génération : tour d'horizon",
    description: "Les 5 LMS qui redéfinissent l'expérience apprenant en 2025. Points forts, points faibles, pour qui ?",
    category: 'IA & Outils',
    duration: '2:33',
    views: '1 100',
    likes: 77,
    instructor: 'Emma Laurent',
    instructorInitials: 'EL',
    emoji: '🖥️',
    bgGradientToken: 'var(--video-grad-slate)',
    accentToken: 'var(--tls-primary-500)',
  },
  {
    id: 'r6',
    title: 'Tendances 2026 : ce qui change vraiment',
    description: "On arrête avec le hype : voici les 4 tendances formation qui vont réellement transformer votre quotidien en 2026.",
    category: 'Tendances',
    duration: '3:17',
    views: '1 800',
    likes: 120,
    instructor: 'Alex Moreau',
    instructorInitials: 'AM',
    emoji: '🚀',
    bgGradientToken: 'var(--video-grad-violet)',
    accentToken: 'var(--tls-orange-500)',
  },
];

/* ─── Bouton action latéral ──────────────────────────────────────────────── */

interface ActionBtnProps {
  onClick: () => void;
  modifier?: string;
  label?: string;
  children: React.ReactNode;
}

const ActionBtn: React.FC<ActionBtnProps> = ({ onClick, modifier = '', label, children }) => (
  <div className="video-reels__action-wrap">
    <button
      onClick={onClick}
      className={`video-reels__action-btn${modifier ? ` ${modifier}` : ''}`}
    >
      {children}
    </button>
    {label && <span className="video-reels__action-label">{label}</span>}
  </div>
);

/* ─── Page ───────────────────────────────────────────────────────────────── */

export const VideoReels: React.FC = () => {
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState('Tous');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [likedIds, setLikedIds] = useState<Set<string>>(new Set());
  const [savedIds, setSavedIds] = useState<Set<string>>(new Set());

  const filtered =
    activeCategory === 'Tous'
      ? REELS
      : REELS.filter((r) => r.category === activeCategory);

  const video = filtered[currentIndex] ?? filtered[0];
  const canGoUp = currentIndex > 0;
  const canGoDown = currentIndex < filtered.length - 1;
  const isLiked = likedIds.has(video.id);
  const isSaved = savedIds.has(video.id);
  const likesDisplay = String(video.likes + (isLiked ? 1 : 0));

  const handleCategory = (cat: string) => {
    setActiveCategory(cat);
    setCurrentIndex(0);
    setIsPlaying(false);
  };

  const toggleLike = () =>
    setLikedIds((prev) => {
      const next = new Set(prev);
      next.has(video.id) ? next.delete(video.id) : next.add(video.id);
      return next;
    });

  const toggleSave = () =>
    setSavedIds((prev) => {
      const next = new Set(prev);
      next.has(video.id) ? next.delete(video.id) : next.add(video.id);
      return next;
    });

  const goUp = () => { if (canGoUp) { setCurrentIndex((i) => i - 1); setIsPlaying(false); } };
  const goDown = () => { if (canGoDown) { setCurrentIndex((i) => i + 1); setIsPlaying(false); } };

  if (!video) return null;

  return (
    <div className="video-reels">

      {/* Ambient glow — fond radial dynamique selon l'accent du reel courant */}
      <div
        className="video-reels__ambient"
        style={{
          background: `radial-gradient(ellipse at 60% 40%, color-mix(in srgb, ${video.accentToken} 12%, transparent) 0%, transparent 60%)`,
        }}
      />

      {/* ── Barre haute flottante ─────────────────────────────────── */}
      <div className="video-reels__top-bar">
        <button className="video-reels__back-btn" onClick={() => navigate(-1)}>
          <ArrowLeft size={16} />
          Retour
        </button>

        {/* Filtres catégorie */}
        <div className="video-reels__filter-bar">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              className={`video-reels__filter-pill${activeCategory === cat ? ' video-reels__filter-pill--active' : ''}`}
              onClick={() => handleCategory(cat)}
              style={activeCategory === cat ? { background: video.accentToken } : undefined}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Bouton muet */}
        <button className="video-reels__mute-btn" onClick={() => setIsMuted((m) => !m)}>
          {isMuted ? <VolumeX size={16} /> : <Volume2 size={16} />}
        </button>
      </div>

      {/* ── Zone vidéo centrale ───────────────────────────────────── */}
      <div className="video-reels__stage">
        <div
          className="video-reels__card"
          style={{ background: video.bgGradientToken }}
        >
          {/* Bouton play centré */}
          <div className="video-reels__play-center">
            <button
              className="video-reels__play-btn"
              onClick={() => setIsPlaying((p) => !p)}
              style={{ opacity: isPlaying ? 0 : 1 }}
            >
              {isPlaying
                ? <Pause size={32} />
                : <Play size={32} style={{ marginLeft: 4 }} />
              }
            </button>
          </div>

          {/* Overlay haut — badge catégorie + titre */}
          <div className="video-reels__overlay-top">
            <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--s-2)', marginBottom: 'var(--s-2)' }}>
              <span style={{ fontSize: 'var(--t-h4)' }}>{video.emoji}</span>
              <span
                className="video-reels__category-badge"
                style={{
                  background: `color-mix(in srgb, ${video.accentToken} 22%, transparent)`,
                  color: video.accentToken,
                  border: `1px solid color-mix(in srgb, ${video.accentToken} 40%, transparent)`,
                }}
              >
                {video.category}
              </span>
              <span style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 'var(--s-1)', fontSize: 'var(--t-caption)', color: 'var(--on-color-text-muted)' }}>
                <Clock size={11} />
                {video.duration}
              </span>
            </div>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--t-h3)', fontWeight: 700, color: 'var(--on-color-text-main)', margin: 0, lineHeight: 1.2 }}>
              {video.title}
            </h2>
          </div>

          {/* Overlay bas — instructeur + description */}
          <div className="video-reels__overlay-bottom">
            <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--s-3)', marginBottom: 'var(--s-3)' }}>
              {/* Avatar instructeur */}
              <div
                style={{
                  width: 38, height: 38, borderRadius: '50%', flexShrink: 0,
                  background: `linear-gradient(135deg, ${video.accentToken}, var(--tls-orange-600))`,
                  border: '2px solid var(--on-color-border-sm)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 'var(--t-caption)', fontWeight: 700, color: 'var(--on-color-text-main)',
                }}
              >
                {video.instructorInitials}
              </div>
              <div>
                <div style={{ fontSize: 'var(--t-body-sm)', fontWeight: 600, color: 'var(--on-color-text-main)' }}>
                  {video.instructor}
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--s-1)', fontSize: 'var(--t-caption)', color: 'var(--on-color-text-muted)', marginTop: 2 }}>
                  <Eye size={10} />
                  {video.views} vues
                </div>
              </div>
            </div>
            <p style={{ fontSize: 'var(--t-body-sm)', color: 'var(--on-color-text-soft)', lineHeight: 1.55, margin: 0 }}>
              {video.description}
            </p>
          </div>
        </div>

        {/* ── Actions latérales ─── */}
        <div className="video-reels__actions">
          <ActionBtn onClick={toggleLike} modifier={isLiked ? 'video-reels__action-btn--liked' : ''} label={likesDisplay}>
            <Heart size={20} fill={isLiked ? 'currentColor' : 'none'} />
          </ActionBtn>

          <ActionBtn onClick={toggleSave} modifier={isSaved ? 'video-reels__action-btn--saved' : ''}>
            {isSaved ? <BookmarkCheck size={20} /> : <Bookmark size={20} />}
          </ActionBtn>

          <ActionBtn onClick={() => {}}>
            <Share2 size={20} />
          </ActionBtn>

          <div className="video-reels__divider" />

          <ActionBtn onClick={goUp}>
            <ChevronUp size={20} style={{ opacity: canGoUp ? 1 : 0.3 }} />
          </ActionBtn>

          <ActionBtn onClick={goDown}>
            <ChevronDown size={20} style={{ opacity: canGoDown ? 1 : 0.3 }} />
          </ActionBtn>
        </div>
      </div>

      {/* ── Compteur bas de page ─────────────────────────────────── */}
      <div className="video-reels__counter">
        <div className="video-reels__counter-pill">
          <strong>{currentIndex + 1}</strong>
          <span>/</span>
          <span>{filtered.length}</span>
        </div>

        <div style={{ display: 'flex', gap: 'var(--s-1)', alignItems: 'center' }}>
          {filtered.map((_, i) => (
            <button
              key={i}
              className={`video-reels__dot${i === currentIndex ? ' video-reels__dot--active' : ''}`}
              style={{ width: i === currentIndex ? 20 : 6 }}
              onClick={() => { setCurrentIndex(i); setIsPlaying(false); }}
              aria-label={`Vidéo ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
