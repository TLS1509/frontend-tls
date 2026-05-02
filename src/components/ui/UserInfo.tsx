import React from 'react';
import { Avatar } from './Avatar';
import './UserInfo.css';

export type UserInfoSize = 'sm' | 'md' | 'lg';
export type UserInfoStatus = 'online' | 'offline' | 'away';

interface UserInfoProps {
  name: string;
  role?: string;
  avatarUrl?: string;
  size?: UserInfoSize;
  status?: UserInfoStatus;
  badge?: React.ReactNode;
  className?: string;
}

const avatarSizeMap: Record<UserInfoSize, 'sm' | 'md' | 'lg'> = {
  sm: 'sm',
  md: 'md',
  lg: 'lg',
};

export const UserInfo: React.FC<UserInfoProps> = ({
  name,
  role,
  avatarUrl,
  size = 'md',
  status,
  badge,
  className = '',
}) => {
  const classes = ['tls-user-info', `tls-user-info--${size}`, className].filter(Boolean).join(' ');

  return (
    <div className={classes}>
      <div className="tls-user-info__avatar-wrap">
        <Avatar src={avatarUrl} name={name} size={avatarSizeMap[size]} />
        {status && (
          <span
            className={`tls-user-info__status tls-user-info__status--${status}`}
            aria-label={status}
          />
        )}
      </div>
      <div className="tls-user-info__content">
        <div className="tls-user-info__name-row">
          <h4 className="tls-user-info__name">{name}</h4>
          {badge && <span className="tls-user-info__badge">{badge}</span>}
        </div>
        {role && <p className="tls-user-info__role">{role}</p>}
      </div>
    </div>
  );
};

export default UserInfo;
