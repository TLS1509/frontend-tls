/**
 * PAGE DE COMPARAISON - Jaune avec Texte Blanc
 * 
 * Démontre les différentes nuances de jaune avec texte blanc
 * pour que tu puisses choisir ta préférence
 */

export default function JauneComparisonPage() {
  return (
    <div style={{
      minHeight: '100vh',
      padding: 'var(--space-8)',
      background: 'var(--background)',
      fontFamily: 'var(--font-body)'
    }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        
        {/* Header */}
        <h1 style={{
          fontSize: 'var(--text-4xl)',
          fontWeight: 'var(--font-bold)',
          marginBottom: 'var(--space-2)',
          color: 'var(--foreground)',
          fontFamily: 'var(--font-display)'
        }}>
          🎨 Comparaison Jaune + Texte Blanc
        </h1>
        
        <p style={{
          fontSize: 'var(--text-lg)',
          color: 'var(--muted-foreground)',
          marginBottom: 'var(--space-8)',
          lineHeight: 1.6
        }}>
          Quelle nuance de jaune préfères-tu pour le texte blanc ? 
          Teste visuellement et choisis ta préférence.
        </p>

        {/* Section 1 : Comparaison Nuances */}
        <section style={{ marginBottom: 'var(--space-12)' }}>
          <h2 style={{
            fontSize: 'var(--text-2xl)',
            fontWeight: 'var(--font-semibold)',
            marginBottom: 'var(--space-6)',
            color: 'var(--foreground)',
            fontFamily: 'var(--font-display)'
          }}>
            1. Comparaison des Nuances (accent-400 à accent-900)
          </h2>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: 'var(--space-4)'
          }}>
            
            {/* accent-400 (Base - NON CONFORME) */}
            <div style={{
              padding: 'var(--space-6)',
              background: 'var(--card)',
              borderRadius: 'var(--radius-lg)',
              border: '2px solid var(--color-accent-400)'
            }}>
              <div style={{
                padding: 'var(--space-4)',
                background: 'var(--color-accent-400)',
                borderRadius: 'var(--radius-md)',
                marginBottom: 'var(--space-4)',
                textAlign: 'center'
              }}>
                <div style={{
                  color: '#ffffff',
                  fontSize: 'var(--text-lg)',
                  fontWeight: 'var(--font-semibold)',
                  marginBottom: 'var(--space-2)'
                }}>
                  ⚠️ Attention
                </div>
                <div style={{
                  color: '#ffffff',
                  fontSize: 'var(--text-base)',
                  fontWeight: 'var(--font-normal)'
                }}>
                  Texte blanc sur jaune clair
                </div>
              </div>
              <div style={{ fontSize: 'var(--text-sm)', color: 'var(--muted-foreground)' }}>
                <strong>accent-400</strong> #F8B044<br/>
                Ratio: 1.74:1 ❌ <strong>NON CONFORME</strong><br/>
                <span style={{ color: 'var(--color-error-600)' }}>✗ Illisible</span>
              </div>
            </div>

            {/* accent-500 */}
            <div style={{
              padding: 'var(--space-6)',
              background: 'var(--card)',
              borderRadius: 'var(--radius-lg)',
              border: '2px solid var(--color-accent-500)'
            }}>
              <div style={{
                padding: 'var(--space-4)',
                background: 'var(--color-accent-500)',
                borderRadius: 'var(--radius-md)',
                marginBottom: 'var(--space-4)',
                textAlign: 'center'
              }}>
                <div style={{
                  color: '#ffffff',
                  fontSize: 'var(--text-lg)',
                  fontWeight: 'var(--font-semibold)',
                  marginBottom: 'var(--space-2)'
                }}>
                  ⚠️ Attention
                </div>
                <div style={{
                  color: '#ffffff',
                  fontSize: 'var(--text-base)',
                  fontWeight: 'var(--font-normal)'
                }}>
                  Texte blanc
                </div>
              </div>
              <div style={{ fontSize: 'var(--text-sm)', color: 'var(--muted-foreground)' }}>
                <strong>accent-500</strong> #DF9E3D<br/>
                Ratio: 2.07:1 ❌ <strong>NON CONFORME</strong><br/>
                <span style={{ color: 'var(--color-error-600)' }}>✗ Insuffisant</span>
              </div>
            </div>

            {/* accent-600 */}
            <div style={{
              padding: 'var(--space-6)',
              background: 'var(--card)',
              borderRadius: 'var(--radius-lg)',
              border: '2px solid var(--color-accent-600)'
            }}>
              <div style={{
                padding: 'var(--space-4)',
                background: 'var(--color-accent-600)',
                borderRadius: 'var(--radius-md)',
                marginBottom: 'var(--space-4)',
                textAlign: 'center'
              }}>
                <div style={{
                  color: '#ffffff',
                  fontSize: 'var(--text-lg)',
                  fontWeight: 'var(--font-semibold)',
                  marginBottom: 'var(--space-2)'
                }}>
                  ⚠️ Attention
                </div>
                <div style={{
                  color: '#ffffff',
                  fontSize: 'var(--text-base)',
                  fontWeight: 'var(--font-normal)'
                }}>
                  Texte blanc
                </div>
              </div>
              <div style={{ fontSize: 'var(--text-sm)', color: 'var(--muted-foreground)' }}>
                <strong>accent-600</strong> #C68D36<br/>
                Ratio: 2.46:1 ⚠️ <strong>Insuffisant</strong><br/>
                <span style={{ color: 'var(--color-error-600)' }}>✗ Pas AA</span>
              </div>
            </div>

            {/* accent-700 */}
            <div style={{
              padding: 'var(--space-6)',
              background: 'var(--card)',
              borderRadius: 'var(--radius-lg)',
              border: '2px solid var(--color-accent-700)'
            }}>
              <div style={{
                padding: 'var(--space-4)',
                background: 'var(--color-accent-700)',
                borderRadius: 'var(--radius-md)',
                marginBottom: 'var(--space-4)',
                textAlign: 'center'
              }}>
                <div style={{
                  color: '#ffffff',
                  fontSize: 'var(--text-lg)',
                  fontWeight: 'var(--font-semibold)',
                  marginBottom: 'var(--space-2)'
                }}>
                  ⚠️ Attention
                </div>
                <div style={{
                  color: '#ffffff',
                  fontSize: 'var(--text-base)',
                  fontWeight: 'var(--font-normal)'
                }}>
                  Texte blanc
                </div>
              </div>
              <div style={{ fontSize: 'var(--text-sm)', color: 'var(--muted-foreground)' }}>
                <strong>accent-700</strong> #AE7B30<br/>
                Ratio: 2.93:1 ⚠️ <strong>Quasi AA Large</strong><br/>
                <span style={{ color: 'var(--color-accent-700)' }}>⚠️ Limite</span>
              </div>
            </div>

            {/* accent-800 (RECOMMANDÉ) */}
            <div style={{
              padding: 'var(--space-6)',
              background: 'var(--card)',
              borderRadius: 'var(--radius-lg)',
              border: '3px solid var(--color-success-600)',
              boxShadow: '0 4px 6px rgba(46, 143, 152, 0.2)'
            }}>
              <div style={{
                padding: 'var(--space-4)',
                background: 'var(--color-accent-800)',
                borderRadius: 'var(--radius-md)',
                marginBottom: 'var(--space-4)',
                textAlign: 'center'
              }}>
                <div style={{
                  color: '#ffffff',
                  fontSize: 'var(--text-lg)',
                  fontWeight: 'var(--font-semibold)',
                  marginBottom: 'var(--space-2)'
                }}>
                  ⚠️ Attention
                </div>
                <div style={{
                  color: '#ffffff',
                  fontSize: 'var(--text-base)',
                  fontWeight: 'var(--font-normal)'
                }}>
                  Texte blanc
                </div>
              </div>
              <div style={{ fontSize: 'var(--text-sm)', color: 'var(--muted-foreground)' }}>
                <strong>accent-800</strong> #956A29<br/>
                Ratio: 3.49:1 ✅ <strong>AA Large</strong><br/>
                <span style={{ color: 'var(--color-success-600)', fontWeight: 'var(--font-bold)' }}>
                  ✓ RECOMMANDÉ (--accent-solid)
                </span>
              </div>
            </div>

            {/* accent-900 (Alternative) */}
            <div style={{
              padding: 'var(--space-6)',
              background: 'var(--card)',
              borderRadius: 'var(--radius-lg)',
              border: '2px solid var(--color-accent-900)'
            }}>
              <div style={{
                padding: 'var(--space-4)',
                background: 'var(--color-accent-900)',
                borderRadius: 'var(--radius-md)',
                marginBottom: 'var(--space-4)',
                textAlign: 'center'
              }}>
                <div style={{
                  color: '#ffffff',
                  fontSize: 'var(--text-lg)',
                  fontWeight: 'var(--font-semibold)',
                  marginBottom: 'var(--space-2)'
                }}>
                  ⚠️ Attention
                </div>
                <div style={{
                  color: '#ffffff',
                  fontSize: 'var(--text-base)',
                  fontWeight: 'var(--font-normal)'
                }}>
                  Texte blanc
                </div>
              </div>
              <div style={{ fontSize: 'var(--text-sm)', color: 'var(--muted-foreground)' }}>
                <strong>accent-900</strong> #7C5822<br/>
                Ratio: 4.15:1 ⚠️ <strong>Quasi AA Normal</strong><br/>
                <span style={{ color: 'var(--color-primary-600)' }}>
                  ℹ️ Alternative (--accent-solid-dark)
                </span>
              </div>
            </div>

          </div>
        </section>

        {/* Section 2 : Badges Comparison */}
        <section style={{ marginBottom: 'var(--space-12)' }}>
          <h2 style={{
            fontSize: 'var(--text-2xl)',
            fontWeight: 'var(--font-semibold)',
            marginBottom: 'var(--space-6)',
            color: 'var(--foreground)',
            fontFamily: 'var(--font-display)'
          }}>
            2. Badges Warning - Comparaison Directe
          </h2>

          <div style={{
            padding: 'var(--space-6)',
            background: 'var(--card)',
            borderRadius: 'var(--radius-lg)',
            border: '1px solid var(--border)'
          }}>
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: 'var(--space-6)'
            }}>
              
              {/* Row 1 : accent-400 (NON CONFORME) */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-4)' }}>
                <span style={{
                  padding: 'var(--space-2) var(--space-4)',
                  background: 'var(--color-accent-400)',
                  color: '#ffffff',
                  fontSize: 'var(--text-lg)',
                  fontWeight: 'var(--font-semibold)',
                  borderRadius: 'var(--radius-full)'
                }}>
                  ⚠️ Attention requise
                </span>
                <div style={{ flex: 1, fontSize: 'var(--text-sm)', color: 'var(--muted-foreground)' }}>
                  accent-400 #F8B044 - Ratio 1.74:1 ❌ NON CONFORME (illisible)
                </div>
              </div>

              {/* Row 2 : accent-600 (Insuffisant) */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-4)' }}>
                <span style={{
                  padding: 'var(--space-2) var(--space-4)',
                  background: 'var(--color-accent-600)',
                  color: '#ffffff',
                  fontSize: 'var(--text-lg)',
                  fontWeight: 'var(--font-semibold)',
                  borderRadius: 'var(--radius-full)'
                }}>
                  ⚠️ Attention requise
                </span>
                <div style={{ flex: 1, fontSize: 'var(--text-sm)', color: 'var(--muted-foreground)' }}>
                  accent-600 #C68D36 - Ratio 2.46:1 ⚠️ Insuffisant (comme tu voulais mais pas AA)
                </div>
              </div>

              {/* Row 3 : accent-700 (Quasi conforme) */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-4)' }}>
                <span style={{
                  padding: 'var(--space-2) var(--space-4)',
                  background: 'var(--color-accent-700)',
                  color: '#ffffff',
                  fontSize: 'var(--text-lg)',
                  fontWeight: 'var(--font-semibold)',
                  borderRadius: 'var(--radius-full)'
                }}>
                  ⚠️ Attention requise
                </span>
                <div style={{ flex: 1, fontSize: 'var(--text-sm)', color: 'var(--muted-foreground)' }}>
                  accent-700 #AE7B30 - Ratio 2.93:1 ⚠️ Quasi AA Large (limite)
                </div>
              </div>

              {/* Row 4 : accent-800 (RECOMMANDÉ) */}
              <div style={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: 'var(--space-4)',
                padding: 'var(--space-3)',
                background: 'var(--color-success-50)',
                borderRadius: 'var(--radius-md)',
                border: '2px solid var(--color-success-500)'
              }}>
                <span style={{
                  padding: 'var(--space-2) var(--space-4)',
                  background: 'var(--accent-solid)',
                  color: 'var(--accent-solid-foreground)',
                  fontSize: 'var(--text-lg)',
                  fontWeight: 'var(--font-semibold)',
                  borderRadius: 'var(--radius-full)'
                }}>
                  ⚠️ Attention requise
                </span>
                <div style={{ flex: 1, fontSize: 'var(--text-sm)', color: 'var(--color-success-700)' }}>
                  <strong>accent-800 #956A29 - Ratio 3.49:1 ✅ AA Large CONFORME</strong><br/>
                  <strong>→ RECOMMANDÉ (--accent-solid)</strong>
                </div>
              </div>

              {/* Row 5 : accent-900 (Alternative) */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-4)' }}>
                <span style={{
                  padding: 'var(--space-2) var(--space-4)',
                  background: 'var(--accent-solid-dark)',
                  color: 'var(--accent-solid-dark-foreground)',
                  fontSize: 'var(--text-lg)',
                  fontWeight: 'var(--font-semibold)',
                  borderRadius: 'var(--radius-full)'
                }}>
                  ⚠️ Attention requise
                </span>
                <div style={{ flex: 1, fontSize: 'var(--text-sm)', color: 'var(--muted-foreground)' }}>
                  accent-900 #7C5822 - Ratio 4.15:1 ⚠️ Quasi AA Normal (très foncé, presque marron)
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* Section 3 : Recommandation */}
        <section>
          <h2 style={{
            fontSize: 'var(--text-2xl)',
            fontWeight: 'var(--font-semibold)',
            marginBottom: 'var(--space-6)',
            color: 'var(--foreground)',
            fontFamily: 'var(--font-display)'
          }}>
            3. Recommandation Finale
          </h2>

          <div style={{
            padding: 'var(--space-6)',
            background: 'var(--color-success-50)',
            borderLeft: '4px solid var(--success-solid)',
            borderRadius: 'var(--radius-lg)',
            marginBottom: 'var(--space-4)'
          }}>
            <h3 style={{
              fontSize: 'var(--text-xl)',
              fontWeight: 'var(--font-bold)',
              color: 'var(--color-success-700)',
              marginBottom: 'var(--space-3)',
              margin: 0
            }}>
              ✅ Utilise accent-800 (--accent-solid)
            </h3>
            <ul style={{
              fontSize: 'var(--text-base)',
              color: 'var(--color-success-700)',
              lineHeight: 1.8,
              paddingLeft: 'var(--space-6)',
              margin: 0
            }}>
              <li><strong>Couleur :</strong> #956A29 (jaune foncé, pas trop marron)</li>
              <li><strong>WCAG :</strong> AA Large compliant (ratio 3.49:1)</li>
              <li><strong>Style :</strong> Cohérent avec la palette jaune TLS</li>
              <li><strong>Lisibilité :</strong> Texte blanc bien lisible</li>
              <li><strong>Usage :</strong> Badges, buttons avec font-size ≥ 18px</li>
            </ul>
          </div>

          <div style={{
            padding: 'var(--space-6)',
            background: 'var(--color-primary-50)',
            borderLeft: '4px solid var(--info)',
            borderRadius: 'var(--radius-lg)'
          }}>
            <h3 style={{
              fontSize: 'var(--text-xl)',
              fontWeight: 'var(--font-bold)',
              color: 'var(--color-primary-700)',
              marginBottom: 'var(--space-3)',
              margin: 0
            }}>
              ℹ️ Alternative : accent-900 (--accent-solid-dark)
            </h3>
            <ul style={{
              fontSize: 'var(--text-base)',
              color: 'var(--color-primary-700)',
              lineHeight: 1.8,
              paddingLeft: 'var(--space-6)',
              margin: 0
            }}>
              <li><strong>Couleur :</strong> #7C5822 (très foncé, presque marron)</li>
              <li><strong>WCAG :</strong> Quasi AA Normal (ratio 4.15:1)</li>
              <li><strong>Avantage :</strong> Permet texte plus petit (16px)</li>
              <li><strong>Inconvénient :</strong> Moins "jaune", plus "marron"</li>
              <li><strong>Usage :</strong> Si tu veux absolument du texte 16px</li>
            </ul>
          </div>
        </section>

      </div>
    </div>
  );
}
