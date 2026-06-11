import { X, Calendar, Clock, User, Video, Mail, Download, CheckCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface BookingDetails {
  sessionTitle: string;
  date: string;
  time: string;
  duration: string;
  coachName: string;
  format: string;
}

interface BookingConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  bookingDetails: BookingDetails;
}

export function BookingConfirmationModal({
  isOpen,
  onClose,
  onConfirm,
  bookingDetails,
}: BookingConfirmationModalProps) {
  
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 'var(--z-modal)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: 'var(--space-4)',
            background: 'rgba(0, 0, 0, 0.6)',
            backdropFilter: 'blur(8px)',
            WebkitBackdropFilter: 'blur(8px)',
          }}
          onClick={onClose}
        >
          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: 'spring', duration: 0.4 }}
            onClick={(e) => e.stopPropagation()}
            style={{
              position: 'relative',
              width: '100%',
              maxWidth: '672px',
              background: 'rgba(255, 255, 255, 0.98)',
              backdropFilter: 'blur(30px)',
              WebkitBackdropFilter: 'blur(30px)',
              borderRadius: 'var(--radius-2xl)',
              padding: 'var(--space-10)',
              boxShadow: '0 24px 64px rgba(0, 0, 0, 0.2)',
              border: '0.5px solid rgba(255, 255, 255, 0.5)',
            }}
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              style={{
                position: 'absolute',
                top: 'var(--space-6)',
                right: 'var(--space-6)',
                background: 'rgba(0, 0, 0, 0.05)',
                border: 'none',
                borderRadius: 'var(--radius-lg)',
                width: '36px',
                height: '36px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                transition: 'all var(--duration-base) ease',
                color: 'var(--muted-foreground)',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'rgba(0, 0, 0, 0.1)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'rgba(0, 0, 0, 0.05)';
              }}
            >
              <X className="w-5 h-5" />
            </button>

            {/* Header */}
            <div style={{ marginBottom: 'var(--space-8)' }}>
              <h2
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 'var(--text-4xl)',
                  fontWeight: 'var(--font-weight-bold)',
                  color: 'var(--foreground)',
                  textAlign: 'center',
                  marginBottom: 'var(--space-3)',
                  letterSpacing: '-0.025em',
                }}
              >
                Confirmer votre réservation
              </h2>
              <p
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: 'var(--text-lg)',
                  color: 'var(--muted-foreground)',
                  textAlign: 'center',
                }}
              >
                Vérifiez les détails de votre session avant de confirmer
              </p>
            </div>

            {/* Info Box */}
            <div
              style={{
                padding: 'var(--space-5)',
                borderRadius: 'var(--radius-2xl)',
                background: 'linear-gradient(168.606deg, rgba(85, 161, 180, 0.08) 0%, rgba(85, 161, 180, 0.03) 100%)',
                border: '0.5px solid rgba(85, 161, 180, 0.15)',
                marginBottom: 'var(--space-8)',
                display: 'flex',
                gap: 'var(--space-3)',
              }}
            >
              <div
                style={{
                  flexShrink: 0,
                  width: '40px',
                  height: '40px',
                  borderRadius: 'var(--radius-lg)',
                  background: '#E8F4F7',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Mail className="w-5 h-5" style={{ color: 'var(--primary)' }} />
              </div>
              <p
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: 'var(--text-base)',
                  color: 'var(--foreground)',
                  lineHeight: 'var(--leading-relaxed)',
                }}
              >
                Après confirmation, vous recevrez un email avec le lien de visioconférence Google Meet et un questionnaire de préparation pour optimiser votre session.
              </p>
            </div>

            {/* Session Details Card */}
            <div
              style={{
                position: 'relative',
                padding: 'var(--space-8)',
                borderRadius: 'var(--radius-2xl)',
                background: 'linear-gradient(149.369deg, rgba(255, 255, 255, 0.9) 0%, rgba(255, 255, 255, 0.7) 100%)',
                border: '1.667px solid rgba(85, 161, 180, 0.2)',
                boxShadow: '0 12px 32px rgba(0, 0, 0, 0.08)',
                marginBottom: 'var(--space-8)',
                overflow: 'hidden',
              }}
            >
              {/* Gradient Overlay */}
              <div
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  height: '128px',
                  opacity: 0.2,
                  background: 'radial-gradient(ellipse at 0% 0%, rgba(85, 161, 180, 0.4) 0%, rgba(43, 81, 90, 0.2) 35%, transparent 70%)',
                  pointerEvents: 'none',
                }}
              />

              {/* Session Title + Download Button */}
              <div style={{ 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'space-between',
                marginBottom: 'var(--space-8)',
                position: 'relative',
              }}>
                <h3
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: 'var(--text-2xl)',
                    fontWeight: 'var(--font-weight-bold)',
                    color: 'var(--foreground)',
                  }}
                >
                  {bookingDetails.sessionTitle}
                </h3>
                <button
                  style={{
                    background: '#E8F4F7',
                    border: 'none',
                    borderRadius: 'var(--radius-lg)',
                    width: '44px',
                    height: '44px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    flexShrink: 0,
                  }}
                >
                  <Download className="w-5 h-5" style={{ color: 'var(--primary)' }} />
                </button>
              </div>

              {/* Details Grid */}
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(2, 1fr)',
                  gap: 'var(--space-4)',
                  marginBottom: 'var(--space-6)',
                  position: 'relative',
                }}
              >
                {/* Date */}
                <div style={{ display: 'flex', gap: 'var(--space-3)', alignItems: 'flex-start' }}>
                  <div
                    style={{
                      flexShrink: 0,
                      width: '48px',
                      height: '48px',
                      borderRadius: 'var(--radius-lg)',
                      background: '#E8F4F7',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <Calendar className="w-6 h-6" style={{ color: 'var(--primary)' }} />
                  </div>
                  <div>
                    <div
                      style={{
                        fontFamily: 'var(--font-body)',
                        fontSize: 'var(--text-xs)',
                        fontWeight: 'var(--font-weight-semibold)',
                        color: 'var(--muted-foreground)',
                        textTransform: 'uppercase',
                        letterSpacing: 'var(--tracking-wider)',
                        marginBottom: 'var(--space-1)',
                      }}
                    >
                      Date
                    </div>
                    <div
                      style={{
                        fontFamily: 'var(--font-body)',
                        fontSize: 'var(--text-lg)',
                        fontWeight: 'var(--font-weight-semibold)',
                        color: 'var(--foreground)',
                      }}
                    >
                      {bookingDetails.date}
                    </div>
                  </div>
                </div>

                {/* Time */}
                <div style={{ display: 'flex', gap: 'var(--space-3)', alignItems: 'flex-start' }}>
                  <div
                    style={{
                      flexShrink: 0,
                      width: '48px',
                      height: '48px',
                      borderRadius: 'var(--radius-lg)',
                      background: '#FFF9EE',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <Clock className="w-6 h-6" style={{ color: 'var(--accent)' }} />
                  </div>
                  <div>
                    <div
                      style={{
                        fontFamily: 'var(--font-body)',
                        fontSize: 'var(--text-xs)',
                        fontWeight: 'var(--font-weight-semibold)',
                        color: 'var(--muted-foreground)',
                        textTransform: 'uppercase',
                        letterSpacing: 'var(--tracking-wider)',
                        marginBottom: 'var(--space-1)',
                      }}
                    >
                      Heure
                    </div>
                    <div
                      style={{
                        fontFamily: 'var(--font-body)',
                        fontSize: 'var(--text-lg)',
                        fontWeight: 'var(--font-weight-semibold)',
                        color: 'var(--foreground)',
                      }}
                    >
                      {bookingDetails.time}
                    </div>
                  </div>
                </div>

                {/* Duration */}
                <div style={{ display: 'flex', gap: 'var(--space-3)', alignItems: 'flex-start' }}>
                  <div
                    style={{
                      flexShrink: 0,
                      width: '48px',
                      height: '48px',
                      borderRadius: 'var(--radius-lg)',
                      background: '#FFF4E6',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <Clock className="w-6 h-6" style={{ color: 'var(--secondary)' }} />
                  </div>
                  <div>
                    <div
                      style={{
                        fontFamily: 'var(--font-body)',
                        fontSize: 'var(--text-xs)',
                        fontWeight: 'var(--font-weight-semibold)',
                        color: 'var(--muted-foreground)',
                        textTransform: 'uppercase',
                        letterSpacing: 'var(--tracking-wider)',
                        marginBottom: 'var(--space-1)',
                      }}
                    >
                      Durée
                    </div>
                    <div
                      style={{
                        fontFamily: 'var(--font-body)',
                        fontSize: 'var(--text-lg)',
                        fontWeight: 'var(--font-weight-semibold)',
                        color: 'var(--foreground)',
                      }}
                    >
                      {bookingDetails.duration}
                    </div>
                  </div>
                </div>

                {/* Coach */}
                <div style={{ display: 'flex', gap: 'var(--space-3)', alignItems: 'flex-start' }}>
                  <div
                    style={{
                      flexShrink: 0,
                      width: '48px',
                      height: '48px',
                      borderRadius: 'var(--radius-lg)',
                      background: '#E8F4F7',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <User className="w-6 h-6" style={{ color: 'var(--primary)' }} />
                  </div>
                  <div>
                    <div
                      style={{
                        fontFamily: 'var(--font-body)',
                        fontSize: 'var(--text-xs)',
                        fontWeight: 'var(--font-weight-semibold)',
                        color: 'var(--muted-foreground)',
                        textTransform: 'uppercase',
                        letterSpacing: 'var(--tracking-wider)',
                        marginBottom: 'var(--space-1)',
                      }}
                    >
                      Coach
                    </div>
                    <div
                      style={{
                        fontFamily: 'var(--font-body)',
                        fontSize: 'var(--text-lg)',
                        fontWeight: 'var(--font-weight-semibold)',
                        color: 'var(--foreground)',
                      }}
                    >
                      {bookingDetails.coachName}
                    </div>
                  </div>
                </div>
              </div>

              {/* Format Badge */}
              <div
                style={{
                  padding: 'var(--space-4)',
                  borderRadius: 'var(--radius-lg)',
                  background: 'rgba(85, 161, 180, 0.08)',
                  border: '0.5px solid rgba(85, 161, 180, 0.15)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 'var(--space-3)',
                  position: 'relative',
                }}
              >
                <div
                  style={{
                    flexShrink: 0,
                    width: '40px',
                    height: '40px',
                    borderRadius: 'var(--radius-lg)',
                    background: 'var(--primary)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <Video className="w-5 h-5" style={{ color: 'white' }} />
                </div>
                <div>
                  <div
                    style={{
                      fontFamily: 'var(--font-body)',
                      fontSize: 'var(--text-xs)',
                      fontWeight: 'var(--font-weight-semibold)',
                      color: 'var(--muted-foreground)',
                      textTransform: 'uppercase',
                      letterSpacing: 'var(--tracking-wider)',
                      marginBottom: 'var(--space-05)',
                    }}
                  >
                    Format
                  </div>
                  <div
                    style={{
                      fontFamily: 'var(--font-body)',
                      fontSize: 'var(--text-base)',
                      fontWeight: 'var(--font-weight-semibold)',
                      color: 'var(--foreground)',
                    }}
                  >
                    {bookingDetails.format}
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div style={{ display: 'flex', gap: 'var(--space-4)' }}>
              {/* Back Button */}
              <button
                onClick={onClose}
                style={{
                  flex: 1,
                  padding: 'var(--space-5)',
                  borderRadius: 'var(--radius-lg)',
                  fontFamily: 'var(--font-body)',
                  fontSize: 'var(--text-base)',
                  fontWeight: 'var(--font-weight-semibold)',
                  border: '1.667px solid rgba(0, 0, 0, 0.1)',
                  background: 'rgba(255, 255, 255, 0.9)',
                  color: 'var(--muted-foreground)',
                  cursor: 'pointer',
                  transition: 'all var(--duration-base) ease',
                  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'var(--muted)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'rgba(255, 255, 255, 0.9)';
                }}
              >
                Retour
              </button>

              {/* Confirm Button */}
              <button
                onClick={onConfirm}
                style={{
                  flex: 1,
                  padding: 'var(--space-5)',
                  borderRadius: 'var(--radius-lg)',
                  fontFamily: 'var(--font-body)',
                  fontSize: 'var(--text-base)',
                  fontWeight: 'var(--font-weight-bold)',
                  border: 'none',
                  background: 'linear-gradient(168.339deg, rgb(85, 161, 180) 0%, rgb(74, 143, 161) 100%)',
                  color: 'white',
                  cursor: 'pointer',
                  transition: 'all var(--duration-base) ease',
                  boxShadow: '0 8px 24px rgba(85, 161, 180, 0.4)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 'var(--space-2)',
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
                <CheckCircle className="w-5 h-5" />
                Confirmer la réservation
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
