import { useState } from 'react';
import { 
  ChevronLeft,
  Play,
  CheckCircle2,
  Lock,
  Clock,
  BookOpen,
  ChevronDown,
  ChevronUp,
  Notebook,
  FileText,
  HelpCircle,
  Target,
  Award,
  Sparkles,
  TrendingUp,
  Zap,
  ChevronRight,
  CircleDot,
  GraduationCap,
  Lightbulb,
  Briefcase,
  TrendingUp as TrendingUpIcon,
  Image as ImageIcon,
  Layers,
  PlayCircle,
  BookText,
} from 'lucide-react';
import { Button } from '../components/ui/button';
import { BackgroundBlobs } from '../components/ui/background-blobs';
import OptimizedSidebar from '../components/ui/optimized-sidebar';
import LessonViewer from './LessonViewer';
import ComplementaryContentViewer from './ComplementaryContentViewer';

interface CourseDetailPageProps {
  onNavigate: (page: 'dashboard' | 'parcours' | 'coaching' | 'learning-space' | 'profile' | 'plan' | 'veille' | 'entreprise-dashboard' | 'course-detail' | 'lesson' | 'project') => void;
  onLogout: () => void;
}

const courseData = {
  id: 1,
  title: 'Enjeux de la maîtrise du prompt',
  description: 'Apprenez à maîtriser l\'art du prompt engineering pour devenir un formateur augmenté par l\'IA',
  thumbnail: 'https://images.unsplash.com/photo-1676299081847-e9ca28c3d8f2?w=1200&h=600&fit=crop',
  level: 'Débutant',
  duration: '3h',
  steps: 2,
  completedSteps: 0,
  progress: 0,
  instructor: {
    name: 'Sophie Martin',
    title: 'Expert IA & Pédagogie',
    avatar: 'SM',
  },
  badge: {
    name: 'Prompt Designer',
    description: 'Certifie votre maîtrise du prompt engineering',
  },
  hasOpenBadgeAccess: true,
  learningObjectives: [
    {
      title: 'Maîtriser les composants fondamentaux',
      description: 'Comprendre les éléments clés d\'un prompt efficace',
      icon: Target,
    },
    {
      title: 'Contexte et rôle',
      description: 'Apprendre à définir le contexte et le persona appropriés',
      icon: Lightbulb,
    },
    {
      title: 'Créer des prompts adaptés',
      description: 'Concevoir des prompts personnalisés pour vos besoins',
      icon: Briefcase,
    },
    {
      title: 'Amélioration itérative',
      description: 'Évaluer et optimiser vos prompts progressivement',
      icon: TrendingUpIcon,
    },
  ],
};

const courseSteps = [
  {
    id: 1,
    title: 'Les Fondamentaux du Prompt : Anatomie et Composants',
    duration: '45 min',
    lessons: [
      { 
        id: 1, 
        title: 'Enjeux de la maîtrise du prompt', 
        duration: '15 min', 
        type: 'experience' as const, 
        completed: false,
        current: true,
        locked: false
      },
      { 
        id: 2, 
        title: 'Dialoguer avec l\'IA: Concepts théoriques', 
        duration: '15 min', 
        type: 'demonstration' as const, 
        completed: false,
        current: false,
        locked: false
      },
      { 
        id: 3, 
        title: 'La méthode simple pour bien prompter', 
        duration: '15 min', 
        type: 'reflection' as const, 
        completed: false,
        current: false,
        locked: false
      },
    ],
    completed: false,
    locked: false
  },
  {
    id: 2,
    title: 'Devenir prompt designer',
    duration: '1h 30min',
    lessons: [
      { 
        id: 4, 
        title: 'Le Rôle (Persona) : La Clé de l\'Expertise', 
        duration: '15 min', 
        type: 'demonstration' as const, 
        completed: false,
        current: false,
        locked: true
      },
      { 
        id: 5, 
        title: 'Le Contexte : Fournir le cadre de référence', 
        duration: '15 min', 
        type: 'reflection' as const, 
        completed: false,
        current: false,
        locked: true
      },
      { 
        id: 6, 
        title: 'La Tâche et le Format : Préciser la Mission et la Livraison', 
        duration: '20 min', 
        type: 'demonstration' as const, 
        completed: false,
        current: false,
        locked: true
      },
      { 
        id: 7, 
        title: 'Quiz : Maîtrise du prompt design', 
        duration: '10 min', 
        type: 'reflection' as const, 
        completed: false,
        current: false,
        locked: true
      },
      { 
        id: 8, 
        title: 'Exercice pratique : Créer votre premier prompt', 
        duration: '30 min', 
        type: 'application' as const, 
        completed: false,
        current: false,
        locked: true
      },
    ],
    completed: false,
    locked: false
  },
];

const complementaryContent = {
  1: [
    {
      id: 1,
      title: 'Flashcards d\'apprentissage',
      type: 'FLASHCARDS' as const,
      duration: '5 MIN',
      icon: Layers,
      color: 'var(--primary)',
    },
    {
      id: 2,
      title: 'Astuces pratiques avec images',
      type: 'ASTUCES' as const,
      duration: '5 MIN',
      icon: Zap,
      color: 'var(--accent)',
    },
    {
      id: 3,
      title: 'Guide complet du prompt engineering',
      type: 'GUIDE' as const,
      duration: '8 MIN',
      icon: BookText,
      color: 'var(--secondary)',
    },
  ],
  2: [
    {
      id: 4,
      title: 'Mémorisation avec flashcards',
      type: 'FLASHCARDS' as const,
      duration: '5 MIN',
      icon: Layers,
      color: 'var(--primary)',
    },
    {
      id: 5,
      title: 'Tutoriel vidéo : Créer votre premier prompt',
      type: 'VIDÉO' as const,
      duration: '12 MIN',
      icon: PlayCircle,
      color: 'var(--accent)',
    },
    {
      id: 6,
      title: 'Bibliothèque de 50 prompts pour formateurs',
      type: 'GUIDE' as const,
      duration: '10 MIN',
      icon: BookText,
      color: 'var(--secondary)',
    },
    {
      id: 7,
      title: 'Astuces clavier et productivité',
      type: 'ASTUCES' as const,
      duration: '4 MIN',
      icon: Zap,
      color: 'var(--accent)',
    },
    {
      id: 8,
      title: 'Framework RCIF expliqué',
      type: 'FLASHCARDS' as const,
      duration: '5 MIN',
      icon: Layers,
      color: 'var(--primary)',
    },
  ],
};

export default function CourseDetailPage({ onNavigate, onLogout }: CourseDetailPageProps) {
  const [expandedSteps, setExpandedSteps] = useState<number[]>([1, 2]);
  const [activeTab, setActiveTab] = useState<'steps' | 'project'>('steps');
  const [carouselIndex, setCarouselIndex] = useState(0);
  const [selectedLessonId, setSelectedLessonId] = useState<number | null>(null);
  const [selectedContentType, setSelectedContentType] = useState<'flashcards' | 'astuces' | 'guide' | 'video' | null>(null);
  const [selectedContentId, setSelectedContentId] = useState<number | null>(null);

  const toggleStep = (stepId: number) => {
    setExpandedSteps(prev =>
      prev.includes(stepId)
        ? prev.filter(id => id !== stepId)
        : [...prev, stepId]
    );
  };

  const totalLessons = courseSteps.reduce((sum, s) => sum + s.lessons.length, 0);
  const completedLessons = courseSteps.reduce((sum, s) => 
    sum + s.lessons.filter(l => l.completed).length, 0
  );

  const handleCarouselNext = (stepId: number) => {
    const contents = complementaryContent[stepId as keyof typeof complementaryContent];
    if (contents && contents.length > 3) {
      setCarouselIndex((prev) => Math.min(prev + 1, contents.length - 3));
    }
  };

  const handleCarouselPrev = (stepId: number) => {
    setCarouselIndex((prev) => Math.max(prev - 1, 0));
  };

  const handleLessonClick = (lessonId: number, isLocked: boolean) => {
    if (!isLocked) {
      setSelectedLessonId(lessonId);
    }
  };

  const handleCloseViewer = () => {
    setSelectedLessonId(null);
  };

  const handleContentClick = (contentId: number, contentType: string) => {
    setSelectedContentId(contentId);
    // Map content types to viewer types (remove accents and convert to lowercase)
    const typeMapping: { [key: string]: 'flashcards' | 'astuces' | 'guide' | 'video' } = {
      'flashcards': 'flashcards',
      'astuces': 'astuces',
      'guide': 'guide',
      'vidéo': 'video',
    };
    const normalizedType = typeMapping[contentType.toLowerCase()] || 'guide';
    setSelectedContentType(normalizedType);
  };

  const handleCloseContentViewer = () => {
    setSelectedContentId(null);
    setSelectedContentType(null);
  };

  return (
    <>
      {/* Lesson Viewer - Full Screen */}
      {selectedLessonId !== null && (
        <LessonViewer 
          lessonId={selectedLessonId} 
          onNavigate={(page) => {
            setSelectedLessonId(null);
            if (page === 'course-detail') {
              // Stay on course detail page
            } else {
              onNavigate(page);
            }
          }}
          onLogout={onLogout}
        />
      )}

      {/* Complementary Content Viewer Modal */}
      {selectedContentId !== null && (
        <ComplementaryContentViewer 
          contentId={selectedContentId} 
          contentType={selectedContentType} 
          onClose={handleCloseContentViewer}
        />
      )}

    <div className="min-h-screen relative overflow-hidden" style={{ background: 'var(--background)' }}>
      <BackgroundBlobs />

      <div className="flex h-screen">
        <OptimizedSidebar
          currentPage="parcours"
          onNavigate={onNavigate}
          onLogout={onLogout}
          userHasEnterpriseAccess={true}
          userName="Admin1509"
          userEmail="padennery@me.com"
          userInitials="A"
        />

        <main className="flex-1 overflow-y-auto">
          {/* ========== HERO SECTION WITH INTEGRATED PROGRESS ========== */}
          <div 
            className="relative pt-8 pb-12"
            style={{
              background: 'linear-gradient(135deg, #55A1B4 0%, #ED843A 100%)',
            }}
          >
            {/* Back button */}
            <button 
              onClick={() => onNavigate('parcours')}
              className="ml-8 mb-8 flex items-center gap-2 px-4 py-2 rounded-xl transition-all duration-300 hover:gap-3"
              style={{ 
                background: 'rgba(255, 255, 255, 0.2)',
                backdropFilter: 'blur(10px)',
                color: 'white',
                fontWeight: 'var(--font-weight-medium)',
                border: '1px solid rgba(255, 255, 255, 0.3)',
              }}
            >
              <ChevronLeft className="w-5 h-5" />
              Retour
            </button>

            {/* Content */}
            <div className="max-w-6xl mx-auto px-8 md:px-12 text-white">
              {/* Title */}
              <h1 
                className="mb-4"
                style={{ 
                  fontFamily: 'var(--font-display)',
                  fontSize: 'var(--text-5xl)',
                  fontWeight: 'var(--font-weight-bold)',
                  lineHeight: 'var(--leading-tight)',
                }}
              >
                {courseData.title}
              </h1>

              {/* Description */}
              <p 
                className="mb-8 max-w-3xl"
                style={{ 
                  fontSize: 'var(--text-xl)',
                  opacity: 0.95,
                  lineHeight: 'var(--leading-relaxed)',
                  fontFamily: 'var(--font-body)',
                }}
              >
                {courseData.description}
              </p>

              {/* Meta info */}
              <div className="flex items-center gap-8 mb-8">
                <div className="flex items-center gap-2">
                  <Clock className="w-5 h-5" />
                  <span style={{ fontSize: 'var(--text-base)' }}>{courseData.duration}</span>
                </div>
                <div className="flex items-center gap-2">
                  <BookOpen className="w-5 h-5" />
                  <span style={{ fontSize: 'var(--text-base)' }}>{courseData.steps} étapes</span>
                </div>
                <div className="flex items-center gap-2">
                  <GraduationCap className="w-5 h-5" />
                  <span style={{ fontSize: 'var(--text-base)' }}>{totalLessons} leçons</span>
                </div>
                <div className="flex items-center gap-2">
                  <CircleDot className="w-5 h-5" />
                  <span style={{ fontSize: 'var(--text-base)', fontWeight: 'var(--font-weight-semibold)' }}>{courseData.level}</span>
                </div>
              </div>

              {/* ========== PROGRESS BAR MINIMALISTE INTÉGRÉE ========== */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <span 
                      style={{ 
                        fontSize: 'var(--text-sm)',
                        fontWeight: 'var(--font-weight-medium)',
                        opacity: 0.9,
                      }}
                    >
                      Progression
                    </span>
                    <span 
                      style={{
                        fontSize: 'var(--text-sm)',
                        fontWeight: 'var(--font-weight-semibold)',
                        opacity: 0.95,
                      }}
                    >
                      {completedLessons} / {totalLessons} leçons
                    </span>
                  </div>
                  <span 
                    style={{ 
                      fontSize: 'var(--text-2xl)',
                      fontWeight: 'var(--font-weight-bold)',
                      fontFamily: 'var(--font-display)',
                    }}
                  >
                    {courseData.progress}%
                  </span>
                </div>
                
                {/* Progress Bar */}
                <div 
                  className="h-2 rounded-full overflow-hidden"
                  style={{ 
                    background: 'rgba(255, 255, 255, 0.25)',
                  }}
                >
                  <div 
                    className="h-full transition-all duration-1000 rounded-full"
                    style={{ 
                      width: `${courseData.progress}%`,
                      background: 'white',
                      boxShadow: '0 0 12px rgba(255, 255, 255, 0.5)',
                    }}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* ========== MAIN CONTENT ========== */}
          <div className="max-w-6xl mx-auto px-8 md:px-12 py-12">

            {/* ========== OBJECTIFS PÉDAGOGIQUES - DESIGN MINIMALISTE ========== */}
            <div className="mb-12">
              <h2 
                className="mb-8"
                style={{ 
                  fontFamily: 'var(--font-display)',
                  fontSize: 'var(--text-2xl)',
                  fontWeight: 'var(--font-weight-bold)',
                  color: 'var(--foreground)',
                }}
              >
                Ce que vous allez apprendre
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {courseData.learningObjectives.map((objective, index) => {
                  const Icon = objective.icon;
                  return (
                    <div 
                      key={index}
                      className="flex items-start gap-4 group"
                    >
                      <div 
                        className="w-11 h-11 rounded-2xl flex items-center justify-center flex-shrink-0 transition-transform duration-300 group-hover:scale-110"
                        style={{ 
                          background: 'var(--primary)',
                          boxShadow: '0 4px 12px rgba(85, 161, 180, 0.25)',
                        }}
                      >
                        <Icon className="w-5 h-5 text-white" />
                      </div>
                      <div className="flex-1 pt-1">
                        <p 
                          style={{ 
                            fontSize: 'var(--text-base)',
                            fontWeight: 'var(--font-weight-medium)',
                            color: 'var(--foreground)',
                            lineHeight: 'var(--leading-relaxed)',
                          }}
                        >
                          {objective.title}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* ========== NAVIGATION TABS - NOUVEAU DESIGN ========== */}
            <div className="mb-8">
              <div className="flex items-center gap-4 p-2 rounded-2xl" style={{ background: 'var(--neutral-100)' }}>
                <button
                  onClick={() => setActiveTab('steps')}
                  className="flex-1 px-6 py-4 rounded-xl flex items-center justify-center gap-3 transition-all duration-300"
                  style={activeTab === 'steps' ? {
                    background: 'white',
                    color: 'var(--foreground)',
                    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
                  } : {
                    background: 'transparent',
                    color: 'var(--muted-foreground)',
                  }}
                >
                  <BookOpen className="w-5 h-5" />
                  <span style={{ 
                    fontWeight: 'var(--font-weight-bold)',
                    fontSize: 'var(--text-base)',
                    fontFamily: 'var(--font-display)',
                  }}>
                    Étapes du parcours
                  </span>
                </button>

                <button
                  onClick={() => setActiveTab('project')}
                  className="flex-1 px-6 py-4 rounded-xl flex items-center justify-center gap-3 transition-all duration-300 relative"
                  style={activeTab === 'project' ? {
                    background: 'white',
                    color: 'var(--foreground)',
                    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
                  } : {
                    background: 'transparent',
                    color: 'var(--muted-foreground)',
                  }}
                >
                  {!courseData.hasOpenBadgeAccess && (
                    <Lock className="w-4 h-4 absolute top-3 right-3" style={{ color: 'var(--muted-foreground)' }} />
                  )}
                  <Award className="w-5 h-5" />
                  <span style={{ 
                    fontWeight: 'var(--font-weight-bold)',
                    fontSize: 'var(--text-base)',
                    fontFamily: 'var(--font-display)',
                  }}>
                    Projet final
                  </span>
                  {courseData.hasOpenBadgeAccess && (
                    <span 
                      className="px-2.5 py-1 rounded-lg"
                      style={{
                        background: activeTab === 'project' ? 'var(--secondary)' : 'var(--neutral-200)',
                        color: activeTab === 'project' ? 'white' : 'var(--muted-foreground)',
                        fontSize: 'var(--text-sm)',
                        fontWeight: 'var(--font-weight-bold)',
                      }}
                    >
                      Badge
                    </span>
                  )}
                </button>
              </div>
            </div>

            {/* ========== TAB CONTENT ========== */}
            <div 
              className="rounded-3xl overflow-hidden"
              style={{
                background: 'white',
                border: '1px solid var(--border)',
                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.04)',
              }}
            >
              <div className="p-10">
                {activeTab === 'steps' && (
                  <div className="space-y-8">
                    {courseSteps.map((step, index) => {
                      const stepCompletedLessons = step.lessons.filter(l => l.completed).length;
                      const stepProgress = Math.round((stepCompletedLessons / step.lessons.length) * 100);
                      const contents = complementaryContent[step.id as keyof typeof complementaryContent];
                      const hasCarousel = contents && contents.length > 3;
                      const visibleContents = hasCarousel 
                        ? contents.slice(carouselIndex, carouselIndex + 3)
                        : contents;
                      
                      return (
                        <div
                          key={step.id}
                          className="rounded-3xl overflow-hidden transition-all duration-300"
                          style={{
                            background: step.completed 
                              ? 'var(--success-50)' 
                              : step.locked
                                ? 'var(--neutral-50)'
                                : 'var(--neutral-50)',
                            border: `2px solid ${
                              step.completed 
                                ? 'var(--success-300)' 
                                : step.locked
                                  ? 'var(--neutral-300)'
                                  : 'var(--border)'
                            }`,
                          }}
                        >
                          {/* Step Header */}
                          <button
                            onClick={() => !step.locked && toggleStep(step.id)}
                            className="w-full p-4 md:p-8 flex items-start gap-4 md:gap-6 hover:bg-white/50 transition-colors"
                            disabled={step.locked}
                          >
                            {/* Number badge */}
                            <div 
                              className="w-20 h-20 rounded-3xl flex items-center justify-center flex-shrink-0"
                              style={{ 
                                background: step.completed 
                                  ? 'var(--success)' 
                                  : step.locked
                                    ? 'var(--neutral-300)'
                                    : 'var(--primary)',
                                boxShadow: step.completed 
                                  ? '0 8px 24px rgba(34, 197, 94, 0.25)' 
                                  : step.locked
                                    ? 'none'
                                    : '0 8px 24px rgba(85, 161, 180, 0.25)',
                              }}
                            >
                              {step.locked ? (
                                <Lock className="w-8 h-8 text-white" />
                              ) : step.completed ? (
                                <CheckCircle2 className="w-9 h-9 text-white" />
                              ) : (
                                <span 
                                  className="text-white"
                                  style={{ 
                                    fontFamily: 'var(--font-display)',
                                    fontWeight: 'var(--font-weight-bold)',
                                    fontSize: 'var(--text-3xl)',
                                  }}
                                >
                                  {index + 1}
                                </span>
                              )}
                            </div>

                            <div className="flex-1 text-left">
                              <div className="flex items-start justify-between mb-4">
                                <div className="flex-1">
                                  <h3 
                                    className="mb-3"
                                    style={{ 
                                      fontFamily: 'var(--font-display)',
                                      fontSize: 'var(--text-2xl)',
                                      fontWeight: 'var(--font-weight-bold)',
                                      color: step.locked ? 'var(--muted-foreground)' : 'var(--foreground)',
                                      lineHeight: 'var(--leading-tight)',
                                    }}
                                  >
                                    {step.title}
                                  </h3>
                                  <div 
                                    className="flex items-center gap-6 flex-wrap"
                                    style={{ 
                                      fontSize: 'var(--text-sm)',
                                      color: 'var(--muted-foreground)',
                                    }}
                                  >
                                    <div className="flex items-center gap-2">
                                      <BookOpen className="w-4 h-4" />
                                      <span>{step.lessons.length} leçons</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                      <Clock className="w-4 h-4" />
                                      <span>{step.duration}</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                      <TrendingUp className="w-4 h-4" />
                                      <span>{stepCompletedLessons} / {step.lessons.length} complétées</span>
                                    </div>
                                  </div>
                                </div>

                                <div className="flex items-center gap-3">
                                  {step.locked && (
                                    <div 
                                      className="px-4 py-2 rounded-xl"
                                      style={{
                                        background: 'var(--neutral-200)',
                                        color: 'var(--muted-foreground)',
                                      }}
                                    >
                                      <p 
                                        style={{ 
                                          fontSize: 'var(--text-xs)',
                                          fontWeight: 'var(--font-weight-bold)',
                                          letterSpacing: 'var(--tracking-wide)',
                                        }}
                                      >
                                        🔒 VERROUILLÉ
                                      </p>
                                    </div>
                                  )}
                                  {step.completed && (
                                    <div 
                                      className="px-4 py-2 rounded-xl"
                                      style={{
                                        background: 'var(--success)',
                                        color: 'white',
                                      }}
                                    >
                                      <p 
                                        style={{ 
                                          fontSize: 'var(--text-xs)',
                                          fontWeight: 'var(--font-weight-bold)',
                                          letterSpacing: 'var(--tracking-wide)',
                                        }}
                                      >
                                        ✓ VALIDÉ
                                      </p>
                                    </div>
                                  )}
                                  {!step.locked && (
                                    expandedSteps.includes(step.id) ? (
                                      <ChevronUp className="w-6 h-6" style={{ color: 'var(--foreground)' }} />
                                    ) : (
                                      <ChevronDown className="w-6 h-6" style={{ color: 'var(--foreground)' }} />
                                    )
                                  )}
                                </div>
                              </div>

                              {/* Progress bar */}
                              {!step.completed && !step.locked && (
                                <div className="mt-5">
                                  <div className="flex items-center justify-between mb-2">
                                    <span 
                                      style={{ 
                                        fontSize: 'var(--text-xs)',
                                        color: 'var(--muted-foreground)',
                                        fontWeight: 'var(--font-weight-medium)',
                                      }}
                                    >
                                      Progression de l'étape
                                    </span>
                                    <span 
                                      style={{ 
                                        fontSize: 'var(--text-sm)',
                                        fontWeight: 'var(--font-weight-bold)',
                                        color: 'var(--primary)',
                                      }}
                                    >
                                      {stepProgress}%
                                    </span>
                                  </div>
                                  <div 
                                    className="h-2.5 rounded-full overflow-hidden"
                                    style={{ background: 'var(--neutral-200)' }}
                                  >
                                    <div 
                                      className="h-full transition-all duration-500"
                                      style={{ 
                                        width: `${stepProgress}%`,
                                        background: 'var(--primary)',
                                      }}
                                    />
                                  </div>
                                </div>
                              )}
                            </div>
                          </button>

                          {/* Step Lessons */}
                          {expandedSteps.includes(step.id) && !step.locked && (
                            <div className="px-4 md:px-8 pb-6 md:pb-8 pt-3 md:pt-4">
                              <div className="space-y-3">
                                {step.lessons.map((lesson, lessonIndex) => {
                                  return (
                                    <div
                                      key={lesson.id}
                                      className={`
                                        p-4 md:p-5 rounded-2xl flex items-center justify-between group
                                        ${lesson.locked ? 'opacity-60 cursor-not-allowed' : 'hover:-translate-y-1 cursor-pointer'}
                                        transition-all duration-300
                                      `}
                                      style={{
                                        background: lesson.completed 
                                          ? 'var(--success-100)' 
                                          : lesson.current
                                            ? 'var(--secondary-50)'
                                            : lesson.locked
                                              ? 'var(--neutral-100)'
                                              : 'white',
                                        border: `2px solid ${
                                          lesson.completed 
                                            ? 'var(--success-300)' 
                                            : lesson.current
                                              ? 'var(--secondary-300)'
                                              : lesson.locked
                                                ? 'var(--neutral-300)'
                                                : 'var(--border)'
                                        }`,
                                      }}
                                      onClick={() => handleLessonClick(lesson.id, lesson.locked)}
                                    >
                                      <div className="flex items-center gap-4 flex-1">
                                        <div 
                                          className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                                          style={{ 
                                            background: lesson.completed 
                                              ? 'var(--success)' 
                                              : lesson.current
                                                ? 'var(--secondary)'
                                                : lesson.locked
                                                  ? 'var(--neutral-300)'
                                                  : 'var(--primary-100)',
                                          }}
                                        >
                                          {lesson.locked ? (
                                            <Lock 
                                              className="w-5 h-5" 
                                              style={{ color: 'var(--muted-foreground)' }} 
                                            />
                                          ) : lesson.completed ? (
                                            <CheckCircle2 
                                              className="w-6 h-6 text-white" 
                                            />
                                          ) : (
                                            <Notebook 
                                              className="w-5 h-5" 
                                              style={{ 
                                                color: lesson.current ? 'white' : 'var(--primary)' 
                                              }} 
                                            />
                                          )}
                                        </div>
                                        <div className="flex-1">
                                          <p 
                                            className="mb-1"
                                            style={{ 
                                              fontSize: 'var(--text-base)',
                                              fontWeight: 'var(--font-weight-semibold)',
                                              color: lesson.locked ? 'var(--muted-foreground)' : 'var(--foreground)',
                                            }}
                                          >
                                            {lesson.title}
                                          </p>
                                          <div className="flex items-center gap-3">
                                            <span 
                                              style={{ 
                                                fontSize: 'var(--text-xs)',
                                                color: 'var(--muted-foreground)',
                                              }}
                                            >
                                              {lesson.duration}
                                            </span>
                                            {lesson.locked && (
                                              <span 
                                                className="px-2.5 py-1 rounded-lg"
                                                style={{
                                                  background: 'var(--neutral-200)',
                                                  color: 'var(--muted-foreground)',
                                                  fontSize: 'var(--text-xs)',
                                                  fontWeight: 'var(--font-weight-bold)',
                                                }}
                                              >
                                                VERROUILLÉ
                                              </span>
                                            )}
                                          </div>
                                        </div>
                                      </div>

                                      {lesson.current && !lesson.locked && (
                                        <Button 
                                          size="sm"
                                          className="gap-2 opacity-0 group-hover:opacity-100 transition-opacity"
                                          style={{ 
                                            background: 'var(--secondary)',
                                            color: 'white',
                                            fontWeight: 'var(--font-weight-semibold)',
                                          }}
                                          onClick={(e) => {
                                            e.stopPropagation();
                                            handleLessonClick(lesson.id, lesson.locked);
                                          }}
                                        >
                                          <Play className="w-4 h-4" />
                                          Continuer
                                        </Button>
                                      )}
                                    </div>
                                  );
                                })}
                              </div>

                              {/* Contenus complémentaires */}
                              {contents && (
                                <div className="mt-10 pt-10" style={{ borderTop: '2px solid var(--border)' }}>
                                  <h4 
                                    className="mb-6 flex items-center gap-3"
                                    style={{ 
                                      fontFamily: 'var(--font-display)',
                                      fontSize: 'var(--text-xl)',
                                      fontWeight: 'var(--font-weight-bold)',
                                      color: 'var(--foreground)',
                                    }}
                                  >
                                    <Sparkles className="w-6 h-6" style={{ color: 'var(--accent)' }} />
                                    Contenus complémentaires
                                  </h4>
                                  
                                  <div className="relative">
                                    {hasCarousel && (
                                      <>
                                        {carouselIndex > 0 && (
                                          <button
                                            onClick={() => handleCarouselPrev(step.id)}
                                            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-6 z-10 w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110"
                                            style={{
                                              background: 'var(--primary)',
                                              color: 'white',
                                              boxShadow: '0 4px 12px rgba(85, 161, 180, 0.3)',
                                            }}
                                          >
                                            <ChevronLeft className="w-6 h-6" />
                                          </button>
                                        )}

                                        {carouselIndex < contents.length - 3 && (
                                          <button
                                            onClick={() => handleCarouselNext(step.id)}
                                            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-6 z-10 w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110"
                                            style={{
                                              background: 'var(--primary)',
                                              color: 'white',
                                              boxShadow: '0 4px 12px rgba(85, 161, 180, 0.3)',
                                            }}
                                          >
                                            <ChevronRight className="w-6 h-6" />
                                          </button>
                                        )}
                                      </>
                                    )}

                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                                      {visibleContents?.map((content) => {
                                        const Icon = content.icon;
                                        return (
                                          <div
                                            key={content.id}
                                            className="p-6 cursor-pointer transition-all hover:-translate-y-2 group relative overflow-hidden"
                                            style={{
                                              background: 'white',
                                              border: '1px solid var(--border)',
                                              boxShadow: '0 2px 8px rgba(0, 0, 0, 0.04)',
                                              borderRadius: 'var(--radius-2xl)',
                                              transitionDuration: 'var(--duration-slow)',
                                            }}
                                            onMouseEnter={(e) => {
                                              e.currentTarget.style.boxShadow = `0 8px 24px ${content.color}30`;
                                              e.currentTarget.style.borderColor = content.color;
                                            }}
                                            onMouseLeave={(e) => {
                                              e.currentTarget.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.04)';
                                              e.currentTarget.style.borderColor = 'var(--border)';
                                            }}
                                            onClick={() => handleContentClick(content.id, content.type)}
                                          >
                                            <div className="flex items-center justify-between mb-4">
                                              <span 
                                                className="px-3 py-1.5 uppercase flex items-center gap-2"
                                                style={{
                                                  background: `${content.color}15`,
                                                  color: content.color,
                                                  fontSize: 'var(--text-xs)',
                                                  fontWeight: 'var(--font-weight-bold)',
                                                  borderRadius: 'var(--radius-lg)',
                                                  letterSpacing: 'var(--tracking-wide)',
                                                }}
                                              >
                                                <Icon className="w-4 h-4" />
                                                {content.type}
                                              </span>
                                              <span 
                                                style={{
                                                  fontSize: 'var(--text-xs)',
                                                  color: 'var(--muted-foreground)',
                                                  fontWeight: 'var(--font-weight-semibold)',
                                                }}
                                              >
                                                {content.duration}
                                              </span>
                                            </div>

                                            <h5 
                                              style={{
                                                fontSize: 'var(--text-base)',
                                                fontWeight: 'var(--font-weight-semibold)',
                                                color: 'var(--foreground)',
                                                lineHeight: 'var(--leading-snug)',
                                                fontFamily: 'var(--font-body)',
                                              }}
                                            >
                                              {content.title}
                                            </h5>
                                          </div>
                                        );
                                      })}
                                    </div>
                                  </div>
                                </div>
                              )}
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                )}

                {activeTab === 'project' && (
                  <div className="space-y-6">
                    {!courseData.hasOpenBadgeAccess ? (
                      <div 
                        className="p-16 rounded-3xl relative overflow-hidden text-center"
                        style={{
                          background: 'var(--neutral-50)',
                          border: '2px solid var(--neutral-300)',
                        }}
                      >
                        <div 
                          className="w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6"
                          style={{ 
                            background: 'var(--neutral-300)',
                          }}
                        >
                          <Lock className="w-12 h-12" style={{ color: 'var(--muted-foreground)' }} />
                        </div>
                        
                        <h3 
                          className="mb-4"
                          style={{ 
                            fontFamily: 'var(--font-display)',
                            fontSize: 'var(--text-2xl)',
                            fontWeight: 'var(--font-weight-bold)',
                            color: 'var(--foreground)',
                          }}
                        >
                          Projet final verrouillé
                        </h3>
                        
                        <p 
                          className="mb-8 max-w-2xl mx-auto"
                          style={{ 
                            fontSize: 'var(--text-base)',
                            color: 'var(--muted-foreground)',
                            lineHeight: 'var(--leading-relaxed)',
                          }}
                        >
                          Complétez toutes les étapes du parcours pour déverrouiller le projet final et obtenir votre badge Open Badge.
                        </p>

                        <Button 
                          disabled
                          style={{ 
                            background: 'var(--neutral-300)',
                            color: 'var(--muted-foreground)',
                            cursor: 'not-allowed',
                          }}
                        >
                          <Lock className="w-4 h-4 mr-2" />
                          Accès restreint
                        </Button>
                      </div>
                    ) : (
                      <div 
                        className="p-12 rounded-3xl relative overflow-hidden cursor-pointer transition-all duration-500 hover:-translate-y-2"
                        style={{
                          background: 'var(--secondary-50)',
                          border: '2px solid var(--secondary-300)',
                        }}
                        onClick={() => onNavigate('project')}
                      >
                        <div className="flex items-start gap-8">
                          <div 
                            className="w-32 h-32 rounded-3xl flex items-center justify-center flex-shrink-0"
                            style={{ 
                              background: 'var(--secondary)',
                              boxShadow: '0 12px 40px rgba(237, 132, 58, 0.3)',
                            }}
                          >
                            <Award className="w-16 h-16 text-white" />
                          </div>

                          <div className="flex-1">
                            <h3 
                              className="mb-4"
                              style={{ 
                                fontFamily: 'var(--font-display)',
                                fontSize: 'var(--text-3xl)',
                                fontWeight: 'var(--font-weight-bold)',
                                color: 'var(--foreground)',
                              }}
                            >
                              {courseData.badge.name}
                            </h3>
                            
                            <p 
                              className="mb-6"
                              style={{ 
                                fontSize: 'var(--text-lg)',
                                color: 'var(--muted-foreground)',
                                lineHeight: 'var(--leading-relaxed)',
                              }}
                            >
                              {courseData.badge.description}
                            </p>

                            <Button 
                              size="lg"
                              className="gap-2"
                              style={{ 
                                background: 'var(--secondary)',
                                color: 'white',
                                fontWeight: 'var(--font-weight-semibold)',
                              }}
                            >
                              <Play className="w-5 h-5" />
                              Commencer le projet final
                            </Button>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>

          </div>
        </main>
      </div>
    </div>
    </>
  );
}