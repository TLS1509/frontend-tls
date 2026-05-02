import React, { useState } from 'react';
import {
  X, Calendar, Clock, ChevronLeft, ChevronRight,
  CheckCircle2, Video, FileText, AlertCircle,
} from 'lucide-react';

/**
 * BookingModal — Réservation de session coaching
 * 2 étapes : sélection date/heure → confirmation
 * Tokens: TLS design system
 */
import './modals.css';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  onBookingConfirmed: (slot: { date: string; time: string }) => void;
  coachName?: string;
  coachInitials?: string;
}

type Step = 'datetime' | 'confirmation';

const MONTH_SLOTS: Record<string, string[]> = {
  '2026-05-05': ['09:00', '11:00', '14:00', '15:00'],
  '2026-05-06': ['10:00', '14:00', '16:00'],
  '2026-05-07': ['09:00', '10:00', '15:00'],
  '2026-05-08': ['11:00', '14:00'],
  '2026-05-12': ['09:00', '10:00', '11:00', '14:00', '15:00'],
  '2026-05-13': ['10:00', '14:00'],
  '2026-05-14': ['09:00', '14:00', '16:00'],
  '2026-05-15': ['10:00', '11:00', '15:00'],
  '2026-05-19': ['09:00', '14:00'],
  '2026-05-20': ['11:00', '15:00', '16:00'],
  '2026-05-21': ['10:00', '14:00'],
  '2026-05-22': ['09:00', '10:00', '14:00', '15:00'],
  '2026-05-26': ['10:00', '14:00', '16:00'],
  '2026-05-27': ['09:00', '11:00'],
  '2026-05-28': ['14:00', '15:00', '16:00'],
};

const DAYS_FR = ['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim'];
const MONTHS_FR = ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'];

function getDaysInMonth(date: Date): (number | null)[] {
  const year = date.getFullYear();
  const month = date.getMonth();
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  // Adjust so week starts on Monday (0=Mon)
  const startOffset = (firstDay === 0 ? 6 : firstDay - 1);
  const days: (number | null)[] = Array(startOffset).fill(null);
  for (let i = 1; i <= daysInMonth; i++) days.push(i);
  return days;
}

function formatDateKey(day: number, month: Date): string {
  const y = month.getFullYear();
  const m = String(month.getMonth() + 1).padStart(2, '0');
  const d = String(day).padStart(2, '0');
  return `${y}-${m}-${d}`;
}

function formatDateLabel(dateKey: string): string {
  const [y, m, d] = dateKey.split('-');
  return `${d} ${MONTHS_FR[parseInt(m, 10) - 1]} ${y}`;
}

export const BookingModal: React.FC<BookingModalProps> = ({
  isOpen,
  onClose,
  onBookingConfirmed,
  coachName = 'Sophie Martin',
  coachInitials = 'SM',
}) => {
  const [step, setStep] = useState<Step>('datetime');
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [currentMonth, setCurrentMonth] = useState(new Date(2026, 4, 1));

  if (!isOpen) return null;

  const days = getDaysInMonth(currentMonth);
  const availableTimes = selectedDate ? (MONTH_SLOTS[selectedDate] ?? []) : [];
  const canProceed = Boolean(selectedDate && selectedTime);

  const handleDateClick = (day: number) => {
    const key = formatDateKey(day, currentMonth);
    if (!MONTH_SLOTS[key]) return;
    setSelectedDate(key);
    setSelectedTime(null);
  };

  const handleConfirm = () => {
    if (selectedDate && selectedTime) {
      onBookingConfirmed({ date: selectedDate, time: selectedTime });
      onClose();
    }
  };

  const reset = () => {
    setStep('datetime');
    setSelectedDate(null);
    setSelectedTime(null);
  };

  const handleClose = () => { reset(); onClose(); };

  return (
    <>
      <div
        className="modal__backdrop"
        style={{ background: 'rgba(0,0,0,0.45)', animation: 'modalBdIn 0.22s ease both' }}
        onClick={handleClose}
      >
        <div
          onClick={(e) => e.stopPropagation()}
          className="modal--booking modal__content"
          style={{ overflow: 'hidden' }}
        >
          {/* Header */}
          <div className="modal__header">
            <div style={{
              width: 48, height: 48, borderRadius: '50%',
              background: 'var(--tls-primary-100)', color: 'var(--tls-primary-700)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontWeight: 800, fontSize: 'var(--t-body)', flexShrink: 0,
            }}>
              {coachInitials}
            </div>
            <div style={{ flex: 1 }}>
              <h2 style={{ margin: 0, fontSize: 'var(--t-h4)', fontWeight: 700, color: 'var(--text)' }}>
                Réserver une session
              </h2>
              <p style={{ margin: 0, fontSize: 'var(--t-caption)', color: 'var(--text-muted)' }}>
                avec {coachName} · Session de 45 min
              </p>
            </div>

            {/* Step pills */}
            <div style={{ display: 'flex', gap: 'var(--s-2)' }}>
              {(['datetime', 'confirmation'] as Step[]).map((s, i) => (
                <div key={s} style={{
                  padding: '4px 12px',
                  borderRadius: 'var(--r-pill)',
                  background: step === s ? 'var(--tls-primary-500)' : step === 'confirmation' && s === 'datetime' ? 'rgba(74,140,110,0.15)' : 'var(--border)',
                  color: step === s ? '#fff' : step === 'confirmation' && s === 'datetime' ? 'var(--tls-success-fg)' : 'var(--text-muted)',
                  fontSize: 'var(--t-micro)', fontWeight: 700,
                }}>
                  {i + 1}. {s === 'datetime' ? 'Date & Heure' : 'Confirmation'}
                </div>
              ))}
            </div>

            <button
              onClick={handleClose}
              className="modal__close-btn"
              style={{ position: 'relative', flexShrink: 0 }}
              onMouseEnter={(e) => { e.currentTarget.style.background = 'var(--border)'; }}
              onMouseLeave={(e) => { e.currentTarget.style.background = 'var(--surface-muted)'; }}
            >
              <X size={14} />
            </button>
          </div>

          {/* Body */}
          <div className="modal__body">
            {step === 'datetime' ? (
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 200px', gap: 'var(--s-6)' }}>
                {/* Calendar */}
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 'var(--s-4)' }}>
                    <button
                      onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1))}
                      style={{ ...navBtnStyle }}
                      onMouseEnter={(e) => e.currentTarget.style.background = 'var(--border)'}
                      onMouseLeave={(e) => e.currentTarget.style.background = 'var(--surface-muted)'}
                    >
                      <ChevronLeft size={16} />
                    </button>
                    <span style={{ fontWeight: 700, fontSize: 'var(--t-body)', color: 'var(--text)' }}>
                      {MONTHS_FR[currentMonth.getMonth()]} {currentMonth.getFullYear()}
                    </span>
                    <button
                      onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1))}
                      style={{ ...navBtnStyle }}
                      onMouseEnter={(e) => e.currentTarget.style.background = 'var(--border)'}
                      onMouseLeave={(e) => e.currentTarget.style.background = 'var(--surface-muted)'}
                    >
                      <ChevronRight size={16} />
                    </button>
                  </div>

                  {/* Day headers */}
                  <div className="modal__day-header">
                    {DAYS_FR.map((d) => (
                      <div key={d} className="modal__day-label">
                        {d}
                      </div>
                    ))}
                  </div>

                  {/* Day grid */}
                  <div className="modal__day-grid">
                    {days.map((day, idx) => {
                      if (day === null) return <div key={`e-${idx}`} />;
                      const dateKey = formatDateKey(day, currentMonth);
                      const hasSlots = Boolean(MONTH_SLOTS[dateKey]);
                      const isSelected = selectedDate === dateKey;
                      return (
                        <button
                          key={dateKey}
                          onClick={() => handleDateClick(day)}
                          disabled={!hasSlots}
                          className={`modal__day-btn ${hasSlots ? 'modal__day-btn--available' : ''} ${isSelected ? 'modal__day-btn--selected' : ''}`}
                        >
                          {day}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Time slots */}
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--s-2)', marginBottom: 'var(--s-3)' }}>
                    <Clock size={14} style={{ color: 'var(--tls-primary-500)' }} />
                    <span style={{ fontSize: 'var(--t-caption)', fontWeight: 700, color: 'var(--text)' }}>
                      {selectedDate ? formatDateLabel(selectedDate) : 'Sélectionnez une date'}
                    </span>
                  </div>
                  {availableTimes.length > 0 ? (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--s-2)' }}>
                      {availableTimes.map((t) => {
                        const isSel = selectedTime === t;
                        return (
                          <button
                            key={t}
                            onClick={() => setSelectedTime(t)}
                            style={{
                              padding: 'var(--s-3)',
                              borderRadius: 'var(--r-lg)',
                              border: isSel ? '2px solid var(--tls-primary-500)' : '1.5px solid var(--border)',
                              background: isSel ? 'var(--tls-primary-50)' : 'var(--surface)',
                              color: isSel ? 'var(--tls-primary-700)' : 'var(--text)',
                              fontWeight: 600, fontSize: 'var(--t-body-sm)',
                              cursor: 'pointer', transition: 'all var(--dur-1)',
                              textAlign: 'center',
                            }}
                          >
                            {t}
                          </button>
                        );
                      })}
                    </div>
                  ) : (
                    <div style={{ padding: 'var(--s-4)', textAlign: 'center', color: 'var(--text-muted)', fontSize: 'var(--t-caption)', borderRadius: 'var(--r-lg)', background: 'var(--surface-muted)' }}>
                      {selectedDate ? 'Aucun créneau' : 'Choisissez une date bleue'}
                    </div>
                  )}
                </div>
              </div>
            ) : (
              /* Confirmation step */
              <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--s-4)' }}>
                <div style={{ padding: 'var(--s-5)', borderRadius: 'var(--r-xl)', background: 'var(--tls-primary-50)', border: '1px solid rgba(85,161,180,0.2)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--s-4)' }}>
                    <div style={{ width: 44, height: 44, borderRadius: 'var(--r-md)', background: 'var(--tls-primary-500)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <Calendar size={20} style={{ color: '#fff' }} />
                    </div>
                    <div>
                      <p style={{ margin: 0, fontSize: 'var(--t-body-sm)', fontWeight: 700, color: 'var(--text)' }}>Session confirmée</p>
                      <p style={{ margin: 0, fontSize: 'var(--t-body)', fontWeight: 800, color: 'var(--tls-primary-600)' }}>
                        {selectedDate && formatDateLabel(selectedDate)} à {selectedTime}
                      </p>
                    </div>
                    <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 'var(--s-2)', padding: '4px 12px', borderRadius: 'var(--r-pill)', background: 'rgba(74,140,110,0.12)', color: 'var(--tls-success-fg)', fontSize: 'var(--t-caption)', fontWeight: 700 }}>
                      <CheckCircle2 size={13} /> 45 min
                    </div>
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 'var(--s-3)' }}>
                  {[
                    { icon: <FileText size={16} />, title: 'Questionnaire', body: 'Un questionnaire pré-séance vous sera envoyé 24h avant.' },
                    { icon: <Video size={16} />, title: 'Lien visio', body: 'Le lien de connexion sera envoyé par email.' },
                    { icon: <AlertCircle size={16} />, title: 'Annulation', body: 'Annulation possible jusqu\'à 24h avant la session.' },
                  ].map((info) => (
                    <div key={info.title} style={{ padding: 'var(--s-4)', borderRadius: 'var(--r-lg)', background: 'var(--surface-muted)', border: '1px solid var(--border)' }}>
                      <div style={{ color: 'var(--tls-primary-500)', marginBottom: 'var(--s-2)' }}>{info.icon}</div>
                      <p style={{ margin: '0 0 var(--s-1)', fontSize: 'var(--t-caption)', fontWeight: 700, color: 'var(--text)' }}>{info.title}</p>
                      <p style={{ margin: 0, fontSize: '11px', color: 'var(--text-muted)', lineHeight: 1.5 }}>{info.body}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="modal__footer">
            {step === 'confirmation' ? (
              <button
                onClick={() => setStep('datetime')}
                style={{ ...ghostBtnStyle }}
              >
                ← Modifier
              </button>
            ) : <div />}

            {step === 'datetime' ? (
              <button
                onClick={() => setStep('confirmation')}
                disabled={!canProceed}
                style={{ ...primaryBtnStyle(!canProceed) }}
              >
                Confirmer le créneau →
              </button>
            ) : (
              <button
                onClick={handleConfirm}
                style={{ ...primaryBtnStyle(false) }}
              >
                <CheckCircle2 size={16} /> Réserver la session
              </button>
            )}
          </div>
        </div>
      </div>

      <style>{`
        @keyframes modalBdIn { from { opacity: 0 } to { opacity: 1 } }
        @keyframes modalIn {
          from { opacity: 0; transform: translateY(16px) scale(0.97); }
          to   { opacity: 1; transform: translateY(0) scale(1); }
        }
      `}</style>
    </>
  );
};

// Style helpers
const navBtnStyle: React.CSSProperties = {
  width: 32, height: 32, borderRadius: 'var(--r-md)',
  background: 'var(--surface-muted)', border: '1px solid var(--border)',
  display: 'flex', alignItems: 'center', justifyContent: 'center',
  cursor: 'pointer', color: 'var(--text-muted)', transition: 'background var(--dur-1)',
};

const ghostBtnStyle: React.CSSProperties = {
  padding: 'var(--s-3) var(--s-5)',
  borderRadius: 'var(--r-lg)',
  background: 'transparent',
  border: '1.5px solid var(--border)',
  color: 'var(--text-muted)',
  fontWeight: 600, fontSize: 'var(--t-body-sm)',
  cursor: 'pointer', transition: 'all var(--dur-1)',
};

const primaryBtnStyle = (disabled: boolean): React.CSSProperties => ({
  display: 'inline-flex', alignItems: 'center', gap: 'var(--s-2)',
  padding: 'var(--s-3) var(--s-6)',
  borderRadius: 'var(--r-lg)',
  background: disabled ? 'var(--border)' : 'var(--tls-primary-500)',
  border: 'none',
  color: disabled ? 'var(--text-muted)' : '#fff',
  fontWeight: 700, fontSize: 'var(--t-body-sm)',
  cursor: disabled ? 'not-allowed' : 'pointer',
  opacity: disabled ? 0.6 : 1,
  transition: 'all var(--dur-2)',
  boxShadow: disabled ? 'none' : '0 4px 14px rgba(85,161,180,0.35)',
});

export default BookingModal;
