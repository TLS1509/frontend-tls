import React from 'react';
import { Avatar } from './Avatar';

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

const SIZE_GAP: Record<UserInfoSize, string> = {
  sm: 'gap-2',
  md: 'gap-3',
  lg: 'gap-4',
};

const NAME_SIZE: Record<UserInfoSize, string> = {
  sm: 'text-body-sm',
  md: 'text-body',
  lg: 'text-h4',
};

const ROLE_SIZE: Record<UserInfoSize, string> = {
  sm: 'text-micro',
  md: 'text-caption',
  lg: 'text-body-sm',
};

const STATUS_DOT_COLOR: Record<UserInfoStatus, string> = {
  online:  'bg-success-base',
  offline: 'bg-ink-300',
  away:    'bg-accent-500',
};

const STATUS_DOT_SIZE: Record<UserInfoSize, string> = {
  sm: 'w-2 h-2',
  md: 'w-2.5 h-2.5',
  lg: 'w-3 h-3',
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
  const classes = ['flex items-center', SIZE_GAP[size], className].filter(Boolean).join(' ');

  return (
    <div className={classes}>
      <div className="relative inline-flex shrink-0">
        <Avatar src={avatarUrl} name={name} size={size} />
        {status && (
          <span
            className={[
              'absolute bottom-0 right-0 rounded-full border-2 border-white',
              STATUS_DOT_SIZE[size],
              STATUS_DOT_COLOR[status],
            ].join(' ')}
            aria-label={status}
          />
        )}
      </div>
      <div className="flex flex-col min-w-0">
        <div className="flex items-center gap-2 min-w-0">
          <h4 className={`m-0 font-semibold text-ink-900 truncate ${NAME_SIZE[size]}`}>{name}</h4>
          {badge && <span className="shrink-0 inline-flex items-center">{badge}</span>}
        </div>
        {role && <p className={`m-0 text-ink-500 truncate ${ROLE_SIZE[size]}`}>{role}</p>}
      </div>
    </div>
  );
};

export default UserInfo;
