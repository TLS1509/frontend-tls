/**
 * LessonPlayer — EDRAC Fullscreen Lesson Viewer
 *
 * Fullscreen overlay reproduisant le pattern LessonViewer de la Learning App WIP.
 * Sections séquentielles : Introduction → Engagement → Découvrir → Quiz → Réfléchir → Appliquer → Conclusion
 *
 * Route : /learning-paths/:pathId/lessons/:lessonId
 *
 * Design system : TLS tokens + Card component
 */

import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '../components/core/Button';
import { SessionFeedbackModal } from '../components/modals';
import { QuizComponent } from '../components/ui/QuizComponent';
import {
  X,
  Clock3,
  BookOpen,
  Target,
  Search,
  HelpCircle,
  Lightbulb,
  Zap,
  GraduationCap,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  XCircle,
} from 'lucide-react';
import { resolveLessonContext } from '../data/learningPaths';

/* ─── Section definitions (EDRAC model) ─────────────────────────────────── */

const SECTIONS = [
  { id: 'introduction', title: 'Introduction', icon: BookOpen },
  { id: 'engagement',   title: 'Engagement',   icon: Target },
  { id: 'decouvrir',    title: 'Découvrir',     icon: Search },
  { id: 'quiz',         title: 'Quiz',          icon: HelpCircle },
  { id: 'reflechir',    title: 'Réfléchir',     icon: Lightbulb },
  { id: 'appliquer',    title: 'Appliquer',     icon: Zap },
  { id: 'conclusion',   title: 'Conclusion',    icon: GraduationCap },
] as const;

type SectionId = typeof SECTIONS[number]['id'];

/* ─── Lesson content data (extended per lessonId) ────────────────────────── */

interface LessonData {
  title: string;
  duration: string;
  intro: {
    heading: string;
    description: string;
    objectives: string[];
  };
  engagement: {
    heading: string;
    pillars: { title: string; description: string; tags: string[] }[];
  };
  decouvrir: {
    heading: string;
    bad: { label: string; title: string; description: string; points: string[] };
    good: { label: string; title: string; description: string; points: string[] };
  };
  quiz: {
    questions: {
      id: string;
      text: string;
      options: { id: string; label: string }[];
      correct: string;
    }[];
  };
  reflechir: {
    heading: string;
    questions: string[];
  };
  appliquer: {
    heading: string;
    instruction: string;
  };
  conclusion: {
    heading: string;
    keyPoints: string[];
    nextSteps: string[];
  };
}

const LESSON_DATA: Record<string, LessonData> = {
  'lecon-1-2-1': {
    title: 'Motivation et Engagement',
    duration: '50 min',
    intro: {
      heading: 'Bienvenue dans cette leçon',
      description: 'Cette leçon explore les mécanismes de la motivation intrinsèque et extrinsèque, et vous donne les outils pour créer les conditions d\'un engagement durable dans votre équipe.',
      objectives: [
        'Comprendre les mécanismes psychologiques de la motivation intrinsèque et extrinsèque',
        'Identifier les leviers d\'engagement adaptés à chaque profil de collaborateur',
        'Appliquer le modèle SCARF pour analyser les réactions émotionnelles en équipe',
        'Créer des conditions favorisant la motivation autonome',
      ],
    },
    engagement: {
      heading: 'Les 4 leviers de l\'engagement',
      pillars: [
        { title: 'Sens & Mission', description: 'Connecter le travail à un impact plus grand que soi', tags: ['Vision', 'Valeurs', 'Impact'] },
        { title: 'Autonomie', description: 'Donner le contrôle sur les moyens et les méthodes', tags: ['Ownership', 'Confiance', 'Flexibilité'] },
        { title: 'Progrès visible', description: 'Rendre le développement tangible et célébré', tags: ['Feedback', 'Milestones', 'Apprentissage'] },
        { title: 'Reconnaissance', description: 'Valoriser les contributions de manière sincère', tags: ['Gratitude', 'Visibilité', 'Célébration'] },
      ],
    },
    decouvrir: {
      heading: 'Comment motiver efficacement ?',
      bad: {
        label: 'À éviter',
        title: 'Motivation par la pression (inefficace)',
        description: 'Utiliser principalement les menaces, les primes conditionnelles ou la compétition interne pour motiver.',
        points: ['Résultats à court terme uniquement', 'Crée de l\'anxiété et du désengagement', 'Détruit la confiance et la créativité'],
      },
      good: {
        label: 'Recommandé',
        title: 'Motivation par le sens (durable)',
        description: 'Construire un environnement où chaque personne comprend son impact et a les ressources pour progresser.',
        points: ['Engagement durable et authentique', 'Favorise l\'initiative et l\'innovation', 'Réduit le turnover et l\'absentéisme', 'Construit une culture de confiance'],
      },
    },
    quiz: {
      questions: [
        {
          id: 'q1',
          text: 'Quel type de motivation produit les résultats les plus durables ?',
          options: [
            { id: 'a', label: 'A. La motivation extrinsèque (primes, sanctions)' },
            { id: 'b', label: 'B. La motivation intrinsèque (sens, plaisir, autonomie)' },
            { id: 'c', label: 'C. La compétition entre collègues' },
            { id: 'd', label: 'D. Les objectifs imposés par la hiérarchie' },
          ],
          correct: 'b',
        },
        {
          id: 'q2',
          text: 'Le modèle SCARF identifie 5 domaines sociaux. Lequel de ces éléments ne fait PAS partie du modèle ?',
          options: [
            { id: 'a', label: 'A. Status (statut social)' },
            { id: 'b', label: 'B. Certainty (certitude)' },
            { id: 'c', label: 'C. Remuneration (rémunération)' },
            { id: 'd', label: 'D. Fairness (équité)' },
          ],
          correct: 'c',
        },
      ],
    },
    reflechir: {
      heading: 'Analysez votre équipe',
      questions: [
        'Quels sont les 3 principaux facteurs de motivation dans votre équipe actuellement ?',
        'Y a-t-il des collaborateurs dont vous ne connaissez pas bien les motivations profondes ? Comment pourriez-vous le découvrir ?',
        'Comment créer plus d\'opportunités de progrès visible pour votre équipe cette semaine ?',
      ],
    },
    appliquer: {
      heading: 'Créez votre plan d\'action',
      instruction: 'Définissez un objectif précis lié à la motivation de votre équipe et identifiez 3 actions concrètes que vous pouvez mettre en place dès cette semaine.',
    },
    conclusion: {
      heading: 'Récapitulatif et prochaines étapes',
      keyPoints: [
        'La motivation intrinsèque est plus puissante et durable que la motivation extrinsèque',
        'Le modèle SCARF permet de comprendre les réactions comportementales en équipe',
        'L\'engagement durable passe par le sens, l\'autonomie, le progrès et la reconnaissance',
        'Chaque collaborateur a un profil motivationnel unique — il faut s\'adapter',
      ],
      nextSteps: [
        'Planifiez un 1:1 avec chaque membre de votre équipe pour découvrir ses motivations',
        'Identifiez une tâche actuelle que vous pouvez rendre plus autonome',
        'Créez un rituel hebdomadaire de reconnaissance des contributions',
      ],
    },
  },
};

const DEFAULT_LESSON_DATA: LessonData = {
  title: 'Leçon',
  duration: '45 min',
  intro: {
    heading: 'Bienvenue dans cette leçon',
    description: 'Cette leçon vous guidera à travers les concepts fondamentaux du module.',
    objectives: [
      'Comprendre les concepts fondamentaux présentés dans cette leçon',
      'Identifier les opportunités d\'application dans votre contexte professionnel',
      'Mettre en pratique avec les exercices proposés',
      'Consolider vos apprentissages avec les ressources complémentaires',
    ],
  },
  engagement: {
    heading: 'Les piliers du module',
    pillars: [
      { title: 'Concept 1', description: 'Introduction au premier pilier fondamental', tags: ['Fondamentaux', 'Théorie'] },
      { title: 'Concept 2', description: 'Application pratique du second pilier', tags: ['Pratique', 'Outils'] },
      { title: 'Concept 3', description: 'Mise en situation du troisième pilier', tags: ['Mise en situation', 'Cas réels'] },
    ],
  },
  decouvrir: {
    heading: 'Bonne pratique vs mauvaise pratique',
    bad: {
      label: 'À éviter',
      title: 'Approche standard (limitée)',
      description: 'Approche sans structure ni méthode éprouvée.',
      points: ['Résultats imprévisibles', 'Inefficace sur le long terme', 'Démotivant pour l\'équipe'],
    },
    good: {
      label: 'Recommandé',
      title: 'Approche optimisée (efficace)',
      description: 'Approche structurée basée sur les meilleures pratiques du domaine.',
      points: ['Résultats reproductibles', 'Scalable et durable', 'Valorisant pour toutes les parties'],
    },
  },
  quiz: {
    questions: [
      {
        id: 'q1',
        text: 'Quel est le concept clé de cette leçon ?',
        options: [
          { id: 'a', label: 'A. La répétition sans réflexion' },
          { id: 'b', label: 'B. La pratique délibérée avec feedback' },
          { id: 'c', label: 'C. L\'apprentissage passif' },
          { id: 'd', label: 'D. La mémorisation pure' },
        ],
        correct: 'b',
      },
    ],
  },
  reflechir: {
    heading: 'Prenez le temps de réfléchir',
    questions: [
      'Quels aspects de cette leçon résonnent le plus avec votre expérience actuelle ?',
      'Comment allez-vous appliquer ces concepts dès la semaine prochaine ?',
      'Quels obstacles anticipez-vous et comment les surmonter ?',
    ],
  },
  appliquer: {
    heading: 'Créez votre plan d\'action',
    instruction: 'Définissez un objectif SMART et 3 actions concrètes à mettre en œuvre dans les prochains jours.',
  },
  conclusion: {
    heading: 'Récapitulatif et prochaines étapes',
    keyPoints: [
      'La pratique régulière est plus efficace que les sessions intensives espacées',
      'Connectez chaque concept à une situation réelle que vous avez vécue',
      'Le partage avec vos pairs accélère l\'ancrage mémoriel',
    ],
    nextSteps: [
      'Identifiez une situation concrète où appliquer ce que vous avez appris',
      'Partagez 1 insight avec un collègue de confiance',
      'Passez à la prochaine leçon pour approfondir le sujet',
    ],
  },
};

/* ─── Component ──────────────────────────────────────────────────────────── */

export const LessonPlayer: React.FC = () => {
  const { pathId = '1', lessonId = 'lecon-1-2-1' } = useParams<{ pathId: string; lessonId: string }>();
  const navigate = useNavigate();

  const [currentIndex, setCurrentIndex] = useState(0);
  const [completedSections, setCompletedSections] = useState<Set<number>>(new Set([0]));
  const [reflections, setReflections] = useState<Record<string, string>>({});
  const [actionPlan, setActionPlan] = useState({ objectif: '', action1: '', action2: '', action3: '' });
  const [showFeedback, setShowFeedback] = useState(false);

  const ctx = resolveLessonContext(pathId, lessonId);
  const lessonData = LESSON_DATA[lessonId] ?? DEFAULT_LESSON_DATA;

  const currentSection = SECTIONS[currentIndex];
  const isFirst = currentIndex === 0;
  const isLast = currentIndex === SECTIONS.length - 1;
  const progress = Math.round(((currentIndex + 1) / SECTIONS.length) * 100);

  const goTo = (index: number) => {
    setCurrentIndex(index);
    setCompletedSections((prev) => new Set(prev).add(currentIndex));
  };

  const handleNext = () => {
    if (!isLast) {
      goTo(currentIndex + 1);
    } else {
      // Mark conclusion as completed then open feedback before leaving
      setCompletedSections((prev) => new Set(prev).add(currentIndex));
      setShowFeedback(true);
    }
  };

  const handlePrev = () => {
    if (!isFirst) {
      setCurrentIndex((i) => i - 1);
    }
  };

  const handleClose = () => {
    navigate(`/learning-paths/${pathId}`);
  };

  /* ── Section renderers ──────────────────────────────────────────────── */

  const renderIntroduction = () => (
    <div>
      <h2 className="lesson-player__section-title">{lessonData.intro.heading}</h2>
      <p className="font-body text-body text-ink-500 leading-relaxed mb-6">
        {lessonData.intro.description}
      </p>
      <div className="flex items-center gap-2 mb-5">
        <Target size={20} className="text-primary-500" />
        <h3 className="m-0 font-display text-h4 font-bold text-ink-900">
          Objectifs d'apprentissage
        </h3>
      </div>
      <div className="lesson-player__objectives">
        {lessonData.intro.objectives.map((obj, i) => (
          <div key={i} className="lesson-player__objective-item">
            <CheckCircle2 size={18} className="text-success-base shrink-0" />
            <span className="font-body text-body">{obj}</span>
          </div>
        ))}
      </div>
    </div>
  );

  const renderEngagement = () => {
    const PILLAR_TONES = [
      { card: 'bg-primary-50 border-primary-100',     accent: 'bg-primary-500',  square: 'bg-primary-500',  tag: 'bg-primary-100 text-primary-700' },
      { card: 'bg-secondary-50 border-secondary-100', accent: 'bg-secondary-600', square: 'bg-secondary-600', tag: 'bg-secondary-100 text-secondary-700' },
      { card: 'bg-accent-50 border-accent-100',       accent: 'bg-accent-600',   square: 'bg-accent-600',   tag: 'bg-accent-100 text-accent-700' },
      { card: 'bg-primary-50 border-primary-100',     accent: 'bg-primary-400',  square: 'bg-primary-400',  tag: 'bg-primary-100 text-primary-600' },
    ];

    return (
      <div>
        <h2 className="lesson-player__section-title">{lessonData.engagement.heading}</h2>
        <div className="lesson-player__pillar-grid">
          {lessonData.engagement.pillars.map((pillar, i) => {
            const t = PILLAR_TONES[i % PILLAR_TONES.length];
            return (
              <div key={i} className={`rounded-xl p-6 border ${t.card}`}>
                <div className={`w-10 h-10 rounded-md flex items-center justify-center mb-4 ${t.accent}/20`}>
                  <div className={`w-4 h-4 rounded-sm ${t.square}`} />
                </div>
                <h3 className="m-0 mb-2 font-display text-h4 font-bold text-ink-900">{pillar.title}</h3>
                <p className="m-0 mb-3 font-body text-body-sm text-ink-500 leading-relaxed">
                  {pillar.description}
                </p>
                <div className="flex flex-wrap gap-1">
                  {pillar.tags.map((tag, ti) => (
                    <span
                      key={ti}
                      className={`text-micro px-2 py-0.5 rounded-pill font-semibold ${t.tag}`}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  const renderDecouvrir = () => {
    const { decouvrir: d } = lessonData;
    return (
      <div>
        <h2 className="lesson-player__section-title">{d.heading}</h2>
        <div className="lesson-player__example-bad">
          <div className="mb-3">
            <span className="inline-flex items-center gap-1 bg-danger-base text-white px-3 py-1 rounded-lg text-caption font-bold">
              <XCircle size={14} /> {d.bad.label}
            </span>
          </div>
          <h3 className="m-0 mb-1 font-display text-h4 font-bold text-ink-900">{d.bad.title}</h3>
          <p className="m-0 mb-4 font-body text-body-sm text-ink-500">{d.bad.description}</p>
          {d.bad.points.map((p, i) => (
            <div key={i} className="flex items-center gap-2 mb-2">
              <span className="text-lg">⚠️</span>
              <span className="font-body text-body-sm">{p}</span>
            </div>
          ))}
        </div>
        <div className="lesson-player__example-good">
          <div className="mb-3">
            <span className="inline-flex items-center gap-1 bg-success-base text-white px-3 py-1 rounded-lg text-caption font-bold">
              <CheckCircle2 size={14} /> {d.good.label}
            </span>
          </div>
          <h3 className="m-0 mb-1 font-display text-h4 font-bold text-ink-900">{d.good.title}</h3>
          <p className="m-0 mb-4 font-body text-body-sm text-ink-500">{d.good.description}</p>
          {d.good.points.map((p, i) => (
            <div key={i} className="flex items-center gap-2 mb-2">
              <CheckCircle2 size={16} className="text-success-base shrink-0" />
              <span className="font-body text-body-sm">{p}</span>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const renderQuiz = () => {
    const quizQuestions = lessonData.quiz.questions.map(q => ({
      question: q.text,
      options: q.options.map(o => o.label),
      correct: q.options.findIndex(o => o.id === q.correct),
    }));
    return (
      <QuizComponent
        questions={quizQuestions}
        onComplete={(results) => console.log('Quiz done', results)}
      />
    );
  };

  const renderReflechir = () => (
    <div>
      <h2 className="lesson-player__section-title">{lessonData.reflechir.heading}</h2>
      {lessonData.reflechir.questions.map((question, i) => (
        <div key={i} className="lesson-player__reflection-block">
          <h3 className="m-0 font-body text-body font-semibold text-ink-900">{question}</h3>
          <textarea
            className="lesson-player__reflection-textarea"
            value={reflections[`q${i}`] ?? ''}
            onChange={(e) => setReflections((prev) => ({ ...prev, [`q${i}`]: e.target.value }))}
            placeholder="Écrivez votre réflexion ici…"
          />
        </div>
      ))}
    </div>
  );

  const renderAppliquer = () => (
    <div>
      <h2 className="lesson-player__section-title">{lessonData.appliquer.heading}</h2>
      <div className="bg-primary-50 rounded-xl p-5 mb-6 border border-primary-200">
        <p className="m-0 font-body text-body text-ink-900 leading-relaxed">
          {lessonData.appliquer.instruction}
        </p>
      </div>
      <div className="flex flex-col gap-4">
        {[
          { key: 'objectif' as const, label: 'Objectif', placeholder: 'Ex: Améliorer l\'engagement de mon équipe de 20% en 30 jours' },
          { key: 'action1' as const, label: 'Action 1', placeholder: 'Première action concrète à mettre en place dès demain' },
          { key: 'action2' as const, label: 'Action 2', placeholder: 'Deuxième action complémentaire cette semaine' },
          { key: 'action3' as const, label: 'Action 3', placeholder: 'Troisième action pour ancrer le changement' },
        ].map(({ key, label, placeholder }) => (
          <div key={key}>
            <label className="lesson-player__action-label">{label}</label>
            <input
              type="text"
              className="lesson-player__action-input"
              value={actionPlan[key]}
              onChange={(e) => setActionPlan((prev) => ({ ...prev, [key]: e.target.value }))}
              placeholder={placeholder}
            />
          </div>
        ))}
      </div>
    </div>
  );

  const renderConclusion = () => (
    <div>
      <h2 className="lesson-player__section-title">{lessonData.conclusion.heading}</h2>
      <div className="flex items-center gap-2 mb-4">
        <CheckCircle2 size={18} className="text-success-base" />
        <h3 className="m-0 font-display text-h4 font-bold text-ink-900">Points clés à retenir</h3>
      </div>
      <div className="mb-8">
        {lessonData.conclusion.keyPoints.map((point, i) => (
          <div key={i} className="lesson-player__conclusion-point">
            <div className="lesson-player__conclusion-num">{i + 1}</div>
            <span className="font-body text-body-sm">{point}</span>
          </div>
        ))}
      </div>
      <div className="flex items-center gap-2 mb-4">
        <Zap size={18} className="text-primary-500" />
        <h3 className="m-0 font-display text-h4 font-bold text-ink-900">Prochaines étapes</h3>
      </div>
      {lessonData.conclusion.nextSteps.map((step, i) => (
        <div key={i} className="lesson-player__next-step">
          <ChevronRight size={18} className="text-primary-500 shrink-0" />
          <span className="font-body text-body-sm">{step}</span>
        </div>
      ))}
    </div>
  );

  const SECTION_RENDERERS: Record<SectionId, () => React.ReactNode> = {
    introduction: renderIntroduction,
    engagement: renderEngagement,
    decouvrir: renderDecouvrir,
    quiz: renderQuiz,
    reflechir: renderReflechir,
    appliquer: renderAppliquer,
    conclusion: renderConclusion,
  };

  const displayTitle = ctx?.lesson.title ?? lessonData.title;
  const displayDuration = ctx?.lesson.duration ?? lessonData.duration;

  return (
    <div className="lesson-player" role="dialog" aria-modal="true" aria-label={`Leçon : ${displayTitle}`}>
      {/* SCROLLABLE BODY */}
      <div className="lesson-player__body">

        {/* HEADER */}
        <header className="lesson-player__header">
          <div className="lesson-player__header-top">
            <h1 className="lesson-player__title">{displayTitle}</h1>
            <div className="lesson-player__header-meta">
              <span className="lesson-player__duration">
                <Clock3 size={14} />
                {displayDuration}
              </span>
              <button
                className="lesson-player__close"
                onClick={handleClose}
                aria-label="Fermer la leçon"
              >
                <X size={18} />
              </button>
            </div>
          </div>
          <div
            className="lesson-player__progress-track"
            role="progressbar"
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={progress}
            aria-label={`Progression : ${progress}%`}
          >
            <div className="lesson-player__progress-fill" style={{ width: `${progress}%` }} />
          </div>
        </header>

        {/* SECTION NAV */}
        <nav className="lesson-player__section-nav" aria-label="Sections de la leçon">
          <div className="lesson-player__section-list">
            {SECTIONS.map((section, index) => {
              const isActive = index === currentIndex;
              const isDone = completedSections.has(index) && !isActive;
              const Icon = section.icon;
              return (
                <button
                  key={section.id}
                  className={`lesson-player__section-btn ${isActive ? 'lesson-player__section-btn--active' : ''} ${isDone ? 'lesson-player__section-btn--done' : ''}`}
                  onClick={() => goTo(index)}
                  aria-current={isActive ? 'step' : undefined}
                >
                  <Icon size={14} />
                  <span>{section.title}</span>
                  {isActive && (
                    <div className="lesson-player__section-radio">
                      <div className="lesson-player__section-radio-inner" />
                    </div>
                  )}
                  {isDone && <span className="lesson-player__section-done-dot" aria-hidden="true" />}
                </button>
              );
            })}
          </div>
        </nav>

        {/* CONTENT */}
        <div className="lesson-player__content-wrap">
          <div className="lesson-player__content-card" key={currentSection.id}>
            {SECTION_RENDERERS[currentSection.id]()}
          </div>
        </div>

        {/* BOTTOM NAV */}
        <div className="lesson-player__bottom-nav">
          <div className="lesson-player__bottom-nav-inner">
            {/* Previous */}
            <button
              onClick={handlePrev}
              disabled={isFirst}
              className={[
                'flex items-center gap-2 px-5 py-3 rounded-lg bg-transparent border-0 font-body text-caption font-medium transition-colors',
                isFirst
                  ? 'text-ink-300 cursor-not-allowed'
                  : 'text-ink-500 cursor-pointer hover:text-ink-900',
              ].join(' ')}
            >
              <ChevronLeft size={18} />
              Précédent
            </button>

            {/* Dot pagination */}
            <div className="lesson-player__dots">
              {SECTIONS.map((_, i) => {
                const isActive = i === currentIndex;
                const isDone = completedSections.has(i) && !isActive;
                return (
                  <button
                    key={i}
                    className={`lesson-player__dot ${isActive ? 'lesson-player__dot--active' : isDone ? 'lesson-player__dot--done' : 'lesson-player__dot--inactive'}`}
                    onClick={() => goTo(i)}
                    aria-label={`Section ${i + 1}`}
                  >
                    {i + 1}
                  </button>
                );
              })}
            </div>

            {/* Next / Terminer */}
            {isLast ? (
              <Button variant="primary" size="md" onClick={handleNext} className="flex items-center gap-2">
                <CheckCircle2 size={16} />
                Terminer
              </Button>
            ) : (
              <button
                onClick={handleNext}
                className="flex items-center gap-2 px-6 py-3 rounded-lg bg-primary-500 border-0 text-white cursor-pointer font-body text-caption font-semibold transition-colors hover:bg-primary-600"
              >
                Suivant
                <ChevronRight size={18} />
              </button>
            )}
          </div>
        </div>

      </div>

      {/* ─ Session Feedback Modal ─────────────────────────────────── */}
      <SessionFeedbackModal
        isOpen={showFeedback}
        onClose={() => {
          setShowFeedback(false);
          navigate(`/learning-paths/${pathId}`);
        }}
        onSubmit={(_rating, _comment) => {
          setShowFeedback(false);
          navigate(`/learning-paths/${pathId}`);
        }}
        title={displayTitle}
        subtitle={`Leçon complétée · ${displayDuration}`}
      />
    </div>
  );
};
