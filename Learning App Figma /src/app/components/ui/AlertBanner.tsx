import { CheckCircle2, X, AlertTriangle, Info, XCircle } from 'lucide-react';
import { useEffect, useState } from 'react';

/**
 * TLS Alert Banner - Composant de notification avec variants
 * 
 * Variants disponibles :
 * - success : Utilise --success (Teal #9dbeba) - pour confirmations
 * - error : Utilise --destructive (Coral #f49a76) - pour erreurs
 * - warning : Utilise --warning (Jaune #F8B044) - pour avertissements
 * - info : Utilise --info (Bleu foncé #4A8FA1) - pour informations
 * 
 * Note : Teal et Coral sont utilisés à la fois pour les alerts ET les niveaux de compétences
 */

type AlertVariant = 'success' | 'error' | 'warning' | 'info';

interface AlertBannerProps {
  show: boolean;
  onDismiss: () => void;
  variant?: AlertVariant;
  title?: string;
  message?: string;
  autoDismiss?: boolean;
  autoDismissDelay?: number; // en ms
}

// Configuration des variants avec couleurs sémantiques TLS
const variantConfig = {
  success: {
    icon: CheckCircle2,
    bgGradient: 'linear-gradient(135deg, rgba(157, 190, 186, 0.1) 0%, rgba(136, 170, 166, 0.05) 100%)',
    borderColor: 'var(--success)',
    iconBg: 'var(--success)',
    iconShadow: '0 4px 12px rgba(157, 190, 186, 0.4)',
    boxShadow: '0 8px 20px rgba(157, 190, 186, 0.3), 0 20px 60px rgba(0, 0, 0, 0.15)',
  },
  error: {
    icon: XCircle,
    bgGradient: 'linear-gradient(135deg, rgba(244, 154, 118, 0.1) 0%, rgba(242, 133, 89, 0.05) 100%)',
    borderColor: 'var(--destructive)',
    iconBg: 'var(--destructive)',
    iconShadow: '0 4px 12px rgba(244, 154, 118, 0.4)',
    boxShadow: '0 8px 20px rgba(244, 154, 118, 0.3), 0 20px 60px rgba(0, 0, 0, 0.15)',
  },
  warning: {
    icon: AlertTriangle,
    bgGradient: 'linear-gradient(135deg, rgba(248, 176, 68, 0.1) 0%, rgba(248, 167, 51, 0.05) 100%)',
    borderColor: 'var(--warning)',
    iconBg: 'var(--warning)',
    iconShadow: '0 4px 12px rgba(248, 176, 68, 0.4)',
    boxShadow: '0 8px 20px rgba(248, 176, 68, 0.3), 0 20px 60px rgba(0, 0, 0, 0.15)',
  },
  info: {
    icon: Info,
    bgGradient: 'linear-gradient(135deg, rgba(74, 143, 161, 0.1) 0%, rgba(61, 119, 134, 0.05) 100%)',
    borderColor: 'var(--info)',
    iconBg: 'var(--info)',
    iconShadow: '0 4px 12px rgba(74, 143, 161, 0.4)',
    boxShadow: '0 8px 20px rgba(74, 143, 161, 0.3), 0 20px 60px rgba(0, 0, 0, 0.15)',
  },
};

export function AlertBanner({
  show,
  onDismiss,
  variant = 'success',
  title,
  message,
  autoDismiss = true,
  autoDismissDelay = 5000,
}: AlertBannerProps) {
  const [isVisible, setIsVisible] = useState(false);

  const config = variantConfig[variant];
  const IconComponent = config.icon;

  // Titres par défaut selon le variant
  const defaultTitles = {
    success: '✅ Action réussie !',
    error: '❌ Erreur',
    warning: '⚠️ Attention',
    info: 'ℹ️ Information',
  };

  // Messages par défaut selon le variant
  const defaultMessages = {
    success: 'Votre opération a été effectuée avec succès',
    error: 'Une erreur s\'est produite',
    warning: 'Cette action nécessite votre attention',
    info: 'Voici une information importante',
  };

  useEffect(() => {
    if (show) {
      // Petit délai pour l'animation d'entrée
      setTimeout(() => setIsVisible(true), 100);

      // Auto-dismiss après le délai
      if (autoDismiss) {
        const timer = setTimeout(() => {
          handleDismiss();
        }, autoDismissDelay);

        return () => clearTimeout(timer);
      }
    } else {
      setIsVisible(false);
    }
  }, [show, autoDismiss, autoDismissDelay]);

  const handleDismiss = () => {
    setIsVisible(false);
    setTimeout(() => {
      onDismiss();
    }, 300); // Durée de l'animation de sortie
  };

  if (!show) return null;

  return (
    <div
      style={{
        position: 'fixed',
        top: 'var(--space-6)',
        left: '50%',
        transform: `translateX(-50%) translateY(${isVisible ? '0' : '-120%'})`,
        zIndex: 60,
        width: '100%',
        maxWidth: '600px',
        padding: '0 var(--space-4)',
        transition: 'transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)',
      }}
    >
      <div
        style={{
          padding: 'var(--space-4)',
          borderRadius: 'var(--radius-xl)',
          background: config.bgGradient,
          border: `2px solid ${config.borderColor}`,
          display: 'flex',
          alignItems: 'center',
          gap: 'var(--space-3)',
          boxShadow: config.boxShadow,
          backdropFilter: 'blur(10px)',
          WebkitBackdropFilter: 'blur(10px)',
        }}
      >
        {/* Icon */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '48px',
            height: '48px',
            borderRadius: 'var(--radius-full)',
            background: config.iconBg,
            flexShrink: 0,
            boxShadow: config.iconShadow,
          }}
        >
          <IconComponent className="w-6 h-6" style={{ color: 'white', strokeWidth: 2.5 }} />
        </div>

        {/* Text Content */}
        <div style={{ flex: 1 }}>
          <h4
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'var(--text-lg)',
              fontWeight: 'var(--font-weight-bold)',
              color: 'var(--foreground)',
              margin: 0,
              marginBottom: 'var(--space-1)',
            }}
          >
            {title || defaultTitles[variant]}
          </h4>
          <p
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: 'var(--text-sm)',
              color: 'var(--muted-foreground)',
              margin: 0,
              lineHeight: 'var(--leading-relaxed)',
            }}
          >
            {message || defaultMessages[variant]}
          </p>
        </div>

        {/* Close Button */}
        <button
          onClick={handleDismiss}
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '32px',
            height: '32px',
            borderRadius: 'var(--radius-full)',
            background: 'white',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            cursor: 'pointer',
            transition: 'all var(--duration-base) ease',
            flexShrink: 0,
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = 'var(--muted)';
            e.currentTarget.style.transform = 'scale(1.1)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'white';
            e.currentTarget.style.transform = 'scale(1)';
          }}
        >
          <X className="w-4 h-4" style={{ color: 'var(--muted-foreground)' }} />
        </button>
      </div>
    </div>
  );
}

// Export également le composant SuccessAlertBanner pour compatibilité
export function SuccessAlertBanner(props: Omit<AlertBannerProps, 'variant'>) {
  return <AlertBanner {...props} variant="success" />;
}
