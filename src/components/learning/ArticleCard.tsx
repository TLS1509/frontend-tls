import React from 'react';
import { Card, CardEyebrow, CardTitle, CardDesc, CardFooter } from '../core/Card';
import { Button } from '../core/Button';
import { MetaPillGroup } from '../ui/MetaPillGroup';
import { MetaPill } from '../ui/MetaPill';
import { Calendar, User, Clock, Bookmark, BookmarkCheck, ArrowRight } from 'lucide-react';

export type ArticleTone = 'primary' | 'warm' | 'sun';

export interface ArticleCardProps {
  type: 'actu' | 'tutoriel' | 'dossier' | 'magazine';
  typeLabel: string;
  title: string;
  summary: string;
  category: string;
  author: string;
  publishedAt: string;
  readTime: string;
  tone?: ArticleTone;
  isSaved?: boolean;
  icon?: React.ReactNode;
  onSave?: (id: string) => void;
  onClick?: () => void;
  onRead?: () => void;
  itemId?: string;
  className?: string;
}

// Outer shell (double-bezel pattern)
const TONE_ICON_SHELL: Record<ArticleTone, string> = {
  primary: 'bg-primary-100/40 ring-1 ring-primary-200/50 p-1.5 rounded-2xl',
  warm:    'bg-secondary-100/40 ring-1 ring-secondary-200/50 p-1.5 rounded-2xl',
  sun:     'bg-accent-100/40 ring-1 ring-accent-200/50 p-1.5 rounded-2xl',
};

// Inner core
const TONE_ICON_CORE: Record<ArticleTone, string> = {
  primary: 'bg-gradient-to-br from-primary-50 to-primary-100 text-primary-700 shadow-[inset_0_1px_1px_rgba(255,255,255,0.6)]',
  warm:    'bg-gradient-to-br from-secondary-50 to-secondary-100 text-secondary-700 shadow-[inset_0_1px_1px_rgba(255,255,255,0.6)]',
  sun:     'bg-gradient-to-br from-accent-50 to-accent-100 text-accent-700 shadow-[inset_0_1px_1px_rgba(255,255,255,0.6)]',
};

// Sprint 3 hover glow
const TONE_HOVER_GLOW: Record<ArticleTone, string> = {
  primary: 'hover-glow-primary',
  warm:    'hover-glow-warm',
  sun:     'hover-glow-sun',
};

/* Le ton de la carte, dans le vocabulaire de Button. Enregistré = `soft` du
   ton (filet 700, glyphe 800) ; pas encore = `ghost` neutre, le glyphe seul.
   (Il était en `outline` : ce niveau est réservé à Annuler, arbitrage n°19 —
   un favori est un outil, pas la moitié d'une paire.) */
const TONE_SAVE: Record<ArticleTone, 'brand' | 'warm' | 'sun'> = {
  primary: 'brand',
  warm:    'warm',
  sun:     'sun',
};

export const ArticleCard: React.FC<ArticleCardProps> = ({
  typeLabel,
  title,
  summary,
  category,
  author,
  publishedAt,
  readTime,
  tone = 'primary',
  isSaved = false,
  icon,
  onSave,
  onClick,
  onRead,
  itemId = '',
  className = '',
}) => {
  return (
    <Card
      variant="feature"
      className={[
        'group flex flex-col gap-stack-xs',
        'transition-all duration-slow ease-emphasis',
        '',
        TONE_HOVER_GLOW[tone],
        className,
      ]
        .filter(Boolean)
        .join(' ')}
      onClick={onClick}
    >
      {/* En-tête : icône + (type · date) + enregistrer.
          Le type d'article est une DONNÉE : MetaPill (arbitrage n°15), plus un
          surtitre en capitales. La date passe en légende 13/400 ink-600. */}
      <div className="flex items-start justify-between gap-stack-xs">
        <div className="flex items-center gap-stack-sm">
          {icon && (
            // Double-bezel icon container
            <div className={TONE_ICON_SHELL[tone]} aria-hidden="true">
              <div
                className={[
                  'inline-flex items-center justify-center w-10 h-10 rounded-xl shrink-0',
                  TONE_ICON_CORE[tone],
                ].join(' ')}
              >
                {icon}
              </div>
            </div>
          )}
          <div className="flex flex-col items-start gap-stack-3xs">
            <MetaPill text={typeLabel} tone={tone} />
            <span className="inline-flex items-center gap-stack-3xs text-caption text-ink-600">
              <Calendar size={14} aria-hidden="true" />
              {publishedAt}
            </span>
          </div>
        </div>

        {onSave && (
          <Button
            iconOnly
            size="sm"
            emphasis={isSaved ? 'soft' : 'ghost'}
            tone={isSaved ? TONE_SAVE[tone] : 'neutral'}
            className="shrink-0"
            onClick={(e) => {
              e.stopPropagation();
              onSave(itemId);
            }}
            aria-label={isSaved ? 'Retirer des favoris' : 'Enregistrer'}
            aria-pressed={isSaved}
          >
            {isSaved ? <BookmarkCheck /> : <Bookmark />}
          </Button>
        )}
      </div>

      {/* Anatomie de carte (doctrine § 5) : catégorie en surtitre → titre 4 ·
          titre → texte 8 (le gap de la carte) · texte → pied 12, filet compris.
          La catégorie était en 500 au cran 700 du ton : une couleur de marque
          ne porte pas de texte sous le cran 800. Le `mt-stack-3xs` du titre
          remplace la marge de base des titres (0,75em), faite pour les sections. */}
      <div className="flex flex-col mt-stack-xs">
        <CardEyebrow>{category}</CardEyebrow>
        <CardTitle className="mt-stack-3xs">{title}</CardTitle>
      </div>

      <CardDesc>{summary}</CardDesc>

      {/* Footer */}
      <CardFooter className="flex-wrap">
        <MetaPillGroup
          items={[
            { icon: <User size={14} />, text: author },
            { icon: <Clock size={14} />, text: readTime },
          ]}
          size="sm"
        />
        {/* L'action de la carte : `soft` (arbitrage n°19). Elle était en
            `outline`, réservé à Annuler. */}
        {onRead && (
          <Button
            size="sm"
            emphasis="soft"
            trailingIcon={
              <ArrowRight
                size={14}
                className="transition-transform duration-fast group-hover:translate-x-0.5"
              />
            }
            onClick={(e) => {
              e.stopPropagation();
              onRead();
            }}
          >
            Lire
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};

export default ArticleCard;
