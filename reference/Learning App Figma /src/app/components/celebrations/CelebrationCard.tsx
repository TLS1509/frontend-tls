import { LucideIcon } from 'lucide-react';

interface CelebrationCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  tags?: string[];
  variant?: 'booking' | 'unlock' | 'badge';
  className?: string;
}

export function CelebrationCard({
  icon: Icon,
  title,
  description,
  tags = [],
  variant = 'booking',
  className,
}: CelebrationCardProps) {
  const variantStyles = {
    booking: {
      iconBg: 'linear-gradient(135deg, #F8B044 0%, #ED843A 100%)',
      iconColor: 'white',
      borderColor: 'rgba(248, 176, 68, 0.3)',
      bgColor: 'rgba(248, 176, 68, 0.05)',
    },
    unlock: {
      iconBg: 'linear-gradient(135deg, #55A1B4 0%, #4A90A3 100%)',
      iconColor: 'white',
      borderColor: 'rgba(85, 161, 180, 0.3)',
      bgColor: 'rgba(85, 161, 180, 0.05)',
    },
    badge: {
      iconBg: 'linear-gradient(135deg, #ED843A 0%, #D97532 100%)',
      iconColor: 'white',
      borderColor: 'rgba(237, 132, 58, 0.3)',
      bgColor: 'rgba(237, 132, 58, 0.05)',
    },
  };

  const style = variantStyles[variant];

  return (
    <div
      className={className}
      style={{
        padding: 'var(--space-4)',
        borderRadius: 'var(--radius-xl)',
        background: 'linear-gradient(135deg, rgba(255,255,255,0.95) 0%, rgba(248,252,255,0.95) 100%)',
        backdropFilter: 'blur(20px)',
        border: `1.5px solid ${style.borderColor}`,
        boxShadow: '0 8px 24px rgba(85, 161, 180, 0.1)',
        transition: 'all var(--duration-base) cubic-bezier(0.4, 0, 0.2, 1)',
        cursor: 'pointer',
        position: 'relative',
        overflow: 'hidden',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'translateY(-4px)';
        e.currentTarget.style.boxShadow = '0 12px 32px rgba(85, 161, 180, 0.2)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'translateY(0)';
        e.currentTarget.style.boxShadow = '0 8px 24px rgba(85, 161, 180, 0.1)';
      }}
    >
      {/* Background glow effect */}
      <div style={{
        position: 'absolute',
        top: '-50%',
        right: '-50%',
        width: '200%',
        height: '200%',
        background: `radial-gradient(circle, ${style.bgColor} 0%, transparent 70%)`,
        opacity: 0.5,
        pointerEvents: 'none',
      }} />

      {/* Content */}
      <div style={{
        display: 'flex',
        alignItems: 'flex-start',
        gap: 'var(--space-3)',
        position: 'relative',
        zIndex: 1,
      }}>
        {/* Icon */}
        <div style={{
          width: '40px',
          height: '40px',
          borderRadius: 'var(--radius-lg)',
          background: style.iconBg,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0,
          boxShadow: `0 4px 12px ${style.borderColor}`,
        }}>
          <Icon 
            className="w-5 h-5" 
            style={{ color: style.iconColor }}
          />
        </div>

        {/* Text content */}
        <div style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          gap: 'var(--space-2)',
        }}>
          <h3 style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'var(--text-base)',
            fontWeight: 'var(--font-weight-bold)',
            color: 'var(--foreground)',
            letterSpacing: '-0.01em',
          }}>
            {title}
          </h3>

          <p style={{
            fontFamily: 'var(--font-body)',
            fontSize: 'var(--text-sm)',
            color: 'var(--muted-foreground)',
            lineHeight: '1.5',
          }}>
            {description}
          </p>

          {/* Tags */}
          {tags.length > 0 && (
            <div style={{
              display: 'flex',
              gap: 'var(--space-2)',
              flexWrap: 'wrap',
              marginTop: 'var(--space-1)',
            }}>
              {tags.map((tag, index) => (
                <span
                  key={index}
                  style={{
                    padding: 'var(--space-1) var(--space-2)',
                    borderRadius: 'var(--radius-full)',
                    background: style.bgColor,
                    border: `1px solid ${style.borderColor}`,
                    fontFamily: 'var(--font-body)',
                    fontSize: 'var(--text-xs)',
                    fontWeight: 'var(--font-weight-medium)',
                    color: variant === 'booking' ? '#ED843A' : variant === 'unlock' ? '#55A1B4' : '#ED843A',
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
