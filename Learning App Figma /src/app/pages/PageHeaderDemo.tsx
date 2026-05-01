import { Map, BookMarked, Video, TrendingUp, Plus, Calendar } from 'lucide-react';
import { BackgroundBlobs } from '../components/ui/background-blobs';
import OptimizedSidebar from '../components/ui/optimized-sidebar';
import { 
  PageHeader1, 
  PageHeader2, 
  PageHeader3,
  PageHeader4,
  PageHeader5
} from '../components/common/PageHeaderFinal';
import { ButtonEnhanced } from '../components/ui/button-enhanced';

interface PageHeaderDemoProps {
  onNavigate: (page: any) => void;
  onLogout: () => void;
}

/**
 * ✅ PAGE HEADER DEMO FINAL
 * 
 * REFONTE COMPLÈTE avec :
 * - Hiérarchie typographique stricte
 * - Spacing minimal entre titre et description (space-1 ou 2px)
 * - Alignement parfait
 * - Utilisation stricte du design system
 */
export default function PageHeaderDemo({ onNavigate, onLogout }: PageHeaderDemoProps) {
  return (
    <div className="min-h-screen relative overflow-hidden">
      <BackgroundBlobs />

      <div className="flex h-screen">
        <OptimizedSidebar
          currentPage="dashboard"
          onNavigate={onNavigate}
          onLogout={onLogout}
          userHasEnterpriseAccess={true}
          userName="Admin1509"
          userEmail="padennery@me.com"
          userInitials="A"
        />

        <main className="flex-1 overflow-y-auto">
          <div style={{
            maxWidth: '1152px',
            margin: '0 auto',
            padding: 'var(--space-10)',
            paddingBottom: 'var(--space-12)',
          }}>
            
            {/* Intro */}
            <div 
              style={{
                marginBottom: 'var(--space-12)',
                padding: 'var(--space-6)',
                borderRadius: 'var(--radius-lg)',
                background: 'var(--primary-lighter)',
                border: '1px solid var(--primary-200)',
              }}
            >
              <h2 
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 'var(--text-2xl)',
                  fontWeight: 'var(--font-weight-bold)',
                  color: 'var(--foreground)',
                  marginBottom: 'var(--space-2)',
                }}
              >
                ✅ REFONTE COMPLÈTE - Hiérarchie + Spacing + Alignement
              </h2>
              <ul 
                style={{ 
                  color: 'var(--neutral-700)', 
                  lineHeight: 'var(--leading-relaxed)', 
                  margin: 0,
                  paddingLeft: 'var(--space-6)',
                  fontFamily: 'var(--font-body)',
                  fontSize: 'var(--text-sm)',
                  fontWeight: 'var(--font-weight-medium)',
                }}
              >
                <li><strong>Hiérarchie stricte :</strong> Titre gros, description petite mais lisible</li>
                <li><strong>Spacing minimal :</strong> space-1 (4px) ou 2px entre titre et description</li>
                <li><strong>Alignement parfait :</strong> tout aligné selon le design system</li>
                <li><strong>Nunito Medium (500)</strong> pour description + foreground/neutral-700</li>
              </ul>
            </div>

            {/* ========== PROPOSITION 1 ========== */}
            <div style={{ marginBottom: 'var(--space-16)' }}>
              <div 
                style={{
                  fontSize: 'var(--text-xs)',
                  fontWeight: 'var(--font-weight-bold)',
                  color: 'var(--primary)',
                  marginBottom: 'var(--space-3)',
                  textTransform: 'uppercase',
                  letterSpacing: '0.1em',
                  fontFamily: 'var(--font-body)',
                }}
              >
                Proposition 1 — Icon 48px + Bloc texte compact (Titre 3xl + Desc sm)
              </div>
              
              <PageHeader1
                icon={Map}
                title="Mes Parcours d'apprentissage"
                description="Découvrez et progressez dans vos parcours de formation personnalisés en IA"
                iconColor="var(--primary)"
                iconGradientFrom="var(--primary-lighter)"
                iconGradientTo="var(--accent-lighter)"
              />

              <div 
                style={{
                  height: '100px',
                  borderRadius: 'var(--radius-lg)',
                  background: 'var(--muted)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'var(--muted-foreground)',
                  fontSize: 'var(--text-xs)',
                  fontFamily: 'var(--font-body)',
                }}
              >
                Contenu page
              </div>
            </div>

            {/* ========== PROPOSITION 2 ========== */}
            <div style={{ marginBottom: 'var(--space-16)' }}>
              <div 
                style={{
                  fontSize: 'var(--text-xs)',
                  fontWeight: 'var(--font-weight-bold)',
                  color: 'var(--primary)',
                  marginBottom: 'var(--space-3)',
                  textTransform: 'uppercase',
                  letterSpacing: '0.1em',
                  fontFamily: 'var(--font-body)',
                }}
              >
                Proposition 2 — Icon 40px compact + Stack serré (Titre 2xl + Desc base)
              </div>
              
              <PageHeader2
                icon={BookMarked}
                title="Journal de bord"
                description="Conservez vos réflexions et capturez vos apprentissages clés au quotidien"
                iconColor="var(--primary)"
                iconGradientFrom="var(--primary-lighter)"
                iconGradientTo="var(--secondary-lighter)"
                actions={
                  <ButtonEnhanced
                    variant="primary"
                    size="md"
                    icon={<Plus className="w-5 h-5" />}
                    onClick={() => {}}
                  >
                    Nouvelle entrée
                  </ButtonEnhanced>
                }
              />

              <div 
                style={{
                  height: '100px',
                  borderRadius: 'var(--radius-lg)',
                  background: 'var(--muted)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'var(--muted-foreground)',
                  fontSize: 'var(--text-xs)',
                  fontFamily: 'var(--font-body)',
                }}
              >
                Contenu page
              </div>
            </div>

            {/* ========== PROPOSITION 3 ========== */}
            <div style={{ marginBottom: 'var(--space-16)' }}>
              <div 
                style={{
                  fontSize: 'var(--text-xs)',
                  fontWeight: 'var(--font-weight-bold)',
                  color: 'var(--primary)',
                  marginBottom: 'var(--space-3)',
                  textTransform: 'uppercase',
                  letterSpacing: '0.1em',
                  fontFamily: 'var(--font-body)',
                }}
              >
                Proposition 3 — Badge vertical + Titre XXL (Titre 4xl + Desc base)
              </div>
              
              <PageHeader3
                icon={Video}
                title="Coaching 1-to-1"
                description="Bénéficiez d'un accompagnement personnalisé avec votre expert IA pour accélérer votre apprentissage"
                iconColor="var(--primary)"
                iconGradientFrom="var(--primary-lighter)"
                iconGradientTo="var(--accent-lighter)"
                actions={
                  <ButtonEnhanced
                    variant="primary"
                    size="md"
                    icon={<Calendar className="w-5 h-5" />}
                    onClick={() => {}}
                  >
                    Réserver
                  </ButtonEnhanced>
                }
              />

              <div 
                style={{
                  height: '100px',
                  borderRadius: 'var(--radius-lg)',
                  background: 'var(--muted)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'var(--muted-foreground)',
                  fontSize: 'var(--text-xs)',
                  fontFamily: 'var(--font-body)',
                }}
              >
                Contenu page
              </div>
            </div>

            {/* ========== PROPOSITION 4 ========== */}
            <div style={{ marginBottom: 'var(--space-16)' }}>
              <div 
                style={{
                  fontSize: 'var(--text-xs)',
                  fontWeight: 'var(--font-weight-bold)',
                  color: 'var(--primary)',
                  marginBottom: 'var(--space-3)',
                  textTransform: 'uppercase',
                  letterSpacing: '0.1em',
                  fontFamily: 'var(--font-body)',
                }}
              >
                Proposition 4 — Icon + Titre inline, Desc alignée dessous (Titre 3xl + Desc sm)
              </div>
              
              <PageHeader4
                icon={TrendingUp}
                title="Veille & Apprentissage"
                description="Restez à la pointe de l'innovation IA avec notre veille quotidienne"
                iconColor="var(--secondary)"
                iconGradientFrom="var(--secondary-lighter)"
                iconGradientTo="var(--accent-lighter)"
              />

              <div 
                style={{
                  height: '100px',
                  borderRadius: 'var(--radius-lg)',
                  background: 'var(--muted)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'var(--muted-foreground)',
                  fontSize: 'var(--text-xs)',
                  fontFamily: 'var(--font-body)',
                }}
              >
                Contenu page
              </div>
            </div>

            {/* ========== PROPOSITION 5 ========== */}
            <div style={{ marginBottom: 'var(--space-16)' }}>
              <div 
                style={{
                  fontSize: 'var(--text-xs)',
                  fontWeight: 'var(--font-weight-bold)',
                  color: 'var(--primary)',
                  marginBottom: 'var(--space-3)',
                  textTransform: 'uppercase',
                  letterSpacing: '0.1em',
                  fontFamily: 'var(--font-body)',
                }}
              >
                Proposition 5 — Ultra-compact minimaliste (Titre 2xl + Desc xs)
              </div>
              
              <PageHeader5
                icon={Map}
                title="Mes Parcours"
                description="Vos formations personnalisées en IA"
                iconColor="var(--primary)"
                iconGradientFrom="var(--primary-lighter)"
                iconGradientTo="var(--accent-lighter)"
              />

              <div 
                style={{
                  height: '100px',
                  borderRadius: 'var(--radius-lg)',
                  background: 'var(--muted)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'var(--muted-foreground)',
                  fontSize: 'var(--text-xs)',
                  fontFamily: 'var(--font-body)',
                }}
              >
                Contenu page
              </div>
            </div>

            {/* ========== TABLEAU COMPARATIF ========== */}
            <div 
              style={{
                marginTop: 'var(--space-12)',
                padding: 'var(--space-8)',
                borderRadius: 'var(--radius-lg)',
                background: 'var(--neutral-50)',
                border: '1px solid var(--border)',
              }}
            >
              <h3 
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 'var(--text-2xl)',
                  fontWeight: 'var(--font-weight-bold)',
                  color: 'var(--foreground)',
                  marginBottom: 'var(--space-6)',
                }}
              >
                📊 Comparatif Hiérarchie
              </h3>
              
              <div 
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
                  gap: 'var(--space-5)',
                }}
              >
                {/* Prop 1 */}
                <div 
                  style={{
                    padding: 'var(--space-4)',
                    borderRadius: 'var(--radius-lg)',
                    background: 'white',
                    border: '2px solid var(--primary-200)',
                  }}
                >
                  <div 
                    style={{
                      fontSize: 'var(--text-base)',
                      fontWeight: 'var(--font-weight-bold)',
                      color: 'var(--primary)',
                      marginBottom: 'var(--space-2)',
                      fontFamily: 'var(--font-display)',
                    }}
                  >
                    Prop 1
                  </div>
                  <div 
                    style={{
                      fontSize: 'var(--text-xs)',
                      color: 'var(--neutral-700)',
                      lineHeight: 'var(--leading-relaxed)',
                      fontFamily: 'var(--font-body)',
                      fontWeight: 'var(--font-weight-medium)',
                    }}
                  >
                    <div><strong>Icon:</strong> 48px</div>
                    <div><strong>Titre:</strong> 3xl (30px)</div>
                    <div><strong>Desc:</strong> sm (14px)</div>
                    <div><strong>Gap:</strong> space-1 (4px)</div>
                    <div style={{ marginTop: 'var(--space-2)', color: 'var(--primary)' }}>✅ Équilibré</div>
                  </div>
                </div>

                {/* Prop 2 */}
                <div 
                  style={{
                    padding: 'var(--space-4)',
                    borderRadius: 'var(--radius-lg)',
                    background: 'white',
                    border: '2px solid var(--primary-200)',
                  }}
                >
                  <div 
                    style={{
                      fontSize: 'var(--text-base)',
                      fontWeight: 'var(--font-weight-bold)',
                      color: 'var(--primary)',
                      marginBottom: 'var(--space-2)',
                      fontFamily: 'var(--font-display)',
                    }}
                  >
                    Prop 2
                  </div>
                  <div 
                    style={{
                      fontSize: 'var(--text-xs)',
                      color: 'var(--neutral-700)',
                      lineHeight: 'var(--leading-relaxed)',
                      fontFamily: 'var(--font-body)',
                      fontWeight: 'var(--font-weight-medium)',
                    }}
                  >
                    <div><strong>Icon:</strong> 40px</div>
                    <div><strong>Titre:</strong> 2xl (24px)</div>
                    <div><strong>Desc:</strong> base (16px)</div>
                    <div><strong>Gap:</strong> space-1 (4px)</div>
                    <div style={{ marginTop: 'var(--space-2)', color: 'var(--primary)' }}>✅ Compact</div>
                  </div>
                </div>

                {/* Prop 3 */}
                <div 
                  style={{
                    padding: 'var(--space-4)',
                    borderRadius: 'var(--radius-lg)',
                    background: 'white',
                    border: '2px solid var(--primary-200)',
                  }}
                >
                  <div 
                    style={{
                      fontSize: 'var(--text-base)',
                      fontWeight: 'var(--font-weight-bold)',
                      color: 'var(--primary)',
                      marginBottom: 'var(--space-2)',
                      fontFamily: 'var(--font-display)',
                    }}
                  >
                    Prop 3
                  </div>
                  <div 
                    style={{
                      fontSize: 'var(--text-xs)',
                      color: 'var(--neutral-700)',
                      lineHeight: 'var(--leading-relaxed)',
                      fontFamily: 'var(--font-body)',
                      fontWeight: 'var(--font-weight-medium)',
                    }}
                  >
                    <div><strong>Icon:</strong> 44px badge</div>
                    <div><strong>Titre:</strong> 4xl (36px)</div>
                    <div><strong>Desc:</strong> base (16px)</div>
                    <div><strong>Gap:</strong> space-2 (8px)</div>
                    <div style={{ marginTop: 'var(--space-2)', color: 'var(--primary)' }}>✅ Hero</div>
                  </div>
                </div>

                {/* Prop 4 */}
                <div 
                  style={{
                    padding: 'var(--space-4)',
                    borderRadius: 'var(--radius-lg)',
                    background: 'white',
                    border: '2px solid var(--primary-200)',
                  }}
                >
                  <div 
                    style={{
                      fontSize: 'var(--text-base)',
                      fontWeight: 'var(--font-weight-bold)',
                      color: 'var(--primary)',
                      marginBottom: 'var(--space-2)',
                      fontFamily: 'var(--font-display)',
                    }}
                  >
                    Prop 4
                  </div>
                  <div 
                    style={{
                      fontSize: 'var(--text-xs)',
                      color: 'var(--neutral-700)',
                      lineHeight: 'var(--leading-relaxed)',
                      fontFamily: 'var(--font-body)',
                      fontWeight: 'var(--font-weight-medium)',
                    }}
                  >
                    <div><strong>Icon:</strong> 52px</div>
                    <div><strong>Titre:</strong> 3xl (30px)</div>
                    <div><strong>Desc:</strong> sm (14px)</div>
                    <div><strong>Gap:</strong> space-2 (8px)</div>
                    <div style={{ marginTop: 'var(--space-2)', color: 'var(--primary)' }}>✅ Aligné</div>
                  </div>
                </div>

                {/* Prop 5 */}
                <div 
                  style={{
                    padding: 'var(--space-4)',
                    borderRadius: 'var(--radius-lg)',
                    background: 'white',
                    border: '2px solid var(--primary-200)',
                  }}
                >
                  <div 
                    style={{
                      fontSize: 'var(--text-base)',
                      fontWeight: 'var(--font-weight-bold)',
                      color: 'var(--primary)',
                      marginBottom: 'var(--space-2)',
                      fontFamily: 'var(--font-display)',
                    }}
                  >
                    Prop 5
                  </div>
                  <div 
                    style={{
                      fontSize: 'var(--text-xs)',
                      color: 'var(--neutral-700)',
                      lineHeight: 'var(--leading-relaxed)',
                      fontFamily: 'var(--font-body)',
                      fontWeight: 'var(--font-weight-medium)',
                    }}
                  >
                    <div><strong>Icon:</strong> 36px</div>
                    <div><strong>Titre:</strong> 2xl (24px)</div>
                    <div><strong>Desc:</strong> xs (12px)</div>
                    <div><strong>Gap:</strong> 2px</div>
                    <div style={{ marginTop: 'var(--space-2)', color: 'var(--primary)' }}>✅ Mini</div>
                  </div>
                </div>
              </div>

              {/* Résumé */}
              <div 
                style={{
                  marginTop: 'var(--space-6)',
                  padding: 'var(--space-4)',
                  borderRadius: 'var(--radius-lg)',
                  background: 'var(--accent-lighter)',
                  border: '1px solid var(--accent-200)',
                }}
              >
                <div 
                  style={{
                    fontSize: 'var(--text-sm)',
                    fontWeight: 'var(--font-weight-semibold)',
                    color: 'var(--foreground)',
                    marginBottom: 'var(--space-2)',
                    fontFamily: 'var(--font-body)',
                  }}
                >
                  ✅ Toutes utilisent :
                </div>
                <div 
                  style={{
                    fontSize: 'var(--text-xs)',
                    color: 'var(--neutral-700)',
                    lineHeight: 'var(--leading-relaxed)',
                    fontFamily: 'var(--font-body)',
                    fontWeight: 'var(--font-weight-medium)',
                  }}
                >
                  • <strong>Nunito Medium (500)</strong> pour description<br />
                  • <strong>foreground</strong> ou <strong>neutral-700</strong> pour couleur<br />
                  • <strong>Spacing minimal</strong> (space-1 ou 2px) entre titre et desc<br />
                  • <strong>Hiérarchie stricte</strong> selon taille de page
                </div>
              </div>
            </div>

          </div>
        </main>
      </div>
    </div>
  );
}
