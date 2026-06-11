import { Button } from "../components/ui/button";
import { Card, CardContent } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { 
  CheckCircle2, 
  Clock, 
  Users, 
  Star,
  Sparkles,
  Video,
  Brain,
  Rocket,
  Target,
  Play,
  Zap,
  Trophy,
  ArrowRight,
  Award,
  TrendingUp,
  BookOpen,
  Layers,
  ChevronRight,
  GraduationCap
} from "lucide-react";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { useState } from "react";

export default function AcademiePage() {
  const [selectedParcours, setSelectedParcours] = useState(0);

  const parcours = [
    {
      id: 0,
      title: "Décoder l'IA & Prompt Engineering",
      subtitle: "Les fondamentaux de l'IA générative",
      description: "Maîtrisez l'art de créer des prompts efficaces et comprenez les fondamentaux de l'IA générative. De ChatGPT à Claude, apprenez à obtenir des résultats parfaits.",
      duree: "4h30",
      modules: 12,
      icon: Brain,
      niveau: "Débutant",
      tag: "Fondamentaux",
      highlights: [
        "Comprendre le fonctionnement des LLMs",
        "Techniques avancées de prompting",
        "Cas d'usage pédagogiques concrets"
      ]
    },
    {
      id: 1,
      title: "Créer des médias pédagogiques",
      subtitle: "Image, vidéo et voix-off IA",
      description: "Utilisez Midjourney, DALL-E, Runway et ElevenLabs pour créer des contenus visuels et audio de qualité professionnelle pour vos formations.",
      duree: "5h00",
      modules: 15,
      icon: Video,
      niveau: "Intermédiaire",
      tag: "Production",
      highlights: [
        "Génération d'images avec IA",
        "Création de vidéos explicatives",
        "Voix-off professionnelles IA"
      ]
    },
    {
      id: 2,
      title: "Concevoir une formation complète",
      subtitle: "Méthode 8 étapes TLS",
      description: "Notre méthode exclusive en 8 étapes pour concevoir une formation complète avec l'aide de l'IA : de l'analyse des besoins à l'évaluation finale.",
      duree: "6h00",
      modules: 18,
      icon: Target,
      niveau: "Avancé",
      tag: "Conception",
      highlights: [
        "Ingénierie pédagogique IA",
        "Templates prêts à l'emploi",
        "Évaluation et amélioration continue"
      ]
    },
    {
      id: 3,
      title: "Déployer l'IA en L&D",
      subtitle: "Stratégie d'adoption",
      description: "Accompagnez le changement et formez vos équipes L&D. Créez une stratégie d'adoption progressive et mesurez l'impact ROI.",
      duree: "4h00",
      modules: 10,
      icon: Rocket,
      niveau: "Expert",
      tag: "Stratégie",
      highlights: [
        "Change management IA",
        "Mesure du ROI formation",
        "Gouvernance et best practices"
      ]
    }
  ];

  const benefits = [
    {
      icon: Brain,
      title: "Formateurs-Experts IA",
      description: "Apprenez avec des pédagogues qui utilisent l'IA au quotidien dans leurs propres formations",
      stat: "10+ ans",
      statLabel: "Expérience pédagogie"
    },
    {
      icon: Rocket,
      title: "Mise en Pratique Immédiate",
      description: "Templates, prompts et workflows prêts à l'emploi pour démarrer dès demain",
      stat: "100+",
      statLabel: "Resources incluses"
    },
    {
      icon: Users,
      title: "Communauté & Entraide",
      description: "Rejoignez 500+ formateurs et responsables L&D qui partagent leurs retours d'expérience",
      stat: "500+",
      statLabel: "Membres actifs"
    },
    {
      icon: Award,
      title: "Certification Reconnue",
      description: "Valorisez vos compétences avec un certificat reconnu par les professionnels",
      stat: "98%",
      statLabel: "Taux de réussite"
    },
    {
      icon: TrendingUp,
      title: "Contenus Actualisés",
      description: "Accès à vie avec mises à jour mensuelles pour suivre les évolutions de l'IA",
      stat: "Chaque mois",
      statLabel: "Nouveaux contenus"
    },
    {
      icon: Sparkles,
      title: "Support Personnalisé",
      description: "Sessions live mensuelles et support réactif pour répondre à vos questions",
      stat: "< 24h",
      statLabel: "Temps de réponse"
    }
  ];

  return (
    <div style={{ backgroundColor: 'var(--background)' }}>
      
      {/* HERO SECTION */}
      <section className="relative overflow-hidden">
        {/* Background gradient */}
        <div className="absolute inset-0" style={{ 
          background: 'linear-gradient(135deg, rgba(85, 161, 180, 0.03) 0%, rgba(255, 255, 255, 0) 100%)'
        }} />
        
        {/* Decorative blob */}
        <div className="absolute top-20 right-0 w-96 h-96 md:w-[500px] md:h-[500px] opacity-20 blur-3xl pointer-events-none"
          style={{ 
            background: 'radial-gradient(circle, var(--primary-300) 0%, transparent 70%)',
            animation: 'float 20s ease-in-out infinite'
          }} />

        <style>{`
          @keyframes float {
            0%, 100% { transform: translate(0, 0) scale(1); }
            50% { transform: translate(-30px, -30px) scale(1.1); }
          }
        `}</style>

        <div className="relative" style={{ 
          maxWidth: '1280px', 
          margin: '0 auto',
          padding: 'var(--space-20) var(--space-6)'
        }}>
          <div className="grid lg:grid-cols-2 items-center" style={{ gap: 'var(--space-16)' }}>
            
            {/* Left Content */}
            <div>
              {/* Badge */}
              <div className="inline-flex items-center rounded-full backdrop-blur-xl" style={{ 
                gap: 'var(--space-2)',
                padding: 'var(--space-2) var(--space-5)',
                marginBottom: 'var(--space-8)',
                background: 'rgba(255, 255, 255, 0.8)',
                border: '1px solid rgba(85, 161, 180, 0.2)',
                boxShadow: '0 8px 32px rgba(85, 161, 180, 0.1)'
              }}>
                <GraduationCap className="w-4 h-4" style={{ color: 'var(--primary-600)' }} />
                <span style={{ 
                  fontFamily: 'var(--font-body)', 
                  fontSize: 'var(--text-xs)',
                  fontWeight: 'var(--font-weight-bold)',
                  color: 'var(--primary-700)',
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase'
                }}>
                  Académie • Formation
                </span>
              </div>

              {/* Title */}
              <h1 
                style={{ 
                  fontFamily: 'var(--font-display)', 
                  fontSize: 'clamp(2.5rem, 6vw, 4.5rem)', 
                  lineHeight: 'var(--leading-tight)',
                  fontWeight: 'var(--font-weight-bold)',
                  color: 'var(--neutral-900)',
                  marginBottom: 'var(--space-6)'
                }}
              >
                Formez-vous à l'IA{' '}
                <span style={{ 
                  background: 'linear-gradient(135deg, var(--primary-600) 0%, var(--primary-400) 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text'
                }}>
                  pédagogique
                </span>
              </h1>

              {/* Description */}
              <p 
                style={{ 
                  fontFamily: 'var(--font-body)', 
                  fontSize: 'var(--text-xl)', 
                  lineHeight: 'var(--leading-relaxed)',
                  color: 'var(--neutral-700)',
                  marginBottom: 'var(--space-8)',
                  maxWidth: '600px'
                }}
              >
                Des parcours pratiques et immédiatement actionnables pour transformer 
                votre pratique de formateur, responsable L&D ou concepteur pédagogique.
              </p>

              {/* Quick features */}
              <div className="flex flex-wrap" style={{ gap: 'var(--space-6)', marginBottom: 'var(--space-10)' }}>
                {[
                  { icon: CheckCircle2, label: '100% pratique' },
                  { icon: Clock, label: 'À votre rythme' },
                  { icon: Award, label: 'Certification' }
                ].map((feature, idx) => {
                  const Icon = feature.icon;
                  return (
                    <div key={idx} className="flex items-center" style={{ gap: 'var(--space-3)' }}>
                      <div className="flex items-center justify-center rounded-xl"
                        style={{ 
                          width: '40px',
                          height: '40px',
                          background: 'linear-gradient(135deg, rgba(85, 161, 180, 0.1) 0%, rgba(85, 161, 180, 0.05) 100%)',
                          border: '1px solid rgba(85, 161, 180, 0.2)'
                        }}>
                        <Icon className="w-5 h-5" style={{ color: 'var(--primary-600)' }} />
                      </div>
                      <span style={{ 
                        fontFamily: 'var(--font-body)', 
                        fontSize: 'var(--text-base)',
                        fontWeight: 'var(--font-weight-semibold)',
                        color: 'var(--neutral-900)'
                      }}>
                        {feature.label}
                      </span>
                    </div>
                  );
                })}
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-wrap" style={{ gap: 'var(--space-4)' }}>
                <Button 
                  size="lg"
                  className="group shadow-2xl hover:shadow-primary-500/50 transition-all duration-500 hover:scale-105"
                  style={{ 
                    background: 'linear-gradient(135deg, var(--primary-600) 0%, var(--primary-500) 100%)',
                    color: 'white',
                    fontFamily: 'var(--font-body)',
                    fontSize: 'var(--text-lg)',
                    fontWeight: 'var(--font-weight-semibold)',
                    padding: 'var(--space-6) var(--space-10)',
                    borderRadius: 'var(--radius-xl)',
                    border: 'none'
                  }}
                >
                  Découvrir les parcours
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Button>
                
                <Button 
                  size="lg"
                  variant="outline"
                  className="group"
                  style={{ 
                    borderColor: 'var(--primary-600)',
                    color: 'var(--primary-700)',
                    fontFamily: 'var(--font-body)',
                    fontSize: 'var(--text-lg)',
                    fontWeight: 'var(--font-weight-semibold)',
                    padding: 'var(--space-6) var(--space-10)',
                    borderRadius: 'var(--radius-xl)',
                    borderWidth: '2px'
                  }}
                >
                  <Play className="mr-2 h-5 w-5" />
                  Voir une démo
                </Button>
              </div>
            </div>

            {/* Right - Visual Card */}
            <div className="relative mt-12 lg:mt-0">
              <div 
                className="relative overflow-hidden"
                style={{ 
                  borderRadius: 'var(--radius-2xl)',
                  background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.9) 0%, rgba(255, 255, 255, 0.7) 100%)',
                  backdropFilter: 'blur(20px)',
                  WebkitBackdropFilter: 'blur(20px)',
                  border: '1px solid rgba(85, 161, 180, 0.2)',
                  boxShadow: '0 25px 50px -12px rgba(85, 161, 180, 0.25)'
                }}
              >
                {/* Accent bar */}
                <div style={{ 
                  height: '4px',
                  background: 'linear-gradient(90deg, var(--primary-400) 0%, var(--primary-600) 100%)'
                }} />
                
                <div style={{ padding: 'var(--space-6)' }}>
                  <ImageWithFallback 
                    src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800"
                    alt="Formation IA"
                    className="w-full h-auto"
                    style={{ 
                      borderRadius: 'var(--radius-xl)',
                      boxShadow: '0 10px 40px rgba(0, 0, 0, 0.1)'
                    }}
                  />

                  {/* Stats grid */}
                  <div className="grid grid-cols-3" style={{ gap: 'var(--space-4)', marginTop: 'var(--space-6)' }}>
                    {[
                      { value: '50h', label: 'Contenus' },
                      { value: '500+', label: 'Formateurs' },
                      { value: '4.9', label: '/ 5' }
                    ].map((stat, idx) => (
                      <div key={idx} className="text-center rounded-xl backdrop-blur-xl"
                        style={{ 
                          padding: 'var(--space-4)',
                          background: 'rgba(255, 255, 255, 0.6)',
                          border: '1px solid rgba(85, 161, 180, 0.1)'
                        }}>
                        <div style={{ 
                          fontFamily: 'var(--font-display)', 
                          fontSize: 'var(--text-2xl)',
                          fontWeight: 'var(--font-weight-bold)',
                          color: 'var(--neutral-900)'
                        }}>
                          {stat.value}
                        </div>
                        <div style={{ 
                          fontFamily: 'var(--font-body)', 
                          fontSize: 'var(--text-xs)',
                          color: 'var(--neutral-600)'
                        }}>
                          {stat.label}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION PARCOURS */}
      <section style={{ 
        paddingTop: 'var(--space-20)',
        paddingBottom: 'var(--space-20)'
      }}>
        <div style={{ 
          maxWidth: '1280px', 
          margin: '0 auto',
          padding: '0 var(--space-6)'
        }}>
          
          {/* Header */}
          <div className="text-center" style={{ marginBottom: 'var(--space-16)' }}>
            <Badge 
              className="backdrop-blur-xl"
              style={{ 
                marginBottom: 'var(--space-6)',
                padding: 'var(--space-3) var(--space-6)',
                background: 'rgba(255, 255, 255, 0.8)',
                border: '1px solid rgba(85, 161, 180, 0.2)',
                boxShadow: '0 4px 16px rgba(85, 161, 180, 0.1)',
                fontFamily: 'var(--font-body)', 
                fontSize: 'var(--text-xs)',
                fontWeight: 'var(--font-weight-bold)',
                color: 'var(--primary-700)',
                letterSpacing: '0.1em'
              }}
            >
              <BookOpen className="w-4 h-4 mr-2 inline" />
              NOS PARCOURS
            </Badge>
            
            <h2 
              style={{ 
                fontFamily: 'var(--font-display)', 
                fontSize: 'clamp(2rem, 4vw, 3.5rem)', 
                lineHeight: 'var(--leading-tight)',
                fontWeight: 'var(--font-weight-bold)',
                color: 'var(--neutral-900)',
                marginBottom: 'var(--space-6)'
              }}
            >
              Choisissez votre parcours
            </h2>
            
            <p 
              style={{ 
                fontFamily: 'var(--font-body)', 
                fontSize: 'var(--text-xl)', 
                lineHeight: 'var(--leading-relaxed)',
                color: 'var(--neutral-700)',
                maxWidth: '700px',
                margin: '0 auto'
              }}
            >
              Formations pratiques, modulaires et certifiantes
            </p>
          </div>

          {/* Tabs */}
          <div className="flex flex-wrap justify-center" style={{ gap: 'var(--space-3)', marginBottom: 'var(--space-12)' }}>
            {parcours.map((p) => (
              <button
                key={p.id}
                onClick={() => setSelectedParcours(p.id)}
                className="rounded-xl transition-all duration-300"
                style={{ 
                  padding: 'var(--space-3) var(--space-6)',
                  background: selectedParcours === p.id 
                    ? 'linear-gradient(135deg, var(--primary-600) 0%, var(--primary-500) 100%)'
                    : 'rgba(255, 255, 255, 0.8)',
                  border: selectedParcours === p.id 
                    ? '1px solid var(--primary-600)'
                    : '1px solid var(--neutral-200)',
                  color: selectedParcours === p.id ? 'white' : 'var(--neutral-700)',
                  fontFamily: 'var(--font-body)',
                  fontSize: 'var(--text-sm)',
                  fontWeight: 'var(--font-weight-semibold)',
                  boxShadow: selectedParcours === p.id 
                    ? '0 8px 24px rgba(85, 161, 180, 0.3)'
                    : '0 2px 8px rgba(0, 0, 0, 0.05)',
                  cursor: 'pointer'
                }}
              >
                {p.tag}
              </button>
            ))}
          </div>

          {/* Content Card */}
          <div 
            className="relative overflow-hidden"
            style={{ 
              borderRadius: 'var(--radius-2xl)',
              background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(255, 255, 255, 0.8) 100%)',
              backdropFilter: 'blur(20px)',
              WebkitBackdropFilter: 'blur(20px)',
              border: '1px solid rgba(85, 161, 180, 0.15)',
              boxShadow: '0 25px 50px -12px rgba(85, 161, 180, 0.2)'
            }}
          >
            {/* Accent bar */}
            <div style={{ 
              height: '3px',
              background: 'linear-gradient(90deg, var(--primary-400) 0%, var(--primary-600) 50%, var(--primary-400) 100%)'
            }} />

            <div style={{ padding: 'var(--space-12)' }}>
              <div className="grid lg:grid-cols-2 items-center" style={{ gap: 'var(--space-12)' }}>
                
                {/* Left - Content */}
                <div>
                  {/* Icon + Badge */}
                  <div className="flex items-center flex-wrap" style={{ gap: 'var(--space-4)', marginBottom: 'var(--space-8)' }}>
                    <div 
                      className="flex items-center justify-center"
                      style={{ 
                        width: '80px',
                        height: '80px',
                        borderRadius: 'var(--radius-2xl)',
                        background: 'linear-gradient(135deg, rgba(85, 161, 180, 0.1) 0%, rgba(85, 161, 180, 0.05) 100%)',
                        border: '1px solid rgba(85, 161, 180, 0.2)',
                        boxShadow: '0 8px 24px rgba(85, 161, 180, 0.15)'
                      }}
                    >
                      {(() => {
                        const Icon = parcours[selectedParcours].icon;
                        return <Icon className="w-10 h-10" style={{ color: 'var(--primary-600)' }} />;
                      })()}
                    </div>
                    
                    <Badge 
                      style={{ 
                        background: 'linear-gradient(135deg, rgba(85, 161, 180, 0.1) 0%, rgba(85, 161, 180, 0.05) 100%)',
                        border: '1px solid rgba(85, 161, 180, 0.2)',
                        color: 'var(--primary-700)',
                        fontFamily: 'var(--font-body)',
                        fontSize: 'var(--text-xs)',
                        fontWeight: 'var(--font-weight-bold)',
                        padding: 'var(--space-2) var(--space-4)'
                      }}
                    >
                      {parcours[selectedParcours].niveau}
                    </Badge>
                  </div>

                  {/* Title */}
                  <h3 
                    style={{ 
                      fontFamily: 'var(--font-display)', 
                      fontSize: 'clamp(1.75rem, 3vw, 2.5rem)', 
                      lineHeight: 'var(--leading-tight)',
                      fontWeight: 'var(--font-weight-bold)',
                      color: 'var(--neutral-900)',
                      marginBottom: 'var(--space-3)'
                    }}
                  >
                    {parcours[selectedParcours].title}
                  </h3>

                  {/* Subtitle */}
                  <p 
                    style={{ 
                      fontFamily: 'var(--font-body)', 
                      fontSize: 'var(--text-lg)', 
                      lineHeight: 'var(--leading-relaxed)',
                      color: 'var(--primary-600)',
                      fontWeight: 'var(--font-weight-semibold)',
                      marginBottom: 'var(--space-6)'
                    }}
                  >
                    {parcours[selectedParcours].subtitle}
                  </p>

                  {/* Description */}
                  <p 
                    style={{ 
                      fontFamily: 'var(--font-body)', 
                      fontSize: 'var(--text-base)', 
                      lineHeight: 'var(--leading-relaxed)',
                      color: 'var(--neutral-700)',
                      marginBottom: 'var(--space-8)'
                    }}
                  >
                    {parcours[selectedParcours].description}
                  </p>

                  {/* Highlights */}
                  <div style={{ marginBottom: 'var(--space-10)' }}>
                    {parcours[selectedParcours].highlights.map((highlight, idx) => (
                      <div key={idx} className="flex items-center" style={{ gap: 'var(--space-3)', marginBottom: 'var(--space-3)' }}>
                        <CheckCircle2 className="w-5 h-5 flex-shrink-0" style={{ color: 'var(--primary-600)' }} />
                        <span style={{ 
                          fontFamily: 'var(--font-body)', 
                          fontSize: 'var(--text-base)',
                          color: 'var(--neutral-800)'
                        }}>
                          {highlight}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Meta info */}
                  <div className="flex items-center flex-wrap" style={{ gap: 'var(--space-6)', marginBottom: 'var(--space-8)' }}>
                    <div className="flex items-center" style={{ gap: 'var(--space-2)' }}>
                      <Clock className="w-5 h-5" style={{ color: 'var(--neutral-600)' }} />
                      <span style={{ 
                        fontFamily: 'var(--font-body)', 
                        fontSize: 'var(--text-sm)',
                        fontWeight: 'var(--font-weight-semibold)',
                        color: 'var(--neutral-700)'
                      }}>
                        {parcours[selectedParcours].duree}
                      </span>
                    </div>
                    <div className="flex items-center" style={{ gap: 'var(--space-2)' }}>
                      <Video className="w-5 h-5" style={{ color: 'var(--neutral-600)' }} />
                      <span style={{ 
                        fontFamily: 'var(--font-body)', 
                        fontSize: 'var(--text-sm)',
                        fontWeight: 'var(--font-weight-semibold)',
                        color: 'var(--neutral-700)'
                      }}>
                        {parcours[selectedParcours].modules} modules
                      </span>
                    </div>
                  </div>

                  {/* CTA */}
                  <Button 
                    size="lg"
                    className="group w-full sm:w-auto"
                    style={{ 
                      background: 'linear-gradient(135deg, var(--primary-600) 0%, var(--primary-500) 100%)',
                      color: 'white',
                      fontFamily: 'var(--font-body)',
                      fontSize: 'var(--text-base)',
                      fontWeight: 'var(--font-weight-semibold)',
                      padding: 'var(--space-5) var(--space-10)',
                      borderRadius: 'var(--radius-xl)',
                      border: 'none',
                      boxShadow: '0 10px 30px rgba(85, 161, 180, 0.3)'
                    }}
                  >
                    Commencer ce parcours
                    <ChevronRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </div>

                {/* Right - Visual */}
                <div className="relative mt-8 lg:mt-0">
                  <div 
                    className="overflow-hidden"
                    style={{ 
                      aspectRatio: '4/3',
                      borderRadius: 'var(--radius-2xl)',
                      background: 'linear-gradient(135deg, rgba(85, 161, 180, 0.1) 0%, rgba(85, 161, 180, 0.05) 100%)',
                      border: '1px solid rgba(85, 161, 180, 0.2)'
                    }}
                  >
                    <ImageWithFallback 
                      src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800"
                      alt="Formation"
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Floating badge - Hidden on mobile */}
                  <div 
                    className="absolute rounded-2xl backdrop-blur-xl hidden md:block"
                    style={{ 
                      bottom: '-24px',
                      right: '-24px',
                      padding: 'var(--space-6)',
                      background: 'rgba(255, 255, 255, 0.95)',
                      border: '1px solid rgba(85, 161, 180, 0.2)',
                      boxShadow: '0 20px 40px rgba(85, 161, 180, 0.25)'
                    }}
                  >
                    <div style={{ 
                      fontFamily: 'var(--font-display)', 
                      fontSize: 'var(--text-3xl)',
                      fontWeight: 'var(--font-weight-bold)',
                      color: 'var(--primary-600)'
                    }}>
                      {parcours[selectedParcours].modules}
                    </div>
                    <div style={{ 
                      fontFamily: 'var(--font-body)', 
                      fontSize: 'var(--text-sm)',
                      color: 'var(--neutral-600)'
                    }}>
                      Modules complets
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION BENEFITS */}
      <section style={{ 
        paddingTop: 'var(--space-16)',
        paddingBottom: 'var(--space-20)'
      }}>
        <div style={{ 
          maxWidth: '1280px', 
          margin: '0 auto',
          padding: '0 var(--space-6)'
        }}>
          
          {/* Header Compact */}
          <div className="text-center" style={{ marginBottom: 'var(--space-12)' }}>
            <h2 
              style={{ 
                fontFamily: 'var(--font-display)', 
                fontSize: 'clamp(1.75rem, 3.5vw, 2.5rem)', 
                lineHeight: 'var(--leading-tight)',
                fontWeight: 'var(--font-weight-bold)',
                color: 'var(--neutral-900)'
              }}
            >
              L'Académie TLS en quelques chiffres
            </h2>
          </div>

          {/* Compact Grid - 2 rows x 3 cols */}
          <div className="grid grid-cols-2 lg:grid-cols-3" style={{ gap: 'var(--space-5)' }}>
            {benefits.map((benefit, index) => {
              const Icon = benefit.icon;
              return (
                <div 
                  key={index}
                  className="group relative overflow-hidden"
                  style={{ 
                    background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(255, 255, 255, 0.85) 100%)',
                    backdropFilter: 'blur(20px)',
                    WebkitBackdropFilter: 'blur(20px)',
                    border: '1px solid rgba(85, 161, 180, 0.15)',
                    borderRadius: 'var(--radius-xl)',
                    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.04)',
                    padding: 'var(--space-6)',
                    transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                    cursor: 'pointer'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-4px)';
                    e.currentTarget.style.boxShadow = '0 12px 40px rgba(85, 161, 180, 0.12)';
                    e.currentTarget.style.borderColor = 'rgba(85, 161, 180, 0.3)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.04)';
                    e.currentTarget.style.borderColor = 'rgba(85, 161, 180, 0.15)';
                  }}
                >
                  {/* Top accent line */}
                  <div style={{ 
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    height: '2px',
                    background: 'linear-gradient(90deg, var(--primary-400) 0%, var(--primary-600) 100%)',
                    opacity: 0.6
                  }} />

                  {/* Icon + Stat horizontal */}
                  <div className="flex items-center justify-between" style={{ marginBottom: 'var(--space-4)' }}>
                    <div 
                      className="flex items-center justify-center flex-shrink-0"
                      style={{
                        width: '48px',
                        height: '48px',
                        borderRadius: 'var(--radius-lg)',
                        background: 'linear-gradient(135deg, rgba(85, 161, 180, 0.1) 0%, rgba(85, 161, 180, 0.05) 100%)',
                        border: '1px solid rgba(85, 161, 180, 0.15)'
                      }}
                    >
                      <Icon className="w-6 h-6" style={{ color: 'var(--primary-600)' }} />
                    </div>
                    
                    {/* Stat */}
                    <div className="text-right">
                      <div style={{ 
                        fontFamily: 'var(--font-display)', 
                        fontSize: 'var(--text-xl)',
                        fontWeight: 'var(--font-weight-bold)',
                        color: 'var(--primary-600)',
                        lineHeight: '1.2'
                      }}>
                        {benefit.stat}
                      </div>
                      <div style={{ 
                        fontFamily: 'var(--font-body)', 
                        fontSize: 'var(--text-2xs)',
                        color: 'var(--neutral-600)',
                        textTransform: 'uppercase',
                        letterSpacing: '0.05em'
                      }}>
                        {benefit.statLabel}
                      </div>
                    </div>
                  </div>

                  {/* Title */}
                  <h3 
                    style={{ 
                      fontFamily: 'var(--font-display)', 
                      fontSize: 'var(--text-base)', 
                      lineHeight: 'var(--leading-tight)',
                      fontWeight: 'var(--font-weight-bold)',
                      color: 'var(--neutral-900)',
                      marginBottom: 'var(--space-2)'
                    }}
                  >
                    {benefit.title}
                  </h3>
                  
                  {/* Description */}
                  <p 
                    style={{ 
                      fontFamily: 'var(--font-body)', 
                      fontSize: 'var(--text-xs)', 
                      lineHeight: 'var(--leading-relaxed)',
                      color: 'var(--neutral-700)'
                    }}
                  >
                    {benefit.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* SECTION CTA FINALE */}
      <section className="relative overflow-hidden" style={{ 
        paddingTop: 'var(--space-32)',
        paddingBottom: 'var(--space-32)'
      }}>
        {/* Background */}
        <div className="absolute inset-0" style={{ 
          background: 'linear-gradient(135deg, var(--primary-600) 0%, var(--primary-700) 100%)'
        }} />
        
        {/* Animated blobs */}
        <div className="absolute top-0 right-0 w-96 h-96 md:w-[600px] md:h-[600px] opacity-20 blur-3xl pointer-events-none"
          style={{ 
            background: 'radial-gradient(circle, white 0%, transparent 70%)',
            animation: 'float 20s ease-in-out infinite'
          }} />
        <div className="absolute bottom-0 left-0 w-80 h-80 md:w-[500px] md:h-[500px] opacity-20 blur-3xl pointer-events-none"
          style={{ 
            background: 'radial-gradient(circle, white 0%, transparent 70%)',
            animation: 'float 15s ease-in-out infinite reverse'
          }} />

        <div className="relative text-center" style={{ 
          maxWidth: '1024px', 
          margin: '0 auto',
          padding: '0 var(--space-6)'
        }}>
          
          {/* Icon */}
          <div className="flex justify-center" style={{ marginBottom: 'var(--space-8)' }}>
            <div 
              className="backdrop-blur-xl flex items-center justify-center"
              style={{ 
                width: '80px',
                height: '80px',
                borderRadius: 'var(--radius-2xl)',
                background: 'rgba(255, 255, 255, 0.15)',
                border: '1px solid rgba(255, 255, 255, 0.3)',
                boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)'
              }}
            >
              <Rocket className="w-10 h-10" style={{ color: 'white' }} />
            </div>
          </div>

          {/* Title */}
          <h2 
            style={{ 
              fontFamily: 'var(--font-display)', 
              fontSize: 'clamp(2rem, 5vw, 3.5rem)', 
              lineHeight: 'var(--leading-tight)',
              fontWeight: 'var(--font-weight-bold)',
              color: 'white',
              marginBottom: 'var(--space-8)'
            }}
          >
            Prêt à transformer votre pédagogie ?
          </h2>
          
          {/* Description */}
          <p 
            style={{ 
              fontFamily: 'var(--font-body)', 
              fontSize: 'var(--text-xl)', 
              lineHeight: 'var(--leading-relaxed)',
              color: 'rgba(255, 255, 255, 0.95)',
              marginBottom: 'var(--space-12)',
              maxWidth: '700px',
              margin: '0 auto var(--space-12)'
            }}
          >
            Rejoignez les 500+ formateurs qui utilisent déjà l'IA pour créer des formations 
            plus engageantes et impactantes.
          </p>
          
          {/* CTA Buttons */}
          <div className="flex flex-wrap justify-center" style={{ gap: 'var(--space-4)', marginBottom: 'var(--space-12)' }}>
            <Button 
              size="lg"
              className="shadow-2xl hover:shadow-white/50 transition-all duration-500 hover:scale-105"
              style={{ 
                background: 'white',
                color: 'var(--primary-700)',
                fontFamily: 'var(--font-body)',
                fontSize: 'var(--text-lg)',
                fontWeight: 'var(--font-weight-semibold)',
                padding: 'var(--space-6) var(--space-12)',
                borderRadius: 'var(--radius-xl)',
                border: 'none'
              }}
            >
              Accéder aux parcours
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>

            <Button 
              size="lg"
              variant="outline"
              className="transition-all duration-500"
              style={{ 
                borderColor: 'white',
                borderWidth: '2px',
                color: 'white',
                fontFamily: 'var(--font-body)',
                fontSize: 'var(--text-lg)',
                fontWeight: 'var(--font-weight-semibold)',
                padding: 'var(--space-6) var(--space-12)',
                borderRadius: 'var(--radius-xl)',
                background: 'rgba(255, 255, 255, 0.1)',
                backdropFilter: 'blur(10px)'
              }}
            >
              Demander une démo
            </Button>
          </div>

          {/* Trust indicators */}
          <div className="flex items-center justify-center flex-wrap" style={{ gap: 'var(--space-8)', color: 'white' }}>
            {[
              'Accès immédiat',
              'Certification incluse',
              'Garantie satisfait ou remboursé'
            ].map((text, idx) => (
              <div key={idx} className="flex items-center" style={{ gap: 'var(--space-2)' }}>
                <CheckCircle2 className="w-5 h-5" />
                <span style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--text-sm)' }}>
                  {text}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}