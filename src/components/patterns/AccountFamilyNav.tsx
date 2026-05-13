/**
 * AccountFamilyNav — sub-nav for the 3 "account" pages (Profile / Account / Settings).
 *
 * Clarifie la confusion entre les 3 pages "compte" en les regroupant
 * visuellement sous une nav commune avec :
 *  - label clair de chaque page
 *  - description courte du rôle de la page
 *  - état actif sur la page courante
 *
 * Usage :
 *   <AccountFamilyNav active="profile" />
 *   <AccountFamilyNav active="account" />
 *   <AccountFamilyNav active="settings" />
 *
 * Intégré en haut de chaque page après le header.
 */

import React from 'react';
import { Link } from 'react-router-dom';
import { UserRound, KeyRound, Settings2, CreditCard } from 'lucide-react';

export type AccountFamilyPage = 'profile' | 'account' | 'billing' | 'settings';

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
    description: 'Données personnelles, sécurité',
    href: '/account',
    Icon: KeyRound,
  },
  {
    id: 'billing',
    label: 'Facturation',
    description: 'Abonnement, factures, paiement',
    href: '/account/billing',
    Icon: CreditCard,
  },
  {
    id: 'settings',
    label: 'Paramètres',
    description: 'Préférences interface, notifications',
    href: '/settings',
    Icon: Settings2,
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
        'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2 p-2 rounded-2xl bg-ink-50 border border-ink-100',
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
              'group flex items-start gap-3 p-3 rounded-xl transition-all duration-base',
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
