import { useState } from 'react';
import { 
  Video,
  Clock,
  Calendar,
  CheckCircle2,
  MessageSquare,
  Award,
  BookMarked,
  ArrowRight,
  User,
  Mail,
  Phone,
  Linkedin,
  ExternalLink,
  Star,
  ChevronLeft,
  ChevronRight,
  Download,
  FileText,
  Edit3,
  X as XIcon,
  ClipboardList,
  FileCheck,
  Notebook,
  CalendarClock,
  Trash2,
} from 'lucide-react';
import { BackgroundBlobs } from '../components/ui/background-blobs';
import OptimizedSidebar from '../components/ui/optimized-sidebar';
import { SectionHeader } from '../components/common/SectionHeader';
import { PageHeaderSimple } from '../components/common/PageHeaderSimple';

// ✅ Import upgraded components
import { ButtonEnhanced } from '../components/ui/button-enhanced';
import { EmptyState } from '../components/ui/empty-state';
import { useToast, ToastContainer } from '../components/ui/notification-toast';

import { BookingModalMinimal } from '../components/coaching/BookingModalMinimal';
import { CancelSessionModal } from '../components/coaching/CancelSessionModal';
import { UpcomingSessionCard } from '../components/coaching/UpcomingSessionCard';

interface CoachingPageProps {
  onNavigate: (page: 'dashboard' | 'parcours' | 'coaching' | 'learning-space' | 'profile' | 'veille' | 'entreprise-dashboard' | 'journal' | 'journal-detail' | 'journal-free-entry' | 'account' | 'pre-coaching-questionnaire' | 'questionnaire-response', entryId?: number, templateType?: 'free' | 'learning' | 'coaching' | 'insight') => void;
  onLogout: () => void;
}

// ✅ Single coach data
const coach = {
  name: 'Sophie Martin',
  title: 'Expert IA & Pédagogie',
  avatar: 'SM',
  bio: 'Spécialiste en IA générative et ingénierie pédagogique avec 10+ ans d\'expérience dans la formation professionnelle.',
  specialties: ['IA Générative', 'Prompt Engineering', 'Design Pédagogique', 'Stratégie Formation'],
  rating: 4.9,
  totalSessions: 156,
  email: 'sophie.martin@thelearningapp.io',
  linkedin: 'linkedin.com/in/sophiemartin',
  phone: '+33 6 12 34 56 78',
};

// ✅ Calendar slots (simplified for demo - will integrate real calendar tool)
const availableSlots = [
  { date: '2026-01-08', time: '10:00', available: true },
  { date: '2026-01-08', time: '14:00', available: true },
  { date: '2026-01-08', time: '16:00', available: false },
  { date: '2026-01-09', time: '09:00', available: true },
  { date: '2026-01-09', time: '11:00', available: true },
  { date: '2026-01-09', time: '15:00', available: true },
  { date: '2026-01-10', time: '10:00', available: true },
  { date: '2026-01-10', time: '14:00', available: true },
];

// ✅ Past sessions with journal links
const pastSessions = [
  {
    id: 1,
    date: '15 décembre 2024',
    time: '14:00',
    duration: '1h',
    title: 'Introduction au Prompt Engineering',
    notes: 'Excellent échange sur les fondamentaux du prompting. Points clés : structure ROLE-CONTEXT-TASK.',
    rating: 5,
    questionnaireId: 1, // ID du questionnaire rempli
    coachReportPdfUrl: '/reports/session-1-report.pdf', // PDF du compte-rendu
    journalEntryId: 5, // Entrée journal coaching de l'utilisateur
    hasJournalEntry: true,
  },
  {
    id: 2,
    date: '8 décembre 2024',
    time: '10:00',
    duration: '1h',
    title: 'Stratégie d\'implémentation IA en formation',
    notes: 'Discussion approfondie sur comment intégrer l\'IA dans mes formations existantes.',
    rating: 5,
    questionnaireId: 2,
    coachReportPdfUrl: '/reports/session-2-report.pdf',
    journalEntryId: 9,
    hasJournalEntry: true,
  },
  {
    id: 3,
    date: '1 décembre 2024',
    time: '15:00',
    duration: '45min',
    title: 'Session découverte - Objectifs et plan',
    notes: 'Première session très productive. Définition des objectifs et création du plan de formation personnalisé.',
    rating: 5,
    questionnaireId: 3,
    coachReportPdfUrl: '/reports/session-3-report.pdf',
    journalEntryId: null,
    hasJournalEntry: false,
  },
];

export default function CoachingPageUpgraded({ onNavigate, onLogout }: CoachingPageProps) {
  // ✅ State management
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);
  const [showBookingSuccess, setShowBookingSuccess] = useState(false);
  const [currentWeek, setCurrentWeek] = useState(0);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [isCancelModalOpen, setIsCancelModalOpen] = useState(false);
  
  // ✅ Upcoming session state (starts with a default session for demo)
  const [upcomingSession, setUpcomingSession] = useState<{
    date: string;
    time: string;
    duration: string;
    title: string;
    meetingLink: string;
    questionnaireId?: number;
  } | null>({
    date: '2026-01-28T14:00:00',
    time: '14:00',
    duration: '1h',
    title: 'Session de coaching IA',
    meetingLink: 'https://meet.google.com/abc-defg-hij',
    questionnaireId: 4, // Questionnaire en attente de remplissage
  });

  // ✅ Toast notifications
  const { toasts, success, info, removeToast } = useToast();

  const handleBookingConfirmed = (slot: { date: string; time: string }) => {
    // Update upcoming session
    setUpcomingSession({
      date: slot.date,
      time: slot.time,
      duration: '1h',
      title: 'Session de coaching IA',
      meetingLink: 'https://meet.google.com/abc-defg-hij',
    });
    
    // Show success
    setShowBookingSuccess(true);
    success(
      'Session réservée !',
      `Votre rendez-vous avec ${coach.name} est confirmé pour le ${new Date(slot.date).toLocaleDateString('fr-FR')} à ${slot.time}. Un email vous a été envoyé avec un questionnaire de préparation.`
    );
    
    // Close modal
    setIsBookingModalOpen(false);
  };

  const handleCancelSession = () => {
    setUpcomingSession(null);
    setIsCancelModalOpen(false);
    info(
      'Session annulée',
      'Votre session a été annulée. Vous pouvez planifier une nouvelle session à tout moment.'
    );
  };

  const handleRescheduleSession = () => {
    setIsBookingModalOpen(true);
  };

  const getWeekDates = (weekOffset: number) => {
    const today = new Date();
    const startOfWeek = new Date(today);
    startOfWeek.setDate(today.getDate() + weekOffset * 7);
    
    const dates = [];
    for (let i = 0; i < 7; i++) {
      const date = new Date(startOfWeek);
      date.setDate(startOfWeek.getDate() + i);
      dates.push(date);
    }
    return dates;
  };

  const weekDates = getWeekDates(currentWeek);

  return (
    <div className="min-h-screen relative overflow-hidden" style={{ background: 'linear-gradient(to bottom right, var(--primary-50), white, var(--accent-50))' }}>

      <div className="flex h-screen">
        <OptimizedSidebar
          currentPage="coaching"
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
            <PageHeaderSimple
              title="Coaching 1-to-1"
              description="Bénéficiez d'un accompagnement personnalisé avec votre expert IA"
            />

            {/* ========== UPCOMING SESSION (if exists) ========== */}
            {upcomingSession && (
              <div className="mb-12">
                <SectionHeader
                  icon={Calendar}
                  title="Prochaine session"
                />

                <UpcomingSessionCard
                  session={upcomingSession}
                  coachName={coach.name}
                  onReschedule={handleRescheduleSession}
                  onCancel={() => setIsCancelModalOpen(true)}
                  onPrepare={() => onNavigate('pre-coaching-questionnaire')}
                />
              </div>
            )}

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
              {/* ========== LEFT COLUMN: COACH INFO ========== */}
              <div className="lg:col-span-1">
                <div 
                  className="p-6 md:p-8 rounded-3xl relative overflow-hidden sticky top-6"
                  style={{
                    background: 'rgba(255, 255, 255, 0.7)',
                    backdropFilter: 'blur(20px)',
                    WebkitBackdropFilter: 'blur(20px)',
                    border: '1px solid rgba(255, 255, 255, 0.5)',
                    boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.08), inset 0 1px 0 0 rgba(255, 255, 255, 0.9)',
                  }}
                >
                  <div 
                    className="absolute inset-0 opacity-20"
                    style={{
                      background: 'radial-gradient(circle at 50% 0%, rgba(85, 161, 180, 0.15) 0%, transparent 70%)',
                      pointerEvents: 'none',
                    }}
                  />

                  <div className="relative">
                    {/* Avatar */}
                    <div className="flex justify-center mb-6">
                      <div 
                        className="w-24 h-24 rounded-full flex items-center justify-center"
                        style={{
                          background: 'var(--gradient-primary)',
                          boxShadow: '0 8px 24px rgba(85, 161, 180, 0.4)',
                        }}
                      >
                        <span 
                          style={{ 
                            color: 'white',
                            fontWeight: 'var(--font-weight-bold)',
                            fontSize: 'var(--text-3xl)',
                          }}
                        >
                          {coach.avatar}
                        </span>
                      </div>
                    </div>

                    {/* Name & Title */}
                    <div style={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      gap: 'var(--space-2)',
                      marginBottom: 'var(--space-6)',
                    }}>
                      <h2 
                        style={{ 
                          fontFamily: 'var(--font-display)',
                          fontSize: 'var(--text-2xl)',
                          fontWeight: 'var(--font-weight-bold)',
                          color: 'var(--foreground)',
                          margin: 0,
                        }}
                      >
                        {coach.name}
                      </h2>
                      <p 
                        style={{ 
                          fontSize: 'var(--text-base)',
                          color: 'var(--muted-foreground)',
                          margin: 0,
                        }}
                      >
                        {coach.title}
                      </p>
                    </div>

                    {/* Bio */}
                    <p 
                      style={{ 
                        fontSize: 'var(--text-base)',
                        color: 'var(--muted-foreground)',
                        lineHeight: 'var(--leading-relaxed)',
                        textAlign: 'center',
                        margin: 0,
                        marginBottom: 'var(--space-6)',
                      }}
                    >
                      {coach.bio}
                    </p>

                    {/* Specialties */}
                    <div style={{
                      display: 'flex',
                      flexDirection: 'column',
                      gap: 'var(--space-3)',
                      marginBottom: 'var(--space-6)',
                    }}>
                      <h3 
                        style={{ 
                          fontSize: 'var(--text-sm)',
                          fontWeight: 'var(--font-weight-semibold)',
                          color: 'var(--foreground)',
                          textTransform: 'uppercase',
                          letterSpacing: 'var(--tracking-wider)',
                          margin: 0,
                        }}
                      >
                        Spécialités
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {coach.specialties.map((specialty, idx) => (
                          <span
                            key={idx}
                            className="px-3 py-1.5 rounded-full"
                            style={{
                              background: 'var(--primary-lighter)',
                              color: 'var(--primary)',
                              fontSize: 'var(--text-xs)',
                              fontWeight: 'var(--font-weight-semibold)',
                            }}
                          >
                            {specialty}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Contact Info */}
                    <div 
                      style={{
                        paddingTop: 'var(--space-6)',
                        borderTop: '1px solid rgba(0, 0, 0, 0.06)',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 'var(--space-3)',
                      }}
                    >
                      <h3 
                        style={{ 
                          fontSize: 'var(--text-sm)',
                          fontWeight: 'var(--font-weight-semibold)',
                          color: 'var(--foreground)',
                          textTransform: 'uppercase',
                          letterSpacing: 'var(--tracking-wider)',
                          margin: 0,
                        }}
                      >
                        Contact
                      </h3>
                      <div className="space-y-2">
                        <a 
                          href={`mailto:${coach.email}`}
                          className="flex items-center gap-2 p-2 rounded-lg transition-all duration-200"
                          style={{
                            fontSize: 'var(--text-sm)',
                            color: 'var(--muted-foreground)',
                            textDecoration: 'none',
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.background = 'rgba(85, 161, 180, 0.08)';
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.background = 'transparent';
                          }}
                        >
                          <Mail className="w-4 h-4" />
                          <span>{coach.email}</span>
                        </a>
                        <a 
                          href={`https://${coach.linkedin}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 p-2 rounded-lg transition-all duration-200"
                          style={{
                            fontSize: 'var(--text-sm)',
                            color: 'var(--muted-foreground)',
                            textDecoration: 'none',
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.background = 'rgba(85, 161, 180, 0.08)';
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.background = 'transparent';
                          }}
                        >
                          <Linkedin className="w-4 h-4" />
                          <span>LinkedIn</span>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* ========== RIGHT COLUMN: BOOKING & SESSIONS ========== */}
              <div className="lg:col-span-2 space-y-8">
                
                {/* ========== NO UPCOMING SESSION → CALL TO ACTION ========== */}
                {!upcomingSession && (
                  <div>
                    <SectionHeader
                      icon={Calendar}
                      title="Prochaine session"
                      subtitle="Réservez votre prochaine session de coaching"
                    />

                    <div 
                      className="p-8 md:p-12 rounded-3xl relative overflow-hidden text-center"
                      style={{
                        background: 'rgba(255, 255, 255, 0.7)',
                        backdropFilter: 'blur(20px)',
                        WebkitBackdropFilter: 'blur(20px)',
                        border: '1px solid rgba(255, 255, 255, 0.5)',
                        boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.08), inset 0 1px 0 0 rgba(255, 255, 255, 0.9)',
                      }}
                    >
                      <div 
                        className="absolute inset-0 opacity-20"
                        style={{
                          background: 'radial-gradient(circle at 50% 0%, rgba(85, 161, 180, 0.15) 0%, transparent 70%)',
                          pointerEvents: 'none',
                        }}
                      />

                      <div className="relative">
                        {/* Icon */}
                        {/* Header Section avec Gap */}
                        <div style={{
                          display: 'flex',
                          flexDirection: 'column',
                          alignItems: 'center',
                          gap: 'var(--space-6)',
                          marginBottom: 'var(--space-8)',
                        }}>
                          {/* Icon */}
                          <div 
                            className="w-20 h-20 rounded-full flex items-center justify-center"
                            style={{
                              background: 'var(--gradient-primary)',
                              boxShadow: '0 8px 24px rgba(85, 161, 180, 0.4)',
                            }}
                          >
                            <Calendar className="w-10 h-10" style={{ color: 'white' }} />
                          </div>

                          {/* Title + Description Group */}
                          <div style={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            gap: 'var(--space-3)',
                            textAlign: 'center',
                          }}>
                            <h3 
                              style={{ 
                                fontFamily: 'var(--font-display)',
                                fontSize: 'var(--text-2xl)',
                                fontWeight: 'var(--font-weight-bold)',
                                color: 'var(--foreground)',
                                margin: 0,
                              }}
                            >
                              Réservez une session avec votre coach
                            </h3>

                            <p 
                              style={{ 
                                fontSize: 'var(--text-base)',
                                color: 'var(--muted-foreground)',
                                lineHeight: 'var(--leading-relaxed)',
                                maxWidth: '500px',
                                margin: 0,
                              }}
                            >
                              Prenez rendez-vous pour un accompagnement personnalisé avec {coach.name} et boostez votre apprentissage
                            </p>
                          </div>
                        </div>

                        {/* CTA Button */}
                        <button
                          onClick={() => setIsBookingModalOpen(true)}
                          className="inline-flex items-center gap-3 px-8 py-4 rounded-2xl transition-all duration-300"
                          style={{
                            background: 'var(--gradient-primary)',
                            color: 'white',
                            fontSize: 'var(--text-base)',
                            fontWeight: 'var(--font-weight-semibold)',
                            fontFamily: 'var(--font-body)',
                            boxShadow: '0 8px 24px rgba(85, 161, 180, 0.3)',
                            border: 'none',
                            cursor: 'pointer',
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.transform = 'translateY(-2px)';
                            e.currentTarget.style.boxShadow = '0 12px 32px rgba(85, 161, 180, 0.4)';
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.transform = 'translateY(0)';
                            e.currentTarget.style.boxShadow = '0 8px 24px rgba(85, 161, 180, 0.3)';
                          }}
                        >
                          <Calendar className="w-5 h-5" />
                          Réserver une session
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                {/* ========== PAST SESSIONS ========== */}
                <div>
                  <SectionHeader
                    icon={Clock}
                    title="Sessions passées"
                    subtitle="Historique de vos sessions de coaching complétées"
                  />

                  <div className="space-y-4">
                    {pastSessions.map((session) => (
                      <div
                        key={session.id}
                        className="p-6 rounded-3xl relative overflow-hidden transition-all duration-500 hover:-translate-y-1"
                        style={{
                          background: 'rgba(255, 255, 255, 0.7)',
                          backdropFilter: 'blur(20px)',
                          WebkitBackdropFilter: 'blur(20px)',
                          border: '1px solid rgba(255, 255, 255, 0.5)',
                          boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.08), inset 0 1px 0 0 rgba(255, 255, 255, 0.9)',
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.boxShadow = '0 12px 40px 0 rgba(0, 0, 0, 0.1), 0 0 40px 0 rgba(237, 132, 58, 0.12), inset 0 1px 0 0 rgba(255, 255, 255, 0.9)';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.boxShadow = '0 8px 32px 0 rgba(0, 0, 0, 0.08), inset 0 1px 0 0 rgba(255, 255, 255, 0.9)';
                        }}
                      >
                        <div 
                          className="absolute inset-0 opacity-20"
                          style={{
                            background: 'radial-gradient(circle at 50% 0%, rgba(237, 132, 58, 0.15) 0%, transparent 70%)',
                            pointerEvents: 'none',
                          }}
                        />

                        <div className="relative">
                          {/* Header */}
                          <div style={{
                            display: 'flex',
                            flexDirection: 'column',
                            gap: 'var(--space-2)',
                            marginBottom: 'var(--space-4)',
                          }}>
                            <h3 
                              style={{ 
                                fontSize: 'var(--text-lg)',
                                fontWeight: 'var(--font-weight-bold)',
                                color: 'var(--foreground)',
                                fontFamily: 'var(--font-display)',
                                margin: 0,
                              }}
                            >
                              {session.title}
                            </h3>
                            <div className="flex items-center gap-4">
                              <span 
                                className="flex items-center gap-1.5"
                                style={{ 
                                  fontSize: 'var(--text-sm)',
                                  color: 'var(--muted-foreground)',
                                  fontFamily: 'var(--font-body)',
                                }}
                              >
                                <Calendar className="w-4 h-4" />
                                {session.date}
                              </span>
                              <span 
                                className="flex items-center gap-1.5"
                                style={{ 
                                  fontSize: 'var(--text-sm)',
                                  color: 'var(--muted-foreground)',
                                  fontFamily: 'var(--font-body)',
                                }}
                              >
                                <Clock className="w-4 h-4" />
                                {session.duration}
                              </span>
                            </div>
                          </div>

                          {/* Notes */}
                          <p 
                            style={{ 
                              fontSize: 'var(--text-base)',
                              color: 'var(--muted-foreground)',
                              fontFamily: 'var(--font-body)',
                              lineHeight: 'var(--leading-relaxed)',
                              margin: 0,
                              marginBottom: 'var(--space-4)',
                            }}
                          >
                            {session.notes}
                          </p>

                          {/* Actions Buttons - Ordre chronologique */}
                          <div className="flex flex-wrap items-center gap-3">
                            {/* 1. Questionnaire (avant session) - Bleu TLS */}
                            <button
                              onClick={() => onNavigate('questionnaire-response', session.questionnaireId)}
                              className="flex items-center gap-2 px-4 py-2 rounded-xl transition-all duration-200"
                              style={{
                                background: 'var(--primary-50)',
                                color: 'var(--primary)',
                                fontSize: 'var(--text-sm)',
                                fontWeight: 'var(--font-weight-semibold)',
                                fontFamily: 'var(--font-body)',
                                border: 'none',
                                cursor: 'pointer',
                              }}
                              onMouseEnter={(e) => {
                                e.currentTarget.style.background = 'var(--primary)';
                                e.currentTarget.style.color = 'white';
                              }}
                              onMouseLeave={(e) => {
                                e.currentTarget.style.background = 'var(--primary-50)';
                                e.currentTarget.style.color = 'var(--primary)';
                              }}
                            >
                              <FileCheck className="w-4 h-4" />
                              Voir questionnaire
                            </button>

                            {/* 2. Compte-rendu du coach (après session) - Orange TLS */}
                            <a
                              href={session.coachReportPdfUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center gap-2 px-4 py-2 rounded-xl transition-all duration-200"
                              style={{
                                background: 'var(--secondary-50)',
                                color: 'var(--secondary)',
                                fontSize: 'var(--text-sm)',
                                fontWeight: 'var(--font-weight-semibold)',
                                fontFamily: 'var(--font-body)',
                                border: 'none',
                                cursor: 'pointer',
                                textDecoration: 'none',
                              }}
                              onMouseEnter={(e) => {
                                e.currentTarget.style.background = 'var(--secondary)';
                                e.currentTarget.style.color = 'white';
                              }}
                              onMouseLeave={(e) => {
                                e.currentTarget.style.background = 'var(--secondary-50)';
                                e.currentTarget.style.color = 'var(--secondary)';
                              }}
                            >
                              <FileText className="w-4 h-4" />
                              Compte-rendu du coach
                            </a>

                            {/* 3. Note de journal (optionnel) - Jaune TLS */}
                            {session.hasJournalEntry ? (
                              <button
                                onClick={() => onNavigate('journal-detail', session.journalEntryId!)}
                                className="flex items-center gap-2 px-4 py-2 rounded-xl transition-all duration-200"
                                style={{
                                  background: 'var(--accent-50)',
                                  color: 'var(--accent)',
                                  fontSize: 'var(--text-sm)',
                                  fontWeight: 'var(--font-weight-semibold)',
                                  fontFamily: 'var(--font-body)',
                                  border: 'none',
                                  cursor: 'pointer',
                                }}
                                onMouseEnter={(e) => {
                                  e.currentTarget.style.background = 'var(--accent)';
                                  e.currentTarget.style.color = 'white';
                                }}
                                onMouseLeave={(e) => {
                                  e.currentTarget.style.background = 'var(--accent-50)';
                                  e.currentTarget.style.color = 'var(--accent)';
                                }}
                              >
                                <Notebook className="w-4 h-4" />
                                Voir ma note
                              </button>
                            ) : (
                              <button
                                onClick={() => onNavigate('journal-free-entry', undefined, 'coaching')}
                                className="flex items-center gap-2 px-4 py-2 rounded-xl transition-all duration-200"
                                style={{
                                  background: 'var(--accent-50)',
                                  color: 'var(--accent)',
                                  fontSize: 'var(--text-sm)',
                                  fontWeight: 'var(--font-weight-semibold)',
                                  fontFamily: 'var(--font-body)',
                                  border: 'none',
                                  cursor: 'pointer',
                                }}
                                onMouseEnter={(e) => {
                                  e.currentTarget.style.background = 'var(--accent)';
                                  e.currentTarget.style.color = 'white';
                                }}
                                onMouseLeave={(e) => {
                                  e.currentTarget.style.background = 'var(--accent-50)';
                                  e.currentTarget.style.color = 'var(--accent)';
                                }}
                              >
                                <Notebook className="w-4 h-4" />
                                Ajouter une note
                              </button>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>

      {/* Toast Notifications */}
      <ToastContainer toasts={toasts} onRemove={removeToast} />

      {/* Booking Modal */}
      <BookingModalMinimal
        isOpen={isBookingModalOpen}
        onClose={() => setIsBookingModalOpen(false)}
        onConfirm={handleBookingConfirmed}
        coachName={coach.name}
      />

      {/* Cancel Session Modal */}
      <CancelSessionModal
        isOpen={isCancelModalOpen}
        onClose={() => setIsCancelModalOpen(false)}
        onConfirm={handleCancelSession}
        sessionDate={upcomingSession?.date}
        sessionTime={upcomingSession?.time}
      />
    </div>
  );
}
