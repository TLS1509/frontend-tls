import React from 'react';
import { Mail, Globe, Link2 } from 'lucide-react';

export interface ProfileMetadata {
  icon?: React.ReactNode;
  label: string;
  value: string | number;
}

export interface ProfileSocialLink {
  platform: 'email' | 'linkedin' | 'twitter' | 'website';
  url: string;
  label?: string;
}

export type ProfileCardVariant = 'default' | 'compact' | 'featured';

export interface ProfileCardProps extends React.HTMLAttributes<HTMLDivElement> {
  avatar?: string | React.ReactNode;
  name: string;
  role?: string;
  metadata?: ProfileMetadata[];
  socialLinks?: ProfileSocialLink[];
  bio?: string;
  cta?: {
    label: string;
    onClick: () => void;
    variant?: 'primary' | 'secondary';
  };
  variant?: ProfileCardVariant;
}

const SocialIcon: React.FC<{ platform: string }> = ({ platform }) => {
  switch (platform) {
    case 'email':    return <Mail size={18} strokeWidth={2} />;
    case 'linkedin': return <span className="font-bold text-[14px] leading-none">in</span>;
    case 'twitter':  return <span className="font-bold text-[15px] leading-none">𝕏</span>;
    case 'website':  return <Globe size={18} strokeWidth={2} />;
    default:         return <Link2 size={18} strokeWidth={2} />;
  }
};

const VARIANT_CARD: Record<ProfileCardVariant, string> = {
  default:  'p-6 gap-5 border-ink-200',
  compact:  'p-4 gap-3 border-ink-200',
  featured: 'p-8 gap-5 border-2 border-primary-500 bg-gradient-to-br from-primary-50 to-white',
};

const VARIANT_AVATAR: Record<ProfileCardVariant, string> = {
  default:  'w-20 h-20 border-2 border-primary-200 shadow-sm',
  compact:  'w-16 h-16 border-2 border-primary-200 shadow-sm',
  featured: 'w-24 h-24 border-[3px] border-primary-500 shadow-brand-xs',
};

const VARIANT_NAME: Record<ProfileCardVariant, string> = {
  default:  'text-h4',
  compact:  'text-h4',
  featured: 'text-h3',
};

const CTA_CLASSES: Record<'primary' | 'secondary', string> = {
  primary:   'bg-primary-500 text-white hover:bg-primary-600',
  secondary: 'bg-ink-50 text-ink-900 border border-ink-200 hover:bg-ink-100',
};

export const ProfileCard: React.FC<ProfileCardProps> = ({
  avatar,
  name,
  role,
  metadata,
  socialLinks,
  bio,
  cta,
  variant = 'default',
  className = '',
  ...rest
}) => {
  const isImageAvatar = typeof avatar === 'string';

  const cardClasses = [
    'bg-white border rounded-xl flex flex-col items-center text-center transition-all',
    'hover:shadow-md hover:border-ink-300',
    VARIANT_CARD[variant],
    className,
  ]
    .filter(Boolean)
    .join(' ');

  const metadataLayout =
    variant === 'compact'
      ? 'flex flex-row flex-wrap justify-center gap-2'
      : 'flex flex-col gap-2';

  const metaChipPadding = variant === 'compact' ? 'px-2 py-1 text-caption' : 'px-3 py-2 text-body-sm';

  return (
    <div className={cardClasses} {...rest}>
      {avatar && (
        <div
          className={[
            'shrink-0 rounded-full overflow-hidden flex items-center justify-center bg-ink-50',
            VARIANT_AVATAR[variant],
          ].join(' ')}
        >
          {isImageAvatar ? (
            <img src={avatar as string} alt={name} className="w-full h-full object-cover" />
          ) : (
            <div className="text-3xl">{avatar}</div>
          )}
        </div>
      )}

      <div className="flex flex-col gap-3 w-full">
        <div className="flex flex-col gap-1">
          <h3 className={`m-0 ${VARIANT_NAME[variant]} font-semibold text-ink-900`}>{name}</h3>
          {role && (
            <span className="text-caption text-ink-500 uppercase tracking-wider">{role}</span>
          )}
        </div>

        {metadata && metadata.length > 0 && (
          <div className={metadataLayout}>
            {metadata.map((item, idx) => (
              <div
                key={idx}
                className={`inline-flex items-center justify-center gap-2 bg-ink-50 rounded-md ${metaChipPadding}`}
              >
                {item.icon && <span className="text-xl inline-flex items-center">{item.icon}</span>}
                <span className="text-ink-500">{item.label}</span>
                <span className="font-semibold text-ink-900">{item.value}</span>
              </div>
            ))}
          </div>
        )}

        {bio && <p className="m-0 text-body-sm leading-relaxed text-ink-500">{bio}</p>}

        {socialLinks && socialLinks.length > 0 && (
          <div className="flex justify-center gap-2 pt-2 border-t border-ink-200">
            {socialLinks.map((link) => (
              <a
                key={link.platform}
                href={link.url}
                title={link.label || link.platform}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 inline-flex items-center justify-center rounded-full bg-ink-50 text-ink-500 no-underline transition-all hover:bg-primary-500 hover:text-white hover:-translate-y-0.5"
              >
                <SocialIcon platform={link.platform} />
              </a>
            ))}
          </div>
        )}

        {cta && (
          <button
            type="button"
            onClick={cta.onClick}
            className={[
              'w-full px-4 py-3 rounded-md text-body-sm font-semibold cursor-pointer transition-all',
              'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500',
              CTA_CLASSES[cta.variant || 'primary'],
            ].join(' ')}
          >
            {cta.label}
          </button>
        )}
      </div>
    </div>
  );
};

export default ProfileCard;
