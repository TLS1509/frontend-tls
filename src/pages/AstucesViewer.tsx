/**
 * AstucesViewer — design Figma "Learning App" porté sur le DS TLS.
 *
 * Layout :
 *  - Plein écran avec gradient primary-50 → accent cream (176deg).
 *  - Header : badge "ASTUCES" + titre h1 + subtitle + X close.
 *  - Progress dots (active = pill 40px, inactive = 12px).
 *  - Main card border-accent-400, image hero, titre accent, description,
 *    example list tinted accent.
 *  - Footer nav card : Précédent | counter | Suivant / Terminer (success).
 *
 * Routes : /lesson/:id/astuces
 */

import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { X, ChevronLeft, ChevronRight, Check } from 'lucide-react';

interface Astuce {
  id: number;
  number: number;
  title: string;
  description: string;
  image: string;
  badge: string;
  examples: string[];
}

const ASTUCES: Astuce[] = [
  {
    id: 1,
    number: 1,
    title: 'Raccourcis Clavier',
    description:
      "Gagnez du temps avec les raccourcis essentiels pour naviguer rapidement dans l'application et optimiser votre workflow quotidien.",
    image:
      'https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=1080&q=80',
    badge: 'ASTUCE PRODUCTIVITÉ',
    examples: [
      'Ctrl+Shift+P : Ouvrir la palette de commandes',
      'Ctrl+K : Recherche rapide de fichiers',
      'Alt+Tab : Naviguer entre les fenêtres',
    ],
  },
  {
    id: 2,
    number: 2,
    title: 'Organisation des fichiers',
    description:
      'Structurez vos projets avec une nomenclature claire et cohérente pour retrouver vos documents facilement et collaborer efficacement.',
    image:
      'https://images.unsplash.com/photo-1568667256549-094345857637?auto=format&fit=crop&w=1080&q=80',
    badge: 'ASTUCE ORGANISATION',
    examples: [
      'Utilisez des dossiers par projet ou client',
      'Nommez vos fichiers avec dates (YYYY-MM-DD)',
      'Créez une structure logique et cohérente',
    ],
  },
  {
    id: 3,
    number: 3,
    title: 'Automatisation des tâches',
    description:
      "Créez des templates réutilisables et des workflows automatisés pour gagner en efficacité et réduire les tâches répétitives.",
    image:
      'https://images.unsplash.com/photo-1518186285589-2f7649de83e0?auto=format&fit=crop&w=1080&q=80',
    badge: 'ASTUCE AUTOMATION',
    examples: [
      'Créez des templates pour vos documents récurrents',
      "Utilisez des outils d'automatisation (Zapier, Make)",
      'Planifiez vos tâches répétitives',
    ],
  },
  {
    id: 4,
    number: 4,
    title: 'Collaboration en équipe',
    description:
      'Utilisez les outils de partage et commentaires pour travailler efficacement avec votre équipe et maintenir une communication fluide.',
    image:
      'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1080&q=80',
    badge: 'ASTUCE COLLABORATION',
    examples: [
      'Utilisez les commentaires pour donner du feedback',
      'Partagez vos documents avec des permissions adaptées',
      'Organisez des points réguliers avec votre équipe',
    ],
  },
];

export const AstucesViewer: React.FC = () => {
  const navigate = useNavigate();
  const [currentIndex, setCurrentIndex] = useState(0);
  const currentTip = ASTUCES[currentIndex];

  const handleNext = () => {
    if (currentIndex < ASTUCES.length - 1) setCurrentIndex((i) => i + 1);
  };
  const handlePrev = () => {
    if (currentIndex > 0) setCurrentIndex((i) => i - 1);
  };
  const handleClose = () => navigate(-1);

  // Keyboard navigation
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') handleClose();
      if (e.key === 'ArrowRight') handleNext();
      if (e.key === 'ArrowLeft') handlePrev();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  });

  return (
    <div
      className="fixed inset-0 z-modal overflow-y-auto bg-gradient-to-b from-primary-50 via-white to-accent-50"
      role="dialog"
      aria-modal="true"
      aria-labelledby="astuces-title"
    >
      <div className="min-h-screen py-section px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto pb-section flex flex-col gap-stack-lg">

          {/* ── Header ─────────────────────────────────────────────── */}
          <header className="flex items-start justify-between gap-stack">
            <div className="flex-1 flex flex-col gap-stack">
              <span className="inline-flex self-start px-3 py-1 rounded-pill bg-accent-400 text-white text-micro font-bold uppercase tracking-wider">
                Astuces
              </span>
              <h1
                id="astuces-title"
                className="m-0 font-display text-h2 sm:text-h1 font-bold text-ink-900 leading-tight tracking-tight"
              >
                💡 Astuces Pratiques
              </h1>
              <p className="m-0 font-body text-body-sm text-ink-500">
                Format scroll story pour astuces pratiques avec exemples concrets.
              </p>
            </div>

            <button
              type="button"
              onClick={handleClose}
              aria-label="Fermer"
              className="shrink-0 inline-flex items-center justify-center w-11 h-11 rounded-pill bg-white/70 backdrop-blur-glass-light border border-ink-100 text-ink-700 hover:bg-white hover:text-ink-900 active:scale-95 transition-all duration-base"
            >
              <X size={20} />
            </button>
          </header>

          {/* ── Progress dots ──────────────────────────────────────── */}
          <div className="flex items-center justify-center gap-2" role="tablist" aria-label="Sélection d'astuce">
            {ASTUCES.map((_, index) => {
              const active = index === currentIndex;
              return (
                <button
                  key={index}
                  type="button"
                  role="tab"
                  aria-selected={active}
                  aria-label={`Astuce ${index + 1}`}
                  onClick={() => setCurrentIndex(index)}
                  className={[
                    'h-3 rounded-pill transition-all duration-base',
                    active
                      ? 'w-10 bg-accent-400'
                      : 'w-3 bg-ink-200 hover:bg-ink-300',
                  ].join(' ')}
                />
              );
            })}
          </div>

          {/* ── Main card ──────────────────────────────────────────── */}
          <article className="relative p-5 sm:p-8 rounded-3xl bg-white border-[3px] border-accent-400 shadow-[0_8px_32px_rgba(248,176,68,0.2)]">
            {/* Number badge top-left */}
            <div className="absolute -top-5 -left-2 sm:left-8 w-12 h-12 rounded-2xl bg-accent-400 inline-flex items-center justify-center shadow-md">
              <span className="font-display text-h4 font-bold text-white">
                {currentTip.number}
              </span>
            </div>

            {/* Category badge top-right */}
            <div className="flex justify-end mb-stack">
              <span className="inline-flex items-center px-3 py-1.5 rounded-xl bg-accent-400 text-white text-micro font-bold uppercase tracking-wider">
                {currentTip.badge}
              </span>
            </div>

            {/* Image */}
            <div className="rounded-2xl overflow-hidden mb-stack-lg shadow-md aspect-[16/9] sm:aspect-[2/1]">
              <img
                src={currentTip.image}
                alt=""
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>

            {/* Title */}
            <h2 className="m-0 mb-stack font-display text-h3 sm:text-h2 font-bold text-accent-600 tracking-tight">
              {currentTip.title}
            </h2>

            {/* Description */}
            <p className="m-0 font-body text-body sm:text-body-lg text-ink-700 leading-relaxed">
              {currentTip.description}
            </p>

            {/* Examples list */}
            {currentTip.examples.length > 0 && (
              <ul className="m-0 mt-stack-lg p-0 list-none flex flex-col gap-2">
                {currentTip.examples.map((example, idx) => (
                  <li
                    key={idx}
                    className="flex items-center gap-3 p-4 rounded-xl bg-accent-50 border border-accent-200"
                  >
                    <span className="shrink-0 inline-flex items-center justify-center w-8 h-8 rounded-pill bg-accent-400 text-white text-caption font-bold">
                      {idx + 1}
                    </span>
                    <span className="font-body text-body-sm text-ink-800 leading-snug">
                      {example}
                    </span>
                  </li>
                ))}
              </ul>
            )}
          </article>

          {/* ── Navigation card ────────────────────────────────────── */}
          <nav
            aria-label="Navigation astuces"
            className="p-4 sm:p-5 rounded-2xl bg-white shadow-[0_2px_12px_rgba(0,0,0,0.06)] flex items-center justify-between gap-stack"
          >
            <button
              type="button"
              onClick={handlePrev}
              disabled={currentIndex === 0}
              className="inline-flex items-center gap-2 px-4 py-3 rounded-xl text-ink-700 font-body text-body-sm font-medium hover:bg-ink-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors duration-base"
            >
              <ChevronLeft size={16} />
              <span className="hidden sm:inline">Précédent</span>
            </button>

            <span className="inline-flex items-center px-4 py-2 rounded-xl bg-ink-100 font-body text-body-sm font-bold text-ink-900 tabular-nums">
              {currentIndex + 1} / {ASTUCES.length}
            </span>

            {currentIndex < ASTUCES.length - 1 ? (
              <button
                type="button"
                onClick={handleNext}
                className="inline-flex items-center gap-2 px-4 sm:px-5 py-3 rounded-xl bg-accent-400 text-white font-body text-body-sm font-semibold shadow-[0_4px_12px_rgba(248,176,68,0.3)] hover:bg-accent-500 hover:shadow-[0_6px_16px_rgba(248,176,68,0.4)] active:scale-95 transition-all duration-base"
              >
                <span className="hidden sm:inline">Suivant</span>
                <ChevronRight size={16} />
              </button>
            ) : (
              <button
                type="button"
                onClick={handleClose}
                className="inline-flex items-center gap-2 px-4 sm:px-5 py-3 rounded-xl bg-success-base text-white font-body text-body-sm font-semibold shadow-[0_4px_12px_rgba(157,190,186,0.4)] hover:bg-success-fg active:scale-95 transition-all duration-base"
              >
                <Check size={16} />
                <span className="hidden sm:inline">Terminer</span>
              </button>
            )}
          </nav>
        </div>
      </div>
    </div>
  );
};

export default AstucesViewer;
