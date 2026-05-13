import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  UserRound,
  Target,
  Clock,
  CheckCircle2,
  Sparkles,
  ChevronLeft,
  ChevronRight,
  Brain,
  Briefcase,
  GraduationCap,
  Users,
  Zap,
  BookOpen,
  Award,
  Code2,
  HeartHandshake,
  TrendingUp,
  Building2,
  Stethoscope,
  Wallet,
} from 'lucide-react';
import { Card, Button, Badge, Stepper, Input } from '../components';
import { EditorialHero } from '../components/patterns/EditorialHero';

/* ─── Types ──────────────────────────────────────────────────────────────── */

interface OnboardingAnswers {
  firstName: string;
  role:      string;
  sector:    string;
  goals:     string[];
  rhythm:    string;
}

/* ─── Constants ──────────────────────────────────────────────────────────── */

const STEP_LABELS = ['Profil', 'Objectifs', 'Rythme', 'Confirmation'];

const GOAL_OPTIONS = ['Leadership', 'Communication', 'IA & Tech', 'Gestion de projet', 'Coaching', 'Productivité'];

const RHYTHM_OPTIONS = [
  { id: '15min', label: '15 min / jour', description: 'Micro-apprentissage quotidien' },
  { id: '30min', label: '30 min / jour', description: 'Progression régulière' },
  { id: '1h',    label: '1h / jour',     description: 'Immersion intensive' },
  { id: 'flex',  label: 'Flexible',      description: "À mon rythme, sans contrainte" },
];

const ROLE_OPTIONS: Array<{ id: string; label: string; Icon: React.ComponentType<{ size?: number }> }> = [
  { id: 'Manager',    label: 'Manager',    Icon: Briefcase },
  { id: 'Formateur',  label: 'Formateur',  Icon: GraduationCap },
  { id: 'Coach',      label: 'Coach',      Icon: HeartHandshake },
  { id: 'Apprenant',  label: 'Apprenant',  Icon: BookOpen },
  { id: 'Consultant', label: 'Consultant', Icon: Zap },
  { id: 'Autre',      label: 'Autre',      Icon: UserRound },
];

const SECTOR_OPTIONS: Array<{ id: string; label: string; Icon: React.ComponentType<{ size?: number }> }> = [
  { id: 'Tech',       label: 'Tech',       Icon: Code2 },
  { id: 'RH',         label: 'RH',         Icon: Users },
  { id: 'Formation',  label: 'Formation',  Icon: GraduationCap },
  { id: 'Santé',      label: 'Santé',      Icon: Stethoscope },
  { id: 'Finance',    label: 'Finance',    Icon: Wallet },
  { id: 'Autre',      label: 'Autre',      Icon: Building2 },
];

const GOAL_ICONS: Record<string, React.ComponentType<{ size?: number }>> = {
  'Leadership':        TrendingUp,
  'Communication':     Users,
  'IA & Tech':         Brain,
  'Gestion de projet': Target,
  'Coaching':          HeartHandshake,
  'Productivité':      Zap,
};

function buildStepperItems(currentStep: number) {
  return STEP_LABELS.map((label, i) => ({
    label,
    state: i < currentStep ? 'done' : i === currentStep ? 'current' : 'upcoming',
  })) as { label: string; state: 'done' | 'current' | 'upcoming' }[];
}

/* ─── Step 0 — Profil ────────────────────────────────────────────────────── */

function StepProfil({
  answers,
  onChange,
}: {
  answers: OnboardingAnswers;
  onChange: (patch: Partial<OnboardingAnswers>) => void;
}) {
  return (
    <div className="flex flex-col gap-stack-lg">
      <div className="w-14 h-14 rounded-xl flex items-center justify-center bg-primary-50 text-primary-600">
        <UserRound size={28} />
      </div>
      <h2 className="font-display text-h2 font-extrabold text-ink-900 m-0 leading-tight">
        Dites-nous qui vous êtes
      </h2>
      <p className="font-body text-body text-ink-500 m-0 leading-relaxed">
        Ces informations nous permettent de personnaliser vos recommandations.
      </p>

      {/* Prénom */}
      <Input
        id="firstName"
        label="Votre prénom"
        required
        type="text"
        placeholder="Ex : Sophie"
        value={answers.firstName}
        onChange={e => onChange({ firstName: e.target.value })}
      />

      {/* Rôle — grille cards */}
      <fieldset className="flex flex-col gap-stack m-0 p-0 border-0">
        <legend className="font-body text-body-sm font-semibold text-ink-900 mb-stack-xs">
          Votre rôle <span className="text-danger-fg">*</span>
        </legend>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
          {ROLE_OPTIONS.map(({ id, label, Icon }) => {
            const selected = answers.role === id;
            return (
              <button
                key={id}
                type="button"
                onClick={() => onChange({ role: id })}
                aria-pressed={selected}
                className={[
                  'flex flex-col items-center justify-center gap-2 px-3 py-4 rounded-xl border-[1.5px] text-center cursor-pointer transition-all duration-base',
                  selected
                    ? 'bg-primary-50 border-primary-500 shadow-sm'
                    : 'bg-white border-ink-200 hover:border-primary-300 hover:bg-primary-50/40',
                ].join(' ')}
              >
                <span
                  className={[
                    'inline-flex items-center justify-center w-10 h-10 rounded-xl transition-colors duration-base',
                    selected ? 'bg-primary-500 text-white' : 'bg-ink-100 text-ink-600',
                  ].join(' ')}
                >
                  <Icon size={18} />
                </span>
                <span
                  className={[
                    'font-body text-caption font-semibold leading-tight',
                    selected ? 'text-primary-700' : 'text-ink-900',
                  ].join(' ')}
                >
                  {label}
                </span>
              </button>
            );
          })}
        </div>
      </fieldset>

      {/* Secteur — grille cards */}
      <fieldset className="flex flex-col gap-stack m-0 p-0 border-0">
        <legend className="font-body text-body-sm font-semibold text-ink-900 mb-stack-xs">
          Votre secteur <span className="text-danger-fg">*</span>
        </legend>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
          {SECTOR_OPTIONS.map(({ id, label, Icon }) => {
            const selected = answers.sector === id;
            return (
              <button
                key={id}
                type="button"
                onClick={() => onChange({ sector: id })}
                aria-pressed={selected}
                className={[
                  'flex flex-col items-center justify-center gap-2 px-3 py-4 rounded-xl border-[1.5px] text-center cursor-pointer transition-all duration-base',
                  selected
                    ? 'bg-secondary-50 border-secondary-500 shadow-sm'
                    : 'bg-white border-ink-200 hover:border-secondary-300 hover:bg-secondary-50/40',
                ].join(' ')}
              >
                <span
                  className={[
                    'inline-flex items-center justify-center w-10 h-10 rounded-xl transition-colors duration-base',
                    selected ? 'bg-secondary-500 text-white' : 'bg-ink-100 text-ink-600',
                  ].join(' ')}
                >
                  <Icon size={18} />
                </span>
                <span
                  className={[
                    'font-body text-caption font-semibold leading-tight',
                    selected ? 'text-secondary-700' : 'text-ink-900',
                  ].join(' ')}
                >
                  {label}
                </span>
              </button>
            );
          })}
        </div>
      </fieldset>

    </div>
  );
}

/* ─── Step 1 — Objectifs ─────────────────────────────────────────────────── */

function StepObjectifs({
  answers,
  onChange,
}: {
  answers: OnboardingAnswers;
  onChange: (patch: Partial<OnboardingAnswers>) => void;
}) {
  function toggle(goal: string) {
    const next = answers.goals.includes(goal)
      ? answers.goals.filter(g => g !== goal)
      : [...answers.goals, goal];
    onChange({ goals: next });
  }

  return (
    <div className="flex flex-col gap-stack-lg">
      <div className="w-14 h-14 rounded-xl flex items-center justify-center bg-secondary-50 text-secondary-600">
        <Target size={28} />
      </div>
      <h2 className="font-display text-h2 font-extrabold text-ink-900 m-0 leading-tight">
        Vos objectifs d'apprentissage
      </h2>
      <p className="font-body text-body text-ink-500 m-0 leading-relaxed">
        Sélectionnez tout ce qui vous correspond — plusieurs choix possibles.
      </p>
      <div className="flex flex-wrap gap-2.5">
        {GOAL_OPTIONS.map(goal => {
          const selected = answers.goals.includes(goal);
          const Icon = GOAL_ICONS[goal] ?? Sparkles;
          return (
            <button
              key={goal}
              type="button"
              onClick={() => toggle(goal)}
              aria-pressed={selected}
              className={[
                'inline-flex items-center gap-1.5 px-4 py-2 rounded-pill border-[1.5px] font-body text-body-sm font-semibold cursor-pointer transition-all duration-base',
                selected
                  ? 'bg-primary-500 border-primary-500 text-white hover:bg-primary-600 hover:border-primary-600'
                  : 'bg-white border-ink-200 text-ink-900 hover:border-primary-400 hover:text-primary-600 hover:bg-primary-50',
              ].join(' ')}
            >
              <Icon size={14} />
              {goal}
            </button>
          );
        })}
      </div>
      {answers.goals.length > 0 && (
        <p className="font-body text-caption text-primary-600 font-semibold m-0">
          {answers.goals.length} objectif{answers.goals.length > 1 ? 's' : ''} sélectionné{answers.goals.length > 1 ? 's' : ''}
        </p>
      )}
    </div>
  );
}

/* ─── Step 2 — Rythme ────────────────────────────────────────────────────── */

function StepRythme({
  answers,
  onChange,
}: {
  answers: OnboardingAnswers;
  onChange: (patch: Partial<OnboardingAnswers>) => void;
}) {
  return (
    <div className="flex flex-col gap-stack-lg">
      <div className="w-14 h-14 rounded-xl flex items-center justify-center bg-primary-50 text-primary-700">
        <Clock size={28} />
      </div>
      <h2 className="font-display text-h2 font-extrabold text-ink-900 m-0 leading-tight">
        Votre rythme d'apprentissage
      </h2>
      <p className="font-body text-body text-ink-500 m-0 leading-relaxed">
        Combien de temps souhaitez-vous consacrer à votre développement ?
      </p>
      <div className="grid grid-cols-2 gap-3">
        {RHYTHM_OPTIONS.map(opt => {
          const selected = answers.rhythm === opt.id;
          return (
            <button
              key={opt.id}
              type="button"
              onClick={() => onChange({ rhythm: opt.id })}
              aria-pressed={selected}
              className={[
                'flex flex-col gap-1 px-5 py-4 rounded-xl border-[1.5px] text-left cursor-pointer transition-all duration-200',
                selected
                  ? 'border-primary-500 bg-primary-50'
                  : 'border-ink-200 bg-white hover:border-primary-300 hover:bg-primary-50',
              ].join(' ')}
            >
              <span className={['font-body text-body font-bold', selected ? 'text-primary-700' : 'text-ink-900'].join(' ')}>
                {opt.label}
              </span>
              <span className="font-body text-caption text-ink-500">{opt.description}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

/* ─── Step 3 — Confirmation ──────────────────────────────────────────────── */

function StepConfirmation({
  answers,
}: {
  answers: OnboardingAnswers;
  onStart: () => void;
}) {
  const rhythmLabel = RHYTHM_OPTIONS.find(r => r.id === answers.rhythm)?.label ?? '—';

  const summaryRows = [
    { key: 'Rôle',      val: answers.role   || '—' },
    { key: 'Secteur',   val: answers.sector || '—' },
    { key: 'Objectifs', val: answers.goals.length > 0 ? answers.goals.join(', ') : '—' },
    { key: 'Rythme',    val: rhythmLabel },
  ];

  const aiText = answers.goals.includes('Leadership') || answers.goals.includes('Coaching')
    ? "Leadership & Impact — Développez vos compétences de pilotage et d'influence"
    : answers.goals.includes('IA & Tech')
    ? "Tech & Innovation — Maîtrisez les outils IA pour gagner en productivité"
    : "Développement professionnel personnalisé — basé sur vos objectifs déclarés";

  const previewTags = answers.goals.length > 0 ? answers.goals.slice(0, 3) : ['Compétences clés'];

  return (
    <div className="flex flex-col gap-stack-lg">
      <div className="w-14 h-14 rounded-xl flex items-center justify-center bg-success-bg text-success-fg">
        <CheckCircle2 size={28} />
      </div>
      <h2 className="font-display text-h2 font-extrabold text-ink-900 m-0 leading-tight">
        {answers.firstName ? `Parfait, ${answers.firstName} !` : 'Votre profil est prêt !'}
      </h2>
      <p className="font-body text-body text-ink-500 m-0 leading-relaxed">
        Voici un résumé de vos préférences et votre parcours suggéré.
      </p>

      {/* Summary table */}
      <div className="rounded-xl border border-ink-200 bg-ink-50 overflow-hidden">
        {summaryRows.map((row) => (
          <div key={row.key} className="flex justify-between items-start gap-4 px-5 py-3 border-b border-ink-200 last:border-b-0">
            <span className="font-body text-body-sm font-bold text-ink-500 whitespace-nowrap">{row.key}</span>
            <span className="font-body text-body-sm text-ink-900 text-right">{row.val}</span>
          </div>
        ))}
      </div>

      {/* AI suggestion card */}
      <Card className="mt-2 p-5 border border-primary-200 flex flex-col gap-3 bg-gradient-to-br from-primary-50 to-white">
        <div className="flex items-start gap-3">
          <Brain size={20} className="text-primary-600 shrink-0 mt-0.5" />
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-2">
              <span className="font-body text-body font-bold text-ink-900">Parcours recommandé</span>
              <Badge variant="brand">IA</Badge>
            </div>
            <p className="font-body text-body-sm text-ink-500 leading-relaxed m-0">{aiText}</p>
          </div>
        </div>
        <div className="flex flex-wrap gap-2">
          {previewTags.map(g => (
            <span key={g} className="inline-flex px-3 py-1 rounded-pill bg-primary-100 text-primary-700 font-body text-caption font-bold">
              {g}
            </span>
          ))}
        </div>
      </Card>
    </div>
  );
}

/* ─── Main Page ──────────────────────────────────────────────────────────── */

export const Onboarding: React.FC = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<OnboardingAnswers>({
    firstName: '',
    role:      '',
    sector:    '',
    goals:     [],
    rhythm:    '',
  });

  function patch(updates: Partial<OnboardingAnswers>) {
    setAnswers(prev => ({ ...prev, ...updates }));
  }

  function prev() { setStep(s => Math.max(0, s - 1)); }
  function next() { setStep(s => Math.min(3, s + 1)); }

  const isLast = step === 3;

  const stepComponents = [
    <StepProfil       key={0} answers={answers} onChange={patch} />,
    <StepObjectifs    key={1} answers={answers} onChange={patch} />,
    <StepRythme       key={2} answers={answers} onChange={patch} />,
    <StepConfirmation key={3} answers={answers} onStart={() => navigate('/onboarding/payment')} />,
  ];

  return (
    <main className="min-h-screen bg-surface">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-10 py-section flex flex-col gap-section">

        {/* ── Hero éditorial DS ───────────────────────────────── */}
        <EditorialHero
          tone="default"
          eyebrow={{ icon: <Sparkles size={12} />, label: 'Démarrage personnalisé' }}
          title="Personnalisons votre expérience"
          summary="4 étapes pour démarrer avec des recommandations adaptées à vos objectifs."
          trailing={<Stepper items={buildStepperItems(step)} orientation="horizontal" />}
        />

        {/* ── Step card ──────────────────────────────────────────── */}
        <div className="rounded-2xl bg-white border border-ink-200 overflow-hidden">

          {/* Step content — Tailwind fade-in via key change */}
          <div className="p-6 sm:p-8 animate-in fade-in slide-in-from-right-2 duration-300" key={step}>
            {stepComponents[step]}
          </div>

          {/* Footer nav */}
          <div className="flex justify-between items-center px-6 sm:px-8 py-5 border-t border-ink-100 bg-ink-50">
            {step === 0 ? (
              <Button variant="link" size="sm" onClick={() => navigate('/dashboard')}>
                Passer pour l'instant
              </Button>
            ) : (
              <Button variant="secondary" size="sm" leadingIcon={<ChevronLeft size={14} />} onClick={prev}>
                Retour
              </Button>
            )}

            <div className="flex items-center gap-3">
              <span className="font-body text-caption text-ink-500 tabular-nums">
                Étape {step + 1} / {STEP_LABELS.length}
              </span>
              {isLast ? (
                <Button variant="primary" trailingIcon={<ChevronRight size={14} />} onClick={() => navigate('/onboarding/payment')}>
                  Choisir ma formule
                </Button>
              ) : (
                <Button variant="primary" trailingIcon={<ChevronRight size={14} />} onClick={next}>
                  Continuer
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};
