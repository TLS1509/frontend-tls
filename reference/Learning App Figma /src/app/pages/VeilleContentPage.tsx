import { useState } from 'react';
import { motion } from 'motion/react';
import {
  ArrowLeft,
  Clock,
  Calendar,
  Bookmark,
  BookmarkCheck,
  Download,
  PlayCircle,
  FileText,
  BarChart3,
  TrendingUp,
  CheckCircle2,
  Sparkles,
  X,
  Maximize2,
} from 'lucide-react';
import { BackgroundBlobs } from '../components/ui/background-blobs';
import OptimizedSidebar from '../components/ui/optimized-sidebar';
import { useToast, ToastContainer } from '../components/ui/notification-toast';
import { ButtonEnhanced } from '../components/ui/button-enhanced';
import VimeoPlayer, { VideoPlayerModal } from '../components/video/VimeoPlayer';

interface VeilleContentPageProps {
  contentId: number;
  onNavigate: (page: string) => void;
  onBack: () => void;
  onLogout: () => void;
}

interface ContentDetail {
  id: number;
  resourceType: 'tuto' | 'rapport';
  title: string;
  subtitle?: string;
  author: string;
  authorAvatar?: string;
  publishDate: string;
  duration: string;
  category: string;
  tags: string[];
  thumbnail: string;
  videoUrl?: string;
  pdfUrl?: string;
  saved: boolean;
  // Rapport specific
  keyFindings?: string[];
  stats?: { label: string; value: string; trend?: string }[];
  executive_summary?: string;
  // Tutorial specific
  description?: string;
  steps?: string[];
}

// Mock content data
const contentData: Record<number, ContentDetail> = {
  3: {
    id: 3,
    resourceType: 'tuto',
    title: 'Créer des formations interactives avec Claude AI',
    subtitle: 'Guide pratique en 3 minutes',
    author: 'Marc Dubois',
    authorAvatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop',
    publishDate: '4 janvier 2026',
    duration: '3 min',
    category: 'Tutoriel IA',
    tags: ['Claude AI', 'Formation', 'IA Générative', 'Pratique'],
    thumbnail: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=1200&h=600&fit=crop',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    saved: false,
    description: 'Découvrez comment utiliser Claude AI pour créer des modules de formation interactifs en quelques minutes. Ce tutoriel vous montre les 3 étapes essentielles pour transformer vos idées en contenus pédagogiques engageants.',
    steps: [
      'Définir vos objectifs pédagogiques clairement',
      'Structurer votre prompt avec le contexte et l\'audience',
      'Générer et affiner le contenu interactif',
    ],
  },
  2: {
    id: 2,
    resourceType: 'rapport',
    title: 'L\'IA dans l\'éducation : Rapport UNESCO 2024',
    subtitle: 'Étude mondiale sur l\'impact de l\'intelligence artificielle',
    author: 'UNESCO EdTech Team',
    publishDate: '5 janvier 2026',
    duration: '45 pages',
    category: 'Recherche',
    tags: ['Pédagogie', 'Recherche', 'Formation', 'UNESCO'],
    thumbnail: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?w=1200&h=600&fit=crop',
    pdfUrl: 'https://example.com/unesco-report-2024.pdf',
    saved: true,
    executive_summary: 'Ce rapport présente une analyse approfondie de l\'intégration de l\'intelligence artificielle dans les systèmes éducatifs de 50 pays. Basé sur 18 mois de recherche avec 500 institutions, 10 000 enseignants et 50 000 étudiants, il révèle des transformations majeures et formule des recommandations stratégiques pour une adoption éthique et équitable de l\'IA dans l\'éducation.',
    keyFindings: [
      'Amélioration de 27% du taux de réussite dans les programmes intégrant l\'IA',
      'Réduction de 40% du temps de correction pour les enseignants',
      'Augmentation de 35% de l\'engagement des étudiants',
      'Disparités importantes entre pays développés et en développement',
      '12 recommandations pour une intégration éthique et équitable',
    ],
    stats: [
      { label: 'Institutions étudiées', value: '500', trend: '+150%' },
      { label: 'Enseignants participants', value: '10K', trend: '+200%' },
      { label: 'Étudiants interrogés', value: '50K', trend: '+180%' },
      { label: 'Pays couverts', value: '50', trend: '+67%' },
    ],
  },
};

export default function VeilleContentPage({ 
  contentId, 
  onNavigate, 
  onBack,
  onLogout 
}: VeilleContentPageProps) {
  const content = contentData[contentId];
  const [saved, setSaved] = useState(content?.saved || false);
  const [isVideoFullscreen, setIsVideoFullscreen] = useState(false);
  const [isPdfViewerOpen, setIsPdfViewerOpen] = useState(false);
  const { toasts, success, info, removeToast } = useToast();

  if (!content) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: 'var(--background)' }}>
        <div className="text-center">
          <h2 style={{ 
            fontSize: 'var(--text-2xl)',
            fontWeight: 'var(--font-weight-bold)',
            color: 'var(--foreground)',
          }}>
            Contenu introuvable
          </h2>
          <button
            onClick={onBack}
            className="mt-4 px-6 py-3 rounded-xl"
            style={{
              background: 'var(--gradient-primary)',
              color: 'white',
              fontSize: 'var(--text-sm)',
              fontWeight: 'var(--font-weight-semibold)',
            }}
          >
            Retour à la veille
          </button>
        </div>
      </div>
    );
  }

  const handleBookmark = () => {
    setSaved(!saved);
    if (!saved) {
      success('Contenu sauvegardé !', 'Retrouvez-le dans vos favoris');
    } else {
      info('Contenu retiré des favoris');
    }
  };

  const handleDownload = () => {
    success('Téléchargement commencé', 'Le PDF sera disponible dans quelques instants');
  };

  // ========== TUTORIEL LAYOUT (Short Video) ==========
  if (content.resourceType === 'tuto') {
    return (
      <div className="min-h-screen relative overflow-hidden" style={{ background: 'var(--background)' }}>
        <BackgroundBlobs />

        <div className="flex h-screen">
          <OptimizedSidebar
            currentPage="veille"
            onNavigate={onNavigate}
            onLogout={onLogout}
            userHasEnterpriseAccess={true}
            userName="Admin1509"
            userEmail="padennery@me.com"
            userInitials="A"
          />

          <main className="flex-1 overflow-y-auto">
            <div className="max-w-5xl mx-auto p-6 md:p-8 lg:p-10 pb-12">
              
              {/* Back button */}
              <motion.button
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                onClick={onBack}
                className="mb-8 flex items-center gap-2 px-4 py-2 rounded-xl transition-all duration-200"
                style={{
                  background: 'rgba(255, 255, 255, 0.7)',
                  backdropFilter: 'blur(20px)',
                  border: '1px solid rgba(255, 255, 255, 0.5)',
                  color: 'var(--foreground)',
                  fontSize: 'var(--text-sm)',
                  fontWeight: 'var(--font-weight-medium)',
                }}
                whileHover={{ x: -4 }}
              >
                <ArrowLeft className="w-4 h-4" />
                Retour à la veille
              </motion.button>

              {/* Tutorial Content */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
              >
                {/* Header */}
                <div className="mb-8">
                  <div className="flex items-center gap-3 mb-4">
                    <span 
                      className="px-3 py-1.5 rounded-full flex items-center gap-1.5"
                      style={{
                        background: 'var(--accent-lighter)',
                        color: 'var(--accent)',
                        fontSize: 'var(--text-xs)',
                        fontWeight: 'var(--font-weight-semibold)',
                      }}
                    >
                      <PlayCircle className="w-4 h-4" />
                      {content.category}
                    </span>
                    <span 
                      className="flex items-center gap-1.5"
                      style={{ 
                        fontSize: 'var(--text-xs)',
                        color: 'var(--muted-foreground)',
                      }}
                    >
                      <Clock className="w-3.5 h-3.5" />
                      {content.duration}
                    </span>
                    <span 
                      className="flex items-center gap-1.5"
                      style={{ 
                        fontSize: 'var(--text-xs)',
                        color: 'var(--muted-foreground)',
                      }}
                    >
                      <Calendar className="w-3.5 h-3.5" />
                      {content.publishDate}
                    </span>
                  </div>

                  <h1 
                    className="mb-3"
                    style={{
                      fontSize: 'var(--text-4xl)',
                      fontWeight: 'var(--font-weight-bold)',
                      color: 'var(--foreground)',
                      lineHeight: 'var(--leading-tight)',
                      fontFamily: 'var(--font-display)',
                    }}
                  >
                    {content.title}
                  </h1>

                  {content.subtitle && (
                    <p 
                      className="mb-6"
                      style={{
                        fontSize: 'var(--text-lg)',
                        color: 'var(--muted-foreground)',
                        lineHeight: 'var(--leading-relaxed)',
                      }}
                    >
                      {content.subtitle}
                    </p>
                  )}

                  {/* Author & Actions */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      {content.authorAvatar && (
                        <img 
                          src={content.authorAvatar} 
                          alt={content.author}
                          className="w-12 h-12 rounded-full object-cover"
                          style={{
                            border: '2px solid rgba(255, 255, 255, 0.5)',
                          }}
                        />
                      )}
                      <div>
                        <p style={{ 
                          fontSize: 'var(--text-sm)',
                          fontWeight: 'var(--font-weight-semibold)',
                          color: 'var(--foreground)',
                        }}>
                          {content.author}
                        </p>
                        <p style={{ 
                          fontSize: 'var(--text-xs)',
                          color: 'var(--muted-foreground)',
                        }}>
                          Expert en formation IA
                        </p>
                      </div>
                    </div>

                    <ButtonEnhanced
                      variant={saved ? 'secondary' : 'outline'}
                      size="md"
                      icon={saved ? <BookmarkCheck className="w-5 h-5" /> : <Bookmark className="w-5 h-5" />}
                      onClick={handleBookmark}
                    >
                      {saved ? 'Sauvegardé' : 'Sauvegarder'}
                    </ButtonEnhanced>
                  </div>
                </div>

                {/* Video Player - Full Focus */}
                <div 
                  className="mb-8"
                  style={{
                    boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3)',
                    borderRadius: 'var(--radius-3xl)',
                  }}
                >
                  {content.videoUrl ? (
                    <VimeoPlayer
                      videoId="76979871"
                      title={content.title}
                      showControls={true}
                      onFullscreenClick={() => setIsVideoFullscreen(true)}
                    />
                  ) : (
                    <div 
                      className="w-full rounded-3xl overflow-hidden flex items-center justify-center"
                      style={{ 
                        aspectRatio: '16/9',
                        background: 'rgba(0, 0, 0, 0.9)',
                      }}
                    >
                      <PlayCircle className="w-20 h-20 text-white opacity-50" />
                    </div>
                  )}
                </div>

                {/* Description Card */}
                <div 
                  className="p-8 rounded-3xl mb-8"
                  style={{
                    background: 'rgba(255, 255, 255, 0.7)',
                    backdropFilter: 'blur(20px)',
                    border: '1px solid rgba(255, 255, 255, 0.5)',
                    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.08)',
                  }}
                >
                  <h2 
                    className="mb-4"
                    style={{
                      fontSize: 'var(--text-xl)',
                      fontWeight: 'var(--font-weight-bold)',
                      color: 'var(--foreground)',
                      fontFamily: 'var(--font-display)',
                    }}
                  >
                    À propos de ce tutoriel
                  </h2>
                  <p 
                    className="mb-6"
                    style={{
                      fontSize: 'var(--text-base)',
                      color: 'var(--foreground)',
                      lineHeight: 'var(--leading-relaxed)',
                    }}
                  >
                    {content.description}
                  </p>

                  {/* Steps */}
                  {content.steps && content.steps.length > 0 && (
                    <>
                      <h3 
                        className="mb-3"
                        style={{
                          fontSize: 'var(--text-lg)',
                          fontWeight: 'var(--font-weight-semibold)',
                          color: 'var(--foreground)',
                        }}
                      >
                        Ce que vous allez apprendre
                      </h3>
                      <div className="space-y-3">
                        {content.steps.map((step, index) => (
                          <div 
                            key={index} 
                            className="flex items-start gap-3"
                          >
                            <div 
                              className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
                              style={{
                                background: 'var(--gradient-primary)',
                              }}
                            >
                              <CheckCircle2 className="w-4 h-4 text-white" />
                            </div>
                            <p style={{
                              fontSize: 'var(--text-base)',
                              color: 'var(--foreground)',
                              lineHeight: 'var(--leading-relaxed)',
                            }}>
                              {step}
                            </p>
                          </div>
                        ))}
                      </div>
                    </>
                  )}
                </div>

                {/* Tags */}
                <div className="flex items-center gap-2 flex-wrap">
                  {content.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="px-3 py-1.5 rounded-full"
                      style={{
                        background: 'rgba(85, 161, 180, 0.1)',
                        color: 'var(--primary)',
                        fontSize: 'var(--text-xs)',
                        fontWeight: 'var(--font-weight-medium)',
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </motion.div>
            </div>
          </main>
        </div>

        {/* Fullscreen Video Modal */}
        {isVideoFullscreen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            style={{
              background: 'rgba(0, 0, 0, 0.95)',
              backdropFilter: 'blur(10px)',
            }}
            onClick={() => setIsVideoFullscreen(false)}
          >
            <button
              onClick={() => setIsVideoFullscreen(false)}
              className="absolute top-4 right-4 p-3 rounded-xl transition-all duration-200"
              style={{
                background: 'rgba(255, 255, 255, 0.1)',
                backdropFilter: 'blur(10px)',
              }}
            >
              <X className="w-6 h-6 text-white" />
            </button>
            <div className="w-full max-w-6xl" onClick={(e) => e.stopPropagation()}>
              {content.videoUrl && (
                <VimeoPlayer
                  videoId="76979871"
                  title={content.title}
                  autoplay
                  showControls={true}
                />
              )}
            </div>
          </motion.div>
        )}

        <ToastContainer toasts={toasts} removeToast={removeToast} />
      </div>
    );
  }

  // ========== RAPPORT LAYOUT (Report/White Paper) ==========
  return (
    <div className="min-h-screen relative overflow-hidden" style={{ background: 'var(--background)' }}>
      <BackgroundBlobs />
      
      {/* TLS Overlay - Très léger gradient */}
      <div 
        className="fixed inset-0 pointer-events-none"
        style={{
          background: 'var(--gradient-tls-subtle)',
          zIndex: 1,
        }}
      />

      <div className="flex h-screen relative" style={{ zIndex: 2 }}>
        <OptimizedSidebar
          currentPage="veille"
          onNavigate={onNavigate}
          onLogout={onLogout}
          userHasEnterpriseAccess={true}
          userName="Admin1509"
          userEmail="padennery@me.com"
          userInitials="A"
          isViewerMode={true}
        />

        <main className="flex-1 overflow-y-auto">
          <div className="max-w-6xl mx-auto p-6 md:p-8 lg:p-10 pb-12">
            
            {/* Back button */}
            <motion.button
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              onClick={onBack}
              className="mb-8 flex items-center gap-2 px-4 py-2 rounded-xl transition-all duration-200"
              style={{
                background: 'rgba(255, 255, 255, 0.7)',
                backdropFilter: 'blur(20px)',
                border: '1px solid rgba(255, 255, 255, 0.5)',
                color: 'var(--foreground)',
                fontSize: 'var(--text-sm)',
                fontWeight: 'var(--font-weight-medium)',
              }}
              whileHover={{ x: -4 }}
            >
              <ArrowLeft className="w-4 h-4" />
              Retour à la veille
            </motion.button>

            {/* Report Header */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="mb-8"
            >
              {/* Report Cover */}
              <div 
                className="p-12 rounded-3xl mb-8 relative overflow-hidden"
                style={{
                  background: 'linear-gradient(135deg, var(--primary) 0%, var(--secondary) 100%)',
                  boxShadow: '0 20px 60px rgba(85, 161, 180, 0.3)',
                }}
              >
                <div 
                  className="absolute inset-0 opacity-10"
                  style={{
                    backgroundImage: `url(${content.thumbnail})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                  }}
                />
                
                <div className="relative z-10">
                  <div className="flex items-center gap-3 mb-4">
                    <span 
                      className="px-3 py-1.5 rounded-full flex items-center gap-1.5"
                      style={{
                        background: 'rgba(255, 255, 255, 0.2)',
                        backdropFilter: 'blur(10px)',
                        color: 'white',
                        fontSize: 'var(--text-xs)',
                        fontWeight: 'var(--font-weight-semibold)',
                      }}
                    >
                      <FileText className="w-4 h-4" />
                      {content.category}
                    </span>
                    <span 
                      className="flex items-center gap-1.5"
                      style={{ 
                        fontSize: 'var(--text-xs)',
                        color: 'rgba(255, 255, 255, 0.9)',
                      }}
                    >
                      <Calendar className="w-3.5 h-3.5" />
                      {content.publishDate}
                    </span>
                  </div>

                  <h1 
                    className="mb-4"
                    style={{
                      fontSize: 'var(--text-5xl)',
                      fontWeight: 'var(--font-weight-bold)',
                      color: 'white',
                      lineHeight: 'var(--leading-tight)',
                      fontFamily: 'var(--font-display)',
                    }}
                  >
                    {content.title}
                  </h1>

                  {content.subtitle && (
                    <p 
                      className="mb-6"
                      style={{
                        fontSize: 'var(--text-xl)',
                        color: 'rgba(255, 255, 255, 0.9)',
                        lineHeight: 'var(--leading-relaxed)',
                      }}
                    >
                      {content.subtitle}
                    </p>
                  )}

                  <div className="flex items-center gap-4">
                    <p style={{ 
                      fontSize: 'var(--text-sm)',
                      color: 'rgba(255, 255, 255, 0.8)',
                    }}>
                      Par <span style={{ fontWeight: 'var(--font-weight-semibold)' }}>{content.author}</span>
                    </p>
                    <span style={{
                      width: '1px',
                      height: '16px',
                      background: 'rgba(255, 255, 255, 0.3)',
                    }} />
                    <p style={{ 
                      fontSize: 'var(--text-sm)',
                      color: 'rgba(255, 255, 255, 0.8)',
                    }}>
                      {content.duration}
                    </p>
                  </div>
                </div>
              </div>

              {/* Stats Grid */}
              {content.stats && content.stats.length > 0 && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                  {content.stats.map((stat, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 + index * 0.1 }}
                      className="p-6 rounded-2xl"
                      style={{
                        background: 'rgba(255, 255, 255, 0.7)',
                        backdropFilter: 'blur(20px)',
                        border: '1px solid rgba(255, 255, 255, 0.5)',
                        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.08)',
                      }}
                    >
                      <div className="flex items-center gap-2 mb-2">
                        <BarChart3 className="w-5 h-5" style={{ color: 'var(--primary)' }} />
                        {stat.trend && (
                          <span 
                            className="px-2 py-0.5 rounded-full flex items-center gap-1"
                            style={{
                              background: 'var(--success-lighter)',
                              color: 'var(--success-600)',
                              fontSize: 'var(--text-xs)',
                              fontWeight: 'var(--font-weight-semibold)',
                            }}
                          >
                            <TrendingUp className="w-3 h-3" />
                            {stat.trend}
                          </span>
                        )}
                      </div>
                      <p 
                        className="mb-1"
                        style={{
                          fontSize: 'var(--text-3xl)',
                          fontWeight: 'var(--font-weight-bold)',
                          color: 'var(--foreground)',
                          fontFamily: 'var(--font-display)',
                        }}
                      >
                        {stat.value}
                      </p>
                      <p style={{
                        fontSize: 'var(--text-sm)',
                        color: 'var(--muted-foreground)',
                      }}>
                        {stat.label}
                      </p>
                    </motion.div>
                  ))}
                </div>
              )}

              {/* Executive Summary */}
              {content.executive_summary && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="p-8 rounded-3xl mb-8 relative overflow-hidden"
                  style={{
                    background: 'rgba(255, 255, 255, 0.7)',
                    backdropFilter: 'blur(20px)',
                    border: '1px solid rgba(255, 255, 255, 0.5)',
                    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.08)',
                  }}
                >
                  <div 
                    className="absolute top-0 left-0 w-1 h-full"
                    style={{
                      background: 'var(--gradient-primary)',
                    }}
                  />
                  <div className="flex items-center gap-2 mb-4">
                    <Sparkles className="w-5 h-5" style={{ color: 'var(--primary)' }} />
                    <h2 
                      style={{
                        fontSize: 'var(--text-xl)',
                        fontWeight: 'var(--font-weight-bold)',
                        color: 'var(--foreground)',
                        fontFamily: 'var(--font-display)',
                      }}
                    >
                      Résumé exécutif
                    </h2>
                  </div>
                  <p style={{
                    fontSize: 'var(--text-base)',
                    color: 'var(--foreground)',
                    lineHeight: 'var(--leading-relaxed)',
                  }}>
                    {content.executive_summary}
                  </p>
                </motion.div>
              )}

              {/* Key Findings */}
              {content.keyFindings && content.keyFindings.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="p-8 rounded-3xl mb-8"
                  style={{
                    background: 'rgba(255, 255, 255, 0.7)',
                    backdropFilter: 'blur(20px)',
                    border: '1px solid rgba(255, 255, 255, 0.5)',
                    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.08)',
                  }}
                >
                  <h2 
                    className="mb-6"
                    style={{
                      fontSize: 'var(--text-2xl)',
                      fontWeight: 'var(--font-weight-bold)',
                      color: 'var(--foreground)',
                      fontFamily: 'var(--font-display)',
                    }}
                  >
                    Points clés du rapport
                  </h2>
                  <div className="space-y-4">
                    {content.keyFindings.map((finding, index) => (
                      <div 
                        key={index}
                        className="flex items-start gap-4 p-4 rounded-2xl transition-all duration-200 hover:-translate-y-1"
                        style={{
                          background: 'rgba(85, 161, 180, 0.05)',
                          border: '1px solid rgba(85, 161, 180, 0.1)',
                        }}
                      >
                        <div 
                          className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0"
                          style={{
                            background: 'var(--gradient-primary)',
                          }}
                        >
                          <CheckCircle2 className="w-5 h-5 text-white" />
                        </div>
                        <p style={{
                          fontSize: 'var(--text-base)',
                          color: 'var(--foreground)',
                          lineHeight: 'var(--leading-relaxed)',
                          fontWeight: 'var(--font-weight-medium)',
                        }}>
                          {finding}
                        </p>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* Content Section - Texte explicatif */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="p-8 rounded-3xl mb-8"
                style={{
                  background: 'rgba(255, 255, 255, 0.7)',
                  backdropFilter: 'blur(20px)',
                  border: '1px solid rgba(255, 255, 255, 0.5)',
                  boxShadow: '0 8px 32px rgba(0, 0, 0, 0.08)',
                }}
              >
                <h2 
                  className="mb-6"
                  style={{
                    fontSize: 'var(--text-2xl)',
                    fontWeight: 'var(--font-weight-bold)',
                    color: 'var(--foreground)',
                    fontFamily: 'var(--font-display)',
                  }}
                >
                  L'impact de l'IA dans l'éducation
                </h2>
                <div className="space-y-4">
                  <p style={{
                    fontSize: 'var(--text-base)',
                    color: 'var(--foreground)',
                    lineHeight: 'var(--leading-relaxed)',
                  }}>
                    L'intelligence artificielle transforme profondément le secteur de l'éducation et de la formation professionnelle. Nos recherches montrent que <strong>78% des organisations</strong> qui adoptent l'IA dans leurs programmes de formation constatent une amélioration significative de l'engagement des apprenants.
                  </p>
                  <p style={{
                    fontSize: 'var(--text-base)',
                    color: 'var(--foreground)',
                    lineHeight: 'var(--leading-relaxed)',
                  }}>
                    Les technologies d'apprentissage adaptatif permettent de personnaliser les parcours en temps réel, tandis que les assistants virtuels offrent un support 24/7. Cette révolution technologique s'accompagne toutefois de défis importants en termes d'éthique, d'équité et de formation des formateurs.
                  </p>
                </div>
              </motion.div>

              {/* Charts & Diagrams Grid Section */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="mb-8"
              >
                <h2 
                  className="mb-6"
                  style={{
                    fontSize: 'var(--text-2xl)',
                    fontWeight: 'var(--font-weight-bold)',
                    color: 'var(--foreground)',
                    fontFamily: 'var(--font-display)',
                  }}
                >
                  Données et visualisations
                </h2>
                
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Chart Card 1 */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.7 }}
                    className="p-6 rounded-3xl"
                    style={{
                      background: 'rgba(255, 255, 255, 0.7)',
                      backdropFilter: 'blur(20px)',
                      border: '1px solid rgba(255, 255, 255, 0.5)',
                      boxShadow: '0 8px 32px rgba(0, 0, 0, 0.08)',
                    }}
                  >
                    <div className="flex items-center gap-3 mb-4">
                      <div 
                        className="w-10 h-10 rounded-xl flex items-center justify-center"
                        style={{
                          background: 'var(--gradient-primary)',
                        }}
                      >
                        <BarChart3 className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <h3 
                          style={{
                            fontSize: 'var(--text-lg)',
                            fontWeight: 'var(--font-weight-semibold)',
                            color: 'var(--foreground)',
                            fontFamily: 'var(--font-display)',
                          }}
                        >
                          Taux d'adoption de l'IA
                        </h3>
                        <p style={{
                          fontSize: 'var(--text-sm)',
                          color: 'var(--muted-foreground)',
                        }}>
                          Par région géographique
                        </p>
                      </div>
                    </div>
                    <div 
                      className="aspect-video rounded-2xl flex items-center justify-center relative overflow-hidden"
                      style={{
                        background: 'linear-gradient(135deg, rgba(85, 161, 180, 0.1) 0%, rgba(237, 132, 58, 0.1) 100%)',
                        border: '1px solid rgba(85, 161, 180, 0.2)',
                      }}
                    >
                      <img 
                        src="https://images.unsplash.com/photo-1666875753105-c63a6f3bdc86?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkYXRhJTIwY2hhcnRzJTIwYW5hbHl0aWNzfGVufDF8fHx8MTc2ODQ4NDg4NXww&ixlib=rb-4.1.0&q=80&w=1080"
                        alt="Data Charts"
                        className="w-full h-full object-cover opacity-80"
                      />
                      <div 
                        className="absolute inset-0 flex items-center justify-center"
                        style={{
                          background: 'rgba(85, 161, 180, 0.05)',
                        }}
                      >
                        <p 
                          className="px-4 py-2 rounded-xl"
                          style={{
                            background: 'rgba(255, 255, 255, 0.9)',
                            backdropFilter: 'blur(10px)',
                            fontSize: 'var(--text-sm)',
                            fontWeight: 'var(--font-weight-semibold)',
                            color: 'var(--primary)',
                          }}
                        >
                          +42% en 2024
                        </p>
                      </div>
                    </div>
                  </motion.div>

                  {/* Chart Card 2 */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8 }}
                    className="p-6 rounded-3xl"
                    style={{
                      background: 'rgba(255, 255, 255, 0.7)',
                      backdropFilter: 'blur(20px)',
                      border: '1px solid rgba(255, 255, 255, 0.5)',
                      boxShadow: '0 8px 32px rgba(0, 0, 0, 0.08)',
                    }}
                  >
                    <div className="flex items-center gap-3 mb-4">
                      <div 
                        className="w-10 h-10 rounded-xl flex items-center justify-center"
                        style={{
                          background: 'linear-gradient(135deg, var(--secondary), var(--accent))',
                        }}
                      >
                        <TrendingUp className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <h3 
                          style={{
                            fontSize: 'var(--text-lg)',
                            fontWeight: 'var(--font-weight-semibold)',
                            color: 'var(--foreground)',
                            fontFamily: 'var(--font-display)',
                          }}
                        >
                          Performance des apprenants
                        </h3>
                        <p style={{
                          fontSize: 'var(--text-sm)',
                          color: 'var(--muted-foreground)',
                        }}>
                          Comparaison avec/sans IA
                        </p>
                      </div>
                    </div>
                    <div 
                      className="aspect-video rounded-2xl flex items-center justify-center relative overflow-hidden"
                      style={{
                        background: 'linear-gradient(135deg, rgba(237, 132, 58, 0.1) 0%, rgba(248, 176, 68, 0.1) 100%)',
                        border: '1px solid rgba(237, 132, 58, 0.2)',
                      }}
                    >
                      <img 
                        src="https://images.unsplash.com/photo-1758876202980-0a28b744fb24?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXNpbmVzcyUyMGRhc2hib2FyZCUyMGdyYXBoc3xlbnwxfHx8fDE3Njg0ODQ4ODl8MA&ixlib=rb-4.1.0&q=80&w=1080"
                        alt="Business Dashboard"
                        className="w-full h-full object-cover opacity-80"
                      />
                      <div 
                        className="absolute inset-0 flex items-center justify-center"
                        style={{
                          background: 'rgba(237, 132, 58, 0.05)',
                        }}
                      >
                        <p 
                          className="px-4 py-2 rounded-xl"
                          style={{
                            background: 'rgba(255, 255, 255, 0.9)',
                            backdropFilter: 'blur(10px)',
                            fontSize: 'var(--text-sm)',
                            fontWeight: 'var(--font-weight-semibold)',
                            color: 'var(--secondary)',
                          }}
                        >
                          +27% réussite
                        </p>
                      </div>
                    </div>
                  </motion.div>

                  {/* Chart Card 3 */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.9 }}
                    className="p-6 rounded-3xl"
                    style={{
                      background: 'rgba(255, 255, 255, 0.7)',
                      backdropFilter: 'blur(20px)',
                      border: '1px solid rgba(255, 255, 255, 0.5)',
                      boxShadow: '0 8px 32px rgba(0, 0, 0, 0.08)',
                    }}
                  >
                    <div className="flex items-center gap-3 mb-4">
                      <div 
                        className="w-10 h-10 rounded-xl flex items-center justify-center"
                        style={{
                          background: 'linear-gradient(135deg, var(--accent), var(--primary))',
                        }}
                      >
                        <Sparkles className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <h3 
                          style={{
                            fontSize: 'var(--text-lg)',
                            fontWeight: 'var(--font-weight-semibold)',
                            color: 'var(--foreground)',
                            fontFamily: 'var(--font-display)',
                          }}
                        >
                          Impact sur l'engagement
                        </h3>
                        <p style={{
                          fontSize: 'var(--text-sm)',
                          color: 'var(--muted-foreground)',
                        }}>
                          Taux de complétion des parcours
                        </p>
                      </div>
                    </div>
                    <div 
                      className="aspect-video rounded-2xl flex items-center justify-center relative overflow-hidden"
                      style={{
                        background: 'linear-gradient(135deg, rgba(248, 176, 68, 0.1) 0%, rgba(85, 161, 180, 0.1) 100%)',
                        border: '1px solid rgba(248, 176, 68, 0.2)',
                      }}
                    >
                      <img 
                        src="https://images.unsplash.com/photo-1724304013246-1abe63567e33?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbmZvZ3JhcGhpYyUyMHN0YXRpc3RpY3MlMjB2aXN1YWxpemF0aW9ufGVufDF8fHx8MTc2ODQ4NDg5M3ww&ixlib=rb-4.1.0&q=80&w=1080"
                        alt="Statistics Visualization"
                        className="w-full h-full object-cover opacity-80"
                      />
                      <div 
                        className="absolute inset-0 flex items-center justify-center"
                        style={{
                          background: 'rgba(248, 176, 68, 0.05)',
                        }}
                      >
                        <p 
                          className="px-4 py-2 rounded-xl"
                          style={{
                            background: 'rgba(255, 255, 255, 0.9)',
                            backdropFilter: 'blur(10px)',
                            fontSize: 'var(--text-sm)',
                            fontWeight: 'var(--font-weight-semibold)',
                            color: 'var(--accent)',
                          }}
                        >
                          +35% engagement
                        </p>
                      </div>
                    </div>
                  </motion.div>

                  {/* Chart Card 4 */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.0 }}
                    className="p-6 rounded-3xl"
                    style={{
                      background: 'rgba(255, 255, 255, 0.7)',
                      backdropFilter: 'blur(20px)',
                      border: '1px solid rgba(255, 255, 255, 0.5)',
                      boxShadow: '0 8px 32px rgba(0, 0, 0, 0.08)',
                    }}
                  >
                    <div className="flex items-center gap-3 mb-4">
                      <div 
                        className="w-10 h-10 rounded-xl flex items-center justify-center"
                        style={{
                          background: 'var(--gradient-primary)',
                        }}
                      >
                        <CheckCircle2 className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <h3 
                          style={{
                            fontSize: 'var(--text-lg)',
                            fontWeight: 'var(--font-weight-semibold)',
                            color: 'var(--foreground)',
                            fontFamily: 'var(--font-display)',
                          }}
                        >
                          Efficacité pédagogique
                        </h3>
                        <p style={{
                          fontSize: 'var(--text-sm)',
                          color: 'var(--muted-foreground)',
                        }}>
                          Réduction du temps d'apprentissage
                        </p>
                      </div>
                    </div>
                    <div 
                      className="aspect-video rounded-2xl flex items-center justify-center"
                      style={{
                        background: 'linear-gradient(135deg, rgba(85, 161, 180, 0.1) 0%, rgba(85, 161, 180, 0.05) 100%)',
                        border: '1px solid rgba(85, 161, 180, 0.2)',
                      }}
                    >
                      <div className="text-center">
                        <p 
                          style={{
                            fontSize: 'var(--text-5xl)',
                            fontWeight: 'var(--font-weight-bold)',
                            color: 'var(--primary)',
                            fontFamily: 'var(--font-display)',
                            marginBottom: 'var(--space-2)',
                          }}
                        >
                          -40%
                        </p>
                        <p 
                          style={{
                            fontSize: 'var(--text-sm)',
                            color: 'var(--muted-foreground)',
                            fontWeight: 'var(--font-weight-medium)',
                          }}
                        >
                          de temps économisé
                        </p>
                        <div className="flex items-center justify-center gap-2 mt-4">
                          <span 
                            className="px-3 py-1 rounded-full"
                            style={{
                              background: 'var(--success-lighter)',
                              color: 'var(--success-600)',
                              fontSize: 'var(--text-xs)',
                              fontWeight: 'var(--font-weight-semibold)',
                            }}
                          >
                            Formateurs
                          </span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </div>
              </motion.div>

              {/* CTA Buttons - Télécharger & Prévisualiser */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.0 }}
                className="flex flex-col sm:flex-row items-center gap-4 p-8 rounded-3xl mb-8"
                style={{
                  background: 'rgba(255, 255, 255, 0.7)',
                  backdropFilter: 'blur(20px)',
                  border: '1px solid rgba(255, 255, 255, 0.5)',
                  boxShadow: '0 8px 32px rgba(0, 0, 0, 0.08)',
                }}
              >
                <div className="flex-1 text-center sm:text-left">
                  <h3 
                    className="mb-2"
                    style={{
                      fontSize: 'var(--text-xl)',
                      fontWeight: 'var(--font-weight-bold)',
                      color: 'var(--foreground)',
                      fontFamily: 'var(--font-display)',
                    }}
                  >
                    Accéder au rapport complet
                  </h3>
                  <p style={{
                    fontSize: 'var(--text-sm)',
                    color: 'var(--muted-foreground)',
                  }}>
                    Téléchargez le document PDF ou consultez-le en ligne
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <ButtonEnhanced
                    variant="primary"
                    size="lg"
                    icon={<Download className="w-5 h-5" />}
                    onClick={handleDownload}
                  >
                    Télécharger le rapport
                  </ButtonEnhanced>
                  <ButtonEnhanced
                    variant="outline"
                    size="lg"
                    icon={<FileText className="w-5 h-5" />}
                    onClick={() => setIsPdfViewerOpen(true)}
                  >
                    Prévisualiser
                  </ButtonEnhanced>
                </div>
              </motion.div>

              {/* Tags */}
              <div className="flex items-center gap-2 flex-wrap mt-8">
                {content.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="px-3 py-1.5 rounded-full"
                    style={{
                      background: 'rgba(85, 161, 180, 0.1)',
                      color: 'var(--primary)',
                      fontSize: 'var(--text-xs)',
                      fontWeight: 'var(--font-weight-medium)',
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </motion.div>
          </div>
        </main>
      </div>

      {/* Immersive PDF Viewer Modal */}
      {isPdfViewerOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{
            background: 'linear-gradient(135deg, rgba(85, 161, 180, 0.15) 0%, rgba(0, 0, 0, 0.95) 50%, rgba(237, 132, 58, 0.15) 100%)',
            backdropFilter: 'blur(10px)',
          }}
          onClick={() => setIsPdfViewerOpen(false)}
        >
          {/* Header Bar */}
          <div className="absolute top-0 left-0 right-0 p-4 flex items-center justify-between z-10">
            <div className="flex items-center gap-3">
              <div 
                className="p-2 rounded-xl"
                style={{
                  background: 'rgba(255, 255, 255, 0.1)',
                  backdropFilter: 'blur(10px)',
                }}
              >
                <FileText className="w-5 h-5 text-white" />
              </div>
              <div>
                <p 
                  style={{
                    fontSize: 'var(--text-sm)',
                    fontWeight: 'var(--font-weight-semibold)',
                    color: 'white',
                  }}
                >
                  {content.title}
                </p>
                <p 
                  style={{
                    fontSize: 'var(--text-xs)',
                    color: 'rgba(255, 255, 255, 0.7)',
                  }}
                >
                  Prévisualisation PDF
                </p>
              </div>
            </div>
            <button
              onClick={() => setIsPdfViewerOpen(false)}
              className="p-3 rounded-xl transition-all duration-200"
              style={{
                background: 'rgba(255, 255, 255, 0.1)',
                backdropFilter: 'blur(10px)',
              }}
            >
              <X className="w-6 h-6 text-white" />
            </button>
          </div>

          {/* PDF Viewer Container */}
          <div 
            className="w-full h-full max-w-7xl mx-auto pt-20 pb-4" 
            onClick={(e) => e.stopPropagation()}
          >
            <div 
              className="w-full h-full rounded-2xl overflow-hidden"
              style={{
                background: 'rgba(255, 255, 255, 0.95)',
                backdropFilter: 'blur(20px)',
                boxShadow: '0 20px 60px rgba(0, 0, 0, 0.5)',
              }}
            >
              {content.pdfUrl ? (
                <iframe
                  src={content.pdfUrl}
                  className="w-full h-full"
                  style={{ border: 'none' }}
                  title="PDF Viewer"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <div className="text-center">
                    <FileText 
                      className="w-20 h-20 mx-auto mb-4" 
                      style={{ color: 'var(--muted-foreground)', opacity: 0.5 }} 
                    />
                    <p 
                      className="mb-2"
                      style={{
                        fontSize: 'var(--text-lg)',
                        fontWeight: 'var(--font-weight-semibold)',
                        color: 'var(--foreground)',
                      }}
                    >
                      Prévisualisation non disponible
                    </p>
                    <p style={{
                      fontSize: 'var(--text-sm)',
                      color: 'var(--muted-foreground)',
                    }}>
                      Le document PDF sera disponible après téléchargement
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </motion.div>
      )}

      <ToastContainer toasts={toasts} removeToast={removeToast} />
    </div>
  );
}