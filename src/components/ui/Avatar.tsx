import React from 'react';

/**
 * Avatar — Source of truth: design-system/spec.json → components.Avatar
 *
 * User representation. Either image or initials. Never generic placeholder.
 * Sizes: xs/sm/md/lg/xl. Tints: brand (default), warm, sun, ink.
 * Shape: circle (default) | square. Optional status dot + level badge overlay.
 */

export type AvatarSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
export type AvatarTint = 'brand' | 'warm' | 'sun' | 'ink';
export type AvatarStatus = 'online' | 'busy' | 'away';
export type AvatarShape = 'circle' | 'square';

export interface AvatarProps extends React.HTMLAttributes<HTMLSpanElement> {
  src?: string;
  alt?: string;
  name?: string;
  initials?: string;
  size?: AvatarSize;
  tint?: AvatarTint;
  shape?: AvatarShape;
  status?: AvatarStatus;
  level?: number;
}

const TINTS: AvatarTint[] = ['brand', 'warm', 'sun', 'ink'];

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

const BASE =
  'relative inline-flex items-center justify-center font-body font-semibold overflow-visible shrink-0 select-none';

const SIZE_CLASSES: Record<AvatarSize, string> = {
  xs: 'w-6 h-6 text-[10px]',
  sm: 'w-8 h-8 text-xs',
  md: 'w-10 h-10 text-sm',
  lg: 'w-14 h-14 text-lg',
  xl: 'w-20 h-20 text-[26px]',
};

const TINT_CLASSES: Record<AvatarTint, string> = {
  brand: 'bg-primary-100 text-primary-800',
  warm:  'bg-secondary-100 text-secondary-700',
  sun:   'bg-accent-100 text-accent-800',
  ink:   'bg-ink-200 text-ink-800',
};

const SHAPE_SIZE_CLASSES: Record<AvatarSize, string> = {
  xs: 'rounded-xs',
  sm: 'rounded-sm',
  md: 'rounded-md',
  lg: 'rounded-lg',
  xl: 'rounded-xl',
};

const DOT_BASE =
  'absolute bottom-0 right-0 w-[28%] h-[28%] min-w-2 min-h-2 rounded-full border-2 border-white';

const DOT_STATUS_CLASSES: Record<AvatarStatus, string> = {
  online: 'bg-success-base',
  busy:   'bg-danger-base',
  away:   'bg-accent-400',
};

const LEVEL_BASE_SIZE_CLASSES: Record<AvatarSize, string> = {
  xs: 'min-w-4 h-4 -bottom-0.5 -right-0.5 text-[9px]',
  sm: 'min-w-4 h-4 -bottom-0.5 -right-0.5 text-[9px]',
  md: 'min-w-4 h-4 -bottom-0.5 -right-0.5 text-[9px]',
  lg: 'min-w-5 h-5 -bottom-[3px] -right-[3px] text-micro',
  xl: 'min-w-5 h-5 -bottom-[3px] -right-[3px] text-micro',
};

export const Avatar: React.FC<AvatarProps> = ({
  src,
  alt,
  name,
  initials,
  size = 'md',
  tint,
  shape = 'circle',
  status,
  level,
  className = '',
  ...rest
}) => {
  const resolvedTint: AvatarTint = tint ?? (name ? hashTint(name) : 'brand');
  const resolvedInitials = getInitials(name, initials);

  const shapeClass = shape === 'circle' ? 'rounded-full' : SHAPE_SIZE_CLASSES[size];

  const classes = [
    BASE,
    SIZE_CLASSES[size],
    TINT_CLASSES[resolvedTint],
    shapeClass,
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <span className={classes} role="img" aria-label={alt || name} {...rest}>
      {src ? (
        <img
          src={src}
          alt={alt || name || ''}
          className="w-full h-full object-cover rounded-[inherit] shadow-[inset_0_0_0_1px_rgba(15,23,42,0.08)]"
        />
      ) : (
        <span>{resolvedInitials}</span>
      )}
      {status && (
        <span className={`${DOT_BASE} ${DOT_STATUS_CLASSES[status]}`} aria-label={status} />
      )}
      {level !== undefined && (
        <span
          className={`absolute flex items-center justify-center px-[3px] rounded-pill bg-primary-600 text-white font-body font-extrabold leading-none border-2 border-white pointer-events-none whitespace-nowrap z-[2] ${LEVEL_BASE_SIZE_CLASSES[size]}`}
          aria-hidden="true"
        >
          {level}
        </span>
      )}
    </span>
  );
};

// ============================================================================
// AVATAR GROUP
// ============================================================================

export interface AvatarGroupProps {
  max?: number;
  size?: AvatarSize;
  children: React.ReactNode;
  className?: string;
}

const GROUP_MORE_SIZE_CLASSES: Record<AvatarSize, string> = SIZE_CLASSES;

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
    <span className={`inline-flex items-center [&>span]:border-2 [&>span]:border-white [&>span]:-ml-2.5 [&>span:first-child]:ml-0 [&>span]:transition-transform [&>span]:duration-150 [&>span:hover]:-translate-y-0.5 [&>span:hover]:z-[1] ${className}`}>
      {visible.map((child, i) => {
        if (React.isValidElement(child) && size) {
          return React.cloneElement(child as React.ReactElement<AvatarProps>, { size, key: i });
        }
        return <React.Fragment key={i}>{child}</React.Fragment>;
      })}
      {overflow > 0 && (
        <span
          className={`relative inline-flex items-center justify-center font-body font-semibold overflow-visible shrink-0 select-none rounded-full bg-ink-200 text-ink-700 ${GROUP_MORE_SIZE_CLASSES[size ?? 'md']}`}
          aria-label={`${overflow} autres`}
        >
          +{overflow}
        </span>
      )}
    </span>
  );
};

export default Avatar;
