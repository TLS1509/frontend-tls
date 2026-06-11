/**
 * VeilleFormatShortcutCards
 *
 * Grille de 4 cartes dark-glass de navigation vers les formats éditoriaux de la Veille
 * (Magazine TLS / Actu hebdo / Vidéo Reels / Newsletter).
 *
 * Usage canonique :
 *   <VeilleFormatShortcutCards />                        — cartes par défaut
 *   <VeilleFormatShortcutCards cards={customCards} />    — cartes personnalisées
 *
 * Conçu pour être utilisé sur fond saturé dark/glass (hero Veille).
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
  className?: string;
}

/* ── Cartes par défaut ─────────────────────────────────────────────────────── */

const DEFAULT_CARDS: VeilleFormatCard[] = [
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

/* ── Composant ────────────────────────────────────────────────────────────── */

export const VeilleFormatShortcutCards: React.FC<VeilleFormatShortcutCardsProps> = ({
  cards = DEFAULT_CARDS,
  className = '',
}) => {
  const navigate = useNavigate();

  return (
    <div
      className={[
        'grid grid-cols-2 gap-3 md:grid-cols-4',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
    >
      {cards.map(({ icon, title, subtitle, href }) => (
        <button
          key={href}
          type="button"
          onClick={() => navigate(href)}
          className="group flex items-center gap-3 p-4 rounded-2xl bg-white/10 backdrop-blur-glass-medium border border-white/20 hover:bg-white/15 transition-all duration-base text-left focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white/50"
        >
          {/* Icon bubble */}
          <span className="shrink-0 w-8 h-8 rounded-lg bg-white/8 flex items-center justify-center">
            {icon}
          </span>

          {/* Text */}
          <span className="flex-1 min-w-0 flex flex-col gap-0">
            <span className="font-body text-body-sm font-bold text-white leading-tight">
              {title}
            </span>
            <span className="font-body text-micro text-white/60 leading-tight">
              {subtitle}
            </span>
          </span>

          {/* Arrow */}
          <ArrowRight
            size={14}
            className="shrink-0 text-white/40 ml-auto opacity-0 group-hover:opacity-100 transition-opacity duration-base"
          />
        </button>
      ))}
    </div>
  );
};
