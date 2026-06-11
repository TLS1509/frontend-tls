import { useState } from 'react';
import { motion } from 'motion/react';
import {
  ArrowLeft,
  Download,
  Bookmark,
  BookmarkCheck,
  FileText,
  CheckCircle2,
  User,
  Calendar,
  Clock,
  Eye,
  Share2,
  ChevronRight,
  Award,
  TrendingUp,
  Target,
  Lightbulb,
  BarChart3,
} from 'lucide-react';
import { BackgroundBlobs } from '../components/ui/background-blobs';
import OptimizedSidebar from '../components/ui/optimized-sidebar';
import { useToast, ToastContainer } from '../components/ui/notification-toast';
import { getDossier } from '../data/veilleDossiersData';

interface DossierPageProps {
  dossierId?: number;
  onNavigate: (page: string) => void;
  onBack: () => void;
  onLogout: () => void;
}

export default function DossierPage({
  dossierId = 1,
  onNavigate,
  onBack,
  onLogout,
}: DossierPageProps) {
  const dossier = getDossier(dossierId);
  const [isSaved, setIsSaved] = useState(false);
  const [activeSection, setActiveSection] = useState(0);
  const toast = useToast();

  if (!dossier) {
    return (
      <div className="flex h-screen overflow-hidden" style={{ background: 'var(--background)' }}>
        <BackgroundBlobs />
        <OptimizedSidebar currentPage="veille" onNavigate={onNavigate} onLogout={onLogout} />
        <div className="flex-1 flex flex-col min-w-0">
          <main className="flex-1 overflow-y-auto flex items-center justify-center">
            <div className="text-center">
              <div
                className="w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center"
                style={{ background: 'rgba(248, 176, 68, 0.1)' }}
              >
                <FileText className="w-8 h-8" style={{ color: 'var(--secondary)' }} />
              </div>
              <p
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 'var(--text-xl)',
                  fontWeight: 'var(--font-weight-bold)',
                  color: 'var(--foreground)',
                }}
              >
                Dossier non trouvé
              </p>
            </div>
          </main>
        </div>
      </div>
    );
  }

  const handleSave = () => {
    setIsSaved(!isSaved);
    toast.showToast({
      id: `save-${Date.now()}`,
      title: isSaved ? 'Retiré des favoris' : 'Dossier sauvegardé',
      message: isSaved ? 'Le dossier a été retiré de vos favoris' : 'Retrouvez ce dossier dans vos favoris',
      type: 'success',
      duration: 2000,
    });
  };

  const handleDownload = () => {
    toast.showToast({
      id: `download-${Date.now()}`,
      title: 'Téléchargement démarré',
      message: 'Le dossier PDF est en cours de téléchargement',
      type: 'success',
      duration: 2000,
    });
  };

  const handleShare = () => {
    toast.showToast({
      id: `share-${Date.now()}`,
      title: 'Lien copié',
      message: 'Le lien du dossier a été copié',
      type: 'success',
      duration: 2000,
    });
  };

  return (
    <div className="flex h-screen overflow-hidden" style={{ background: 'var(--background)' }}>
      {/* Background Effects */}
      <BackgroundBlobs />

      {/* Sidebar */}
      <OptimizedSidebar currentPage="veille" onNavigate={onNavigate} onLogout={onLogout} />

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        <main className="flex-1 overflow-y-auto">
          <div style={{ minHeight: '100%', background: 'var(--background)' }}>
            {/* Sticky Header */}
            <div
              className="sticky top-0 z-20 border-b"
              style={{
                background: 'rgba(255, 255, 255, 0.85)',
                backdropFilter: 'blur(20px)',
                WebkitBackdropFilter: 'blur(20px)',
                borderColor: 'var(--border)',
              }}
            >
              <div className="max-w-6xl mx-auto px-6 py-4">
                <div className="flex items-center justify-between">
                  {/* Back Button */}
                  <motion.button
                    onClick={onBack}
                    className="flex items-center gap-2 px-4 py-2 rounded-xl transition-colors duration-200"
                    style={{
                      background: 'rgba(248, 176, 68, 0.1)',
                      color: 'var(--secondary)',
                      fontFamily: 'var(--font-body)',
                      fontSize: 'var(--text-sm)',
                      fontWeight: 'var(--font-weight-medium)',
                    }}
                    whileHover={{ scale: 1.02, background: 'rgba(248, 176, 68, 0.15)' }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <ArrowLeft className="w-4 h-4" />
                    <span>Retour</span>
                  </motion.button>

                  {/* Actions */}
                  <div className="flex items-center gap-2">
                    {/* Download Button - Primary CTA */}
                    <motion.button
                      onClick={handleDownload}
                      className="flex items-center gap-2 px-5 py-2.5 rounded-xl"
                      style={{
                        background: 'linear-gradient(135deg, var(--secondary), #e5a03d)',
                        color: 'white',
                        fontFamily: 'var(--font-body)',
                        fontSize: 'var(--text-sm)',
                        fontWeight: 'var(--font-weight-semibold)',
                        boxShadow: '0 4px 12px rgba(248, 176, 68, 0.3)',
                      }}
                      whileHover={{ scale: 1.05, boxShadow: '0 6px 20px rgba(248, 176, 68, 0.4)' }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Download className="w-4 h-4" />
                      <span>Télécharger PDF</span>
                    </motion.button>

                    {/* Save Button */}
                    <motion.button
                      onClick={handleSave}
                      className="p-2.5 rounded-xl transition-all duration-200"
                      style={{
                        background: isSaved ? 'rgba(248, 176, 68, 0.12)' : 'transparent',
                        color: isSaved ? 'var(--secondary)' : 'var(--muted-foreground)',
                      }}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      {isSaved ? <BookmarkCheck className="w-5 h-5" /> : <Bookmark className="w-5 h-5" />}
                    </motion.button>

                    {/* Share Button */}
                    <motion.button
                      onClick={handleShare}
                      className="p-2.5 rounded-xl transition-colors duration-200"
                      style={{ color: 'var(--muted-foreground)' }}
                      whileHover={{ scale: 1.05, color: 'var(--secondary)' }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Share2 className="w-5 h-5" />
                    </motion.button>
                  </div>
                </div>
              </div>
            </div>

            {/* Hero Section */}
            <div
              className="relative overflow-hidden"
              style={{
                background: 'linear-gradient(135deg, rgba(248, 176, 68, 0.08) 0%, rgba(248, 176, 68, 0.03) 100%)',
              }}
            >
              <div className="max-w-6xl mx-auto px-6 pt-12 pb-8">
                {/* Breadcrumb */}
                <motion.div
                  className="flex items-center gap-2 mb-6"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <span
                    style={{
                      fontFamily: 'var(--font-body)',
                      fontSize: 'var(--text-sm)',
                      color: 'var(--muted-foreground)',
                    }}
                  >
                    Veille & Apprentissage
                  </span>
                  <ChevronRight className="w-4 h-4" style={{ color: 'var(--muted-foreground)' }} />
                  <span
                    style={{
                      fontFamily: 'var(--font-body)',
                      fontSize: 'var(--text-sm)',
                      color: 'var(--secondary)',
                      fontWeight: 'var(--font-weight-medium)',
                    }}
                  >
                    {dossier.category}
                  </span>
                </motion.div>

                {/* Category Badge */}
                <motion.div
                  className="flex items-center gap-3 mb-6"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 }}
                >
                  <div
                    className="w-14 h-14 rounded-2xl flex items-center justify-center"
                    style={{
                      background: 'rgba(248, 176, 68, 0.15)',
                    }}
                  >
                    <span style={{ fontSize: '28px', lineHeight: 1 }}>{dossier.emoji}</span>
                  </div>
                </motion.div>

                {/* Title */}
                <motion.h1
                  className="mb-6"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: 'clamp(2rem, 5vw, 3.5rem)',
                    fontWeight: 'var(--font-weight-bold)',
                    lineHeight: 'var(--leading-tight)',
                    color: 'var(--foreground)',
                  }}
                >
                  {dossier.title}
                </motion.h1>

                {/* Meta Info */}
                <motion.div
                  className="flex flex-wrap items-center gap-6"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                >
                  <div className="flex items-center gap-2">
                    <User className="w-4 h-4" style={{ color: 'var(--muted-foreground)' }} />
                    <span
                      style={{
                        fontFamily: 'var(--font-body)',
                        fontSize: 'var(--text-sm)',
                        color: 'var(--foreground)',
                        fontWeight: 'var(--font-weight-medium)',
                      }}
                    >
                      The Learning Society
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" style={{ color: 'var(--muted-foreground)' }} />
                    <span
                      style={{
                        fontFamily: 'var(--font-body)',
                        fontSize: 'var(--text-sm)',
                        color: 'var(--muted-foreground)',
                      }}
                    >
                      {dossier.publishDate}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <FileText className="w-4 h-4" style={{ color: 'var(--muted-foreground)' }} />
                    <span
                      style={{
                        fontFamily: 'var(--font-body)',
                        fontSize: 'var(--text-sm)',
                        color: 'var(--muted-foreground)',
                      }}
                    >
                      {dossier.pages} pages
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <Download className="w-4 h-4" style={{ color: 'var(--muted-foreground)' }} />
                    <span
                      style={{
                        fontFamily: 'var(--font-body)',
                        fontSize: 'var(--text-sm)',
                        color: 'var(--muted-foreground)',
                      }}
                    >
                      {dossier.downloads.toLocaleString()} téléchargements
                    </span>
                  </div>
                </motion.div>
              </div>
            </div>

            {/* Executive Summary */}
            <div className="max-w-6xl mx-auto px-6 py-12">
              <motion.div
                className="mb-12 p-8 rounded-3xl"
                style={{
                  background: 'linear-gradient(135deg, rgba(248, 176, 68, 0.1) 0%, rgba(248, 176, 68, 0.05) 100%)',
                  border: '2px solid rgba(248, 176, 68, 0.2)',
                }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                <div className="flex items-center gap-3 mb-4">
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center"
                    style={{
                      background: 'var(--secondary)',
                    }}
                  >
                    <Lightbulb className="w-5 h-5" style={{ color: 'white' }} />
                  </div>
                  <h2
                    style={{
                      fontFamily: 'var(--font-display)',
                      fontSize: 'var(--text-2xl)',
                      fontWeight: 'var(--font-weight-bold)',
                      color: 'var(--foreground)',
                    }}
                  >
                    Résumé exécutif
                  </h2>
                </div>
                <p
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: 'var(--text-lg)',
                    lineHeight: 'var(--leading-relaxed)',
                    color: 'var(--foreground)',
                    fontWeight: 'var(--font-weight-medium)',
                  }}
                >
                  {dossier.executiveSummary}
                </p>
              </motion.div>



              {/* Sections with Navigation */}
              {dossier.sections && dossier.sections.length > 0 && (
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                  {/* Sections Navigation */}
                  <div className="lg:col-span-1">
                    <div className="sticky top-24">
                      <h3
                        className="mb-4"
                        style={{
                          fontFamily: 'var(--font-display)',
                          fontSize: 'var(--text-lg)',
                          fontWeight: 'var(--font-weight-bold)',
                          color: 'var(--foreground)',
                        }}
                      >
                        Sommaire
                      </h3>
                      <div className="space-y-2">
                        {dossier.sections.map((section, index) => (
                          <motion.button
                            key={index}
                            onClick={() => setActiveSection(index)}
                            className="w-full text-left p-3 rounded-xl transition-all duration-200"
                            style={{
                              background:
                                activeSection === index
                                  ? 'rgba(248, 176, 68, 0.12)'
                                  : 'transparent',
                              border:
                                activeSection === index
                                  ? '1px solid rgba(248, 176, 68, 0.3)'
                                  : '1px solid transparent',
                            }}
                            whileHover={{ x: 4 }}
                            whileTap={{ scale: 0.98 }}
                          >
                            <div className="flex items-start gap-3">
                              <div
                                className="w-6 h-6 rounded-lg flex items-center justify-center flex-shrink-0"
                                style={{
                                  background:
                                    activeSection === index
                                      ? 'var(--secondary)'
                                      : 'rgba(0, 0, 0, 0.05)',
                                  color:
                                    activeSection === index
                                      ? 'white'
                                      : 'var(--muted-foreground)',
                                  fontFamily: 'var(--font-body)',
                                  fontSize: 'var(--text-xs)',
                                  fontWeight: 'var(--font-weight-bold)',
                                }}
                              >
                                {activeSection === index ? (
                                  <CheckCircle2 className="w-4 h-4" />
                                ) : (
                                  index + 1
                                )}
                              </div>
                              <span
                                style={{
                                  fontFamily: 'var(--font-body)',
                                  fontSize: 'var(--text-sm)',
                                  fontWeight:
                                    activeSection === index
                                      ? 'var(--font-weight-semibold)'
                                      : 'var(--font-weight-medium)',
                                  color:
                                    activeSection === index
                                      ? 'var(--secondary)'
                                      : 'var(--foreground)',
                                  lineHeight: 'var(--leading-snug)',
                                }}
                              >
                                {section.title}
                              </span>
                            </div>
                          </motion.button>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Section Content */}
                  <div className="lg:col-span-3">
                    <motion.div
                      key={activeSection}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <h2
                        className="mb-6"
                        style={{
                          fontFamily: 'var(--font-display)',
                          fontSize: 'var(--text-2xl)',
                          fontWeight: 'var(--font-weight-bold)',
                          color: 'var(--foreground)',
                        }}
                      >
                        {dossier.sections[activeSection].title}
                      </h2>
                      <div className="space-y-4">
                        {dossier.sections[activeSection].content.map((paragraph, pIndex) => (
                          <p
                            key={pIndex}
                            style={{
                              fontFamily: 'var(--font-body)',
                              fontSize: 'var(--text-base)',
                              lineHeight: 'var(--leading-relaxed)',
                              color: 'var(--foreground)',
                            }}
                          >
                            {paragraph}
                          </p>
                        ))}
                      </div>
                    </motion.div>
                  </div>
                </div>
              )}

              {/* Key Findings - MOVED HERE (after sommaire, before conclusion) */}
              {dossier.keyFindings && dossier.keyFindings.length > 0 && (
                <motion.div
                  className="mt-12 mb-12"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                >
                  <h2
                    className="mb-6"
                    style={{
                      fontFamily: 'var(--font-display)',
                      fontSize: 'var(--text-2xl)',
                      fontWeight: 'var(--font-weight-bold)',
                      color: 'var(--foreground)',
                    }}
                  >
                    Points clés
                  </h2>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {dossier.keyFindings.map((finding, index) => {
                      const icons = [Target, TrendingUp, Award, BarChart3];
                      const Icon = icons[index % icons.length];
                      
                      return (
                        <motion.div
                          key={index}
                          className="p-6 rounded-2xl"
                          style={{
                            background: 'rgba(255, 255, 255, 0.6)',
                            border: '1px solid var(--border)',
                          }}
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: index * 0.1 }}
                          whileHover={{ x: 4, boxShadow: 'var(--shadow-md)' }}
                        >
                          <div className="flex gap-4">
                            <div
                              className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                              style={{
                                background: 'linear-gradient(135deg, var(--secondary), #e5a03d)',
                                boxShadow: '0 4px 12px rgba(248, 176, 68, 0.25)',
                              }}
                            >
                              <Icon className="w-6 h-6" style={{ color: 'white' }} />
                            </div>
                            <div className="flex-1">
                              <h3
                                className="mb-2"
                                style={{
                                  fontFamily: 'var(--font-display)',
                                  fontSize: 'var(--text-base)',
                                  fontWeight: 'var(--font-weight-bold)',
                                  color: 'var(--foreground)',
                                }}
                              >
                                {finding.title}
                              </h3>
                              <p
                                style={{
                                  fontFamily: 'var(--font-body)',
                                  fontSize: 'var(--text-sm)',
                                  lineHeight: 'var(--leading-relaxed)',
                                  color: 'var(--muted-foreground)',
                                }}
                              >
                                {finding.description}
                              </p>
                            </div>
                          </div>
                        </motion.div>
                      );
                    })}
                  </div>
                </motion.div>
              )}

              {/* Data Visualizations Section - NEW: Charts, Stats & Visuals */}
              <motion.div
                className="mt-12 mb-12"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <h2
                  className="mb-6"
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: 'var(--text-2xl)',
                    fontWeight: 'var(--font-weight-bold)',
                    color: 'var(--foreground)',
                  }}
                >
                  Données & Analyses
                </h2>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                  {[
                    { value: '78%', label: 'Taux d\'adoption', trend: '+12%', color: 'var(--primary)' },
                    { value: '2.4M', label: 'Utilisateurs actifs', trend: '+28%', color: 'var(--secondary)' },
                    { value: '94', label: 'Score de satisfaction', trend: '+5pts', color: 'var(--accent)' },
                  ].map((stat, index) => (
                    <motion.div
                      key={index}
                      className="p-6 rounded-2xl text-center"
                      style={{
                        background: 'rgba(255, 255, 255, 0.6)',
                        backdropFilter: 'blur(20px)',
                        WebkitBackdropFilter: 'blur(20px)',
                        border: '1px solid var(--border)',
                      }}
                      initial={{ opacity: 0, scale: 0.95 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 }}
                      whileHover={{ y: -4, boxShadow: 'var(--shadow-lg)' }}
                    >
                      <div
                        style={{
                          fontFamily: 'var(--font-display)',
                          fontSize: 'clamp(2rem, 5vw, 3rem)',
                          fontWeight: 'var(--font-weight-black)',
                          color: stat.color,
                          lineHeight: '1.1',
                          marginBottom: 'var(--space-2)',
                        }}
                      >
                        {stat.value}
                      </div>
                      <div
                        style={{
                          fontFamily: 'var(--font-body)',
                          fontSize: 'var(--text-base)',
                          fontWeight: 'var(--font-weight-medium)',
                          color: 'var(--foreground)',
                          marginBottom: 'var(--space-2)',
                        }}
                      >
                        {stat.label}
                      </div>
                      <div
                        className="inline-flex items-center gap-1 px-2 py-1 rounded-lg"
                        style={{
                          background: 'rgba(34, 197, 94, 0.1)',
                          fontFamily: 'var(--font-body)',
                          fontSize: 'var(--text-sm)',
                          fontWeight: 'var(--font-weight-semibold)',
                          color: 'rgb(34, 197, 94)',
                        }}
                      >
                        <TrendingUp className="w-3 h-3" />
                        {stat.trend}
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* Charts Placeholders */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Chart 1 Placeholder */}
                  <motion.div
                    className="p-8 rounded-2xl"
                    style={{
                      background: 'rgba(255, 255, 255, 0.6)',
                      backdropFilter: 'blur(20px)',
                      WebkitBackdropFilter: 'blur(20px)',
                      border: '1px solid var(--border)',
                    }}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                  >
                    <div className="flex items-center gap-3 mb-6">
                      <div
                        className="w-10 h-10 rounded-xl flex items-center justify-center"
                        style={{
                          background: 'linear-gradient(135deg, var(--primary), var(--primary-hover))',
                        }}
                      >
                        <BarChart3 className="w-5 h-5" style={{ color: 'white' }} />
                      </div>
                      <h3
                        style={{
                          fontFamily: 'var(--font-display)',
                          fontSize: 'var(--text-lg)',
                          fontWeight: 'var(--font-weight-bold)',
                          color: 'var(--foreground)',
                        }}
                      >
                        Évolution du marché
                      </h3>
                    </div>
                    <div
                      className="w-full rounded-xl flex items-center justify-center"
                      style={{
                        height: '280px',
                        background: 'linear-gradient(135deg, rgba(85, 161, 180, 0.05) 0%, rgba(85, 161, 180, 0.1) 100%)',
                        border: '2px dashed var(--border)',
                      }}
                    >
                      <div className="text-center">
                        <BarChart3
                          className="w-12 h-12 mx-auto mb-3"
                          style={{ color: 'var(--muted-foreground)', opacity: 0.4 }}
                        />
                        <p
                          style={{
                            fontFamily: 'var(--font-body)',
                            fontSize: 'var(--text-sm)',
                            color: 'var(--muted-foreground)',
                          }}
                        >
                          Graphique d'évolution
                        </p>
                      </div>
                    </div>
                  </motion.div>

                  {/* Chart 2 Placeholder */}
                  <motion.div
                    className="p-8 rounded-2xl"
                    style={{
                      background: 'rgba(255, 255, 255, 0.6)',
                      backdropFilter: 'blur(20px)',
                      WebkitBackdropFilter: 'blur(20px)',
                      border: '1px solid var(--border)',
                    }}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                  >
                    <div className="flex items-center gap-3 mb-6">
                      <div
                        className="w-10 h-10 rounded-xl flex items-center justify-center"
                        style={{
                          background: 'linear-gradient(135deg, var(--secondary), #e5a03d)',
                        }}
                      >
                        <TrendingUp className="w-5 h-5" style={{ color: 'white' }} />
                      </div>
                      <h3
                        style={{
                          fontFamily: 'var(--font-display)',
                          fontSize: 'var(--text-lg)',
                          fontWeight: 'var(--font-weight-bold)',
                          color: 'var(--foreground)',
                        }}
                      >
                        Tendances clés
                      </h3>
                    </div>
                    <div
                      className="w-full rounded-xl flex items-center justify-center"
                      style={{
                        height: '280px',
                        background: 'linear-gradient(135deg, rgba(248, 176, 68, 0.05) 0%, rgba(248, 176, 68, 0.1) 100%)',
                        border: '2px dashed var(--border)',
                      }}
                    >
                      <div className="text-center">
                        <TrendingUp
                          className="w-12 h-12 mx-auto mb-3"
                          style={{ color: 'var(--muted-foreground)', opacity: 0.4 }}
                        />
                        <p
                          style={{
                            fontFamily: 'var(--font-body)',
                            fontSize: 'var(--text-sm)',
                            color: 'var(--muted-foreground)',
                          }}
                        >
                          Graphique de tendances
                        </p>
                      </div>
                    </div>
                  </motion.div>
                </div>
              </motion.div>

              {/* Conclusion */}
              {dossier.conclusion && (
                <motion.div
                  className="mt-12 p-8 rounded-3xl"
                  style={{
                    background: 'rgba(85, 161, 180, 0.08)',
                    border: '1px solid rgba(85, 161, 180, 0.2)',
                  }}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                >
                  <h2
                    className="mb-4"
                    style={{
                      fontFamily: 'var(--font-display)',
                      fontSize: 'var(--text-xl)',
                      fontWeight: 'var(--font-weight-bold)',
                      color: 'var(--foreground)',
                    }}
                  >
                    Conclusion
                  </h2>
                  <p
                    style={{
                      fontFamily: 'var(--font-body)',
                      fontSize: 'var(--text-base)',
                      lineHeight: 'var(--leading-relaxed)',
                      color: 'var(--foreground)',
                    }}
                  >
                    {dossier.conclusion}
                  </p>
                </motion.div>
              )}

              {/* Download CTA */}
              <motion.div
                className="mt-12 p-10 rounded-3xl text-center"
                style={{
                  background: 'linear-gradient(135deg, rgba(248, 176, 68, 0.12) 0%, rgba(248, 176, 68, 0.08) 100%)',
                  border: '2px solid rgba(248, 176, 68, 0.25)',
                }}
                initial={{ opacity: 0, scale: 0.98 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
              >
                <div
                  className="w-16 h-16 rounded-2xl mx-auto mb-4 flex items-center justify-center"
                  style={{
                    background: 'var(--secondary)',
                    boxShadow: '0 8px 24px rgba(248, 176, 68, 0.3)',
                  }}
                >
                  <Download className="w-8 h-8" style={{ color: 'white' }} />
                </div>
                <h3
                  className="mb-3"
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: 'var(--text-2xl)',
                    fontWeight: 'var(--font-weight-bold)',
                    color: 'var(--foreground)',
                  }}
                >
                  Téléchargez le dossier complet
                </h3>
                <p
                  className="mb-6"
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: 'var(--text-base)',
                    color: 'var(--muted-foreground)',
                    maxWidth: '600px',
                    margin: '0 auto 24px',
                  }}
                >
                  Accédez à l'intégralité du dossier de {dossier.pages} pages au format PDF pour une lecture hors ligne
                </p>
                <motion.button
                  onClick={handleDownload}
                  className="px-8 py-4 rounded-xl inline-flex items-center gap-3"
                  style={{
                    background: 'linear-gradient(135deg, var(--secondary), #e5a03d)',
                    color: 'white',
                    fontFamily: 'var(--font-body)',
                    fontSize: 'var(--text-base)',
                    fontWeight: 'var(--font-weight-semibold)',
                    boxShadow: '0 8px 24px rgba(248, 176, 68, 0.35)',
                  }}
                  whileHover={{ scale: 1.05, boxShadow: '0 12px 32px rgba(248, 176, 68, 0.45)' }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Download className="w-5 h-5" />
                  <span>Télécharger le PDF ({dossier.pages} pages)</span>
                </motion.button>
              </motion.div>
            </div>
          </div>
        </main>
      </div>

      {/* Toast Container */}
      <ToastContainer toasts={toast.toasts} onClose={toast.closeToast} />
    </div>
  );
}
