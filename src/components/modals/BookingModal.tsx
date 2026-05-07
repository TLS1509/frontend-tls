import React, { useState } from 'react';
import {
  X, Calendar, Clock, ChevronLeft, ChevronRight,
  CheckCircle2, Video, FileText, AlertCircle,
} from 'lucide-react';
import { Button } from '../core/Button';
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

const PILL_BASE = 'px-3 py-1 rounded-pill text-micro font-bold';

const getPillClass = (s: Step, step: Step): string => {
  if (step === s) return `${PILL_BASE} bg-primary-500 text-white`;
  if (step === 'confirmation' && s === 'datetime') return `${PILL_BASE} bg-success-bg text-success-fg`;
  return `${PILL_BASE} bg-ink-200 text-ink-600`;
};

const getDayBtnClass = (hasSlots: boolean, isSelected: boolean): string => {
  const base = 'aspect-square rounded-md border text-caption transition-all';
  if (isSelected) return `${base} border-primary-500 bg-primary-500 text-white font-bold cursor-pointer`;
  if (hasSlots) return `${base} border-transparent bg-primary-50 text-primary-700 font-bold cursor-pointer hover:bg-primary-100`;
  return `${base} border-transparent bg-transparent text-ink-600 opacity-35 cursor-default`;
};

const TIME_SLOT_BASE = 'w-full py-3 rounded-lg font-semibold text-body-sm cursor-pointer transition-all text-center border';
const TIME_SLOT_SELECTED = 'border-2 border-primary-500 bg-primary-50 text-primary-700';
const TIME_SLOT_DEFAULT = 'border-ink-200 bg-white text-ink-900 hover:border-primary-300 hover:bg-primary-50';

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
    <div
      className="fixed inset-0 flex items-center justify-center p-4 z-[1001] backdrop-blur bg-black/45 animate-modal-bd-in"
      onClick={handleClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-[760px] bg-white rounded-2xl border border-ink-200 shadow-modal overflow-hidden animate-modal-in"
      >
        {/* Header */}
        <div className="px-6 py-6 border-b border-ink-200 flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-primary-100 text-primary-700 flex items-center justify-center font-display font-black text-body shrink-0">
            {coachInitials}
          </div>

          <div className="flex-1">
            <h2 className="m-0 text-h4 font-bold text-ink-900">
              Réserver une session
            </h2>
            <p className="m-0 text-caption text-ink-600">
              avec {coachName} · Session de 45 min
            </p>
          </div>

          {/* Step pills */}
          <div className="flex gap-2">
            {(['datetime', 'confirmation'] as Step[]).map((s, i) => (
              <div key={s} className={getPillClass(s, step)}>
                {i + 1}. {s === 'datetime' ? 'Date & Heure' : 'Confirmation'}
              </div>
            ))}
          </div>

          <button
            onClick={handleClose}
            className="w-8 h-8 rounded-full bg-ink-50 border border-ink-200 flex items-center justify-center cursor-pointer text-ink-600 hover:bg-ink-200 transition-all shrink-0"
            aria-label="Fermer"
          >
            <X size={14} />
          </button>
        </div>

        {/* Body */}
        <div className="p-6">
          {step === 'datetime' ? (
            <div className="grid grid-cols-[1fr_200px] gap-6">
              {/* Calendar */}
              <div>
                <div className="flex items-center justify-between mb-4">
                  <button
                    onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1))}
                    className="w-8 h-8 rounded-md bg-ink-50 border border-ink-200 flex items-center justify-center cursor-pointer text-ink-600 hover:bg-ink-200 transition-all"
                  >
                    <ChevronLeft size={16} />
                  </button>
                  <span className="font-bold text-body text-ink-900">
                    {MONTHS_FR[currentMonth.getMonth()]} {currentMonth.getFullYear()}
                  </span>
                  <button
                    onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1))}
                    className="w-8 h-8 rounded-md bg-ink-50 border border-ink-200 flex items-center justify-center cursor-pointer text-ink-600 hover:bg-ink-200 transition-all"
                  >
                    <ChevronRight size={16} />
                  </button>
                </div>

                {/* Day headers */}
                <div className="grid grid-cols-7 gap-0.5 mb-2">
                  {DAYS_FR.map((d) => (
                    <div key={d} className="text-center text-[11px] font-bold text-ink-600 uppercase tracking-wide py-1.5">
                      {d}
                    </div>
                  ))}
                </div>

                {/* Day grid */}
                <div className="grid grid-cols-7 gap-0.5">
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
                        className={getDayBtnClass(hasSlots, isSelected)}
                      >
                        {day}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Time slots */}
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <Clock size={14} className="text-primary-500 shrink-0" />
                  <span className="text-caption font-bold text-ink-900">
                    {selectedDate ? formatDateLabel(selectedDate) : 'Sélectionnez une date'}
                  </span>
                </div>
                {availableTimes.length > 0 ? (
                  <div className="flex flex-col gap-2">
                    {availableTimes.map((t) => {
                      const isSel = selectedTime === t;
                      return (
                        <button
                          key={t}
                          onClick={() => setSelectedTime(t)}
                          className={[TIME_SLOT_BASE, isSel ? TIME_SLOT_SELECTED : TIME_SLOT_DEFAULT].join(' ')}
                        >
                          {t}
                        </button>
                      );
                    })}
                  </div>
                ) : (
                  <div className="p-4 text-center text-ink-600 text-caption rounded-lg bg-ink-50">
                    {selectedDate ? 'Aucun créneau' : 'Choisissez une date bleue'}
                  </div>
                )}
              </div>
            </div>
          ) : (
            /* Confirmation step */
            <div className="flex flex-col gap-4">
              <div className="p-5 rounded-xl bg-primary-50 border border-primary-500/20">
                <div className="flex items-center gap-4">
                  <div className="w-11 h-11 rounded-md bg-primary-500 flex items-center justify-center shrink-0">
                    <Calendar size={20} className="text-white" />
                  </div>
                  <div>
                    <p className="m-0 text-body-sm font-bold text-ink-900">Session confirmée</p>
                    <p className="m-0 text-body font-extrabold text-primary-600">
                      {selectedDate && formatDateLabel(selectedDate)} à {selectedTime}
                    </p>
                  </div>
                  <div className="ml-auto flex items-center gap-2 px-3 py-1 rounded-pill bg-success-bg text-success-fg text-caption font-bold">
                    <CheckCircle2 size={13} /> 45 min
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                {[
                  { icon: <FileText size={16} />, title: 'Questionnaire', body: 'Un questionnaire pré-séance vous sera envoyé 24h avant.' },
                  { icon: <Video size={16} />, title: 'Lien visio', body: 'Le lien de connexion sera envoyé par email.' },
                  { icon: <AlertCircle size={16} />, title: 'Annulation', body: "Annulation possible jusqu'à 24h avant la session." },
                ].map((info) => (
                  <div key={info.title} className="p-4 rounded-lg bg-ink-50 border border-ink-200">
                    <div className="text-primary-500 mb-2">{info.icon}</div>
                    <p className="m-0 mb-1 text-caption font-bold text-ink-900">{info.title}</p>
                    <p className="m-0 text-micro text-ink-600 leading-relaxed">{info.body}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-5 border-t border-ink-200 flex justify-between gap-3 bg-ink-50">
          {step === 'confirmation' ? (
            <Button variant="secondary" onClick={() => setStep('datetime')}>
              ← Modifier
            </Button>
          ) : <div />}

          {step === 'datetime' ? (
            <Button variant="primary" onClick={() => setStep('confirmation')} disabled={!canProceed}>
              Confirmer le créneau →
            </Button>
          ) : (
            <Button variant="primary" onClick={handleConfirm} leadingIcon={<CheckCircle2 size={16} />}>
              Réserver la session
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default BookingModal;
