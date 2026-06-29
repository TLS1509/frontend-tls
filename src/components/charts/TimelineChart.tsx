import React, { useMemo } from 'react';
import { Circle } from 'lucide-react';

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
  onEventClick?: (event: TimelineEvent) => void;
  className?: string;
}

const TYPE_COLORS: Record<TimelineEvent['type'], string> = {
  lesson: 'bg-primary-100 text-primary-700 border-primary-300',
  session: 'bg-warm-100 text-secondary-700 border-secondary-300',
  badge: 'bg-sun-100 text-accent-600 border-accent-300',
  milestone: 'bg-success-bg text-success-fg border-success-base',
  achievement: 'bg-accent-50 text-accent-600 border-accent-400',
};

const DOT_COLORS: Record<TimelineEvent['type'], string> = {
  lesson: 'bg-primary-500',
  session: 'bg-secondary-500',
  badge: 'bg-accent-400',
  milestone: 'bg-success-base',
  achievement: 'bg-accent-500',
};

/**
 * TimelineChart — Display a vertical or horizontal timeline of events
 * Shows learner journey with lessons, sessions, badges, milestones
 * Clickable events for drill-down detail views
 */
export const TimelineChart: React.FC<TimelineChartProps> = ({
  data,
  layout = 'vertical',
  maxEvents = 20,
  onEventClick,
  className = '',
}) => {
  const displayEvents = useMemo(() => {
    // Sort by date descending (most recent first) then slice
    return data
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
      .slice(0, maxEvents);
  }, [data, maxEvents]);

  if (displayEvents.length === 0) {
    return (
      <div className={`flex items-center justify-center py-12 text-center ${className}`}>
        <div className="text-ink-500">
          <p className="text-body">No events to display</p>
        </div>
      </div>
    );
  }

  if (layout === 'horizontal') {
    return (
      <div className={`flex gap-4 overflow-x-auto pb-4 ${className}`}>
        {displayEvents.map((event, idx) => (
          <div
            key={event.id}
            className="flex flex-col items-center gap-2 flex-shrink-0 w-40"
            role="button"
            tabIndex={0}
            onClick={() => onEventClick?.(event)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                onEventClick?.(event);
              }
            }}
          >
            {/* Date label */}
            <span className="text-caption text-ink-500 font-semibold">
              {new Date(event.date).toLocaleDateString('fr-FR', {
                month: 'short',
                day: 'numeric',
              })}
            </span>

            {/* Dot */}
            <div className={`w-4 h-4 rounded-full ${DOT_COLORS[event.type]}`} />

            {/* Event card */}
            <div
              className={`p-2.5 rounded-md text-center border cursor-pointer hover:shadow-sm transition-shadow ${TYPE_COLORS[event.type]}`}
            >
              <p className="text-caption font-semibold line-clamp-2">{event.label}</p>
              {event.description && (
                <p className="text-micro mt-1 opacity-75 line-clamp-2">{event.description}</p>
              )}
            </div>
          </div>
        ))}
      </div>
    );
  }

  // Vertical layout (default)
  return (
    <div className={`flex flex-col gap-6 ${className}`}>
      {displayEvents.map((event, idx) => (
        <div
          key={event.id}
          className="flex gap-4 cursor-pointer group"
          role="button"
          tabIndex={0}
          onClick={() => onEventClick?.(event)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              onEventClick?.(event);
            }
          }}
        >
          {/* Timeline left side: date + dot + line */}
          <div className="flex flex-col items-center gap-2">
            {/* Date label */}
            <span className="text-caption text-ink-600 font-semibold w-20 text-right">
              {new Date(event.date).toLocaleDateString('fr-FR', {
                month: 'short',
                day: 'numeric',
                year: 'numeric',
              })}
            </span>

            {/* Dot (clickable indicator) */}
            <div className={`w-4 h-4 rounded-full ${DOT_COLORS[event.type]} ring-4 ring-white group-hover:ring-2 transition-all`} />

            {/* Vertical line (except on last item) */}
            {idx < displayEvents.length - 1 && (
              <div className="w-0.5 h-16 bg-ink-200" />
            )}
          </div>

          {/* Timeline right side: event card */}
          <div className="flex-1 mt-1">
            <div
              className={`p-4 rounded-lg border-l-4 transition-all group-hover:shadow-sm ${TYPE_COLORS[event.type]}`}
              style={{
                borderLeftColor: DOT_COLORS[event.type].replace('bg-', '#').split(' ')[0],
              }}
            >
              <div className="flex items-start gap-2">
                {event.icon && (
                  <div className="flex-shrink-0 mt-1">
                    {event.icon}
                  </div>
                )}
                <div className="flex-1">
                  <p className="text-body font-semibold text-ink-900">{event.label}</p>
                  {event.description && (
                    <p className="text-body-sm text-ink-600 mt-1">{event.description}</p>
                  )}
                  <span className="inline-block mt-2 px-2 py-1 rounded text-caption font-medium bg-white/50">
                    {event.type.charAt(0).toUpperCase() + event.type.slice(1)}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TimelineChart;
