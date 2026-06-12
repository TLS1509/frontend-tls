/**
 * DesignShowcase — page interactive de validation du design system TLS.
 *
 * Visualise les signatures de DESIGN-IMPECCABLE.md §13 (Visual Vocabulary)
 * et les principes de PRODUCT.md (Augmented Mastery, Practice grammar, Tones).
 *
 * Route: /design-showcase
 *
 * Sections :
 *  0. Hero — TLS logo animé (anthropomorphique), ambient gradient, ton switcher
 *  1. Visual Vocabulary — 6 signatures avec démos live
 *  2. Per-Tone Mapping — interactif (clic sur un flow → surface réelle)
 *  3. Per-Altitude Design — Operational vs Strategic split view
 *  4. Practice Grammar — toggle approved vs forbidden verbs
 *  5. AI Transparency Kit — label / source / confidence / override en live
 *  6. Cadence — weekly TLS vs daily Duolingo
 *  7. Hero Pattern Selector — table
 *  8. 6 Design Principles — manifesto
 *  9. 4 Protagonist roles
 */

import React, { useState, useEffect, useCallback } from 'react';
import {
  Sparkles,
  Check,
  X,
  ArrowRight,
  Brain,
  Compass,
  Target,
  Award,
  BookOpen,
  Calendar,
  MessageSquare,
  Eye,
  Shield,
  Users,
  Crown,
  GraduationCap,
  ChevronRight,
  Info,
  Quote,
  Heart,
  Layers,
  CheckCircle2,
  AlertCircle,
  Gauge,
  Accessibility,
  Smartphone,
  Palette,
} from 'lucide-react';
import { Card } from '../components/core/Card';
import { Button } from '../components/core/Button';
import { Badge } from '../components/ui/Badge';
import { TlsLogo } from '../components/ui/TlsLogo';
import { AmbientBlobs } from '../components/patterns/AmbientBlobs';

// ─────────────────────────────────────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────────────────────────────────────

type ToneId = 'primary' | 'warm' | 'sun' | 'brand' | 'neutral';

interface ToneSpec {
  id: ToneId;
  label: string;
  role: string;
  hex: string;
  bgClass: string;
  textClass: string;
  borderClass: string;
  exampleSurface: string;
}

const TONES: ToneSpec[] = [
  {
    id: 'primary',
    label: 'Primary — Coastal Teal',
    role: 'Practice / progress / browse',
    hex: '#55A1B4',
    bgClass: 'bg-primary-50',
    textClass: 'text-primary-700',
    borderClass: 'border-primary-200',
    exampleSurface: 'LessonPlayer · LearningPaths · Dashboard reco',
  },
  {
    id: 'warm',
    label: 'Warm — Amber',
    role: 'Coaching / human contact',
    hex: '#ED843A',
    bgClass: 'bg-secondary-50',
    textClass: 'text-secondary-600',
    borderClass: 'border-secondary-200',
    exampleSurface: 'Coaching hub · MessagingThread · Mission steps',
  },
  {
    id: 'sun',
    label: 'Sun — Golden',
    role: 'Validation / celebration',
    hex: '#F8B044',
    bgClass: 'bg-accent-50',
    textClass: 'text-ink-900',
    borderClass: 'border-accent-200',
    exampleSurface: 'JAC ceremony · Badge unlock · Passeport radar',
  },
  {
    id: 'brand',
    label: 'Brand — Deep Teal',
    role: 'Assertive moment',
    hex: '#1F3E45',
    bgClass: 'bg-primary-900',
    textClass: 'text-white',
    borderClass: 'border-primary-700',
    exampleSurface: 'Auth pages · Dashboard hero · Onboarding success',
  },
  {
    id: 'neutral',
    label: 'Neutral — Greyscale',
    role: 'Utility / settings',
    hex: '#6b7280',
    bgClass: 'bg-ink-50',
    textClass: 'text-ink-700',
    borderClass: 'border-ink-200',
    exampleSurface: 'Settings · Billing · Privacy',
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// Hero — animated TLS logo
// ─────────────────────────────────────────────────────────────────────────────

const ShowcaseHero: React.FC = () => {
  const [computing, setComputing] = useState(false);

  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-page-ambient" aria-hidden />
      <AmbientBlobs intensity="subtle" position="absolute" />

      <div className="relative max-w-6xl mx-auto px-6 py-page">
        <div className="flex flex-col items-center text-center gap-stack-lg max-w-3xl mx-auto">
          {/* Animated logo — V0.5 orbital cascade on the 4 inner shapes */}
          <div className="relative">
            <TlsLogo size={88} variant="color" withBubble loading={computing} />
          </div>

          {/* Eyebrow */}
          <div className="flex items-center gap-stack-xs">
            <span className="font-mono text-micro font-bold tracking-[0.16em] uppercase text-primary-700">
              Design Showcase
            </span>
            <span className="h-px w-12 bg-primary-300" aria-hidden />
            <span className="font-mono text-micro font-bold tracking-[0.16em] uppercase text-secondary-600">
              v1 · Validation
            </span>
          </div>

          {/* Title */}
          <h1 className="font-display text-[clamp(2.5rem,5vw,4rem)] font-bold leading-[1.05] tracking-[-0.02em] text-ink-900">
            La signature visuelle{' '}
            <span className="text-primary-600">de TLS</span>, rendue tangible.
          </h1>

          {/* Summary */}
          <p className="text-body-lg text-ink-700 max-w-prose">
            Toutes les décisions de <strong>PRODUCT.md</strong> et{' '}
            <strong>DESIGN-IMPECCABLE.md</strong>, démontrées en surface réelle.
            Active les démos pour valider visuellement avant de figer le système.
          </p>

          {/* CTA — anthropomorphic logo animation demo */}
          <div className="flex flex-wrap items-center justify-center gap-stack-xs pt-stack">
            <Button
              variant="primary"
              size="lg"
              leadingIcon={<Sparkles size={18} />}
              onClick={() => {
                setComputing(true);
                setTimeout(() => setComputing(false), 2400);
              }}
            >
              Lancer une inférence IA
            </Button>
            <Button variant="ghost" size="lg" trailingIcon={<ArrowRight size={18} />}>
              Voir les 6 signatures
            </Button>
          </div>

          {/* Logo animation legend */}
          <p className="text-caption text-ink-500 italic max-w-md pt-2">
            {computing ? (
              <span className="inline-flex items-center gap-stack-xs text-primary-700 not-italic">
                <span className="inline-block size-1.5 rounded-full bg-primary-500 animate-pulse" />
                Calcul en cours — cascade orbitale sur les 4 shapes du mark
              </span>
            ) : (
              <>
                Les 4 shapes du mark pulsent en cascade pendant le calcul (positionnement,
                matching, génération). Signe vivant — pas mascotte.
              </>
            )}
          </p>
        </div>
      </div>

      {/* V0.5 orbital cascade animation lives inside TlsLogo.tsx (loading prop).
         No wrapper keyframes needed here anymore. */}
    </section>
  );
};

// ─────────────────────────────────────────────────────────────────────────────
// Section wrapper
// ─────────────────────────────────────────────────────────────────────────────

const SectionShell: React.FC<{
  eyebrow: string;
  title: string;
  description?: string;
  children: React.ReactNode;
  tone?: 'primary' | 'warm' | 'sun' | 'neutral';
}> = ({ eyebrow, title, description, children, tone = 'neutral' }) => {
  const eyebrowColor = {
    primary: 'text-primary-700',
    warm: 'text-secondary-600',
    sun: 'text-accent-500',
    neutral: 'text-ink-600',
  }[tone];

  return (
    <section className="max-w-6xl mx-auto px-6 py-section-lg">
      <header className="flex flex-col gap-stack-xs mb-section">
        <span
          className={`font-mono text-micro font-bold tracking-[0.16em] uppercase ${eyebrowColor}`}
        >
          {eyebrow}
        </span>
        <h2 className="font-display text-h2 font-bold tracking-[-0.015em] text-ink-900">
          {title}
        </h2>
        {description && (
          <p className="text-body text-ink-700 max-w-prose">{description}</p>
        )}
      </header>
      {children}
    </section>
  );
};

// ─────────────────────────────────────────────────────────────────────────────
// Section 1 — Visual Vocabulary (6 signatures)
// ─────────────────────────────────────────────────────────────────────────────

const Signature1Glass: React.FC = () => (
  <div className="relative h-64 rounded-2xl overflow-hidden bg-gradient-to-br from-primary-200 via-primary-400 to-primary-700">
    {/* glass card overlapping content */}
    <div className="absolute inset-6 flex items-center justify-center">
      <div className="rounded-xl backdrop-blur-glass-medium bg-white/75 border border-white/40 shadow-lg p-5 max-w-xs">
        <p className="text-caption font-semibold text-primary-800 mb-1">
          Glass-medium · 16px blur
        </p>
        <p className="text-body-sm text-ink-700">
          Surface qui overlap du contenu. Jamais sur card statique.
        </p>
      </div>
    </div>
    <div className="absolute bottom-3 right-3">
      <Badge variant="brand">glass = signal</Badge>
    </div>
  </div>
);

const Signature2Gradient: React.FC = () => (
  <div className="relative h-64 rounded-2xl overflow-hidden">
    <div className="absolute inset-0 bg-gradient-page-ambient" />
    <AmbientBlobs intensity="normal" position="absolute" />
    <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">
      <p className="text-caption font-semibold text-primary-800 mb-1">
        Ambient blobs · 60px blur · 30% opacity
      </p>
      <p className="text-body-sm text-ink-700 max-w-xs">
        Lumière côtière en fin d'après-midi. Asymétrique, jamais centrée.
      </p>
    </div>
  </div>
);

const Signature3Sparkles: React.FC = () => (
  <div className="h-64 rounded-2xl border border-ink-100 bg-surface-cool p-6 flex flex-col gap-stack">
    <div className="flex items-center gap-stack-xs">
      <span className="inline-flex items-center gap-tight rounded-pill bg-primary-50 px-2 py-1">
        <Sparkles size={11} className="text-primary-700" />
        <span className="font-mono text-[0.6875rem] font-bold tracking-[0.08em] text-primary-700">
          IA
        </span>
      </span>
      <span className="text-caption text-ink-500">label canonique</span>
    </div>
    <Button variant="primary" size="md" leadingIcon={<Sparkles size={16} />}>
      Positionnement IA
    </Button>
    <Button variant="secondary" size="md" leadingIcon={<Sparkles size={16} />}>
      Suggérer un parcours
    </Button>
    <p className="text-caption text-ink-500 italic mt-auto">
      Sparkles = marqueur fonctionnel. Jamais décoratif, jamais twinkle.
    </p>
  </div>
);

const Signature4LogoAnim: React.FC = () => {
  const [phase, setPhase] = useState<'idle' | 'computing' | 'done'>('idle');

  const cycle = useCallback(() => {
    setPhase('computing');
    setTimeout(() => setPhase('done'), 2400);
    setTimeout(() => setPhase('idle'), 3800);
  }, []);

  return (
    <div className="relative h-64 rounded-2xl border border-ink-100 bg-white p-6 flex flex-col items-center justify-center gap-stack-lg">
      {/* Version badge — V0.5 orbital cascade on inner shapes; V1 morph deferred to brand refresh */}
      <span className="absolute top-3 right-3 inline-flex items-center gap-tight rounded-pill bg-ink-50 border border-ink-200 px-2 py-0.5 text-[0.625rem] font-mono font-bold tracking-[0.08em] uppercase text-ink-600">
        V0.5 · Orbital
      </span>
      <TlsLogo size={56} variant="color" withBubble loading={phase === 'computing'} />
      <div className="text-center min-h-[2.5rem]">
        {phase === 'idle' && (
          <p className="text-caption text-ink-500">Logo idle — pas d'animation</p>
        )}
        {phase === 'computing' && (
          <span className="inline-flex items-center gap-tight rounded-pill bg-primary-50 px-3 py-1">
            <Sparkles size={11} className="text-primary-700" />
            <span className="font-mono text-[0.6875rem] font-bold tracking-[0.08em] uppercase text-primary-700">
              IA · Calcul en cours
            </span>
          </span>
        )}
        {phase === 'done' && (
          <p className="text-body-sm text-primary-700 font-semibold animate-fade-in">
            Recommandation prête
          </p>
        )}
      </div>
      <Button variant="ghost" size="sm" onClick={cycle} disabled={phase !== 'idle'}>
        {phase === 'idle' ? 'Démarrer cycle' : 'En cours…'}
      </Button>
      <style>{`
        @keyframes fade-in { from { opacity: 0; transform: translateY(4px); } to { opacity: 1; transform: translateY(0); } }
        .animate-fade-in { animation: fade-in 200ms ease-out; }
      `}</style>
    </div>
  );
};

const Signature5GhostType: React.FC = () => {
  const fullMessage =
    "Voici une recommandation : reprends ta compétence « Pilotage stratégique » — elle est à rafraîchir depuis 38 jours.";
  const [text, setText] = useState('');
  const [running, setRunning] = useState(false);

  useEffect(() => {
    if (!running) return;
    if (text.length >= fullMessage.length) {
      setRunning(false);
      return;
    }
    const t = setTimeout(() => setText(fullMessage.slice(0, text.length + 1)), 30);
    return () => clearTimeout(t);
  }, [text, running, fullMessage]);

  const start = () => {
    setText('');
    setRunning(true);
  };

  return (
    <div className="h-64 rounded-2xl border border-ink-100 bg-surface-cool p-6 flex flex-col gap-stack">
      <span className="inline-flex items-center gap-tight rounded-pill bg-primary-50 px-2 py-1 self-start">
        <Sparkles size={11} className="text-primary-700" />
        <span className="font-mono text-[0.6875rem] font-bold tracking-[0.08em] text-primary-700">
          IA
        </span>
      </span>
      <div className="flex-1 rounded-xl bg-white border border-ink-100 p-4">
        <p className="text-body-sm text-ink-800 leading-relaxed">
          {text}
          {running && (
            <span
              className="inline-block w-[2px] h-4 bg-primary-500 align-middle ml-0.5"
              style={{ animation: 'cursor-blink 1s steps(2) infinite' }}
            />
          )}
        </p>
      </div>
      <Button variant="ghost" size="sm" onClick={start} disabled={running}>
        {running ? 'Streaming…' : 'Lancer le streaming'}
      </Button>
      <style>{`
        @keyframes cursor-blink { to { visibility: hidden; } }
        @media (prefers-reduced-motion: reduce) { [style*="cursor-blink"] { animation: none !important; } }
      `}</style>
    </div>
  );
};

const Signature6Tones: React.FC = () => (
  <div className="h-64 rounded-2xl border border-ink-100 bg-white p-4 grid grid-cols-5 gap-stack-xs">
    {TONES.map((t) => (
      <div
        key={t.id}
        className={`rounded-xl ${t.bgClass} ${t.borderClass} border flex flex-col items-center justify-center p-2 text-center gap-tight`}
      >
        <div
          className="size-6 rounded-full ring-2 ring-white/60 shadow-sm"
          style={{ backgroundColor: t.hex }}
        />
        <span className={`text-[0.6875rem] font-semibold ${t.textClass}`}>
          {t.id}
        </span>
      </div>
    ))}
  </div>
);

const SECTION_1_SIGNATURES = [
  {
    n: '01',
    title: 'Glassmorphisme intentionnel',
    sub: 'Sur surfaces qui overlap du contenu. Jamais sur card statique.',
    demo: <Signature1Glass />,
  },
  {
    n: '02',
    title: 'Dégradés ambient diffus',
    sub: 'Lumière côtière fin d\'après-midi. Asymétrique, ≤ 30% opacity.',
    demo: <Signature2Gradient />,
  },
  {
    n: '03',
    title: 'Sparkles fonctionnel',
    sub: 'Marqueur de feature IA. Jamais décoratif, jamais twinkle.',
    demo: <Signature3Sparkles />,
  },
  {
    n: '04',
    title: 'Logo anthropomorphique',
    sub: 'V0.5 — cascade orbitale sur les 4 shapes intérieures (main → top → center → bot). V1 (brand handoff) — shape-morph entre 2–3 silhouettes validées.',
    demo: <Signature4LogoAnim />,
  },
  {
    n: '05',
    title: 'Ghost-typing IA',
    sub: 'Streaming chat ~30 char/sec. Rendering transparency, pas théâtre.',
    demo: <Signature5GhostType />,
  },
  {
    n: '06',
    title: 'Surfaces tone-aware',
    sub: '5 rôles narratifs. Le ton suit le verbe du protagoniste.',
    demo: <Signature6Tones />,
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// Section — Audit Status (Phase 19.1 health)
// ─────────────────────────────────────────────────────────────────────────────

interface AuditDim {
  icon: React.ReactNode;
  label: string;
  score: number;
  max: number;
  finding: string;
  tone: 'primary' | 'warm' | 'sun' | 'neutral' | 'success' | 'danger';
}

const AUDIT_DIMENSIONS: AuditDim[] = [
  {
    icon: <Accessibility size={18} />,
    label: 'Accessibility',
    score: 3,
    max: 4,
    finding: 'focus-visible + min-h-touch en cours · 5 composites fixés sur 11',
    tone: 'primary',
  },
  {
    icon: <Gauge size={18} />,
    label: 'Performance',
    score: 3,
    max: 4,
    finding: 'Inline styles légitimes (runtime), 10 transition-[width] sur progress bars',
    tone: 'primary',
  },
  {
    icon: <Palette size={18} />,
    label: 'Theming',
    score: 4,
    max: 4,
    finding: '0 hex codé · 0 var(--tls-*) arbitraire · Tailwind v4 @theme rock solid',
    tone: 'success',
  },
  {
    icon: <Smartphone size={18} />,
    label: 'Responsive',
    score: 2,
    max: 4,
    finding: '25 composants sans breakpoints · Modal mobile padding fixé',
    tone: 'warm',
  },
  {
    icon: <Shield size={18} />,
    label: 'Anti-Patterns',
    score: 3,
    max: 4,
    finding: '0 em-dash, 0 !important, 0 hero-metric · 2 P0 fixés (side-stripe, gradient text)',
    tone: 'primary',
  },
];

interface FixEntry {
  id: string;
  severity: 'P0' | 'P1';
  category: string;
  file: string;
  before: string;
  after: string;
  status: 'done' | 'in-progress' | 'todo';
}

const FIXES: FixEntry[] = [
  {
    id: 'P0-1',
    severity: 'P0',
    category: 'Anti-pattern · Side-stripe',
    file: 'ui/CorrectionCard.tsx',
    before: 'border-l-2 border-ink-200 pl-3',
    after: 'rounded-lg bg-ink-50/70 px-3 py-2 (blockquote)',
    status: 'done',
  },
  {
    id: 'P0-2',
    severity: 'P0',
    category: 'Anti-pattern · Gradient text',
    file: 'patterns/ErrorPage.tsx',
    before: 'bg-clip-text + gradient on 404 code',
    after: 'solid text-primary-200, font-black, larger clamp',
    status: 'done',
  },
  {
    id: 'P1-1a',
    severity: 'P1',
    category: 'A11y · focus-visible',
    file: 'ui/ActionCard, Search, HeatmapGrid, CourseCard, AchievementBadge',
    before: 'no focus-visible on <button>',
    after: 'focus-visible:outline-2 outline-offset-2 outline-primary-500',
    status: 'done',
  },
  {
    id: 'P1-1b',
    severity: 'P1',
    category: 'A11y · focus-visible',
    file: 'patterns/AppBreadcrumb, ActivityFeed, Flashcard, StepTutorial, DataTable, ViewerOverlay',
    before: 'no focus-visible on <button> / role="button"',
    after: 'triple focus-visible: classes ajoutées',
    status: 'done',
  },
  {
    id: 'P1-2a',
    severity: 'P1',
    category: 'A11y · touch target (primitives)',
    file: 'ui/Tabs, FilterChip, Pagination, DropdownMenu, Toast',
    before: 'h-8 / h-10 sans min-h ou py-1.5',
    after: 'min-h-touch (44px) sur BASE class de chaque primitive',
    status: 'done',
  },
  {
    id: 'P1-2b',
    severity: 'P1',
    category: 'A11y · touch target (composites)',
    file: 'ui/CourseCard, AchievementBadge, ActionCard ; patterns/AppBreadcrumb, ActivityFeed, ViewerOverlay, StepTutorial',
    before: 'h-10 / w-10 ou no min-h',
    after: 'min-h-touch ajouté (44px WCAG SC 2.5.5)',
    status: 'done',
  },
  {
    id: 'P1-3',
    severity: 'P1',
    category: 'Responsive · mobile padding',
    file: 'ui/Modal.tsx',
    before: 'max-w-[480px] sans gutter mobile',
    after: 'p-6 sm:p-8 · w-full sm:max-w-[480px] · mx-auto',
    status: 'done',
  },
  {
    id: 'P1-4',
    severity: 'P1',
    category: 'Consolidation · Hero family',
    file: 'patterns/EditorialHero → PageHero (canonical) · HeroSection sunset · PageHeader stays utility',
    before: 'EditorialHero (101 consumers) + HeroSection (3, 436 LOC bloat) + PageHeader (1, utility) chevauchants · nom EditorialHero trompeur',
    after: 'PageHero canonical universal + EditorialHero alias rétrocompat & editorial-canonical · HeroSection.tsx supprimé · PageHero étendu avec backLink + progress slots · 2 consumers HeroSection migrés (LearningPathDetail, Recherche)',
    status: 'done',
  },
  {
    id: 'P1-5',
    severity: 'P1',
    category: 'Distill · AuthShell cleanup',
    file: 'patterns/AuthShell.tsx · components/index.ts',
    before: 'AuthFeature deprecated + 0 consumers ; structure file opaque',
    after: 'AuthFeature supprimé · JSDoc file structure (1 layout + 11 sub-components catégorisés)',
    status: 'done',
  },
  {
    id: 'P1-6',
    severity: 'P1',
    category: 'Extract · Chip base',
    file: 'ui/Chip.tsx (new) + Pill, Tag, FilterChip, MetaPill',
    before: '4 fichiers fragmentés · tone maps dupliqués · MetaPill role="button" anti-pattern',
    after: 'Chip primitive + style tokens partagés (CHIP_BASE/SIZE/TONE/SURFACE) · MetaPill clickable = vrai <button> · 4 APIs publiques préservées',
    status: 'done',
  },
  {
    id: 'P2-BRAND',
    severity: 'P1',
    category: 'Brand · Logo shape-morph (V1)',
    file: 'ui/TlsLogo.tsx + Notion brand guidelines + Canva brand kit',
    before: 'V0.5 cascade orbitale sur les 4 shapes (main + center + top + bot)',
    after: 'Path interpolation entre 2–3 silhouettes validées brand (à la Claude)',
    status: 'todo',
  },
];

const SEVERITY_STYLE: Record<FixEntry['severity'], string> = {
  P0: 'bg-danger-bg text-danger-fg border-danger-base/30',
  P1: 'bg-secondary-50 text-secondary-700 border-secondary-200',
};

const STATUS_STYLE: Record<FixEntry['status'], { icon: React.ReactNode; label: string; className: string }> = {
  done: {
    icon: <CheckCircle2 size={14} />,
    label: 'Fait',
    className: 'bg-primary-50 text-primary-700 border-primary-200',
  },
  'in-progress': {
    icon: <AlertCircle size={14} />,
    label: 'En cours',
    className: 'bg-accent-50 text-accent-600 border-accent-200',
  },
  todo: {
    icon: <ChevronRight size={14} />,
    label: 'À faire',
    className: 'bg-ink-50 text-ink-600 border-ink-200',
  },
};

const ScoreGauge: React.FC<{ dim: AuditDim }> = ({ dim }) => {
  const pct = (dim.score / dim.max) * 100;
  const toneFill = {
    primary: 'bg-primary-500',
    warm: 'bg-secondary-500',
    sun: 'bg-accent-400',
    neutral: 'bg-ink-400',
    success: 'bg-success-base',
    danger: 'bg-danger-base',
  }[dim.tone];
  const toneIconBg = {
    primary: 'bg-primary-50 text-primary-700',
    warm: 'bg-secondary-50 text-secondary-600',
    sun: 'bg-accent-50 text-accent-600',
    neutral: 'bg-ink-50 text-ink-700',
    success: 'bg-primary-50 text-primary-700',
    danger: 'bg-danger-bg text-danger-fg',
  }[dim.tone];

  return (
    <div className="rounded-2xl border border-ink-100 bg-white p-5 flex flex-col gap-stack-xs">
      <div className="flex items-start justify-between">
        <span className={`inline-flex items-center justify-center size-9 rounded-xl ${toneIconBg}`}>
          {dim.icon}
        </span>
        <span className="font-mono text-[0.6875rem] font-bold tracking-[0.08em] text-ink-500 tabular-nums">
          {dim.score}/{dim.max}
        </span>
      </div>
      <h4 className="font-display text-title font-semibold text-ink-900">{dim.label}</h4>
      <div className="h-1.5 rounded-full bg-ink-100 overflow-hidden">
        <div className={`h-full rounded-full transition-[width] duration-700 ease-out ${toneFill}`} style={{ width: `${pct}%` }} />
      </div>
      <p className="text-caption text-ink-600 leading-relaxed">{dim.finding}</p>
    </div>
  );
};

// ─────────────────────────────────────────────────────────────────────────────
// Kanban board — 3 columns by status (Fait / En cours / À faire)
// ─────────────────────────────────────────────────────────────────────────────

interface KanbanColumn {
  status: FixEntry['status'];
  label: string;
  description: string;
  accent: string;
  bgHeader: string;
  borderHeader: string;
  emptyIcon: React.ReactNode;
  emptyLabel: string;
}

const KANBAN_COLUMNS: KanbanColumn[] = [
  {
    status: 'done',
    label: 'Fait',
    description: 'Appliqué et vérifié',
    accent: 'bg-primary-500',
    bgHeader: 'bg-primary-50/80',
    borderHeader: 'border-primary-200',
    emptyIcon: <CheckCircle2 size={18} />,
    emptyLabel: 'Aucun fix terminé',
  },
  {
    status: 'in-progress',
    label: 'En cours',
    description: 'Travail commencé, non terminé',
    accent: 'bg-accent-400',
    bgHeader: 'bg-accent-50/80',
    borderHeader: 'border-accent-200',
    emptyIcon: <AlertCircle size={18} />,
    emptyLabel: 'Rien en cours',
  },
  {
    status: 'todo',
    label: 'À faire',
    description: 'Programmé, pas encore commencé',
    accent: 'bg-ink-400',
    bgHeader: 'bg-ink-50/80',
    borderHeader: 'border-ink-200',
    emptyIcon: <ChevronRight size={18} />,
    emptyLabel: 'Backlog vide',
  },
];

const KanbanCard: React.FC<{ fix: FixEntry }> = ({ fix }) => {
  const [open, setOpen] = useState(false);
  const fileName = fix.file.split(/[,;]/)[0].trim();
  const restCount = fix.file.split(/[,;]/).length - 1;

  return (
    <article className="rounded-xl border border-ink-200 bg-white p-stack hover:shadow-md hover:-translate-y-0.5 transition-all duration-base">
      {/* Top row: severity + id */}
      <header className="flex items-center justify-between mb-stack-xs">
        <span
          className={`inline-flex items-center justify-center rounded-pill border px-2 py-0.5 text-[0.6875rem] font-mono font-bold tracking-[0.04em] ${SEVERITY_STYLE[fix.severity]}`}
        >
          {fix.severity}
        </span>
        <span className="font-mono text-[0.625rem] font-bold tracking-[0.08em] text-ink-400 uppercase">
          {fix.id}
        </span>
      </header>

      {/* Category */}
      <p className="font-mono text-[0.6875rem] font-bold tracking-[0.06em] uppercase text-primary-700 mb-tight">
        {fix.category}
      </p>

      {/* File */}
      <p
        className="text-body-sm font-semibold text-ink-900 leading-snug mb-stack-xs break-words"
        title={fix.file}
      >
        <code className="font-mono">{fileName}</code>
        {restCount > 0 && (
          <span className="ml-1 inline-flex items-center rounded-pill bg-ink-100 px-1.5 py-0.5 text-[0.625rem] font-semibold text-ink-600">
            +{restCount}
          </span>
        )}
      </p>

      {/* Diff toggle */}
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className="inline-flex items-center gap-tight text-caption font-semibold text-primary-700 hover:text-primary-900 transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500 rounded min-h-touch -mx-1 px-1"
      >
        {open ? 'Masquer Δ' : 'Voir Δ'}
        <ChevronRight
          size={13}
          className={`transition-transform ${open ? 'rotate-90' : ''}`}
        />
      </button>

      {/* Diff body */}
      {open && (
        <div className="mt-stack-xs flex flex-col gap-tight animate-[kanban-fade_180ms_ease-out]">
          <div className="rounded-lg bg-danger-bg/40 border border-danger-base/20 p-2">
            <p className="text-[0.625rem] font-mono font-bold tracking-[0.08em] uppercase text-danger-fg mb-1">
              − Avant
            </p>
            <code className="block text-[0.75rem] text-ink-800 font-mono leading-snug break-all">
              {fix.before}
            </code>
          </div>
          <div className="rounded-lg bg-primary-50 border border-primary-200/60 p-2">
            <p className="text-[0.625rem] font-mono font-bold tracking-[0.08em] uppercase text-primary-700 mb-1">
              + Après
            </p>
            <code className="block text-[0.75rem] text-ink-800 font-mono leading-snug break-all">
              {fix.after}
            </code>
          </div>
        </div>
      )}

      <style>{`
        @keyframes kanban-fade {
          from { opacity: 0; transform: translateY(-2px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </article>
  );
};

const KanbanBoard: React.FC<{ fixes: FixEntry[] }> = ({ fixes }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-stack">
      {KANBAN_COLUMNS.map((col) => {
        const items = fixes.filter((f) => f.status === col.status);
        return (
          <section
            key={col.status}
            className="flex flex-col gap-stack rounded-2xl border border-ink-200 bg-ink-50/40 p-stack-xs"
            aria-label={`Colonne ${col.label}`}
          >
            {/* Column header */}
            <header
              className={`rounded-xl border ${col.borderHeader} ${col.bgHeader} px-stack py-stack-xs flex items-center justify-between gap-stack-xs`}
            >
              <div className="flex items-center gap-stack-xs">
                <span
                  className={`inline-block size-2 rounded-full ${col.accent}`}
                  aria-hidden
                />
                <h4 className="font-display text-body-sm font-semibold text-ink-900">
                  {col.label}
                </h4>
                <span className="font-mono text-[0.6875rem] font-bold tabular-nums text-ink-600 bg-white/70 rounded-pill px-1.5 py-0.5 border border-ink-200">
                  {items.length}
                </span>
              </div>
              <span className="hidden lg:inline text-caption text-ink-500">
                {col.description}
              </span>
            </header>

            {/* Cards */}
            {items.length === 0 ? (
              <div className="flex flex-col items-center justify-center gap-stack-xs py-section text-ink-400">
                <span className="inline-flex size-9 items-center justify-center rounded-full bg-white/70 border border-ink-200">
                  {col.emptyIcon}
                </span>
                <span className="text-caption italic">{col.emptyLabel}</span>
              </div>
            ) : (
              <div className="flex flex-col gap-stack-xs">
                {items.map((fix) => (
                  <KanbanCard key={fix.id} fix={fix} />
                ))}
              </div>
            )}
          </section>
        );
      })}
    </div>
  );
};

const AuditStatusSection: React.FC = () => {
  const totalScore = AUDIT_DIMENSIONS.reduce((s, d) => s + d.score, 0);
  const totalMax = AUDIT_DIMENSIONS.reduce((s, d) => s + d.max, 0);
  const doneCount = FIXES.filter((f) => f.status === 'done').length;

  return (
    <SectionShell
      eyebrow="Phase 19.1 · Audit Status"
      title={`Health score · ${totalScore}/${totalMax} (Good)`}
      description="Audit technique systématique sur 113 composants. 5 dimensions scorées. Anti-pattern verdict : Pass — pas d'AI slop, identité TLS distinctive."
      tone="primary"
    >
      {/* Score gauges */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-stack mb-section">
        {AUDIT_DIMENSIONS.map((d) => (
          <ScoreGauge key={d.label} dim={d} />
        ))}
      </div>

      {/* Fix log header */}
      <header className="flex flex-wrap items-baseline justify-between gap-stack-xs mb-stack">
        <h3 className="font-display text-h4 font-semibold text-ink-900">
          Fix log · {doneCount}/{FIXES.length} appliqués
        </h3>
        <p className="text-caption text-ink-500">
          P0 = blocking (anti-pattern absolu) · P1 = major (WCAG AA / responsive)
        </p>
      </header>

      {/* Kanban board — 3 columns by status */}
      <KanbanBoard fixes={FIXES} />

      {/* Next steps */}
      <div className="mt-section grid grid-cols-1 md:grid-cols-3 gap-stack">
        {[
          {
            cmd: '/impeccable extract',
            sub: 'Hero family consolidation + Chip base extraction',
            tone: 'primary' as const,
          },
          {
            cmd: '/impeccable distill',
            sub: 'AuthShell props bloat → slot pattern',
            tone: 'warm' as const,
          },
          {
            cmd: '/impeccable colorize',
            sub: 'Passe tone-aware sur les 45 patterns sans tone prop',
            tone: 'sun' as const,
          },
        ].map((s) => {
          const colors = {
            primary: 'border-primary-200 bg-primary-50/40',
            warm: 'border-secondary-200 bg-secondary-50/40',
            sun: 'border-accent-200 bg-accent-50/40',
          }[s.tone];
          return (
            <div key={s.cmd} className={`rounded-xl border p-4 ${colors}`}>
              <code className="block font-mono text-caption font-bold text-ink-900 mb-1">
                {s.cmd}
              </code>
              <p className="text-caption text-ink-600">{s.sub}</p>
            </div>
          );
        })}
      </div>
    </SectionShell>
  );
};

const VisualVocabularySection: React.FC = () => (
  <SectionShell
    eyebrow="§13 Visual Vocabulary"
    title="6 signatures positives"
    description="Ce que TLS est, pas ce que TLS rejette. Chaque signature est démontrée en surface réelle — clique sur les démos interactives pour les éprouver."
    tone="primary"
  >
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-stack-lg">
      {SECTION_1_SIGNATURES.map((sig) => (
        <article
          key={sig.n}
          className="flex flex-col gap-stack rounded-2xl"
        >
          <div className="flex items-baseline gap-stack-xs">
            <span className="font-mono text-eyebrow font-bold tracking-[0.08em] text-primary-600">
              {sig.n}
            </span>
            <h3 className="font-display text-title font-semibold text-ink-900">
              {sig.title}
            </h3>
          </div>
          <p className="text-body-sm text-ink-600">{sig.sub}</p>
          {sig.demo}
        </article>
      ))}
    </div>
  </SectionShell>
);

// ─────────────────────────────────────────────────────────────────────────────
// Section 2 — Per-Tone Mapping (interactive)
// ─────────────────────────────────────────────────────────────────────────────

interface FlowEntry {
  flow: string;
  dominant: ToneId;
  accent?: ToneId;
  surfaces: string;
  verb: string;
}

const FLOW_MAPPING: FlowEntry[] = [
  { flow: 'Learn — formation, lesson, parcours', dominant: 'primary', accent: 'sun', surfaces: 'LessonPlayer · LearningPaths · viewers', verb: 'Pratiquer / apprendre' },
  { flow: 'Do — missions, projects SBO', dominant: 'warm', accent: 'primary', surfaces: 'ProjectDetail · Mission · JAC ceremony', verb: 'Réaliser' },
  { flow: 'Match — coaching, matching, reco', dominant: 'primary', accent: 'brand', surfaces: 'Coaching reco · Dashboard reco', verb: 'Recommander' },
  { flow: 'Reflect — journal, messaging, corrections', dominant: 'sun', accent: 'warm', surfaces: 'Journal · MessagingThread · CorrectionDetail', verb: 'Réfléchir' },
  { flow: 'Gamify — badges, XP, Passeport', dominant: 'sun', accent: 'primary', surfaces: 'Badge unlock · Dreyfus radar · Leaderboard', verb: 'Valider / célébrer' },
  { flow: 'Enterprise — manager, CLO portfolio', dominant: 'primary', accent: 'neutral', surfaces: 'ManagerDashboard · ValidationQueue · Analytics', verb: 'Piloter / superviser' },
  { flow: 'Onboarding — first run, questionnaire', dominant: 'primary', accent: 'warm', surfaces: 'Positionnement IA · Tutorial · Success', verb: 'Découvrir' },
  { flow: 'Auth — login, signup, magic-link', dominant: 'brand', surfaces: 'AuthShell (split-screen)', verb: 'Entrer' },
  { flow: 'Settings / Privacy / Billing', dominant: 'neutral', accent: 'primary', surfaces: 'Profile · Billing · PrivacyDsar', verb: 'Configurer' },
];

const TonePreviewCard: React.FC<{ tone: ToneSpec; flow: FlowEntry }> = ({ tone, flow }) => {
  const surfaceStyle =
    tone.id === 'brand'
      ? 'bg-gradient-to-br from-primary-700 to-primary-900 text-white border-primary-700'
      : tone.id === 'neutral'
      ? 'bg-white border-ink-200 text-ink-900'
      : `${tone.bgClass} ${tone.borderClass} ${tone.textClass}`;

  const eyebrowStyle = tone.id === 'brand' ? 'text-white/80' : tone.textClass;

  return (
    <div className={`rounded-2xl border p-6 ${surfaceStyle}`}>
      <div className="flex items-center gap-stack-xs mb-3">
        <div
          className="size-3 rounded-full ring-2 ring-white/50"
          style={{ backgroundColor: tone.hex }}
        />
        <span className={`font-mono text-eyebrow font-bold tracking-[0.08em] uppercase ${eyebrowStyle}`}>
          {flow.verb}
        </span>
      </div>
      <h4 className="font-display text-h4 font-semibold mb-2">{flow.flow.split('—')[1]?.trim() ?? flow.flow}</h4>
      <p className={`text-body-sm mb-stack ${tone.id === 'brand' ? 'text-white/85' : 'opacity-80'}`}>
        Surfaces · {flow.surfaces}
      </p>
      <div className="flex flex-wrap items-center gap-stack-xs pt-stack-xs">
        <span className={`inline-flex items-center gap-tight rounded-pill px-2 py-0.5 text-[0.6875rem] font-semibold ${
          tone.id === 'brand' ? 'bg-white/20 text-white' : 'bg-white/60 text-ink-800'
        }`}>
          Dominant · {tone.id}
        </span>
        {flow.accent && (
          <span className={`inline-flex items-center gap-tight rounded-pill px-2 py-0.5 text-[0.6875rem] font-semibold ${
            tone.id === 'brand' ? 'bg-white/10 text-white/80' : 'bg-white/40 text-ink-700'
          }`}>
            Accent · {flow.accent}
          </span>
        )}
      </div>
    </div>
  );
};

const PerToneMappingSection: React.FC = () => {
  const [selected, setSelected] = useState<FlowEntry>(FLOW_MAPPING[0]);
  const selectedTone = TONES.find((t) => t.id === selected.dominant)!;

  return (
    <SectionShell
      eyebrow="§10 Per-Flow Tone Mapping"
      title="Le ton suit le verbe"
      description="Chaque flow porte un ton dominant + au plus un accent. Clique sur un flow pour voir la surface réelle qui en résulte."
      tone="warm"
    >
      <div className="grid grid-cols-1 lg:grid-cols-[1fr,1.2fr] gap-stack-lg items-start">
        {/* Flow list */}
        <div className="flex flex-col gap-stack-xs">
          {FLOW_MAPPING.map((f) => {
            const isActive = selected.flow === f.flow;
            const tone = TONES.find((t) => t.id === f.dominant)!;
            return (
              <button
                key={f.flow}
                onClick={() => setSelected(f)}
                className={`group flex items-center gap-stack-xs rounded-xl border px-4 py-3 text-left min-h-touch transition-all duration-base focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500 ${
                  isActive
                    ? 'bg-white border-ink-300 shadow-md'
                    : 'bg-surface-cool border-ink-100 hover:bg-white hover:border-ink-200'
                }`}
              >
                <div
                  className="size-3 rounded-full ring-2 ring-white/80 shrink-0"
                  style={{ backgroundColor: tone.hex }}
                />
                <div className="flex-1 min-w-0">
                  <p className={`text-body-sm font-semibold ${isActive ? 'text-ink-900' : 'text-ink-700'}`}>
                    {f.flow}
                  </p>
                </div>
                <ChevronRight
                  size={16}
                  className={`shrink-0 transition-transform ${
                    isActive ? 'text-ink-600 translate-x-0.5' : 'text-ink-300 group-hover:text-ink-500'
                  }`}
                />
              </button>
            );
          })}
        </div>

        {/* Preview */}
        <div className="lg:sticky lg:top-6">
          <TonePreviewCard tone={selectedTone} flow={selected} />
          <p className="text-caption text-ink-500 mt-stack italic">
            Règle One Dominant Tone — le body, les backgrounds et la typo restent dans le ton
            dominant ou en greyscale. L'accent est réservé à <strong>un seul élément</strong>{' '}
            (badge, CTA secondaire, status indicator).
          </p>
        </div>
      </div>
    </SectionShell>
  );
};

// ─────────────────────────────────────────────────────────────────────────────
// Section 3 — Per-Altitude Design
// ─────────────────────────────────────────────────────────────────────────────

const PerAltitudeSection: React.FC = () => (
  <SectionShell
    eyebrow="§6 Per-Altitude Design"
    title="Une altitude par viewport"
    description="Operational (apprenant / coach) ou Strategic (manager / CLO) — jamais les deux dans la même surface. Mélanger casse la vitesse de décision."
    tone="primary"
  >
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-stack-lg">
      {/* Operational mock */}
      <article className="rounded-2xl border border-primary-200 bg-primary-50 p-6 flex flex-col gap-stack">
        <header className="flex items-center justify-between">
          <div>
            <p className="font-mono text-eyebrow font-bold tracking-[0.08em] uppercase text-primary-700">
              Operational · 80% surface
            </p>
            <h3 className="font-display text-h3 font-bold text-ink-900 mt-1">
              Apprenant · Coach
            </h3>
          </div>
          <Badge variant="brand">tu</Badge>
        </header>

        {/* Mock dashboard */}
        <div className="rounded-xl bg-white border border-primary-100 p-4 flex flex-col gap-stack-xs">
          <p className="text-caption text-ink-500">Lundi 26 mai</p>
          <h4 className="font-display text-h4 font-semibold text-ink-900">
            Reprends ta leçon
          </h4>
          <div className="flex flex-wrap items-center gap-stack-xs">
            <Badge variant="brand">Niveau 3</Badge>
            <Badge variant="neutral">22 min</Badge>
            <Badge variant="neutral">Étape 4 sur 7</Badge>
          </div>
          <div className="h-1.5 rounded-full bg-primary-100 overflow-hidden">
            <div className="h-full w-[58%] rounded-full bg-primary-500" />
          </div>
          <Button variant="primary" size="md" trailingIcon={<ArrowRight size={16} />}>
            Reprends
          </Button>
        </div>

        <ul className="text-body-sm text-ink-700 flex flex-col gap-stack-xs pt-stack-xs">
          <li className="flex items-start gap-stack-xs"><Check size={14} className="text-primary-600 mt-0.5 shrink-0" /> Single action per viewport — 3 sec answer</li>
          <li className="flex items-start gap-stack-xs"><Check size={14} className="text-primary-600 mt-0.5 shrink-0" /> Progress visible — Dreyfus, parcours, mission</li>
          <li className="flex items-start gap-stack-xs"><Check size={14} className="text-primary-600 mt-0.5 shrink-0" /> Practice {'>'} content completion</li>
          <li className="flex items-start gap-stack-xs"><Check size={14} className="text-primary-600 mt-0.5 shrink-0" /> Motion ≤ 200ms · Tailwind transitions only</li>
        </ul>
      </article>

      {/* Strategic mock */}
      <article className="rounded-2xl border border-ink-200 bg-white p-6 flex flex-col gap-stack">
        <header className="flex items-center justify-between">
          <div>
            <p className="font-mono text-eyebrow font-bold tracking-[0.08em] uppercase text-ink-600">
              Strategic · 15% surface
            </p>
            <h3 className="font-display text-h3 font-bold text-ink-900 mt-1">
              Manager · CLO
            </h3>
          </div>
          <Badge variant="neutral">vous</Badge>
        </header>

        {/* Mock KPI bar */}
        <div className="grid grid-cols-3 gap-stack-xs">
          {[
            { label: 'Atrophie 90j', value: '12', sub: 'cohort 47' },
            { label: 'JAC validés', value: '38', sub: 'ce mois' },
            { label: 'Risque', value: '4', sub: 'à arbitrer' },
          ].map((kpi) => (
            <div key={kpi.label} className="rounded-lg border border-ink-100 bg-surface-cool p-3">
              <p className="font-mono text-[0.625rem] font-bold tracking-[0.08em] uppercase text-ink-500">
                {kpi.label}
              </p>
              <p className="font-display text-h3 font-bold text-ink-900 mt-1">{kpi.value}</p>
              <p className="text-[0.6875rem] text-ink-500">{kpi.sub}</p>
            </div>
          ))}
        </div>

        {/* Mock heatmap row */}
        <div className="rounded-lg border border-ink-100 p-3 bg-surface-cool">
          <p className="text-caption text-ink-500 mb-2">Capability heatmap · 7 comp.</p>
          <div className="grid grid-cols-7 gap-tight">
            {[3, 4, 2, 5, 3, 4, 4].map((lvl, i) => (
              <div
                key={i}
                className="aspect-square rounded"
                style={{
                  backgroundColor: `rgba(85, 161, 180, ${0.15 + lvl * 0.17})`,
                }}
                aria-label={`Compétence ${i + 1} — niveau ${lvl}`}
              />
            ))}
          </div>
        </div>

        <ul className="text-body-sm text-ink-700 flex flex-col gap-stack-xs pt-stack-xs">
          <li className="flex items-start gap-stack-xs"><Check size={14} className="text-primary-600 mt-0.5 shrink-0" /> Portfolio view — pas lens individuelle</li>
          <li className="flex items-start gap-stack-xs"><Check size={14} className="text-primary-600 mt-0.5 shrink-0" /> Trends {'>'} snapshots · pas de hero-metric</li>
          <li className="flex items-start gap-stack-xs"><Check size={14} className="text-primary-600 mt-0.5 shrink-0" /> Override visible sur reco IA</li>
          <li className="flex items-start gap-stack-xs"><Check size={14} className="text-primary-600 mt-0.5 shrink-0" /> Motion ≤ 150ms · sort/filter/expand</li>
        </ul>
      </article>
    </div>

    <Card variant="bordered" className="mt-stack-lg p-5 flex items-start gap-stack-xs bg-amber-50/40 border-secondary-200">
      <Info size={20} className="text-secondary-600 shrink-0 mt-0.5" />
      <p className="text-body-sm text-ink-800">
        <strong>Règle One Altitude Per Viewport.</strong> Le Manager dashboard n'embarque pas le
        lesson player de l'apprenant. Le Coach hub est operational ; le Coach analytics est
        strategic — deux routes séparées, pas deux tabs.
      </p>
    </Card>
  </SectionShell>
);

// ─────────────────────────────────────────────────────────────────────────────
// Section 4 — Practice Grammar
// ─────────────────────────────────────────────────────────────────────────────

interface VerbPair {
  approved: string;
  forbidden: string;
  context: string;
}

const VERB_PAIRS: VerbPair[] = [
  { approved: 'Reprends ta réflexion', forbidden: 'Continue le module', context: 'Dashboard CTA' },
  { approved: 'Valide la pratique', forbidden: 'Termine le quiz', context: 'JAC ceremony' },
  { approved: 'Soumets le JAC', forbidden: 'Complète l\'étape', context: 'Mission submission' },
  { approved: 'Maîtrise la compétence', forbidden: 'Avance dans le parcours', context: 'Dreyfus progression' },
  { approved: 'Pratique sur projet réel', forbidden: 'Visionne la leçon', context: 'AFEST mission' },
  { approved: 'Réfléchis dans ton journal', forbidden: 'Suis le cours', context: 'Journal entry' },
];

const PracticeGrammarSection: React.FC = () => {
  const [showForbidden, setShowForbidden] = useState(false);

  return (
    <SectionShell
      eyebrow="§7 Practice Grammar"
      title="Practice comme verbe"
      description="Chaque écran cadre une pratique active, pas une consommation passive. L'apprenant est sujet du verbe. Toggle pour voir l'opposé doctrinal."
      tone="sun"
    >
      <div className="flex items-center gap-stack-xs mb-stack-lg">
        <button
          onClick={() => setShowForbidden(false)}
          className={`px-4 py-2 rounded-pill text-button font-semibold min-h-touch transition-all focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500 ${
            !showForbidden
              ? 'bg-primary-600 text-white shadow-sm'
              : 'bg-ink-50 text-ink-600 hover:bg-ink-100'
          }`}
        >
          ✓ Approuvés (TLS)
        </button>
        <button
          onClick={() => setShowForbidden(true)}
          className={`px-4 py-2 rounded-pill text-button font-semibold min-h-touch transition-all focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500 ${
            showForbidden
              ? 'bg-danger-base text-white shadow-sm'
              : 'bg-ink-50 text-ink-600 hover:bg-ink-100'
          }`}
        >
          ✗ Interdits (LMS legacy)
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-stack">
        {VERB_PAIRS.map((v) => (
          <Card
            key={v.approved}
            variant="default"
            className={`p-5 transition-all duration-base ${
              showForbidden ? 'opacity-90' : ''
            }`}
          >
            <p className="font-mono text-eyebrow font-bold tracking-[0.08em] uppercase text-ink-500 mb-stack-xs">
              {v.context}
            </p>
            <div
              className={`rounded-pill px-4 py-2 inline-flex items-center gap-stack-xs ${
                showForbidden
                  ? 'bg-danger-bg text-danger-fg line-through'
                  : 'bg-primary-600 text-white'
              }`}
            >
              {showForbidden ? <X size={14} /> : <Check size={14} />}
              <span className="text-button font-semibold">
                {showForbidden ? v.forbidden : v.approved}
              </span>
            </div>
            <p className="text-caption text-ink-500 mt-stack-xs">
              {showForbidden
                ? 'Énergie LMS / compliance-checkbox · banni'
                : 'Verbe d\'action · l\'apprenant pratique'}
            </p>
          </Card>
        ))}
      </div>
    </SectionShell>
  );
};

// ─────────────────────────────────────────────────────────────────────────────
// Section 5 — AI Transparency Kit (live demo)
// ─────────────────────────────────────────────────────────────────────────────

const AITransparencyDemo: React.FC = () => {
  const [overridden, setOverridden] = useState(false);

  return (
    <Card variant="default" className="p-6 max-w-2xl">
      {/* Label + rationale */}
      <header className="flex items-start justify-between gap-stack-xs mb-stack-lg">
        <div className="flex items-center gap-stack-xs">
          <span className="inline-flex items-center gap-tight rounded-pill bg-primary-50 px-2.5 py-1">
            <Sparkles size={12} className="text-primary-700" />
            <span className="font-mono text-[0.6875rem] font-bold tracking-[0.08em] uppercase text-primary-700">
              IA
            </span>
          </span>
          <span className="text-caption text-ink-500">Recommandation matching</span>
        </div>
        <span className="text-caption text-ink-500">il y a 2 min</span>
      </header>

      <h4 className="font-display text-h4 font-semibold text-ink-900 mb-stack-xs">
        Camille Dupont · Mission Pilotage stratégique
      </h4>
      <p className="text-body-sm text-ink-700 mb-stack-lg">
        Camille est positionnée Compétent (D3) sur la compétence cible. Disponibilité
        confirmée sur la fenêtre 12-26 juin.
      </p>

      {/* Confidence */}
      <div className="rounded-lg bg-surface-cool border border-ink-100 p-3 mb-stack">
        <div className="flex items-center justify-between mb-1.5">
          <span className="text-caption font-semibold text-ink-700">Confiance</span>
          <span className="font-mono text-eyebrow font-bold text-primary-700">82%</span>
        </div>
        <div className="h-1.5 rounded-full bg-ink-100 overflow-hidden">
          <div className="h-full w-[82%] rounded-full bg-primary-500" />
        </div>
        <p className="text-caption text-ink-500 mt-2">
          Confiance élevée — au-dessus du seuil 70%.
        </p>
      </div>

      {/* Source citation */}
      <button className="flex items-start gap-stack-xs text-left mb-stack-lg group focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500 rounded-md p-1 -m-1">
        <Quote size={14} className="text-ink-400 mt-0.5 shrink-0" />
        <span className="text-caption text-ink-600 group-hover:text-ink-800 underline decoration-dotted underline-offset-4">
          Source · Passeport Camille D. — Compétence pilotage stratégique, Dreyfus D3 validé le 14/04
        </span>
      </button>

      {/* Override */}
      <div className="flex items-center justify-between rounded-lg border border-secondary-200 bg-secondary-50/60 p-3">
        <div className="flex items-center gap-stack-xs">
          <Shield size={16} className="text-secondary-600" />
          <span className="text-body-sm font-semibold text-ink-800">
            {overridden ? 'Override activé' : 'Override disponible'}
          </span>
        </div>
        <Button
          variant={overridden ? 'secondary' : 'ghost'}
          size="sm"
          onClick={() => setOverridden(!overridden)}
        >
          {overridden ? 'Annuler' : 'Override'}
        </Button>
      </div>
      {overridden && (
        <p className="text-caption text-secondary-700 mt-2 italic">
          Audit trail enregistré · cette décision est tracée pour bias monitoring.
        </p>
      )}
    </Card>
  );
};

const AITransparencySection: React.FC = () => (
  <SectionShell
    eyebrow="§8 AI Transparency Kit"
    title="L'IA est instrument calibré"
    description="Chaque output IA porte 4 patterns obligatoires : label visible, source citée, score de confiance, bouton override. Démo live ci-dessous."
    tone="primary"
  >
    <div className="grid grid-cols-1 lg:grid-cols-[1.4fr,1fr] gap-stack-lg items-start">
      <AITransparencyDemo />

      <div className="flex flex-col gap-stack">
        <h3 className="font-display text-h4 font-semibold text-ink-900">
          4 patterns obligatoires
        </h3>
        <ul className="flex flex-col gap-stack">
          {[
            { icon: <Sparkles size={16} />, title: 'Label IA visible', sub: 'Pill teal-mist · JetBrains Mono « IA »' },
            { icon: <Quote size={16} />, title: 'Source citée', sub: 'Hover → chunk corpus TLS curé' },
            { icon: <Layers size={16} />, title: 'Score de confiance', sub: 'Bar 0-100% ou descripteur · sous seuil → coach' },
            { icon: <Shield size={16} />, title: 'Override accessible', sub: 'Toujours visible sur reco destinées humains' },
          ].map((p) => (
            <li key={p.title} className="flex items-start gap-stack-xs rounded-xl border border-ink-100 bg-white p-3">
              <span className="rounded-lg bg-primary-50 p-2 text-primary-700 shrink-0">
                {p.icon}
              </span>
              <div>
                <p className="text-body-sm font-semibold text-ink-900">{p.title}</p>
                <p className="text-caption text-ink-600">{p.sub}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  </SectionShell>
);

// ─────────────────────────────────────────────────────────────────────────────
// Section 6 — Cadence Pattern
// ─────────────────────────────────────────────────────────────────────────────

const CadenceSection: React.FC = () => {
  const tlsWeek = ['lun', 'mar', 'mer', 'jeu', 'ven', 'sam', 'dim'];
  const tlsActive = [true, false, true, true, false, false, false];
  const duoActive = [true, true, true, true, true, true, true];

  return (
    <SectionShell
      eyebrow="§9 Cadence Patterns"
      title="Cadence hebdomadaire respectée"
      description="2-3 sessions / semaine, 15-40 min, en pleine journée de travail. Pas de streak punitif quotidien. Pas de notification weekend. Pause-reprise first-class."
      tone="warm"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-stack-lg">
        {/* TLS cadence */}
        <Card variant="default" className="p-6 border-primary-200">
          <header className="flex items-center justify-between mb-stack">
            <div>
              <p className="font-mono text-eyebrow font-bold tracking-[0.08em] uppercase text-primary-700">
                TLS · Adult learner
              </p>
              <h3 className="font-display text-h4 font-semibold text-ink-900 mt-1">
                Streak hebdomadaire, weekend silencieux
              </h3>
            </div>
            <Heart size={20} className="text-primary-500" />
          </header>
          <div className="grid grid-cols-7 gap-tight.5 mb-stack">
            {tlsWeek.map((d, i) => (
              <div key={d} className="flex flex-col items-center gap-tight">
                <div
                  className={`size-9 rounded-xl flex items-center justify-center text-caption font-semibold ${
                    tlsActive[i]
                      ? 'bg-primary-500 text-white'
                      : i >= 5
                      ? 'bg-ink-50 text-ink-400'
                      : 'bg-primary-50 text-primary-300'
                  }`}
                >
                  {tlsActive[i] ? <Check size={14} /> : ''}
                </div>
                <span className={`text-[0.6875rem] font-semibold uppercase ${i >= 5 ? 'text-ink-400' : 'text-ink-600'}`}>
                  {d}
                </span>
              </div>
            ))}
          </div>
          <ul className="text-body-sm text-ink-700 flex flex-col gap-stack-xs">
            <li className="flex items-start gap-stack-xs"><Check size={14} className="text-primary-600 mt-0.5 shrink-0" /> 2-3 sessions/semaine — 1-2 jours off OK</li>
            <li className="flex items-start gap-stack-xs"><Check size={14} className="text-primary-600 mt-0.5 shrink-0" /> Weekend silencieux par défaut</li>
            <li className="flex items-start gap-stack-xs"><Check size={14} className="text-primary-600 mt-0.5 shrink-0" /> Atrophie 90j signalée calmement</li>
          </ul>
        </Card>

        {/* Duolingo anti-pattern */}
        <Card variant="default" className="p-6 border-danger-base/30 bg-danger-bg/40">
          <header className="flex items-center justify-between mb-stack">
            <div>
              <p className="font-mono text-eyebrow font-bold tracking-[0.08em] uppercase text-danger-fg">
                Anti-pattern · B2C
              </p>
              <h3 className="font-display text-h4 font-semibold text-ink-900 mt-1">
                Streak punitif quotidien
              </h3>
            </div>
            <X size={20} className="text-danger-fg" />
          </header>
          <div className="grid grid-cols-7 gap-tight.5 mb-stack">
            {tlsWeek.map((d, i) => (
              <div key={d} className="flex flex-col items-center gap-tight">
                <div className="size-9 rounded-xl flex items-center justify-center text-caption font-bold bg-danger-base text-white">
                  {duoActive[i] ? '🔥' : ''}
                </div>
                <span className="text-[0.6875rem] font-semibold uppercase text-ink-600">{d}</span>
              </div>
            ))}
          </div>
          <ul className="text-body-sm text-ink-700 flex flex-col gap-stack-xs">
            <li className="flex items-start gap-stack-xs"><X size={14} className="text-danger-fg mt-0.5 shrink-0" /> Daily streak obligatoire — anxiété de perte</li>
            <li className="flex items-start gap-stack-xs"><X size={14} className="text-danger-fg mt-0.5 shrink-0" /> Push dimanche 22h « Ton streak en danger »</li>
            <li className="flex items-start gap-stack-xs"><X size={14} className="text-danger-fg mt-0.5 shrink-0" /> Mascotte qui pleure si tu skip</li>
          </ul>
        </Card>
      </div>
    </SectionShell>
  );
};

// ─────────────────────────────────────────────────────────────────────────────
// Section 7 — Hero Pattern Selector
// ─────────────────────────────────────────────────────────────────────────────

const HERO_PATTERNS = [
  { surface: 'Marketing public', pattern: 'Immersive hero', detail: 'MeshGradient + parallax + GradientText', tone: 'primary' as const },
  { surface: 'Dashboard apprenant', pattern: 'Pas de hero', detail: 'Compact context bar + action card', tone: 'neutral' as const },
  { surface: 'Detail content', pattern: 'EditorialHero', detail: 'Long-form earns a hero', tone: 'warm' as const },
  { surface: 'Lesson player', pattern: 'LessonHeader', detail: 'Progress + breadcrumb + reprise', tone: 'primary' as const },
  { surface: 'Settings / utility', pattern: 'PageHeader simple', detail: 'No theatricality', tone: 'neutral' as const },
  { surface: 'Strategic dashboard', pattern: 'StrategicHeader', detail: 'KPI bar + filter row', tone: 'neutral' as const },
  { surface: 'Auth', pattern: 'AuthShell', detail: 'Split-screen signature', tone: 'primary' as const },
  { surface: 'Error / Empty', pattern: 'Inline message', detail: 'Don\'t ceremonialize a fallback', tone: 'neutral' as const },
];

const HeroSelectorSection: React.FC = () => (
  <SectionShell
    eyebrow="§5 Hero Patterns"
    title="EditorialHero n'est pas le default"
    description="Utiliser EditorialHero sur chaque page aplatit la hiérarchie — le hero devient wallpaper, pas signal. Le bon hero dépend de la surface."
    tone="neutral"
  >
    <div className="rounded-2xl border border-ink-200 overflow-hidden bg-white">
      <table className="w-full">
        <thead>
          <tr className="bg-surface-cool border-b border-ink-200">
            <th className="text-left px-4 py-3 font-mono text-eyebrow font-bold tracking-[0.08em] uppercase text-ink-600">Surface</th>
            <th className="text-left px-4 py-3 font-mono text-eyebrow font-bold tracking-[0.08em] uppercase text-ink-600">Pattern recommandé</th>
            <th className="text-left px-4 py-3 font-mono text-eyebrow font-bold tracking-[0.08em] uppercase text-ink-600 hidden md:table-cell">Détail</th>
          </tr>
        </thead>
        <tbody>
          {HERO_PATTERNS.map((row, i) => (
            <tr key={row.surface} className={`border-b border-ink-100 last:border-b-0 ${i % 2 === 0 ? 'bg-white' : 'bg-surface-cool/40'}`}>
              <td className="px-4 py-3 text-body-sm font-semibold text-ink-900">{row.surface}</td>
              <td className="px-4 py-3 text-body-sm text-ink-800">
                <Badge variant={row.pattern === 'EditorialHero' ? 'warm' : row.pattern === 'Pas de hero' ? 'neutral' : 'brand'}>
                  {row.pattern}
                </Badge>
              </td>
              <td className="px-4 py-3 text-caption text-ink-600 hidden md:table-cell">{row.detail}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </SectionShell>
);

// ─────────────────────────────────────────────────────────────────────────────
// Section 8 — Design Principles
// ─────────────────────────────────────────────────────────────────────────────

const PRINCIPLES = [
  { icon: <Target size={20} />, title: 'L\'apprenant est protagoniste', sub: 'Chaque écran répond à « quelle est mon action ? » en moins de 3 sec.', tone: 'primary' },
  { icon: <Brain size={20} />, title: 'L\'IA est instrument transparent', sub: 'Label, source, confiance, override. Jamais magic copilot.', tone: 'primary' },
  { icon: <Layers size={20} />, title: 'Une altitude par viewport', sub: 'Strategic OU operational. Jamais cocktail. Jamais cockpit-en-haut.', tone: 'neutral' },
  { icon: <Award size={20} />, title: 'Pratique validée > complétion', sub: 'JAC, FAST, EDRA, projet. Pas le %.', tone: 'sun' },
  { icon: <Calendar size={20} />, title: 'Cadence hebdomadaire respectée', sub: 'Pas de streak quotidien. Weekend silencieux. Pause-reprise first.', tone: 'warm' },
  { icon: <Heart size={20} />, title: 'Warmth as moat', sub: 'Warm + rigoureux. Le warmth est le positionnement, pas la déco.', tone: 'warm' },
];

const PrinciplesSection: React.FC = () => (
  <SectionShell
    eyebrow="PRODUCT.md · Design Principles"
    title="6 principes non-négociables"
    description="Le squelette doctrinal qui tranche tous les arbitrages design. Si une feature contredit l'un des six, elle ne part pas en V1."
    tone="primary"
  >
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-stack">
      {PRINCIPLES.map((p, i) => {
        const toneColors = {
          primary: { bg: 'bg-primary-50', text: 'text-primary-700', border: 'border-primary-200' },
          warm: { bg: 'bg-secondary-50', text: 'text-secondary-600', border: 'border-secondary-200' },
          sun: { bg: 'bg-accent-50', text: 'text-accent-500', border: 'border-accent-200' },
          neutral: { bg: 'bg-ink-50', text: 'text-ink-700', border: 'border-ink-200' },
        }[p.tone as 'primary' | 'warm' | 'sun' | 'neutral'];

        return (
          <article key={p.title} className={`rounded-2xl border bg-white p-5 flex flex-col gap-stack-xs ${toneColors.border}`}>
            <div className="flex items-center justify-between">
              <span className={`inline-flex items-center justify-center size-9 rounded-xl ${toneColors.bg} ${toneColors.text}`}>
                {p.icon}
              </span>
              <span className="font-mono text-eyebrow font-bold tracking-[0.08em] text-ink-400">
                {String(i + 1).padStart(2, '0')}
              </span>
            </div>
            <h3 className="font-display text-title font-semibold text-ink-900">{p.title}</h3>
            <p className="text-body-sm text-ink-600">{p.sub}</p>
          </article>
        );
      })}
    </div>
  </SectionShell>
);

// ─────────────────────────────────────────────────────────────────────────────
// Section 9 — 4 Protagonist Roles
// ─────────────────────────────────────────────────────────────────────────────

const ROLES = [
  { icon: <GraduationCap size={22} />, title: 'Apprenant', mastery: 'Maîtrise de ses compétences', surface: 'Dashboard, Passeport, lesson player, journal', tone: 'primary' as const, voice: 'tu' },
  { icon: <MessageSquare size={22} />, title: 'Coach', mastery: 'Maîtrise de l\'accompagnement', surface: 'Coach hub, queue corrections, calendrier 1-1', tone: 'warm' as const, voice: 'vous' },
  { icon: <Users size={22} />, title: 'Manager / Team Lead', mastery: 'Maîtrise du portfolio d\'équipe', surface: 'Manager dashboard, validation crédits, alertes', tone: 'neutral' as const, voice: 'vous' },
  { icon: <Crown size={22} />, title: 'CLO / DRH', mastery: 'Maîtrise stratégique des capabilités org', surface: 'Enterprise dashboard, analytics, heatmap org', tone: 'neutral' as const, voice: 'vous' },
];

const RolesSection: React.FC = () => (
  <SectionShell
    eyebrow="PRODUCT.md · North Star"
    title="4 protagonistes, 4 UI"
    description="Augmented Mastery se décline en 4 maîtrises selon le rôle. Chaque rôle a sa surface dominante. Aucun écran ne sert deux rôles à la fois."
    tone="primary"
  >
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-stack">
      {ROLES.map((r) => {
        const toneColors = {
          primary: { bg: 'bg-primary-50', text: 'text-primary-700', accent: 'border-primary-200' },
          warm: { bg: 'bg-secondary-50', text: 'text-secondary-600', accent: 'border-secondary-200' },
          neutral: { bg: 'bg-ink-50', text: 'text-ink-700', accent: 'border-ink-200' },
        }[r.tone];

        return (
          <article key={r.title} className={`rounded-2xl border bg-white p-5 flex flex-col gap-stack-xs ${toneColors.accent}`}>
            <div className="flex items-center justify-between">
              <span className={`inline-flex size-10 items-center justify-center rounded-xl ${toneColors.bg} ${toneColors.text}`}>
                {r.icon}
              </span>
              <Badge variant={r.voice === 'tu' ? 'brand' : 'neutral'}>{r.voice}</Badge>
            </div>
            <h3 className="font-display text-title font-semibold text-ink-900">{r.title}</h3>
            <p className={`text-caption font-semibold ${toneColors.text}`}>{r.mastery}</p>
            <p className="text-caption text-ink-500 leading-relaxed mt-stack-xs">{r.surface}</p>
          </article>
        );
      })}
    </div>
  </SectionShell>
);

// ─────────────────────────────────────────────────────────────────────────────
// Page entry
// ─────────────────────────────────────────────────────────────────────────────

const DesignShowcase: React.FC = () => {
  return (
    <div className="bg-white min-h-[100dvh]">
      <ShowcaseHero />
      <AuditStatusSection />
      <VisualVocabularySection />
      <PerToneMappingSection />
      <PerAltitudeSection />
      <PracticeGrammarSection />
      <AITransparencySection />
      <CadenceSection />
      <HeroSelectorSection />
      <PrinciplesSection />
      <RolesSection />

      {/* Footer */}
      <footer className="max-w-6xl mx-auto px-6 py-page border-t border-ink-100 mt-section-lg">
        <div className="flex flex-wrap items-center justify-between gap-stack">
          <div className="flex items-center gap-stack-xs">
            <TlsLogo size={32} variant="primary" />
            <div>
              <p className="text-body-sm font-semibold text-ink-900">The Learning Society</p>
              <p className="text-caption text-ink-500">Design Showcase · à valider</p>
            </div>
          </div>
          <div className="flex items-center gap-stack-xs text-caption text-ink-500">
            <Compass size={14} />
            <span>
              Source · <code className="font-mono text-[0.75rem] text-primary-700">PRODUCT.md</code> +{' '}
              <code className="font-mono text-[0.75rem] text-primary-700">DESIGN-IMPECCABLE.md</code>
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default DesignShowcase;
