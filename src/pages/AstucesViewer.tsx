/**
 * AstucesViewer : Format scroll-story d'astuces pratiques.
 *
 * Phase 14.2a refactor :
 *  - Header custom → <ViewerHeader> (tone-aware, sticky, touch-sized close)
 *  - Dots ad-hoc  → <ProgressDots> (atom unifié)
 *  - Footer nav   → <LessonNavigation> (prev/dots/next molecule)
 *  - Tone inherited from <LessonProvider> if available, else fallback "sun"
 *
 * Sprint 1 (2026-06-29) :
 *  - Framer-motion slide transitions between cards (direction-aware)
 *  - CompletionModal on last card → marks item in useLessonProgressStore
 *
 * Route : /lesson/:id/astuces
 */

import React, { useCallback, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { ViewerHeader } from '../components/patterns/ViewerHeader';
import { LessonNavigation } from '../components/patterns/LessonNavigation';
import { AstucesCard } from '../components/learning/AstucesCard';
import { CompletionModal } from '../components/modals';
import { useLessonContext, resolveAfterLessonRoute } from '../lib/lesson-context';
import { useLessonProgressStore } from '../stores/persistence';
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
  const { id: itemId } = useParams<{ id: string }>();
  const lessonCtx = useLessonContext();
  const tone: PageTone = lessonCtx?.tone ?? 'sun';
  const prefersReduced = useReducedMotion();

  const progressStore = useLessonProgressStore();

  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState<1 | -1>(1);
  const [showCompletion, setShowCompletion] = useState(false);

  const currentTip = ASTUCES[currentIndex];
  const total = ASTUCES.length;

  const handleNext = useCallback(() => {
    setDirection(1);
    setCurrentIndex((i) => Math.min(total - 1, i + 1));
  }, [total]);

  const handlePrev = useCallback(() => {
    setDirection(-1);
    setCurrentIndex((i) => Math.max(0, i - 1));
  }, []);

  const handleClose = useCallback(() => {
    if (lessonCtx) {
      navigate(`/learning-paths/${lessonCtx.parcoursId}/lessons/${lessonCtx.lesson.id}`);
    } else {
      navigate(-1);
    }
  }, [navigate, lessonCtx]);

  const markCompleted = useCallback(() => {
    const id = itemId ?? 'astuces-default';
    progressStore.setSection(id, 0, 1);
    progressStore.completeSection(id, 0);
  }, [itemId, progressStore]);

  const handleFinish = useCallback(() => {
    markCompleted();
    setShowCompletion(true);
  }, [markCompleted]);

  // Keyboard navigation
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (showCompletion) return;
      if (e.key === 'Escape') handleClose();
      if (e.key === 'ArrowRight') handleNext();
      if (e.key === 'ArrowLeft') handlePrev();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [handleClose, handleNext, handlePrev, showCompletion]);

  // Slide variants — direction-aware, respects reduced-motion
  const slideVariants = prefersReduced
    ? {
        enter: { opacity: 0 },
        center: { opacity: 1 },
        exit: { opacity: 0 },
      }
    : {
        enter: (dir: number) => ({ x: dir * 80, opacity: 0 }),
        center: { x: 0, opacity: 1 },
        exit: (dir: number) => ({ x: dir * -80, opacity: 0 }),
      };

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

      <div className="px-stack sm:px-stack-lg lg:px-section py-section">
        <div className="max-w-4xl mx-auto pb-section flex flex-col gap-section">

          <header className="flex flex-col gap-stack" id="astuces-title">
            <h1 className="m-0 font-display text-h2 sm:text-h1 font-bold text-ink-900 leading-tight tracking-tight">
              💡 Astuces Pratiques
            </h1>
            <p className="m-0 font-body text-body-sm text-ink-500">
              Format scroll-story · astuces concrètes avec exemples directement applicables.
            </p>
          </header>

          {/* ── Main card with slide transition ───────────────────── */}
          <div className="overflow-hidden">
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={currentIndex}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
              >
                <AstucesCard
                  number={currentTip.number}
                  badge={currentTip.badge}
                  image={currentTip.image}
                  title={currentTip.title}
                  description={currentTip.description}
                  examples={currentTip.examples}
                  tone={tone}
                />
              </motion.div>
            </AnimatePresence>
          </div>

          {/* ── Footer navigation ────────────────────────────────────── */}
          <LessonNavigation
            tone={tone}
            current={currentIndex + 1}
            total={total}
            onPrev={handlePrev}
            onNext={handleNext}
            onFinish={handleFinish}
            onDotSelect={(idx) => {
              setDirection(idx > currentIndex ? 1 : -1);
              setCurrentIndex(idx);
            }}
            finishLabel="Terminer les astuces"
          />
        </div>
      </div>

      <CompletionModal
        isOpen={showCompletion}
        itemTitle={lessonCtx?.lesson.title ?? 'Astuces Pratiques'}
        xpEarned={50}
        onClose={() => {
          setShowCompletion(false);
          navigate(resolveAfterLessonRoute(lessonCtx));
        }}
      />
    </div>
  );
};

export default AstucesViewer;
