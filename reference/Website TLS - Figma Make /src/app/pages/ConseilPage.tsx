import { Button } from "../components/ui/button";
import { Card, CardContent } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { 
  Search,
  Users2,
  Shield,
  GraduationCap,
  Rocket,
  TrendingUp,
  Brain,
  Lock,
  ArrowRight,
  Lightbulb,
  Target,
  CheckCircle2,
  Building2,
  School,
  Sparkles,
  Zap,
  ChevronRight
} from "lucide-react";

export default function ConseilPage() {
  
  const methodology = [
    {
      number: "01",
      title: "Cadrage & Audit",
      description: "Analyse de l'existant et des objectifs business.",
      icon: Search
    },
    {
      number: "02",
      title: "Acculturation",
      description: "Conférences et ateliers pour embarquer les équipes et lever les freins.",
      icon: Users2
    },
    {
      number: "03",
      title: "Tech Stack & Sécurité",
      description: "Sélection des outils IA adaptés et sécurisation des données.",
      icon: Shield
    },
    {
      number: "04",
      title: "Upskilling",
      description: "Formation des référents et des équipes opérationnelles.",
      icon: GraduationCap
    },
    {
      number: "05",
      title: "Pilote (POC)",
      description: "Lancement d'un premier projet test sur un périmètre restreint.",
      icon: Rocket
    },
    {
      number: "06",
      title: "Scale & Industrialisation",
      description: "Déploiement généralisé et mesure de l'impact (ROI).",
      icon: TrendingUp
    }
  ];

  const expertise = [
    {
      icon: Brain,
      title: "Double Expertise",
      description: "Ingénieurs pédagogiques avant techniciens. La technologie sert la pédagogie."
    },
    {
      icon: Rocket,
      title: "Terrain",
      description: "Nous utilisons ces outils quotidiennement pour notre propre Académie et nos productions."
    },
    {
      icon: Lock,
      title: "Sécurité",
      description: "Nous connaissons les enjeux RGPD et confidentialité des données liés à l'usage de l'IA."
    }
  ];

  const profiles = [
    {
      icon: Building2,
      title: "Département L&D",
      description: "Moderniser l'appareil de formation interne",
      benefits: [
        {
          title: "Content Factory IA",
          subtitle: "Transformez vos équipes en producteurs autonomes de contenus pédagogiques."
        },
        {
          title: "Charte d'usage IA",
          subtitle: "Cadre de gouvernance pour un usage responsable de l'IA."
        },
        {
          title: "Optimisation budgets",
          subtitle: "Réinternaliser la production grâce à l'IA et réduire la dépendance aux prestataires."
        }
      ]
    },
    {
      icon: School,
      title: "Organisme de Formation",
      description: "Rentabilité, Conformité & Vente",
      benefits: [
        {
          title: "Qualiopi Augmenté",
          subtitle: "Automatisation de la veille réglementaire et de la gestion documentaire via l'IA."
        },
        {
          title: "Refonte de l'Offre",
          subtitle: "Intégrer l'IA dans vos parcours pour justifier des tarifs premium."
        },
        {
          title: "Efficacité Commerciale",
          subtitle: "Aide à la rédaction de propositions pédagogiques gagnantes."
        }
      ]
    }
  ];

  return (
    <div style={{ backgroundColor: 'var(--background)' }}>
      
      {/* HERO SECTION - Glassmorphism + Gradient dynamique */}
      <section className="relative overflow-hidden" style={{ 
        minHeight: '600px',
        background: 'linear-gradient(135deg, rgba(248, 176, 68, 0.03) 0%, rgba(248, 176, 68, 0.08) 50%, rgba(248, 176, 68, 0.03) 100%)',
        backgroundSize: '200% 200%',
        animation: 'gradientShift 15s ease infinite'
      }}>
        <style>{`
          @keyframes gradientShift {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
          }
        `}</style>

        {/* Liquid glass blobs animés */}
        <div className="absolute top-0 right-0 w-[600px] h-[600px] opacity-30 blur-3xl"
          style={{ 
            background: 'radial-gradient(circle, var(--accent-300) 0%, transparent 70%)',
            animation: 'float 20s ease-in-out infinite'
          }} />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] opacity-20 blur-3xl"
          style={{ 
            background: 'radial-gradient(circle, var(--accent-200) 0%, transparent 70%)',
            animation: 'float 15s ease-in-out infinite reverse'
          }} />

        <style>{`
          @keyframes float {
            0%, 100% { transform: translate(0, 0) scale(1); }
            50% { transform: translate(30px, -30px) scale(1.1); }
          }
        `}</style>

        <div className="relative max-w-7xl mx-auto px-8 py-32">
          <div className="text-center max-w-4xl mx-auto">
            
            {/* Badge glassmorphism */}
            <div className="inline-flex items-center gap-2 px-6 py-3 mb-8 rounded-full backdrop-blur-xl"
              style={{ 
                background: 'rgba(255, 255, 255, 0.8)',
                border: '1px solid rgba(248, 176, 68, 0.2)',
                boxShadow: '0 8px 32px rgba(248, 176, 68, 0.15)'
              }}>
              <Lightbulb className="w-4 h-4" style={{ color: 'var(--accent-700)' }} />
              <span style={{ 
                fontFamily: 'var(--font-body)', 
                fontSize: 'var(--text-xs)',
                fontWeight: 'var(--font-weight-bold)',
                color: 'var(--accent-700)',
                letterSpacing: '0.1em',
                textTransform: 'uppercase'
              }}>
                Pôle Stratégique
              </span>
            </div>
            
            {/* Titre principal */}
            <h1 
              className="mb-8"
              style={{ 
                fontFamily: 'var(--font-display)', 
                fontSize: 'clamp(2.5rem, 6vw, 4.5rem)', 
                lineHeight: 'var(--leading-tight)',
                fontWeight: 'var(--font-weight-bold)',
                color: 'var(--neutral-900)'
              }}
            >
              Ne subissez pas l'IA.{' '}
              <span style={{ 
                background: 'linear-gradient(135deg, var(--accent-600) 0%, var(--accent-400) 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text'
              }}>
                Structurez-la.
              </span>
            </h1>
            
            {/* Description */}
            <p 
              className="mb-12 max-w-3xl mx-auto"
              style={{ 
                fontFamily: 'var(--font-body)', 
                fontSize: 'var(--text-xl)', 
                lineHeight: 'var(--leading-relaxed)',
                color: 'var(--neutral-800)'
              }}
            >
              Accompagnement stratégique pour Départements L&D et Organismes de Formation. 
              Sécurisez votre transition, garantissez votre conformité et maximisez votre ROI.
            </p>
            
            {/* CTA */}
            <Button 
              size="lg"
              className="group shadow-2xl hover:shadow-accent-500/50 transition-all duration-500 hover:scale-105"
              style={{ 
                background: 'linear-gradient(135deg, var(--accent-500) 0%, var(--accent-600) 100%)',
                color: 'white',
                fontFamily: 'var(--font-body)',
                fontSize: 'var(--text-lg)',
                fontWeight: 'var(--font-weight-semibold)',
                padding: '1.5rem 3rem',
                borderRadius: 'var(--radius-xl)',
                border: 'none'
              }}
            >
              Réserver un Audit de Maturité
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Button>

            {/* Trust indicators */}
            <div className="flex items-center justify-center gap-8 mt-12 flex-wrap" style={{ color: 'var(--neutral-700)' }}>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5" style={{ color: 'var(--accent-600)' }} />
                <span style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--text-sm)' }}>
                  Premier échange gratuit
                </span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5" style={{ color: 'var(--accent-600)' }} />
                <span style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--text-sm)' }}>
                  Audit personnalisé
                </span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5" style={{ color: 'var(--accent-600)' }} />
                <span style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--text-sm)' }}>
                  Sans engagement
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION AUDIT - Glassmorphism Card Highlight */}
      <section className="py-32">
        <div className="max-w-5xl mx-auto px-8">
          
          {/* Main Card - Apple Liquid Glass Style */}
          <div 
            className="relative group overflow-hidden"
            style={{ 
              borderRadius: 'var(--radius-2xl)',
              background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.9) 0%, rgba(255, 255, 255, 0.7) 100%)',
              backdropFilter: 'blur(20px)',
              WebkitBackdropFilter: 'blur(20px)',
              border: '1px solid rgba(248, 176, 68, 0.2)',
              boxShadow: '0 25px 50px -12px rgba(248, 176, 68, 0.25), inset 0 1px 0 rgba(255, 255, 255, 0.6)'
            }}
          >
            {/* Accent bar avec gradient */}
            <div 
              className="absolute top-0 left-0 right-0 h-1.5"
              style={{ background: 'linear-gradient(90deg, var(--accent-400) 0%, var(--accent-600) 50%, var(--accent-400) 100%)' }}
            />
            
            {/* Glow effect au hover */}
            <div 
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700"
              style={{ 
                background: 'radial-gradient(circle at center, rgba(248, 176, 68, 0.1) 0%, transparent 70%)',
                pointerEvents: 'none'
              }}
            />
            
            <div className="relative p-12 md:p-16">
              
              {/* Icon avec glow */}
              <div className="flex justify-center mb-8">
                <div 
                  className="relative"
                  style={{
                    width: '96px',
                    height: '96px',
                    borderRadius: 'var(--radius-2xl)',
                    background: 'linear-gradient(135deg, rgba(248, 176, 68, 0.1) 0%, rgba(248, 176, 68, 0.05) 100%)',
                    border: '1px solid rgba(248, 176, 68, 0.2)',
                    backdropFilter: 'blur(10px)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: '0 8px 32px rgba(248, 176, 68, 0.2)'
                  }}
                >
                  <Search className="w-12 h-12" style={{ color: 'var(--accent-600)' }} />
                  
                  {/* Glow ring */}
                  <div 
                    className="absolute inset-0 rounded-2xl"
                    style={{
                      background: 'linear-gradient(135deg, rgba(248, 176, 68, 0.3), transparent)',
                      filter: 'blur(8px)',
                      zIndex: -1
                    }}
                  />
                </div>
              </div>

              {/* Titre */}
              <h2 
                className="text-center mb-6"
                style={{ 
                  fontFamily: 'var(--font-display)', 
                  fontSize: 'clamp(2rem, 4vw, 3rem)', 
                  lineHeight: 'var(--leading-tight)',
                  fontWeight: 'var(--font-weight-bold)',
                  color: 'var(--neutral-900)'
                }}
              >
                L'Audit de Maturité IA & Pédagogie
              </h2>
              
              <p 
                className="text-center mb-8"
                style={{ 
                  fontFamily: 'var(--font-body)', 
                  fontSize: 'var(--text-xl)', 
                  lineHeight: 'var(--leading-relaxed)',
                  color: 'var(--neutral-700)'
                }}
              >
                Avant de déployer, il faut cartographier.
              </p>

              <p 
                className="mb-10 text-center max-w-3xl mx-auto"
                style={{ 
                  fontFamily: 'var(--font-body)', 
                  fontSize: 'var(--text-lg)', 
                  lineHeight: 'var(--leading-relaxed)',
                  color: 'var(--neutral-700)'
                }}
              >
                Nous analysons vos outils actuels, les compétences de vos équipes et vos processus de production
                pour définir votre feuille de route 2026.
              </p>

              {/* Highlight box */}
              <div 
                className="mb-10 p-8 text-center"
                style={{ 
                  background: 'linear-gradient(135deg, rgba(248, 176, 68, 0.08) 0%, rgba(248, 176, 68, 0.04) 100%)',
                  border: '2px solid rgba(248, 176, 68, 0.3)',
                  borderRadius: 'var(--radius-xl)',
                  backdropFilter: 'blur(10px)'
                }}
              >
                <Sparkles className="w-6 h-6 mx-auto mb-4" style={{ color: 'var(--accent-600)' }} />
                <p 
                  style={{ 
                    fontFamily: 'var(--font-body)', 
                    fontSize: 'var(--text-xl)', 
                    lineHeight: 'var(--leading-relaxed)',
                    color: 'var(--neutral-900)',
                    fontWeight: 'var(--font-weight-semibold)'
                  }}
                >
                  Le coût de cet audit est{' '}
                  <span style={{ 
                    background: 'linear-gradient(135deg, var(--accent-600) 0%, var(--accent-500) 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text'
                  }}>
                    100% déduit
                  </span>
                  {' '}si vous signez l'accompagnement au déploiement.
                </p>
              </div>

              {/* CTA */}
              <div className="text-center">
                <Button 
                  size="lg"
                  className="group shadow-2xl hover:shadow-accent-500/50 transition-all duration-500 hover:scale-105"
                  style={{ 
                    background: 'linear-gradient(135deg, var(--accent-500) 0%, var(--accent-600) 100%)',
                    color: 'white',
                    fontFamily: 'var(--font-body)',
                    fontSize: 'var(--text-lg)',
                    fontWeight: 'var(--font-weight-semibold)',
                    padding: '1.25rem 2.5rem',
                    borderRadius: 'var(--radius-xl)',
                    border: 'none'
                  }}
                >
                  Demander un chiffrage d'audit
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION MÉTHODOLOGIE - Grid avec cards glassmorphism */}
      <section className="py-32" style={{ 
        background: 'linear-gradient(180deg, rgba(248, 176, 68, 0.02) 0%, rgba(255, 255, 255, 0) 100%)'
      }}>
        <div className="max-w-7xl mx-auto px-8">
          
          {/* Header */}
          <div className="text-center mb-20">
            <Badge 
              className="mb-6 px-6 py-3 backdrop-blur-xl"
              style={{ 
                background: 'rgba(255, 255, 255, 0.8)',
                border: '1px solid rgba(248, 176, 68, 0.2)',
                boxShadow: '0 4px 16px rgba(248, 176, 68, 0.1)',
                fontFamily: 'var(--font-body)', 
                fontSize: 'var(--text-xs)',
                fontWeight: 'var(--font-weight-bold)',
                color: 'var(--accent-700)',
                letterSpacing: '0.1em'
              }}
            >
              <Target className="w-4 h-4 mr-2 inline" />
              NOTRE MÉTHODE
            </Badge>
            
            <h2 
              className="mb-6"
              style={{ 
                fontFamily: 'var(--font-display)', 
                fontSize: 'clamp(2rem, 4vw, 3rem)', 
                lineHeight: 'var(--leading-tight)',
                fontWeight: 'var(--font-weight-bold)',
                color: 'var(--neutral-900)'
              }}
            >
              Une méthode de déploiement éprouvée
            </h2>
            
            <p 
              style={{ 
                fontFamily: 'var(--font-body)', 
                fontSize: 'var(--text-xl)', 
                lineHeight: 'var(--leading-relaxed)',
                color: 'var(--neutral-700)'
              }}
            >
              Nous ne faisons pas d'improvisation.
            </p>
          </div>

          {/* Grid méthodologie */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {methodology.map((step, index) => {
              const Icon = step.icon;
              return (
                <div 
                  key={index}
                  className="group relative overflow-hidden"
                  style={{ 
                    background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.9) 0%, rgba(255, 255, 255, 0.7) 100%)',
                    backdropFilter: 'blur(20px)',
                    WebkitBackdropFilter: 'blur(20px)',
                    border: '1px solid rgba(248, 176, 68, 0.15)',
                    borderRadius: 'var(--radius-2xl)',
                    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.05)',
                    transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
                    cursor: 'pointer'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-8px)';
                    e.currentTarget.style.boxShadow = '0 20px 60px rgba(248, 176, 68, 0.2)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = '0 8px 32px rgba(0, 0, 0, 0.05)';
                  }}
                >
                  {/* Glow effect */}
                  <div 
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700"
                    style={{ 
                      background: 'radial-gradient(circle at top, rgba(248, 176, 68, 0.1) 0%, transparent 70%)',
                      pointerEvents: 'none'
                    }}
                  />

                  <div className="relative p-8">
                    {/* Number badge */}
                    <div 
                      className="inline-flex items-center justify-center w-12 h-12 rounded-xl mb-6"
                      style={{ 
                        background: 'linear-gradient(135deg, var(--accent-500) 0%, var(--accent-600) 100%)',
                        boxShadow: '0 4px 16px rgba(248, 176, 68, 0.3)'
                      }}
                    >
                      <span 
                        style={{ 
                          fontFamily: 'var(--font-display)', 
                          fontSize: 'var(--text-base)',
                          fontWeight: 'var(--font-weight-bold)',
                          color: 'white'
                        }}
                      >
                        {step.number}
                      </span>
                    </div>

                    {/* Icon */}
                    <div 
                      className="inline-flex items-center justify-center w-12 h-12 rounded-xl mb-6 ml-2"
                      style={{ 
                        background: 'rgba(248, 176, 68, 0.1)',
                        border: '1px solid rgba(248, 176, 68, 0.2)'
                      }}
                    >
                      <Icon className="w-6 h-6" style={{ color: 'var(--accent-600)' }} />
                    </div>
                    
                    {/* Title */}
                    <h3 
                      className="mb-4"
                      style={{ 
                        fontFamily: 'var(--font-display)', 
                        fontSize: 'var(--text-xl)', 
                        lineHeight: 'var(--leading-tight)',
                        fontWeight: 'var(--font-weight-bold)',
                        color: 'var(--neutral-900)'
                      }}
                    >
                      {step.title}
                    </h3>
                    
                    {/* Description */}
                    <p 
                      style={{ 
                        fontFamily: 'var(--font-body)', 
                        fontSize: 'var(--text-base)', 
                        lineHeight: 'var(--leading-relaxed)',
                        color: 'var(--neutral-700)'
                      }}
                    >
                      {step.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* SECTION PROFILS - Premium cards */}
      <section className="py-32">
        <div className="max-w-7xl mx-auto px-8">
          
          {/* Header */}
          <div className="text-center mb-20">
            <h2 
              className="mb-6"
              style={{ 
                fontFamily: 'var(--font-display)', 
                fontSize: 'clamp(2rem, 4vw, 3rem)', 
                lineHeight: 'var(--leading-tight)',
                fontWeight: 'var(--font-weight-bold)',
                color: 'var(--neutral-900)'
              }}
            >
              Une approche adaptée à votre structure
            </h2>
          </div>

          {/* Grid profils */}
          <div className="grid md:grid-cols-2 gap-8">
            {profiles.map((profile, index) => {
              const Icon = profile.icon;
              return (
                <div 
                  key={index}
                  className="group relative overflow-hidden"
                  style={{ 
                    background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(255, 255, 255, 0.8) 100%)',
                    backdropFilter: 'blur(20px)',
                    WebkitBackdropFilter: 'blur(20px)',
                    border: '1px solid rgba(248, 176, 68, 0.15)',
                    borderRadius: 'var(--radius-2xl)',
                    boxShadow: '0 12px 48px rgba(0, 0, 0, 0.08)',
                    transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-4px)';
                    e.currentTarget.style.boxShadow = '0 24px 60px rgba(248, 176, 68, 0.2)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = '0 12px 48px rgba(0, 0, 0, 0.08)';
                  }}
                >
                  {/* Gradient accent au top */}
                  <div 
                    style={{ 
                      height: '4px',
                      background: 'linear-gradient(90deg, var(--accent-400) 0%, var(--accent-600) 100%)'
                    }}
                  />

                  {/* Glow effect */}
                  <div 
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700"
                    style={{ 
                      background: 'radial-gradient(circle at top right, rgba(248, 176, 68, 0.08) 0%, transparent 60%)',
                      pointerEvents: 'none'
                    }}
                  />

                  <div className="relative p-10">
                    {/* Icon */}
                    <div 
                      className="inline-flex items-center justify-center w-20 h-20 rounded-2xl mb-8"
                      style={{ 
                        background: 'linear-gradient(135deg, rgba(248, 176, 68, 0.1) 0%, rgba(248, 176, 68, 0.05) 100%)',
                        border: '1px solid rgba(248, 176, 68, 0.2)',
                        boxShadow: '0 8px 24px rgba(248, 176, 68, 0.15)'
                      }}
                    >
                      <Icon className="w-10 h-10" style={{ color: 'var(--accent-600)' }} />
                    </div>
                    
                    {/* Title */}
                    <h3 
                      className="mb-4"
                      style={{ 
                        fontFamily: 'var(--font-display)', 
                        fontSize: 'var(--text-2xl)', 
                        lineHeight: 'var(--leading-tight)',
                        fontWeight: 'var(--font-weight-bold)',
                        color: 'var(--neutral-900)'
                      }}
                    >
                      {profile.title}
                    </h3>
                    
                    {/* Description */}
                    <p 
                      className="mb-8"
                      style={{ 
                        fontFamily: 'var(--font-body)', 
                        fontSize: 'var(--text-lg)', 
                        lineHeight: 'var(--leading-relaxed)',
                        color: 'var(--neutral-700)'
                      }}
                    >
                      {profile.description}
                    </p>

                    {/* Benefits */}
                    <div className="space-y-6 mb-10">
                      {profile.benefits.map((benefit, idx) => (
                        <div key={idx} className="flex gap-4">
                          <div className="flex-shrink-0 mt-1">
                            <CheckCircle2 className="w-6 h-6" style={{ color: 'var(--accent-600)' }} />
                          </div>
                          <div>
                            <p 
                              style={{ 
                                fontFamily: 'var(--font-body)', 
                                fontSize: 'var(--text-base)',
                                fontWeight: 'var(--font-weight-semibold)',
                                color: 'var(--neutral-900)',
                                marginBottom: '0.25rem'
                              }}
                            >
                              {benefit.title}
                            </p>
                            <p 
                              style={{ 
                                fontFamily: 'var(--font-body)', 
                                fontSize: 'var(--text-sm)', 
                                lineHeight: 'var(--leading-relaxed)',
                                color: 'var(--neutral-600)'
                              }}
                            >
                              {benefit.subtitle}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* CTA */}
                    <Button 
                      className="group w-full shadow-lg hover:shadow-xl transition-all duration-300"
                      style={{ 
                        background: 'linear-gradient(135deg, var(--accent-500) 0%, var(--accent-600) 100%)',
                        color: 'white',
                        fontFamily: 'var(--font-body)',
                        fontSize: 'var(--text-base)',
                        fontWeight: 'var(--font-weight-semibold)',
                        borderRadius: 'var(--radius-xl)',
                        padding: '1rem 1.5rem',
                        border: 'none'
                      }}
                    >
                      Discuter de mon projet
                      <ChevronRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* SECTION EXPERTISE - 3 colonnes */}
      <section className="py-32" style={{ 
        background: 'linear-gradient(180deg, rgba(248, 176, 68, 0.02) 0%, rgba(255, 255, 255, 0) 100%)'
      }}>
        <div className="max-w-7xl mx-auto px-8">
          
          {/* Header */}
          <div className="text-center mb-20">
            <h2 
              className="mb-6"
              style={{ 
                fontFamily: 'var(--font-display)', 
                fontSize: 'clamp(2rem, 4vw, 3rem)', 
                lineHeight: 'var(--leading-tight)',
                fontWeight: 'var(--font-weight-bold)',
                color: 'var(--neutral-900)'
              }}
            >
              Pourquoi nous confier votre stratégie ?
            </h2>
          </div>

          {/* Grid expertise */}
          <div className="grid md:grid-cols-3 gap-8">
            {expertise.map((item, index) => {
              const Icon = item.icon;
              return (
                <div 
                  key={index}
                  className="group text-center"
                  style={{ 
                    background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.9) 0%, rgba(255, 255, 255, 0.7) 100%)',
                    backdropFilter: 'blur(20px)',
                    WebkitBackdropFilter: 'blur(20px)',
                    border: '1px solid rgba(248, 176, 68, 0.15)',
                    borderRadius: 'var(--radius-2xl)',
                    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.05)',
                    padding: '3rem 2rem',
                    transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-8px)';
                    e.currentTarget.style.boxShadow = '0 20px 60px rgba(248, 176, 68, 0.15)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = '0 8px 32px rgba(0, 0, 0, 0.05)';
                  }}
                >
                  {/* Icon avec glow */}
                  <div className="flex justify-center mb-6">
                    <div 
                      className="relative"
                      style={{
                        width: '80px',
                        height: '80px',
                        borderRadius: '50%',
                        background: 'linear-gradient(135deg, rgba(248, 176, 68, 0.1) 0%, rgba(248, 176, 68, 0.05) 100%)',
                        border: '1px solid rgba(248, 176, 68, 0.2)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        boxShadow: '0 8px 24px rgba(248, 176, 68, 0.2)'
                      }}
                    >
                      <Icon className="w-10 h-10" style={{ color: 'var(--accent-600)' }} />
                    </div>
                  </div>

                  <h3 
                    className="mb-4"
                    style={{ 
                      fontFamily: 'var(--font-display)', 
                      fontSize: 'var(--text-xl)', 
                      lineHeight: 'var(--leading-tight)',
                      fontWeight: 'var(--font-weight-bold)',
                      color: 'var(--neutral-900)'
                    }}
                  >
                    {item.title}
                  </h3>
                  
                  <p 
                    style={{ 
                      fontFamily: 'var(--font-body)', 
                      fontSize: 'var(--text-base)', 
                      lineHeight: 'var(--leading-relaxed)',
                      color: 'var(--neutral-700)'
                    }}
                  >
                    {item.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* SECTION CTA FINALE - Liquid glass premium */}
      <section className="py-32 relative overflow-hidden">
        {/* Animated background */}
        <div className="absolute inset-0" style={{ 
          background: 'linear-gradient(135deg, var(--accent-500) 0%, var(--accent-600) 100%)'
        }} />
        
        {/* Animated blobs */}
        <div className="absolute top-0 right-0 w-[600px] h-[600px] opacity-20 blur-3xl"
          style={{ 
            background: 'radial-gradient(circle, white 0%, transparent 70%)',
            animation: 'float 20s ease-in-out infinite'
          }} />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] opacity-20 blur-3xl"
          style={{ 
            background: 'radial-gradient(circle, white 0%, transparent 70%)',
            animation: 'float 15s ease-in-out infinite reverse'
          }} />

        <div className="relative max-w-4xl mx-auto px-8 text-center">
          
          {/* Icon décorative */}
          <div className="flex justify-center mb-8">
            <div 
              className="backdrop-blur-xl rounded-2xl flex items-center justify-center"
              style={{ 
                width: '80px',
                height: '80px',
                background: 'rgba(255, 255, 255, 0.15)',
                border: '1px solid rgba(255, 255, 255, 0.3)',
                boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)'
              }}
            >
              <Target className="w-10 h-10" style={{ color: 'white' }} />
            </div>
          </div>

          {/* Titre */}
          <h2 
            className="mb-8"
            style={{ 
              fontFamily: 'var(--font-display)', 
              fontSize: 'clamp(2rem, 5vw, 3.5rem)', 
              lineHeight: 'var(--leading-tight)',
              fontWeight: 'var(--font-weight-bold)',
              color: 'white'
            }}
          >
            Prêt à transformer votre structure ?
          </h2>
          
          {/* Description */}
          <p 
            className="mb-12 max-w-2xl mx-auto"
            style={{ 
              fontFamily: 'var(--font-body)', 
              fontSize: 'var(--text-xl)', 
              lineHeight: 'var(--leading-relaxed)',
              color: 'rgba(255, 255, 255, 0.95)'
            }}
          >
            Discutons de vos objectifs et voyons comment structurer votre transition IA de manière sécurisée et efficace.
          </p>
          
          {/* CTA */}
          <Button 
            size="lg"
            className="shadow-2xl hover:shadow-white/50 transition-all duration-500 hover:scale-105"
            style={{ 
              background: 'white',
              color: 'var(--accent-700)',
              fontFamily: 'var(--font-body)',
              fontSize: 'var(--text-lg)',
              fontWeight: 'var(--font-weight-semibold)',
              padding: '1.5rem 3rem',
              borderRadius: 'var(--radius-xl)',
              border: 'none'
            }}
          >
            Prendre rendez-vous avec un consultant
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>

          {/* Trust indicators */}
          <div className="flex items-center justify-center gap-8 mt-12 flex-wrap" style={{ color: 'white' }}>
            <div className="flex items-center gap-2">
              <Zap className="w-5 h-5" />
              <span style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--text-sm)' }}>
                Réponse sous 24h
              </span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5" />
              <span style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--text-sm)' }}>
                Devis personnalisé
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Shield className="w-5 h-5" />
              <span style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--text-sm)' }}>
                NDA signé
              </span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
