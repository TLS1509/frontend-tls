import React from 'react';
import EmojiWaveGlass from '../components/EmojiWaveGlass';
import EmojiWaveInline from '../components/EmojiWaveInline';

export default function EmojiStyleDemo() {
  return (
    <div 
      style={{ 
        minHeight: '100vh',
        background: 'var(--background)',
        padding: 'var(--space-10)',
      }}
    >
      <div 
        style={{ 
          maxWidth: '1000px',
          margin: '0 auto',
        }}
      >
        <h1 
          style={{ 
            fontFamily: 'var(--font-display)',
            fontSize: 'var(--text-4xl)',
            fontWeight: 'var(--font-weight-bold)',
            color: 'var(--foreground)',
            marginBottom: 'var(--space-10)',
            textAlign: 'center',
          }}
        >
          Styles d'Emoji 👋
        </h1>

        <div 
          style={{ 
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))',
            gap: 'var(--space-8)',
          }}
        >
          {/* Style 1: Inline Simple */}
          <div 
            style={{ 
              background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.7) 0%, rgba(255, 255, 255, 0.5) 100%)',
              backdropFilter: 'blur(20px)',
              borderRadius: 'var(--radius-2xl)',
              padding: 'var(--space-8)',
              border: '1px solid rgba(255, 255, 255, 0.9)',
              boxShadow: '0 4px 16px 0 rgba(0, 0, 0, 0.06)',
            }}
          >
            <h2 
              style={{ 
                fontFamily: 'var(--font-display)',
                fontSize: 'var(--text-2xl)',
                fontWeight: 'var(--font-weight-bold)',
                color: 'var(--foreground)',
                marginBottom: 'var(--space-6)',
              }}
            >
              Style Inline
            </h2>

            <div 
              style={{ 
                display: 'flex',
                flexDirection: 'column',
                gap: 'var(--space-6)',
                alignItems: 'center',
              }}
            >
              <EmojiWaveInline />

              <div style={{ textAlign: 'center' }}>
                <h3 
                  style={{ 
                    fontFamily: 'var(--font-display)',
                    fontSize: 'var(--text-lg)',
                    fontWeight: 'var(--font-weight-semibold)',
                    color: 'var(--foreground)',
                    marginBottom: 'var(--space-2)',
                  }}
                >
                  Caractéristiques
                </h3>
                <ul 
                  style={{ 
                    fontFamily: 'var(--font-body)',
                    fontSize: 'var(--text-sm)',
                    color: 'var(--muted-foreground)',
                    textAlign: 'left',
                    lineHeight: 'var(--leading-relaxed)',
                  }}
                >
                  <li>Emoji brut sans container</li>
                  <li>Animation wave rotate simple</li>
                  <li>Parfait pour intégration inline</li>
                  <li>Léger et minimaliste</li>
                  <li>Taille personnalisable</li>
                </ul>
              </div>

              {/* Example Usage */}
              <div 
                style={{ 
                  width: '100%',
                  background: 'rgba(85, 161, 180, 0.05)',
                  borderRadius: 'var(--radius-lg)',
                  padding: 'var(--space-4)',
                }}
              >
                <code 
                  style={{ 
                    fontFamily: 'monospace',
                    fontSize: 'var(--text-xs)',
                    color: 'var(--foreground)',
                    display: 'block',
                  }}
                >
                  {'<EmojiWaveInline />'}
                </code>
              </div>
            </div>
          </div>

          {/* Style 2: 3D Glassmorphism */}
          <div 
            style={{ 
              background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.7) 0%, rgba(255, 255, 255, 0.5) 100%)',
              backdropFilter: 'blur(20px)',
              borderRadius: 'var(--radius-2xl)',
              padding: 'var(--space-8)',
              border: '1px solid rgba(255, 255, 255, 0.9)',
              boxShadow: '0 4px 16px 0 rgba(0, 0, 0, 0.06)',
            }}
          >
            <h2 
              style={{ 
                fontFamily: 'var(--font-display)',
                fontSize: 'var(--text-2xl)',
                fontWeight: 'var(--font-weight-bold)',
                color: 'var(--foreground)',
                marginBottom: 'var(--space-6)',
              }}
            >
              Style 3D Glassmorphism
            </h2>

            <div 
              style={{ 
                display: 'flex',
                flexDirection: 'column',
                gap: 'var(--space-6)',
                alignItems: 'center',
              }}
            >
              <EmojiWaveGlass />

              <div style={{ textAlign: 'center' }}>
                <h3 
                  style={{ 
                    fontFamily: 'var(--font-display)',
                    fontSize: 'var(--text-lg)',
                    fontWeight: 'var(--font-weight-semibold)',
                    color: 'var(--foreground)',
                    marginBottom: 'var(--space-2)',
                  }}
                >
                  Caractéristiques
                </h3>
                <ul 
                  style={{ 
                    fontFamily: 'var(--font-body)',
                    fontSize: 'var(--text-sm)',
                    color: 'var(--muted-foreground)',
                    textAlign: 'left',
                    lineHeight: 'var(--leading-relaxed)',
                  }}
                >
                  <li>Container glassmorphism avec blur</li>
                  <li>Glow effect jaune-orange</li>
                  <li>Border + inset highlight</li>
                  <li>Drop shadow sur emoji</li>
                  <li>Design premium et moderne</li>
                </ul>
              </div>

              {/* Example Usage */}
              <div 
                style={{ 
                  width: '100%',
                  background: 'rgba(85, 161, 180, 0.05)',
                  borderRadius: 'var(--radius-lg)',
                  padding: 'var(--space-4)',
                }}
              >
                <code 
                  style={{ 
                    fontFamily: 'monospace',
                    fontSize: 'var(--text-xs)',
                    color: 'var(--foreground)',
                    display: 'block',
                  }}
                >
                  {'<EmojiWaveGlass />'}
                </code>
              </div>
            </div>
          </div>
        </div>

        {/* Usage Examples */}
        <div 
          style={{ 
            marginTop: 'var(--space-10)',
            background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.7) 0%, rgba(255, 255, 255, 0.5) 100%)',
            backdropFilter: 'blur(20px)',
            borderRadius: 'var(--radius-2xl)',
            padding: 'var(--space-8)',
            border: '1px solid rgba(255, 255, 255, 0.9)',
          }}
        >
          <h2 
            style={{ 
              fontFamily: 'var(--font-display)',
              fontSize: 'var(--text-2xl)',
              fontWeight: 'var(--font-weight-bold)',
              color: 'var(--foreground)',
              marginBottom: 'var(--space-6)',
            }}
          >
            Exemples d'Usage
          </h2>

          <div 
            style={{ 
              display: 'flex',
              flexDirection: 'column',
              gap: 'var(--space-6)',
            }}
          >
            {/* Example 1 */}
            <div>
              <p 
                style={{ 
                  fontFamily: 'var(--font-body)',
                  fontSize: 'var(--text-sm)',
                  color: 'var(--muted-foreground)',
                  marginBottom: 'var(--space-3)',
                }}
              >
                <strong>Inline dans titre :</strong>
              </p>
              <div 
                style={{ 
                  display: 'flex',
                  alignItems: 'center',
                  gap: 'var(--space-3)',
                }}
              >
                <h1 
                  style={{ 
                    fontFamily: 'var(--font-display)',
                    fontSize: 'var(--text-3xl)',
                    fontWeight: 'var(--font-weight-bold)',
                    color: 'var(--foreground)',
                    margin: 0,
                  }}
                >
                  Bienvenue Pierre-Armand
                </h1>
                <EmojiWaveInline />
              </div>
            </div>

            {/* Example 2 */}
            <div>
              <p 
                style={{ 
                  fontFamily: 'var(--font-body)',
                  fontSize: 'var(--text-sm)',
                  color: 'var(--muted-foreground)',
                  marginBottom: 'var(--space-3)',
                }}
              >
                <strong>3D Glass avec titre gradient :</strong>
              </p>
              <div 
                style={{ 
                  display: 'flex',
                  alignItems: 'center',
                  gap: 'var(--space-4)',
                }}
              >
                <h1 
                  style={{ 
                    fontFamily: 'var(--font-display)',
                    fontSize: 'var(--text-3xl)',
                    fontWeight: 'var(--font-weight-bold)',
                    margin: 0,
                    background: 'var(--gradient-tls-text-hero-light)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                  }}
                >
                  Bienvenue Pierre-Armand
                </h1>
                <EmojiWaveGlass />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
