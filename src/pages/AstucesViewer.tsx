/**
 * AstucesViewer — Format scroll-story d'astuces pratiques.
 *
 * Phase 14.2a refactor :
 *  - Header custom → <ViewerHeader> (tone-aware, sticky, touch-sized close)
 *  - Dots ad-hoc  → <ProgressDots> (atom unifié)
 *  - Footer nav   → <LessonNavigation> (prev/dots/next molecule)
 *  - Tone inherited from <LessonProvider> if available, else fallback "sun"
 *    (which matches the warm/yellow visual identity of the "Astuce" content)
 *
 * Route : /lesson/:id/astuces
 */

import React, { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ViewerHeader } from '../components/patterns/ViewerHeader';
import { LessonNavigation } from '../components/patterns/LessonNavigation';
import { useLessonContext, resolveAfterLessonRoute } from '../lib/lesson-context';
import { TONE_BG_500, TONE_BG_50, TONE_BORDER_200, TONE_TEXT_700 } from '../lib/tone-classes';
import type { PageTone } from '../lib/tone-classes';

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

const TONE_GRADIENT_BG: Record<PageTone, string> = {
  primary: 'bg-gradient-to-b from-primary-50 via-white to-primary-50',
  warm:    'bg-gradient-to-b from-secondary-50 via-white to-secondary-50',
  sun:     'bg-gradient-to-b from-primary-50 via-white to-accent-50',
};

export const AstucesViewer: React.FC = () => {
  const navigate = useNavigate();
  const lessonCtx = useLessonContext();
  // Astuces are visually anchored to "sun" tone (warm yellow). If a parent
  // lesson injects a different tone via LessonProvider, defer to it.
  const tone: PageTone = lessonCtx?.tone ?? 'sun';

  const [currentIndex, setCurrentIndex] = useState(0);
  const currentTip = ASTUCES[currentIndex];
  const total = ASTUCES.length;

  const handleNext = useCallback(() => {
    setCurrentIndex((i) => Math.min(total - 1, i + 1));
  }, [total]);

  const handlePrev = useCallback(() => {
    setCurrentIndex((i) => Math.max(0, i - 1));
  }, []);

  const handleClose = useCallback(() => {
    if (lessonCtx) {
      navigate(`/learning-paths/${lessonCtx.parcoursId}/lessons/${lessonCtx.lesson.id}`);
    } else {
      navigate(-1);
    }
  }, [navigate, lessonCtx]);

  const handleFinish = useCallback(() => {
    navigate(resolveAfterLessonRoute(lessonCtx));
  }, [navigate, lessonCtx]);

  // Keyboard navigation
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') handleClose();
      if (e.key === 'ArrowRight') handleNext();
      if (e.key === 'ArrowLeft') handlePrev();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [handleClose, handleNext, handlePrev]);

  return (
    <div
      className={['fixed inset-0 z-modal overflow-y-auto', TONE_GRADIENT_BG[tone]].join(' ')}
      role="dialog"
      aria-modal="true"
      aria-labelledby="astuces-title"
    >
      <ViewerHeader
        tone={tone}
        eyebrow="Astuces pratiques"
        title={lessonCtx ? lessonCtx.lesson.title : '💡 Astuces Pratiques'}
        subtitle={lessonCtx ? `Leçon ${lessonCtx.lesson.index} / ${lessonCtx.lesson.total}` : undefined}
        current={currentIndex + 1}
        total={total}
        progress={((currentIndex + 1) / total) * 100}
        onClose={handleClose}
      />

      <main className="px-4 sm:px-6 lg:px-8 py-section">
        <div className="max-w-4xl mx-auto pb-section flex flex-col gap-section">

          <header className="flex flex-col gap-stack" id="astuces-title">
            <h1 className="m-0 font-display text-h2 sm:text-h1 font-bold text-ink-900 leading-tight tracking-tight">
              💡 Astuces Pratiques
            </h1>
            <p className="m-0 font-body text-body-sm text-ink-500">
              Format scroll-story · astuces concrètes avec exemples directement applicables.
            </p>
          </header>

          {/* ── Main card ──────────────────────────────────────────── */}
          <article
            className={[
              'relative p-5 sm:p-8 rounded-3xl bg-white border-[3px] shadow-[0_8px_32px_rgba(248,176,68,0.18)]',
              tone === 'sun'  ? 'border-accent-400'
              : tone === 'warm' ? 'border-secondary-400'
                                 : 'border-primary-400',
            ].join(' ')}
          >
            {/* Number badge top-left */}
            <div
              className={[
                'absolute -top-5 -left-2 sm:left-8 w-12 h-12 rounded-2xl inline-flex items-center justify-center shadow-md',
                TONE_BG_500[tone],
              ].join(' ')}
            >
              <span className="font-display text-h4 font-bold text-white">
                {currentTip.number}
              </span>
            </div>

            {/* Category badge top-right */}
            <div className="flex justify-end mb-stack">
              <span
                className={[
                  'inline-flex items-center px-3 py-1.5 rounded-xl text-white text-micro font-bold uppercase tracking-wider',
                  TONE_BG_500[tone],
                ].join(' ')}
              >
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
            <h2 className={['m-0 mb-stack font-display text-h3 sm:text-h2 font-bold tracking-tight', TONE_TEXT_700[tone]].join(' ')}>
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
                    className={[
                      'flex items-center gap-3 p-4 rounded-xl border',
                      TONE_BG_50[tone],
                      TONE_BORDER_200[tone],
                    ].join(' ')}
                  >
                    <span
                      className={[
                        'shrink-0 inline-flex items-center justify-center w-8 h-8 rounded-pill text-white text-caption font-bold',
                        TONE_BG_500[tone],
                      ].join(' ')}
                    >
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

          {/* ── Footer navigation ────────────────────────────────────── */}
          <LessonNavigation
            tone={tone}
            current={currentIndex + 1}
            total={total}
            onPrev={handlePrev}
            onNext={handleNext}
            onFinish={handleFinish}
            onDotSelect={(idx) => setCurrentIndex(idx)}
            finishLabel="Terminer les astuces"
          />
        </div>
      </main>
    </div>
  );
};

export default AstucesViewer;
