import { AlertCircle, X } from 'lucide-react';

interface CancelSessionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  sessionDate?: string;
  sessionTime?: string;
}

/**
 * Modal d'annulation de session - Glassmorphism Apple-like
 * Respecte le design system TLS
 */
export function CancelSessionModal({
  isOpen,
  onClose,
  onConfirm,
  sessionDate,
  sessionTime,
}: CancelSessionModalProps) {
  if (!isOpen) return null;

  const formatDisplayDate = (dateStr?: string) => {
    if (!dateStr) return '';
    const date = new Date(dateStr);
    const options: Intl.DateTimeFormatOptions = { weekday: 'long', day: 'numeric', month: 'long' };
    const formatted = date.toLocaleDateString('fr-FR', options);
    return formatted.charAt(0).toUpperCase() + formatted.slice(1);
  };

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-50 flex items-center justify-center p-4"
        style={{
          background: 'rgba(0, 0, 0, 0.4)',
          backdropFilter: 'blur(8px)',
          WebkitBackdropFilter: 'blur(8px)',
        }}
        onClick={onClose}
      >
        {/* Modal - Minimaliste */}
        <div
          className="w-full max-w-md rounded-3xl relative"
          style={{
            background: 'rgba(255, 255, 255, 0.98)',
            backdropFilter: 'blur(40px)',
            WebkitBackdropFilter: 'blur(40px)',
            border: '1px solid rgba(0, 0, 0, 0.08)',
            boxShadow: '0 24px 64px rgba(0, 0, 0, 0.12)',
          }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 transition-all duration-200"
            style={{
              color: 'var(--muted-foreground)',
              border: 'none',
              background: 'transparent',
              cursor: 'pointer',
              borderRadius: 'var(--radius-lg)',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'rgba(0, 0, 0, 0.05)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'transparent';
            }}
          >
            <X className="w-5 h-5" />
          </button>

          <div 
            className="relative text-center p-8"
          >
            {/* Icon minimaliste */}
            <div className="flex justify-center mb-6">
              <div
                className="w-16 h-16 rounded-2xl flex items-center justify-center"
                style={{
                  background: 'rgba(239, 68, 68, 0.08)',
                  border: '1px solid rgba(239, 68, 68, 0.15)',
                }}
              >
                <AlertCircle className="w-8 h-8" style={{ color: 'var(--destructive)' }} />
              </div>
            </div>

            {/* Title */}
            <h2
              style={{
                fontSize: 'var(--text-xl)',
                fontWeight: 'var(--font-weight-bold)',
                color: 'var(--foreground)',
                fontFamily: 'var(--font-display)',
                marginBottom: '4px',
              }}
            >
              Annuler cette session ?
            </h2>

            {/* Description */}
            <p
              style={{
                fontSize: 'var(--text-sm)',
                color: 'var(--muted-foreground)',
                fontFamily: 'var(--font-body)',
                lineHeight: 'var(--leading-relaxed)',
                marginBottom: '12px',
              }}
            >
              Êtes-vous sûr de vouloir annuler cette session de coaching ?
            </p>

            {/* Session Details - Minimaliste */}
            {sessionDate && sessionTime && (
              <div
                className="mb-6 p-4 rounded-xl text-left"
                style={{
                  background: 'rgba(0, 0, 0, 0.02)',
                  border: '1px solid rgba(0, 0, 0, 0.06)',
                }}
              >
                <p
                  style={{
                    fontSize: 'var(--text-sm)',
                    color: 'var(--foreground)',
                    fontFamily: 'var(--font-body)',
                    fontWeight: 'var(--font-weight-semibold)',
                    marginBottom: '0',
                  }}
                >
                  {formatDisplayDate(sessionDate)} à {sessionTime}
                </p>
              </div>
            )}

            {/* Warning - Minimaliste */}
            <div
              className="p-4 mb-8 rounded-xl text-left"
              style={{
                background: 'rgba(245, 158, 11, 0.06)',
                border: '1px solid rgba(245, 158, 11, 0.15)',
              }}
            >
              <p
                style={{
                  fontSize: 'var(--text-xs)',
                  color: 'var(--muted-foreground)',
                  fontFamily: 'var(--font-body)',
                  lineHeight: 'var(--leading-relaxed)',
                  marginBottom: '0',
                }}
              >
                Votre coach sera notifié de cette annulation. Vous pourrez réserver un nouveau créneau à tout moment.
              </p>
            </div>

            {/* Actions - Minimaliste */}
            <div className="flex flex-col-reverse sm:flex-row gap-3">
              <button
                onClick={onClose}
                className="flex-1 px-6 py-3 transition-all duration-200"
                style={{
                  background: 'white',
                  color: 'var(--foreground)',
                  fontSize: 'var(--text-sm)',
                  fontWeight: 'var(--font-weight-medium)',
                  fontFamily: 'var(--font-body)',
                  border: '1px solid rgba(0, 0, 0, 0.1)',
                  cursor: 'pointer',
                  borderRadius: 'var(--radius-lg)',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'rgba(0, 0, 0, 0.02)';
                  e.currentTarget.style.borderColor = 'rgba(0, 0, 0, 0.15)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'white';
                  e.currentTarget.style.borderColor = 'rgba(0, 0, 0, 0.1)';
                }}
              >
                Conserver
              </button>

              <button
                onClick={() => {
                  onConfirm();
                  onClose();
                }}
                className="flex-1 px-6 py-3 transition-all duration-200"
                style={{
                  background: 'var(--destructive)',
                  color: 'white',
                  fontSize: 'var(--text-sm)',
                  fontWeight: 'var(--font-weight-semibold)',
                  fontFamily: 'var(--font-body)',
                  border: 'none',
                  cursor: 'pointer',
                  borderRadius: 'var(--radius-lg)',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.opacity = '0.9';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.opacity = '1';
                }}
              >
                Annuler la session
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
