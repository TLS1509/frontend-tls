import React, { useMemo } from 'react';

export interface TimelineEvent {
  id: string;
  date: string; // ISO date or formatted string
  label: string;
  type: 'lesson' | 'session' | 'badge' | 'milestone' | 'achievement';
  description?: string;
  icon?: React.ReactNode;
  tone?: 'primary' | 'warm' | 'sun' | 'success' | 'danger';
}

interface TimelineChartProps {
  data: TimelineEvent[];
  layout?: 'vertical' | 'horizontal';
  maxEvents?: number;
  /** Rend chaque événement cliquable (un vrai <button>). Sans lui, la frise est une liste inerte. */
  onEventClick?: (event: TimelineEvent) => void;
  /** Nom accessible de la frise. */
  ariaLabel?: string;
  className?: string;
}

type EventType = TimelineEvent['type'];

const TYPE_LABEL: Record<EventType, string> = {
  lesson: 'Leçon',
  session: 'Session',
  badge: 'Badge',
  milestone: 'Jalon',
  achievement: 'Réussite',
};

/* Un événement n'est PLUS une carte — révisé le 2026-09-24.
 * Chaque événement était une boîte bordée au fond teinté de son type (cran 50,
 * filet 200, rayon 14, padding 16). Posée dans la carte de sa section, au
 * Passeport, la frise rendait cinq cartes dans une carte, en quatre teintes :
 * une carte dans une carte, et l'effet « sapin de Noël » de DESIGN.md § 11. La
 * frise est une collection : ses événements sont des rangées dans UNE carte,
 * celle de la page (arbitrage n°5). Le type se lit à la pastille du rail et à
 * sa légende ; le texte part du rail, sans boîte.
 * (La barre d'accent `border-l-4` d'avant la boîte reste proscrite.) */

const DOT_COLORS: Record<EventType, string> = {
  lesson: 'bg-primary-500',
  session: 'bg-secondary-500',
  badge: 'bg-accent-400',
  milestone: 'bg-success-base',
  achievement: 'bg-accent-500',
};

/* Cliquable : aucune boîte au repos ; au survol, un fond ink-50 qui déborde de
 * 8 px (marge négative = padding), pour que le texte ne bouge pas. Ni ombre ni
 * soulèvement (règle carte du 2026-09-16). */
const EVENEMENT_CLIQUABLE =
  'w-full cursor-pointer text-left rounded-lg -m-stack-xs p-stack-xs hover:bg-ink-50 transition-colors';

const FOCUS_RING =
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink-900 focus-visible:ring-offset-2 focus-visible:ring-offset-white';

/* Le type d'événement est une DONNÉE : il chuchote, en légende (13, ink-600),
 * sa couleur portée par la seule pastille. C'était une pilule blanche au texte
 * teinté, qui ne se lisait comme pilule que sur le fond teinté de la boîte. */
const TypeTag: React.FC<{ type: EventType }> = ({ type }) => (
  <span className="inline-flex items-center gap-stack-2xs text-caption text-ink-600">
    <span aria-hidden="true" className={`size-2 shrink-0 rounded-pill ${DOT_COLORS[type]}`} />
    {TYPE_LABEL[type]}
  </span>
);

const formatDate = (iso: string, withYear: boolean) =>
  new Date(iso).toLocaleDateString('fr-FR', {
    month: 'short',
    day: 'numeric',
    ...(withYear ? { year: 'numeric' as const } : {}),
  });

/**
 * TimelineChart — frise verticale ou horizontale des événements d'un parcours
 * (leçons, sessions, badges, jalons). Une liste ordonnée, pas une image : le
 * contenu est du texte, un lecteur d'écran doit pouvoir le parcourir.
 */
export const TimelineChart: React.FC<TimelineChartProps> = ({
  data,
  layout = 'vertical',
  maxEvents = 20,
  onEventClick,
  ariaLabel = 'Chronologie du parcours',
  className = '',
}) => {
  const displayEvents = useMemo(
    // Copie avant tri : `sort` muterait le tableau de la page.
    () =>
      [...data]
        .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
        .slice(0, maxEvents),
    [data, maxEvents],
  );

  if (displayEvents.length === 0) {
    return (
      <div className={`flex items-center justify-center py-12 text-center ${className}`}>
        <p className="text-body text-ink-600">Aucun événement à afficher</p>
      </div>
    );
  }

  const interactive = Boolean(onEventClick);

  const evenementClasses = (base: string) =>
    [base, interactive ? `${EVENEMENT_CLIQUABLE} ${FOCUS_RING}` : ''].filter(Boolean).join(' ');

  if (layout === 'horizontal') {
    return (
      <ol aria-label={ariaLabel} className={`flex gap-stack overflow-x-auto pb-4 ${className}`}>
        {displayEvents.map((event) => {
          const Evenement = interactive ? 'button' : 'div';
          return (
            <li key={event.id} className="flex flex-col items-center gap-stack-xs flex-shrink-0 w-40">
              <time dateTime={event.date} className="text-caption text-ink-600 font-semibold tabular-nums">
                {formatDate(event.date, false)}
              </time>

              <span aria-hidden="true" className={`size-4 rounded-pill ${DOT_COLORS[event.type]}`} />

              <Evenement
                {...(interactive ? { type: 'button' as const, onClick: () => onEventClick?.(event) } : {})}
                className={evenementClasses('flex flex-col items-center gap-stack-3xs text-center')}
              >
                <span className="text-body font-semibold text-ink-900 line-clamp-2">{event.label}</span>
                {event.description && (
                  <span className="text-caption text-ink-700 line-clamp-2">{event.description}</span>
                )}
                <TypeTag type={event.type} />
              </Evenement>
            </li>
          );
        })}
      </ol>
    );
  }

  // Vertical (défaut)
  return (
    <ol aria-label={ariaLabel} className={`flex flex-col gap-stack-lg ${className}`}>
      {displayEvents.map((event, idx) => {
        const Evenement = interactive ? 'button' : 'div';
        return (
          <li key={event.id} className="flex gap-stack">
            {/* Rail : date + pastille + trait jusqu'au bas de la rangée. `pt-1`
                cale la ligne de base de la date (13/20) sur celle du titre
                (16/26) : 4 px d'écart entre les deux. */}
            <div className="flex flex-col items-center gap-stack-xs pt-1">
              {/* 96 px : à 80, « 20 mars 2026 » se coupait sur deux lignes. */}
              <time dateTime={event.date} className="text-caption text-ink-600 font-semibold tabular-nums w-24 text-right">
                {formatDate(event.date, true)}
              </time>
              <span aria-hidden="true" className={`size-4 rounded-pill ring-4 ring-white ${DOT_COLORS[event.type]}`} />
              {idx < displayEvents.length - 1 && <span aria-hidden="true" className="w-0.5 flex-1 min-h-8 bg-ink-200" />}
            </div>

            <div className="flex-1 min-w-0">
              <Evenement
                {...(interactive ? { type: 'button' as const, onClick: () => onEventClick?.(event) } : {})}
                className={evenementClasses('flex items-start gap-stack-xs')}
              >
                {event.icon && <span className="flex-shrink-0 mt-1">{event.icon}</span>}
                <span className="flex flex-1 flex-col items-start gap-stack-3xs">
                  <span className="text-body font-semibold text-ink-900">{event.label}</span>
                  {event.description && (
                    <span className="text-body text-ink-700 max-w-prose">{event.description}</span>
                  )}
                  {/* Texte → méta : 12 (4 de gap + 8), l'anatomie de carte. */}
                  <span className="mt-stack-xs">
                    <TypeTag type={event.type} />
                  </span>
                </span>
              </Evenement>
            </div>
          </li>
        );
      })}
    </ol>
  );
};

export default TimelineChart;
