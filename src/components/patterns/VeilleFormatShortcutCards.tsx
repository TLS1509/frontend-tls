/**
 * VeilleFormatShortcutCards
 *
 * Grille de 4 cartes de navigation vers les formats éditoriaux de la Veille
 * (Magazine TLS / Actu hebdo / Vidéo Reels / Newsletter).
 *
 * Usage canonique :
 *   <VeilleFormatShortcutCards />                          — cartes light (défaut)
 *   <VeilleFormatShortcutCards surface="dark" />           — cartes dark-glass (legacy)
 *   <VeilleFormatShortcutCards cards={customCards} />      — cartes personnalisées
 */

import React from 'react';
import { useNavigate } from 'react-router-dom';
import { BookOpen, Newspaper, Clapperboard, Mail, ArrowRight } from 'lucide-react';

/* ── Types publics ─────────────────────────────────────────────────────────── */

export interface VeilleFormatCard {
  /** Icône affichée dans le bubble 32×32. Passer un <Icon size={16} /> coloré. */
  icon: React.ReactNode;
  title: string;
  subtitle: string;
  /** Route SPA vers laquelle naviguer au clic. */
  href: string;
}

export interface VeilleFormatShortcutCardsProps {
  /** Surcharge les 4 cartes par défaut. Si omis, les cartes canoniques Veille sont utilisées. */
  cards?: VeilleFormatCard[];
  /** Surface context — 'light' (default, same-surface) or 'dark' (glass on dark hero). */
  surface?: 'light' | 'dark';
  className?: string;
}

/* ── Cartes par défaut ─────────────────────────────────────────────────────── */

const DEFAULT_CARDS_DARK: VeilleFormatCard[] = [
  {
    icon: <BookOpen size={16} strokeWidth={2} className="text-primary-200" />,
    title: 'Magazine TLS',
    subtitle: 'Mensuel · analyses',
    href: '/veille/magazine',
  },
  {
    icon: <Newspaper size={16} strokeWidth={2} className="text-secondary-200" />,
    title: 'Actu hebdo',
    subtitle: 'Chaque vendredi',
    href: '/veille/weekly-newsletter',
  },
  {
    icon: <Clapperboard size={16} strokeWidth={2} className="text-white/70" />,
    title: 'Vidéo Reels',
    subtitle: 'Short formats · 60 sec',
    href: '/veille/video-reels',
  },
  {
    icon: <Mail size={16} strokeWidth={2} className="text-accent-300" />,
    title: 'Newsletter',
    subtitle: 'Abonnement & archives',
    href: '/veille/newsletter',
  },
];

const DEFAULT_CARDS_LIGHT: VeilleFormatCard[] = [
  {
    icon: <BookOpen size={16} strokeWidth={2} className="text-primary-500" />,
    title: 'Magazine TLS',
    subtitle: 'Mensuel · analyses',
    href: '/veille/magazine',
  },
  {
    icon: <Newspaper size={16} strokeWidth={2} className="text-secondary-500" />,
    title: 'Actu hebdo',
    subtitle: 'Chaque vendredi',
    href: '/veille/weekly-newsletter',
  },
  {
    icon: <Clapperboard size={16} strokeWidth={2} className="text-ink-500" />,
    title: 'Vidéo Reels',
    subtitle: 'Short formats · 60 sec',
    href: '/veille/video-reels',
  },
  {
    icon: <Mail size={16} strokeWidth={2} className="text-accent-500" />,
    title: 'Newsletter',
    subtitle: 'Abonnement & archives',
    href: '/veille/newsletter',
  },
];

/* ── Composant ────────────────────────────────────────────────────────────── */

export const VeilleFormatShortcutCards: React.FC<VeilleFormatShortcutCardsProps> = ({
  cards,
  surface = 'light',
  className = '',
}) => {
  const navigate = useNavigate();
  const isDark = surface === 'dark';
  const defaultCards = isDark ? DEFAULT_CARDS_DARK : DEFAULT_CARDS_LIGHT;
  const resolvedCards = cards ?? defaultCards;

  return (
    <div
      className={[
        'grid grid-cols-2 gap-stack-xs md:grid-cols-4',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
    >
      {resolvedCards.map(({ icon, title, subtitle, href }) => (
        <button
          key={href}
          type="button"
          onClick={() => navigate(href)}
          className={[
            'group flex items-center gap-stack-xs p-4 rounded-2xl border transition-all duration-base text-left focus-visible:outline-2 focus-visible:outline-offset-2',
            isDark
              ? 'bg-white/10 backdrop-blur-glass-medium border-white/20 hover:bg-white/15 focus-visible:outline-white/50'
              : 'bg-white border-ink-100 shadow-card hover:shadow-card-hover hover:border-ink-200 focus-visible:outline-primary-500',
          ].join(' ')}
        >
          {/* Icon bubble */}
          <span className={[
            'shrink-0 w-8 h-8 rounded-lg flex items-center justify-center',
            isDark ? 'bg-white/8' : 'bg-ink-50',
          ].join(' ')}>
            {icon}
          </span>

          {/* Text */}
          <span className="flex-1 min-w-0 flex flex-col gap-0">
            <span className={[
              'font-body text-body-sm font-bold leading-tight',
              isDark ? 'text-white' : 'text-ink-900',
            ].join(' ')}>
              {title}
            </span>
            <span className={[
              'font-body text-micro leading-tight',
              isDark ? 'text-white/60' : 'text-ink-400',
            ].join(' ')}>
              {subtitle}
            </span>
          </span>

          {/* Arrow */}
          <ArrowRight
            size={14}
            className={[
              'shrink-0 ml-auto opacity-0 group-hover:opacity-100 transition-opacity duration-base',
              isDark ? 'text-white/40' : 'text-ink-400',
            ].join(' ')}
          />
        </button>
      ))}
    </div>
  );
};
