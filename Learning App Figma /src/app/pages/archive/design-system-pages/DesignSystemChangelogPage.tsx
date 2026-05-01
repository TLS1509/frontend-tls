import { History, ArrowLeft, Sparkles } from 'lucide-react';
import OptimizedSidebar from '../components/ui/optimized-sidebar';

interface DesignSystemChangelogPageProps {
  onNavigate: (page: string) => void;
  onLogout?: () => void;
}

export default function DesignSystemChangelogPage({ onNavigate, onLogout }: DesignSystemChangelogPageProps) {
  const changelogData = [
    {
      version: '2.0.0',
      date: 'Janvier 2025',
      type: 'major',
      changes: [
        {
          category: 'Couleurs',
          items: [
            'Ajout de l\'échelle complète Primary (50-900)',
            'Ajout de l\'échelle complète Secondary (50-900)',
            'Ajout de l\'échelle complète Accent (50-900)',
            'Nouvelles couleurs Semantic (Success, Destructive, Warning, Info)',
          ],
        },
        {
          category: 'Effets & Animations',
          items: [
            'Classes transition-tls (fast, base, slow)',
            'Échelle de durations (150ms-500ms)',
            'Easings personnalisés (ease-bounce)',
            'Échelle de shadows (xs-2xl)',
            'Variables glassmorphism complètes',
            'Backdrop-blur utilities (xs-3xl)',
          ],
        },
        {
          category: 'Gradients',
          items: [
            'Nouveaux gradients: Primary, Secondary, Accent, Warm',
            'Gradient Brand multi-couleurs',
            'Gradient Hero pour sections principales',
            'Gradients mesh pour backgrounds complexes',
          ],
        },
        {
          category: 'Typographie',
          items: [
            'Échelle complète text-xs à text-6xl',
            'Font weights Light, Normal, Medium, Semibold, Bold',
            'Line-height utilities (tight, normal, relaxed, loose)',
            'Letter-spacing utilities',
          ],
        },
        {
          category: 'Spacing',
          items: [
            'Échelle étendue de 0 à 32 (128px)',
            'Espacement cohérent basé sur 4px',
          ],
        },
        {
          category: 'Border Radius',
          items: [
            'Échelle de radius-none à radius-full',
            'Valeur par défaut: radius-lg (10px)',
          ],
        },
        {
          category: 'Composants',
          items: [
            '63 composants React TypeScript production-ready',
            'Glassmorphism cards et effects',
            'Enhanced buttons avec variants multiples',
            'Form components complets',
            'Navigation responsive (Sidebar + Bottom Nav)',
          ],
        },
      ],
    },
    {
      version: '1.0.0',
      date: 'Décembre 2024',
      type: 'initial',
      changes: [
        {
          category: 'Fondation',
          items: [
            'Couleurs primaires: Blue (#55A1B4), Orange (#ED843A), Yellow (#F8B044)',
            'Palette neutre basique',
            'Spacing de base',
            'Border radius simple',
            'Composants de base',
          ],
        },
      ],
    },
  ];

  return (
    <div className="min-h-screen" style={{ background: 'var(--background)' }}>
      {/* Sidebar */}
      <OptimizedSidebar 
        currentPage="design-system-doc" 
        onNavigate={onNavigate} 
        onLogout={onLogout}
      />

      {/* Main Content */}
      <div className="lg:pl-80">
        <div className="pt-20 lg:pt-6 px-6 lg:px-12 pb-20 lg:pb-12 max-w-[1400px] mx-auto">
          
          {/* Header */}
          <div style={{ marginBottom: 'var(--space-8)' }}>
            <button
              onClick={() => onNavigate('design-system-doc')}
              className="flex items-center gap-2 mb-6 px-4 py-2 rounded-xl transition-all"
              style={{
                color: 'var(--muted-foreground)',
                fontSize: 'var(--text-sm)',
                fontWeight: 'var(--font-weight-medium)',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = 'var(--primary)';
                e.currentTarget.style.background = 'var(--muted)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = 'var(--muted-foreground)';
                e.currentTarget.style.background = 'transparent';
              }}
            >
              <ArrowLeft className="w-4 h-4" />
              Retour au Design System
            </button>

            <div className="flex items-start gap-4">
              <div 
                className="w-16 h-16 lg:w-20 lg:h-20 rounded-2xl flex items-center justify-center"
                style={{
                  background: 'var(--gradient-primary)',
                  boxShadow: '0 12px 32px rgba(85, 161, 180, 0.25)',
                }}
              >
                <History className="w-8 h-8 lg:w-10 lg:h-10 text-white" />
              </div>
              <div>
                <h1 
                  style={{
                    fontSize: 'var(--text-4xl)',
                    fontWeight: 'var(--font-weight-bold)',
                    color: 'var(--foreground)',
                    fontFamily: 'var(--font-display)',
                    marginBottom: 'var(--space-2)',
                  }}
                >
                  Changelog
                </h1>
                <p 
                  style={{
                    fontSize: 'var(--text-lg)',
                    color: 'var(--muted-foreground)',
                  }}
                >
                  Historique des modifications du Design System
                </p>
              </div>
            </div>
          </div>

          {/* Changelog Content */}
          <div style={{ display: 'grid', gap: 'var(--space-6)' }}>
            {changelogData.map((version) => (
              <div
                key={version.version}
                className="p-8 rounded-2xl border"
                style={{
                  background: 'var(--card)',
                  borderColor: 'var(--border)',
                }}
              >
                {/* Version Header */}
                <div className="flex items-start justify-between flex-wrap gap-4" style={{ marginBottom: 'var(--space-6)' }}>
                  <div>
                    <div className="flex items-center gap-3 flex-wrap" style={{ marginBottom: 'var(--space-2)' }}>
                      <h2
                        style={{
                          fontSize: 'var(--text-3xl)',
                          fontWeight: 'var(--font-weight-bold)',
                          color: 'var(--foreground)',
                          fontFamily: 'var(--font-display)',
                        }}
                      >
                        Version {version.version}
                      </h2>
                      <span
                        className="px-3 py-1 rounded-full"
                        style={{
                          background: version.type === 'major' ? 'var(--primary-lighter)' : 'var(--neutral-100)',
                          color: version.type === 'major' ? 'var(--primary)' : 'var(--neutral-600)',
                          fontSize: 'var(--text-sm)',
                          fontWeight: 'var(--font-weight-semibold)',
                        }}
                      >
                        {version.type === 'major' ? 'Major Release' : 'Initial Release'}
                      </span>
                    </div>
                    <p
                      style={{
                        fontSize: 'var(--text-base)',
                        color: 'var(--muted-foreground)',
                      }}
                    >
                      {version.date}
                    </p>
                  </div>

                  {version.type === 'major' && (
                    <div
                      className="px-4 py-2 rounded-xl flex items-center gap-2"
                      style={{
                        background: 'var(--accent-lighter)',
                        border: '1px solid var(--accent)',
                      }}
                    >
                      <Sparkles className="w-4 h-4" style={{ color: 'var(--accent)' }} />
                      <span
                        style={{
                          fontSize: 'var(--text-sm)',
                          fontWeight: 'var(--font-weight-semibold)',
                          color: 'var(--accent)',
                        }}
                      >
                        Dernière version
                      </span>
                    </div>
                  )}
                </div>

                {/* Changes by Category */}
                <div style={{ display: 'grid', gap: 'var(--space-6)' }}>
                  {version.changes.map((change) => (
                    <div key={change.category}>
                      <h3
                        style={{
                          fontSize: 'var(--text-xl)',
                          fontWeight: 'var(--font-weight-semibold)',
                          color: 'var(--foreground)',
                          marginBottom: 'var(--space-3)',
                        }}
                      >
                        {change.category}
                      </h3>
                      <ul style={{ display: 'grid', gap: 'var(--space-2)' }}>
                        {change.items.map((item, idx) => (
                          <li
                            key={idx}
                            className="flex items-start gap-3"
                          >
                            <div
                              className="w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0"
                              style={{ background: 'var(--primary)' }}
                            />
                            <span
                              style={{
                                fontSize: 'var(--text-base)',
                                color: 'var(--foreground)',
                                flex: 1,
                              }}
                            >
                              {item}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </div>
  );
}
