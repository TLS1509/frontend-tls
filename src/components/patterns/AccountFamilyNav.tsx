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
import { IconChip } from '../ui/IconChip';

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
  /* ─── Mise en page — révisée le 2026-09-24 (passe typographique) ───────────
   *
   * Cinq colonnes dès 1024 px de FENÊTRE : or la nav vit dans une colonne de
   * 768 px, donc chaque onglet faisait 144 px. Mesuré sur les cinq pages : la
   * description (11 px) passait sur quatre lignes et « Confidentialité », à
   * 16 px, débordait sur l'onglet voisin. À 13 px, elle en aurait pris cinq.
   *
   * La grille répond donc à la largeur de SA boîte (requête de conteneur, deux
   * boîtes : la `nav` est le conteneur, la grille y répond) : une colonne, puis
   * deux dès 448 px, trois dès 672 px. Au plus étroit des trois colonnes
   * (684 px, fenêtre de 1024), un onglet garde 146 px de texte : mesuré de 320
   * à 1440 px de fenêtre, aucune description ne dépasse deux lignes.
   */
  return (
    <nav aria-label="Navigation compte" className={['@container', className].filter(Boolean).join(' ')}>
      <div
        className={[
          // Coins imbriqués : nav 20, retrait 6 (+1 de bordure) → liens à 14, concentriques.
          'grid grid-cols-1 @md:grid-cols-2 @2xl:grid-cols-3 gap-stack-xs p-stack-2xs rounded-xl bg-ink-50 border border-ink-100',
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
                // Lien 14, retrait 16 ≥ 14 : la pastille (14) est une forme fixe.
                'group flex items-start gap-stack-xs p-stack rounded-lg transition-all duration-base',
                isActive
                  ? 'bg-white shadow-sm cursor-default'
                  : 'hover:bg-white/70 hover:shadow-xs',
              ].join(' ')}
            >
              {/* Pastille au cran `sm` d'IconChip (32, rayon 10) : elle était à
                  36 px et rayon 14, hors de l'échelle des pastilles. */}
              <IconChip size="sm" tone={isActive ? 'brand' : 'neutral'}>
                <item.Icon />
              </IconChip>
              {/* `pt-tight` (2) : le centre de la première ligne (2 + 26/2 = 15)
                  tombe à 1 px de celui de la pastille (16) — il en était à 5
                  quand la pastille faisait 36 et le texte partait du haut. */}
              <span className="flex flex-col gap-stack-3xs min-w-0 pt-tight">
                {/* 16/600 dans les deux états : la sélection se dit par le fond
                    blanc, l'ombre, la pastille et l'encre — pas par une graisse
                    qui élargirait le mot. */}
                <span
                  className={[
                    'font-body text-body font-semibold',
                    isActive ? 'text-ink-900' : 'text-ink-700',
                  ].join(' ')}
                >
                  {item.label}
                </span>
                <span className="font-body text-caption text-ink-600">
                  {item.description}
                </span>
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
};

export default AccountFamilyNav;
