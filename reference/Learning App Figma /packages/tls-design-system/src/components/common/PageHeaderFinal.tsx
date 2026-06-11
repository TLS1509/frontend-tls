import { LucideIcon } from 'lucide-react';
import { ReactNode } from 'react';

interface PageHeaderProps {
  icon: LucideIcon;
  title: string;
  description: string;
  actions?: ReactNode;
  iconColor?: string;
  iconGradientFrom?: string;
  iconGradientTo?: string;
}

/**
 * ✅ PROPOSITION 1 - Icon + Bloc texte compact
 * Hiérarchie forte : Titre 3xl + Description sm
 * Spacing minimal entre titre et desc (space-1)
 */
export function PageHeader1({
  icon: Icon,
  title,
  description,
  actions,
  iconColor = 'var(--primary)',
  iconGradientFrom = 'var(--primary-lighter)',
  iconGradientTo = 'var(--accent-lighter)',
}: PageHeaderProps) {
  return (
    <div 
      style={{
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'space-between',
        gap: 'var(--space-4)',
        marginBottom: 'var(--space-5)',
        paddingBottom: 'var(--space-4)',
        borderBottom: '1px solid var(--border)',
      }}
    >
      {/* Icon + Texte */}
      <div style={{ display: 'flex', gap: 'var(--space-4)', alignItems: 'flex-start', flex: 1 }}>
        {/* Icon */}
        <div 
          style={{
            width: '48px',
            height: '48px',
            borderRadius: 'var(--radius-lg)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: `linear-gradient(135deg, ${iconGradientFrom} 0%, ${iconGradientTo} 100%)`,
            border: '1px solid rgba(255, 255, 255, 0.5)',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)',
            flexShrink: 0,
          }}
        >
          <Icon style={{ width: '24px', height: '24px', color: iconColor }} />
        </div>

        {/* Bloc texte compact */}
        <div style={{ flex: 1, minWidth: 0 }}>
          <h1 
            style={{ 
              fontFamily: 'var(--font-display)',
              fontSize: 'var(--text-3xl)',
              fontWeight: 'var(--font-weight-bold)',
              color: 'var(--foreground)',
              lineHeight: 'var(--leading-tight)',
              margin: 0,
              marginBottom: 'var(--space-1)', // Spacing minimal
            }}
          >
            {title}
          </h1>
          <p 
            style={{ 
              fontFamily: 'var(--font-body)',
              fontSize: 'var(--text-sm)',
              fontWeight: 'var(--font-weight-medium)',
              color: 'var(--neutral-700)',
              lineHeight: 'var(--leading-normal)',
              margin: 0,
            }}
          >
            {description}
          </p>
        </div>
      </div>

      {/* Actions */}
      {actions && (
        <div style={{ display: 'flex', gap: 'var(--space-3)', flexShrink: 0 }}>
          {actions}
        </div>
      )}
    </div>
  );
}

/**
 * ✅ PROPOSITION 2 - Icon inline + Texte stack serré
 * Titre 2xl + Description base
 * Icon petit 40px, tout très compact
 */
export function PageHeader2({
  icon: Icon,
  title,
  description,
  actions,
  iconColor = 'var(--primary)',
  iconGradientFrom = 'var(--primary-lighter)',
  iconGradientTo = 'var(--accent-lighter)',
}: PageHeaderProps) {
  return (
    <div 
      style={{
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'space-between',
        gap: 'var(--space-4)',
        marginBottom: 'var(--space-5)',
        paddingBottom: 'var(--space-4)',
        borderBottom: '1px solid var(--border)',
      }}
    >
      <div style={{ display: 'flex', gap: 'var(--space-3)', alignItems: 'flex-start', flex: 1 }}>
        {/* Icon compact */}
        <div 
          style={{
            width: '40px',
            height: '40px',
            borderRadius: 'var(--radius-md)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: `linear-gradient(135deg, ${iconGradientFrom} 0%, ${iconGradientTo} 100%)`,
            border: '1px solid rgba(255, 255, 255, 0.5)',
            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.06)',
            flexShrink: 0,
          }}
        >
          <Icon style={{ width: '20px', height: '20px', color: iconColor }} />
        </div>

        {/* Texte stack très serré */}
        <div style={{ flex: 1, minWidth: 0 }}>
          <h1 
            style={{ 
              fontFamily: 'var(--font-display)',
              fontSize: 'var(--text-2xl)',
              fontWeight: 'var(--font-weight-bold)',
              color: 'var(--foreground)',
              lineHeight: 'var(--leading-tight)',
              margin: 0,
              marginBottom: 'var(--space-1)',
            }}
          >
            {title}
          </h1>
          <p 
            style={{ 
              fontFamily: 'var(--font-body)',
              fontSize: 'var(--text-base)',
              fontWeight: 'var(--font-weight-medium)',
              color: 'var(--foreground)',
              lineHeight: 'var(--leading-normal)',
              margin: 0,
            }}
          >
            {description}
          </p>
        </div>
      </div>

      {actions && (
        <div style={{ display: 'flex', gap: 'var(--space-3)', flexShrink: 0 }}>
          {actions}
        </div>
      )}
    </div>
  );
}

/**
 * ✅ PROPOSITION 3 - Vertical badge + Titre XXL
 * Icon badge au-dessus, titre 4xl, description base
 * Spacing très contrôlé
 */
export function PageHeader3({
  icon: Icon,
  title,
  description,
  actions,
  iconColor = 'var(--primary)',
  iconGradientFrom = 'var(--primary-lighter)',
  iconGradientTo = 'var(--accent-lighter)',
}: PageHeaderProps) {
  return (
    <div 
      style={{
        marginBottom: 'var(--space-5)',
        paddingBottom: 'var(--space-4)',
        borderBottom: '1px solid var(--border)',
      }}
    >
      {/* Icon badge */}
      <div 
        style={{
          width: '44px',
          height: '44px',
          borderRadius: 'var(--radius-lg)',
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: `linear-gradient(135deg, ${iconGradientFrom} 0%, ${iconGradientTo} 100%)`,
          border: '1px solid rgba(255, 255, 255, 0.5)',
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)',
          marginBottom: 'var(--space-2)',
        }}
      >
        <Icon style={{ width: '22px', height: '22px', color: iconColor }} />
      </div>

      {/* Titre + Actions row */}
      <div 
        style={{
          display: 'flex',
          alignItems: 'flex-start',
          justifyContent: 'space-between',
          gap: 'var(--space-4)',
          marginBottom: 'var(--space-2)', // Spacing minimal
        }}
      >
        <h1 
          style={{ 
            fontFamily: 'var(--font-display)',
            fontSize: 'var(--text-4xl)',
            fontWeight: 'var(--font-weight-bold)',
            color: 'var(--foreground)',
            lineHeight: 'var(--leading-tight)',
            margin: 0,
            flex: 1,
          }}
        >
          {title}
        </h1>

        {actions && (
          <div style={{ display: 'flex', gap: 'var(--space-3)', flexShrink: 0 }}>
            {actions}
          </div>
        )}
      </div>

      {/* Description */}
      <p 
        style={{ 
          fontFamily: 'var(--font-body)',
          fontSize: 'var(--text-base)',
          fontWeight: 'var(--font-weight-medium)',
          color: 'var(--neutral-700)',
          lineHeight: 'var(--leading-normal)',
          margin: 0,
          maxWidth: '700px',
        }}
      >
        {description}
      </p>
    </div>
  );
}

/**
 * ✅ PROPOSITION 4 - Icon + Titre inline, Desc dessous alignée
 * Hiérarchie claire : Titre 3xl + Desc sm
 * Icon 52px, description alignée avec titre
 */
export function PageHeader4({
  icon: Icon,
  title,
  description,
  actions,
  iconColor = 'var(--primary)',
  iconGradientFrom = 'var(--primary-lighter)',
  iconGradientTo = 'var(--accent-lighter)',
}: PageHeaderProps) {
  const iconSize = 52;
  const iconGap = 16; // var(--space-4)

  return (
    <div 
      style={{
        marginBottom: 'var(--space-5)',
        paddingBottom: 'var(--space-4)',
        borderBottom: '1px solid var(--border)',
      }}
    >
      {/* Top: Icon + Titre + Actions */}
      <div 
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 'var(--space-4)',
          marginBottom: 'var(--space-1)',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-4)' }}>
          {/* Icon */}
          <div 
            style={{
              width: `${iconSize}px`,
              height: `${iconSize}px`,
              borderRadius: 'var(--radius-lg)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              background: `linear-gradient(135deg, ${iconGradientFrom} 0%, ${iconGradientTo} 100%)`,
              border: '1px solid rgba(255, 255, 255, 0.5)',
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)',
              flexShrink: 0,
            }}
          >
            <Icon style={{ width: '26px', height: '26px', color: iconColor }} />
          </div>

          {/* Titre */}
          <h1 
            style={{ 
              fontFamily: 'var(--font-display)',
              fontSize: 'var(--text-3xl)',
              fontWeight: 'var(--font-weight-bold)',
              color: 'var(--foreground)',
              lineHeight: 'var(--leading-tight)',
              margin: 0,
            }}
          >
            {title}
          </h1>
        </div>

        {actions && (
          <div style={{ display: 'flex', gap: 'var(--space-3)', flexShrink: 0 }}>
            {actions}
          </div>
        )}
      </div>

      {/* Description alignée avec titre */}
      <p 
        style={{ 
          fontFamily: 'var(--font-body)',
          fontSize: 'var(--text-sm)',
          fontWeight: 'var(--font-weight-medium)',
          color: 'var(--foreground)',
          lineHeight: 'var(--leading-normal)',
          margin: 0,
          marginLeft: `${iconSize + iconGap}px`, // Aligné avec le titre
        }}
      >
        {description}
      </p>
    </div>
  );
}

/**
 * ✅ PROPOSITION 5 - Minimaliste ultra-compact
 * Icon 36px, Titre 2xl, Desc xs
 * Maximum densité, minimum spacing
 */
export function PageHeader5({
  icon: Icon,
  title,
  description,
  actions,
  iconColor = 'var(--primary)',
  iconGradientFrom = 'var(--primary-lighter)',
  iconGradientTo = 'var(--accent-lighter)',
}: PageHeaderProps) {
  return (
    <div 
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 'var(--space-4)',
        marginBottom: 'var(--space-6)',
        paddingBottom: 'var(--space-4)',
        borderBottom: '1px solid var(--border)',
      }}
    >
      <div style={{ display: 'flex', gap: 'var(--space-3)', alignItems: 'center', flex: 1 }}>
        {/* Icon mini */}
        <div 
          style={{
            width: '36px',
            height: '36px',
            borderRadius: 'var(--radius-md)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: `linear-gradient(135deg, ${iconGradientFrom} 0%, ${iconGradientTo} 100%)`,
            border: '1px solid rgba(255, 255, 255, 0.5)',
            boxShadow: '0 2px 6px rgba(0, 0, 0, 0.06)',
            flexShrink: 0,
          }}
        >
          <Icon style={{ width: '18px', height: '18px', color: iconColor }} />
        </div>

        {/* Texte inline très compact */}
        <div style={{ flex: 1, minWidth: 0 }}>
          <h1 
            style={{ 
              fontFamily: 'var(--font-display)',
              fontSize: 'var(--text-2xl)',
              fontWeight: 'var(--font-weight-bold)',
              color: 'var(--foreground)',
              lineHeight: 'var(--leading-tight)',
              margin: 0,
              marginBottom: '2px',
            }}
          >
            {title}
          </h1>
          <p 
            style={{ 
              fontFamily: 'var(--font-body)',
              fontSize: 'var(--text-xs)',
              fontWeight: 'var(--font-weight-medium)',
              color: 'var(--neutral-700)',
              lineHeight: 'var(--leading-normal)',
              margin: 0,
            }}
          >
            {description}
          </p>
        </div>
      </div>

      {actions && (
        <div style={{ display: 'flex', gap: 'var(--space-2)', flexShrink: 0 }}>
          {actions}
        </div>
      )}
    </div>
  );
}
