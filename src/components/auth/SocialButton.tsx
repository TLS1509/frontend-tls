/**
 * SocialButton Component
 *
 * Reusable button for OAuth login (Google, LinkedIn, etc.)
 * Used in Auth pages (Login, Signup, etc.)
 *
 * Features:
 * - Consistent styling for OAuth providers
 * - Icon + text layout
 * - Hover state with background transition
 * - Accessibility: proper labels, keyboard support
 */

import React from 'react';

export type SocialProvider = 'google' | 'linkedin';

interface SocialButtonProps {
  provider: SocialProvider;
  onClick?: () => void;
  disabled?: boolean;
  isLoading?: boolean;
}

/**
 * SVG Icons for OAuth providers
 */
const GoogleIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M23.745 12.27c0-.79-.07-1.54-.187-2.27H12.03v4.51h6.84c-.29 1.48-.74 2.84-1.6 3.97v2.77h2.6c1.5-1.46 2.38-3.6 2.38-6.18z"
      fill="#4285F4"
    />
    <path
      d="M12.03 24c2.33 0 4.28-.76 5.73-2.06l-2.6-2.02c-.76.54-1.73.85-3.13.85-2.4 0-4.44-1.6-5.17-3.75H4.18v2.84C5.6 22.56 8.54 24 12.03 24z"
      fill="#34A853"
    />
    <path
      d="M6.86 14.09c-.3-.54-.46-1.13-.46-1.74s.16-1.2.46-1.74V7.87H4.18C3.43 9.34 3 10.97 3 12.5s.43 3.16 1.18 4.63l2.85-2.22.83-.62z"
      fill="#FBBC05"
    />
    <path
      d="M12.03 4.59c1.6 0 3.06.55 4.25 1.63l3.12-3.06C16.3.957 14.34 0 12.04 0 8.54 0 5.6 1.43 4.18 3.87l2.85 2.22c.73-2.15 2.77-3.5 5.17-3.5z"
      fill="#EA4335"
    />
  </svg>
);

const LinkedInIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.475-2.236-1.986-2.236-1.081 0-1.722.732-2.004 1.438-.103.249-.129.597-.129.946v5.421h-3.554s.05-8.789 0-9.514h3.554v1.347c.42-.648 1.36-1.573 3.322-1.573 2.429 0 4.25 1.574 4.25 4.963v4.777zM5.337 8.855c-1.144 0-1.915-.762-1.915-1.715 0-.957.77-1.715 1.967-1.715 1.144 0 1.915.758 1.915 1.715 0 .953-.771 1.715-1.967 1.715zm1.6 11.597H3.819V9.938h3.118v10.514zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.225 0z" />
  </svg>
);

const getProviderConfig = (provider: SocialProvider) => {
  const configs = {
    google: {
      label: 'Continuer avec Google',
      bgColor: 'var(--surface)',
      borderColor: 'var(--border-strong)',
      hoverBg: '#f3f4f6',
      icon: GoogleIcon,
    },
    linkedin: {
      label: 'Continuer avec LinkedIn',
      bgColor: 'var(--surface)',
      borderColor: 'var(--border-strong)',
      hoverBg: '#f3f4f6',
      icon: LinkedInIcon,
    },
  };
  return configs[provider];
};

export const SocialButton: React.FC<SocialButtonProps> = ({
  provider,
  onClick,
  disabled = false,
  isLoading = false,
}) => {
  const config = getProviderConfig(provider);
  const Icon = config.icon;
  const [isHovered, setIsHovered] = React.useState(false);

  return (
    <button
      onClick={onClick}
      disabled={disabled || isLoading}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        width: '100%',
        padding: 'var(--s-3) var(--s-4)',
        borderRadius: 'var(--r-md)',
        border: `1px solid ${config.borderColor}`,
        background: isHovered ? config.hoverBg : config.bgColor,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 'var(--s-3)',
        cursor: disabled ? 'not-allowed' : 'pointer',
        opacity: disabled ? 0.6 : 1,
        transition: 'all var(--dur-2)',
        fontSize: 'var(--t-body-sm)',
        fontWeight: 500,
        color: 'var(--text)',
        fontFamily: 'var(--font-body)',
      }}
      aria-label={config.label}
      title={config.label}
    >
      {isLoading ? (
        <span
          style={{
            display: 'inline-block',
            width: 18,
            height: 18,
            borderRadius: '50%',
            border: `2px solid var(--tls-primary-300)`,
            borderTopColor: 'var(--tls-primary-500)',
            animation: 'spin 0.8s linear infinite',
          }}
        />
      ) : (
        <Icon />
      )}
      {config.label}
    </button>
  );
};

export default SocialButton;
