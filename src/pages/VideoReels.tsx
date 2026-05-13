/**
 * VideoReels — Lecteur vidéo vertical immersif (dark layout)
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

type ReelTone = 'brand' | 'warm' | 'cool' | 'amber' | 'teal' | 'rose';

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
  /** Background tone — drives gradient + accent. Defined via tokens, no hex. */
  tone: ReelTone;
}

/**
 * Tone → gradient classes (dark, cinematic) via DS tokens.
 * No hex hardcoded.
 */
const TONE_BG: Record<ReelTone, string> = {
  brand: 'bg-gradient-to-b from-primary-900 to-ink-900',
  warm:  'bg-gradient-to-b from-secondary-900 to-ink-900',
  cool:  'bg-gradient-to-b from-primary-800 to-ink-900',
  amber: 'bg-gradient-to-b from-accent-700 to-ink-900',
  teal:  'bg-gradient-to-b from-primary-700 to-ink-900',
  rose:  'bg-gradient-to-b from-secondary-800 to-ink-900',
};

/** Tone → avatar gradient (instructor bubble). */
const TONE_AVATAR: Record<ReelTone, string> = {
  brand: 'bg-gradient-to-br from-primary-400 to-primary-600',
  warm:  'bg-gradient-to-br from-secondary-400 to-secondary-600',
  cool:  'bg-gradient-to-br from-primary-300 to-primary-500',
  amber: 'bg-gradient-to-br from-accent-400 to-secondary-600',
  teal:  'bg-gradient-to-br from-primary-500 to-primary-700',
  rose:  'bg-gradient-to-br from-secondary-500 to-secondary-700',
};

/** Tone → ambient glow (radial overlay) — uses tone-aware Tailwind opacity. */
const TONE_GLOW: Record<ReelTone, string> = {
  brand: 'bg-[radial-gradient(ellipse_at_60%_40%,rgba(85,161,180,0.12),transparent_60%)]',
  warm:  'bg-[radial-gradient(ellipse_at_60%_40%,rgba(237,132,58,0.12),transparent_60%)]',
  cool:  'bg-[radial-gradient(ellipse_at_60%_40%,rgba(150,195,207,0.10),transparent_60%)]',
  amber: 'bg-[radial-gradient(ellipse_at_60%_40%,rgba(248,176,68,0.12),transparent_60%)]',
  teal:  'bg-[radial-gradient(ellipse_at_60%_40%,rgba(85,161,180,0.12),transparent_60%)]',
  rose:  'bg-[radial-gradient(ellipse_at_60%_40%,rgba(237,132,58,0.10),transparent_60%)]',
};

/** Tone → category badge classes (chip background + text + border). */
const TONE_CHIP: Record<ReelTone, string> = {
  brand: 'bg-primary-500/25 text-primary-200 border border-primary-400/40',
  warm:  'bg-secondary-500/25 text-secondary-200 border border-secondary-400/40',
  cool:  'bg-primary-400/25 text-primary-100 border border-primary-300/40',
  amber: 'bg-accent-400/25 text-accent-100 border border-accent-300/40',
  teal:  'bg-primary-500/25 text-primary-100 border border-primary-400/40',
  rose:  'bg-secondary-500/25 text-secondary-200 border border-secondary-400/40',
};

/** Tone → active category filter button. */
const TONE_CATEGORY_ACTIVE: Record<ReelTone, string> = {
  brand: 'bg-primary-500 text-white',
  warm:  'bg-secondary-500 text-white',
  cool:  'bg-primary-400 text-white',
  amber: 'bg-accent-500 text-ink-900',
  teal:  'bg-primary-600 text-white',
  rose:  'bg-secondary-600 text-white',
};

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
    tone: 'brand',
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
    tone: 'warm',
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
    tone: 'cool',
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
    tone: 'amber',
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
    tone: 'teal',
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
    tone: 'rose',
  },
];

/* ─── Bouton action latéral ──────────────────────────────────────────────── */

interface ActionBtnProps {
  onClick: () => void;
  liked?: boolean;
  saved?: boolean;
  label?: string;
  children: React.ReactNode;
}

const ActionBtn: React.FC<ActionBtnProps> = ({ onClick, liked, saved, label, children }) => {
  const btnClass = liked
    ? 'border-secondary-400 bg-secondary-400/10 text-secondary-400 hover:bg-secondary-400/20'
    : saved
    ? 'border-primary-400 bg-primary-400/10 text-primary-400 hover:bg-primary-400/20'
    : 'border-white/15 bg-black/45 text-white/85 hover:bg-black/55 hover:text-white';

  return (
    <div className="flex flex-col items-center gap-1">
      <button
        onClick={onClick}
        className={`w-[52px] h-[52px] rounded-full border flex items-center justify-center cursor-pointer transition-all duration-200 backdrop-blur-glass-light ${btnClass}`}
      >
        {children}
      </button>
      {label && (
        <span className="font-body text-caption text-white/70 font-semibold tracking-wider">
          {label}
        </span>
      )}
    </div>
  );
};

/* ─── Page ───────────────────────────────────────────────────────────────── */

export const VideoReels: React.FC = () => {
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState('Tous');
  const [currentIndex, setCurrentIndex]     = useState(0);
  const [isPlaying, setIsPlaying]           = useState(false);
  const [isMuted, setIsMuted]               = useState(false);
  const [likedIds, setLikedIds]             = useState<Set<string>>(new Set());
  const [savedIds, setSavedIds]             = useState<Set<string>>(new Set());

  const filtered =
    activeCategory === 'Tous'
      ? REELS
      : REELS.filter((r) => r.category === activeCategory);

  const video = filtered[currentIndex] ?? filtered[0];
  const canGoUp   = currentIndex > 0;
  const canGoDown = currentIndex < filtered.length - 1;
  const isLiked   = likedIds.has(video.id);
  const isSaved   = savedIds.has(video.id);
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

  const goUp   = () => { if (canGoUp)   { setCurrentIndex((i) => i - 1); setIsPlaying(false); } };
  const goDown = () => { if (canGoDown) { setCurrentIndex((i) => i + 1); setIsPlaying(false); } };

  if (!video) return null;

  return (
    <div className="min-h-screen bg-ink-950 font-body relative flex flex-col overflow-hidden">

      {/* Ambient glow — radial gradient tone-aware via Tailwind arbitrary values */}
      <div
        className={[
          'fixed inset-0 pointer-events-none z-0 transition-opacity duration-500',
          TONE_GLOW[video.tone],
        ].join(' ')}
      />

      {/* ── Barre haute flottante ─────────────────────────────────── */}
      <div className="fixed top-0 left-0 right-0 z-sticky px-6 py-5 flex items-center justify-between gap-4 bg-gradient-to-b from-black/65 to-transparent">

        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 px-4 py-2 rounded-xl border border-white/15 bg-black/55 backdrop-blur-glass-light text-white/85 font-body text-body-sm font-semibold cursor-pointer transition-all duration-200 hover:bg-black/75 hover:text-white"
        >
          <ArrowLeft size={16} />
          Retour
        </button>

        {/* Filtres catégorie */}
        <div className="flex gap-1 p-1.5 rounded-xl bg-black/55 backdrop-blur-glass-light border border-white/10 overflow-x-auto">
          {CATEGORIES.map((cat) => {
            const isActive = activeCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => handleCategory(cat)}
                className={[
                  'px-3 py-1.5 rounded-lg border-0 font-body text-caption cursor-pointer transition-all duration-200 whitespace-nowrap',
                  isActive
                    ? `font-bold ${TONE_CATEGORY_ACTIVE[video.tone]}`
                    : 'font-medium text-white/70 bg-transparent hover:text-white',
                ].join(' ')}
              >
                {cat}
              </button>
            );
          })}
        </div>

        <button
          onClick={() => setIsMuted((m) => !m)}
          className="w-10 h-10 rounded-full border border-white/15 bg-black/55 backdrop-blur-glass-light flex items-center justify-center text-white/85 cursor-pointer transition-all duration-200 hover:bg-black/75 shrink-0"
        >
          {isMuted ? <VolumeX size={16} /> : <Volume2 size={16} />}
        </button>
      </div>

      {/* ── Zone vidéo centrale ───────────────────────────────────── */}
      <div className="flex-1 flex items-center justify-center relative z-[1] min-h-screen">

        {/* Video card — gradient bg via tone tokens */}
        <div
          className={[
            'w-full max-w-[480px] h-screen relative overflow-hidden',
            TONE_BG[video.tone],
          ].join(' ')}
        >
          {/* Play button centré */}
          <div className="absolute inset-0 flex items-center justify-center z-[5]">
            <button
              onClick={() => setIsPlaying((p) => !p)}
              className={[
                'w-20 h-20 rounded-full border-2 border-white/22 bg-black/55 backdrop-blur-glass-medium flex items-center justify-center cursor-pointer text-white transition-all duration-200 hover:scale-[1.08]',
                isPlaying ? 'opacity-0' : 'opacity-100',
              ].join(' ')}
            >
              {isPlaying ? <Pause size={32} /> : <Play size={32} className="ml-1" />}
            </button>
          </div>

          {/* Overlay haut — badge catégorie + titre */}
          <div className="absolute top-0 left-0 right-0 px-6 pt-16 pb-8 bg-gradient-to-b from-black/65 to-transparent z-10">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-h4">{video.emoji}</span>
              <span
                className={[
                  'font-body text-caption font-bold px-2 py-0.5 rounded-md backdrop-blur-glass-light',
                  TONE_CHIP[video.tone],
                ].join(' ')}
              >
                {video.category}
              </span>
              <span className="ml-auto flex items-center gap-1 font-body text-caption text-white/70">
                <Clock size={11} />
                {video.duration}
              </span>
            </div>
            <h2 className="font-display text-h3 font-bold text-white/95 m-0 leading-tight">
              {video.title}
            </h2>
          </div>

          {/* Overlay bas — instructeur + description */}
          <div className="absolute bottom-0 left-0 right-0 px-6 pt-8 pb-16 bg-gradient-to-t from-black/85 to-transparent z-10">
            <div className="flex items-center gap-3 mb-3">
              {/* Avatar — gradient tone-aware via tokens */}
              <div
                className={[
                  'w-[38px] h-[38px] rounded-full shrink-0 border-2 border-white/22 flex items-center justify-center font-body text-caption font-bold text-white/95',
                  TONE_AVATAR[video.tone],
                ].join(' ')}
              >
                {video.instructorInitials}
              </div>
              <div>
                <div className="font-body text-body-sm font-semibold text-white/95">
                  {video.instructor}
                </div>
                <div className="flex items-center gap-1 font-body text-caption text-white/70 mt-0.5">
                  <Eye size={10} />
                  {video.views} vues
                </div>
              </div>
            </div>
            <p className="font-body text-body-sm text-white/85 leading-snug m-0">
              {video.description}
            </p>
          </div>
        </div>

        {/* ── Actions latérales ─── */}
        <div className="fixed right-6 z-sticky flex flex-col gap-4 bottom-[30%]">
          <ActionBtn onClick={toggleLike} liked={isLiked} label={likesDisplay}>
            <Heart size={20} fill={isLiked ? 'currentColor' : 'none'} />
          </ActionBtn>

          <ActionBtn onClick={toggleSave} saved={isSaved}>
            {isSaved ? <BookmarkCheck size={20} /> : <Bookmark size={20} />}
          </ActionBtn>

          <ActionBtn onClick={() => {}}>
            <Share2 size={20} />
          </ActionBtn>

          <div className="w-px h-6 bg-white/10 mx-auto" />

          <ActionBtn onClick={goUp}>
            <ChevronUp size={20} className={canGoUp ? '' : 'opacity-30'} />
          </ActionBtn>

          <ActionBtn onClick={goDown}>
            <ChevronDown size={20} className={canGoDown ? '' : 'opacity-30'} />
          </ActionBtn>
        </div>
      </div>

      {/* ── Compteur bas de page ─────────────────────────────────── */}
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-sticky flex items-center gap-3">
        <div className="px-5 py-2 rounded-xl bg-black/65 backdrop-blur-glass-light border border-white/10 font-body text-caption font-semibold flex gap-2">
          <strong className="text-white">{currentIndex + 1}</strong>
          <span className="text-white/70">/</span>
          <span className="text-white/70">{filtered.length}</span>
        </div>

        <div className="flex gap-1 items-center">
          {filtered.map((_, i) => (
            <button
              key={i}
              onClick={() => { setCurrentIndex(i); setIsPlaying(false); }}
              aria-label={`Vidéo ${i + 1}`}
              className={[
                'h-1.5 rounded-full border-0 cursor-pointer transition-all duration-300 p-0',
                i === currentIndex ? 'w-5 bg-primary-400' : 'w-1.5 bg-white/25',
              ].join(' ')}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
