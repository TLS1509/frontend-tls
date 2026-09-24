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
  sm: 'gap-stack-xs',
  md: 'gap-stack-xs',
  lg: 'gap-stack',
};

/* Le nom est un libellé de rangée (16/600, Nunito), pas un titre : il était
   dans un <h4> en graisse 600, qui s'inventait une place dans le plan de la
   page. En `lg`, il prend le pas du titre de bloc (h3 20/700, League
   Spartan). Le rôle est une méta : légende 13 ink-600 — il descendait à
   11 px en `sm`, le registre des étiquettes (`Badge`). */
const NAME_SIZE: Record<UserInfoSize, string> = {
  sm: 'font-body text-body font-semibold',
  md: 'font-body text-body font-semibold',
  lg: 'font-display text-h3',
};

const ROLE_SIZE: Record<UserInfoSize, string> = {
  sm: 'text-caption',
  md: 'text-caption',
  lg: 'text-body',
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
              'absolute bottom-0 right-0 rounded-pill border-2 border-white',
              STATUS_DOT_SIZE[size],
              STATUS_DOT_COLOR[status],
            ].join(' ')}
            aria-label={status}
          />
        )}
      </div>
      <div className="flex flex-col min-w-0">
        <div className="flex items-center gap-stack-xs min-w-0">
          <p className={`text-ink-900 truncate ${NAME_SIZE[size]}`}>{name}</p>
          {badge && <span className="shrink-0 inline-flex items-center">{badge}</span>}
        </div>
        {role && <p className={`text-ink-600 truncate ${ROLE_SIZE[size]}`}>{role}</p>}
      </div>
    </div>
  );
};

export default UserInfo;
