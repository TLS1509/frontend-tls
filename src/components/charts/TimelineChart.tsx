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

/* Surface de la carte : fond au cran 50 et filet complet au 200. Plus de barre
 * d'accent à gauche (`border-l-4`) : c'est un tell proscrit, et sa couleur était
 * fabriquée par `'bg-primary-500'.replace('bg-', '#')` — une valeur CSS
 * invalide, donc la barre n'a jamais eu la couleur voulue. Le type se lit à la
 * pastille du rail et à l'étiquette ci-dessous. */
const TYPE_SURFACE: Record<EventType, string> = {
  lesson: 'bg-primary-50 border-primary-200',
  session: 'bg-secondary-50 border-secondary-200',
  badge: 'bg-accent-50 border-accent-200',
  milestone: 'bg-success-bg border-success-base',
  achievement: 'bg-accent-50 border-accent-200',
};

/* Texte de l'étiquette de type : cran 800 ou `-fg`, ≥ 4,5:1 sur le blanc de la
 * pastille. Les anciens `text-accent-600` / `text-secondary-700` n'y étaient pas
 * tous, et `bg-warm-100` / `bg-sun-100` n'existent pas dans l'échelle. */
const TYPE_TEXT: Record<EventType, string> = {
  lesson: 'text-primary-800',
  session: 'text-secondary-800',
  badge: 'text-accent-800',
  milestone: 'text-success-fg',
  achievement: 'text-accent-800',
};

const DOT_COLORS: Record<EventType, string> = {
  lesson: 'bg-primary-500',
  session: 'bg-secondary-500',
  badge: 'bg-accent-400',
  milestone: 'bg-success-base',
  achievement: 'bg-accent-500',
};

/* Survol, seulement quand l'événement est cliquable : le filet se ferme d'un cran
 * (règle carte du 2026-09-16, ni ombre ni soulèvement). */
const TYPE_HOVER_BORDER: Record<EventType, string> = {
  lesson: 'hover:border-primary-300',
  session: 'hover:border-secondary-300',
  badge: 'hover:border-accent-300',
  milestone: 'hover:border-success-vivid',
  achievement: 'hover:border-accent-300',
};

const FOCUS_RING =
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink-900 focus-visible:ring-offset-2 focus-visible:ring-offset-white';

/* Le type d'événement est une DONNÉE : il chuchote, au registre de `MetaPill`
 * (casse normale, graisse 500), pas à celui d'un état. */
const TypeTag: React.FC<{ type: EventType }> = ({ type }) => (
  <span
    className={`inline-flex items-center gap-stack-3xs rounded-pill bg-white px-2 py-0.5 text-caption font-medium ${TYPE_TEXT[type]}`}
  >
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

  const cardClasses = (type: EventType, base: string) =>
    [
      base,
      'border',
      TYPE_SURFACE[type],
      interactive ? `w-full cursor-pointer text-left transition-colors ${TYPE_HOVER_BORDER[type]} ${FOCUS_RING}` : '',
    ]
      .filter(Boolean)
      .join(' ');

  if (layout === 'horizontal') {
    return (
      <ol aria-label={ariaLabel} className={`flex gap-stack overflow-x-auto pb-4 ${className}`}>
        {displayEvents.map((event) => {
          const Card = interactive ? 'button' : 'div';
          return (
            <li key={event.id} className="flex flex-col items-center gap-stack-xs flex-shrink-0 w-40">
              <time dateTime={event.date} className="text-caption text-ink-600 font-semibold tabular-nums">
                {formatDate(event.date, false)}
              </time>

              <span aria-hidden="true" className={`size-4 rounded-pill ${DOT_COLORS[event.type]}`} />

              <Card
                {...(interactive ? { type: 'button' as const, onClick: () => onEventClick?.(event) } : {})}
                className={cardClasses(event.type, 'flex flex-col items-center gap-stack-3xs p-2.5 rounded-md text-center')}
              >
                <span className="text-body font-semibold text-ink-900 line-clamp-2">{event.label}</span>
                {event.description && (
                  <span className="text-caption text-ink-700 line-clamp-2">{event.description}</span>
                )}
                <TypeTag type={event.type} />
              </Card>
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
        const Card = interactive ? 'button' : 'div';
        return (
          <li key={event.id} className="flex gap-stack">
            {/* Rail : date + pastille + trait vers l'événement suivant */}
            <div className="flex flex-col items-center gap-stack-xs">
              {/* 96 px : à 80, « 20 mars 2026 » se coupait sur deux lignes. */}
              <time dateTime={event.date} className="text-caption text-ink-600 font-semibold tabular-nums w-24 text-right">
                {formatDate(event.date, true)}
              </time>
              <span aria-hidden="true" className={`size-4 rounded-pill ring-4 ring-white ${DOT_COLORS[event.type]}`} />
              {idx < displayEvents.length - 1 && <span aria-hidden="true" className="w-0.5 h-16 bg-ink-200" />}
            </div>

            <div className="flex-1 mt-1">
              <Card
                {...(interactive ? { type: 'button' as const, onClick: () => onEventClick?.(event) } : {})}
                className={cardClasses(event.type, 'block p-4 rounded-lg')}
              >
                <span className="flex items-start gap-stack-xs">
                  {event.icon && <span className="flex-shrink-0 mt-1">{event.icon}</span>}
                  <span className="flex flex-1 flex-col items-start gap-stack-3xs">
                    <span className="text-body font-semibold text-ink-900">{event.label}</span>
                    {event.description && (
                      <span className="text-body text-ink-700">{event.description}</span>
                    )}
                    {/* Texte → méta : 12 (4 de gap + 8), l'anatomie de carte. */}
                    <span className="mt-stack-xs">
                      <TypeTag type={event.type} />
                    </span>
                  </span>
                </span>
              </Card>
            </div>
          </li>
        );
      })}
    </ol>
  );
};

export default TimelineChart;
