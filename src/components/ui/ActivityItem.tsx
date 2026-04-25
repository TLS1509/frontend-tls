import React from 'react';
import './ActivityItem.css';

interface ActivityItemProps {
  icon?: React.ReactNode;
  title: string;
  description?: string;
  timestamp?: string;
  className?: string;
}

export const ActivityItem: React.FC<ActivityItemProps> = ({
  icon,
  title,
  description,
  timestamp,
  className = '',
}) => {
  const classes = ['tls-activity-item', className].filter(Boolean).join(' ');

  return (
    <div className={classes}>
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
