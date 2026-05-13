import React, { useState } from 'react';
import { X, AlertTriangle, CalendarX, RefreshCcw, ChevronDown } from 'lucide-react';
import { Button } from '../core/Button';

/**
 * CancelSessionModal — Annulation ou reprogrammation d'une session de coaching
 * Options : annuler définitivement ou reprogrammer
 */

interface CancelSessionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCancel: (reason: string) => void;
  onReschedule: () => void;
  sessionTitle?: string;
  sessionDate?: string;
}

const REASONS = [
  { value: 'conflict',     label: 'Conflit d\'agenda' },
  { value: 'personal',     label: 'Raison personnelle' },
  { value: 'changed_mind', label: 'J\'ai changé d\'avis' },
  { value: 'technical',    label: 'Problème technique' },
  { value: 'other',        label: 'Autre raison' },
];

export const CancelSessionModal: React.FC<CancelSessionModalProps> = ({
  isOpen,
  onClose,
  onCancel,
  onReschedule,
  sessionTitle = 'Session de coaching IA',
  sessionDate = 'Mardi 30 avril 2026 — 14h00',
}) => {
  const [reason, setReason] = useState('');
  const [step, setStep] = useState<'confirm' | 'done'>('confirm');

  if (!isOpen) return null;

  const handleCancel = () => {
    if (!reason) return;
    onCancel(reason);
    setStep('done');
    setTimeout(() => {
      setStep('confirm');
      setReason('');
      onClose();
    }, 1600);
  };

  const handleClose = () => {
    setStep('confirm');
    setReason('');
    onClose();
  };

  const CONFIRM_BTN_BASE = 'w-full py-3.5 px-4 rounded-xl border-[1.5px] flex items-center justify-center gap-2 font-bold text-body-sm transition-all font-body';
  const CONFIRM_BTN_ENABLED = 'border-secondary-500/40 bg-secondary-500/8 text-secondary-700 cursor-pointer hover:bg-secondary-500/14';
  const CONFIRM_BTN_DISABLED = 'border-ink-200 bg-ink-50 text-ink-600 opacity-50 cursor-not-allowed';

  return (
    <div
      className="fixed inset-0 flex items-center justify-center p-4 z-modal backdrop-blur bg-black/45 animate-cso-bd-in"
      onClick={handleClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-[460px] bg-white rounded-2xl border border-ink-200 shadow-xl overflow-hidden p-8 animate-cso-in"
      >
        {/* Warning glow blob */}
        <div className="absolute -top-[60px] left-1/2 -translate-x-1/2 w-[200px] h-[200px] rounded-full bg-[radial-gradient(circle,rgba(237,132,58,0.18)_0%,transparent_70%)] blur-[30px] pointer-events-none" />

        {/* Close */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 w-8 h-8 rounded-full bg-ink-50 border-0 flex items-center justify-center cursor-pointer text-ink-600 hover:bg-ink-200 transition-all z-10 p-0"
          aria-label="Fermer"
        >
          <X size={13} />
        </button>

        {step === 'confirm' ? (
          <>
            {/* Warning icon */}
            <div className="relative w-14 h-14 rounded-xl bg-gradient-to-br from-secondary-500/15 to-secondary-500/6 border border-secondary-500/25 flex items-center justify-center mx-auto mb-4">
              <AlertTriangle size={26} className="text-secondary-600" />
            </div>

            <h2 className="text-h3 font-extrabold text-ink-900 text-center mb-2">
              Annuler la session ?
            </h2>
            <p className="text-body-sm text-ink-600 text-center leading-relaxed mb-5">
              Cette action est irréversible. Vous pouvez aussi reprogrammer plutôt qu'annuler.
            </p>

            {/* Session summary */}
            <div className="px-4 py-3 rounded-xl bg-ink-50 border border-ink-200 mb-5">
              <p className="text-body-sm font-bold text-ink-900 mb-0.5">
                {sessionTitle}
              </p>
              <p className="text-micro text-ink-600 flex items-center gap-1">
                📅 {sessionDate}
              </p>
            </div>

            {/* Reason dropdown */}
            <div className="mb-6">
              <label className="block mb-2 text-body-sm font-semibold text-ink-900">
                Motif d'annulation <span className="text-secondary-600">*</span>
              </label>
              <div className="relative">
                <select
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                  className={`w-full pl-3 pr-10 py-2.5 h-auto min-h-[44px] rounded-lg border-[1.5px] border-ink-200 bg-ink-50 text-body-sm font-body outline-none cursor-pointer transition-colors box-border appearance-none focus:border-secondary-400 ${reason ? 'text-ink-900' : 'text-ink-600'}`}
                >
                  <option value="">Sélectionnez un motif…</option>
                  {REASONS.map((r) => (
                    <option key={r.value} value={r.value}>{r.label}</option>
                  ))}
                </select>
                <ChevronDown size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-ink-600 pointer-events-none" />
              </div>
            </div>

            {/* Action buttons */}
            <div className="flex flex-col gap-3">
              {/* Reschedule (primary action) */}
              <Button
                variant="primary"
                size="lg"
                fullWidth
                leadingIcon={<RefreshCcw size={15} />}
                onClick={() => { onReschedule(); handleClose(); }}
              >
                Reprogrammer plutôt
              </Button>

              {/* Cancel (destructive secondary) */}
              <button
                onClick={handleCancel}
                disabled={!reason}
                className={`${CONFIRM_BTN_BASE} ${reason ? CONFIRM_BTN_ENABLED : CONFIRM_BTN_DISABLED}`}
              >
                <CalendarX size={15} /> Confirmer l'annulation
              </button>
            </div>
          </>
        ) : (
          /* Done state */
          <div className="text-center py-6 animate-[csoFadeIn_0.4s_ease_both]">
            <div className="text-[3rem] mb-3">✅</div>
            <h3 className="text-h4 font-bold text-ink-900 mb-2">
              Session annulée
            </h3>
            <p className="text-body-sm text-ink-600">
              Vous pouvez réserver une nouvelle session quand vous le souhaitez.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CancelSessionModal;
