import { useState } from 'react';
import { 
  User, 
  Target, 
  Sparkles, 
  CheckCircle2, 
  ArrowRight,
  ArrowLeft,
  Briefcase,
  GraduationCap,
  Brain,
  Zap,
  Users,
  BookOpen,
  Award,
} from 'lucide-react';

// ✅ Import upgraded components
import { ButtonEnhanced } from '../ui/button-enhanced';
import { ProgressBarEnhanced } from '../ui/progress-bar-enhanced';
import { Celebration } from '../ui/celebration';

interface OnboardingFlowProps {
  onComplete: (data: OnboardingData) => void;
  onSkip?: () => void;
}

export interface OnboardingData {
  role: string;
  experience: string;
  goals: string[];
  interests: string[];
  learningStyle: string;
  availability: string;
}

// ✅ Onboarding steps configuration
const STEPS = [
  { id: 1, title: 'Profil', description: 'Parlez-nous de vous', icon: User },
  { id: 2, title: 'Objectifs', description: 'Vos ambitions', icon: Target },
  { id: 3, title: 'Préférences', description: 'Personnalisez votre expérience', icon: Sparkles },
  { id: 4, title: 'Confirmation', description: 'C\'est parti !', icon: CheckCircle2 },
];

const ROLES = [
  { id: 'formateur', label: 'Formateur / Enseignant', icon: GraduationCap, color: 'var(--primary)' },
  { id: 'manager', label: 'Manager / Chef de projet', icon: Briefcase, color: 'var(--secondary)' },
  { id: 'rh', label: 'RH / Responsable formation', icon: Users, color: 'var(--accent)' },
  { id: 'consultant', label: 'Consultant / Freelance', icon: Zap, color: 'var(--success-600)' },
];

const EXPERIENCE_LEVELS = [
  { id: 'beginner', label: 'Débutant', description: 'Je découvre l\'IA', emoji: '🌱' },
  { id: 'intermediate', label: 'Intermédiaire', description: 'J\'ai des bases', emoji: '🚀' },
  { id: 'advanced', label: 'Avancé', description: 'Je maîtrise les concepts', emoji: '⭐' },
  { id: 'expert', label: 'Expert', description: 'Je veux me spécialiser', emoji: '🏆' },
];

const GOALS = [
  { id: 'understand-ai', label: 'Comprendre l\'IA', icon: Brain },
  { id: 'create-content', label: 'Créer du contenu pédagogique', icon: BookOpen },
  { id: 'master-prompting', label: 'Maîtriser le prompt engineering', icon: Sparkles },
  { id: 'transform-teaching', label: 'Transformer mes pratiques', icon: Zap },
  { id: 'get-certified', label: 'Obtenir une certification', icon: Award },
  { id: 'team-training', label: 'Former mon équipe', icon: Users },
];

const INTERESTS = [
  'IA Générative',
  'ChatGPT',
  'Prompt Engineering',
  'Pédagogie',
  'Innovation',
  'Gamification',
  'Évaluation',
  'Design Learning',
];

const LEARNING_STYLES = [
  { id: 'visual', label: 'Visuel', description: 'Vidéos, infographies', emoji: '👁️' },
  { id: 'reading', label: 'Lecture', description: 'Articles, documents', emoji: '📚' },
  { id: 'practice', label: 'Pratique', description: 'Exercices, projets', emoji: '🛠️' },
  { id: 'mixed', label: 'Mixte', description: 'Un peu de tout', emoji: '🎨' },
];

const AVAILABILITY = [
  { id: '5-10min', label: '5-10 min/jour', emoji: '⚡' },
  { id: '15-30min', label: '15-30 min/jour', emoji: '🎯' },
  { id: '1hour', label: '1h/jour', emoji: '🚀' },
  { id: 'flexible', label: 'Flexible', emoji: '✨' },
];

export function OnboardingFlow({ onComplete, onSkip }: OnboardingFlowProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const [showCelebration, setShowCelebration] = useState(false);
  const [data, setData] = useState<OnboardingData>({
    role: '',
    experience: '',
    goals: [],
    interests: [],
    learningStyle: '',
    availability: '',
  });

  const progress = (currentStep / STEPS.length) * 100;

  const handleNext = () => {
    if (currentStep < STEPS.length) {
      setCurrentStep(currentStep + 1);
    } else {
      // Complete onboarding
      setShowCelebration(true);
      setTimeout(() => {
        onComplete(data);
      }, 3000);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const toggleGoal = (goalId: string) => {
    setData(prev => ({
      ...prev,
      goals: prev.goals.includes(goalId)
        ? prev.goals.filter(g => g !== goalId)
        : [...prev.goals, goalId],
    }));
  };

  const toggleInterest = (interest: string) => {
    setData(prev => ({
      ...prev,
      interests: prev.interests.includes(interest)
        ? prev.interests.filter(i => i !== interest)
        : [...prev.interests, interest],
    }));
  };

  const canProceed = () => {
    switch (currentStep) {
      case 1:
        return data.role && data.experience;
      case 2:
        return data.goals.length > 0;
      case 3:
        return data.learningStyle && data.availability && data.interests.length > 0;
      case 4:
        return true;
      default:
        return false;
    }
  };

  return (
    <div 
      className="min-h-screen flex items-center justify-center p-6"
      style={{
        background: 'var(--background)',
      }}
    >
      <div 
        className="w-full max-w-4xl"
      >
        {/* Progress Bar */}
        <div className="mb-8">
          <ProgressBarEnhanced
            current={currentStep}
            total={STEPS.length}
            color="var(--gradient-primary)"
            height="8px"
            animated={true}
            showPercentage={false}
          />
        </div>

        {/* Steps indicator - Responsive: Horizontal Desktop, Compact Mobile */}
        <div className="flex justify-between mb-12 gap-2 md:gap-4">
          {STEPS.map((step) => {
            const Icon = step.icon;
            const isActive = currentStep === step.id;
            const isCompleted = currentStep > step.id;

            return (
              <div 
                key={step.id} 
                className="flex flex-col items-center flex-1 min-w-0"
              >
                <div 
                  className="w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center mb-2 transition-all duration-300"
                  style={{
                    background: isCompleted 
                      ? 'var(--success-600)' 
                      : isActive 
                        ? 'var(--primary)' 
                        : 'var(--neutral-200)',
                    color: isCompleted || isActive ? 'white' : 'var(--muted-foreground)',
                    transform: isActive ? 'scale(1.1)' : 'scale(1)',
                  }}
                >
                  <Icon className="w-5 h-5 md:w-6 md:h-6" />
                </div>
                <p 
                  className="hidden md:block"
                  style={{ 
                    fontSize: 'var(--text-sm)',
                    fontWeight: isActive ? 'var(--font-weight-bold)' : 'var(--font-weight-medium)',
                    color: isActive ? 'var(--foreground)' : 'var(--muted-foreground)',
                    textAlign: 'center',
                  }}
                >
                  {step.title}
                </p>
                {/* Mobile: Show only active step title */}
                {isActive && (
                  <p 
                    className="md:hidden text-center px-1"
                    style={{ 
                      fontSize: 'var(--text-xs)',
                      fontWeight: 'var(--font-weight-bold)',
                      color: 'var(--foreground)',
                    }}
                  >
                    {step.title}
                  </p>
                )}
                <p 
                  className="hidden md:block"
                  style={{ 
                    fontSize: 'var(--text-xs)',
                    color: 'var(--muted-foreground)',
                    textAlign: 'center',
                  }}
                >
                  {step.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* Content Card */}
        <div 
          className="p-8 md:p-12 rounded-3xl"
          style={{
            background: 'var(--glass-white)',
            backdropFilter: 'var(--blur-xl)',
            border: '1px solid var(--glass-border)',
            boxShadow: 'var(--glass-shadow-lg)',
          }}
        >
          {/* ========== STEP 1: PROFIL ========== */}
          {currentStep === 1 && (
            <div>
              <h2 
                className="mb-2 text-center"
                style={{ 
                  fontFamily: 'var(--font-display)',
                  fontSize: 'var(--text-3xl)',
                  fontWeight: 'var(--font-weight-bold)',
                  color: 'var(--foreground)',
                }}
              >
                Bienvenue ! 👋
              </h2>
              <p 
                className="mb-8 text-center"
                style={{ 
                  fontSize: 'var(--text-base)',
                  color: 'var(--muted-foreground)',
                }}
              >
                Aidez-nous à personnaliser votre expérience d'apprentissage
              </p>

              {/* Role selection */}
              <div className="mb-8">
                <label 
                  className="mb-4 block"
                  style={{ 
                    fontSize: 'var(--text-lg)',
                    fontWeight: 'var(--font-weight-bold)',
                    color: 'var(--foreground)',
                  }}
                >
                  Quel est votre rôle ?
                </label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {ROLES.map((role) => {
                    const Icon = role.icon;
                    const isSelected = data.role === role.id;

                    return (
                      <button
                        key={role.id}
                        onClick={() => setData({ ...data, role: role.id })}
                        className="p-6 rounded-2xl text-left transition-all duration-500 hover:-translate-y-2 relative overflow-hidden"
                        style={{
                          background: isSelected 
                            ? `linear-gradient(135deg, ${role.color}15 0%, ${role.color}05 100%)`
                            : 'rgba(255, 255, 255, 0.7)',
                          backdropFilter: 'blur(20px)',
                          WebkitBackdropFilter: 'blur(20px)',
                          border: `2px solid ${isSelected ? role.color : 'rgba(255, 255, 255, 0.5)'}`,
                          boxShadow: isSelected 
                            ? `0 8px 32px 0 ${role.color}20, inset 0 1px 0 0 rgba(255, 255, 255, 0.9)`
                            : '0 8px 32px 0 rgba(0, 0, 0, 0.08), inset 0 1px 0 0 rgba(255, 255, 255, 0.9)',
                        }}
                      >
                        {isSelected && (
                          <div 
                            className="absolute inset-0 opacity-20"
                            style={{
                              background: `radial-gradient(circle at 50% 0%, ${role.color}30 0%, transparent 70%)`,
                              pointerEvents: 'none',
                            }}
                          />
                        )}
                        <div className="relative">
                          <Icon 
                            className="w-8 h-8 mb-3" 
                            style={{ color: isSelected ? role.color : 'var(--muted-foreground)', strokeWidth: 2 }} 
                          />
                          <p 
                            style={{ 
                              fontSize: 'var(--text-base)',
                              fontWeight: 'var(--font-weight-semibold)',
                              color: isSelected ? role.color : 'var(--foreground)',
                            }}
                          >
                            {role.label}
                          </p>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Experience level */}
              <div>
                <label 
                  className="mb-4 block"
                  style={{ 
                    fontSize: 'var(--text-lg)',
                    fontWeight: 'var(--font-weight-bold)',
                    color: 'var(--foreground)',
                  }}
                >
                  Quel est votre niveau avec l'IA ?
                </label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {EXPERIENCE_LEVELS.map((level) => {
                    const isSelected = data.experience === level.id;

                    return (
                      <button
                        key={level.id}
                        onClick={() => setData({ ...data, experience: level.id })}
                        className="p-6 rounded-2xl text-left transition-all duration-300"
                        style={{
                          background: isSelected ? 'var(--primary-lighter)' : 'var(--neutral-50)',
                          border: `2px solid ${isSelected ? 'var(--primary)' : 'var(--border)'}`,
                          transform: isSelected ? 'translateY(-4px)' : 'translateY(0)',
                        }}
                      >
                        <div className="flex items-center gap-3 mb-2">
                          <span style={{ fontSize: 'var(--text-2xl)' }}>{level.emoji}</span>
                          <p 
                            style={{ 
                              fontSize: 'var(--text-base)',
                              fontWeight: 'var(--font-weight-semibold)',
                              color: isSelected ? 'var(--primary)' : 'var(--foreground)',
                            }}
                          >
                            {level.label}
                          </p>
                        </div>
                        <p 
                          style={{ 
                            fontSize: 'var(--text-sm)',
                            color: 'var(--muted-foreground)',
                          }}
                        >
                          {level.description}
                        </p>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {/* ========== STEP 2: OBJECTIFS ========== */}
          {currentStep === 2 && (
            <div>
              <h2 
                className="mb-2 text-center"
                style={{ 
                  fontFamily: 'var(--font-display)',
                  fontSize: 'var(--text-3xl)',
                  fontWeight: 'var(--font-weight-bold)',
                  color: 'var(--foreground)',
                }}
              >
                Vos objectifs d'apprentissage 🎯
              </h2>
              <p 
                className="mb-8 text-center"
                style={{ 
                  fontSize: 'var(--text-base)',
                  color: 'var(--muted-foreground)',
                }}
              >
                Sélectionnez un ou plusieurs objectifs
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {GOALS.map((goal) => {
                  const Icon = goal.icon;
                  const isSelected = data.goals.includes(goal.id);

                  return (
                    <button
                      key={goal.id}
                      onClick={() => toggleGoal(goal.id)}
                      className="p-6 rounded-2xl text-left transition-all duration-300 flex items-center gap-4"
                      style={{
                        background: isSelected ? 'var(--secondary-lighter)' : 'var(--neutral-50)',
                        border: `2px solid ${isSelected ? 'var(--secondary)' : 'var(--border)'}`,
                        transform: isSelected ? 'translateY(-4px)' : 'translateY(0)',
                      }}
                    >
                      <div 
                        className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                        style={{
                          background: isSelected ? 'var(--secondary)' : 'var(--neutral-200)',
                          color: isSelected ? 'white' : 'var(--muted-foreground)',
                        }}
                      >
                        <Icon className="w-6 h-6" />
                      </div>
                      <p 
                        style={{ 
                          fontSize: 'var(--text-base)',
                          fontWeight: 'var(--font-weight-semibold)',
                          color: isSelected ? 'var(--secondary)' : 'var(--foreground)',
                        }}
                      >
                        {goal.label}
                      </p>
                      {isSelected && (
                        <CheckCircle2 
                          className="w-5 h-5 ml-auto" 
                          style={{ color: 'var(--secondary)' }} 
                        />
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* ========== STEP 3: PRÉFÉRENCES ========== */}
          {currentStep === 3 && (
            <div>
              <h2 
                className="mb-2 text-center"
                style={{ 
                  fontFamily: 'var(--font-display)',
                  fontSize: 'var(--text-3xl)',
                  fontWeight: 'var(--font-weight-bold)',
                  color: 'var(--foreground)',
                }}
              >
                Personnalisez votre parcours ✨
              </h2>
              <p 
                className="mb-8 text-center"
                style={{ 
                  fontSize: 'var(--text-base)',
                  color: 'var(--muted-foreground)',
                }}
              >
                Aidez-nous à vous recommander les meilleurs contenus
              </p>

              {/* Interests */}
              <div className="mb-8">
                <label 
                  className="mb-4 block"
                  style={{ 
                    fontSize: 'var(--text-lg)',
                    fontWeight: 'var(--font-weight-bold)',
                    color: 'var(--foreground)',
                  }}
                >
                  Centres d'intérêt
                </label>
                <div className="flex flex-wrap gap-3">
                  {INTERESTS.map((interest) => {
                    const isSelected = data.interests.includes(interest);

                    return (
                      <button
                        key={interest}
                        onClick={() => toggleInterest(interest)}
                        className="px-4 py-2 rounded-xl transition-all duration-300"
                        style={{
                          background: isSelected ? 'var(--accent)' : 'var(--neutral-100)',
                          color: isSelected ? 'white' : 'var(--foreground)',
                          fontSize: 'var(--text-sm)',
                          fontWeight: 'var(--font-weight-semibold)',
                          border: `2px solid ${isSelected ? 'var(--accent)' : 'transparent'}`,
                        }}
                      >
                        {interest}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Learning style */}
              <div className="mb-8">
                <label 
                  className="mb-4 block"
                  style={{ 
                    fontSize: 'var(--text-lg)',
                    fontWeight: 'var(--font-weight-bold)',
                    color: 'var(--foreground)',
                  }}
                >
                  Style d'apprentissage préféré
                </label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {LEARNING_STYLES.map((style) => {
                    const isSelected = data.learningStyle === style.id;

                    return (
                      <button
                        key={style.id}
                        onClick={() => setData({ ...data, learningStyle: style.id })}
                        className="p-4 rounded-2xl text-center transition-all duration-300"
                        style={{
                          background: isSelected ? 'var(--primary-lighter)' : 'var(--neutral-50)',
                          border: `2px solid ${isSelected ? 'var(--primary)' : 'var(--border)'}`,
                          transform: isSelected ? 'translateY(-4px)' : 'translateY(0)',
                        }}
                      >
                        <span style={{ fontSize: 'var(--text-3xl)', display: 'block', marginBottom: 'var(--space-2)' }}>
                          {style.emoji}
                        </span>
                        <p 
                          style={{ 
                            fontSize: 'var(--text-sm)',
                            fontWeight: 'var(--font-weight-semibold)',
                            color: isSelected ? 'var(--primary)' : 'var(--foreground)',
                            marginBottom: 'var(--space-1)',
                          }}
                        >
                          {style.label}
                        </p>
                        <p 
                          style={{ 
                            fontSize: 'var(--text-xs)',
                            color: 'var(--muted-foreground)',
                          }}
                        >
                          {style.description}
                        </p>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Availability */}
              <div>
                <label 
                  className="mb-4 block"
                  style={{ 
                    fontSize: 'var(--text-lg)',
                    fontWeight: 'var(--font-weight-bold)',
                    color: 'var(--foreground)',
                  }}
                >
                  Temps disponible par jour
                </label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {AVAILABILITY.map((avail) => {
                    const isSelected = data.availability === avail.id;

                    return (
                      <button
                        key={avail.id}
                        onClick={() => setData({ ...data, availability: avail.id })}
                        className="p-4 rounded-2xl text-center transition-all duration-300"
                        style={{
                          background: isSelected ? 'var(--success-100)' : 'var(--neutral-50)',
                          border: `2px solid ${isSelected ? 'var(--success-600)' : 'var(--border)'}`,
                          transform: isSelected ? 'translateY(-4px)' : 'translateY(0)',
                        }}
                      >
                        <span style={{ fontSize: 'var(--text-2xl)', display: 'block', marginBottom: 'var(--space-2)' }}>
                          {avail.emoji}
                        </span>
                        <p 
                          style={{ 
                            fontSize: 'var(--text-sm)',
                            fontWeight: 'var(--font-weight-semibold)',
                            color: isSelected ? 'var(--success-600)' : 'var(--foreground)',
                          }}
                        >
                          {avail.label}
                        </p>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {/* ========== STEP 4: CONFIRMATION ========== */}
          {currentStep === 4 && (
            <div className="text-center">
              <div 
                className="w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6"
                style={{
                  background: 'var(--gradient-primary)',
                }}
              >
                <CheckCircle2 className="w-12 h-12 text-white" />
              </div>

              <h2 
                className="mb-4"
                style={{ 
                  fontFamily: 'var(--font-display)',
                  fontSize: 'var(--text-3xl)',
                  fontWeight: 'var(--font-weight-bold)',
                  color: 'var(--foreground)',
                }}
              >
                Tout est prêt ! 🎉
              </h2>
              <p 
                className="mb-8 max-w-2xl mx-auto"
                style={{ 
                  fontSize: 'var(--text-base)',
                  color: 'var(--muted-foreground)',
                  lineHeight: 'var(--leading-relaxed)',
                }}
              >
                Nous avons personnalisé votre parcours d'apprentissage en fonction de vos objectifs et préférences. Vous êtes maintenant prêt à commencer votre aventure dans l'IA !
              </p>

              {/* Summary */}
              <div 
                className="p-6 rounded-2xl mb-8 text-left"
                style={{
                  background: 'var(--neutral-50)',
                }}
              >
                <h3 
                  className="mb-4"
                  style={{ 
                    fontSize: 'var(--text-lg)',
                    fontWeight: 'var(--font-weight-bold)',
                    color: 'var(--foreground)',
                  }}
                >
                  Récapitulatif
                </h3>

                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <User className="w-5 h-5 flex-shrink-0" style={{ color: 'var(--primary)' }} />
                    <div>
                      <p 
                        style={{ 
                          fontSize: 'var(--text-sm)',
                          fontWeight: 'var(--font-weight-semibold)',
                          color: 'var(--foreground)',
                        }}
                      >
                        Profil
                      </p>
                      <p 
                        style={{ 
                          fontSize: 'var(--text-sm)',
                          color: 'var(--muted-foreground)',
                        }}
                      >
                        {ROLES.find(r => r.id === data.role)?.label} • {EXPERIENCE_LEVELS.find(e => e.id === data.experience)?.label}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Target className="w-5 h-5 flex-shrink-0" style={{ color: 'var(--secondary)' }} />
                    <div>
                      <p 
                        style={{ 
                          fontSize: 'var(--text-sm)',
                          fontWeight: 'var(--font-weight-semibold)',
                          color: 'var(--foreground)',
                        }}
                      >
                        Objectifs
                      </p>
                      <p 
                        style={{ 
                          fontSize: 'var(--text-sm)',
                          color: 'var(--muted-foreground)',
                        }}
                      >
                        {data.goals.length} objectif(s) sélectionné(s)
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Sparkles className="w-5 h-5 flex-shrink-0" style={{ color: 'var(--accent)' }} />
                    <div>
                      <p 
                        style={{ 
                          fontSize: 'var(--text-sm)',
                          fontWeight: 'var(--font-weight-semibold)',
                          color: 'var(--foreground)',
                        }}
                      >
                        Préférences
                      </p>
                      <p 
                        style={{ 
                          fontSize: 'var(--text-sm)',
                          color: 'var(--muted-foreground)',
                        }}
                      >
                        {LEARNING_STYLES.find(s => s.id === data.learningStyle)?.label} • {AVAILABILITY.find(a => a.id === data.availability)?.label}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Navigation buttons */}
          <div className="flex items-center justify-between mt-8 pt-8 border-t" style={{ borderColor: 'var(--border)' }}>
            <div>
              {currentStep > 1 && (
                <ButtonEnhanced
                  variant="ghost"
                  size="md"
                  icon={<ArrowLeft className="w-5 h-5" />}
                  onClick={handleBack}
                >
                  Retour
                </ButtonEnhanced>
              )}
            </div>

            <div className="flex items-center gap-3">
              {onSkip && currentStep < 4 && (
                <ButtonEnhanced
                  variant="ghost"
                  size="md"
                  onClick={onSkip}
                >
                  Passer
                </ButtonEnhanced>
              )}

              <ButtonEnhanced
                variant="primary"
                size="md"
                icon={currentStep === STEPS.length ? <CheckCircle2 className="w-5 h-5" /> : <ArrowRight className="w-5 h-5" />}
                iconPosition="right"
                onClick={handleNext}
                disabled={!canProceed()}
              >
                {currentStep === STEPS.length ? 'Commencer mon parcours' : 'Continuer'}
              </ButtonEnhanced>
            </div>
          </div>
        </div>

        {/* Skip link */}
        {onSkip && currentStep < 4 && (
          <p className="text-center mt-6">
            <button
              onClick={onSkip}
              style={{ 
                fontSize: 'var(--text-sm)',
                color: 'var(--muted-foreground)',
                textDecoration: 'underline',
              }}
            >
              Passer l'onboarding et aller directement au dashboard
            </button>
          </p>
        )}
      </div>

      {/* ✅ Completion Celebration */}
      {showCelebration && (
        <Celebration
          type="achievement"
          title="🎉 Bienvenue dans The Learning App !"
          subtitle="Votre parcours personnalisé vous attend. Prêt à maîtriser l'IA ?"
          onClose={() => setShowCelebration(false)}
          duration={3000}
        />
      )}
    </div>
  );
}