/**
 * VideoTutorial — Lecteur de tutoriel vidéo
 *
 * Layout 2 colonnes : vidéo (gauche) + sidebar Chapitres (droite)
 */

import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  ArrowLeft,
  Play,
  Clock,
  User,
  Bookmark,
  BookmarkCheck,
} from "lucide-react";

/* ─── Data ────────────────────────────────────────────────────────────────── */

const CHAPITRES = [
  { time: "00:00", label: "Introduction" },
  { time: "01:30", label: "Cadrage du contexte" },
  { time: "03:10", label: "Cadre de prompt : les 5 étapes" },
  { time: "05:45", label: "Exemple pratique 1 : Rédaction" },
  { time: "08:15", label: "Exemple pratique 2 : Analyse" },
  { time: "10:20", label: "Validation et itération" },
  { time: "11:40", label: "Résumé et takeaways" },
];

const TUTORIALS: Record<string, {
  category: string;
  title: string;
  description: string;
  duration: string;
  author: string;
  chapitres: typeof CHAPITRES;
}> = {
  "2": {
    category: "PROMPT ENGINEERING",
    title: "Construire un prompt structuré en 5 étapes",
    description:
      "Séquence pratique orientée exécution : cadrage, exemples, validation et itération sur des cas réels de formation.",
    duration: "12 min",
    author: "Marie Dubois",
    chapitres: CHAPITRES,
  },
  "6": {
    category: "IA EN FORMATION",
    title: "Maîtriser l'IA pour la Formation Professionnelle",
    description:
      "Comment intégrer l'intelligence artificielle dans vos parcours de formation pour maximiser l'engagement et les résultats d'apprentissage.",
    duration: "15 min",
    author: "Pierre Leclerc",
    chapitres: [
      { time: "00:00", label: "Introduction" },
      { time: "02:00", label: "Panorama des outils IA" },
      { time: "05:30", label: "Intégration dans les parcours" },
      { time: "09:00", label: "Cas pratiques" },
      { time: "12:45", label: "Bonnes pratiques" },
      { time: "14:00", label: "Conclusion et ressources" },
    ],
  },
};

const DEFAULT_TUTORIAL = TUTORIALS["2"];

/* ─── Component ──────────────────────────────────────────────────────────── */

export const VideoTutorial: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [saved, setSaved] = useState(false);
  const [activeChapter, setActiveChapter] = useState(0);
  const [playing, setPlaying] = useState(false);

  const tuto = (id && TUTORIALS[id]) ? TUTORIALS[id] : DEFAULT_TUTORIAL;

  return (
    <div className="min-h-screen bg-surface font-body flex flex-col">

      {/* ─ Sticky glass header ────────────────────────────────────── */}
      <div className="sticky top-0 z-sticky bg-white/85 backdrop-blur-glass-medium border-b border-ink-100 flex items-center justify-between px-6 h-14">
        <Button variant="ghost" size="sm" leadingIcon={<ArrowLeft size={14} />} onClick={() => navigate('/veille')}>
          Retour
        </Button>
        <button
          type="button"
          onClick={() => setSaved(!saved)}
          className={[
            'inline-flex items-center justify-center w-9 h-9 rounded-pill border cursor-pointer transition-colors duration-200',
            saved
              ? 'border-primary-300 text-primary-500 bg-primary-50'
              : 'border-ink-200 text-ink-400 bg-transparent hover:bg-ink-50',
          ].join(' ')}
        >
          {saved ? <BookmarkCheck size={16} /> : <Bookmark size={16} />}
        </button>
      </div>

      {/* ─ Main 2-column layout ───────────────────────────────────── */}
      <div className="flex-1 grid grid-cols-[1fr_300px] min-h-0">

        {/* ── Left column : title + description + video ─────────── */}
        <div className="flex flex-col border-r border-ink-200">

          {/* Header info */}
          <div className="px-8 py-6 pb-5">
            <h1 className="font-display text-h1 font-black text-ink-900 m-0 mb-3 leading-[1.15] tracking-tight">
              {tuto.title}
            </h1>
            <p className="font-body text-body text-ink-500 leading-relaxed m-0 mb-4 max-w-[640px]">
              {tuto.description}
            </p>
            <div className="flex items-center gap-3 flex-wrap">
              <span className="inline-flex items-center px-3 py-1 rounded-pill bg-primary-50 border border-primary-200 text-primary-700 font-body text-micro font-extrabold tracking-wider">
                {tuto.category}
              </span>
              <span className="inline-flex items-center gap-1 font-body text-caption text-ink-500">
                <Clock size={13} />
                {tuto.duration}
              </span>
              <span className="inline-flex items-center gap-1 font-body text-caption text-ink-500">
                <User size={13} />
                {tuto.author}
              </span>
            </div>
          </div>

          {/* Video area */}
          <div className="flex-1 bg-gradient-to-br from-primary-900 via-primary-800 to-ink-900 flex items-center justify-center relative min-h-[380px]">
            {/* Subtle radial overlays — complex gradients → style={{}} allowed */}
            <div
              className="absolute inset-0"
              style={{
                background:
                  "radial-gradient(ellipse at 30% 40%, rgba(85,161,180,0.12) 0%, transparent 60%), radial-gradient(ellipse at 70% 70%, rgba(85,161,180,0.04) 0%, transparent 50%)",
              }}
            />

            {/* Chapter indicator (top left) */}
            {activeChapter > 0 && (
              <div className="absolute top-4 left-5 bg-black/30 backdrop-blur-glass-light text-white font-body text-caption font-semibold px-2.5 py-1 rounded-md">
                {tuto.chapitres[activeChapter]?.label}
              </div>
            )}

            {/* Play / Pause button */}
            <button
              type="button"
              onClick={() => setPlaying(!playing)}
              aria-label={playing ? "Pause" : "Lire"}
              className={[
                'relative z-[1] w-[72px] h-[72px] rounded-full border-0 flex items-center justify-center cursor-pointer transition-all duration-300 hover:scale-105',
                playing
                  ? 'bg-white/20'
                  : 'bg-primary-500 shadow-[0_0_0_12px_rgba(85,161,180,0.20)]',
              ].join(' ')}
            >
              {playing ? (
                <div className="flex gap-1">
                  <div className="w-1 h-[22px] bg-white rounded-[2px]" />
                  <div className="w-1 h-[22px] bg-white rounded-[2px]" />
                </div>
              ) : (
                <Play size={28} fill="white" color="white" className="ml-[3px]" />
              )}
            </button>

            {/* Duration badge */}
            <div className="absolute bottom-4 right-5 bg-black/45 backdrop-blur-sm text-white font-body text-caption font-bold px-2.5 py-[3px] rounded-md">
              {tuto.duration}
            </div>
          </div>
        </div>

        {/* ── Right sidebar : Chapitres ─────────────────────────── */}
        <div className="flex flex-col bg-ink-50">

          {/* Chapitres header */}
          <div className="px-5 pt-5 pb-3 border-b border-ink-200">
            <span className="font-body text-caption font-extrabold text-ink-900 uppercase tracking-widest">
              Chapitres
            </span>
          </div>

          {/* Chapter list */}
          <div className="flex-1 overflow-y-auto py-2">
            {tuto.chapitres.map((ch, i) => {
              const isActive = activeChapter === i;
              return (
                <button
                  key={i}
                  type="button"
                  onClick={() => { setActiveChapter(i); setPlaying(true); }}
                  className={[
                    'flex items-start gap-3 w-full px-5 py-3 border-0 border-l-[3px] cursor-pointer text-left font-body transition-all duration-150',
                    isActive
                      ? 'bg-white border-l-primary-500'
                      : 'bg-transparent border-l-transparent hover:bg-ink-100',
                  ].join(' ')}
                >
                  <span className={[
                    'font-body text-caption font-bold min-w-[36px] mt-px shrink-0 tabular-nums',
                    isActive ? 'text-primary-600' : 'text-ink-400',
                  ].join(' ')}>
                    {ch.time}
                  </span>
                  <span className={[
                    'font-body text-caption leading-snug',
                    isActive ? 'font-bold text-ink-900' : 'font-medium text-ink-500',
                  ].join(' ')}>
                    {ch.label}
                  </span>
                  {isActive && (
                    <Play
                      size={12}
                      fill="#55A1B4"
                      color="#55A1B4"
                      className="shrink-0 mt-[2px] ml-auto"
                    />
                  )}
                </button>
              );
            })}
          </div>

          {/* Back to veille */}
          <div className="px-5 py-4 border-t border-ink-200">
            <button
              type="button"
              onClick={() => navigate("/veille")}
              className="inline-flex items-center gap-1.5 bg-transparent border-0 text-ink-500 font-body text-caption font-semibold cursor-pointer p-0 hover:text-primary-600 transition-colors duration-150"
            >
              <ArrowLeft size={13} /> Retour veille
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
