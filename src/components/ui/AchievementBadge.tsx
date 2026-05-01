import React from 'react';
import { Sparkles, Lock } from 'lucide-react';

export interface AchievementBadgeProps {
  title: string;
  description?: string;
  icon: React.ReactNode;
  unlockedDate?: string;
  isLocked?: boolean;
  onShare?: () => void;
  color?: string;
  size?: 'sm' | 'md' | 'lg';
}

const sizeConfig = {
  sm: { iconRadius: 60, iconSize: 28, padding: 16 },
  md: { iconRadius: 100, iconSize: 48, padding: 24 },
  lg: { iconRadius: 140, iconSize: 64, padding: 32 },
};

const colorGradients: Record<string, string> = {
  'var(--tls-primary-500)': 'linear-gradient(135deg, var(--tls-primary-500), var(--tls-primary-600))',
  'var(--tls-orange-500)': 'linear-gradient(135deg, var(--tls-orange-500), var(--tls-orange-600))',
  'var(--tls-yellow-400)': 'linear-gradient(135deg, var(--tls-yellow-400), var(--tls-orange-500))',
  'var(--tls-success-base)': 'linear-gradient(135deg, var(--tls-success-base), var(--tls-primary-500))',
};

export const AchievementBadge: React.FC<AchievementBadgeProps> = ({
  title,
  description,
  icon,
  unlockedDate,
  isLocked = false,
  onShare,
  color = 'var(--tls-primary-500)',
  size = 'md',
}) => {
  const gradient = colorGradients[color] || `linear-gradient(135deg, ${color}, var(--tls-orange-500))`;
  const borderColor = isLocked ? 'var(--border)' : color;
  const config = sizeConfig[size];

  return (
    <div
      style={{
        padding: `var(--s-${config.padding === 16 ? '4' : config.padding === 24 ? '6' : '8'})`,
        backgroundColor: isLocked ? 'var(--surface)' : 'var(--surface)',
        borderRadius: 'var(--r-lg)',
        border: `2px solid ${borderColor}`,
        textAlign: 'center',
        transition: 'all var(--dur-3) var(--ease-standard)',
        opacity: isLocked ? 0.6 : 1,
        transform: isLocked ? 'scale(0.95)' : 'scale(1)',
      }}
    >
      {/* Badge Icon Circle */}
      <div
        style={{
          width: `${config.iconRadius}px`,
          height: `${config.iconRadius}px`,
          margin: `0 auto var(--s-8)`,
          borderRadius: '50%',
          background: isLocked ? 'var(--surface-sunken)' : gradient,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: isLocked ? 'none' : `0 8px 24px ${isLocked ? 'rgba(0,0,0,0.1)' : 'rgba(85, 161, 180, 0.25)'}`,
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {icon && typeof icon === 'object' && 'props' in icon
          ? React.cloneElement(icon as React.ReactElement, { size: config.iconSize } as any)
          : icon}
        {!isLocked && (
          <div
            style={{
              position: 'absolute',
              top: '-8px',
              right: '-8px',
              animation: 'sparkle 2s ease-in-out infinite',
              color: 'white',
            }}
          >
            <Sparkles size={Math.round(config.iconSize * 0.5)} />
          </div>
        )}
        {isLocked && (
          <div
            style={{
              position: 'absolute',
              bottom: '-8px',
              right: '-8px',
              background: 'var(--surface)',
              borderRadius: '50%',
              padding: '4px',
              color: 'var(--text-muted)',
            }}
          >
            <Lock size={Math.round(config.iconSize * 0.4)} />
          </div>
        )}
      </div>

      {/* Badge Title */}
      <h3
        style={{
          margin: `0 0 var(--s-2) 0`,
          fontSize: 'var(--t-h4)',
          fontWeight: '600',
          color: 'var(--text)',
          fontFamily: 'var(--font-display)',
        }}
      >
        {title}
      </h3>

      {/* Badge Description */}
      {description && (
        <p
          style={{
            fontSize: 'var(--t-body-sm)',
            color: 'var(--text-muted)',
            marginBottom: 'var(--s-4)',
            lineHeight: '1.5',
          }}
        >
          {description}
        </p>
      )}

      {/* Unlock Status */}
      <p
        style={{
          fontSize: 'var(--t-caption)',
          color: isLocked ? 'var(--text-muted)' : color,
          marginBottom: onShare ? 'var(--s-4)' : 0,
          fontWeight: '500',
        }}
      >
        {isLocked ? 'Complete prerequisites to unlock' : `Unlocked ${unlockedDate ? `on ${unlockedDate}` : 'today'}`}
      </p>

      {/* Action Button */}
      {onShare && !isLocked && (
        <button
          onClick={onShare}
          style={{
            marginTop: 'var(--s-4)',
            padding: 'var(--s-3) var(--s-5)',
            background: color,
            color: 'white',
            border: 'none',
            borderRadius: 'var(--r-md)',
            fontSize: 'var(--t-caption)',
            fontWeight: '600',
            cursor: 'pointer',
            transition: 'all var(--dur-2) var(--ease-standard)',
            boxShadow: `0 4px 12px ${isLocked ? 'rgba(0,0,0,0.1)' : 'rgba(85, 161, 180, 0.3)'}`,
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-2px)';
            e.currentTarget.style.boxShadow = `0 6px 16px rgba(85, 161, 180, 0.4)`;
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = `0 4px 12px rgba(85, 161, 180, 0.3)`;
          }}
        >
          Share Achievement
        </button>
      )}

      <style>{`
        @keyframes sparkle {
          0%, 100% { transform: scale(1) rotate(0deg); opacity: 1; }
          50% { transform: scale(1.2) rotate(20deg); opacity: 0.8; }
        }
      `}</style>
    </div>
  );
};

export default AchievementBadge;
