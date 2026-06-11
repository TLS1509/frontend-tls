import { useState } from 'react';
import { Calendar, ArrowLeft } from 'lucide-react';
import OptimizedSidebar from '../components/ui/optimized-sidebar';
import { PageHeaderWithBadge } from '../components/common/PageHeaderSimple';
import { BookingModalMinimal } from '../components/coaching/BookingModalMinimal';
import { BookingConfirmationModal } from '../components/modals/BookingConfirmationModal';
import { useToast, ToastContainer } from '../components/ui/notification-toast';

interface CoachingBookingFlowPageProps {
  onNavigate: (page: string) => void;
  onLogout?: () => void;
}

export default function CoachingBookingFlowPage({ onNavigate, onLogout }: CoachingBookingFlowPageProps) {
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState<{
    date: Date;
    time: string;
  } | null>(null);

  const { toasts, success, removeToast } = useToast();

  const handleBookingSelect = (date: Date, time: string) => {
    setSelectedBooking({ date, time });
    setShowBookingModal(false);
    setShowConfirmationModal(true);
  };

  const handleConfirmBooking = () => {
    success('Réservation confirmée !', 'Vous recevrez un email de confirmation avec le lien Google Meet');
    setShowConfirmationModal(false);
    setSelectedBooking(null);
  };

  const formatDate = (date: Date) => {
    const days = ['dim.', 'lun.', 'mar.', 'mer.', 'jeu.', 'ven.', 'sam.'];
    const months = ['janv.', 'févr.', 'mars', 'avr.', 'mai', 'juin', 'juil.', 'août', 'sept.', 'oct.', 'nov.', 'déc.'];
    return `${date.getDate()} ${months[date.getMonth()]}. ${date.getFullYear()}`;
  };

  return (
    <div className="min-h-screen relative overflow-hidden" style={{ background: 'linear-gradient(to bottom right, var(--primary-50), white, var(--accent-50))' }}>
      <ToastContainer toasts={toasts} onRemove={removeToast} />
      
      <div className="flex h-screen">
        <OptimizedSidebar 
          currentPage="coaching" 
          onNavigate={onNavigate} 
          onLogout={onLogout}
        />

        <main className="flex-1 overflow-y-auto">
          <div className="max-w-7xl mx-auto p-4 sm:p-6 md:p-8 lg:p-10 pb-12 pt-20 lg:pt-4">
            
            {/* Page Header */}
            <PageHeaderWithBadge
              title="Réservation Coaching"
              description="Système de réservation glassmorphism ultra-moderne avec questionnaire pré-coaching"
              badge={{ label: 'Flow Complet', variant: 'primary' }}
            />

            {/* Hero Section */}
            <div
              style={{
                position: 'relative',
                padding: 'var(--space-12)',
                borderRadius: 'var(--radius-2xl)',
                background: 'linear-gradient(150.384deg, rgba(255, 255, 255, 0.9) 0%, rgba(255, 255, 255, 0.7) 100%)',
                border: '1px solid rgba(85, 161, 180, 0.2)',
                boxShadow: '0 12px 32px rgba(0, 0, 0, 0.08)',
                marginBottom: 'var(--space-8)',
                overflow: 'hidden',
                textAlign: 'center',
              }}
            >
              {/* Background Gradient */}
              <div
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  height: '200px',
                  opacity: 0.2,
                  background: 'radial-gradient(circle at 50% 0%, rgba(85, 161, 180, 0.4) 0%, rgba(43, 81, 90, 0.2) 35%, transparent 70%)',
                  pointerEvents: 'none',
                }}
              />

              {/* Icon */}
              <div
                style={{
                  width: '80px',
                  height: '80px',
                  borderRadius: 'var(--radius-full)',
                  background: 'var(--gradient-primary)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto var(--space-6)',
                  boxShadow: '0 8px 24px rgba(85, 161, 180, 0.3)',
                  position: 'relative',
                }}
              >
                <Calendar className="w-10 h-10" style={{ color: 'white' }} />
              </div>

              {/* Content */}
              <h2
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 'var(--text-4xl)',
                  fontWeight: 'var(--font-weight-bold)',
                  color: 'var(--foreground)',
                  marginBottom: 'var(--space-3)',
                  position: 'relative',
                }}
              >
                Coaching personnalisé IA & Formation
              </h2>
              <p
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: 'var(--text-lg)',
                  color: 'var(--muted-foreground)',
                  marginBottom: 'var(--space-8)',
                  maxWidth: '600px',
                  margin: '0 auto var(--space-8)',
                  position: 'relative',
                }}
              >
                Réservez une session de 60 minutes avec Sophie Martin pour approfondir vos compétences et obtenir un accompagnement personnalisé.
              </p>

              {/* CTA Button */}
              <button
                onClick={() => setShowBookingModal(true)}
                style={{
                  padding: 'var(--space-5) var(--space-8)',
                  borderRadius: 'var(--radius-xl)',
                  fontFamily: 'var(--font-body)',
                  fontSize: 'var(--text-lg)',
                  fontWeight: 'var(--font-weight-bold)',
                  border: 'none',
                  background: 'linear-gradient(170.847deg, rgb(85, 161, 180) 0%, rgb(74, 143, 161) 100%)',
                  color: 'white',
                  cursor: 'pointer',
                  transition: 'all var(--duration-base) ease',
                  boxShadow: '0 8px 24px rgba(85, 161, 180, 0.4)',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 'var(--space-3)',
                  position: 'relative',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-2px)';
                  e.currentTarget.style.boxShadow = '0 12px 32px rgba(85, 161, 180, 0.5)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 8px 24px rgba(85, 161, 180, 0.4)';
                }}
              >
                <Calendar className="w-6 h-6" />
                Réserver maintenant
              </button>
            </div>

            {/* Instructions */}
            <div
              style={{
                padding: 'var(--space-6)',
                borderRadius: 'var(--radius-xl)',
                background: 'rgba(85, 161, 180, 0.05)',
                border: '1px solid rgba(85, 161, 180, 0.2)',
              }}
            >
              <h3
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 'var(--text-xl)',
                  fontWeight: 'var(--font-weight-semibold)',
                  color: 'var(--foreground)',
                  marginBottom: 'var(--space-4)',
                }}
              >
                📋 Comment ça marche ?
              </h3>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: 'var(--space-4)' }}>
                <div>
                  <div
                    style={{
                      fontFamily: 'var(--font-display)',
                      fontSize: 'var(--text-lg)',
                      fontWeight: 'var(--font-weight-bold)',
                      color: 'var(--primary)',
                      marginBottom: 'var(--space-2)',
                    }}
                  >
                    1️⃣ Choisissez votre date
                  </div>
                  <p
                    style={{
                      fontFamily: 'var(--font-body)',
                      fontSize: 'var(--text-sm)',
                      color: 'var(--muted-foreground)',
                    }}
                  >
                    Sélectionnez la date qui vous convient dans le calendrier interactif
                  </p>
                </div>
                <div>
                  <div
                    style={{
                      fontFamily: 'var(--font-display)',
                      fontSize: 'var(--text-lg)',
                      fontWeight: 'var(--font-weight-bold)',
                      color: 'var(--primary)',
                      marginBottom: 'var(--space-2)',
                    }}
                  >
                    2️⃣ Sélectionnez l'horaire
                  </div>
                  <p
                    style={{
                      fontFamily: 'var(--font-body)',
                      fontSize: 'var(--text-sm)',
                      color: 'var(--muted-foreground)',
                    }}
                  >
                    Choisissez parmi les créneaux horaires disponibles
                  </p>
                </div>
                <div>
                  <div
                    style={{
                      fontFamily: 'var(--font-display)',
                      fontSize: 'var(--text-lg)',
                      fontWeight: 'var(--font-weight-bold)',
                      color: 'var(--primary)',
                      marginBottom: 'var(--space-2)',
                    }}
                  >
                    3️⃣ Confirmez
                  </div>
                  <p
                    style={{
                      fontFamily: 'var(--font-body)',
                      fontSize: 'var(--text-sm)',
                      color: 'var(--muted-foreground)',
                    }}
                  >
                    Validez les détails et recevez votre confirmation par email
                  </p>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>

      {/* Booking Selection Modal */}
      <BookingModalMinimal
        isOpen={showBookingModal}
        onClose={() => setShowBookingModal(false)}
        coachName="Sophie Martin"
        sessionTitle="Coaching IA & Formation"
        onConfirm={handleBookingSelect}
      />

      {/* Booking Confirmation Modal */}
      {selectedBooking && (
        <BookingConfirmationModal
          isOpen={showConfirmationModal}
          onClose={() => {
            setShowConfirmationModal(false);
            setSelectedBooking(null);
          }}
          onConfirm={handleConfirmBooking}
          bookingDetails={{
            sessionTitle: 'Session de Coaching IA & Formation',
            date: formatDate(selectedBooking.date),
            time: selectedBooking.time,
            duration: '1 heure',
            coachName: 'Sophie Martin',
            format: 'Visioconférence Google Meet',
          }}
        />
      )}
    </div>
  );
}