/**
 * ProfileCard — DS pattern for user / coach / expert profile display.
 *
 * Redesigned (Phase 10) :
 *  - Uses canonical <Avatar size="xl"> from DS (with optional badge overlay slot)
 *  - Uses <MetaPillGroup tone={tone}> for specialties (tone-aware chips)
 *  - Uses <Button> from DS for CTA (single source of truth)
 *  - Optional rating block (Lucide Star icons + value + count)
 *  - Optional contact links (email / linkedin / website / phone / twitter)
 *  - Tone system : primary (teal) / warm (orange) / sun (yellow)
 *  - Variants : default / compact / featured
 *  - Align : center (default — hero cards) / left (sidebar / inline)
 *
 * Used by : Coaching (assigned coach profile), Profile, Leaderboard.
 */

import React from 'react';
import { Mail, ExternalLink, Globe, Phone, Star } from 'lucide-react';
import { Avatar } from './Avatar';
import { MetaPillGroup } from './MetaPillGroup';
import { Button } from '../core/Button';
import type { ButtonVariant } from '../core/Button';

export type ProfileCardVariant = 'default' | 'compact' | 'featured' | 'horizontal';
export type ProfileCardTone = 'primary' | 'warm' | 'sun';
export type ProfileCardAlign = 'center' | 'left';

export type ProfileContactType = 'email' | 'phone' | 'linkedin' | 'twitter' | 'website';

export interface ProfileContact {
  type: ProfileContactType;
  /** Display label (default = value or platform name). */
  label?: string;
  /** href (mailto:, tel:, https://...). */
  href: string;
}

export interface ProfileRating {
  /** Numeric rating value (e.g. 4.9). */
  value: number;
  /** Max scale (default 5). */
  max?: number;
  /** Optional count of reviews (e.g. 42). */
  count?: number;
}

export interface ProfileCardProps {
  /** Avatar : image src OR initials string OR React node (e.g. emoji). */
  avatar?: string;
  /** Initials shown when no image provided. */
  initials?: string;
  /** Person/coach name (used for avatar alt + h3 heading). */
  name: string;
  /** Optional title / role (e.g. "Expert IA & Pédagogie"). */
  role?: string;
  /** Optional badge overlay on the avatar (Star, online dot, certification check, etc.). */
  avatarBadge?: React.ReactNode;
  /** Optional rating block (Lucide Star icons + value + count of reviews). */
  rating?: ProfileRating;
  /** Tone-aware specialty/tag pills. */
  specialties?: string[];
  /** Contact links (email, LinkedIn, etc.). */
  contacts?: ProfileContact[];
  /** Bio paragraph. */
  bio?: string;
  /** Primary CTA action — either button config or custom React node. */
  cta?: React.ReactNode | {
    label: string;
    onClick: () => void;
    icon?: React.ReactNode;
    variant?: ButtonVariant;
  };
  /** Variant : default (md) / compact (sm) / featured (lg + tone border). */
  variant?: ProfileCardVariant;
  /** Tone : primary (teal — default) / warm / sun. Drives specialties + CTA + featured border. */
  tone?: ProfileCardTone;
  /** Content alignment. */
  align?: ProfileCardAlign;
  className?: string;
}

/* ── Class maps ─────────────────────────────────────────────────────────── */

const CONTACT_ICON: Record<ProfileContactType, React.ReactNode> = {
  email:    <Mail size={14} aria-hidden="true" />,
  phone:    <Phone size={14} aria-hidden="true" />,
  // Cette version de lucide-react n'expose pas `Linkedin` ni `Twitter` —
  // on utilise ExternalLink en fallback générique pour ces deux platforms.
  linkedin: <ExternalLink size={14} aria-hidden="true" />,
  twitter:  <ExternalLink size={14} aria-hidden="true" />,
  website:  <Globe size={14} aria-hidden="true" />,
};

const CONTACT_DEFAULT_LABEL: Record<ProfileContactType, string> = {
  email: 'Email',
  phone: 'Téléphone',
  linkedin: 'LinkedIn',
  twitter: 'Twitter',
  website: 'Site web',
};

const VARIANT_PADDING: Record<ProfileCardVariant, string> = {
  compact:    'p-5 gap-stack',
  default:    'p-6 gap-stack',
  featured:   'p-8 gap-stack-lg',
  horizontal: 'p-6 gap-stack-lg', // horizontal banner — gap-stack-lg horizontal (24px between blocks)
};

const VARIANT_NAME_SIZE: Record<ProfileCardVariant, string> = {
  compact:    'text-h4',
  horizontal: 'text-h4',
  default:  'text-h4',
  featured: 'text-h3',
};

const TONE_BORDER_FEATURED: Record<ProfileCardTone, string> = {
  primary: 'border-primary-200',
  warm:    'border-secondary-200',
  sun:     'border-accent-200',
};

const TONE_ROLE: Record<ProfileCardTone, string> = {
  primary: 'text-primary-700',
  warm:    'text-secondary-700',
  sun:     'text-accent-700',
};

const TONE_RATING_VALUE: Record<ProfileCardTone, string> = {
  primary: 'text-primary-700',
  warm:    'text-secondary-700',
  sun:     'text-accent-700',
};

/** Bg gradient for featured variant per tone */
const TONE_FEATURED_BG: Record<ProfileCardTone, string> = {
  primary: 'bg-gradient-to-br from-primary-50/95 to-white',
  warm:    'bg-gradient-to-br from-secondary-50/95 to-white',
  sun:     'bg-gradient-to-br from-accent-50/95 to-white',
};

/* ── Helpers ────────────────────────────────────────────────────────────── */

const RatingDisplay: React.FC<{ rating: ProfileRating; tone: ProfileCardTone }> = ({ rating, tone }) => {
  const max = rating.max ?? 5;
  const rounded = Math.round(rating.value);
  return (
    <div className="flex items-center gap-2" aria-label={`Note : ${rating.value} sur ${max}`}>
      <div className="flex gap-0.5" aria-hidden="true">
        {Array.from({ length: max }, (_, i) => (
          <Star
            key={i}
            size={15}
            className={i < rounded ? 'text-accent-400 fill-accent-400' : 'text-ink-200 fill-transparent'}
            strokeWidth={1.5}
          />
        ))}
      </div>
      <span className={`font-body text-caption font-bold ${TONE_RATING_VALUE[tone]}`}>
        {rating.value.toFixed(1)}
      </span>
      {rating.count !== undefined && (
        <span className="font-body text-caption text-ink-500">({rating.count} avis)</span>
      )}
    </div>
  );
};

/* ── Component ──────────────────────────────────────────────────────────── */

export const ProfileCard: React.FC<ProfileCardProps> = ({
  avatar,
  initials,
  name,
  role,
  avatarBadge,
  rating,
  specialties,
  contacts,
  bio,
  cta,
  variant = 'default',
  tone = 'primary',
  align = 'center',
  className = '',
}) => {
  const isHorizontal = variant === 'horizontal';
  const isCentered = !isHorizontal && align === 'center';
  const avatarTint = tone === 'warm' ? 'warm' : tone === 'sun' ? 'sun' : 'brand';

  // Horizontal variant : flex-row, avatar left, info center, cta right (responsive stacks on mobile)
  const cardClasses = [
    'rounded-2xl border bg-white shadow-sm transition-all duration-200 hover:shadow-md',
    isHorizontal
      ? 'flex flex-col md:flex-row md:items-center'
      : ['flex flex-col', isCentered ? 'items-center text-center' : 'items-start text-left'].join(' '),
    VARIANT_PADDING[variant],
    variant === 'featured' ? `border-2 ${TONE_BORDER_FEATURED[tone]} ${TONE_FEATURED_BG[tone]}` : 'border-ink-200',
    className,
  ].filter(Boolean).join(' ');

  /* ── HORIZONTAL VARIANT ────────────────────────────────────────────────── */
  if (isHorizontal) {
    return (
      <div className={cardClasses}>
        {/* Avatar — lg size for horizontal banner */}
        {(avatar || initials || name) && (
          <div className="relative shrink-0">
            <Avatar
              size="lg"
              tint={avatarTint}
              src={avatar}
              initials={initials}
              name={name}
              alt={name}
            />
            {avatarBadge && (
              <span
                aria-hidden="true"
                className="absolute -bottom-1 -right-1 inline-flex items-center justify-center w-6 h-6 rounded-pill bg-gradient-to-br from-accent-400 to-secondary-500 border-2 border-white shadow-sm text-white"
              >
                {avatarBadge}
              </span>
            )}
          </div>
        )}

        {/* Center block — name, role, specialties, rating */}
        <div className="flex-1 min-w-0 flex flex-col gap-stack-xs">
          <div className="flex items-baseline flex-wrap gap-x-3 gap-y-tight">
            <h3 className={`m-0 font-display ${VARIANT_NAME_SIZE[variant]} font-bold text-ink-900 leading-tight`}>
              {name}
            </h3>
            {role && (
              <p className={`m-0 font-body text-caption font-medium ${TONE_ROLE[tone]}`}>
                {role}
              </p>
            )}
          </div>
          {rating && <RatingDisplay rating={rating} tone={tone} />}
          {specialties && specialties.length > 0 && (
            <MetaPillGroup
              items={specialties.map((s) => ({ text: s, tone }))}
              size="sm"
              layout="horizontal"
              gap="sm"
            />
          )}
          {contacts && contacts.length > 0 && (
            <div className="flex flex-wrap gap-stack-xs mt-stack-xs">
              {contacts.map((c, i) => (
                <a
                  key={`${c.type}-${i}`}
                  href={c.href}
                  target={c.type === 'email' || c.type === 'phone' ? undefined : '_blank'}
                  rel={c.type === 'email' || c.type === 'phone' ? undefined : 'noopener noreferrer'}
                  className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-ink-50 hover:bg-ink-100 text-ink-700 hover:text-ink-900 transition-colors no-underline font-body text-caption font-medium"
                >
                  <span className={TONE_ROLE[tone]}>{CONTACT_ICON[c.type]}</span>
                  <span className="truncate max-w-[180px]">{c.label ?? CONTACT_DEFAULT_LABEL[c.type]}</span>
                </a>
              ))}
            </div>
          )}
        </div>

        {/* Right block — CTA (full width on mobile, auto width on md+) */}
        {cta && (
          <div className="shrink-0 md:ml-auto mt-stack-xs md:mt-0">
            {typeof cta === 'object' && 'label' in cta ? (
              <Button
                variant={cta.variant ?? (tone === 'warm' ? 'warm' : 'primary')}
                size="md"
                leadingIcon={cta.icon}
                onClick={cta.onClick}
              >
                {cta.label}
              </Button>
            ) : (
              cta
            )}
          </div>
        )}
      </div>
    );
  }

  /* ── DEFAULT / COMPACT / FEATURED VARIANTS (vertical) ──────────────────── */
  return (
    <div className={cardClasses}>
      {/* Avatar + optional badge overlay */}
      {(avatar || initials || name) && (
        <div className="relative shrink-0">
          <Avatar
            size={variant === 'compact' ? 'lg' : 'xl'}
            tint={avatarTint}
            src={avatar}
            initials={initials}
            name={name}
            alt={name}
          />
          {avatarBadge && (
            <span
              aria-hidden="true"
              className="absolute -bottom-1 -right-1 inline-flex items-center justify-center w-7 h-7 rounded-pill bg-gradient-to-br from-accent-400 to-secondary-500 border-2 border-white shadow-sm text-white"
            >
              {avatarBadge}
            </span>
          )}
        </div>
      )}

      {/* Name + role */}
      <div className={`flex flex-col gap-tight ${isCentered ? 'items-center' : 'items-start'}`}>
        <h3 className={`m-0 font-display ${VARIANT_NAME_SIZE[variant]} font-bold text-ink-900 leading-tight`}>
          {name}
        </h3>
        {role && (
          <p className={`m-0 font-body text-caption font-medium ${TONE_ROLE[tone]}`}>
            {role}
          </p>
        )}
      </div>

      {/* Rating */}
      {rating && <RatingDisplay rating={rating} tone={tone} />}

      {/* Specialties — MetaPillGroup tone-aware */}
      {specialties && specialties.length > 0 && (
        <MetaPillGroup
          items={specialties.map((s) => ({ text: s, tone }))}
          size="sm"
          layout="horizontal"
          gap="sm"
          className={isCentered ? 'justify-center' : 'justify-start'}
        />
      )}

      {/* Contacts — inline icon + label rows */}
      {contacts && contacts.length > 0 && (
        <div className={`flex flex-col gap-stack-xs w-full ${variant === 'compact' ? '' : 'pt-2 border-t border-ink-100'}`}>
          {contacts.map((c, i) => (
            <a
              key={`${c.type}-${i}`}
              href={c.href}
              target={c.type === 'email' || c.type === 'phone' ? undefined : '_blank'}
              rel={c.type === 'email' || c.type === 'phone' ? undefined : 'noopener noreferrer'}
              className="inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-ink-50 hover:bg-ink-100 text-ink-700 hover:text-ink-900 transition-colors no-underline font-body text-caption font-medium"
            >
              <span className={TONE_ROLE[tone]}>{CONTACT_ICON[c.type]}</span>
              <span className="truncate">{c.label ?? CONTACT_DEFAULT_LABEL[c.type]}</span>
            </a>
          ))}
        </div>
      )}

      {/* Bio */}
      {bio && (
        <p className={`m-0 font-body text-body-sm text-ink-600 leading-relaxed ${isCentered ? 'text-center' : 'text-left'}`}>
          {bio}
        </p>
      )}

      {/* CTA — uses DS Button or custom node */}
      {cta && (
        typeof cta === 'object' && 'label' in cta ? (
          <Button
            variant={cta.variant ?? (tone === 'warm' ? 'warm' : 'primary')}
            size="md"
            leadingIcon={cta.icon}
            onClick={cta.onClick}
            fullWidth
          >
            {cta.label}
          </Button>
        ) : (
          cta
        )
      )}
    </div>
  );
};

export default ProfileCard;
