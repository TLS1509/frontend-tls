import { GitBranch, ArrowLeft, ArrowRight, Home, Map, Pen, MessageSquare, User, Building2, BookOpen, Trophy, Sparkles, BarChart3 } from 'lucide-react';
import OptimizedSidebar from '../components/ui/optimized-sidebar';

interface DesignSystemFlowsPageProps {
  onNavigate: (page: string) => void;
  onLogout?: () => void;
}

export default function DesignSystemFlowsPage({ onNavigate, onLogout }: DesignSystemFlowsPageProps) {
  const userFlowsData = [
    {
      category: 'Authentification',
      flows: [
        {
          name: 'Connexion utilisateur',
          pages: ['Login', 'Dashboard'],
          description: 'L\'utilisateur se connecte et accède au tableau de bord',
          steps: [
            { page: 'Login', action: 'Saisie email/mot de passe' },
            { page: 'Dashboard', action: 'Affichage du tableau de bord personnalisé' },
          ],
        },
        {
          name: 'Inscription nouveau utilisateur',
          pages: ['Signup', 'Onboarding', 'Dashboard'],
          description: 'Nouvel utilisateur s\'inscrit et complète l\'onboarding',
          steps: [
            { page: 'Signup', action: 'Création de compte' },
            { page: 'Onboarding', action: 'Configuration profil et préférences' },
            { page: 'Dashboard', action: 'Accès à l\'application' },
          ],
        },
      ],
    },
    {
      category: 'Apprentissage',
      flows: [
        {
          name: 'Parcours d\'apprentissage',
          pages: ['Dashboard', 'Parcours', 'Course Detail', 'Lesson'],
          description: 'L\'utilisateur explore et suit un parcours de formation',
          steps: [
            { page: 'Dashboard', action: 'Vue d\'ensemble des parcours' },
            { page: 'Parcours', action: 'Sélection d\'un parcours' },
            { page: 'Course Detail', action: 'Exploration des étapes du parcours' },
            { page: 'Lesson', action: 'Lecture d\'une leçon et progression' },
          ],
        },
        {
          name: 'Veille et Articles',
          pages: ['Dashboard', 'Veille', 'Veille Article'],
          description: 'Consultation et sauvegarde d\'articles de veille',
          steps: [
            { page: 'Dashboard', action: 'Quick win ou card veille' },
            { page: 'Veille', action: 'Navigation dans les articles' },
            { page: 'Veille Article', action: 'Lecture complète et actions (like, save)' },
          ],
        },
      ],
    },
    {
      category: 'Journal & Réflexion',
      flows: [
        {
          name: 'Entrée de journal',
          pages: ['Dashboard', 'Journal', 'Journal New Entry', 'Journal Detail'],
          description: 'Création et consultation d\'entrées de journal',
          steps: [
            { page: 'Dashboard', action: 'Accès rapide au journal' },
            { page: 'Journal', action: 'Vue d\'ensemble des entrées' },
            { page: 'Journal New Entry', action: 'Rédaction nouvelle entrée' },
            { page: 'Journal Detail', action: 'Consultation entrée existante' },
          ],
        },
      ],
    },
    {
      category: 'Coaching',
      flows: [
        {
          name: 'Réservation coaching',
          pages: ['Dashboard', 'Coaching'],
          description: 'Réservation et gestion des sessions de coaching',
          steps: [
            { page: 'Dashboard', action: 'Accès coaching depuis sidebar' },
            { page: 'Coaching', action: 'Calendrier et réservation' },
          ],
        },
      ],
    },
    {
      category: 'Gamification',
      flows: [
        {
          name: 'Leaderboard et compétition',
          pages: ['Dashboard', 'Leaderboard'],
          description: 'Consultation du classement et badges',
          steps: [
            { page: 'Dashboard', action: 'Vue points et position' },
            { page: 'Leaderboard', action: 'Classement complet et détails' },
          ],
        },
      ],
    },
    {
      category: 'Profil & Paramètres',
      flows: [
        {
          name: 'Gestion profil',
          pages: ['Profile', 'Account'],
          description: 'Modification du profil et paramètres',
          steps: [
            { page: 'Profile', action: 'Accès via dropdown' },
            { page: 'Account', action: 'Modification paramètres' },
          ],
        },
      ],
    },
  ];

  const appPagesData = [
    { name: 'Login', icon: User, description: 'Page de connexion avec mot de passe oublié' },
    { name: 'Signup', icon: User, description: 'Inscription nouvel utilisateur' },
    { name: 'Onboarding', icon: Sparkles, description: 'Configuration initiale du profil' },
    { name: 'Dashboard', icon: Home, description: 'Tableau de bord principal avec Quick Wins' },
    { name: 'Parcours', icon: Map, description: 'Liste des parcours d\'apprentissage' },
    { name: 'Course Detail', icon: BookOpen, description: 'Détails d\'un parcours (étapes et leçons)' },
    { name: 'Lesson', icon: BookOpen, description: 'Lecteur de leçon avec progression' },
    { name: 'Journal', icon: Pen, description: 'Journal de bord avec entrées' },
    { name: 'Journal New Entry', icon: Pen, description: 'Création nouvelle entrée journal' },
    { name: 'Journal Detail', icon: Pen, description: 'Vue détaillée d\'une entrée' },
    { name: 'Coaching', icon: MessageSquare, description: 'Réservation sessions coaching (Calendly-style)' },
    { name: 'Veille', icon: Sparkles, description: 'Articles de veille et curation' },
    { name: 'Leaderboard', icon: Trophy, description: 'Classement et gamification' },
    { name: 'Profile', icon: User, description: 'Profil utilisateur' },
    { name: 'Entreprise Dashboard', icon: Building2, description: 'Dashboard entreprise (PRO)' },
    { name: 'Messages', icon: MessageSquare, description: 'Messagerie interne' },
    { name: 'Notifications', icon: BarChart3, description: 'Centre de notifications' },
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
                  background: 'var(--gradient-accent)',
                  boxShadow: '0 12px 32px rgba(248, 176, 68, 0.25)',
                }}
              >
                <GitBranch className="w-8 h-8 lg:w-10 lg:h-10 text-white" />
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
                  User Flows
                </h1>
                <p 
                  style={{
                    fontSize: 'var(--text-lg)',
                    color: 'var(--muted-foreground)',
                  }}
                >
                  Parcours utilisateurs et navigation dans l'application
                </p>
              </div>
            </div>
          </div>

          {/* All Pages Overview */}
          <div style={{ marginBottom: 'var(--space-12)' }}>
            <h2
              style={{
                fontSize: 'var(--text-2xl)',
                fontWeight: 'var(--font-weight-bold)',
                color: 'var(--foreground)',
                fontFamily: 'var(--font-display)',
                marginBottom: 'var(--space-2)',
              }}
            >
              Pages de l'Application
            </h2>
            <p
              style={{
                fontSize: 'var(--text-base)',
                color: 'var(--muted-foreground)',
                marginBottom: 'var(--space-6)',
              }}
            >
              {appPagesData.length} pages et interfaces dans The Learning App
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {appPagesData.map((page) => (
                <div
                  key={page.name}
                  className="p-6 rounded-2xl border"
                  style={{
                    background: 'var(--card)',
                    borderColor: 'var(--border)',
                  }}
                >
                  <div className="flex items-start gap-4">
                    <div
                      className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                      style={{
                        background: 'var(--primary-lighter)',
                        color: 'var(--primary)',
                      }}
                    >
                      <page.icon className="w-6 h-6" />
                    </div>
                    <div className="flex-1">
                      <h3
                        style={{
                          fontSize: 'var(--text-base)',
                          fontWeight: 'var(--font-weight-semibold)',
                          color: 'var(--foreground)',
                          marginBottom: 'var(--space-1)',
                        }}
                      >
                        {page.name}
                      </h3>
                      <p
                        style={{
                          fontSize: 'var(--text-sm)',
                          color: 'var(--muted-foreground)',
                        }}
                      >
                        {page.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* User Flows by Category */}
          <div style={{ display: 'grid', gap: 'var(--space-12)' }}>
            {userFlowsData.map((category) => (
              <div key={category.category}>
                <h2
                  style={{
                    fontSize: 'var(--text-2xl)',
                    fontWeight: 'var(--font-weight-bold)',
                    color: 'var(--foreground)',
                    fontFamily: 'var(--font-display)',
                    marginBottom: 'var(--space-6)',
                  }}
                >
                  {category.category}
                </h2>
                <div style={{ display: 'grid', gap: 'var(--space-6)' }}>
                  {category.flows.map((flow) => (
                    <div
                      key={flow.name}
                      className="p-8 rounded-2xl border"
                      style={{
                        background: 'var(--card)',
                        borderColor: 'var(--border)',
                      }}
                    >
                      <h3
                        style={{
                          fontSize: 'var(--text-xl)',
                          fontWeight: 'var(--font-weight-semibold)',
                          color: 'var(--foreground)',
                          marginBottom: 'var(--space-2)',
                        }}
                      >
                        {flow.name}
                      </h3>
                      <p
                        style={{
                          fontSize: 'var(--text-base)',
                          color: 'var(--muted-foreground)',
                          marginBottom: 'var(--space-6)',
                        }}
                      >
                        {flow.description}
                      </p>

                      {/* Flow Steps */}
                      <div style={{ display: 'grid', gap: 'var(--space-4)' }}>
                        {flow.steps.map((step, stepIndex) => (
                          <div key={stepIndex}>
                            <div className="flex items-start gap-4">
                              {/* Step Number */}
                              <div
                                className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0"
                                style={{
                                  background: 'var(--primary)',
                                  color: 'white',
                                  fontWeight: 'var(--font-weight-bold)',
                                  fontSize: 'var(--text-base)',
                                }}
                              >
                                {stepIndex + 1}
                              </div>
                              
                              {/* Step Content */}
                              <div className="flex-1">
                                <div
                                  className="p-4 rounded-xl"
                                  style={{
                                    background: 'var(--muted)',
                                  }}
                                >
                                  <p
                                    style={{
                                      fontSize: 'var(--text-base)',
                                      fontWeight: 'var(--font-weight-semibold)',
                                      color: 'var(--primary)',
                                      marginBottom: 'var(--space-1)',
                                    }}
                                  >
                                    {step.page}
                                  </p>
                                  <p
                                    style={{
                                      fontSize: 'var(--text-sm)',
                                      color: 'var(--foreground)',
                                    }}
                                  >
                                    {step.action}
                                  </p>
                                </div>
                              </div>
                            </div>

                            {/* Arrow between steps */}
                            {stepIndex < flow.steps.length - 1 && (
                              <div className="flex justify-center" style={{ margin: 'var(--space-2) 0' }}>
                                <ArrowRight
                                  className="w-6 h-6 rotate-90"
                                  style={{ color: 'var(--muted-foreground)' }}
                                />
                              </div>
                            )}
                          </div>
                        ))}
                      </div>

                      {/* Pages Tags */}
                      <div className="flex flex-wrap gap-2" style={{ marginTop: 'var(--space-6)', paddingTop: 'var(--space-6)', borderTop: '1px solid var(--border)' }}>
                        <span
                          style={{
                            fontSize: 'var(--text-sm)',
                            color: 'var(--muted-foreground)',
                            marginRight: 'var(--space-2)',
                          }}
                        >
                          Pages:
                        </span>
                        {flow.pages.map((page) => (
                          <span
                            key={page}
                            className="px-3 py-1 rounded-full"
                            style={{
                              background: 'var(--primary-lighter)',
                              color: 'var(--primary)',
                              fontSize: 'var(--text-sm)',
                              fontWeight: 'var(--font-weight-medium)',
                            }}
                          >
                            {page}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Export Note */}
          <div
            className="p-6 rounded-2xl border"
            style={{
              background: 'rgba(248, 176, 68, 0.05)',
              borderColor: 'var(--accent)',
              marginTop: 'var(--space-12)',
            }}
          >
            <h3
              style={{
                fontSize: 'var(--text-lg)',
                fontWeight: 'var(--font-weight-semibold)',
                color: 'var(--foreground)',
                marginBottom: 'var(--space-2)',
              }}
            >
              💡 Comment documenter dans Figma
            </h3>
            <p
              style={{
                fontSize: 'var(--text-base)',
                color: 'var(--muted-foreground)',
                lineHeight: 'var(--leading-relaxed)',
                marginBottom: 'var(--space-4)',
              }}
            >
              Pour importer ces flows dans Figma Design :
            </p>
            <ul style={{ display: 'grid', gap: 'var(--space-2)' }}>
              {[
                'Prenez des screenshots de chaque page de l\'application',
                'Créez des frames dans Figma pour chaque page',
                'Utilisez les flows ci-dessus pour créer des connections entre frames',
                'Ajoutez des annotations avec les actions utilisateurs',
                'Créez des prototypes cliquables pour tester les parcours',
              ].map((tip, idx) => (
                <li key={idx} className="flex items-start gap-3">
                  <div
                    className="w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0"
                    style={{ background: 'var(--accent)' }}
                  />
                  <span
                    style={{
                      fontSize: 'var(--text-sm)',
                      color: 'var(--foreground)',
                      flex: 1,
                    }}
                  >
                    {tip}
                  </span>
                </li>
              ))}
            </ul>
          </div>

        </div>
      </div>
    </div>
  );
}
