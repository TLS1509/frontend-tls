# 💻 THE LEARNING SOCIETY - CODE EXAMPLES

## Guide d'implémentation React avec exemples de code

---

## 1. Hero Section - Code Complet

### Version Académie (Bleu)

```tsx
import { GraduationCap, CheckCircle2, Clock, Award } from "lucide-react";
import { Button } from "./components/ui/button";

export function AcademieHero() {
  return (
    <section className="relative overflow-hidden">
      {/* Background gradient overlay */}
      <div 
        className="absolute inset-0" 
        style={{ 
          background: 'linear-gradient(135deg, rgba(85, 161, 180, 0.03) 0%, rgba(255, 255, 255, 0) 100%)'
        }} 
      />
      
      {/* Animated blob */}
      <div 
        className="absolute top-20 right-0 w-96 h-96 md:w-[500px] md:h-[500px] opacity-20 blur-3xl pointer-events-none"
        style={{ 
          background: 'radial-gradient(circle, var(--primary-300) 0%, transparent 70%)',
          animation: 'float 20s ease-in-out infinite'
        }} 
      />

      {/* Float animation */}
      <style>{`
        @keyframes float {
          0%, 100% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(-30px, -30px) scale(1.1); }
        }
      `}</style>

      {/* Content */}
      <div 
        className="relative" 
        style={{ 
          maxWidth: '1280px', 
          margin: '0 auto',
          padding: 'var(--space-20) var(--space-6)'
        }}
      >
        <div className="grid lg:grid-cols-2 items-center" style={{ gap: 'var(--space-16)' }}>
          
          {/* Left Column */}
          <div>
            {/* Badge */}
            <div 
              className="inline-flex items-center rounded-full backdrop-blur-xl" 
              style={{ 
                gap: 'var(--space-2)',
                padding: 'var(--space-2) var(--space-5)',
                marginBottom: 'var(--space-8)',
                background: 'rgba(255, 255, 255, 0.8)',
                border: '1px solid rgba(85, 161, 180, 0.2)',
                boxShadow: '0 8px 32px rgba(85, 161, 180, 0.1)'
              }}
            >
              <GraduationCap className="w-4 h-4" style={{ color: 'var(--primary-600)' }} />
              <span 
                style={{ 
                  fontFamily: 'var(--font-body)', 
                  fontSize: 'var(--text-xs)',
                  fontWeight: 'var(--font-weight-bold)',
                  color: 'var(--primary-700)',
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase'
                }}
              >
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
              <span 
                style={{ 
                  background: 'linear-gradient(135deg, var(--primary-600) 0%, var(--primary-400) 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text'
                }}
              >
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
                    <div 
                      className="flex items-center justify-center rounded-xl"
                      style={{ 
                        width: '40px',
                        height: '40px',
                        background: 'linear-gradient(135deg, rgba(85, 161, 180, 0.1) 0%, rgba(85, 161, 180, 0.05) 100%)',
                        border: '1px solid rgba(85, 161, 180, 0.2)'
                      }}
                    >
                      <Icon className="w-5 h-5" style={{ color: 'var(--primary-600)' }} />
                    </div>
                    <span 
                      style={{ 
                        fontFamily: 'var(--font-body)',
                        fontSize: 'var(--text-base)',
                        fontWeight: 'var(--font-weight-semibold)',
                        color: 'var(--neutral-800)'
                      }}
                    >
                      {feature.label}
                    </span>
                  </div>
                );
              })}
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-wrap" style={{ gap: 'var(--space-4)' }}>
              <Button 
                style={{
                  background: 'linear-gradient(135deg, var(--primary-600) 0%, var(--primary-500) 100%)',
                  color: 'white',
                  padding: 'var(--space-4) var(--space-8)',
                  borderRadius: 'var(--radius-xl)',
                  boxShadow: '0 4px 16px rgba(85, 161, 180, 0.3)'
                }}
              >
                Découvrir les parcours
              </Button>
              
              <Button 
                variant="outline"
                style={{
                  background: 'rgba(255, 255, 255, 0.9)',
                  border: '2px solid var(--primary-500)',
                  color: 'var(--primary-700)',
                  padding: 'var(--space-4) var(--space-8)',
                  borderRadius: 'var(--radius-xl)'
                }}
              >
                Voir un exemple
              </Button>
            </div>
          </div>

          {/* Right Column - Image */}
          <div>
            {/* Placeholder pour image/illustration */}
            <div 
              className="relative"
              style={{
                aspectRatio: '4/3',
                borderRadius: 'var(--radius-2xl)',
                background: 'linear-gradient(135deg, rgba(85, 161, 180, 0.1) 0%, rgba(85, 161, 180, 0.05) 100%)',
                border: '1px solid rgba(85, 161, 180, 0.2)'
              }}
            >
              {/* Votre image ici */}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
```

### Version Agence (Orange)

```tsx
// Même structure, changez uniquement les couleurs :

/* Background overlay */
background: 'linear-gradient(135deg, rgba(237, 132, 58, 0.03) 0%, rgba(255, 255, 255, 0) 100%)'

/* Blob */
background: 'radial-gradient(circle, var(--secondary-300) 0%, transparent 70%)'

/* Badge border */
border: '1px solid rgba(237, 132, 58, 0.2)'

/* Badge icon & text */
color: 'var(--secondary-600)'
color: 'var(--secondary-700)'

/* Title gradient */
background: 'linear-gradient(135deg, var(--secondary-600) 0%, var(--secondary-400) 100%)'

/* Feature pills */
background: 'linear-gradient(135deg, rgba(237, 132, 58, 0.1) 0%, rgba(237, 132, 58, 0.05) 100%)'
border: '1px solid rgba(237, 132, 58, 0.2)'
color: 'var(--secondary-600)'

/* CTA Button */
background: 'linear-gradient(135deg, var(--secondary-600) 0%, var(--secondary-500) 100%)'
boxShadow: '0 4px 16px rgba(237, 132, 58, 0.3)'
```

---

## 2. Benefit Cards Grid - Code Complet

```tsx
import { Brain, Rocket, Users, Award, TrendingUp, Sparkles } from "lucide-react";

interface Benefit {
  icon: React.ComponentType<{ className?: string; style?: React.CSSProperties }>;
  title: string;
  description: string;
  stat: string;
  statLabel: string;
}

export function BenefitsSection() {
  const benefits: Benefit[] = [
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
    <section style={{ 
      paddingTop: 'var(--space-16)',
      paddingBottom: 'var(--space-20)'
    }}>
      <div style={{ 
        maxWidth: '1280px', 
        margin: '0 auto',
        padding: '0 var(--space-6)'
      }}>
        
        {/* Header */}
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

        {/* Grid */}
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

                {/* Header: Icon + Stat */}
                <div className="flex items-center justify-between" style={{ marginBottom: 'var(--space-4)' }}>
                  {/* Icon */}
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
                      fontSize: '10px',
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
  );
}
```

---

## 3. Tab System avec Content Card

```tsx
import { useState } from "react";
import { Brain, Video, Target, Rocket } from "lucide-react";
import { Badge } from "./components/ui/badge";

interface Parcours {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  duree: string;
  modules: number;
  icon: React.ComponentType<{ className?: string; style?: React.CSSProperties }>;
  niveau: string;
  tag: string;
  highlights: string[];
}

export function ParcoursTabSystem() {
  const [selectedParcours, setSelectedParcours] = useState(0);

  const parcours: Parcours[] = [
    {
      id: 0,
      title: "Décoder l'IA & Prompt Engineering",
      subtitle: "Les fondamentaux de l'IA générative",
      description: "Maîtrisez l'art de créer des prompts efficaces et comprenez les fondamentaux de l'IA générative.",
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
      description: "Utilisez Midjourney, DALL-E, Runway et ElevenLabs pour créer des contenus de qualité.",
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
      description: "Notre méthode exclusive en 8 étapes pour concevoir une formation complète avec l'aide de l'IA.",
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
      description: "Accompagnez le changement et formez vos équipes L&D.",
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

  const currentParcours = parcours[selectedParcours];

  return (
    <section style={{ 
      paddingTop: 'var(--space-20)',
      paddingBottom: 'var(--space-20)'
    }}>
      <div style={{ 
        maxWidth: '1280px', 
        margin: '0 auto',
        padding: '0 var(--space-6)'
      }}>
        
        {/* Section Header */}
        <div className="text-center" style={{ marginBottom: 'var(--space-16)' }}>
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

        {/* Tabs Navigation */}
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
              
              {/* Left Column - Content */}
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
                      const Icon = currentParcours.icon;
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
                    {currentParcours.niveau}
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
                  {currentParcours.title}
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
                  {currentParcours.subtitle}
                </p>

                {/* Description */}
                <p 
                  style={{ 
                    fontFamily: 'var(--font-body)', 
                    fontSize: 'var(--text-base)',
                    lineHeight: 'var(--leading-relaxed)',
                    color: 'var(--neutral-700)',
                    marginBottom: 'var(--space-6)'
                  }}
                >
                  {currentParcours.description}
                </p>

                {/* Highlights */}
                <ul style={{ 
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 'var(--space-3)',
                  marginBottom: 'var(--space-8)'
                }}>
                  {currentParcours.highlights.map((highlight, idx) => (
                    <li 
                      key={idx}
                      className="flex items-center"
                      style={{ gap: 'var(--space-3)' }}
                    >
                      <CheckCircle2 
                        className="w-5 h-5 flex-shrink-0" 
                        style={{ color: 'var(--primary-600)' }} 
                      />
                      <span 
                        style={{ 
                          fontFamily: 'var(--font-body)',
                          fontSize: 'var(--text-sm)',
                          color: 'var(--neutral-700)'
                        }}
                      >
                        {highlight}
                      </span>
                    </li>
                  ))}
                </ul>

                {/* Meta Info */}
                <div className="flex flex-wrap items-center" style={{ gap: 'var(--space-6)', marginBottom: 'var(--space-8)' }}>
                  <div className="flex items-center" style={{ gap: 'var(--space-2)' }}>
                    <Clock className="w-5 h-5" style={{ color: 'var(--primary-600)' }} />
                    <span 
                      style={{ 
                        fontFamily: 'var(--font-body)',
                        fontSize: 'var(--text-sm)',
                        fontWeight: 'var(--font-weight-semibold)',
                        color: 'var(--neutral-700)'
                      }}
                    >
                      {currentParcours.duree}
                    </span>
                  </div>
                  
                  <div className="flex items-center" style={{ gap: 'var(--space-2)' }}>
                    <BookOpen className="w-5 h-5" style={{ color: 'var(--primary-600)' }} />
                    <span 
                      style={{ 
                        fontFamily: 'var(--font-body)',
                        fontSize: 'var(--text-sm)',
                        fontWeight: 'var(--font-weight-semibold)',
                        color: 'var(--neutral-700)'
                      }}
                    >
                      {currentParcours.modules} modules
                    </span>
                  </div>
                </div>

                {/* CTA */}
                <Button
                  style={{
                    background: 'linear-gradient(135deg, var(--primary-600) 0%, var(--primary-500) 100%)',
                    color: 'white',
                    padding: 'var(--space-4) var(--space-8)',
                    borderRadius: 'var(--radius-xl)',
                    boxShadow: '0 4px 16px rgba(85, 161, 180, 0.3)'
                  }}
                >
                  Commencer ce parcours
                </Button>
              </div>

              {/* Right Column - Image */}
              <div className="relative">
                <div 
                  style={{
                    aspectRatio: '4/3',
                    borderRadius: 'var(--radius-2xl)',
                    background: 'linear-gradient(135deg, rgba(85, 161, 180, 0.1) 0%, rgba(85, 161, 180, 0.05) 100%)',
                    border: '1px solid rgba(85, 161, 180, 0.2)'
                  }}
                >
                  {/* Votre image ici */}
                </div>

                {/* Floating badge - Desktop only */}
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
                    {currentParcours.modules}
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
  );
}
```

---

## 4. CTA Section avec Blobs Animés

```tsx
import { Button } from "./components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";

export function CTASection() {
  return (
    <section className="relative overflow-hidden" style={{ 
      paddingTop: 'var(--space-32)',
      paddingBottom: 'var(--space-32)'
    }}>
      {/* Background */}
      <div className="absolute inset-0" style={{ 
        background: 'linear-gradient(135deg, var(--primary-600) 0%, var(--primary-700) 100%)'
      }} />
      
      {/* Animated blobs */}
      <div 
        className="absolute top-0 right-0 w-96 h-96 md:w-[600px] md:h-[600px] opacity-20 blur-3xl pointer-events-none"
        style={{ 
          background: 'radial-gradient(circle, white 0%, transparent 70%)',
          animation: 'float 20s ease-in-out infinite'
        }} 
      />
      
      <div 
        className="absolute bottom-0 left-0 w-80 h-80 md:w-[500px] md:h-[500px] opacity-20 blur-3xl pointer-events-none"
        style={{ 
          background: 'radial-gradient(circle, white 0%, transparent 70%)',
          animation: 'float 20s ease-in-out infinite',
          animationDelay: '5s'
        }} 
      />

      {/* Float animation */}
      <style>{`
        @keyframes float {
          0%, 100% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(-30px, -30px) scale(1.1); }
        }
      `}</style>

      {/* Content */}
      <div 
        className="relative z-10 text-center"
        style={{ 
          maxWidth: '800px',
          margin: '0 auto',
          padding: '0 var(--space-6)'
        }}
      >
        <h2 
          style={{ 
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(2rem, 5vw, 3.5rem)',
            lineHeight: 'var(--leading-tight)',
            fontWeight: 'var(--font-weight-bold)',
            color: 'white',
            marginBottom: 'var(--space-6)'
          }}
        >
          Prêt à transformer votre pratique ?
        </h2>
        
        <p 
          style={{ 
            fontFamily: 'var(--font-body)',
            fontSize: 'var(--text-xl)',
            lineHeight: 'var(--leading-relaxed)',
            color: 'rgba(255, 255, 255, 0.9)',
            marginBottom: 'var(--space-10)'
          }}
        >
          Rejoignez plus de 500 formateurs et responsables L&D qui utilisent déjà 
          l'IA pour créer des formations exceptionnelles.
        </p>

        <div className="flex flex-wrap justify-center" style={{ gap: 'var(--space-4)' }}>
          <Button
            style={{
              background: 'white',
              color: 'var(--primary-700)',
              padding: 'var(--space-5) var(--space-10)',
              borderRadius: 'var(--radius-xl)',
              fontSize: 'var(--text-lg)',
              fontWeight: 'var(--font-weight-semibold)',
              boxShadow: '0 8px 24px rgba(0, 0, 0, 0.15)',
              display: 'inline-flex',
              alignItems: 'center',
              gap: 'var(--space-2)'
            }}
          >
            Commencer maintenant
            <ArrowRight className="w-5 h-5" />
          </Button>
          
          <Button
            variant="outline"
            style={{
              background: 'rgba(255, 255, 255, 0.1)',
              backdropFilter: 'blur(8px)',
              WebkitBackdropFilter: 'blur(8px)',
              border: '2px solid white',
              color: 'white',
              padding: 'var(--space-5) var(--space-10)',
              borderRadius: 'var(--radius-xl)',
              fontSize: 'var(--text-lg)',
              fontWeight: 'var(--font-weight-semibold)',
              display: 'inline-flex',
              alignItems: 'center',
              gap: 'var(--space-2)'
            }}
          >
            <Sparkles className="w-5 h-5" />
            Demander une démo
          </Button>
        </div>
      </div>
    </section>
  );
}
```

---

## 5. Composants Réutilisables

### Section Badge

```tsx
interface SectionBadgeProps {
  icon: React.ComponentType<{ className?: string; style?: React.CSSProperties }>;
  label: string;
  pole?: 'academie' | 'agence' | 'conseil' | 'tech';
}

export function SectionBadge({ icon: Icon, label, pole = 'academie' }: SectionBadgeProps) {
  const colors = {
    academie: {
      bg: 'rgba(85, 161, 180, 0.1)',
      border: 'rgba(85, 161, 180, 0.2)',
      icon: 'var(--primary-600)',
      text: 'var(--primary-700)'
    },
    agence: {
      bg: 'rgba(237, 132, 58, 0.1)',
      border: 'rgba(237, 132, 58, 0.2)',
      icon: 'var(--secondary-600)',
      text: 'var(--secondary-700)'
    },
    conseil: {
      bg: 'rgba(248, 176, 68, 0.1)',
      border: 'rgba(248, 176, 68, 0.2)',
      icon: 'var(--accent-600)',
      text: 'var(--accent-700)'
    },
    tech: {
      bg: 'rgba(123, 196, 212, 0.1)',
      border: 'rgba(123, 196, 212, 0.2)',
      icon: 'var(--primary-light)',
      text: 'var(--primary-hover)'
    }
  };

  const color = colors[pole];

  return (
    <div
      className="inline-flex items-center rounded-lg"
      style={{
        gap: 'var(--space-2)',
        padding: 'var(--space-2) var(--space-4)',
        background: `linear-gradient(135deg, ${color.bg} 0%, rgba(255, 255, 255, 0.05) 100%)`,
        border: `1px solid ${color.border}`
      }}
    >
      <Icon className="w-4 h-4" style={{ color: color.icon }} />
      <span
        style={{
          fontFamily: 'var(--font-body)',
          fontSize: 'var(--text-xs)',
          fontWeight: 'var(--font-weight-bold)',
          color: color.text,
          letterSpacing: '0.1em',
          textTransform: 'uppercase'
        }}
      >
        {label}
      </span>
    </div>
  );
}
```

### Glassmorphism Card

```tsx
interface GlassmorphismCardProps {
  children: React.ReactNode;
  pole?: 'academie' | 'agence' | 'conseil' | 'tech';
  withAccentLine?: boolean;
  className?: string;
}

export function GlassmorphismCard({ 
  children, 
  pole = 'academie', 
  withAccentLine = false,
  className = '' 
}: GlassmorphismCardProps) {
  const borderColors = {
    academie: 'rgba(85, 161, 180, 0.15)',
    agence: 'rgba(237, 132, 58, 0.15)',
    conseil: 'rgba(248, 176, 68, 0.15)',
    tech: 'rgba(123, 196, 212, 0.15)'
  };

  const accentGradients = {
    academie: 'linear-gradient(90deg, #73AFBF 0%, #55A1B4 100%)',
    agence: 'linear-gradient(90deg, #F18A4C 0%, #C06920 100%)',
    conseil: 'linear-gradient(90deg, #F8B044 0%, #D69020 100%)',
    tech: 'linear-gradient(90deg, #7BC4D4 0%, #4A8FA1 100%)'
  };

  return (
    <div
      className={`relative overflow-hidden ${className}`}
      style={{
        borderRadius: 'var(--radius-xl)',
        background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(255, 255, 255, 0.85) 100%)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        border: `1px solid ${borderColors[pole]}`,
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.04)'
      }}
    >
      {withAccentLine && (
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: '2px',
            background: accentGradients[pole],
            opacity: 0.6
          }}
        />
      )}
      {children}
    </div>
  );
}
```

---

**Document créé pour The Learning Society**  
*Code Examples - React + TypeScript*  
*Version 1.0 - Janvier 2026*
