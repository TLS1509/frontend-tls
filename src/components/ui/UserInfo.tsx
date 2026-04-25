import React from 'react';
import { Avatar } from './Avatar';
import './UserInfo.css';

interface UserInfoProps {
  name: string;
  role?: string;
  avatarUrl?: string;
  className?: string;
}

export const UserInfo: React.FC<UserInfoProps> = ({
  name,
  role,
  avatarUrl,
  className = '',
}) => {
  const classes = ['tls-user-info', className].filter(Boolean).join(' ');

  return (
    <div className={classes}>
      <Avatar src={avatarUrl} name={name} size="md" />
      <div className="tls-user-info__content">
        <h4 className="tls-user-info__name">{name}</h4>
        {role && <p className="tls-user-info__role">{role}</p>}
      </div>
    </div>
  );
};
