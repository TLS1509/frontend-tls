/**
 * AccountFamilyNav — sub-nav for the "account" domain pages.
 *
 * Single source of truth per concern (Phase 24 account rationalization):
 *  - Profil        → identité publique, compétences, badges
 *  - Mon compte     → informations personnelles, sécurité, interface
 *  - Confidentialité → RGPD, consentements IA/cookies, suppression, export
 *  - Notifications  → canaux et fréquence des alertes
 *  - Facturation    → abonnement, crédits, factures
 *
 * `Settings.tsx` (ex-"Paramètres") was retired: its Interface section moved
 * into Account's "Général" tab, and its Notifications/Confidentialité cards
 * were duplicates of the two dedicated pages below.
 *
 * Usage :
 *   <AccountFamilyNav active="profile" />
 *   <AccountFamilyNav active="account" />
 *   <AccountFamilyNav active="privacy" />
 *   <AccountFamilyNav active="notifications" />
 *   <AccountFamilyNav active="billing" />
 *
 * Intégré en haut de chaque page après le header.
 */

import React from 'react';
import { Link } from 'react-router-dom';
import { UserRound, KeyRound, ShieldCheck, BellRing, CreditCard } from 'lucide-react';

export type AccountFamilyPage = 'profile' | 'account' | 'privacy' | 'notifications' | 'billing';

const ITEMS: Array<{
  id: AccountFamilyPage;
  label: string;
  description: string;
  href: string;
  Icon: React.ComponentType<{ size?: number }>;
}> = [
  {
    id: 'profile',
    label: 'Profil',
    description: 'Identité publique, compétences, badges',
    href: '/profile',
    Icon: UserRound,
  },
  {
    id: 'account',
    label: 'Mon compte',
    description: 'Données personnelles, sécurité, interface',
    href: '/account',
    Icon: KeyRound,
  },
  {
    id: 'privacy',
    label: 'Confidentialité',
    description: 'RGPD, consentements IA, suppression',
    href: '/profile/privacy',
    Icon: ShieldCheck,
  },
  {
    id: 'notifications',
    label: 'Notifications',
    description: 'Canaux et fréquence des alertes',
    href: '/notifications/preferences',
    Icon: BellRing,
  },
  {
    id: 'billing',
    label: 'Facturation',
    description: 'Abonnement, crédits, factures',
    href: '/account/billing',
    Icon: CreditCard,
  },
];

export interface AccountFamilyNavProps {
  active: AccountFamilyPage;
  className?: string;
}

export const AccountFamilyNav: React.FC<AccountFamilyNavProps> = ({
  active,
  className = '',
}) => {
  return (
    <nav
      aria-label="Navigation compte"
      className={[
        'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-stack-xs p-2 rounded-2xl bg-ink-50 border border-ink-100',
        className,
      ].join(' ')}
    >
      {ITEMS.map((item) => {
        const isActive = item.id === active;
        return (
          <Link
            key={item.id}
            to={item.href}
            aria-current={isActive ? 'page' : undefined}
            className={[
              'group flex items-start gap-stack-xs p-3 rounded-xl transition-all duration-base',
              isActive
                ? 'bg-white shadow-sm cursor-default'
                : 'hover:bg-white/70 hover:shadow-xs',
            ].join(' ')}
          >
            <span
              aria-hidden
              className={[
                'shrink-0 inline-flex items-center justify-center w-9 h-9 rounded-lg',
                isActive
                  ? 'bg-primary-100 text-primary-700'
                  : 'bg-ink-100 text-ink-600 group-hover:bg-ink-200 group-hover:text-ink-800',
              ].join(' ')}
            >
              <item.Icon size={16} />
            </span>
            <div className="flex flex-col min-w-0">
              <span
                className={[
                  'font-body text-body-sm leading-tight',
                  isActive ? 'font-bold text-ink-900' : 'font-semibold text-ink-700',
                ].join(' ')}
              >
                {item.label}
              </span>
              <span className="font-body text-micro text-ink-500 leading-snug mt-0.5">
                {item.description}
              </span>
            </div>
          </Link>
        );
      })}
    </nav>
  );
};

export default AccountFamilyNav;
