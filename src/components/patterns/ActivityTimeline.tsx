import React from 'react';

export type TimelineTone = 'primary' | 'warm' | 'sun' | 'success' | 'warning';

export interface TimelineItem {
  id: string;
  title: string;
  description?: string;
  timestamp: string;
  icon?: React.ReactNode;
  tone?: TimelineTone;
  status?: 'completed' | 'pending' | 'in-progress';
}

export interface ActivityTimelineProps {
  items: TimelineItem[];
  className?: string;
  showConnector?: boolean;
}

const TONE_DOT: Record<TimelineTone, string> = {
  // Pastille d'icône : 3:1 à l'arrêt le plus clair — 600 pour le teal et l'orange,
  // 700 pour l'or (le blanc y mesure 3,66 · 3,98 · 4,88).
  primary: 'bg-gradient-to-br from-primary-600 to-primary-700 text-white shadow-brand-sm ring-primary-100',
  warm:    'bg-gradient-to-br from-secondary-600 to-secondary-700 text-white shadow-md ring-secondary-100',
  sun:     'bg-gradient-to-br from-accent-300 to-accent-500 text-accent-900 shadow-md ring-accent-100',
  success: 'bg-gradient-to-br from-success-base to-success-fg text-white shadow-md ring-success-bg',
  warning: 'bg-gradient-to-br from-accent-700 to-accent-800 text-white shadow-md ring-accent-100',
};

export const ActivityTimeline: React.FC<ActivityTimelineProps> = ({
  items,
  className = '',
  showConnector = true,
}) => {
  return (
    <div className={['relative', className].filter(Boolean).join(' ')}>
      <ol className="list-none m-0 p-0 flex flex-col gap-stack-lg">
        {items.map((item, index) => {
          const tone = item.tone || 'primary';
          const isLast = index >= items.length - 1;
          /* Un jalon « en cours » ne pulse plus (2026-09-24) : pas de mouvement
             permanent pour dire un état (arbitrage n°16) — il se lit à sa
             pastille pleine, entre les jalons faits et ceux « à venir »
             (pointillés), et à son titre. */
          const isPending = item.status === 'pending';

          return (
            <li key={item.id} className="group relative flex items-start gap-stack">
              {showConnector && !isLast && (
                <div
                  aria-hidden="true"
                  className="absolute left-[19px] top-12 bottom-[-1.5rem] w-0.5 bg-gradient-to-b from-ink-200 to-ink-200/30"
                />
              )}

              <div className="relative z-10 shrink-0">
                {item.icon ? (
                  <div
                    className={[
                      'inline-flex items-center justify-center w-10 h-10 rounded-pill ring-4 transition-transform group-hover:scale-110',
                      isPending
                        ? 'bg-white text-ink-600 ring-ink-100 border-2 border-dashed border-ink-300'
                        : TONE_DOT[tone],
                    ]
                      .filter(Boolean)
                      .join(' ')}
                  >
                    {item.icon}
                  </div>
                ) : (
                  <div
                    aria-hidden="true"
                    className={[
                      'w-3 h-3 rounded-pill ring-4 mt-3.5 ml-3.5',
                      isPending ? 'bg-white border-2 border-ink-300 ring-ink-100' : TONE_DOT[tone],
                    ]
                      .filter(Boolean)
                      .join(' ')}
                  />
                )}
              </div>

              {/* Rangée de fil (passe typographique du 2026-09-24) : titre 16/600,
                  texte 16/400 ink-700, date 13/400 ink-600 sur la ligne de base.
                  `pt-stack-2xs` recentre la première ligne sur la pastille de
                  40 px (6 + 13 = 19, contre 20) — le point de 12 px, posé à 14,
                  a le même centre. Un jalon « à venir » passe à ink-600, pas
                  ink-500 : ce cran est réservé aux textes indicatifs. */}
              <div className="flex-1 min-w-0 pt-stack-2xs pb-stack-3xs">
                <div className="flex items-baseline justify-between gap-stack-xs flex-wrap">
                  <p
                    className={[
                      'm-0 text-body font-semibold',
                      isPending ? 'text-ink-600' : 'text-ink-900',
                    ].join(' ')}
                  >
                    {item.title}
                  </p>
                  <time className="text-caption text-ink-600 whitespace-nowrap tabular-nums">
                    {item.timestamp}
                  </time>
                </div>

                {item.description && (
                  <p className="m-0 mt-stack-3xs text-body text-ink-700">
                    {item.description}
                  </p>
                )}
              </div>
            </li>
          );
        })}
      </ol>
    </div>
  );
};

export default ActivityTimeline;
