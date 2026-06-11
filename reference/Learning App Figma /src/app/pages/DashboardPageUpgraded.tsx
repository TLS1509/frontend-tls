import { useState, useEffect } from 'react';
import { 
  Map, Users, PenLine, Sparkles, TrendingUp, CheckCircle2, Award, ArrowRight, BookMarked, Ruler,
} from 'lucide-react';
import OptimizedSidebar from '../components/ui/optimized-sidebar';
import { BackgroundBlobs } from '../components/ui/background-blobs';
import { ActionCard } from '../components/patterns/CardPatterns';
import { JournalPromptCard, ActivityCard } from '../components/patterns/CardPatterns';
import { getDailyQuote } from '../data/learningQuotes';
import { getDescriptivePhrase } from '../data/descriptivePhrases';
import { useUserStats } from '../hooks/useUserStats';
import DashboardHeroV3Simple from '../components/DashboardHeroV3Simple';

interface DashboardPageUpgradedProps {
  onNavigate: (page: string, courseId?: string, entryType?: string) => void;
  onLogout?: () => void;
  onVeilleContentSelect?: (contentId: number) => void;
  notifications?: any[];
  onMarkNotificationAsRead?: (id: string) => void;
  onMarkAllNotificationsAsRead?: () => void;
  onDeleteNotification?: (id: string) => void;
  notificationDisplayMode?: 'avatar' | 'header' | 'logo';
}

// ========== MOCK DATA ==========
const journalPrompts = [
  {
    id: 1,
    title: 'Apprentissage',
    prompt: 'Quelle a été ma plus grande découverte aujourd\'hui ?',
    color: 'var(--primary)',
    bgColor: 'var(--primary-lighter)',
    icon: BookMarked,
    templateType: 'learning-reflection',
  },
  {
    id: 2,
    title: 'Blocage',
    prompt: 'Qu\'est-ce qui m\'a ralenti et comment puis-je le surmonter ?',
    color: 'var(--accent)',
    bgColor: 'var(--accent-lighter)',
    icon: TrendingUp,
    templateType: 'challenge',
  },
  {
    id: 3,
    title: 'Gratitude',
    prompt: 'Pour quoi suis-je reconnaissant dans mon parcours ?',
    color: 'var(--secondary)',
    bgColor: 'var(--secondary-lighter)',
    icon: Sparkles,
    templateType: 'gratitude',
  },
];

// Parcours en cours
const currentPath = {
  name: 'Maîtriser l\'IA pour la Formation',
  currentStep: 'Étape 2: Applications pratiques',
  progress: 68,
  nextLesson: 'Créer un chatbot pédagogique',
};

export default function DashboardPageUpgraded({ onNavigate, onLogout }: DashboardPageUpgradedProps) {
  const [currentDate, setCurrentDate] = useState('');
  const [dailyQuote, setDailyQuote] = useState('');
  const [descriptivePhrase, setDescriptivePhrase] = useState('');

  // Récupérer les stats utilisateur
  const { stats, loading: statsLoading } = useUserStats();

  useEffect(() => {
    // Format date
    const now = new Date();
    const options: Intl.DateTimeFormatOptions = { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    };
    setCurrentDate(now.toLocaleDateString('fr-FR', options));

    // Citation du jour (basée sur la date)
    const quote = getDailyQuote();
    setDailyQuote(`${quote.text} — ${quote.author}`);
  }, []);

  // Mettre à jour la phrase descriptive quand les stats changent
  useEffect(() => {
    if (stats) {
      const phrase = getDescriptivePhrase(stats);
      setDescriptivePhrase(phrase);
    }
  }, [stats]);

  const handleContinueLearning = () => {
    onNavigate('lesson-content', 'AI_FORMATION');
  };

  // ========== GLASS STYLE PATTERN ==========
  const defaultGlassStyle = {
    background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.6) 0%, rgba(255, 255, 255, 0.4) 100%)',
    backdropFilter: 'blur(20px)',
    WebkitBackdropFilter: 'blur(20px)',
    borderRadius: 'var(--radius-3xl)',
    boxShadow: '0 4px 16px 0 rgba(0, 0, 0, 0.06), 0 1px 0 0 rgba(255, 255, 255, 0.8) inset',
    border: '1px solid rgba(255, 255, 255, 0.8)',
  };

  return (
    <div className="flex h-screen overflow-hidden" style={{ background: 'var(--background)' }}>
      <style>
        {`
          @keyframes pulseGlow {
            0%, 100% { opacity: 0.06; }
            50% { opacity: 0.12; }
          }
          
          @keyframes breathe {
            0%, 100% { 
              box-shadow: 0 4px 16px 0 rgba(0, 0, 0, 0.06), 0 1px 0 0 rgba(255, 255, 255, 0.8) inset;
            }
            50% { 
              box-shadow: 0 8px 24px 0 rgba(237, 132, 58, 0.08), 0 1px 0 0 rgba(255, 255, 255, 0.8) inset;
            }
          }
          
          @keyframes wave {
            0%, 100% { transform: rotate(0deg); }
            10% { transform: rotate(14deg); }
            20% { transform: rotate(-8deg); }
            30% { transform: rotate(14deg); }
            40% { transform: rotate(-4deg); }
            50% { transform: rotate(10deg); }
            60% { transform: rotate(0deg); }
          }

          @keyframes fadeSlideIn {
            0% {
              opacity: 0;
              transform: translateY(-10px);
            }
            100% {
              opacity: 1;
              transform: translateY(0);
            }
          }
          
          @keyframes gradientFlow {
            0%, 100% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
          }
          
          @keyframes float {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-10px); }
          }
          
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}
      </style>

      {/* Background Effects */}
      <BackgroundBlobs />

      {/* Sidebar */}
      <OptimizedSidebar 
        currentPage="dashboard"
        onNavigate={onNavigate}
        onLogout={onLogout}
      />

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        <main className="flex-1 overflow-y-auto">
          {/* ✅ CONTENEUR PRINCIPAL - Centré et immersif */}
          <div 
            style={{
              paddingBottom: 'var(--space-12)',
              position: 'relative',
              minHeight: '100%',
              background: 'linear-gradient(to bottom right, var(--primary-50), white, var(--accent-50))',
            }}
          >
            {/* ========== HERO SECTION V3 ========== */}
            <DashboardHeroV3Simple
              userName="Pierre-Armand"
              dailyQuote={dailyQuote}
              statsLoading={statsLoading}
              userStats={stats || {
                currentStreak: 0,
                totalBadges: 0,
                coursesInProgress: 0,
                completionRate: 0
              }}
            />

            {/* ========== ACTIONS RAPIDES ========== */}
            <div 
              style={{ 
                maxWidth: '1000px',
                margin: '0 auto var(--space-8) auto',
                padding: '0 var(--space-6)',
              }}
            >
              <div style={{ 
                display: 'grid',
                gridTemplateColumns: 'repeat(4, 1fr)',
                gap: 'var(--space-3)',
                maxWidth: '800px',
                margin: '0 auto',
              }}>
                <ActionCard
                  icon={Users}
                  iconColor="var(--primary)"
                  title="Coaching 1-to-1"
                  description="Réserver une session"
                  onClick={() => onNavigate('coaching')}
                />
                
                <ActionCard
                  icon={Map}
                  iconColor="var(--secondary)"
                  title="Parcours"
                  description="Explorer les cours"
                  onClick={() => onNavigate('parcours')}
                />
                
                <ActionCard
                  icon={PenLine}
                  iconColor="var(--accent)"
                  title="Journal"
                  description="Noter mes réflexions"
                  onClick={() => onNavigate('journal')}
                />
                
                <ActionCard
                  icon={Sparkles}
                  iconColor="var(--teal)"
                  title="Veille"
                  description="Découvrir du contenu"
                  onClick={() => onNavigate('veille')}
                />
              </div>
            </div>

            {/* ========== CONTINUER LÀ OÙ J'EN SUIS ========== */}
            <div 
              style={{ 
                maxWidth: '1000px',
                margin: '0 auto var(--space-8) auto',
                padding: '0 var(--space-6)',
              }}
            >
              
              <div 
                onClick={handleContinueLearning}
                className="rounded-3xl cursor-pointer relative overflow-hidden"
                style={{
                  ...defaultGlassStyle,
                  padding: 'var(--space-8)',
                  transition: 'all var(--duration-normal) var(--ease-out)',
                  animation: 'breathe 4s ease-in-out infinite', // ANIMATION 4: Shadow qui respire
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-8px)';
                  e.currentTarget.style.background = 'linear-gradient(135deg, rgba(255, 255, 255, 0.7) 0%, rgba(255, 255, 255, 0.5) 100%)';
                  e.currentTarget.style.boxShadow = '0 20px 60px 0 rgba(237, 132, 58, 0.08), 0 12px 32px 0 rgba(237, 132, 58, 0.04), 0 1px 0 0 rgba(255, 255, 255, 1) inset';
                  e.currentTarget.style.backdropFilter = 'blur(30px)';
                  e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 1)';
                  e.currentTarget.style.animation = 'none'; // Stop breathe au hover
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.background = 'linear-gradient(135deg, rgba(255, 255, 255, 0.6) 0%, rgba(255, 255, 255, 0.4) 100%)';
                  e.currentTarget.style.boxShadow = '0 4px 16px 0 rgba(0, 0, 0, 0.06), 0 1px 0 0 rgba(255, 255, 255, 0.8) inset';
                  e.currentTarget.style.backdropFilter = 'blur(20px)';
                  e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.8)';
                  e.currentTarget.style.animation = 'breathe 4s ease-in-out infinite'; // Restart breathe
                }}
              >
                {/* ANIMATION 1: Glow orange qui pulse doucement */}
                <div 
                  className="absolute inset-0"
                  style={{
                    background: 'radial-gradient(circle at 50% 0%, rgba(237, 132, 58, 0.06) 0%, transparent 70%)',
                    pointerEvents: 'none',
                    animation: 'pulseGlow 3s ease-in-out infinite',
                  }}
                />

                <div className="relative z-10">
                  {/* Header section avec Nom, Étape et Bouton */}
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1 min-w-0">
                      {/* Nom du parcours - ORANGE */}
                      <h2 
                        className="mb-2"
                        style={{
                          fontSize: 'var(--text-2xl)',
                          fontWeight: 'var(--font-weight-bold)',
                          color: 'var(--secondary)',
                          fontFamily: 'var(--font-display)',
                          lineHeight: 'var(--leading-tight)',
                        }}
                      >
                        {currentPath.name}
                      </h2>
                      
                      {/* Étape en cours */}
                      <p 
                        style={{
                          fontSize: 'var(--text-base)',
                          color: 'var(--muted-foreground)',
                          fontFamily: 'var(--font-body)',
                          lineHeight: 'var(--leading-normal)',
                          margin: 0,
                        }}
                      >
                        {currentPath.currentStep}
                      </p>
                    </div>

                    {/* Bouton Continuer - En haut à droite */}
                    <button
                      onClick={handleContinueLearning}
                      className="group flex items-center gap-3 px-6 py-3 rounded-xl transition-all duration-300 hover:scale-105 relative overflow-hidden"
                      style={{
                        background: 'var(--secondary)',
                        flexShrink: 0,
                        alignSelf: 'flex-start',
                      }}
                    >
                      <span 
                        className="relative z-10"
                        style={{
                          color: 'white',
                          fontFamily: 'var(--font-body)',
                          fontSize: 'var(--text-base)',
                          fontWeight: 'var(--font-weight-semibold)',
                        }}
                      >
                        Continuer
                      </span>
                      <ArrowRight className="w-5 h-5 relative z-10 group-hover:translate-x-1 transition-transform" style={{ color: 'white', strokeWidth: 1.5 }} />
                    </button>
                  </div>

                  {/* Progress bar */}
                  <div 
                    className="mt-6"
                    style={{
                      background: 'rgba(0, 0, 0, 0.05)',
                      borderRadius: 'var(--radius-full)',
                      height: '8px',
                      overflow: 'hidden',
                      position: 'relative',
                    }}
                  >
                    {/* ANIMATION 5: Gradient animé */}
                    <div 
                      style={{
                        width: `${currentPath.progress}%`,
                        height: '100%',
                        background: 'linear-gradient(90deg, var(--primary), var(--secondary), var(--accent))',
                        backgroundSize: '200% 100%',
                        borderRadius: 'var(--radius-full)',
                        animation: 'gradientFlow 3s ease-in-out infinite',
                        transition: 'width var(--duration-slow) var(--ease-out)',
                      }}
                    />
                  </div>
                  
                  {/* Progress percentage */}
                  <p 
                    className="mt-2"
                    style={{
                      fontSize: 'var(--text-sm)',
                      color: 'var(--muted-foreground)',
                      fontFamily: 'var(--font-body)',
                      lineHeight: 'var(--leading-normal)',
                      margin: 0,
                    }}
                  >
                    {currentPath.progress}% complété
                  </p>
                </div>
              </div>
            </div>

            {/* ========== PROMPTS JOURNAL ========== */}
            <div 
              style={{ 
                maxWidth: '1000px',
                margin: '0 auto var(--space-8) auto',
                padding: '0 var(--space-6)',
              }}
            >
              <div className="grid grid-cols-1 md:grid-cols-3" style={{ 
                gap: 'var(--space-3)', // 12px
              }}>
                {journalPrompts.map((prompt) => (
                  <JournalPromptCard
                    key={prompt.id}
                    badge={prompt.title}
                    badgeColor={prompt.color}
                    badgeBg={prompt.bgColor}
                    icon={prompt.icon}
                    iconColor={prompt.color}
                    question={prompt.prompt}
                    onClick={() => onNavigate('journal-free-entry', undefined, prompt.templateType)}
                  />
                ))}
              </div>
            </div>

            {/* ========== FIL D'ACTUALITÉS ========== */}
            <div 
              style={{ 
                maxWidth: '1000px',
                margin: '0 auto',
                padding: '0 var(--space-6)',
              }}
            >
              <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
                
                {/* Lesson Completed */}
                <ActivityCard
                  icon={CheckCircle2}
                  iconColor="var(--success)"
                  title="Leçon terminée"
                  badge="Apprentissage"
                  badgeColor="var(--success)"
                  badgeBg="var(--success-50)"
                  description="Vous avez terminé la leçon 'Introduction au Machine Learning'"
                  timestamp="Il y a 2 heures"
                  meta="Parcours: IA pour la Formation"
                />

                {/* Badge Earned */}
                <ActivityCard
                  icon={Award}
                  iconColor="var(--accent)"
                  title="Nouveau badge débloqué"
                  badge="Succès"
                  badgeColor="var(--accent)"
                  badgeBg="var(--accent-lighter)"
                  description="Vous avez obtenu le badge 'Pionnier de l'IA'"
                  timestamp="Hier"
                  meta="5 leçons complétées dans le parcours IA"
                />

                {/* Streak */}
                <ActivityCard
                  icon={TrendingUp}
                  iconColor="var(--secondary)"
                  title="Série maintenue"
                  badge="Progression"
                  badgeColor="var(--secondary)"
                  badgeBg="var(--secondary-lighter)"
                  description="Vous avez maintenu votre série d'apprentissage à 7 jours"
                  timestamp="Aujourd'hui"
                  meta="Continuez ainsi !"
                />
              </div>
            </div>
          </div>

          {/* DEV SPECS FAB - Bouton flottant pour accéder aux specs */}
          <button
            onClick={() => onNavigate('dev-specs')}
            style={{
              position: 'fixed',
              bottom: 'var(--space-6)',
              right: 'var(--space-6)',
              width: '56px',
              height: '56px',
              borderRadius: '50%',
              background: 'linear-gradient(135deg, var(--primary) 0%, var(--primary-hover) 100%)',
              border: 'none',
              boxShadow: '0 8px 24px 0 rgba(85, 161, 180, 0.3)',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'all 300ms cubic-bezier(0, 0, 0.2, 1)',
              zIndex: 1000,
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'scale(1.1) rotate(90deg)';
              e.currentTarget.style.boxShadow = '0 12px 32px 0 rgba(85, 161, 180, 0.4)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'scale(1) rotate(0deg)';
              e.currentTarget.style.boxShadow = '0 8px 24px 0 rgba(85, 161, 180, 0.3)';
            }}
            title="Voir les spécifications DEV"
          >
            <Ruler size={24} style={{ color: 'white', strokeWidth: 2 }} />
          </button>
        </main>
      </div>
    </div>
  );
}