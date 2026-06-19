/**
 * devStore — DEV-only Zustand store for UI state testing across pages.
 * No persistence — resets on page reload (intentional for test isolation).
 * Only imported by components guarded behind `import.meta.env.DEV`.
 */

import { create } from 'zustand';

export type DevUserPlan = 'free' | 'pro' | 'enterprise';

interface DevState {
  // Coaching
  coachAssigned: boolean;
  hasSession: boolean;
  userPlan: DevUserPlan;
  setCoachAssigned: (v: boolean) => void;
  setHasSession: (v: boolean) => void;
  setUserPlan: (v: DevUserPlan) => void;
}

export const useDevStore = create<DevState>((set) => ({
  coachAssigned: true,
  hasSession: true,
  userPlan: 'free',

  setCoachAssigned: (v) =>
    set((s) => ({ coachAssigned: v, hasSession: v ? s.hasSession : false })),
  setHasSession: (v) => set({ hasSession: v }),
  setUserPlan: (v) => set({ userPlan: v }),
}));

/** Trigger a coaching modal from outside Coaching.tsx */
export const triggerDevModal = (modal: 'booking' | 'cancel' | 'feedback' | 'success-booking' | 'success-cancel') => {
  window.dispatchEvent(new CustomEvent('dev:open-modal', { detail: modal }));
};

/** Set dashboard cold-start or returning-user state, then reload */
export const setDevDashboardState = (state: 'first-time' | 'returning') => {
  try {
    const raw = localStorage.getItem('tls-user-profile');
    const stored = raw ? JSON.parse(raw) : {};
    if (!stored.state) stored.state = {};
    stored.state.dashboardVisitCount = state === 'first-time' ? 0 : 22;
    stored.state.isOnboarded = true;
    localStorage.setItem('tls-user-profile', JSON.stringify(stored));
  } catch {
    // ignore JSON parse errors
  }
  window.location.reload();
};

/** Read current dashboard state from localStorage (for highlighting active state) */
export const getDevDashboardState = (): 'first-time' | 'returning' | 'unknown' => {
  try {
    const raw = localStorage.getItem('tls-user-profile');
    if (!raw) return 'unknown';
    const stored = JSON.parse(raw);
    const count = stored?.state?.dashboardVisitCount ?? -1;
    const onboarded = stored?.state?.isOnboarded ?? false;
    if (count === 0 && onboarded) return 'first-time';
    if (count > 0) return 'returning';
  } catch {
    // ignore
  }
  return 'unknown';
};
