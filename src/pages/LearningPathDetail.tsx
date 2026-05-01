/**
 * Learning Path Detail Page
 *
 * Visual design adapted from WIP CourseDetailPageUpdated:
 * - Gradient hero (primary → orange) + progress bar
 * - Tabs Étapes / Projet final
 * - Step accordion: large numbered badge + lesson rows + complementary resources
 * - Lesson rows: status-aware (completed / current / locked)
 * - Click on lesson → navigates to LessonPlayer
 *
 * Uses TLS design system components throughout.
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
import '../styles/learning-paths.css';

/* ── Helpers ─────────────────────────────────────────────────────────────── */

const RESOURCE_ICON: Record<ResourceKind, React.ComponentType<{ size?: number }>> = {
  guide:    FileText,
  video:    Video,
  template: ClipboardList,
  podcast:  Mic,
  exercise: MessagesSquare,
};

const RESOURCE_LABEL: Record<ResourceKind, string> = {
  guide:    'Guide',
  video:    'Vidéo',
  template: 'Template',
  podcast:  'Podcast',
  exercise: 'Exercice',
};

// Tone → visual tokens
const TONE_COLOR: Record<Tone, string> = {
  primary: 'var(--tls-primary-500)',
  warm:    'var(--tls-orange-500)',
  sun:     'var(--tls-yellow-400)',
};
const TONE_BG: Record<Tone, string> = {
  primary: 'var(--tls-primary-50)',
  warm:    'var(--tls-orange-50)',
  sun:     'var(--tls-yellow-50)',
};
const TONE_BORDER: Record<Tone, string> = {
  primary: 'var(--tls-primary-200)',
  warm:    'var(--tls-orange-200)',
  sun:     'var(--tls-yellow-200)',
};

const HERO_GRADIENT: Record<Tone, string> = {
  primary: 'linear-gradient(135deg, var(--tls-primary-500) 0%, var(--tls-orange-500) 100%)',
  warm:    'linear-gradient(135deg, var(--tls-orange-500) 0%, var(--tls-yellow-400) 100%)',
  sun:     'linear-gradient(135deg, var(--tls-yellow-400) 0%, var(--tls-primary-500) 100%)',
};

/* ── Local helpers ───────────────────────────────────────────────────────── */

const calculateStepUnlocked = (idx: number, etapes: Etape[]): boolean =>
  idx === 0 || etapes[idx - 1].completed;

const calculateStepCompleted = (step: Etape): boolean =>
  step.lecons.every((l: Lecon) => l.completed);

/* ── Component ───────────────────────────────────────────────────────────── */

export const LearningPathDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [parcoursData, setParcoursData] = useState<Parcours | null>(null);
  const [expandedSteps, setExpandedSteps] = useState<string[]>([]);
  const [activeTab, setActiveTab] = useState<'steps' | 'project'>('steps');
  const [showPositionnement, setShowPositionnement] = useState(false);
  const [positioned, setPositioned] = useState(false);

  /* Load parcours on mount */
  useEffect(() => {
    if (id && MOCK_PARCOURS_DATA[id]) {
      const data = MOCK_PARCOURS_DATA[id];
      setParcoursData(data);
      // Auto-expand first unlocked incomplete step
      const first = data.etapes.find((e: Etape) => !e.completed && e.unlocked);
      if (first) setExpandedSteps([first.id]);
    }
  }, [id]);

  /* Enrich etapes with computed unlock state */
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

  /* Not found */
  if (!parcours) {
    return (
      <div style={{ padding: 'var(--s-12)', textAlign: 'center' }}>
        <p style={{ color: 'var(--text-muted)', marginBottom: 'var(--s-4)' }}>Parcours introuvable.</p>
        <Button onClick={() => navigate('/learning-paths')}>Retour aux parcours</Button>
      </div>
    );
  }

  const tone = getToneFromLevel(parcours.level);
  const totalLessons = parcours.etapes.reduce((s: number, e: Etape) => s + e.lecons.length, 0);
  const completedLessons = parcours.etapes.reduce(
    (s: number, e: Etape) => s + e.lecons.filter((l: Lecon) => l.completed).length,
    0
  );
  const progressPct = totalLessons > 0 ? Math.round((completedLessons / totalLessons) * 100) : 0;

  const toggleStep = (stepId: string) =>
    setExpandedSteps((prev) =>
      prev.includes(stepId) ? prev.filter((x) => x !== stepId) : [...prev, stepId]
    );

  const toggleLesson = (etapeId: string, leconId: string) => {
    if (!parcoursData) return;
    setParcoursData({
      ...parcoursData,
      etapes: parcoursData.etapes.map((etape: Etape) =>
        etape.id !== etapeId
          ? etape
          : {
              ...etape,
              lecons: etape.lecons.map((l: Lecon) =>
                l.id === leconId ? { ...l, completed: !l.completed } : l
              ),
            }
      ),
    });
  };

  const carouselItems = parcours.complementaryContent ?? [];

  return (
    <>
    <div style={{ minHeight: '100vh', background: 'var(--surface-muted)' }}>

      {/* ── HERO — Elevated with enhanced visual prominence ─────────────────────────────────────────────── */}
      <div style={{ background: HERO_GRADIENT[tone], paddingBottom: 'var(--s-12)', paddingTop: 'var(--s-10)', position: 'relative', overflow: 'hidden' }}>
        {/* Decorative overlays — Enhanced visibility */}
        <div style={{ position: 'absolute', top: '-30%', right: '-10%', width: 480, height: 480, borderRadius: '50%', background: 'rgba(255,255,255,0.12)', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', bottom: '-40%', left: '-8%', width: 360, height: 360, borderRadius: '50%', background: 'rgba(255,255,255,0.08)', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, transparent 50%, rgba(0,0,0,0.2) 100%)', pointerEvents: 'none' }} />
        {/* Back button — Enhanced styling */}
        <div style={{ padding: '0 var(--s-10)', marginBottom: 'var(--s-8)' }}>
          <button
            onClick={() => navigate(parcours.backUrl)}
            className="learning-path-hero-btn"
            style={{
              display: 'inline-flex', alignItems: 'center', gap: 'var(--s-2)',
              padding: 'var(--s-2-5) var(--s-4)', borderRadius: 'var(--r-xl)',
              fontWeight: 600, cursor: 'pointer', transition: 'all var(--dur-2)',
              background: 'rgba(255,255,255,0.15)',
              color: 'var(--text-inverse)',
              border: '1px solid rgba(255,255,255,0.3)',
              fontSize: 'var(--t-body-sm)',
            }}
            onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,0.25)'; }}
            onMouseLeave={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,0.15)'; }}
          >
            <ArrowLeft size={16} /> Retour
          </button>
        </div>

        <div style={{ maxWidth: 'var(--container-default)', margin: '0 auto', padding: '0 var(--s-10)', color: 'var(--text-inverse)' }}>
          {/* Eyebrow chips — Enhanced with better styling */}
          <div style={{ display: 'flex', gap: 'var(--s-2)', marginBottom: 'var(--s-5)', flexWrap: 'wrap' }}>
            {[
              { icon: GraduationCap, label: parcours.instructor },
              { icon: Clock3, label: parcours.duration },
              { icon: BookOpen, label: `${totalLessons} leçons` },
              { icon: Layers, label: parcours.level },
            ].map(({ icon: Icon, label }) => (
              <span key={label} className="learning-path-hero-pill" style={{ display: 'inline-flex', alignItems: 'center', gap: 'var(--s-1)', padding: 'var(--s-2) var(--s-3)', borderRadius: 'var(--r-pill)', fontSize: 'var(--t-caption)', fontWeight: 600, background: 'rgba(255,255,255,0.2)', color: 'var(--text-inverse)', border: '1px solid rgba(255,255,255,0.35)', backdropFilter: 'blur(8px)' }}>
                <Icon size={14} /> {label}
              </span>
            ))}
          </div>

          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--t-h1)', fontWeight: 700, lineHeight: 1.15, margin: '0 0 var(--s-4)', color: '#fff', letterSpacing: '-0.02em' }}>
            {parcours.title}
          </h1>
          <p style={{ fontSize: 'var(--t-body)', opacity: 0.95, lineHeight: 1.65, margin: '0 0 var(--s-8)', maxWidth: 640, color: 'rgba(255,255,255,0.9)' }}>
            {parcours.description}
          </p>

          {/* Progress bar — using InlineProgress DS component */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 'var(--s-3)', marginBottom: 'var(--s-5)' }}>
            <span style={{ fontSize: 'var(--t-caption)', fontWeight: 500, opacity: 0.9 }}>
              Progression — {completedLessons}/{totalLessons} leçons
            </span>
            <InlineProgress value={progressPct} tone="primary" showLabel={true} size="md" className="hero-progress" />
          </div>

          {/* CTA — positioning or continue */}
          {progressPct === 0 && !positioned ? (
            <button
              onClick={() => setShowPositionnement(true)}
              style={{
                display: 'inline-flex', alignItems: 'center', gap: 'var(--s-2)',
                padding: 'var(--s-3) var(--s-6)',
                borderRadius: 'var(--r-xl)',
                background: 'rgba(255,255,255,0.2)',
                backdropFilter: 'blur(8px)',
                border: '1.5px solid rgba(255,255,255,0.4)',
                color: '#fff',
                fontWeight: 700, fontSize: 'var(--t-body)',
                cursor: 'pointer', transition: 'all var(--dur-2)',
              }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.background = 'rgba(255,255,255,0.3)'; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.background = 'rgba(255,255,255,0.2)'; }}
            >
              🎯 Se positionner &amp; commencer
            </button>
          ) : null}
        </div>
      </div>

      {/* ── MAIN ─────────────────────────────────────────────── */}
      <div style={{ maxWidth: 'var(--container-default)', margin: '0 auto', padding: 'var(--s-10) var(--s-10)' }}>

        {/* ── Objectifs section ───────────────────────────────── */}
        <div style={{ marginBottom: 'var(--s-8)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--s-2)', marginBottom: 'var(--s-5)' }}>
            <Target size={18} style={{ color: TONE_COLOR[tone] }} />
            <h2 style={{ margin: 0, fontFamily: 'var(--font-display)', fontSize: 'var(--t-h3)', fontWeight: 700, color: 'var(--text)' }}>
              Ce que vous allez acquérir
            </h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 'var(--s-4)' }}>
            {[
              {
                Icon: Target,
                label: 'Compétences opérationnelles',
                desc: 'Des méthodes applicables immédiatement dans votre contexte professionnel.',
                bg: TONE_BG[tone], color: TONE_COLOR[tone], border: TONE_BORDER[tone],
              },
              {
                Icon: Lightbulb,
                label: 'Insights & prise de conscience',
                desc: 'Comprendre vos patterns, identifier vos angles morts, renforcer votre posture.',
                bg: 'var(--tls-yellow-100)', color: 'var(--tls-yellow-700)', border: 'var(--tls-yellow-300)',
              },
              {
                Icon: Briefcase,
                label: 'Outils & templates',
                desc: 'Des ressources pratiques (guides, templates, exercices) pour agir en continu.',
                bg: 'var(--tls-orange-100)', color: 'var(--tls-orange-700)', border: 'var(--tls-orange-200)',
              },
              {
                Icon: TrendingUp,
                label: 'Progression mesurable',
                desc: 'Évaluez vos acquis via le quiz de positionnement et le projet final.',
                bg: 'var(--tls-success-bg)', color: 'var(--tls-success-fg)', border: 'rgba(157, 190, 186, 0.4)',
              },
            ].map(({ Icon, label, desc, bg, color, border }) => (
              <div
                key={label}
                style={{
                  padding: 'var(--s-5)',
                  borderRadius: 'var(--r-xl)',
                  background: bg,
                  border: `1px solid ${border}`,
                  display: 'flex', flexDirection: 'column', gap: 'var(--s-3)',
                  transition: 'transform var(--dur-2), box-shadow var(--dur-2)',
                }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLDivElement).style.transform = 'translateY(-2px)'; (e.currentTarget as HTMLDivElement).style.boxShadow = 'var(--shadow-md)'; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLDivElement).style.transform = 'none'; (e.currentTarget as HTMLDivElement).style.boxShadow = 'none'; }}
              >
                <div style={{ width: 40, height: 40, borderRadius: 'var(--r-md)', background: `${color}20`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <Icon size={20} style={{ color }} />
                </div>
                <div>
                  <h3 style={{ margin: '0 0 var(--s-1)', fontFamily: 'var(--font-display)', fontSize: 'var(--t-body)', fontWeight: 700, color: 'var(--text)' }}>
                    {label}
                  </h3>
                  <p style={{ margin: 0, fontSize: 'var(--t-body-sm)', color: 'var(--text-soft)', lineHeight: 1.55 }}>
                    {desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Tab nav */}
        <div style={{ display: 'flex', gap: 'var(--s-2)', padding: 'var(--s-2)', borderRadius: 'var(--r-2xl)', background: 'var(--tls-ink-100)', marginBottom: 'var(--s-8)' }}>
          {([
            { key: 'steps', label: 'Étapes du parcours', icon: BookOpen },
            { key: 'project', label: 'Projet final', icon: Award },
          ] as const).map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.key;
            return (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                style={{
                  flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 'var(--s-2)',
                  padding: 'var(--s-3) var(--s-5)', borderRadius: 'var(--r-xl)', border: 'none', cursor: 'pointer',
                  fontFamily: 'var(--font-display)', fontSize: 'var(--t-body-sm)', fontWeight: 700,
                  transition: 'all var(--dur-2)',
                  background: isActive ? 'var(--surface)' : 'transparent',
                  color: isActive ? 'var(--text)' : 'var(--text-muted)',
                  boxShadow: isActive ? 'var(--shadow-xs)' : 'none',
                }}
              >
                <Icon size={16} /> {tab.label}
              </button>
            );
          })}
        </div>

        {/* ── Steps tab ───────────────────────────────────────── */}
        {activeTab === 'steps' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--s-5)' }}>
            {parcours.etapes.map((etape: Etape, idx: number) => {
              const isOpen = expandedSteps.includes(etape.id);
              const stepPct = etape.progress.percentage;

              return (
                <div
                  key={etape.id}
                  style={{
                    borderRadius: 'var(--r-2xl)',
                    border: `2px solid ${
                      !etape.unlocked ? 'var(--border)'
                      : etape.completed ? 'var(--tls-success-border)'
                      : TONE_BORDER[tone]
                    }`,
                    background: !etape.unlocked ? 'var(--surface-muted)' : 'var(--surface)',
                    overflow: 'hidden',
                    transition: 'border-color var(--dur-2)',
                  }}
                >
                  {/* Step header button */}
                  <button
                    onClick={() => toggleStep(etape.id)}
                    style={{
                      width: '100%', display: 'flex', alignItems: 'flex-start', gap: 'var(--s-5)',
                      padding: 'var(--s-6)', background: 'transparent', border: 'none',
                      cursor: 'pointer', textAlign: 'left',
                    }}
                  >
                    {/* Large number badge */}
                    <div style={{
                      width: 64, height: 64, borderRadius: 'var(--r-xl)', flexShrink: 0,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      background: !etape.unlocked ? 'var(--tls-ink-200)'
                        : etape.completed ? 'var(--tls-success-base)'
                        : TONE_COLOR[tone],
                      boxShadow: !etape.unlocked ? 'none'
                        : etape.completed ? '0 6px 20px var(--shadow-success)'
                        : `0 6px 20px ${TONE_COLOR[tone]}44`,
                    }}>
                      {!etape.unlocked ? (
                        <Lock size={22} style={{ color: 'var(--text-inverse)' }} />
                      ) : etape.completed ? (
                        <CheckCircle2 size={26} style={{ color: 'var(--text-inverse)' }} />
                      ) : (
                        <span style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 'var(--t-h2)', color: 'var(--text-inverse)', lineHeight: 1 }}>
                          {idx + 1}
                        </span>
                      )}
                    </div>

                    <div style={{ flex: 1, minWidth: 0 }}>
                      {/* Status badge */}
                      <div style={{ marginBottom: 'var(--s-2)' }}>
                        {!etape.unlocked ? (
                          <Badge variant="neutral">VERROUILLÉ</Badge>
                        ) : etape.completed ? (
                          <Badge variant="success">VALIDÉ</Badge>
                        ) : (
                          <Badge variant="brand">EN COURS</Badge>
                        )}
                      </div>

                      <h3 style={{
                        fontFamily: 'var(--font-display)', fontSize: 'var(--t-h3)', fontWeight: 700,
                        color: !etape.unlocked ? 'var(--text-muted)' : 'var(--text)',
                        margin: '0 0 var(--s-3)', lineHeight: 1.25,
                      }}>
                        {etape.title}
                      </h3>

                      <MetaPillGroup
                        items={[
                          { icon: <BookOpen size={12} />, text: `${etape.lecons.length} leçons` },
                          { icon: <Clock3 size={12} />, text: etape.duration },
                          ...(!!etape.unlocked && !etape.completed ? [{ icon: <Target size={12} />, text: `${etape.progress.completed}/${etape.progress.total} complétées` }] : []),
                        ]}
                        size="sm"
                      />

                      {/* Step progress bar — using InlineProgress DS component */}
                      {!!etape.unlocked && !etape.completed && stepPct > 0 && (
                        <div style={{ marginTop: 'var(--s-3)' }}>
                          <InlineProgress value={stepPct} tone={tone as any} showLabel={false} size="sm" />
                        </div>
                      )}
                    </div>

                    {!!etape.unlocked && (
                      <div style={{ flexShrink: 0, color: 'var(--text-muted)', paddingTop: 'var(--s-2)' }}>
                        {isOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                      </div>
                    )}
                  </button>

                  {/* Lessons */}
                  {isOpen && !!etape.unlocked && (
                    <div style={{ borderTop: '1px solid var(--border-subtle)', padding: 'var(--s-4) var(--s-6) var(--s-6)' }}>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--s-2)', marginBottom: carouselItems.length > 0 ? 'var(--s-6)' : 0 }}>
                        {etape.lecons.map((lecon: Lecon) => {
                          const isCurrent = !lecon.completed && etape.lecons.indexOf(lecon) === etape.lecons.findIndex((l: Lecon) => !l.completed);
                          return (
                            <div
                              key={lecon.id}
                              onClick={() => !!etape.unlocked && navigate(`/learning-paths/${parcours.id}/lessons/${lecon.id}`)}
                              style={{
                                display: 'flex', alignItems: 'center', gap: 'var(--s-3)',
                                padding: 'var(--s-3) var(--s-4)', borderRadius: 'var(--r-xl)',
                                background: lecon.completed ? 'var(--tls-success-light)'
                                  : isCurrent ? TONE_BG[tone]
                                  : 'var(--surface-muted)',
                                border: `1px solid ${
                                  lecon.completed ? 'var(--tls-success-border)'
                                  : isCurrent ? TONE_BORDER[tone]
                                  : 'transparent'
                                }`,
                                cursor: 'pointer',
                                transition: 'all var(--dur-1)',
                              }}
                              onMouseEnter={(e) => { if (!lecon.completed) e.currentTarget.style.background = TONE_BG[tone]; }}
                              onMouseLeave={(e) => {
                                e.currentTarget.style.background = lecon.completed ? 'var(--tls-success-light)' : isCurrent ? TONE_BG[tone] : 'var(--surface-muted)';
                              }}
                            >
                              {/* Icon bubble */}
                              <div style={{
                                width: 36, height: 36, borderRadius: 'var(--r-lg)', flexShrink: 0,
                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                                background: lecon.completed ? 'var(--tls-success-light-bg)'
                                  : isCurrent ? TONE_COLOR[tone]
                                  : 'var(--tls-ink-100)',
                                color: lecon.completed ? 'var(--tls-success-base)'
                                  : isCurrent ? 'var(--text-inverse)'
                                  : 'var(--text-muted)',
                              }}>
                                {lecon.completed
                                  ? <CheckCircle2 size={16} />
                                  : <Play size={13} />}
                              </div>

                              <div style={{ flex: 1, minWidth: 0 }}>
                                <div style={{ fontSize: 'var(--t-body-sm)', fontWeight: isCurrent ? 600 : 400, color: 'var(--text)', lineHeight: 1.4, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                                  {lecon.number}. {lecon.title}
                                </div>
                                <div style={{ fontSize: 'var(--t-caption)', color: 'var(--text-muted)', marginTop: 2, display: 'flex', alignItems: 'center', gap: 'var(--s-1)' }}>
                                  <Clock3 size={11} /> {lecon.duration}
                                </div>
                              </div>

                              <div style={{ flexShrink: 0, display: 'flex', alignItems: 'center', gap: 'var(--s-2)' }}>
                                {isCurrent && <Badge variant="brand" style={{ fontSize: 11 }}>En cours</Badge>}
                              </div>
                            </div>
                          );
                        })}
                      </div>

                      {/* Complementary content for this step */}
                      {idx === 0 && carouselItems.length > 0 && (
                        <div>
                          <p style={{ fontSize: 'var(--t-caption)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--text-muted)', marginBottom: 'var(--s-3)' }}>
                            Ressources complémentaires
                          </p>
                          <CardGrid layout="default" autoFit gapSize="md">
                            {carouselItems.map((item: ComplementaryItem) => {
                              const Icon = RESOURCE_ICON[item.kind];
                              const itemTone = item.tone as Tone;
                              return (
                                <div
                                  key={item.id}
                                  style={{ padding: 'var(--s-4)', borderRadius: 'var(--r-xl)', border: `1px solid ${TONE_BORDER[itemTone]}`, background: TONE_BG[itemTone], cursor: 'pointer', transition: 'all var(--dur-2)' }}
                                >
                                  <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--s-2)', marginBottom: 'var(--s-2)' }}>
                                    <div style={{ width: 32, height: 32, borderRadius: 'var(--r-md)', background: TONE_COLOR[itemTone] + '20', color: TONE_COLOR[itemTone], display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                      <Icon size={15} />
                                    </div>
                                    <span style={{ fontSize: 11, fontWeight: 700, color: TONE_COLOR[itemTone], textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                                      {RESOURCE_LABEL[item.kind]}
                                    </span>
                                  </div>
                                  <div style={{ fontSize: 'var(--t-caption)', fontWeight: 600, color: 'var(--text)', lineHeight: 1.4, marginBottom: 'var(--s-1)' }}>{item.title}</div>
                                  <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>{item.duration}</div>
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

        {/* ── Project tab ─────────────────────────────────────── */}
        {activeTab === 'project' && parcours.finalProject && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--s-8)' }}>
            {/* Hero Section */}
            <div style={{ background: HERO_GRADIENT[tone], borderRadius: 'var(--r-2xl)', padding: 'var(--s-10)', color: 'var(--text-inverse)', textAlign: 'center' }}>
              <div style={{ width: 80, height: 80, borderRadius: 'var(--r-xl)', background: 'rgba(255, 255, 255, 0.2)', margin: '0 auto var(--s-6)', display: 'flex', alignItems: 'center', justifyContent: 'center', backdropFilter: 'blur(10px)' }}>
                <Award size={36} />
              </div>
              <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--t-h2)', fontWeight: 700, margin: '0 0 var(--s-3)' }}>
                {parcours.finalProject.title}
              </h2>
              <p style={{ fontSize: 'var(--t-body-lg)', margin: '0 0 var(--s-8)', opacity: 0.92, maxWidth: 'var(--container-narrow)', lineHeight: 1.6 }}>
                {parcours.finalProject.description}
              </p>

              {/* KPI Pills */}
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

            {/* Project Overview Grid */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 'var(--s-4)' }}>
              <div style={{ padding: 'var(--s-6)', borderRadius: 'var(--r-xl)', border: `1px solid ${TONE_BORDER[tone]}`, background: TONE_BG[tone] }}>
                <div style={{ fontSize: 'var(--t-caption)', fontWeight: 700, color: TONE_COLOR[tone], textTransform: 'uppercase', marginBottom: 'var(--s-2)' }}>
                  Complexité
                </div>
                <div style={{ fontSize: 'var(--t-h3)', fontWeight: 700, color: 'var(--text)', marginBottom: 'var(--s-2)' }}>
                  Avancé
                </div>
                <p style={{ fontSize: 'var(--t-caption)', color: 'var(--text-muted)', margin: 0, lineHeight: 1.4 }}>
                  Nécessite les connaissances des 5 étapes précédentes
                </p>
              </div>

              <div style={{ padding: 'var(--s-6)', borderRadius: 'var(--r-xl)', border: `1px solid ${TONE_BORDER[tone]}`, background: TONE_BG[tone] }}>
                <div style={{ fontSize: 'var(--t-caption)', fontWeight: 700, color: TONE_COLOR[tone], textTransform: 'uppercase', marginBottom: 'var(--s-2)' }}>
                  Format
                </div>
                <div style={{ fontSize: 'var(--t-h3)', fontWeight: 700, color: 'var(--text)', marginBottom: 'var(--s-2)' }}>
                  Multi-étape
                </div>
                <p style={{ fontSize: 'var(--t-caption)', color: 'var(--text-muted)', margin: 0, lineHeight: 1.4 }}>
                  Répondez à 5 questions structurées
                </p>
              </div>

              <div style={{ padding: 'var(--s-6)', borderRadius: 'var(--r-xl)', border: `1px solid ${TONE_BORDER[tone]}`, background: TONE_BG[tone] }}>
                <div style={{ fontSize: 'var(--t-caption)', fontWeight: 700, color: TONE_COLOR[tone], textTransform: 'uppercase', marginBottom: 'var(--s-2)' }}>
                  Résultat
                </div>
                <div style={{ fontSize: 'var(--t-h3)', fontWeight: 700, color: 'var(--text)', marginBottom: 'var(--s-2)' }}>
                  Plan concret
                </div>
                <p style={{ fontSize: 'var(--t-caption)', color: 'var(--text-muted)', margin: 0, lineHeight: 1.4 }}>
                  Document exportable et partageable
                </p>
              </div>
            </div>

            {/* Project Steps Breakdown */}
            <div>
              <h3 style={{ fontSize: 'var(--t-h4)', fontWeight: 700, color: 'var(--text)', marginBottom: 'var(--s-4)', margin: '0 0 var(--s-4)' }}>
                Étapes du projet
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--s-3)' }}>
                {[
                  { num: 1, title: 'Contexte', desc: 'Analysez votre situation actuelle' },
                  { num: 2, title: 'Conception', desc: 'Créez 3-5 prompts clés avec RCIF' },
                  { num: 3, title: 'Tests', desc: 'Testez et améliorez vos prompts' },
                  { num: 4, title: 'Déploiement', desc: 'Planifiez l\'intégration pratique' },
                  { num: 5, title: 'Réflexion', desc: 'Capitalisez sur vos apprentissages' },
                ].map((step: { num: number; title: string; desc: string }) => (
                  <div key={step.num} style={{ display: 'flex', gap: 'var(--s-4)', alignItems: 'flex-start', padding: 'var(--s-4)', borderRadius: 'var(--r-xl)', background: 'var(--surface-muted)', border: '1px solid var(--border)' }}>
                    <div style={{ width: 44, height: 44, borderRadius: 'var(--r-lg)', background: TONE_COLOR[tone], color: 'var(--text-inverse)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: 'var(--t-h4)', flexShrink: 0 }}>
                      {step.num}
                    </div>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: 'var(--t-body)', fontWeight: 600, color: 'var(--text)', marginBottom: 'var(--s-1)' }}>
                        {step.title}
                      </div>
                      <div style={{ fontSize: 'var(--t-caption)', color: 'var(--text-muted)' }}>
                        {step.desc}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Prerequisites */}
            <div style={{ padding: 'var(--s-6)', borderRadius: 'var(--r-xl)', background: 'var(--tls-info-50)', border: `1px solid var(--tls-info-200)` }}>
              <div style={{ display: 'flex', gap: 'var(--s-3)', alignItems: 'flex-start' }}>
                <div style={{ width: 32, height: 32, borderRadius: 'var(--r-lg)', background: 'var(--tls-info-100)', color: 'var(--tls-info-600)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, flexShrink: 0 }}>
                  ℹ️
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 'var(--t-h4)', fontWeight: 700, color: 'var(--text)', marginBottom: 'var(--s-2)' }}>
                    Avant de commencer
                  </div>
                  <ul style={{ margin: 0, paddingLeft: 'var(--s-5)', fontSize: 'var(--t-body-sm)', color: 'var(--text-muted)', lineHeight: 1.6 }}>
                    <li>Complétez les 5 étapes du parcours de formation</li>
                    <li>Maîtrisez la méthode ROLE-CONTEXT-TASK (RCT)</li>
                    <li>Ayez identifié vos cas d'usage prioritaires</li>
                    <li>Prévoyez 80 minutes sans interruption</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* CTA Section */}
            <div style={{ padding: 'var(--s-8)', borderRadius: 'var(--r-xl)', background: 'var(--surface)', border: `2px solid ${TONE_COLOR[tone]}`, textAlign: 'center' }}>
              <h3 style={{ fontSize: 'var(--t-h4)', fontWeight: 700, color: 'var(--text)', marginBottom: 'var(--s-2)', margin: '0 0 var(--s-2)' }}>
                Prêt à passer à l'action ?
              </h3>
              <p style={{ fontSize: 'var(--t-body)', color: 'var(--text-muted)', marginBottom: 'var(--s-6)', margin: '0 0 var(--s-6)' }}>
                Créez votre plan d'intégration de l'IA en 5 étapes structurées
              </p>

              {/* Progress indicator before CTA */}
              <div style={{ marginBottom: 'var(--s-6)', display: 'flex', alignItems: 'center', gap: 'var(--s-4)', justifyContent: 'center' }}>
                <div style={{ fontSize: 'var(--t-caption)', color: 'var(--text-muted)' }}>
                  Déverrouillé après étape 5
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--s-2)' }}>
                  {[1, 2, 3, 4, 5].map((i) => (
                    <div
                      key={i}
                      style={{
                        width: 24,
                        height: 24,
                        borderRadius: '50%',
                        background: i <= completedLessons / (totalLessons / 5) ? TONE_COLOR[tone] : 'var(--border)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: 'var(--t-caption)',
                        fontWeight: 600,
                        color: i <= completedLessons / (totalLessons / 5) ? 'white' : 'var(--text-muted)',
                      }}
                    >
                      {i}
                    </div>
                  ))}
                </div>
              </div>

              <Button
                leadingIcon={<Sparkles size={16} />}
                onClick={() => navigate(`/project/${parcours.id}`)}
                style={{ minWidth: 280 }}
              >
                {parcours.finalProject.ctaText}
              </Button>
            </div>
          </div>
        )}

      </div>
    </div>

    {/* ── Positionnement Modal ─────────────────────────────────── */}
    <PositionnementModal
      isOpen={showPositionnement}
      onClose={() => setShowPositionnement(false)}
      courseTitle={parcours.title}
      courseId={parcours.id}
      onPositionnementComplete={() => setPositioned(true)}
      onStartCourse={() => {
        // Navigate to first available lesson
        const firstEtape = parcours.etapes.find((e: Etape) => e.unlocked);
        if (firstEtape && firstEtape.lecons.length > 0) {
          navigate(`/learning-paths/${parcours.id}/lessons/${firstEtape.lecons[0].id}`);
        }
      }}
    />
    </>
  );
};
