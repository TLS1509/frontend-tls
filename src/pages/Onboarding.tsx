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
  Code2,
  HeartHandshake,
  TrendingUp,
  Building2,
  Stethoscope,
  Wallet,
  ShieldCheck,
} from 'lucide-react';
import { Card, Button, Badge, Stepper, Input } from '../components';
import { EditorialHero } from '../components/patterns/EditorialHero';
import { OptionGrid } from '../components/patterns/OptionGrid';
import type { OptionGridItem } from '../components/patterns/OptionGrid';
import { buildOnboardingStepperItems } from '../lib/onboarding-steps';
import { useUserProfileStore } from '../stores/persistence';
import type { UserRole } from '../types/learning';
import { MOCK_USER_ID } from '../data/passeport';

/* ─── Types ──────────────────────────────────────────────────────────────── */

interface OnboardingAnswers {
  firstName: string;
  role:      UserRole | '';
  sector:    string;
  goals:     string[];
  rhythm:    string;
}

/* ─── Constants ──────────────────────────────────────────────────────────── */

const SUBSTEP_LABELS = ['Profil', 'Objectifs', 'Rythme', 'Confirmation'];

/** 5 rôles canoniques Cahier #03 */
const ROLE_OPTIONS: OptionGridItem[] = [
  { id: 'apprenant', label: 'Apprenant',  icon: BookOpen },
  { id: 'manager',   label: 'Manager',    icon: Briefcase },
  { id: 'coach',     label: 'Coach',      icon: HeartHandshake },
  { id: 'expert',    label: 'Expert',     icon: GraduationCap },
  { id: 'admin',     label: 'Admin',      icon: ShieldCheck },
];

const SECTOR_OPTIONS: OptionGridItem[] = [
  { id: 'Tech',       label: 'Tech',       icon: Code2 },
  { id: 'RH',         label: 'RH',         icon: Users },
  { id: 'Formation',  label: 'Formation',  icon: GraduationCap },
  { id: 'Santé',      label: 'Santé',      icon: Stethoscope },
  { id: 'Finance',    label: 'Finance',    icon: Wallet },
  { id: 'Autre',      label: 'Autre',      icon: Building2 },
];

const GOAL_OPTIONS: OptionGridItem[] = [
  { id: 'Leadership',        label: 'Leadership',        icon: TrendingUp },
  { id: 'Communication',     label: 'Communication',     icon: Users },
  { id: 'IA & Tech',         label: 'IA & Tech',         icon: Brain },
  { id: 'Gestion de projet', label: 'Gestion de projet', icon: Target },
  { id: 'Coaching',          label: 'Coaching',          icon: HeartHandshake },
  { id: 'Productivité',      label: 'Productivité',      icon: Zap },
];

const RHYTHM_OPTIONS: OptionGridItem[] = [
  { id: '15min', label: '15 min / jour', description: 'Micro-apprentissage quotidien' },
  { id: '30min', label: '30 min / jour', description: 'Progression régulière' },
  { id: '1h',    label: '1h / jour',     description: 'Immersion intensive' },
  { id: 'flex',  label: 'Flexible',      description: "À mon rythme, sans contrainte" },
];

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
      <div className="w-14 h-14 rounded-xl flex items-center justify-center bg-secondary-50 text-secondary-600">
        <UserRound size={28} />
      </div>
      <div className="flex flex-col gap-tight">
        <h2 className="font-display text-h2 font-extrabold text-ink-900 m-0 leading-tight">
          Dis-nous qui tu es
        </h2>
        <p className="font-body text-body text-ink-500 m-0 leading-relaxed">
          Ces informations nous permettent de personnaliser tes recommandations.
        </p>
      </div>

      <Input
        id="firstName"
        label="Ton prénom"
        required
        type="text"
        placeholder="Ex : Sophie"
        value={answers.firstName}
        onChange={e => onChange({ firstName: e.target.value })}
      />

      <fieldset className="flex flex-col gap-stack m-0 p-0 border-0">
        <legend className="font-body text-body-sm font-semibold text-ink-900 mb-stack-xs">
          Ton rôle <span className="text-danger-fg">*</span>
        </legend>
        <OptionGrid
          tone="warm"
          value={answers.role}
          onChange={(id) => onChange({ role: id })}
          options={ROLE_OPTIONS}
          columns={3}
        />
      </fieldset>

      <fieldset className="flex flex-col gap-stack m-0 p-0 border-0">
        <legend className="font-body text-body-sm font-semibold text-ink-900 mb-stack-xs">
          Ton secteur <span className="text-danger-fg">*</span>
        </legend>
        <OptionGrid
          tone="warm"
          value={answers.sector}
          onChange={(id) => onChange({ sector: id })}
          options={SECTOR_OPTIONS}
          columns={3}
        />
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
      <div className="flex flex-col gap-tight">
        <h2 className="font-display text-h2 font-extrabold text-ink-900 m-0 leading-tight">
          Tes objectifs d'apprentissage
        </h2>
        <p className="font-body text-body text-ink-500 m-0 leading-relaxed">
          Sélectionne tout ce qui te correspond — plusieurs choix possibles.
        </p>
      </div>

      <OptionGrid
        multi
        tone="warm"
        value={answers.goals}
        onChange={toggle}
        options={GOAL_OPTIONS}
        columns={3}
      />

      {answers.goals.length > 0 && (
        <p className="font-body text-caption text-secondary-700 font-semibold m-0">
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
      <div className="w-14 h-14 rounded-xl flex items-center justify-center bg-secondary-50 text-secondary-600">
        <Clock size={28} />
      </div>
      <div className="flex flex-col gap-tight">
        <h2 className="font-display text-h2 font-extrabold text-ink-900 m-0 leading-tight">
          Ton rythme d'apprentissage
        </h2>
        <p className="font-body text-body text-ink-500 m-0 leading-relaxed">
          Combien de temps souhaites-tu consacrer à ton développement ?
        </p>
      </div>

      <OptionGrid
        tone="warm"
        value={answers.rhythm}
        onChange={(id) => onChange({ rhythm: id })}
        options={RHYTHM_OPTIONS}
        columns={2}
        layout="text-only"
      />
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
    ? "Leadership & Impact — Développe tes compétences de pilotage et d'influence"
    : answers.goals.includes('IA & Tech')
    ? "Tech & Innovation — Maîtrise les outils IA pour gagner en productivité"
    : "Développement professionnel personnalisé — basé sur tes objectifs déclarés";

  const previewTags = answers.goals.length > 0 ? answers.goals.slice(0, 3) : ['Compétences clés'];

  return (
    <div className="flex flex-col gap-stack-lg">
      <div className="w-14 h-14 rounded-xl flex items-center justify-center bg-success-bg text-success-fg">
        <CheckCircle2 size={28} />
      </div>
      <div className="flex flex-col gap-tight">
        <h2 className="font-display text-h2 font-extrabold text-ink-900 m-0 leading-tight">
          {answers.firstName ? `Parfait, ${answers.firstName} !` : 'Ton profil est prêt !'}
        </h2>
        <p className="font-body text-body text-ink-500 m-0 leading-relaxed">
          Voici un résumé de tes préférences et ton parcours suggéré.
        </p>
      </div>

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
      <Card className="mt-2 p-5 border border-secondary-200 flex flex-col gap-3 bg-gradient-to-br from-secondary-50 to-white">
        <div className="flex items-start gap-3">
          <Brain size={20} className="text-secondary-600 shrink-0 mt-0.5" />
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-2">
              <span className="font-body text-body font-bold text-ink-900">Parcours recommandé</span>
              <Badge variant="warm">IA</Badge>
            </div>
            <p className="font-body text-body-sm text-ink-500 leading-relaxed m-0">{aiText}</p>
          </div>
        </div>
        <div className="flex flex-wrap gap-2">
          {previewTags.map(g => (
            <span key={g} className="inline-flex px-3 py-1 rounded-pill bg-secondary-100 text-secondary-700 font-body text-caption font-bold">
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
  const profileStore = useUserProfileStore();
  const [substep, setSubstep] = useState(0);
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

  function prev() { setSubstep(s => Math.max(0, s - 1)); }
  function next() { setSubstep(s => Math.min(3, s + 1)); }

  function handleComplete() {
    profileStore.set({
      userId: MOCK_USER_ID,
      firstName: answers.firstName,
      role: (answers.role || 'apprenant') as UserRole,
      sector: answers.sector,
      goals: answers.goals,
      rhythm: answers.rhythm,
      credits: { classic: 0, special: 0 },
      completedAt: new Date().toISOString(),
    });
    navigate('/onboarding/questionnaire');
  }

  const isLast = substep === 3;

  const stepComponents = [
    <StepProfil       key={0} answers={answers} onChange={patch} />,
    <StepObjectifs    key={1} answers={answers} onChange={patch} />,
    <StepRythme       key={2} answers={answers} onChange={patch} />,
    <StepConfirmation key={3} answers={answers} onStart={handleComplete} />,
  ];

  return (
    <main className="min-h-screen bg-surface">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-10 pt-14 md:pt-section pb-section flex flex-col gap-section">

        {/* ── Cross-screen Stepper (sticky context across the whole onboarding flow) ── */}
        <Stepper items={buildOnboardingStepperItems('profil')} orientation="horizontal" />

        {/* ── Hero éditorial DS (tone warm — accueil chaleureux) ───────────────── */}
        <EditorialHero
          tone="warm"
          eyebrow={{ icon: <Sparkles size={12} />, label: 'Démarrage personnalisé' }}
          title="Personnalisons ton expérience"
          summary={`Étape ${substep + 1} sur ${SUBSTEP_LABELS.length} · ${SUBSTEP_LABELS[substep]} — quelques questions pour adapter tes recommandations.`}
        />

        {/* ── Substep card ───────────────────────────────────────────────────── */}
        <div className="rounded-2xl bg-white border border-ink-200 overflow-hidden">

          <div className="p-6 sm:p-8 animate-in fade-in slide-in-from-right-2 duration-300" key={substep}>
            {stepComponents[substep]}
          </div>

          {/* Footer nav — responsive button layout (stacked on mobile) */}
          <div className="flex flex-col sm:flex-row justify-between items-stretch sm:items-center gap-3 px-6 sm:px-8 py-5 border-t border-ink-100 bg-ink-50">
            {substep === 0 ? (
              <Button variant="link" size="sm" onClick={() => navigate('/dashboard')} className="sm:flex-none flex-1">
                Passer pour l'instant
              </Button>
            ) : (
              <Button variant="secondary" size="sm" leadingIcon={<ChevronLeft size={14} />} onClick={prev} className="sm:flex-none flex-1">
                Retour
              </Button>
            )}

            <div className="flex items-center gap-3 flex-1 sm:flex-none justify-between sm:justify-start">
              <span className="font-body text-caption text-ink-500 tabular-nums hidden sm:inline">
                {substep + 1} / {SUBSTEP_LABELS.length}
              </span>
              {isLast ? (
                <Button variant="warm" trailingIcon={<ChevronRight size={14} />} onClick={handleComplete} className="flex-1 sm:flex-none">
                  Continuer vers le positionnement
                </Button>
              ) : (
                <Button variant="warm" trailingIcon={<ChevronRight size={14} />} onClick={next} className="flex-1 sm:flex-none">
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
