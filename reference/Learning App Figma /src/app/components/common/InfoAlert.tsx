import { ReactNode } from 'react';
import { LucideIcon, AlertCircle, CheckCircle2, AlertTriangle, Info } from 'lucide-react';

interface InfoAlertProps {
  children: ReactNode;
  variant?: 'info' | 'success' | 'warning' | 'error';
  icon?: LucideIcon;
  className?: string;
}

/**
 * Info Alert Component - Alignement parfait icône + texte
 * 
 * Alert box avec icône alignée optiquement avec le texte
 * Utilise le pattern: alignItems: flex-start + paddingTop sur l'icône
 * 
 * Specs TLS Design System:
 * - Icon: 20px (w-5 h-5) - alignée avec le début du texte
 * - Text: Nunito • text-sm • leading-normal
 * - Container: padding var(--space-4) • rounded-lg
 * - Pattern: flex + alignItems: flex-start + paddingTop: 1px sur l'icône
 * - Utilise UNIQUEMENT les variables CSS du design system
 */
export function InfoAlert({ 
  children, 
  variant = 'info',
  icon,
  className = ''
}: InfoAlertProps) {
  // Default icons par variant
  const defaultIcons = {
    info: AlertCircle,
    success: CheckCircle2,
    warning: AlertTriangle,
    error: AlertCircle,
  };

  // Colors par variant - Couleurs TLS 400
  const colors = {
    info: {
      bg: 'rgba(74, 143, 161, 0.08)',     // info 400 à 8%
      border: 'rgba(74, 143, 161, 0.2)',  // info 400 à 20%
      icon: 'var(--info)',                // Bleu TLS 400
      text: 'var(--info)',
    },
    success: {
      bg: 'var(--success-50)',
      border: 'var(--success-200)',
      icon: 'var(--success-600)',
      text: 'var(--success-600)',
    },
    warning: {
      bg: 'rgba(248, 176, 68, 0.08)',     // warning 400 à 8%
      border: 'rgba(248, 176, 68, 0.2)',  // warning 400 à 20%
      icon: 'var(--warning)',             // Jaune TLS 400
      text: 'var(--warning)',
    },
    error: {
      bg: 'rgba(241, 138, 76, 0.08)',     // destructive 400 à 8%
      border: 'rgba(241, 138, 76, 0.2)',  // destructive 400 à 20%
      icon: 'var(--destructive)',         // Orange TLS 400
      text: 'var(--destructive)',
    },
  };

  const Icon = icon || defaultIcons[variant];
  const colorScheme = colors[variant];

  return (
    <div
      className={className}
      style={{
        padding: 'var(--space-4)',
        borderRadius: 'var(--radius-lg)',
        background: colorScheme.bg,
        border: `1px solid ${colorScheme.border}`,
      }}
    >
      <div style={{ display: 'flex', gap: 'var(--space-3)', alignItems: 'flex-start' }}>
        {/* Icon wrapper avec paddingTop pour alignement optique */}
        <div style={{ flexShrink: 0, paddingTop: '1px' }}>
          <Icon 
            className="w-5 h-5" 
            style={{ 
              color: colorScheme.icon,
              display: 'block',
            }} 
          />
        </div>
        
        {/* Content */}
        <div 
          style={{ 
            flex: 1,
            fontFamily: 'var(--font-body)',
            fontSize: 'var(--text-sm)',
            fontWeight: 'var(--font-weight-normal)',
            lineHeight: 'var(--leading-normal)',
            color: colorScheme.text,
          }}
        >
          {children}
        </div>
      </div>
    </div>
  );
}
