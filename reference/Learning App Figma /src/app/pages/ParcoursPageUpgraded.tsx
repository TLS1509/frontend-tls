import { useState } from 'react';
import { 
  ArrowRight,
  PlayCircle,
  Award,
  TrendingUp,
  Target,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  Video,
  Map,
} from 'lucide-react';
import { BackgroundBlobs } from '../components/ui/background-blobs';
import OptimizedSidebar from '../components/ui/optimized-sidebar';
import { PageHeaderSimple } from '../components/common/PageHeaderSimple';
import { SectionHeader } from '../components/common/SectionHeader';

// ✅ Import upgraded components
import { Tooltip } from '../components/ui/tooltip';
import { ButtonEnhanced } from '../components/ui/button-enhanced';
import { Celebration } from '../components/ui/celebration';
import { EmptyState } from '../components/ui/empty-state';
import { defaultGlassStyle, glassHoverHandlersWithLift } from '../utils/glassStyles';
import PositionnementModal from '../components/modals/PositionnementModal';

interface ParcoursPageProps {
  onNavigate: (page: 'dashboard' | 'parcours' | 'coaching' | 'learning-space' | 'profile' | 'veille' | 'entreprise-dashboard' | 'course-detail' | 'lesson' | 'journal' | 'account') => void;
  onLogout: () => void;
}

// ✅ UPGRADED: Parcours data with lessons
const parcoursList = [
  {
    id: 1,
    title: 'Maîtriser l\'IA pour la Formation',
    description: 'Découvrez comment intégrer l\'IA dans vos pratiques pédagogiques pour créer des formations innovantes',
    color: 'var(--primary)',
    colorLight: 'var(--primary-lighter)',
    progress: 68,
    status: 'En cours',
    lessons: { completed: 24, total: 35 },
    duration: '12h',
    level: 'Intermédiaire',
    stages: 4,
  },
  {
    id: 2,
    title: 'Devenir Prompt Designer',
    description: 'Maîtrisez l\'art du prompt engineering pour des résultats optimaux avec l\'IA générative',
    color: 'var(--secondary)',
    colorLight: 'var(--secondary-lighter)',
    progress: 22,
    status: 'En cours',
    lessons: { completed: 8, total: 28 },
    duration: '8h',
    level: 'Avancé',
    stages: 3,
  },
  {
    id: 3,
    title: 'Créer des Contenus Pédagogiques avec l\'IA',
    description: 'Générez du contenu éducatif de qualité avec l\'intelligence artificielle',
    color: 'var(--accent)',
    colorLight: 'var(--accent-lighter)',
    progress: 0,
    status: 'Pas commencé',
    lessons: { completed: 0, total: 42 },
    duration: '15h',
    level: 'Débutant',
    stages: 5,
  },
];

export default function ParcoursPageUpgraded({ onNavigate, onLogout }: ParcoursPageProps) {
  const [showStepComplete, setShowStepComplete] = useState(false);
  const [completedStep, setCompletedStep] = useState('');
  const [showModuleComplete, setShowModuleComplete] = useState(false);
  const [completedModule, setCompletedModule] = useState('');
  const [expandedParcours, setExpandedParcours] = useState<number[]>([]);
  
  // ✅ Positionnement Modal State
  const [isPositionnementModalOpen, setIsPositionnementModalOpen] = useState(false);
  const [selectedParcoursForPositionnement, setSelectedParcoursForPositionnement] = useState<typeof parcoursList[0] | null>(null);

  // Calculate overall progress
  const totalLessons = parcoursList.reduce((sum, p) => sum + p.lessons.total, 0);
  const completedLessons = parcoursList.reduce((sum, p) => sum + p.lessons.completed, 0);
  const overallProgress = Math.round((completedLessons / totalLessons) * 100);

  const handleStepComplete = (stepName: string) => {
    setCompletedStep(stepName);
    setShowStepComplete(true);
  };

  const toggleExpand = (parcoursId: number) => {
    setExpandedParcours(prev => 
      prev.includes(parcoursId) 
        ? prev.filter(id => id !== parcoursId)
        : [...prev, parcoursId]
    );
  };

  return (
    <div className="min-h-screen relative overflow-hidden" style={{ background: 'linear-gradient(to bottom right, var(--primary-50), white, var(--accent-50))' }}>

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
          {/* ✅ CONTENEUR PRINCIPAL - Standard TLS harmonisé */}
          <div style={{
            maxWidth: '1152px',
            margin: '0 auto',
            padding: 'var(--space-10)',
            paddingBottom: 'var(--space-12)',
          }}>
            {/* ========== HEADER ========== */}
            <div style={{ 
              display: 'flex',
              flexDirection: 'column',
              gap: 'var(--space-0-5)',
              marginBottom: 'var(--space-2)',
            }}>
              <h1 
                style={{ 
                  fontFamily: 'var(--font-display)', 
                  fontSize: 'var(--text-4xl)', 
                  fontWeight: 'var(--font-weight-bold)', 
                  color: 'var(--foreground)', 
                  lineHeight: 'var(--leading-tight)', 
                  margin: 0,
                }}
              >
                Mes Parcours
              </h1>
              
              <p 
                style={{ 
                  fontFamily: 'var(--font-body)', 
                  fontSize: 'var(--text-base)', 
                  fontWeight: 'var(--font-weight-medium)', 
                  color: 'var(--muted-foreground)', 
                  lineHeight: 'var(--leading-normal)', 
                  margin: 0,
                }}
              >
                Explorez vos parcours de formation et suivez votre progression
              </p>
            </div>

            {/* ========== DIVIDER SUBTIL ========== */}
            <div style={{ 
              width: '100%',
              height: '1px',
              background: 'var(--border)',
              marginTop: 'var(--space-5)',
              marginBottom: 'var(--space-10)',
              opacity: 0.3,
            }} />

            {/* ========== PARCOURS GRID CONTAINER (Plus centré) ========== */}
            <div style={{
              maxWidth: '900px', // Container plus étroit que le 1152px de la page
              margin: '0 auto',
            }}>
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(3, 1fr)',
                gap: 'var(--space-5)',
              }}>
                {parcoursList.map((parcours, index) => {
                  // Pattern de couleurs : bleu, orange, jaune, orange, jaune, bleu
                  const colorPattern = ['var(--primary)', 'var(--secondary)', 'var(--accent)', 'var(--secondary)', 'var(--accent)', 'var(--primary)'];
                  const cardColor = colorPattern[index % 6];
                  
                  return (
                    <div
                      key={parcours.id}
                      style={{
                        ...defaultGlassStyle,
                        borderRadius: 'var(--radius-2xl)',
                        overflow: 'hidden',
                        height: '100%',
                        display: 'flex',
                        flexDirection: 'column',
                        cursor: 'pointer',
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.transform = 'translateY(-4px)';
                        e.currentTarget.style.background = 'linear-gradient(135deg, rgba(255, 255, 255, 0.7) 0%, rgba(255, 255, 255, 0.5) 100%)';
                        e.currentTarget.style.boxShadow = '0 12px 40px 0 rgba(0, 0, 0, 0.12), 0 1px 0 0 rgba(255, 255, 255, 1) inset';
                        e.currentTarget.style.backdropFilter = 'blur(30px)';
                        e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 1)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.transform = 'translateY(0)';
                        e.currentTarget.style.background = 'linear-gradient(135deg, rgba(255, 255, 255, 0.6) 0%, rgba(255, 255, 255, 0.4) 100%)';
                        e.currentTarget.style.boxShadow = '0 4px 16px 0 rgba(0, 0, 0, 0.06), 0 1px 0 0 rgba(255, 255, 255, 0.8) inset';
                        e.currentTarget.style.backdropFilter = 'blur(20px)';
                        e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.8)';
                      }}
                    >
                      {/* Gradient Glow Background */}
                      <div 
                        className="absolute inset-0 opacity-20"
                        style={{
                          background: `radial-gradient(circle at 50% 0%, ${
                            parcours.color.includes('--primary') ? 'rgba(85, 161, 180, 0.15)' :
                            parcours.color.includes('--secondary') ? 'rgba(237, 132, 58, 0.15)' :
                            'rgba(248, 176, 68, 0.15)'
                          } 0%, transparent 70%)`,
                          pointerEvents: 'none',
                        }}
                      />

                      {/* Content Container - Padding augmenté */}
                      <div style={{
                        position: 'relative',
                        padding: 'var(--space-6)', // 24px - Padding augmenté (au lieu de 20px)
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 'var(--space-4)', // 16px - Gap augmenté (au lieu de 12px)
                        height: '100%',
                      }}>
                      
                      {/* Title - Left Aligned */}
                      <h3 
                        style={{ 
                          fontFamily: 'var(--font-display)',
                          fontSize: 'var(--text-lg)',
                          fontWeight: 'var(--font-weight-bold)',
                          color: cardColor,
                          lineHeight: 'var(--leading-tight)',
                          margin: 0,
                          wordWrap: 'break-word',
                          overflowWrap: 'break-word',
                          hyphens: 'auto',
                        }}
                      >
                        {parcours.title}
                      </h3>

                      {/* Description */}
                      <p 
                        style={{ 
                          fontSize: 'var(--text-sm)', // 14px
                          color: 'var(--muted-foreground)',
                          fontFamily: 'var(--font-body)',
                          lineHeight: 'var(--leading-normal)',
                          margin: 0,
                          display: '-webkit-box',
                          WebkitLineClamp: 2,
                          WebkitBoxOrient: 'vertical',
                          overflow: 'hidden',
                        }}
                      >
                        {parcours.description}
                      </p>

                      {/* Spacer to push progress and button to bottom */}
                      <div style={{ flexGrow: 1 }} />

                      {/* Bottom Section: Progress + Button */}
                      <div style={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 'var(--space-3)', // 12px - Gap réduit
                      }}>
                        {/* Progress Bar - SANS encart */}
                        <div style={{ 
                          display: 'flex', 
                          alignItems: 'center', 
                          gap: 'var(--space-2)',
                        }}>
                          <div
                            style={{
                              flex: 1,
                              height: '6px',
                              background: 'rgba(0, 0, 0, 0.06)',
                              borderRadius: 'var(--radius-full)',
                              overflow: 'hidden',
                            }}
                          >
                            <div
                              style={{
                                width: `${parcours.progress}%`,
                                height: '100%',
                                background: `linear-gradient(90deg, ${parcours.color} 0%, ${parcours.color} 100%)`,
                                borderRadius: 'var(--radius-full)',
                                transition: 'width var(--duration-slow) var(--ease-out)',
                              }}
                            />
                          </div>
                          <span 
                            style={{
                              fontSize: 'var(--text-sm)',
                              fontWeight: 'var(--font-weight-bold)',
                              color: cardColor,
                              fontFamily: 'var(--font-display)',
                              minWidth: '45px',
                              textAlign: 'right',
                            }}
                          >
                            {parcours.progress}%
                          </span>
                        </div>

                        {/* CTA Button */}
                        <button
                          onClick={() => {
                            // ✅ If parcours not started (progress === 0), show positioning modal
                            if (parcours.progress === 0) {
                              setSelectedParcoursForPositionnement(parcours);
                              setIsPositionnementModalOpen(true);
                            } else {
                              // Continue to course detail
                              onNavigate('course-detail', parcours.id);
                            }
                          }}
                          style={{
                            width: '100%',
                            borderRadius: 'var(--radius-lg)',
                            transition: 'all var(--duration-base) var(--ease-out)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: 'var(--space-2)',
                            background: `linear-gradient(135deg, ${parcours.color} 0%, ${parcours.color} 100%)`,
                            boxShadow: `0 4px 12px ${
                              parcours.color.includes('--primary') ? 'rgba(85, 161, 180, 0.25)' :
                              parcours.color.includes('--secondary') ? 'rgba(237, 132, 58, 0.25)' :
                              'rgba(248, 176, 68, 0.25)'
                            }`,
                            fontSize: 'var(--text-sm)',
                            fontWeight: 'var(--font-weight-semibold)',
                            fontFamily: 'var(--font-body)',
                            color: 'white',
                            border: 'none',
                            cursor: 'pointer',
                            padding: 'var(--space-2-5) 0',
                            height: '40px',
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.transform = 'translateY(-1px)';
                            e.currentTarget.style.boxShadow = `0 6px 16px ${
                              parcours.color.includes('--primary') ? 'rgba(85, 161, 180, 0.35)' :
                              parcours.color.includes('--secondary') ? 'rgba(237, 132, 58, 0.35)' :
                              'rgba(248, 176, 68, 0.35)'
                            }`;
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.transform = 'translateY(0)';
                            e.currentTarget.style.boxShadow = `0 4px 12px ${
                              parcours.color.includes('--primary') ? 'rgba(85, 161, 180, 0.25)' :
                              parcours.color.includes('--secondary') ? 'rgba(237, 132, 58, 0.25)' :
                              'rgba(248, 176, 68, 0.25)'
                            }`;
                          }}
                        >
                          <span>{parcours.progress > 0 ? 'Continuer le parcours' : 'Commencer le parcours'}</span>
                          {parcours.progress > 0 ? (
                            <ArrowRight style={{ width: '16px', height: '16px' }} />
                          ) : (
                            <PlayCircle style={{ width: '16px', height: '16px' }} />
                          )}
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
            </div>
          </div>
        </main>
      </div>

      {/* Celebration Modal */}
      {showModuleComplete && (
        <Celebration
          title="Module terminé !"
          message={`Félicitations ! Vous avez terminé ${completedModule}`}
          onClose={() => setShowModuleComplete(false)}
        />
      )}

      {/* ✅ Positionnement Modal - Intégration avant début de parcours */}
      <PositionnementModal 
        isOpen={isPositionnementModalOpen}
        onClose={() => {
          setIsPositionnementModalOpen(false);
          setSelectedParcoursForPositionnement(null);
        }}
        courseTitle={selectedParcoursForPositionnement?.title}
        courseId={selectedParcoursForPositionnement?.id.toString()}
        onComplete={(responses, competences) => {
          console.log('✅ Positionnement completed for:', selectedParcoursForPositionnement?.title);
          console.log('📊 Responses:', responses);
          console.log('🎯 Competences mapped to profile:', competences);
          
          // ✅ TODO V2: Integrate with Passport de Compétences
          // - Save competences to user profile
          // - Trigger adaptive learning engine
          // - Personalize course content based on level
        }}
        onStartCourse={() => {
          // Navigate to course detail after positioning
          onNavigate('course-detail');
        }}
      />
    </div>
  );
}
