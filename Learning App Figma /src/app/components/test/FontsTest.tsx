/**
 * FONTS TEST - Vérification du chargement des Google Fonts
 * 
 * Affiche League Spartan et Nunito pour vérifier visuellement
 * que les fonts se chargent correctement depuis Google Fonts
 */

export default function FontsTest() {
  return (
    <div style={{
      padding: 'var(--space-8)',
      background: 'var(--background)',
      minHeight: '100vh'
    }}>
      
      {/* Header */}
      <div style={{ marginBottom: 'var(--space-8)' }}>
        <h1 style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'var(--text-4xl)',
          fontWeight: 'var(--font-extrabold)',
          color: 'var(--foreground)',
          marginBottom: 'var(--space-2)'
        }}>
          Test Google Fonts
        </h1>
        <p style={{
          fontFamily: 'var(--font-body)',
          fontSize: 'var(--text-base)',
          color: 'var(--muted-foreground)'
        }}>
          Vérification du chargement de League Spartan et Nunito
        </p>
      </div>

      {/* League Spartan Test */}
      <div style={{
        padding: 'var(--space-6)',
        background: 'var(--card)',
        borderRadius: 'var(--radius-lg)',
        border: '1px solid var(--border)',
        marginBottom: 'var(--space-6)'
      }}>
        <h2 style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'var(--text-2xl)',
          fontWeight: 'var(--font-bold)',
          marginBottom: 'var(--space-4)',
          color: 'var(--primary)'
        }}>
          League Spartan (Display/Headings)
        </h2>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
          {/* Différents poids */}
          <div>
            <div style={{ 
              fontSize: 'var(--text-xs)', 
              color: 'var(--muted-foreground)',
              marginBottom: 'var(--space-2)',
              fontFamily: 'var(--font-body)'
            }}>
              Light (300)
            </div>
            <div style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'var(--text-xl)',
              fontWeight: 'var(--font-light)',
              color: 'var(--foreground)'
            }}>
              The quick brown fox jumps over the lazy dog
            </div>
          </div>

          <div>
            <div style={{ 
              fontSize: 'var(--text-xs)', 
              color: 'var(--muted-foreground)',
              marginBottom: 'var(--space-2)',
              fontFamily: 'var(--font-body)'
            }}>
              Regular (400)
            </div>
            <div style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'var(--text-xl)',
              fontWeight: 'var(--font-regular)',
              color: 'var(--foreground)'
            }}>
              The quick brown fox jumps over the lazy dog
            </div>
          </div>

          <div>
            <div style={{ 
              fontSize: 'var(--text-xs)', 
              color: 'var(--muted-foreground)',
              marginBottom: 'var(--space-2)',
              fontFamily: 'var(--font-body)'
            }}>
              Semibold (600)
            </div>
            <div style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'var(--text-xl)',
              fontWeight: 'var(--font-semibold)',
              color: 'var(--foreground)'
            }}>
              The quick brown fox jumps over the lazy dog
            </div>
          </div>

          <div>
            <div style={{ 
              fontSize: 'var(--text-xs)', 
              color: 'var(--muted-foreground)',
              marginBottom: 'var(--space-2)',
              fontFamily: 'var(--font-body)'
            }}>
              Bold (700)
            </div>
            <div style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'var(--text-xl)',
              fontWeight: 'var(--font-bold)',
              color: 'var(--foreground)'
            }}>
              The quick brown fox jumps over the lazy dog
            </div>
          </div>

          <div>
            <div style={{ 
              fontSize: 'var(--text-xs)', 
              color: 'var(--muted-foreground)',
              marginBottom: 'var(--space-2)',
              fontFamily: 'var(--font-body)'
            }}>
              Extrabold (800)
            </div>
            <div style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'var(--text-xl)',
              fontWeight: 'var(--font-extrabold)',
              color: 'var(--foreground)'
            }}>
              The quick brown fox jumps over the lazy dog
            </div>
          </div>
        </div>
      </div>

      {/* Nunito Test */}
      <div style={{
        padding: 'var(--space-6)',
        background: 'var(--card)',
        borderRadius: 'var(--radius-lg)',
        border: '1px solid var(--border)',
        marginBottom: 'var(--space-6)'
      }}>
        <h2 style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'var(--text-2xl)',
          fontWeight: 'var(--font-bold)',
          marginBottom: 'var(--space-4)',
          color: 'var(--secondary)'
        }}>
          Nunito (Body)
        </h2>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
          {/* Différents poids */}
          <div>
            <div style={{ 
              fontSize: 'var(--text-xs)', 
              color: 'var(--muted-foreground)',
              marginBottom: 'var(--space-2)',
              fontFamily: 'var(--font-body)'
            }}>
              Light (300)
            </div>
            <div style={{
              fontFamily: 'var(--font-body)',
              fontSize: 'var(--text-base)',
              fontWeight: 'var(--font-light)',
              color: 'var(--foreground)'
            }}>
              The quick brown fox jumps over the lazy dog
            </div>
          </div>

          <div>
            <div style={{ 
              fontSize: 'var(--text-xs)', 
              color: 'var(--muted-foreground)',
              marginBottom: 'var(--space-2)',
              fontFamily: 'var(--font-body)'
            }}>
              Regular (400)
            </div>
            <div style={{
              fontFamily: 'var(--font-body)',
              fontSize: 'var(--text-base)',
              fontWeight: 'var(--font-regular)',
              color: 'var(--foreground)'
            }}>
              The quick brown fox jumps over the lazy dog
            </div>
          </div>

          <div>
            <div style={{ 
              fontSize: 'var(--text-xs)', 
              color: 'var(--muted-foreground)',
              marginBottom: 'var(--space-2)',
              fontFamily: 'var(--font-body)'
            }}>
              Medium (500)
            </div>
            <div style={{
              fontFamily: 'var(--font-body)',
              fontSize: 'var(--text-base)',
              fontWeight: 'var(--font-medium)',
              color: 'var(--foreground)'
            }}>
              The quick brown fox jumps over the lazy dog
            </div>
          </div>

          <div>
            <div style={{ 
              fontSize: 'var(--text-xs)', 
              color: 'var(--muted-foreground)',
              marginBottom: 'var(--space-2)',
              fontFamily: 'var(--font-body)'
            }}>
              Semibold (600)
            </div>
            <div style={{
              fontFamily: 'var(--font-body)',
              fontSize: 'var(--text-base)',
              fontWeight: 'var(--font-semibold)',
              color: 'var(--foreground)'
            }}>
              The quick brown fox jumps over the lazy dog
            </div>
          </div>

          <div>
            <div style={{ 
              fontSize: 'var(--text-xs)', 
              color: 'var(--muted-foreground)',
              marginBottom: 'var(--space-2)',
              fontFamily: 'var(--font-body)'
            }}>
              Bold (700)
            </div>
            <div style={{
              fontFamily: 'var(--font-body)',
              fontSize: 'var(--text-base)',
              fontWeight: 'var(--font-bold)',
              color: 'var(--foreground)'
            }}>
              The quick brown fox jumps over the lazy dog
            </div>
          </div>

          <div>
            <div style={{ 
              fontSize: 'var(--text-xs)', 
              color: 'var(--muted-foreground)',
              marginBottom: 'var(--space-2)',
              fontFamily: 'var(--font-body)'
            }}>
              Italic Regular
            </div>
            <div style={{
              fontFamily: 'var(--font-body)',
              fontSize: 'var(--text-base)',
              fontWeight: 'var(--font-regular)',
              fontStyle: 'italic',
              color: 'var(--foreground)'
            }}>
              The quick brown fox jumps over the lazy dog
            </div>
          </div>

          <div>
            <div style={{ 
              fontSize: 'var(--text-xs)', 
              color: 'var(--muted-foreground)',
              marginBottom: 'var(--space-2)',
              fontFamily: 'var(--font-body)'
            }}>
              Italic Bold
            </div>
            <div style={{
              fontFamily: 'var(--font-body)',
              fontSize: 'var(--text-base)',
              fontWeight: 'var(--font-bold)',
              fontStyle: 'italic',
              color: 'var(--foreground)'
            }}>
              The quick brown fox jumps over the lazy dog
            </div>
          </div>
        </div>
      </div>

      {/* Usage Examples */}
      <div style={{
        padding: 'var(--space-6)',
        background: 'var(--card)',
        borderRadius: 'var(--radius-lg)',
        border: '1px solid var(--border)'
      }}>
        <h2 style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'var(--text-2xl)',
          fontWeight: 'var(--font-bold)',
          marginBottom: 'var(--space-4)',
          color: 'var(--success-solid)'
        }}>
          Exemples d'Usage
        </h2>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)' }}>
          
          {/* Hero Example */}
          <div>
            <div style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'var(--text-5xl)',
              fontWeight: 'var(--font-extrabold)',
              color: 'var(--foreground)',
              marginBottom: 'var(--space-2)'
            }}>
              Bienvenue sur The Learning Society
            </div>
            <p style={{
              fontFamily: 'var(--font-body)',
              fontSize: 'var(--text-lg)',
              color: 'var(--muted-foreground)',
              lineHeight: 'var(--leading-relaxed)'
            }}>
              Votre plateforme d'apprentissage SaaS avec design ultra-moderne
            </p>
          </div>

          {/* Card Example */}
          <div style={{
            padding: 'var(--space-4)',
            background: 'var(--muted)',
            borderRadius: 'var(--radius-md)'
          }}>
            <h3 style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'var(--text-xl)',
              fontWeight: 'var(--font-bold)',
              color: 'var(--foreground)',
              marginBottom: 'var(--space-2)'
            }}>
              Titre de Card
            </h3>
            <p style={{
              fontFamily: 'var(--font-body)',
              fontSize: 'var(--text-base)',
              color: 'var(--muted-foreground)',
              lineHeight: 'var(--leading-relaxed)',
              marginBottom: 'var(--space-3)'
            }}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
              Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>
            <button style={{
              padding: 'var(--space-2) var(--space-4)',
              background: 'var(--primary)',
              color: '#ffffff',
              fontFamily: 'var(--font-body)',
              fontSize: 'var(--text-base)',
              fontWeight: 'var(--font-semibold)',
              borderRadius: 'var(--radius-md)',
              border: 'none',
              cursor: 'pointer'
            }}>
              En savoir plus
            </button>
          </div>
        </div>
      </div>

      {/* Info */}
      <div style={{
        marginTop: 'var(--space-6)',
        padding: 'var(--space-4)',
        background: 'var(--color-primary-50)',
        borderLeft: '4px solid var(--primary)',
        borderRadius: 'var(--radius-md)',
        fontFamily: 'var(--font-body)',
        fontSize: 'var(--text-sm)',
        color: 'var(--color-primary-800)'
      }}>
        <strong>✅ Si les fonts s'affichent correctement :</strong>
        <ul style={{ marginTop: 'var(--space-2)', paddingLeft: 'var(--space-5)' }}>
          <li>League Spartan : Lettres géométriques et modernes avec angles nets</li>
          <li>Nunito : Lettres rondes et lisibles avec courbes douces</li>
        </ul>
        <div style={{ marginTop: 'var(--space-2)' }}>
          <strong>❌ Si les fonts ne se chargent pas :</strong>
          <br />
          Vérifier la console (F12) pour des erreurs CORS ou de chargement
        </div>
      </div>

    </div>
  );
}
