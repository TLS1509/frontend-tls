import { useState } from 'react';
import { X, Calendar, Clock, CheckCircle2, ChevronLeft, ChevronRight, Video, User, Mail, AlertCircle, FileText } from 'lucide-react';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  onBookingConfirmed: (slot: { date: string; time: string }) => void;
  coachName: string;
  coachAvatar: string;
}

type Step = 'datetime' | 'confirmation';

// Mock slots data
const generateMonthSlots = () => {
  const slots: { [key: string]: string[] } = {};
  
  slots['2026-01-21'] = ['09:00', '11:00', '14:00', '15:00'];
  slots['2026-01-22'] = ['10:00', '14:00', '16:00'];
  slots['2026-01-23'] = ['09:00', '10:00', '15:00'];
  slots['2026-01-24'] = ['11:00', '14:00'];
  slots['2026-01-27'] = ['09:00', '10:00', '11:00', '14:00', '15:00'];
  slots['2026-01-28'] = ['10:00', '14:00'];
  slots['2026-01-29'] = ['09:00', '14:00', '16:00'];
  slots['2026-01-30'] = ['10:00', '11:00', '15:00'];
  
  return slots;
};

/**
 * Modal de réservation de session de coaching - 2 étapes
 * Étape 1: Sélection Date & Heure
 * Étape 2: Confirmation avec infos importantes
 */
export function BookingModal({
  isOpen,
  onClose,
  onBookingConfirmed,
  coachName,
  coachAvatar,
}: BookingModalProps) {
  const [currentStep, setCurrentStep] = useState<Step>('datetime');
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [currentMonth, setCurrentMonth] = useState(new Date(2026, 0, 1));

  const monthSlots = generateMonthSlots();

  if (!isOpen) return null;

  const steps: { id: Step; label: string }[] = [
    { id: 'datetime', label: 'Date & Heure' },
    { id: 'confirmation', label: 'Confirmation' },
  ];

  const currentStepIndex = steps.findIndex(s => s.id === currentStep);
  const progressPercentage = ((currentStepIndex + 1) / steps.length) * 100;

  // Calendar helpers
  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    const days: (number | null)[] = [];
    
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null);
    }
    
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(i);
    }
    
    return days;
  };

  const formatDateKey = (day: number) => {
    const year = currentMonth.getFullYear();
    const month = String(currentMonth.getMonth() + 1).padStart(2, '0');
    const dayStr = String(day).padStart(2, '0');
    return `${year}-${month}-${dayStr}`;
  };

  const hasSlots = (day: number | null) => {
    if (!day) return false;
    const dateKey = formatDateKey(day);
    return monthSlots[dateKey] && monthSlots[dateKey].length > 0;
  };

  const availableTimes = selectedDate ? (monthSlots[selectedDate] || []) : [];

  const goToNextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1));
  };

  const goToPrevMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1));
  };

  const canProceedFromDateTime = selectedDate && selectedTime;

  const handleNext = () => {
    if (currentStep === 'datetime' && canProceedFromDateTime) {
      setCurrentStep('confirmation');
    }
  };

  const handleBack = () => {
    if (currentStep === 'confirmation') {
      setCurrentStep('datetime');
    }
  };

  const handleConfirm = () => {
    if (selectedDate && selectedTime) {
      onBookingConfirmed({ date: selectedDate, time: selectedTime });
      onClose();
      // Reset
      setCurrentStep('datetime');
      setSelectedDate(null);
      setSelectedTime(null);
    }
  };

  const handleClose = () => {
    onClose();
    // Reset after animation
    setTimeout(() => {
      setCurrentStep('datetime');
      setSelectedDate(null);
      setSelectedTime(null);
    }, 300);
  };

  const formatDisplayDate = (dateStr: string) => {
    const date = new Date(dateStr);
    const options: Intl.DateTimeFormatOptions = { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' };
    const formatted = date.toLocaleDateString('fr-FR', options);
    return formatted.charAt(0).toUpperCase() + formatted.slice(1);
  };

  const days = getDaysInMonth(currentMonth);
  const weekDays = ['Dim', 'Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam'];

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 z-50 flex items-center justify-center p-4"
        style={{
          background: 'rgba(0, 0, 0, 0.5)',
          backdropFilter: 'blur(4px)',
          WebkitBackdropFilter: 'blur(4px)',
        }}
        onClick={handleClose}
      >
        {/* Modal */}
        <div 
          className="w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-2xl relative"
          style={{
            background: 'white',
            boxShadow: '0 20px 50px 0 rgba(0, 0, 0, 0.15)',
          }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div 
            className="px-6 py-5 sticky top-0 z-10"
            style={{
              background: 'white',
              borderBottom: '1px solid var(--border)',
            }}
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                {/* Icon */}
                <div 
                  className="w-11 h-11 rounded-xl flex items-center justify-center"
                  style={{
                    background: 'var(--gradient-primary)',
                  }}
                >
                  <Video className="w-5 h-5" style={{ color: 'white' }} />
                </div>
                
                <div>
                  <h2 
                    style={{
                      fontSize: 'var(--text-xl)',
                      fontWeight: 'var(--font-weight-bold)',
                      color: 'var(--foreground)',
                      fontFamily: 'var(--font-display)',
                      marginBottom: '2px',
                    }}
                  >
                    Réserver une session
                  </h2>
                  <p 
                    style={{
                      fontSize: 'var(--text-sm)',
                      color: 'var(--muted-foreground)',
                      fontFamily: 'var(--font-body)',
                    }}
                  >
                    Avec {coachName}
                  </p>
                </div>
              </div>

              <button
                onClick={handleClose}
                className="p-2 rounded-lg transition-all duration-200"
                style={{
                  color: 'var(--muted-foreground)',
                  border: 'none',
                  background: 'transparent',
                  cursor: 'pointer',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'var(--muted)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'transparent';
                }}
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Progress Bar */}
            <div className="flex items-center gap-2">
              {steps.map((step, index) => (
                <div key={step.id} className="flex-1">
                  <div 
                    className="h-1.5 rounded-full transition-all duration-300"
                    style={{
                      background: index <= currentStepIndex ? 'var(--gradient-primary)' : 'var(--muted)',
                    }}
                  />
                </div>
              ))}
            </div>
            
            {/* Step Labels */}
            <div className="flex items-center justify-between mt-3">
              {steps.map((step, index) => (
                <div 
                  key={step.id}
                  style={{
                    fontSize: 'var(--text-xs)',
                    fontWeight: index === currentStepIndex ? 'var(--font-weight-semibold)' : 'var(--font-weight-normal)',
                    color: index === currentStepIndex ? 'var(--primary)' : 'var(--muted-foreground)',
                    fontFamily: 'var(--font-body)',
                  }}
                >
                  {step.label}
                </div>
              ))}
            </div>
          </div>

          {/* Content */}
          <div className="p-6">
            {currentStep === 'datetime' && (
              <div>
                {/* Calendar */}
                <div className="mb-8">
                  <div className="flex items-center justify-between mb-4">
                    <h3 
                      style={{
                        fontSize: 'var(--text-lg)',
                        fontWeight: 'var(--font-weight-semibold)',
                        color: 'var(--foreground)',
                        fontFamily: 'var(--font-display)',
                      }}
                    >
                      {currentMonth.toLocaleDateString('fr-FR', { month: 'long', year: 'numeric' })}
                    </h3>
                    <div className="flex gap-2">
                      <button
                        onClick={goToPrevMonth}
                        className="p-2 rounded-lg transition-all duration-200"
                        style={{
                          border: '1px solid var(--border)',
                          background: 'white',
                          cursor: 'pointer',
                          color: 'var(--foreground)',
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.background = 'var(--muted)';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.background = 'white';
                        }}
                      >
                        <ChevronLeft className="w-4 h-4" />
                      </button>
                      <button
                        onClick={goToNextMonth}
                        className="p-2 rounded-lg transition-all duration-200"
                        style={{
                          border: '1px solid var(--border)',
                          background: 'white',
                          cursor: 'pointer',
                          color: 'var(--foreground)',
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.background = 'var(--muted)';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.background = 'white';
                        }}
                      >
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  {/* Week days header */}
                  <div className="grid grid-cols-7 gap-2 mb-2">
                    {weekDays.map((day) => (
                      <div
                        key={day}
                        style={{
                          fontSize: 'var(--text-xs)',
                          fontWeight: 'var(--font-weight-semibold)',
                          color: 'var(--muted-foreground)',
                          textAlign: 'center',
                          fontFamily: 'var(--font-body)',
                          padding: 'var(--space-2)',
                        }}
                      >
                        {day}
                      </div>
                    ))}
                  </div>

                  {/* Calendar grid */}
                  <div className="grid grid-cols-7 gap-2">
                    {days.map((day, index) => {
                      if (!day) {
                        return <div key={`empty-${index}`} />;
                      }

                      const dateKey = formatDateKey(day);
                      const isAvailable = hasSlots(day);
                      const isSelected = selectedDate === dateKey;

                      return (
                        <button
                          key={day}
                          disabled={!isAvailable}
                          onClick={() => {
                            if (isAvailable) {
                              setSelectedDate(dateKey);
                              setSelectedTime(null);
                            }
                          }}
                          className="aspect-square rounded-lg transition-all duration-200"
                          style={{
                            border: isSelected ? '2px solid var(--primary)' : '1px solid var(--border)',
                            background: isSelected
                              ? 'var(--primary-50)'
                              : isAvailable
                              ? 'white'
                              : 'var(--muted)',
                            color: isSelected
                              ? 'var(--primary)'
                              : isAvailable
                              ? 'var(--foreground)'
                              : 'var(--muted-foreground)',
                            fontSize: 'var(--text-sm)',
                            fontWeight: isSelected ? 'var(--font-weight-bold)' : 'var(--font-weight-normal)',
                            fontFamily: 'var(--font-body)',
                            cursor: isAvailable ? 'pointer' : 'not-allowed',
                            opacity: isAvailable ? 1 : 0.5,
                          }}
                          onMouseEnter={(e) => {
                            if (isAvailable && !isSelected) {
                              e.currentTarget.style.background = 'var(--primary-50)';
                              e.currentTarget.style.borderColor = 'var(--primary-200)';
                            }
                          }}
                          onMouseLeave={(e) => {
                            if (isAvailable && !isSelected) {
                              e.currentTarget.style.background = 'white';
                              e.currentTarget.style.borderColor = 'var(--border)';
                            }
                          }}
                        >
                          {day}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Time Slots */}
                {selectedDate && (
                  <div>
                    <h3 
                      className="mb-3"
                      style={{
                        fontSize: 'var(--text-lg)',
                        fontWeight: 'var(--font-weight-semibold)',
                        color: 'var(--foreground)',
                        fontFamily: 'var(--font-display)',
                      }}
                    >
                      Horaires disponibles
                    </h3>
                    <p 
                      className="mb-4"
                      style={{
                        fontSize: 'var(--text-sm)',
                        color: 'var(--muted-foreground)',
                        fontFamily: 'var(--font-body)',
                      }}
                    >
                      {formatDisplayDate(selectedDate)}
                    </p>

                    <div className="grid grid-cols-4 gap-3">
                      {availableTimes.map((time) => {
                        const isSelected = selectedTime === time;
                        return (
                          <button
                            key={time}
                            onClick={() => setSelectedTime(time)}
                            className="px-4 py-3 rounded-xl transition-all duration-200 flex items-center justify-center gap-2"
                            style={{
                              border: isSelected ? '2px solid var(--primary)' : '1px solid var(--border)',
                              background: isSelected ? 'var(--primary)' : 'white',
                              color: isSelected ? 'white' : 'var(--foreground)',
                              fontSize: 'var(--text-sm)',
                              fontWeight: 'var(--font-weight-semibold)',
                              fontFamily: 'var(--font-body)',
                              cursor: 'pointer',
                            }}
                            onMouseEnter={(e) => {
                              if (!isSelected) {
                                e.currentTarget.style.background = 'var(--primary-50)';
                                e.currentTarget.style.borderColor = 'var(--primary)';
                              }
                            }}
                            onMouseLeave={(e) => {
                              if (!isSelected) {
                                e.currentTarget.style.background = 'white';
                                e.currentTarget.style.borderColor = 'var(--border)';
                              }
                            }}
                          >
                            <Clock className="w-4 h-4" />
                            {time}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            )}

            {currentStep === 'confirmation' && selectedDate && selectedTime && (
              <div>
                {/* Success Icon */}
                <div className="text-center mb-6">
                  <div 
                    className="w-20 h-20 rounded-full mx-auto mb-4 flex items-center justify-center"
                    style={{
                      background: 'var(--gradient-success)',
                      boxShadow: '0 8px 24px rgba(20, 184, 166, 0.3)',
                    }}
                  >
                    <CheckCircle2 className="w-10 h-10" style={{ color: 'white' }} />
                  </div>
                  <h3 
                    style={{
                      fontSize: 'var(--text-2xl)',
                      fontWeight: 'var(--font-weight-bold)',
                      color: 'var(--foreground)',
                      fontFamily: 'var(--font-display)',
                      marginBottom: 'var(--space-2)',
                    }}
                  >
                    Confirmer votre réservation
                  </h3>
                  <p 
                    style={{
                      fontSize: 'var(--text-base)',
                      color: 'var(--muted-foreground)',
                      fontFamily: 'var(--font-body)',
                    }}
                  >
                    Vous êtes sur le point de réserver votre session de coaching
                  </p>
                </div>

                {/* Booking Details */}
                <div 
                  className="p-6 rounded-2xl mb-6"
                  style={{
                    background: 'var(--primary-50)',
                    border: '1px solid var(--primary-200)',
                  }}
                >
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <div 
                        className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                        style={{
                          background: 'var(--primary)',
                        }}
                      >
                        <User className="w-5 h-5" style={{ color: 'white' }} />
                      </div>
                      <div>
                        <p 
                          style={{
                            fontSize: 'var(--text-xs)',
                            color: 'var(--muted-foreground)',
                            fontFamily: 'var(--font-body)',
                            marginBottom: 'var(--space-1)',
                          }}
                        >
                          Coach
                        </p>
                        <p 
                          style={{
                            fontSize: 'var(--text-base)',
                            fontWeight: 'var(--font-weight-semibold)',
                            color: 'var(--foreground)',
                            fontFamily: 'var(--font-body)',
                          }}
                        >
                          {coachName}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <div 
                        className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                        style={{
                          background: 'var(--primary)',
                        }}
                      >
                        <Calendar className="w-5 h-5" style={{ color: 'white' }} />
                      </div>
                      <div>
                        <p 
                          style={{
                            fontSize: 'var(--text-xs)',
                            color: 'var(--muted-foreground)',
                            fontFamily: 'var(--font-body)',
                            marginBottom: 'var(--space-1)',
                          }}
                        >
                          Date et heure
                        </p>
                        <p 
                          style={{
                            fontSize: 'var(--text-base)',
                            fontWeight: 'var(--font-weight-semibold)',
                            color: 'var(--foreground)',
                            fontFamily: 'var(--font-body)',
                          }}
                        >
                          {formatDisplayDate(selectedDate)} à {selectedTime}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <div 
                        className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                        style={{
                          background: 'var(--primary)',
                        }}
                      >
                        <Clock className="w-5 h-5" style={{ color: 'white' }} />
                      </div>
                      <div>
                        <p 
                          style={{
                            fontSize: 'var(--text-xs)',
                            color: 'var(--muted-foreground)',
                            fontFamily: 'var(--font-body)',
                            marginBottom: 'var(--space-1)',
                          }}
                        >
                          Durée
                        </p>
                        <p 
                          style={{
                            fontSize: 'var(--text-base)',
                            fontWeight: 'var(--font-weight-semibold)',
                            color: 'var(--foreground)',
                            fontFamily: 'var(--font-body)',
                          }}
                        >
                          1 heure
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Important Information */}
                <div className="space-y-4 mb-6">
                  <h4 
                    style={{
                      fontSize: 'var(--text-base)',
                      fontWeight: 'var(--font-weight-semibold)',
                      color: 'var(--foreground)',
                      fontFamily: 'var(--font-display)',
                      marginBottom: 'var(--space-2)',
                    }}
                  >
                    Informations importantes
                  </h4>

                  {/* Questionnaire */}
                  <div 
                    className="p-4 rounded-xl flex items-start gap-3"
                    style={{
                      background: 'var(--secondary-50)',
                      border: '1px solid var(--secondary-200)',
                    }}
                  >
                    <FileText className="w-5 h-5 flex-shrink-0" style={{ color: 'var(--secondary)', marginTop: '2px' }} />
                    <div>
                      <p 
                        style={{
                          fontSize: 'var(--text-sm)',
                          fontWeight: 'var(--font-weight-semibold)',
                          color: 'var(--foreground)',
                          fontFamily: 'var(--font-body)',
                          marginBottom: 'var(--space-1)',
                        }}
                      >
                        Questionnaire pré-coaching
                      </p>
                      <p 
                        style={{
                          fontSize: 'var(--text-sm)',
                          color: 'var(--muted-foreground)',
                          fontFamily: 'var(--font-body)',
                          lineHeight: 'var(--leading-relaxed)',
                        }}
                      >
                        Vous recevrez un questionnaire par email à remplir avant votre session pour optimiser votre accompagnement.
                      </p>
                    </div>
                  </div>

                  {/* Visio Link */}
                  <div 
                    className="p-4 rounded-xl flex items-start gap-3"
                    style={{
                      background: 'var(--info-50)',
                      border: '1px solid var(--info-200)',
                    }}
                  >
                    <Mail className="w-5 h-5 flex-shrink-0" style={{ color: 'var(--info)', marginTop: '2px' }} />
                    <div>
                      <p 
                        style={{
                          fontSize: 'var(--text-sm)',
                          fontWeight: 'var(--font-weight-semibold)',
                          color: 'var(--foreground)',
                          fontFamily: 'var(--font-body)',
                          marginBottom: 'var(--space-1)',
                        }}
                      >
                        Lien de visioconférence
                      </p>
                      <p 
                        style={{
                          fontSize: 'var(--text-sm)',
                          color: 'var(--muted-foreground)',
                          fontFamily: 'var(--font-body)',
                          lineHeight: 'var(--leading-relaxed)',
                        }}
                      >
                        Un email de confirmation avec le lien de la session vous sera envoyé dans les prochaines minutes.
                      </p>
                    </div>
                  </div>

                  {/* Cancellation Policy */}
                  <div 
                    className="p-4 rounded-xl flex items-start gap-3"
                    style={{
                      background: 'var(--warning-50)',
                      border: '1px solid var(--warning-200)',
                    }}
                  >
                    <AlertCircle className="w-5 h-5 flex-shrink-0" style={{ color: 'var(--warning)', marginTop: '2px' }} />
                    <div>
                      <p 
                        style={{
                          fontSize: 'var(--text-sm)',
                          fontWeight: 'var(--font-weight-semibold)',
                          color: 'var(--foreground)',
                          fontFamily: 'var(--font-body)',
                          marginBottom: 'var(--space-1)',
                        }}
                      >
                        Politique d'annulation
                      </p>
                      <p 
                        style={{
                          fontSize: 'var(--text-sm)',
                          color: 'var(--muted-foreground)',
                          fontFamily: 'var(--font-body)',
                          lineHeight: 'var(--leading-relaxed)',
                        }}
                      >
                        Vous pouvez annuler ou reporter votre session jusqu'à 24h avant le rendez-vous depuis votre tableau de bord.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Footer Actions */}
          <div 
            className="px-6 py-4 sticky bottom-0"
            style={{
              background: 'white',
              borderTop: '1px solid var(--border)',
            }}
          >
            <div className="flex items-center justify-between gap-4">
              {currentStep === 'confirmation' && (
                <button
                  onClick={handleBack}
                  className="px-4 py-2.5 rounded-xl transition-all duration-200 flex items-center gap-2"
                  style={{
                    border: '1px solid var(--border)',
                    background: 'white',
                    color: 'var(--foreground)',
                    fontSize: 'var(--text-sm)',
                    fontWeight: 'var(--font-weight-semibold)',
                    fontFamily: 'var(--font-body)',
                    cursor: 'pointer',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = 'var(--muted)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'white';
                  }}
                >
                  <ChevronLeft className="w-4 h-4" />
                  Retour
                </button>
              )}

              <div className="flex-1" />

              {currentStep === 'datetime' && (
                <button
                  onClick={handleNext}
                  disabled={!canProceedFromDateTime}
                  className="px-6 py-2.5 rounded-xl transition-all duration-200 flex items-center gap-2"
                  style={{
                    background: canProceedFromDateTime ? 'var(--gradient-primary)' : 'var(--muted)',
                    color: canProceedFromDateTime ? 'white' : 'var(--muted-foreground)',
                    fontSize: 'var(--text-sm)',
                    fontWeight: 'var(--font-weight-bold)',
                    fontFamily: 'var(--font-body)',
                    cursor: canProceedFromDateTime ? 'pointer' : 'not-allowed',
                    border: 'none',
                    opacity: canProceedFromDateTime ? 1 : 0.6,
                  }}
                  onMouseEnter={(e) => {
                    if (canProceedFromDateTime) {
                      e.currentTarget.style.transform = 'translateY(-1px)';
                      e.currentTarget.style.boxShadow = '0 8px 16px rgba(85, 161, 180, 0.3)';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (canProceedFromDateTime) {
                      e.currentTarget.style.transform = 'translateY(0)';
                      e.currentTarget.style.boxShadow = 'none';
                    }
                  }}
                >
                  Continuer
                  <ChevronRight className="w-4 h-4" />
                </button>
              )}

              {currentStep === 'confirmation' && (
                <button
                  onClick={handleConfirm}
                  className="px-6 py-2.5 rounded-xl transition-all duration-200 flex items-center gap-2"
                  style={{
                    background: 'var(--gradient-success)',
                    color: 'white',
                    fontSize: 'var(--text-sm)',
                    fontWeight: 'var(--font-weight-bold)',
                    fontFamily: 'var(--font-body)',
                    cursor: 'pointer',
                    border: 'none',
                    boxShadow: '0 4px 12px rgba(20, 184, 166, 0.3)',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-1px)';
                    e.currentTarget.style.boxShadow = '0 8px 20px rgba(20, 184, 166, 0.4)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = '0 4px 12px rgba(20, 184, 166, 0.3)';
                  }}
                >
                  <CheckCircle2 className="w-4 h-4" />
                  Confirmer la réservation
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
