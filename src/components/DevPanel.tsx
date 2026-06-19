/**
 * DevPanel — Floating dev console for testing page states.
 * DEV ONLY — never rendered in production (guarded in App.tsx).
 *
 * Shortcut : Alt+D to toggle open/close.
 * Position : bottom-left (distinct from FloatingNavButton bottom-right).
 *
 * Sections :
 *  - Dashboard : toggle empty-state / returning-user (reloads page)
 *  - Coaching  : coach/session/plan toggles + modal triggers
 */

import React, { useState, useEffect } from 'react';
import { Terminal, X, RotateCcw } from 'lucide-react';
import {
  useDevStore,
  triggerDevModal,
  setDevDashboardState,
  getDevDashboardState,
  type DevUserPlan,
} from '../stores/devStore';

// ─── Sub-components ──────────────────────────────────────────────────────────

const SectionLabel: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <span className="block font-mono text-[10px] font-semibold text-ink-500 uppercase tracking-[0.12em] mb-2">
    {children}
  </span>
);

const Row: React.FC<{ label: string; children: React.ReactNode }> = ({ label, children }) => (
  <div className="flex items-center justify-between gap-2 min-h-[28px]">
    <span className="text-caption text-ink-400 shrink-0">{label}</span>
    <div className="flex items-center gap-1">{children}</div>
  </div>
);

interface ChipProps {
  active?: boolean;
  accent?: boolean;
  disabled?: boolean;
  onClick: () => void;
  children: React.ReactNode;
}
const Chip: React.FC<ChipProps> = ({ active, accent, disabled, onClick, children }) => (
  <button
    type="button"
    disabled={disabled}
    onClick={onClick}
    className={[
      'h-7 px-3 rounded-lg text-caption font-medium transition-colors duration-fast cursor-pointer',
      'focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-primary-500',
      'disabled:opacity-40 disabled:cursor-not-allowed',
      active && accent  ? 'bg-accent-400 text-ink-900' :
      active            ? 'bg-primary-600 text-white' :
                          'bg-white/[0.07] text-ink-400 hover:bg-white/[0.12] hover:text-white',
    ].filter(Boolean).join(' ')}
  >
    {children}
  </button>
);

const GhostChip: React.FC<{ onClick: () => void; children: React.ReactNode }> = ({ onClick, children }) => (
  <button
    type="button"
    onClick={onClick}
    className="h-7 px-2.5 rounded-lg text-caption font-medium bg-white/[0.07] text-ink-400 hover:bg-white/[0.12] hover:text-white transition-colors duration-fast cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-primary-500"
  >
    {children}
  </button>
);

// ─── Main component ───────────────────────────────────────────────────────────

export const DevPanel: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [dashState, setDashState] = useState<'first-time' | 'returning' | 'unknown'>('unknown');

  const { coachAssigned, hasSession, userPlan, setCoachAssigned, setHasSession, setUserPlan } =
    useDevStore();

  // Read dashboard state from localStorage on mount
  useEffect(() => {
    setDashState(getDevDashboardState());
  }, []);

  // Alt+D shortcut
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.altKey && e.key === 'd') setIsOpen((v) => !v);
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, []);

  const handleDashboard = (state: 'first-time' | 'returning') => {
    setDashState(state);
    setDevDashboardState(state); // reloads
  };

  return (
    /* Mobile: remonté au-dessus de la BottomNav (bottom-24). Desktop: après la sidebar (220/260px). */
    <div className="fixed bottom-24 left-4 md:bottom-6 md:left-[236px] lg:left-[276px] z-tooltip flex flex-col items-start gap-2">

      {/* Panel */}
      {isOpen && (
        <div className="w-72 rounded-2xl bg-ink-900 border border-white/[0.08] shadow-xl overflow-hidden animate-[filterIn_0.15s_ease_both]">

          {/* Header */}
          <div className="flex items-center justify-between px-4 py-2.5 border-b border-white/[0.07]">
            <div className="flex items-center gap-2">
              <Terminal size={13} className="text-accent-400" />
              <span className="font-mono text-caption font-bold text-accent-400 tracking-wide">
                DEV
              </span>
              <span className="font-mono text-caption text-ink-600">· Alt+D</span>
            </div>
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              aria-label="Fermer le panel"
              className="w-6 h-6 flex items-center justify-center rounded-md text-ink-500 hover:text-white hover:bg-white/10 transition-colors duration-fast cursor-pointer"
            >
              <X size={13} />
            </button>
          </div>

          {/* Sections */}
          <div className="flex flex-col divide-y divide-white/[0.06]">

            {/* ── Dashboard ── */}
            <div className="px-4 py-3">
              <SectionLabel>Dashboard</SectionLabel>
              <div className="flex gap-1.5">
                <Chip active={dashState === 'first-time'} onClick={() => handleDashboard('first-time')}>
                  Empty state
                </Chip>
                <Chip active={dashState === 'returning'} onClick={() => handleDashboard('returning')}>
                  Returning user
                </Chip>
                <button
                  type="button"
                  title="Recharger"
                  onClick={() => window.location.reload()}
                  className="w-7 h-7 flex items-center justify-center rounded-lg bg-white/[0.07] text-ink-500 hover:text-white hover:bg-white/[0.12] transition-colors duration-fast cursor-pointer"
                >
                  <RotateCcw size={12} />
                </button>
              </div>
            </div>

            {/* ── Coaching ── */}
            <div className="px-4 py-3 flex flex-col gap-2">
              <SectionLabel>Coaching</SectionLabel>

              <Row label="Coach">
                <Chip active={!coachAssigned} onClick={() => setCoachAssigned(!coachAssigned)}>
                  {coachAssigned ? 'Assigné' : 'Pas de coach'}
                </Chip>
              </Row>

              <Row label="Session">
                <Chip
                  active={!hasSession}
                  disabled={!coachAssigned}
                  onClick={() => setHasSession(!hasSession)}
                >
                  {hasSession ? 'À venir' : 'Aucune'}
                </Chip>
              </Row>

              <Row label="Plan">
                {(['free', 'pro', 'enterprise'] as DevUserPlan[]).map((plan) => (
                  <Chip key={plan} active={userPlan === plan} accent onClick={() => setUserPlan(plan)}>
                    {plan}
                  </Chip>
                ))}
              </Row>

              <div className="mt-1">
                <span className="block text-[10px] text-ink-600 mb-1.5">Modales</span>
                <div className="flex flex-wrap gap-1">
                  <GhostChip onClick={() => triggerDevModal('booking')}>Booking</GhostChip>
                  <GhostChip onClick={() => triggerDevModal('cancel')}>Cancel</GhostChip>
                  <GhostChip onClick={() => triggerDevModal('feedback')}>Feedback</GhostChip>
                  <GhostChip onClick={() => triggerDevModal('success-booking')}>✓ Booking</GhostChip>
                  <GhostChip onClick={() => triggerDevModal('success-cancel')}>✓ Cancel</GhostChip>
                </div>
              </div>
            </div>

          </div>
        </div>
      )}

      {/* Trigger FAB */}
      <button
        type="button"
        onClick={() => setIsOpen((v) => !v)}
        title="Dev Panel (Alt+D)"
        aria-label={isOpen ? 'Fermer le Dev Panel' : 'Ouvrir le Dev Panel'}
        aria-expanded={isOpen}
        className={[
          'w-10 h-10 rounded-xl flex items-center justify-center shadow-lg cursor-pointer',
          'transition-[background-color,color,box-shadow] duration-fast',
          'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-400',
          isOpen
            ? 'bg-accent-400 text-ink-900'
            : 'bg-ink-900 border border-white/[0.1] text-accent-400 hover:bg-ink-800 hover:text-accent-300',
        ].join(' ')}
      >
        <Terminal size={16} strokeWidth={2} />
      </button>
    </div>
  );
};

export default DevPanel;
