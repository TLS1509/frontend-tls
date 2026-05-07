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
  primary: 'bg-primary-500 text-white',
  warm:    'bg-secondary-500 text-white',
  sun:     'bg-accent-400 text-accent-900',
  success: 'bg-success-base text-white',
  warning: 'bg-accent-500 text-white',
};

export const ActivityTimeline: React.FC<ActivityTimelineProps> = ({
  items,
  className = '',
  showConnector = true,
}) => {
  return (
    <div className={['relative', className].filter(Boolean).join(' ')}>
      <ol className="list-none m-0 p-0 flex flex-col gap-5">
        {items.map((item, index) => {
          const tone = item.tone || 'primary';
          const isLast = index >= items.length - 1;
          const isPending = item.status === 'pending';

          return (
            <li key={item.id} className="relative flex items-start gap-3">
              {showConnector && !isLast && (
                <div
                  aria-hidden="true"
                  className="absolute left-[18px] top-10 bottom-[-1.25rem] w-px bg-ink-200"
                />
              )}

              <div className="relative z-10 shrink-0">
                {item.icon ? (
                  <div
                    className={[
                      'inline-flex items-center justify-center w-9 h-9 rounded-full ring-4 ring-white',
                      isPending ? 'bg-ink-200 text-ink-500' : TONE_DOT[tone],
                    ].join(' ')}
                  >
                    {item.icon}
                  </div>
                ) : (
                  <div
                    aria-hidden="true"
                    className={[
                      'w-3 h-3 rounded-full ring-4 ring-white mt-3 ml-3',
                      isPending ? 'bg-ink-300' : TONE_DOT[tone],
                    ].join(' ')}
                  />
                )}
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-3 flex-wrap">
                  <h3 className="m-0 text-body-sm font-semibold text-ink-900">{item.title}</h3>
                  <time className="text-micro text-ink-500">{item.timestamp}</time>
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
