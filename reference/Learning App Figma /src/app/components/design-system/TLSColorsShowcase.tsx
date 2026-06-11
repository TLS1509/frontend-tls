import { Palette, Droplet } from 'lucide-react';

/**
 * TLS COLORS SHOWCASE
 * Affichage visuel de toutes les couleurs du design system TLS
 */

interface ColorSwatchProps {
  name: string;
  variable: string;
  hex?: string;
  description?: string;
}

function ColorSwatch({ name, variable, hex, description }: ColorSwatchProps) {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      gap: 'var(--space-2)',
    }}>
      <div style={{
        width: '100%',
        height: '80px',
        borderRadius: 'var(--radius-lg)',
        background: `var(${variable})`,
        border: '1px solid rgba(0, 0, 0, 0.1)',
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
        position: 'relative',
        overflow: 'hidden',
      }}>
        {/* Shine effect */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: '-50%',
          width: '200%',
          height: '100%',
          background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)',
          animation: 'shine 3s ease-in-out infinite',
        }} />
      </div>
      <div>
        <p style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'var(--text-sm)',
          fontWeight: 'var(--font-weight-bold)',
          color: 'var(--foreground)',
        }}>
          {name}
        </p>
        <p style={{
          fontFamily: 'monospace',
          fontSize: 'var(--text-xs)',
          color: 'var(--muted-foreground)',
        }}>
          var({variable})
        </p>
        {hex && (
          <p style={{
            fontFamily: 'monospace',
            fontSize: 'var(--text-xs)',
            color: 'var(--muted-foreground)',
          }}>
            {hex}
          </p>
        )}
        {description && (
          <p style={{
            fontFamily: 'var(--font-body)',
            fontSize: 'var(--text-xs)',
            color: 'var(--muted-foreground)',
            marginTop: 'var(--space-1)',
          }}>
            {description}
          </p>
        )}
      </div>

      <style>{`
        @keyframes shine {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
      `}</style>
    </div>
  );
}

export function TLSColorsShowcase() {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      gap: 'var(--space-8)',
    }}>
      {/* Header */}
      <div style={{
        textAlign: 'center',
        padding: 'var(--space-6)',
        borderRadius: 'var(--radius-xl)',
        background: 'linear-gradient(135deg, #55A1B4 0%, #ED843A 100%)',
      }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 'var(--space-3)',
          marginBottom: 'var(--space-2)',
        }}>
          <Palette className="w-8 h-8" style={{ color: 'white' }} />
          <h2 style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'var(--text-3xl)',
            fontWeight: 'var(--font-weight-black)',
            color: 'white',
          }}>
            TLS Color System
          </h2>
        </div>
        <p style={{
          fontFamily: 'var(--font-body)',
          fontSize: 'var(--text-base)',
          color: 'rgba(255, 255, 255, 0.9)',
        }}>
          Toutes les couleurs du design system The Learning Society
        </p>
      </div>

      {/* Brand Colors */}
      <div>
        <h3 style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'var(--text-xl)',
          fontWeight: 'var(--font-weight-bold)',
          color: 'var(--foreground)',
          marginBottom: 'var(--space-4)',
          display: 'flex',
          alignItems: 'center',
          gap: 'var(--space-2)',
        }}>
          <Droplet className="w-6 h-6" style={{ color: '#55A1B4' }} />
          Brand Colors - TLS Identity
        </h3>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))',
          gap: 'var(--space-4)',
        }}>
          <ColorSwatch
            name="Primary"
            variable="--primary"
            hex="#55A1B4"
            description="Bleu principal TLS"
          />
          <ColorSwatch
            name="Primary Hover"
            variable="--primary-hover"
            hex="#4A8FA1"
            description="État hover"
          />
          <ColorSwatch
            name="Primary Light"
            variable="--primary-light"
            hex="#7BC4D4"
            description="Version claire"
          />
          <ColorSwatch
            name="Primary Lighter"
            variable="--primary-lighter"
            hex="#E8F4F7"
            description="Version très claire"
          />
        </div>
      </div>

      {/* Secondary Colors */}
      <div>
        <h3 style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'var(--text-xl)',
          fontWeight: 'var(--font-weight-bold)',
          color: 'var(--foreground)',
          marginBottom: 'var(--space-4)',
          display: 'flex',
          alignItems: 'center',
          gap: 'var(--space-2)',
        }}>
          <Droplet className="w-6 h-6" style={{ color: '#ED843A' }} />
          Secondary Orange
        </h3>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))',
          gap: 'var(--space-4)',
        }}>
          <ColorSwatch
            name="Secondary"
            variable="--secondary"
            hex="#ED843A"
            description="Orange principal"
          />
          <ColorSwatch
            name="Secondary Hover"
            variable="--secondary-hover"
            hex="#C06920"
            description="État hover"
          />
          <ColorSwatch
            name="Secondary Light"
            variable="--secondary-light"
            hex="#F5A868"
            description="Version claire"
          />
          <ColorSwatch
            name="Secondary Lighter"
            variable="--secondary-lighter"
            hex="#FFF4E6"
            description="Version très claire"
          />
        </div>
      </div>

      {/* Accent Colors */}
      <div>
        <h3 style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'var(--text-xl)',
          fontWeight: 'var(--font-weight-bold)',
          color: 'var(--foreground)',
          marginBottom: 'var(--space-4)',
          display: 'flex',
          alignItems: 'center',
          gap: 'var(--space-2)',
        }}>
          <Droplet className="w-6 h-6" style={{ color: '#F8B044' }} />
          Accent Yellow
        </h3>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))',
          gap: 'var(--space-4)',
        }}>
          <ColorSwatch
            name="Accent"
            variable="--accent"
            hex="#F8B044"
            description="Jaune accent"
          />
          <ColorSwatch
            name="Accent Hover"
            variable="--accent-hover"
            hex="#E69F2F"
            description="État hover"
          />
          <ColorSwatch
            name="Accent Light"
            variable="--accent-light"
            hex="#FBC46C"
            description="Version claire"
          />
          <ColorSwatch
            name="Accent Lighter"
            variable="--accent-lighter"
            hex="#FFF9E6"
            description="Version très claire"
          />
        </div>
      </div>

      {/* Semantic Colors */}
      <div>
        <h3 style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'var(--text-xl)',
          fontWeight: 'var(--font-weight-bold)',
          color: 'var(--foreground)',
          marginBottom: 'var(--space-4)',
        }}>
          Semantic Colors
        </h3>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))',
          gap: 'var(--space-4)',
        }}>
          <ColorSwatch
            name="Success"
            variable="--success"
            description="Actions positives"
          />
          <ColorSwatch
            name="Warning"
            variable="--warning"
            description="Avertissements"
          />
          <ColorSwatch
            name="Destructive"
            variable="--destructive"
            description="Actions destructives"
          />
          <ColorSwatch
            name="Info"
            variable="--info"
            description="Informations"
          />
        </div>
      </div>

      {/* Gradients Preview */}
      <div>
        <h3 style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'var(--text-xl)',
          fontWeight: 'var(--font-weight-bold)',
          color: 'var(--foreground)',
          marginBottom: 'var(--space-4)',
        }}>
          TLS Gradients
        </h3>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
          gap: 'var(--space-4)',
        }}>
          {[
            { name: 'Primary', variable: '--gradient-primary' },
            { name: 'Secondary', variable: '--gradient-secondary' },
            { name: 'Warm', variable: '--gradient-warm' },
            { name: 'Brand', variable: '--gradient-brand' },
            { name: 'TLS Diagonal', variable: '--gradient-tls' },
            { name: 'TLS Horizontal', variable: '--gradient-tls-horizontal' },
          ].map((gradient) => (
            <div key={gradient.name}>
              <div style={{
                width: '100%',
                height: '100px',
                borderRadius: 'var(--radius-lg)',
                background: `var(${gradient.variable})`,
                boxShadow: '0 4px 16px rgba(0, 0, 0, 0.1)',
                marginBottom: 'var(--space-2)',
              }} />
              <p style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'var(--text-sm)',
                fontWeight: 'var(--font-weight-bold)',
                color: 'var(--foreground)',
              }}>
                {gradient.name}
              </p>
              <p style={{
                fontFamily: 'monospace',
                fontSize: 'var(--text-xs)',
                color: 'var(--muted-foreground)',
              }}>
                var({gradient.variable})
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Usage Example */}
      <div style={{
        padding: 'var(--space-6)',
        borderRadius: 'var(--radius-xl)',
        background: 'rgba(85, 161, 180, 0.05)',
        border: '1px solid rgba(85, 161, 180, 0.2)',
      }}>
        <h4 style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'var(--text-base)',
          fontWeight: 'var(--font-weight-bold)',
          color: 'var(--foreground)',
          marginBottom: 'var(--space-3)',
        }}>
          💡 Usage CSS
        </h4>
        <pre style={{
          fontFamily: 'monospace',
          fontSize: 'var(--text-sm)',
          color: 'var(--muted-foreground)',
          background: 'rgba(0, 0, 0, 0.02)',
          padding: 'var(--space-4)',
          borderRadius: 'var(--radius-md)',
          overflowX: 'auto',
        }}>
{`/* Utilisation des couleurs */
.button-primary {
  background: var(--primary);
  color: var(--primary-foreground);
}

.button-primary:hover {
  background: var(--primary-hover);
}

/* Utilisation des gradients */
.hero-section {
  background: var(--gradient-tls);
}

.cta-button {
  background: var(--gradient-warm);
}`}
        </pre>
      </div>
    </div>
  );
}
