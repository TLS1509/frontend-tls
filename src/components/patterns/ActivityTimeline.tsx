/**
 * ActivityTimeline — Timeline Pattern
 *
 * Vertical timeline for displaying chronological activity/progress.
 * Shows timeline items with icons, timestamps, and descriptions.
 *
 * Usage:
 *   <ActivityTimeline
 *     items={[
 *       {
 *         id: '1',
 *         title: 'Course Started',
 *         description: 'You started React 101',
 *         timestamp: '2 days ago',
 *         icon: <BookOpen />,
 *         tone: 'primary'
 *       }
 *     ]}
 *   />
 */

import React from 'react';
import './ActivityTimeline.css';

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

export const ActivityTimeline: React.FC<ActivityTimelineProps> = ({
  items,
  className = '',
  showConnector = true,
}) => {
  return (
    <div className={`activity-timeline ${className}`}>
      <ol className="activity-timeline__list">
        {items.map((item, index) => {
          const toneClass = item.tone ? `activity-timeline__item--${item.tone}` : '';
          const statusClass = item.status ? `activity-timeline__item--${item.status}` : '';

          return (
            <li
              key={item.id}
              className={`activity-timeline__item ${toneClass} ${statusClass}`}
            >
              {/* Connector line */}
              {showConnector && index < items.length - 1 && (
                <div className="activity-timeline__connector" aria-hidden="true" />
              )}

              {/* Timeline dot with icon */}
              <div className="activity-timeline__dot">
                {item.icon ? (
                  <div className="activity-timeline__icon">{item.icon}</div>
                ) : (
                  <div className="activity-timeline__dot-inner" aria-hidden="true" />
                )}
              </div>

              {/* Content */}
              <div className="activity-timeline__content">
                <div className="activity-timeline__header">
                  <h3 className="activity-timeline__title">{item.title}</h3>
                  <time className="activity-timeline__timestamp">{item.timestamp}</time>
                </div>

                {item.description && (
                  <p className="activity-timeline__description">{item.description}</p>
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
