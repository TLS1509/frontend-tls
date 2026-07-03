/**
 * MarketingDiagnostic : Auto-Diagnostic SBO (lead magnet interactif)
 *
 * Direction: light theme, white cards + shadow-card, soft warm/accent backgrounds.
 * Flow client-side : Intro → Stepper 5 questions → Email gate → Résultat animé.
 * SBO = Skills-Based Organisation. Aucun backend (tout en state React).
 */

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, useReducedMotion } from 'framer-motion';
import {
  ArrowRight,
  ArrowLeft,
  Sparkles,
  CheckCircle2,
  Target,
  Compass,
  Lock,
  Calendar,
  RotateCcw,
} from 'lucide-react';
import { Button } from '../../components/core/Button';
import { FadeInWhenVisible } from '../../components/marketing/motion';

/* ── Données du questionnaire ──────────────────────────────────────────── */

interface DiagOption {
  value: 1 | 2 | 3 | 4;
  label: string;
}

interface DiagQuestion {
  id: string;
  theme: string;
  question: string;
  options: DiagOption[];
}

const QUESTIONS: DiagQuestion[] = [
  {
    id: 'q1',
    theme: 'Pilotage des compétences',
    question: 'Comment gérez-vous les compétences aujourd’hui ?',
    options: [
      { value: 1, label: 'Fiches de poste figées' },
      { value: 2, label: 'Un référentiel statique' },
      { value: 3, label: 'Un référentiel mis à jour régulièrement' },
      { value: 4, label: 'Un référentiel vivant, piloté par la donnée' },
    ],
  },
  {
    id: 'q2',
    theme: 'Usage de l’IA',
    question: 'Où en êtes-vous avec l’IA en formation ?',
    options: [
      { value: 1, label: 'Pas commencé' },
      { value: 2, label: 'Des tests individuels non cadrés' },
      { value: 3, label: 'Quelques usages cadrés' },
      { value: 4, label: 'Intégrée systématiquement' },
    ],
  },
  {
    id: 'q3',
    theme: 'Montée en compétences',
    question: 'Comment vos équipes montent-elles en compétences ?',
    options: [
      { value: 1, label: 'Des formations ponctuelles' },
      { value: 2, label: 'Un catalogue' },
      { value: 3, label: 'Des parcours adaptatifs' },
      { value: 4, label: 'En continu, piloté par la donnée' },
    ],
  },
  {
    id: 'q4',
    theme: 'Preuve & certification',
    question: 'Comment valorisez-vous les compétences acquises ?',
    options: [
      { value: 1, label: 'Pas formalisé' },
      { value: 2, label: 'Des attestations' },
      { value: 3, label: 'Des Open Badges' },
      { value: 4, label: 'Un passeport de compétences vivant' },
    ],
  },
  {
    id: 'q5',
    theme: 'Posture',
    question: 'Quelle posture face à l’IA et aux compétences ?',
    options: [
      { value: 1, label: 'Attentiste' },
      { value: 2, label: 'Curieuse' },
      { value: 3, label: 'Proactive' },
      { value: 4, label: 'Pionnière' },
    ],
  },
];

/* ── Niveaux de maturité ───────────────────────────────────────────────── */

type LevelKey = 'emergent' | 'enRoute' | 'avance' | 'pionnier';

interface MaturityLevel {
  key: LevelKey;
  name: string;
  min: number;
  max: number;
  description: string;
  recommendation: string;
  recoLink: string;
  recoLabel: string;
}

const LEVELS: MaturityLevel[] = [
  {
    key: 'emergent',
    name: 'Émergent',
    min: 5,
    max: 9,
    description:
      'Vous posez les premières bases. La compétence reste gérée de façon statique et l’IA n’est pas encore outillée.',
    recommendation:
      'Commencez par la Learning App et la formation Formateur Augmenté pour poser les bases.',
    recoLink: '/website/learning-app',
    recoLabel: 'Découvrir la formation',
  },
  {
    key: 'enRoute',
    name: 'En route',
    min: 10,
    max: 13,
    description:
      'Vous avez amorcé la transformation. Les usages existent mais manquent encore de cadre et de pilotage.',
    recommendation:
      'Cadrez votre démarche avec un audit flash, puis structurez par la formation.',
    recoLink: '/website/accompagnement',
    recoLabel: 'Voir l’accompagnement',
  },
  {
    key: 'avance',
    name: 'Avancé',
    min: 14,
    max: 17,
    description:
      'Votre organisation est structurée et proactive. Vous êtes prêt à industrialiser la démarche par les compétences.',
    recommendation:
      'Passez à la méthode STRIDE pour structurer la transformation par les compétences.',
    recoLink: '/website/accompagnement',
    recoLabel: 'Voir l’accompagnement',
  },
  {
    key: 'pionnier',
    name: 'Pionnier SBO',
    min: 18,
    max: 20,
    description:
      'Vous êtes à la pointe de l’organisation par les compétences. Il s’agit maintenant de déployer à l’échelle.',
    recommendation:
      'Déployez l’Upskilling L&D sur-mesure et le Passeport de compétences à l’échelle.',
    recoLink: '/website/accompagnement',
    recoLabel: 'Voir l’accompagnement',
  },
];

function deriveLevel(score: number): MaturityLevel {
  return (
    LEVELS.find((l) => score >= l.min && score <= l.max) ?? LEVELS[LEVELS.length - 1]
  );
}

/* ── Phases ────────────────────────────────────────────────────────────── */

type Phase = 'intro' | 'quiz' | 'gate' | 'result';

interface GateForm {
  name: string;
  email: string;
  org: string;
}

interface GateErrors {
  name?: string;
  email?: string;
}

export const MarketingDiagnostic: React.FC = () => {
  const reduceMotion = useReducedMotion();

  const [phase, setPhase] = useState<Phase>('intro');
  const [step, setStep] = useState<number>(0);
  const [answers, setAnswers] = useState<Array<number | null>>(
    () => QUESTIONS.map(() => null),
  );

  const [form, setForm] = useState<GateForm>({ name: '', email: '', org: '' });
  const [fieldErrors, setFieldErrors] = useState<GateErrors>({});

  const totalQuestions = QUESTIONS.length;
  const currentQuestion = QUESTIONS[step];
  const currentAnswer = answers[step];
  const isLastQuestion = step === totalQuestions - 1;
  const progressPct = Math.round(((step + 1) / totalQuestions) * 100);

  const score = answers.reduce<number>((sum, v) => sum + (v ?? 0), 0);
  const level = deriveLevel(score);

  /* — Handlers — */

  const startQuiz = () => {
    setPhase('quiz');
    setStep(0);
  };

  const selectOption = (value: number) => {
    setAnswers((prev) => {
      const next = [...prev];
      next[step] = value;
      return next;
    });
  };

  const goNext = () => {
    if (currentAnswer == null) return;
    if (isLastQuestion) {
      setPhase('gate');
    } else {
      setStep((s) => s + 1);
    }
  };

  const goPrev = () => {
    if (step > 0) setStep((s) => s - 1);
  };

  const validateGate = (): GateErrors => {
    const errors: GateErrors = {};
    if (!form.name.trim()) errors.name = 'Indiquez votre prénom et nom.';
    if (!form.email.trim()) errors.email = 'Indiquez votre email pro.';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim()))
      errors.email = 'Cet email semble invalide.';
    return errors;
  };

  const submitGate = (e: React.FormEvent) => {
    e.preventDefault();
    const errors = validateGate();
    setFieldErrors(errors);
    if (Object.keys(errors).length > 0) {
      const firstId = errors.name ? 'diag-name' : 'diag-email';
      document.getElementById(firstId)?.focus();
      return;
    }
    setPhase('result');
  };

  const resetAll = () => {
    setPhase('intro');
    setStep(0);
    setAnswers(QUESTIONS.map(() => null));
    setForm({ name: '', email: '', org: '' });
    setFieldErrors({});
  };

  /* — Reveal animation helper — */
  const revealProps = reduceMotion
    ? { initial: { opacity: 1 }, animate: { opacity: 1 } }
    : {
        initial: { opacity: 0, y: 16 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.4, ease: [0.21, 0.47, 0.32, 0.98] as const },
      };

  return (
    <div className="bg-white min-h-dvh flex flex-col">
      <section className="relative flex-1 pt-24 sm:pt-28 lg:pt-32 pb-page overflow-hidden bg-gradient-to-br from-white via-primary-50/60 to-secondary-50/30">
        <div aria-hidden className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[700px] rounded-pill bg-primary-200/25 blur-3xl" />
          <div className="absolute bottom-0 right-0 w-[320px] h-[320px] rounded-pill bg-accent-200/25 blur-3xl" />
        </div>

        <div className="relative max-w-3xl mx-auto px-6">
          {/* ── INTRO ──────────────────────────────────────────────────── */}
          {phase === 'intro' && (
            <FadeInWhenVisible direction="up">
              <div className="flex flex-col items-center text-center gap-stack-lg">
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-pill bg-white border border-primary-200 text-primary-700 text-caption font-bold">
                  <Sparkles size={14} />
                  Auto-diagnostic
                </span>
                <h1 className="font-display font-extrabold text-ink-900 leading-[1.02] tracking-tight m-0 text-[clamp(2rem,5vw,3.5rem)]">
                  Diagnostic SBO : où en est votre organisation ?
                </h1>
                <p className="font-body text-body-lg text-ink-600 leading-relaxed m-0 max-w-2xl">
                  5 questions, 2 minutes. Recevez votre score de maturité Skills-Based
                  et un parcours recommandé.
                </p>
                <Button
                  variant="primary"
                  size="lg"
                  onClick={startQuiz}
                  trailingIcon={<ArrowRight size={18} />}
                >
                  Commencer
                </Button>
              </div>
            </FadeInWhenVisible>
          )}

          {/* ── QUIZ STEPPER ───────────────────────────────────────────── */}
          {phase === 'quiz' && (
            <div className="flex flex-col gap-stack-lg">
              {/* Progress */}
              <div className="flex flex-col gap-stack-xs">
                <div className="flex items-center justify-between">
                  <span className="font-body text-body-sm font-bold text-primary-700">
                    Question {step + 1} / {totalQuestions}
                  </span>
                  <span className="font-body text-caption font-semibold text-ink-500">
                    {currentQuestion.theme}
                  </span>
                </div>
                <div
                  className="h-2 w-full rounded-pill bg-primary-100 overflow-hidden"
                  role="progressbar"
                  aria-valuenow={progressPct}
                  aria-valuemin={0}
                  aria-valuemax={100}
                  aria-label={`Progression : question ${step + 1} sur ${totalQuestions}`}
                >
                  <motion.div
                    className="h-full rounded-pill bg-gradient-to-r from-primary-500 to-primary-600"
                    initial={false}
                    animate={{ width: `${progressPct}%` }}
                    transition={reduceMotion ? { duration: 0 } : { duration: 0.4, ease: 'easeOut' }}
                  />
                </div>
              </div>

              {/* Question card */}
              <motion.div
                key={currentQuestion.id}
                initial={reduceMotion ? false : { opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.28, ease: [0.21, 0.47, 0.32, 0.98] }}
                className="rounded-2xl bg-white border border-ink-100 shadow-card p-section flex flex-col gap-stack-lg"
              >
                <fieldset className="flex flex-col gap-0 border-0 p-0 m-0">
                  <legend className="font-display text-h3 font-extrabold text-ink-900 leading-tight m-0 p-0 pb-section">
                    {currentQuestion.question}
                  </legend>

                  <div className="flex flex-col gap-stack-lg" role="radiogroup" aria-label={currentQuestion.question}>
                    {currentQuestion.options.map((opt) => {
                      const isSelected = currentAnswer === opt.value;
                      const optionId = `${currentQuestion.id}-opt-${opt.value}`;
                      return (
                        <label
                          key={optionId}
                          htmlFor={optionId}
                          className={`relative flex items-center gap-stack min-h-touch cursor-pointer rounded-2xl border px-stack py-stack transition-colors duration-base focus-within:outline-2 focus-within:outline-offset-2 focus-within:outline-primary-500 ${
                            isSelected
                              ? 'border-primary-500 bg-primary-50'
                              : 'border-ink-200 bg-white hover:border-primary-300 hover:bg-primary-50/40'
                          }`}
                        >
                          <input
                            id={optionId}
                            type="radio"
                            name={currentQuestion.id}
                            value={opt.value}
                            checked={isSelected}
                            onChange={() => selectOption(opt.value)}
                            className="peer sr-only"
                          />
                          <span
                            aria-hidden
                            className={`shrink-0 inline-flex items-center justify-center w-5 h-5 rounded-pill border-2 transition-colors duration-fast ${
                              isSelected
                                ? 'border-primary-500 bg-primary-500'
                                : 'border-ink-300 bg-white'
                            }`}
                          >
                            <span
                              className={`w-2 h-2 rounded-pill bg-white transition-opacity duration-fast ${
                                isSelected ? 'opacity-100' : 'opacity-0'
                              }`}
                            />
                          </span>
                          <span
                            className={`font-body text-body leading-snug ${
                              isSelected ? 'text-ink-900 font-semibold' : 'text-ink-700'
                            }`}
                          >
                            {opt.label}
                          </span>
                        </label>
                      );
                    })}
                  </div>
                </fieldset>

                {/* Nav */}
                <div className="flex items-center justify-between gap-stack pt-stack border-t border-ink-100">
                  <Button
                    variant="ghost"
                    size="lg"
                    onClick={goPrev}
                    disabled={step === 0}
                    leadingIcon={<ArrowLeft size={18} />}
                  >
                    Précédent
                  </Button>
                  <Button
                    variant="primary"
                    size="lg"
                    onClick={goNext}
                    disabled={currentAnswer == null}
                    trailingIcon={<ArrowRight size={18} />}
                  >
                    {isLastQuestion ? 'Voir mon résultat' : 'Suivant'}
                  </Button>
                </div>
              </motion.div>
            </div>
          )}

          {/* ── EMAIL GATE ─────────────────────────────────────────────── */}
          {phase === 'gate' && (
            <motion.div {...revealProps} className="flex flex-col gap-stack-lg">
              <div className="flex flex-col items-center text-center gap-stack">
                <div className="w-16 h-16 rounded-pill bg-gradient-to-br from-primary-500 to-primary-700 flex items-center justify-center shadow-card">
                  <Sparkles size={28} className="text-white" />
                </div>
                <h2 className="font-display text-h2 font-extrabold text-ink-900 m-0 leading-tight">
                  Votre diagnostic est prêt.
                </h2>
                <p className="font-body text-body-lg text-ink-600 leading-relaxed m-0 max-w-xl">
                  Indiquez où l’envoyer pour découvrir votre score de maturité Skills-Based
                  et le parcours recommandé pour votre organisation.
                </p>
              </div>

              <form
                noValidate
                onSubmit={submitGate}
                className="rounded-2xl bg-white border border-ink-100 shadow-card p-section flex flex-col gap-stack-lg"
              >
                <div className="flex flex-col gap-stack-xs">
                  <label htmlFor="diag-name" className="font-body text-body-sm font-semibold text-ink-900">
                    Prénom et nom *
                  </label>
                  <input
                    id="diag-name"
                    type="text"
                    required
                    aria-invalid={!!fieldErrors.name}
                    aria-describedby={fieldErrors.name ? 'diag-name-error' : undefined}
                    value={form.name}
                    onChange={(e) => {
                      setForm({ ...form, name: e.target.value });
                      if (fieldErrors.name) setFieldErrors({ ...fieldErrors, name: undefined });
                    }}
                    placeholder="Marie Dupont"
                    className={`px-4 h-12 rounded-xl bg-white border text-ink-900 placeholder:text-ink-400 font-body text-body focus:outline-none focus:ring-2 focus:border-transparent transition-all duration-base ${
                      fieldErrors.name
                        ? 'border-danger-base focus:ring-danger-base'
                        : 'border-ink-200 focus:ring-primary-500'
                    }`}
                  />
                  {fieldErrors.name && (
                    <p id="diag-name-error" role="alert" className="font-body text-caption text-danger-fg m-0">
                      {fieldErrors.name}
                    </p>
                  )}
                </div>

                <div className="flex flex-col gap-stack-xs">
                  <label htmlFor="diag-email" className="font-body text-body-sm font-semibold text-ink-900">
                    Email pro *
                  </label>
                  <input
                    id="diag-email"
                    type="email"
                    required
                    aria-invalid={!!fieldErrors.email}
                    aria-describedby={fieldErrors.email ? 'diag-email-error' : undefined}
                    value={form.email}
                    onChange={(e) => {
                      setForm({ ...form, email: e.target.value });
                      if (fieldErrors.email) setFieldErrors({ ...fieldErrors, email: undefined });
                    }}
                    placeholder="marie@organisation.fr"
                    className={`px-4 h-12 rounded-xl bg-white border text-ink-900 placeholder:text-ink-400 font-body text-body focus:outline-none focus:ring-2 focus:border-transparent transition-all duration-base ${
                      fieldErrors.email
                        ? 'border-danger-base focus:ring-danger-base'
                        : 'border-ink-200 focus:ring-primary-500'
                    }`}
                  />
                  {fieldErrors.email && (
                    <p id="diag-email-error" role="alert" className="font-body text-caption text-danger-fg m-0">
                      {fieldErrors.email}
                    </p>
                  )}
                </div>

                <div className="flex flex-col gap-stack-xs">
                  <label htmlFor="diag-org" className="font-body text-body-sm font-semibold text-ink-900">
                    Organisation <span className="text-ink-400 font-normal">(optionnel)</span>
                  </label>
                  <input
                    id="diag-org"
                    type="text"
                    value={form.org}
                    onChange={(e) => setForm({ ...form, org: e.target.value })}
                    placeholder="Nom de l’entreprise ou organisation"
                    className="px-4 h-12 rounded-xl bg-white border border-ink-200 text-ink-900 placeholder:text-ink-400 font-body text-body focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-base"
                  />
                </div>

                <div className="flex flex-col gap-stack pt-stack border-t border-ink-100">
                  <span className="inline-flex items-center gap-1.5 font-body text-caption text-ink-500">
                    <Lock size={12} className="text-ink-400 shrink-0" />
                    Vos données restent confidentielles. RGPD respecté.
                  </span>
                  <div className="flex justify-end">
                    <Button
                      type="submit"
                      variant="primary"
                      size="lg"
                      trailingIcon={<ArrowRight size={18} />}
                    >
                      Voir mon résultat
                    </Button>
                  </div>
                </div>
              </form>
            </motion.div>
          )}

          {/* ── RESULT ─────────────────────────────────────────────────── */}
          {phase === 'result' && (
            <motion.div {...revealProps} className="flex flex-col gap-stack-lg">
              {/* Score + level card */}
              <div className="rounded-2xl bg-gradient-to-br from-primary-50 to-accent-50/60 border border-primary-200 shadow-card p-section flex flex-col items-center text-center gap-stack-lg">
                <div className="w-16 h-16 rounded-pill bg-gradient-to-br from-primary-500 to-primary-700 flex items-center justify-center shadow-card">
                  <CheckCircle2 size={30} className="text-white" />
                </div>
                <div className="flex flex-col gap-stack-xs">
                  <span className="font-body text-caption font-bold text-primary-700 uppercase tracking-tight">
                    Votre niveau de maturité
                  </span>
                  <h2 className="font-display text-h1 font-extrabold text-ink-900 m-0 leading-none">
                    {level.name}
                  </h2>
                  <p className="font-display text-h3 font-extrabold text-primary-600 m-0">
                    {score} / 20
                  </p>
                </div>
                <p className="font-body text-body-lg text-ink-700 leading-relaxed m-0 max-w-xl">
                  {level.description}
                </p>
              </div>

              {/* Level scale */}
              <div className="rounded-2xl bg-white border border-ink-100 shadow-card p-stack-lg flex flex-col gap-stack">
                <h3 className="font-display text-h5 font-bold text-ink-900 m-0">
                  L’échelle de maturité SBO
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-stack-xs">
                  {LEVELS.map((l) => {
                    const active = l.key === level.key;
                    return (
                      <div
                        key={l.key}
                        className={`flex flex-col gap-1 rounded-xl border px-stack py-stack transition-colors duration-base ${
                          active
                            ? 'border-primary-500 bg-primary-50'
                            : 'border-ink-100 bg-ink-50/40'
                        }`}
                      >
                        <span
                          className={`font-body text-caption font-bold ${
                            active ? 'text-primary-700' : 'text-ink-500'
                          }`}
                        >
                          {l.min}–{l.max}
                        </span>
                        <span
                          className={`font-body text-body-sm font-semibold leading-tight ${
                            active ? 'text-ink-900' : 'text-ink-600'
                          }`}
                        >
                          {l.name}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Recommended path */}
              <div className="rounded-2xl bg-white border border-primary-200 shadow-card p-section flex flex-col gap-stack-lg">
                <div className="flex items-start gap-stack">
                  <span className="inline-flex items-center justify-center w-11 h-11 rounded-xl bg-primary-50 text-primary-700 border border-primary-100 shrink-0">
                    <Compass size={22} />
                  </span>
                  <div className="flex flex-col gap-stack-xs">
                    <span className="font-body text-caption font-bold text-primary-700 uppercase">
                      Parcours recommandé
                    </span>
                    <p className="font-body text-body-lg text-ink-800 leading-relaxed m-0">
                      {level.recommendation}
                    </p>
                  </div>
                </div>
                <div className="flex flex-col sm:flex-row gap-stack sm:items-center pt-stack border-t border-ink-100">
                  <Link to="/website/contact" className="block">
                    <Button
                      variant="primary"
                      size="lg"
                      fullWidth
                      trailingIcon={<Calendar size={18} />}
                    >
                      Réserver un échange de 30 min
                    </Button>
                  </Link>
                  <Link to={level.recoLink} className="block">
                    <Button
                      variant="ghost"
                      size="lg"
                      fullWidth
                      trailingIcon={<ArrowRight size={18} />}
                    >
                      {level.recoLabel}
                    </Button>
                  </Link>
                </div>
              </div>

              <div className="flex justify-center pt-stack">
                <Button
                  variant="link"
                  size="md"
                  onClick={resetAll}
                  leadingIcon={<RotateCcw size={16} />}
                >
                  Refaire le diagnostic
                </Button>
              </div>

              {/* Next steps vignettes */}
              <div className="pt-section border-t border-ink-100">
                <p className="font-body text-caption font-bold text-ink-600 uppercase tracking-tight mb-stack">
                  Prochaines étapes
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-stack">
                  <div className="rounded-2xl bg-gradient-to-br from-primary-50 to-primary-100/50 border border-primary-100 shadow-sm p-stack-lg flex flex-col gap-stack items-start">
                    <div className="w-10 h-10 rounded-xl bg-primary-500/20 flex items-center justify-center">
                      <Compass size={20} className="text-primary-700" />
                    </div>
                    <h4 className="font-display text-body-lg font-bold text-ink-900 m-0">
                      Comprendre
                    </h4>
                    <p className="font-body text-body-sm text-ink-600 leading-relaxed m-0">
                      Explorez la méthode STRIDE pour structurer votre transformation.
                    </p>
                    <Link to="/website/methode" className="mt-auto">
                      <Button variant="ghost" size="md">
                        Découvrir
                      </Button>
                    </Link>
                  </div>

                  <div className="rounded-2xl bg-gradient-to-br from-secondary-50 to-secondary-100/50 border border-secondary-100 shadow-sm p-stack-lg flex flex-col gap-stack items-start">
                    <div className="w-10 h-10 rounded-xl bg-secondary-500/20 flex items-center justify-center">
                      <Target size={20} className="text-secondary-700" />
                    </div>
                    <h4 className="font-display text-body-lg font-bold text-ink-900 m-0">
                      Apprendre
                    </h4>
                    <p className="font-body text-body-sm text-ink-600 leading-relaxed m-0">
                      Lancez-vous avec la Learning App et montez en compétences.
                    </p>
                    <Link to="/website/learning-app" className="mt-auto">
                      <Button variant="ghost" size="md">
                        Explorer
                      </Button>
                    </Link>
                  </div>

                  <div className="rounded-2xl bg-gradient-to-br from-accent-50 to-accent-100/50 border border-accent-100 shadow-sm p-stack-lg flex flex-col gap-stack items-start">
                    <div className="w-10 h-10 rounded-xl bg-accent-400/20 flex items-center justify-center">
                      <Calendar size={20} className="text-accent-700" />
                    </div>
                    <h4 className="font-display text-body-lg font-bold text-ink-900 m-0">
                      Accompagner
                    </h4>
                    <p className="font-body text-body-sm text-ink-600 leading-relaxed m-0">
                      Discutez avec nos experts pour un accompagnement sur-mesure.
                    </p>
                    <Link to="/website/accompagnement" className="mt-auto">
                      <Button variant="ghost" size="md">
                        Voir l'accompagnement
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>

              {/* Decorative anchor for screen readers / semantics */}
              <div aria-hidden className="flex items-center justify-center gap-stack-xs text-ink-300 pt-stack">
                <Target size={14} />
              </div>
            </motion.div>
          )}
        </div>
      </section>
    </div>
  );
};

export default MarketingDiagnostic;
