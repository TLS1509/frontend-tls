/**
 * BookingModal — Réservation d'une session de coaching.
 *
 * Flow adaptatif selon `userPlan` ET `creditsRemaining` :
 *  - **Crédits dispo (>0)** : Date & Heure → Confirmation
 *    (1 crédit déduit · pas de paiement)
 *  - **Free + 0 crédits** : Date & Heure → **Paiement** → Confirmation
 *  - **Pro + 0 crédits** : Date & Heure → **Paiement** → Confirmation
 *    (avec banner upsell "Forfait épuisé")
 *  - **Enterprise** : Date & Heure → Confirmation
 *    (toujours sponsorisé par l'entreprise — pas de paiement individuel)
 *
 * UI compacte fit dans un écran (max-height 92vh, layout 2-col, padding réduit).
 */

import React, { useState } from 'react';
import {
  X, Calendar, Clock, ChevronLeft, ChevronRight,
  CheckCircle2, Video, FileText, AlertCircle,
  CreditCard, Lock, Sparkles, Building2, Wallet,
} from 'lucide-react';
import { Button } from '../core/Button';
import { useDialog } from '../../hooks/useDialog';

export type UserPlan = 'free' | 'pro' | 'enterprise';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  onBookingConfirmed: (slot: { date: string; time: string }) => void;
  coachName?: string;
  coachInitials?: string;
  /** Plan utilisateur — détermine le flow paiement/crédits. Default 'free'. */
  userPlan?: UserPlan;
  /** Sessions restantes (crédits) — si > 0 : pas de paiement. Pour enterprise = quota entreprise. */
  creditsRemaining?: number;
  /** Total alloué dans le forfait/quota — pour affichage "3 / 5". */
  creditsTotal?: number;
  /** Nom de l'entreprise sponsor (affiché en mode enterprise). */
  companyName?: string;
  /** Prix unitaire d'une session quand paiement requis (en EUR). Default 75. */
  sessionPrice?: number;
}

type Step = 'datetime' | 'payment' | 'confirmation';

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

// Étape : légende 13/600 (11 px graisse 700 était le registre du `Badge`,
// capitales en moins).
const PILL_BASE = 'px-2.5 py-1 rounded-pill text-caption font-semibold whitespace-nowrap';

function getPillClass(stepKey: Step, currentStep: Step, allSteps: Step[]): string {
  if (stepKey === currentStep) return `${PILL_BASE} bg-primary-700 text-white`;
  const idx = allSteps.indexOf(stepKey);
  const curIdx = allSteps.indexOf(currentStep);
  if (idx < curIdx) return `${PILL_BASE} bg-success-bg text-success-fg`;
  return `${PILL_BASE} bg-ink-200 text-ink-600`;
}

const getDayBtnClass = (hasSlots: boolean, isSelected: boolean): string => {
  // Un chiffre sous 16 px : Nunito 600, tabulaire (doctrine § 1).
  const base = 'aspect-square rounded-md border text-caption tabular-nums transition-all';
  if (isSelected) return `${base} border-primary-700 bg-primary-700 text-white font-semibold cursor-pointer`;
  if (hasSlots) return `${base} border-transparent bg-primary-50 text-primary-800 font-semibold cursor-pointer hover:bg-primary-100`;
  return `${base} border-transparent bg-transparent text-ink-600 opacity-35 cursor-default`;
};

const TIME_SLOT_BASE = 'w-full py-2 rounded-lg font-semibold text-body tabular-nums cursor-pointer transition-all text-center border';
const TIME_SLOT_SELECTED = 'border-2 border-primary-500 bg-primary-50 text-primary-800';
const TIME_SLOT_DEFAULT = 'border-ink-200 bg-white text-ink-900 hover:border-primary-300 hover:bg-primary-50';

/* Bandeaux de source (crédits, entreprise, paiement) : l'anatomie d'une
   `Alert` — titre 16/600 · 4 · texte en légende 13, l'icône centrée sur la
   première ligne (`h-lh` sur une ligne de 26 px). Le titre était en légende
   grasse, le texte en 11 px (le registre des étiquettes). */
const BANNER_ICON = 'shrink-0 inline-flex items-center h-lh text-body';
const BANNER_TITLE = 'font-body text-body font-semibold text-ink-900';
const BANNER_TEXT = 'font-body text-caption text-ink-600';

const STEP_LABELS: Record<Step, string> = {
  datetime:     'Date & Heure',
  payment:      'Paiement',
  confirmation: 'Confirmation',
};

export const BookingModal: React.FC<BookingModalProps> = ({
  isOpen,
  onClose,
  onBookingConfirmed,
  coachName = 'Sophie Martin',
  coachInitials = 'SM',
  userPlan = 'free',
  creditsRemaining,
  creditsTotal,
  companyName = 'Ton entreprise',
  sessionPrice = 75,
}) => {
  // Comportement de dialogue partagé (APG) : focus entrant, Tab piégé, Échap, focus rendu.
  const dialog = useDialog<HTMLDivElement>(isOpen, onClose);
  /* Defaults raisonnables si creditsRemaining n'est pas passé */
  const defaultCredits: Record<UserPlan, { remaining: number; total: number }> = {
    free:       { remaining: 0, total: 0 },
    pro:        { remaining: 3, total: 5 },
    enterprise: { remaining: 12, total: 20 },
  };
  const credits = {
    remaining: creditsRemaining ?? defaultCredits[userPlan].remaining,
    total:     creditsTotal ?? defaultCredits[userPlan].total,
  };

  /* Si crédits dispo OU enterprise (toujours sponsorisé), pas de step paiement.
     Si free OU pro à 0 crédit → step paiement requis. */
  const hasCredits = credits.remaining > 0;
  const isEnterprise = userPlan === 'enterprise';
  const needsPayment = !hasCredits && !isEnterprise;
  const allSteps: Step[] = needsPayment ? ['datetime', 'payment', 'confirmation'] : ['datetime', 'confirmation'];

  const [step, setStep] = useState<Step>('datetime');
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [currentMonth, setCurrentMonth] = useState(new Date(2026, 4, 1));

  // Payment form state (UI-only)
  const [cardNumber, setCardNumber] = useState('');
  const [cardName, setCardName] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCVC, setCardCVC] = useState('');

  if (!isOpen) return null;

  const days = getDaysInMonth(currentMonth);
  const availableTimes = selectedDate ? (MONTH_SLOTS[selectedDate] ?? []) : [];
  const canProceedDatetime = Boolean(selectedDate && selectedTime);
  const canProceedPayment = cardNumber.replace(/\s/g, '').length >= 13 && cardName.length > 2 && cardExpiry.length >= 5 && cardCVC.length >= 3;

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
    setCardNumber(''); setCardName(''); setCardExpiry(''); setCardCVC('');
  };

  const handleClose = () => { reset(); onClose(); };

  const goNext = () => {
    if (step === 'datetime') setStep(needsPayment ? 'payment' : 'confirmation');
    else if (step === 'payment') setStep('confirmation');
  };
  const goBack = () => {
    if (step === 'confirmation') setStep(needsPayment ? 'payment' : 'datetime');
    else if (step === 'payment') setStep('datetime');
  };

  const formatCardNumber = (raw: string) =>
    raw.replace(/\D/g, '').slice(0, 19).replace(/(.{4})/g, '$1 ').trim();
  const formatExpiry = (raw: string) => {
    const digits = raw.replace(/\D/g, '').slice(0, 4);
    return digits.length > 2 ? `${digits.slice(0, 2)}/${digits.slice(2)}` : digits;
  };

  /* Banner contextuel haut du step datetime — indique source du paiement/crédits */
  const renderSourceBanner = () => {
    if (isEnterprise) {
      return (
        <div className="mb-stack p-stack rounded-xl bg-success-bg/30 border border-success-base/30 flex items-start gap-stack-xs">
          <span className={BANNER_ICON}><Building2 size={16} className="text-success-fg" /></span>
          <div className="flex-1 min-w-0 flex flex-col gap-stack-3xs">
            <p className={BANNER_TITLE}>
              Session sponsorisée par {companyName}
            </p>
            <p className={BANNER_TEXT}>
              {credits.remaining} / {credits.total} sessions utilisées ce trimestre
            </p>
          </div>
        </div>
      );
    }
    if (hasCredits) {
      return (
        <div className="mb-stack p-stack rounded-xl bg-primary-50 border border-primary-100 flex items-start gap-stack-xs">
          <span className={BANNER_ICON}><Wallet size={16} className="text-primary-600" /></span>
          <div className="flex-1 min-w-0 flex flex-col gap-stack-3xs">
            <p className={BANNER_TITLE}>
              Incluse dans ton forfait {userPlan === 'pro' ? 'Pro' : ''}
            </p>
            <p className={BANNER_TEXT}>
              {credits.remaining} / {credits.total} sessions restantes ce mois
            </p>
          </div>
        </div>
      );
    }
    // free OU pro à 0 crédit → upsell banner
    return (
      <div className="mb-stack p-stack rounded-xl bg-accent-50 border border-accent-200 flex items-start gap-stack-xs">
        <span className={BANNER_ICON}><Sparkles size={16} className="text-accent-700" /></span>
        <div className="flex-1 min-w-0 flex flex-col gap-stack-3xs">
          <p className={BANNER_TITLE}>
            {userPlan === 'pro'
              ? `Forfait épuisé (${credits.total}/${credits.total} utilisées)`
              : `Session à l'unité · ${sessionPrice} €`}
          </p>
          <p className={BANNER_TEXT}>
            {userPlan === 'pro'
              ? 'Cette session sera facturée en plus de ton forfait.'
              : <>Passe à <strong>TLS Pro</strong> pour des sessions incluses · <a href="/account/billing" className="text-primary-800 underline font-semibold">Voir forfaits</a></>}
          </p>
        </div>
      </div>
    );
  };

  return (
    <div
      className="fixed inset-0 flex items-center justify-center p-4 z-modal backdrop-blur bg-black/45 animate-modal-bd-in"
      onClick={handleClose}
    >
      <div
        ref={dialog.ref} role="dialog" aria-modal="true" aria-labelledby={dialog.titleId} tabIndex={-1}
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-[820px] max-h-[92vh] flex flex-col bg-white rounded-2xl border border-ink-200 shadow-modal animate-modal-in overflow-hidden"
      >
        {/* Header — compact */}
        <div className="px-stack-md py-stack border-b border-ink-200 flex items-center gap-stack-xs flex-wrap shrink-0">
          {/* Initiales : Nunito 600 à 13 px — le League Spartan ne descend pas
              sous 16 px, et `font-black` (900) est interdit dans l'app. */}
          <div className="w-10 h-10 rounded-pill bg-primary-100 text-primary-800 flex items-center justify-center font-body font-semibold text-caption shrink-0">
            {coachInitials}
          </div>

          {/* Titre de la modale : h2 au pas du bloc (20/26/700) — il était au
              corps du texte (16 px) —, méta en légende 4 px dessous. */}
          <div className="flex-1 min-w-[180px] flex flex-col gap-stack-3xs">
            <h2 id={dialog.titleId} className="font-display text-h3 text-ink-900">
              Réserver une session
            </h2>
            <p className="text-caption text-ink-600">
              {coachName} · 45 min
            </p>
          </div>

          {/* Step pills */}
          <div className="flex gap-stack-2xs flex-wrap">
            {allSteps.map((s, i) => (
              <div key={s} className={getPillClass(s, step, allSteps)}>
                {i + 1}. {STEP_LABELS[s]}
              </div>
            ))}
          </div>

          <Button iconOnly size="sm" emphasis="ghost" tone="neutral" onClick={handleClose} aria-label="Fermer" className="shrink-0">
            <X />
          </Button>
        </div>

        {/* Body — scrollable si vraiment nécessaire mais devrait fit */}
        <div className="flex-1 overflow-y-auto p-stack-md">
          {step === 'datetime' && (
            <>
              {renderSourceBanner()}

              <div className="grid grid-cols-1 md:grid-cols-[1fr_180px] gap-stack">
                {/* Calendar */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    {/* Mois précédent / suivant : des outils, en `ghost`
                        (arbitrage n°19 — `outline` est réservé à Annuler). */}
                    <Button
                      iconOnly
                      size="sm"
                      emphasis="ghost"
                      tone="neutral"
                      onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1))}
                      aria-label="Mois précédent"
                    >
                      <ChevronLeft />
                    </Button>
                    <span className="font-semibold text-body text-ink-900">
                      {MONTHS_FR[currentMonth.getMonth()]} {currentMonth.getFullYear()}
                    </span>
                    <Button
                      iconOnly
                      size="sm"
                      emphasis="ghost"
                      tone="neutral"
                      onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1))}
                      aria-label="Mois suivant"
                    >
                      <ChevronRight />
                    </Button>
                  </div>

                  <div className="grid grid-cols-7 gap-tight mb-1">
                    {DAYS_FR.map((d) => (
                      <div key={d} className="text-center text-caption font-semibold text-ink-600 py-1">
                        {d}
                      </div>
                    ))}
                  </div>

                  <div className="grid grid-cols-7 gap-tight">
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

                {/* Time slots — compact */}
                <div>
                  <div className="flex items-center gap-stack-2xs mb-2">
                    <Clock size={14} className="text-primary-500 shrink-0" />
                    <span className="text-caption font-semibold text-ink-900">
                      {selectedDate ? formatDateLabel(selectedDate) : 'Choisis une date'}
                    </span>
                  </div>
                  {availableTimes.length > 0 ? (
                    <div className="flex flex-col gap-stack-2xs max-h-[260px] overflow-y-auto">
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
                    <div className="p-3 text-center text-ink-600 text-caption rounded-lg bg-ink-50">
                      {selectedDate ? 'Aucun créneau' : 'Date bleue → créneaux'}
                    </div>
                  )}
                </div>
              </div>
            </>
          )}

          {step === 'payment' && (
            <div className="flex flex-col gap-stack">
              {/* Order summary compact */}
              <div className="p-stack rounded-xl bg-primary-50 border border-primary-100 flex items-center justify-between gap-stack-xs">
                <div className="flex flex-col gap-stack-3xs min-w-0">
                  <span className="font-body text-body font-semibold text-ink-900 truncate">
                    Session 1:1 avec {coachName}
                  </span>
                  <span className="font-body text-caption text-ink-600 truncate">
                    {selectedDate && formatDateLabel(selectedDate)} · {selectedTime} · 45 min
                  </span>
                </div>
                <div className="text-right shrink-0 flex flex-col gap-stack-3xs">
                  <span className="font-display text-h3 text-ink-900 tabular-nums">{sessionPrice} €</span>
                  <span className="font-body text-caption text-ink-600">TVA incluse</span>
                </div>
              </div>

              {/* Payment method header */}
              <div className="flex items-center gap-stack-xs">
                <CreditCard size={16} className="text-primary-600" />
                <span className="font-body text-body font-semibold text-ink-900">Paiement par carte</span>
                <span className="ml-auto inline-flex items-center gap-stack-3xs text-caption text-ink-600">
                  <Lock size={14} /> Sécurisé
                </span>
              </div>

              {/* Card form en grid 2-col compact */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-stack-xs">
                <label className="flex flex-col gap-tight sm:col-span-2">
                  <span className="font-body text-caption font-semibold text-ink-700">Numéro de carte</span>
                  <input
                    type="text"
                    inputMode="numeric"
                    placeholder="1234 5678 9012 3456"
                    value={cardNumber}
                    onChange={(e) => setCardNumber(formatCardNumber(e.target.value))}
                    className="px-3 py-2 rounded-lg border border-ink-200 bg-white text-body text-ink-900 font-mono tracking-wider focus:outline-2 focus:outline-primary-500 focus:border-primary-500"
                  />
                </label>

                <label className="flex flex-col gap-tight sm:col-span-2">
                  <span className="font-body text-caption font-semibold text-ink-700">Nom sur la carte</span>
                  <input
                    type="text"
                    placeholder="JEAN DUPONT"
                    value={cardName}
                    onChange={(e) => setCardName(e.target.value.toUpperCase())}
                    className="px-3 py-2 rounded-lg border border-ink-200 bg-white text-body text-ink-900 focus:outline-2 focus:outline-primary-500 focus:border-primary-500"
                  />
                </label>

                <label className="flex flex-col gap-tight">
                  <span className="font-body text-caption font-semibold text-ink-700">Expiration</span>
                  <input
                    type="text"
                    inputMode="numeric"
                    placeholder="MM/AA"
                    value={cardExpiry}
                    onChange={(e) => setCardExpiry(formatExpiry(e.target.value))}
                    className="px-3 py-2 rounded-lg border border-ink-200 bg-white text-body text-ink-900 font-mono focus:outline-2 focus:outline-primary-500 focus:border-primary-500"
                  />
                </label>
                <label className="flex flex-col gap-tight">
                  <span className="font-body text-caption font-semibold text-ink-700">CVC</span>
                  <input
                    type="text"
                    inputMode="numeric"
                    placeholder="123"
                    maxLength={4}
                    value={cardCVC}
                    onChange={(e) => setCardCVC(e.target.value.replace(/\D/g, ''))}
                    className="px-3 py-2 rounded-lg border border-ink-200 bg-white text-body text-ink-900 font-mono focus:outline-2 focus:outline-primary-500 focus:border-primary-500"
                  />
                </label>
              </div>

              <p className="font-body text-caption text-ink-600 max-w-prose">
                En confirmant, tu acceptes nos{' '}
                <a href="/terms" className="text-primary-800 underline">CGV</a> et la{' '}
                <a href="/cancellation" className="text-primary-800 underline">politique d'annulation</a> (gratuite jusqu'à 24h avant).
              </p>
            </div>
          )}

          {step === 'confirmation' && (
            <div className="flex flex-col gap-stack">
              {/* Recap card compact */}
              <div className="p-stack rounded-xl bg-primary-50 border border-primary-500/20">
                <div className="flex items-center gap-stack-xs flex-wrap">
                  <div className="w-10 h-10 rounded-md bg-primary-600 flex items-center justify-center shrink-0">
                    <Calendar size={18} className="text-white" />
                  </div>
                  {/* Libellé en légende, valeur au-dessous en 16/600 : elle
                      était en graisse 800, réservée au site. */}
                  <div className="flex-1 min-w-[180px] flex flex-col gap-stack-3xs">
                    <p className="text-caption text-ink-600">Session</p>
                    <p className="text-body font-semibold text-ink-900 tabular-nums">
                      {selectedDate && formatDateLabel(selectedDate)} · {selectedTime}
                    </p>
                  </div>
                  <div className="flex items-center gap-stack-2xs px-2.5 py-1 rounded-pill bg-success-bg text-success-fg text-caption font-semibold shrink-0">
                    <CheckCircle2 size={14} /> 45 min
                  </div>
                </div>
                {/* Ligne facturation : crédit déduit / sponsorisé / payé */}
                <div className="mt-stack-xs pt-stack-xs border-t border-primary-200 flex items-center justify-between flex-wrap gap-stack-xs">
                  {isEnterprise ? (
                    <span className="inline-flex items-center gap-stack-2xs font-body text-caption text-ink-700">
                      <Building2 size={14} className="text-success-fg" />
                      Sponsorisée par {companyName}
                    </span>
                  ) : hasCredits ? (
                    <span className="inline-flex items-center gap-stack-2xs font-body text-caption text-ink-700">
                      <Wallet size={14} className="text-primary-600" />
                      1 crédit déduit · reste {Math.max(0, credits.remaining - 1)} / {credits.total} ce mois
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-stack-2xs font-body text-caption text-ink-700">
                      <CreditCard size={14} className="text-primary-600" />
                      Carte ****{cardNumber.slice(-4) || '••••'}
                    </span>
                  )}
                  {needsPayment && (
                    <span className="font-body text-body font-semibold text-ink-900 tabular-nums">{sessionPrice} €</span>
                  )}
                </div>
              </div>

              {/* 3 info tiles compact */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-stack-xs">
                {[
                  { icon: <FileText size={14} />, title: 'Questionnaire', body: 'Envoyé 24h avant.' },
                  { icon: <Video size={14} />,    title: 'Lien visio',    body: 'Envoyé par email.' },
                  { icon: <AlertCircle size={14} />, title: 'Annulation', body: "Gratuite jusqu'à 24h avant." },
                ].map((info) => (
                  <div key={info.title} className="p-stack rounded-lg bg-ink-50 border border-ink-200 flex flex-col gap-stack-3xs">
                    <div className="text-primary-500">{info.icon}</div>
                    <p className="text-caption font-semibold text-ink-900">{info.title}</p>
                    <p className="text-caption text-ink-600">{info.body}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer — un parcours pas à pas dans une modale (arbitrage n°19) :
            l'étape suivante est le `solid`, le retour à l'étape précédente
            un `ghost`. */}
        <div className="px-stack-md py-3 border-t border-ink-200 flex justify-between gap-stack-xs bg-ink-50 flex-wrap shrink-0">
          {step !== 'datetime' ? (
            <Button emphasis="ghost" tone="neutral" size="sm" onClick={goBack}>
              ← Retour
            </Button>
          ) : <div />}

          {step === 'datetime' && (
            <Button emphasis="solid" onClick={goNext} disabled={!canProceedDatetime}>
              {needsPayment ? 'Continuer →' : 'Confirmer →'}
            </Button>
          )}
          {step === 'payment' && (
            <Button emphasis="solid" onClick={goNext} disabled={!canProceedPayment} leadingIcon={<Lock size={14} />}>
              Payer {sessionPrice} €
            </Button>
          )}
          {step === 'confirmation' && (
            <Button emphasis="solid" onClick={handleConfirm} leadingIcon={<CheckCircle2 size={16} />}>
              Réserver la session
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default BookingModal;
