import { Palette, Sparkles, ExternalLink } from 'lucide-react';

interface DesignSystemQuickAccessProps {
  onNavigate: (page: string) => void;
}

export default function DesignSystemQuickAccess({ onNavigate }: DesignSystemQuickAccessProps) {
  return (
    <div 
      onClick={() => onNavigate('design-system-real')}
      className="group cursor-pointer"
      style={{
        background: 'rgba(85, 161, 180, 0.08)',
        border: '2px solid var(--primary)',
        borderRadius: 'var(--radius-2xl)',
        padding: 'var(--space-6)',
        position: 'relative',
        overflow: 'hidden',
        transition: 'all var(--duration-base) var(--ease-out)',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'translateY(-4px)';
        e.currentTarget.style.boxShadow = '0 12px 32px rgba(85, 161, 180, 0.2)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'translateY(0)';
        e.currentTarget.style.boxShadow = 'none';
      }}
    >
      {/* Sparkle decoration */}
      <div 
        className="absolute top-4 right-4 transition-all duration-300"
        style={{
          opacity: 0.5,
        }}
      >
        <Sparkles className="w-6 h-6" style={{ color: 'var(--primary)' }} />
      </div>

      {/* Icon */}
      <div 
        className="w-14 h-14 rounded-2xl flex items-center justify-center mb-4"
        style={{
          background: 'var(--gradient-primary)',
          boxShadow: '0 8px 24px rgba(85, 161, 180, 0.3)',
        }}
      >
        <Palette className="w-7 h-7 text-white" />
      </div>

      {/* Content */}
      <div className="mb-3">
        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)', marginBottom: 'var(--space-2)' }}>
          <h3 
            style={{
              fontSize: 'var(--text-xl)',
              fontWeight: 'var(--font-weight-bold)',
              fontFamily: 'var(--font-display)',
              color: 'var(--foreground)',
            }}
          >
            Design System
          </h3>
          <span 
            style={{
              background: 'var(--gradient-primary)',
              color: 'white',
              fontSize: 'var(--text-xs)',
              fontWeight: 'var(--font-weight-bold)',
              fontFamily: 'var(--font-body)',
              padding: '2px 8px',
              borderRadius: 'var(--radius-full)',
            }}
          >
            v5.3
          </span>
        </div>
        
        <p 
          style={{
            fontSize: 'var(--text-sm)',
            color: 'var(--muted-foreground)',
            fontFamily: 'var(--font-body)',
            lineHeight: '1.6',
          }}
        >
          Explore 201 design tokens, nouveaux gradients primary, et exemples interactifs
        </p>
      </div>

      {/* Features */}
      <div style={{ display: 'flex', gap: 'var(--space-4)', marginBottom: 'var(--space-4)' }}>
        <div>
          <p 
            style={{
              fontSize: 'var(--text-2xl)',
              fontWeight: 'var(--font-weight-bold)',
              fontFamily: 'var(--font-display)',
              color: 'var(--primary)',
            }}
          >
            201
          </p>
          <p 
            style={{
              fontSize: 'var(--text-xs)',
              color: 'var(--muted-foreground)',
              fontFamily: 'var(--font-body)',
            }}
          >
            Tokens
          </p>
        </div>

        <div>
          <p 
            style={{
              fontSize: 'var(--text-2xl)',
              fontWeight: 'var(--font-weight-bold)',
              fontFamily: 'var(--font-display)',
              color: 'var(--secondary)',
            }}
          >
            3
          </p>
          <p 
            style={{
              fontSize: 'var(--text-xs)',
              color: 'var(--muted-foreground)',
              fontFamily: 'var(--font-body)',
            }}
          >
            Gradients
          </p>
        </div>

        <div>
          <p 
            style={{
              fontSize: 'var(--text-2xl)',
              fontWeight: 'var(--font-weight-bold)',
              fontFamily: 'var(--font-display)',
              color: 'var(--accent)',
            }}
          >
            ∞
          </p>
          <p 
            style={{
              fontSize: 'var(--text-xs)',
              color: 'var(--muted-foreground)',
              fontFamily: 'var(--font-body)',
            }}
          >
            Interactif
          </p>
        </div>
      </div>

      {/* CTA */}
      <div 
        className="flex items-center gap-2"
        style={{
          color: 'var(--primary)',
          fontSize: 'var(--text-sm)',
          fontWeight: 'var(--font-weight-semibold)',
          fontFamily: 'var(--font-body)',
        }}
      >
        Accéder au Design System
        <ExternalLink className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
      </div>
    </div>
  );
}
