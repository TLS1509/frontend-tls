/**
 * Learning Path Detail Page
 *
 * Phase 10 refactor:
 *  - Custom hero → HeroSection variant="gradient" (removes glass-on-color / hero-pill BEM)
 *  - TONE_* maps extracted to src/lib/tone-classes.ts (shared across Tier 1 pages)
 *  - SectionHeader for section headings
 *  - Semantic spacing tokens (gap-stack, gap-section, gap-section-lg)
 *  - Consistent page background (gradient from-primary-50/30)
 */

import React, { useState, useMemo, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '../components/core/Button';
import { PositionnementModal } from '../components/modals';
import { MetaPillGroup } from '../components/ui/MetaPillGroup';
import { Badge } from '../components/ui/Badge';
import { InlineProgress } from '../components/patterns/InlineProgress';
import { CardGrid } from '../components';
import { PageHero } from '../components/patterns/EditorialHero';
import { SectionHeader } from '../components/patterns/SectionHeader';
import { Tabs } from '../components/ui/Tabs';
import type { TabItem } from '../components/ui/Tabs';
import { IconFeatureCard } from '../components/ui/IconFeatureCard';
import { ResourceCard } from '../components/ui/ResourceCard';
import { RelatedItemList } from '../components/patterns/RelatedItemList';
import {
  TONE_TEXT,
  TONE_BG_50,
  TONE_BORDER_200,
  TONE_BG_500,
  TONE_BORDER_500,
  TONE_HERO_GRADIENT,
} from '../lib/tone-classes';
import {
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
  Award,
  Target,
  GraduationCap,
  Layers,
  Lightbulb,
  Briefcase,
  TrendingUp,
  Sparkles,
  Layers3,
} from 'lucide-react';
import {
  MOCK_PARCOURS_DATA,
  getToneFromLevel,
  getParcoursCompetenceIds,
  type Tone,
  type ResourceKind,
  type Lecon,
  type Etape,
  type ComplementaryItem,
  type FinalProject,
  type Parcours,
} from '../data/learningPaths';
import { useLessonProgressStore, usePositioningStore, usePasseportStore } from '../stores/persistence';
import { MOCK_USER_ID } from '../data/passeport';
import { COMPETENCES } from '../data/competencies';
import type { DreyfusLevel, PositioningAnswer } from '../types/learning';

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

const calculateStepUnlocked = (idx: number, etapes: Etape[]): boolean => {
  if (idx === 0) return true;
  const prevEtape = etapes[idx - 1];
  const currentEtape = etapes[idx];
  const progressionMode = currentEtape.progression_mode ?? 'STRICT';

  switch (progressionMode) {
    case 'STRICT':
      // STRICT: next step locked until 100% of previous is completed
      return prevEtape.completed;
    case 'FLEXIBLE':
      // FLEXIBLE: next step accessible but warning shown if previous incomplete
      return true;
    case 'FREE':
      // FREE: no gating, always accessible
      return true;
  }
};

const calculateStepCompleted = (step: Etape): boolean =>
  step.lecons.every((l: Lecon) => l.completed);

export const LearningPathDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [parcoursData, setParcoursData] = useState<Parcours | null>(null);
  const [expandedSteps, setExpandedSteps] = useState<string[]>([]);
  const [activeTab, setActiveTab] = useState<'steps' | 'project'>('steps');
  const [showPositionnement, setShowPositionnement] = useState(false);

  // Phase 16.1 chantier #1+#3 — wire stores
  const lessonsMap = useLessonProgressStore((s) => s.lessons);
  const isLessonCompleted = useLessonProgressStore((s) => s.isLessonCompleted);
  const positioningStore = usePositioningStore();
  const passeportStore = usePasseportStore();
  const positioned = id ? positioningStore.hasCompleted(MOCK_USER_ID, id) : false;

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
    // Phase 16.1 #1 — override lesson.completed from useLessonProgressStore
    // (a lesson is completed once all its EDRAC sections have been viewed).
    const etapesWithProgress = parcoursData.etapes.map((etape: Etape) => ({
      ...etape,
      lecons: etape.lecons.map((l) => ({
        ...l,
        completed: l.completed || isLessonCompleted(l.id),
      })),
    }));
    const etapesWithUnlock = etapesWithProgress.map((etape: Etape, idx: number) => ({
      ...etape,
      unlocked: calculateStepUnlocked(idx, etapesWithProgress),
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
    // lessonsMap is included so memo recomputes when any lesson progress changes.
  }, [parcoursData, lessonsMap, isLessonCompleted]);

  // Phase 16.1 #3 — auto-generate positionnement questions from parcours competenceIds.
  // MUST sit before any conditional return to keep hook order stable across renders.
  const positionnementQuestions = useMemo(() => {
    if (!id) return undefined;
    const competenceIds = getParcoursCompetenceIds(id);
    if (competenceIds.length === 0) return undefined;
    return competenceIds.map((cid, idx) => {
      const comp = COMPETENCES.find((c) => c.id === cid);
      return {
        id: idx + 1,
        title: comp?.label ?? cid,
        description: comp?.description ?? 'Auto-évalue ton niveau actuel.',
        competenceKey: cid,
      };
    });
  }, [id]);

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

  const firstLessonId = parcours.etapes[0]?.lecons[0]?.id ?? '1';

  const relatedParcours = Object.values(MOCK_PARCOURS_DATA)
    .filter((p) => p.id !== parcours.id)
    .slice(0, 3);

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
      <div className="relative min-h-[100dvh] bg-gradient-to-b from-primary-50/30 via-white to-primary-50/20">
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-10 py-6 sm:py-8 lg:py-12 flex flex-col gap-section">

          {/* Hero — PageHero tone-aware (Phase 19.B-2026-05-26 : migré depuis HeroSection) */}
          <PageHero
            tone={tone === 'primary' ? 'brand' : tone}
            backLink={{ onClick: () => navigate(parcours.backUrl) }}
            eyebrow={parcours.category}
            title={parcours.title}
            summary={parcours.description}
            meta={[
              { icon: <GraduationCap size={14} />, label: parcours.instructor },
              { icon: <Clock3 size={14} />, label: parcours.duration },
              { icon: <BookOpen size={14} />, label: `${totalLessons} leçons` },
              { icon: <Layers size={14} />, label: parcours.level },
            ]}
            progress={progressPct > 0 ? progressPct : undefined}
            progressLabel={`${completedLessons} / ${totalLessons} leçons complétées`}
            trailing={
              progressPct === 0 && !positioned ? (
                <Button variant="glass" onClick={() => setShowPositionnement(true)}>
                  🎯 Se positionner &amp; commencer
                </Button>
              ) : undefined
            }
          />

          {/* Objectifs */}
          <section aria-label="Objectifs d'apprentissage" className="flex flex-col gap-stack">
            <SectionHeader
              variant="default"
              size="md"
              tone={tone}
              icon={<Target size={20} />}
              title="Ce que vous allez acquérir"
            />
            <div className="grid gap-stack grid-cols-[repeat(auto-fit,minmax(220px,1fr))]">
              {OBJECTIFS.map(({ Icon, label, desc, classes, iconColor }) => (
                <div
                  key={label}
                  className={`p-5 rounded-xl border flex flex-col gap-stack-xs transition-all hover:-translate-y-0.5 hover:shadow-md ${classes}`}
                >
                  <div className="w-10 h-10 rounded-md bg-white/50 flex items-center justify-center shrink-0">
                    <Icon size={20} className={iconColor} />
                  </div>
                  <div className="flex flex-col gap-tight">
                    <h3 className="m-0 font-display text-body font-bold text-ink-900">
                      {label}
                    </h3>
                    <p className="m-0 text-body-sm text-ink-500 leading-relaxed">{desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Tab nav — DS Tabs pill */}
          <Tabs
            fullWidth
            variant="pill"
            value={activeTab}
            onChange={(id) => setActiveTab(id as 'steps' | 'project')}
            items={[
              { id: 'steps',   label: 'Étapes du parcours', icon: <BookOpen size={14} /> },
              { id: 'project', label: 'Projet final',       icon: <Award size={14} /> },
            ] as TabItem[]}
          />

          {/* Steps */}
          {activeTab === 'steps' && (
            <div className="flex flex-col gap-stack-lg">

              {/* ── Outils d'apprentissage : accès direct aux 3 viewers ─── */}
              {parcours.etapes.length > 0 && (
                <section aria-label="Outils pour mieux apprendre" className="flex flex-col gap-stack">
                  <SectionHeader
                    variant="default"
                    size="sm"
                    tone={tone}
                    icon={<Sparkles size={16} />}
                    title="Outils pour mieux apprendre"
                    action={<span className="font-body text-caption text-ink-500">Accessible à tout moment</span>}
                  />
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <IconFeatureCard
                      icon={<Lightbulb size={20} />}
                      title="Astuces"
                      description="Conseils pratiques tone-aware, format carousel."
                      tone="sun"
                      surface="tinted"
                      iconStyle="bubble"
                      iconSize="sm"
                      onClick={() => navigate(`/lesson/${firstLessonId}/astuces`)}
                      aria-label="Ouvrir les astuces de la formation"
                    />
                    <IconFeatureCard
                      icon={<Layers3 size={20} />}
                      title="Flashcards"
                      description="Mémorisation active recto-verso, swipe & flip."
                      tone="brand"
                      surface="tinted"
                      iconStyle="bubble"
                      iconSize="sm"
                      onClick={() => navigate(`/lesson/${firstLessonId}/flashcards`)}
                      aria-label="Ouvrir les flashcards de la formation"
                    />
                    <IconFeatureCard
                      icon={<BookOpen size={20} />}
                      title="Bonus"
                      description="Articles, guides, templates et podcasts liés."
                      tone="warm"
                      surface="tinted"
                      iconStyle="bubble"
                      iconSize="sm"
                      onClick={() => navigate(`/lesson/${firstLessonId}/complementary`)}
                      aria-label="Ouvrir le contenu complémentaire"
                    />
                  </div>
                </section>
              )}

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
                        <div className="mb-2 flex items-center gap-2">
                          {!etape.unlocked ? (
                            <Badge variant="neutral">VERROUILLÉ</Badge>
                          ) : etape.completed ? (
                            <Badge variant="success">VALIDÉ</Badge>
                          ) : (
                            <Badge variant="brand">EN COURS</Badge>
                          )}
                          {etape.progression_mode === 'FLEXIBLE' && !etape.completed && idx > 0 && !parcours.etapes[idx - 1]?.completed && (
                            <Badge variant="info" size="sm">⚠️ Accès souple</Badge>
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
                          <div className="mt-stack-xs">
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
                          className={`flex flex-col gap-2 ${carouselItems.length > 0 && idx === 0 ? 'mb-stack-lg' : ''}`}
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
                          <div className="flex flex-col gap-stack-xs">
                            <p className="text-caption font-bold uppercase tracking-wider text-ink-500">
                              Ressources complémentaires
                            </p>
                            <CardGrid layout="default" autoFit gapSize="md">
                              {carouselItems.map((item: ComplementaryItem) => {
                                const Icon = RESOURCE_ICON[item.kind];
                                const resourceHref =
                                  item.kind === 'video'
                                    ? `/veille/video/${item.id}`
                                    : `/lesson/${item.id}/complementary`;
                                return (
                                  <ResourceCard
                                    key={item.id}
                                    icon={<Icon size={20} />}
                                    resourceType={RESOURCE_LABEL[item.kind]}
                                    title={item.title}
                                    duration={item.duration}
                                    tone={item.tone}
                                    cta={{ label: 'Ouvrir', onClick: () => navigate(resourceHref) }}
                                  />
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
            <div className="flex flex-col gap-section">
              {/* Project hero */}
              <div
                className={`text-center text-white p-10 rounded-2xl ${TONE_HERO_GRADIENT[tone]}`}
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

              {/* Project details grid */}
              <div className="grid gap-stack grid-cols-[repeat(auto-fit,minmax(200px,1fr))]">
                {[
                  { label: 'Complexité', value: 'Avancé', desc: 'Nécessite les connaissances des 5 étapes précédentes' },
                  { label: 'Format', value: 'Multi-étape', desc: 'Répondez à 5 questions structurées' },
                  { label: 'Résultat', value: 'Plan concret', desc: 'Document exportable et partageable' },
                ].map(({ label, value, desc }) => (
                  <div
                    key={label}
                    className={`p-6 rounded-xl border ${TONE_BG_50[tone]} ${TONE_BORDER_200[tone]}`}
                  >
                    <div className={`text-caption font-bold uppercase mb-2 ${TONE_TEXT[tone]}`}>
                      {label}
                    </div>
                    <div className="text-h3 font-bold text-ink-900 mb-2">{value}</div>
                    <p className="text-caption text-ink-500 m-0 leading-snug">{desc}</p>
                  </div>
                ))}
              </div>

              {/* Project steps */}
              <section aria-label="Étapes du projet" className="flex flex-col gap-stack">
                <SectionHeader
                  variant="minimal"
                  size="sm"
                  tone="neutral"
                  title="Étapes du projet"
                />
                <div className="flex flex-col gap-stack-xs">
                  {[
                    { num: 1, title: 'Contexte', desc: 'Analysez votre situation actuelle' },
                    { num: 2, title: 'Conception', desc: 'Créez 3-5 prompts clés avec RCIF' },
                    { num: 3, title: 'Tests', desc: 'Testez et améliorez vos prompts' },
                    { num: 4, title: 'Déploiement', desc: "Planifiez l'intégration pratique" },
                    { num: 5, title: 'Réflexion', desc: 'Capitalisez sur vos apprentissages' },
                  ].map((step) => (
                    <div
                      key={step.num}
                      className="flex gap-stack items-start p-4 rounded-xl bg-ink-50 border border-ink-200"
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
              </section>

              {/* Prerequisites */}
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

              {/* CTA */}
              <div
                className={`p-8 rounded-xl bg-white border-2 text-center ${TONE_BORDER_500[tone]}`}
              >
                <h3 className="text-h4 font-bold text-ink-900 m-0 mb-2">
                  Prêt à passer à l'action ?
                </h3>
                <p className="text-body text-ink-500 m-0 mb-stack-lg">
                  Créez votre plan d'intégration de l'IA en 5 étapes structurées
                </p>

                <div className="mb-stack-lg flex items-center gap-stack justify-center">
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
                  onClick={() => navigate(`/project/${parcours.id}`)}
                  className="min-w-[280px]"
                >
                  {parcours.finalProject.ctaText}
                </Button>
              </div>
            </div>
          )}

          {/* Parcours similaires */}
          {relatedParcours.length > 0 && (
            <section aria-label="Parcours similaires" className="flex flex-col gap-stack">
              <SectionHeader
                variant="minimal"
                size="sm"
                tone="neutral"
                icon={<GraduationCap size={16} />}
                title="Parcours similaires"
              />
              <RelatedItemList
                items={relatedParcours.map((p) => ({
                  id: p.id,
                  title: p.title,
                  description: `${p.duration} · ${p.category}`,
                  icon: <GraduationCap size={16} />,
                  meta: p.level,
                  onClick: () => navigate(`/learning-paths/${p.id}`),
                }))}
              />
            </section>
          )}
        </div>
      </div>

      <PositionnementModal
        isOpen={showPositionnement}
        onClose={() => setShowPositionnement(false)}
        courseTitle={parcours.title}
        courseId={parcours.id}
        questions={positionnementQuestions}
        onComplete={(_, competences) => {
          // Phase 16.1 #3 — persist via usePositioningStore + sync to usePasseportStore
          if (!id) return;
          const answers: PositioningAnswer[] = Object.entries(competences).map(([competenceId, level]) => ({
            competenceId,
            level: level as DreyfusLevel,
          }));
          positioningStore.set(MOCK_USER_ID, id, answers);
          // Seed competencies in passeport store (one entry per competence answered)
          const existing = passeportStore.getCompetencies(MOCK_USER_ID);
          answers.forEach((a) => {
            const prev = existing.find((c) => c.competenceId === a.competenceId);
            passeportStore.setCompetency({
              userId: MOCK_USER_ID,
              competenceId: a.competenceId,
              currentLevel: a.level,
              targetLevel: prev?.targetLevel ?? a.level,
              points: prev?.points ?? 0,
              nextLevelPoints: prev?.nextLevelPoints ?? 100,
              daysSinceActivity: 0,
              lastUpdated: new Date().toISOString(),
            });
          });
        }}
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

export default LearningPathDetail;
