import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Card } from '../components/core/Card';
import { Button } from '../components/core/Button';
import { Badge } from '../components/ui/Badge';
import { EtapeAccordion } from '../components/patterns/EtapeAccordion';
import { Container } from '../components/layout';
import { useLessonProgressStore } from '../stores/persistence';
import { MOCK_PARCOURS_DATA } from '../data/learningPaths';
import {
  ArrowLeft,
  BookOpen,
  Clock,
  GraduationCap,
  Lock,
  PlayCircle,
  Target,
  CheckCircle2,
  Sparkles,
} from 'lucide-react';

const course = {
  title: 'Enjeux de la maîtrise du prompt',
  description:
    "Apprenez à structurer vos prompts pour gagner en qualité et en reproductibilité : contenu statique aligné sur Figma CourseDetailPageUpdated.",
  level: 'Débutant',
  duration: '3 h',
  instructor: 'Sophie Martin',
  progress: 0,
};

const STEPS = [
  {
    id: 1,
    title: 'Les fondamentaux du prompt',
    duration: '45 min',
    lessons: [
      { id: 1, title: 'Enjeux de la maîtrise du prompt', duration: '15 min', locked: false, current: true, done: false },
      { id: 2, title: "Dialoguer avec l'IA : concepts", duration: '15 min', locked: false, current: false, done: false },
      { id: 3, title: 'Méthode simple pour bien prompter', duration: '15 min', locked: false, current: false, done: false },
    ],
  },
  {
    id: 2,
    title: 'Devenir prompt designer',
    duration: '1 h 30',
    lessons: [
      { id: 4, title: 'Le rôle (persona)', duration: '15 min', locked: true, current: false, done: false },
      { id: 5, title: 'Le contexte', duration: '15 min', locked: true, current: false, done: false },
    ],
  },
];

export const CourseDetail: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [openStep, setOpenStep] = useState<number | null>(1);

  const lessonProgressStore = useLessonProgressStore();

  // Look up parcours from store data by route ID
  const parcours = id ? MOCK_PARCOURS_DATA[id] : undefined;

  // Build course metadata from store data, falling back to course
  const course = parcours
    ? {
        title: parcours.title,
        description: parcours.description,
        level: parcours.level,
        duration: parcours.duration,
        instructor: parcours.instructor ?? 'Sophie Martin',
        progress: (() => {
          const allLecons = parcours.etapes.flatMap((e) => e.lecons);
          const total = allLecons.length;
          if (total === 0) return course.progress;
          const completed = allLecons.filter((l) => lessonProgressStore.isLessonCompleted(l.id)).length;
          return Math.round((completed / total) * 100);
        })(),
      }
    : course;

  // Build steps from store data or fall back to STEPS
  const steps = parcours
    ? parcours.etapes.map((etape, ei) => ({
        id: ei + 1,
        title: etape.titre,
        duration: etape.duree ?? '—',
        lessons: etape.lecons.map((l) => ({
          id: l.id,
          title: l.titre,
          duration: l.duree ?? '—',
          locked: false,
          current: lessonProgressStore.get(l.id)?.currentSection !== undefined && !lessonProgressStore.isLessonCompleted(l.id),
          done: lessonProgressStore.isLessonCompleted(l.id),
        })),
      }))
    : STEPS;

  return (
    <div className="min-h-[100dvh] bg-surface font-body">
      {/* ─ Sticky header ─────────────────────────────────────────── */}
      <div className="sticky top-0 z-sticky bg-white/85 backdrop-blur-glass-light border-b border-ink-100">
        <Container width="medium" className="h-14 flex items-center justify-between gap-stack-xs">
          <Button variant="ghost" size="sm" leadingIcon={<ArrowLeft size={14} />} onClick={() => navigate(-1)}>
            Retour
          </Button>
          <span className="font-body text-caption text-ink-500">Cours #{id ?? ':'}</span>
        </Container>
      </div>

      <Container width="medium" className="py-section flex flex-col gap-section">

        {/* ─ Course header section ──────────────────────────────── */}
        <section className="flex flex-col gap-stack">
          <div className="flex flex-col gap-tight">
            <p className="font-body text-micro font-bold uppercase tracking-[0.06em] text-primary-700 m-0">
              Learning Space • Détail du cours
            </p>
            <h1 className="font-display text-h1 font-extrabold tracking-tight text-ink-900 m-0 leading-[1.1]">
              {course.title}
            </h1>
            <p className="font-body text-body-lg leading-[1.65] text-ink-500 m-0">
              {course.description}
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-stack-xs">
            <Badge variant="info">{course.level}</Badge>
            <Badge variant="neutral">
              <span className="inline-flex items-center gap-tight">
                <Clock size={12} /> {course.duration}
              </span>
            </Badge>
            <span className="font-body text-caption text-ink-500 inline-flex items-center gap-tight">
              <GraduationCap size={12} />
              Formateur : {course.instructor}
            </span>
          </div>
          <div className="flex flex-wrap gap-stack-xs">
            <Button leadingIcon={<PlayCircle size={18} />}>Continuer la leçon</Button>
            <Button variant="secondary">Voir le badge</Button>
          </div>
        </section>

        {/* ─ KPI row ───────────────────────────────────────────────── */}
        <div className="grid grid-cols-3 gap-stack-xs">
          {[
            { label: 'Progression', value: `${course.progress}%`, meta: 'Parcours statique en cours' },
            { label: 'Étapes', value: steps.length, meta: 'Fondamentaux + application' },
            { label: 'Leçons', value: steps.reduce((acc, step) => acc + step.lessons.length, 0), meta: 'Format micro-learning guidé' },
          ].map((kpi) => (
            <Card key={kpi.label} className="flex flex-col gap-tight p-5">
              <p className="font-body text-caption text-ink-500 m-0">{kpi.label}</p>
              <p className="font-display text-h2 font-bold text-ink-900 m-0">{kpi.value}</p>
              <p className="font-body text-caption text-ink-400 m-0">{kpi.meta}</p>
            </Card>
          ))}
        </div>

        {/* ─ Main content layout ───────────────────────────────────── */}
        <div className="grid grid-cols-[minmax(0,1.4fr)_minmax(280px,0.8fr)] gap-stack">

          {/* Left column */}
          <div className="flex flex-col gap-stack-lg">

            {/* Objectives + thumbnail */}
            <div className="grid grid-cols-[minmax(0,1.2fr)_minmax(260px,0.8fr)] gap-stack-lg">
              <Card className="flex flex-col gap-stack p-stack-lg">
                <h3 className="font-display text-h4 font-bold tracking-tight text-ink-900 m-0 flex items-center gap-stack-xs">
                  <Target size={16} /> Objectifs
                </h3>
                <ul className="m-0 pl-6 text-ink-500 flex flex-col gap-stack-xs font-body text-body-sm">
                  <li>Structurer un prompt clair et actionnable</li>
                  <li>Itérer à partir de retours utilisateurs</li>
                  <li>Adapter le ton et le format de sortie</li>
                </ul>
              </Card>
              <div className="rounded-xl min-h-[220px] bg-ink-50 border border-ink-200 flex items-center justify-center text-ink-400 font-body text-caption">
                Visuel / miniature du cours
              </div>
            </div>

            {/* Programme accordion */}
            <div>
              <h2 className="font-display text-h3 font-semibold text-ink-900 m-0 mb-stack">Programme</h2>
              {steps.map((step) => {
                const open = openStep === step.id;
                return (
                  <EtapeAccordion
                    key={step.id}
                    title={step.title}
                    duration={step.duration}
                    isOpen={open}
                    onToggle={() => setOpenStep(open ? null : step.id)}
                    className="mb-3"
                    bodyClassName="px-stack pb-stack"
                  >
                    {step.lessons.map((lesson) => (
                      <div
                        key={lesson.id}
                        className="flex items-center justify-between gap-stack-xs py-3 border-b border-ink-100 last:border-b-0 font-body text-body-sm text-ink-700"
                      >
                        <span className="flex items-center gap-stack-xs">
                          {lesson.locked && <Lock size={14} className="text-ink-400 shrink-0" />}
                          {lesson.title}{' '}
                          <span className="text-caption text-ink-400">({lesson.duration})</span>
                        </span>
                        {lesson.current && <Badge variant="brand">En cours</Badge>}
                        {lesson.done && <Badge variant="success">Fait</Badge>}
                      </div>
                    ))}
                  </EtapeAccordion>
                );
              })}
            </div>
          </div>

          {/* ─ Right sidebar ─────────────────────────────────────── */}
          <aside className="sticky top-[44px] flex flex-col gap-stack self-start">
            <Card className="flex flex-col gap-stack-xs p-stack-lg">
              <h3 className="font-display text-h4 font-bold tracking-tight text-ink-900 m-0 flex items-center gap-stack-xs">
                <BookOpen size={16} /> Progression
              </h3>
              <p className="font-body text-body-sm text-ink-500 m-0">
                Avancement global du module (statique).
              </p>
              <p className="font-display text-h2 font-bold text-ink-900 m-0">
                {course.progress}%
              </p>
              <span className="font-body text-caption text-ink-500 inline-flex items-center gap-tight">
                <CheckCircle2 size={12} /> Prochaine étape : première leçon
              </span>
            </Card>

            <div
              className="rounded-xl border border-accent-200 p-5 flex flex-col gap-stack-xs"
              style={{ background: 'linear-gradient(135deg, rgba(248, 176, 68, 0.14), rgba(248, 176, 68, 0.04))' }}
            >
              <p className="font-body text-body-sm font-semibold text-ink-900 m-0 inline-flex items-center gap-tight.5">
                <Sparkles size={14} className="text-accent-400" />
                Conseil du formateur
              </p>
              <p className="font-body text-caption text-ink-600 m-0 leading-relaxed">
                Commencez avec la leçon 1 puis revenez ici pour dérouler les étapes suivantes.
              </p>
            </div>
          </aside>
        </div>
      </Container>
    </div>
  );
};
