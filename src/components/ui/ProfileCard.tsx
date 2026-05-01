import React from 'react';

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

const getSocialIcon = (platform: string) => {
  const icons: Record<string, string> = {
    email: '✉️',
    linkedin: 'in',
    twitter: '𝕏',
    website: '🔗',
  };
  return icons[platform] || platform;
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
  const classes = ['tls-profile-card', `tls-profile-card--${variant}`, className].filter(Boolean).join(' ');

  const isImageAvatar = typeof avatar === 'string';

  return (
    <div className={classes} {...rest}>
      {avatar && (
        <div className="tls-profile-card__avatar">
          {isImageAvatar ? (
            <img src={avatar} alt={name} className="tls-profile-card__avatar-image" />
          ) : (
            <div className="tls-profile-card__avatar-content">{avatar}</div>
          )}
        </div>
      )}

      <div className="tls-profile-card__info">
        <div className="tls-profile-card__header">
          <h3 className="tls-profile-card__name">{name}</h3>
          {role && <span className="tls-profile-card__role">{role}</span>}
        </div>

        {metadata && metadata.length > 0 && (
          <div className="tls-profile-card__metadata">
            {metadata.map((item, idx) => (
              <div key={idx} className="tls-profile-card__meta-chip">
                {item.icon && <span className="tls-profile-card__meta-icon">{item.icon}</span>}
                <span className="tls-profile-card__meta-label">{item.label}</span>
                <span className="tls-profile-card__meta-value">{item.value}</span>
              </div>
            ))}
          </div>
        )}

        {bio && <p className="tls-profile-card__bio">{bio}</p>}

        {socialLinks && socialLinks.length > 0 && (
          <div className="tls-profile-card__social">
            {socialLinks.map((link) => (
              <a
                key={link.platform}
                href={link.url}
                className="tls-profile-card__social-link"
                title={link.label || link.platform}
                target="_blank"
                rel="noopener noreferrer"
              >
                {getSocialIcon(link.platform)}
              </a>
            ))}
          </div>
        )}

        {cta && (
          <button
            type="button"
            className={`tls-profile-card__cta tls-profile-card__cta--${cta.variant || 'primary'}`}
            onClick={cta.onClick}
          >
            {cta.label}
          </button>
        )}
      </div>
    </div>
  );
};

export default ProfileCard;
