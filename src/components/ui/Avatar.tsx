import React from 'react';

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
  /** Show ring-2 ring-white separator. Default false. Set to true when avatar sits on a dark/colored surface. */
  ring?: boolean;
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
  'relative inline-flex items-center justify-center font-body font-bold overflow-visible shrink-0 select-none';

const SIZE_CLASSES: Record<AvatarSize, string> = {
  xs: 'w-6 h-6 text-[10px]',
  sm: 'w-8 h-8 text-xs',
  md: 'w-10 h-10 text-sm',
  lg: 'w-14 h-14 text-lg',
  xl: 'w-20 h-20 text-[26px]',
};

const TINT_CLASSES: Record<AvatarTint, string> = {
  brand: 'bg-gradient-to-br from-primary-100 to-primary-200 text-primary-800',
  warm:  'bg-gradient-to-br from-secondary-100 to-secondary-200 text-secondary-700',
  sun:   'bg-gradient-to-br from-accent-100 to-accent-200 text-accent-800',
  ink:   'bg-gradient-to-br from-ink-100 to-ink-300 text-ink-800',
};

const SHAPE_SIZE_CLASSES: Record<AvatarSize, string> = {
  xs: 'rounded-md',
  sm: 'rounded-md',
  md: 'rounded-lg',
  lg: 'rounded-xl',
  xl: 'rounded-2xl',
};

const DOT_BASE =
  'absolute bottom-0 right-0 w-[28%] h-[28%] min-w-2.5 min-h-2.5 rounded-full ring-2 ring-white';

const DOT_STATUS_CLASSES: Record<AvatarStatus, string> = {
  online: 'bg-success-base shadow-[0_0_8px_rgba(51,90,86,0.6)]',
  busy:   'bg-danger-base',
  away:   'bg-accent-400',
};

const LEVEL_BASE_SIZE_CLASSES: Record<AvatarSize, string> = {
  xs: 'min-w-4 h-4 -bottom-0.5 -right-0.5 text-[9px]',
  sm: 'min-w-4 h-4 -bottom-0.5 -right-0.5 text-[9px]',
  md: 'min-w-[18px] h-[18px] -bottom-0.5 -right-0.5 text-[10px]',
  lg: 'min-w-5 h-5 -bottom-1 -right-1 text-micro',
  xl: 'min-w-6 h-6 -bottom-1 -right-1 text-caption',
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
  ring = false,
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
    ring && 'ring-2 ring-white',
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
          className="w-full h-full object-cover rounded-[inherit]"
        />
      ) : (
        <span className="leading-none">{resolvedInitials}</span>
      )}
      {status && (
        <span className={`${DOT_BASE} ${DOT_STATUS_CLASSES[status]}`} aria-label={status} />
      )}
      {level !== undefined && (
        <span
          className={`absolute flex items-center justify-center px-1 rounded-pill bg-gradient-to-br from-primary-500 to-primary-700 text-white font-body font-extrabold leading-none ring-2 ring-white pointer-events-none whitespace-nowrap z-[2] shadow-brand-xs ${LEVEL_BASE_SIZE_CLASSES[size]}`}
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
    <span
      className={[
        'inline-flex items-center',
        '[&>span]:-ml-2.5 [&>span:first-child]:ml-0',
        '[&>span]:transition-transform [&>span]:duration-base [&>span]:ease-emphasis',
        '[&>span:hover]:-translate-y-1 [&>span:hover]:z-[1]',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
    >
      {visible.map((child, i) => {
        if (React.isValidElement(child) && size) {
          return React.cloneElement(child as React.ReactElement<AvatarProps>, { size, key: i });
        }
        return <React.Fragment key={i}>{child}</React.Fragment>;
      })}
      {overflow > 0 && (
        <span
          className={[
            'relative inline-flex items-center justify-center font-body font-bold overflow-visible shrink-0 select-none rounded-full ring-2 ring-white bg-ink-100 text-ink-700',
            SIZE_CLASSES[size ?? 'md'],
          ].join(' ')}
          aria-label={`${overflow} autres`}
        >
          +{overflow}
        </span>
      )}
    </span>
  );
};

export default Avatar;
