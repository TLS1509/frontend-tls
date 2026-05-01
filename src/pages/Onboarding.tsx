import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserRound, Target, Clock, CheckCircle2, Sparkles, ChevronLeft, ChevronRight, Brain } from 'lucide-react';
import { Card, Button, Badge, Stepper, Field } from '../components';

/* ============================================================================
   Types
   ============================================================================ */
interface OnboardingAnswers {
  firstName: string;
  role: string;
  sector: string;
  goals: string[];
  rhythm: string;
}

/* ============================================================================
   Constants
   ============================================================================ */
const STEP_LABELS = ['Profil', 'Objectifs', 'Rythme', 'Confirmation'];

const GOAL_OPTIONS = [
  'Leadership',
  'Communication',
  'IA & Tech',
  'Gestion de projet',
  'Coaching',
  'Productivité',
];

const RHYTHM_OPTIONS = [
  { id: '15min', label: '15 min / jour', description: 'Micro-apprentissage quotidien' },
  { id: '30min', label: '30 min / jour', description: 'Progression régulière' },
  { id: '1h',    label: '1h / jour',     description: 'Immersion intensive' },
  { id: 'flex',  label: 'Flexible',      description: "À mon rythme, sans contrainte" },
];

const ROLE_OPTIONS = ['Manager', 'Formateur', 'Coach', 'Apprenant', 'Autre'];
const SECTOR_OPTIONS = ['Tech', 'RH', 'Formation', 'Santé', 'Finance', 'Autre'];

/* ============================================================================
   Helpers
   ============================================================================ */
function buildStepperItems(currentStep: number) {
  return STEP_LABELS.map((label, i) => ({
    label,
    state:
      i < currentStep ? 'done'
      : i === currentStep ? 'current'
      : 'upcoming',
  })) as { label: string; state: 'done' | 'current' | 'upcoming' }[];
}

/* ============================================================================
   Step Components
   ============================================================================ */

/** Step 0 — Profil */
function StepProfil({
  answers,
  onChange,
}: {
  answers: OnboardingAnswers;
  onChange: (patch: Partial<OnboardingAnswers>) => void;
}) {
  return (
    <div className="onb-step">
      <div className="onb-step__icon-wrap" style={{ background: 'var(--tls-primary-50)', color: 'var(--tls-primary-600)' }}>
        <UserRound size={28} />
      </div>
      <h2 className="onb-step__title">Dites-nous qui vous êtes</h2>
      <p className="onb-step__sub">Ces informations nous permettent de personnaliser vos recommandations.</p>

      <div className="onb-fields">
        <Field id="firstName" label="Votre prénom" required>
          <input
            id="firstName"
            type="text"
            className="tls-input"
            placeholder="Ex : Sophie"
            value={answers.firstName}
            onChange={e => onChange({ firstName: e.target.value })}
          />
        </Field>

        <Field id="role" label="Votre rôle" required>
          <select
            id="role"
            className="tls-input"
            value={answers.role}
            onChange={e => onChange({ role: e.target.value })}
          >
            <option value="">Sélectionner…</option>
            {ROLE_OPTIONS.map(r => <option key={r} value={r}>{r}</option>)}
          </select>
        </Field>

        <Field id="sector" label="Votre secteur" required>
          <select
            id="sector"
            className="tls-input"
            value={answers.sector}
            onChange={e => onChange({ sector: e.target.value })}
          >
            <option value="">Sélectionner…</option>
            {SECTOR_OPTIONS.map(s => <option key={s} value={s}>{s}</option>)}
          </select>
        </Field>
      </div>
    </div>
  );
}

/** Step 1 — Objectifs */
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
    <div className="onb-step">
      <div className="onb-step__icon-wrap" style={{ background: 'rgba(237, 132, 58, 0.1)', color: 'var(--tls-orange-600)' }}>
        <Target size={28} />
      </div>
      <h2 className="onb-step__title">Vos objectifs d'apprentissage</h2>
      <p className="onb-step__sub">Sélectionnez tout ce qui vous correspond — plusieurs choix possibles.</p>

      <div className="onb-chips">
        {GOAL_OPTIONS.map(goal => {
          const selected = answers.goals.includes(goal);
          return (
            <button
              key={goal}
              type="button"
              className={['onb-chip', selected ? 'onb-chip--selected' : ''].filter(Boolean).join(' ')}
              onClick={() => toggle(goal)}
              aria-pressed={selected}
            >
              {goal}
            </button>
          );
        })}
      </div>

      {answers.goals.length > 0 && (
        <p className="onb-selection-hint">
          {answers.goals.length} objectif{answers.goals.length > 1 ? 's' : ''} sélectionné{answers.goals.length > 1 ? 's' : ''}
        </p>
      )}
    </div>
  );
}

/** Step 2 — Rythme */
function StepRythme({
  answers,
  onChange,
}: {
  answers: OnboardingAnswers;
  onChange: (patch: Partial<OnboardingAnswers>) => void;
}) {
  return (
    <div className="onb-step">
      <div className="onb-step__icon-wrap" style={{ background: 'rgba(85, 161, 180, 0.1)', color: 'var(--tls-primary-700)' }}>
        <Clock size={28} />
      </div>
      <h2 className="onb-step__title">Votre rythme d'apprentissage</h2>
      <p className="onb-step__sub">Combien de temps souhaitez-vous consacrer à votre développement ?</p>

      <div className="onb-rhythm-grid">
        {RHYTHM_OPTIONS.map(opt => {
          const selected = answers.rhythm === opt.id;
          return (
            <button
              key={opt.id}
              type="button"
              className={['onb-rhythm-card', selected ? 'onb-rhythm-card--selected' : ''].filter(Boolean).join(' ')}
              onClick={() => onChange({ rhythm: opt.id })}
              aria-pressed={selected}
            >
              <span className="onb-rhythm-card__label">{opt.label}</span>
              <span className="onb-rhythm-card__desc">{opt.description}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

/** Step 3 — Confirmation */
function StepConfirmation({
  answers,
  onStart,
}: {
  answers: OnboardingAnswers;
  onStart: () => void;
}) {
  const rhythmLabel = RHYTHM_OPTIONS.find(r => r.id === answers.rhythm)?.label ?? '—';

  return (
    <div className="onb-step">
      <div className="onb-step__icon-wrap" style={{ background: 'var(--tls-success-bg)', color: 'var(--tls-success-fg)' }}>
        <CheckCircle2 size={28} />
      </div>
      <h2 className="onb-step__title">
        {answers.firstName ? `Parfait, ${answers.firstName} !` : 'Votre profil est prêt !'}
      </h2>
      <p className="onb-step__sub">Voici un résumé de vos préférences et votre parcours suggéré.</p>

      {/* Summary */}
      <div className="onb-summary">
        <div className="onb-summary__row">
          <span className="onb-summary__key">Rôle</span>
          <span className="onb-summary__val">{answers.role || '—'}</span>
        </div>
        <div className="onb-summary__row">
          <span className="onb-summary__key">Secteur</span>
          <span className="onb-summary__val">{answers.sector || '—'}</span>
        </div>
        <div className="onb-summary__row">
          <span className="onb-summary__key">Objectifs</span>
          <span className="onb-summary__val">
            {answers.goals.length > 0 ? answers.goals.join(', ') : '—'}
          </span>
        </div>
        <div className="onb-summary__row">
          <span className="onb-summary__key">Rythme</span>
          <span className="onb-summary__val">{rhythmLabel}</span>
        </div>
      </div>

      {/* AI suggestion preview */}
      <Card style={{
        marginTop: 'var(--s-6)',
        background: 'linear-gradient(135deg, var(--tls-primary-50) 0%, var(--surface) 100%)',
        border: '1px solid var(--tls-primary-200)',
        padding: 'var(--s-5)',
      }}>
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: 'var(--s-3)', marginBottom: 'var(--s-3)' }}>
          <Brain size={20} style={{ color: 'var(--tls-primary-600)', flexShrink: 0, marginTop: 2 }} />
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--s-2)', marginBottom: 'var(--s-1)' }}>
              <span style={{ fontWeight: 700, fontSize: 'var(--t-body)', color: 'var(--text)' }}>
                Parcours recommandé
              </span>
              <Badge variant="brand">IA</Badge>
            </div>
            <p style={{ margin: 0, fontSize: 'var(--t-body-sm)', color: 'var(--text-muted)', lineHeight: 1.5 }}>
              {answers.goals.includes('Leadership') || answers.goals.includes('Coaching')
                ? "Leadership & Impact — Développez vos compétences de pilotage et d'influence"
                : answers.goals.includes('IA & Tech')
                ? "Tech & Innovation — Maîtrisez les outils IA pour gagner en productivité"
                : "Développement professionnel personnalisé — basé sur vos objectifs déclarés"}
            </p>
          </div>
        </div>
        <div style={{ display: 'flex', gap: 'var(--s-2)', flexWrap: 'wrap' }}>
          {(answers.goals.length > 0 ? answers.goals.slice(0, 3) : ['Compétences clés']).map(g => (
            <span key={g} className="onb-tag">{g}</span>
          ))}
        </div>
      </Card>
    </div>
  );
}

/* ============================================================================
   Main Page
   ============================================================================ */
export const Onboarding: React.FC = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<OnboardingAnswers>({
    firstName: '',
    role: '',
    sector: '',
    goals: [],
    rhythm: '',
  });

  function patch(updates: Partial<OnboardingAnswers>) {
    setAnswers(prev => ({ ...prev, ...updates }));
  }

  function prev() { setStep(s => Math.max(0, s - 1)); }
  function next() { setStep(s => Math.min(3, s + 1)); }

  const isLast = step === 3;

  const stepComponents = [
    <StepProfil    key={0} answers={answers} onChange={patch} />,
    <StepObjectifs key={1} answers={answers} onChange={patch} />,
    <StepRythme    key={2} answers={answers} onChange={patch} />,
    <StepConfirmation key={3} answers={answers} onStart={() => navigate('/')} />,
  ];

  return (
    <>
      {/* ── Embedded styles ─────────────────────────────────────────────── */}
      <style>{`
        /* Animation */
        @keyframes stepIn {
          from { opacity: 0; transform: translateX(20px); }
          to   { opacity: 1; transform: translateX(0); }
        }
        @keyframes heroFadeIn {
          from { opacity: 0; transform: translateY(-10px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        /* Page shell */
        .onb-page {
          max-width: 760px;
          margin: 0 auto;
          padding: var(--s-8) var(--s-6) var(--s-12);
          display: flex;
          flex-direction: column;
          gap: var(--s-6);
        }

        /* Hero / header */
        .onb-hero {
          border-radius: var(--r-2xl);
          border: 1px solid rgba(85, 161, 180, 0.2);
          background: linear-gradient(135deg,
            rgba(85, 161, 180, 0.14) 0%,
            rgba(255, 255, 255, 0.92) 100%
          );
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          padding: var(--s-8) var(--s-8) var(--s-7);
          box-shadow: var(--shadow-md), inset 0 1px 0 rgba(255,255,255,0.9);
          position: relative;
          overflow: hidden;
          animation: heroFadeIn var(--dur-300, 300ms) ease both;
        }
        .onb-hero::after {
          content: '';
          position: absolute;
          top: -40%;
          right: -10%;
          width: 280px;
          height: 280px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(85,161,180,0.12) 0%, transparent 70%);
          pointer-events: none;
        }
        .onb-hero__eyebrow {
          display: inline-flex;
          align-items: center;
          gap: var(--s-1-5);
          font-size: var(--t-caption);
          font-weight: 700;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: var(--tls-primary-600);
          margin-bottom: var(--s-3);
        }
        .onb-hero h1 {
          font-size: var(--t-h1);
          font-weight: 800;
          color: var(--text);
          margin: 0 0 var(--s-2);
          line-height: var(--lh-tight, 1.2);
        }
        .onb-hero p {
          margin: 0 0 var(--s-6);
          color: var(--text-muted);
          font-size: var(--t-body);
        }

        /* Card wrapper */
        .onb-card {
          border-radius: var(--r-2xl);
          background: var(--surface);
          border: 1px solid var(--border);
          box-shadow: var(--shadow-sm);
          overflow: hidden;
        }

        /* Animated step content */
        .onb-step-anim {
          padding: var(--s-8);
          animation: stepIn 260ms cubic-bezier(0.22, 1, 0.36, 1) both;
        }

        /* Step inner layout */
        .onb-step {
          display: flex;
          flex-direction: column;
          gap: var(--s-5);
        }
        .onb-step__icon-wrap {
          width: 56px;
          height: 56px;
          border-radius: var(--r-xl, 16px);
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .onb-step__title {
          font-size: var(--t-h2);
          font-weight: 800;
          color: var(--text);
          margin: 0;
          line-height: var(--lh-tight, 1.2);
        }
        .onb-step__sub {
          margin: 0;
          color: var(--text-muted);
          font-size: var(--t-body);
          line-height: 1.6;
        }

        /* Fields */
        .onb-fields {
          display: flex;
          flex-direction: column;
          gap: var(--s-4);
        }
        .tls-input {
          width: 100%;
          box-sizing: border-box;
          padding: var(--s-3) var(--s-4);
          border: 1px solid var(--border-strong, rgba(37,43,55,0.14));
          border-radius: var(--r-lg, 10px);
          font-size: var(--t-body);
          font-family: var(--font-body);
          color: var(--text);
          background: var(--surface);
          outline: none;
          transition: border-color 160ms ease, box-shadow 160ms ease;
          appearance: none;
        }
        .tls-input:focus {
          border-color: var(--tls-primary-400);
          box-shadow: 0 0 0 3px rgba(85, 161, 180, 0.18);
        }

        /* Goal chips */
        .onb-chips {
          display: flex;
          flex-wrap: wrap;
          gap: var(--s-2-5);
        }
        .onb-chip {
          padding: var(--s-2) var(--s-4);
          border-radius: 99px;
          border: 1.5px solid var(--border-strong, rgba(37,43,55,0.14));
          background: var(--surface);
          color: var(--text);
          font-size: var(--t-body-sm);
          font-family: var(--font-body);
          font-weight: 600;
          cursor: pointer;
          transition: all 180ms ease;
        }
        .onb-chip:hover {
          border-color: var(--tls-primary-400);
          color: var(--tls-primary-600);
          background: var(--tls-primary-50);
        }
        .onb-chip--selected {
          background: var(--tls-primary-500);
          border-color: var(--tls-primary-500);
          color: var(--text-inverse, #fff);
        }
        .onb-chip--selected:hover {
          background: var(--tls-primary-600);
          border-color: var(--tls-primary-600);
          color: var(--text-inverse, #fff);
        }
        .onb-selection-hint {
          margin: 0;
          font-size: var(--t-caption);
          color: var(--tls-primary-600);
          font-weight: 600;
        }

        /* Rhythm cards */
        .onb-rhythm-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: var(--s-3);
        }
        @media (max-width: 520px) {
          .onb-rhythm-grid { grid-template-columns: 1fr; }
        }
        .onb-rhythm-card {
          display: flex;
          flex-direction: column;
          gap: var(--s-1);
          padding: var(--s-4) var(--s-5);
          border-radius: var(--r-xl, 16px);
          border: 1.5px solid var(--border);
          background: var(--surface);
          text-align: left;
          cursor: pointer;
          transition: all 180ms ease;
        }
        .onb-rhythm-card:hover {
          border-color: var(--tls-primary-300);
          background: var(--tls-primary-50);
        }
        .onb-rhythm-card--selected {
          border-color: var(--tls-primary-500);
          background: rgba(85, 161, 180, 0.06);
          box-shadow: 0 0 0 3px rgba(85, 161, 180, 0.12);
        }
        .onb-rhythm-card__label {
          font-size: var(--t-body);
          font-weight: 700;
          color: var(--text);
          font-family: var(--font-body);
        }
        .onb-rhythm-card--selected .onb-rhythm-card__label {
          color: var(--tls-primary-700);
        }
        .onb-rhythm-card__desc {
          font-size: var(--t-caption);
          color: var(--text-muted);
          font-family: var(--font-body);
        }

        /* Summary */
        .onb-summary {
          border-radius: var(--r-xl, 16px);
          border: 1px solid var(--border);
          background: var(--surface-muted, var(--tls-ink-50));
          overflow: hidden;
        }
        .onb-summary__row {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          gap: var(--s-4);
          padding: var(--s-3) var(--s-5);
          border-bottom: 1px solid var(--border);
        }
        .onb-summary__row:last-child { border-bottom: none; }
        .onb-summary__key {
          font-size: var(--t-body-sm);
          font-weight: 700;
          color: var(--text-muted);
          white-space: nowrap;
        }
        .onb-summary__val {
          font-size: var(--t-body-sm);
          color: var(--text);
          text-align: right;
        }

        /* Tags inside preview card */
        .onb-tag {
          display: inline-flex;
          padding: var(--s-1) var(--s-3);
          border-radius: 99px;
          background: rgba(85, 161, 180, 0.12);
          color: var(--tls-primary-700);
          font-size: var(--t-caption);
          font-weight: 700;
        }

        /* Footer nav */
        .onb-footer {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: var(--s-5) var(--s-8);
          border-top: 1px solid var(--border);
          background: var(--surface-muted, var(--tls-ink-50));
        }
        .onb-footer__skip {
          background: none;
          border: none;
          color: var(--text-muted);
          font-size: var(--t-body-sm);
          cursor: pointer;
          padding: 0;
          font-family: var(--font-body);
          text-decoration: underline;
          text-underline-offset: 3px;
        }
        .onb-footer__skip:hover { color: var(--text); }
        .onb-footer__actions {
          display: flex;
          gap: var(--s-3);
          align-items: center;
        }
      `}</style>

      <main className="onb-page">
        {/* ── Hero ───────────────────────────────────────────────────── */}
        <header className="onb-hero">
          <p className="onb-hero__eyebrow">
            <Sparkles size={12} />
            Démarrage personnalisé
          </p>
          <h1>Personnalisons votre expérience</h1>
          <p>4 étapes pour démarrer avec des recommandations adaptées à vos objectifs.</p>

          <Stepper
            items={buildStepperItems(step)}
            orientation="horizontal"
          />
        </header>

        {/* ── Step card ──────────────────────────────────────────────── */}
        <div className="onb-card">
          {/* Animated content */}
          <div className="onb-step-anim" key={step}>
            {stepComponents[step]}
          </div>

          {/* Navigation footer */}
          <div className="onb-footer">
            {step === 0 ? (
              <button
                className="onb-footer__skip"
                onClick={() => navigate('/dashboard')}
                type="button"
              >
                Passer pour l'instant
              </button>
            ) : (
              <Button
                variant="secondary"
                size="sm"
                onClick={prev}
              >
                <ChevronLeft size={16} />
                Retour
              </Button>
            )}

            <div className="onb-footer__actions">
              <span style={{ fontSize: 'var(--t-caption)', color: 'var(--text-muted)' }}>
                Étape {step + 1} / {STEP_LABELS.length}
              </span>

              {isLast ? (
                <Button variant="primary" onClick={() => navigate('/')}>
                  Commencer mon parcours
                  <ChevronRight size={16} />
                </Button>
              ) : (
                <Button variant="primary" onClick={next}>
                  Continuer
                  <ChevronRight size={16} />
                </Button>
              )}
            </div>
          </div>
        </div>
      </main>
    </>
  );
};
