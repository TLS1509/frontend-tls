import { Button } from "../components/ui/button";
import { Card, CardContent } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { 
  Smartphone,
  Clock,
  Users,
  MessageSquare,
  Brain,
  Zap,
  ArrowRight,
  CheckCircle2,
  Cpu,
  Sparkles,
  TrendingUp
} from "lucide-react";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";

export default function TechPage() {
  
  const features = [
    {
      icon: Smartphone,
      title: "Mobile First",
      description: "Une expérience fluide, pensée pour le smartphone, loin des LMS lourds du marché."
    },
    {
      icon: Clock,
      title: "Micro-Learning",
      description: "Une architecture conçue pour des contenus courts (5-10 min) et impactants."
    },
    {
      icon: Users,
      title: "Social Learning",
      description: "Des espaces d'échange intégrés pour apprendre avec ses pairs."
    }
  ];

  const labInnovations = [
    {
      title: "Assistants Contextuels",
      description: "Des agents IA capables de répondre aux questions des apprenants en temps réel, basés sur vos documents internes (RAG).",
      icon: MessageSquare
    },
    {
      title: "Génération Dynamique",
      description: "Des parcours qui s'adaptent au niveau de l'apprenant en temps réel grâce à l'IA.",
      icon: Brain
    }
  ];

  const roadmap = [
    {
      phase: "Phase 1",
      status: "Actuel",
      title: "Plateforme de Parcours",
      description: "Support exclusif de nos formations et de l'Académie.",
    },
    {
      phase: "Phase 2",
      status: "Mai 2026",
      title: "On-Demand",
      description: "Ouverture de la plateforme en accès SaaS pour les entreprises (Abonnement catalogue).",
    },
    {
      phase: "Phase 3",
      status: "Fin 2026",
      title: "Workflow Learning",
      description: "Intégration des agents IA directement dans les outils métiers (Slack, Teams, Notion).",
    }
  ];

  return (
    <div className="min-h-screen" style={{ background: 'var(--bg-gradient-neutral-subtle)', backgroundColor: '#ffffff' }}>
      
      {/* 1. HERO SECTION - Bleu clair */}
      <section className="relative overflow-hidden" style={{ 
        background: 'linear-gradient(180deg, var(--primary-50) 0%, #ffffff 100%)'
      }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32">
          <div className="text-center max-w-4xl mx-auto">
            {/* Badge */}
            <Badge 
              className="mb-6 px-4 py-2 bg-white border shadow-sm"
              style={{ 
                fontFamily: 'var(--font-body)', 
                fontSize: 'var(--text-xs)',
                fontWeight: 'var(--font-weight-semibold)',
                color: 'var(--primary-700)',
                borderColor: 'var(--primary-200)',
                letterSpacing: '0.05em'
              }}
            >
              <Cpu className="w-3 h-3 mr-2 inline" />
              R&D ET INNOVATION
            </Badge>
            
            {/* Titre */}
            <h1 
              className="mb-6 text-center"
              style={{ 
                fontFamily: 'var(--font-display)', 
                fontSize: 'clamp(2.5rem, 6vw, 4.5rem)', 
                lineHeight: 'var(--leading-tight)',
                fontWeight: 'var(--font-weight-bold)',
                color: '#253B37'
              }}
            >
              Le futur de la formation est<br />
              <span style={{ 
                background: 'var(--gradient-primary)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text'
              }}>
                "Just-in-Time"
              </span>
            </h1>
            
            {/* Description */}
            <p 
              className="mb-10 max-w-3xl mx-auto"
              style={{ 
                fontFamily: 'var(--font-body)', 
                fontSize: 'var(--text-xl)', 
                lineHeight: 'var(--leading-relaxed)',
                color: '#253B37'
              }}
            >
              Nous ne construisons pas seulement des formations. Nous construisons l'outil qui permet de les consommer 
              au moment précis où vous en avez besoin.
            </p>
            
            {/* CTA */}
            <Button 
              size="lg"
              className="shadow-lg hover:shadow-xl transition-all duration-300"
              style={{ 
                background: 'var(--gradient-primary)',
                color: '#ffffff',
                fontFamily: 'var(--font-body)',
                fontSize: 'var(--text-lg)',
                fontWeight: 'var(--font-weight-semibold)',
                padding: '1.25rem 2.5rem',
                borderRadius: 'var(--radius-xl)'
              }}
            >
              Découvrir l'App
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </div>

        {/* Decorative gradient blobs */}
        <div className="absolute top-0 right-0 w-96 h-96 rounded-full blur-3xl opacity-20" style={{ background: 'var(--gradient-primary-radial)' }} />
        <div className="absolute bottom-0 left-0 w-96 h-96 rounded-full blur-3xl opacity-20" style={{ background: 'var(--gradient-primary-soft)' }} />
      </section>

      {/* 2. SECTION LEARNING APP */}
      <section className="py-20 md:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            
            {/* Texte */}
            <div>
              <Badge 
                className="mb-4 px-4 py-2 bg-white border shadow-sm"
                style={{ 
                  fontFamily: 'var(--font-body)', 
                  fontSize: 'var(--text-xs)',
                  fontWeight: 'var(--font-weight-semibold)',
                  color: 'var(--primary-700)',
                  borderColor: 'var(--primary-200)',
                  letterSpacing: '0.05em'
                }}
              >
                <Sparkles className="w-3 h-3 mr-2 inline" />
                PLATEFORME PROPRIÉTAIRE
              </Badge>
              
              <h2 
                className="mb-6"
                style={{ 
                  fontFamily: 'var(--font-display)', 
                  fontSize: 'clamp(2rem, 4vw, 3rem)', 
                  lineHeight: 'var(--leading-tight)',
                  fontWeight: 'var(--font-weight-bold)',
                  color: '#253B37'
                }}
              >
                Une Learning App propriétaire
              </h2>
              
              <p 
                className="mb-8"
                style={{ 
                  fontFamily: 'var(--font-body)', 
                  fontSize: 'var(--text-xl)', 
                  lineHeight: 'var(--leading-relaxed)',
                  color: '#253B37'
                }}
              >
                Pour garantir la meilleure expérience pédagogique, nous avons développé notre propre plateforme.
              </p>

              <div className="space-y-6 mb-8">
                {features.map((feature, index) => {
                  const Icon = feature.icon;
                  return (
                    <div key={index} className="flex gap-4">
                      <div 
                        className="w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0"
                        style={{ backgroundColor: 'var(--primary-50)' }}
                      >
                        <Icon className="w-6 h-6" style={{ color: 'var(--primary-600)' }} />
                      </div>
                      <div>
                        <h4 
                          className="mb-2"
                          style={{ 
                            fontFamily: 'var(--font-display)', 
                            fontSize: 'var(--text-lg)',
                            fontWeight: 'var(--font-weight-bold)',
                            color: '#253B37'
                          }}
                        >
                          {feature.title}
                        </h4>
                        <p 
                          style={{ 
                            fontFamily: 'var(--font-body)', 
                            fontSize: 'var(--text-base)', 
                            lineHeight: 'var(--leading-relaxed)',
                            color: '#253B37'
                          }}
                        >
                          {feature.description}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div 
                className="rounded-r-lg p-6 border-l-4"
                style={{ 
                  backgroundColor: 'var(--primary-50)',
                  borderColor: 'var(--primary-500)'
                }}
              >
                <p 
                  style={{ 
                    fontFamily: 'var(--font-body)', 
                    fontSize: 'var(--text-sm)', 
                    lineHeight: 'var(--leading-relaxed)',
                    color: 'var(--neutral-700)'
                  }}
                >
                  <strong style={{ color: '#253B37' }}>Note :</strong> Cette technologie propulse aujourd'hui 
                  "L'Académie L&D IA" et nos déploiements Intra-entreprise.
                </p>
              </div>
            </div>

            {/* Image */}
            <div className="relative">
              <div 
                className="absolute -inset-4 rounded-3xl opacity-20 blur-2xl"
                style={{ background: 'var(--gradient-primary)' }}
              />
              <ImageWithFallback 
                src="https://images.unsplash.com/photo-1605108222700-0d605d9ebafe?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2JpbGUlMjBhcHAlMjBpbnRlcmZhY2V8ZW58MXx8fHwxNzY2MDUxNTU5fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                alt="Learning App"
                className="relative rounded-2xl shadow-2xl"
                style={{ borderRadius: 'var(--radius-2xl)' }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* 3. SECTION LAB IA */}
      <section className="py-20 md:py-28" style={{ background: 'var(--bg-gradient-primary-subtle)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Header */}
          <div className="text-center mb-16">
            <Badge 
              className="mb-4 px-4 py-2 bg-white border shadow-sm"
              style={{ 
                fontFamily: 'var(--font-body)', 
                fontSize: 'var(--text-xs)',
                fontWeight: 'var(--font-weight-semibold)',
                color: 'var(--primary-700)',
                borderColor: 'var(--primary-200)',
                letterSpacing: '0.05em'
              }}
            >
              BACKEND INTELLIGENCE
            </Badge>
            <h2 
              className="mb-4"
              style={{ 
                fontFamily: 'var(--font-display)', 
                fontSize: 'clamp(2rem, 4vw, 3rem)', 
                lineHeight: 'var(--leading-tight)',
                fontWeight: 'var(--font-weight-bold)',
                color: '#253B37'
              }}
            >
              Au-delà du LMS : Le Moteur IA
            </h2>
            <p 
              className="max-w-3xl mx-auto"
              style={{ 
                fontFamily: 'var(--font-body)', 
                fontSize: 'var(--text-xl)', 
                lineHeight: 'var(--leading-relaxed)',
                color: '#253B37'
              }}
            >
              Notre équipe R&D travaille sur l'intégration native de l'IA dans le flux de travail.
            </p>
          </div>

          {/* Grid innovations */}
          <div className="grid md:grid-cols-2 gap-8">
            {labInnovations.map((innovation, index) => {
              const Icon = innovation.icon;
              return (
                <Card 
                  key={index}
                  className="bg-white border-2 shadow-sm hover:shadow-lg hover:border-primary/50 transition-all duration-300"
                  style={{ 
                    borderColor: 'var(--border)',
                    borderRadius: 'var(--radius-2xl)'
                  }}
                >
                  <CardContent className="p-8">
                    <div 
                      className="w-16 h-16 rounded-xl flex items-center justify-center mb-6"
                      style={{ backgroundColor: 'var(--primary-50)' }}
                    >
                      <Icon className="w-8 h-8" style={{ color: 'var(--primary-600)' }} />
                    </div>
                    <h3 
                      className="mb-4"
                      style={{ 
                        fontFamily: 'var(--font-display)', 
                        fontSize: 'var(--text-2xl)', 
                        lineHeight: 'var(--leading-tight)',
                        fontWeight: 'var(--font-weight-bold)',
                        color: '#253B37'
                      }}
                    >
                      {innovation.title}
                    </h3>
                    <p 
                      style={{ 
                        fontFamily: 'var(--font-body)', 
                        fontSize: 'var(--text-base)', 
                        lineHeight: 'var(--leading-relaxed)',
                        color: '#253B37'
                      }}
                    >
                      {innovation.description}
                    </p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* 4. SECTION ROADMAP */}
      <section className="py-20 md:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Header */}
          <div className="text-center mb-16">
            <Badge 
              className="mb-4 px-4 py-2 bg-white border shadow-sm"
              style={{ 
                fontFamily: 'var(--font-body)', 
                fontSize: 'var(--text-xs)',
                fontWeight: 'var(--font-weight-semibold)',
                color: 'var(--primary-700)',
                borderColor: 'var(--primary-200)',
                letterSpacing: '0.05em'
              }}
            >
              <TrendingUp className="w-3 h-3 mr-2 inline" />
              TEASING S2 2026
            </Badge>
            <h2 
              className="mb-4"
              style={{ 
                fontFamily: 'var(--font-display)', 
                fontSize: 'clamp(2rem, 4vw, 3rem)', 
                lineHeight: 'var(--leading-tight)',
                fontWeight: 'var(--font-weight-bold)',
                color: '#253B37'
              }}
            >
              Notre Roadmap
            </h2>
            <p 
              style={{ 
                fontFamily: 'var(--font-body)', 
                fontSize: 'var(--text-xl)', 
                lineHeight: 'var(--leading-relaxed)',
                color: '#253B37'
              }}
            >
              Montrer la dynamique d'évolution. Nous ne sommes pas statiques.
            </p>
          </div>

          {/* Timeline */}
          <div className="relative">
            {/* Ligne de connexion */}
            <div 
              className="hidden md:block absolute top-1/2 left-0 right-0 h-1 -translate-y-1/2 z-0"
              style={{ background: 'var(--gradient-primary)' }}
            />
            
            <div className="grid md:grid-cols-3 gap-8 relative z-10">
              {roadmap.map((phase, index) => (
                <Card 
                  key={index}
                  className="bg-white border-2 shadow-sm hover:shadow-lg transition-all duration-300"
                  style={{ 
                    borderColor: 'var(--border)',
                    borderRadius: 'var(--radius-2xl)'
                  }}
                >
                  <CardContent className="p-8">
                    {/* Numéro */}
                    <div 
                      className="w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4"
                      style={{ 
                        background: index === 0 ? 'var(--gradient-primary)' : 'var(--primary-100)',
                        color: index === 0 ? '#ffffff' : 'var(--primary-700)'
                      }}
                    >
                      <span 
                        style={{ 
                          fontFamily: 'var(--font-display)', 
                          fontSize: 'var(--text-lg)',
                          fontWeight: 'var(--font-weight-bold)'
                        }}
                      >
                        {index + 1}
                      </span>
                    </div>
                    
                    {/* Badge status */}
                    <Badge 
                      className="mb-4 mx-auto block w-fit"
                      style={{ 
                        fontFamily: 'var(--font-body)', 
                        fontSize: 'var(--text-xs)',
                        fontWeight: 'var(--font-weight-semibold)',
                        backgroundColor: index === 0 ? 'var(--primary-500)' : 'var(--primary-100)',
                        color: index === 0 ? '#ffffff' : 'var(--primary-700)'
                      }}
                    >
                      {phase.status}
                    </Badge>
                    
                    {/* Titre */}
                    <h3 
                      className="text-center mb-3"
                      style={{ 
                        fontFamily: 'var(--font-display)', 
                        fontSize: 'var(--text-xl)', 
                        lineHeight: 'var(--leading-tight)',
                        fontWeight: 'var(--font-weight-bold)',
                        color: '#253B37'
                      }}
                    >
                      {phase.title}
                    </h3>
                    
                    {/* Description */}
                    <p 
                      className="text-center mb-4"
                      style={{ 
                        fontFamily: 'var(--font-body)', 
                        fontSize: 'var(--text-base)', 
                        lineHeight: 'var(--leading-relaxed)',
                        color: '#253B37'
                      }}
                    >
                      {phase.description}
                    </p>
                    
                    {index === 0 && (
                      <div className="flex items-center justify-center gap-2 mt-4" style={{ color: 'var(--primary-600)' }}>
                        <CheckCircle2 className="w-4 h-4" />
                        <span 
                          style={{ 
                            fontFamily: 'var(--font-body)', 
                            fontSize: 'var(--text-sm)',
                            fontWeight: 'var(--font-weight-semibold)'
                          }}
                        >
                          En production
                        </span>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Vision 2027 */}
          <div className="mt-16 flex justify-center">
            <div 
              className="inline-flex flex-col sm:flex-row gap-6 rounded-2xl p-8 items-center max-w-3xl"
              style={{ 
                backgroundColor: 'var(--primary-50)',
                borderRadius: 'var(--radius-2xl)'
              }}
            >
              <div 
                className="w-16 h-16 rounded-full flex items-center justify-center flex-shrink-0"
                style={{ backgroundColor: 'var(--primary-500)' }}
              >
                <Zap className="w-8 h-8 text-white" />
              </div>
              <div className="text-left">
                <h4 
                  className="mb-2"
                  style={{ 
                    fontFamily: 'var(--font-display)', 
                    fontSize: 'var(--text-xl)',
                    fontWeight: 'var(--font-weight-bold)',
                    color: '#253B37'
                  }}
                >
                  Vision 2027 et au-delà
                </h4>
                <p 
                  style={{ 
                    fontFamily: 'var(--font-body)', 
                    fontSize: 'var(--text-base)', 
                    lineHeight: 'var(--leading-relaxed)',
                    color: 'var(--neutral-600)'
                  }}
                >
                  L'apprentissage intégré directement dans vos outils de travail quotidiens.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. SECTION IMAGE FULL WIDTH */}
      <section className="py-20 md:py-28" style={{ background: 'var(--bg-gradient-primary-subtle)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ImageWithFallback 
            src="https://images.unsplash.com/photo-1571423139627-eefa612db5b1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjB0ZWNobm9sb2d5JTIwaW5ub3ZhdGlvbnxlbnwxfHx8fDE3NjYwOTM3OTJ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
            alt="Innovation technologique"
            className="w-full rounded-3xl shadow-xl"
            style={{ borderRadius: 'var(--radius-2xl)' }}
          />
        </div>
      </section>

      {/* 6. SECTION CTA FINALE - Accent bleu */}
      <section 
        className="py-20 md:py-32 relative overflow-hidden"
        style={{ 
          background: 'var(--gradient-primary)'
        }}
      >
        {/* Pattern décoratif */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-white rounded-full blur-3xl" />
        </div>

        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          {/* Icône décorative */}
          <div className="flex justify-center mb-6">
            <div 
              className="w-16 h-16 bg-white/20 backdrop-blur-xl rounded-2xl flex items-center justify-center"
              style={{ borderRadius: 'var(--radius-xl)' }}
            >
              <Sparkles className="w-8 h-8 text-white" />
            </div>
          </div>

          <h2 
            className="mb-6"
            style={{ 
              fontFamily: 'var(--font-display)', 
              fontSize: 'clamp(2rem, 5vw, 3.5rem)', 
              lineHeight: 'var(--leading-tight)',
              fontWeight: 'var(--font-weight-bold)',
              color: '#ffffff'
            }}
          >
            Envie de tester notre vision ?
          </h2>
          
          <p 
            className="mb-10 max-w-2xl mx-auto"
            style={{ 
              fontFamily: 'var(--font-body)', 
              fontSize: 'var(--text-xl)', 
              lineHeight: 'var(--leading-relaxed)',
              color: 'rgba(255, 255, 255, 0.9)'
            }}
          >
            Le meilleur moyen de découvrir notre technologie, c'est de l'utiliser. 
            Rejoignez l'Académie pour voir l'App en action.
          </p>
          
          <Button 
            size="lg"
            className="bg-white shadow-2xl hover:shadow-xl hover:scale-105 transition-all duration-300"
            style={{ 
              color: 'var(--primary-700)',
              fontFamily: 'var(--font-body)',
              fontSize: 'var(--text-lg)',
              fontWeight: 'var(--font-weight-semibold)',
              padding: '1.25rem 2.5rem',
              borderRadius: 'var(--radius-xl)'
            }}
          >
            Voir l'Académie
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>

          {/* Trust indicators */}
          <div className="flex items-center justify-center gap-8 mt-12 text-white/90 flex-wrap">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5" />
              <span style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--text-sm)' }}>
                Démo disponible
              </span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5" />
              <span style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--text-sm)' }}>
                Mobile & Desktop
              </span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5" />
              <span style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--text-sm)' }}>
                Accès immédiat
              </span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}