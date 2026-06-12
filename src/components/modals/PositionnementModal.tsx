import React, { useState, useEffect } from 'react';
import { ArrowRight, BarChart2, Flame, Rocket, Sparkles, Sprout, Star, Target, X } from 'lucide-react';
import { Button } from '../core/Button';

/**
 * PositionnementModal — Auto-évaluation des compétences avant un parcours
 * Design: Progressive Cards, 5 niveaux, auto-avancement, success screen
 */

interface Question {
  id: number;
  title: string;
  description: string;
  competenceKey?: string;
}

interface Level {
  id: string;
  icon: React.ReactNode;
  label: string;
  description: string;
  value: number;
  color: string;
  colorLight: string;
  glowColor: string;
}

interface PositionnementModalProps {
  isOpen: boolean;
  onClose: () => void;
  courseTitle?: string;
  courseId?: string;
  questions?: Question[];
  onComplete?: (responses: Record<number, string>, competences: Record<string, number>) => void;
  onStartCourse?: () => void;
  onPositionnementComplete?: () => void;
}

const DEFAULT_QUESTIONS: Question[] = [
  {
    id: 1,
    title: 'Maîtrise des outils numériques',
    description: 'Comment évaluez-vous votre niveau actuel ?',
    competenceKey: 'outils_numeriques',
  },
  {
    id: 2,
    title: 'Analyse de données',
    description: 'Quelle est votre aisance avec les statistiques ?',
    competenceKey: 'analyse_donnees',
  },
  {
    id: 3,
    title: 'Communication digitale',
    description: 'Comment vous situez-vous en communication en ligne ?',
    competenceKey: 'communication_digitale',
  },
];

const LEVELS: Level[] = [
  { id: 'debutant',      icon: <Sprout size={40} strokeWidth={1.5} />, label: 'Débutant',      description: 'Je découvre',      value: 1, color: '#FFC15A', colorLight: 'rgba(255,193,90,0.12)',  glowColor: 'rgba(255,193,90,0.35)' },
  { id: 'novice',        icon: <Flame size={40} strokeWidth={1.5} />,  label: 'Novice',        description: 'Bases acquises',   value: 2, color: '#F8B044', colorLight: 'rgba(248,176,68,0.12)',  glowColor: 'rgba(248,176,68,0.35)' },
  { id: 'intermediaire', icon: <Target size={40} strokeWidth={1.5} />, label: 'Intermédiaire', description: 'Autonome',         value: 3, color: '#f49a76', colorLight: 'rgba(244,154,118,0.12)', glowColor: 'rgba(244,154,118,0.35)' },
  { id: 'avance',        icon: <Rocket size={40} strokeWidth={1.5} />, label: 'Avancé',        description: "Très à l'aise",   value: 4, color: '#55A1B4', colorLight: 'rgba(85,161,180,0.12)',  glowColor: 'rgba(85,161,180,0.35)' },
  { id: 'expert',        icon: <Star size={40} strokeWidth={1.5} />,   label: 'Expert',        description: 'Maîtrise totale',  value: 5, color: '#9dbeba', colorLight: 'rgba(157,190,186,0.12)', glowColor: 'rgba(157,190,186,0.35)' },
];

const SUCCESS_FEATURES = [
  { icon: <BarChart2 size={32} strokeWidth={1.5} />, label: 'Compétences enregistrées', borderClass: 'border-primary-500/15' },
  { icon: <Target size={32} strokeWidth={1.5} />,    label: 'Parcours personnalisé',    borderClass: 'border-accent-400/15'  },
  { icon: <Rocket size={32} strokeWidth={1.5} />,    label: 'Progression optimisée',    borderClass: 'border-secondary-500/15' },
];

export const PositionnementModal: React.FC<PositionnementModalProps> = ({
  isOpen,
  onClose,
  courseTitle = 'Positionnement Apprenant',
  courseId,
  questions = DEFAULT_QUESTIONS,
  onComplete,
  onStartCourse,
  onPositionnementComplete,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [responses, setResponses] = useState<Record<number, string>>({});
  const [selectedLevel, setSelectedLevel] = useState<string | null>(null);
  const [isCompleted, setIsCompleted] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setCurrentIndex(0);
      setResponses({});
      setSelectedLevel(null);
      setIsCompleted(false);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const currentQuestion = questions[currentIndex];
  const progress = ((currentIndex + 1) / questions.length) * 100;
  const isLastQuestion = currentIndex === questions.length - 1;
  const canProceed = selectedLevel !== null;

  const handleLevelSelect = (levelId: string) => {
    setSelectedLevel(levelId);
    setResponses((prev) => ({ ...prev, [currentQuestion.id]: levelId }));
  };

  const handleNext = () => {
    if (!canProceed) return;
    if (isLastQuestion) {
      const competences: Record<string, number> = {};
      questions.forEach((q) => {
        if (q.competenceKey && responses[q.id]) {
          const level = LEVELS.find((l) => l.id === responses[q.id]);
          if (level) competences[q.competenceKey] = level.value;
        }
      });
      console.log('💾 Positionnement:', { courseId, responses, competences });
      setIsCompleted(true);
      onComplete?.(responses, competences);
      setTimeout(() => {
        onClose();
        onPositionnementComplete?.();
        onStartCourse?.();
      }, 2200);
    } else {
      setCurrentIndex((prev) => prev + 1);
      setSelectedLevel(responses[questions[currentIndex + 1]?.id] ?? null);
    }
  };

  return (
    <div
      className="fixed inset-0 flex items-center justify-center p-4 z-modal backdrop-blur bg-black/45 animate-modal-bd-in"
      onClick={onClose}
    >
      {/* Modal container */}
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-[880px] bg-gradient-to-br from-primary-50 to-accent-50/95 rounded-2xl border border-ink-200 shadow-modal overflow-hidden animate-modal-in"
      >
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 w-9 h-9 rounded-full bg-white border border-ink-200 flex items-center justify-center cursor-pointer text-ink-600 hover:bg-danger-bg hover:text-danger-fg transition-all z-10 p-0"
          aria-label="Fermer"
        >
          <X size={16} />
        </button>

        <div className="p-8">
          {!isCompleted ? (
            <>
              {/* Header + progress */}
              <div className="mb-6">
                <p className="text-caption font-semibold text-primary-600 uppercase tracking-[0.06em] mb-1">
                  {courseTitle}
                </p>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-caption text-ink-600">
                    Question {currentIndex + 1} / {questions.length}
                  </span>
                  <span className="text-caption font-bold text-primary-600">
                    {Math.round(progress)}%
                  </span>
                </div>
                <div className="w-full h-1.5 bg-ink-200 rounded-pill overflow-hidden">
                  <div
                    className="h-full bg-primary-500 rounded-pill transition-all duration-500"
                    style={{ width: `${progress}%` }}
                  />
                </div>
              </div>

              {/* Question card */}
              <div className="bg-white rounded-xl p-6 shadow-md mb-6 border border-ink-200">
                <h2 className="text-h3 font-extrabold text-ink-900 leading-snug mb-2">
                  {currentQuestion.title}
                </h2>
                <p className="text-body text-ink-600">
                  {currentQuestion.description}
                </p>
              </div>

              {/* Level selection */}
              <div className="grid grid-cols-5 gap-3 mb-6">
                {LEVELS.map((level) => {
                  const isSelected = selectedLevel === level.id;
                  return (
                    <button
                      key={level.id}
                      onClick={() => handleLevelSelect(level.id)}
                      className={[
                        'rounded-xl py-5 px-3 flex flex-col items-center gap-2 cursor-pointer transition-all border-2 text-center',
                        isSelected
                          ? '-translate-y-1 scale-[1.04]'
                          : 'hover:-translate-y-[3px] hover:scale-[1.02]',
                      ].join(' ')}
                      style={{
                        background: isSelected ? level.colorLight : 'white',
                        borderColor: isSelected ? level.color : 'rgba(37,43,55,0.08)',
                        boxShadow: isSelected
                          ? `0 8px 24px ${level.glowColor}, 0 1px 3px 0 rgba(0, 0, 0, 0.1)`
                          : '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
                      }}
                      onMouseEnter={(e) => {
                        if (!isSelected) {
                          e.currentTarget.style.boxShadow = `0 8px 20px ${level.glowColor}`;
                          e.currentTarget.style.borderColor = level.color;
                        }
                      }}
                      onMouseLeave={(e) => {
                        if (!isSelected) {
                          e.currentTarget.style.boxShadow = '0 1px 2px 0 rgba(0, 0, 0, 0.05)';
                          e.currentTarget.style.borderColor = 'rgba(37,43,55,0.08)';
                        }
                      }}
                    >
                      <span className="inline-flex items-center justify-center">{level.icon}</span>
                      <span
                        className="text-caption font-bold text-center leading-tight text-ink-900"
                        style={{ color: isSelected ? level.color : undefined }}
                      >
                        {level.label}
                      </span>
                      <span className="text-micro text-ink-600 text-center">
                        {level.description}
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* Next button */}
              <div className="flex justify-end">
                <Button
                  variant="primary"
                  size="lg"
                  disabled={!canProceed}
                  trailingIcon={<ArrowRight size={18} />}
                  onClick={handleNext}
                >
                  {isLastQuestion ? 'Terminer' : 'Suivant'}
                </Button>
              </div>
            </>
          ) : (
            /* Success screen */
            <div className="flex flex-col gap-5 animate-modal-in">
              <div className="bg-white rounded-xl p-8 border border-primary-500/20 shadow-lg text-center">
                <div className="inline-flex gap-2 mb-5 p-3 rounded-xl bg-ink-50">
                  {([<Target size={22} strokeWidth={1.75} />, <Star size={22} strokeWidth={1.75} />, <Rocket size={22} strokeWidth={1.75} />] as React.ReactNode[]).map((icon, i) => (
                    <div
                      key={i}
                      className="w-11 h-11 rounded-lg bg-primary-100 flex items-center justify-center text-primary-600"
                    >
                      {icon}
                    </div>
                  ))}
                </div>
                <h3 className="text-h3 font-extrabold text-ink-900 mb-2">Votre profil est prêt !</h3>
                <p className="text-body text-ink-600 mb-6">
                  Le parcours va maintenant s'adapter à votre niveau.
                </p>

                <div className="grid grid-cols-3 gap-3 mb-5">
                  {SUCCESS_FEATURES.map((f, i) => (
                    <div key={i} className={`p-4 rounded-lg bg-ink-50 border ${f.borderClass}`}>
                      <div className="inline-flex items-center justify-center mb-2 text-ink-700">{f.icon}</div>
                      <p className="text-caption font-semibold text-ink-900 leading-snug">{f.label}</p>
                    </div>
                  ))}
                </div>

                <div className="flex gap-3 p-4 rounded-lg bg-primary-50 border border-primary-500/20 text-left">
                  <div className="shrink-0 w-9 h-9 rounded-md bg-primary-500 flex items-center justify-center">
                    <Sparkles size={18} className="text-white" />
                  </div>
                  <div>
                    <p className="text-caption font-bold text-primary-600 mb-1">🔮 Prochainement : Adaptive Learning</p>
                    <p className="text-caption text-ink-600 leading-relaxed">
                      Votre <strong>Passport de Compétences</strong> personnalisera le contenu en fonction de votre progression.
                    </p>
                  </div>
                </div>
              </div>

              <div className="text-center p-3 rounded-lg bg-primary-500/6 animate-pulse">
                <p className="text-caption text-ink-600">
                  Redirection vers votre parcours dans quelques instants… 🎓
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PositionnementModal;
