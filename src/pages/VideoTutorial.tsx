/**
 * VideoTutorial : Lecteur de tutoriel vidéo
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
import { Button } from "../components/core/Button";
import { MetaPill } from "../components/ui/MetaPill";

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
    category: "Prompt engineering",
    title: "Construire un prompt structuré en 5 étapes",
    description:
      "Séquence pratique orientée exécution : cadrage, exemples, validation et itération sur des cas réels de formation.",
    duration: "12 min",
    author: "Marie Dubois",
    chapitres: CHAPITRES,
  },
  "6": {
    category: "IA en formation",
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
    <div className="min-h-[100dvh] bg-surface font-body flex flex-col">

      {/* ─ Sticky glass header ────────────────────────────────────── */}
      <div className="sticky top-0 z-sticky bg-white/85 backdrop-blur-glass-medium border-b border-ink-100 flex items-center justify-between px-stack-lg h-14">
        <Button emphasis="outline" size="sm" leadingIcon={<ArrowLeft size={14} />} onClick={() => navigate('/veille')}>
          Retour
        </Button>
        <Button
          iconOnly
          size="sm"
          emphasis={saved ? 'soft' : 'outline'}
          tone={saved ? 'brand' : 'neutral'}
          onClick={() => setSaved(!saved)}
          aria-label={saved ? 'Retirer des favoris' : 'Enregistrer'}
          aria-pressed={saved}
        >
          {saved ? <BookmarkCheck /> : <Bookmark />}
        </Button>
      </div>

      {/* ─ Main 2-column layout — une colonne sous 1024 px : à 375, la
          colonne de 300 px des chapitres laissait 75 px au titre (six lignes)
          et coupait les chapitres. ───────────────────────────────────────── */}
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-[1fr_300px] min-h-0">

        {/* ── Left column : title + description + video ─────────── */}
        <div className="flex flex-col lg:border-r border-ink-200">

          {/* Header info — h1 → 12 → chapô 18 ink-700 (la description était à
              16 au cran 500) → 12 → méta 13 ink-600. L'interligne et
              l'approche du titre sont ceux du token (ils étaient forcés). */}
          <div className="px-stack sm:px-section py-stack-lg flex flex-col gap-stack-sm">
            <h1 className="font-display text-h1 text-ink-900">
              {tuto.title}
            </h1>
            <p className="font-body text-body-lg text-ink-700 max-w-prose">
              {tuto.description}
            </p>
            <div className="flex items-center gap-stack-xs flex-wrap">
              <MetaPill text={tuto.category} tone="primary" />
              <span className="inline-flex items-center gap-stack-3xs font-body text-caption text-ink-600 tabular-nums">
                <Clock size={14} aria-hidden="true" />
                {tuto.duration}
              </span>
              <span className="inline-flex items-center gap-stack-3xs font-body text-caption text-ink-600">
                <User size={14} aria-hidden="true" />
                {tuto.author}
              </span>
            </div>
          </div>

          {/* Video area */}
          <div className="flex-1 bg-gradient-to-br from-primary-900 via-primary-800 to-ink-900 flex items-center justify-center relative min-h-[380px]">
            {/* Subtle radial overlays : complex gradients → style={{}} allowed */}
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
                'relative z-[1] w-[72px] h-[72px] rounded-pill border-0 flex items-center justify-center cursor-pointer transition-all duration-300 hover:scale-105 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white/70',
                playing
                  ? 'bg-white/20'
                  : 'bg-primary-600 shadow-[0_0_0_12px_rgba(85,161,180,0.20)]',
              ].join(' ')}
            >
              {playing ? (
                <div className="flex gap-tight">
                  <div className="w-1 h-[22px] bg-white rounded-[2px]" />
                  <div className="w-1 h-[22px] bg-white rounded-[2px]" />
                </div>
              ) : (
                <Play size={28} className="ml-[3px] fill-white text-white" />
              )}
            </button>

            {/* Duration badge */}
            <div className="absolute bottom-4 right-5 bg-black/45 backdrop-blur-sm text-white font-body text-caption font-semibold tabular-nums px-2.5 py-[3px] rounded-pill">
              {tuto.duration}
            </div>
          </div>
        </div>

        {/* ── Right sidebar : Chapitres ─────────────────────────── */}
        <nav className="flex flex-col bg-ink-50" aria-label="Chapitres de la vidéo">

          {/* Chapitres header — le libellé commun des encarts (13/600
              ink-600) ; il était en 800, capitales très espacées. La liste est
              une navigation nommée : le libellé n'a pas à être un titre. */}
          <div className="px-stack-md pt-stack-md pb-3 border-b border-ink-200">
            <p className="font-body text-caption font-semibold text-ink-600">
              Chapitres
            </p>
          </div>

          {/* Chapter list */}
          <div className="flex-1 overflow-y-auto py-stack-xs">
            {tuto.chapitres.map((ch, i) => {
              const isActive = activeChapter === i;
              return (
                <button
                  key={i}
                  type="button"
                  onClick={() => { setActiveChapter(i); setPlaying(true); }}
                  /* Chapitre : le libellé est du texte qu'on lit — 16 (il était
                     à 13, au cran 500 hors lecture) ; 600 pour le chapitre en
                     cours. L'horodatage est une légende tabulaire, calée sur la
                     ligne de base du libellé. Plus de barre d'accent de 3 px à
                     gauche (DESIGN §11) : le fond blanc et l'icône disent le
                     chapitre en cours. */
                  className={[
                    'flex items-baseline gap-stack-xs w-full px-stack-md py-3 border-0 cursor-pointer text-left font-body transition-all duration-150 focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-primary-500',
                    isActive
                      ? 'bg-white'
                      : 'bg-transparent hover:bg-ink-100',
                  ].join(' ')}
                >
                  <span className={[
                    'font-body text-caption font-semibold min-w-[40px] shrink-0 tabular-nums',
                    isActive ? 'text-primary-800' : 'text-ink-600',
                  ].join(' ')}>
                    {ch.time}
                  </span>
                  <span className={[
                    'font-body text-body',
                    isActive ? 'font-semibold text-ink-900' : 'text-ink-700',
                  ].join(' ')}>
                    {ch.label}
                  </span>
                  {isActive && (
                    <Play
                      size={14}
                      aria-hidden="true"
                      className="shrink-0 self-center ml-auto fill-primary-700 text-primary-700"
                    />
                  )}
                </button>
              );
            })}
          </div>

          {/* Back to veille */}
          <div className="px-stack-md py-stack border-t border-ink-200">
            <button
              type="button"
              onClick={() => navigate("/veille")}
              className="inline-flex items-center gap-stack-2xs bg-transparent border-0 text-ink-600 font-body text-caption font-semibold cursor-pointer p-0 hover:text-primary-800 transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500 rounded-sm"
            >
              <ArrowLeft size={14} aria-hidden="true" /> Retour à la veille
            </button>
          </div>
        </nav>
      </div>
    </div>
  );
};
