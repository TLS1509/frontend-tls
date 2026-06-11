import { useState } from 'react';
import { 
  X, 
  Calendar, 
  Clock, 
  ChevronLeft, 
  ChevronRight,
  Check,
  Video,
  User,
  ArrowRight,
  Sparkles,
} from 'lucide-react';

interface BookingModalMinimalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (slot: { date: string; time: string }) => void;
  coachName: string;
}

export function BookingModalMinimal({ isOpen, onClose, onConfirm, coachName }: BookingModalMinimalProps) {
  const [currentStep, setCurrentStep] = useState<'select' | 'confirm'>('select');
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [isConfirming, setIsConfirming] = useState(false);

  if (!isOpen) return null;

  // Générer les jours du mois
  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    const days: (Date | null)[] = [];
    
    // Ajouter des jours vides pour le début du mois
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null);
    }
    
    // Ajouter les jours du mois
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(new Date(year, month, day));
    }
    
    return days;
  };

  const days = getDaysInMonth(currentMonth);

  // Horaires disponibles (simulé) - Uniquement les créneaux disponibles
  const getAvailableSlots = (date: Date | null): string[] => {
    if (!date) return [];
    
    // Simulation: uniquement les créneaux disponibles
    return ['09:00', '10:00', '14:00', '15:00', '16:00', '17:00'];
  };

  const availableSlots = getAvailableSlots(selectedDate);

  const handlePrevMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1));
  };

  const handleNextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1));
  };

  const handleDateClick = (date: Date) => {
    setSelectedDate(date);
    setSelectedTime(null);
  };

  const handleTimeClick = (time: string) => {
    setSelectedTime(time);
  };

  const handleContinue = () => {
    if (selectedDate && selectedTime) {
      setCurrentStep('confirm');
    }
  };

  const handleConfirm = () => {
    if (selectedDate && selectedTime) {
      setIsConfirming(true);
      
      // Simuler un délai de confirmation
      setTimeout(() => {
        onConfirm({
          date: selectedDate.toISOString(),
          time: selectedTime,
        });
        setIsConfirming(false);
        setCurrentStep('select');
        setSelectedDate(null);
        setSelectedTime(null);
      }, 1500);
    }
  };

  const handleBack = () => {
    setCurrentStep('select');
  };

  const isToday = (date: Date) => {
    const today = new Date();
    return date.toDateString() === today.toDateString();
  };

  const isPast = (date: Date) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return date < today;
  };

  const monthNames = ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'];
  const dayNames = ['Dim', 'Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam'];

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center"
      style={{
        background: 'rgba(0, 0, 0, 0.5)',
        backdropFilter: 'blur(8px)',
        WebkitBackdropFilter: 'blur(8px)',
      }}
      onClick={onClose}
    >
      <div 
        className="relative w-full max-w-5xl mx-4 overflow-y-auto"
        style={{
          background: 'rgba(255, 255, 255, 0.98)',
          backdropFilter: 'blur(40px)',
          WebkitBackdropFilter: 'blur(40px)',
          borderRadius: 'var(--radius-2xl)',
          boxShadow: '0 24px 64px rgba(0, 0, 0, 0.2)',
          maxHeight: '90vh',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 p-2 transition-all duration-200 z-10"
          style={{
            background: 'rgba(0, 0, 0, 0.05)',
            border: 'none',
            cursor: 'pointer',
            borderRadius: 'var(--radius-lg)',
            color: 'var(--muted-foreground)',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = 'var(--destructive)';
            e.currentTarget.style.color = 'white';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'rgba(0, 0, 0, 0.05)';
            e.currentTarget.style.color = 'var(--muted-foreground)';
          }}
        >
          <X className="w-5 h-5" />
        </button>

        {/* ========== STEP 1: DATE & TIME SELECTION ========== */}
        {currentStep === 'select' && (
          <div>
            {/* Header */}
            <div 
              className="p-8 pb-6"
              style={{
                borderBottom: '1px solid rgba(0, 0, 0, 0.06)',
              }}
            >
              <div className="flex items-center gap-3 mb-2">
                <div 
                  className="w-12 h-12 rounded-full flex items-center justify-center"
                  style={{
                    background: 'var(--gradient-primary)',
                  }}
                >
                  <Calendar className="w-6 h-6" style={{ color: 'white' }} />
                </div>
                <div>
                  <h2 
                    style={{ 
                      fontFamily: 'var(--font-display)',
                      fontSize: 'var(--text-2xl)',
                      fontWeight: 'var(--font-weight-bold)',
                      color: 'var(--foreground)',
                      marginBottom: '0',
                    }}
                  >
                    Réserver une session
                  </h2>
                  <p 
                    style={{ 
                      fontSize: 'var(--text-sm)',
                      color: 'var(--muted-foreground)',
                      fontFamily: 'var(--font-body)',
                      marginBottom: '0',
                      marginTop: 'var(--space-1)',
                    }}
                  >
                    avec {coachName}
                  </p>
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="grid grid-cols-1 lg:grid-cols-2 overflow-hidden">
              {/* LEFT: Calendar */}
              <div 
                className="p-8"
                style={{
                  borderRight: '1px solid rgba(0, 0, 0, 0.06)',
                }}
              >
                <div className="mb-6">
                  <div className="flex items-center justify-between mb-6">
                    <h3 
                      style={{ 
                        fontFamily: 'var(--font-display)',
                        fontSize: 'var(--text-lg)',
                        fontWeight: 'var(--font-weight-semibold)',
                        color: 'var(--foreground)',
                        marginBottom: '0',
                      }}
                    >
                      {monthNames[currentMonth.getMonth()]} {currentMonth.getFullYear()}
                    </h3>
                    <div className="flex gap-2">
                      <button
                        onClick={handlePrevMonth}
                        className="p-2 transition-all duration-200"
                        style={{
                          background: 'rgba(0, 0, 0, 0.04)',
                          border: 'none',
                          cursor: 'pointer',
                          borderRadius: 'var(--radius)',
                          color: 'var(--muted-foreground)',
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.background = 'var(--primary-lighter)';
                          e.currentTarget.style.color = 'var(--primary)';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.background = 'rgba(0, 0, 0, 0.04)';
                          e.currentTarget.style.color = 'var(--muted-foreground)';
                        }}
                      >
                        <ChevronLeft className="w-4 h-4" />
                      </button>
                      <button
                        onClick={handleNextMonth}
                        className="p-2 transition-all duration-200"
                        style={{
                          background: 'rgba(0, 0, 0, 0.04)',
                          border: 'none',
                          cursor: 'pointer',
                          borderRadius: 'var(--radius)',
                          color: 'var(--muted-foreground)',
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.background = 'var(--primary-lighter)';
                          e.currentTarget.style.color = 'var(--primary)';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.background = 'rgba(0, 0, 0, 0.04)';
                          e.currentTarget.style.color = 'var(--muted-foreground)';
                        }}
                      >
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  {/* Day Names */}
                  <div className="grid grid-cols-7 gap-2 mb-2">
                    {dayNames.map((day) => (
                      <div 
                        key={day}
                        className="text-center"
                        style={{
                          fontSize: 'var(--text-xs)',
                          fontWeight: 'var(--font-weight-semibold)',
                          color: 'var(--muted-foreground)',
                          fontFamily: 'var(--font-body)',
                          padding: 'var(--space-2)',
                        }}
                      >
                        {day}
                      </div>
                    ))}
                  </div>

                  {/* Calendar Grid */}
                  <div className="grid grid-cols-7 gap-2">
                    {days.map((day, index) => {
                      if (!day) {
                        return <div key={`empty-${index}`} />;
                      }

                      const isSelected = selectedDate?.toDateString() === day.toDateString();
                      const isTodayDate = isToday(day);
                      const isPastDate = isPast(day);

                      return (
                        <button
                          key={index}
                          onClick={() => !isPastDate && handleDateClick(day)}
                          disabled={isPastDate}
                          className="aspect-square flex items-center justify-center transition-all duration-200"
                          style={{
                            background: isSelected 
                              ? 'var(--primary)' 
                              : isTodayDate 
                                ? 'var(--primary-lighter)' 
                                : 'transparent',
                            color: isSelected 
                              ? 'white' 
                              : isPastDate 
                                ? 'var(--muted-foreground)' 
                                : 'var(--foreground)',
                            border: 'none',
                            cursor: isPastDate ? 'not-allowed' : 'pointer',
                            borderRadius: 'var(--radius)',
                            fontSize: 'var(--text-sm)',
                            fontWeight: isSelected ? 'var(--font-weight-semibold)' : 'var(--font-weight-normal)',
                            fontFamily: 'var(--font-body)',
                            opacity: isPastDate ? 0.3 : 1,
                          }}
                          onMouseEnter={(e) => {
                            if (!isPastDate && !isSelected) {
                              e.currentTarget.style.background = 'var(--primary-lighter)';
                              e.currentTarget.style.color = 'var(--primary)';
                            }
                          }}
                          onMouseLeave={(e) => {
                            if (!isPastDate && !isSelected) {
                              e.currentTarget.style.background = isTodayDate ? 'var(--primary-lighter)' : 'transparent';
                              e.currentTarget.style.color = 'var(--foreground)';
                            }
                          }}
                        >
                          {day.getDate()}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* RIGHT: Time Slots */}
              <div className="p-8">
                <h3 
                  className="mb-4"
                  style={{ 
                    fontFamily: 'var(--font-display)',
                    fontSize: 'var(--text-lg)',
                    fontWeight: 'var(--font-weight-semibold)',
                    color: 'var(--foreground)',
                    marginBottom: 'var(--space-4)',
                  }}
                >
                  Horaires disponibles
                </h3>

                {!selectedDate ? (
                  <div 
                    className="flex flex-col items-center justify-center text-center py-12"
                    style={{
                      color: 'var(--muted-foreground)',
                    }}
                  >
                    <Clock className="w-12 h-12 mb-3" style={{ color: 'var(--muted-foreground)', opacity: 0.3 }} />
                    <p 
                      style={{ 
                        fontSize: 'var(--text-sm)',
                        fontFamily: 'var(--font-body)',
                        marginBottom: '0',
                      }}
                    >
                      Sélectionnez une date pour voir les horaires
                    </p>
                  </div>
                ) : (
                  <div 
                    className="space-y-2 overflow-y-auto"
                    style={{
                      maxHeight: '400px',
                    }}
                  >
                    {availableSlots.map((time) => (
                      <button
                        key={time}
                        onClick={() => handleTimeClick(time)}
                        className="w-full p-4 transition-all duration-200 flex items-center justify-between"
                        style={{
                          background: selectedTime === time 
                            ? 'var(--primary)' 
                            : 'rgba(0, 0, 0, 0.03)',
                          border: selectedTime === time 
                            ? '2px solid var(--primary)' 
                            : '1px solid rgba(0, 0, 0, 0.06)',
                          cursor: 'pointer',
                          borderRadius: 'var(--radius-lg)',
                        }}
                        onMouseEnter={(e) => {
                          if (selectedTime !== time) {
                            e.currentTarget.style.background = 'var(--primary-lighter)';
                            e.currentTarget.style.borderColor = 'var(--primary)';
                          }
                        }}
                        onMouseLeave={(e) => {
                          if (selectedTime !== time) {
                            e.currentTarget.style.background = 'rgba(0, 0, 0, 0.03)';
                            e.currentTarget.style.borderColor = 'rgba(0, 0, 0, 0.06)';
                          }
                        }}
                      >
                        <div className="flex items-center gap-3">
                          <Clock 
                            className="w-5 h-5" 
                            style={{ 
                              color: selectedTime === time 
                                ? 'white' 
                                : 'var(--muted-foreground)' 
                            }} 
                          />
                          <span 
                            style={{
                              fontSize: 'var(--text-base)',
                              fontWeight: 'var(--font-weight-medium)',
                              fontFamily: 'var(--font-body)',
                              color: selectedTime === time 
                                ? 'white' 
                                : 'var(--foreground)',
                            }}
                          >
                            {time}
                          </span>
                        </div>
                        {selectedTime === time && (
                          <Check className="w-5 h-5" style={{ color: 'white' }} />
                        )}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Footer - Sticky Bottom */}
            <div 
              className="sticky bottom-0 p-6 flex flex-col sm:flex-row justify-between items-center gap-4"
              style={{
                borderTop: '1px solid rgba(0, 0, 0, 0.08)',
                background: 'rgba(255, 255, 255, 0.95)',
                backdropFilter: 'blur(20px)',
                WebkitBackdropFilter: 'blur(20px)',
              }}
            >
              <div className="flex-1">
                {selectedDate && selectedTime ? (
                  <div>
                    <p 
                      style={{
                        fontSize: 'var(--text-xs)',
                        color: 'var(--muted-foreground)',
                        fontFamily: 'var(--font-body)',
                        marginBottom: '4px',
                        textTransform: 'uppercase',
                        letterSpacing: 'var(--tracking-wider)',
                        fontWeight: 'var(--font-weight-semibold)',
                      }}
                    >
                      Sélection actuelle
                    </p>
                    <p 
                      style={{
                        fontSize: 'var(--text-base)',
                        color: 'var(--foreground)',
                        fontFamily: 'var(--font-display)',
                        fontWeight: 'var(--font-weight-bold)',
                        marginBottom: '0',
                      }}
                    >
                      {selectedDate.toLocaleDateString('fr-FR', { weekday: 'short', day: 'numeric', month: 'short' })} • {selectedTime}
                    </p>
                  </div>
                ) : (
                  <p 
                    style={{
                      fontSize: 'var(--text-sm)',
                      color: 'var(--muted-foreground)',
                      fontFamily: 'var(--font-body)',
                      marginBottom: '0',
                    }}
                  >
                    Sélectionnez une date et une heure
                  </p>
                )}
              </div>
              <button
                onClick={handleContinue}
                disabled={!selectedDate || !selectedTime}
                className="px-8 py-4 transition-all duration-200 flex items-center gap-2 whitespace-nowrap"
                style={{
                  background: selectedDate && selectedTime 
                    ? 'linear-gradient(135deg, var(--primary) 0%, var(--primary-600) 100%)' 
                    : 'rgba(0, 0, 0, 0.08)',
                  color: 'white',
                  border: 'none',
                  cursor: selectedDate && selectedTime ? 'pointer' : 'not-allowed',
                  borderRadius: 'var(--radius-xl)',
                  fontSize: 'var(--text-base)',
                  fontWeight: 'var(--font-weight-bold)',
                  fontFamily: 'var(--font-body)',
                  opacity: selectedDate && selectedTime ? 1 : 0.5,
                  boxShadow: selectedDate && selectedTime 
                    ? '0 8px 20px rgba(85, 161, 180, 0.35)' 
                    : 'none',
                }}
                onMouseEnter={(e) => {
                  if (selectedDate && selectedTime) {
                    e.currentTarget.style.transform = 'translateY(-2px)';
                    e.currentTarget.style.boxShadow = '0 12px 28px rgba(85, 161, 180, 0.45)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (selectedDate && selectedTime) {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = '0 8px 20px rgba(85, 161, 180, 0.35)';
                  }
                }}
              >
                Continuer
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        )}

        {/* ========== STEP 2: CONFIRMATION ========== */}
        {currentStep === 'confirm' && selectedDate && selectedTime && (
          <div>
            {/* Header - Minimaliste */}
            <div 
              className="p-8 pb-6"
              style={{
                borderBottom: '1px solid rgba(0, 0, 0, 0.06)',
              }}
            >
              <h2 
                style={{ 
                  fontFamily: 'var(--font-display)',
                  fontSize: 'var(--text-2xl)',
                  fontWeight: 'var(--font-weight-bold)',
                  color: 'var(--foreground)',
                  marginBottom: '4px',
                }}
              >
                Confirmer votre réservation
              </h2>
              <p 
                style={{ 
                  fontSize: 'var(--text-sm)',
                  color: 'var(--muted-foreground)',
                  fontFamily: 'var(--font-body)',
                  marginBottom: '0',
                }}
              >
                Vérifiez les détails de votre session avant de confirmer
              </p>
            </div>

            {/* Content - TLS Design */}
            <div className="p-8 max-w-2xl mx-auto">
              {/* Encart info avant confirmation */}
              <div 
                className="p-4 rounded-xl mb-6"
                style={{
                  background: 'rgba(85, 161, 180, 0.04)',
                  border: '1px solid rgba(85, 161, 180, 0.1)',
                }}
              >
                <p 
                  style={{
                    fontSize: 'var(--text-base)',
                    color: 'var(--foreground)',
                    fontFamily: 'var(--font-body)',
                    lineHeight: 'var(--leading-relaxed)',
                    marginBottom: '0',
                  }}
                >
                  📧 Après confirmation, vous recevrez un email avec le lien de visioconférence Google Meet et un questionnaire de préparation pour optimiser votre session.
                </p>
              </div>

              {/* Card de confirmation */}
              <div 
                className="rounded-2xl mb-6"
                style={{
                  background: 'linear-gradient(135deg, rgba(85, 161, 180, 0.08) 0%, rgba(85, 161, 180, 0.03) 100%)',
                  border: '1px solid rgba(85, 161, 180, 0.15)',
                }}
              >
                <div style={{ padding: 'var(--card-padding-y) var(--card-padding-x)' }}>
                  <h3 
                    style={{
                      fontSize: 'var(--text-lg)',
                      fontWeight: 'var(--font-weight-bold)',
                      color: 'var(--foreground)',
                      fontFamily: 'var(--font-display)',
                      marginBottom: '4px',
                    }}
                  >
                    Session de Coaching IA
                  </h3>
                  
                  {/* Meta info en ligne avec icônes colorées */}
                  <div className="flex flex-wrap items-center gap-x-4 gap-y-2 mt-3">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-5 h-5" style={{ color: 'var(--primary)' }} />
                      <div>
                        <p 
                          style={{
                            fontSize: 'var(--text-xs)',
                            color: 'var(--muted-foreground)',
                            fontFamily: 'var(--font-body)',
                            marginBottom: '0',
                            lineHeight: '1',
                          }}
                        >
                          Date
                        </p>
                        <p 
                          style={{
                            fontSize: 'var(--text-sm)',
                            fontWeight: 'var(--font-weight-semibold)',
                            color: 'var(--foreground)',
                            fontFamily: 'var(--font-body)',
                            marginBottom: '0',
                            marginTop: '2px',
                            lineHeight: '1',
                          }}
                        >
                          {selectedDate.toLocaleDateString('fr-FR', { 
                            day: 'numeric', 
                            month: 'short',
                            year: 'numeric'
                          })}
                        </p>
                      </div>
                    </div>

                    <div 
                      style={{
                        width: '1px',
                        height: '32px',
                        background: 'rgba(0, 0, 0, 0.1)',
                      }}
                    />

                    <div className="flex items-center gap-2">
                      <Clock className="w-5 h-5" style={{ color: 'var(--accent)' }} />
                      <div>
                        <p 
                          style={{
                            fontSize: 'var(--text-xs)',
                            color: 'var(--muted-foreground)',
                            fontFamily: 'var(--font-body)',
                            marginBottom: '0',
                            lineHeight: '1',
                          }}
                        >
                          Heure
                        </p>
                        <p 
                          style={{
                            fontSize: 'var(--text-sm)',
                            fontWeight: 'var(--font-weight-semibold)',
                            color: 'var(--foreground)',
                            fontFamily: 'var(--font-body)',
                            marginBottom: '0',
                            marginTop: '2px',
                            lineHeight: '1',
                          }}
                        >
                          {selectedTime}
                        </p>
                      </div>
                    </div>

                    <div 
                      style={{
                        width: '1px',
                        height: '32px',
                        background: 'rgba(0, 0, 0, 0.1)',
                      }}
                    />

                    <div className="flex items-center gap-2">
                      <Clock className="w-5 h-5" style={{ color: 'var(--secondary)' }} />
                      <div>
                        <p 
                          style={{
                            fontSize: 'var(--text-xs)',
                            color: 'var(--muted-foreground)',
                            fontFamily: 'var(--font-body)',
                            marginBottom: '0',
                            lineHeight: '1',
                          }}
                        >
                          Durée
                        </p>
                        <p 
                          style={{
                            fontSize: 'var(--text-sm)',
                            fontWeight: 'var(--font-weight-semibold)',
                            color: 'var(--foreground)',
                            fontFamily: 'var(--font-body)',
                            marginBottom: '0',
                            marginTop: '2px',
                            lineHeight: '1',
                          }}
                        >
                          1 heure
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Divider */}
                  <div 
                    style={{
                      height: '1px',
                      background: 'linear-gradient(90deg, transparent 0%, rgba(85, 161, 180, 0.2) 50%, transparent 100%)',
                      margin: 'var(--space-4) 0',
                    }}
                  />

                  {/* Coach & Format */}
                  <div className="flex flex-wrap items-center gap-4">
                    <div className="flex items-center gap-2">
                      <User className="w-4 h-4" style={{ color: 'var(--primary)' }} />
                      <span 
                        style={{
                          fontSize: 'var(--text-sm)',
                          color: 'var(--muted-foreground)',
                          fontFamily: 'var(--font-body)',
                        }}
                      >
                        Coach:
                      </span>
                      <span 
                        style={{
                          fontSize: 'var(--text-sm)',
                          fontWeight: 'var(--font-weight-semibold)',
                          color: 'var(--foreground)',
                          fontFamily: 'var(--font-body)',
                        }}
                      >
                        {coachName}
                      </span>
                    </div>

                    <div 
                      style={{
                        width: '1px',
                        height: '16px',
                        background: 'rgba(0, 0, 0, 0.1)',
                      }}
                    />

                    <div className="flex items-center gap-2">
                      <Video className="w-4 h-4" style={{ color: 'var(--primary)' }} />
                      <span 
                        style={{
                          fontSize: 'var(--text-sm)',
                          color: 'var(--muted-foreground)',
                          fontFamily: 'var(--font-body)',
                        }}
                      >
                        Format:
                      </span>
                      <span 
                        style={{
                          fontSize: 'var(--text-sm)',
                          fontWeight: 'var(--font-weight-semibold)',
                          color: 'var(--foreground)',
                          fontFamily: 'var(--font-body)',
                        }}
                      >
                        Visioconférence
                      </span>
                    </div>
                  </div>
                </div>
              </div>

            </div>

            {/* Footer - Sticky Bottom */}
            <div 
              className="sticky bottom-0 p-6 flex justify-between items-center gap-4"
              style={{
                borderTop: '1px solid rgba(0, 0, 0, 0.08)',
                background: 'rgba(255, 255, 255, 0.95)',
                backdropFilter: 'blur(20px)',
                WebkitBackdropFilter: 'blur(20px)',
              }}
            >
              <button
                onClick={handleBack}
                disabled={isConfirming}
                className="px-6 py-3 transition-all duration-200 flex items-center gap-2"
                style={{
                  background: 'rgba(255, 255, 255, 0.8)',
                  color: 'var(--muted-foreground)',
                  border: '1px solid rgba(0, 0, 0, 0.1)',
                  cursor: isConfirming ? 'not-allowed' : 'pointer',
                  borderRadius: 'var(--radius-xl)',
                  fontSize: 'var(--text-base)',
                  fontWeight: 'var(--font-weight-semibold)',
                  fontFamily: 'var(--font-body)',
                  opacity: isConfirming ? 0.5 : 1,
                }}
                onMouseEnter={(e) => {
                  if (!isConfirming) {
                    e.currentTarget.style.background = 'var(--primary-lighter)';
                    e.currentTarget.style.color = 'var(--primary)';
                    e.currentTarget.style.borderColor = 'var(--primary)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isConfirming) {
                    e.currentTarget.style.background = 'rgba(255, 255, 255, 0.8)';
                    e.currentTarget.style.color = 'var(--muted-foreground)';
                    e.currentTarget.style.borderColor = 'rgba(0, 0, 0, 0.1)';
                  }
                }}
              >
                <ChevronLeft className="w-4 h-4" />
                Retour
              </button>

              <button
                onClick={handleConfirm}
                disabled={isConfirming}
                className="px-8 py-4 transition-all duration-200 flex items-center gap-2"
                style={{
                  background: isConfirming 
                    ? 'linear-gradient(135deg, var(--success) 0%, var(--success-600) 100%)' 
                    : 'linear-gradient(135deg, var(--primary) 0%, var(--primary-600) 100%)',
                  color: 'white',
                  border: 'none',
                  cursor: isConfirming ? 'wait' : 'pointer',
                  borderRadius: 'var(--radius-xl)',
                  fontSize: 'var(--text-base)',
                  fontWeight: 'var(--font-weight-bold)',
                  fontFamily: 'var(--font-body)',
                  boxShadow: isConfirming 
                    ? '0 8px 20px rgba(20, 184, 166, 0.35)' 
                    : '0 8px 20px rgba(85, 161, 180, 0.35)',
                }}
                onMouseEnter={(e) => {
                  if (!isConfirming) {
                    e.currentTarget.style.transform = 'translateY(-2px)';
                    e.currentTarget.style.boxShadow = '0 12px 28px rgba(85, 161, 180, 0.45)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isConfirming) {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = '0 8px 20px rgba(85, 161, 180, 0.35)';
                  }
                }}
              >
                {isConfirming ? (
                  <>
                    <div 
                      className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"
                    />
                    Confirmation en cours...
                  </>
                ) : (
                  <>
                    <Check className="w-5 h-5" />
                    Confirmer la réservation
                  </>
                )}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
