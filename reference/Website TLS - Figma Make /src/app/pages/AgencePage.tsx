import { Button } from "../components/ui/button";
import { Card, CardContent } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { 
  FileText,
  Video,
  Users,
  Zap,
  CheckCircle2,
  Brain,
  Cpu,
  ArrowRight,
  Sparkles,
  Target,
  Rocket
} from "lucide-react";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";

export default function AgencePage() {
  const services = [
    {
      icon: FileText,
      title: "Conception & Scénarisation",
      description: "Référentiels de compétences, scénarios ramifiés et trames pédagogiques solides.",
      accent: "primary"
    },
    {
      icon: Video,
      title: "Production Média IA",
      description: "Vidéos avatars, voix off neurales, modules e-learning et supports visuels.",
      accent: "secondary"
    },
    {
      icon: Users,
      title: "Formation Intra",
      description: "Déployez l'Académie TLS en intra-entreprise pour upskiller vos équipes.",
      accent: "accent"
    },
    {
      icon: Brain,
      title: "Solutions Sur-Mesure",
      description: "Fine-tuning de modèles et développement d'assistants pédagogiques IA.",
      accent: "primary"
    }
  ];

  const processSteps = [
    {
      number: "01",
      title: "Cadrage",
      description: "Analyse du besoin et de l'écosystème technique."
    },
    {
      number: "02",
      title: "Prototype",
      description: "Livraison d'un POC (Preuve de concept) rapide."
    },
    {
      number: "03",
      title: "Scale",
      description: "Production industrielle et livraison finale."
    }
  ];

  return (
    <div className="min-h-screen" style={{ background: 'var(--bg-gradient-neutral-subtle)', backgroundColor: '#ffffff' }}>
      
      {/* 1. HERO SECTION - Minimaliste avec gradient léger */}
      <section className="relative overflow-hidden" style={{ 
        background: 'linear-gradient(180deg, var(--neutral-50) 0%, #ffffff 100%)'
      }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
          <div className="text-center max-w-4xl mx-auto">
            {/* Badge subtle */}
            <Badge 
              className="mb-6 px-4 py-2 bg-white border border-black/10 shadow-sm hover:shadow-md transition-shadow duration-300"
              style={{ 
                fontFamily: 'var(--font-body)', 
                fontSize: 'var(--text-xs)',
                fontWeight: 'var(--font-weight-semibold)',
                color: 'var(--neutral-700)',
                letterSpacing: '0.05em'
              }}
            >
              <Sparkles className="w-3.5 h-3.5 mr-2 inline" />
              PÔLE OPÉRATIONNEL
            </Badge>
            
            {/* Titre principal */}
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
              Produisez plus vite.<br />
              Formez mieux.<br />
              <span style={{ 
                background: 'var(--gradient-warm)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text'
              }}>
                IA ensuite.
              </span>
            </h1>
            
            {/* Description */}
            <p 
              className="mb-10 max-w-3xl mx-auto"
              style={{ 
                fontFamily: 'var(--font-body)', 
                fontSize: 'var(--text-xl)', 
                lineHeight: 'var(--leading-relaxed)',
                color: '#253B37',
                opacity: 0.85
              }}
            >
              Nous déployons l'IA dans vos ingénieries pour former vos équipes (Upskilling) 
              ou pour produire vos contenus sur mesure (Studio).
            </p>
            
            {/* CTA */}
            <Button 
              size="lg"
              className="group shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105"
              style={{ 
                background: 'var(--gradient-warm)',
                color: '#ffffff',
                fontFamily: 'var(--font-body)',
                fontSize: 'var(--text-lg)',
                fontWeight: 'var(--font-weight-semibold)',
                padding: '1.25rem 2.5rem',
                borderRadius: 'var(--radius-xl)'
              }}
            >
              Parler de mon projet
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
        </div>

        {/* Decorative gradient blobs - Opacité réduite */}
        <div className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full blur-3xl opacity-10 pointer-events-none" style={{ background: 'var(--gradient-primary-radial)' }} />
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] rounded-full blur-3xl opacity-10 pointer-events-none" style={{ background: 'var(--gradient-accent)' }} />

        {/* 2. BANNER PHILOSOPHIE - Glassmorphism intégré dans la hero */}
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
          <div 
            className="relative rounded-3xl p-8 md:p-10 backdrop-blur-xl hover:shadow-2xl transition-all duration-500"
            style={{ 
              background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(255, 255, 255, 0.85) 100%)',
              border: '1px solid rgba(255, 107, 53, 0.15)',
              boxShadow: '0 20px 60px rgba(0, 0, 0, 0.1)',
              borderRadius: 'var(--radius-3xl)'
            }}
          >
            {/* Badge */}
            <div className="flex justify-center mb-6">
              <Badge 
                className="px-4 py-2 bg-white/80 border backdrop-blur-sm shadow-sm"
                style={{ 
                  fontFamily: 'var(--font-body)', 
                  fontSize: 'var(--text-xs)',
                  fontWeight: 'var(--font-weight-semibold)',
                  color: 'var(--secondary-700)',
                  borderColor: 'var(--secondary-200)',
                  letterSpacing: '0.05em'
                }}
              >
                <Target className="w-3.5 h-3.5 mr-2 inline" />
                NOTRE PHILOSOPHIE
              </Badge>
            </div>

            {/* Contenu principal */}
            <div className="grid md:grid-cols-2 gap-8 items-center">
              {/* Titre */}
              <div className="text-center md:text-left">
                <h2 
                  style={{ 
                    fontFamily: 'var(--font-display)', 
                    fontSize: 'clamp(1.75rem, 4vw, 2.5rem)', 
                    lineHeight: 'var(--leading-tight)',
                    fontWeight: 'var(--font-weight-bold)',
                    color: '#253B37'
                  }}
                >
                  Pédagogie d'abord.{' '}
                  <span style={{ 
                    background: 'var(--gradient-warm)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text'
                  }}>
                    IA ensuite.
                  </span>
                </h2>
              </div>

              {/* Points clés */}
              <div className="space-y-4">
                {[
                  { icon: Brain, text: "Expertise pédagogique avant tout" },
                  { icon: Zap, text: "IA comme accélérateur" },
                  { icon: Rocket, text: "Production rapide et qualitative" }
                ].map((item, index) => {
                  const Icon = item.icon;
                  return (
                    <div key={index} className="flex items-center gap-3 group">
                      <div 
                        className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300"
                        style={{ 
                          background: 'var(--gradient-warm)',
                          boxShadow: '0 4px 12px rgba(255, 107, 53, 0.25)'
                        }}
                      >
                        <Icon className="w-5 h-5 text-white" />
                      </div>
                      <p 
                        style={{ 
                          fontFamily: 'var(--font-body)', 
                          fontSize: 'var(--text-base)',
                          fontWeight: 'var(--font-weight-medium)',
                          color: '#253B37'
                        }}
                      >
                        {item.text}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Decorative glow */}
            <div 
              className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-3/4 h-8 rounded-full blur-2xl opacity-30"
              style={{ background: 'var(--gradient-warm)' }}
            />
          </div>
        </div>
      </section>

      {/* 3. SECTION SERVICES - Layout moderne bento avec même background */}
      <section className="py-16 md:py-20" style={{ background: 'linear-gradient(180deg, #ffffff 0%, var(--neutral-50) 100%)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Header */}
          <div className="text-center mb-12">
            <Badge 
              className="mb-4 px-4 py-2 bg-white border shadow-sm"
              style={{ 
                fontFamily: 'var(--font-body)', 
                fontSize: 'var(--text-xs)',
                fontWeight: 'var(--font-weight-semibold)',
                color: 'var(--secondary-600)',
                borderColor: 'var(--secondary-200)',
                letterSpacing: '0.05em'
              }}
            >
              NOS SERVICES
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
              Une expertise complète
            </h2>
            <p 
              className="max-w-2xl mx-auto"
              style={{ 
                fontFamily: 'var(--font-body)', 
                fontSize: 'var(--text-lg)', 
                lineHeight: 'var(--leading-relaxed)',
                color: '#253B37',
                opacity: 0.8
              }}
            >
              De la conception à la production, nous maîtrisons toute la chaîne de valeur de la formation augmentée par l'IA.
            </p>
          </div>

          {/* Grid uniforme - Cards de même taille */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {services.map((service, index) => {
              const Icon = service.icon;
              return (
                <Card 
                  key={index}
                  className="group h-full bg-white border hover:border-secondary-300 transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 overflow-hidden"
                  style={{ 
                    borderColor: 'var(--border)',
                    borderRadius: 'var(--radius-2xl)'
                  }}
                >
                  <CardContent className="p-8 md:p-10 relative h-full flex flex-col">
                    {/* Decorative gradient blob */}
                    <div 
                      className="absolute top-0 right-0 w-48 h-48 rounded-full blur-3xl opacity-0 group-hover:opacity-30 transition-opacity duration-500"
                      style={{ background: 'var(--gradient-warm)' }}
                    />
                    
                    <div className="relative flex-1 flex flex-col">
                      {/* Icône */}
                      <div 
                        className="inline-flex items-center justify-center w-14 h-14 rounded-2xl mb-6"
                        style={{ backgroundColor: 'var(--secondary-100)' }}
                      >
                        <Icon className="w-7 h-7" style={{ color: 'var(--secondary-600)' }} />
                      </div>

                      {/* Titre */}
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
                        {service.title}
                      </h3>
                      
                      {/* Description */}
                      <p 
                        className="mb-6 flex-1"
                        style={{ 
                          fontFamily: 'var(--font-body)', 
                          fontSize: 'var(--text-base)', 
                          lineHeight: 'var(--leading-relaxed)',
                          color: '#253B37',
                          opacity: 0.8
                        }}
                      >
                        {service.description}
                      </p>
                      
                      {/* CTA arrow */}
                      <div className="flex items-center gap-2 text-secondary-600 group-hover:gap-4 transition-all">
                        <span style={{ 
                          fontFamily: 'var(--font-body)', 
                          fontWeight: 'var(--font-weight-semibold)',
                          fontSize: 'var(--text-sm)'
                        }}>
                          En savoir plus
                        </span>
                        <ArrowRight className="w-5 h-5" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}

          </div>
        </div>
      </section>

      {/* 4. SECTION PROCESS - Timeline moderne et compacte */}
      <section className="py-16 md:py-20" style={{ background: 'linear-gradient(180deg, var(--neutral-50) 0%, #ffffff 100%)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Header */}
          <div className="text-center mb-12">
            <Badge 
              className="mb-4 px-4 py-2 bg-white border shadow-sm"
              style={{ 
                fontFamily: 'var(--font-body)', 
                fontSize: 'var(--text-xs)',
                fontWeight: 'var(--font-weight-semibold)',
                color: 'var(--secondary-600)',
                borderColor: 'var(--secondary-200)',
                letterSpacing: '0.05em'
              }}
            >
              <Target className="w-3 h-3 mr-2 inline" />
              NOTRE MÉTHODE
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
              Comment nous travaillons
            </h2>
            <p 
              className="max-w-2xl mx-auto"
              style={{ 
                fontFamily: 'var(--font-body)', 
                fontSize: 'var(--text-lg)', 
                lineHeight: 'var(--leading-relaxed)',
                color: '#253B37',
                opacity: 0.8
              }}
            >
              Un processus agile en 3 étapes pour transformer vos projets pédagogiques.
            </p>
          </div>

          {/* Timeline horizontale compacte - Style moderne */}
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative">
              
              {/* Ligne de connexion - Desktop uniquement */}
              <div className="hidden md:block absolute top-12 left-0 right-0 h-0.5" style={{ 
                background: 'linear-gradient(90deg, transparent 0%, var(--secondary-300) 20%, var(--secondary-300) 80%, transparent 100%)',
                top: '2.5rem'
              }} />

              {/* Étape 1 - Cadrage */}
              <div className="relative">
                <Card 
                  className="group h-full bg-white border hover:border-secondary-300 transition-all duration-300 hover:shadow-xl overflow-hidden"
                  style={{ 
                    borderColor: 'var(--border)',
                    borderRadius: 'var(--radius-2xl)'
                  }}
                >
                  <CardContent className="p-6 relative">
                    {/* Gradient blob */}
                    <div 
                      className="absolute top-0 right-0 w-24 h-24 rounded-full blur-2xl opacity-0 group-hover:opacity-30 transition-opacity duration-500"
                      style={{ background: 'var(--gradient-warm)' }}
                    />
                    
                    <div className="relative">
                      {/* Numéro */}
                      <div 
                        className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 shadow-md mx-auto md:mx-0 relative z-10"
                        style={{ background: 'var(--gradient-warm)' }}
                      >
                        <span 
                          style={{ 
                            fontFamily: 'var(--font-display)', 
                            fontSize: 'var(--text-lg)',
                            fontWeight: 'var(--font-weight-bold)',
                            color: '#ffffff'
                          }}
                        >
                          01
                        </span>
                      </div>

                      {/* Badge */}
                      <div className="inline-flex items-center gap-2 mb-3 px-3 py-1 rounded-full" style={{ backgroundColor: 'var(--secondary-50)' }}>
                        <Target className="w-3.5 h-3.5" style={{ color: 'var(--secondary-500)' }} />
                        <span style={{ 
                          fontFamily: 'var(--font-body)', 
                          fontSize: 'var(--text-xs)',
                          fontWeight: 'var(--font-weight-semibold)',
                          color: 'var(--secondary-700)',
                          letterSpacing: '0.05em'
                        }}>
                          PHASE 1
                        </span>
                      </div>

                      <h3 
                        className="mb-2"
                        style={{ 
                          fontFamily: 'var(--font-display)', 
                          fontSize: 'clamp(1.25rem, 3vw, 1.5rem)', 
                          lineHeight: 'var(--leading-tight)',
                          fontWeight: 'var(--font-weight-bold)',
                          color: '#253B37'
                        }}
                      >
                        Cadrage
                      </h3>
                      
                      <p 
                        className="mb-3"
                        style={{ 
                          fontFamily: 'var(--font-body)', 
                          fontSize: 'var(--text-sm)', 
                          lineHeight: 'var(--leading-relaxed)',
                          color: '#253B37',
                          opacity: 0.8
                        }}
                      >
                        Analyse du besoin et audit de l'écosystème technique.
                      </p>

                      {/* Durée */}
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4" style={{ color: 'var(--secondary-500)' }} />
                        <span style={{ 
                          fontFamily: 'var(--font-body)', 
                          fontSize: 'var(--text-xs)',
                          fontWeight: 'var(--font-weight-medium)',
                          color: '#253B37'
                        }}>
                          1-2 semaines
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Étape 2 - Prototype */}
              <div className="relative">
                <Card 
                  className="group h-full bg-white border hover:border-secondary-300 transition-all duration-300 hover:shadow-xl overflow-hidden"
                  style={{ 
                    borderColor: 'var(--border)',
                    borderRadius: 'var(--radius-2xl)'
                  }}
                >
                  <CardContent className="p-6 relative">
                    {/* Gradient blob */}
                    <div 
                      className="absolute top-0 right-0 w-24 h-24 rounded-full blur-2xl opacity-0 group-hover:opacity-30 transition-opacity duration-500"
                      style={{ background: 'var(--gradient-warm)' }}
                    />
                    
                    <div className="relative">
                      {/* Numéro */}
                      <div 
                        className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 shadow-md mx-auto md:mx-0 relative z-10"
                        style={{ background: 'var(--gradient-warm)' }}
                      >
                        <span 
                          style={{ 
                            fontFamily: 'var(--font-display)', 
                            fontSize: 'var(--text-lg)',
                            fontWeight: 'var(--font-weight-bold)',
                            color: '#ffffff'
                          }}
                        >
                          02
                        </span>
                      </div>

                      {/* Badge */}
                      <div className="inline-flex items-center gap-2 mb-3 px-3 py-1 rounded-full" style={{ backgroundColor: 'var(--secondary-50)' }}>
                        <Zap className="w-3.5 h-3.5" style={{ color: 'var(--secondary-500)' }} />
                        <span style={{ 
                          fontFamily: 'var(--font-body)', 
                          fontSize: 'var(--text-xs)',
                          fontWeight: 'var(--font-weight-semibold)',
                          color: 'var(--secondary-700)',
                          letterSpacing: '0.05em'
                        }}>
                          PHASE 2
                        </span>
                      </div>

                      <h3 
                        className="mb-2"
                        style={{ 
                          fontFamily: 'var(--font-display)', 
                          fontSize: 'clamp(1.25rem, 3vw, 1.5rem)', 
                          lineHeight: 'var(--leading-tight)',
                          fontWeight: 'var(--font-weight-bold)',
                          color: '#253B37'
                        }}
                      >
                        Prototype
                      </h3>
                      
                      <p 
                        className="mb-3"
                        style={{ 
                          fontFamily: 'var(--font-body)', 
                          fontSize: 'var(--text-sm)', 
                          lineHeight: 'var(--leading-relaxed)',
                          color: '#253B37',
                          opacity: 0.8
                        }}
                      >
                        POC rapide pour valider l'approche et la tech.
                      </p>

                      {/* Durée */}
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4" style={{ color: 'var(--secondary-500)' }} />
                        <span style={{ 
                          fontFamily: 'var(--font-body)', 
                          fontSize: 'var(--text-xs)',
                          fontWeight: 'var(--font-weight-medium)',
                          color: '#253B37'
                        }}>
                          2-4 semaines
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Étape 3 - Scale */}
              <div className="relative">
                <Card 
                  className="group h-full bg-white border hover:border-secondary-300 transition-all duration-300 hover:shadow-xl overflow-hidden"
                  style={{ 
                    borderColor: 'var(--border)',
                    borderRadius: 'var(--radius-2xl)'
                  }}
                >
                  <CardContent className="p-6 relative">
                    {/* Gradient blob */}
                    <div 
                      className="absolute top-0 right-0 w-24 h-24 rounded-full blur-2xl opacity-0 group-hover:opacity-30 transition-opacity duration-500"
                      style={{ background: 'var(--gradient-warm)' }}
                    />
                    
                    <div className="relative">
                      {/* Numéro */}
                      <div 
                        className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 shadow-md mx-auto md:mx-0 relative z-10"
                        style={{ background: 'var(--gradient-warm)' }}
                      >
                        <span 
                          style={{ 
                            fontFamily: 'var(--font-display)', 
                            fontSize: 'var(--text-lg)',
                            fontWeight: 'var(--font-weight-bold)',
                            color: '#ffffff'
                          }}
                        >
                          03
                        </span>
                      </div>

                      {/* Badge */}
                      <div className="inline-flex items-center gap-2 mb-3 px-3 py-1 rounded-full" style={{ backgroundColor: 'var(--secondary-50)' }}>
                        <Rocket className="w-3.5 h-3.5" style={{ color: 'var(--secondary-500)' }} />
                        <span style={{ 
                          fontFamily: 'var(--font-body)', 
                          fontSize: 'var(--text-xs)',
                          fontWeight: 'var(--font-weight-semibold)',
                          color: 'var(--secondary-700)',
                          letterSpacing: '0.05em'
                        }}>
                          PHASE 3
                        </span>
                      </div>

                      <h3 
                        className="mb-2"
                        style={{ 
                          fontFamily: 'var(--font-display)', 
                          fontSize: 'clamp(1.25rem, 3vw, 1.5rem)', 
                          lineHeight: 'var(--leading-tight)',
                          fontWeight: 'var(--font-weight-bold)',
                          color: '#253B37'
                        }}
                      >
                        Scale
                      </h3>
                      
                      <p 
                        className="mb-3"
                        style={{ 
                          fontFamily: 'var(--font-body)', 
                          fontSize: 'var(--text-sm)', 
                          lineHeight: 'var(--leading-relaxed)',
                          color: '#253B37',
                          opacity: 0.8
                        }}
                      >
                        Production industrielle et déploiement à grande échelle.
                      </p>

                      {/* Durée */}
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4" style={{ color: 'var(--secondary-500)' }} />
                        <span style={{ 
                          fontFamily: 'var(--font-body)', 
                          fontSize: 'var(--text-xs)',
                          fontWeight: 'var(--font-weight-medium)',
                          color: '#253B37'
                        }}>
                          Variable
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* 5. SECTION CTA FINALE - Retravaillée */}
      <section 
        className="py-20 md:py-28 relative overflow-hidden"
        style={{ 
          background: 'linear-gradient(135deg, var(--secondary-500) 0%, var(--secondary-600) 100%)'
        }}
      >
        {/* Pattern décoratif */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-white rounded-full blur-3xl" />
        </div>

        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          {/* Badge */}
          <div className="flex justify-center mb-6">
            <Badge 
              className="px-4 py-2 bg-white/10 border border-white/20 backdrop-blur-sm"
              style={{ 
                fontFamily: 'var(--font-body)', 
                fontSize: 'var(--text-xs)',
                fontWeight: 'var(--font-weight-semibold)',
                color: 'rgba(255, 255, 255, 0.95)',
                letterSpacing: '0.05em'
              }}
            >
              <Sparkles className="w-3 h-3 mr-2 inline" />
              PARLONS DE VOTRE PROJET
            </Badge>
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
            Prêt à transformer<br />votre production pédagogique ?
          </h2>
          
          <p 
            className="mb-10 max-w-2xl mx-auto"
            style={{ 
              fontFamily: 'var(--font-body)', 
              fontSize: 'var(--text-lg)', 
              lineHeight: 'var(--leading-relaxed)',
              color: 'rgba(255, 255, 255, 0.9)'
            }}
          >
            Échangeons sur vos objectifs pédagogiques et découvrons ensemble comment l'IA peut accélérer votre impact.
          </p>
          
          {/* Dual CTA */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
            <Button 
              size="lg"
              className="w-full sm:w-auto bg-white hover:scale-[1.02] transition-all duration-300 group"
              style={{ 
                color: 'var(--secondary-600)',
                fontFamily: 'var(--font-body)',
                fontSize: 'var(--text-base)',
                fontWeight: 'var(--font-weight-semibold)',
                padding: '1rem 2rem',
                borderRadius: 'var(--radius-xl)',
                boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)',
                transition: 'all 0.3s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
                e.currentTarget.style.boxShadow = '0 10px 40px rgba(255, 255, 255, 0.4), 0 0 20px rgba(255, 255, 255, 0.3)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'white';
                e.currentTarget.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.1)';
              }}
            >
              <span className="flex items-center">
                Prendre rendez-vous
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </span>
            </Button>
            
            <Button 
              size="lg"
              className="w-full sm:w-auto bg-white/10 border border-white/30 backdrop-blur-sm hover:bg-white/20 transition-all duration-300"
              style={{ 
                color: '#ffffff',
                fontFamily: 'var(--font-body)',
                fontSize: 'var(--text-base)',
                fontWeight: 'var(--font-weight-semibold)',
                padding: '1rem 2rem',
                borderRadius: 'var(--radius-xl)'
              }}
            >
              Demander un devis
            </Button>
          </div>

          {/* Trust indicators */}
          <div className="flex items-center justify-center gap-6 md:gap-8 text-white/90 flex-wrap">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4" />
              <span style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--text-sm)' }}>
                Réponse sous 24h
              </span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4" />
              <span style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--text-sm)' }}>
                Devis gratuit
              </span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4" />
              <span style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--text-sm)' }}>
                Sans engagement
              </span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}