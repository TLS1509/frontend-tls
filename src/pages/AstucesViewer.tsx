/**
 * AstucesViewer : Fullscreen no-scroll modal pour astuces pratiques.
 *
 * Sprint 2 refactor (2026-06-29) :
 *  - Layout: fixed fullscreen without overflow-y-auto (all content fits 1 screen)
 *  - ViewerProgressTrail integrated (dots above card)
 *  - Breadcrumb navigation (Parcours · Lesson · Astuce)
 *  - Condensed vertical spacing: py-stack instead of py-section
 *  - Card content scrollable locally (max-h-[calc(100vh-...)])
 *  - Footer nav sticky at bottom (LessonNavigation)
 *
 * Route : /lesson/:id/astuces
 */

import React, { useCallback, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { Home } from 'lucide-react';
import { ViewerHeader } from '../components/patterns/ViewerHeader';
import { LessonNavigation } from '../components/patterns/LessonNavigation';
import { ViewerProgressTrail } from '../components/patterns/ViewerProgressTrail';
import { AstucesCard } from '../components/learning/AstucesCard';
import { Breadcrumb } from '../components/ui/Breadcrumb';
import { CompletionModal } from '../components/modals';
import { useLessonContext, resolveAfterLessonRoute } from '../lib/lesson-context';
import { useLessonProgressStore } from '../stores/persistence';
import type { PageTone } from '../lib/tone-classes';
import { MOCK_PARCOURS_DATA } from '../data/learningPaths';

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
    title: 'Raccourcis clavier',
    description:
      "Gagne du temps avec les raccourcis essentiels pour naviguer rapidement dans l'application et optimiser ton workflow quotidien.",
    image:
      'https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=1080&q=80',
    badge: 'Productivité',
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
      'Structure tes projets avec une nomenclature claire et cohérente pour retrouver tes documents facilement et collaborer efficacement.',
    image:
      'https://images.unsplash.com/photo-1568667256549-094345857637?auto=format&fit=crop&w=1080&q=80',
    badge: 'Organisation',
    examples: [
      'Utilise des dossiers par projet ou client',
      'Nomme tes fichiers avec dates (YYYY-MM-DD)',
      'Crée une structure logique et cohérente',
    ],
  },
  {
    id: 3,
    number: 3,
    title: 'Automatisation des tâches',
    description:
      "Crée des templates réutilisables et des workflows automatisés pour gagner en efficacité et réduire les tâches répétitives.",
    image:
      'https://images.unsplash.com/photo-1518186285589-2f7649de83e0?auto=format&fit=crop&w=1080&q=80',
    badge: 'Automatisation',
    examples: [
      'Crée des templates pour tes documents récurrents',
      "Utilise des outils d'automatisation (Zapier, Make)",
      'Planifie tes tâches répétitives',
    ],
  },
  {
    id: 4,
    number: 4,
    title: 'Collaboration en équipe',
    description:
      'Utilise les outils de partage et commentaires pour travailler efficacement avec ton équipe et maintenir une communication fluide.',
    image:
      'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1080&q=80',
    badge: 'Collaboration',
    examples: [
      'Utilise les commentaires pour donner du feedback',
      'Partage tes documents avec des permissions adaptées',
      'Organise des points réguliers avec ton équipe',
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
      className={['fixed inset-0 z-modal flex flex-col', TONE_GRADIENT_BG[tone]].join(' ')}
      role="dialog"
      aria-modal="true"
      aria-labelledby="astuces-title"
    >
      {/* ── Header (sticky, no shrink) ────────────────────────────────────
          Passe typographique du 24/09 : la barre ne porte plus le titre (elle
          le tenait en h1 à 16 px, précédé d'un émoji 💡 et doublé par le
          surtitre « Astuces pratiques ») mais une seule ligne de méta, 13 px.
          Le titre de l'écran est le h1 du contenu, et c'est lui qui nomme la
          boîte de dialogue (`astuces-title`). */}
      <ViewerHeader
        tone={tone}
        eyebrow="Astuces pratiques"
        subtitle={lessonCtx ? `Leçon ${lessonCtx.lesson.index} / ${lessonCtx.lesson.total}` : undefined}
        current={currentIndex + 1}
        total={total}
        progress={((currentIndex + 1) / total) * 100}
        onClose={handleClose}
        className="shrink-0"
      />

      {/* ── Breadcrumb navigation (clickable) — le composant du système :
          13 px, liens en 400, page courante en 600. Il était fait main en
          11 px et 500. ─────────────────────────────────────────────────── */}
      {lessonCtx && (
        <div className="shrink-0 px-4 sm:px-6 lg:px-10 py-1">
          <Breadcrumb
            variant="nav"
            items={[
              { label: MOCK_PARCOURS_DATA[lessonCtx.parcoursId]?.title || 'Parcours', icon: <Home size={14} /> },
              { label: lessonCtx.lesson.title },
              { label: `Astuce ${currentIndex + 1}/${total}` },
            ]}
            onNavigate={(i) => {
              if (i === 0) navigate(`/learning-paths/${lessonCtx.parcoursId}`);
              else if (i === 1) navigate(`/learning-paths/${lessonCtx.parcoursId}/lessons/${lessonCtx.lesson.id}`);
            }}
          />
        </div>
      )}

      {/* ── Content container — il défile si l'écran est trop court : centrée
          dans une zone `overflow-hidden`, la carte perdait son haut (la
          pastille numérotée) et son bas à 375 px. ────────────────────────── */}
      <div className="flex-1 flex flex-col min-h-0 px-4 sm:px-6 lg:px-10 pt-section pb-stack overflow-x-hidden overflow-y-auto">
        <div className="max-w-4xl mx-auto flex flex-col gap-stack w-full">

          {/* ── Titre de l'écran : h1 36, centré (une ou deux lignes) sur
              l'axe de la carte ; les points d'avancement lui sont collés. ── */}
          <div className="flex flex-col items-center gap-stack-sm">
            <h1 id="astuces-title" className="font-display text-h1 text-ink-900 text-center text-balance">
              {lessonCtx ? lessonCtx.lesson.title : 'Astuces pratiques'}
            </h1>
            <ViewerProgressTrail
              current={currentIndex}
              total={total}
              tone={tone}
              style="dots"
            />
          </div>

          {/* ── Main card with slide transition (height-constrained) ──── */}
          {/* La zone de glissement laisse passer la pastille numérotée, qui
              dépasse de la carte de 16 px en haut et de 8 à gauche sous 640 px :
              elle était rognée. */}
          <div className="overflow-x-hidden pt-stack -mx-2 px-2">
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={currentIndex}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
                className="w-full"
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

        </div>
      </div>

      {/* ── Footer navigation (sticky at bottom) ────────────────────────── */}
      <div className="shrink-0 px-4 sm:px-6 lg:px-10 py-stack border-t border-ink-100/50 backdrop-blur-glass-light">
        <div className="max-w-4xl mx-auto">
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
            finishLabel="Valider les astuces"
          />
        </div>
      </div>

      <CompletionModal
        isOpen={showCompletion}
        itemTitle={lessonCtx?.lesson.title ?? 'Astuces pratiques'}
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
