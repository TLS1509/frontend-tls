import React from 'react';
import { Lock } from 'lucide-react';

export type AchievementBadgeColor = 'primary' | 'warm' | 'sun' | 'success';

export interface AchievementBadgeProps {
  title: string;
  description?: string;
  icon: React.ReactNode;
  /**
   * Date d'obtention. Une date ISO 8601 (« 2026-05-08 » ou
   * « 2026-05-08T10:00:00Z ») est formatée ici, en français (« 8 mai 2026 ») ;
   * toute autre chaîne est affichée telle quelle. Sans date, la carte dit
   * « Obtenu » sans en inventer une.
   */
  unlockedDate?: string;
  isLocked?: boolean;
  onShare?: () => void;
  color?: AchievementBadgeColor;
  size?: 'sm' | 'md' | 'lg';
}

const SIZE_PADDING: Record<'sm' | 'md' | 'lg', string> = {
  sm: 'p-stack',
  md: 'p-stack-lg',
  lg: 'p-section',
};

const ICON_CIRCLE: Record<'sm' | 'md' | 'lg', string> = {
  sm: 'w-[60px] h-[60px]',
  md: 'w-[100px] h-[100px]',
  lg: 'w-[140px] h-[140px]',
};

/* Le rythme vertical est tenu par la carte (piège n°12), plus par des marges
   posées sur chaque enfant — l'`h3`, qui suivait la pastille, ajoutait en
   plus sa marge de titre (0,75em) : 31 à 47 px entre la pastille et le titre.
   Pastille → texte et texte → action : le même pas, qui grandit avec la carte. */
const SIZE_GAP: Record<'sm' | 'md' | 'lg', string> = {
  sm: 'gap-stack',
  md: 'gap-stack-lg',
  lg: 'gap-section',
};

const ICON_INNER_PX: Record<'sm' | 'md' | 'lg', number> = { sm: 28, md: 48, lg: 64 };

/* La date s'écrit ici, une fois, en français (2026-09-24) : chaque page
   recevait l'ISO brut et devait la formater elle-même — trois le faisaient,
   les autres affichaient « 2026-05-08T10:00:00Z ». Une date seule
   (AAAA-MM-JJ) est lue en heure locale : `new Date('2026-05-08')` la lirait à
   minuit UTC, la veille à l'ouest de Greenwich. */
const formatDate = (value: string): string => {
  const jour = /^(\d{4})-(\d{2})-(\d{2})$/.exec(value);
  const date = jour
    ? new Date(Number(jour[1]), Number(jour[2]) - 1, Number(jour[3]))
    : /^\d{4}-\d{2}-\d{2}T/.test(value) ? new Date(value) : null;
  if (!date || Number.isNaN(date.getTime())) return value;
  // Une date impossible (« 2026-13-45 ») roulerait sur le mois suivant : on la laisse telle quelle.
  if (jour && (date.getMonth() !== Number(jour[2]) - 1 || date.getDate() !== Number(jour[3]))) return value;
  return date.toLocaleDateString('fr-FR', { day: 'numeric', month: 'short', year: 'numeric' });
};

const COLOR_GRADIENT: Record<AchievementBadgeColor, string> = {
  primary: 'bg-gradient-to-br from-primary-500 to-primary-600',
  warm:    'bg-gradient-to-br from-secondary-500 to-secondary-600',
  sun:     'bg-gradient-to-br from-accent-400 to-secondary-500',
  success: 'bg-gradient-to-br from-success-base to-primary-500',
};

const COLOR_BORDER: Record<AchievementBadgeColor, string> = {
  primary: 'border-primary-500',
  warm:    'border-secondary-500',
  sun:     'border-accent-400',
  success: 'border-success-base',
};

/* Texte de marque au cran 800 (doctrine, § 2). */
const COLOR_TEXT: Record<AchievementBadgeColor, string> = {
  primary: 'text-primary-800',
  warm:    'text-secondary-800',
  sun:     'text-accent-800',
  success: 'text-success-fg',
};

const COLOR_BTN: Record<AchievementBadgeColor, string> = {
  // Libellé blanc à 13 px : fond au 700, survol qui fonce au 800 (contrat de
  // Button solid). Au 500, le blanc mesurait 2,31 à 2,94.
  primary: 'bg-primary-700 hover:bg-primary-800 shadow-brand-sm hover:shadow-brand-md',
  warm:    'bg-secondary-700 hover:bg-secondary-800 shadow-sm hover:shadow-md',
  sun:     'bg-accent-700 hover:bg-accent-800 shadow-sm hover:shadow-md',
  success: 'bg-success-vivid hover:bg-success-fg shadow-sm hover:shadow-md',
};

export const AchievementBadge: React.FC<AchievementBadgeProps> = ({
  title,
  description,
  icon,
  unlockedDate,
  isLocked = false,
  onShare,
  color = 'primary',
  size = 'md',
}) => {
  const innerIconSize = ICON_INNER_PX[size];

  /* Centré seulement pour des lignes courtes (doctrine § 3, deux lignes au
     plus) : titre et date. Dès qu'une description est là — un texte qu'on
     lit, 3 ou 4 lignes dans une carte de 207 px —, toute la carte se cale à
     gauche, médaille comprise : un seul bord, pas de paragraphe centré. */
  const aligne = description ? 'items-start text-left' : 'items-center text-center';

  const cardClasses = [
    'flex flex-col bg-white rounded-lg border-2 transition-all duration-300',
    aligne,
    SIZE_PADDING[size],
    SIZE_GAP[size],
    isLocked ? 'border-ink-200 opacity-60 scale-95' : COLOR_BORDER[color],
  ].join(' ');

  const circleClasses = [
    'relative inline-flex items-center justify-center rounded-pill overflow-hidden',
    ICON_CIRCLE[size],
    isLocked ? 'bg-ink-100' : `${COLOR_GRADIENT[color]} shadow-brand-sm`,
  ].join(' ');

  return (
    <div className={cardClasses}>
      <div className={circleClasses}>
        {icon && typeof icon === 'object' && 'props' in icon
          ? React.cloneElement(icon as React.ReactElement, { size: innerIconSize } as any)
          : icon}
        {/* Plus de pulsation (arbitrage n°16), et plus d'étincelle au bord du
            disque (arbitrage n°18) : l'étincelle signale une fonction IA,
            jamais un badge obtenu (DESIGN.md §10). Rognée par l'`overflow`
            du disque, elle n'en laissait voir qu'une encoche. */}
        {isLocked && (
          <span className="absolute -bottom-2 -right-2 inline-flex items-center justify-center w-7 h-7 rounded-pill bg-white text-ink-500 border border-ink-200">
            <Lock size={Math.round(innerIconSize * 0.4)} />
          </span>
        )}
      </div>

      {/* Titre → texte 8 · texte → méta 12 (anatomie de carte, doctrine § 5). */}
      <div className={['flex flex-col gap-stack-sm', aligne].join(' ')}>
        <div className="flex flex-col gap-stack-xs">
          <h3 className="text-h3 font-display text-ink-900">{title}</h3>
          {description && (
            <p className="m-0 text-body text-ink-700">{description}</p>
          )}
        </div>

        <p
          className={[
            'm-0 text-caption',
            isLocked ? 'text-ink-600' : COLOR_TEXT[color],
          ].join(' ')}
        >
          {isLocked
            ? 'S’obtient une fois les prérequis validés'
            : unlockedDate
              ? `Obtenu le ${formatDate(unlockedDate)}`
              : 'Obtenu'}
        </p>
      </div>

      {onShare && !isLocked && (
        <button
          type="button"
          onClick={onShare}
          className={[
            'px-stack-md py-3 min-h-touch text-white border-0 rounded-md text-caption font-bold cursor-pointer transition-all',
            'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500',
            COLOR_BTN[color],
          ].join(' ')}
        >
          Partager
        </button>
      )}
    </div>
  );
};

export default AchievementBadge;
