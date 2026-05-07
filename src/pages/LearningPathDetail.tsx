/**
 * Learning Path Detail Page
 */

import React, { useState, useMemo, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '../components/core/Button';
import { PositionnementModal } from '../components/modals';
import { MetaPillGroup } from '../components/ui/MetaPillGroup';
import { Badge } from '../components/ui/Badge';
import { InlineProgress } from '../components/patterns/InlineProgress';
import { CardGrid } from '../components';
import {
  ArrowLeft,
  Clock3,
  BookOpen,
  ChevronDown,
  ChevronUp,
  Lock,
  Play,
  CheckCircle2,
  FileText,
  Video,
  Mic,
  ClipboardList,
  MessagesSquare,
  Sparkles,
  Award,
  Target,
  GraduationCap,
  Layers,
  Lightbulb,
  Briefcase,
  TrendingUp,
} from 'lucide-react';
import {
  MOCK_PARCOURS_DATA,
  getToneFromLevel,
  type Tone,
  type ResourceKind,
  type Lecon,
  type Etape,
  type ComplementaryItem,
  type FinalProject,
  type Parcours,
} from '../data/learningPaths';

const RESOURCE_ICON: Record<ResourceKind, React.ComponentType<{ size?: number }>> = {
  guide: FileText,
  video: Video,
  template: ClipboardList,
  podcast: Mic,
  exercise: MessagesSquare,
};

const RESOURCE_LABEL: Record<ResourceKind, string> = {
  guide: 'Guide',
  video: 'Vidéo',
  template: 'Template',
  podcast: 'Podcast',
  exercise: 'Exercice',
};

/* ── Tone → Tailwind class maps ─────────────────────────────── */
const TONE_TEXT: Record<Tone, string> = {
  primary: 'text-primary-500',
  warm:    'text-secondary-500',
  sun:     'text-accent-400',
};
const TONE_BG_50: Record<Tone, string> = {
  primary: 'bg-primary-50',
  warm:    'bg-secondary-50',
  sun:     'bg-accent-50',
};
const TONE_BORDER_200: Record<Tone, string> = {
  primary: 'border-primary-200',
  warm:    'border-secondary-200',
  sun:     'border-accent-200',
};
const TONE_BG_500: Record<Tone, string> = {
  primary: 'bg-primary-500',
  warm:    'bg-secondary-500',
  sun:     'bg-accent-400',
};
const TONE_BORDER_500: Record<Tone, string> = {
  primary: 'border-primary-500',
  warm:    'border-secondary-500',
  sun:     'border-accent-400',
};
const TONE_HERO: Record<Tone, string> = {
  primary: 'bg-gradient-to-br from-primary-500 to-secondary-500',
  warm:    'bg-gradient-to-br from-secondary-500 to-accent-400',
  sun:     'bg-gradient-to-br from-accent-400 to-primary-500',
};

const calculateStepUnlocked = (idx: number, etapes: Etape[]): boolean =>
  idx === 0 || etapes[idx - 1].completed;
const calculateStepCompleted = (step: Etape): boolean =>
  step.lecons.every((l: Lecon) => l.completed);

export const LearningPathDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [parcoursData, setParcoursData] = useState<Parcours | null>(null);
  const [expandedSteps, setExpandedSteps] = useState<string[]>([]);
  const [activeTab, setActiveTab] = useState<'steps' | 'project'>('steps');
  const [showPositionnement, setShowPositionnement] = useState(false);
  const [positioned, setPositioned] = useState(false);

  useEffect(() => {
    if (id && MOCK_PARCOURS_DATA[id]) {
      const data = MOCK_PARCOURS_DATA[id];
      setParcoursData(data);
      const first = data.etapes.find((e: Etape) => !e.completed && e.unlocked);
      if (first) setExpandedSteps([first.id]);
    }
  }, [id]);

  const parcours = useMemo(() => {
    if (!parcoursData) return null;
    const etapesWithUnlock = parcoursData.etapes.map((etape: Etape, idx: number) => ({
      ...etape,
      unlocked: calculateStepUnlocked(idx, parcoursData.etapes),
      completed: calculateStepCompleted(etape),
    }));
    const allStepsComplete = etapesWithUnlock.every((e) => e.completed);
    return {
      ...parcoursData,
      etapes: etapesWithUnlock,
      finalProject: parcoursData.finalProject
        ? { ...parcoursData.finalProject, locked: !allStepsComplete }
        : undefined,
    };
  }, [parcoursData]);

  if (!parcours) {
    return (
      <div className="p-12 text-center">
        <p className="text-ink-500 mb-4">Parcours introuvable.</p>
        <Button onClick={() => navigate('/learning-paths')}>Retour aux parcours</Button>
      </div>
    );
  }

  const tone = getToneFromLevel(parcours.level);
  const totalLessons = parcours.etapes.reduce((s: number, e: Etape) => s + e.lecons.length, 0);
  const completedLessons = parcours.etapes.reduce(
    (s: number, e: Etape) => s + e.lecons.filter((l: Lecon) => l.completed).length,
    0,
  );
  const progressPct = totalLessons > 0 ? Math.round((completedLessons / totalLessons) * 100) : 0;

  const toggleStep = (stepId: string) =>
    setExpandedSteps((prev) =>
      prev.includes(stepId) ? prev.filter((x) => x !== stepId) : [...prev, stepId],
    );

  const carouselItems = parcours.complementaryContent ?? [];

  const OBJECTIFS = [
    {
      Icon: Target,
      label: 'Compétences opérationnelles',
      desc: 'Des méthodes applicables immédiatement dans votre contexte professionnel.',
      classes: `${TONE_BG_50[tone]} ${TONE_BORDER_200[tone]}`,
      iconColor: TONE_TEXT[tone],
    },
    {
      Icon: Lightbulb,
      label: 'Insights & prise de conscience',
      desc: 'Comprendre vos patterns, identifier vos angles morts, renforcer votre posture.',
      classes: 'bg-accent-100 border-accent-300',
      iconColor: 'text-accent-700',
    },
    {
      Icon: Briefcase,
      label: 'Outils & templates',
      desc: 'Des ressources pratiques (guides, templates, exercices) pour agir en continu.',
      classes: 'bg-secondary-100 border-secondary-200',
      iconColor: 'text-secondary-700',
    },
    {
      Icon: TrendingUp,
      label: 'Progression mesurable',
      desc: 'Évaluez vos acquis via le quiz de positionnement et le projet final.',
      classes: 'bg-success-bg border-success-base/30',
      iconColor: 'text-success-fg',
    },
  ];

  return (
    <>
      <div className="min-h-screen bg-ink-50">
        {/* HERO */}
        <div className={`relative overflow-hidden pt-10 pb-12 ${TONE_HERO[tone]}`}>
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/15 pointer-events-none" />

          <div className="relative z-10 px-10 mb-8">
            <button
              onClick={() => navigate(parcours.backUrl)}
              className="glass-on-color learning-path-hero-btn inline-flex items-center gap-2 px-4 py-2.5 rounded-xl font-semibold cursor-pointer text-body-sm"
            >
              <ArrowLeft size={16} /> Retour
            </button>
          </div>

          <div className="relative z-10 max-w-[1180px] mx-auto px-10 text-white">
            <div className="flex flex-wrap gap-2 mb-5">
              {[
                { icon: GraduationCap, label: parcours.instructor },
                { icon: Clock3, label: parcours.duration },
                { icon: BookOpen, label: `${totalLessons} leçons` },
                { icon: Layers, label: parcours.level },
              ].map(({ icon: Icon, label }) => (
                <span
                  key={label}
                  className="glass-on-color learning-path-hero-pill inline-flex items-center gap-1 px-3 py-2 rounded-pill text-caption font-semibold"
                >
                  <Icon size={14} /> {label}
                </span>
              ))}
            </div>

            <h1 className="font-display text-h1 font-bold leading-tight m-0 mb-4 text-white tracking-tight">
              {parcours.title}
            </h1>
            <p className="text-body leading-relaxed m-0 mb-8 max-w-[640px] text-white/95">
              {parcours.description}
            </p>

            <div className="flex justify-between items-center gap-3 mb-5">
              <span className="text-caption font-medium text-white/80">
                Progression — {completedLessons}/{totalLessons} leçons
              </span>
              <InlineProgress
                value={progressPct}
                tone="primary"
                showLabel={true}
                size="md"
                className="hero-progress"
              />
            </div>

            {progressPct === 0 && !positioned && (
              <button
                onClick={() => setShowPositionnement(true)}
                className="glass-on-color inline-flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-body cursor-pointer"
              >
                🎯 Se positionner &amp; commencer
              </button>
            )}
          </div>
        </div>

        {/* MAIN */}
        <div className="max-w-[1180px] mx-auto p-10">
          {/* Objectifs */}
          <div className="mb-8">
            <div className="flex items-center gap-2 mb-5">
              <Target size={18} className={TONE_TEXT[tone]} />
              <h2 className="m-0 font-display text-h3 font-bold text-ink-900">
                Ce que vous allez acquérir
              </h2>
            </div>
            <div className="grid gap-4 grid-cols-[repeat(auto-fit,minmax(220px,1fr))]">
              {OBJECTIFS.map(({ Icon, label, desc, classes, iconColor }) => (
                <div
                  key={label}
                  className={`p-5 rounded-xl border flex flex-col gap-3 transition-all hover:-translate-y-0.5 hover:shadow-md ${classes}`}
                >
                  <div className="w-10 h-10 rounded-md bg-white/50 flex items-center justify-center shrink-0">
                    <Icon size={20} className={iconColor} />
                  </div>
                  <div>
                    <h3 className="m-0 mb-1 font-display text-body font-bold text-ink-900">
                      {label}
                    </h3>
                    <p className="m-0 text-body-sm text-ink-500 leading-relaxed">{desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Tab nav */}
          <div className="flex gap-2 p-2 rounded-2xl bg-ink-100 mb-8">
            {(
              [
                { key: 'steps', label: 'Étapes du parcours', icon: BookOpen },
                { key: 'project', label: 'Projet final', icon: Award },
              ] as const
            ).map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.key;
              return (
                <button
                  key={tab.key}
                  onClick={() => setActiveTab(tab.key)}
                  className={[
                    'flex-1 inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl border-0 cursor-pointer',
                    'font-display text-body-sm font-bold transition-all',
                    isActive
                      ? 'bg-white text-ink-900 shadow-xs'
                      : 'bg-transparent text-ink-500 hover:text-ink-900',
                  ].join(' ')}
                >
                  <Icon size={16} /> {tab.label}
                </button>
              );
            })}
          </div>

          {/* Steps */}
          {activeTab === 'steps' && (
            <div className="flex flex-col gap-5">
              {parcours.etapes.map((etape: Etape, idx: number) => {
                const isOpen = expandedSteps.includes(etape.id);
                const stepPct = etape.progress.percentage;

                const stepBorderClass = !etape.unlocked
                  ? 'border-ink-200'
                  : etape.completed
                  ? 'border-success-base/40'
                  : TONE_BORDER_200[tone];

                const badgeBgClass = !etape.unlocked
                  ? 'bg-ink-200'
                  : etape.completed
                  ? 'bg-success-base'
                  : TONE_BG_500[tone];

                return (
                  <div
                    key={etape.id}
                    className={[
                      'rounded-2xl border-2 overflow-hidden transition-colors',
                      etape.unlocked ? 'bg-white' : 'bg-ink-50',
                      stepBorderClass,
                    ].join(' ')}
                  >
                    <button
                      onClick={() => toggleStep(etape.id)}
                      className="w-full flex items-start gap-5 p-6 bg-transparent border-0 cursor-pointer text-left"
                    >
                      <div
                        className={[
                          'w-16 h-16 rounded-xl shrink-0 flex items-center justify-center text-white',
                          badgeBgClass,
                          etape.unlocked && !etape.completed ? 'shadow-md' : '',
                        ].join(' ')}
                      >
                        {!etape.unlocked ? (
                          <Lock size={22} />
                        ) : etape.completed ? (
                          <CheckCircle2 size={26} />
                        ) : (
                          <span className="font-display font-bold text-h2 leading-none">
                            {idx + 1}
                          </span>
                        )}
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="mb-2">
                          {!etape.unlocked ? (
                            <Badge variant="neutral">VERROUILLÉ</Badge>
                          ) : etape.completed ? (
                            <Badge variant="success">VALIDÉ</Badge>
                          ) : (
                            <Badge variant="brand">EN COURS</Badge>
                          )}
                        </div>

                        <h3
                          className={[
                            'font-display text-h3 font-bold m-0 mb-3 leading-tight',
                            etape.unlocked ? 'text-ink-900' : 'text-ink-500',
                          ].join(' ')}
                        >
                          {etape.title}
                        </h3>

                        <MetaPillGroup
                          items={[
                            { icon: <BookOpen size={12} />, text: `${etape.lecons.length} leçons` },
                            { icon: <Clock3 size={12} />, text: etape.duration },
                            ...(etape.unlocked && !etape.completed
                              ? [
                                  {
                                    icon: <Target size={12} />,
                                    text: `${etape.progress.completed}/${etape.progress.total} complétées`,
                                  },
                                ]
                              : []),
                          ]}
                          size="sm"
                        />

                        {etape.unlocked && !etape.completed && stepPct > 0 && (
                          <div className="mt-3">
                            <InlineProgress value={stepPct} tone={tone as any} showLabel={false} size="sm" />
                          </div>
                        )}
                      </div>

                      {etape.unlocked && (
                        <div className="shrink-0 text-ink-500 pt-2">
                          {isOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                        </div>
                      )}
                    </button>

                    {isOpen && etape.unlocked && (
                      <div className="border-t border-ink-200 px-6 pt-4 pb-6">
                        <div
                          className={`flex flex-col gap-2 ${carouselItems.length > 0 && idx === 0 ? 'mb-6' : ''}`}
                        >
                          {etape.lecons.map((lecon: Lecon) => {
                            const firstIncomplete = etape.lecons.findIndex((l: Lecon) => !l.completed);
                            const isCurrent = !lecon.completed && etape.lecons.indexOf(lecon) === firstIncomplete;

                            const rowBg = lecon.completed
                              ? 'bg-success-bg border-success-base/20'
                              : isCurrent
                              ? `${TONE_BG_50[tone]} ${TONE_BORDER_200[tone]}`
                              : 'bg-ink-50 border-transparent';

                            const iconBg = lecon.completed
                              ? 'bg-success-base/20 text-success-fg'
                              : isCurrent
                              ? `${TONE_BG_500[tone]} text-white`
                              : 'bg-ink-100 text-ink-500';

                            return (
                              <div
                                key={lecon.id}
                                onClick={() =>
                                  navigate(`/learning-paths/${parcours.id}/lessons/${lecon.id}`)
                                }
                                className={`flex items-center gap-3 px-4 py-3 rounded-xl border cursor-pointer transition-colors hover:bg-white ${rowBg}`}
                              >
                                <div
                                  className={`w-9 h-9 rounded-lg shrink-0 flex items-center justify-center ${iconBg}`}
                                >
                                  {lecon.completed ? <CheckCircle2 size={16} /> : <Play size={13} />}
                                </div>

                                <div className="flex-1 min-w-0">
                                  <div
                                    className={`text-body-sm leading-snug truncate text-ink-900 ${
                                      isCurrent ? 'font-semibold' : 'font-normal'
                                    }`}
                                  >
                                    {lecon.number}. {lecon.title}
                                  </div>
                                  <div className="flex items-center gap-1 text-caption text-ink-500 mt-0.5">
                                    <Clock3 size={11} /> {lecon.duration}
                                  </div>
                                </div>

                                {isCurrent && (
                                  <div className="shrink-0">
                                    <Badge variant="brand">En cours</Badge>
                                  </div>
                                )}
                              </div>
                            );
                          })}
                        </div>

                        {idx === 0 && carouselItems.length > 0 && (
                          <div>
                            <p className="text-caption font-bold uppercase tracking-wider text-ink-500 mb-3">
                              Ressources complémentaires
                            </p>
                            <CardGrid layout="default" autoFit gapSize="md">
                              {carouselItems.map((item: ComplementaryItem) => {
                                const Icon = RESOURCE_ICON[item.kind];
                                const itemTone = item.tone as Tone;
                                return (
                                  <div
                                    key={item.id}
                                    className={`p-4 rounded-xl border cursor-pointer transition-all hover:-translate-y-0.5 hover:shadow-sm ${TONE_BG_50[itemTone]} ${TONE_BORDER_200[itemTone]}`}
                                  >
                                    <div className="flex items-center gap-2 mb-2">
                                      <div
                                        className={`w-8 h-8 rounded-md flex items-center justify-center bg-white/60 ${TONE_TEXT[itemTone]}`}
                                      >
                                        <Icon size={15} />
                                      </div>
                                      <span
                                        className={`text-[11px] font-bold uppercase tracking-wider ${TONE_TEXT[itemTone]}`}
                                      >
                                        {RESOURCE_LABEL[item.kind]}
                                      </span>
                                    </div>
                                    <div className="text-caption font-semibold text-ink-900 leading-snug mb-1">
                                      {item.title}
                                    </div>
                                    <div className="text-[11px] text-ink-500">{item.duration}</div>
                                  </div>
                                );
                              })}
                            </CardGrid>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}

          {/* Project tab */}
          {activeTab === 'project' && parcours.finalProject && (
            <div className="flex flex-col gap-8">
              <div
                className={`text-center text-white p-10 rounded-2xl ${TONE_HERO[tone]}`}
              >
                <div className="w-20 h-20 rounded-xl bg-white/15 backdrop-blur-sm mx-auto mb-6 flex items-center justify-center">
                  <Award size={36} />
                </div>
                <h2 className="font-display text-h2 font-bold m-0 mb-3">
                  {parcours.finalProject.title}
                </h2>
                <p className="text-body-lg m-0 mb-8 opacity-90 max-w-[720px] mx-auto leading-relaxed">
                  {parcours.finalProject.description}
                </p>

                <MetaPillGroup
                  items={[
                    { icon: <Clock3 size={14} />, text: '80 minutes' },
                    { icon: <Target size={14} />, text: '5 étapes' },
                    { icon: <Award size={14} />, text: 'Badge certifiant' },
                  ]}
                  layout="horizontal"
                  gap="md"
                />
              </div>

              <div className="grid gap-4 grid-cols-[repeat(auto-fit,minmax(200px,1fr))]">
                {[
                  { label: 'Complexité', value: 'Avancé', desc: 'Nécessite les connaissances des 5 étapes précédentes' },
                  { label: 'Format', value: 'Multi-étape', desc: 'Répondez à 5 questions structurées' },
                  { label: 'Résultat', value: 'Plan concret', desc: 'Document exportable et partageable' },
                ].map(({ label, value, desc }) => (
                  <div
                    key={label}
                    className={`p-6 rounded-xl border ${TONE_BG_50[tone]} ${TONE_BORDER_200[tone]}`}
                  >
                    <div
                      className={`text-caption font-bold uppercase mb-2 ${TONE_TEXT[tone]}`}
                    >
                      {label}
                    </div>
                    <div className="text-h3 font-bold text-ink-900 mb-2">{value}</div>
                    <p className="text-caption text-ink-500 m-0 leading-snug">{desc}</p>
                  </div>
                ))}
              </div>

              <div>
                <h3 className="text-h4 font-bold text-ink-900 m-0 mb-4">Étapes du projet</h3>
                <div className="flex flex-col gap-3">
                  {[
                    { num: 1, title: 'Contexte', desc: 'Analysez votre situation actuelle' },
                    { num: 2, title: 'Conception', desc: 'Créez 3-5 prompts clés avec RCIF' },
                    { num: 3, title: 'Tests', desc: 'Testez et améliorez vos prompts' },
                    { num: 4, title: 'Déploiement', desc: "Planifiez l'intégration pratique" },
                    { num: 5, title: 'Réflexion', desc: 'Capitalisez sur vos apprentissages' },
                  ].map((step) => (
                    <div
                      key={step.num}
                      className="flex gap-4 items-start p-4 rounded-xl bg-ink-50 border border-ink-200"
                    >
                      <div
                        className={`w-11 h-11 rounded-lg text-white flex items-center justify-center font-bold text-h4 shrink-0 ${TONE_BG_500[tone]}`}
                      >
                        {step.num}
                      </div>
                      <div className="flex-1">
                        <div className="text-body font-semibold text-ink-900 mb-1">
                          {step.title}
                        </div>
                        <div className="text-caption text-ink-500">{step.desc}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="p-6 rounded-xl bg-primary-50 border border-primary-200">
                <div className="flex gap-3 items-start">
                  <div className="w-8 h-8 rounded-lg bg-primary-100 text-primary-600 flex items-center justify-center font-bold shrink-0">
                    ℹ️
                  </div>
                  <div className="flex-1">
                    <div className="text-h4 font-bold text-ink-900 mb-2">Avant de commencer</div>
                    <ul className="m-0 pl-5 text-body-sm text-ink-500 leading-relaxed">
                      <li>Complétez les 5 étapes du parcours de formation</li>
                      <li>Maîtrisez la méthode ROLE-CONTEXT-TASK (RCT)</li>
                      <li>Ayez identifié vos cas d'usage prioritaires</li>
                      <li>Prévoyez 80 minutes sans interruption</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div
                className={`p-8 rounded-xl bg-white border-2 text-center ${TONE_BORDER_500[tone]}`}
              >
                <h3 className="text-h4 font-bold text-ink-900 m-0 mb-2">
                  Prêt à passer à l'action ?
                </h3>
                <p className="text-body text-ink-500 m-0 mb-6">
                  Créez votre plan d'intégration de l'IA en 5 étapes structurées
                </p>

                <div className="mb-6 flex items-center gap-4 justify-center">
                  <div className="text-caption text-ink-500">Déverrouillé après étape 5</div>
                  <div className="flex items-center gap-2">
                    {[1, 2, 3, 4, 5].map((i) => {
                      const reached = i <= completedLessons / (totalLessons / 5);
                      return (
                        <div
                          key={i}
                          className={[
                            'w-6 h-6 rounded-full flex items-center justify-center text-caption font-semibold',
                            reached ? `${TONE_BG_500[tone]} text-white` : 'bg-ink-200 text-ink-500',
                          ].join(' ')}
                        >
                          {i}
                        </div>
                      );
                    })}
                  </div>
                </div>

                <Button
                  leadingIcon={<Sparkles size={16} />}
                  onClick={() => navigate(`/project/${parcours.id}`)}
                  className="min-w-[280px]"
                >
                  {parcours.finalProject.ctaText}
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>

      <PositionnementModal
        isOpen={showPositionnement}
        onClose={() => setShowPositionnement(false)}
        courseTitle={parcours.title}
        courseId={parcours.id}
        onPositionnementComplete={() => setPositioned(true)}
        onStartCourse={() => {
          const firstEtape = parcours.etapes.find((e: Etape) => e.unlocked);
          if (firstEtape && firstEtape.lecons.length > 0) {
            navigate(`/learning-paths/${parcours.id}/lessons/${firstEtape.lecons[0].id}`);
          }
        }}
      />
    </>
  );
};
