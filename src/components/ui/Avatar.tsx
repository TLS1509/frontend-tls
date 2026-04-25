import React from 'react';

/**
 * Avatar — Source of truth: design-system/spec.json → components.Avatar
 *
 * User representation. Either image or initials. Never generic placeholder.
 * Sizes: xs/sm/md/lg/xl. Tints: brand (default), warm, sun, ink.
 * Optional status dot: online (default), busy, away.
 */

export type AvatarSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
export type AvatarTint = 'brand' | 'warm' | 'sun' | 'ink';
export type AvatarStatus = 'online' | 'busy' | 'away';

export interface AvatarProps extends React.HTMLAttributes<HTMLSpanElement> {
  src?: string;
  alt?: string;
  /** User's display name — used to derive initials + stable tint */
  name?: string;
  /** Explicit initials override (1–2 chars) */
  initials?: string;
  size?: AvatarSize;
  tint?: AvatarTint;
  /** Show status dot at bottom-right */
  status?: AvatarStatus;
}

const TINTS: AvatarTint[] = ['brand', 'warm', 'sun', 'ink'];

/** Stable hash for tint assignment — never random. */
const hashTint = (name: string): AvatarTint => {
  let h = 0;
  for (let i = 0; i < name.length; i++) h = (h * 31 + name.charCodeAt(i)) | 0;
  return TINTS[Math.abs(h) % TINTS.length];
};

const getInitials = (name?: string, initials?: string): string => {
  if (initials) return initials.slice(0, 2).toUpperCase();
  if (!name) return '?';
  const parts = name.trim().split(/\s+/);
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
};

export const Avatar: React.FC<AvatarProps> = ({
  src,
  alt,
  name,
  initials,
  size = 'md',
  tint,
  status,
  className = '',
  ...rest
}) => {
  const resolvedTint: AvatarTint = tint ?? (name ? hashTint(name) : 'brand');
  const resolvedInitials = getInitials(name, initials);

  const classes = [
    'avatar',
    size !== 'md' && `avatar--${size}`,
    resolvedTint !== 'brand' && `avatar--${resolvedTint}`,
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <span className={classes} role="img" aria-label={alt || name} {...rest}>
      {src ? <img src={src} alt={alt || name || ''} /> : <span>{resolvedInitials}</span>}
      {status && (
        <span
          className={`avatar__dot${status !== 'online' ? ` avatar__dot--${status}` : ''}`}
          aria-label={status}
        />
      )}
    </span>
  );
};

// ============================================================================
// AVATAR GROUP
// ============================================================================

export interface AvatarGroupProps {
  /** Maximum avatars to render before showing +N */
  max?: number;
  size?: AvatarSize;
  children: React.ReactNode;
  className?: string;
}

export const AvatarGroup: React.FC<AvatarGroupProps> = ({
  max = 4,
  size,
  children,
  className = '',
}) => {
  const items = React.Children.toArray(children);
  const visible = items.slice(0, max);
  const overflow = items.length - visible.length;

  return (
    <span className={`avatar-group ${className}`}>
      {visible.map((child, i) => {
        if (React.isValidElement(child) && size) {
          return React.cloneElement(child as React.ReactElement<AvatarProps>, { size, key: i });
        }
        return <React.Fragment key={i}>{child}</React.Fragment>;
      })}
      {overflow > 0 && (
        <span
          className={`avatar avatar-group__more${size && size !== 'md' ? ` avatar--${size}` : ''}`}
          aria-label={`${overflow} autres`}
        >
          +{overflow}
        </span>
      )}
    </span>
  );
};

export default Avatar;
