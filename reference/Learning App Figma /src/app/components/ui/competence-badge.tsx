import { Target, TrendingUp } from 'lucide-react';

/**
 * TLS Competence Badge Component
 * Affiche le niveau de compétence avec visualisation
 * Préparation pour Passport de Compétences et Adaptive Learning
 */

interface CompetenceBadgeProps {
  competenceKey: string;
  label: string;
  level: number; // 1-5 (Débutant à Expert)
  showIcon?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

const LEVEL_CONFIG = {
  1: { 
    emoji: '🌱', 
    label: 'Débutant', 
    color: '#FFC15A',           // Jaune Clair (Accent 300)
    bgColor: 'rgba(255, 193, 90, 0.1)',
    glowColor: 'rgba(255, 193, 90, 0.4)',
  },
  2: { 
    emoji: '🔥', 
    label: 'Novice', 
    color: '#F8B044',           // Jaune Orangé (Accent - Jaune TLS)
    bgColor: 'rgba(248, 176, 68, 0.1)',
    glowColor: 'rgba(248, 176, 68, 0.4)',
  },
  3: { 
    emoji: '🎯', 
    label: 'Intermédiaire', 
    color: '#f49a76',           // Coral - Orange Saumon (NOUVEAU)
    bgColor: 'rgba(244, 154, 118, 0.1)',
    glowColor: 'rgba(244, 154, 118, 0.4)',
  },
  4: { 
    emoji: '🚀', 
    label: 'Avancé', 
    color: '#55A1B4',           // Bleu TLS (Primary)
    bgColor: 'rgba(85, 161, 180, 0.1)',
    glowColor: 'rgba(85, 161, 180, 0.4)',
  },
  5: { 
    emoji: '⭐', 
    label: 'Expert', 
    color: '#9dbeba',           // Teal - Bleu-Vert (NOUVEAU)
    bgColor: 'rgba(157, 190, 186, 0.1)',
    glowColor: 'rgba(157, 190, 186, 0.5)',
  },
};

export function CompetenceBadge({
  competenceKey,
  label,
  level,
  showIcon = true,
  size = 'md',
}: CompetenceBadgeProps) {
  const config = LEVEL_CONFIG[level as keyof typeof LEVEL_CONFIG] || LEVEL_CONFIG[1];
  
  const sizeStyles = {
    sm: {
      padding: 'var(--space-1) var(--space-2)',
      fontSize: 'var(--text-xs)',
      gap: 'var(--space-1)',
      iconSize: 12,
    },
    md: {
      padding: 'var(--space-2) var(--space-3)',
      fontSize: 'var(--text-sm)',
      gap: 'var(--space-2)',
      iconSize: 14,
    },
    lg: {
      padding: 'var(--space-3) var(--space-4)',
      fontSize: 'var(--text-base)',
      gap: 'var(--space-3)',
      iconSize: 16,
    },
  };

  const styles = sizeStyles[size];

  return (
    <div
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: styles.gap,
        padding: styles.padding,
        borderRadius: 'var(--radius-full)',
        background: config.bgColor,
        border: `1px solid ${config.color}`,
        cursor: 'pointer',
        transition: 'all var(--duration-base) ease',
        boxShadow: `0 2px 8px ${config.glowColor.replace('0.4', '0.2')}`,
      }}
      title={`${label} - Niveau: ${config.label}`}
      onMouseEnter={(e) => {
        e.currentTarget.style.boxShadow = `0 4px 16px ${config.glowColor}`;
        e.currentTarget.style.transform = 'translateY(-2px)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.boxShadow = `0 2px 8px ${config.glowColor.replace('0.4', '0.2')}`;
        e.currentTarget.style.transform = 'translateY(0)';
      }}
    >
      {showIcon && (
        <span style={{ fontSize: styles.fontSize, lineHeight: '1' }}>
          {config.emoji}
        </span>
      )}
      <span
        style={{
          fontFamily: 'var(--font-body)',
          fontSize: styles.fontSize,
          fontWeight: 'var(--font-weight-semibold)',
          color: config.color,
          lineHeight: '1',
        }}
      >
        {label}
      </span>
      <div
        style={{
          display: 'flex',
          gap: '2px',
          alignItems: 'center',
        }}
      >
        {[...Array(5)].map((_, index) => (
          <div
            key={index}
            style={{
              width: '4px',
              height: size === 'sm' ? '8px' : size === 'md' ? '10px' : '12px',
              borderRadius: 'var(--radius-sm)',
              background: index < level ? config.color : 'rgba(0, 0, 0, 0.1)',
              transition: 'all var(--duration-base) ease',
            }}
          />
        ))}
      </div>
    </div>
  );
}

/**
 * Competence Progress Card
 * Card étendue pour afficher la progression détaillée d'une compétence
 */
interface CompetenceProgressCardProps {
  competenceKey: string;
  label: string;
  level: number;
  previousLevel?: number;
  description?: string;
  lastUpdated?: Date;
}

export function CompetenceProgressCard({
  competenceKey,
  label,
  level,
  previousLevel,
  description,
  lastUpdated,
}: CompetenceProgressCardProps) {
  const config = LEVEL_CONFIG[level as keyof typeof LEVEL_CONFIG] || LEVEL_CONFIG[1];
  const hasImproved = previousLevel && level > previousLevel;

  return (
    <div
      style={{
        padding: 'var(--space-4)',
        borderRadius: 'var(--radius-xl)',
        background: 'var(--card)',
        border: `1px solid ${hasImproved ? config.color : 'var(--border)'}`,
        boxShadow: hasImproved ? `0 4px 12px ${config.color}33` : 'var(--shadow-sm)',
        transition: 'all var(--duration-base) ease',
      }}
    >
      {/* Header */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'start',
          marginBottom: 'var(--space-3)',
        }}
      >
        <div style={{ flex: 1 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)', marginBottom: 'var(--space-1)' }}>
            <Target size={16} style={{ color: config.color }} />
            <h4
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'var(--text-base)',
                fontWeight: 'var(--font-weight-semibold)',
                color: 'var(--foreground)',
                margin: 0,
              }}
            >
              {label}
            </h4>
          </div>
          {description && (
            <p
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: 'var(--text-xs)',
                color: 'var(--muted-foreground)',
                margin: 0,
                lineHeight: 'var(--leading-relaxed)',
              }}
            >
              {description}
            </p>
          )}
        </div>

        {hasImproved && (
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 'var(--space-1)',
              padding: 'var(--space-1) var(--space-2)',
              borderRadius: 'var(--radius-full)',
              background: 'rgba(34, 197, 94, 0.1)',
              border: '1px solid var(--success)',
            }}
          >
            <TrendingUp size={12} style={{ color: 'var(--success)' }} />
            <span
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: 'var(--text-xs)',
                fontWeight: 'var(--font-weight-bold)',
                color: 'var(--success)',
              }}
            >
              +{level - (previousLevel || 0)}
            </span>
          </div>
        )}
      </div>

      {/* Level Badge */}
      <div style={{ marginBottom: 'var(--space-3)' }}>
        <CompetenceBadge
          competenceKey={competenceKey}
          label={config.label}
          level={level}
          size="md"
        />
      </div>

      {/* Progress Bar */}
      <div
        style={{
          width: '100%',
          height: '6px',
          background: 'rgba(0, 0, 0, 0.05)',
          borderRadius: 'var(--radius-full)',
          overflow: 'hidden',
          marginBottom: lastUpdated ? 'var(--space-2)' : 0,
        }}
      >
        <div
          style={{
            width: `${(level / 5) * 100}%`,
            height: '100%',
            background: `linear-gradient(90deg, ${config.color}, ${config.color})`,
            borderRadius: 'var(--radius-full)',
            transition: 'width var(--duration-slow) var(--ease-out)',
          }}
        />
      </div>

      {/* Last Updated */}
      {lastUpdated && (
        <p
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: 'var(--text-xs)',
            color: 'var(--muted-foreground)',
            margin: 0,
            textAlign: 'right',
          }}
        >
          Mis à jour le {lastUpdated.toLocaleDateString('fr-FR')}
        </p>
      )}
    </div>
  );
}
