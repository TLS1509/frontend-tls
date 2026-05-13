/**
 * AuthorStrip — inline author meta strip.
 *
 * Affiche : avatar + nom + rôle + meta inline (date, readTime, etc.).
 * Conçu pour les pages éditoriales (Article, MagazineArticle, Dossier,
 * JournalDetail).
 *
 * Usage:
 *   <AuthorStrip
 *     name="Marie Dubois"
 *     role="Senior Editor TLS"
 *     meta={[
 *       { icon: <Calendar size={12} />, text: '12 mai 2026' },
 *       { icon: <Clock size={12} />,    text: '6 min de lecture' }
 *     ]}
 *   />
 *
 * Variants :
 *   - `compact` (default) : avatar md, 1 ligne (mobile-first)
 *   - `expanded` : avatar lg, role visible, meta wrapping
 */

import React from 'react';
import { Avatar } from '../ui/Avatar';
import type { AvatarSize } from '../ui/Avatar';

export interface AuthorMetaItem {
  icon?: React.ReactNode;
  text: string;
}

export interface AuthorStripProps {
  name: string;
  role?: string;
  avatarSrc?: string;
  avatarSize?: AvatarSize;
  meta?: AuthorMetaItem[];
  /** Compact = 1 line. Expanded = 2 lines (name on top, role + meta below). */
  variant?: 'compact' | 'expanded';
  className?: string;
}

export const AuthorStrip: React.FC<AuthorStripProps> = ({
  name,
  role,
  avatarSrc,
  avatarSize,
  meta,
  variant = 'compact',
  className = '',
}) => {
  const computedSize: AvatarSize = avatarSize ?? (variant === 'expanded' ? 'lg' : 'md');

  return (
    <div
      className={[
        'flex items-center gap-3 min-w-0',
        className,
      ].join(' ')}
    >
      <Avatar
        name={name}
        src={avatarSrc}
        size={computedSize}
        tint="brand"
        shape="circle"
      />

      <div className="min-w-0 flex-1 flex flex-col gap-0.5">
        <div className="flex items-baseline gap-2 flex-wrap min-w-0">
          <span className="font-body text-body-sm font-bold text-ink-900 truncate">
            {name}
          </span>
          {role && variant === 'compact' && (
            <span className="font-body text-micro text-ink-500 truncate">
              · {role}
            </span>
          )}
        </div>

        {(role && variant === 'expanded') || (meta && meta.length > 0) ? (
          <div className="flex items-center gap-x-2 gap-y-0.5 flex-wrap font-body text-micro text-ink-500">
            {role && variant === 'expanded' && <span>{role}</span>}
            {role && variant === 'expanded' && meta && meta.length > 0 && <span aria-hidden>·</span>}
            {meta?.map((m, i) => (
              <React.Fragment key={i}>
                <span className="inline-flex items-center gap-1">
                  {m.icon}
                  {m.text}
                </span>
                {i < meta.length - 1 && <span aria-hidden>·</span>}
              </React.Fragment>
            ))}
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default AuthorStrip;
