/**
 * FONTS SHOWCASE - Démonstration rapide des fonts
 * 
 * Montre League Spartan (headings) et Nunito (body)
 * dans un contexte réel d'utilisation
 */

export default function FontsShowcase() {
  return (
    <div style={{
      maxWidth: '1200px',
      margin: '0 auto',
      padding: 'var(--space-8)'
    }}>
      
      {/* Hero avec League Spartan */}
      <div style={{
        textAlign: 'center',
        marginBottom: 'var(--space-12)',
        padding: 'var(--space-12)',
        background: 'linear-gradient(135deg, var(--primary) 0%, var(--secondary) 100%)',
        borderRadius: 'var(--radius-2xl)',
        color: '#ffffff'
      }}>
        <h1 style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'var(--text-5xl)',
          fontWeight: 'var(--font-extrabold)',
          marginBottom: 'var(--space-4)',
          lineHeight: 'var(--leading-tight)'
        }}>
          The Learning Society
        </h1>
        
        <p style={{
          fontFamily: 'var(--font-body)',
          fontSize: 'var(--text-xl)',
          fontWeight: 'var(--font-regular)',
          opacity: 0.95,
          lineHeight: 'var(--leading-relaxed)',
          maxWidth: '600px',
          margin: '0 auto'
        }}>
          Votre plateforme d'apprentissage SaaS avec design ultra-moderne,
          typographie professionnelle et expérience utilisateur exceptionnelle.
        </p>
      </div>

      {/* Cards Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
        gap: 'var(--space-6)',
        marginBottom: 'var(--space-8)'
      }}>
        
        {/* Card 1 */}
        <div style={{
          padding: 'var(--space-6)',
          background: 'var(--card)',
          borderRadius: 'var(--radius-lg)',
          border: '1px solid var(--border)'
        }}>
          <div style={{
            width: '48px',
            height: '48px',
            background: 'var(--primary)',
            borderRadius: 'var(--radius-md)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 'var(--text-2xl)',
            marginBottom: 'var(--space-4)'
          }}>
            📚
          </div>
          
          <h3 style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'var(--text-xl)',
            fontWeight: 'var(--font-bold)',
            color: 'var(--foreground)',
            marginBottom: 'var(--space-2)'
          }}>
            Parcours Structurés
          </h3>
          
          <p style={{
            fontFamily: 'var(--font-body)',
            fontSize: 'var(--text-base)',
            color: 'var(--muted-foreground)',
            lineHeight: 'var(--leading-relaxed)',
            marginBottom: 'var(--space-4)'
          }}>
            Apprenez à votre rythme avec des parcours hiérarchiques 
            organisés en étapes et leçons progressives.
          </p>
          
          <button style={{
            width: '100%',
            padding: 'var(--space-3) var(--space-4)',
            background: 'var(--primary)',
            color: '#ffffff',
            fontFamily: 'var(--font-body)',
            fontSize: 'var(--text-base)',
            fontWeight: 'var(--font-semibold)',
            borderRadius: 'var(--radius-md)',
            border: 'none',
            cursor: 'pointer'
          }}>
            Découvrir
          </button>
        </div>

        {/* Card 2 */}
        <div style={{
          padding: 'var(--space-6)',
          background: 'var(--card)',
          borderRadius: 'var(--radius-lg)',
          border: '1px solid var(--border)'
        }}>
          <div style={{
            width: '48px',
            height: '48px',
            background: 'var(--secondary)',
            borderRadius: 'var(--radius-md)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 'var(--text-2xl)',
            marginBottom: 'var(--space-4)'
          }}>
            🎯
          </div>
          
          <h3 style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'var(--text-xl)',
            fontWeight: 'var(--font-bold)',
            color: 'var(--foreground)',
            marginBottom: 'var(--space-2)'
          }}>
            Coaching Personnel
          </h3>
          
          <p style={{
            fontFamily: 'var(--font-body)',
            fontSize: 'var(--text-base)',
            color: 'var(--muted-foreground)',
            lineHeight: 'var(--leading-relaxed)',
            marginBottom: 'var(--space-4)'
          }}>
            Réservez des sessions 1-to-1 avec des experts 
            pour accélérer votre progression.
          </p>
          
          <button style={{
            width: '100%',
            padding: 'var(--space-3) var(--space-4)',
            background: 'var(--secondary)',
            color: '#ffffff',
            fontFamily: 'var(--font-body)',
            fontSize: 'var(--text-base)',
            fontWeight: 'var(--font-semibold)',
            borderRadius: 'var(--radius-md)',
            border: 'none',
            cursor: 'pointer'
          }}>
            Réserver
          </button>
        </div>

        {/* Card 3 */}
        <div style={{
          padding: 'var(--space-6)',
          background: 'var(--card)',
          borderRadius: 'var(--radius-lg)',
          border: '1px solid var(--border)'
        }}>
          <div style={{
            width: '48px',
            height: '48px',
            background: 'var(--success-solid)',
            borderRadius: 'var(--radius-md)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 'var(--text-2xl)',
            marginBottom: 'var(--space-4)'
          }}>
            🏆
          </div>
          
          <h3 style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'var(--text-xl)',
            fontWeight: 'var(--font-bold)',
            color: 'var(--foreground)',
            marginBottom: 'var(--space-2)'
          }}>
            Gamification
          </h3>
          
          <p style={{
            fontFamily: 'var(--font-body)',
            fontSize: 'var(--text-base)',
            color: 'var(--muted-foreground)',
            lineHeight: 'var(--leading-relaxed)',
            marginBottom: 'var(--space-4)'
          }}>
            Gagnez des badges, montez de niveau et suivez 
            votre progression avec des statistiques détaillées.
          </p>
          
          <button style={{
            width: '100%',
            padding: 'var(--space-3) var(--space-4)',
            background: 'var(--success-solid)',
            color: 'var(--success-solid-foreground)',
            fontFamily: 'var(--font-body)',
            fontSize: 'var(--text-base)',
            fontWeight: 'var(--font-semibold)',
            borderRadius: 'var(--radius-md)',
            border: 'none',
            cursor: 'pointer'
          }}>
            Voir mes badges
          </button>
        </div>
      </div>

      {/* Typography Scale Demo */}
      <div style={{
        padding: 'var(--space-8)',
        background: 'var(--card)',
        borderRadius: 'var(--radius-xl)',
        border: '1px solid var(--border)'
      }}>
        <h2 style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'var(--text-3xl)',
          fontWeight: 'var(--font-bold)',
          color: 'var(--foreground)',
          marginBottom: 'var(--space-6)',
          textAlign: 'center'
        }}>
          Échelle Typographique
        </h2>

        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: 'var(--space-4)'
        }}>
          
          {/* Headings */}
          <div>
            <div style={{
              fontFamily: 'var(--font-body)',
              fontSize: 'var(--text-sm)',
              color: 'var(--muted-foreground)',
              marginBottom: 'var(--space-2)',
              fontWeight: 'var(--font-medium)'
            }}>
              League Spartan - Headings
            </div>
            
            <h1 style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'var(--text-4xl)',
              fontWeight: 'var(--font-extrabold)',
              color: 'var(--foreground)',
              marginBottom: 'var(--space-2)'
            }}>
              H1 - Titre Principal
            </h1>
            
            <h2 style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'var(--text-3xl)',
              fontWeight: 'var(--font-bold)',
              color: 'var(--foreground)',
              marginBottom: 'var(--space-2)'
            }}>
              H2 - Sous-titre Important
            </h2>
            
            <h3 style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'var(--text-2xl)',
              fontWeight: 'var(--font-bold)',
              color: 'var(--foreground)',
              marginBottom: 'var(--space-2)'
            }}>
              H3 - Section
            </h3>
            
            <h4 style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'var(--text-xl)',
              fontWeight: 'var(--font-semibold)',
              color: 'var(--foreground)'
            }}>
              H4 - Sous-section
            </h4>
          </div>

          <div style={{
            height: '1px',
            background: 'var(--border)',
            margin: 'var(--space-4) 0'
          }} />

          {/* Body Text */}
          <div>
            <div style={{
              fontFamily: 'var(--font-body)',
              fontSize: 'var(--text-sm)',
              color: 'var(--muted-foreground)',
              marginBottom: 'var(--space-2)',
              fontWeight: 'var(--font-medium)'
            }}>
              Nunito - Body Text
            </div>
            
            <p style={{
              fontFamily: 'var(--font-body)',
              fontSize: 'var(--text-lg)',
              fontWeight: 'var(--font-regular)',
              color: 'var(--foreground)',
              lineHeight: 'var(--leading-relaxed)',
              marginBottom: 'var(--space-3)'
            }}>
              <strong style={{ fontWeight: 'var(--font-bold)' }}>Large text (18px)</strong> - 
              Parfait pour les introductions et contenus importants qui nécessitent 
              une excellente lisibilité.
            </p>
            
            <p style={{
              fontFamily: 'var(--font-body)',
              fontSize: 'var(--text-base)',
              fontWeight: 'var(--font-regular)',
              color: 'var(--muted-foreground)',
              lineHeight: 'var(--leading-relaxed)',
              marginBottom: 'var(--space-3)'
            }}>
              <strong style={{ fontWeight: 'var(--font-semibold)', color: 'var(--foreground)' }}>Base text (16px)</strong> - 
              Taille par défaut pour le corps de texte. Nunito offre une lisibilité 
              exceptionnelle grâce à ses formes arrondies et sa hauteur d'x généreuse.
            </p>
            
            <p style={{
              fontFamily: 'var(--font-body)',
              fontSize: 'var(--text-sm)',
              fontWeight: 'var(--font-regular)',
              color: 'var(--muted-foreground)',
              lineHeight: 'var(--leading-normal)'
            }}>
              <strong style={{ fontWeight: 'var(--font-medium)', color: 'var(--foreground)' }}>Small text (14px)</strong> - 
              Utilisé pour les légendes, métadonnées et informations secondaires.
            </p>
          </div>
        </div>
      </div>

      {/* Info Box */}
      <div style={{
        marginTop: 'var(--space-8)',
        padding: 'var(--space-6)',
        background: 'var(--color-primary-50)',
        borderLeft: '4px solid var(--primary)',
        borderRadius: 'var(--radius-lg)'
      }}>
        <h4 style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'var(--text-lg)',
          fontWeight: 'var(--font-bold)',
          color: 'var(--primary)',
          marginBottom: 'var(--space-2)'
        }}>
          ✨ Typographie Professionnelle
        </h4>
        <p style={{
          fontFamily: 'var(--font-body)',
          fontSize: 'var(--text-base)',
          color: 'var(--color-primary-800)',
          lineHeight: 'var(--leading-relaxed)',
          margin: 0
        }}>
          League Spartan pour les titres modernes et impactants, 
          Nunito pour un corps de texte lisible et agréable. 
          Une combinaison parfaite pour une expérience utilisateur optimale.
        </p>
      </div>

    </div>
  );
}
