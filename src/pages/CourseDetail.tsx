import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Card } from '../components/core/Card';
import { Button } from '../components/core/Button';
import { Badge } from '../components/ui/Badge';
import {
  ArrowLeft,
  BookOpen,
  ChevronDown,
  ChevronUp,
  Clock,
  GraduationCap,
  Lock,
  PlayCircle,
  Target,
  CheckCircle2,
  Sparkles,
} from 'lucide-react';

const STATIC_COURSE = {
  title: 'Enjeux de la maîtrise du prompt',
  description:
    "Apprenez à structurer vos prompts pour gagner en qualité et en reproductibilité — contenu statique aligné sur Figma CourseDetailPageUpdated.",
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

  return (
    <div className="min-h-screen bg-surface font-body">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-10 py-section flex flex-col gap-section">

        {/* ─ Back row ──────────────────────────────────────────────── */}
        <div className="flex items-center justify-between gap-3">
          <Button variant="ghost" size="sm" leadingIcon={<ArrowLeft size={16} />} onClick={() => navigate(-1)}>
            Retour
          </Button>
          <span className="font-body text-caption text-ink-400">Cours #{id ?? '—'}</span>
        </div>

        {/* ─ Editorial hero ────────────────────────────────────────── */}
        <section
          className="rounded-2xl border border-primary-200 px-8 pt-8 pb-7 shadow-md flex flex-col gap-3 relative overflow-hidden"
          style={{ background: 'linear-gradient(135deg, rgba(85, 161, 180, 0.14) 0%, rgba(255, 255, 255, 0.88) 100%)' }}
        >
          <p className="font-body text-micro font-bold uppercase tracking-[0.06em] text-primary-700 m-0">
            Learning Space • Détail du cours
          </p>
          <h1 className="font-display text-h1 font-extrabold tracking-tight text-ink-900 m-0 leading-[1.1]">
            {STATIC_COURSE.title}
          </h1>
          <p className="font-body text-body-lg leading-[1.65] text-ink-500 m-0">
            {STATIC_COURSE.description}
          </p>
          <div className="flex flex-wrap items-center gap-2">
            <Badge variant="info">{STATIC_COURSE.level}</Badge>
            <Badge variant="neutral">
              <span className="inline-flex items-center gap-1">
                <Clock size={12} /> {STATIC_COURSE.duration}
              </span>
            </Badge>
            <span className="font-body text-caption text-ink-500 inline-flex items-center gap-1">
              <GraduationCap size={12} />
              Formateur : {STATIC_COURSE.instructor}
            </span>
          </div>
          <div className="flex flex-wrap gap-2">
            <Button leadingIcon={<PlayCircle size={18} />}>Continuer la leçon</Button>
            <Button variant="secondary">Voir le badge</Button>
          </div>
        </section>

        {/* ─ KPI row ───────────────────────────────────────────────── */}
        <div className="grid grid-cols-3 gap-3">
          {[
            { label: 'Progression', value: `${STATIC_COURSE.progress}%`, meta: 'Parcours statique en cours' },
            { label: 'Étapes', value: STEPS.length, meta: 'Fondamentaux + application' },
            { label: 'Leçons', value: STEPS.reduce((acc, step) => acc + step.lessons.length, 0), meta: 'Format micro-learning guidé' },
          ].map((kpi) => (
            <Card key={kpi.label} className="flex flex-col gap-1 p-5">
              <p className="font-body text-caption text-ink-500 m-0">{kpi.label}</p>
              <p className="font-display text-h2 font-bold text-ink-900 m-0">{kpi.value}</p>
              <p className="font-body text-caption text-ink-400 m-0">{kpi.meta}</p>
            </Card>
          ))}
        </div>

        {/* ─ Main content layout ───────────────────────────────────── */}
        <div className="grid grid-cols-[minmax(0,1.4fr)_minmax(280px,0.8fr)] gap-4">

          {/* Left column */}
          <div className="flex flex-col gap-6">

            {/* Objectives + thumbnail */}
            <div className="grid grid-cols-[minmax(0,1.2fr)_minmax(260px,0.8fr)] gap-6">
              <Card className="flex flex-col gap-4 p-6">
                <h3 className="font-display text-h4 font-bold tracking-tight text-ink-900 m-0 flex items-center gap-2">
                  <Target size={16} /> Objectifs
                </h3>
                <ul className="m-0 pl-6 text-ink-500 flex flex-col gap-2 font-body text-body-sm">
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
              <h2 className="font-display text-h3 font-semibold text-ink-900 m-0 mb-4">Programme</h2>
              {STEPS.map((step) => {
                const open = openStep === step.id;
                return (
                  <div key={step.id} className="border border-ink-200 rounded-lg bg-white mb-3 overflow-hidden">
                    <button
                      type="button"
                      className="w-full flex items-center justify-between gap-3 px-4 py-4 border-0 bg-ink-50 font-body text-left cursor-pointer text-ink-900 hover:bg-ink-100 transition-colors duration-150"
                      onClick={() => setOpenStep(open ? null : step.id)}
                      aria-expanded={open}
                    >
                      <span>
                        <strong className="font-semibold">{step.title}</strong>
                        <span className="block mt-1 font-body text-caption text-ink-400">
                          {step.duration}
                        </span>
                      </span>
                      {open ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                    </button>
                    {open && (
                      <div className="px-4 pb-4">
                        {step.lessons.map((lesson) => (
                          <div
                            key={lesson.id}
                            className="flex items-center justify-between gap-3 py-3 border-b border-ink-100 last:border-b-0 font-body text-body-sm text-ink-700"
                          >
                            <span className="flex items-center gap-2">
                              {lesson.locked && <Lock size={14} className="text-ink-400 shrink-0" />}
                              {lesson.title}{' '}
                              <span className="text-caption text-ink-400">({lesson.duration})</span>
                            </span>
                            {lesson.current && <Badge variant="brand">En cours</Badge>}
                            {lesson.done && <Badge variant="success">Fait</Badge>}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* ─ Right sidebar ─────────────────────────────────────── */}
          <aside className="sticky top-[44px] flex flex-col gap-4 self-start">
            <Card className="flex flex-col gap-3 p-6">
              <h3 className="font-display text-h4 font-bold tracking-tight text-ink-900 m-0 flex items-center gap-2">
                <BookOpen size={16} /> Progression
              </h3>
              <p className="font-body text-body-sm text-ink-500 m-0">
                Avancement global du module (statique).
              </p>
              <p className="font-display text-h2 font-bold text-ink-900 m-0">
                {STATIC_COURSE.progress}%
              </p>
              <span className="font-body text-caption text-ink-500 inline-flex items-center gap-1">
                <CheckCircle2 size={12} /> Prochaine étape : première leçon
              </span>
            </Card>

            <div
              className="rounded-xl border border-accent-200 p-5 flex flex-col gap-2"
              style={{ background: 'linear-gradient(135deg, rgba(248, 176, 68, 0.14), rgba(248, 176, 68, 0.04))' }}
            >
              <p className="font-body text-body-sm font-semibold text-ink-900 m-0 inline-flex items-center gap-1.5">
                <Sparkles size={14} className="text-accent-400" />
                Conseil du formateur
              </p>
              <p className="font-body text-caption text-ink-600 m-0 leading-relaxed">
                Commencez avec la leçon 1 puis revenez ici pour dérouler les étapes suivantes.
              </p>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
};
