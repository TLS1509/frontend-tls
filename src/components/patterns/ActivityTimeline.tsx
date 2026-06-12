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
  primary: 'bg-gradient-to-br from-primary-400 to-primary-600 text-white shadow-brand-sm ring-primary-100',
  warm:    'bg-gradient-to-br from-secondary-400 to-secondary-600 text-white shadow-md ring-secondary-100',
  sun:     'bg-gradient-to-br from-accent-300 to-accent-500 text-accent-900 shadow-md ring-accent-100',
  success: 'bg-gradient-to-br from-success-base to-success-fg text-white shadow-md ring-success-bg',
  warning: 'bg-gradient-to-br from-accent-400 to-accent-600 text-white shadow-md ring-accent-100',
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
          const isPending = item.status === 'pending';
          const isInProgress = item.status === 'in-progress';

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
                      'inline-flex items-center justify-center w-10 h-10 rounded-full ring-4 transition-transform group-hover:scale-110',
                      isPending
                        ? 'bg-white text-ink-400 ring-ink-100 border-2 border-dashed border-ink-300'
                        : TONE_DOT[tone],
                      isInProgress ? 'animate-pulse' : '',
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
                      'w-3 h-3 rounded-full ring-4 mt-3.5 ml-3.5',
                      isPending ? 'bg-white border-2 border-ink-300 ring-ink-100' : TONE_DOT[tone],
                      isInProgress ? 'animate-pulse' : '',
                    ]
                      .filter(Boolean)
                      .join(' ')}
                  />
                )}
              </div>

              <div className="flex-1 min-w-0 pb-1">
                <div className="flex items-baseline justify-between gap-stack-xs flex-wrap">
                  <h3
                    className={[
                      'm-0 text-body-sm font-semibold leading-snug',
                      isPending ? 'text-ink-500' : 'text-ink-900',
                    ].join(' ')}
                  >
                    {item.title}
                  </h3>
                  <time className="text-micro text-ink-400 font-medium whitespace-nowrap">
                    {item.timestamp}
                  </time>
                </div>

                {item.description && (
                  <p className="m-0 mt-1 text-caption text-ink-500 leading-relaxed">
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
