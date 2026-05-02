import React from 'react';
import './ActivityItem.css';

export type ActivityItemType = 'lesson' | 'achievement' | 'coach' | 'journal' | 'default';

interface ActivityItemProps {
  icon?: React.ReactNode;
  title: string;
  description?: string;
  timestamp?: string;
  type?: ActivityItemType;
  className?: string;
}

export const ActivityItem: React.FC<ActivityItemProps> = ({
  icon,
  title,
  description,
  timestamp,
  type = 'default',
  className = '',
}) => {
  const classes = [
    'tls-activity-item',
    type !== 'default' && `tls-activity-item--${type}`,
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={classes}>
      <div className="tls-activity-item__timeline">
        <div className="tls-activity-item__dot" />
        <div className="tls-activity-item__line" aria-hidden="true" />
      </div>
      {icon && <div className="tls-activity-item__icon">{icon}</div>}
      <div className="tls-activity-item__content">
        <h4 className="tls-activity-item__title">{title}</h4>
        {description && (
          <p className="tls-activity-item__description">{description}</p>
        )}
        {timestamp && (
          <span className="tls-activity-item__timestamp">{timestamp}</span>
        )}
      </div>
    </div>
  );
};
